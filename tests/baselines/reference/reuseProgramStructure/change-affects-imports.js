Program 1 Reused:: Not
File: c.ts


var z = 1;

File: b.ts
/// <reference path='c.ts'/>

var y = 2

File: a.ts

/// <reference path='b.ts'/>
/// <reference path='non-existing-file.ts'/>
/// <reference types="typerefs" />


var x = 1
resolvedTypeReferenceDirectiveNames:
typerefs: {
  "failedLookupLocations": [
    "/node_modules/@types/typerefs/package.json",
    "/node_modules/@types/typerefs/index.d.ts",
    "/node_modules/typerefs/package.json",
    "/node_modules/typerefs.d.ts",
    "/node_modules/typerefs/index.d.ts",
    "/node_modules/@types/typerefs/package.json",
    "/node_modules/@types/typerefs.d.ts",
    "/node_modules/@types/typerefs/index.d.ts"
  ]
}


MissingPaths:: [
  "non-existing-file.ts"
]

a.ts(3,22): error TS6053: File 'non-existing-file.ts' not found.
a.ts(4,23): error TS2688: Cannot find type definition file for 'typerefs'.



Program 2 Reused:: SafeModules
File: c.ts

import x from 'b'
var z = 1;
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

File: b.ts
/// <reference path='c.ts'/>

var y = 2

File: a.ts

/// <reference path='b.ts'/>
/// <reference path='non-existing-file.ts'/>
/// <reference types="typerefs" />


var x = 1
resolvedTypeReferenceDirectiveNames:
typerefs: {
  "failedLookupLocations": [
    "/node_modules/@types/typerefs/package.json",
    "/node_modules/@types/typerefs/index.d.ts",
    "/node_modules/typerefs/package.json",
    "/node_modules/typerefs.d.ts",
    "/node_modules/typerefs/index.d.ts",
    "/node_modules/@types/typerefs/package.json",
    "/node_modules/@types/typerefs.d.ts",
    "/node_modules/@types/typerefs/index.d.ts"
  ]
}


MissingPaths:: [
  "non-existing-file.ts"
]

a.ts(3,22): error TS6053: File 'non-existing-file.ts' not found.
a.ts(4,23): error TS2688: Cannot find type definition file for 'typerefs'.
c.ts(2,15): error TS2307: Cannot find module 'b' or its corresponding type declarations.


