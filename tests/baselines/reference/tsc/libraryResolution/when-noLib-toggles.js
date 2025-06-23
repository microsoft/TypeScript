currentDirectory:: /home/src/workspaces/project useCaseSensitiveFileNames:: false
Input::
//// [/home/src/workspaces/project/a.d.ts]
declare const a = "hello";

//// [/home/src/workspaces/project/b.ts]
const b = 10;

//// [/home/src/workspaces/project/tsconfig.json]
{
  "compilerOptions": {
    "declaration": true,
    "incremental": true,
    "lib": [
      "es6"
    ]
  }
}

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


//// [/home/src/tslibs/TS/Lib/lib.es2015.d.ts] *Lib*

//// [/home/src/workspaces/project/b.js]
var b = 10;


//// [/home/src/workspaces/project/b.d.ts]
declare const b = 10;


//// [/home/src/workspaces/project/tsconfig.tsbuildinfo]
{"fileNames":["../../tslibs/ts/lib/lib.es2015.d.ts","./a.d.ts","./b.ts"],"fileInfos":[{"version":"3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true},{"version":"-5371488691-declare const a = \"hello\";","affectsGlobalScope":true},{"version":"2387014439-const b = 10;","signature":"-1009346399-declare const b = 10;\n","affectsGlobalScope":true}],"root":[2,3],"options":{"declaration":true},"version":"FakeTSVersion"}

//// [/home/src/workspaces/project/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "fileNames": [
    "../../tslibs/ts/lib/lib.es2015.d.ts",
    "./a.d.ts",
    "./b.ts"
  ],
  "fileInfos": {
    "../../tslibs/ts/lib/lib.es2015.d.ts": {
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
  "size": 832
}


Program root files: [
  "/home/src/workspaces/project/a.d.ts",
  "/home/src/workspaces/project/b.ts"
]
Program options: {
  "declaration": true,
  "incremental": true,
  "lib": [
    "lib.es2015.d.ts"
  ],
  "configFilePath": "/home/src/workspaces/project/tsconfig.json"
}
Program structureReused: Not
Program files::
/home/src/tslibs/TS/Lib/lib.es2015.d.ts
/home/src/workspaces/project/a.d.ts
/home/src/workspaces/project/b.ts

Semantic diagnostics in builder refreshed for::
/home/src/tslibs/TS/Lib/lib.es2015.d.ts
/home/src/workspaces/project/a.d.ts
/home/src/workspaces/project/b.ts

Shape signatures in builder refreshed for::
/home/src/tslibs/ts/lib/lib.es2015.d.ts (used version)
/home/src/workspaces/project/a.d.ts (used version)
/home/src/workspaces/project/b.ts (computed .d.ts during emit)

exitCode:: ExitStatus.Success

Change:: no-change-run

Input::

/home/src/tslibs/TS/Lib/tsc.js --noLib
Output::
[91merror[0m[90m TS2318: [0mCannot find global type 'Array'.

[91merror[0m[90m TS2318: [0mCannot find global type 'Boolean'.

[91merror[0m[90m TS2318: [0mCannot find global type 'Function'.

[91merror[0m[90m TS2318: [0mCannot find global type 'IArguments'.

[91merror[0m[90m TS2318: [0mCannot find global type 'Number'.

[91merror[0m[90m TS2318: [0mCannot find global type 'Object'.

[91merror[0m[90m TS2318: [0mCannot find global type 'RegExp'.

[91merror[0m[90m TS2318: [0mCannot find global type 'String'.

[96mtsconfig.json[0m:[93m5[0m:[93m5[0m - [91merror[0m[90m TS5053: [0mOption 'lib' cannot be specified with option 'noLib'.

[7m5[0m     "lib": [
[7m [0m [91m    ~~~~~[0m


Found 9 errors in the same file, starting at: tsconfig.json[90m:5[0m



//// [/home/src/workspaces/project/b.js] file written with same contents
//// [/home/src/workspaces/project/b.d.ts] file written with same contents
//// [/home/src/workspaces/project/tsconfig.tsbuildinfo]
{"fileNames":["./a.d.ts","./b.ts"],"fileInfos":[{"version":"-5371488691-declare const a = \"hello\";","affectsGlobalScope":true},{"version":"2387014439-const b = 10;","signature":"-1009346399-declare const b = 10;\n","affectsGlobalScope":true}],"root":[1,2],"options":{"declaration":true},"semanticDiagnosticsPerFile":[1,2],"version":"FakeTSVersion"}

//// [/home/src/workspaces/project/tsconfig.tsbuildinfo.readable.baseline.txt]
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
      "not cached or not changed"
    ],
    [
      "./b.ts",
      "not cached or not changed"
    ]
  ],
  "version": "FakeTSVersion",
  "size": 350
}


Program root files: [
  "/home/src/workspaces/project/a.d.ts",
  "/home/src/workspaces/project/b.ts"
]
Program options: {
  "declaration": true,
  "incremental": true,
  "lib": [
    "lib.es2015.d.ts"
  ],
  "noLib": true,
  "configFilePath": "/home/src/workspaces/project/tsconfig.json"
}
Program structureReused: Not
Program files::
/home/src/workspaces/project/a.d.ts
/home/src/workspaces/project/b.ts

No cached semantic diagnostics in the builder::

Shape signatures in builder refreshed for::
/home/src/workspaces/project/a.d.ts (used version)
/home/src/workspaces/project/b.ts (computed .d.ts)

exitCode:: ExitStatus.DiagnosticsPresent_OutputsGenerated
