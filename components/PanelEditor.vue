<script setup lang="ts">
const play = usePlaygroundStore()
const guide = useGuideStore()

const queryCode = useRouteQuery<string>('code', '')
const input = ref('')

watch(
  () => [play.fileSelected, guide.currentGuide, guide.showingSolution],
  () => {
    input.value = uriToCode(queryCode.value) || play.fileSelected?.read() || ''
  },
)

const onTextInput = useDebounceFn(_onTextInput, 500)
function _onTextInput() {
  if (input.value == null)
    return
  console.log('input.value', input.value)
  play?.fileSelected?.write(input.value)
}
watch(input, onTextInput, { immediate: true })

function resetCode() {
  input.value = ''
  clearCode()
}

const { share: _share, isSupported } = useShare()
function share() {
  const url = codeToUri(input.value)
  _share({ title: 'Nimiq Playground', text: 'Check out this Nimiq Playground code', url })
}

const canDownload = computed(() => play.status === PlaygroundStatus.Ready)
</script>

<template>
  <div size-full grid="~ rows-[min-content_1fr]">
    <div panel-header>
      <div i-nimiq:icons-lg-languages text-16 />
      <span flex-auto>Editor</span>
      <div flex-auto />
      <div flex="~ gap-12" op-80>
        <button
          :disabled="!canDownload" i-nimiq:arrow-to-bottom disabled:op-40 :title="`Download Vite project as a ZIP.${!canDownload ? ' Wait for initialization.' : ''}`"
          @click="downloadZip"
        />
        <ClientOnly>
          <button v-if="isSupported" i-nimiq:nodes title="Share code" @click="share" />
        </ClientOnly>
        <button i-nimiq:redo title="Reset code" @click="resetCode" />
      </div>
      <!-- <ButtonShowSolution my--4 mr--12 flex-none rounded px-8 py-4 text-sm op50 hover="bg-active op100" /> -->
    </div>
    <LazyPanelEditorMonaco v-if="play.fileSelected" v-model="input" :filepath="play.fileSelected.filepath" size-full />
  </div>
</template>
