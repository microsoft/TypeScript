currentDirectory::/home/src/workspaces/project
useCaseSensitiveFileNames::true
Input::
//// [/home/src/workspaces/project/consumer/index.ts] *new* 
import { indexed, deep, named } from "../producer/dist/index.js";
const a: string = indexed["name"];
const b: string = deep.a.b.c.d;
const c: string = named.node.leaf;
type IsAny<T> = 0 extends (1 & T) ? true : false;
const notAny: false = null as unknown as
    IsAny<typeof indexed[string] | typeof deep.a.b.c.d | typeof named.node.leaf>;
const invalidIndex: number = indexed["name"];
const invalidDeep: number = deep.a.b.c.d;
const invalidNamed: number = named.node.leaf;
//// [/home/src/workspaces/project/consumer/tsconfig.json] *new* 
{
					"compilerOptions": { "strict": true, "noEmit": true },
					"references": [{ "path": "../producer" }]
				}
//// [/home/src/workspaces/project/producer/index.ts] *new* 
declare function unwrap<T>(input: { [K in keyof T]: { value: T[K] } }): T;
declare const indexedInput: { [key: string]: { value: string } };
export const indexed = unwrap(indexedInput);
type Validator<T> = ((input: unknown) => T | undefined) | {
    [K in keyof T]: Validator<T[K]>;
};
declare function decode<T>(input: { [K in keyof T]: Validator<T[K]> }): T;
declare const stringValidator: (input: unknown) => string | undefined;
export const deep = decode({ a: { b: { c: { d: stringValidator } } } });
interface NamedInput { leaf: typeof stringValidator }
declare const namedInput: { node: NamedInput };
export const named = decode(namedInput);
//// [/home/src/workspaces/project/producer/tsconfig.json] *new* 
{
					"compilerOptions": { "strict": true, "composite": true, "outDir": "dist" }
				}

