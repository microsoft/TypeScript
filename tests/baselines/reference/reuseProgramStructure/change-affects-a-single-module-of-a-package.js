Program Reused:: Not
File: /node_modules/b/internal.d.ts


export const b = 1;

File: /node_modules/b/index.d.ts

export * from './internal';

resolvedModules:
./internal: {
  "resolvedModule": {
    "resolvedFileName": "/node_modules/b/internal.d.ts",
    "extension": ".d.ts",
    "isExternalLibraryImport": true,
    "packageId": {
      "name": "b",
      "subModuleName": "internal.d.ts",
      "version": "1.2.3"
    },
    "resolvedUsingTsExtension": false
  },
  "failedLookupLocations": [
    "/node_modules/b/internal.ts",
    "/node_modules/b/internal.tsx"
  ],
  "affectingLocations": [
    "/node_modules/b/package.json"
  ]
}

File: /a.ts

import {b} from 'b'
var a = b;
resolvedModules:
b: {
  "resolvedModule": {
    "resolvedFileName": "/node_modules/b/index.d.ts",
    "extension": ".d.ts",
    "isExternalLibraryImport": true,
    "packageId": {
      "name": "b",
      "subModuleName": "index.d.ts",
      "version": "1.2.3"
    },
    "resolvedUsingTsExtension": false
  },
  "failedLookupLocations": [
    "/node_modules/b.ts",
    "/node_modules/b.tsx",
    "/node_modules/b.d.ts",
    "/node_modules/b/index.ts",
    "/node_modules/b/index.tsx"
  ],
  "affectingLocations": [
    "/node_modules/b/package.json"
  ]
}


MissingPaths:: [
  "lib.d.ts"
]




Program Reused:: Completely
File: /node_modules/b/internal.d.ts


export const b = 2;

File: /node_modules/b/index.d.ts

export * from './internal';

resolvedModules:
./internal: {
  "resolvedModule": {
    "resolvedFileName": "/node_modules/b/internal.d.ts",
    "extension": ".d.ts",
    "isExternalLibraryImport": true,
    "packageId": {
      "name": "b",
      "subModuleName": "internal.d.ts",
      "version": "1.2.3"
    },
    "resolvedUsingTsExtension": false
  },
  "failedLookupLocations": [
    "/node_modules/b/internal.ts",
    "/node_modules/b/internal.tsx"
  ],
  "affectingLocations": [
    "/node_modules/b/package.json"
  ]
}

File: /a.ts

import {b} from 'b'
var a = b;
resolvedModules:
b: {
  "resolvedModule": {
    "resolvedFileName": "/node_modules/b/index.d.ts",
    "extension": ".d.ts",
    "isExternalLibraryImport": true,
    "packageId": {
      "name": "b",
      "subModuleName": "index.d.ts",
      "version": "1.2.3"
    },
    "resolvedUsingTsExtension": false
  },
  "failedLookupLocations": [
    "/node_modules/b.ts",
    "/node_modules/b.tsx",
    "/node_modules/b.d.ts",
    "/node_modules/b/index.ts",
    "/node_modules/b/index.tsx"
  ],
  "affectingLocations": [
    "/node_modules/b/package.json"
  ]
}


MissingPaths:: [
  "lib.d.ts"
]



