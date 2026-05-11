/**
 * Barrett Quality Builders - Image Scraper & Downloader
 *
 * Scrapes all pages of barrettqualitybuilders.ca, extracts image URLs,
 * and downloads them organized by page into separate folders.
 *
 * Usage: node scripts/download-images.mjs
 */

import https from "https";
import http from "http";
import fs from "fs";
import path from "path";
import { URL } from "url";

const BASE_URL = "https://www.barrettqualitybuilders.ca";
const OUTPUT_ROOT = "downloaded-images";

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
const EXCLUDE_PATTERNS = [
  /logogood/i,
  /background-images/i,
  /footer-toast/i,
];

const HEADERS = {
  "User-Agent":
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
  Accept:
    "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8",
  "Accept-Language": "en-US,en;q=0.5",
};

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
 * Extract image URLs from HTML content
 */
function extractImageUrls(html) {
  const regex = /\/uploads\/[^"'>\s)]+\.(?:jpg|jpeg|png|gif|webp)(?:\?[^"'>\s)]*)?/gi;
  const matches = html.match(regex) || [];

  const urls = new Set();
  for (const match of matches) {
    const fullUrl = `${BASE_URL}${match}`;

    // Check exclusions
    const excluded = EXCLUDE_PATTERNS.some((pattern) => pattern.test(fullUrl));
    if (!excluded) {
      urls.add(fullUrl);
    }
  }

  return [...urls];
}

/**
 * Get a unique filename in the target directory
 */
function getUniqueFilename(dir, filename) {
  let outputPath = path.join(dir, filename);
  if (!fs.existsSync(outputPath)) return outputPath;

  const ext = path.extname(filename);
  const base = path.basename(filename, ext);
  let counter = 1;

  while (fs.existsSync(outputPath)) {
    outputPath = path.join(dir, `${base}_${counter}${ext}`);
    counter++;
  }

  return outputPath;
}

/**
 * Main execution
 */
async function main() {
  console.log("========================================");
  console.log(" Barrett Quality Builders Image Scraper");
  console.log("========================================\n");

  // Create output root
  if (!fs.existsSync(OUTPUT_ROOT)) {
    fs.mkdirSync(OUTPUT_ROOT, { recursive: true });
  }

  let totalDownloaded = 0;
  let totalFailed = 0;

  for (const page of PAGES) {
    console.log(`\nProcessing page: ${page.name}`);
    console.log(`  URL: ${page.url}`);

    // Create page directory
    const pageDir = path.join(OUTPUT_ROOT, page.name);
    if (!fs.existsSync(pageDir)) {
      fs.mkdirSync(pageDir, { recursive: true });
    }

    try {
      // Fetch page HTML
      const html = await fetchPage(page.url);

      // Extract image URLs
      const imageUrls = extractImageUrls(html);
      console.log(`  Found ${imageUrls.length} images`);

      // Download each image
      for (const imgUrl of imageUrls) {
        try {
          const urlObj = new URL(imgUrl);
          const filename = path.basename(urlObj.pathname);
          const outputPath = getUniqueFilename(pageDir, filename);

          await downloadFile(imgUrl, outputPath);
          console.log(`  ✓ ${filename}`);
          totalDownloaded++;
        } catch (err) {
          console.error(`  ✗ Failed: ${imgUrl} - ${err.message}`);
          totalFailed++;
        }
      }
    } catch (err) {
      console.error(`  Error fetching page: ${err.message}`);
    }
  }

  console.log("\n========================================");
  console.log(` Download Complete!`);
  console.log(` Total downloaded: ${totalDownloaded}`);
  console.log(` Total failed: ${totalFailed}`);
  console.log(` Output directory: ${OUTPUT_ROOT}/`);
  console.log("========================================");
}

main().catch(console.error);
