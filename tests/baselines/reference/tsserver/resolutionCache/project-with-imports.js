Info seq  [hh:mm:ss:mss] currentDirectory:: /home/src/Vscode/Projects/bin useCaseSensitiveFileNames:: false
Info seq  [hh:mm:ss:mss] libs Location:: /home/src/tslibs/TS/Lib
Info seq  [hh:mm:ss:mss] globalTypingsCacheLocation:: /home/src/Library/Caches/typescript
Info seq  [hh:mm:ss:mss] Provided types map file "/home/src/tslibs/TS/Lib/typesMap.json" doesn't exist
Before request
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


Info seq  [hh:mm:ss:mss] request:
    {
      "command": "open",
      "arguments": {
        "file": "/home/src/workspaces/project/main.ts"
      },
      "seq": 1,
      "type": "request"
    }
Info seq  [hh:mm:ss:mss] getConfigFileNameForFile:: File: /home/src/workspaces/project/main.ts ProjectRootPath: undefined:: Result: /home/src/workspaces/project/tsconfig.json
Info seq  [hh:mm:ss:mss] Creating ConfiguredProject: /home/src/workspaces/project/tsconfig.json, currentDirectory: /home/src/workspaces/project
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/workspaces/project/tsconfig.json 2000 undefined Project: /home/src/workspaces/project/tsconfig.json WatchType: Config file
Info seq  [hh:mm:ss:mss] Config: /home/src/workspaces/project/tsconfig.json : {
 "rootNames": [
  "/home/src/workspaces/project/fileWithImports.ts",
  "/home/src/workspaces/project/fileWithTypeRefs.ts",
  "/home/src/workspaces/project/main.ts",
  "/home/src/workspaces/project/randomFileForImport.ts",
  "/home/src/workspaces/project/randomFileForTypeRef.ts"
 ],
 "options": {
  "traceResolution": true,
  "configFilePath": "/home/src/workspaces/project/tsconfig.json"
 }
}
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "projectLoadingStart",
      "body": {
        "projectName": "/home/src/workspaces/project/tsconfig.json",
        "reason": "Creating possible configured project for /home/src/workspaces/project/main.ts to open"
      }
    }
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /home/src/workspaces/project 0 undefined Config: /home/src/workspaces/project/tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /home/src/workspaces/project 0 undefined Config: /home/src/workspaces/project/tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/workspaces/project/fileWithImports.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/workspaces/project/fileWithTypeRefs.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/workspaces/project/randomFileForImport.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/workspaces/project/randomFileForTypeRef.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: /home/src/workspaces/project/tsconfig.json
Info seq  [hh:mm:ss:mss] ======== Resolving module 'pkg0' from '/home/src/workspaces/project/fileWithImports.ts'. ========
Info seq  [hh:mm:ss:mss] Module resolution kind is not specified, using 'Node10'.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/package.json' does not exist.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/package.json' does not exist.
Info seq  [hh:mm:ss:mss] File '/home/src/package.json' does not exist.
Info seq  [hh:mm:ss:mss] File '/home/package.json' does not exist.
Info seq  [hh:mm:ss:mss] File '/package.json' does not exist.
Info seq  [hh:mm:ss:mss] Loading module 'pkg0' from 'node_modules' folder, target file types: TypeScript, Declaration.
Info seq  [hh:mm:ss:mss] Searching all ancestor node_modules directories for preferred extensions: TypeScript, Declaration.
Info seq  [hh:mm:ss:mss] Found 'package.json' at '/home/src/workspaces/project/node_modules/pkg0/package.json'.
Info seq  [hh:mm:ss:mss] Entering conditional exports.
Info seq  [hh:mm:ss:mss] Matched 'exports' condition 'import'.
Info seq  [hh:mm:ss:mss] Using 'exports' subpath '.' with target './import.js'.
Info seq  [hh:mm:ss:mss] File name '/home/src/workspaces/project/node_modules/pkg0/import.js' has a '.js' extension - stripping it.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/node_modules/pkg0/import.ts' does not exist.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/node_modules/pkg0/import.tsx' does not exist.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/node_modules/pkg0/import.d.ts' exists - use it as a name resolution result.
Info seq  [hh:mm:ss:mss] 'package.json' does not have a 'peerDependencies' field.
Info seq  [hh:mm:ss:mss] Resolved under condition 'import'.
Info seq  [hh:mm:ss:mss] Exiting conditional exports.
Info seq  [hh:mm:ss:mss] Resolving real path for '/home/src/workspaces/project/node_modules/pkg0/import.d.ts', result '/home/src/workspaces/project/node_modules/pkg0/import.d.ts'.
Info seq  [hh:mm:ss:mss] ======== Module name 'pkg0' was successfully resolved to '/home/src/workspaces/project/node_modules/pkg0/import.d.ts' with Package ID 'pkg0/import.d.ts@0.0.1'. ========
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /home/src/workspaces/project 0 undefined Project: /home/src/workspaces/project/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /home/src/workspaces/project 0 undefined Project: /home/src/workspaces/project/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /home/src/workspaces 0 undefined Project: /home/src/workspaces/project/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /home/src/workspaces 0 undefined Project: /home/src/workspaces/project/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /home/src/workspaces/project/node_modules 1 undefined Project: /home/src/workspaces/project/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /home/src/workspaces/project/node_modules 1 undefined Project: /home/src/workspaces/project/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/workspaces/project/node_modules/pkg0/package.json 2000 undefined Project: /home/src/workspaces/project/tsconfig.json WatchType: File location affecting resolution
Info seq  [hh:mm:ss:mss] ======== Resolving module 'pkg1' from '/home/src/workspaces/project/fileWithImports.ts'. ========
Info seq  [hh:mm:ss:mss] Module resolution kind is not specified, using 'Node10'.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] Loading module 'pkg1' from 'node_modules' folder, target file types: TypeScript, Declaration.
Info seq  [hh:mm:ss:mss] Searching all ancestor node_modules directories for preferred extensions: TypeScript, Declaration.
Info seq  [hh:mm:ss:mss] Found 'package.json' at '/home/src/workspaces/project/node_modules/pkg1/package.json'.
Info seq  [hh:mm:ss:mss] Entering conditional exports.
Info seq  [hh:mm:ss:mss] Saw non-matching condition 'import'.
Info seq  [hh:mm:ss:mss] Matched 'exports' condition 'require'.
Info seq  [hh:mm:ss:mss] Using 'exports' subpath '.' with target './require.js'.
Info seq  [hh:mm:ss:mss] File name '/home/src/workspaces/project/node_modules/pkg1/require.js' has a '.js' extension - stripping it.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/node_modules/pkg1/require.ts' does not exist.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/node_modules/pkg1/require.tsx' does not exist.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/node_modules/pkg1/require.d.ts' does not exist.
Info seq  [hh:mm:ss:mss] Failed to resolve under condition 'require'.
Info seq  [hh:mm:ss:mss] Exiting conditional exports.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/node_modules/@types/pkg1.d.ts' does not exist.
Info seq  [hh:mm:ss:mss] Directory '/home/src/workspaces/node_modules' does not exist, skipping all lookups in it.
Info seq  [hh:mm:ss:mss] Directory '/home/src/node_modules' does not exist, skipping all lookups in it.
Info seq  [hh:mm:ss:mss] Directory '/home/node_modules' does not exist, skipping all lookups in it.
Info seq  [hh:mm:ss:mss] Directory '/node_modules' does not exist, skipping all lookups in it.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] Loading module 'pkg1' from 'node_modules' folder, target file types: JavaScript.
Info seq  [hh:mm:ss:mss] Searching all ancestor node_modules directories for fallback extensions: JavaScript.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/node_modules/pkg1/package.json' exists according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] Entering conditional exports.
Info seq  [hh:mm:ss:mss] Saw non-matching condition 'import'.
Info seq  [hh:mm:ss:mss] Matched 'exports' condition 'require'.
Info seq  [hh:mm:ss:mss] Using 'exports' subpath '.' with target './require.js'.
Info seq  [hh:mm:ss:mss] File name '/home/src/workspaces/project/node_modules/pkg1/require.js' has a '.js' extension - stripping it.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/node_modules/pkg1/require.js' does not exist.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/node_modules/pkg1/require.jsx' does not exist.
Info seq  [hh:mm:ss:mss] Failed to resolve under condition 'require'.
Info seq  [hh:mm:ss:mss] Exiting conditional exports.
Info seq  [hh:mm:ss:mss] Directory '/home/src/workspaces/node_modules' does not exist, skipping all lookups in it.
Info seq  [hh:mm:ss:mss] Directory '/home/src/node_modules' does not exist, skipping all lookups in it.
Info seq  [hh:mm:ss:mss] Directory '/home/node_modules' does not exist, skipping all lookups in it.
Info seq  [hh:mm:ss:mss] Directory '/node_modules' does not exist, skipping all lookups in it.
Info seq  [hh:mm:ss:mss] Resolution of non-relative name failed; trying with '--moduleResolution bundler' to see if project may need configuration update.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] Loading module 'pkg1' from 'node_modules' folder, target file types: TypeScript, Declaration.
Info seq  [hh:mm:ss:mss] Searching all ancestor node_modules directories for preferred extensions: TypeScript, Declaration.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/node_modules/pkg1/package.json' exists according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] Entering conditional exports.
Info seq  [hh:mm:ss:mss] Matched 'exports' condition 'import'.
Info seq  [hh:mm:ss:mss] Using 'exports' subpath '.' with target './import.js'.
Info seq  [hh:mm:ss:mss] File name '/home/src/workspaces/project/node_modules/pkg1/import.js' has a '.js' extension - stripping it.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/node_modules/pkg1/import.ts' does not exist.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/node_modules/pkg1/import.tsx' does not exist.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/node_modules/pkg1/import.d.ts' exists - use it as a name resolution result.
Info seq  [hh:mm:ss:mss] 'package.json' does not have a 'peerDependencies' field.
Info seq  [hh:mm:ss:mss] Resolved under condition 'import'.
Info seq  [hh:mm:ss:mss] Exiting conditional exports.
Info seq  [hh:mm:ss:mss] ======== Module name 'pkg1' was not resolved. ========
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /home/src/workspaces/node_modules 1 undefined Project: /home/src/workspaces/project/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /home/src/workspaces/node_modules 1 undefined Project: /home/src/workspaces/project/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/workspaces/project/node_modules/pkg1/package.json 2000 undefined Project: /home/src/workspaces/project/tsconfig.json WatchType: File location affecting resolution
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/node_modules/pkg0/package.json' exists according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /home/src/workspaces/project/node_modules 1 undefined WatchType: node_modules for closed script infos and package.jsons affecting module specifier cache
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /home/src/workspaces/project/node_modules 1 undefined WatchType: node_modules for closed script infos and package.jsons affecting module specifier cache
Info seq  [hh:mm:ss:mss] ======== Resolving type reference directive 'pkg2', containing file '/home/src/workspaces/project/fileWithTypeRefs.ts', root directory '/home/src/workspaces/project/node_modules/@types,/home/src/workspaces/node_modules/@types,/home/src/node_modules/@types,/home/node_modules/@types,/node_modules/@types'. ========
Info seq  [hh:mm:ss:mss] Resolving with primary search path '/home/src/workspaces/project/node_modules/@types, /home/src/workspaces/node_modules/@types, /home/src/node_modules/@types, /home/node_modules/@types, /node_modules/@types'.
Info seq  [hh:mm:ss:mss] Directory '/home/src/workspaces/node_modules/@types' does not exist, skipping all lookups in it.
Info seq  [hh:mm:ss:mss] Directory '/home/src/node_modules/@types' does not exist, skipping all lookups in it.
Info seq  [hh:mm:ss:mss] Directory '/home/node_modules/@types' does not exist, skipping all lookups in it.
Info seq  [hh:mm:ss:mss] Directory '/node_modules/@types' does not exist, skipping all lookups in it.
Info seq  [hh:mm:ss:mss] Looking up in 'node_modules' folder, initial location '/home/src/workspaces/project'.
Info seq  [hh:mm:ss:mss] Searching all ancestor node_modules directories for preferred extensions: Declaration.
Info seq  [hh:mm:ss:mss] Found 'package.json' at '/home/src/workspaces/project/node_modules/pkg2/package.json'.
Info seq  [hh:mm:ss:mss] Entering conditional exports.
Info seq  [hh:mm:ss:mss] Matched 'exports' condition 'import'.
Info seq  [hh:mm:ss:mss] Using 'exports' subpath '.' with target './import.js'.
Info seq  [hh:mm:ss:mss] File name '/home/src/workspaces/project/node_modules/pkg2/import.js' has a '.js' extension - stripping it.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/node_modules/pkg2/import.d.ts' exists - use it as a name resolution result.
Info seq  [hh:mm:ss:mss] 'package.json' does not have a 'peerDependencies' field.
Info seq  [hh:mm:ss:mss] Resolved under condition 'import'.
Info seq  [hh:mm:ss:mss] Exiting conditional exports.
Info seq  [hh:mm:ss:mss] Resolving real path for '/home/src/workspaces/project/node_modules/pkg2/import.d.ts', result '/home/src/workspaces/project/node_modules/pkg2/import.d.ts'.
Info seq  [hh:mm:ss:mss] ======== Type reference directive 'pkg2' was successfully resolved to '/home/src/workspaces/project/node_modules/pkg2/import.d.ts' with Package ID 'pkg2/import.d.ts@0.0.1', primary: false. ========
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/workspaces/project/node_modules/pkg2/package.json 2000 undefined Project: /home/src/workspaces/project/tsconfig.json WatchType: File location affecting resolution
Info seq  [hh:mm:ss:mss] ======== Resolving type reference directive 'pkg3', containing file '/home/src/workspaces/project/fileWithTypeRefs.ts', root directory '/home/src/workspaces/project/node_modules/@types,/home/src/workspaces/node_modules/@types,/home/src/node_modules/@types,/home/node_modules/@types,/node_modules/@types'. ========
Info seq  [hh:mm:ss:mss] Resolving with primary search path '/home/src/workspaces/project/node_modules/@types, /home/src/workspaces/node_modules/@types, /home/src/node_modules/@types, /home/node_modules/@types, /node_modules/@types'.
Info seq  [hh:mm:ss:mss] Directory '/home/src/workspaces/node_modules/@types' does not exist, skipping all lookups in it.
Info seq  [hh:mm:ss:mss] Directory '/home/src/node_modules/@types' does not exist, skipping all lookups in it.
Info seq  [hh:mm:ss:mss] Directory '/home/node_modules/@types' does not exist, skipping all lookups in it.
Info seq  [hh:mm:ss:mss] Directory '/node_modules/@types' does not exist, skipping all lookups in it.
Info seq  [hh:mm:ss:mss] Looking up in 'node_modules' folder, initial location '/home/src/workspaces/project'.
Info seq  [hh:mm:ss:mss] Searching all ancestor node_modules directories for preferred extensions: Declaration.
Info seq  [hh:mm:ss:mss] Found 'package.json' at '/home/src/workspaces/project/node_modules/pkg3/package.json'.
Info seq  [hh:mm:ss:mss] Entering conditional exports.
Info seq  [hh:mm:ss:mss] Saw non-matching condition 'import'.
Info seq  [hh:mm:ss:mss] Matched 'exports' condition 'require'.
Info seq  [hh:mm:ss:mss] Using 'exports' subpath '.' with target './require.js'.
Info seq  [hh:mm:ss:mss] File name '/home/src/workspaces/project/node_modules/pkg3/require.js' has a '.js' extension - stripping it.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/node_modules/pkg3/require.d.ts' does not exist.
Info seq  [hh:mm:ss:mss] Failed to resolve under condition 'require'.
Info seq  [hh:mm:ss:mss] Exiting conditional exports.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/node_modules/@types/pkg3.d.ts' does not exist.
Info seq  [hh:mm:ss:mss] Directory '/home/src/workspaces/node_modules' does not exist, skipping all lookups in it.
Info seq  [hh:mm:ss:mss] Directory '/home/src/node_modules' does not exist, skipping all lookups in it.
Info seq  [hh:mm:ss:mss] Directory '/home/node_modules' does not exist, skipping all lookups in it.
Info seq  [hh:mm:ss:mss] Directory '/node_modules' does not exist, skipping all lookups in it.
Info seq  [hh:mm:ss:mss] ======== Type reference directive 'pkg3' was not resolved. ========
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/workspaces/project/node_modules/pkg3/package.json 2000 undefined Project: /home/src/workspaces/project/tsconfig.json WatchType: File location affecting resolution
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/node_modules/pkg2/package.json' exists according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] ======== Resolving type reference directive 'pkg4', containing file '/home/src/workspaces/project/__inferred type names__.ts', root directory '/home/src/workspaces/project/node_modules/@types,/home/src/workspaces/node_modules/@types,/home/src/node_modules/@types,/home/node_modules/@types,/node_modules/@types'. ========
Info seq  [hh:mm:ss:mss] Resolving with primary search path '/home/src/workspaces/project/node_modules/@types, /home/src/workspaces/node_modules/@types, /home/src/node_modules/@types, /home/node_modules/@types, /node_modules/@types'.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/node_modules/@types/pkg4/package.json' does not exist.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/node_modules/@types/pkg4/index.d.ts' exists - use it as a name resolution result.
Info seq  [hh:mm:ss:mss] Resolving real path for '/home/src/workspaces/project/node_modules/@types/pkg4/index.d.ts', result '/home/src/workspaces/project/node_modules/@types/pkg4/index.d.ts'.
Info seq  [hh:mm:ss:mss] ======== Type reference directive 'pkg4' was successfully resolved to '/home/src/workspaces/project/node_modules/@types/pkg4/index.d.ts', primary: true. ========
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/node_modules/@types/pkg4/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/node_modules/@types/package.json' does not exist.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/node_modules/package.json' does not exist.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/tslibs/TS/Lib/lib.d.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/workspaces/project/node_modules/@types/pkg4/package.json 2000 undefined Project: /home/src/workspaces/project/tsconfig.json WatchType: File location affecting resolution
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/workspaces/project/node_modules/@types/package.json 2000 undefined Project: /home/src/workspaces/project/tsconfig.json WatchType: File location affecting resolution
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/workspaces/project/node_modules/package.json 2000 undefined Project: /home/src/workspaces/project/tsconfig.json WatchType: File location affecting resolution
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/workspaces/project/package.json 2000 undefined Project: /home/src/workspaces/project/tsconfig.json WatchType: File location affecting resolution
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/workspaces/package.json 2000 undefined Project: /home/src/workspaces/project/tsconfig.json WatchType: File location affecting resolution
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /home/src/workspaces/project/node_modules/@types 1 undefined Project: /home/src/workspaces/project/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /home/src/workspaces/project/node_modules/@types 1 undefined Project: /home/src/workspaces/project/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /home/src/workspaces/node_modules/@types 1 undefined Project: /home/src/workspaces/project/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /home/src/workspaces/node_modules/@types 1 undefined Project: /home/src/workspaces/project/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: /home/src/workspaces/project/tsconfig.json projectStateVersion: 1 projectProgramVersion: 0 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Project '/home/src/workspaces/project/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (9)
	/home/src/tslibs/TS/Lib/lib.d.ts Text-1 "/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };"
	/home/src/workspaces/project/node_modules/pkg0/import.d.ts Text-1 "export interface ImportInterface0 {}"
	/home/src/workspaces/project/fileWithImports.ts Text-1 "import type { ImportInterface0 } from \"pkg0\" assert { \"resolution-mode\": \"import\" };\nimport type { RequireInterface1 } from \"pkg1\" assert { \"resolution-mode\": \"require\" };\n"
	/home/src/workspaces/project/node_modules/pkg2/import.d.ts Text-1 "export {};\ndeclare global {\n    interface ImportInterface2 {}\n}\n"
	/home/src/workspaces/project/fileWithTypeRefs.ts Text-1 "/// <reference types=\"pkg2\" resolution-mode=\"import\"/>\n/// <reference types=\"pkg3\" resolution-mode=\"require\"/>\ninterface LocalInterface extends ImportInterface2, RequireInterface3 {}\nexport {}\n"
	/home/src/workspaces/project/main.ts SVC-1-0 "export const x = 10;"
	/home/src/workspaces/project/randomFileForImport.ts Text-1 "export const x = 10;"
	/home/src/workspaces/project/randomFileForTypeRef.ts Text-1 "export const x = 10;"
	/home/src/workspaces/project/node_modules/@types/pkg4/index.d.ts Text-1 "export const x = 10;"


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

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "projectLoadingFinish",
      "body": {
        "projectName": "/home/src/workspaces/project/tsconfig.json"
      }
    }
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "telemetry",
      "body": {
        "telemetryEventName": "projectInfo",
        "payload": {
          "projectId": "c508fd683797f5f4c77b8519182a36985021d6361b6a0aa9c8b69f7e25d6e876",
          "fileStats": {
            "js": 0,
            "jsSize": 0,
            "jsx": 0,
            "jsxSize": 0,
            "ts": 5,
            "tsSize": 425,
            "tsx": 0,
            "tsxSize": 0,
            "dts": 4,
            "dtsSize": 533,
            "deferred": 0,
            "deferredSize": 0
          },
          "compilerOptions": {
            "traceResolution": true
          },
          "typeAcquisition": {
            "enable": false,
            "include": false,
            "exclude": false
          },
          "extends": false,
          "files": false,
          "include": true,
          "exclude": true,
          "compileOnSave": false,
          "configFileName": "tsconfig.json",
          "projectType": "configured",
          "languageServiceEnabled": true,
          "version": "FakeVersion"
        }
      }
    }
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "configFileDiag",
      "body": {
        "triggerFile": "/home/src/workspaces/project/main.ts",
        "configFile": "/home/src/workspaces/project/tsconfig.json",
        "diagnostics": []
      }
    }
