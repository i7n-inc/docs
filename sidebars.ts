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
      collapsed: true,
      items: [
        'providers/claude-code',
        'providers/anthropic',
        'providers/codex',
        'providers/openai',
        'providers/bedrock',
        'providers/litellm',
        'providers/lilac',
        'providers/gemini',
        'providers/openrouter',
        'providers/together',
        'providers/groq',
        'providers/ollama',
      ],
    },
    'projects',
    'reviews',
    'memories',
    'dashboard',
    'troubleshooting',
    'cli-reference',
    'changelog',
  ],
};

export default sidebars;
