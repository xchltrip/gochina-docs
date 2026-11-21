import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import starlightLinksValidator from 'starlight-links-validator';
import { remarkHeadingId } from 'remark-custom-heading-id';
import { unified } from '@astrojs/markdown-remark';

const isPreview = process.env.PUBLIC_ENV === 'preview';
const buildSha = process.env.PUBLIC_BUILD_SHA ?? 'local';

export default defineConfig({
  site: isPreview ? 'https://docs.gochina.cool' : 'https://docs.gochina.cool',
  trailingSlash: 'always',
  server: { host: true },
  markdown: { processor: unified({ remarkPlugins: [remarkHeadingId] }) },
  integrations: [
    starlight({
      title: 'GoChina Open Platform',
      logo: {
        light: './src/assets/logo.svg',
        dark: './src/assets/logo-dark.svg',
        alt: 'GoChina.cool',
        replacesTitle: true,
      },
      customCss: ['./src/styles/brand.css'],
      favicon: '/favicon.svg',
      locales: { root: { label: 'English', lang: 'en' } },
      lastUpdated: true,
      plugins: [starlightLinksValidator()],
      head: [
        { tag: 'meta', attrs: { name: 'build-sha', content: buildSha } },
        ...(isPreview ? [{ tag: 'meta', attrs: { name: 'robots', content: 'noindex, nofollow' } }] : []),
      ],
      components: isPreview ? { Banner: './src/components/PreviewBanner.astro' } : {},
      sidebar: [
        { label: 'Glossary', items: [{ autogenerate: { directory: 'manual/glossary' } }] },
        { label: 'Getting started', items: [{ autogenerate: { directory: 'manual/getting-started' } }] },
        { label: 'Authentication', items: [{ autogenerate: { directory: 'manual/authentication' } }] },
        { label: 'Tours', items: [{ autogenerate: { directory: 'manual/tours' } }] },
        { label: 'Embed', items: [{ autogenerate: { directory: 'manual/embed' } }] },
        { label: 'Errors', items: [{ autogenerate: { directory: 'manual/errors' } }] },
        { label: 'Versions', items: [{ autogenerate: { directory: 'manual/versions' } }] },
      ],
    }),
  ],
});
