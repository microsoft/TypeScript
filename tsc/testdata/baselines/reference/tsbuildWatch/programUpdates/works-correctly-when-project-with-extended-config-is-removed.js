currentDirectory::/user/username/projects/project
useCaseSensitiveFileNames::true
Input::
//// [/user/username/projects/project/alpha.tsconfig.json] *new* 
{
    "compilerOptions": {
        "strict": true,
    },
}
//// [/user/username/projects/project/bravo.tsconfig.json] *new* 
{
    "compilerOptions": {
        "strict": true,
    },
}
//// [/user/username/projects/project/commonFile1.ts] *new* 
let x = 1
//// [/user/username/projects/project/commonFile2.ts] *new* 
let y = 1
//// [/user/username/projects/project/other.ts] *new* 
let z = 0;
//// [/user/username/projects/project/project1.tsconfig.json] *new* 
{
    "extends": "./alpha.tsconfig.json",
    "compilerOptions": {
        "composite": true,
    },
    "files": ["commonFile1.ts", "commonFile2.ts"],
}
//// [/user/username/projects/project/project2.tsconfig.json] *new* 
{
    "extends": "./bravo.tsconfig.json",
    "compilerOptions": {
        "composite": true,
    },
    "files": ["other.ts"],
}
//// [/user/username/projects/project/tsconfig.json] *new* 
{
    "references": [
        {
            "path": "./project1.tsconfig.json",
        },
        {
            "path": "./project2.tsconfig.json",
        },
    ],
    "files": [],
}

