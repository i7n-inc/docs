import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

const sidebars: SidebarsConfig = {
  docsSidebar: [
    'overview',
    'installation',
    'quickstart',
    {
      type: 'category',
      label: 'Providers',
      link: {type: 'doc', id: 'providers/providers'},
      collapsed: false,
      items: [
        'providers/anthropic',
        'providers/claude-code',
        'providers/codex',
        'providers/bedrock',
        'providers/litellm',
        'providers/other-api-keys',
        'providers/ollama',
      ],
    },
    'projects',
    'reviews',
    'memories',
    'dashboards',
    'troubleshooting',
    'cli-reference',
  ],
};

export default sidebars;
