0:: build ts project with edit
*** Needs explanation
TsBuild info text without affectedFilesPendingEmit:: /home/src/workspaces/project/test/module/ts/tsconfig.tsbuildinfo.readable.baseline.txt::
CleanBuild:
{
  "fileInfos": {
    "../../../../../tslibs/ts/lib/lib.d.ts": {
      "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
      "affectsGlobalScope": true
    },
    "./index.ts": {
      "version": "-13547799514-export const tsIndex= 10;"
    },
    "./main.ts": {
      "version": "-8570461073-export const tsMain = 10;export const z = 10;"
    },
    "./node_modules/@types/node/index.d.ts": {
      "version": "-4340658070-declare const tsRequireGlobal = 10;",
      "affectsGlobalScope": true,
      "impliedFormat": "commonjs"
    },
    "../ts-require/node_modules/@types/node/index.d.ts": {
      "version": "-4340658070-declare const tsRequireGlobal = 10;",
      "affectsGlobalScope": true,
      "impliedFormat": "commonjs"
    },
    "../../../node_modules/@types/responselike/index.d.ts": {
      "version": "4670743798-/// <reference types=\"node\" />\nexport const z = 10;\n",
      "impliedFormat": "commonjs"
    }
  },
  "root": [
    [
      2,
      "./index.ts"
    ],
    [
      3,
      "./main.ts"
    ]
  ],
  "referencedMap": {
    "../../../node_modules/@types/responselike/index.d.ts": [
      "../ts-require/node_modules/@types/node/index.d.ts"
    ]
  },
  "version": "FakeTSVersion"
}
IncrementalBuild:
{
  "fileInfos": {
    "../../../../../tslibs/ts/lib/lib.d.ts": {
      "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
      "affectsGlobalScope": true
    },
    "./index.ts": {
      "version": "-13547799514-export const tsIndex= 10;"
    },
    "./main.ts": {
      "version": "-8570461073-export const tsMain = 10;export const z = 10;"
    },
    "./node_modules/@types/node/index.d.ts": {
      "version": "-4340658070-declare const tsRequireGlobal = 10;",
      "affectsGlobalScope": true,
      "impliedFormat": "commonjs"
    },
    "../../../node_modules/@types/responselike/index.d.ts": {
      "version": "4670743798-/// <reference types=\"node\" />\nexport const z = 10;\n",
      "impliedFormat": "commonjs"
    }
  },
  "root": [
    [
      2,
      "./index.ts"
    ],
    [
      3,
      "./main.ts"
    ]
  ],
  "referencedMap": {
    "../../../node_modules/@types/responselike/index.d.ts": [
      "./node_modules/@types/node/index.d.ts"
    ]
  },
  "version": "FakeTSVersion"
}
Incremental signature is neither dts signature nor file version for File:: ../ts-require/node_modules/@types/node/index.d.ts
Incremental:: undefined
Clean:: {
  "original": {
    "version": "-4340658070-declare const tsRequireGlobal = 10;",
    "affectsGlobalScope": true,
    "impliedFormat": 1
  },
  "version": "-4340658070-declare const tsRequireGlobal = 10;",
  "signature": "-4340658070-declare const tsRequireGlobal = 10;",
  "affectsGlobalScope": true,
  "impliedFormat": "commonjs"
}
Dts Signature:: undefined
Incremental build does not contain ./node_modules/@types/node/index.d.ts file for semantic errors, clean build has semantic errors: /home/src/workspaces/project/test/module/ts/tsconfig.tsbuildinfo.readable.baseline.txt::
Incremental buildInfoText:: {
  "fileNames": [
    "../../../../../tslibs/ts/lib/lib.d.ts",
    "./index.ts",
    "./main.ts",
    "./node_modules/@types/node/index.d.ts",
    "../../../node_modules/@types/responselike/index.d.ts"
  ],
  "fileIdsList": [
    [
      "./node_modules/@types/node/index.d.ts"
    ]
  ],
  "fileInfos": {
    "../../../../../tslibs/ts/lib/lib.d.ts": {
      "original": {
        "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "affectsGlobalScope": true
      },
      "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
      "signature": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
      "affectsGlobalScope": true
    },
    "./index.ts": {
      "original": {
        "version": "-13547799514-export const tsIndex= 10;",
        "signature": "-3096057536-export declare const tsIndex = 10;\n"
      },
      "version": "-13547799514-export const tsIndex= 10;",
      "signature": "-3096057536-export declare const tsIndex = 10;\n"
    },
    "./main.ts": {
      "original": {
        "version": "-8570461073-export const tsMain = 10;export const z = 10;",
        "signature": "-7988574173-export declare const tsMain = 10;\nexport declare const z = 10;\n"
      },
      "version": "-8570461073-export const tsMain = 10;export const z = 10;",
      "signature": "-7988574173-export declare const tsMain = 10;\nexport declare const z = 10;\n"
    },
    "./node_modules/@types/node/index.d.ts": {
      "original": {
        "version": "-4340658070-declare const tsRequireGlobal = 10;",
        "affectsGlobalScope": true,
        "impliedFormat": 1
      },
      "version": "-4340658070-declare const tsRequireGlobal = 10;",
      "signature": "-4340658070-declare const tsRequireGlobal = 10;",
      "affectsGlobalScope": true,
      "impliedFormat": "commonjs"
    },
    "../../../node_modules/@types/responselike/index.d.ts": {
      "original": {
        "version": "4670743798-/// <reference types=\"node\" />\nexport const z = 10;\n",
        "impliedFormat": 1
      },
      "version": "4670743798-/// <reference types=\"node\" />\nexport const z = 10;\n",
      "signature": "4670743798-/// <reference types=\"node\" />\nexport const z = 10;\n",
      "impliedFormat": "commonjs"
    }
  },
  "root": [
    [
      2,
      "./index.ts"
    ],
    [
      3,
      "./main.ts"
    ]
  ],
  "referencedMap": {
    "../../../node_modules/@types/responselike/index.d.ts": [
      "./node_modules/@types/node/index.d.ts"
    ]
  },
  "version": "FakeTSVersion",
  "size": 1237
}
Clean buildInfoText:: {
  "fileNames": [
    "../../../../../tslibs/ts/lib/lib.d.ts",
    "./index.ts",
    "./main.ts",
    "./node_modules/@types/node/index.d.ts",
    "../ts-require/node_modules/@types/node/index.d.ts",
    "../../../node_modules/@types/responselike/index.d.ts"
  ],
  "fileIdsList": [
    [
      "../ts-require/node_modules/@types/node/index.d.ts"
    ]
  ],
  "fileInfos": {
    "../../../../../tslibs/ts/lib/lib.d.ts": {
      "original": {
        "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "affectsGlobalScope": true
      },
      "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
      "signature": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
      "affectsGlobalScope": true
    },
    "./index.ts": {
      "version": "-13547799514-export const tsIndex= 10;",
      "signature": "-13547799514-export const tsIndex= 10;"
    },
    "./main.ts": {
      "version": "-8570461073-export const tsMain = 10;export const z = 10;",
      "signature": "-8570461073-export const tsMain = 10;export const z = 10;"
    },
    "./node_modules/@types/node/index.d.ts": {
      "original": {
        "version": "-4340658070-declare const tsRequireGlobal = 10;",
        "affectsGlobalScope": true,
        "impliedFormat": 1
      },
      "version": "-4340658070-declare const tsRequireGlobal = 10;",
      "signature": "-4340658070-declare const tsRequireGlobal = 10;",
      "affectsGlobalScope": true,
      "impliedFormat": "commonjs"
    },
    "../ts-require/node_modules/@types/node/index.d.ts": {
      "original": {
        "version": "-4340658070-declare const tsRequireGlobal = 10;",
        "affectsGlobalScope": true,
        "impliedFormat": 1
      },
      "version": "-4340658070-declare const tsRequireGlobal = 10;",
      "signature": "-4340658070-declare const tsRequireGlobal = 10;",
      "affectsGlobalScope": true,
      "impliedFormat": "commonjs"
    },
    "../../../node_modules/@types/responselike/index.d.ts": {
      "original": {
        "version": "4670743798-/// <reference types=\"node\" />\nexport const z = 10;\n",
        "impliedFormat": 1
      },
      "version": "4670743798-/// <reference types=\"node\" />\nexport const z = 10;\n",
      "signature": "4670743798-/// <reference types=\"node\" />\nexport const z = 10;\n",
      "impliedFormat": "commonjs"
    }
  },
  "root": [
    [
      2,
      "./index.ts"
    ],
    [
      3,
      "./main.ts"
    ]
  ],
  "referencedMap": {
    "../../../node_modules/@types/responselike/index.d.ts": [
      "../ts-require/node_modules/@types/node/index.d.ts"
    ]
  },
  "semanticDiagnosticsPerFile": [
    [
      "./node_modules/@types/node/index.d.ts",
      [
        {
          "start": 14,
          "length": 15,
          "messageText": "Cannot redeclare block-scoped variable 'tsRequireGlobal'.",
          "category": 1,
          "code": 2451,
          "relatedInformation": [
            {
              "file": "../ts-require/node_modules/@types/node/index.d.ts",
              "start": 14,
              "length": 15,
              "messageText": "'tsRequireGlobal' was also declared here.",
              "category": 3,
              "code": 6203
            }
          ]
        }
      ]
    ],
    [
      "../ts-require/node_modules/@types/node/index.d.ts",
      [
        {
          "start": 14,
          "length": 15,
          "messageText": "Cannot redeclare block-scoped variable 'tsRequireGlobal'.",
          "category": 1,
          "code": 2451,
          "relatedInformation": [
            {
              "file": "./node_modules/@types/node/index.d.ts",
              "start": 14,
              "length": 15,
              "messageText": "'tsRequireGlobal' was also declared here.",
              "category": 3,
              "code": 6203
            }
          ]
        }
      ]
    ]
  ],
  "version": "FakeTSVersion",
  "size": 1875
}
Incremental build does not contain ../ts-require/node_modules/@types/node/index.d.ts file for semantic errors, clean build has semantic errors: /home/src/workspaces/project/test/module/ts/tsconfig.tsbuildinfo.readable.baseline.txt::
Incremental buildInfoText:: {
  "fileNames": [
    "../../../../../tslibs/ts/lib/lib.d.ts",
    "./index.ts",
    "./main.ts",
    "./node_modules/@types/node/index.d.ts",
    "../../../node_modules/@types/responselike/index.d.ts"
  ],
  "fileIdsList": [
    [
      "./node_modules/@types/node/index.d.ts"
    ]
  ],
  "fileInfos": {
    "../../../../../tslibs/ts/lib/lib.d.ts": {
      "original": {
        "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "affectsGlobalScope": true
      },
      "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
      "signature": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
      "affectsGlobalScope": true
    },
    "./index.ts": {
      "original": {
        "version": "-13547799514-export const tsIndex= 10;",
        "signature": "-3096057536-export declare const tsIndex = 10;\n"
      },
      "version": "-13547799514-export const tsIndex= 10;",
      "signature": "-3096057536-export declare const tsIndex = 10;\n"
    },
    "./main.ts": {
      "original": {
        "version": "-8570461073-export const tsMain = 10;export const z = 10;",
        "signature": "-7988574173-export declare const tsMain = 10;\nexport declare const z = 10;\n"
      },
      "version": "-8570461073-export const tsMain = 10;export const z = 10;",
      "signature": "-7988574173-export declare const tsMain = 10;\nexport declare const z = 10;\n"
    },
    "./node_modules/@types/node/index.d.ts": {
      "original": {
        "version": "-4340658070-declare const tsRequireGlobal = 10;",
        "affectsGlobalScope": true,
        "impliedFormat": 1
      },
      "version": "-4340658070-declare const tsRequireGlobal = 10;",
      "signature": "-4340658070-declare const tsRequireGlobal = 10;",
      "affectsGlobalScope": true,
      "impliedFormat": "commonjs"
    },
    "../../../node_modules/@types/responselike/index.d.ts": {
      "original": {
        "version": "4670743798-/// <reference types=\"node\" />\nexport const z = 10;\n",
        "impliedFormat": 1
      },
      "version": "4670743798-/// <reference types=\"node\" />\nexport const z = 10;\n",
      "signature": "4670743798-/// <reference types=\"node\" />\nexport const z = 10;\n",
      "impliedFormat": "commonjs"
    }
  },
  "root": [
    [
      2,
      "./index.ts"
    ],
    [
      3,
      "./main.ts"
    ]
  ],
  "referencedMap": {
    "../../../node_modules/@types/responselike/index.d.ts": [
      "./node_modules/@types/node/index.d.ts"
    ]
  },
  "version": "FakeTSVersion",
  "size": 1237
}
Clean buildInfoText:: {
  "fileNames": [
    "../../../../../tslibs/ts/lib/lib.d.ts",
    "./index.ts",
    "./main.ts",
    "./node_modules/@types/node/index.d.ts",
    "../ts-require/node_modules/@types/node/index.d.ts",
    "../../../node_modules/@types/responselike/index.d.ts"
  ],
  "fileIdsList": [
    [
      "../ts-require/node_modules/@types/node/index.d.ts"
    ]
  ],
  "fileInfos": {
    "../../../../../tslibs/ts/lib/lib.d.ts": {
      "original": {
        "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "affectsGlobalScope": true
      },
      "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
      "signature": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
      "affectsGlobalScope": true
    },
    "./index.ts": {
      "version": "-13547799514-export const tsIndex= 10;",
      "signature": "-13547799514-export const tsIndex= 10;"
    },
    "./main.ts": {
      "version": "-8570461073-export const tsMain = 10;export const z = 10;",
      "signature": "-8570461073-export const tsMain = 10;export const z = 10;"
    },
    "./node_modules/@types/node/index.d.ts": {
      "original": {
        "version": "-4340658070-declare const tsRequireGlobal = 10;",
        "affectsGlobalScope": true,
        "impliedFormat": 1
      },
      "version": "-4340658070-declare const tsRequireGlobal = 10;",
      "signature": "-4340658070-declare const tsRequireGlobal = 10;",
      "affectsGlobalScope": true,
      "impliedFormat": "commonjs"
    },
    "../ts-require/node_modules/@types/node/index.d.ts": {
      "original": {
        "version": "-4340658070-declare const tsRequireGlobal = 10;",
        "affectsGlobalScope": true,
        "impliedFormat": 1
      },
      "version": "-4340658070-declare const tsRequireGlobal = 10;",
      "signature": "-4340658070-declare const tsRequireGlobal = 10;",
      "affectsGlobalScope": true,
      "impliedFormat": "commonjs"
    },
    "../../../node_modules/@types/responselike/index.d.ts": {
      "original": {
        "version": "4670743798-/// <reference types=\"node\" />\nexport const z = 10;\n",
        "impliedFormat": 1
      },
      "version": "4670743798-/// <reference types=\"node\" />\nexport const z = 10;\n",
      "signature": "4670743798-/// <reference types=\"node\" />\nexport const z = 10;\n",
      "impliedFormat": "commonjs"
    }
  },
  "root": [
    [
      2,
      "./index.ts"
    ],
    [
      3,
      "./main.ts"
    ]
  ],
  "referencedMap": {
    "../../../node_modules/@types/responselike/index.d.ts": [
      "../ts-require/node_modules/@types/node/index.d.ts"
    ]
  },
  "semanticDiagnosticsPerFile": [
    [
      "./node_modules/@types/node/index.d.ts",
      [
        {
          "start": 14,
          "length": 15,
          "messageText": "Cannot redeclare block-scoped variable 'tsRequireGlobal'.",
          "category": 1,
          "code": 2451,
          "relatedInformation": [
            {
              "file": "../ts-require/node_modules/@types/node/index.d.ts",
              "start": 14,
              "length": 15,
              "messageText": "'tsRequireGlobal' was also declared here.",
              "category": 3,
              "code": 6203
            }
          ]
        }
      ]
    ],
    [
      "../ts-require/node_modules/@types/node/index.d.ts",
      [
        {
          "start": 14,
          "length": 15,
          "messageText": "Cannot redeclare block-scoped variable 'tsRequireGlobal'.",
          "category": 1,
          "code": 2451,
          "relatedInformation": [
            {
              "file": "./node_modules/@types/node/index.d.ts",
              "start": 14,
              "length": 15,
              "messageText": "'tsRequireGlobal' was also declared here.",
              "category": 3,
              "code": 6203
            }
          ]
        }
      ]
    ]
  ],
  "version": "FakeTSVersion",
  "size": 1875
}
1:: build ts-require project with edit
*** Needs explanation
TsBuild info text without affectedFilesPendingEmit:: /home/src/workspaces/project/test/module/ts/tsconfig.tsbuildinfo.readable.baseline.txt::
CleanBuild:
{
  "fileInfos": {
    "../../../../../tslibs/ts/lib/lib.d.ts": {
      "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
      "affectsGlobalScope": true
    },
    "./index.ts": {
      "version": "-13547799514-export const tsIndex= 10;"
    },
    "./main.ts": {
      "version": "-8570461073-export const tsMain = 10;export const z = 10;"
    },
    "./node_modules/@types/node/index.d.ts": {
      "version": "-4340658070-declare const tsRequireGlobal = 10;",
      "affectsGlobalScope": true,
      "impliedFormat": "commonjs"
    },
    "../ts-require/node_modules/@types/node/index.d.ts": {
      "version": "-4340658070-declare const tsRequireGlobal = 10;",
      "affectsGlobalScope": true,
      "impliedFormat": "commonjs"
    },
    "../../../node_modules/@types/responselike/index.d.ts": {
      "version": "4670743798-/// <reference types=\"node\" />\nexport const z = 10;\n",
      "impliedFormat": "commonjs"
    }
  },
  "root": [
    [
      2,
      "./index.ts"
    ],
    [
      3,
      "./main.ts"
    ]
  ],
  "referencedMap": {
    "../../../node_modules/@types/responselike/index.d.ts": [
      "../ts-require/node_modules/@types/node/index.d.ts"
    ]
  },
  "version": "FakeTSVersion"
}
IncrementalBuild:
{
  "fileInfos": {
    "../../../../../tslibs/ts/lib/lib.d.ts": {
      "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
      "affectsGlobalScope": true
    },
    "./index.ts": {
      "version": "-13547799514-export const tsIndex= 10;"
    },
    "./main.ts": {
      "version": "-8570461073-export const tsMain = 10;export const z = 10;"
    },
    "./node_modules/@types/node/index.d.ts": {
      "version": "-4340658070-declare const tsRequireGlobal = 10;",
      "affectsGlobalScope": true,
      "impliedFormat": "commonjs"
    },
    "../../../node_modules/@types/responselike/index.d.ts": {
      "version": "4670743798-/// <reference types=\"node\" />\nexport const z = 10;\n",
      "impliedFormat": "commonjs"
    }
  },
  "root": [
    [
      2,
      "./index.ts"
    ],
    [
      3,
      "./main.ts"
    ]
  ],
  "referencedMap": {
    "../../../node_modules/@types/responselike/index.d.ts": [
      "./node_modules/@types/node/index.d.ts"
    ]
  },
  "version": "FakeTSVersion"
}
Incremental signature is neither dts signature nor file version for File:: ../ts-require/node_modules/@types/node/index.d.ts
Incremental:: undefined
Clean:: {
  "original": {
    "version": "-4340658070-declare const tsRequireGlobal = 10;",
    "affectsGlobalScope": true,
    "impliedFormat": 1
  },
  "version": "-4340658070-declare const tsRequireGlobal = 10;",
  "signature": "-4340658070-declare const tsRequireGlobal = 10;",
  "affectsGlobalScope": true,
  "impliedFormat": "commonjs"
}
Dts Signature:: undefined
Incremental build does not contain ./node_modules/@types/node/index.d.ts file for semantic errors, clean build has semantic errors: /home/src/workspaces/project/test/module/ts/tsconfig.tsbuildinfo.readable.baseline.txt::
Incremental buildInfoText:: {
  "fileNames": [
    "../../../../../tslibs/ts/lib/lib.d.ts",
    "./index.ts",
    "./main.ts",
    "./node_modules/@types/node/index.d.ts",
    "../../../node_modules/@types/responselike/index.d.ts"
  ],
  "fileIdsList": [
    [
      "./node_modules/@types/node/index.d.ts"
    ]
  ],
  "fileInfos": {
    "../../../../../tslibs/ts/lib/lib.d.ts": {
      "original": {
        "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "affectsGlobalScope": true
      },
      "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
      "signature": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
      "affectsGlobalScope": true
    },
    "./index.ts": {
      "original": {
        "version": "-13547799514-export const tsIndex= 10;",
        "signature": "-3096057536-export declare const tsIndex = 10;\n"
      },
      "version": "-13547799514-export const tsIndex= 10;",
      "signature": "-3096057536-export declare const tsIndex = 10;\n"
    },
    "./main.ts": {
      "original": {
        "version": "-8570461073-export const tsMain = 10;export const z = 10;",
        "signature": "-7988574173-export declare const tsMain = 10;\nexport declare const z = 10;\n"
      },
      "version": "-8570461073-export const tsMain = 10;export const z = 10;",
      "signature": "-7988574173-export declare const tsMain = 10;\nexport declare const z = 10;\n"
    },
    "./node_modules/@types/node/index.d.ts": {
      "original": {
        "version": "-4340658070-declare const tsRequireGlobal = 10;",
        "affectsGlobalScope": true,
        "impliedFormat": 1
      },
      "version": "-4340658070-declare const tsRequireGlobal = 10;",
      "signature": "-4340658070-declare const tsRequireGlobal = 10;",
      "affectsGlobalScope": true,
      "impliedFormat": "commonjs"
    },
    "../../../node_modules/@types/responselike/index.d.ts": {
      "original": {
        "version": "4670743798-/// <reference types=\"node\" />\nexport const z = 10;\n",
        "impliedFormat": 1
      },
      "version": "4670743798-/// <reference types=\"node\" />\nexport const z = 10;\n",
      "signature": "4670743798-/// <reference types=\"node\" />\nexport const z = 10;\n",
      "impliedFormat": "commonjs"
    }
  },
  "root": [
    [
      2,
      "./index.ts"
    ],
    [
      3,
      "./main.ts"
    ]
  ],
  "referencedMap": {
    "../../../node_modules/@types/responselike/index.d.ts": [
      "./node_modules/@types/node/index.d.ts"
    ]
  },
  "version": "FakeTSVersion",
  "size": 1237
}
Clean buildInfoText:: {
  "fileNames": [
    "../../../../../tslibs/ts/lib/lib.d.ts",
    "./index.ts",
    "./main.ts",
    "./node_modules/@types/node/index.d.ts",
    "../ts-require/node_modules/@types/node/index.d.ts",
    "../../../node_modules/@types/responselike/index.d.ts"
  ],
  "fileIdsList": [
    [
      "../ts-require/node_modules/@types/node/index.d.ts"
    ]
  ],
  "fileInfos": {
    "../../../../../tslibs/ts/lib/lib.d.ts": {
      "original": {
        "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "affectsGlobalScope": true
      },
      "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
      "signature": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
      "affectsGlobalScope": true
    },
    "./index.ts": {
      "version": "-13547799514-export const tsIndex= 10;",
      "signature": "-13547799514-export const tsIndex= 10;"
    },
    "./main.ts": {
      "version": "-8570461073-export const tsMain = 10;export const z = 10;",
      "signature": "-8570461073-export const tsMain = 10;export const z = 10;"
    },
    "./node_modules/@types/node/index.d.ts": {
      "original": {
        "version": "-4340658070-declare const tsRequireGlobal = 10;",
        "affectsGlobalScope": true,
        "impliedFormat": 1
      },
      "version": "-4340658070-declare const tsRequireGlobal = 10;",
      "signature": "-4340658070-declare const tsRequireGlobal = 10;",
      "affectsGlobalScope": true,
      "impliedFormat": "commonjs"
    },
    "../ts-require/node_modules/@types/node/index.d.ts": {
      "original": {
        "version": "-4340658070-declare const tsRequireGlobal = 10;",
        "affectsGlobalScope": true,
        "impliedFormat": 1
      },
      "version": "-4340658070-declare const tsRequireGlobal = 10;",
      "signature": "-4340658070-declare const tsRequireGlobal = 10;",
      "affectsGlobalScope": true,
      "impliedFormat": "commonjs"
    },
    "../../../node_modules/@types/responselike/index.d.ts": {
      "original": {
        "version": "4670743798-/// <reference types=\"node\" />\nexport const z = 10;\n",
        "impliedFormat": 1
      },
      "version": "4670743798-/// <reference types=\"node\" />\nexport const z = 10;\n",
      "signature": "4670743798-/// <reference types=\"node\" />\nexport const z = 10;\n",
      "impliedFormat": "commonjs"
    }
  },
  "root": [
    [
      2,
      "./index.ts"
    ],
    [
      3,
      "./main.ts"
    ]
  ],
  "referencedMap": {
    "../../../node_modules/@types/responselike/index.d.ts": [
      "../ts-require/node_modules/@types/node/index.d.ts"
    ]
  },
  "semanticDiagnosticsPerFile": [
    [
      "./node_modules/@types/node/index.d.ts",
      [
        {
          "start": 14,
          "length": 15,
          "messageText": "Cannot redeclare block-scoped variable 'tsRequireGlobal'.",
          "category": 1,
          "code": 2451,
          "relatedInformation": [
            {
              "file": "../ts-require/node_modules/@types/node/index.d.ts",
              "start": 14,
              "length": 15,
              "messageText": "'tsRequireGlobal' was also declared here.",
              "category": 3,
              "code": 6203
            }
          ]
        }
      ]
    ],
    [
      "../ts-require/node_modules/@types/node/index.d.ts",
      [
        {
          "start": 14,
          "length": 15,
          "messageText": "Cannot redeclare block-scoped variable 'tsRequireGlobal'.",
          "category": 1,
          "code": 2451,
          "relatedInformation": [
            {
              "file": "./node_modules/@types/node/index.d.ts",
              "start": 14,
              "length": 15,
              "messageText": "'tsRequireGlobal' was also declared here.",
              "category": 3,
              "code": 6203
            }
          ]
        }
      ]
    ]
  ],
  "version": "FakeTSVersion",
  "size": 1875
}
Incremental build does not contain ../ts-require/node_modules/@types/node/index.d.ts file for semantic errors, clean build has semantic errors: /home/src/workspaces/project/test/module/ts/tsconfig.tsbuildinfo.readable.baseline.txt::
Incremental buildInfoText:: {
  "fileNames": [
    "../../../../../tslibs/ts/lib/lib.d.ts",
    "./index.ts",
    "./main.ts",
    "./node_modules/@types/node/index.d.ts",
    "../../../node_modules/@types/responselike/index.d.ts"
  ],
  "fileIdsList": [
    [
      "./node_modules/@types/node/index.d.ts"
    ]
  ],
  "fileInfos": {
    "../../../../../tslibs/ts/lib/lib.d.ts": {
      "original": {
        "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "affectsGlobalScope": true
      },
      "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
      "signature": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
      "affectsGlobalScope": true
    },
    "./index.ts": {
      "original": {
        "version": "-13547799514-export const tsIndex= 10;",
        "signature": "-3096057536-export declare const tsIndex = 10;\n"
      },
      "version": "-13547799514-export const tsIndex= 10;",
      "signature": "-3096057536-export declare const tsIndex = 10;\n"
    },
    "./main.ts": {
      "original": {
        "version": "-8570461073-export const tsMain = 10;export const z = 10;",
        "signature": "-7988574173-export declare const tsMain = 10;\nexport declare const z = 10;\n"
      },
      "version": "-8570461073-export const tsMain = 10;export const z = 10;",
      "signature": "-7988574173-export declare const tsMain = 10;\nexport declare const z = 10;\n"
    },
    "./node_modules/@types/node/index.d.ts": {
      "original": {
        "version": "-4340658070-declare const tsRequireGlobal = 10;",
        "affectsGlobalScope": true,
        "impliedFormat": 1
      },
      "version": "-4340658070-declare const tsRequireGlobal = 10;",
      "signature": "-4340658070-declare const tsRequireGlobal = 10;",
      "affectsGlobalScope": true,
      "impliedFormat": "commonjs"
    },
    "../../../node_modules/@types/responselike/index.d.ts": {
      "original": {
        "version": "4670743798-/// <reference types=\"node\" />\nexport const z = 10;\n",
        "impliedFormat": 1
      },
      "version": "4670743798-/// <reference types=\"node\" />\nexport const z = 10;\n",
      "signature": "4670743798-/// <reference types=\"node\" />\nexport const z = 10;\n",
      "impliedFormat": "commonjs"
    }
  },
  "root": [
    [
      2,
      "./index.ts"
    ],
    [
      3,
      "./main.ts"
    ]
  ],
  "referencedMap": {
    "../../../node_modules/@types/responselike/index.d.ts": [
      "./node_modules/@types/node/index.d.ts"
    ]
  },
  "version": "FakeTSVersion",
  "size": 1237
}
Clean buildInfoText:: {
  "fileNames": [
    "../../../../../tslibs/ts/lib/lib.d.ts",
    "./index.ts",
    "./main.ts",
    "./node_modules/@types/node/index.d.ts",
    "../ts-require/node_modules/@types/node/index.d.ts",
    "../../../node_modules/@types/responselike/index.d.ts"
  ],
  "fileIdsList": [
    [
      "../ts-require/node_modules/@types/node/index.d.ts"
    ]
  ],
  "fileInfos": {
    "../../../../../tslibs/ts/lib/lib.d.ts": {
      "original": {
        "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "affectsGlobalScope": true
      },
      "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
      "signature": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
      "affectsGlobalScope": true
    },
    "./index.ts": {
      "version": "-13547799514-export const tsIndex= 10;",
      "signature": "-13547799514-export const tsIndex= 10;"
    },
    "./main.ts": {
      "version": "-8570461073-export const tsMain = 10;export const z = 10;",
      "signature": "-8570461073-export const tsMain = 10;export const z = 10;"
    },
    "./node_modules/@types/node/index.d.ts": {
      "original": {
        "version": "-4340658070-declare const tsRequireGlobal = 10;",
        "affectsGlobalScope": true,
        "impliedFormat": 1
      },
      "version": "-4340658070-declare const tsRequireGlobal = 10;",
      "signature": "-4340658070-declare const tsRequireGlobal = 10;",
      "affectsGlobalScope": true,
      "impliedFormat": "commonjs"
    },
    "../ts-require/node_modules/@types/node/index.d.ts": {
      "original": {
        "version": "-4340658070-declare const tsRequireGlobal = 10;",
        "affectsGlobalScope": true,
        "impliedFormat": 1
      },
      "version": "-4340658070-declare const tsRequireGlobal = 10;",
      "signature": "-4340658070-declare const tsRequireGlobal = 10;",
      "affectsGlobalScope": true,
      "impliedFormat": "commonjs"
    },
    "../../../node_modules/@types/responselike/index.d.ts": {
      "original": {
        "version": "4670743798-/// <reference types=\"node\" />\nexport const z = 10;\n",
        "impliedFormat": 1
      },
      "version": "4670743798-/// <reference types=\"node\" />\nexport const z = 10;\n",
      "signature": "4670743798-/// <reference types=\"node\" />\nexport const z = 10;\n",
      "impliedFormat": "commonjs"
    }
  },
  "root": [
    [
      2,
      "./index.ts"
    ],
    [
      3,
      "./main.ts"
    ]
  ],
  "referencedMap": {
    "../../../node_modules/@types/responselike/index.d.ts": [
      "../ts-require/node_modules/@types/node/index.d.ts"
    ]
  },
  "semanticDiagnosticsPerFile": [
    [
      "./node_modules/@types/node/index.d.ts",
      [
        {
          "start": 14,
          "length": 15,
          "messageText": "Cannot redeclare block-scoped variable 'tsRequireGlobal'.",
          "category": 1,
          "code": 2451,
          "relatedInformation": [
            {
              "file": "../ts-require/node_modules/@types/node/index.d.ts",
              "start": 14,
              "length": 15,
              "messageText": "'tsRequireGlobal' was also declared here.",
              "category": 3,
              "code": 6203
            }
          ]
        }
      ]
    ],
    [
      "../ts-require/node_modules/@types/node/index.d.ts",
      [
        {
          "start": 14,
          "length": 15,
          "messageText": "Cannot redeclare block-scoped variable 'tsRequireGlobal'.",
          "category": 1,
          "code": 2451,
          "relatedInformation": [
            {
              "file": "./node_modules/@types/node/index.d.ts",
              "start": 14,
              "length": 15,
              "messageText": "'tsRequireGlobal' was also declared here.",
              "category": 3,
              "code": 6203
            }
          ]
        }
      ]
    ]
  ],
  "version": "FakeTSVersion",
  "size": 1875
}