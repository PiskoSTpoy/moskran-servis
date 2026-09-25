// Патч под скилл seo-2026-playbook: id на H2 внутри <article> + серверный
// рендер оглавления в уже существующий #ref-toc-desktop (SpravochnikLayout).
//
// Почему так, а не новый TOC-блок: сайт уже рендерит десктопный TOC-контейнер
// (<aside id="ref-toc-desktop">) и заполняет его клиентским JS, который сам
// умеет генерировать id, если их нет (см. SpravochnikLayout.astro, slugify()).
// Проблема не в UX (для человека с JS всё уже работает), а в том, что AI-краулеры
// и answer-engine парсеры читают статический HTML без выполнения JS — им нужен
// id на H2 и наполненный TOC уже в разметке. Заполняем именно существующий
// контейнер тем же способом (список ссылок на #id), чтобы не плодить дубль:
// клиентский скрипт при загрузке молча заменит наш <ol> на свой (тот же
// контент), для пользователя без JS/для краулера — уже видимый рабочий TOC.
//
// Запуск: node scripts/geo2026-postbuild.mjs (уже подключено в package.json
// postbuild, идёт последним в цепочке после sitemap/redirects).
import { readFileSync, writeFileSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";

const DIST = new URL("../dist/", import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, "$1");

const TRANSLIT = {
  а: "a", б: "b", в: "v", г: "g", д: "d", е: "e", ё: "yo", ж: "zh", з: "z",
  и: "i", й: "y", к: "k", л: "l", м: "m", н: "n", о: "o", п: "p", р: "r",
  с: "s", т: "t", у: "u", ф: "f", х: "h", ц: "ts", ч: "ch", ш: "sh", щ: "sch",
  ъ: "", ы: "y", ь: "", э: "e", ю: "yu", я: "ya",
};

function stripTags(s) {
  return s.replace(/<[^>]+>/g, "");
}

function slugify(text) {
  const lower = stripTags(text).toLowerCase();
  let out = "";
  for (const ch of lower) {
    if (TRANSLIT[ch] !== undefined) out += TRANSLIT[ch];
    else if (/[a-z0-9]/.test(ch)) out += ch;
    else out += "-";
  }
  return out.replace(/-+/g, "-").replace(/^-|-$/g, "") || "section";
}

function walk(dir, out = []) {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    const st = statSync(p);
    if (st.isDirectory()) walk(p, out);
    else if (name.endsWith(".html")) out.push(p);
  }
  return out;
}

function patchOne(path) {
  let html = readFileSync(path, "utf8");
  // Контейнер контента различается по типу страницы: у справочника — <article>,
  // у остальных (park/uslugi/geo/...) — <main>. Берём то, что есть; <article>
  // приоритетнее, если вдруг оба присутствуют на одной странице.
  const articleMatch =
    html.match(/<article[^>]*>([\s\S]*?)<\/article>/) ||
    html.match(/<main[^>]*>([\s\S]*?)<\/main>/);
  if (!articleMatch) return false;
  const closeTag = articleMatch[0].startsWith("<article") ? "article" : "main";
  let article = articleMatch[1];
  const used = new Set();
  const items = [];
  let changed = false;

  article = article.replace(/<h2([^>]*)>([\s\S]*?)<\/h2>/g, (full, attrs, text) => {
    let id;
    const idm = attrs.match(/id="([^"]*)"/);
    if (idm) {
      id = idm[1];
    } else {
      const base = slugify(text);
      id = base;
      let i = 2;
      while (used.has(id)) id = `${base}-${i++}`;
      attrs = ` id="${id}"${attrs}`;
      changed = true;
    }
    used.add(id);
    items.push({ id, text: stripTags(text).trim() });
    return `<h2${attrs}>${text}</h2>`;
  });

  if (changed) {
    const openAttrs = articleMatch[0].match(new RegExp(`<${closeTag}([^>]*)>`))[1];
    html = html.slice(0, articleMatch.index) + `<${closeTag}${openAttrs}>` + article + `</${closeTag}>` + html.slice(articleMatch.index + articleMatch[0].length);
  }

  // Наполнить уже существующий десктопный TOC-контейнер, если он есть, пуст и H2 >= 3.
  if (items.length >= 3 && html.includes('id="ref-toc-desktop"') && /<ol class="ref-toc__list">\s*<\/ol>/.test(html)) {
    const list = items.map((it) => `<li><a href="#${it.id}">${it.text}</a></li>`).join("");
    html = html.replace(/<ol class="ref-toc__list">\s*<\/ol>/, `<ol class="ref-toc__list">${list}</ol>`);
    html = html.replace(/(id="ref-toc-desktop"[^>]*)\shidden(?=[\s>])/, "$1");
    changed = true;
  }

  if (changed) writeFileSync(path, html, "utf8");
  return changed;
}

const files = walk(DIST);
let n = 0;
for (const f of files) {
  if (patchOne(f)) n++;
}
console.log(`geo2026-postbuild: обработано ${files.length} файлов, изменено ${n}`);
