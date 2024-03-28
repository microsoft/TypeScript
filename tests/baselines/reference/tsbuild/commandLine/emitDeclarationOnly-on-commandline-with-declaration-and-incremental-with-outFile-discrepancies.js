4:: no-change-run
Clean build tsbuildinfo for both projects will have compilerOptions with composite and emitDeclarationOnly
Incremental build will detect that it doesnt need to rebuild so tsbuild info for projects is from before which has option composite only
TsBuild info text without affectedFilesPendingEmit:: /src/project1/outfile.tsbuildinfo.readable.baseline.txt::
CleanBuild:
{
  "program": {
    "fileInfos": {
      "../../lib/lib.d.ts": {
        "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "impliedFormat": "commonjs"
      },
      "./src/a.ts": {
        "version": "-6435489413-export const a = 10;const aLocal = 10;const aa = 10;export const aaa = 10;",
        "impliedFormat": "commonjs"
      },
      "./src/b.ts": {
        "version": "-6189287562-export const b = 10;const bLocal = 10;",
        "impliedFormat": "commonjs"
      },
      "./src/c.ts": {
        "version": "3248317647-import { a } from \"./a\";export const c = a;",
        "impliedFormat": "commonjs"
      },
      "./src/d.ts": {
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
          "./src/a.ts",
          "./src/b.ts",
          "./src/c.ts",
          "./src/d.ts"
        ]
      ]
    ],
    "options": {
      "declaration": true,
      "emitDeclarationOnly": true,
      "module": 2,
      "outFile": "./outFile.js"
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
        "impliedFormat": "commonjs"
      },
      "./src/a.ts": {
        "version": "-6435489413-export const a = 10;const aLocal = 10;const aa = 10;export const aaa = 10;",
        "impliedFormat": "commonjs"
      },
      "./src/b.ts": {
        "version": "-6189287562-export const b = 10;const bLocal = 10;",
        "impliedFormat": "commonjs"
      },
      "./src/c.ts": {
        "version": "3248317647-import { a } from \"./a\";export const c = a;",
        "impliedFormat": "commonjs"
      },
      "./src/d.ts": {
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
          "./src/a.ts",
          "./src/b.ts",
          "./src/c.ts",
          "./src/d.ts"
        ]
      ]
    ],
    "options": {
      "declaration": true,
      "module": 2,
      "outFile": "./outFile.js"
    }
  },
  "version": "FakeTSVersion"
}