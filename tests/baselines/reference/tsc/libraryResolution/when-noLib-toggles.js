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

//// [/lib/lib.es2015.d.ts]
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

//// [/src/a.d.ts]
declare const a = "hello";

//// [/src/b.ts]
const b = 10;

//// [/src/tsconfig.json]
{
  "compilerOptions": {
    "declaration": true,
    "incremental": true,
    "lib": [
      "es6"
    ]
  }
}



Output::
/lib/tsc -p /src/tsconfig.json
exitCode:: ExitStatus.Success
Program root files: [
  "/src/a.d.ts",
  "/src/b.ts"
]
Program options: {
  "declaration": true,
  "incremental": true,
  "lib": [
    "lib.es2015.d.ts"
  ],
  "project": "/src/tsconfig.json",
  "configFilePath": "/src/tsconfig.json"
}
Program structureReused: Not
Program files::
/lib/lib.es2015.d.ts
/src/a.d.ts
/src/b.ts

Semantic diagnostics in builder refreshed for::
/lib/lib.es2015.d.ts
/src/a.d.ts
/src/b.ts

Shape signatures in builder refreshed for::
/lib/lib.es2015.d.ts (used version)
/src/a.d.ts (used version)
/src/b.ts (computed .d.ts during emit)


//// [/src/b.d.ts]
declare const b = 10;


//// [/src/b.js]
var b = 10;


//// [/src/tsconfig.tsbuildinfo]
{"fileNames":["../lib/lib.es2015.d.ts","./a.d.ts","./b.ts"],"fileInfos":[{"version":"3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true},{"version":"-5371488691-declare const a = \"hello\";","affectsGlobalScope":true},{"version":"2387014439-const b = 10;","signature":"-1009346399-declare const b = 10;\n","affectsGlobalScope":true}],"root":[2,3],"options":{"declaration":true},"version":"FakeTSVersion"}

//// [/src/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "fileNames": [
    "../lib/lib.es2015.d.ts",
    "./a.d.ts",
    "./b.ts"
  ],
  "fileInfos": {
    "../lib/lib.es2015.d.ts": {
      "original": {
        "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "affectsGlobalScope": true
      },
      "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
      "signature": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
      "affectsGlobalScope": true
    },
    "./a.d.ts": {
      "original": {
        "version": "-5371488691-declare const a = \"hello\";",
        "affectsGlobalScope": true
      },
      "version": "-5371488691-declare const a = \"hello\";",
      "signature": "-5371488691-declare const a = \"hello\";",
      "affectsGlobalScope": true
    },
    "./b.ts": {
      "original": {
        "version": "2387014439-const b = 10;",
        "signature": "-1009346399-declare const b = 10;\n",
        "affectsGlobalScope": true
      },
      "version": "2387014439-const b = 10;",
      "signature": "-1009346399-declare const b = 10;\n",
      "affectsGlobalScope": true
    }
  },
  "root": [
    [
      2,
      "./a.d.ts"
    ],
    [
      3,
      "./b.ts"
    ]
  ],
  "options": {
    "declaration": true
  },
  "version": "FakeTSVersion",
  "size": 819
}



Change:: no-change-run
Input::


Output::
/lib/tsc -p /src/tsconfig.json --noLib
[91merror[0m[90m TS2318: [0mCannot find global type 'Array'.

[91merror[0m[90m TS2318: [0mCannot find global type 'Boolean'.

[91merror[0m[90m TS2318: [0mCannot find global type 'Function'.

[91merror[0m[90m TS2318: [0mCannot find global type 'IArguments'.

[91merror[0m[90m TS2318: [0mCannot find global type 'Number'.

[91merror[0m[90m TS2318: [0mCannot find global type 'Object'.

[91merror[0m[90m TS2318: [0mCannot find global type 'RegExp'.

[91merror[0m[90m TS2318: [0mCannot find global type 'String'.

[96msrc/tsconfig.json[0m:[93m5[0m:[93m5[0m - [91merror[0m[90m TS5053: [0mOption 'lib' cannot be specified with option 'noLib'.

[7m5[0m     "lib": [
[7m [0m [91m    ~~~~~[0m


Found 9 errors in the same file, starting at: src/tsconfig.json[90m:5[0m

exitCode:: ExitStatus.DiagnosticsPresent_OutputsGenerated
Program root files: [
  "/src/a.d.ts",
  "/src/b.ts"
]
Program options: {
  "declaration": true,
  "incremental": true,
  "lib": [
    "lib.es2015.d.ts"
  ],
  "project": "/src/tsconfig.json",
  "noLib": true,
  "configFilePath": "/src/tsconfig.json"
}
Program structureReused: Not
Program files::
/src/a.d.ts
/src/b.ts

No cached semantic diagnostics in the builder::

Shape signatures in builder refreshed for::
/src/a.d.ts (used version)
/src/b.ts (computed .d.ts)


//// [/src/b.d.ts] file written with same contents
//// [/src/b.js] file written with same contents
//// [/src/tsconfig.tsbuildinfo]
{"fileNames":["./a.d.ts","./b.ts"],"fileInfos":[{"version":"-5371488691-declare const a = \"hello\";","affectsGlobalScope":true},{"version":"2387014439-const b = 10;","signature":"-1009346399-declare const b = 10;\n","affectsGlobalScope":true}],"root":[1,2],"options":{"declaration":true},"semanticDiagnosticsPerFile":[1,2],"version":"FakeTSVersion"}

//// [/src/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "fileNames": [
    "./a.d.ts",
    "./b.ts"
  ],
  "fileInfos": {
    "./a.d.ts": {
      "original": {
        "version": "-5371488691-declare const a = \"hello\";",
        "affectsGlobalScope": true
      },
      "version": "-5371488691-declare const a = \"hello\";",
      "signature": "-5371488691-declare const a = \"hello\";",
      "affectsGlobalScope": true
    },
    "./b.ts": {
      "original": {
        "version": "2387014439-const b = 10;",
        "signature": "-1009346399-declare const b = 10;\n",
        "affectsGlobalScope": true
      },
      "version": "2387014439-const b = 10;",
      "signature": "-1009346399-declare const b = 10;\n",
      "affectsGlobalScope": true
    }
  },
  "root": [
    [
      1,
      "./a.d.ts"
    ],
    [
      2,
      "./b.ts"
    ]
  ],
  "options": {
    "declaration": true
  },
  "semanticDiagnosticsPerFile": [
    [
      "./a.d.ts",
      "not cached"
    ],
    [
      "./b.ts",
      "not cached"
    ]
  ],
  "version": "FakeTSVersion",
  "size": 350
}

