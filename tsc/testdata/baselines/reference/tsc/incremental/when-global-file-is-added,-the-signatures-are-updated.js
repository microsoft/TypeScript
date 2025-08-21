currentDirectory::/home/src/workspaces/project
useCaseSensitiveFileNames::true
Input::
//// [/home/src/workspaces/project/src/anotherFileWithSameReferenes.ts] *new* 
/// <reference path="./filePresent.ts"/>
/// <reference path="./fileNotFound.ts"/>
function anotherFileWithSameReferenes() { }
//// [/home/src/workspaces/project/src/filePresent.ts] *new* 
function something() { return 10; }
//// [/home/src/workspaces/project/src/main.ts] *new* 
/// <reference path="./filePresent.ts"/>
/// <reference path="./fileNotFound.ts"/>
function main() { }
//// [/home/src/workspaces/project/tsconfig.json] *new* 
{
    "compilerOptions": { "composite": true },
    "include": ["src/**/*.ts"],
}

tsgo 
ExitStatus:: Success
Output::
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
//// [/home/src/workspaces/project/src/anotherFileWithSameReferenes.d.ts] *new* 
declare function anotherFileWithSameReferenes(): void;

//// [/home/src/workspaces/project/src/anotherFileWithSameReferenes.js] *new* 
/// <reference path="./filePresent.ts"/>
/// <reference path="./fileNotFound.ts"/>
function anotherFileWithSameReferenes() { }

//// [/home/src/workspaces/project/src/filePresent.d.ts] *new* 
declare function something(): number;

//// [/home/src/workspaces/project/src/filePresent.js] *new* 
function something() { return 10; }

//// [/home/src/workspaces/project/src/main.d.ts] *new* 
declare function main(): void;

//// [/home/src/workspaces/project/src/main.js] *new* 
/// <reference path="./filePresent.ts"/>
/// <reference path="./fileNotFound.ts"/>
function main() { }

//// [/home/src/workspaces/project/tsconfig.tsbuildinfo] *new* 
{"version":"FakeTSVersion","root":[[2,4]],"fileNames":["lib.d.ts","./src/filePresent.ts","./src/anotherFileWithSameReferenes.ts","./src/main.ts","./src/fileNotFound.ts"],"fileInfos":[{"version":"8859c12c614ce56ba9a18e58384a198f-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ninterface SymbolConstructor {\n    (desc?: string | number): symbol;\n    for(name: string): symbol;\n    readonly toStringTag: symbol;\n}\ndeclare var Symbol: SymbolConstructor;\ninterface Symbol {\n    readonly [Symbol.toStringTag]: string;\n}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true,"impliedNodeFormat":1},{"version":"90fb0189e81698eb72c5c92453cf2ab4-function something() { return 10; }","signature":"427bfa05de25170a9630b13346cde60c-declare function something(): number;\n","affectsGlobalScope":true,"impliedNodeFormat":1},{"version":"e70a47c0753d68cebbf1d60d9abf7212-/// <reference path=\"./filePresent.ts\"/>\n/// <reference path=\"./fileNotFound.ts\"/>\nfunction anotherFileWithSameReferenes() { }","signature":"d30ad74c2e698ad06cc29f2ea6d12014-declare function anotherFileWithSameReferenes(): void;\n","affectsGlobalScope":true,"impliedNodeFormat":1},{"version":"4e3124823e3ef0a7f1ce70b317b1e4c8-/// <reference path=\"./filePresent.ts\"/>\n/// <reference path=\"./fileNotFound.ts\"/>\nfunction main() { }","signature":"50f7afe296d55bfece856bfb6f7ad6c9-declare function main(): void;\n","affectsGlobalScope":true,"impliedNodeFormat":1}],"fileIdsList":[[2,5]],"options":{"composite":true},"referencedMap":[[3,1],[4,1]],"latestChangedDtsFile":"./src/main.d.ts"}
//// [/home/src/workspaces/project/tsconfig.tsbuildinfo.readable.baseline.txt] *new* 
{
  "version": "FakeTSVersion",
  "root": [
    {
      "files": [
        "./src/filePresent.ts",
        "./src/anotherFileWithSameReferenes.ts",
        "./src/main.ts"
      ],
      "original": [
        2,
        4
      ]
    }
  ],
  "fileNames": [
    "lib.d.ts",
    "./src/filePresent.ts",
    "./src/anotherFileWithSameReferenes.ts",
    "./src/main.ts",
    "./src/fileNotFound.ts"
  ],
  "fileInfos": [
    {
      "fileName": "lib.d.ts",
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
      "fileName": "./src/filePresent.ts",
      "version": "90fb0189e81698eb72c5c92453cf2ab4-function something() { return 10; }",
      "signature": "427bfa05de25170a9630b13346cde60c-declare function something(): number;\n",
      "affectsGlobalScope": true,
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "90fb0189e81698eb72c5c92453cf2ab4-function something() { return 10; }",
        "signature": "427bfa05de25170a9630b13346cde60c-declare function something(): number;\n",
        "affectsGlobalScope": true,
        "impliedNodeFormat": 1
      }
    },
    {
      "fileName": "./src/anotherFileWithSameReferenes.ts",
      "version": "e70a47c0753d68cebbf1d60d9abf7212-/// <reference path=\"./filePresent.ts\"/>\n/// <reference path=\"./fileNotFound.ts\"/>\nfunction anotherFileWithSameReferenes() { }",
      "signature": "d30ad74c2e698ad06cc29f2ea6d12014-declare function anotherFileWithSameReferenes(): void;\n",
      "affectsGlobalScope": true,
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "e70a47c0753d68cebbf1d60d9abf7212-/// <reference path=\"./filePresent.ts\"/>\n/// <reference path=\"./fileNotFound.ts\"/>\nfunction anotherFileWithSameReferenes() { }",
        "signature": "d30ad74c2e698ad06cc29f2ea6d12014-declare function anotherFileWithSameReferenes(): void;\n",
        "affectsGlobalScope": true,
        "impliedNodeFormat": 1
      }
    },
    {
      "fileName": "./src/main.ts",
      "version": "4e3124823e3ef0a7f1ce70b317b1e4c8-/// <reference path=\"./filePresent.ts\"/>\n/// <reference path=\"./fileNotFound.ts\"/>\nfunction main() { }",
      "signature": "50f7afe296d55bfece856bfb6f7ad6c9-declare function main(): void;\n",
      "affectsGlobalScope": true,
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "4e3124823e3ef0a7f1ce70b317b1e4c8-/// <reference path=\"./filePresent.ts\"/>\n/// <reference path=\"./fileNotFound.ts\"/>\nfunction main() { }",
        "signature": "50f7afe296d55bfece856bfb6f7ad6c9-declare function main(): void;\n",
        "affectsGlobalScope": true,
        "impliedNodeFormat": 1
      }
    }
  ],
  "fileIdsList": [
    [
      "./src/filePresent.ts",
      "./src/fileNotFound.ts"
    ]
  ],
  "options": {
    "composite": true
  },
  "referencedMap": {
    "./src/anotherFileWithSameReferenes.ts": [
      "./src/filePresent.ts",
      "./src/fileNotFound.ts"
    ],
    "./src/main.ts": [
      "./src/filePresent.ts",
      "./src/fileNotFound.ts"
    ]
  },
  "latestChangedDtsFile": "./src/main.d.ts",
  "size": 1910
}

