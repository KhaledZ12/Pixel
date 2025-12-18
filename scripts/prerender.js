import puppeteer from 'puppeteer-core';
import handler from 'serve-handler';
import http from 'http';
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const distDir = path.resolve(rootDir, 'dist');

const SUPABASE_URL = process.env.VITE_SUPABASE_URL;
const SUPABASE_KEY = process.env.VITE_SUPABASE_ANON_KEY;

// find chrome executable
const findChrome = () => {
    const suffixes = [
        '\\Google\\Chrome\\Application\\chrome.exe',
        '\\Google\\Chrome Beta\\Application\\chrome.exe',
        '\\Google\\Chrome Canary\\Application\\chrome.exe',
        '\\Microsoft\\Edge\\Application\\msedge.exe',
    ];

    const prefixes = [
        process.env.LOCALAPPDATA,
        process.env.PROGRAMFILES,
        process.env['PROGRAMFILES(X86)'],
        'C:\\Program Files',
        'C:\\Program Files (x86)',
    ].filter(Boolean);

    for (const prefix of prefixes) {
        for (const suffix of suffixes) {
            const p = path.join(prefix, suffix);
            if (fs.existsSync(p)) return p;
        }
    }
    return null;
};

async function fetchRoutes() {
    const routes = [
        '/',
        '/about',
        '/services',
        '/portfolio',
        '/blog',
        '/faq',
        '/contact',
        '/privacy-policy',
        '/terms-of-use'
    ];

    if (!SUPABASE_URL || !SUPABASE_KEY) {
        console.warn('Supabase credentials not found, skipping dynamic routes.');
        return routes;
    }

    try {
        // Fetch Blog Posts
        const blogRes = await fetch(`${SUPABASE_URL}/rest/v1/blog_posts?select=slug&published=is.true`, {
            headers: { 'apikey': SUPABASE_KEY, 'Authorization': `Bearer ${SUPABASE_KEY}` }
        });
        if (blogRes.ok) {
            const posts = await blogRes.json();
            posts.forEach(p => {
                if (p.slug) routes.push(`/blog/${p.slug}`);
            });
        }

        // Fetch Projects
        const projectRes = await fetch(`${SUPABASE_URL}/rest/v1/projects?select=slug,id`, {
            headers: { 'apikey': SUPABASE_KEY, 'Authorization': `Bearer ${SUPABASE_KEY}` }
        });
        if (projectRes.ok) {
            const projects = await projectRes.json();
            projects.forEach(p => {
                const slug = p.slug || p.id;
                if (slug) routes.push(`/portfolio/${slug}`);
            });
        }
    } catch (err) {
        console.error('Error fetching dynamic routes:', err);
    }

    return routes;
}

async function prerender() {
    const executablePath = findChrome();
    if (!executablePath) {
        console.error('Could not find Chrome installation. Please install Google Chrome.');
        process.exit(1);
    }

    console.log('Starting static server...');
    const server = http.createServer((request, response) => {
        return handler(request, response, {
            public: distDir,
            directoryListing: false,
            rewrites: [
                { source: '**', destination: '/index.html' }
            ]
        });
    });

    await new Promise(resolve => server.listen(3000, resolve));

    console.log('Fetching routes...');
    const routes = await fetchRoutes();
    console.log(`Found ${routes.length} routes to prerender.`);

    // --- NEW: Preserve SPA shell for Admin and 404 ---
    const indexSrc = path.join(distDir, 'index.html');
    const adminDir = path.join(distDir, 'admin');
    const adminIndexDest = path.join(adminDir, 'index.html');
    const notFoundDest = path.join(distDir, '404.html');
    const dashboardDir = path.join(distDir, 'admin', 'dashboard'); // Just in case, though the router handles /admin

    if (fs.existsSync(indexSrc)) {
        // Create admin directory
        if (!fs.existsSync(adminDir)) {
            fs.mkdirSync(adminDir, { recursive: true });
        }

        // Copy for Admin (SPA fallback)
        fs.copyFileSync(indexSrc, adminIndexDest);
        console.log('Created SPA fallback: dist/admin/index.html');

        // Copy for 404 (General fallback)
        fs.copyFileSync(indexSrc, notFoundDest);
        console.log('Created SPA fallback: dist/404.html');
    } else {
        console.error('Warning: dist/index.html not found. Cannot create SPA fallbacks.');
    }
    // -------------------------------------------------

    console.log('Launching browser...');
    const browser = await puppeteer.launch({
        executablePath,
        headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    });

    for (const route of routes) {
        // Normalize route to remove trailing slash for processing, but we want to output to folder
        const cleanRoute = route === '/' ? '/' : route.replace(/\/$/, '');

        console.log(`Prerendering: ${cleanRoute}`);
        const page = await browser.newPage();

        // Set viewport to desktop
        await page.setViewport({ width: 1280, height: 800 });

        try {
            await page.goto(`http://localhost:3000${cleanRoute}`, { waitUntil: 'networkidle0', timeout: 60000 });

            // Wait for a key element to ensure app is mounted (e.g., footer or header)
            // or just wait a bit more just in case
            await new Promise(r => setTimeout(r, 1000));

            const content = await page.content();

            // Determine output path
            // / -> dist/index.html
            // /about -> dist/about/index.html

            let relativePath = cleanRoute === '/' ? 'index.html' : `${cleanRoute.substring(1)}/index.html`;
            if (cleanRoute === '/') {
                // We will overwrite index.html. Maybe backup first? 
                // Actually for SSG, we overwrite.
            }

            const outputPath = path.join(distDir, relativePath);
            const outputDir = path.dirname(outputPath);

            if (!fs.existsSync(outputDir)) {
                fs.mkdirSync(outputDir, { recursive: true });
            }

            fs.writeFileSync(outputPath, content);
            console.log(`Generated: ${relativePath}`);

        } catch (err) {
            console.error(`Failed to prerender ${cleanRoute}:`, err);
        } finally {
            await page.close();
        }
    }

    await browser.close();
    server.close();
    console.log('Prerendering complete.');
    process.exit(0);
}

prerender().catch(err => {
    console.error(err);
    process.exit(1);
});
