4:: no-change-run
Clean build tsbuildinfo will have compilerOptions {}
Incremental build will detect that it doesnt need to rebuild so tsbuild info is from before which has option declaration and declarationMap
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
      "./a.ts": {
        "version": "-18487752940-export const a = 10;const aLocal = 10;",
        "impliedFormat": "commonjs"
      },
      "./b.ts": {
        "version": "-6189287562-export const b = 10;const bLocal = 10;",
        "impliedFormat": "commonjs"
      },
      "./c.ts": {
        "version": "3248317647-import { a } from \"./a\";export const c = a;",
        "impliedFormat": "commonjs"
      },
      "./d.ts": {
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
          "./a.ts",
          "./b.ts",
          "./c.ts",
          "./d.ts"
        ]
      ]
    ],
    "referencedMap": {
      "./c.ts": [
        "./a.ts"
      ],
      "./d.ts": [
        "./b.ts"
      ]
    },
    "options": {}
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
      "./a.ts": {
        "version": "-18487752940-export const a = 10;const aLocal = 10;",
        "impliedFormat": "commonjs"
      },
      "./b.ts": {
        "version": "-6189287562-export const b = 10;const bLocal = 10;",
        "impliedFormat": "commonjs"
      },
      "./c.ts": {
        "version": "3248317647-import { a } from \"./a\";export const c = a;",
        "impliedFormat": "commonjs"
      },
      "./d.ts": {
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
          "./a.ts",
          "./b.ts",
          "./c.ts",
          "./d.ts"
        ]
      ]
    ],
    "options": {
      "declaration": true,
      "declarationMap": true
    },
    "referencedMap": {
      "./c.ts": [
        "./a.ts"
      ],
      "./d.ts": [
        "./b.ts"
      ]
    }
  },
  "version": "FakeTSVersion"
}
7:: no-change-run
Clean build tsbuildinfo will have compilerOptions {}
Incremental build will detect that it doesnt need to rebuild so tsbuild info is from before which has option declaration and declarationMap
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
      "./a.ts": {
        "version": "-17390360476-export const a = 10;const aLocal = 100;",
        "impliedFormat": "commonjs"
      },
      "./b.ts": {
        "version": "-6189287562-export const b = 10;const bLocal = 10;",
        "impliedFormat": "commonjs"
      },
      "./c.ts": {
        "version": "3248317647-import { a } from \"./a\";export const c = a;",
        "impliedFormat": "commonjs"
      },
      "./d.ts": {
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
          "./a.ts",
          "./b.ts",
          "./c.ts",
          "./d.ts"
        ]
      ]
    ],
    "referencedMap": {
      "./c.ts": [
        "./a.ts"
      ],
      "./d.ts": [
        "./b.ts"
      ]
    },
    "options": {}
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
      "./a.ts": {
        "version": "-17390360476-export const a = 10;const aLocal = 100;",
        "impliedFormat": "commonjs"
      },
      "./b.ts": {
        "version": "-6189287562-export const b = 10;const bLocal = 10;",
        "impliedFormat": "commonjs"
      },
      "./c.ts": {
        "version": "3248317647-import { a } from \"./a\";export const c = a;",
        "impliedFormat": "commonjs"
      },
      "./d.ts": {
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
          "./a.ts",
          "./b.ts",
          "./c.ts",
          "./d.ts"
        ]
      ]
    ],
    "options": {
      "declaration": true,
      "declarationMap": true
    },
    "referencedMap": {
      "./c.ts": [
        "./a.ts"
      ],
      "./d.ts": [
        "./b.ts"
      ]
    }
  },
  "version": "FakeTSVersion"
}