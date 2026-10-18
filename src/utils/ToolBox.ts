import donk from '@/assets/img/player/donk.webp'
import elige from '@/assets/img/player/elige.webp'
import im from '@/assets/img/player/im.webp'
import jl from '@/assets/img/player/jl.webp'
import m0nesy from '@/assets/img/player/m0nesy.webp'
import niko from '@/assets/img/player/niko.webp'
import ropz from '@/assets/img/player/ropz.webp'
import s1mple from '@/assets/img/player/s1mple.webp'
import w0nderful from '@/assets/img/player/w0nderful.webp'
import zywoo from '@/assets/img/player/zywoo.webp'
import twistzz from '@/assets/img/player/Twistzz.webp'
import kyousuke from '@/assets/img/player/kyousuke.webp'
import frozen from '@/assets/img/player/forzen.webp'

import dust2 from '@/assets/img/map/dust2.jpeg'
import mirage from '@/assets/img/map/Mirage.jpeg'
import inferno from '@/assets/img/map/inferno.jpeg'
import nuke from '@/assets/img/map/nuke.jpeg'
import vertigo from '@/assets/img/map/Vertigo.jpeg'
import ancient from '@/assets/img/map/ancient.jpeg'
import anubis from '@/assets/img/map/Anubis.jpeg'
import train from '@/assets/img/map/train.png'
import overpass from '@/assets/img/map/overpass.jpeg'
import cache from '@/assets/img/map/cache.jpeg'

export const playerList = [
  'donk',
  'EliGE',
  'frozen',
  'iM',
  'jL',
  'kyousuke',
  'm0NESY',
  'niko',
  'ropz',
  's1mple',
  'Twistzz',
  'w0nderful',
  'ZywOo',
]

export function GetPlayerImg(Player: string) {
  switch (Player) {
    case 'All':
      return ''
    case 'donk':
      return donk
    case 'EliGE':
      return elige
    case 'iM':
      return im
    case 'jL':
      return jl
    case 'kyousuke':
      return kyousuke
    case 'm0NESY':
      return m0nesy
    case 'niko':
      return niko
    case 'ropz':
      return ropz
    case 's1mple':
      return s1mple
    case 'w0nderful':
      return w0nderful
    case 'ZywOo':
      return zywoo
    case 'Twistzz':
      return twistzz
    case 'frozen':
      return frozen
    default:
      return ''
  }
}

export function SplitDate(time: string) {
  return time.split('-')
}

export function GetMapImg(map: string) {
  switch (map) {
    case 'de_dust2':
      return dust2
    case 'de_mirage':
      return mirage
    case 'de_inferno':
      return inferno
    case 'de_nuke':
      return nuke
    case 'de_vertigo':
      return vertigo
    case 'de_ancient':
      return ancient
    case 'de_anubis':
      return anubis
    case 'de_train':
      return train
    case 'de_overpass':
      return overpass
    case 'de_cache':
      return cache
    default:
      return ''
  }
}

export function RenderName(name: string) {
  if (name.includes('donk')) {
    return 'donk'
  } else if (name.includes('im')) {
    return 'iM'
  } else if (name.includes('jL')) {
    return 'jL'
  } else if (name.includes('CEMEN_BAKIN')) {
    return 'kyousuke'
  } else if (name.includes('frozen')) {
    return 'frozen'
  } else {
    return name
  }
}
