currentDirectory:: /home/src/workspaces/project useCaseSensitiveFileNames:: false
Input::
//// [/home/src/workspaces/project/tsconfig.json]
{
  "compilerOptions": {
    "traceResolution": true
  },
  "include": [
    "*.ts"
  ],
  "exclude": [
    "*.d.ts"
  ]
}

//// [/home/src/workspaces/project/main.ts]
export const x = 10;

//// [/home/src/workspaces/project/fileWithImports.ts]
import type { ImportInterface0 } from "pkg0" assert { "resolution-mode": "import" };
import type { RequireInterface1 } from "pkg1" assert { "resolution-mode": "require" };


//// [/home/src/workspaces/project/randomFileForImport.ts]
export const x = 10;

//// [/home/src/workspaces/project/node_modules/pkg0/package.json]
{
  "name": "pkg0",
  "version": "0.0.1",
  "exports": {
    "import": "./import.js",
    "require": "./require.js"
  }
}

//// [/home/src/workspaces/project/node_modules/pkg0/import.d.ts]
export interface ImportInterface0 {}

//// [/home/src/workspaces/project/node_modules/pkg0/require.d.ts]
export interface RequireInterface0 {}

//// [/home/src/workspaces/project/node_modules/pkg1/package.json]
{
  "name": "pkg1",
  "version": "0.0.1",
  "exports": {
    "import": "./import.js",
    "require": "./require.js"
  }
}

//// [/home/src/workspaces/project/node_modules/pkg1/import.d.ts]
export interface ImportInterface1 {}

//// [/home/src/workspaces/project/fileWithTypeRefs.ts]
/// <reference types="pkg2" resolution-mode="import"/>
/// <reference types="pkg3" resolution-mode="require"/>
interface LocalInterface extends ImportInterface2, RequireInterface3 {}
export {}


//// [/home/src/workspaces/project/randomFileForTypeRef.ts]
export const x = 10;

//// [/home/src/workspaces/project/node_modules/pkg2/package.json]
{
  "name": "pkg2",
  "version": "0.0.1",
  "exports": {
    "import": "./import.js",
    "require": "./require.js"
  }
}

//// [/home/src/workspaces/project/node_modules/pkg2/import.d.ts]
export {};
declare global {
    interface ImportInterface2 {}
}


//// [/home/src/workspaces/project/node_modules/pkg2/require.d.ts]
export {};
declare global {
    interface RequireInterface2 {}
}


//// [/home/src/workspaces/project/node_modules/pkg3/package.json]
{
  "name": "pkg3",
  "version": "0.0.1",
  "exports": {
    "import": "./import.js",
    "require": "./require.js"
  }
}

//// [/home/src/workspaces/project/node_modules/pkg3/import.d.ts]
export {};
declare global {
    interface ImportInterface3 {}
}


//// [/home/src/workspaces/project/node_modules/@types/pkg4/index.d.ts]
export const x = 10;

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


