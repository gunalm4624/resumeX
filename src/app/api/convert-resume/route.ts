import path from 'path'
import fs from 'fs/promises'
import puppeteer from 'puppeteer-core'
import { ResumeGenerator, ResumeData } from '@/lib/resume-generator'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const resumeData: ResumeData = body
    
    // Generate dynamic HTML from form data
    const html = ResumeGenerator.generateHTML(resumeData)

    const browser = await puppeteer.launch({
      headless: true,
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-dev-shm-usage',
        '--disable-accelerated-2d-canvas',
        '--no-first-run',
        '--no-zygote',
        '--disable-gpu'
      ],
      // For local development, use the installed Chrome
      executablePath: process.platform === 'win32'
        ? 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe'
        : process.platform === 'linux'
        ? '/usr/bin/google-chrome'
        : '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'
    })
    const page = await browser.newPage()
    
    // Set viewport to A4 dimensions
    await page.setViewport({
      width: 794, // A4 width in pixels
      height: 1123, // A4 height in pixels
      deviceScaleFactor: 1,
    })
    
    await page.setContent(html, { 
      waitUntil: 'networkidle0',
      timeout: 30000 
    })

    // Wait for fonts and styles to load
    await page.evaluateHandle('document.fonts.ready')

    const pdf = await page.pdf({
      format: 'A4',
      printBackground: false, // Disable background to avoid gray spaces
      margin: { 
        top: '0.2in', 
        right: '0.2in', 
        bottom: '0.2in', 
        left: '0.2in' 
      },
      scale: 0.9, // Optimize for single page
      displayHeaderFooter: false,
      preferCSSPageSize: false,
      pageRanges: '1' // Force single page
    })
    await browser.close()

    const pdfArray = new Uint8Array(pdf)

    return new Response(pdfArray, {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Length': String(pdf.length),
        'Content-Disposition': `attachment; filename=resume-${resumeData.personal.fullName || resumeData.template || 'resume'}.pdf`,
        'X-Content-Type-Options': 'nosniff',
      },
    })
  } catch (err) {
    console.error('Failed to generate PDF', err)
    return new Response(JSON.stringify({ error: 'Failed to generate PDF' }), { 
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      }
    })
  }
}

// Keep GET method for backward compatibility
export async function GET() {
  return POST(new Request('http://localhost', {
    method: 'POST',
    body: JSON.stringify({ template: 'ats' })
  }))
}
