export interface GameNight {
  id: string
  name: string
  date: string
  time: string
  location: string
  created_at: string
}

export interface Game {
  id: string
  game_night_id: string
  name: string
  player_count: number
  created_at: string
}

export interface Attendee {
  id: string
  game_night_id: string
  name: string
  email: string | null
  phone: string | null
  created_at: string
}

export interface Group {
  id: string
  game_night_id: string
  name: string
  max_size: number
  game_id: string | null
  created_at: string
}

export interface GroupMember {
  id: string
  group_id: string
  attendee_id: string
}

export interface GroupWithMembers extends Group {
  members: { id: string; attendee_id: string; attendee_name: string }[]
}
