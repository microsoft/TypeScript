currentDirectory::/home/src/workspaces/project
useCaseSensitiveFileNames::true
Input::
//// [/home/src/workspaces/project/a.ts] *new* 
declare const brand: unique symbol;
const state = { name: "", count: 0, [brand]: true };
export const api = {
    setField: <Tag extends string, K extends keyof typeof state>(key: K, value: (typeof state)[K], tag?: Tag): void => {
        state[key] = value;
        void tag;
    },
};
//// [/home/src/workspaces/project/b.ts] *new* 
import { api } from "./a";
export const merged = { ...api };
//// [/home/src/workspaces/project/tsconfig.json] *new* 
{
    "compilerOptions": {
        "strict": true,
        "incremental": true,
        "skipLibCheck": true,
        "skipDefaultLibCheck": true,
    },
}

tsgo 
ExitStatus:: Success
Output::
//// [/home/src/tslibs/TS/Lib/lib.es2025.full.d.ts] *Lib*
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
//// [/home/src/workspaces/project/a.js] *new* 
const state = { name: "", count: 0, [brand]: true };
export const api = {
    setField: (key, value, tag) => {
        state[key] = value;
        void tag;
    },
};

//// [/home/src/workspaces/project/b.js] *new* 
import { api } from "./a";
export const merged = { ...api };

//// [/home/src/workspaces/project/tsconfig.tsbuildinfo] *new* 
{"version":"FakeTSVersion","root":[[2,3]],"fileNames":["lib.es2025.full.d.ts","./a.ts","./b.ts"],"fileInfos":[{"version":"8859c12c614ce56ba9a18e58384a198f-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ninterface SymbolConstructor {\n    (desc?: string | number): symbol;\n    for(name: string): symbol;\n    readonly toStringTag: symbol;\n}\ndeclare var Symbol: SymbolConstructor;\ninterface Symbol {\n    readonly [Symbol.toStringTag]: string;\n}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true,"impliedNodeFormat":1},"639378dd59ee034bc0a35c6155f1f39d-declare const brand: unique symbol;\nconst state = { name: \"\", count: 0, [brand]: true };\nexport const api = {\n    setField: <Tag extends string, K extends keyof typeof state>(key: K, value: (typeof state)[K], tag?: Tag): void => {\n        state[key] = value;\n        void tag;\n    },\n};","de62ab78d5ba64a5b325bfebf0f2e8d3-import { api } from \"./a\";\nexport const merged = { ...api };"],"fileIdsList":[[2]],"options":{"skipLibCheck":true,"strict":true,"skipDefaultLibCheck":true},"referencedMap":[[3,1]]}
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
      "fileName": "./a.ts",
      "version": "639378dd59ee034bc0a35c6155f1f39d-declare const brand: unique symbol;\nconst state = { name: \"\", count: 0, [brand]: true };\nexport const api = {\n    setField: <Tag extends string, K extends keyof typeof state>(key: K, value: (typeof state)[K], tag?: Tag): void => {\n        state[key] = value;\n        void tag;\n    },\n};",
      "signature": "639378dd59ee034bc0a35c6155f1f39d-declare const brand: unique symbol;\nconst state = { name: \"\", count: 0, [brand]: true };\nexport const api = {\n    setField: <Tag extends string, K extends keyof typeof state>(key: K, value: (typeof state)[K], tag?: Tag): void => {\n        state[key] = value;\n        void tag;\n    },\n};",
      "impliedNodeFormat": "CommonJS"
    },
    {
      "fileName": "./b.ts",
      "version": "de62ab78d5ba64a5b325bfebf0f2e8d3-import { api } from \"./a\";\nexport const merged = { ...api };",
      "signature": "de62ab78d5ba64a5b325bfebf0f2e8d3-import { api } from \"./a\";\nexport const merged = { ...api };",
      "impliedNodeFormat": "CommonJS"
    }
  ],
  "fileIdsList": [
    [
      "./a.ts"
    ]
  ],
  "options": {
    "skipLibCheck": true,
    "strict": true,
    "skipDefaultLibCheck": true
  },
  "referencedMap": {
    "./b.ts": [
      "./a.ts"
    ]
  },
  "size": 1428
}

tsconfig.json::
SemanticDiagnostics::
*refresh*    /home/src/tslibs/TS/Lib/lib.es2025.full.d.ts
*refresh*    /home/src/workspaces/project/a.ts
*refresh*    /home/src/workspaces/project/b.ts
Signatures::


Edit [0]:: modify b.ts
//// [/home/src/workspaces/project/b.ts] *modified* 
import { api } from "./a";
export const merged = { ...api };
export const touched = 1;

tsgo 
ExitStatus:: Success
Output::
//// [/home/src/workspaces/project/b.js] *modified* 
import { api } from "./a";
export const merged = { ...api };
export const touched = 1;

