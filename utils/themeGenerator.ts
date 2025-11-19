const SLIDER_MAX = 100;

const CHROMA_MAX = 0.4;

const HUE_MAX = 50;
const HUE_MIN = 330;
const HUE_INTERPOLATION_FACTOR = getInterpolationIndex(HUE_MIN, HUE_MAX, SLIDER_MAX);

const LIGHTNESS_MIN_VALUES = {
    "bg-dark": 0.88,
    "bg": 0.95,
    "bg-light": 0.99,
    "text-light": 0.40,
    "text": 0.22,
    "text-dark": 0.12,
    "border-light": 0.88,
    "border": 0.78,
    "border-dark": 0.65,
    "primary": 0.48,
    "secondary": 0.53,
};

// NOTE: not using interpolation method here because range is 1, so dividing by 1 does nothing.
const LIGHTNESS_INTERPOLATIONS = {
    "bg-dark": LIGHTNESS_MIN_VALUES["bg-dark"] - 0.94,
    "bg": LIGHTNESS_MIN_VALUES["bg"] - 0.97,
    "bg-light": LIGHTNESS_MIN_VALUES["bg-light"] - 0.99,
    "text-light": LIGHTNESS_MIN_VALUES["text-light"] - 0.50,
    "text": LIGHTNESS_MIN_VALUES["text"] - 0.35,
    "text-dark": LIGHTNESS_MIN_VALUES["text-dark"] - 0.25,
    "border-light": LIGHTNESS_MIN_VALUES["border-light"] - 0.92,
    "border": LIGHTNESS_MIN_VALUES["border"] - 0.87,
    "border-dark": LIGHTNESS_MIN_VALUES["border-dark"] - 0.80,
    "primary": LIGHTNESS_MIN_VALUES["primary"] - 0.52,
    "secondary": LIGHTNESS_MIN_VALUES["secondary"] - 0.57,
};

const CHROMA_MIN_VALUES = {
    background: 0.0225,
    textAndBorder: 0.045,
    highlight: 0.09,
    ui: 0.27,
};

const CHROMA_INTERPOLATIONS = {
    background: getInterpolationIndex(CHROMA_MIN_VALUES.background, 0.09, 0.4),
    textAndBorder: getInterpolationIndex(CHROMA_MIN_VALUES.textAndBorder, 0.135, 0.4),
    highlight: getInterpolationIndex(CHROMA_MIN_VALUES.highlight, 0.18, 0.4),
    ui: getInterpolationIndex(CHROMA_MIN_VALUES.ui, 0.4, 0.4),
};

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
    const lightness = contrast / SLIDER_MAX;
    const chroma = saturation * CHROMA_MAX / SLIDER_MAX;
    const hue = HUE_MIN + HUE_INTERPOLATION_FACTOR * warmth;
    
    return {
        ...getBackground(lightness, chroma, hue),
        ...getText(lightness, chroma, hue),
        ...getBorder(lightness, chroma, hue),
        ...getHighlight(lightness, chroma, hue),

        "primary": oklch(lightness + 0.1, chroma, hue),
        "secondary": oklch(lightness, chroma, hue),

        "danger": oklch(lightness + 0.1, chroma, hue),
        "warning": oklch(lightness, chroma, hue),
        "success": oklch(lightness + 0.1, chroma, hue),
        "info": oklch(lightness, chroma, hue),
    };
}

function getBackground(lightness: number, chroma: number, hue: number): {
    "bg-dark": string
    "bg": string
    "bg-light": string
} {
    const interpolatedChroma = CHROMA_MIN_VALUES.background + CHROMA_INTERPOLATIONS.background * chroma;
    const lightLightness = LIGHTNESS_MIN_VALUES["bg-light"] + LIGHTNESS_INTERPOLATIONS["bg-light"] * lightness;
    const NormalLightness = LIGHTNESS_MIN_VALUES["bg"] + LIGHTNESS_INTERPOLATIONS["bg"] * lightness;
    const darkLightness = LIGHTNESS_MIN_VALUES["bg-dark"] + LIGHTNESS_INTERPOLATIONS["bg-dark"] * lightness;

    return {
        "bg-light": oklch(lightLightness, interpolatedChroma * 1.1, hue),
        "bg": oklch(NormalLightness, interpolatedChroma, hue),
        "bg-dark": oklch(darkLightness, interpolatedChroma * .9, hue),
    }
}

function getText(lightness: number, chroma: number, hue: number): {
    "text-light": string
    "text": string
    "text-dark": string
} {
    const interpolatedChroma = CHROMA_MIN_VALUES.textAndBorder + CHROMA_INTERPOLATIONS.textAndBorder * chroma;
    const lightLightness = LIGHTNESS_MIN_VALUES["text-light"] + LIGHTNESS_INTERPOLATIONS["text-light"] * lightness;
    const NormalLightness = LIGHTNESS_MIN_VALUES["text"] + LIGHTNESS_INTERPOLATIONS["text"] * lightness;
    const darkLightness = LIGHTNESS_MIN_VALUES["text-dark"] + LIGHTNESS_INTERPOLATIONS["text-dark"] * lightness;

    return {
        "text-light": oklch(lightLightness, interpolatedChroma * 1.1, hue),
        "text": oklch(NormalLightness, interpolatedChroma, hue),
        "text-dark": oklch(darkLightness, interpolatedChroma * .9, hue),
    }
}

function getBorder(lightness: number, chroma: number, hue: number): {
    "border-light": string
    "border": string
    "border-dark": string
} {
    const interpolatedChroma = CHROMA_MIN_VALUES.textAndBorder + CHROMA_INTERPOLATIONS.textAndBorder * chroma;
    const lightLightness = LIGHTNESS_MIN_VALUES["border-light"] + LIGHTNESS_INTERPOLATIONS["border-light"] * lightness;
    const NormalLightness = LIGHTNESS_MIN_VALUES["border"] + LIGHTNESS_INTERPOLATIONS["border"] * lightness;
    const darkLightness = LIGHTNESS_MIN_VALUES["border-dark"] + LIGHTNESS_INTERPOLATIONS["border-dark"] * lightness;

    return {
        "border-light": oklch(lightLightness, interpolatedChroma * 1.1, hue),
        "border": oklch(NormalLightness, interpolatedChroma, hue),
        "border-dark": oklch(darkLightness, interpolatedChroma * .9, hue),
    }
}

function getHighlight(lightness: number, chroma: number, hue: number): {
    "highlight": string
} {
    const interpolatedChroma = CHROMA_MIN_VALUES.highlight + CHROMA_INTERPOLATIONS.highlight * chroma;

    return {
        "highlight": oklch(lightness, interpolatedChroma, hue),
    }
}

function getInterpolationIndex(min: number, max: number, range: number): number {
    return (max - min) / range;
}

function oklch(lightness: number, chroma: number, hue: number): string {
    return `oklch(${lightness.toFixed(3)} ${chroma.toFixed(3)} ${hue.toFixed(1)})`;
}