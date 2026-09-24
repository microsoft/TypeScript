currentDirectory::/home/src/workspaces/project
useCaseSensitiveFileNames::true
Input::
//// [/home/src/tslibs/TS/Lib/lib.es2025.full.d.ts] *new* 
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
interface ReadonlyArray<T> { readonly length: number; readonly [n: number]: T; }
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
//// [/home/src/workspaces/project/a.ts] *new* 
type Json = string | Json[];
type Parsed<T> = T extends object ? { [K in keyof T]: Parsed<T[K]> } : T;
declare function wrap<T>(value: T): Parsed<T>;
export const value = wrap({ items: [] as Json[] });
//// [/home/src/workspaces/project/b.ts] *new* 
import { value } from "./a";
export const n: number = value.items;
//// [/home/src/workspaces/project/tsconfig.json] *new* 
{"compilerOptions": {"strict": true, "noEmit": true, "incremental": true}}

tsgo 
ExitStatus:: DiagnosticsPresent_OutputsGenerated
Output::
[96mb.ts[0m:[93m2[0m:[93m14[0m - [91merror[0m[90m TS2322: [0mType 'Parsed<Json[]>' is not assignable to type 'number'.

[7m2[0m export const n: number = value.items;
[7m [0m [91m             ~[0m


Found 1 error in b.ts[90m:2[0m

//// [/home/src/workspaces/project/tsconfig.tsbuildinfo] *new* 
{"version":"FakeTSVersion","root":[[2,3]],"fileNames":["lib.es2025.full.d.ts","./a.ts","./b.ts"],"fileInfos":[{"version":"0e330bc1e98a7e2601e4b38548df5e2b-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> { readonly length: number; readonly [n: number]: T; }\ninterface SymbolConstructor {\n    (desc?: string | number): symbol;\n    for(name: string): symbol;\n    readonly toStringTag: symbol;\n}\ndeclare var Symbol: SymbolConstructor;\ninterface Symbol {\n    readonly [Symbol.toStringTag]: string;\n}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true,"impliedNodeFormat":1},"3f24abe1dc43308e4499e42c9bbbb9bd-type Json = string | Json[];\ntype Parsed<T> = T extends object ? { [K in keyof T]: Parsed<T[K]> } : T;\ndeclare function wrap<T>(value: T): Parsed<T>;\nexport const value = wrap({ items: [] as Json[] });","3664d7db9751b354c0abbbd215c8689c-import { value } from \"./a\";\nexport const n: number = value.items;"],"fileIdsList":[[2]],"options":{"strict":true},"referencedMap":[[3,1]],"semanticDiagnosticsPerFile":[[3,[{"pos":42,"end":43,"code":2322,"category":1,"messageKey":"Type_0_is_not_assignable_to_type_1_2322","messageArgs":["Parsed<Json[]>","number"]}]]],"affectedFilesPendingEmit":[2,3]}
//// [/home/src/workspaces/project/tsconfig.tsbuildinfo.readable.baseline.txt] *new* 
{
  "version": "FakeTSVersion",
  "root": [
    {
      "files": [
        "./a.ts",
        "./b.ts"
      ],
      "original": [
        2,
        3
      ]
    }
  ],
  "fileNames": [
    "lib.es2025.full.d.ts",
    "./a.ts",
    "./b.ts"
  ],
  "fileInfos": [
    {
      "fileName": "lib.es2025.full.d.ts",
      "version": "0e330bc1e98a7e2601e4b38548df5e2b-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> { readonly length: number; readonly [n: number]: T; }\ninterface SymbolConstructor {\n    (desc?: string | number): symbol;\n    for(name: string): symbol;\n    readonly toStringTag: symbol;\n}\ndeclare var Symbol: SymbolConstructor;\ninterface Symbol {\n    readonly [Symbol.toStringTag]: string;\n}\ndeclare const console: { log(msg: any): void; };",
      "signature": "0e330bc1e98a7e2601e4b38548df5e2b-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> { readonly length: number; readonly [n: number]: T; }\ninterface SymbolConstructor {\n    (desc?: string | number): symbol;\n    for(name: string): symbol;\n    readonly toStringTag: symbol;\n}\ndeclare var Symbol: SymbolConstructor;\ninterface Symbol {\n    readonly [Symbol.toStringTag]: string;\n}\ndeclare const console: { log(msg: any): void; };",
      "affectsGlobalScope": true,
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "0e330bc1e98a7e2601e4b38548df5e2b-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> { readonly length: number; readonly [n: number]: T; }\ninterface SymbolConstructor {\n    (desc?: string | number): symbol;\n    for(name: string): symbol;\n    readonly toStringTag: symbol;\n}\ndeclare var Symbol: SymbolConstructor;\ninterface Symbol {\n    readonly [Symbol.toStringTag]: string;\n}\ndeclare const console: { log(msg: any): void; };",
        "affectsGlobalScope": true,
        "impliedNodeFormat": 1
      }
    },
    {
      "fileName": "./a.ts",
      "version": "3f24abe1dc43308e4499e42c9bbbb9bd-type Json = string | Json[];\ntype Parsed<T> = T extends object ? { [K in keyof T]: Parsed<T[K]> } : T;\ndeclare function wrap<T>(value: T): Parsed<T>;\nexport const value = wrap({ items: [] as Json[] });",
      "signature": "3f24abe1dc43308e4499e42c9bbbb9bd-type Json = string | Json[];\ntype Parsed<T> = T extends object ? { [K in keyof T]: Parsed<T[K]> } : T;\ndeclare function wrap<T>(value: T): Parsed<T>;\nexport const value = wrap({ items: [] as Json[] });",
      "impliedNodeFormat": "CommonJS"
    },
    {
      "fileName": "./b.ts",
      "version": "3664d7db9751b354c0abbbd215c8689c-import { value } from \"./a\";\nexport const n: number = value.items;",
      "signature": "3664d7db9751b354c0abbbd215c8689c-import { value } from \"./a\";\nexport const n: number = value.items;",
      "impliedNodeFormat": "CommonJS"
    }
  ],
  "fileIdsList": [
    [
      "./a.ts"
    ]
  ],
  "options": {
    "strict": true
  },
  "referencedMap": {
    "./b.ts": [
      "./a.ts"
    ]
  },
  "semanticDiagnosticsPerFile": [
    [
      "./b.ts",
      [
        {
          "pos": 42,
          "end": 43,
          "code": 2322,
          "category": 1,
          "messageKey": "Type_0_is_not_assignable_to_type_1_2322",
          "messageArgs": [
            "Parsed<Json[]>",
            "number"
          ]
        }
      ]
    ]
  ],
  "affectedFilesPendingEmit": [
    [
      "./a.ts",
      "Js",
      2
    ],
    [
      "./b.ts",
      "Js",
      3
    ]
  ],
  "size": 1559
}

tsconfig.json::
SemanticDiagnostics::
*refresh*    /home/src/tslibs/TS/Lib/lib.es2025.full.d.ts
*refresh*    /home/src/workspaces/project/a.ts
*refresh*    /home/src/workspaces/project/b.ts
Signatures::


Edit [0]:: add a comment to the producer
//// [/home/src/workspaces/project/a.ts] *modified* 
type Json = string | Json[];
type Parsed<T> = T extends object ? { [K in keyof T]: Parsed<T[K]> } : T;
declare function wrap<T>(value: T): Parsed<T>;
export const value = wrap({ items: [] as Json[] });
// comment-only edit


tsgo 
ExitStatus:: DiagnosticsPresent_OutputsGenerated
Output::
[96mb.ts[0m:[93m2[0m:[93m14[0m - [91merror[0m[90m TS2322: [0mType 'Parsed<Json[]>' is not assignable to type 'number'.

[7m2[0m export const n: number = value.items;
[7m [0m [91m             ~[0m


Found 1 error in b.ts[90m:2[0m

//// [/home/src/workspaces/project/tsconfig.tsbuildinfo] *modified* 
{"version":"FakeTSVersion","root":[[2,3]],"fileNames":["lib.es2025.full.d.ts","./a.ts","./b.ts"],"fileInfos":[{"version":"0e330bc1e98a7e2601e4b38548df5e2b-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> { readonly length: number; readonly [n: number]: T; }\ninterface SymbolConstructor {\n    (desc?: string | number): symbol;\n    for(name: string): symbol;\n    readonly toStringTag: symbol;\n}\ndeclare var Symbol: SymbolConstructor;\ninterface Symbol {\n    readonly [Symbol.toStringTag]: string;\n}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true,"impliedNodeFormat":1},{"version":"05e6c83fc809e0d08962e5b3425da798-type Json = string | Json[];\ntype Parsed<T> = T extends object ? { [K in keyof T]: Parsed<T[K]> } : T;\ndeclare function wrap<T>(value: T): Parsed<T>;\nexport const value = wrap({ items: [] as Json[] });\n// comment-only edit\n","signature":"fcde39c2b051f56c2bdf4ff787c0b50e-type Json = string | Json[];\ntype Parsed<T> = T extends object ? {\n    [K in keyof T]: Parsed<T[K]>;\n} : T;\nexport declare const value: {\n    items: Parsed<Json[]>;\n};\nexport {};\n","impliedNodeFormat":1},{"version":"3664d7db9751b354c0abbbd215c8689c-import { value } from \"./a\";\nexport const n: number = value.items;","signature":"3d01ec51536810851f52ebd881c4789f-export declare const n: number;\n","impliedNodeFormat":1}],"fileIdsList":[[2]],"options":{"strict":true},"referencedMap":[[3,1]],"semanticDiagnosticsPerFile":[[3,[{"pos":42,"end":43,"code":2322,"category":1,"messageKey":"Type_0_is_not_assignable_to_type_1_2322","messageArgs":["Parsed<Json[]>","number"]}]]],"affectedFilesPendingEmit":[2,3]}
//// [/home/src/workspaces/project/tsconfig.tsbuildinfo.readable.baseline.txt] *modified* 
{
  "version": "FakeTSVersion",
  "root": [
    {
      "files": [
        "./a.ts",
        "./b.ts"
      ],
      "original": [
        2,
        3
      ]
    }
  ],
  "fileNames": [
    "lib.es2025.full.d.ts",
    "./a.ts",
    "./b.ts"
  ],
  "fileInfos": [
    {
      "fileName": "lib.es2025.full.d.ts",
      "version": "0e330bc1e98a7e2601e4b38548df5e2b-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> { readonly length: number; readonly [n: number]: T; }\ninterface SymbolConstructor {\n    (desc?: string | number): symbol;\n    for(name: string): symbol;\n    readonly toStringTag: symbol;\n}\ndeclare var Symbol: SymbolConstructor;\ninterface Symbol {\n    readonly [Symbol.toStringTag]: string;\n}\ndeclare const console: { log(msg: any): void; };",
      "signature": "0e330bc1e98a7e2601e4b38548df5e2b-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> { readonly length: number; readonly [n: number]: T; }\ninterface SymbolConstructor {\n    (desc?: string | number): symbol;\n    for(name: string): symbol;\n    readonly toStringTag: symbol;\n}\ndeclare var Symbol: SymbolConstructor;\ninterface Symbol {\n    readonly [Symbol.toStringTag]: string;\n}\ndeclare const console: { log(msg: any): void; };",
      "affectsGlobalScope": true,
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "0e330bc1e98a7e2601e4b38548df5e2b-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> { readonly length: number; readonly [n: number]: T; }\ninterface SymbolConstructor {\n    (desc?: string | number): symbol;\n    for(name: string): symbol;\n    readonly toStringTag: symbol;\n}\ndeclare var Symbol: SymbolConstructor;\ninterface Symbol {\n    readonly [Symbol.toStringTag]: string;\n}\ndeclare const console: { log(msg: any): void; };",
        "affectsGlobalScope": true,
        "impliedNodeFormat": 1
      }
    },
    {
      "fileName": "./a.ts",
      "version": "05e6c83fc809e0d08962e5b3425da798-type Json = string | Json[];\ntype Parsed<T> = T extends object ? { [K in keyof T]: Parsed<T[K]> } : T;\ndeclare function wrap<T>(value: T): Parsed<T>;\nexport const value = wrap({ items: [] as Json[] });\n// comment-only edit\n",
      "signature": "fcde39c2b051f56c2bdf4ff787c0b50e-type Json = string | Json[];\ntype Parsed<T> = T extends object ? {\n    [K in keyof T]: Parsed<T[K]>;\n} : T;\nexport declare const value: {\n    items: Parsed<Json[]>;\n};\nexport {};\n",
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "05e6c83fc809e0d08962e5b3425da798-type Json = string | Json[];\ntype Parsed<T> = T extends object ? { [K in keyof T]: Parsed<T[K]> } : T;\ndeclare function wrap<T>(value: T): Parsed<T>;\nexport const value = wrap({ items: [] as Json[] });\n// comment-only edit\n",
        "signature": "fcde39c2b051f56c2bdf4ff787c0b50e-type Json = string | Json[];\ntype Parsed<T> = T extends object ? {\n    [K in keyof T]: Parsed<T[K]>;\n} : T;\nexport declare const value: {\n    items: Parsed<Json[]>;\n};\nexport {};\n",
        "impliedNodeFormat": 1
      }
    },
    {
      "fileName": "./b.ts",
      "version": "3664d7db9751b354c0abbbd215c8689c-import { value } from \"./a\";\nexport const n: number = value.items;",
      "signature": "3d01ec51536810851f52ebd881c4789f-export declare const n: number;\n",
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "3664d7db9751b354c0abbbd215c8689c-import { value } from \"./a\";\nexport const n: number = value.items;",
        "signature": "3d01ec51536810851f52ebd881c4789f-export declare const n: number;\n",
        "impliedNodeFormat": 1
      }
    }
  ],
  "fileIdsList": [
    [
      "./a.ts"
    ]
  ],
  "options": {
    "strict": true
  },
  "referencedMap": {
    "./b.ts": [
      "./a.ts"
    ]
  },
  "semanticDiagnosticsPerFile": [
    [
      "./b.ts",
      [
        {
          "pos": 42,
          "end": 43,
          "code": 2322,
          "category": 1,
          "messageKey": "Type_0_is_not_assignable_to_type_1_2322",
          "messageArgs": [
            "Parsed<Json[]>",
            "number"
          ]
        }
      ]
    ]
  ],
  "affectedFilesPendingEmit": [
    [
      "./a.ts",
      "Js",
      2
    ],
    [
      "./b.ts",
      "Js",
      3
    ]
  ],
  "size": 1967
}

tsconfig.json::
SemanticDiagnostics::
*refresh*    /home/src/workspaces/project/a.ts
*refresh*    /home/src/workspaces/project/b.ts
Signatures::
(computed .d.ts) /home/src/workspaces/project/a.ts
(computed .d.ts) /home/src/workspaces/project/b.ts


Edit [1]:: no change

tsgo 
ExitStatus:: DiagnosticsPresent_OutputsGenerated
Output::
[96mb.ts[0m:[93m2[0m:[93m14[0m - [91merror[0m[90m TS2322: [0mType 'Parsed<Json[]>' is not assignable to type 'number'.

[7m2[0m export const n: number = value.items;
[7m [0m [91m             ~[0m


Found 1 error in b.ts[90m:2[0m


tsconfig.json::
SemanticDiagnostics::
Signatures::


Edit [2]:: no change

tsgo 
ExitStatus:: DiagnosticsPresent_OutputsGenerated
Output::
[96mb.ts[0m:[93m2[0m:[93m14[0m - [91merror[0m[90m TS2322: [0mType 'Parsed<Json[]>' is not assignable to type 'number'.

[7m2[0m export const n: number = value.items;
[7m [0m [91m             ~[0m


Found 1 error in b.ts[90m:2[0m


tsconfig.json::
SemanticDiagnostics::
Signatures::


Edit [3]:: delete build info and check the edited source afresh
//// [/home/src/workspaces/project/tsconfig.tsbuildinfo] *deleted*

tsgo 
ExitStatus:: DiagnosticsPresent_OutputsGenerated
Output::
[96mb.ts[0m:[93m2[0m:[93m14[0m - [91merror[0m[90m TS2322: [0mType 'Parsed<Json[]>' is not assignable to type 'number'.

[7m2[0m export const n: number = value.items;
[7m [0m [91m             ~[0m


Found 1 error in b.ts[90m:2[0m

//// [/home/src/workspaces/project/tsconfig.tsbuildinfo] *new* 
{"version":"FakeTSVersion","root":[[2,3]],"fileNames":["lib.es2025.full.d.ts","./a.ts","./b.ts"],"fileInfos":[{"version":"0e330bc1e98a7e2601e4b38548df5e2b-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> { readonly length: number; readonly [n: number]: T; }\ninterface SymbolConstructor {\n    (desc?: string | number): symbol;\n    for(name: string): symbol;\n    readonly toStringTag: symbol;\n}\ndeclare var Symbol: SymbolConstructor;\ninterface Symbol {\n    readonly [Symbol.toStringTag]: string;\n}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true,"impliedNodeFormat":1},"05e6c83fc809e0d08962e5b3425da798-type Json = string | Json[];\ntype Parsed<T> = T extends object ? { [K in keyof T]: Parsed<T[K]> } : T;\ndeclare function wrap<T>(value: T): Parsed<T>;\nexport const value = wrap({ items: [] as Json[] });\n// comment-only edit\n","3664d7db9751b354c0abbbd215c8689c-import { value } from \"./a\";\nexport const n: number = value.items;"],"fileIdsList":[[2]],"options":{"strict":true},"referencedMap":[[3,1]],"semanticDiagnosticsPerFile":[[3,[{"pos":42,"end":43,"code":2322,"category":1,"messageKey":"Type_0_is_not_assignable_to_type_1_2322","messageArgs":["Parsed<Json[]>","number"]}]]],"affectedFilesPendingEmit":[2,3]}
//// [/home/src/workspaces/project/tsconfig.tsbuildinfo.readable.baseline.txt] *modified* 
{
  "version": "FakeTSVersion",
  "root": [
    {
      "files": [
        "./a.ts",
        "./b.ts"
      ],
      "original": [
        2,
        3
      ]
    }
  ],
  "fileNames": [
    "lib.es2025.full.d.ts",
    "./a.ts",
    "./b.ts"
  ],
  "fileInfos": [
    {
      "fileName": "lib.es2025.full.d.ts",
      "version": "0e330bc1e98a7e2601e4b38548df5e2b-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> { readonly length: number; readonly [n: number]: T; }\ninterface SymbolConstructor {\n    (desc?: string | number): symbol;\n    for(name: string): symbol;\n    readonly toStringTag: symbol;\n}\ndeclare var Symbol: SymbolConstructor;\ninterface Symbol {\n    readonly [Symbol.toStringTag]: string;\n}\ndeclare const console: { log(msg: any): void; };",
      "signature": "0e330bc1e98a7e2601e4b38548df5e2b-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> { readonly length: number; readonly [n: number]: T; }\ninterface SymbolConstructor {\n    (desc?: string | number): symbol;\n    for(name: string): symbol;\n    readonly toStringTag: symbol;\n}\ndeclare var Symbol: SymbolConstructor;\ninterface Symbol {\n    readonly [Symbol.toStringTag]: string;\n}\ndeclare const console: { log(msg: any): void; };",
      "affectsGlobalScope": true,
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "0e330bc1e98a7e2601e4b38548df5e2b-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> { readonly length: number; readonly [n: number]: T; }\ninterface SymbolConstructor {\n    (desc?: string | number): symbol;\n    for(name: string): symbol;\n    readonly toStringTag: symbol;\n}\ndeclare var Symbol: SymbolConstructor;\ninterface Symbol {\n    readonly [Symbol.toStringTag]: string;\n}\ndeclare const console: { log(msg: any): void; };",
        "affectsGlobalScope": true,
        "impliedNodeFormat": 1
      }
    },
    {
      "fileName": "./a.ts",
      "version": "05e6c83fc809e0d08962e5b3425da798-type Json = string | Json[];\ntype Parsed<T> = T extends object ? { [K in keyof T]: Parsed<T[K]> } : T;\ndeclare function wrap<T>(value: T): Parsed<T>;\nexport const value = wrap({ items: [] as Json[] });\n// comment-only edit\n",
      "signature": "05e6c83fc809e0d08962e5b3425da798-type Json = string | Json[];\ntype Parsed<T> = T extends object ? { [K in keyof T]: Parsed<T[K]> } : T;\ndeclare function wrap<T>(value: T): Parsed<T>;\nexport const value = wrap({ items: [] as Json[] });\n// comment-only edit\n",
      "impliedNodeFormat": "CommonJS"
    },
    {
      "fileName": "./b.ts",
      "version": "3664d7db9751b354c0abbbd215c8689c-import { value } from \"./a\";\nexport const n: number = value.items;",
      "signature": "3664d7db9751b354c0abbbd215c8689c-import { value } from \"./a\";\nexport const n: number = value.items;",
      "impliedNodeFormat": "CommonJS"
    }
  ],
  "fileIdsList": [
    [
      "./a.ts"
    ]
  ],
  "options": {
    "strict": true
  },
  "referencedMap": {
    "./b.ts": [
      "./a.ts"
    ]
  },
  "semanticDiagnosticsPerFile": [
    [
      "./b.ts",
      [
        {
          "pos": 42,
          "end": 43,
          "code": 2322,
          "category": 1,
          "messageKey": "Type_0_is_not_assignable_to_type_1_2322",
          "messageArgs": [
            "Parsed<Json[]>",
            "number"
          ]
        }
      ]
    ]
  ],
  "affectedFilesPendingEmit": [
    [
      "./a.ts",
      "Js",
      2
    ],
    [
      "./b.ts",
      "Js",
      3
    ]
  ],
  "size": 1583
}

tsconfig.json::
SemanticDiagnostics::
*refresh*    /home/src/tslibs/TS/Lib/lib.es2025.full.d.ts
*refresh*    /home/src/workspaces/project/a.ts
*refresh*    /home/src/workspaces/project/b.ts
Signatures::
