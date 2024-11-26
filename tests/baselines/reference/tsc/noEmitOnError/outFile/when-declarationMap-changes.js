currentDirectory:: /home/src/workspaces/project useCaseSensitiveFileNames:: false
Input::
//// [/home/src/workspaces/project/tsconfig.json]
{
  "compilerOptions": {
    "noEmitOnError": true,
    "declaration": true,
    "composite": true,
    "outFile": "../outFile.js"
  }
}

//// [/home/src/workspaces/project/a.ts]
const x = 10;

//// [/home/src/workspaces/project/b.ts]
const y = 10;

//// [/home/src/tslibs/TS/Lib/lib.d.ts]
/// <reference no-default-lib="true"/>
interface Boolean {}
interface Function {}
interface CallableFunction {}
interface NewableFunction {}
interface IArguments {}
interface Number { toExponential: any; }
interface Object {}
interface RegExp {}
interface String { charAt: any; }
interface Array<T> { length: number; [n: number]: T; }
interface ReadonlyArray<T> {}
declare const console: { log(msg: any): void; };


/home/src/tslibs/TS/Lib/tsc.js 
Output::


//// [/home/src/workspaces/outFile.js]
var x = 10;
var y = 10;


//// [/home/src/workspaces/outFile.d.ts]
declare const x = 10;
declare const y = 10;


//// [/home/src/workspaces/outFile.tsbuildinfo]
{"fileNames":["../tslibs/ts/lib/lib.d.ts","./project/a.ts","./project/b.ts"],"fileInfos":["3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","5029505981-const x = 10;","2026006654-const y = 10;"],"root":[2,3],"options":{"composite":true,"declaration":true,"noEmitOnError":true,"outFile":"./outFile.js"},"outSignature":"-2781996726-declare const x = 10;\ndeclare const y = 10;\n","latestChangedDtsFile":"./outFile.d.ts","version":"FakeTSVersion"}

//// [/home/src/workspaces/outFile.tsbuildinfo.readable.baseline.txt]
{
  "fileNames": [
    "../tslibs/ts/lib/lib.d.ts",
    "./project/a.ts",
    "./project/b.ts"
  ],
  "fileInfos": {
    "../tslibs/ts/lib/lib.d.ts": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
    "./project/a.ts": "5029505981-const x = 10;",
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
    "noEmitOnError": true,
    "outFile": "./outFile.js"
  },
  "outSignature": "-2781996726-declare const x = 10;\ndeclare const y = 10;\n",
  "latestChangedDtsFile": "./outFile.d.ts",
  "version": "FakeTSVersion",
  "size": 835
}


exitCode:: ExitStatus.Success

Change:: error and enable declarationMap

Input::
//// [/home/src/workspaces/project/a.ts]
const x: 20 = 10;


/home/src/tslibs/TS/Lib/tsc.js --declarationMap
Output::
[96ma.ts[0m:[93m1[0m:[93m7[0m - [91merror[0m[90m TS2322: [0mType '10' is not assignable to type '20'.

[7m1[0m const x: 20 = 10;
[7m [0m [91m      ~[0m


Found 1 error in a.ts[90m:1[0m



//// [/home/src/workspaces/outFile.tsbuildinfo]
{"fileNames":["../tslibs/ts/lib/lib.d.ts","./project/a.ts","./project/b.ts"],"fileInfos":["3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","5515933561-const x: 20 = 10;","2026006654-const y = 10;"],"root":[2,3],"options":{"composite":true,"declaration":true,"declarationMap":true,"noEmitOnError":true,"outFile":"./outFile.js"},"semanticDiagnosticsPerFile":[[2,[{"start":6,"length":1,"code":2322,"category":1,"messageText":"Type '10' is not assignable to type '20'."}]]],"outSignature":["-2781996726-declare const x = 10;\ndeclare const y = 10;\n"],"latestChangedDtsFile":"./outFile.d.ts","pendingEmit":false,"version":"FakeTSVersion"}

//// [/home/src/workspaces/outFile.tsbuildinfo.readable.baseline.txt]
{
  "fileNames": [
    "../tslibs/ts/lib/lib.d.ts",
    "./project/a.ts",
    "./project/b.ts"
  ],
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
  "latestChangedDtsFile": "./outFile.d.ts",
  "pendingEmit": [
    "Js | Dts | DtsMap",
    false
  ],
  "version": "FakeTSVersion",
  "size": 1026
}


exitCode:: ExitStatus.DiagnosticsPresent_OutputsSkipped

Change:: fix error declarationMap

Input::
//// [/home/src/workspaces/project/a.ts]
const x = 10;


/home/src/tslibs/TS/Lib/tsc.js --declarationMap
Output::


//// [/home/src/workspaces/outFile.js] file written with same contents
//// [/home/src/workspaces/outFile.d.ts]
declare const x = 10;
declare const y = 10;
//# sourceMappingURL=outFile.d.ts.map

//// [/home/src/workspaces/outFile.tsbuildinfo]
{"fileNames":["../tslibs/ts/lib/lib.d.ts","./project/a.ts","./project/b.ts"],"fileInfos":["3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","5029505981-const x = 10;","2026006654-const y = 10;"],"root":[2,3],"options":{"composite":true,"declaration":true,"declarationMap":true,"noEmitOnError":true,"outFile":"./outFile.js"},"outSignature":"-2781996726-declare const x = 10;\ndeclare const y = 10;\n","latestChangedDtsFile":"./outFile.d.ts","version":"FakeTSVersion"}

//// [/home/src/workspaces/outFile.tsbuildinfo.readable.baseline.txt]
{
  "fileNames": [
    "../tslibs/ts/lib/lib.d.ts",
    "./project/a.ts",
    "./project/b.ts"
  ],
  "fileInfos": {
    "../tslibs/ts/lib/lib.d.ts": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
    "./project/a.ts": "5029505981-const x = 10;",
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
  "outSignature": "-2781996726-declare const x = 10;\ndeclare const y = 10;\n",
  "latestChangedDtsFile": "./outFile.d.ts",
  "version": "FakeTSVersion",
  "size": 857
}

//// [/home/src/workspaces/outFile.d.ts.map]
{"version":3,"file":"outFile.d.ts","sourceRoot":"","sources":["project/a.ts","project/b.ts"],"names":[],"mappings":"AAAA,QAAA,MAAM,CAAC,KAAK,CAAC;ACAb,QAAA,MAAM,CAAC,KAAK,CAAC"}


exitCode:: ExitStatus.Success
