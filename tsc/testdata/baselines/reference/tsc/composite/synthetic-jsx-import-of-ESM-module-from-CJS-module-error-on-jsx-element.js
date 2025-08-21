currentDirectory::/home/src/projects/project
useCaseSensitiveFileNames::true
Input::
//// [/home/src/projects/project/node_modules/solid-js/jsx-runtime.d.ts] *new* 
export namespace JSX {
    type IntrinsicElements = { div: {}; };
}
//// [/home/src/projects/project/node_modules/solid-js/package.json] *new* 
{
    "name": "solid-js",
    "type": "module"
}
//// [/home/src/projects/project/src/main.tsx] *new* 
export default <div/>;
//// [/home/src/projects/project/tsconfig.json] *new* 
{
    "compilerOptions": {
        "composite": true,
        "module": "Node16",
        "jsx": "react-jsx",
        "jsxImportSource": "solid-js",
    },
}

tsgo 
ExitStatus:: DiagnosticsPresent_OutputsGenerated
Output::
[96msrc/main.tsx[0m:[93m1[0m:[93m16[0m - [91merror[0m[90m TS1479: [0mThe current file is a CommonJS module whose imports will produce 'require' calls; however, the referenced file is an ECMAScript module and cannot be imported with 'require'. Consider writing a dynamic 'import("solid-js/jsx-runtime")' call instead.
  To convert this file to an ECMAScript module, create a local package.json file with `{ "type": "module" }`.

[7m1[0m export default <div/>;
[7m [0m [91m               ~~~~~~[0m


Found 1 error in src/main.tsx[90m:1[0m

//// [/home/src/projects/project/src/main.d.ts] *new* 
declare const _default: any;
export default _default;

//// [/home/src/projects/project/src/main.js] *new* 
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("solid-js/jsx-runtime");
exports.default = jsx_runtime_1.jsx("div", {});

//// [/home/src/projects/project/tsconfig.tsbuildinfo] *new* 
{"version":"FakeTSVersion","root":[3],"fileNames":["lib.es2022.full.d.ts","./node_modules/solid-js/jsx-runtime.d.ts","./src/main.tsx"],"fileInfos":[{"version":"8859c12c614ce56ba9a18e58384a198f-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ninterface SymbolConstructor {\n    (desc?: string | number): symbol;\n    for(name: string): symbol;\n    readonly toStringTag: symbol;\n}\ndeclare var Symbol: SymbolConstructor;\ninterface Symbol {\n    readonly [Symbol.toStringTag]: string;\n}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true,"impliedNodeFormat":1},{"version":"00e459cbb1596f8c4bdf988b0589433f-export namespace JSX {\n    type IntrinsicElements = { div: {}; };\n}","impliedNodeFormat":99},{"version":"5af15af7f9b4d97300f8dcfb2bf5b7c4-export default <div/>;","signature":"ca37c00363f904fe93e299b145186400-declare const _default: any;\nexport default _default;\n","impliedNodeFormat":1}],"options":{"composite":true,"jsx":4,"jsxImportSource":"solid-js","module":100},"semanticDiagnosticsPerFile":[[3,[{"pos":15,"end":21,"code":1479,"category":1,"message":"The current file is a CommonJS module whose imports will produce 'require' calls; however, the referenced file is an ECMAScript module and cannot be imported with 'require'. Consider writing a dynamic 'import(\"solid-js/jsx-runtime\")' call instead.","messageChain":[{"pos":15,"end":21,"code":1483,"category":3,"message":"To convert this file to an ECMAScript module, create a local package.json file with `{ \"type\": \"module\" }`."}]}]]],"latestChangedDtsFile":"./src/main.d.ts"}
//// [/home/src/projects/project/tsconfig.tsbuildinfo.readable.baseline.txt] *new* 
{
  "version": "FakeTSVersion",
  "root": [
    {
      "files": [
        "./src/main.tsx"
      ],
      "original": 3
    }
  ],
  "fileNames": [
    "lib.es2022.full.d.ts",
    "./node_modules/solid-js/jsx-runtime.d.ts",
    "./src/main.tsx"
  ],
  "fileInfos": [
    {
      "fileName": "lib.es2022.full.d.ts",
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
      "fileName": "./node_modules/solid-js/jsx-runtime.d.ts",
      "version": "00e459cbb1596f8c4bdf988b0589433f-export namespace JSX {\n    type IntrinsicElements = { div: {}; };\n}",
      "signature": "00e459cbb1596f8c4bdf988b0589433f-export namespace JSX {\n    type IntrinsicElements = { div: {}; };\n}",
      "impliedNodeFormat": "ESNext",
      "original": {
        "version": "00e459cbb1596f8c4bdf988b0589433f-export namespace JSX {\n    type IntrinsicElements = { div: {}; };\n}",
        "impliedNodeFormat": 99
      }
    },
    {
      "fileName": "./src/main.tsx",
      "version": "5af15af7f9b4d97300f8dcfb2bf5b7c4-export default <div/>;",
      "signature": "ca37c00363f904fe93e299b145186400-declare const _default: any;\nexport default _default;\n",
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "5af15af7f9b4d97300f8dcfb2bf5b7c4-export default <div/>;",
        "signature": "ca37c00363f904fe93e299b145186400-declare const _default: any;\nexport default _default;\n",
        "impliedNodeFormat": 1
      }
    }
  ],
  "options": {
    "composite": true,
    "jsx": 4,
    "jsxImportSource": "solid-js",
    "module": 100
  },
  "semanticDiagnosticsPerFile": [
    [
      "./src/main.tsx",
      [
        {
          "pos": 15,
          "end": 21,
          "code": 1479,
          "category": 1,
          "message": "The current file is a CommonJS module whose imports will produce 'require' calls; however, the referenced file is an ECMAScript module and cannot be imported with 'require'. Consider writing a dynamic 'import(\"solid-js/jsx-runtime\")' call instead.",
          "messageChain": [
            {
              "pos": 15,
              "end": 21,
              "code": 1483,
              "category": 3,
              "message": "To convert this file to an ECMAScript module, create a local package.json file with `{ \"type\": \"module\" }`."
            }
          ]
        }
      ]
    ]
  ],
  "latestChangedDtsFile": "./src/main.d.ts",
  "size": 1905
}
//// [/home/src/tslibs/TS/Lib/lib.es2022.full.d.ts] *Lib*
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

tsconfig.json::
SemanticDiagnostics::
*refresh*    /home/src/tslibs/TS/Lib/lib.es2022.full.d.ts
*refresh*    /home/src/projects/project/node_modules/solid-js/jsx-runtime.d.ts
*refresh*    /home/src/projects/project/src/main.tsx
Signatures::
(stored at emit) /home/src/projects/project/src/main.tsx
