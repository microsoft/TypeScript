Program Reused:: Not
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
    "node_modules/@types/typerefs/package.json",
    "node_modules/@types/typerefs/index.d.ts",
    "node_modules/typerefs/package.json",
    "node_modules/typerefs.d.ts",
    "node_modules/typerefs/index.d.ts",
    "node_modules/@types/typerefs/package.json",
    "node_modules/@types/typerefs.d.ts",
    "node_modules/@types/typerefs/index.d.ts"
  ]
}


MissingPaths:: [
  "non-existing-file.ts",
  "lib.d.ts"
]

a.ts(3,22): error TS6053: File 'non-existing-file.ts' not found.
a.ts(4,23): error TS2688: Cannot find type definition file for 'typerefs'.



Program Reused:: Completely
File: c.ts


var z = 1;

File: b.ts
/// <reference path='c.ts'/>

var y = 2

File: a.ts

/// <reference path='b.ts'/>
/// <reference path='non-existing-file.ts'/>
/// <reference types="typerefs" />


var x = 100
resolvedTypeReferenceDirectiveNames:
typerefs: {
  "failedLookupLocations": [
    "node_modules/@types/typerefs/package.json",
    "node_modules/@types/typerefs/index.d.ts",
    "node_modules/typerefs/package.json",
    "node_modules/typerefs.d.ts",
    "node_modules/typerefs/index.d.ts",
    "node_modules/@types/typerefs/package.json",
    "node_modules/@types/typerefs.d.ts",
    "node_modules/@types/typerefs/index.d.ts"
  ]
}


MissingPaths:: [
  "non-existing-file.ts",
  "lib.d.ts"
]

a.ts(3,22): error TS6053: File 'non-existing-file.ts' not found.
a.ts(4,23): error TS2688: Cannot find type definition file for 'typerefs'.


