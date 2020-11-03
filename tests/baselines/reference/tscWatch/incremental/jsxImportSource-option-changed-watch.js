Input::
//// [/a/lib/lib.d.ts]
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

//// [/users/username/projects/project/node_modules/react/jsx-runtime/index.d.ts]
export namespace JSX {
    interface Element {}
    interface IntrinsicElements {
        div: {
            propA?: boolean;
        };
    }
}
export function jsx(...args: any[]): void;
export function jsxs(...args: any[]): void;
export const Fragment: unique symbol;


//// [/users/username/projects/project/node_modules/react/package.json]
{"name":"react","version":"0.0.1"}

//// [/users/username/projects/project/node_modules/preact/jsx-runtime/index.d.ts]
export namespace JSX {
    interface Element {}
    interface IntrinsicElements {
        div: {
            propB?: boolean;
        };
    }
}
export function jsx(...args: any[]): void;
export function jsxs(...args: any[]): void;
export const Fragment: unique symbol;


//// [/users/username/projects/project/node_modules/preact/package.json]
{"name":"preact","version":"0.0.1"}

//// [/users/username/projects/project/index.tsx]
export const App = () => <div propA={true}></div>;

//// [/users/username/projects/project/tsconfig.json]
{"compilerOptions":{"module":"commonjs","jsx":"react-jsx","incremental":true,"jsxImportSource":"react"}}


