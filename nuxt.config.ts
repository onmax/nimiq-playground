import { presetAttributify, presetMini, presetUno } from 'unocss'
import transformerDirectives from '@unocss/transformer-directives'
import { presetNimiq } from 'nimiq-css'
import presetRemToPx from '@unocss/preset-rem-to-px'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    "@vueuse/nuxt",
    "@unocss/nuxt",
    'radix-vue/nuxt',
    '@pinia/nuxt',
    '@nuxt/eslint',
    '@nuxtjs/color-mode',
    '@nuxtjs/seo',
    '@nuxt/content'
  ],
  unocss: {
    presets: [
      presetMini(),
      presetUno({ attributifyPseudo: true }),
      presetAttributify(),
      presetNimiq({
        utilities: true,
        typography: true,
      }),
      presetRemToPx({ baseFontSize: 4 }),
    ],
    transformers: [
      transformerDirectives(),
    ],
  },
  colorMode: {
    classSuffix: '',
  },
  // site: {
    // url: 'https://learn-dev.nuxt.com',
  // },
  eslint: {
    config: {
      standalone: false,
    },
  },
  ogImage: {
    defaults: {
      component: 'OgImageDocs',
      props: {
        colorMode: 'dark',
      },
    },
    componentOptions: {
      global: true,
    },
  },
  app: {
    head: {
      titleTemplate: '%s - Nimiq Tutorial',
      htmlAttrs: {
        lang: 'en-US',
      },
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      ],
    },
  },
  typescript: {
    includeWorkspace: true,
    tsConfig: {
      include: [
        '../content/**/.template/**/*.ts',
      ],
    },
  },

  features: {
    inlineStyles: false,
  },
  runtimeConfig: {
    public: {
      buildTime: Date.now(),
      // gitSha: execaSync('git', ['rev-parse', 'HEAD']).stdout.trim(),
    },
    app: {
      devtools: {
        iframeProps: {
          allow: 'cross-origin-isolated',
          credentialless: true,
        },
      },
    },
  },
  devtools: {
    enabled: true,
  },
  nitro: {
    routeRules: {
      '/**': {
        headers: {
          'Cross-Origin-Embedder-Policy': 'require-corp',
          'Cross-Origin-Opener-Policy': 'same-origin',
        },
      },
    },
  },
  vite: {
    build: {
      minify: 'esbuild',
      cssMinify: 'esbuild',
    },
    server: {
      headers: {
        'Cross-Origin-Embedder-Policy': 'require-corp',
        'Cross-Origin-Opener-Policy': 'same-origin',
      },
    },
    optimizeDeps: {
      include: [
        'monaco-editor/esm/vs/editor/editor.worker',
        'monaco-editor-core/esm/vs/editor/editor.worker',
        'typescript/lib/tsserverlibrary',
        '@vue/language-service',
        '@volar/monaco/worker',
        'typescript',
      ],
    },
  },
  content: {
    documentDriven: true,
    highlight: {
      theme: {
        default: 'vitesse-light',
        dark: 'vitesse-dark',
      },
    },
    markdown: {
      remarkPlugins: [
        'remark-external-links',
      ],
    },
    experimental: {
      search: {},
    },
  },
})
