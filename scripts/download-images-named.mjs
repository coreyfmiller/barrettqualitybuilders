/**
 * Barrett Quality Builders - Image Scraper & Downloader (Named Version)
 *
 * Downloads all images from barrettqualitybuilders.ca with descriptive,
 * numbered filenames based on their section and order on each page.
 *
 * Usage: node scripts/download-images-named.mjs
 */

import https from "https";
import http from "http";
import fs from "fs";
import path from "path";
import { URL } from "url";

const BASE_URL = "https://www.barrettqualitybuilders.ca";
const OUTPUT_ROOT = "downloaded-images-named";

const HEADERS = {
  "User-Agent":
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
  Accept:
    "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8",
  "Accept-Language": "en-US,en;q=0.5",
};

// Pages to scrape
const PAGES = [
  { name: "home", url: `${BASE_URL}/` },
  { name: "about", url: `${BASE_URL}/about.html` },
  { name: "decks", url: `${BASE_URL}/decks.html` },
  { name: "fences", url: `${BASE_URL}/fences.html` },
  { name: "interiors", url: `${BASE_URL}/interiors.html` },
  { name: "gallery", url: `${BASE_URL}/gallery.html` },
];

// Patterns to exclude (logos, backgrounds, site chrome)
const EXCLUDE_PATTERNS = [/logogood/i, /background-images/i, /footer-toast/i];

/**
 * Fetch a URL and return the response body as a string
 */
function fetchPage(url) {
  return new Promise((resolve, reject) => {
    const parsedUrl = new URL(url);
    const client = parsedUrl.protocol === "https:" ? https : http;
    const options = {
      hostname: parsedUrl.hostname,
      path: parsedUrl.pathname + parsedUrl.search,
      headers: HEADERS,
    };
    client
      .get(options, (res) => {
        if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
          const redirectUrl = new URL(res.headers.location, url).href;
          return fetchPage(redirectUrl).then(resolve).catch(reject);
        }
        if (res.statusCode !== 200) {
          return reject(new Error(`HTTP ${res.statusCode} for ${url}`));
        }
        let data = "";
        res.on("data", (chunk) => (data += chunk));
        res.on("end", () => resolve(data));
        res.on("error", reject);
      })
      .on("error", reject);
  });
}

/**
 * Download a file from a URL to a local path
 */
function downloadFile(url, outputPath) {
  return new Promise((resolve, reject) => {
    const parsedUrl = new URL(url);
    const client = parsedUrl.protocol === "https:" ? https : http;
    const options = {
      hostname: parsedUrl.hostname,
      path: parsedUrl.pathname + parsedUrl.search,
      headers: {
        ...HEADERS,
        Accept: "image/avif,image/webp,image/apng,image/*,*/*;q=0.8",
      },
    };
    client
      .get(options, (res) => {
        if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
          const redirectUrl = new URL(res.headers.location, url).href;
          return downloadFile(redirectUrl, outputPath).then(resolve).catch(reject);
        }
        if (res.statusCode !== 200) {
          return reject(new Error(`HTTP ${res.statusCode}`));
        }
        const fileStream = fs.createWriteStream(outputPath);
        res.pipe(fileStream);
        fileStream.on("finish", () => {
          fileStream.close();
          resolve();
        });
        fileStream.on("error", (err) => {
          fs.unlink(outputPath, () => {});
          reject(err);
        });
      })
      .on("error", reject);
  });
}

/**
 * Slugify a string for use in filenames
 */
function slugify(str) {
  return str
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .substring(0, 40);
}

/**
 * Parse HTML to extract images with their section context, in DOM order.
 * Returns array of { url, section }
 */