tsconfig.json::
SemanticDiagnostics::
*refresh*    /home/src/tslibs/TS/Lib/lib.d.ts
*refresh*    /home/src/workspaces/project/src/filePresent.ts
*refresh*    /home/src/workspaces/project/src/anotherFileWithSameReferenes.ts
*refresh*    /home/src/workspaces/project/src/main.ts
Signatures::
(stored at emit) /home/src/workspaces/project/src/filePresent.ts
(stored at emit) /home/src/workspaces/project/src/anotherFileWithSameReferenes.ts
(stored at emit) /home/src/workspaces/project/src/main.ts


Edit [0]:: no change

tsgo 
ExitStatus:: Success
Output::

tsconfig.json::
SemanticDiagnostics::
Signatures::


Edit [1]:: Modify main file
//// [/home/src/workspaces/project/src/main.ts] *modified* 
/// <reference path="./filePresent.ts"/>
/// <reference path="./fileNotFound.ts"/>
function main() { }something();

tsgo 
ExitStatus:: Success
Output::
//// [/home/src/workspaces/project/src/main.js] *modified* 
/// <reference path="./filePresent.ts"/>
/// <reference path="./fileNotFound.ts"/>
function main() { }
something();

//// [/home/src/workspaces/project/tsconfig.tsbuildinfo] *modified* 
{"version":"FakeTSVersion","root":[[2,4]],"fileNames":["lib.d.ts","./src/filePresent.ts","./src/anotherFileWithSameReferenes.ts","./src/main.ts","./src/fileNotFound.ts"],"fileInfos":[{"version":"8859c12c614ce56ba9a18e58384a198f-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ninterface SymbolConstructor {\n    (desc?: string | number): symbol;\n    for(name: string): symbol;\n    readonly toStringTag: symbol;\n}\ndeclare var Symbol: SymbolConstructor;\ninterface Symbol {\n    readonly [Symbol.toStringTag]: string;\n}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true,"impliedNodeFormat":1},{"version":"90fb0189e81698eb72c5c92453cf2ab4-function something() { return 10; }","signature":"427bfa05de25170a9630b13346cde60c-declare function something(): number;\n","affectsGlobalScope":true,"impliedNodeFormat":1},{"version":"e70a47c0753d68cebbf1d60d9abf7212-/// <reference path=\"./filePresent.ts\"/>\n/// <reference path=\"./fileNotFound.ts\"/>\nfunction anotherFileWithSameReferenes() { }","signature":"d30ad74c2e698ad06cc29f2ea6d12014-declare function anotherFileWithSameReferenes(): void;\n","affectsGlobalScope":true,"impliedNodeFormat":1},{"version":"9ece2abeadfdd790ae17f754892e8402-/// <reference path=\"./filePresent.ts\"/>\n/// <reference path=\"./fileNotFound.ts\"/>\nfunction main() { }something();","signature":"50f7afe296d55bfece856bfb6f7ad6c9-declare function main(): void;\n","affectsGlobalScope":true,"impliedNodeFormat":1}],"fileIdsList":[[2,5]],"options":{"composite":true},"referencedMap":[[3,1],[4,1]],"latestChangedDtsFile":"./src/main.d.ts"}
//// [/home/src/workspaces/project/tsconfig.tsbuildinfo.readable.baseline.txt] *modified* 
{
  "version": "FakeTSVersion",
  "root": [
    {
      "files": [
        "./src/filePresent.ts",
        "./src/anotherFileWithSameReferenes.ts",
        "./src/main.ts"
      ],
      "original": [
        2,
        4
      ]
    }
  ],
  "fileNames": [
    "lib.d.ts",
    "./src/filePresent.ts",
    "./src/anotherFileWithSameReferenes.ts",
    "./src/main.ts",
    "./src/fileNotFound.ts"
  ],
  "fileInfos": [
    {
      "fileName": "lib.d.ts",
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
      "fileName": "./src/filePresent.ts",
      "version": "90fb0189e81698eb72c5c92453cf2ab4-function something() { return 10; }",
      "signature": "427bfa05de25170a9630b13346cde60c-declare function something(): number;\n",
      "affectsGlobalScope": true,
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "90fb0189e81698eb72c5c92453cf2ab4-function something() { return 10; }",
        "signature": "427bfa05de25170a9630b13346cde60c-declare function something(): number;\n",
        "affectsGlobalScope": true,
        "impliedNodeFormat": 1
      }
    },
    {
      "fileName": "./src/anotherFileWithSameReferenes.ts",
      "version": "e70a47c0753d68cebbf1d60d9abf7212-/// <reference path=\"./filePresent.ts\"/>\n/// <reference path=\"./fileNotFound.ts\"/>\nfunction anotherFileWithSameReferenes() { }",
      "signature": "d30ad74c2e698ad06cc29f2ea6d12014-declare function anotherFileWithSameReferenes(): void;\n",
      "affectsGlobalScope": true,
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "e70a47c0753d68cebbf1d60d9abf7212-/// <reference path=\"./filePresent.ts\"/>\n/// <reference path=\"./fileNotFound.ts\"/>\nfunction anotherFileWithSameReferenes() { }",
        "signature": "d30ad74c2e698ad06cc29f2ea6d12014-declare function anotherFileWithSameReferenes(): void;\n",
        "affectsGlobalScope": true,
        "impliedNodeFormat": 1
      }
    },
    {
      "fileName": "./src/main.ts",
      "version": "9ece2abeadfdd790ae17f754892e8402-/// <reference path=\"./filePresent.ts\"/>\n/// <reference path=\"./fileNotFound.ts\"/>\nfunction main() { }something();",
      "signature": "50f7afe296d55bfece856bfb6f7ad6c9-declare function main(): void;\n",
      "affectsGlobalScope": true,
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "9ece2abeadfdd790ae17f754892e8402-/// <reference path=\"./filePresent.ts\"/>\n/// <reference path=\"./fileNotFound.ts\"/>\nfunction main() { }something();",
        "signature": "50f7afe296d55bfece856bfb6f7ad6c9-declare function main(): void;\n",
        "affectsGlobalScope": true,
        "impliedNodeFormat": 1
      }
    }
  ],
  "fileIdsList": [
    [
      "./src/filePresent.ts",
      "./src/fileNotFound.ts"
    ]
  ],
  "options": {
    "composite": true
  },
  "referencedMap": {
    "./src/anotherFileWithSameReferenes.ts": [
      "./src/filePresent.ts",
      "./src/fileNotFound.ts"
    ],
    "./src/main.ts": [
      "./src/filePresent.ts",
      "./src/fileNotFound.ts"
    ]
  },
  "latestChangedDtsFile": "./src/main.d.ts",
  "size": 1922
}

