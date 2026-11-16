import axios from 'axios'

axios.defaults.baseURL = 'https://api-hub.top' //http://localhost:8080 || https://api-hub.top

export async function getMatchByName(name: string) {
  return axios.get(`/getmatch/${name}`)
}

export async function voteForPlayer(name: string) {
  return axios.post('/vote', null, { params: { name } })
}

export async function getVoteStats() {
  return axios.get('/vote/stats')
}

export async function getProFaceitUrl(name: string) {
  return axios.get(`/api/pros/${encodeURIComponent(name)}/faceit-url`)
}
