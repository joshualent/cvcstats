import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { Field, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { Button } from '../components/ui/button'
import { useState } from 'react'
import type { ChangeEvent, SubmitEvent } from 'react'

export const Route = createFileRoute('/')({ component: App })

function App() {
  const navigate = useNavigate()
  const [username, setUsername] = useState('')
  const handleUsernameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value)
  }
  const handleSubmit = (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault()
    const trimmedUsername = username.trim()

    navigate({
      to: '/u/$username',
      params: { username: trimmedUsername },
    })
  }
  return (
    <main>
      <div className="mx-3">
        <h1 className="text-4xl font-bold text-center mt-8 md:mt-12">
          <span className="dark:text-blue-500 text-blue-700">c</span>v
          <span className="dark:text-red-500 text-red-700">c</span>stats
        </h1>
        <h2 className="text-2xl text-muted-foreground text-center">
          <span className="block sm:inline">Player stats for Hypixel</span>{' '}
          <span className="block sm:inline"> Cops vs. Crims</span>
        </h2>
      </div>
      <div className="md:border rounded-lg border-muted max-w-2xl mx-auto pt-6 pb-8 px-8 mt-8 md:mt-16">
        <h2 className="text-2xl mt-4 mb-1">Lookup player stats</h2>
        <p className="text-muted-foreground">
          Enter a username to fetch player statistics from{' '}
          <a
            href="https://api.hypixel.net/"
            className="relative font-semibold text-foreground hover:underline decoration-foreground/80"
          >
            Hypixel's Public API
          </a>
        </p>
        <form onSubmit={handleSubmit}>
          <div className="mt-4 flex flex-col gap-2 sm:flex-row sm:items-end">
            <Field className="min-w-0 flex-1">
              <FieldLabel htmlFor="username" className="hidden">
                Player Username
              </FieldLabel>
              <Input
                name="username"
                id="username"
                placeholder="Technoblade..."
                className="sm:h-10 md:px-3 md:text-xl"
                defaultValue={username}
                onChange={handleUsernameChange}
              ></Input>
            </Field>
            <Button
              type="submit"
              size="lg"
              className="shrink-0 font-semibold sm:h-10 sm:px-3"
            >
              Lookup Stats
            </Button>
          </div>
        </form>
      </div>
    </main>
  )
}