tsconfig.json::
SemanticDiagnostics::
*refresh*    /home/src/workspaces/project/src/main.ts
Signatures::
(computed .d.ts) /home/src/workspaces/project/src/main.ts


Edit [2]:: Modify main file again
//// [/home/src/workspaces/project/src/main.ts] *modified* 
/// <reference path="./filePresent.ts"/>
/// <reference path="./fileNotFound.ts"/>
function main() { }something();something();

tsgo 
ExitStatus:: Success
Output::
//// [/home/src/workspaces/project/src/main.js] *modified* 
/// <reference path="./filePresent.ts"/>
/// <reference path="./fileNotFound.ts"/>
function main() { }
something();
something();

//// [/home/src/workspaces/project/tsconfig.tsbuildinfo] *modified* 
{"version":"FakeTSVersion","root":[[2,4]],"fileNames":["lib.d.ts","./src/filePresent.ts","./src/anotherFileWithSameReferenes.ts","./src/main.ts","./src/fileNotFound.ts"],"fileInfos":[{"version":"8859c12c614ce56ba9a18e58384a198f-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ninterface SymbolConstructor {\n    (desc?: string | number): symbol;\n    for(name: string): symbol;\n    readonly toStringTag: symbol;\n}\ndeclare var Symbol: SymbolConstructor;\ninterface Symbol {\n    readonly [Symbol.toStringTag]: string;\n}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true,"impliedNodeFormat":1},{"version":"90fb0189e81698eb72c5c92453cf2ab4-function something() { return 10; }","signature":"427bfa05de25170a9630b13346cde60c-declare function something(): number;\n","affectsGlobalScope":true,"impliedNodeFormat":1},{"version":"e70a47c0753d68cebbf1d60d9abf7212-/// <reference path=\"./filePresent.ts\"/>\n/// <reference path=\"./fileNotFound.ts\"/>\nfunction anotherFileWithSameReferenes() { }","signature":"d30ad74c2e698ad06cc29f2ea6d12014-declare function anotherFileWithSameReferenes(): void;\n","affectsGlobalScope":true,"impliedNodeFormat":1},{"version":"1077a6c3f5daec777c602b0aac3793b9-/// <reference path=\"./filePresent.ts\"/>\n/// <reference path=\"./fileNotFound.ts\"/>\nfunction main() { }something();something();","signature":"50f7afe296d55bfece856bfb6f7ad6c9-declare function main(): void;\n","affectsGlobalScope":true,"impliedNodeFormat":1}],"fileIdsList":[[2,5]],"options":{"composite":true},"referencedMap":[[3,1],[4,1]],"latestChangedDtsFile":"./src/main.d.ts"}
//// [/home/src/workspaces/project/tsconfig.tsbuildinfo.readable.baseline.txt] *modified* 
{
  "version": "FakeTSVersion",
  "root": [
    {
      "files": [
        "./src/filePresent.ts",
        "./src/anotherFileWithSameReferenes.ts",
        "./src/main.ts"
      ],
      "original": [
        2,
        4
      ]
    }
  ],
  "fileNames": [
    "lib.d.ts",
    "./src/filePresent.ts",
    "./src/anotherFileWithSameReferenes.ts",
    "./src/main.ts",
    "./src/fileNotFound.ts"
  ],
  "fileInfos": [
    {
      "fileName": "lib.d.ts",
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
      "fileName": "./src/filePresent.ts",
      "version": "90fb0189e81698eb72c5c92453cf2ab4-function something() { return 10; }",
      "signature": "427bfa05de25170a9630b13346cde60c-declare function something(): number;\n",
      "affectsGlobalScope": true,
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "90fb0189e81698eb72c5c92453cf2ab4-function something() { return 10; }",
        "signature": "427bfa05de25170a9630b13346cde60c-declare function something(): number;\n",
        "affectsGlobalScope": true,
        "impliedNodeFormat": 1
      }
    },
    {
      "fileName": "./src/anotherFileWithSameReferenes.ts",
      "version": "e70a47c0753d68cebbf1d60d9abf7212-/// <reference path=\"./filePresent.ts\"/>\n/// <reference path=\"./fileNotFound.ts\"/>\nfunction anotherFileWithSameReferenes() { }",
      "signature": "d30ad74c2e698ad06cc29f2ea6d12014-declare function anotherFileWithSameReferenes(): void;\n",
      "affectsGlobalScope": true,
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "e70a47c0753d68cebbf1d60d9abf7212-/// <reference path=\"./filePresent.ts\"/>\n/// <reference path=\"./fileNotFound.ts\"/>\nfunction anotherFileWithSameReferenes() { }",
        "signature": "d30ad74c2e698ad06cc29f2ea6d12014-declare function anotherFileWithSameReferenes(): void;\n",
        "affectsGlobalScope": true,
        "impliedNodeFormat": 1
      }
    },
    {
      "fileName": "./src/main.ts",
      "version": "1077a6c3f5daec777c602b0aac3793b9-/// <reference path=\"./filePresent.ts\"/>\n/// <reference path=\"./fileNotFound.ts\"/>\nfunction main() { }something();something();",
      "signature": "50f7afe296d55bfece856bfb6f7ad6c9-declare function main(): void;\n",
      "affectsGlobalScope": true,
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "1077a6c3f5daec777c602b0aac3793b9-/// <reference path=\"./filePresent.ts\"/>\n/// <reference path=\"./fileNotFound.ts\"/>\nfunction main() { }something();something();",
        "signature": "50f7afe296d55bfece856bfb6f7ad6c9-declare function main(): void;\n",
        "affectsGlobalScope": true,
        "impliedNodeFormat": 1
      }
    }
  ],
  "fileIdsList": [
    [
      "./src/filePresent.ts",
      "./src/fileNotFound.ts"
    ]
  ],
  "options": {
    "composite": true
  },
  "referencedMap": {
    "./src/anotherFileWithSameReferenes.ts": [
      "./src/filePresent.ts",
      "./src/fileNotFound.ts"
    ],
    "./src/main.ts": [
      "./src/filePresent.ts",
      "./src/fileNotFound.ts"
    ]
  },
  "latestChangedDtsFile": "./src/main.d.ts",
  "size": 1934
}

