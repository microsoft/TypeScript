4:: no-change-run
Clean build tsbuildinfo will have compilerOptions {}
Incremental build will detect that it doesnt need to rebuild so tsbuild info is from before which has option declaration and declarationMap
TsBuild info text without affectedFilesPendingEmit:: /src/outfile.tsbuildinfo.readable.baseline.txt::
CleanBuild:
{
  "fileInfos": {
    "../lib/lib.d.ts": {
      "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
      "impliedFormat": "commonjs"
    },
    "./project/a.ts": {
      "version": "-18487752940-export const a = 10;const aLocal = 10;",
      "impliedFormat": "commonjs"
    },
    "./project/b.ts": {
      "version": "-6189287562-export const b = 10;const bLocal = 10;",
      "impliedFormat": "commonjs"
    },
    "./project/c.ts": {
      "version": "3248317647-import { a } from \"./a\";export const c = a;",
      "impliedFormat": "commonjs"
    },
    "./project/d.ts": {
      "version": "-19615769517-import { b } from \"./b\";export const d = b;",
      "impliedFormat": "commonjs"
    }
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
    "../lib/lib.d.ts": {
      "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
      "impliedFormat": "commonjs"
    },
    "./project/a.ts": {
      "version": "-18487752940-export const a = 10;const aLocal = 10;",
      "impliedFormat": "commonjs"
    },
    "./project/b.ts": {
      "version": "-6189287562-export const b = 10;const bLocal = 10;",
      "impliedFormat": "commonjs"
    },
    "./project/c.ts": {
      "version": "3248317647-import { a } from \"./a\";export const c = a;",
      "impliedFormat": "commonjs"
    },
    "./project/d.ts": {
      "version": "-19615769517-import { b } from \"./b\";export const d = b;",
      "impliedFormat": "commonjs"
    }
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
TsBuild info text without affectedFilesPendingEmit:: /src/outfile.tsbuildinfo.readable.baseline.txt::
CleanBuild:
{
  "fileInfos": {
    "../lib/lib.d.ts": {
      "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
      "impliedFormat": "commonjs"
    },
    "./project/a.ts": {
      "version": "-17390360476-export const a = 10;const aLocal = 100;",
      "impliedFormat": "commonjs"
    },
    "./project/b.ts": {
      "version": "-6189287562-export const b = 10;const bLocal = 10;",
      "impliedFormat": "commonjs"
    },
    "./project/c.ts": {
      "version": "3248317647-import { a } from \"./a\";export const c = a;",
      "impliedFormat": "commonjs"
    },
    "./project/d.ts": {
      "version": "-19615769517-import { b } from \"./b\";export const d = b;",
      "impliedFormat": "commonjs"
    }
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
    "../lib/lib.d.ts": {
      "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
      "impliedFormat": "commonjs"
    },
    "./project/a.ts": {
      "version": "-17390360476-export const a = 10;const aLocal = 100;",
      "impliedFormat": "commonjs"
    },
    "./project/b.ts": {
      "version": "-6189287562-export const b = 10;const bLocal = 10;",
      "impliedFormat": "commonjs"
    },
    "./project/c.ts": {
      "version": "3248317647-import { a } from \"./a\";export const c = a;",
      "impliedFormat": "commonjs"
    },
    "./project/d.ts": {
      "version": "-19615769517-import { b } from \"./b\";export const d = b;",
      "impliedFormat": "commonjs"
    }
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