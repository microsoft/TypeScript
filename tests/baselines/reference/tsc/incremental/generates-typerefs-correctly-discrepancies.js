0:: modify js file
*** Needs explanation
File: /src/project/outdir/src/bug.d.ts
CleanBuild:
export const bug: W.Wrap<{
    n: B.Box<number>;
}>;
export const something: 1;
import * as B from "./box.js";
import * as W from "./wrap.js";

IncrementalBuild:
export const bug: W.Wrap<{
    n: B.Box<number>;
}>;
export const something: 1;
import * as W from "./wrap.js";

TsBuild info text without affectedFilesPendingEmit:: /src/project/outdir/tsconfig.tsbuildinfo.readable.baseline.txt::
CleanBuild:
{
  "program": {
    "fileInfos": {
      "../../../lib/lib.d.ts": {
        "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "affectsGlobalScope": true
      },
      "../src/box.ts": {
        "version": "-14267342128-export interface Box<T> {\n    unbox(): T\n}\n"
      },
      "../src/wrap.ts": {
        "version": "-7208318765-export type Wrap<C> = {\n    [K in keyof C]: { wrapped: C[K] }\n}\n"
      },
      "../src/bug.js": {
        "version": "-25729561895-import * as B from \"./box.js\"\nimport * as W from \"./wrap.js\"\n\n/**\n * @template {object} C\n * @param {C} source\n * @returns {W.Wrap<C>}\n */\nconst wrap = source => {\nthrow source\n}\n\n/**\n * @returns {B.Box<number>}\n */\nconst box = (n = 0) => ({ unbox: () => n })\n\nexport const bug = wrap({ n: box(1) });\nexport const something = 1;"
      }
    },
    "root": [
      [
        [
          2,
          4
        ],
        [
          "../src/box.ts",
          "../src/wrap.ts",
          "../src/bug.js"
        ]
      ]
    ],
    "options": {
      "composite": true,
      "outDir": "./"
    },
    "referencedMap": {
      "../src/bug.js": [
        "../src/box.ts",
        "../src/wrap.ts"
      ]
    },
    "semanticDiagnosticsPerFile": [
      "../../../lib/lib.d.ts",
      "../src/box.ts",
      "../src/bug.js",
      "../src/wrap.ts"
    ],
    "latestChangedDtsFile": "FakeFileName"
  },
  "version": "FakeTSVersion"
}
IncrementalBuild:
{
  "program": {
    "fileInfos": {
      "../../../lib/lib.d.ts": {
        "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "affectsGlobalScope": true
      },
      "../src/box.ts": {
        "version": "-14267342128-export interface Box<T> {\n    unbox(): T\n}\n"
      },
      "../src/wrap.ts": {
        "version": "-7208318765-export type Wrap<C> = {\n    [K in keyof C]: { wrapped: C[K] }\n}\n"
      },
      "../src/bug.js": {
        "version": "-25729561895-import * as B from \"./box.js\"\nimport * as W from \"./wrap.js\"\n\n/**\n * @template {object} C\n * @param {C} source\n * @returns {W.Wrap<C>}\n */\nconst wrap = source => {\nthrow source\n}\n\n/**\n * @returns {B.Box<number>}\n */\nconst box = (n = 0) => ({ unbox: () => n })\n\nexport const bug = wrap({ n: box(1) });\nexport const something = 1;"
      }
    },
    "root": [
      [
        [
          2,
          4
        ],
        [
          "../src/box.ts",
          "../src/wrap.ts",
          "../src/bug.js"
        ]
      ]
    ],
    "options": {
      "composite": true,
      "outDir": "./"
    },
    "referencedMap": {
      "../src/bug.js": [
        "../src/box.ts",
        "../src/wrap.ts"
      ]
    },
    "semanticDiagnosticsPerFile": [
      "../../../lib/lib.d.ts",
      "../src/box.ts",
      "../src/bug.js",
      "../src/wrap.ts"
    ],
    "emitSignatures": [
      [
        "../src/bug.js",
        "1273570373-export const bug: W.Wrap<{\n    n: B.Box<number>;\n}>;\nexport const something: 1;\nimport * as W from \"./wrap.js\";\n"
      ]
    ],
    "latestChangedDtsFile": "FakeFileName"
  },
  "version": "FakeTSVersion"
}