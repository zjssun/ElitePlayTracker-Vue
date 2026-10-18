const avatarModules = import.meta.glob('@/assets/img/player/*.webp', {
  eager: true,
  import: 'default',
}) as Record<string, string>

const avatarByFile: Record<string, string> = {}
for (const path in avatarModules) {
  const file = path.slice(path.lastIndexOf('/') + 1).toLowerCase()
  avatarByFile[file] = avatarModules[path] ?? ''
}

const PRO_AVATAR_FILE: Record<string, string> = {
  'apEX': 'apEX.webp',
  'mezii': 'mezii.webp',
  'flameZ': 'flameZ.webp',
  'sh1ro': 'sh1ro.webp',
  'magixx': 'magixx.webp',
  'tN1R': 'tN1R.webp',
  'zont1x': 'zont1x.webp',
  'torzsi': 'torzsi.webp',
  'Spinx': 'Spinx.webp',
  'xertioN': 'xertioN.webp',
  'PR': 'PR.webp',
  'xelex': 'xelex.webp',
  'karrigan': 'karrigan.webp',
  'TeSeS': 'TeSeS.webp',
  'FalleN': 'FalleN.webp',
  'yuurih': 'yuurih.webp',
  'YEKINDAR': 'YEKINDAR.webp',
  'KSCERATO': 'KSCERATO.webp',
  'molodoy': 'molodoy.webp',
  'arT': 'arT.webp',
  'dumau': 'dumau.webp',
  'latto': 'latto.webp',
  'n1ssim': 'n1ssim.webp',
  'try': 'try.webp',
  'phzy': 'phzy.webp',
  'siuhy': 'siuhy.webp',
  'Staehr': 'Staehr.webp',
  'ryu': 'ryu.webp',
  'cmtry': 'cmtry.webp',
  'Aleksib': 'Aleksib.webp',
  'b1t': 'b1t.webp',
  'makazze': 'makazze.webp',
  'huNter-': 'huNter-.webp',
  'NertZ': 'NertZ.webp',
  'r1nkle': 'r1nkle.webp',
  'HeavyGod': 'HeavyGod.webp',
  'XANTARES': 'XANTARES.webp',
  'woxic': 'woxic.webp',
  'Jimpphat': 'Jimpphat.webp',
  'kyxsan': 'kyxsan.webp',
  'Wicadia': 'Wicadia.webp',
  'bLitz': 'bLitz.webp',
  'Techno': 'Techno.webp',
  '910': '910.webp',
  'Boombl4': 'Boombl4.webp',
  'zorte': 'zorte.webp',
  'S1ren': 'S1ren.webp',
  'd1Ledez': 'd1Ledez.webp',
  'Magnojez': 'Magnojez.webp',
  'HObbit': 'HObbit.webp',
  'FL1T': 'FL1T.webp',
  'Jame': 'jame.webp',
  'xiELO': 'xiELO.webp',
  'zweih': 'zweih.webp',
  'm0NESY': 'm0nesy.webp',
  'donk': 'donk.webp',
  's1mple': 's1mple.webp',
  'iM': 'im.webp',
  'EliGE': 'elige.webp',
  'ropz': 'ropz.webp',
  'ZywOo': 'zywoo.webp',
  'jL': 'jl.webp',
  'w0nderful': 'w0nderful.webp',
  'niko': 'niko.webp',
  'kyousuke': 'kyousuke.webp',
  'Twistzz': 'Twistzz.webp',
  'frozen': 'forzen.webp',
}

export function getProAvatar(name: string): string {
  const file = PRO_AVATAR_FILE[name]
  if (!file) {
    return ''
  }
  return avatarByFile[file.toLowerCase()] ?? ''
}
