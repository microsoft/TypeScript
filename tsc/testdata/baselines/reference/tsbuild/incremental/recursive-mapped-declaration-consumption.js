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
//// [/home/src/workspaces/project/consumer/index.ts] *new* 
import { value, tuple, nested, replaced } from "../producer/dist/index.js";
value.items[0] = ["ok"];
value.items[0] = 123;
if (typeof value.items[0] !== "string") {
    value.items[0][0] = 123;
}
const number: number = tuple[0];
tuple[0][0] = 123;
nested[0] = ["ok"];
nested[0] = 123;
if (typeof nested[0] !== "string") {
    nested[0][0] = 123;
}
replaced[0] = [123];
replaced[0] = "error";
if (typeof replaced[0] !== "number") {
    replaced[0][0] = "error";
}
//// [/home/src/workspaces/project/consumer/tsconfig.json] *new* 
{
					"compilerOptions": { "strict": true, "noEmit": true },
					"references": [{ "path": "../producer" }]
				}
//// [/home/src/workspaces/project/producer/index.ts] *new* 
type Json = string | Json[];
type Parsed<T> = T extends object ? { [K in keyof T]: Parsed<T[K]> } : T;
declare function wrap<T>(value: T): Parsed<T>;
export const value = wrap({ items: [] as Json[] });

type Circular<T> = { [P in keyof T]: Circular<T> };
declare const circular: Circular<[number, number]>;
export const tuple = circular;

type Tuple = string | [Tuple];
export const nested = wrap(null as unknown as [Tuple]);

type Replace<T, R> = T extends object ? { [K in keyof T]: Replace<T[K], R> } : R;
declare function replace<T>(value: T): Replace<T, number>;
export const replaced = replace([] as Json[]);
//// [/home/src/workspaces/project/producer/private.ts] *new* 
export function local() {
    type Circular<T> = { [K in keyof T]: Circular<T> };
    return null as unknown as Circular<[number]>;
}
export function anonymous() {
    type Circular<T> = T extends object ? { [K in keyof T]: Circular<[number]> } : T;
    return null as unknown as Circular<[number]>;
}
//// [/home/src/workspaces/project/producer/tsconfig.json] *new* 
{
					"compilerOptions": { "strict": true, "composite": true, "outDir": "dist" },
					"files": ["index.ts", "private.ts"]
				}

