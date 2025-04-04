# Design System with Figma Integration

[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://react.dev)
[![Shadcn/UI](https://img.shields.io/badge/shadcn%2Fui-000000?style=for-the-badge&logo=shadcnui&logoColor=white)](https://ui.shadcn.com)
[![Tailwind](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com)
[![Style Dictionary](https://img.shields.io/badge/Style_Dictionary-80d9d6?style=for-the-badge&logo=styledictionary&logoColor=white)](https://amzn.github.io/style-dictionary)
[![Figma](https://img.shields.io/badge/Figma-F24E1E?style=for-the-badge&logo=figma&logoColor=white)](https://www.figma.com)

A React + TypeScript project built on shadcn/ui and TailwindCSS that streamlines Figma token exports through automatic Style Dictionary conversion. While accessibility and theme switching are integrated, the core focus is on the Figma variable/token-driven design system.

## Requirements

- Node.js 18.x or higher
- pnpm 8.x or higher
- Tailwind CSS 3.x (not compatible with Tailwind 4.x yet)
- Vite 5.x
- React 18.x

## Installation

```bash
# Create new Vite project with React + TypeScript
pnpm create vite@latest my-app -- --template react-ts
cd my-app

# Install dependencies (specify Tailwind 3.x)
pnpm add tailwindcss@^3.4.1 @radix-ui/react-slot lucide-react class-variance-authority clsx tailwind-merge

# PostCSS is handled by Vite internally, but we'll create the config
pnpm dlx tailwindcss init -p

# Install development dependencies
pnpm add -D @types/node
```

## PostCSS Configuration
Vite handles PostCSS processing internally. The `postcss.config.js` created by Tailwind CLI is used by Vite's built-in PostCSS setup. No additional configuration is needed unless you want to add more PostCSS plugins.

```js
// postcss.config.js
export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}
```

## Quick Start

```bash
# Install all dependencies
pnpm install

# Start development server
pnpm dev
```

## Design System Setup

### 1. Figma Token Export
1. Export your design tokens from Figma as JSON using the "Figma Variables" export
2. Place the exported JSON in `design-tokens/figma/figma-variables-export.json`
3. The system expects the following structure:
   ```json
   {
     "tokens-default": {
       "spacing": { ... },
       "radius": { ... }
     },
     "primitives-light": {
       "color": { ... }
     },
     "primitives-dark": {
       "color": { ... }
     }
   }
   ```

### 2. Project Structure
```bash
design-tokens/
├── figma/
│   └── figma-variables-export.json  # Figma exported tokens
├── scripts/
│   ├── convert-tokens.ts    # Token conversion script
│   └── utils/
│       └── color.ts         # Color conversion utilities
src/
├── styles/
│   └── tokens.css          # Generated CSS variables
└── components/
    └── ui/                 # React components using the tokens
```

### 3. Token Processing
The system processes your Figma tokens through these steps:
1. **Conversion**: 
   - Converts color tokens from HEX to HSL format
   - Processes spacing and radius tokens
   - Generates light and dark theme variables
   - Handles opacity variants (10, 20, 50, 80, 90) for colors
   - Maintains compatibility with shadcn/ui token structure
2. **Integration**: 
   - CSS variables are generated in `src/styles/tokens.css`
   - Tailwind config is updated to use these variables
   - Components access tokens through Tailwind classes

### 4. Commands
```bash
# Convert Figma tokens to CSS variables
pnpm convert:tokens

# Start development server
pnpm dev
```

### 5. Working with Design Tokens

#### Token Updates
1. Export updated tokens from Figma Variables
2. Place the JSON file in `design-tokens/figma/`
3. Run `pnpm convert:tokens`
4. Changes will be reflected in `src/styles/tokens.css`

### 6. Using Tokens in Components

```tsx
// Example Button component using design tokens
const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-md text-sm font-medium",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive: "bg-destructive text-destructive-foreground",
        outline: "border border-input bg-background hover:bg-accent",
      },
      size: {
        default: "h-10 px-[var(--spacing-4)] py-2",
        sm: "h-9 px-[var(--spacing-3)]",
        lg: "h-11 px-[var(--spacing-8)]",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);
```

### 7. Available Token Categories
- **Colors**: 
  - Primary, Secondary, Accent colors
  - Background, Foreground pairs
  - Semantic colors (destructive, muted)
  - Opacity variants (10, 20, 50, 80, 90) for all colors
- **Spacing**: Values from 0-18 (0px to 72px)
- **Radius**: sm, md, lg, xl, full
- **Interactive States**:
  - Hover effects
  - Focus rings
  - Disabled states

### 8. Component Features
- **Theme Switching**: Automatic light/dark mode support
- **Accessibility**: Focus visible states, ARIA attributes
- **Icon Support**: Integration with Lucide icons
- **Variants**: Multiple style variants per component
- **Composition**: Slot pattern for component composition

### 9. shadcn/ui Integration
This project uses the shadcn/ui approach of copying components into your project rather than installing them as a package. This gives you full control over the components and allows for better integration with your token system.

Components are placed in `src/components/ui/` and can be customized to match your design system. The base components use your token system for styling, ensuring consistency across your application.

For detailed token documentation, check your Figma design system documentation.
