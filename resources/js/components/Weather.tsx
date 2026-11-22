import type { CSSProperties } from 'react';

const droplets = Array.from({ length: 72 }, (_, index) => {
    const size = 3 + ((index * 7) % 16);

    return {
        id: index,
        left: ((index * 37 + 11) % 100),
        top: ((index * 61 + 7) % 100),
        width: size,
        height: size * (1.2 + (index % 4) * 0.2),
        sliding: index % 7 === 0,
        duration: 14 + (index % 6) * 3,
        delay: -(index % 9) * 4,
    };
});

export default function Weather() {
    return (
        <div className="weather-effects" aria-hidden="true">
            <div className="weather-sun" />

            <div className="weather-cloud weather-cloud-one" />
            <div className="weather-cloud weather-cloud-two" />

            <div className="weather-rain">
                {Array.from({ length: 40 }, (_, index) => (
                    <span
                        key={index}
                        className="raindrop"
                        style={{
                            left: `${(index * 37) % 100}%`,
                            animationDelay: `${-(index % 11) * 0.37}s`,
                            animationDuration: `${1.1 + (index % 7) * 0.15}s`,
                        }}
                    />
                ))}
            </div>

            <div className="glass-rain">
                {droplets.map((drop) => (
                    <span
                        key={drop.id}
                        className={
                            drop.sliding
                                ? 'glass-drop glass-drop--sliding'
                                : 'glass-drop'
                        }
                        style={
                            {
                                left: `${drop.left}%`,
                                top: `${drop.top}%`,
                                width: `${drop.width}px`,
                                height: `${drop.height}px`,
                                '--slide-duration': `${drop.duration}s`,
                                '--slide-delay': `${drop.delay}s`,
                            } as CSSProperties
                        }
                    />
                ))}
            </div>
        </div>
    );
}