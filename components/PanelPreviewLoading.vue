<script setup lang="ts">
import type { PlaygroundStatus } from '#imports'

const play = usePlaygroundStore()

function getStep(status: PlaygroundStatus) {
  if (status === 'error' || play.status === 'error')
    return 'error'
  const indexCurrent = PlaygroundStatusOrder.indexOf(play.status)
  const index = PlaygroundStatusOrder.indexOf(status)
  if (indexCurrent === index)
    return 'current'
  if (indexCurrent > index)
    return 'done'
  return 'todo'
}

function getStatusIcon(status: PlaygroundStatus) {
  const step = getStep(status)
  switch (step) {
    case 'error':
      return 'i-ph-x-circle-duotone text-red'
    case 'current':
      return 'i-nimiq:spinner scale-85'
    case 'done':
      return 'i-ph-check-circle-duotone text-green'
    case 'todo':
      return 'size-6 bg-neutral-300 rounded-full mx-auto'
  }
}

function getTextClass(status: PlaygroundStatus) {
  const step = getStep(status)
  switch (step) {
    case 'error':
      return 'text-red'
    case 'current':
      return 'animate-pulse font-semibold'
    case 'done':
      return 'text-neutral'
    case 'todo':
      return 'op50'
  }
}
</script>

<template>
  <div v-if="play.status !== PlaygroundStatus.Ready" flex="~ items-center justify-center" h-full>
    <template v-if="play.status === 'interactive'">
      interactive
    </template>
    <div v-else grid="~ cols-[max-content_1fr] gap-8 items-center justify-center" text-16>
      <div :class="getStatusIcon(PlaygroundStatus.Init)" />
      <span :class="getTextClass(PlaygroundStatus.Init)">Initializing WebContainer</span>
      <div :class="getStatusIcon(PlaygroundStatus.Mount)" />
      <span :class="getTextClass(PlaygroundStatus.Mount)">Mounting files</span>
      <div :class="getStatusIcon(PlaygroundStatus.Install)" />
      <span :class="getTextClass(PlaygroundStatus.Install)">Installing dependencies</span>
      <div :class="getStatusIcon(PlaygroundStatus.Start)" />
      <span :class="getTextClass(PlaygroundStatus.Start)">Starting Vite server</span>
      <div :class="getStatusIcon(PlaygroundStatus.Polling)" />
      <span :class="getTextClass(PlaygroundStatus.Polling)">Waiting for Vite to ready</span>
    </div>
  </div>
</template>
