currentDirectory::/home/src/workspaces/project
useCaseSensitiveFileNames::true
Input::
//// [/home/src/workspaces/project/node_modules/a] -> /home/src/workspaces/project/packages/a *new*
//// [/home/src/workspaces/project/packages/a/index.js] *new* 
export const a = 'a';
//// [/home/src/workspaces/project/packages/a/package.json] *new* 
{
    "name": "a",
    "version": "0.0.0",
    "type": "module",
    "exports": {
        ".": {
            "types": "./types/index.d.ts",
            "default": "./index.js"
        }
    }
}
//// [/home/src/workspaces/project/packages/a/test/index.js] *new* 
import 'a';
//// [/home/src/workspaces/project/packages/a/tsconfig.json] *new* 
{
    "compilerOptions": {
        "checkJs": true,
        "composite": true,
        "declaration": true,
        "emitDeclarationOnly": true,
        "module": "nodenext",
        "outDir": "types",
    },
}
//// [/home/src/workspaces/project/packages/b/index.js] *new* 
export { a } from 'a';
//// [/home/src/workspaces/project/packages/b/package.json] *new* 
{
    "name": "b",
    "version": "0.0.0",
    "type": "module"
}
//// [/home/src/workspaces/project/packages/b/tsconfig.json] *new* 
{
"references": [{ "path": "../a" }],
    "compilerOptions": {
        "checkJs": true,
        "module": "nodenext",
        "noEmit": true,
        "noImplicitAny": true,
    },
}

