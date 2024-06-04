0:: reports syntax errors after change to config file
During incremental build, tsbuildinfo is not emitted, so declaration option is not present
Clean build has declaration option in tsbuildinfo
TsBuild info text without affectedFilesPendingEmit:: /outfile.tsbuildinfo.readable.baseline.txt::
CleanBuild:
{
  "program": {
    "fileInfos": {
      "./lib/lib.d.ts": {
        "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "impliedFormat": "commonjs"
      },
      "./src/a.ts": {
        "version": "4646078106-export function foo() { }",
        "impliedFormat": "commonjs"
      },
      "./src/b.ts": {
        "version": "1045484683-export function bar() { }",
        "impliedFormat": "commonjs"
      }
    },
    "root": [
      [
        2,
        "./src/a.ts"
      ],
      [
        3,
        "./src/b.ts"
      ]
    ],
    "options": {
      "composite": true,
      "declaration": true,
      "module": 2,
      "outFile": "./outFile.js"
    },
    "changeFileSet": [
      "./lib/lib.d.ts",
      "./src/a.ts",
      "./src/b.ts"
    ]
  },
  "version": "FakeTSVersion"
}
IncrementalBuild:
{
  "program": {
    "fileInfos": {
      "./lib/lib.d.ts": {
        "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "impliedFormat": "commonjs"
      },
      "./src/a.ts": {
        "version": "4646078106-export function foo() { }",
        "impliedFormat": "commonjs"
      },
      "./src/b.ts": {
        "version": "1045484683-export function bar() { }",
        "impliedFormat": "commonjs"
      }
    },
    "root": [
      [
        2,
        "./src/a.ts"
      ],
      [
        3,
        "./src/b.ts"
      ]
    ],
    "options": {
      "composite": true,
      "module": 2,
      "outFile": "./outFile.js"
    },
    "changeFileSet": [
      "./lib/lib.d.ts",
      "./src/a.ts",
      "./src/b.ts"
    ]
  },
  "version": "FakeTSVersion"
}