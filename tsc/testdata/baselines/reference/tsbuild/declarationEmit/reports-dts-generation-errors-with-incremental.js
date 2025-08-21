currentDirectory::/home/src/workspaces/project
useCaseSensitiveFileNames::true
Input::
//// [/home/src/workspaces/project/index.ts] *new* 
import ky from 'ky';
export const api = ky.extend({});
//// [/home/src/workspaces/project/node_modules/ky/distribution/index.d.ts] *new* 
type KyInstance = {
    extend(options: Record<string,unknown>): KyInstance;
}
declare const ky: KyInstance;
export default ky;
//// [/home/src/workspaces/project/node_modules/ky/package.json] *new* 
{
    "name": "ky",
    "type": "module",
    "main": "./distribution/index.js"
}
//// [/home/src/workspaces/project/package.json] *new* 
{
    "type": "module"
}
//// [/home/src/workspaces/project/tsconfig.json] *new* 
{
    "compilerOptions": {
        "module": "NodeNext",
        "moduleResolution": "NodeNext",
        "composite": false,
        "incremental": true,
        "declaration": true,
        "skipLibCheck": true,
        "skipDefaultLibCheck": true,
    },
}

tsgo -b --explainFiles --listEmittedFiles --v
ExitStatus:: DiagnosticsPresent_OutputsGenerated
Output::
[[90mHH:MM:SS AM[0m] Projects in this build: 
    * tsconfig.json

[[90mHH:MM:SS AM[0m] Project 'tsconfig.json' is out of date because output file 'tsconfig.tsbuildinfo' does not exist

[[90mHH:MM:SS AM[0m] Building project 'tsconfig.json'...

[96mindex.ts[0m:[93m2[0m:[93m14[0m - [91merror[0m[90m TS4023: [0mExported variable 'api' has or is using name 'KyInstance' from external module "/home/src/workspaces/project/node_modules/ky/distribution/index" but cannot be named.

[7m2[0m export const api = ky.extend({});
[7m [0m [91m             ~~~[0m

TSFILE:  /home/src/workspaces/project/index.js
TSFILE:  /home/src/workspaces/project/index.d.ts
TSFILE:  /home/src/workspaces/project/tsconfig.tsbuildinfo
../../tslibs/TS/Lib/lib.esnext.full.d.ts
   Default library for target 'ESNext'
node_modules/ky/distribution/index.d.ts
   Imported via 'ky' from file 'index.ts'
   File is ECMAScript module because 'node_modules/ky/package.json' has field "type" with value "module"
index.ts
   Matched by default include pattern '**/*'
   File is ECMAScript module because 'package.json' has field "type" with value "module"

Found 1 error in index.ts[90m:2[0m

//// [/home/src/tslibs/TS/Lib/lib.esnext.full.d.ts] *Lib*
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
export declare const api: {
    extend(options: Record<string, unknown>): KyInstance;
};

//// [/home/src/workspaces/project/index.js] *new* 
import ky from 'ky';
export const api = ky.extend({});

//// [/home/src/workspaces/project/tsconfig.tsbuildinfo] *new* 
{"version":"FakeTSVersion","root":[3],"fileNames":["lib.esnext.full.d.ts","./node_modules/ky/distribution/index.d.ts","./index.ts"],"fileInfos":[{"version":"8859c12c614ce56ba9a18e58384a198f-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ninterface SymbolConstructor {\n    (desc?: string | number): symbol;\n    for(name: string): symbol;\n    readonly toStringTag: symbol;\n}\ndeclare var Symbol: SymbolConstructor;\ninterface Symbol {\n    readonly [Symbol.toStringTag]: string;\n}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true,"impliedNodeFormat":1},{"version":"b9b50c37c18e43d94b0dd4fb43967f10-type KyInstance = {\n    extend(options: Record<string,unknown>): KyInstance;\n}\ndeclare const ky: KyInstance;\nexport default ky;","impliedNodeFormat":99},{"version":"0f5091e963c17913313e4969c59e6eb4-import ky from 'ky';\nexport const api = ky.extend({});","signature":"5816fe34b5cf354b0d0d19bc77874616-export declare const api: {\n    extend(options: Record<string, unknown>): KyInstance;\n};\n\n(34,3): error4023: Exported variable 'api' has or is using name 'KyInstance' from external module \"/home/src/workspaces/project/node_modules/ky/distribution/index\" but cannot be named.","impliedNodeFormat":99}],"fileIdsList":[[2]],"options":{"composite":false,"declaration":true,"module":199,"skipLibCheck":true,"skipDefaultLibCheck":true},"referencedMap":[[3,1]],"emitDiagnosticsPerFile":[[3,[{"pos":34,"end":37,"code":4023,"category":1,"message":"Exported variable 'api' has or is using name 'KyInstance' from external module \"/home/src/workspaces/project/node_modules/ky/distribution/index\" but cannot be named."}]]]}
//// [/home/src/workspaces/project/tsconfig.tsbuildinfo.readable.baseline.txt] *new* 
{
  "version": "FakeTSVersion",
  "root": [
    {
      "files": [
        "./index.ts"
      ],
      "original": 3
    }
  ],
  "fileNames": [
    "lib.esnext.full.d.ts",
    "./node_modules/ky/distribution/index.d.ts",
    "./index.ts"
  ],
  "fileInfos": [
    {
      "fileName": "lib.esnext.full.d.ts",
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
      "fileName": "./node_modules/ky/distribution/index.d.ts",
      "version": "b9b50c37c18e43d94b0dd4fb43967f10-type KyInstance = {\n    extend(options: Record<string,unknown>): KyInstance;\n}\ndeclare const ky: KyInstance;\nexport default ky;",
      "signature": "b9b50c37c18e43d94b0dd4fb43967f10-type KyInstance = {\n    extend(options: Record<string,unknown>): KyInstance;\n}\ndeclare const ky: KyInstance;\nexport default ky;",
      "impliedNodeFormat": "ESNext",
      "original": {
        "version": "b9b50c37c18e43d94b0dd4fb43967f10-type KyInstance = {\n    extend(options: Record<string,unknown>): KyInstance;\n}\ndeclare const ky: KyInstance;\nexport default ky;",
        "impliedNodeFormat": 99
      }
    },
    {
      "fileName": "./index.ts",
      "version": "0f5091e963c17913313e4969c59e6eb4-import ky from 'ky';\nexport const api = ky.extend({});",
      "signature": "5816fe34b5cf354b0d0d19bc77874616-export declare const api: {\n    extend(options: Record<string, unknown>): KyInstance;\n};\n\n(34,3): error4023: Exported variable 'api' has or is using name 'KyInstance' from external module \"/home/src/workspaces/project/node_modules/ky/distribution/index\" but cannot be named.",
      "impliedNodeFormat": "ESNext",
      "original": {
        "version": "0f5091e963c17913313e4969c59e6eb4-import ky from 'ky';\nexport const api = ky.extend({});",
        "signature": "5816fe34b5cf354b0d0d19bc77874616-export declare const api: {\n    extend(options: Record<string, unknown>): KyInstance;\n};\n\n(34,3): error4023: Exported variable 'api' has or is using name 'KyInstance' from external module \"/home/src/workspaces/project/node_modules/ky/distribution/index\" but cannot be named.",
        "impliedNodeFormat": 99
      }
    }
  ],
  "fileIdsList": [
    [
      "./node_modules/ky/distribution/index.d.ts"
    ]
  ],
  "options": {
    "composite": false,
    "declaration": true,
    "module": 199,
    "skipLibCheck": true,
    "skipDefaultLibCheck": true
  },
  "referencedMap": {
    "./index.ts": [
      "./node_modules/ky/distribution/index.d.ts"
    ]
  },
  "emitDiagnosticsPerFile": [
    [
      "./index.ts",
      [
        {
          "pos": 34,
          "end": 37,
          "code": 4023,
          "category": 1,
          "message": "Exported variable 'api' has or is using name 'KyInstance' from external module \"/home/src/workspaces/project/node_modules/ky/distribution/index\" but cannot be named."
        }
      ]
    ]
  ],
  "size": 1983
}

tsconfig.json::
SemanticDiagnostics::
*refresh*    /home/src/tslibs/TS/Lib/lib.esnext.full.d.ts
*refresh*    /home/src/workspaces/project/node_modules/ky/distribution/index.d.ts
*refresh*    /home/src/workspaces/project/index.ts
Signatures::
(stored at emit) /home/src/workspaces/project/index.ts


Edit [0]:: no change

tsgo -b --explainFiles --listEmittedFiles --v
ExitStatus:: DiagnosticsPresent_OutputsSkipped
Output::
[[90mHH:MM:SS AM[0m] Projects in this build: 
    * tsconfig.json

[[90mHH:MM:SS AM[0m] Project 'tsconfig.json' is out of date because buildinfo file 'tsconfig.tsbuildinfo' indicates that program needs to report errors.

[[90mHH:MM:SS AM[0m] Building project 'tsconfig.json'...

[96mindex.ts[0m:[93m2[0m:[93m14[0m - [91merror[0m[90m TS4023: [0mExported variable 'api' has or is using name 'KyInstance' from external module "/home/src/workspaces/project/node_modules/ky/distribution/index" but cannot be named.

[7m2[0m export const api = ky.extend({});
[7m [0m [91m             ~~~[0m

TSFILE:  /home/src/workspaces/project/tsconfig.tsbuildinfo
../../tslibs/TS/Lib/lib.esnext.full.d.ts
   Default library for target 'ESNext'
node_modules/ky/distribution/index.d.ts
   Imported via 'ky' from file 'index.ts'
   File is ECMAScript module because 'node_modules/ky/package.json' has field "type" with value "module"
index.ts
   Matched by default include pattern '**/*'
   File is ECMAScript module because 'package.json' has field "type" with value "module"

Found 1 error in index.ts[90m:2[0m

//// [/home/src/workspaces/project/tsconfig.tsbuildinfo] *rewrite with same content*
//// [/home/src/workspaces/project/tsconfig.tsbuildinfo.readable.baseline.txt] *rewrite with same content*

tsconfig.json::
SemanticDiagnostics::
Signatures::
