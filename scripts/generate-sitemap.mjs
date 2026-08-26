// generate-sitemap.mjs — карта сайта с ЧЕСТНЫМ lastmod. Postbuild-шаг.
//
// ЧТО БЫЛО. public/sitemap.xml лежал статикой и правился руками: 142 <loc>,
// у каждого <changefreq> и <priority>, и ни одного <lastmod>. Две проблемы.
//   1. lastmod отсутствовал вовсе — сигнал свежести Google не получал.
//      Простое «проставить дату сборки» сделало бы хуже: одинаковый lastmod у
//      всех URL Google распознаёт как штамп сборки и обесценивает сигнал для
//      ВСЕГО домена, а не только для этих страниц.
//   2. Список URL приходилось поддерживать вручную. Новая страница, которую
//      забыли дописать, тихо выпадала из карты (ровно так и случилось с
//      /politika-obrabotki-personalnyh-dannyh/ в этой волне).
//
// ЧТО СТАЛО. Единственный источник истины — дерево src/pages. Карта собирается
// из него, а lastmod берётся из mtime ИСХОДНОГО .astro-файла страницы. Значит:
//   · дата меняется тогда и только тогда, когда правили контент этой страницы;
//   · две сборки подряд без правок дают побайтово одинаковый sitemap.xml
//     (проверяется в CI-порядке: собрать дважды, сравнить хеши);
//   · страница физически не может выпасть из карты — она в ней потому, что
//     существует файл, а не потому, что кто-то вспомнил про строку в XML.
//
// <changefreq> и <priority> не выводятся намеренно: Google их игнорирует
// полностью, Яндекс относится как к пожеланию, а рубрикатор (tech-sitemap-lastmod)
// прямо требует их отсутствия — они только раздувают файл и создают иллюзию
// управления обходом.
//
// В карту НЕ попадают: 404 и редиректы. Редиректы живут в redirects.config.mjs
// и превращаются в dist/_redirects (301) — источник 301-го в sitemap означал бы
// «индексируй адрес, который сам же отдаёт редирект».
import { readdirSync, statSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const SITE = 'https://moskran-servis.ru';
const PAGES_DIR = fileURLToPath(new URL('../src/pages/', import.meta.url));

function walk(dir, acc = []) {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full, acc);
    else if (entry.name.endsWith('.astro')) acc.push(full);
  }
  return acc;
}

// W3C Datetime до секунд, в UTC. mtime усекается до секунды: миллисекунды у
// разных файловых систем ведут себя по-разному и могли бы дать разный вывод
// на одном и том же содержимом.
const w3c = (d) =>
  new Date(Math.floor(d.getTime() / 1000) * 1000).toISOString().replace(/\.\d{3}Z$/, '+00:00');

const entries = [];
for (const file of walk(PAGES_DIR)) {
  const rel = path.relative(PAGES_DIR, file).split(path.sep).join('/');
  let route = rel.replace(/\.astro$/, '').replace(/(^|\/)index$/, '');
  if (route === '404') continue;
  const loc = route ? `${SITE}/${route}/` : `${SITE}/`;
  entries.push({ loc, lastmod: w3c(statSync(file).mtime) });
}

// Главная первой, дальше по алфавиту — детерминированный порядок, чтобы дифф
// между сборками показывал только реальные изменения.
entries.sort((a, b) =>
  a.loc === `${SITE}/` ? -1 : b.loc === `${SITE}/` ? 1 : a.loc.localeCompare(b.loc)
);

const xml =
  '<?xml version="1.0" encoding="UTF-8"?>\n' +
  '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' +
  entries.map((e) => `  <url><loc>${e.loc}</loc><lastmod>${e.lastmod}</lastmod></url>`).join('\n') +
  '\n</urlset>\n';

writeFileSync('dist/sitemap.xml', xml);
const distinct = new Set(entries.map((e) => e.lastmod)).size;
console.log(
  `generate-sitemap: ${entries.length} URL в dist/sitemap.xml, различных lastmod ${distinct}`
);
