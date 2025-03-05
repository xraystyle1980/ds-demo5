import { type Config } from "tailwindcss";

export default {
    darkMode: ["class"],
    content: [
    "./index.html", // ✅ Ensure Tailwind scans the main HTML file
    "./src/**/*.{js,ts,jsx,tsx}", // ✅ Ensure all React files are included
  ],
  theme: {
  	extend: {
  		borderRadius: {
  			sm: 'var(--radius-rounded-sm)',
  			md: 'var(--radius-rounded-md)',
  			lg: 'var(--radius-rounded-lg)',
  			xl: 'var(--radius-rounded-xl)',
  			full: 'var(--radius-rounded-full)',
  		},
      ringWidth: {
        DEFAULT: 'var(--ring-width)',
      },
      ringOffsetWidth: {
        DEFAULT: 'var(--ring-offset)',
      },
  		spacing: {
  			0: 'var(--spacing-0)',
  			1: 'var(--spacing-1)',
  			2: 'var(--spacing-2)',
  			3: 'var(--spacing-3)',
  			4: 'var(--spacing-4)',
  			5: 'var(--spacing-5)',
  			6: 'var(--spacing-6)',
  			7: 'var(--spacing-7)',
  			8: 'var(--spacing-8)',
  			9: 'var(--spacing-9)',
  			10: 'var(--spacing-10)',
  			11: 'var(--spacing-11)',
  			12: 'var(--spacing-12)',
  		},
  		colors: {
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			primary: {
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			}
  		}
  	}
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;