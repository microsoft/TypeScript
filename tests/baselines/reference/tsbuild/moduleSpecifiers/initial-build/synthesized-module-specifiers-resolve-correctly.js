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
interface SymbolConstructor {
    readonly species: symbol;
    readonly toStringTag: symbol;
}
declare var Symbol: SymbolConstructor;
interface Symbol {
    readonly [Symbol.toStringTag]: string;
}


//// [/src/solution/common/nominal.ts]
export declare type Nominal<T, Name extends string> = T & {
    [Symbol.species]: Name;
};


//// [/src/solution/common/tsconfig.json]
{
    "extends": "../../tsconfig.base.json",
    "compilerOptions": {
        "composite": true
    },
    "include": ["nominal.ts"]
}

//// [/src/solution/sub-project/index.ts]
import { Nominal } from '../common/nominal';

export type MyNominal = Nominal<string, 'MyNominal'>;


//// [/src/solution/sub-project/tsconfig.json]
{
    "extends": "../../tsconfig.base.json",
    "compilerOptions": {
        "composite": true
    },
    "references": [
        { "path": "../common" }
    ],
    "include": ["./index.ts"]
}

//// [/src/solution/sub-project-2/index.ts]
import { MyNominal } from '../sub-project/index';

const variable = {
    key: 'value' as MyNominal,
};

export function getVar(): keyof typeof variable {
    return 'key';
}


//// [/src/solution/sub-project-2/tsconfig.json]
{
    "extends": "../../tsconfig.base.json",
    "compilerOptions": {
        "composite": true
    },
    "references": [
        { "path": "../sub-project" }
    ],
    "include": ["./index.ts"]
}

//// [/src/solution/tsconfig.json]
{
    "compilerOptions": {
        "composite": true
    },
    "references": [
        { "path": "./sub-project" },
        { "path": "./sub-project-2" }
    ],
    "include": []
}

//// [/src/tsconfig.base.json]
{
    "compilerOptions": {
        "skipLibCheck": true,
        "rootDir": "./",
        "outDir": "lib",
    }
}

//// [/src/tsconfig.json]
{
                    "compilerOptions": {
                        "composite": true
                    },
                    "references": [
                        { "path": "./solution" }
                    ],
                    "include": []
                }



