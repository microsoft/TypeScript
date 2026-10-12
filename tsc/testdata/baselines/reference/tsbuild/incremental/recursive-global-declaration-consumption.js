currentDirectory::/home/src/workspaces/project
useCaseSensitiveFileNames::true
Input::
//// [/home/src/workspaces/project/consumer/index.ts] *new* 
export {};
const fromA: number = makeA().self().value;
const fromB: string = makeB().self().value;
const reserved: boolean = makeReserved().self().value;
const genericA: string = GlobalA.create("text").next().value;
const genericB: number = GlobalB.create(1).next().value;
const quoted: boolean = GlobalA["a-b"]().next().value;
const invalidA: string = makeA().self().value;
const invalidB: number = makeB().self().value;
//// [/home/src/workspaces/project/consumer/tsconfig.json] *new* 
{
					"compilerOptions": { "strict": true, "composite": true, "skipLibCheck": false },
					"files": ["index.ts", "../first/dist/index.d.ts", "../second/dist/index.d.ts"],
					"references": [{ "path": "../first" }, { "path": "../second" }]
				}
//// [/home/src/workspaces/project/first/index.ts] *new* 
function makeA() {
    return { value: 1, self() { return this; } };
}
type makeReserved_recursive = "reserved";
function makeReserved() {
    return { value: true, self() { return this; } };
}
class GlobalA {
    static create<T>(value: T) {
        const node = { value, next: () => node };
        return node;
    }
    static "a-b"() {
        const node = { value: true, next: () => node };
        return node;
    }
}
//// [/home/src/workspaces/project/first/tsconfig.json] *new* 
{
					"compilerOptions": { "strict": true, "composite": true, "outDir": "dist" },
					"files": ["index.ts"]
				}
//// [/home/src/workspaces/project/second/index.ts] *new* 
function makeB() {
    return { value: "text", self() { return this; } };
}
class GlobalB {
    static create<T>(value: T) {
        const node = { value, next: () => node };
        return node;
    }
}
//// [/home/src/workspaces/project/second/tsconfig.json] *new* 
{
					"compilerOptions": { "strict": true, "composite": true, "outDir": "dist" },
					"files": ["index.ts"]
				}

