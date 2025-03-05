import { Button } from "@/components/ui/button"

export default function Home() {
  return (
    <main className="min-h-screen p-8 bg-background">
      <div className="max-w-2xl mx-auto space-y-8">
        <h1 className="text-4xl font-bold text-foreground">Button Demo</h1>
        
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-foreground">Variants</h2>
          <div className="flex flex-wrap gap-4">
            <Button>Default</Button>
            <Button variant="destructive">Destructive</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="link">Link</Button>
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-foreground">Sizes</h2>
          <div className="flex flex-wrap items-center gap-4">
            <Button size="sm">Small</Button>
            <Button>Default</Button>
            <Button size="lg">Large</Button>
            <Button size="icon">🔍</Button>
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-foreground">States</h2>
          <div className="flex flex-wrap gap-4">
            <Button>Enabled</Button>
            <Button disabled>Disabled</Button>
          </div>
        </section>
      </div>
    </main>
  )
} 