import init, { Client, ClientConfiguration } from '@nimiq/core-web/web'

await init()

const config = new ClientConfiguration()
const client = await Client.create(config.build())
const app = document.querySelector<HTMLDivElement>('#app')!
app.innerHTML = '<h1>Howdy!</h1>'

client.addConsensusChangedListener((state) => {
  app.innerHTML = state
})

console.log('Hello nimiq!')
