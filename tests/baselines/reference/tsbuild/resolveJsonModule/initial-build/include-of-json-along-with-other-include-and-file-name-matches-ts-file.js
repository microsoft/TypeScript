//// [/lib/initial-buildOutput.txt]
/lib/tsc --b /src/tsconfig_withIncludeOfJson.json
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
{
  "program": {
    "fileInfos": {
      "../../lib/lib.d.ts": {
        "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "signature": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };"
      },
      "../src/index.json": {
        "version": "-2379406821-{\"hello\":\"world\"}",
        "signature": "-4341462827-export declare const hello: string;\r\n"
      },
      "../src/index.ts": {
        "version": "-6335882310-import hello from \"./index.json\"\n\nexport default hello.hello",
        "signature": "-1680156224-declare const _default: string;\r\nexport default _default;\r\n"
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
        "../src/index.json"
      ]
    },
    "exportedModulesMap": {},
    "semanticDiagnosticsPerFile": [
      "../../lib/lib.d.ts",
      "../src/index.json",
      "../src/index.ts"
    ]
  },
  "version": "FakeTSVersion"
}

//// [/src/src/hello.json] unlink
//// [/src/src/index.json]
{"hello":"world"}

//// [/src/src/index.ts]
import hello from "./index.json"

export default hello.hello

