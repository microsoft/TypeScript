0:: Add class3 to project1 and build it
Ts buildinfo will not be updated in incremental build so it will have semantic diagnostics cached from previous build
But in clean build because of global diagnostics, semantic diagnostics are not queried so not cached in tsbuildinfo
TsBuild info text without affectedFilesPendingEmit:: /home/src/workspaces/projects/project2/tsconfig.tsbuildinfo.readable.baseline.txt::
CleanBuild:
{
  "fileInfos": {
    "../../../tslibs/ts/lib/lib.d.ts": {
      "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
      "affectsGlobalScope": true
    },
    "../project1/class1.d.ts": {
      "version": "-3469237238-declare class class1 {}",
      "affectsGlobalScope": true
    },
    "./class2.ts": {
      "version": "777969115-class class2 {}",
      "affectsGlobalScope": true
    }
  },
  "root": [
    [
      3,
      "./class2.ts"
    ]
  ],
  "options": {
    "composite": true,
    "module": 0
  },
  "latestChangedDtsFile": "FakeFileName",
  "version": "FakeTSVersion"
}
IncrementalBuild:
{
  "fileInfos": {
    "../../../tslibs/ts/lib/lib.d.ts": {
      "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
      "affectsGlobalScope": true
    },
    "../project1/class1.d.ts": {
      "version": "-3469237238-declare class class1 {}",
      "affectsGlobalScope": true
    },
    "./class2.ts": {
      "version": "777969115-class class2 {}",
      "affectsGlobalScope": true
    }
  },
  "root": [
    [
      3,
      "./class2.ts"
    ]
  ],
  "options": {
    "composite": true,
    "module": 0
  },
  "latestChangedDtsFile": "FakeFileName",
  "errors": true,
  "version": "FakeTSVersion"
}