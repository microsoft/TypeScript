currentDirectory:: /home/src/projects/component-type-checker/packages/app useCaseSensitiveFileNames: false
Input::
//// [/home/src/projects/component-type-checker/node_modules/.pnpm/@component-type-checker+button@0.0.1/node_modules/@component-type-checker/button/src/index.ts]
export interface Button {
    a: number;
    b: number;
}
export function createButton(): Button {
    return {
        a: 0,
        b: 1,
    };
}


//// [/home/src/projects/component-type-checker/node_modules/.pnpm/@component-type-checker+button@0.0.1/node_modules/@component-type-checker/button/package.json]
{
  "name": "@component-type-checker/button",
  "version": "0.0.1",
  "main": "./src/index.ts"
}

//// [/home/src/projects/component-type-checker/node_modules/.pnpm/@component-type-checker+button@0.0.2/node_modules/@component-type-checker/button/src/index.ts]
export interface Button {
    a: number;
    c: number;
}
export function createButton(): Button {
    return {
        a: 0,
        c: 2,
    };
}


//// [/home/src/projects/component-type-checker/node_modules/.pnpm/@component-type-checker+button@0.0.2/node_modules/@component-type-checker/button/package.json]
{
  "name": "@component-type-checker/button",
  "version": "0.0.2",
  "main": "./src/index.ts"
}

//// [/home/src/projects/component-type-checker/node_modules/.pnpm/@component-type-checker+components@0.0.1_@component-type-checker+button@0.0.1/node_modules/@component-type-checker/button] symlink(/home/src/projects/component-type-checker/node_modules/.pnpm/@component-type-checker+button@0.0.1/node_modules/@component-type-checker/button)
//// [/home/src/projects/component-type-checker/node_modules/.pnpm/@component-type-checker+components@0.0.1_@component-type-checker+button@0.0.1/node_modules/@component-type-checker/components/src/index.ts]
export { createButton, Button } from "@component-type-checker/button";


//// [/home/src/projects/component-type-checker/node_modules/.pnpm/@component-type-checker+components@0.0.1_@component-type-checker+button@0.0.1/node_modules/@component-type-checker/components/package.json]
{
  "name": "@component-type-checker/components",
  "version": "0.0.1",
  "main": "./src/index.ts",
  "peerDependencies": {
    "@component-type-checker/button": "*"
  },
  "devDependencies": {
    "@component-type-checker/button": "0.0.2"
  }
}

//// [/home/src/projects/component-type-checker/node_modules/.pnpm/@component-type-checker+components@0.0.1_@component-type-checker+button@0.0.2/node_modules/@component-type-checker/button] symlink(/home/src/projects/component-type-checker/node_modules/.pnpm/@component-type-checker+button@0.0.2/node_modules/@component-type-checker/button)
//// [/home/src/projects/component-type-checker/node_modules/.pnpm/@component-type-checker+components@0.0.1_@component-type-checker+button@0.0.2/node_modules/@component-type-checker/components/src/index.ts]
export { createButton, Button } from "@component-type-checker/button";


//// [/home/src/projects/component-type-checker/node_modules/.pnpm/@component-type-checker+components@0.0.1_@component-type-checker+button@0.0.2/node_modules/@component-type-checker/components/package.json]
{
  "name": "@component-type-checker/components",
  "version": "0.0.1",
  "main": "./src/index.ts",
  "peerDependencies": {
    "@component-type-checker/button": "*"
  },
  "devDependencies": {
    "@component-type-checker/button": "0.0.2"
  }
}

//// [/home/src/projects/component-type-checker/packages/sdk/src/index.ts]
export { Button, createButton } from "@component-type-checker/components";
export const VERSION = "0.0.2";


//// [/home/src/projects/component-type-checker/packages/sdk/package.json]
{
  "name": "@component-type-checker/sdk1",
  "version": "0.0.2",
  "main": "./src/index.ts",
  "dependencies": {
    "@component-type-checker/components": "0.0.1",
    "@component-type-checker/button": "0.0.1"
  }
}

