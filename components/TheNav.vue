<script setup lang="ts">
import type { NavItem } from '@nuxt/content'

const colorMode = useColorMode()
function toggleMode() {
  colorMode.preference = colorMode.value === 'light' ? 'dark' : 'light'
}

const { navigation } = useContent() as { navigation: Ref<NavItem[]> }
</script>

<template>
  <header flex="~ items-center justify-between" px-32 py-16>
    <NuxtLink to="/" flex="~ items-center gap-8">
      <div i-nimiq:logos-nimiq-horizontal dark:i-nimiq:logos-nimiq-white-horizontal text-32 />
      <h1 text-15 text-neutral-800 font-400 lh-none tracking-wider>
        <span sr-only>Nimiq </span>Playground
      </h1>
    </NuxtLink>

    <NavigationMenuRoot relative z-10 class="raw">
      <NavigationMenuList flex="~ gap-24 items-center" text="14 neutral-900 hocus:*:neutral">
        <NavigationMenuItem>
          <NavigationMenuTrigger
            flex="~ gap-8 items-center justify-center"
            bg="transparent hocus:neutral-200" rounded-4 px-6 py-2 transition-colors
          >
            Tutorials
            <div i-nimiq:chevron-down text-9 />
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul flex="~ col gap-8">
              <li v-for="item in navigation" :key="item._path" :item="item" w-full rounded-2 px-8 py-4 transition-colors hover:bg-neutral-900>
                <NavigationMenuLink :href="item._path">
                  {{ item.title }}
                </NavigationMenuLink>
              </li>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuLink
            href="https://nimiq.com/developers/build/web-client/getting-started" target="_blank"
            nq-arrow
          >
            Web Client Docs
          </NavigationMenuLink>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuLink href="https://github.com/nimiq/core-rs-albatross" target="_blank">
            <div i-carbon-logo-github text-16 />
          </NavigationMenuLink>
        </NavigationMenuItem>

        <NavigationMenuItem flex="~ items-center">
          <button i-nimiq:moon dark:i-carbon:sun rounded dark:text-16 @click="toggleMode" />
        </NavigationMenuItem>
      </NavigationMenuList>

      <div absolute top-full z-300 w-full perspective-2000 flex="~ justify-center">
        <NavigationMenuViewport
          h-="$radix-navigation-menu-viewport-height"
          relative w-full of-hidden rounded-8 px-8 py-4 text-neutral-100 shadow bg-gradient-neutral
        />
      </div>
    </NavigationMenuRoot>
  </header>
</template>
