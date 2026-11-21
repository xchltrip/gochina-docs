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
        { label: 'Start here', link: '/manual/getting-started/start/' },
        { label: 'Q&A', link: '/manual/qa/questions/' },
        { label: 'Access tokens', link: '/manual/authentication/token/' },
        {
          label: 'Tours',
          items: [
            { label: 'Read tours', link: '/manual/tours/read/' },
            { label: 'Reference prices', link: '/manual/tours/prices/' },
          ],
        },
        { label: 'Currency codes', link: '/manual/currencies/codes/' },
        { label: 'Embed a card', link: '/manual/embed/card/' },
        { label: 'Errors and limits', link: '/manual/errors/responses/' },
        { label: 'Version v1', link: '/manual/versions/v1/' },
        { label: 'Terms', link: '/manual/glossary/terms/' },
      ],
    }),
  ],
});