//// [/home/src/projects/component-type-checker/packages/sdk/node_modules/@component-type-checker/button] symlink(/home/src/projects/component-type-checker/node_modules/.pnpm/@component-type-checker+button@0.0.1/node_modules/@component-type-checker/button)
//// [/home/src/projects/component-type-checker/packages/sdk/node_modules/@component-type-checker/components] symlink(/home/src/projects/component-type-checker/node_modules/.pnpm/@component-type-checker+components@0.0.1_@component-type-checker+button@0.0.1/node_modules/@component-type-checker/components)
//// [/home/src/projects/component-type-checker/packages/app/src/app.tsx]
import { VERSION } from "@component-type-checker/sdk";
import { Button } from "@component-type-checker/components";
import { createButton } from "@component-type-checker/button";
const button: Button = createButton();


//// [/home/src/projects/component-type-checker/packages/app/package.json]
{
  "name": "app",
  "version": "1.0.0",
  "dependencies": {
    "@component-type-checker/button": "0.0.2",
    "@component-type-checker/components": "0.0.1",
    "@component-type-checker/sdk": "0.0.2"
  }
}

//// [/home/src/projects/component-type-checker/packages/app/tsconfig.json]
{
  "compilerOptions": {
    "target": "es5",
    "module": "esnext",
    "lib": [
      "ES5"
    ],
    "moduleResolution": "node",
    "baseUrl": ".",
    "outDir": "dist"
  },
  "include": [
    "src"
  ]
}

//// [/home/src/projects/component-type-checker/packages/app/node_modules/@component-type-checker/button] symlink(/home/src/projects/component-type-checker/node_modules/.pnpm/@component-type-checker+button@0.0.2/node_modules/@component-type-checker/button)
//// [/home/src/projects/component-type-checker/packages/app/node_modules/@component-type-checker/components] symlink(/home/src/projects/component-type-checker/node_modules/.pnpm/@component-type-checker+components@0.0.1_@component-type-checker+button@0.0.2/node_modules/@component-type-checker/components)
//// [/home/src/projects/component-type-checker/packages/app/node_modules/@component-type-checker/sdk] symlink(/home/src/projects/component-type-checker/packages/sdk)
//// [/a/lib/lib.es5.d.ts]
/// <reference no-default-lib="true"/>
interface Boolean {}
interface Function {}
interface CallableFunction {}
interface NewableFunction {}
interface IArguments {}
interface Number { toExponential: any; }
interface Object {}
interface RegExp {}
interface String { charAt: any; }
interface Array<T> { length: number; [n: number]: T; }
interface ReadonlyArray<T> {}
declare const console: { log(msg: any): void; };