Info seq  [hh:mm:ss:mss] Project '/home/src/workspaces/project/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (9)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: /home/src/workspaces/project/main.ts ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /home/src/workspaces/project/tsconfig.json
Info seq  [hh:mm:ss:mss] response:
    {
      "seq": 0,
      "type": "response",
      "command": "open",
      "request_seq": 1,
      "success": true,
      "performanceData": {
        "updateGraphDurationMs": *
      }
    }
After request

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
/home/src/workspaces/project/node_modules/pkg0/package.json: *new*
  {}
/home/src/workspaces/project/node_modules/pkg1/package.json: *new*
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

Projects::
/home/src/workspaces/project/tsconfig.json (Configured) *new*
    projectStateVersion: 1
    projectProgramVersion: 1
    autoImportProviderHost: false

ScriptInfos::
/home/src/tslibs/TS/Lib/lib.d.ts *new*
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/fileWithImports.ts *new*
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/fileWithTypeRefs.ts *new*
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/main.ts (Open) *new*
    version: SVC-1-0
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json *default*
/home/src/workspaces/project/node_modules/@types/pkg4/index.d.ts *new*
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/node_modules/pkg0/import.d.ts *new*
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/node_modules/pkg2/import.d.ts *new*
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/randomFileForImport.ts *new*
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/randomFileForTypeRef.ts *new*
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json

modify randomFileForImport by adding import
Info seq  [hh:mm:ss:mss] FileWatcher:: Triggered with /home/src/workspaces/project/randomFileForImport.ts 1:: WatchInfo: /home/src/workspaces/project/randomFileForImport.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] Scheduled: /home/src/workspaces/project/tsconfig.json
Info seq  [hh:mm:ss:mss] Scheduled: *ensureProjectForOpenFiles*
Info seq  [hh:mm:ss:mss] Elapsed:: *ms FileWatcher:: Triggered with /home/src/workspaces/project/randomFileForImport.ts 1:: WatchInfo: /home/src/workspaces/project/randomFileForImport.ts 500 undefined WatchType: Closed Script info
Before running Timeout callback:: count: 2
1: /home/src/workspaces/project/tsconfig.json
2: *ensureProjectForOpenFiles*
//// [/home/src/workspaces/project/randomFileForImport.ts]
import type { ImportInterface0 } from "pkg0" assert { "resolution-mode": "import" };
export const x = 10;


Timeout callback:: count: 2
1: /home/src/workspaces/project/tsconfig.json *new*
2: *ensureProjectForOpenFiles* *new*

Projects::
/home/src/workspaces/project/tsconfig.json (Configured) *changed*
    projectStateVersion: 2 *changed*
    projectProgramVersion: 1
    dirty: true *changed*
    autoImportProviderHost: false

ScriptInfos::
/home/src/tslibs/TS/Lib/lib.d.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/fileWithImports.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/fileWithTypeRefs.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/main.ts (Open)
    version: SVC-1-0
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json *default*
/home/src/workspaces/project/node_modules/@types/pkg4/index.d.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/node_modules/pkg0/import.d.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/node_modules/pkg2/import.d.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/randomFileForImport.ts *changed*
    version: Text-1
    pendingReloadFromDisk: true *changed*
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/randomFileForTypeRef.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json

Info seq  [hh:mm:ss:mss] Running: /home/src/workspaces/project/tsconfig.json
Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: /home/src/workspaces/project/tsconfig.json
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/node_modules/pkg0/package.json' exists according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/node_modules/pkg2/package.json' exists according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/node_modules/@types/pkg4/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/node_modules/@types/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/node_modules/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] Reusing resolution of module 'pkg0' from '/home/src/workspaces/project/fileWithImports.ts' of old program, it was successfully resolved to '/home/src/workspaces/project/node_modules/pkg0/import.d.ts' with Package ID 'pkg0/import.d.ts@0.0.1'.
Info seq  [hh:mm:ss:mss] Reusing resolution of module 'pkg1' from '/home/src/workspaces/project/fileWithImports.ts' of old program, it was not resolved.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/node_modules/pkg0/package.json' exists according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] Reusing resolution of type reference directive 'pkg2' from '/home/src/workspaces/project/fileWithTypeRefs.ts' of old program, it was successfully resolved to '/home/src/workspaces/project/node_modules/pkg2/import.d.ts' with Package ID 'pkg2/import.d.ts@0.0.1'.
Info seq  [hh:mm:ss:mss] Reusing resolution of type reference directive 'pkg3' from '/home/src/workspaces/project/fileWithTypeRefs.ts' of old program, it was not resolved.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/node_modules/pkg2/package.json' exists according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] ======== Resolving module 'pkg0' from '/home/src/workspaces/project/randomFileForImport.ts'. ========
Info seq  [hh:mm:ss:mss] Resolution for module 'pkg0' was found in cache from location '/home/src/workspaces/project'.
Info seq  [hh:mm:ss:mss] ======== Module name 'pkg0' was successfully resolved to '/home/src/workspaces/project/node_modules/pkg0/import.d.ts' with Package ID 'pkg0/import.d.ts@0.0.1'. ========
Info seq  [hh:mm:ss:mss] Reusing resolution of type reference directive 'pkg4' from '/home/src/workspaces/project/__inferred type names__.ts' of old program, it was successfully resolved to '/home/src/workspaces/project/node_modules/@types/pkg4/index.d.ts'.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/node_modules/@types/pkg4/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/node_modules/@types/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/node_modules/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: /home/src/workspaces/project/tsconfig.json projectStateVersion: 2 projectProgramVersion: 1 structureChanged: true structureIsReused:: SafeModules Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Project '/home/src/workspaces/project/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (9)
	/home/src/tslibs/TS/Lib/lib.d.ts Text-1 "/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };"
	/home/src/workspaces/project/node_modules/pkg0/import.d.ts Text-1 "export interface ImportInterface0 {}"
	/home/src/workspaces/project/fileWithImports.ts Text-1 "import type { ImportInterface0 } from \"pkg0\" assert { \"resolution-mode\": \"import\" };\nimport type { RequireInterface1 } from \"pkg1\" assert { \"resolution-mode\": \"require\" };\n"
	/home/src/workspaces/project/node_modules/pkg2/import.d.ts Text-1 "export {};\ndeclare global {\n    interface ImportInterface2 {}\n}\n"
	/home/src/workspaces/project/fileWithTypeRefs.ts Text-1 "/// <reference types=\"pkg2\" resolution-mode=\"import\"/>\n/// <reference types=\"pkg3\" resolution-mode=\"require\"/>\ninterface LocalInterface extends ImportInterface2, RequireInterface3 {}\nexport {}\n"
	/home/src/workspaces/project/main.ts SVC-1-0 "export const x = 10;"
	/home/src/workspaces/project/randomFileForImport.ts Text-2 "import type { ImportInterface0 } from \"pkg0\" assert { \"resolution-mode\": \"import\" };\nexport const x = 10;"
	/home/src/workspaces/project/randomFileForTypeRef.ts Text-1 "export const x = 10;"
	/home/src/workspaces/project/node_modules/@types/pkg4/index.d.ts Text-1 "export const x = 10;"

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Running: *ensureProjectForOpenFiles*
Info seq  [hh:mm:ss:mss] Before ensureProjectForOpenFiles:
Info seq  [hh:mm:ss:mss] Project '/home/src/workspaces/project/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (9)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: /home/src/workspaces/project/main.ts ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /home/src/workspaces/project/tsconfig.json
Info seq  [hh:mm:ss:mss] After ensureProjectForOpenFiles:
Info seq  [hh:mm:ss:mss] Project '/home/src/workspaces/project/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (9)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: /home/src/workspaces/project/main.ts ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /home/src/workspaces/project/tsconfig.json
Info seq  [hh:mm:ss:mss] got projects updated in background /home/src/workspaces/project/main.ts
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "projectsUpdatedInBackground",
      "body": {
        "openFiles": [
          "/home/src/workspaces/project/main.ts"
        ]
      }
    }
After running Timeout callback:: count: 0

Projects::
/home/src/workspaces/project/tsconfig.json (Configured) *changed*
    projectStateVersion: 2
    projectProgramVersion: 2 *changed*
    dirty: false *changed*
    autoImportProviderHost: false

ScriptInfos::
/home/src/tslibs/TS/Lib/lib.d.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/fileWithImports.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/fileWithTypeRefs.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/main.ts (Open)
    version: SVC-1-0
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json *default*
/home/src/workspaces/project/node_modules/@types/pkg4/index.d.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/node_modules/pkg0/import.d.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/node_modules/pkg2/import.d.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/randomFileForImport.ts *changed*
    version: Text-2 *changed*
    pendingReloadFromDisk: false *changed*
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/randomFileForTypeRef.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json

