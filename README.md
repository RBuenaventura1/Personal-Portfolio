# Personal Portfolio

My personal portfolio showcasing my background, skills, certifications, and projects as an Information Technology student specializing in Web and Mobile Application at FEU Institute of Technology.

**Status:** First release complete and deployed on Vercel.

## Features

- Sunny light mode and rainy dark mode
- Saved theme preference
- Animated sunshine, clouds, and rain
- Theme-aware cursor trails
- Button hover and 0.96-scale press animations
- Responsive navigation and layouts
- Reduced-motion support
- Personal portrait and biography
- Project screenshot galleries and video demonstrations
- Résumé download
- GitHub, LinkedIn, and email links
- Home, About, Skills, Projects, and Contact sections

## Tech Stack

| Technology          | Purpose                            |
| ------------------- | ---------------------------------- |
| Laravel 13          | Backend and routing                |
| React + TypeScript  | User interface                     |
| Inertia.js          | Laravel and React integration      |
| CSS                 | Layout, themes, and animations     |
| Supabase PostgreSQL | Database                           |
| Vite+               | Frontend development and builds    |
| Docker + FrankenPHP | Production application environment |
| Vercel              | Hosting and deployment             |

## Featured Projects

### Printopia

A management platform for printing business processes, featuring customer ordering, artwork customization, interactive 3D previews, and a customer dashboard.

**Role:** Front-end Developer & Integration Contributor

**My contributions:**

- Developed the customer ordering workflow.
- Contributed to the customer dashboard.
- Integrated Cloudinary for image and large media file uploads and storage.
- Integrated Groq AI to power the customer-facing chatbot.

The portfolio showcases customer-facing screenshots and T-shirt and mug customization demonstrations. Administration and employee workflows are excluded because they are confidential.

### Kahala Resort

A resort reservation website in development, featuring user authentication, room listings, booking requests, and reservation tracking using Angular and Supabase.

**Role:** Full Stack Developer  
**Status:** In development

The portfolio includes screenshots of the landing page, guest sign-in interface, and reservation overview. A demonstration video will be added later.

## Local Setup

### Requirements

- PHP 8.5 recommended; the installed dependencies require PHP 8.4.1 or newer
- Composer
- Node.js and npm compatible with the frontend dependencies
- PHP PDO PostgreSQL extension
- A Supabase project

Laravel Herd can provide the local PHP development environment.

### Installation

Clone the repository:

```bash
git clone https://github.com/RBuenaventura1/Personal-Portfolio.git
cd Personal-Portfolio
```

Install dependencies:

```bash
composer install
npm ci
```

Copy `.env.example` to `.env`.

On Windows PowerShell:

```powershell
Copy-Item .env.example .env
```

Generate the application key:

```bash
php artisan key:generate
```

### Database Configuration

In the Supabase dashboard, open **Connect** and select **Session pooler**.

Set the following values in your local `.env`:

```dotenv
DB_CONNECTION=pgsql
DB_HOST=YOUR_SESSION_POOLER_HOST
DB_PORT=5432
DB_DATABASE=postgres
DB_USERNAME=postgres.YOUR_PROJECT_REFERENCE
DB_PASSWORD="YOUR_DATABASE_PASSWORD"
DB_SSLMODE=require
```

Use the connection parameters supplied by your Supabase project. Remove any configured `DB_URL` when using these separate database settings.

Create the application schema using the Supabase SQL Editor:

```sql
create schema if not exists laravel;
```

Confirm that the PostgreSQL connection in `config/database.php` includes:

```php
'search_path' => 'laravel',
'sslmode' => env('DB_SSLMODE', 'require'),
```

Clear cached configuration and run migrations:

```bash
php artisan config:clear
php artisan migrate
```

Use a database intended for this application. Review migrations before applying them to an existing database containing other data.

### Start Development

In one terminal:

```bash
php artisan serve
```

In a second terminal:

```bash
npm run dev
```

Open **http://localhost:8000**, or the address displayed by Artisan.

Keep both terminals running during development.

### Windows PHP Troubleshooting

If Artisan or Wayfinder reports that PHP 8.2 is being used, check which PHP installation your terminal finds:

```powershell
where.exe php
php --version
```

