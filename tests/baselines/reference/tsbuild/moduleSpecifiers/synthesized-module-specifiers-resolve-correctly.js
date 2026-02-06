currentDirectory:: /home/src/workspaces/packages useCaseSensitiveFileNames:: false
Input::
//// [/home/src/workspaces/packages/solution/common/nominal.ts]
export declare type Nominal<T, Name extends string> = T & {
    [Symbol.species]: Name;
};


//// [/home/src/workspaces/packages/solution/common/tsconfig.json]
{
  "extends": "../../tsconfig.base.json",
  "compilerOptions": {
    "composite": true
  },
  "include": [
    "nominal.ts"
  ]
}

//// [/home/src/workspaces/packages/solution/sub-project/index.ts]
import { Nominal } from '../common/nominal';

export type MyNominal = Nominal<string, 'MyNominal'>;


//// [/home/src/workspaces/packages/solution/sub-project/tsconfig.json]
{
  "extends": "../../tsconfig.base.json",
  "compilerOptions": {
    "composite": true
  },
  "references": [
    {
      "path": "../common"
    }
  ],
  "include": [
    "./index.ts"
  ]
}

//// [/home/src/workspaces/packages/solution/sub-project-2/index.ts]
import { MyNominal } from '../sub-project/index';

const variable = {
    key: 'value' as MyNominal,
};

export function getVar(): keyof typeof variable {
    return 'key';
}


//// [/home/src/workspaces/packages/solution/sub-project-2/tsconfig.json]
{
  "extends": "../../tsconfig.base.json",
  "compilerOptions": {
    "composite": true
  },
  "references": [
    {
      "path": "../sub-project"
    }
  ],
  "include": [
    "./index.ts"
  ]
}

//// [/home/src/workspaces/packages/solution/tsconfig.json]
{
  "compilerOptions": {
    "composite": true
  },
  "references": [
    {
      "path": "./sub-project"
    },
    {
      "path": "./sub-project-2"
    }
  ],
  "include": []
}

//// [/home/src/workspaces/packages/tsconfig.base.json]
{
  "compilerOptions": {
    "skipLibCheck": true,
    "rootDir": "./",
    "outDir": "lib"
  }
}

//// [/home/src/workspaces/packages/tsconfig.json]
{
  "compilerOptions": {
    "composite": true
  },
  "references": [
    {
      "path": "./solution"
    }
  ],
  "include": []
}

//// [/home/src/tslibs/TS/Lib/lib.d.ts]
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



