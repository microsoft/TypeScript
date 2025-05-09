currentDirectory:: /users/username/projects/project useCaseSensitiveFileNames:: false
Input::
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
{
  "name": "react",
  "version": "0.0.1"
}

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
{
  "name": "preact",
  "version": "0.0.1"
}

//// [/users/username/projects/project/index.tsx]
export const App = () => <div propA={true}></div>;

//// [/users/username/projects/project/tsconfig.json]
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


/home/src/tslibs/TS/Lib/tsc.js -i --explainFiles
Output::
../../../../home/src/tslibs/TS/Lib/lib.d.ts
  Default library for target 'es5'
node_modules/react/jsx-runtime/index.d.ts
  Imported via "react/jsx-runtime" from file 'index.tsx' with packageId 'react/jsx-runtime/index.d.ts@0.0.1' to import 'jsx' and 'jsxs' factory functions
index.tsx
  Matched by default include pattern '**/*'


//// [/users/username/projects/project/index.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.App = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
var App = function () { return (0, jsx_runtime_1.jsx)("div", { propA: true }); };
exports.App = App;


//// [/users/username/projects/project/tsconfig.tsbuildinfo]
{"fileNames":["../../../../home/src/tslibs/ts/lib/lib.d.ts","./node_modules/react/jsx-runtime/index.d.ts","./index.tsx"],"fileIdsList":[[2]],"fileInfos":[{"version":"3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true},{"version":"-35656056833-export namespace JSX {\n    interface Element {}\n    interface IntrinsicElements {\n        div: {\n            propA?: boolean;\n        };\n    }\n}\nexport function jsx(...args: any[]): void;\nexport function jsxs(...args: any[]): void;\nexport const Fragment: unique symbol;\n","impliedFormat":1},"-14760199789-export const App = () => <div propA={true}></div>;"],"root":[3],"options":{"jsx":4,"jsxImportSource":"react","module":1},"referencedMap":[[3,1]],"version":"FakeTSVersion"}

//// [/users/username/projects/project/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "fileNames": [
    "../../../../home/src/tslibs/ts/lib/lib.d.ts",
    "./node_modules/react/jsx-runtime/index.d.ts",
    "./index.tsx"
  ],
  "fileIdsList": [
    [
      "./node_modules/react/jsx-runtime/index.d.ts"
    ]
  ],
  "fileInfos": {
    "../../../../home/src/tslibs/ts/lib/lib.d.ts": {
      "original": {
        "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "affectsGlobalScope": true
      },
      "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
      "signature": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
      "affectsGlobalScope": true
    },
    "./node_modules/react/jsx-runtime/index.d.ts": {
      "original": {
        "version": "-35656056833-export namespace JSX {\n    interface Element {}\n    interface IntrinsicElements {\n        div: {\n            propA?: boolean;\n        };\n    }\n}\nexport function jsx(...args: any[]): void;\nexport function jsxs(...args: any[]): void;\nexport const Fragment: unique symbol;\n",
        "impliedFormat": 1
      },
      "version": "-35656056833-export namespace JSX {\n    interface Element {}\n    interface IntrinsicElements {\n        div: {\n            propA?: boolean;\n        };\n    }\n}\nexport function jsx(...args: any[]): void;\nexport function jsxs(...args: any[]): void;\nexport const Fragment: unique symbol;\n",
      "signature": "-35656056833-export namespace JSX {\n    interface Element {}\n    interface IntrinsicElements {\n        div: {\n            propA?: boolean;\n        };\n    }\n}\nexport function jsx(...args: any[]): void;\nexport function jsxs(...args: any[]): void;\nexport const Fragment: unique symbol;\n",
      "impliedFormat": "commonjs"
    },
    "./index.tsx": {
      "version": "-14760199789-export const App = () => <div propA={true}></div>;",
      "signature": "-14760199789-export const App = () => <div propA={true}></div>;"
    }
  },
  "root": [
    [
      3,
      "./index.tsx"
    ]
  ],
  "options": {
    "jsx": 4,
    "jsxImportSource": "react",
    "module": 1
  },
  "referencedMap": {
    "./index.tsx": [
      "./node_modules/react/jsx-runtime/index.d.ts"
    ]
  },
  "version": "FakeTSVersion",
  "size": 1145
}


Program root files: [
  "/users/username/projects/project/index.tsx"
]
Program options: {
  "module": 1,
  "jsx": 4,
  "incremental": true,
  "jsxImportSource": "react",
  "explainFiles": true,
  "configFilePath": "/users/username/projects/project/tsconfig.json"
}
Program structureReused: Not
Program files::
/home/src/tslibs/TS/Lib/lib.d.ts
/users/username/projects/project/node_modules/react/jsx-runtime/index.d.ts
/users/username/projects/project/index.tsx

Semantic diagnostics in builder refreshed for::
/home/src/tslibs/TS/Lib/lib.d.ts
/users/username/projects/project/node_modules/react/jsx-runtime/index.d.ts
/users/username/projects/project/index.tsx

Shape signatures in builder refreshed for::
/home/src/tslibs/ts/lib/lib.d.ts (used version)
/users/username/projects/project/node_modules/react/jsx-runtime/index.d.ts (used version)
/users/username/projects/project/index.tsx (used version)

exitCode:: ExitStatus.Success

Change::

Input::
//// [/users/username/projects/project/tsconfig.json]
{
  "compilerOptions": {
    "module": "commonjs",
    "jsx": "react-jsx",
    "incremental": true,
    "jsxImportSource": "preact"
  }
}


Output::
[96mindex.tsx[0m:[93m1[0m:[93m31[0m - [91merror[0m[90m TS2322: [0mType '{ propA: boolean; }' is not assignable to type '{ propB?: boolean; }'.
  Property 'propA' does not exist on type '{ propB?: boolean; }'. Did you mean 'propB'?

[7m1[0m export const App = () => <div propA={true}></div>;
[7m [0m [91m                              ~~~~~[0m

../../../../home/src/tslibs/TS/Lib/lib.d.ts
  Default library for target 'es5'
node_modules/preact/jsx-runtime/index.d.ts
  Imported via "preact/jsx-runtime" from file 'index.tsx' with packageId 'preact/jsx-runtime/index.d.ts@0.0.1' to import 'jsx' and 'jsxs' factory functions
index.tsx
  Matched by default include pattern '**/*'

Found 1 error in index.tsx[90m:1[0m



//// [/users/username/projects/project/index.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.App = void 0;
var jsx_runtime_1 = require("preact/jsx-runtime");
var App = function () { return (0, jsx_runtime_1.jsx)("div", { propA: true }); };
exports.App = App;


//// [/users/username/projects/project/tsconfig.tsbuildinfo]
{"fileNames":["../../../../home/src/tslibs/ts/lib/lib.d.ts","./node_modules/preact/jsx-runtime/index.d.ts","./index.tsx"],"fileIdsList":[[2]],"fileInfos":[{"version":"3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true},{"version":"-17896129664-export namespace JSX {\n    interface Element {}\n    interface IntrinsicElements {\n        div: {\n            propB?: boolean;\n        };\n    }\n}\nexport function jsx(...args: any[]): void;\nexport function jsxs(...args: any[]): void;\nexport const Fragment: unique symbol;\n","impliedFormat":1},{"version":"-14760199789-export const App = () => <div propA={true}></div>;","signature":"-8162467991-export declare const App: () => import(\"preact/jsx-runtime\").JSX.Element;\n"}],"root":[3],"options":{"jsx":4,"jsxImportSource":"preact","module":1},"referencedMap":[[3,1]],"semanticDiagnosticsPerFile":[[3,[{"start":30,"length":5,"code":2322,"category":1,"messageText":{"messageText":"Type '{ propA: boolean; }' is not assignable to type '{ propB?: boolean; }'.","category":1,"code":2322,"next":[{"messageText":"Property 'propA' does not exist on type '{ propB?: boolean; }'. Did you mean 'propB'?","category":1,"code":2551}]}}]]],"version":"FakeTSVersion"}

//// [/users/username/projects/project/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "fileNames": [
    "../../../../home/src/tslibs/ts/lib/lib.d.ts",
    "./node_modules/preact/jsx-runtime/index.d.ts",
    "./index.tsx"
  ],
  "fileIdsList": [
    [
      "./node_modules/preact/jsx-runtime/index.d.ts"
    ]
  ],
  "fileInfos": {
    "../../../../home/src/tslibs/ts/lib/lib.d.ts": {
      "original": {
        "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "affectsGlobalScope": true
      },
      "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
      "signature": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
      "affectsGlobalScope": true
    },
    "./node_modules/preact/jsx-runtime/index.d.ts": {
      "original": {
        "version": "-17896129664-export namespace JSX {\n    interface Element {}\n    interface IntrinsicElements {\n        div: {\n            propB?: boolean;\n        };\n    }\n}\nexport function jsx(...args: any[]): void;\nexport function jsxs(...args: any[]): void;\nexport const Fragment: unique symbol;\n",
        "impliedFormat": 1
      },
      "version": "-17896129664-export namespace JSX {\n    interface Element {}\n    interface IntrinsicElements {\n        div: {\n            propB?: boolean;\n        };\n    }\n}\nexport function jsx(...args: any[]): void;\nexport function jsxs(...args: any[]): void;\nexport const Fragment: unique symbol;\n",
      "signature": "-17896129664-export namespace JSX {\n    interface Element {}\n    interface IntrinsicElements {\n        div: {\n            propB?: boolean;\n        };\n    }\n}\nexport function jsx(...args: any[]): void;\nexport function jsxs(...args: any[]): void;\nexport const Fragment: unique symbol;\n",
      "impliedFormat": "commonjs"
    },
    "./index.tsx": {
      "original": {
        "version": "-14760199789-export const App = () => <div propA={true}></div>;",
        "signature": "-8162467991-export declare const App: () => import(\"preact/jsx-runtime\").JSX.Element;\n"
      },
      "version": "-14760199789-export const App = () => <div propA={true}></div>;",
      "signature": "-8162467991-export declare const App: () => import(\"preact/jsx-runtime\").JSX.Element;\n"
    }
  },
  "root": [
    [
      3,
      "./index.tsx"
    ]
  ],
  "options": {
    "jsx": 4,
    "jsxImportSource": "preact",
    "module": 1
  },
  "referencedMap": {
    "./index.tsx": [
      "./node_modules/preact/jsx-runtime/index.d.ts"
    ]
  },
  "semanticDiagnosticsPerFile": [
    [
      "./index.tsx",
      [
        {
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
    ]
  ],
  "version": "FakeTSVersion",
  "size": 1621
}


Program root files: [
  "/users/username/projects/project/index.tsx"
]
Program options: {
  "module": 1,
  "jsx": 4,
  "incremental": true,
  "jsxImportSource": "preact",
  "explainFiles": true,
  "configFilePath": "/users/username/projects/project/tsconfig.json"
}
Program structureReused: Not
Program files::
/home/src/tslibs/TS/Lib/lib.d.ts
/users/username/projects/project/node_modules/preact/jsx-runtime/index.d.ts
/users/username/projects/project/index.tsx

Semantic diagnostics in builder refreshed for::
/home/src/tslibs/TS/Lib/lib.d.ts
/users/username/projects/project/node_modules/preact/jsx-runtime/index.d.ts
/users/username/projects/project/index.tsx

Shape signatures in builder refreshed for::
/users/username/projects/project/node_modules/preact/jsx-runtime/index.d.ts (used version)
/users/username/projects/project/index.tsx (computed .d.ts)

exitCode:: ExitStatus.DiagnosticsPresent_OutputsGenerated
