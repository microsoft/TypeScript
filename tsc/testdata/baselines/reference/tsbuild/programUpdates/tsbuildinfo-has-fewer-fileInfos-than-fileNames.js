currentDirectory::/user/username/projects/project
useCaseSensitiveFileNames::true
Input::
//// [/user/username/projects/project/dist/tsconfig.tsbuildinfo] *new* 
{
					"version": "FakeTSVersion",
					"fileNames": ["lib.es2025.full.d.ts", "../src/a.ts", "../src/b.ts"],
					"fileInfos": ["abc123"],
					"options": {"composite": true, "outDir": "./"},
					"root": [2, 3]
				}
//// [/user/username/projects/project/src/a.ts] *new* 
export const a = 1;
//// [/user/username/projects/project/src/b.ts] *new* 
export const b = 2;
//// [/user/username/projects/project/tsconfig.json] *new* 
{"compilerOptions":{"composite":true,"outDir":"dist"},"files":["src/a.ts","src/b.ts"]}

tsgo --b -v
ExitStatus:: Success
Output::
[[90mHH:MM:SS AM[0m] Projects in this build: 
    * tsconfig.json

[[90mHH:MM:SS AM[0m] Project 'tsconfig.json' is out of date because output 'dist/tsconfig.tsbuildinfo' is older than input 'src/a.ts'

[[90mHH:MM:SS AM[0m] Building project 'tsconfig.json'...

//// [/home/src/tslibs/TS/Lib/lib.es2025.full.d.ts] *Lib*
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
//// [/user/username/projects/project/dist/src/a.d.ts] *new* 
export declare const a = 1;

//// [/user/username/projects/project/dist/src/a.js] *new* 
export const a = 1;

//// [/user/username/projects/project/dist/src/b.d.ts] *new* 
export declare const b = 2;

//// [/user/username/projects/project/dist/src/b.js] *new* 
export const b = 2;

//// [/user/username/projects/project/dist/tsconfig.tsbuildinfo] *modified* 
{"version":"FakeTSVersion","root":[[2,3]],"fileNames":["lib.es2025.full.d.ts","../src/a.ts","../src/b.ts"],"fileInfos":[{"version":"8859c12c614ce56ba9a18e58384a198f-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ninterface SymbolConstructor {\n    (desc?: string | number): symbol;\n    for(name: string): symbol;\n    readonly toStringTag: symbol;\n}\ndeclare var Symbol: SymbolConstructor;\ninterface Symbol {\n    readonly [Symbol.toStringTag]: string;\n}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true,"impliedNodeFormat":1},{"version":"f5c8fff6e1fca35f4a292d48868d4086-export const a = 1;","signature":"67cd7ccc14045107336f34154f76a8ca-export declare const a = 1;\n","impliedNodeFormat":1},{"version":"a8da94c0a8fada72e123de05c6818d3a-export const b = 2;","signature":"e1d275f86bf4a4a1f6fd0e8d8709f902-export declare const b = 2;\n","impliedNodeFormat":1}],"options":{"composite":true,"outDir":"./"},"latestChangedDtsFile":"./src/b.d.ts"}
//// [/user/username/projects/project/dist/tsconfig.tsbuildinfo.readable.baseline.txt] *new* 
{
  "version": "FakeTSVersion",
  "root": [
    {
      "files": [
        "../src/a.ts",
        "../src/b.ts"
      ],
      "original": [
        2,
        3
      ]
    }
  ],
  "fileNames": [
    "lib.es2025.full.d.ts",
    "../src/a.ts",
    "../src/b.ts"
  ],
  "fileInfos": [
    {
      "fileName": "lib.es2025.full.d.ts",
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
      "fileName": "../src/a.ts",
      "version": "f5c8fff6e1fca35f4a292d48868d4086-export const a = 1;",
      "signature": "67cd7ccc14045107336f34154f76a8ca-export declare const a = 1;\n",
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "f5c8fff6e1fca35f4a292d48868d4086-export const a = 1;",
        "signature": "67cd7ccc14045107336f34154f76a8ca-export declare const a = 1;\n",
        "impliedNodeFormat": 1
      }
    },
    {
      "fileName": "../src/b.ts",
      "version": "a8da94c0a8fada72e123de05c6818d3a-export const b = 2;",
      "signature": "e1d275f86bf4a4a1f6fd0e8d8709f902-export declare const b = 2;\n",
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "a8da94c0a8fada72e123de05c6818d3a-export const b = 2;",
        "signature": "e1d275f86bf4a4a1f6fd0e8d8709f902-export declare const b = 2;\n",
        "impliedNodeFormat": 1
      }
    }
  ],
  "options": {
    "composite": true,
    "outDir": "./"
  },
  "latestChangedDtsFile": "./src/b.d.ts",
  "size": 1304
}

tsconfig.json::
SemanticDiagnostics::
*refresh*    /home/src/tslibs/TS/Lib/lib.es2025.full.d.ts
*refresh*    /user/username/projects/project/src/a.ts
*refresh*    /user/username/projects/project/src/b.ts
Signatures::
(used version)   /home/src/tslibs/TS/Lib/lib.es2025.full.d.ts
(computed .d.ts) /user/username/projects/project/src/a.ts
(computed .d.ts) /user/username/projects/project/src/b.ts
