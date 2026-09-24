currentDirectory::/home/src/workspaces/project
useCaseSensitiveFileNames::true
Input::
//// [/home/src/workspaces/project/consumer/index.ts] *new* 
import { arrow, expression, first, generic } from "../producer/dist/index.js";
const a: typeof arrow = arrow()()();
const b: typeof expression = expression()()();
const c: typeof first = first()()();
const d: typeof generic = generic(1)("text")(true);
type IsAny<T> = 0 extends (1 & T) ? true : false;
const result = arrow()()();
const notAny: false = null as unknown as IsAny<typeof result>;
const invalid: number = arrow()()();
const invalidExpression: number = expression()()();
//// [/home/src/workspaces/project/consumer/tsconfig.json] *new* 
{
					"compilerOptions": { "strict": true, "noEmit": true },
					"references": [{ "path": "../producer" }]
				}
//// [/home/src/workspaces/project/producer/index.ts] *new* 
export const arrow = () => arrow;
export const expression = function self() { return self; };
export const first = () => second;
export const second = () => first;
export const generic = <T>(value: T) => generic;
//// [/home/src/workspaces/project/producer/tsconfig.json] *new* 
{
					"compilerOptions": { "strict": true, "composite": true, "outDir": "dist" }
				}

tsgo --build consumer
ExitStatus:: DiagnosticsPresent_OutputsGenerated
Output::
[96mproducer/index.ts[0m:[93m1[0m:[93m14[0m - [91merror[0m[90m TS5088: [0mThe inferred type of 'arrow' references a type with a cyclic structure which cannot be trivially serialized. A type annotation is necessary.

[7m1[0m export const arrow = () => arrow;
[7m [0m [91m             ~~~~~[0m

[96mproducer/index.ts[0m:[93m2[0m:[93m14[0m - [91merror[0m[90m TS5088: [0mThe inferred type of 'expression' references a type with a cyclic structure which cannot be trivially serialized. A type annotation is necessary.

[7m2[0m export const expression = function self() { return self; };
[7m [0m [91m             ~~~~~~~~~~[0m

[96mconsumer/index.ts[0m:[93m1[0m:[93m51[0m - [91merror[0m[90m TS7016: [0mCould not find a declaration file for module '../producer/dist/index.js'. '/home/src/workspaces/project/producer/dist/index.js' implicitly has an 'any' type.

[7m1[0m import { arrow, expression, first, generic } from "../producer/dist/index.js";
[7m [0m [91m                                                  ~~~~~~~~~~~~~~~~~~~~~~~~~~~[0m


Found 3 errors in 2 files.

Errors  Files
     1  consumer/index.ts[90m:1[0m
     2  producer/index.ts[90m:1[0m

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
//// [/home/src/workspaces/project/producer/dist/index.js] *new* 
export const arrow = () => arrow;
export const expression = function self() { return self; };
export const first = () => second;
export const second = () => first;
export const generic = (value) => generic;

//// [/home/src/workspaces/project/producer/dist/tsconfig.tsbuildinfo] *new* 
{"version":"FakeTSVersion","root":[2],"fileNames":["lib.es2025.full.d.ts","../index.ts"],"fileInfos":[{"version":"8859c12c614ce56ba9a18e58384a198f-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ninterface SymbolConstructor {\n    (desc?: string | number): symbol;\n    for(name: string): symbol;\n    readonly toStringTag: symbol;\n}\ndeclare var Symbol: SymbolConstructor;\ninterface Symbol {\n    readonly [Symbol.toStringTag]: string;\n}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true,"impliedNodeFormat":1},"9088ac80180a8a97094330bdf300e155-export const arrow = () => arrow;\nexport const expression = function self() { return self; };\nexport const first = () => second;\nexport const second = () => first;\nexport const generic = <T>(value: T) => generic;"],"options":{"composite":true,"outDir":"./","strict":true},"emitDiagnosticsPerFile":[[2,[{"pos":13,"end":18,"code":5088,"category":1,"messageKey":"The_inferred_type_of_0_references_a_type_with_a_cyclic_structure_which_cannot_be_trivially_serialize_5088","messageArgs":["arrow"]},{"pos":47,"end":57,"code":5088,"category":1,"messageKey":"The_inferred_type_of_0_references_a_type_with_a_cyclic_structure_which_cannot_be_trivially_serialize_5088","messageArgs":["expression"]}]]],"emitSignatures":[2]}
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
      "version": "9088ac80180a8a97094330bdf300e155-export const arrow = () => arrow;\nexport const expression = function self() { return self; };\nexport const first = () => second;\nexport const second = () => first;\nexport const generic = <T>(value: T) => generic;",
      "signature": "9088ac80180a8a97094330bdf300e155-export const arrow = () => arrow;\nexport const expression = function self() { return self; };\nexport const first = () => second;\nexport const second = () => first;\nexport const generic = <T>(value: T) => generic;",
      "impliedNodeFormat": "CommonJS"
    }
  ],
  "options": {
    "composite": true,
    "outDir": "./",
    "strict": true
  },
  "emitDiagnosticsPerFile": [
    [
      "../index.ts",
      [
        {
          "pos": 13,
          "end": 18,
          "code": 5088,
          "category": 1,
          "messageKey": "The_inferred_type_of_0_references_a_type_with_a_cyclic_structure_which_cannot_be_trivially_serialize_5088",
          "messageArgs": [
            "arrow"
          ]
        },
        {
          "pos": 47,
          "end": 57,
          "code": 5088,
          "category": 1,
          "messageKey": "The_inferred_type_of_0_references_a_type_with_a_cyclic_structure_which_cannot_be_trivially_serialize_5088",
          "messageArgs": [
            "expression"
          ]
        }
      ]
    ]
  ],
  "emitSignatures": [
    {
      "file": "../index.ts",
      "original": 2
    }
  ],
  "size": 1621
}

producer/tsconfig.json::
SemanticDiagnostics::
*refresh*    /home/src/tslibs/TS/Lib/lib.es2025.full.d.ts
*refresh*    /home/src/workspaces/project/producer/index.ts
Signatures::

consumer/tsconfig.json::
SemanticDiagnostics::
*refresh*    /home/src/tslibs/TS/Lib/lib.es2025.full.d.ts
*refresh*    /home/src/workspaces/project/consumer/index.ts
Signatures::


Edit [0]:: no change

tsgo --build consumer
ExitStatus:: DiagnosticsPresent_OutputsGenerated
Output::
[96mproducer/index.ts[0m:[93m1[0m:[93m14[0m - [91merror[0m[90m TS5088: [0mThe inferred type of 'arrow' references a type with a cyclic structure which cannot be trivially serialized. A type annotation is necessary.

[7m1[0m export const arrow = () => arrow;
[7m [0m [91m             ~~~~~[0m

[96mproducer/index.ts[0m:[93m2[0m:[93m14[0m - [91merror[0m[90m TS5088: [0mThe inferred type of 'expression' references a type with a cyclic structure which cannot be trivially serialized. A type annotation is necessary.

[7m2[0m export const expression = function self() { return self; };
[7m [0m [91m             ~~~~~~~~~~[0m

[96mconsumer/index.ts[0m:[93m1[0m:[93m51[0m - [91merror[0m[90m TS7016: [0mCould not find a declaration file for module '../producer/dist/index.js'. '/home/src/workspaces/project/producer/dist/index.js' implicitly has an 'any' type.

[7m1[0m import { arrow, expression, first, generic } from "../producer/dist/index.js";
[7m [0m [91m                                                  ~~~~~~~~~~~~~~~~~~~~~~~~~~~[0m


Found 3 errors in 2 files.

Errors  Files
     1  consumer/index.ts[90m:1[0m
     2  producer/index.ts[90m:1[0m

//// [/home/src/workspaces/project/consumer/tsconfig.tsbuildinfo] *rewrite with same content*
//// [/home/src/workspaces/project/consumer/tsconfig.tsbuildinfo.readable.baseline.txt] *rewrite with same content*

producer/tsconfig.json::
SemanticDiagnostics::
Signatures::

consumer/tsconfig.json::
SemanticDiagnostics::
*refresh*    /home/src/tslibs/TS/Lib/lib.es2025.full.d.ts
*refresh*    /home/src/workspaces/project/consumer/index.ts
Signatures::


Edit [1]:: add a comment to the producer
//// [/home/src/workspaces/project/producer/index.ts] *modified* 
export const arrow = () => arrow;
export const expression = function self() { return self; };
export const first = () => second;
export const second = () => first;
export const generic = <T>(value: T) => generic;
// comment-only edit


tsgo --build consumer
ExitStatus:: DiagnosticsPresent_OutputsGenerated
Output::
[96mproducer/index.ts[0m:[93m1[0m:[93m14[0m - [91merror[0m[90m TS5088: [0mThe inferred type of 'arrow' references a type with a cyclic structure which cannot be trivially serialized. A type annotation is necessary.

[7m1[0m export const arrow = () => arrow;
[7m [0m [91m             ~~~~~[0m

[96mproducer/index.ts[0m:[93m2[0m:[93m14[0m - [91merror[0m[90m TS5088: [0mThe inferred type of 'expression' references a type with a cyclic structure which cannot be trivially serialized. A type annotation is necessary.

[7m2[0m export const expression = function self() { return self; };
[7m [0m [91m             ~~~~~~~~~~[0m

[96mconsumer/index.ts[0m:[93m1[0m:[93m51[0m - [91merror[0m[90m TS7016: [0mCould not find a declaration file for module '../producer/dist/index.js'. '/home/src/workspaces/project/producer/dist/index.js' implicitly has an 'any' type.

[7m1[0m import { arrow, expression, first, generic } from "../producer/dist/index.js";
[7m [0m [91m                                                  ~~~~~~~~~~~~~~~~~~~~~~~~~~~[0m


Found 3 errors in 2 files.

Errors  Files
     1  consumer/index.ts[90m:1[0m
     2  producer/index.ts[90m:1[0m

//// [/home/src/workspaces/project/consumer/tsconfig.tsbuildinfo] *rewrite with same content*
//// [/home/src/workspaces/project/consumer/tsconfig.tsbuildinfo.readable.baseline.txt] *rewrite with same content*
//// [/home/src/workspaces/project/producer/dist/index.js] *modified* 
export const arrow = () => arrow;
export const expression = function self() { return self; };
export const first = () => second;
export const second = () => first;
export const generic = (value) => generic;
// comment-only edit

//// [/home/src/workspaces/project/producer/dist/tsconfig.tsbuildinfo] *modified* 
{"version":"FakeTSVersion","root":[2],"fileNames":["lib.es2025.full.d.ts","../index.ts"],"fileInfos":[{"version":"8859c12c614ce56ba9a18e58384a198f-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ninterface SymbolConstructor {\n    (desc?: string | number): symbol;\n    for(name: string): symbol;\n    readonly toStringTag: symbol;\n}\ndeclare var Symbol: SymbolConstructor;\ninterface Symbol {\n    readonly [Symbol.toStringTag]: string;\n}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true,"impliedNodeFormat":1},{"version":"1518eacddeda8b529b863685f5a73bfd-export const arrow = () => arrow;\nexport const expression = function self() { return self; };\nexport const first = () => second;\nexport const second = () => first;\nexport const generic = <T>(value: T) => generic;\n// comment-only edit\n","signature":"896b5743ff145bae90bb9dfdf6c31a4e-export declare const arrow: any;\nexport declare const expression: any;\nexport declare const first: () => typeof second;\nexport declare const second: () => typeof first;\nexport declare const generic: <T>(value: T) => typeof generic;\n\n(13,5): error5088: The_inferred_type_of_0_references_a_type_with_a_cyclic_structure_which_cannot_be_trivially_serialize_5088\narrow\n\n(47,10): error5088: The_inferred_type_of_0_references_a_type_with_a_cyclic_structure_which_cannot_be_trivially_serialize_5088\nexpression\n","impliedNodeFormat":1}],"options":{"composite":true,"outDir":"./","strict":true},"emitDiagnosticsPerFile":[[2,[{"pos":13,"end":18,"code":5088,"category":1,"messageKey":"The_inferred_type_of_0_references_a_type_with_a_cyclic_structure_which_cannot_be_trivially_serialize_5088","messageArgs":["arrow"]},{"pos":47,"end":57,"code":5088,"category":1,"messageKey":"The_inferred_type_of_0_references_a_type_with_a_cyclic_structure_which_cannot_be_trivially_serialize_5088","messageArgs":["expression"]}]]],"emitSignatures":[2]}
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
      "version": "1518eacddeda8b529b863685f5a73bfd-export const arrow = () => arrow;\nexport const expression = function self() { return self; };\nexport const first = () => second;\nexport const second = () => first;\nexport const generic = <T>(value: T) => generic;\n// comment-only edit\n",
      "signature": "896b5743ff145bae90bb9dfdf6c31a4e-export declare const arrow: any;\nexport declare const expression: any;\nexport declare const first: () => typeof second;\nexport declare const second: () => typeof first;\nexport declare const generic: <T>(value: T) => typeof generic;\n\n(13,5): error5088: The_inferred_type_of_0_references_a_type_with_a_cyclic_structure_which_cannot_be_trivially_serialize_5088\narrow\n\n(47,10): error5088: The_inferred_type_of_0_references_a_type_with_a_cyclic_structure_which_cannot_be_trivially_serialize_5088\nexpression\n",
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "1518eacddeda8b529b863685f5a73bfd-export const arrow = () => arrow;\nexport const expression = function self() { return self; };\nexport const first = () => second;\nexport const second = () => first;\nexport const generic = <T>(value: T) => generic;\n// comment-only edit\n",
        "signature": "896b5743ff145bae90bb9dfdf6c31a4e-export declare const arrow: any;\nexport declare const expression: any;\nexport declare const first: () => typeof second;\nexport declare const second: () => typeof first;\nexport declare const generic: <T>(value: T) => typeof generic;\n\n(13,5): error5088: The_inferred_type_of_0_references_a_type_with_a_cyclic_structure_which_cannot_be_trivially_serialize_5088\narrow\n\n(47,10): error5088: The_inferred_type_of_0_references_a_type_with_a_cyclic_structure_which_cannot_be_trivially_serialize_5088\nexpression\n",
        "impliedNodeFormat": 1
      }
    }
  ],
  "options": {
    "composite": true,
    "outDir": "./",
    "strict": true
  },
  "emitDiagnosticsPerFile": [
    [
      "../index.ts",
      [
        {
          "pos": 13,
          "end": 18,
          "code": 5088,
          "category": 1,
          "messageKey": "The_inferred_type_of_0_references_a_type_with_a_cyclic_structure_which_cannot_be_trivially_serialize_5088",
          "messageArgs": [
            "arrow"
          ]
        },
        {
          "pos": 47,
          "end": 57,
          "code": 5088,
          "category": 1,
          "messageKey": "The_inferred_type_of_0_references_a_type_with_a_cyclic_structure_which_cannot_be_trivially_serialize_5088",
          "messageArgs": [
            "expression"
          ]
        }
      ]
    ]
  ],
  "emitSignatures": [
    {
      "file": "../index.ts",
      "original": 2
    }
  ],
  "size": 2240
}

producer/tsconfig.json::
SemanticDiagnostics::
*refresh*    /home/src/workspaces/project/producer/index.ts
Signatures::
(computed .d.ts) /home/src/workspaces/project/producer/index.ts

consumer/tsconfig.json::
SemanticDiagnostics::
*refresh*    /home/src/tslibs/TS/Lib/lib.es2025.full.d.ts
*refresh*    /home/src/workspaces/project/consumer/index.ts
Signatures::


Edit [2]:: no change

tsgo --build consumer
ExitStatus:: DiagnosticsPresent_OutputsGenerated
Output::
[96mproducer/index.ts[0m:[93m1[0m:[93m14[0m - [91merror[0m[90m TS5088: [0mThe inferred type of 'arrow' references a type with a cyclic structure which cannot be trivially serialized. A type annotation is necessary.

[7m1[0m export const arrow = () => arrow;
[7m [0m [91m             ~~~~~[0m

[96mproducer/index.ts[0m:[93m2[0m:[93m14[0m - [91merror[0m[90m TS5088: [0mThe inferred type of 'expression' references a type with a cyclic structure which cannot be trivially serialized. A type annotation is necessary.

[7m2[0m export const expression = function self() { return self; };
[7m [0m [91m             ~~~~~~~~~~[0m

[96mconsumer/index.ts[0m:[93m1[0m:[93m51[0m - [91merror[0m[90m TS7016: [0mCould not find a declaration file for module '../producer/dist/index.js'. '/home/src/workspaces/project/producer/dist/index.js' implicitly has an 'any' type.

[7m1[0m import { arrow, expression, first, generic } from "../producer/dist/index.js";
[7m [0m [91m                                                  ~~~~~~~~~~~~~~~~~~~~~~~~~~~[0m


Found 3 errors in 2 files.

Errors  Files
     1  consumer/index.ts[90m:1[0m
     2  producer/index.ts[90m:1[0m

//// [/home/src/workspaces/project/consumer/tsconfig.tsbuildinfo] *rewrite with same content*
//// [/home/src/workspaces/project/consumer/tsconfig.tsbuildinfo.readable.baseline.txt] *rewrite with same content*

producer/tsconfig.json::
SemanticDiagnostics::
Signatures::

consumer/tsconfig.json::
SemanticDiagnostics::
*refresh*    /home/src/tslibs/TS/Lib/lib.es2025.full.d.ts
*refresh*    /home/src/workspaces/project/consumer/index.ts
Signatures::
