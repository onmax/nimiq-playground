<script setup lang="ts">
import type { ParsedContent } from '@nuxt/content/dist/runtime/types'

const {
  page,
  next,
  prev,
} = useContent() as {
  page: Ref<ParsedContent>
  next: Ref<ParsedContent | undefined>
  prev: Ref<ParsedContent | undefined>
}

const sourceUrl = computed(() =>
  page.value?._file
    ? `https://github.com/nuxt/learn.nuxt.com/edit/main/content/${page.value._file}`
    : undefined,
)

const docsEl = ref<HTMLElement | null>(null)
const router = useRouter()
router.beforeEach(() => {
  docsEl.value?.scrollTo({
    top: 0,
  })
})
</script>

<template>
  <div grid="~ rows-[min-content_1fr]" relative h-full>
    <GuideSelector />
    <div relative h-full of-hidden>
      <article ref="docsEl" class="max-w-none prose" h-full of-auto p6>
        <ContentDoc />
        <div mt8 py2 grid="~ cols-[1fr_1fr] gap-4">
          <div>
            <ContentNavCard v-if="prev" :to="prev._path" :title="prev.title" :description="prev.description"
              subheader="Previous section" icon="i-ph-arrow-left" />
          </div>
          <div>
            <ContentNavCard v-if="next" :to="next._path" :title="next.title" :description="next.description"
              subheader="Next section" icon="i-ph-arrow-right" items-end text-right />
          </div>
        </div>
        <div border="t base dashed" mt-8 p3>
          <NuxtLink v-if="sourceUrl" :to="sourceUrl" target="_blank" flex="~ items-center gap-2" text-inherit op75
            hover="text-primary op100">
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