Output::
/lib/tsc -b /src --verbose
[[90m12:00:00 AM[0m] Projects in this build: 
    * src/solution/common/tsconfig.json
    * src/solution/sub-project/tsconfig.json
    * src/solution/sub-project-2/tsconfig.json
    * src/solution/tsconfig.json
    * src/tsconfig.json

[[90m12:00:00 AM[0m] Project 'src/solution/common/tsconfig.json' is out of date because output file 'src/lib/solution/common/nominal.js' does not exist

[[90m12:00:00 AM[0m] Building project '/src/solution/common/tsconfig.json'...

[[90m12:00:00 AM[0m] Project 'src/solution/sub-project/tsconfig.json' is out of date because output file 'src/lib/solution/sub-project/index.js' does not exist

[[90m12:00:00 AM[0m] Building project '/src/solution/sub-project/tsconfig.json'...

[[90m12:00:00 AM[0m] Project 'src/solution/sub-project-2/tsconfig.json' is out of date because output file 'src/lib/solution/sub-project-2/index.js' does not exist

[[90m12:00:00 AM[0m] Building project '/src/solution/sub-project-2/tsconfig.json'...

exitCode:: ExitStatus.Success


//// [/src/lib/solution/common/nominal.d.ts]
export declare type Nominal<T, Name extends string> = T & {
    [Symbol.species]: Name;
};


//// [/src/lib/solution/common/nominal.js]
"use strict";
exports.__esModule = true;


//// [/src/lib/solution/common/tsconfig.tsbuildinfo]
{
  "program": {
    "fileInfos": {
      "../../../../lib/lib.d.ts": {
        "version": "-32082413277-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };\ninterface SymbolConstructor {\n    readonly species: symbol;\n    readonly toStringTag: symbol;\n}\ndeclare var Symbol: SymbolConstructor;\ninterface Symbol {\n    readonly [Symbol.toStringTag]: string;\n}\n",
        "signature": "-32082413277-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };\ninterface SymbolConstructor {\n    readonly species: symbol;\n    readonly toStringTag: symbol;\n}\ndeclare var Symbol: SymbolConstructor;\ninterface Symbol {\n    readonly [Symbol.toStringTag]: string;\n}\n",
        "affectsGlobalScope": true
      },
      "../../../solution/common/nominal.ts": {
        "version": "-24498031910-export declare type Nominal<T, Name extends string> = T & {\n    [Symbol.species]: Name;\n};\n",
        "signature": "-9513375615-export declare type Nominal<T, Name extends string> = T & {\r\n    [Symbol.species]: Name;\r\n};\r\n",
        "affectsGlobalScope": false
      }
    },
    "options": {
      "skipLibCheck": true,
      "rootDir": "../../..",
      "outDir": "../..",
      "composite": true,
      "configFilePath": "../../../solution/common/tsconfig.json"
    },
    "referencedMap": {},
    "exportedModulesMap": {},
    "semanticDiagnosticsPerFile": [
      "../../../../lib/lib.d.ts",
      "../../../solution/common/nominal.ts"
    ]
  },
  "version": "FakeTSVersion"
}

//// [/src/lib/solution/sub-project/index.d.ts]
import { Nominal } from '../common/nominal';
export declare type MyNominal = Nominal<string, 'MyNominal'>;


//// [/src/lib/solution/sub-project/index.js]
"use strict";
exports.__esModule = true;


//// [/src/lib/solution/sub-project/tsconfig.tsbuildinfo]
{
  "program": {
    "fileInfos": {
      "../../../../lib/lib.d.ts": {
        "version": "-32082413277-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };\ninterface SymbolConstructor {\n    readonly species: symbol;\n    readonly toStringTag: symbol;\n}\ndeclare var Symbol: SymbolConstructor;\ninterface Symbol {\n    readonly [Symbol.toStringTag]: string;\n}\n",
        "signature": "-32082413277-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };\ninterface SymbolConstructor {\n    readonly species: symbol;\n    readonly toStringTag: symbol;\n}\ndeclare var Symbol: SymbolConstructor;\ninterface Symbol {\n    readonly [Symbol.toStringTag]: string;\n}\n",
        "affectsGlobalScope": true
      },
      "../common/nominal.d.ts": {
        "version": "-9513375615-export declare type Nominal<T, Name extends string> = T & {\r\n    [Symbol.species]: Name;\r\n};\r\n",
        "signature": "-9513375615-export declare type Nominal<T, Name extends string> = T & {\r\n    [Symbol.species]: Name;\r\n};\r\n",
        "affectsGlobalScope": false
      },
      "../../../solution/sub-project/index.ts": {
        "version": "-22894055505-import { Nominal } from '../common/nominal';\n\nexport type MyNominal = Nominal<string, 'MyNominal'>;\n",
        "signature": "-21416888433-import { Nominal } from '../common/nominal';\r\nexport declare type MyNominal = Nominal<string, 'MyNominal'>;\r\n",
        "affectsGlobalScope": false
      }
    },
    "options": {
      "skipLibCheck": true,
      "rootDir": "../../..",
      "outDir": "../..",
      "composite": true,
      "configFilePath": "../../../solution/sub-project/tsconfig.json"
    },
    "referencedMap": {
      "../../../solution/sub-project/index.ts": [
        "../common/nominal.d.ts"
      ]
    },
    "exportedModulesMap": {
      "../../../solution/sub-project/index.ts": [
        "../common/nominal.d.ts"
      ]
    },
    "semanticDiagnosticsPerFile": [
      "../../../../lib/lib.d.ts",
      "../common/nominal.d.ts",
      "../../../solution/sub-project/index.ts"
    ]
  },
  "version": "FakeTSVersion"
}

//// [/src/lib/solution/sub-project-2/index.d.ts]
declare const variable: {
    key: import("../common/nominal").Nominal<string, "MyNominal">;
};
export declare function getVar(): keyof typeof variable;
export {};


//// [/src/lib/solution/sub-project-2/index.js]
"use strict";
exports.__esModule = true;
exports.getVar = void 0;
var variable = {
    key: 'value'
};
function getVar() {
    return 'key';
}
exports.getVar = getVar;


//// [/src/lib/solution/sub-project-2/tsconfig.tsbuildinfo]
{
  "program": {
    "fileInfos": {
      "../../../../lib/lib.d.ts": {
        "version": "-32082413277-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };\ninterface SymbolConstructor {\n    readonly species: symbol;\n    readonly toStringTag: symbol;\n}\ndeclare var Symbol: SymbolConstructor;\ninterface Symbol {\n    readonly [Symbol.toStringTag]: string;\n}\n",
        "signature": "-32082413277-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };\ninterface SymbolConstructor {\n    readonly species: symbol;\n    readonly toStringTag: symbol;\n}\ndeclare var Symbol: SymbolConstructor;\ninterface Symbol {\n    readonly [Symbol.toStringTag]: string;\n}\n",
        "affectsGlobalScope": true
      },
      "../common/nominal.d.ts": {
        "version": "-9513375615-export declare type Nominal<T, Name extends string> = T & {\r\n    [Symbol.species]: Name;\r\n};\r\n",
        "signature": "-9513375615-export declare type Nominal<T, Name extends string> = T & {\r\n    [Symbol.species]: Name;\r\n};\r\n",
        "affectsGlobalScope": false
      },
      "../sub-project/index.d.ts": {
        "version": "-21416888433-import { Nominal } from '../common/nominal';\r\nexport declare type MyNominal = Nominal<string, 'MyNominal'>;\r\n",
        "signature": "-21416888433-import { Nominal } from '../common/nominal';\r\nexport declare type MyNominal = Nominal<string, 'MyNominal'>;\r\n",
        "affectsGlobalScope": false
      },
      "../../../solution/sub-project-2/index.ts": {
        "version": "-13939373533-import { MyNominal } from '../sub-project/index';\n\nconst variable = {\n    key: 'value' as MyNominal,\n};\n\nexport function getVar(): keyof typeof variable {\n    return 'key';\n}\n",
        "signature": "-17233212183-declare const variable: {\r\n    key: import(\"../common/nominal\").Nominal<string, \"MyNominal\">;\r\n};\r\nexport declare function getVar(): keyof typeof variable;\r\nexport {};\r\n",
        "affectsGlobalScope": false
      }
    },
    "options": {
      "skipLibCheck": true,
      "rootDir": "../../..",
      "outDir": "../..",
      "composite": true,
      "configFilePath": "../../../solution/sub-project-2/tsconfig.json"
    },
    "referencedMap": {
      "../sub-project/index.d.ts": [
        "../common/nominal.d.ts"
      ],
      "../../../solution/sub-project-2/index.ts": [
        "../sub-project/index.d.ts"
      ]
    },
    "exportedModulesMap": {
      "../sub-project/index.d.ts": [
        "../common/nominal.d.ts"
      ],
      "../../../solution/sub-project-2/index.ts": [
        "../common/nominal.d.ts"
      ]
    },
    "semanticDiagnosticsPerFile": [
      "../../../../lib/lib.d.ts",
      "../common/nominal.d.ts",
      "../sub-project/index.d.ts",
      "../../../solution/sub-project-2/index.ts"
    ]
  },
  "version": "FakeTSVersion"
}

