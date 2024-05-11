<script setup lang="ts">
import { filesToVirtualFsTree } from '~/templates/utils'

const play = usePlaygroundStore()
const guide = useGuideStore()

const files = computed(() => Array
  .from(play.files.values())
  .filter(file => !isFileIgnored(file.filepath, guide.ignoredFiles)),
)

const input = ref<string>('')

watch(
  () => [play.fileSelected, guide.currentGuide, guide.showingSolution],
  () => {
    input.value = play.fileSelected?.read() || ''
  },
)

const onTextInput = useDebounceFn(_onTextInput, 500)
function _onTextInput() {
  if (input.value != null)
    play?.fileSelected?.write(input.value)
}
</script>

<template>

  <div size-full grid="~ rows-[min-content_1fr]">
    <div panel-header>
      <div i-nimiq:icons-lg-languages text-16 />
      <span flex-auto>Editor</span>
      <!-- <ButtonShowSolution my--4 mr--12 flex-none rounded px-8 py-4 text-sm op50 hover="bg-active op100" /> -->
    </div>
    <LazyPanelEditorMonaco v-if="play.fileSelected" v-model="input" :filepath="play.fileSelected.filepath" h-full w-full
      @change="onTextInput" />
  </div>
</template>
