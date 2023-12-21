Program Reused:: Not
File: b.ts

export const works = true;


File: a.ts

import {works} from './b';

resolvedModules:
./b: {
  "resolvedModule": {
    "resolvedFileName": "b.ts",
    "extension": ".ts",
    "isExternalLibraryImport": false,
    "resolvedUsingTsExtension": false
  }
}


MissingPaths:: [
  "lib.d.ts"
]




Program Reused:: Completely
File: b.ts

export const works = true;


File: a.ts


                import {works} from './b';
                import * as namespaceImp from './b';
            

resolvedModules:
./b: {
  "resolvedModule": {
    "resolvedFileName": "b.ts",
    "extension": ".ts",
    "isExternalLibraryImport": false,
    "resolvedUsingTsExtension": false
  }
}


MissingPaths:: [
  "lib.d.ts"
]



