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

a.ts(2,22): error TS6059: File 'b.ts' is not under 'rootDir' '/a/b'. 'rootDir' is expected to contain all source files.
a.ts(3,22): error TS6053: File 'non-existing-file.ts' not found.
a.ts(4,23): error TS2688: Cannot find type definition file for 'typerefs1'.
b.ts(1,22): error TS6059: File 'c.ts' is not under 'rootDir' '/a/b'. 'rootDir' is expected to contain all source files.
c.ts(2,15): error TS2307: Cannot find module 'b' or its corresponding type declarations.



Program Reused:: Completely
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

a.ts(2,22): error TS6059: File 'b.ts' is not under 'rootDir' '/a/c'. 'rootDir' is expected to contain all source files.
a.ts(3,22): error TS6053: File 'non-existing-file.ts' not found.
a.ts(4,23): error TS2688: Cannot find type definition file for 'typerefs1'.
b.ts(1,22): error TS6059: File 'c.ts' is not under 'rootDir' '/a/c'. 'rootDir' is expected to contain all source files.
c.ts(2,15): error TS2307: Cannot find module 'b' or its corresponding type declarations.


