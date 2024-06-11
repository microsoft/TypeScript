0:: error and enable declarationMap
Clean build does not emit any file so will not have outSignature
Incremental build has outSignature from before
TsBuild info text without affectedFilesPendingEmit:: /src/outfile.tsbuildinfo.readable.baseline.txt::
CleanBuild:
{
  "fileInfos": {
    "../lib/lib.d.ts": {
      "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
      "impliedFormat": "commonjs"
    },
    "./project/a.ts": {
      "version": "5515933561-const x: 20 = 10;",
      "impliedFormat": "commonjs"
    },
    "./project/b.ts": {
      "version": "2026006654-const y = 10;",
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
    "declarationMap": true,
    "noEmitOnError": true,
    "outFile": "./outFile.js"
  },
  "semanticDiagnosticsPerFile": [
    [
      "./project/a.ts",
      [
        {
          "start": 6,
          "length": 1,
          "code": 2322,
          "category": 1,
          "messageText": "Type '10' is not assignable to type '20'."
        }
      ]
    ]
  ],
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
      "version": "5515933561-const x: 20 = 10;",
      "impliedFormat": "commonjs"
    },
    "./project/b.ts": {
      "version": "2026006654-const y = 10;",
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
    "declarationMap": true,
    "noEmitOnError": true,
    "outFile": "./outFile.js"
  },
  "semanticDiagnosticsPerFile": [
    [
      "./project/a.ts",
      [
        {
          "start": 6,
          "length": 1,
          "code": 2322,
          "category": 1,
          "messageText": "Type '10' is not assignable to type '20'."
        }
      ]
    ]
  ],
  "outSignature": [
    "-2781996726-declare const x = 10;\ndeclare const y = 10;\n"
  ],
  "latestChangedDtsFile": "FakeFileName",
  "version": "FakeTSVersion"
}