If you use Herd, ensure its PHP tools take priority over older installations such as XAMPP.

For the current PowerShell session:

```powershell
$env:Path = "$env:USERPROFILE\.config\herd\bin;" + $env:Path
```

For a permanent correction, update Windows PATH and restart your terminal and editor.

## Validation

Check TypeScript:

```bash
npm run types:check
```

Build production assets:

```bash
npm run build
```

Manual checks completed for the first release include:

- Responsive layouts and mobile navigation
- Light and dark theme switching
- Saved theme preference
- Keyboard navigation and visible focus
- Reduced-motion behavior
- Project screenshots and video playback
- Résumé download and contact links
- Rendering and functionality on Vercel

## Project Structure

| Path                                           | Purpose                                        |
| ---------------------------------------------- | ---------------------------------------------- |
| `resources/js/pages/welcome.tsx`               | Portfolio page and personal content            |
| `resources/js/components/Weather.tsx`          | Decorative weather elements                    |
| `resources/js/components/CursorTrail.tsx`      | Pointer trail behavior                         |
| `resources/js/components/PrintopiaProject.tsx` | Printopia showcase                             |
| `resources/js/components/KahalaProject.tsx`    | Kahala Resort showcase                         |
| `resources/css/app.css`                        | Application styles and framework configuration |
| `resources/css/portfolio.css`                  | Portfolio layout, themes, and effects          |
| `public/projects/`                             | Project screenshots and demonstrations         |
| `public/images/`                               | Personal portrait                              |
| `public/documents/`                            | Public résumé                                  |
| `routes/web.php`                               | Web routes                                     |
| `Dockerfile`                                   | Production image and asset build               |
| `Caddyfile`                                    | Production web server configuration            |
| `.dockerignore`                                | Files excluded from the container image        |

## Accessibility

- Visible keyboard focus indicators
- Skip-to-content link
- Labeled navigation and theme controls
- Alternative text for project images and portrait
- Decorative effects hidden from assistive technology
- Reduced-motion preferences respected
- Cursor trails disabled on touch devices
- User-controlled video playback

## Deployment

The application is deployed on Vercel using a Docker container with FrankenPHP.

The container installs Composer and npm dependencies and builds the frontend assets before serving Laravel through its `public` directory.

Production environment variables are configured in Vercel, including:

- `APP_KEY`
- `APP_ENV=production`
- `APP_DEBUG=false`
- `APP_URL` with the full HTTPS production address
- Supabase database connection settings
- Session, cache, and logging configuration

The application forces HTTPS URL generation in production to prevent mixed-content asset requests behind the hosting proxy.

A custom `ASSET_URL` is unnecessary when assets are served from the same application.

The Dockerfile disables Inertia SSR for the current deployment.

## Project Progress

| Phase | Milestone                               | Status                     |
| ----- | --------------------------------------- | -------------------------- |
| 0     | Planning and feature selection          | Complete                   |
| 1     | Laravel and React environment           | Complete                   |
| 1A    | Supabase connection and migrations      | Complete                   |
| 2     | Portfolio sections and navigation       | Complete                   |
| 3     | Responsive layout and mobile menu       | Complete                   |
| 4     | Light and dark theme system             | Complete                   |
| 5     | Weather, cursor, and button effects     | Complete                   |
| 6     | Personal content and project showcases  | Complete for first release |
| 7     | Build validation and manual testing     | Complete for first release |
| 8     | GitHub publishing and Vercel deployment | Complete                   |

Portfolio content is currently defined in React components. Supabase is connected, but project cards are not loaded from database records.

### Future Updates

- [ ] Add the Kahala Resort demonstration video
- [ ] Refresh Kahala screenshots as development progresses
- [ ] Add new projects and update portfolio content

## Environment Variables

Keep `.env`, database passwords, application keys, and other secrets out of version control.

Use placeholder values in `.env.example`.

## Author

**Rylie R. Buenaventura**

BS Information Technology — Web and Mobile Application  
FEU Institute of Technology  
Expected Graduation: 2027

- [GitHub — RBuenaventura1](https://github.com/RBuenaventura1)
- [LinkedIn — Rylie Buenaventura](https://www.linkedin.com/in/rylie-buenaventura/)
