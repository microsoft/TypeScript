3:: modify d/da/daa/daaa/x/y/z/randomFileForImport by adding import
Incremental is currently not reusing resolution so tsbuildinfo has two same resolutions instead of one TODO: (shkamat)
TsBuild info text without affectedFilesPendingEmit:: /src/project/tsconfig.tsbuildinfo.readable.baseline.txt::
CleanBuild:
{
  "program": {
    "fileInfos": {
      "../../lib/lib.d.ts": {
        "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "affectsGlobalScope": true
      },
      "./node_modules/pkg0/index.d.ts": {
        "version": "769951468-export interface ImportInterface0 {}"
      },
      "./filewithimports.ts": {
        "version": "7372004325-import type { ImportInterface0 } from \"pkg0\";\n"
      },
      "./randomfileforimport.ts": {
        "version": "10580737119-import type { ImportInterface0 } from \"pkg0\";\nexport const x = 10;"
      },
      "./a/filewithimports.ts": {
        "version": "7372004325-import type { ImportInterface0 } from \"pkg0\";\n"
      },
      "./b/ba/filewithimports.ts": {
        "version": "7372004325-import type { ImportInterface0 } from \"pkg0\";\n"
      },
      "./b/randomfileforimport.ts": {
        "version": "10580737119-import type { ImportInterface0 } from \"pkg0\";\nexport const x = 10;"
      },
      "./c/ca/filewithimports.ts": {
        "version": "7372004325-import type { ImportInterface0 } from \"pkg0\";\n"
      },
      "./c/ca/caa/randomfileforimport.ts": {
        "version": "10580737119-import type { ImportInterface0 } from \"pkg0\";\nexport const x = 10;"
      },
      "./c/ca/caa/caaa/filewithimports.ts": {
        "version": "7372004325-import type { ImportInterface0 } from \"pkg0\";\n"
      },
      "./c/cb/filewithimports.ts": {
        "version": "7372004325-import type { ImportInterface0 } from \"pkg0\";\n"
      },
      "./d/da/daa/daaa/x/y/z/randomfileforimport.ts": {
        "version": "10580737119-import type { ImportInterface0 } from \"pkg0\";\nexport const x = 10;"
      },
      "./d/da/daa/daaa/filewithimports.ts": {
        "version": "7372004325-import type { ImportInterface0 } from \"pkg0\";\n"
      },
      "./d/da/daa/filewithimports.ts": {
        "version": "7372004325-import type { ImportInterface0 } from \"pkg0\";\n"
      },
      "./d/da/filewithimports.ts": {
        "version": "7372004325-import type { ImportInterface0 } from \"pkg0\";\n"
      },
      "./e/ea/filewithimports.ts": {
        "version": "7372004325-import type { ImportInterface0 } from \"pkg0\";\n"
      },
      "./e/ea/eaa/filewithimports.ts": {
        "version": "7372004325-import type { ImportInterface0 } from \"pkg0\";\n"
      },
      "./e/ea/eaa/eaaa/filewithimports.ts": {
        "version": "7372004325-import type { ImportInterface0 } from \"pkg0\";\n"
      },
      "./e/ea/eaa/eaaa/x/y/z/randomfileforimport.ts": {
        "version": "-10726455937-export const x = 10;"
      }
    },
    "options": {
      "cacheResolutions": true,
      "composite": true
    },
    "referencedMap": {
      "./a/filewithimports.ts": [
        "./node_modules/pkg0/index.d.ts"
      ],
      "./b/ba/filewithimports.ts": [
        "./node_modules/pkg0/index.d.ts"
      ],
      "./b/randomfileforimport.ts": [
        "./node_modules/pkg0/index.d.ts"
      ],
      "./c/ca/caa/caaa/filewithimports.ts": [
        "./node_modules/pkg0/index.d.ts"
      ],
      "./c/ca/caa/randomfileforimport.ts": [
        "./node_modules/pkg0/index.d.ts"
      ],
      "./c/ca/filewithimports.ts": [
        "./node_modules/pkg0/index.d.ts"
      ],
      "./c/cb/filewithimports.ts": [
        "./node_modules/pkg0/index.d.ts"
      ],
      "./d/da/daa/daaa/filewithimports.ts": [
        "./node_modules/pkg0/index.d.ts"
      ],
      "./d/da/daa/daaa/x/y/z/randomfileforimport.ts": [
        "./node_modules/pkg0/index.d.ts"
      ],
      "./d/da/daa/filewithimports.ts": [
        "./node_modules/pkg0/index.d.ts"
      ],
      "./d/da/filewithimports.ts": [
        "./node_modules/pkg0/index.d.ts"
      ],
      "./e/ea/eaa/eaaa/filewithimports.ts": [
        "./node_modules/pkg0/index.d.ts"
      ],
      "./e/ea/eaa/filewithimports.ts": [
        "./node_modules/pkg0/index.d.ts"
      ],
      "./e/ea/filewithimports.ts": [
        "./node_modules/pkg0/index.d.ts"
      ],
      "./filewithimports.ts": [
        "./node_modules/pkg0/index.d.ts"
      ],
      "./randomfileforimport.ts": [
        "./node_modules/pkg0/index.d.ts"
      ]
    },
    "semanticDiagnosticsPerFile": [
      "../../lib/lib.d.ts",
      "./a/filewithimports.ts",
      "./b/ba/filewithimports.ts",
      "./b/randomfileforimport.ts",
      "./c/ca/caa/caaa/filewithimports.ts",
      "./c/ca/caa/randomfileforimport.ts",
      "./c/ca/filewithimports.ts",
      "./c/cb/filewithimports.ts",
      "./d/da/daa/daaa/filewithimports.ts",
      "./d/da/daa/daaa/x/y/z/randomfileforimport.ts",
      "./d/da/daa/filewithimports.ts",
      "./d/da/filewithimports.ts",
      "./e/ea/eaa/eaaa/filewithimports.ts",
      "./e/ea/eaa/eaaa/x/y/z/randomfileforimport.ts",
      "./e/ea/eaa/filewithimports.ts",
      "./e/ea/filewithimports.ts",
      "./filewithimports.ts",
      "./node_modules/pkg0/index.d.ts",
      "./randomfileforimport.ts"
    ],
    "latestChangedDtsFile": "FakeFileName",
    "cacheResolutions": {
      "resolutions": [
        {
          "id": 1,
          "resolvedModule": {
            "resolvedFileName": "./node_modules/pkg0/index.d.ts",
            "isExternalLibraryImport": true
          }
        }
      ],
      "names": [
        "pkg0"
      ],
      "resolutionEntries": [
        [
          "pkg0",
          {
            "id": 1,
            "resolvedModule": {
              "resolvedFileName": "./node_modules/pkg0/index.d.ts",
              "isExternalLibraryImport": true
            }
          }
        ]
      ],
      "modules": [
        [
          "./a",
          [
            [
              "pkg0",
              {
                "id": 1,
                "resolvedModule": {
                  "resolvedFileName": "./node_modules/pkg0/index.d.ts",
                  "isExternalLibraryImport": true
                }
              }
            ]
          ]
        ],
        [
          "./b/ba",
          [
            [
              "pkg0",
              {
                "id": 1,
                "resolvedModule": {
                  "resolvedFileName": "./node_modules/pkg0/index.d.ts",
                  "isExternalLibraryImport": true
                }
              }
            ]
          ]
        ],
        [
          "./c/ca/caa/caaa",
          [
            [
              "pkg0",
              {
                "id": 1,
                "resolvedModule": {
                  "resolvedFileName": "./node_modules/pkg0/index.d.ts",
                  "isExternalLibraryImport": true
                }
              }
            ]
          ]
        ],
        [
          "./c/cb",
          [
            [
              "pkg0",
              {
                "id": 1,
                "resolvedModule": {
                  "resolvedFileName": "./node_modules/pkg0/index.d.ts",
                  "isExternalLibraryImport": true
                }
              }
            ]
          ]
        ],
        [
          "./d/da/daa/daaa/x/y/z",
          [
            [
              "pkg0",
              {
                "id": 1,
                "resolvedModule": {
                  "resolvedFileName": "./node_modules/pkg0/index.d.ts",
                  "isExternalLibraryImport": true
                }
              }
            ]
          ]
        ],
        [
          "./e/ea/eaa/eaaa",
          [
            [
              "pkg0",
              {
                "id": 1,
                "resolvedModule": {
                  "resolvedFileName": "./node_modules/pkg0/index.d.ts",
                  "isExternalLibraryImport": true
                }
              }
            ]
          ]
        ]
      ]
    }
  },
  "version": "FakeTSVersion"
}
IncrementalBuild:
{
  "program": {
    "fileInfos": {
      "../../lib/lib.d.ts": {
        "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "affectsGlobalScope": true
      },
      "./node_modules/pkg0/index.d.ts": {
        "version": "769951468-export interface ImportInterface0 {}"
      },
      "./filewithimports.ts": {
        "version": "7372004325-import type { ImportInterface0 } from \"pkg0\";\n"
      },
      "./randomfileforimport.ts": {
        "version": "10580737119-import type { ImportInterface0 } from \"pkg0\";\nexport const x = 10;"
      },
      "./a/filewithimports.ts": {
        "version": "7372004325-import type { ImportInterface0 } from \"pkg0\";\n"
      },
      "./b/ba/filewithimports.ts": {
        "version": "7372004325-import type { ImportInterface0 } from \"pkg0\";\n"
      },
      "./b/randomfileforimport.ts": {
        "version": "10580737119-import type { ImportInterface0 } from \"pkg0\";\nexport const x = 10;"
      },
      "./c/ca/filewithimports.ts": {
        "version": "7372004325-import type { ImportInterface0 } from \"pkg0\";\n"
      },
      "./c/ca/caa/randomfileforimport.ts": {
        "version": "10580737119-import type { ImportInterface0 } from \"pkg0\";\nexport const x = 10;"
      },
      "./c/ca/caa/caaa/filewithimports.ts": {
        "version": "7372004325-import type { ImportInterface0 } from \"pkg0\";\n"
      },
      "./c/cb/filewithimports.ts": {
        "version": "7372004325-import type { ImportInterface0 } from \"pkg0\";\n"
      },
      "./d/da/daa/daaa/x/y/z/randomfileforimport.ts": {
        "version": "10580737119-import type { ImportInterface0 } from \"pkg0\";\nexport const x = 10;"
      },
      "./d/da/daa/daaa/filewithimports.ts": {
        "version": "7372004325-import type { ImportInterface0 } from \"pkg0\";\n"
      },
      "./d/da/daa/filewithimports.ts": {
        "version": "7372004325-import type { ImportInterface0 } from \"pkg0\";\n"
      },
      "./d/da/filewithimports.ts": {
        "version": "7372004325-import type { ImportInterface0 } from \"pkg0\";\n"
      },
      "./e/ea/filewithimports.ts": {
        "version": "7372004325-import type { ImportInterface0 } from \"pkg0\";\n"
      },
      "./e/ea/eaa/filewithimports.ts": {
        "version": "7372004325-import type { ImportInterface0 } from \"pkg0\";\n"
      },
      "./e/ea/eaa/eaaa/filewithimports.ts": {
        "version": "7372004325-import type { ImportInterface0 } from \"pkg0\";\n"
      },
      "./e/ea/eaa/eaaa/x/y/z/randomfileforimport.ts": {
        "version": "-10726455937-export const x = 10;"
      }
    },
    "options": {
      "cacheResolutions": true,
      "composite": true
    },
    "referencedMap": {
      "./a/filewithimports.ts": [
        "./node_modules/pkg0/index.d.ts"
      ],
      "./b/ba/filewithimports.ts": [
        "./node_modules/pkg0/index.d.ts"
      ],
      "./b/randomfileforimport.ts": [
        "./node_modules/pkg0/index.d.ts"
      ],
      "./c/ca/caa/caaa/filewithimports.ts": [
        "./node_modules/pkg0/index.d.ts"
      ],
      "./c/ca/caa/randomfileforimport.ts": [
        "./node_modules/pkg0/index.d.ts"
      ],
      "./c/ca/filewithimports.ts": [
        "./node_modules/pkg0/index.d.ts"
      ],
      "./c/cb/filewithimports.ts": [
        "./node_modules/pkg0/index.d.ts"
      ],
      "./d/da/daa/daaa/filewithimports.ts": [
        "./node_modules/pkg0/index.d.ts"
      ],
      "./d/da/daa/daaa/x/y/z/randomfileforimport.ts": [
        "./node_modules/pkg0/index.d.ts"
      ],
      "./d/da/daa/filewithimports.ts": [
        "./node_modules/pkg0/index.d.ts"
      ],
      "./d/da/filewithimports.ts": [
        "./node_modules/pkg0/index.d.ts"
      ],
      "./e/ea/eaa/eaaa/filewithimports.ts": [
        "./node_modules/pkg0/index.d.ts"
      ],
      "./e/ea/eaa/filewithimports.ts": [
        "./node_modules/pkg0/index.d.ts"
      ],
      "./e/ea/filewithimports.ts": [
        "./node_modules/pkg0/index.d.ts"
      ],
      "./filewithimports.ts": [
        "./node_modules/pkg0/index.d.ts"
      ],
      "./randomfileforimport.ts": [
        "./node_modules/pkg0/index.d.ts"
      ]
    },
    "semanticDiagnosticsPerFile": [
      "../../lib/lib.d.ts",
      "./a/filewithimports.ts",
      "./b/ba/filewithimports.ts",
      "./b/randomfileforimport.ts",
      "./c/ca/caa/caaa/filewithimports.ts",
      "./c/ca/caa/randomfileforimport.ts",
      "./c/ca/filewithimports.ts",
      "./c/cb/filewithimports.ts",
      "./d/da/daa/daaa/filewithimports.ts",
      "./d/da/daa/daaa/x/y/z/randomfileforimport.ts",
      "./d/da/daa/filewithimports.ts",
      "./d/da/filewithimports.ts",
      "./e/ea/eaa/eaaa/filewithimports.ts",
      "./e/ea/eaa/eaaa/x/y/z/randomfileforimport.ts",
      "./e/ea/eaa/filewithimports.ts",
      "./e/ea/filewithimports.ts",
      "./filewithimports.ts",
      "./node_modules/pkg0/index.d.ts",
      "./randomfileforimport.ts"
    ],
    "latestChangedDtsFile": "FakeFileName",
    "cacheResolutions": {
      "resolutions": [
        {
          "id": 1,
          "resolvedModule": {
            "resolvedFileName": "./node_modules/pkg0/index.d.ts",
            "isExternalLibraryImport": true
          }
        },
        {
          "id": 2,
          "resolvedModule": {
            "resolvedFileName": "./node_modules/pkg0/index.d.ts",
            "isExternalLibraryImport": true
          }
        }
      ],
      "names": [
        "pkg0"
      ],
      "resolutionEntries": [
        [
          "pkg0",
          {
            "id": 1,
            "resolvedModule": {
              "resolvedFileName": "./node_modules/pkg0/index.d.ts",
              "isExternalLibraryImport": true
            }
          }
        ],
        [
          "pkg0",
          {
            "id": 2,
            "resolvedModule": {
              "resolvedFileName": "./node_modules/pkg0/index.d.ts",
              "isExternalLibraryImport": true
            }
          }
        ]
      ],
      "modules": [
        [
          "./a",
          [
            [
              "pkg0",
              {
                "id": 1,
                "resolvedModule": {
                  "resolvedFileName": "./node_modules/pkg0/index.d.ts",
                  "isExternalLibraryImport": true
                }
              }
            ]
          ]
        ],
        [
          "./b/ba",
          [
            [
              "pkg0",
              {
                "id": 1,
                "resolvedModule": {
                  "resolvedFileName": "./node_modules/pkg0/index.d.ts",
                  "isExternalLibraryImport": true
                }
              }
            ]
          ]
        ],
        [
          "./c/ca/caa/caaa",
          [
            [
              "pkg0",
              {
                "id": 1,
                "resolvedModule": {
                  "resolvedFileName": "./node_modules/pkg0/index.d.ts",
                  "isExternalLibraryImport": true
                }
              }
            ]
          ]
        ],
        [
          "./c/cb",
          [
            [
              "pkg0",
              {
                "id": 1,
                "resolvedModule": {
                  "resolvedFileName": "./node_modules/pkg0/index.d.ts",
                  "isExternalLibraryImport": true
                }
              }
            ]
          ]
        ],
        [
          "./d/da/daa/daaa/x/y/z",
          [
            [
              "pkg0",
              {
                "id": 2,
                "resolvedModule": {
                  "resolvedFileName": "./node_modules/pkg0/index.d.ts",
                  "isExternalLibraryImport": true
                }
              }
            ]
          ]
        ],
        [
          "./e/ea/eaa/eaaa",
          [
            [
              "pkg0",
              {
                "id": 1,
                "resolvedModule": {
                  "resolvedFileName": "./node_modules/pkg0/index.d.ts",
                  "isExternalLibraryImport": true
                }
              }
            ]
          ]
        ]
      ]
    }
  },
  "version": "FakeTSVersion"
}
4:: modify e/ea/eaa/eaaa/x/y/z/randomFileForImport by adding import
Incremental is currently not reusing resolution so tsbuildinfo has two same resolutions instead of one TODO: (shkamat)
TsBuild info text without affectedFilesPendingEmit:: /src/project/tsconfig.tsbuildinfo.readable.baseline.txt::
CleanBuild:
{
  "program": {
    "fileInfos": {
      "../../lib/lib.d.ts": {
        "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "affectsGlobalScope": true
      },
      "./node_modules/pkg0/index.d.ts": {
        "version": "769951468-export interface ImportInterface0 {}"
      },
      "./filewithimports.ts": {
        "version": "7372004325-import type { ImportInterface0 } from \"pkg0\";\n"
      },
      "./randomfileforimport.ts": {
        "version": "10580737119-import type { ImportInterface0 } from \"pkg0\";\nexport const x = 10;"
      },
      "./a/filewithimports.ts": {
        "version": "7372004325-import type { ImportInterface0 } from \"pkg0\";\n"
      },
      "./b/ba/filewithimports.ts": {
        "version": "7372004325-import type { ImportInterface0 } from \"pkg0\";\n"
      },
      "./b/randomfileforimport.ts": {
        "version": "10580737119-import type { ImportInterface0 } from \"pkg0\";\nexport const x = 10;"
      },
      "./c/ca/filewithimports.ts": {
        "version": "7372004325-import type { ImportInterface0 } from \"pkg0\";\n"
      },
      "./c/ca/caa/randomfileforimport.ts": {
        "version": "10580737119-import type { ImportInterface0 } from \"pkg0\";\nexport const x = 10;"
      },
      "./c/ca/caa/caaa/filewithimports.ts": {
        "version": "7372004325-import type { ImportInterface0 } from \"pkg0\";\n"
      },
      "./c/cb/filewithimports.ts": {
        "version": "7372004325-import type { ImportInterface0 } from \"pkg0\";\n"
      },
      "./d/da/daa/daaa/x/y/z/randomfileforimport.ts": {
        "version": "10580737119-import type { ImportInterface0 } from \"pkg0\";\nexport const x = 10;"
      },
      "./d/da/daa/daaa/filewithimports.ts": {
        "version": "7372004325-import type { ImportInterface0 } from \"pkg0\";\n"
      },
      "./d/da/daa/filewithimports.ts": {
        "version": "7372004325-import type { ImportInterface0 } from \"pkg0\";\n"
      },
      "./d/da/filewithimports.ts": {
        "version": "7372004325-import type { ImportInterface0 } from \"pkg0\";\n"
      },
      "./e/ea/filewithimports.ts": {
        "version": "7372004325-import type { ImportInterface0 } from \"pkg0\";\n"
      },
      "./e/ea/eaa/filewithimports.ts": {
        "version": "7372004325-import type { ImportInterface0 } from \"pkg0\";\n"
      },
      "./e/ea/eaa/eaaa/filewithimports.ts": {
        "version": "7372004325-import type { ImportInterface0 } from \"pkg0\";\n"
      },
      "./e/ea/eaa/eaaa/x/y/z/randomfileforimport.ts": {
        "version": "10580737119-import type { ImportInterface0 } from \"pkg0\";\nexport const x = 10;"
      }
    },
    "options": {
      "cacheResolutions": true,
      "composite": true
    },
    "referencedMap": {
      "./a/filewithimports.ts": [
        "./node_modules/pkg0/index.d.ts"
      ],
      "./b/ba/filewithimports.ts": [
        "./node_modules/pkg0/index.d.ts"
      ],
      "./b/randomfileforimport.ts": [
        "./node_modules/pkg0/index.d.ts"
      ],
      "./c/ca/caa/caaa/filewithimports.ts": [
        "./node_modules/pkg0/index.d.ts"
      ],
      "./c/ca/caa/randomfileforimport.ts": [
        "./node_modules/pkg0/index.d.ts"
      ],
      "./c/ca/filewithimports.ts": [
        "./node_modules/pkg0/index.d.ts"
      ],
      "./c/cb/filewithimports.ts": [
        "./node_modules/pkg0/index.d.ts"
      ],
      "./d/da/daa/daaa/filewithimports.ts": [
        "./node_modules/pkg0/index.d.ts"
      ],
      "./d/da/daa/daaa/x/y/z/randomfileforimport.ts": [
        "./node_modules/pkg0/index.d.ts"
      ],
      "./d/da/daa/filewithimports.ts": [
        "./node_modules/pkg0/index.d.ts"
      ],
      "./d/da/filewithimports.ts": [
        "./node_modules/pkg0/index.d.ts"
      ],
      "./e/ea/eaa/eaaa/filewithimports.ts": [
        "./node_modules/pkg0/index.d.ts"
      ],
      "./e/ea/eaa/eaaa/x/y/z/randomfileforimport.ts": [
        "./node_modules/pkg0/index.d.ts"
      ],
      "./e/ea/eaa/filewithimports.ts": [
        "./node_modules/pkg0/index.d.ts"
      ],
      "./e/ea/filewithimports.ts": [
        "./node_modules/pkg0/index.d.ts"
      ],
      "./filewithimports.ts": [
        "./node_modules/pkg0/index.d.ts"
      ],
      "./randomfileforimport.ts": [
        "./node_modules/pkg0/index.d.ts"
      ]
    },
    "semanticDiagnosticsPerFile": [
      "../../lib/lib.d.ts",
      "./a/filewithimports.ts",
      "./b/ba/filewithimports.ts",
      "./b/randomfileforimport.ts",
      "./c/ca/caa/caaa/filewithimports.ts",
      "./c/ca/caa/randomfileforimport.ts",
      "./c/ca/filewithimports.ts",
      "./c/cb/filewithimports.ts",
      "./d/da/daa/daaa/filewithimports.ts",
      "./d/da/daa/daaa/x/y/z/randomfileforimport.ts",
      "./d/da/daa/filewithimports.ts",
      "./d/da/filewithimports.ts",
      "./e/ea/eaa/eaaa/filewithimports.ts",
      "./e/ea/eaa/eaaa/x/y/z/randomfileforimport.ts",
      "./e/ea/eaa/filewithimports.ts",
      "./e/ea/filewithimports.ts",
      "./filewithimports.ts",
      "./node_modules/pkg0/index.d.ts",
      "./randomfileforimport.ts"
    ],
    "latestChangedDtsFile": "FakeFileName",
    "cacheResolutions": {
      "resolutions": [
        {
          "id": 1,
          "resolvedModule": {
            "resolvedFileName": "./node_modules/pkg0/index.d.ts",
            "isExternalLibraryImport": true
          }
        }
      ],
      "names": [
        "pkg0"
      ],
      "resolutionEntries": [
        [
          "pkg0",
          {
            "id": 1,
            "resolvedModule": {
              "resolvedFileName": "./node_modules/pkg0/index.d.ts",
              "isExternalLibraryImport": true
            }
          }
        ]
      ],
      "modules": [
        [
          "./a",
          [
            [
              "pkg0",
              {
                "id": 1,
                "resolvedModule": {
                  "resolvedFileName": "./node_modules/pkg0/index.d.ts",
                  "isExternalLibraryImport": true
                }
              }
            ]
          ]
        ],
        [
          "./b/ba",
          [
            [
              "pkg0",
              {
                "id": 1,
                "resolvedModule": {
                  "resolvedFileName": "./node_modules/pkg0/index.d.ts",
                  "isExternalLibraryImport": true
                }
              }
            ]
          ]
        ],
        [
          "./c/ca/caa/caaa",
          [
            [
              "pkg0",
              {
                "id": 1,
                "resolvedModule": {
                  "resolvedFileName": "./node_modules/pkg0/index.d.ts",
                  "isExternalLibraryImport": true
                }
              }
            ]
          ]
        ],
        [
          "./c/cb",
          [
            [
              "pkg0",
              {
                "id": 1,
                "resolvedModule": {
                  "resolvedFileName": "./node_modules/pkg0/index.d.ts",
                  "isExternalLibraryImport": true
                }
              }
            ]
          ]
        ],
        [
          "./d/da/daa/daaa/x/y/z",
          [
            [
              "pkg0",
              {
                "id": 1,
                "resolvedModule": {
                  "resolvedFileName": "./node_modules/pkg0/index.d.ts",
                  "isExternalLibraryImport": true
                }
              }
            ]
          ]
        ],
        [
          "./e/ea/eaa/eaaa/x/y/z",
          [
            [
              "pkg0",
              {
                "id": 1,
                "resolvedModule": {
                  "resolvedFileName": "./node_modules/pkg0/index.d.ts",
                  "isExternalLibraryImport": true
                }
              }
            ]
          ]
        ]
      ]
    }
  },
  "version": "FakeTSVersion"
}
IncrementalBuild:
{
  "program": {
    "fileInfos": {
      "../../lib/lib.d.ts": {
        "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "affectsGlobalScope": true
      },
      "./node_modules/pkg0/index.d.ts": {
        "version": "769951468-export interface ImportInterface0 {}"
      },
      "./filewithimports.ts": {
        "version": "7372004325-import type { ImportInterface0 } from \"pkg0\";\n"
      },
      "./randomfileforimport.ts": {
        "version": "10580737119-import type { ImportInterface0 } from \"pkg0\";\nexport const x = 10;"
      },
      "./a/filewithimports.ts": {
        "version": "7372004325-import type { ImportInterface0 } from \"pkg0\";\n"
      },
      "./b/ba/filewithimports.ts": {
        "version": "7372004325-import type { ImportInterface0 } from \"pkg0\";\n"
      },
      "./b/randomfileforimport.ts": {
        "version": "10580737119-import type { ImportInterface0 } from \"pkg0\";\nexport const x = 10;"
      },
      "./c/ca/filewithimports.ts": {
        "version": "7372004325-import type { ImportInterface0 } from \"pkg0\";\n"
      },
      "./c/ca/caa/randomfileforimport.ts": {
        "version": "10580737119-import type { ImportInterface0 } from \"pkg0\";\nexport const x = 10;"
      },
      "./c/ca/caa/caaa/filewithimports.ts": {
        "version": "7372004325-import type { ImportInterface0 } from \"pkg0\";\n"
      },
      "./c/cb/filewithimports.ts": {
        "version": "7372004325-import type { ImportInterface0 } from \"pkg0\";\n"
      },
      "./d/da/daa/daaa/x/y/z/randomfileforimport.ts": {
        "version": "10580737119-import type { ImportInterface0 } from \"pkg0\";\nexport const x = 10;"
      },
      "./d/da/daa/daaa/filewithimports.ts": {
        "version": "7372004325-import type { ImportInterface0 } from \"pkg0\";\n"
      },
      "./d/da/daa/filewithimports.ts": {
        "version": "7372004325-import type { ImportInterface0 } from \"pkg0\";\n"
      },
      "./d/da/filewithimports.ts": {
        "version": "7372004325-import type { ImportInterface0 } from \"pkg0\";\n"
      },
      "./e/ea/filewithimports.ts": {
        "version": "7372004325-import type { ImportInterface0 } from \"pkg0\";\n"
      },
      "./e/ea/eaa/filewithimports.ts": {
        "version": "7372004325-import type { ImportInterface0 } from \"pkg0\";\n"
      },
      "./e/ea/eaa/eaaa/filewithimports.ts": {
        "version": "7372004325-import type { ImportInterface0 } from \"pkg0\";\n"
      },
      "./e/ea/eaa/eaaa/x/y/z/randomfileforimport.ts": {
        "version": "10580737119-import type { ImportInterface0 } from \"pkg0\";\nexport const x = 10;"
      }
    },
    "options": {
      "cacheResolutions": true,
      "composite": true
    },
    "referencedMap": {
      "./a/filewithimports.ts": [
        "./node_modules/pkg0/index.d.ts"
      ],
      "./b/ba/filewithimports.ts": [
        "./node_modules/pkg0/index.d.ts"
      ],
      "./b/randomfileforimport.ts": [
        "./node_modules/pkg0/index.d.ts"
      ],
      "./c/ca/caa/caaa/filewithimports.ts": [
        "./node_modules/pkg0/index.d.ts"
      ],
      "./c/ca/caa/randomfileforimport.ts": [
        "./node_modules/pkg0/index.d.ts"
      ],
      "./c/ca/filewithimports.ts": [
        "./node_modules/pkg0/index.d.ts"
      ],
      "./c/cb/filewithimports.ts": [
        "./node_modules/pkg0/index.d.ts"
      ],
      "./d/da/daa/daaa/filewithimports.ts": [
        "./node_modules/pkg0/index.d.ts"
      ],
      "./d/da/daa/daaa/x/y/z/randomfileforimport.ts": [
        "./node_modules/pkg0/index.d.ts"
      ],
      "./d/da/daa/filewithimports.ts": [
        "./node_modules/pkg0/index.d.ts"
      ],
      "./d/da/filewithimports.ts": [
        "./node_modules/pkg0/index.d.ts"
      ],
      "./e/ea/eaa/eaaa/filewithimports.ts": [
        "./node_modules/pkg0/index.d.ts"
      ],
      "./e/ea/eaa/eaaa/x/y/z/randomfileforimport.ts": [
        "./node_modules/pkg0/index.d.ts"
      ],
      "./e/ea/eaa/filewithimports.ts": [
        "./node_modules/pkg0/index.d.ts"
      ],
      "./e/ea/filewithimports.ts": [
        "./node_modules/pkg0/index.d.ts"
      ],
      "./filewithimports.ts": [
        "./node_modules/pkg0/index.d.ts"
      ],
      "./randomfileforimport.ts": [
        "./node_modules/pkg0/index.d.ts"
      ]
    },
    "semanticDiagnosticsPerFile": [
      "../../lib/lib.d.ts",
      "./a/filewithimports.ts",
      "./b/ba/filewithimports.ts",
      "./b/randomfileforimport.ts",
      "./c/ca/caa/caaa/filewithimports.ts",
      "./c/ca/caa/randomfileforimport.ts",
      "./c/ca/filewithimports.ts",
      "./c/cb/filewithimports.ts",
      "./d/da/daa/daaa/filewithimports.ts",
      "./d/da/daa/daaa/x/y/z/randomfileforimport.ts",
      "./d/da/daa/filewithimports.ts",
      "./d/da/filewithimports.ts",
      "./e/ea/eaa/eaaa/filewithimports.ts",
      "./e/ea/eaa/eaaa/x/y/z/randomfileforimport.ts",
      "./e/ea/eaa/filewithimports.ts",
      "./e/ea/filewithimports.ts",
      "./filewithimports.ts",
      "./node_modules/pkg0/index.d.ts",
      "./randomfileforimport.ts"
    ],
    "latestChangedDtsFile": "FakeFileName",
    "cacheResolutions": {
      "resolutions": [
        {
          "id": 1,
          "resolvedModule": {
            "resolvedFileName": "./node_modules/pkg0/index.d.ts",
            "isExternalLibraryImport": true
          }
        },
        {
          "id": 2,
          "resolvedModule": {
            "resolvedFileName": "./node_modules/pkg0/index.d.ts",
            "isExternalLibraryImport": true
          }
        },
        {
          "id": 3,
          "resolvedModule": {
            "resolvedFileName": "./node_modules/pkg0/index.d.ts",
            "isExternalLibraryImport": true
          }
        }
      ],
      "names": [
        "pkg0"
      ],
      "resolutionEntries": [
        [
          "pkg0",
          {
            "id": 1,
            "resolvedModule": {
              "resolvedFileName": "./node_modules/pkg0/index.d.ts",
              "isExternalLibraryImport": true
            }
          }
        ],
        [
          "pkg0",
          {
            "id": 2,
            "resolvedModule": {
              "resolvedFileName": "./node_modules/pkg0/index.d.ts",
              "isExternalLibraryImport": true
            }
          }
        ],
        [
          "pkg0",
          {
            "id": 3,
            "resolvedModule": {
              "resolvedFileName": "./node_modules/pkg0/index.d.ts",
              "isExternalLibraryImport": true
            }
          }
        ]
      ],
      "modules": [
        [
          "./a",
          [
            [
              "pkg0",
              {
                "id": 1,
                "resolvedModule": {
                  "resolvedFileName": "./node_modules/pkg0/index.d.ts",
                  "isExternalLibraryImport": true
                }
              }
            ]
          ]
        ],
        [
          "./b/ba",
          [
            [
              "pkg0",
              {
                "id": 1,
                "resolvedModule": {
                  "resolvedFileName": "./node_modules/pkg0/index.d.ts",
                  "isExternalLibraryImport": true
                }
              }
            ]
          ]
        ],
        [
          "./c/ca/caa/caaa",
          [
            [
              "pkg0",
              {
                "id": 1,
                "resolvedModule": {
                  "resolvedFileName": "./node_modules/pkg0/index.d.ts",
                  "isExternalLibraryImport": true
                }
              }
            ]
          ]
        ],
        [
          "./c/cb",
          [
            [
              "pkg0",
              {
                "id": 1,
                "resolvedModule": {
                  "resolvedFileName": "./node_modules/pkg0/index.d.ts",
                  "isExternalLibraryImport": true
                }
              }
            ]
          ]
        ],
        [
          "./d/da/daa/daaa/x/y/z",
          [
            [
              "pkg0",
              {
                "id": 2,
                "resolvedModule": {
                  "resolvedFileName": "./node_modules/pkg0/index.d.ts",
                  "isExternalLibraryImport": true
                }
              }
            ]
          ]
        ],
        [
          "./e/ea/eaa/eaaa/x/y/z",
          [
            [
              "pkg0",
              {
                "id": 3,
                "resolvedModule": {
                  "resolvedFileName": "./node_modules/pkg0/index.d.ts",
                  "isExternalLibraryImport": true
                }
              }
            ]
          ]
        ]
      ]
    }
  },
  "version": "FakeTSVersion"
}