/a/lib/tsc.js --traceResolution --explainFiles
Output::
======== Resolving module '@component-type-checker/sdk' from '/home/src/projects/component-type-checker/packages/app/src/app.tsx'. ========
Explicitly specified module resolution kind: 'Node10'.
'baseUrl' option is set to '/home/src/projects/component-type-checker/packages/app', using this value to resolve non-relative module name '@component-type-checker/sdk'.
Resolving module name '@component-type-checker/sdk' relative to base url '/home/src/projects/component-type-checker/packages/app' - '/home/src/projects/component-type-checker/packages/app/@component-type-checker/sdk'.
Loading module as file / folder, candidate module location '/home/src/projects/component-type-checker/packages/app/@component-type-checker/sdk', target file types: TypeScript, Declaration.
Loading module '@component-type-checker/sdk' from 'node_modules' folder, target file types: TypeScript, Declaration.
Searching all ancestor node_modules directories for preferred extensions: TypeScript, Declaration.
Directory '/home/src/projects/component-type-checker/packages/app/src/node_modules' does not exist, skipping all lookups in it.
Scoped package detected, looking in 'component-type-checker__sdk'
Found 'package.json' at '/home/src/projects/component-type-checker/packages/app/node_modules/@component-type-checker/sdk/package.json'.
File '/home/src/projects/component-type-checker/packages/app/node_modules/@component-type-checker/sdk.ts' does not exist.
File '/home/src/projects/component-type-checker/packages/app/node_modules/@component-type-checker/sdk.tsx' does not exist.
File '/home/src/projects/component-type-checker/packages/app/node_modules/@component-type-checker/sdk.d.ts' does not exist.
'package.json' does not have a 'typesVersions' field.
'package.json' does not have a 'typings' field.
'package.json' does not have a 'types' field.
'package.json' has 'main' field './src/index.ts' that references '/home/src/projects/component-type-checker/packages/app/node_modules/@component-type-checker/sdk/src/index.ts'.
File '/home/src/projects/component-type-checker/packages/app/node_modules/@component-type-checker/sdk/src/index.ts' exists - use it as a name resolution result.
'package.json' does not have a 'peerDependencies' field.
Resolving real path for '/home/src/projects/component-type-checker/packages/app/node_modules/@component-type-checker/sdk/src/index.ts', result '/home/src/projects/component-type-checker/packages/sdk/src/index.ts'.
======== Module name '@component-type-checker/sdk' was successfully resolved to '/home/src/projects/component-type-checker/packages/sdk/src/index.ts' with Package ID '@component-type-checker/sdk1/src/index.ts@0.0.2'. ========
======== Resolving module '@component-type-checker/components' from '/home/src/projects/component-type-checker/packages/app/src/app.tsx'. ========
Explicitly specified module resolution kind: 'Node10'.
'baseUrl' option is set to '/home/src/projects/component-type-checker/packages/app', using this value to resolve non-relative module name '@component-type-checker/components'.
Resolving module name '@component-type-checker/components' relative to base url '/home/src/projects/component-type-checker/packages/app' - '/home/src/projects/component-type-checker/packages/app/@component-type-checker/components'.
Loading module as file / folder, candidate module location '/home/src/projects/component-type-checker/packages/app/@component-type-checker/components', target file types: TypeScript, Declaration.
Loading module '@component-type-checker/components' from 'node_modules' folder, target file types: TypeScript, Declaration.
Searching all ancestor node_modules directories for preferred extensions: TypeScript, Declaration.
Directory '/home/src/projects/component-type-checker/packages/app/src/node_modules' does not exist, skipping all lookups in it.
Scoped package detected, looking in 'component-type-checker__components'
Found 'package.json' at '/home/src/projects/component-type-checker/packages/app/node_modules/@component-type-checker/components/package.json'.
File '/home/src/projects/component-type-checker/packages/app/node_modules/@component-type-checker/components.ts' does not exist.
File '/home/src/projects/component-type-checker/packages/app/node_modules/@component-type-checker/components.tsx' does not exist.
File '/home/src/projects/component-type-checker/packages/app/node_modules/@component-type-checker/components.d.ts' does not exist.
'package.json' does not have a 'typesVersions' field.
'package.json' does not have a 'typings' field.
'package.json' does not have a 'types' field.
'package.json' has 'main' field './src/index.ts' that references '/home/src/projects/component-type-checker/packages/app/node_modules/@component-type-checker/components/src/index.ts'.
File '/home/src/projects/component-type-checker/packages/app/node_modules/@component-type-checker/components/src/index.ts' exists - use it as a name resolution result.
'package.json' has a 'peerDependencies' field.
Resolving real path for '/home/src/projects/component-type-checker/packages/app/node_modules/@component-type-checker/components', result '/home/src/projects/component-type-checker/node_modules/.pnpm/@component-type-checker+components@0.0.1_@component-type-checker+button@0.0.2/node_modules/@component-type-checker/components'.
Found 'package.json' at '/home/src/projects/component-type-checker/node_modules/.pnpm/@component-type-checker+components@0.0.1_@component-type-checker+button@0.0.2/node_modules/@component-type-checker/button/package.json'.
Found peerDependency '@component-type-checker/button' with '0.0.2' version.
Resolving real path for '/home/src/projects/component-type-checker/packages/app/node_modules/@component-type-checker/components/src/index.ts', result '/home/src/projects/component-type-checker/node_modules/.pnpm/@component-type-checker+components@0.0.1_@component-type-checker+button@0.0.2/node_modules/@component-type-checker/components/src/index.ts'.
======== Module name '@component-type-checker/components' was successfully resolved to '/home/src/projects/component-type-checker/node_modules/.pnpm/@component-type-checker+components@0.0.1_@component-type-checker+button@0.0.2/node_modules/@component-type-checker/components/src/index.ts' with Package ID '@component-type-checker/components/src/index.ts@0.0.1+@component-type-checker/button@0.0.2'. ========
======== Resolving module '@component-type-checker/button' from '/home/src/projects/component-type-checker/packages/app/src/app.tsx'. ========
Explicitly specified module resolution kind: 'Node10'.
'baseUrl' option is set to '/home/src/projects/component-type-checker/packages/app', using this value to resolve non-relative module name '@component-type-checker/button'.
Resolving module name '@component-type-checker/button' relative to base url '/home/src/projects/component-type-checker/packages/app' - '/home/src/projects/component-type-checker/packages/app/@component-type-checker/button'.
Loading module as file / folder, candidate module location '/home/src/projects/component-type-checker/packages/app/@component-type-checker/button', target file types: TypeScript, Declaration.
Loading module '@component-type-checker/button' from 'node_modules' folder, target file types: TypeScript, Declaration.
Searching all ancestor node_modules directories for preferred extensions: TypeScript, Declaration.
Directory '/home/src/projects/component-type-checker/packages/app/src/node_modules' does not exist, skipping all lookups in it.
Scoped package detected, looking in 'component-type-checker__button'
Found 'package.json' at '/home/src/projects/component-type-checker/packages/app/node_modules/@component-type-checker/button/package.json'.
File '/home/src/projects/component-type-checker/packages/app/node_modules/@component-type-checker/button.ts' does not exist.
File '/home/src/projects/component-type-checker/packages/app/node_modules/@component-type-checker/button.tsx' does not exist.
File '/home/src/projects/component-type-checker/packages/app/node_modules/@component-type-checker/button.d.ts' does not exist.
'package.json' does not have a 'typesVersions' field.
'package.json' does not have a 'typings' field.
'package.json' does not have a 'types' field.
'package.json' has 'main' field './src/index.ts' that references '/home/src/projects/component-type-checker/packages/app/node_modules/@component-type-checker/button/src/index.ts'.
File '/home/src/projects/component-type-checker/packages/app/node_modules/@component-type-checker/button/src/index.ts' exists - use it as a name resolution result.
'package.json' does not have a 'peerDependencies' field.
Resolving real path for '/home/src/projects/component-type-checker/packages/app/node_modules/@component-type-checker/button/src/index.ts', result '/home/src/projects/component-type-checker/node_modules/.pnpm/@component-type-checker+button@0.0.2/node_modules/@component-type-checker/button/src/index.ts'.
======== Module name '@component-type-checker/button' was successfully resolved to '/home/src/projects/component-type-checker/node_modules/.pnpm/@component-type-checker+button@0.0.2/node_modules/@component-type-checker/button/src/index.ts' with Package ID '@component-type-checker/button/src/index.ts@0.0.2'. ========
======== Resolving module '@component-type-checker/components' from '/home/src/projects/component-type-checker/packages/sdk/src/index.ts'. ========
Explicitly specified module resolution kind: 'Node10'.
'baseUrl' option is set to '/home/src/projects/component-type-checker/packages/app', using this value to resolve non-relative module name '@component-type-checker/components'.
Resolving module name '@component-type-checker/components' relative to base url '/home/src/projects/component-type-checker/packages/app' - '/home/src/projects/component-type-checker/packages/app/@component-type-checker/components'.
Loading module as file / folder, candidate module location '/home/src/projects/component-type-checker/packages/app/@component-type-checker/components', target file types: TypeScript, Declaration.
Loading module '@component-type-checker/components' from 'node_modules' folder, target file types: TypeScript, Declaration.
Searching all ancestor node_modules directories for preferred extensions: TypeScript, Declaration.
Directory '/home/src/projects/component-type-checker/packages/sdk/src/node_modules' does not exist, skipping all lookups in it.
Scoped package detected, looking in 'component-type-checker__components'
Found 'package.json' at '/home/src/projects/component-type-checker/packages/sdk/node_modules/@component-type-checker/components/package.json'.
File '/home/src/projects/component-type-checker/packages/sdk/node_modules/@component-type-checker/components.ts' does not exist.
File '/home/src/projects/component-type-checker/packages/sdk/node_modules/@component-type-checker/components.tsx' does not exist.
File '/home/src/projects/component-type-checker/packages/sdk/node_modules/@component-type-checker/components.d.ts' does not exist.
'package.json' does not have a 'typesVersions' field.
'package.json' does not have a 'typings' field.
'package.json' does not have a 'types' field.
'package.json' has 'main' field './src/index.ts' that references '/home/src/projects/component-type-checker/packages/sdk/node_modules/@component-type-checker/components/src/index.ts'.
File '/home/src/projects/component-type-checker/packages/sdk/node_modules/@component-type-checker/components/src/index.ts' exists - use it as a name resolution result.
'package.json' has a 'peerDependencies' field.
Resolving real path for '/home/src/projects/component-type-checker/packages/sdk/node_modules/@component-type-checker/components', result '/home/src/projects/component-type-checker/node_modules/.pnpm/@component-type-checker+components@0.0.1_@component-type-checker+button@0.0.1/node_modules/@component-type-checker/components'.
Found 'package.json' at '/home/src/projects/component-type-checker/node_modules/.pnpm/@component-type-checker+components@0.0.1_@component-type-checker+button@0.0.1/node_modules/@component-type-checker/button/package.json'.
Found peerDependency '@component-type-checker/button' with '0.0.1' version.
Resolving real path for '/home/src/projects/component-type-checker/packages/sdk/node_modules/@component-type-checker/components/src/index.ts', result '/home/src/projects/component-type-checker/node_modules/.pnpm/@component-type-checker+components@0.0.1_@component-type-checker+button@0.0.1/node_modules/@component-type-checker/components/src/index.ts'.
======== Module name '@component-type-checker/components' was successfully resolved to '/home/src/projects/component-type-checker/node_modules/.pnpm/@component-type-checker+components@0.0.1_@component-type-checker+button@0.0.1/node_modules/@component-type-checker/components/src/index.ts' with Package ID '@component-type-checker/components/src/index.ts@0.0.1+@component-type-checker/button@0.0.1'. ========
File '/home/src/projects/component-type-checker/node_modules/.pnpm/@component-type-checker+components@0.0.1_@component-type-checker+button@0.0.1/node_modules/@component-type-checker/components/src/package.json' does not exist.
Found 'package.json' at '/home/src/projects/component-type-checker/node_modules/.pnpm/@component-type-checker+components@0.0.1_@component-type-checker+button@0.0.1/node_modules/@component-type-checker/components/package.json'.
======== Resolving module '@component-type-checker/button' from '/home/src/projects/component-type-checker/node_modules/.pnpm/@component-type-checker+components@0.0.1_@component-type-checker+button@0.0.1/node_modules/@component-type-checker/components/src/index.ts'. ========
Explicitly specified module resolution kind: 'Node10'.
'baseUrl' option is set to '/home/src/projects/component-type-checker/packages/app', using this value to resolve non-relative module name '@component-type-checker/button'.
Resolving module name '@component-type-checker/button' relative to base url '/home/src/projects/component-type-checker/packages/app' - '/home/src/projects/component-type-checker/packages/app/@component-type-checker/button'.
Loading module as file / folder, candidate module location '/home/src/projects/component-type-checker/packages/app/@component-type-checker/button', target file types: TypeScript, Declaration.
Loading module '@component-type-checker/button' from 'node_modules' folder, target file types: TypeScript, Declaration.
Searching all ancestor node_modules directories for preferred extensions: TypeScript, Declaration.
Directory '/home/src/projects/component-type-checker/node_modules/.pnpm/@component-type-checker+components@0.0.1_@component-type-checker+button@0.0.1/node_modules/@component-type-checker/components/src/node_modules' does not exist, skipping all lookups in it.
Scoped package detected, looking in 'component-type-checker__button'
Directory '/home/src/projects/component-type-checker/node_modules/.pnpm/@component-type-checker+components@0.0.1_@component-type-checker+button@0.0.1/node_modules/@component-type-checker/components/node_modules' does not exist, skipping all lookups in it.
Scoped package detected, looking in 'component-type-checker__button'
Directory '/home/src/projects/component-type-checker/node_modules/.pnpm/@component-type-checker+components@0.0.1_@component-type-checker+button@0.0.1/node_modules/@component-type-checker/node_modules' does not exist, skipping all lookups in it.
Scoped package detected, looking in 'component-type-checker__button'
File '/home/src/projects/component-type-checker/node_modules/.pnpm/@component-type-checker+components@0.0.1_@component-type-checker+button@0.0.1/node_modules/@component-type-checker/button/package.json' exists according to earlier cached lookups.
File '/home/src/projects/component-type-checker/node_modules/.pnpm/@component-type-checker+components@0.0.1_@component-type-checker+button@0.0.1/node_modules/@component-type-checker/button.ts' does not exist.
File '/home/src/projects/component-type-checker/node_modules/.pnpm/@component-type-checker+components@0.0.1_@component-type-checker+button@0.0.1/node_modules/@component-type-checker/button.tsx' does not exist.
File '/home/src/projects/component-type-checker/node_modules/.pnpm/@component-type-checker+components@0.0.1_@component-type-checker+button@0.0.1/node_modules/@component-type-checker/button.d.ts' does not exist.
'package.json' does not have a 'typesVersions' field.
'package.json' does not have a 'typings' field.
'package.json' does not have a 'types' field.
'package.json' has 'main' field './src/index.ts' that references '/home/src/projects/component-type-checker/node_modules/.pnpm/@component-type-checker+components@0.0.1_@component-type-checker+button@0.0.1/node_modules/@component-type-checker/button/src/index.ts'.
File '/home/src/projects/component-type-checker/node_modules/.pnpm/@component-type-checker+components@0.0.1_@component-type-checker+button@0.0.1/node_modules/@component-type-checker/button/src/index.ts' exists - use it as a name resolution result.
'package.json' does not have a 'peerDependencies' field.
Resolving real path for '/home/src/projects/component-type-checker/node_modules/.pnpm/@component-type-checker+components@0.0.1_@component-type-checker+button@0.0.1/node_modules/@component-type-checker/button/src/index.ts', result '/home/src/projects/component-type-checker/node_modules/.pnpm/@component-type-checker+button@0.0.1/node_modules/@component-type-checker/button/src/index.ts'.
======== Module name '@component-type-checker/button' was successfully resolved to '/home/src/projects/component-type-checker/node_modules/.pnpm/@component-type-checker+button@0.0.1/node_modules/@component-type-checker/button/src/index.ts' with Package ID '@component-type-checker/button/src/index.ts@0.0.1'. ========
File '/home/src/projects/component-type-checker/node_modules/.pnpm/@component-type-checker+button@0.0.1/node_modules/@component-type-checker/button/src/package.json' does not exist.
Found 'package.json' at '/home/src/projects/component-type-checker/node_modules/.pnpm/@component-type-checker+button@0.0.1/node_modules/@component-type-checker/button/package.json'.
File '/home/src/projects/component-type-checker/node_modules/.pnpm/@component-type-checker+components@0.0.1_@component-type-checker+button@0.0.2/node_modules/@component-type-checker/components/src/package.json' does not exist.
Found 'package.json' at '/home/src/projects/component-type-checker/node_modules/.pnpm/@component-type-checker+components@0.0.1_@component-type-checker+button@0.0.2/node_modules/@component-type-checker/components/package.json'.
======== Resolving module '@component-type-checker/button' from '/home/src/projects/component-type-checker/node_modules/.pnpm/@component-type-checker+components@0.0.1_@component-type-checker+button@0.0.2/node_modules/@component-type-checker/components/src/index.ts'. ========
Explicitly specified module resolution kind: 'Node10'.
'baseUrl' option is set to '/home/src/projects/component-type-checker/packages/app', using this value to resolve non-relative module name '@component-type-checker/button'.
Resolving module name '@component-type-checker/button' relative to base url '/home/src/projects/component-type-checker/packages/app' - '/home/src/projects/component-type-checker/packages/app/@component-type-checker/button'.
Loading module as file / folder, candidate module location '/home/src/projects/component-type-checker/packages/app/@component-type-checker/button', target file types: TypeScript, Declaration.
Loading module '@component-type-checker/button' from 'node_modules' folder, target file types: TypeScript, Declaration.
Searching all ancestor node_modules directories for preferred extensions: TypeScript, Declaration.
Directory '/home/src/projects/component-type-checker/node_modules/.pnpm/@component-type-checker+components@0.0.1_@component-type-checker+button@0.0.2/node_modules/@component-type-checker/components/src/node_modules' does not exist, skipping all lookups in it.
Scoped package detected, looking in 'component-type-checker__button'
Directory '/home/src/projects/component-type-checker/node_modules/.pnpm/@component-type-checker+components@0.0.1_@component-type-checker+button@0.0.2/node_modules/@component-type-checker/components/node_modules' does not exist, skipping all lookups in it.
Scoped package detected, looking in 'component-type-checker__button'
Directory '/home/src/projects/component-type-checker/node_modules/.pnpm/@component-type-checker+components@0.0.1_@component-type-checker+button@0.0.2/node_modules/@component-type-checker/node_modules' does not exist, skipping all lookups in it.
Scoped package detected, looking in 'component-type-checker__button'
File '/home/src/projects/component-type-checker/node_modules/.pnpm/@component-type-checker+components@0.0.1_@component-type-checker+button@0.0.2/node_modules/@component-type-checker/button/package.json' exists according to earlier cached lookups.
File '/home/src/projects/component-type-checker/node_modules/.pnpm/@component-type-checker+components@0.0.1_@component-type-checker+button@0.0.2/node_modules/@component-type-checker/button.ts' does not exist.
File '/home/src/projects/component-type-checker/node_modules/.pnpm/@component-type-checker+components@0.0.1_@component-type-checker+button@0.0.2/node_modules/@component-type-checker/button.tsx' does not exist.
File '/home/src/projects/component-type-checker/node_modules/.pnpm/@component-type-checker+components@0.0.1_@component-type-checker+button@0.0.2/node_modules/@component-type-checker/button.d.ts' does not exist.
'package.json' does not have a 'typesVersions' field.
'package.json' does not have a 'typings' field.
'package.json' does not have a 'types' field.
'package.json' has 'main' field './src/index.ts' that references '/home/src/projects/component-type-checker/node_modules/.pnpm/@component-type-checker+components@0.0.1_@component-type-checker+button@0.0.2/node_modules/@component-type-checker/button/src/index.ts'.
File '/home/src/projects/component-type-checker/node_modules/.pnpm/@component-type-checker+components@0.0.1_@component-type-checker+button@0.0.2/node_modules/@component-type-checker/button/src/index.ts' exists - use it as a name resolution result.
'package.json' does not have a 'peerDependencies' field.
Resolving real path for '/home/src/projects/component-type-checker/node_modules/.pnpm/@component-type-checker+components@0.0.1_@component-type-checker+button@0.0.2/node_modules/@component-type-checker/button/src/index.ts', result '/home/src/projects/component-type-checker/node_modules/.pnpm/@component-type-checker+button@0.0.2/node_modules/@component-type-checker/button/src/index.ts'.
======== Module name '@component-type-checker/button' was successfully resolved to '/home/src/projects/component-type-checker/node_modules/.pnpm/@component-type-checker+button@0.0.2/node_modules/@component-type-checker/button/src/index.ts' with Package ID '@component-type-checker/button/src/index.ts@0.0.2'. ========
File '/home/src/projects/component-type-checker/node_modules/.pnpm/@component-type-checker+button@0.0.2/node_modules/@component-type-checker/button/src/package.json' does not exist.
Found 'package.json' at '/home/src/projects/component-type-checker/node_modules/.pnpm/@component-type-checker+button@0.0.2/node_modules/@component-type-checker/button/package.json'.
======== Resolving module '@typescript/lib-es5' from '/home/src/projects/component-type-checker/packages/app/__lib_node_modules_lookup_lib.es5.d.ts__.ts'. ========
Explicitly specified module resolution kind: 'Node10'.
Loading module '@typescript/lib-es5' from 'node_modules' folder, target file types: TypeScript, Declaration.
Searching all ancestor node_modules directories for preferred extensions: TypeScript, Declaration.
Directory '/home/src/projects/component-type-checker/packages/app/node_modules/@types' does not exist, skipping all lookups in it.
Scoped package detected, looking in 'typescript__lib-es5'
Directory '/home/src/projects/component-type-checker/packages/node_modules' does not exist, skipping all lookups in it.
Scoped package detected, looking in 'typescript__lib-es5'
Directory '/home/src/projects/component-type-checker/node_modules/@types' does not exist, skipping all lookups in it.
Scoped package detected, looking in 'typescript__lib-es5'
Directory '/home/src/projects/node_modules' does not exist, skipping all lookups in it.
Scoped package detected, looking in 'typescript__lib-es5'
Directory '/home/src/node_modules' does not exist, skipping all lookups in it.
Scoped package detected, looking in 'typescript__lib-es5'
Directory '/home/node_modules' does not exist, skipping all lookups in it.
Scoped package detected, looking in 'typescript__lib-es5'
Directory '/node_modules' does not exist, skipping all lookups in it.
Scoped package detected, looking in 'typescript__lib-es5'
Loading module '@typescript/lib-es5' from 'node_modules' folder, target file types: JavaScript.
Searching all ancestor node_modules directories for fallback extensions: JavaScript.
Directory '/home/src/projects/component-type-checker/packages/node_modules' does not exist, skipping all lookups in it.
Directory '/home/src/projects/node_modules' does not exist, skipping all lookups in it.
Directory '/home/src/node_modules' does not exist, skipping all lookups in it.
Directory '/home/node_modules' does not exist, skipping all lookups in it.
Directory '/node_modules' does not exist, skipping all lookups in it.
======== Module name '@typescript/lib-es5' was not resolved. ========
../../../../../../a/lib/lib.es5.d.ts
  Library 'lib.es5.d.ts' specified in compilerOptions
