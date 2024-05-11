<template>
  <SplitterGroup id="splitter-group" direction="horizontal" bg-neutral-0>
    <SplitterPanel id="content-pane" :min-size="20" flex="~ items-center justify-center" h-screen of-auto>
      <PanelDocs />
    </SplitterPanel>
    <SplitterResizeHandle id="vertical-handle" mr--6 w-11 hover:bg-neutral-200 relative ml--3 z-10 transition-colors>
      <div w-1 bg-neutral-400 absolute inset-0 left-5 />
    </SplitterResizeHandle>
    <SplitterPanel id="interactive-pane" :min-size="20">
      <SplitterGroup id="interactive-pane-group" direction="vertical">
        <SplitterPanel id="code-pane" :min-size="20" flex="~ items-center justify-center">
          <PanelEditor />
        </SplitterPanel>
        <SplitterResizeHandle id="horizontal-handle" h-11 hover:bg-neutral-200 relative ml--3 z-10 transition-colors>
          <div h-1 bg-neutral-400 absolute inset-0 top-5 left--8 />
        </SplitterResizeHandle>
        <SplitterPanel id="iframe-pane" :min-size="20" flex="~ items-center justify-center">
          <PanelPreview />
        </SplitterPanel>
      </SplitterGroup>
    </SplitterPanel>
  </SplitterGroup>
</template>
