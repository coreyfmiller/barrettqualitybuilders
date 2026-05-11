<#
.SYNOPSIS
    Downloads all images from barrettqualitybuilders.ca organized by page.
.DESCRIPTION
    Scrapes each page of the Barrett Quality Builders website, extracts image URLs,
    and downloads them into separate folders by page (decks, fences, interiors, about, home, gallery).
    Excludes common site assets like logos and background images.
.NOTES
    Run from the project root: powershell -ExecutionPolicy Bypass -File scripts/download-images.ps1
#>

$baseUrl = "https://www.barrettqualitybuilders.ca"
$outputRoot = "downloaded-images"

# Define pages to scrape
$pages = @(
    @{ Name = "home"; Url = "$baseUrl/" },
    @{ Name = "about"; Url = "$baseUrl/about.html" },
    @{ Name = "decks"; Url = "$baseUrl/decks.html" },
    @{ Name = "fences"; Url = "$baseUrl/fences.html" },
    @{ Name = "interiors"; Url = "$baseUrl/interiors.html" },
    @{ Name = "gallery"; Url = "$baseUrl/gallery.html" }
)

# Files to exclude (logos, backgrounds, site assets)
$excludePatterns = @(
    "logogood",
    "background-images",
    "footer-toast"
)

function Get-ImageUrlsFromPage {
    param (
        [string]$Url
    )

    try {
        $response = Invoke-WebRequest -Uri $Url -UseBasicParsing -TimeoutSec 30
        $content = $response.Content

        # Match all /uploads/ image paths
        $matches = [regex]::Matches($content, '/uploads/[^"''>\s\)]+\.(?:jpg|jpeg|png|gif|webp)(?:\?[^"''>\s\)]*)?')

        $urls = @()
        foreach ($m in $matches) {
            $imgUrl = "$baseUrl$($m.Value)"

            # Check if URL should be excluded
            $exclude = $false
            foreach ($pattern in $excludePatterns) {
                if ($imgUrl -match $pattern) {
                    $exclude = $true
                    break
                }
            }

            if (-not $exclude -and $urls -notcontains $imgUrl) {
                $urls += $imgUrl
            }
        }

        return $urls
    }
    catch {
        Write-Warning "Failed to fetch $Url : $($_.Exception.Message)"
        return @()
    }
}

function Download-Image {
    param (
        [string]$Url,
        [string]$OutputDir
    )

    # Clean the filename - remove query params for the filename
    $uri = [System.Uri]$Url
    $filename = [System.IO.Path]::GetFileName($uri.LocalPath)

    # Handle duplicate filenames by adding a counter
    $outputPath = Join-Path $OutputDir $filename
    $counter = 1
    while (Test-Path $outputPath) {
        $nameWithoutExt = [System.IO.Path]::GetFileNameWithoutExtension($filename)
        $ext = [System.IO.Path]::GetExtension($filename)
        $outputPath = Join-Path $OutputDir "$nameWithoutExt`_$counter$ext"
        $counter++
    }

    try {
        Invoke-WebRequest -Uri $Url -OutFile $outputPath -UseBasicParsing -TimeoutSec 60
        Write-Host "  Downloaded: $filename" -ForegroundColor Green
        return $true
    }
    catch {
        Write-Warning "  Failed to download: $Url - $($_.Exception.Message)"
        return $false
    }
}

# Main execution
Write-Host "========================================" -ForegroundColor Cyan
Write-Host " Barrett Quality Builders Image Scraper" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Create output root directory
if (-not (Test-Path $outputRoot)) {
    New-Item -ItemType Directory -Path $outputRoot -Force | Out-Null
}

$totalDownloaded = 0
$totalFailed = 0

foreach ($page in $pages) {
    Write-Host "Processing page: $($page.Name)" -ForegroundColor Yellow
    Write-Host "  URL: $($page.Url)"

    # Create page-specific directory
    $pageDir = Join-Path $outputRoot $page.Name
    if (-not (Test-Path $pageDir)) {
        New-Item -ItemType Directory -Path $pageDir -Force | Out-Null
    }

    # Get image URLs
    $imageUrls = Get-ImageUrlsFromPage -Url $page.Url
    Write-Host "  Found $($imageUrls.Count) images" -ForegroundColor Cyan

    # Download each image
    foreach ($imgUrl in $imageUrls) {
        $success = Download-Image -Url $imgUrl -OutputDir $pageDir
        if ($success) {
            $totalDownloaded++
        } else {
            $totalFailed++
        }
    }

    Write-Host ""
}

Write-Host "========================================" -ForegroundColor Cyan
Write-Host " Download Complete!" -ForegroundColor Green
Write-Host " Total downloaded: $totalDownloaded" -ForegroundColor Green
Write-Host " Total failed: $totalFailed" -ForegroundColor Red
Write-Host " Output directory: $outputRoot" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
