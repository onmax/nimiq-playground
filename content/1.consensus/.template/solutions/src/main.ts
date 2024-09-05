// This is a vite project. Use app to append your content to the DOM.
const app = document.querySelector<HTMLDivElement>('#app')!

import init, { Client, ClientConfiguration } from '@nimiq/core/web'

await init()

const config = new ClientConfiguration()
const client = await Client.create(config.build())

client.addConsensusChangedListener((state) => {
  app.innerHTML = state
})