modify randomFileForTypeRef by adding typeRef
Info seq  [hh:mm:ss:mss] FileWatcher:: Triggered with /home/src/workspaces/project/randomFileForTypeRef.ts 1:: WatchInfo: /home/src/workspaces/project/randomFileForTypeRef.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] Scheduled: /home/src/workspaces/project/tsconfig.json
Info seq  [hh:mm:ss:mss] Scheduled: *ensureProjectForOpenFiles*
Info seq  [hh:mm:ss:mss] Elapsed:: *ms FileWatcher:: Triggered with /home/src/workspaces/project/randomFileForTypeRef.ts 1:: WatchInfo: /home/src/workspaces/project/randomFileForTypeRef.ts 500 undefined WatchType: Closed Script info
Before running Timeout callback:: count: 2
3: /home/src/workspaces/project/tsconfig.json
4: *ensureProjectForOpenFiles*
//// [/home/src/workspaces/project/randomFileForTypeRef.ts]
/// <reference types="pkg2" resolution-mode="import"/>
export const x = 10;


Timeout callback:: count: 2
3: /home/src/workspaces/project/tsconfig.json *new*
4: *ensureProjectForOpenFiles* *new*

Projects::
/home/src/workspaces/project/tsconfig.json (Configured) *changed*
    projectStateVersion: 3 *changed*
    projectProgramVersion: 2
    dirty: true *changed*
    autoImportProviderHost: false

ScriptInfos::
/home/src/tslibs/TS/Lib/lib.d.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/fileWithImports.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/fileWithTypeRefs.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/main.ts (Open)
    version: SVC-1-0
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json *default*
/home/src/workspaces/project/node_modules/@types/pkg4/index.d.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/node_modules/pkg0/import.d.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/node_modules/pkg2/import.d.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/randomFileForImport.ts
    version: Text-2
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/randomFileForTypeRef.ts *changed*
    version: Text-1
    pendingReloadFromDisk: true *changed*
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json

Info seq  [hh:mm:ss:mss] Running: /home/src/workspaces/project/tsconfig.json
Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: /home/src/workspaces/project/tsconfig.json
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/node_modules/pkg0/package.json' exists according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/node_modules/pkg2/package.json' exists according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/node_modules/@types/pkg4/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/node_modules/@types/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/node_modules/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] Reusing resolution of module 'pkg0' from '/home/src/workspaces/project/fileWithImports.ts' of old program, it was successfully resolved to '/home/src/workspaces/project/node_modules/pkg0/import.d.ts' with Package ID 'pkg0/import.d.ts@0.0.1'.
Info seq  [hh:mm:ss:mss] Reusing resolution of module 'pkg1' from '/home/src/workspaces/project/fileWithImports.ts' of old program, it was not resolved.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/node_modules/pkg0/package.json' exists according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] Reusing resolution of type reference directive 'pkg2' from '/home/src/workspaces/project/fileWithTypeRefs.ts' of old program, it was successfully resolved to '/home/src/workspaces/project/node_modules/pkg2/import.d.ts' with Package ID 'pkg2/import.d.ts@0.0.1'.
Info seq  [hh:mm:ss:mss] Reusing resolution of type reference directive 'pkg3' from '/home/src/workspaces/project/fileWithTypeRefs.ts' of old program, it was not resolved.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/node_modules/pkg2/package.json' exists according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] Reusing resolution of module 'pkg0' from '/home/src/workspaces/project/randomFileForImport.ts' of old program, it was successfully resolved to '/home/src/workspaces/project/node_modules/pkg0/import.d.ts' with Package ID 'pkg0/import.d.ts@0.0.1'.
Info seq  [hh:mm:ss:mss] ======== Resolving type reference directive 'pkg2', containing file '/home/src/workspaces/project/randomFileForTypeRef.ts', root directory '/home/src/workspaces/project/node_modules/@types,/home/src/workspaces/node_modules/@types,/home/src/node_modules/@types,/home/node_modules/@types,/node_modules/@types'. ========
Info seq  [hh:mm:ss:mss] Resolving with primary search path '/home/src/workspaces/project/node_modules/@types, /home/src/workspaces/node_modules/@types, /home/src/node_modules/@types, /home/node_modules/@types, /node_modules/@types'.
Info seq  [hh:mm:ss:mss] Resolution for type reference directive 'pkg2' was found in cache from location '/home/src/workspaces/project'.
Info seq  [hh:mm:ss:mss] ======== Type reference directive 'pkg2' was successfully resolved to '/home/src/workspaces/project/node_modules/pkg2/import.d.ts' with Package ID 'pkg2/import.d.ts@0.0.1', primary: false. ========
Info seq  [hh:mm:ss:mss] Reusing resolution of type reference directive 'pkg4' from '/home/src/workspaces/project/__inferred type names__.ts' of old program, it was successfully resolved to '/home/src/workspaces/project/node_modules/@types/pkg4/index.d.ts'.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/node_modules/@types/pkg4/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/node_modules/@types/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/node_modules/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: /home/src/workspaces/project/tsconfig.json projectStateVersion: 3 projectProgramVersion: 2 structureChanged: true structureIsReused:: SafeModules Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Project '/home/src/workspaces/project/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (9)
	/home/src/tslibs/TS/Lib/lib.d.ts Text-1 "/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };"
	/home/src/workspaces/project/node_modules/pkg0/import.d.ts Text-1 "export interface ImportInterface0 {}"
	/home/src/workspaces/project/fileWithImports.ts Text-1 "import type { ImportInterface0 } from \"pkg0\" assert { \"resolution-mode\": \"import\" };\nimport type { RequireInterface1 } from \"pkg1\" assert { \"resolution-mode\": \"require\" };\n"
	/home/src/workspaces/project/node_modules/pkg2/import.d.ts Text-1 "export {};\ndeclare global {\n    interface ImportInterface2 {}\n}\n"
	/home/src/workspaces/project/fileWithTypeRefs.ts Text-1 "/// <reference types=\"pkg2\" resolution-mode=\"import\"/>\n/// <reference types=\"pkg3\" resolution-mode=\"require\"/>\ninterface LocalInterface extends ImportInterface2, RequireInterface3 {}\nexport {}\n"
	/home/src/workspaces/project/main.ts SVC-1-0 "export const x = 10;"
	/home/src/workspaces/project/randomFileForImport.ts Text-2 "import type { ImportInterface0 } from \"pkg0\" assert { \"resolution-mode\": \"import\" };\nexport const x = 10;"
	/home/src/workspaces/project/randomFileForTypeRef.ts Text-2 "/// <reference types=\"pkg2\" resolution-mode=\"import\"/>\nexport const x = 10;"
	/home/src/workspaces/project/node_modules/@types/pkg4/index.d.ts Text-1 "export const x = 10;"

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Running: *ensureProjectForOpenFiles*
Info seq  [hh:mm:ss:mss] Before ensureProjectForOpenFiles:
Info seq  [hh:mm:ss:mss] Project '/home/src/workspaces/project/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (9)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: /home/src/workspaces/project/main.ts ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /home/src/workspaces/project/tsconfig.json
Info seq  [hh:mm:ss:mss] After ensureProjectForOpenFiles:
Info seq  [hh:mm:ss:mss] Project '/home/src/workspaces/project/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (9)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: /home/src/workspaces/project/main.ts ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /home/src/workspaces/project/tsconfig.json
Info seq  [hh:mm:ss:mss] got projects updated in background /home/src/workspaces/project/main.ts
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "projectsUpdatedInBackground",
      "body": {
        "openFiles": [
          "/home/src/workspaces/project/main.ts"
        ]
      }
    }
After running Timeout callback:: count: 0

Projects::
/home/src/workspaces/project/tsconfig.json (Configured) *changed*
    projectStateVersion: 3
    projectProgramVersion: 3 *changed*
    dirty: false *changed*
    autoImportProviderHost: false

ScriptInfos::
/home/src/tslibs/TS/Lib/lib.d.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/fileWithImports.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/fileWithTypeRefs.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/main.ts (Open)
    version: SVC-1-0
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json *default*
/home/src/workspaces/project/node_modules/@types/pkg4/index.d.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/node_modules/pkg0/import.d.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/node_modules/pkg2/import.d.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/randomFileForImport.ts
    version: Text-2
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/randomFileForTypeRef.ts *changed*
    version: Text-2 *changed*
    pendingReloadFromDisk: false *changed*
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json

write file not resolved by import
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Triggered with /home/src/workspaces/project/node_modules/pkg1/require.d.ts :: WatchInfo: /home/src/workspaces/project/node_modules 1 undefined Project: /home/src/workspaces/project/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Scheduled: /home/src/workspaces/project/tsconfig.jsonFailedLookupInvalidation
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Triggered with /home/src/workspaces/project/node_modules/pkg1/require.d.ts :: WatchInfo: /home/src/workspaces/project/node_modules 1 undefined Project: /home/src/workspaces/project/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Triggered with /home/src/workspaces/project/node_modules/pkg1/require.d.ts :: WatchInfo: /home/src/workspaces/project/node_modules 1 undefined WatchType: node_modules for closed script infos and package.jsons affecting module specifier cache
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Triggered with /home/src/workspaces/project/node_modules/pkg1/require.d.ts :: WatchInfo: /home/src/workspaces/project/node_modules 1 undefined WatchType: node_modules for closed script infos and package.jsons affecting module specifier cache
Before running Timeout callback:: count: 1
5: /home/src/workspaces/project/tsconfig.jsonFailedLookupInvalidation
//// [/home/src/workspaces/project/node_modules/pkg1/require.d.ts]
export interface RequireInterface1 {}


Timeout callback:: count: 1
5: /home/src/workspaces/project/tsconfig.jsonFailedLookupInvalidation *new*

Info seq  [hh:mm:ss:mss] Running: /home/src/workspaces/project/tsconfig.jsonFailedLookupInvalidation
Info seq  [hh:mm:ss:mss] Scheduled: /home/src/workspaces/project/tsconfig.json
Info seq  [hh:mm:ss:mss] Scheduled: *ensureProjectForOpenFiles*
After running Timeout callback:: count: 2

Timeout callback:: count: 2
6: /home/src/workspaces/project/tsconfig.json *new*
7: *ensureProjectForOpenFiles* *new*

Projects::
/home/src/workspaces/project/tsconfig.json (Configured) *changed*
    projectStateVersion: 4 *changed*
    projectProgramVersion: 3
    dirty: true *changed*
    autoImportProviderHost: false

Before running Timeout callback:: count: 2
6: /home/src/workspaces/project/tsconfig.json
7: *ensureProjectForOpenFiles*

Info seq  [hh:mm:ss:mss] Running: /home/src/workspaces/project/tsconfig.json
Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: /home/src/workspaces/project/tsconfig.json
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/node_modules/pkg0/package.json' exists according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/node_modules/pkg2/package.json' exists according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/node_modules/@types/pkg4/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/node_modules/@types/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/node_modules/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] Reusing resolution of module 'pkg0' from '/home/src/workspaces/project/fileWithImports.ts' of old program, it was successfully resolved to '/home/src/workspaces/project/node_modules/pkg0/import.d.ts' with Package ID 'pkg0/import.d.ts@0.0.1'.
Info seq  [hh:mm:ss:mss] ======== Resolving module 'pkg1' from '/home/src/workspaces/project/fileWithImports.ts'. ========
Info seq  [hh:mm:ss:mss] Module resolution kind is not specified, using 'Node10'.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] Loading module 'pkg1' from 'node_modules' folder, target file types: TypeScript, Declaration.
Info seq  [hh:mm:ss:mss] Searching all ancestor node_modules directories for preferred extensions: TypeScript, Declaration.
Info seq  [hh:mm:ss:mss] Found 'package.json' at '/home/src/workspaces/project/node_modules/pkg1/package.json'.
Info seq  [hh:mm:ss:mss] Entering conditional exports.
Info seq  [hh:mm:ss:mss] Saw non-matching condition 'import'.
Info seq  [hh:mm:ss:mss] Matched 'exports' condition 'require'.
Info seq  [hh:mm:ss:mss] Using 'exports' subpath '.' with target './require.js'.
Info seq  [hh:mm:ss:mss] File name '/home/src/workspaces/project/node_modules/pkg1/require.js' has a '.js' extension - stripping it.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/node_modules/pkg1/require.ts' does not exist.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/node_modules/pkg1/require.tsx' does not exist.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/node_modules/pkg1/require.d.ts' exists - use it as a name resolution result.
Info seq  [hh:mm:ss:mss] 'package.json' does not have a 'peerDependencies' field.
Info seq  [hh:mm:ss:mss] Resolved under condition 'require'.
Info seq  [hh:mm:ss:mss] Exiting conditional exports.
Info seq  [hh:mm:ss:mss] Resolving real path for '/home/src/workspaces/project/node_modules/pkg1/require.d.ts', result '/home/src/workspaces/project/node_modules/pkg1/require.d.ts'.
Info seq  [hh:mm:ss:mss] ======== Module name 'pkg1' was successfully resolved to '/home/src/workspaces/project/node_modules/pkg1/require.d.ts' with Package ID 'pkg1/require.d.ts@0.0.1'. ========
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/node_modules/pkg0/package.json' exists according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/node_modules/pkg1/package.json' exists according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] Reusing resolution of type reference directive 'pkg2' from '/home/src/workspaces/project/fileWithTypeRefs.ts' of old program, it was successfully resolved to '/home/src/workspaces/project/node_modules/pkg2/import.d.ts' with Package ID 'pkg2/import.d.ts@0.0.1'.
Info seq  [hh:mm:ss:mss] Reusing resolution of type reference directive 'pkg3' from '/home/src/workspaces/project/fileWithTypeRefs.ts' of old program, it was not resolved.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/node_modules/pkg2/package.json' exists according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] Reusing resolution of module 'pkg0' from '/home/src/workspaces/project/randomFileForImport.ts' of old program, it was successfully resolved to '/home/src/workspaces/project/node_modules/pkg0/import.d.ts' with Package ID 'pkg0/import.d.ts@0.0.1'.
Info seq  [hh:mm:ss:mss] Reusing resolution of type reference directive 'pkg2' from '/home/src/workspaces/project/randomFileForTypeRef.ts' of old program, it was successfully resolved to '/home/src/workspaces/project/node_modules/pkg2/import.d.ts' with Package ID 'pkg2/import.d.ts@0.0.1'.
Info seq  [hh:mm:ss:mss] Reusing resolution of type reference directive 'pkg4' from '/home/src/workspaces/project/__inferred type names__.ts' of old program, it was successfully resolved to '/home/src/workspaces/project/node_modules/@types/pkg4/index.d.ts'.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/node_modules/@types/pkg4/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/node_modules/@types/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/node_modules/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: /home/src/workspaces/project/tsconfig.json projectStateVersion: 4 projectProgramVersion: 3 structureChanged: true structureIsReused:: SafeModules Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Project '/home/src/workspaces/project/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (10)
	/home/src/tslibs/TS/Lib/lib.d.ts Text-1 "/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };"
	/home/src/workspaces/project/node_modules/pkg0/import.d.ts Text-1 "export interface ImportInterface0 {}"
	/home/src/workspaces/project/node_modules/pkg1/require.d.ts Text-1 "export interface RequireInterface1 {}"
	/home/src/workspaces/project/fileWithImports.ts Text-1 "import type { ImportInterface0 } from \"pkg0\" assert { \"resolution-mode\": \"import\" };\nimport type { RequireInterface1 } from \"pkg1\" assert { \"resolution-mode\": \"require\" };\n"
	/home/src/workspaces/project/node_modules/pkg2/import.d.ts Text-1 "export {};\ndeclare global {\n    interface ImportInterface2 {}\n}\n"
	/home/src/workspaces/project/fileWithTypeRefs.ts Text-1 "/// <reference types=\"pkg2\" resolution-mode=\"import\"/>\n/// <reference types=\"pkg3\" resolution-mode=\"require\"/>\ninterface LocalInterface extends ImportInterface2, RequireInterface3 {}\nexport {}\n"
	/home/src/workspaces/project/main.ts SVC-1-0 "export const x = 10;"
	/home/src/workspaces/project/randomFileForImport.ts Text-2 "import type { ImportInterface0 } from \"pkg0\" assert { \"resolution-mode\": \"import\" };\nexport const x = 10;"
	/home/src/workspaces/project/randomFileForTypeRef.ts Text-2 "/// <reference types=\"pkg2\" resolution-mode=\"import\"/>\nexport const x = 10;"
	/home/src/workspaces/project/node_modules/@types/pkg4/index.d.ts Text-1 "export const x = 10;"


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

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Running: *ensureProjectForOpenFiles*
Info seq  [hh:mm:ss:mss] Before ensureProjectForOpenFiles:
Info seq  [hh:mm:ss:mss] Project '/home/src/workspaces/project/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (10)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: /home/src/workspaces/project/main.ts ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /home/src/workspaces/project/tsconfig.json
Info seq  [hh:mm:ss:mss] After ensureProjectForOpenFiles:
Info seq  [hh:mm:ss:mss] Project '/home/src/workspaces/project/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (10)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: /home/src/workspaces/project/main.ts ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /home/src/workspaces/project/tsconfig.json
Info seq  [hh:mm:ss:mss] got projects updated in background /home/src/workspaces/project/main.ts
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "projectsUpdatedInBackground",
      "body": {
        "openFiles": [
          "/home/src/workspaces/project/main.ts"
        ]
      }
    }
