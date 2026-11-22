const screenshots = [
    {
        src: '/projects/printopia/home.png',
        title: 'Customer storefront',
        description:
            'The landing page introduces the printing service and its product categories.',
    },
    {
        src: '/projects/printopia/products.png',
        title: 'Product catalog',
        description:
            'Customers can explore products, search the catalog, and choose a customization option.',
    },
    {
        src: '/projects/printopia/customer-dashboard.png',
        title: 'Customer dashboard',
        description:
            'An overview of customer orders, saved designs, notifications, and quick actions.',
    },
];

const demonstrations = [
    {
        src: '/projects/printopia/tshirt-demo.mp4',
        title: 'T-shirt customization',
        description:
            'A demonstration of rotating the 3D T-shirt preview to inspect the applied artwork.',
    },
    {
        src: '/projects/printopia/mug-demo.mp4',
        title: 'Mug customization',
        description:
            'A demonstration of viewing a customized mug from different angles in the 3D preview.',
    },
];

export default function PrintopiaProject() {
    return (
        <article className="project-card">
            <a
                href="/projects/printopia/home.png"
                target="_blank"
                rel="noopener noreferrer"
                className="showcase-cover"
                aria-label="Open the Printopia storefront screenshot in a new tab"
            >
                <img
                    src="/projects/printopia/home.png"
                    alt="Printopia customer storefront with printing product categories"
                    width={1896}
                    height={960}
                    loading="lazy"
                    decoding="async"
                />

                <span className="showcase-cover-label">
                    Customer experience
                    <span aria-hidden="true">↗</span>
                </span>
            </a>

            <div className="project-content">
                <p className="eyebrow">
                    Printing platform · Team project
                </p>

                <h3>Printopia</h3>

                <p>
                    A printing platform with a customer-facing product
                    catalog, artwork customization, interactive 3D
                    previews, and an order dashboard.
                </p>

                <div className="project-contributions">
                    <h4>My contributions</h4>

                    <ul>
                        <li>Developed the customer ordering workflow.</li>
                        <li>Contributed to the customer dashboard.</li>
                        <li>
                            Integrated Cloudinary for image and large media file
                            uploads and storage.
                        </li>
                        <li>
                            Integrated Groq AI to power the customer-facing chatbot.
                        </li>
                    </ul>
                </div>

                <div className="showcase-tags">
                    <span>Product catalog</span>
                    <span>Design editor</span>
                    <span>3D preview</span>
                    <span>Customer orders</span>
                </div>

                <details className="showcase-showcase">
                    <summary>
                        View screenshots &amp; demos
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

                        {demonstrations.map((demo, index) => (
                            <figure
                                key={demo.src}
                                className="showcase-media"
                            >
                                <video
                                    controls
                                    playsInline
                                    muted
                                    preload="none"
                                    aria-label={demo.title}
                                    aria-describedby={`showcase-demo-${index}`}
                                >
                                    <source
                                        src={demo.src}
                                        type="video/mp4"
                                    />

                                    Your browser does not support
                                    embedded video.
                                </video>

                                <figcaption>
                                    <strong>{demo.title}</strong>

                                    <p id={`showcase-demo-${index}`}>
                                        {demo.description}
                                    </p>

                                    <a
                                        href={demo.src}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="showcase-video-link"
                                    >
                                        Open video separately ↗
                                    </a>
                                </figcaption>
                            </figure>
                        ))}

                        <p className="showcase-scope">
                            This showcase covers the customer-facing
                            experience. Internal administration and
                            employee workflows are confidential.
                        </p>
                    </div>
                </details>

                <div className="project-footer">
                    <span>Role: Front-end Developer &amp; Integration Contributor</span>

                    <a href="#contact">
                        Ask about this project{' '}
                        <span aria-hidden="true">↗</span>
                    </a>
                </div>
            </div>
        </article>
    );
}