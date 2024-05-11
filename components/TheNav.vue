<template>
  <header flex="~ items-center justify-between" px-32 py-16>
    <div flex="~ items-center gap-8">
      <div i-nimiq:logos-nimiq-horizontal dark:i-nimiq:logos-nimiq-white-horizontal text-128 h-32="!"></div>
      <h1 text-15 lh-none font-400 tracking-wider text-neutral-800><span sr-only>Nimiq </span>Playground</h1>
    </div>
    <nav flex="~ gap-16 items-center" un-text="14 neutral-900">
      <a href="https://nimiq.com/developers" target="_blank" arrow hover:text-neutral>Deveveloper Center</a>
      <a href="https://github.com/nimiq/core-rs-albatross" target="_blank"><div i-carbon-logo-github hover:text-neutral text-16 /></a>
    </nav>  
  </header>
</template>
