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
{"program":{"fileNames":["../../lib/lib.esnext.d.ts","./src/main.ts"],"fileInfos":[{"version":"3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true},{"version":"-2443389309-/// <reference no-default-lib=\"true\"/>\n/// <reference lib=\"esnext\" />\n\ndeclare global {\n    interface Test {\n    }\n}\n\nexport {};\n","affectsGlobalScope":true}],"options":{"module":99,"outDir":"./dist","rootDir":"./src","target":99},"referencedMap":[],"exportedModulesMap":[],"semanticDiagnosticsPerFile":[1,2]},"version":"FakeTSVersion"}

//// [/src/project/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "program": {
    "fileNames": [
      "../../lib/lib.esnext.d.ts",
      "./src/main.ts"
    ],
    "fileInfos": {
      "../../lib/lib.esnext.d.ts": {
        "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "signature": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "affectsGlobalScope": true
      },
      "./src/main.ts": {
        "version": "-2443389309-/// <reference no-default-lib=\"true\"/>\n/// <reference lib=\"esnext\" />\n\ndeclare global {\n    interface Test {\n    }\n}\n\nexport {};\n",
        "signature": "-2443389309-/// <reference no-default-lib=\"true\"/>\n/// <reference lib=\"esnext\" />\n\ndeclare global {\n    interface Test {\n    }\n}\n\nexport {};\n",
        "affectsGlobalScope": true
      }
    },
    "options": {
      "module": 99,
      "outDir": "./dist",
      "rootDir": "./src",
      "target": 99
    },
    "referencedMap": {},
    "exportedModulesMap": {},
    "semanticDiagnosticsPerFile": [
      "../../lib/lib.esnext.d.ts",
      "./src/main.ts"
    ]
  },
  "version": "FakeTSVersion",
  "size": 935
}

