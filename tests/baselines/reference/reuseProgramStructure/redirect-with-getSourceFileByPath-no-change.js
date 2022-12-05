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
  },
  "resolvedUsingTsExtension": false
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
  },
  "resolvedUsingTsExtension": false
}
resolvedTypeReferenceDirectiveNames: undefined

File: /a.ts

import { a } from "a"; import { b } from "b";
a(b)
resolvedModules: 
a: {
  "resolvedFileName": "/node_modules/a/index.d.ts",
  "extension": ".d.ts",
  "isExternalLibraryImport": true,
  "resolvedUsingTsExtension": false
}
b: {
  "resolvedFileName": "/node_modules/b/index.d.ts",
  "extension": ".d.ts",
  "isExternalLibraryImport": true,
  "resolvedUsingTsExtension": false
}
resolvedTypeReferenceDirectiveNames: undefined


MissingPaths:: ["lib.d.ts"]




Program Reused:: Completely
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
  },
  "resolvedUsingTsExtension": false
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
  },
  "resolvedUsingTsExtension": false
}
resolvedTypeReferenceDirectiveNames: undefined

File: /a.ts

import { a } from "a"; import { b } from "b";
const x = 1;
resolvedModules: 
a: {
  "resolvedFileName": "/node_modules/a/index.d.ts",
  "extension": ".d.ts",
  "isExternalLibraryImport": true,
  "resolvedUsingTsExtension": false
}
b: {
  "resolvedFileName": "/node_modules/b/index.d.ts",
  "extension": ".d.ts",
  "isExternalLibraryImport": true,
  "resolvedUsingTsExtension": false
}
resolvedTypeReferenceDirectiveNames: undefined


MissingPaths:: ["lib.d.ts"]



