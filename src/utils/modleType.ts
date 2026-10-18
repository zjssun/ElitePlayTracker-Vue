export interface Datainfo {
  data: {
    message: string
    playerMatch: Matchinfo[]
  }
}

export interface Matchinfo {
  bestOf: string
  time: string
  nickName: string
  playerId: string
  team: string
  matchMap: string
  matchScore: string
  matchResult: string
  matchId: string
  roomUrl: string
  timestamp: string
  totalKills: string
  totalDeaths: string
  totalAssists: string
  rating: string
  tripleKill: string
  quadroKill: string
  pentaKill: string
  effectiveRanking: string
  mapimage: string
  adr: string
  teammates: string | null
  opponents: string | null
}

export interface VoteStat {
  name: string
  nameKey: string
  votes: number
}
