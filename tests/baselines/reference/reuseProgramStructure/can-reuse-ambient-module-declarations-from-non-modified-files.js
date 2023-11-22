Program Reused:: Not
File: /a/b/app.ts

import * as fs from 'fs'

resolvedModules:
fs: {
  "failedLookupLocations": [
    "/a/b/fs.ts",
    "/a/b/fs.tsx",
    "/a/b/fs.d.ts",
    "/a/fs.ts",
    "/a/fs.tsx",
    "/a/fs.d.ts",
    "/fs.ts",
    "/fs.tsx",
    "/fs.d.ts",
    "/a/b/node_modules/@types/fs/package.json",
    "/a/b/node_modules/@types/fs.d.ts",
    "/a/b/node_modules/@types/fs/index.d.ts",
    "/a/node_modules/@types/fs/package.json",
    "/a/node_modules/@types/fs.d.ts",
    "/a/node_modules/@types/fs/index.d.ts",
    "/node_modules/@types/fs/package.json",
    "/node_modules/@types/fs.d.ts",
    "/node_modules/@types/fs/index.d.ts",
    "/a/b/fs.js",
    "/a/b/fs.jsx",
    "/a/fs.js",
    "/a/fs.jsx",
    "/fs.js",
    "/fs.jsx"
  ]
}

File: /a/b/node.d.ts


declare module 'fs' {}

======== Resolving module 'fs' from '/a/b/app.ts'. ========
Module resolution kind is not specified, using 'Classic'.
File '/a/b/fs.ts' does not exist.
File '/a/b/fs.tsx' does not exist.
File '/a/b/fs.d.ts' does not exist.
File '/a/fs.ts' does not exist.
File '/a/fs.tsx' does not exist.
File '/a/fs.d.ts' does not exist.
File '/fs.ts' does not exist.
File '/fs.tsx' does not exist.
File '/fs.d.ts' does not exist.
Searching all ancestor node_modules directories for preferred extensions: Declaration.
File '/a/b/node_modules/@types/fs/package.json' does not exist.
File '/a/b/node_modules/@types/fs.d.ts' does not exist.
File '/a/b/node_modules/@types/fs/index.d.ts' does not exist.
File '/a/node_modules/@types/fs/package.json' does not exist.
File '/a/node_modules/@types/fs.d.ts' does not exist.
File '/a/node_modules/@types/fs/index.d.ts' does not exist.
File '/node_modules/@types/fs/package.json' does not exist.
File '/node_modules/@types/fs.d.ts' does not exist.
File '/node_modules/@types/fs/index.d.ts' does not exist.
File '/a/b/fs.js' does not exist.
File '/a/b/fs.jsx' does not exist.
File '/a/fs.js' does not exist.
File '/a/fs.jsx' does not exist.
File '/fs.js' does not exist.
File '/fs.jsx' does not exist.
======== Module name 'fs' was not resolved. ========

MissingPaths:: [
  "lib.d.ts"
]




Program Reused:: Completely
File: /a/b/app.ts

import * as fs from 'fs'
var x = 1;
resolvedModules:
fs: {
  "failedLookupLocations": [
    "/a/b/fs.ts",
    "/a/b/fs.tsx",
    "/a/b/fs.d.ts",
    "/a/fs.ts",
    "/a/fs.tsx",
    "/a/fs.d.ts",
    "/fs.ts",
    "/fs.tsx",
    "/fs.d.ts",
    "/a/b/node_modules/@types/fs/package.json",
    "/a/b/node_modules/@types/fs.d.ts",
    "/a/b/node_modules/@types/fs/index.d.ts",
    "/a/node_modules/@types/fs/package.json",
    "/a/node_modules/@types/fs.d.ts",
    "/a/node_modules/@types/fs/index.d.ts",
    "/node_modules/@types/fs/package.json",
    "/node_modules/@types/fs.d.ts",
    "/node_modules/@types/fs/index.d.ts",
    "/a/b/fs.js",
    "/a/b/fs.jsx",
    "/a/fs.js",
    "/a/fs.jsx",
    "/fs.js",
    "/fs.jsx"
  ]
}

File: /a/b/node.d.ts


declare module 'fs' {}

Module 'fs' was resolved as ambient module declared in '/a/b/node.d.ts' since this file was not modified.

MissingPaths:: [
  "lib.d.ts"
]




Program Reused:: Completely
File: /a/b/app.ts

import * as fs from 'fs'
var y = 1;
resolvedModules:
fs: {
  "failedLookupLocations": [
    "/a/b/fs.ts",
    "/a/b/fs.tsx",
    "/a/b/fs.d.ts",
    "/a/fs.ts",
    "/a/fs.tsx",
    "/a/fs.d.ts",
    "/fs.ts",
    "/fs.tsx",
    "/fs.d.ts",
    "/a/b/node_modules/@types/fs/package.json",
    "/a/b/node_modules/@types/fs.d.ts",
    "/a/b/node_modules/@types/fs/index.d.ts",
    "/a/node_modules/@types/fs/package.json",
    "/a/node_modules/@types/fs.d.ts",
    "/a/node_modules/@types/fs/index.d.ts",
    "/node_modules/@types/fs/package.json",
    "/node_modules/@types/fs.d.ts",
    "/node_modules/@types/fs/index.d.ts",
    "/a/b/fs.js",
    "/a/b/fs.jsx",
    "/a/fs.js",
    "/a/fs.jsx",
    "/fs.js",
    "/fs.jsx"
  ]
}

File: /a/b/node.d.ts


declare var process: any

======== Resolving module 'fs' from '/a/b/app.ts'. ========
Module resolution kind is not specified, using 'Classic'.
File '/a/b/fs.ts' does not exist.
File '/a/b/fs.tsx' does not exist.
File '/a/b/fs.d.ts' does not exist.
File '/a/fs.ts' does not exist.
File '/a/fs.tsx' does not exist.
File '/a/fs.d.ts' does not exist.
File '/fs.ts' does not exist.
File '/fs.tsx' does not exist.
File '/fs.d.ts' does not exist.
Searching all ancestor node_modules directories for preferred extensions: Declaration.
File '/a/b/node_modules/@types/fs/package.json' does not exist.
File '/a/b/node_modules/@types/fs.d.ts' does not exist.
File '/a/b/node_modules/@types/fs/index.d.ts' does not exist.
File '/a/node_modules/@types/fs/package.json' does not exist.
File '/a/node_modules/@types/fs.d.ts' does not exist.
File '/a/node_modules/@types/fs/index.d.ts' does not exist.
File '/node_modules/@types/fs/package.json' does not exist.
File '/node_modules/@types/fs.d.ts' does not exist.
File '/node_modules/@types/fs/index.d.ts' does not exist.
File '/a/b/fs.js' does not exist.
File '/a/b/fs.jsx' does not exist.
File '/a/fs.js' does not exist.
File '/a/fs.jsx' does not exist.
File '/fs.js' does not exist.
File '/fs.jsx' does not exist.
======== Module name 'fs' was not resolved. ========

MissingPaths:: [
  "lib.d.ts"
]

/a/b/app.ts(2,21): error TS2792: Cannot find module 'fs'. Did you mean to set the 'moduleResolution' option to 'nodenext', or to add aliases to the 'paths' option?


