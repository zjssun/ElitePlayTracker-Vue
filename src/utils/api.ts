import axios from 'axios'

axios.defaults.baseURL = 'http://localhost:8080' //https://api-hub.top

export async function getMatchByName(name: string) {
  return axios.get(`/getmatch/${name}`)
}

export async function voteForPlayer(name: string) {
  return axios.post('/vote', null, { params: { name } })
}

export async function getVoteStats() {
  return axios.get('/vote/stats')
}
