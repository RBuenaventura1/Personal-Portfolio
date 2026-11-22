const screenshots = [
    {
        src: '/projects/kahala/home.png',
        title: 'Resort landing page',
        description:
            'The current landing page introduces Kahala’s island setting, with navigation for accommodations, experiences, and reservations.',
    },
    {
        src: '/projects/kahala/sign-in.png',
        title: 'Guest sign-in interface',
        description:
            'The sign-in dialog uses the resort’s cream, teal, and gold visual identity.',
    },
    {
        src: '/projects/kahala/reservations.png',
        title: 'My reservations',
        description:
            'The current reservation interface displays accommodation details, reservation status, dates, guest count, and the total amount.',
    },
];

export default function KahalaProject() {
    return (
        <article className="project-card">
            <a
                href="https://kahala-resort.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="showcase-cover"
                aria-label="Visit Kahala Resort in a new tab"
            >
                <img
                    src="/projects/kahala/home.png"
                    alt="Kahala Resort landing page featuring overwater villas and turquoise water"
                    loading="lazy"
                    decoding="async"
                />

                <span className="showcase-cover-label">
                    Kahala Resort &amp; Retreat
                    <span aria-hidden="true">↗</span>
                </span>
            </a>

            <div className="project-content">
                <p className="eyebrow">
                    Resort Website &amp; Reservations
                </p>

                <h3>Kahala Resort</h3>

                <span className="project-development-badge">
                    <span aria-hidden="true" />
                    In development
                </span>

                <p className="kahala-description">
                    A resort website in development, bringing together
                    an accommodation-focused landing page, guest
                    sign-in, and a reservation experience.
                </p>

                <div className="showcase-tags">
                    <span>Resort experience</span>
                    <span>Guest sign-in</span>
                    <span>Reservations</span>
                </div>

                <details className="showcase-showcase">
                    <summary>
                        View development screenshots
                    </summary>

                    <div className="showcase-gallery">
                        {screenshots.map((screenshot) => (
                            <figure
                                key={screenshot.src}
                                className="showcase-media"
                            >
                                <a
                                    href={screenshot.src}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label={`Open ${screenshot.title} screenshot in a new tab`}
                                >
                                    <img
                                        src={screenshot.src}
                                        alt={screenshot.description}
                                        loading="lazy"
                                        decoding="async"
                                    />
                                </a>

                                <figcaption>
                                    <strong>
                                        {screenshot.title}
                                    </strong>

                                    <p>
                                        {screenshot.description}
                                    </p>
                                </figcaption>
                            </figure>
                        ))}

                        <p className="showcase-scope">
                            These screenshots show the current
                            development version. The interface and
                            features may change as the project
                            progresses.
                        </p>
                    </div>
                </details>

                <div className="project-footer">
                    <span>Project in progress</span>

                    <a
                        href="https://kahala-resort.vercel.app/"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Visit website
                        <span aria-hidden="true"> ↗</span>
                    </a>
                </div>
            </div>
        </article>
    );
}