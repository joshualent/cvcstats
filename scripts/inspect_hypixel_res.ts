import { writeFile } from 'fs'
import { readFile } from 'fs/promises'
import getHypixelStats, {
  extractRelevantData,
  extractStatObjKeys,
} from './utils'

async function writeHypixelDataToJson() {
  const players = [
    'mcfrog',
    'hiddenrun',
    'technoblade',
    'PrinceJohnPaul',
    'NosDaemon',
    'Georging',
    'Dream',
    'Fhie',
    'Excrabular',
    'awesomerlegend',
    'CodeDependent',
  ]

  const playerData: object[] = []

  for (const player of players) {
    const allData = await getHypixelStats(player)
    const data = await extractRelevantData(allData)
    playerData.push(data)
  }

  writeFile('./scripts/playerData.json', JSON.stringify(playerData), () => {})
}

writeHypixelDataToJson()

const inspectHypixelJsonKeys = async () => {
  const fileText = await readFile('./scripts/playerData.json', 'utf-8')
  const allPlayerData = JSON.parse(fileText)
  console.log(await extractRelevantData(allPlayerData[0]))
}

const getAllStatKeys = async () => {
  const fileText = await readFile('./scripts/playerData.json', 'utf-8')
  const allPlayerData = JSON.parse(fileText)
  console.log(await extractStatObjKeys(allPlayerData))
}

// getAllStatKeys()

// inspectHypixelJsonKeys()