After running Timeout callback:: count: 0

Projects::
/home/src/workspaces/project/tsconfig.json (Configured) *changed*
    projectStateVersion: 4
    projectProgramVersion: 4 *changed*
    dirty: false *changed*
    autoImportProviderHost: undefined *changed*

ScriptInfos::
/home/src/tslibs/TS/Lib/lib.d.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/fileWithImports.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/fileWithTypeRefs.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/main.ts (Open)
    version: SVC-1-0
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json *default*
/home/src/workspaces/project/node_modules/@types/pkg4/index.d.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/node_modules/pkg0/import.d.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/node_modules/pkg1/require.d.ts *new*
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/node_modules/pkg2/import.d.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/randomFileForImport.ts
    version: Text-2
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/randomFileForTypeRef.ts
    version: Text-2
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json

write file not resolved by typeRef
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Triggered with /home/src/workspaces/project/node_modules/pkg3/require.d.ts :: WatchInfo: /home/src/workspaces/project/node_modules 1 undefined Project: /home/src/workspaces/project/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Scheduled: /home/src/workspaces/project/tsconfig.jsonFailedLookupInvalidation
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Triggered with /home/src/workspaces/project/node_modules/pkg3/require.d.ts :: WatchInfo: /home/src/workspaces/project/node_modules 1 undefined Project: /home/src/workspaces/project/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Triggered with /home/src/workspaces/project/node_modules/pkg3/require.d.ts :: WatchInfo: /home/src/workspaces/project/node_modules 1 undefined WatchType: node_modules for closed script infos and package.jsons affecting module specifier cache
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Triggered with /home/src/workspaces/project/node_modules/pkg3/require.d.ts :: WatchInfo: /home/src/workspaces/project/node_modules 1 undefined WatchType: node_modules for closed script infos and package.jsons affecting module specifier cache
Before running Timeout callback:: count: 1
8: /home/src/workspaces/project/tsconfig.jsonFailedLookupInvalidation
//// [/home/src/workspaces/project/node_modules/pkg3/require.d.ts]
export {};
declare global {
    interface RequireInterface3 {}
}



Timeout callback:: count: 1
8: /home/src/workspaces/project/tsconfig.jsonFailedLookupInvalidation *new*

Info seq  [hh:mm:ss:mss] Running: /home/src/workspaces/project/tsconfig.jsonFailedLookupInvalidation
Info seq  [hh:mm:ss:mss] Scheduled: /home/src/workspaces/project/tsconfig.json
Info seq  [hh:mm:ss:mss] Scheduled: *ensureProjectForOpenFiles*
After running Timeout callback:: count: 2

Timeout callback:: count: 2
9: /home/src/workspaces/project/tsconfig.json *new*
10: *ensureProjectForOpenFiles* *new*

Projects::
/home/src/workspaces/project/tsconfig.json (Configured) *changed*
    projectStateVersion: 5 *changed*
    projectProgramVersion: 4
    dirty: true *changed*

Before running Timeout callback:: count: 2
9: /home/src/workspaces/project/tsconfig.json
10: *ensureProjectForOpenFiles*

Info seq  [hh:mm:ss:mss] Running: /home/src/workspaces/project/tsconfig.json
Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: /home/src/workspaces/project/tsconfig.json
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/node_modules/pkg0/package.json' exists according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/node_modules/pkg1/package.json' exists according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/node_modules/pkg2/package.json' exists according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/node_modules/@types/pkg4/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/node_modules/@types/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/node_modules/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] Reusing resolution of module 'pkg0' from '/home/src/workspaces/project/fileWithImports.ts' of old program, it was successfully resolved to '/home/src/workspaces/project/node_modules/pkg0/import.d.ts' with Package ID 'pkg0/import.d.ts@0.0.1'.
Info seq  [hh:mm:ss:mss] Reusing resolution of module 'pkg1' from '/home/src/workspaces/project/fileWithImports.ts' of old program, it was successfully resolved to '/home/src/workspaces/project/node_modules/pkg1/require.d.ts' with Package ID 'pkg1/require.d.ts@0.0.1'.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/node_modules/pkg0/package.json' exists according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/node_modules/pkg1/package.json' exists according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] Reusing resolution of type reference directive 'pkg2' from '/home/src/workspaces/project/fileWithTypeRefs.ts' of old program, it was successfully resolved to '/home/src/workspaces/project/node_modules/pkg2/import.d.ts' with Package ID 'pkg2/import.d.ts@0.0.1'.
Info seq  [hh:mm:ss:mss] ======== Resolving type reference directive 'pkg3', containing file '/home/src/workspaces/project/fileWithTypeRefs.ts', root directory '/home/src/workspaces/project/node_modules/@types,/home/src/workspaces/node_modules/@types,/home/src/node_modules/@types,/home/node_modules/@types,/node_modules/@types'. ========
Info seq  [hh:mm:ss:mss] Resolving with primary search path '/home/src/workspaces/project/node_modules/@types, /home/src/workspaces/node_modules/@types, /home/src/node_modules/@types, /home/node_modules/@types, /node_modules/@types'.
Info seq  [hh:mm:ss:mss] Directory '/home/src/workspaces/node_modules/@types' does not exist, skipping all lookups in it.
Info seq  [hh:mm:ss:mss] Directory '/home/src/node_modules/@types' does not exist, skipping all lookups in it.
Info seq  [hh:mm:ss:mss] Directory '/home/node_modules/@types' does not exist, skipping all lookups in it.
Info seq  [hh:mm:ss:mss] Directory '/node_modules/@types' does not exist, skipping all lookups in it.
Info seq  [hh:mm:ss:mss] Looking up in 'node_modules' folder, initial location '/home/src/workspaces/project'.
Info seq  [hh:mm:ss:mss] Searching all ancestor node_modules directories for preferred extensions: Declaration.
Info seq  [hh:mm:ss:mss] Found 'package.json' at '/home/src/workspaces/project/node_modules/pkg3/package.json'.
Info seq  [hh:mm:ss:mss] Entering conditional exports.
Info seq  [hh:mm:ss:mss] Saw non-matching condition 'import'.
Info seq  [hh:mm:ss:mss] Matched 'exports' condition 'require'.
Info seq  [hh:mm:ss:mss] Using 'exports' subpath '.' with target './require.js'.
Info seq  [hh:mm:ss:mss] File name '/home/src/workspaces/project/node_modules/pkg3/require.js' has a '.js' extension - stripping it.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/node_modules/pkg3/require.d.ts' exists - use it as a name resolution result.
Info seq  [hh:mm:ss:mss] 'package.json' does not have a 'peerDependencies' field.
Info seq  [hh:mm:ss:mss] Resolved under condition 'require'.
Info seq  [hh:mm:ss:mss] Exiting conditional exports.
Info seq  [hh:mm:ss:mss] Resolving real path for '/home/src/workspaces/project/node_modules/pkg3/require.d.ts', result '/home/src/workspaces/project/node_modules/pkg3/require.d.ts'.
Info seq  [hh:mm:ss:mss] ======== Type reference directive 'pkg3' was successfully resolved to '/home/src/workspaces/project/node_modules/pkg3/require.d.ts' with Package ID 'pkg3/require.d.ts@0.0.1', primary: false. ========
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/node_modules/pkg2/package.json' exists according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/node_modules/pkg3/package.json' exists according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] Reusing resolution of module 'pkg0' from '/home/src/workspaces/project/randomFileForImport.ts' of old program, it was successfully resolved to '/home/src/workspaces/project/node_modules/pkg0/import.d.ts' with Package ID 'pkg0/import.d.ts@0.0.1'.
Info seq  [hh:mm:ss:mss] Reusing resolution of type reference directive 'pkg2' from '/home/src/workspaces/project/randomFileForTypeRef.ts' of old program, it was successfully resolved to '/home/src/workspaces/project/node_modules/pkg2/import.d.ts' with Package ID 'pkg2/import.d.ts@0.0.1'.
Info seq  [hh:mm:ss:mss] Reusing resolution of type reference directive 'pkg4' from '/home/src/workspaces/project/__inferred type names__.ts' of old program, it was successfully resolved to '/home/src/workspaces/project/node_modules/@types/pkg4/index.d.ts'.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/node_modules/@types/pkg4/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/node_modules/@types/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/node_modules/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: /home/src/workspaces/project/tsconfig.json projectStateVersion: 5 projectProgramVersion: 4 structureChanged: true structureIsReused:: SafeModules Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Project '/home/src/workspaces/project/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (11)
	/home/src/tslibs/TS/Lib/lib.d.ts Text-1 "/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };"
	/home/src/workspaces/project/node_modules/pkg0/import.d.ts Text-1 "export interface ImportInterface0 {}"
	/home/src/workspaces/project/node_modules/pkg1/require.d.ts Text-1 "export interface RequireInterface1 {}"
	/home/src/workspaces/project/fileWithImports.ts Text-1 "import type { ImportInterface0 } from \"pkg0\" assert { \"resolution-mode\": \"import\" };\nimport type { RequireInterface1 } from \"pkg1\" assert { \"resolution-mode\": \"require\" };\n"
	/home/src/workspaces/project/node_modules/pkg2/import.d.ts Text-1 "export {};\ndeclare global {\n    interface ImportInterface2 {}\n}\n"
	/home/src/workspaces/project/node_modules/pkg3/require.d.ts Text-1 "export {};\ndeclare global {\n    interface RequireInterface3 {}\n}\n"
	/home/src/workspaces/project/fileWithTypeRefs.ts Text-1 "/// <reference types=\"pkg2\" resolution-mode=\"import\"/>\n/// <reference types=\"pkg3\" resolution-mode=\"require\"/>\ninterface LocalInterface extends ImportInterface2, RequireInterface3 {}\nexport {}\n"
	/home/src/workspaces/project/main.ts SVC-1-0 "export const x = 10;"
	/home/src/workspaces/project/randomFileForImport.ts Text-2 "import type { ImportInterface0 } from \"pkg0\" assert { \"resolution-mode\": \"import\" };\nexport const x = 10;"
	/home/src/workspaces/project/randomFileForTypeRef.ts Text-2 "/// <reference types=\"pkg2\" resolution-mode=\"import\"/>\nexport const x = 10;"
	/home/src/workspaces/project/node_modules/@types/pkg4/index.d.ts Text-1 "export const x = 10;"


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

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Running: *ensureProjectForOpenFiles*
Info seq  [hh:mm:ss:mss] Before ensureProjectForOpenFiles:
Info seq  [hh:mm:ss:mss] Project '/home/src/workspaces/project/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (11)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: /home/src/workspaces/project/main.ts ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /home/src/workspaces/project/tsconfig.json
Info seq  [hh:mm:ss:mss] After ensureProjectForOpenFiles:
Info seq  [hh:mm:ss:mss] Project '/home/src/workspaces/project/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (11)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: /home/src/workspaces/project/main.ts ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /home/src/workspaces/project/tsconfig.json
Info seq  [hh:mm:ss:mss] got projects updated in background /home/src/workspaces/project/main.ts
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "projectsUpdatedInBackground",
      "body": {
        "openFiles": [
          "/home/src/workspaces/project/main.ts"
        ]
      }
    }
After running Timeout callback:: count: 0

Projects::
/home/src/workspaces/project/tsconfig.json (Configured) *changed*
    projectStateVersion: 5
    projectProgramVersion: 5 *changed*
    dirty: false *changed*

ScriptInfos::
/home/src/tslibs/TS/Lib/lib.d.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/fileWithImports.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/fileWithTypeRefs.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/main.ts (Open)
    version: SVC-1-0
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json *default*
/home/src/workspaces/project/node_modules/@types/pkg4/index.d.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/node_modules/pkg0/import.d.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/node_modules/pkg1/require.d.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/node_modules/pkg2/import.d.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/node_modules/pkg3/require.d.ts *new*
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/randomFileForImport.ts
    version: Text-2
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/randomFileForTypeRef.ts
    version: Text-2
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json

modify package.json and that should re-resolve
Info seq  [hh:mm:ss:mss] FileWatcher:: Triggered with /home/src/workspaces/project/node_modules/pkg1/package.json 1:: WatchInfo: /home/src/workspaces/project/node_modules/pkg1/package.json 2000 undefined Project: /home/src/workspaces/project/tsconfig.json WatchType: File location affecting resolution
Info seq  [hh:mm:ss:mss] Scheduled: /home/src/workspaces/project/tsconfig.jsonFailedLookupInvalidation
Info seq  [hh:mm:ss:mss] Elapsed:: *ms FileWatcher:: Triggered with /home/src/workspaces/project/node_modules/pkg1/package.json 1:: WatchInfo: /home/src/workspaces/project/node_modules/pkg1/package.json 2000 undefined Project: /home/src/workspaces/project/tsconfig.json WatchType: File location affecting resolution
Before running Timeout callback:: count: 1
11: /home/src/workspaces/project/tsconfig.jsonFailedLookupInvalidation
//// [/home/src/workspaces/project/node_modules/pkg1/package.json]
{
  "name": "pkg1",
  "version": "0.0.1",
  "exports": {
    "import": "./import.js",
    "require": "./require1.js"
  }
}


