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
{"program":{"fileNames":["../../a/lib/lib.d.ts","./node_modules/pkg0/import.d.ts","./filewithimports.ts","./node_modules/pkg2/import.d.ts","./filewithtyperefs.ts","./randomfileforimport.ts","./randomfilefortyperef.ts","./node_modules/@types/pkg4/index.d.ts","./","./node_modules/pkg0/package.json","./node_modules/pkg2/package.json"],"fileInfos":[{"version":"-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }","affectsGlobalScope":true,"impliedFormat":1},{"version":"769951468-export interface ImportInterface0 {}","impliedFormat":1},{"version":"4079531109-import type { ImportInterface0 } from \"pkg0\" assert { \"resolution-mode\": \"import\" };\nimport type { RequireInterface1 } from \"pkg1\" assert { \"resolution-mode\": \"require\" };\n","impliedFormat":1},{"version":"1714206242-export {};\ndeclare global {\n    interface ImportInterface2 {}\n}\n","affectsGlobalScope":true,"impliedFormat":1},{"version":"-20622778057-/// <reference types=\"pkg2\" resolution-mode=\"import\"/>\n/// <reference types=\"pkg3\" resolution-mode=\"require\"/>\ninterface LocalInterface extends ImportInterface2, RequireInterface3 {}\nexport {}\n","impliedFormat":1},{"version":"-10726455937-export const x = 10;","impliedFormat":1},{"version":"-10726455937-export const x = 10;","impliedFormat":1},{"version":"-10726455937-export const x = 10;","impliedFormat":1}],"options":{"cacheResolutions":true,"composite":true,"moduleResolution":3},"fileIdsList":[[2],[4]],"referencedMap":[[3,1],[5,2]],"exportedModulesMap":[[3,1],[5,2]],"semanticDiagnosticsPerFile":[1,[3,[{"file":"./filewithimports.ts","start":124,"length":6,"messageText":"Cannot find module 'pkg1' or its corresponding type declarations.","category":1,"code":2307}]],[5,[{"file":"./filewithtyperefs.ts","start":162,"length":17,"messageText":"Cannot find name 'RequireInterface3'.","category":1,"code":2304}]],8,2,4,6,7],"affectedFilesPendingEmit":[3,5,6,7],"emitSignatures":[3,5,6,7],"cacheResolutions":{"resolutions":[{"resolvedModule":{"resolvedFileName":2,"packageId":{"name":"pkg0","subModuleName":"import.d.ts","version":"0.0.1"}},"affectingLocations":[10]},{"resolvedTypeReferenceDirective":{"resolvedFileName":4,"packageId":{"name":"pkg2","subModuleName":"import.d.ts","version":"0.0.1"}},"affectingLocations":[11],"notPrimary":true},{"resolvedTypeReferenceDirective":8}],"names":["pkg0","pkg2","pkg4"],"hash":[[10,"9838425114-{\"name\":\"pkg0\",\"version\":\"0.0.1\",\"exports\":{\"import\":\"./import.js\",\"require\":\"./require.js\"}}"],[11,"21696956444-{\"name\":\"pkg2\",\"version\":\"0.0.1\",\"exports\":{\"import\":\"./import.js\",\"require\":\"./require.js\"}}"]],"resolutionEntries":[[1,1,99],[2,2,99],[3,3]],"modules":[[9,[1]]],"typeRefs":[[9,[2,3]]]}},"version":"FakeTSVersion"}

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
              }
            },
            "affectingLocations": [
              11
            ],
            "notPrimary": true
          },
          "resolutionId": 2,
          "resolvedTypeReferenceDirective": {
            "resolvedFileName": "./node_modules/pkg2/import.d.ts",
            "packageId": {
              "name": "pkg2",
              "subModuleName": "import.d.ts",
              "version": "0.0.1"
            }
          },
          "affectingLocations": [
            "./node_modules/pkg2/package.json"
          ],
          "notPrimary": true
        },
        {
          "original": {
            "resolvedTypeReferenceDirective": 8
          },
          "resolutionId": 3,
          "resolvedTypeReferenceDirective": "./node_modules/@types/pkg4/index.d.ts"
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
              }
            },
            "affectingLocations": [
              "./node_modules/pkg2/package.json"
            ],
            "notPrimary": true
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
            "resolvedTypeReferenceDirective": "./node_modules/@types/pkg4/index.d.ts"
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
                  }
                },
                "affectingLocations": [
                  "./node_modules/pkg2/package.json"
                ],
                "notPrimary": true
              },
              "mode": "esnext"
            },
            {
              "resolutionEntryId": 3,
              "name": "pkg4",
              "resolution": {
                "resolutionId": 3,
                "resolvedTypeReferenceDirective": "./node_modules/@types/pkg4/index.d.ts"
              }
            }
          ]
        }
      ]
    }
  },
  "version": "FakeTSVersion",
  "size": 3054
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
Info 17   [00:01:22.000] Resolving real path for '/src/project/node_modules/pkg0/import.d.ts', result '/src/project/node_modules/pkg0/import.d.ts'.
Info 18   [00:01:23.000] Reusing resolution of module 'pkg0' from '/src/project/fileWithImports.ts' found in cache from location '/src/project', it was successfully resolved to '/src/project/node_modules/pkg0/import.d.ts' with Package ID 'pkg0/import.d.ts@0.0.1'.
Info 19   [00:01:24.000] ======== Resolving module 'pkg1' from '/src/project/fileWithImports.ts'. ========
Info 20   [00:01:25.000] Explicitly specified module resolution kind: 'Node16'.
Info 21   [00:01:26.000] Resolving in CJS mode with conditions 'node', 'require', 'types'.
Info 22   [00:01:27.000] File '/src/project/package.json' does not exist according to earlier cached lookups.
Info 23   [00:01:28.000] File '/src/package.json' does not exist according to earlier cached lookups.
Info 24   [00:01:29.000] File '/package.json' does not exist according to earlier cached lookups.
Info 25   [00:01:30.000] Loading module 'pkg1' from 'node_modules' folder, target file types: TypeScript, JavaScript, Declaration.
Info 26   [00:01:31.000] Found 'package.json' at '/src/project/node_modules/pkg1/package.json'.
Info 27   [00:01:32.000] Saw non-matching condition 'import'.
Info 28   [00:01:33.000] Matched 'exports' condition 'require'.
Info 29   [00:01:34.000] Using 'exports' subpath '.' with target './require.js'.
Info 30   [00:01:35.000] File name '/src/project/node_modules/pkg1/require.js' has a '.js' extension - stripping it.
Info 31   [00:01:36.000] File '/src/project/node_modules/pkg1/require.ts' does not exist.
Info 32   [00:01:37.000] File '/src/project/node_modules/pkg1/require.tsx' does not exist.
Info 33   [00:01:38.000] File '/src/project/node_modules/pkg1/require.d.ts' does not exist.
Info 34   [00:01:39.000] File '/src/project/node_modules/@types/pkg1.d.ts' does not exist.
Info 35   [00:01:40.000] Directory '/src/node_modules' does not exist, skipping all lookups in it.
Info 36   [00:01:41.000] Directory '/node_modules' does not exist, skipping all lookups in it.
Info 37   [00:01:42.000] File '/src/project/node_modules/pkg1/package.json' exists according to earlier cached lookups.
Info 38   [00:01:43.000] Saw non-matching condition 'import'.
Info 39   [00:01:44.000] Matched 'exports' condition 'require'.
Info 40   [00:01:45.000] Using 'exports' subpath '.' with target './require.js'.
Info 41   [00:01:46.000] File name '/src/project/node_modules/pkg1/require.js' has a '.js' extension - stripping it.
Info 42   [00:01:47.000] File '/src/project/node_modules/pkg1/require.js' does not exist.
Info 43   [00:01:48.000] File '/src/project/node_modules/pkg1/require.jsx' does not exist.
Info 44   [00:01:49.000] Directory '/src/node_modules' does not exist, skipping all lookups in it.
Info 45   [00:01:50.000] Directory '/node_modules' does not exist, skipping all lookups in it.
Info 46   [00:01:51.000] ======== Module name 'pkg1' was not resolved. ========
Info 47   [00:01:52.000] File '/src/project/node_modules/pkg0/package.json' exists according to earlier cached lookups.
Info 48   [00:01:53.000] DirectoryWatcher:: Added:: WatchInfo: /src/project/node_modules 1 undefined WatchType: node_modules for closed script infos and package.jsons affecting module specifier cache
Info 49   [00:01:54.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /src/project/node_modules 1 undefined WatchType: node_modules for closed script infos and package.jsons affecting module specifier cache
Info 50   [00:01:55.000] Directory '/src/project' has no containing package.json scope according to cache.
Info 51   [00:01:56.000] Found 'package.json' at '/src/project/node_modules/pkg2/package.json'.
Info 52   [00:01:57.000] Resolving real path for '/src/project/node_modules/pkg2/import.d.ts', result '/src/project/node_modules/pkg2/import.d.ts'.
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
Info 68   [00:02:13.000] Directory '/src/project' has no containing package.json scope according to cache.
Info 69   [00:02:14.000] Directory '/src/project' has no containing package.json scope according to cache.
Info 70   [00:02:15.000] Resolving real path for '/src/project/node_modules/@types/pkg4/index.d.ts', result '/src/project/node_modules/@types/pkg4/index.d.ts'.
Info 71   [00:02:16.000] Reusing resolution of type reference directive 'pkg4' from '/src/project/__inferred type names__.ts' found in cache from location '/src/project', it was successfully resolved to '/src/project/node_modules/@types/pkg4/index.d.ts'.
Info 72   [00:02:17.000] File '/src/project/node_modules/@types/pkg4/package.json' does not exist.
Info 73   [00:02:18.000] File '/src/project/node_modules/@types/package.json' does not exist.
Info 74   [00:02:19.000] File '/src/project/node_modules/package.json' does not exist.
Info 75   [00:02:20.000] Directory '/src/project' has no containing package.json scope according to cache.
Info 76   [00:02:21.000] File '/a/lib/package.json' does not exist.
Info 77   [00:02:22.000] File '/a/package.json' does not exist.
Info 78   [00:02:23.000] Directory '/' has no containing package.json scope according to cache.
Info 79   [00:02:24.000] FileWatcher:: Added:: WatchInfo: /a/lib/lib.d.ts 500 undefined WatchType: Closed Script info
Info 80   [00:02:25.000] FileWatcher:: Added:: WatchInfo: /src/project/node_modules/pkg0/package.json 2000 undefined Project: /src/project/tsconfig.json WatchType: File location affecting resolution
Info 81   [00:02:26.000] DirectoryWatcher:: Added:: WatchInfo: /src/project/node_modules 1 undefined Project: /src/project/tsconfig.json WatchType: Failed Lookup Locations
Info 82   [00:02:27.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /src/project/node_modules 1 undefined Project: /src/project/tsconfig.json WatchType: Failed Lookup Locations
Info 83   [00:02:28.000] DirectoryWatcher:: Added:: WatchInfo: /src/project 0 undefined Project: /src/project/tsconfig.json WatchType: Failed Lookup Locations
Info 84   [00:02:29.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /src/project 0 undefined Project: /src/project/tsconfig.json WatchType: Failed Lookup Locations
Info 85   [00:02:30.000] FileWatcher:: Added:: WatchInfo: /src/project/node_modules/pkg1/package.json 2000 undefined Project: /src/project/tsconfig.json WatchType: File location affecting resolution
Info 86   [00:02:31.000] FileWatcher:: Added:: WatchInfo: /src/project/node_modules/@types/pkg4/package.json 2000 undefined Project: /src/project/tsconfig.json WatchType: File location affecting resolution
Info 87   [00:02:32.000] FileWatcher:: Added:: WatchInfo: /src/project/node_modules/@types/package.json 2000 undefined Project: /src/project/tsconfig.json WatchType: File location affecting resolution
Info 88   [00:02:33.000] FileWatcher:: Added:: WatchInfo: /src/project/node_modules/package.json 2000 undefined Project: /src/project/tsconfig.json WatchType: File location affecting resolution
Info 89   [00:02:34.000] FileWatcher:: Added:: WatchInfo: /src/project/node_modules/pkg2/package.json 2000 undefined Project: /src/project/tsconfig.json WatchType: File location affecting resolution
Info 90   [00:02:35.000] FileWatcher:: Added:: WatchInfo: /src/project/node_modules/pkg3/package.json 2000 undefined Project: /src/project/tsconfig.json WatchType: File location affecting resolution
Info 91   [00:02:36.000] DirectoryWatcher:: Added:: WatchInfo: /src/project/node_modules/@types 1 undefined Project: /src/project/tsconfig.json WatchType: Type roots
Info 92   [00:02:37.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /src/project/node_modules/@types 1 undefined Project: /src/project/tsconfig.json WatchType: Type roots
Info 93   [00:02:38.000] Finishing updateGraphWorker: Project: /src/project/tsconfig.json Version: 1 structureChanged: true structureIsReused:: SafeModuleCache Elapsed:: *ms
Info 94   [00:02:39.000] Project '/src/project/tsconfig.json' (Configured)
Info 95   [00:02:40.000] 	Files (8)
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

Info 96   [00:02:41.000] -----------------------------------------------
Info 97   [00:02:42.000] Search path: /src/project
Info 98   [00:02:43.000] For info: /src/project/tsconfig.json :: No config files found.
Info 99   [00:02:44.000] Project '/src/project/tsconfig.json' (Configured)
Info 99   [00:02:45.000] 	Files (8)

Info 99   [00:02:46.000] -----------------------------------------------
Info 99   [00:02:47.000] Open files: 
Info 99   [00:02:48.000] 	FileName: /src/project/randomFileForImport.ts ProjectRootPath: undefined
Info 99   [00:02:49.000] 		Projects: /src/project/tsconfig.json
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

Info 99   [00:02:50.000] response:
    {
      "responseRequired": false
    }
Info 100  [00:02:51.000] request:
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

Info 101  [00:02:52.000] FileWatcher:: Close:: WatchInfo: /src/project/randomFileForTypeRef.ts 500 undefined WatchType: Closed Script info
Info 102  [00:02:53.000] Search path: /src/project
Info 103  [00:02:54.000] For info: /src/project/randomFileForTypeRef.ts :: Config file name: /src/project/tsconfig.json
Info 104  [00:02:55.000] Search path: /src/project
Info 105  [00:02:56.000] For info: /src/project/tsconfig.json :: No config files found.
Info 106  [00:02:57.000] Project '/src/project/tsconfig.json' (Configured)
Info 106  [00:02:58.000] 	Files (8)

Info 106  [00:02:59.000] -----------------------------------------------
Info 106  [00:03:00.000] Open files: 
Info 106  [00:03:01.000] 	FileName: /src/project/randomFileForImport.ts ProjectRootPath: undefined
Info 106  [00:03:02.000] 		Projects: /src/project/tsconfig.json
Info 106  [00:03:03.000] 	FileName: /src/project/randomFileForTypeRef.ts ProjectRootPath: undefined
Info 106  [00:03:04.000] 		Projects: /src/project/tsconfig.json
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

Info 106  [00:03:05.000] response:
    {
      "responseRequired": false
    }
Info 107  [00:03:06.000] modify randomFileForImport by adding import
Info 108  [00:03:07.000] request:
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

Info 109  [00:03:08.000] response:
    {
      "responseRequired": false
    }
Info 110  [00:03:09.000] Starting updateGraphWorker: Project: /src/project/tsconfig.json
Info 111  [00:03:10.000] File '/a/lib/package.json' does not exist according to earlier cached lookups.
Info 112  [00:03:11.000] File '/a/package.json' does not exist according to earlier cached lookups.
Info 113  [00:03:12.000] Directory '/' has no containing package.json scope according to cache.
Info 114  [00:03:13.000] Directory '/src/project/node_modules/pkg0' resolves to '/src/project/node_modules/pkg0/package.json' scope according to cache.
Info 115  [00:03:14.000] Directory '/src/project' has no containing package.json scope according to cache.
Info 116  [00:03:15.000] Directory '/src/project/node_modules/pkg2' resolves to '/src/project/node_modules/pkg2/package.json' scope according to cache.
Info 117  [00:03:16.000] Directory '/src/project' has no containing package.json scope according to cache.
Info 118  [00:03:17.000] Directory '/src/project' has no containing package.json scope according to cache.
Info 119  [00:03:18.000] Directory '/src/project' has no containing package.json scope according to cache.
Info 120  [00:03:19.000] Directory '/src/project/node_modules/@types/pkg4' has no containing package.json scope according to cache.
Info 121  [00:03:20.000] Directory '/src/project' has no containing package.json scope according to cache.
Info 122  [00:03:21.000] Reusing resolution of module 'pkg0' from '/src/project/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/import.d.ts' with Package ID 'pkg0/import.d.ts@0.0.1'.
Info 123  [00:03:22.000] Reusing resolution of module 'pkg1' from '/src/project/fileWithImports.ts' of old program, it was not resolved.
Info 124  [00:03:23.000] Directory '/src/project/node_modules/pkg0' resolves to '/src/project/node_modules/pkg0/package.json' scope according to cache.
Info 125  [00:03:24.000] Directory '/src/project' has no containing package.json scope according to cache.
Info 126  [00:03:25.000] Reusing resolution of type reference directive 'pkg2' from '/src/project/fileWithTypeRefs.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg2/import.d.ts' with Package ID 'pkg2/import.d.ts@0.0.1'.
Info 127  [00:03:26.000] Reusing resolution of type reference directive 'pkg3' from '/src/project/fileWithTypeRefs.ts' of old program, it was not resolved.
Info 128  [00:03:27.000] Directory '/src/project/node_modules/pkg2' resolves to '/src/project/node_modules/pkg2/package.json' scope according to cache.
Info 129  [00:03:28.000] Directory '/src/project' has no containing package.json scope according to cache.
Info 130  [00:03:29.000] ======== Resolving module 'pkg0' from '/src/project/randomFileForImport.ts'. ========
Info 131  [00:03:30.000] Resolution for module 'pkg0' was found in cache from location '/src/project'.
Info 132  [00:03:31.000] ======== Module name 'pkg0' was successfully resolved to '/src/project/node_modules/pkg0/import.d.ts' with Package ID 'pkg0/import.d.ts@0.0.1'. ========
Info 133  [00:03:32.000] Directory '/src/project' has no containing package.json scope according to cache.
Info 134  [00:03:33.000] Reusing resolution of type reference directive 'pkg4' from '/src/project/__inferred type names__.ts' of old program, it was successfully resolved to '/src/project/node_modules/@types/pkg4/index.d.ts'.
Info 135  [00:03:34.000] Directory '/src/project/node_modules/@types/pkg4' has no containing package.json scope according to cache.
Info 136  [00:03:35.000] Directory '/a/lib' has no containing package.json scope according to cache.
Info 137  [00:03:36.000] Finishing updateGraphWorker: Project: /src/project/tsconfig.json Version: 2 structureChanged: true structureIsReused:: SafeModules Elapsed:: *ms
Info 138  [00:03:37.000] Different program with same set of files
Info 139  [00:03:38.000] modify randomFileForTypeRef by adding typeRef
Info 140  [00:03:39.000] request:
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

Info 141  [00:03:40.000] response:
    {
      "responseRequired": false
    }
Info 142  [00:03:41.000] Starting updateGraphWorker: Project: /src/project/tsconfig.json
Info 143  [00:03:42.000] File '/a/lib/package.json' does not exist according to earlier cached lookups.
Info 144  [00:03:43.000] File '/a/package.json' does not exist according to earlier cached lookups.
Info 145  [00:03:44.000] Directory '/' has no containing package.json scope according to cache.
Info 146  [00:03:45.000] Directory '/src/project/node_modules/pkg0' resolves to '/src/project/node_modules/pkg0/package.json' scope according to cache.
Info 147  [00:03:46.000] Directory '/src/project' has no containing package.json scope according to cache.
Info 148  [00:03:47.000] Directory '/src/project/node_modules/pkg2' resolves to '/src/project/node_modules/pkg2/package.json' scope according to cache.
Info 149  [00:03:48.000] Directory '/src/project' has no containing package.json scope according to cache.
Info 150  [00:03:49.000] Directory '/src/project' has no containing package.json scope according to cache.
Info 151  [00:03:50.000] Directory '/src/project' has no containing package.json scope according to cache.
Info 152  [00:03:51.000] Directory '/src/project/node_modules/@types/pkg4' has no containing package.json scope according to cache.
Info 153  [00:03:52.000] Directory '/src/project' has no containing package.json scope according to cache.
Info 154  [00:03:53.000] Reusing resolution of module 'pkg0' from '/src/project/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/import.d.ts' with Package ID 'pkg0/import.d.ts@0.0.1'.
Info 155  [00:03:54.000] Reusing resolution of module 'pkg1' from '/src/project/fileWithImports.ts' of old program, it was not resolved.
Info 156  [00:03:55.000] Directory '/src/project/node_modules/pkg0' resolves to '/src/project/node_modules/pkg0/package.json' scope according to cache.
Info 157  [00:03:56.000] Directory '/src/project' has no containing package.json scope according to cache.
Info 158  [00:03:57.000] Reusing resolution of type reference directive 'pkg2' from '/src/project/fileWithTypeRefs.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg2/import.d.ts' with Package ID 'pkg2/import.d.ts@0.0.1'.
Info 159  [00:03:58.000] Reusing resolution of type reference directive 'pkg3' from '/src/project/fileWithTypeRefs.ts' of old program, it was not resolved.
Info 160  [00:03:59.000] Directory '/src/project/node_modules/pkg2' resolves to '/src/project/node_modules/pkg2/package.json' scope according to cache.
Info 161  [00:04:00.000] Directory '/src/project' has no containing package.json scope according to cache.
Info 162  [00:04:01.000] Reusing resolution of module 'pkg0' from '/src/project/randomFileForImport.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/import.d.ts' with Package ID 'pkg0/import.d.ts@0.0.1'.
Info 163  [00:04:02.000] Directory '/src/project' has no containing package.json scope according to cache.
Info 164  [00:04:03.000] ======== Resolving type reference directive 'pkg2', containing file '/src/project/randomFileForTypeRef.ts'. ========
Info 165  [00:04:04.000] Resolution for type reference directive 'pkg2' was found in cache from location '/src/project'.
Info 166  [00:04:05.000] ======== Type reference directive 'pkg2' was successfully resolved to '/src/project/node_modules/pkg2/import.d.ts' with Package ID 'pkg2/import.d.ts@0.0.1', primary: false. ========
Info 167  [00:04:06.000] Reusing resolution of type reference directive 'pkg4' from '/src/project/__inferred type names__.ts' of old program, it was successfully resolved to '/src/project/node_modules/@types/pkg4/index.d.ts'.
Info 168  [00:04:07.000] Directory '/src/project/node_modules/@types/pkg4' has no containing package.json scope according to cache.
Info 169  [00:04:08.000] Directory '/a/lib' has no containing package.json scope according to cache.
Info 170  [00:04:09.000] Finishing updateGraphWorker: Project: /src/project/tsconfig.json Version: 3 structureChanged: true structureIsReused:: SafeModules Elapsed:: *ms
Info 171  [00:04:10.000] Different program with same set of files
Info 172  [00:04:11.000] write file not resolved by import
Info 173  [00:04:14.000] DirectoryWatcher:: Triggered with /src/project/node_modules/pkg1/require.d.ts :: WatchInfo: /src/project/node_modules 1 undefined WatchType: node_modules for closed script infos and package.jsons affecting module specifier cache
Info 174  [00:04:15.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /src/project/node_modules/pkg1/require.d.ts :: WatchInfo: /src/project/node_modules 1 undefined WatchType: node_modules for closed script infos and package.jsons affecting module specifier cache
Info 175  [00:04:16.000] DirectoryWatcher:: Triggered with /src/project/node_modules/pkg1/require.d.ts :: WatchInfo: /src/project/node_modules 1 undefined Project: /src/project/tsconfig.json WatchType: Failed Lookup Locations
Info 176  [00:04:17.000] Scheduled: /src/project/tsconfig.jsonFailedLookupInvalidation
Info 177  [00:04:18.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /src/project/node_modules/pkg1/require.d.ts :: WatchInfo: /src/project/node_modules 1 undefined Project: /src/project/tsconfig.json WatchType: Failed Lookup Locations
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

Info 178  [00:04:19.000] Running: /src/project/tsconfig.jsonFailedLookupInvalidation
Info 179  [00:04:20.000] Scheduled: /src/project/tsconfig.json
Info 180  [00:04:21.000] Scheduled: *ensureProjectForOpenFiles*
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

Info 181  [00:04:22.000] Running: /src/project/tsconfig.json
Info 182  [00:04:23.000] Starting updateGraphWorker: Project: /src/project/tsconfig.json
Info 183  [00:04:24.000] File '/a/lib/package.json' does not exist according to earlier cached lookups.
Info 184  [00:04:25.000] File '/a/package.json' does not exist according to earlier cached lookups.
Info 185  [00:04:26.000] Directory '/' has no containing package.json scope according to cache.
Info 186  [00:04:27.000] Directory '/src/project/node_modules/pkg0' resolves to '/src/project/node_modules/pkg0/package.json' scope according to cache.
Info 187  [00:04:28.000] Directory '/src/project' has no containing package.json scope according to cache.
Info 188  [00:04:29.000] Directory '/src/project/node_modules/pkg2' resolves to '/src/project/node_modules/pkg2/package.json' scope according to cache.
Info 189  [00:04:30.000] Directory '/src/project' has no containing package.json scope according to cache.
Info 190  [00:04:31.000] Directory '/src/project' has no containing package.json scope according to cache.
Info 191  [00:04:32.000] Directory '/src/project' has no containing package.json scope according to cache.
Info 192  [00:04:33.000] Directory '/src/project/node_modules/@types/pkg4' has no containing package.json scope according to cache.
Info 193  [00:04:34.000] Directory '/src/project' has no containing package.json scope according to cache.
Info 194  [00:04:35.000] Reusing resolution of module 'pkg0' from '/src/project/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/import.d.ts' with Package ID 'pkg0/import.d.ts@0.0.1'.
Info 195  [00:04:36.000] ======== Resolving module 'pkg1' from '/src/project/fileWithImports.ts'. ========
Info 196  [00:04:37.000] Explicitly specified module resolution kind: 'Node16'.
Info 197  [00:04:38.000] Resolving in CJS mode with conditions 'node', 'require', 'types'.
Info 198  [00:04:39.000] File '/src/project/package.json' does not exist according to earlier cached lookups.
Info 199  [00:04:40.000] File '/src/package.json' does not exist according to earlier cached lookups.
Info 200  [00:04:41.000] File '/package.json' does not exist according to earlier cached lookups.
Info 201  [00:04:42.000] Loading module 'pkg1' from 'node_modules' folder, target file types: TypeScript, JavaScript, Declaration.
Info 202  [00:04:43.000] Found 'package.json' at '/src/project/node_modules/pkg1/package.json'.
Info 203  [00:04:44.000] Saw non-matching condition 'import'.
Info 204  [00:04:45.000] Matched 'exports' condition 'require'.
Info 205  [00:04:46.000] Using 'exports' subpath '.' with target './require.js'.
Info 206  [00:04:47.000] File name '/src/project/node_modules/pkg1/require.js' has a '.js' extension - stripping it.
Info 207  [00:04:48.000] File '/src/project/node_modules/pkg1/require.ts' does not exist.
Info 208  [00:04:49.000] File '/src/project/node_modules/pkg1/require.tsx' does not exist.
Info 209  [00:04:50.000] File '/src/project/node_modules/pkg1/require.d.ts' exist - use it as a name resolution result.
Info 210  [00:04:51.000] Resolving real path for '/src/project/node_modules/pkg1/require.d.ts', result '/src/project/node_modules/pkg1/require.d.ts'.
Info 211  [00:04:52.000] ======== Module name 'pkg1' was successfully resolved to '/src/project/node_modules/pkg1/require.d.ts' with Package ID 'pkg1/require.d.ts@0.0.1'. ========
Info 212  [00:04:53.000] Directory '/src/project/node_modules/pkg0' resolves to '/src/project/node_modules/pkg0/package.json' scope according to cache.
Info 213  [00:04:54.000] File '/src/project/node_modules/pkg1/package.json' exists according to earlier cached lookups.
Info 214  [00:04:55.000] Directory '/src/project' has no containing package.json scope according to cache.
Info 215  [00:04:56.000] Reusing resolution of type reference directive 'pkg2' from '/src/project/fileWithTypeRefs.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg2/import.d.ts' with Package ID 'pkg2/import.d.ts@0.0.1'.
Info 216  [00:04:57.000] Reusing resolution of type reference directive 'pkg3' from '/src/project/fileWithTypeRefs.ts' of old program, it was not resolved.
Info 217  [00:04:58.000] Directory '/src/project/node_modules/pkg2' resolves to '/src/project/node_modules/pkg2/package.json' scope according to cache.
Info 218  [00:04:59.000] Directory '/src/project' has no containing package.json scope according to cache.
Info 219  [00:05:00.000] Reusing resolution of module 'pkg0' from '/src/project/randomFileForImport.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/import.d.ts' with Package ID 'pkg0/import.d.ts@0.0.1'.
Info 220  [00:05:01.000] Directory '/src/project' has no containing package.json scope according to cache.
Info 221  [00:05:02.000] Reusing resolution of type reference directive 'pkg2' from '/src/project/randomFileForTypeRef.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg2/import.d.ts' with Package ID 'pkg2/import.d.ts@0.0.1'.
Info 222  [00:05:03.000] Reusing resolution of type reference directive 'pkg4' from '/src/project/__inferred type names__.ts' of old program, it was successfully resolved to '/src/project/node_modules/@types/pkg4/index.d.ts'.
Info 223  [00:05:04.000] Directory '/src/project/node_modules/@types/pkg4' has no containing package.json scope according to cache.
Info 224  [00:05:05.000] Directory '/a/lib' has no containing package.json scope according to cache.
Info 225  [00:05:06.000] DirectoryWatcher:: Close:: WatchInfo: /src/project 0 undefined Project: /src/project/tsconfig.json WatchType: Failed Lookup Locations
Info 226  [00:05:07.000] Elapsed:: *ms DirectoryWatcher:: Close:: WatchInfo: /src/project 0 undefined Project: /src/project/tsconfig.json WatchType: Failed Lookup Locations
Info 227  [00:05:08.000] Finishing updateGraphWorker: Project: /src/project/tsconfig.json Version: 4 structureChanged: true structureIsReused:: SafeModules Elapsed:: *ms
Info 228  [00:05:09.000] Project '/src/project/tsconfig.json' (Configured)
Info 229  [00:05:10.000] 	Files (9)
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

Info 230  [00:05:11.000] -----------------------------------------------
Info 231  [00:05:12.000] Running: *ensureProjectForOpenFiles*
Info 232  [00:05:13.000] Before ensureProjectForOpenFiles:
Info 233  [00:05:14.000] Project '/src/project/tsconfig.json' (Configured)
Info 233  [00:05:15.000] 	Files (9)

Info 233  [00:05:16.000] -----------------------------------------------
Info 233  [00:05:17.000] Open files: 
Info 233  [00:05:18.000] 	FileName: /src/project/randomFileForImport.ts ProjectRootPath: undefined
Info 233  [00:05:19.000] 		Projects: /src/project/tsconfig.json
Info 233  [00:05:20.000] 	FileName: /src/project/randomFileForTypeRef.ts ProjectRootPath: undefined
Info 233  [00:05:21.000] 		Projects: /src/project/tsconfig.json
Info 233  [00:05:22.000] After ensureProjectForOpenFiles:
Info 234  [00:05:23.000] Project '/src/project/tsconfig.json' (Configured)
Info 234  [00:05:24.000] 	Files (9)

Info 234  [00:05:25.000] -----------------------------------------------
Info 234  [00:05:26.000] Open files: 
Info 234  [00:05:27.000] 	FileName: /src/project/randomFileForImport.ts ProjectRootPath: undefined
Info 234  [00:05:28.000] 		Projects: /src/project/tsconfig.json
Info 234  [00:05:29.000] 	FileName: /src/project/randomFileForTypeRef.ts ProjectRootPath: undefined
Info 234  [00:05:30.000] 		Projects: /src/project/tsconfig.json
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

Info 234  [00:05:31.000] write file not resolved by typeRef
Info 235  [00:05:34.000] DirectoryWatcher:: Triggered with /src/project/node_modules/pkg3/require.d.ts :: WatchInfo: /src/project/node_modules 1 undefined WatchType: node_modules for closed script infos and package.jsons affecting module specifier cache
Info 236  [00:05:35.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /src/project/node_modules/pkg3/require.d.ts :: WatchInfo: /src/project/node_modules 1 undefined WatchType: node_modules for closed script infos and package.jsons affecting module specifier cache
Info 237  [00:05:36.000] DirectoryWatcher:: Triggered with /src/project/node_modules/pkg3/require.d.ts :: WatchInfo: /src/project/node_modules 1 undefined Project: /src/project/tsconfig.json WatchType: Failed Lookup Locations
Info 238  [00:05:37.000] Scheduled: /src/project/tsconfig.jsonFailedLookupInvalidation
Info 239  [00:05:38.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /src/project/node_modules/pkg3/require.d.ts :: WatchInfo: /src/project/node_modules 1 undefined Project: /src/project/tsconfig.json WatchType: Failed Lookup Locations
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

Info 240  [00:05:39.000] Running: /src/project/tsconfig.jsonFailedLookupInvalidation
Info 241  [00:05:40.000] Scheduled: /src/project/tsconfig.json
Info 242  [00:05:41.000] Scheduled: *ensureProjectForOpenFiles*
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

Info 243  [00:05:42.000] Running: /src/project/tsconfig.json
Info 244  [00:05:43.000] Starting updateGraphWorker: Project: /src/project/tsconfig.json
Info 245  [00:05:44.000] File '/a/lib/package.json' does not exist according to earlier cached lookups.
Info 246  [00:05:45.000] File '/a/package.json' does not exist according to earlier cached lookups.
Info 247  [00:05:46.000] Directory '/' has no containing package.json scope according to cache.
Info 248  [00:05:47.000] Directory '/src/project/node_modules/pkg0' resolves to '/src/project/node_modules/pkg0/package.json' scope according to cache.
Info 249  [00:05:48.000] Directory '/src/project/node_modules/pkg1' resolves to '/src/project/node_modules/pkg1/package.json' scope according to cache.
Info 250  [00:05:49.000] Directory '/src/project' has no containing package.json scope according to cache.
Info 251  [00:05:50.000] Directory '/src/project/node_modules/pkg2' resolves to '/src/project/node_modules/pkg2/package.json' scope according to cache.
Info 252  [00:05:51.000] Directory '/src/project' has no containing package.json scope according to cache.
Info 253  [00:05:52.000] Directory '/src/project' has no containing package.json scope according to cache.
Info 254  [00:05:53.000] Directory '/src/project' has no containing package.json scope according to cache.
Info 255  [00:05:54.000] Directory '/src/project/node_modules/@types/pkg4' has no containing package.json scope according to cache.
Info 256  [00:05:55.000] Directory '/src/project' has no containing package.json scope according to cache.
Info 257  [00:05:56.000] Reusing resolution of module 'pkg0' from '/src/project/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/import.d.ts' with Package ID 'pkg0/import.d.ts@0.0.1'.
Info 258  [00:05:57.000] Reusing resolution of module 'pkg1' from '/src/project/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg1/require.d.ts' with Package ID 'pkg1/require.d.ts@0.0.1'.
Info 259  [00:05:58.000] Directory '/src/project/node_modules/pkg0' resolves to '/src/project/node_modules/pkg0/package.json' scope according to cache.
Info 260  [00:05:59.000] Directory '/src/project/node_modules/pkg1' resolves to '/src/project/node_modules/pkg1/package.json' scope according to cache.
Info 261  [00:06:00.000] Directory '/src/project' has no containing package.json scope according to cache.
Info 262  [00:06:01.000] Reusing resolution of type reference directive 'pkg2' from '/src/project/fileWithTypeRefs.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg2/import.d.ts' with Package ID 'pkg2/import.d.ts@0.0.1'.
Info 263  [00:06:02.000] ======== Resolving type reference directive 'pkg3', containing file '/src/project/fileWithTypeRefs.ts', root directory '/src/project/node_modules/@types'. ========
Info 264  [00:06:03.000] Resolving with primary search path '/src/project/node_modules/@types'.
Info 265  [00:06:04.000] Looking up in 'node_modules' folder, initial location '/src/project'.
Info 266  [00:06:05.000] Found 'package.json' at '/src/project/node_modules/pkg3/package.json'.
Info 267  [00:06:06.000] Saw non-matching condition 'import'.
Info 268  [00:06:07.000] Matched 'exports' condition 'require'.
Info 269  [00:06:08.000] Using 'exports' subpath '.' with target './require.js'.
Info 270  [00:06:09.000] File name '/src/project/node_modules/pkg3/require.js' has a '.js' extension - stripping it.
Info 271  [00:06:10.000] File '/src/project/node_modules/pkg3/require.d.ts' exist - use it as a name resolution result.
Info 272  [00:06:11.000] Resolving real path for '/src/project/node_modules/pkg3/require.d.ts', result '/src/project/node_modules/pkg3/require.d.ts'.
Info 273  [00:06:12.000] ======== Type reference directive 'pkg3' was successfully resolved to '/src/project/node_modules/pkg3/require.d.ts' with Package ID 'pkg3/require.d.ts@0.0.1', primary: false. ========
Info 274  [00:06:13.000] Directory '/src/project/node_modules/pkg2' resolves to '/src/project/node_modules/pkg2/package.json' scope according to cache.
Info 275  [00:06:14.000] File '/src/project/node_modules/pkg3/package.json' exists according to earlier cached lookups.
Info 276  [00:06:15.000] Directory '/src/project' has no containing package.json scope according to cache.
Info 277  [00:06:16.000] Reusing resolution of module 'pkg0' from '/src/project/randomFileForImport.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/import.d.ts' with Package ID 'pkg0/import.d.ts@0.0.1'.
Info 278  [00:06:17.000] Directory '/src/project' has no containing package.json scope according to cache.
Info 279  [00:06:18.000] Reusing resolution of type reference directive 'pkg2' from '/src/project/randomFileForTypeRef.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg2/import.d.ts' with Package ID 'pkg2/import.d.ts@0.0.1'.
Info 280  [00:06:19.000] Reusing resolution of type reference directive 'pkg4' from '/src/project/__inferred type names__.ts' of old program, it was successfully resolved to '/src/project/node_modules/@types/pkg4/index.d.ts'.
Info 281  [00:06:20.000] Directory '/src/project/node_modules/@types/pkg4' has no containing package.json scope according to cache.
Info 282  [00:06:21.000] Directory '/a/lib' has no containing package.json scope according to cache.
Info 283  [00:06:22.000] DirectoryWatcher:: Close:: WatchInfo: /src/project/node_modules 1 undefined Project: /src/project/tsconfig.json WatchType: Failed Lookup Locations
Info 284  [00:06:23.000] Elapsed:: *ms DirectoryWatcher:: Close:: WatchInfo: /src/project/node_modules 1 undefined Project: /src/project/tsconfig.json WatchType: Failed Lookup Locations
Info 285  [00:06:24.000] Finishing updateGraphWorker: Project: /src/project/tsconfig.json Version: 5 structureChanged: true structureIsReused:: SafeModules Elapsed:: *ms
Info 286  [00:06:25.000] Project '/src/project/tsconfig.json' (Configured)
Info 287  [00:06:26.000] 	Files (10)
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

Info 288  [00:06:27.000] -----------------------------------------------
Info 289  [00:06:28.000] Running: *ensureProjectForOpenFiles*
Info 290  [00:06:29.000] Before ensureProjectForOpenFiles:
Info 291  [00:06:30.000] Project '/src/project/tsconfig.json' (Configured)
Info 291  [00:06:31.000] 	Files (10)

Info 291  [00:06:32.000] -----------------------------------------------
Info 291  [00:06:33.000] Open files: 
Info 291  [00:06:34.000] 	FileName: /src/project/randomFileForImport.ts ProjectRootPath: undefined
Info 291  [00:06:35.000] 		Projects: /src/project/tsconfig.json
Info 291  [00:06:36.000] 	FileName: /src/project/randomFileForTypeRef.ts ProjectRootPath: undefined
Info 291  [00:06:37.000] 		Projects: /src/project/tsconfig.json
Info 291  [00:06:38.000] After ensureProjectForOpenFiles:
Info 292  [00:06:39.000] Project '/src/project/tsconfig.json' (Configured)
Info 292  [00:06:40.000] 	Files (10)

Info 292  [00:06:41.000] -----------------------------------------------
Info 292  [00:06:42.000] Open files: 
Info 292  [00:06:43.000] 	FileName: /src/project/randomFileForImport.ts ProjectRootPath: undefined
Info 292  [00:06:44.000] 		Projects: /src/project/tsconfig.json
Info 292  [00:06:45.000] 	FileName: /src/project/randomFileForTypeRef.ts ProjectRootPath: undefined
Info 292  [00:06:46.000] 		Projects: /src/project/tsconfig.json
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

Info 292  [00:06:47.000] modify package.json and that should re-resolve
Info 293  [00:06:51.000] FileWatcher:: Triggered with /src/project/node_modules/pkg1/package.json 1:: WatchInfo: /src/project/node_modules/pkg1/package.json 2000 undefined Project: /src/project/tsconfig.json WatchType: File location affecting resolution
Info 294  [00:06:52.000] Scheduled: /src/project/tsconfig.jsonFailedLookupInvalidation
Info 295  [00:06:53.000] Elapsed:: *ms FileWatcher:: Triggered with /src/project/node_modules/pkg1/package.json 1:: WatchInfo: /src/project/node_modules/pkg1/package.json 2000 undefined Project: /src/project/tsconfig.json WatchType: File location affecting resolution
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

Info 296  [00:06:54.000] Running: /src/project/tsconfig.jsonFailedLookupInvalidation
Info 297  [00:06:55.000] Scheduled: /src/project/tsconfig.json
Info 298  [00:06:56.000] Scheduled: *ensureProjectForOpenFiles*
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

Info 299  [00:06:57.000] Running: /src/project/tsconfig.json
Info 300  [00:06:58.000] Starting updateGraphWorker: Project: /src/project/tsconfig.json
Info 301  [00:06:59.000] File '/a/lib/package.json' does not exist according to earlier cached lookups.
Info 302  [00:07:00.000] File '/a/package.json' does not exist according to earlier cached lookups.
Info 303  [00:07:01.000] Directory '/' has no containing package.json scope according to cache.
Info 304  [00:07:02.000] Directory '/src/project/node_modules/pkg0' resolves to '/src/project/node_modules/pkg0/package.json' scope according to cache.
Info 305  [00:07:03.000] Found 'package.json' at '/src/project/node_modules/pkg1/package.json'.
Info 306  [00:07:04.000] Directory '/src/project/node_modules/pkg1' resolves to '/src/project/node_modules/pkg1/package.json' scope according to cache.
Info 307  [00:07:05.000] Directory '/src/project' has no containing package.json scope according to cache.
Info 308  [00:07:06.000] Directory '/src/project/node_modules/pkg2' resolves to '/src/project/node_modules/pkg2/package.json' scope according to cache.
Info 309  [00:07:07.000] Directory '/src/project/node_modules/pkg3' resolves to '/src/project/node_modules/pkg3/package.json' scope according to cache.
Info 310  [00:07:08.000] Directory '/src/project' has no containing package.json scope according to cache.
Info 311  [00:07:09.000] Directory '/src/project' has no containing package.json scope according to cache.
Info 312  [00:07:10.000] Directory '/src/project' has no containing package.json scope according to cache.
Info 313  [00:07:11.000] Directory '/src/project/node_modules/@types/pkg4' has no containing package.json scope according to cache.
Info 314  [00:07:12.000] Directory '/src/project' has no containing package.json scope according to cache.
Info 315  [00:07:13.000] Reusing resolution of module 'pkg0' from '/src/project/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/import.d.ts' with Package ID 'pkg0/import.d.ts@0.0.1'.
Info 316  [00:07:14.000] ======== Resolving module 'pkg1' from '/src/project/fileWithImports.ts'. ========
Info 317  [00:07:15.000] Explicitly specified module resolution kind: 'Node16'.
Info 318  [00:07:16.000] Resolving in CJS mode with conditions 'node', 'require', 'types'.
Info 319  [00:07:17.000] File '/src/project/package.json' does not exist according to earlier cached lookups.
Info 320  [00:07:18.000] File '/src/package.json' does not exist according to earlier cached lookups.
Info 321  [00:07:19.000] File '/package.json' does not exist according to earlier cached lookups.
Info 322  [00:07:20.000] Loading module 'pkg1' from 'node_modules' folder, target file types: TypeScript, JavaScript, Declaration.
Info 323  [00:07:21.000] File '/src/project/node_modules/pkg1/package.json' exists according to earlier cached lookups.
Info 324  [00:07:22.000] Saw non-matching condition 'import'.
Info 325  [00:07:23.000] Matched 'exports' condition 'require'.
Info 326  [00:07:24.000] Using 'exports' subpath '.' with target './require1.js'.
Info 327  [00:07:25.000] File name '/src/project/node_modules/pkg1/require1.js' has a '.js' extension - stripping it.
Info 328  [00:07:26.000] File '/src/project/node_modules/pkg1/require1.ts' does not exist.
Info 329  [00:07:27.000] File '/src/project/node_modules/pkg1/require1.tsx' does not exist.
Info 330  [00:07:28.000] File '/src/project/node_modules/pkg1/require1.d.ts' does not exist.
Info 331  [00:07:29.000] File '/src/project/node_modules/@types/pkg1.d.ts' does not exist.
Info 332  [00:07:30.000] Directory '/src/node_modules' does not exist, skipping all lookups in it.
Info 333  [00:07:31.000] Directory '/node_modules' does not exist, skipping all lookups in it.
Info 334  [00:07:32.000] File '/src/project/node_modules/pkg1/package.json' exists according to earlier cached lookups.
Info 335  [00:07:33.000] Saw non-matching condition 'import'.
Info 336  [00:07:34.000] Matched 'exports' condition 'require'.
Info 337  [00:07:35.000] Using 'exports' subpath '.' with target './require1.js'.
Info 338  [00:07:36.000] File name '/src/project/node_modules/pkg1/require1.js' has a '.js' extension - stripping it.
Info 339  [00:07:37.000] File '/src/project/node_modules/pkg1/require1.js' does not exist.
Info 340  [00:07:38.000] File '/src/project/node_modules/pkg1/require1.jsx' does not exist.
Info 341  [00:07:39.000] Directory '/src/node_modules' does not exist, skipping all lookups in it.
Info 342  [00:07:40.000] Directory '/node_modules' does not exist, skipping all lookups in it.
Info 343  [00:07:41.000] ======== Module name 'pkg1' was not resolved. ========
Info 344  [00:07:42.000] Directory '/src/project/node_modules/pkg0' resolves to '/src/project/node_modules/pkg0/package.json' scope according to cache.
Info 345  [00:07:43.000] Directory '/src/project' has no containing package.json scope according to cache.
Info 346  [00:07:44.000] Reusing resolution of type reference directive 'pkg2' from '/src/project/fileWithTypeRefs.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg2/import.d.ts' with Package ID 'pkg2/import.d.ts@0.0.1'.
Info 347  [00:07:45.000] Reusing resolution of type reference directive 'pkg3' from '/src/project/fileWithTypeRefs.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg3/require.d.ts' with Package ID 'pkg3/require.d.ts@0.0.1'.
Info 348  [00:07:46.000] Directory '/src/project/node_modules/pkg2' resolves to '/src/project/node_modules/pkg2/package.json' scope according to cache.
Info 349  [00:07:47.000] Directory '/src/project/node_modules/pkg3' resolves to '/src/project/node_modules/pkg3/package.json' scope according to cache.
Info 350  [00:07:48.000] Directory '/src/project' has no containing package.json scope according to cache.
Info 351  [00:07:49.000] Reusing resolution of module 'pkg0' from '/src/project/randomFileForImport.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/import.d.ts' with Package ID 'pkg0/import.d.ts@0.0.1'.
Info 352  [00:07:50.000] Directory '/src/project' has no containing package.json scope according to cache.
Info 353  [00:07:51.000] Reusing resolution of type reference directive 'pkg2' from '/src/project/randomFileForTypeRef.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg2/import.d.ts' with Package ID 'pkg2/import.d.ts@0.0.1'.
Info 354  [00:07:52.000] Reusing resolution of type reference directive 'pkg4' from '/src/project/__inferred type names__.ts' of old program, it was successfully resolved to '/src/project/node_modules/@types/pkg4/index.d.ts'.
Info 355  [00:07:53.000] Directory '/src/project/node_modules/@types/pkg4' has no containing package.json scope according to cache.
Info 356  [00:07:54.000] Directory '/a/lib' has no containing package.json scope according to cache.
Info 357  [00:07:55.000] DirectoryWatcher:: Added:: WatchInfo: /src/project/node_modules 1 undefined Project: /src/project/tsconfig.json WatchType: Failed Lookup Locations
Info 358  [00:07:56.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /src/project/node_modules 1 undefined Project: /src/project/tsconfig.json WatchType: Failed Lookup Locations
Info 359  [00:07:57.000] DirectoryWatcher:: Added:: WatchInfo: /src/project 0 undefined Project: /src/project/tsconfig.json WatchType: Failed Lookup Locations
Info 360  [00:07:58.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /src/project 0 undefined Project: /src/project/tsconfig.json WatchType: Failed Lookup Locations
Info 361  [00:07:59.000] Finishing updateGraphWorker: Project: /src/project/tsconfig.json Version: 6 structureChanged: true structureIsReused:: SafeModules Elapsed:: *ms
Info 362  [00:08:00.000] Project '/src/project/tsconfig.json' (Configured)
Info 363  [00:08:01.000] 	Files (9)
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

Info 364  [00:08:02.000] -----------------------------------------------
Info 365  [00:08:03.000] Running: *ensureProjectForOpenFiles*
Info 366  [00:08:04.000] Before ensureProjectForOpenFiles:
Info 367  [00:08:05.000] Project '/src/project/tsconfig.json' (Configured)
Info 367  [00:08:06.000] 	Files (9)

Info 367  [00:08:07.000] -----------------------------------------------
Info 367  [00:08:08.000] Open files: 
Info 367  [00:08:09.000] 	FileName: /src/project/randomFileForImport.ts ProjectRootPath: undefined
Info 367  [00:08:10.000] 		Projects: /src/project/tsconfig.json
Info 367  [00:08:11.000] 	FileName: /src/project/randomFileForTypeRef.ts ProjectRootPath: undefined
Info 367  [00:08:12.000] 		Projects: /src/project/tsconfig.json
Info 367  [00:08:13.000] After ensureProjectForOpenFiles:
Info 368  [00:08:14.000] Project '/src/project/tsconfig.json' (Configured)
Info 368  [00:08:15.000] 	Files (9)

Info 368  [00:08:16.000] -----------------------------------------------
Info 368  [00:08:17.000] Open files: 
Info 368  [00:08:18.000] 	FileName: /src/project/randomFileForImport.ts ProjectRootPath: undefined
Info 368  [00:08:19.000] 		Projects: /src/project/tsconfig.json
Info 368  [00:08:20.000] 	FileName: /src/project/randomFileForTypeRef.ts ProjectRootPath: undefined
Info 368  [00:08:21.000] 		Projects: /src/project/tsconfig.json
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

Info 368  [00:08:22.000] write file not resolved by import
Info 369  [00:08:25.000] DirectoryWatcher:: Triggered with /src/project/node_modules/pkg1/require1.d.ts :: WatchInfo: /src/project/node_modules 1 undefined WatchType: node_modules for closed script infos and package.jsons affecting module specifier cache
Info 370  [00:08:26.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /src/project/node_modules/pkg1/require1.d.ts :: WatchInfo: /src/project/node_modules 1 undefined WatchType: node_modules for closed script infos and package.jsons affecting module specifier cache
Info 371  [00:08:27.000] DirectoryWatcher:: Triggered with /src/project/node_modules/pkg1/require1.d.ts :: WatchInfo: /src/project/node_modules 1 undefined Project: /src/project/tsconfig.json WatchType: Failed Lookup Locations
Info 372  [00:08:28.000] Scheduled: /src/project/tsconfig.jsonFailedLookupInvalidation
Info 373  [00:08:29.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /src/project/node_modules/pkg1/require1.d.ts :: WatchInfo: /src/project/node_modules 1 undefined Project: /src/project/tsconfig.json WatchType: Failed Lookup Locations
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

Info 374  [00:08:30.000] Running: /src/project/tsconfig.jsonFailedLookupInvalidation
Info 375  [00:08:31.000] Scheduled: /src/project/tsconfig.json
Info 376  [00:08:32.000] Scheduled: *ensureProjectForOpenFiles*
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

Info 377  [00:08:33.000] Running: /src/project/tsconfig.json
Info 378  [00:08:34.000] Starting updateGraphWorker: Project: /src/project/tsconfig.json
Info 379  [00:08:35.000] File '/a/lib/package.json' does not exist according to earlier cached lookups.
Info 380  [00:08:36.000] File '/a/package.json' does not exist according to earlier cached lookups.
Info 381  [00:08:37.000] Directory '/' has no containing package.json scope according to cache.
Info 382  [00:08:38.000] Directory '/src/project/node_modules/pkg0' resolves to '/src/project/node_modules/pkg0/package.json' scope according to cache.
Info 383  [00:08:39.000] Directory '/src/project' has no containing package.json scope according to cache.
Info 384  [00:08:40.000] Directory '/src/project/node_modules/pkg2' resolves to '/src/project/node_modules/pkg2/package.json' scope according to cache.
Info 385  [00:08:41.000] Directory '/src/project/node_modules/pkg3' resolves to '/src/project/node_modules/pkg3/package.json' scope according to cache.
Info 386  [00:08:42.000] Directory '/src/project' has no containing package.json scope according to cache.
Info 387  [00:08:43.000] Directory '/src/project' has no containing package.json scope according to cache.
Info 388  [00:08:44.000] Directory '/src/project' has no containing package.json scope according to cache.
Info 389  [00:08:45.000] Directory '/src/project/node_modules/@types/pkg4' has no containing package.json scope according to cache.
Info 390  [00:08:46.000] Directory '/src/project' has no containing package.json scope according to cache.
Info 391  [00:08:47.000] Reusing resolution of module 'pkg0' from '/src/project/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/import.d.ts' with Package ID 'pkg0/import.d.ts@0.0.1'.
Info 392  [00:08:48.000] ======== Resolving module 'pkg1' from '/src/project/fileWithImports.ts'. ========
Info 393  [00:08:49.000] Explicitly specified module resolution kind: 'Node16'.
Info 394  [00:08:50.000] Resolving in CJS mode with conditions 'node', 'require', 'types'.
Info 395  [00:08:51.000] File '/src/project/package.json' does not exist according to earlier cached lookups.
Info 396  [00:08:52.000] File '/src/package.json' does not exist according to earlier cached lookups.
Info 397  [00:08:53.000] File '/package.json' does not exist according to earlier cached lookups.
Info 398  [00:08:54.000] Loading module 'pkg1' from 'node_modules' folder, target file types: TypeScript, JavaScript, Declaration.
Info 399  [00:08:55.000] Found 'package.json' at '/src/project/node_modules/pkg1/package.json'.
Info 400  [00:08:56.000] Saw non-matching condition 'import'.
Info 401  [00:08:57.000] Matched 'exports' condition 'require'.
Info 402  [00:08:58.000] Using 'exports' subpath '.' with target './require1.js'.
Info 403  [00:08:59.000] File name '/src/project/node_modules/pkg1/require1.js' has a '.js' extension - stripping it.
Info 404  [00:09:00.000] File '/src/project/node_modules/pkg1/require1.ts' does not exist.
Info 405  [00:09:01.000] File '/src/project/node_modules/pkg1/require1.tsx' does not exist.
Info 406  [00:09:02.000] File '/src/project/node_modules/pkg1/require1.d.ts' exist - use it as a name resolution result.
Info 407  [00:09:03.000] Resolving real path for '/src/project/node_modules/pkg1/require1.d.ts', result '/src/project/node_modules/pkg1/require1.d.ts'.
Info 408  [00:09:04.000] ======== Module name 'pkg1' was successfully resolved to '/src/project/node_modules/pkg1/require1.d.ts' with Package ID 'pkg1/require1.d.ts@0.0.1'. ========
Info 409  [00:09:05.000] Directory '/src/project/node_modules/pkg0' resolves to '/src/project/node_modules/pkg0/package.json' scope according to cache.
Info 410  [00:09:06.000] File '/src/project/node_modules/pkg1/package.json' exists according to earlier cached lookups.
Info 411  [00:09:07.000] Directory '/src/project' has no containing package.json scope according to cache.
Info 412  [00:09:08.000] Reusing resolution of type reference directive 'pkg2' from '/src/project/fileWithTypeRefs.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg2/import.d.ts' with Package ID 'pkg2/import.d.ts@0.0.1'.
Info 413  [00:09:09.000] Reusing resolution of type reference directive 'pkg3' from '/src/project/fileWithTypeRefs.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg3/require.d.ts' with Package ID 'pkg3/require.d.ts@0.0.1'.
Info 414  [00:09:10.000] Directory '/src/project/node_modules/pkg2' resolves to '/src/project/node_modules/pkg2/package.json' scope according to cache.
Info 415  [00:09:11.000] Directory '/src/project/node_modules/pkg3' resolves to '/src/project/node_modules/pkg3/package.json' scope according to cache.
Info 416  [00:09:12.000] Directory '/src/project' has no containing package.json scope according to cache.
Info 417  [00:09:13.000] Reusing resolution of module 'pkg0' from '/src/project/randomFileForImport.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/import.d.ts' with Package ID 'pkg0/import.d.ts@0.0.1'.
Info 418  [00:09:14.000] Directory '/src/project' has no containing package.json scope according to cache.
Info 419  [00:09:15.000] Reusing resolution of type reference directive 'pkg2' from '/src/project/randomFileForTypeRef.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg2/import.d.ts' with Package ID 'pkg2/import.d.ts@0.0.1'.
Info 420  [00:09:16.000] Reusing resolution of type reference directive 'pkg4' from '/src/project/__inferred type names__.ts' of old program, it was successfully resolved to '/src/project/node_modules/@types/pkg4/index.d.ts'.
Info 421  [00:09:17.000] Directory '/src/project/node_modules/@types/pkg4' has no containing package.json scope according to cache.
Info 422  [00:09:18.000] Directory '/a/lib' has no containing package.json scope according to cache.
Info 423  [00:09:19.000] DirectoryWatcher:: Close:: WatchInfo: /src/project/node_modules 1 undefined Project: /src/project/tsconfig.json WatchType: Failed Lookup Locations
Info 424  [00:09:20.000] Elapsed:: *ms DirectoryWatcher:: Close:: WatchInfo: /src/project/node_modules 1 undefined Project: /src/project/tsconfig.json WatchType: Failed Lookup Locations
Info 425  [00:09:21.000] DirectoryWatcher:: Close:: WatchInfo: /src/project 0 undefined Project: /src/project/tsconfig.json WatchType: Failed Lookup Locations
Info 426  [00:09:22.000] Elapsed:: *ms DirectoryWatcher:: Close:: WatchInfo: /src/project 0 undefined Project: /src/project/tsconfig.json WatchType: Failed Lookup Locations
Info 427  [00:09:23.000] Finishing updateGraphWorker: Project: /src/project/tsconfig.json Version: 7 structureChanged: true structureIsReused:: SafeModules Elapsed:: *ms
Info 428  [00:09:24.000] Project '/src/project/tsconfig.json' (Configured)
Info 429  [00:09:25.000] 	Files (10)
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

Info 430  [00:09:26.000] -----------------------------------------------
Info 431  [00:09:27.000] Running: *ensureProjectForOpenFiles*
Info 432  [00:09:28.000] Before ensureProjectForOpenFiles:
Info 433  [00:09:29.000] Project '/src/project/tsconfig.json' (Configured)
Info 433  [00:09:30.000] 	Files (10)

Info 433  [00:09:31.000] -----------------------------------------------
Info 433  [00:09:32.000] Open files: 
Info 433  [00:09:33.000] 	FileName: /src/project/randomFileForImport.ts ProjectRootPath: undefined
Info 433  [00:09:34.000] 		Projects: /src/project/tsconfig.json
Info 433  [00:09:35.000] 	FileName: /src/project/randomFileForTypeRef.ts ProjectRootPath: undefined
Info 433  [00:09:36.000] 		Projects: /src/project/tsconfig.json
Info 433  [00:09:37.000] After ensureProjectForOpenFiles:
Info 434  [00:09:38.000] Project '/src/project/tsconfig.json' (Configured)
Info 434  [00:09:39.000] 	Files (10)

Info 434  [00:09:40.000] -----------------------------------------------
Info 434  [00:09:41.000] Open files: 
Info 434  [00:09:42.000] 	FileName: /src/project/randomFileForImport.ts ProjectRootPath: undefined
Info 434  [00:09:43.000] 		Projects: /src/project/tsconfig.json
Info 434  [00:09:44.000] 	FileName: /src/project/randomFileForTypeRef.ts ProjectRootPath: undefined
Info 434  [00:09:45.000] 		Projects: /src/project/tsconfig.json
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

Info 434  [00:09:46.000] delete file with imports
Info 435  [00:09:48.000] FileWatcher:: Triggered with /src/project/fileWithImports.ts 2:: WatchInfo: /src/project/fileWithImports.ts 500 undefined WatchType: Closed Script info
Info 436  [00:09:49.000] FileWatcher:: Close:: WatchInfo: /src/project/fileWithImports.ts 500 undefined WatchType: Closed Script info
Info 437  [00:09:50.000] Scheduled: /src/project/tsconfig.json
Info 438  [00:09:51.000] Scheduled: *ensureProjectForOpenFiles*
Info 439  [00:09:52.000] Elapsed:: *ms FileWatcher:: Triggered with /src/project/fileWithImports.ts 2:: WatchInfo: /src/project/fileWithImports.ts 500 undefined WatchType: Closed Script info
Info 440  [00:09:53.000] DirectoryWatcher:: Triggered with /src/project/fileWithImports.ts :: WatchInfo: /src/project 0 undefined Config: /src/project/tsconfig.json WatchType: Wild card directory
Info 441  [00:09:54.000] Scheduled: /src/project/tsconfig.json, Cancelled earlier one
Info 442  [00:09:55.000] Scheduled: *ensureProjectForOpenFiles*, Cancelled earlier one
Info 443  [00:09:56.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /src/project/fileWithImports.ts :: WatchInfo: /src/project 0 undefined Config: /src/project/tsconfig.json WatchType: Wild card directory
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

Info 444  [00:09:57.000] Running: /src/project/tsconfig.json
Info 445  [00:09:58.000] Starting updateGraphWorker: Project: /src/project/tsconfig.json
Info 446  [00:09:59.000] Directory '/src/project' has no containing package.json scope according to cache.
Info 447  [00:10:00.000] Reusing resolution of type reference directive 'pkg2' from '/src/project/fileWithTypeRefs.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg2/import.d.ts' with Package ID 'pkg2/import.d.ts@0.0.1'.
Info 448  [00:10:01.000] Reusing resolution of type reference directive 'pkg3' from '/src/project/fileWithTypeRefs.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg3/require.d.ts' with Package ID 'pkg3/require.d.ts@0.0.1'.
Info 449  [00:10:02.000] Directory '/src/project/node_modules/pkg2' resolves to '/src/project/node_modules/pkg2/package.json' scope according to cache.
Info 450  [00:10:03.000] Directory '/src/project/node_modules/pkg3' resolves to '/src/project/node_modules/pkg3/package.json' scope according to cache.
Info 451  [00:10:04.000] Directory '/src/project' has no containing package.json scope according to cache.
Info 452  [00:10:05.000] Reusing resolution of module 'pkg0' from '/src/project/randomFileForImport.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/import.d.ts' with Package ID 'pkg0/import.d.ts@0.0.1'.
Info 453  [00:10:06.000] Directory '/src/project/node_modules/pkg0' resolves to '/src/project/node_modules/pkg0/package.json' scope according to cache.
Info 454  [00:10:07.000] Directory '/src/project' has no containing package.json scope according to cache.
Info 455  [00:10:08.000] Reusing resolution of type reference directive 'pkg2' from '/src/project/randomFileForTypeRef.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg2/import.d.ts' with Package ID 'pkg2/import.d.ts@0.0.1'.
Info 456  [00:10:09.000] Reusing resolution of type reference directive 'pkg4' from '/src/project/__inferred type names__.ts' of old program, it was successfully resolved to '/src/project/node_modules/@types/pkg4/index.d.ts'.
Info 457  [00:10:10.000] Directory '/src/project/node_modules/@types/pkg4' has no containing package.json scope according to cache.
Info 458  [00:10:11.000] File '/a/lib/package.json' does not exist according to earlier cached lookups.
Info 459  [00:10:12.000] File '/a/package.json' does not exist according to earlier cached lookups.
Info 460  [00:10:13.000] Directory '/' has no containing package.json scope according to cache.
Info 461  [00:10:14.000] FileWatcher:: Close:: WatchInfo: /src/project/node_modules/pkg1/package.json 2000 undefined Project: /src/project/tsconfig.json WatchType: File location affecting resolution
Info 462  [00:10:15.000] Finishing updateGraphWorker: Project: /src/project/tsconfig.json Version: 8 structureChanged: true structureIsReused:: SafeModuleCache Elapsed:: *ms
Info 463  [00:10:16.000] Project '/src/project/tsconfig.json' (Configured)
Info 464  [00:10:17.000] 	Files (8)
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

Info 465  [00:10:18.000] -----------------------------------------------
Info 466  [00:10:19.000] Running: *ensureProjectForOpenFiles*
Info 467  [00:10:20.000] Before ensureProjectForOpenFiles:
Info 468  [00:10:21.000] Project '/src/project/tsconfig.json' (Configured)
Info 468  [00:10:22.000] 	Files (8)

Info 468  [00:10:23.000] -----------------------------------------------
Info 468  [00:10:24.000] Open files: 
Info 468  [00:10:25.000] 	FileName: /src/project/randomFileForImport.ts ProjectRootPath: undefined
Info 468  [00:10:26.000] 		Projects: /src/project/tsconfig.json
Info 468  [00:10:27.000] 	FileName: /src/project/randomFileForTypeRef.ts ProjectRootPath: undefined
Info 468  [00:10:28.000] 		Projects: /src/project/tsconfig.json
Info 468  [00:10:29.000] After ensureProjectForOpenFiles:
Info 469  [00:10:30.000] Project '/src/project/tsconfig.json' (Configured)
Info 469  [00:10:31.000] 	Files (8)

Info 469  [00:10:32.000] -----------------------------------------------
Info 469  [00:10:33.000] Open files: 
Info 469  [00:10:34.000] 	FileName: /src/project/randomFileForImport.ts ProjectRootPath: undefined
Info 469  [00:10:35.000] 		Projects: /src/project/tsconfig.json
Info 469  [00:10:36.000] 	FileName: /src/project/randomFileForTypeRef.ts ProjectRootPath: undefined
Info 469  [00:10:37.000] 		Projects: /src/project/tsconfig.json
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

Info 469  [00:10:38.000] delete file with typeRefs
Info 470  [00:10:40.000] FileWatcher:: Triggered with /src/project/fileWithTypeRefs.ts 2:: WatchInfo: /src/project/fileWithTypeRefs.ts 500 undefined WatchType: Closed Script info
Info 471  [00:10:41.000] FileWatcher:: Close:: WatchInfo: /src/project/fileWithTypeRefs.ts 500 undefined WatchType: Closed Script info
Info 472  [00:10:42.000] Scheduled: /src/project/tsconfig.json
Info 473  [00:10:43.000] Scheduled: *ensureProjectForOpenFiles*
Info 474  [00:10:44.000] Elapsed:: *ms FileWatcher:: Triggered with /src/project/fileWithTypeRefs.ts 2:: WatchInfo: /src/project/fileWithTypeRefs.ts 500 undefined WatchType: Closed Script info
Info 475  [00:10:45.000] DirectoryWatcher:: Triggered with /src/project/fileWithTypeRefs.ts :: WatchInfo: /src/project 0 undefined Config: /src/project/tsconfig.json WatchType: Wild card directory
Info 476  [00:10:46.000] Scheduled: /src/project/tsconfig.json, Cancelled earlier one
Info 477  [00:10:47.000] Scheduled: *ensureProjectForOpenFiles*, Cancelled earlier one
Info 478  [00:10:48.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /src/project/fileWithTypeRefs.ts :: WatchInfo: /src/project 0 undefined Config: /src/project/tsconfig.json WatchType: Wild card directory
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

Info 479  [00:10:49.000] Running: /src/project/tsconfig.json
Info 480  [00:10:50.000] Starting updateGraphWorker: Project: /src/project/tsconfig.json
Info 481  [00:10:51.000] Directory '/src/project' has no containing package.json scope according to cache.
Info 482  [00:10:52.000] Reusing resolution of module 'pkg0' from '/src/project/randomFileForImport.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/import.d.ts' with Package ID 'pkg0/import.d.ts@0.0.1'.
Info 483  [00:10:53.000] Directory '/src/project/node_modules/pkg0' resolves to '/src/project/node_modules/pkg0/package.json' scope according to cache.
Info 484  [00:10:54.000] Directory '/src/project' has no containing package.json scope according to cache.
Info 485  [00:10:55.000] Reusing resolution of type reference directive 'pkg2' from '/src/project/randomFileForTypeRef.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg2/import.d.ts' with Package ID 'pkg2/import.d.ts@0.0.1'.
Info 486  [00:10:56.000] Directory '/src/project/node_modules/pkg2' resolves to '/src/project/node_modules/pkg2/package.json' scope according to cache.
Info 487  [00:10:57.000] Reusing resolution of type reference directive 'pkg4' from '/src/project/__inferred type names__.ts' of old program, it was successfully resolved to '/src/project/node_modules/@types/pkg4/index.d.ts'.
Info 488  [00:10:58.000] Directory '/src/project/node_modules/@types/pkg4' has no containing package.json scope according to cache.
Info 489  [00:10:59.000] File '/a/lib/package.json' does not exist according to earlier cached lookups.
Info 490  [00:11:00.000] File '/a/package.json' does not exist according to earlier cached lookups.
Info 491  [00:11:01.000] Directory '/' has no containing package.json scope according to cache.
Info 492  [00:11:02.000] FileWatcher:: Close:: WatchInfo: /src/project/node_modules/pkg3/package.json 2000 undefined Project: /src/project/tsconfig.json WatchType: File location affecting resolution
Info 493  [00:11:03.000] Finishing updateGraphWorker: Project: /src/project/tsconfig.json Version: 9 structureChanged: true structureIsReused:: SafeModuleCache Elapsed:: *ms
Info 494  [00:11:04.000] Project '/src/project/tsconfig.json' (Configured)
Info 495  [00:11:05.000] 	Files (6)
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

Info 496  [00:11:06.000] -----------------------------------------------
Info 497  [00:11:07.000] Running: *ensureProjectForOpenFiles*
Info 498  [00:11:08.000] Before ensureProjectForOpenFiles:
Info 499  [00:11:09.000] Project '/src/project/tsconfig.json' (Configured)
Info 499  [00:11:10.000] 	Files (6)

Info 499  [00:11:11.000] -----------------------------------------------
Info 499  [00:11:12.000] Open files: 
Info 499  [00:11:13.000] 	FileName: /src/project/randomFileForImport.ts ProjectRootPath: undefined
Info 499  [00:11:14.000] 		Projects: /src/project/tsconfig.json
Info 499  [00:11:15.000] 	FileName: /src/project/randomFileForTypeRef.ts ProjectRootPath: undefined
Info 499  [00:11:16.000] 		Projects: /src/project/tsconfig.json
Info 499  [00:11:17.000] After ensureProjectForOpenFiles:
Info 500  [00:11:18.000] Project '/src/project/tsconfig.json' (Configured)
Info 500  [00:11:19.000] 	Files (6)

Info 500  [00:11:20.000] -----------------------------------------------
Info 500  [00:11:21.000] Open files: 
Info 500  [00:11:22.000] 	FileName: /src/project/randomFileForImport.ts ProjectRootPath: undefined
Info 500  [00:11:23.000] 		Projects: /src/project/tsconfig.json
Info 500  [00:11:24.000] 	FileName: /src/project/randomFileForTypeRef.ts ProjectRootPath: undefined
Info 500  [00:11:25.000] 		Projects: /src/project/tsconfig.json
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

Info 500  [00:11:26.000] delete resolved import file
Info 501  [00:11:28.000] DirectoryWatcher:: Triggered with /src/project/node_modules/pkg0/import.d.ts :: WatchInfo: /src/project/node_modules 1 undefined WatchType: node_modules for closed script infos and package.jsons affecting module specifier cache
Info 502  [00:11:29.000] Scheduled: /src/project/tsconfig.json
Info 503  [00:11:30.000] Scheduled: *ensureProjectForOpenFiles*
Info 504  [00:11:31.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /src/project/node_modules/pkg0/import.d.ts :: WatchInfo: /src/project/node_modules 1 undefined WatchType: node_modules for closed script infos and package.jsons affecting module specifier cache
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

Info 505  [00:11:32.000] Running: /src/project/tsconfig.json
Info 506  [00:11:33.000] Starting updateGraphWorker: Project: /src/project/tsconfig.json
Info 507  [00:11:34.000] File '/a/lib/package.json' does not exist according to earlier cached lookups.
Info 508  [00:11:35.000] File '/a/package.json' does not exist according to earlier cached lookups.
Info 509  [00:11:36.000] Directory '/' has no containing package.json scope according to cache.
Info 510  [00:11:37.000] Directory '/src/project/node_modules/pkg0' resolves to '/src/project/node_modules/pkg0/package.json' scope according to cache.
Info 511  [00:11:38.000] Directory '/src/project' has no containing package.json scope according to cache.
Info 512  [00:11:39.000] ======== Resolving module 'pkg0' from '/src/project/randomFileForImport.ts'. ========
Info 513  [00:11:40.000] Explicitly specified module resolution kind: 'Node16'.
Info 514  [00:11:41.000] Resolving in ESM mode with conditions 'node', 'import', 'types'.
Info 515  [00:11:42.000] File '/src/project/package.json' does not exist according to earlier cached lookups.
Info 516  [00:11:43.000] File '/src/package.json' does not exist according to earlier cached lookups.
Info 517  [00:11:44.000] File '/package.json' does not exist according to earlier cached lookups.
Info 518  [00:11:45.000] Loading module 'pkg0' from 'node_modules' folder, target file types: TypeScript, JavaScript, Declaration.
Info 519  [00:11:46.000] File '/src/project/node_modules/pkg0/package.json' exists according to earlier cached lookups.
Info 520  [00:11:47.000] Matched 'exports' condition 'import'.
Info 521  [00:11:48.000] Using 'exports' subpath '.' with target './import.js'.
Info 522  [00:11:49.000] File name '/src/project/node_modules/pkg0/import.js' has a '.js' extension - stripping it.
Info 523  [00:11:50.000] File '/src/project/node_modules/pkg0/import.ts' does not exist.
Info 524  [00:11:51.000] File '/src/project/node_modules/pkg0/import.tsx' does not exist.
Info 525  [00:11:52.000] File '/src/project/node_modules/pkg0/import.d.ts' does not exist.
Info 526  [00:11:53.000] Saw non-matching condition 'require'.
Info 527  [00:11:54.000] Directory '/src/node_modules' does not exist, skipping all lookups in it.
Info 528  [00:11:55.000] Directory '/node_modules' does not exist, skipping all lookups in it.
Info 529  [00:11:56.000] File '/src/project/node_modules/pkg0/package.json' exists according to earlier cached lookups.
Info 530  [00:11:57.000] Matched 'exports' condition 'import'.
Info 531  [00:11:58.000] Using 'exports' subpath '.' with target './import.js'.
Info 532  [00:11:59.000] File name '/src/project/node_modules/pkg0/import.js' has a '.js' extension - stripping it.
Info 533  [00:12:00.000] File '/src/project/node_modules/pkg0/import.js' does not exist.
Info 534  [00:12:01.000] File '/src/project/node_modules/pkg0/import.jsx' does not exist.
Info 535  [00:12:02.000] Saw non-matching condition 'require'.
Info 536  [00:12:03.000] Directory '/src/node_modules' does not exist, skipping all lookups in it.
Info 537  [00:12:04.000] Directory '/node_modules' does not exist, skipping all lookups in it.
Info 538  [00:12:05.000] ======== Module name 'pkg0' was not resolved. ========
Info 539  [00:12:06.000] Directory '/src/project' has no containing package.json scope according to cache.
Info 540  [00:12:07.000] Reusing resolution of type reference directive 'pkg2' from '/src/project/randomFileForTypeRef.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg2/import.d.ts' with Package ID 'pkg2/import.d.ts@0.0.1'.
Info 541  [00:12:08.000] Directory '/src/project/node_modules/pkg2' resolves to '/src/project/node_modules/pkg2/package.json' scope according to cache.
Info 542  [00:12:09.000] Reusing resolution of type reference directive 'pkg4' from '/src/project/__inferred type names__.ts' of old program, it was successfully resolved to '/src/project/node_modules/@types/pkg4/index.d.ts'.
Info 543  [00:12:10.000] Directory '/src/project/node_modules/@types/pkg4' has no containing package.json scope according to cache.
Info 544  [00:12:11.000] Directory '/a/lib' has no containing package.json scope according to cache.
Info 545  [00:12:12.000] DirectoryWatcher:: Added:: WatchInfo: /src/project/node_modules 1 undefined Project: /src/project/tsconfig.json WatchType: Failed Lookup Locations
Info 546  [00:12:13.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /src/project/node_modules 1 undefined Project: /src/project/tsconfig.json WatchType: Failed Lookup Locations
Info 547  [00:12:14.000] DirectoryWatcher:: Added:: WatchInfo: /src/project 0 undefined Project: /src/project/tsconfig.json WatchType: Failed Lookup Locations
Info 548  [00:12:15.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /src/project 0 undefined Project: /src/project/tsconfig.json WatchType: Failed Lookup Locations
Info 549  [00:12:16.000] Finishing updateGraphWorker: Project: /src/project/tsconfig.json Version: 10 structureChanged: true structureIsReused:: SafeModuleCache Elapsed:: *ms
Info 550  [00:12:17.000] Project '/src/project/tsconfig.json' (Configured)
Info 551  [00:12:18.000] 	Files (5)
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

Info 552  [00:12:19.000] -----------------------------------------------
Info 553  [00:12:20.000] Running: *ensureProjectForOpenFiles*
Info 554  [00:12:21.000] Before ensureProjectForOpenFiles:
Info 555  [00:12:22.000] Project '/src/project/tsconfig.json' (Configured)
Info 555  [00:12:23.000] 	Files (5)

Info 555  [00:12:24.000] -----------------------------------------------
Info 555  [00:12:25.000] Open files: 
Info 555  [00:12:26.000] 	FileName: /src/project/randomFileForImport.ts ProjectRootPath: undefined
Info 555  [00:12:27.000] 		Projects: /src/project/tsconfig.json
Info 555  [00:12:28.000] 	FileName: /src/project/randomFileForTypeRef.ts ProjectRootPath: undefined
Info 555  [00:12:29.000] 		Projects: /src/project/tsconfig.json
Info 555  [00:12:30.000] After ensureProjectForOpenFiles:
Info 556  [00:12:31.000] Project '/src/project/tsconfig.json' (Configured)
Info 556  [00:12:32.000] 	Files (5)

Info 556  [00:12:33.000] -----------------------------------------------
Info 556  [00:12:34.000] Open files: 
Info 556  [00:12:35.000] 	FileName: /src/project/randomFileForImport.ts ProjectRootPath: undefined
Info 556  [00:12:36.000] 		Projects: /src/project/tsconfig.json
Info 556  [00:12:37.000] 	FileName: /src/project/randomFileForTypeRef.ts ProjectRootPath: undefined
Info 556  [00:12:38.000] 		Projects: /src/project/tsconfig.json
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

Info 556  [00:12:39.000] delete resolved typeRef file
Info 557  [00:12:41.000] DirectoryWatcher:: Triggered with /src/project/node_modules/pkg2/import.d.ts :: WatchInfo: /src/project/node_modules 1 undefined WatchType: node_modules for closed script infos and package.jsons affecting module specifier cache
Info 558  [00:12:42.000] Scheduled: /src/project/tsconfig.json
Info 559  [00:12:43.000] Scheduled: *ensureProjectForOpenFiles*
Info 560  [00:12:44.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /src/project/node_modules/pkg2/import.d.ts :: WatchInfo: /src/project/node_modules 1 undefined WatchType: node_modules for closed script infos and package.jsons affecting module specifier cache
Info 561  [00:12:45.000] DirectoryWatcher:: Triggered with /src/project/node_modules/pkg2/import.d.ts :: WatchInfo: /src/project/node_modules 1 undefined Project: /src/project/tsconfig.json WatchType: Failed Lookup Locations
Info 562  [00:12:46.000] Scheduled: /src/project/tsconfig.jsonFailedLookupInvalidation
Info 563  [00:12:47.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /src/project/node_modules/pkg2/import.d.ts :: WatchInfo: /src/project/node_modules 1 undefined Project: /src/project/tsconfig.json WatchType: Failed Lookup Locations
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

Info 564  [00:12:48.000] Running: /src/project/tsconfig.json
Info 565  [00:12:49.000] Starting updateGraphWorker: Project: /src/project/tsconfig.json
Info 566  [00:12:50.000] File '/a/lib/package.json' does not exist according to earlier cached lookups.
Info 567  [00:12:51.000] File '/a/package.json' does not exist according to earlier cached lookups.
Info 568  [00:12:52.000] Directory '/' has no containing package.json scope according to cache.
Info 569  [00:12:53.000] Directory '/src/project' has no containing package.json scope according to cache.
Info 570  [00:12:54.000] Directory '/src/project/node_modules/pkg2' resolves to '/src/project/node_modules/pkg2/package.json' scope according to cache.
Info 571  [00:12:55.000] Directory '/src/project' has no containing package.json scope according to cache.
Info 572  [00:12:56.000] Reusing resolution of module 'pkg0' from '/src/project/randomFileForImport.ts' of old program, it was not resolved.
Info 573  [00:12:57.000] Directory '/src/project' has no containing package.json scope according to cache.
Info 574  [00:12:58.000] ======== Resolving type reference directive 'pkg2', containing file '/src/project/randomFileForTypeRef.ts', root directory '/src/project/node_modules/@types'. ========
Info 575  [00:12:59.000] Resolving with primary search path '/src/project/node_modules/@types'.
Info 576  [00:13:00.000] Looking up in 'node_modules' folder, initial location '/src/project'.
Info 577  [00:13:01.000] Found 'package.json' at '/src/project/node_modules/pkg2/package.json'.
Info 578  [00:13:02.000] Matched 'exports' condition 'import'.
Info 579  [00:13:03.000] Using 'exports' subpath '.' with target './import.js'.
Info 580  [00:13:04.000] File name '/src/project/node_modules/pkg2/import.js' has a '.js' extension - stripping it.
Info 581  [00:13:05.000] File '/src/project/node_modules/pkg2/import.d.ts' does not exist.
Info 582  [00:13:06.000] Saw non-matching condition 'require'.
Info 583  [00:13:07.000] Directory '/src/node_modules' does not exist, skipping all lookups in it.
Info 584  [00:13:08.000] Directory '/node_modules' does not exist, skipping all lookups in it.
Info 585  [00:13:09.000] ======== Type reference directive 'pkg2' was not resolved. ========
Info 586  [00:13:10.000] Reusing resolution of type reference directive 'pkg4' from '/src/project/__inferred type names__.ts' of old program, it was successfully resolved to '/src/project/node_modules/@types/pkg4/index.d.ts'.
Info 587  [00:13:11.000] Directory '/src/project/node_modules/@types/pkg4' has no containing package.json scope according to cache.
Info 588  [00:13:12.000] Directory '/a/lib' has no containing package.json scope according to cache.
Info 589  [00:13:13.000] Finishing updateGraphWorker: Project: /src/project/tsconfig.json Version: 11 structureChanged: true structureIsReused:: SafeModuleCache Elapsed:: *ms
Info 590  [00:13:14.000] Project '/src/project/tsconfig.json' (Configured)
Info 591  [00:13:15.000] 	Files (4)
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

Info 592  [00:13:16.000] -----------------------------------------------
Info 593  [00:13:17.000] Running: *ensureProjectForOpenFiles*
Info 594  [00:13:18.000] Before ensureProjectForOpenFiles:
Info 595  [00:13:19.000] Project '/src/project/tsconfig.json' (Configured)
Info 595  [00:13:20.000] 	Files (4)

Info 595  [00:13:21.000] -----------------------------------------------
Info 595  [00:13:22.000] Open files: 
Info 595  [00:13:23.000] 	FileName: /src/project/randomFileForImport.ts ProjectRootPath: undefined
Info 595  [00:13:24.000] 		Projects: /src/project/tsconfig.json
Info 595  [00:13:25.000] 	FileName: /src/project/randomFileForTypeRef.ts ProjectRootPath: undefined
Info 595  [00:13:26.000] 		Projects: /src/project/tsconfig.json
Info 595  [00:13:27.000] After ensureProjectForOpenFiles:
Info 596  [00:13:28.000] Project '/src/project/tsconfig.json' (Configured)
Info 596  [00:13:29.000] 	Files (4)

Info 596  [00:13:30.000] -----------------------------------------------
Info 596  [00:13:31.000] Open files: 
Info 596  [00:13:32.000] 	FileName: /src/project/randomFileForImport.ts ProjectRootPath: undefined
Info 596  [00:13:33.000] 		Projects: /src/project/tsconfig.json
Info 596  [00:13:34.000] 	FileName: /src/project/randomFileForTypeRef.ts ProjectRootPath: undefined
Info 596  [00:13:35.000] 		Projects: /src/project/tsconfig.json
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
