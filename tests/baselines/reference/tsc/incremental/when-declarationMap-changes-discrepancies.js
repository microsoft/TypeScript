0:: error and enable declarationMap
Clean build does not emit any file so will have emitSignatures with all files since they are not emitted
Incremental build has emitSignatures from before, so it will have a.ts with signature since file.version isnt same
Incremental build will also have emitSignatureDtsMapDiffers for both files since the emitSignatures were without declarationMap but currentOptions have declrationMap
TsBuild info text without affectedFilesPendingEmit:: /src/project/tsconfig.tsbuildinfo.readable.baseline.txt::
CleanBuild:
{
  "program": {
    "fileInfos": {
      "../../lib/lib.d.ts": {
        "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "affectsGlobalScope": true
      },
      "./a.ts": {
        "version": "5515933561-const x: 20 = 10;",
        "affectsGlobalScope": true
      },
      "./b.ts": {
        "version": "2026006654-const y = 10;",
        "affectsGlobalScope": true
      }
    },
    "options": {
      "composite": true,
      "declaration": true,
      "declarationMap": true,
      "noEmitOnError": true
    },
    "referencedMap": {},
    "semanticDiagnosticsPerFile": [
      "../../lib/lib.d.ts",
      [
        "./a.ts",
        [
          {
            "file": "./a.ts",
            "start": 6,
            "length": 1,
            "code": 2322,
            "category": 1,
            "messageText": "Type '10' is not assignable to type '20'."
          }
        ]
      ],
      "./b.ts"
    ],
    "emitSignatures": [
      "./a.ts",
      "./b.ts"
    ]
  },
  "version": "FakeTSVersion"
}
IncrementalBuild:
{
  "program": {
    "fileInfos": {
      "../../lib/lib.d.ts": {
        "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "affectsGlobalScope": true
      },
      "./a.ts": {
        "version": "5515933561-const x: 20 = 10;",
        "affectsGlobalScope": true
      },
      "./b.ts": {
        "version": "2026006654-const y = 10;",
        "affectsGlobalScope": true
      }
    },
    "options": {
      "composite": true,
      "declaration": true,
      "declarationMap": true,
      "noEmitOnError": true
    },
    "referencedMap": {},
    "semanticDiagnosticsPerFile": [
      "../../lib/lib.d.ts",
      [
        "./a.ts",
        [
          {
            "file": "./a.ts",
            "start": 6,
            "length": 1,
            "code": 2322,
            "category": 1,
            "messageText": "Type '10' is not assignable to type '20'."
          }
        ]
      ],
      "./b.ts"
    ],
    "emitSignatures": [
      [
        "./a.ts",
        [
          "-4001438729-declare const x = 10;\n"
        ]
      ],
      [
        "./b.ts",
        []
      ]
    ],
    "latestChangedDtsFile": "FakeFileName"
  },
  "version": "FakeTSVersion"
}