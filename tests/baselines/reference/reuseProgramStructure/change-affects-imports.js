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
                /// <reference path='c.ts'/>
                

var x = 100
resolvedModules: undefined
resolvedTypeReferenceDirectiveNames: undefined


MissingPaths:: ["lib.d.ts"]




Program Reused:: SafeModules
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
                /// <reference path='c.ts'/>
                

var x = 100
resolvedModules: undefined
resolvedTypeReferenceDirectiveNames: undefined


MissingPaths:: ["lib.d.ts"]

c.ts(2,15): error TS2306: File 'b.ts' is not a module.