tsgo --build consumer
ExitStatus:: DiagnosticsPresent_OutputsGenerated
Output::
[96mproducer/index.ts[0m:[93m7[0m:[93m25[0m - [91merror[0m[90m TS2589: [0mType instantiation is excessively deep and possibly infinite.

[7m7[0m declare const circular: Circular<[number, number]>;
[7m [0m [91m                        ~~~~~~~~~~~~~~~~~~~~~~~~~~[0m

[96mproducer/index.ts[0m:[93m11[0m:[93m23[0m - [91merror[0m[90m TS2589: [0mType instantiation is excessively deep and possibly infinite.

[7m11[0m export const nested = wrap(null as unknown as [Tuple]);
[7m  [0m [91m                      ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~[0m

[96mproducer/index.ts[0m:[93m15[0m:[93m25[0m - [91merror[0m[90m TS2589: [0mType instantiation is excessively deep and possibly infinite.

[7m15[0m export const replaced = replace([] as Json[]);
[7m  [0m [91m                        ~~~~~~~~~~~~~~~~~~~~~[0m

[96mproducer/private.ts[0m:[93m3[0m:[93m31[0m - [91merror[0m[90m TS2589: [0mType instantiation is excessively deep and possibly infinite.

[7m3[0m     return null as unknown as Circular<[number]>;
[7m [0m [91m                              ~~~~~~~~~~~~~~~~~~[0m

[96mproducer/private.ts[0m:[93m6[0m:[93m61[0m - [91merror[0m[90m TS2589: [0mType instantiation is excessively deep and possibly infinite.

[7m6[0m     type Circular<T> = T extends object ? { [K in keyof T]: Circular<[number]> } : T;
[7m [0m [91m                                                            ~~~~~~~~~~~~~~~~~~[0m

[96mconsumer/index.ts[0m:[93m3[0m:[93m1[0m - [91merror[0m[90m TS2322: [0mType 'number' is not assignable to type 'Json'.

[7m3[0m value.items[0] = 123;
[7m [0m [91m~~~~~~~~~~~~~~[0m

[96mconsumer/index.ts[0m:[93m5[0m:[93m5[0m - [91merror[0m[90m TS2322: [0mType 'number' is not assignable to type 'Json'.

[7m5[0m     value.items[0][0] = 123;
[7m [0m [91m    ~~~~~~~~~~~~~~~~~[0m


Found 7 errors in 3 files.

Errors  Files
     2  consumer/index.ts[90m:3[0m
     3  producer/index.ts[90m:7[0m
     2  producer/private.ts[90m:3[0m

//// [/home/src/workspaces/project/consumer/tsconfig.tsbuildinfo] *new* 
{"version":"FakeTSVersion","root":["./index.ts"],"semanticErrors":true}
//// [/home/src/workspaces/project/consumer/tsconfig.tsbuildinfo.readable.baseline.txt] *new* 
{
  "version": "FakeTSVersion",
  "root": [
    {
      "files": [
        "./index.ts"
      ],
      "original": "./index.ts"
    }
  ],
  "size": 71,
  "semanticErrors": true
}
//// [/home/src/workspaces/project/producer/dist/index.d.ts] *new* 
type Json = string | Json[];
export declare const value: {
    items: Json[];
};
export declare const tuple: any;
export declare const nested: any;
export declare const replaced: any;
export {};

//// [/home/src/workspaces/project/producer/dist/index.js] *new* 
export const value = wrap({ items: [] });
export const tuple = circular;
export const nested = wrap(null);
export const replaced = replace([]);

//// [/home/src/workspaces/project/producer/dist/private.d.ts] *new* 
export declare function local(): any;
export declare function anonymous(): any;

//// [/home/src/workspaces/project/producer/dist/private.js] *new* 
export function local() {
    return null;
}
export function anonymous() {
    return null;
}

//// [/home/src/workspaces/project/producer/dist/tsconfig.tsbuildinfo] *new* 
{"version":"FakeTSVersion","errors":true,"root":[[2,3]],"fileNames":["lib.es2025.full.d.ts","../index.ts","../private.ts"],"fileInfos":[{"version":"0e330bc1e98a7e2601e4b38548df5e2b-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> { readonly length: number; readonly [n: number]: T; }\ninterface SymbolConstructor {\n    (desc?: string | number): symbol;\n    for(name: string): symbol;\n    readonly toStringTag: symbol;\n}\ndeclare var Symbol: SymbolConstructor;\ninterface Symbol {\n    readonly [Symbol.toStringTag]: string;\n}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true,"impliedNodeFormat":1},{"version":"ee3e8800eb4e45998a629f3cc7a195ab-type Json = string | Json[];\ntype Parsed<T> = T extends object ? { [K in keyof T]: Parsed<T[K]> } : T;\ndeclare function wrap<T>(value: T): Parsed<T>;\nexport const value = wrap({ items: [] as Json[] });\n\ntype Circular<T> = { [P in keyof T]: Circular<T> };\ndeclare const circular: Circular<[number, number]>;\nexport const tuple = circular;\n\ntype Tuple = string | [Tuple];\nexport const nested = wrap(null as unknown as [Tuple]);\n\ntype Replace<T, R> = T extends object ? { [K in keyof T]: Replace<T[K], R> } : R;\ndeclare function replace<T>(value: T): Replace<T, number>;\nexport const replaced = replace([] as Json[]);","signature":"6cc5162c702f22160262f45e30d9a7ac-type Json = string | Json[];\nexport declare const value: {\n    items: Json[];\n};\nexport declare const tuple: any;\nexport declare const nested: any;\nexport declare const replaced: any;\nexport {};\n","impliedNodeFormat":1},{"version":"3d0559a853159cce0f535e03084e7636-export function local() {\n    type Circular<T> = { [K in keyof T]: Circular<T> };\n    return null as unknown as Circular<[number]>;\n}\nexport function anonymous() {\n    type Circular<T> = T extends object ? { [K in keyof T]: Circular<[number]> } : T;\n    return null as unknown as Circular<[number]>;\n}","signature":"9ea5719d017da4129d83941774e0cb4d-export declare function local(): any;\nexport declare function anonymous(): any;\n","impliedNodeFormat":1}],"options":{"composite":true,"outDir":"./","strict":true},"semanticDiagnosticsPerFile":[[2,[{"pos":279,"end":305,"code":2589,"category":1,"messageKey":"Type_instantiation_is_excessively_deep_and_possibly_infinite_2589"},{"pos":392,"end":424,"code":2589,"category":1,"messageKey":"Type_instantiation_is_excessively_deep_and_possibly_infinite_2589"},{"pos":592,"end":613,"code":2589,"category":1,"messageKey":"Type_instantiation_is_excessively_deep_and_possibly_infinite_2589"}]],[3,[{"pos":112,"end":130,"code":2589,"category":1,"messageKey":"Type_instantiation_is_excessively_deep_and_possibly_infinite_2589"},{"pos":224,"end":242,"code":2589,"category":1,"messageKey":"Type_instantiation_is_excessively_deep_and_possibly_infinite_2589"}]]],"latestChangedDtsFile":"./private.d.ts"}
//// [/home/src/workspaces/project/producer/dist/tsconfig.tsbuildinfo.readable.baseline.txt] *new* 
{
  "version": "FakeTSVersion",
  "errors": true,
  "root": [
    {
      "files": [
        "../index.ts",
        "../private.ts"
      ],
      "original": [
        2,
        3
      ]
    }
  ],
  "fileNames": [
    "lib.es2025.full.d.ts",
    "../index.ts",
    "../private.ts"
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
      "fileName": "../index.ts",
      "version": "ee3e8800eb4e45998a629f3cc7a195ab-type Json = string | Json[];\ntype Parsed<T> = T extends object ? { [K in keyof T]: Parsed<T[K]> } : T;\ndeclare function wrap<T>(value: T): Parsed<T>;\nexport const value = wrap({ items: [] as Json[] });\n\ntype Circular<T> = { [P in keyof T]: Circular<T> };\ndeclare const circular: Circular<[number, number]>;\nexport const tuple = circular;\n\ntype Tuple = string | [Tuple];\nexport const nested = wrap(null as unknown as [Tuple]);\n\ntype Replace<T, R> = T extends object ? { [K in keyof T]: Replace<T[K], R> } : R;\ndeclare function replace<T>(value: T): Replace<T, number>;\nexport const replaced = replace([] as Json[]);",
      "signature": "6cc5162c702f22160262f45e30d9a7ac-type Json = string | Json[];\nexport declare const value: {\n    items: Json[];\n};\nexport declare const tuple: any;\nexport declare const nested: any;\nexport declare const replaced: any;\nexport {};\n",
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "ee3e8800eb4e45998a629f3cc7a195ab-type Json = string | Json[];\ntype Parsed<T> = T extends object ? { [K in keyof T]: Parsed<T[K]> } : T;\ndeclare function wrap<T>(value: T): Parsed<T>;\nexport const value = wrap({ items: [] as Json[] });\n\ntype Circular<T> = { [P in keyof T]: Circular<T> };\ndeclare const circular: Circular<[number, number]>;\nexport const tuple = circular;\n\ntype Tuple = string | [Tuple];\nexport const nested = wrap(null as unknown as [Tuple]);\n\ntype Replace<T, R> = T extends object ? { [K in keyof T]: Replace<T[K], R> } : R;\ndeclare function replace<T>(value: T): Replace<T, number>;\nexport const replaced = replace([] as Json[]);",
        "signature": "6cc5162c702f22160262f45e30d9a7ac-type Json = string | Json[];\nexport declare const value: {\n    items: Json[];\n};\nexport declare const tuple: any;\nexport declare const nested: any;\nexport declare const replaced: any;\nexport {};\n",
        "impliedNodeFormat": 1
      }
    },
    {
      "fileName": "../private.ts",
      "version": "3d0559a853159cce0f535e03084e7636-export function local() {\n    type Circular<T> = { [K in keyof T]: Circular<T> };\n    return null as unknown as Circular<[number]>;\n}\nexport function anonymous() {\n    type Circular<T> = T extends object ? { [K in keyof T]: Circular<[number]> } : T;\n    return null as unknown as Circular<[number]>;\n}",
      "signature": "9ea5719d017da4129d83941774e0cb4d-export declare function local(): any;\nexport declare function anonymous(): any;\n",
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "3d0559a853159cce0f535e03084e7636-export function local() {\n    type Circular<T> = { [K in keyof T]: Circular<T> };\n    return null as unknown as Circular<[number]>;\n}\nexport function anonymous() {\n    type Circular<T> = T extends object ? { [K in keyof T]: Circular<[number]> } : T;\n    return null as unknown as Circular<[number]>;\n}",
        "signature": "9ea5719d017da4129d83941774e0cb4d-export declare function local(): any;\nexport declare function anonymous(): any;\n",
        "impliedNodeFormat": 1
      }
    }
  ],
  "options": {
    "composite": true,
    "outDir": "./",
    "strict": true
  },
  "semanticDiagnosticsPerFile": [
    [
      "../index.ts",
      [
        {
          "pos": 279,
          "end": 305,
          "code": 2589,
          "category": 1,
          "messageKey": "Type_instantiation_is_excessively_deep_and_possibly_infinite_2589"
        },
        {
          "pos": 392,
          "end": 424,
          "code": 2589,
          "category": 1,
          "messageKey": "Type_instantiation_is_excessively_deep_and_possibly_infinite_2589"
        },
        {
          "pos": 592,
          "end": 613,
          "code": 2589,
          "category": 1,
          "messageKey": "Type_instantiation_is_excessively_deep_and_possibly_infinite_2589"
        }
      ]
    ],
    [
      "../private.ts",
      [
        {
          "pos": 112,
          "end": 130,
          "code": 2589,
          "category": 1,
          "messageKey": "Type_instantiation_is_excessively_deep_and_possibly_infinite_2589"
        },
        {
          "pos": 224,
          "end": 242,
          "code": 2589,
          "category": 1,
          "messageKey": "Type_instantiation_is_excessively_deep_and_possibly_infinite_2589"
        }
      ]
    ]
  ],
  "latestChangedDtsFile": "./private.d.ts",
  "size": 3195
}

producer/tsconfig.json::
SemanticDiagnostics::
*refresh*    /home/src/tslibs/TS/Lib/lib.es2025.full.d.ts
*refresh*    /home/src/workspaces/project/producer/index.ts
*refresh*    /home/src/workspaces/project/producer/private.ts
Signatures::
(stored at emit) /home/src/workspaces/project/producer/index.ts
(stored at emit) /home/src/workspaces/project/producer/private.ts

consumer/tsconfig.json::
SemanticDiagnostics::
*refresh*    /home/src/tslibs/TS/Lib/lib.es2025.full.d.ts
*refresh*    /home/src/workspaces/project/producer/dist/index.d.ts
*refresh*    /home/src/workspaces/project/consumer/index.ts
Signatures::
