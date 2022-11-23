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
                /// <reference path='c.ts'/>
                

var x = 100
resolvedModules: undefined
resolvedTypeReferenceDirectiveNames: undefined


MissingPaths:: ["lib.d.ts"]



