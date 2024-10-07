<script setup lang="ts">
const router = useRouter()

const guide = useGuideStore()

const templatesMap = Object.fromEntries(
  Object.entries(import.meta.glob('~/content/**/.template/index.ts'))
    .map(([key, loader]) => [
      key
        .replace(/^\/content/, '')
        .replace(/\/\.template\/index\.ts$/, '')
        .replace(/\/\d+\./g, '/'),
      loader,
    ]),
)

async function mount(path: string) {
  path = path.replace(/\/$/, '') // remove trailing slash
  await guide.mount(
    await templatesMap[path]?.().then((m: any) => m.meta),
    false,
  )
}

router.afterEach(async (to) => {
  mount(to.path)
})

onMounted(() => {
  mount(router.currentRoute.value.path)
})
</script>

<template>
  <main size-screen of-hidden grid="~ rows-[max-content_1fr]">
    <TheNav border="b neutral-500" />
    <slot />
  </main>
</template>
