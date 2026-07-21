0:: Modify imports used in global file
*** Needs explanation
TsBuild info text without affectedFilesPendingEmit:: /home/src/workspaces/project/tsconfig.tsbuildinfo.readable.baseline.txt::
CleanBuild:
{
  "fileInfos": {
    "../../tslibs/ts/lib/lib.es2025.full.d.ts": {
      "version": "-25093698414-interface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
      "affectsGlobalScope": true
    },
    "./class1.ts": {
      "version": "4085502068-const a: MagicNumber = 1;\nconsole.log(a);",
      "affectsGlobalScope": true
    },
    "./constants.ts": {
      "version": "-2659799015-export default 2;"
    },
    "./reexport.ts": {
      "version": "-1476032387-export { default as ConstantNumber } from \"./constants\""
    },
    "./types.d.ts": {
      "version": "2093085814-type MagicNumber = typeof import('./reexport').ConstantNumber",
      "affectsGlobalScope": true
    }
  },
  "root": [
    [
      [
        2,
        5
      ],
      [
        "./class1.ts",
        "./constants.ts",
        "./reexport.ts",
        "./types.d.ts"
      ]
    ]
  ],
  "options": {
    "composite": true
  },
  "referencedMap": {
    "./reexport.ts": [
      "./constants.ts"
    ],
    "./types.d.ts": [
      "./reexport.ts"
    ]
  },
  "latestChangedDtsFile": "FakeFileName",
  "version": "FakeTSVersion"
}
IncrementalBuild:
{
  "fileInfos": {
    "../../tslibs/ts/lib/lib.es2025.full.d.ts": {
      "version": "-25093698414-interface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
      "affectsGlobalScope": true
    },
    "./class1.ts": {
      "version": "4085502068-const a: MagicNumber = 1;\nconsole.log(a);",
      "affectsGlobalScope": true
    },
    "./constants.ts": {
      "version": "-2659799015-export default 2;"
    },
    "./reexport.ts": {
      "version": "-1476032387-export { default as ConstantNumber } from \"./constants\""
    },
    "./types.d.ts": {
      "version": "2093085814-type MagicNumber = typeof import('./reexport').ConstantNumber",
      "affectsGlobalScope": true
    }
  },
  "root": [
    [
      [
        2,
        5
      ],
      [
        "./class1.ts",
        "./constants.ts",
        "./reexport.ts",
        "./types.d.ts"
      ]
    ]
  ],
  "options": {
    "composite": true
  },
  "referencedMap": {
    "./reexport.ts": [
      "./constants.ts"
    ],
    "./types.d.ts": [
      "./reexport.ts"
    ]
  },
  "emitSignatures": [
    [
      "./class1.ts",
      "-3664762255-declare const a = 2;\n"
    ]
  ],
  "latestChangedDtsFile": "FakeFileName",
  "version": "FakeTSVersion"
}
Incremental signature is neither dts signature nor file version for File:: ./class1.ts
Incremental:: {
  "original": {
    "version": "4085502068-const a: MagicNumber = 1;\nconsole.log(a);",
    "signature": "-3664763344-declare const a = 1;\n",
    "affectsGlobalScope": true
  },
  "version": "4085502068-const a: MagicNumber = 1;\nconsole.log(a);",
  "signature": "-3664763344-declare const a = 1;\n",
  "affectsGlobalScope": true
}
Clean:: {
  "original": {
    "version": "4085502068-const a: MagicNumber = 1;\nconsole.log(a);",
    "signature": "-3664762255-declare const a = 2;\n",
    "affectsGlobalScope": true
  },
  "version": "4085502068-const a: MagicNumber = 1;\nconsole.log(a);",
  "signature": "-3664762255-declare const a = 2;\n",
  "affectsGlobalScope": true
}
Dts Signature:: "-3664762255-declare const a = 2;\n"