Timeout callback:: count: 1
11: /home/src/workspaces/project/tsconfig.jsonFailedLookupInvalidation *new*

Info seq  [hh:mm:ss:mss] Running: /home/src/workspaces/project/tsconfig.jsonFailedLookupInvalidation
Info seq  [hh:mm:ss:mss] Scheduled: /home/src/workspaces/project/tsconfig.json
Info seq  [hh:mm:ss:mss] Scheduled: *ensureProjectForOpenFiles*
After running Timeout callback:: count: 2

Timeout callback:: count: 2
12: /home/src/workspaces/project/tsconfig.json *new*
13: *ensureProjectForOpenFiles* *new*

Projects::
/home/src/workspaces/project/tsconfig.json (Configured) *changed*
    projectStateVersion: 6 *changed*
    projectProgramVersion: 5
    dirty: true *changed*

Before running Timeout callback:: count: 2
12: /home/src/workspaces/project/tsconfig.json
13: *ensureProjectForOpenFiles*

Info seq  [hh:mm:ss:mss] Running: /home/src/workspaces/project/tsconfig.json
Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: /home/src/workspaces/project/tsconfig.json
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/node_modules/pkg0/package.json' exists according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] Found 'package.json' at '/home/src/workspaces/project/node_modules/pkg1/package.json'.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/node_modules/pkg2/package.json' exists according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/node_modules/pkg3/package.json' exists according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/node_modules/@types/pkg4/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/node_modules/@types/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/node_modules/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] Reusing resolution of module 'pkg0' from '/home/src/workspaces/project/fileWithImports.ts' of old program, it was successfully resolved to '/home/src/workspaces/project/node_modules/pkg0/import.d.ts' with Package ID 'pkg0/import.d.ts@0.0.1'.
Info seq  [hh:mm:ss:mss] ======== Resolving module 'pkg1' from '/home/src/workspaces/project/fileWithImports.ts'. ========
Info seq  [hh:mm:ss:mss] Module resolution kind is not specified, using 'Node10'.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] Loading module 'pkg1' from 'node_modules' folder, target file types: TypeScript, Declaration.
Info seq  [hh:mm:ss:mss] Searching all ancestor node_modules directories for preferred extensions: TypeScript, Declaration.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/node_modules/pkg1/package.json' exists according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] Entering conditional exports.
Info seq  [hh:mm:ss:mss] Saw non-matching condition 'import'.
Info seq  [hh:mm:ss:mss] Matched 'exports' condition 'require'.
Info seq  [hh:mm:ss:mss] Using 'exports' subpath '.' with target './require1.js'.
Info seq  [hh:mm:ss:mss] File name '/home/src/workspaces/project/node_modules/pkg1/require1.js' has a '.js' extension - stripping it.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/node_modules/pkg1/require1.ts' does not exist.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/node_modules/pkg1/require1.tsx' does not exist.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/node_modules/pkg1/require1.d.ts' does not exist.
Info seq  [hh:mm:ss:mss] Failed to resolve under condition 'require'.
Info seq  [hh:mm:ss:mss] Exiting conditional exports.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/node_modules/@types/pkg1.d.ts' does not exist.
Info seq  [hh:mm:ss:mss] Directory '/home/src/workspaces/node_modules' does not exist, skipping all lookups in it.
Info seq  [hh:mm:ss:mss] Directory '/home/src/node_modules' does not exist, skipping all lookups in it.
Info seq  [hh:mm:ss:mss] Directory '/home/node_modules' does not exist, skipping all lookups in it.
Info seq  [hh:mm:ss:mss] Directory '/node_modules' does not exist, skipping all lookups in it.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] Loading module 'pkg1' from 'node_modules' folder, target file types: JavaScript.
Info seq  [hh:mm:ss:mss] Searching all ancestor node_modules directories for fallback extensions: JavaScript.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/node_modules/pkg1/package.json' exists according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] Entering conditional exports.
Info seq  [hh:mm:ss:mss] Saw non-matching condition 'import'.
Info seq  [hh:mm:ss:mss] Matched 'exports' condition 'require'.
Info seq  [hh:mm:ss:mss] Using 'exports' subpath '.' with target './require1.js'.
Info seq  [hh:mm:ss:mss] File name '/home/src/workspaces/project/node_modules/pkg1/require1.js' has a '.js' extension - stripping it.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/node_modules/pkg1/require1.js' does not exist.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/node_modules/pkg1/require1.jsx' does not exist.
Info seq  [hh:mm:ss:mss] Failed to resolve under condition 'require'.
Info seq  [hh:mm:ss:mss] Exiting conditional exports.
Info seq  [hh:mm:ss:mss] Directory '/home/src/workspaces/node_modules' does not exist, skipping all lookups in it.
Info seq  [hh:mm:ss:mss] Directory '/home/src/node_modules' does not exist, skipping all lookups in it.
Info seq  [hh:mm:ss:mss] Directory '/home/node_modules' does not exist, skipping all lookups in it.
Info seq  [hh:mm:ss:mss] Directory '/node_modules' does not exist, skipping all lookups in it.
Info seq  [hh:mm:ss:mss] Resolution of non-relative name failed; trying with '--moduleResolution bundler' to see if project may need configuration update.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] Loading module 'pkg1' from 'node_modules' folder, target file types: TypeScript, Declaration.
Info seq  [hh:mm:ss:mss] Searching all ancestor node_modules directories for preferred extensions: TypeScript, Declaration.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/node_modules/pkg1/package.json' exists according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] Entering conditional exports.
Info seq  [hh:mm:ss:mss] Matched 'exports' condition 'import'.
Info seq  [hh:mm:ss:mss] Using 'exports' subpath '.' with target './import.js'.
Info seq  [hh:mm:ss:mss] File name '/home/src/workspaces/project/node_modules/pkg1/import.js' has a '.js' extension - stripping it.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/node_modules/pkg1/import.ts' does not exist.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/node_modules/pkg1/import.tsx' does not exist.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/node_modules/pkg1/import.d.ts' exists - use it as a name resolution result.
Info seq  [hh:mm:ss:mss] 'package.json' does not have a 'peerDependencies' field.
Info seq  [hh:mm:ss:mss] Resolved under condition 'import'.
Info seq  [hh:mm:ss:mss] Exiting conditional exports.
Info seq  [hh:mm:ss:mss] ======== Module name 'pkg1' was not resolved. ========
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/node_modules/pkg0/package.json' exists according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] Reusing resolution of type reference directive 'pkg2' from '/home/src/workspaces/project/fileWithTypeRefs.ts' of old program, it was successfully resolved to '/home/src/workspaces/project/node_modules/pkg2/import.d.ts' with Package ID 'pkg2/import.d.ts@0.0.1'.
Info seq  [hh:mm:ss:mss] Reusing resolution of type reference directive 'pkg3' from '/home/src/workspaces/project/fileWithTypeRefs.ts' of old program, it was successfully resolved to '/home/src/workspaces/project/node_modules/pkg3/require.d.ts' with Package ID 'pkg3/require.d.ts@0.0.1'.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/node_modules/pkg2/package.json' exists according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/node_modules/pkg3/package.json' exists according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] Reusing resolution of module 'pkg0' from '/home/src/workspaces/project/randomFileForImport.ts' of old program, it was successfully resolved to '/home/src/workspaces/project/node_modules/pkg0/import.d.ts' with Package ID 'pkg0/import.d.ts@0.0.1'.
Info seq  [hh:mm:ss:mss] Reusing resolution of type reference directive 'pkg2' from '/home/src/workspaces/project/randomFileForTypeRef.ts' of old program, it was successfully resolved to '/home/src/workspaces/project/node_modules/pkg2/import.d.ts' with Package ID 'pkg2/import.d.ts@0.0.1'.
Info seq  [hh:mm:ss:mss] Reusing resolution of type reference directive 'pkg4' from '/home/src/workspaces/project/__inferred type names__.ts' of old program, it was successfully resolved to '/home/src/workspaces/project/node_modules/@types/pkg4/index.d.ts'.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/node_modules/@types/pkg4/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/node_modules/@types/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/node_modules/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: /home/src/workspaces/project/tsconfig.json projectStateVersion: 6 projectProgramVersion: 5 structureChanged: true structureIsReused:: SafeModules Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Project '/home/src/workspaces/project/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (10)
	/home/src/tslibs/TS/Lib/lib.d.ts Text-1 "/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };"
	/home/src/workspaces/project/node_modules/pkg0/import.d.ts Text-1 "export interface ImportInterface0 {}"
	/home/src/workspaces/project/fileWithImports.ts Text-1 "import type { ImportInterface0 } from \"pkg0\" assert { \"resolution-mode\": \"import\" };\nimport type { RequireInterface1 } from \"pkg1\" assert { \"resolution-mode\": \"require\" };\n"
	/home/src/workspaces/project/node_modules/pkg2/import.d.ts Text-1 "export {};\ndeclare global {\n    interface ImportInterface2 {}\n}\n"
	/home/src/workspaces/project/node_modules/pkg3/require.d.ts Text-1 "export {};\ndeclare global {\n    interface RequireInterface3 {}\n}\n"
	/home/src/workspaces/project/fileWithTypeRefs.ts Text-1 "/// <reference types=\"pkg2\" resolution-mode=\"import\"/>\n/// <reference types=\"pkg3\" resolution-mode=\"require\"/>\ninterface LocalInterface extends ImportInterface2, RequireInterface3 {}\nexport {}\n"
	/home/src/workspaces/project/main.ts SVC-1-0 "export const x = 10;"
	/home/src/workspaces/project/randomFileForImport.ts Text-2 "import type { ImportInterface0 } from \"pkg0\" assert { \"resolution-mode\": \"import\" };\nexport const x = 10;"
	/home/src/workspaces/project/randomFileForTypeRef.ts Text-2 "/// <reference types=\"pkg2\" resolution-mode=\"import\"/>\nexport const x = 10;"
	/home/src/workspaces/project/node_modules/@types/pkg4/index.d.ts Text-1 "export const x = 10;"


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

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Running: *ensureProjectForOpenFiles*
Info seq  [hh:mm:ss:mss] Before ensureProjectForOpenFiles:
Info seq  [hh:mm:ss:mss] Project '/home/src/workspaces/project/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (10)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: /home/src/workspaces/project/main.ts ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /home/src/workspaces/project/tsconfig.json
Info seq  [hh:mm:ss:mss] After ensureProjectForOpenFiles:
Info seq  [hh:mm:ss:mss] Project '/home/src/workspaces/project/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (10)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: /home/src/workspaces/project/main.ts ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /home/src/workspaces/project/tsconfig.json
Info seq  [hh:mm:ss:mss] got projects updated in background /home/src/workspaces/project/main.ts
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "projectsUpdatedInBackground",
      "body": {
        "openFiles": [
          "/home/src/workspaces/project/main.ts"
        ]
      }
    }
After running Timeout callback:: count: 0

Projects::
/home/src/workspaces/project/tsconfig.json (Configured) *changed*
    projectStateVersion: 6
    projectProgramVersion: 6 *changed*
    dirty: false *changed*

ScriptInfos::
/home/src/tslibs/TS/Lib/lib.d.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/fileWithImports.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/fileWithTypeRefs.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/main.ts (Open)
    version: SVC-1-0
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json *default*
/home/src/workspaces/project/node_modules/@types/pkg4/index.d.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/node_modules/pkg0/import.d.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/node_modules/pkg1/require.d.ts *changed*
    version: Text-1
    containingProjects: 0 *changed*
        /home/src/workspaces/project/tsconfig.json *deleted*
/home/src/workspaces/project/node_modules/pkg2/import.d.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/node_modules/pkg3/require.d.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/randomFileForImport.ts
    version: Text-2
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/randomFileForTypeRef.ts
    version: Text-2
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json

write file not resolved by import
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Triggered with /home/src/workspaces/project/node_modules/pkg1/require1.d.ts :: WatchInfo: /home/src/workspaces/project/node_modules 1 undefined Project: /home/src/workspaces/project/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Scheduled: /home/src/workspaces/project/tsconfig.jsonFailedLookupInvalidation
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Triggered with /home/src/workspaces/project/node_modules/pkg1/require1.d.ts :: WatchInfo: /home/src/workspaces/project/node_modules 1 undefined Project: /home/src/workspaces/project/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Triggered with /home/src/workspaces/project/node_modules/pkg1/require1.d.ts :: WatchInfo: /home/src/workspaces/project/node_modules 1 undefined WatchType: node_modules for closed script infos and package.jsons affecting module specifier cache
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Triggered with /home/src/workspaces/project/node_modules/pkg1/require1.d.ts :: WatchInfo: /home/src/workspaces/project/node_modules 1 undefined WatchType: node_modules for closed script infos and package.jsons affecting module specifier cache
Before running Timeout callback:: count: 1
14: /home/src/workspaces/project/tsconfig.jsonFailedLookupInvalidation
//// [/home/src/workspaces/project/node_modules/pkg1/require1.d.ts]
export interface RequireInterface1 {}


Timeout callback:: count: 1
14: /home/src/workspaces/project/tsconfig.jsonFailedLookupInvalidation *new*

Info seq  [hh:mm:ss:mss] Running: /home/src/workspaces/project/tsconfig.jsonFailedLookupInvalidation
Info seq  [hh:mm:ss:mss] Scheduled: /home/src/workspaces/project/tsconfig.json
Info seq  [hh:mm:ss:mss] Scheduled: *ensureProjectForOpenFiles*
After running Timeout callback:: count: 2

Timeout callback:: count: 2
15: /home/src/workspaces/project/tsconfig.json *new*
16: *ensureProjectForOpenFiles* *new*

Projects::
/home/src/workspaces/project/tsconfig.json (Configured) *changed*
    projectStateVersion: 7 *changed*
    projectProgramVersion: 6
    dirty: true *changed*

Before running Timeout callback:: count: 2
15: /home/src/workspaces/project/tsconfig.json
16: *ensureProjectForOpenFiles*

