Program Reused:: Not
File: file1.ts

import * as a from "a";
const myX: number = a.x;
resolvedModules:
a: {
  "failedLookupLocations": [
    "node_modules/a/package.json",
    "node_modules/a.ts",
    "node_modules/a.tsx",
    "node_modules/a.d.ts",
    "node_modules/a/index.ts",
    "node_modules/a/index.tsx",
    "node_modules/a/index.d.ts",
    "node_modules/@types/a/package.json",
    "node_modules/@types/a.d.ts",
    "node_modules/@types/a/index.d.ts",
    "node_modules/a/package.json",
    "node_modules/a.js",
    "node_modules/a.jsx",
    "node_modules/a/index.js",
    "node_modules/a/index.jsx"
  ]
}

File: file2.ts




======== Resolving module 'a' from 'file1.ts'. ========
Explicitly specified module resolution kind: 'Node10'.
Loading module 'a' from 'node_modules' folder, target file types: TypeScript, Declaration.
Searching all ancestor node_modules directories for preferred extensions: TypeScript, Declaration.
File 'node_modules/a/package.json' does not exist.
File 'node_modules/a.ts' does not exist.
File 'node_modules/a.tsx' does not exist.
File 'node_modules/a.d.ts' does not exist.
File 'node_modules/a/index.ts' does not exist.
File 'node_modules/a/index.tsx' does not exist.
File 'node_modules/a/index.d.ts' does not exist.
File 'node_modules/@types/a/package.json' does not exist.
File 'node_modules/@types/a.d.ts' does not exist.
File 'node_modules/@types/a/index.d.ts' does not exist.
Loading module 'a' from 'node_modules' folder, target file types: JavaScript.
Searching all ancestor node_modules directories for fallback extensions: JavaScript.
File 'node_modules/a/package.json' does not exist according to earlier cached lookups.
File 'node_modules/a.js' does not exist.
File 'node_modules/a.jsx' does not exist.
File 'node_modules/a/index.js' does not exist.
File 'node_modules/a/index.jsx' does not exist.
======== Module name 'a' was not resolved. ========

MissingPaths:: [
  "lib.d.ts"
]

file1.ts(2,20): error TS2307: Cannot find module 'a' or its corresponding type declarations.



Program Reused:: SafeModules
File: node_modules/a/index.d.ts

export declare let x: number;


File: file1.ts

import * as a from "a";
const myX: number = a.x;
resolvedModules:
a: {
  "resolvedModule": {
    "resolvedFileName": "node_modules/a/index.d.ts",
    "extension": ".d.ts",
    "isExternalLibraryImport": true,
    "resolvedUsingTsExtension": false
  },
  "failedLookupLocations": [
    "node_modules/a/package.json",
    "node_modules/a.ts",
    "node_modules/a.tsx",
    "node_modules/a.d.ts",
    "node_modules/a/index.ts",
    "node_modules/a/index.tsx"
  ]
}

File: file2.ts
/// <reference no-default-lib="true"/>



======== Resolving module 'a' from 'file1.ts'. ========
Explicitly specified module resolution kind: 'Node10'.
Loading module 'a' from 'node_modules' folder, target file types: TypeScript, Declaration.
Searching all ancestor node_modules directories for preferred extensions: TypeScript, Declaration.
File 'node_modules/a/package.json' does not exist.
File 'node_modules/a.ts' does not exist.
File 'node_modules/a.tsx' does not exist.
File 'node_modules/a.d.ts' does not exist.
File 'node_modules/a/index.ts' does not exist.
File 'node_modules/a/index.tsx' does not exist.
File 'node_modules/a/index.d.ts' exists - use it as a name resolution result.
======== Module name 'a' was successfully resolved to 'node_modules/a/index.d.ts'. ========

MissingPaths:: []



