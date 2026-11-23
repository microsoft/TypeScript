# Implementing content mappers

A content mapper is a child process spawned by the TypeScript compiler that receives and responds to JSON-RPC messages over STDIO.
It can be implemented in any language, but must be provided as a Node.js package with a `package.json` specifying how to launch it:

`package.json`:
```jsonc
{
  "name": "vue-content-mapper",
  "version": "1.0.0",
  "typescript": {
    "contentMapper": {
      "exec": ["node", "dist/server.js"],
      "compilerOptions": ["module", "jsx", "jsxImportSource"],
      "dynamicConfig": true,
    }
  }
}
```
The `package.json` of the content mapper package must specify a `typescript` top-level field with a nested `contentMapper` field describing how to spawn the content mapper process and what compiler options its transform requires.
We'll call that configuration the content mapper's **manifest**.

A mapper that reads additional project-specific configuration from external sources beyond the specified compiler options must additionally declare `dynamicConfig: true`.
For example, if the Vue content mapper's `tsconfig.json` options set `target: "auto"`, it reads the nearest `node_modules/vue/package.json` to determine the Vue version.
If the nearest `node_modules/vue/package.json`'s version changes from `3.5.0` to `3.6.0`, it affects the virtual content produced by the content mapper for a Vue file, so the Vue content mapper's manifest needs to specify `dynamicConfig: true`.

In addition to the options above, a content mapper manifest can optionally specify a mapping of output extensions:

```jsonc
{
  "name": "ember-content-mapper",
  "typescript": {
    "contentMapper": {
      "exec": ["node", "server.js"],
      "outputExtensions": {
        ".gts": ".js"
      }
    }
  }
}
```

This is useful when the original content mapped files will be emitted to a different format, rather than left as-is.
In the example above, the `.gts` files are Ember components that Ember will emit to `.js` files.
With this information, TypeScript emits declaration files with the correct file extensions (i.e. `Component.gts` -> `Component.d.ts` instead of `Component.d.gts.ts`) and also permits `.js` import paths to resolve to `.gts` files. 
For more details, see [the implementation PR](https://github.com/microsoft/TypeScript/pull/64581).

## Protocol

A content mapper communicates with TypeScript using JSON-RPC over STDIO.
A JSON schema of the content mapper protocol types can be found in the TypeScript npm package, under `/schemas/contentmapper.schema.json`.
TypeScript will spawn content mappers and send requests as needed.  
A content mapper must not send requests or notifications to TypeScript; only responses.
The basic requests that a content mapper must handle are `initialize`, `openProject`, `transform`, and `closeProject`.

### `initialize`

TypeScript will spawn the content mapper process using the command specified in the `"exec"` option of the content mapper's `package.json`.
It will then send an `initialize` request containing a list of position encodings that TypeScript supports, and optionally a locale that the mapper should use for its diagnostics.

```ts
/** Parameters for the initialize request. */
export interface InitializeParams {
    /** BCP 47 locale for mapper-authored diagnostic messages, when configured. */
    locale?: string;
    /** Coordinate spaces accepted by the host. */
    positionEncodings: PositionEncoding[];
}

/** Coordinate space for mappings and diagnostics: UTF-8 byte offsets or UTF-16 code unit offsets. */
export type PositionEncoding = "utf-8" | "utf-16";
```

The content mapper must respond with one of the supported position encodings that it will use throughout, and also a diagnostic source string that will be used to identify diagnostics emitted by the content mapper.
The diagnostic source must not be `typescript`, `tsc`, or any other extension supported by TypeScript (`ts`, `tsx`, `json`, `js`, etc), so that the content mapper diagnostics are not confused with regular TypeScript diagnostics.

```ts
/** Response to the initialize request. */
export interface InitializeResult {
    positionEncoding: PositionEncoding;
    /**
     * Prefix for mapper-authored diagnostic codes. It must not be whitespace-only or, ignoring case, typescript, tsc,
     * or a native source extension without its leading dot.
     */
    diagnosticSource: string;
}
```

After initialization, the content mapper must be ready to receive the other kinds of requests.

### `openProject`

The first time TypeScript needs to transform a file in a project, it will send an `openProject` request containing a project handle that uniquely identifies the project, the project's relevant compiler options (as specified in the content mapper's manifest), the content mapper options specified in the project's `tsconfig.json`, and optionally a path to a tsconfig for that project, if any exists.

