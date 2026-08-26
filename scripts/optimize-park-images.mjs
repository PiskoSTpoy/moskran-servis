// Волна 102 (пилот фото): ресайз/сжатие скачанных исходников Wikimedia/Pexels
// до веб-разумных размеров. Исходники — 6016×4016 / 4032×3024 / 8944×6708,
// по 4.6–4.9 МБ каждый — публиковать в таком виде нельзя (LCP/трафик).
import sharp from 'sharp';
import { statSync } from 'node:fs';

// ВАЖНО: src===out — скрипт сжимает файл, который уже лежит в public/. Повторный
// запуск на уже обработанном файле означает повторное JPEG-сжатие (генерационные
// потери) без какой-либо пользы. Поэтому задания предыдущих волн ниже закомментированы
// сразу после того, как отработали один раз — раскомментировать только если нужно
// пересобрать конкретный файл заново из свежего оригинала в этом же пути.
const jobs = [
  // Волна 102 — уже обработаны, не перезапускать без свежего оригинала:
  // { src: 'public/images/park/liebherr-132-ec-h8.jpg', out: 'public/images/park/liebherr-132-ec-h8.jpg', width: 1280 },
  // { src: 'public/images/park/potain-mdt-178.jpg', out: 'public/images/park/potain-mdt-178.jpg', width: 1280 },
  // { src: 'public/images/hero/park-hero.jpg', out: 'public/images/hero/park-hero.jpg', width: 1920 },
  // Волна 104 — уже обработаны, не перезапускать без свежего оригинала. Исходники
  // 1,98–6,45 МБ, до 4608 px — требовали такого же сжатия перед публикацией.
  // { src: 'public/images/park/sany-scc550e.jpg', out: 'public/images/park/sany-scc550e.jpg', width: 1280 },
  // { src: 'public/images/park/ivanovets-ks-35714.jpg', out: 'public/images/park/ivanovets-ks-35714.jpg', width: 1280 },
  // { src: 'public/images/park/ivanovets-ks-45717.jpg', out: 'public/images/park/ivanovets-ks-45717.jpg', width: 1280 },
  // { src: 'public/images/park/chelyabinets-ks-55732.jpg', out: 'public/images/park/chelyabinets-ks-55732.jpg', width: 1280 },
];

for (const job of jobs) {
  const before = statSync(job.src).size;
  const buf = await sharp(job.src).rotate().resize({ width: job.width, withoutEnlargement: true }).jpeg({ quality: 78, mozjpeg: true }).toBuffer();
  await sharp(buf).toFile(job.out + '.tmp');
  const { renameSync } = await import('node:fs');
  renameSync(job.out + '.tmp', job.out);
  const after = statSync(job.out).size;
  console.log(`${job.src}: ${(before / 1024).toFixed(0)} KB -> ${(after / 1024).toFixed(0)} KB`);
}
