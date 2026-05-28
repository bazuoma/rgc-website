import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )

  const gameNightId = params.id

  let body: { name?: string; email?: string; phone?: string }
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 })
  }

  const { name, email, phone } = body

  if (!name?.trim()) {
    return NextResponse.json({ error: 'Name is required' }, { status: 400 })
  }
  if (!email?.trim() && !phone?.trim()) {
    return NextResponse.json({ error: 'Email or phone is required' }, { status: 400 })
  }

  const { data: gameNight, error: nightError } = await supabase
    .from('game_nights')
    .select('id')
    .eq('id', gameNightId)
    .single()

  if (nightError || !gameNight) {
    return NextResponse.json({ error: 'Game night not found' }, { status: 404 })
  }

  const { error } = await supabase.from('attendees').insert({
    game_night_id: gameNightId,
    name: name.trim(),
    email: email?.trim() || null,
    phone: phone?.trim() || null,
  })

  if (error) {
    return NextResponse.json({ error: 'Failed to save. Please try again.' }, { status: 500 })
  }

  return NextResponse.json({ success: true })
}