../../node_modules/.pnpm/@component-type-checker+button@0.0.1/node_modules/@component-type-checker/button/src/index.ts
  Imported via "@component-type-checker/button" from file '../../node_modules/.pnpm/@component-type-checker+components@0.0.1_@component-type-checker+button@0.0.1/node_modules/@component-type-checker/components/src/index.ts' with packageId '@component-type-checker/button/src/index.ts@0.0.1'
../../node_modules/.pnpm/@component-type-checker+components@0.0.1_@component-type-checker+button@0.0.1/node_modules/@component-type-checker/components/src/index.ts
  Imported via "@component-type-checker/components" from file '../sdk/src/index.ts' with packageId '@component-type-checker/components/src/index.ts@0.0.1+@component-type-checker/button@0.0.1'
../sdk/src/index.ts
  Imported via "@component-type-checker/sdk" from file 'src/app.tsx' with packageId '@component-type-checker/sdk1/src/index.ts@0.0.2'
../../node_modules/.pnpm/@component-type-checker+button@0.0.2/node_modules/@component-type-checker/button/src/index.ts
  Imported via "@component-type-checker/button" from file '../../node_modules/.pnpm/@component-type-checker+components@0.0.1_@component-type-checker+button@0.0.2/node_modules/@component-type-checker/components/src/index.ts' with packageId '@component-type-checker/button/src/index.ts@0.0.2'
  Imported via "@component-type-checker/button" from file 'src/app.tsx' with packageId '@component-type-checker/button/src/index.ts@0.0.2'
