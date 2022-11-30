Program Reused:: Not
File: c.ts


var z = 1;
resolvedModules: undefined
resolvedTypeReferenceDirectiveNames: undefined

File: b.ts
/// <reference path='c.ts'/>

var y = 2
resolvedModules: undefined
resolvedTypeReferenceDirectiveNames: undefined

File: a.ts

/// <reference path='b.ts'/>
/// <reference path='non-existing-file.ts'/>
/// <reference types="typerefs" />


var x = 1
resolvedModules: undefined
resolvedTypeReferenceDirectiveNames: 
typerefs: undefined


MissingPaths:: ["non-existing-file.ts","lib.d.ts"]

a.ts(3,22): error TS6053: File 'non-existing-file.ts' not found.
a.ts(4,23): error TS2688: Cannot find type definition file for 'typerefs'.



Program Reused:: Completely
File: c.ts


var z = 1;
resolvedModules: undefined
resolvedTypeReferenceDirectiveNames: undefined

File: b.ts
/// <reference path='c.ts'/>

var y = 2
resolvedModules: undefined
resolvedTypeReferenceDirectiveNames: undefined

File: a.ts

/// <reference path='b.ts'/>
/// <reference path='non-existing-file.ts'/>
/// <reference types="typerefs" />


var x = 100
resolvedModules: undefined
resolvedTypeReferenceDirectiveNames: 
typerefs: undefined


MissingPaths:: ["non-existing-file.ts","lib.d.ts"]

a.ts(3,22): error TS6053: File 'non-existing-file.ts' not found.
a.ts(4,23): error TS2688: Cannot find type definition file for 'typerefs'.