tsconfig.json::
SemanticDiagnostics::
*refresh*    /home/src/workspaces/project/src/main.ts
Signatures::
(computed .d.ts) /home/src/workspaces/project/src/main.ts


Edit [3]:: Add new file and update main file
//// [/home/src/workspaces/project/src/main.ts] *modified* 
/// <reference path="./newFile.ts"/>
/// <reference path="./filePresent.ts"/>
/// <reference path="./fileNotFound.ts"/>
function main() { }something();something();foo();
//// [/home/src/workspaces/project/src/newFile.ts] *new* 
function foo() { return 20; }

tsgo 
ExitStatus:: Success
Output::
//// [/home/src/workspaces/project/src/main.js] *modified* 
/// <reference path="./newFile.ts"/>
/// <reference path="./filePresent.ts"/>
/// <reference path="./fileNotFound.ts"/>
function main() { }
something();
something();
foo();

//// [/home/src/workspaces/project/src/newFile.d.ts] *new* 
declare function foo(): number;

//// [/home/src/workspaces/project/src/newFile.js] *new* 
function foo() { return 20; }

//// [/home/src/workspaces/project/tsconfig.tsbuildinfo] *modified* 
{"version":"FakeTSVersion","root":[[2,5]],"fileNames":["lib.d.ts","./src/filePresent.ts","./src/anotherFileWithSameReferenes.ts","./src/newFile.ts","./src/main.ts","./src/fileNotFound.ts"],"fileInfos":[{"version":"8859c12c614ce56ba9a18e58384a198f-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ninterface SymbolConstructor {\n    (desc?: string | number): symbol;\n    for(name: string): symbol;\n    readonly toStringTag: symbol;\n}\ndeclare var Symbol: SymbolConstructor;\ninterface Symbol {\n    readonly [Symbol.toStringTag]: string;\n}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true,"impliedNodeFormat":1},{"version":"90fb0189e81698eb72c5c92453cf2ab4-function something() { return 10; }","signature":"427bfa05de25170a9630b13346cde60c-declare function something(): number;\n","affectsGlobalScope":true,"impliedNodeFormat":1},{"version":"e70a47c0753d68cebbf1d60d9abf7212-/// <reference path=\"./filePresent.ts\"/>\n/// <reference path=\"./fileNotFound.ts\"/>\nfunction anotherFileWithSameReferenes() { }","signature":"d30ad74c2e698ad06cc29f2ea6d12014-declare function anotherFileWithSameReferenes(): void;\n","affectsGlobalScope":true,"impliedNodeFormat":1},{"version":"cf329dc888a898a1403ba3e35c2ec68e-function foo() { return 20; }","signature":"67af86f8c5b618332b620488f3be2c41-declare function foo(): number;\n","affectsGlobalScope":true,"impliedNodeFormat":1},{"version":"bc6af6fddab57e87e44b7bf54d933e49-/// <reference path=\"./newFile.ts\"/>\n/// <reference path=\"./filePresent.ts\"/>\n/// <reference path=\"./fileNotFound.ts\"/>\nfunction main() { }something();something();foo();","signature":"50f7afe296d55bfece856bfb6f7ad6c9-declare function main(): void;\n","affectsGlobalScope":true,"impliedNodeFormat":1}],"fileIdsList":[[2,6],[2,4,6]],"options":{"composite":true},"referencedMap":[[3,1],[5,2]],"latestChangedDtsFile":"./src/newFile.d.ts"}
//// [/home/src/workspaces/project/tsconfig.tsbuildinfo.readable.baseline.txt] *modified* 
{
  "version": "FakeTSVersion",
  "root": [
    {
      "files": [
        "./src/filePresent.ts",
        "./src/anotherFileWithSameReferenes.ts",
        "./src/newFile.ts",
        "./src/main.ts"
      ],
      "original": [
        2,
        5
      ]
    }
  ],
  "fileNames": [
    "lib.d.ts",
    "./src/filePresent.ts",
    "./src/anotherFileWithSameReferenes.ts",
    "./src/newFile.ts",
    "./src/main.ts",
    "./src/fileNotFound.ts"
  ],
  "fileInfos": [
    {
      "fileName": "lib.d.ts",
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
      "fileName": "./src/filePresent.ts",
      "version": "90fb0189e81698eb72c5c92453cf2ab4-function something() { return 10; }",
      "signature": "427bfa05de25170a9630b13346cde60c-declare function something(): number;\n",
      "affectsGlobalScope": true,
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "90fb0189e81698eb72c5c92453cf2ab4-function something() { return 10; }",
        "signature": "427bfa05de25170a9630b13346cde60c-declare function something(): number;\n",
        "affectsGlobalScope": true,
        "impliedNodeFormat": 1
      }
    },
    {
      "fileName": "./src/anotherFileWithSameReferenes.ts",
      "version": "e70a47c0753d68cebbf1d60d9abf7212-/// <reference path=\"./filePresent.ts\"/>\n/// <reference path=\"./fileNotFound.ts\"/>\nfunction anotherFileWithSameReferenes() { }",
      "signature": "d30ad74c2e698ad06cc29f2ea6d12014-declare function anotherFileWithSameReferenes(): void;\n",
      "affectsGlobalScope": true,
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "e70a47c0753d68cebbf1d60d9abf7212-/// <reference path=\"./filePresent.ts\"/>\n/// <reference path=\"./fileNotFound.ts\"/>\nfunction anotherFileWithSameReferenes() { }",
        "signature": "d30ad74c2e698ad06cc29f2ea6d12014-declare function anotherFileWithSameReferenes(): void;\n",
        "affectsGlobalScope": true,
        "impliedNodeFormat": 1
      }
    },
    {
      "fileName": "./src/newFile.ts",
      "version": "cf329dc888a898a1403ba3e35c2ec68e-function foo() { return 20; }",
      "signature": "67af86f8c5b618332b620488f3be2c41-declare function foo(): number;\n",
      "affectsGlobalScope": true,
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "cf329dc888a898a1403ba3e35c2ec68e-function foo() { return 20; }",
        "signature": "67af86f8c5b618332b620488f3be2c41-declare function foo(): number;\n",
        "affectsGlobalScope": true,
        "impliedNodeFormat": 1
      }
    },
    {
      "fileName": "./src/main.ts",
      "version": "bc6af6fddab57e87e44b7bf54d933e49-/// <reference path=\"./newFile.ts\"/>\n/// <reference path=\"./filePresent.ts\"/>\n/// <reference path=\"./fileNotFound.ts\"/>\nfunction main() { }something();something();foo();",
      "signature": "50f7afe296d55bfece856bfb6f7ad6c9-declare function main(): void;\n",
      "affectsGlobalScope": true,
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "bc6af6fddab57e87e44b7bf54d933e49-/// <reference path=\"./newFile.ts\"/>\n/// <reference path=\"./filePresent.ts\"/>\n/// <reference path=\"./fileNotFound.ts\"/>\nfunction main() { }something();something();foo();",
        "signature": "50f7afe296d55bfece856bfb6f7ad6c9-declare function main(): void;\n",
        "affectsGlobalScope": true,
        "impliedNodeFormat": 1
      }
    }
  ],
  "fileIdsList": [
    [
      "./src/filePresent.ts",
      "./src/fileNotFound.ts"
    ],
    [
      "./src/filePresent.ts",
      "./src/newFile.ts",
      "./src/fileNotFound.ts"
    ]
  ],
  "options": {
    "composite": true
  },
  "referencedMap": {
    "./src/anotherFileWithSameReferenes.ts": [
      "./src/filePresent.ts",
      "./src/fileNotFound.ts"
    ],
    "./src/main.ts": [
      "./src/filePresent.ts",
      "./src/newFile.ts",
      "./src/fileNotFound.ts"
    ]
  },
  "latestChangedDtsFile": "./src/newFile.d.ts",
  "size": 2216
}

