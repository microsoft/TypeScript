currentDirectory::/user/username/projects/project
useCaseSensitiveFileNames::true
Input::
//// [/user/username/projects/project/alpha.tsconfig.json] *new* 
{}
//// [/user/username/projects/project/bravo.tsconfig.json] *new* 
{
    "extends": "./alpha.tsconfig.json",
}
//// [/user/username/projects/project/commonFile1.ts] *new* 
let x = 1
//// [/user/username/projects/project/commonFile2.ts] *new* 
let y = 1
//// [/user/username/projects/project/extendsConfig1.tsconfig.json] *new* 
{
    "compilerOptions": {
        "composite": true,
    },
}
//// [/user/username/projects/project/extendsConfig2.tsconfig.json] *new* 
{
    "compilerOptions": {
        "strictNullChecks": false,
    },
}
//// [/user/username/projects/project/extendsConfig3.tsconfig.json] *new* 
{
    "compilerOptions": {
        "noImplicitAny": true,
    },
}
//// [/user/username/projects/project/other.ts] *new* 
let z = 0;
//// [/user/username/projects/project/other2.ts] *new* 
let k = 0;
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
//// [/user/username/projects/project/project3.tsconfig.json] *new* 
{
    "extends": [
        "./extendsConfig1.tsconfig.json",
        "./extendsConfig2.tsconfig.json",
        "./extendsConfig3.tsconfig.json",
    ],
    "compilerOptions": {
        "composite": false,
    },
    "files": ["other2.ts"],
}

