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