tsconfig.json::
SemanticDiagnostics::
*refresh*    /home/src/tslibs/TS/Lib/lib.d.ts
*refresh*    /home/src/workspaces/project/src/newFile.ts
*refresh*    /home/src/workspaces/project/src/main.ts
Signatures::
(computed .d.ts) /home/src/workspaces/project/src/newFile.ts
(computed .d.ts) /home/src/workspaces/project/src/main.ts


Edit [4]:: Write file that could not be resolved
//// [/home/src/workspaces/project/src/fileNotFound.ts] *new* 
function something2() { return 20; }

tsgo 
ExitStatus:: Success
Output::
//// [/home/src/workspaces/project/src/anotherFileWithSameReferenes.js] *rewrite with same content*
//// [/home/src/workspaces/project/src/fileNotFound.d.ts] *new* 
declare function something2(): number;

//// [/home/src/workspaces/project/src/fileNotFound.js] *new* 
function something2() { return 20; }

//// [/home/src/workspaces/project/src/main.js] *rewrite with same content*
//// [/home/src/workspaces/project/tsconfig.tsbuildinfo] *modified* 
{"version":"FakeTSVersion","root":[[2,6]],"fileNames":["lib.d.ts","./src/filePresent.ts","./src/fileNotFound.ts","./src/anotherFileWithSameReferenes.ts","./src/newFile.ts","./src/main.ts"],"fileInfos":[{"version":"8859c12c614ce56ba9a18e58384a198f-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ninterface SymbolConstructor {\n    (desc?: string | number): symbol;\n    for(name: string): symbol;\n    readonly toStringTag: symbol;\n}\ndeclare var Symbol: SymbolConstructor;\ninterface Symbol {\n    readonly [Symbol.toStringTag]: string;\n}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true,"impliedNodeFormat":1},{"version":"90fb0189e81698eb72c5c92453cf2ab4-function something() { return 10; }","signature":"427bfa05de25170a9630b13346cde60c-declare function something(): number;\n","affectsGlobalScope":true,"impliedNodeFormat":1},{"version":"d97745dab1d2c6dc05ce702bd0c7145d-function something2() { return 20; }","signature":"6bc942031a42ec462dd78d556924caf0-declare function something2(): number;\n","affectsGlobalScope":true,"impliedNodeFormat":1},{"version":"e70a47c0753d68cebbf1d60d9abf7212-/// <reference path=\"./filePresent.ts\"/>\n/// <reference path=\"./fileNotFound.ts\"/>\nfunction anotherFileWithSameReferenes() { }","signature":"d30ad74c2e698ad06cc29f2ea6d12014-declare function anotherFileWithSameReferenes(): void;\n","affectsGlobalScope":true,"impliedNodeFormat":1},{"version":"cf329dc888a898a1403ba3e35c2ec68e-function foo() { return 20; }","signature":"67af86f8c5b618332b620488f3be2c41-declare function foo(): number;\n","affectsGlobalScope":true,"impliedNodeFormat":1},{"version":"bc6af6fddab57e87e44b7bf54d933e49-/// <reference path=\"./newFile.ts\"/>\n/// <reference path=\"./filePresent.ts\"/>\n/// <reference path=\"./fileNotFound.ts\"/>\nfunction main() { }something();something();foo();","signature":"50f7afe296d55bfece856bfb6f7ad6c9-declare function main(): void;\n","affectsGlobalScope":true,"impliedNodeFormat":1}],"fileIdsList":[[2,3],[2,3,5]],"options":{"composite":true},"referencedMap":[[4,1],[6,2]],"latestChangedDtsFile":"./src/fileNotFound.d.ts"}
//// [/home/src/workspaces/project/tsconfig.tsbuildinfo.readable.baseline.txt] *modified* 
{
  "version": "FakeTSVersion",
  "root": [
    {
      "files": [
        "./src/filePresent.ts",
        "./src/fileNotFound.ts",
        "./src/anotherFileWithSameReferenes.ts",
        "./src/newFile.ts",
        "./src/main.ts"
      ],
      "original": [
        2,
        6
      ]
    }
  ],
  "fileNames": [
    "lib.d.ts",
    "./src/filePresent.ts",
    "./src/fileNotFound.ts",
    "./src/anotherFileWithSameReferenes.ts",
    "./src/newFile.ts",
    "./src/main.ts"
  ],
  "fileInfos": [
    {
      "fileName": "lib.d.ts",
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
      "fileName": "./src/filePresent.ts",
      "version": "90fb0189e81698eb72c5c92453cf2ab4-function something() { return 10; }",
      "signature": "427bfa05de25170a9630b13346cde60c-declare function something(): number;\n",
      "affectsGlobalScope": true,
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "90fb0189e81698eb72c5c92453cf2ab4-function something() { return 10; }",
        "signature": "427bfa05de25170a9630b13346cde60c-declare function something(): number;\n",
        "affectsGlobalScope": true,
        "impliedNodeFormat": 1
      }
    },
    {
      "fileName": "./src/fileNotFound.ts",
      "version": "d97745dab1d2c6dc05ce702bd0c7145d-function something2() { return 20; }",
      "signature": "6bc942031a42ec462dd78d556924caf0-declare function something2(): number;\n",
      "affectsGlobalScope": true,
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "d97745dab1d2c6dc05ce702bd0c7145d-function something2() { return 20; }",
        "signature": "6bc942031a42ec462dd78d556924caf0-declare function something2(): number;\n",
        "affectsGlobalScope": true,
        "impliedNodeFormat": 1
      }
    },
    {
      "fileName": "./src/anotherFileWithSameReferenes.ts",
      "version": "e70a47c0753d68cebbf1d60d9abf7212-/// <reference path=\"./filePresent.ts\"/>\n/// <reference path=\"./fileNotFound.ts\"/>\nfunction anotherFileWithSameReferenes() { }",
      "signature": "d30ad74c2e698ad06cc29f2ea6d12014-declare function anotherFileWithSameReferenes(): void;\n",
      "affectsGlobalScope": true,
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "e70a47c0753d68cebbf1d60d9abf7212-/// <reference path=\"./filePresent.ts\"/>\n/// <reference path=\"./fileNotFound.ts\"/>\nfunction anotherFileWithSameReferenes() { }",
        "signature": "d30ad74c2e698ad06cc29f2ea6d12014-declare function anotherFileWithSameReferenes(): void;\n",
        "affectsGlobalScope": true,
        "impliedNodeFormat": 1
      }
    },
    {
      "fileName": "./src/newFile.ts",
      "version": "cf329dc888a898a1403ba3e35c2ec68e-function foo() { return 20; }",
      "signature": "67af86f8c5b618332b620488f3be2c41-declare function foo(): number;\n",
      "affectsGlobalScope": true,
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "cf329dc888a898a1403ba3e35c2ec68e-function foo() { return 20; }",
        "signature": "67af86f8c5b618332b620488f3be2c41-declare function foo(): number;\n",
        "affectsGlobalScope": true,
        "impliedNodeFormat": 1
      }
    },
    {
      "fileName": "./src/main.ts",
      "version": "bc6af6fddab57e87e44b7bf54d933e49-/// <reference path=\"./newFile.ts\"/>\n/// <reference path=\"./filePresent.ts\"/>\n/// <reference path=\"./fileNotFound.ts\"/>\nfunction main() { }something();something();foo();",
      "signature": "50f7afe296d55bfece856bfb6f7ad6c9-declare function main(): void;\n",
      "affectsGlobalScope": true,
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "bc6af6fddab57e87e44b7bf54d933e49-/// <reference path=\"./newFile.ts\"/>\n/// <reference path=\"./filePresent.ts\"/>\n/// <reference path=\"./fileNotFound.ts\"/>\nfunction main() { }something();something();foo();",
        "signature": "50f7afe296d55bfece856bfb6f7ad6c9-declare function main(): void;\n",
        "affectsGlobalScope": true,
        "impliedNodeFormat": 1
      }
    }
  ],
  "fileIdsList": [
    [
      "./src/filePresent.ts",
      "./src/fileNotFound.ts"
    ],
    [
      "./src/filePresent.ts",
      "./src/fileNotFound.ts",
      "./src/newFile.ts"
    ]
  ],
  "options": {
    "composite": true
  },
  "referencedMap": {
    "./src/anotherFileWithSameReferenes.ts": [
      "./src/filePresent.ts",
      "./src/fileNotFound.ts"
    ],
    "./src/main.ts": [
      "./src/filePresent.ts",
      "./src/fileNotFound.ts",
      "./src/newFile.ts"
    ]
  },
  "latestChangedDtsFile": "./src/fileNotFound.d.ts",
  "size": 2441
}