Info seq  [hh:mm:ss:mss] Running: /home/src/workspaces/project/tsconfig.json
Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: /home/src/workspaces/project/tsconfig.json
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/node_modules/pkg0/package.json' exists according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/node_modules/pkg2/package.json' exists according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/node_modules/pkg3/package.json' exists according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/node_modules/@types/pkg4/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/node_modules/@types/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/node_modules/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] Reusing resolution of module 'pkg0' from '/home/src/workspaces/project/fileWithImports.ts' of old program, it was successfully resolved to '/home/src/workspaces/project/node_modules/pkg0/import.d.ts' with Package ID 'pkg0/import.d.ts@0.0.1'.
Info seq  [hh:mm:ss:mss] ======== Resolving module 'pkg1' from '/home/src/workspaces/project/fileWithImports.ts'. ========
Info seq  [hh:mm:ss:mss] Module resolution kind is not specified, using 'Node10'.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] Loading module 'pkg1' from 'node_modules' folder, target file types: TypeScript, Declaration.
Info seq  [hh:mm:ss:mss] Searching all ancestor node_modules directories for preferred extensions: TypeScript, Declaration.
Info seq  [hh:mm:ss:mss] Found 'package.json' at '/home/src/workspaces/project/node_modules/pkg1/package.json'.
Info seq  [hh:mm:ss:mss] Entering conditional exports.
Info seq  [hh:mm:ss:mss] Saw non-matching condition 'import'.
Info seq  [hh:mm:ss:mss] Matched 'exports' condition 'require'.
Info seq  [hh:mm:ss:mss] Using 'exports' subpath '.' with target './require1.js'.
Info seq  [hh:mm:ss:mss] File name '/home/src/workspaces/project/node_modules/pkg1/require1.js' has a '.js' extension - stripping it.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/node_modules/pkg1/require1.ts' does not exist.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/node_modules/pkg1/require1.tsx' does not exist.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/node_modules/pkg1/require1.d.ts' exists - use it as a name resolution result.
Info seq  [hh:mm:ss:mss] 'package.json' does not have a 'peerDependencies' field.
Info seq  [hh:mm:ss:mss] Resolved under condition 'require'.
Info seq  [hh:mm:ss:mss] Exiting conditional exports.
Info seq  [hh:mm:ss:mss] Resolving real path for '/home/src/workspaces/project/node_modules/pkg1/require1.d.ts', result '/home/src/workspaces/project/node_modules/pkg1/require1.d.ts'.
Info seq  [hh:mm:ss:mss] ======== Module name 'pkg1' was successfully resolved to '/home/src/workspaces/project/node_modules/pkg1/require1.d.ts' with Package ID 'pkg1/require1.d.ts@0.0.1'. ========
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/node_modules/pkg0/package.json' exists according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/node_modules/pkg1/package.json' exists according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] Reusing resolution of type reference directive 'pkg2' from '/home/src/workspaces/project/fileWithTypeRefs.ts' of old program, it was successfully resolved to '/home/src/workspaces/project/node_modules/pkg2/import.d.ts' with Package ID 'pkg2/import.d.ts@0.0.1'.
Info seq  [hh:mm:ss:mss] Reusing resolution of type reference directive 'pkg3' from '/home/src/workspaces/project/fileWithTypeRefs.ts' of old program, it was successfully resolved to '/home/src/workspaces/project/node_modules/pkg3/require.d.ts' with Package ID 'pkg3/require.d.ts@0.0.1'.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/node_modules/pkg2/package.json' exists according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/node_modules/pkg3/package.json' exists according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] Reusing resolution of module 'pkg0' from '/home/src/workspaces/project/randomFileForImport.ts' of old program, it was successfully resolved to '/home/src/workspaces/project/node_modules/pkg0/import.d.ts' with Package ID 'pkg0/import.d.ts@0.0.1'.
Info seq  [hh:mm:ss:mss] Reusing resolution of type reference directive 'pkg2' from '/home/src/workspaces/project/randomFileForTypeRef.ts' of old program, it was successfully resolved to '/home/src/workspaces/project/node_modules/pkg2/import.d.ts' with Package ID 'pkg2/import.d.ts@0.0.1'.
Info seq  [hh:mm:ss:mss] Reusing resolution of type reference directive 'pkg4' from '/home/src/workspaces/project/__inferred type names__.ts' of old program, it was successfully resolved to '/home/src/workspaces/project/node_modules/@types/pkg4/index.d.ts'.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/node_modules/@types/pkg4/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/node_modules/@types/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/node_modules/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: /home/src/workspaces/project/tsconfig.json projectStateVersion: 7 projectProgramVersion: 6 structureChanged: true structureIsReused:: SafeModules Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Project '/home/src/workspaces/project/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (11)
	/home/src/tslibs/TS/Lib/lib.d.ts Text-1 "/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };"
	/home/src/workspaces/project/node_modules/pkg0/import.d.ts Text-1 "export interface ImportInterface0 {}"
	/home/src/workspaces/project/node_modules/pkg1/require1.d.ts Text-1 "export interface RequireInterface1 {}"
	/home/src/workspaces/project/fileWithImports.ts Text-1 "import type { ImportInterface0 } from \"pkg0\" assert { \"resolution-mode\": \"import\" };\nimport type { RequireInterface1 } from \"pkg1\" assert { \"resolution-mode\": \"require\" };\n"
	/home/src/workspaces/project/node_modules/pkg2/import.d.ts Text-1 "export {};\ndeclare global {\n    interface ImportInterface2 {}\n}\n"
	/home/src/workspaces/project/node_modules/pkg3/require.d.ts Text-1 "export {};\ndeclare global {\n    interface RequireInterface3 {}\n}\n"
	/home/src/workspaces/project/fileWithTypeRefs.ts Text-1 "/// <reference types=\"pkg2\" resolution-mode=\"import\"/>\n/// <reference types=\"pkg3\" resolution-mode=\"require\"/>\ninterface LocalInterface extends ImportInterface2, RequireInterface3 {}\nexport {}\n"
	/home/src/workspaces/project/main.ts SVC-1-0 "export const x = 10;"
	/home/src/workspaces/project/randomFileForImport.ts Text-2 "import type { ImportInterface0 } from \"pkg0\" assert { \"resolution-mode\": \"import\" };\nexport const x = 10;"
	/home/src/workspaces/project/randomFileForTypeRef.ts Text-2 "/// <reference types=\"pkg2\" resolution-mode=\"import\"/>\nexport const x = 10;"
	/home/src/workspaces/project/node_modules/@types/pkg4/index.d.ts Text-1 "export const x = 10;"


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

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Running: *ensureProjectForOpenFiles*
Info seq  [hh:mm:ss:mss] Before ensureProjectForOpenFiles:
Info seq  [hh:mm:ss:mss] Project '/home/src/workspaces/project/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (11)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: /home/src/workspaces/project/main.ts ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /home/src/workspaces/project/tsconfig.json
Info seq  [hh:mm:ss:mss] After ensureProjectForOpenFiles:
Info seq  [hh:mm:ss:mss] Project '/home/src/workspaces/project/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (11)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: /home/src/workspaces/project/main.ts ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /home/src/workspaces/project/tsconfig.json
Info seq  [hh:mm:ss:mss] got projects updated in background /home/src/workspaces/project/main.ts
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "projectsUpdatedInBackground",
      "body": {
        "openFiles": [
          "/home/src/workspaces/project/main.ts"
        ]
      }
    }
After running Timeout callback:: count: 0

Projects::
/home/src/workspaces/project/tsconfig.json (Configured) *changed*
    projectStateVersion: 7
    projectProgramVersion: 7 *changed*
    dirty: false *changed*

ScriptInfos::
/home/src/tslibs/TS/Lib/lib.d.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/fileWithImports.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/fileWithTypeRefs.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/main.ts (Open)
    version: SVC-1-0
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json *default*
/home/src/workspaces/project/node_modules/@types/pkg4/index.d.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/node_modules/pkg0/import.d.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/node_modules/pkg1/require.d.ts
    version: Text-1
    containingProjects: 0
/home/src/workspaces/project/node_modules/pkg1/require1.d.ts *new*
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/node_modules/pkg2/import.d.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/node_modules/pkg3/require.d.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/randomFileForImport.ts
    version: Text-2
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/randomFileForTypeRef.ts
    version: Text-2
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json

delete file with imports
Info seq  [hh:mm:ss:mss] FileWatcher:: Triggered with /home/src/workspaces/project/fileWithImports.ts 2:: WatchInfo: /home/src/workspaces/project/fileWithImports.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] Scheduled: /home/src/workspaces/project/tsconfig.json
Info seq  [hh:mm:ss:mss] Scheduled: *ensureProjectForOpenFiles*
Info seq  [hh:mm:ss:mss] Elapsed:: *ms FileWatcher:: Triggered with /home/src/workspaces/project/fileWithImports.ts 2:: WatchInfo: /home/src/workspaces/project/fileWithImports.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Triggered with /home/src/workspaces/project/fileWithImports.ts :: WatchInfo: /home/src/workspaces/project 0 undefined Config: /home/src/workspaces/project/tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] Scheduled: /home/src/workspaces/project/tsconfig.json, Cancelled earlier one
Info seq  [hh:mm:ss:mss] Scheduled: *ensureProjectForOpenFiles*, Cancelled earlier one
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Triggered with /home/src/workspaces/project/fileWithImports.ts :: WatchInfo: /home/src/workspaces/project 0 undefined Config: /home/src/workspaces/project/tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Triggered with /home/src/workspaces/project/fileWithImports.ts :: WatchInfo: /home/src/workspaces/project 0 undefined Project: /home/src/workspaces/project/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Scheduled: /home/src/workspaces/project/tsconfig.jsonFailedLookupInvalidation
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Triggered with /home/src/workspaces/project/fileWithImports.ts :: WatchInfo: /home/src/workspaces/project 0 undefined Project: /home/src/workspaces/project/tsconfig.json WatchType: Failed Lookup Locations
Before running Timeout callback:: count: 3
19: /home/src/workspaces/project/tsconfig.json
20: *ensureProjectForOpenFiles*
21: /home/src/workspaces/project/tsconfig.jsonFailedLookupInvalidation
//// [/home/src/workspaces/project/fileWithImports.ts] deleted

Timeout callback:: count: 3
19: /home/src/workspaces/project/tsconfig.json *new*
20: *ensureProjectForOpenFiles* *new*
21: /home/src/workspaces/project/tsconfig.jsonFailedLookupInvalidation *new*

Projects::
/home/src/workspaces/project/tsconfig.json (Configured) *changed*
    projectStateVersion: 8 *changed*
    projectProgramVersion: 7
    dirty: true *changed*

ScriptInfos::
/home/src/tslibs/TS/Lib/lib.d.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/fileWithImports.ts *changed*
    version: Text-1
    pendingReloadFromDisk: true *changed*
    deferredDelete: true *changed*
    containingProjects: 0 *changed*
        /home/src/workspaces/project/tsconfig.json *deleted*
/home/src/workspaces/project/fileWithTypeRefs.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/main.ts (Open)
    version: SVC-1-0
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json *default*
/home/src/workspaces/project/node_modules/@types/pkg4/index.d.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/node_modules/pkg0/import.d.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/node_modules/pkg1/require.d.ts
    version: Text-1
    containingProjects: 0
/home/src/workspaces/project/node_modules/pkg1/require1.d.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/node_modules/pkg2/import.d.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/node_modules/pkg3/require.d.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/randomFileForImport.ts
    version: Text-2
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/randomFileForTypeRef.ts
    version: Text-2
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json

Info seq  [hh:mm:ss:mss] Running: /home/src/workspaces/project/tsconfig.json
Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: /home/src/workspaces/project/tsconfig.json
Info seq  [hh:mm:ss:mss] Reusing resolution of type reference directive 'pkg2' from '/home/src/workspaces/project/fileWithTypeRefs.ts' of old program, it was successfully resolved to '/home/src/workspaces/project/node_modules/pkg2/import.d.ts' with Package ID 'pkg2/import.d.ts@0.0.1'.
Info seq  [hh:mm:ss:mss] Reusing resolution of type reference directive 'pkg3' from '/home/src/workspaces/project/fileWithTypeRefs.ts' of old program, it was successfully resolved to '/home/src/workspaces/project/node_modules/pkg3/require.d.ts' with Package ID 'pkg3/require.d.ts@0.0.1'.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/node_modules/pkg2/package.json' exists according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/node_modules/pkg3/package.json' exists according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] Reusing resolution of module 'pkg0' from '/home/src/workspaces/project/randomFileForImport.ts' of old program, it was successfully resolved to '/home/src/workspaces/project/node_modules/pkg0/import.d.ts' with Package ID 'pkg0/import.d.ts@0.0.1'.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/node_modules/pkg0/package.json' exists according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] Reusing resolution of type reference directive 'pkg2' from '/home/src/workspaces/project/randomFileForTypeRef.ts' of old program, it was successfully resolved to '/home/src/workspaces/project/node_modules/pkg2/import.d.ts' with Package ID 'pkg2/import.d.ts@0.0.1'.
Info seq  [hh:mm:ss:mss] Reusing resolution of type reference directive 'pkg4' from '/home/src/workspaces/project/__inferred type names__.ts' of old program, it was successfully resolved to '/home/src/workspaces/project/node_modules/@types/pkg4/index.d.ts'.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/node_modules/@types/pkg4/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/node_modules/@types/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/node_modules/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] FileWatcher:: Close:: WatchInfo: /home/src/workspaces/project/node_modules/pkg1/package.json 2000 undefined Project: /home/src/workspaces/project/tsconfig.json WatchType: File location affecting resolution
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: /home/src/workspaces/project/tsconfig.json projectStateVersion: 8 projectProgramVersion: 7 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Project '/home/src/workspaces/project/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (9)
	/home/src/tslibs/TS/Lib/lib.d.ts Text-1 "/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };"
	/home/src/workspaces/project/node_modules/pkg2/import.d.ts Text-1 "export {};\ndeclare global {\n    interface ImportInterface2 {}\n}\n"
	/home/src/workspaces/project/node_modules/pkg3/require.d.ts Text-1 "export {};\ndeclare global {\n    interface RequireInterface3 {}\n}\n"
	/home/src/workspaces/project/fileWithTypeRefs.ts Text-1 "/// <reference types=\"pkg2\" resolution-mode=\"import\"/>\n/// <reference types=\"pkg3\" resolution-mode=\"require\"/>\ninterface LocalInterface extends ImportInterface2, RequireInterface3 {}\nexport {}\n"
	/home/src/workspaces/project/main.ts SVC-1-0 "export const x = 10;"
	/home/src/workspaces/project/node_modules/pkg0/import.d.ts Text-1 "export interface ImportInterface0 {}"
	/home/src/workspaces/project/randomFileForImport.ts Text-2 "import type { ImportInterface0 } from \"pkg0\" assert { \"resolution-mode\": \"import\" };\nexport const x = 10;"
	/home/src/workspaces/project/randomFileForTypeRef.ts Text-2 "/// <reference types=\"pkg2\" resolution-mode=\"import\"/>\nexport const x = 10;"
	/home/src/workspaces/project/node_modules/@types/pkg4/index.d.ts Text-1 "export const x = 10;"


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

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Running: *ensureProjectForOpenFiles*
Info seq  [hh:mm:ss:mss] Before ensureProjectForOpenFiles:
Info seq  [hh:mm:ss:mss] Project '/home/src/workspaces/project/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (9)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: /home/src/workspaces/project/main.ts ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /home/src/workspaces/project/tsconfig.json
Info seq  [hh:mm:ss:mss] After ensureProjectForOpenFiles:
Info seq  [hh:mm:ss:mss] Project '/home/src/workspaces/project/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (9)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: /home/src/workspaces/project/main.ts ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /home/src/workspaces/project/tsconfig.json
Info seq  [hh:mm:ss:mss] got projects updated in background /home/src/workspaces/project/main.ts
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "projectsUpdatedInBackground",
      "body": {
        "openFiles": [
          "/home/src/workspaces/project/main.ts"
        ]
      }
    }
After running Timeout callback:: count: 0

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
/home/src/workspaces/project/node_modules/pkg0/package.json:
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

FsWatches *deleted*::
/home/src/workspaces/project/node_modules/pkg1/package.json:
  {}

FsWatchesRecursive::
/home/src/workspaces/project/node_modules:
  {}
