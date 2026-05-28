-- Run this in your Supabase project's SQL Editor
-- Supabase dashboard → SQL Editor → New Query → paste and run

-- Game nights
CREATE TABLE game_nights (
  id          uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  name        text NOT NULL,
  date        date NOT NULL,
  time        text NOT NULL,
  location    text NOT NULL,
  created_at  timestamptz DEFAULT now()
);

-- Games added to a game night
CREATE TABLE games (
  id             uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  game_night_id  uuid REFERENCES game_nights(id) ON DELETE CASCADE,
  name           text NOT NULL,
  player_count   int NOT NULL,
  created_at     timestamptz DEFAULT now()
);

-- Attendees (guests who checked in via QR code)
CREATE TABLE attendees (
  id             uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  game_night_id  uuid REFERENCES game_nights(id) ON DELETE CASCADE,
  name           text NOT NULL,
  email          text,
  phone          text,
  created_at     timestamptz DEFAULT now(),
  CONSTRAINT email_or_phone CHECK (email IS NOT NULL OR phone IS NOT NULL)
);

-- Groups created by admin
CREATE TABLE groups (
  id             uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  game_night_id  uuid REFERENCES game_nights(id) ON DELETE CASCADE,
  name           text NOT NULL,
  max_size       int NOT NULL,
  game_id        uuid REFERENCES games(id) ON DELETE SET NULL,
  created_at     timestamptz DEFAULT now()
);

-- Attendees assigned to groups (one attendee per group at a time)
CREATE TABLE group_members (
  id           uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  group_id     uuid REFERENCES groups(id) ON DELETE CASCADE,
  attendee_id  uuid REFERENCES attendees(id) ON DELETE CASCADE,
  UNIQUE(attendee_id)
);

-- Enable full replica identity for real-time on attendees
ALTER TABLE attendees REPLICA IDENTITY FULL;

-- Disable RLS for all tables (this is an internal admin tool)
ALTER TABLE game_nights DISABLE ROW LEVEL SECURITY;
ALTER TABLE games       DISABLE ROW LEVEL SECURITY;
ALTER TABLE attendees   DISABLE ROW LEVEL SECURITY;
ALTER TABLE groups      DISABLE ROW LEVEL SECURITY;
ALTER TABLE group_members DISABLE ROW LEVEL SECURITY;

-- Enable real-time for the attendees table
-- After running this SQL, go to:
-- Supabase dashboard → Database → Replication → Supabase Realtime
-- and add the "attendees" table to the publication.
