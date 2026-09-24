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
//// [/home/src/workspaces/project/consumer.ts] *new* 
import { doc } from "./doc";
export const value = doc;
//// [/home/src/workspaces/project/doc.ts] *new* 
type Doc =
    | string
    | { [k: string]: Doc }
    | readonly ["array", Doc]
    | readonly ["array", Doc, { length: number }]
    | readonly ["array", Doc, { min?: number; max?: number }]
    | readonly ["union", Doc, ...Doc[]];
export declare const doc: Doc;
//// [/home/src/workspaces/project/tsconfig.json] *new* 
{"compilerOptions": {"strict": true, "incremental": true, "noEmit": true, "module": "esnext", "moduleResolution": "bundler"}}

tsgo 
ExitStatus:: Success
Output::
//// [/home/src/workspaces/project/tsconfig.tsbuildinfo] *new* 
{"version":"FakeTSVersion","root":[[2,3]],"fileNames":["lib.es2025.full.d.ts","./doc.ts","./consumer.ts"],"fileInfos":[{"version":"0e330bc1e98a7e2601e4b38548df5e2b-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> { readonly length: number; readonly [n: number]: T; }\ninterface SymbolConstructor {\n    (desc?: string | number): symbol;\n    for(name: string): symbol;\n    readonly toStringTag: symbol;\n}\ndeclare var Symbol: SymbolConstructor;\ninterface Symbol {\n    readonly [Symbol.toStringTag]: string;\n}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true,"impliedNodeFormat":1},"5fa9a45d6461d373d994072ba4b41eca-type Doc =\n    | string\n    | { [k: string]: Doc }\n    | readonly [\"array\", Doc]\n    | readonly [\"array\", Doc, { length: number }]\n    | readonly [\"array\", Doc, { min?: number; max?: number }]\n    | readonly [\"union\", Doc, ...Doc[]];\nexport declare const doc: Doc;","e3e1863b40b48bf670281f2578788e0b-import { doc } from \"./doc\";\nexport const value = doc;"],"fileIdsList":[[2]],"options":{"module":99,"strict":true},"referencedMap":[[3,1]],"affectedFilesPendingEmit":[3,2]}
//// [/home/src/workspaces/project/tsconfig.tsbuildinfo.readable.baseline.txt] *new* 
{
  "version": "FakeTSVersion",
  "root": [
    {
      "files": [
        "./doc.ts",
        "./consumer.ts"
      ],
      "original": [
        2,
        3
      ]
    }
  ],
  "fileNames": [
    "lib.es2025.full.d.ts",
    "./doc.ts",
    "./consumer.ts"
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
      "fileName": "./doc.ts",
      "version": "5fa9a45d6461d373d994072ba4b41eca-type Doc =\n    | string\n    | { [k: string]: Doc }\n    | readonly [\"array\", Doc]\n    | readonly [\"array\", Doc, { length: number }]\n    | readonly [\"array\", Doc, { min?: number; max?: number }]\n    | readonly [\"union\", Doc, ...Doc[]];\nexport declare const doc: Doc;",
      "signature": "5fa9a45d6461d373d994072ba4b41eca-type Doc =\n    | string\n    | { [k: string]: Doc }\n    | readonly [\"array\", Doc]\n    | readonly [\"array\", Doc, { length: number }]\n    | readonly [\"array\", Doc, { min?: number; max?: number }]\n    | readonly [\"union\", Doc, ...Doc[]];\nexport declare const doc: Doc;",
      "impliedNodeFormat": "CommonJS"
    },
    {
      "fileName": "./consumer.ts",
      "version": "e3e1863b40b48bf670281f2578788e0b-import { doc } from \"./doc\";\nexport const value = doc;",
      "signature": "e3e1863b40b48bf670281f2578788e0b-import { doc } from \"./doc\";\nexport const value = doc;",
      "impliedNodeFormat": "CommonJS"
    }
  ],
  "fileIdsList": [
    [
      "./doc.ts"
    ]
  ],
  "options": {
    "module": 99,
    "strict": true
  },
  "referencedMap": {
    "./consumer.ts": [
      "./doc.ts"
    ]
  },
  "affectedFilesPendingEmit": [
    [
      "./consumer.ts",
      "Js",
      3
    ],
    [
      "./doc.ts",
      "Js",
      2
    ]
  ],
  "size": 1464
}

tsconfig.json::
SemanticDiagnostics::
*refresh*    /home/src/tslibs/TS/Lib/lib.es2025.full.d.ts
*refresh*    /home/src/workspaces/project/doc.ts
*refresh*    /home/src/workspaces/project/consumer.ts
Signatures::


Edit [0]:: no change

tsgo 
ExitStatus:: Success
Output::

tsconfig.json::
SemanticDiagnostics::
Signatures::


Edit [1]:: add a comment to the recursive type
//// [/home/src/workspaces/project/doc.ts] *modified* 
type Doc =
    | string
    | { [k: string]: Doc }
    | readonly ["array", Doc]
    | readonly ["array", Doc, { length: number }]
    | readonly ["array", Doc, { min?: number; max?: number }]
    | readonly ["union", Doc, ...Doc[]];
export declare const doc: Doc;
// comment-only edit


tsgo 
ExitStatus:: Success
Output::
//// [/home/src/workspaces/project/tsconfig.tsbuildinfo] *modified* 
{"version":"FakeTSVersion","root":[[2,3]],"fileNames":["lib.es2025.full.d.ts","./doc.ts","./consumer.ts"],"fileInfos":[{"version":"0e330bc1e98a7e2601e4b38548df5e2b-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> { readonly length: number; readonly [n: number]: T; }\ninterface SymbolConstructor {\n    (desc?: string | number): symbol;\n    for(name: string): symbol;\n    readonly toStringTag: symbol;\n}\ndeclare var Symbol: SymbolConstructor;\ninterface Symbol {\n    readonly [Symbol.toStringTag]: string;\n}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true,"impliedNodeFormat":1},{"version":"209790a380ab2edc475c402e3a85e110-type Doc =\n    | string\n    | { [k: string]: Doc }\n    | readonly [\"array\", Doc]\n    | readonly [\"array\", Doc, { length: number }]\n    | readonly [\"array\", Doc, { min?: number; max?: number }]\n    | readonly [\"union\", Doc, ...Doc[]];\nexport declare const doc: Doc;\n// comment-only edit\n","signature":"17befdf8983ce76b78c64e0ef9b49c73-type Doc = string | {\n    [k: string]: Doc;\n} | readonly [\"array\", Doc] | readonly [\"array\", Doc, {\n    length: number;\n}] | readonly [\"array\", Doc, {\n    min?: number;\n    max?: number;\n}] | readonly [\"union\", Doc, ...Doc[]];\nexport declare const doc: Doc;\nexport {};\n","impliedNodeFormat":1},{"version":"e3e1863b40b48bf670281f2578788e0b-import { doc } from \"./doc\";\nexport const value = doc;","signature":"a56617d7ff45ff02880e982e94937f59-export declare const value: any;\n\n(42,5): error5088: The_inferred_type_of_0_references_a_type_with_a_cyclic_structure_which_cannot_be_trivially_serialize_5088\nvalue\n","impliedNodeFormat":1}],"fileIdsList":[[2]],"options":{"module":99,"strict":true},"referencedMap":[[3,1]],"affectedFilesPendingEmit":[3,2]}
//// [/home/src/workspaces/project/tsconfig.tsbuildinfo.readable.baseline.txt] *modified* 
{
  "version": "FakeTSVersion",
  "root": [
    {
      "files": [
        "./doc.ts",
        "./consumer.ts"
      ],
      "original": [
        2,
        3
      ]
    }
  ],
  "fileNames": [
    "lib.es2025.full.d.ts",
    "./doc.ts",
    "./consumer.ts"
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
      "fileName": "./doc.ts",
      "version": "209790a380ab2edc475c402e3a85e110-type Doc =\n    | string\n    | { [k: string]: Doc }\n    | readonly [\"array\", Doc]\n    | readonly [\"array\", Doc, { length: number }]\n    | readonly [\"array\", Doc, { min?: number; max?: number }]\n    | readonly [\"union\", Doc, ...Doc[]];\nexport declare const doc: Doc;\n// comment-only edit\n",
      "signature": "17befdf8983ce76b78c64e0ef9b49c73-type Doc = string | {\n    [k: string]: Doc;\n} | readonly [\"array\", Doc] | readonly [\"array\", Doc, {\n    length: number;\n}] | readonly [\"array\", Doc, {\n    min?: number;\n    max?: number;\n}] | readonly [\"union\", Doc, ...Doc[]];\nexport declare const doc: Doc;\nexport {};\n",
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "209790a380ab2edc475c402e3a85e110-type Doc =\n    | string\n    | { [k: string]: Doc }\n    | readonly [\"array\", Doc]\n    | readonly [\"array\", Doc, { length: number }]\n    | readonly [\"array\", Doc, { min?: number; max?: number }]\n    | readonly [\"union\", Doc, ...Doc[]];\nexport declare const doc: Doc;\n// comment-only edit\n",
        "signature": "17befdf8983ce76b78c64e0ef9b49c73-type Doc = string | {\n    [k: string]: Doc;\n} | readonly [\"array\", Doc] | readonly [\"array\", Doc, {\n    length: number;\n}] | readonly [\"array\", Doc, {\n    min?: number;\n    max?: number;\n}] | readonly [\"union\", Doc, ...Doc[]];\nexport declare const doc: Doc;\nexport {};\n",
        "impliedNodeFormat": 1
      }
    },
    {
      "fileName": "./consumer.ts",
      "version": "e3e1863b40b48bf670281f2578788e0b-import { doc } from \"./doc\";\nexport const value = doc;",
      "signature": "a56617d7ff45ff02880e982e94937f59-export declare const value: any;\n\n(42,5): error5088: The_inferred_type_of_0_references_a_type_with_a_cyclic_structure_which_cannot_be_trivially_serialize_5088\nvalue\n",
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "e3e1863b40b48bf670281f2578788e0b-import { doc } from \"./doc\";\nexport const value = doc;",
        "signature": "a56617d7ff45ff02880e982e94937f59-export declare const value: any;\n\n(42,5): error5088: The_inferred_type_of_0_references_a_type_with_a_cyclic_structure_which_cannot_be_trivially_serialize_5088\nvalue\n",
        "impliedNodeFormat": 1
      }
    }
  ],
  "fileIdsList": [
    [
      "./doc.ts"
    ]
  ],
  "options": {
    "module": 99,
    "strict": true
  },
  "referencedMap": {
    "./consumer.ts": [
      "./doc.ts"
    ]
  },
  "affectedFilesPendingEmit": [
    [
      "./consumer.ts",
      "Js",
      3
    ],
    [
      "./doc.ts",
      "Js",
      2
    ]
  ],
  "size": 2108
}

