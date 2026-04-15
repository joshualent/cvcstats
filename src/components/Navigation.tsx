import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuLink,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu'
import { Link } from '@tanstack/react-router'
import ThemeToggle from './ThemeToggle'
import { Button } from '@/components/ui/button'
import { Github } from 'lucide-react'

export default function Navigation() {
  return (
    <header className="grid w-full grid-cols-[1fr_auto_1fr] items-center gap-x-4 px-6 pt-4">
      <div className="flex min-w-0 items-center justify-start">
        <Button variant="ghost" size="icon-lg" asChild>
          <a
            href="https://github.com/joshualent/cvcstats"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="View cvcstats repository on GitHub"
          >
            <Github aria-hidden />
          </a>
        </Button>
      </div>
      <div className="flex min-w-0 justify-center">
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuLink
                asChild
                className={navigationMenuTriggerStyle()}
              >
                <Link to="/">
                  <span className="text-lg">Home</span>
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>
      <div className="flex min-w-0 items-center justify-end">
        <ThemeToggle />
      </div>
    </header>
  )
}
