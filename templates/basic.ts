import type { TemplateOptions } from './types'
import template from '#build/templates/basic'

export default function load(options: TemplateOptions = {}) {
  if (import.meta.server)
    throw new Error('This template can only be used on the client')

  const rawFiles: Record<string, string> = {
    ...template,
    ...options.files,
  }

  if (options.darkMode) {
    rawFiles['index.html'] = rawFiles['index.html'].replace(
      '<html lang="en">',
      '<html lang="en" class="dark">',
    )
  }

  return rawFiles
}
