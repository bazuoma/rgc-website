import { NextRequest, NextResponse } from 'next/server';

const API_KEY = process.env.MAILCHIMP_API_KEY!;
const AUDIENCE_ID = process.env.MAILCHIMP_AUDIENCE_ID!;
const SERVER = process.env.MAILCHIMP_SERVER!;

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, name, city, topic, msg, interests, formType } = body;

    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }

    // Build merge fields
    const nameParts = (name || '').trim().split(' ');
    const firstName = nameParts[0] || '';
    const lastName = nameParts.slice(1).join(' ') || '';

    const mergeFields: Record<string, string> = {};
    if (firstName) mergeFields['FNAME'] = firstName;
    if (lastName) mergeFields['LNAME'] = lastName;
    if (city) mergeFields['CITY'] = city;
    // Merge tag for the "Additional Information" custom field in Mailchimp.
    // Find yours: Audience → Settings → Audience fields and *|MERGE|* tags
    const msgMergeTag = process.env.MAILCHIMP_MSG_FIELD || 'MOREINFO';
    if (msg) mergeFields[msgMergeTag] = msg;

    // Build tags
    const tags: string[] = [formType === 'contact' ? 'contact-form' : 'signup-form'];
    if (topic) tags.push(topic.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, ''));
    if (interests && Array.isArray(interests)) {
      interests.forEach((i: string) => tags.push(i.toLowerCase().replace(/\s+/g, '-')));
    }

    const auth = Buffer.from(`anystring:${API_KEY}`).toString('base64');

    // Add/update subscriber
    const subscriberHash = Buffer.from(email.toLowerCase()).toString('hex');
    // Use PUT (upsert) so re-submissions don't error
    const mcRes = await fetch(
      `https://${SERVER}.api.mailchimp.com/3.0/lists/${AUDIENCE_ID}/members/${subscriberHash}`,
      {
        method: 'PUT',
        headers: {
          Authorization: `Basic ${auth}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email_address: email,
          status_if_new: 'subscribed',
          merge_fields: mergeFields,
        }),
      }
    );

    if (!mcRes.ok) {
      const err = await mcRes.json();
      console.error('Mailchimp error:', err);
      return NextResponse.json({ error: err.detail || 'Mailchimp error' }, { status: 500 });
    }

    // Set tags separately (PUT endpoint doesn't accept tags)
    if (tags.length > 0) {
      await fetch(
        `https://${SERVER}.api.mailchimp.com/3.0/lists/${AUDIENCE_ID}/members/${subscriberHash}/tags`,
        {
          method: 'POST',
          headers: {
            Authorization: `Basic ${auth}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            tags: tags.map(t => ({ name: t, status: 'active' })),
          }),
        }
      );
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('API route error:', err);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
