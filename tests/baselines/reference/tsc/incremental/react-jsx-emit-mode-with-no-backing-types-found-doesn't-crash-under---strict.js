currentDirectory:: /home/src/workspaces/project useCaseSensitiveFileNames:: false
Input::
//// [/home/src/workspaces/project/node_modules/react/jsx-runtime.js]
export {}

//// [/home/src/workspaces/project/node_modules/@types/react/index.d.ts]

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

//// [/home/src/workspaces/project/src/index.tsx]
export const App = () => <div propA={true}></div>;

//// [/home/src/workspaces/project/tsconfig.json]
{
  "compilerOptions": {
    "module": "commonjs",
    "jsx": "react-jsx",
    "incremental": true,
    "jsxImportSource": "react"
  }
}

//// [/home/src/tslibs/TS/Lib/lib.d.ts]
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
declare const console: { log(msg: any): void; };


/home/src/tslibs/TS/Lib/tsc.js --strict
Output::
[96msrc/index.tsx[0m:[93m1[0m:[93m26[0m - [91merror[0m[90m TS7016: [0mCould not find a declaration file for module 'react/jsx-runtime'. '/home/src/workspaces/project/node_modules/react/jsx-runtime.js' implicitly has an 'any' type.

[7m1[0m export const App = () => <div propA={true}></div>;
[7m [0m [91m                         ~~~~~~~~~~~~~~~~~~~~~~~~[0m


Found 1 error in src/index.tsx[90m:1[0m



//// [/home/src/workspaces/project/src/index.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.App = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
var App = function () { return (0, jsx_runtime_1.jsx)("div", { propA: true }); };
exports.App = App;


//// [/home/src/workspaces/project/tsconfig.tsbuildinfo]
{"fileNames":["../../tslibs/ts/lib/lib.d.ts","./src/index.tsx","./node_modules/@types/react/index.d.ts"],"fileInfos":[{"version":"3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true},"-14760199789-export const App = () => <div propA={true}></div>;",{"version":"-16587767667-\nexport {};\ndeclare global {\n    namespace JSX {\n        interface Element {}\n        interface IntrinsicElements {\n            div: {\n                propA?: boolean;\n            };\n        }\n    }\n}","affectsGlobalScope":true,"impliedFormat":1}],"root":[2],"options":{"jsx":4,"jsxImportSource":"react","module":1,"strict":true},"semanticDiagnosticsPerFile":[[2,[{"start":25,"length":24,"code":7016,"category":1,"messageText":"Could not find a declaration file for module 'react/jsx-runtime'. '/home/src/workspaces/project/node_modules/react/jsx-runtime.js' implicitly has an 'any' type."}]]],"version":"FakeTSVersion"}

//// [/home/src/workspaces/project/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "fileNames": [
    "../../tslibs/ts/lib/lib.d.ts",
    "./src/index.tsx",
    "./node_modules/@types/react/index.d.ts"
  ],
  "fileInfos": {
    "../../tslibs/ts/lib/lib.d.ts": {
      "original": {
        "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "affectsGlobalScope": true
      },
      "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
      "signature": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
      "affectsGlobalScope": true
    },
    "./src/index.tsx": {
      "version": "-14760199789-export const App = () => <div propA={true}></div>;",
      "signature": "-14760199789-export const App = () => <div propA={true}></div>;"
    },
    "./node_modules/@types/react/index.d.ts": {
      "original": {
        "version": "-16587767667-\nexport {};\ndeclare global {\n    namespace JSX {\n        interface Element {}\n        interface IntrinsicElements {\n            div: {\n                propA?: boolean;\n            };\n        }\n    }\n}",
        "affectsGlobalScope": true,
        "impliedFormat": 1
      },
      "version": "-16587767667-\nexport {};\ndeclare global {\n    namespace JSX {\n        interface Element {}\n        interface IntrinsicElements {\n            div: {\n                propA?: boolean;\n            };\n        }\n    }\n}",
      "signature": "-16587767667-\nexport {};\ndeclare global {\n    namespace JSX {\n        interface Element {}\n        interface IntrinsicElements {\n            div: {\n                propA?: boolean;\n            };\n        }\n    }\n}",
      "affectsGlobalScope": true,
      "impliedFormat": "commonjs"
    }
  },
  "root": [
    [
      2,
      "./src/index.tsx"
    ]
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
          "start": 25,
          "length": 24,
          "code": 7016,
          "category": 1,
          "messageText": "Could not find a declaration file for module 'react/jsx-runtime'. '/home/src/workspaces/project/node_modules/react/jsx-runtime.js' implicitly has an 'any' type."
        }
      ]
    ]
  ],
  "version": "FakeTSVersion",
  "size": 1319
}


exitCode:: ExitStatus.DiagnosticsPresent_OutputsGenerated
