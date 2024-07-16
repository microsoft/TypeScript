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
/// <reference no-default-lib="true"/>
/// <reference lib="es6"/>
declare const a = "hello";


//// [/src/b.d.ts]
export const b = 10;

//// [/src/tsconfig.json]
{
  "compilerOptions": {
    "lib": [
      "es6",
      "dom"
    ]
  }
}



Output::
/lib/tsc -p /src/tsconfig.json -i --explainFiles
lib/lib.es2015.d.ts
  Library referenced via 'es6' from file 'src/a.d.ts'
src/a.d.ts
  Matched by default include pattern '**/*'
src/b.d.ts
  Matched by default include pattern '**/*'
exitCode:: ExitStatus.Success
Program root files: [
  "/src/a.d.ts",
  "/src/b.d.ts"
]
Program options: {
  "lib": [
    "lib.es2015.d.ts",
    "lib.dom.d.ts"
  ],
  "project": "/src/tsconfig.json",
  "incremental": true,
  "explainFiles": true,
  "configFilePath": "/src/tsconfig.json"
}
Program structureReused: Not
Program files::
/lib/lib.es2015.d.ts
/src/a.d.ts
/src/b.d.ts

Semantic diagnostics in builder refreshed for::
/lib/lib.es2015.d.ts
/src/a.d.ts
/src/b.d.ts

Shape signatures in builder refreshed for::
/lib/lib.es2015.d.ts (used version)
/src/b.d.ts (used version)
/src/a.d.ts (used version)


//// [/src/tsconfig.tsbuildinfo]
{"fileNames":["../lib/lib.es2015.d.ts","./a.d.ts","./b.d.ts"],"fileInfos":[{"version":"3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true},{"version":"10808475215-/// <reference no-default-lib=\"true\"/>\n/// <reference lib=\"es6\"/>\ndeclare const a = \"hello\";\n","affectsGlobalScope":true},"-13368947479-export const b = 10;"],"root":[2,3],"version":"FakeTSVersion"}

//// [/src/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "fileNames": [
    "../lib/lib.es2015.d.ts",
    "./a.d.ts",
    "./b.d.ts"
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
  "size": 785
}

