// Волна 37 — переписан. Раньше здесь была дедупликация дублирующихся строк
// в dist/_redirects, который генерировал @astrojs/cloudflare (нужна была,
// потому что тот адаптер задваивал строки для источников со слэшем и без).
// После отказа от адаптера (см. astro.config.mjs) Astro больше НЕ генерирует
// dist/_redirects вообще — только client-side meta-refresh HTML-заглушки.
// Итог: старый скрипт видел отсутствие файла, тихо завершался (`process.exit(0)`)
// и ничего не делал — мёртвый код, который technical-seo и code-review аудиты
// Волны 37 независимо поймали. Теперь этот файл сам ГЕНЕРИРУЕТ dist/_redirects
// напрямую из той же карты редиректов (redirects.config.mjs) — Cloudflare
// Workers assets поддерживает этот формат нативно, без адаптера и без воркер-
// кода. Это даёт настоящий edge-301 вместо клиентского meta-refresh: сильнее
// для SEO (передаёт ссылочный вес) и не зависит от того, дорендерился ли JS.
import { writeFileSync } from 'node:fs';
import { buildRedirects } from '../redirects.config.mjs';

const redirects = buildRedirects();

const lines = Object.entries(redirects).map(([from, to]) => `${from} ${to} 301`);

writeFileSync('dist/_redirects', lines.join('\n') + '\n');
console.log(`generate-redirects: записано ${lines.length} правил 301 в dist/_redirects`);