tsconfig.json::
SemanticDiagnostics::
*refresh*    /home/src/workspaces/project/doc.ts
*refresh*    /home/src/workspaces/project/consumer.ts
Signatures::
(computed .d.ts) /home/src/workspaces/project/doc.ts
(computed .d.ts) /home/src/workspaces/project/consumer.ts


Edit [2]:: no change

tsgo 
ExitStatus:: Success
Output::

tsconfig.json::
SemanticDiagnostics::
Signatures::


Edit [3]:: add a union constituent
//// [/home/src/workspaces/project/doc.ts] *modified* 
type Doc =
    | number
    | string
    | { [k: string]: Doc }
    | readonly ["array", Doc]
    | readonly ["array", Doc, { length: number }]
    | readonly ["array", Doc, { min?: number; max?: number }]
    | readonly ["union", Doc, ...Doc[]];
export declare const doc: Doc;
// comment-only edit


tsgo 
ExitStatus:: Success
Output::
//// [/home/src/workspaces/project/tsconfig.tsbuildinfo] *modified* 
{"version":"FakeTSVersion","root":[[2,3]],"fileNames":["lib.es2025.full.d.ts","./doc.ts","./consumer.ts"],"fileInfos":[{"version":"0e330bc1e98a7e2601e4b38548df5e2b-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> { readonly length: number; readonly [n: number]: T; }\ninterface SymbolConstructor {\n    (desc?: string | number): symbol;\n    for(name: string): symbol;\n    readonly toStringTag: symbol;\n}\ndeclare var Symbol: SymbolConstructor;\ninterface Symbol {\n    readonly [Symbol.toStringTag]: string;\n}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true,"impliedNodeFormat":1},{"version":"703658314ddb6e78faa0ecabe01e9319-type Doc =\n    | number\n    | string\n    | { [k: string]: Doc }\n    | readonly [\"array\", Doc]\n    | readonly [\"array\", Doc, { length: number }]\n    | readonly [\"array\", Doc, { min?: number; max?: number }]\n    | readonly [\"union\", Doc, ...Doc[]];\nexport declare const doc: Doc;\n// comment-only edit\n","signature":"e0d759702454fa5818ea5747e4408ca8-type Doc = number | string | {\n    [k: string]: Doc;\n} | readonly [\"array\", Doc] | readonly [\"array\", Doc, {\n    length: number;\n}] | readonly [\"array\", Doc, {\n    min?: number;\n    max?: number;\n}] | readonly [\"union\", Doc, ...Doc[]];\nexport declare const doc: Doc;\nexport {};\n","impliedNodeFormat":1},{"version":"e3e1863b40b48bf670281f2578788e0b-import { doc } from \"./doc\";\nexport const value = doc;","signature":"a56617d7ff45ff02880e982e94937f59-export declare const value: any;\n\n(42,5): error5088: The_inferred_type_of_0_references_a_type_with_a_cyclic_structure_which_cannot_be_trivially_serialize_5088\nvalue\n","impliedNodeFormat":1}],"fileIdsList":[[2]],"options":{"module":99,"strict":true},"referencedMap":[[3,1]],"affectedFilesPendingEmit":[3,2]}
//// [/home/src/workspaces/project/tsconfig.tsbuildinfo.readable.baseline.txt] *modified* 
{
  "version": "FakeTSVersion",
  "root": [
    {
      "files": [
        "./doc.ts",
        "./consumer.ts"
      ],
      "original": [
        2,
        3
      ]
    }
  ],
  "fileNames": [
    "lib.es2025.full.d.ts",
    "./doc.ts",
    "./consumer.ts"
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
      "fileName": "./doc.ts",
      "version": "703658314ddb6e78faa0ecabe01e9319-type Doc =\n    | number\n    | string\n    | { [k: string]: Doc }\n    | readonly [\"array\", Doc]\n    | readonly [\"array\", Doc, { length: number }]\n    | readonly [\"array\", Doc, { min?: number; max?: number }]\n    | readonly [\"union\", Doc, ...Doc[]];\nexport declare const doc: Doc;\n// comment-only edit\n",
      "signature": "e0d759702454fa5818ea5747e4408ca8-type Doc = number | string | {\n    [k: string]: Doc;\n} | readonly [\"array\", Doc] | readonly [\"array\", Doc, {\n    length: number;\n}] | readonly [\"array\", Doc, {\n    min?: number;\n    max?: number;\n}] | readonly [\"union\", Doc, ...Doc[]];\nexport declare const doc: Doc;\nexport {};\n",
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "703658314ddb6e78faa0ecabe01e9319-type Doc =\n    | number\n    | string\n    | { [k: string]: Doc }\n    | readonly [\"array\", Doc]\n    | readonly [\"array\", Doc, { length: number }]\n    | readonly [\"array\", Doc, { min?: number; max?: number }]\n    | readonly [\"union\", Doc, ...Doc[]];\nexport declare const doc: Doc;\n// comment-only edit\n",
        "signature": "e0d759702454fa5818ea5747e4408ca8-type Doc = number | string | {\n    [k: string]: Doc;\n} | readonly [\"array\", Doc] | readonly [\"array\", Doc, {\n    length: number;\n}] | readonly [\"array\", Doc, {\n    min?: number;\n    max?: number;\n}] | readonly [\"union\", Doc, ...Doc[]];\nexport declare const doc: Doc;\nexport {};\n",
        "impliedNodeFormat": 1
      }
    },
    {
      "fileName": "./consumer.ts",
      "version": "e3e1863b40b48bf670281f2578788e0b-import { doc } from \"./doc\";\nexport const value = doc;",
      "signature": "a56617d7ff45ff02880e982e94937f59-export declare const value: any;\n\n(42,5): error5088: The_inferred_type_of_0_references_a_type_with_a_cyclic_structure_which_cannot_be_trivially_serialize_5088\nvalue\n",
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "e3e1863b40b48bf670281f2578788e0b-import { doc } from \"./doc\";\nexport const value = doc;",
        "signature": "a56617d7ff45ff02880e982e94937f59-export declare const value: any;\n\n(42,5): error5088: The_inferred_type_of_0_references_a_type_with_a_cyclic_structure_which_cannot_be_trivially_serialize_5088\nvalue\n",
        "impliedNodeFormat": 1
      }
    }
  ],
  "fileIdsList": [
    [
      "./doc.ts"
    ]
  ],
  "options": {
    "module": 99,
    "strict": true
  },
  "referencedMap": {
    "./consumer.ts": [
      "./doc.ts"
    ]
  },
  "affectedFilesPendingEmit": [
    [
      "./consumer.ts",
      "Js",
      3
    ],
    [
      "./doc.ts",
      "Js",
      2
    ]
  ],
  "size": 2131
}

