import { defineConfig } from 'vitepress'

const apiOpenApiUrl =
    process.env.API_URL?.replace(/\/$/, '') ?? 'http://localhost:3001'

export default defineConfig({
    title: 'Tokenizer API Docs',
    description:
        'Developer documentation for the Tokenizer API — deploy and manage ERC-20/ERC-721 tokens.',
    base: '/',
    themeConfig: {
        nav: [
            { text: 'Getting Started', link: '/getting-started/' },
            { text: 'Guides', link: '/guides/deploy-token' },
            { text: 'Reference', link: '/reference/auth' },
            {
                text: 'OpenAPI',
                link: `${apiOpenApiUrl}/openapi`,
                target: '_blank',
                rel: 'noreferrer'
            },
            { text: 'For LLMs', link: '/llms/' }
        ],
        sidebar: [
            {
                text: 'Getting Started',
                items: [
                    { text: 'Introduction', link: '/getting-started/' },
                    { text: 'Authentication', link: '/getting-started/authentication' },
                    { text: 'Errors', link: '/getting-started/errors' }
                ]
            },
            {
                text: 'Guides',
                items: [
                    { text: 'Deploy a Token', link: '/guides/deploy-token' },
                    { text: 'Manage a Token', link: '/guides/manage-token' },
                    { text: 'Media Uploads', link: '/guides/media' },
                    { text: 'Token URI Resolver', link: '/guides/token-uri' }
                ]
            },
            {
                text: 'Reference',
                items: [
                    { text: 'Auth', link: '/reference/auth' },
                    { text: 'API Keys', link: '/reference/api-keys' },
                    { text: 'Profile', link: '/reference/profile' },
                    { text: 'Stats', link: '/reference/stats' },
                    { text: 'Tokens', link: '/reference/tokens' },
                    { text: 'OpenAPI', link: '/reference/openapi' }
                ]
            },
            {
                text: 'For LLMs',
                items: [
                    { text: 'Overview', link: '/llms/' },
                    { text: 'Full Context', link: '/llms/context' }
                ]
            }
        ],
        socialLinks: []
    }
})
