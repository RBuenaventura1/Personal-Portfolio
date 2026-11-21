import { Head } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import Weather from '../components/Weather';
import CursorTrail from '../components/CursorTrail';
import '../../css/portfolio.css';

const navigation = ['Home', 'About', 'Skills', 'Projects', 'Contact'];

const skillGroups = [
    {
        title: 'Programming',
        skills: ['HTML', 'JavaScript', 'PHP', 'Kotlin', 'Java'],
    },
    {
        title: 'Data & Cloud',
        skills: ['SQL', 'Supabase', 'Firebase', 'Cloudinary'],
    },
    {
        title: 'Development',
        skills: [
            'Responsive UI Design',
            'API Integration',
            'Web & Mobile Applications',
        ],
    },
    {
        title: 'Collaboration',
        skills: [
            'Problem Solving',
            'Communication',
            'Teamwork',
            'Project Management Fundamentals',
        ],
    },
];

const projects = [
    {
        number: '01',
        name: 'Printopia',
        category: 'Business Management Platform',
        description:
            'A platform designed for printing business processes through 3D visualization and automated delegation.',
        role: 'Team Member',
        className: 'project-printopia',
    },
    {
        number: '02',
        name: 'Nike Club',
        category: 'E-commerce Storefront Mockup',
        description:
            'A responsive storefront mockup focused on clean UI/UX, dynamic navigation, and modern product showcase grids.',
        role: 'Team Member',
        className: 'project-nike',
    },
];

const certifications = [
    { year: '2026', name: 'DevNet Associate' },
    {
        year: '2026',
        name: 'CCNA: Enterprise Networking, Security, and Automation',
    },
    { year: '2026', name: 'PMI Project Management Ready®' },
    {
        year: '2025',
        name: 'CCNA: Switching, Routing, and Wireless Essentials',
    },
    { year: '2025', name: 'Information Technology Specialist in Python' },
    {
        year: '2025',
        name: 'Cisco Certified Support Technician Networking',
    },
];

