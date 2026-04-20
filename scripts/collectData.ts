import { writeFile } from 'fs'
import { fetchHypixelStats, fetchUUID } from './fetcher'
import type { FullCvcStats } from '../convex/lib/types'

export async function writeStatsToJson(
  playerList: string[],
  filepath = './scripts/playerData.json',
) {
  const playerData = []
  for (const player of playerList) {
    const uuid = await fetchUUID(player)
    if (uuid == null) continue
    const data = await fetchHypixelStats(uuid)
    if (data == null) continue
    playerData.push(data)
    // wait for 100ms before fetching again (to avoid Rate Limits)
    await new Promise((resolve) => setTimeout(resolve, 100))
  }
  writeFile(filepath, JSON.stringify(playerData), () => {})
  return playerData
}

export function inspectDataKeys(playerData: Array<FullCvcStats>) {
  const allKeys = []
  let players = 0

  for (const player of playerData) {
    players += 1
    const statsKeys = Object.keys(player)
    allKeys.push(...statsKeys)
  }

  const keyAppearances: any = {}

  for (const key of allKeys) {
    if (key in keyAppearances) {
      keyAppearances[key] += 1
    } else {
      keyAppearances[key] = 1
    }
  }

  //   const uniqueKeysSet = new Set(allKeys)
  let keyInfoStrings = []
  for (const entry of Object.entries(keyAppearances)) {
    if (entry[1] == players) {
      keyInfoStrings.unshift(
        `${entry[0]}: ${entry[1]}/${players} (ALL PLAYERS)`,
      )
    } else {
      keyInfoStrings.push(`${entry[0]}: ${entry[1]}/${players}`)
    }
  }
  keyInfoStrings.forEach((str) => console.log(str))

  //   const uniqueKeys = Array.from(uniqueKeysSet)
  // console.log(keyAppearances)
  // console.log(uniqueKeys.length)
}
