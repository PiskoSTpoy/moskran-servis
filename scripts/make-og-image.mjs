/*
  make-og-image.mjs — растровая версия карточки для соцсетей/мессенджеров.

  Зачем. og-image.svg существовал с Волны 38, с честной оговоркой в
  комментарии: "в этой сессии нет инструмента растровой генерации
  изображений... апгрейд на PNG остаётся открытой задачей, если появится
  инструмент генерации растра". Инструмент (sharp) с тех пор появился в
  devDependencies (используется в optimize-park-images.mjs/to-webp.mjs) —
  закрываем задачу. SVG для og:image рендерится неровно: Telegram обычно
  показывает нормально, но VK/WhatsApp/Facebook чаще всего не показывают
  превью вовсе (не поддерживают SVG для Open Graph).

  Дизайн не меняется — тот же брутализм чёрно-жёлтый (Archivo Black/Inter,
  крюк-иконка, цвета #0D0D0D/#FFD600/#F5F5F0/#9B9994), 1:1 с public/og-image.svg,
  просто растеризован в PNG 1200×630 (минимум для крупной карточки в
  Telegram/VK/WhatsApp/Open Graph).
*/

import sharp from "sharp";
import { readFileSync, statSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join, resolve } from "node:path";

const here = dirname(fileURLToPath(import.meta.url));
const appRoot = resolve(here, "..");
const svg = readFileSync(join(appRoot, "public", "og-image.svg"), "utf8");

const out = join(appRoot, "public", "og-image.png");
await sharp(Buffer.from(svg)).png({ compressionLevel: 9 }).toFile(out);
console.log(`make-og-image: public/og-image.png 1200×630, ${(statSync(out).size / 1024).toFixed(0)} КБ`);
