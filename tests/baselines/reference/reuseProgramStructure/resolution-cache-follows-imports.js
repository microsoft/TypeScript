Program 1 Reused:: Not
File: a.ts

import {_} from 'b'
var x = 1
resolvedModules:
b: esnext: {
  "failedLookupLocations": [
    "/package.json",
    "/node_modules/b/package.json",
    "/node_modules/b.ts",
    "/node_modules/b.tsx",
    "/node_modules/b.d.ts",
    "/node_modules/b/index.ts",
    "/node_modules/b/index.tsx",
    "/node_modules/b/index.d.ts",
    "/node_modules/@types/b/package.json",
    "/node_modules/@types/b.d.ts",
    "/node_modules/@types/b/index.d.ts",
    "/node_modules/b/package.json",
    "/node_modules/b.js",
    "/node_modules/b.jsx",
    "/node_modules/b/index.js",
    "/node_modules/b/index.jsx"
  ]
}


MissingPaths:: []

a.ts(2,17): error TS2307: Cannot find module 'b' or its corresponding type declarations.



Program 2 Reused:: Completely
File: a.ts

import {_} from 'b'
var x = 2
resolvedModules:
b: esnext: {
  "failedLookupLocations": [
    "/package.json",
    "/node_modules/b/package.json",
    "/node_modules/b.ts",
    "/node_modules/b.tsx",
    "/node_modules/b.d.ts",
    "/node_modules/b/index.ts",
    "/node_modules/b/index.tsx",
    "/node_modules/b/index.d.ts",
    "/node_modules/@types/b/package.json",
    "/node_modules/@types/b.d.ts",
    "/node_modules/@types/b/index.d.ts",
    "/node_modules/b/package.json",
    "/node_modules/b.js",
    "/node_modules/b.jsx",
    "/node_modules/b/index.js",
    "/node_modules/b/index.jsx"
  ]
}


MissingPaths:: []

a.ts(2,17): error TS2307: Cannot find module 'b' or its corresponding type declarations.



Program 3 Reused:: SafeModules
File: a.ts


var x = 2


MissingPaths:: []




Program 4 Reused:: SafeModules
File: a.ts

import x from 'b'
                import y from 'c'
                
var x = 2
resolvedModules:
b: esnext: {
  "failedLookupLocations": [
    "/package.json",
    "/node_modules/b/package.json",
    "/node_modules/b.ts",
    "/node_modules/b.tsx",
    "/node_modules/b.d.ts",
    "/node_modules/b/index.ts",
    "/node_modules/b/index.tsx",
    "/node_modules/b/index.d.ts",
    "/node_modules/@types/b/package.json",
    "/node_modules/@types/b.d.ts",
    "/node_modules/@types/b/index.d.ts",
    "/node_modules/b/package.json",
    "/node_modules/b.js",
    "/node_modules/b.jsx",
    "/node_modules/b/index.js",
    "/node_modules/b/index.jsx"
  ]
}
c: esnext: {
  "failedLookupLocations": [
    "/package.json",
    "/node_modules/c/package.json",
    "/node_modules/c.ts",
    "/node_modules/c.tsx",
    "/node_modules/c.d.ts",
    "/node_modules/c/index.ts",
    "/node_modules/c/index.tsx",
    "/node_modules/c/index.d.ts",
    "/node_modules/@types/c/package.json",
    "/node_modules/@types/c.d.ts",
    "/node_modules/@types/c/index.d.ts",
    "/node_modules/c/package.json",
    "/node_modules/c.js",
    "/node_modules/c.jsx",
    "/node_modules/c/index.js",
    "/node_modules/c/index.jsx"
  ]
}


MissingPaths:: []

a.ts(2,15): error TS2307: Cannot find module 'b' or its corresponding type declarations.
a.ts(3,31): error TS2307: Cannot find module 'c' or its corresponding type declarations.