tsgo -b packages/b --verbose --traceResolution --explainFiles
ExitStatus:: Success
Output::
[[90mHH:MM:SS AM[0m] Projects in this build: 
    * packages/a/tsconfig.json
    * packages/b/tsconfig.json

[[90mHH:MM:SS AM[0m] Project 'packages/a/tsconfig.json' is out of date because output file 'packages/a/types/tsconfig.tsbuildinfo' does not exist

[[90mHH:MM:SS AM[0m] Building project 'packages/a/tsconfig.json'...

======== Resolving module 'a' from '/home/src/workspaces/project/packages/a/test/index.js'. ========
Module resolution kind is not specified, using 'NodeNext'.
Resolving in ESM mode with conditions 'import', 'types', 'node'.
File '/home/src/workspaces/project/packages/a/test/package.json' does not exist.
Found 'package.json' at '/home/src/workspaces/project/packages/a/package.json'.
Entering conditional exports.
Matched 'exports' condition 'types'.
Using 'exports' subpath '.' with target './types/index.d.ts'.
File '/home/src/workspaces/project/packages/a/types/index.d.ts' does not exist.
Failed to resolve under condition 'types'.
Matched 'exports' condition 'default'.
Using 'exports' subpath '.' with target './index.js'.
File name '/home/src/workspaces/project/packages/a/index.js' has a '.js' extension - stripping it.
File '/home/src/workspaces/project/packages/a/index.ts' does not exist.
File '/home/src/workspaces/project/packages/a/index.tsx' does not exist.
File '/home/src/workspaces/project/packages/a/index.d.ts' does not exist.
File '/home/src/workspaces/project/packages/a/index.js' exists - use it as a name resolution result.
'package.json' does not have a 'peerDependencies' field.
Resolved under condition 'default'.
Exiting conditional exports.
======== Module name 'a' was successfully resolved to '/home/src/workspaces/project/packages/a/index.js' with Package ID 'a/index.js@0.0.0'. ========
../../tslibs/TS/Lib/lib.esnext.full.d.ts
   Default library for target 'ESNext'
packages/a/index.js
   Matched by default include pattern '**/*'
   Imported via 'a' from file 'packages/a/test/index.js' with packageId 'a/index.js@0.0.0'
   File is ECMAScript module because 'packages/a/package.json' has field "type" with value "module"
packages/a/test/index.js
   Matched by default include pattern '**/*'
   File is ECMAScript module because 'packages/a/package.json' has field "type" with value "module"
[[90mHH:MM:SS AM[0m] Project 'packages/b/tsconfig.json' is out of date because output file 'packages/b/tsconfig.tsbuildinfo' does not exist

[[90mHH:MM:SS AM[0m] Building project 'packages/b/tsconfig.json'...

======== Resolving module 'a' from '/home/src/workspaces/project/packages/b/index.js'. ========
Module resolution kind is not specified, using 'NodeNext'.
Resolving in ESM mode with conditions 'import', 'types', 'node'.
Found 'package.json' at '/home/src/workspaces/project/packages/b/package.json'.
Loading module 'a' from 'node_modules' folder, target file types: TypeScript, JavaScript, Declaration.
Searching all ancestor node_modules directories for preferred extensions: TypeScript, Declaration.
Directory '/home/src/workspaces/project/packages/b/node_modules' does not exist, skipping all lookups in it.
Directory '/home/src/workspaces/project/packages/b/node_modules/@types' does not exist, skipping all lookups in it.
Directory '/home/src/workspaces/project/packages/node_modules' does not exist, skipping all lookups in it.
Directory '/home/src/workspaces/project/packages/node_modules/@types' does not exist, skipping all lookups in it.
Found 'package.json' at '/home/src/workspaces/project/node_modules/a/package.json'.
Entering conditional exports.
Matched 'exports' condition 'types'.
Using 'exports' subpath '.' with target './types/index.d.ts'.
File '/home/src/workspaces/project/node_modules/a/types/index.d.ts' exists - use it as a name resolution result.
'package.json' does not have a 'peerDependencies' field.
Resolved under condition 'types'.
Exiting conditional exports.
Resolving real path for '/home/src/workspaces/project/node_modules/a/types/index.d.ts', result '/home/src/workspaces/project/packages/a/types/index.d.ts'.
======== Module name 'a' was successfully resolved to '/home/src/workspaces/project/packages/a/types/index.d.ts' with Package ID 'a/types/index.d.ts@0.0.0'. ========
../../tslibs/TS/Lib/lib.esnext.full.d.ts
   Default library for target 'ESNext'
packages/a/types/index.d.ts
   Imported via 'a' from file 'packages/b/index.js' with packageId 'a/types/index.d.ts@0.0.0'
   File is ECMAScript module because 'packages/a/package.json' has field "type" with value "module"
packages/b/index.js
   Matched by default include pattern '**/*'
   File is ECMAScript module because 'packages/b/package.json' has field "type" with value "module"
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
//// [/home/src/workspaces/project/node_modules/a] *deleted*
//// [/home/src/workspaces/project/packages/a/types/index.d.ts] *new* 
export declare const a = "a";

//// [/home/src/workspaces/project/packages/a/types/test/index.d.ts] *new* 
import 'a';

//// [/home/src/workspaces/project/packages/a/types/tsconfig.tsbuildinfo] *new* 
{"version":"FakeTSVersion","root":[[2,3]],"fileNames":["lib.esnext.full.d.ts","../index.js","../test/index.js"],"fileInfos":[{"version":"8859c12c614ce56ba9a18e58384a198f-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ninterface SymbolConstructor {\n    (desc?: string | number): symbol;\n    for(name: string): symbol;\n    readonly toStringTag: symbol;\n}\ndeclare var Symbol: SymbolConstructor;\ninterface Symbol {\n    readonly [Symbol.toStringTag]: string;\n}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true,"impliedNodeFormat":1},{"version":"fb6f7bce1e97f6455fc2f6a3fc00ca67-export const a = 'a';","signature":"410f445844ca5e1f83239796f66520a1-export declare const a = \"a\";\n","impliedNodeFormat":99},{"version":"25c2781885c8232d7ba0f67afa33aa44-import 'a';","signature":"518d564eba22abfaf340ce3ae18a4763-import 'a';\n","impliedNodeFormat":99}],"fileIdsList":[[2]],"options":{"checkJs":true,"composite":true,"emitDeclarationOnly":true,"declaration":true,"module":199,"outDir":"./"},"referencedMap":[[3,1]],"latestChangedDtsFile":"./test/index.d.ts"}
//// [/home/src/workspaces/project/packages/a/types/tsconfig.tsbuildinfo.readable.baseline.txt] *new* 
{
  "version": "FakeTSVersion",
  "root": [
    {
      "files": [
        "../index.js",
        "../test/index.js"
      ],
      "original": [
        2,
        3
      ]
    }
  ],
  "fileNames": [
    "lib.esnext.full.d.ts",
    "../index.js",
    "../test/index.js"
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
      "fileName": "../index.js",
      "version": "fb6f7bce1e97f6455fc2f6a3fc00ca67-export const a = 'a';",
      "signature": "410f445844ca5e1f83239796f66520a1-export declare const a = \"a\";\n",
      "impliedNodeFormat": "ESNext",
      "original": {
        "version": "fb6f7bce1e97f6455fc2f6a3fc00ca67-export const a = 'a';",
        "signature": "410f445844ca5e1f83239796f66520a1-export declare const a = \"a\";\n",
        "impliedNodeFormat": 99
      }
    },
    {
      "fileName": "../test/index.js",
      "version": "25c2781885c8232d7ba0f67afa33aa44-import 'a';",
      "signature": "518d564eba22abfaf340ce3ae18a4763-import 'a';\n",
      "impliedNodeFormat": "ESNext",
      "original": {
        "version": "25c2781885c8232d7ba0f67afa33aa44-import 'a';",
        "signature": "518d564eba22abfaf340ce3ae18a4763-import 'a';\n",
        "impliedNodeFormat": 99
      }
    }
  ],
  "fileIdsList": [
    [
      "../index.js"
    ]
  ],
  "options": {
    "checkJs": true,
    "composite": true,
    "emitDeclarationOnly": true,
    "declaration": true,
    "module": 199,
    "outDir": "./"
  },
  "referencedMap": {
    "../test/index.js": [
      "../index.js"
    ]
  },
  "latestChangedDtsFile": "./test/index.d.ts",
  "size": 1416
}
//// [/home/src/workspaces/project/packages/b/tsconfig.tsbuildinfo] *new* 
{"version":"FakeTSVersion","root":["./index.js"]}
//// [/home/src/workspaces/project/packages/b/tsconfig.tsbuildinfo.readable.baseline.txt] *new* 
{
  "version": "FakeTSVersion",
  "root": [
    {
      "files": [
        "./index.js"
      ],
      "original": "./index.js"
    }
  ],
  "size": 49
}

packages/a/tsconfig.json::
SemanticDiagnostics::
*refresh*    /home/src/tslibs/TS/Lib/lib.esnext.full.d.ts
*refresh*    /home/src/workspaces/project/packages/a/index.js
*refresh*    /home/src/workspaces/project/packages/a/test/index.js
Signatures::
(stored at emit) /home/src/workspaces/project/packages/a/index.js
(stored at emit) /home/src/workspaces/project/packages/a/test/index.js

packages/b/tsconfig.json::
SemanticDiagnostics::
*refresh*    /home/src/tslibs/TS/Lib/lib.esnext.full.d.ts
*refresh*    /home/src/workspaces/project/packages/a/types/index.d.ts
*refresh*    /home/src/workspaces/project/packages/b/index.js
Signatures::
