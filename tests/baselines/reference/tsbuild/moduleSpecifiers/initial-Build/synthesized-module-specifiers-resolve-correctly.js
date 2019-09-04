//// [/lib/src/common/nominal.d.ts]
export declare type Nominal<T, Name extends string> = T & {
    [Symbol.species]: Name;
};


//// [/lib/src/common/nominal.js]
"use strict";
exports.__esModule = true;


//// [/lib/src/common/tsconfig.tsbuildinfo]
{
  "program": {
    "fileInfos": {
      "../../lib.d.ts": {
        "version": "-32082413277-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };\ninterface SymbolConstructor {\n    readonly species: symbol;\n    readonly toStringTag: symbol;\n}\ndeclare var Symbol: SymbolConstructor;\ninterface Symbol {\n    readonly [Symbol.toStringTag]: string;\n}\n",
        "signature": "-32082413277-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };\ninterface SymbolConstructor {\n    readonly species: symbol;\n    readonly toStringTag: symbol;\n}\ndeclare var Symbol: SymbolConstructor;\ninterface Symbol {\n    readonly [Symbol.toStringTag]: string;\n}\n"
      },
      "../../../src/common/nominal.ts": {
        "version": "-24498031910-export declare type Nominal<T, Name extends string> = T & {\n    [Symbol.species]: Name;\n};\n",
        "signature": "-9513375615-export declare type Nominal<T, Name extends string> = T & {\r\n    [Symbol.species]: Name;\r\n};\r\n"
      }
    },
    "options": {
      "skipLibCheck": true,
      "rootDir": "../../..",
      "outDir": "../..",
      "composite": true,
      "configFilePath": "../../../src/common/tsconfig.json"
    },
    "referencedMap": {},
    "exportedModulesMap": {},
    "semanticDiagnosticsPerFile": [
      "../../../src/common/nominal.ts",
      "../../lib.d.ts"
    ]
  },
  "version": "FakeTSVersion"
}

//// [/lib/src/sub-project/index.d.ts]
import { Nominal } from '../common/nominal';
export declare type MyNominal = Nominal<string, 'MyNominal'>;


//// [/lib/src/sub-project/index.js]
"use strict";
exports.__esModule = true;


//// [/lib/src/sub-project/tsconfig.tsbuildinfo]
{
  "program": {
    "fileInfos": {
      "../../lib.d.ts": {
        "version": "-32082413277-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };\ninterface SymbolConstructor {\n    readonly species: symbol;\n    readonly toStringTag: symbol;\n}\ndeclare var Symbol: SymbolConstructor;\ninterface Symbol {\n    readonly [Symbol.toStringTag]: string;\n}\n",
        "signature": "-32082413277-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };\ninterface SymbolConstructor {\n    readonly species: symbol;\n    readonly toStringTag: symbol;\n}\ndeclare var Symbol: SymbolConstructor;\ninterface Symbol {\n    readonly [Symbol.toStringTag]: string;\n}\n"
      },
      "../../../src/common/nominal.ts": {
        "version": "-9513375615-export declare type Nominal<T, Name extends string> = T & {\r\n    [Symbol.species]: Name;\r\n};\r\n",
        "signature": "-9513375615-export declare type Nominal<T, Name extends string> = T & {\r\n    [Symbol.species]: Name;\r\n};\r\n"
      },
      "../../../src/sub-project/index.ts": {
        "version": "-22894055505-import { Nominal } from '../common/nominal';\n\nexport type MyNominal = Nominal<string, 'MyNominal'>;\n",
        "signature": "-21416888433-import { Nominal } from '../common/nominal';\r\nexport declare type MyNominal = Nominal<string, 'MyNominal'>;\r\n"
      }
    },
    "options": {
      "skipLibCheck": true,
      "rootDir": "../../..",
      "outDir": "../..",
      "composite": true,
      "configFilePath": "../../../src/sub-project/tsconfig.json"
    },
    "referencedMap": {
      "../../../src/sub-project/index.ts": [
        "../common/nominal.d.ts"
      ]
    },
    "exportedModulesMap": {
      "../../../src/sub-project/index.ts": [
        "../common/nominal.d.ts"
      ]
    },
    "semanticDiagnosticsPerFile": [
      "../../../src/common/nominal.ts",
      "../../../src/sub-project/index.ts",
      "../../lib.d.ts"
    ]
  },
  "version": "FakeTSVersion"
}

