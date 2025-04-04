import { writeFileSync, readFileSync } from 'fs';
import { convertHexToHsl } from './utils/color.ts';

interface TokenValue {
  value: string;
  type: string;
  scope?: string[];
  $extensions?: Record<string, unknown>;
}

interface ColorValue {
  [key: string]: TokenValue;
}

interface FigmaTokens {
  'tokens-default': {
    spacing: Record<string, TokenValue>;
    radius: Record<string, TokenValue>;
  };
  'primitives-light': {
    color: Record<string, ColorValue>;
  };
  'primitives-dark': {
    color: Record<string, ColorValue>;
  };
}

interface TokenConfig {
  inputPath: string;
  outputPath: string;
  defaultTheme: string;
  darkTheme: string;
  colorOpacity: string;
}

const config: TokenConfig = {
  inputPath: './design-tokens/figma/figma-variables-export.json',
  outputPath: 'src/styles/tokens.css',
  defaultTheme: 'light',
  darkTheme: 'dark',
  colorOpacity: '100' // The opacity level to use from color tokens
};

// shadcn/ui expected token categories
const shadcnTokenCategories = [
  'background',
  'foreground',
  'muted',
  'muted-foreground',
  'popover',
  'popover-foreground',
  'card',
  'card-foreground',
  'border',
  'input',
  'primary',
  'primary-foreground',
  'secondary',
  'secondary-foreground',
  'accent',
  'accent-foreground',
  'destructive',
  'destructive-foreground',
  'ring'
];

function convertTokens(config: TokenConfig) {
  // Read the Figma tokens export
  const figmaTokens = JSON.parse(readFileSync(config.inputPath, 'utf8')) as FigmaTokens;
  
  // Extract tokens from the Figma export
  const tokens = {
    spacing: figmaTokens['tokens-default'].spacing,
    radius: figmaTokens['tokens-default'].radius,
    colors: {} as Record<string, { DEFAULT: string }>,
    darkColors: {} as Record<string, { DEFAULT: string }>
  };

  // Extract light theme colors
  const lightColors = figmaTokens['primitives-light'].color;
  for (const [category, values] of Object.entries(lightColors)) {
    if (values[config.colorOpacity]) {
      tokens.colors[category] = { DEFAULT: values[config.colorOpacity].value };
    }
  }

  // Extract dark theme colors
  const darkColors = figmaTokens['primitives-dark'].color;
  for (const [category, values] of Object.entries(darkColors)) {
    if (values[config.colorOpacity]) {
      tokens.darkColors[category] = { DEFAULT: values[config.colorOpacity].value };
    }
  }

  // Create CSS variables
  const cssVariables = {};
  const darkVariables = {};

  // Add interaction state tokens
  cssVariables['opacity-button-disabled'] = '0.5';  // Standard disabled state opacity
  cssVariables['ring'] = '240 3.7% 15.9%';  // Dark gray for light mode
  cssVariables['ring-width'] = '2px';
  cssVariables['ring-offset'] = '2px';
  
  darkVariables['opacity-button-disabled'] = '0.5';
  darkVariables['ring'] = '0 0% 100%';  // White for dark mode
  darkVariables['ring-width'] = '2px';
  darkVariables['ring-offset'] = '2px';

  // Add color tokens with opacity variants
  for (const [key, value] of Object.entries(tokens.colors)) {
    if (typeof value === 'object') {
      const { DEFAULT } = value;
      const hsl = convertHexToHsl(DEFAULT).replace(/ \/ 100%$/, '');
      cssVariables[key] = hsl;
      
      // Add opacity variants if they exist in the Figma export
      const opacityVariants = ['10', '20', '50', '80', '90'];
      for (const opacity of opacityVariants) {
        if (lightColors[key]?.[opacity]) {
          const opacityHsl = convertHexToHsl(lightColors[key][opacity].value).replace(/ \/ 100%$/, '');
          cssVariables[`${key}-${opacity}`] = opacityHsl;
        }
      }
    }
  }

  // Add dark mode color tokens with opacity variants
  for (const [key, value] of Object.entries(tokens.darkColors)) {
    if (typeof value === 'object') {
      const { DEFAULT } = value;
      const hsl = convertHexToHsl(DEFAULT).replace(/ \/ 100%$/, '');
      darkVariables[key] = hsl;
      
      // Add opacity variants if they exist in the Figma export
      const opacityVariants = ['10', '20', '50', '80', '90'];
      for (const opacity of opacityVariants) {
        if (darkColors[key]?.[opacity]) {
          const opacityHsl = convertHexToHsl(darkColors[key][opacity].value).replace(/ \/ 100%$/, '');
          darkVariables[`${key}-${opacity}`] = opacityHsl;
        }
      }
    }
  }

  // Add spacing tokens
  for (const [key, value] of Object.entries(tokens.spacing)) {
    cssVariables[`spacing-${key}`] = value.value;
  }

  // Add radius tokens
  for (const [key, value] of Object.entries(tokens.radius)) {
    cssVariables[`radius-${key}`] = value.value;
  }

  // Generate the CSS content
  let cssContent = ':root {\n';
  
  // Add light theme variables (default)
  cssContent += Object.entries(cssVariables)
    .map(([key, value]) => `  --${key}: ${value};`)
    .join('\n');
  cssContent += '\n}\n\n';

  // Add dark theme variables
  cssContent += `.${config.darkTheme} {\n`;
  cssContent += Object.entries(darkVariables)
    .map(([key, value]) => `  --${key}: ${value};`)
    .join('\n');
  cssContent += '\n}\n';

  // Write to file
  writeFileSync(config.outputPath, cssContent);
  console.log('✅ Generated CSS tokens');
}

convertTokens(config); 