/home/src/tslibs/TS/Lib/tsc.js -w -p /home/src/workspaces/project/tsconfig.json --explainFiles --extendedDiagnostics
Output::
[[90mHH:MM:SS AM[0m] Starting compilation in watch mode...

Current directory: /home/src/workspaces/project CaseSensitiveFileNames: false
FileWatcher:: Added:: WatchInfo: /home/src/workspaces/project/tsconfig.json 2000 undefined Config file
Synchronizing program
CreatingProgramWith::
  roots: ["/home/src/workspaces/project/fileWithImports.ts","/home/src/workspaces/project/fileWithTypeRefs.ts","/home/src/workspaces/project/main.ts","/home/src/workspaces/project/randomFileForImport.ts","/home/src/workspaces/project/randomFileForTypeRef.ts"]
  options: {"traceResolution":true,"watch":true,"project":"/home/src/workspaces/project/tsconfig.json","explainFiles":true,"extendedDiagnostics":true,"configFilePath":"/home/src/workspaces/project/tsconfig.json"}
FileWatcher:: Added:: WatchInfo: /home/src/workspaces/project/fileWithImports.ts 250 undefined Source file
======== Resolving module 'pkg0' from '/home/src/workspaces/project/fileWithImports.ts'. ========
Module resolution kind is not specified, using 'Node10'.
File '/home/src/workspaces/project/package.json' does not exist.
File '/home/src/workspaces/package.json' does not exist.
File '/home/src/package.json' does not exist.
File '/home/package.json' does not exist.
File '/package.json' does not exist.
Loading module 'pkg0' from 'node_modules' folder, target file types: TypeScript, Declaration.
Searching all ancestor node_modules directories for preferred extensions: TypeScript, Declaration.
Found 'package.json' at '/home/src/workspaces/project/node_modules/pkg0/package.json'.
Entering conditional exports.
Matched 'exports' condition 'import'.
Using 'exports' subpath '.' with target './import.js'.
File name '/home/src/workspaces/project/node_modules/pkg0/import.js' has a '.js' extension - stripping it.
File '/home/src/workspaces/project/node_modules/pkg0/import.ts' does not exist.
File '/home/src/workspaces/project/node_modules/pkg0/import.tsx' does not exist.
File '/home/src/workspaces/project/node_modules/pkg0/import.d.ts' exists - use it as a name resolution result.
'package.json' does not have a 'peerDependencies' field.
Resolved under condition 'import'.
Exiting conditional exports.
Resolving real path for '/home/src/workspaces/project/node_modules/pkg0/import.d.ts', result '/home/src/workspaces/project/node_modules/pkg0/import.d.ts'.
======== Module name 'pkg0' was successfully resolved to '/home/src/workspaces/project/node_modules/pkg0/import.d.ts' with Package ID 'pkg0/import.d.ts@0.0.1'. ========
DirectoryWatcher:: Added:: WatchInfo: /home/src/workspaces/project 0 undefined Failed Lookup Locations
Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /home/src/workspaces/project 0 undefined Failed Lookup Locations
DirectoryWatcher:: Added:: WatchInfo: /home/src/workspaces 0 undefined Failed Lookup Locations
Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /home/src/workspaces 0 undefined Failed Lookup Locations
DirectoryWatcher:: Added:: WatchInfo: /home/src/workspaces/project/node_modules 1 undefined Failed Lookup Locations
Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /home/src/workspaces/project/node_modules 1 undefined Failed Lookup Locations
FileWatcher:: Added:: WatchInfo: /home/src/workspaces/project/node_modules/pkg0/package.json 2000 undefined File location affecting resolution
======== Resolving module 'pkg1' from '/home/src/workspaces/project/fileWithImports.ts'. ========
Module resolution kind is not specified, using 'Node10'.
File '/home/src/workspaces/project/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspaces/package.json' does not exist according to earlier cached lookups.
File '/home/src/package.json' does not exist according to earlier cached lookups.
File '/home/package.json' does not exist according to earlier cached lookups.
File '/package.json' does not exist according to earlier cached lookups.
Loading module 'pkg1' from 'node_modules' folder, target file types: TypeScript, Declaration.
Searching all ancestor node_modules directories for preferred extensions: TypeScript, Declaration.
Found 'package.json' at '/home/src/workspaces/project/node_modules/pkg1/package.json'.
Entering conditional exports.
Saw non-matching condition 'import'.
Matched 'exports' condition 'require'.
Using 'exports' subpath '.' with target './require.js'.
File name '/home/src/workspaces/project/node_modules/pkg1/require.js' has a '.js' extension - stripping it.
File '/home/src/workspaces/project/node_modules/pkg1/require.ts' does not exist.
File '/home/src/workspaces/project/node_modules/pkg1/require.tsx' does not exist.
File '/home/src/workspaces/project/node_modules/pkg1/require.d.ts' does not exist.
Failed to resolve under condition 'require'.
Exiting conditional exports.
File '/home/src/workspaces/project/node_modules/@types/pkg1.d.ts' does not exist.
Directory '/home/src/workspaces/node_modules' does not exist, skipping all lookups in it.
Directory '/home/src/node_modules' does not exist, skipping all lookups in it.
Directory '/home/node_modules' does not exist, skipping all lookups in it.
Directory '/node_modules' does not exist, skipping all lookups in it.
File '/home/src/workspaces/project/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspaces/package.json' does not exist according to earlier cached lookups.
File '/home/src/package.json' does not exist according to earlier cached lookups.
File '/home/package.json' does not exist according to earlier cached lookups.
File '/package.json' does not exist according to earlier cached lookups.
Loading module 'pkg1' from 'node_modules' folder, target file types: JavaScript.
Searching all ancestor node_modules directories for fallback extensions: JavaScript.
File '/home/src/workspaces/project/node_modules/pkg1/package.json' exists according to earlier cached lookups.
Entering conditional exports.
Saw non-matching condition 'import'.
Matched 'exports' condition 'require'.
Using 'exports' subpath '.' with target './require.js'.
File name '/home/src/workspaces/project/node_modules/pkg1/require.js' has a '.js' extension - stripping it.
File '/home/src/workspaces/project/node_modules/pkg1/require.js' does not exist.
File '/home/src/workspaces/project/node_modules/pkg1/require.jsx' does not exist.
Failed to resolve under condition 'require'.
Exiting conditional exports.
Directory '/home/src/workspaces/node_modules' does not exist, skipping all lookups in it.
Directory '/home/src/node_modules' does not exist, skipping all lookups in it.
Directory '/home/node_modules' does not exist, skipping all lookups in it.
Directory '/node_modules' does not exist, skipping all lookups in it.
Resolution of non-relative name failed; trying with '--moduleResolution bundler' to see if project may need configuration update.
File '/home/src/workspaces/project/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspaces/package.json' does not exist according to earlier cached lookups.
File '/home/src/package.json' does not exist according to earlier cached lookups.
File '/home/package.json' does not exist according to earlier cached lookups.
File '/package.json' does not exist according to earlier cached lookups.
Loading module 'pkg1' from 'node_modules' folder, target file types: TypeScript, Declaration.
Searching all ancestor node_modules directories for preferred extensions: TypeScript, Declaration.
File '/home/src/workspaces/project/node_modules/pkg1/package.json' exists according to earlier cached lookups.
Entering conditional exports.
Matched 'exports' condition 'import'.
Using 'exports' subpath '.' with target './import.js'.
File name '/home/src/workspaces/project/node_modules/pkg1/import.js' has a '.js' extension - stripping it.
File '/home/src/workspaces/project/node_modules/pkg1/import.ts' does not exist.
File '/home/src/workspaces/project/node_modules/pkg1/import.tsx' does not exist.
File '/home/src/workspaces/project/node_modules/pkg1/import.d.ts' exists - use it as a name resolution result.
'package.json' does not have a 'peerDependencies' field.
Resolved under condition 'import'.
Exiting conditional exports.
======== Module name 'pkg1' was not resolved. ========
DirectoryWatcher:: Added:: WatchInfo: /home/src/workspaces/node_modules 1 undefined Failed Lookup Locations
Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /home/src/workspaces/node_modules 1 undefined Failed Lookup Locations
FileWatcher:: Added:: WatchInfo: /home/src/workspaces/project/node_modules/pkg1/package.json 2000 undefined File location affecting resolution
File '/home/src/workspaces/project/node_modules/pkg0/package.json' exists according to earlier cached lookups.
FileWatcher:: Added:: WatchInfo: /home/src/workspaces/project/node_modules/pkg0/import.d.ts 250 undefined Source file
FileWatcher:: Added:: WatchInfo: /home/src/workspaces/project/fileWithTypeRefs.ts 250 undefined Source file
======== Resolving type reference directive 'pkg2', containing file '/home/src/workspaces/project/fileWithTypeRefs.ts', root directory '/home/src/workspaces/project/node_modules/@types,/home/src/workspaces/node_modules/@types,/home/src/node_modules/@types,/home/node_modules/@types,/node_modules/@types'. ========
Resolving with primary search path '/home/src/workspaces/project/node_modules/@types, /home/src/workspaces/node_modules/@types, /home/src/node_modules/@types, /home/node_modules/@types, /node_modules/@types'.
Directory '/home/src/workspaces/node_modules/@types' does not exist, skipping all lookups in it.
Directory '/home/src/node_modules/@types' does not exist, skipping all lookups in it.
Directory '/home/node_modules/@types' does not exist, skipping all lookups in it.
Directory '/node_modules/@types' does not exist, skipping all lookups in it.
Looking up in 'node_modules' folder, initial location '/home/src/workspaces/project'.
Searching all ancestor node_modules directories for preferred extensions: Declaration.
Found 'package.json' at '/home/src/workspaces/project/node_modules/pkg2/package.json'.
Entering conditional exports.
Matched 'exports' condition 'import'.
Using 'exports' subpath '.' with target './import.js'.
File name '/home/src/workspaces/project/node_modules/pkg2/import.js' has a '.js' extension - stripping it.
File '/home/src/workspaces/project/node_modules/pkg2/import.d.ts' exists - use it as a name resolution result.
'package.json' does not have a 'peerDependencies' field.
Resolved under condition 'import'.
Exiting conditional exports.
Resolving real path for '/home/src/workspaces/project/node_modules/pkg2/import.d.ts', result '/home/src/workspaces/project/node_modules/pkg2/import.d.ts'.
======== Type reference directive 'pkg2' was successfully resolved to '/home/src/workspaces/project/node_modules/pkg2/import.d.ts' with Package ID 'pkg2/import.d.ts@0.0.1', primary: false. ========
FileWatcher:: Added:: WatchInfo: /home/src/workspaces/project/node_modules/pkg2/package.json 2000 undefined File location affecting resolution
======== Resolving type reference directive 'pkg3', containing file '/home/src/workspaces/project/fileWithTypeRefs.ts', root directory '/home/src/workspaces/project/node_modules/@types,/home/src/workspaces/node_modules/@types,/home/src/node_modules/@types,/home/node_modules/@types,/node_modules/@types'. ========
Resolving with primary search path '/home/src/workspaces/project/node_modules/@types, /home/src/workspaces/node_modules/@types, /home/src/node_modules/@types, /home/node_modules/@types, /node_modules/@types'.
Directory '/home/src/workspaces/node_modules/@types' does not exist, skipping all lookups in it.
Directory '/home/src/node_modules/@types' does not exist, skipping all lookups in it.
Directory '/home/node_modules/@types' does not exist, skipping all lookups in it.
Directory '/node_modules/@types' does not exist, skipping all lookups in it.
Looking up in 'node_modules' folder, initial location '/home/src/workspaces/project'.
Searching all ancestor node_modules directories for preferred extensions: Declaration.
Found 'package.json' at '/home/src/workspaces/project/node_modules/pkg3/package.json'.
Entering conditional exports.
Saw non-matching condition 'import'.
Matched 'exports' condition 'require'.
Using 'exports' subpath '.' with target './require.js'.
File name '/home/src/workspaces/project/node_modules/pkg3/require.js' has a '.js' extension - stripping it.
File '/home/src/workspaces/project/node_modules/pkg3/require.d.ts' does not exist.
Failed to resolve under condition 'require'.
Exiting conditional exports.
File '/home/src/workspaces/project/node_modules/@types/pkg3.d.ts' does not exist.
Directory '/home/src/workspaces/node_modules' does not exist, skipping all lookups in it.
Directory '/home/src/node_modules' does not exist, skipping all lookups in it.
Directory '/home/node_modules' does not exist, skipping all lookups in it.
Directory '/node_modules' does not exist, skipping all lookups in it.
======== Type reference directive 'pkg3' was not resolved. ========
FileWatcher:: Added:: WatchInfo: /home/src/workspaces/project/node_modules/pkg3/package.json 2000 undefined File location affecting resolution
File '/home/src/workspaces/project/node_modules/pkg2/package.json' exists according to earlier cached lookups.
FileWatcher:: Added:: WatchInfo: /home/src/workspaces/project/node_modules/pkg2/import.d.ts 250 undefined Source file
FileWatcher:: Added:: WatchInfo: /home/src/workspaces/project/main.ts 250 undefined Source file
FileWatcher:: Added:: WatchInfo: /home/src/workspaces/project/randomFileForImport.ts 250 undefined Source file
FileWatcher:: Added:: WatchInfo: /home/src/workspaces/project/randomFileForTypeRef.ts 250 undefined Source file
======== Resolving type reference directive 'pkg4', containing file '/home/src/workspaces/project/__inferred type names__.ts', root directory '/home/src/workspaces/project/node_modules/@types,/home/src/workspaces/node_modules/@types,/home/src/node_modules/@types,/home/node_modules/@types,/node_modules/@types'. ========
Resolving with primary search path '/home/src/workspaces/project/node_modules/@types, /home/src/workspaces/node_modules/@types, /home/src/node_modules/@types, /home/node_modules/@types, /node_modules/@types'.
File '/home/src/workspaces/project/node_modules/@types/pkg4/package.json' does not exist.
File '/home/src/workspaces/project/node_modules/@types/pkg4/index.d.ts' exists - use it as a name resolution result.
Resolving real path for '/home/src/workspaces/project/node_modules/@types/pkg4/index.d.ts', result '/home/src/workspaces/project/node_modules/@types/pkg4/index.d.ts'.
======== Type reference directive 'pkg4' was successfully resolved to '/home/src/workspaces/project/node_modules/@types/pkg4/index.d.ts', primary: true. ========
File '/home/src/workspaces/project/node_modules/@types/pkg4/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspaces/project/node_modules/@types/package.json' does not exist.
File '/home/src/workspaces/project/node_modules/package.json' does not exist.
File '/home/src/workspaces/project/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspaces/package.json' does not exist according to earlier cached lookups.
File '/home/src/package.json' does not exist according to earlier cached lookups.
File '/home/package.json' does not exist according to earlier cached lookups.
File '/package.json' does not exist according to earlier cached lookups.
FileWatcher:: Added:: WatchInfo: /home/src/workspaces/project/node_modules/@types/pkg4/index.d.ts 250 undefined Source file
FileWatcher:: Added:: WatchInfo: /home/src/tslibs/TS/Lib/lib.d.ts 250 undefined Source file
FileWatcher:: Added:: WatchInfo: /home/src/workspaces/project/node_modules/@types/pkg4/package.json 2000 undefined File location affecting resolution
FileWatcher:: Added:: WatchInfo: /home/src/workspaces/project/node_modules/@types/package.json 2000 undefined File location affecting resolution
FileWatcher:: Added:: WatchInfo: /home/src/workspaces/project/node_modules/package.json 2000 undefined File location affecting resolution
FileWatcher:: Added:: WatchInfo: /home/src/workspaces/project/package.json 2000 undefined File location affecting resolution
FileWatcher:: Added:: WatchInfo: /home/src/workspaces/package.json 2000 undefined File location affecting resolution
DirectoryWatcher:: Added:: WatchInfo: /home/src/workspaces/project/node_modules/@types 1 undefined Type roots
Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /home/src/workspaces/project/node_modules/@types 1 undefined Type roots
DirectoryWatcher:: Added:: WatchInfo: /home/src/workspaces/node_modules/@types 1 undefined Type roots
Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /home/src/workspaces/node_modules/@types 1 undefined Type roots
DirectoryWatcher:: Triggered with /home/src/workspaces/project/fileWithImports.js :: WatchInfo: /home/src/workspaces/project 0 undefined Failed Lookup Locations
Elapsed:: *ms DirectoryWatcher:: Triggered with /home/src/workspaces/project/fileWithImports.js :: WatchInfo: /home/src/workspaces/project 0 undefined Failed Lookup Locations
DirectoryWatcher:: Triggered with /home/src/workspaces/project/fileWithTypeRefs.js :: WatchInfo: /home/src/workspaces/project 0 undefined Failed Lookup Locations
Elapsed:: *ms DirectoryWatcher:: Triggered with /home/src/workspaces/project/fileWithTypeRefs.js :: WatchInfo: /home/src/workspaces/project 0 undefined Failed Lookup Locations
DirectoryWatcher:: Triggered with /home/src/workspaces/project/main.js :: WatchInfo: /home/src/workspaces/project 0 undefined Failed Lookup Locations
Elapsed:: *ms DirectoryWatcher:: Triggered with /home/src/workspaces/project/main.js :: WatchInfo: /home/src/workspaces/project 0 undefined Failed Lookup Locations
DirectoryWatcher:: Triggered with /home/src/workspaces/project/randomFileForImport.js :: WatchInfo: /home/src/workspaces/project 0 undefined Failed Lookup Locations
Elapsed:: *ms DirectoryWatcher:: Triggered with /home/src/workspaces/project/randomFileForImport.js :: WatchInfo: /home/src/workspaces/project 0 undefined Failed Lookup Locations
DirectoryWatcher:: Triggered with /home/src/workspaces/project/randomFileForTypeRef.js :: WatchInfo: /home/src/workspaces/project 0 undefined Failed Lookup Locations
Elapsed:: *ms DirectoryWatcher:: Triggered with /home/src/workspaces/project/randomFileForTypeRef.js :: WatchInfo: /home/src/workspaces/project 0 undefined Failed Lookup Locations
[91merror[0m[90m TS2318: [0mCannot find global type 'ImportAttributes'.

[96mfileWithImports.ts[0m:[93m2[0m:[93m40[0m - [91merror[0m[90m TS2307: [0mCannot find module 'pkg1' or its corresponding type declarations.
  There are types at '/home/src/workspaces/project/node_modules/pkg1/import.d.ts', but this result could not be resolved under your current 'moduleResolution' setting. Consider updating to 'node16', 'nodenext', or 'bundler'.

[7m2[0m import type { RequireInterface1 } from "pkg1" assert { "resolution-mode": "require" };
[7m [0m [91m                                       ~~~~~~[0m

[96mfileWithTypeRefs.ts[0m:[93m2[0m:[93m23[0m - [91merror[0m[90m TS2688: [0mCannot find type definition file for 'pkg3'.

[7m2[0m /// <reference types="pkg3" resolution-mode="require"/>
[7m [0m [91m                      ~~~~[0m

[96mfileWithTypeRefs.ts[0m:[93m3[0m:[93m52[0m - [91merror[0m[90m TS2304: [0mCannot find name 'RequireInterface3'.

[7m3[0m interface LocalInterface extends ImportInterface2, RequireInterface3 {}
[7m [0m [91m                                                   ~~~~~~~~~~~~~~~~~[0m

../../tslibs/TS/Lib/lib.d.ts
  Default library for target 'es5'
node_modules/pkg0/import.d.ts
  Imported via "pkg0" from file 'fileWithImports.ts' with packageId 'pkg0/import.d.ts@0.0.1'
fileWithImports.ts
  Matched by include pattern '*.ts' in 'tsconfig.json'
node_modules/pkg2/import.d.ts
  Type library referenced via 'pkg2' from file 'fileWithTypeRefs.ts' with packageId 'pkg2/import.d.ts@0.0.1'
fileWithTypeRefs.ts
  Matched by include pattern '*.ts' in 'tsconfig.json'
main.ts
  Matched by include pattern '*.ts' in 'tsconfig.json'
randomFileForImport.ts
  Matched by include pattern '*.ts' in 'tsconfig.json'
randomFileForTypeRef.ts
  Matched by include pattern '*.ts' in 'tsconfig.json'
node_modules/@types/pkg4/index.d.ts
  Entry point for implicit type library 'pkg4'
[[90mHH:MM:SS AM[0m] Found 4 errors. Watching for file changes.

DirectoryWatcher:: Added:: WatchInfo: /home/src/workspaces/project 0 undefined Wild card directory
Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /home/src/workspaces/project 0 undefined Wild card directory


//// [/home/src/workspaces/project/fileWithImports.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });


//// [/home/src/workspaces/project/fileWithTypeRefs.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/// <reference types="pkg2" resolution-mode="import"/>
/// <reference types="pkg3" resolution-mode="require"/>


//// [/home/src/workspaces/project/main.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.x = void 0;
exports.x = 10;


//// [/home/src/workspaces/project/randomFileForImport.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.x = void 0;
exports.x = 10;


//// [/home/src/workspaces/project/randomFileForTypeRef.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.x = void 0;
exports.x = 10;



PolledWatches::
/home/src/workspaces/node_modules: *new*
  {"pollingInterval":500}
/home/src/workspaces/node_modules/@types: *new*
  {"pollingInterval":500}
/home/src/workspaces/package.json: *new*
  {"pollingInterval":2000}
/home/src/workspaces/project/node_modules/@types/package.json: *new*
  {"pollingInterval":2000}
/home/src/workspaces/project/node_modules/@types/pkg4/package.json: *new*
  {"pollingInterval":2000}
/home/src/workspaces/project/node_modules/package.json: *new*
  {"pollingInterval":2000}
/home/src/workspaces/project/package.json: *new*
  {"pollingInterval":2000}

FsWatches::
/home/src/tslibs/TS/Lib/lib.d.ts: *new*
  {}
/home/src/workspaces: *new*
  {}
/home/src/workspaces/project: *new*
  {}
/home/src/workspaces/project/fileWithImports.ts: *new*
  {}
/home/src/workspaces/project/fileWithTypeRefs.ts: *new*
  {}
/home/src/workspaces/project/main.ts: *new*
  {}
/home/src/workspaces/project/node_modules/@types/pkg4/index.d.ts: *new*
  {}
/home/src/workspaces/project/node_modules/pkg0/import.d.ts: *new*
  {}
/home/src/workspaces/project/node_modules/pkg0/package.json: *new*
  {}
/home/src/workspaces/project/node_modules/pkg1/package.json: *new*
  {}
/home/src/workspaces/project/node_modules/pkg2/import.d.ts: *new*
  {}
/home/src/workspaces/project/node_modules/pkg2/package.json: *new*
  {}
/home/src/workspaces/project/node_modules/pkg3/package.json: *new*
  {}
/home/src/workspaces/project/randomFileForImport.ts: *new*
  {}
/home/src/workspaces/project/randomFileForTypeRef.ts: *new*
  {}
/home/src/workspaces/project/tsconfig.json: *new*
  {}

FsWatchesRecursive::
/home/src/workspaces/project/node_modules: *new*
  {}
/home/src/workspaces/project/node_modules/@types: *new*
  {}

Program root files: [
  "/home/src/workspaces/project/fileWithImports.ts",
  "/home/src/workspaces/project/fileWithTypeRefs.ts",
  "/home/src/workspaces/project/main.ts",
  "/home/src/workspaces/project/randomFileForImport.ts",
  "/home/src/workspaces/project/randomFileForTypeRef.ts"
]
Program options: {
  "traceResolution": true,
  "watch": true,
  "project": "/home/src/workspaces/project/tsconfig.json",
  "explainFiles": true,
  "extendedDiagnostics": true,
  "configFilePath": "/home/src/workspaces/project/tsconfig.json"
}
Program structureReused: Not
Program files::
/home/src/tslibs/TS/Lib/lib.d.ts
/home/src/workspaces/project/node_modules/pkg0/import.d.ts
/home/src/workspaces/project/fileWithImports.ts
/home/src/workspaces/project/node_modules/pkg2/import.d.ts
/home/src/workspaces/project/fileWithTypeRefs.ts
/home/src/workspaces/project/main.ts
/home/src/workspaces/project/randomFileForImport.ts
/home/src/workspaces/project/randomFileForTypeRef.ts
/home/src/workspaces/project/node_modules/@types/pkg4/index.d.ts

Semantic diagnostics in builder refreshed for::
/home/src/tslibs/TS/Lib/lib.d.ts
/home/src/workspaces/project/node_modules/pkg0/import.d.ts
/home/src/workspaces/project/fileWithImports.ts
/home/src/workspaces/project/node_modules/pkg2/import.d.ts
/home/src/workspaces/project/fileWithTypeRefs.ts
/home/src/workspaces/project/main.ts
/home/src/workspaces/project/randomFileForImport.ts
/home/src/workspaces/project/randomFileForTypeRef.ts
/home/src/workspaces/project/node_modules/@types/pkg4/index.d.ts

Shape signatures in builder refreshed for::
/home/src/tslibs/ts/lib/lib.d.ts (used version)
/home/src/workspaces/project/node_modules/pkg0/import.d.ts (used version)
/home/src/workspaces/project/filewithimports.ts (used version)
/home/src/workspaces/project/node_modules/pkg2/import.d.ts (used version)
/home/src/workspaces/project/filewithtyperefs.ts (used version)
/home/src/workspaces/project/main.ts (used version)
/home/src/workspaces/project/randomfileforimport.ts (used version)
/home/src/workspaces/project/randomfilefortyperef.ts (used version)
/home/src/workspaces/project/node_modules/@types/pkg4/index.d.ts (used version)

exitCode:: ExitStatus.undefined

Change:: modify randomFileForImport by adding import

Input::
//// [/home/src/workspaces/project/randomFileForImport.ts]
import type { ImportInterface0 } from "pkg0" assert { "resolution-mode": "import" };
export const x = 10;


Output::
FileWatcher:: Triggered with /home/src/workspaces/project/randomFileForImport.ts 1:: WatchInfo: /home/src/workspaces/project/randomFileForImport.ts 250 undefined Source file
Scheduling update
Elapsed:: *ms FileWatcher:: Triggered with /home/src/workspaces/project/randomFileForImport.ts 1:: WatchInfo: /home/src/workspaces/project/randomFileForImport.ts 250 undefined Source file


Timeout callback:: count: 1
1: timerToUpdateProgram *new*

Before running Timeout callback:: count: 1
1: timerToUpdateProgram

Host is moving to new time
After running Timeout callback:: count: 0
Output::
Synchronizing program
[[90mHH:MM:SS AM[0m] File change detected. Starting incremental compilation...

CreatingProgramWith::
  roots: ["/home/src/workspaces/project/fileWithImports.ts","/home/src/workspaces/project/fileWithTypeRefs.ts","/home/src/workspaces/project/main.ts","/home/src/workspaces/project/randomFileForImport.ts","/home/src/workspaces/project/randomFileForTypeRef.ts"]
  options: {"traceResolution":true,"watch":true,"project":"/home/src/workspaces/project/tsconfig.json","explainFiles":true,"extendedDiagnostics":true,"configFilePath":"/home/src/workspaces/project/tsconfig.json"}
File '/home/src/workspaces/project/node_modules/pkg0/package.json' exists according to earlier cached lookups.
File '/home/src/workspaces/project/node_modules/pkg2/package.json' exists according to earlier cached lookups.
File '/home/src/workspaces/project/node_modules/@types/pkg4/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspaces/project/node_modules/@types/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspaces/project/node_modules/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspaces/project/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspaces/package.json' does not exist according to earlier cached lookups.
File '/home/src/package.json' does not exist according to earlier cached lookups.
File '/home/package.json' does not exist according to earlier cached lookups.
File '/package.json' does not exist according to earlier cached lookups.
Reusing resolution of module 'pkg0' from '/home/src/workspaces/project/fileWithImports.ts' of old program, it was successfully resolved to '/home/src/workspaces/project/node_modules/pkg0/import.d.ts' with Package ID 'pkg0/import.d.ts@0.0.1'.
Reusing resolution of module 'pkg1' from '/home/src/workspaces/project/fileWithImports.ts' of old program, it was not resolved.
File '/home/src/workspaces/project/node_modules/pkg0/package.json' exists according to earlier cached lookups.
Reusing resolution of type reference directive 'pkg2' from '/home/src/workspaces/project/fileWithTypeRefs.ts' of old program, it was successfully resolved to '/home/src/workspaces/project/node_modules/pkg2/import.d.ts' with Package ID 'pkg2/import.d.ts@0.0.1'.
Reusing resolution of type reference directive 'pkg3' from '/home/src/workspaces/project/fileWithTypeRefs.ts' of old program, it was not resolved.
File '/home/src/workspaces/project/node_modules/pkg2/package.json' exists according to earlier cached lookups.
======== Resolving module 'pkg0' from '/home/src/workspaces/project/randomFileForImport.ts'. ========
Resolution for module 'pkg0' was found in cache from location '/home/src/workspaces/project'.
======== Module name 'pkg0' was successfully resolved to '/home/src/workspaces/project/node_modules/pkg0/import.d.ts' with Package ID 'pkg0/import.d.ts@0.0.1'. ========
Reusing resolution of type reference directive 'pkg4' from '/home/src/workspaces/project/__inferred type names__.ts' of old program, it was successfully resolved to '/home/src/workspaces/project/node_modules/@types/pkg4/index.d.ts'.
File '/home/src/workspaces/project/node_modules/@types/pkg4/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspaces/project/node_modules/@types/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspaces/project/node_modules/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspaces/project/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspaces/package.json' does not exist according to earlier cached lookups.
File '/home/src/package.json' does not exist according to earlier cached lookups.
File '/home/package.json' does not exist according to earlier cached lookups.
File '/package.json' does not exist according to earlier cached lookups.
[91merror[0m[90m TS2318: [0mCannot find global type 'ImportAttributes'.

[96mfileWithImports.ts[0m:[93m2[0m:[93m40[0m - [91merror[0m[90m TS2307: [0mCannot find module 'pkg1' or its corresponding type declarations.
  There are types at '/home/src/workspaces/project/node_modules/pkg1/import.d.ts', but this result could not be resolved under your current 'moduleResolution' setting. Consider updating to 'node16', 'nodenext', or 'bundler'.

[7m2[0m import type { RequireInterface1 } from "pkg1" assert { "resolution-mode": "require" };
[7m [0m [91m                                       ~~~~~~[0m

[96mfileWithTypeRefs.ts[0m:[93m2[0m:[93m23[0m - [91merror[0m[90m TS2688: [0mCannot find type definition file for 'pkg3'.

[7m2[0m /// <reference types="pkg3" resolution-mode="require"/>
[7m [0m [91m                      ~~~~[0m

[96mfileWithTypeRefs.ts[0m:[93m3[0m:[93m52[0m - [91merror[0m[90m TS2304: [0mCannot find name 'RequireInterface3'.

[7m3[0m interface LocalInterface extends ImportInterface2, RequireInterface3 {}
[7m [0m [91m                                                   ~~~~~~~~~~~~~~~~~[0m

../../tslibs/TS/Lib/lib.d.ts
  Default library for target 'es5'
node_modules/pkg0/import.d.ts
  Imported via "pkg0" from file 'fileWithImports.ts' with packageId 'pkg0/import.d.ts@0.0.1'
  Imported via "pkg0" from file 'randomFileForImport.ts' with packageId 'pkg0/import.d.ts@0.0.1'
fileWithImports.ts
  Matched by include pattern '*.ts' in 'tsconfig.json'
node_modules/pkg2/import.d.ts
  Type library referenced via 'pkg2' from file 'fileWithTypeRefs.ts' with packageId 'pkg2/import.d.ts@0.0.1'
fileWithTypeRefs.ts
  Matched by include pattern '*.ts' in 'tsconfig.json'
main.ts
  Matched by include pattern '*.ts' in 'tsconfig.json'
randomFileForImport.ts
  Matched by include pattern '*.ts' in 'tsconfig.json'
randomFileForTypeRef.ts
  Matched by include pattern '*.ts' in 'tsconfig.json'
node_modules/@types/pkg4/index.d.ts
  Entry point for implicit type library 'pkg4'
[[90mHH:MM:SS AM[0m] Found 4 errors. Watching for file changes.



//// [/home/src/workspaces/project/randomFileForImport.js] file written with same contents


Program root files: [
  "/home/src/workspaces/project/fileWithImports.ts",
  "/home/src/workspaces/project/fileWithTypeRefs.ts",
  "/home/src/workspaces/project/main.ts",
  "/home/src/workspaces/project/randomFileForImport.ts",
  "/home/src/workspaces/project/randomFileForTypeRef.ts"
]
Program options: {
  "traceResolution": true,
  "watch": true,
  "project": "/home/src/workspaces/project/tsconfig.json",
  "explainFiles": true,
  "extendedDiagnostics": true,
  "configFilePath": "/home/src/workspaces/project/tsconfig.json"
}
Program structureReused: SafeModules
Program files::
/home/src/tslibs/TS/Lib/lib.d.ts
/home/src/workspaces/project/node_modules/pkg0/import.d.ts
/home/src/workspaces/project/fileWithImports.ts
/home/src/workspaces/project/node_modules/pkg2/import.d.ts
/home/src/workspaces/project/fileWithTypeRefs.ts
/home/src/workspaces/project/main.ts
/home/src/workspaces/project/randomFileForImport.ts
/home/src/workspaces/project/randomFileForTypeRef.ts
/home/src/workspaces/project/node_modules/@types/pkg4/index.d.ts

Semantic diagnostics in builder refreshed for::
/home/src/workspaces/project/randomFileForImport.ts

Shape signatures in builder refreshed for::
/home/src/workspaces/project/randomfileforimport.ts (computed .d.ts)

exitCode:: ExitStatus.undefined

Change:: modify randomFileForTypeRef by adding typeRef

Input::
//// [/home/src/workspaces/project/randomFileForTypeRef.ts]
/// <reference types="pkg2" resolution-mode="import"/>
export const x = 10;


Output::
FileWatcher:: Triggered with /home/src/workspaces/project/randomFileForTypeRef.ts 1:: WatchInfo: /home/src/workspaces/project/randomFileForTypeRef.ts 250 undefined Source file
Scheduling update
Elapsed:: *ms FileWatcher:: Triggered with /home/src/workspaces/project/randomFileForTypeRef.ts 1:: WatchInfo: /home/src/workspaces/project/randomFileForTypeRef.ts 250 undefined Source file


Timeout callback:: count: 1
2: timerToUpdateProgram *new*

Before running Timeout callback:: count: 1
2: timerToUpdateProgram

Host is moving to new time
After running Timeout callback:: count: 0
Output::
Synchronizing program
[[90mHH:MM:SS AM[0m] File change detected. Starting incremental compilation...

CreatingProgramWith::
  roots: ["/home/src/workspaces/project/fileWithImports.ts","/home/src/workspaces/project/fileWithTypeRefs.ts","/home/src/workspaces/project/main.ts","/home/src/workspaces/project/randomFileForImport.ts","/home/src/workspaces/project/randomFileForTypeRef.ts"]
  options: {"traceResolution":true,"watch":true,"project":"/home/src/workspaces/project/tsconfig.json","explainFiles":true,"extendedDiagnostics":true,"configFilePath":"/home/src/workspaces/project/tsconfig.json"}
File '/home/src/workspaces/project/node_modules/pkg0/package.json' exists according to earlier cached lookups.
File '/home/src/workspaces/project/node_modules/pkg2/package.json' exists according to earlier cached lookups.
File '/home/src/workspaces/project/node_modules/@types/pkg4/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspaces/project/node_modules/@types/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspaces/project/node_modules/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspaces/project/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspaces/package.json' does not exist according to earlier cached lookups.
File '/home/src/package.json' does not exist according to earlier cached lookups.
File '/home/package.json' does not exist according to earlier cached lookups.
File '/package.json' does not exist according to earlier cached lookups.
Reusing resolution of module 'pkg0' from '/home/src/workspaces/project/fileWithImports.ts' of old program, it was successfully resolved to '/home/src/workspaces/project/node_modules/pkg0/import.d.ts' with Package ID 'pkg0/import.d.ts@0.0.1'.
Reusing resolution of module 'pkg1' from '/home/src/workspaces/project/fileWithImports.ts' of old program, it was not resolved.
File '/home/src/workspaces/project/node_modules/pkg0/package.json' exists according to earlier cached lookups.
Reusing resolution of type reference directive 'pkg2' from '/home/src/workspaces/project/fileWithTypeRefs.ts' of old program, it was successfully resolved to '/home/src/workspaces/project/node_modules/pkg2/import.d.ts' with Package ID 'pkg2/import.d.ts@0.0.1'.
Reusing resolution of type reference directive 'pkg3' from '/home/src/workspaces/project/fileWithTypeRefs.ts' of old program, it was not resolved.
File '/home/src/workspaces/project/node_modules/pkg2/package.json' exists according to earlier cached lookups.
Reusing resolution of module 'pkg0' from '/home/src/workspaces/project/randomFileForImport.ts' of old program, it was successfully resolved to '/home/src/workspaces/project/node_modules/pkg0/import.d.ts' with Package ID 'pkg0/import.d.ts@0.0.1'.
======== Resolving type reference directive 'pkg2', containing file '/home/src/workspaces/project/randomFileForTypeRef.ts', root directory '/home/src/workspaces/project/node_modules/@types,/home/src/workspaces/node_modules/@types,/home/src/node_modules/@types,/home/node_modules/@types,/node_modules/@types'. ========
Resolving with primary search path '/home/src/workspaces/project/node_modules/@types, /home/src/workspaces/node_modules/@types, /home/src/node_modules/@types, /home/node_modules/@types, /node_modules/@types'.
Resolution for type reference directive 'pkg2' was found in cache from location '/home/src/workspaces/project'.
======== Type reference directive 'pkg2' was successfully resolved to '/home/src/workspaces/project/node_modules/pkg2/import.d.ts' with Package ID 'pkg2/import.d.ts@0.0.1', primary: false. ========
Reusing resolution of type reference directive 'pkg4' from '/home/src/workspaces/project/__inferred type names__.ts' of old program, it was successfully resolved to '/home/src/workspaces/project/node_modules/@types/pkg4/index.d.ts'.
File '/home/src/workspaces/project/node_modules/@types/pkg4/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspaces/project/node_modules/@types/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspaces/project/node_modules/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspaces/project/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspaces/package.json' does not exist according to earlier cached lookups.
File '/home/src/package.json' does not exist according to earlier cached lookups.
File '/home/package.json' does not exist according to earlier cached lookups.
File '/package.json' does not exist according to earlier cached lookups.
[91merror[0m[90m TS2318: [0mCannot find global type 'ImportAttributes'.

[96mfileWithImports.ts[0m:[93m2[0m:[93m40[0m - [91merror[0m[90m TS2307: [0mCannot find module 'pkg1' or its corresponding type declarations.
  There are types at '/home/src/workspaces/project/node_modules/pkg1/import.d.ts', but this result could not be resolved under your current 'moduleResolution' setting. Consider updating to 'node16', 'nodenext', or 'bundler'.

[7m2[0m import type { RequireInterface1 } from "pkg1" assert { "resolution-mode": "require" };
[7m [0m [91m                                       ~~~~~~[0m

[96mfileWithTypeRefs.ts[0m:[93m2[0m:[93m23[0m - [91merror[0m[90m TS2688: [0mCannot find type definition file for 'pkg3'.

[7m2[0m /// <reference types="pkg3" resolution-mode="require"/>
[7m [0m [91m                      ~~~~[0m

[96mfileWithTypeRefs.ts[0m:[93m3[0m:[93m52[0m - [91merror[0m[90m TS2304: [0mCannot find name 'RequireInterface3'.

[7m3[0m interface LocalInterface extends ImportInterface2, RequireInterface3 {}
[7m [0m [91m                                                   ~~~~~~~~~~~~~~~~~[0m

../../tslibs/TS/Lib/lib.d.ts
  Default library for target 'es5'
node_modules/pkg0/import.d.ts
  Imported via "pkg0" from file 'fileWithImports.ts' with packageId 'pkg0/import.d.ts@0.0.1'
  Imported via "pkg0" from file 'randomFileForImport.ts' with packageId 'pkg0/import.d.ts@0.0.1'
fileWithImports.ts
  Matched by include pattern '*.ts' in 'tsconfig.json'
node_modules/pkg2/import.d.ts
  Type library referenced via 'pkg2' from file 'fileWithTypeRefs.ts' with packageId 'pkg2/import.d.ts@0.0.1'
  Type library referenced via 'pkg2' from file 'randomFileForTypeRef.ts' with packageId 'pkg2/import.d.ts@0.0.1'
fileWithTypeRefs.ts
  Matched by include pattern '*.ts' in 'tsconfig.json'
main.ts
  Matched by include pattern '*.ts' in 'tsconfig.json'
randomFileForImport.ts
  Matched by include pattern '*.ts' in 'tsconfig.json'
randomFileForTypeRef.ts
  Matched by include pattern '*.ts' in 'tsconfig.json'
node_modules/@types/pkg4/index.d.ts
  Entry point for implicit type library 'pkg4'
[[90mHH:MM:SS AM[0m] Found 4 errors. Watching for file changes.



//// [/home/src/workspaces/project/randomFileForTypeRef.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.x = void 0;
/// <reference types="pkg2" resolution-mode="import"/>
exports.x = 10;




Program root files: [
  "/home/src/workspaces/project/fileWithImports.ts",
  "/home/src/workspaces/project/fileWithTypeRefs.ts",
  "/home/src/workspaces/project/main.ts",
  "/home/src/workspaces/project/randomFileForImport.ts",
  "/home/src/workspaces/project/randomFileForTypeRef.ts"
]
Program options: {
  "traceResolution": true,
  "watch": true,
  "project": "/home/src/workspaces/project/tsconfig.json",
  "explainFiles": true,
  "extendedDiagnostics": true,
  "configFilePath": "/home/src/workspaces/project/tsconfig.json"
}
Program structureReused: SafeModules
Program files::
/home/src/tslibs/TS/Lib/lib.d.ts
/home/src/workspaces/project/node_modules/pkg0/import.d.ts
/home/src/workspaces/project/fileWithImports.ts
/home/src/workspaces/project/node_modules/pkg2/import.d.ts
/home/src/workspaces/project/fileWithTypeRefs.ts
/home/src/workspaces/project/main.ts
/home/src/workspaces/project/randomFileForImport.ts
/home/src/workspaces/project/randomFileForTypeRef.ts
/home/src/workspaces/project/node_modules/@types/pkg4/index.d.ts

Semantic diagnostics in builder refreshed for::
/home/src/workspaces/project/randomFileForTypeRef.ts

Shape signatures in builder refreshed for::
/home/src/workspaces/project/randomfilefortyperef.ts (computed .d.ts)

exitCode:: ExitStatus.undefined

Change:: write file not resolved by import

Input::
//// [/home/src/workspaces/project/node_modules/pkg1/require.d.ts]
export interface RequireInterface1 {}


Output::
DirectoryWatcher:: Triggered with /home/src/workspaces/project/node_modules/pkg1/require.d.ts :: WatchInfo: /home/src/workspaces/project/node_modules 1 undefined Failed Lookup Locations
Scheduling invalidateFailedLookup
Elapsed:: *ms DirectoryWatcher:: Triggered with /home/src/workspaces/project/node_modules/pkg1/require.d.ts :: WatchInfo: /home/src/workspaces/project/node_modules 1 undefined Failed Lookup Locations


Timeout callback:: count: 1
3: timerToInvalidateFailedLookupResolutions *new*

Before running Timeout callback:: count: 1
3: timerToInvalidateFailedLookupResolutions

Host is moving to new time
After running Timeout callback:: count: 1
Output::
Scheduling update



Timeout callback:: count: 1
4: timerToUpdateProgram *new*

Before running Timeout callback:: count: 1
4: timerToUpdateProgram

Host is moving to new time
After running Timeout callback:: count: 0
Output::
Synchronizing program
[[90mHH:MM:SS AM[0m] File change detected. Starting incremental compilation...

CreatingProgramWith::
  roots: ["/home/src/workspaces/project/fileWithImports.ts","/home/src/workspaces/project/fileWithTypeRefs.ts","/home/src/workspaces/project/main.ts","/home/src/workspaces/project/randomFileForImport.ts","/home/src/workspaces/project/randomFileForTypeRef.ts"]
  options: {"traceResolution":true,"watch":true,"project":"/home/src/workspaces/project/tsconfig.json","explainFiles":true,"extendedDiagnostics":true,"configFilePath":"/home/src/workspaces/project/tsconfig.json"}
File '/home/src/workspaces/project/node_modules/pkg0/package.json' exists according to earlier cached lookups.
File '/home/src/workspaces/project/node_modules/pkg2/package.json' exists according to earlier cached lookups.
File '/home/src/workspaces/project/node_modules/@types/pkg4/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspaces/project/node_modules/@types/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspaces/project/node_modules/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspaces/project/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspaces/package.json' does not exist according to earlier cached lookups.
File '/home/src/package.json' does not exist according to earlier cached lookups.
File '/home/package.json' does not exist according to earlier cached lookups.
File '/package.json' does not exist according to earlier cached lookups.
Reusing resolution of module 'pkg0' from '/home/src/workspaces/project/fileWithImports.ts' of old program, it was successfully resolved to '/home/src/workspaces/project/node_modules/pkg0/import.d.ts' with Package ID 'pkg0/import.d.ts@0.0.1'.
======== Resolving module 'pkg1' from '/home/src/workspaces/project/fileWithImports.ts'. ========
Module resolution kind is not specified, using 'Node10'.
File '/home/src/workspaces/project/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspaces/package.json' does not exist according to earlier cached lookups.
File '/home/src/package.json' does not exist according to earlier cached lookups.
File '/home/package.json' does not exist according to earlier cached lookups.
File '/package.json' does not exist according to earlier cached lookups.
Loading module 'pkg1' from 'node_modules' folder, target file types: TypeScript, Declaration.
Searching all ancestor node_modules directories for preferred extensions: TypeScript, Declaration.
Found 'package.json' at '/home/src/workspaces/project/node_modules/pkg1/package.json'.
Entering conditional exports.
Saw non-matching condition 'import'.
Matched 'exports' condition 'require'.
Using 'exports' subpath '.' with target './require.js'.
File name '/home/src/workspaces/project/node_modules/pkg1/require.js' has a '.js' extension - stripping it.
File '/home/src/workspaces/project/node_modules/pkg1/require.ts' does not exist.
File '/home/src/workspaces/project/node_modules/pkg1/require.tsx' does not exist.
File '/home/src/workspaces/project/node_modules/pkg1/require.d.ts' exists - use it as a name resolution result.
'package.json' does not have a 'peerDependencies' field.
Resolved under condition 'require'.
Exiting conditional exports.
Resolving real path for '/home/src/workspaces/project/node_modules/pkg1/require.d.ts', result '/home/src/workspaces/project/node_modules/pkg1/require.d.ts'.
======== Module name 'pkg1' was successfully resolved to '/home/src/workspaces/project/node_modules/pkg1/require.d.ts' with Package ID 'pkg1/require.d.ts@0.0.1'. ========
File '/home/src/workspaces/project/node_modules/pkg0/package.json' exists according to earlier cached lookups.
File '/home/src/workspaces/project/node_modules/pkg1/package.json' exists according to earlier cached lookups.
FileWatcher:: Added:: WatchInfo: /home/src/workspaces/project/node_modules/pkg1/require.d.ts 250 undefined Source file
Reusing resolution of type reference directive 'pkg2' from '/home/src/workspaces/project/fileWithTypeRefs.ts' of old program, it was successfully resolved to '/home/src/workspaces/project/node_modules/pkg2/import.d.ts' with Package ID 'pkg2/import.d.ts@0.0.1'.
Reusing resolution of type reference directive 'pkg3' from '/home/src/workspaces/project/fileWithTypeRefs.ts' of old program, it was not resolved.
File '/home/src/workspaces/project/node_modules/pkg2/package.json' exists according to earlier cached lookups.
Reusing resolution of module 'pkg0' from '/home/src/workspaces/project/randomFileForImport.ts' of old program, it was successfully resolved to '/home/src/workspaces/project/node_modules/pkg0/import.d.ts' with Package ID 'pkg0/import.d.ts@0.0.1'.
Reusing resolution of type reference directive 'pkg2' from '/home/src/workspaces/project/randomFileForTypeRef.ts' of old program, it was successfully resolved to '/home/src/workspaces/project/node_modules/pkg2/import.d.ts' with Package ID 'pkg2/import.d.ts@0.0.1'.
Reusing resolution of type reference directive 'pkg4' from '/home/src/workspaces/project/__inferred type names__.ts' of old program, it was successfully resolved to '/home/src/workspaces/project/node_modules/@types/pkg4/index.d.ts'.
File '/home/src/workspaces/project/node_modules/@types/pkg4/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspaces/project/node_modules/@types/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspaces/project/node_modules/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspaces/project/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspaces/package.json' does not exist according to earlier cached lookups.
File '/home/src/package.json' does not exist according to earlier cached lookups.
File '/home/package.json' does not exist according to earlier cached lookups.
File '/package.json' does not exist according to earlier cached lookups.
[91merror[0m[90m TS2318: [0mCannot find global type 'ImportAttributes'.

[96mfileWithTypeRefs.ts[0m:[93m2[0m:[93m23[0m - [91merror[0m[90m TS2688: [0mCannot find type definition file for 'pkg3'.

[7m2[0m /// <reference types="pkg3" resolution-mode="require"/>
[7m [0m [91m                      ~~~~[0m

[96mfileWithTypeRefs.ts[0m:[93m3[0m:[93m52[0m - [91merror[0m[90m TS2304: [0mCannot find name 'RequireInterface3'.

[7m3[0m interface LocalInterface extends ImportInterface2, RequireInterface3 {}
[7m [0m [91m                                                   ~~~~~~~~~~~~~~~~~[0m

../../tslibs/TS/Lib/lib.d.ts
  Default library for target 'es5'
node_modules/pkg0/import.d.ts
  Imported via "pkg0" from file 'fileWithImports.ts' with packageId 'pkg0/import.d.ts@0.0.1'
  Imported via "pkg0" from file 'randomFileForImport.ts' with packageId 'pkg0/import.d.ts@0.0.1'
node_modules/pkg1/require.d.ts
  Imported via "pkg1" from file 'fileWithImports.ts' with packageId 'pkg1/require.d.ts@0.0.1'
fileWithImports.ts
  Matched by include pattern '*.ts' in 'tsconfig.json'
node_modules/pkg2/import.d.ts
  Type library referenced via 'pkg2' from file 'fileWithTypeRefs.ts' with packageId 'pkg2/import.d.ts@0.0.1'
  Type library referenced via 'pkg2' from file 'randomFileForTypeRef.ts' with packageId 'pkg2/import.d.ts@0.0.1'
fileWithTypeRefs.ts
  Matched by include pattern '*.ts' in 'tsconfig.json'
main.ts
  Matched by include pattern '*.ts' in 'tsconfig.json'
randomFileForImport.ts
  Matched by include pattern '*.ts' in 'tsconfig.json'
randomFileForTypeRef.ts
  Matched by include pattern '*.ts' in 'tsconfig.json'
node_modules/@types/pkg4/index.d.ts
  Entry point for implicit type library 'pkg4'
[[90mHH:MM:SS AM[0m] Found 3 errors. Watching for file changes.



//// [/home/src/workspaces/project/fileWithImports.js] file written with same contents

PolledWatches::
/home/src/workspaces/node_modules:
  {"pollingInterval":500}
/home/src/workspaces/node_modules/@types:
  {"pollingInterval":500}
/home/src/workspaces/package.json:
  {"pollingInterval":2000}
/home/src/workspaces/project/node_modules/@types/package.json:
  {"pollingInterval":2000}
/home/src/workspaces/project/node_modules/@types/pkg4/package.json:
  {"pollingInterval":2000}
/home/src/workspaces/project/node_modules/package.json:
  {"pollingInterval":2000}
/home/src/workspaces/project/package.json:
  {"pollingInterval":2000}

FsWatches::
/home/src/tslibs/TS/Lib/lib.d.ts:
  {}
/home/src/workspaces:
  {}
/home/src/workspaces/project:
  {}
/home/src/workspaces/project/fileWithImports.ts:
  {}
/home/src/workspaces/project/fileWithTypeRefs.ts:
  {}
/home/src/workspaces/project/main.ts:
  {}
/home/src/workspaces/project/node_modules/@types/pkg4/index.d.ts:
  {}
/home/src/workspaces/project/node_modules/pkg0/import.d.ts:
  {}
/home/src/workspaces/project/node_modules/pkg0/package.json:
  {}
/home/src/workspaces/project/node_modules/pkg1/package.json:
  {}
/home/src/workspaces/project/node_modules/pkg1/require.d.ts: *new*
  {}
/home/src/workspaces/project/node_modules/pkg2/import.d.ts:
  {}
/home/src/workspaces/project/node_modules/pkg2/package.json:
  {}
/home/src/workspaces/project/node_modules/pkg3/package.json:
  {}
/home/src/workspaces/project/randomFileForImport.ts:
  {}
/home/src/workspaces/project/randomFileForTypeRef.ts:
  {}
/home/src/workspaces/project/tsconfig.json:
  {}

FsWatchesRecursive::
/home/src/workspaces/project/node_modules:
  {}
/home/src/workspaces/project/node_modules/@types:
  {}


Program root files: [
  "/home/src/workspaces/project/fileWithImports.ts",
  "/home/src/workspaces/project/fileWithTypeRefs.ts",
  "/home/src/workspaces/project/main.ts",
  "/home/src/workspaces/project/randomFileForImport.ts",
  "/home/src/workspaces/project/randomFileForTypeRef.ts"
]
Program options: {
  "traceResolution": true,
  "watch": true,
  "project": "/home/src/workspaces/project/tsconfig.json",
  "explainFiles": true,
  "extendedDiagnostics": true,
  "configFilePath": "/home/src/workspaces/project/tsconfig.json"
}
Program structureReused: SafeModules
Program files::
/home/src/tslibs/TS/Lib/lib.d.ts
/home/src/workspaces/project/node_modules/pkg0/import.d.ts
/home/src/workspaces/project/node_modules/pkg1/require.d.ts
/home/src/workspaces/project/fileWithImports.ts
/home/src/workspaces/project/node_modules/pkg2/import.d.ts
/home/src/workspaces/project/fileWithTypeRefs.ts
/home/src/workspaces/project/main.ts
/home/src/workspaces/project/randomFileForImport.ts
/home/src/workspaces/project/randomFileForTypeRef.ts
/home/src/workspaces/project/node_modules/@types/pkg4/index.d.ts

Semantic diagnostics in builder refreshed for::
/home/src/workspaces/project/node_modules/pkg1/require.d.ts
/home/src/workspaces/project/fileWithImports.ts

Shape signatures in builder refreshed for::
/home/src/workspaces/project/node_modules/pkg1/require.d.ts (used version)
/home/src/workspaces/project/filewithimports.ts (computed .d.ts)

exitCode:: ExitStatus.undefined

Change:: write file not resolved by typeRef

Input::
//// [/home/src/workspaces/project/node_modules/pkg3/require.d.ts]
export {};
declare global {
    interface RequireInterface3 {}
}



Output::
DirectoryWatcher:: Triggered with /home/src/workspaces/project/node_modules/pkg3/require.d.ts :: WatchInfo: /home/src/workspaces/project/node_modules 1 undefined Failed Lookup Locations
Scheduling invalidateFailedLookup
Elapsed:: *ms DirectoryWatcher:: Triggered with /home/src/workspaces/project/node_modules/pkg3/require.d.ts :: WatchInfo: /home/src/workspaces/project/node_modules 1 undefined Failed Lookup Locations


Timeout callback:: count: 1
5: timerToInvalidateFailedLookupResolutions *new*

Before running Timeout callback:: count: 1
5: timerToInvalidateFailedLookupResolutions

Host is moving to new time
After running Timeout callback:: count: 1
Output::
Scheduling update



Timeout callback:: count: 1
6: timerToUpdateProgram *new*

Before running Timeout callback:: count: 1
6: timerToUpdateProgram

Host is moving to new time
After running Timeout callback:: count: 0
Output::
Synchronizing program
[[90mHH:MM:SS AM[0m] File change detected. Starting incremental compilation...

CreatingProgramWith::
  roots: ["/home/src/workspaces/project/fileWithImports.ts","/home/src/workspaces/project/fileWithTypeRefs.ts","/home/src/workspaces/project/main.ts","/home/src/workspaces/project/randomFileForImport.ts","/home/src/workspaces/project/randomFileForTypeRef.ts"]
  options: {"traceResolution":true,"watch":true,"project":"/home/src/workspaces/project/tsconfig.json","explainFiles":true,"extendedDiagnostics":true,"configFilePath":"/home/src/workspaces/project/tsconfig.json"}
File '/home/src/workspaces/project/node_modules/pkg0/package.json' exists according to earlier cached lookups.
File '/home/src/workspaces/project/node_modules/pkg1/package.json' exists according to earlier cached lookups.
File '/home/src/workspaces/project/node_modules/pkg2/package.json' exists according to earlier cached lookups.
File '/home/src/workspaces/project/node_modules/@types/pkg4/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspaces/project/node_modules/@types/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspaces/project/node_modules/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspaces/project/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspaces/package.json' does not exist according to earlier cached lookups.
File '/home/src/package.json' does not exist according to earlier cached lookups.
File '/home/package.json' does not exist according to earlier cached lookups.
File '/package.json' does not exist according to earlier cached lookups.
Reusing resolution of module 'pkg0' from '/home/src/workspaces/project/fileWithImports.ts' of old program, it was successfully resolved to '/home/src/workspaces/project/node_modules/pkg0/import.d.ts' with Package ID 'pkg0/import.d.ts@0.0.1'.
Reusing resolution of module 'pkg1' from '/home/src/workspaces/project/fileWithImports.ts' of old program, it was successfully resolved to '/home/src/workspaces/project/node_modules/pkg1/require.d.ts' with Package ID 'pkg1/require.d.ts@0.0.1'.
File '/home/src/workspaces/project/node_modules/pkg0/package.json' exists according to earlier cached lookups.
File '/home/src/workspaces/project/node_modules/pkg1/package.json' exists according to earlier cached lookups.
Reusing resolution of type reference directive 'pkg2' from '/home/src/workspaces/project/fileWithTypeRefs.ts' of old program, it was successfully resolved to '/home/src/workspaces/project/node_modules/pkg2/import.d.ts' with Package ID 'pkg2/import.d.ts@0.0.1'.
======== Resolving type reference directive 'pkg3', containing file '/home/src/workspaces/project/fileWithTypeRefs.ts', root directory '/home/src/workspaces/project/node_modules/@types,/home/src/workspaces/node_modules/@types,/home/src/node_modules/@types,/home/node_modules/@types,/node_modules/@types'. ========
Resolving with primary search path '/home/src/workspaces/project/node_modules/@types, /home/src/workspaces/node_modules/@types, /home/src/node_modules/@types, /home/node_modules/@types, /node_modules/@types'.
Directory '/home/src/workspaces/node_modules/@types' does not exist, skipping all lookups in it.
Directory '/home/src/node_modules/@types' does not exist, skipping all lookups in it.
Directory '/home/node_modules/@types' does not exist, skipping all lookups in it.
Directory '/node_modules/@types' does not exist, skipping all lookups in it.
Looking up in 'node_modules' folder, initial location '/home/src/workspaces/project'.
Searching all ancestor node_modules directories for preferred extensions: Declaration.
Found 'package.json' at '/home/src/workspaces/project/node_modules/pkg3/package.json'.
Entering conditional exports.
Saw non-matching condition 'import'.
Matched 'exports' condition 'require'.
Using 'exports' subpath '.' with target './require.js'.
File name '/home/src/workspaces/project/node_modules/pkg3/require.js' has a '.js' extension - stripping it.
File '/home/src/workspaces/project/node_modules/pkg3/require.d.ts' exists - use it as a name resolution result.
'package.json' does not have a 'peerDependencies' field.
Resolved under condition 'require'.
Exiting conditional exports.
Resolving real path for '/home/src/workspaces/project/node_modules/pkg3/require.d.ts', result '/home/src/workspaces/project/node_modules/pkg3/require.d.ts'.
======== Type reference directive 'pkg3' was successfully resolved to '/home/src/workspaces/project/node_modules/pkg3/require.d.ts' with Package ID 'pkg3/require.d.ts@0.0.1', primary: false. ========
File '/home/src/workspaces/project/node_modules/pkg2/package.json' exists according to earlier cached lookups.
File '/home/src/workspaces/project/node_modules/pkg3/package.json' exists according to earlier cached lookups.
FileWatcher:: Added:: WatchInfo: /home/src/workspaces/project/node_modules/pkg3/require.d.ts 250 undefined Source file
Reusing resolution of module 'pkg0' from '/home/src/workspaces/project/randomFileForImport.ts' of old program, it was successfully resolved to '/home/src/workspaces/project/node_modules/pkg0/import.d.ts' with Package ID 'pkg0/import.d.ts@0.0.1'.
Reusing resolution of type reference directive 'pkg2' from '/home/src/workspaces/project/randomFileForTypeRef.ts' of old program, it was successfully resolved to '/home/src/workspaces/project/node_modules/pkg2/import.d.ts' with Package ID 'pkg2/import.d.ts@0.0.1'.
Reusing resolution of type reference directive 'pkg4' from '/home/src/workspaces/project/__inferred type names__.ts' of old program, it was successfully resolved to '/home/src/workspaces/project/node_modules/@types/pkg4/index.d.ts'.
File '/home/src/workspaces/project/node_modules/@types/pkg4/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspaces/project/node_modules/@types/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspaces/project/node_modules/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspaces/project/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspaces/package.json' does not exist according to earlier cached lookups.
File '/home/src/package.json' does not exist according to earlier cached lookups.
File '/home/package.json' does not exist according to earlier cached lookups.
File '/package.json' does not exist according to earlier cached lookups.
[91merror[0m[90m TS2318: [0mCannot find global type 'ImportAttributes'.

../../tslibs/TS/Lib/lib.d.ts
  Default library for target 'es5'
node_modules/pkg0/import.d.ts
  Imported via "pkg0" from file 'fileWithImports.ts' with packageId 'pkg0/import.d.ts@0.0.1'
  Imported via "pkg0" from file 'randomFileForImport.ts' with packageId 'pkg0/import.d.ts@0.0.1'
node_modules/pkg1/require.d.ts
  Imported via "pkg1" from file 'fileWithImports.ts' with packageId 'pkg1/require.d.ts@0.0.1'
fileWithImports.ts
  Matched by include pattern '*.ts' in 'tsconfig.json'
node_modules/pkg2/import.d.ts
  Type library referenced via 'pkg2' from file 'fileWithTypeRefs.ts' with packageId 'pkg2/import.d.ts@0.0.1'
  Type library referenced via 'pkg2' from file 'randomFileForTypeRef.ts' with packageId 'pkg2/import.d.ts@0.0.1'
node_modules/pkg3/require.d.ts
  Type library referenced via 'pkg3' from file 'fileWithTypeRefs.ts' with packageId 'pkg3/require.d.ts@0.0.1'
fileWithTypeRefs.ts
  Matched by include pattern '*.ts' in 'tsconfig.json'
main.ts
  Matched by include pattern '*.ts' in 'tsconfig.json'
randomFileForImport.ts
  Matched by include pattern '*.ts' in 'tsconfig.json'
randomFileForTypeRef.ts
  Matched by include pattern '*.ts' in 'tsconfig.json'
node_modules/@types/pkg4/index.d.ts
  Entry point for implicit type library 'pkg4'
[[90mHH:MM:SS AM[0m] Found 1 error. Watching for file changes.



//// [/home/src/workspaces/project/fileWithImports.js] file written with same contents
//// [/home/src/workspaces/project/fileWithTypeRefs.js] file written with same contents
//// [/home/src/workspaces/project/main.js] file written with same contents
//// [/home/src/workspaces/project/randomFileForImport.js] file written with same contents
//// [/home/src/workspaces/project/randomFileForTypeRef.js] file written with same contents

PolledWatches::
/home/src/workspaces/node_modules:
  {"pollingInterval":500}
/home/src/workspaces/node_modules/@types:
  {"pollingInterval":500}
/home/src/workspaces/package.json:
  {"pollingInterval":2000}
/home/src/workspaces/project/node_modules/@types/package.json:
  {"pollingInterval":2000}
/home/src/workspaces/project/node_modules/@types/pkg4/package.json:
  {"pollingInterval":2000}
/home/src/workspaces/project/node_modules/package.json:
  {"pollingInterval":2000}
/home/src/workspaces/project/package.json:
  {"pollingInterval":2000}

FsWatches::
/home/src/tslibs/TS/Lib/lib.d.ts:
  {}
/home/src/workspaces:
  {}
/home/src/workspaces/project:
  {}
/home/src/workspaces/project/fileWithImports.ts:
  {}
/home/src/workspaces/project/fileWithTypeRefs.ts:
  {}
/home/src/workspaces/project/main.ts:
  {}
/home/src/workspaces/project/node_modules/@types/pkg4/index.d.ts:
  {}
/home/src/workspaces/project/node_modules/pkg0/import.d.ts:
  {}
/home/src/workspaces/project/node_modules/pkg0/package.json:
  {}
/home/src/workspaces/project/node_modules/pkg1/package.json:
  {}
/home/src/workspaces/project/node_modules/pkg1/require.d.ts:
  {}
/home/src/workspaces/project/node_modules/pkg2/import.d.ts:
  {}
/home/src/workspaces/project/node_modules/pkg2/package.json:
  {}
/home/src/workspaces/project/node_modules/pkg3/package.json:
  {}
/home/src/workspaces/project/node_modules/pkg3/require.d.ts: *new*
  {}
/home/src/workspaces/project/randomFileForImport.ts:
  {}
/home/src/workspaces/project/randomFileForTypeRef.ts:
  {}
/home/src/workspaces/project/tsconfig.json:
  {}

FsWatchesRecursive::
/home/src/workspaces/project/node_modules:
  {}
/home/src/workspaces/project/node_modules/@types:
  {}


Program root files: [
  "/home/src/workspaces/project/fileWithImports.ts",
  "/home/src/workspaces/project/fileWithTypeRefs.ts",
  "/home/src/workspaces/project/main.ts",
  "/home/src/workspaces/project/randomFileForImport.ts",
  "/home/src/workspaces/project/randomFileForTypeRef.ts"
]
Program options: {
  "traceResolution": true,
  "watch": true,
  "project": "/home/src/workspaces/project/tsconfig.json",
  "explainFiles": true,
  "extendedDiagnostics": true,
  "configFilePath": "/home/src/workspaces/project/tsconfig.json"
}
Program structureReused: SafeModules
Program files::
/home/src/tslibs/TS/Lib/lib.d.ts
/home/src/workspaces/project/node_modules/pkg0/import.d.ts
/home/src/workspaces/project/node_modules/pkg1/require.d.ts
/home/src/workspaces/project/fileWithImports.ts
/home/src/workspaces/project/node_modules/pkg2/import.d.ts
/home/src/workspaces/project/node_modules/pkg3/require.d.ts
/home/src/workspaces/project/fileWithTypeRefs.ts
/home/src/workspaces/project/main.ts
/home/src/workspaces/project/randomFileForImport.ts
/home/src/workspaces/project/randomFileForTypeRef.ts
/home/src/workspaces/project/node_modules/@types/pkg4/index.d.ts

Semantic diagnostics in builder refreshed for::
/home/src/tslibs/TS/Lib/lib.d.ts
/home/src/workspaces/project/node_modules/pkg0/import.d.ts
/home/src/workspaces/project/node_modules/pkg1/require.d.ts
/home/src/workspaces/project/fileWithImports.ts
/home/src/workspaces/project/node_modules/pkg2/import.d.ts
/home/src/workspaces/project/node_modules/pkg3/require.d.ts
/home/src/workspaces/project/fileWithTypeRefs.ts
/home/src/workspaces/project/main.ts
/home/src/workspaces/project/randomFileForImport.ts
/home/src/workspaces/project/randomFileForTypeRef.ts
/home/src/workspaces/project/node_modules/@types/pkg4/index.d.ts

Shape signatures in builder refreshed for::
/home/src/workspaces/project/node_modules/pkg3/require.d.ts (used version)
/home/src/workspaces/project/node_modules/pkg0/import.d.ts (used version)
/home/src/workspaces/project/node_modules/pkg1/require.d.ts (used version)
/home/src/workspaces/project/filewithimports.ts (computed .d.ts)
/home/src/workspaces/project/node_modules/pkg2/import.d.ts (used version)
/home/src/workspaces/project/filewithtyperefs.ts (computed .d.ts)
/home/src/workspaces/project/main.ts (computed .d.ts)
/home/src/workspaces/project/randomfileforimport.ts (computed .d.ts)
/home/src/workspaces/project/randomfilefortyperef.ts (computed .d.ts)
/home/src/workspaces/project/node_modules/@types/pkg4/index.d.ts (used version)

exitCode:: ExitStatus.undefined

Change:: modify package.json and that should re-resolve

Input::
//// [/home/src/workspaces/project/node_modules/pkg1/package.json]
{
  "name": "pkg1",
  "version": "0.0.1",
  "exports": {
    "import": "./import.js",
    "require": "./require1.js"
  }
}


Output::
FileWatcher:: Triggered with /home/src/workspaces/project/node_modules/pkg1/package.json 1:: WatchInfo: /home/src/workspaces/project/node_modules/pkg1/package.json 2000 undefined File location affecting resolution
Scheduling invalidateFailedLookup
Elapsed:: *ms FileWatcher:: Triggered with /home/src/workspaces/project/node_modules/pkg1/package.json 1:: WatchInfo: /home/src/workspaces/project/node_modules/pkg1/package.json 2000 undefined File location affecting resolution


Timeout callback:: count: 1
7: timerToInvalidateFailedLookupResolutions *new*

Before running Timeout callback:: count: 1
7: timerToInvalidateFailedLookupResolutions

Host is moving to new time
After running Timeout callback:: count: 1
Output::
Scheduling update



Timeout callback:: count: 1
8: timerToUpdateProgram *new*

Before running Timeout callback:: count: 1
8: timerToUpdateProgram

Host is moving to new time
After running Timeout callback:: count: 0
Output::
Synchronizing program
[[90mHH:MM:SS AM[0m] File change detected. Starting incremental compilation...

CreatingProgramWith::
  roots: ["/home/src/workspaces/project/fileWithImports.ts","/home/src/workspaces/project/fileWithTypeRefs.ts","/home/src/workspaces/project/main.ts","/home/src/workspaces/project/randomFileForImport.ts","/home/src/workspaces/project/randomFileForTypeRef.ts"]
  options: {"traceResolution":true,"watch":true,"project":"/home/src/workspaces/project/tsconfig.json","explainFiles":true,"extendedDiagnostics":true,"configFilePath":"/home/src/workspaces/project/tsconfig.json"}
File '/home/src/workspaces/project/node_modules/pkg0/package.json' exists according to earlier cached lookups.
Found 'package.json' at '/home/src/workspaces/project/node_modules/pkg1/package.json'.
File '/home/src/workspaces/project/node_modules/pkg2/package.json' exists according to earlier cached lookups.
File '/home/src/workspaces/project/node_modules/pkg3/package.json' exists according to earlier cached lookups.
File '/home/src/workspaces/project/node_modules/@types/pkg4/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspaces/project/node_modules/@types/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspaces/project/node_modules/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspaces/project/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspaces/package.json' does not exist according to earlier cached lookups.
File '/home/src/package.json' does not exist according to earlier cached lookups.
File '/home/package.json' does not exist according to earlier cached lookups.
File '/package.json' does not exist according to earlier cached lookups.
Reusing resolution of module 'pkg0' from '/home/src/workspaces/project/fileWithImports.ts' of old program, it was successfully resolved to '/home/src/workspaces/project/node_modules/pkg0/import.d.ts' with Package ID 'pkg0/import.d.ts@0.0.1'.
======== Resolving module 'pkg1' from '/home/src/workspaces/project/fileWithImports.ts'. ========
Module resolution kind is not specified, using 'Node10'.
File '/home/src/workspaces/project/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspaces/package.json' does not exist according to earlier cached lookups.
File '/home/src/package.json' does not exist according to earlier cached lookups.
File '/home/package.json' does not exist according to earlier cached lookups.
File '/package.json' does not exist according to earlier cached lookups.
Loading module 'pkg1' from 'node_modules' folder, target file types: TypeScript, Declaration.
Searching all ancestor node_modules directories for preferred extensions: TypeScript, Declaration.
File '/home/src/workspaces/project/node_modules/pkg1/package.json' exists according to earlier cached lookups.
Entering conditional exports.
Saw non-matching condition 'import'.
Matched 'exports' condition 'require'.
Using 'exports' subpath '.' with target './require1.js'.
File name '/home/src/workspaces/project/node_modules/pkg1/require1.js' has a '.js' extension - stripping it.
File '/home/src/workspaces/project/node_modules/pkg1/require1.ts' does not exist.
File '/home/src/workspaces/project/node_modules/pkg1/require1.tsx' does not exist.
File '/home/src/workspaces/project/node_modules/pkg1/require1.d.ts' does not exist.
Failed to resolve under condition 'require'.
Exiting conditional exports.
File '/home/src/workspaces/project/node_modules/@types/pkg1.d.ts' does not exist.
Directory '/home/src/workspaces/node_modules' does not exist, skipping all lookups in it.
Directory '/home/src/node_modules' does not exist, skipping all lookups in it.
Directory '/home/node_modules' does not exist, skipping all lookups in it.
Directory '/node_modules' does not exist, skipping all lookups in it.
File '/home/src/workspaces/project/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspaces/package.json' does not exist according to earlier cached lookups.
File '/home/src/package.json' does not exist according to earlier cached lookups.
File '/home/package.json' does not exist according to earlier cached lookups.
File '/package.json' does not exist according to earlier cached lookups.
Loading module 'pkg1' from 'node_modules' folder, target file types: JavaScript.
Searching all ancestor node_modules directories for fallback extensions: JavaScript.
File '/home/src/workspaces/project/node_modules/pkg1/package.json' exists according to earlier cached lookups.
Entering conditional exports.
Saw non-matching condition 'import'.
Matched 'exports' condition 'require'.
Using 'exports' subpath '.' with target './require1.js'.
File name '/home/src/workspaces/project/node_modules/pkg1/require1.js' has a '.js' extension - stripping it.
File '/home/src/workspaces/project/node_modules/pkg1/require1.js' does not exist.
File '/home/src/workspaces/project/node_modules/pkg1/require1.jsx' does not exist.
Failed to resolve under condition 'require'.
Exiting conditional exports.
Directory '/home/src/workspaces/node_modules' does not exist, skipping all lookups in it.
Directory '/home/src/node_modules' does not exist, skipping all lookups in it.
Directory '/home/node_modules' does not exist, skipping all lookups in it.
Directory '/node_modules' does not exist, skipping all lookups in it.
Resolution of non-relative name failed; trying with '--moduleResolution bundler' to see if project may need configuration update.
File '/home/src/workspaces/project/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspaces/package.json' does not exist according to earlier cached lookups.
File '/home/src/package.json' does not exist according to earlier cached lookups.
File '/home/package.json' does not exist according to earlier cached lookups.
File '/package.json' does not exist according to earlier cached lookups.
Loading module 'pkg1' from 'node_modules' folder, target file types: TypeScript, Declaration.
Searching all ancestor node_modules directories for preferred extensions: TypeScript, Declaration.
File '/home/src/workspaces/project/node_modules/pkg1/package.json' exists according to earlier cached lookups.
Entering conditional exports.
Matched 'exports' condition 'import'.
Using 'exports' subpath '.' with target './import.js'.
File name '/home/src/workspaces/project/node_modules/pkg1/import.js' has a '.js' extension - stripping it.
File '/home/src/workspaces/project/node_modules/pkg1/import.ts' does not exist.
File '/home/src/workspaces/project/node_modules/pkg1/import.tsx' does not exist.
File '/home/src/workspaces/project/node_modules/pkg1/import.d.ts' exists - use it as a name resolution result.
'package.json' does not have a 'peerDependencies' field.
Resolved under condition 'import'.
Exiting conditional exports.
======== Module name 'pkg1' was not resolved. ========
File '/home/src/workspaces/project/node_modules/pkg0/package.json' exists according to earlier cached lookups.
Reusing resolution of type reference directive 'pkg2' from '/home/src/workspaces/project/fileWithTypeRefs.ts' of old program, it was successfully resolved to '/home/src/workspaces/project/node_modules/pkg2/import.d.ts' with Package ID 'pkg2/import.d.ts@0.0.1'.
Reusing resolution of type reference directive 'pkg3' from '/home/src/workspaces/project/fileWithTypeRefs.ts' of old program, it was successfully resolved to '/home/src/workspaces/project/node_modules/pkg3/require.d.ts' with Package ID 'pkg3/require.d.ts@0.0.1'.
File '/home/src/workspaces/project/node_modules/pkg2/package.json' exists according to earlier cached lookups.
File '/home/src/workspaces/project/node_modules/pkg3/package.json' exists according to earlier cached lookups.
Reusing resolution of module 'pkg0' from '/home/src/workspaces/project/randomFileForImport.ts' of old program, it was successfully resolved to '/home/src/workspaces/project/node_modules/pkg0/import.d.ts' with Package ID 'pkg0/import.d.ts@0.0.1'.
Reusing resolution of type reference directive 'pkg2' from '/home/src/workspaces/project/randomFileForTypeRef.ts' of old program, it was successfully resolved to '/home/src/workspaces/project/node_modules/pkg2/import.d.ts' with Package ID 'pkg2/import.d.ts@0.0.1'.
Reusing resolution of type reference directive 'pkg4' from '/home/src/workspaces/project/__inferred type names__.ts' of old program, it was successfully resolved to '/home/src/workspaces/project/node_modules/@types/pkg4/index.d.ts'.
File '/home/src/workspaces/project/node_modules/@types/pkg4/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspaces/project/node_modules/@types/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspaces/project/node_modules/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspaces/project/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspaces/package.json' does not exist according to earlier cached lookups.
File '/home/src/package.json' does not exist according to earlier cached lookups.
File '/home/package.json' does not exist according to earlier cached lookups.
File '/package.json' does not exist according to earlier cached lookups.
FileWatcher:: Close:: WatchInfo: /home/src/workspaces/project/node_modules/pkg1/require.d.ts 250 undefined Source file
[91merror[0m[90m TS2318: [0mCannot find global type 'ImportAttributes'.

[96mfileWithImports.ts[0m:[93m2[0m:[93m40[0m - [91merror[0m[90m TS2307: [0mCannot find module 'pkg1' or its corresponding type declarations.
  There are types at '/home/src/workspaces/project/node_modules/pkg1/import.d.ts', but this result could not be resolved under your current 'moduleResolution' setting. Consider updating to 'node16', 'nodenext', or 'bundler'.

[7m2[0m import type { RequireInterface1 } from "pkg1" assert { "resolution-mode": "require" };
[7m [0m [91m                                       ~~~~~~[0m

../../tslibs/TS/Lib/lib.d.ts
  Default library for target 'es5'
node_modules/pkg0/import.d.ts
  Imported via "pkg0" from file 'fileWithImports.ts' with packageId 'pkg0/import.d.ts@0.0.1'
  Imported via "pkg0" from file 'randomFileForImport.ts' with packageId 'pkg0/import.d.ts@0.0.1'
fileWithImports.ts
  Matched by include pattern '*.ts' in 'tsconfig.json'
node_modules/pkg2/import.d.ts
  Type library referenced via 'pkg2' from file 'fileWithTypeRefs.ts' with packageId 'pkg2/import.d.ts@0.0.1'
  Type library referenced via 'pkg2' from file 'randomFileForTypeRef.ts' with packageId 'pkg2/import.d.ts@0.0.1'
node_modules/pkg3/require.d.ts
  Type library referenced via 'pkg3' from file 'fileWithTypeRefs.ts' with packageId 'pkg3/require.d.ts@0.0.1'
fileWithTypeRefs.ts
  Matched by include pattern '*.ts' in 'tsconfig.json'
main.ts
  Matched by include pattern '*.ts' in 'tsconfig.json'
randomFileForImport.ts
  Matched by include pattern '*.ts' in 'tsconfig.json'
randomFileForTypeRef.ts
  Matched by include pattern '*.ts' in 'tsconfig.json'
node_modules/@types/pkg4/index.d.ts
  Entry point for implicit type library 'pkg4'
[[90mHH:MM:SS AM[0m] Found 2 errors. Watching for file changes.



//// [/home/src/workspaces/project/fileWithImports.js] file written with same contents

PolledWatches::
/home/src/workspaces/node_modules:
  {"pollingInterval":500}
/home/src/workspaces/node_modules/@types:
  {"pollingInterval":500}
/home/src/workspaces/package.json:
  {"pollingInterval":2000}
/home/src/workspaces/project/node_modules/@types/package.json:
  {"pollingInterval":2000}
/home/src/workspaces/project/node_modules/@types/pkg4/package.json:
  {"pollingInterval":2000}
/home/src/workspaces/project/node_modules/package.json:
  {"pollingInterval":2000}
/home/src/workspaces/project/package.json:
  {"pollingInterval":2000}

FsWatches::
/home/src/tslibs/TS/Lib/lib.d.ts:
  {}
/home/src/workspaces:
  {}
/home/src/workspaces/project:
  {}
/home/src/workspaces/project/fileWithImports.ts:
  {}
/home/src/workspaces/project/fileWithTypeRefs.ts:
  {}
/home/src/workspaces/project/main.ts:
  {}
/home/src/workspaces/project/node_modules/@types/pkg4/index.d.ts:
  {}
/home/src/workspaces/project/node_modules/pkg0/import.d.ts:
  {}
/home/src/workspaces/project/node_modules/pkg0/package.json:
  {}
/home/src/workspaces/project/node_modules/pkg1/package.json:
  {}
/home/src/workspaces/project/node_modules/pkg2/import.d.ts:
  {}
/home/src/workspaces/project/node_modules/pkg2/package.json:
  {}
/home/src/workspaces/project/node_modules/pkg3/package.json:
  {}
/home/src/workspaces/project/node_modules/pkg3/require.d.ts:
  {}
/home/src/workspaces/project/randomFileForImport.ts:
  {}
/home/src/workspaces/project/randomFileForTypeRef.ts:
  {}
/home/src/workspaces/project/tsconfig.json:
  {}

FsWatches *deleted*::
/home/src/workspaces/project/node_modules/pkg1/require.d.ts:
  {}

FsWatchesRecursive::
/home/src/workspaces/project/node_modules:
  {}
/home/src/workspaces/project/node_modules/@types:
  {}


Program root files: [
  "/home/src/workspaces/project/fileWithImports.ts",
  "/home/src/workspaces/project/fileWithTypeRefs.ts",
  "/home/src/workspaces/project/main.ts",
  "/home/src/workspaces/project/randomFileForImport.ts",
  "/home/src/workspaces/project/randomFileForTypeRef.ts"
]
Program options: {
  "traceResolution": true,
  "watch": true,
  "project": "/home/src/workspaces/project/tsconfig.json",
  "explainFiles": true,
  "extendedDiagnostics": true,
  "configFilePath": "/home/src/workspaces/project/tsconfig.json"
}
Program structureReused: SafeModules
Program files::
/home/src/tslibs/TS/Lib/lib.d.ts
/home/src/workspaces/project/node_modules/pkg0/import.d.ts
/home/src/workspaces/project/fileWithImports.ts
/home/src/workspaces/project/node_modules/pkg2/import.d.ts
/home/src/workspaces/project/node_modules/pkg3/require.d.ts
/home/src/workspaces/project/fileWithTypeRefs.ts
/home/src/workspaces/project/main.ts
/home/src/workspaces/project/randomFileForImport.ts
/home/src/workspaces/project/randomFileForTypeRef.ts
/home/src/workspaces/project/node_modules/@types/pkg4/index.d.ts

Semantic diagnostics in builder refreshed for::
/home/src/workspaces/project/fileWithImports.ts

Shape signatures in builder refreshed for::
/home/src/workspaces/project/filewithimports.ts (computed .d.ts)

exitCode:: ExitStatus.undefined

Change:: write file not resolved by import

Input::
//// [/home/src/workspaces/project/node_modules/pkg1/require1.d.ts]
export interface RequireInterface1 {}


Output::
DirectoryWatcher:: Triggered with /home/src/workspaces/project/node_modules/pkg1/require1.d.ts :: WatchInfo: /home/src/workspaces/project/node_modules 1 undefined Failed Lookup Locations
Scheduling invalidateFailedLookup
Elapsed:: *ms DirectoryWatcher:: Triggered with /home/src/workspaces/project/node_modules/pkg1/require1.d.ts :: WatchInfo: /home/src/workspaces/project/node_modules 1 undefined Failed Lookup Locations


Timeout callback:: count: 1
9: timerToInvalidateFailedLookupResolutions *new*

Before running Timeout callback:: count: 1
9: timerToInvalidateFailedLookupResolutions

Host is moving to new time
After running Timeout callback:: count: 1
Output::
Scheduling update



Timeout callback:: count: 1
10: timerToUpdateProgram *new*

Before running Timeout callback:: count: 1
10: timerToUpdateProgram

Host is moving to new time
After running Timeout callback:: count: 0
Output::
Synchronizing program
[[90mHH:MM:SS AM[0m] File change detected. Starting incremental compilation...

CreatingProgramWith::
  roots: ["/home/src/workspaces/project/fileWithImports.ts","/home/src/workspaces/project/fileWithTypeRefs.ts","/home/src/workspaces/project/main.ts","/home/src/workspaces/project/randomFileForImport.ts","/home/src/workspaces/project/randomFileForTypeRef.ts"]
  options: {"traceResolution":true,"watch":true,"project":"/home/src/workspaces/project/tsconfig.json","explainFiles":true,"extendedDiagnostics":true,"configFilePath":"/home/src/workspaces/project/tsconfig.json"}
File '/home/src/workspaces/project/node_modules/pkg0/package.json' exists according to earlier cached lookups.
File '/home/src/workspaces/project/node_modules/pkg2/package.json' exists according to earlier cached lookups.
File '/home/src/workspaces/project/node_modules/pkg3/package.json' exists according to earlier cached lookups.
File '/home/src/workspaces/project/node_modules/@types/pkg4/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspaces/project/node_modules/@types/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspaces/project/node_modules/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspaces/project/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspaces/package.json' does not exist according to earlier cached lookups.
File '/home/src/package.json' does not exist according to earlier cached lookups.
File '/home/package.json' does not exist according to earlier cached lookups.
File '/package.json' does not exist according to earlier cached lookups.
Reusing resolution of module 'pkg0' from '/home/src/workspaces/project/fileWithImports.ts' of old program, it was successfully resolved to '/home/src/workspaces/project/node_modules/pkg0/import.d.ts' with Package ID 'pkg0/import.d.ts@0.0.1'.
======== Resolving module 'pkg1' from '/home/src/workspaces/project/fileWithImports.ts'. ========
Module resolution kind is not specified, using 'Node10'.
File '/home/src/workspaces/project/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspaces/package.json' does not exist according to earlier cached lookups.
File '/home/src/package.json' does not exist according to earlier cached lookups.
File '/home/package.json' does not exist according to earlier cached lookups.
File '/package.json' does not exist according to earlier cached lookups.
Loading module 'pkg1' from 'node_modules' folder, target file types: TypeScript, Declaration.
Searching all ancestor node_modules directories for preferred extensions: TypeScript, Declaration.
Found 'package.json' at '/home/src/workspaces/project/node_modules/pkg1/package.json'.
Entering conditional exports.
Saw non-matching condition 'import'.
Matched 'exports' condition 'require'.
Using 'exports' subpath '.' with target './require1.js'.
File name '/home/src/workspaces/project/node_modules/pkg1/require1.js' has a '.js' extension - stripping it.
File '/home/src/workspaces/project/node_modules/pkg1/require1.ts' does not exist.
File '/home/src/workspaces/project/node_modules/pkg1/require1.tsx' does not exist.
File '/home/src/workspaces/project/node_modules/pkg1/require1.d.ts' exists - use it as a name resolution result.
'package.json' does not have a 'peerDependencies' field.
Resolved under condition 'require'.
Exiting conditional exports.
Resolving real path for '/home/src/workspaces/project/node_modules/pkg1/require1.d.ts', result '/home/src/workspaces/project/node_modules/pkg1/require1.d.ts'.
======== Module name 'pkg1' was successfully resolved to '/home/src/workspaces/project/node_modules/pkg1/require1.d.ts' with Package ID 'pkg1/require1.d.ts@0.0.1'. ========
File '/home/src/workspaces/project/node_modules/pkg0/package.json' exists according to earlier cached lookups.
File '/home/src/workspaces/project/node_modules/pkg1/package.json' exists according to earlier cached lookups.
FileWatcher:: Added:: WatchInfo: /home/src/workspaces/project/node_modules/pkg1/require1.d.ts 250 undefined Source file
Reusing resolution of type reference directive 'pkg2' from '/home/src/workspaces/project/fileWithTypeRefs.ts' of old program, it was successfully resolved to '/home/src/workspaces/project/node_modules/pkg2/import.d.ts' with Package ID 'pkg2/import.d.ts@0.0.1'.
Reusing resolution of type reference directive 'pkg3' from '/home/src/workspaces/project/fileWithTypeRefs.ts' of old program, it was successfully resolved to '/home/src/workspaces/project/node_modules/pkg3/require.d.ts' with Package ID 'pkg3/require.d.ts@0.0.1'.
File '/home/src/workspaces/project/node_modules/pkg2/package.json' exists according to earlier cached lookups.
File '/home/src/workspaces/project/node_modules/pkg3/package.json' exists according to earlier cached lookups.
Reusing resolution of module 'pkg0' from '/home/src/workspaces/project/randomFileForImport.ts' of old program, it was successfully resolved to '/home/src/workspaces/project/node_modules/pkg0/import.d.ts' with Package ID 'pkg0/import.d.ts@0.0.1'.
Reusing resolution of type reference directive 'pkg2' from '/home/src/workspaces/project/randomFileForTypeRef.ts' of old program, it was successfully resolved to '/home/src/workspaces/project/node_modules/pkg2/import.d.ts' with Package ID 'pkg2/import.d.ts@0.0.1'.
Reusing resolution of type reference directive 'pkg4' from '/home/src/workspaces/project/__inferred type names__.ts' of old program, it was successfully resolved to '/home/src/workspaces/project/node_modules/@types/pkg4/index.d.ts'.
File '/home/src/workspaces/project/node_modules/@types/pkg4/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspaces/project/node_modules/@types/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspaces/project/node_modules/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspaces/project/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspaces/package.json' does not exist according to earlier cached lookups.
File '/home/src/package.json' does not exist according to earlier cached lookups.
File '/home/package.json' does not exist according to earlier cached lookups.
File '/package.json' does not exist according to earlier cached lookups.
[91merror[0m[90m TS2318: [0mCannot find global type 'ImportAttributes'.

../../tslibs/TS/Lib/lib.d.ts
  Default library for target 'es5'
node_modules/pkg0/import.d.ts
  Imported via "pkg0" from file 'fileWithImports.ts' with packageId 'pkg0/import.d.ts@0.0.1'
  Imported via "pkg0" from file 'randomFileForImport.ts' with packageId 'pkg0/import.d.ts@0.0.1'
node_modules/pkg1/require1.d.ts
  Imported via "pkg1" from file 'fileWithImports.ts' with packageId 'pkg1/require1.d.ts@0.0.1'
fileWithImports.ts
  Matched by include pattern '*.ts' in 'tsconfig.json'
node_modules/pkg2/import.d.ts
  Type library referenced via 'pkg2' from file 'fileWithTypeRefs.ts' with packageId 'pkg2/import.d.ts@0.0.1'
  Type library referenced via 'pkg2' from file 'randomFileForTypeRef.ts' with packageId 'pkg2/import.d.ts@0.0.1'
node_modules/pkg3/require.d.ts
  Type library referenced via 'pkg3' from file 'fileWithTypeRefs.ts' with packageId 'pkg3/require.d.ts@0.0.1'
fileWithTypeRefs.ts
  Matched by include pattern '*.ts' in 'tsconfig.json'
main.ts
  Matched by include pattern '*.ts' in 'tsconfig.json'
randomFileForImport.ts
  Matched by include pattern '*.ts' in 'tsconfig.json'
randomFileForTypeRef.ts
  Matched by include pattern '*.ts' in 'tsconfig.json'
node_modules/@types/pkg4/index.d.ts
  Entry point for implicit type library 'pkg4'
[[90mHH:MM:SS AM[0m] Found 1 error. Watching for file changes.



//// [/home/src/workspaces/project/fileWithImports.js] file written with same contents

PolledWatches::
/home/src/workspaces/node_modules:
  {"pollingInterval":500}
/home/src/workspaces/node_modules/@types:
  {"pollingInterval":500}
/home/src/workspaces/package.json:
  {"pollingInterval":2000}
/home/src/workspaces/project/node_modules/@types/package.json:
  {"pollingInterval":2000}
/home/src/workspaces/project/node_modules/@types/pkg4/package.json:
  {"pollingInterval":2000}
/home/src/workspaces/project/node_modules/package.json:
  {"pollingInterval":2000}
/home/src/workspaces/project/package.json:
  {"pollingInterval":2000}

FsWatches::
/home/src/tslibs/TS/Lib/lib.d.ts:
  {}
/home/src/workspaces:
  {}
/home/src/workspaces/project:
  {}
/home/src/workspaces/project/fileWithImports.ts:
  {}
/home/src/workspaces/project/fileWithTypeRefs.ts:
  {}
/home/src/workspaces/project/main.ts:
  {}
/home/src/workspaces/project/node_modules/@types/pkg4/index.d.ts:
  {}
/home/src/workspaces/project/node_modules/pkg0/import.d.ts:
  {}
/home/src/workspaces/project/node_modules/pkg0/package.json:
  {}
/home/src/workspaces/project/node_modules/pkg1/package.json:
  {}
/home/src/workspaces/project/node_modules/pkg1/require1.d.ts: *new*
  {}
/home/src/workspaces/project/node_modules/pkg2/import.d.ts:
  {}
/home/src/workspaces/project/node_modules/pkg2/package.json:
  {}
/home/src/workspaces/project/node_modules/pkg3/package.json:
  {}
/home/src/workspaces/project/node_modules/pkg3/require.d.ts:
  {}
/home/src/workspaces/project/randomFileForImport.ts:
  {}
/home/src/workspaces/project/randomFileForTypeRef.ts:
  {}
/home/src/workspaces/project/tsconfig.json:
  {}

FsWatchesRecursive::
/home/src/workspaces/project/node_modules:
  {}
/home/src/workspaces/project/node_modules/@types:
  {}


Program root files: [
  "/home/src/workspaces/project/fileWithImports.ts",
  "/home/src/workspaces/project/fileWithTypeRefs.ts",
  "/home/src/workspaces/project/main.ts",
  "/home/src/workspaces/project/randomFileForImport.ts",
  "/home/src/workspaces/project/randomFileForTypeRef.ts"
]
Program options: {
  "traceResolution": true,
  "watch": true,
  "project": "/home/src/workspaces/project/tsconfig.json",
  "explainFiles": true,
  "extendedDiagnostics": true,
  "configFilePath": "/home/src/workspaces/project/tsconfig.json"
}
Program structureReused: SafeModules
Program files::
/home/src/tslibs/TS/Lib/lib.d.ts
/home/src/workspaces/project/node_modules/pkg0/import.d.ts
/home/src/workspaces/project/node_modules/pkg1/require1.d.ts
/home/src/workspaces/project/fileWithImports.ts
/home/src/workspaces/project/node_modules/pkg2/import.d.ts
/home/src/workspaces/project/node_modules/pkg3/require.d.ts
/home/src/workspaces/project/fileWithTypeRefs.ts
/home/src/workspaces/project/main.ts
/home/src/workspaces/project/randomFileForImport.ts
/home/src/workspaces/project/randomFileForTypeRef.ts
/home/src/workspaces/project/node_modules/@types/pkg4/index.d.ts

Semantic diagnostics in builder refreshed for::
/home/src/workspaces/project/node_modules/pkg1/require1.d.ts
/home/src/workspaces/project/fileWithImports.ts

Shape signatures in builder refreshed for::
/home/src/workspaces/project/node_modules/pkg1/require1.d.ts (used version)
/home/src/workspaces/project/filewithimports.ts (computed .d.ts)

exitCode:: ExitStatus.undefined

Change:: delete file with imports

Input::
//// [/home/src/workspaces/project/fileWithImports.ts] deleted

Output::
FileWatcher:: Triggered with /home/src/workspaces/project/fileWithImports.ts 2:: WatchInfo: /home/src/workspaces/project/fileWithImports.ts 250 undefined Source file
Scheduling update
Elapsed:: *ms FileWatcher:: Triggered with /home/src/workspaces/project/fileWithImports.ts 2:: WatchInfo: /home/src/workspaces/project/fileWithImports.ts 250 undefined Source file
DirectoryWatcher:: Triggered with /home/src/workspaces/project/fileWithImports.ts :: WatchInfo: /home/src/workspaces/project 0 undefined Failed Lookup Locations
Scheduling invalidateFailedLookup
Elapsed:: *ms DirectoryWatcher:: Triggered with /home/src/workspaces/project/fileWithImports.ts :: WatchInfo: /home/src/workspaces/project 0 undefined Failed Lookup Locations
DirectoryWatcher:: Triggered with /home/src/workspaces/project/fileWithImports.ts :: WatchInfo: /home/src/workspaces/project 0 undefined Wild card directory
Scheduling update
Elapsed:: *ms DirectoryWatcher:: Triggered with /home/src/workspaces/project/fileWithImports.ts :: WatchInfo: /home/src/workspaces/project 0 undefined Wild card directory


Timeout callback:: count: 2
12: timerToInvalidateFailedLookupResolutions *new*
13: timerToUpdateProgram *new*

Before running Timeout callback:: count: 2
12: timerToInvalidateFailedLookupResolutions
13: timerToUpdateProgram

Host is moving to new time
After running Timeout callback:: count: 0
Output::
Reloading new file names and options
Synchronizing program
[[90mHH:MM:SS AM[0m] File change detected. Starting incremental compilation...

CreatingProgramWith::
  roots: ["/home/src/workspaces/project/fileWithTypeRefs.ts","/home/src/workspaces/project/main.ts","/home/src/workspaces/project/randomFileForImport.ts","/home/src/workspaces/project/randomFileForTypeRef.ts"]
  options: {"traceResolution":true,"watch":true,"project":"/home/src/workspaces/project/tsconfig.json","explainFiles":true,"extendedDiagnostics":true,"configFilePath":"/home/src/workspaces/project/tsconfig.json"}
Reusing resolution of type reference directive 'pkg2' from '/home/src/workspaces/project/fileWithTypeRefs.ts' of old program, it was successfully resolved to '/home/src/workspaces/project/node_modules/pkg2/import.d.ts' with Package ID 'pkg2/import.d.ts@0.0.1'.
Reusing resolution of type reference directive 'pkg3' from '/home/src/workspaces/project/fileWithTypeRefs.ts' of old program, it was successfully resolved to '/home/src/workspaces/project/node_modules/pkg3/require.d.ts' with Package ID 'pkg3/require.d.ts@0.0.1'.
File '/home/src/workspaces/project/node_modules/pkg2/package.json' exists according to earlier cached lookups.
File '/home/src/workspaces/project/node_modules/pkg3/package.json' exists according to earlier cached lookups.
Reusing resolution of module 'pkg0' from '/home/src/workspaces/project/randomFileForImport.ts' of old program, it was successfully resolved to '/home/src/workspaces/project/node_modules/pkg0/import.d.ts' with Package ID 'pkg0/import.d.ts@0.0.1'.
File '/home/src/workspaces/project/node_modules/pkg0/package.json' exists according to earlier cached lookups.
Reusing resolution of type reference directive 'pkg2' from '/home/src/workspaces/project/randomFileForTypeRef.ts' of old program, it was successfully resolved to '/home/src/workspaces/project/node_modules/pkg2/import.d.ts' with Package ID 'pkg2/import.d.ts@0.0.1'.
Reusing resolution of type reference directive 'pkg4' from '/home/src/workspaces/project/__inferred type names__.ts' of old program, it was successfully resolved to '/home/src/workspaces/project/node_modules/@types/pkg4/index.d.ts'.
File '/home/src/workspaces/project/node_modules/@types/pkg4/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspaces/project/node_modules/@types/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspaces/project/node_modules/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspaces/project/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspaces/package.json' does not exist according to earlier cached lookups.
File '/home/src/package.json' does not exist according to earlier cached lookups.
File '/home/package.json' does not exist according to earlier cached lookups.
File '/package.json' does not exist according to earlier cached lookups.
FileWatcher:: Close:: WatchInfo: /home/src/workspaces/project/node_modules/pkg1/require1.d.ts 250 undefined Source file
FileWatcher:: Close:: WatchInfo: /home/src/workspaces/project/fileWithImports.ts 250 undefined Source file
FileWatcher:: Close:: WatchInfo: /home/src/workspaces/project/node_modules/pkg1/package.json 2000 undefined File location affecting resolution
../../tslibs/TS/Lib/lib.d.ts
  Default library for target 'es5'
node_modules/pkg2/import.d.ts
  Type library referenced via 'pkg2' from file 'fileWithTypeRefs.ts' with packageId 'pkg2/import.d.ts@0.0.1'
  Type library referenced via 'pkg2' from file 'randomFileForTypeRef.ts' with packageId 'pkg2/import.d.ts@0.0.1'
node_modules/pkg3/require.d.ts
  Type library referenced via 'pkg3' from file 'fileWithTypeRefs.ts' with packageId 'pkg3/require.d.ts@0.0.1'
fileWithTypeRefs.ts
  Matched by include pattern '*.ts' in 'tsconfig.json'
main.ts
  Matched by include pattern '*.ts' in 'tsconfig.json'
node_modules/pkg0/import.d.ts
  Imported via "pkg0" from file 'randomFileForImport.ts' with packageId 'pkg0/import.d.ts@0.0.1'
randomFileForImport.ts
  Matched by include pattern '*.ts' in 'tsconfig.json'
randomFileForTypeRef.ts
  Matched by include pattern '*.ts' in 'tsconfig.json'
node_modules/@types/pkg4/index.d.ts
  Entry point for implicit type library 'pkg4'
[[90mHH:MM:SS AM[0m] Found 0 errors. Watching for file changes.




PolledWatches::
/home/src/workspaces/node_modules:
  {"pollingInterval":500}
/home/src/workspaces/node_modules/@types:
  {"pollingInterval":500}
/home/src/workspaces/package.json:
  {"pollingInterval":2000}
/home/src/workspaces/project/node_modules/@types/package.json:
  {"pollingInterval":2000}
/home/src/workspaces/project/node_modules/@types/pkg4/package.json:
  {"pollingInterval":2000}
/home/src/workspaces/project/node_modules/package.json:
  {"pollingInterval":2000}
/home/src/workspaces/project/package.json:
  {"pollingInterval":2000}

FsWatches::
/home/src/tslibs/TS/Lib/lib.d.ts:
  {}
/home/src/workspaces:
  {}
/home/src/workspaces/project:
  {}
/home/src/workspaces/project/fileWithTypeRefs.ts:
  {}
/home/src/workspaces/project/main.ts:
  {}
/home/src/workspaces/project/node_modules/@types/pkg4/index.d.ts:
  {}
/home/src/workspaces/project/node_modules/pkg0/import.d.ts:
  {}
/home/src/workspaces/project/node_modules/pkg0/package.json:
  {}
/home/src/workspaces/project/node_modules/pkg2/import.d.ts:
  {}
/home/src/workspaces/project/node_modules/pkg2/package.json:
  {}
/home/src/workspaces/project/node_modules/pkg3/package.json:
  {}
/home/src/workspaces/project/node_modules/pkg3/require.d.ts:
  {}
/home/src/workspaces/project/randomFileForImport.ts:
  {}
/home/src/workspaces/project/randomFileForTypeRef.ts:
  {}
/home/src/workspaces/project/tsconfig.json:
  {}

FsWatches *deleted*::
/home/src/workspaces/project/fileWithImports.ts:
  {}
/home/src/workspaces/project/node_modules/pkg1/package.json:
  {}
/home/src/workspaces/project/node_modules/pkg1/require1.d.ts:
  {}

FsWatchesRecursive::
/home/src/workspaces/project/node_modules:
  {}
/home/src/workspaces/project/node_modules/@types:
  {}


Program root files: [
  "/home/src/workspaces/project/fileWithTypeRefs.ts",
  "/home/src/workspaces/project/main.ts",
  "/home/src/workspaces/project/randomFileForImport.ts",
  "/home/src/workspaces/project/randomFileForTypeRef.ts"
]
Program options: {
  "traceResolution": true,
  "watch": true,
  "project": "/home/src/workspaces/project/tsconfig.json",
  "explainFiles": true,
  "extendedDiagnostics": true,
  "configFilePath": "/home/src/workspaces/project/tsconfig.json"
}
Program structureReused: Not
Program files::
/home/src/tslibs/TS/Lib/lib.d.ts
/home/src/workspaces/project/node_modules/pkg2/import.d.ts
/home/src/workspaces/project/node_modules/pkg3/require.d.ts
/home/src/workspaces/project/fileWithTypeRefs.ts
/home/src/workspaces/project/main.ts
/home/src/workspaces/project/node_modules/pkg0/import.d.ts
/home/src/workspaces/project/randomFileForImport.ts
/home/src/workspaces/project/randomFileForTypeRef.ts
/home/src/workspaces/project/node_modules/@types/pkg4/index.d.ts

Semantic diagnostics in builder refreshed for::

No shapes updated in the builder::

exitCode:: ExitStatus.undefined

Change:: delete file with typeRefs

Input::
//// [/home/src/workspaces/project/fileWithTypeRefs.ts] deleted

Output::
FileWatcher:: Triggered with /home/src/workspaces/project/fileWithTypeRefs.ts 2:: WatchInfo: /home/src/workspaces/project/fileWithTypeRefs.ts 250 undefined Source file
Scheduling update
Elapsed:: *ms FileWatcher:: Triggered with /home/src/workspaces/project/fileWithTypeRefs.ts 2:: WatchInfo: /home/src/workspaces/project/fileWithTypeRefs.ts 250 undefined Source file
DirectoryWatcher:: Triggered with /home/src/workspaces/project/fileWithTypeRefs.ts :: WatchInfo: /home/src/workspaces/project 0 undefined Failed Lookup Locations
Scheduling invalidateFailedLookup
Elapsed:: *ms DirectoryWatcher:: Triggered with /home/src/workspaces/project/fileWithTypeRefs.ts :: WatchInfo: /home/src/workspaces/project 0 undefined Failed Lookup Locations
DirectoryWatcher:: Triggered with /home/src/workspaces/project/fileWithTypeRefs.ts :: WatchInfo: /home/src/workspaces/project 0 undefined Wild card directory
Scheduling update
Elapsed:: *ms DirectoryWatcher:: Triggered with /home/src/workspaces/project/fileWithTypeRefs.ts :: WatchInfo: /home/src/workspaces/project 0 undefined Wild card directory


Timeout callback:: count: 2
15: timerToInvalidateFailedLookupResolutions *new*
16: timerToUpdateProgram *new*

Before running Timeout callback:: count: 2
15: timerToInvalidateFailedLookupResolutions
16: timerToUpdateProgram

Host is moving to new time
After running Timeout callback:: count: 0
Output::
Reloading new file names and options
Synchronizing program
[[90mHH:MM:SS AM[0m] File change detected. Starting incremental compilation...

CreatingProgramWith::
  roots: ["/home/src/workspaces/project/main.ts","/home/src/workspaces/project/randomFileForImport.ts","/home/src/workspaces/project/randomFileForTypeRef.ts"]
  options: {"traceResolution":true,"watch":true,"project":"/home/src/workspaces/project/tsconfig.json","explainFiles":true,"extendedDiagnostics":true,"configFilePath":"/home/src/workspaces/project/tsconfig.json"}
Reusing resolution of module 'pkg0' from '/home/src/workspaces/project/randomFileForImport.ts' of old program, it was successfully resolved to '/home/src/workspaces/project/node_modules/pkg0/import.d.ts' with Package ID 'pkg0/import.d.ts@0.0.1'.
File '/home/src/workspaces/project/node_modules/pkg0/package.json' exists according to earlier cached lookups.
Reusing resolution of type reference directive 'pkg2' from '/home/src/workspaces/project/randomFileForTypeRef.ts' of old program, it was successfully resolved to '/home/src/workspaces/project/node_modules/pkg2/import.d.ts' with Package ID 'pkg2/import.d.ts@0.0.1'.
File '/home/src/workspaces/project/node_modules/pkg2/package.json' exists according to earlier cached lookups.
Reusing resolution of type reference directive 'pkg4' from '/home/src/workspaces/project/__inferred type names__.ts' of old program, it was successfully resolved to '/home/src/workspaces/project/node_modules/@types/pkg4/index.d.ts'.
File '/home/src/workspaces/project/node_modules/@types/pkg4/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspaces/project/node_modules/@types/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspaces/project/node_modules/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspaces/project/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspaces/package.json' does not exist according to earlier cached lookups.
File '/home/src/package.json' does not exist according to earlier cached lookups.
File '/home/package.json' does not exist according to earlier cached lookups.
File '/package.json' does not exist according to earlier cached lookups.
FileWatcher:: Close:: WatchInfo: /home/src/workspaces/project/node_modules/pkg3/require.d.ts 250 undefined Source file
FileWatcher:: Close:: WatchInfo: /home/src/workspaces/project/fileWithTypeRefs.ts 250 undefined Source file
FileWatcher:: Close:: WatchInfo: /home/src/workspaces/project/node_modules/pkg3/package.json 2000 undefined File location affecting resolution
[91merror[0m[90m TS2318: [0mCannot find global type 'ImportAttributes'.

../../tslibs/TS/Lib/lib.d.ts
  Default library for target 'es5'
main.ts
  Matched by include pattern '*.ts' in 'tsconfig.json'
node_modules/pkg0/import.d.ts
  Imported via "pkg0" from file 'randomFileForImport.ts' with packageId 'pkg0/import.d.ts@0.0.1'
randomFileForImport.ts
  Matched by include pattern '*.ts' in 'tsconfig.json'
node_modules/pkg2/import.d.ts
  Type library referenced via 'pkg2' from file 'randomFileForTypeRef.ts' with packageId 'pkg2/import.d.ts@0.0.1'
randomFileForTypeRef.ts
  Matched by include pattern '*.ts' in 'tsconfig.json'
node_modules/@types/pkg4/index.d.ts
  Entry point for implicit type library 'pkg4'
[[90mHH:MM:SS AM[0m] Found 1 error. Watching for file changes.



//// [/home/src/workspaces/project/main.js] file written with same contents
//// [/home/src/workspaces/project/randomFileForImport.js] file written with same contents
//// [/home/src/workspaces/project/randomFileForTypeRef.js] file written with same contents

PolledWatches::
/home/src/workspaces/node_modules:
  {"pollingInterval":500}
/home/src/workspaces/node_modules/@types:
  {"pollingInterval":500}
/home/src/workspaces/package.json:
  {"pollingInterval":2000}
/home/src/workspaces/project/node_modules/@types/package.json:
  {"pollingInterval":2000}
/home/src/workspaces/project/node_modules/@types/pkg4/package.json:
  {"pollingInterval":2000}
/home/src/workspaces/project/node_modules/package.json:
  {"pollingInterval":2000}
/home/src/workspaces/project/package.json:
  {"pollingInterval":2000}

FsWatches::
/home/src/tslibs/TS/Lib/lib.d.ts:
  {}
/home/src/workspaces:
  {}
/home/src/workspaces/project:
  {}
/home/src/workspaces/project/main.ts:
  {}
/home/src/workspaces/project/node_modules/@types/pkg4/index.d.ts:
  {}
/home/src/workspaces/project/node_modules/pkg0/import.d.ts:
  {}
/home/src/workspaces/project/node_modules/pkg0/package.json:
  {}
/home/src/workspaces/project/node_modules/pkg2/import.d.ts:
  {}
/home/src/workspaces/project/node_modules/pkg2/package.json:
  {}
/home/src/workspaces/project/randomFileForImport.ts:
  {}
/home/src/workspaces/project/randomFileForTypeRef.ts:
  {}
/home/src/workspaces/project/tsconfig.json:
  {}

FsWatches *deleted*::
/home/src/workspaces/project/fileWithTypeRefs.ts:
  {}
/home/src/workspaces/project/node_modules/pkg3/package.json:
  {}
/home/src/workspaces/project/node_modules/pkg3/require.d.ts:
  {}

FsWatchesRecursive::
/home/src/workspaces/project/node_modules:
  {}
/home/src/workspaces/project/node_modules/@types:
  {}


Program root files: [
  "/home/src/workspaces/project/main.ts",
  "/home/src/workspaces/project/randomFileForImport.ts",
  "/home/src/workspaces/project/randomFileForTypeRef.ts"
]
Program options: {
  "traceResolution": true,
  "watch": true,
  "project": "/home/src/workspaces/project/tsconfig.json",
  "explainFiles": true,
  "extendedDiagnostics": true,
  "configFilePath": "/home/src/workspaces/project/tsconfig.json"
}
Program structureReused: Not
Program files::
/home/src/tslibs/TS/Lib/lib.d.ts
/home/src/workspaces/project/main.ts
/home/src/workspaces/project/node_modules/pkg0/import.d.ts
/home/src/workspaces/project/randomFileForImport.ts
/home/src/workspaces/project/node_modules/pkg2/import.d.ts
/home/src/workspaces/project/randomFileForTypeRef.ts
/home/src/workspaces/project/node_modules/@types/pkg4/index.d.ts

Semantic diagnostics in builder refreshed for::
/home/src/workspaces/project/main.ts
/home/src/workspaces/project/node_modules/pkg0/import.d.ts
/home/src/workspaces/project/randomFileForImport.ts
/home/src/workspaces/project/node_modules/pkg2/import.d.ts
/home/src/workspaces/project/randomFileForTypeRef.ts
/home/src/workspaces/project/node_modules/@types/pkg4/index.d.ts

Shape signatures in builder refreshed for::
/home/src/workspaces/project/main.ts (computed .d.ts)
/home/src/workspaces/project/node_modules/pkg0/import.d.ts (used version)
/home/src/workspaces/project/randomfileforimport.ts (computed .d.ts)
/home/src/workspaces/project/node_modules/pkg2/import.d.ts (used version)
/home/src/workspaces/project/randomfilefortyperef.ts (computed .d.ts)
/home/src/workspaces/project/node_modules/@types/pkg4/index.d.ts (used version)

exitCode:: ExitStatus.undefined

Change:: delete resolved import file

Input::
//// [/home/src/workspaces/project/node_modules/pkg0/import.d.ts] deleted

Output::
FileWatcher:: Triggered with /home/src/workspaces/project/node_modules/pkg0/import.d.ts 2:: WatchInfo: /home/src/workspaces/project/node_modules/pkg0/import.d.ts 250 undefined Source file
Scheduling update
Elapsed:: *ms FileWatcher:: Triggered with /home/src/workspaces/project/node_modules/pkg0/import.d.ts 2:: WatchInfo: /home/src/workspaces/project/node_modules/pkg0/import.d.ts 250 undefined Source file
DirectoryWatcher:: Triggered with /home/src/workspaces/project/node_modules/pkg0/import.d.ts :: WatchInfo: /home/src/workspaces/project/node_modules 1 undefined Failed Lookup Locations
Scheduling invalidateFailedLookup
Elapsed:: *ms DirectoryWatcher:: Triggered with /home/src/workspaces/project/node_modules/pkg0/import.d.ts :: WatchInfo: /home/src/workspaces/project/node_modules 1 undefined Failed Lookup Locations


Timeout callback:: count: 2
17: timerToUpdateProgram *new*
18: timerToInvalidateFailedLookupResolutions *new*

Before running Timeout callback:: count: 2
17: timerToUpdateProgram
18: timerToInvalidateFailedLookupResolutions

Host is moving to new time
After running Timeout callback:: count: 0
Output::
Synchronizing program
[[90mHH:MM:SS AM[0m] File change detected. Starting incremental compilation...

CreatingProgramWith::
  roots: ["/home/src/workspaces/project/main.ts","/home/src/workspaces/project/randomFileForImport.ts","/home/src/workspaces/project/randomFileForTypeRef.ts"]
  options: {"traceResolution":true,"watch":true,"project":"/home/src/workspaces/project/tsconfig.json","explainFiles":true,"extendedDiagnostics":true,"configFilePath":"/home/src/workspaces/project/tsconfig.json"}
Found 'package.json' at '/home/src/workspaces/project/node_modules/pkg0/package.json'.
FileWatcher:: Close:: WatchInfo: /home/src/workspaces/project/node_modules/pkg0/import.d.ts 250 undefined Source file
======== Resolving module 'pkg0' from '/home/src/workspaces/project/randomFileForImport.ts'. ========
Module resolution kind is not specified, using 'Node10'.
File '/home/src/workspaces/project/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspaces/package.json' does not exist according to earlier cached lookups.
File '/home/src/package.json' does not exist according to earlier cached lookups.
File '/home/package.json' does not exist according to earlier cached lookups.
File '/package.json' does not exist according to earlier cached lookups.
Loading module 'pkg0' from 'node_modules' folder, target file types: TypeScript, Declaration.
Searching all ancestor node_modules directories for preferred extensions: TypeScript, Declaration.
File '/home/src/workspaces/project/node_modules/pkg0/package.json' exists according to earlier cached lookups.
Entering conditional exports.
Matched 'exports' condition 'import'.
Using 'exports' subpath '.' with target './import.js'.
File name '/home/src/workspaces/project/node_modules/pkg0/import.js' has a '.js' extension - stripping it.
File '/home/src/workspaces/project/node_modules/pkg0/import.ts' does not exist.
File '/home/src/workspaces/project/node_modules/pkg0/import.tsx' does not exist.
File '/home/src/workspaces/project/node_modules/pkg0/import.d.ts' does not exist.
Failed to resolve under condition 'import'.
Saw non-matching condition 'require'.
Exiting conditional exports.
File '/home/src/workspaces/project/node_modules/@types/pkg0.d.ts' does not exist.
Directory '/home/src/workspaces/node_modules' does not exist, skipping all lookups in it.
Directory '/home/src/node_modules' does not exist, skipping all lookups in it.
Directory '/home/node_modules' does not exist, skipping all lookups in it.
Directory '/node_modules' does not exist, skipping all lookups in it.
File '/home/src/workspaces/project/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspaces/package.json' does not exist according to earlier cached lookups.
File '/home/src/package.json' does not exist according to earlier cached lookups.
File '/home/package.json' does not exist according to earlier cached lookups.
File '/package.json' does not exist according to earlier cached lookups.
Loading module 'pkg0' from 'node_modules' folder, target file types: JavaScript.
Searching all ancestor node_modules directories for fallback extensions: JavaScript.
File '/home/src/workspaces/project/node_modules/pkg0/package.json' exists according to earlier cached lookups.
Entering conditional exports.
Matched 'exports' condition 'import'.
Using 'exports' subpath '.' with target './import.js'.
File name '/home/src/workspaces/project/node_modules/pkg0/import.js' has a '.js' extension - stripping it.
File '/home/src/workspaces/project/node_modules/pkg0/import.js' does not exist.
File '/home/src/workspaces/project/node_modules/pkg0/import.jsx' does not exist.
Failed to resolve under condition 'import'.
Saw non-matching condition 'require'.
Exiting conditional exports.
Directory '/home/src/workspaces/node_modules' does not exist, skipping all lookups in it.
Directory '/home/src/node_modules' does not exist, skipping all lookups in it.
Directory '/home/node_modules' does not exist, skipping all lookups in it.
Directory '/node_modules' does not exist, skipping all lookups in it.
Resolution of non-relative name failed; trying with '--moduleResolution bundler' to see if project may need configuration update.
File '/home/src/workspaces/project/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspaces/package.json' does not exist according to earlier cached lookups.
File '/home/src/package.json' does not exist according to earlier cached lookups.
File '/home/package.json' does not exist according to earlier cached lookups.
File '/package.json' does not exist according to earlier cached lookups.
Loading module 'pkg0' from 'node_modules' folder, target file types: TypeScript, Declaration.
Searching all ancestor node_modules directories for preferred extensions: TypeScript, Declaration.
File '/home/src/workspaces/project/node_modules/pkg0/package.json' exists according to earlier cached lookups.
Entering conditional exports.
Matched 'exports' condition 'import'.
Using 'exports' subpath '.' with target './import.js'.
File name '/home/src/workspaces/project/node_modules/pkg0/import.js' has a '.js' extension - stripping it.
File '/home/src/workspaces/project/node_modules/pkg0/import.ts' does not exist.
File '/home/src/workspaces/project/node_modules/pkg0/import.tsx' does not exist.
File '/home/src/workspaces/project/node_modules/pkg0/import.d.ts' does not exist.
Failed to resolve under condition 'import'.
Saw non-matching condition 'require'.
Exiting conditional exports.
File '/home/src/workspaces/project/node_modules/@types/pkg0.d.ts' does not exist.
Directory '/home/src/workspaces/node_modules' does not exist, skipping all lookups in it.
Directory '/home/src/node_modules' does not exist, skipping all lookups in it.
Directory '/home/node_modules' does not exist, skipping all lookups in it.
Directory '/node_modules' does not exist, skipping all lookups in it.
======== Module name 'pkg0' was not resolved. ========
Reusing resolution of type reference directive 'pkg2' from '/home/src/workspaces/project/randomFileForTypeRef.ts' of old program, it was successfully resolved to '/home/src/workspaces/project/node_modules/pkg2/import.d.ts' with Package ID 'pkg2/import.d.ts@0.0.1'.
File '/home/src/workspaces/project/node_modules/pkg2/package.json' exists according to earlier cached lookups.
Reusing resolution of type reference directive 'pkg4' from '/home/src/workspaces/project/__inferred type names__.ts' of old program, it was successfully resolved to '/home/src/workspaces/project/node_modules/@types/pkg4/index.d.ts'.
File '/home/src/workspaces/project/node_modules/@types/pkg4/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspaces/project/node_modules/@types/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspaces/project/node_modules/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspaces/project/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspaces/package.json' does not exist according to earlier cached lookups.
File '/home/src/package.json' does not exist according to earlier cached lookups.
File '/home/package.json' does not exist according to earlier cached lookups.
File '/package.json' does not exist according to earlier cached lookups.
[91merror[0m[90m TS2318: [0mCannot find global type 'ImportAttributes'.

[96mrandomFileForImport.ts[0m:[93m1[0m:[93m39[0m - [91merror[0m[90m TS2307: [0mCannot find module 'pkg0' or its corresponding type declarations.

[7m1[0m import type { ImportInterface0 } from "pkg0" assert { "resolution-mode": "import" };
[7m [0m [91m                                      ~~~~~~[0m

../../tslibs/TS/Lib/lib.d.ts
  Default library for target 'es5'
main.ts
  Matched by include pattern '*.ts' in 'tsconfig.json'
randomFileForImport.ts
  Matched by include pattern '*.ts' in 'tsconfig.json'
node_modules/pkg2/import.d.ts
  Type library referenced via 'pkg2' from file 'randomFileForTypeRef.ts' with packageId 'pkg2/import.d.ts@0.0.1'
randomFileForTypeRef.ts
  Matched by include pattern '*.ts' in 'tsconfig.json'
node_modules/@types/pkg4/index.d.ts
  Entry point for implicit type library 'pkg4'
[[90mHH:MM:SS AM[0m] Found 2 errors. Watching for file changes.



//// [/home/src/workspaces/project/randomFileForImport.js] file written with same contents

PolledWatches::
/home/src/workspaces/node_modules:
  {"pollingInterval":500}
/home/src/workspaces/node_modules/@types:
  {"pollingInterval":500}
/home/src/workspaces/package.json:
  {"pollingInterval":2000}
/home/src/workspaces/project/node_modules/@types/package.json:
  {"pollingInterval":2000}
/home/src/workspaces/project/node_modules/@types/pkg4/package.json:
  {"pollingInterval":2000}
/home/src/workspaces/project/node_modules/package.json:
  {"pollingInterval":2000}
/home/src/workspaces/project/package.json:
  {"pollingInterval":2000}

FsWatches::
/home/src/tslibs/TS/Lib/lib.d.ts:
  {}
/home/src/workspaces:
  {}
/home/src/workspaces/project:
  {}
/home/src/workspaces/project/main.ts:
  {}
/home/src/workspaces/project/node_modules/@types/pkg4/index.d.ts:
  {}
/home/src/workspaces/project/node_modules/pkg0/package.json:
  {}
/home/src/workspaces/project/node_modules/pkg2/import.d.ts:
  {}
/home/src/workspaces/project/node_modules/pkg2/package.json:
  {}
/home/src/workspaces/project/randomFileForImport.ts:
  {}
/home/src/workspaces/project/randomFileForTypeRef.ts:
  {}
/home/src/workspaces/project/tsconfig.json:
  {}

FsWatches *deleted*::
/home/src/workspaces/project/node_modules/pkg0/import.d.ts:
  {}

FsWatchesRecursive::
/home/src/workspaces/project/node_modules:
  {}
/home/src/workspaces/project/node_modules/@types:
  {}

Timeout callback:: count: 0
18: timerToInvalidateFailedLookupResolutions *deleted*


Program root files: [
  "/home/src/workspaces/project/main.ts",
  "/home/src/workspaces/project/randomFileForImport.ts",
  "/home/src/workspaces/project/randomFileForTypeRef.ts"
]
Program options: {
  "traceResolution": true,
  "watch": true,
  "project": "/home/src/workspaces/project/tsconfig.json",
  "explainFiles": true,
  "extendedDiagnostics": true,
  "configFilePath": "/home/src/workspaces/project/tsconfig.json"
}
Program structureReused: Not
Program files::
/home/src/tslibs/TS/Lib/lib.d.ts
/home/src/workspaces/project/main.ts
/home/src/workspaces/project/randomFileForImport.ts
/home/src/workspaces/project/node_modules/pkg2/import.d.ts
/home/src/workspaces/project/randomFileForTypeRef.ts
/home/src/workspaces/project/node_modules/@types/pkg4/index.d.ts

Semantic diagnostics in builder refreshed for::
/home/src/workspaces/project/randomFileForImport.ts

Shape signatures in builder refreshed for::
/home/src/workspaces/project/randomfileforimport.ts (computed .d.ts)

exitCode:: ExitStatus.undefined

Change:: delete resolved typeRef file

Input::
//// [/home/src/workspaces/project/node_modules/pkg2/import.d.ts] deleted

Output::
FileWatcher:: Triggered with /home/src/workspaces/project/node_modules/pkg2/import.d.ts 2:: WatchInfo: /home/src/workspaces/project/node_modules/pkg2/import.d.ts 250 undefined Source file
Scheduling update
Elapsed:: *ms FileWatcher:: Triggered with /home/src/workspaces/project/node_modules/pkg2/import.d.ts 2:: WatchInfo: /home/src/workspaces/project/node_modules/pkg2/import.d.ts 250 undefined Source file
DirectoryWatcher:: Triggered with /home/src/workspaces/project/node_modules/pkg2/import.d.ts :: WatchInfo: /home/src/workspaces/project/node_modules 1 undefined Failed Lookup Locations
Scheduling invalidateFailedLookup
Elapsed:: *ms DirectoryWatcher:: Triggered with /home/src/workspaces/project/node_modules/pkg2/import.d.ts :: WatchInfo: /home/src/workspaces/project/node_modules 1 undefined Failed Lookup Locations


Timeout callback:: count: 2
19: timerToUpdateProgram *new*
20: timerToInvalidateFailedLookupResolutions *new*

Before running Timeout callback:: count: 2
19: timerToUpdateProgram
20: timerToInvalidateFailedLookupResolutions

Host is moving to new time
After running Timeout callback:: count: 0
Output::
Synchronizing program
[[90mHH:MM:SS AM[0m] File change detected. Starting incremental compilation...

CreatingProgramWith::
  roots: ["/home/src/workspaces/project/main.ts","/home/src/workspaces/project/randomFileForImport.ts","/home/src/workspaces/project/randomFileForTypeRef.ts"]
  options: {"traceResolution":true,"watch":true,"project":"/home/src/workspaces/project/tsconfig.json","explainFiles":true,"extendedDiagnostics":true,"configFilePath":"/home/src/workspaces/project/tsconfig.json"}
Found 'package.json' at '/home/src/workspaces/project/node_modules/pkg2/package.json'.
FileWatcher:: Close:: WatchInfo: /home/src/workspaces/project/node_modules/pkg2/import.d.ts 250 undefined Source file
Reusing resolution of module 'pkg0' from '/home/src/workspaces/project/randomFileForImport.ts' of old program, it was not resolved.
======== Resolving type reference directive 'pkg2', containing file '/home/src/workspaces/project/randomFileForTypeRef.ts', root directory '/home/src/workspaces/project/node_modules/@types,/home/src/workspaces/node_modules/@types,/home/src/node_modules/@types,/home/node_modules/@types,/node_modules/@types'. ========
Resolving with primary search path '/home/src/workspaces/project/node_modules/@types, /home/src/workspaces/node_modules/@types, /home/src/node_modules/@types, /home/node_modules/@types, /node_modules/@types'.
Directory '/home/src/workspaces/node_modules/@types' does not exist, skipping all lookups in it.
Directory '/home/src/node_modules/@types' does not exist, skipping all lookups in it.
Directory '/home/node_modules/@types' does not exist, skipping all lookups in it.
Directory '/node_modules/@types' does not exist, skipping all lookups in it.
Looking up in 'node_modules' folder, initial location '/home/src/workspaces/project'.
Searching all ancestor node_modules directories for preferred extensions: Declaration.
File '/home/src/workspaces/project/node_modules/pkg2/package.json' exists according to earlier cached lookups.
Entering conditional exports.
Matched 'exports' condition 'import'.
Using 'exports' subpath '.' with target './import.js'.
File name '/home/src/workspaces/project/node_modules/pkg2/import.js' has a '.js' extension - stripping it.
File '/home/src/workspaces/project/node_modules/pkg2/import.d.ts' does not exist.
Failed to resolve under condition 'import'.
Saw non-matching condition 'require'.
Exiting conditional exports.
File '/home/src/workspaces/project/node_modules/@types/pkg2.d.ts' does not exist.
Directory '/home/src/workspaces/node_modules' does not exist, skipping all lookups in it.
Directory '/home/src/node_modules' does not exist, skipping all lookups in it.
Directory '/home/node_modules' does not exist, skipping all lookups in it.
Directory '/node_modules' does not exist, skipping all lookups in it.
======== Type reference directive 'pkg2' was not resolved. ========
Reusing resolution of type reference directive 'pkg4' from '/home/src/workspaces/project/__inferred type names__.ts' of old program, it was successfully resolved to '/home/src/workspaces/project/node_modules/@types/pkg4/index.d.ts'.
File '/home/src/workspaces/project/node_modules/@types/pkg4/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspaces/project/node_modules/@types/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspaces/project/node_modules/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspaces/project/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspaces/package.json' does not exist according to earlier cached lookups.
File '/home/src/package.json' does not exist according to earlier cached lookups.
File '/home/package.json' does not exist according to earlier cached lookups.
File '/package.json' does not exist according to earlier cached lookups.
[91merror[0m[90m TS2318: [0mCannot find global type 'ImportAttributes'.

[96mrandomFileForImport.ts[0m:[93m1[0m:[93m39[0m - [91merror[0m[90m TS2307: [0mCannot find module 'pkg0' or its corresponding type declarations.

[7m1[0m import type { ImportInterface0 } from "pkg0" assert { "resolution-mode": "import" };
[7m [0m [91m                                      ~~~~~~[0m

[96mrandomFileForTypeRef.ts[0m:[93m1[0m:[93m23[0m - [91merror[0m[90m TS2688: [0mCannot find type definition file for 'pkg2'.

[7m1[0m /// <reference types="pkg2" resolution-mode="import"/>
[7m [0m [91m                      ~~~~[0m

../../tslibs/TS/Lib/lib.d.ts
  Default library for target 'es5'
main.ts
  Matched by include pattern '*.ts' in 'tsconfig.json'
randomFileForImport.ts
  Matched by include pattern '*.ts' in 'tsconfig.json'
randomFileForTypeRef.ts
  Matched by include pattern '*.ts' in 'tsconfig.json'
node_modules/@types/pkg4/index.d.ts
  Entry point for implicit type library 'pkg4'
[[90mHH:MM:SS AM[0m] Found 3 errors. Watching for file changes.



//// [/home/src/workspaces/project/main.js] file written with same contents
//// [/home/src/workspaces/project/randomFileForImport.js] file written with same contents
//// [/home/src/workspaces/project/randomFileForTypeRef.js] file written with same contents

PolledWatches::
/home/src/workspaces/node_modules:
  {"pollingInterval":500}
/home/src/workspaces/node_modules/@types:
  {"pollingInterval":500}
/home/src/workspaces/package.json:
  {"pollingInterval":2000}
/home/src/workspaces/project/node_modules/@types/package.json:
  {"pollingInterval":2000}
/home/src/workspaces/project/node_modules/@types/pkg4/package.json:
  {"pollingInterval":2000}
/home/src/workspaces/project/node_modules/package.json:
  {"pollingInterval":2000}
/home/src/workspaces/project/package.json:
  {"pollingInterval":2000}

FsWatches::
/home/src/tslibs/TS/Lib/lib.d.ts:
  {}
/home/src/workspaces:
  {}
/home/src/workspaces/project:
  {}
/home/src/workspaces/project/main.ts:
  {}
/home/src/workspaces/project/node_modules/@types/pkg4/index.d.ts:
  {}
/home/src/workspaces/project/node_modules/pkg0/package.json:
  {}
/home/src/workspaces/project/node_modules/pkg2/package.json:
  {}
/home/src/workspaces/project/randomFileForImport.ts:
  {}
/home/src/workspaces/project/randomFileForTypeRef.ts:
  {}
/home/src/workspaces/project/tsconfig.json:
  {}

FsWatches *deleted*::
/home/src/workspaces/project/node_modules/pkg2/import.d.ts:
  {}

FsWatchesRecursive::
/home/src/workspaces/project/node_modules:
  {}
/home/src/workspaces/project/node_modules/@types:
  {}

Timeout callback:: count: 0
20: timerToInvalidateFailedLookupResolutions *deleted*


Program root files: [
  "/home/src/workspaces/project/main.ts",
  "/home/src/workspaces/project/randomFileForImport.ts",
  "/home/src/workspaces/project/randomFileForTypeRef.ts"
]
Program options: {
  "traceResolution": true,
  "watch": true,
  "project": "/home/src/workspaces/project/tsconfig.json",
  "explainFiles": true,
  "extendedDiagnostics": true,
  "configFilePath": "/home/src/workspaces/project/tsconfig.json"
}
Program structureReused: Not
Program files::
/home/src/tslibs/TS/Lib/lib.d.ts
/home/src/workspaces/project/main.ts
/home/src/workspaces/project/randomFileForImport.ts
/home/src/workspaces/project/randomFileForTypeRef.ts
/home/src/workspaces/project/node_modules/@types/pkg4/index.d.ts

Semantic diagnostics in builder refreshed for::
/home/src/workspaces/project/main.ts
/home/src/workspaces/project/randomFileForImport.ts
/home/src/workspaces/project/randomFileForTypeRef.ts
/home/src/workspaces/project/node_modules/@types/pkg4/index.d.ts

Shape signatures in builder refreshed for::
/home/src/workspaces/project/randomfilefortyperef.ts (computed .d.ts)
/home/src/workspaces/project/main.ts (computed .d.ts)
/home/src/workspaces/project/randomfileforimport.ts (computed .d.ts)
/home/src/workspaces/project/node_modules/@types/pkg4/index.d.ts (used version)

exitCode:: ExitStatus.undefined
