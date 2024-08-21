0:: error and enable declarationMap
Clean build does not emit any file so will not have outSignature
Incremental build has outSignature from before
TsBuild info text without affectedFilesPendingEmit:: /home/src/workspaces/outfile.tsbuildinfo.readable.baseline.txt::
CleanBuild:
{
  "fileInfos": {
    "../tslibs/ts/lib/lib.d.ts": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
    "./project/a.ts": "5515933561-const x: 20 = 10;",
    "./project/b.ts": "2026006654-const y = 10;"
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
    "declarationMap": true,
    "noEmitOnError": true,
    "outFile": "./outFile.js"
  },
  "version": "FakeTSVersion"
}
IncrementalBuild:
{
  "fileInfos": {
    "../tslibs/ts/lib/lib.d.ts": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
    "./project/a.ts": "5515933561-const x: 20 = 10;",
    "./project/b.ts": "2026006654-const y = 10;"
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
    "declarationMap": true,
    "noEmitOnError": true,
    "outFile": "./outFile.js"
  },
  "outSignature": [
    "-2781996726-declare const x = 10;\ndeclare const y = 10;\n"
  ],
  "latestChangedDtsFile": "FakeFileName",
  "version": "FakeTSVersion"
}