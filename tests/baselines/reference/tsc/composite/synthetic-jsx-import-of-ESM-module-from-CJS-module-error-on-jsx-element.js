currentDirectory:: /home/src/projects/project useCaseSensitiveFileNames:: false
Input::
//// [/home/src/projects/project/src/main.tsx]
export default <div/>;

//// [/home/src/projects/project/tsconfig.json]
{
  "compilerOptions": {
    "composite": true,
    "module": "Node16",
    "jsx": "react-jsx",
    "jsxImportSource": "solid-js"
  }
}

//// [/home/src/projects/project/node_modules/solid-js/package.json]
{
  "name": "solid-js",
  "type": "module"
}

//// [/home/src/projects/project/node_modules/solid-js/jsx-runtime.d.ts]
export namespace JSX {
    type IntrinsicElements = { div: {}; };
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


/home/src/tslibs/TS/Lib/tsc.js 
Output::
[96msrc/main.tsx[0m:[93m1[0m:[93m16[0m - [91merror[0m[90m TS1479: [0mThe current file is a CommonJS module whose imports will produce 'require' calls; however, the referenced file is an ECMAScript module and cannot be imported with 'require'. Consider writing a dynamic 'import("solid-js/jsx-runtime")' call instead.
  To convert this file to an ECMAScript module, create a local package.json file with `{ "type": "module" }`.

[7m1[0m export default <div/>;
[7m [0m [91m               ~~~~~~[0m


Found 1 error in src/main.tsx[90m:1[0m



//// [/home/src/tslibs/TS/Lib/lib.es2022.full.d.ts] *Lib*

//// [/home/src/projects/project/src/main.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("solid-js/jsx-runtime");
exports.default = (0, jsx_runtime_1.jsx)("div", {});


//// [/home/src/projects/project/src/main.d.ts]
declare const _default: any;
export default _default;


//// [/home/src/projects/project/tsconfig.tsbuildinfo]
{"fileNames":["../../tslibs/ts/lib/lib.es2022.full.d.ts","./node_modules/solid-js/jsx-runtime.d.ts","./src/main.tsx"],"fileIdsList":[[2]],"fileInfos":[{"version":"3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true,"impliedFormat":1},{"version":"-3511680495-export namespace JSX {\n    type IntrinsicElements = { div: {}; };\n}\n","impliedFormat":99},{"version":"-359851309-export default <div/>;","signature":"2119670487-declare const _default: any;\nexport default _default;\n","impliedFormat":1}],"root":[3],"options":{"composite":true,"jsx":4,"jsxImportSource":"solid-js","module":100},"referencedMap":[[3,1]],"semanticDiagnosticsPerFile":[[3,[{"start":15,"length":6,"code":1479,"category":1,"messageText":{"messageText":"The current file is a CommonJS module whose imports will produce 'require' calls; however, the referenced file is an ECMAScript module and cannot be imported with 'require'. Consider writing a dynamic 'import(\"solid-js/jsx-runtime\")' call instead.","category":1,"code":1479,"next":[{"info":true}]}}]]],"latestChangedDtsFile":"./src/main.d.ts","version":"FakeTSVersion"}

//// [/home/src/projects/project/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "fileNames": [
    "../../tslibs/ts/lib/lib.es2022.full.d.ts",
    "./node_modules/solid-js/jsx-runtime.d.ts",
    "./src/main.tsx"
  ],
  "fileIdsList": [
    [
      "./node_modules/solid-js/jsx-runtime.d.ts"
    ]
  ],
  "fileInfos": {
    "../../tslibs/ts/lib/lib.es2022.full.d.ts": {
      "original": {
        "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "affectsGlobalScope": true,
        "impliedFormat": 1
      },
      "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
      "signature": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
      "affectsGlobalScope": true,
      "impliedFormat": "commonjs"
    },
    "./node_modules/solid-js/jsx-runtime.d.ts": {
      "original": {
        "version": "-3511680495-export namespace JSX {\n    type IntrinsicElements = { div: {}; };\n}\n",
        "impliedFormat": 99
      },
      "version": "-3511680495-export namespace JSX {\n    type IntrinsicElements = { div: {}; };\n}\n",
      "signature": "-3511680495-export namespace JSX {\n    type IntrinsicElements = { div: {}; };\n}\n",
      "impliedFormat": "esnext"
    },
    "./src/main.tsx": {
      "original": {
        "version": "-359851309-export default <div/>;",
        "signature": "2119670487-declare const _default: any;\nexport default _default;\n",
        "impliedFormat": 1
      },
      "version": "-359851309-export default <div/>;",
      "signature": "2119670487-declare const _default: any;\nexport default _default;\n",
      "impliedFormat": "commonjs"
    }
  },
  "root": [
    [
      3,
      "./src/main.tsx"
    ]
  ],
  "options": {
    "composite": true,
    "jsx": 4,
    "jsxImportSource": "solid-js",
    "module": 100
  },
  "referencedMap": {
    "./src/main.tsx": [
      "./node_modules/solid-js/jsx-runtime.d.ts"
    ]
  },
  "semanticDiagnosticsPerFile": [
    [
      "./src/main.tsx",
      [
        {
          "start": 15,
          "length": 6,
          "code": 1479,
          "category": 1,
          "messageText": {
            "messageText": "The current file is a CommonJS module whose imports will produce 'require' calls; however, the referenced file is an ECMAScript module and cannot be imported with 'require'. Consider writing a dynamic 'import(\"solid-js/jsx-runtime\")' call instead.",
            "category": 1,
            "code": 1479,
            "next": [
              {
                "info": true
              }
            ]
          }
        }
      ]
    ]
  ],
  "latestChangedDtsFile": "./src/main.d.ts",
  "version": "FakeTSVersion",
  "size": 1511
}


exitCode:: ExitStatus.DiagnosticsPresent_OutputsGenerated
