"use client"

import { ListTodo, Moon, Sun, Menu } from "lucide-react"
import { Button } from "./ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { useTheme } from "next-themes"

const Navbar = () => {
  const { theme, setTheme } = useTheme()

  return (
    <nav className="flex items-center justify-between px-4 py-2 mb-2">
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <ListTodo color="#d01100" className="size-8" />
          <span className="text-xl font-semibold">TaskMatrix</span>
        </div>
        <div className="flex items-center gap-2 px-3 py-1 rounded-md">
          <span className="text-[#00C2A9] text-xs hidden sm:flex bg-slate-200 dark:bg-[#333333] p-1.5 rounded-md">Quick decision making tool</span>
          <span className="p-2 text-xs dark:bg-white/10 bg-green-200 rounded-md">BETA</span>
        </div>
      </div>

      {/* Desktop Navigation */}
      <div className="hidden md:flex items-center justify-between">
        <Button variant="ghost" size="icon" onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
          {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
        </Button>
        <nav className="flex items-center gap-6">
          <Button variant="ghost">Workspaces</Button>
          <Button variant="ghost">About</Button>
          <Button variant="ghost">Pricing</Button>
          <Button variant="ghost">Feedback</Button>
          <Button variant="ghost">Login</Button>
        </nav>
      </div>

      {/* Mobile Navigation */}
      <div className="md:hidden flex items-center gap-2">
        <Button variant="ghost" size="icon" onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
          {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
        </Button>
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon">
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent>
            <div className="flex flex-col gap-4 mt-8">
              <Button variant="ghost">Workspaces</Button>
              <Button variant="ghost">About</Button>
              <Button variant="ghost">Pricing</Button>
              <Button variant="ghost">Feedback</Button>
              <Button variant="ghost">Login</Button>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </nav>
  )
}

export default Navbar