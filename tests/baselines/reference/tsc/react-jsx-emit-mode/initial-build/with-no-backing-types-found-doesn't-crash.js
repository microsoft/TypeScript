Input::
//// [/lib/lib.d.ts]
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

//// [/src/project/node_modules/@types/react/index.d.ts]

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

//// [/src/project/node_modules/react/jsx-runtime.js]


//// [/src/project/src/index.tsx]
export const App = () => <div propA={true}></div>;

//// [/src/project/tsconfig.json]
{"compilerOptions":{"module":"commonjs","jsx":"react-jsx","incremental":true,"jsxImportSource":"react"}}



Output::
/lib/tsc --p src/project
exitCode:: ExitStatus.Success


//// [/src/project/src/index.js]
"use strict";
exports.__esModule = true;
exports.App = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
var App = function () { return jsx_runtime_1.jsx("div", { propA: true }, void 0); };
exports.App = App;


//// [/src/project/tsconfig.tsbuildinfo]
{
  "program": {
    "fileInfos": {
      "../../lib/lib.d.ts": {
        "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "signature": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "affectsGlobalScope": true
      },
      "./src/index.tsx": {
        "version": "-14760199789-export const App = () => <div propA={true}></div>;",
        "signature": "-8716173275-/// <reference types=\"react\" />\r\nexport declare const App: () => JSX.Element;\r\n",
        "affectsGlobalScope": false
      },
      "./node_modules/@types/react/index.d.ts": {
        "version": "-16587767667-\nexport {};\ndeclare global {\n    namespace JSX {\n        interface Element {}\n        interface IntrinsicElements {\n            div: {\n                propA?: boolean;\n            };\n        }\n    }\n}",
        "signature": "-16587767667-\nexport {};\ndeclare global {\n    namespace JSX {\n        interface Element {}\n        interface IntrinsicElements {\n            div: {\n                propA?: boolean;\n            };\n        }\n    }\n}",
        "affectsGlobalScope": true
      }
    },
    "options": {
      "module": 1,
      "jsx": 4,
      "incremental": true,
      "jsxImportSource": "react",
      "project": "./",
      "configFilePath": "./tsconfig.json"
    },
    "referencedMap": {},
    "exportedModulesMap": {},
    "semanticDiagnosticsPerFile": [
      "../../lib/lib.d.ts",
      "./node_modules/@types/react/index.d.ts",
      "./src/index.tsx"
    ]
  },
  "version": "FakeTSVersion"
}

