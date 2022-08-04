Info 0    [00:01:05.000] Provided types map file "/a/lib/typesMap.json" doesn't exist
Info 1    [00:01:06.000] request:
    {
      "command": "open",
      "arguments": {
        "file": "/src/project/randomFileForImport.ts"
      },
      "seq": 1,
      "type": "request"
    }
Before request
//// [/src/project/tsconfig.json]
{"compilerOptions":{"moduleResolution":"node16","composite":true,"cacheResolutions":true,"traceResolution":true},"include":["*.ts"],"exclude":["*.d.ts"]}

//// [/src/project/fileWithImports.ts]
import type { ImportInterface0 } from "pkg0" assert { "resolution-mode": "import" };
import type { RequireInterface1 } from "pkg1" assert { "resolution-mode": "require" };


//// [/src/project/randomFileForImport.ts]
export const x = 10;

//// [/src/project/node_modules/pkg0/package.json]
{"name":"pkg0","version":"0.0.1","exports":{"import":"./import.js","require":"./require.js"}}

//// [/src/project/node_modules/pkg0/import.d.ts]
export interface ImportInterface0 {}

//// [/src/project/node_modules/pkg0/require.d.ts]
export interface RequireInterface0 {}

//// [/src/project/node_modules/pkg1/package.json]
{"name":"pkg1","version":"0.0.1","exports":{"import":"./import.js","require":"./require.js"}}

//// [/src/project/node_modules/pkg1/import.d.ts]
export interface ImportInterface1 {}

//// [/src/project/fileWithTypeRefs.ts]
/// <reference types="pkg2" resolution-mode="import"/>
/// <reference types="pkg3" resolution-mode="require"/>
interface LocalInterface extends ImportInterface2, RequireInterface3 {}
export {}


//// [/src/project/randomFileForTypeRef.ts]
export const x = 10;

//// [/src/project/node_modules/pkg2/package.json]
{"name":"pkg2","version":"0.0.1","exports":{"import":"./import.js","require":"./require.js"}}

//// [/src/project/node_modules/pkg2/import.d.ts]
export {};
declare global {
    interface ImportInterface2 {}
}


//// [/src/project/node_modules/pkg2/require.d.ts]
export {};
declare global {
    interface RequireInterface2 {}
}


//// [/src/project/node_modules/pkg3/package.json]
{"name":"pkg3","version":"0.0.1","exports":{"import":"./import.js","require":"./require.js"}}

//// [/src/project/node_modules/pkg3/import.d.ts]
export {};
declare global {
    interface ImportInterface3 {}
}


//// [/src/project/node_modules/@types/pkg4/index.d.ts]
export const x = 10;

//// [/a/lib/lib.d.ts]
/// <reference no-default-lib="true"/>
interface Boolean {}
interface Function {}
interface CallableFunction {}
interface NewableFunction {}
interface IArguments {}
interface Number { toExponential: any; }
interface Object {}
interface RegExp {}
interface String { charAt: any; }
interface Array<T> { length: number; [n: number]: T; }

//// [/src/project/tsconfig.tsbuildinfo]
{"program":{"fileNames":["../../a/lib/lib.d.ts","./node_modules/pkg0/import.d.ts","./filewithimports.ts","./node_modules/pkg2/import.d.ts","./filewithtyperefs.ts","./randomfileforimport.ts","./randomfilefortyperef.ts","./node_modules/@types/pkg4/index.d.ts","./","./node_modules/pkg0/package.json","./node_modules/pkg2/package.json"],"fileInfos":[{"version":"-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }","affectsGlobalScope":true,"impliedFormat":1},{"version":"769951468-export interface ImportInterface0 {}","impliedFormat":1},{"version":"4079531109-import type { ImportInterface0 } from \"pkg0\" assert { \"resolution-mode\": \"import\" };\nimport type { RequireInterface1 } from \"pkg1\" assert { \"resolution-mode\": \"require\" };\n","impliedFormat":1},{"version":"1714206242-export {};\ndeclare global {\n    interface ImportInterface2 {}\n}\n","affectsGlobalScope":true,"impliedFormat":1},{"version":"-20622778057-/// <reference types=\"pkg2\" resolution-mode=\"import\"/>\n/// <reference types=\"pkg3\" resolution-mode=\"require\"/>\ninterface LocalInterface extends ImportInterface2, RequireInterface3 {}\nexport {}\n","impliedFormat":1},{"version":"-10726455937-export const x = 10;","impliedFormat":1},{"version":"-10726455937-export const x = 10;","impliedFormat":1},{"version":"-10726455937-export const x = 10;","impliedFormat":1}],"options":{"cacheResolutions":true,"composite":true,"moduleResolution":3},"fileIdsList":[[2],[4]],"referencedMap":[[3,1],[5,2]],"exportedModulesMap":[[3,1],[5,2]],"semanticDiagnosticsPerFile":[1,[3,[{"file":"./filewithimports.ts","start":124,"length":6,"messageText":"Cannot find module 'pkg1' or its corresponding type declarations.","category":1,"code":2307}]],[5,[{"file":"./filewithtyperefs.ts","start":162,"length":17,"messageText":"Cannot find name 'RequireInterface3'.","category":1,"code":2304}]],8,2,4,6,7],"affectedFilesPendingEmit":[3,5,6,7],"emitSignatures":[3,5,6,7],"cacheResolutions":{"resolutions":[{"resolvedModule":{"resolvedFileName":2,"isExternalLibraryImport":true,"packageId":{"name":"pkg0","subModuleName":"import.d.ts","version":"0.0.1"}},"affectingLocations":[10]},{"resolvedTypeReferenceDirective":{"resolvedFileName":4,"packageId":{"name":"pkg2","subModuleName":"import.d.ts","version":"0.0.1"},"isExternalLibraryImport":true},"affectingLocations":[11]},{"resolvedTypeReferenceDirective":{"primary":true,"resolvedFileName":8,"isExternalLibraryImport":true}}],"names":["pkg0","pkg2","pkg4"],"hash":[[10,"9838425114-{\"name\":\"pkg0\",\"version\":\"0.0.1\",\"exports\":{\"import\":\"./import.js\",\"require\":\"./require.js\"}}"],[11,"21696956444-{\"name\":\"pkg2\",\"version\":\"0.0.1\",\"exports\":{\"import\":\"./import.js\",\"require\":\"./require.js\"}}"]],"resolutionEntries":[[1,1,99],[2,2,99],[3,3]],"modules":[[9,[1]]],"typeRefs":[[9,[2,3]]]}},"version":"FakeTSVersion"}

//// [/src/project/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "program": {
    "fileNames": [
      "../../a/lib/lib.d.ts",
      "./node_modules/pkg0/import.d.ts",
      "./filewithimports.ts",
      "./node_modules/pkg2/import.d.ts",
      "./filewithtyperefs.ts",
      "./randomfileforimport.ts",
      "./randomfilefortyperef.ts",
      "./node_modules/@types/pkg4/index.d.ts",
      "./",
      "./node_modules/pkg0/package.json",
      "./node_modules/pkg2/package.json"
    ],
    "fileNamesList": [
      [
        "./node_modules/pkg0/import.d.ts"
      ],
      [
        "./node_modules/pkg2/import.d.ts"
      ]
    ],
    "fileInfos": {
      "../../a/lib/lib.d.ts": {
        "original": {
          "version": "-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }",
          "affectsGlobalScope": true,
          "impliedFormat": 1
        },
        "version": "-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }",
        "signature": "-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }",
        "affectsGlobalScope": true,
        "impliedFormat": "commonjs"
      },
      "./node_modules/pkg0/import.d.ts": {
        "original": {
          "version": "769951468-export interface ImportInterface0 {}",
          "impliedFormat": 1
        },
        "version": "769951468-export interface ImportInterface0 {}",
        "signature": "769951468-export interface ImportInterface0 {}",
        "impliedFormat": "commonjs"
      },
      "./filewithimports.ts": {
        "original": {
          "version": "4079531109-import type { ImportInterface0 } from \"pkg0\" assert { \"resolution-mode\": \"import\" };\nimport type { RequireInterface1 } from \"pkg1\" assert { \"resolution-mode\": \"require\" };\n",
          "impliedFormat": 1
        },
        "version": "4079531109-import type { ImportInterface0 } from \"pkg0\" assert { \"resolution-mode\": \"import\" };\nimport type { RequireInterface1 } from \"pkg1\" assert { \"resolution-mode\": \"require\" };\n",
        "signature": "4079531109-import type { ImportInterface0 } from \"pkg0\" assert { \"resolution-mode\": \"import\" };\nimport type { RequireInterface1 } from \"pkg1\" assert { \"resolution-mode\": \"require\" };\n",
        "impliedFormat": "commonjs"
      },
      "./node_modules/pkg2/import.d.ts": {
        "original": {
          "version": "1714206242-export {};\ndeclare global {\n    interface ImportInterface2 {}\n}\n",
          "affectsGlobalScope": true,
          "impliedFormat": 1
        },
        "version": "1714206242-export {};\ndeclare global {\n    interface ImportInterface2 {}\n}\n",
        "signature": "1714206242-export {};\ndeclare global {\n    interface ImportInterface2 {}\n}\n",
        "affectsGlobalScope": true,
        "impliedFormat": "commonjs"
      },
      "./filewithtyperefs.ts": {
        "original": {
          "version": "-20622778057-/// <reference types=\"pkg2\" resolution-mode=\"import\"/>\n/// <reference types=\"pkg3\" resolution-mode=\"require\"/>\ninterface LocalInterface extends ImportInterface2, RequireInterface3 {}\nexport {}\n",
          "impliedFormat": 1
        },
        "version": "-20622778057-/// <reference types=\"pkg2\" resolution-mode=\"import\"/>\n/// <reference types=\"pkg3\" resolution-mode=\"require\"/>\ninterface LocalInterface extends ImportInterface2, RequireInterface3 {}\nexport {}\n",
        "signature": "-20622778057-/// <reference types=\"pkg2\" resolution-mode=\"import\"/>\n/// <reference types=\"pkg3\" resolution-mode=\"require\"/>\ninterface LocalInterface extends ImportInterface2, RequireInterface3 {}\nexport {}\n",
        "impliedFormat": "commonjs"
      },
      "./randomfileforimport.ts": {
        "original": {
          "version": "-10726455937-export const x = 10;",
          "impliedFormat": 1
        },
        "version": "-10726455937-export const x = 10;",
        "signature": "-10726455937-export const x = 10;",
        "impliedFormat": "commonjs"
      },
      "./randomfilefortyperef.ts": {
        "original": {
          "version": "-10726455937-export const x = 10;",
          "impliedFormat": 1
        },
        "version": "-10726455937-export const x = 10;",
        "signature": "-10726455937-export const x = 10;",
        "impliedFormat": "commonjs"
      },
      "./node_modules/@types/pkg4/index.d.ts": {
        "original": {
          "version": "-10726455937-export const x = 10;",
          "impliedFormat": 1
        },
        "version": "-10726455937-export const x = 10;",
        "signature": "-10726455937-export const x = 10;",
        "impliedFormat": "commonjs"
      }
    },
    "options": {
      "cacheResolutions": true,
      "composite": true,
      "moduleResolution": 3
    },
    "referencedMap": {
      "./filewithimports.ts": [
        "./node_modules/pkg0/import.d.ts"
      ],
      "./filewithtyperefs.ts": [
        "./node_modules/pkg2/import.d.ts"
      ]
    },
    "exportedModulesMap": {
      "./filewithimports.ts": [
        "./node_modules/pkg0/import.d.ts"
      ],
      "./filewithtyperefs.ts": [
        "./node_modules/pkg2/import.d.ts"
      ]
    },
    "semanticDiagnosticsPerFile": [
      "../../a/lib/lib.d.ts",
      [
        "./filewithimports.ts",
        [
          {
            "file": "./filewithimports.ts",
            "start": 124,
            "length": 6,
            "messageText": "Cannot find module 'pkg1' or its corresponding type declarations.",
            "category": 1,
            "code": 2307
          }
        ]
      ],
      [
        "./filewithtyperefs.ts",
        [
          {
            "file": "./filewithtyperefs.ts",
            "start": 162,
            "length": 17,
            "messageText": "Cannot find name 'RequireInterface3'.",
            "category": 1,
            "code": 2304
          }
        ]
      ],
      "./node_modules/@types/pkg4/index.d.ts",
      "./node_modules/pkg0/import.d.ts",
      "./node_modules/pkg2/import.d.ts",
      "./randomfileforimport.ts",
      "./randomfilefortyperef.ts"
    ],
    "affectedFilesPendingEmit": [
      [
        "./filewithimports.ts",
        "Js | Dts"
      ],
      [
        "./filewithtyperefs.ts",
        "Js | Dts"
      ],
      [
        "./randomfileforimport.ts",
        "Js | Dts"
      ],
      [
        "./randomfilefortyperef.ts",
        "Js | Dts"
      ]
    ],
    "emitSignatures": [
      "./filewithimports.ts",
      "./filewithtyperefs.ts",
      "./randomfileforimport.ts",
      "./randomfilefortyperef.ts"
    ],
    "cacheResolutions": {
      "resolutions": [
        {
          "original": {
            "resolvedModule": {
              "resolvedFileName": 2,
              "isExternalLibraryImport": true,
              "packageId": {
                "name": "pkg0",
                "subModuleName": "import.d.ts",
                "version": "0.0.1"
              }
            },
            "affectingLocations": [
              10
            ]
          },
          "resolutionId": 1,
          "resolvedModule": {
            "resolvedFileName": "./node_modules/pkg0/import.d.ts",
            "isExternalLibraryImport": true,
            "packageId": {
              "name": "pkg0",
              "subModuleName": "import.d.ts",
              "version": "0.0.1"
            }
          },
          "affectingLocations": [
            "./node_modules/pkg0/package.json"
          ]
        },
        {
          "original": {
            "resolvedTypeReferenceDirective": {
              "resolvedFileName": 4,
              "packageId": {
                "name": "pkg2",
                "subModuleName": "import.d.ts",
                "version": "0.0.1"
              },
              "isExternalLibraryImport": true
            },
            "affectingLocations": [
              11
            ]
          },
          "resolutionId": 2,
          "resolvedTypeReferenceDirective": {
            "resolvedFileName": "./node_modules/pkg2/import.d.ts",
            "packageId": {
              "name": "pkg2",
              "subModuleName": "import.d.ts",
              "version": "0.0.1"
            },
            "isExternalLibraryImport": true
          },
          "affectingLocations": [
            "./node_modules/pkg2/package.json"
          ]
        },
        {
          "original": {
            "resolvedTypeReferenceDirective": {
              "primary": true,
              "resolvedFileName": 8,
              "isExternalLibraryImport": true
            }
          },
          "resolutionId": 3,
          "resolvedTypeReferenceDirective": {
            "primary": true,
            "resolvedFileName": "./node_modules/@types/pkg4/index.d.ts",
            "isExternalLibraryImport": true
          }
        }
      ],
      "names": [
        "pkg0",
        "pkg2",
        "pkg4"
      ],
      "hash": [
        [
          "./node_modules/pkg0/package.json",
          "9838425114-{\"name\":\"pkg0\",\"version\":\"0.0.1\",\"exports\":{\"import\":\"./import.js\",\"require\":\"./require.js\"}}"
        ],
        [
          "./node_modules/pkg2/package.json",
          "21696956444-{\"name\":\"pkg2\",\"version\":\"0.0.1\",\"exports\":{\"import\":\"./import.js\",\"require\":\"./require.js\"}}"
        ]
      ],
      "resolutionEntries": [
        {
          "original": [
            1,
            1,
            99
          ],
          "resolutionEntryId": 1,
          "name": "pkg0",
          "resolution": {
            "resolutionId": 1,
            "resolvedModule": {
              "resolvedFileName": "./node_modules/pkg0/import.d.ts",
              "isExternalLibraryImport": true,
              "packageId": {
                "name": "pkg0",
                "subModuleName": "import.d.ts",
                "version": "0.0.1"
              }
            },
            "affectingLocations": [
              "./node_modules/pkg0/package.json"
            ]
          },
          "mode": "esnext"
        },
        {
          "original": [
            2,
            2,
            99
          ],
          "resolutionEntryId": 2,
          "name": "pkg2",
          "resolution": {
            "resolutionId": 2,
            "resolvedTypeReferenceDirective": {
              "resolvedFileName": "./node_modules/pkg2/import.d.ts",
              "packageId": {
                "name": "pkg2",
                "subModuleName": "import.d.ts",
                "version": "0.0.1"
              },
              "isExternalLibraryImport": true
            },
            "affectingLocations": [
              "./node_modules/pkg2/package.json"
            ]
          },
          "mode": "esnext"
        },
        {
          "original": [
            3,
            3
          ],
          "resolutionEntryId": 3,
          "name": "pkg4",
          "resolution": {
            "resolutionId": 3,
            "resolvedTypeReferenceDirective": {
              "primary": true,
              "resolvedFileName": "./node_modules/@types/pkg4/index.d.ts",
              "isExternalLibraryImport": true
            }
          }
        }
      ],
      "modules": [
        {
          "dir": "./",
          "resolutions": [
            {
              "resolutionEntryId": 1,
              "name": "pkg0",
              "resolution": {
                "resolutionId": 1,
                "resolvedModule": {
                  "resolvedFileName": "./node_modules/pkg0/import.d.ts",
                  "isExternalLibraryImport": true,
                  "packageId": {
                    "name": "pkg0",
                    "subModuleName": "import.d.ts",
                    "version": "0.0.1"
                  }
                },
                "affectingLocations": [
                  "./node_modules/pkg0/package.json"
                ]
              },
              "mode": "esnext"
            }
          ]
        }
      ],
      "typeRefs": [
        {
          "dir": "./",
          "resolutions": [
            {
              "resolutionEntryId": 2,
              "name": "pkg2",
              "resolution": {
                "resolutionId": 2,
                "resolvedTypeReferenceDirective": {
                  "resolvedFileName": "./node_modules/pkg2/import.d.ts",
                  "packageId": {
                    "name": "pkg2",
                    "subModuleName": "import.d.ts",
                    "version": "0.0.1"
                  },
                  "isExternalLibraryImport": true
                },
                "affectingLocations": [
                  "./node_modules/pkg2/package.json"
                ]
              },
              "mode": "esnext"
            },
            {
              "resolutionEntryId": 3,
              "name": "pkg4",
              "resolution": {
                "resolutionId": 3,
                "resolvedTypeReferenceDirective": {
                  "primary": true,
                  "resolvedFileName": "./node_modules/@types/pkg4/index.d.ts",
                  "isExternalLibraryImport": true
                }
              }
            }
          ]
        }
      ]
    }
  },
  "version": "FakeTSVersion",
  "size": 3165
}


PolledWatches::

FsWatches::

FsWatchesRecursive::

