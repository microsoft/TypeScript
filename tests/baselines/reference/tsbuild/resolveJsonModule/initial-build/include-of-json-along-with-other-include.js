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

//// [/src/src/hello.json]
{
  "hello": "world"
}

//// [/src/src/index.ts]
import hello from "./hello.json"

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
/lib/tsc --b /src/tsconfig_withIncludeOfJson.json
exitCode:: ExitStatus.Success


//// [/src/dist/src/hello.json]
{
    "hello": "world"
}


//// [/src/dist/src/index.d.ts]
declare const _default: string;
export default _default;


//// [/src/dist/src/index.js]
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var hello_json_1 = __importDefault(require("./hello.json"));
exports["default"] = hello_json_1["default"].hello;


//// [/src/dist/tsconfig_withIncludeOfJson.tsbuildinfo]
{
  "program": {
    "fileInfos": {
      "../../lib/lib.d.ts": {
        "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "signature": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "affectsGlobalScope": true
      },
      "../src/hello.json": {
        "version": "6651571919-{\n  \"hello\": \"world\"\n}",
        "signature": "-4341462827-export declare const hello: string;\r\n",
        "affectsGlobalScope": true
      },
      "../src/index.ts": {
        "version": "-27703454282-import hello from \"./hello.json\"\n\nexport default hello.hello",
        "signature": "-1680156224-declare const _default: string;\r\nexport default _default;\r\n",
        "affectsGlobalScope": false
      }
    },
    "options": {
      "composite": true,
      "moduleResolution": 2,
      "module": 1,
      "resolveJsonModule": true,
      "esModuleInterop": true,
      "allowSyntheticDefaultImports": true,
      "outDir": "./",
      "skipDefaultLibCheck": true,
      "configFilePath": "../tsconfig_withIncludeOfJson.json"
    },
    "referencedMap": {
      "../src/index.ts": [
        "../src/hello.json"
      ]
    },
    "exportedModulesMap": {},
    "semanticDiagnosticsPerFile": [
      "../../lib/lib.d.ts",
      "../src/hello.json",
      "../src/index.ts"
    ]
  },
  "version": "FakeTSVersion"
}

