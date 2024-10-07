<script setup lang="ts">
const layoutV = useCookie<number[]>('splitter:v-layout')
const layoutH = useCookie<number[]>('splitter:h-layout')

useHead({ title: '%s | Nimiq Playground' })

const code = ref('')
const codeInUrl = uriToCode()
if (codeInUrl)
  code.value = codeInUrl
</script>

<template>
  <NuxtLayout>
    <SplitterGroup id="splitter-group" direction="horizontal" bg-neutral-0 @layout="layoutH = $event">
      <SplitterPanel
        id="content-pane" :default-size="layoutH?.at(0)" :min-size="20" flex="~ items-center justify-center"
        relative mr--3 h-screen w-full of-auto
      >
        <PanelDocs />
      </SplitterPanel>
      <SplitterResizeHandle id="handle-h" z-10 h-full w-1 bg-neutral-500 />
      <SplitterPanel id="interactive-pane" :default-size="layoutH?.at(1)" :min-size="20">
        <SplitterGroup id="interactive-pane-group" direction="vertical" @layout="layoutV = $event">
          <SplitterPanel
            id="code-pane" :default-size="layoutV?.at(0)" :min-size="20"
            flex="~ items-center justify-center"
          >
            <PanelEditor v-model="code" />
          </SplitterPanel>
          <SplitterResizeHandle id="vertical-handle-1" z-10 h-1 w-full bg-neutral-500 />
          <SplitterPanel
            id="iframe-pane" :default-size="layoutV?.at(1)" :min-size="20"
            flex="~ items-center justify-center"
          >
            <PanelPreview />
          </SplitterPanel>

          <SplitterResizeHandle id="vertical-handle-2" z-10 h-1 w-full bg-neutral-500 />
          <SplitterPanel
            id="terminal-pane" :default-size="layoutV?.at(2)" collapsible :collapsed-size="37" :min-size="37"
            flex="~ items-center justify-center"
          >
            <PanelTerminal />
          </SplitterPanel>
        </SplitterGroup>
      </SplitterPanel>
    </SplitterGroup>
  </NuxtLayout>
</template>
