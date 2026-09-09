import {capture} from '@site/src/lib/posthog';

// Navbar configuration is declarative, so attach the Downloads nav handler here.
if (typeof document !== 'undefined') {
  document.addEventListener('click', (event) => {
    const target = event.target as Element | null;
    const link = target?.closest('a[href="/downloads"], a[href="/downloads/"]');
    if (!link) return;
    const source = link.closest('header') ? 'header' : link.closest('.theme-doc-sidebar-container, .menu') ? 'sidebar' : undefined;
    if (source) capture('docs_nav_downloads_click', {source});
  });
}