```ts
/** Parameters for the openProject request. */
export interface OpenProjectParams {
    /** Absolute project configuration file name, or an empty string when there is none. */
    configFileName: string;
    /** Opaque, process-local project handle assigned by the host. */
    projectHandle: string;
    /** Mapper entry's options from the project's contentMappers configuration. */
    options?: unknown;
    /** Project's effective compiler options, serialized by the host. */
    compilerOptions: unknown;
}
```

The content mapper must respond to this request.
Its response should contain diagnostics for the project's content mapper options, if any exist.
Additionally, if the content mapper specified `dynamicConfig: true` in its manifest, the response must contain a `configIdentity`: a stable fingerprint of all *dynamically discovered configuration* that can affect transforms for the project.
If `dynamicConfig: true`, the content mapper's response may also contain a list of `watchedFiles`, which are additional files that, if modified, may change the project's `configIdentity` and affect the content mapper's transform.
In that case, whenever a file in the list of `watchedFiles` changes, TypeScript will send a request to close the project (see [`closeProject`](#closeproject)).
TypeScript may then call `openProject` for the same project again when needed.
If changes to the watched files affect the content mapper's transform behavior, that mapper must return a different `configIdentity` for this new `openProject` request.

```ts
/**
 * Response to an openProject request. Only mappers declaring dynamicConfig may return a non-empty configIdentity or
 * watchedFiles.
 */
export interface OpenProjectResult {
    /**
     * Stable fingerprint of all dynamic configuration affecting transforms. It must be non-empty for dynamicConfig
     * mappers; otherwise it must be empty or omitted.
     */
    configIdentity?: string;
    /** Absolute file names whose changes may alter configIdentity or transform output. */
    watchedFiles?: string[];
    /** Diagnostics reporting invalid mapper options. */
    optionDiagnostics?: OptionDiagnosticResult[];
}
```

Note that compiler options will only be sent by TypeScript as part of the `openProject` request.
Content mappers should store the compiler options for an opened project, and associate it with the project's handle, so that it can use this information during a [`transform`](#transform) request for the project.

Also note that a single content mapper process must be able to handle multiple projects, because TypeScript tries to reuse a content mapper process for any project that matches that content mapper.

### `transform`

When TypeScript finds a non-TS file in a project supported by a content mapper, it will send a `transform` request to the content mapper.
That request will have the absolute filename of the *original file* (e.g. `/home/blah/project/file1.vue`), the content of that file, and the handle of the project that file belongs to.

```ts
/** Parameters for the transform request. */
export interface TransformParams {
    /** Absolute name of the content-mapped source file. */
    fileName: string;
    /** Original source text. */
    content: string;
    /** Handle for the project configuration opened for this transform. */
    projectHandle: string;
}
```

The content mapper should then respond with information about the content mapped *virtual file*: its transformed content, its extension (e.g. `.ts`, `.tsx`, etc), *span mappings* mapping between spans in the virtual file and the original file, and diagnostic directives for the virtual file (e.g. `@ts-expect-error`).

```ts
/** Canonical output for one input file, with optional mapper diagnostics and supplemental compiler inputs. */
export interface TransformResult extends MappedOutput {
    /** Mapper-authored errors in original-source coordinates. */
    diagnostics?: Diagnostic[];
    /** Additional unnamed compiler inputs associated with this source file. */
    supplemental?: SupplementalOutput[];
}

export type SupplementalOutput = MappedOutput;

/** Virtual source text and its mapping to the original input. */
export interface MappedOutput {
    /** Virtual source text. */
    text: string;
    /** Extension determining the virtual source file's syntax. */
    extension: ".js" | ".jsx" | ".mjs" | ".cjs" | ".ts" | ".tsx" | ".mts" | ".cts" | ".json";
    /**
     * Span map tuples in the selected position encoding. Absent, null, or empty mappings describe fully synthesized
     * output.
     */
    mappings?: SpanMapSegment[] | null;
    diagnosticDirectives?: DiagnosticDirectives;
}
```

#### Span mappings

Span mappings map between spans (start position + length) in the original file and virtual file.
TypeScript needs these mappings to emit diagnostics and to power other language server features.
For instance, in the CLI, these mappings are used to show TypeScript-generated diagnostics in the original, non-TypeScript content.
A mapping can be of kind `verbatim`, meaning the original and virtual content are the same and have the same length; it can be of kind `atom`, meaning the original and virtual content may have different lengths and contents, and it can be an `alias`, meaning the original and virtual contents may have different lengths and content, but that the content of both is a *name* for the same entity.

Consider the example below:
```
// original content:
(+ 1 2 "oops")

// transformed content:
add(1, 2, "oops");

// span mapping:
add(1, 2, "oops");
^^^                 [0, 3)   → [1, 2) + atom
    ^               [4, 5)   → [3, 4) 1 verbatim
       ^            [7, 8)   → [5, 6) 2 verbatim
          ^^^^^^    [10, 16) → [7, 13) "oops" verbatim
```

TypeScript sees and checks the transformed content, in this case producing a diagnostic for the string literal `"oops"` because it is not a number. The span mapping allows TypeScript to report the diagnostic in the original content, at the correct location of the string literal (`[7, 13)`, instead of `[10, 16)`).

In this example, `add` mapped to `+` with span mapping kind atom, indicating a correspondence between the two spans, but with different lengths and content. If the name `add` failed to resolve, the displayed diagnostic range would cover `+`, but the message would still reference the identifier `add`:

```
add.lisp:1:2 - error TS2304: Cannot find name 'add'.

1 (+ 1 2 "oops")
   ~
```

The mapper can use span mapping kind `alias` instead of span mapping kind `atom` to indicate that the virtual and original text name the same entity.
When the diagnostic is rendered, the original text of the alias span (`+`) will be substituted for the virtual text (`add`) in the diagnostic message:

```
add.lisp:1:2 - error TS2304: Cannot find name '+'.
1 (+ 1 2 "oops")
   ~
```

Gaps in the span map are treated as fully synthesized content and cannot be mapped to a location in the original text.
Diagnostics in unmappable regions are not discarded.
In the CLI, they cause a short snippet of the transformed content to be shown with the diagnostic.
A common case may be a content mapper that synthesizes an import statement at the top of the virtual file used in scaffolding.
If that import fails to resolve, the user will see:

```
app.vue:1:26 - error TS2307: Cannot find module '@vue/content-mapper-utils' or its corresponding type declarations.
  This location is in code generated by the content mapper '@vue/content-mapper@1.0.0' and has no corresponding location in the original file.

1 import { scaffolding } from "@vue/content-mapper-utils";
                              ~~~~~~~~~~~~~~~~~~~~~~~~~~~
```

Spans in the virtual text must not overlap, but multiple may map to the same span in the original content.
In other words, one range in the original content can map to multiple ranges in the transformed content.
Span mappings also optionally contain a `features` mask specifying which language server features can use that mapping.
This can be combined with the ability of mapping an original span to many virtual spans.
Broadly speaking, when a language server request is received for a position in a content-mapped virtual file, TypeScript maps it to every original file projection whose features mask includes the requested operation, performs analysis on the transformed content, and maps visible results back through spans that participate in the same feature.
This lets a content mapper independently select, for example, one projection for hover and another for definitions or references.

For instance:

`ClassBinding.vue`:
```vue
<script setup lang="ts">
const { active } = defineProps<{ active: boolean }>();
</script>

<template><p :class="{ active }">Hello</p></template>

<style scoped>
.active { color: red; }
</style>
```

`ClassBinding.ts` (virtual file):
```ts
/// <reference types="./node_modules/@vue/language-core/types/template-helpers.d.ts" />

const { defineProps, } = {} as typeof import('vue');
type __VLS_Props = { active: boolean };
const __VLS_props = defineProps<__VLS_Props>();
const { active } = __VLS_props;
...
type __VLS_StyleScopedClasses = {}
 & { active: boolean };
void ({} as __VLS_StyleScopedClasses);
__VLS_asFunctionalElement0(__VLS_intrinsics.p, __VLS_intrinsics.p)({
...{ class: ({ active: active }) },
});
/** @type {__VLS_StyleScopedClasses['active']} */;
...
export default {} as typeof __VLS_export;

```

In this example, the span for identifier `active` inside the template, i.e. in `<template><p :class="{ active }">Hello</p></template>`, is mapped to three virtual spans:
`active` property in `...{ class: ({ |active|: active }) }`, `active` reference in `...{ class: ({ active: |active| }) }`, and `active` key text in `/** @type {__VLS_StyleScopedClasses['|active|']} */;`.
All three span mappings's features mask includes the "definition" feature, so if we run "Go To Definition" on `active` in `<template><p :class="{ active }">Hello</p></template>`, we will get three occurrences, each one corresponding to running "Go To Definition" in the virtual file's span, and then mapping back to the original file:
![Screenshot showing file `ClassBinding.vue` open in VSCode, and a "Peek Definition" window open below it, showing three highlighted occurrences of the identifier `active`: one one line 2, one on line 5, and one on line 8.](class-active-def.png)

Only the first two span mappings include the "hover" feature, such that if we hover over `active`, we only see hover content corresponding to these two mappings, one for a property, another for a variable reference.
The third span mapping is ignored:

```
(property) active: boolean
const active: boolean
```

More precisely, the TypeScript language server currently supports the following features for content-mapped files:

- **Diagnostics** - always mapped to original content where possible; diagnostics in synthesized regions are collected and reported at the top of the file. Declared-but-not-used diagnostics are automatically suppressed in synthesized regions. Diagnostics are intentionally not represented by a span-map feature flag. Framework-specific semantic diagnostic suppression is instead expressed explicitly through [`diagnosticDirectives`](#diagnostic-directives).
- **Position-based features** - hover, signature help, completions, definitions, type definitions, implementations, source definitions, references, document highlights, rename, call hierarchy, code actions, formatting, linked editing, and auto-insert map incoming positions or ranges through spans participating in their corresponding `SpanMapFeature` flag.
- **Document-wide features** - inlay hints, semantic tokens, folding ranges, selection ranges, document symbols, and CodeLens map visible results back only through spans participating in their corresponding flag.
- **Text edits** - feature participation does not make a mapping edit-safe. Rename, code action, completion, and formatting edits may be written back only through exact, length-preserving `SpanMapKind.Verbatim` mappings.

Language service requests and visible results can be disabled independently for any span by clearing the corresponding bits, or disabled for all features with `SpanMapFeature.None`. If `features` is omitted from the span mapping tuple, it defaults to `SpanMapFeature.All`, enabling every supported language service feature for that span.

> [!NOTE]
> Unlike with Volar, feature participation must be statically determined by the content mapper during transformation. This level of LSP feature mapping is not intended to replace fully custom language servers. TypeScript’s goal in providing language service support for content-mapped files is to support a good editing experience inside `<script>` blocks or similar verbatim ranges that embed normal TypeScript or JavaScript code without a third-party language server needing to proxy every request unchanged. We expect that ecosystems implementing complex transforms may still want to implement their own language servers alongside TypeScript’s, and either augment or replace TypeScript’s implementation of these language service features. Content mappers provide a baseline editing experience, but they also provide the API foundation for more specialized language servers to build on. Vue tooling, for example, may choose to enable TypeScript features only for selected projections while a separate language server handles the rest, accessing the AST, type, and symbol information of transformed content through an API connection to TypeScript’s language server.

#### Diagnostic directives

A content mapper can have its own diagnostic directives, whose scoping rules can be different from TypeScript's `// @ts-ignore` or `// @ts-expect-error`.
For instance, Vue supports the `@vue-expect-error` directive:

`File.vue`:
```vue
<!-- @vue-expect-error -->
<div
  :id="firstError"
  :title="secondError"
></div>
```

`File.ts`:
```ts
__VLS_asFunctionalElement1(
    __VLS_intrinsics.div,
    __VLS_intrinsics.div,
)({
    id: (__VLS_ctx.firstError),
    title: (__VLS_ctx.secondError),
});
```

The expect-error directive in Vue applies to errors on every line of the `<div>` element in the original text, which are broken up into multiple lines in the virtual text too. This behavior can’t be replicated with any number of `// @ts-expect-error` directives.
Instead, the content mapper can return `diagnosticDirectives` in the transform result, which specify an original span corresponding to `<!-- @vue-expect-error -->`, a virtual span, and a policy of either `DiagnosticDirectivePolicy.Expect` or `DiagnosticDirectivePolicy.Ignore`, indicating the TypeScript semantics of the directive, similar to `// @ts-expect-error` or `// @ts-ignore`, respectively.
TypeScript will suppress bind/check diagnostics in that virtual span according to the policy, and report unused `Expect` directives as diagnostics in the original content. Unused-directive diagnostics are stored once in `unusedExpectDirectiveDiagnostics` and referenced by index from directive tuples.

#### Diagnostics

In its transform result, a content mapper can return diagnostics for unparseable content in a content mapped file.
Note that these errors are treated by TypeScript as parse errors, and so they block binding and type checking for the virtual file; you shouldn't use those diagnostics to return semantic errors (see [this issue](https://github.com/microsoft/TypeScript/issues/65462)).
Errors in the virtual content itself are handled by TypeScript like any other file.

#### Failure handling

If the content mapper fails in an unexpected way (e.g., crashes or doesn’t conform to the protocol), TypeScript reports a localized diagnostic and treats the file as an empty TypeScript file.
After five failures in a single project, TypeScript stops attempting to transform files with that content mapper and issues a final diagnostic reporting the failure.

#### Supplemental output

A content mapper may return supplemental virtual files in its transform result when an original file contributes more than one virtual file, such as an Astro component containing multiple script blocks:

`Buttons.astro`:
```tsx
<button id="hello">Hello</button>
<button id="goodbye">Goodbye</button>

<script>
const button = document.querySelector('#hello');
button?.addEventListener('click', () => alert('Hello'));
</script>

<script>
const button = document.querySelector('#goodbye');
button?.addEventListener('click', () => alert('Goodbye'));
</script>
```
Canonical virtual file `Buttons.tsx`:
```tsx
export default function Buttons() {
  return (
    <>
      <button id="hello">Hello</button>
      <button id="goodbye">Goodbye</button>
    </>
  );
}
```
Supplemental virtual files:
First script block:
```ts
const button = document.querySelector('#hello');
button?.addEventListener('click', () => alert('Hello'));

export {};
```
Second script block:
```ts
const button = document.querySelector('#goodbye');
button?.addEventListener('click', () => alert('Goodbye'));

export {};
```

TypeScript automatically includes these supplemental files in the same program as the canonical virtual file.
Supplemental virtual files receive compiler-assigned virtual file names based on their order and extension, but those names cannot be imported directly.
Imports written inside supplemental virtual files resolve relative to the directory containing the original file.


### `closeProject`

TypeScript will send a `closeProject` notification containing the project handle of the project that should be closed.
This means the content mapper can let go of information stored about that particular project.

TypeScript will typically close a project if it doesn't need it anymore, if a project's relevant compiler options change, or, as mentioned in [`openProject`](#openproject), if the content mapper has dynamic configurations and a watched file changes.

## Compilation

Content mappers also interact with TypeScript's compilation process in other ways:

### Emit

Content-mapped virtual files are not emitted to JavaScript.
When `--declaration` is enabled, however, declaration files are emitted from the transformed content.
The declaration file name for `App.svelte` by default is `App.d.svelte.ts`;
if the content mapper manifest specifies `outputExtensions`, then the declaration file name will match the specified output extension.
Declaration files for supplemental outputs of a file named `App.svelte` are emitted as `App.svelte.0.d.ts`, `App.svelte.1.d.ts`, etc., and are automatically referenced by `App.d.svelte.ts`.
Declaration maps are also supported when enabled in a project, they map between the declaration file and the original file by combining the mapping between the declaration file and the virtual file, and the mapping between the virtual file and the original file.

### Incremental, build, watch, and process consolidation

Content mappers are supported in `--incremental`, `--build`, and `--watch` modes. Each project records sorted mapper transform identities in `.tsbuildinfo` and compares them during up-to-date checks. Changing an identity forces files handled by that mapper to be transformed again.

For a mapper without `dynamicConfig: true`, the transform identity is computed without starting its process. It includes the resolved package name and version, the tsconfig entry’s `options`, and the values of compiler options named by `typescript.contentMapper.compilerOptions`. Consequently, incremental and solution-build status checks do not spawn processes for mappers with static configuration.

For a mapper declaring `dynamicConfig: true`, TypeScript uses `openProject` to obtain `configIdentity` before an up-to-date decision. The mapper is responsible for changing `configIdentity` whenever dynamically discovered configuration that can affect transforms changes.

TypeScript watches the absolute paths returned in `watchedFiles`. A change invalidates only projects that reported that path, closes their current mapper project configuration, obtains a fresh identity and watch set, and performs a normal project rebuild. Other projects using the same mapper package continue using their existing project handles and the shared process.

> [!NOTE]
> Modifying a static-config content mapper implementation during local development will not change its identity, so you’ll need to bump the local package.json version, or use `--force` or `--clean` to clear cached outputs if testing with `--incremental` or `--build`.

In `--build` mode with project references, and in some instances in the language server, it’s possible to have a project graph with many projects all defining the same content mapper. To avoid excessive spawning of child processes, TypeScript deduplicates content mapper processes by resolved package name and version. One process may have many open project handles. Mappers must isolate project-specific state by `projectHandle`, accept requests for different projects in any order, and release that state on `closeProject`. Processes remain alive while any project using that package is retained.

## API integration

Content-mapped SourceFiles can be inspected by the JavaScript API. For a content-mapped SourceFile, `file.text` is the transformed text, `file.originalText` is the original text, and `file.spanMap` exposes an API for mapping between the two. Regardless of the `positionEncoding` used by the content mapper, accessing the span map through the JavaScript API always yields UTF-16 positions.

```ts
const mapped = file.spanMap.virtualToOriginalPosition(10);
// { position, fidelity }
// See _packages/native-preview/src/ast/spanMap.ts for details.
```

If the content mapper provided supplemental outputs for a file, the file names are set on `file.supplementalOutputs` and can be retrieved with `program.getSourceFile(fileName)`.

## Debugging

On the CLI, when the `TS_CONTENT_MAPPER_DEBUG` environment variable is set, JSON-RPC communication is logged and the mapper process’s STDERR is captured and redirected to tsc’s STDERR.

In the LSP, when the LSP log level is set to Trace, JSON-RPC communication and mapper STDERR flow to the LSP client (you can see the content mapper debug logs in the “TypeScript 7” output channel in VS Code, for example). At lower log levels, mapper STDERR is discarded.

<!-- TODO: I also have a prototype of a VS Code extension that lets you see the virtual content and span mappings, which I’ll share after this PR is merged. -->

## Editor extension

If you implement a content mapper and you want to support editors like VSCode, you should very likely also implement a companion editor extension for it.
To understand why, consider what happens when a user opens VSCode, and then opens a single `.vue` file.
At this point, the TypeScript extension isn't running yet, and VSCode doesn't know it should activate it, even if that `.vue` file belongs to a TypeScript project configured with a Vue content mapper; typically VSCode will only activate the TypeScript extension once a TypeScript file is opened.

To address this problem, you can implement an extension that tells VSCode to activate the TypeScript extension when a file supported by your content mapper is opened and your extension is activated:

```ts
const extension = vscode.extensions.getExtension("TypeScriptTeam.native-preview");
const api = await extension?.activate();

const registration = api?.registerContentMappers(
    "publisher.vue-language-features",
    [{ extensions: [".vue"] }],
);
```

This will activate the TypeScript extension, and TypeScript will inspect matching open documents and discover configured projects that provide a content mapper for them.

Your extension should also provide content mapper support for inferred projects (as opposed to configured projects).
Imagine the user opens, for example, a `.vue` file that doesn't belong to a configured TypeScript project: TypeScript won't know how to invoke your content mapper for that file and won't include it in the inferred project.
Your extension can register a content mapper contribution for inferred projects:

```ts
const registration = api?.registerContentMappers(
    "publisher.vue-language-features",
    [{
        extensions: [".vue"],
        inferredProjectContribution: {
            options: { strictTemplates: true }, // corresponds to tsconfig.json contentMappers options
            manifest: {                         // corresponds to a content mapper's package.json
                name: "vue-content-mapper",
                version: "1.0.0",
                exec: [process.execPath, mapperEntryPoint],
                cwd: extension.extensionUri,
                compilerOptions: ["module", "jsx", "jsxImportSource"],
                dynamicConfig: true,
            },
        },
    }],
);
```

Besides activating TypeScript on content mapped files, and providing content mapper support for inferred projects, a companion extension can also provide customized language server features beyond what content mappers enable.
For instance, consider the following Svelte file:

```svelte
<script lang="ts">
  let { visible = true }: { visible?: boolean } = $props();
</script>

{#if visible}
  <p>Hello</p>
{:else}
  <p>Goodbye</p>
{/if}
```

While TypeScript can provide completions inside the script blocks, which are content-mapped into TypeScript content, it will not provide completions outside those blocks, such as completions for the closing keyword in `{/if}`. Those completions have to be provided by the Svelte extension.

Extensions can also intercept TypeScript language server responses and process them.
As an example, consider the following Svelte file:

`HoverChild.svelte`:
```svelte
<p>Hello</p>
```

When content mapped, the virtual content will look something like this:

`HoverChild.ts`:
```ts
...
class HoverChild__Svelte_Component_ { ... }
...
```

The special Svelte suffix is necessary to avoid name clashes, but now, if that class is used somewhere and the user hovers over it, they would see the generated name instead of the original name.
To fix this, the Svelte extension processes TypeScript hover responses, and maps those generated names back to user-facing ones (e.g. `HoverChild__Svelte_Component_` -> `HoverChild`).