//// [/home/src/workspaces/project/tsconfig.tsbuildinfo] *modified* 
{"version":"FakeTSVersion","root":[[2,3]],"fileNames":["lib.es2025.full.d.ts","./a.ts","./b.ts"],"fileInfos":[{"version":"8859c12c614ce56ba9a18e58384a198f-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ninterface SymbolConstructor {\n    (desc?: string | number): symbol;\n    for(name: string): symbol;\n    readonly toStringTag: symbol;\n}\ndeclare var Symbol: SymbolConstructor;\ninterface Symbol {\n    readonly [Symbol.toStringTag]: string;\n}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true,"impliedNodeFormat":1},"639378dd59ee034bc0a35c6155f1f39d-declare const brand: unique symbol;\nconst state = { name: \"\", count: 0, [brand]: true };\nexport const api = {\n    setField: <Tag extends string, K extends keyof typeof state>(key: K, value: (typeof state)[K], tag?: Tag): void => {\n        state[key] = value;\n        void tag;\n    },\n};",{"version":"6fa50051a3b923ced64e589b1e168966-import { api } from \"./a\";\nexport const merged = { ...api };\nexport const touched = 1;","signature":"dc61af78c711b5b05731ae4cbc47c2ca-export declare const merged: {\n    setField: <Tag extends string, K extends \"count\" | \"name\" | unique symbol>(key: K, value: ({\n        name: string;\n        count: number;\n        [brand]: boolean;\n    })[K], tag?: Tag) => void;\n};\nexport declare const touched = 1;\n\n(40,6): error2527: The_inferred_type_of_0_references_an_inaccessible_1_type_A_type_annotation_is_necessary_2527\nmerged\nunique symbol\n\n(40,6): error4023: Exported_variable_0_has_or_is_using_name_1_from_external_module_2_but_cannot_be_named_4023\nmerged\nbrand\n\"/home/src/workspaces/project/a\"\n","impliedNodeFormat":1}],"fileIdsList":[[2]],"options":{"skipLibCheck":true,"strict":true,"skipDefaultLibCheck":true},"referencedMap":[[3,1]]}
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
      "fileName": "./a.ts",
      "version": "639378dd59ee034bc0a35c6155f1f39d-declare const brand: unique symbol;\nconst state = { name: \"\", count: 0, [brand]: true };\nexport const api = {\n    setField: <Tag extends string, K extends keyof typeof state>(key: K, value: (typeof state)[K], tag?: Tag): void => {\n        state[key] = value;\n        void tag;\n    },\n};",
      "signature": "639378dd59ee034bc0a35c6155f1f39d-declare const brand: unique symbol;\nconst state = { name: \"\", count: 0, [brand]: true };\nexport const api = {\n    setField: <Tag extends string, K extends keyof typeof state>(key: K, value: (typeof state)[K], tag?: Tag): void => {\n        state[key] = value;\n        void tag;\n    },\n};",
      "impliedNodeFormat": "CommonJS"
    },
    {
      "fileName": "./b.ts",
      "version": "6fa50051a3b923ced64e589b1e168966-import { api } from \"./a\";\nexport const merged = { ...api };\nexport const touched = 1;",
      "signature": "dc61af78c711b5b05731ae4cbc47c2ca-export declare const merged: {\n    setField: <Tag extends string, K extends \"count\" | \"name\" | unique symbol>(key: K, value: ({\n        name: string;\n        count: number;\n        [brand]: boolean;\n    })[K], tag?: Tag) => void;\n};\nexport declare const touched = 1;\n\n(40,6): error2527: The_inferred_type_of_0_references_an_inaccessible_1_type_A_type_annotation_is_necessary_2527\nmerged\nunique symbol\n\n(40,6): error4023: Exported_variable_0_has_or_is_using_name_1_from_external_module_2_but_cannot_be_named_4023\nmerged\nbrand\n\"/home/src/workspaces/project/a\"\n",
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "6fa50051a3b923ced64e589b1e168966-import { api } from \"./a\";\nexport const merged = { ...api };\nexport const touched = 1;",
        "signature": "dc61af78c711b5b05731ae4cbc47c2ca-export declare const merged: {\n    setField: <Tag extends string, K extends \"count\" | \"name\" | unique symbol>(key: K, value: ({\n        name: string;\n        count: number;\n        [brand]: boolean;\n    })[K], tag?: Tag) => void;\n};\nexport declare const touched = 1;\n\n(40,6): error2527: The_inferred_type_of_0_references_an_inaccessible_1_type_A_type_annotation_is_necessary_2527\nmerged\nunique symbol\n\n(40,6): error4023: Exported_variable_0_has_or_is_using_name_1_from_external_module_2_but_cannot_be_named_4023\nmerged\nbrand\n\"/home/src/workspaces/project/a\"\n",
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
    "skipLibCheck": true,
    "strict": true,
    "skipDefaultLibCheck": true
  },
  "referencedMap": {
    "./b.ts": [
      "./a.ts"
    ]
  },
  "size": 2118
}

tsconfig.json::
SemanticDiagnostics::
*refresh*    /home/src/workspaces/project/b.ts
Signatures::
(computed .d.ts) /home/src/workspaces/project/b.ts