tsconfig.json::
SemanticDiagnostics::
*refresh*    /home/src/tslibs/TS/Lib/lib.d.ts
*refresh*    /home/src/workspaces/project/src/fileNotFound.ts
*refresh*    /home/src/workspaces/project/src/anotherFileWithSameReferenes.ts
*refresh*    /home/src/workspaces/project/src/main.ts
Signatures::
(computed .d.ts) /home/src/workspaces/project/src/fileNotFound.ts
(computed .d.ts) /home/src/workspaces/project/src/anotherFileWithSameReferenes.ts
(computed .d.ts) /home/src/workspaces/project/src/main.ts


Edit [5]:: Modify main file
//// [/home/src/workspaces/project/src/main.ts] *modified* 
/// <reference path="./newFile.ts"/>
/// <reference path="./filePresent.ts"/>
/// <reference path="./fileNotFound.ts"/>
function main() { }something();something();foo();something();

tsgo 
ExitStatus:: Success
Output::
//// [/home/src/workspaces/project/src/main.js] *modified* 
/// <reference path="./newFile.ts"/>
/// <reference path="./filePresent.ts"/>
/// <reference path="./fileNotFound.ts"/>
function main() { }
something();
something();
foo();
something();

//// [/home/src/workspaces/project/tsconfig.tsbuildinfo] *modified* 
{"version":"FakeTSVersion","root":[[2,6]],"fileNames":["lib.d.ts","./src/filePresent.ts","./src/fileNotFound.ts","./src/anotherFileWithSameReferenes.ts","./src/newFile.ts","./src/main.ts"],"fileInfos":[{"version":"8859c12c614ce56ba9a18e58384a198f-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ninterface SymbolConstructor {\n    (desc?: string | number): symbol;\n    for(name: string): symbol;\n    readonly toStringTag: symbol;\n}\ndeclare var Symbol: SymbolConstructor;\ninterface Symbol {\n    readonly [Symbol.toStringTag]: string;\n}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true,"impliedNodeFormat":1},{"version":"90fb0189e81698eb72c5c92453cf2ab4-function something() { return 10; }","signature":"427bfa05de25170a9630b13346cde60c-declare function something(): number;\n","affectsGlobalScope":true,"impliedNodeFormat":1},{"version":"d97745dab1d2c6dc05ce702bd0c7145d-function something2() { return 20; }","signature":"6bc942031a42ec462dd78d556924caf0-declare function something2(): number;\n","affectsGlobalScope":true,"impliedNodeFormat":1},{"version":"e70a47c0753d68cebbf1d60d9abf7212-/// <reference path=\"./filePresent.ts\"/>\n/// <reference path=\"./fileNotFound.ts\"/>\nfunction anotherFileWithSameReferenes() { }","signature":"d30ad74c2e698ad06cc29f2ea6d12014-declare function anotherFileWithSameReferenes(): void;\n","affectsGlobalScope":true,"impliedNodeFormat":1},{"version":"cf329dc888a898a1403ba3e35c2ec68e-function foo() { return 20; }","signature":"67af86f8c5b618332b620488f3be2c41-declare function foo(): number;\n","affectsGlobalScope":true,"impliedNodeFormat":1},{"version":"789a4176bd8e2c5d9b0deb6839d8f298-/// <reference path=\"./newFile.ts\"/>\n/// <reference path=\"./filePresent.ts\"/>\n/// <reference path=\"./fileNotFound.ts\"/>\nfunction main() { }something();something();foo();something();","signature":"50f7afe296d55bfece856bfb6f7ad6c9-declare function main(): void;\n","affectsGlobalScope":true,"impliedNodeFormat":1}],"fileIdsList":[[2,3],[2,3,5]],"options":{"composite":true},"referencedMap":[[4,1],[6,2]],"latestChangedDtsFile":"./src/fileNotFound.d.ts"}
//// [/home/src/workspaces/project/tsconfig.tsbuildinfo.readable.baseline.txt] *modified* 
{
  "version": "FakeTSVersion",
  "root": [
    {
      "files": [
        "./src/filePresent.ts",
        "./src/fileNotFound.ts",
        "./src/anotherFileWithSameReferenes.ts",
        "./src/newFile.ts",
        "./src/main.ts"
      ],
      "original": [
        2,
        6
      ]
    }
  ],
  "fileNames": [
    "lib.d.ts",
    "./src/filePresent.ts",
    "./src/fileNotFound.ts",
    "./src/anotherFileWithSameReferenes.ts",
    "./src/newFile.ts",
    "./src/main.ts"
  ],
  "fileInfos": [
    {
      "fileName": "lib.d.ts",
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
      "fileName": "./src/filePresent.ts",
      "version": "90fb0189e81698eb72c5c92453cf2ab4-function something() { return 10; }",
      "signature": "427bfa05de25170a9630b13346cde60c-declare function something(): number;\n",
      "affectsGlobalScope": true,
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "90fb0189e81698eb72c5c92453cf2ab4-function something() { return 10; }",
        "signature": "427bfa05de25170a9630b13346cde60c-declare function something(): number;\n",
        "affectsGlobalScope": true,
        "impliedNodeFormat": 1
      }
    },
    {
      "fileName": "./src/fileNotFound.ts",
      "version": "d97745dab1d2c6dc05ce702bd0c7145d-function something2() { return 20; }",
      "signature": "6bc942031a42ec462dd78d556924caf0-declare function something2(): number;\n",
      "affectsGlobalScope": true,
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "d97745dab1d2c6dc05ce702bd0c7145d-function something2() { return 20; }",
        "signature": "6bc942031a42ec462dd78d556924caf0-declare function something2(): number;\n",
        "affectsGlobalScope": true,
        "impliedNodeFormat": 1
      }
    },
    {
      "fileName": "./src/anotherFileWithSameReferenes.ts",
      "version": "e70a47c0753d68cebbf1d60d9abf7212-/// <reference path=\"./filePresent.ts\"/>\n/// <reference path=\"./fileNotFound.ts\"/>\nfunction anotherFileWithSameReferenes() { }",
      "signature": "d30ad74c2e698ad06cc29f2ea6d12014-declare function anotherFileWithSameReferenes(): void;\n",
      "affectsGlobalScope": true,
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "e70a47c0753d68cebbf1d60d9abf7212-/// <reference path=\"./filePresent.ts\"/>\n/// <reference path=\"./fileNotFound.ts\"/>\nfunction anotherFileWithSameReferenes() { }",
        "signature": "d30ad74c2e698ad06cc29f2ea6d12014-declare function anotherFileWithSameReferenes(): void;\n",
        "affectsGlobalScope": true,
        "impliedNodeFormat": 1
      }
    },
    {
      "fileName": "./src/newFile.ts",
      "version": "cf329dc888a898a1403ba3e35c2ec68e-function foo() { return 20; }",
      "signature": "67af86f8c5b618332b620488f3be2c41-declare function foo(): number;\n",
      "affectsGlobalScope": true,
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "cf329dc888a898a1403ba3e35c2ec68e-function foo() { return 20; }",
        "signature": "67af86f8c5b618332b620488f3be2c41-declare function foo(): number;\n",
        "affectsGlobalScope": true,
        "impliedNodeFormat": 1
      }
    },
    {
      "fileName": "./src/main.ts",
      "version": "789a4176bd8e2c5d9b0deb6839d8f298-/// <reference path=\"./newFile.ts\"/>\n/// <reference path=\"./filePresent.ts\"/>\n/// <reference path=\"./fileNotFound.ts\"/>\nfunction main() { }something();something();foo();something();",
      "signature": "50f7afe296d55bfece856bfb6f7ad6c9-declare function main(): void;\n",
      "affectsGlobalScope": true,
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "789a4176bd8e2c5d9b0deb6839d8f298-/// <reference path=\"./newFile.ts\"/>\n/// <reference path=\"./filePresent.ts\"/>\n/// <reference path=\"./fileNotFound.ts\"/>\nfunction main() { }something();something();foo();something();",
        "signature": "50f7afe296d55bfece856bfb6f7ad6c9-declare function main(): void;\n",
        "affectsGlobalScope": true,
        "impliedNodeFormat": 1
      }
    }
  ],
  "fileIdsList": [
    [
      "./src/filePresent.ts",
      "./src/fileNotFound.ts"
    ],
    [
      "./src/filePresent.ts",
      "./src/fileNotFound.ts",
      "./src/newFile.ts"
    ]
  ],
  "options": {
    "composite": true
  },
  "referencedMap": {
    "./src/anotherFileWithSameReferenes.ts": [
      "./src/filePresent.ts",
      "./src/fileNotFound.ts"
    ],
    "./src/main.ts": [
      "./src/filePresent.ts",
      "./src/fileNotFound.ts",
      "./src/newFile.ts"
    ]
  },
  "latestChangedDtsFile": "./src/fileNotFound.d.ts",
  "size": 2453
}

tsconfig.json::
SemanticDiagnostics::
*refresh*    /home/src/workspaces/project/src/main.ts
Signatures::
(computed .d.ts) /home/src/workspaces/project/src/main.ts