/home/src/workspaces/project/node_modules/@types:
  {}

Timeout callback:: count: 0
21: /home/src/workspaces/project/tsconfig.jsonFailedLookupInvalidation *deleted*

Projects::
/home/src/workspaces/project/tsconfig.json (Configured) *changed*
    projectStateVersion: 8
    projectProgramVersion: 8 *changed*
    dirty: false *changed*

ScriptInfos::
/home/src/tslibs/TS/Lib/lib.d.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/fileWithImports.ts
    version: Text-1
    pendingReloadFromDisk: true
    deferredDelete: true
    containingProjects: 0
/home/src/workspaces/project/fileWithTypeRefs.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/main.ts (Open)
    version: SVC-1-0
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json *default*
/home/src/workspaces/project/node_modules/@types/pkg4/index.d.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/node_modules/pkg0/import.d.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/node_modules/pkg1/require.d.ts
    version: Text-1
    containingProjects: 0
/home/src/workspaces/project/node_modules/pkg1/require1.d.ts *changed*
    version: Text-1
    containingProjects: 0 *changed*
        /home/src/workspaces/project/tsconfig.json *deleted*
/home/src/workspaces/project/node_modules/pkg2/import.d.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/node_modules/pkg3/require.d.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/randomFileForImport.ts
    version: Text-2
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/randomFileForTypeRef.ts
    version: Text-2
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json

delete file with typeRefs
Info seq  [hh:mm:ss:mss] FileWatcher:: Triggered with /home/src/workspaces/project/fileWithTypeRefs.ts 2:: WatchInfo: /home/src/workspaces/project/fileWithTypeRefs.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] Scheduled: /home/src/workspaces/project/tsconfig.json
Info seq  [hh:mm:ss:mss] Scheduled: *ensureProjectForOpenFiles*
Info seq  [hh:mm:ss:mss] Elapsed:: *ms FileWatcher:: Triggered with /home/src/workspaces/project/fileWithTypeRefs.ts 2:: WatchInfo: /home/src/workspaces/project/fileWithTypeRefs.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Triggered with /home/src/workspaces/project/fileWithTypeRefs.ts :: WatchInfo: /home/src/workspaces/project 0 undefined Config: /home/src/workspaces/project/tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] Scheduled: /home/src/workspaces/project/tsconfig.json, Cancelled earlier one
Info seq  [hh:mm:ss:mss] Scheduled: *ensureProjectForOpenFiles*, Cancelled earlier one
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Triggered with /home/src/workspaces/project/fileWithTypeRefs.ts :: WatchInfo: /home/src/workspaces/project 0 undefined Config: /home/src/workspaces/project/tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Triggered with /home/src/workspaces/project/fileWithTypeRefs.ts :: WatchInfo: /home/src/workspaces/project 0 undefined Project: /home/src/workspaces/project/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Scheduled: /home/src/workspaces/project/tsconfig.jsonFailedLookupInvalidation
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Triggered with /home/src/workspaces/project/fileWithTypeRefs.ts :: WatchInfo: /home/src/workspaces/project 0 undefined Project: /home/src/workspaces/project/tsconfig.json WatchType: Failed Lookup Locations
Before running Timeout callback:: count: 3
24: /home/src/workspaces/project/tsconfig.json
25: *ensureProjectForOpenFiles*
26: /home/src/workspaces/project/tsconfig.jsonFailedLookupInvalidation
//// [/home/src/workspaces/project/fileWithTypeRefs.ts] deleted

Timeout callback:: count: 3
24: /home/src/workspaces/project/tsconfig.json *new*
25: *ensureProjectForOpenFiles* *new*
26: /home/src/workspaces/project/tsconfig.jsonFailedLookupInvalidation *new*

Projects::
/home/src/workspaces/project/tsconfig.json (Configured) *changed*
    projectStateVersion: 9 *changed*
    projectProgramVersion: 8
    dirty: true *changed*

ScriptInfos::
/home/src/tslibs/TS/Lib/lib.d.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/fileWithImports.ts
    version: Text-1
    pendingReloadFromDisk: true
    deferredDelete: true
    containingProjects: 0
/home/src/workspaces/project/fileWithTypeRefs.ts *changed*
    version: Text-1
    pendingReloadFromDisk: true *changed*
    deferredDelete: true *changed*
    containingProjects: 0 *changed*
        /home/src/workspaces/project/tsconfig.json *deleted*
/home/src/workspaces/project/main.ts (Open)
    version: SVC-1-0
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json *default*
/home/src/workspaces/project/node_modules/@types/pkg4/index.d.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/node_modules/pkg0/import.d.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/node_modules/pkg1/require.d.ts
    version: Text-1
    containingProjects: 0
/home/src/workspaces/project/node_modules/pkg1/require1.d.ts
    version: Text-1
    containingProjects: 0
/home/src/workspaces/project/node_modules/pkg2/import.d.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/node_modules/pkg3/require.d.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/randomFileForImport.ts
    version: Text-2
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/randomFileForTypeRef.ts
    version: Text-2
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json

Info seq  [hh:mm:ss:mss] Running: /home/src/workspaces/project/tsconfig.json
Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: /home/src/workspaces/project/tsconfig.json
Info seq  [hh:mm:ss:mss] Reusing resolution of module 'pkg0' from '/home/src/workspaces/project/randomFileForImport.ts' of old program, it was successfully resolved to '/home/src/workspaces/project/node_modules/pkg0/import.d.ts' with Package ID 'pkg0/import.d.ts@0.0.1'.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/node_modules/pkg0/package.json' exists according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] Reusing resolution of type reference directive 'pkg2' from '/home/src/workspaces/project/randomFileForTypeRef.ts' of old program, it was successfully resolved to '/home/src/workspaces/project/node_modules/pkg2/import.d.ts' with Package ID 'pkg2/import.d.ts@0.0.1'.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/node_modules/pkg2/package.json' exists according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] Reusing resolution of type reference directive 'pkg4' from '/home/src/workspaces/project/__inferred type names__.ts' of old program, it was successfully resolved to '/home/src/workspaces/project/node_modules/@types/pkg4/index.d.ts'.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/node_modules/@types/pkg4/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/node_modules/@types/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/node_modules/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] FileWatcher:: Close:: WatchInfo: /home/src/workspaces/project/node_modules/pkg3/package.json 2000 undefined Project: /home/src/workspaces/project/tsconfig.json WatchType: File location affecting resolution
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: /home/src/workspaces/project/tsconfig.json projectStateVersion: 9 projectProgramVersion: 8 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Project '/home/src/workspaces/project/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (7)
	/home/src/tslibs/TS/Lib/lib.d.ts Text-1 "/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };"
	/home/src/workspaces/project/main.ts SVC-1-0 "export const x = 10;"
	/home/src/workspaces/project/node_modules/pkg0/import.d.ts Text-1 "export interface ImportInterface0 {}"
	/home/src/workspaces/project/randomFileForImport.ts Text-2 "import type { ImportInterface0 } from \"pkg0\" assert { \"resolution-mode\": \"import\" };\nexport const x = 10;"
	/home/src/workspaces/project/node_modules/pkg2/import.d.ts Text-1 "export {};\ndeclare global {\n    interface ImportInterface2 {}\n}\n"
	/home/src/workspaces/project/randomFileForTypeRef.ts Text-2 "/// <reference types=\"pkg2\" resolution-mode=\"import\"/>\nexport const x = 10;"
	/home/src/workspaces/project/node_modules/@types/pkg4/index.d.ts Text-1 "export const x = 10;"


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

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Running: *ensureProjectForOpenFiles*
Info seq  [hh:mm:ss:mss] Before ensureProjectForOpenFiles:
Info seq  [hh:mm:ss:mss] Project '/home/src/workspaces/project/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (7)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: /home/src/workspaces/project/main.ts ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /home/src/workspaces/project/tsconfig.json
Info seq  [hh:mm:ss:mss] After ensureProjectForOpenFiles:
Info seq  [hh:mm:ss:mss] Project '/home/src/workspaces/project/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (7)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: /home/src/workspaces/project/main.ts ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /home/src/workspaces/project/tsconfig.json
Info seq  [hh:mm:ss:mss] got projects updated in background /home/src/workspaces/project/main.ts
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "projectsUpdatedInBackground",
      "body": {
        "openFiles": [
          "/home/src/workspaces/project/main.ts"
        ]
      }
    }
After running Timeout callback:: count: 0

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
/home/src/workspaces/project/node_modules/pkg3/package.json:
  {}

FsWatchesRecursive::
/home/src/workspaces/project/node_modules:
  {}
/home/src/workspaces/project/node_modules/@types:
  {}

Timeout callback:: count: 0
26: /home/src/workspaces/project/tsconfig.jsonFailedLookupInvalidation *deleted*

Projects::
/home/src/workspaces/project/tsconfig.json (Configured) *changed*
    projectStateVersion: 9
    projectProgramVersion: 9 *changed*
    dirty: false *changed*

ScriptInfos::
/home/src/tslibs/TS/Lib/lib.d.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/fileWithImports.ts
    version: Text-1
    pendingReloadFromDisk: true
    deferredDelete: true
    containingProjects: 0
/home/src/workspaces/project/fileWithTypeRefs.ts
    version: Text-1
    pendingReloadFromDisk: true
    deferredDelete: true
    containingProjects: 0
/home/src/workspaces/project/main.ts (Open)
    version: SVC-1-0
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json *default*
/home/src/workspaces/project/node_modules/@types/pkg4/index.d.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/node_modules/pkg0/import.d.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/node_modules/pkg1/require.d.ts
    version: Text-1
    containingProjects: 0
/home/src/workspaces/project/node_modules/pkg1/require1.d.ts
    version: Text-1
    containingProjects: 0
/home/src/workspaces/project/node_modules/pkg2/import.d.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/node_modules/pkg3/require.d.ts *changed*
    version: Text-1
    containingProjects: 0 *changed*
        /home/src/workspaces/project/tsconfig.json *deleted*
/home/src/workspaces/project/randomFileForImport.ts
    version: Text-2
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/randomFileForTypeRef.ts
    version: Text-2
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json

delete resolved import file
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Triggered with /home/src/workspaces/project/node_modules/pkg0/import.d.ts :: WatchInfo: /home/src/workspaces/project/node_modules 1 undefined Project: /home/src/workspaces/project/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Scheduled: /home/src/workspaces/project/tsconfig.jsonFailedLookupInvalidation
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Triggered with /home/src/workspaces/project/node_modules/pkg0/import.d.ts :: WatchInfo: /home/src/workspaces/project/node_modules 1 undefined Project: /home/src/workspaces/project/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Triggered with /home/src/workspaces/project/node_modules/pkg0/import.d.ts :: WatchInfo: /home/src/workspaces/project/node_modules 1 undefined WatchType: node_modules for closed script infos and package.jsons affecting module specifier cache
Info seq  [hh:mm:ss:mss] Scheduled: /home/src/workspaces/project/tsconfig.json
Info seq  [hh:mm:ss:mss] Scheduled: *ensureProjectForOpenFiles*
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Triggered with /home/src/workspaces/project/node_modules/pkg0/import.d.ts :: WatchInfo: /home/src/workspaces/project/node_modules 1 undefined WatchType: node_modules for closed script infos and package.jsons affecting module specifier cache
Before running Timeout callback:: count: 3
27: /home/src/workspaces/project/tsconfig.jsonFailedLookupInvalidation
28: /home/src/workspaces/project/tsconfig.json
29: *ensureProjectForOpenFiles*
//// [/home/src/workspaces/project/node_modules/pkg0/import.d.ts] deleted

Timeout callback:: count: 3
27: /home/src/workspaces/project/tsconfig.jsonFailedLookupInvalidation *new*
28: /home/src/workspaces/project/tsconfig.json *new*
29: *ensureProjectForOpenFiles* *new*

Projects::
/home/src/workspaces/project/tsconfig.json (Configured) *changed*
    projectStateVersion: 10 *changed*
    projectProgramVersion: 9
    dirty: true *changed*

ScriptInfos::
/home/src/tslibs/TS/Lib/lib.d.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/fileWithImports.ts
    version: Text-1
    pendingReloadFromDisk: true
    deferredDelete: true
    containingProjects: 0
/home/src/workspaces/project/fileWithTypeRefs.ts
    version: Text-1
    pendingReloadFromDisk: true
    deferredDelete: true
    containingProjects: 0
/home/src/workspaces/project/main.ts (Open)
    version: SVC-1-0
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json *default*
/home/src/workspaces/project/node_modules/@types/pkg4/index.d.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/node_modules/pkg0/import.d.ts *changed*
    version: Text-1
    pendingReloadFromDisk: true *changed*
    deferredDelete: true *changed*
    containingProjects: 0 *changed*
        /home/src/workspaces/project/tsconfig.json *deleted*
/home/src/workspaces/project/node_modules/pkg1/require.d.ts
    version: Text-1
    containingProjects: 0
/home/src/workspaces/project/node_modules/pkg1/require1.d.ts
    version: Text-1
    containingProjects: 0
/home/src/workspaces/project/node_modules/pkg2/import.d.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/node_modules/pkg3/require.d.ts
    version: Text-1
    containingProjects: 0
/home/src/workspaces/project/randomFileForImport.ts
    version: Text-2
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/randomFileForTypeRef.ts
    version: Text-2
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json