Info 2    [00:01:07.000] Search path: /src/project
Info 3    [00:01:08.000] For info: /src/project/randomFileForImport.ts :: Config file name: /src/project/tsconfig.json
Info 4    [00:01:09.000] Creating configuration project /src/project/tsconfig.json
Info 5    [00:01:10.000] FileWatcher:: Added:: WatchInfo: /src/project/tsconfig.json 2000 undefined Project: /src/project/tsconfig.json WatchType: Config file
Info 6    [00:01:11.000] Config: /src/project/tsconfig.json : {
 "rootNames": [
  "/src/project/fileWithImports.ts",
  "/src/project/fileWithTypeRefs.ts",
  "/src/project/randomFileForImport.ts",
  "/src/project/randomFileForTypeRef.ts"
 ],
 "options": {
  "moduleResolution": 3,
  "composite": true,
  "cacheResolutions": true,
  "traceResolution": true,
  "configFilePath": "/src/project/tsconfig.json"
 }
}
Info 7    [00:01:12.000] DirectoryWatcher:: Added:: WatchInfo: /src/project 0 undefined Config: /src/project/tsconfig.json WatchType: Wild card directory
Info 8    [00:01:13.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /src/project 0 undefined Config: /src/project/tsconfig.json WatchType: Wild card directory
Info 9    [00:01:14.000] FileWatcher:: Added:: WatchInfo: /src/project/fileWithImports.ts 500 undefined WatchType: Closed Script info
Info 10   [00:01:15.000] FileWatcher:: Added:: WatchInfo: /src/project/fileWithTypeRefs.ts 500 undefined WatchType: Closed Script info
Info 11   [00:01:16.000] FileWatcher:: Added:: WatchInfo: /src/project/randomFileForTypeRef.ts 500 undefined WatchType: Closed Script info
Info 12   [00:01:17.000] Starting updateGraphWorker: Project: /src/project/tsconfig.json
Info 13   [00:01:18.000] File '/src/project/package.json' does not exist.
Info 14   [00:01:19.000] File '/src/package.json' does not exist.
Info 15   [00:01:20.000] File '/package.json' does not exist.
Info 16   [00:01:21.000] Found 'package.json' at '/src/project/node_modules/pkg0/package.json'.
Info 17   [00:01:22.000] Reusing resolution of module 'pkg0' from '/src/project/fileWithImports.ts' found in cache from location '/src/project', it was successfully resolved to '/src/project/node_modules/pkg0/import.d.ts' with Package ID 'pkg0/import.d.ts@0.0.1'.
Info 18   [00:01:23.000] ======== Resolving module 'pkg1' from '/src/project/fileWithImports.ts'. ========
Info 19   [00:01:24.000] Explicitly specified module resolution kind: 'Node16'.
Info 20   [00:01:25.000] Resolving in CJS mode with conditions 'node', 'require', 'types'.
Info 21   [00:01:26.000] File '/src/project/package.json' does not exist according to earlier cached lookups.
Info 22   [00:01:27.000] File '/src/package.json' does not exist according to earlier cached lookups.
Info 23   [00:01:28.000] File '/package.json' does not exist according to earlier cached lookups.
Info 24   [00:01:29.000] Loading module 'pkg1' from 'node_modules' folder, target file types: TypeScript, JavaScript, Declaration.
Info 25   [00:01:30.000] Found 'package.json' at '/src/project/node_modules/pkg1/package.json'.
Info 26   [00:01:31.000] Saw non-matching condition 'import'.
Info 27   [00:01:32.000] Matched 'exports' condition 'require'.
Info 28   [00:01:33.000] Using 'exports' subpath '.' with target './require.js'.
Info 29   [00:01:34.000] File name '/src/project/node_modules/pkg1/require.js' has a '.js' extension - stripping it.
Info 30   [00:01:35.000] File '/src/project/node_modules/pkg1/require.ts' does not exist.
Info 31   [00:01:36.000] File '/src/project/node_modules/pkg1/require.tsx' does not exist.
Info 32   [00:01:37.000] File '/src/project/node_modules/pkg1/require.d.ts' does not exist.
Info 33   [00:01:38.000] File '/src/project/node_modules/@types/pkg1.d.ts' does not exist.
Info 34   [00:01:39.000] Directory '/src/node_modules' does not exist, skipping all lookups in it.
Info 35   [00:01:40.000] Directory '/node_modules' does not exist, skipping all lookups in it.
Info 36   [00:01:41.000] File '/src/project/node_modules/pkg1/package.json' exists according to earlier cached lookups.
Info 37   [00:01:42.000] Saw non-matching condition 'import'.
Info 38   [00:01:43.000] Matched 'exports' condition 'require'.
Info 39   [00:01:44.000] Using 'exports' subpath '.' with target './require.js'.
Info 40   [00:01:45.000] File name '/src/project/node_modules/pkg1/require.js' has a '.js' extension - stripping it.
Info 41   [00:01:46.000] File '/src/project/node_modules/pkg1/require.js' does not exist.
Info 42   [00:01:47.000] File '/src/project/node_modules/pkg1/require.jsx' does not exist.
Info 43   [00:01:48.000] Directory '/src/node_modules' does not exist, skipping all lookups in it.
Info 44   [00:01:49.000] Directory '/node_modules' does not exist, skipping all lookups in it.
Info 45   [00:01:50.000] ======== Module name 'pkg1' was not resolved. ========
Info 46   [00:01:51.000] File '/src/project/node_modules/pkg0/package.json' exists according to earlier cached lookups.
Info 47   [00:01:52.000] DirectoryWatcher:: Added:: WatchInfo: /src/project/node_modules 1 undefined WatchType: node_modules for closed script infos and package.jsons affecting module specifier cache
Info 48   [00:01:53.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /src/project/node_modules 1 undefined WatchType: node_modules for closed script infos and package.jsons affecting module specifier cache
Info 49   [00:01:54.000] File '/src/project/package.json' does not exist according to earlier cached lookups.
Info 50   [00:01:55.000] File '/src/package.json' does not exist according to earlier cached lookups.
Info 51   [00:01:56.000] File '/package.json' does not exist according to earlier cached lookups.
Info 52   [00:01:57.000] Found 'package.json' at '/src/project/node_modules/pkg2/package.json'.
Info 53   [00:01:58.000] Reusing resolution of type reference directive 'pkg2' from '/src/project/fileWithTypeRefs.ts' found in cache from location '/src/project', it was successfully resolved to '/src/project/node_modules/pkg2/import.d.ts' with Package ID 'pkg2/import.d.ts@0.0.1'.
Info 54   [00:01:59.000] ======== Resolving type reference directive 'pkg3', containing file '/src/project/fileWithTypeRefs.ts', root directory '/src/project/node_modules/@types'. ========
Info 55   [00:02:00.000] Resolving with primary search path '/src/project/node_modules/@types'.
Info 56   [00:02:01.000] Looking up in 'node_modules' folder, initial location '/src/project'.
Info 57   [00:02:02.000] Found 'package.json' at '/src/project/node_modules/pkg3/package.json'.
Info 58   [00:02:03.000] Saw non-matching condition 'import'.
Info 59   [00:02:04.000] Matched 'exports' condition 'require'.
Info 60   [00:02:05.000] Using 'exports' subpath '.' with target './require.js'.
Info 61   [00:02:06.000] File name '/src/project/node_modules/pkg3/require.js' has a '.js' extension - stripping it.
Info 62   [00:02:07.000] File '/src/project/node_modules/pkg3/require.d.ts' does not exist.
Info 63   [00:02:08.000] File '/src/project/node_modules/@types/pkg3.d.ts' does not exist.
Info 64   [00:02:09.000] Directory '/src/node_modules' does not exist, skipping all lookups in it.
Info 65   [00:02:10.000] Directory '/node_modules' does not exist, skipping all lookups in it.
Info 66   [00:02:11.000] ======== Type reference directive 'pkg3' was not resolved. ========
Info 67   [00:02:12.000] File '/src/project/node_modules/pkg2/package.json' exists according to earlier cached lookups.
Info 68   [00:02:13.000] File '/src/project/package.json' does not exist according to earlier cached lookups.
Info 69   [00:02:14.000] File '/src/package.json' does not exist according to earlier cached lookups.
Info 70   [00:02:15.000] File '/package.json' does not exist according to earlier cached lookups.
Info 71   [00:02:16.000] File '/src/project/package.json' does not exist according to earlier cached lookups.
Info 72   [00:02:17.000] File '/src/package.json' does not exist according to earlier cached lookups.
Info 73   [00:02:18.000] File '/package.json' does not exist according to earlier cached lookups.
Info 74   [00:02:19.000] Reusing resolution of type reference directive 'pkg4' from '/src/project/__inferred type names__.ts' found in cache from location '/src/project', it was successfully resolved to '/src/project/node_modules/@types/pkg4/index.d.ts'.
Info 75   [00:02:20.000] File '/src/project/node_modules/@types/pkg4/package.json' does not exist.
Info 76   [00:02:21.000] File '/src/project/node_modules/@types/package.json' does not exist.
Info 77   [00:02:22.000] File '/src/project/node_modules/package.json' does not exist.
Info 78   [00:02:23.000] File '/src/project/package.json' does not exist according to earlier cached lookups.
Info 79   [00:02:24.000] File '/src/package.json' does not exist according to earlier cached lookups.
Info 80   [00:02:25.000] File '/package.json' does not exist according to earlier cached lookups.
Info 81   [00:02:26.000] File '/a/lib/package.json' does not exist.
Info 82   [00:02:27.000] File '/a/package.json' does not exist.
Info 83   [00:02:28.000] File '/package.json' does not exist according to earlier cached lookups.
Info 84   [00:02:29.000] FileWatcher:: Added:: WatchInfo: /a/lib/lib.d.ts 500 undefined WatchType: Closed Script info
Info 85   [00:02:30.000] FileWatcher:: Added:: WatchInfo: /src/project/node_modules/pkg0/package.json 2000 undefined Project: /src/project/tsconfig.json WatchType: File location affecting resolution
Info 86   [00:02:31.000] DirectoryWatcher:: Added:: WatchInfo: /src/project/node_modules 1 undefined Project: /src/project/tsconfig.json WatchType: Failed Lookup Locations
Info 87   [00:02:32.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /src/project/node_modules 1 undefined Project: /src/project/tsconfig.json WatchType: Failed Lookup Locations
Info 88   [00:02:33.000] DirectoryWatcher:: Added:: WatchInfo: /src/project 0 undefined Project: /src/project/tsconfig.json WatchType: Failed Lookup Locations
Info 89   [00:02:34.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /src/project 0 undefined Project: /src/project/tsconfig.json WatchType: Failed Lookup Locations
Info 90   [00:02:35.000] FileWatcher:: Added:: WatchInfo: /src/project/node_modules/pkg1/package.json 2000 undefined Project: /src/project/tsconfig.json WatchType: File location affecting resolution
Info 91   [00:02:36.000] FileWatcher:: Added:: WatchInfo: /src/project/node_modules/pkg2/package.json 2000 undefined Project: /src/project/tsconfig.json WatchType: File location affecting resolution
Info 92   [00:02:37.000] FileWatcher:: Added:: WatchInfo: /src/project/node_modules/pkg3/package.json 2000 undefined Project: /src/project/tsconfig.json WatchType: File location affecting resolution
Info 93   [00:02:38.000] FileWatcher:: Added:: WatchInfo: /src/project/node_modules/@types/pkg4/package.json 2000 undefined Project: /src/project/tsconfig.json WatchType: File location affecting resolution
Info 94   [00:02:39.000] FileWatcher:: Added:: WatchInfo: /src/project/node_modules/@types/package.json 2000 undefined Project: /src/project/tsconfig.json WatchType: File location affecting resolution
Info 95   [00:02:40.000] FileWatcher:: Added:: WatchInfo: /src/project/node_modules/package.json 2000 undefined Project: /src/project/tsconfig.json WatchType: File location affecting resolution
Info 96   [00:02:41.000] DirectoryWatcher:: Added:: WatchInfo: /src/project/node_modules/@types 1 undefined Project: /src/project/tsconfig.json WatchType: Type roots
Info 97   [00:02:42.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /src/project/node_modules/@types 1 undefined Project: /src/project/tsconfig.json WatchType: Type roots
Info 98   [00:02:43.000] Finishing updateGraphWorker: Project: /src/project/tsconfig.json Version: 1 structureChanged: true structureIsReused:: SafeModuleCache Elapsed:: *ms
Info 99   [00:02:44.000] Project '/src/project/tsconfig.json' (Configured)
Info 100  [00:02:45.000] 	Files (8)
	/a/lib/lib.d.ts
	/src/project/node_modules/pkg0/import.d.ts
	/src/project/fileWithImports.ts
	/src/project/node_modules/pkg2/import.d.ts
	/src/project/fileWithTypeRefs.ts
	/src/project/randomFileForImport.ts
	/src/project/randomFileForTypeRef.ts
	/src/project/node_modules/@types/pkg4/index.d.ts


	../../a/lib/lib.d.ts
	  Default library for target 'es5'
	node_modules/pkg0/import.d.ts
	  Imported via "pkg0" from file 'fileWithImports.ts' with packageId 'pkg0/import.d.ts@0.0.1'
	  File is CommonJS module because 'node_modules/pkg0/package.json' does not have field "type"
	fileWithImports.ts
	  Matched by include pattern '*.ts' in 'tsconfig.json'
	  File is CommonJS module because 'package.json' was not found
	node_modules/pkg2/import.d.ts
	  Type library referenced via 'pkg2' from file 'fileWithTypeRefs.ts' with packageId 'pkg2/import.d.ts@0.0.1'
	  File is CommonJS module because 'node_modules/pkg2/package.json' does not have field "type"
	fileWithTypeRefs.ts
	  Matched by include pattern '*.ts' in 'tsconfig.json'
	  File is CommonJS module because 'package.json' was not found
	randomFileForImport.ts
	  Matched by include pattern '*.ts' in 'tsconfig.json'
	  File is CommonJS module because 'package.json' was not found
	randomFileForTypeRef.ts
	  Matched by include pattern '*.ts' in 'tsconfig.json'
	  File is CommonJS module because 'package.json' was not found
	node_modules/@types/pkg4/index.d.ts
	  Entry point for implicit type library 'pkg4'
	  File is CommonJS module because 'package.json' was not found

Info 101  [00:02:46.000] -----------------------------------------------
Info 102  [00:02:47.000] Search path: /src/project
Info 103  [00:02:48.000] For info: /src/project/tsconfig.json :: No config files found.
Info 104  [00:02:49.000] Project '/src/project/tsconfig.json' (Configured)
Info 104  [00:02:50.000] 	Files (8)

Info 104  [00:02:51.000] -----------------------------------------------
Info 104  [00:02:52.000] Open files: 
Info 104  [00:02:53.000] 	FileName: /src/project/randomFileForImport.ts ProjectRootPath: undefined
Info 104  [00:02:54.000] 		Projects: /src/project/tsconfig.json
After request

PolledWatches::
/src/project/node_modules/@types/pkg4/package.json:
  {"pollingInterval":2000}
/src/project/node_modules/@types/package.json:
  {"pollingInterval":2000}
/src/project/node_modules/package.json:
  {"pollingInterval":2000}

FsWatches::
/src/project/tsconfig.json:
  {}
/src/project:
  {}
/src/project/filewithimports.ts:
  {}
/src/project/filewithtyperefs.ts:
  {}
/src/project/randomfilefortyperef.ts:
  {}
/a/lib/lib.d.ts:
  {}
/src/project/node_modules/pkg0/package.json:
  {}
/src/project/node_modules/pkg1/package.json:
  {}
/src/project/node_modules/pkg2/package.json:
  {}
/src/project/node_modules/pkg3/package.json:
  {}

FsWatchesRecursive::
/src/project/node_modules:
  {}
/src/project/node_modules/@types:
  {}

Info 104  [00:02:55.000] response:
    {
      "responseRequired": false
    }
Info 105  [00:02:56.000] request:
    {
      "command": "open",
      "arguments": {
        "file": "/src/project/randomFileForTypeRef.ts"
      },
      "seq": 2,
      "type": "request"
    }
Before request

PolledWatches::
/src/project/node_modules/@types/pkg4/package.json:
  {"pollingInterval":2000}
/src/project/node_modules/@types/package.json:
  {"pollingInterval":2000}
/src/project/node_modules/package.json:
  {"pollingInterval":2000}

FsWatches::
/src/project/tsconfig.json:
  {}
/src/project:
  {}
/src/project/filewithimports.ts:
  {}
/src/project/filewithtyperefs.ts:
  {}
/src/project/randomfilefortyperef.ts:
  {}
/a/lib/lib.d.ts:
  {}
/src/project/node_modules/pkg0/package.json:
  {}
/src/project/node_modules/pkg1/package.json:
  {}
/src/project/node_modules/pkg2/package.json:
  {}
/src/project/node_modules/pkg3/package.json:
  {}

FsWatchesRecursive::
/src/project/node_modules:
  {}
/src/project/node_modules/@types:
  {}

Info 106  [00:02:57.000] FileWatcher:: Close:: WatchInfo: /src/project/randomFileForTypeRef.ts 500 undefined WatchType: Closed Script info
Info 107  [00:02:58.000] Search path: /src/project
Info 108  [00:02:59.000] For info: /src/project/randomFileForTypeRef.ts :: Config file name: /src/project/tsconfig.json
Info 109  [00:03:00.000] Search path: /src/project
Info 110  [00:03:01.000] For info: /src/project/tsconfig.json :: No config files found.
Info 111  [00:03:02.000] Project '/src/project/tsconfig.json' (Configured)
Info 111  [00:03:03.000] 	Files (8)

Info 111  [00:03:04.000] -----------------------------------------------
Info 111  [00:03:05.000] Open files: 
Info 111  [00:03:06.000] 	FileName: /src/project/randomFileForImport.ts ProjectRootPath: undefined
Info 111  [00:03:07.000] 		Projects: /src/project/tsconfig.json
Info 111  [00:03:08.000] 	FileName: /src/project/randomFileForTypeRef.ts ProjectRootPath: undefined
Info 111  [00:03:09.000] 		Projects: /src/project/tsconfig.json
After request

PolledWatches::
/src/project/node_modules/@types/pkg4/package.json:
  {"pollingInterval":2000}
/src/project/node_modules/@types/package.json:
  {"pollingInterval":2000}
/src/project/node_modules/package.json:
  {"pollingInterval":2000}

FsWatches::
/src/project/tsconfig.json:
  {}
/src/project:
  {}
/src/project/filewithimports.ts:
  {}
/src/project/filewithtyperefs.ts:
  {}
/a/lib/lib.d.ts:
  {}
/src/project/node_modules/pkg0/package.json:
  {}
/src/project/node_modules/pkg1/package.json:
  {}
/src/project/node_modules/pkg2/package.json:
  {}
/src/project/node_modules/pkg3/package.json:
  {}

FsWatchesRecursive::
/src/project/node_modules:
  {}
/src/project/node_modules/@types:
  {}

Info 111  [00:03:10.000] response:
    {
      "responseRequired": false
    }
Info 112  [00:03:11.000] modify randomFileForImport by adding import
Info 113  [00:03:12.000] request:
    {
      "command": "change",
      "arguments": {
        "file": "/src/project/randomFileForImport.ts",
        "line": 1,
        "offset": 1,
        "endLine": 1,
        "endOffset": 1,
        "insertString": "import type { ImportInterface0 } from \"pkg0\" assert { \"resolution-mode\": \"import\" };\n"
      },
      "seq": 3,
      "type": "request"
    }
Before request

PolledWatches::
/src/project/node_modules/@types/pkg4/package.json:
  {"pollingInterval":2000}
/src/project/node_modules/@types/package.json:
  {"pollingInterval":2000}
/src/project/node_modules/package.json:
  {"pollingInterval":2000}

FsWatches::
/src/project/tsconfig.json:
  {}
/src/project:
  {}
/src/project/filewithimports.ts:
  {}
/src/project/filewithtyperefs.ts:
  {}
/a/lib/lib.d.ts:
  {}
/src/project/node_modules/pkg0/package.json:
  {}
/src/project/node_modules/pkg1/package.json:
  {}
/src/project/node_modules/pkg2/package.json:
  {}
/src/project/node_modules/pkg3/package.json:
  {}

FsWatchesRecursive::
/src/project/node_modules:
  {}
/src/project/node_modules/@types:
  {}

After request

PolledWatches::
/src/project/node_modules/@types/pkg4/package.json:
  {"pollingInterval":2000}
/src/project/node_modules/@types/package.json:
  {"pollingInterval":2000}
/src/project/node_modules/package.json:
  {"pollingInterval":2000}

FsWatches::
/src/project/tsconfig.json:
  {}
/src/project:
  {}
/src/project/filewithimports.ts:
  {}
/src/project/filewithtyperefs.ts:
  {}
/a/lib/lib.d.ts:
  {}
/src/project/node_modules/pkg0/package.json:
  {}
/src/project/node_modules/pkg1/package.json:
  {}
/src/project/node_modules/pkg2/package.json:
  {}
/src/project/node_modules/pkg3/package.json:
  {}

FsWatchesRecursive::
/src/project/node_modules:
  {}
/src/project/node_modules/@types:
  {}

Info 114  [00:03:13.000] response:
    {
      "responseRequired": false
    }
Info 115  [00:03:14.000] Starting updateGraphWorker: Project: /src/project/tsconfig.json
Info 116  [00:03:15.000] File '/a/lib/package.json' does not exist according to earlier cached lookups.
Info 117  [00:03:16.000] File '/a/package.json' does not exist according to earlier cached lookups.
Info 118  [00:03:17.000] File '/package.json' does not exist according to earlier cached lookups.
Info 119  [00:03:18.000] File '/src/project/node_modules/pkg0/package.json' exists according to earlier cached lookups.
Info 120  [00:03:19.000] File '/src/project/package.json' does not exist according to earlier cached lookups.
Info 121  [00:03:20.000] File '/src/package.json' does not exist according to earlier cached lookups.
Info 122  [00:03:21.000] File '/package.json' does not exist according to earlier cached lookups.
Info 123  [00:03:22.000] File '/src/project/node_modules/pkg2/package.json' exists according to earlier cached lookups.
Info 124  [00:03:23.000] File '/src/project/package.json' does not exist according to earlier cached lookups.
Info 125  [00:03:24.000] File '/src/package.json' does not exist according to earlier cached lookups.
Info 126  [00:03:25.000] File '/package.json' does not exist according to earlier cached lookups.
Info 127  [00:03:26.000] File '/src/project/package.json' does not exist according to earlier cached lookups.
Info 128  [00:03:27.000] File '/src/package.json' does not exist according to earlier cached lookups.
Info 129  [00:03:28.000] File '/package.json' does not exist according to earlier cached lookups.
Info 130  [00:03:29.000] File '/src/project/package.json' does not exist according to earlier cached lookups.
Info 131  [00:03:30.000] File '/src/package.json' does not exist according to earlier cached lookups.
Info 132  [00:03:31.000] File '/package.json' does not exist according to earlier cached lookups.
Info 133  [00:03:32.000] File '/src/project/node_modules/@types/pkg4/package.json' does not exist according to earlier cached lookups.
Info 134  [00:03:33.000] File '/src/project/node_modules/@types/package.json' does not exist according to earlier cached lookups.
Info 135  [00:03:34.000] File '/src/project/node_modules/package.json' does not exist according to earlier cached lookups.
Info 136  [00:03:35.000] File '/src/project/package.json' does not exist according to earlier cached lookups.
Info 137  [00:03:36.000] File '/src/package.json' does not exist according to earlier cached lookups.
Info 138  [00:03:37.000] File '/package.json' does not exist according to earlier cached lookups.
Info 139  [00:03:38.000] File '/src/project/package.json' does not exist according to earlier cached lookups.
Info 140  [00:03:39.000] File '/src/package.json' does not exist according to earlier cached lookups.
Info 141  [00:03:40.000] File '/package.json' does not exist according to earlier cached lookups.
Info 142  [00:03:41.000] Reusing resolution of module 'pkg0' from '/src/project/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/import.d.ts' with Package ID 'pkg0/import.d.ts@0.0.1'.
Info 143  [00:03:42.000] Reusing resolution of module 'pkg1' from '/src/project/fileWithImports.ts' of old program, it was not resolved.
Info 144  [00:03:43.000] File '/src/project/node_modules/pkg0/package.json' exists according to earlier cached lookups.
Info 145  [00:03:44.000] File '/src/project/package.json' does not exist according to earlier cached lookups.
Info 146  [00:03:45.000] File '/src/package.json' does not exist according to earlier cached lookups.
Info 147  [00:03:46.000] File '/package.json' does not exist according to earlier cached lookups.
Info 148  [00:03:47.000] Reusing resolution of type reference directive 'pkg2' from '/src/project/fileWithTypeRefs.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg2/import.d.ts' with Package ID 'pkg2/import.d.ts@0.0.1'.
Info 149  [00:03:48.000] Reusing resolution of type reference directive 'pkg3' from '/src/project/fileWithTypeRefs.ts' of old program, it was not resolved.
Info 150  [00:03:49.000] File '/src/project/node_modules/pkg2/package.json' exists according to earlier cached lookups.
Info 151  [00:03:50.000] File '/src/project/package.json' does not exist according to earlier cached lookups.
Info 152  [00:03:51.000] File '/src/package.json' does not exist according to earlier cached lookups.
Info 153  [00:03:52.000] File '/package.json' does not exist according to earlier cached lookups.
Info 154  [00:03:53.000] ======== Resolving module 'pkg0' from '/src/project/randomFileForImport.ts'. ========
Info 155  [00:03:54.000] Resolution for module 'pkg0' was found in cache from location '/src/project'.
Info 156  [00:03:55.000] ======== Module name 'pkg0' was successfully resolved to '/src/project/node_modules/pkg0/import.d.ts' with Package ID 'pkg0/import.d.ts@0.0.1'. ========
Info 157  [00:03:56.000] File '/src/project/package.json' does not exist according to earlier cached lookups.
Info 158  [00:03:57.000] File '/src/package.json' does not exist according to earlier cached lookups.
Info 159  [00:03:58.000] File '/package.json' does not exist according to earlier cached lookups.
Info 160  [00:03:59.000] Reusing resolution of type reference directive 'pkg4' from '/src/project/__inferred type names__.ts' of old program, it was successfully resolved to '/src/project/node_modules/@types/pkg4/index.d.ts'.
Info 161  [00:04:00.000] File '/src/project/node_modules/@types/pkg4/package.json' does not exist according to earlier cached lookups.
Info 162  [00:04:01.000] File '/src/project/node_modules/@types/package.json' does not exist according to earlier cached lookups.
Info 163  [00:04:02.000] File '/src/project/node_modules/package.json' does not exist according to earlier cached lookups.
Info 164  [00:04:03.000] File '/src/project/package.json' does not exist according to earlier cached lookups.
Info 165  [00:04:04.000] File '/src/package.json' does not exist according to earlier cached lookups.
Info 166  [00:04:05.000] File '/package.json' does not exist according to earlier cached lookups.
Info 167  [00:04:06.000] File '/a/lib/package.json' does not exist according to earlier cached lookups.
Info 168  [00:04:07.000] File '/a/package.json' does not exist according to earlier cached lookups.
Info 169  [00:04:08.000] File '/package.json' does not exist according to earlier cached lookups.
Info 170  [00:04:09.000] Finishing updateGraphWorker: Project: /src/project/tsconfig.json Version: 2 structureChanged: true structureIsReused:: SafeModules Elapsed:: *ms
Info 171  [00:04:10.000] Different program with same set of files
Info 172  [00:04:11.000] modify randomFileForTypeRef by adding typeRef
Info 173  [00:04:12.000] request:
    {
      "command": "change",
      "arguments": {
        "file": "/src/project/randomFileForTypeRef.ts",
        "line": 1,
        "offset": 1,
        "endLine": 1,
        "endOffset": 1,
        "insertString": "/// <reference types=\"pkg2\" resolution-mode=\"import\"/>\n"
      },
      "seq": 4,
      "type": "request"
    }
Before request

PolledWatches::
/src/project/node_modules/@types/pkg4/package.json:
  {"pollingInterval":2000}
/src/project/node_modules/@types/package.json:
  {"pollingInterval":2000}
/src/project/node_modules/package.json:
  {"pollingInterval":2000}

FsWatches::
/src/project/tsconfig.json:
  {}
/src/project:
  {}
/src/project/filewithimports.ts:
  {}
/src/project/filewithtyperefs.ts:
  {}
/a/lib/lib.d.ts:
  {}
/src/project/node_modules/pkg0/package.json:
  {}
/src/project/node_modules/pkg1/package.json:
  {}
/src/project/node_modules/pkg2/package.json:
  {}
/src/project/node_modules/pkg3/package.json:
  {}

FsWatchesRecursive::
/src/project/node_modules:
  {}
/src/project/node_modules/@types:
  {}

After request

PolledWatches::
/src/project/node_modules/@types/pkg4/package.json:
  {"pollingInterval":2000}
/src/project/node_modules/@types/package.json:
  {"pollingInterval":2000}
/src/project/node_modules/package.json:
  {"pollingInterval":2000}

FsWatches::
/src/project/tsconfig.json:
  {}
/src/project:
  {}
/src/project/filewithimports.ts:
  {}
/src/project/filewithtyperefs.ts:
  {}
/a/lib/lib.d.ts:
  {}
/src/project/node_modules/pkg0/package.json:
  {}
/src/project/node_modules/pkg1/package.json:
  {}
/src/project/node_modules/pkg2/package.json:
  {}
/src/project/node_modules/pkg3/package.json:
  {}

FsWatchesRecursive::
/src/project/node_modules:
  {}
/src/project/node_modules/@types:
  {}

Info 174  [00:04:13.000] response:
    {
      "responseRequired": false
    }
Info 175  [00:04:14.000] Starting updateGraphWorker: Project: /src/project/tsconfig.json
Info 176  [00:04:15.000] File '/a/lib/package.json' does not exist according to earlier cached lookups.
Info 177  [00:04:16.000] File '/a/package.json' does not exist according to earlier cached lookups.
Info 178  [00:04:17.000] File '/package.json' does not exist according to earlier cached lookups.
Info 179  [00:04:18.000] File '/src/project/node_modules/pkg0/package.json' exists according to earlier cached lookups.
Info 180  [00:04:19.000] File '/src/project/package.json' does not exist according to earlier cached lookups.
Info 181  [00:04:20.000] File '/src/package.json' does not exist according to earlier cached lookups.
Info 182  [00:04:21.000] File '/package.json' does not exist according to earlier cached lookups.
Info 183  [00:04:22.000] File '/src/project/node_modules/pkg2/package.json' exists according to earlier cached lookups.
Info 184  [00:04:23.000] File '/src/project/package.json' does not exist according to earlier cached lookups.
Info 185  [00:04:24.000] File '/src/package.json' does not exist according to earlier cached lookups.
Info 186  [00:04:25.000] File '/package.json' does not exist according to earlier cached lookups.
Info 187  [00:04:26.000] File '/src/project/package.json' does not exist according to earlier cached lookups.
Info 188  [00:04:27.000] File '/src/package.json' does not exist according to earlier cached lookups.
Info 189  [00:04:28.000] File '/package.json' does not exist according to earlier cached lookups.
Info 190  [00:04:29.000] File '/src/project/package.json' does not exist according to earlier cached lookups.
Info 191  [00:04:30.000] File '/src/package.json' does not exist according to earlier cached lookups.
Info 192  [00:04:31.000] File '/package.json' does not exist according to earlier cached lookups.
Info 193  [00:04:32.000] File '/src/project/node_modules/@types/pkg4/package.json' does not exist according to earlier cached lookups.
Info 194  [00:04:33.000] File '/src/project/node_modules/@types/package.json' does not exist according to earlier cached lookups.
Info 195  [00:04:34.000] File '/src/project/node_modules/package.json' does not exist according to earlier cached lookups.
Info 196  [00:04:35.000] File '/src/project/package.json' does not exist according to earlier cached lookups.
Info 197  [00:04:36.000] File '/src/package.json' does not exist according to earlier cached lookups.
Info 198  [00:04:37.000] File '/package.json' does not exist according to earlier cached lookups.
Info 199  [00:04:38.000] File '/src/project/package.json' does not exist according to earlier cached lookups.
Info 200  [00:04:39.000] File '/src/package.json' does not exist according to earlier cached lookups.
Info 201  [00:04:40.000] File '/package.json' does not exist according to earlier cached lookups.
Info 202  [00:04:41.000] Reusing resolution of module 'pkg0' from '/src/project/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/import.d.ts' with Package ID 'pkg0/import.d.ts@0.0.1'.
Info 203  [00:04:42.000] Reusing resolution of module 'pkg1' from '/src/project/fileWithImports.ts' of old program, it was not resolved.
Info 204  [00:04:43.000] File '/src/project/node_modules/pkg0/package.json' exists according to earlier cached lookups.
Info 205  [00:04:44.000] File '/src/project/package.json' does not exist according to earlier cached lookups.
Info 206  [00:04:45.000] File '/src/package.json' does not exist according to earlier cached lookups.
Info 207  [00:04:46.000] File '/package.json' does not exist according to earlier cached lookups.
Info 208  [00:04:47.000] Reusing resolution of type reference directive 'pkg2' from '/src/project/fileWithTypeRefs.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg2/import.d.ts' with Package ID 'pkg2/import.d.ts@0.0.1'.
Info 209  [00:04:48.000] Reusing resolution of type reference directive 'pkg3' from '/src/project/fileWithTypeRefs.ts' of old program, it was not resolved.
Info 210  [00:04:49.000] File '/src/project/node_modules/pkg2/package.json' exists according to earlier cached lookups.
Info 211  [00:04:50.000] File '/src/project/package.json' does not exist according to earlier cached lookups.
Info 212  [00:04:51.000] File '/src/package.json' does not exist according to earlier cached lookups.
Info 213  [00:04:52.000] File '/package.json' does not exist according to earlier cached lookups.
Info 214  [00:04:53.000] Reusing resolution of module 'pkg0' from '/src/project/randomFileForImport.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/import.d.ts' with Package ID 'pkg0/import.d.ts@0.0.1'.
Info 215  [00:04:54.000] File '/src/project/package.json' does not exist according to earlier cached lookups.
Info 216  [00:04:55.000] File '/src/package.json' does not exist according to earlier cached lookups.
Info 217  [00:04:56.000] File '/package.json' does not exist according to earlier cached lookups.
Info 218  [00:04:57.000] ======== Resolving type reference directive 'pkg2', containing file '/src/project/randomFileForTypeRef.ts'. ========
Info 219  [00:04:58.000] Resolution for type reference directive 'pkg2' was found in cache from location '/src/project'.
Info 220  [00:04:59.000] ======== Type reference directive 'pkg2' was successfully resolved to '/src/project/node_modules/pkg2/import.d.ts' with Package ID 'pkg2/import.d.ts@0.0.1', primary: false. ========
Info 221  [00:05:00.000] Reusing resolution of type reference directive 'pkg4' from '/src/project/__inferred type names__.ts' of old program, it was successfully resolved to '/src/project/node_modules/@types/pkg4/index.d.ts'.
Info 222  [00:05:01.000] File '/src/project/node_modules/@types/pkg4/package.json' does not exist according to earlier cached lookups.
Info 223  [00:05:02.000] File '/src/project/node_modules/@types/package.json' does not exist according to earlier cached lookups.
Info 224  [00:05:03.000] File '/src/project/node_modules/package.json' does not exist according to earlier cached lookups.
Info 225  [00:05:04.000] File '/src/project/package.json' does not exist according to earlier cached lookups.
Info 226  [00:05:05.000] File '/src/package.json' does not exist according to earlier cached lookups.
Info 227  [00:05:06.000] File '/package.json' does not exist according to earlier cached lookups.
Info 228  [00:05:07.000] File '/a/lib/package.json' does not exist according to earlier cached lookups.
Info 229  [00:05:08.000] File '/a/package.json' does not exist according to earlier cached lookups.
Info 230  [00:05:09.000] File '/package.json' does not exist according to earlier cached lookups.
Info 231  [00:05:10.000] Finishing updateGraphWorker: Project: /src/project/tsconfig.json Version: 3 structureChanged: true structureIsReused:: SafeModules Elapsed:: *ms
Info 232  [00:05:11.000] Different program with same set of files
Info 233  [00:05:12.000] write file not resolved by import
Info 234  [00:05:15.000] DirectoryWatcher:: Triggered with /src/project/node_modules/pkg1/require.d.ts :: WatchInfo: /src/project/node_modules 1 undefined WatchType: node_modules for closed script infos and package.jsons affecting module specifier cache
Info 235  [00:05:16.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /src/project/node_modules/pkg1/require.d.ts :: WatchInfo: /src/project/node_modules 1 undefined WatchType: node_modules for closed script infos and package.jsons affecting module specifier cache
Info 236  [00:05:17.000] DirectoryWatcher:: Triggered with /src/project/node_modules/pkg1/require.d.ts :: WatchInfo: /src/project/node_modules 1 undefined Project: /src/project/tsconfig.json WatchType: Failed Lookup Locations
Info 237  [00:05:18.000] Scheduled: /src/project/tsconfig.jsonFailedLookupInvalidation
Info 238  [00:05:19.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /src/project/node_modules/pkg1/require.d.ts :: WatchInfo: /src/project/node_modules 1 undefined Project: /src/project/tsconfig.json WatchType: Failed Lookup Locations
Before running timeout callbacks
//// [/src/project/node_modules/pkg1/require.d.ts]
export interface RequireInterface1 {}


PolledWatches::
/src/project/node_modules/@types/pkg4/package.json:
  {"pollingInterval":2000}
/src/project/node_modules/@types/package.json:
  {"pollingInterval":2000}
/src/project/node_modules/package.json:
  {"pollingInterval":2000}

FsWatches::
/src/project/tsconfig.json:
  {}
/src/project:
  {}
/src/project/filewithimports.ts:
  {}
/src/project/filewithtyperefs.ts:
  {}
/a/lib/lib.d.ts:
  {}
/src/project/node_modules/pkg0/package.json:
  {}
/src/project/node_modules/pkg1/package.json:
  {}
/src/project/node_modules/pkg2/package.json:
  {}
/src/project/node_modules/pkg3/package.json:
  {}

FsWatchesRecursive::
/src/project/node_modules:
  {}
/src/project/node_modules/@types:
  {}

Info 239  [00:05:20.000] Running: /src/project/tsconfig.jsonFailedLookupInvalidation
Info 240  [00:05:21.000] Scheduled: /src/project/tsconfig.json
Info 241  [00:05:22.000] Scheduled: *ensureProjectForOpenFiles*
After running timeout callbacks

PolledWatches::
/src/project/node_modules/@types/pkg4/package.json:
  {"pollingInterval":2000}
/src/project/node_modules/@types/package.json:
  {"pollingInterval":2000}
/src/project/node_modules/package.json:
  {"pollingInterval":2000}

FsWatches::
/src/project/tsconfig.json:
  {}
/src/project:
  {}
/src/project/filewithimports.ts:
  {}
/src/project/filewithtyperefs.ts:
  {}
/a/lib/lib.d.ts:
  {}
/src/project/node_modules/pkg0/package.json:
  {}
/src/project/node_modules/pkg1/package.json:
  {}
/src/project/node_modules/pkg2/package.json:
  {}
/src/project/node_modules/pkg3/package.json:
  {}

FsWatchesRecursive::
/src/project/node_modules:
  {}
/src/project/node_modules/@types:
  {}

Before running timeout callbacks

PolledWatches::
/src/project/node_modules/@types/pkg4/package.json:
  {"pollingInterval":2000}
/src/project/node_modules/@types/package.json:
  {"pollingInterval":2000}
/src/project/node_modules/package.json:
  {"pollingInterval":2000}

FsWatches::
/src/project/tsconfig.json:
  {}
/src/project:
  {}
/src/project/filewithimports.ts:
  {}
/src/project/filewithtyperefs.ts:
  {}
/a/lib/lib.d.ts:
  {}
/src/project/node_modules/pkg0/package.json:
  {}
/src/project/node_modules/pkg1/package.json:
  {}
/src/project/node_modules/pkg2/package.json:
  {}
/src/project/node_modules/pkg3/package.json:
  {}

FsWatchesRecursive::
/src/project/node_modules:
  {}
/src/project/node_modules/@types:
  {}

Info 242  [00:05:23.000] Running: /src/project/tsconfig.json
Info 243  [00:05:24.000] Starting updateGraphWorker: Project: /src/project/tsconfig.json
Info 244  [00:05:25.000] File '/a/lib/package.json' does not exist according to earlier cached lookups.
Info 245  [00:05:26.000] File '/a/package.json' does not exist according to earlier cached lookups.
Info 246  [00:05:27.000] File '/package.json' does not exist according to earlier cached lookups.
Info 247  [00:05:28.000] File '/src/project/node_modules/pkg0/package.json' exists according to earlier cached lookups.
Info 248  [00:05:29.000] File '/src/project/package.json' does not exist according to earlier cached lookups.
Info 249  [00:05:30.000] File '/src/package.json' does not exist according to earlier cached lookups.
Info 250  [00:05:31.000] File '/package.json' does not exist according to earlier cached lookups.
Info 251  [00:05:32.000] File '/src/project/node_modules/pkg2/package.json' exists according to earlier cached lookups.
Info 252  [00:05:33.000] File '/src/project/package.json' does not exist according to earlier cached lookups.
Info 253  [00:05:34.000] File '/src/package.json' does not exist according to earlier cached lookups.
Info 254  [00:05:35.000] File '/package.json' does not exist according to earlier cached lookups.
Info 255  [00:05:36.000] File '/src/project/package.json' does not exist according to earlier cached lookups.
Info 256  [00:05:37.000] File '/src/package.json' does not exist according to earlier cached lookups.
Info 257  [00:05:38.000] File '/package.json' does not exist according to earlier cached lookups.
Info 258  [00:05:39.000] File '/src/project/package.json' does not exist according to earlier cached lookups.
Info 259  [00:05:40.000] File '/src/package.json' does not exist according to earlier cached lookups.
Info 260  [00:05:41.000] File '/package.json' does not exist according to earlier cached lookups.
Info 261  [00:05:42.000] File '/src/project/node_modules/@types/pkg4/package.json' does not exist according to earlier cached lookups.
Info 262  [00:05:43.000] File '/src/project/node_modules/@types/package.json' does not exist according to earlier cached lookups.
Info 263  [00:05:44.000] File '/src/project/node_modules/package.json' does not exist according to earlier cached lookups.
Info 264  [00:05:45.000] File '/src/project/package.json' does not exist according to earlier cached lookups.
Info 265  [00:05:46.000] File '/src/package.json' does not exist according to earlier cached lookups.
Info 266  [00:05:47.000] File '/package.json' does not exist according to earlier cached lookups.
Info 267  [00:05:48.000] File '/src/project/package.json' does not exist according to earlier cached lookups.
Info 268  [00:05:49.000] File '/src/package.json' does not exist according to earlier cached lookups.
Info 269  [00:05:50.000] File '/package.json' does not exist according to earlier cached lookups.
Info 270  [00:05:51.000] Reusing resolution of module 'pkg0' from '/src/project/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/import.d.ts' with Package ID 'pkg0/import.d.ts@0.0.1'.
Info 271  [00:05:52.000] ======== Resolving module 'pkg1' from '/src/project/fileWithImports.ts'. ========
Info 272  [00:05:53.000] Explicitly specified module resolution kind: 'Node16'.
Info 273  [00:05:54.000] Resolving in CJS mode with conditions 'node', 'require', 'types'.
Info 274  [00:05:55.000] File '/src/project/package.json' does not exist according to earlier cached lookups.
Info 275  [00:05:56.000] File '/src/package.json' does not exist according to earlier cached lookups.
Info 276  [00:05:57.000] File '/package.json' does not exist according to earlier cached lookups.
Info 277  [00:05:58.000] Loading module 'pkg1' from 'node_modules' folder, target file types: TypeScript, JavaScript, Declaration.
Info 278  [00:05:59.000] Found 'package.json' at '/src/project/node_modules/pkg1/package.json'.
Info 279  [00:06:00.000] Saw non-matching condition 'import'.
Info 280  [00:06:01.000] Matched 'exports' condition 'require'.
Info 281  [00:06:02.000] Using 'exports' subpath '.' with target './require.js'.
Info 282  [00:06:03.000] File name '/src/project/node_modules/pkg1/require.js' has a '.js' extension - stripping it.
Info 283  [00:06:04.000] File '/src/project/node_modules/pkg1/require.ts' does not exist.
Info 284  [00:06:05.000] File '/src/project/node_modules/pkg1/require.tsx' does not exist.
Info 285  [00:06:06.000] File '/src/project/node_modules/pkg1/require.d.ts' exist - use it as a name resolution result.
Info 286  [00:06:07.000] Resolving real path for '/src/project/node_modules/pkg1/require.d.ts', result '/src/project/node_modules/pkg1/require.d.ts'.
Info 287  [00:06:08.000] ======== Module name 'pkg1' was successfully resolved to '/src/project/node_modules/pkg1/require.d.ts' with Package ID 'pkg1/require.d.ts@0.0.1'. ========
Info 288  [00:06:09.000] File '/src/project/node_modules/pkg0/package.json' exists according to earlier cached lookups.
Info 289  [00:06:10.000] File '/src/project/node_modules/pkg1/package.json' exists according to earlier cached lookups.
Info 290  [00:06:11.000] File '/src/project/package.json' does not exist according to earlier cached lookups.
Info 291  [00:06:12.000] File '/src/package.json' does not exist according to earlier cached lookups.
Info 292  [00:06:13.000] File '/package.json' does not exist according to earlier cached lookups.
Info 293  [00:06:14.000] Reusing resolution of type reference directive 'pkg2' from '/src/project/fileWithTypeRefs.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg2/import.d.ts' with Package ID 'pkg2/import.d.ts@0.0.1'.
Info 294  [00:06:15.000] Reusing resolution of type reference directive 'pkg3' from '/src/project/fileWithTypeRefs.ts' of old program, it was not resolved.
Info 295  [00:06:16.000] File '/src/project/node_modules/pkg2/package.json' exists according to earlier cached lookups.
Info 296  [00:06:17.000] File '/src/project/package.json' does not exist according to earlier cached lookups.
Info 297  [00:06:18.000] File '/src/package.json' does not exist according to earlier cached lookups.
Info 298  [00:06:19.000] File '/package.json' does not exist according to earlier cached lookups.
Info 299  [00:06:20.000] Reusing resolution of module 'pkg0' from '/src/project/randomFileForImport.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/import.d.ts' with Package ID 'pkg0/import.d.ts@0.0.1'.
Info 300  [00:06:21.000] File '/src/project/package.json' does not exist according to earlier cached lookups.
Info 301  [00:06:22.000] File '/src/package.json' does not exist according to earlier cached lookups.
Info 302  [00:06:23.000] File '/package.json' does not exist according to earlier cached lookups.
Info 303  [00:06:24.000] Reusing resolution of type reference directive 'pkg2' from '/src/project/randomFileForTypeRef.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg2/import.d.ts' with Package ID 'pkg2/import.d.ts@0.0.1'.
Info 304  [00:06:25.000] Reusing resolution of type reference directive 'pkg4' from '/src/project/__inferred type names__.ts' of old program, it was successfully resolved to '/src/project/node_modules/@types/pkg4/index.d.ts'.
Info 305  [00:06:26.000] File '/src/project/node_modules/@types/pkg4/package.json' does not exist according to earlier cached lookups.
Info 306  [00:06:27.000] File '/src/project/node_modules/@types/package.json' does not exist according to earlier cached lookups.
Info 307  [00:06:28.000] File '/src/project/node_modules/package.json' does not exist according to earlier cached lookups.
Info 308  [00:06:29.000] File '/src/project/package.json' does not exist according to earlier cached lookups.
Info 309  [00:06:30.000] File '/src/package.json' does not exist according to earlier cached lookups.
Info 310  [00:06:31.000] File '/package.json' does not exist according to earlier cached lookups.
Info 311  [00:06:32.000] File '/a/lib/package.json' does not exist according to earlier cached lookups.
Info 312  [00:06:33.000] File '/a/package.json' does not exist according to earlier cached lookups.
Info 313  [00:06:34.000] File '/package.json' does not exist according to earlier cached lookups.
Info 314  [00:06:35.000] DirectoryWatcher:: Close:: WatchInfo: /src/project 0 undefined Project: /src/project/tsconfig.json WatchType: Failed Lookup Locations
Info 315  [00:06:36.000] Elapsed:: *ms DirectoryWatcher:: Close:: WatchInfo: /src/project 0 undefined Project: /src/project/tsconfig.json WatchType: Failed Lookup Locations
Info 316  [00:06:37.000] Finishing updateGraphWorker: Project: /src/project/tsconfig.json Version: 4 structureChanged: true structureIsReused:: SafeModules Elapsed:: *ms
Info 317  [00:06:38.000] Project '/src/project/tsconfig.json' (Configured)
Info 318  [00:06:39.000] 	Files (9)
	/a/lib/lib.d.ts
	/src/project/node_modules/pkg0/import.d.ts
	/src/project/node_modules/pkg1/require.d.ts
	/src/project/fileWithImports.ts
	/src/project/node_modules/pkg2/import.d.ts
	/src/project/fileWithTypeRefs.ts
	/src/project/randomFileForImport.ts
	/src/project/randomFileForTypeRef.ts
	/src/project/node_modules/@types/pkg4/index.d.ts


	../../a/lib/lib.d.ts
	  Default library for target 'es5'
	node_modules/pkg0/import.d.ts
	  Imported via "pkg0" from file 'fileWithImports.ts' with packageId 'pkg0/import.d.ts@0.0.1'
	  Imported via "pkg0" from file 'randomFileForImport.ts' with packageId 'pkg0/import.d.ts@0.0.1'
	  File is CommonJS module because 'node_modules/pkg0/package.json' does not have field "type"
	node_modules/pkg1/require.d.ts
	  Imported via "pkg1" from file 'fileWithImports.ts' with packageId 'pkg1/require.d.ts@0.0.1'
	  File is CommonJS module because 'node_modules/pkg1/package.json' does not have field "type"
	fileWithImports.ts
	  Matched by include pattern '*.ts' in 'tsconfig.json'
	  File is CommonJS module because 'package.json' was not found
	node_modules/pkg2/import.d.ts
	  Type library referenced via 'pkg2' from file 'fileWithTypeRefs.ts' with packageId 'pkg2/import.d.ts@0.0.1'
	  File is CommonJS module because 'node_modules/pkg2/package.json' does not have field "type"
	fileWithTypeRefs.ts
	  Matched by include pattern '*.ts' in 'tsconfig.json'
	  File is CommonJS module because 'package.json' was not found
	randomFileForImport.ts
	  Matched by include pattern '*.ts' in 'tsconfig.json'
	  File is CommonJS module because 'package.json' was not found
	randomFileForTypeRef.ts
	  Matched by include pattern '*.ts' in 'tsconfig.json'
	  File is CommonJS module because 'package.json' was not found
	node_modules/@types/pkg4/index.d.ts
	  Entry point for implicit type library 'pkg4'
	  File is CommonJS module because 'package.json' was not found

Info 319  [00:06:40.000] -----------------------------------------------
Info 320  [00:06:41.000] Running: *ensureProjectForOpenFiles*
Info 321  [00:06:42.000] Before ensureProjectForOpenFiles:
Info 322  [00:06:43.000] Project '/src/project/tsconfig.json' (Configured)
Info 322  [00:06:44.000] 	Files (9)

Info 322  [00:06:45.000] -----------------------------------------------
Info 322  [00:06:46.000] Open files: 
Info 322  [00:06:47.000] 	FileName: /src/project/randomFileForImport.ts ProjectRootPath: undefined
Info 322  [00:06:48.000] 		Projects: /src/project/tsconfig.json
Info 322  [00:06:49.000] 	FileName: /src/project/randomFileForTypeRef.ts ProjectRootPath: undefined
Info 322  [00:06:50.000] 		Projects: /src/project/tsconfig.json
Info 322  [00:06:51.000] After ensureProjectForOpenFiles:
Info 323  [00:06:52.000] Project '/src/project/tsconfig.json' (Configured)
Info 323  [00:06:53.000] 	Files (9)

Info 323  [00:06:54.000] -----------------------------------------------
Info 323  [00:06:55.000] Open files: 
Info 323  [00:06:56.000] 	FileName: /src/project/randomFileForImport.ts ProjectRootPath: undefined
Info 323  [00:06:57.000] 		Projects: /src/project/tsconfig.json
Info 323  [00:06:58.000] 	FileName: /src/project/randomFileForTypeRef.ts ProjectRootPath: undefined
Info 323  [00:06:59.000] 		Projects: /src/project/tsconfig.json
After running timeout callbacks

PolledWatches::
/src/project/node_modules/@types/pkg4/package.json:
  {"pollingInterval":2000}
/src/project/node_modules/@types/package.json:
  {"pollingInterval":2000}
/src/project/node_modules/package.json:
  {"pollingInterval":2000}

FsWatches::
/src/project/tsconfig.json:
  {}
/src/project:
  {}
/src/project/filewithimports.ts:
  {}
/src/project/filewithtyperefs.ts:
  {}
/a/lib/lib.d.ts:
  {}
/src/project/node_modules/pkg0/package.json:
  {}
/src/project/node_modules/pkg1/package.json:
  {}
/src/project/node_modules/pkg2/package.json:
  {}
/src/project/node_modules/pkg3/package.json:
  {}

FsWatchesRecursive::
/src/project/node_modules:
  {}
/src/project/node_modules/@types:
  {}

Info 323  [00:07:00.000] write file not resolved by typeRef
Info 324  [00:07:03.000] DirectoryWatcher:: Triggered with /src/project/node_modules/pkg3/require.d.ts :: WatchInfo: /src/project/node_modules 1 undefined WatchType: node_modules for closed script infos and package.jsons affecting module specifier cache
Info 325  [00:07:04.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /src/project/node_modules/pkg3/require.d.ts :: WatchInfo: /src/project/node_modules 1 undefined WatchType: node_modules for closed script infos and package.jsons affecting module specifier cache
Info 326  [00:07:05.000] DirectoryWatcher:: Triggered with /src/project/node_modules/pkg3/require.d.ts :: WatchInfo: /src/project/node_modules 1 undefined Project: /src/project/tsconfig.json WatchType: Failed Lookup Locations
Info 327  [00:07:06.000] Scheduled: /src/project/tsconfig.jsonFailedLookupInvalidation
Info 328  [00:07:07.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /src/project/node_modules/pkg3/require.d.ts :: WatchInfo: /src/project/node_modules 1 undefined Project: /src/project/tsconfig.json WatchType: Failed Lookup Locations
Before running timeout callbacks
//// [/src/project/node_modules/pkg3/require.d.ts]
export interface RequireInterface3 {}


PolledWatches::
/src/project/node_modules/@types/pkg4/package.json:
  {"pollingInterval":2000}
/src/project/node_modules/@types/package.json:
  {"pollingInterval":2000}
/src/project/node_modules/package.json:
  {"pollingInterval":2000}

FsWatches::
/src/project/tsconfig.json:
  {}
/src/project:
  {}
/src/project/filewithimports.ts:
  {}
/src/project/filewithtyperefs.ts:
  {}
/a/lib/lib.d.ts:
  {}
/src/project/node_modules/pkg0/package.json:
  {}
/src/project/node_modules/pkg1/package.json:
  {}
/src/project/node_modules/pkg2/package.json:
  {}
/src/project/node_modules/pkg3/package.json:
  {}

FsWatchesRecursive::
/src/project/node_modules:
  {}
/src/project/node_modules/@types:
  {}

Info 329  [00:07:08.000] Running: /src/project/tsconfig.jsonFailedLookupInvalidation
Info 330  [00:07:09.000] Scheduled: /src/project/tsconfig.json
Info 331  [00:07:10.000] Scheduled: *ensureProjectForOpenFiles*
After running timeout callbacks

PolledWatches::
/src/project/node_modules/@types/pkg4/package.json:
  {"pollingInterval":2000}
/src/project/node_modules/@types/package.json:
  {"pollingInterval":2000}
/src/project/node_modules/package.json:
  {"pollingInterval":2000}

FsWatches::
/src/project/tsconfig.json:
  {}
/src/project:
  {}
/src/project/filewithimports.ts:
  {}
/src/project/filewithtyperefs.ts:
  {}
/a/lib/lib.d.ts:
  {}
/src/project/node_modules/pkg0/package.json:
  {}
/src/project/node_modules/pkg1/package.json:
  {}
/src/project/node_modules/pkg2/package.json:
  {}
/src/project/node_modules/pkg3/package.json:
  {}

FsWatchesRecursive::
/src/project/node_modules:
  {}
/src/project/node_modules/@types:
  {}

Before running timeout callbacks

PolledWatches::
/src/project/node_modules/@types/pkg4/package.json:
  {"pollingInterval":2000}
/src/project/node_modules/@types/package.json:
  {"pollingInterval":2000}
/src/project/node_modules/package.json:
  {"pollingInterval":2000}

FsWatches::
/src/project/tsconfig.json:
  {}
/src/project:
  {}
/src/project/filewithimports.ts:
  {}
/src/project/filewithtyperefs.ts:
  {}
/a/lib/lib.d.ts:
  {}
/src/project/node_modules/pkg0/package.json:
  {}
/src/project/node_modules/pkg1/package.json:
  {}
/src/project/node_modules/pkg2/package.json:
  {}
/src/project/node_modules/pkg3/package.json:
  {}

FsWatchesRecursive::
/src/project/node_modules:
  {}
/src/project/node_modules/@types:
  {}

Info 332  [00:07:11.000] Running: /src/project/tsconfig.json
Info 333  [00:07:12.000] Starting updateGraphWorker: Project: /src/project/tsconfig.json
Info 334  [00:07:13.000] File '/a/lib/package.json' does not exist according to earlier cached lookups.
Info 335  [00:07:14.000] File '/a/package.json' does not exist according to earlier cached lookups.
Info 336  [00:07:15.000] File '/package.json' does not exist according to earlier cached lookups.
Info 337  [00:07:16.000] File '/src/project/node_modules/pkg0/package.json' exists according to earlier cached lookups.
Info 338  [00:07:17.000] File '/src/project/node_modules/pkg1/package.json' exists according to earlier cached lookups.
Info 339  [00:07:18.000] File '/src/project/package.json' does not exist according to earlier cached lookups.
Info 340  [00:07:19.000] File '/src/package.json' does not exist according to earlier cached lookups.
Info 341  [00:07:20.000] File '/package.json' does not exist according to earlier cached lookups.
Info 342  [00:07:21.000] File '/src/project/node_modules/pkg2/package.json' exists according to earlier cached lookups.
Info 343  [00:07:22.000] File '/src/project/package.json' does not exist according to earlier cached lookups.
Info 344  [00:07:23.000] File '/src/package.json' does not exist according to earlier cached lookups.
Info 345  [00:07:24.000] File '/package.json' does not exist according to earlier cached lookups.
Info 346  [00:07:25.000] File '/src/project/package.json' does not exist according to earlier cached lookups.
Info 347  [00:07:26.000] File '/src/package.json' does not exist according to earlier cached lookups.
Info 348  [00:07:27.000] File '/package.json' does not exist according to earlier cached lookups.
Info 349  [00:07:28.000] File '/src/project/package.json' does not exist according to earlier cached lookups.
Info 350  [00:07:29.000] File '/src/package.json' does not exist according to earlier cached lookups.
Info 351  [00:07:30.000] File '/package.json' does not exist according to earlier cached lookups.
Info 352  [00:07:31.000] File '/src/project/node_modules/@types/pkg4/package.json' does not exist according to earlier cached lookups.
Info 353  [00:07:32.000] File '/src/project/node_modules/@types/package.json' does not exist according to earlier cached lookups.
Info 354  [00:07:33.000] File '/src/project/node_modules/package.json' does not exist according to earlier cached lookups.
Info 355  [00:07:34.000] File '/src/project/package.json' does not exist according to earlier cached lookups.
Info 356  [00:07:35.000] File '/src/package.json' does not exist according to earlier cached lookups.
Info 357  [00:07:36.000] File '/package.json' does not exist according to earlier cached lookups.
Info 358  [00:07:37.000] File '/src/project/package.json' does not exist according to earlier cached lookups.
Info 359  [00:07:38.000] File '/src/package.json' does not exist according to earlier cached lookups.
Info 360  [00:07:39.000] File '/package.json' does not exist according to earlier cached lookups.
Info 361  [00:07:40.000] Reusing resolution of module 'pkg0' from '/src/project/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/import.d.ts' with Package ID 'pkg0/import.d.ts@0.0.1'.
Info 362  [00:07:41.000] Reusing resolution of module 'pkg1' from '/src/project/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg1/require.d.ts' with Package ID 'pkg1/require.d.ts@0.0.1'.
Info 363  [00:07:42.000] File '/src/project/node_modules/pkg0/package.json' exists according to earlier cached lookups.
Info 364  [00:07:43.000] File '/src/project/node_modules/pkg1/package.json' exists according to earlier cached lookups.
Info 365  [00:07:44.000] File '/src/project/package.json' does not exist according to earlier cached lookups.
Info 366  [00:07:45.000] File '/src/package.json' does not exist according to earlier cached lookups.
Info 367  [00:07:46.000] File '/package.json' does not exist according to earlier cached lookups.
Info 368  [00:07:47.000] Reusing resolution of type reference directive 'pkg2' from '/src/project/fileWithTypeRefs.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg2/import.d.ts' with Package ID 'pkg2/import.d.ts@0.0.1'.
Info 369  [00:07:48.000] ======== Resolving type reference directive 'pkg3', containing file '/src/project/fileWithTypeRefs.ts', root directory '/src/project/node_modules/@types'. ========
Info 370  [00:07:49.000] Resolving with primary search path '/src/project/node_modules/@types'.
Info 371  [00:07:50.000] Looking up in 'node_modules' folder, initial location '/src/project'.
Info 372  [00:07:51.000] Found 'package.json' at '/src/project/node_modules/pkg3/package.json'.
Info 373  [00:07:52.000] Saw non-matching condition 'import'.
Info 374  [00:07:53.000] Matched 'exports' condition 'require'.
Info 375  [00:07:54.000] Using 'exports' subpath '.' with target './require.js'.
Info 376  [00:07:55.000] File name '/src/project/node_modules/pkg3/require.js' has a '.js' extension - stripping it.
Info 377  [00:07:56.000] File '/src/project/node_modules/pkg3/require.d.ts' exist - use it as a name resolution result.
Info 378  [00:07:57.000] Resolving real path for '/src/project/node_modules/pkg3/require.d.ts', result '/src/project/node_modules/pkg3/require.d.ts'.
Info 379  [00:07:58.000] ======== Type reference directive 'pkg3' was successfully resolved to '/src/project/node_modules/pkg3/require.d.ts' with Package ID 'pkg3/require.d.ts@0.0.1', primary: false. ========
Info 380  [00:07:59.000] File '/src/project/node_modules/pkg2/package.json' exists according to earlier cached lookups.
Info 381  [00:08:00.000] File '/src/project/node_modules/pkg3/package.json' exists according to earlier cached lookups.
Info 382  [00:08:01.000] File '/src/project/package.json' does not exist according to earlier cached lookups.
Info 383  [00:08:02.000] File '/src/package.json' does not exist according to earlier cached lookups.
Info 384  [00:08:03.000] File '/package.json' does not exist according to earlier cached lookups.
Info 385  [00:08:04.000] Reusing resolution of module 'pkg0' from '/src/project/randomFileForImport.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/import.d.ts' with Package ID 'pkg0/import.d.ts@0.0.1'.
Info 386  [00:08:05.000] File '/src/project/package.json' does not exist according to earlier cached lookups.
Info 387  [00:08:06.000] File '/src/package.json' does not exist according to earlier cached lookups.
Info 388  [00:08:07.000] File '/package.json' does not exist according to earlier cached lookups.
Info 389  [00:08:08.000] Reusing resolution of type reference directive 'pkg2' from '/src/project/randomFileForTypeRef.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg2/import.d.ts' with Package ID 'pkg2/import.d.ts@0.0.1'.
Info 390  [00:08:09.000] Reusing resolution of type reference directive 'pkg4' from '/src/project/__inferred type names__.ts' of old program, it was successfully resolved to '/src/project/node_modules/@types/pkg4/index.d.ts'.
Info 391  [00:08:10.000] File '/src/project/node_modules/@types/pkg4/package.json' does not exist according to earlier cached lookups.
Info 392  [00:08:11.000] File '/src/project/node_modules/@types/package.json' does not exist according to earlier cached lookups.
Info 393  [00:08:12.000] File '/src/project/node_modules/package.json' does not exist according to earlier cached lookups.
Info 394  [00:08:13.000] File '/src/project/package.json' does not exist according to earlier cached lookups.
Info 395  [00:08:14.000] File '/src/package.json' does not exist according to earlier cached lookups.
Info 396  [00:08:15.000] File '/package.json' does not exist according to earlier cached lookups.
Info 397  [00:08:16.000] File '/a/lib/package.json' does not exist according to earlier cached lookups.
Info 398  [00:08:17.000] File '/a/package.json' does not exist according to earlier cached lookups.
Info 399  [00:08:18.000] File '/package.json' does not exist according to earlier cached lookups.
Info 400  [00:08:19.000] DirectoryWatcher:: Close:: WatchInfo: /src/project/node_modules 1 undefined Project: /src/project/tsconfig.json WatchType: Failed Lookup Locations
Info 401  [00:08:20.000] Elapsed:: *ms DirectoryWatcher:: Close:: WatchInfo: /src/project/node_modules 1 undefined Project: /src/project/tsconfig.json WatchType: Failed Lookup Locations
Info 402  [00:08:21.000] Finishing updateGraphWorker: Project: /src/project/tsconfig.json Version: 5 structureChanged: true structureIsReused:: SafeModules Elapsed:: *ms
Info 403  [00:08:22.000] Project '/src/project/tsconfig.json' (Configured)
Info 404  [00:08:23.000] 	Files (10)
	/a/lib/lib.d.ts
	/src/project/node_modules/pkg0/import.d.ts
	/src/project/node_modules/pkg1/require.d.ts
	/src/project/fileWithImports.ts
	/src/project/node_modules/pkg2/import.d.ts
	/src/project/node_modules/pkg3/require.d.ts
	/src/project/fileWithTypeRefs.ts
	/src/project/randomFileForImport.ts
	/src/project/randomFileForTypeRef.ts
	/src/project/node_modules/@types/pkg4/index.d.ts


	../../a/lib/lib.d.ts
	  Default library for target 'es5'
	node_modules/pkg0/import.d.ts
	  Imported via "pkg0" from file 'fileWithImports.ts' with packageId 'pkg0/import.d.ts@0.0.1'
	  Imported via "pkg0" from file 'randomFileForImport.ts' with packageId 'pkg0/import.d.ts@0.0.1'
	  File is CommonJS module because 'node_modules/pkg0/package.json' does not have field "type"
	node_modules/pkg1/require.d.ts
	  Imported via "pkg1" from file 'fileWithImports.ts' with packageId 'pkg1/require.d.ts@0.0.1'
	  File is CommonJS module because 'node_modules/pkg1/package.json' does not have field "type"
	fileWithImports.ts
	  Matched by include pattern '*.ts' in 'tsconfig.json'
	  File is CommonJS module because 'package.json' was not found
	node_modules/pkg2/import.d.ts
	  Type library referenced via 'pkg2' from file 'fileWithTypeRefs.ts' with packageId 'pkg2/import.d.ts@0.0.1'
	  File is CommonJS module because 'node_modules/pkg2/package.json' does not have field "type"
	node_modules/pkg3/require.d.ts
	  Type library referenced via 'pkg3' from file 'fileWithTypeRefs.ts' with packageId 'pkg3/require.d.ts@0.0.1'
	  File is CommonJS module because 'node_modules/pkg3/package.json' does not have field "type"
	fileWithTypeRefs.ts
	  Matched by include pattern '*.ts' in 'tsconfig.json'
	  File is CommonJS module because 'package.json' was not found
	randomFileForImport.ts
	  Matched by include pattern '*.ts' in 'tsconfig.json'
	  File is CommonJS module because 'package.json' was not found
	randomFileForTypeRef.ts
	  Matched by include pattern '*.ts' in 'tsconfig.json'
	  File is CommonJS module because 'package.json' was not found
	node_modules/@types/pkg4/index.d.ts
	  Entry point for implicit type library 'pkg4'
	  File is CommonJS module because 'package.json' was not found

Info 405  [00:08:24.000] -----------------------------------------------
Info 406  [00:08:25.000] Running: *ensureProjectForOpenFiles*
Info 407  [00:08:26.000] Before ensureProjectForOpenFiles:
Info 408  [00:08:27.000] Project '/src/project/tsconfig.json' (Configured)
Info 408  [00:08:28.000] 	Files (10)

Info 408  [00:08:29.000] -----------------------------------------------
Info 408  [00:08:30.000] Open files: 
Info 408  [00:08:31.000] 	FileName: /src/project/randomFileForImport.ts ProjectRootPath: undefined
Info 408  [00:08:32.000] 		Projects: /src/project/tsconfig.json
Info 408  [00:08:33.000] 	FileName: /src/project/randomFileForTypeRef.ts ProjectRootPath: undefined
Info 408  [00:08:34.000] 		Projects: /src/project/tsconfig.json
Info 408  [00:08:35.000] After ensureProjectForOpenFiles:
Info 409  [00:08:36.000] Project '/src/project/tsconfig.json' (Configured)
Info 409  [00:08:37.000] 	Files (10)

Info 409  [00:08:38.000] -----------------------------------------------
Info 409  [00:08:39.000] Open files: 
Info 409  [00:08:40.000] 	FileName: /src/project/randomFileForImport.ts ProjectRootPath: undefined
Info 409  [00:08:41.000] 		Projects: /src/project/tsconfig.json
Info 409  [00:08:42.000] 	FileName: /src/project/randomFileForTypeRef.ts ProjectRootPath: undefined
Info 409  [00:08:43.000] 		Projects: /src/project/tsconfig.json
After running timeout callbacks

PolledWatches::
/src/project/node_modules/@types/pkg4/package.json:
  {"pollingInterval":2000}
/src/project/node_modules/@types/package.json:
  {"pollingInterval":2000}
/src/project/node_modules/package.json:
  {"pollingInterval":2000}

FsWatches::
/src/project/tsconfig.json:
  {}
/src/project:
  {}
/src/project/filewithimports.ts:
  {}
/src/project/filewithtyperefs.ts:
  {}
/a/lib/lib.d.ts:
  {}
/src/project/node_modules/pkg0/package.json:
  {}
/src/project/node_modules/pkg1/package.json:
  {}
/src/project/node_modules/pkg2/package.json:
  {}
/src/project/node_modules/pkg3/package.json:
  {}

FsWatchesRecursive::
/src/project/node_modules:
  {}
/src/project/node_modules/@types:
  {}

Info 409  [00:08:44.000] modify package.json and that should re-resolve
Info 410  [00:08:48.000] FileWatcher:: Triggered with /src/project/node_modules/pkg1/package.json 1:: WatchInfo: /src/project/node_modules/pkg1/package.json 2000 undefined Project: /src/project/tsconfig.json WatchType: File location affecting resolution
Info 411  [00:08:49.000] Scheduled: /src/project/tsconfig.jsonFailedLookupInvalidation
Info 412  [00:08:50.000] Elapsed:: *ms FileWatcher:: Triggered with /src/project/node_modules/pkg1/package.json 1:: WatchInfo: /src/project/node_modules/pkg1/package.json 2000 undefined Project: /src/project/tsconfig.json WatchType: File location affecting resolution
Before running timeout callbacks
//// [/src/project/node_modules/pkg1/package.json]
{"name":"pkg1","version":"0.0.1","exports":{"import":"./import.js","require":"./require1.js"}}


PolledWatches::
/src/project/node_modules/@types/pkg4/package.json:
  {"pollingInterval":2000}
/src/project/node_modules/@types/package.json:
  {"pollingInterval":2000}
/src/project/node_modules/package.json:
  {"pollingInterval":2000}

FsWatches::
/src/project/tsconfig.json:
  {}
/src/project:
  {}
/src/project/filewithimports.ts:
  {}
/src/project/filewithtyperefs.ts:
  {}
/a/lib/lib.d.ts:
  {}
/src/project/node_modules/pkg0/package.json:
  {}
/src/project/node_modules/pkg1/package.json:
  {}
/src/project/node_modules/pkg2/package.json:
  {}
/src/project/node_modules/pkg3/package.json:
  {}

FsWatchesRecursive::
/src/project/node_modules:
  {}
/src/project/node_modules/@types:
  {}

Info 413  [00:08:51.000] Running: /src/project/tsconfig.jsonFailedLookupInvalidation
Info 414  [00:08:52.000] Scheduled: /src/project/tsconfig.json
Info 415  [00:08:53.000] Scheduled: *ensureProjectForOpenFiles*
After running timeout callbacks

PolledWatches::
/src/project/node_modules/@types/pkg4/package.json:
  {"pollingInterval":2000}
/src/project/node_modules/@types/package.json:
  {"pollingInterval":2000}
/src/project/node_modules/package.json:
  {"pollingInterval":2000}

FsWatches::
/src/project/tsconfig.json:
  {}
/src/project:
  {}
/src/project/filewithimports.ts:
  {}
/src/project/filewithtyperefs.ts:
  {}
/a/lib/lib.d.ts:
  {}
/src/project/node_modules/pkg0/package.json:
  {}
/src/project/node_modules/pkg1/package.json:
  {}
/src/project/node_modules/pkg2/package.json:
  {}
/src/project/node_modules/pkg3/package.json:
  {}

FsWatchesRecursive::
/src/project/node_modules:
  {}
/src/project/node_modules/@types:
  {}

Before running timeout callbacks

PolledWatches::
/src/project/node_modules/@types/pkg4/package.json:
  {"pollingInterval":2000}
/src/project/node_modules/@types/package.json:
  {"pollingInterval":2000}
/src/project/node_modules/package.json:
  {"pollingInterval":2000}

FsWatches::
/src/project/tsconfig.json:
  {}
/src/project:
  {}
/src/project/filewithimports.ts:
  {}
/src/project/filewithtyperefs.ts:
  {}
/a/lib/lib.d.ts:
  {}
/src/project/node_modules/pkg0/package.json:
  {}
/src/project/node_modules/pkg1/package.json:
  {}
/src/project/node_modules/pkg2/package.json:
  {}
/src/project/node_modules/pkg3/package.json:
  {}

FsWatchesRecursive::
/src/project/node_modules:
  {}
/src/project/node_modules/@types:
  {}

Info 416  [00:08:54.000] Running: /src/project/tsconfig.json
Info 417  [00:08:55.000] Starting updateGraphWorker: Project: /src/project/tsconfig.json
Info 418  [00:08:56.000] File '/a/lib/package.json' does not exist according to earlier cached lookups.
Info 419  [00:08:57.000] File '/a/package.json' does not exist according to earlier cached lookups.
Info 420  [00:08:58.000] File '/package.json' does not exist according to earlier cached lookups.
Info 421  [00:08:59.000] File '/src/project/node_modules/pkg0/package.json' exists according to earlier cached lookups.
Info 422  [00:09:00.000] Found 'package.json' at '/src/project/node_modules/pkg1/package.json'.
Info 423  [00:09:01.000] File '/src/project/package.json' does not exist according to earlier cached lookups.
Info 424  [00:09:02.000] File '/src/package.json' does not exist according to earlier cached lookups.
Info 425  [00:09:03.000] File '/package.json' does not exist according to earlier cached lookups.
Info 426  [00:09:04.000] File '/src/project/node_modules/pkg2/package.json' exists according to earlier cached lookups.
Info 427  [00:09:05.000] File '/src/project/node_modules/pkg3/package.json' exists according to earlier cached lookups.
Info 428  [00:09:06.000] File '/src/project/package.json' does not exist according to earlier cached lookups.
Info 429  [00:09:07.000] File '/src/package.json' does not exist according to earlier cached lookups.
Info 430  [00:09:08.000] File '/package.json' does not exist according to earlier cached lookups.
Info 431  [00:09:09.000] File '/src/project/package.json' does not exist according to earlier cached lookups.
Info 432  [00:09:10.000] File '/src/package.json' does not exist according to earlier cached lookups.
Info 433  [00:09:11.000] File '/package.json' does not exist according to earlier cached lookups.
Info 434  [00:09:12.000] File '/src/project/package.json' does not exist according to earlier cached lookups.
Info 435  [00:09:13.000] File '/src/package.json' does not exist according to earlier cached lookups.
Info 436  [00:09:14.000] File '/package.json' does not exist according to earlier cached lookups.
Info 437  [00:09:15.000] File '/src/project/node_modules/@types/pkg4/package.json' does not exist according to earlier cached lookups.
Info 438  [00:09:16.000] File '/src/project/node_modules/@types/package.json' does not exist according to earlier cached lookups.
Info 439  [00:09:17.000] File '/src/project/node_modules/package.json' does not exist according to earlier cached lookups.
Info 440  [00:09:18.000] File '/src/project/package.json' does not exist according to earlier cached lookups.
Info 441  [00:09:19.000] File '/src/package.json' does not exist according to earlier cached lookups.
Info 442  [00:09:20.000] File '/package.json' does not exist according to earlier cached lookups.
Info 443  [00:09:21.000] File '/src/project/package.json' does not exist according to earlier cached lookups.
Info 444  [00:09:22.000] File '/src/package.json' does not exist according to earlier cached lookups.
Info 445  [00:09:23.000] File '/package.json' does not exist according to earlier cached lookups.
Info 446  [00:09:24.000] Reusing resolution of module 'pkg0' from '/src/project/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/import.d.ts' with Package ID 'pkg0/import.d.ts@0.0.1'.
Info 447  [00:09:25.000] ======== Resolving module 'pkg1' from '/src/project/fileWithImports.ts'. ========
Info 448  [00:09:26.000] Explicitly specified module resolution kind: 'Node16'.
Info 449  [00:09:27.000] Resolving in CJS mode with conditions 'node', 'require', 'types'.
Info 450  [00:09:28.000] File '/src/project/package.json' does not exist according to earlier cached lookups.
Info 451  [00:09:29.000] File '/src/package.json' does not exist according to earlier cached lookups.
Info 452  [00:09:30.000] File '/package.json' does not exist according to earlier cached lookups.
Info 453  [00:09:31.000] Loading module 'pkg1' from 'node_modules' folder, target file types: TypeScript, JavaScript, Declaration.
Info 454  [00:09:32.000] File '/src/project/node_modules/pkg1/package.json' exists according to earlier cached lookups.
Info 455  [00:09:33.000] Saw non-matching condition 'import'.
Info 456  [00:09:34.000] Matched 'exports' condition 'require'.
Info 457  [00:09:35.000] Using 'exports' subpath '.' with target './require1.js'.
Info 458  [00:09:36.000] File name '/src/project/node_modules/pkg1/require1.js' has a '.js' extension - stripping it.
Info 459  [00:09:37.000] File '/src/project/node_modules/pkg1/require1.ts' does not exist.
Info 460  [00:09:38.000] File '/src/project/node_modules/pkg1/require1.tsx' does not exist.
Info 461  [00:09:39.000] File '/src/project/node_modules/pkg1/require1.d.ts' does not exist.
Info 462  [00:09:40.000] File '/src/project/node_modules/@types/pkg1.d.ts' does not exist.
Info 463  [00:09:41.000] Directory '/src/node_modules' does not exist, skipping all lookups in it.
Info 464  [00:09:42.000] Directory '/node_modules' does not exist, skipping all lookups in it.
Info 465  [00:09:43.000] File '/src/project/node_modules/pkg1/package.json' exists according to earlier cached lookups.
Info 466  [00:09:44.000] Saw non-matching condition 'import'.
Info 467  [00:09:45.000] Matched 'exports' condition 'require'.
Info 468  [00:09:46.000] Using 'exports' subpath '.' with target './require1.js'.
Info 469  [00:09:47.000] File name '/src/project/node_modules/pkg1/require1.js' has a '.js' extension - stripping it.
Info 470  [00:09:48.000] File '/src/project/node_modules/pkg1/require1.js' does not exist.
Info 471  [00:09:49.000] File '/src/project/node_modules/pkg1/require1.jsx' does not exist.
Info 472  [00:09:50.000] Directory '/src/node_modules' does not exist, skipping all lookups in it.
Info 473  [00:09:51.000] Directory '/node_modules' does not exist, skipping all lookups in it.
Info 474  [00:09:52.000] ======== Module name 'pkg1' was not resolved. ========
Info 475  [00:09:53.000] File '/src/project/node_modules/pkg0/package.json' exists according to earlier cached lookups.
Info 476  [00:09:54.000] File '/src/project/package.json' does not exist according to earlier cached lookups.
Info 477  [00:09:55.000] File '/src/package.json' does not exist according to earlier cached lookups.
Info 478  [00:09:56.000] File '/package.json' does not exist according to earlier cached lookups.
Info 479  [00:09:57.000] Reusing resolution of type reference directive 'pkg2' from '/src/project/fileWithTypeRefs.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg2/import.d.ts' with Package ID 'pkg2/import.d.ts@0.0.1'.
Info 480  [00:09:58.000] Reusing resolution of type reference directive 'pkg3' from '/src/project/fileWithTypeRefs.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg3/require.d.ts' with Package ID 'pkg3/require.d.ts@0.0.1'.
Info 481  [00:09:59.000] File '/src/project/node_modules/pkg2/package.json' exists according to earlier cached lookups.
Info 482  [00:10:00.000] File '/src/project/node_modules/pkg3/package.json' exists according to earlier cached lookups.
Info 483  [00:10:01.000] File '/src/project/package.json' does not exist according to earlier cached lookups.
Info 484  [00:10:02.000] File '/src/package.json' does not exist according to earlier cached lookups.
Info 485  [00:10:03.000] File '/package.json' does not exist according to earlier cached lookups.
Info 486  [00:10:04.000] Reusing resolution of module 'pkg0' from '/src/project/randomFileForImport.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/import.d.ts' with Package ID 'pkg0/import.d.ts@0.0.1'.
Info 487  [00:10:05.000] File '/src/project/package.json' does not exist according to earlier cached lookups.
Info 488  [00:10:06.000] File '/src/package.json' does not exist according to earlier cached lookups.
Info 489  [00:10:07.000] File '/package.json' does not exist according to earlier cached lookups.
Info 490  [00:10:08.000] Reusing resolution of type reference directive 'pkg2' from '/src/project/randomFileForTypeRef.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg2/import.d.ts' with Package ID 'pkg2/import.d.ts@0.0.1'.
Info 491  [00:10:09.000] Reusing resolution of type reference directive 'pkg4' from '/src/project/__inferred type names__.ts' of old program, it was successfully resolved to '/src/project/node_modules/@types/pkg4/index.d.ts'.
Info 492  [00:10:10.000] File '/src/project/node_modules/@types/pkg4/package.json' does not exist according to earlier cached lookups.
Info 493  [00:10:11.000] File '/src/project/node_modules/@types/package.json' does not exist according to earlier cached lookups.
Info 494  [00:10:12.000] File '/src/project/node_modules/package.json' does not exist according to earlier cached lookups.
Info 495  [00:10:13.000] File '/src/project/package.json' does not exist according to earlier cached lookups.
Info 496  [00:10:14.000] File '/src/package.json' does not exist according to earlier cached lookups.
Info 497  [00:10:15.000] File '/package.json' does not exist according to earlier cached lookups.
Info 498  [00:10:16.000] File '/a/lib/package.json' does not exist according to earlier cached lookups.
Info 499  [00:10:17.000] File '/a/package.json' does not exist according to earlier cached lookups.
Info 500  [00:10:18.000] File '/package.json' does not exist according to earlier cached lookups.
Info 501  [00:10:19.000] DirectoryWatcher:: Added:: WatchInfo: /src/project/node_modules 1 undefined Project: /src/project/tsconfig.json WatchType: Failed Lookup Locations
Info 502  [00:10:20.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /src/project/node_modules 1 undefined Project: /src/project/tsconfig.json WatchType: Failed Lookup Locations
Info 503  [00:10:21.000] DirectoryWatcher:: Added:: WatchInfo: /src/project 0 undefined Project: /src/project/tsconfig.json WatchType: Failed Lookup Locations
Info 504  [00:10:22.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /src/project 0 undefined Project: /src/project/tsconfig.json WatchType: Failed Lookup Locations
Info 505  [00:10:23.000] Finishing updateGraphWorker: Project: /src/project/tsconfig.json Version: 6 structureChanged: true structureIsReused:: SafeModules Elapsed:: *ms
Info 506  [00:10:24.000] Project '/src/project/tsconfig.json' (Configured)
Info 507  [00:10:25.000] 	Files (9)
	/a/lib/lib.d.ts
	/src/project/node_modules/pkg0/import.d.ts
	/src/project/fileWithImports.ts
	/src/project/node_modules/pkg2/import.d.ts
	/src/project/node_modules/pkg3/require.d.ts
	/src/project/fileWithTypeRefs.ts
	/src/project/randomFileForImport.ts
	/src/project/randomFileForTypeRef.ts
	/src/project/node_modules/@types/pkg4/index.d.ts


	../../a/lib/lib.d.ts
	  Default library for target 'es5'
	node_modules/pkg0/import.d.ts
	  Imported via "pkg0" from file 'fileWithImports.ts' with packageId 'pkg0/import.d.ts@0.0.1'
	  Imported via "pkg0" from file 'randomFileForImport.ts' with packageId 'pkg0/import.d.ts@0.0.1'
	  File is CommonJS module because 'node_modules/pkg0/package.json' does not have field "type"
	fileWithImports.ts
	  Matched by include pattern '*.ts' in 'tsconfig.json'
	  File is CommonJS module because 'package.json' was not found
	node_modules/pkg2/import.d.ts
	  Type library referenced via 'pkg2' from file 'fileWithTypeRefs.ts' with packageId 'pkg2/import.d.ts@0.0.1'
	  File is CommonJS module because 'node_modules/pkg2/package.json' does not have field "type"
	node_modules/pkg3/require.d.ts
	  Type library referenced via 'pkg3' from file 'fileWithTypeRefs.ts' with packageId 'pkg3/require.d.ts@0.0.1'
	  File is CommonJS module because 'node_modules/pkg3/package.json' does not have field "type"
	fileWithTypeRefs.ts
	  Matched by include pattern '*.ts' in 'tsconfig.json'
	  File is CommonJS module because 'package.json' was not found
	randomFileForImport.ts
	  Matched by include pattern '*.ts' in 'tsconfig.json'
	  File is CommonJS module because 'package.json' was not found
	randomFileForTypeRef.ts
	  Matched by include pattern '*.ts' in 'tsconfig.json'
	  File is CommonJS module because 'package.json' was not found
	node_modules/@types/pkg4/index.d.ts
	  Entry point for implicit type library 'pkg4'
	  File is CommonJS module because 'package.json' was not found

Info 508  [00:10:26.000] -----------------------------------------------
Info 509  [00:10:27.000] Running: *ensureProjectForOpenFiles*
Info 510  [00:10:28.000] Before ensureProjectForOpenFiles:
Info 511  [00:10:29.000] Project '/src/project/tsconfig.json' (Configured)
Info 511  [00:10:30.000] 	Files (9)

Info 511  [00:10:31.000] -----------------------------------------------
Info 511  [00:10:32.000] Open files: 
Info 511  [00:10:33.000] 	FileName: /src/project/randomFileForImport.ts ProjectRootPath: undefined
Info 511  [00:10:34.000] 		Projects: /src/project/tsconfig.json
Info 511  [00:10:35.000] 	FileName: /src/project/randomFileForTypeRef.ts ProjectRootPath: undefined
Info 511  [00:10:36.000] 		Projects: /src/project/tsconfig.json
Info 511  [00:10:37.000] After ensureProjectForOpenFiles:
Info 512  [00:10:38.000] Project '/src/project/tsconfig.json' (Configured)
Info 512  [00:10:39.000] 	Files (9)

Info 512  [00:10:40.000] -----------------------------------------------
Info 512  [00:10:41.000] Open files: 
Info 512  [00:10:42.000] 	FileName: /src/project/randomFileForImport.ts ProjectRootPath: undefined
Info 512  [00:10:43.000] 		Projects: /src/project/tsconfig.json
Info 512  [00:10:44.000] 	FileName: /src/project/randomFileForTypeRef.ts ProjectRootPath: undefined
Info 512  [00:10:45.000] 		Projects: /src/project/tsconfig.json
After running timeout callbacks

PolledWatches::
/src/project/node_modules/@types/pkg4/package.json:
  {"pollingInterval":2000}
/src/project/node_modules/@types/package.json:
  {"pollingInterval":2000}
/src/project/node_modules/package.json:
  {"pollingInterval":2000}

FsWatches::
/src/project/tsconfig.json:
  {}
/src/project:
  {}
/src/project/filewithimports.ts:
  {}
/src/project/filewithtyperefs.ts:
  {}
/a/lib/lib.d.ts:
  {}
/src/project/node_modules/pkg0/package.json:
  {}
/src/project/node_modules/pkg1/package.json:
  {}
/src/project/node_modules/pkg2/package.json:
  {}
/src/project/node_modules/pkg3/package.json:
  {}

FsWatchesRecursive::
/src/project/node_modules:
  {}
/src/project/node_modules/@types:
  {}

Info 512  [00:10:46.000] write file not resolved by import
Info 513  [00:10:49.000] DirectoryWatcher:: Triggered with /src/project/node_modules/pkg1/require1.d.ts :: WatchInfo: /src/project/node_modules 1 undefined WatchType: node_modules for closed script infos and package.jsons affecting module specifier cache
Info 514  [00:10:50.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /src/project/node_modules/pkg1/require1.d.ts :: WatchInfo: /src/project/node_modules 1 undefined WatchType: node_modules for closed script infos and package.jsons affecting module specifier cache
Info 515  [00:10:51.000] DirectoryWatcher:: Triggered with /src/project/node_modules/pkg1/require1.d.ts :: WatchInfo: /src/project/node_modules 1 undefined Project: /src/project/tsconfig.json WatchType: Failed Lookup Locations
Info 516  [00:10:52.000] Scheduled: /src/project/tsconfig.jsonFailedLookupInvalidation
Info 517  [00:10:53.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /src/project/node_modules/pkg1/require1.d.ts :: WatchInfo: /src/project/node_modules 1 undefined Project: /src/project/tsconfig.json WatchType: Failed Lookup Locations
Before running timeout callbacks
//// [/src/project/node_modules/pkg1/require1.d.ts]
export interface RequireInterface1 {}


PolledWatches::
/src/project/node_modules/@types/pkg4/package.json:
  {"pollingInterval":2000}
/src/project/node_modules/@types/package.json:
  {"pollingInterval":2000}
/src/project/node_modules/package.json:
  {"pollingInterval":2000}

FsWatches::
/src/project/tsconfig.json:
  {}
/src/project:
  {}
/src/project/filewithimports.ts:
  {}
/src/project/filewithtyperefs.ts:
  {}
/a/lib/lib.d.ts:
  {}
/src/project/node_modules/pkg0/package.json:
  {}
/src/project/node_modules/pkg1/package.json:
  {}
/src/project/node_modules/pkg2/package.json:
  {}
/src/project/node_modules/pkg3/package.json:
  {}

FsWatchesRecursive::
/src/project/node_modules:
  {}
/src/project/node_modules/@types:
  {}

Info 518  [00:10:54.000] Running: /src/project/tsconfig.jsonFailedLookupInvalidation
Info 519  [00:10:55.000] Scheduled: /src/project/tsconfig.json
Info 520  [00:10:56.000] Scheduled: *ensureProjectForOpenFiles*
After running timeout callbacks

PolledWatches::
/src/project/node_modules/@types/pkg4/package.json:
  {"pollingInterval":2000}
/src/project/node_modules/@types/package.json:
  {"pollingInterval":2000}
/src/project/node_modules/package.json:
  {"pollingInterval":2000}

FsWatches::
/src/project/tsconfig.json:
  {}
/src/project:
  {}
/src/project/filewithimports.ts:
  {}
/src/project/filewithtyperefs.ts:
  {}
/a/lib/lib.d.ts:
  {}
/src/project/node_modules/pkg0/package.json:
  {}
/src/project/node_modules/pkg1/package.json:
  {}
/src/project/node_modules/pkg2/package.json:
  {}
/src/project/node_modules/pkg3/package.json:
  {}

FsWatchesRecursive::
/src/project/node_modules:
  {}
/src/project/node_modules/@types:
  {}

Before running timeout callbacks

PolledWatches::
/src/project/node_modules/@types/pkg4/package.json:
  {"pollingInterval":2000}
/src/project/node_modules/@types/package.json:
  {"pollingInterval":2000}
/src/project/node_modules/package.json:
  {"pollingInterval":2000}

FsWatches::
/src/project/tsconfig.json:
  {}
/src/project:
  {}
/src/project/filewithimports.ts:
  {}
/src/project/filewithtyperefs.ts:
  {}
/a/lib/lib.d.ts:
  {}
/src/project/node_modules/pkg0/package.json:
  {}
/src/project/node_modules/pkg1/package.json:
  {}
/src/project/node_modules/pkg2/package.json:
  {}
/src/project/node_modules/pkg3/package.json:
  {}

FsWatchesRecursive::
/src/project/node_modules:
  {}
/src/project/node_modules/@types:
  {}

Info 521  [00:10:57.000] Running: /src/project/tsconfig.json
Info 522  [00:10:58.000] Starting updateGraphWorker: Project: /src/project/tsconfig.json
Info 523  [00:10:59.000] File '/a/lib/package.json' does not exist according to earlier cached lookups.
Info 524  [00:11:00.000] File '/a/package.json' does not exist according to earlier cached lookups.
Info 525  [00:11:01.000] File '/package.json' does not exist according to earlier cached lookups.
Info 526  [00:11:02.000] File '/src/project/node_modules/pkg0/package.json' exists according to earlier cached lookups.
Info 527  [00:11:03.000] File '/src/project/package.json' does not exist according to earlier cached lookups.
Info 528  [00:11:04.000] File '/src/package.json' does not exist according to earlier cached lookups.
Info 529  [00:11:05.000] File '/package.json' does not exist according to earlier cached lookups.
Info 530  [00:11:06.000] File '/src/project/node_modules/pkg2/package.json' exists according to earlier cached lookups.
Info 531  [00:11:07.000] File '/src/project/node_modules/pkg3/package.json' exists according to earlier cached lookups.
Info 532  [00:11:08.000] File '/src/project/package.json' does not exist according to earlier cached lookups.
Info 533  [00:11:09.000] File '/src/package.json' does not exist according to earlier cached lookups.
Info 534  [00:11:10.000] File '/package.json' does not exist according to earlier cached lookups.
Info 535  [00:11:11.000] File '/src/project/package.json' does not exist according to earlier cached lookups.
Info 536  [00:11:12.000] File '/src/package.json' does not exist according to earlier cached lookups.
Info 537  [00:11:13.000] File '/package.json' does not exist according to earlier cached lookups.
Info 538  [00:11:14.000] File '/src/project/package.json' does not exist according to earlier cached lookups.
Info 539  [00:11:15.000] File '/src/package.json' does not exist according to earlier cached lookups.
Info 540  [00:11:16.000] File '/package.json' does not exist according to earlier cached lookups.
Info 541  [00:11:17.000] File '/src/project/node_modules/@types/pkg4/package.json' does not exist according to earlier cached lookups.
Info 542  [00:11:18.000] File '/src/project/node_modules/@types/package.json' does not exist according to earlier cached lookups.
Info 543  [00:11:19.000] File '/src/project/node_modules/package.json' does not exist according to earlier cached lookups.
Info 544  [00:11:20.000] File '/src/project/package.json' does not exist according to earlier cached lookups.
Info 545  [00:11:21.000] File '/src/package.json' does not exist according to earlier cached lookups.
Info 546  [00:11:22.000] File '/package.json' does not exist according to earlier cached lookups.
Info 547  [00:11:23.000] File '/src/project/package.json' does not exist according to earlier cached lookups.
Info 548  [00:11:24.000] File '/src/package.json' does not exist according to earlier cached lookups.
Info 549  [00:11:25.000] File '/package.json' does not exist according to earlier cached lookups.
Info 550  [00:11:26.000] Reusing resolution of module 'pkg0' from '/src/project/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/import.d.ts' with Package ID 'pkg0/import.d.ts@0.0.1'.
Info 551  [00:11:27.000] ======== Resolving module 'pkg1' from '/src/project/fileWithImports.ts'. ========
Info 552  [00:11:28.000] Explicitly specified module resolution kind: 'Node16'.
Info 553  [00:11:29.000] Resolving in CJS mode with conditions 'node', 'require', 'types'.
Info 554  [00:11:30.000] File '/src/project/package.json' does not exist according to earlier cached lookups.
Info 555  [00:11:31.000] File '/src/package.json' does not exist according to earlier cached lookups.
Info 556  [00:11:32.000] File '/package.json' does not exist according to earlier cached lookups.
Info 557  [00:11:33.000] Loading module 'pkg1' from 'node_modules' folder, target file types: TypeScript, JavaScript, Declaration.
Info 558  [00:11:34.000] Found 'package.json' at '/src/project/node_modules/pkg1/package.json'.
Info 559  [00:11:35.000] Saw non-matching condition 'import'.
Info 560  [00:11:36.000] Matched 'exports' condition 'require'.
Info 561  [00:11:37.000] Using 'exports' subpath '.' with target './require1.js'.
Info 562  [00:11:38.000] File name '/src/project/node_modules/pkg1/require1.js' has a '.js' extension - stripping it.
Info 563  [00:11:39.000] File '/src/project/node_modules/pkg1/require1.ts' does not exist.
Info 564  [00:11:40.000] File '/src/project/node_modules/pkg1/require1.tsx' does not exist.
Info 565  [00:11:41.000] File '/src/project/node_modules/pkg1/require1.d.ts' exist - use it as a name resolution result.
Info 566  [00:11:42.000] Resolving real path for '/src/project/node_modules/pkg1/require1.d.ts', result '/src/project/node_modules/pkg1/require1.d.ts'.
Info 567  [00:11:43.000] ======== Module name 'pkg1' was successfully resolved to '/src/project/node_modules/pkg1/require1.d.ts' with Package ID 'pkg1/require1.d.ts@0.0.1'. ========
Info 568  [00:11:44.000] File '/src/project/node_modules/pkg0/package.json' exists according to earlier cached lookups.
Info 569  [00:11:45.000] File '/src/project/node_modules/pkg1/package.json' exists according to earlier cached lookups.
Info 570  [00:11:46.000] File '/src/project/package.json' does not exist according to earlier cached lookups.
Info 571  [00:11:47.000] File '/src/package.json' does not exist according to earlier cached lookups.
Info 572  [00:11:48.000] File '/package.json' does not exist according to earlier cached lookups.
Info 573  [00:11:49.000] Reusing resolution of type reference directive 'pkg2' from '/src/project/fileWithTypeRefs.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg2/import.d.ts' with Package ID 'pkg2/import.d.ts@0.0.1'.
Info 574  [00:11:50.000] Reusing resolution of type reference directive 'pkg3' from '/src/project/fileWithTypeRefs.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg3/require.d.ts' with Package ID 'pkg3/require.d.ts@0.0.1'.
Info 575  [00:11:51.000] File '/src/project/node_modules/pkg2/package.json' exists according to earlier cached lookups.
Info 576  [00:11:52.000] File '/src/project/node_modules/pkg3/package.json' exists according to earlier cached lookups.
Info 577  [00:11:53.000] File '/src/project/package.json' does not exist according to earlier cached lookups.
Info 578  [00:11:54.000] File '/src/package.json' does not exist according to earlier cached lookups.
Info 579  [00:11:55.000] File '/package.json' does not exist according to earlier cached lookups.
Info 580  [00:11:56.000] Reusing resolution of module 'pkg0' from '/src/project/randomFileForImport.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/import.d.ts' with Package ID 'pkg0/import.d.ts@0.0.1'.
Info 581  [00:11:57.000] File '/src/project/package.json' does not exist according to earlier cached lookups.
Info 582  [00:11:58.000] File '/src/package.json' does not exist according to earlier cached lookups.
Info 583  [00:11:59.000] File '/package.json' does not exist according to earlier cached lookups.
Info 584  [00:12:00.000] Reusing resolution of type reference directive 'pkg2' from '/src/project/randomFileForTypeRef.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg2/import.d.ts' with Package ID 'pkg2/import.d.ts@0.0.1'.
Info 585  [00:12:01.000] Reusing resolution of type reference directive 'pkg4' from '/src/project/__inferred type names__.ts' of old program, it was successfully resolved to '/src/project/node_modules/@types/pkg4/index.d.ts'.
Info 586  [00:12:02.000] File '/src/project/node_modules/@types/pkg4/package.json' does not exist according to earlier cached lookups.
Info 587  [00:12:03.000] File '/src/project/node_modules/@types/package.json' does not exist according to earlier cached lookups.
Info 588  [00:12:04.000] File '/src/project/node_modules/package.json' does not exist according to earlier cached lookups.
Info 589  [00:12:05.000] File '/src/project/package.json' does not exist according to earlier cached lookups.
Info 590  [00:12:06.000] File '/src/package.json' does not exist according to earlier cached lookups.
Info 591  [00:12:07.000] File '/package.json' does not exist according to earlier cached lookups.
Info 592  [00:12:08.000] File '/a/lib/package.json' does not exist according to earlier cached lookups.
Info 593  [00:12:09.000] File '/a/package.json' does not exist according to earlier cached lookups.
Info 594  [00:12:10.000] File '/package.json' does not exist according to earlier cached lookups.
Info 595  [00:12:11.000] DirectoryWatcher:: Close:: WatchInfo: /src/project/node_modules 1 undefined Project: /src/project/tsconfig.json WatchType: Failed Lookup Locations
Info 596  [00:12:12.000] Elapsed:: *ms DirectoryWatcher:: Close:: WatchInfo: /src/project/node_modules 1 undefined Project: /src/project/tsconfig.json WatchType: Failed Lookup Locations
Info 597  [00:12:13.000] DirectoryWatcher:: Close:: WatchInfo: /src/project 0 undefined Project: /src/project/tsconfig.json WatchType: Failed Lookup Locations
Info 598  [00:12:14.000] Elapsed:: *ms DirectoryWatcher:: Close:: WatchInfo: /src/project 0 undefined Project: /src/project/tsconfig.json WatchType: Failed Lookup Locations
Info 599  [00:12:15.000] Finishing updateGraphWorker: Project: /src/project/tsconfig.json Version: 7 structureChanged: true structureIsReused:: SafeModules Elapsed:: *ms
Info 600  [00:12:16.000] Project '/src/project/tsconfig.json' (Configured)
Info 601  [00:12:17.000] 	Files (10)
	/a/lib/lib.d.ts
	/src/project/node_modules/pkg0/import.d.ts
	/src/project/node_modules/pkg1/require1.d.ts
	/src/project/fileWithImports.ts
	/src/project/node_modules/pkg2/import.d.ts
	/src/project/node_modules/pkg3/require.d.ts
	/src/project/fileWithTypeRefs.ts
	/src/project/randomFileForImport.ts
	/src/project/randomFileForTypeRef.ts
	/src/project/node_modules/@types/pkg4/index.d.ts


	../../a/lib/lib.d.ts
	  Default library for target 'es5'
	node_modules/pkg0/import.d.ts
	  Imported via "pkg0" from file 'fileWithImports.ts' with packageId 'pkg0/import.d.ts@0.0.1'
	  Imported via "pkg0" from file 'randomFileForImport.ts' with packageId 'pkg0/import.d.ts@0.0.1'
	  File is CommonJS module because 'node_modules/pkg0/package.json' does not have field "type"
	node_modules/pkg1/require1.d.ts
	  Imported via "pkg1" from file 'fileWithImports.ts' with packageId 'pkg1/require1.d.ts@0.0.1'
	  File is CommonJS module because 'node_modules/pkg1/package.json' does not have field "type"
	fileWithImports.ts
	  Matched by include pattern '*.ts' in 'tsconfig.json'
	  File is CommonJS module because 'package.json' was not found
	node_modules/pkg2/import.d.ts
	  Type library referenced via 'pkg2' from file 'fileWithTypeRefs.ts' with packageId 'pkg2/import.d.ts@0.0.1'
	  File is CommonJS module because 'node_modules/pkg2/package.json' does not have field "type"
	node_modules/pkg3/require.d.ts
	  Type library referenced via 'pkg3' from file 'fileWithTypeRefs.ts' with packageId 'pkg3/require.d.ts@0.0.1'
	  File is CommonJS module because 'node_modules/pkg3/package.json' does not have field "type"
	fileWithTypeRefs.ts
	  Matched by include pattern '*.ts' in 'tsconfig.json'
	  File is CommonJS module because 'package.json' was not found
	randomFileForImport.ts
	  Matched by include pattern '*.ts' in 'tsconfig.json'
	  File is CommonJS module because 'package.json' was not found
	randomFileForTypeRef.ts
	  Matched by include pattern '*.ts' in 'tsconfig.json'
	  File is CommonJS module because 'package.json' was not found
	node_modules/@types/pkg4/index.d.ts
	  Entry point for implicit type library 'pkg4'
	  File is CommonJS module because 'package.json' was not found

Info 602  [00:12:18.000] -----------------------------------------------
Info 603  [00:12:19.000] Running: *ensureProjectForOpenFiles*
Info 604  [00:12:20.000] Before ensureProjectForOpenFiles:
Info 605  [00:12:21.000] Project '/src/project/tsconfig.json' (Configured)
Info 605  [00:12:22.000] 	Files (10)

Info 605  [00:12:23.000] -----------------------------------------------
Info 605  [00:12:24.000] Open files: 
Info 605  [00:12:25.000] 	FileName: /src/project/randomFileForImport.ts ProjectRootPath: undefined
Info 605  [00:12:26.000] 		Projects: /src/project/tsconfig.json
Info 605  [00:12:27.000] 	FileName: /src/project/randomFileForTypeRef.ts ProjectRootPath: undefined
Info 605  [00:12:28.000] 		Projects: /src/project/tsconfig.json
Info 605  [00:12:29.000] After ensureProjectForOpenFiles:
Info 606  [00:12:30.000] Project '/src/project/tsconfig.json' (Configured)
Info 606  [00:12:31.000] 	Files (10)

Info 606  [00:12:32.000] -----------------------------------------------
Info 606  [00:12:33.000] Open files: 
Info 606  [00:12:34.000] 	FileName: /src/project/randomFileForImport.ts ProjectRootPath: undefined
Info 606  [00:12:35.000] 		Projects: /src/project/tsconfig.json
Info 606  [00:12:36.000] 	FileName: /src/project/randomFileForTypeRef.ts ProjectRootPath: undefined
Info 606  [00:12:37.000] 		Projects: /src/project/tsconfig.json
After running timeout callbacks

PolledWatches::
/src/project/node_modules/@types/pkg4/package.json:
  {"pollingInterval":2000}
/src/project/node_modules/@types/package.json:
  {"pollingInterval":2000}
/src/project/node_modules/package.json:
  {"pollingInterval":2000}

FsWatches::
/src/project/tsconfig.json:
  {}
/src/project:
  {}
/src/project/filewithimports.ts:
  {}
/src/project/filewithtyperefs.ts:
  {}
/a/lib/lib.d.ts:
  {}
/src/project/node_modules/pkg0/package.json:
  {}
/src/project/node_modules/pkg1/package.json:
  {}
/src/project/node_modules/pkg2/package.json:
  {}
/src/project/node_modules/pkg3/package.json:
  {}

FsWatchesRecursive::
/src/project/node_modules:
  {}
/src/project/node_modules/@types:
  {}

Info 606  [00:12:38.000] delete file with imports
Info 607  [00:12:40.000] FileWatcher:: Triggered with /src/project/fileWithImports.ts 2:: WatchInfo: /src/project/fileWithImports.ts 500 undefined WatchType: Closed Script info
Info 608  [00:12:41.000] FileWatcher:: Close:: WatchInfo: /src/project/fileWithImports.ts 500 undefined WatchType: Closed Script info
Info 609  [00:12:42.000] Scheduled: /src/project/tsconfig.json
Info 610  [00:12:43.000] Scheduled: *ensureProjectForOpenFiles*
Info 611  [00:12:44.000] Elapsed:: *ms FileWatcher:: Triggered with /src/project/fileWithImports.ts 2:: WatchInfo: /src/project/fileWithImports.ts 500 undefined WatchType: Closed Script info
Info 612  [00:12:45.000] DirectoryWatcher:: Triggered with /src/project/fileWithImports.ts :: WatchInfo: /src/project 0 undefined Config: /src/project/tsconfig.json WatchType: Wild card directory
Info 613  [00:12:46.000] Scheduled: /src/project/tsconfig.json, Cancelled earlier one
Info 614  [00:12:47.000] Scheduled: *ensureProjectForOpenFiles*, Cancelled earlier one
Info 615  [00:12:48.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /src/project/fileWithImports.ts :: WatchInfo: /src/project 0 undefined Config: /src/project/tsconfig.json WatchType: Wild card directory
Before running timeout callbacks
//// [/src/project/fileWithImports.ts] deleted

PolledWatches::
/src/project/node_modules/@types/pkg4/package.json:
  {"pollingInterval":2000}
/src/project/node_modules/@types/package.json:
  {"pollingInterval":2000}
/src/project/node_modules/package.json:
  {"pollingInterval":2000}

FsWatches::
/src/project/tsconfig.json:
  {}
/src/project:
  {}
/src/project/filewithtyperefs.ts:
  {}
/a/lib/lib.d.ts:
  {}
/src/project/node_modules/pkg0/package.json:
  {}
/src/project/node_modules/pkg1/package.json:
  {}
/src/project/node_modules/pkg2/package.json:
  {}
/src/project/node_modules/pkg3/package.json:
  {}

FsWatchesRecursive::
/src/project/node_modules:
  {}
/src/project/node_modules/@types:
  {}

Info 616  [00:12:49.000] Running: /src/project/tsconfig.json
Info 617  [00:12:50.000] Starting updateGraphWorker: Project: /src/project/tsconfig.json
Info 618  [00:12:51.000] File '/src/project/package.json' does not exist according to earlier cached lookups.
Info 619  [00:12:52.000] File '/src/package.json' does not exist according to earlier cached lookups.
Info 620  [00:12:53.000] File '/package.json' does not exist according to earlier cached lookups.
Info 621  [00:12:54.000] Reusing resolution of type reference directive 'pkg2' from '/src/project/fileWithTypeRefs.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg2/import.d.ts' with Package ID 'pkg2/import.d.ts@0.0.1'.
Info 622  [00:12:55.000] Reusing resolution of type reference directive 'pkg3' from '/src/project/fileWithTypeRefs.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg3/require.d.ts' with Package ID 'pkg3/require.d.ts@0.0.1'.
Info 623  [00:12:56.000] File '/src/project/node_modules/pkg2/package.json' exists according to earlier cached lookups.
Info 624  [00:12:57.000] File '/src/project/node_modules/pkg3/package.json' exists according to earlier cached lookups.
Info 625  [00:12:58.000] File '/src/project/package.json' does not exist according to earlier cached lookups.
Info 626  [00:12:59.000] File '/src/package.json' does not exist according to earlier cached lookups.
Info 627  [00:13:00.000] File '/package.json' does not exist according to earlier cached lookups.
Info 628  [00:13:01.000] Reusing resolution of module 'pkg0' from '/src/project/randomFileForImport.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/import.d.ts' with Package ID 'pkg0/import.d.ts@0.0.1'.
Info 629  [00:13:02.000] File '/src/project/node_modules/pkg0/package.json' exists according to earlier cached lookups.
Info 630  [00:13:03.000] File '/src/project/package.json' does not exist according to earlier cached lookups.
Info 631  [00:13:04.000] File '/src/package.json' does not exist according to earlier cached lookups.
Info 632  [00:13:05.000] File '/package.json' does not exist according to earlier cached lookups.
Info 633  [00:13:06.000] Reusing resolution of type reference directive 'pkg2' from '/src/project/randomFileForTypeRef.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg2/import.d.ts' with Package ID 'pkg2/import.d.ts@0.0.1'.
Info 634  [00:13:07.000] Reusing resolution of type reference directive 'pkg4' from '/src/project/__inferred type names__.ts' of old program, it was successfully resolved to '/src/project/node_modules/@types/pkg4/index.d.ts'.
Info 635  [00:13:08.000] File '/src/project/node_modules/@types/pkg4/package.json' does not exist according to earlier cached lookups.
Info 636  [00:13:09.000] File '/src/project/node_modules/@types/package.json' does not exist according to earlier cached lookups.
Info 637  [00:13:10.000] File '/src/project/node_modules/package.json' does not exist according to earlier cached lookups.
Info 638  [00:13:11.000] File '/src/project/package.json' does not exist according to earlier cached lookups.
Info 639  [00:13:12.000] File '/src/package.json' does not exist according to earlier cached lookups.
Info 640  [00:13:13.000] File '/package.json' does not exist according to earlier cached lookups.
Info 641  [00:13:14.000] File '/a/lib/package.json' does not exist according to earlier cached lookups.
Info 642  [00:13:15.000] File '/a/package.json' does not exist according to earlier cached lookups.
Info 643  [00:13:16.000] File '/package.json' does not exist according to earlier cached lookups.
Info 644  [00:13:17.000] FileWatcher:: Close:: WatchInfo: /src/project/node_modules/pkg1/package.json 2000 undefined Project: /src/project/tsconfig.json WatchType: File location affecting resolution
Info 645  [00:13:18.000] Finishing updateGraphWorker: Project: /src/project/tsconfig.json Version: 8 structureChanged: true structureIsReused:: SafeModuleCache Elapsed:: *ms
Info 646  [00:13:19.000] Project '/src/project/tsconfig.json' (Configured)
Info 647  [00:13:20.000] 	Files (8)
	/a/lib/lib.d.ts
	/src/project/node_modules/pkg2/import.d.ts
	/src/project/node_modules/pkg3/require.d.ts
	/src/project/fileWithTypeRefs.ts
	/src/project/node_modules/pkg0/import.d.ts
	/src/project/randomFileForImport.ts
	/src/project/randomFileForTypeRef.ts
	/src/project/node_modules/@types/pkg4/index.d.ts


	../../a/lib/lib.d.ts
	  Default library for target 'es5'
	node_modules/pkg2/import.d.ts
	  Type library referenced via 'pkg2' from file 'fileWithTypeRefs.ts' with packageId 'pkg2/import.d.ts@0.0.1'
	  File is CommonJS module because 'node_modules/pkg2/package.json' does not have field "type"
	node_modules/pkg3/require.d.ts
	  Type library referenced via 'pkg3' from file 'fileWithTypeRefs.ts' with packageId 'pkg3/require.d.ts@0.0.1'
	  File is CommonJS module because 'node_modules/pkg3/package.json' does not have field "type"
	fileWithTypeRefs.ts
	  Matched by include pattern '*.ts' in 'tsconfig.json'
	  File is CommonJS module because 'package.json' was not found
	node_modules/pkg0/import.d.ts
	  Imported via "pkg0" from file 'randomFileForImport.ts' with packageId 'pkg0/import.d.ts@0.0.1'
	  File is CommonJS module because 'node_modules/pkg0/package.json' does not have field "type"
	randomFileForImport.ts
	  Matched by include pattern '*.ts' in 'tsconfig.json'
	  File is CommonJS module because 'package.json' was not found
	randomFileForTypeRef.ts
	  Matched by include pattern '*.ts' in 'tsconfig.json'
	  File is CommonJS module because 'package.json' was not found
	node_modules/@types/pkg4/index.d.ts
	  Entry point for implicit type library 'pkg4'
	  File is CommonJS module because 'package.json' was not found

Info 648  [00:13:21.000] -----------------------------------------------
Info 649  [00:13:22.000] Running: *ensureProjectForOpenFiles*
Info 650  [00:13:23.000] Before ensureProjectForOpenFiles:
Info 651  [00:13:24.000] Project '/src/project/tsconfig.json' (Configured)
Info 651  [00:13:25.000] 	Files (8)

Info 651  [00:13:26.000] -----------------------------------------------
Info 651  [00:13:27.000] Open files: 
Info 651  [00:13:28.000] 	FileName: /src/project/randomFileForImport.ts ProjectRootPath: undefined
Info 651  [00:13:29.000] 		Projects: /src/project/tsconfig.json
Info 651  [00:13:30.000] 	FileName: /src/project/randomFileForTypeRef.ts ProjectRootPath: undefined
Info 651  [00:13:31.000] 		Projects: /src/project/tsconfig.json
Info 651  [00:13:32.000] After ensureProjectForOpenFiles:
Info 652  [00:13:33.000] Project '/src/project/tsconfig.json' (Configured)
Info 652  [00:13:34.000] 	Files (8)

Info 652  [00:13:35.000] -----------------------------------------------
Info 652  [00:13:36.000] Open files: 
Info 652  [00:13:37.000] 	FileName: /src/project/randomFileForImport.ts ProjectRootPath: undefined
Info 652  [00:13:38.000] 		Projects: /src/project/tsconfig.json
Info 652  [00:13:39.000] 	FileName: /src/project/randomFileForTypeRef.ts ProjectRootPath: undefined
Info 652  [00:13:40.000] 		Projects: /src/project/tsconfig.json
After running timeout callbacks

PolledWatches::
/src/project/node_modules/@types/pkg4/package.json:
  {"pollingInterval":2000}
/src/project/node_modules/@types/package.json:
  {"pollingInterval":2000}
/src/project/node_modules/package.json:
  {"pollingInterval":2000}

FsWatches::
/src/project/tsconfig.json:
  {}
/src/project:
  {}
/src/project/filewithtyperefs.ts:
  {}
/a/lib/lib.d.ts:
  {}
/src/project/node_modules/pkg0/package.json:
  {}
/src/project/node_modules/pkg2/package.json:
  {}
/src/project/node_modules/pkg3/package.json:
  {}

FsWatchesRecursive::
/src/project/node_modules:
  {}
/src/project/node_modules/@types:
  {}

Info 652  [00:13:41.000] delete file with typeRefs
Info 653  [00:13:43.000] FileWatcher:: Triggered with /src/project/fileWithTypeRefs.ts 2:: WatchInfo: /src/project/fileWithTypeRefs.ts 500 undefined WatchType: Closed Script info
Info 654  [00:13:44.000] FileWatcher:: Close:: WatchInfo: /src/project/fileWithTypeRefs.ts 500 undefined WatchType: Closed Script info
Info 655  [00:13:45.000] Scheduled: /src/project/tsconfig.json
Info 656  [00:13:46.000] Scheduled: *ensureProjectForOpenFiles*
Info 657  [00:13:47.000] Elapsed:: *ms FileWatcher:: Triggered with /src/project/fileWithTypeRefs.ts 2:: WatchInfo: /src/project/fileWithTypeRefs.ts 500 undefined WatchType: Closed Script info
Info 658  [00:13:48.000] DirectoryWatcher:: Triggered with /src/project/fileWithTypeRefs.ts :: WatchInfo: /src/project 0 undefined Config: /src/project/tsconfig.json WatchType: Wild card directory
Info 659  [00:13:49.000] Scheduled: /src/project/tsconfig.json, Cancelled earlier one
Info 660  [00:13:50.000] Scheduled: *ensureProjectForOpenFiles*, Cancelled earlier one
Info 661  [00:13:51.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /src/project/fileWithTypeRefs.ts :: WatchInfo: /src/project 0 undefined Config: /src/project/tsconfig.json WatchType: Wild card directory
Before running timeout callbacks
//// [/src/project/fileWithTypeRefs.ts] deleted

PolledWatches::
/src/project/node_modules/@types/pkg4/package.json:
  {"pollingInterval":2000}
/src/project/node_modules/@types/package.json:
  {"pollingInterval":2000}
/src/project/node_modules/package.json:
  {"pollingInterval":2000}

FsWatches::
/src/project/tsconfig.json:
  {}
/src/project:
  {}
/a/lib/lib.d.ts:
  {}
/src/project/node_modules/pkg0/package.json:
  {}
/src/project/node_modules/pkg2/package.json:
  {}
/src/project/node_modules/pkg3/package.json:
  {}

FsWatchesRecursive::
/src/project/node_modules:
  {}
/src/project/node_modules/@types:
  {}

Info 662  [00:13:52.000] Running: /src/project/tsconfig.json
Info 663  [00:13:53.000] Starting updateGraphWorker: Project: /src/project/tsconfig.json
Info 664  [00:13:54.000] File '/src/project/package.json' does not exist according to earlier cached lookups.
Info 665  [00:13:55.000] File '/src/package.json' does not exist according to earlier cached lookups.
Info 666  [00:13:56.000] File '/package.json' does not exist according to earlier cached lookups.
Info 667  [00:13:57.000] Reusing resolution of module 'pkg0' from '/src/project/randomFileForImport.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/import.d.ts' with Package ID 'pkg0/import.d.ts@0.0.1'.
Info 668  [00:13:58.000] File '/src/project/node_modules/pkg0/package.json' exists according to earlier cached lookups.
Info 669  [00:13:59.000] File '/src/project/package.json' does not exist according to earlier cached lookups.
Info 670  [00:14:00.000] File '/src/package.json' does not exist according to earlier cached lookups.
Info 671  [00:14:01.000] File '/package.json' does not exist according to earlier cached lookups.
Info 672  [00:14:02.000] Reusing resolution of type reference directive 'pkg2' from '/src/project/randomFileForTypeRef.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg2/import.d.ts' with Package ID 'pkg2/import.d.ts@0.0.1'.
Info 673  [00:14:03.000] File '/src/project/node_modules/pkg2/package.json' exists according to earlier cached lookups.
Info 674  [00:14:04.000] Reusing resolution of type reference directive 'pkg4' from '/src/project/__inferred type names__.ts' of old program, it was successfully resolved to '/src/project/node_modules/@types/pkg4/index.d.ts'.
Info 675  [00:14:05.000] File '/src/project/node_modules/@types/pkg4/package.json' does not exist according to earlier cached lookups.
Info 676  [00:14:06.000] File '/src/project/node_modules/@types/package.json' does not exist according to earlier cached lookups.
Info 677  [00:14:07.000] File '/src/project/node_modules/package.json' does not exist according to earlier cached lookups.
Info 678  [00:14:08.000] File '/src/project/package.json' does not exist according to earlier cached lookups.
Info 679  [00:14:09.000] File '/src/package.json' does not exist according to earlier cached lookups.
Info 680  [00:14:10.000] File '/package.json' does not exist according to earlier cached lookups.
Info 681  [00:14:11.000] File '/a/lib/package.json' does not exist according to earlier cached lookups.
Info 682  [00:14:12.000] File '/a/package.json' does not exist according to earlier cached lookups.
Info 683  [00:14:13.000] File '/package.json' does not exist according to earlier cached lookups.
Info 684  [00:14:14.000] FileWatcher:: Close:: WatchInfo: /src/project/node_modules/pkg3/package.json 2000 undefined Project: /src/project/tsconfig.json WatchType: File location affecting resolution
Info 685  [00:14:15.000] Finishing updateGraphWorker: Project: /src/project/tsconfig.json Version: 9 structureChanged: true structureIsReused:: SafeModuleCache Elapsed:: *ms
Info 686  [00:14:16.000] Project '/src/project/tsconfig.json' (Configured)
Info 687  [00:14:17.000] 	Files (6)
	/a/lib/lib.d.ts
	/src/project/node_modules/pkg0/import.d.ts
	/src/project/randomFileForImport.ts
	/src/project/node_modules/pkg2/import.d.ts
	/src/project/randomFileForTypeRef.ts
	/src/project/node_modules/@types/pkg4/index.d.ts


	../../a/lib/lib.d.ts
	  Default library for target 'es5'
	node_modules/pkg0/import.d.ts
	  Imported via "pkg0" from file 'randomFileForImport.ts' with packageId 'pkg0/import.d.ts@0.0.1'
	  File is CommonJS module because 'node_modules/pkg0/package.json' does not have field "type"
	randomFileForImport.ts
	  Matched by include pattern '*.ts' in 'tsconfig.json'
	  File is CommonJS module because 'package.json' was not found
	node_modules/pkg2/import.d.ts
	  Type library referenced via 'pkg2' from file 'randomFileForTypeRef.ts' with packageId 'pkg2/import.d.ts@0.0.1'
	  File is CommonJS module because 'node_modules/pkg2/package.json' does not have field "type"
	randomFileForTypeRef.ts
	  Matched by include pattern '*.ts' in 'tsconfig.json'
	  File is CommonJS module because 'package.json' was not found
	node_modules/@types/pkg4/index.d.ts
	  Entry point for implicit type library 'pkg4'
	  File is CommonJS module because 'package.json' was not found

Info 688  [00:14:18.000] -----------------------------------------------
Info 689  [00:14:19.000] Running: *ensureProjectForOpenFiles*
Info 690  [00:14:20.000] Before ensureProjectForOpenFiles:
Info 691  [00:14:21.000] Project '/src/project/tsconfig.json' (Configured)
Info 691  [00:14:22.000] 	Files (6)

Info 691  [00:14:23.000] -----------------------------------------------
Info 691  [00:14:24.000] Open files: 
Info 691  [00:14:25.000] 	FileName: /src/project/randomFileForImport.ts ProjectRootPath: undefined
Info 691  [00:14:26.000] 		Projects: /src/project/tsconfig.json
Info 691  [00:14:27.000] 	FileName: /src/project/randomFileForTypeRef.ts ProjectRootPath: undefined
Info 691  [00:14:28.000] 		Projects: /src/project/tsconfig.json
Info 691  [00:14:29.000] After ensureProjectForOpenFiles:
Info 692  [00:14:30.000] Project '/src/project/tsconfig.json' (Configured)
Info 692  [00:14:31.000] 	Files (6)

Info 692  [00:14:32.000] -----------------------------------------------
Info 692  [00:14:33.000] Open files: 
Info 692  [00:14:34.000] 	FileName: /src/project/randomFileForImport.ts ProjectRootPath: undefined
Info 692  [00:14:35.000] 		Projects: /src/project/tsconfig.json
Info 692  [00:14:36.000] 	FileName: /src/project/randomFileForTypeRef.ts ProjectRootPath: undefined
Info 692  [00:14:37.000] 		Projects: /src/project/tsconfig.json
After running timeout callbacks

PolledWatches::
/src/project/node_modules/@types/pkg4/package.json:
  {"pollingInterval":2000}
/src/project/node_modules/@types/package.json:
  {"pollingInterval":2000}
/src/project/node_modules/package.json:
  {"pollingInterval":2000}

FsWatches::
/src/project/tsconfig.json:
  {}
/src/project:
  {}
/a/lib/lib.d.ts:
  {}
/src/project/node_modules/pkg0/package.json:
  {}
/src/project/node_modules/pkg2/package.json:
  {}

FsWatchesRecursive::
/src/project/node_modules:
  {}
/src/project/node_modules/@types:
  {}

Info 692  [00:14:38.000] delete resolved import file
Info 693  [00:14:40.000] DirectoryWatcher:: Triggered with /src/project/node_modules/pkg0/import.d.ts :: WatchInfo: /src/project/node_modules 1 undefined WatchType: node_modules for closed script infos and package.jsons affecting module specifier cache
Info 694  [00:14:41.000] Scheduled: /src/project/tsconfig.json
Info 695  [00:14:42.000] Scheduled: *ensureProjectForOpenFiles*
Info 696  [00:14:43.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /src/project/node_modules/pkg0/import.d.ts :: WatchInfo: /src/project/node_modules 1 undefined WatchType: node_modules for closed script infos and package.jsons affecting module specifier cache
Before running timeout callbacks
//// [/src/project/node_modules/pkg0/import.d.ts] deleted

PolledWatches::
/src/project/node_modules/@types/pkg4/package.json:
  {"pollingInterval":2000}
/src/project/node_modules/@types/package.json:
  {"pollingInterval":2000}
/src/project/node_modules/package.json:
  {"pollingInterval":2000}

FsWatches::
/src/project/tsconfig.json:
  {}
/src/project:
  {}
/a/lib/lib.d.ts:
  {}
/src/project/node_modules/pkg0/package.json:
  {}
/src/project/node_modules/pkg2/package.json:
  {}

FsWatchesRecursive::
/src/project/node_modules:
  {}
/src/project/node_modules/@types:
  {}

Info 697  [00:14:44.000] Running: /src/project/tsconfig.json
Info 698  [00:14:45.000] Starting updateGraphWorker: Project: /src/project/tsconfig.json
Info 699  [00:14:46.000] File '/a/lib/package.json' does not exist according to earlier cached lookups.
Info 700  [00:14:47.000] File '/a/package.json' does not exist according to earlier cached lookups.
Info 701  [00:14:48.000] File '/package.json' does not exist according to earlier cached lookups.
Info 702  [00:14:49.000] File '/src/project/node_modules/pkg0/package.json' exists according to earlier cached lookups.
Info 703  [00:14:50.000] File '/src/project/package.json' does not exist according to earlier cached lookups.
Info 704  [00:14:51.000] File '/src/package.json' does not exist according to earlier cached lookups.
Info 705  [00:14:52.000] File '/package.json' does not exist according to earlier cached lookups.
Info 706  [00:14:53.000] ======== Resolving module 'pkg0' from '/src/project/randomFileForImport.ts'. ========
Info 707  [00:14:54.000] Explicitly specified module resolution kind: 'Node16'.
Info 708  [00:14:55.000] Resolving in ESM mode with conditions 'node', 'import', 'types'.
Info 709  [00:14:56.000] File '/src/project/package.json' does not exist according to earlier cached lookups.
Info 710  [00:14:57.000] File '/src/package.json' does not exist according to earlier cached lookups.
Info 711  [00:14:58.000] File '/package.json' does not exist according to earlier cached lookups.
Info 712  [00:14:59.000] Loading module 'pkg0' from 'node_modules' folder, target file types: TypeScript, JavaScript, Declaration.
Info 713  [00:15:00.000] File '/src/project/node_modules/pkg0/package.json' exists according to earlier cached lookups.
Info 714  [00:15:01.000] Matched 'exports' condition 'import'.
Info 715  [00:15:02.000] Using 'exports' subpath '.' with target './import.js'.
Info 716  [00:15:03.000] File name '/src/project/node_modules/pkg0/import.js' has a '.js' extension - stripping it.
Info 717  [00:15:04.000] File '/src/project/node_modules/pkg0/import.ts' does not exist.
Info 718  [00:15:05.000] File '/src/project/node_modules/pkg0/import.tsx' does not exist.
Info 719  [00:15:06.000] File '/src/project/node_modules/pkg0/import.d.ts' does not exist.
Info 720  [00:15:07.000] Saw non-matching condition 'require'.
Info 721  [00:15:08.000] Directory '/src/node_modules' does not exist, skipping all lookups in it.
Info 722  [00:15:09.000] Directory '/node_modules' does not exist, skipping all lookups in it.
Info 723  [00:15:10.000] File '/src/project/node_modules/pkg0/package.json' exists according to earlier cached lookups.
Info 724  [00:15:11.000] Matched 'exports' condition 'import'.
Info 725  [00:15:12.000] Using 'exports' subpath '.' with target './import.js'.
Info 726  [00:15:13.000] File name '/src/project/node_modules/pkg0/import.js' has a '.js' extension - stripping it.
Info 727  [00:15:14.000] File '/src/project/node_modules/pkg0/import.js' does not exist.
Info 728  [00:15:15.000] File '/src/project/node_modules/pkg0/import.jsx' does not exist.
Info 729  [00:15:16.000] Saw non-matching condition 'require'.
Info 730  [00:15:17.000] Directory '/src/node_modules' does not exist, skipping all lookups in it.
Info 731  [00:15:18.000] Directory '/node_modules' does not exist, skipping all lookups in it.
Info 732  [00:15:19.000] ======== Module name 'pkg0' was not resolved. ========
Info 733  [00:15:20.000] File '/src/project/package.json' does not exist according to earlier cached lookups.
Info 734  [00:15:21.000] File '/src/package.json' does not exist according to earlier cached lookups.
Info 735  [00:15:22.000] File '/package.json' does not exist according to earlier cached lookups.
Info 736  [00:15:23.000] Reusing resolution of type reference directive 'pkg2' from '/src/project/randomFileForTypeRef.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg2/import.d.ts' with Package ID 'pkg2/import.d.ts@0.0.1'.
Info 737  [00:15:24.000] File '/src/project/node_modules/pkg2/package.json' exists according to earlier cached lookups.
Info 738  [00:15:25.000] Reusing resolution of type reference directive 'pkg4' from '/src/project/__inferred type names__.ts' of old program, it was successfully resolved to '/src/project/node_modules/@types/pkg4/index.d.ts'.
Info 739  [00:15:26.000] File '/src/project/node_modules/@types/pkg4/package.json' does not exist according to earlier cached lookups.
Info 740  [00:15:27.000] File '/src/project/node_modules/@types/package.json' does not exist according to earlier cached lookups.
Info 741  [00:15:28.000] File '/src/project/node_modules/package.json' does not exist according to earlier cached lookups.
Info 742  [00:15:29.000] File '/src/project/package.json' does not exist according to earlier cached lookups.
Info 743  [00:15:30.000] File '/src/package.json' does not exist according to earlier cached lookups.
Info 744  [00:15:31.000] File '/package.json' does not exist according to earlier cached lookups.
Info 745  [00:15:32.000] File '/a/lib/package.json' does not exist according to earlier cached lookups.
Info 746  [00:15:33.000] File '/a/package.json' does not exist according to earlier cached lookups.
Info 747  [00:15:34.000] File '/package.json' does not exist according to earlier cached lookups.
Info 748  [00:15:35.000] DirectoryWatcher:: Added:: WatchInfo: /src/project/node_modules 1 undefined Project: /src/project/tsconfig.json WatchType: Failed Lookup Locations
Info 749  [00:15:36.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /src/project/node_modules 1 undefined Project: /src/project/tsconfig.json WatchType: Failed Lookup Locations
Info 750  [00:15:37.000] DirectoryWatcher:: Added:: WatchInfo: /src/project 0 undefined Project: /src/project/tsconfig.json WatchType: Failed Lookup Locations
Info 751  [00:15:38.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /src/project 0 undefined Project: /src/project/tsconfig.json WatchType: Failed Lookup Locations
Info 752  [00:15:39.000] Finishing updateGraphWorker: Project: /src/project/tsconfig.json Version: 10 structureChanged: true structureIsReused:: SafeModuleCache Elapsed:: *ms
Info 753  [00:15:40.000] Project '/src/project/tsconfig.json' (Configured)
Info 754  [00:15:41.000] 	Files (5)
	/a/lib/lib.d.ts
	/src/project/randomFileForImport.ts
	/src/project/node_modules/pkg2/import.d.ts
	/src/project/randomFileForTypeRef.ts
	/src/project/node_modules/@types/pkg4/index.d.ts


	../../a/lib/lib.d.ts
	  Default library for target 'es5'
	randomFileForImport.ts
	  Matched by include pattern '*.ts' in 'tsconfig.json'
	  File is CommonJS module because 'package.json' was not found
	node_modules/pkg2/import.d.ts
	  Type library referenced via 'pkg2' from file 'randomFileForTypeRef.ts' with packageId 'pkg2/import.d.ts@0.0.1'
	  File is CommonJS module because 'node_modules/pkg2/package.json' does not have field "type"
	randomFileForTypeRef.ts
	  Matched by include pattern '*.ts' in 'tsconfig.json'
	  File is CommonJS module because 'package.json' was not found
	node_modules/@types/pkg4/index.d.ts
	  Entry point for implicit type library 'pkg4'
	  File is CommonJS module because 'package.json' was not found

Info 755  [00:15:42.000] -----------------------------------------------
Info 756  [00:15:43.000] Running: *ensureProjectForOpenFiles*
Info 757  [00:15:44.000] Before ensureProjectForOpenFiles:
Info 758  [00:15:45.000] Project '/src/project/tsconfig.json' (Configured)
Info 758  [00:15:46.000] 	Files (5)

Info 758  [00:15:47.000] -----------------------------------------------
Info 758  [00:15:48.000] Open files: 
Info 758  [00:15:49.000] 	FileName: /src/project/randomFileForImport.ts ProjectRootPath: undefined
Info 758  [00:15:50.000] 		Projects: /src/project/tsconfig.json
Info 758  [00:15:51.000] 	FileName: /src/project/randomFileForTypeRef.ts ProjectRootPath: undefined
Info 758  [00:15:52.000] 		Projects: /src/project/tsconfig.json
Info 758  [00:15:53.000] After ensureProjectForOpenFiles:
Info 759  [00:15:54.000] Project '/src/project/tsconfig.json' (Configured)
Info 759  [00:15:55.000] 	Files (5)

Info 759  [00:15:56.000] -----------------------------------------------
Info 759  [00:15:57.000] Open files: 
Info 759  [00:15:58.000] 	FileName: /src/project/randomFileForImport.ts ProjectRootPath: undefined
Info 759  [00:15:59.000] 		Projects: /src/project/tsconfig.json
Info 759  [00:16:00.000] 	FileName: /src/project/randomFileForTypeRef.ts ProjectRootPath: undefined
Info 759  [00:16:01.000] 		Projects: /src/project/tsconfig.json
After running timeout callbacks

PolledWatches::
/src/project/node_modules/@types/pkg4/package.json:
  {"pollingInterval":2000}
/src/project/node_modules/@types/package.json:
  {"pollingInterval":2000}
/src/project/node_modules/package.json:
  {"pollingInterval":2000}

FsWatches::
/src/project/tsconfig.json:
  {}
/src/project:
  {}
/a/lib/lib.d.ts:
  {}
/src/project/node_modules/pkg0/package.json:
  {}
/src/project/node_modules/pkg2/package.json:
  {}

FsWatchesRecursive::
/src/project/node_modules:
  {}
/src/project/node_modules/@types:
  {}

Info 759  [00:16:02.000] delete resolved typeRef file
Info 760  [00:16:04.000] DirectoryWatcher:: Triggered with /src/project/node_modules/pkg2/import.d.ts :: WatchInfo: /src/project/node_modules 1 undefined WatchType: node_modules for closed script infos and package.jsons affecting module specifier cache
Info 761  [00:16:05.000] Scheduled: /src/project/tsconfig.json
Info 762  [00:16:06.000] Scheduled: *ensureProjectForOpenFiles*
Info 763  [00:16:07.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /src/project/node_modules/pkg2/import.d.ts :: WatchInfo: /src/project/node_modules 1 undefined WatchType: node_modules for closed script infos and package.jsons affecting module specifier cache
Info 764  [00:16:08.000] DirectoryWatcher:: Triggered with /src/project/node_modules/pkg2/import.d.ts :: WatchInfo: /src/project/node_modules 1 undefined Project: /src/project/tsconfig.json WatchType: Failed Lookup Locations
Info 765  [00:16:09.000] Scheduled: /src/project/tsconfig.jsonFailedLookupInvalidation
Info 766  [00:16:10.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /src/project/node_modules/pkg2/import.d.ts :: WatchInfo: /src/project/node_modules 1 undefined Project: /src/project/tsconfig.json WatchType: Failed Lookup Locations
Before running timeout callbacks
//// [/src/project/node_modules/pkg2/import.d.ts] deleted

PolledWatches::
/src/project/node_modules/@types/pkg4/package.json:
  {"pollingInterval":2000}
/src/project/node_modules/@types/package.json:
  {"pollingInterval":2000}
/src/project/node_modules/package.json:
  {"pollingInterval":2000}

FsWatches::
/src/project/tsconfig.json:
  {}
/src/project:
  {}
/a/lib/lib.d.ts:
  {}
/src/project/node_modules/pkg0/package.json:
  {}
/src/project/node_modules/pkg2/package.json:
  {}

FsWatchesRecursive::
/src/project/node_modules:
  {}
/src/project/node_modules/@types:
  {}

Info 767  [00:16:11.000] Running: /src/project/tsconfig.json
Info 768  [00:16:12.000] Starting updateGraphWorker: Project: /src/project/tsconfig.json
Info 769  [00:16:13.000] File '/a/lib/package.json' does not exist according to earlier cached lookups.
Info 770  [00:16:14.000] File '/a/package.json' does not exist according to earlier cached lookups.
Info 771  [00:16:15.000] File '/package.json' does not exist according to earlier cached lookups.
Info 772  [00:16:16.000] File '/src/project/package.json' does not exist according to earlier cached lookups.
Info 773  [00:16:17.000] File '/src/package.json' does not exist according to earlier cached lookups.
Info 774  [00:16:18.000] File '/package.json' does not exist according to earlier cached lookups.
Info 775  [00:16:19.000] Found 'package.json' at '/src/project/node_modules/pkg2/package.json'.
Info 776  [00:16:20.000] File '/src/project/package.json' does not exist according to earlier cached lookups.
Info 777  [00:16:21.000] File '/src/package.json' does not exist according to earlier cached lookups.
Info 778  [00:16:22.000] File '/package.json' does not exist according to earlier cached lookups.
Info 779  [00:16:23.000] Reusing resolution of module 'pkg0' from '/src/project/randomFileForImport.ts' of old program, it was not resolved.
Info 780  [00:16:24.000] File '/src/project/package.json' does not exist according to earlier cached lookups.
Info 781  [00:16:25.000] File '/src/package.json' does not exist according to earlier cached lookups.
Info 782  [00:16:26.000] File '/package.json' does not exist according to earlier cached lookups.
Info 783  [00:16:27.000] ======== Resolving type reference directive 'pkg2', containing file '/src/project/randomFileForTypeRef.ts', root directory '/src/project/node_modules/@types'. ========
Info 784  [00:16:28.000] Resolving with primary search path '/src/project/node_modules/@types'.
Info 785  [00:16:29.000] Looking up in 'node_modules' folder, initial location '/src/project'.
Info 786  [00:16:30.000] File '/src/project/node_modules/pkg2/package.json' exists according to earlier cached lookups.
Info 787  [00:16:31.000] Matched 'exports' condition 'import'.
Info 788  [00:16:32.000] Using 'exports' subpath '.' with target './import.js'.
Info 789  [00:16:33.000] File name '/src/project/node_modules/pkg2/import.js' has a '.js' extension - stripping it.
Info 790  [00:16:34.000] File '/src/project/node_modules/pkg2/import.d.ts' does not exist.
Info 791  [00:16:35.000] Saw non-matching condition 'require'.
Info 792  [00:16:36.000] Directory '/src/node_modules' does not exist, skipping all lookups in it.
Info 793  [00:16:37.000] Directory '/node_modules' does not exist, skipping all lookups in it.
Info 794  [00:16:38.000] ======== Type reference directive 'pkg2' was not resolved. ========
Info 795  [00:16:39.000] Reusing resolution of type reference directive 'pkg4' from '/src/project/__inferred type names__.ts' of old program, it was successfully resolved to '/src/project/node_modules/@types/pkg4/index.d.ts'.
Info 796  [00:16:40.000] File '/src/project/node_modules/@types/pkg4/package.json' does not exist according to earlier cached lookups.
Info 797  [00:16:41.000] File '/src/project/node_modules/@types/package.json' does not exist according to earlier cached lookups.
Info 798  [00:16:42.000] File '/src/project/node_modules/package.json' does not exist according to earlier cached lookups.
Info 799  [00:16:43.000] File '/src/project/package.json' does not exist according to earlier cached lookups.
Info 800  [00:16:44.000] File '/src/package.json' does not exist according to earlier cached lookups.
Info 801  [00:16:45.000] File '/package.json' does not exist according to earlier cached lookups.
Info 802  [00:16:46.000] File '/a/lib/package.json' does not exist according to earlier cached lookups.
Info 803  [00:16:47.000] File '/a/package.json' does not exist according to earlier cached lookups.
Info 804  [00:16:48.000] File '/package.json' does not exist according to earlier cached lookups.
Info 805  [00:16:49.000] Finishing updateGraphWorker: Project: /src/project/tsconfig.json Version: 11 structureChanged: true structureIsReused:: SafeModuleCache Elapsed:: *ms
Info 806  [00:16:50.000] Project '/src/project/tsconfig.json' (Configured)
Info 807  [00:16:51.000] 	Files (4)
	/a/lib/lib.d.ts
	/src/project/randomFileForImport.ts
	/src/project/randomFileForTypeRef.ts
	/src/project/node_modules/@types/pkg4/index.d.ts


	../../a/lib/lib.d.ts
	  Default library for target 'es5'
	randomFileForImport.ts
	  Matched by include pattern '*.ts' in 'tsconfig.json'
	  File is CommonJS module because 'package.json' was not found
	randomFileForTypeRef.ts
	  Matched by include pattern '*.ts' in 'tsconfig.json'
	  File is CommonJS module because 'package.json' was not found
	node_modules/@types/pkg4/index.d.ts
	  Entry point for implicit type library 'pkg4'
	  File is CommonJS module because 'package.json' was not found

Info 808  [00:16:52.000] -----------------------------------------------
Info 809  [00:16:53.000] Running: *ensureProjectForOpenFiles*
Info 810  [00:16:54.000] Before ensureProjectForOpenFiles:
Info 811  [00:16:55.000] Project '/src/project/tsconfig.json' (Configured)
Info 811  [00:16:56.000] 	Files (4)

Info 811  [00:16:57.000] -----------------------------------------------
Info 811  [00:16:58.000] Open files: 
Info 811  [00:16:59.000] 	FileName: /src/project/randomFileForImport.ts ProjectRootPath: undefined
Info 811  [00:17:00.000] 		Projects: /src/project/tsconfig.json
Info 811  [00:17:01.000] 	FileName: /src/project/randomFileForTypeRef.ts ProjectRootPath: undefined
Info 811  [00:17:02.000] 		Projects: /src/project/tsconfig.json
Info 811  [00:17:03.000] After ensureProjectForOpenFiles:
Info 812  [00:17:04.000] Project '/src/project/tsconfig.json' (Configured)
Info 812  [00:17:05.000] 	Files (4)

Info 812  [00:17:06.000] -----------------------------------------------
Info 812  [00:17:07.000] Open files: 
Info 812  [00:17:08.000] 	FileName: /src/project/randomFileForImport.ts ProjectRootPath: undefined
Info 812  [00:17:09.000] 		Projects: /src/project/tsconfig.json
Info 812  [00:17:10.000] 	FileName: /src/project/randomFileForTypeRef.ts ProjectRootPath: undefined
Info 812  [00:17:11.000] 		Projects: /src/project/tsconfig.json
After running timeout callbacks

PolledWatches::
/src/project/node_modules/@types/pkg4/package.json:
  {"pollingInterval":2000}
/src/project/node_modules/@types/package.json:
  {"pollingInterval":2000}
/src/project/node_modules/package.json:
  {"pollingInterval":2000}

FsWatches::
/src/project/tsconfig.json:
  {}
/src/project:
  {}
/a/lib/lib.d.ts:
  {}
/src/project/node_modules/pkg0/package.json:
  {}
/src/project/node_modules/pkg2/package.json:
  {}

FsWatchesRecursive::
/src/project/node_modules:
  {}
/src/project/node_modules/@types:
  {}
