'use client';

export function ThemePreview() {
    return (
        <div className="space-y-6">
            <div className="rounded-3xl p-8 space-y-5 border-2 border-(--border) bg-(--bg-light) shadow-xl">
                <h2 className="text-3xl font-bold text-(--text-dark)">
                    Color Palette
                </h2>
                <div className="space-y-4">
                    <div>
                        <h3 className="text-sm font-semibold text-(--text-light) mb-3 uppercase tracking-wider">
                            Backgrounds
                        </h3>
                        <div className="grid grid-cols-3 gap-3">
                            <ColorSwatch name="bg-dark" label="Dark" />
                            <ColorSwatch name="bg" label="Base" />
                            <ColorSwatch name="bg-light" label="Light" />
                        </div>
                    </div>
                    <div>
                        <h3 className="text-sm font-semibold text-(--text-light) mb-3 uppercase tracking-wider">
                            Text Colors
                        </h3>
                        <div className="grid grid-cols-3 gap-3">
                            <ColorSwatch name="text-dark" label="Dark" />
                            <ColorSwatch name="text" label="Base" />
                            <ColorSwatch name="text-light" label="Light" />
                        </div>
                    </div>
                    <div>
                        <h3 className="text-sm font-semibold text-(--text-light) mb-3 uppercase tracking-wider">
                            Borders
                        </h3>
                        <div className="grid grid-cols-3 gap-3">
                            <ColorSwatch name="border-dark" label="Dark" />
                            <ColorSwatch name="border" label="Base" />
                            <ColorSwatch name="border-light" label="Light" />
                        </div>
                    </div>
                    <div>
                        <h3 className="text-sm font-semibold text-(--text-light) mb-3 uppercase tracking-wider">
                            UI Colors
                        </h3>
                        <div className="grid grid-cols-3 gap-3">
                            <ColorSwatch name="highlight" label="Highlight" />
                            <ColorSwatch name="primary" label="Primary" />
                            <ColorSwatch name="secondary" label="Secondary" />
                        </div>
                    </div>
                    <div>
                        <h3 className="text-sm font-semibold text-(--text-light) mb-3 uppercase tracking-wider">
                            Status Colors
                        </h3>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                            <ColorSwatch name="success" label="Success" />
                            <ColorSwatch name="warning" label="Warning" />
                            <ColorSwatch name="danger" label="Danger" />
                            <ColorSwatch name="info" label="Info" />
                        </div>
                    </div>
                </div>
            </div>

            {/* UI Components Preview */}
            <div className="rounded-3xl p-8 space-y-5 border-2 border-(--border) bg-(--bg-light) shadow-xl">
                <h3 className="text-3xl font-bold text-(--text-dark)">
                    UI Components
                </h3>

                {/* Buttons */}
                <div>
                    <h4 className="text-sm font-semibold text-(--text-light) mb-3 uppercase tracking-wider">
                        Buttons
                    </h4>
                    <div className="flex flex-wrap gap-3">
                        <button className="px-6 py-3 rounded-xl font-semibold transition-all hover:opacity-80 hover:scale-105 bg-(--primary) text-(--bg-light) shadow-lg">
                            Primary
                        </button>
                        <button className="px-6 py-3 rounded-xl font-semibold transition-all hover:opacity-80 hover:scale-105 bg-(--secondary) text-(--bg-light) shadow-lg">
                            Secondary
                        </button>
                        <button className="px-6 py-3 rounded-xl font-semibold transition-all hover:opacity-80 hover:scale-105 bg-(--success) text-(--bg-light) shadow-lg">
                            Success
                        </button>
                        <button className="px-6 py-3 rounded-xl font-semibold transition-all hover:opacity-80 hover:scale-105 bg-(--danger) text-(--bg-light) shadow-lg">
                            Danger
                        </button>
                    </div>
                </div>

                {/* Alert Boxes */}
                <div>
                    <h4 className="text-sm font-semibold text-(--text-light) mb-3 uppercase tracking-wider">
                        Alerts
                    </h4>
                    <div className="space-y-3">
                        <div className="p-5 rounded-xl bg-(--info) text-(--bg-light) shadow-md">
                            <strong className="font-bold">Info:</strong> This is an informational message
                        </div>
                        <div className="p-5 rounded-xl bg-(--warning) text-(--text-dark) shadow-md">
                            <strong className="font-bold">Warning:</strong> Please review this carefully
                        </div>
                    </div>
                </div>

                {/* Input */}
                <div>
                    <h4 className="text-sm font-semibold text-(--text-light) mb-3 uppercase tracking-wider">
                        Input Field
                    </h4>
                    <input
                        type="text"
                        placeholder="Sample input field..."
                        className="w-full px-5 py-3 rounded-xl outline-none transition-all bg-(--bg) text-(--text) border-2 border-(--border) focus:border-(--primary) shadow-sm"
                    />
                </div>

                {/* Card */}
                <div>
                    <h4 className="text-sm font-semibold text-(--text-light) mb-3 uppercase tracking-wider">
                        Card
                    </h4>
                    <div className="p-6 rounded-2xl bg-(--bg) border-2 border-(--border-light) shadow-md">
                        <h5 className="text-xl font-bold mb-2 text-(--text-dark)">
                            Sample Card
                        </h5>
                        <p className="text-(--text-light) leading-relaxed">
                            This card demonstrates how content looks with the current theme. The spacing and colors adapt dynamically.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

function ColorSwatch({ name, label }: { name: string; label: string }) {
    const isDark = name.includes('text') || name.includes('dark') || 
                   name === 'primary' || name === 'secondary' || 
                   name === 'danger' || name === 'success' || name === 'info';
    
    return (
        <div 
            className="rounded-xl p-5 text-center transition-transform hover:scale-110 border-2 border-(--border) shadow-md cursor-pointer"
            style={{ 
                background: `var(--${name})`,
            }}
        >
            <div 
                className="text-sm font-bold"
                style={{ 
                    color: isDark ? 'var(--bg-light)' : 'var(--text)',
                }}
            >
                {label}
            </div>
        </div>
    );
}
