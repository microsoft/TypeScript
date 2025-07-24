currentDirectory::/home/src/workspaces/project
useCaseSensitiveFileNames::true
Input::
//// [/home/src/workspaces/project/node_modules/@types/react/index.d.ts] *new* 
export {};
declare global {
    namespace JSX {
        interface Element {}
        interface IntrinsicElements {
            div: {
                propA?: boolean;
            };
        }
    }
}
//// [/home/src/workspaces/project/node_modules/react/jsx-runtime.js] *new* 
export {}
//// [/home/src/workspaces/project/src/index.tsx] *new* 
export const App = () => <div propA={true}></div>;
//// [/home/src/workspaces/project/tsconfig.json] *new* 
{ 
    "compilerOptions": { 
        "module": "commonjs",
        "jsx": "react-jsx", 
        "incremental": true, 
        "jsxImportSource": "react" 
    } 
}

tsgo --strict
ExitStatus:: DiagnosticsPresent_OutputsGenerated
Output::
[96msrc/index.tsx[0m:[93m1[0m:[93m26[0m - [91merror[0m[90m TS7016: [0mCould not find a declaration file for module 'react/jsx-runtime'. '/home/src/workspaces/project/node_modules/react/jsx-runtime.js' implicitly has an 'any' type.

[7m1[0m export const App = () => <div propA={true}></div>;
[7m [0m [91m                         ~~~~~~~~~~~~~~~~~~~~~~~~[0m


Found 1 error in src/index.tsx[90m:1[0m

//// [/home/src/tslibs/TS/Lib/lib.d.ts] *Lib*
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
//// [/home/src/workspaces/project/src/index.js] *new* 
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.App = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const App = () => jsx_runtime_1.jsx("div", { propA: true });
exports.App = App;

//// [/home/src/workspaces/project/tsconfig.tsbuildinfo] *new* 
{"version":"FakeTSVersion","fileNames":["../../tslibs/TS/Lib/lib.d.ts","./src/index.tsx","./node_modules/@types/react/index.d.ts"],"fileInfos":[{"version":"eae9e83ef0f77eeb2e35dc9b91facce1-/// \u003creference no-default-lib=\"true\"/\u003e\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array\u003cT\u003e { length: number; [n: number]: T; }\ninterface ReadonlyArray\u003cT\u003e {}\ninterface SymbolConstructor {\n    (desc?: string | number): symbol;\n    for(name: string): symbol;\n    readonly toStringTag: symbol;\n}\ndeclare var Symbol: SymbolConstructor;\ninterface Symbol {\n    readonly [Symbol.toStringTag]: string;\n}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true,"impliedNodeFormat":1},"4a13ca6545a89ae876d330f6a9a63311-export const App = () =\u003e \u003cdiv propA={true}\u003e\u003c/div\u003e;",{"version":"d852e67cad2a06a8df0fbbab7831e365-export {};\ndeclare global {\n    namespace JSX {\n        interface Element {}\n        interface IntrinsicElements {\n            div: {\n                propA?: boolean;\n            };\n        }\n    }\n}","affectsGlobalScope":true,"impliedNodeFormat":1}],"options":{"jsx":4,"jsxImportSource":"react","module":1,"strict":true},"semanticDiagnosticsPerFile":[[2,[{"pos":25,"end":49,"code":7016,"category":1,"message":"Could not find a declaration file for module 'react/jsx-runtime'. '/home/src/workspaces/project/node_modules/react/jsx-runtime.js' implicitly has an 'any' type."}]]]}
//// [/home/src/workspaces/project/tsconfig.tsbuildinfo.readable.baseline.txt] *new* 
{
  "version": "FakeTSVersion",
  "fileNames": [
    "../../tslibs/TS/Lib/lib.d.ts",
    "./src/index.tsx",
    "./node_modules/@types/react/index.d.ts"
  ],
  "fileInfos": [
    {
      "fileName": "../../tslibs/TS/Lib/lib.d.ts",
      "version": "eae9e83ef0f77eeb2e35dc9b91facce1-/// \u003creference no-default-lib=\"true\"/\u003e\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array\u003cT\u003e { length: number; [n: number]: T; }\ninterface ReadonlyArray\u003cT\u003e {}\ninterface SymbolConstructor {\n    (desc?: string | number): symbol;\n    for(name: string): symbol;\n    readonly toStringTag: symbol;\n}\ndeclare var Symbol: SymbolConstructor;\ninterface Symbol {\n    readonly [Symbol.toStringTag]: string;\n}\ndeclare const console: { log(msg: any): void; };",
      "signature": "eae9e83ef0f77eeb2e35dc9b91facce1-/// \u003creference no-default-lib=\"true\"/\u003e\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array\u003cT\u003e { length: number; [n: number]: T; }\ninterface ReadonlyArray\u003cT\u003e {}\ninterface SymbolConstructor {\n    (desc?: string | number): symbol;\n    for(name: string): symbol;\n    readonly toStringTag: symbol;\n}\ndeclare var Symbol: SymbolConstructor;\ninterface Symbol {\n    readonly [Symbol.toStringTag]: string;\n}\ndeclare const console: { log(msg: any): void; };",
      "affectsGlobalScope": true,
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "eae9e83ef0f77eeb2e35dc9b91facce1-/// \u003creference no-default-lib=\"true\"/\u003e\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array\u003cT\u003e { length: number; [n: number]: T; }\ninterface ReadonlyArray\u003cT\u003e {}\ninterface SymbolConstructor {\n    (desc?: string | number): symbol;\n    for(name: string): symbol;\n    readonly toStringTag: symbol;\n}\ndeclare var Symbol: SymbolConstructor;\ninterface Symbol {\n    readonly [Symbol.toStringTag]: string;\n}\ndeclare const console: { log(msg: any): void; };",
        "affectsGlobalScope": true,
        "impliedNodeFormat": 1
      }
    },
    {
      "fileName": "./src/index.tsx",
      "version": "4a13ca6545a89ae876d330f6a9a63311-export const App = () =\u003e \u003cdiv propA={true}\u003e\u003c/div\u003e;",
      "signature": "4a13ca6545a89ae876d330f6a9a63311-export const App = () =\u003e \u003cdiv propA={true}\u003e\u003c/div\u003e;",
      "impliedNodeFormat": "CommonJS"
    },
    {
      "fileName": "./node_modules/@types/react/index.d.ts",
      "version": "d852e67cad2a06a8df0fbbab7831e365-export {};\ndeclare global {\n    namespace JSX {\n        interface Element {}\n        interface IntrinsicElements {\n            div: {\n                propA?: boolean;\n            };\n        }\n    }\n}",
      "signature": "d852e67cad2a06a8df0fbbab7831e365-export {};\ndeclare global {\n    namespace JSX {\n        interface Element {}\n        interface IntrinsicElements {\n            div: {\n                propA?: boolean;\n            };\n        }\n    }\n}",
      "affectsGlobalScope": true,
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "d852e67cad2a06a8df0fbbab7831e365-export {};\ndeclare global {\n    namespace JSX {\n        interface Element {}\n        interface IntrinsicElements {\n            div: {\n                propA?: boolean;\n            };\n        }\n    }\n}",
        "affectsGlobalScope": true,
        "impliedNodeFormat": 1
      }
    }
  ],
  "options": {
    "jsx": 4,
    "jsxImportSource": "react",
    "module": 1,
    "strict": true
  },
  "semanticDiagnosticsPerFile": [
    [
      "./src/index.tsx",
      [
        {
          "pos": 25,
          "end": 49,
          "code": 7016,
          "category": 1,
          "message": "Could not find a declaration file for module 'react/jsx-runtime'. '/home/src/workspaces/project/node_modules/react/jsx-runtime.js' implicitly has an 'any' type."
        }
      ]
    ]
  ],
  "size": 1687
}

SemanticDiagnostics::
*refresh*    /home/src/tslibs/TS/Lib/lib.d.ts
*refresh*    /home/src/workspaces/project/src/index.tsx
*refresh*    /home/src/workspaces/project/node_modules/@types/react/index.d.ts
Signatures::
