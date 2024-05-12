<script setup lang="ts">
const play = usePlaygroundStore()
</script>

<template>
  <div size-full grid="~ rows-[min-content_1fr]">
    <div panel-header>
      <div i-nimiq:tools />
      <span>Terminal</span>
      <div flex-auto />
      <button v-if="play.status !== PlaygroundStatus.Init && play.status !== PlaygroundStatus.Mount" rounded-2 p-4 title="Restart terminal" @click="play.restartServer()">
        <div i-nimiq:restore />
      </button>
    </div>
    <PanelTerminalClient px-4 />
  </div>
</template>
