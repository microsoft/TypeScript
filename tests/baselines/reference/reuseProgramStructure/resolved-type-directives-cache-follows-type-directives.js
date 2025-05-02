Program 1 Reused:: Not
File: /home/src/workspaces/project/types/typedefs/index.d.ts


declare var $: number

File: /home/src/workspaces/project/a.ts
/// <reference types='typedefs'/>

var x = $
resolvedTypeReferenceDirectiveNames:
typedefs: {
  "resolvedTypeReferenceDirective": {
    "primary": true,
    "resolvedFileName": "/home/src/workspaces/project/types/typedefs/index.d.ts",
    "isExternalLibraryImport": false
  },
  "failedLookupLocations": [
    "/home/src/workspaces/project/types/typedefs.d.ts",
    "/home/src/workspaces/project/types/typedefs/package.json"
  ]
}


MissingPaths:: [
  "lib.d.ts"
]




Program 2 Reused:: Completely
File: /home/src/workspaces/project/types/typedefs/index.d.ts


declare var $: number

File: /home/src/workspaces/project/a.ts
/// <reference types='typedefs'/>

var x = 2
resolvedTypeReferenceDirectiveNames:
typedefs: {
  "resolvedTypeReferenceDirective": {
    "primary": true,
    "resolvedFileName": "/home/src/workspaces/project/types/typedefs/index.d.ts",
    "isExternalLibraryImport": false
  },
  "failedLookupLocations": [
    "/home/src/workspaces/project/types/typedefs.d.ts",
    "/home/src/workspaces/project/types/typedefs/package.json"
  ]
}


MissingPaths:: [
  "lib.d.ts"
]




Program 3 Reused:: SafeModules
File: /home/src/workspaces/project/a.ts


var x = 2


MissingPaths:: [
  "lib.d.ts"
]




Program 4 Reused:: SafeModules
File: /home/src/workspaces/project/types/typedefs/index.d.ts


declare var $: number

File: /home/src/workspaces/project/a.ts
/// <reference types="typedefs"/>
                /// <reference types="typedefs2"/>
                

var x = 2
resolvedTypeReferenceDirectiveNames:
typedefs: {
  "resolvedTypeReferenceDirective": {
    "primary": true,
    "resolvedFileName": "/home/src/workspaces/project/types/typedefs/index.d.ts",
    "isExternalLibraryImport": false
  },
  "failedLookupLocations": [
    "/home/src/workspaces/project/types/typedefs.d.ts",
    "/home/src/workspaces/project/types/typedefs/package.json"
  ]
}
typedefs2: {
  "failedLookupLocations": [
    "/home/src/workspaces/project/types/typedefs2.d.ts",
    "/home/src/workspaces/project/types/typedefs2/package.json",
    "/home/src/workspaces/project/types/typedefs2/index.d.ts",
    "/home/src/workspaces/project/node_modules/typedefs2/package.json",
    "/home/src/workspaces/project/node_modules/typedefs2.d.ts",
    "/home/src/workspaces/project/node_modules/typedefs2/index.d.ts",
    "/home/src/workspaces/project/node_modules/@types/typedefs2/package.json",
    "/home/src/workspaces/project/node_modules/@types/typedefs2.d.ts",
    "/home/src/workspaces/project/node_modules/@types/typedefs2/index.d.ts",
    "/home/src/workspaces/node_modules/typedefs2/package.json",
    "/home/src/workspaces/node_modules/typedefs2.d.ts",
    "/home/src/workspaces/node_modules/typedefs2/index.d.ts",
    "/home/src/workspaces/node_modules/@types/typedefs2/package.json",
    "/home/src/workspaces/node_modules/@types/typedefs2.d.ts",
    "/home/src/workspaces/node_modules/@types/typedefs2/index.d.ts",
    "/home/src/node_modules/typedefs2/package.json",
    "/home/src/node_modules/typedefs2.d.ts",
    "/home/src/node_modules/typedefs2/index.d.ts",
    "/home/src/node_modules/@types/typedefs2/package.json",
    "/home/src/node_modules/@types/typedefs2.d.ts",
    "/home/src/node_modules/@types/typedefs2/index.d.ts",
    "/home/node_modules/typedefs2/package.json",
    "/home/node_modules/typedefs2.d.ts",
    "/home/node_modules/typedefs2/index.d.ts",
    "/home/node_modules/@types/typedefs2/package.json",
    "/home/node_modules/@types/typedefs2.d.ts",
    "/home/node_modules/@types/typedefs2/index.d.ts",
    "/node_modules/typedefs2/package.json",
    "/node_modules/typedefs2.d.ts",
    "/node_modules/typedefs2/index.d.ts",
    "/node_modules/@types/typedefs2/package.json",
    "/node_modules/@types/typedefs2.d.ts",
    "/node_modules/@types/typedefs2/index.d.ts"
  ]
}


MissingPaths:: [
  "lib.d.ts"
]

home/src/workspaces/project/a.ts(2,39): error TS2688: Cannot find type definition file for 'typedefs2'.


