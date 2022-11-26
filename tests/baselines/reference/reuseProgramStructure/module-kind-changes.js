Program Reused:: Not
File: c.ts

import x from 'b'
var z = 1;
resolvedModules: 
b: undefined
resolvedTypeReferenceDirectiveNames: undefined

File: b.ts
/// <reference path='c.ts'/>

var y = 2
resolvedModules: undefined
resolvedTypeReferenceDirectiveNames: undefined

File: a.ts

/// <reference path='b.ts'/>
/// <reference path='non-existing-file.ts'/>
/// <reference types="typerefs1" />

var x = 100
resolvedModules: undefined
resolvedTypeReferenceDirectiveNames: 
typerefs1: undefined


MissingPaths:: ["non-existing-file.ts","lib.d.ts"]

a.ts(3,22): error TS6053: File 'non-existing-file.ts' not found.
a.ts(4,23): error TS2688: Cannot find type definition file for 'typerefs1'.
c.ts(2,15): error TS2307: Cannot find module 'b' or its corresponding type declarations.



Program Reused:: Not
File: c.ts

import x from 'b'
var z = 1;
resolvedModules: 
b: {"resolvedFileName":"b.ts","extension":".ts","isExternalLibraryImport":false}
resolvedTypeReferenceDirectiveNames: undefined

File: b.ts
/// <reference path='c.ts'/>

var y = 2
resolvedModules: undefined
resolvedTypeReferenceDirectiveNames: undefined

File: a.ts

/// <reference path='b.ts'/>
/// <reference path='non-existing-file.ts'/>
/// <reference types="typerefs1" />

var x = 100
resolvedModules: undefined
resolvedTypeReferenceDirectiveNames: 
typerefs1: undefined


MissingPaths:: ["non-existing-file.ts","lib.d.ts"]

a.ts(3,22): error TS6053: File 'non-existing-file.ts' not found.
a.ts(4,23): error TS2688: Cannot find type definition file for 'typerefs1'.
c.ts(2,15): error TS2306: File 'b.ts' is not a module.


