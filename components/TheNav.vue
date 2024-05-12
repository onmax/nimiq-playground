<script setup lang="ts">


function downloadCurrentGuide() {
 
}

</script>


<template>
  <header flex="~ items-center justify-between" px-32 py-16>
    <div flex="~ items-center gap-8">
      <div i-nimiq:logos-nimiq-horizontal dark:i-nimiq:logos-nimiq-white-horizontal text-128 h-32="!"></div>
      <h1 text-15 lh-none font-400 tracking-wider text-neutral-800><span sr-only>Nimiq </span>Playground</h1>
    </div>

    <NavigationMenuRoot relative z-10 class="raw">
      <NavigationMenuList flex="~ gap-24 items-center" text="14 neutral-900 hocus:neutral">
        <NavigationMenuItem>
          <NavigationMenuTrigger flex="~ gap-8 items-center justify-center" px-6 py-2 rounded-4
            bg="transparent hocus:neutral-200" transition-colors>
            Tutorials
            <div i-nimiq:chevron-down text-9 />

          </NavigationMenuTrigger>
          <NavigationMenuContent absolute top-0 left-0 w-full sm:w-auto>
            <ul flex="~ col gap-8">
              <li>
                Item 1

              </li>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuLink href="https://nimiq.com/developers/build/web-client/getting-started" target="_blank" arrow>
            Web Client Docs
          </NavigationMenuLink>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuLink href="https://github.com/nimiq/core-rs-albatross" target="_blank">
            <div i-carbon-logo-github text-16 />
          </NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>

      <div perspective-2000 absolute top-full left-0 w-full flex="~ justify-center">
        <NavigationMenuViewport relative mt-10 h-="$radix-navigation-menu-viewport-height" w-full of-hidden rounded-8
          bg-gradient-neutral />
      </div>
    </NavigationMenuRoot>
  </header>
</template>
