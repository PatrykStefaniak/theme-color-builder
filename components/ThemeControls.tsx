'use client';

import { Slider } from './Slider';

interface ThemeControlsProps {
    warmth: number;
    saturation: number;
    contrast: number;
    accessibility: number;
    onWarmthChange: (value: number) => void;
    onSaturationChange: (value: number) => void;
    onContrastChange: (value: number) => void;
    onAccessibilityChange: (value: number) => void;
}

export function ThemeControls({
    warmth,
    saturation,
    contrast,
    accessibility,
    onWarmthChange,
    onSaturationChange,
    onContrastChange,
    onAccessibilityChange,
}: ThemeControlsProps) {
    return (
        <div className="rounded-3xl p-10 space-y-3 border-2 border-(--border) bg-(--bg-light) shadow-xl h-full">
            <h2 className="text-3xl font-bold text-(--text-dark)">
                Theme Controls
            </h2>

            <div className="flex flex-col gap-y-6">
                <Slider
                    label="Warmth"
                    value={warmth}
                    onChange={onWarmthChange}
                    description="Cool blues to warm oranges"
                    icon="🌡️"
                />
                <Slider
                    label="Saturation"
                    value={saturation}
                    onChange={onSaturationChange}
                    description="Grayscale to vibrant colors"
                    icon="🎨"
                />
                <Slider
                    label="Contrast"
                    value={contrast}
                    onChange={onContrastChange}
                    description="Subtle to bold differences"
                    icon="◐"
                />
                <Slider
                    label="Accessibility"
                    value={accessibility}
                    onChange={onAccessibilityChange}
                    description="Enhanced readability & WCAG compliance"
                    icon="♿"
                />
            </div>
        </div>
    );
}
