import { writeFile } from 'fs'
import { readFile } from 'fs/promises'
import getHypixelStats, {
  extractRelevantData,
  extractStatObjKeys,
  extractStatObjKeysWithTypes,
} from './scriptUtilityFunctions'

async function writeHypixelDataToJson() {
  const players = [
    'mcfrog',
    'hiddenrun',
    'technoblade',
    'PrinceJohnPaul',
    'NosDaemon',
    'Georging',
    'Fhie',
    'Excrabular',
    'awesomerlegend',
    // 'CodeDependent',
    // 'Dream',
  ]

  const playerData: object[] = []

  for (const player of players) {
    const allData = await getHypixelStats(player)
    const data = await extractRelevantData(allData)
    playerData.push(data)
  }

  writeFile('./scripts/playerData.json', JSON.stringify(playerData), () => {})
}

// writeHypixelDataToJson()

const inspectHypixelJsonKeys = async () => {
  const fileText = await readFile('./scripts/playerData.json', 'utf-8')
  const allPlayerData = JSON.parse(fileText)
  console.log(await extractRelevantData(allPlayerData[0]))
}

const getPlayerStats = async () => {
  const fileText = await readFile('./scripts/playerData.json', 'utf-8')
  const allPlayerData = JSON.parse(fileText)
  const mcgoStatsObj = await extractRelevantData(allPlayerData)
  console.log(mcgoStatsObj)
  writeFile(
    './scripts/generatedStatType.ts',
    JSON.stringify(mcgoStatsObj),
    () => {},
  )
}

const inspectAPIResponseConsistency = async () => {
  const fileText = await readFile('./scripts/playerData.json', 'utf-8')
  const allPlayerData = JSON.parse(fileText)
  const mcgoStatsObj = await extractStatObjKeys(allPlayerData)
}

const getAllStatKeys = async () => {
  const fileText = await readFile('./scripts/playerData.json', 'utf-8')
  const allPlayerData = JSON.parse(fileText)
  const mcgoStatsObj = await extractStatObjKeysWithTypes(allPlayerData)
  console.log(mcgoStatsObj)
  let playerTypeStr = 'type McgoStats = {\n'
  for (const key of Object.keys(mcgoStatsObj)) {
    playerTypeStr += `  ${key}?: ${mcgoStatsObj[key]},\n`
  }
  playerTypeStr += '}'
  // doesn't generate exact type for keys that have spaces in them
  // requires manual intervention for that

  writeFile('./scripts/generatedStatType.ts', playerTypeStr, () => {})
}

inspectAPIResponseConsistency()
// getPlayerStats()
// getAllStatKeys()

// inspectHypixelJsonKeys()
