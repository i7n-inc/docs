import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const config: Config = {
  title: 'ATX',
  tagline: 'Agentic code review, memory, and orchestration',
  favicon: 'img/favicon.svg',

  future: {
    v4: true,
  },

  url: 'https://docs.iteration.sh',
  baseUrl: '/',
  trailingSlash: false,

  organizationName: 'i7n-inc',
  projectName: 'docs',

  onBrokenLinks: 'throw',

  markdown: {
    hooks: {
      onBrokenMarkdownLinks: 'warn',
    },
  },

  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          routeBasePath: '/',
          editUrl: 'https://github.com/i7n-inc/docs/tree/main/',
        },
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    image: 'img/social-card-latest.png',
    colorMode: {
      respectPrefersColorScheme: true,
    },
    navbar: {
      title: 'Iteration.sh',
      logo: {
        alt: 'Iteration',
        src: 'img/logo.svg',
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'docsSidebar',
          position: 'left',
          label: 'Docs',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Docs',
          items: [
            {label: 'Overview', to: '/'},
            {label: 'Quickstart', to: '/quickstart'},
            {label: 'Troubleshooting', to: '/troubleshooting'},
          ],
        },
        {
          title: 'Connect',
          items: [
            {label: 'iteration.sh', href: 'https://iteration.sh'},
            {label: 'Discord', href: 'https://discord.gg/Y6xgEXg8E3'},
            {label: 'YouTube', href: 'https://www.youtube.com/@IterationHQ'},
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Iteration Inc. Built with Docusaurus.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