tsgo --build consumer
ExitStatus:: DiagnosticsPresent_OutputsGenerated
Output::
[96mconsumer/index.ts[0m:[93m8[0m:[93m7[0m - [91merror[0m[90m TS2322: [0mType 'number' is not assignable to type 'string'.

[7m8[0m const invalidA: string = makeA().self().value;
[7m [0m [91m      ~~~~~~~~[0m

[96mconsumer/index.ts[0m:[93m9[0m:[93m7[0m - [91merror[0m[90m TS2322: [0mType 'string' is not assignable to type 'number'.

[7m9[0m const invalidB: number = makeB().self().value;
[7m [0m [91m      ~~~~~~~~[0m


Found 2 errors in the same file, starting at: consumer/index.ts[90m:8[0m

//// [/home/src/tslibs/TS/Lib/lib.es2026.full.d.ts] *Lib*
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
//// [/home/src/workspaces/project/consumer/index.d.ts] *new* 
export {};

//// [/home/src/workspaces/project/consumer/index.js] *new* 
const fromA = makeA().self().value;
const fromB = makeB().self().value;
const reserved = makeReserved().self().value;
const genericA = GlobalA.create("text").next().value;
const genericB = GlobalB.create(1).next().value;
const quoted = GlobalA["a-b"]().next().value;
const invalidA = makeA().self().value;
const invalidB = makeB().self().value;
export {};

//// [/home/src/workspaces/project/consumer/tsconfig.tsbuildinfo] *new* 
{"version":"FakeTSVersion","root":[[2,4]],"fileNames":["lib.es2026.full.d.ts","./index.ts","../first/dist/index.d.ts","../second/dist/index.d.ts"],"fileInfos":[{"version":"8859c12c614ce56ba9a18e58384a198f-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ninterface SymbolConstructor {\n    (desc?: string | number): symbol;\n    for(name: string): symbol;\n    readonly toStringTag: symbol;\n}\ndeclare var Symbol: SymbolConstructor;\ninterface Symbol {\n    readonly [Symbol.toStringTag]: string;\n}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true,"impliedNodeFormat":1},{"version":"c96c6feb8050748fb0780a02a020929d-export {};\nconst fromA: number = makeA().self().value;\nconst fromB: string = makeB().self().value;\nconst reserved: boolean = makeReserved().self().value;\nconst genericA: string = GlobalA.create(\"text\").next().value;\nconst genericB: number = GlobalB.create(1).next().value;\nconst quoted: boolean = GlobalA[\"a-b\"]().next().value;\nconst invalidA: string = makeA().self().value;\nconst invalidB: number = makeB().self().value;","signature":"abe7d9981d6018efb6b2b794f40a1607-export {};\n","impliedNodeFormat":1},{"version":"02702dd1cd4f6805e366ae36e2943eb6-type makeA_recursive = {\n    value: number;\n    self(): makeA_recursive;\n};\ntype makeReserved_recursive_1 = {\n    value: boolean;\n    self(): makeReserved_recursive_1;\n};\ntype GlobalA_create_recursive<T> = {\n    value: T;\n    next: () => GlobalA_create_recursive<T>;\n};\ntype GlobalA_a_b_recursive = {\n    value: boolean;\n    next: () => GlobalA_a_b_recursive;\n};\ndeclare function makeA(): {\n    value: number;\n    self(): makeA_recursive;\n};\ntype makeReserved_recursive = \"reserved\";\ndeclare function makeReserved(): {\n    value: boolean;\n    self(): makeReserved_recursive_1;\n};\ndeclare class GlobalA {\n    static create<T>(value: T): GlobalA_create_recursive<T>;\n    static \"a-b\"(): GlobalA_a_b_recursive;\n}\n","affectsGlobalScope":true,"impliedNodeFormat":1},{"version":"1b1d198fb9025c7d8314d76bb2445e46-type makeB_recursive = {\n    value: string;\n    self(): makeB_recursive;\n};\ntype GlobalB_create_recursive<T> = {\n    value: T;\n    next: () => GlobalB_create_recursive<T>;\n};\ndeclare function makeB(): {\n    value: string;\n    self(): makeB_recursive;\n};\ndeclare class GlobalB {\n    static create<T>(value: T): GlobalB_create_recursive<T>;\n}\n","affectsGlobalScope":true,"impliedNodeFormat":1}],"options":{"composite":true,"skipLibCheck":false,"strict":true},"semanticDiagnosticsPerFile":[[2,[{"pos":334,"end":342,"code":2322,"category":1,"messageKey":"Type_0_is_not_assignable_to_type_1_2322","messageArgs":["number","string"]},{"pos":381,"end":389,"code":2322,"category":1,"messageKey":"Type_0_is_not_assignable_to_type_1_2322","messageArgs":["string","number"]}]]],"latestChangedDtsFile":"./index.d.ts"}
//// [/home/src/workspaces/project/consumer/tsconfig.tsbuildinfo.readable.baseline.txt] *new* 
{
  "version": "FakeTSVersion",
  "root": [
    {
      "files": [
        "./index.ts",
        "../first/dist/index.d.ts",
        "../second/dist/index.d.ts"
      ],
      "original": [
        2,
        4
      ]
    }
  ],
  "fileNames": [
    "lib.es2026.full.d.ts",
    "./index.ts",
    "../first/dist/index.d.ts",
    "../second/dist/index.d.ts"
  ],
  "fileInfos": [
    {
      "fileName": "lib.es2026.full.d.ts",
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
      "fileName": "./index.ts",
      "version": "c96c6feb8050748fb0780a02a020929d-export {};\nconst fromA: number = makeA().self().value;\nconst fromB: string = makeB().self().value;\nconst reserved: boolean = makeReserved().self().value;\nconst genericA: string = GlobalA.create(\"text\").next().value;\nconst genericB: number = GlobalB.create(1).next().value;\nconst quoted: boolean = GlobalA[\"a-b\"]().next().value;\nconst invalidA: string = makeA().self().value;\nconst invalidB: number = makeB().self().value;",
      "signature": "abe7d9981d6018efb6b2b794f40a1607-export {};\n",
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "c96c6feb8050748fb0780a02a020929d-export {};\nconst fromA: number = makeA().self().value;\nconst fromB: string = makeB().self().value;\nconst reserved: boolean = makeReserved().self().value;\nconst genericA: string = GlobalA.create(\"text\").next().value;\nconst genericB: number = GlobalB.create(1).next().value;\nconst quoted: boolean = GlobalA[\"a-b\"]().next().value;\nconst invalidA: string = makeA().self().value;\nconst invalidB: number = makeB().self().value;",
        "signature": "abe7d9981d6018efb6b2b794f40a1607-export {};\n",
        "impliedNodeFormat": 1
      }
    },
    {
      "fileName": "../first/dist/index.d.ts",
      "version": "02702dd1cd4f6805e366ae36e2943eb6-type makeA_recursive = {\n    value: number;\n    self(): makeA_recursive;\n};\ntype makeReserved_recursive_1 = {\n    value: boolean;\n    self(): makeReserved_recursive_1;\n};\ntype GlobalA_create_recursive<T> = {\n    value: T;\n    next: () => GlobalA_create_recursive<T>;\n};\ntype GlobalA_a_b_recursive = {\n    value: boolean;\n    next: () => GlobalA_a_b_recursive;\n};\ndeclare function makeA(): {\n    value: number;\n    self(): makeA_recursive;\n};\ntype makeReserved_recursive = \"reserved\";\ndeclare function makeReserved(): {\n    value: boolean;\n    self(): makeReserved_recursive_1;\n};\ndeclare class GlobalA {\n    static create<T>(value: T): GlobalA_create_recursive<T>;\n    static \"a-b\"(): GlobalA_a_b_recursive;\n}\n",
      "signature": "02702dd1cd4f6805e366ae36e2943eb6-type makeA_recursive = {\n    value: number;\n    self(): makeA_recursive;\n};\ntype makeReserved_recursive_1 = {\n    value: boolean;\n    self(): makeReserved_recursive_1;\n};\ntype GlobalA_create_recursive<T> = {\n    value: T;\n    next: () => GlobalA_create_recursive<T>;\n};\ntype GlobalA_a_b_recursive = {\n    value: boolean;\n    next: () => GlobalA_a_b_recursive;\n};\ndeclare function makeA(): {\n    value: number;\n    self(): makeA_recursive;\n};\ntype makeReserved_recursive = \"reserved\";\ndeclare function makeReserved(): {\n    value: boolean;\n    self(): makeReserved_recursive_1;\n};\ndeclare class GlobalA {\n    static create<T>(value: T): GlobalA_create_recursive<T>;\n    static \"a-b\"(): GlobalA_a_b_recursive;\n}\n",
      "affectsGlobalScope": true,
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "02702dd1cd4f6805e366ae36e2943eb6-type makeA_recursive = {\n    value: number;\n    self(): makeA_recursive;\n};\ntype makeReserved_recursive_1 = {\n    value: boolean;\n    self(): makeReserved_recursive_1;\n};\ntype GlobalA_create_recursive<T> = {\n    value: T;\n    next: () => GlobalA_create_recursive<T>;\n};\ntype GlobalA_a_b_recursive = {\n    value: boolean;\n    next: () => GlobalA_a_b_recursive;\n};\ndeclare function makeA(): {\n    value: number;\n    self(): makeA_recursive;\n};\ntype makeReserved_recursive = \"reserved\";\ndeclare function makeReserved(): {\n    value: boolean;\n    self(): makeReserved_recursive_1;\n};\ndeclare class GlobalA {\n    static create<T>(value: T): GlobalA_create_recursive<T>;\n    static \"a-b\"(): GlobalA_a_b_recursive;\n}\n",
        "affectsGlobalScope": true,
        "impliedNodeFormat": 1
      }
    },
    {
      "fileName": "../second/dist/index.d.ts",
      "version": "1b1d198fb9025c7d8314d76bb2445e46-type makeB_recursive = {\n    value: string;\n    self(): makeB_recursive;\n};\ntype GlobalB_create_recursive<T> = {\n    value: T;\n    next: () => GlobalB_create_recursive<T>;\n};\ndeclare function makeB(): {\n    value: string;\n    self(): makeB_recursive;\n};\ndeclare class GlobalB {\n    static create<T>(value: T): GlobalB_create_recursive<T>;\n}\n",
      "signature": "1b1d198fb9025c7d8314d76bb2445e46-type makeB_recursive = {\n    value: string;\n    self(): makeB_recursive;\n};\ntype GlobalB_create_recursive<T> = {\n    value: T;\n    next: () => GlobalB_create_recursive<T>;\n};\ndeclare function makeB(): {\n    value: string;\n    self(): makeB_recursive;\n};\ndeclare class GlobalB {\n    static create<T>(value: T): GlobalB_create_recursive<T>;\n}\n",
      "affectsGlobalScope": true,
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "1b1d198fb9025c7d8314d76bb2445e46-type makeB_recursive = {\n    value: string;\n    self(): makeB_recursive;\n};\ntype GlobalB_create_recursive<T> = {\n    value: T;\n    next: () => GlobalB_create_recursive<T>;\n};\ndeclare function makeB(): {\n    value: string;\n    self(): makeB_recursive;\n};\ndeclare class GlobalB {\n    static create<T>(value: T): GlobalB_create_recursive<T>;\n}\n",
        "affectsGlobalScope": true,
        "impliedNodeFormat": 1
      }
    }
  ],
  "options": {
    "composite": true,
    "skipLibCheck": false,
    "strict": true
  },
  "semanticDiagnosticsPerFile": [
    [
      "./index.ts",
      [
        {
          "pos": 334,
          "end": 342,
          "code": 2322,
          "category": 1,
          "messageKey": "Type_0_is_not_assignable_to_type_1_2322",
          "messageArgs": [
            "number",
            "string"
          ]
        },
        {
          "pos": 381,
          "end": 389,
          "code": 2322,
          "category": 1,
          "messageKey": "Type_0_is_not_assignable_to_type_1_2322",
          "messageArgs": [
            "string",
            "number"
          ]
        }
      ]
    ]
  ],
  "latestChangedDtsFile": "./index.d.ts",
  "size": 3196
}
//// [/home/src/workspaces/project/first/dist/index.d.ts] *new* 
type makeA_recursive = {
    value: number;
    self(): makeA_recursive;
};
type makeReserved_recursive_1 = {
    value: boolean;
    self(): makeReserved_recursive_1;
};
type GlobalA_create_recursive<T> = {
    value: T;
    next: () => GlobalA_create_recursive<T>;
};
type GlobalA_a_b_recursive = {
    value: boolean;
    next: () => GlobalA_a_b_recursive;
};
declare function makeA(): {
    value: number;
    self(): makeA_recursive;
};
type makeReserved_recursive = "reserved";
declare function makeReserved(): {
    value: boolean;
    self(): makeReserved_recursive_1;
};
declare class GlobalA {
    static create<T>(value: T): GlobalA_create_recursive<T>;
    static "a-b"(): GlobalA_a_b_recursive;
}

//// [/home/src/workspaces/project/first/dist/index.js] *new* 
"use strict";
function makeA() {
    return { value: 1, self() { return this; } };
}
function makeReserved() {
    return { value: true, self() { return this; } };
}
class GlobalA {
    static create(value) {
        const node = { value, next: () => node };
        return node;
    }
    static "a-b"() {
        const node = { value: true, next: () => node };
        return node;
    }
}

//// [/home/src/workspaces/project/first/dist/tsconfig.tsbuildinfo] *new* 
{"version":"FakeTSVersion","root":[2],"fileNames":["lib.es2026.full.d.ts","../index.ts"],"fileInfos":[{"version":"8859c12c614ce56ba9a18e58384a198f-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ninterface SymbolConstructor {\n    (desc?: string | number): symbol;\n    for(name: string): symbol;\n    readonly toStringTag: symbol;\n}\ndeclare var Symbol: SymbolConstructor;\ninterface Symbol {\n    readonly [Symbol.toStringTag]: string;\n}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true,"impliedNodeFormat":1},{"version":"ceb88b9ff61ebe91c7080ce8a28b3fc4-function makeA() {\n    return { value: 1, self() { return this; } };\n}\ntype makeReserved_recursive = \"reserved\";\nfunction makeReserved() {\n    return { value: true, self() { return this; } };\n}\nclass GlobalA {\n    static create<T>(value: T) {\n        const node = { value, next: () => node };\n        return node;\n    }\n    static \"a-b\"() {\n        const node = { value: true, next: () => node };\n        return node;\n    }\n}","signature":"02702dd1cd4f6805e366ae36e2943eb6-type makeA_recursive = {\n    value: number;\n    self(): makeA_recursive;\n};\ntype makeReserved_recursive_1 = {\n    value: boolean;\n    self(): makeReserved_recursive_1;\n};\ntype GlobalA_create_recursive<T> = {\n    value: T;\n    next: () => GlobalA_create_recursive<T>;\n};\ntype GlobalA_a_b_recursive = {\n    value: boolean;\n    next: () => GlobalA_a_b_recursive;\n};\ndeclare function makeA(): {\n    value: number;\n    self(): makeA_recursive;\n};\ntype makeReserved_recursive = \"reserved\";\ndeclare function makeReserved(): {\n    value: boolean;\n    self(): makeReserved_recursive_1;\n};\ndeclare class GlobalA {\n    static create<T>(value: T): GlobalA_create_recursive<T>;\n    static \"a-b\"(): GlobalA_a_b_recursive;\n}\n","affectsGlobalScope":true,"impliedNodeFormat":1}],"options":{"composite":true,"outDir":"./","strict":true},"latestChangedDtsFile":"./index.d.ts"}
//// [/home/src/workspaces/project/first/dist/tsconfig.tsbuildinfo.readable.baseline.txt] *new* 
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
    "lib.es2026.full.d.ts",
    "../index.ts"
  ],
  "fileInfos": [
    {
      "fileName": "lib.es2026.full.d.ts",
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
      "version": "ceb88b9ff61ebe91c7080ce8a28b3fc4-function makeA() {\n    return { value: 1, self() { return this; } };\n}\ntype makeReserved_recursive = \"reserved\";\nfunction makeReserved() {\n    return { value: true, self() { return this; } };\n}\nclass GlobalA {\n    static create<T>(value: T) {\n        const node = { value, next: () => node };\n        return node;\n    }\n    static \"a-b\"() {\n        const node = { value: true, next: () => node };\n        return node;\n    }\n}",
      "signature": "02702dd1cd4f6805e366ae36e2943eb6-type makeA_recursive = {\n    value: number;\n    self(): makeA_recursive;\n};\ntype makeReserved_recursive_1 = {\n    value: boolean;\n    self(): makeReserved_recursive_1;\n};\ntype GlobalA_create_recursive<T> = {\n    value: T;\n    next: () => GlobalA_create_recursive<T>;\n};\ntype GlobalA_a_b_recursive = {\n    value: boolean;\n    next: () => GlobalA_a_b_recursive;\n};\ndeclare function makeA(): {\n    value: number;\n    self(): makeA_recursive;\n};\ntype makeReserved_recursive = \"reserved\";\ndeclare function makeReserved(): {\n    value: boolean;\n    self(): makeReserved_recursive_1;\n};\ndeclare class GlobalA {\n    static create<T>(value: T): GlobalA_create_recursive<T>;\n    static \"a-b\"(): GlobalA_a_b_recursive;\n}\n",
      "affectsGlobalScope": true,
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "ceb88b9ff61ebe91c7080ce8a28b3fc4-function makeA() {\n    return { value: 1, self() { return this; } };\n}\ntype makeReserved_recursive = \"reserved\";\nfunction makeReserved() {\n    return { value: true, self() { return this; } };\n}\nclass GlobalA {\n    static create<T>(value: T) {\n        const node = { value, next: () => node };\n        return node;\n    }\n    static \"a-b\"() {\n        const node = { value: true, next: () => node };\n        return node;\n    }\n}",
        "signature": "02702dd1cd4f6805e366ae36e2943eb6-type makeA_recursive = {\n    value: number;\n    self(): makeA_recursive;\n};\ntype makeReserved_recursive_1 = {\n    value: boolean;\n    self(): makeReserved_recursive_1;\n};\ntype GlobalA_create_recursive<T> = {\n    value: T;\n    next: () => GlobalA_create_recursive<T>;\n};\ntype GlobalA_a_b_recursive = {\n    value: boolean;\n    next: () => GlobalA_a_b_recursive;\n};\ndeclare function makeA(): {\n    value: number;\n    self(): makeA_recursive;\n};\ntype makeReserved_recursive = \"reserved\";\ndeclare function makeReserved(): {\n    value: boolean;\n    self(): makeReserved_recursive_1;\n};\ndeclare class GlobalA {\n    static create<T>(value: T): GlobalA_create_recursive<T>;\n    static \"a-b\"(): GlobalA_a_b_recursive;\n}\n",
        "affectsGlobalScope": true,
        "impliedNodeFormat": 1
      }
    }
  ],
  "options": {
    "composite": true,
    "outDir": "./",
    "strict": true
  },
  "latestChangedDtsFile": "./index.d.ts",
  "size": 2300
}
//// [/home/src/workspaces/project/second/dist/index.d.ts] *new* 
type makeB_recursive = {
    value: string;
    self(): makeB_recursive;
};
type GlobalB_create_recursive<T> = {
    value: T;
    next: () => GlobalB_create_recursive<T>;
};
declare function makeB(): {
    value: string;
    self(): makeB_recursive;
};
declare class GlobalB {
    static create<T>(value: T): GlobalB_create_recursive<T>;
}

//// [/home/src/workspaces/project/second/dist/index.js] *new* 
"use strict";
function makeB() {
    return { value: "text", self() { return this; } };
}
class GlobalB {
    static create(value) {
        const node = { value, next: () => node };
        return node;
    }
}

//// [/home/src/workspaces/project/second/dist/tsconfig.tsbuildinfo] *new* 
{"version":"FakeTSVersion","root":[2],"fileNames":["lib.es2026.full.d.ts","../index.ts"],"fileInfos":[{"version":"8859c12c614ce56ba9a18e58384a198f-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ninterface SymbolConstructor {\n    (desc?: string | number): symbol;\n    for(name: string): symbol;\n    readonly toStringTag: symbol;\n}\ndeclare var Symbol: SymbolConstructor;\ninterface Symbol {\n    readonly [Symbol.toStringTag]: string;\n}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true,"impliedNodeFormat":1},{"version":"694c69b9db6086cbefa6a892b18ab1d4-function makeB() {\n    return { value: \"text\", self() { return this; } };\n}\nclass GlobalB {\n    static create<T>(value: T) {\n        const node = { value, next: () => node };\n        return node;\n    }\n}","signature":"1b1d198fb9025c7d8314d76bb2445e46-type makeB_recursive = {\n    value: string;\n    self(): makeB_recursive;\n};\ntype GlobalB_create_recursive<T> = {\n    value: T;\n    next: () => GlobalB_create_recursive<T>;\n};\ndeclare function makeB(): {\n    value: string;\n    self(): makeB_recursive;\n};\ndeclare class GlobalB {\n    static create<T>(value: T): GlobalB_create_recursive<T>;\n}\n","affectsGlobalScope":true,"impliedNodeFormat":1}],"options":{"composite":true,"outDir":"./","strict":true},"latestChangedDtsFile":"./index.d.ts"}
//// [/home/src/workspaces/project/second/dist/tsconfig.tsbuildinfo.readable.baseline.txt] *new* 
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
    "lib.es2026.full.d.ts",
    "../index.ts"
  ],
  "fileInfos": [
    {
      "fileName": "lib.es2026.full.d.ts",
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
      "version": "694c69b9db6086cbefa6a892b18ab1d4-function makeB() {\n    return { value: \"text\", self() { return this; } };\n}\nclass GlobalB {\n    static create<T>(value: T) {\n        const node = { value, next: () => node };\n        return node;\n    }\n}",
      "signature": "1b1d198fb9025c7d8314d76bb2445e46-type makeB_recursive = {\n    value: string;\n    self(): makeB_recursive;\n};\ntype GlobalB_create_recursive<T> = {\n    value: T;\n    next: () => GlobalB_create_recursive<T>;\n};\ndeclare function makeB(): {\n    value: string;\n    self(): makeB_recursive;\n};\ndeclare class GlobalB {\n    static create<T>(value: T): GlobalB_create_recursive<T>;\n}\n",
      "affectsGlobalScope": true,
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "694c69b9db6086cbefa6a892b18ab1d4-function makeB() {\n    return { value: \"text\", self() { return this; } };\n}\nclass GlobalB {\n    static create<T>(value: T) {\n        const node = { value, next: () => node };\n        return node;\n    }\n}",
        "signature": "1b1d198fb9025c7d8314d76bb2445e46-type makeB_recursive = {\n    value: string;\n    self(): makeB_recursive;\n};\ntype GlobalB_create_recursive<T> = {\n    value: T;\n    next: () => GlobalB_create_recursive<T>;\n};\ndeclare function makeB(): {\n    value: string;\n    self(): makeB_recursive;\n};\ndeclare class GlobalB {\n    static create<T>(value: T): GlobalB_create_recursive<T>;\n}\n",
        "affectsGlobalScope": true,
        "impliedNodeFormat": 1
      }
    }
  ],
  "options": {
    "composite": true,
    "outDir": "./",
    "strict": true
  },
  "latestChangedDtsFile": "./index.d.ts",
  "size": 1681
}

first/tsconfig.json::
SemanticDiagnostics::
*refresh*    /home/src/tslibs/TS/Lib/lib.es2026.full.d.ts
*refresh*    /home/src/workspaces/project/first/index.ts
Signatures::
(stored at emit) /home/src/workspaces/project/first/index.ts

second/tsconfig.json::
SemanticDiagnostics::
*refresh*    /home/src/tslibs/TS/Lib/lib.es2026.full.d.ts
*refresh*    /home/src/workspaces/project/second/index.ts
Signatures::
(stored at emit) /home/src/workspaces/project/second/index.ts

consumer/tsconfig.json::
SemanticDiagnostics::
*refresh*    /home/src/tslibs/TS/Lib/lib.es2026.full.d.ts
*refresh*    /home/src/workspaces/project/consumer/index.ts
*refresh*    /home/src/workspaces/project/first/dist/index.d.ts
*refresh*    /home/src/workspaces/project/second/dist/index.d.ts
Signatures::
(stored at emit) /home/src/workspaces/project/consumer/index.ts


Edit [0]:: no change

tsgo --build consumer
ExitStatus:: DiagnosticsPresent_OutputsGenerated
Output::
[96mconsumer/index.ts[0m:[93m8[0m:[93m7[0m - [91merror[0m[90m TS2322: [0mType 'number' is not assignable to type 'string'.

[7m8[0m const invalidA: string = makeA().self().value;
[7m [0m [91m      ~~~~~~~~[0m

[96mconsumer/index.ts[0m:[93m9[0m:[93m7[0m - [91merror[0m[90m TS2322: [0mType 'string' is not assignable to type 'number'.

[7m9[0m const invalidB: number = makeB().self().value;
[7m [0m [91m      ~~~~~~~~[0m


Found 2 errors in the same file, starting at: consumer/index.ts[90m:8[0m


consumer/tsconfig.json::
SemanticDiagnostics::
Signatures::


Edit [1]:: add a comment to the first script
//// [/home/src/workspaces/project/first/index.ts] *modified* 
function makeA() {
    return { value: 1, self() { return this; } };
}
type makeReserved_recursive = "reserved";
function makeReserved() {
    return { value: true, self() { return this; } };
}
class GlobalA {
    static create<T>(value: T) {
        const node = { value, next: () => node };
        return node;
    }
    static "a-b"() {
        const node = { value: true, next: () => node };
        return node;
    }
}
// comment-only edit


tsgo --build consumer
ExitStatus:: DiagnosticsPresent_OutputsGenerated
Output::
[96mconsumer/index.ts[0m:[93m8[0m:[93m7[0m - [91merror[0m[90m TS2322: [0mType 'number' is not assignable to type 'string'.

[7m8[0m const invalidA: string = makeA().self().value;
[7m [0m [91m      ~~~~~~~~[0m

[96mconsumer/index.ts[0m:[93m9[0m:[93m7[0m - [91merror[0m[90m TS2322: [0mType 'string' is not assignable to type 'number'.

[7m9[0m const invalidB: number = makeB().self().value;
[7m [0m [91m      ~~~~~~~~[0m


Found 2 errors in the same file, starting at: consumer/index.ts[90m:8[0m

//// [/home/src/workspaces/project/first/dist/index.js] *modified* 
"use strict";
function makeA() {
    return { value: 1, self() { return this; } };
}
function makeReserved() {
    return { value: true, self() { return this; } };
}
class GlobalA {
    static create(value) {
        const node = { value, next: () => node };
        return node;
    }
    static "a-b"() {
        const node = { value: true, next: () => node };
        return node;
    }
}
// comment-only edit

//// [/home/src/workspaces/project/first/dist/tsconfig.tsbuildinfo] *modified* 
{"version":"FakeTSVersion","root":[2],"fileNames":["lib.es2026.full.d.ts","../index.ts"],"fileInfos":[{"version":"8859c12c614ce56ba9a18e58384a198f-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ninterface SymbolConstructor {\n    (desc?: string | number): symbol;\n    for(name: string): symbol;\n    readonly toStringTag: symbol;\n}\ndeclare var Symbol: SymbolConstructor;\ninterface Symbol {\n    readonly [Symbol.toStringTag]: string;\n}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true,"impliedNodeFormat":1},{"version":"2ed9ea09308db619d5987fe87b218899-function makeA() {\n    return { value: 1, self() { return this; } };\n}\ntype makeReserved_recursive = \"reserved\";\nfunction makeReserved() {\n    return { value: true, self() { return this; } };\n}\nclass GlobalA {\n    static create<T>(value: T) {\n        const node = { value, next: () => node };\n        return node;\n    }\n    static \"a-b\"() {\n        const node = { value: true, next: () => node };\n        return node;\n    }\n}\n// comment-only edit\n","signature":"02702dd1cd4f6805e366ae36e2943eb6-type makeA_recursive = {\n    value: number;\n    self(): makeA_recursive;\n};\ntype makeReserved_recursive_1 = {\n    value: boolean;\n    self(): makeReserved_recursive_1;\n};\ntype GlobalA_create_recursive<T> = {\n    value: T;\n    next: () => GlobalA_create_recursive<T>;\n};\ntype GlobalA_a_b_recursive = {\n    value: boolean;\n    next: () => GlobalA_a_b_recursive;\n};\ndeclare function makeA(): {\n    value: number;\n    self(): makeA_recursive;\n};\ntype makeReserved_recursive = \"reserved\";\ndeclare function makeReserved(): {\n    value: boolean;\n    self(): makeReserved_recursive_1;\n};\ndeclare class GlobalA {\n    static create<T>(value: T): GlobalA_create_recursive<T>;\n    static \"a-b\"(): GlobalA_a_b_recursive;\n}\n","affectsGlobalScope":true,"impliedNodeFormat":1}],"options":{"composite":true,"outDir":"./","strict":true},"latestChangedDtsFile":"./index.d.ts"}
//// [/home/src/workspaces/project/first/dist/tsconfig.tsbuildinfo.readable.baseline.txt] *modified* 
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
    "lib.es2026.full.d.ts",
    "../index.ts"
  ],
  "fileInfos": [
    {
      "fileName": "lib.es2026.full.d.ts",
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
      "version": "2ed9ea09308db619d5987fe87b218899-function makeA() {\n    return { value: 1, self() { return this; } };\n}\ntype makeReserved_recursive = \"reserved\";\nfunction makeReserved() {\n    return { value: true, self() { return this; } };\n}\nclass GlobalA {\n    static create<T>(value: T) {\n        const node = { value, next: () => node };\n        return node;\n    }\n    static \"a-b\"() {\n        const node = { value: true, next: () => node };\n        return node;\n    }\n}\n// comment-only edit\n",
      "signature": "02702dd1cd4f6805e366ae36e2943eb6-type makeA_recursive = {\n    value: number;\n    self(): makeA_recursive;\n};\ntype makeReserved_recursive_1 = {\n    value: boolean;\n    self(): makeReserved_recursive_1;\n};\ntype GlobalA_create_recursive<T> = {\n    value: T;\n    next: () => GlobalA_create_recursive<T>;\n};\ntype GlobalA_a_b_recursive = {\n    value: boolean;\n    next: () => GlobalA_a_b_recursive;\n};\ndeclare function makeA(): {\n    value: number;\n    self(): makeA_recursive;\n};\ntype makeReserved_recursive = \"reserved\";\ndeclare function makeReserved(): {\n    value: boolean;\n    self(): makeReserved_recursive_1;\n};\ndeclare class GlobalA {\n    static create<T>(value: T): GlobalA_create_recursive<T>;\n    static \"a-b\"(): GlobalA_a_b_recursive;\n}\n",
      "affectsGlobalScope": true,
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "2ed9ea09308db619d5987fe87b218899-function makeA() {\n    return { value: 1, self() { return this; } };\n}\ntype makeReserved_recursive = \"reserved\";\nfunction makeReserved() {\n    return { value: true, self() { return this; } };\n}\nclass GlobalA {\n    static create<T>(value: T) {\n        const node = { value, next: () => node };\n        return node;\n    }\n    static \"a-b\"() {\n        const node = { value: true, next: () => node };\n        return node;\n    }\n}\n// comment-only edit\n",
        "signature": "02702dd1cd4f6805e366ae36e2943eb6-type makeA_recursive = {\n    value: number;\n    self(): makeA_recursive;\n};\ntype makeReserved_recursive_1 = {\n    value: boolean;\n    self(): makeReserved_recursive_1;\n};\ntype GlobalA_create_recursive<T> = {\n    value: T;\n    next: () => GlobalA_create_recursive<T>;\n};\ntype GlobalA_a_b_recursive = {\n    value: boolean;\n    next: () => GlobalA_a_b_recursive;\n};\ndeclare function makeA(): {\n    value: number;\n    self(): makeA_recursive;\n};\ntype makeReserved_recursive = \"reserved\";\ndeclare function makeReserved(): {\n    value: boolean;\n    self(): makeReserved_recursive_1;\n};\ndeclare class GlobalA {\n    static create<T>(value: T): GlobalA_create_recursive<T>;\n    static \"a-b\"(): GlobalA_a_b_recursive;\n}\n",
        "affectsGlobalScope": true,
        "impliedNodeFormat": 1
      }
    }
  ],
  "options": {
    "composite": true,
    "outDir": "./",
    "strict": true
  },
  "latestChangedDtsFile": "./index.d.ts",
  "size": 2324
}

first/tsconfig.json::
SemanticDiagnostics::
*refresh*    /home/src/workspaces/project/first/index.ts
Signatures::
(computed .d.ts) /home/src/workspaces/project/first/index.ts

consumer/tsconfig.json::
SemanticDiagnostics::
Signatures::


Edit [2]:: no change

tsgo --build consumer
ExitStatus:: DiagnosticsPresent_OutputsGenerated
Output::
[96mconsumer/index.ts[0m:[93m8[0m:[93m7[0m - [91merror[0m[90m TS2322: [0mType 'number' is not assignable to type 'string'.

[7m8[0m const invalidA: string = makeA().self().value;
[7m [0m [91m      ~~~~~~~~[0m

[96mconsumer/index.ts[0m:[93m9[0m:[93m7[0m - [91merror[0m[90m TS2322: [0mType 'string' is not assignable to type 'number'.

[7m9[0m const invalidB: number = makeB().self().value;
[7m [0m [91m      ~~~~~~~~[0m


Found 2 errors in the same file, starting at: consumer/index.ts[90m:8[0m


consumer/tsconfig.json::
SemanticDiagnostics::
Signatures::


Edit [3]:: check both declarations with skipLibCheck
//// [/home/src/workspaces/project/consumer/tsconfig.json] *modified* 
{
					"compilerOptions": { "strict": true, "composite": true, "skipLibCheck": true },
					"files": ["index.ts", "../first/dist/index.d.ts", "../second/dist/index.d.ts"],
					"references": [{ "path": "../first" }, { "path": "../second" }]
				}

tsgo --build consumer
ExitStatus:: DiagnosticsPresent_OutputsGenerated
Output::
[96mconsumer/index.ts[0m:[93m8[0m:[93m7[0m - [91merror[0m[90m TS2322: [0mType 'number' is not assignable to type 'string'.

[7m8[0m const invalidA: string = makeA().self().value;
[7m [0m [91m      ~~~~~~~~[0m

[96mconsumer/index.ts[0m:[93m9[0m:[93m7[0m - [91merror[0m[90m TS2322: [0mType 'string' is not assignable to type 'number'.

[7m9[0m const invalidB: number = makeB().self().value;
[7m [0m [91m      ~~~~~~~~[0m


Found 2 errors in the same file, starting at: consumer/index.ts[90m:8[0m

//// [/home/src/workspaces/project/consumer/tsconfig.tsbuildinfo] *modified* 
{"version":"FakeTSVersion","root":[[2,4]],"fileNames":["lib.es2026.full.d.ts","./index.ts","../first/dist/index.d.ts","../second/dist/index.d.ts"],"fileInfos":[{"version":"8859c12c614ce56ba9a18e58384a198f-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ninterface SymbolConstructor {\n    (desc?: string | number): symbol;\n    for(name: string): symbol;\n    readonly toStringTag: symbol;\n}\ndeclare var Symbol: SymbolConstructor;\ninterface Symbol {\n    readonly [Symbol.toStringTag]: string;\n}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true,"impliedNodeFormat":1},{"version":"c96c6feb8050748fb0780a02a020929d-export {};\nconst fromA: number = makeA().self().value;\nconst fromB: string = makeB().self().value;\nconst reserved: boolean = makeReserved().self().value;\nconst genericA: string = GlobalA.create(\"text\").next().value;\nconst genericB: number = GlobalB.create(1).next().value;\nconst quoted: boolean = GlobalA[\"a-b\"]().next().value;\nconst invalidA: string = makeA().self().value;\nconst invalidB: number = makeB().self().value;","signature":"abe7d9981d6018efb6b2b794f40a1607-export {};\n","impliedNodeFormat":1},{"version":"02702dd1cd4f6805e366ae36e2943eb6-type makeA_recursive = {\n    value: number;\n    self(): makeA_recursive;\n};\ntype makeReserved_recursive_1 = {\n    value: boolean;\n    self(): makeReserved_recursive_1;\n};\ntype GlobalA_create_recursive<T> = {\n    value: T;\n    next: () => GlobalA_create_recursive<T>;\n};\ntype GlobalA_a_b_recursive = {\n    value: boolean;\n    next: () => GlobalA_a_b_recursive;\n};\ndeclare function makeA(): {\n    value: number;\n    self(): makeA_recursive;\n};\ntype makeReserved_recursive = \"reserved\";\ndeclare function makeReserved(): {\n    value: boolean;\n    self(): makeReserved_recursive_1;\n};\ndeclare class GlobalA {\n    static create<T>(value: T): GlobalA_create_recursive<T>;\n    static \"a-b\"(): GlobalA_a_b_recursive;\n}\n","affectsGlobalScope":true,"impliedNodeFormat":1},{"version":"1b1d198fb9025c7d8314d76bb2445e46-type makeB_recursive = {\n    value: string;\n    self(): makeB_recursive;\n};\ntype GlobalB_create_recursive<T> = {\n    value: T;\n    next: () => GlobalB_create_recursive<T>;\n};\ndeclare function makeB(): {\n    value: string;\n    self(): makeB_recursive;\n};\ndeclare class GlobalB {\n    static create<T>(value: T): GlobalB_create_recursive<T>;\n}\n","affectsGlobalScope":true,"impliedNodeFormat":1}],"options":{"composite":true,"skipLibCheck":true,"strict":true},"semanticDiagnosticsPerFile":[[2,[{"pos":334,"end":342,"code":2322,"category":1,"messageKey":"Type_0_is_not_assignable_to_type_1_2322","messageArgs":["number","string"]},{"pos":381,"end":389,"code":2322,"category":1,"messageKey":"Type_0_is_not_assignable_to_type_1_2322","messageArgs":["string","number"]}]]],"latestChangedDtsFile":"./index.d.ts"}
//// [/home/src/workspaces/project/consumer/tsconfig.tsbuildinfo.readable.baseline.txt] *modified* 
{
  "version": "FakeTSVersion",
  "root": [
    {
      "files": [
        "./index.ts",
        "../first/dist/index.d.ts",
        "../second/dist/index.d.ts"
      ],
      "original": [
        2,
        4
      ]
    }
  ],
  "fileNames": [
    "lib.es2026.full.d.ts",
    "./index.ts",
    "../first/dist/index.d.ts",
    "../second/dist/index.d.ts"
  ],
  "fileInfos": [
    {
      "fileName": "lib.es2026.full.d.ts",
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
      "fileName": "./index.ts",
      "version": "c96c6feb8050748fb0780a02a020929d-export {};\nconst fromA: number = makeA().self().value;\nconst fromB: string = makeB().self().value;\nconst reserved: boolean = makeReserved().self().value;\nconst genericA: string = GlobalA.create(\"text\").next().value;\nconst genericB: number = GlobalB.create(1).next().value;\nconst quoted: boolean = GlobalA[\"a-b\"]().next().value;\nconst invalidA: string = makeA().self().value;\nconst invalidB: number = makeB().self().value;",
      "signature": "abe7d9981d6018efb6b2b794f40a1607-export {};\n",
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "c96c6feb8050748fb0780a02a020929d-export {};\nconst fromA: number = makeA().self().value;\nconst fromB: string = makeB().self().value;\nconst reserved: boolean = makeReserved().self().value;\nconst genericA: string = GlobalA.create(\"text\").next().value;\nconst genericB: number = GlobalB.create(1).next().value;\nconst quoted: boolean = GlobalA[\"a-b\"]().next().value;\nconst invalidA: string = makeA().self().value;\nconst invalidB: number = makeB().self().value;",
        "signature": "abe7d9981d6018efb6b2b794f40a1607-export {};\n",
        "impliedNodeFormat": 1
      }
    },
    {
      "fileName": "../first/dist/index.d.ts",
      "version": "02702dd1cd4f6805e366ae36e2943eb6-type makeA_recursive = {\n    value: number;\n    self(): makeA_recursive;\n};\ntype makeReserved_recursive_1 = {\n    value: boolean;\n    self(): makeReserved_recursive_1;\n};\ntype GlobalA_create_recursive<T> = {\n    value: T;\n    next: () => GlobalA_create_recursive<T>;\n};\ntype GlobalA_a_b_recursive = {\n    value: boolean;\n    next: () => GlobalA_a_b_recursive;\n};\ndeclare function makeA(): {\n    value: number;\n    self(): makeA_recursive;\n};\ntype makeReserved_recursive = \"reserved\";\ndeclare function makeReserved(): {\n    value: boolean;\n    self(): makeReserved_recursive_1;\n};\ndeclare class GlobalA {\n    static create<T>(value: T): GlobalA_create_recursive<T>;\n    static \"a-b\"(): GlobalA_a_b_recursive;\n}\n",
      "signature": "02702dd1cd4f6805e366ae36e2943eb6-type makeA_recursive = {\n    value: number;\n    self(): makeA_recursive;\n};\ntype makeReserved_recursive_1 = {\n    value: boolean;\n    self(): makeReserved_recursive_1;\n};\ntype GlobalA_create_recursive<T> = {\n    value: T;\n    next: () => GlobalA_create_recursive<T>;\n};\ntype GlobalA_a_b_recursive = {\n    value: boolean;\n    next: () => GlobalA_a_b_recursive;\n};\ndeclare function makeA(): {\n    value: number;\n    self(): makeA_recursive;\n};\ntype makeReserved_recursive = \"reserved\";\ndeclare function makeReserved(): {\n    value: boolean;\n    self(): makeReserved_recursive_1;\n};\ndeclare class GlobalA {\n    static create<T>(value: T): GlobalA_create_recursive<T>;\n    static \"a-b\"(): GlobalA_a_b_recursive;\n}\n",
      "affectsGlobalScope": true,
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "02702dd1cd4f6805e366ae36e2943eb6-type makeA_recursive = {\n    value: number;\n    self(): makeA_recursive;\n};\ntype makeReserved_recursive_1 = {\n    value: boolean;\n    self(): makeReserved_recursive_1;\n};\ntype GlobalA_create_recursive<T> = {\n    value: T;\n    next: () => GlobalA_create_recursive<T>;\n};\ntype GlobalA_a_b_recursive = {\n    value: boolean;\n    next: () => GlobalA_a_b_recursive;\n};\ndeclare function makeA(): {\n    value: number;\n    self(): makeA_recursive;\n};\ntype makeReserved_recursive = \"reserved\";\ndeclare function makeReserved(): {\n    value: boolean;\n    self(): makeReserved_recursive_1;\n};\ndeclare class GlobalA {\n    static create<T>(value: T): GlobalA_create_recursive<T>;\n    static \"a-b\"(): GlobalA_a_b_recursive;\n}\n",
        "affectsGlobalScope": true,
        "impliedNodeFormat": 1
      }
    },
    {
      "fileName": "../second/dist/index.d.ts",
      "version": "1b1d198fb9025c7d8314d76bb2445e46-type makeB_recursive = {\n    value: string;\n    self(): makeB_recursive;\n};\ntype GlobalB_create_recursive<T> = {\n    value: T;\n    next: () => GlobalB_create_recursive<T>;\n};\ndeclare function makeB(): {\n    value: string;\n    self(): makeB_recursive;\n};\ndeclare class GlobalB {\n    static create<T>(value: T): GlobalB_create_recursive<T>;\n}\n",
      "signature": "1b1d198fb9025c7d8314d76bb2445e46-type makeB_recursive = {\n    value: string;\n    self(): makeB_recursive;\n};\ntype GlobalB_create_recursive<T> = {\n    value: T;\n    next: () => GlobalB_create_recursive<T>;\n};\ndeclare function makeB(): {\n    value: string;\n    self(): makeB_recursive;\n};\ndeclare class GlobalB {\n    static create<T>(value: T): GlobalB_create_recursive<T>;\n}\n",
      "affectsGlobalScope": true,
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "1b1d198fb9025c7d8314d76bb2445e46-type makeB_recursive = {\n    value: string;\n    self(): makeB_recursive;\n};\ntype GlobalB_create_recursive<T> = {\n    value: T;\n    next: () => GlobalB_create_recursive<T>;\n};\ndeclare function makeB(): {\n    value: string;\n    self(): makeB_recursive;\n};\ndeclare class GlobalB {\n    static create<T>(value: T): GlobalB_create_recursive<T>;\n}\n",
        "affectsGlobalScope": true,
        "impliedNodeFormat": 1
      }
    }
  ],
  "options": {
    "composite": true,
    "skipLibCheck": true,
    "strict": true
  },
  "semanticDiagnosticsPerFile": [
    [
      "./index.ts",
      [
        {
          "pos": 334,
          "end": 342,
          "code": 2322,
          "category": 1,
          "messageKey": "Type_0_is_not_assignable_to_type_1_2322",
          "messageArgs": [
            "number",
            "string"
          ]
        },
        {
          "pos": 381,
          "end": 389,
          "code": 2322,
          "category": 1,
          "messageKey": "Type_0_is_not_assignable_to_type_1_2322",
          "messageArgs": [
            "string",
            "number"
          ]
        }
      ]
    ]
  ],
  "latestChangedDtsFile": "./index.d.ts",
  "size": 3195
}

consumer/tsconfig.json::
SemanticDiagnostics::
*refresh*    /home/src/tslibs/TS/Lib/lib.es2026.full.d.ts
*refresh*    /home/src/workspaces/project/first/dist/index.d.ts
*refresh*    /home/src/workspaces/project/second/dist/index.d.ts
Signatures::


Edit [4]:: no change

tsgo --build consumer
ExitStatus:: DiagnosticsPresent_OutputsGenerated
Output::
[96mconsumer/index.ts[0m:[93m8[0m:[93m7[0m - [91merror[0m[90m TS2322: [0mType 'number' is not assignable to type 'string'.

[7m8[0m const invalidA: string = makeA().self().value;
[7m [0m [91m      ~~~~~~~~[0m

[96mconsumer/index.ts[0m:[93m9[0m:[93m7[0m - [91merror[0m[90m TS2322: [0mType 'string' is not assignable to type 'number'.

[7m9[0m const invalidB: number = makeB().self().value;
[7m [0m [91m      ~~~~~~~~[0m


Found 2 errors in the same file, starting at: consumer/index.ts[90m:8[0m


consumer/tsconfig.json::
SemanticDiagnostics::
Signatures::