export default function Welcome() {
    const [menuOpen, setMenuOpen] = useState(false);
    const [theme, setTheme] = useState<'light' | 'dark'>('light');

    useEffect(() => {
        let savedTheme: string | null = null;

        try {
            savedTheme = localStorage.getItem('portfolio-theme');
        } catch {
            // Use the system preference if browser storage is unavailable.
        }

        if (savedTheme === 'light' || savedTheme === 'dark') {
            setTheme(savedTheme);
        } else {
            const prefersDark = window.matchMedia(
                '(prefers-color-scheme: dark)',
            ).matches;

            setTheme(prefersDark ? 'dark' : 'light');
        }
    }, []);

    function toggleTheme() {
        const nextTheme = theme === 'light' ? 'dark' : 'light';

        setTheme(nextTheme);

        try {
            localStorage.setItem('portfolio-theme', nextTheme);
        } catch {
            // Switching still works if browser storage is unavailable.
        }
    }

    return (
        <>
            <Head title="Rylie Buenaventura | Portfolio">
                <meta
                    name="description"
                    content="The portfolio of Rylie Buenaventura, an Information Technology student specializing in web and mobile applications."
                />
            </Head>

            <div className="portfolio" data-theme={theme}>
                <Weather />
                <CursorTrail />

                <a href="#main-content" className="skip-link">
                    Skip to content
                </a>

                <header className="site-header">
                    <div className="container header-content">
                        <a
                            href="#home"
                            className="brand"
                            aria-label="Rylie Buenaventura, home"
                        >
                            rb<span>.</span>
                        </a>

                        <nav
                            id="main-navigation"
                            aria-label="Main navigation"
                            className={`navigation ${menuOpen ? 'is-open' : ''}`}
                            onKeyDown={(event) => {
                                if (event.key === 'Escape') {
                                    setMenuOpen(false);
                                }
                            }}
                        >
                            {navigation.map((item) => (
                                <a
                                    key={item}
                                    href={`#${item.toLowerCase()}`}
                                    onClick={() => setMenuOpen(false)}
                                >
                                    {item}
                                </a>
                            ))}
                        </nav>

                        <div className="header-actions">
                            <button
                                type="button"
                                className="theme-button"
                                onClick={toggleTheme}
                                aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'
                                    } mode`}
                            >
                                <span aria-hidden="true">
                                    {theme === 'light' ? '☀' : '☾'}
                                </span>

                                <span>
                                    {theme === 'light' ? 'Sunny' : 'Rainy'}
                                </span>
                            </button>

                            <button
                                type="button"
                                className="menu-button"
                                aria-expanded={menuOpen}
                                aria-controls="main-navigation"
                                onClick={() => setMenuOpen(!menuOpen)}
                            >
                                {menuOpen ? 'Close' : 'Menu'}
                            </button>
                        </div>
                    </div>
                </header>

                <main id="main-content" tabIndex={-1}>
                    <section id="home" className="hero container">
                        <div className="hero-copy">
                            <p className="eyebrow">
                                Curiosity meets creativity
                            </p>

                            <h1>
                                Hi, I’m Rylie.
                                <br />
                                I turn ideas into
                                <br />
                                <em>digital experiences.</em>
                            </h1>

                            <p className="hero-description">
                                An Information Technology student exploring
                                thoughtful design and web &amp; mobile
                                development.
                            </p>

                            <div className="hero-actions">
                                <a href="#projects" className="button">
                                    Explore my work
                                    <span aria-hidden="true">↗</span>
                                </a>

                                <a href="#contact" className="text-link">
                                    Let’s connect
                                    <span aria-hidden="true">↗</span>
                                </a>
                            </div>

                            <p className="hero-location">
                                Based in the Philippines
                            </p>
                        </div>

                        <div className="hero-art" aria-hidden="true">
                            <span className="art-caption">
                                A work in progress, always.
                            </span>

                            <div className="initial-disc">R.</div>

                            <span className="art-tag">
                                &lt; build with curiosity /&gt;
                            </span>

                            <div className="art-footer">
                                <span>DESIGN + DEVELOPMENT</span>
                                <strong>Small ideas. Real possibilities.</strong>
                            </div>
                        </div>
                    </section>

                    <section id="about" className="section container">
                        <p className="eyebrow">01 / About me</p>

                        <h2>
                            Curious by nature.
                            <br />
                            <em>A builder by choice.</em>
                        </h2>

                        <div className="about-grid">
                            <div className="about-copy">
                                <p>
                                    I’m Rylie R. Buenaventura, pursuing a
                                    Bachelor of Science in Information
                                    Technology with a specialization in Web
                                    and Mobile Application at FEU Institute
                                    of Technology.
                                </p>

                                <p>
                                    I enjoy exploring how thoughtful
                                    interfaces, programming, and data come
                                    together to create useful applications.
                                </p>

                                <p>
                                    Beyond development, my interests include
                                    digital photography and game development,
                                    especially design, mechanics, and player
                                    psychology.
                                </p>

                                <p className="organization">
                                    Member, Alliance of Information
                                    Technology Students · 2025–present
                                </p>
                            </div>

                            <aside className="education-card">
                                <p className="eyebrow">My current chapter</p>

                                <h3>FEU Institute of Technology</h3>

                                <p>
                                    BS Information Technology
                                    <br />
                                    Web &amp; Mobile Application
                                </p>

                                <div className="graduation">
                                    <span>Expected graduation</span>
                                    <strong>2027</strong>
                                </div>
                            </aside>
                        </div>
                    </section>

                    <section id="skills" className="section container">
                        <p className="eyebrow">02 / My toolkit</p>

                        <h2>
                            The tools behind
                            <br />
                            <em>the ideas.</em>
                        </h2>

                        <div className="skills-grid">
                            {skillGroups.map((group, index) => (
                                <article
                                    key={group.title}
                                    className="skill-card"
                                >
                                    <span className="card-number">
                                        0{index + 1}
                                    </span>

                                    <h3>{group.title}</h3>

                                    <ul>
                                        {group.skills.map((skill) => (
                                            <li key={skill}>{skill}</li>
                                        ))}
                                    </ul>
                                </article>
                            ))}
                        </div>

                        <details className="certifications">
                            <summary>
                                Certifications &amp; continued learning
                            </summary>

                            <ul>
                                {certifications.map((certificate) => (
                                    <li key={certificate.name}>
                                        <span>{certificate.year}</span>
                                        <strong>{certificate.name}</strong>
                                    </li>
                                ))}
                            </ul>
                        </details>
                    </section>

                    <section id="projects" className="section container">
                        <p className="eyebrow">03 / Selected work</p>

                        <h2>
                            Ideas, brought
                            <br />
                            <em>to the screen.</em>
                        </h2>

                        <p className="section-description">
                            Team projects from my learning journey.
                        </p>

                        <div className="projects-grid">
                            {projects.map((project) => (
                                <article
                                    key={project.name}
                                    className="project-card"
                                >
                                    <div
                                        className={`project-art ${project.className}`}
                                        aria-hidden="true"
                                    >
                                        <span>{project.number} / PROJECT</span>
                                        <strong>{project.name}</strong>
                                        <small>Illustrative project cover</small>
                                    </div>

                                    <div className="project-content">
                                        <p className="eyebrow">
                                            {project.category}
                                        </p>

                                        <h3>{project.name}</h3>
                                        <p>{project.description}</p>

                                        <div className="project-footer">
                                            <span>Role: {project.role}</span>

                                            <a href="#contact">
                                                Ask about this project{' '}
                                                <span aria-hidden="true">
                                                    ↗
                                                </span>
                                            </a>
                                        </div>
                                    </div>
                                </article>
                            ))}
                        </div>
                    </section>

                    <section
                        id="contact"
                        className="section contact-section container"
                    >
                        <p className="eyebrow">04 / Say hello</p>

                        <h2>
                            Have an idea?
                            <br />
                            <em>Let’s talk about it.</em>
                        </h2>

                        <p>
                            A project, a question, or a simple hello.
                            <br />
                            I’d love to hear from you.
                        </p>

                        <a
                            href="mailto:rylieb875@gmail.com"
                            className="contact-email"
                        >
                            rylieb875@gmail.com
                            <span aria-hidden="true">↗</span>
                        </a>
                    </section>
                </main>

                <footer className="site-footer container">
                    <a href="#home" className="brand" aria-label="Back to home">
                        rb<span>.</span>
                    </a>

                    <p>
                        © {new Date().getFullYear()} Rylie Buenaventura
                    </p>

                    <a href="#home">Back to top ↑</a>
                </footer>
            </div>
        </>
    );
}