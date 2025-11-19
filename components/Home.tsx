'use client';

import { useState, useEffect, useRef } from 'react';
import { ThemeControls } from './ThemeControls';
import { ThemePreview } from './ThemePreview';
import { generateTheme } from '../utils/themeGenerator';

export function Home() {
    const [warmth, setWarmth] = useState(50);
    const [saturation, setSaturation] = useState(50);
    const [contrast, setContrast] = useState(50);
    const [accessibility, setAccessibility] = useState(50);

    useEffect(() => {
        const theme = generateTheme(warmth, saturation, contrast, accessibility);

        Object.entries(theme).forEach(([key, value]) => {
            document.documentElement.style.setProperty(`--${key}`, value);
        });
    }, [warmth, saturation, contrast, accessibility]);

    return (
        <div className="min-h-screen bg-(--bg) flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="w-[80vw]">
                {/* Header */}
                <header className="text-center mb-12">
                    <h1 className="text-5xl sm:text-6xl font-bold mb-3 text-(--text-dark)">
                        Theme Color Builder
                    </h1>
                    <p className="text-xl text-(--text-light) max-w-2xl mx-auto">
                        Create beautiful, accessible themes using the OKLCH color space
                    </p>
                </header>

                {/* Main Content */}
                <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 lg:gap-10">
                    {/* Controls */}
                    <div className="flex flex-col">
                        <ThemeControls
                            warmth={warmth}
                            saturation={saturation}
                            contrast={contrast}
                            accessibility={accessibility}
                            onWarmthChange={setWarmth}
                            onSaturationChange={setSaturation}
                            onContrastChange={setContrast}
                            onAccessibilityChange={setAccessibility}
                        />
                    </div>

                    {/* Preview */}
                    <div className="flex flex-col">
                        <ThemePreview />
                    </div>
                </div>
            </div>
        </div>
    );
}
