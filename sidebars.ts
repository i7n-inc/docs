import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

const sidebars: SidebarsConfig = {
  docsSidebar: [
    'overview',
    'installation',
    'quickstart',
    {
      type: 'category',
      label: 'Components',
      collapsed: false,
      items: [
        'projects',
        'specialists',
        'reviews',
        'memories',
      ],
    },
    {
      type: 'category',
      label: 'Providers',
      link: {type: 'doc', id: 'providers/providers'},
      collapsed: true,
      items: [
        'providers/anthropic',
        'providers/aws',
        'providers/gemini',
        'providers/groq',
        'providers/lilac',
        'providers/litellm',
        'providers/ollama',
        'providers/openai',
        'providers/openrouter',
        'providers/together',
      ],
    },
    'dashboard',
    {
      type: 'category',
      label: 'Runbooks',
      collapsed: false,
      items: [
        'runbooks/claude-code-review',
        'runbooks/bedrock-review',
      ],
    },
    'troubleshooting',
    'cli-reference',
    'changelog',
  ],
};

export default sidebars;
