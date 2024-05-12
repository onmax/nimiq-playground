import type { Raw } from 'vue'
import type { WebContainer, WebContainerProcess } from '@webcontainer/api'
import { VirtualFile } from '~/structures/VirtualFile'
import { filesToWebContainerFs } from '~/templates/utils'

export enum PlaygroundStatus {
  Init = 'init',
  Mount = 'mount',
  Install = 'install',
  Start = 'start',
  Polling = 'polling',
  Ready = 'ready',
  Interactive = 'interactive',
  Error = 'error',
}
export const PlaygroundStatusOrder = Object.values(PlaygroundStatus)

export const usePlaygroundStore = defineStore('playground', () => {
  const preview = usePreviewStore()

  const status = ref<PlaygroundStatus>(PlaygroundStatus.Init)
  const error = shallowRef<{ message: string }>()
  const currentProcess = shallowRef<Raw<WebContainerProcess | undefined>>()
  const webcontainer = shallowRef<Raw<WebContainer>>()

  let filesTemplate: Record<string, string> = {}
  const files = shallowReactive<Raw<Map<string, VirtualFile>>>(new Map())
  const fileSelected = shallowRef<Raw<VirtualFile>>()

  let _promiseInit: Promise<void> | undefined
  let hasInstalled = false

  // Mount the playground on client side
  if (import.meta.client) {
    async function init() {
      const [
        wc,
        filesRaw,
      ] = await Promise.all([
        import('@webcontainer/api').then(({ WebContainer }) => WebContainer.boot()),
        import('../templates').then(r => r.templates.basic()),
      ])

      filesTemplate = filesRaw
      webcontainer.value = wc

      Object.entries(filesRaw)
        .forEach(([path, content]) => {
          files.set(path, new VirtualFile(path, content, wc))
        })

      wc.on('server-ready', async (_port, url) => {
        preview.location = { origin: url, fullPath: '/' }
        status.value = PlaygroundStatus.Ready
      })

      wc.on('error', (err) => {
        error.value = err
        status.value = PlaygroundStatus.Error
      })

      status.value = PlaygroundStatus.Mount
      await wc.mount(filesToWebContainerFs([...files.values()]))

      startServer()

      // In dev, when doing HMR, we kill the previous process while reusing the same WebContainer
      if (import.meta.hot) {
        import.meta.hot.accept(() => {
          killPreviousProcess()
        })
      }
    }

    _promiseInit = init()
  }

  let abortController: AbortController | undefined

  function killPreviousProcess() {
    abortController?.abort()
    abortController = undefined
    currentProcess.value?.kill()
    currentProcess.value = undefined
  }


  async function startServer(reinstall = false) {
    if (!import.meta.client)
      return

    killPreviousProcess()

    const wc = webcontainer.value!
    abortController = new AbortController()
    const signal = abortController.signal

    if (reinstall)
      hasInstalled = false

    if (!hasInstalled)
      await launchInstallProcess(wc, signal)

    if (hasInstalled)
      await launchViteProcess(wc, signal)

    await launchInteractiveProcess(wc, signal)

  }

  async function spawn(wc: WebContainer, command: string, args: string[] = []) {
    if (currentProcess.value)
      throw new Error('A process is already running')
    const process = await wc.spawn(command, args)
    currentProcess.value = process
    return process.exit.then((r) => {
      if (currentProcess.value === process)
        currentProcess.value = undefined
      return r
    })
  }

  async function launchInstallProcess(wc: WebContainer, signal: AbortSignal) {
    if (signal.aborted)
      return

    status.value = PlaygroundStatus.Install

    const installExitCode = await spawn(wc, 'pnpm', ['install', '--prefer-offline'])
    if (signal.aborted)
      return

    if (installExitCode !== 0) {
      status.value = PlaygroundStatus.Error
      error.value = {
        message: `Unable to run pnpm install, exit as ${installExitCode}`,
      }
      console.error('Unable to run npm install')
      return false
    }

    hasInstalled = true
  }

  async function launchViteProcess(wc: WebContainer, signal: AbortSignal) {
    if (signal.aborted)
      return
    status.value = PlaygroundStatus.Start
    await spawn(wc, 'pnpm', ['run', 'dev'])

  }

  async function launchInteractiveProcess(wc: WebContainer, signal: AbortSignal) {
    if (signal.aborted)
      return
    status.value = PlaygroundStatus.Interactive
    await spawn(wc, 'jsh')
  }

  async function _updateOrCreateFile(filepath: string, content: string) {
    const file = files.get(filepath)
    if (file) {
      if (file.read() !== content)
        await file.write(content)
      return file
    }
    else {
      const newFile = new VirtualFile(filepath, content, webcontainer.value!)
      files.set(filepath, newFile)
      await newFile.write(content)
      return newFile
    }
  }

  /**
   * Mount files to WebContainer.
   * This will do a diff with the current files and only update the ones that changed
   */
  async function mount(map: Record<string, string>, templates = filesTemplate) {
    const objects = {
      ...templates,
      ...map,
    }

    await Promise.all([
      // update or create files
      ...Object.entries(objects)
        .map(async ([filepath, content]) => {
          await _updateOrCreateFile(filepath, content)
        }),
      // remove extra files
      ...Array.from(files.keys())
        .filter(filepath => !(filepath in objects))
        .map(async (filepath) => {
          const file = files.get(filepath)
          await file?.remove()
          files.delete(filepath)
        }),
    ])
  }

  return {
    get init() {
      return _promiseInit
    },

    webcontainer,
    status,
    error,
    currentProcess,

    restartServer: startServer,

    files,
    fileSelected,
    mount,
  }
})

export type PlaygroundStore = ReturnType<typeof usePlaygroundStore>


if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(usePlaygroundStore, import.meta.hot))
