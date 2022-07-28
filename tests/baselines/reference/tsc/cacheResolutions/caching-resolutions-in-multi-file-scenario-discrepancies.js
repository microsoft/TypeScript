5:: modify package.json and that should re-resolve
Affected locations are not checked which results in using incorrect resolution
TsBuild info text without affectedFilesPendingEmit:: /src/project/tsconfig.tsbuildinfo.readable.baseline.txt::
CleanBuild:
{
  "program": {
    "fileInfos": {
      "../../lib/lib.d.ts": {
        "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "affectsGlobalScope": true,
        "impliedFormat": "commonjs"
      },
      "./node_modules/pkg0/import.d.ts": {
        "version": "769951468-export interface ImportInterface0 {}",
        "impliedFormat": "commonjs"
      },
      "./filewithimports.ts": {
        "version": "4079531109-import type { ImportInterface0 } from \"pkg0\" assert { \"resolution-mode\": \"import\" };\nimport type { RequireInterface1 } from \"pkg1\" assert { \"resolution-mode\": \"require\" };\n",
        "impliedFormat": "commonjs"
      },
      "./node_modules/pkg2/import.d.ts": {
        "version": "1714206242-export {};\ndeclare global {\n    interface ImportInterface2 {}\n}\n",
        "affectsGlobalScope": true,
        "impliedFormat": "commonjs"
      },
      "./node_modules/pkg3/require.d.ts": {
        "version": "-6568745979-export {};\ndeclare global {\n    interface RequireInterface3 {}\n}\n",
        "affectsGlobalScope": true,
        "impliedFormat": "commonjs"
      },
      "./filewithtyperefs.ts": {
        "version": "-20622778057-/// <reference types=\"pkg2\" resolution-mode=\"import\"/>\n/// <reference types=\"pkg3\" resolution-mode=\"require\"/>\ninterface LocalInterface extends ImportInterface2, RequireInterface3 {}\nexport {}\n",
        "impliedFormat": "commonjs"
      },
      "./randomfileforimport.ts": {
        "version": "-8633945300-import type { ImportInterface0 } from \"pkg0\" assert { \"resolution-mode\": \"import\" };\nexport const x = 10;",
        "impliedFormat": "commonjs"
      },
      "./randomfilefortyperef.ts": {
        "version": "-8191038086-/// <reference types=\"pkg2\" resolution-mode=\"import\"/>\nexport const x = 10;",
        "impliedFormat": "commonjs"
      },
      "./node_modules/@types/pkg4/index.d.ts": {
        "version": "-10726455937-export const x = 10;",
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
        "./node_modules/pkg2/import.d.ts",
        "./node_modules/pkg3/require.d.ts"
      ],
      "./randomfileforimport.ts": [
        "./node_modules/pkg0/import.d.ts"
      ],
      "./randomfilefortyperef.ts": [
        "./node_modules/pkg2/import.d.ts"
      ]
    },
    "semanticDiagnosticsPerFile": [
      "../../lib/lib.d.ts",
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
      "./filewithtyperefs.ts",
      "./node_modules/@types/pkg4/index.d.ts",
      "./node_modules/pkg0/import.d.ts",
      "./node_modules/pkg2/import.d.ts",
      "./node_modules/pkg3/require.d.ts",
      "./randomfileforimport.ts",
      "./randomfilefortyperef.ts"
    ],
    "latestChangedDtsFile": "FakeFileName",
    "cacheResolutions": {
      "resolutions": [
        {
          "id": 1,
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
          "id": 2,
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
          "id": 3,
          "resolvedTypeReferenceDirective": {
            "resolvedFileName": "./node_modules/pkg3/require.d.ts",
            "packageId": {
              "name": "pkg3",
              "subModuleName": "require.d.ts",
              "version": "0.0.1"
            },
            "isExternalLibraryImport": true
          },
          "affectingLocations": [
            "./node_modules/pkg3/package.json"
          ]
        },
        {
          "id": 4,
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
        "pkg3",
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
        ],
        [
          "./node_modules/pkg3/package.json",
          "1856418333-{\"name\":\"pkg3\",\"version\":\"0.0.1\",\"exports\":{\"import\":\"./import.js\",\"require\":\"./require.js\"}}"
        ]
      ],
      "resolutionEntries": [
        [
          "pkg0",
          {
            "id": 1,
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
          "esnext"
        ],
        [
          "pkg2",
          {
            "id": 2,
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
          "esnext"
        ],
        [
          "pkg3",
          {
            "id": 3,
            "resolvedTypeReferenceDirective": {
              "resolvedFileName": "./node_modules/pkg3/require.d.ts",
              "packageId": {
                "name": "pkg3",
                "subModuleName": "require.d.ts",
                "version": "0.0.1"
              },
              "isExternalLibraryImport": true
            },
            "affectingLocations": [
              "./node_modules/pkg3/package.json"
            ]
          },
          "commonjs"
        ],
        [
          "pkg4",
          {
            "id": 4,
            "resolvedTypeReferenceDirective": {
              "primary": true,
              "resolvedFileName": "./node_modules/@types/pkg4/index.d.ts",
              "isExternalLibraryImport": true
            }
          }
        ]
      ],
      "modules": [
        [
          "./",
          [
            [
              "pkg0",
              {
                "id": 1,
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
              "esnext"
            ]
          ]
        ]
      ],
      "typeRefs": [
        [
          "./",
          [
            [
              "pkg2",
              {
                "id": 2,
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
              "esnext"
            ],
            [
              "pkg3",
              {
                "id": 3,
                "resolvedTypeReferenceDirective": {
                  "resolvedFileName": "./node_modules/pkg3/require.d.ts",
                  "packageId": {
                    "name": "pkg3",
                    "subModuleName": "require.d.ts",
                    "version": "0.0.1"
                  },
                  "isExternalLibraryImport": true
                },
                "affectingLocations": [
                  "./node_modules/pkg3/package.json"
                ]
              },
              "commonjs"
            ],
            [
              "pkg4",
              {
                "id": 4,
                "resolvedTypeReferenceDirective": {
                  "primary": true,
                  "resolvedFileName": "./node_modules/@types/pkg4/index.d.ts",
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
        "affectsGlobalScope": true,
        "impliedFormat": "commonjs"
      },
      "./node_modules/pkg0/import.d.ts": {
        "version": "769951468-export interface ImportInterface0 {}",
        "impliedFormat": "commonjs"
      },
      "./node_modules/pkg1/require.d.ts": {
        "version": "-3547817137-export interface RequireInterface1 {}",
        "impliedFormat": "commonjs"
      },
      "./filewithimports.ts": {
        "version": "4079531109-import type { ImportInterface0 } from \"pkg0\" assert { \"resolution-mode\": \"import\" };\nimport type { RequireInterface1 } from \"pkg1\" assert { \"resolution-mode\": \"require\" };\n",
        "impliedFormat": "commonjs"
      },
      "./node_modules/pkg2/import.d.ts": {
        "version": "1714206242-export {};\ndeclare global {\n    interface ImportInterface2 {}\n}\n",
        "affectsGlobalScope": true,
        "impliedFormat": "commonjs"
      },
      "./node_modules/pkg3/require.d.ts": {
        "version": "-6568745979-export {};\ndeclare global {\n    interface RequireInterface3 {}\n}\n",
        "affectsGlobalScope": true,
        "impliedFormat": "commonjs"
      },
      "./filewithtyperefs.ts": {
        "version": "-20622778057-/// <reference types=\"pkg2\" resolution-mode=\"import\"/>\n/// <reference types=\"pkg3\" resolution-mode=\"require\"/>\ninterface LocalInterface extends ImportInterface2, RequireInterface3 {}\nexport {}\n",
        "impliedFormat": "commonjs"
      },
      "./randomfileforimport.ts": {
        "version": "-8633945300-import type { ImportInterface0 } from \"pkg0\" assert { \"resolution-mode\": \"import\" };\nexport const x = 10;",
        "impliedFormat": "commonjs"
      },
      "./randomfilefortyperef.ts": {
        "version": "-8191038086-/// <reference types=\"pkg2\" resolution-mode=\"import\"/>\nexport const x = 10;",
        "impliedFormat": "commonjs"
      },
      "./node_modules/@types/pkg4/index.d.ts": {
        "version": "-10726455937-export const x = 10;",
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
        "./node_modules/pkg0/import.d.ts",
        "./node_modules/pkg1/require.d.ts"
      ],
      "./filewithtyperefs.ts": [
        "./node_modules/pkg2/import.d.ts",
        "./node_modules/pkg3/require.d.ts"
      ],
      "./randomfileforimport.ts": [
        "./node_modules/pkg0/import.d.ts"
      ],
      "./randomfilefortyperef.ts": [
        "./node_modules/pkg2/import.d.ts"
      ]
    },
    "semanticDiagnosticsPerFile": [
      "../../lib/lib.d.ts",
      "./filewithimports.ts",
      "./filewithtyperefs.ts",
      "./node_modules/@types/pkg4/index.d.ts",
      "./node_modules/pkg0/import.d.ts",
      "./node_modules/pkg1/require.d.ts",
      "./node_modules/pkg2/import.d.ts",
      "./node_modules/pkg3/require.d.ts",
      "./randomfileforimport.ts",
      "./randomfilefortyperef.ts"
    ],
    "latestChangedDtsFile": "FakeFileName",
    "cacheResolutions": {
      "resolutions": [
        {
          "id": 1,
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
          "id": 2,
          "resolvedModule": {
            "resolvedFileName": "./node_modules/pkg1/require.d.ts",
            "isExternalLibraryImport": true,
            "packageId": {
              "name": "pkg1",
              "subModuleName": "require.d.ts",
              "version": "0.0.1"
            }
          },
          "affectingLocations": [
            "./node_modules/pkg1/package.json"
          ]
        },
        {
          "id": 3,
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
          "id": 4,
          "resolvedTypeReferenceDirective": {
            "resolvedFileName": "./node_modules/pkg3/require.d.ts",
            "packageId": {
              "name": "pkg3",
              "subModuleName": "require.d.ts",
              "version": "0.0.1"
            },
            "isExternalLibraryImport": true
          },
          "affectingLocations": [
            "./node_modules/pkg3/package.json"
          ]
        },
        {
          "id": 5,
          "resolvedTypeReferenceDirective": {
            "primary": true,
            "resolvedFileName": "./node_modules/@types/pkg4/index.d.ts",
            "isExternalLibraryImport": true
          }
        }
      ],
      "names": [
        "pkg0",
        "pkg1",
        "pkg2",
        "pkg3",
        "pkg4"
      ],
      "hash": [
        [
          "./node_modules/pkg0/package.json",
          "9838425114-{\"name\":\"pkg0\",\"version\":\"0.0.1\",\"exports\":{\"import\":\"./import.js\",\"require\":\"./require.js\"}}"
        ],
        [
          "./node_modules/pkg1/package.json",
          "-10002112997-{\"name\":\"pkg1\",\"version\":\"0.0.1\",\"exports\":{\"import\":\"./import.js\",\"require\":\"./require.js\"}}"
        ],
        [
          "./node_modules/pkg2/package.json",
          "21696956444-{\"name\":\"pkg2\",\"version\":\"0.0.1\",\"exports\":{\"import\":\"./import.js\",\"require\":\"./require.js\"}}"
        ],
        [
          "./node_modules/pkg3/package.json",
          "1856418333-{\"name\":\"pkg3\",\"version\":\"0.0.1\",\"exports\":{\"import\":\"./import.js\",\"require\":\"./require.js\"}}"
        ]
      ],
      "resolutionEntries": [
        [
          "pkg0",
          {
            "id": 1,
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
          "esnext"
        ],
        [
          "pkg1",
          {
            "id": 2,
            "resolvedModule": {
              "resolvedFileName": "./node_modules/pkg1/require.d.ts",
              "isExternalLibraryImport": true,
              "packageId": {
                "name": "pkg1",
                "subModuleName": "require.d.ts",
                "version": "0.0.1"
              }
            },
            "affectingLocations": [
              "./node_modules/pkg1/package.json"
            ]
          },
          "commonjs"
        ],
        [
          "pkg2",
          {
            "id": 3,
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
          "esnext"
        ],
        [
          "pkg3",
          {
            "id": 4,
            "resolvedTypeReferenceDirective": {
              "resolvedFileName": "./node_modules/pkg3/require.d.ts",
              "packageId": {
                "name": "pkg3",
                "subModuleName": "require.d.ts",
                "version": "0.0.1"
              },
              "isExternalLibraryImport": true
            },
            "affectingLocations": [
              "./node_modules/pkg3/package.json"
            ]
          },
          "commonjs"
        ],
        [
          "pkg4",
          {
            "id": 5,
            "resolvedTypeReferenceDirective": {
              "primary": true,
              "resolvedFileName": "./node_modules/@types/pkg4/index.d.ts",
              "isExternalLibraryImport": true
            }
          }
        ]
      ],
      "modules": [
        [
          "./",
          [
            [
              "pkg0",
              {
                "id": 1,
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
              "esnext"
            ],
            [
              "pkg1",
              {
                "id": 2,
                "resolvedModule": {
                  "resolvedFileName": "./node_modules/pkg1/require.d.ts",
                  "isExternalLibraryImport": true,
                  "packageId": {
                    "name": "pkg1",
                    "subModuleName": "require.d.ts",
                    "version": "0.0.1"
                  }
                },
                "affectingLocations": [
                  "./node_modules/pkg1/package.json"
                ]
              },
              "commonjs"
            ]
          ]
        ]
      ],
      "typeRefs": [
        [
          "./",
          [
            [
              "pkg2",
              {
                "id": 3,
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
              "esnext"
            ],
            [
              "pkg3",
              {
                "id": 4,
                "resolvedTypeReferenceDirective": {
                  "resolvedFileName": "./node_modules/pkg3/require.d.ts",
                  "packageId": {
                    "name": "pkg3",
                    "subModuleName": "require.d.ts",
                    "version": "0.0.1"
                  },
                  "isExternalLibraryImport": true
                },
                "affectingLocations": [
                  "./node_modules/pkg3/package.json"
                ]
              },
              "commonjs"
            ],
            [
              "pkg4",
              {
                "id": 5,
                "resolvedTypeReferenceDirective": {
                  "primary": true,
                  "resolvedFileName": "./node_modules/@types/pkg4/index.d.ts",
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
Incremental and clean size of maps do not match:: FileInfos:: File:: /src/project/tsconfig.tsbuildinfo.readable.baseline.txt
Incremental: {
  "../../lib/lib.d.ts": {
    "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
    "signature": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
    "affectsGlobalScope": true,
    "impliedFormat": "commonjs"
  },
  "./node_modules/pkg0/import.d.ts": {
    "version": "769951468-export interface ImportInterface0 {}",
    "signature": "769951468-export interface ImportInterface0 {}",
    "impliedFormat": "commonjs"
  },
  "./node_modules/pkg1/require.d.ts": {
    "version": "-3547817137-export interface RequireInterface1 {}",
    "signature": "-3547817137-export interface RequireInterface1 {}",
    "impliedFormat": "commonjs"
  },
  "./filewithimports.ts": {
    "version": "4079531109-import type { ImportInterface0 } from \"pkg0\" assert { \"resolution-mode\": \"import\" };\nimport type { RequireInterface1 } from \"pkg1\" assert { \"resolution-mode\": \"require\" };\n",
    "signature": "-4882119183-export {};\r\n",
    "impliedFormat": "commonjs"
  },
  "./node_modules/pkg2/import.d.ts": {
    "version": "1714206242-export {};\ndeclare global {\n    interface ImportInterface2 {}\n}\n",
    "signature": "1714206242-export {};\ndeclare global {\n    interface ImportInterface2 {}\n}\n",
    "affectsGlobalScope": true,
    "impliedFormat": "commonjs"
  },
  "./node_modules/pkg3/require.d.ts": {
    "version": "-6568745979-export {};\ndeclare global {\n    interface RequireInterface3 {}\n}\n",
    "signature": "-6568745979-export {};\ndeclare global {\n    interface RequireInterface3 {}\n}\n",
    "affectsGlobalScope": true,
    "impliedFormat": "commonjs"
  },
  "./filewithtyperefs.ts": {
    "version": "-20622778057-/// <reference types=\"pkg2\" resolution-mode=\"import\"/>\n/// <reference types=\"pkg3\" resolution-mode=\"require\"/>\ninterface LocalInterface extends ImportInterface2, RequireInterface3 {}\nexport {}\n",
    "signature": "-4882119183-export {};\r\n",
    "impliedFormat": "commonjs"
  },
  "./randomfileforimport.ts": {
    "version": "-8633945300-import type { ImportInterface0 } from \"pkg0\" assert { \"resolution-mode\": \"import\" };\nexport const x = 10;",
    "signature": "-6057683066-export declare const x = 10;\r\n",
    "impliedFormat": "commonjs"
  },
  "./randomfilefortyperef.ts": {
    "version": "-8191038086-/// <reference types=\"pkg2\" resolution-mode=\"import\"/>\nexport const x = 10;",
    "signature": "-6057683066-export declare const x = 10;\r\n",
    "impliedFormat": "commonjs"
  },
  "./node_modules/@types/pkg4/index.d.ts": {
    "version": "-10726455937-export const x = 10;",
    "signature": "-10726455937-export const x = 10;",
    "impliedFormat": "commonjs"
  }
}
Clean: {
  "../../lib/lib.d.ts": {
    "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
    "signature": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
    "affectsGlobalScope": true,
    "impliedFormat": "commonjs"
  },
  "./node_modules/pkg0/import.d.ts": {
    "version": "769951468-export interface ImportInterface0 {}",
    "signature": "769951468-export interface ImportInterface0 {}",
    "impliedFormat": "commonjs"
  },
  "./filewithimports.ts": {
    "version": "4079531109-import type { ImportInterface0 } from \"pkg0\" assert { \"resolution-mode\": \"import\" };\nimport type { RequireInterface1 } from \"pkg1\" assert { \"resolution-mode\": \"require\" };\n",
    "signature": "-4882119183-export {};\r\n",
    "impliedFormat": "commonjs"
  },
  "./node_modules/pkg2/import.d.ts": {
    "version": "1714206242-export {};\ndeclare global {\n    interface ImportInterface2 {}\n}\n",
    "signature": "1714206242-export {};\ndeclare global {\n    interface ImportInterface2 {}\n}\n",
    "affectsGlobalScope": true,
    "impliedFormat": "commonjs"
  },
  "./node_modules/pkg3/require.d.ts": {
    "version": "-6568745979-export {};\ndeclare global {\n    interface RequireInterface3 {}\n}\n",
    "signature": "-6568745979-export {};\ndeclare global {\n    interface RequireInterface3 {}\n}\n",
    "affectsGlobalScope": true,
    "impliedFormat": "commonjs"
  },
  "./filewithtyperefs.ts": {
    "version": "-20622778057-/// <reference types=\"pkg2\" resolution-mode=\"import\"/>\n/// <reference types=\"pkg3\" resolution-mode=\"require\"/>\ninterface LocalInterface extends ImportInterface2, RequireInterface3 {}\nexport {}\n",
    "signature": "-4882119183-export {};\r\n",
    "impliedFormat": "commonjs"
  },
  "./randomfileforimport.ts": {
    "version": "-8633945300-import type { ImportInterface0 } from \"pkg0\" assert { \"resolution-mode\": \"import\" };\nexport const x = 10;",
    "signature": "-6057683066-export declare const x = 10;\r\n",
    "impliedFormat": "commonjs"
  },
  "./randomfilefortyperef.ts": {
    "version": "-8191038086-/// <reference types=\"pkg2\" resolution-mode=\"import\"/>\nexport const x = 10;",
    "signature": "-6057683066-export declare const x = 10;\r\n",
    "impliedFormat": "commonjs"
  },
  "./node_modules/@types/pkg4/index.d.ts": {
    "version": "-10726455937-export const x = 10;",
    "signature": "-10726455937-export const x = 10;",
    "impliedFormat": "commonjs"
  }
}
6:: write file not resolved by import
Affected locations are not checked which results in using incorrect resolution
TsBuild info text without affectedFilesPendingEmit:: /src/project/tsconfig.tsbuildinfo.readable.baseline.txt::
CleanBuild:
{
  "program": {
    "fileInfos": {
      "../../lib/lib.d.ts": {
        "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "affectsGlobalScope": true,
        "impliedFormat": "commonjs"
      },
      "./node_modules/pkg0/import.d.ts": {
        "version": "769951468-export interface ImportInterface0 {}",
        "impliedFormat": "commonjs"
      },
      "./node_modules/pkg1/require1.d.ts": {
        "version": "-3547817137-export interface RequireInterface1 {}",
        "impliedFormat": "commonjs"
      },
      "./filewithimports.ts": {
        "version": "4079531109-import type { ImportInterface0 } from \"pkg0\" assert { \"resolution-mode\": \"import\" };\nimport type { RequireInterface1 } from \"pkg1\" assert { \"resolution-mode\": \"require\" };\n",
        "impliedFormat": "commonjs"
      },
      "./node_modules/pkg2/import.d.ts": {
        "version": "1714206242-export {};\ndeclare global {\n    interface ImportInterface2 {}\n}\n",
        "affectsGlobalScope": true,
        "impliedFormat": "commonjs"
      },
      "./node_modules/pkg3/require.d.ts": {
        "version": "-6568745979-export {};\ndeclare global {\n    interface RequireInterface3 {}\n}\n",
        "affectsGlobalScope": true,
        "impliedFormat": "commonjs"
      },
      "./filewithtyperefs.ts": {
        "version": "-20622778057-/// <reference types=\"pkg2\" resolution-mode=\"import\"/>\n/// <reference types=\"pkg3\" resolution-mode=\"require\"/>\ninterface LocalInterface extends ImportInterface2, RequireInterface3 {}\nexport {}\n",
        "impliedFormat": "commonjs"
      },
      "./randomfileforimport.ts": {
        "version": "-8633945300-import type { ImportInterface0 } from \"pkg0\" assert { \"resolution-mode\": \"import\" };\nexport const x = 10;",
        "impliedFormat": "commonjs"
      },
      "./randomfilefortyperef.ts": {
        "version": "-8191038086-/// <reference types=\"pkg2\" resolution-mode=\"import\"/>\nexport const x = 10;",
        "impliedFormat": "commonjs"
      },
      "./node_modules/@types/pkg4/index.d.ts": {
        "version": "-10726455937-export const x = 10;",
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
        "./node_modules/pkg0/import.d.ts",
        "./node_modules/pkg1/require1.d.ts"
      ],
      "./filewithtyperefs.ts": [
        "./node_modules/pkg2/import.d.ts",
        "./node_modules/pkg3/require.d.ts"
      ],
      "./randomfileforimport.ts": [
        "./node_modules/pkg0/import.d.ts"
      ],
      "./randomfilefortyperef.ts": [
        "./node_modules/pkg2/import.d.ts"
      ]
    },
    "semanticDiagnosticsPerFile": [
      "../../lib/lib.d.ts",
      "./filewithimports.ts",
      "./filewithtyperefs.ts",
      "./node_modules/@types/pkg4/index.d.ts",
      "./node_modules/pkg0/import.d.ts",
      "./node_modules/pkg1/require1.d.ts",
      "./node_modules/pkg2/import.d.ts",
      "./node_modules/pkg3/require.d.ts",
      "./randomfileforimport.ts",
      "./randomfilefortyperef.ts"
    ],
    "latestChangedDtsFile": "FakeFileName",
    "cacheResolutions": {
      "resolutions": [
        {
          "id": 1,
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
          "id": 2,
          "resolvedModule": {
            "resolvedFileName": "./node_modules/pkg1/require1.d.ts",
            "isExternalLibraryImport": true,
            "packageId": {
              "name": "pkg1",
              "subModuleName": "require1.d.ts",
              "version": "0.0.1"
            }
          },
          "affectingLocations": [
            "./node_modules/pkg1/package.json"
          ]
        },
        {
          "id": 3,
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
          "id": 4,
          "resolvedTypeReferenceDirective": {
            "resolvedFileName": "./node_modules/pkg3/require.d.ts",
            "packageId": {
              "name": "pkg3",
              "subModuleName": "require.d.ts",
              "version": "0.0.1"
            },
            "isExternalLibraryImport": true
          },
          "affectingLocations": [
            "./node_modules/pkg3/package.json"
          ]
        },
        {
          "id": 5,
          "resolvedTypeReferenceDirective": {
            "primary": true,
            "resolvedFileName": "./node_modules/@types/pkg4/index.d.ts",
            "isExternalLibraryImport": true
          }
        }
      ],
      "names": [
        "pkg0",
        "pkg1",
        "pkg2",
        "pkg3",
        "pkg4"
      ],
      "hash": [
        [
          "./node_modules/pkg0/package.json",
          "9838425114-{\"name\":\"pkg0\",\"version\":\"0.0.1\",\"exports\":{\"import\":\"./import.js\",\"require\":\"./require.js\"}}"
        ],
        [
          "./node_modules/pkg1/package.json",
          "-10723730036-{\"name\":\"pkg1\",\"version\":\"0.0.1\",\"exports\":{\"import\":\"./import.js\",\"require\":\"./require1.js\"}}"
        ],
        [
          "./node_modules/pkg2/package.json",
          "21696956444-{\"name\":\"pkg2\",\"version\":\"0.0.1\",\"exports\":{\"import\":\"./import.js\",\"require\":\"./require.js\"}}"
        ],
        [
          "./node_modules/pkg3/package.json",
          "1856418333-{\"name\":\"pkg3\",\"version\":\"0.0.1\",\"exports\":{\"import\":\"./import.js\",\"require\":\"./require.js\"}}"
        ]
      ],
      "resolutionEntries": [
        [
          "pkg0",
          {
            "id": 1,
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
          "esnext"
        ],
        [
          "pkg1",
          {
            "id": 2,
            "resolvedModule": {
              "resolvedFileName": "./node_modules/pkg1/require1.d.ts",
              "isExternalLibraryImport": true,
              "packageId": {
                "name": "pkg1",
                "subModuleName": "require1.d.ts",
                "version": "0.0.1"
              }
            },
            "affectingLocations": [
              "./node_modules/pkg1/package.json"
            ]
          },
          "commonjs"
        ],
        [
          "pkg2",
          {
            "id": 3,
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
          "esnext"
        ],
        [
          "pkg3",
          {
            "id": 4,
            "resolvedTypeReferenceDirective": {
              "resolvedFileName": "./node_modules/pkg3/require.d.ts",
              "packageId": {
                "name": "pkg3",
                "subModuleName": "require.d.ts",
                "version": "0.0.1"
              },
              "isExternalLibraryImport": true
            },
            "affectingLocations": [
              "./node_modules/pkg3/package.json"
            ]
          },
          "commonjs"
        ],
        [
          "pkg4",
          {
            "id": 5,
            "resolvedTypeReferenceDirective": {
              "primary": true,
              "resolvedFileName": "./node_modules/@types/pkg4/index.d.ts",
              "isExternalLibraryImport": true
            }
          }
        ]
      ],
      "modules": [
        [
          "./",
          [
            [
              "pkg0",
              {
                "id": 1,
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
              "esnext"
            ],
            [
              "pkg1",
              {
                "id": 2,
                "resolvedModule": {
                  "resolvedFileName": "./node_modules/pkg1/require1.d.ts",
                  "isExternalLibraryImport": true,
                  "packageId": {
                    "name": "pkg1",
                    "subModuleName": "require1.d.ts",
                    "version": "0.0.1"
                  }
                },
                "affectingLocations": [
                  "./node_modules/pkg1/package.json"
                ]
              },
              "commonjs"
            ]
          ]
        ]
      ],
      "typeRefs": [
        [
          "./",
          [
            [
              "pkg2",
              {
                "id": 3,
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
              "esnext"
            ],
            [
              "pkg3",
              {
                "id": 4,
                "resolvedTypeReferenceDirective": {
                  "resolvedFileName": "./node_modules/pkg3/require.d.ts",
                  "packageId": {
                    "name": "pkg3",
                    "subModuleName": "require.d.ts",
                    "version": "0.0.1"
                  },
                  "isExternalLibraryImport": true
                },
                "affectingLocations": [
                  "./node_modules/pkg3/package.json"
                ]
              },
              "commonjs"
            ],
            [
              "pkg4",
              {
                "id": 5,
                "resolvedTypeReferenceDirective": {
                  "primary": true,
                  "resolvedFileName": "./node_modules/@types/pkg4/index.d.ts",
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
        "affectsGlobalScope": true,
        "impliedFormat": "commonjs"
      },
      "./node_modules/pkg0/import.d.ts": {
        "version": "769951468-export interface ImportInterface0 {}",
        "impliedFormat": "commonjs"
      },
      "./node_modules/pkg1/require.d.ts": {
        "version": "-3547817137-export interface RequireInterface1 {}",
        "impliedFormat": "commonjs"
      },
      "./filewithimports.ts": {
        "version": "4079531109-import type { ImportInterface0 } from \"pkg0\" assert { \"resolution-mode\": \"import\" };\nimport type { RequireInterface1 } from \"pkg1\" assert { \"resolution-mode\": \"require\" };\n",
        "impliedFormat": "commonjs"
      },
      "./node_modules/pkg2/import.d.ts": {
        "version": "1714206242-export {};\ndeclare global {\n    interface ImportInterface2 {}\n}\n",
        "affectsGlobalScope": true,
        "impliedFormat": "commonjs"
      },
      "./node_modules/pkg3/require.d.ts": {
        "version": "-6568745979-export {};\ndeclare global {\n    interface RequireInterface3 {}\n}\n",
        "affectsGlobalScope": true,
        "impliedFormat": "commonjs"
      },
      "./filewithtyperefs.ts": {
        "version": "-20622778057-/// <reference types=\"pkg2\" resolution-mode=\"import\"/>\n/// <reference types=\"pkg3\" resolution-mode=\"require\"/>\ninterface LocalInterface extends ImportInterface2, RequireInterface3 {}\nexport {}\n",
        "impliedFormat": "commonjs"
      },
      "./randomfileforimport.ts": {
        "version": "-8633945300-import type { ImportInterface0 } from \"pkg0\" assert { \"resolution-mode\": \"import\" };\nexport const x = 10;",
        "impliedFormat": "commonjs"
      },
      "./randomfilefortyperef.ts": {
        "version": "-8191038086-/// <reference types=\"pkg2\" resolution-mode=\"import\"/>\nexport const x = 10;",
        "impliedFormat": "commonjs"
      },
      "./node_modules/@types/pkg4/index.d.ts": {
        "version": "-10726455937-export const x = 10;",
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
        "./node_modules/pkg0/import.d.ts",
        "./node_modules/pkg1/require.d.ts"
      ],
      "./filewithtyperefs.ts": [
        "./node_modules/pkg2/import.d.ts",
        "./node_modules/pkg3/require.d.ts"
      ],
      "./randomfileforimport.ts": [
        "./node_modules/pkg0/import.d.ts"
      ],
      "./randomfilefortyperef.ts": [
        "./node_modules/pkg2/import.d.ts"
      ]
    },
    "semanticDiagnosticsPerFile": [
      "../../lib/lib.d.ts",
      "./filewithimports.ts",
      "./filewithtyperefs.ts",
      "./node_modules/@types/pkg4/index.d.ts",
      "./node_modules/pkg0/import.d.ts",
      "./node_modules/pkg1/require.d.ts",
      "./node_modules/pkg2/import.d.ts",
      "./node_modules/pkg3/require.d.ts",
      "./randomfileforimport.ts",
      "./randomfilefortyperef.ts"
    ],
    "latestChangedDtsFile": "FakeFileName",
    "cacheResolutions": {
      "resolutions": [
        {
          "id": 1,
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
          "id": 2,
          "resolvedModule": {
            "resolvedFileName": "./node_modules/pkg1/require.d.ts",
            "isExternalLibraryImport": true,
            "packageId": {
              "name": "pkg1",
              "subModuleName": "require.d.ts",
              "version": "0.0.1"
            }
          },
          "affectingLocations": [
            "./node_modules/pkg1/package.json"
          ]
        },
        {
          "id": 3,
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
          "id": 4,
          "resolvedTypeReferenceDirective": {
            "resolvedFileName": "./node_modules/pkg3/require.d.ts",
            "packageId": {
              "name": "pkg3",
              "subModuleName": "require.d.ts",
              "version": "0.0.1"
            },
            "isExternalLibraryImport": true
          },
          "affectingLocations": [
            "./node_modules/pkg3/package.json"
          ]
        },
        {
          "id": 5,
          "resolvedTypeReferenceDirective": {
            "primary": true,
            "resolvedFileName": "./node_modules/@types/pkg4/index.d.ts",
            "isExternalLibraryImport": true
          }
        }
      ],
      "names": [
        "pkg0",
        "pkg1",
        "pkg2",
        "pkg3",
        "pkg4"
      ],
      "hash": [
        [
          "./node_modules/pkg0/package.json",
          "9838425114-{\"name\":\"pkg0\",\"version\":\"0.0.1\",\"exports\":{\"import\":\"./import.js\",\"require\":\"./require.js\"}}"
        ],
        [
          "./node_modules/pkg1/package.json",
          "-10002112997-{\"name\":\"pkg1\",\"version\":\"0.0.1\",\"exports\":{\"import\":\"./import.js\",\"require\":\"./require.js\"}}"
        ],
        [
          "./node_modules/pkg2/package.json",
          "21696956444-{\"name\":\"pkg2\",\"version\":\"0.0.1\",\"exports\":{\"import\":\"./import.js\",\"require\":\"./require.js\"}}"
        ],
        [
          "./node_modules/pkg3/package.json",
          "1856418333-{\"name\":\"pkg3\",\"version\":\"0.0.1\",\"exports\":{\"import\":\"./import.js\",\"require\":\"./require.js\"}}"
        ]
      ],
      "resolutionEntries": [
        [
          "pkg0",
          {
            "id": 1,
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
          "esnext"
        ],
        [
          "pkg1",
          {
            "id": 2,
            "resolvedModule": {
              "resolvedFileName": "./node_modules/pkg1/require.d.ts",
              "isExternalLibraryImport": true,
              "packageId": {
                "name": "pkg1",
                "subModuleName": "require.d.ts",
                "version": "0.0.1"
              }
            },
            "affectingLocations": [
              "./node_modules/pkg1/package.json"
            ]
          },
          "commonjs"
        ],
        [
          "pkg2",
          {
            "id": 3,
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
          "esnext"
        ],
        [
          "pkg3",
          {
            "id": 4,
            "resolvedTypeReferenceDirective": {
              "resolvedFileName": "./node_modules/pkg3/require.d.ts",
              "packageId": {
                "name": "pkg3",
                "subModuleName": "require.d.ts",
                "version": "0.0.1"
              },
              "isExternalLibraryImport": true
            },
            "affectingLocations": [
              "./node_modules/pkg3/package.json"
            ]
          },
          "commonjs"
        ],
        [
          "pkg4",
          {
            "id": 5,
            "resolvedTypeReferenceDirective": {
              "primary": true,
              "resolvedFileName": "./node_modules/@types/pkg4/index.d.ts",
              "isExternalLibraryImport": true
            }
          }
        ]
      ],
      "modules": [
        [
          "./",
          [
            [
              "pkg0",
              {
                "id": 1,
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
              "esnext"
            ],
            [
              "pkg1",
              {
                "id": 2,
                "resolvedModule": {
                  "resolvedFileName": "./node_modules/pkg1/require.d.ts",
                  "isExternalLibraryImport": true,
                  "packageId": {
                    "name": "pkg1",
                    "subModuleName": "require.d.ts",
                    "version": "0.0.1"
                  }
                },
                "affectingLocations": [
                  "./node_modules/pkg1/package.json"
                ]
              },
              "commonjs"
            ]
          ]
        ]
      ],
      "typeRefs": [
        [
          "./",
          [
            [
              "pkg2",
              {
                "id": 3,
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
              "esnext"
            ],
            [
              "pkg3",
              {
                "id": 4,
                "resolvedTypeReferenceDirective": {
                  "resolvedFileName": "./node_modules/pkg3/require.d.ts",
                  "packageId": {
                    "name": "pkg3",
                    "subModuleName": "require.d.ts",
                    "version": "0.0.1"
                  },
                  "isExternalLibraryImport": true
                },
                "affectingLocations": [
                  "./node_modules/pkg3/package.json"
                ]
              },
              "commonjs"
            ],
            [
              "pkg4",
              {
                "id": 5,
                "resolvedTypeReferenceDirective": {
                  "primary": true,
                  "resolvedFileName": "./node_modules/@types/pkg4/index.d.ts",
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
Incremental does not contain ./node_modules/pkg1/require1.d.ts which is present in clean:: FileInfos:: File:: /src/project/tsconfig.tsbuildinfo.readable.baseline.txt
Incremental: {
  "../../lib/lib.d.ts": {
    "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
    "signature": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
    "affectsGlobalScope": true,
    "impliedFormat": "commonjs"
  },
  "./node_modules/pkg0/import.d.ts": {
    "version": "769951468-export interface ImportInterface0 {}",
    "signature": "769951468-export interface ImportInterface0 {}",
    "impliedFormat": "commonjs"
  },
  "./node_modules/pkg1/require.d.ts": {
    "version": "-3547817137-export interface RequireInterface1 {}",
    "signature": "-3547817137-export interface RequireInterface1 {}",
    "impliedFormat": "commonjs"
  },
  "./filewithimports.ts": {
    "version": "4079531109-import type { ImportInterface0 } from \"pkg0\" assert { \"resolution-mode\": \"import\" };\nimport type { RequireInterface1 } from \"pkg1\" assert { \"resolution-mode\": \"require\" };\n",
    "signature": "-4882119183-export {};\r\n",
    "impliedFormat": "commonjs"
  },
  "./node_modules/pkg2/import.d.ts": {
    "version": "1714206242-export {};\ndeclare global {\n    interface ImportInterface2 {}\n}\n",
    "signature": "1714206242-export {};\ndeclare global {\n    interface ImportInterface2 {}\n}\n",
    "affectsGlobalScope": true,
    "impliedFormat": "commonjs"
  },
  "./node_modules/pkg3/require.d.ts": {
    "version": "-6568745979-export {};\ndeclare global {\n    interface RequireInterface3 {}\n}\n",
    "signature": "-6568745979-export {};\ndeclare global {\n    interface RequireInterface3 {}\n}\n",
    "affectsGlobalScope": true,
    "impliedFormat": "commonjs"
  },
  "./filewithtyperefs.ts": {
    "version": "-20622778057-/// <reference types=\"pkg2\" resolution-mode=\"import\"/>\n/// <reference types=\"pkg3\" resolution-mode=\"require\"/>\ninterface LocalInterface extends ImportInterface2, RequireInterface3 {}\nexport {}\n",
    "signature": "-4882119183-export {};\r\n",
    "impliedFormat": "commonjs"
  },
  "./randomfileforimport.ts": {
    "version": "-8633945300-import type { ImportInterface0 } from \"pkg0\" assert { \"resolution-mode\": \"import\" };\nexport const x = 10;",
    "signature": "-6057683066-export declare const x = 10;\r\n",
    "impliedFormat": "commonjs"
  },
  "./randomfilefortyperef.ts": {
    "version": "-8191038086-/// <reference types=\"pkg2\" resolution-mode=\"import\"/>\nexport const x = 10;",
    "signature": "-6057683066-export declare const x = 10;\r\n",
    "impliedFormat": "commonjs"
  },
  "./node_modules/@types/pkg4/index.d.ts": {
    "version": "-10726455937-export const x = 10;",
    "signature": "-10726455937-export const x = 10;",
    "impliedFormat": "commonjs"
  }
}
Clean: {
  "../../lib/lib.d.ts": {
    "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
    "signature": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
    "affectsGlobalScope": true,
    "impliedFormat": "commonjs"
  },
  "./node_modules/pkg0/import.d.ts": {
    "version": "769951468-export interface ImportInterface0 {}",
    "signature": "769951468-export interface ImportInterface0 {}",
    "impliedFormat": "commonjs"
  },
  "./node_modules/pkg1/require1.d.ts": {
    "version": "-3547817137-export interface RequireInterface1 {}",
    "signature": "-3547817137-export interface RequireInterface1 {}",
    "impliedFormat": "commonjs"
  },
  "./filewithimports.ts": {
    "version": "4079531109-import type { ImportInterface0 } from \"pkg0\" assert { \"resolution-mode\": \"import\" };\nimport type { RequireInterface1 } from \"pkg1\" assert { \"resolution-mode\": \"require\" };\n",
    "signature": "-4882119183-export {};\r\n",
    "impliedFormat": "commonjs"
  },
  "./node_modules/pkg2/import.d.ts": {
    "version": "1714206242-export {};\ndeclare global {\n    interface ImportInterface2 {}\n}\n",
    "signature": "1714206242-export {};\ndeclare global {\n    interface ImportInterface2 {}\n}\n",
    "affectsGlobalScope": true,
    "impliedFormat": "commonjs"
  },
  "./node_modules/pkg3/require.d.ts": {
    "version": "-6568745979-export {};\ndeclare global {\n    interface RequireInterface3 {}\n}\n",
    "signature": "-6568745979-export {};\ndeclare global {\n    interface RequireInterface3 {}\n}\n",
    "affectsGlobalScope": true,
    "impliedFormat": "commonjs"
  },
  "./filewithtyperefs.ts": {
    "version": "-20622778057-/// <reference types=\"pkg2\" resolution-mode=\"import\"/>\n/// <reference types=\"pkg3\" resolution-mode=\"require\"/>\ninterface LocalInterface extends ImportInterface2, RequireInterface3 {}\nexport {}\n",
    "signature": "-4882119183-export {};\r\n",
    "impliedFormat": "commonjs"
  },
  "./randomfileforimport.ts": {
    "version": "-8633945300-import type { ImportInterface0 } from \"pkg0\" assert { \"resolution-mode\": \"import\" };\nexport const x = 10;",
    "signature": "-6057683066-export declare const x = 10;\r\n",
    "impliedFormat": "commonjs"
  },
  "./randomfilefortyperef.ts": {
    "version": "-8191038086-/// <reference types=\"pkg2\" resolution-mode=\"import\"/>\nexport const x = 10;",
    "signature": "-6057683066-export declare const x = 10;\r\n",
    "impliedFormat": "commonjs"
  },
  "./node_modules/@types/pkg4/index.d.ts": {
    "version": "-10726455937-export const x = 10;",
    "signature": "-10726455937-export const x = 10;",
    "impliedFormat": "commonjs"
  }
}