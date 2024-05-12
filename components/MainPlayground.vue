<template>
  <SplitterGroup id="splitter-group" direction="horizontal" bg-neutral-0>
    <SplitterPanel id="content-pane" :min-size="20" flex="~ items-center justify-center" h-screen of-auto mr--3 relative w-full>
      <PanelDocs />
    </SplitterPanel>
    <SplitterResizeHandle id="vertical-handle" w-1 h-full bg-neutral-500 z-10 />
    <SplitterPanel id="interactive-pane" :min-size="20">
      <SplitterGroup id="interactive-pane-group" direction="vertical">
        <SplitterPanel id="code-pane" :min-size="20" flex="~ items-center justify-center">
          <PanelEditor />
        </SplitterPanel>
        <SplitterResizeHandle id="vertical-handle-1" h-1 w-full bg-neutral-500 z-10 />
        <SplitterPanel id="iframe-pane" :min-size="20" flex="~ items-center justify-center">
          <PanelPreview />
        </SplitterPanel>
        
        <SplitterResizeHandle id="vertical-handle-2" h-1 w-full bg-neutral-500 z-10 />
        <SplitterPanel id="terminal-pane" :min-size="20" flex="~ items-center justify-center">
          <PanelTerminal />
        </SplitterPanel>
      </SplitterGroup>
    </SplitterPanel>
  </SplitterGroup>
</template>
