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
          "original": {
            "resolvedModule": 2
          },
          "resolutionId": 1,
          "resolvedModule": "./node_modules/pkg0/index.d.ts"
        },
        {
          "original": {
            "resolvedModule": 7
          },
          "resolutionId": 2,
          "resolvedModule": "./aFileWithImports.ts"
        },
        {
          "original": {
            "resolvedModule": 8
          },
          "resolutionId": 3,
          "resolvedModule": "./bRandomFileForImport.ts"
        }
      ],
      "names": [
        "pkg0",
        "./aFileWithImports",
        "./bRandomFileForImport"
      ],
      "resolutionEntries": [
        {
          "original": [
            1,
            1
          ],
          "resolutionEntryId": 1,
          "name": "pkg0",
          "resolution": {
            "resolutionId": 1,
            "resolvedModule": "./node_modules/pkg0/index.d.ts"
          }
        },
        {
          "original": [
            2,
            2
          ],
          "resolutionEntryId": 2,
          "name": "./aFileWithImports",
          "resolution": {
            "resolutionId": 2,
            "resolvedModule": "./aFileWithImports.ts"
          }
        },
        {
          "original": [
            3,
            3
          ],
          "resolutionEntryId": 3,
          "name": "./bRandomFileForImport",
          "resolution": {
            "resolutionId": 3,
            "resolvedModule": "./bRandomFileForImport.ts"
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
                "resolvedModule": "./node_modules/pkg0/index.d.ts"
              }
            },
            {
              "resolutionEntryId": 2,
              "name": "./aFileWithImports",
              "resolution": {
                "resolutionId": 2,
                "resolvedModule": "./aFileWithImports.ts"
              }
            },
            {
              "resolutionEntryId": 3,
              "name": "./bRandomFileForImport",
              "resolution": {
                "resolutionId": 3,
                "resolvedModule": "./bRandomFileForImport.ts"
              }
            }
          ]
        }
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
          "original": {
            "resolvedModule": 2
          },
          "resolutionId": 1,
          "resolvedModule": "./node_modules/pkg0/index.d.ts"
        },
        {
          "original": {
            "resolvedModule": 10
          },
          "resolutionId": 2,
          "resolvedModule": "./aRandomFileForImport.ts"
        },
        {
          "original": {
            "resolvedModule": 11
          },
          "resolutionId": 3,
          "resolvedModule": "./aRandomFileForImport2.ts"
        },
        {
          "original": {
            "resolvedModule": 12
          },
          "resolutionId": 4,
          "resolvedModule": "./aFileWithImports.ts"
        },
        {
          "original": {
            "resolvedModule": 13
          },
          "resolutionId": 5,
          "resolvedModule": "./bRandomFileForImport.ts"
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
        {
          "original": [
            1,
            1
          ],
          "resolutionEntryId": 1,
          "name": "pkg0",
          "resolution": {
            "resolutionId": 1,
            "resolvedModule": "./node_modules/pkg0/index.d.ts"
          }
        },
        {
          "original": [
            2,
            2
          ],
          "resolutionEntryId": 2,
          "name": "./aRandomFileForImport",
          "resolution": {
            "resolutionId": 2,
            "resolvedModule": "./aRandomFileForImport.ts"
          }
        },
        {
          "original": [
            3,
            3
          ],
          "resolutionEntryId": 3,
          "name": "./aRandomFileForImport2",
          "resolution": {
            "resolutionId": 3,
            "resolvedModule": "./aRandomFileForImport2.ts"
          }
        },
        {
          "original": [
            4,
            4
          ],
          "resolutionEntryId": 4,
          "name": "./aFileWithImports",
          "resolution": {
            "resolutionId": 4,
            "resolvedModule": "./aFileWithImports.ts"
          }
        },
        {
          "original": [
            5,
            5
          ],
          "resolutionEntryId": 5,
          "name": "./bRandomFileForImport",
          "resolution": {
            "resolutionId": 5,
            "resolvedModule": "./bRandomFileForImport.ts"
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
                "resolvedModule": "./node_modules/pkg0/index.d.ts"
              }
            },
            {
              "resolutionEntryId": 2,
              "name": "./aRandomFileForImport",
              "resolution": {
                "resolutionId": 2,
                "resolvedModule": "./aRandomFileForImport.ts"
              }
            },
            {
              "resolutionEntryId": 3,
              "name": "./aRandomFileForImport2",
              "resolution": {
                "resolutionId": 3,
                "resolvedModule": "./aRandomFileForImport2.ts"
              }
            },
            {
              "resolutionEntryId": 4,
              "name": "./aFileWithImports",
              "resolution": {
                "resolutionId": 4,
                "resolvedModule": "./aFileWithImports.ts"
              }
            },
            {
              "resolutionEntryId": 5,
              "name": "./bRandomFileForImport",
              "resolution": {
                "resolutionId": 5,
                "resolvedModule": "./bRandomFileForImport.ts"
              }
            }
          ]
        }
      ]
    }
  },
  "version": "FakeTSVersion"
}
Incremental signature is neither dts signature nor file version from clean for File:: ./arandomfileforimport.d.ts
Incremental:: {
  "version": "-21475588774-export type { ImportInterface0 } from \"pkg0\";\r\nexport declare const x = 10;\r\n",
  "signature": "-21475588774-export type { ImportInterface0 } from \"pkg0\";\r\nexport declare const x = 10;\r\n"
}
Clean:: undefined
Dts Signature:: undefined
Incremental signature is neither dts signature nor file version from clean for File:: ./arandomfileforimport2.d.ts
Incremental:: {
  "version": "-6057683066-export declare const x = 10;\r\n",
  "signature": "-6057683066-export declare const x = 10;\r\n"
}
Clean:: undefined
Dts Signature:: undefined
Incremental signature is neither dts signature nor file version from clean for File:: ./afilewithimports.d.ts
Incremental:: {
  "version": "-8692926703-export { x } from \"./aRandomFileForImport\";\r\nexport { x as x2 } from \"./aRandomFileForImport2\";\r\nexport declare const y = 10;\r\n",
  "signature": "-8692926703-export { x } from \"./aRandomFileForImport\";\r\nexport { x as x2 } from \"./aRandomFileForImport2\";\r\nexport declare const y = 10;\r\n"
}
Clean:: undefined
Dts Signature:: undefined
Incremental Reference set is neither from dts nor files reference map for File:: ./bfilewithimports.ts::
Incremental:: [
  "./afilewithimports.d.ts",
  "./brandomfileforimport.ts"
]
Clean:: [
  "./brandomfileforimport.ts"
]
DtsExportsMap:: [
  "./brandomfileforimport.ts"
]
Incremental Reference set is neither from dts nor files reference map for File:: ./afilewithimports.d.ts::
Incremental:: [
  "./arandomfileforimport.d.ts",
  "./arandomfileforimport2.d.ts"
]
Clean:: undefined
DtsExportsMap:: undefined
Incremental Reference set is neither from dts nor files reference map for File:: ./arandomfileforimport.d.ts::
Incremental:: [
  "./node_modules/pkg0/index.d.ts"
]
Clean:: undefined
DtsExportsMap:: undefined
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
          "original": {
            "resolvedModule": 2
          },
          "resolutionId": 1,
          "resolvedModule": "./node_modules/pkg0/index.d.ts"
        },
        {
          "original": {
            "resolvedModule": 7
          },
          "resolutionId": 2,
          "resolvedModule": "./aFileWithImports.ts"
        },
        {
          "original": {
            "resolvedModule": 8
          },
          "resolutionId": 3,
          "resolvedModule": "./bRandomFileForImport.ts"
        }
      ],
      "names": [
        "pkg0",
        "./aFileWithImports",
        "./bRandomFileForImport"
      ],
      "resolutionEntries": [
        {
          "original": [
            1,
            1
          ],
          "resolutionEntryId": 1,
          "name": "pkg0",
          "resolution": {
            "resolutionId": 1,
            "resolvedModule": "./node_modules/pkg0/index.d.ts"
          }
        },
        {
          "original": [
            2,
            2
          ],
          "resolutionEntryId": 2,
          "name": "./aFileWithImports",
          "resolution": {
            "resolutionId": 2,
            "resolvedModule": "./aFileWithImports.ts"
          }
        },
        {
          "original": [
            3,
            3
          ],
          "resolutionEntryId": 3,
          "name": "./bRandomFileForImport",
          "resolution": {
            "resolutionId": 3,
            "resolvedModule": "./bRandomFileForImport.ts"
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
                "resolvedModule": "./node_modules/pkg0/index.d.ts"
              }
            },
            {
              "resolutionEntryId": 2,
              "name": "./aFileWithImports",
              "resolution": {
                "resolutionId": 2,
                "resolvedModule": "./aFileWithImports.ts"
              }
            },
            {
              "resolutionEntryId": 3,
              "name": "./bRandomFileForImport",
              "resolution": {
                "resolutionId": 3,
                "resolvedModule": "./bRandomFileForImport.ts"
              }
            }
          ]
        }
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
          "original": {
            "resolvedModule": 2
          },
          "resolutionId": 1,
          "resolvedModule": "./node_modules/pkg0/index.d.ts"
        },
        {
          "original": {
            "resolvedModule": 10
          },
          "resolutionId": 2,
          "resolvedModule": "./aRandomFileForImport.ts"
        },
        {
          "original": {
            "resolvedModule": 11
          },
          "resolutionId": 3,
          "resolvedModule": "./aRandomFileForImport2.ts"
        },
        {
          "original": {
            "resolvedModule": 12
          },
          "resolutionId": 4,
          "resolvedModule": "./aFileWithImports.ts"
        },
        {
          "original": {
            "resolvedModule": 13
          },
          "resolutionId": 5,
          "resolvedModule": "./bRandomFileForImport.ts"
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
        {
          "original": [
            1,
            1
          ],
          "resolutionEntryId": 1,
          "name": "pkg0",
          "resolution": {
            "resolutionId": 1,
            "resolvedModule": "./node_modules/pkg0/index.d.ts"
          }
        },
        {
          "original": [
            2,
            2
          ],
          "resolutionEntryId": 2,
          "name": "./aRandomFileForImport",
          "resolution": {
            "resolutionId": 2,
            "resolvedModule": "./aRandomFileForImport.ts"
          }
        },
        {
          "original": [
            3,
            3
          ],
          "resolutionEntryId": 3,
          "name": "./aRandomFileForImport2",
          "resolution": {
            "resolutionId": 3,
            "resolvedModule": "./aRandomFileForImport2.ts"
          }
        },
        {
          "original": [
            4,
            4
          ],
          "resolutionEntryId": 4,
          "name": "./aFileWithImports",
          "resolution": {
            "resolutionId": 4,
            "resolvedModule": "./aFileWithImports.ts"
          }
        },
        {
          "original": [
            5,
            5
          ],
          "resolutionEntryId": 5,
          "name": "./bRandomFileForImport",
          "resolution": {
            "resolutionId": 5,
            "resolvedModule": "./bRandomFileForImport.ts"
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
                "resolvedModule": "./node_modules/pkg0/index.d.ts"
              }
            },
            {
              "resolutionEntryId": 2,
              "name": "./aRandomFileForImport",
              "resolution": {
                "resolutionId": 2,
                "resolvedModule": "./aRandomFileForImport.ts"
              }
            },
            {
              "resolutionEntryId": 3,
              "name": "./aRandomFileForImport2",
              "resolution": {
                "resolutionId": 3,
                "resolvedModule": "./aRandomFileForImport2.ts"
              }
            },
            {
              "resolutionEntryId": 4,
              "name": "./aFileWithImports",
              "resolution": {
                "resolutionId": 4,
                "resolvedModule": "./aFileWithImports.ts"
              }
            },
            {
              "resolutionEntryId": 5,
              "name": "./bRandomFileForImport",
              "resolution": {
                "resolutionId": 5,
                "resolvedModule": "./bRandomFileForImport.ts"
              }
            }
          ]
        }
      ]
    }
  },
  "version": "FakeTSVersion"
}
Incremental signature is neither dts signature nor file version from clean for File:: ./arandomfileforimport.d.ts
Incremental:: {
  "version": "-21475588774-export type { ImportInterface0 } from \"pkg0\";\r\nexport declare const x = 10;\r\n",
  "signature": "-21475588774-export type { ImportInterface0 } from \"pkg0\";\r\nexport declare const x = 10;\r\n"
}
Clean:: undefined
Dts Signature:: undefined
Incremental signature is neither dts signature nor file version from clean for File:: ./arandomfileforimport2.d.ts
Incremental:: {
  "version": "-6057683066-export declare const x = 10;\r\n",
  "signature": "-6057683066-export declare const x = 10;\r\n"
}
Clean:: undefined
Dts Signature:: undefined
Incremental signature is neither dts signature nor file version from clean for File:: ./afilewithimports.d.ts
Incremental:: {
  "version": "-8692926703-export { x } from \"./aRandomFileForImport\";\r\nexport { x as x2 } from \"./aRandomFileForImport2\";\r\nexport declare const y = 10;\r\n",
  "signature": "-8692926703-export { x } from \"./aRandomFileForImport\";\r\nexport { x as x2 } from \"./aRandomFileForImport2\";\r\nexport declare const y = 10;\r\n"
}
Clean:: undefined
Dts Signature:: undefined
Incremental Reference set is neither from dts nor files reference map for File:: ./bfilewithimports.ts::
Incremental:: [
  "./afilewithimports.d.ts",
  "./brandomfileforimport.ts"
]
Clean:: [
  "./brandomfileforimport.ts"
]
DtsExportsMap:: [
  "./brandomfileforimport.ts"
]
Incremental Reference set is neither from dts nor files reference map for File:: ./afilewithimports.d.ts::
Incremental:: [
  "./arandomfileforimport.d.ts",
  "./arandomfileforimport2.d.ts"
]
Clean:: undefined
DtsExportsMap:: undefined
Incremental Reference set is neither from dts nor files reference map for File:: ./arandomfileforimport.d.ts::
Incremental:: [
  "./node_modules/pkg0/index.d.ts"
]
Clean:: undefined
DtsExportsMap:: undefined
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
          "original": {
            "resolvedModule": 7
          },
          "resolutionId": 1,
          "resolvedModule": "./bFileWithImports.ts"
        },
        {
          "original": {
            "resolvedModule": 2
          },
          "resolutionId": 2,
          "resolvedModule": "./pkg0.d.ts"
        }
      ],
      "names": [
        "./bFileWithImports",
        "pkg0"
      ],
      "resolutionEntries": [
        {
          "original": [
            1,
            1
          ],
          "resolutionEntryId": 1,
          "name": "./bFileWithImports",
          "resolution": {
            "resolutionId": 1,
            "resolvedModule": "./bFileWithImports.ts"
          }
        },
        {
          "original": [
            2,
            2
          ],
          "resolutionEntryId": 2,
          "name": "pkg0",
          "resolution": {
            "resolutionId": 2,
            "resolvedModule": "./pkg0.d.ts"
          }
        }
      ],
      "modules": [
        {
          "dir": "./",
          "resolutions": [
            {
              "resolutionEntryId": 1,
              "name": "./bFileWithImports",
              "resolution": {
                "resolutionId": 1,
                "resolvedModule": "./bFileWithImports.ts"
              }
            },
            {
              "resolutionEntryId": 2,
              "name": "pkg0",
              "resolution": {
                "resolutionId": 2,
                "resolvedModule": "./pkg0.d.ts"
              }
            }
          ]
        }
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
          "original": {
            "resolvedModule": 13
          },
          "resolutionId": 1,
          "resolvedModule": "./bFileWithImports.ts"
        },
        {
          "original": {
            "resolvedModule": 8
          },
          "resolutionId": 2,
          "resolvedModule": "./pkg0.d.ts"
        },
        {
          "original": {
            "resolvedModule": 2
          },
          "resolutionId": 3,
          "resolvedModule": "./node_modules/pkg0/index.d.ts"
        },
        {
          "original": {
            "resolvedModule": 14
          },
          "resolutionId": 4,
          "resolvedModule": "./aRandomFileForImport.ts"
        },
        {
          "original": {
            "resolvedModule": 15
          },
          "resolutionId": 5,
          "resolvedModule": "./aRandomFileForImport2.ts"
        },
        {
          "original": {
            "resolvedModule": 16
          },
          "resolutionId": 6,
          "resolvedModule": "./aFileWithImports.ts"
        },
        {
          "original": {
            "resolvedModule": 17
          },
          "resolutionId": 7,
          "resolvedModule": "./bRandomFileForImport.ts"
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
        {
          "original": [
            1,
            1
          ],
          "resolutionEntryId": 1,
          "name": "./bFileWithImports",
          "resolution": {
            "resolutionId": 1,
            "resolvedModule": "./bFileWithImports.ts"
          }
        },
        {
          "original": [
            2,
            2
          ],
          "resolutionEntryId": 2,
          "name": "pkg0",
          "resolution": {
            "resolutionId": 2,
            "resolvedModule": "./pkg0.d.ts"
          }
        },
        {
          "original": [
            2,
            3
          ],
          "resolutionEntryId": 3,
          "name": "pkg0",
          "resolution": {
            "resolutionId": 3,
            "resolvedModule": "./node_modules/pkg0/index.d.ts"
          }
        },
        {
          "original": [
            3,
            4
          ],
          "resolutionEntryId": 4,
          "name": "./aRandomFileForImport",
          "resolution": {
            "resolutionId": 4,
            "resolvedModule": "./aRandomFileForImport.ts"
          }
        },
        {
          "original": [
            4,
            5
          ],
          "resolutionEntryId": 5,
          "name": "./aRandomFileForImport2",
          "resolution": {
            "resolutionId": 5,
            "resolvedModule": "./aRandomFileForImport2.ts"
          }
        },
        {
          "original": [
            5,
            6
          ],
          "resolutionEntryId": 6,
          "name": "./aFileWithImports",
          "resolution": {
            "resolutionId": 6,
            "resolvedModule": "./aFileWithImports.ts"
          }
        },
        {
          "original": [
            6,
            7
          ],
          "resolutionEntryId": 7,
          "name": "./bRandomFileForImport",
          "resolution": {
            "resolutionId": 7,
            "resolvedModule": "./bRandomFileForImport.ts"
          }
        }
      ],
      "modules": {
        "own": [
          {
            "dir": "./",
            "resolutions": [
              {
                "resolutionEntryId": 1,
                "name": "./bFileWithImports",
                "resolution": {
                  "resolutionId": 1,
                  "resolvedModule": "./bFileWithImports.ts"
                }
              },
              {
                "resolutionEntryId": 2,
                "name": "pkg0",
                "resolution": {
                  "resolutionId": 2,
                  "resolvedModule": "./pkg0.d.ts"
                }
              }
            ]
          }
        ],
        "redirects": [
          {
            "options": {
              "cacheResolutions": true
            },
            "cache": [
              {
                "dir": "./",
                "resolutions": [
                  {
                    "resolutionEntryId": 3,
                    "name": "pkg0",
                    "resolution": {
                      "resolutionId": 3,
                      "resolvedModule": "./node_modules/pkg0/index.d.ts"
                    }
                  },
                  {
                    "resolutionEntryId": 4,
                    "name": "./aRandomFileForImport",
                    "resolution": {
                      "resolutionId": 4,
                      "resolvedModule": "./aRandomFileForImport.ts"
                    }
                  },
                  {
                    "resolutionEntryId": 5,
                    "name": "./aRandomFileForImport2",
                    "resolution": {
                      "resolutionId": 5,
                      "resolvedModule": "./aRandomFileForImport2.ts"
                    }
                  },
                  {
                    "resolutionEntryId": 6,
                    "name": "./aFileWithImports",
                    "resolution": {
                      "resolutionId": 6,
                      "resolvedModule": "./aFileWithImports.ts"
                    }
                  },
                  {
                    "resolutionEntryId": 7,
                    "name": "./bRandomFileForImport",
                    "resolution": {
                      "resolutionId": 7,
                      "resolvedModule": "./bRandomFileForImport.ts"
                    }
                  }
                ]
              }
            ]
          }
        ]
      }
    }
  },
  "version": "FakeTSVersion"
}
Incremental signature is neither dts signature nor file version from clean for File:: ./node_modules/pkg0/index.d.ts
Incremental:: {
  "version": "769951468-export interface ImportInterface0 {}",
  "signature": "769951468-export interface ImportInterface0 {}"
}
Clean:: undefined
Dts Signature:: undefined
Incremental signature is neither dts signature nor file version from clean for File:: ./arandomfileforimport.d.ts
Incremental:: {
  "version": "-21475588774-export type { ImportInterface0 } from \"pkg0\";\r\nexport declare const x = 10;\r\n",
  "signature": "-21475588774-export type { ImportInterface0 } from \"pkg0\";\r\nexport declare const x = 10;\r\n"
}
Clean:: undefined
Dts Signature:: undefined
Incremental signature is neither dts signature nor file version from clean for File:: ./arandomfileforimport2.d.ts
Incremental:: {
  "version": "-6057683066-export declare const x = 10;\r\n",
  "signature": "-6057683066-export declare const x = 10;\r\n"
}
Clean:: undefined
Dts Signature:: undefined
Incremental signature is neither dts signature nor file version from clean for File:: ./afilewithimports.d.ts
Incremental:: {
  "version": "-8692926703-export { x } from \"./aRandomFileForImport\";\r\nexport { x as x2 } from \"./aRandomFileForImport2\";\r\nexport declare const y = 10;\r\n",
  "signature": "-8692926703-export { x } from \"./aRandomFileForImport\";\r\nexport { x as x2 } from \"./aRandomFileForImport2\";\r\nexport declare const y = 10;\r\n"
}
Clean:: undefined
Dts Signature:: undefined
Incremental signature is neither dts signature nor file version from clean for File:: ./brandomfileforimport.d.ts
Incremental:: {
  "version": "-21475588774-export type { ImportInterface0 } from \"pkg0\";\r\nexport declare const x = 10;\r\n",
  "signature": "-21475588774-export type { ImportInterface0 } from \"pkg0\";\r\nexport declare const x = 10;\r\n"
}
Clean:: undefined
Dts Signature:: undefined
Incremental signature is neither dts signature nor file version from clean for File:: ./bfilewithimports.d.ts
Incremental:: {
  "version": "5371975240-export { y } from \"./aFileWithImports\";\r\nexport { x } from \"./bRandomFileForImport\";\r\n",
  "signature": "5371975240-export { y } from \"./aFileWithImports\";\r\nexport { x } from \"./bRandomFileForImport\";\r\n"
}
Clean:: undefined
Dts Signature:: undefined
Incremental Reference set is neither from dts nor files reference map for File:: ./afilewithimports.d.ts::
Incremental:: [
  "./arandomfileforimport.d.ts",
  "./arandomfileforimport2.d.ts"
]
Clean:: undefined
DtsExportsMap:: undefined
Incremental Reference set is neither from dts nor files reference map for File:: ./arandomfileforimport.d.ts::
Incremental:: [
  "./node_modules/pkg0/index.d.ts"
]
Clean:: undefined
DtsExportsMap:: undefined
Incremental Reference set is neither from dts nor files reference map for File:: ./bfilewithimports.d.ts::
Incremental:: [
  "./afilewithimports.d.ts",
  "./brandomfileforimport.d.ts"
]
Clean:: undefined
DtsExportsMap:: undefined
Incremental Reference set is neither from dts nor files reference map for File:: ./brandomfileforimport.d.ts::
Incremental:: [
  "./node_modules/pkg0/index.d.ts"
]
Clean:: undefined
DtsExportsMap:: undefined
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
          "original": {
            "resolvedModule": 7
          },
          "resolutionId": 1,
          "resolvedModule": "./bFileWithImports.ts"
        },
        {
          "original": {
            "resolvedModule": 2
          },
          "resolutionId": 2,
          "resolvedModule": "./pkg0.d.ts"
        }
      ],
      "names": [
        "./bFileWithImports",
        "pkg0"
      ],
      "resolutionEntries": [
        {
          "original": [
            1,
            1
          ],
          "resolutionEntryId": 1,
          "name": "./bFileWithImports",
          "resolution": {
            "resolutionId": 1,
            "resolvedModule": "./bFileWithImports.ts"
          }
        },
        {
          "original": [
            2,
            2
          ],
          "resolutionEntryId": 2,
          "name": "pkg0",
          "resolution": {
            "resolutionId": 2,
            "resolvedModule": "./pkg0.d.ts"
          }
        }
      ],
      "modules": [
        {
          "dir": "./",
          "resolutions": [
            {
              "resolutionEntryId": 1,
              "name": "./bFileWithImports",
              "resolution": {
                "resolutionId": 1,
                "resolvedModule": "./bFileWithImports.ts"
              }
            },
            {
              "resolutionEntryId": 2,
              "name": "pkg0",
              "resolution": {
                "resolutionId": 2,
                "resolvedModule": "./pkg0.d.ts"
              }
            }
          ]
        }
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
          "original": {
            "resolvedModule": 13
          },
          "resolutionId": 1,
          "resolvedModule": "./bFileWithImports.ts"
        },
        {
          "original": {
            "resolvedModule": 8
          },
          "resolutionId": 2,
          "resolvedModule": "./pkg0.d.ts"
        },
        {
          "original": {
            "resolvedModule": 2
          },
          "resolutionId": 3,
          "resolvedModule": "./node_modules/pkg0/index.d.ts"
        },
        {
          "original": {
            "resolvedModule": 14
          },
          "resolutionId": 4,
          "resolvedModule": "./aRandomFileForImport.ts"
        },
        {
          "original": {
            "resolvedModule": 15
          },
          "resolutionId": 5,
          "resolvedModule": "./aRandomFileForImport2.ts"
        },
        {
          "original": {
            "resolvedModule": 16
          },
          "resolutionId": 6,
          "resolvedModule": "./aFileWithImports.ts"
        },
        {
          "original": {
            "resolvedModule": 17
          },
          "resolutionId": 7,
          "resolvedModule": "./bRandomFileForImport.ts"
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
        {
          "original": [
            1,
            1
          ],
          "resolutionEntryId": 1,
          "name": "./bFileWithImports",
          "resolution": {
            "resolutionId": 1,
            "resolvedModule": "./bFileWithImports.ts"
          }
        },
        {
          "original": [
            2,
            2
          ],
          "resolutionEntryId": 2,
          "name": "pkg0",
          "resolution": {
            "resolutionId": 2,
            "resolvedModule": "./pkg0.d.ts"
          }
        },
        {
          "original": [
            2,
            3
          ],
          "resolutionEntryId": 3,
          "name": "pkg0",
          "resolution": {
            "resolutionId": 3,
            "resolvedModule": "./node_modules/pkg0/index.d.ts"
          }
        },
        {
          "original": [
            3,
            4
          ],
          "resolutionEntryId": 4,
          "name": "./aRandomFileForImport",
          "resolution": {
            "resolutionId": 4,
            "resolvedModule": "./aRandomFileForImport.ts"
          }
        },
        {
          "original": [
            4,
            5
          ],
          "resolutionEntryId": 5,
          "name": "./aRandomFileForImport2",
          "resolution": {
            "resolutionId": 5,
            "resolvedModule": "./aRandomFileForImport2.ts"
          }
        },
        {
          "original": [
            5,
            6
          ],
          "resolutionEntryId": 6,
          "name": "./aFileWithImports",
          "resolution": {
            "resolutionId": 6,
            "resolvedModule": "./aFileWithImports.ts"
          }
        },
        {
          "original": [
            6,
            7
          ],
          "resolutionEntryId": 7,
          "name": "./bRandomFileForImport",
          "resolution": {
            "resolutionId": 7,
            "resolvedModule": "./bRandomFileForImport.ts"
          }
        }
      ],
      "modules": {
        "own": [
          {
            "dir": "./",
            "resolutions": [
              {
                "resolutionEntryId": 1,
                "name": "./bFileWithImports",
                "resolution": {
                  "resolutionId": 1,
                  "resolvedModule": "./bFileWithImports.ts"
                }
              },
              {
                "resolutionEntryId": 2,
                "name": "pkg0",
                "resolution": {
                  "resolutionId": 2,
                  "resolvedModule": "./pkg0.d.ts"
                }
              }
            ]
          }
        ],
        "redirects": [
          {
            "options": {
              "cacheResolutions": true
            },
            "cache": [
              {
                "dir": "./",
                "resolutions": [
                  {
                    "resolutionEntryId": 3,
                    "name": "pkg0",
                    "resolution": {
                      "resolutionId": 3,
                      "resolvedModule": "./node_modules/pkg0/index.d.ts"
                    }
                  },
                  {
                    "resolutionEntryId": 4,
                    "name": "./aRandomFileForImport",
                    "resolution": {
                      "resolutionId": 4,
                      "resolvedModule": "./aRandomFileForImport.ts"
                    }
                  },
                  {
                    "resolutionEntryId": 5,
                    "name": "./aRandomFileForImport2",
                    "resolution": {
                      "resolutionId": 5,
                      "resolvedModule": "./aRandomFileForImport2.ts"
                    }
                  },
                  {
                    "resolutionEntryId": 6,
                    "name": "./aFileWithImports",
                    "resolution": {
                      "resolutionId": 6,
                      "resolvedModule": "./aFileWithImports.ts"
                    }
                  },
                  {
                    "resolutionEntryId": 7,
                    "name": "./bRandomFileForImport",
                    "resolution": {
                      "resolutionId": 7,
                      "resolvedModule": "./bRandomFileForImport.ts"
                    }
                  }
                ]
              }
            ]
          }
        ]
      }
    }
  },
  "version": "FakeTSVersion"
}
Incremental signature is neither dts signature nor file version from clean for File:: ./node_modules/pkg0/index.d.ts
Incremental:: {
  "version": "769951468-export interface ImportInterface0 {}",
  "signature": "769951468-export interface ImportInterface0 {}"
}
Clean:: undefined
Dts Signature:: undefined
Incremental signature is neither dts signature nor file version from clean for File:: ./arandomfileforimport.d.ts
Incremental:: {
  "version": "-21475588774-export type { ImportInterface0 } from \"pkg0\";\r\nexport declare const x = 10;\r\n",
  "signature": "-21475588774-export type { ImportInterface0 } from \"pkg0\";\r\nexport declare const x = 10;\r\n"
}
Clean:: undefined
Dts Signature:: undefined
Incremental signature is neither dts signature nor file version from clean for File:: ./arandomfileforimport2.d.ts
Incremental:: {
  "version": "-6057683066-export declare const x = 10;\r\n",
  "signature": "-6057683066-export declare const x = 10;\r\n"
}
Clean:: undefined
Dts Signature:: undefined
Incremental signature is neither dts signature nor file version from clean for File:: ./afilewithimports.d.ts
Incremental:: {
  "version": "-8692926703-export { x } from \"./aRandomFileForImport\";\r\nexport { x as x2 } from \"./aRandomFileForImport2\";\r\nexport declare const y = 10;\r\n",
  "signature": "-8692926703-export { x } from \"./aRandomFileForImport\";\r\nexport { x as x2 } from \"./aRandomFileForImport2\";\r\nexport declare const y = 10;\r\n"
}
Clean:: undefined
Dts Signature:: undefined
Incremental signature is neither dts signature nor file version from clean for File:: ./brandomfileforimport.d.ts
Incremental:: {
  "version": "-21475588774-export type { ImportInterface0 } from \"pkg0\";\r\nexport declare const x = 10;\r\n",
  "signature": "-21475588774-export type { ImportInterface0 } from \"pkg0\";\r\nexport declare const x = 10;\r\n"
}
Clean:: undefined
Dts Signature:: undefined
Incremental signature is neither dts signature nor file version from clean for File:: ./bfilewithimports.d.ts
Incremental:: {
  "version": "5371975240-export { y } from \"./aFileWithImports\";\r\nexport { x } from \"./bRandomFileForImport\";\r\n",
  "signature": "5371975240-export { y } from \"./aFileWithImports\";\r\nexport { x } from \"./bRandomFileForImport\";\r\n"
}
Clean:: undefined
Dts Signature:: undefined
Incremental Reference set is neither from dts nor files reference map for File:: ./afilewithimports.d.ts::
Incremental:: [
  "./arandomfileforimport.d.ts",
  "./arandomfileforimport2.d.ts"
]
Clean:: undefined
DtsExportsMap:: undefined
Incremental Reference set is neither from dts nor files reference map for File:: ./arandomfileforimport.d.ts::
Incremental:: [
  "./node_modules/pkg0/index.d.ts"
]
Clean:: undefined
DtsExportsMap:: undefined
Incremental Reference set is neither from dts nor files reference map for File:: ./bfilewithimports.d.ts::
Incremental:: [
  "./afilewithimports.d.ts",
  "./brandomfileforimport.d.ts"
]
Clean:: undefined
DtsExportsMap:: undefined
Incremental Reference set is neither from dts nor files reference map for File:: ./brandomfileforimport.d.ts::
Incremental:: [
  "./node_modules/pkg0/index.d.ts"
]
Clean:: undefined
DtsExportsMap:: undefined