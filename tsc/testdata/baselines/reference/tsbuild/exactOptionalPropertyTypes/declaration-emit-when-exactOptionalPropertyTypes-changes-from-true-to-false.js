currentDirectory::/home/src/workspaces/project
useCaseSensitiveFileNames::true
Input::
//// [/home/src/workspaces/project/consumer/index.ts] *new* 
import { result } from "../producer";
export const value: typeof result = { value: undefined };
//// [/home/src/workspaces/project/consumer/tsconfig.json] *new* 
{
    "compilerOptions": {
        "strict": true,
        "exactOptionalPropertyTypes": true,
        "composite": true,
        "emitDeclarationOnly": true,
        "lib": ["es5"],
        "outDir": "dist"
    },
    "references": [{ "path": "../producer" }],
    "files": ["index.ts"]
}
//// [/home/src/workspaces/project/producer/index.ts] *new* 
declare function make<T>(): { value?: T };
export const result = make<string>();
//// [/home/src/workspaces/project/producer/tsconfig.json] *new* 
{
    "compilerOptions": {
        "strict": true,
        "exactOptionalPropertyTypes": true,
        "composite": true,
        "emitDeclarationOnly": true,
        "target": "es2020",
        "module": "esnext",
        "lib": ["es5"],
        "outDir": "dist"
    },
    "files": ["index.ts"]
}

