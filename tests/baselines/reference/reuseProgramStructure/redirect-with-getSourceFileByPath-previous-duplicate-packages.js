Program 1 Reused:: Not
File: /home/src/workspaces/project/node_modules/a/node_modules/x/index.d.ts


export default class X { private x: number; }

File: /home/src/workspaces/project/node_modules/a/index.d.ts

import X from "x";
export function a(x: X): void;
resolvedModules:
x: {
  "resolvedModule": {
    "resolvedFileName": "/home/src/workspaces/project/node_modules/a/node_modules/x/index.d.ts",
    "extension": ".d.ts",
    "isExternalLibraryImport": true,
    "packageId": {
      "name": "x",
      "subModuleName": "index.d.ts",
      "version": "1.2.3"
    },
    "resolvedUsingTsExtension": false
  },
  "failedLookupLocations": [
    "/home/src/workspaces/project/node_modules/a/node_modules/x.ts",
    "/home/src/workspaces/project/node_modules/a/node_modules/x.tsx",
    "/home/src/workspaces/project/node_modules/a/node_modules/x.d.ts",
    "/home/src/workspaces/project/node_modules/a/node_modules/x/index.ts",
    "/home/src/workspaces/project/node_modules/a/node_modules/x/index.tsx"
  ],
  "affectingLocations": [
    "/home/src/workspaces/project/node_modules/a/node_modules/x/package.json"
  ]
}

File: /home/src/workspaces/project/node_modules/b/node_modules/x/index.d.ts


export = class X { private x: number; }

File: /home/src/workspaces/project/node_modules/b/index.d.ts

import X from "x";
export const b: X;
resolvedModules:
x: {
  "resolvedModule": {
    "resolvedFileName": "/home/src/workspaces/project/node_modules/b/node_modules/x/index.d.ts",
    "extension": ".d.ts",
    "isExternalLibraryImport": true,
    "packageId": {
      "name": "x",
      "subModuleName": "index.d.ts",
      "version": "1.2.4"
    },
    "resolvedUsingTsExtension": false
  },
  "failedLookupLocations": [
    "/home/src/workspaces/project/node_modules/b/node_modules/x.ts",
    "/home/src/workspaces/project/node_modules/b/node_modules/x.tsx",
    "/home/src/workspaces/project/node_modules/b/node_modules/x.d.ts",
    "/home/src/workspaces/project/node_modules/b/node_modules/x/index.ts",
    "/home/src/workspaces/project/node_modules/b/node_modules/x/index.tsx"
  ],
  "affectingLocations": [
    "/home/src/workspaces/project/node_modules/b/node_modules/x/package.json"
  ]
}

File: /home/src/workspaces/project/a.ts

import { a } from "a"; import { b } from "b";
a(b)
resolvedModules:
a: {
  "resolvedModule": {
    "resolvedFileName": "/home/src/workspaces/project/node_modules/a/index.d.ts",
    "extension": ".d.ts",
    "isExternalLibraryImport": true,
    "resolvedUsingTsExtension": false
  },
  "failedLookupLocations": [
    "/home/src/workspaces/project/node_modules/a/package.json",
    "/home/src/workspaces/project/node_modules/a.ts",
    "/home/src/workspaces/project/node_modules/a.tsx",
    "/home/src/workspaces/project/node_modules/a.d.ts",
    "/home/src/workspaces/project/node_modules/a/index.ts",
    "/home/src/workspaces/project/node_modules/a/index.tsx"
  ]
}
b: {
  "resolvedModule": {
    "resolvedFileName": "/home/src/workspaces/project/node_modules/b/index.d.ts",
    "extension": ".d.ts",
    "isExternalLibraryImport": true,
    "resolvedUsingTsExtension": false
  },
  "failedLookupLocations": [
    "/home/src/workspaces/project/node_modules/b/package.json",
    "/home/src/workspaces/project/node_modules/b.ts",
    "/home/src/workspaces/project/node_modules/b.tsx",
    "/home/src/workspaces/project/node_modules/b.d.ts",
    "/home/src/workspaces/project/node_modules/b/index.ts",
    "/home/src/workspaces/project/node_modules/b/index.tsx"
  ]
}


MissingPaths:: [
  "lib.d.ts"
]

