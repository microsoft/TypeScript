currentDirectory:: /home/src/workspaces/project useCaseSensitiveFileNames:: false
Input::
//// [/home/src/workspaces/project/src/main.ts]
/// <reference no-default-lib="true"/>
/// <reference lib="esnext" />

declare global {
    interface Test {
    }
}

export {};


//// [/home/src/workspaces/project/tsconfig.json]
{
  "compilerOptions": {
    "target": "ESNext",
    "module": "ESNext",
    "incremental": true,
    "outDir": "dist"
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


/home/src/tslibs/TS/Lib/tsc.js --rootDir src
Output::


//// [/home/src/tslibs/TS/Lib/lib.esnext.d.ts] *Lib*

//// [/home/src/workspaces/project/dist/main.js]
/// <reference no-default-lib="true"/>
/// <reference lib="esnext" />
export {};


//// [/home/src/workspaces/project/tsconfig.tsbuildinfo]
{"fileNames":["../../tslibs/ts/lib/lib.esnext.d.ts","./src/main.ts"],"fileInfos":[{"version":"3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true},{"version":"-2443389309-/// <reference no-default-lib=\"true\"/>\n/// <reference lib=\"esnext\" />\n\ndeclare global {\n    interface Test {\n    }\n}\n\nexport {};\n","affectsGlobalScope":true}],"root":[2],"options":{"module":99,"outDir":"./dist","rootDir":"./src","target":99},"version":"FakeTSVersion"}

//// [/home/src/workspaces/project/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "fileNames": [
    "../../tslibs/ts/lib/lib.esnext.d.ts",
    "./src/main.ts"
  ],
  "fileInfos": {
    "../../tslibs/ts/lib/lib.esnext.d.ts": {
      "original": {
        "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "affectsGlobalScope": true
      },
      "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
      "signature": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
      "affectsGlobalScope": true
    },
    "./src/main.ts": {
      "original": {
        "version": "-2443389309-/// <reference no-default-lib=\"true\"/>\n/// <reference lib=\"esnext\" />\n\ndeclare global {\n    interface Test {\n    }\n}\n\nexport {};\n",
        "affectsGlobalScope": true
      },
      "version": "-2443389309-/// <reference no-default-lib=\"true\"/>\n/// <reference lib=\"esnext\" />\n\ndeclare global {\n    interface Test {\n    }\n}\n\nexport {};\n",
      "signature": "-2443389309-/// <reference no-default-lib=\"true\"/>\n/// <reference lib=\"esnext\" />\n\ndeclare global {\n    interface Test {\n    }\n}\n\nexport {};\n",
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
    "module": 99,
    "outDir": "./dist",
    "rootDir": "./src",
    "target": 99
  },
  "version": "FakeTSVersion",
  "size": 866
}


exitCode:: ExitStatus.Success
