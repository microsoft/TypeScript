//// [/lib/initial-buildOutput.txt]
/lib/tsc --b src/tsconfig.json --verbose
[[90m12:01:00 AM[0m] Projects in this build: 
    * src/strings/tsconfig.json
    * src/main/tsconfig.json
    * src/tsconfig.json

[[90m12:01:00 AM[0m] Project 'src/strings/tsconfig.json' is out of date because output file 'src/strings/tsconfig.tsbuildinfo' does not exist

[[90m12:01:00 AM[0m] Building project '/src/strings/tsconfig.json'...

[[90m12:01:00 AM[0m] Project 'src/main/tsconfig.json' is out of date because output file 'src/main/index.js' does not exist

[[90m12:01:00 AM[0m] Building project '/src/main/tsconfig.json'...

exitCode:: ExitStatus.Success


//// [/src/main/index.d.ts]
export {};


//// [/src/main/index.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var foo_json_1 = require("../strings/foo.json");
console.log(foo_json_1.foo);


//// [/src/main/tsconfig.tsbuildinfo]
{
  "program": {
    "fileInfos": {
      "../../lib/lib.d.ts": {
        "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "signature": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "affectsGlobalScope": true
      },
      "../strings/foo.json": {
        "version": "4395333385-{\n    \"foo\": \"bar baz\"\n}",
        "affectsGlobalScope": true
      },
      "./index.ts": {
        "version": "-4651661680-import { foo } from '../strings/foo.json';\n\nconsole.log(foo);",
        "signature": "-4882119183-export {};\r\n",
        "affectsGlobalScope": false
      }
    },
    "options": {
      "target": 1,
      "module": 1,
      "rootDir": "..",
      "composite": true,
      "resolveJsonModule": true,
      "strict": true,
      "esModuleInterop": true,
      "configFilePath": "./tsconfig.json"
    },
    "referencedMap": {
      "./index.ts": [
        "../strings/foo.json"
      ]
    },
    "exportedModulesMap": {},
    "semanticDiagnosticsPerFile": [
      "../../lib/lib.d.ts",
      "./index.ts",
      "../strings/foo.json"
    ]
  },
  "version": "FakeTSVersion"
}

//// [/src/strings/tsconfig.tsbuildinfo]
{
  "program": {
    "fileInfos": {
      "../../lib/lib.d.ts": {
        "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "signature": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "affectsGlobalScope": true
      },
      "./foo.json": {
        "version": "4395333385-{\n    \"foo\": \"bar baz\"\n}",
        "signature": "-1457151099-export declare const foo: string;\r\n",
        "affectsGlobalScope": true
      }
    },
    "options": {
      "target": 1,
      "module": 1,
      "rootDir": "..",
      "composite": true,
      "resolveJsonModule": true,
      "strict": true,
      "esModuleInterop": true,
      "configFilePath": "./tsconfig.json"
    },
    "referencedMap": {},
    "exportedModulesMap": {},
    "semanticDiagnosticsPerFile": [
      "../../lib/lib.d.ts",
      "./foo.json"
    ]
  },
  "version": "FakeTSVersion"
}

