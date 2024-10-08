import presetRemToPx from '@unocss/preset-rem-to-px'
import transformerDirectives from '@unocss/transformer-directives'
import { presetNimiq } from 'nimiq-css'
import { defineConfig, presetAttributify, presetIcons, presetMini, presetUno } from 'unocss'

export default defineConfig({
  presets: [
    presetMini(),
    presetUno({ attributifyPseudo: true }),
    presetAttributify(),
    presetNimiq({
      utilities: true,
      typography: true,
      attributifyUtilities: true,
      fonts: false,
    }),
    presetRemToPx({ baseFontSize: 4 }),
    presetIcons(),
  ],
  shortcuts: {
    'panel-header': 'flex gap-8 items-center border-b border-dashed border-neutral-500 bg-neutral-200 px-16 py-8 text-12',
  },
  transformers: [
    transformerDirectives(),
  ],
})
