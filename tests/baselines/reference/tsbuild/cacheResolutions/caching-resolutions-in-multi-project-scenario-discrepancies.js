3:: Project build on B
During incremental build, build succeeds because everything was built
Clean build does not have project build from a so it errors and has extra errors and incorrect buildinfo
TsBuild info text without affectedFilesPendingEmit:: /src/project/tsconfig.b.tsbuildinfo.readable.baseline.txt::
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
      "./brandomfileforimport.ts": {
        "version": "-26669354010-export type { ImportInterface0 } from \"pkg0\";\nexport const x = 10;"
      },
      "./bfilewithimports.ts": {
        "version": "-16966571634-export { y } from \"./aFileWithImports\";\nexport { x } from \"./bRandomFileForImport\";\nimport type { ImportInterface0 } from \"pkg0\";\n"
      },
      "./brandomfileforimport2.ts": {
        "version": "-10726455937-export const x = 10;"
      }
    },
    "options": {
      "cacheResolutions": true,
      "composite": true
    },
    "referencedMap": {
      "./bfilewithimports.ts": [
        "./node_modules/pkg0/index.d.ts",
        "./brandomfileforimport.ts"
      ],
      "./brandomfileforimport.ts": [
        "./node_modules/pkg0/index.d.ts"
      ]
    },
    "semanticDiagnosticsPerFile": [
      "../../lib/lib.d.ts",
      [
        "./bfilewithimports.ts",
        [
          {
            "file": "./bfilewithimports.ts",
            "start": 18,
            "length": 20,
            "messageText": "Output file '/src/project/aFileWithImports.d.ts' has not been built from source file '/src/project/aFileWithImports.ts'.",
            "category": 1,
            "code": 6305
          }
        ]
      ],
      "./brandomfileforimport.ts",
      "./brandomfileforimport2.ts",
      "./node_modules/pkg0/index.d.ts"
    ],
    "latestChangedDtsFile": "FakeFileName",
    "cacheResolutions": {
      "resolutions": [
        {
          "resolvedModule": {
            "resolvedFileName": "./node_modules/pkg0/index.d.ts",
            "isExternalLibraryImport": true
          }
        },
        {
          "resolvedModule": {
            "resolvedFileName": "./aFileWithImports.ts"
          }
        },
        {
          "resolvedModule": {
            "resolvedFileName": "./bRandomFileForImport.ts"
          }
        }
      ],
      "names": [
        "pkg0",
        "./aFileWithImports",
        "./bRandomFileForImport"
      ],
      "resolutionEntries": [
        [
          "pkg0",
          {
            "resolvedModule": {
              "resolvedFileName": "./node_modules/pkg0/index.d.ts",
              "isExternalLibraryImport": true
            }
          }
        ],
        [
          "./aFileWithImports",
          {
            "resolvedModule": {
              "resolvedFileName": "./aFileWithImports.ts"
            }
          }
        ],
        [
          "./bRandomFileForImport",
          {
            "resolvedModule": {
              "resolvedFileName": "./bRandomFileForImport.ts"
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
                "resolvedModule": {
                  "resolvedFileName": "./node_modules/pkg0/index.d.ts",
                  "isExternalLibraryImport": true
                }
              }
            ],
            [
              "./aFileWithImports",
              {
                "resolvedModule": {
                  "resolvedFileName": "./aFileWithImports.ts"
                }
              }
            ],
            [
              "./bRandomFileForImport",
              {
                "resolvedModule": {
                  "resolvedFileName": "./bRandomFileForImport.ts"
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
      "./arandomfileforimport.d.ts": {
        "version": "-21475588774-export type { ImportInterface0 } from \"pkg0\";\r\nexport declare const x = 10;\r\n"
      },
      "./arandomfileforimport2.d.ts": {
        "version": "-6057683066-export declare const x = 10;\r\n"
      },
      "./afilewithimports.d.ts": {
        "version": "-8692926703-export { x } from \"./aRandomFileForImport\";\r\nexport { x as x2 } from \"./aRandomFileForImport2\";\r\nexport declare const y = 10;\r\n"
      },
      "./brandomfileforimport.ts": {
        "version": "-26669354010-export type { ImportInterface0 } from \"pkg0\";\nexport const x = 10;"
      },
      "./bfilewithimports.ts": {
        "version": "-16966571634-export { y } from \"./aFileWithImports\";\nexport { x } from \"./bRandomFileForImport\";\nimport type { ImportInterface0 } from \"pkg0\";\n"
      },
      "./brandomfileforimport2.ts": {
        "version": "-10726455937-export const x = 10;"
      }
    },
    "options": {
      "cacheResolutions": true,
      "composite": true
    },
    "referencedMap": {
      "./afilewithimports.d.ts": [
        "./arandomfileforimport.d.ts",
        "./arandomfileforimport2.d.ts"
      ],
      "./arandomfileforimport.d.ts": [
        "./node_modules/pkg0/index.d.ts"
      ],
      "./bfilewithimports.ts": [
        "./node_modules/pkg0/index.d.ts",
        "./afilewithimports.d.ts",
        "./brandomfileforimport.ts"
      ],
      "./brandomfileforimport.ts": [
        "./node_modules/pkg0/index.d.ts"
      ]
    },
    "semanticDiagnosticsPerFile": [
      "../../lib/lib.d.ts",
      "./afilewithimports.d.ts",
      "./arandomfileforimport.d.ts",
      "./arandomfileforimport2.d.ts",
      "./bfilewithimports.ts",
      "./brandomfileforimport.ts",
      "./brandomfileforimport2.ts",
      "./node_modules/pkg0/index.d.ts"
    ],
    "latestChangedDtsFile": "FakeFileName",
    "cacheResolutions": {
      "resolutions": [
        {
          "resolvedModule": {
            "resolvedFileName": "./node_modules/pkg0/index.d.ts",
            "isExternalLibraryImport": true
          }
        },
        {
          "resolvedModule": {
            "resolvedFileName": "./aRandomFileForImport.ts"
          }
        },
        {
          "resolvedModule": {
            "resolvedFileName": "./aRandomFileForImport2.ts"
          }
        },
        {
          "resolvedModule": {
            "resolvedFileName": "./aFileWithImports.ts"
          }
        },
        {
          "resolvedModule": {
            "resolvedFileName": "./bRandomFileForImport.ts"
          }
        }
      ],
      "names": [
        "pkg0",
        "./aRandomFileForImport",
        "./aRandomFileForImport2",
        "./aFileWithImports",
        "./bRandomFileForImport"
      ],
      "resolutionEntries": [
        [
          "pkg0",
          {
            "resolvedModule": {
              "resolvedFileName": "./node_modules/pkg0/index.d.ts",
              "isExternalLibraryImport": true
            }
          }
        ],
        [
          "./aRandomFileForImport",
          {
            "resolvedModule": {
              "resolvedFileName": "./aRandomFileForImport.ts"
            }
          }
        ],
        [
          "./aRandomFileForImport2",
          {
            "resolvedModule": {
              "resolvedFileName": "./aRandomFileForImport2.ts"
            }
          }
        ],
        [
          "./aFileWithImports",
          {
            "resolvedModule": {
              "resolvedFileName": "./aFileWithImports.ts"
            }
          }
        ],
        [
          "./bRandomFileForImport",
          {
            "resolvedModule": {
              "resolvedFileName": "./bRandomFileForImport.ts"
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
                "resolvedModule": {
                  "resolvedFileName": "./node_modules/pkg0/index.d.ts",
                  "isExternalLibraryImport": true
                }
              }
            ],
            [
              "./aRandomFileForImport",
              {
                "resolvedModule": {
                  "resolvedFileName": "./aRandomFileForImport.ts"
                }
              }
            ],
            [
              "./aRandomFileForImport2",
              {
                "resolvedModule": {
                  "resolvedFileName": "./aRandomFileForImport2.ts"
                }
              }
            ],
            [
              "./aFileWithImports",
              {
                "resolvedModule": {
                  "resolvedFileName": "./aFileWithImports.ts"
                }
              }
            ],
            [
              "./bRandomFileForImport",
              {
                "resolvedModule": {
                  "resolvedFileName": "./bRandomFileForImport.ts"
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
Incremental and clean size of maps do not match:: FileInfos:: File:: /src/project/tsconfig.b.tsbuildinfo.readable.baseline.txt
Incremental: {
  "../../lib/lib.d.ts": {
    "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
    "signature": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
    "affectsGlobalScope": true
  },
  "./node_modules/pkg0/index.d.ts": {
    "version": "769951468-export interface ImportInterface0 {}",
    "signature": "769951468-export interface ImportInterface0 {}"
  },
  "./arandomfileforimport.d.ts": {
    "version": "-21475588774-export type { ImportInterface0 } from \"pkg0\";\r\nexport declare const x = 10;\r\n",
    "signature": "-21475588774-export type { ImportInterface0 } from \"pkg0\";\r\nexport declare const x = 10;\r\n"
  },
  "./arandomfileforimport2.d.ts": {
    "version": "-6057683066-export declare const x = 10;\r\n",
    "signature": "-6057683066-export declare const x = 10;\r\n"
  },
  "./afilewithimports.d.ts": {
    "version": "-8692926703-export { x } from \"./aRandomFileForImport\";\r\nexport { x as x2 } from \"./aRandomFileForImport2\";\r\nexport declare const y = 10;\r\n",
    "signature": "-8692926703-export { x } from \"./aRandomFileForImport\";\r\nexport { x as x2 } from \"./aRandomFileForImport2\";\r\nexport declare const y = 10;\r\n"
  },
  "./brandomfileforimport.ts": {
    "version": "-26669354010-export type { ImportInterface0 } from \"pkg0\";\nexport const x = 10;",
    "signature": "-21475588774-export type { ImportInterface0 } from \"pkg0\";\r\nexport declare const x = 10;\r\n"
  },
  "./bfilewithimports.ts": {
    "version": "-16966571634-export { y } from \"./aFileWithImports\";\nexport { x } from \"./bRandomFileForImport\";\nimport type { ImportInterface0 } from \"pkg0\";\n",
    "signature": "5371975240-export { y } from \"./aFileWithImports\";\r\nexport { x } from \"./bRandomFileForImport\";\r\n"
  },
  "./brandomfileforimport2.ts": {
    "version": "-10726455937-export const x = 10;",
    "signature": "-6057683066-export declare const x = 10;\r\n"
  }
}
Clean: {
  "../../lib/lib.d.ts": {
    "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
    "signature": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
    "affectsGlobalScope": true
  },
  "./node_modules/pkg0/index.d.ts": {
    "version": "769951468-export interface ImportInterface0 {}",
    "signature": "769951468-export interface ImportInterface0 {}"
  },
  "./brandomfileforimport.ts": {
    "version": "-26669354010-export type { ImportInterface0 } from \"pkg0\";\nexport const x = 10;",
    "signature": "-21475588774-export type { ImportInterface0 } from \"pkg0\";\r\nexport declare const x = 10;\r\n"
  },
  "./bfilewithimports.ts": {
    "version": "-16966571634-export { y } from \"./aFileWithImports\";\nexport { x } from \"./bRandomFileForImport\";\nimport type { ImportInterface0 } from \"pkg0\";\n",
    "signature": "5371975240-export { y } from \"./aFileWithImports\";\r\nexport { x } from \"./bRandomFileForImport\";\r\n"
  },
  "./brandomfileforimport2.ts": {
    "version": "-10726455937-export const x = 10;",
    "signature": "-6057683066-export declare const x = 10;\r\n"
  }
}
Incremental and clean size of maps do not match:: exportedModulesMap:: File:: /src/project/tsconfig.b.tsbuildinfo.readable.baseline.txt
Incremental: {
  "./afilewithimports.d.ts": [
    "./arandomfileforimport.d.ts",
    "./arandomfileforimport2.d.ts"
  ],
  "./arandomfileforimport.d.ts": [
    "./node_modules/pkg0/index.d.ts"
  ],
  "./bfilewithimports.ts": [
    "./afilewithimports.d.ts",
    "./brandomfileforimport.ts"
  ],
  "./brandomfileforimport.ts": [
    "./node_modules/pkg0/index.d.ts"
  ]
}
Clean: {
  "./bfilewithimports.ts": [
    "./brandomfileforimport.ts"
  ],
  "./brandomfileforimport.ts": [
    "./node_modules/pkg0/index.d.ts"
  ]
}
4:: modify bRandomFileForImport2 by adding import and project build
During incremental build, build succeeds because everything was built
Clean build does not have project build from a so it errors and has extra errors and incorrect buildinfo
TsBuild info text without affectedFilesPendingEmit:: /src/project/tsconfig.b.tsbuildinfo.readable.baseline.txt::
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
      "./brandomfileforimport.ts": {
        "version": "-26669354010-export type { ImportInterface0 } from \"pkg0\";\nexport const x = 10;"
      },
      "./bfilewithimports.ts": {
        "version": "-16966571634-export { y } from \"./aFileWithImports\";\nexport { x } from \"./bRandomFileForImport\";\nimport type { ImportInterface0 } from \"pkg0\";\n"
      },
      "./brandomfileforimport2.ts": {
        "version": "-26669354010-export type { ImportInterface0 } from \"pkg0\";\nexport const x = 10;"
      }
    },
    "options": {
      "cacheResolutions": true,
      "composite": true
    },
    "referencedMap": {
      "./bfilewithimports.ts": [
        "./node_modules/pkg0/index.d.ts",
        "./brandomfileforimport.ts"
      ],
      "./brandomfileforimport.ts": [
        "./node_modules/pkg0/index.d.ts"
      ],
      "./brandomfileforimport2.ts": [
        "./node_modules/pkg0/index.d.ts"
      ]
    },
    "semanticDiagnosticsPerFile": [
      "../../lib/lib.d.ts",
      [
        "./bfilewithimports.ts",
        [
          {
            "file": "./bfilewithimports.ts",
            "start": 18,
            "length": 20,
            "messageText": "Output file '/src/project/aFileWithImports.d.ts' has not been built from source file '/src/project/aFileWithImports.ts'.",
            "category": 1,
            "code": 6305
          }
        ]
      ],
      "./brandomfileforimport.ts",
      "./brandomfileforimport2.ts",
      "./node_modules/pkg0/index.d.ts"
    ],
    "latestChangedDtsFile": "FakeFileName",
    "cacheResolutions": {
      "resolutions": [
        {
          "resolvedModule": {
            "resolvedFileName": "./node_modules/pkg0/index.d.ts",
            "isExternalLibraryImport": true
          }
        },
        {
          "resolvedModule": {
            "resolvedFileName": "./aFileWithImports.ts"
          }
        },
        {
          "resolvedModule": {
            "resolvedFileName": "./bRandomFileForImport.ts"
          }
        }
      ],
      "names": [
        "pkg0",
        "./aFileWithImports",
        "./bRandomFileForImport"
      ],
      "resolutionEntries": [
        [
          "pkg0",
          {
            "resolvedModule": {
              "resolvedFileName": "./node_modules/pkg0/index.d.ts",
              "isExternalLibraryImport": true
            }
          }
        ],
        [
          "./aFileWithImports",
          {
            "resolvedModule": {
              "resolvedFileName": "./aFileWithImports.ts"
            }
          }
        ],
        [
          "./bRandomFileForImport",
          {
            "resolvedModule": {
              "resolvedFileName": "./bRandomFileForImport.ts"
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
                "resolvedModule": {
                  "resolvedFileName": "./node_modules/pkg0/index.d.ts",
                  "isExternalLibraryImport": true
                }
              }
            ],
            [
              "./aFileWithImports",
              {
                "resolvedModule": {
                  "resolvedFileName": "./aFileWithImports.ts"
                }
              }
            ],
            [
              "./bRandomFileForImport",
              {
                "resolvedModule": {
                  "resolvedFileName": "./bRandomFileForImport.ts"
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
      "./arandomfileforimport.d.ts": {
        "version": "-21475588774-export type { ImportInterface0 } from \"pkg0\";\r\nexport declare const x = 10;\r\n"
      },
      "./arandomfileforimport2.d.ts": {
        "version": "-6057683066-export declare const x = 10;\r\n"
      },
      "./afilewithimports.d.ts": {
        "version": "-8692926703-export { x } from \"./aRandomFileForImport\";\r\nexport { x as x2 } from \"./aRandomFileForImport2\";\r\nexport declare const y = 10;\r\n"
      },
      "./brandomfileforimport.ts": {
        "version": "-26669354010-export type { ImportInterface0 } from \"pkg0\";\nexport const x = 10;"
      },
      "./bfilewithimports.ts": {
        "version": "-16966571634-export { y } from \"./aFileWithImports\";\nexport { x } from \"./bRandomFileForImport\";\nimport type { ImportInterface0 } from \"pkg0\";\n"
      },
      "./brandomfileforimport2.ts": {
        "version": "-26669354010-export type { ImportInterface0 } from \"pkg0\";\nexport const x = 10;"
      }
    },
    "options": {
      "cacheResolutions": true,
      "composite": true
    },
    "referencedMap": {
      "./afilewithimports.d.ts": [
        "./arandomfileforimport.d.ts",
        "./arandomfileforimport2.d.ts"
      ],
      "./arandomfileforimport.d.ts": [
        "./node_modules/pkg0/index.d.ts"
      ],
      "./bfilewithimports.ts": [
        "./node_modules/pkg0/index.d.ts",
        "./afilewithimports.d.ts",
        "./brandomfileforimport.ts"
      ],
      "./brandomfileforimport.ts": [
        "./node_modules/pkg0/index.d.ts"
      ],
      "./brandomfileforimport2.ts": [
        "./node_modules/pkg0/index.d.ts"
      ]
    },
    "semanticDiagnosticsPerFile": [
      "../../lib/lib.d.ts",
      "./afilewithimports.d.ts",
      "./arandomfileforimport.d.ts",
      "./arandomfileforimport2.d.ts",
      "./bfilewithimports.ts",
      "./brandomfileforimport.ts",
      "./brandomfileforimport2.ts",
      "./node_modules/pkg0/index.d.ts"
    ],
    "latestChangedDtsFile": "FakeFileName",
    "cacheResolutions": {
      "resolutions": [
        {
          "resolvedModule": {
            "resolvedFileName": "./node_modules/pkg0/index.d.ts",
            "isExternalLibraryImport": true
          }
        },
        {
          "resolvedModule": {
            "resolvedFileName": "./aRandomFileForImport.ts"
          }
        },
        {
          "resolvedModule": {
            "resolvedFileName": "./aRandomFileForImport2.ts"
          }
        },
        {
          "resolvedModule": {
            "resolvedFileName": "./aFileWithImports.ts"
          }
        },
        {
          "resolvedModule": {
            "resolvedFileName": "./bRandomFileForImport.ts"
          }
        }
      ],
      "names": [
        "pkg0",
        "./aRandomFileForImport",
        "./aRandomFileForImport2",
        "./aFileWithImports",
        "./bRandomFileForImport"
      ],
      "resolutionEntries": [
        [
          "pkg0",
          {
            "resolvedModule": {
              "resolvedFileName": "./node_modules/pkg0/index.d.ts",
              "isExternalLibraryImport": true
            }
          }
        ],
        [
          "./aRandomFileForImport",
          {
            "resolvedModule": {
              "resolvedFileName": "./aRandomFileForImport.ts"
            }
          }
        ],
        [
          "./aRandomFileForImport2",
          {
            "resolvedModule": {
              "resolvedFileName": "./aRandomFileForImport2.ts"
            }
          }
        ],
        [
          "./aFileWithImports",
          {
            "resolvedModule": {
              "resolvedFileName": "./aFileWithImports.ts"
            }
          }
        ],
        [
          "./bRandomFileForImport",
          {
            "resolvedModule": {
              "resolvedFileName": "./bRandomFileForImport.ts"
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
                "resolvedModule": {
                  "resolvedFileName": "./node_modules/pkg0/index.d.ts",
                  "isExternalLibraryImport": true
                }
              }
            ],
            [
              "./aRandomFileForImport",
              {
                "resolvedModule": {
                  "resolvedFileName": "./aRandomFileForImport.ts"
                }
              }
            ],
            [
              "./aRandomFileForImport2",
              {
                "resolvedModule": {
                  "resolvedFileName": "./aRandomFileForImport2.ts"
                }
              }
            ],
            [
              "./aFileWithImports",
              {
                "resolvedModule": {
                  "resolvedFileName": "./aFileWithImports.ts"
                }
              }
            ],
            [
              "./bRandomFileForImport",
              {
                "resolvedModule": {
                  "resolvedFileName": "./bRandomFileForImport.ts"
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
Incremental and clean size of maps do not match:: FileInfos:: File:: /src/project/tsconfig.b.tsbuildinfo.readable.baseline.txt
Incremental: {
  "../../lib/lib.d.ts": {
    "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
    "signature": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
    "affectsGlobalScope": true
  },
  "./node_modules/pkg0/index.d.ts": {
    "version": "769951468-export interface ImportInterface0 {}",
    "signature": "769951468-export interface ImportInterface0 {}"
  },
  "./arandomfileforimport.d.ts": {
    "version": "-21475588774-export type { ImportInterface0 } from \"pkg0\";\r\nexport declare const x = 10;\r\n",
    "signature": "-21475588774-export type { ImportInterface0 } from \"pkg0\";\r\nexport declare const x = 10;\r\n"
  },
  "./arandomfileforimport2.d.ts": {
    "version": "-6057683066-export declare const x = 10;\r\n",
    "signature": "-6057683066-export declare const x = 10;\r\n"
  },
  "./afilewithimports.d.ts": {
    "version": "-8692926703-export { x } from \"./aRandomFileForImport\";\r\nexport { x as x2 } from \"./aRandomFileForImport2\";\r\nexport declare const y = 10;\r\n",
    "signature": "-8692926703-export { x } from \"./aRandomFileForImport\";\r\nexport { x as x2 } from \"./aRandomFileForImport2\";\r\nexport declare const y = 10;\r\n"
  },
  "./brandomfileforimport.ts": {
    "version": "-26669354010-export type { ImportInterface0 } from \"pkg0\";\nexport const x = 10;",
    "signature": "-21475588774-export type { ImportInterface0 } from \"pkg0\";\r\nexport declare const x = 10;\r\n"
  },
  "./bfilewithimports.ts": {
    "version": "-16966571634-export { y } from \"./aFileWithImports\";\nexport { x } from \"./bRandomFileForImport\";\nimport type { ImportInterface0 } from \"pkg0\";\n",
    "signature": "5371975240-export { y } from \"./aFileWithImports\";\r\nexport { x } from \"./bRandomFileForImport\";\r\n"
  },
  "./brandomfileforimport2.ts": {
    "version": "-26669354010-export type { ImportInterface0 } from \"pkg0\";\nexport const x = 10;",
    "signature": "-21475588774-export type { ImportInterface0 } from \"pkg0\";\r\nexport declare const x = 10;\r\n"
  }
}
Clean: {
  "../../lib/lib.d.ts": {
    "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
    "signature": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
    "affectsGlobalScope": true
  },
  "./node_modules/pkg0/index.d.ts": {
    "version": "769951468-export interface ImportInterface0 {}",
    "signature": "769951468-export interface ImportInterface0 {}"
  },
  "./brandomfileforimport.ts": {
    "version": "-26669354010-export type { ImportInterface0 } from \"pkg0\";\nexport const x = 10;",
    "signature": "-21475588774-export type { ImportInterface0 } from \"pkg0\";\r\nexport declare const x = 10;\r\n"
  },
  "./bfilewithimports.ts": {
    "version": "-16966571634-export { y } from \"./aFileWithImports\";\nexport { x } from \"./bRandomFileForImport\";\nimport type { ImportInterface0 } from \"pkg0\";\n",
    "signature": "5371975240-export { y } from \"./aFileWithImports\";\r\nexport { x } from \"./bRandomFileForImport\";\r\n"
  },
  "./brandomfileforimport2.ts": {
    "version": "-26669354010-export type { ImportInterface0 } from \"pkg0\";\nexport const x = 10;",
    "signature": "-21475588774-export type { ImportInterface0 } from \"pkg0\";\r\nexport declare const x = 10;\r\n"
  }
}
Incremental and clean size of maps do not match:: exportedModulesMap:: File:: /src/project/tsconfig.b.tsbuildinfo.readable.baseline.txt
Incremental: {
  "./afilewithimports.d.ts": [
    "./arandomfileforimport.d.ts",
    "./arandomfileforimport2.d.ts"
  ],
  "./arandomfileforimport.d.ts": [
    "./node_modules/pkg0/index.d.ts"
  ],
  "./bfilewithimports.ts": [
    "./afilewithimports.d.ts",
    "./brandomfileforimport.ts"
  ],
  "./brandomfileforimport.ts": [
    "./node_modules/pkg0/index.d.ts"
  ],
  "./brandomfileforimport2.ts": [
    "./node_modules/pkg0/index.d.ts"
  ]
}
Clean: {
  "./bfilewithimports.ts": [
    "./brandomfileforimport.ts"
  ],
  "./brandomfileforimport.ts": [
    "./node_modules/pkg0/index.d.ts"
  ],
  "./brandomfileforimport2.ts": [
    "./node_modules/pkg0/index.d.ts"
  ]
}
5:: Project build on c
During incremental build, build succeeds because everything was built
Clean build does not have project build from a and b so it errors and has extra errors and incorrect buildinfo
TsBuild info text without affectedFilesPendingEmit:: /src/project/tsconfig.tsbuildinfo.readable.baseline.txt::
CleanBuild:
{
  "program": {
    "fileInfos": {
      "../../lib/lib.d.ts": {
        "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "affectsGlobalScope": true
      },
      "./pkg0.d.ts": {
        "version": "769951468-export interface ImportInterface0 {}"
      },
      "./cfilewithimports.ts": {
        "version": "-1053334089-import { y } from \"./bFileWithImports\";\nimport type { ImportInterface0 } from \"pkg0\";\n"
      },
      "./crandomfileforimport.ts": {
        "version": "-26669354010-export type { ImportInterface0 } from \"pkg0\";\nexport const x = 10;"
      },
      "./crandomfileforimport2.ts": {
        "version": "-10726455937-export const x = 10;"
      }
    },
    "options": {
      "cacheResolutions": true,
      "composite": true,
      "module": 2
    },
    "referencedMap": {
      "./cfilewithimports.ts": [
        "./pkg0.d.ts"
      ],
      "./crandomfileforimport.ts": [
        "./pkg0.d.ts"
      ]
    },
    "semanticDiagnosticsPerFile": [
      "../../lib/lib.d.ts",
      [
        "./cfilewithimports.ts",
        [
          {
            "file": "./cfilewithimports.ts",
            "start": 18,
            "length": 20,
            "messageText": "Output file '/src/project/bFileWithImports.d.ts' has not been built from source file '/src/project/bFileWithImports.ts'.",
            "category": 1,
            "code": 6305
          }
        ]
      ],
      "./crandomfileforimport.ts",
      "./crandomfileforimport2.ts",
      "./pkg0.d.ts"
    ],
    "latestChangedDtsFile": "FakeFileName",
    "cacheResolutions": {
      "resolutions": [
        {
          "resolvedModule": {
            "resolvedFileName": "./bFileWithImports.ts"
          }
        },
        {
          "resolvedModule": {
            "resolvedFileName": "./pkg0.d.ts"
          }
        }
      ],
      "names": [
        "./bFileWithImports",
        "pkg0"
      ],
      "resolutionEntries": [
        [
          "./bFileWithImports",
          {
            "resolvedModule": {
              "resolvedFileName": "./bFileWithImports.ts"
            }
          }
        ],
        [
          "pkg0",
          {
            "resolvedModule": {
              "resolvedFileName": "./pkg0.d.ts"
            }
          }
        ]
      ],
      "modules": [
        [
          "./",
          [
            [
              "./bFileWithImports",
              {
                "resolvedModule": {
                  "resolvedFileName": "./bFileWithImports.ts"
                }
              }
            ],
            [
              "pkg0",
              {
                "resolvedModule": {
                  "resolvedFileName": "./pkg0.d.ts"
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
      "./arandomfileforimport.d.ts": {
        "version": "-21475588774-export type { ImportInterface0 } from \"pkg0\";\r\nexport declare const x = 10;\r\n"
      },
      "./arandomfileforimport2.d.ts": {
        "version": "-6057683066-export declare const x = 10;\r\n"
      },
      "./afilewithimports.d.ts": {
        "version": "-8692926703-export { x } from \"./aRandomFileForImport\";\r\nexport { x as x2 } from \"./aRandomFileForImport2\";\r\nexport declare const y = 10;\r\n"
      },
      "./brandomfileforimport.d.ts": {
        "version": "-21475588774-export type { ImportInterface0 } from \"pkg0\";\r\nexport declare const x = 10;\r\n"
      },
      "./bfilewithimports.d.ts": {
        "version": "5371975240-export { y } from \"./aFileWithImports\";\r\nexport { x } from \"./bRandomFileForImport\";\r\n"
      },
      "./pkg0.d.ts": {
        "version": "769951468-export interface ImportInterface0 {}"
      },
      "./cfilewithimports.ts": {
        "version": "-1053334089-import { y } from \"./bFileWithImports\";\nimport type { ImportInterface0 } from \"pkg0\";\n"
      },
      "./crandomfileforimport.ts": {
        "version": "-26669354010-export type { ImportInterface0 } from \"pkg0\";\nexport const x = 10;"
      },
      "./crandomfileforimport2.ts": {
        "version": "-10726455937-export const x = 10;"
      }
    },
    "options": {
      "cacheResolutions": true,
      "composite": true,
      "module": 2
    },
    "referencedMap": {
      "./afilewithimports.d.ts": [
        "./arandomfileforimport.d.ts",
        "./arandomfileforimport2.d.ts"
      ],
      "./arandomfileforimport.d.ts": [
        "./node_modules/pkg0/index.d.ts"
      ],
      "./bfilewithimports.d.ts": [
        "./afilewithimports.d.ts",
        "./brandomfileforimport.d.ts"
      ],
      "./brandomfileforimport.d.ts": [
        "./node_modules/pkg0/index.d.ts"
      ],
      "./cfilewithimports.ts": [
        "./bfilewithimports.d.ts",
        "./pkg0.d.ts"
      ],
      "./crandomfileforimport.ts": [
        "./pkg0.d.ts"
      ]
    },
    "semanticDiagnosticsPerFile": [
      "../../lib/lib.d.ts",
      "./afilewithimports.d.ts",
      "./arandomfileforimport.d.ts",
      "./arandomfileforimport2.d.ts",
      "./bfilewithimports.d.ts",
      "./brandomfileforimport.d.ts",
      "./cfilewithimports.ts",
      "./crandomfileforimport.ts",
      "./crandomfileforimport2.ts",
      "./node_modules/pkg0/index.d.ts",
      "./pkg0.d.ts"
    ],
    "latestChangedDtsFile": "FakeFileName",
    "cacheResolutions": {
      "resolutions": [
        {
          "resolvedModule": {
            "resolvedFileName": "./bFileWithImports.ts"
          }
        },
        {
          "resolvedModule": {
            "resolvedFileName": "./pkg0.d.ts"
          }
        },
        {
          "resolvedModule": {
            "resolvedFileName": "./node_modules/pkg0/index.d.ts",
            "isExternalLibraryImport": true
          }
        },
        {
          "resolvedModule": {
            "resolvedFileName": "./aRandomFileForImport.ts"
          }
        },
        {
          "resolvedModule": {
            "resolvedFileName": "./aRandomFileForImport2.ts"
          }
        },
        {
          "resolvedModule": {
            "resolvedFileName": "./aFileWithImports.ts"
          }
        },
        {
          "resolvedModule": {
            "resolvedFileName": "./bRandomFileForImport.ts"
          }
        }
      ],
      "names": [
        "./bFileWithImports",
        "pkg0",
        "./aRandomFileForImport",
        "./aRandomFileForImport2",
        "./aFileWithImports",
        "./bRandomFileForImport"
      ],
      "resolutionEntries": [
        [
          "./bFileWithImports",
          {
            "resolvedModule": {
              "resolvedFileName": "./bFileWithImports.ts"
            }
          }
        ],
        [
          "pkg0",
          {
            "resolvedModule": {
              "resolvedFileName": "./pkg0.d.ts"
            }
          }
        ],
        [
          "pkg0",
          {
            "resolvedModule": {
              "resolvedFileName": "./node_modules/pkg0/index.d.ts",
              "isExternalLibraryImport": true
            }
          }
        ],
        [
          "./aRandomFileForImport",
          {
            "resolvedModule": {
              "resolvedFileName": "./aRandomFileForImport.ts"
            }
          }
        ],
        [
          "./aRandomFileForImport2",
          {
            "resolvedModule": {
              "resolvedFileName": "./aRandomFileForImport2.ts"
            }
          }
        ],
        [
          "./aFileWithImports",
          {
            "resolvedModule": {
              "resolvedFileName": "./aFileWithImports.ts"
            }
          }
        ],
        [
          "./bRandomFileForImport",
          {
            "resolvedModule": {
              "resolvedFileName": "./bRandomFileForImport.ts"
            }
          }
        ]
      ],
      "modules": {
        "own": [
          [
            "./",
            [
              [
                "./bFileWithImports",
                {
                  "resolvedModule": {
                    "resolvedFileName": "./bFileWithImports.ts"
                  }
                }
              ],
              [
                "pkg0",
                {
                  "resolvedModule": {
                    "resolvedFileName": "./pkg0.d.ts"
                  }
                }
              ]
            ]
          ]
        ],
        "redirects": [
          {
            "options": {
              "cacheResolutions": true
            },
            "cache": [
              [
                "./",
                [
                  [
                    "pkg0",
                    {
                      "resolvedModule": {
                        "resolvedFileName": "./node_modules/pkg0/index.d.ts",
                        "isExternalLibraryImport": true
                      }
                    }
                  ],
                  [
                    "./aRandomFileForImport",
                    {
                      "resolvedModule": {
                        "resolvedFileName": "./aRandomFileForImport.ts"
                      }
                    }
                  ],
                  [
                    "./aRandomFileForImport2",
                    {
                      "resolvedModule": {
                        "resolvedFileName": "./aRandomFileForImport2.ts"
                      }
                    }
                  ],
                  [
                    "./aFileWithImports",
                    {
                      "resolvedModule": {
                        "resolvedFileName": "./aFileWithImports.ts"
                      }
                    }
                  ],
                  [
                    "./bRandomFileForImport",
                    {
                      "resolvedModule": {
                        "resolvedFileName": "./bRandomFileForImport.ts"
                      }
                    }
                  ]
                ]
              ]
            ]
          }
        ]
      }
    }
  },
  "version": "FakeTSVersion"
}
Incremental and clean size of maps do not match:: FileInfos:: File:: /src/project/tsconfig.tsbuildinfo.readable.baseline.txt
Incremental: {
  "../../lib/lib.d.ts": {
    "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
    "signature": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
    "affectsGlobalScope": true
  },
  "./node_modules/pkg0/index.d.ts": {
    "version": "769951468-export interface ImportInterface0 {}",
    "signature": "769951468-export interface ImportInterface0 {}"
  },
  "./arandomfileforimport.d.ts": {
    "version": "-21475588774-export type { ImportInterface0 } from \"pkg0\";\r\nexport declare const x = 10;\r\n",
    "signature": "-21475588774-export type { ImportInterface0 } from \"pkg0\";\r\nexport declare const x = 10;\r\n"
  },
  "./arandomfileforimport2.d.ts": {
    "version": "-6057683066-export declare const x = 10;\r\n",
    "signature": "-6057683066-export declare const x = 10;\r\n"
  },
  "./afilewithimports.d.ts": {
    "version": "-8692926703-export { x } from \"./aRandomFileForImport\";\r\nexport { x as x2 } from \"./aRandomFileForImport2\";\r\nexport declare const y = 10;\r\n",
    "signature": "-8692926703-export { x } from \"./aRandomFileForImport\";\r\nexport { x as x2 } from \"./aRandomFileForImport2\";\r\nexport declare const y = 10;\r\n"
  },
  "./brandomfileforimport.d.ts": {
    "version": "-21475588774-export type { ImportInterface0 } from \"pkg0\";\r\nexport declare const x = 10;\r\n",
    "signature": "-21475588774-export type { ImportInterface0 } from \"pkg0\";\r\nexport declare const x = 10;\r\n"
  },
  "./bfilewithimports.d.ts": {
    "version": "5371975240-export { y } from \"./aFileWithImports\";\r\nexport { x } from \"./bRandomFileForImport\";\r\n",
    "signature": "5371975240-export { y } from \"./aFileWithImports\";\r\nexport { x } from \"./bRandomFileForImport\";\r\n"
  },
  "./pkg0.d.ts": {
    "version": "769951468-export interface ImportInterface0 {}",
    "signature": "769951468-export interface ImportInterface0 {}"
  },
  "./cfilewithimports.ts": {
    "version": "-1053334089-import { y } from \"./bFileWithImports\";\nimport type { ImportInterface0 } from \"pkg0\";\n",
    "signature": "-4882119183-export {};\r\n"
  },
  "./crandomfileforimport.ts": {
    "version": "-26669354010-export type { ImportInterface0 } from \"pkg0\";\nexport const x = 10;",
    "signature": "-21475588774-export type { ImportInterface0 } from \"pkg0\";\r\nexport declare const x = 10;\r\n"
  },
  "./crandomfileforimport2.ts": {
    "version": "-10726455937-export const x = 10;",
    "signature": "-6057683066-export declare const x = 10;\r\n"
  }
}
Clean: {
  "../../lib/lib.d.ts": {
    "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
    "signature": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
    "affectsGlobalScope": true
  },
  "./pkg0.d.ts": {
    "version": "769951468-export interface ImportInterface0 {}",
    "signature": "769951468-export interface ImportInterface0 {}"
  },
  "./cfilewithimports.ts": {
    "version": "-1053334089-import { y } from \"./bFileWithImports\";\nimport type { ImportInterface0 } from \"pkg0\";\n",
    "signature": "-4882119183-export {};\r\n"
  },
  "./crandomfileforimport.ts": {
    "version": "-26669354010-export type { ImportInterface0 } from \"pkg0\";\nexport const x = 10;",
    "signature": "-21475588774-export type { ImportInterface0 } from \"pkg0\";\r\nexport declare const x = 10;\r\n"
  },
  "./crandomfileforimport2.ts": {
    "version": "-10726455937-export const x = 10;",
    "signature": "-6057683066-export declare const x = 10;\r\n"
  }
}
Incremental and clean size of maps do not match:: exportedModulesMap:: File:: /src/project/tsconfig.tsbuildinfo.readable.baseline.txt
Incremental: {
  "./afilewithimports.d.ts": [
    "./arandomfileforimport.d.ts",
    "./arandomfileforimport2.d.ts"
  ],
  "./arandomfileforimport.d.ts": [
    "./node_modules/pkg0/index.d.ts"
  ],
  "./bfilewithimports.d.ts": [
    "./afilewithimports.d.ts",
    "./brandomfileforimport.d.ts"
  ],
  "./brandomfileforimport.d.ts": [
    "./node_modules/pkg0/index.d.ts"
  ],
  "./crandomfileforimport.ts": [
    "./pkg0.d.ts"
  ]
}
Clean: {
  "./crandomfileforimport.ts": [
    "./pkg0.d.ts"
  ]
}
6:: modify cRandomFileForImport2 by adding import and project build
During incremental build, build succeeds because everything was built
Clean build does not have project build from a and b so it errors and has extra errors and incorrect buildinfo
TsBuild info text without affectedFilesPendingEmit:: /src/project/tsconfig.tsbuildinfo.readable.baseline.txt::
CleanBuild:
{
  "program": {
    "fileInfos": {
      "../../lib/lib.d.ts": {
        "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "affectsGlobalScope": true
      },
      "./pkg0.d.ts": {
        "version": "769951468-export interface ImportInterface0 {}"
      },
      "./cfilewithimports.ts": {
        "version": "-1053334089-import { y } from \"./bFileWithImports\";\nimport type { ImportInterface0 } from \"pkg0\";\n"
      },
      "./crandomfileforimport.ts": {
        "version": "-26669354010-export type { ImportInterface0 } from \"pkg0\";\nexport const x = 10;"
      },
      "./crandomfileforimport2.ts": {
        "version": "-26669354010-export type { ImportInterface0 } from \"pkg0\";\nexport const x = 10;"
      }
    },
    "options": {
      "cacheResolutions": true,
      "composite": true,
      "module": 2
    },
    "referencedMap": {
      "./cfilewithimports.ts": [
        "./pkg0.d.ts"
      ],
      "./crandomfileforimport.ts": [
        "./pkg0.d.ts"
      ],
      "./crandomfileforimport2.ts": [
        "./pkg0.d.ts"
      ]
    },
    "semanticDiagnosticsPerFile": [
      "../../lib/lib.d.ts",
      [
        "./cfilewithimports.ts",
        [
          {
            "file": "./cfilewithimports.ts",
            "start": 18,
            "length": 20,
            "messageText": "Output file '/src/project/bFileWithImports.d.ts' has not been built from source file '/src/project/bFileWithImports.ts'.",
            "category": 1,
            "code": 6305
          }
        ]
      ],
      "./crandomfileforimport.ts",
      "./crandomfileforimport2.ts",
      "./pkg0.d.ts"
    ],
    "latestChangedDtsFile": "FakeFileName",
    "cacheResolutions": {
      "resolutions": [
        {
          "resolvedModule": {
            "resolvedFileName": "./bFileWithImports.ts"
          }
        },
        {
          "resolvedModule": {
            "resolvedFileName": "./pkg0.d.ts"
          }
        }
      ],
      "names": [
        "./bFileWithImports",
        "pkg0"
      ],
      "resolutionEntries": [
        [
          "./bFileWithImports",
          {
            "resolvedModule": {
              "resolvedFileName": "./bFileWithImports.ts"
            }
          }
        ],
        [
          "pkg0",
          {
            "resolvedModule": {
              "resolvedFileName": "./pkg0.d.ts"
            }
          }
        ]
      ],
      "modules": [
        [
          "./",
          [
            [
              "./bFileWithImports",
              {
                "resolvedModule": {
                  "resolvedFileName": "./bFileWithImports.ts"
                }
              }
            ],
            [
              "pkg0",
              {
                "resolvedModule": {
                  "resolvedFileName": "./pkg0.d.ts"
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
      "./arandomfileforimport.d.ts": {
        "version": "-21475588774-export type { ImportInterface0 } from \"pkg0\";\r\nexport declare const x = 10;\r\n"
      },
      "./arandomfileforimport2.d.ts": {
        "version": "-6057683066-export declare const x = 10;\r\n"
      },
      "./afilewithimports.d.ts": {
        "version": "-8692926703-export { x } from \"./aRandomFileForImport\";\r\nexport { x as x2 } from \"./aRandomFileForImport2\";\r\nexport declare const y = 10;\r\n"
      },
      "./brandomfileforimport.d.ts": {
        "version": "-21475588774-export type { ImportInterface0 } from \"pkg0\";\r\nexport declare const x = 10;\r\n"
      },
      "./bfilewithimports.d.ts": {
        "version": "5371975240-export { y } from \"./aFileWithImports\";\r\nexport { x } from \"./bRandomFileForImport\";\r\n"
      },
      "./pkg0.d.ts": {
        "version": "769951468-export interface ImportInterface0 {}"
      },
      "./cfilewithimports.ts": {
        "version": "-1053334089-import { y } from \"./bFileWithImports\";\nimport type { ImportInterface0 } from \"pkg0\";\n"
      },
      "./crandomfileforimport.ts": {
        "version": "-26669354010-export type { ImportInterface0 } from \"pkg0\";\nexport const x = 10;"
      },
      "./crandomfileforimport2.ts": {
        "version": "-26669354010-export type { ImportInterface0 } from \"pkg0\";\nexport const x = 10;"
      }
    },
    "options": {
      "cacheResolutions": true,
      "composite": true,
      "module": 2
    },
    "referencedMap": {
      "./afilewithimports.d.ts": [
        "./arandomfileforimport.d.ts",
        "./arandomfileforimport2.d.ts"
      ],
      "./arandomfileforimport.d.ts": [
        "./node_modules/pkg0/index.d.ts"
      ],
      "./bfilewithimports.d.ts": [
        "./afilewithimports.d.ts",
        "./brandomfileforimport.d.ts"
      ],
      "./brandomfileforimport.d.ts": [
        "./node_modules/pkg0/index.d.ts"
      ],
      "./cfilewithimports.ts": [
        "./bfilewithimports.d.ts",
        "./pkg0.d.ts"
      ],
      "./crandomfileforimport.ts": [
        "./pkg0.d.ts"
      ],
      "./crandomfileforimport2.ts": [
        "./pkg0.d.ts"
      ]
    },
    "semanticDiagnosticsPerFile": [
      "../../lib/lib.d.ts",
      "./afilewithimports.d.ts",
      "./arandomfileforimport.d.ts",
      "./arandomfileforimport2.d.ts",
      "./bfilewithimports.d.ts",
      "./brandomfileforimport.d.ts",
      "./cfilewithimports.ts",
      "./crandomfileforimport.ts",
      "./crandomfileforimport2.ts",
      "./node_modules/pkg0/index.d.ts",
      "./pkg0.d.ts"
    ],
    "latestChangedDtsFile": "FakeFileName",
    "cacheResolutions": {
      "resolutions": [
        {
          "resolvedModule": {
            "resolvedFileName": "./bFileWithImports.ts"
          }
        },
        {
          "resolvedModule": {
            "resolvedFileName": "./pkg0.d.ts"
          }
        },
        {
          "resolvedModule": {
            "resolvedFileName": "./node_modules/pkg0/index.d.ts",
            "isExternalLibraryImport": true
          }
        },
        {
          "resolvedModule": {
            "resolvedFileName": "./aRandomFileForImport.ts"
          }
        },
        {
          "resolvedModule": {
            "resolvedFileName": "./aRandomFileForImport2.ts"
          }
        },
        {
          "resolvedModule": {
            "resolvedFileName": "./aFileWithImports.ts"
          }
        },
        {
          "resolvedModule": {
            "resolvedFileName": "./bRandomFileForImport.ts"
          }
        }
      ],
      "names": [
        "./bFileWithImports",
        "pkg0",
        "./aRandomFileForImport",
        "./aRandomFileForImport2",
        "./aFileWithImports",
        "./bRandomFileForImport"
      ],
      "resolutionEntries": [
        [
          "./bFileWithImports",
          {
            "resolvedModule": {
              "resolvedFileName": "./bFileWithImports.ts"
            }
          }
        ],
        [
          "pkg0",
          {
            "resolvedModule": {
              "resolvedFileName": "./pkg0.d.ts"
            }
          }
        ],
        [
          "pkg0",
          {
            "resolvedModule": {
              "resolvedFileName": "./node_modules/pkg0/index.d.ts",
              "isExternalLibraryImport": true
            }
          }
        ],
        [
          "./aRandomFileForImport",
          {
            "resolvedModule": {
              "resolvedFileName": "./aRandomFileForImport.ts"
            }
          }
        ],
        [
          "./aRandomFileForImport2",
          {
            "resolvedModule": {
              "resolvedFileName": "./aRandomFileForImport2.ts"
            }
          }
        ],
        [
          "./aFileWithImports",
          {
            "resolvedModule": {
              "resolvedFileName": "./aFileWithImports.ts"
            }
          }
        ],
        [
          "./bRandomFileForImport",
          {
            "resolvedModule": {
              "resolvedFileName": "./bRandomFileForImport.ts"
            }
          }
        ]
      ],
      "modules": {
        "own": [
          [
            "./",
            [
              [
                "./bFileWithImports",
                {
                  "resolvedModule": {
                    "resolvedFileName": "./bFileWithImports.ts"
                  }
                }
              ],
              [
                "pkg0",
                {
                  "resolvedModule": {
                    "resolvedFileName": "./pkg0.d.ts"
                  }
                }
              ]
            ]
          ]
        ],
        "redirects": [
          {
            "options": {
              "cacheResolutions": true
            },
            "cache": [
              [
                "./",
                [
                  [
                    "pkg0",
                    {
                      "resolvedModule": {
                        "resolvedFileName": "./node_modules/pkg0/index.d.ts",
                        "isExternalLibraryImport": true
                      }
                    }
                  ],
                  [
                    "./aRandomFileForImport",
                    {
                      "resolvedModule": {
                        "resolvedFileName": "./aRandomFileForImport.ts"
                      }
                    }
                  ],
                  [
                    "./aRandomFileForImport2",
                    {
                      "resolvedModule": {
                        "resolvedFileName": "./aRandomFileForImport2.ts"
                      }
                    }
                  ],
                  [
                    "./aFileWithImports",
                    {
                      "resolvedModule": {
                        "resolvedFileName": "./aFileWithImports.ts"
                      }
                    }
                  ],
                  [
                    "./bRandomFileForImport",
                    {
                      "resolvedModule": {
                        "resolvedFileName": "./bRandomFileForImport.ts"
                      }
                    }
                  ]
                ]
              ]
            ]
          }
        ]
      }
    }
  },
  "version": "FakeTSVersion"
}
Incremental and clean size of maps do not match:: FileInfos:: File:: /src/project/tsconfig.tsbuildinfo.readable.baseline.txt
Incremental: {
  "../../lib/lib.d.ts": {
    "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
    "signature": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
    "affectsGlobalScope": true
  },
  "./node_modules/pkg0/index.d.ts": {
    "version": "769951468-export interface ImportInterface0 {}",
    "signature": "769951468-export interface ImportInterface0 {}"
  },
  "./arandomfileforimport.d.ts": {
    "version": "-21475588774-export type { ImportInterface0 } from \"pkg0\";\r\nexport declare const x = 10;\r\n",
    "signature": "-21475588774-export type { ImportInterface0 } from \"pkg0\";\r\nexport declare const x = 10;\r\n"
  },
  "./arandomfileforimport2.d.ts": {
    "version": "-6057683066-export declare const x = 10;\r\n",
    "signature": "-6057683066-export declare const x = 10;\r\n"
  },
  "./afilewithimports.d.ts": {
    "version": "-8692926703-export { x } from \"./aRandomFileForImport\";\r\nexport { x as x2 } from \"./aRandomFileForImport2\";\r\nexport declare const y = 10;\r\n",
    "signature": "-8692926703-export { x } from \"./aRandomFileForImport\";\r\nexport { x as x2 } from \"./aRandomFileForImport2\";\r\nexport declare const y = 10;\r\n"
  },
  "./brandomfileforimport.d.ts": {
    "version": "-21475588774-export type { ImportInterface0 } from \"pkg0\";\r\nexport declare const x = 10;\r\n",
    "signature": "-21475588774-export type { ImportInterface0 } from \"pkg0\";\r\nexport declare const x = 10;\r\n"
  },
  "./bfilewithimports.d.ts": {
    "version": "5371975240-export { y } from \"./aFileWithImports\";\r\nexport { x } from \"./bRandomFileForImport\";\r\n",
    "signature": "5371975240-export { y } from \"./aFileWithImports\";\r\nexport { x } from \"./bRandomFileForImport\";\r\n"
  },
  "./pkg0.d.ts": {
    "version": "769951468-export interface ImportInterface0 {}",
    "signature": "769951468-export interface ImportInterface0 {}"
  },
  "./cfilewithimports.ts": {
    "version": "-1053334089-import { y } from \"./bFileWithImports\";\nimport type { ImportInterface0 } from \"pkg0\";\n",
    "signature": "-4882119183-export {};\r\n"
  },
  "./crandomfileforimport.ts": {
    "version": "-26669354010-export type { ImportInterface0 } from \"pkg0\";\nexport const x = 10;",
    "signature": "-21475588774-export type { ImportInterface0 } from \"pkg0\";\r\nexport declare const x = 10;\r\n"
  },
  "./crandomfileforimport2.ts": {
    "version": "-26669354010-export type { ImportInterface0 } from \"pkg0\";\nexport const x = 10;",
    "signature": "-21475588774-export type { ImportInterface0 } from \"pkg0\";\r\nexport declare const x = 10;\r\n"
  }
}
Clean: {
  "../../lib/lib.d.ts": {
    "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
    "signature": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
    "affectsGlobalScope": true
  },
  "./pkg0.d.ts": {
    "version": "769951468-export interface ImportInterface0 {}",
    "signature": "769951468-export interface ImportInterface0 {}"
  },
  "./cfilewithimports.ts": {
    "version": "-1053334089-import { y } from \"./bFileWithImports\";\nimport type { ImportInterface0 } from \"pkg0\";\n",
    "signature": "-4882119183-export {};\r\n"
  },
  "./crandomfileforimport.ts": {
    "version": "-26669354010-export type { ImportInterface0 } from \"pkg0\";\nexport const x = 10;",
    "signature": "-21475588774-export type { ImportInterface0 } from \"pkg0\";\r\nexport declare const x = 10;\r\n"
  },
  "./crandomfileforimport2.ts": {
    "version": "-26669354010-export type { ImportInterface0 } from \"pkg0\";\nexport const x = 10;",
    "signature": "-21475588774-export type { ImportInterface0 } from \"pkg0\";\r\nexport declare const x = 10;\r\n"
  }
}
Incremental and clean size of maps do not match:: exportedModulesMap:: File:: /src/project/tsconfig.tsbuildinfo.readable.baseline.txt
Incremental: {
  "./afilewithimports.d.ts": [
    "./arandomfileforimport.d.ts",
    "./arandomfileforimport2.d.ts"
  ],
  "./arandomfileforimport.d.ts": [
    "./node_modules/pkg0/index.d.ts"
  ],
  "./bfilewithimports.d.ts": [
    "./afilewithimports.d.ts",
    "./brandomfileforimport.d.ts"
  ],
  "./brandomfileforimport.d.ts": [
    "./node_modules/pkg0/index.d.ts"
  ],
  "./crandomfileforimport.ts": [
    "./pkg0.d.ts"
  ],
  "./crandomfileforimport2.ts": [
    "./pkg0.d.ts"
  ]
}
Clean: {
  "./crandomfileforimport.ts": [
    "./pkg0.d.ts"
  ],
  "./crandomfileforimport2.ts": [
    "./pkg0.d.ts"
  ]
}