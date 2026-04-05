import puppeteer from 'puppeteer-core';
import fs from 'node:fs';

(async () => {
  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
    headless: true
  });
  const page = await browser.newPage();
  page.on('pageerror', error => fs.writeFileSync('err.json', JSON.stringify({message: error.message, stack: error.stack})));
  page.on('console', msg => {
    if(msg.type() === 'error') fs.writeFileSync('err.json', JSON.stringify({text: msg.text()}));
  });
  try {
    await page.goto('http://localhost:5173/', { waitUntil: 'networkidle2' });
    await new Promise(r => setTimeout(r, 1000));
    const rootHtml = await page.evaluate(() => document.getElementById('root').innerHTML);
    fs.writeFileSync('dom.html', rootHtml);
    console.log("Root content length:", rootHtml.length);
  } catch (e) {

    console.log("Navigation error:", e);
  }
  await browser.close();
})();
