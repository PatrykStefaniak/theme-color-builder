/**
 * Generate a complete theme based on user inputs
 * @param warmth 0-100 (0 = cool/blue, 100 = warm/orange)
 * @param saturation 0-100 (0 = grayscale, 100 = vibrant)
 * @param contrast 0-100 (0 = low contrast, 100 = high contrast)
 * @param accessibility 0-100 (0 = ignore WCAG, 100 = ensure high contrast)
 */
export function generateTheme(
  warmth: number,
  saturation: number,
  contrast: number,
  accessibility: number
) {
  // Convert 0-100 to useful ranges
  const hueBase = warmth * 3.6; // 0-360 degrees (0=blue, 180=red-orange, 360=blue)
  const chromaMultiplier = saturation / 100; // 0-1
  const contrastFactor = contrast / 100; // 0-1
  const accessibilityFactor = accessibility / 100; // 0-1

  // Calculate hue for different color types
  const neutralHue = hueBase;
  const primaryHue = hueBase;
  const secondaryHue = (hueBase + 60) % 360; // +60 degrees for secondary

  // Base chroma values (adjusted by saturation)
  const neutralChroma = 0.01 + (0.02 * chromaMultiplier);
  const uiChroma = 0.08 + (0.12 * chromaMultiplier);
  const accentChroma = 0.05 + (0.15 * chromaMultiplier);

  // Calculate lightness values based on contrast
  // Higher contrast = more extreme lightness values
  const bgLightness = {
    dark: 0.12 + (0.08 * (1 - contrastFactor)),
    base: 0.96 - (0.08 * contrastFactor),
    light: 0.99 - (0.02 * contrastFactor),
  };

  const textLightness = {
    light: 0.45 + (0.15 * contrastFactor) + (0.1 * accessibilityFactor),
    base: 0.30 - (0.05 * contrastFactor) - (0.05 * accessibilityFactor),
    dark: 0.15 - (0.05 * contrastFactor) - (0.05 * accessibilityFactor),
  };

  const borderLightness = {
    light: 0.93 - (0.05 * contrastFactor),
    base: 0.83 - (0.08 * contrastFactor),
    dark: 0.68 - (0.13 * contrastFactor),
  };

  // Ensure accessibility adjustments
  const textMinLightness = accessibilityFactor > 0.5 ? 0.25 : 0.15;
  const bgMaxLightness = accessibilityFactor > 0.5 ? 0.95 : 0.98;

  // Primary and secondary lightness
  const primaryLightness = 0.50 + (0.1 * contrastFactor);
  const secondaryLightness = 0.55 + (0.1 * contrastFactor);

  // Generate theme
  return {
    // Backgrounds
    'bg-dark': oklch(
      Math.max(bgLightness.dark, 0.10),
      neutralChroma * 0.5,
      neutralHue
    ),
    'bg': oklch(
      Math.min(bgLightness.base, bgMaxLightness),
      neutralChroma * 0.3,
      neutralHue
    ),
    'bg-light': oklch(
      Math.min(bgLightness.light, bgMaxLightness + 0.02),
      neutralChroma * 0.2,
      neutralHue
    ),

    // Text
    'text-light': oklch(
      textLightness.light,
      neutralChroma,
      neutralHue
    ),
    'text': oklch(
      Math.max(textLightness.base, textMinLightness),
      neutralChroma * 1.2,
      neutralHue
    ),
    'text-dark': oklch(
      Math.max(textLightness.dark, textMinLightness - 0.05),
      neutralChroma * 1.5,
      neutralHue
    ),

    // Highlight
    'highlight': oklch(
      bgLightness.base - 0.03,
      neutralChroma * 2,
      primaryHue
    ),

    // Borders
    'border-light': oklch(
      borderLightness.light,
      neutralChroma * 0.8,
      neutralHue
    ),
    'border': oklch(
      borderLightness.base,
      neutralChroma * 1.2,
      neutralHue
    ),
    'border-dark': oklch(
      borderLightness.dark,
      neutralChroma * 1.5,
      neutralHue
    ),

    // Primary & Secondary
    'primary': oklch(
      primaryLightness,
      uiChroma,
      primaryHue
    ),
    'secondary': oklch(
      secondaryLightness,
      uiChroma * 0.9,
      secondaryHue
    ),

    // Status colors (fixed hues with adjusted saturation)
    'danger': oklch(
      0.55 - (0.05 * accessibilityFactor),
      accentChroma,
      25 // Red-orange
    ),
    'warning': oklch(
      0.70 + (0.05 * accessibilityFactor),
      accentChroma * 1.1,
      85 // Yellow-orange
    ),
    'success': oklch(
      0.58 - (0.03 * accessibilityFactor),
      accentChroma,
      145 // Green
    ),
    'info': oklch(
      0.58,
      uiChroma * 0.85,
      240 // Blue
    ),
  };
}

/**
 * Format OKLCH color string
 */
function oklch(lightness: number, chroma: number, hue: number): string {
  // Clamp values to valid ranges
  const l = Math.max(0, Math.min(1, lightness));
  const c = Math.max(0, Math.min(0.4, chroma));
  const h = ((hue % 360) + 360) % 360;

  return `oklch(${l.toFixed(3)} ${c.toFixed(3)} ${h.toFixed(1)})`;
}

