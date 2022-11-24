Program Reused:: Not
File: /node_modules/b/internal.d.ts


export const b = 1;
resolvedModules: undefined
resolvedTypeReferenceDirectiveNames: undefined

File: /node_modules/b/index.d.ts

export * from './internal';

resolvedModules: 
./internal: {"resolvedFileName":"/node_modules/b/internal.d.ts","extension":".d.ts","isExternalLibraryImport":true,"packageId":{"name":"b","subModuleName":"internal.d.ts","version":"1.2.3"}}
resolvedTypeReferenceDirectiveNames: undefined

File: /a.ts

import {b} from 'b'
var a = b;
resolvedModules: 
b: {"resolvedFileName":"/node_modules/b/index.d.ts","extension":".d.ts","isExternalLibraryImport":true,"packageId":{"name":"b","subModuleName":"index.d.ts","version":"1.2.3"}}
resolvedTypeReferenceDirectiveNames: undefined


MissingPaths:: ["lib.d.ts"]




Program Reused:: Completely
File: /node_modules/b/internal.d.ts


export const b = 2;
resolvedModules: undefined
resolvedTypeReferenceDirectiveNames: undefined

File: /node_modules/b/index.d.ts

export * from './internal';

resolvedModules: 
./internal: {"resolvedFileName":"/node_modules/b/internal.d.ts","extension":".d.ts","isExternalLibraryImport":true,"packageId":{"name":"b","subModuleName":"internal.d.ts","version":"1.2.3"}}
resolvedTypeReferenceDirectiveNames: undefined

File: /a.ts

import {b} from 'b'
var a = b;
resolvedModules: 
b: {"resolvedFileName":"/node_modules/b/index.d.ts","extension":".d.ts","isExternalLibraryImport":true,"packageId":{"name":"b","subModuleName":"index.d.ts","version":"1.2.3"}}
resolvedTypeReferenceDirectiveNames: undefined


MissingPaths:: ["lib.d.ts"]



