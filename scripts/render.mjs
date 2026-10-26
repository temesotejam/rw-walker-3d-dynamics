import { chromium } from 'playwright';
import { mkdir } from 'node:fs/promises';
import { resolve } from 'node:path';
import { pathToFileURL } from 'node:url';

const output = resolve('frames');
await mkdir(output, { recursive: true });
const browser = await chromium.launch({
  headless: true,
  args: ['--enable-webgl', '--use-gl=angle', '--use-angle=swiftshader', '--enable-unsafe-swiftshader'],
});
try {
  const page = await browser.newPage({ viewport: { width: 980, height: 620 }, deviceScaleFactor: 1 });
  const errors = [];
  page.on('pageerror', (error) => errors.push(error.message));
  await page.goto(pathToFileURL(resolve('viewer/rear-hip-4mm.html')).href);
  await page.waitForFunction(() => document.querySelector('canvas')?.width > 100);
  const status = await page.locator('[data-status]').textContent();
  if (errors.length || status?.includes('���p�ł��܂���')) {
    throw new Error(`3D player failed: ${errors.join('; ')} / ${status}`);
  }
  const slider = page.locator('#walker-time');
  const surface = page.locator('#walker-rear-hip');
  for (let frame = 0; frame <= 64; frame++) {
    const time = frame / 8;
    await slider.evaluate((el, value) => {
      el.value = String(value);
      el.dispatchEvent(new Event('input', { bubbles: true }));
    }, time);
    await surface.screenshot({ path: resolve(output, `frame_${String(frame).padStart(3, '0')}.png`), animations: 'disabled' });
    if (frame % 8 === 0) console.log(`frame ${frame}/64`);
  }
  if (errors.length) throw new Error(errors.join('; '));
} finally {
  await browser.close();
}