tsgo --build consumer
ExitStatus:: DiagnosticsPresent_OutputsGenerated
Output::
[96mconsumer/index.ts[0m:[93m6[0m:[93m7[0m - [91merror[0m[90m TS2322: [0mType 'true' is not assignable to type 'false'.

[7m6[0m const notAny: false = null as unknown as
[7m [0m [91m      ~~~~~~[0m


Found 1 error in consumer/index.ts[90m:6[0m

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
export declare const indexed: {
    [x: string]: /*elided*/ any;
};
export declare const deep: {
    a: {
        b: {
            c: {
                d: /*elided*/ any;
            };
        };
    };
};
export declare const named: {
    node: {
        leaf: /*elided*/ any;
    };
};

//// [/home/src/workspaces/project/producer/dist/index.js] *new* 
export const indexed = unwrap(indexedInput);
export const deep = decode({ a: { b: { c: { d: stringValidator } } } });
export const named = decode(namedInput);

//// [/home/src/workspaces/project/producer/dist/tsconfig.tsbuildinfo] *new* 
{"version":"FakeTSVersion","root":[2],"fileNames":["lib.es2025.full.d.ts","../index.ts"],"fileInfos":[{"version":"8859c12c614ce56ba9a18e58384a198f-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ninterface SymbolConstructor {\n    (desc?: string | number): symbol;\n    for(name: string): symbol;\n    readonly toStringTag: symbol;\n}\ndeclare var Symbol: SymbolConstructor;\ninterface Symbol {\n    readonly [Symbol.toStringTag]: string;\n}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true,"impliedNodeFormat":1},{"version":"6f4074b2f28fc7614cd7f712938fd82f-declare function unwrap<T>(input: { [K in keyof T]: { value: T[K] } }): T;\ndeclare const indexedInput: { [key: string]: { value: string } };\nexport const indexed = unwrap(indexedInput);\ntype Validator<T> = ((input: unknown) => T | undefined) | {\n    [K in keyof T]: Validator<T[K]>;\n};\ndeclare function decode<T>(input: { [K in keyof T]: Validator<T[K]> }): T;\ndeclare const stringValidator: (input: unknown) => string | undefined;\nexport const deep = decode({ a: { b: { c: { d: stringValidator } } } });\ninterface NamedInput { leaf: typeof stringValidator }\ndeclare const namedInput: { node: NamedInput };\nexport const named = decode(namedInput);","signature":"0f56ecd87ba219172866ed99af7058f5-export declare const indexed: {\n    [x: string]: /*elided*/ any;\n};\nexport declare const deep: {\n    a: {\n        b: {\n            c: {\n                d: /*elided*/ any;\n            };\n        };\n    };\n};\nexport declare const named: {\n    node: {\n        leaf: /*elided*/ any;\n    };\n};\n","impliedNodeFormat":1}],"options":{"composite":true,"outDir":"./","strict":true},"latestChangedDtsFile":"./index.d.ts"}
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
    "lib.es2025.full.d.ts",
    "../index.ts"
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
      "fileName": "../index.ts",
      "version": "6f4074b2f28fc7614cd7f712938fd82f-declare function unwrap<T>(input: { [K in keyof T]: { value: T[K] } }): T;\ndeclare const indexedInput: { [key: string]: { value: string } };\nexport const indexed = unwrap(indexedInput);\ntype Validator<T> = ((input: unknown) => T | undefined) | {\n    [K in keyof T]: Validator<T[K]>;\n};\ndeclare function decode<T>(input: { [K in keyof T]: Validator<T[K]> }): T;\ndeclare const stringValidator: (input: unknown) => string | undefined;\nexport const deep = decode({ a: { b: { c: { d: stringValidator } } } });\ninterface NamedInput { leaf: typeof stringValidator }\ndeclare const namedInput: { node: NamedInput };\nexport const named = decode(namedInput);",
      "signature": "0f56ecd87ba219172866ed99af7058f5-export declare const indexed: {\n    [x: string]: /*elided*/ any;\n};\nexport declare const deep: {\n    a: {\n        b: {\n            c: {\n                d: /*elided*/ any;\n            };\n        };\n    };\n};\nexport declare const named: {\n    node: {\n        leaf: /*elided*/ any;\n    };\n};\n",
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "6f4074b2f28fc7614cd7f712938fd82f-declare function unwrap<T>(input: { [K in keyof T]: { value: T[K] } }): T;\ndeclare const indexedInput: { [key: string]: { value: string } };\nexport const indexed = unwrap(indexedInput);\ntype Validator<T> = ((input: unknown) => T | undefined) | {\n    [K in keyof T]: Validator<T[K]>;\n};\ndeclare function decode<T>(input: { [K in keyof T]: Validator<T[K]> }): T;\ndeclare const stringValidator: (input: unknown) => string | undefined;\nexport const deep = decode({ a: { b: { c: { d: stringValidator } } } });\ninterface NamedInput { leaf: typeof stringValidator }\ndeclare const namedInput: { node: NamedInput };\nexport const named = decode(namedInput);",
        "signature": "0f56ecd87ba219172866ed99af7058f5-export declare const indexed: {\n    [x: string]: /*elided*/ any;\n};\nexport declare const deep: {\n    a: {\n        b: {\n            c: {\n                d: /*elided*/ any;\n            };\n        };\n    };\n};\nexport declare const named: {\n    node: {\n        leaf: /*elided*/ any;\n    };\n};\n",
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
  "size": 2050
}

producer/tsconfig.json::
SemanticDiagnostics::
*refresh*    /home/src/tslibs/TS/Lib/lib.es2025.full.d.ts
*refresh*    /home/src/workspaces/project/producer/index.ts
Signatures::
(stored at emit) /home/src/workspaces/project/producer/index.ts

consumer/tsconfig.json::
SemanticDiagnostics::
*refresh*    /home/src/tslibs/TS/Lib/lib.es2025.full.d.ts
*refresh*    /home/src/workspaces/project/producer/dist/index.d.ts
*refresh*    /home/src/workspaces/project/consumer/index.ts
Signatures::


Edit [0]:: no change

tsgo --build consumer
ExitStatus:: DiagnosticsPresent_OutputsGenerated
Output::
[96mconsumer/index.ts[0m:[93m6[0m:[93m7[0m - [91merror[0m[90m TS2322: [0mType 'true' is not assignable to type 'false'.

[7m6[0m const notAny: false = null as unknown as
[7m [0m [91m      ~~~~~~[0m


Found 1 error in consumer/index.ts[90m:6[0m

//// [/home/src/workspaces/project/consumer/tsconfig.tsbuildinfo] *rewrite with same content*
//// [/home/src/workspaces/project/consumer/tsconfig.tsbuildinfo.readable.baseline.txt] *rewrite with same content*

consumer/tsconfig.json::
SemanticDiagnostics::
*refresh*    /home/src/tslibs/TS/Lib/lib.es2025.full.d.ts
*refresh*    /home/src/workspaces/project/producer/dist/index.d.ts
*refresh*    /home/src/workspaces/project/consumer/index.ts
Signatures::


Edit [1]:: add a comment to the producer
//// [/home/src/workspaces/project/producer/index.ts] *modified* 
declare function unwrap<T>(input: { [K in keyof T]: { value: T[K] } }): T;
declare const indexedInput: { [key: string]: { value: string } };
export const indexed = unwrap(indexedInput);
type Validator<T> = ((input: unknown) => T | undefined) | {
    [K in keyof T]: Validator<T[K]>;
};
declare function decode<T>(input: { [K in keyof T]: Validator<T[K]> }): T;
declare const stringValidator: (input: unknown) => string | undefined;
export const deep = decode({ a: { b: { c: { d: stringValidator } } } });
interface NamedInput { leaf: typeof stringValidator }
declare const namedInput: { node: NamedInput };
export const named = decode(namedInput);
// comment-only edit


tsgo --build consumer
ExitStatus:: DiagnosticsPresent_OutputsGenerated
Output::
[96mconsumer/index.ts[0m:[93m6[0m:[93m7[0m - [91merror[0m[90m TS2322: [0mType 'true' is not assignable to type 'false'.

[7m6[0m const notAny: false = null as unknown as
[7m [0m [91m      ~~~~~~[0m


Found 1 error in consumer/index.ts[90m:6[0m

//// [/home/src/workspaces/project/consumer/tsconfig.tsbuildinfo] *rewrite with same content*
//// [/home/src/workspaces/project/consumer/tsconfig.tsbuildinfo.readable.baseline.txt] *rewrite with same content*
//// [/home/src/workspaces/project/producer/dist/index.js] *modified* 
export const indexed = unwrap(indexedInput);
export const deep = decode({ a: { b: { c: { d: stringValidator } } } });
export const named = decode(namedInput);
// comment-only edit

//// [/home/src/workspaces/project/producer/dist/tsconfig.tsbuildinfo] *modified* 
{"version":"FakeTSVersion","root":[2],"fileNames":["lib.es2025.full.d.ts","../index.ts"],"fileInfos":[{"version":"8859c12c614ce56ba9a18e58384a198f-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ninterface SymbolConstructor {\n    (desc?: string | number): symbol;\n    for(name: string): symbol;\n    readonly toStringTag: symbol;\n}\ndeclare var Symbol: SymbolConstructor;\ninterface Symbol {\n    readonly [Symbol.toStringTag]: string;\n}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true,"impliedNodeFormat":1},{"version":"7b3972037d74f8acb94c246976ef7ffa-declare function unwrap<T>(input: { [K in keyof T]: { value: T[K] } }): T;\ndeclare const indexedInput: { [key: string]: { value: string } };\nexport const indexed = unwrap(indexedInput);\ntype Validator<T> = ((input: unknown) => T | undefined) | {\n    [K in keyof T]: Validator<T[K]>;\n};\ndeclare function decode<T>(input: { [K in keyof T]: Validator<T[K]> }): T;\ndeclare const stringValidator: (input: unknown) => string | undefined;\nexport const deep = decode({ a: { b: { c: { d: stringValidator } } } });\ninterface NamedInput { leaf: typeof stringValidator }\ndeclare const namedInput: { node: NamedInput };\nexport const named = decode(namedInput);\n// comment-only edit\n","signature":"0f56ecd87ba219172866ed99af7058f5-export declare const indexed: {\n    [x: string]: /*elided*/ any;\n};\nexport declare const deep: {\n    a: {\n        b: {\n            c: {\n                d: /*elided*/ any;\n            };\n        };\n    };\n};\nexport declare const named: {\n    node: {\n        leaf: /*elided*/ any;\n    };\n};\n","impliedNodeFormat":1}],"options":{"composite":true,"outDir":"./","strict":true},"latestChangedDtsFile":"./index.d.ts"}
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
    "lib.es2025.full.d.ts",
    "../index.ts"
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
      "fileName": "../index.ts",
      "version": "7b3972037d74f8acb94c246976ef7ffa-declare function unwrap<T>(input: { [K in keyof T]: { value: T[K] } }): T;\ndeclare const indexedInput: { [key: string]: { value: string } };\nexport const indexed = unwrap(indexedInput);\ntype Validator<T> = ((input: unknown) => T | undefined) | {\n    [K in keyof T]: Validator<T[K]>;\n};\ndeclare function decode<T>(input: { [K in keyof T]: Validator<T[K]> }): T;\ndeclare const stringValidator: (input: unknown) => string | undefined;\nexport const deep = decode({ a: { b: { c: { d: stringValidator } } } });\ninterface NamedInput { leaf: typeof stringValidator }\ndeclare const namedInput: { node: NamedInput };\nexport const named = decode(namedInput);\n// comment-only edit\n",
      "signature": "0f56ecd87ba219172866ed99af7058f5-export declare const indexed: {\n    [x: string]: /*elided*/ any;\n};\nexport declare const deep: {\n    a: {\n        b: {\n            c: {\n                d: /*elided*/ any;\n            };\n        };\n    };\n};\nexport declare const named: {\n    node: {\n        leaf: /*elided*/ any;\n    };\n};\n",
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "7b3972037d74f8acb94c246976ef7ffa-declare function unwrap<T>(input: { [K in keyof T]: { value: T[K] } }): T;\ndeclare const indexedInput: { [key: string]: { value: string } };\nexport const indexed = unwrap(indexedInput);\ntype Validator<T> = ((input: unknown) => T | undefined) | {\n    [K in keyof T]: Validator<T[K]>;\n};\ndeclare function decode<T>(input: { [K in keyof T]: Validator<T[K]> }): T;\ndeclare const stringValidator: (input: unknown) => string | undefined;\nexport const deep = decode({ a: { b: { c: { d: stringValidator } } } });\ninterface NamedInput { leaf: typeof stringValidator }\ndeclare const namedInput: { node: NamedInput };\nexport const named = decode(namedInput);\n// comment-only edit\n",
        "signature": "0f56ecd87ba219172866ed99af7058f5-export declare const indexed: {\n    [x: string]: /*elided*/ any;\n};\nexport declare const deep: {\n    a: {\n        b: {\n            c: {\n                d: /*elided*/ any;\n            };\n        };\n    };\n};\nexport declare const named: {\n    node: {\n        leaf: /*elided*/ any;\n    };\n};\n",
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
  "size": 2074
}

producer/tsconfig.json::
SemanticDiagnostics::
*refresh*    /home/src/workspaces/project/producer/index.ts
Signatures::
(computed .d.ts) /home/src/workspaces/project/producer/index.ts

consumer/tsconfig.json::
SemanticDiagnostics::
*refresh*    /home/src/tslibs/TS/Lib/lib.es2025.full.d.ts
*refresh*    /home/src/workspaces/project/producer/dist/index.d.ts
*refresh*    /home/src/workspaces/project/consumer/index.ts
Signatures::


Edit [2]:: no change

tsgo --build consumer
ExitStatus:: DiagnosticsPresent_OutputsGenerated
Output::
[96mconsumer/index.ts[0m:[93m6[0m:[93m7[0m - [91merror[0m[90m TS2322: [0mType 'true' is not assignable to type 'false'.

[7m6[0m const notAny: false = null as unknown as
[7m [0m [91m      ~~~~~~[0m


Found 1 error in consumer/index.ts[90m:6[0m

//// [/home/src/workspaces/project/consumer/tsconfig.tsbuildinfo] *rewrite with same content*
//// [/home/src/workspaces/project/consumer/tsconfig.tsbuildinfo.readable.baseline.txt] *rewrite with same content*

consumer/tsconfig.json::
SemanticDiagnostics::
*refresh*    /home/src/tslibs/TS/Lib/lib.es2025.full.d.ts
*refresh*    /home/src/workspaces/project/producer/dist/index.d.ts
*refresh*    /home/src/workspaces/project/consumer/index.ts
Signatures::
