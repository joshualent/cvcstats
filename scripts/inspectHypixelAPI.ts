import { inspectDataKeys, writeStatsToJson } from './collectData'
import { readStatsFromJson } from './fetcher'

const playerList = [
  'mcfrog',
  'codedependent',
  'ghiblidonut',
  'technoblade',
  'Excrabular',
  'Georging',
  'JudeLow',
  'Bitzel',
  'Dream',
  'sirdeansardini',
  'awesomerlegend',
  'GhibliDonut',
  'Cuerpos',
  'Cococosini',
  'awesomerlegend',
  'opcrafter_3',
  'oDavey',
  'ToyaLatina',
  'ZealouslyDevoted',
  'BamBamX2',
  'WillimusWonka',
  'AlexNotGreen',
  '60c',
]

// const playerData = await writeStatsToJson(playerList)
// console.log(playerData)

const playerData = await JSON.parse(await readStatsFromJson())
inspectDataKeys(playerData)
