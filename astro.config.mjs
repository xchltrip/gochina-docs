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
  redirects: {
    '/manual/errors/responses/': '/manual/qa/questions/',
    '/manual/glossary/terms/': '/manual/getting-started/start/',
  },
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
      social: [
        { icon: 'github', label: 'GitHub', href: 'https://github.com/xchltrip/gochina-docs' },
      ],
      plugins: [starlightLinksValidator()],
      head: [
        { tag: 'meta', attrs: { name: 'build-sha', content: buildSha } },
        ...(isPreview ? [{ tag: 'meta', attrs: { name: 'robots', content: 'noindex, nofollow' } }] : []),
      ],
      components: isPreview ? { Banner: './src/components/PreviewBanner.astro' } : {},
      sidebar: [
        { label: 'Overview', link: '/manual/getting-started/start/' },
        {
          label: 'API',
          items: [
            { label: 'Authentication', link: '/manual/authentication/token/' },
            { label: 'Tours', link: '/manual/tours/read/' },
            { label: 'Prices', link: '/manual/tours/prices/' },
            { label: 'Currencies', link: '/manual/currencies/codes/' },
            { label: 'Tour card', link: '/manual/embed/card/' },
          ],
        },
        { label: 'Q&A', link: '/manual/qa/questions/' },
        { label: 'Versions', link: '/manual/versions/v1/' },
      ],
    }),
  ],
});
