// This is a vite project. Use app to append your content to the DOM.
import init, { Client, ClientConfiguration } from '@nimiq/core/web'

const app = document.querySelector<HTMLDivElement>('#app')!

await init()

const config = new ClientConfiguration()
const client = await Client.create(config.build())

client.addConsensusChangedListener((state) => {
  app.innerHTML = state
})
