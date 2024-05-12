<script setup lang="ts">
import * as monaco from 'monaco-editor-core/esm/vs/editor/editor.api'
import { shikiToMonaco } from '@shikijs/monaco'
import { initMonaco } from '~/monaco/setup'
import { getShiki } from '~/monaco/shiki'

const props = defineProps<{ filepath: string }>()
const content = defineModel<string>({ required: true })

initMonaco()

const el = ref<HTMLDivElement>()

const colorMode = useColorMode()
let tsModel: monaco.editor.ITextModel

function getModel() {
  if (!tsModel) {
    tsModel = monaco.editor.createModel(content.value, "typescript", monaco.Uri.file(props.filepath),)
  }
  return tsModel
}

const theme = computed(() => colorMode.value === 'dark' ? 'vitesse-dark' : 'vitesse-light')

watch(() => el.value, async (value) => {
  if (!value)
    return

  const shiki = await getShiki()
  shikiToMonaco(shiki, monaco)

  const editor = monaco.editor.create(
    value,
    {
      model: getModel(),
      theme: theme.value,
      fontSize: 14,
      bracketPairColorization: {
        enabled: false,
      },
      glyphMargin: false,
      automaticLayout: true,
      folding: false,
      lineDecorationsWidth: 10,
      lineNumbersMinChars: 3,
      fontFamily: 'Fira Code, monospace',
      minimap: {
        enabled: false,
      },
      padding: {
        top: 8,
      },
      overviewRulerLanes: 0,
      fixedOverflowWidgets: true,
    },
  )

  editor.onDidChangeModelContent(() => {
    content.value = editor.getValue()
  })

  editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyS, () => {
    codeToUri(editor.getValue());
  })

  watch(() => props.filepath, () => editor.setModel(getModel()))

  watch(content, value => {
    if (value === editor.getValue())
      return
    const selections = editor.getSelections()
    const model = getModel()
    model.setValue(value)
    if (selections)
      editor.setSelections(selections)
  })
})
</script>

<template>
  <div ref="el" class="raw" />
</template>
