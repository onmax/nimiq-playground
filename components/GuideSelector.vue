<script setup lang="ts">
import type { NavItem } from '@nuxt/content/dist/runtime/types'

const { navigation } = useContent() as { navigation: Ref<NavItem[]> }

const guide = defineModel<NavItem>()
const route = useRoute()

guide.value = navigation.value.filter((item) => item._path === route.path).at(0) || navigation.value.at(0)!

</script>

<template>
  <NavigationMenuRoot disable-hover-trigger aria-label="Guides">
    <NavigationMenuList>
      <NavigationMenuItem>
        <NavigationMenuTrigger w-full>
          <div i-ph-book-duotone />
          Your guide
        </NavigationMenuTrigger>
          <NavigationMenuContent absolute bg-gradient-neutral w-full z-200 rounded-b-6 px-24 text="14 neutral-300">
            <ul flex="~ col">
              <li>
                Guide 2
              </li>
            </ul>
          </NavigationMenuContent>
      </NavigationMenuItem>
    </NavigationMenuList>
  </NavigationMenuRoot>
</template>
