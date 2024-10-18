0:: reports syntax errors after change to config file
During incremental build, tsbuildinfo is not emitted, so declaration option is not present
Clean build has declaration option in tsbuildinfo
TsBuild info text without affectedFilesPendingEmit:: /home/src/workspaces/outfile.tsbuildinfo.readable.baseline.txt::
CleanBuild:
{
  "fileInfos": {
    "../tslibs/ts/lib/lib.d.ts": {
      "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
      "impliedFormat": "commonjs"
    },
    "./project/a.ts": {
      "version": "4646078106-export function foo() { }",
      "impliedFormat": "commonjs"
    },
    "./project/b.ts": {
      "version": "1045484683-export function bar() { }",
      "impliedFormat": "commonjs"
    }
  },
  "root": [
    [
      2,
      "./project/a.ts"
    ],
    [
      3,
      "./project/b.ts"
    ]
  ],
  "options": {
    "composite": true,
    "declaration": true,
    "module": 2,
    "outFile": "./outFile.js"
  },
  "outSignature": "-5340070911-declare module \"a\" {\n    export function foo(): void;\n}\ndeclare module \"b\" {\n    export function bar(): void;\n}\n",
  "latestChangedDtsFile": "FakeFileName",
  "errors": true,
  "version": "FakeTSVersion"
}
IncrementalBuild:
{
  "fileInfos": {
    "../tslibs/ts/lib/lib.d.ts": {
      "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
      "impliedFormat": "commonjs"
    },
    "./project/a.ts": {
      "version": "4646078106-export function foo() { }",
      "impliedFormat": "commonjs"
    },
    "./project/b.ts": {
      "version": "1045484683-export function bar() { }",
      "impliedFormat": "commonjs"
    }
  },
  "root": [
    [
      2,
      "./project/a.ts"
    ],
    [
      3,
      "./project/b.ts"
    ]
  ],
  "options": {
    "composite": true,
    "module": 2,
    "outFile": "./outFile.js"
  },
  "outSignature": "-5340070911-declare module \"a\" {\n    export function foo(): void;\n}\ndeclare module \"b\" {\n    export function bar(): void;\n}\n",
  "latestChangedDtsFile": "FakeFileName",
  "errors": true,
  "version": "FakeTSVersion"
}