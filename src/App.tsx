import { ThemeProvider } from "./components/theme-provider"
import { ThemeToggle } from "./components/theme-toggle"
import { Button } from "./components/ui"
import { Rocket, Laptop2, Trash2, Pencil, Ghost, Link, Loader2 } from "lucide-react"

function App() {
  return (
    <ThemeProvider defaultTheme="system" storageKey="ui-theme">
      <div className="min-h-screen bg-background text-foreground flex flex-col">
        <div className="flex justify-end p-8">
          <ThemeToggle />
        </div>
        <div className="flex-1 flex items-center justify-center">
          <div className="flex flex-col items-center justify-center space-y-8">
            <div className="flex space-x-6">
              <Button variant="default">
                <Rocket className="mr-2 h-4 w-4" /> Primary Button
              </Button>
              <Button variant="secondary">
                <Laptop2 className="mr-2 h-4 w-4" /> Secondary Button
              </Button>
              <Button variant="destructive">
                <Trash2 className="mr-2 h-4 w-4" /> Delete
              </Button>
            </div>
            <div className="flex space-x-6">
              <Button variant="outline">
                <Pencil className="mr-2 h-4 w-4" /> Outline
              </Button>
              <Button variant="ghost">
                <Ghost className="mr-2 h-4 w-4" /> Ghost
              </Button>
              <Button variant="link">
                <Link className="mr-2 h-4 w-4" /> Link
              </Button>
            </div>
            <div className="flex space-x-6">
              <Button disabled>
                <Rocket className="mr-2 h-4 w-4" /> Disabled
              </Button>
              <Button disabled>
                <Loader2 className="animate-spin mr-2 h-4 w-4" />
                Please wait
              </Button>
            </div>
          </div>
        </div>
      </div>
    </ThemeProvider>
  )
}

export default App