function extractImagesWithSections(html, pageName) {
  const results = [];
  const seen = new Set();

  // Remove everything before the main content area
  const contentStart = html.indexOf('id="wsite-content"');
  const workingHtml = contentStart > -1 ? html.substring(contentStart) : html;

  // Strategy: walk through the HTML linearly, tracking the current section heading.
  // Every time we hit an h2 with wsite-content-title, update the current section.
  // Every time we hit an img with /uploads/, record it under the current section.

  let currentSection = pageName; // default section name is the page name

  // Split into lines for easier processing
  const lines = workingHtml.split("\n");

  for (const line of lines) {
    // Check for section heading
    const headingMatch = line.match(
      /class="wsite-content-title"[^>]*>(?:<[^>]*>)*([^<]+)/
    );
    if (headingMatch) {
      const headingText = headingMatch[1]
        .replace(/&nbsp;/g, " ")
        .replace(/&#8203;/g, "")
        .trim();
      if (headingText && headingText.length > 1 && !/^\s*$/.test(headingText)) {
        currentSection = headingText;
      }
    }

    // Check for image
    const imgMatches = [
      ...line.matchAll(/src="(\/uploads\/[^"]+\.(?:jpg|jpeg|png|gif|webp)(?:\?[^"]*)?)"/gi),
    ];
    for (const imgMatch of imgMatches) {
      const imgPath = imgMatch[1];
      const fullUrl = `${BASE_URL}${imgPath}`;

      // Check exclusions
      const excluded = EXCLUDE_PATTERNS.some((p) => p.test(fullUrl));
      if (excluded) continue;

      if (!seen.has(fullUrl)) {
        seen.add(fullUrl);
        results.push({ url: fullUrl, section: currentSection });
      }
    }

    // Also check for lightbox links to full-size images
    const lightboxMatches = [
      ...line.matchAll(/href='(\/uploads\/[^']+\.(?:jpg|jpeg|png|gif|webp)(?:\?[^']*)?)'/gi),
    ];
    for (const lbMatch of lightboxMatches) {
      const imgPath = lbMatch[1];
      const fullUrl = `${BASE_URL}${imgPath}`;
      const excluded = EXCLUDE_PATTERNS.some((p) => p.test(fullUrl));
      if (excluded) continue;
      if (!seen.has(fullUrl)) {
        seen.add(fullUrl);
        results.push({ url: fullUrl, section: currentSection });
      }
    }
  }

  return results;
}

/**
 * Generate a descriptive filename
 */
function generateFilename(index, section, url) {
  const ext = path.extname(new URL(url).pathname).toLowerCase() || ".jpg";
  const sectionSlug = slugify(section);
  const num = String(index).padStart(2, "0");
  return `${num}-${sectionSlug}${ext}`;
}

/**
 * Main execution
 */
async function main() {
  console.log("================================================");
  console.log(" Barrett Quality Builders - Named Image Scraper");
  console.log("================================================\n");

  // Create output root
  if (!fs.existsSync(OUTPUT_ROOT)) {
    fs.mkdirSync(OUTPUT_ROOT, { recursive: true });
  }

  let totalDownloaded = 0;
  let totalFailed = 0;

  // Also write a manifest file for reference
  const manifest = {};

  for (const page of PAGES) {
    console.log(`\n📄 Processing: ${page.name}`);
    console.log(`   URL: ${page.url}`);

    // Create page directory
    const pageDir = path.join(OUTPUT_ROOT, page.name);
    if (!fs.existsSync(pageDir)) {
      fs.mkdirSync(pageDir, { recursive: true });
    }

    try {
      const html = await fetchPage(page.url);
      const images = extractImagesWithSections(html, page.name);
      console.log(`   Found ${images.length} images\n`);

      manifest[page.name] = [];

      for (let i = 0; i < images.length; i++) {
        const { url, section } = images[i];
        const filename = generateFilename(i + 1, section, url);
        const outputPath = path.join(pageDir, filename);

        try {
          await downloadFile(url, outputPath);
          console.log(`   ✓ ${filename}`);
          manifest[page.name].push({ filename, section, originalUrl: url });
          totalDownloaded++;
        } catch (err) {
          console.error(`   ✗ Failed: ${filename} - ${err.message}`);
          totalFailed++;
        }
      }
    } catch (err) {
      console.error(`   Error fetching page: ${err.message}`);
    }
  }

  // Write manifest
  const manifestPath = path.join(OUTPUT_ROOT, "manifest.json");
  fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2));

  console.log("\n================================================");
  console.log(` ✅ Download Complete!`);
  console.log(` Total downloaded: ${totalDownloaded}`);
  console.log(` Total failed: ${totalFailed}`);
  console.log(` Output directory: ${OUTPUT_ROOT}/`);
  console.log(` Manifest: ${manifestPath}`);
  console.log("================================================");
}

main().catch(console.error);
