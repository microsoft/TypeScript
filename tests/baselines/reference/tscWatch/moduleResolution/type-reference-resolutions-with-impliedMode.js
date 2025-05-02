currentDirectory:: /user/username/projects/myproject useCaseSensitiveFileNames:: false
Input::
//// [/user/username/projects/myproject/package.json]
{
  "name": "myproject",
  "version": "1.0.0",
  "type": "module"
}

//// [/user/username/projects/myproject/tsconfig.json]
{
  "compilerOptions": {
    "moduleResolution": "node16",
    "module": "node16",
    "moduleDetection": "legacy",
    "types": []
  }
}

//// [/user/username/projects/myproject/index.ts]
/// <reference types="pkg"/>
interface LocalInterface extends RequireInterface {}


//// [/user/username/projects/myproject/node_modules/@types/pkg/package.json]
{
  "name": "pkg",
  "version": "0.0.1",
  "exports": {
    "import": "./import.js",
    "require": "./require.js"
  }
}

//// [/user/username/projects/myproject/node_modules/@types/pkg/import.d.ts]
export {};
declare global {
    interface ImportInterface {}
}


//// [/user/username/projects/myproject/node_modules/@types/pkg/require.d.ts]
export {};
declare global {
    interface RequireInterface {}
}


//// [/home/src/tslibs/TS/Lib/lib.d.ts]
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
declare const console: { log(msg: any): void; };


