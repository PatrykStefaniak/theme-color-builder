const WARMTH_TO_HUE_DEGREES = 3.6; // 0–100 warmth → 0–360° hue

const SECONDARY_HUE_OFFSET_DEGREES = 60; // secondary is shifted by +60°

// Chroma ranges (how colorful things get as saturation increases)
const NEUTRAL_CHROMA_BASE = 0.01;
const NEUTRAL_CHROMA_RANGE = 0.02;

const UI_CHROMA_BASE = 0.08;
const UI_CHROMA_RANGE = 0.12;

const ACCENT_CHROMA_BASE = 0.05;
const ACCENT_CHROMA_RANGE = 0.15;

// Background lightness behaviour vs contrast
// Higher contrast pushes darks darker and lights lighter.
const BG_DARK_BASE_L = 0.12;
const BG_DARK_REVERSE_CONTRAST_SCALE = 0.08; // multiplied by (1 - contrast)

const BG_BASE_L = 0.96;
const BG_BASE_CONTRAST_SCALE = 0.08;

const BG_LIGHT_L = 0.99;
const BG_LIGHT_CONTRAST_SCALE = 0.02;

// Text lightness behaviour vs contrast & accessibility
const TEXT_LIGHT_BASE_L = 0.45;
const TEXT_LIGHT_CONTRAST_SCALE = 0.15;
const TEXT_LIGHT_A11Y_SCALE = 0.10;

const TEXT_BASE_L = 0.30;
const TEXT_BASE_CONTRAST_SCALE = 0.05;
const TEXT_BASE_A11Y_SCALE = 0.05;

const TEXT_DARK_BASE_L = 0.15;
const TEXT_DARK_CONTRAST_SCALE = 0.05;
const TEXT_DARK_A11Y_SCALE = 0.05;

// Border lightness behaviour vs contrast
const BORDER_LIGHT_BASE_L = 0.93;
const BORDER_LIGHT_CONTRAST_SCALE = 0.05;

const BORDER_BASE_L = 0.83;
const BORDER_BASE_CONTRAST_SCALE = 0.08;

const BORDER_DARK_BASE_L = 0.68;
const BORDER_DARK_CONTRAST_SCALE = 0.13;

// Accessibility thresholds
const TEXT_MIN_L_DEFAULT = 0.15;
const TEXT_MIN_L_HIGH_A11Y = 0.25;

const BG_MAX_L_DEFAULT = 0.98;
const BG_MAX_L_HIGH_A11Y = 0.95;

// Primary / secondary base lightness
const PRIMARY_BASE_L = 0.50;
const PRIMARY_CONTRAST_SCALE = 0.10;

const SECONDARY_BASE_L = 0.55;
const SECONDARY_CONTRAST_SCALE = 0.10;

// Status colors (fixed hues with slight a11y tweaks)
const DANGER_BASE_L = 0.55;
const DANGER_A11Y_SCALE = 0.05;
const DANGER_HUE = 25; // red‑orange

const WARNING_BASE_L = 0.70;
const WARNING_A11Y_SCALE = 0.05;
const WARNING_CHROMA_A11Y_MULTIPLIER = 1.1;
const WARNING_HUE = 85; // yellow‑orange

const SUCCESS_BASE_L = 0.58;
const SUCCESS_A11Y_SCALE = 0.03;
const SUCCESS_HUE = 145; // green

const INFO_BASE_L = 0.58;
const INFO_CHROMA_MULTIPLIER = 0.85;
const INFO_HUE = 240; // blue

