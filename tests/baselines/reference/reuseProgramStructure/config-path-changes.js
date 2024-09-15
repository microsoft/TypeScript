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
    "/home/src/workspaces/project/a/b/node_modules/@types/typerefs/package.json",
    "/home/src/workspaces/project/a/b/node_modules/@types/typerefs/index.d.ts",
    "/home/src/workspaces/project/a/node_modules/@types/typerefs/package.json",
    "/home/src/workspaces/project/a/node_modules/@types/typerefs/index.d.ts",
    "/home/src/workspaces/project/node_modules/@types/typerefs/package.json",
    "/home/src/workspaces/project/node_modules/@types/typerefs/index.d.ts",
    "/home/src/workspaces/node_modules/@types/typerefs/package.json",
    "/home/src/workspaces/node_modules/@types/typerefs/index.d.ts",
    "/home/src/node_modules/@types/typerefs/package.json",
    "/home/src/node_modules/@types/typerefs/index.d.ts",
    "/home/node_modules/@types/typerefs/package.json",
    "/home/node_modules/@types/typerefs/index.d.ts",
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
  "non-existing-file.ts",
  "lib.d.ts"
]

a.ts(3,22): error TS6053: File 'non-existing-file.ts' not found.
a.ts(4,23): error TS2688: Cannot find type definition file for 'typerefs'.



Program 2 Reused:: Not
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
    "/home/src/workspaces/project/a/c/node_modules/@types/typerefs/package.json",
    "/home/src/workspaces/project/a/c/node_modules/@types/typerefs/index.d.ts",
    "/home/src/workspaces/project/a/node_modules/@types/typerefs/package.json",
    "/home/src/workspaces/project/a/node_modules/@types/typerefs/index.d.ts",
    "/home/src/workspaces/project/node_modules/@types/typerefs/package.json",
    "/home/src/workspaces/project/node_modules/@types/typerefs/index.d.ts",
    "/home/src/workspaces/node_modules/@types/typerefs/package.json",
    "/home/src/workspaces/node_modules/@types/typerefs/index.d.ts",
    "/home/src/node_modules/@types/typerefs/package.json",
    "/home/src/node_modules/@types/typerefs/index.d.ts",
    "/home/node_modules/@types/typerefs/package.json",
    "/home/node_modules/@types/typerefs/index.d.ts",
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
  "non-existing-file.ts",
  "lib.d.ts"
]

a.ts(3,22): error TS6053: File 'non-existing-file.ts' not found.
a.ts(4,23): error TS2688: Cannot find type definition file for 'typerefs'.


