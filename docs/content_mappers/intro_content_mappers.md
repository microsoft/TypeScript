# Content mappers

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

This virtual file is then treated as any other TypeScript file.
TypeScript can analyze it and provide diagnostics for it, and all the typical editor commands will also work (go to definition, hover, rename, etc).
For instance, you can hover over the TypeScript portions of the above `.vue` file:

![Screenshot of the previous Vue code snippet open in VSCode with the cursor positioned above the `ref` call, and a hover window showing `ref`'s signature and documentation overlaid.](vue-hover-1.png)

## Configuration

To start using content mappers, you need to have your content mapper installed as a dependency, and then configure your project via `tsconfig.json`:

```jsonc
{
  "compilerOptions": {
    ...
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

If you have multiple configured projects that all share the same content mappers, you can configure them by extending a tsconfig that specifies the content mappers:

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

## Including content-mapped files

In the configuration above, files with the `.vue` extension will be content-mapped by `@vue/content-mapper`, and the `"target": 3.5` option (along with anything specified under `"options"`) will be passed directly to the content mapper.

Once you have configured content mappers for your project, a content-mapped file can be part of your TypeScript program through the same mechanisms as regular TypeScript files.
For instance, you can include it using a tsconfig's `include` option:

```jsonc
{
 "compilerOptions": {
    ...
  },
  "include": ["src/**/*"],
  "contentMappers": [...],
}
```

Then, if your project looks like this:
```
project/
|-- src/
|   |-- index.ts
|   `-- App.vue
`-- tsconfig.json
```

`App.vue` will be part of your TypeScript program.
Note that if instead you specify `"include": ["src/**/*.ts"]`, `App.vue` will not automatically be part of your program.

You can also import a content-mapped file into a TypeScript program:

`index.ts`:
```ts
import { createApp } from 'vue'
import UserList from './UserList.vue'

createApp(UserList).mount('#app')
```

Note that relative imports of content-mapped files *must* specify a file extension (e.g. `.vue`).

You can also filter which files can be content-mapped by using a mapper-specific `include` field in your tsconfig:

`tsconfig.json`:
```jsonc
{
  "compilerOptions": {
    ...
  },
  "include": ["src/**/*"],
  "contentMappers": [{
    "package": "vue-content-mapper",
    "extensions": [".vue"],
    "include": ["src/components/**/*"], // filter which .vue files are handled by vue-content-mapper
  }]
}
```

Then, given the following project structure:
```
project/
|-- src/
|   |-- index.ts
|   |-- components/
|   |   |-- App.vue          # eligible for content mapping
|   |   `-- forms/
|   |       `-- Input.vue    # eligible for content mapping
|   `-- pages/
|       `-- Home.vue         # not handled by this mapper
`-- tsconfig.json
```

`src/components/App.vue` will be included in your TS program and content-mapped by `vue-content-mapper`, while `src/pages/Home.vue` will not.

## CLI and editor support

When running the compiler on the command line, you'll also need to pass the option `--runExternalCode`, otherwise TypeScript will ignore content mappers:

```$
tsc --runExternalCode
```

In the editor, TypeScript will only enable content mappers on **trusted workspaces**.
You can also enable or disable content mappers via the editor setting `js/ts.contentMappers.enabled`.
