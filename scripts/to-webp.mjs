/**
 * to-webp.mjs — WebP рядом с каждым JPEG/PNG в public/images.
 *
 * Оригинал НЕ удаляется и НЕ трогается: он остаётся fallback-ом в <img src>
 * внутри <picture>. Браузер без поддержки WebP и любой парсер, который читает
 * только src (а таких среди краулеров и мессенджеров хватает), обязаны получить
 * рабочую картинку.
 *
 * Одна ступень, без srcset-лестницы. Причина конкретная, а не «так проще»:
 * фото парка лежат в 1280 px и отображаются в 640 CSS-px (.model-photo
 * max-width: 640px) — это ровно 2× под retina, то есть верхняя граница, которую
 * рубрикатор и так разрешает. Добавлять ступень 640w значило бы отдавать
 * retina-экранам мыло, а обычным — экономить 40 КБ ценой второго набора файлов
 * и вдвое более сложной разметки на 13 страницах. Если фото когда-нибудь
 * поедут в макет шире 640 px — лестница понадобится, сейчас нет.
 *
 * Правило «не подсовывать файл хуже»: если WebP получился не меньше исходного
 * JPEG хотя бы на 5 %, он удаляется, и <picture> для этого файла не рисуется.
 * Так бывает на схемах и плоской графике, где WebP проигрывает; ради 1–2 %
 * держать второй формат в репозитории и второй <source> в разметке не стоит.
 *
 * Идемпотентен: повторный запуск переписывает webp ИЗ ИСХОДНОГО jpeg, поэтому
 * генерационных потерь не накапливает (в отличие от optimize-park-images.mjs,
 * который пишет поверх оригинала и потому запускается вручную и однократно).
 *
 * Запуск: npm run images
 */
import { readdir, stat, unlink } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const IMAGES = path.join(ROOT, 'public', 'images');
const QUALITY = 82;

async function* walk(dir) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) yield* walk(full);
    else yield full;
  }
}

const kb = (n) => (n / 1024).toFixed(0) + ' КБ';

if (!existsSync(IMAGES)) {
  console.log('public/images нет — нечего конвертировать');
  process.exit(0);
}

let made = 0;
let dropped = 0;
for await (const file of walk(IMAGES)) {
  if (!/\.(jpe?g|png)$/i.test(file)) continue;
  const ext = path.extname(file);
  const webp = file.slice(0, -ext.length) + '.webp';
  const rel = path.relative(ROOT, file).replace(/\\/g, '/');

  const srcBytes = (await stat(file)).size;
  await sharp(file).webp({ quality: QUALITY, effort: 6 }).toFile(webp);
  const webpBytes = (await stat(webp)).size;

  if (webpBytes >= srcBytes * 0.95) {
    await unlink(webp);
    dropped += 1;
    console.log(`${rel}: webp ${kb(webpBytes)} против ${kb(srcBytes)} — отклонён, экономии нет`);
  } else {
    made += 1;
    console.log(
      `${rel}: ${kb(srcBytes)} → webp ${kb(webpBytes)} (−${(100 - (webpBytes / srcBytes) * 100).toFixed(0)}%)`
    );
  }
}
console.log(`\nWebP создано: ${made}, отклонено как не дающие экономии: ${dropped}`);
