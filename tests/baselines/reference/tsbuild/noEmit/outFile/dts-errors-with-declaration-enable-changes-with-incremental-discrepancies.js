3:: no-change-run
Clean build will not have declaration and declarationMap
Incremental build will have previous buildInfo so will have dts and declaration and declarationMap
TsBuild info text without affectedFilesPendingEmit:: /home/src/projects/outfile.tsbuildinfo.readable.baseline.txt::
CleanBuild:
{
  "fileInfos": {
    "../tslibs/ts/lib/lib.d.ts": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
    "./project/a.ts": "7752727223-const a = class { private p = 10; };"
  },
  "root": [
    [
      2,
      "./project/a.ts"
    ]
  ],
  "options": {
    "outFile": "./outFile.js"
  },
  "version": "FakeTSVersion"
}
IncrementalBuild:
{
  "fileInfos": {
    "../tslibs/ts/lib/lib.d.ts": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
    "./project/a.ts": "7752727223-const a = class { private p = 10; };"
  },
  "root": [
    [
      2,
      "./project/a.ts"
    ]
  ],
  "options": {
    "declaration": true,
    "declarationMap": true,
    "outFile": "./outFile.js"
  },
  "version": "FakeTSVersion"
}
7:: With declaration and declarationMap noEmit
Clean build will have declaration and declarationMap
Incremental build will have previous buildInfo so will have declaration and declarationMap
TsBuild info text without affectedFilesPendingEmit:: /home/src/projects/outfile.tsbuildinfo.readable.baseline.txt::
CleanBuild:
{
  "fileInfos": {
    "../tslibs/ts/lib/lib.d.ts": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
    "./project/a.ts": "9520728827-const a = class { public p = 10; };"
  },
  "root": [
    [
      2,
      "./project/a.ts"
    ]
  ],
  "options": {
    "declaration": true,
    "declarationMap": true,
    "outFile": "./outFile.js"
  },
  "version": "FakeTSVersion"
}
IncrementalBuild:
{
  "fileInfos": {
    "../tslibs/ts/lib/lib.d.ts": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
    "./project/a.ts": "9520728827-const a = class { public p = 10; };"
  },
  "root": [
    [
      2,
      "./project/a.ts"
    ]
  ],
  "options": {
    "declaration": true,
    "outFile": "./outFile.js"
  },
  "version": "FakeTSVersion"
}