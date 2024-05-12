<script setup lang="ts">
import type { NavItem } from '@nuxt/content/dist/runtime/types'

const colorMode = useColorMode()
function toggleMode() {
  colorMode.preference = colorMode.value === 'light' ? 'dark' : 'light'
}

const { navigation } = useContent() as { navigation: Ref<NavItem[]> }
</script>


<template>
  <header flex="~ items-center justify-between" px-32 py-16>
    <NuxtLink to="/" flex="~ items-center gap-8">
      <div i-nimiq:logos-nimiq-horizontal dark:i-nimiq:logos-nimiq-white-horizontal text-128 h-32="!"></div>
      <h1 text-15 lh-none font-400 tracking-wider text-neutral-800><span sr-only>Nimiq </span>Playground</h1>
    </NuxtLink>

    <NavigationMenuRoot relative z-10 class="raw">
      <NavigationMenuList flex="~ gap-24 items-center" text="14 neutral-900 hocus:*:neutral">
        <NavigationMenuItem>
          <NavigationMenuTrigger flex="~ gap-8 items-center justify-center" px-6 py-2 rounded-4
            bg="transparent hocus:neutral-200" transition-colors>
            Tutorials
            <div i-nimiq:chevron-down text-9 />
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul flex="~ col gap-8">
              <li v-for="item in navigation" :key="item._path" :item="item"  w-full hover:bg-neutral-900 transition-colors px-8 py-4 rounded-2>
                <NavigationMenuLink :href="item._path">
                  {{ item.title }}
                </NavigationMenuLink>
              </li>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuLink href="https://nimiq.com/developers/build/web-client/getting-started" target="_blank"
            arrow>
            Web Client Docs
          </NavigationMenuLink>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuLink href="https://github.com/nimiq/core-rs-albatross" target="_blank">
            <div i-carbon-logo-github text-16 />
          </NavigationMenuLink>
        </NavigationMenuItem>

        <NavigationMenuItem flex="~ items-center">
          <button @click="toggleMode" dark:i-carbon:sun i-nimiq:moon dark:text-16 rounded />
        </NavigationMenuItem>

      </NavigationMenuList>

      <div perspective-2000 absolute top-full z-300 w-full flex="~ justify-center">
        <NavigationMenuViewport relative h-="$radix-navigation-menu-viewport-height" w-full of-hidden rounded-8 shadow
          bg-gradient-neutral text-neutral-100 px-8 py-4 />
      </div>
    </NavigationMenuRoot>
  </header>
</template>