/home/src/tslibs/TS/Lib/tsc.js -w --traceResolution --explainFiles
Output::
>> Screen clear
[[90mHH:MM:SS AM[0m] Starting compilation in watch mode...

Found 'package.json' at '/user/username/projects/myproject/package.json'.
======== Resolving type reference directive 'pkg', containing file '/user/username/projects/myproject/index.ts', root directory '/user/username/projects/myproject/node_modules/@types,/user/username/projects/node_modules/@types,/user/username/node_modules/@types,/user/node_modules/@types,/node_modules/@types'. ========
Resolving with primary search path '/user/username/projects/myproject/node_modules/@types, /user/username/projects/node_modules/@types, /user/username/node_modules/@types, /user/node_modules/@types, /node_modules/@types'.
Found 'package.json' at '/user/username/projects/myproject/node_modules/@types/pkg/package.json'.
'package.json' does not have a 'typesVersions' field.
'package.json' does not have a 'typings' field.
'package.json' does not have a 'types' field.
'package.json' does not have a 'main' field.
Directory '/user/username/projects/node_modules/@types' does not exist, skipping all lookups in it.
Directory '/user/username/node_modules/@types' does not exist, skipping all lookups in it.
Directory '/user/node_modules/@types' does not exist, skipping all lookups in it.
Directory '/node_modules/@types' does not exist, skipping all lookups in it.
Looking up in 'node_modules' folder, initial location '/user/username/projects/myproject'.
Searching all ancestor node_modules directories for preferred extensions: Declaration.
File '/user/username/projects/myproject/node_modules/@types/pkg/package.json' exists according to earlier cached lookups.
Entering conditional exports.
Matched 'exports' condition 'import'.
Using 'exports' subpath '.' with target './import.js'.
File name '/user/username/projects/myproject/node_modules/@types/pkg/import.js' has a '.js' extension - stripping it.
File '/user/username/projects/myproject/node_modules/@types/pkg/import.d.ts' exists - use it as a name resolution result.
'package.json' does not have a 'peerDependencies' field.
Resolved under condition 'import'.
Exiting conditional exports.
Resolving real path for '/user/username/projects/myproject/node_modules/@types/pkg/import.d.ts', result '/user/username/projects/myproject/node_modules/@types/pkg/import.d.ts'.
======== Type reference directive 'pkg' was successfully resolved to '/user/username/projects/myproject/node_modules/@types/pkg/import.d.ts' with Package ID 'pkg/import.d.ts@0.0.1', primary: false. ========
File '/user/username/projects/myproject/node_modules/@types/pkg/package.json' exists according to earlier cached lookups.
File '/home/src/tslibs/TS/Lib/package.json' does not exist.
File '/home/src/tslibs/TS/package.json' does not exist.
File '/home/src/tslibs/package.json' does not exist.
File '/home/src/package.json' does not exist.
File '/home/package.json' does not exist.
File '/package.json' does not exist.
[96mindex.ts[0m:[93m2[0m:[93m34[0m - [91merror[0m[90m TS2304: [0mCannot find name 'RequireInterface'.

[7m2[0m interface LocalInterface extends RequireInterface {}
[7m [0m [91m                                 ~~~~~~~~~~~~~~~~[0m

../../../../home/src/tslibs/TS/Lib/lib.es2022.full.d.ts
  Default library for target 'es2022'
node_modules/@types/pkg/import.d.ts
  Type library referenced via 'pkg' from file 'index.ts' with packageId 'pkg/import.d.ts@0.0.1'
  File is CommonJS module because 'node_modules/@types/pkg/package.json' does not have field "type"
index.ts
  Matched by default include pattern '**/*'
[[90mHH:MM:SS AM[0m] Found 1 error. Watching for file changes.



//// [/home/src/tslibs/TS/Lib/lib.es2022.full.d.ts] *Lib*

//// [/user/username/projects/myproject/index.js]
/// <reference types="pkg"/>



PolledWatches::
/home/src/tslibs/TS/Lib/package.json: *new*
  {"pollingInterval":2000}
/home/src/tslibs/TS/package.json: *new*
  {"pollingInterval":2000}
/home/src/tslibs/package.json: *new*
  {"pollingInterval":2000}
/user/username/projects/node_modules: *new*
  {"pollingInterval":500}

FsWatches::
/home/src/tslibs/TS/Lib/lib.es2022.full.d.ts: *new*
  {}
/user/username/projects/myproject/index.ts: *new*
  {}
/user/username/projects/myproject/node_modules/@types/pkg/import.d.ts: *new*
  {}
/user/username/projects/myproject/node_modules/@types/pkg/package.json: *new*
  {}
/user/username/projects/myproject/package.json: *new*
  {}
/user/username/projects/myproject/tsconfig.json: *new*
  {}

FsWatchesRecursive::
/user/username/projects/myproject: *new*
  {}
/user/username/projects/myproject/node_modules: *new*
  {}

Program root files: [
  "/user/username/projects/myproject/index.ts"
]
Program options: {
  "moduleResolution": 3,
  "module": 100,
  "moduleDetection": 1,
  "types": [],
  "watch": true,
  "traceResolution": true,
  "explainFiles": true,
  "configFilePath": "/user/username/projects/myproject/tsconfig.json"
}
Program structureReused: Not
Program files::
/home/src/tslibs/TS/Lib/lib.es2022.full.d.ts
/user/username/projects/myproject/node_modules/@types/pkg/import.d.ts
/user/username/projects/myproject/index.ts

Semantic diagnostics in builder refreshed for::
/home/src/tslibs/TS/Lib/lib.es2022.full.d.ts
/user/username/projects/myproject/node_modules/@types/pkg/import.d.ts
/user/username/projects/myproject/index.ts

Shape signatures in builder refreshed for::
/home/src/tslibs/ts/lib/lib.es2022.full.d.ts (used version)
/user/username/projects/myproject/node_modules/@types/pkg/import.d.ts (used version)
/user/username/projects/myproject/index.ts (used version)

exitCode:: ExitStatus.undefined

Change:: Modify package json

Input::
//// [/user/username/projects/myproject/package.json]
{
  "name": "myproject",
  "version": "1.0.0"
}{
  "name": "myproject",
  "version": "1.0.0",
  "type": "module"
}


Timeout callback:: count: 1
1: timerToInvalidateFailedLookupResolutions *new*

Before running Timeout callback:: count: 1
1: timerToInvalidateFailedLookupResolutions

Host is moving to new time
After running Timeout callback:: count: 1

Timeout callback:: count: 1
2: timerToUpdateProgram *new*

Before running Timeout callback:: count: 1
2: timerToUpdateProgram

Host is moving to new time
After running Timeout callback:: count: 0
Output::
>> Screen clear
[[90mHH:MM:SS AM[0m] File change detected. Starting incremental compilation...

File '/home/src/tslibs/TS/Lib/package.json' does not exist according to earlier cached lookups.
File '/home/src/tslibs/TS/package.json' does not exist according to earlier cached lookups.
File '/home/src/tslibs/package.json' does not exist according to earlier cached lookups.
File '/home/src/package.json' does not exist according to earlier cached lookups.
File '/home/package.json' does not exist according to earlier cached lookups.
File '/package.json' does not exist according to earlier cached lookups.
File '/user/username/projects/myproject/node_modules/@types/pkg/package.json' exists according to earlier cached lookups.
Found 'package.json' at '/user/username/projects/myproject/package.json'.
File '/user/username/projects/myproject/package.json' exists according to earlier cached lookups.
======== Resolving type reference directive 'pkg', containing file '/user/username/projects/myproject/index.ts', root directory '/user/username/projects/myproject/node_modules/@types,/user/username/projects/node_modules/@types,/user/username/node_modules/@types,/user/node_modules/@types,/node_modules/@types'. ========
Resolving with primary search path '/user/username/projects/myproject/node_modules/@types, /user/username/projects/node_modules/@types, /user/username/node_modules/@types, /user/node_modules/@types, /node_modules/@types'.
File '/user/username/projects/myproject/node_modules/@types/pkg/package.json' exists according to earlier cached lookups.
'package.json' does not have a 'typings' field.
'package.json' does not have a 'types' field.
'package.json' does not have a 'main' field.
File '/user/username/projects/myproject/node_modules/@types/pkg/index.d.ts' does not exist.
Directory '/user/username/projects/node_modules/@types' does not exist, skipping all lookups in it.
Directory '/user/username/node_modules/@types' does not exist, skipping all lookups in it.
Directory '/user/node_modules/@types' does not exist, skipping all lookups in it.
Directory '/node_modules/@types' does not exist, skipping all lookups in it.
Looking up in 'node_modules' folder, initial location '/user/username/projects/myproject'.
Searching all ancestor node_modules directories for preferred extensions: Declaration.
File '/user/username/projects/myproject/node_modules/pkg.d.ts' does not exist.
File '/user/username/projects/myproject/node_modules/@types/pkg/package.json' exists according to earlier cached lookups.
Entering conditional exports.
Saw non-matching condition 'import'.
Matched 'exports' condition 'require'.
Using 'exports' subpath '.' with target './require.js'.
File name '/user/username/projects/myproject/node_modules/@types/pkg/require.js' has a '.js' extension - stripping it.
File '/user/username/projects/myproject/node_modules/@types/pkg/require.d.ts' exists - use it as a name resolution result.
Resolved under condition 'require'.
Exiting conditional exports.
Resolving real path for '/user/username/projects/myproject/node_modules/@types/pkg/require.d.ts', result '/user/username/projects/myproject/node_modules/@types/pkg/require.d.ts'.
======== Type reference directive 'pkg' was successfully resolved to '/user/username/projects/myproject/node_modules/@types/pkg/require.d.ts' with Package ID 'pkg/require.d.ts@0.0.1', primary: false. ========
File '/user/username/projects/myproject/node_modules/@types/pkg/package.json' exists according to earlier cached lookups.
File '/home/src/tslibs/TS/Lib/package.json' does not exist according to earlier cached lookups.
File '/home/src/tslibs/TS/package.json' does not exist according to earlier cached lookups.
File '/home/src/tslibs/package.json' does not exist according to earlier cached lookups.
File '/home/src/package.json' does not exist according to earlier cached lookups.
File '/home/package.json' does not exist according to earlier cached lookups.
File '/package.json' does not exist according to earlier cached lookups.
../../../../home/src/tslibs/TS/Lib/lib.es2022.full.d.ts
  Default library for target 'es2022'
node_modules/@types/pkg/require.d.ts
  Type library referenced via 'pkg' from file 'index.ts' with packageId 'pkg/require.d.ts@0.0.1'
  File is CommonJS module because 'node_modules/@types/pkg/package.json' does not have field "type"
index.ts
  Matched by default include pattern '**/*'
[[90mHH:MM:SS AM[0m] Found 0 errors. Watching for file changes.



//// [/user/username/projects/myproject/index.js] file written with same contents

PolledWatches::
/home/src/tslibs/TS/Lib/package.json:
  {"pollingInterval":2000}
/home/src/tslibs/TS/package.json:
  {"pollingInterval":2000}
/home/src/tslibs/package.json:
  {"pollingInterval":2000}
/user/username/projects/node_modules:
  {"pollingInterval":500}

FsWatches::
/home/src/tslibs/TS/Lib/lib.es2022.full.d.ts:
  {}
/user/username/projects/myproject/index.ts:
  {}
/user/username/projects/myproject/node_modules/@types/pkg/package.json:
  {}
/user/username/projects/myproject/node_modules/@types/pkg/require.d.ts: *new*
  {}
/user/username/projects/myproject/package.json:
  {}
/user/username/projects/myproject/tsconfig.json:
  {}

FsWatches *deleted*::
/user/username/projects/myproject/node_modules/@types/pkg/import.d.ts:
  {}

FsWatchesRecursive::
/user/username/projects/myproject:
  {}
/user/username/projects/myproject/node_modules:
  {}


Program root files: [
  "/user/username/projects/myproject/index.ts"
]
Program options: {
  "moduleResolution": 3,
  "module": 100,
  "moduleDetection": 1,
  "types": [],
  "watch": true,
  "traceResolution": true,
  "explainFiles": true,
  "configFilePath": "/user/username/projects/myproject/tsconfig.json"
}
Program structureReused: SafeModules
Program files::
/home/src/tslibs/TS/Lib/lib.es2022.full.d.ts
/user/username/projects/myproject/node_modules/@types/pkg/require.d.ts
/user/username/projects/myproject/index.ts

Semantic diagnostics in builder refreshed for::
/home/src/tslibs/TS/Lib/lib.es2022.full.d.ts
/user/username/projects/myproject/node_modules/@types/pkg/require.d.ts
/user/username/projects/myproject/index.ts

Shape signatures in builder refreshed for::
/user/username/projects/myproject/node_modules/@types/pkg/require.d.ts (used version)
/user/username/projects/myproject/index.ts (computed .d.ts)

exitCode:: ExitStatus.undefined
