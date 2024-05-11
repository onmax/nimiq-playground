<script setup lang="ts">
const play = usePlaygroundStore()
const preview = usePreviewStore()
// const guide = useGuideStore()

const inner = ref<{ iframe?: HTMLIFrameElement | undefined }>()

function refreshIframe() {
  preview.updateUrl()
  if (preview.url && inner.value?.iframe) {
    inner.value.iframe.src = preview.url
  }
}

watch(
  () => play.status,
  (status) => {
    if (status === PlaygroundStatus.Ready || status === PlaygroundStatus.Polling)
      refreshIframe()
  },
  { flush: 'sync' },
)
</script>

<template>
  <div h-full :class="play.status === PlaygroundStatus.Ready ? ' grid grid-rows-[min-content_1fr]' : 'flex'" w-full>
    <div v-if="play.status === PlaygroundStatus.Ready" panel-header>
        <div i-nimiq:globe text-14 />
        <span >Preview</span>
    </div>
    <div relative h-full w-full>
      <PanelPreviewLoading />
      <PanelPreviewClient ref="inner" />
    </div>
  </div>
</template>
