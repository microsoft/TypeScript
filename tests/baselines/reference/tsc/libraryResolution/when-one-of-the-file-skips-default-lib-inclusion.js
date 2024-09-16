currentDirectory:: /home/src/workspaces/project useCaseSensitiveFileNames:: false
Input::
//// [/home/src/workspaces/project/a.d.ts]
/// <reference no-default-lib="true"/>
/// <reference lib="es6"/>
declare const a = "hello";


//// [/home/src/workspaces/project/b.d.ts]
export const b = 10;

//// [/home/src/workspaces/project/tsconfig.json]
{
  "compilerOptions": {
    "lib": [
      "es6",
      "dom"
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


/home/src/tslibs/TS/Lib/tsc.js -i --explainFiles
Output::
../../tslibs/TS/Lib/lib.es2015.d.ts
  Library referenced via 'es6' from file 'a.d.ts'
a.d.ts
  Matched by default include pattern '**/*'
b.d.ts
  Matched by default include pattern '**/*'


//// [/home/src/tslibs/TS/Lib/lib.es2015.d.ts] *Lib*

//// [/home/src/workspaces/project/tsconfig.tsbuildinfo]
{"fileNames":["../../tslibs/ts/lib/lib.es2015.d.ts","./a.d.ts","./b.d.ts"],"fileInfos":[{"version":"3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true},{"version":"10808475215-/// <reference no-default-lib=\"true\"/>\n/// <reference lib=\"es6\"/>\ndeclare const a = \"hello\";\n","affectsGlobalScope":true},"-13368947479-export const b = 10;"],"root":[2,3],"version":"FakeTSVersion"}

//// [/home/src/workspaces/project/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "fileNames": [
    "../../tslibs/ts/lib/lib.es2015.d.ts",
    "./a.d.ts",
    "./b.d.ts"
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
        "version": "10808475215-/// <reference no-default-lib=\"true\"/>\n/// <reference lib=\"es6\"/>\ndeclare const a = \"hello\";\n",
        "affectsGlobalScope": true
      },
      "version": "10808475215-/// <reference no-default-lib=\"true\"/>\n/// <reference lib=\"es6\"/>\ndeclare const a = \"hello\";\n",
      "signature": "10808475215-/// <reference no-default-lib=\"true\"/>\n/// <reference lib=\"es6\"/>\ndeclare const a = \"hello\";\n",
      "affectsGlobalScope": true
    },
    "./b.d.ts": {
      "version": "-13368947479-export const b = 10;",
      "signature": "-13368947479-export const b = 10;"
    }
  },
  "root": [
    [
      2,
      "./a.d.ts"
    ],
    [
      3,
      "./b.d.ts"
    ]
  ],
  "version": "FakeTSVersion",
  "size": 798
}


Program root files: [
  "/home/src/workspaces/project/a.d.ts",
  "/home/src/workspaces/project/b.d.ts"
]
Program options: {
  "lib": [
    "lib.es2015.d.ts",
    "lib.dom.d.ts"
  ],
  "incremental": true,
  "explainFiles": true,
  "configFilePath": "/home/src/workspaces/project/tsconfig.json"
}
Program structureReused: Not
Program files::
/home/src/tslibs/TS/Lib/lib.es2015.d.ts
/home/src/workspaces/project/a.d.ts
/home/src/workspaces/project/b.d.ts

Semantic diagnostics in builder refreshed for::
/home/src/tslibs/TS/Lib/lib.es2015.d.ts
/home/src/workspaces/project/a.d.ts
/home/src/workspaces/project/b.d.ts

Shape signatures in builder refreshed for::
/home/src/tslibs/ts/lib/lib.es2015.d.ts (used version)
/home/src/workspaces/project/b.d.ts (used version)
/home/src/workspaces/project/a.d.ts (used version)

exitCode:: ExitStatus.Success
