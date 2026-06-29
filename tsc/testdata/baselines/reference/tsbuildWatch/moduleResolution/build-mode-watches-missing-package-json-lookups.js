currentDirectory::/user/username/projects/myproject
useCaseSensitiveFileNames::true
Input::
//// [/user/username/projects/myproject/packages/pkg1/index.ts] *new* 
import type { TheNum } from 'pkg2'
export const theNum: TheNum = 42;
//// [/user/username/projects/myproject/packages/pkg1/tsconfig.json] *new* 
{
    "compilerOptions": {
        "outDir": "build",
    },
}

tsgo -b packages/pkg1 -w --verbose --traceResolution
ExitStatus:: DiagnosticsPresent_OutputsGenerated
Output::
[2J[3J[H[[90mHH:MM:SS AM[0m] Starting compilation in watch mode...

[[90mHH:MM:SS AM[0m] Projects in this build: 
    * packages/pkg1/tsconfig.json

[[90mHH:MM:SS AM[0m] Project 'packages/pkg1/tsconfig.json' is out of date because output file 'packages/pkg1/build/tsconfig.tsbuildinfo' does not exist

[[90mHH:MM:SS AM[0m] Building project 'packages/pkg1/tsconfig.json'...

======== Resolving module 'pkg2' from '/user/username/projects/myproject/packages/pkg1/index.ts'. ========
Module resolution kind is not specified, using 'Bundler'.
Resolving in CJS mode with conditions 'import', 'types'.
File '/user/username/projects/myproject/packages/pkg1/package.json' does not exist.
File '/user/username/projects/myproject/packages/package.json' does not exist.
File '/user/username/projects/myproject/package.json' does not exist.
File '/user/username/projects/package.json' does not exist.
File '/user/username/package.json' does not exist.
File '/user/package.json' does not exist.
File '/package.json' does not exist.
Loading module 'pkg2' from 'node_modules' folder, target file types: TypeScript, JavaScript, Declaration, JSON.
Searching all ancestor node_modules directories for preferred extensions: TypeScript, Declaration.
Directory '/user/username/projects/myproject/packages/pkg1/node_modules' does not exist, skipping all lookups in it.
Directory '/user/username/projects/myproject/packages/node_modules' does not exist, skipping all lookups in it.
Directory '/user/username/projects/myproject/node_modules' does not exist, skipping all lookups in it.
Directory '/user/username/projects/node_modules' does not exist, skipping all lookups in it.
Directory '/user/username/node_modules' does not exist, skipping all lookups in it.
Directory '/user/node_modules' does not exist, skipping all lookups in it.
Directory '/node_modules' does not exist, skipping all lookups in it.
Searching all ancestor node_modules directories for fallback extensions: JavaScript, JSON.
Directory '/user/username/projects/myproject/packages/pkg1/node_modules' does not exist, skipping all lookups in it.
Directory '/user/username/projects/myproject/packages/node_modules' does not exist, skipping all lookups in it.
Directory '/user/username/projects/myproject/node_modules' does not exist, skipping all lookups in it.
Directory '/user/username/projects/node_modules' does not exist, skipping all lookups in it.
Directory '/user/username/node_modules' does not exist, skipping all lookups in it.
Directory '/user/node_modules' does not exist, skipping all lookups in it.
Directory '/node_modules' does not exist, skipping all lookups in it.
======== Module name 'pkg2' was not resolved. ========
[96mpackages/pkg1/index.ts[0m:[93m1[0m:[93m29[0m - [91merror[0m[90m TS2307: [0mCannot find module 'pkg2' or its corresponding type declarations.

[7m1[0m import type { TheNum } from 'pkg2'
[7m [0m [91m                            ~~~~~~[0m

[[90mHH:MM:SS AM[0m] Found 1 error. Watching for file changes.

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
//// [/user/username/projects/myproject/packages/pkg1/build/index.js] *new* 
export const theNum = 42;

//// [/user/username/projects/myproject/packages/pkg1/build/tsconfig.tsbuildinfo] *new* 
{"version":"FakeTSVersion","root":["../index.ts"],"semanticErrors":true}
//// [/user/username/projects/myproject/packages/pkg1/build/tsconfig.tsbuildinfo.readable.baseline.txt] *new* 
{
  "version": "FakeTSVersion",
  "root": [
    {
      "files": [
        "../index.ts"
      ],
      "original": "../index.ts"
    }
  ],
  "size": 72,
  "semanticErrors": true
}

Watch Registrations::
Directory watches::
  /user/username/projects/myproject
  /user/username/projects/myproject/packages
  /user/username/projects/myproject/packages/pkg1 (recursive)
packages/pkg1/tsconfig.json::
SemanticDiagnostics::
*refresh*    /home/src/tslibs/TS/Lib/lib.es2025.full.d.ts
*refresh*    /user/username/projects/myproject/packages/pkg1/index.ts
Signatures::


Edit [0]:: resolves import after package is installed
//// [/user/username/projects/myproject/node_modules/pkg2/index.d.ts] *new* 
export type TheNum = 42;
//// [/user/username/projects/myproject/node_modules/pkg2/package.json] *new* 
{
    "name": "pkg2",
    "version": "1.0.0",
    "types": "index.d.ts"
}


Output::
[2J[3J[H[[90mHH:MM:SS AM[0m] File change detected. Starting incremental compilation...

[[90mHH:MM:SS AM[0m] Projects in this build: 
    * packages/pkg1/tsconfig.json

[[90mHH:MM:SS AM[0m] Project 'packages/pkg1/tsconfig.json' is out of date because buildinfo file 'packages/pkg1/build/tsconfig.tsbuildinfo' indicates that program needs to report errors.

[[90mHH:MM:SS AM[0m] Building project 'packages/pkg1/tsconfig.json'...

======== Resolving module 'pkg2' from '/user/username/projects/myproject/packages/pkg1/index.ts'. ========
Module resolution kind is not specified, using 'Bundler'.
Resolving in CJS mode with conditions 'import', 'types'.
File '/user/username/projects/myproject/packages/pkg1/package.json' does not exist.
File '/user/username/projects/myproject/packages/package.json' does not exist.
File '/user/username/projects/myproject/package.json' does not exist.
File '/user/username/projects/package.json' does not exist.
File '/user/username/package.json' does not exist.
File '/user/package.json' does not exist.
File '/package.json' does not exist.
Loading module 'pkg2' from 'node_modules' folder, target file types: TypeScript, JavaScript, Declaration, JSON.
Searching all ancestor node_modules directories for preferred extensions: TypeScript, Declaration.
Directory '/user/username/projects/myproject/packages/pkg1/node_modules' does not exist, skipping all lookups in it.
Directory '/user/username/projects/myproject/packages/node_modules' does not exist, skipping all lookups in it.
Found 'package.json' at '/user/username/projects/myproject/node_modules/pkg2/package.json'.
File '/user/username/projects/myproject/node_modules/pkg2.ts' does not exist.
File '/user/username/projects/myproject/node_modules/pkg2.tsx' does not exist.
File '/user/username/projects/myproject/node_modules/pkg2.d.ts' does not exist.
'package.json' does not have a 'typesVersions' field.
'package.json' does not have a 'typings' field.
'package.json' has 'types' field 'index.d.ts' that references '/user/username/projects/myproject/node_modules/pkg2/index.d.ts'.
File '/user/username/projects/myproject/node_modules/pkg2/index.d.ts' exists - use it as a name resolution result.
'package.json' does not have a 'peerDependencies' field.
Resolving real path for '/user/username/projects/myproject/node_modules/pkg2/index.d.ts', result '/user/username/projects/myproject/node_modules/pkg2/index.d.ts'.
======== Module name 'pkg2' was successfully resolved to '/user/username/projects/myproject/node_modules/pkg2/index.d.ts' with Package ID 'pkg2/index.d.ts@1.0.0'. ========
[[90mHH:MM:SS AM[0m] Found 0 errors. Watching for file changes.

//// [/user/username/projects/myproject/packages/pkg1/build/index.js] *rewrite with same content*
//// [/user/username/projects/myproject/packages/pkg1/build/tsconfig.tsbuildinfo] *modified* 
{"version":"FakeTSVersion","root":["../index.ts"],"packageJsons":["../../../node_modules/pkg2/package.json"]}
//// [/user/username/projects/myproject/packages/pkg1/build/tsconfig.tsbuildinfo.readable.baseline.txt] *modified* 
{
  "version": "FakeTSVersion",
  "root": [
    {
      "files": [
        "../index.ts"
      ],
      "original": "../index.ts"
    }
  ],
  "packageJsons": [
    "../../../node_modules/pkg2/package.json"
  ],
  "size": 109
}

Watch Registrations::
Directory watches::
  /user/username/projects/myproject
  /user/username/projects/myproject/node_modules
  /user/username/projects/myproject/node_modules/pkg2
  /user/username/projects/myproject/packages
  /user/username/projects/myproject/packages/pkg1 (recursive)
packages/pkg1/tsconfig.json::
SemanticDiagnostics::
*refresh*    /home/src/tslibs/TS/Lib/lib.es2025.full.d.ts
*refresh*    /user/username/projects/myproject/node_modules/pkg2/index.d.ts
*refresh*    /user/username/projects/myproject/packages/pkg1/index.ts
Signatures::


Edit [1]:: reports import errors after package is removed
//// [/user/username/projects/myproject/node_modules/pkg2/index.d.ts] *deleted*
//// [/user/username/projects/myproject/node_modules/pkg2/package.json] *deleted*


Output::
[2J[3J[H[[90mHH:MM:SS AM[0m] File change detected. Starting incremental compilation...

[[90mHH:MM:SS AM[0m] Projects in this build: 
    * packages/pkg1/tsconfig.json

[[90mHH:MM:SS AM[0m] Project 'packages/pkg1/tsconfig.json' is out of date because input 'node_modules/pkg2/package.json' does not exist.

[[90mHH:MM:SS AM[0m] Building project 'packages/pkg1/tsconfig.json'...

======== Resolving module 'pkg2' from '/user/username/projects/myproject/packages/pkg1/index.ts'. ========
Module resolution kind is not specified, using 'Bundler'.
Resolving in CJS mode with conditions 'import', 'types'.
File '/user/username/projects/myproject/packages/pkg1/package.json' does not exist.
File '/user/username/projects/myproject/packages/package.json' does not exist.
File '/user/username/projects/myproject/package.json' does not exist.
File '/user/username/projects/package.json' does not exist.
File '/user/username/package.json' does not exist.
File '/user/package.json' does not exist.
File '/package.json' does not exist.
Loading module 'pkg2' from 'node_modules' folder, target file types: TypeScript, JavaScript, Declaration, JSON.
Searching all ancestor node_modules directories for preferred extensions: TypeScript, Declaration.
Directory '/user/username/projects/myproject/packages/pkg1/node_modules' does not exist, skipping all lookups in it.
Directory '/user/username/projects/myproject/packages/node_modules' does not exist, skipping all lookups in it.
File '/user/username/projects/myproject/node_modules/pkg2/package.json' does not exist.
File '/user/username/projects/myproject/node_modules/pkg2.ts' does not exist.
File '/user/username/projects/myproject/node_modules/pkg2.tsx' does not exist.
File '/user/username/projects/myproject/node_modules/pkg2.d.ts' does not exist.
File '/user/username/projects/myproject/node_modules/pkg2/index.ts' does not exist.
File '/user/username/projects/myproject/node_modules/pkg2/index.tsx' does not exist.
File '/user/username/projects/myproject/node_modules/pkg2/index.d.ts' does not exist.
Directory '/user/username/projects/myproject/node_modules/@types' does not exist, skipping all lookups in it.
Directory '/user/username/projects/node_modules' does not exist, skipping all lookups in it.
Directory '/user/username/node_modules' does not exist, skipping all lookups in it.
Directory '/user/node_modules' does not exist, skipping all lookups in it.
Directory '/node_modules' does not exist, skipping all lookups in it.
Searching all ancestor node_modules directories for fallback extensions: JavaScript, JSON.
Directory '/user/username/projects/myproject/packages/pkg1/node_modules' does not exist, skipping all lookups in it.
Directory '/user/username/projects/myproject/packages/node_modules' does not exist, skipping all lookups in it.
File '/user/username/projects/myproject/node_modules/pkg2/package.json' does not exist.
File '/user/username/projects/myproject/node_modules/pkg2.js' does not exist.
File '/user/username/projects/myproject/node_modules/pkg2.jsx' does not exist.
File '/user/username/projects/myproject/node_modules/pkg2/index.js' does not exist.
File '/user/username/projects/myproject/node_modules/pkg2/index.jsx' does not exist.
Directory '/user/username/projects/node_modules' does not exist, skipping all lookups in it.
Directory '/user/username/node_modules' does not exist, skipping all lookups in it.
Directory '/user/node_modules' does not exist, skipping all lookups in it.
Directory '/node_modules' does not exist, skipping all lookups in it.
======== Module name 'pkg2' was not resolved. ========
[96mpackages/pkg1/index.ts[0m:[93m1[0m:[93m29[0m - [91merror[0m[90m TS2307: [0mCannot find module 'pkg2' or its corresponding type declarations.

[7m1[0m import type { TheNum } from 'pkg2'
[7m [0m [91m                            ~~~~~~[0m

[[90mHH:MM:SS AM[0m] Found 1 error. Watching for file changes.

//// [/user/username/projects/myproject/packages/pkg1/build/index.js] *rewrite with same content*
//// [/user/username/projects/myproject/packages/pkg1/build/tsconfig.tsbuildinfo] *modified* 
{"version":"FakeTSVersion","root":["../index.ts"],"missingPackageJsons":["../../../node_modules/pkg2/package.json"],"semanticErrors":true}
//// [/user/username/projects/myproject/packages/pkg1/build/tsconfig.tsbuildinfo.readable.baseline.txt] *modified* 
{
  "version": "FakeTSVersion",
  "root": [
    {
      "files": [
        "../index.ts"
      ],
      "original": "../index.ts"
    }
  ],
  "missingPackageJsons": [
    "../../../node_modules/pkg2/package.json"
  ],
  "size": 138,
  "semanticErrors": true
}

Watch Registrations::
Directory watches::
  /user/username/projects/myproject
  /user/username/projects/myproject/node_modules
  /user/username/projects/myproject/node_modules/pkg2
  /user/username/projects/myproject/packages
  /user/username/projects/myproject/packages/pkg1 (recursive)
packages/pkg1/tsconfig.json::
SemanticDiagnostics::
*refresh*    /home/src/tslibs/TS/Lib/lib.es2025.full.d.ts
*refresh*    /user/username/projects/myproject/packages/pkg1/index.ts
Signatures::
