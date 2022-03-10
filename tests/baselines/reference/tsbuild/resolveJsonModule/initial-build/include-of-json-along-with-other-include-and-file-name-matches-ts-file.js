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

//// [/src/src/index.json]
{"hello":"world"}

//// [/src/src/index.ts]
import hello from "./index.json"

export default hello.hello

//// [/src/tsconfig_withFiles.json]


//// [/src/tsconfig_withInclude.json]


//// [/src/tsconfig_withIncludeAndFiles.json]


//// [/src/tsconfig_withIncludeOfJson.json]
{
  "compilerOptions": {
    "composite": true,
    "moduleResolution": "node",
    "module": "commonjs",
    "resolveJsonModule": true,
    "esModuleInterop": true,
    "allowSyntheticDefaultImports": true,
    "outDir": "dist",
    "skipDefaultLibCheck": true
  },
  "include": [
    "src/**/*", "src/**/*.json"
  ]
}



Output::
/lib/tsc --b /src/tsconfig_withIncludeOfJson.json --v --explainFiles
[[90m12:00:00 AM[0m] Projects in this build: 
    * src/tsconfig_withIncludeOfJson.json

[[90m12:00:00 AM[0m] Project 'src/tsconfig_withIncludeOfJson.json' is out of date because output file 'src/dist/src/index.js' does not exist

[[90m12:00:00 AM[0m] Building project '/src/tsconfig_withIncludeOfJson.json'...

lib/lib.d.ts
  Default library for target 'es3'
src/src/index.json
  Imported via "./index.json" from file 'src/src/index.ts'
  Matched by include pattern 'src/**/*.json' in 'src/tsconfig_withIncludeOfJson.json'
src/src/index.ts
  Matched by include pattern 'src/**/*' in 'src/tsconfig_withIncludeOfJson.json'
exitCode:: ExitStatus.Success


//// [/src/dist/src/index.d.ts]
declare const _default: string;
export default _default;


//// [/src/dist/src/index.js]
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var index_json_1 = __importDefault(require("./index.json"));
exports["default"] = index_json_1["default"].hello;


//// [/src/dist/src/index.json]
{ "hello": "world" }


//// [/src/dist/tsconfig_withIncludeOfJson.tsbuildinfo]
{"program":{"fileNames":["../../lib/lib.d.ts","../src/index.json","../src/index.ts"],"fileInfos":[{"version":"3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true},"-2379406821-{\"hello\":\"world\"}","-6335882310-import hello from \"./index.json\"\n\nexport default hello.hello"],"options":{"allowSyntheticDefaultImports":true,"composite":true,"esModuleInterop":true,"module":1,"outDir":"./","skipDefaultLibCheck":true},"fileIdsList":[[2]],"referencedMap":[[3,1]],"exportedModulesMap":[[3,1]],"semanticDiagnosticsPerFile":[1,2,3]},"version":"FakeTSVersion"}

//// [/src/dist/tsconfig_withIncludeOfJson.tsbuildinfo.readable.baseline.txt]
{
  "program": {
    "fileNames": [
      "../../lib/lib.d.ts",
      "../src/index.json",
      "../src/index.ts"
    ],
    "fileNamesList": [
      [
        "../src/index.json"
      ]
    ],
    "fileInfos": {
      "../../lib/lib.d.ts": {
        "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "signature": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "affectsGlobalScope": true
      },
      "../src/index.json": {
        "version": "-2379406821-{\"hello\":\"world\"}",
        "signature": "-2379406821-{\"hello\":\"world\"}"
      },
      "../src/index.ts": {
        "version": "-6335882310-import hello from \"./index.json\"\n\nexport default hello.hello",
        "signature": "-6335882310-import hello from \"./index.json\"\n\nexport default hello.hello"
      }
    },
    "options": {
      "allowSyntheticDefaultImports": true,
      "composite": true,
      "esModuleInterop": true,
      "module": 1,
      "outDir": "./",
      "skipDefaultLibCheck": true
    },
    "referencedMap": {
      "../src/index.ts": [
        "../src/index.json"
      ]
    },
    "exportedModulesMap": {
      "../src/index.ts": [
        "../src/index.json"
      ]
    },
    "semanticDiagnosticsPerFile": [
      "../../lib/lib.d.ts",
      "../src/index.json",
      "../src/index.ts"
    ]
  },
  "version": "FakeTSVersion",
  "size": 970
}

