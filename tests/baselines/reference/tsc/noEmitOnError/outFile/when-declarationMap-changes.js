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
[96mtsconfig.json[0m:[93m6[0m:[93m5[0m - [91merror[0m[90m TS5101: [0mOption 'outFile' is deprecated and will stop functioning in TypeScript 7.0. Specify compilerOption '"ignoreDeprecations": "6.0"' to silence this error.

[7m6[0m     "outFile": "../outFile.js"
[7m [0m [91m    ~~~~~~~~~[0m


Found 1 error in tsconfig.json[90m:6[0m



//// [/home/src/workspaces/outFile.tsbuildinfo]
{"fileNames":["../tslibs/ts/lib/lib.d.ts","./project/a.ts","./project/b.ts"],"fileInfos":["-25093698414-interface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","5029505981-const x = 10;","2026006654-const y = 10;"],"root":[2,3],"options":{"composite":true,"declaration":true,"noEmitOnError":true,"outFile":"./outFile.js"},"pendingEmit":false,"errors":true,"version":"FakeTSVersion"}

//// [/home/src/workspaces/outFile.tsbuildinfo.readable.baseline.txt]
{
  "fileNames": [
    "../tslibs/ts/lib/lib.d.ts",
    "./project/a.ts",
    "./project/b.ts"
  ],
  "fileInfos": {
    "../tslibs/ts/lib/lib.d.ts": "-25093698414-interface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
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
  "pendingEmit": [
    "Js | Dts",
    false
  ],
  "errors": true,
  "version": "FakeTSVersion",
  "size": 713
}


exitCode:: ExitStatus.DiagnosticsPresent_OutputsSkipped

Change:: error and enable declarationMap

Input::
//// [/home/src/workspaces/project/a.ts]
const x: 20 = 10;


/home/src/tslibs/TS/Lib/tsc.js --declarationMap
Output::
[96ma.ts[0m:[93m1[0m:[93m7[0m - [91merror[0m[90m TS2322: [0mType '10' is not assignable to type '20'.

[7m1[0m const x: 20 = 10;
[7m [0m [91m      ~[0m

[96mtsconfig.json[0m:[93m6[0m:[93m5[0m - [91merror[0m[90m TS5101: [0mOption 'outFile' is deprecated and will stop functioning in TypeScript 7.0. Specify compilerOption '"ignoreDeprecations": "6.0"' to silence this error.

[7m6[0m     "outFile": "../outFile.js"
[7m [0m [91m    ~~~~~~~~~[0m


Found 2 errors in 2 files.

Errors  Files
     1  a.ts[90m:1[0m
     1  tsconfig.json[90m:6[0m


//// [/home/src/workspaces/outFile.tsbuildinfo]
{"fileNames":["../tslibs/ts/lib/lib.d.ts","./project/a.ts","./project/b.ts"],"fileInfos":["-25093698414-interface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","5515933561-const x: 20 = 10;","2026006654-const y = 10;"],"root":[2,3],"options":{"composite":true,"declaration":true,"declarationMap":true,"noEmitOnError":true,"outFile":"./outFile.js"},"semanticDiagnosticsPerFile":[[2,[{"start":6,"length":1,"code":2322,"category":1,"messageText":"Type '10' is not assignable to type '20'."}]]],"pendingEmit":false,"version":"FakeTSVersion"}

//// [/home/src/workspaces/outFile.tsbuildinfo.readable.baseline.txt]
{
  "fileNames": [
    "../tslibs/ts/lib/lib.d.ts",
    "./project/a.ts",
    "./project/b.ts"
  ],
  "fileInfos": {
    "../tslibs/ts/lib/lib.d.ts": "-25093698414-interface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
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
  "pendingEmit": [
    "Js | Dts | DtsMap",
    false
  ],
  "version": "FakeTSVersion",
  "size": 868
}


exitCode:: ExitStatus.DiagnosticsPresent_OutputsSkipped

Change:: fix error declarationMap

Input::
//// [/home/src/workspaces/project/a.ts]
const x = 10;


/home/src/tslibs/TS/Lib/tsc.js --declarationMap
Output::
[96mtsconfig.json[0m:[93m6[0m:[93m5[0m - [91merror[0m[90m TS5101: [0mOption 'outFile' is deprecated and will stop functioning in TypeScript 7.0. Specify compilerOption '"ignoreDeprecations": "6.0"' to silence this error.

[7m6[0m     "outFile": "../outFile.js"
[7m [0m [91m    ~~~~~~~~~[0m


Found 1 error in tsconfig.json[90m:6[0m



//// [/home/src/workspaces/outFile.tsbuildinfo]
{"fileNames":["../tslibs/ts/lib/lib.d.ts","./project/a.ts","./project/b.ts"],"fileInfos":["-25093698414-interface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","5029505981-const x = 10;","2026006654-const y = 10;"],"root":[2,3],"options":{"composite":true,"declaration":true,"declarationMap":true,"noEmitOnError":true,"outFile":"./outFile.js"},"pendingEmit":false,"errors":true,"version":"FakeTSVersion"}

//// [/home/src/workspaces/outFile.tsbuildinfo.readable.baseline.txt]
{
  "fileNames": [
    "../tslibs/ts/lib/lib.d.ts",
    "./project/a.ts",
    "./project/b.ts"
  ],
  "fileInfos": {
    "../tslibs/ts/lib/lib.d.ts": "-25093698414-interface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
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
  "pendingEmit": [
    "Js | Dts | DtsMap",
    false
  ],
  "errors": true,
  "version": "FakeTSVersion",
  "size": 735
}


exitCode:: ExitStatus.DiagnosticsPresent_OutputsSkipped
