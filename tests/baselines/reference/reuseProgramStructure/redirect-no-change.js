Program Reused:: Not
File: /node_modules/a/node_modules/x/index.d.ts


export default class X { private x: number; }

File: /node_modules/a/index.d.ts

import X from "x";
export function a(x: X): void;
resolvedModules:
x: {
  "resolvedModule": {
    "resolvedFileName": "/node_modules/a/node_modules/x/index.d.ts",
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
    "/node_modules/a/node_modules/x.ts",
    "/node_modules/a/node_modules/x.tsx",
    "/node_modules/a/node_modules/x.d.ts",
    "/node_modules/a/node_modules/x/index.ts",
    "/node_modules/a/node_modules/x/index.tsx"
  ],
  "affectingLocations": [
    "/node_modules/a/node_modules/x/package.json"
  ]
}

File: /node_modules/b/node_modules/x/index.d.ts


export default class X { private x: number; }

File: /node_modules/b/index.d.ts

import X from "x";
export const b: X;
resolvedModules:
x: {
  "resolvedModule": {
    "resolvedFileName": "/node_modules/b/node_modules/x/index.d.ts",
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
    "/node_modules/b/node_modules/x.ts",
    "/node_modules/b/node_modules/x.tsx",
    "/node_modules/b/node_modules/x.d.ts",
    "/node_modules/b/node_modules/x/index.ts",
    "/node_modules/b/node_modules/x/index.tsx"
  ],
  "affectingLocations": [
    "/node_modules/b/node_modules/x/package.json"
  ]
}

File: /a.ts

import { a } from "a"; import { b } from "b";
a(b)
resolvedModules:
a: {
  "resolvedModule": {
    "resolvedFileName": "/node_modules/a/index.d.ts",
    "extension": ".d.ts",
    "isExternalLibraryImport": true,
    "resolvedUsingTsExtension": false
  },
  "failedLookupLocations": [
    "/node_modules/a/package.json",
    "/node_modules/a.ts",
    "/node_modules/a.tsx",
    "/node_modules/a.d.ts",
    "/node_modules/a/index.ts",
    "/node_modules/a/index.tsx"
  ]
}
b: {
  "resolvedModule": {
    "resolvedFileName": "/node_modules/b/index.d.ts",
    "extension": ".d.ts",
    "isExternalLibraryImport": true,
    "resolvedUsingTsExtension": false
  },
  "failedLookupLocations": [
    "/node_modules/b/package.json",
    "/node_modules/b.ts",
    "/node_modules/b.tsx",
    "/node_modules/b.d.ts",
    "/node_modules/b/index.ts",
    "/node_modules/b/index.tsx"
  ]
}


MissingPaths:: [
  "lib.d.ts"
]




Program Reused:: Completely
File: /node_modules/a/node_modules/x/index.d.ts


export default class X { private x: number; }

File: /node_modules/a/index.d.ts

import X from "x";
export function a(x: X): void;
resolvedModules:
x: {
  "resolvedModule": {
    "resolvedFileName": "/node_modules/a/node_modules/x/index.d.ts",
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
    "/node_modules/a/node_modules/x.ts",
    "/node_modules/a/node_modules/x.tsx",
    "/node_modules/a/node_modules/x.d.ts",
    "/node_modules/a/node_modules/x/index.ts",
    "/node_modules/a/node_modules/x/index.tsx"
  ],
  "affectingLocations": [
    "/node_modules/a/node_modules/x/package.json"
  ]
}

File: /node_modules/b/node_modules/x/index.d.ts


export default class X { private x: number; }

File: /node_modules/b/index.d.ts

import X from "x";
export const b: X;
resolvedModules:
x: {
  "resolvedModule": {
    "resolvedFileName": "/node_modules/b/node_modules/x/index.d.ts",
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
    "/node_modules/b/node_modules/x.ts",
    "/node_modules/b/node_modules/x.tsx",
    "/node_modules/b/node_modules/x.d.ts",
    "/node_modules/b/node_modules/x/index.ts",
    "/node_modules/b/node_modules/x/index.tsx"
  ],
  "affectingLocations": [
    "/node_modules/b/node_modules/x/package.json"
  ]
}

File: /a.ts

import { a } from "a"; import { b } from "b";
const x = 1;
resolvedModules:
a: {
  "resolvedModule": {
    "resolvedFileName": "/node_modules/a/index.d.ts",
    "extension": ".d.ts",
    "isExternalLibraryImport": true,
    "resolvedUsingTsExtension": false
  },
  "failedLookupLocations": [
    "/node_modules/a/package.json",
    "/node_modules/a.ts",
    "/node_modules/a.tsx",
    "/node_modules/a.d.ts",
    "/node_modules/a/index.ts",
    "/node_modules/a/index.tsx"
  ]
}
b: {
  "resolvedModule": {
    "resolvedFileName": "/node_modules/b/index.d.ts",
    "extension": ".d.ts",
    "isExternalLibraryImport": true,
    "resolvedUsingTsExtension": false
  },
  "failedLookupLocations": [
    "/node_modules/b/package.json",
    "/node_modules/b.ts",
    "/node_modules/b.tsx",
    "/node_modules/b.d.ts",
    "/node_modules/b/index.ts",
    "/node_modules/b/index.tsx"
  ]
}


MissingPaths:: [
  "lib.d.ts"
]