//// [/lib/src/sub-project-2/index.d.ts]
declare const variable: {
    key: import("../common/nominal").Nominal<string, "MyNominal">;
};
export declare function getVar(): keyof typeof variable;
export {};


//// [/lib/src/sub-project-2/index.js]
"use strict";
exports.__esModule = true;
var variable = {
    key: 'value'
};
function getVar() {
    return 'key';
}
exports.getVar = getVar;


//// [/lib/src/sub-project-2/tsconfig.tsbuildinfo]
{
  "program": {
    "fileInfos": {
      "../../lib.d.ts": {
        "version": "-32082413277-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };\ninterface SymbolConstructor {\n    readonly species: symbol;\n    readonly toStringTag: symbol;\n}\ndeclare var Symbol: SymbolConstructor;\ninterface Symbol {\n    readonly [Symbol.toStringTag]: string;\n}\n",
        "signature": "-32082413277-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };\ninterface SymbolConstructor {\n    readonly species: symbol;\n    readonly toStringTag: symbol;\n}\ndeclare var Symbol: SymbolConstructor;\ninterface Symbol {\n    readonly [Symbol.toStringTag]: string;\n}\n"
      },
      "../../../src/common/nominal.ts": {
        "version": "-9513375615-export declare type Nominal<T, Name extends string> = T & {\r\n    [Symbol.species]: Name;\r\n};\r\n",
        "signature": "-9513375615-export declare type Nominal<T, Name extends string> = T & {\r\n    [Symbol.species]: Name;\r\n};\r\n"
      },
      "../../../src/sub-project/index.ts": {
        "version": "-21416888433-import { Nominal } from '../common/nominal';\r\nexport declare type MyNominal = Nominal<string, 'MyNominal'>;\r\n",
        "signature": "-21416888433-import { Nominal } from '../common/nominal';\r\nexport declare type MyNominal = Nominal<string, 'MyNominal'>;\r\n"
      },
      "../../../src/sub-project-2/index.ts": {
        "version": "-13939373533-import { MyNominal } from '../sub-project/index';\n\nconst variable = {\n    key: 'value' as MyNominal,\n};\n\nexport function getVar(): keyof typeof variable {\n    return 'key';\n}\n",
        "signature": "-17233212183-declare const variable: {\r\n    key: import(\"../common/nominal\").Nominal<string, \"MyNominal\">;\r\n};\r\nexport declare function getVar(): keyof typeof variable;\r\nexport {};\r\n"
      }
    },
    "options": {
      "skipLibCheck": true,
      "rootDir": "../../..",
      "outDir": "../..",
      "composite": true,
      "configFilePath": "../../../src/sub-project-2/tsconfig.json"
    },
    "referencedMap": {
      "../../../src/sub-project-2/index.ts": [
        "../sub-project/index.d.ts"
      ],
      "../../../src/sub-project/index.ts": [
        "../common/nominal.d.ts"
      ]
    },
    "exportedModulesMap": {
      "../../../src/sub-project-2/index.ts": [
        "../common/nominal.d.ts"
      ],
      "../../../src/sub-project/index.ts": [
        "../common/nominal.d.ts"
      ]
    },
    "semanticDiagnosticsPerFile": [
      "../../../src/common/nominal.ts",
      "../../../src/sub-project-2/index.ts",
      "../../../src/sub-project/index.ts",
      "../../lib.d.ts"
    ]
  },
  "version": "FakeTSVersion"
}

