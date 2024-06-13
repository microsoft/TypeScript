5:: no-change-run
Clean build will have check pending since it didnt type check
Incremental build has typechecked before this so wont have checkPending
TsBuild info text without affectedFilesPendingEmit:: /outfile.tsbuildinfo.readable.baseline.txt::
CleanBuild:
{
  "fileInfos": {
    "./lib/lib.d.ts": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
    "./src/a.ts": "-16641552193-export const a = \"hello\";",
    "./src/b.ts": "-13368947479-export const b = 10;"
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
    "declaration": true,
    "module": 2,
    "outFile": "./outFile.js"
  },
  "checkPending": true,
  "version": "FakeTSVersion"
}
IncrementalBuild:
{
  "fileInfos": {
    "./lib/lib.d.ts": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
    "./src/a.ts": "-16641552193-export const a = \"hello\";",
    "./src/b.ts": "-13368947479-export const b = 10;"
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
    "declaration": true,
    "module": 2,
    "outFile": "./outFile.js"
  },
  "version": "FakeTSVersion"
}
15:: no-change-run
Clean build will have check pending since it didnt type check
Incremental build has typechecked before this so wont have checkPending
TsBuild info text without affectedFilesPendingEmit:: /outfile.tsbuildinfo.readable.baseline.txt::
CleanBuild:
{
  "fileInfos": {
    "./lib/lib.d.ts": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
    "./src/a.ts": "-16641552193-export const a = \"hello\";",
    "./src/b.ts": "-13368947479-export const b = 10;",
    "./src/c.ts": "-9150421116-export const c: number = \"hello\";"
  },
  "root": [
    [
      [
        2,
        4
      ],
      [
        "./src/a.ts",
        "./src/b.ts",
        "./src/c.ts"
      ]
    ]
  ],
  "options": {
    "declaration": true,
    "module": 2,
    "outFile": "./outFile.js"
  },
  "checkPending": true,
  "version": "FakeTSVersion"
}
IncrementalBuild:
{
  "fileInfos": {
    "./lib/lib.d.ts": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
    "./src/a.ts": "-16641552193-export const a = \"hello\";",
    "./src/b.ts": "-13368947479-export const b = 10;",
    "./src/c.ts": "-9150421116-export const c: number = \"hello\";"
  },
  "root": [
    [
      [
        2,
        4
      ],
      [
        "./src/a.ts",
        "./src/b.ts",
        "./src/c.ts"
      ]
    ]
  ],
  "options": {
    "declaration": true,
    "module": 2,
    "outFile": "./outFile.js"
  },
  "version": "FakeTSVersion"
}