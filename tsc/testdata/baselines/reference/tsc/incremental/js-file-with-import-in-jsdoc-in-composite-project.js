currentDirectory::/home/src/workspaces/project
useCaseSensitiveFileNames::true
Input::
//// [/home/src/workspaces/project/index.js] *new* 
test("", async function () {
  ;(/** @type {typeof import("a")} */ ({}))
})

test("", async function () {
  ;(/** @type {typeof import("a")} */ a)
})

test("", async function () {
  (/** @type {typeof import("a")} */ ({}))
  ;(/** @type {typeof import("a")} */ ({}))
})

test("", async function () {
  (/** @type {typeof import("a")} */ a)
  ;(/** @type {typeof import("a")} */ a)
})

test("", async function () {
  (/** @type {typeof import("a")} */ ({}))
  ;(/** @type {typeof import("a")} */ ({}))
})
//// [/home/src/workspaces/project/tsconfig.json] *new* 
{"compilerOptions": {"allowJs": true, "composite": true}}

tsgo --noEmit
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
//// [/home/src/workspaces/project/tsconfig.tsbuildinfo] *new* 
{"version":"FakeTSVersion","errors":true,"root":[2],"fileNames":["lib.es2025.full.d.ts","./index.js"],"fileInfos":[{"version":"8859c12c614ce56ba9a18e58384a198f-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ninterface SymbolConstructor {\n    (desc?: string | number): symbol;\n    for(name: string): symbol;\n    readonly toStringTag: symbol;\n}\ndeclare var Symbol: SymbolConstructor;\ninterface Symbol {\n    readonly [Symbol.toStringTag]: string;\n}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true,"impliedNodeFormat":1},{"version":"a2c0c261f400e90f1ff304dbe3da7a53-test(\"\", async function () {\n  ;(/** @type {typeof import(\"a\")} */ ({}))\n})\n\ntest(\"\", async function () {\n  ;(/** @type {typeof import(\"a\")} */ a)\n})\n\ntest(\"\", async function () {\n  (/** @type {typeof import(\"a\")} */ ({}))\n  ;(/** @type {typeof import(\"a\")} */ ({}))\n})\n\ntest(\"\", async function () {\n  (/** @type {typeof import(\"a\")} */ a)\n  ;(/** @type {typeof import(\"a\")} */ a)\n})\n\ntest(\"\", async function () {\n  (/** @type {typeof import(\"a\")} */ ({}))\n  ;(/** @type {typeof import(\"a\")} */ ({}))\n})","affectsGlobalScope":true,"impliedNodeFormat":1}],"options":{"allowJs":true,"composite":true},"affectedFilesPendingEmit":[[2,17]],"emitSignatures":[2]}
//// [/home/src/workspaces/project/tsconfig.tsbuildinfo.readable.baseline.txt] *new* 
{
  "version": "FakeTSVersion",
  "errors": true,
  "root": [
    {
      "files": [
        "./index.js"
      ],
      "original": 2
    }
  ],
  "fileNames": [
    "lib.es2025.full.d.ts",
    "./index.js"
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
      "fileName": "./index.js",
      "version": "a2c0c261f400e90f1ff304dbe3da7a53-test(\"\", async function () {\n  ;(/** @type {typeof import(\"a\")} */ ({}))\n})\n\ntest(\"\", async function () {\n  ;(/** @type {typeof import(\"a\")} */ a)\n})\n\ntest(\"\", async function () {\n  (/** @type {typeof import(\"a\")} */ ({}))\n  ;(/** @type {typeof import(\"a\")} */ ({}))\n})\n\ntest(\"\", async function () {\n  (/** @type {typeof import(\"a\")} */ a)\n  ;(/** @type {typeof import(\"a\")} */ a)\n})\n\ntest(\"\", async function () {\n  (/** @type {typeof import(\"a\")} */ ({}))\n  ;(/** @type {typeof import(\"a\")} */ ({}))\n})",
      "signature": "a2c0c261f400e90f1ff304dbe3da7a53-test(\"\", async function () {\n  ;(/** @type {typeof import(\"a\")} */ ({}))\n})\n\ntest(\"\", async function () {\n  ;(/** @type {typeof import(\"a\")} */ a)\n})\n\ntest(\"\", async function () {\n  (/** @type {typeof import(\"a\")} */ ({}))\n  ;(/** @type {typeof import(\"a\")} */ ({}))\n})\n\ntest(\"\", async function () {\n  (/** @type {typeof import(\"a\")} */ a)\n  ;(/** @type {typeof import(\"a\")} */ a)\n})\n\ntest(\"\", async function () {\n  (/** @type {typeof import(\"a\")} */ ({}))\n  ;(/** @type {typeof import(\"a\")} */ ({}))\n})",
      "affectsGlobalScope": true,
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "a2c0c261f400e90f1ff304dbe3da7a53-test(\"\", async function () {\n  ;(/** @type {typeof import(\"a\")} */ ({}))\n})\n\ntest(\"\", async function () {\n  ;(/** @type {typeof import(\"a\")} */ a)\n})\n\ntest(\"\", async function () {\n  (/** @type {typeof import(\"a\")} */ ({}))\n  ;(/** @type {typeof import(\"a\")} */ ({}))\n})\n\ntest(\"\", async function () {\n  (/** @type {typeof import(\"a\")} */ a)\n  ;(/** @type {typeof import(\"a\")} */ a)\n})\n\ntest(\"\", async function () {\n  (/** @type {typeof import(\"a\")} */ ({}))\n  ;(/** @type {typeof import(\"a\")} */ ({}))\n})",
        "affectsGlobalScope": true,
        "impliedNodeFormat": 1
      }
    }
  ],
  "options": {
    "allowJs": true,
    "composite": true
  },
  "affectedFilesPendingEmit": [
    [
      "./index.js",
      "Js|DtsEmit",
      [
        2,
        17
      ]
    ]
  ],
  "emitSignatures": [
    {
      "file": "./index.js",
      "original": 2
    }
  ],
  "size": 1633
}

tsconfig.json::
SemanticDiagnostics::
*refresh*    /home/src/tslibs/TS/Lib/lib.es2025.full.d.ts
*refresh*    /home/src/workspaces/project/index.js
Signatures::
