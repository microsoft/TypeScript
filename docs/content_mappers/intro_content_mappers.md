# Content mappers

<!-- ## What are they? -->

TypeScript has long had powerful checking and tooling for TypeScript and JavaScript code; however, lots of developers use specialized file types for UI components, schemas, data queries, etc.
For example, Vue.js has regions of HTML, JavaScript/TypeScript, and CSS, all within a single `.vue` file:

`UserList.vue`:
```vue
<script setup lang="ts">
import { ref } from 'vue'
const count = ref<number>(0)
</script>

<template>
  <button type="button" @click="count++">{{ count }}</button>
</template>

<style scoped>
button {
  color: teal;
}
</style>
```

Content mappers allow TypeScript to understand these specialized file types by mapping their content to equivalent TypeScript code.
For the example above, a Vue content mapper could map that `.vue` file into the following TypeScript file:

`UserList.ts`:
```ts
import { ref } from 'vue'
const count = ref<number>(0);
// ... vue-specific definitions ...
const __VLS_export = (await import('vue')).defineComponent({
});
export default {} as typeof __VLS_export;
```

<!-- ## What can it do? -->

This virtual file is then treated as any other TypeScript file that is part of your TypeScript program.
TypeScript can analyze it and provide diagnostics for it, and all the typical editor commands will also work (go to definition, hover, rename, etc).
For instance, you can hover over the TypeScript portions of the above `.vue` file:

![Screenshot of the previous Vue code snippet open in VSCode with the cursor positioned above the `ref` call, and a hover window showing `ref`'s signature and documentation overlaid.](vue-hover-1.png)

You can also import the original file into a TypeScript program:

```ts
// index.ts
import { createApp } from 'vue'
import UserList from './UserList.vue'

createApp(UserList).mount('#app')
```

<!-- ## How to use it? -->

To start using content mappers, you need to have your content mapper installed as a dependency, and then configure your project via `tsconfig.json`:

```jsonc
{
  "compilerOptions": {
    // ...
  },
  "contentMappers": [
    {
      "package": "@vue/content-mapper",
      "extensions": [".vue"],
      "options": {
        // Add any specific options for the content mapper here
        "target": 3.5
      }
    }
  ]
}
```

In the configuration above, files with `.vue` extension will be content mapped by `@vue/content-mapper`, and the `"target": 3.5` option (along with anything specified under `"options"`) will be passed directly to the content mapper.


If you have multiple configured projects that all share the same content mappers, it's possible to configure them by extending a tsconfig that specifies the content mappers:

`configs/base.json`:
```json
{
  "compilerOptions": { ... }
  "contentMappers": [
    {
      "package": "@vue/content-mapper",
      "extensions": [".vue"],
      "options": {
        "target": 3.5
      }
    },
    ...
  ]
}
```
`tsconfig.json`:
```json
{  "extends": "./configs/base.json",
  ...
}
```

When running the compiler on the command line, you'll also need to pass the option `--runExternalCode`, otherwise TypeScript will ignore content mappers:

```$
tsc --runExternalCode
```

In the editor, TypeScript will only enable content mappers on **trusted workspaces**.
You can also enable or disable content mappers via the editor setting `js/ts.contentMappers.enabled`.
