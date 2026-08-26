import { defineConfig } from 'astro/config';
import { buildRedirects } from './redirects.config.mjs';

// Волна 37: карта редиректов вынесена в redirects.config.mjs — тот же список
// теперь используют И эта конфигурация (client-side meta-refresh страницы-
// заглушки, работают без сервера), И scripts/generate-redirects.mjs (настоящие
// edge-301 в dist/_redirects на Cloudflare, postbuild-шаг). Раньше список был
// только здесь, edge-редиректов не было вовсе после отказа от адаптера cloudflare.
const redirects = buildRedirects();

export default defineConfig({
  site: 'https://moskran-servis.ru',
  redirects,
  // Волна: деплой на Cloudflare Workers (static assets). Автоматический
  // `astro add cloudflare` при первом деплое добавил сюда adapter:cloudflare()
  // и output:"hybrid" — но у адаптера жёсткое требование "server"/"hybrid",
  // а ни одна страница сайта не использует prerender:false (проверено), весь
  // сайт статический (см. комментарий в redirects.config.mjs "Сборка статическая").
  // Результат — index.astro пытался рендериться воркером на лету вместо отдачи
  // готового index.html и падал в 404. Cloudflare Workers отдаёт чистую статику
  // через `assets`-биндинг в wrangler.jsonc БЕЗ какого-либо адаптера — он тут не нужен.
});