Info seq  [hh:mm:ss:mss] Running: /home/src/workspaces/project/tsconfig.jsonFailedLookupInvalidation
Info seq  [hh:mm:ss:mss] Running: /home/src/workspaces/project/tsconfig.json
Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: /home/src/workspaces/project/tsconfig.json
Info seq  [hh:mm:ss:mss] Found 'package.json' at '/home/src/workspaces/project/node_modules/pkg0/package.json'.
Info seq  [hh:mm:ss:mss] ======== Resolving module 'pkg0' from '/home/src/workspaces/project/randomFileForImport.ts'. ========
Info seq  [hh:mm:ss:mss] Module resolution kind is not specified, using 'Node10'.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] Loading module 'pkg0' from 'node_modules' folder, target file types: TypeScript, Declaration.
Info seq  [hh:mm:ss:mss] Searching all ancestor node_modules directories for preferred extensions: TypeScript, Declaration.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/node_modules/pkg0/package.json' exists according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] Entering conditional exports.
Info seq  [hh:mm:ss:mss] Matched 'exports' condition 'import'.
Info seq  [hh:mm:ss:mss] Using 'exports' subpath '.' with target './import.js'.
Info seq  [hh:mm:ss:mss] File name '/home/src/workspaces/project/node_modules/pkg0/import.js' has a '.js' extension - stripping it.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/node_modules/pkg0/import.ts' does not exist.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/node_modules/pkg0/import.tsx' does not exist.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/node_modules/pkg0/import.d.ts' does not exist.
Info seq  [hh:mm:ss:mss] Failed to resolve under condition 'import'.
Info seq  [hh:mm:ss:mss] Saw non-matching condition 'require'.
Info seq  [hh:mm:ss:mss] Exiting conditional exports.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/node_modules/@types/pkg0.d.ts' does not exist.
Info seq  [hh:mm:ss:mss] Directory '/home/src/workspaces/node_modules' does not exist, skipping all lookups in it.
Info seq  [hh:mm:ss:mss] Directory '/home/src/node_modules' does not exist, skipping all lookups in it.
Info seq  [hh:mm:ss:mss] Directory '/home/node_modules' does not exist, skipping all lookups in it.
Info seq  [hh:mm:ss:mss] Directory '/node_modules' does not exist, skipping all lookups in it.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] Loading module 'pkg0' from 'node_modules' folder, target file types: JavaScript.
Info seq  [hh:mm:ss:mss] Searching all ancestor node_modules directories for fallback extensions: JavaScript.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/node_modules/pkg0/package.json' exists according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] Entering conditional exports.
Info seq  [hh:mm:ss:mss] Matched 'exports' condition 'import'.
Info seq  [hh:mm:ss:mss] Using 'exports' subpath '.' with target './import.js'.
Info seq  [hh:mm:ss:mss] File name '/home/src/workspaces/project/node_modules/pkg0/import.js' has a '.js' extension - stripping it.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/node_modules/pkg0/import.js' does not exist.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/node_modules/pkg0/import.jsx' does not exist.
Info seq  [hh:mm:ss:mss] Failed to resolve under condition 'import'.
Info seq  [hh:mm:ss:mss] Saw non-matching condition 'require'.
Info seq  [hh:mm:ss:mss] Exiting conditional exports.
Info seq  [hh:mm:ss:mss] Directory '/home/src/workspaces/node_modules' does not exist, skipping all lookups in it.
Info seq  [hh:mm:ss:mss] Directory '/home/src/node_modules' does not exist, skipping all lookups in it.
Info seq  [hh:mm:ss:mss] Directory '/home/node_modules' does not exist, skipping all lookups in it.
Info seq  [hh:mm:ss:mss] Directory '/node_modules' does not exist, skipping all lookups in it.
Info seq  [hh:mm:ss:mss] Resolution of non-relative name failed; trying with '--moduleResolution bundler' to see if project may need configuration update.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] Loading module 'pkg0' from 'node_modules' folder, target file types: TypeScript, Declaration.
Info seq  [hh:mm:ss:mss] Searching all ancestor node_modules directories for preferred extensions: TypeScript, Declaration.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/node_modules/pkg0/package.json' exists according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] Entering conditional exports.
Info seq  [hh:mm:ss:mss] Matched 'exports' condition 'import'.
Info seq  [hh:mm:ss:mss] Using 'exports' subpath '.' with target './import.js'.
Info seq  [hh:mm:ss:mss] File name '/home/src/workspaces/project/node_modules/pkg0/import.js' has a '.js' extension - stripping it.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/node_modules/pkg0/import.ts' does not exist.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/node_modules/pkg0/import.tsx' does not exist.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/node_modules/pkg0/import.d.ts' does not exist.
Info seq  [hh:mm:ss:mss] Failed to resolve under condition 'import'.
Info seq  [hh:mm:ss:mss] Saw non-matching condition 'require'.
Info seq  [hh:mm:ss:mss] Exiting conditional exports.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/node_modules/@types/pkg0.d.ts' does not exist.
Info seq  [hh:mm:ss:mss] Directory '/home/src/workspaces/node_modules' does not exist, skipping all lookups in it.
Info seq  [hh:mm:ss:mss] Directory '/home/src/node_modules' does not exist, skipping all lookups in it.
Info seq  [hh:mm:ss:mss] Directory '/home/node_modules' does not exist, skipping all lookups in it.
Info seq  [hh:mm:ss:mss] Directory '/node_modules' does not exist, skipping all lookups in it.
Info seq  [hh:mm:ss:mss] ======== Module name 'pkg0' was not resolved. ========
Info seq  [hh:mm:ss:mss] Reusing resolution of type reference directive 'pkg2' from '/home/src/workspaces/project/randomFileForTypeRef.ts' of old program, it was successfully resolved to '/home/src/workspaces/project/node_modules/pkg2/import.d.ts' with Package ID 'pkg2/import.d.ts@0.0.1'.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/node_modules/pkg2/package.json' exists according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] Reusing resolution of type reference directive 'pkg4' from '/home/src/workspaces/project/__inferred type names__.ts' of old program, it was successfully resolved to '/home/src/workspaces/project/node_modules/@types/pkg4/index.d.ts'.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/node_modules/@types/pkg4/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/node_modules/@types/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/node_modules/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: /home/src/workspaces/project/tsconfig.json projectStateVersion: 10 projectProgramVersion: 9 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Project '/home/src/workspaces/project/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (6)
	/home/src/tslibs/TS/Lib/lib.d.ts Text-1 "/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };"
	/home/src/workspaces/project/main.ts SVC-1-0 "export const x = 10;"
	/home/src/workspaces/project/randomFileForImport.ts Text-2 "import type { ImportInterface0 } from \"pkg0\" assert { \"resolution-mode\": \"import\" };\nexport const x = 10;"
	/home/src/workspaces/project/node_modules/pkg2/import.d.ts Text-1 "export {};\ndeclare global {\n    interface ImportInterface2 {}\n}\n"
	/home/src/workspaces/project/randomFileForTypeRef.ts Text-2 "/// <reference types=\"pkg2\" resolution-mode=\"import\"/>\nexport const x = 10;"
	/home/src/workspaces/project/node_modules/@types/pkg4/index.d.ts Text-1 "export const x = 10;"


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

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Running: *ensureProjectForOpenFiles*
Info seq  [hh:mm:ss:mss] Before ensureProjectForOpenFiles:
Info seq  [hh:mm:ss:mss] Project '/home/src/workspaces/project/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (6)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: /home/src/workspaces/project/main.ts ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /home/src/workspaces/project/tsconfig.json
Info seq  [hh:mm:ss:mss] After ensureProjectForOpenFiles:
Info seq  [hh:mm:ss:mss] Project '/home/src/workspaces/project/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (6)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: /home/src/workspaces/project/main.ts ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /home/src/workspaces/project/tsconfig.json
Info seq  [hh:mm:ss:mss] got projects updated in background /home/src/workspaces/project/main.ts
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "projectsUpdatedInBackground",
      "body": {
        "openFiles": [
          "/home/src/workspaces/project/main.ts"
        ]
      }
    }
After running Timeout callback:: count: 0

Projects::
/home/src/workspaces/project/tsconfig.json (Configured) *changed*
    projectStateVersion: 10
    projectProgramVersion: 10 *changed*
    dirty: false *changed*

delete resolved typeRef file
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Triggered with /home/src/workspaces/project/node_modules/pkg2/import.d.ts :: WatchInfo: /home/src/workspaces/project/node_modules 1 undefined Project: /home/src/workspaces/project/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Scheduled: /home/src/workspaces/project/tsconfig.jsonFailedLookupInvalidation
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Triggered with /home/src/workspaces/project/node_modules/pkg2/import.d.ts :: WatchInfo: /home/src/workspaces/project/node_modules 1 undefined Project: /home/src/workspaces/project/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Triggered with /home/src/workspaces/project/node_modules/pkg2/import.d.ts :: WatchInfo: /home/src/workspaces/project/node_modules 1 undefined WatchType: node_modules for closed script infos and package.jsons affecting module specifier cache
Info seq  [hh:mm:ss:mss] Scheduled: /home/src/workspaces/project/tsconfig.json
Info seq  [hh:mm:ss:mss] Scheduled: *ensureProjectForOpenFiles*
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Triggered with /home/src/workspaces/project/node_modules/pkg2/import.d.ts :: WatchInfo: /home/src/workspaces/project/node_modules 1 undefined WatchType: node_modules for closed script infos and package.jsons affecting module specifier cache
Before running Timeout callback:: count: 3
30: /home/src/workspaces/project/tsconfig.jsonFailedLookupInvalidation
31: /home/src/workspaces/project/tsconfig.json
32: *ensureProjectForOpenFiles*
//// [/home/src/workspaces/project/node_modules/pkg2/import.d.ts] deleted

Timeout callback:: count: 3
30: /home/src/workspaces/project/tsconfig.jsonFailedLookupInvalidation *new*
31: /home/src/workspaces/project/tsconfig.json *new*
32: *ensureProjectForOpenFiles* *new*

Projects::
/home/src/workspaces/project/tsconfig.json (Configured) *changed*
    projectStateVersion: 11 *changed*
    projectProgramVersion: 10
    dirty: true *changed*

ScriptInfos::
/home/src/tslibs/TS/Lib/lib.d.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/fileWithImports.ts
    version: Text-1
    pendingReloadFromDisk: true
    deferredDelete: true
    containingProjects: 0
/home/src/workspaces/project/fileWithTypeRefs.ts
    version: Text-1
    pendingReloadFromDisk: true
    deferredDelete: true
    containingProjects: 0
/home/src/workspaces/project/main.ts (Open)
    version: SVC-1-0
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json *default*
/home/src/workspaces/project/node_modules/@types/pkg4/index.d.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/node_modules/pkg0/import.d.ts
    version: Text-1
    pendingReloadFromDisk: true
    deferredDelete: true
    containingProjects: 0
/home/src/workspaces/project/node_modules/pkg1/require.d.ts
    version: Text-1
    containingProjects: 0
/home/src/workspaces/project/node_modules/pkg1/require1.d.ts
    version: Text-1
    containingProjects: 0
/home/src/workspaces/project/node_modules/pkg2/import.d.ts *changed*
    version: Text-1
    pendingReloadFromDisk: true *changed*
    deferredDelete: true *changed*
    containingProjects: 0 *changed*
        /home/src/workspaces/project/tsconfig.json *deleted*
/home/src/workspaces/project/node_modules/pkg3/require.d.ts
    version: Text-1
    containingProjects: 0
/home/src/workspaces/project/randomFileForImport.ts
    version: Text-2
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/randomFileForTypeRef.ts
    version: Text-2
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json

Info seq  [hh:mm:ss:mss] Running: /home/src/workspaces/project/tsconfig.jsonFailedLookupInvalidation
Info seq  [hh:mm:ss:mss] Running: /home/src/workspaces/project/tsconfig.json
Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: /home/src/workspaces/project/tsconfig.json
Info seq  [hh:mm:ss:mss] Found 'package.json' at '/home/src/workspaces/project/node_modules/pkg2/package.json'.
Info seq  [hh:mm:ss:mss] Reusing resolution of module 'pkg0' from '/home/src/workspaces/project/randomFileForImport.ts' of old program, it was not resolved.
Info seq  [hh:mm:ss:mss] ======== Resolving type reference directive 'pkg2', containing file '/home/src/workspaces/project/randomFileForTypeRef.ts', root directory '/home/src/workspaces/project/node_modules/@types,/home/src/workspaces/node_modules/@types,/home/src/node_modules/@types,/home/node_modules/@types,/node_modules/@types'. ========
Info seq  [hh:mm:ss:mss] Resolving with primary search path '/home/src/workspaces/project/node_modules/@types, /home/src/workspaces/node_modules/@types, /home/src/node_modules/@types, /home/node_modules/@types, /node_modules/@types'.
Info seq  [hh:mm:ss:mss] Directory '/home/src/workspaces/node_modules/@types' does not exist, skipping all lookups in it.
Info seq  [hh:mm:ss:mss] Directory '/home/src/node_modules/@types' does not exist, skipping all lookups in it.
Info seq  [hh:mm:ss:mss] Directory '/home/node_modules/@types' does not exist, skipping all lookups in it.
Info seq  [hh:mm:ss:mss] Directory '/node_modules/@types' does not exist, skipping all lookups in it.
Info seq  [hh:mm:ss:mss] Looking up in 'node_modules' folder, initial location '/home/src/workspaces/project'.
Info seq  [hh:mm:ss:mss] Searching all ancestor node_modules directories for preferred extensions: Declaration.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/node_modules/pkg2/package.json' exists according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] Entering conditional exports.
Info seq  [hh:mm:ss:mss] Matched 'exports' condition 'import'.
Info seq  [hh:mm:ss:mss] Using 'exports' subpath '.' with target './import.js'.
Info seq  [hh:mm:ss:mss] File name '/home/src/workspaces/project/node_modules/pkg2/import.js' has a '.js' extension - stripping it.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/node_modules/pkg2/import.d.ts' does not exist.
Info seq  [hh:mm:ss:mss] Failed to resolve under condition 'import'.
Info seq  [hh:mm:ss:mss] Saw non-matching condition 'require'.
Info seq  [hh:mm:ss:mss] Exiting conditional exports.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/node_modules/@types/pkg2.d.ts' does not exist.
Info seq  [hh:mm:ss:mss] Directory '/home/src/workspaces/node_modules' does not exist, skipping all lookups in it.
Info seq  [hh:mm:ss:mss] Directory '/home/src/node_modules' does not exist, skipping all lookups in it.
Info seq  [hh:mm:ss:mss] Directory '/home/node_modules' does not exist, skipping all lookups in it.
Info seq  [hh:mm:ss:mss] Directory '/node_modules' does not exist, skipping all lookups in it.
Info seq  [hh:mm:ss:mss] ======== Type reference directive 'pkg2' was not resolved. ========
Info seq  [hh:mm:ss:mss] Reusing resolution of type reference directive 'pkg4' from '/home/src/workspaces/project/__inferred type names__.ts' of old program, it was successfully resolved to '/home/src/workspaces/project/node_modules/@types/pkg4/index.d.ts'.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/node_modules/@types/pkg4/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/node_modules/@types/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/node_modules/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: /home/src/workspaces/project/tsconfig.json projectStateVersion: 11 projectProgramVersion: 10 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Project '/home/src/workspaces/project/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (5)
	/home/src/tslibs/TS/Lib/lib.d.ts Text-1 "/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };"
	/home/src/workspaces/project/main.ts SVC-1-0 "export const x = 10;"
	/home/src/workspaces/project/randomFileForImport.ts Text-2 "import type { ImportInterface0 } from \"pkg0\" assert { \"resolution-mode\": \"import\" };\nexport const x = 10;"
	/home/src/workspaces/project/randomFileForTypeRef.ts Text-2 "/// <reference types=\"pkg2\" resolution-mode=\"import\"/>\nexport const x = 10;"
	/home/src/workspaces/project/node_modules/@types/pkg4/index.d.ts Text-1 "export const x = 10;"


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

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Running: *ensureProjectForOpenFiles*
Info seq  [hh:mm:ss:mss] Before ensureProjectForOpenFiles:
Info seq  [hh:mm:ss:mss] Project '/home/src/workspaces/project/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (5)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: /home/src/workspaces/project/main.ts ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /home/src/workspaces/project/tsconfig.json
Info seq  [hh:mm:ss:mss] After ensureProjectForOpenFiles:
Info seq  [hh:mm:ss:mss] Project '/home/src/workspaces/project/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (5)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: /home/src/workspaces/project/main.ts ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /home/src/workspaces/project/tsconfig.json
Info seq  [hh:mm:ss:mss] got projects updated in background /home/src/workspaces/project/main.ts
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "projectsUpdatedInBackground",
      "body": {
        "openFiles": [
          "/home/src/workspaces/project/main.ts"
        ]
      }
    }
After running Timeout callback:: count: 0

Projects::
/home/src/workspaces/project/tsconfig.json (Configured) *changed*
    projectStateVersion: 11
    projectProgramVersion: 11 *changed*
    dirty: false *changed*
