'use client';

interface SliderProps {
    label: string;
    value: number;
    onChange: (value: number) => void;
    description: string;
    icon: string;
}

export function Slider({ label, value, onChange, description, icon }: SliderProps) {
    return (
        <div className="">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <span className="text-2xl">{icon}</span>
                    <label className="text-xl font-semibold text-(--text-dark)">
                        {label}
                    </label>
                    <p className="text-base text-(--text-light)">
                        {description}
                    </p>
                </div>
                <span className="text-xl font-bold p-2 w-14 rounded-lg bg-(--highlight) text-(--text-dark) text-center">
                    {value}
                </span>
            </div>
            
            <input
                type="range"
                min="0"
                max="100"
                value={value}
                onChange={(e) => onChange(Number(e.target.value))}
                className="w-full h-3 rounded-lg appearance-none cursor-pointer slider"
                style={{
                    background: `linear-gradient(to right, var(--primary) 0%, var(--primary) ${value}%, var(--border) ${value}%, var(--border) 100%)`,
                }}
            />
        </div>
    );
}
