import type { HighlighterCore } from 'shiki/core'
import { getHighlighterCore } from 'shiki/core'
import langVue from 'shiki/langs/vue.mjs'

import getWasmInlined from 'shiki/wasm'
// import langTs from 'shiki/langs/typescript.mjs'
import themeDark from 'shiki/themes/vitesse-dark.mjs'
import themeLight from 'shiki/themes/vitesse-light.mjs'

let highlighter: Promise<HighlighterCore> | undefined

export async function getShiki() {
  if (highlighter)
    return highlighter

  const darkColors = (themeDark as any).colors as Record<string, string>
  darkColors['editor.background'] = '#00000000'
  darkColors['editor.lineHighlightBackground'] = '#00000000'

  highlighter = getHighlighterCore({
    langs: [
      langVue as any,
    ],
    themes: [
      themeLight as any,
      themeDark as any,
    ],
    loadWasm: getWasmInlined,
  })

  return highlighter
}