tsgo --build consumer --verbose
ExitStatus:: DiagnosticsPresent_OutputsGenerated
Output::
[[90mHH:MM:SS AM[0m] Projects in this build: 
    * producer/tsconfig.json
    * consumer/tsconfig.json

[[90mHH:MM:SS AM[0m] Project 'producer/tsconfig.json' is out of date because output file 'producer/dist/tsconfig.tsbuildinfo' does not exist

[[90mHH:MM:SS AM[0m] Building project 'producer/tsconfig.json'...

[[90mHH:MM:SS AM[0m] Project 'consumer/tsconfig.json' is out of date because output file 'consumer/dist/tsconfig.tsbuildinfo' does not exist

[[90mHH:MM:SS AM[0m] Building project 'consumer/tsconfig.json'...

[96mconsumer/index.ts[0m:[93m2[0m:[93m14[0m - [91merror[0m[90m TS2375: [0mType '{ value: undefined; }' is not assignable to type '{ value?: string; }' with 'exactOptionalPropertyTypes: true'. Consider adding 'undefined' to the types of the target's properties.
  Types of property 'value' are incompatible.
    Type 'undefined' is not assignable to type 'string'.

[7m2[0m export const value: typeof result = { value: undefined };
[7m [0m [91m             ~~~~~[0m


Found 1 error in consumer/index.ts[90m:2[0m

//// [/home/src/tslibs/TS/Lib/lib.es5.d.ts] *Lib*
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
interface SymbolConstructor {
    (desc?: string | number): symbol;
    for(name: string): symbol;
    readonly toStringTag: symbol;
}
declare var Symbol: SymbolConstructor;
interface Symbol {
    readonly [Symbol.toStringTag]: string;
}
declare const console: { log(msg: any): void; };
//// [/home/src/workspaces/project/consumer/dist/index.d.ts] *new* 
import { result } from "../producer";
export declare const value: typeof result;

//// [/home/src/workspaces/project/consumer/dist/tsconfig.tsbuildinfo] *new* 
{"version":"FakeTSVersion","root":[3],"fileNames":["lib.es5.d.ts","../../producer/dist/index.d.ts","../index.ts"],"fileInfos":[{"version":"8859c12c614ce56ba9a18e58384a198f-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ninterface SymbolConstructor {\n    (desc?: string | number): symbol;\n    for(name: string): symbol;\n    readonly toStringTag: symbol;\n}\ndeclare var Symbol: SymbolConstructor;\ninterface Symbol {\n    readonly [Symbol.toStringTag]: string;\n}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true,"impliedNodeFormat":1},"466ccd98668ec437fb7b9f660a2f9240-export declare const result: {\n    value?: string;\n};\n",{"version":"fabbe8df4bcbb914d7641c48938c0461-import { result } from \"../producer\";\nexport const value: typeof result = { value: undefined };","signature":"f23c37bb4bdf4d159c0bfe56864fad40-import { result } from \"../producer\";\nexport declare const value: typeof result;\n","impliedNodeFormat":1}],"fileIdsList":[[2]],"options":{"composite":true,"emitDeclarationOnly":true,"exactOptionalPropertyTypes":true,"outDir":"./","strict":true},"referencedMap":[[3,1]],"semanticDiagnosticsPerFile":[[3,[{"pos":51,"end":56,"code":2375,"category":1,"messageKey":"Type_0_is_not_assignable_to_type_1_with_exactOptionalPropertyTypes_Colon_true_Consider_adding_undefi_2375","messageArgs":["{ value: undefined; }","{ value?: string; }"],"messageChain":[{"pos":51,"end":56,"code":2326,"category":1,"messageKey":"Types_of_property_0_are_incompatible_2326","messageArgs":["value"],"messageChain":[{"pos":51,"end":56,"code":2322,"category":1,"messageKey":"Type_0_is_not_assignable_to_type_1_2322","messageArgs":["undefined","string"]}]}]}]]],"latestChangedDtsFile":"./index.d.ts"}
//// [/home/src/workspaces/project/consumer/dist/tsconfig.tsbuildinfo.readable.baseline.txt] *new* 
{
  "version": "FakeTSVersion",
  "root": [
    {
      "files": [
        "../index.ts"
      ],
      "original": 3
    }
  ],
  "fileNames": [
    "lib.es5.d.ts",
    "../../producer/dist/index.d.ts",
    "../index.ts"
  ],
  "fileInfos": [
    {
      "fileName": "lib.es5.d.ts",
      "version": "8859c12c614ce56ba9a18e58384a198f-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ninterface SymbolConstructor {\n    (desc?: string | number): symbol;\n    for(name: string): symbol;\n    readonly toStringTag: symbol;\n}\ndeclare var Symbol: SymbolConstructor;\ninterface Symbol {\n    readonly [Symbol.toStringTag]: string;\n}\ndeclare const console: { log(msg: any): void; };",
      "signature": "8859c12c614ce56ba9a18e58384a198f-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ninterface SymbolConstructor {\n    (desc?: string | number): symbol;\n    for(name: string): symbol;\n    readonly toStringTag: symbol;\n}\ndeclare var Symbol: SymbolConstructor;\ninterface Symbol {\n    readonly [Symbol.toStringTag]: string;\n}\ndeclare const console: { log(msg: any): void; };",
      "affectsGlobalScope": true,
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "8859c12c614ce56ba9a18e58384a198f-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ninterface SymbolConstructor {\n    (desc?: string | number): symbol;\n    for(name: string): symbol;\n    readonly toStringTag: symbol;\n}\ndeclare var Symbol: SymbolConstructor;\ninterface Symbol {\n    readonly [Symbol.toStringTag]: string;\n}\ndeclare const console: { log(msg: any): void; };",
        "affectsGlobalScope": true,
        "impliedNodeFormat": 1
      }
    },
    {
      "fileName": "../../producer/dist/index.d.ts",
      "version": "466ccd98668ec437fb7b9f660a2f9240-export declare const result: {\n    value?: string;\n};\n",
      "signature": "466ccd98668ec437fb7b9f660a2f9240-export declare const result: {\n    value?: string;\n};\n",
      "impliedNodeFormat": "CommonJS"
    },
    {
      "fileName": "../index.ts",
      "version": "fabbe8df4bcbb914d7641c48938c0461-import { result } from \"../producer\";\nexport const value: typeof result = { value: undefined };",
      "signature": "f23c37bb4bdf4d159c0bfe56864fad40-import { result } from \"../producer\";\nexport declare const value: typeof result;\n",
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "fabbe8df4bcbb914d7641c48938c0461-import { result } from \"../producer\";\nexport const value: typeof result = { value: undefined };",
        "signature": "f23c37bb4bdf4d159c0bfe56864fad40-import { result } from \"../producer\";\nexport declare const value: typeof result;\n",
        "impliedNodeFormat": 1
      }
    }
  ],
  "fileIdsList": [
    [
      "../../producer/dist/index.d.ts"
    ]
  ],
  "options": {
    "composite": true,
    "emitDeclarationOnly": true,
    "exactOptionalPropertyTypes": true,
    "outDir": "./",
    "strict": true
  },
  "referencedMap": {
    "../index.ts": [
      "../../producer/dist/index.d.ts"
    ]
  },
  "semanticDiagnosticsPerFile": [
    [
      "../index.ts",
      [
        {
          "pos": 51,
          "end": 56,
          "code": 2375,
          "category": 1,
          "messageKey": "Type_0_is_not_assignable_to_type_1_with_exactOptionalPropertyTypes_Colon_true_Consider_adding_undefi_2375",
          "messageArgs": [
            "{ value: undefined; }",
            "{ value?: string; }"
          ],
          "messageChain": [
            {
              "pos": 51,
              "end": 56,
              "code": 2326,
              "category": 1,
              "messageKey": "Types_of_property_0_are_incompatible_2326",
              "messageArgs": [
                "value"
              ],
              "messageChain": [
                {
                  "pos": 51,
                  "end": 56,
                  "code": 2322,
                  "category": 1,
                  "messageKey": "Type_0_is_not_assignable_to_type_1_2322",
                  "messageArgs": [
                    "undefined",
                    "string"
                  ]
                }
              ]
            }
          ]
        }
      ]
    ]
  ],
  "latestChangedDtsFile": "./index.d.ts",
  "size": 2054
}
//// [/home/src/workspaces/project/producer/dist/index.d.ts] *new* 
export declare const result: {
    value?: string;
};

//// [/home/src/workspaces/project/producer/dist/tsconfig.tsbuildinfo] *new* 
{"version":"FakeTSVersion","root":[2],"fileNames":["lib.es5.d.ts","../index.ts"],"fileInfos":[{"version":"8859c12c614ce56ba9a18e58384a198f-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ninterface SymbolConstructor {\n    (desc?: string | number): symbol;\n    for(name: string): symbol;\n    readonly toStringTag: symbol;\n}\ndeclare var Symbol: SymbolConstructor;\ninterface Symbol {\n    readonly [Symbol.toStringTag]: string;\n}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true,"impliedNodeFormat":1},{"version":"ce71d49ec9c731eb30d4d2ca52fd9246-declare function make<T>(): { value?: T };\nexport const result = make<string>();","signature":"466ccd98668ec437fb7b9f660a2f9240-export declare const result: {\n    value?: string;\n};\n","impliedNodeFormat":1}],"options":{"composite":true,"emitDeclarationOnly":true,"exactOptionalPropertyTypes":true,"module":99,"outDir":"./","strict":true,"target":7},"latestChangedDtsFile":"./index.d.ts"}
//// [/home/src/workspaces/project/producer/dist/tsconfig.tsbuildinfo.readable.baseline.txt] *new* 
{
  "version": "FakeTSVersion",
  "root": [
    {
      "files": [
        "../index.ts"
      ],
      "original": 2
    }
  ],
  "fileNames": [
    "lib.es5.d.ts",
    "../index.ts"
  ],
  "fileInfos": [
    {
      "fileName": "lib.es5.d.ts",
      "version": "8859c12c614ce56ba9a18e58384a198f-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ninterface SymbolConstructor {\n    (desc?: string | number): symbol;\n    for(name: string): symbol;\n    readonly toStringTag: symbol;\n}\ndeclare var Symbol: SymbolConstructor;\ninterface Symbol {\n    readonly [Symbol.toStringTag]: string;\n}\ndeclare const console: { log(msg: any): void; };",
      "signature": "8859c12c614ce56ba9a18e58384a198f-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ninterface SymbolConstructor {\n    (desc?: string | number): symbol;\n    for(name: string): symbol;\n    readonly toStringTag: symbol;\n}\ndeclare var Symbol: SymbolConstructor;\ninterface Symbol {\n    readonly [Symbol.toStringTag]: string;\n}\ndeclare const console: { log(msg: any): void; };",
      "affectsGlobalScope": true,
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "8859c12c614ce56ba9a18e58384a198f-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ninterface SymbolConstructor {\n    (desc?: string | number): symbol;\n    for(name: string): symbol;\n    readonly toStringTag: symbol;\n}\ndeclare var Symbol: SymbolConstructor;\ninterface Symbol {\n    readonly [Symbol.toStringTag]: string;\n}\ndeclare const console: { log(msg: any): void; };",
        "affectsGlobalScope": true,
        "impliedNodeFormat": 1
      }
    },
    {
      "fileName": "../index.ts",
      "version": "ce71d49ec9c731eb30d4d2ca52fd9246-declare function make<T>(): { value?: T };\nexport const result = make<string>();",
      "signature": "466ccd98668ec437fb7b9f660a2f9240-export declare const result: {\n    value?: string;\n};\n",
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "ce71d49ec9c731eb30d4d2ca52fd9246-declare function make<T>(): { value?: T };\nexport const result = make<string>();",
        "signature": "466ccd98668ec437fb7b9f660a2f9240-export declare const result: {\n    value?: string;\n};\n",
        "impliedNodeFormat": 1
      }
    }
  ],
  "options": {
    "composite": true,
    "emitDeclarationOnly": true,
    "exactOptionalPropertyTypes": true,
    "module": 99,
    "outDir": "./",
    "strict": true,
    "target": 7
  },
  "latestChangedDtsFile": "./index.d.ts",
  "size": 1300
}

producer/tsconfig.json::
SemanticDiagnostics::
*refresh*    /home/src/tslibs/TS/Lib/lib.es5.d.ts
*refresh*    /home/src/workspaces/project/producer/index.ts
Signatures::
(stored at emit) /home/src/workspaces/project/producer/index.ts

consumer/tsconfig.json::
SemanticDiagnostics::
*refresh*    /home/src/tslibs/TS/Lib/lib.es5.d.ts
*refresh*    /home/src/workspaces/project/producer/dist/index.d.ts
*refresh*    /home/src/workspaces/project/consumer/index.ts
Signatures::
(stored at emit) /home/src/workspaces/project/consumer/index.ts


Edit [0]:: toggle exactOptionalPropertyTypes without changing source files
//// [/home/src/workspaces/project/producer/tsconfig.json] *modified* 
{
    "compilerOptions": {
        "strict": true,
        "exactOptionalPropertyTypes": false,
        "composite": true,
        "emitDeclarationOnly": true,
        "target": "es2020",
        "module": "esnext",
        "lib": ["es5"],
        "outDir": "dist"
    },
    "files": ["index.ts"]
}

tsgo --build consumer --verbose
ExitStatus:: Success
Output::
[[90mHH:MM:SS AM[0m] Projects in this build: 
    * producer/tsconfig.json
    * consumer/tsconfig.json

[[90mHH:MM:SS AM[0m] Project 'producer/tsconfig.json' is out of date because output 'producer/dist/tsconfig.tsbuildinfo' is older than input 'producer/tsconfig.json'

[[90mHH:MM:SS AM[0m] Building project 'producer/tsconfig.json'...

[[90mHH:MM:SS AM[0m] Project 'consumer/tsconfig.json' is out of date because buildinfo file 'consumer/dist/tsconfig.tsbuildinfo' indicates that program needs to report errors.

[[90mHH:MM:SS AM[0m] Building project 'consumer/tsconfig.json'...

//// [/home/src/workspaces/project/consumer/dist/tsconfig.tsbuildinfo] *modified* 
{"version":"FakeTSVersion","root":[3],"fileNames":["lib.es5.d.ts","../../producer/dist/index.d.ts","../index.ts"],"fileInfos":[{"version":"8859c12c614ce56ba9a18e58384a198f-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ninterface SymbolConstructor {\n    (desc?: string | number): symbol;\n    for(name: string): symbol;\n    readonly toStringTag: symbol;\n}\ndeclare var Symbol: SymbolConstructor;\ninterface Symbol {\n    readonly [Symbol.toStringTag]: string;\n}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true,"impliedNodeFormat":1},"501ff75cdc5d82b297716d1b95ac0851-export declare const result: {\n    value?: string | undefined;\n};\n",{"version":"fabbe8df4bcbb914d7641c48938c0461-import { result } from \"../producer\";\nexport const value: typeof result = { value: undefined };","signature":"f23c37bb4bdf4d159c0bfe56864fad40-import { result } from \"../producer\";\nexport declare const value: typeof result;\n","impliedNodeFormat":1}],"fileIdsList":[[2]],"options":{"composite":true,"emitDeclarationOnly":true,"exactOptionalPropertyTypes":true,"outDir":"./","strict":true},"referencedMap":[[3,1]],"latestChangedDtsFile":"./index.d.ts"}
//// [/home/src/workspaces/project/consumer/dist/tsconfig.tsbuildinfo.readable.baseline.txt] *modified* 
{
  "version": "FakeTSVersion",
  "root": [
    {
      "files": [
        "../index.ts"
      ],
      "original": 3
    }
  ],
  "fileNames": [
    "lib.es5.d.ts",
    "../../producer/dist/index.d.ts",
    "../index.ts"
  ],
  "fileInfos": [
    {
      "fileName": "lib.es5.d.ts",
      "version": "8859c12c614ce56ba9a18e58384a198f-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ninterface SymbolConstructor {\n    (desc?: string | number): symbol;\n    for(name: string): symbol;\n    readonly toStringTag: symbol;\n}\ndeclare var Symbol: SymbolConstructor;\ninterface Symbol {\n    readonly [Symbol.toStringTag]: string;\n}\ndeclare const console: { log(msg: any): void; };",
      "signature": "8859c12c614ce56ba9a18e58384a198f-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ninterface SymbolConstructor {\n    (desc?: string | number): symbol;\n    for(name: string): symbol;\n    readonly toStringTag: symbol;\n}\ndeclare var Symbol: SymbolConstructor;\ninterface Symbol {\n    readonly [Symbol.toStringTag]: string;\n}\ndeclare const console: { log(msg: any): void; };",
      "affectsGlobalScope": true,
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "8859c12c614ce56ba9a18e58384a198f-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ninterface SymbolConstructor {\n    (desc?: string | number): symbol;\n    for(name: string): symbol;\n    readonly toStringTag: symbol;\n}\ndeclare var Symbol: SymbolConstructor;\ninterface Symbol {\n    readonly [Symbol.toStringTag]: string;\n}\ndeclare const console: { log(msg: any): void; };",
        "affectsGlobalScope": true,
        "impliedNodeFormat": 1
      }
    },
    {
      "fileName": "../../producer/dist/index.d.ts",
      "version": "501ff75cdc5d82b297716d1b95ac0851-export declare const result: {\n    value?: string | undefined;\n};\n",
      "signature": "501ff75cdc5d82b297716d1b95ac0851-export declare const result: {\n    value?: string | undefined;\n};\n",
      "impliedNodeFormat": "CommonJS"
    },
    {
      "fileName": "../index.ts",
      "version": "fabbe8df4bcbb914d7641c48938c0461-import { result } from \"../producer\";\nexport const value: typeof result = { value: undefined };",
      "signature": "f23c37bb4bdf4d159c0bfe56864fad40-import { result } from \"../producer\";\nexport declare const value: typeof result;\n",
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "fabbe8df4bcbb914d7641c48938c0461-import { result } from \"../producer\";\nexport const value: typeof result = { value: undefined };",
        "signature": "f23c37bb4bdf4d159c0bfe56864fad40-import { result } from \"../producer\";\nexport declare const value: typeof result;\n",
        "impliedNodeFormat": 1
      }
    }
  ],
  "fileIdsList": [
    [
      "../../producer/dist/index.d.ts"
    ]
  ],
  "options": {
    "composite": true,
    "emitDeclarationOnly": true,
    "exactOptionalPropertyTypes": true,
    "outDir": "./",
    "strict": true
  },
  "referencedMap": {
    "../index.ts": [
      "../../producer/dist/index.d.ts"
    ]
  },
  "latestChangedDtsFile": "./index.d.ts",
  "size": 1504
}
//// [/home/src/workspaces/project/producer/dist/index.d.ts] *modified* 
export declare const result: {
    value?: string | undefined;
};

//// [/home/src/workspaces/project/producer/dist/tsconfig.tsbuildinfo] *modified* 
{"version":"FakeTSVersion","root":[2],"fileNames":["lib.es5.d.ts","../index.ts"],"fileInfos":[{"version":"8859c12c614ce56ba9a18e58384a198f-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ninterface SymbolConstructor {\n    (desc?: string | number): symbol;\n    for(name: string): symbol;\n    readonly toStringTag: symbol;\n}\ndeclare var Symbol: SymbolConstructor;\ninterface Symbol {\n    readonly [Symbol.toStringTag]: string;\n}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true,"impliedNodeFormat":1},{"version":"ce71d49ec9c731eb30d4d2ca52fd9246-declare function make<T>(): { value?: T };\nexport const result = make<string>();","signature":"501ff75cdc5d82b297716d1b95ac0851-export declare const result: {\n    value?: string | undefined;\n};\n","impliedNodeFormat":1}],"options":{"composite":true,"emitDeclarationOnly":true,"exactOptionalPropertyTypes":false,"module":99,"outDir":"./","strict":true,"target":7},"latestChangedDtsFile":"./index.d.ts"}
//// [/home/src/workspaces/project/producer/dist/tsconfig.tsbuildinfo.readable.baseline.txt] *modified* 
{
  "version": "FakeTSVersion",
  "root": [
    {
      "files": [
        "../index.ts"
      ],
      "original": 2
    }
  ],
  "fileNames": [
    "lib.es5.d.ts",
    "../index.ts"
  ],
  "fileInfos": [
    {
      "fileName": "lib.es5.d.ts",
      "version": "8859c12c614ce56ba9a18e58384a198f-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ninterface SymbolConstructor {\n    (desc?: string | number): symbol;\n    for(name: string): symbol;\n    readonly toStringTag: symbol;\n}\ndeclare var Symbol: SymbolConstructor;\ninterface Symbol {\n    readonly [Symbol.toStringTag]: string;\n}\ndeclare const console: { log(msg: any): void; };",
      "signature": "8859c12c614ce56ba9a18e58384a198f-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ninterface SymbolConstructor {\n    (desc?: string | number): symbol;\n    for(name: string): symbol;\n    readonly toStringTag: symbol;\n}\ndeclare var Symbol: SymbolConstructor;\ninterface Symbol {\n    readonly [Symbol.toStringTag]: string;\n}\ndeclare const console: { log(msg: any): void; };",
      "affectsGlobalScope": true,
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "8859c12c614ce56ba9a18e58384a198f-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ninterface SymbolConstructor {\n    (desc?: string | number): symbol;\n    for(name: string): symbol;\n    readonly toStringTag: symbol;\n}\ndeclare var Symbol: SymbolConstructor;\ninterface Symbol {\n    readonly [Symbol.toStringTag]: string;\n}\ndeclare const console: { log(msg: any): void; };",
        "affectsGlobalScope": true,
        "impliedNodeFormat": 1
      }
    },
    {
      "fileName": "../index.ts",
      "version": "ce71d49ec9c731eb30d4d2ca52fd9246-declare function make<T>(): { value?: T };\nexport const result = make<string>();",
      "signature": "501ff75cdc5d82b297716d1b95ac0851-export declare const result: {\n    value?: string | undefined;\n};\n",
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "ce71d49ec9c731eb30d4d2ca52fd9246-declare function make<T>(): { value?: T };\nexport const result = make<string>();",
        "signature": "501ff75cdc5d82b297716d1b95ac0851-export declare const result: {\n    value?: string | undefined;\n};\n",
        "impliedNodeFormat": 1
      }
    }
  ],
  "options": {
    "composite": true,
    "emitDeclarationOnly": true,
    "exactOptionalPropertyTypes": false,
    "module": 99,
    "outDir": "./",
    "strict": true,
    "target": 7
  },
  "latestChangedDtsFile": "./index.d.ts",
  "size": 1313
}

producer/tsconfig.json::
SemanticDiagnostics::
*refresh*    /home/src/tslibs/TS/Lib/lib.es5.d.ts
*refresh*    /home/src/workspaces/project/producer/index.ts
Signatures::
(stored at emit) /home/src/workspaces/project/producer/index.ts

consumer/tsconfig.json::
SemanticDiagnostics::
*refresh*    /home/src/workspaces/project/producer/dist/index.d.ts
*refresh*    /home/src/workspaces/project/consumer/index.ts
Signatures::
(used version)   /home/src/workspaces/project/producer/dist/index.d.ts
(computed .d.ts) /home/src/workspaces/project/consumer/index.ts


Edit [1]:: no change

tsgo --build consumer --verbose
ExitStatus:: Success
Output::
[[90mHH:MM:SS AM[0m] Projects in this build: 
    * producer/tsconfig.json
    * consumer/tsconfig.json

[[90mHH:MM:SS AM[0m] Project 'producer/tsconfig.json' is up to date because newest input 'producer/index.ts' is older than output 'producer/dist/tsconfig.tsbuildinfo'

[[90mHH:MM:SS AM[0m] Project 'consumer/tsconfig.json' is up to date because newest input 'consumer/index.ts' is older than output 'consumer/dist/tsconfig.tsbuildinfo'




Edit [2]:: force rebuild with the same compiler options

tsgo --build consumer --verbose --force
ExitStatus:: Success
Output::
[[90mHH:MM:SS AM[0m] Projects in this build: 
    * producer/tsconfig.json
    * consumer/tsconfig.json

[[90mHH:MM:SS AM[0m] Project 'producer/tsconfig.json' is being forcibly rebuilt

[[90mHH:MM:SS AM[0m] Building project 'producer/tsconfig.json'...

[[90mHH:MM:SS AM[0m] Project 'consumer/tsconfig.json' is being forcibly rebuilt

[[90mHH:MM:SS AM[0m] Building project 'consumer/tsconfig.json'...

//// [/home/src/workspaces/project/consumer/dist/index.d.ts] *rewrite with same content*
//// [/home/src/workspaces/project/consumer/dist/tsconfig.tsbuildinfo] *rewrite with same content*
//// [/home/src/workspaces/project/consumer/dist/tsconfig.tsbuildinfo.readable.baseline.txt] *rewrite with same content*
//// [/home/src/workspaces/project/producer/dist/index.d.ts] *rewrite with same content*
//// [/home/src/workspaces/project/producer/dist/tsconfig.tsbuildinfo] *rewrite with same content*
//// [/home/src/workspaces/project/producer/dist/tsconfig.tsbuildinfo.readable.baseline.txt] *rewrite with same content*

producer/tsconfig.json::
SemanticDiagnostics::
*refresh*    /home/src/tslibs/TS/Lib/lib.es5.d.ts
*refresh*    /home/src/workspaces/project/producer/index.ts
Signatures::
(stored at emit) /home/src/workspaces/project/producer/index.ts

consumer/tsconfig.json::
SemanticDiagnostics::
*refresh*    /home/src/tslibs/TS/Lib/lib.es5.d.ts
*refresh*    /home/src/workspaces/project/producer/dist/index.d.ts
*refresh*    /home/src/workspaces/project/consumer/index.ts
Signatures::
(stored at emit) /home/src/workspaces/project/consumer/index.ts


Edit [3]:: no change

tsgo --build consumer --verbose
ExitStatus:: Success
Output::
[[90mHH:MM:SS AM[0m] Projects in this build: 
    * producer/tsconfig.json
    * consumer/tsconfig.json

[[90mHH:MM:SS AM[0m] Project 'producer/tsconfig.json' is up to date because newest input 'producer/index.ts' is older than output 'producer/dist/tsconfig.tsbuildinfo'

[[90mHH:MM:SS AM[0m] Project 'consumer/tsconfig.json' is up to date because newest input 'consumer/index.ts' is older than output 'consumer/dist/tsconfig.tsbuildinfo'


