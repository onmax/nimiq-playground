export function codeToUri(text: string) {
  const router = useRouter()
  const route = useRoute()

  const blob = new Blob([text], { type: 'text/plain' })
  const reader = new FileReader()

  reader.onloadend = function () {
    const base64data = (reader.result as string | undefined)?.split(',').at(1) || ''
    router.push({ query: { ...route.query, code: base64data } })
  }

  reader.readAsDataURL(blob)

  return route.fullPath
}

export function uriToCode(maybeBase64Data?: string) {
  if (!maybeBase64Data)
    return ''
  const text = atob(maybeBase64Data)
  return text
}

export function clearCode() {
  const router = useRouter()
  const route = useRoute()
  router.push({ query: { ...route.query, code: undefined } })
}
