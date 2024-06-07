8:: No Change run with checking
*** Needs explanation
TsBuild info text without affectedFilesPendingEmit:: /outfile.tsbuildinfo.readable.baseline.txt::
CleanBuild:
{
  "fileInfos": {
    "./lib/lib.d.ts": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
    "./src/a.ts": "-14000546910-export const a = \"hello",
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
  "semanticDiagnosticsPerFile": [
    [
      "./lib/lib.d.ts",
      "not cached"
    ],
    [
      "./src/a.ts",
      "not cached"
    ],
    [
      "./src/b.ts",
      "not cached"
    ]
  ],
  "version": "FakeTSVersion"
}
IncrementalBuild:
{
  "fileInfos": {
    "./lib/lib.d.ts": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
    "./src/a.ts": "-14000546910-export const a = \"hello",
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
    "noCheck": true,
    "outFile": "./outFile.js"
  },
  "semanticDiagnosticsPerFile": [
    [
      "./lib/lib.d.ts",
      "not cached"
    ],
    [
      "./src/a.ts",
      "not cached"
    ],
    [
      "./src/b.ts",
      "not cached"
    ]
  ],
  "version": "FakeTSVersion"
}