tsgo -b -w -v
ExitStatus:: Success
Output::
[2J[3J[H[[90mHH:MM:SS AM[0m] Starting compilation in watch mode...

[[90mHH:MM:SS AM[0m] Projects in this build: 
    * project1.tsconfig.json
    * project2.tsconfig.json
    * tsconfig.json

[[90mHH:MM:SS AM[0m] Project 'project1.tsconfig.json' is out of date because output file 'project1.tsconfig.tsbuildinfo' does not exist

[[90mHH:MM:SS AM[0m] Building project 'project1.tsconfig.json'...

[[90mHH:MM:SS AM[0m] Project 'project2.tsconfig.json' is out of date because output file 'project2.tsconfig.tsbuildinfo' does not exist

[[90mHH:MM:SS AM[0m] Building project 'project2.tsconfig.json'...

[[90mHH:MM:SS AM[0m] Found 0 errors. Watching for file changes.

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
//// [/user/username/projects/project/commonFile1.d.ts] *new* 
declare let x: number;

//// [/user/username/projects/project/commonFile1.js] *new* 
let x = 1;

//// [/user/username/projects/project/commonFile2.d.ts] *new* 
declare let y: number;

//// [/user/username/projects/project/commonFile2.js] *new* 
let y = 1;

//// [/user/username/projects/project/other.d.ts] *new* 
declare let z: number;

//// [/user/username/projects/project/other.js] *new* 
let z = 0;

//// [/user/username/projects/project/project1.tsconfig.tsbuildinfo] *new* 
{"version":"FakeTSVersion","root":[[2,3]],"fileNames":["lib.d.ts","./commonFile1.ts","./commonFile2.ts"],"fileInfos":[{"version":"8859c12c614ce56ba9a18e58384a198f-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ninterface SymbolConstructor {\n    (desc?: string | number): symbol;\n    for(name: string): symbol;\n    readonly toStringTag: symbol;\n}\ndeclare var Symbol: SymbolConstructor;\ninterface Symbol {\n    readonly [Symbol.toStringTag]: string;\n}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true,"impliedNodeFormat":1},{"version":"4e1a8b13d3ccc04f0aaac579ade4a50b-let x = 1","signature":"0e529fdc590223d6038e844fdfd212cd-declare let x: number;\n","affectsGlobalScope":true,"impliedNodeFormat":1},{"version":"06ce815ba25b02847f0b8550f82f5a25-let y = 1","signature":"114cede92fdd1b7222858083021aeba2-declare let y: number;\n","affectsGlobalScope":true,"impliedNodeFormat":1}],"options":{"composite":true,"strict":true},"latestChangedDtsFile":"./commonFile2.d.ts"}
//// [/user/username/projects/project/project1.tsconfig.tsbuildinfo.readable.baseline.txt] *new* 
{
  "version": "FakeTSVersion",
  "root": [
    {
      "files": [
        "./commonFile1.ts",
        "./commonFile2.ts"
      ],
      "original": [
        2,
        3
      ]
    }
  ],
  "fileNames": [
    "lib.d.ts",
    "./commonFile1.ts",
    "./commonFile2.ts"
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
      "fileName": "./commonFile1.ts",
      "version": "4e1a8b13d3ccc04f0aaac579ade4a50b-let x = 1",
      "signature": "0e529fdc590223d6038e844fdfd212cd-declare let x: number;\n",
      "affectsGlobalScope": true,
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "4e1a8b13d3ccc04f0aaac579ade4a50b-let x = 1",
        "signature": "0e529fdc590223d6038e844fdfd212cd-declare let x: number;\n",
        "affectsGlobalScope": true,
        "impliedNodeFormat": 1
      }
    },
    {
      "fileName": "./commonFile2.ts",
      "version": "06ce815ba25b02847f0b8550f82f5a25-let y = 1",
      "signature": "114cede92fdd1b7222858083021aeba2-declare let y: number;\n",
      "affectsGlobalScope": true,
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "06ce815ba25b02847f0b8550f82f5a25-let y = 1",
        "signature": "114cede92fdd1b7222858083021aeba2-declare let y: number;\n",
        "affectsGlobalScope": true,
        "impliedNodeFormat": 1
      }
    }
  ],
  "options": {
    "composite": true,
    "strict": true
  },
  "latestChangedDtsFile": "./commonFile2.d.ts",
  "size": 1330
}
//// [/user/username/projects/project/project2.tsconfig.tsbuildinfo] *new* 
{"version":"FakeTSVersion","root":[2],"fileNames":["lib.d.ts","./other.ts"],"fileInfos":[{"version":"8859c12c614ce56ba9a18e58384a198f-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ninterface SymbolConstructor {\n    (desc?: string | number): symbol;\n    for(name: string): symbol;\n    readonly toStringTag: symbol;\n}\ndeclare var Symbol: SymbolConstructor;\ninterface Symbol {\n    readonly [Symbol.toStringTag]: string;\n}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true,"impliedNodeFormat":1},{"version":"7148e8559d706b66aaba2a2423755c63-let z = 0;","signature":"879426698e1db06899fd57775c19b230-declare let z: number;\n","affectsGlobalScope":true,"impliedNodeFormat":1}],"options":{"composite":true,"strict":true},"latestChangedDtsFile":"./other.d.ts"}
//// [/user/username/projects/project/project2.tsconfig.tsbuildinfo.readable.baseline.txt] *new* 
{
  "version": "FakeTSVersion",
  "root": [
    {
      "files": [
        "./other.ts"
      ],
      "original": 2
    }
  ],
  "fileNames": [
    "lib.d.ts",
    "./other.ts"
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
      "fileName": "./other.ts",
      "version": "7148e8559d706b66aaba2a2423755c63-let z = 0;",
      "signature": "879426698e1db06899fd57775c19b230-declare let z: number;\n",
      "affectsGlobalScope": true,
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "7148e8559d706b66aaba2a2423755c63-let z = 0;",
        "signature": "879426698e1db06899fd57775c19b230-declare let z: number;\n",
        "affectsGlobalScope": true,
        "impliedNodeFormat": 1
      }
    }
  ],
  "options": {
    "composite": true,
    "strict": true
  },
  "latestChangedDtsFile": "./other.d.ts",
  "size": 1119
}

project1.tsconfig.json::
SemanticDiagnostics::
*refresh*    /home/src/tslibs/TS/Lib/lib.d.ts
*refresh*    /user/username/projects/project/commonFile1.ts
*refresh*    /user/username/projects/project/commonFile2.ts
Signatures::
(stored at emit) /user/username/projects/project/commonFile1.ts
(stored at emit) /user/username/projects/project/commonFile2.ts

project2.tsconfig.json::
SemanticDiagnostics::
*refresh*    /home/src/tslibs/TS/Lib/lib.d.ts
*refresh*    /user/username/projects/project/other.ts
Signatures::
(stored at emit) /user/username/projects/project/other.ts


Edit [0]:: Remove project2 from base config
//// [/user/username/projects/project/tsconfig.json] *modified* 
{
    "references": [
        {
            "path": "./project1.tsconfig.json",
        },
    ],
    "files": [],
}


Output::
[2J[3J[H[[90mHH:MM:SS AM[0m] File change detected. Starting incremental compilation...

[[90mHH:MM:SS AM[0m] Projects in this build: 
    * project1.tsconfig.json
    * tsconfig.json

[[90mHH:MM:SS AM[0m] Found 0 errors. Watching for file changes.


