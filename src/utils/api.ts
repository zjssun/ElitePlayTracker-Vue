import axios from 'axios'

axios.defaults.baseURL = 'https://api-hub.top'

export async function getMatchByName(name: string) {
  return axios.get(`/getmatch/${name}`)
}
