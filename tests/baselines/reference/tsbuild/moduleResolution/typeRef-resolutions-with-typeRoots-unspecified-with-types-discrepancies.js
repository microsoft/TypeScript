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
Incremental signature is neither dts signature nor file version for File:: ./node_modules/@types/node/index.d.ts
Incremental:: {
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
Clean:: undefined
Dts Signature:: undefined
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
Incremental signature is neither dts signature nor file version for File:: ./node_modules/@types/node/index.d.ts
Incremental:: {
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
Clean:: undefined
Dts Signature:: undefined