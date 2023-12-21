Program Reused:: Not
File: b.ts

export const works = true;


File: a.ts


                import {works} from './b';
                import * as bla from './b';
            

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




Program Reused:: SafeModules
File: b.ts

export const works = true;


File: a.ts


                import type {works} from './b' with {
                    "resolution-mode": "require"
                };
                import * as bla from './b';
            

resolvedModules:
./b: commonjs: {
  "resolvedModule": {
    "resolvedFileName": "b.ts",
    "extension": ".ts",
    "isExternalLibraryImport": false,
    "resolvedUsingTsExtension": false
  }
}
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