/a/lib/tsc.js -w
Output::
>> Screen clear
[[90m12:00:39 AM[0m] Starting compilation in watch mode...

[[90m12:00:44 AM[0m] Found 0 errors. Watching for file changes.



Program root files: ["/users/username/projects/project/index.tsx"]
Program options: {"module":1,"jsx":4,"incremental":true,"jsxImportSource":"react","watch":true,"configFilePath":"/users/username/projects/project/tsconfig.json"}
Program structureReused: Not
Program files::
/a/lib/lib.d.ts
/users/username/projects/project/node_modules/react/jsx-runtime/index.d.ts
/users/username/projects/project/index.tsx

Semantic diagnostics in builder refreshed for::
/a/lib/lib.d.ts
/users/username/projects/project/node_modules/react/jsx-runtime/index.d.ts
/users/username/projects/project/index.tsx

WatchedFiles::
/users/username/projects/project/tsconfig.json:
  {"fileName":"/users/username/projects/project/tsconfig.json","pollingInterval":250}
/users/username/projects/project/index.tsx:
  {"fileName":"/users/username/projects/project/index.tsx","pollingInterval":250}
/users/username/projects/project/node_modules/react/jsx-runtime/index.d.ts:
  {"fileName":"/users/username/projects/project/node_modules/react/jsx-runtime/index.d.ts","pollingInterval":250}
/a/lib/lib.d.ts:
  {"fileName":"/a/lib/lib.d.ts","pollingInterval":250}

FsWatches::

FsWatchesRecursive::
/users/username/projects/project/node_modules:
  {"directoryName":"/users/username/projects/project/node_modules","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/users/username/projects/project/node_modules/@types:
  {"directoryName":"/users/username/projects/project/node_modules/@types","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/users/username/projects/project:
  {"directoryName":"/users/username/projects/project","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}

exitCode:: ExitStatus.undefined

//// [/users/username/projects/project/index.js]
"use strict";
exports.__esModule = true;
exports.App = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
var App = function () { return jsx_runtime_1.jsx("div", { propA: true }, void 0); };
exports.App = App;


//// [/users/username/projects/project/tsconfig.tsbuildinfo]
{
  "program": {
    "fileInfos": {
      "../../../../a/lib/lib.d.ts": {
        "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "signature": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "affectsGlobalScope": true
      },
      "./node_modules/react/jsx-runtime/index.d.ts": {
        "version": "-35656056833-export namespace JSX {\n    interface Element {}\n    interface IntrinsicElements {\n        div: {\n            propA?: boolean;\n        };\n    }\n}\nexport function jsx(...args: any[]): void;\nexport function jsxs(...args: any[]): void;\nexport const Fragment: unique symbol;\n",
        "signature": "-35656056833-export namespace JSX {\n    interface Element {}\n    interface IntrinsicElements {\n        div: {\n            propA?: boolean;\n        };\n    }\n}\nexport function jsx(...args: any[]): void;\nexport function jsxs(...args: any[]): void;\nexport const Fragment: unique symbol;\n",
        "affectsGlobalScope": false
      },
      "./index.tsx": {
        "version": "-14760199789-export const App = () => <div propA={true}></div>;",
        "signature": "-17269688391-export declare const App: () => import(\"react/jsx-runtime\").JSX.Element;\n",
        "affectsGlobalScope": false
      }
    },
    "options": {
      "module": 1,
      "jsx": 4,
      "incremental": true,
      "jsxImportSource": "react",
      "watch": true,
      "configFilePath": "./tsconfig.json"
    },
    "referencedMap": {
      "./index.tsx": [
        "./node_modules/react/jsx-runtime/index.d.ts"
      ]
    },
    "exportedModulesMap": {
      "./index.tsx": [
        "./node_modules/react/jsx-runtime/index.d.ts"
      ]
    },
    "semanticDiagnosticsPerFile": [
      "../../../../a/lib/lib.d.ts",
      "./index.tsx",
      "./node_modules/react/jsx-runtime/index.d.ts"
    ]
  },
  "version": "FakeTSVersion"
}


Change::

Input::
//// [/users/username/projects/project/tsconfig.json]
{"compilerOptions":{"module":"commonjs","jsx":"react-jsx","incremental":true,"jsxImportSource":"preact"}}


Output::
>> Screen clear
[[90m12:00:48 AM[0m] Starting compilation in watch mode...

[96mindex.tsx[0m:[93m1[0m:[93m31[0m - [91merror[0m[90m TS2322: [0mType '{ propA: boolean; }' is not assignable to type '{ propB?: boolean; }'.
  Property 'propA' does not exist on type '{ propB?: boolean; }'. Did you mean 'propB'?

[7m1[0m export const App = () => <div propA={true}></div>;
[7m [0m [91m                              ~~~~~[0m

[[90m12:00:55 AM[0m] Found 1 error. Watching for file changes.



Program root files: ["/users/username/projects/project/index.tsx"]
Program options: {"module":1,"jsx":4,"incremental":true,"jsxImportSource":"preact","watch":true,"configFilePath":"/users/username/projects/project/tsconfig.json"}
Program structureReused: Not
Program files::
/a/lib/lib.d.ts
/users/username/projects/project/node_modules/preact/jsx-runtime/index.d.ts
/users/username/projects/project/index.tsx

Semantic diagnostics in builder refreshed for::
/a/lib/lib.d.ts
/users/username/projects/project/node_modules/preact/jsx-runtime/index.d.ts
/users/username/projects/project/index.tsx

WatchedFiles::
/users/username/projects/project/tsconfig.json:
  {"fileName":"/users/username/projects/project/tsconfig.json","pollingInterval":250}
/users/username/projects/project/index.tsx:
  {"fileName":"/users/username/projects/project/index.tsx","pollingInterval":250}
/users/username/projects/project/node_modules/preact/jsx-runtime/index.d.ts:
  {"fileName":"/users/username/projects/project/node_modules/preact/jsx-runtime/index.d.ts","pollingInterval":250}
/a/lib/lib.d.ts:
  {"fileName":"/a/lib/lib.d.ts","pollingInterval":250}

FsWatches::

FsWatchesRecursive::
/users/username/projects/project/node_modules:
  {"directoryName":"/users/username/projects/project/node_modules","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/users/username/projects/project/node_modules/@types:
  {"directoryName":"/users/username/projects/project/node_modules/@types","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/users/username/projects/project:
  {"directoryName":"/users/username/projects/project","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}

exitCode:: ExitStatus.undefined

//// [/users/username/projects/project/index.js]
"use strict";
exports.__esModule = true;
exports.App = void 0;
var jsx_runtime_1 = require("preact/jsx-runtime");
var App = function () { return jsx_runtime_1.jsx("div", { propA: true }, void 0); };
exports.App = App;


//// [/users/username/projects/project/tsconfig.tsbuildinfo]
{
  "program": {
    "fileInfos": {
      "../../../../a/lib/lib.d.ts": {
        "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "signature": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "affectsGlobalScope": true
      },
      "./node_modules/preact/jsx-runtime/index.d.ts": {
        "version": "-17896129664-export namespace JSX {\n    interface Element {}\n    interface IntrinsicElements {\n        div: {\n            propB?: boolean;\n        };\n    }\n}\nexport function jsx(...args: any[]): void;\nexport function jsxs(...args: any[]): void;\nexport const Fragment: unique symbol;\n",
        "signature": "-17896129664-export namespace JSX {\n    interface Element {}\n    interface IntrinsicElements {\n        div: {\n            propB?: boolean;\n        };\n    }\n}\nexport function jsx(...args: any[]): void;\nexport function jsxs(...args: any[]): void;\nexport const Fragment: unique symbol;\n",
        "affectsGlobalScope": false
      },
      "./index.tsx": {
        "version": "-14760199789-export const App = () => <div propA={true}></div>;",
        "signature": "-8162467991-export declare const App: () => import(\"preact/jsx-runtime\").JSX.Element;\n",
        "affectsGlobalScope": false
      }
    },
    "options": {
      "module": 1,
      "jsx": 4,
      "incremental": true,
      "jsxImportSource": "preact",
      "watch": true,
      "configFilePath": "./tsconfig.json"
    },
    "referencedMap": {
      "./index.tsx": [
        "./node_modules/preact/jsx-runtime/index.d.ts"
      ]
    },
    "exportedModulesMap": {
      "./index.tsx": [
        "./node_modules/preact/jsx-runtime/index.d.ts"
      ]
    },
    "semanticDiagnosticsPerFile": [
      "../../../../a/lib/lib.d.ts",
      [
        "./index.tsx",
        [
          {
            "file": "./index.tsx",
            "start": 30,
            "length": 5,
            "code": 2322,
            "category": 1,
            "messageText": {
              "messageText": "Type '{ propA: boolean; }' is not assignable to type '{ propB?: boolean; }'.",
              "category": 1,
              "code": 2322,
              "next": [
                {
                  "messageText": "Property 'propA' does not exist on type '{ propB?: boolean; }'. Did you mean 'propB'?",
                  "category": 1,
                  "code": 2551
                }
              ]
            }
          }
        ]
      ],
      "./node_modules/preact/jsx-runtime/index.d.ts"
    ]
  },
  "version": "FakeTSVersion"
}