../../node_modules/.pnpm/@component-type-checker+components@0.0.1_@component-type-checker+button@0.0.2/node_modules/@component-type-checker/components/src/index.ts
  Imported via "@component-type-checker/components" from file 'src/app.tsx' with packageId '@component-type-checker/components/src/index.ts@0.0.1+@component-type-checker/button@0.0.2'
src/app.tsx
  Matched by include pattern 'src' in 'tsconfig.json'


//// [/home/src/projects/component-type-checker/packages/app/dist/app.js]
import { createButton } from "@component-type-checker/button";
var button = createButton();



Program root files: [
  "/home/src/projects/component-type-checker/packages/app/src/app.tsx"
]
Program options: {
  "target": 1,
  "module": 99,
  "lib": [
    "lib.es5.d.ts"
  ],
  "moduleResolution": 2,
  "baseUrl": "/home/src/projects/component-type-checker/packages/app",
  "outDir": "/home/src/projects/component-type-checker/packages/app/dist",
  "traceResolution": true,
  "explainFiles": true,
  "configFilePath": "/home/src/projects/component-type-checker/packages/app/tsconfig.json"
}
Program structureReused: Not
Program files::
/a/lib/lib.es5.d.ts
/home/src/projects/component-type-checker/node_modules/.pnpm/@component-type-checker+button@0.0.1/node_modules/@component-type-checker/button/src/index.ts
/home/src/projects/component-type-checker/node_modules/.pnpm/@component-type-checker+components@0.0.1_@component-type-checker+button@0.0.1/node_modules/@component-type-checker/components/src/index.ts
/home/src/projects/component-type-checker/packages/sdk/src/index.ts
/home/src/projects/component-type-checker/node_modules/.pnpm/@component-type-checker+button@0.0.2/node_modules/@component-type-checker/button/src/index.ts
/home/src/projects/component-type-checker/node_modules/.pnpm/@component-type-checker+components@0.0.1_@component-type-checker+button@0.0.2/node_modules/@component-type-checker/components/src/index.ts
/home/src/projects/component-type-checker/packages/app/src/app.tsx

exitCode:: ExitStatus.Success