tsconfig.json::
SemanticDiagnostics::
*refresh*    /home/src/workspaces/project/doc.ts
*refresh*    /home/src/workspaces/project/consumer.ts
Signatures::
(computed .d.ts) /home/src/workspaces/project/doc.ts
(computed .d.ts) /home/src/workspaces/project/consumer.ts


Edit [4]:: no change

tsgo 
ExitStatus:: Success
Output::

tsconfig.json::
SemanticDiagnostics::
Signatures::


Edit [5]:: delete build info and check the edited source afresh
//// [/home/src/workspaces/project/tsconfig.tsbuildinfo] *deleted*

tsgo 
ExitStatus:: Success
Output::
//// [/home/src/workspaces/project/tsconfig.tsbuildinfo] *new* 
{"version":"FakeTSVersion","root":[[2,3]],"fileNames":["lib.es2025.full.d.ts","./doc.ts","./consumer.ts"],"fileInfos":[{"version":"0e330bc1e98a7e2601e4b38548df5e2b-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> { readonly length: number; readonly [n: number]: T; }\ninterface SymbolConstructor {\n    (desc?: string | number): symbol;\n    for(name: string): symbol;\n    readonly toStringTag: symbol;\n}\ndeclare var Symbol: SymbolConstructor;\ninterface Symbol {\n    readonly [Symbol.toStringTag]: string;\n}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true,"impliedNodeFormat":1},"703658314ddb6e78faa0ecabe01e9319-type Doc =\n    | number\n    | string\n    | { [k: string]: Doc }\n    | readonly [\"array\", Doc]\n    | readonly [\"array\", Doc, { length: number }]\n    | readonly [\"array\", Doc, { min?: number; max?: number }]\n    | readonly [\"union\", Doc, ...Doc[]];\nexport declare const doc: Doc;\n// comment-only edit\n","e3e1863b40b48bf670281f2578788e0b-import { doc } from \"./doc\";\nexport const value = doc;"],"fileIdsList":[[2]],"options":{"module":99,"strict":true},"referencedMap":[[3,1]],"affectedFilesPendingEmit":[3,2]}
//// [/home/src/workspaces/project/tsconfig.tsbuildinfo.readable.baseline.txt] *modified* 
{
  "version": "FakeTSVersion",
  "root": [
    {
      "files": [
        "./doc.ts",
        "./consumer.ts"
      ],
      "original": [
        2,
        3
      ]
    }
  ],
  "fileNames": [
    "lib.es2025.full.d.ts",
    "./doc.ts",
    "./consumer.ts"
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
      "fileName": "./doc.ts",
      "version": "703658314ddb6e78faa0ecabe01e9319-type Doc =\n    | number\n    | string\n    | { [k: string]: Doc }\n    | readonly [\"array\", Doc]\n    | readonly [\"array\", Doc, { length: number }]\n    | readonly [\"array\", Doc, { min?: number; max?: number }]\n    | readonly [\"union\", Doc, ...Doc[]];\nexport declare const doc: Doc;\n// comment-only edit\n",
      "signature": "703658314ddb6e78faa0ecabe01e9319-type Doc =\n    | number\n    | string\n    | { [k: string]: Doc }\n    | readonly [\"array\", Doc]\n    | readonly [\"array\", Doc, { length: number }]\n    | readonly [\"array\", Doc, { min?: number; max?: number }]\n    | readonly [\"union\", Doc, ...Doc[]];\nexport declare const doc: Doc;\n// comment-only edit\n",
      "impliedNodeFormat": "CommonJS"
    },
    {
      "fileName": "./consumer.ts",
      "version": "e3e1863b40b48bf670281f2578788e0b-import { doc } from \"./doc\";\nexport const value = doc;",
      "signature": "e3e1863b40b48bf670281f2578788e0b-import { doc } from \"./doc\";\nexport const value = doc;",
      "impliedNodeFormat": "CommonJS"
    }
  ],
  "fileIdsList": [
    [
      "./doc.ts"
    ]
  ],
  "options": {
    "module": 99,
    "strict": true
  },
  "referencedMap": {
    "./consumer.ts": [
      "./doc.ts"
    ]
  },
  "affectedFilesPendingEmit": [
    [
      "./consumer.ts",
      "Js",
      3
    ],
    [
      "./doc.ts",
      "Js",
      2
    ]
  ],
  "size": 1502
}

tsconfig.json::
SemanticDiagnostics::
*refresh*    /home/src/tslibs/TS/Lib/lib.es2025.full.d.ts
*refresh*    /home/src/workspaces/project/doc.ts
*refresh*    /home/src/workspaces/project/consumer.ts
Signatures::


Edit [6]:: verify the consumer type was not weakened
//// [/home/src/workspaces/project/consumer.ts] *modified* 
import { doc } from "./doc";
export const value = doc;
export const invalid: number = value;


tsgo 
ExitStatus:: DiagnosticsPresent_OutputsGenerated
Output::
[96mconsumer.ts[0m:[93m3[0m:[93m14[0m - [91merror[0m[90m TS2322: [0mType 'Doc' is not assignable to type 'number'.
  Type 'string' is not assignable to type 'number'.

[7m3[0m export const invalid: number = value;
[7m [0m [91m             ~~~~~~~[0m


Found 1 error in consumer.ts[90m:3[0m

//// [/home/src/workspaces/project/tsconfig.tsbuildinfo] *modified* 
{"version":"FakeTSVersion","root":[[2,3]],"fileNames":["lib.es2025.full.d.ts","./doc.ts","./consumer.ts"],"fileInfos":[{"version":"0e330bc1e98a7e2601e4b38548df5e2b-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> { readonly length: number; readonly [n: number]: T; }\ninterface SymbolConstructor {\n    (desc?: string | number): symbol;\n    for(name: string): symbol;\n    readonly toStringTag: symbol;\n}\ndeclare var Symbol: SymbolConstructor;\ninterface Symbol {\n    readonly [Symbol.toStringTag]: string;\n}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true,"impliedNodeFormat":1},"703658314ddb6e78faa0ecabe01e9319-type Doc =\n    | number\n    | string\n    | { [k: string]: Doc }\n    | readonly [\"array\", Doc]\n    | readonly [\"array\", Doc, { length: number }]\n    | readonly [\"array\", Doc, { min?: number; max?: number }]\n    | readonly [\"union\", Doc, ...Doc[]];\nexport declare const doc: Doc;\n// comment-only edit\n",{"version":"8af491d326de0701fb4d07a415b35dec-import { doc } from \"./doc\";\nexport const value = doc;\nexport const invalid: number = value;\n","signature":"b0465247e2bd6863c6a086f723d673e8-export declare const value: any;\nexport declare const invalid: number;\n\n(42,5): error5088: The_inferred_type_of_0_references_a_type_with_a_cyclic_structure_which_cannot_be_trivially_serialize_5088\nvalue\n","impliedNodeFormat":1}],"fileIdsList":[[2]],"options":{"module":99,"strict":true},"referencedMap":[[3,1]],"semanticDiagnosticsPerFile":[[3,[{"pos":68,"end":75,"code":2322,"category":1,"messageKey":"Type_0_is_not_assignable_to_type_1_2322","messageArgs":["Doc","number"],"messageChain":[{"pos":68,"end":75,"code":2322,"category":1,"messageKey":"Type_0_is_not_assignable_to_type_1_2322","messageArgs":["string","number"]}]}]]],"affectedFilesPendingEmit":[3,2]}
//// [/home/src/workspaces/project/tsconfig.tsbuildinfo.readable.baseline.txt] *modified* 
{
  "version": "FakeTSVersion",
  "root": [
    {
      "files": [
        "./doc.ts",
        "./consumer.ts"
      ],
      "original": [
        2,
        3
      ]
    }
  ],
  "fileNames": [
    "lib.es2025.full.d.ts",
    "./doc.ts",
    "./consumer.ts"
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
      "fileName": "./doc.ts",
      "version": "703658314ddb6e78faa0ecabe01e9319-type Doc =\n    | number\n    | string\n    | { [k: string]: Doc }\n    | readonly [\"array\", Doc]\n    | readonly [\"array\", Doc, { length: number }]\n    | readonly [\"array\", Doc, { min?: number; max?: number }]\n    | readonly [\"union\", Doc, ...Doc[]];\nexport declare const doc: Doc;\n// comment-only edit\n",
      "signature": "703658314ddb6e78faa0ecabe01e9319-type Doc =\n    | number\n    | string\n    | { [k: string]: Doc }\n    | readonly [\"array\", Doc]\n    | readonly [\"array\", Doc, { length: number }]\n    | readonly [\"array\", Doc, { min?: number; max?: number }]\n    | readonly [\"union\", Doc, ...Doc[]];\nexport declare const doc: Doc;\n// comment-only edit\n",
      "impliedNodeFormat": "CommonJS"
    },
    {
      "fileName": "./consumer.ts",
      "version": "8af491d326de0701fb4d07a415b35dec-import { doc } from \"./doc\";\nexport const value = doc;\nexport const invalid: number = value;\n",
      "signature": "b0465247e2bd6863c6a086f723d673e8-export declare const value: any;\nexport declare const invalid: number;\n\n(42,5): error5088: The_inferred_type_of_0_references_a_type_with_a_cyclic_structure_which_cannot_be_trivially_serialize_5088\nvalue\n",
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "8af491d326de0701fb4d07a415b35dec-import { doc } from \"./doc\";\nexport const value = doc;\nexport const invalid: number = value;\n",
        "signature": "b0465247e2bd6863c6a086f723d673e8-export declare const value: any;\nexport declare const invalid: number;\n\n(42,5): error5088: The_inferred_type_of_0_references_a_type_with_a_cyclic_structure_which_cannot_be_trivially_serialize_5088\nvalue\n",
        "impliedNodeFormat": 1
      }
    }
  ],
  "fileIdsList": [
    [
      "./doc.ts"
    ]
  ],
  "options": {
    "module": 99,
    "strict": true
  },
  "referencedMap": {
    "./consumer.ts": [
      "./doc.ts"
    ]
  },
  "semanticDiagnosticsPerFile": [
    [
      "./consumer.ts",
      [
        {
          "pos": 68,
          "end": 75,
          "code": 2322,
          "category": 1,
          "messageKey": "Type_0_is_not_assignable_to_type_1_2322",
          "messageArgs": [
            "Doc",
            "number"
          ],
          "messageChain": [
            {
              "pos": 68,
              "end": 75,
              "code": 2322,
              "category": 1,
              "messageKey": "Type_0_is_not_assignable_to_type_1_2322",
              "messageArgs": [
                "string",
                "number"
              ]
            }
          ]
        }
      ]
    ]
  ],
  "affectedFilesPendingEmit": [
    [
      "./consumer.ts",
      "Js",
      3
    ],
    [
      "./doc.ts",
      "Js",
      2
    ]
  ],
  "size": 2152
}

tsconfig.json::
SemanticDiagnostics::
*refresh*    /home/src/workspaces/project/consumer.ts
Signatures::
(computed .d.ts) /home/src/workspaces/project/consumer.ts


Edit [7]:: no change

tsgo 
ExitStatus:: DiagnosticsPresent_OutputsGenerated
Output::
[96mconsumer.ts[0m:[93m3[0m:[93m14[0m - [91merror[0m[90m TS2322: [0mType 'Doc' is not assignable to type 'number'.
  Type 'string' is not assignable to type 'number'.

[7m3[0m export const invalid: number = value;
[7m [0m [91m             ~~~~~~~[0m


Found 1 error in consumer.ts[90m:3[0m


tsconfig.json::
SemanticDiagnostics::
Signatures::
