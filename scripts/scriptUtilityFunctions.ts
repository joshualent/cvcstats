import { loadEnvFile } from 'node:process'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const scriptDir = dirname(fileURLToPath(import.meta.url))
const projectRoot = resolve(scriptDir, '..')
loadEnvFile(resolve(projectRoot, '.env.local'))

const getHypixelStats = async (username = '', uuid = '') => {
  if (!username && !uuid) {
    throw new Error('Must provide username or UUID')
  }
  let id = uuid
  if (!uuid) {
    const mojang_response = await fetch(
      `https://api.mojang.com/users/profiles/minecraft/${username}`,
    )
    const mojang_data = await mojang_response.json()
    id = mojang_data.id
  }

  const apiKey = process.env.HYPIXEL_API_KEY
  if (!apiKey) {
    throw new Error('HYPIXEL_API_KEY is not set in .env.local')
  }
  const hypixel_response = await fetch(
    `https://api.hypixel.net/v2/player?uuid=${id}`,
    { headers: { 'API-Key': apiKey } },
  )
  if (!hypixel_response.ok) {
    console.log(hypixel_response.status)
    throw new Error('Hypixel API call failed')
  }

  const hypixel_data = await hypixel_response.json()
  return hypixel_data.player
}

export const extractRelevantData = async (obj: any) => {
  const {
    id,
    uuid,
    displayname,
    networkExp,
    firstLogin,
    lastLogin,
    lastLogout,
    mostRecentGameType,
    newPackageRank,
    stats,
  } = obj

  return {
    id,
    uuid,
    displayname,
    networkExp,
    firstLogin,
    lastLogin,
    lastLogout,
    mostRecentGameType,
    newPackageRank,
    stats: stats?.MCGO,
  }
}

export const extractStatObjKeys = async (objArr: any[]) => {
  const allKeys = []
  for (const obj of objArr) {
    const statsKeys = Object.keys(obj.stats)
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

  const uniqueKeysSet = new Set(allKeys)
  const uniqueKeys = Array.from(uniqueKeysSet)
  console.log(keyAppearances)
  console.log(uniqueKeys.length)
}
// 186 unique keys total (measured, not definitive)
// 153 keys on hiddenrun (goated player)
// 124 keys on Fhie (OG player)
// 51 keys on Georging (i think good player?)
// 23 unique keys on a newish-player (CodeDependent)

export const extractStatObjKeysWithTypes = async (objArr: any[]) => {
  const allKeys = []
  for (const obj of objArr) {
    const statsKeys = Object.entries(obj.stats)
    // console.log(statsKeys)
    allKeys.push(...statsKeys)
  }

  const keyAppearances: any = {}
  for (const key of allKeys) {
    if (key[0] in keyAppearances) {
      if (typeof keyAppearances[key[0]] !== typeof key[1]) {
        console.log(
          `type mismatch for the same key in API Response\nPrevious type: ${typeof keyAppearances[key[0]]}\nCurrent type: ${typeof key[1]}`,
        )
      }
    } else {
      keyAppearances[key[0]] = typeof key[1]
    }
  }

  return keyAppearances
}

export default getHypixelStats
