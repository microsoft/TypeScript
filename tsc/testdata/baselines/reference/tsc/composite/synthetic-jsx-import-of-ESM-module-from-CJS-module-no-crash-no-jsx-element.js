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
//// [/home/src/projects/project/src/main.ts] *new* 
export default 42;
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
ExitStatus:: Success
Output::
//// [/home/src/projects/project/src/main.d.ts] *new* 
declare const _default: number;
export default _default;

//// [/home/src/projects/project/src/main.js] *new* 
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = 42;

//// [/home/src/projects/project/tsconfig.tsbuildinfo] *new* 
{"version":"FakeTSVersion","root":[3],"fileNames":["lib.es2022.full.d.ts","./node_modules/solid-js/jsx-runtime.d.ts","./src/main.ts"],"fileInfos":[{"version":"8859c12c614ce56ba9a18e58384a198f-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ninterface SymbolConstructor {\n    (desc?: string | number): symbol;\n    for(name: string): symbol;\n    readonly toStringTag: symbol;\n}\ndeclare var Symbol: SymbolConstructor;\ninterface Symbol {\n    readonly [Symbol.toStringTag]: string;\n}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true,"impliedNodeFormat":1},{"version":"00e459cbb1596f8c4bdf988b0589433f-export namespace JSX {\n    type IntrinsicElements = { div: {}; };\n}","impliedNodeFormat":99},{"version":"666fdc0c7a7f134c8c14dc85be1ebc28-export default 42;","signature":"18ae69a2c0b372747b9973ad9c14a1e0-declare const _default: number;\nexport default _default;\n","impliedNodeFormat":1}],"options":{"composite":true,"jsx":4,"jsxImportSource":"solid-js","module":100},"latestChangedDtsFile":"./src/main.d.ts"}
//// [/home/src/projects/project/tsconfig.tsbuildinfo.readable.baseline.txt] *new* 
{
  "version": "FakeTSVersion",
  "root": [
    {
      "files": [
        "./src/main.ts"
      ],
      "original": 3
    }
  ],
  "fileNames": [
    "lib.es2022.full.d.ts",
    "./node_modules/solid-js/jsx-runtime.d.ts",
    "./src/main.ts"
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
      "fileName": "./src/main.ts",
      "version": "666fdc0c7a7f134c8c14dc85be1ebc28-export default 42;",
      "signature": "18ae69a2c0b372747b9973ad9c14a1e0-declare const _default: number;\nexport default _default;\n",
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "666fdc0c7a7f134c8c14dc85be1ebc28-export default 42;",
        "signature": "18ae69a2c0b372747b9973ad9c14a1e0-declare const _default: number;\nexport default _default;\n",
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
  "latestChangedDtsFile": "./src/main.d.ts",
  "size": 1373
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
*refresh*    /home/src/projects/project/src/main.ts
Signatures::
(stored at emit) /home/src/projects/project/src/main.ts
