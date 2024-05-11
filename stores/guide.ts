import type { Raw } from 'vue'
import type { GuideMeta } from '~/types/guides'

export const useGuideStore = defineStore('guide', () => {
  const play = usePlaygroundStore()
  const preview = usePreviewStore()

  const currentGuide = shallowRef<Raw<GuideMeta>>()
  const showingSolution = ref(false)
  const embeddedDocs = ref('')

  const ignoredFiles = computed(() => transformGuideIgnoredFiles(currentGuide.value?.ignoredFiles))

  async function mount(guide?: GuideMeta, withSolution = false) {
    await play.init

    // eslint-disable-next-line no-console
    console.log('mounting guide', guide)

    await play.mount({
      ...guide?.files,
      ...withSolution ? guide?.solutions : {},
    })

    play.fileSelected = play.files.get(guide?.startingFile || 'main.ts')
    preview.location.fullPath = guide?.startingUrl || '/'
    preview.updateUrl()

    currentGuide.value = guide
    showingSolution.value = withSolution

    return undefined
  }

  async function toggleSolutions() {
    await mount(currentGuide.value, !showingSolution.value)
  }

  function openEmbeddedDocs(url: string) {
    embeddedDocs.value = url
  }

  return {
    mount,
    toggleSolutions,
    currentGuide,
    showingSolution,
    embeddedDocs,
    openEmbeddedDocs,
    ignoredFiles,
  }
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useGuideStore, import.meta.hot))
