currentDirectory:: / useCaseSensitiveFileNames: false
Input::
//// [/lib/lib.d.ts]
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

//// [/src/project/a.ts]
const x = 10;

//// [/src/project/b.ts]
const y = 10;

//// [/src/project/tsconfig.json]
{
  "compilerOptions": {
    "noEmitOnError": true,
    "declaration": true,
    "composite": true,
    "outFile": "../outFile.js"
  }
}



Output::
/lib/tsc --p /src/project
exitCode:: ExitStatus.Success


//// [/src/outFile.d.ts]
declare const x = 10;
declare const y = 10;


//// [/src/outFile.js]
var x = 10;
var y = 10;


//// [/src/outFile.tsbuildinfo]
{"bundle":{"commonSourceDirectory":"./project","sourceFiles":["./project/a.ts","./project/b.ts"],"js":{"sections":[{"pos":0,"end":24,"kind":"text"}],"hash":"-5596269010-var x = 10;\nvar y = 10;\n"},"dts":{"sections":[{"pos":0,"end":44,"kind":"text"}],"hash":"-2781996726-declare const x = 10;\ndeclare const y = 10;\n"}},"program":{"fileNames":["../lib/lib.d.ts","./project/a.ts","./project/b.ts"],"fileInfos":["3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","5029505981-const x = 10;","2026006654-const y = 10;"],"root":[2,3],"options":{"composite":true,"declaration":true,"noEmitOnError":true,"outFile":"./outFile.js"},"outSignature":"-2781996726-declare const x = 10;\ndeclare const y = 10;\n","latestChangedDtsFile":"./outFile.d.ts"},"version":"FakeTSVersion"}

//// [/src/outFile.tsbuildinfo.baseline.txt]
======================================================================
File:: /src/outFile.js
----------------------------------------------------------------------
text: (0-24)
var x = 10;
var y = 10;

======================================================================
======================================================================
File:: /src/outFile.d.ts
----------------------------------------------------------------------
text: (0-44)
declare const x = 10;
declare const y = 10;

======================================================================

//// [/src/outFile.tsbuildinfo.readable.baseline.txt]
{
  "bundle": {
    "commonSourceDirectory": "./project",
    "sourceFiles": [
      "./project/a.ts",
      "./project/b.ts"
    ],
    "js": {
      "sections": [
        {
          "pos": 0,
          "end": 24,
          "kind": "text"
        }
      ],
      "hash": "-5596269010-var x = 10;\nvar y = 10;\n"
    },
    "dts": {
      "sections": [
        {
          "pos": 0,
          "end": 44,
          "kind": "text"
        }
      ],
      "hash": "-2781996726-declare const x = 10;\ndeclare const y = 10;\n"
    }
  },
  "program": {
    "fileNames": [
      "../lib/lib.d.ts",
      "./project/a.ts",
      "./project/b.ts"
    ],
    "fileInfos": {
      "../lib/lib.d.ts": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
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
    "latestChangedDtsFile": "./outFile.d.ts"
  },
  "version": "FakeTSVersion",
  "size": 1157
}



Change:: error and enable declarationMap
Input::
//// [/src/project/a.ts]
const x: 20 = 10;



Output::
/lib/tsc --p /src/project --declarationMap
[96msrc/project/a.ts[0m:[93m1[0m:[93m7[0m - [91merror[0m[90m TS2322: [0mType '10' is not assignable to type '20'.

[7m1[0m const x: 20 = 10;
[7m [0m [91m      ~[0m


Found 1 error in src/project/a.ts[90m:1[0m

exitCode:: ExitStatus.DiagnosticsPresent_OutputsSkipped




Change:: fix error declarationMap
Input::
//// [/src/project/a.ts]
const x = 10;



Output::
/lib/tsc --p /src/project --declarationMap
exitCode:: ExitStatus.Success


//// [/src/outFile.d.ts]
declare const x = 10;
declare const y = 10;
//# sourceMappingURL=outFile.d.ts.map

//// [/src/outFile.d.ts.map]
{"version":3,"file":"outFile.d.ts","sourceRoot":"","sources":["project/a.ts","project/b.ts"],"names":[],"mappings":"AAAA,QAAA,MAAM,CAAC,KAAK,CAAC;ACAb,QAAA,MAAM,CAAC,KAAK,CAAC"}

//// [/src/outFile.tsbuildinfo]
{"bundle":{"commonSourceDirectory":"./project","sourceFiles":["./project/a.ts","./project/b.ts"],"js":{"sections":[{"pos":0,"end":24,"kind":"text"}],"hash":"-5596269010-var x = 10;\nvar y = 10;\n"},"dts":{"sections":[{"pos":0,"end":44,"kind":"text"}],"mapHash":"12253058536-{\"version\":3,\"file\":\"outFile.d.ts\",\"sourceRoot\":\"\",\"sources\":[\"project/a.ts\",\"project/b.ts\"],\"names\":[],\"mappings\":\"AAAA,QAAA,MAAM,CAAC,KAAK,CAAC;ACAb,QAAA,MAAM,CAAC,KAAK,CAAC\"}","hash":"-2941022653-declare const x = 10;\ndeclare const y = 10;\n//# sourceMappingURL=outFile.d.ts.map"}},"program":{"fileNames":["../lib/lib.d.ts","./project/a.ts","./project/b.ts"],"fileInfos":["3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","5029505981-const x = 10;","2026006654-const y = 10;"],"root":[2,3],"options":{"composite":true,"declaration":true,"declarationMap":true,"noEmitOnError":true,"outFile":"./outFile.js"},"outSignature":"-2781996726-declare const x = 10;\ndeclare const y = 10;\n","latestChangedDtsFile":"./outFile.d.ts"},"version":"FakeTSVersion"}

//// [/src/outFile.tsbuildinfo.baseline.txt] file written with same contents
//// [/src/outFile.tsbuildinfo.readable.baseline.txt]
{
  "bundle": {
    "commonSourceDirectory": "./project",
    "sourceFiles": [
      "./project/a.ts",
      "./project/b.ts"
    ],
    "js": {
      "sections": [
        {
          "pos": 0,
          "end": 24,
          "kind": "text"
        }
      ],
      "hash": "-5596269010-var x = 10;\nvar y = 10;\n"
    },
    "dts": {
      "sections": [
        {
          "pos": 0,
          "end": 44,
          "kind": "text"
        }
      ],
      "hash": "-2941022653-declare const x = 10;\ndeclare const y = 10;\n//# sourceMappingURL=outFile.d.ts.map",
      "mapHash": "12253058536-{\"version\":3,\"file\":\"outFile.d.ts\",\"sourceRoot\":\"\",\"sources\":[\"project/a.ts\",\"project/b.ts\"],\"names\":[],\"mappings\":\"AAAA,QAAA,MAAM,CAAC,KAAK,CAAC;ACAb,QAAA,MAAM,CAAC,KAAK,CAAC\"}"
    }
  },
  "program": {
    "fileNames": [
      "../lib/lib.d.ts",
      "./project/a.ts",
      "./project/b.ts"
    ],
    "fileInfos": {
      "../lib/lib.d.ts": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
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
    "latestChangedDtsFile": "./outFile.d.ts"
  },
  "version": "FakeTSVersion",
  "size": 1440
}