home/src/workspaces/project/node_modules/b/index.d.ts(2,8): error TS1259: Module '"/home/src/workspaces/project/node_modules/b/node_modules/x/index"' can only be default-imported using the 'allowSyntheticDefaultImports' flag
home/src/workspaces/project/node_modules/b/node_modules/x/index.d.ts(3,16): error TS2714: The expression of an export assignment must be an identifier or qualified name in an ambient context.



Program 2 Reused:: Not
File: /home/src/workspaces/project/node_modules/a/node_modules/x/index.d.ts


export default class X { private x: number; }

File: /home/src/workspaces/project/node_modules/a/index.d.ts

import X from "x";
export function a(x: X): void;
resolvedModules:
x: {
  "resolvedModule": {
    "resolvedFileName": "/home/src/workspaces/project/node_modules/a/node_modules/x/index.d.ts",
    "extension": ".d.ts",
    "isExternalLibraryImport": true,
    "packageId": {
      "name": "x",
      "subModuleName": "index.d.ts",
      "version": "1.2.3"
    },
    "resolvedUsingTsExtension": false
  },
  "failedLookupLocations": [
    "/home/src/workspaces/project/node_modules/a/node_modules/x.ts",
    "/home/src/workspaces/project/node_modules/a/node_modules/x.tsx",
    "/home/src/workspaces/project/node_modules/a/node_modules/x.d.ts",
    "/home/src/workspaces/project/node_modules/a/node_modules/x/index.ts",
    "/home/src/workspaces/project/node_modules/a/node_modules/x/index.tsx"
  ],
  "affectingLocations": [
    "/home/src/workspaces/project/node_modules/a/node_modules/x/package.json"
  ]
}

File: /home/src/workspaces/project/node_modules/b/node_modules/x/index.d.ts


export default class X { private x: number; }

File: /home/src/workspaces/project/node_modules/b/index.d.ts

import X from "x";
export const b: X;
resolvedModules:
x: {
  "resolvedModule": {
    "resolvedFileName": "/home/src/workspaces/project/node_modules/b/node_modules/x/index.d.ts",
    "extension": ".d.ts",
    "isExternalLibraryImport": true,
    "packageId": {
      "name": "x",
      "subModuleName": "index.d.ts",
      "version": "1.2.3"
    },
    "resolvedUsingTsExtension": false
  },
  "failedLookupLocations": [
    "/home/src/workspaces/project/node_modules/b/node_modules/x.ts",
    "/home/src/workspaces/project/node_modules/b/node_modules/x.tsx",
    "/home/src/workspaces/project/node_modules/b/node_modules/x.d.ts",
    "/home/src/workspaces/project/node_modules/b/node_modules/x/index.ts",
    "/home/src/workspaces/project/node_modules/b/node_modules/x/index.tsx"
  ],
  "affectingLocations": [
    "/home/src/workspaces/project/node_modules/b/node_modules/x/package.json"
  ]
}

File: /home/src/workspaces/project/a.ts

import { a } from "a"; import { b } from "b";
a(b)
resolvedModules:
a: {
  "resolvedModule": {
    "resolvedFileName": "/home/src/workspaces/project/node_modules/a/index.d.ts",
    "extension": ".d.ts",
    "isExternalLibraryImport": true,
    "resolvedUsingTsExtension": false
  },
  "failedLookupLocations": [
    "/home/src/workspaces/project/node_modules/a/package.json",
    "/home/src/workspaces/project/node_modules/a.ts",
    "/home/src/workspaces/project/node_modules/a.tsx",
    "/home/src/workspaces/project/node_modules/a.d.ts",
    "/home/src/workspaces/project/node_modules/a/index.ts",
    "/home/src/workspaces/project/node_modules/a/index.tsx"
  ]
}
b: {
  "resolvedModule": {
    "resolvedFileName": "/home/src/workspaces/project/node_modules/b/index.d.ts",
    "extension": ".d.ts",
    "isExternalLibraryImport": true,
    "resolvedUsingTsExtension": false
  },
  "failedLookupLocations": [
    "/home/src/workspaces/project/node_modules/b/package.json",
    "/home/src/workspaces/project/node_modules/b.ts",
    "/home/src/workspaces/project/node_modules/b.tsx",
    "/home/src/workspaces/project/node_modules/b.d.ts",
    "/home/src/workspaces/project/node_modules/b/index.ts",
    "/home/src/workspaces/project/node_modules/b/index.tsx"
  ]
}


MissingPaths:: [
  "lib.d.ts"
]