/home/src/tslibs/TS/Lib/tsc.js -b --verbose
Output::
[[90mHH:MM:SS AM[0m] Projects in this build: 
    * solution/common/tsconfig.json
    * solution/sub-project/tsconfig.json
    * solution/sub-project-2/tsconfig.json
    * solution/tsconfig.json
    * tsconfig.json

[[90mHH:MM:SS AM[0m] Project 'solution/common/tsconfig.json' is out of date because output file 'lib/solution/common/tsconfig.tsbuildinfo' does not exist

[[90mHH:MM:SS AM[0m] Building project '/home/src/workspaces/packages/solution/common/tsconfig.json'...

[96msolution/common/nominal.ts[0m:[93m2[0m:[93m6[0m - [91merror[0m[90m TS2583: [0mCannot find name 'Symbol'. Do you need to change your target library? Try changing the 'lib' compiler option to 'es2015' or later.

[7m2[0m     [Symbol.species]: Name;
[7m [0m [91m     ~~~~~~[0m

[[90mHH:MM:SS AM[0m] Project 'solution/sub-project/tsconfig.json' is out of date because output file 'lib/solution/sub-project/tsconfig.tsbuildinfo' does not exist

[[90mHH:MM:SS AM[0m] Building project '/home/src/workspaces/packages/solution/sub-project/tsconfig.json'...

[[90mHH:MM:SS AM[0m] Project 'solution/sub-project-2/tsconfig.json' is out of date because output file 'lib/solution/sub-project-2/tsconfig.tsbuildinfo' does not exist

[[90mHH:MM:SS AM[0m] Building project '/home/src/workspaces/packages/solution/sub-project-2/tsconfig.json'...


Found 1 error.



//// [/home/src/tslibs/TS/Lib/lib.es2025.full.d.ts] *Lib*

//// [/home/src/workspaces/packages/lib/solution/common/nominal.js]
export {};


//// [/home/src/workspaces/packages/lib/solution/common/nominal.d.ts]
export declare type Nominal<T, Name extends string> = T & {};


//// [/home/src/workspaces/packages/lib/solution/common/tsconfig.tsbuildinfo]
{"fileNames":["../../../../../tslibs/ts/lib/lib.es2025.full.d.ts","../../../solution/common/nominal.ts"],"fileInfos":[{"version":"-25093698414-interface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true},{"version":"-24498031910-export declare type Nominal<T, Name extends string> = T & {\n    [Symbol.species]: Name;\n};\n","signature":"-16533634136-export declare type Nominal<T, Name extends string> = T & {};\n"}],"root":[2],"options":{"composite":true,"outDir":"../..","rootDir":"../../..","skipLibCheck":true},"semanticDiagnosticsPerFile":[[2,[{"start":65,"length":6,"messageText":"Cannot find name 'Symbol'. Do you need to change your target library? Try changing the 'lib' compiler option to 'es2015' or later.","category":1,"code":2583}]]],"latestChangedDtsFile":"./nominal.d.ts","version":"FakeTSVersion"}

//// [/home/src/workspaces/packages/lib/solution/common/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "fileNames": [
    "../../../../../tslibs/ts/lib/lib.es2025.full.d.ts",
    "../../../solution/common/nominal.ts"
  ],
  "fileInfos": {
    "../../../../../tslibs/ts/lib/lib.es2025.full.d.ts": {
      "original": {
        "version": "-25093698414-interface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "affectsGlobalScope": true
      },
      "version": "-25093698414-interface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
      "signature": "-25093698414-interface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
      "affectsGlobalScope": true
    },
    "../../../solution/common/nominal.ts": {
      "original": {
        "version": "-24498031910-export declare type Nominal<T, Name extends string> = T & {\n    [Symbol.species]: Name;\n};\n",
        "signature": "-16533634136-export declare type Nominal<T, Name extends string> = T & {};\n"
      },
      "version": "-24498031910-export declare type Nominal<T, Name extends string> = T & {\n    [Symbol.species]: Name;\n};\n",
      "signature": "-16533634136-export declare type Nominal<T, Name extends string> = T & {};\n"
    }
  },
  "root": [
    [
      2,
      "../../../solution/common/nominal.ts"
    ]
  ],
  "options": {
    "composite": true,
    "outDir": "../..",
    "rootDir": "../../..",
    "skipLibCheck": true
  },
  "semanticDiagnosticsPerFile": [
    [
      "../../../solution/common/nominal.ts",
      [
        {
          "start": 65,
          "length": 6,
          "messageText": "Cannot find name 'Symbol'. Do you need to change your target library? Try changing the 'lib' compiler option to 'es2015' or later.",
          "category": 1,
          "code": 2583
        }
      ]
    ]
  ],
  "latestChangedDtsFile": "./nominal.d.ts",
  "version": "FakeTSVersion",
  "size": 1168
}

//// [/home/src/workspaces/packages/lib/solution/sub-project/index.js]
export {};


//// [/home/src/workspaces/packages/lib/solution/sub-project/index.d.ts]
import { Nominal } from '../common/nominal';
export type MyNominal = Nominal<string, 'MyNominal'>;


//// [/home/src/workspaces/packages/lib/solution/sub-project/tsconfig.tsbuildinfo]
{"fileNames":["../../../../../tslibs/ts/lib/lib.es2025.full.d.ts","../common/nominal.d.ts","../../../solution/sub-project/index.ts"],"fileIdsList":[[2]],"fileInfos":[{"version":"-25093698414-interface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true},"-16533634136-export declare type Nominal<T, Name extends string> = T & {};\n",{"version":"-22894055505-import { Nominal } from '../common/nominal';\n\nexport type MyNominal = Nominal<string, 'MyNominal'>;\n","signature":"-25703752603-import { Nominal } from '../common/nominal';\nexport type MyNominal = Nominal<string, 'MyNominal'>;\n"}],"root":[3],"options":{"composite":true,"outDir":"../..","rootDir":"../../..","skipLibCheck":true},"referencedMap":[[3,1]],"latestChangedDtsFile":"./index.d.ts","version":"FakeTSVersion"}

//// [/home/src/workspaces/packages/lib/solution/sub-project/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "fileNames": [
    "../../../../../tslibs/ts/lib/lib.es2025.full.d.ts",
    "../common/nominal.d.ts",
    "../../../solution/sub-project/index.ts"
  ],
  "fileIdsList": [
    [
      "../common/nominal.d.ts"
    ]
  ],
  "fileInfos": {
    "../../../../../tslibs/ts/lib/lib.es2025.full.d.ts": {
      "original": {
        "version": "-25093698414-interface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "affectsGlobalScope": true
      },
      "version": "-25093698414-interface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
      "signature": "-25093698414-interface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
      "affectsGlobalScope": true
    },
    "../common/nominal.d.ts": {
      "version": "-16533634136-export declare type Nominal<T, Name extends string> = T & {};\n",
      "signature": "-16533634136-export declare type Nominal<T, Name extends string> = T & {};\n"
    },
    "../../../solution/sub-project/index.ts": {
      "original": {
        "version": "-22894055505-import { Nominal } from '../common/nominal';\n\nexport type MyNominal = Nominal<string, 'MyNominal'>;\n",
        "signature": "-25703752603-import { Nominal } from '../common/nominal';\nexport type MyNominal = Nominal<string, 'MyNominal'>;\n"
      },
      "version": "-22894055505-import { Nominal } from '../common/nominal';\n\nexport type MyNominal = Nominal<string, 'MyNominal'>;\n",
      "signature": "-25703752603-import { Nominal } from '../common/nominal';\nexport type MyNominal = Nominal<string, 'MyNominal'>;\n"
    }
  },
  "root": [
    [
      3,
      "../../../solution/sub-project/index.ts"
    ]
  ],
  "options": {
    "composite": true,
    "outDir": "../..",
    "rootDir": "../../..",
    "skipLibCheck": true
  },
  "referencedMap": {
    "../../../solution/sub-project/index.ts": [
      "../common/nominal.d.ts"
    ]
  },
  "latestChangedDtsFile": "./index.d.ts",
  "version": "FakeTSVersion",
  "size": 1131
}

//// [/home/src/workspaces/packages/lib/solution/sub-project-2/index.js]
const variable = {
    key: 'value',
};
export function getVar() {
    return 'key';
}


//// [/home/src/workspaces/packages/lib/solution/sub-project-2/index.d.ts]
import { MyNominal } from '../sub-project/index';
declare const variable: {
    key: MyNominal;
};
export declare function getVar(): keyof typeof variable;
export {};


//// [/home/src/workspaces/packages/lib/solution/sub-project-2/tsconfig.tsbuildinfo]
{"fileNames":["../../../../../tslibs/ts/lib/lib.es2025.full.d.ts","../common/nominal.d.ts","../sub-project/index.d.ts","../../../solution/sub-project-2/index.ts"],"fileIdsList":[[2],[3]],"fileInfos":[{"version":"-25093698414-interface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true},"-16533634136-export declare type Nominal<T, Name extends string> = T & {};\n","-25703752603-import { Nominal } from '../common/nominal';\nexport type MyNominal = Nominal<string, 'MyNominal'>;\n",{"version":"-13939373533-import { MyNominal } from '../sub-project/index';\n\nconst variable = {\n    key: 'value' as MyNominal,\n};\n\nexport function getVar(): keyof typeof variable {\n    return 'key';\n}\n","signature":"-20490736360-import { MyNominal } from '../sub-project/index';\ndeclare const variable: {\n    key: MyNominal;\n};\nexport declare function getVar(): keyof typeof variable;\nexport {};\n"}],"root":[4],"options":{"composite":true,"outDir":"../..","rootDir":"../../..","skipLibCheck":true},"referencedMap":[[3,1],[4,2]],"latestChangedDtsFile":"./index.d.ts","version":"FakeTSVersion"}

//// [/home/src/workspaces/packages/lib/solution/sub-project-2/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "fileNames": [
    "../../../../../tslibs/ts/lib/lib.es2025.full.d.ts",
    "../common/nominal.d.ts",
    "../sub-project/index.d.ts",
    "../../../solution/sub-project-2/index.ts"
  ],
  "fileIdsList": [
    [
      "../common/nominal.d.ts"
    ],
    [
      "../sub-project/index.d.ts"
    ]
  ],
  "fileInfos": {
    "../../../../../tslibs/ts/lib/lib.es2025.full.d.ts": {
      "original": {
        "version": "-25093698414-interface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "affectsGlobalScope": true
      },
      "version": "-25093698414-interface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
      "signature": "-25093698414-interface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
      "affectsGlobalScope": true
    },
    "../common/nominal.d.ts": {
      "version": "-16533634136-export declare type Nominal<T, Name extends string> = T & {};\n",
      "signature": "-16533634136-export declare type Nominal<T, Name extends string> = T & {};\n"
    },
    "../sub-project/index.d.ts": {
      "version": "-25703752603-import { Nominal } from '../common/nominal';\nexport type MyNominal = Nominal<string, 'MyNominal'>;\n",
      "signature": "-25703752603-import { Nominal } from '../common/nominal';\nexport type MyNominal = Nominal<string, 'MyNominal'>;\n"
    },
    "../../../solution/sub-project-2/index.ts": {
      "original": {
        "version": "-13939373533-import { MyNominal } from '../sub-project/index';\n\nconst variable = {\n    key: 'value' as MyNominal,\n};\n\nexport function getVar(): keyof typeof variable {\n    return 'key';\n}\n",
        "signature": "-20490736360-import { MyNominal } from '../sub-project/index';\ndeclare const variable: {\n    key: MyNominal;\n};\nexport declare function getVar(): keyof typeof variable;\nexport {};\n"
      },
      "version": "-13939373533-import { MyNominal } from '../sub-project/index';\n\nconst variable = {\n    key: 'value' as MyNominal,\n};\n\nexport function getVar(): keyof typeof variable {\n    return 'key';\n}\n",
      "signature": "-20490736360-import { MyNominal } from '../sub-project/index';\ndeclare const variable: {\n    key: MyNominal;\n};\nexport declare function getVar(): keyof typeof variable;\nexport {};\n"
    }
  },
  "root": [
    [
      4,
      "../../../solution/sub-project-2/index.ts"
    ]
  ],
  "options": {
    "composite": true,
    "outDir": "../..",
    "rootDir": "../../..",
    "skipLibCheck": true
  },
  "referencedMap": {
    "../sub-project/index.d.ts": [
      "../common/nominal.d.ts"
    ],
    "../../../solution/sub-project-2/index.ts": [
      "../sub-project/index.d.ts"
    ]
  },
  "latestChangedDtsFile": "./index.d.ts",
  "version": "FakeTSVersion",
  "size": 1441
}


exitCode:: ExitStatus.DiagnosticsPresent_OutputsGenerated
