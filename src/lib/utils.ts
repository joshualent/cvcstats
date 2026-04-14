import { createServerFn } from '@tanstack/react-start'
import { clsx } from 'clsx'
import type { ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'
import type {
  HypixelPlayerAPIResponse,
  MojangProfileAPIResponse,
} from './types'
import { api } from '../../convex/_generated/api'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const getPlayerUUID = createServerFn({
  method: 'GET',
})
  .inputValidator((data: { username: string }) => data)
  .handler(async ({ data }) => {
    const mojang_response = await fetch(
      `https://api.mojang.com/users/profiles/minecraft/${data.username}`,
    )
    return (await mojang_response.json()) as MojangProfileAPIResponse
  })

export const getHypixelStats = createServerFn({
  method: 'GET',
})
  .inputValidator((data: { uuid: string }) => data)
  .handler(async ({ data }) => {
    const apiKey = process.env.HYPIXEL_API_KEY
    if (!apiKey) {
      throw new Error('HYPIXEL_API_KEY is not set')
    }

    const hypixel_response = await fetch(
      `https://api.hypixel.net/v2/player?uuid=${data.uuid}`,
      { headers: { 'API-Key': apiKey } },
    )
    if (!hypixel_response.ok) {
      throw new Error('Hypixel API Request unsuccessful')
    }
    const hypixel_data = await hypixel_response.json()
    if (!hypixel_data.player) {
      throw new Error('Player information not available in Hypixel Response')
    }
    return hypixel_data.player as HypixelPlayerAPIResponse
  })
