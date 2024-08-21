4:: no-change-run
Clean build tsbuildinfo will have compilerOptions {}
Incremental build will detect that it doesnt need to rebuild so tsbuild info is from before which has option declaration and declarationMap
TsBuild info text without affectedFilesPendingEmit:: /home/src/workspaces/outfile.tsbuildinfo.readable.baseline.txt::
CleanBuild:
{
  "fileInfos": {
    "../tslibs/ts/lib/lib.d.ts": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
    "./project/a.ts": "-18487752940-export const a = 10;const aLocal = 10;",
    "./project/b.ts": "-6189287562-export const b = 10;const bLocal = 10;",
    "./project/c.ts": "3248317647-import { a } from \"./a\";export const c = a;",
    "./project/d.ts": "-19615769517-import { b } from \"./b\";export const d = b;"
  },
  "root": [
    [
      [
        2,
        5
      ],
      [
        "./project/a.ts",
        "./project/b.ts",
        "./project/c.ts",
        "./project/d.ts"
      ]
    ]
  ],
  "options": {
    "module": 2,
    "outFile": "./outFile.js"
  },
  "version": "FakeTSVersion"
}
IncrementalBuild:
{
  "fileInfos": {
    "../tslibs/ts/lib/lib.d.ts": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
    "./project/a.ts": "-18487752940-export const a = 10;const aLocal = 10;",
    "./project/b.ts": "-6189287562-export const b = 10;const bLocal = 10;",
    "./project/c.ts": "3248317647-import { a } from \"./a\";export const c = a;",
    "./project/d.ts": "-19615769517-import { b } from \"./b\";export const d = b;"
  },
  "root": [
    [
      [
        2,
        5
      ],
      [
        "./project/a.ts",
        "./project/b.ts",
        "./project/c.ts",
        "./project/d.ts"
      ]
    ]
  ],
  "options": {
    "declaration": true,
    "declarationMap": true,
    "module": 2,
    "outFile": "./outFile.js"
  },
  "version": "FakeTSVersion"
}
7:: no-change-run
Clean build tsbuildinfo will have compilerOptions {}
Incremental build will detect that it doesnt need to rebuild so tsbuild info is from before which has option declaration and declarationMap
TsBuild info text without affectedFilesPendingEmit:: /home/src/workspaces/outfile.tsbuildinfo.readable.baseline.txt::
CleanBuild:
{
  "fileInfos": {
    "../tslibs/ts/lib/lib.d.ts": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
    "./project/a.ts": "-17390360476-export const a = 10;const aLocal = 100;",
    "./project/b.ts": "-6189287562-export const b = 10;const bLocal = 10;",
    "./project/c.ts": "3248317647-import { a } from \"./a\";export const c = a;",
    "./project/d.ts": "-19615769517-import { b } from \"./b\";export const d = b;"
  },
  "root": [
    [
      [
        2,
        5
      ],
      [
        "./project/a.ts",
        "./project/b.ts",
        "./project/c.ts",
        "./project/d.ts"
      ]
    ]
  ],
  "options": {
    "module": 2,
    "outFile": "./outFile.js"
  },
  "version": "FakeTSVersion"
}
IncrementalBuild:
{
  "fileInfos": {
    "../tslibs/ts/lib/lib.d.ts": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
    "./project/a.ts": "-17390360476-export const a = 10;const aLocal = 100;",
    "./project/b.ts": "-6189287562-export const b = 10;const bLocal = 10;",
    "./project/c.ts": "3248317647-import { a } from \"./a\";export const c = a;",
    "./project/d.ts": "-19615769517-import { b } from \"./b\";export const d = b;"
  },
  "root": [
    [
      [
        2,
        5
      ],
      [
        "./project/a.ts",
        "./project/b.ts",
        "./project/c.ts",
        "./project/d.ts"
      ]
    ]
  ],
  "options": {
    "declaration": true,
    "declarationMap": true,
    "module": 2,
    "outFile": "./outFile.js"
  },
  "version": "FakeTSVersion"
}