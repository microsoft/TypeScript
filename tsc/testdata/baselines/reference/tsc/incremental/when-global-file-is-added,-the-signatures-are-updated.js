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
{"version":"FakeTSVersion","fileNames":["../../tslibs/TS/Lib/lib.d.ts","./src/filePresent.ts","./src/anotherFileWithSameReferenes.ts","./src/main.ts","./src/fileNotFound.ts"],"fileInfos":[{"version":"eae9e83ef0f77eeb2e35dc9b91facce1-/// \u003creference no-default-lib=\"true\"/\u003e\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array\u003cT\u003e { length: number; [n: number]: T; }\ninterface ReadonlyArray\u003cT\u003e {}\ninterface SymbolConstructor {\n    (desc?: string | number): symbol;\n    for(name: string): symbol;\n    readonly toStringTag: symbol;\n}\ndeclare var Symbol: SymbolConstructor;\ninterface Symbol {\n    readonly [Symbol.toStringTag]: string;\n}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true,"impliedNodeFormat":1},{"version":"58709858299b94735c63c3d90d0e362e-function something() { return 10; }","signature":"e766597981ccc30d2268b7ae48bff23a-declare function something(): number;\n","affectsGlobalScope":true,"impliedNodeFormat":1},{"version":"ee6960c3e8d2cfef0e4e6888aa6015be-/// \u003creference path=\"./filePresent.ts\"/\u003e\n/// \u003creference path=\"./fileNotFound.ts\"/\u003e\nfunction anotherFileWithSameReferenes() { }","signature":"4f618118beb841268c5030fefabec827-declare function anotherFileWithSameReferenes(): void;\n","affectsGlobalScope":true,"impliedNodeFormat":1},{"version":"6d8e408984a27e3537b6aa47ab100697-/// \u003creference path=\"./filePresent.ts\"/\u003e\n/// \u003creference path=\"./fileNotFound.ts\"/\u003e\nfunction main() { }","signature":"5be4aeed6fcfdcb358659133618d66ee-declare function main(): void;\n","affectsGlobalScope":true,"impliedNodeFormat":1}],"fileIdsList":[[2,5]],"options":{"composite":true},"referencedMap":[[3,1],[4,1]],"latestChangedDtsFile":"./src/main.d.ts"}
//// [/home/src/workspaces/project/tsconfig.tsbuildinfo.readable.baseline.txt] *new* 
{
  "version": "FakeTSVersion",
  "fileNames": [
    "../../tslibs/TS/Lib/lib.d.ts",
    "./src/filePresent.ts",
    "./src/anotherFileWithSameReferenes.ts",
    "./src/main.ts",
    "./src/fileNotFound.ts"
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
      "fileName": "./src/filePresent.ts",
      "version": "58709858299b94735c63c3d90d0e362e-function something() { return 10; }",
      "signature": "e766597981ccc30d2268b7ae48bff23a-declare function something(): number;\n",
      "affectsGlobalScope": true,
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "58709858299b94735c63c3d90d0e362e-function something() { return 10; }",
        "signature": "e766597981ccc30d2268b7ae48bff23a-declare function something(): number;\n",
        "affectsGlobalScope": true,
        "impliedNodeFormat": 1
      }
    },
    {
      "fileName": "./src/anotherFileWithSameReferenes.ts",
      "version": "ee6960c3e8d2cfef0e4e6888aa6015be-/// \u003creference path=\"./filePresent.ts\"/\u003e\n/// \u003creference path=\"./fileNotFound.ts\"/\u003e\nfunction anotherFileWithSameReferenes() { }",
      "signature": "4f618118beb841268c5030fefabec827-declare function anotherFileWithSameReferenes(): void;\n",
      "affectsGlobalScope": true,
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "ee6960c3e8d2cfef0e4e6888aa6015be-/// \u003creference path=\"./filePresent.ts\"/\u003e\n/// \u003creference path=\"./fileNotFound.ts\"/\u003e\nfunction anotherFileWithSameReferenes() { }",
        "signature": "4f618118beb841268c5030fefabec827-declare function anotherFileWithSameReferenes(): void;\n",
        "affectsGlobalScope": true,
        "impliedNodeFormat": 1
      }
    },
    {
      "fileName": "./src/main.ts",
      "version": "6d8e408984a27e3537b6aa47ab100697-/// \u003creference path=\"./filePresent.ts\"/\u003e\n/// \u003creference path=\"./fileNotFound.ts\"/\u003e\nfunction main() { }",
      "signature": "5be4aeed6fcfdcb358659133618d66ee-declare function main(): void;\n",
      "affectsGlobalScope": true,
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "6d8e408984a27e3537b6aa47ab100697-/// \u003creference path=\"./filePresent.ts\"/\u003e\n/// \u003creference path=\"./fileNotFound.ts\"/\u003e\nfunction main() { }",
        "signature": "5be4aeed6fcfdcb358659133618d66ee-declare function main(): void;\n",
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
  "size": 1985
}

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
{"version":"FakeTSVersion","fileNames":["../../tslibs/TS/Lib/lib.d.ts","./src/filePresent.ts","./src/anotherFileWithSameReferenes.ts","./src/main.ts","./src/fileNotFound.ts"],"fileInfos":[{"version":"eae9e83ef0f77eeb2e35dc9b91facce1-/// \u003creference no-default-lib=\"true\"/\u003e\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array\u003cT\u003e { length: number; [n: number]: T; }\ninterface ReadonlyArray\u003cT\u003e {}\ninterface SymbolConstructor {\n    (desc?: string | number): symbol;\n    for(name: string): symbol;\n    readonly toStringTag: symbol;\n}\ndeclare var Symbol: SymbolConstructor;\ninterface Symbol {\n    readonly [Symbol.toStringTag]: string;\n}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true,"impliedNodeFormat":1},{"version":"58709858299b94735c63c3d90d0e362e-function something() { return 10; }","signature":"e766597981ccc30d2268b7ae48bff23a-declare function something(): number;\n","affectsGlobalScope":true,"impliedNodeFormat":1},{"version":"ee6960c3e8d2cfef0e4e6888aa6015be-/// \u003creference path=\"./filePresent.ts\"/\u003e\n/// \u003creference path=\"./fileNotFound.ts\"/\u003e\nfunction anotherFileWithSameReferenes() { }","signature":"4f618118beb841268c5030fefabec827-declare function anotherFileWithSameReferenes(): void;\n","affectsGlobalScope":true,"impliedNodeFormat":1},{"version":"08f1158cd4b6e2c9029a928669981a47-/// \u003creference path=\"./filePresent.ts\"/\u003e\n/// \u003creference path=\"./fileNotFound.ts\"/\u003e\nfunction main() { }something();","signature":"5be4aeed6fcfdcb358659133618d66ee-declare function main(): void;\n","affectsGlobalScope":true,"impliedNodeFormat":1}],"fileIdsList":[[2,5]],"options":{"composite":true},"referencedMap":[[3,1],[4,1]],"latestChangedDtsFile":"./src/main.d.ts"}
//// [/home/src/workspaces/project/tsconfig.tsbuildinfo.readable.baseline.txt] *modified* 
{
  "version": "FakeTSVersion",
  "fileNames": [
    "../../tslibs/TS/Lib/lib.d.ts",
    "./src/filePresent.ts",
    "./src/anotherFileWithSameReferenes.ts",
    "./src/main.ts",
    "./src/fileNotFound.ts"
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
      "fileName": "./src/filePresent.ts",
      "version": "58709858299b94735c63c3d90d0e362e-function something() { return 10; }",
      "signature": "e766597981ccc30d2268b7ae48bff23a-declare function something(): number;\n",
      "affectsGlobalScope": true,
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "58709858299b94735c63c3d90d0e362e-function something() { return 10; }",
        "signature": "e766597981ccc30d2268b7ae48bff23a-declare function something(): number;\n",
        "affectsGlobalScope": true,
        "impliedNodeFormat": 1
      }
    },
    {
      "fileName": "./src/anotherFileWithSameReferenes.ts",
      "version": "ee6960c3e8d2cfef0e4e6888aa6015be-/// \u003creference path=\"./filePresent.ts\"/\u003e\n/// \u003creference path=\"./fileNotFound.ts\"/\u003e\nfunction anotherFileWithSameReferenes() { }",
      "signature": "4f618118beb841268c5030fefabec827-declare function anotherFileWithSameReferenes(): void;\n",
      "affectsGlobalScope": true,
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "ee6960c3e8d2cfef0e4e6888aa6015be-/// \u003creference path=\"./filePresent.ts\"/\u003e\n/// \u003creference path=\"./fileNotFound.ts\"/\u003e\nfunction anotherFileWithSameReferenes() { }",
        "signature": "4f618118beb841268c5030fefabec827-declare function anotherFileWithSameReferenes(): void;\n",
        "affectsGlobalScope": true,
        "impliedNodeFormat": 1
      }
    },
    {
      "fileName": "./src/main.ts",
      "version": "08f1158cd4b6e2c9029a928669981a47-/// \u003creference path=\"./filePresent.ts\"/\u003e\n/// \u003creference path=\"./fileNotFound.ts\"/\u003e\nfunction main() { }something();",
      "signature": "5be4aeed6fcfdcb358659133618d66ee-declare function main(): void;\n",
      "affectsGlobalScope": true,
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "08f1158cd4b6e2c9029a928669981a47-/// \u003creference path=\"./filePresent.ts\"/\u003e\n/// \u003creference path=\"./fileNotFound.ts\"/\u003e\nfunction main() { }something();",
        "signature": "5be4aeed6fcfdcb358659133618d66ee-declare function main(): void;\n",
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
  "size": 1997
}

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
{"version":"FakeTSVersion","fileNames":["../../tslibs/TS/Lib/lib.d.ts","./src/filePresent.ts","./src/anotherFileWithSameReferenes.ts","./src/main.ts","./src/fileNotFound.ts"],"fileInfos":[{"version":"eae9e83ef0f77eeb2e35dc9b91facce1-/// \u003creference no-default-lib=\"true\"/\u003e\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array\u003cT\u003e { length: number; [n: number]: T; }\ninterface ReadonlyArray\u003cT\u003e {}\ninterface SymbolConstructor {\n    (desc?: string | number): symbol;\n    for(name: string): symbol;\n    readonly toStringTag: symbol;\n}\ndeclare var Symbol: SymbolConstructor;\ninterface Symbol {\n    readonly [Symbol.toStringTag]: string;\n}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true,"impliedNodeFormat":1},{"version":"58709858299b94735c63c3d90d0e362e-function something() { return 10; }","signature":"e766597981ccc30d2268b7ae48bff23a-declare function something(): number;\n","affectsGlobalScope":true,"impliedNodeFormat":1},{"version":"ee6960c3e8d2cfef0e4e6888aa6015be-/// \u003creference path=\"./filePresent.ts\"/\u003e\n/// \u003creference path=\"./fileNotFound.ts\"/\u003e\nfunction anotherFileWithSameReferenes() { }","signature":"4f618118beb841268c5030fefabec827-declare function anotherFileWithSameReferenes(): void;\n","affectsGlobalScope":true,"impliedNodeFormat":1},{"version":"37510e4e5cbb391d67bef0b2a134a3d7-/// \u003creference path=\"./filePresent.ts\"/\u003e\n/// \u003creference path=\"./fileNotFound.ts\"/\u003e\nfunction main() { }something();something();","signature":"5be4aeed6fcfdcb358659133618d66ee-declare function main(): void;\n","affectsGlobalScope":true,"impliedNodeFormat":1}],"fileIdsList":[[2,5]],"options":{"composite":true},"referencedMap":[[3,1],[4,1]],"latestChangedDtsFile":"./src/main.d.ts"}
//// [/home/src/workspaces/project/tsconfig.tsbuildinfo.readable.baseline.txt] *modified* 
{
  "version": "FakeTSVersion",
  "fileNames": [
    "../../tslibs/TS/Lib/lib.d.ts",
    "./src/filePresent.ts",
    "./src/anotherFileWithSameReferenes.ts",
    "./src/main.ts",
    "./src/fileNotFound.ts"
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
      "fileName": "./src/filePresent.ts",
      "version": "58709858299b94735c63c3d90d0e362e-function something() { return 10; }",
      "signature": "e766597981ccc30d2268b7ae48bff23a-declare function something(): number;\n",
      "affectsGlobalScope": true,
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "58709858299b94735c63c3d90d0e362e-function something() { return 10; }",
        "signature": "e766597981ccc30d2268b7ae48bff23a-declare function something(): number;\n",
        "affectsGlobalScope": true,
        "impliedNodeFormat": 1
      }
    },
    {
      "fileName": "./src/anotherFileWithSameReferenes.ts",
      "version": "ee6960c3e8d2cfef0e4e6888aa6015be-/// \u003creference path=\"./filePresent.ts\"/\u003e\n/// \u003creference path=\"./fileNotFound.ts\"/\u003e\nfunction anotherFileWithSameReferenes() { }",
      "signature": "4f618118beb841268c5030fefabec827-declare function anotherFileWithSameReferenes(): void;\n",
      "affectsGlobalScope": true,
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "ee6960c3e8d2cfef0e4e6888aa6015be-/// \u003creference path=\"./filePresent.ts\"/\u003e\n/// \u003creference path=\"./fileNotFound.ts\"/\u003e\nfunction anotherFileWithSameReferenes() { }",
        "signature": "4f618118beb841268c5030fefabec827-declare function anotherFileWithSameReferenes(): void;\n",
        "affectsGlobalScope": true,
        "impliedNodeFormat": 1
      }
    },
    {
      "fileName": "./src/main.ts",
      "version": "37510e4e5cbb391d67bef0b2a134a3d7-/// \u003creference path=\"./filePresent.ts\"/\u003e\n/// \u003creference path=\"./fileNotFound.ts\"/\u003e\nfunction main() { }something();something();",
      "signature": "5be4aeed6fcfdcb358659133618d66ee-declare function main(): void;\n",
      "affectsGlobalScope": true,
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "37510e4e5cbb391d67bef0b2a134a3d7-/// \u003creference path=\"./filePresent.ts\"/\u003e\n/// \u003creference path=\"./fileNotFound.ts\"/\u003e\nfunction main() { }something();something();",
        "signature": "5be4aeed6fcfdcb358659133618d66ee-declare function main(): void;\n",
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
  "size": 2009
}

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
{"version":"FakeTSVersion","fileNames":["../../tslibs/TS/Lib/lib.d.ts","./src/filePresent.ts","./src/anotherFileWithSameReferenes.ts","./src/newFile.ts","./src/main.ts","./src/fileNotFound.ts"],"fileInfos":[{"version":"eae9e83ef0f77eeb2e35dc9b91facce1-/// \u003creference no-default-lib=\"true\"/\u003e\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array\u003cT\u003e { length: number; [n: number]: T; }\ninterface ReadonlyArray\u003cT\u003e {}\ninterface SymbolConstructor {\n    (desc?: string | number): symbol;\n    for(name: string): symbol;\n    readonly toStringTag: symbol;\n}\ndeclare var Symbol: SymbolConstructor;\ninterface Symbol {\n    readonly [Symbol.toStringTag]: string;\n}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true,"impliedNodeFormat":1},{"version":"58709858299b94735c63c3d90d0e362e-function something() { return 10; }","signature":"e766597981ccc30d2268b7ae48bff23a-declare function something(): number;\n","affectsGlobalScope":true,"impliedNodeFormat":1},{"version":"ee6960c3e8d2cfef0e4e6888aa6015be-/// \u003creference path=\"./filePresent.ts\"/\u003e\n/// \u003creference path=\"./fileNotFound.ts\"/\u003e\nfunction anotherFileWithSameReferenes() { }","signature":"4f618118beb841268c5030fefabec827-declare function anotherFileWithSameReferenes(): void;\n","affectsGlobalScope":true,"impliedNodeFormat":1},{"version":"0fdb593a347eca970af4573c665ec92b-function foo() { return 20; }","signature":"40f624df521e6112298bd7e1e92b1cde-declare function foo(): number;\n","affectsGlobalScope":true,"impliedNodeFormat":1},{"version":"4c0f7142e89e51491e80fb1271d6f02e-/// \u003creference path=\"./newFile.ts\"/\u003e\n/// \u003creference path=\"./filePresent.ts\"/\u003e\n/// \u003creference path=\"./fileNotFound.ts\"/\u003e\nfunction main() { }something();something();foo();","signature":"5be4aeed6fcfdcb358659133618d66ee-declare function main(): void;\n","affectsGlobalScope":true,"impliedNodeFormat":1}],"fileIdsList":[[2,6],[2,4,6]],"options":{"composite":true},"referencedMap":[[3,1],[5,2]],"latestChangedDtsFile":"./src/newFile.d.ts"}
//// [/home/src/workspaces/project/tsconfig.tsbuildinfo.readable.baseline.txt] *modified* 
{
  "version": "FakeTSVersion",
  "fileNames": [
    "../../tslibs/TS/Lib/lib.d.ts",
    "./src/filePresent.ts",
    "./src/anotherFileWithSameReferenes.ts",
    "./src/newFile.ts",
    "./src/main.ts",
    "./src/fileNotFound.ts"
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
      "fileName": "./src/filePresent.ts",
      "version": "58709858299b94735c63c3d90d0e362e-function something() { return 10; }",
      "signature": "e766597981ccc30d2268b7ae48bff23a-declare function something(): number;\n",
      "affectsGlobalScope": true,
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "58709858299b94735c63c3d90d0e362e-function something() { return 10; }",
        "signature": "e766597981ccc30d2268b7ae48bff23a-declare function something(): number;\n",
        "affectsGlobalScope": true,
        "impliedNodeFormat": 1
      }
    },
    {
      "fileName": "./src/anotherFileWithSameReferenes.ts",
      "version": "ee6960c3e8d2cfef0e4e6888aa6015be-/// \u003creference path=\"./filePresent.ts\"/\u003e\n/// \u003creference path=\"./fileNotFound.ts\"/\u003e\nfunction anotherFileWithSameReferenes() { }",
      "signature": "4f618118beb841268c5030fefabec827-declare function anotherFileWithSameReferenes(): void;\n",
      "affectsGlobalScope": true,
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "ee6960c3e8d2cfef0e4e6888aa6015be-/// \u003creference path=\"./filePresent.ts\"/\u003e\n/// \u003creference path=\"./fileNotFound.ts\"/\u003e\nfunction anotherFileWithSameReferenes() { }",
        "signature": "4f618118beb841268c5030fefabec827-declare function anotherFileWithSameReferenes(): void;\n",
        "affectsGlobalScope": true,
        "impliedNodeFormat": 1
      }
    },
    {
      "fileName": "./src/newFile.ts",
      "version": "0fdb593a347eca970af4573c665ec92b-function foo() { return 20; }",
      "signature": "40f624df521e6112298bd7e1e92b1cde-declare function foo(): number;\n",
      "affectsGlobalScope": true,
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "0fdb593a347eca970af4573c665ec92b-function foo() { return 20; }",
        "signature": "40f624df521e6112298bd7e1e92b1cde-declare function foo(): number;\n",
        "affectsGlobalScope": true,
        "impliedNodeFormat": 1
      }
    },
    {
      "fileName": "./src/main.ts",
      "version": "4c0f7142e89e51491e80fb1271d6f02e-/// \u003creference path=\"./newFile.ts\"/\u003e\n/// \u003creference path=\"./filePresent.ts\"/\u003e\n/// \u003creference path=\"./fileNotFound.ts\"/\u003e\nfunction main() { }something();something();foo();",
      "signature": "5be4aeed6fcfdcb358659133618d66ee-declare function main(): void;\n",
      "affectsGlobalScope": true,
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "4c0f7142e89e51491e80fb1271d6f02e-/// \u003creference path=\"./newFile.ts\"/\u003e\n/// \u003creference path=\"./filePresent.ts\"/\u003e\n/// \u003creference path=\"./fileNotFound.ts\"/\u003e\nfunction main() { }something();something();foo();",
        "signature": "5be4aeed6fcfdcb358659133618d66ee-declare function main(): void;\n",
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
  "size": 2301
}

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
{"version":"FakeTSVersion","fileNames":["../../tslibs/TS/Lib/lib.d.ts","./src/filePresent.ts","./src/fileNotFound.ts","./src/anotherFileWithSameReferenes.ts","./src/newFile.ts","./src/main.ts"],"fileInfos":[{"version":"eae9e83ef0f77eeb2e35dc9b91facce1-/// \u003creference no-default-lib=\"true\"/\u003e\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array\u003cT\u003e { length: number; [n: number]: T; }\ninterface ReadonlyArray\u003cT\u003e {}\ninterface SymbolConstructor {\n    (desc?: string | number): symbol;\n    for(name: string): symbol;\n    readonly toStringTag: symbol;\n}\ndeclare var Symbol: SymbolConstructor;\ninterface Symbol {\n    readonly [Symbol.toStringTag]: string;\n}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true,"impliedNodeFormat":1},{"version":"58709858299b94735c63c3d90d0e362e-function something() { return 10; }","signature":"e766597981ccc30d2268b7ae48bff23a-declare function something(): number;\n","affectsGlobalScope":true,"impliedNodeFormat":1},{"version":"6c4e94ff9c936a5f5915e4415bdc6c1b-function something2() { return 20; }","signature":"76a670e64615558d407672d28e359862-declare function something2(): number;\n","affectsGlobalScope":true,"impliedNodeFormat":1},{"version":"ee6960c3e8d2cfef0e4e6888aa6015be-/// \u003creference path=\"./filePresent.ts\"/\u003e\n/// \u003creference path=\"./fileNotFound.ts\"/\u003e\nfunction anotherFileWithSameReferenes() { }","signature":"4f618118beb841268c5030fefabec827-declare function anotherFileWithSameReferenes(): void;\n","affectsGlobalScope":true,"impliedNodeFormat":1},{"version":"0fdb593a347eca970af4573c665ec92b-function foo() { return 20; }","signature":"40f624df521e6112298bd7e1e92b1cde-declare function foo(): number;\n","affectsGlobalScope":true,"impliedNodeFormat":1},{"version":"4c0f7142e89e51491e80fb1271d6f02e-/// \u003creference path=\"./newFile.ts\"/\u003e\n/// \u003creference path=\"./filePresent.ts\"/\u003e\n/// \u003creference path=\"./fileNotFound.ts\"/\u003e\nfunction main() { }something();something();foo();","signature":"5be4aeed6fcfdcb358659133618d66ee-declare function main(): void;\n","affectsGlobalScope":true,"impliedNodeFormat":1}],"fileIdsList":[[2,3],[2,3,5]],"options":{"composite":true},"referencedMap":[[4,1],[6,2]],"latestChangedDtsFile":"./src/fileNotFound.d.ts"}
//// [/home/src/workspaces/project/tsconfig.tsbuildinfo.readable.baseline.txt] *modified* 
{
  "version": "FakeTSVersion",
  "fileNames": [
    "../../tslibs/TS/Lib/lib.d.ts",
    "./src/filePresent.ts",
    "./src/fileNotFound.ts",
    "./src/anotherFileWithSameReferenes.ts",
    "./src/newFile.ts",
    "./src/main.ts"
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
      "fileName": "./src/filePresent.ts",
      "version": "58709858299b94735c63c3d90d0e362e-function something() { return 10; }",
      "signature": "e766597981ccc30d2268b7ae48bff23a-declare function something(): number;\n",
      "affectsGlobalScope": true,
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "58709858299b94735c63c3d90d0e362e-function something() { return 10; }",
        "signature": "e766597981ccc30d2268b7ae48bff23a-declare function something(): number;\n",
        "affectsGlobalScope": true,
        "impliedNodeFormat": 1
      }
    },
    {
      "fileName": "./src/fileNotFound.ts",
      "version": "6c4e94ff9c936a5f5915e4415bdc6c1b-function something2() { return 20; }",
      "signature": "76a670e64615558d407672d28e359862-declare function something2(): number;\n",
      "affectsGlobalScope": true,
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "6c4e94ff9c936a5f5915e4415bdc6c1b-function something2() { return 20; }",
        "signature": "76a670e64615558d407672d28e359862-declare function something2(): number;\n",
        "affectsGlobalScope": true,
        "impliedNodeFormat": 1
      }
    },
    {
      "fileName": "./src/anotherFileWithSameReferenes.ts",
      "version": "ee6960c3e8d2cfef0e4e6888aa6015be-/// \u003creference path=\"./filePresent.ts\"/\u003e\n/// \u003creference path=\"./fileNotFound.ts\"/\u003e\nfunction anotherFileWithSameReferenes() { }",
      "signature": "4f618118beb841268c5030fefabec827-declare function anotherFileWithSameReferenes(): void;\n",
      "affectsGlobalScope": true,
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "ee6960c3e8d2cfef0e4e6888aa6015be-/// \u003creference path=\"./filePresent.ts\"/\u003e\n/// \u003creference path=\"./fileNotFound.ts\"/\u003e\nfunction anotherFileWithSameReferenes() { }",
        "signature": "4f618118beb841268c5030fefabec827-declare function anotherFileWithSameReferenes(): void;\n",
        "affectsGlobalScope": true,
        "impliedNodeFormat": 1
      }
    },
    {
      "fileName": "./src/newFile.ts",
      "version": "0fdb593a347eca970af4573c665ec92b-function foo() { return 20; }",
      "signature": "40f624df521e6112298bd7e1e92b1cde-declare function foo(): number;\n",
      "affectsGlobalScope": true,
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "0fdb593a347eca970af4573c665ec92b-function foo() { return 20; }",
        "signature": "40f624df521e6112298bd7e1e92b1cde-declare function foo(): number;\n",
        "affectsGlobalScope": true,
        "impliedNodeFormat": 1
      }
    },
    {
      "fileName": "./src/main.ts",
      "version": "4c0f7142e89e51491e80fb1271d6f02e-/// \u003creference path=\"./newFile.ts\"/\u003e\n/// \u003creference path=\"./filePresent.ts\"/\u003e\n/// \u003creference path=\"./fileNotFound.ts\"/\u003e\nfunction main() { }something();something();foo();",
      "signature": "5be4aeed6fcfdcb358659133618d66ee-declare function main(): void;\n",
      "affectsGlobalScope": true,
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "4c0f7142e89e51491e80fb1271d6f02e-/// \u003creference path=\"./newFile.ts\"/\u003e\n/// \u003creference path=\"./filePresent.ts\"/\u003e\n/// \u003creference path=\"./fileNotFound.ts\"/\u003e\nfunction main() { }something();something();foo();",
        "signature": "5be4aeed6fcfdcb358659133618d66ee-declare function main(): void;\n",
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
  "size": 2526
}

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
{"version":"FakeTSVersion","fileNames":["../../tslibs/TS/Lib/lib.d.ts","./src/filePresent.ts","./src/fileNotFound.ts","./src/anotherFileWithSameReferenes.ts","./src/newFile.ts","./src/main.ts"],"fileInfos":[{"version":"eae9e83ef0f77eeb2e35dc9b91facce1-/// \u003creference no-default-lib=\"true\"/\u003e\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array\u003cT\u003e { length: number; [n: number]: T; }\ninterface ReadonlyArray\u003cT\u003e {}\ninterface SymbolConstructor {\n    (desc?: string | number): symbol;\n    for(name: string): symbol;\n    readonly toStringTag: symbol;\n}\ndeclare var Symbol: SymbolConstructor;\ninterface Symbol {\n    readonly [Symbol.toStringTag]: string;\n}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true,"impliedNodeFormat":1},{"version":"58709858299b94735c63c3d90d0e362e-function something() { return 10; }","signature":"e766597981ccc30d2268b7ae48bff23a-declare function something(): number;\n","affectsGlobalScope":true,"impliedNodeFormat":1},{"version":"6c4e94ff9c936a5f5915e4415bdc6c1b-function something2() { return 20; }","signature":"76a670e64615558d407672d28e359862-declare function something2(): number;\n","affectsGlobalScope":true,"impliedNodeFormat":1},{"version":"ee6960c3e8d2cfef0e4e6888aa6015be-/// \u003creference path=\"./filePresent.ts\"/\u003e\n/// \u003creference path=\"./fileNotFound.ts\"/\u003e\nfunction anotherFileWithSameReferenes() { }","signature":"4f618118beb841268c5030fefabec827-declare function anotherFileWithSameReferenes(): void;\n","affectsGlobalScope":true,"impliedNodeFormat":1},{"version":"0fdb593a347eca970af4573c665ec92b-function foo() { return 20; }","signature":"40f624df521e6112298bd7e1e92b1cde-declare function foo(): number;\n","affectsGlobalScope":true,"impliedNodeFormat":1},{"version":"4b8a07fa02d21afa046705a1426abbd6-/// \u003creference path=\"./newFile.ts\"/\u003e\n/// \u003creference path=\"./filePresent.ts\"/\u003e\n/// \u003creference path=\"./fileNotFound.ts\"/\u003e\nfunction main() { }something();something();foo();something();","signature":"5be4aeed6fcfdcb358659133618d66ee-declare function main(): void;\n","affectsGlobalScope":true,"impliedNodeFormat":1}],"fileIdsList":[[2,3],[2,3,5]],"options":{"composite":true},"referencedMap":[[4,1],[6,2]],"latestChangedDtsFile":"./src/fileNotFound.d.ts"}
//// [/home/src/workspaces/project/tsconfig.tsbuildinfo.readable.baseline.txt] *modified* 
{
  "version": "FakeTSVersion",
  "fileNames": [
    "../../tslibs/TS/Lib/lib.d.ts",
    "./src/filePresent.ts",
    "./src/fileNotFound.ts",
    "./src/anotherFileWithSameReferenes.ts",
    "./src/newFile.ts",
    "./src/main.ts"
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
      "fileName": "./src/filePresent.ts",
      "version": "58709858299b94735c63c3d90d0e362e-function something() { return 10; }",
      "signature": "e766597981ccc30d2268b7ae48bff23a-declare function something(): number;\n",
      "affectsGlobalScope": true,
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "58709858299b94735c63c3d90d0e362e-function something() { return 10; }",
        "signature": "e766597981ccc30d2268b7ae48bff23a-declare function something(): number;\n",
        "affectsGlobalScope": true,
        "impliedNodeFormat": 1
      }
    },
    {
      "fileName": "./src/fileNotFound.ts",
      "version": "6c4e94ff9c936a5f5915e4415bdc6c1b-function something2() { return 20; }",
      "signature": "76a670e64615558d407672d28e359862-declare function something2(): number;\n",
      "affectsGlobalScope": true,
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "6c4e94ff9c936a5f5915e4415bdc6c1b-function something2() { return 20; }",
        "signature": "76a670e64615558d407672d28e359862-declare function something2(): number;\n",
        "affectsGlobalScope": true,
        "impliedNodeFormat": 1
      }
    },
    {
      "fileName": "./src/anotherFileWithSameReferenes.ts",
      "version": "ee6960c3e8d2cfef0e4e6888aa6015be-/// \u003creference path=\"./filePresent.ts\"/\u003e\n/// \u003creference path=\"./fileNotFound.ts\"/\u003e\nfunction anotherFileWithSameReferenes() { }",
      "signature": "4f618118beb841268c5030fefabec827-declare function anotherFileWithSameReferenes(): void;\n",
      "affectsGlobalScope": true,
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "ee6960c3e8d2cfef0e4e6888aa6015be-/// \u003creference path=\"./filePresent.ts\"/\u003e\n/// \u003creference path=\"./fileNotFound.ts\"/\u003e\nfunction anotherFileWithSameReferenes() { }",
        "signature": "4f618118beb841268c5030fefabec827-declare function anotherFileWithSameReferenes(): void;\n",
        "affectsGlobalScope": true,
        "impliedNodeFormat": 1
      }
    },
    {
      "fileName": "./src/newFile.ts",
      "version": "0fdb593a347eca970af4573c665ec92b-function foo() { return 20; }",
      "signature": "40f624df521e6112298bd7e1e92b1cde-declare function foo(): number;\n",
      "affectsGlobalScope": true,
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "0fdb593a347eca970af4573c665ec92b-function foo() { return 20; }",
        "signature": "40f624df521e6112298bd7e1e92b1cde-declare function foo(): number;\n",
        "affectsGlobalScope": true,
        "impliedNodeFormat": 1
      }
    },
    {
      "fileName": "./src/main.ts",
      "version": "4b8a07fa02d21afa046705a1426abbd6-/// \u003creference path=\"./newFile.ts\"/\u003e\n/// \u003creference path=\"./filePresent.ts\"/\u003e\n/// \u003creference path=\"./fileNotFound.ts\"/\u003e\nfunction main() { }something();something();foo();something();",
      "signature": "5be4aeed6fcfdcb358659133618d66ee-declare function main(): void;\n",
      "affectsGlobalScope": true,
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "4b8a07fa02d21afa046705a1426abbd6-/// \u003creference path=\"./newFile.ts\"/\u003e\n/// \u003creference path=\"./filePresent.ts\"/\u003e\n/// \u003creference path=\"./fileNotFound.ts\"/\u003e\nfunction main() { }something();something();foo();something();",
        "signature": "5be4aeed6fcfdcb358659133618d66ee-declare function main(): void;\n",
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
  "size": 2538
}

SemanticDiagnostics::
*refresh*    /home/src/workspaces/project/src/main.ts
Signatures::
(computed .d.ts) /home/src/workspaces/project/src/main.ts
