currentDirectory::/home/src/workspaces/project
useCaseSensitiveFileNames::true
Input::
//// [/home/src/workspaces/project/index.tsx] *new* 
export const a = 1;
//// [/home/src/workspaces/project/other.ts] *new* 
export const b = 2;
//// [/home/src/workspaces/project/tsconfig.json] *new* 
{
    "compilerOptions": {
        "composite": true,
        "strict": true,
        "module": "esnext",
    },
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
//// [/home/src/workspaces/project/index.d.ts] *new* 
export declare const a = 1;

//// [/home/src/workspaces/project/index.js] *new* 
export const a = 1;

//// [/home/src/workspaces/project/other.d.ts] *new* 
export declare const b = 2;

//// [/home/src/workspaces/project/other.js] *new* 
export const b = 2;

//// [/home/src/workspaces/project/tsconfig.tsbuildinfo] *new* 
{"version":"FakeTSVersion","fileNames":["../../tslibs/TS/Lib/lib.d.ts","./index.tsx","./other.ts"],"fileInfos":[{"version":"eae9e83ef0f77eeb2e35dc9b91facce1-/// \u003creference no-default-lib=\"true\"/\u003e\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array\u003cT\u003e { length: number; [n: number]: T; }\ninterface ReadonlyArray\u003cT\u003e {}\ninterface SymbolConstructor {\n    (desc?: string | number): symbol;\n    for(name: string): symbol;\n    readonly toStringTag: symbol;\n}\ndeclare var Symbol: SymbolConstructor;\ninterface Symbol {\n    readonly [Symbol.toStringTag]: string;\n}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true,"impliedNodeFormat":1},{"version":"aeca45d938aaa455d9404c033875ae44-export const a = 1;","signature":"f70bb083bc713e58fec0f95d2f6b0880-export declare const a = 1;\n","impliedNodeFormat":1},{"version":"9dbcbc1a90aaa455d943c542d553b7f4-export const b = 2;","signature":"e0f3a39424713e58f1132fb04dee4150-export declare const b = 2;\n","impliedNodeFormat":1}],"options":{"composite":true,"module":99,"strict":true},"latestChangedDtsFile":"./other.d.ts"}
//// [/home/src/workspaces/project/tsconfig.tsbuildinfo.readable.baseline.txt] *new* 
{
  "version": "FakeTSVersion",
  "fileNames": [
    "../../tslibs/TS/Lib/lib.d.ts",
    "./index.tsx",
    "./other.ts"
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
      "fileName": "./index.tsx",
      "version": "aeca45d938aaa455d9404c033875ae44-export const a = 1;",
      "signature": "f70bb083bc713e58fec0f95d2f6b0880-export declare const a = 1;\n",
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "aeca45d938aaa455d9404c033875ae44-export const a = 1;",
        "signature": "f70bb083bc713e58fec0f95d2f6b0880-export declare const a = 1;\n",
        "impliedNodeFormat": 1
      }
    },
    {
      "fileName": "./other.ts",
      "version": "9dbcbc1a90aaa455d943c542d553b7f4-export const b = 2;",
      "signature": "e0f3a39424713e58f1132fb04dee4150-export declare const b = 2;\n",
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "9dbcbc1a90aaa455d943c542d553b7f4-export const b = 2;",
        "signature": "e0f3a39424713e58f1132fb04dee4150-export declare const b = 2;\n",
        "impliedNodeFormat": 1
      }
    }
  ],
  "options": {
    "composite": true,
    "module": 99,
    "strict": true
  },
  "latestChangedDtsFile": "./other.d.ts",
  "size": 1338
}

SemanticDiagnostics::
*refresh*    /home/src/tslibs/TS/Lib/lib.d.ts
*refresh*    /home/src/workspaces/project/index.tsx
*refresh*    /home/src/workspaces/project/other.ts
Signatures::
(stored at emit) /home/src/workspaces/project/index.tsx
(stored at emit) /home/src/workspaces/project/other.ts
