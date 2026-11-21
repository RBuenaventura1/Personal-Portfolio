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
                            animationDuration: `${1.1 + (index % 7) * 0.15
                                }s`,
                        }}
                    />
                ))}
            </div>
        </div>
    );
}