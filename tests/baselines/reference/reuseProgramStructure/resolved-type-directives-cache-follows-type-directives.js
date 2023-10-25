Program Reused:: Not
File: /types/typedefs/index.d.ts


declare var $: number

File: /a.ts
/// <reference types='typedefs'/>

var x = $
resolvedTypeReferenceDirectiveNames:
typedefs: {
  "resolvedTypeReferenceDirective": {
    "primary": true,
    "resolvedFileName": "/types/typedefs/index.d.ts",
    "isExternalLibraryImport": false
  },
  "failedLookupLocations": [
    "/types/typedefs.d.ts",
    "/types/typedefs/package.json"
  ]
}


MissingPaths:: [
  "lib.d.ts"
]




Program Reused:: Completely
File: /types/typedefs/index.d.ts


declare var $: number

File: /a.ts
/// <reference types='typedefs'/>

var x = 2
resolvedTypeReferenceDirectiveNames:
typedefs: {
  "resolvedTypeReferenceDirective": {
    "primary": true,
    "resolvedFileName": "/types/typedefs/index.d.ts",
    "isExternalLibraryImport": false
  },
  "failedLookupLocations": [
    "/types/typedefs.d.ts",
    "/types/typedefs/package.json"
  ]
}


MissingPaths:: [
  "lib.d.ts"
]




Program Reused:: SafeModules
File: /a.ts


var x = 2


MissingPaths:: [
  "lib.d.ts"
]




Program Reused:: SafeModules
File: /types/typedefs/index.d.ts


declare var $: number

File: /a.ts
/// <reference types="typedefs"/>
                /// <reference types="typedefs2"/>
                

var x = 2
resolvedTypeReferenceDirectiveNames:
typedefs: {
  "resolvedTypeReferenceDirective": {
    "primary": true,
    "resolvedFileName": "/types/typedefs/index.d.ts",
    "isExternalLibraryImport": false
  },
  "failedLookupLocations": [
    "/types/typedefs.d.ts",
    "/types/typedefs/package.json"
  ]
}
typedefs2: {
  "failedLookupLocations": [
    "/types/typedefs2.d.ts",
    "/types/typedefs2/package.json",
    "/types/typedefs2/index.d.ts",
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

/a.ts(2,39): error TS2688: Cannot find type definition file for 'typedefs2'.


