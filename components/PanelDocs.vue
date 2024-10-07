<script setup lang="ts">
import type { ParsedContent } from '@nuxt/content/dist/runtime/types'

interface Content { page: ParsedContent, next?: ParsedContent, prev?: ParsedContent }
const { page, next, prev } = useContent() as Content

const sourceUrl = computed(() => page.value?._file ? `https://github.com/onmax/nimiq-playground/edit/main/content/${page.value._file}` : undefined)

const docsEl = ref<HTMLElement | null>(null)
const router = useRouter()
router.beforeEach(() => docsEl.value?.scrollTo({ top: 0 }))
</script>

<template>
  <div grid="~ rows-[min-content_1fr]" relative size-full>
    <div w-full flex="~ gap-12" mx-auto panel-header>
      <div i-nimiq:icons-lg-dashboard text-16 />
      {{ page.title }}
    </div>
    <div relative h-full of-hidden>
      <article ref="docsEl" class="prose" h-full of-auto p6>
        <ContentDoc />
        <div mt-32 py-8 flex="~ wrap gap-16">
          <NuxtLink v-if="prev" :to="prev._path" :title="prev.title" pill-blue pill-sm arrow-back>
            {{ prev.title }}
          </NuxtLink>
          <NuxtLink v-if="next" :to="next._path" :title="next.title" pill-blue pill-sm m-0 arrow>
            {{ next.title }}
          </NuxtLink>
        </div>
        <div border="t base dashed" mt-64 p-12 flex>
          <NuxtLink
            v-if="sourceUrl" :to="sourceUrl" target="_blank" flex="~ items-center gap-8"
            hover="text-primary op100" m-0 w-max text-inherit op-70 text-12
          >
            <div i-ph-note-pencil-duotone />
            Edit this page
          </NuxtLink>
        </div>
      </article>
    </div>
  </div>
</template>

<style>
h1 {
  max-width: 100%;
}
</style>
