0:: delete the node10Result in @types
*** Needs explanation
TsBuild info text without affectedFilesPendingEmit:: /home/src/projects/project/tsconfig.tsbuildinfo.readable.baseline.txt::
CleanBuild:
{
  "program": {
    "fileInfos": {
      "../../../../lib/lib.d.ts": {
        "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "affectsGlobalScope": true,
        "impliedFormat": "commonjs"
      },
      "./node_modules/foo2/index.d.ts": {
        "version": "-1622383150-export declare const foo2: number;",
        "impliedFormat": "commonjs"
      },
      "./node_modules/@types/bar2/index.d.ts": {
        "version": "-7439170493-export declare const bar2: number;",
        "impliedFormat": "commonjs"
      },
      "./index.mts": {
        "version": "-4806968175-import { foo } from \"foo\";\nimport { bar } from \"bar\";\nimport { foo2 } from \"foo2\";\nimport { bar2 } from \"bar2\";\n",
        "impliedFormat": "esnext"
      }
    },
    "root": [
      [
        4,
        "./index.mts"
      ]
    ],
    "options": {
      "strict": true
    },
    "referencedMap": {
      "./index.mts": [
        "./node_modules/foo2/index.d.ts",
        "./node_modules/@types/bar2/index.d.ts"
      ]
    },
    "semanticDiagnosticsPerFile": [
      [
        "./index.mts",
        [
          {
            "file": "./index.mts",
            "start": 20,
            "length": 5,
            "code": 7016,
            "category": 1,
            "messageText": {
              "messageText": "Could not find a declaration file for module 'foo'. '/home/src/projects/project/node_modules/foo/index.mjs' implicitly has an 'any' type.",
              "category": 1,
              "code": 7016,
              "next": [
                {
                  "messageText": "There are types at '/home/src/projects/project/node_modules/foo/index.d.ts', but this result could not be resolved when respecting package.json \"exports\". The 'foo' library may need to update its package.json or typings.",
                  "category": 3,
                  "code": 6278
                }
              ]
            }
          },
          {
            "file": "./index.mts",
            "start": 47,
            "length": 5,
            "code": 7016,
            "category": 1,
            "messageText": {
              "messageText": "Could not find a declaration file for module 'bar'. '/home/src/projects/project/node_modules/bar/index.mjs' implicitly has an 'any' type.",
              "category": 1,
              "code": 7016,
              "next": [
                {
                  "messageText": "Try `npm i --save-dev @types/bar` if it exists or add a new declaration (.d.ts) file containing `declare module 'bar';`",
                  "category": 1,
                  "code": 7035
                }
              ]
            }
          }
        ]
      ],
      "./node_modules/@types/bar2/index.d.ts",
      "./node_modules/foo2/index.d.ts",
      "../../../../lib/lib.d.ts"
    ]
  },
  "version": "FakeTSVersion"
}
IncrementalBuild:
{
  "program": {
    "fileInfos": {
      "../../../../lib/lib.d.ts": {
        "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "affectsGlobalScope": true,
        "impliedFormat": "commonjs"
      },
      "./node_modules/foo2/index.d.ts": {
        "version": "-1622383150-export declare const foo2: number;",
        "impliedFormat": "commonjs"
      },
      "./node_modules/@types/bar2/index.d.ts": {
        "version": "-7439170493-export declare const bar2: number;",
        "impliedFormat": "commonjs"
      },
      "./index.mts": {
        "version": "-4806968175-import { foo } from \"foo\";\nimport { bar } from \"bar\";\nimport { foo2 } from \"foo2\";\nimport { bar2 } from \"bar2\";\n",
        "impliedFormat": "esnext"
      }
    },
    "root": [
      [
        4,
        "./index.mts"
      ]
    ],
    "options": {
      "strict": true
    },
    "referencedMap": {
      "./index.mts": [
        "./node_modules/foo2/index.d.ts",
        "./node_modules/@types/bar2/index.d.ts"
      ]
    },
    "semanticDiagnosticsPerFile": [
      [
        "./index.mts",
        [
          {
            "file": "./index.mts",
            "start": 20,
            "length": 5,
            "code": 7016,
            "category": 1,
            "messageText": {
              "messageText": "Could not find a declaration file for module 'foo'. '/home/src/projects/project/node_modules/foo/index.mjs' implicitly has an 'any' type.",
              "category": 1,
              "code": 7016,
              "next": [
                {
                  "messageText": "There are types at '/home/src/projects/project/node_modules/foo/index.d.ts', but this result could not be resolved when respecting package.json \"exports\". The 'foo' library may need to update its package.json or typings.",
                  "category": 3,
                  "code": 6278
                }
              ]
            }
          },
          {
            "file": "./index.mts",
            "start": 47,
            "length": 5,
            "code": 7016,
            "category": 1,
            "messageText": {
              "messageText": "Could not find a declaration file for module 'bar'. '/home/src/projects/project/node_modules/bar/index.mjs' implicitly has an 'any' type.",
              "category": 1,
              "code": 7016,
              "next": [
                {
                  "messageText": "There are types at '/home/src/projects/project/node_modules/@types/bar/index.d.ts', but this result could not be resolved when respecting package.json \"exports\". The '@types/bar' library may need to update its package.json or typings.",
                  "category": 3,
                  "code": 6278
                }
              ]
            }
          }
        ]
      ],
      "./node_modules/@types/bar2/index.d.ts",
      "./node_modules/foo2/index.d.ts",
      "../../../../lib/lib.d.ts"
    ]
  },
  "version": "FakeTSVersion"
}
1:: delete the ndoe10Result in package/types
*** Needs explanation
TsBuild info text without affectedFilesPendingEmit:: /home/src/projects/project/tsconfig.tsbuildinfo.readable.baseline.txt::
CleanBuild:
{
  "program": {
    "fileInfos": {
      "../../../../lib/lib.d.ts": {
        "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "affectsGlobalScope": true,
        "impliedFormat": "commonjs"
      },
      "./node_modules/foo2/index.d.ts": {
        "version": "-1622383150-export declare const foo2: number;",
        "impliedFormat": "commonjs"
      },
      "./node_modules/@types/bar2/index.d.ts": {
        "version": "-7439170493-export declare const bar2: number;",
        "impliedFormat": "commonjs"
      },
      "./index.mts": {
        "version": "-4806968175-import { foo } from \"foo\";\nimport { bar } from \"bar\";\nimport { foo2 } from \"foo2\";\nimport { bar2 } from \"bar2\";\n",
        "impliedFormat": "esnext"
      }
    },
    "root": [
      [
        4,
        "./index.mts"
      ]
    ],
    "options": {
      "strict": true
    },
    "referencedMap": {
      "./index.mts": [
        "./node_modules/foo2/index.d.ts",
        "./node_modules/@types/bar2/index.d.ts"
      ]
    },
    "semanticDiagnosticsPerFile": [
      [
        "./index.mts",
        [
          {
            "file": "./index.mts",
            "start": 20,
            "length": 5,
            "code": 7016,
            "category": 1,
            "messageText": {
              "messageText": "Could not find a declaration file for module 'foo'. '/home/src/projects/project/node_modules/foo/index.mjs' implicitly has an 'any' type.",
              "category": 1,
              "code": 7016,
              "next": [
                {
                  "messageText": "Try `npm i --save-dev @types/foo` if it exists or add a new declaration (.d.ts) file containing `declare module 'foo';`",
                  "category": 1,
                  "code": 7035
                }
              ]
            }
          },
          {
            "file": "./index.mts",
            "start": 47,
            "length": 5,
            "code": 7016,
            "category": 1,
            "messageText": {
              "messageText": "Could not find a declaration file for module 'bar'. '/home/src/projects/project/node_modules/bar/index.mjs' implicitly has an 'any' type.",
              "category": 1,
              "code": 7016,
              "next": [
                {
                  "messageText": "Try `npm i --save-dev @types/bar` if it exists or add a new declaration (.d.ts) file containing `declare module 'bar';`",
                  "category": 1,
                  "code": 7035
                }
              ]
            }
          }
        ]
      ],
      "./node_modules/@types/bar2/index.d.ts",
      "./node_modules/foo2/index.d.ts",
      "../../../../lib/lib.d.ts"
    ]
  },
  "version": "FakeTSVersion"
}
IncrementalBuild:
{
  "program": {
    "fileInfos": {
      "../../../../lib/lib.d.ts": {
        "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "affectsGlobalScope": true,
        "impliedFormat": "commonjs"
      },
      "./node_modules/foo2/index.d.ts": {
        "version": "-1622383150-export declare const foo2: number;",
        "impliedFormat": "commonjs"
      },
      "./node_modules/@types/bar2/index.d.ts": {
        "version": "-7439170493-export declare const bar2: number;",
        "impliedFormat": "commonjs"
      },
      "./index.mts": {
        "version": "-4806968175-import { foo } from \"foo\";\nimport { bar } from \"bar\";\nimport { foo2 } from \"foo2\";\nimport { bar2 } from \"bar2\";\n",
        "impliedFormat": "esnext"
      }
    },
    "root": [
      [
        4,
        "./index.mts"
      ]
    ],
    "options": {
      "strict": true
    },
    "referencedMap": {
      "./index.mts": [
        "./node_modules/foo2/index.d.ts",
        "./node_modules/@types/bar2/index.d.ts"
      ]
    },
    "semanticDiagnosticsPerFile": [
      [
        "./index.mts",
        [
          {
            "file": "./index.mts",
            "start": 20,
            "length": 5,
            "code": 7016,
            "category": 1,
            "messageText": {
              "messageText": "Could not find a declaration file for module 'foo'. '/home/src/projects/project/node_modules/foo/index.mjs' implicitly has an 'any' type.",
              "category": 1,
              "code": 7016,
              "next": [
                {
                  "messageText": "There are types at '/home/src/projects/project/node_modules/foo/index.d.ts', but this result could not be resolved when respecting package.json \"exports\". The 'foo' library may need to update its package.json or typings.",
                  "category": 3,
                  "code": 6278
                }
              ]
            }
          },
          {
            "file": "./index.mts",
            "start": 47,
            "length": 5,
            "code": 7016,
            "category": 1,
            "messageText": {
              "messageText": "Could not find a declaration file for module 'bar'. '/home/src/projects/project/node_modules/bar/index.mjs' implicitly has an 'any' type.",
              "category": 1,
              "code": 7016,
              "next": [
                {
                  "messageText": "There are types at '/home/src/projects/project/node_modules/@types/bar/index.d.ts', but this result could not be resolved when respecting package.json \"exports\". The '@types/bar' library may need to update its package.json or typings.",
                  "category": 3,
                  "code": 6278
                }
              ]
            }
          }
        ]
      ],
      "./node_modules/@types/bar2/index.d.ts",
      "./node_modules/foo2/index.d.ts",
      "../../../../lib/lib.d.ts"
    ]
  },
  "version": "FakeTSVersion"
}
2:: add the node10Result in @types
*** Needs explanation
TsBuild info text without affectedFilesPendingEmit:: /home/src/projects/project/tsconfig.tsbuildinfo.readable.baseline.txt::
CleanBuild:
{
  "program": {
    "fileInfos": {
      "../../../../lib/lib.d.ts": {
        "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "affectsGlobalScope": true,
        "impliedFormat": "commonjs"
      },
      "./node_modules/foo2/index.d.ts": {
        "version": "-1622383150-export declare const foo2: number;",
        "impliedFormat": "commonjs"
      },
      "./node_modules/@types/bar2/index.d.ts": {
        "version": "-7439170493-export declare const bar2: number;",
        "impliedFormat": "commonjs"
      },
      "./index.mts": {
        "version": "-4806968175-import { foo } from \"foo\";\nimport { bar } from \"bar\";\nimport { foo2 } from \"foo2\";\nimport { bar2 } from \"bar2\";\n",
        "impliedFormat": "esnext"
      }
    },
    "root": [
      [
        4,
        "./index.mts"
      ]
    ],
    "options": {
      "strict": true
    },
    "referencedMap": {
      "./index.mts": [
        "./node_modules/foo2/index.d.ts",
        "./node_modules/@types/bar2/index.d.ts"
      ]
    },
    "semanticDiagnosticsPerFile": [
      [
        "./index.mts",
        [
          {
            "file": "./index.mts",
            "start": 20,
            "length": 5,
            "code": 7016,
            "category": 1,
            "messageText": {
              "messageText": "Could not find a declaration file for module 'foo'. '/home/src/projects/project/node_modules/foo/index.mjs' implicitly has an 'any' type.",
              "category": 1,
              "code": 7016,
              "next": [
                {
                  "messageText": "Try `npm i --save-dev @types/foo` if it exists or add a new declaration (.d.ts) file containing `declare module 'foo';`",
                  "category": 1,
                  "code": 7035
                }
              ]
            }
          },
          {
            "file": "./index.mts",
            "start": 47,
            "length": 5,
            "code": 7016,
            "category": 1,
            "messageText": {
              "messageText": "Could not find a declaration file for module 'bar'. '/home/src/projects/project/node_modules/bar/index.mjs' implicitly has an 'any' type.",
              "category": 1,
              "code": 7016,
              "next": [
                {
                  "messageText": "There are types at '/home/src/projects/project/node_modules/@types/bar/index.d.ts', but this result could not be resolved when respecting package.json \"exports\". The '@types/bar' library may need to update its package.json or typings.",
                  "category": 3,
                  "code": 6278
                }
              ]
            }
          }
        ]
      ],
      "./node_modules/@types/bar2/index.d.ts",
      "./node_modules/foo2/index.d.ts",
      "../../../../lib/lib.d.ts"
    ]
  },
  "version": "FakeTSVersion"
}
IncrementalBuild:
{
  "program": {
    "fileInfos": {
      "../../../../lib/lib.d.ts": {
        "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "affectsGlobalScope": true,
        "impliedFormat": "commonjs"
      },
      "./node_modules/foo2/index.d.ts": {
        "version": "-1622383150-export declare const foo2: number;",
        "impliedFormat": "commonjs"
      },
      "./node_modules/@types/bar2/index.d.ts": {
        "version": "-7439170493-export declare const bar2: number;",
        "impliedFormat": "commonjs"
      },
      "./index.mts": {
        "version": "-4806968175-import { foo } from \"foo\";\nimport { bar } from \"bar\";\nimport { foo2 } from \"foo2\";\nimport { bar2 } from \"bar2\";\n",
        "impliedFormat": "esnext"
      }
    },
    "root": [
      [
        4,
        "./index.mts"
      ]
    ],
    "options": {
      "strict": true
    },
    "referencedMap": {
      "./index.mts": [
        "./node_modules/foo2/index.d.ts",
        "./node_modules/@types/bar2/index.d.ts"
      ]
    },
    "semanticDiagnosticsPerFile": [
      [
        "./index.mts",
        [
          {
            "file": "./index.mts",
            "start": 20,
            "length": 5,
            "code": 7016,
            "category": 1,
            "messageText": {
              "messageText": "Could not find a declaration file for module 'foo'. '/home/src/projects/project/node_modules/foo/index.mjs' implicitly has an 'any' type.",
              "category": 1,
              "code": 7016,
              "next": [
                {
                  "messageText": "There are types at '/home/src/projects/project/node_modules/foo/index.d.ts', but this result could not be resolved when respecting package.json \"exports\". The 'foo' library may need to update its package.json or typings.",
                  "category": 3,
                  "code": 6278
                }
              ]
            }
          },
          {
            "file": "./index.mts",
            "start": 47,
            "length": 5,
            "code": 7016,
            "category": 1,
            "messageText": {
              "messageText": "Could not find a declaration file for module 'bar'. '/home/src/projects/project/node_modules/bar/index.mjs' implicitly has an 'any' type.",
              "category": 1,
              "code": 7016,
              "next": [
                {
                  "messageText": "There are types at '/home/src/projects/project/node_modules/@types/bar/index.d.ts', but this result could not be resolved when respecting package.json \"exports\". The '@types/bar' library may need to update its package.json or typings.",
                  "category": 3,
                  "code": 6278
                }
              ]
            }
          }
        ]
      ],
      "./node_modules/@types/bar2/index.d.ts",
      "./node_modules/foo2/index.d.ts",
      "../../../../lib/lib.d.ts"
    ]
  },
  "version": "FakeTSVersion"
}
8:: delete the node10Result in @types
*** Needs explanation
TsBuild info text without affectedFilesPendingEmit:: /home/src/projects/project/tsconfig.tsbuildinfo.readable.baseline.txt::
CleanBuild:
{
  "program": {
    "fileInfos": {
      "../../../../lib/lib.d.ts": {
        "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "affectsGlobalScope": true,
        "impliedFormat": "commonjs"
      },
      "./node_modules/foo/index.d.ts": {
        "version": "-5214938848-export declare const foo: number;",
        "impliedFormat": "commonjs"
      },
      "./node_modules/@types/bar/index.d.ts": {
        "version": "-9556021903-export declare const bar: number;",
        "impliedFormat": "commonjs"
      },
      "./index.mts": {
        "version": "-4806968175-import { foo } from \"foo\";\nimport { bar } from \"bar\";\nimport { foo2 } from \"foo2\";\nimport { bar2 } from \"bar2\";\n",
        "impliedFormat": "esnext"
      }
    },
    "root": [
      [
        4,
        "./index.mts"
      ]
    ],
    "options": {
      "strict": true
    },
    "referencedMap": {
      "./index.mts": [
        "./node_modules/foo/index.d.ts",
        "./node_modules/@types/bar/index.d.ts"
      ]
    },
    "semanticDiagnosticsPerFile": [
      [
        "./index.mts",
        [
          {
            "file": "./index.mts",
            "start": 75,
            "length": 6,
            "code": 7016,
            "category": 1,
            "messageText": {
              "messageText": "Could not find a declaration file for module 'foo2'. '/home/src/projects/project/node_modules/foo2/index.mjs' implicitly has an 'any' type.",
              "category": 1,
              "code": 7016,
              "next": [
                {
                  "messageText": "There are types at '/home/src/projects/project/node_modules/foo2/index.d.ts', but this result could not be resolved when respecting package.json \"exports\". The 'foo2' library may need to update its package.json or typings.",
                  "category": 3,
                  "code": 6278
                }
              ]
            }
          },
          {
            "file": "./index.mts",
            "start": 104,
            "length": 6,
            "code": 7016,
            "category": 1,
            "messageText": {
              "messageText": "Could not find a declaration file for module 'bar2'. '/home/src/projects/project/node_modules/bar2/index.mjs' implicitly has an 'any' type.",
              "category": 1,
              "code": 7016,
              "next": [
                {
                  "messageText": "Try `npm i --save-dev @types/bar2` if it exists or add a new declaration (.d.ts) file containing `declare module 'bar2';`",
                  "category": 1,
                  "code": 7035
                }
              ]
            }
          }
        ]
      ],
      "./node_modules/@types/bar/index.d.ts",
      "./node_modules/foo/index.d.ts",
      "../../../../lib/lib.d.ts"
    ]
  },
  "version": "FakeTSVersion"
}
IncrementalBuild:
{
  "program": {
    "fileInfos": {
      "../../../../lib/lib.d.ts": {
        "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "affectsGlobalScope": true,
        "impliedFormat": "commonjs"
      },
      "./node_modules/foo/index.d.ts": {
        "version": "-5214938848-export declare const foo: number;",
        "impliedFormat": "commonjs"
      },
      "./node_modules/@types/bar/index.d.ts": {
        "version": "-9556021903-export declare const bar: number;",
        "impliedFormat": "commonjs"
      },
      "./index.mts": {
        "version": "-4806968175-import { foo } from \"foo\";\nimport { bar } from \"bar\";\nimport { foo2 } from \"foo2\";\nimport { bar2 } from \"bar2\";\n",
        "impliedFormat": "esnext"
      }
    },
    "root": [
      [
        4,
        "./index.mts"
      ]
    ],
    "options": {
      "strict": true
    },
    "referencedMap": {
      "./index.mts": [
        "./node_modules/foo/index.d.ts",
        "./node_modules/@types/bar/index.d.ts"
      ]
    },
    "semanticDiagnosticsPerFile": [
      [
        "./index.mts",
        [
          {
            "file": "./index.mts",
            "start": 75,
            "length": 6,
            "code": 7016,
            "category": 1,
            "messageText": {
              "messageText": "Could not find a declaration file for module 'foo2'. '/home/src/projects/project/node_modules/foo2/index.mjs' implicitly has an 'any' type.",
              "category": 1,
              "code": 7016,
              "next": [
                {
                  "messageText": "There are types at '/home/src/projects/project/node_modules/foo2/index.d.ts', but this result could not be resolved when respecting package.json \"exports\". The 'foo2' library may need to update its package.json or typings.",
                  "category": 3,
                  "code": 6278
                }
              ]
            }
          },
          {
            "file": "./index.mts",
            "start": 104,
            "length": 6,
            "code": 7016,
            "category": 1,
            "messageText": {
              "messageText": "Could not find a declaration file for module 'bar2'. '/home/src/projects/project/node_modules/bar2/index.mjs' implicitly has an 'any' type.",
              "category": 1,
              "code": 7016,
              "next": [
                {
                  "messageText": "There are types at '/home/src/projects/project/node_modules/@types/bar2/index.d.ts', but this result could not be resolved when respecting package.json \"exports\". The '@types/bar2' library may need to update its package.json or typings.",
                  "category": 3,
                  "code": 6278
                }
              ]
            }
          }
        ]
      ],
      "./node_modules/@types/bar/index.d.ts",
      "./node_modules/foo/index.d.ts",
      "../../../../lib/lib.d.ts"
    ]
  },
  "version": "FakeTSVersion"
}
9:: delete the ndoe10Result in package/types
*** Needs explanation
TsBuild info text without affectedFilesPendingEmit:: /home/src/projects/project/tsconfig.tsbuildinfo.readable.baseline.txt::
CleanBuild:
{
  "program": {
    "fileInfos": {
      "../../../../lib/lib.d.ts": {
        "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "affectsGlobalScope": true,
        "impliedFormat": "commonjs"
      },
      "./node_modules/foo/index.d.ts": {
        "version": "-5214938848-export declare const foo: number;",
        "impliedFormat": "commonjs"
      },
      "./node_modules/@types/bar/index.d.ts": {
        "version": "-9556021903-export declare const bar: number;",
        "impliedFormat": "commonjs"
      },
      "./index.mts": {
        "version": "-4806968175-import { foo } from \"foo\";\nimport { bar } from \"bar\";\nimport { foo2 } from \"foo2\";\nimport { bar2 } from \"bar2\";\n",
        "impliedFormat": "esnext"
      }
    },
    "root": [
      [
        4,
        "./index.mts"
      ]
    ],
    "options": {
      "strict": true
    },
    "referencedMap": {
      "./index.mts": [
        "./node_modules/foo/index.d.ts",
        "./node_modules/@types/bar/index.d.ts"
      ]
    },
    "semanticDiagnosticsPerFile": [
      [
        "./index.mts",
        [
          {
            "file": "./index.mts",
            "start": 75,
            "length": 6,
            "code": 7016,
            "category": 1,
            "messageText": {
              "messageText": "Could not find a declaration file for module 'foo2'. '/home/src/projects/project/node_modules/foo2/index.mjs' implicitly has an 'any' type.",
              "category": 1,
              "code": 7016,
              "next": [
                {
                  "messageText": "Try `npm i --save-dev @types/foo2` if it exists or add a new declaration (.d.ts) file containing `declare module 'foo2';`",
                  "category": 1,
                  "code": 7035
                }
              ]
            }
          },
          {
            "file": "./index.mts",
            "start": 104,
            "length": 6,
            "code": 7016,
            "category": 1,
            "messageText": {
              "messageText": "Could not find a declaration file for module 'bar2'. '/home/src/projects/project/node_modules/bar2/index.mjs' implicitly has an 'any' type.",
              "category": 1,
              "code": 7016,
              "next": [
                {
                  "messageText": "Try `npm i --save-dev @types/bar2` if it exists or add a new declaration (.d.ts) file containing `declare module 'bar2';`",
                  "category": 1,
                  "code": 7035
                }
              ]
            }
          }
        ]
      ],
      "./node_modules/@types/bar/index.d.ts",
      "./node_modules/foo/index.d.ts",
      "../../../../lib/lib.d.ts"
    ]
  },
  "version": "FakeTSVersion"
}
IncrementalBuild:
{
  "program": {
    "fileInfos": {
      "../../../../lib/lib.d.ts": {
        "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "affectsGlobalScope": true,
        "impliedFormat": "commonjs"
      },
      "./node_modules/foo/index.d.ts": {
        "version": "-5214938848-export declare const foo: number;",
        "impliedFormat": "commonjs"
      },
      "./node_modules/@types/bar/index.d.ts": {
        "version": "-9556021903-export declare const bar: number;",
        "impliedFormat": "commonjs"
      },
      "./index.mts": {
        "version": "-4806968175-import { foo } from \"foo\";\nimport { bar } from \"bar\";\nimport { foo2 } from \"foo2\";\nimport { bar2 } from \"bar2\";\n",
        "impliedFormat": "esnext"
      }
    },
    "root": [
      [
        4,
        "./index.mts"
      ]
    ],
    "options": {
      "strict": true
    },
    "referencedMap": {
      "./index.mts": [
        "./node_modules/foo/index.d.ts",
        "./node_modules/@types/bar/index.d.ts"
      ]
    },
    "semanticDiagnosticsPerFile": [
      [
        "./index.mts",
        [
          {
            "file": "./index.mts",
            "start": 75,
            "length": 6,
            "code": 7016,
            "category": 1,
            "messageText": {
              "messageText": "Could not find a declaration file for module 'foo2'. '/home/src/projects/project/node_modules/foo2/index.mjs' implicitly has an 'any' type.",
              "category": 1,
              "code": 7016,
              "next": [
                {
                  "messageText": "There are types at '/home/src/projects/project/node_modules/foo2/index.d.ts', but this result could not be resolved when respecting package.json \"exports\". The 'foo2' library may need to update its package.json or typings.",
                  "category": 3,
                  "code": 6278
                }
              ]
            }
          },
          {
            "file": "./index.mts",
            "start": 104,
            "length": 6,
            "code": 7016,
            "category": 1,
            "messageText": {
              "messageText": "Could not find a declaration file for module 'bar2'. '/home/src/projects/project/node_modules/bar2/index.mjs' implicitly has an 'any' type.",
              "category": 1,
              "code": 7016,
              "next": [
                {
                  "messageText": "There are types at '/home/src/projects/project/node_modules/@types/bar2/index.d.ts', but this result could not be resolved when respecting package.json \"exports\". The '@types/bar2' library may need to update its package.json or typings.",
                  "category": 3,
                  "code": 6278
                }
              ]
            }
          }
        ]
      ],
      "./node_modules/@types/bar/index.d.ts",
      "./node_modules/foo/index.d.ts",
      "../../../../lib/lib.d.ts"
    ]
  },
  "version": "FakeTSVersion"
}
10:: add the node10Result in @types
*** Needs explanation
TsBuild info text without affectedFilesPendingEmit:: /home/src/projects/project/tsconfig.tsbuildinfo.readable.baseline.txt::
CleanBuild:
{
  "program": {
    "fileInfos": {
      "../../../../lib/lib.d.ts": {
        "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "affectsGlobalScope": true,
        "impliedFormat": "commonjs"
      },
      "./node_modules/foo/index.d.ts": {
        "version": "-5214938848-export declare const foo: number;",
        "impliedFormat": "commonjs"
      },
      "./node_modules/@types/bar/index.d.ts": {
        "version": "-9556021903-export declare const bar: number;",
        "impliedFormat": "commonjs"
      },
      "./index.mts": {
        "version": "-4806968175-import { foo } from \"foo\";\nimport { bar } from \"bar\";\nimport { foo2 } from \"foo2\";\nimport { bar2 } from \"bar2\";\n",
        "impliedFormat": "esnext"
      }
    },
    "root": [
      [
        4,
        "./index.mts"
      ]
    ],
    "options": {
      "strict": true
    },
    "referencedMap": {
      "./index.mts": [
        "./node_modules/foo/index.d.ts",
        "./node_modules/@types/bar/index.d.ts"
      ]
    },
    "semanticDiagnosticsPerFile": [
      [
        "./index.mts",
        [
          {
            "file": "./index.mts",
            "start": 75,
            "length": 6,
            "code": 7016,
            "category": 1,
            "messageText": {
              "messageText": "Could not find a declaration file for module 'foo2'. '/home/src/projects/project/node_modules/foo2/index.mjs' implicitly has an 'any' type.",
              "category": 1,
              "code": 7016,
              "next": [
                {
                  "messageText": "Try `npm i --save-dev @types/foo2` if it exists or add a new declaration (.d.ts) file containing `declare module 'foo2';`",
                  "category": 1,
                  "code": 7035
                }
              ]
            }
          },
          {
            "file": "./index.mts",
            "start": 104,
            "length": 6,
            "code": 7016,
            "category": 1,
            "messageText": {
              "messageText": "Could not find a declaration file for module 'bar2'. '/home/src/projects/project/node_modules/bar2/index.mjs' implicitly has an 'any' type.",
              "category": 1,
              "code": 7016,
              "next": [
                {
                  "messageText": "There are types at '/home/src/projects/project/node_modules/@types/bar2/index.d.ts', but this result could not be resolved when respecting package.json \"exports\". The '@types/bar2' library may need to update its package.json or typings.",
                  "category": 3,
                  "code": 6278
                }
              ]
            }
          }
        ]
      ],
      "./node_modules/@types/bar/index.d.ts",
      "./node_modules/foo/index.d.ts",
      "../../../../lib/lib.d.ts"
    ]
  },
  "version": "FakeTSVersion"
}
IncrementalBuild:
{
  "program": {
    "fileInfos": {
      "../../../../lib/lib.d.ts": {
        "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "affectsGlobalScope": true,
        "impliedFormat": "commonjs"
      },
      "./node_modules/foo/index.d.ts": {
        "version": "-5214938848-export declare const foo: number;",
        "impliedFormat": "commonjs"
      },
      "./node_modules/@types/bar/index.d.ts": {
        "version": "-9556021903-export declare const bar: number;",
        "impliedFormat": "commonjs"
      },
      "./index.mts": {
        "version": "-4806968175-import { foo } from \"foo\";\nimport { bar } from \"bar\";\nimport { foo2 } from \"foo2\";\nimport { bar2 } from \"bar2\";\n",
        "impliedFormat": "esnext"
      }
    },
    "root": [
      [
        4,
        "./index.mts"
      ]
    ],
    "options": {
      "strict": true
    },
    "referencedMap": {
      "./index.mts": [
        "./node_modules/foo/index.d.ts",
        "./node_modules/@types/bar/index.d.ts"
      ]
    },
    "semanticDiagnosticsPerFile": [
      [
        "./index.mts",
        [
          {
            "file": "./index.mts",
            "start": 75,
            "length": 6,
            "code": 7016,
            "category": 1,
            "messageText": {
              "messageText": "Could not find a declaration file for module 'foo2'. '/home/src/projects/project/node_modules/foo2/index.mjs' implicitly has an 'any' type.",
              "category": 1,
              "code": 7016,
              "next": [
                {
                  "messageText": "There are types at '/home/src/projects/project/node_modules/foo2/index.d.ts', but this result could not be resolved when respecting package.json \"exports\". The 'foo2' library may need to update its package.json or typings.",
                  "category": 3,
                  "code": 6278
                }
              ]
            }
          },
          {
            "file": "./index.mts",
            "start": 104,
            "length": 6,
            "code": 7016,
            "category": 1,
            "messageText": {
              "messageText": "Could not find a declaration file for module 'bar2'. '/home/src/projects/project/node_modules/bar2/index.mjs' implicitly has an 'any' type.",
              "category": 1,
              "code": 7016,
              "next": [
                {
                  "messageText": "There are types at '/home/src/projects/project/node_modules/@types/bar2/index.d.ts', but this result could not be resolved when respecting package.json \"exports\". The '@types/bar2' library may need to update its package.json or typings.",
                  "category": 3,
                  "code": 6278
                }
              ]
            }
          }
        ]
      ],
      "./node_modules/@types/bar/index.d.ts",
      "./node_modules/foo/index.d.ts",
      "../../../../lib/lib.d.ts"
    ]
  },
  "version": "FakeTSVersion"
}