// OKLCH clamping
const OKLCH_L_MIN = 0;
const OKLCH_L_MAX = 1;
const OKLCH_CHROMA_MIN = 0;
const OKLCH_CHROMA_MAX = 0.4;
const FULL_HUE_ROTATION_DEGREES = 360;

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
    // Normalised slider values
    const hueBase = warmth * WARMTH_TO_HUE_DEGREES; // 0–360°
    const chromaMultiplier = saturation / 100;       // 0–1
    const contrastFactor = contrast / 100;           // 0–1
    const accessibilityFactor = accessibility / 100; // 0–1

    // Hues for different roles
    const neutralHue = hueBase;
    const primaryHue = hueBase;
    const secondaryHue = (hueBase + SECONDARY_HUE_OFFSET_DEGREES) % FULL_HUE_ROTATION_DEGREES;

    // Base chroma values (scaled by saturation)
    const neutralChroma = NEUTRAL_CHROMA_BASE + (NEUTRAL_CHROMA_RANGE * chromaMultiplier);
    const uiChroma = UI_CHROMA_BASE + (UI_CHROMA_RANGE * chromaMultiplier);
    const accentChroma = ACCENT_CHROMA_BASE + (ACCENT_CHROMA_RANGE * chromaMultiplier);

    // Background lightness
    const bgLightness = {
        dark: BG_DARK_BASE_L + (BG_DARK_REVERSE_CONTRAST_SCALE * (1 - contrastFactor)),
        base: BG_BASE_L - (BG_BASE_CONTRAST_SCALE * contrastFactor),
        light: BG_LIGHT_L - (BG_LIGHT_CONTRAST_SCALE * contrastFactor),
    };

    // Text lightness
    const textLightness = {
        light:
            TEXT_LIGHT_BASE_L +
            (TEXT_LIGHT_CONTRAST_SCALE * contrastFactor) +
            (TEXT_LIGHT_A11Y_SCALE * accessibilityFactor),
        base:
            TEXT_BASE_L -
            (TEXT_BASE_CONTRAST_SCALE * contrastFactor) -
            (TEXT_BASE_A11Y_SCALE * accessibilityFactor),
        dark:
            TEXT_DARK_BASE_L -
            (TEXT_DARK_CONTRAST_SCALE * contrastFactor) -
            (TEXT_DARK_A11Y_SCALE * accessibilityFactor),
    };

    // Border lightness
    const borderLightness = {
        light: BORDER_LIGHT_BASE_L - (BORDER_LIGHT_CONTRAST_SCALE * contrastFactor),
        base: BORDER_BASE_L - (BORDER_BASE_CONTRAST_SCALE * contrastFactor),
        dark: BORDER_DARK_BASE_L - (BORDER_DARK_CONTRAST_SCALE * contrastFactor),
    };

    // Accessibility adjustments
    const textMinLightness = accessibilityFactor > 0.5 ? TEXT_MIN_L_HIGH_A11Y : TEXT_MIN_L_DEFAULT;
    const bgMaxLightness = accessibilityFactor > 0.5 ? BG_MAX_L_HIGH_A11Y : BG_MAX_L_DEFAULT;

    // Primary / secondary lightness
    const primaryLightness = PRIMARY_BASE_L + (PRIMARY_CONTRAST_SCALE * contrastFactor);
    const secondaryLightness = SECONDARY_BASE_L + (SECONDARY_CONTRAST_SCALE * contrastFactor);

    // Final theme object
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
            DANGER_BASE_L - (DANGER_A11Y_SCALE * accessibilityFactor),
            accentChroma,
            DANGER_HUE
        ),
        'warning': oklch(
            WARNING_BASE_L + (WARNING_A11Y_SCALE * accessibilityFactor),
            accentChroma * WARNING_CHROMA_A11Y_MULTIPLIER,
            WARNING_HUE
        ),
        'success': oklch(
            SUCCESS_BASE_L - (SUCCESS_A11Y_SCALE * accessibilityFactor),
            accentChroma,
            SUCCESS_HUE
        ),
        'info': oklch(
            INFO_BASE_L,
            uiChroma * INFO_CHROMA_MULTIPLIER,
            INFO_HUE
        ),
    };
}

/**
 * Format OKLCH color string
 */
function oklch(lightness: number, chroma: number, hue: number): string {
    // Clamp values to valid ranges
    const l = Math.max(OKLCH_L_MIN, Math.min(OKLCH_L_MAX, lightness));
    const c = Math.max(OKLCH_CHROMA_MIN, Math.min(OKLCH_CHROMA_MAX, chroma));
    const h = ((hue % FULL_HUE_ROTATION_DEGREES) + FULL_HUE_ROTATION_DEGREES) % FULL_HUE_ROTATION_DEGREES;

    return `oklch(${l.toFixed(3)} ${c.toFixed(3)} ${h.toFixed(1)})`;
}