tsgo -b -w -v project1.tsconfig.json project2.tsconfig.json project3.tsconfig.json
ExitStatus:: Success
Output::
[2J[3J[H[[90mHH:MM:SS AM[0m] Starting compilation in watch mode...

[[90mHH:MM:SS AM[0m] Projects in this build: 
    * project1.tsconfig.json
    * project2.tsconfig.json
    * project3.tsconfig.json

[[90mHH:MM:SS AM[0m] Project 'project1.tsconfig.json' is out of date because output file 'project1.tsconfig.tsbuildinfo' does not exist

[[90mHH:MM:SS AM[0m] Building project 'project1.tsconfig.json'...

[[90mHH:MM:SS AM[0m] Project 'project2.tsconfig.json' is out of date because output file 'project2.tsconfig.tsbuildinfo' does not exist

[[90mHH:MM:SS AM[0m] Building project 'project2.tsconfig.json'...

[[90mHH:MM:SS AM[0m] Project 'project3.tsconfig.json' is out of date because output file 'project3.tsconfig.tsbuildinfo' does not exist

[[90mHH:MM:SS AM[0m] Building project 'project3.tsconfig.json'...

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

//// [/user/username/projects/project/other2.js] *new* 
let k = 0;

//// [/user/username/projects/project/project1.tsconfig.tsbuildinfo] *new* 
{"version":"FakeTSVersion","root":[[2,3]],"fileNames":["lib.d.ts","./commonFile1.ts","./commonFile2.ts"],"fileInfos":[{"version":"8859c12c614ce56ba9a18e58384a198f-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ninterface SymbolConstructor {\n    (desc?: string | number): symbol;\n    for(name: string): symbol;\n    readonly toStringTag: symbol;\n}\ndeclare var Symbol: SymbolConstructor;\ninterface Symbol {\n    readonly [Symbol.toStringTag]: string;\n}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true,"impliedNodeFormat":1},{"version":"4e1a8b13d3ccc04f0aaac579ade4a50b-let x = 1","signature":"0e529fdc590223d6038e844fdfd212cd-declare let x: number;\n","affectsGlobalScope":true,"impliedNodeFormat":1},{"version":"06ce815ba25b02847f0b8550f82f5a25-let y = 1","signature":"114cede92fdd1b7222858083021aeba2-declare let y: number;\n","affectsGlobalScope":true,"impliedNodeFormat":1}],"options":{"composite":true},"latestChangedDtsFile":"./commonFile2.d.ts"}
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
    "composite": true
  },
  "latestChangedDtsFile": "./commonFile2.d.ts",
  "size": 1316
}
//// [/user/username/projects/project/project2.tsconfig.tsbuildinfo] *new* 
{"version":"FakeTSVersion","root":[2],"fileNames":["lib.d.ts","./other.ts"],"fileInfos":[{"version":"8859c12c614ce56ba9a18e58384a198f-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ninterface SymbolConstructor {\n    (desc?: string | number): symbol;\n    for(name: string): symbol;\n    readonly toStringTag: symbol;\n}\ndeclare var Symbol: SymbolConstructor;\ninterface Symbol {\n    readonly [Symbol.toStringTag]: string;\n}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true,"impliedNodeFormat":1},{"version":"7148e8559d706b66aaba2a2423755c63-let z = 0;","signature":"879426698e1db06899fd57775c19b230-declare let z: number;\n","affectsGlobalScope":true,"impliedNodeFormat":1}],"options":{"composite":true},"latestChangedDtsFile":"./other.d.ts"}
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
    "composite": true
  },
  "latestChangedDtsFile": "./other.d.ts",
  "size": 1105
}
//// [/user/username/projects/project/project3.tsconfig.tsbuildinfo] *new* 
{"version":"FakeTSVersion","root":["./other2.ts"]}
//// [/user/username/projects/project/project3.tsconfig.tsbuildinfo.readable.baseline.txt] *new* 
{
  "version": "FakeTSVersion",
  "root": [
    {
      "files": [
        "./other2.ts"
      ],
      "original": "./other2.ts"
    }
  ],
  "size": 50
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

project3.tsconfig.json::
SemanticDiagnostics::
*refresh*    /home/src/tslibs/TS/Lib/lib.d.ts
*refresh*    /user/username/projects/project/other2.ts
Signatures::


Edit [0]:: Modify alpha config
//// [/user/username/projects/project/alpha.tsconfig.json] *modified* 
{
    "compilerOptions": {
        "strict": true
    }
}


Output::
[2J[3J[H[[90mHH:MM:SS AM[0m] File change detected. Starting incremental compilation...

[[90mHH:MM:SS AM[0m] Projects in this build: 
    * project1.tsconfig.json
    * project2.tsconfig.json
    * project3.tsconfig.json

[[90mHH:MM:SS AM[0m] Project 'project1.tsconfig.json' is out of date because output 'project1.tsconfig.tsbuildinfo' is older than input 'alpha.tsconfig.json'

[[90mHH:MM:SS AM[0m] Building project 'project1.tsconfig.json'...

[[90mHH:MM:SS AM[0m] Project 'project2.tsconfig.json' is out of date because output 'project2.tsconfig.tsbuildinfo' is older than input 'alpha.tsconfig.json'

[[90mHH:MM:SS AM[0m] Building project 'project2.tsconfig.json'...

[[90mHH:MM:SS AM[0m] Found 0 errors. Watching for file changes.

//// [/user/username/projects/project/commonFile1.js] *rewrite with same content*
//// [/user/username/projects/project/commonFile2.js] *rewrite with same content*
//// [/user/username/projects/project/other.js] *rewrite with same content*
//// [/user/username/projects/project/project1.tsconfig.tsbuildinfo] *modified* 
{"version":"FakeTSVersion","root":[[2,3]],"fileNames":["lib.d.ts","./commonFile1.ts","./commonFile2.ts"],"fileInfos":[{"version":"8859c12c614ce56ba9a18e58384a198f-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ninterface SymbolConstructor {\n    (desc?: string | number): symbol;\n    for(name: string): symbol;\n    readonly toStringTag: symbol;\n}\ndeclare var Symbol: SymbolConstructor;\ninterface Symbol {\n    readonly [Symbol.toStringTag]: string;\n}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true,"impliedNodeFormat":1},{"version":"4e1a8b13d3ccc04f0aaac579ade4a50b-let x = 1","signature":"0e529fdc590223d6038e844fdfd212cd-declare let x: number;\n","affectsGlobalScope":true,"impliedNodeFormat":1},{"version":"06ce815ba25b02847f0b8550f82f5a25-let y = 1","signature":"114cede92fdd1b7222858083021aeba2-declare let y: number;\n","affectsGlobalScope":true,"impliedNodeFormat":1}],"options":{"composite":true,"strict":true},"latestChangedDtsFile":"./commonFile2.d.ts"}
//// [/user/username/projects/project/project1.tsconfig.tsbuildinfo.readable.baseline.txt] *modified* 
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
//// [/user/username/projects/project/project2.tsconfig.tsbuildinfo] *modified* 
{"version":"FakeTSVersion","root":[2],"fileNames":["lib.d.ts","./other.ts"],"fileInfos":[{"version":"8859c12c614ce56ba9a18e58384a198f-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ninterface SymbolConstructor {\n    (desc?: string | number): symbol;\n    for(name: string): symbol;\n    readonly toStringTag: symbol;\n}\ndeclare var Symbol: SymbolConstructor;\ninterface Symbol {\n    readonly [Symbol.toStringTag]: string;\n}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true,"impliedNodeFormat":1},{"version":"7148e8559d706b66aaba2a2423755c63-let z = 0;","signature":"879426698e1db06899fd57775c19b230-declare let z: number;\n","affectsGlobalScope":true,"impliedNodeFormat":1}],"options":{"composite":true,"strict":true},"latestChangedDtsFile":"./other.d.ts"}
//// [/user/username/projects/project/project2.tsconfig.tsbuildinfo.readable.baseline.txt] *modified* 
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

project2.tsconfig.json::
SemanticDiagnostics::
*refresh*    /home/src/tslibs/TS/Lib/lib.d.ts
*refresh*    /user/username/projects/project/other.ts
Signatures::


Edit [1]:: change bravo config
//// [/user/username/projects/project/bravo.tsconfig.json] *modified* 
{
    "extends": "./alpha.tsconfig.json",
    "compilerOptions": { "strict": false }
}


Output::
[2J[3J[H[[90mHH:MM:SS AM[0m] File change detected. Starting incremental compilation...

[[90mHH:MM:SS AM[0m] Projects in this build: 
    * project1.tsconfig.json
    * project2.tsconfig.json
    * project3.tsconfig.json

[[90mHH:MM:SS AM[0m] Project 'project2.tsconfig.json' is out of date because output 'project2.tsconfig.tsbuildinfo' is older than input 'bravo.tsconfig.json'

[[90mHH:MM:SS AM[0m] Building project 'project2.tsconfig.json'...

[[90mHH:MM:SS AM[0m] Found 0 errors. Watching for file changes.

//// [/user/username/projects/project/other.js] *rewrite with same content*
//// [/user/username/projects/project/project2.tsconfig.tsbuildinfo] *modified* 
{"version":"FakeTSVersion","root":[2],"fileNames":["lib.d.ts","./other.ts"],"fileInfos":[{"version":"8859c12c614ce56ba9a18e58384a198f-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ninterface SymbolConstructor {\n    (desc?: string | number): symbol;\n    for(name: string): symbol;\n    readonly toStringTag: symbol;\n}\ndeclare var Symbol: SymbolConstructor;\ninterface Symbol {\n    readonly [Symbol.toStringTag]: string;\n}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true,"impliedNodeFormat":1},{"version":"7148e8559d706b66aaba2a2423755c63-let z = 0;","signature":"879426698e1db06899fd57775c19b230-declare let z: number;\n","affectsGlobalScope":true,"impliedNodeFormat":1}],"options":{"composite":true,"strict":false},"latestChangedDtsFile":"./other.d.ts"}
//// [/user/username/projects/project/project2.tsconfig.tsbuildinfo.readable.baseline.txt] *modified* 
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
    "strict": false
  },
  "latestChangedDtsFile": "./other.d.ts",
  "size": 1120
}

project2.tsconfig.json::
SemanticDiagnostics::
*refresh*    /home/src/tslibs/TS/Lib/lib.d.ts
*refresh*    /user/username/projects/project/other.ts
Signatures::


Edit [2]:: project 2 extends alpha
//// [/user/username/projects/project/project2.tsconfig.json] *modified* 
{
    "extends": "./alpha.tsconfig.json",
}


Output::
[2J[3J[H[[90mHH:MM:SS AM[0m] File change detected. Starting incremental compilation...

[[90mHH:MM:SS AM[0m] Projects in this build: 
    * project1.tsconfig.json
    * project2.tsconfig.json
    * project3.tsconfig.json

[[90mHH:MM:SS AM[0m] Project 'project2.tsconfig.json' is out of date because output 'other2.js' is older than input 'project2.tsconfig.json'

[[90mHH:MM:SS AM[0m] Building project 'project2.tsconfig.json'...

[[90mHH:MM:SS AM[0m] Found 0 errors. Watching for file changes.

//// [/user/username/projects/project/commonFile1.js] *rewrite with same content*
//// [/user/username/projects/project/commonFile2.js] *rewrite with same content*
//// [/user/username/projects/project/other.js] *rewrite with same content*
//// [/user/username/projects/project/other2.js] *rewrite with same content*
//// [/user/username/projects/project/project2.tsconfig.tsbuildinfo] *modified* 
{"version":"FakeTSVersion","root":["./commonFile1.ts","./commonFile2.ts","./other.ts","./other2.ts"]}
//// [/user/username/projects/project/project2.tsconfig.tsbuildinfo.readable.baseline.txt] *modified* 
{
  "version": "FakeTSVersion",
  "root": [
    {
      "files": [
        "./commonFile1.ts"
      ],
      "original": "./commonFile1.ts"
    },
    {
      "files": [
        "./commonFile2.ts"
      ],
      "original": "./commonFile2.ts"
    },
    {
      "files": [
        "./other.ts"
      ],
      "original": "./other.ts"
    },
    {
      "files": [
        "./other2.ts"
      ],
      "original": "./other2.ts"
    }
  ],
  "size": 101
}

project2.tsconfig.json::
SemanticDiagnostics::
*refresh*    /home/src/tslibs/TS/Lib/lib.d.ts
*refresh*    /user/username/projects/project/commonFile1.ts
*refresh*    /user/username/projects/project/commonFile2.ts
*refresh*    /user/username/projects/project/other.ts
*refresh*    /user/username/projects/project/other2.ts
Signatures::


Edit [3]:: update aplha config
//// [/user/username/projects/project/alpha.tsconfig.json] *modified* 
{}


Output::
[2J[3J[H[[90mHH:MM:SS AM[0m] File change detected. Starting incremental compilation...

[[90mHH:MM:SS AM[0m] Projects in this build: 
    * project1.tsconfig.json
    * project2.tsconfig.json
    * project3.tsconfig.json

[[90mHH:MM:SS AM[0m] Project 'project1.tsconfig.json' is out of date because output 'project1.tsconfig.tsbuildinfo' is older than input 'alpha.tsconfig.json'

[[90mHH:MM:SS AM[0m] Building project 'project1.tsconfig.json'...

[[90mHH:MM:SS AM[0m] Project 'project2.tsconfig.json' is out of date because output 'project2.tsconfig.tsbuildinfo' is older than input 'alpha.tsconfig.json'

[[90mHH:MM:SS AM[0m] Building project 'project2.tsconfig.json'...

[[90mHH:MM:SS AM[0m] Found 0 errors. Watching for file changes.

//// [/user/username/projects/project/commonFile1.js] *rewrite with same content*
//// [/user/username/projects/project/commonFile2.js] *rewrite with same content*
//// [/user/username/projects/project/other.js] *rewrite with same content*
//// [/user/username/projects/project/other2.js] *rewrite with same content*
//// [/user/username/projects/project/project1.tsconfig.tsbuildinfo] *modified* 
{"version":"FakeTSVersion","root":[[2,3]],"fileNames":["lib.d.ts","./commonFile1.ts","./commonFile2.ts"],"fileInfos":[{"version":"8859c12c614ce56ba9a18e58384a198f-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ninterface SymbolConstructor {\n    (desc?: string | number): symbol;\n    for(name: string): symbol;\n    readonly toStringTag: symbol;\n}\ndeclare var Symbol: SymbolConstructor;\ninterface Symbol {\n    readonly [Symbol.toStringTag]: string;\n}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true,"impliedNodeFormat":1},{"version":"4e1a8b13d3ccc04f0aaac579ade4a50b-let x = 1","signature":"0e529fdc590223d6038e844fdfd212cd-declare let x: number;\n","affectsGlobalScope":true,"impliedNodeFormat":1},{"version":"06ce815ba25b02847f0b8550f82f5a25-let y = 1","signature":"114cede92fdd1b7222858083021aeba2-declare let y: number;\n","affectsGlobalScope":true,"impliedNodeFormat":1}],"options":{"composite":true},"latestChangedDtsFile":"./commonFile2.d.ts"}
//// [/user/username/projects/project/project1.tsconfig.tsbuildinfo.readable.baseline.txt] *modified* 
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
    "composite": true
  },
  "latestChangedDtsFile": "./commonFile2.d.ts",
  "size": 1316
}
//// [/user/username/projects/project/project2.tsconfig.tsbuildinfo] *rewrite with same content*
//// [/user/username/projects/project/project2.tsconfig.tsbuildinfo.readable.baseline.txt] *rewrite with same content*

project1.tsconfig.json::
SemanticDiagnostics::
*refresh*    /home/src/tslibs/TS/Lib/lib.d.ts
*refresh*    /user/username/projects/project/commonFile1.ts
*refresh*    /user/username/projects/project/commonFile2.ts
Signatures::

project2.tsconfig.json::
SemanticDiagnostics::
*refresh*    /home/src/tslibs/TS/Lib/lib.d.ts
*refresh*    /user/username/projects/project/commonFile1.ts
*refresh*    /user/username/projects/project/commonFile2.ts
*refresh*    /user/username/projects/project/other.ts
*refresh*    /user/username/projects/project/other2.ts
Signatures::


Edit [4]:: Modify extendsConfigFile2
//// [/user/username/projects/project/extendsConfig2.tsconfig.json] *modified* 
{
    "compilerOptions": { "strictNullChecks": true }
}


Output::
[2J[3J[H[[90mHH:MM:SS AM[0m] File change detected. Starting incremental compilation...

[[90mHH:MM:SS AM[0m] Projects in this build: 
    * project1.tsconfig.json
    * project2.tsconfig.json
    * project3.tsconfig.json

[[90mHH:MM:SS AM[0m] Project 'project3.tsconfig.json' is out of date because output 'project3.tsconfig.tsbuildinfo' is older than input 'extendsConfig2.tsconfig.json'

[[90mHH:MM:SS AM[0m] Building project 'project3.tsconfig.json'...

[[90mHH:MM:SS AM[0m] Found 0 errors. Watching for file changes.

//// [/user/username/projects/project/other2.js] *rewrite with same content*
//// [/user/username/projects/project/project3.tsconfig.tsbuildinfo] *rewrite with same content*
//// [/user/username/projects/project/project3.tsconfig.tsbuildinfo.readable.baseline.txt] *rewrite with same content*

project3.tsconfig.json::
SemanticDiagnostics::
*refresh*    /home/src/tslibs/TS/Lib/lib.d.ts
*refresh*    /user/username/projects/project/other2.ts
Signatures::


Edit [5]:: Modify project 3
//// [/user/username/projects/project/project3.tsconfig.json] *modified* 
{
    "extends": ["./extendsConfig1.tsconfig.json", "./extendsConfig2.tsconfig.json"],
    "compilerOptions": { "composite": false },
    "files": ["other2.ts"],
}


Output::
[2J[3J[H[[90mHH:MM:SS AM[0m] File change detected. Starting incremental compilation...

[[90mHH:MM:SS AM[0m] Projects in this build: 
    * project1.tsconfig.json
    * project2.tsconfig.json
    * project3.tsconfig.json

[[90mHH:MM:SS AM[0m] Project 'project3.tsconfig.json' is out of date because output 'project3.tsconfig.tsbuildinfo' is older than input 'project3.tsconfig.json'

[[90mHH:MM:SS AM[0m] Building project 'project3.tsconfig.json'...

[[90mHH:MM:SS AM[0m] Found 0 errors. Watching for file changes.

//// [/user/username/projects/project/other2.js] *rewrite with same content*
//// [/user/username/projects/project/project3.tsconfig.tsbuildinfo] *rewrite with same content*
//// [/user/username/projects/project/project3.tsconfig.tsbuildinfo.readable.baseline.txt] *rewrite with same content*

project3.tsconfig.json::
SemanticDiagnostics::
*refresh*    /home/src/tslibs/TS/Lib/lib.d.ts
*refresh*    /user/username/projects/project/other2.ts
Signatures::


Edit [6]:: Delete extendedConfigFile2 and report error
//// [/user/username/projects/project/extendsConfig2.tsconfig.json] *deleted*


Output::
[2J[3J[H[[90mHH:MM:SS AM[0m] File change detected. Starting incremental compilation...

[[90mHH:MM:SS AM[0m] Projects in this build: 
    * project1.tsconfig.json
    * project2.tsconfig.json
    * project3.tsconfig.json

[[90mHH:MM:SS AM[0m] Project 'project3.tsconfig.json' is up to date because newest input 'other2.ts' is older than output 'project3.tsconfig.tsbuildinfo'

[91merror[0m[90m TS5083: [0mCannot read file '/user/username/projects/project/extendsConfig2.tsconfig.json'.
[[90mHH:MM:SS AM[0m] Found 1 error. Watching for file changes.


