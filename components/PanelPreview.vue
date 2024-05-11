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
    <div
      v-if="play.status === PlaygroundStatus.Ready"
      flex="~ items-center gap-8"
      border="b base dashed" bg-neutral-100 pl-4 pr-2
    >
      <div
        flex="~ gap-2 auto items-center" p-8>
        <div i-ph-globe-duotone />
        <span text-12>Preview</span>
      </div>
    </div>
    <div relative h-full w-full>
      <PanelPreviewLoading />
      <PanelPreviewClient ref="inner" />
    </div>
  </div>
</template>
