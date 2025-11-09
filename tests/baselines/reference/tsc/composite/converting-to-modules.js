currentDirectory:: /home/src/workspaces/project useCaseSensitiveFileNames:: false
Input::
//// [/home/src/workspaces/project/src/main.ts]
const x = 10;

//// [/home/src/workspaces/project/tsconfig.json]
{
  "compilerOptions": {
    "module": "none",
    "composite": true
  }
}

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
[96mtsconfig.json[0m:[93m3[0m:[93m15[0m - [91merror[0m[90m TS5107: [0mOption 'module=None' is deprecated and will stop functioning in TypeScript 7.0. Specify compilerOption '"ignoreDeprecations": "6.0"' to silence this error.

[7m3[0m     "module": "none",
[7m [0m [91m              ~~~~~~[0m


Found 1 error in tsconfig.json[90m:3[0m



//// [/home/src/workspaces/project/src/main.js]
var x = 10;


//// [/home/src/workspaces/project/src/main.d.ts]
declare const x = 10;


//// [/home/src/workspaces/project/tsconfig.tsbuildinfo]
{"fileNames":["../../tslibs/ts/lib/lib.d.ts","./src/main.ts"],"fileInfos":[{"version":"-25093698414-interface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true},{"version":"5029505981-const x = 10;","signature":"-4001438729-declare const x = 10;\n","affectsGlobalScope":true}],"root":[2],"options":{"composite":true,"module":0},"semanticDiagnosticsPerFile":[1,2],"latestChangedDtsFile":"./src/main.d.ts","version":"FakeTSVersion"}

//// [/home/src/workspaces/project/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "fileNames": [
    "../../tslibs/ts/lib/lib.d.ts",
    "./src/main.ts"
  ],
  "fileInfos": {
    "../../tslibs/ts/lib/lib.d.ts": {
      "original": {
        "version": "-25093698414-interface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "affectsGlobalScope": true
      },
      "version": "-25093698414-interface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
      "signature": "-25093698414-interface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
      "affectsGlobalScope": true
    },
    "./src/main.ts": {
      "original": {
        "version": "5029505981-const x = 10;",
        "signature": "-4001438729-declare const x = 10;\n",
        "affectsGlobalScope": true
      },
      "version": "5029505981-const x = 10;",
      "signature": "-4001438729-declare const x = 10;\n",
      "affectsGlobalScope": true
    }
  },
  "root": [
    [
      2,
      "./src/main.ts"
    ]
  ],
  "options": {
    "composite": true,
    "module": 0
  },
  "semanticDiagnosticsPerFile": [
    [
      "../../tslibs/ts/lib/lib.d.ts",
      "not cached or not changed"
    ],
    [
      "./src/main.ts",
      "not cached or not changed"
    ]
  ],
  "latestChangedDtsFile": "./src/main.d.ts",
  "version": "FakeTSVersion",
  "size": 783
}


exitCode:: ExitStatus.DiagnosticsPresent_OutputsGenerated

Change:: convert to modules

Input::
//// [/home/src/workspaces/project/tsconfig.json]
{
  "compilerOptions": {
    "module": "es2015",
    "composite": true
  }
}


/home/src/tslibs/TS/Lib/tsc.js 
Output::


//// [/home/src/workspaces/project/src/main.js] file written with same contents
//// [/home/src/workspaces/project/tsconfig.tsbuildinfo]
{"fileNames":["../../tslibs/ts/lib/lib.d.ts","./src/main.ts"],"fileInfos":[{"version":"-25093698414-interface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true},{"version":"5029505981-const x = 10;","signature":"-4001438729-declare const x = 10;\n","affectsGlobalScope":true}],"root":[2],"options":{"composite":true,"module":5},"latestChangedDtsFile":"./src/main.d.ts","version":"FakeTSVersion"}

//// [/home/src/workspaces/project/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "fileNames": [
    "../../tslibs/ts/lib/lib.d.ts",
    "./src/main.ts"
  ],
  "fileInfos": {
    "../../tslibs/ts/lib/lib.d.ts": {
      "original": {
        "version": "-25093698414-interface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "affectsGlobalScope": true
      },
      "version": "-25093698414-interface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
      "signature": "-25093698414-interface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
      "affectsGlobalScope": true
    },
    "./src/main.ts": {
      "original": {
        "version": "5029505981-const x = 10;",
        "signature": "-4001438729-declare const x = 10;\n",
        "affectsGlobalScope": true
      },
      "version": "5029505981-const x = 10;",
      "signature": "-4001438729-declare const x = 10;\n",
      "affectsGlobalScope": true
    }
  },
  "root": [
    [
      2,
      "./src/main.ts"
    ]
  ],
  "options": {
    "composite": true,
    "module": 5
  },
  "latestChangedDtsFile": "./src/main.d.ts",
  "version": "FakeTSVersion",
  "size": 748
}


exitCode:: ExitStatus.Success
