Program Reused:: Not
File: /node_modules/a/node_modules/x/index.d.ts


export default class X { private x: number; }
resolvedModules: undefined
resolvedTypeReferenceDirectiveNames: undefined

File: /node_modules/a/index.d.ts

import X from "x";
export function a(x: X): void;
resolvedModules: 
x: {
  "resolvedFileName": "/node_modules/a/node_modules/x/index.d.ts",
  "extension": ".d.ts",
  "isExternalLibraryImport": true,
  "packageId": {
    "name": "x",
    "subModuleName": "index.d.ts",
    "version": "1.2.3"
  }
}
resolvedTypeReferenceDirectiveNames: undefined

File: /node_modules/b/node_modules/x/index.d.ts


export = class X { private x: number; }
resolvedModules: undefined
resolvedTypeReferenceDirectiveNames: undefined

File: /node_modules/b/index.d.ts

import X from "x";
export const b: X;
resolvedModules: 
x: {
  "resolvedFileName": "/node_modules/b/node_modules/x/index.d.ts",
  "extension": ".d.ts",
  "isExternalLibraryImport": true,
  "packageId": {
    "name": "x",
    "subModuleName": "index.d.ts",
    "version": "1.2.4"
  }
}
resolvedTypeReferenceDirectiveNames: undefined

File: /a.ts

import { a } from "a"; import { b } from "b";
a(b)
resolvedModules: 
a: {
  "resolvedFileName": "/node_modules/a/index.d.ts",
  "extension": ".d.ts",
  "isExternalLibraryImport": true
}
b: {
  "resolvedFileName": "/node_modules/b/index.d.ts",
  "extension": ".d.ts",
  "isExternalLibraryImport": true
}
resolvedTypeReferenceDirectiveNames: undefined


MissingPaths:: ["lib.d.ts"]

/node_modules/b/index.d.ts(2,8): error TS1259: Module '"/node_modules/b/node_modules/x/index"' can only be default-imported using the 'allowSyntheticDefaultImports' flag
/node_modules/b/node_modules/x/index.d.ts(3,16): error TS2714: The expression of an export assignment must be an identifier or qualified name in an ambient context.



Program Reused:: Not
File: /node_modules/a/node_modules/x/index.d.ts


export default class X { private x: number; }
resolvedModules: undefined
resolvedTypeReferenceDirectiveNames: undefined

File: /node_modules/a/index.d.ts

import X from "x";
export function a(x: X): void;
resolvedModules: 
x: {
  "resolvedFileName": "/node_modules/a/node_modules/x/index.d.ts",
  "extension": ".d.ts",
  "isExternalLibraryImport": true,
  "packageId": {
    "name": "x",
    "subModuleName": "index.d.ts",
    "version": "1.2.3"
  }
}
resolvedTypeReferenceDirectiveNames: undefined

File: /node_modules/b/node_modules/x/index.d.ts


export default class X { private x: number; }
resolvedModules: undefined
resolvedTypeReferenceDirectiveNames: undefined

File: /node_modules/b/index.d.ts

import X from "x";
export const b: X;
resolvedModules: 
x: {
  "resolvedFileName": "/node_modules/b/node_modules/x/index.d.ts",
  "extension": ".d.ts",
  "isExternalLibraryImport": true,
  "packageId": {
    "name": "x",
    "subModuleName": "index.d.ts",
    "version": "1.2.3"
  }
}
resolvedTypeReferenceDirectiveNames: undefined

File: /a.ts

import { a } from "a"; import { b } from "b";
a(b)
resolvedModules: 
a: {
  "resolvedFileName": "/node_modules/a/index.d.ts",
  "extension": ".d.ts",
  "isExternalLibraryImport": true
}
b: {
  "resolvedFileName": "/node_modules/b/index.d.ts",
  "extension": ".d.ts",
  "isExternalLibraryImport": true
}
resolvedTypeReferenceDirectiveNames: undefined


MissingPaths:: ["lib.d.ts"]



