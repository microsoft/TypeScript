Program 1 Reused:: Not
File: /home/src/workspaces/project/node_modules/b/internal.d.ts


export const b = 1;

File: /home/src/workspaces/project/node_modules/b/index.d.ts

export * from './internal';

resolvedModules:
./internal: {
  "resolvedModule": {
    "resolvedFileName": "/home/src/workspaces/project/node_modules/b/internal.d.ts",
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
    "/home/src/workspaces/project/node_modules/b/internal.ts",
    "/home/src/workspaces/project/node_modules/b/internal.tsx"
  ],
  "affectingLocations": [
    "/home/src/workspaces/project/node_modules/b/package.json"
  ]
}

File: /home/src/workspaces/project/a.ts

import {b} from 'b'
var a = b;
resolvedModules:
b: {
  "resolvedModule": {
    "resolvedFileName": "/home/src/workspaces/project/node_modules/b/index.d.ts",
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
    "/home/src/workspaces/project/node_modules/b.ts",
    "/home/src/workspaces/project/node_modules/b.tsx",
    "/home/src/workspaces/project/node_modules/b.d.ts",
    "/home/src/workspaces/project/node_modules/b/index.ts",
    "/home/src/workspaces/project/node_modules/b/index.tsx"
  ],
  "affectingLocations": [
    "/home/src/workspaces/project/node_modules/b/package.json"
  ]
}


MissingPaths:: [
  "lib.d.ts"
]




Program 2 Reused:: Completely
File: /home/src/workspaces/project/node_modules/b/internal.d.ts


export const b = 2;

File: /home/src/workspaces/project/node_modules/b/index.d.ts

export * from './internal';

resolvedModules:
./internal: {
  "resolvedModule": {
    "resolvedFileName": "/home/src/workspaces/project/node_modules/b/internal.d.ts",
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
    "/home/src/workspaces/project/node_modules/b/internal.ts",
    "/home/src/workspaces/project/node_modules/b/internal.tsx"
  ],
  "affectingLocations": [
    "/home/src/workspaces/project/node_modules/b/package.json"
  ]
}

File: /home/src/workspaces/project/a.ts

import {b} from 'b'
var a = b;
resolvedModules:
b: {
  "resolvedModule": {
    "resolvedFileName": "/home/src/workspaces/project/node_modules/b/index.d.ts",
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
    "/home/src/workspaces/project/node_modules/b.ts",
    "/home/src/workspaces/project/node_modules/b.tsx",
    "/home/src/workspaces/project/node_modules/b.d.ts",
    "/home/src/workspaces/project/node_modules/b/index.ts",
    "/home/src/workspaces/project/node_modules/b/index.tsx"
  ],
  "affectingLocations": [
    "/home/src/workspaces/project/node_modules/b/package.json"
  ]
}


MissingPaths:: [
  "lib.d.ts"
]



