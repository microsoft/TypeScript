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
[96mconsumer/index.ts[0m:[93m3[0m:[93m7[0m - [91merror[0m[90m TS2322: [0mType 'number' is not assignable to type 'string'.

[7m3[0m const fromB: string = makeB().self().value;
[7m [0m [91m      ~~~~~[0m

[96mconsumer/index.ts[0m:[93m8[0m:[93m7[0m - [91merror[0m[90m TS2322: [0mType 'number' is not assignable to type 'string'.

[7m8[0m const invalidA: string = makeA().self().value;
[7m [0m [91m      ~~~~~~~~[0m

[96mfirst/dist/index.d.ts[0m:[93m1[0m:[93m6[0m - [91merror[0m[90m TS2300: [0mDuplicate identifier '_recursive'.

[7m1[0m type _recursive = {
[7m [0m [91m     ~~~~~~~~~~[0m

  [96msecond/dist/index.d.ts[0m:[93m1[0m:[93m6[0m - '_recursive' was also declared here.
    [7m1[0m type _recursive = {
    [7m [0m [96m     ~~~~~~~~~~[0m

[96mfirst/dist/index.d.ts[0m:[93m5[0m:[93m6[0m - [91merror[0m[90m TS2300: [0mDuplicate identifier '_recursive_1'.

[7m5[0m type _recursive_1 = {
[7m [0m [91m     ~~~~~~~~~~~~[0m

  [96msecond/dist/index.d.ts[0m:[93m5[0m:[93m6[0m - '_recursive_1' was also declared here.
    [7m5[0m type _recursive_1<T> = {
    [7m [0m [96m     ~~~~~~~~~~~~[0m

[96msecond/dist/index.d.ts[0m:[93m1[0m:[93m6[0m - [91merror[0m[90m TS2300: [0mDuplicate identifier '_recursive'.

[7m1[0m type _recursive = {
[7m [0m [91m     ~~~~~~~~~~[0m

  [96mfirst/dist/index.d.ts[0m:[93m1[0m:[93m6[0m - '_recursive' was also declared here.
    [7m1[0m type _recursive = {
    [7m [0m [96m     ~~~~~~~~~~[0m

[96msecond/dist/index.d.ts[0m:[93m5[0m:[93m6[0m - [91merror[0m[90m TS2300: [0mDuplicate identifier '_recursive_1'.

[7m5[0m type _recursive_1<T> = {
[7m [0m [91m     ~~~~~~~~~~~~[0m

  [96mfirst/dist/index.d.ts[0m:[93m5[0m:[93m6[0m - '_recursive_1' was also declared here.
    [7m5[0m type _recursive_1 = {
    [7m [0m [96m     ~~~~~~~~~~~~[0m

[96msecond/dist/index.d.ts[0m:[93m7[0m:[93m17[0m - [91merror[0m[90m TS2315: [0mType '_recursive_1' is not generic.

[7m7[0m     next: () => _recursive_1<T>;
[7m [0m [91m                ~~~~~~~~~~~~~~~[0m

[96msecond/dist/index.d.ts[0m:[93m14[0m:[93m33[0m - [91merror[0m[90m TS2315: [0mType '_recursive_1' is not generic.

[7m14[0m     static create<T>(value: T): _recursive_1<T>;
[7m  [0m [91m                                ~~~~~~~~~~~~~~~[0m


Found 8 errors in 3 files.

Errors  Files
     2  consumer/index.ts[90m:3[0m
     2  first/dist/index.d.ts[90m:1[0m
     4  second/dist/index.d.ts[90m:1[0m

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
{"version":"FakeTSVersion","root":[[2,4]],"fileNames":["lib.es2026.full.d.ts","./index.ts","../first/dist/index.d.ts","../second/dist/index.d.ts"],"fileInfos":[{"version":"8859c12c614ce56ba9a18e58384a198f-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ninterface SymbolConstructor {\n    (desc?: string | number): symbol;\n    for(name: string): symbol;\n    readonly toStringTag: symbol;\n}\ndeclare var Symbol: SymbolConstructor;\ninterface Symbol {\n    readonly [Symbol.toStringTag]: string;\n}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true,"impliedNodeFormat":1},{"version":"c96c6feb8050748fb0780a02a020929d-export {};\nconst fromA: number = makeA().self().value;\nconst fromB: string = makeB().self().value;\nconst reserved: boolean = makeReserved().self().value;\nconst genericA: string = GlobalA.create(\"text\").next().value;\nconst genericB: number = GlobalB.create(1).next().value;\nconst quoted: boolean = GlobalA[\"a-b\"]().next().value;\nconst invalidA: string = makeA().self().value;\nconst invalidB: number = makeB().self().value;","signature":"abe7d9981d6018efb6b2b794f40a1607-export {};\n","impliedNodeFormat":1},{"version":"8e0bb33165b62f6b99d7cba0fcd92437-type _recursive = {\n    value: number;\n    self(): _recursive;\n};\ntype _recursive_1 = {\n    value: boolean;\n    self(): _recursive_1;\n};\ntype _recursive_2<T> = {\n    value: T;\n    next: () => _recursive_2<T>;\n};\ntype _recursive_3 = {\n    value: boolean;\n    next: () => _recursive_3;\n};\ndeclare function makeA(): {\n    value: number;\n    self(): _recursive;\n};\ntype makeReserved_recursive = \"reserved\";\ndeclare function makeReserved(): {\n    value: boolean;\n    self(): _recursive_1;\n};\ndeclare class GlobalA {\n    static create<T>(value: T): _recursive_2<T>;\n    static \"a-b\"(): _recursive_3;\n}\n","affectsGlobalScope":true,"impliedNodeFormat":1},{"version":"a512e7a77ff8aeb766338271452422ab-type _recursive = {\n    value: string;\n    self(): _recursive;\n};\ntype _recursive_1<T> = {\n    value: T;\n    next: () => _recursive_1<T>;\n};\ndeclare function makeB(): {\n    value: string;\n    self(): _recursive;\n};\ndeclare class GlobalB {\n    static create<T>(value: T): _recursive_1<T>;\n}\n","affectsGlobalScope":true,"impliedNodeFormat":1}],"options":{"composite":true,"skipLibCheck":false,"strict":true},"semanticDiagnosticsPerFile":[[2,[{"pos":61,"end":66,"code":2322,"category":1,"messageKey":"Type_0_is_not_assignable_to_type_1_2322","messageArgs":["number","string"]},{"pos":334,"end":342,"code":2322,"category":1,"messageKey":"Type_0_is_not_assignable_to_type_1_2322","messageArgs":["number","string"]}]],[3,[{"pos":5,"end":15,"code":2300,"category":1,"messageKey":"Duplicate_identifier_0_2300","messageArgs":["_recursive"],"relatedInformation":[{"file":4,"pos":5,"end":15,"code":6203,"category":3,"messageKey":"_0_was_also_declared_here_6203","messageArgs":["_recursive"]}]},{"pos":71,"end":83,"code":2300,"category":1,"messageKey":"Duplicate_identifier_0_2300","messageArgs":["_recursive_1"],"relatedInformation":[{"file":4,"pos":71,"end":83,"code":6203,"category":3,"messageKey":"_0_was_also_declared_here_6203","messageArgs":["_recursive_1"]}]}]],[4,[{"pos":5,"end":15,"code":2300,"category":1,"messageKey":"Duplicate_identifier_0_2300","messageArgs":["_recursive"],"relatedInformation":[{"file":3,"pos":5,"end":15,"code":6203,"category":3,"messageKey":"_0_was_also_declared_here_6203","messageArgs":["_recursive"]}]},{"pos":71,"end":83,"code":2300,"category":1,"messageKey":"Duplicate_identifier_0_2300","messageArgs":["_recursive_1"],"relatedInformation":[{"file":3,"pos":71,"end":83,"code":6203,"category":3,"messageKey":"_0_was_also_declared_here_6203","messageArgs":["_recursive_1"]}]},{"pos":121,"end":136,"code":2315,"category":1,"messageKey":"Type_0_is_not_generic_2315","messageArgs":["_recursive_1"]},{"pos":271,"end":286,"code":2315,"category":1,"messageKey":"Type_0_is_not_generic_2315","messageArgs":["_recursive_1"]}]]],"latestChangedDtsFile":"./index.d.ts"}
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
      "version": "8e0bb33165b62f6b99d7cba0fcd92437-type _recursive = {\n    value: number;\n    self(): _recursive;\n};\ntype _recursive_1 = {\n    value: boolean;\n    self(): _recursive_1;\n};\ntype _recursive_2<T> = {\n    value: T;\n    next: () => _recursive_2<T>;\n};\ntype _recursive_3 = {\n    value: boolean;\n    next: () => _recursive_3;\n};\ndeclare function makeA(): {\n    value: number;\n    self(): _recursive;\n};\ntype makeReserved_recursive = \"reserved\";\ndeclare function makeReserved(): {\n    value: boolean;\n    self(): _recursive_1;\n};\ndeclare class GlobalA {\n    static create<T>(value: T): _recursive_2<T>;\n    static \"a-b\"(): _recursive_3;\n}\n",
      "signature": "8e0bb33165b62f6b99d7cba0fcd92437-type _recursive = {\n    value: number;\n    self(): _recursive;\n};\ntype _recursive_1 = {\n    value: boolean;\n    self(): _recursive_1;\n};\ntype _recursive_2<T> = {\n    value: T;\n    next: () => _recursive_2<T>;\n};\ntype _recursive_3 = {\n    value: boolean;\n    next: () => _recursive_3;\n};\ndeclare function makeA(): {\n    value: number;\n    self(): _recursive;\n};\ntype makeReserved_recursive = \"reserved\";\ndeclare function makeReserved(): {\n    value: boolean;\n    self(): _recursive_1;\n};\ndeclare class GlobalA {\n    static create<T>(value: T): _recursive_2<T>;\n    static \"a-b\"(): _recursive_3;\n}\n",
      "affectsGlobalScope": true,
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "8e0bb33165b62f6b99d7cba0fcd92437-type _recursive = {\n    value: number;\n    self(): _recursive;\n};\ntype _recursive_1 = {\n    value: boolean;\n    self(): _recursive_1;\n};\ntype _recursive_2<T> = {\n    value: T;\n    next: () => _recursive_2<T>;\n};\ntype _recursive_3 = {\n    value: boolean;\n    next: () => _recursive_3;\n};\ndeclare function makeA(): {\n    value: number;\n    self(): _recursive;\n};\ntype makeReserved_recursive = \"reserved\";\ndeclare function makeReserved(): {\n    value: boolean;\n    self(): _recursive_1;\n};\ndeclare class GlobalA {\n    static create<T>(value: T): _recursive_2<T>;\n    static \"a-b\"(): _recursive_3;\n}\n",
        "affectsGlobalScope": true,
        "impliedNodeFormat": 1
      }
    },
    {
      "fileName": "../second/dist/index.d.ts",
      "version": "a512e7a77ff8aeb766338271452422ab-type _recursive = {\n    value: string;\n    self(): _recursive;\n};\ntype _recursive_1<T> = {\n    value: T;\n    next: () => _recursive_1<T>;\n};\ndeclare function makeB(): {\n    value: string;\n    self(): _recursive;\n};\ndeclare class GlobalB {\n    static create<T>(value: T): _recursive_1<T>;\n}\n",
      "signature": "a512e7a77ff8aeb766338271452422ab-type _recursive = {\n    value: string;\n    self(): _recursive;\n};\ntype _recursive_1<T> = {\n    value: T;\n    next: () => _recursive_1<T>;\n};\ndeclare function makeB(): {\n    value: string;\n    self(): _recursive;\n};\ndeclare class GlobalB {\n    static create<T>(value: T): _recursive_1<T>;\n}\n",
      "affectsGlobalScope": true,
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "a512e7a77ff8aeb766338271452422ab-type _recursive = {\n    value: string;\n    self(): _recursive;\n};\ntype _recursive_1<T> = {\n    value: T;\n    next: () => _recursive_1<T>;\n};\ndeclare function makeB(): {\n    value: string;\n    self(): _recursive;\n};\ndeclare class GlobalB {\n    static create<T>(value: T): _recursive_1<T>;\n}\n",
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
          "pos": 61,
          "end": 66,
          "code": 2322,
          "category": 1,
          "messageKey": "Type_0_is_not_assignable_to_type_1_2322",
          "messageArgs": [
            "number",
            "string"
          ]
        },
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
        }
      ]
    ],
    [
      "../first/dist/index.d.ts",
      [
        {
          "pos": 5,
          "end": 15,
          "code": 2300,
          "category": 1,
          "messageKey": "Duplicate_identifier_0_2300",
          "messageArgs": [
            "_recursive"
          ],
          "relatedInformation": [
            {
              "file": "../second/dist/index.d.ts",
              "pos": 5,
              "end": 15,
              "code": 6203,
              "category": 3,
              "messageKey": "_0_was_also_declared_here_6203",
              "messageArgs": [
                "_recursive"
              ]
            }
          ]
        },
        {
          "pos": 71,
          "end": 83,
          "code": 2300,
          "category": 1,
          "messageKey": "Duplicate_identifier_0_2300",
          "messageArgs": [
            "_recursive_1"
          ],
          "relatedInformation": [
            {
              "file": "../second/dist/index.d.ts",
              "pos": 71,
              "end": 83,
              "code": 6203,
              "category": 3,
              "messageKey": "_0_was_also_declared_here_6203",
              "messageArgs": [
                "_recursive_1"
              ]
            }
          ]
        }
      ]
    ],
    [
      "../second/dist/index.d.ts",
      [
        {
          "pos": 5,
          "end": 15,
          "code": 2300,
          "category": 1,
          "messageKey": "Duplicate_identifier_0_2300",
          "messageArgs": [
            "_recursive"
          ],
          "relatedInformation": [
            {
              "file": "../first/dist/index.d.ts",
              "pos": 5,
              "end": 15,
              "code": 6203,
              "category": 3,
              "messageKey": "_0_was_also_declared_here_6203",
              "messageArgs": [
                "_recursive"
              ]
            }
          ]
        },
        {
          "pos": 71,
          "end": 83,
          "code": 2300,
          "category": 1,
          "messageKey": "Duplicate_identifier_0_2300",
          "messageArgs": [
            "_recursive_1"
          ],
          "relatedInformation": [
            {
              "file": "../first/dist/index.d.ts",
              "pos": 71,
              "end": 83,
              "code": 6203,
              "category": 3,
              "messageKey": "_0_was_also_declared_here_6203",
              "messageArgs": [
                "_recursive_1"
              ]
            }
          ]
        },
        {
          "pos": 121,
          "end": 136,
          "code": 2315,
          "category": 1,
          "messageKey": "Type_0_is_not_generic_2315",
          "messageArgs": [
            "_recursive_1"
          ]
        },
        {
          "pos": 271,
          "end": 286,
          "code": 2315,
          "category": 1,
          "messageKey": "Type_0_is_not_generic_2315",
          "messageArgs": [
            "_recursive_1"
          ]
        }
      ]
    ]
  ],
  "latestChangedDtsFile": "./index.d.ts",
  "size": 4361
}
//// [/home/src/workspaces/project/first/dist/index.d.ts] *new* 
type _recursive = {
    value: number;
    self(): _recursive;
};
type _recursive_1 = {
    value: boolean;
    self(): _recursive_1;
};
type _recursive_2<T> = {
    value: T;
    next: () => _recursive_2<T>;
};
type _recursive_3 = {
    value: boolean;
    next: () => _recursive_3;
};
declare function makeA(): {
    value: number;
    self(): _recursive;
};
type makeReserved_recursive = "reserved";
declare function makeReserved(): {
    value: boolean;
    self(): _recursive_1;
};
declare class GlobalA {
    static create<T>(value: T): _recursive_2<T>;
    static "a-b"(): _recursive_3;
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
{"version":"FakeTSVersion","root":[2],"fileNames":["lib.es2026.full.d.ts","../index.ts"],"fileInfos":[{"version":"8859c12c614ce56ba9a18e58384a198f-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ninterface SymbolConstructor {\n    (desc?: string | number): symbol;\n    for(name: string): symbol;\n    readonly toStringTag: symbol;\n}\ndeclare var Symbol: SymbolConstructor;\ninterface Symbol {\n    readonly [Symbol.toStringTag]: string;\n}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true,"impliedNodeFormat":1},{"version":"ceb88b9ff61ebe91c7080ce8a28b3fc4-function makeA() {\n    return { value: 1, self() { return this; } };\n}\ntype makeReserved_recursive = \"reserved\";\nfunction makeReserved() {\n    return { value: true, self() { return this; } };\n}\nclass GlobalA {\n    static create<T>(value: T) {\n        const node = { value, next: () => node };\n        return node;\n    }\n    static \"a-b\"() {\n        const node = { value: true, next: () => node };\n        return node;\n    }\n}","signature":"8e0bb33165b62f6b99d7cba0fcd92437-type _recursive = {\n    value: number;\n    self(): _recursive;\n};\ntype _recursive_1 = {\n    value: boolean;\n    self(): _recursive_1;\n};\ntype _recursive_2<T> = {\n    value: T;\n    next: () => _recursive_2<T>;\n};\ntype _recursive_3 = {\n    value: boolean;\n    next: () => _recursive_3;\n};\ndeclare function makeA(): {\n    value: number;\n    self(): _recursive;\n};\ntype makeReserved_recursive = \"reserved\";\ndeclare function makeReserved(): {\n    value: boolean;\n    self(): _recursive_1;\n};\ndeclare class GlobalA {\n    static create<T>(value: T): _recursive_2<T>;\n    static \"a-b\"(): _recursive_3;\n}\n","affectsGlobalScope":true,"impliedNodeFormat":1}],"options":{"composite":true,"outDir":"./","strict":true},"latestChangedDtsFile":"./index.d.ts"}
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
      "signature": "8e0bb33165b62f6b99d7cba0fcd92437-type _recursive = {\n    value: number;\n    self(): _recursive;\n};\ntype _recursive_1 = {\n    value: boolean;\n    self(): _recursive_1;\n};\ntype _recursive_2<T> = {\n    value: T;\n    next: () => _recursive_2<T>;\n};\ntype _recursive_3 = {\n    value: boolean;\n    next: () => _recursive_3;\n};\ndeclare function makeA(): {\n    value: number;\n    self(): _recursive;\n};\ntype makeReserved_recursive = \"reserved\";\ndeclare function makeReserved(): {\n    value: boolean;\n    self(): _recursive_1;\n};\ndeclare class GlobalA {\n    static create<T>(value: T): _recursive_2<T>;\n    static \"a-b\"(): _recursive_3;\n}\n",
      "affectsGlobalScope": true,
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "ceb88b9ff61ebe91c7080ce8a28b3fc4-function makeA() {\n    return { value: 1, self() { return this; } };\n}\ntype makeReserved_recursive = \"reserved\";\nfunction makeReserved() {\n    return { value: true, self() { return this; } };\n}\nclass GlobalA {\n    static create<T>(value: T) {\n        const node = { value, next: () => node };\n        return node;\n    }\n    static \"a-b\"() {\n        const node = { value: true, next: () => node };\n        return node;\n    }\n}",
        "signature": "8e0bb33165b62f6b99d7cba0fcd92437-type _recursive = {\n    value: number;\n    self(): _recursive;\n};\ntype _recursive_1 = {\n    value: boolean;\n    self(): _recursive_1;\n};\ntype _recursive_2<T> = {\n    value: T;\n    next: () => _recursive_2<T>;\n};\ntype _recursive_3 = {\n    value: boolean;\n    next: () => _recursive_3;\n};\ndeclare function makeA(): {\n    value: number;\n    self(): _recursive;\n};\ntype makeReserved_recursive = \"reserved\";\ndeclare function makeReserved(): {\n    value: boolean;\n    self(): _recursive_1;\n};\ndeclare class GlobalA {\n    static create<T>(value: T): _recursive_2<T>;\n    static \"a-b\"(): _recursive_3;\n}\n",
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
  "size": 2186
}
//// [/home/src/workspaces/project/second/dist/index.d.ts] *new* 
type _recursive = {
    value: string;
    self(): _recursive;
};
type _recursive_1<T> = {
    value: T;
    next: () => _recursive_1<T>;
};
declare function makeB(): {
    value: string;
    self(): _recursive;
};
declare class GlobalB {
    static create<T>(value: T): _recursive_1<T>;
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
{"version":"FakeTSVersion","root":[2],"fileNames":["lib.es2026.full.d.ts","../index.ts"],"fileInfos":[{"version":"8859c12c614ce56ba9a18e58384a198f-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ninterface SymbolConstructor {\n    (desc?: string | number): symbol;\n    for(name: string): symbol;\n    readonly toStringTag: symbol;\n}\ndeclare var Symbol: SymbolConstructor;\ninterface Symbol {\n    readonly [Symbol.toStringTag]: string;\n}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true,"impliedNodeFormat":1},{"version":"694c69b9db6086cbefa6a892b18ab1d4-function makeB() {\n    return { value: \"text\", self() { return this; } };\n}\nclass GlobalB {\n    static create<T>(value: T) {\n        const node = { value, next: () => node };\n        return node;\n    }\n}","signature":"a512e7a77ff8aeb766338271452422ab-type _recursive = {\n    value: string;\n    self(): _recursive;\n};\ntype _recursive_1<T> = {\n    value: T;\n    next: () => _recursive_1<T>;\n};\ndeclare function makeB(): {\n    value: string;\n    self(): _recursive;\n};\ndeclare class GlobalB {\n    static create<T>(value: T): _recursive_1<T>;\n}\n","affectsGlobalScope":true,"impliedNodeFormat":1}],"options":{"composite":true,"outDir":"./","strict":true},"latestChangedDtsFile":"./index.d.ts"}
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
      "signature": "a512e7a77ff8aeb766338271452422ab-type _recursive = {\n    value: string;\n    self(): _recursive;\n};\ntype _recursive_1<T> = {\n    value: T;\n    next: () => _recursive_1<T>;\n};\ndeclare function makeB(): {\n    value: string;\n    self(): _recursive;\n};\ndeclare class GlobalB {\n    static create<T>(value: T): _recursive_1<T>;\n}\n",
      "affectsGlobalScope": true,
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "694c69b9db6086cbefa6a892b18ab1d4-function makeB() {\n    return { value: \"text\", self() { return this; } };\n}\nclass GlobalB {\n    static create<T>(value: T) {\n        const node = { value, next: () => node };\n        return node;\n    }\n}",
        "signature": "a512e7a77ff8aeb766338271452422ab-type _recursive = {\n    value: string;\n    self(): _recursive;\n};\ntype _recursive_1<T> = {\n    value: T;\n    next: () => _recursive_1<T>;\n};\ndeclare function makeB(): {\n    value: string;\n    self(): _recursive;\n};\ndeclare class GlobalB {\n    static create<T>(value: T): _recursive_1<T>;\n}\n",
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
  "size": 1630
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
[96mconsumer/index.ts[0m:[93m3[0m:[93m7[0m - [91merror[0m[90m TS2322: [0mType 'number' is not assignable to type 'string'.

[7m3[0m const fromB: string = makeB().self().value;
[7m [0m [91m      ~~~~~[0m

[96mconsumer/index.ts[0m:[93m8[0m:[93m7[0m - [91merror[0m[90m TS2322: [0mType 'number' is not assignable to type 'string'.

[7m8[0m const invalidA: string = makeA().self().value;
[7m [0m [91m      ~~~~~~~~[0m

[96mfirst/dist/index.d.ts[0m:[93m1[0m:[93m6[0m - [91merror[0m[90m TS2300: [0mDuplicate identifier '_recursive'.

[7m1[0m type _recursive = {
[7m [0m [91m     ~~~~~~~~~~[0m

  [96msecond/dist/index.d.ts[0m:[93m1[0m:[93m6[0m - '_recursive' was also declared here.
    [7m1[0m type _recursive = {
    [7m [0m [96m     ~~~~~~~~~~[0m

[96mfirst/dist/index.d.ts[0m:[93m5[0m:[93m6[0m - [91merror[0m[90m TS2300: [0mDuplicate identifier '_recursive_1'.

[7m5[0m type _recursive_1 = {
[7m [0m [91m     ~~~~~~~~~~~~[0m

  [96msecond/dist/index.d.ts[0m:[93m5[0m:[93m6[0m - '_recursive_1' was also declared here.
    [7m5[0m type _recursive_1<T> = {
    [7m [0m [96m     ~~~~~~~~~~~~[0m

[96msecond/dist/index.d.ts[0m:[93m1[0m:[93m6[0m - [91merror[0m[90m TS2300: [0mDuplicate identifier '_recursive'.

[7m1[0m type _recursive = {
[7m [0m [91m     ~~~~~~~~~~[0m

  [96mfirst/dist/index.d.ts[0m:[93m1[0m:[93m6[0m - '_recursive' was also declared here.
    [7m1[0m type _recursive = {
    [7m [0m [96m     ~~~~~~~~~~[0m

[96msecond/dist/index.d.ts[0m:[93m5[0m:[93m6[0m - [91merror[0m[90m TS2300: [0mDuplicate identifier '_recursive_1'.

[7m5[0m type _recursive_1<T> = {
[7m [0m [91m     ~~~~~~~~~~~~[0m

  [96mfirst/dist/index.d.ts[0m:[93m5[0m:[93m6[0m - '_recursive_1' was also declared here.
    [7m5[0m type _recursive_1 = {
    [7m [0m [96m     ~~~~~~~~~~~~[0m

[96msecond/dist/index.d.ts[0m:[93m7[0m:[93m17[0m - [91merror[0m[90m TS2315: [0mType '_recursive_1' is not generic.

[7m7[0m     next: () => _recursive_1<T>;
[7m [0m [91m                ~~~~~~~~~~~~~~~[0m

[96msecond/dist/index.d.ts[0m:[93m14[0m:[93m33[0m - [91merror[0m[90m TS2315: [0mType '_recursive_1' is not generic.

[7m14[0m     static create<T>(value: T): _recursive_1<T>;
[7m  [0m [91m                                ~~~~~~~~~~~~~~~[0m


Found 8 errors in 3 files.

Errors  Files
     2  consumer/index.ts[90m:3[0m
     2  first/dist/index.d.ts[90m:1[0m
     4  second/dist/index.d.ts[90m:1[0m


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
[96mconsumer/index.ts[0m:[93m3[0m:[93m7[0m - [91merror[0m[90m TS2322: [0mType 'number' is not assignable to type 'string'.

[7m3[0m const fromB: string = makeB().self().value;
[7m [0m [91m      ~~~~~[0m

[96mconsumer/index.ts[0m:[93m8[0m:[93m7[0m - [91merror[0m[90m TS2322: [0mType 'number' is not assignable to type 'string'.

[7m8[0m const invalidA: string = makeA().self().value;
[7m [0m [91m      ~~~~~~~~[0m

[96mfirst/dist/index.d.ts[0m:[93m1[0m:[93m6[0m - [91merror[0m[90m TS2300: [0mDuplicate identifier '_recursive'.

[7m1[0m type _recursive = {
[7m [0m [91m     ~~~~~~~~~~[0m

  [96msecond/dist/index.d.ts[0m:[93m1[0m:[93m6[0m - '_recursive' was also declared here.
    [7m1[0m type _recursive = {
    [7m [0m [96m     ~~~~~~~~~~[0m

[96mfirst/dist/index.d.ts[0m:[93m5[0m:[93m6[0m - [91merror[0m[90m TS2300: [0mDuplicate identifier '_recursive_1'.

[7m5[0m type _recursive_1 = {
[7m [0m [91m     ~~~~~~~~~~~~[0m

  [96msecond/dist/index.d.ts[0m:[93m5[0m:[93m6[0m - '_recursive_1' was also declared here.
    [7m5[0m type _recursive_1<T> = {
    [7m [0m [96m     ~~~~~~~~~~~~[0m

[96msecond/dist/index.d.ts[0m:[93m1[0m:[93m6[0m - [91merror[0m[90m TS2300: [0mDuplicate identifier '_recursive'.

[7m1[0m type _recursive = {
[7m [0m [91m     ~~~~~~~~~~[0m

  [96mfirst/dist/index.d.ts[0m:[93m1[0m:[93m6[0m - '_recursive' was also declared here.
    [7m1[0m type _recursive = {
    [7m [0m [96m     ~~~~~~~~~~[0m

[96msecond/dist/index.d.ts[0m:[93m5[0m:[93m6[0m - [91merror[0m[90m TS2300: [0mDuplicate identifier '_recursive_1'.

[7m5[0m type _recursive_1<T> = {
[7m [0m [91m     ~~~~~~~~~~~~[0m

  [96mfirst/dist/index.d.ts[0m:[93m5[0m:[93m6[0m - '_recursive_1' was also declared here.
    [7m5[0m type _recursive_1 = {
    [7m [0m [96m     ~~~~~~~~~~~~[0m

[96msecond/dist/index.d.ts[0m:[93m7[0m:[93m17[0m - [91merror[0m[90m TS2315: [0mType '_recursive_1' is not generic.

[7m7[0m     next: () => _recursive_1<T>;
[7m [0m [91m                ~~~~~~~~~~~~~~~[0m

[96msecond/dist/index.d.ts[0m:[93m14[0m:[93m33[0m - [91merror[0m[90m TS2315: [0mType '_recursive_1' is not generic.

[7m14[0m     static create<T>(value: T): _recursive_1<T>;
[7m  [0m [91m                                ~~~~~~~~~~~~~~~[0m


Found 8 errors in 3 files.

Errors  Files
     2  consumer/index.ts[90m:3[0m
     2  first/dist/index.d.ts[90m:1[0m
     4  second/dist/index.d.ts[90m:1[0m

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
{"version":"FakeTSVersion","root":[2],"fileNames":["lib.es2026.full.d.ts","../index.ts"],"fileInfos":[{"version":"8859c12c614ce56ba9a18e58384a198f-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ninterface SymbolConstructor {\n    (desc?: string | number): symbol;\n    for(name: string): symbol;\n    readonly toStringTag: symbol;\n}\ndeclare var Symbol: SymbolConstructor;\ninterface Symbol {\n    readonly [Symbol.toStringTag]: string;\n}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true,"impliedNodeFormat":1},{"version":"2ed9ea09308db619d5987fe87b218899-function makeA() {\n    return { value: 1, self() { return this; } };\n}\ntype makeReserved_recursive = \"reserved\";\nfunction makeReserved() {\n    return { value: true, self() { return this; } };\n}\nclass GlobalA {\n    static create<T>(value: T) {\n        const node = { value, next: () => node };\n        return node;\n    }\n    static \"a-b\"() {\n        const node = { value: true, next: () => node };\n        return node;\n    }\n}\n// comment-only edit\n","signature":"8e0bb33165b62f6b99d7cba0fcd92437-type _recursive = {\n    value: number;\n    self(): _recursive;\n};\ntype _recursive_1 = {\n    value: boolean;\n    self(): _recursive_1;\n};\ntype _recursive_2<T> = {\n    value: T;\n    next: () => _recursive_2<T>;\n};\ntype _recursive_3 = {\n    value: boolean;\n    next: () => _recursive_3;\n};\ndeclare function makeA(): {\n    value: number;\n    self(): _recursive;\n};\ntype makeReserved_recursive = \"reserved\";\ndeclare function makeReserved(): {\n    value: boolean;\n    self(): _recursive_1;\n};\ndeclare class GlobalA {\n    static create<T>(value: T): _recursive_2<T>;\n    static \"a-b\"(): _recursive_3;\n}\n","affectsGlobalScope":true,"impliedNodeFormat":1}],"options":{"composite":true,"outDir":"./","strict":true},"latestChangedDtsFile":"./index.d.ts"}
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
      "signature": "8e0bb33165b62f6b99d7cba0fcd92437-type _recursive = {\n    value: number;\n    self(): _recursive;\n};\ntype _recursive_1 = {\n    value: boolean;\n    self(): _recursive_1;\n};\ntype _recursive_2<T> = {\n    value: T;\n    next: () => _recursive_2<T>;\n};\ntype _recursive_3 = {\n    value: boolean;\n    next: () => _recursive_3;\n};\ndeclare function makeA(): {\n    value: number;\n    self(): _recursive;\n};\ntype makeReserved_recursive = \"reserved\";\ndeclare function makeReserved(): {\n    value: boolean;\n    self(): _recursive_1;\n};\ndeclare class GlobalA {\n    static create<T>(value: T): _recursive_2<T>;\n    static \"a-b\"(): _recursive_3;\n}\n",
      "affectsGlobalScope": true,
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "2ed9ea09308db619d5987fe87b218899-function makeA() {\n    return { value: 1, self() { return this; } };\n}\ntype makeReserved_recursive = \"reserved\";\nfunction makeReserved() {\n    return { value: true, self() { return this; } };\n}\nclass GlobalA {\n    static create<T>(value: T) {\n        const node = { value, next: () => node };\n        return node;\n    }\n    static \"a-b\"() {\n        const node = { value: true, next: () => node };\n        return node;\n    }\n}\n// comment-only edit\n",
        "signature": "8e0bb33165b62f6b99d7cba0fcd92437-type _recursive = {\n    value: number;\n    self(): _recursive;\n};\ntype _recursive_1 = {\n    value: boolean;\n    self(): _recursive_1;\n};\ntype _recursive_2<T> = {\n    value: T;\n    next: () => _recursive_2<T>;\n};\ntype _recursive_3 = {\n    value: boolean;\n    next: () => _recursive_3;\n};\ndeclare function makeA(): {\n    value: number;\n    self(): _recursive;\n};\ntype makeReserved_recursive = \"reserved\";\ndeclare function makeReserved(): {\n    value: boolean;\n    self(): _recursive_1;\n};\ndeclare class GlobalA {\n    static create<T>(value: T): _recursive_2<T>;\n    static \"a-b\"(): _recursive_3;\n}\n",
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
  "size": 2210
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
[96mconsumer/index.ts[0m:[93m3[0m:[93m7[0m - [91merror[0m[90m TS2322: [0mType 'number' is not assignable to type 'string'.

[7m3[0m const fromB: string = makeB().self().value;
[7m [0m [91m      ~~~~~[0m

[96mconsumer/index.ts[0m:[93m8[0m:[93m7[0m - [91merror[0m[90m TS2322: [0mType 'number' is not assignable to type 'string'.

[7m8[0m const invalidA: string = makeA().self().value;
[7m [0m [91m      ~~~~~~~~[0m

[96mfirst/dist/index.d.ts[0m:[93m1[0m:[93m6[0m - [91merror[0m[90m TS2300: [0mDuplicate identifier '_recursive'.

[7m1[0m type _recursive = {
[7m [0m [91m     ~~~~~~~~~~[0m

  [96msecond/dist/index.d.ts[0m:[93m1[0m:[93m6[0m - '_recursive' was also declared here.
    [7m1[0m type _recursive = {
    [7m [0m [96m     ~~~~~~~~~~[0m

[96mfirst/dist/index.d.ts[0m:[93m5[0m:[93m6[0m - [91merror[0m[90m TS2300: [0mDuplicate identifier '_recursive_1'.

[7m5[0m type _recursive_1 = {
[7m [0m [91m     ~~~~~~~~~~~~[0m

  [96msecond/dist/index.d.ts[0m:[93m5[0m:[93m6[0m - '_recursive_1' was also declared here.
    [7m5[0m type _recursive_1<T> = {
    [7m [0m [96m     ~~~~~~~~~~~~[0m

[96msecond/dist/index.d.ts[0m:[93m1[0m:[93m6[0m - [91merror[0m[90m TS2300: [0mDuplicate identifier '_recursive'.

[7m1[0m type _recursive = {
[7m [0m [91m     ~~~~~~~~~~[0m

  [96mfirst/dist/index.d.ts[0m:[93m1[0m:[93m6[0m - '_recursive' was also declared here.
    [7m1[0m type _recursive = {
    [7m [0m [96m     ~~~~~~~~~~[0m

[96msecond/dist/index.d.ts[0m:[93m5[0m:[93m6[0m - [91merror[0m[90m TS2300: [0mDuplicate identifier '_recursive_1'.

[7m5[0m type _recursive_1<T> = {
[7m [0m [91m     ~~~~~~~~~~~~[0m

  [96mfirst/dist/index.d.ts[0m:[93m5[0m:[93m6[0m - '_recursive_1' was also declared here.
    [7m5[0m type _recursive_1 = {
    [7m [0m [96m     ~~~~~~~~~~~~[0m

[96msecond/dist/index.d.ts[0m:[93m7[0m:[93m17[0m - [91merror[0m[90m TS2315: [0mType '_recursive_1' is not generic.

[7m7[0m     next: () => _recursive_1<T>;
[7m [0m [91m                ~~~~~~~~~~~~~~~[0m

[96msecond/dist/index.d.ts[0m:[93m14[0m:[93m33[0m - [91merror[0m[90m TS2315: [0mType '_recursive_1' is not generic.

[7m14[0m     static create<T>(value: T): _recursive_1<T>;
[7m  [0m [91m                                ~~~~~~~~~~~~~~~[0m


Found 8 errors in 3 files.

Errors  Files
     2  consumer/index.ts[90m:3[0m
     2  first/dist/index.d.ts[90m:1[0m
     4  second/dist/index.d.ts[90m:1[0m


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
[96mconsumer/index.ts[0m:[93m3[0m:[93m7[0m - [91merror[0m[90m TS2322: [0mType 'number' is not assignable to type 'string'.

[7m3[0m const fromB: string = makeB().self().value;
[7m [0m [91m      ~~~~~[0m

[96mconsumer/index.ts[0m:[93m8[0m:[93m7[0m - [91merror[0m[90m TS2322: [0mType 'number' is not assignable to type 'string'.

[7m8[0m const invalidA: string = makeA().self().value;
[7m [0m [91m      ~~~~~~~~[0m


Found 2 errors in the same file, starting at: consumer/index.ts[90m:3[0m

//// [/home/src/workspaces/project/consumer/tsconfig.tsbuildinfo] *modified* 
{"version":"FakeTSVersion","root":[[2,4]],"fileNames":["lib.es2026.full.d.ts","./index.ts","../first/dist/index.d.ts","../second/dist/index.d.ts"],"fileInfos":[{"version":"8859c12c614ce56ba9a18e58384a198f-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ninterface SymbolConstructor {\n    (desc?: string | number): symbol;\n    for(name: string): symbol;\n    readonly toStringTag: symbol;\n}\ndeclare var Symbol: SymbolConstructor;\ninterface Symbol {\n    readonly [Symbol.toStringTag]: string;\n}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true,"impliedNodeFormat":1},{"version":"c96c6feb8050748fb0780a02a020929d-export {};\nconst fromA: number = makeA().self().value;\nconst fromB: string = makeB().self().value;\nconst reserved: boolean = makeReserved().self().value;\nconst genericA: string = GlobalA.create(\"text\").next().value;\nconst genericB: number = GlobalB.create(1).next().value;\nconst quoted: boolean = GlobalA[\"a-b\"]().next().value;\nconst invalidA: string = makeA().self().value;\nconst invalidB: number = makeB().self().value;","signature":"abe7d9981d6018efb6b2b794f40a1607-export {};\n","impliedNodeFormat":1},{"version":"8e0bb33165b62f6b99d7cba0fcd92437-type _recursive = {\n    value: number;\n    self(): _recursive;\n};\ntype _recursive_1 = {\n    value: boolean;\n    self(): _recursive_1;\n};\ntype _recursive_2<T> = {\n    value: T;\n    next: () => _recursive_2<T>;\n};\ntype _recursive_3 = {\n    value: boolean;\n    next: () => _recursive_3;\n};\ndeclare function makeA(): {\n    value: number;\n    self(): _recursive;\n};\ntype makeReserved_recursive = \"reserved\";\ndeclare function makeReserved(): {\n    value: boolean;\n    self(): _recursive_1;\n};\ndeclare class GlobalA {\n    static create<T>(value: T): _recursive_2<T>;\n    static \"a-b\"(): _recursive_3;\n}\n","affectsGlobalScope":true,"impliedNodeFormat":1},{"version":"a512e7a77ff8aeb766338271452422ab-type _recursive = {\n    value: string;\n    self(): _recursive;\n};\ntype _recursive_1<T> = {\n    value: T;\n    next: () => _recursive_1<T>;\n};\ndeclare function makeB(): {\n    value: string;\n    self(): _recursive;\n};\ndeclare class GlobalB {\n    static create<T>(value: T): _recursive_1<T>;\n}\n","affectsGlobalScope":true,"impliedNodeFormat":1}],"options":{"composite":true,"skipLibCheck":true,"strict":true},"semanticDiagnosticsPerFile":[[2,[{"pos":61,"end":66,"code":2322,"category":1,"messageKey":"Type_0_is_not_assignable_to_type_1_2322","messageArgs":["number","string"]},{"pos":334,"end":342,"code":2322,"category":1,"messageKey":"Type_0_is_not_assignable_to_type_1_2322","messageArgs":["number","string"]}]]],"latestChangedDtsFile":"./index.d.ts"}
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
      "version": "8e0bb33165b62f6b99d7cba0fcd92437-type _recursive = {\n    value: number;\n    self(): _recursive;\n};\ntype _recursive_1 = {\n    value: boolean;\n    self(): _recursive_1;\n};\ntype _recursive_2<T> = {\n    value: T;\n    next: () => _recursive_2<T>;\n};\ntype _recursive_3 = {\n    value: boolean;\n    next: () => _recursive_3;\n};\ndeclare function makeA(): {\n    value: number;\n    self(): _recursive;\n};\ntype makeReserved_recursive = \"reserved\";\ndeclare function makeReserved(): {\n    value: boolean;\n    self(): _recursive_1;\n};\ndeclare class GlobalA {\n    static create<T>(value: T): _recursive_2<T>;\n    static \"a-b\"(): _recursive_3;\n}\n",
      "signature": "8e0bb33165b62f6b99d7cba0fcd92437-type _recursive = {\n    value: number;\n    self(): _recursive;\n};\ntype _recursive_1 = {\n    value: boolean;\n    self(): _recursive_1;\n};\ntype _recursive_2<T> = {\n    value: T;\n    next: () => _recursive_2<T>;\n};\ntype _recursive_3 = {\n    value: boolean;\n    next: () => _recursive_3;\n};\ndeclare function makeA(): {\n    value: number;\n    self(): _recursive;\n};\ntype makeReserved_recursive = \"reserved\";\ndeclare function makeReserved(): {\n    value: boolean;\n    self(): _recursive_1;\n};\ndeclare class GlobalA {\n    static create<T>(value: T): _recursive_2<T>;\n    static \"a-b\"(): _recursive_3;\n}\n",
      "affectsGlobalScope": true,
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "8e0bb33165b62f6b99d7cba0fcd92437-type _recursive = {\n    value: number;\n    self(): _recursive;\n};\ntype _recursive_1 = {\n    value: boolean;\n    self(): _recursive_1;\n};\ntype _recursive_2<T> = {\n    value: T;\n    next: () => _recursive_2<T>;\n};\ntype _recursive_3 = {\n    value: boolean;\n    next: () => _recursive_3;\n};\ndeclare function makeA(): {\n    value: number;\n    self(): _recursive;\n};\ntype makeReserved_recursive = \"reserved\";\ndeclare function makeReserved(): {\n    value: boolean;\n    self(): _recursive_1;\n};\ndeclare class GlobalA {\n    static create<T>(value: T): _recursive_2<T>;\n    static \"a-b\"(): _recursive_3;\n}\n",
        "affectsGlobalScope": true,
        "impliedNodeFormat": 1
      }
    },
    {
      "fileName": "../second/dist/index.d.ts",
      "version": "a512e7a77ff8aeb766338271452422ab-type _recursive = {\n    value: string;\n    self(): _recursive;\n};\ntype _recursive_1<T> = {\n    value: T;\n    next: () => _recursive_1<T>;\n};\ndeclare function makeB(): {\n    value: string;\n    self(): _recursive;\n};\ndeclare class GlobalB {\n    static create<T>(value: T): _recursive_1<T>;\n}\n",
      "signature": "a512e7a77ff8aeb766338271452422ab-type _recursive = {\n    value: string;\n    self(): _recursive;\n};\ntype _recursive_1<T> = {\n    value: T;\n    next: () => _recursive_1<T>;\n};\ndeclare function makeB(): {\n    value: string;\n    self(): _recursive;\n};\ndeclare class GlobalB {\n    static create<T>(value: T): _recursive_1<T>;\n}\n",
      "affectsGlobalScope": true,
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "a512e7a77ff8aeb766338271452422ab-type _recursive = {\n    value: string;\n    self(): _recursive;\n};\ntype _recursive_1<T> = {\n    value: T;\n    next: () => _recursive_1<T>;\n};\ndeclare function makeB(): {\n    value: string;\n    self(): _recursive;\n};\ndeclare class GlobalB {\n    static create<T>(value: T): _recursive_1<T>;\n}\n",
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
          "pos": 61,
          "end": 66,
          "code": 2322,
          "category": 1,
          "messageKey": "Type_0_is_not_assignable_to_type_1_2322",
          "messageArgs": [
            "number",
            "string"
          ]
        },
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
        }
      ]
    ]
  ],
  "latestChangedDtsFile": "./index.d.ts",
  "size": 3028
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
[96mconsumer/index.ts[0m:[93m3[0m:[93m7[0m - [91merror[0m[90m TS2322: [0mType 'number' is not assignable to type 'string'.

[7m3[0m const fromB: string = makeB().self().value;
[7m [0m [91m      ~~~~~[0m

[96mconsumer/index.ts[0m:[93m8[0m:[93m7[0m - [91merror[0m[90m TS2322: [0mType 'number' is not assignable to type 'string'.

[7m8[0m const invalidA: string = makeA().self().value;
[7m [0m [91m      ~~~~~~~~[0m


Found 2 errors in the same file, starting at: consumer/index.ts[90m:3[0m


consumer/tsconfig.json::
SemanticDiagnostics::
Signatures::
