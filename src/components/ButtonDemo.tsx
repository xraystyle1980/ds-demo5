import { Button } from "@/components/ui/button"
import { Mail, ArrowRight, Github, Calendar, Plus } from "lucide-react"

export function ButtonDemo() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-4">
        <Button>
          <Mail className="mr-2 h-4 w-4" /> Login with Email
        </Button>
        <Button>
          <Github className="mr-2 h-4 w-4" /> Login with Github
        </Button>
      </div>

      <div className="flex items-center gap-4">
        <Button variant="outline">
          <Calendar className="mr-2 h-4 w-4" />
          Schedule for later
        </Button>
        <Button variant="outline">
          Next step
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>

      <div className="flex items-center gap-4">
        <Button size="icon" variant="outline">
          <Plus className="h-4 w-4" />
        </Button>
        <Button size="icon">
          <Calendar className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
} 