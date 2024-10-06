Program 1 Reused:: Not
File: /home/src/workspaces/project/a.ts


import * as a from "a";a;
resolvedModules:
a: {
  "resolvedModule": {
    "resolvedFileName": "/home/src/workspaces/project/a.ts",
    "extension": ".ts",
    "isExternalLibraryImport": false,
    "resolvedUsingTsExtension": false
  }
}


MissingPaths:: [
  "lib.d.ts"
]




parent pointers are updated: true
Program 2 Reused:: Completely
File: /home/src/workspaces/project/a.ts
'use strict';

import * as a from "a";a;
resolvedModules:
a: {
  "resolvedModule": {
    "resolvedFileName": "/home/src/workspaces/project/a.ts",
    "extension": ".ts",
    "isExternalLibraryImport": false,
    "resolvedUsingTsExtension": false
  }
}


MissingPaths:: [
  "lib.d.ts"
]




parent pointers are not altered: true