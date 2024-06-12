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

//// [/lib/lib.esnext.d.ts]
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

//// [/src/project/src/main.ts]
/// <reference no-default-lib="true"/>
/// <reference lib="esnext" />

declare global {
    interface Test {
    }
}

export {};


//// [/src/project/tsconfig.json]
{
    "compilerOptions": {
        "target": "ESNext",
        "module": "ESNext",
        "incremental": true,
        "outDir": "dist",
    },
}



Output::
/lib/tsc --p src/project --rootDir src/project/src
exitCode:: ExitStatus.Success


//// [/src/project/dist/main.js]
/// <reference no-default-lib="true"/>
/// <reference lib="esnext" />
export {};


//// [/src/project/tsconfig.tsbuildinfo]
<<<<<<< HEAD
{"program":{"fileNames":["../../lib/lib.esnext.d.ts","./src/main.ts"],"fileInfos":[{"version":"3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true,"impliedFormat":1},{"version":"-2443389309-/// <reference no-default-lib=\"true\"/>\n/// <reference lib=\"esnext\" />\n\ndeclare global {\n    interface Test {\n    }\n}\n\nexport {};\n","affectsGlobalScope":true,"impliedFormat":1}],"root":[2],"options":{"module":99,"outDir":"./dist","rootDir":"./src","target":99}},"version":"FakeTSVersion"}
=======
{"fileNames":["../../lib/lib.esnext.d.ts","./src/main.ts"],"fileInfos":[{"version":"3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true},{"version":"-2443389309-/// <reference no-default-lib=\"true\"/>\n/// <reference lib=\"esnext\" />\n\ndeclare global {\n    interface Test {\n    }\n}\n\nexport {};\n","affectsGlobalScope":true}],"root":[2],"options":{"module":99,"outDir":"./dist","rootDir":"./src","target":99},"version":"FakeTSVersion"}
>>>>>>> c4daafb597 (Merge 1ab44d1ef58360d56e708c6d9f422205d116c199 into 1948e92e3a102b40800fdc731ddf67f5dc8bda82)

//// [/src/project/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "program": {
    "fileNames": [
      "../../lib/lib.esnext.d.ts",
      "./src/main.ts"
    ],
    "fileInfos": {
      "../../lib/lib.esnext.d.ts": {
        "original": {
          "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
          "affectsGlobalScope": true,
          "impliedFormat": 1
        },
        "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
<<<<<<< HEAD
        "signature": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "affectsGlobalScope": true,
        "impliedFormat": "commonjs"
      },
      "./src/main.ts": {
        "original": {
          "version": "-2443389309-/// <reference no-default-lib=\"true\"/>\n/// <reference lib=\"esnext\" />\n\ndeclare global {\n    interface Test {\n    }\n}\n\nexport {};\n",
          "affectsGlobalScope": true,
          "impliedFormat": 1
        },
        "version": "-2443389309-/// <reference no-default-lib=\"true\"/>\n/// <reference lib=\"esnext\" />\n\ndeclare global {\n    interface Test {\n    }\n}\n\nexport {};\n",
        "signature": "-2443389309-/// <reference no-default-lib=\"true\"/>\n/// <reference lib=\"esnext\" />\n\ndeclare global {\n    interface Test {\n    }\n}\n\nexport {};\n",
        "affectsGlobalScope": true,
        "impliedFormat": "commonjs"
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
=======
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
>>>>>>> c4daafb597 (Merge 1ab44d1ef58360d56e708c6d9f422205d116c199 into 1948e92e3a102b40800fdc731ddf67f5dc8bda82)
    }
  },
  "version": "FakeTSVersion",
<<<<<<< HEAD
  "size": 904
=======
  "size": 856
>>>>>>> c4daafb597 (Merge 1ab44d1ef58360d56e708c6d9f422205d116c199 into 1948e92e3a102b40800fdc731ddf67f5dc8bda82)
}

