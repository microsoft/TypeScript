Program Reused:: Not
File: /types/typedefs/index.d.ts


declare var $: number
resolvedModules: undefined
resolvedTypeReferenceDirectiveNames: undefined

File: /a.ts
/// <reference types='typedefs'/>

var x = $
resolvedModules: undefined
resolvedTypeReferenceDirectiveNames: 
typedefs: {
  "primary": true,
  "resolvedFileName": "/types/typedefs/index.d.ts",
  "isExternalLibraryImport": false
}


MissingPaths:: ["lib.d.ts"]




Program Reused:: Completely
File: /types/typedefs/index.d.ts


declare var $: number
resolvedModules: undefined
resolvedTypeReferenceDirectiveNames: undefined

File: /a.ts
/// <reference types='typedefs'/>

var x = 2
resolvedModules: undefined
resolvedTypeReferenceDirectiveNames: 
typedefs: {
  "primary": true,
  "resolvedFileName": "/types/typedefs/index.d.ts",
  "isExternalLibraryImport": false
}


MissingPaths:: ["lib.d.ts"]




Program Reused:: SafeModules
File: /a.ts


var x = 2
resolvedModules: undefined
resolvedTypeReferenceDirectiveNames: undefined


MissingPaths:: ["lib.d.ts"]




Program Reused:: SafeModules
File: /types/typedefs/index.d.ts


declare var $: number
resolvedModules: undefined
resolvedTypeReferenceDirectiveNames: undefined

File: /a.ts
/// <reference types="typedefs"/>
                /// <reference types="typedefs2"/>
                

var x = 2
resolvedModules: undefined
resolvedTypeReferenceDirectiveNames: 
typedefs: {
  "primary": true,
  "resolvedFileName": "/types/typedefs/index.d.ts",
  "isExternalLibraryImport": false
}
typedefs2: undefined


MissingPaths:: ["lib.d.ts"]

/a.ts(2,39): error TS2688: Cannot find type definition file for 'typedefs2'.


