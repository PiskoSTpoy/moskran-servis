// Единый источник карты редиректов — используется и astro.config.mjs (для
// client-side meta-refresh страниц-заглушек, работающих без сервера), и
// scripts/generate-redirects.mjs (для настоящих edge-301 в dist/_redirects
// на Cloudflare). Вынесено в отдельный файл в Волне 37 (код-ревью нашёл,
// что после отказа от @astrojs/cloudflare adapter'а edge-редиректов не было
// вообще — только клиентский meta-refresh, более слабый сигнал для SEO и
// подверженный отказу, если у посетителя эта страница не дорендерилась).
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const here = path.dirname(fileURLToPath(import.meta.url));

export function buildRedirects() {
  // Волна 16. Раздел /blog/ закрыт: у владельца нормативного ядра сети (ФНП №461,
  // регистрация ПС, ПОТ/753н) должен быть СПРАВОЧНИК, а не лента постов. Все
  // материалы переехали в /spravochnik/<slug>/ с сохранением слага.
  //
  // Карта строится ИЗ ФАЙЛОВОЙ СИСТЕМЫ, а не из захардкоженного списка: добавили
  // материал в справочник — редирект со старого адреса появится сам, забыть нечего.
  const spravDir = path.join(here, 'src', 'pages', 'spravochnik');
  if (!fs.existsSync(spravDir)) {
    throw new Error(`redirects.config.mjs: каталог справочника не найден (${spravDir}) — переименовали/переместили /spravochnik/? Обновите путь здесь.`);
  }
  const slugs = fs
    .readdirSync(spravDir, { withFileTypes: true })
    .filter((d) => d.isDirectory() && fs.existsSync(path.join(spravDir, d.name, 'index.astro')))
    .map((d) => d.name);

  const legacyBlogRedirects = Object.fromEntries([
    ['/blog', '/spravochnik/'],
    ['/blog/', '/spravochnik/'],
    ...slugs.flatMap((s) => [
      [`/blog/${s}`, `/spravochnik/${s}/`],
      [`/blog/${s}/`, `/spravochnik/${s}/`],
    ]),
  ]);

  // Волна 17. Внутрисайтовая расклейка комбинаций «услуга × округ» — см. полный
  // разбор причины в git-истории/deploy-plan.md (антидорвейная расклейка,
  // подтверждённая similarity_check.py --intra).
  const wave17MergedOkrugs = Object.fromEntries(
    [
      ['/uslugi/bashennyy-kran/sao', '/uslugi/bashennyy-kran/'],
      ['/uslugi/bashennyy-kran/tinao', '/uslugi/bashennyy-kran/'],
      ['/uslugi/kran-na-rezhimnyy-obekt/sao', '/uslugi/kran-na-rezhimnyy-obekt/'],
      ['/uslugi/kran-na-rezhimnyy-obekt/vao', '/uslugi/kran-na-rezhimnyy-obekt/'],
    ].flatMap(([from, to]) => [
      [from, to],
      [`${from}/`, to],
    ]),
  );

  return { ...legacyBlogRedirects, ...wave17MergedOkrugs };
}
