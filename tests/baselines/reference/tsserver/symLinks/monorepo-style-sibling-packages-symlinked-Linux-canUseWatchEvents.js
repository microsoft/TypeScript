Info seq  [hh:mm:ss:mss] currentDirectory:: /home/src/Vscode/Projects/bin useCaseSensitiveFileNames:: false
Info seq  [hh:mm:ss:mss] libs Location:: /home/src/tslibs/TS/Lib
Info seq  [hh:mm:ss:mss] globalTypingsCacheLocation:: /home/src/Library/Caches/typescript
Info seq  [hh:mm:ss:mss] Provided types map file "/home/src/tslibs/TS/Lib/typesMap.json" doesn't exist
Before request
//// [/home/src/projects/project/packages/package1/package.json] Inode:: 7
{
  "name": "package1",
  "version": "1.0.0",
  "main": "dist/index.js"
}

//// [/home/src/projects/project/packages/package1/tsconfig.json] Inode:: 8
{
  "compilerOptions": {
    "target": "es2016",
    "module": "commonjs",
    "rootDir": "./src",
    "declaration": true,
    "outDir": "./dist",
    "esModuleInterop": true,
    "forceConsistentCasingInFileNames": true,
    "strict": true,
    "skipLibCheck": true,
    "traceResolution": true
  },
  "exclude": [
    "tests/**/*",
    "dist/**/*"
  ]
}

//// [/home/src/projects/project/packages/package1/src/index.ts] Inode:: 10
export type FooType = "foo";
export type BarType = "bar";


//// [/home/src/projects/project/packages/package2/package.json] Inode:: 12
{
  "name": "package2",
  "version": "1.0.0",
  "main": "dist/index.js"
}

//// [/home/src/projects/project/packages/package2/tsconfig.json] Inode:: 13
{
  "compilerOptions": {
    "target": "es2016",
    "module": "commonjs",
    "rootDir": "./src",
    "declaration": true,
    "outDir": "./dist",
    "esModuleInterop": true,
    "forceConsistentCasingInFileNames": true,
    "strict": true,
    "skipLibCheck": true,
    "traceResolution": true
  },
  "exclude": [
    "tests/**/*",
    "dist/**/*"
  ]
}

//// [/home/src/projects/project/packages/package2/src/index.ts] Inode:: 15
import { FooType, BarType } from "package1"
type MyFooType = FooType;
type MyBarType = BarType;


//// [/home/src/projects/project/node_modules/package1] symlink(/home/src/projects/project/packages/package1) Inode:: 17

//// [/home/src/tslibs/TS/Lib/lib.d.ts] Inode:: 24
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
        "file": "/home/src/projects/project/packages/package2/src/index.ts"
      },
      "seq": 1,
      "type": "request"
    }
Info seq  [hh:mm:ss:mss] getConfigFileNameForFile:: File: /home/src/projects/project/packages/package2/src/index.ts ProjectRootPath: undefined:: Result: /home/src/projects/project/packages/package2/tsconfig.json
Info seq  [hh:mm:ss:mss] Creating ConfiguredProject: /home/src/projects/project/packages/package2/tsconfig.json, currentDirectory: /home/src/projects/project/packages/package2
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/projects/project/packages/package2/tsconfig.json 2000 undefined Project: /home/src/projects/project/packages/package2/tsconfig.json WatchType: Config file
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "createFileWatcher",
      "body": {
        "id": 1,
        "path": "/home/src/projects/project/packages/package2/tsconfig.json"
      }
    }
Custom watchFile:: Added:: {"id":1,"path":"/home/src/projects/project/packages/package2/tsconfig.json"}
Info seq  [hh:mm:ss:mss] Config: /home/src/projects/project/packages/package2/tsconfig.json : {
 "rootNames": [
  "/home/src/projects/project/packages/package2/src/index.ts"
 ],
 "options": {
  "target": 3,
  "module": 1,
  "rootDir": "/home/src/projects/project/packages/package2/src",
  "declaration": true,
  "outDir": "/home/src/projects/project/packages/package2/dist",
  "esModuleInterop": true,
  "forceConsistentCasingInFileNames": true,
  "strict": true,
  "skipLibCheck": true,
  "traceResolution": true,
  "configFilePath": "/home/src/projects/project/packages/package2/tsconfig.json"
 }
}
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "projectLoadingStart",
      "body": {
        "projectName": "/home/src/projects/project/packages/package2/tsconfig.json",
        "reason": "Creating possible configured project for /home/src/projects/project/packages/package2/src/index.ts to open"
      }
    }
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /home/src/projects/project/packages/package2 1 undefined Config: /home/src/projects/project/packages/package2/tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "createDirectoryWatcher",
      "body": {
        "id": 2,
        "path": "/home/src/projects/project/packages/package2",
        "recursive": true,
        "ignoreUpdate": true
      }
    }
Custom watchDirectory:: Added:: {"id":2,"path":"/home/src/projects/project/packages/package2","recursive":true,"ignoreUpdate":true}
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /home/src/projects/project/packages/package2 1 undefined Config: /home/src/projects/project/packages/package2/tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: /home/src/projects/project/packages/package2/tsconfig.json
Info seq  [hh:mm:ss:mss] ======== Resolving module 'package1' from '/home/src/projects/project/packages/package2/src/index.ts'. ========
Info seq  [hh:mm:ss:mss] Module resolution kind is not specified, using 'Node10'.
Info seq  [hh:mm:ss:mss] Loading module 'package1' from 'node_modules' folder, target file types: TypeScript, Declaration.
Info seq  [hh:mm:ss:mss] Searching all ancestor node_modules directories for preferred extensions: TypeScript, Declaration.
Info seq  [hh:mm:ss:mss] Directory '/home/src/projects/project/packages/package2/src/node_modules' does not exist, skipping all lookups in it.
Info seq  [hh:mm:ss:mss] Directory '/home/src/projects/project/packages/package2/node_modules' does not exist, skipping all lookups in it.
Info seq  [hh:mm:ss:mss] Directory '/home/src/projects/project/packages/node_modules' does not exist, skipping all lookups in it.
Info seq  [hh:mm:ss:mss] Found 'package.json' at '/home/src/projects/project/node_modules/package1/package.json'.
Info seq  [hh:mm:ss:mss] File '/home/src/projects/project/node_modules/package1.ts' does not exist.
Info seq  [hh:mm:ss:mss] File '/home/src/projects/project/node_modules/package1.tsx' does not exist.
Info seq  [hh:mm:ss:mss] File '/home/src/projects/project/node_modules/package1.d.ts' does not exist.
Info seq  [hh:mm:ss:mss] 'package.json' does not have a 'typesVersions' field.
Info seq  [hh:mm:ss:mss] 'package.json' does not have a 'typings' field.
Info seq  [hh:mm:ss:mss] 'package.json' does not have a 'types' field.
Info seq  [hh:mm:ss:mss] 'package.json' has 'main' field 'dist/index.js' that references '/home/src/projects/project/node_modules/package1/dist/index.js'.
Info seq  [hh:mm:ss:mss] File name '/home/src/projects/project/node_modules/package1/dist/index.js' has a '.js' extension - stripping it.
Info seq  [hh:mm:ss:mss] Loading module as file / folder, candidate module location '/home/src/projects/project/node_modules/package1/dist/index.js', target file types: TypeScript, Declaration.
Info seq  [hh:mm:ss:mss] File name '/home/src/projects/project/node_modules/package1/dist/index.js' has a '.js' extension - stripping it.
Info seq  [hh:mm:ss:mss] File '/home/src/projects/project/node_modules/package1/index.ts' does not exist.
Info seq  [hh:mm:ss:mss] File '/home/src/projects/project/node_modules/package1/index.tsx' does not exist.
Info seq  [hh:mm:ss:mss] File '/home/src/projects/project/node_modules/package1/index.d.ts' does not exist.
Info seq  [hh:mm:ss:mss] Directory '/home/src/projects/project/node_modules/@types' does not exist, skipping all lookups in it.
Info seq  [hh:mm:ss:mss] Directory '/home/src/projects/node_modules' does not exist, skipping all lookups in it.
Info seq  [hh:mm:ss:mss] Directory '/home/src/node_modules' does not exist, skipping all lookups in it.
Info seq  [hh:mm:ss:mss] Directory '/home/node_modules' does not exist, skipping all lookups in it.
Info seq  [hh:mm:ss:mss] Directory '/node_modules' does not exist, skipping all lookups in it.
Info seq  [hh:mm:ss:mss] Loading module 'package1' from 'node_modules' folder, target file types: JavaScript.
Info seq  [hh:mm:ss:mss] Searching all ancestor node_modules directories for fallback extensions: JavaScript.
Info seq  [hh:mm:ss:mss] Directory '/home/src/projects/project/packages/package2/src/node_modules' does not exist, skipping all lookups in it.
Info seq  [hh:mm:ss:mss] Directory '/home/src/projects/project/packages/package2/node_modules' does not exist, skipping all lookups in it.
Info seq  [hh:mm:ss:mss] Directory '/home/src/projects/project/packages/node_modules' does not exist, skipping all lookups in it.
Info seq  [hh:mm:ss:mss] File '/home/src/projects/project/node_modules/package1/package.json' exists according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/projects/project/node_modules/package1.js' does not exist.
Info seq  [hh:mm:ss:mss] File '/home/src/projects/project/node_modules/package1.jsx' does not exist.
Info seq  [hh:mm:ss:mss] 'package.json' has 'main' field 'dist/index.js' that references '/home/src/projects/project/node_modules/package1/dist/index.js'.
Info seq  [hh:mm:ss:mss] File name '/home/src/projects/project/node_modules/package1/dist/index.js' has a '.js' extension - stripping it.
Info seq  [hh:mm:ss:mss] Loading module as file / folder, candidate module location '/home/src/projects/project/node_modules/package1/dist/index.js', target file types: JavaScript.
Info seq  [hh:mm:ss:mss] File name '/home/src/projects/project/node_modules/package1/dist/index.js' has a '.js' extension - stripping it.
Info seq  [hh:mm:ss:mss] File '/home/src/projects/project/node_modules/package1/index.js' does not exist.
Info seq  [hh:mm:ss:mss] File '/home/src/projects/project/node_modules/package1/index.jsx' does not exist.
Info seq  [hh:mm:ss:mss] Directory '/home/src/projects/node_modules' does not exist, skipping all lookups in it.
Info seq  [hh:mm:ss:mss] Directory '/home/src/node_modules' does not exist, skipping all lookups in it.
Info seq  [hh:mm:ss:mss] Directory '/home/node_modules' does not exist, skipping all lookups in it.
Info seq  [hh:mm:ss:mss] Directory '/node_modules' does not exist, skipping all lookups in it.
Info seq  [hh:mm:ss:mss] Resolution of non-relative name failed; trying with '--moduleResolution bundler' to see if project may need configuration update.
Info seq  [hh:mm:ss:mss] Loading module 'package1' from 'node_modules' folder, target file types: TypeScript, Declaration.
Info seq  [hh:mm:ss:mss] Searching all ancestor node_modules directories for preferred extensions: TypeScript, Declaration.
Info seq  [hh:mm:ss:mss] Directory '/home/src/projects/project/packages/package2/src/node_modules' does not exist, skipping all lookups in it.
Info seq  [hh:mm:ss:mss] Directory '/home/src/projects/project/packages/package2/node_modules' does not exist, skipping all lookups in it.
Info seq  [hh:mm:ss:mss] Directory '/home/src/projects/project/packages/node_modules' does not exist, skipping all lookups in it.
Info seq  [hh:mm:ss:mss] File '/home/src/projects/project/node_modules/package1/package.json' exists according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/projects/project/node_modules/package1.ts' does not exist.
Info seq  [hh:mm:ss:mss] File '/home/src/projects/project/node_modules/package1.tsx' does not exist.
Info seq  [hh:mm:ss:mss] File '/home/src/projects/project/node_modules/package1.d.ts' does not exist.
Info seq  [hh:mm:ss:mss] 'package.json' does not have a 'typings' field.
Info seq  [hh:mm:ss:mss] 'package.json' does not have a 'types' field.
Info seq  [hh:mm:ss:mss] 'package.json' has 'main' field 'dist/index.js' that references '/home/src/projects/project/node_modules/package1/dist/index.js'.
Info seq  [hh:mm:ss:mss] File name '/home/src/projects/project/node_modules/package1/dist/index.js' has a '.js' extension - stripping it.
Info seq  [hh:mm:ss:mss] Loading module as file / folder, candidate module location '/home/src/projects/project/node_modules/package1/dist/index.js', target file types: TypeScript, Declaration.
Info seq  [hh:mm:ss:mss] File name '/home/src/projects/project/node_modules/package1/dist/index.js' has a '.js' extension - stripping it.
Info seq  [hh:mm:ss:mss] File '/home/src/projects/project/node_modules/package1/index.ts' does not exist.
Info seq  [hh:mm:ss:mss] File '/home/src/projects/project/node_modules/package1/index.tsx' does not exist.
Info seq  [hh:mm:ss:mss] File '/home/src/projects/project/node_modules/package1/index.d.ts' does not exist.
Info seq  [hh:mm:ss:mss] Directory '/home/src/projects/project/node_modules/@types' does not exist, skipping all lookups in it.
Info seq  [hh:mm:ss:mss] Directory '/home/src/projects/node_modules' does not exist, skipping all lookups in it.
Info seq  [hh:mm:ss:mss] Directory '/home/src/node_modules' does not exist, skipping all lookups in it.
Info seq  [hh:mm:ss:mss] Directory '/home/node_modules' does not exist, skipping all lookups in it.
Info seq  [hh:mm:ss:mss] Directory '/node_modules' does not exist, skipping all lookups in it.
Info seq  [hh:mm:ss:mss] ======== Module name 'package1' was not resolved. ========
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/tslibs/TS/Lib/lib.es2016.full.d.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "createFileWatcher",
      "body": {
        "id": 3,
        "path": "/home/src/tslibs/TS/Lib/lib.es2016.full.d.ts"
      }
    }
Custom watchFile:: Added:: {"id":3,"path":"/home/src/tslibs/TS/Lib/lib.es2016.full.d.ts"}
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /home/src/projects/project/packages/package2/src 1 undefined Project: /home/src/projects/project/packages/package2/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "createDirectoryWatcher",
      "body": {
        "id": 4,
        "path": "/home/src/projects/project/packages/package2/src",
        "recursive": true,
        "ignoreUpdate": true
      }
    }
Custom watchDirectory:: Added:: {"id":4,"path":"/home/src/projects/project/packages/package2/src","recursive":true,"ignoreUpdate":true}
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /home/src/projects/project/packages/package2/src 1 undefined Project: /home/src/projects/project/packages/package2/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /home/src/projects/project/packages/package2/node_modules 1 undefined Project: /home/src/projects/project/packages/package2/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "createDirectoryWatcher",
      "body": {
        "id": 5,
        "path": "/home/src/projects/project/packages/package2/node_modules",
        "recursive": true
      }
    }
Custom watchDirectory:: Added:: {"id":5,"path":"/home/src/projects/project/packages/package2/node_modules","recursive":true}
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /home/src/projects/project/packages/package2/node_modules 1 undefined Project: /home/src/projects/project/packages/package2/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /home/src/projects/project/packages/node_modules 1 undefined Project: /home/src/projects/project/packages/package2/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "createDirectoryWatcher",
      "body": {
        "id": 6,
        "path": "/home/src/projects/project/packages/node_modules",
        "recursive": true
      }
    }
Custom watchDirectory:: Added:: {"id":6,"path":"/home/src/projects/project/packages/node_modules","recursive":true}
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /home/src/projects/project/packages/node_modules 1 undefined Project: /home/src/projects/project/packages/package2/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /home/src/projects/project/node_modules 1 undefined Project: /home/src/projects/project/packages/package2/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "createDirectoryWatcher",
      "body": {
        "id": 7,
        "path": "/home/src/projects/project/node_modules",
        "recursive": true
      }
    }
Custom watchDirectory:: Added:: {"id":7,"path":"/home/src/projects/project/node_modules","recursive":true}
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /home/src/projects/project/node_modules 1 undefined Project: /home/src/projects/project/packages/package2/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /home/src/projects/project/node_modules/package1 1 undefined Project: /home/src/projects/project/packages/package2/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "createDirectoryWatcher",
      "body": {
        "id": 8,
        "path": "/home/src/projects/project/node_modules/package1",
        "recursive": true,
        "ignoreUpdate": true
      }
    }
Custom watchDirectory:: Added:: {"id":8,"path":"/home/src/projects/project/node_modules/package1","recursive":true,"ignoreUpdate":true}
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /home/src/projects/project/node_modules/package1 1 undefined Project: /home/src/projects/project/packages/package2/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /home/src/projects/node_modules 1 undefined Project: /home/src/projects/project/packages/package2/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "createDirectoryWatcher",
      "body": {
        "id": 9,
        "path": "/home/src/projects/node_modules",
        "recursive": true
      }
    }
Custom watchDirectory:: Added:: {"id":9,"path":"/home/src/projects/node_modules","recursive":true}
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /home/src/projects/node_modules 1 undefined Project: /home/src/projects/project/packages/package2/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/projects/project/packages/package1/package.json 2000 undefined Project: /home/src/projects/project/packages/package2/tsconfig.json WatchType: File location affecting resolution
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "createFileWatcher",
      "body": {
        "id": 10,
        "path": "/home/src/projects/project/packages/package1/package.json"
      }
    }
Custom watchFile:: Added:: {"id":10,"path":"/home/src/projects/project/packages/package1/package.json"}
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /home/src/projects/project/packages/package2/node_modules/@types 1 undefined Project: /home/src/projects/project/packages/package2/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "createDirectoryWatcher",
      "body": {
        "id": 11,
        "path": "/home/src/projects/project/packages/package2/node_modules/@types",
        "recursive": true,
        "ignoreUpdate": true
      }
    }
Custom watchDirectory:: Added:: {"id":11,"path":"/home/src/projects/project/packages/package2/node_modules/@types","recursive":true,"ignoreUpdate":true}
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /home/src/projects/project/packages/package2/node_modules/@types 1 undefined Project: /home/src/projects/project/packages/package2/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /home/src/projects/project/packages/node_modules/@types 1 undefined Project: /home/src/projects/project/packages/package2/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "createDirectoryWatcher",
      "body": {
        "id": 12,
        "path": "/home/src/projects/project/packages/node_modules/@types",
        "recursive": true,
        "ignoreUpdate": true
      }
    }
Custom watchDirectory:: Added:: {"id":12,"path":"/home/src/projects/project/packages/node_modules/@types","recursive":true,"ignoreUpdate":true}
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /home/src/projects/project/packages/node_modules/@types 1 undefined Project: /home/src/projects/project/packages/package2/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /home/src/projects/project/node_modules/@types 1 undefined Project: /home/src/projects/project/packages/package2/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "createDirectoryWatcher",
      "body": {
        "id": 13,
        "path": "/home/src/projects/project/node_modules/@types",
        "recursive": true,
        "ignoreUpdate": true
      }
    }
Custom watchDirectory:: Added:: {"id":13,"path":"/home/src/projects/project/node_modules/@types","recursive":true,"ignoreUpdate":true}
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /home/src/projects/project/node_modules/@types 1 undefined Project: /home/src/projects/project/packages/package2/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /home/src/projects/node_modules/@types 1 undefined Project: /home/src/projects/project/packages/package2/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "createDirectoryWatcher",
      "body": {
        "id": 14,
        "path": "/home/src/projects/node_modules/@types",
        "recursive": true,
        "ignoreUpdate": true
      }
    }
Custom watchDirectory:: Added:: {"id":14,"path":"/home/src/projects/node_modules/@types","recursive":true,"ignoreUpdate":true}
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /home/src/projects/node_modules/@types 1 undefined Project: /home/src/projects/project/packages/package2/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: /home/src/projects/project/packages/package2/tsconfig.json projectStateVersion: 1 projectProgramVersion: 0 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Project '/home/src/projects/project/packages/package2/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (2)
	/home/src/tslibs/TS/Lib/lib.es2016.full.d.ts Text-1 "/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };"
	/home/src/projects/project/packages/package2/src/index.ts SVC-1-0 "import { FooType, BarType } from \"package1\"\ntype MyFooType = FooType;\ntype MyBarType = BarType;\n"


	../../../../tslibs/TS/Lib/lib.es2016.full.d.ts
	  Default library for target 'es2016'
	src/index.ts
	  Matched by default include pattern '**/*'

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/projects/project/packages/package2/package.json 250 undefined WatchType: package.json file
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "createFileWatcher",
      "body": {
        "id": 15,
        "path": "/home/src/projects/project/packages/package2/package.json"
      }
    }
Custom watchFile:: Added:: {"id":15,"path":"/home/src/projects/project/packages/package2/package.json"}
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "projectLoadingFinish",
      "body": {
        "projectName": "/home/src/projects/project/packages/package2/tsconfig.json"
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
          "projectId": "ea5f481e94c49fb42598a3c215bcc11e07909e9a8e3f7531a3ca8575d320cf6e",
          "fileStats": {
            "js": 0,
            "jsSize": 0,
            "jsx": 0,
            "jsxSize": 0,
            "ts": 1,
            "tsSize": 96,
            "tsx": 0,
            "tsxSize": 0,
            "dts": 1,
            "dtsSize": 413,
            "deferred": 0,
            "deferredSize": 0
          },
          "compilerOptions": {
            "target": "es2016",
            "module": "commonjs",
            "rootDir": "",
            "declaration": true,
            "outDir": "",
            "esModuleInterop": true,
            "forceConsistentCasingInFileNames": true,
            "strict": true,
            "skipLibCheck": true,
            "traceResolution": true
          },
          "typeAcquisition": {
            "enable": false,
            "include": false,
            "exclude": false
          },
          "extends": false,
          "files": false,
          "include": false,
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
        "triggerFile": "/home/src/projects/project/packages/package2/src/index.ts",
        "configFile": "/home/src/projects/project/packages/package2/tsconfig.json",
        "diagnostics": []
      }
    }
Info seq  [hh:mm:ss:mss] Project '/home/src/projects/project/packages/package2/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (2)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: /home/src/projects/project/packages/package2/src/index.ts ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /home/src/projects/project/packages/package2/tsconfig.json
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
//// [/home/src/tslibs/TS/Lib/lib.es2016.full.d.ts] *Lib* Inode:: 34


PolledWatches::
/home/src/projects/project/packages/package1/package.json: *new*
  {"event":{"id":10,"path":"/home/src/projects/project/packages/package1/package.json"}}
/home/src/projects/project/packages/package2/package.json: *new*
  {"event":{"id":15,"path":"/home/src/projects/project/packages/package2/package.json"}}
/home/src/projects/project/packages/package2/tsconfig.json: *new*
  {"event":{"id":1,"path":"/home/src/projects/project/packages/package2/tsconfig.json"}}
/home/src/tslibs/TS/Lib/lib.es2016.full.d.ts: *new*
  {"event":{"id":3,"path":"/home/src/tslibs/TS/Lib/lib.es2016.full.d.ts"}}

FsWatchesRecursive::
/home/src/projects/node_modules: *new*
  {"event":{"id":9,"path":"/home/src/projects/node_modules","recursive":true}}
/home/src/projects/node_modules/@types: *new*
  {"event":{"id":14,"path":"/home/src/projects/node_modules/@types","recursive":true,"ignoreUpdate":true}}
/home/src/projects/project/node_modules: *new*
  {"event":{"id":7,"path":"/home/src/projects/project/node_modules","recursive":true}}
/home/src/projects/project/node_modules/@types: *new*
  {"event":{"id":13,"path":"/home/src/projects/project/node_modules/@types","recursive":true,"ignoreUpdate":true}}
/home/src/projects/project/node_modules/package1: *new*
  {"event":{"id":8,"path":"/home/src/projects/project/node_modules/package1","recursive":true,"ignoreUpdate":true}}
/home/src/projects/project/packages/node_modules: *new*
  {"event":{"id":6,"path":"/home/src/projects/project/packages/node_modules","recursive":true}}
/home/src/projects/project/packages/node_modules/@types: *new*
  {"event":{"id":12,"path":"/home/src/projects/project/packages/node_modules/@types","recursive":true,"ignoreUpdate":true}}
/home/src/projects/project/packages/package2: *new*
  {"event":{"id":2,"path":"/home/src/projects/project/packages/package2","recursive":true,"ignoreUpdate":true}}
/home/src/projects/project/packages/package2/node_modules: *new*
  {"event":{"id":5,"path":"/home/src/projects/project/packages/package2/node_modules","recursive":true}}
/home/src/projects/project/packages/package2/node_modules/@types: *new*
  {"event":{"id":11,"path":"/home/src/projects/project/packages/package2/node_modules/@types","recursive":true,"ignoreUpdate":true}}
/home/src/projects/project/packages/package2/src: *new*
  {"event":{"id":4,"path":"/home/src/projects/project/packages/package2/src","recursive":true,"ignoreUpdate":true}}

Projects::
/home/src/projects/project/packages/package2/tsconfig.json (Configured) *new*
    projectStateVersion: 1
    projectProgramVersion: 1
    autoImportProviderHost: false

ScriptInfos::
/home/src/projects/project/packages/package2/src/index.ts (Open) *new*
    version: SVC-1-0
    containingProjects: 1
        /home/src/projects/project/packages/package2/tsconfig.json *default*
/home/src/tslibs/TS/Lib/lib.es2016.full.d.ts *new*
    version: Text-1
    containingProjects: 1
        /home/src/projects/project/packages/package2/tsconfig.json

Before request

Info seq  [hh:mm:ss:mss] request:
    {
      "command": "geterr",
      "arguments": {
        "delay": 0,
        "files": [
          "/home/src/projects/project/packages/package2/src/index.ts"
        ]
      },
      "seq": 2,
      "type": "request"
    }
After request

Timeout callback:: count: 1
1: checkOne *new*

Before running Timeout callback:: count: 1
1: checkOne

Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "syntaxDiag",
      "body": {
        "file": "/home/src/projects/project/packages/package2/src/index.ts",
        "diagnostics": []
      }
    }
After running Timeout callback:: count: 0

Immedidate callback:: count: 1
1: semanticCheck *new*

Before running Immedidate callback:: count: 1
1: semanticCheck

Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "semanticDiag",
      "body": {
        "file": "/home/src/projects/project/packages/package2/src/index.ts",
        "diagnostics": [
          {
            "start": {
              "line": 1,
              "offset": 34
            },
            "end": {
              "line": 1,
              "offset": 44
            },
            "text": "Cannot find module 'package1' or its corresponding type declarations.",
            "code": 2307,
            "category": "error"
          }
        ]
      }
    }
After running Immedidate callback:: count: 1

Immedidate callback:: count: 1
2: suggestionCheck *new*

Before running Immedidate callback:: count: 1
2: suggestionCheck

Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "suggestionDiag",
      "body": {
        "file": "/home/src/projects/project/packages/package2/src/index.ts",
        "diagnostics": [
          {
            "start": {
              "line": 2,
              "offset": 6
            },
            "end": {
              "line": 2,
              "offset": 15
            },
            "text": "'MyFooType' is declared but never used.",
            "code": 6196,
            "category": "suggestion",
            "reportsUnnecessary": true
          },
          {
            "start": {
              "line": 3,
              "offset": 6
            },
            "end": {
              "line": 3,
              "offset": 15
            },
            "text": "'MyBarType' is declared but never used.",
            "code": 6196,
            "category": "suggestion",
            "reportsUnnecessary": true
          }
        ]
      }
    }
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "requestCompleted",
      "body": {
        "request_seq": 2,
        "performanceData": {
          "diagnosticsDuration": [
            {
              "syntaxDiag": *,
              "semanticDiag": *,
              "suggestionDiag": *,
              "file": "/home/src/projects/project/packages/package2/src/index.ts"
            }
          ]
        }
      }
    }
After running Immedidate callback:: count: 0

Build dependencies
Custom watchDirectory:: Triggered Ignored:: {"id":8,"path":"/home/src/projects/project/node_modules/package1","recursive":true,"ignoreUpdate":true}:: /home/src/projects/project/node_modules/package1/dist created
Custom watchDirectory:: Triggered Ignored:: {"id":8,"path":"/home/src/projects/project/node_modules/package1","recursive":true,"ignoreUpdate":true}:: /home/src/projects/project/node_modules/package1/dist updated
Custom watchDirectory:: Triggered Ignored:: {"id":8,"path":"/home/src/projects/project/node_modules/package1","recursive":true,"ignoreUpdate":true}:: /home/src/projects/project/node_modules/package1/dist/index.js created
Custom watchDirectory:: Triggered Ignored:: {"id":8,"path":"/home/src/projects/project/node_modules/package1","recursive":true,"ignoreUpdate":true}:: /home/src/projects/project/node_modules/package1/dist/index.js updated
Custom watchDirectory:: Triggered Ignored:: {"id":8,"path":"/home/src/projects/project/node_modules/package1","recursive":true,"ignoreUpdate":true}:: /home/src/projects/project/node_modules/package1/dist updated
Custom watchDirectory:: Triggered Ignored:: {"id":8,"path":"/home/src/projects/project/node_modules/package1","recursive":true,"ignoreUpdate":true}:: /home/src/projects/project/node_modules/package1/dist/index.d.ts created
Custom watchDirectory:: Triggered Ignored:: {"id":8,"path":"/home/src/projects/project/node_modules/package1","recursive":true,"ignoreUpdate":true}:: /home/src/projects/project/node_modules/package1/dist/index.d.ts updated
Custom watchDirectory:: Triggered Ignored:: {"id":8,"path":"/home/src/projects/project/node_modules/package1","recursive":true,"ignoreUpdate":true}:: /home/src/projects/project/node_modules/package1/dist updated
Custom watchDirectory:: Triggered Ignored:: {"id":8,"path":"/home/src/projects/project/node_modules/package1","recursive":true,"ignoreUpdate":true}:: /home/src/projects/project/node_modules/package1/tsconfig.tsbuildinfo created
Custom watchDirectory:: Triggered Ignored:: {"id":8,"path":"/home/src/projects/project/node_modules/package1","recursive":true,"ignoreUpdate":true}:: /home/src/projects/project/node_modules/package1/tsconfig.tsbuildinfo updated
Custom watchDirectory:: Triggered Ignored:: {"id":8,"path":"/home/src/projects/project/node_modules/package1","recursive":true,"ignoreUpdate":true}:: /home/src/projects/project/node_modules/package1/tsconfig.tsbuildinfo.readable.baseline.txt created
Custom watchDirectory:: Triggered Ignored:: {"id":8,"path":"/home/src/projects/project/node_modules/package1","recursive":true,"ignoreUpdate":true}:: /home/src/projects/project/node_modules/package1/tsconfig.tsbuildinfo.readable.baseline.txt updated
Before request
//// [/home/src/projects/project/packages/package1/dist/index.js] Inode:: 123
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });


//// [/home/src/projects/project/packages/package1/dist/index.d.ts] Inode:: 124
export type FooType = "foo";
export type BarType = "bar";


//// [/home/src/projects/project/packages/package1/tsconfig.tsbuildinfo] Inode:: 125
{"root":["./src/index.ts"],"version":"FakeTSVersion"}

//// [/home/src/projects/project/packages/package1/tsconfig.tsbuildinfo.readable.baseline.txt] Inode:: 126
{
  "root": [
    "./src/index.ts"
  ],
  "version": "FakeTSVersion",
  "size": 53
}


Info seq  [hh:mm:ss:mss] request:
    {
      "command": "watchChange",
      "arguments": {
        "id": 8,
        "created": [
          "/home/src/projects/project/node_modules/package1/dist",
          "/home/src/projects/project/node_modules/package1/dist/index.js",
          "/home/src/projects/project/node_modules/package1/dist/index.d.ts",
          "/home/src/projects/project/node_modules/package1/tsconfig.tsbuildinfo",
          "/home/src/projects/project/node_modules/package1/tsconfig.tsbuildinfo.readable.baseline.txt"
        ]
      },
      "seq": 3,
      "type": "request"
    }
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Triggered with /home/src/projects/project/node_modules/package1/dist :: WatchInfo: /home/src/projects/project/node_modules/package1 1 undefined Project: /home/src/projects/project/packages/package2/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Scheduled: /home/src/projects/project/packages/package2/tsconfig.jsonFailedLookupInvalidation
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Triggered with /home/src/projects/project/node_modules/package1/dist :: WatchInfo: /home/src/projects/project/node_modules/package1 1 undefined Project: /home/src/projects/project/packages/package2/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Triggered with /home/src/projects/project/node_modules/package1/dist/index.js :: WatchInfo: /home/src/projects/project/node_modules/package1 1 undefined Project: /home/src/projects/project/packages/package2/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Scheduled: /home/src/projects/project/packages/package2/tsconfig.jsonFailedLookupInvalidation, Cancelled earlier one
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Triggered with /home/src/projects/project/node_modules/package1/dist/index.js :: WatchInfo: /home/src/projects/project/node_modules/package1 1 undefined Project: /home/src/projects/project/packages/package2/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Triggered with /home/src/projects/project/node_modules/package1/dist/index.d.ts :: WatchInfo: /home/src/projects/project/node_modules/package1 1 undefined Project: /home/src/projects/project/packages/package2/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Scheduled: /home/src/projects/project/packages/package2/tsconfig.jsonFailedLookupInvalidation, Cancelled earlier one
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Triggered with /home/src/projects/project/node_modules/package1/dist/index.d.ts :: WatchInfo: /home/src/projects/project/node_modules/package1 1 undefined Project: /home/src/projects/project/packages/package2/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Triggered with /home/src/projects/project/node_modules/package1/tsconfig.tsbuildinfo :: WatchInfo: /home/src/projects/project/node_modules/package1 1 undefined Project: /home/src/projects/project/packages/package2/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Scheduled: /home/src/projects/project/packages/package2/tsconfig.jsonFailedLookupInvalidation, Cancelled earlier one
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Triggered with /home/src/projects/project/node_modules/package1/tsconfig.tsbuildinfo :: WatchInfo: /home/src/projects/project/node_modules/package1 1 undefined Project: /home/src/projects/project/packages/package2/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Triggered with /home/src/projects/project/node_modules/package1/tsconfig.tsbuildinfo.readable.baseline.txt :: WatchInfo: /home/src/projects/project/node_modules/package1 1 undefined Project: /home/src/projects/project/packages/package2/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Scheduled: /home/src/projects/project/packages/package2/tsconfig.jsonFailedLookupInvalidation, Cancelled earlier one
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Triggered with /home/src/projects/project/node_modules/package1/tsconfig.tsbuildinfo.readable.baseline.txt :: WatchInfo: /home/src/projects/project/node_modules/package1 1 undefined Project: /home/src/projects/project/packages/package2/tsconfig.json WatchType: Failed Lookup Locations
After request

Timeout callback:: count: 1
6: /home/src/projects/project/packages/package2/tsconfig.jsonFailedLookupInvalidation *new*

Before running Timeout callback:: count: 1
6: /home/src/projects/project/packages/package2/tsconfig.jsonFailedLookupInvalidation

Info seq  [hh:mm:ss:mss] Running: /home/src/projects/project/packages/package2/tsconfig.jsonFailedLookupInvalidation
Info seq  [hh:mm:ss:mss] Scheduled: /home/src/projects/project/packages/package2/tsconfig.json
Info seq  [hh:mm:ss:mss] Scheduled: *ensureProjectForOpenFiles*
After running Timeout callback:: count: 2

Timeout callback:: count: 2
7: /home/src/projects/project/packages/package2/tsconfig.json *new*
8: *ensureProjectForOpenFiles* *new*

Projects::
/home/src/projects/project/packages/package2/tsconfig.json (Configured) *changed*
    projectStateVersion: 2 *changed*
    projectProgramVersion: 1
    dirty: true *changed*
    autoImportProviderHost: false

Before running Timeout callback:: count: 2
7: /home/src/projects/project/packages/package2/tsconfig.json
8: *ensureProjectForOpenFiles*

Info seq  [hh:mm:ss:mss] Running: /home/src/projects/project/packages/package2/tsconfig.json
Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: /home/src/projects/project/packages/package2/tsconfig.json
Info seq  [hh:mm:ss:mss] ======== Resolving module 'package1' from '/home/src/projects/project/packages/package2/src/index.ts'. ========
Info seq  [hh:mm:ss:mss] Module resolution kind is not specified, using 'Node10'.
Info seq  [hh:mm:ss:mss] Loading module 'package1' from 'node_modules' folder, target file types: TypeScript, Declaration.
Info seq  [hh:mm:ss:mss] Searching all ancestor node_modules directories for preferred extensions: TypeScript, Declaration.
Info seq  [hh:mm:ss:mss] Directory '/home/src/projects/project/packages/package2/src/node_modules' does not exist, skipping all lookups in it.
Info seq  [hh:mm:ss:mss] Directory '/home/src/projects/project/packages/package2/node_modules' does not exist, skipping all lookups in it.
Info seq  [hh:mm:ss:mss] Directory '/home/src/projects/project/packages/node_modules' does not exist, skipping all lookups in it.
Info seq  [hh:mm:ss:mss] Found 'package.json' at '/home/src/projects/project/node_modules/package1/package.json'.
Info seq  [hh:mm:ss:mss] File '/home/src/projects/project/node_modules/package1.ts' does not exist.
Info seq  [hh:mm:ss:mss] File '/home/src/projects/project/node_modules/package1.tsx' does not exist.
Info seq  [hh:mm:ss:mss] File '/home/src/projects/project/node_modules/package1.d.ts' does not exist.
Info seq  [hh:mm:ss:mss] 'package.json' does not have a 'typesVersions' field.
Info seq  [hh:mm:ss:mss] 'package.json' does not have a 'typings' field.
Info seq  [hh:mm:ss:mss] 'package.json' does not have a 'types' field.
Info seq  [hh:mm:ss:mss] 'package.json' has 'main' field 'dist/index.js' that references '/home/src/projects/project/node_modules/package1/dist/index.js'.
Info seq  [hh:mm:ss:mss] File name '/home/src/projects/project/node_modules/package1/dist/index.js' has a '.js' extension - stripping it.
Info seq  [hh:mm:ss:mss] File '/home/src/projects/project/node_modules/package1/dist/index.ts' does not exist.
Info seq  [hh:mm:ss:mss] File '/home/src/projects/project/node_modules/package1/dist/index.tsx' does not exist.
Info seq  [hh:mm:ss:mss] File '/home/src/projects/project/node_modules/package1/dist/index.d.ts' exists - use it as a name resolution result.
Info seq  [hh:mm:ss:mss] 'package.json' does not have a 'peerDependencies' field.
Info seq  [hh:mm:ss:mss] Resolving real path for '/home/src/projects/project/node_modules/package1/dist/index.d.ts', result '/home/src/projects/project/packages/package1/dist/index.d.ts'.
Info seq  [hh:mm:ss:mss] ======== Module name 'package1' was successfully resolved to '/home/src/projects/project/packages/package1/dist/index.d.ts' with Package ID 'package1/dist/index.d.ts@1.0.0'. ========
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/projects/project/packages/package1/dist/index.d.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "createFileWatcher",
      "body": {
        "id": 16,
        "path": "/home/src/projects/project/packages/package1/dist/index.d.ts"
      }
    }
Custom watchFile:: Added:: {"id":16,"path":"/home/src/projects/project/packages/package1/dist/index.d.ts"}
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Close:: WatchInfo: /home/src/projects/node_modules 1 undefined Project: /home/src/projects/project/packages/package2/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "closeFileWatcher",
      "body": {
        "id": 9
      }
    }
Custom watchDirectory:: Close:: {"id":9,"path":"/home/src/projects/node_modules","recursive":true}
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Close:: WatchInfo: /home/src/projects/node_modules 1 undefined Project: /home/src/projects/project/packages/package2/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: /home/src/projects/project/packages/package2/tsconfig.json projectStateVersion: 2 projectProgramVersion: 1 structureChanged: true structureIsReused:: SafeModules Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Project '/home/src/projects/project/packages/package2/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (3)
	/home/src/tslibs/TS/Lib/lib.es2016.full.d.ts Text-1 "/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };"
	/home/src/projects/project/packages/package1/dist/index.d.ts Text-1 "export type FooType = \"foo\";\nexport type BarType = \"bar\";\n"
	/home/src/projects/project/packages/package2/src/index.ts SVC-1-0 "import { FooType, BarType } from \"package1\"\ntype MyFooType = FooType;\ntype MyBarType = BarType;\n"


	../../../../tslibs/TS/Lib/lib.es2016.full.d.ts
	  Default library for target 'es2016'
	../package1/dist/index.d.ts
	  Imported via "package1" from file 'src/index.ts' with packageId 'package1/dist/index.d.ts@1.0.0'
	src/index.ts
	  Matched by default include pattern '**/*'

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Running: *ensureProjectForOpenFiles*
Info seq  [hh:mm:ss:mss] Before ensureProjectForOpenFiles:
Info seq  [hh:mm:ss:mss] Project '/home/src/projects/project/packages/package2/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (3)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: /home/src/projects/project/packages/package2/src/index.ts ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /home/src/projects/project/packages/package2/tsconfig.json
Info seq  [hh:mm:ss:mss] After ensureProjectForOpenFiles:
Info seq  [hh:mm:ss:mss] Project '/home/src/projects/project/packages/package2/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (3)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: /home/src/projects/project/packages/package2/src/index.ts ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /home/src/projects/project/packages/package2/tsconfig.json
Info seq  [hh:mm:ss:mss] got projects updated in background /home/src/projects/project/packages/package2/src/index.ts
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "projectsUpdatedInBackground",
      "body": {
        "openFiles": [
          "/home/src/projects/project/packages/package2/src/index.ts"
        ]
      }
    }
After running Timeout callback:: count: 0

PolledWatches::
/home/src/projects/project/packages/package1/dist/index.d.ts: *new*
  {"event":{"id":16,"path":"/home/src/projects/project/packages/package1/dist/index.d.ts"}}
/home/src/projects/project/packages/package1/package.json:
  {"event":{"id":10,"path":"/home/src/projects/project/packages/package1/package.json"}}
/home/src/projects/project/packages/package2/package.json:
  {"event":{"id":15,"path":"/home/src/projects/project/packages/package2/package.json"}}
/home/src/projects/project/packages/package2/tsconfig.json:
  {"event":{"id":1,"path":"/home/src/projects/project/packages/package2/tsconfig.json"}}
/home/src/tslibs/TS/Lib/lib.es2016.full.d.ts:
  {"event":{"id":3,"path":"/home/src/tslibs/TS/Lib/lib.es2016.full.d.ts"}}

FsWatchesRecursive::
/home/src/projects/node_modules/@types:
  {"event":{"id":14,"path":"/home/src/projects/node_modules/@types","recursive":true,"ignoreUpdate":true}}
/home/src/projects/project/node_modules:
  {"event":{"id":7,"path":"/home/src/projects/project/node_modules","recursive":true}}
/home/src/projects/project/node_modules/@types:
  {"event":{"id":13,"path":"/home/src/projects/project/node_modules/@types","recursive":true,"ignoreUpdate":true}}
/home/src/projects/project/node_modules/package1:
  {"event":{"id":8,"path":"/home/src/projects/project/node_modules/package1","recursive":true,"ignoreUpdate":true}}
/home/src/projects/project/packages/node_modules:
  {"event":{"id":6,"path":"/home/src/projects/project/packages/node_modules","recursive":true}}
/home/src/projects/project/packages/node_modules/@types:
  {"event":{"id":12,"path":"/home/src/projects/project/packages/node_modules/@types","recursive":true,"ignoreUpdate":true}}
/home/src/projects/project/packages/package2:
  {"event":{"id":2,"path":"/home/src/projects/project/packages/package2","recursive":true,"ignoreUpdate":true}}
/home/src/projects/project/packages/package2/node_modules:
  {"event":{"id":5,"path":"/home/src/projects/project/packages/package2/node_modules","recursive":true}}
/home/src/projects/project/packages/package2/node_modules/@types:
  {"event":{"id":11,"path":"/home/src/projects/project/packages/package2/node_modules/@types","recursive":true,"ignoreUpdate":true}}
/home/src/projects/project/packages/package2/src:
  {"event":{"id":4,"path":"/home/src/projects/project/packages/package2/src","recursive":true,"ignoreUpdate":true}}

FsWatchesRecursive *deleted*::
/home/src/projects/node_modules:
  {"event":{"id":9,"path":"/home/src/projects/node_modules","recursive":true}}

Projects::
/home/src/projects/project/packages/package2/tsconfig.json (Configured) *changed*
    projectStateVersion: 2
    projectProgramVersion: 2 *changed*
    dirty: false *changed*
    autoImportProviderHost: undefined *changed*

ScriptInfos::
/home/src/projects/project/packages/package1/dist/index.d.ts *new*
    version: Text-1
    containingProjects: 1
        /home/src/projects/project/packages/package2/tsconfig.json
/home/src/projects/project/packages/package2/src/index.ts (Open)
    version: SVC-1-0
    containingProjects: 1
        /home/src/projects/project/packages/package2/tsconfig.json *default*
/home/src/tslibs/TS/Lib/lib.es2016.full.d.ts
    version: Text-1
    containingProjects: 1
        /home/src/projects/project/packages/package2/tsconfig.json

Before running Timeout callback:: count: 0

After running Timeout callback:: count: 0

Before request

Info seq  [hh:mm:ss:mss] request:
    {
      "command": "geterr",
      "arguments": {
        "delay": 0,
        "files": [
          "/home/src/projects/project/packages/package2/src/index.ts"
        ]
      },
      "seq": 4,
      "type": "request"
    }
After request

Timeout callback:: count: 1
9: checkOne *new*

Before running Timeout callback:: count: 1
9: checkOne

Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "syntaxDiag",
      "body": {
        "file": "/home/src/projects/project/packages/package2/src/index.ts",
        "diagnostics": []
      }
    }
After running Timeout callback:: count: 0

Immedidate callback:: count: 1
3: semanticCheck *new*

Before running Immedidate callback:: count: 1
3: semanticCheck

Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "semanticDiag",
      "body": {
        "file": "/home/src/projects/project/packages/package2/src/index.ts",
        "diagnostics": []
      }
    }
After running Immedidate callback:: count: 1

Immedidate callback:: count: 1
4: suggestionCheck *new*

Before running Immedidate callback:: count: 1
4: suggestionCheck

Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "suggestionDiag",
      "body": {
        "file": "/home/src/projects/project/packages/package2/src/index.ts",
        "diagnostics": [
          {
            "start": {
              "line": 2,
              "offset": 6
            },
            "end": {
              "line": 2,
              "offset": 15
            },
            "text": "'MyFooType' is declared but never used.",
            "code": 6196,
            "category": "suggestion",
            "reportsUnnecessary": true
          },
          {
            "start": {
              "line": 3,
              "offset": 6
            },
            "end": {
              "line": 3,
              "offset": 15
            },
            "text": "'MyBarType' is declared but never used.",
            "code": 6196,
            "category": "suggestion",
            "reportsUnnecessary": true
          }
        ]
      }
    }
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "requestCompleted",
      "body": {
        "request_seq": 4,
        "performanceData": {
          "diagnosticsDuration": [
            {
              "syntaxDiag": *,
              "semanticDiag": *,
              "suggestionDiag": *,
              "file": "/home/src/projects/project/packages/package2/src/index.ts"
            }
          ]
        }
      }
    }
After running Immedidate callback:: count: 0

Clean dependencies build
Custom watchFile:: Triggered:: {"id":16,"path":"/home/src/projects/project/packages/package1/dist/index.d.ts"}:: /home/src/projects/project/packages/package1/dist/index.d.ts deleted
Custom watchDirectory:: Triggered Ignored:: {"id":8,"path":"/home/src/projects/project/node_modules/package1","recursive":true,"ignoreUpdate":true}:: /home/src/projects/project/node_modules/package1/dist/index.d.ts deleted
Custom watchDirectory:: Triggered Ignored:: {"id":8,"path":"/home/src/projects/project/node_modules/package1","recursive":true,"ignoreUpdate":true}:: /home/src/projects/project/node_modules/package1/dist/index.js deleted
Custom watchDirectory:: Triggered Ignored:: {"id":8,"path":"/home/src/projects/project/node_modules/package1","recursive":true,"ignoreUpdate":true}:: /home/src/projects/project/node_modules/package1/dist deleted
Before request
//// [/home/src/projects/project/packages/package1/dist/index.js] deleted
//// [/home/src/projects/project/packages/package1/dist/index.d.ts] deleted

Info seq  [hh:mm:ss:mss] request:
    {
      "command": "watchChange",
      "arguments": [
        {
          "id": 16,
          "deleted": [
            "/home/src/projects/project/packages/package1/dist/index.d.ts"
          ]
        },
        {
          "id": 8,
          "deleted": [
            "/home/src/projects/project/node_modules/package1/dist/index.d.ts",
            "/home/src/projects/project/node_modules/package1/dist/index.js",
            "/home/src/projects/project/node_modules/package1/dist"
          ]
        }
      ],
      "seq": 5,
      "type": "request"
    }
Info seq  [hh:mm:ss:mss] FileWatcher:: Triggered with /home/src/projects/project/packages/package1/dist/index.d.ts 2:: WatchInfo: /home/src/projects/project/packages/package1/dist/index.d.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] Scheduled: /home/src/projects/project/packages/package2/tsconfig.json
Info seq  [hh:mm:ss:mss] Scheduled: *ensureProjectForOpenFiles*
Info seq  [hh:mm:ss:mss] Elapsed:: *ms FileWatcher:: Triggered with /home/src/projects/project/packages/package1/dist/index.d.ts 2:: WatchInfo: /home/src/projects/project/packages/package1/dist/index.d.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Triggered with /home/src/projects/project/node_modules/package1/dist/index.d.ts :: WatchInfo: /home/src/projects/project/node_modules/package1 1 undefined Project: /home/src/projects/project/packages/package2/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Scheduled: /home/src/projects/project/packages/package2/tsconfig.jsonFailedLookupInvalidation
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Triggered with /home/src/projects/project/node_modules/package1/dist/index.d.ts :: WatchInfo: /home/src/projects/project/node_modules/package1 1 undefined Project: /home/src/projects/project/packages/package2/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Triggered with /home/src/projects/project/node_modules/package1/dist/index.js :: WatchInfo: /home/src/projects/project/node_modules/package1 1 undefined Project: /home/src/projects/project/packages/package2/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Scheduled: /home/src/projects/project/packages/package2/tsconfig.jsonFailedLookupInvalidation, Cancelled earlier one
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Triggered with /home/src/projects/project/node_modules/package1/dist/index.js :: WatchInfo: /home/src/projects/project/node_modules/package1 1 undefined Project: /home/src/projects/project/packages/package2/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Triggered with /home/src/projects/project/node_modules/package1/dist :: WatchInfo: /home/src/projects/project/node_modules/package1 1 undefined Project: /home/src/projects/project/packages/package2/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Scheduled: /home/src/projects/project/packages/package2/tsconfig.jsonFailedLookupInvalidation, Cancelled earlier one
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Triggered with /home/src/projects/project/node_modules/package1/dist :: WatchInfo: /home/src/projects/project/node_modules/package1 1 undefined Project: /home/src/projects/project/packages/package2/tsconfig.json WatchType: Failed Lookup Locations
After request

Timeout callback:: count: 3
10: /home/src/projects/project/packages/package2/tsconfig.json *new*
11: *ensureProjectForOpenFiles* *new*
14: /home/src/projects/project/packages/package2/tsconfig.jsonFailedLookupInvalidation *new*

Projects::
/home/src/projects/project/packages/package2/tsconfig.json (Configured) *changed*
    projectStateVersion: 3 *changed*
    projectProgramVersion: 2
    dirty: true *changed*

ScriptInfos::
/home/src/projects/project/packages/package1/dist/index.d.ts *changed*
    version: Text-1
    pendingReloadFromDisk: true *changed*
    deferredDelete: true *changed*
    containingProjects: 0 *changed*
        /home/src/projects/project/packages/package2/tsconfig.json *deleted*
/home/src/projects/project/packages/package2/src/index.ts (Open)
    version: SVC-1-0
    containingProjects: 1
        /home/src/projects/project/packages/package2/tsconfig.json *default*
/home/src/tslibs/TS/Lib/lib.es2016.full.d.ts
    version: Text-1
    containingProjects: 1
        /home/src/projects/project/packages/package2/tsconfig.json

Before running Timeout callback:: count: 3
10: /home/src/projects/project/packages/package2/tsconfig.json
11: *ensureProjectForOpenFiles*
14: /home/src/projects/project/packages/package2/tsconfig.jsonFailedLookupInvalidation

Info seq  [hh:mm:ss:mss] Running: /home/src/projects/project/packages/package2/tsconfig.json
Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: /home/src/projects/project/packages/package2/tsconfig.json
Info seq  [hh:mm:ss:mss] ======== Resolving module 'package1' from '/home/src/projects/project/packages/package2/src/index.ts'. ========
Info seq  [hh:mm:ss:mss] Module resolution kind is not specified, using 'Node10'.
Info seq  [hh:mm:ss:mss] Loading module 'package1' from 'node_modules' folder, target file types: TypeScript, Declaration.
Info seq  [hh:mm:ss:mss] Searching all ancestor node_modules directories for preferred extensions: TypeScript, Declaration.
Info seq  [hh:mm:ss:mss] Directory '/home/src/projects/project/packages/package2/src/node_modules' does not exist, skipping all lookups in it.
Info seq  [hh:mm:ss:mss] Directory '/home/src/projects/project/packages/package2/node_modules' does not exist, skipping all lookups in it.
Info seq  [hh:mm:ss:mss] Directory '/home/src/projects/project/packages/node_modules' does not exist, skipping all lookups in it.
Info seq  [hh:mm:ss:mss] Found 'package.json' at '/home/src/projects/project/node_modules/package1/package.json'.
Info seq  [hh:mm:ss:mss] File '/home/src/projects/project/node_modules/package1.ts' does not exist.
Info seq  [hh:mm:ss:mss] File '/home/src/projects/project/node_modules/package1.tsx' does not exist.
Info seq  [hh:mm:ss:mss] File '/home/src/projects/project/node_modules/package1.d.ts' does not exist.
Info seq  [hh:mm:ss:mss] 'package.json' does not have a 'typesVersions' field.
Info seq  [hh:mm:ss:mss] 'package.json' does not have a 'typings' field.
Info seq  [hh:mm:ss:mss] 'package.json' does not have a 'types' field.
Info seq  [hh:mm:ss:mss] 'package.json' has 'main' field 'dist/index.js' that references '/home/src/projects/project/node_modules/package1/dist/index.js'.
Info seq  [hh:mm:ss:mss] File name '/home/src/projects/project/node_modules/package1/dist/index.js' has a '.js' extension - stripping it.
Info seq  [hh:mm:ss:mss] Loading module as file / folder, candidate module location '/home/src/projects/project/node_modules/package1/dist/index.js', target file types: TypeScript, Declaration.
Info seq  [hh:mm:ss:mss] File name '/home/src/projects/project/node_modules/package1/dist/index.js' has a '.js' extension - stripping it.
Info seq  [hh:mm:ss:mss] File '/home/src/projects/project/node_modules/package1/index.ts' does not exist.
Info seq  [hh:mm:ss:mss] File '/home/src/projects/project/node_modules/package1/index.tsx' does not exist.
Info seq  [hh:mm:ss:mss] File '/home/src/projects/project/node_modules/package1/index.d.ts' does not exist.
Info seq  [hh:mm:ss:mss] Directory '/home/src/projects/project/node_modules/@types' does not exist, skipping all lookups in it.
Info seq  [hh:mm:ss:mss] Directory '/home/src/projects/node_modules' does not exist, skipping all lookups in it.
Info seq  [hh:mm:ss:mss] Directory '/home/src/node_modules' does not exist, skipping all lookups in it.
Info seq  [hh:mm:ss:mss] Directory '/home/node_modules' does not exist, skipping all lookups in it.
Info seq  [hh:mm:ss:mss] Directory '/node_modules' does not exist, skipping all lookups in it.
Info seq  [hh:mm:ss:mss] Loading module 'package1' from 'node_modules' folder, target file types: JavaScript.
Info seq  [hh:mm:ss:mss] Searching all ancestor node_modules directories for fallback extensions: JavaScript.
Info seq  [hh:mm:ss:mss] Directory '/home/src/projects/project/packages/package2/src/node_modules' does not exist, skipping all lookups in it.
Info seq  [hh:mm:ss:mss] Directory '/home/src/projects/project/packages/package2/node_modules' does not exist, skipping all lookups in it.
Info seq  [hh:mm:ss:mss] Directory '/home/src/projects/project/packages/node_modules' does not exist, skipping all lookups in it.
Info seq  [hh:mm:ss:mss] File '/home/src/projects/project/node_modules/package1/package.json' exists according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/projects/project/node_modules/package1.js' does not exist.
Info seq  [hh:mm:ss:mss] File '/home/src/projects/project/node_modules/package1.jsx' does not exist.
Info seq  [hh:mm:ss:mss] 'package.json' has 'main' field 'dist/index.js' that references '/home/src/projects/project/node_modules/package1/dist/index.js'.
Info seq  [hh:mm:ss:mss] File name '/home/src/projects/project/node_modules/package1/dist/index.js' has a '.js' extension - stripping it.
Info seq  [hh:mm:ss:mss] Loading module as file / folder, candidate module location '/home/src/projects/project/node_modules/package1/dist/index.js', target file types: JavaScript.
Info seq  [hh:mm:ss:mss] File name '/home/src/projects/project/node_modules/package1/dist/index.js' has a '.js' extension - stripping it.
Info seq  [hh:mm:ss:mss] File '/home/src/projects/project/node_modules/package1/index.js' does not exist.
Info seq  [hh:mm:ss:mss] File '/home/src/projects/project/node_modules/package1/index.jsx' does not exist.
Info seq  [hh:mm:ss:mss] Directory '/home/src/projects/node_modules' does not exist, skipping all lookups in it.
Info seq  [hh:mm:ss:mss] Directory '/home/src/node_modules' does not exist, skipping all lookups in it.
Info seq  [hh:mm:ss:mss] Directory '/home/node_modules' does not exist, skipping all lookups in it.
Info seq  [hh:mm:ss:mss] Directory '/node_modules' does not exist, skipping all lookups in it.
Info seq  [hh:mm:ss:mss] Resolution of non-relative name failed; trying with '--moduleResolution bundler' to see if project may need configuration update.
Info seq  [hh:mm:ss:mss] Loading module 'package1' from 'node_modules' folder, target file types: TypeScript, Declaration.
Info seq  [hh:mm:ss:mss] Searching all ancestor node_modules directories for preferred extensions: TypeScript, Declaration.
Info seq  [hh:mm:ss:mss] Directory '/home/src/projects/project/packages/package2/src/node_modules' does not exist, skipping all lookups in it.
Info seq  [hh:mm:ss:mss] Directory '/home/src/projects/project/packages/package2/node_modules' does not exist, skipping all lookups in it.
Info seq  [hh:mm:ss:mss] Directory '/home/src/projects/project/packages/node_modules' does not exist, skipping all lookups in it.
Info seq  [hh:mm:ss:mss] File '/home/src/projects/project/node_modules/package1/package.json' exists according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/projects/project/node_modules/package1.ts' does not exist.
Info seq  [hh:mm:ss:mss] File '/home/src/projects/project/node_modules/package1.tsx' does not exist.
Info seq  [hh:mm:ss:mss] File '/home/src/projects/project/node_modules/package1.d.ts' does not exist.
Info seq  [hh:mm:ss:mss] 'package.json' does not have a 'typings' field.
Info seq  [hh:mm:ss:mss] 'package.json' does not have a 'types' field.
Info seq  [hh:mm:ss:mss] 'package.json' has 'main' field 'dist/index.js' that references '/home/src/projects/project/node_modules/package1/dist/index.js'.
Info seq  [hh:mm:ss:mss] File name '/home/src/projects/project/node_modules/package1/dist/index.js' has a '.js' extension - stripping it.
Info seq  [hh:mm:ss:mss] Loading module as file / folder, candidate module location '/home/src/projects/project/node_modules/package1/dist/index.js', target file types: TypeScript, Declaration.
Info seq  [hh:mm:ss:mss] File name '/home/src/projects/project/node_modules/package1/dist/index.js' has a '.js' extension - stripping it.
Info seq  [hh:mm:ss:mss] File '/home/src/projects/project/node_modules/package1/index.ts' does not exist.
Info seq  [hh:mm:ss:mss] File '/home/src/projects/project/node_modules/package1/index.tsx' does not exist.
Info seq  [hh:mm:ss:mss] File '/home/src/projects/project/node_modules/package1/index.d.ts' does not exist.
Info seq  [hh:mm:ss:mss] Directory '/home/src/projects/project/node_modules/@types' does not exist, skipping all lookups in it.
Info seq  [hh:mm:ss:mss] Directory '/home/src/projects/node_modules' does not exist, skipping all lookups in it.
Info seq  [hh:mm:ss:mss] Directory '/home/src/node_modules' does not exist, skipping all lookups in it.
Info seq  [hh:mm:ss:mss] Directory '/home/node_modules' does not exist, skipping all lookups in it.
Info seq  [hh:mm:ss:mss] Directory '/node_modules' does not exist, skipping all lookups in it.
Info seq  [hh:mm:ss:mss] ======== Module name 'package1' was not resolved. ========
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /home/src/projects/node_modules 1 undefined Project: /home/src/projects/project/packages/package2/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "createDirectoryWatcher",
      "body": {
        "id": 17,
        "path": "/home/src/projects/node_modules",
        "recursive": true
      }
    }
Custom watchDirectory:: Added:: {"id":17,"path":"/home/src/projects/node_modules","recursive":true}
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /home/src/projects/node_modules 1 undefined Project: /home/src/projects/project/packages/package2/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: /home/src/projects/project/packages/package2/tsconfig.json projectStateVersion: 3 projectProgramVersion: 2 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Project '/home/src/projects/project/packages/package2/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (2)
	/home/src/tslibs/TS/Lib/lib.es2016.full.d.ts Text-1 "/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };"
	/home/src/projects/project/packages/package2/src/index.ts SVC-1-0 "import { FooType, BarType } from \"package1\"\ntype MyFooType = FooType;\ntype MyBarType = BarType;\n"


	../../../../tslibs/TS/Lib/lib.es2016.full.d.ts
	  Default library for target 'es2016'
	src/index.ts
	  Matched by default include pattern '**/*'

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Running: *ensureProjectForOpenFiles*
Info seq  [hh:mm:ss:mss] Before ensureProjectForOpenFiles:
Info seq  [hh:mm:ss:mss] Project '/home/src/projects/project/packages/package2/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (2)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: /home/src/projects/project/packages/package2/src/index.ts ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /home/src/projects/project/packages/package2/tsconfig.json
Info seq  [hh:mm:ss:mss] After ensureProjectForOpenFiles:
Info seq  [hh:mm:ss:mss] Project '/home/src/projects/project/packages/package2/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (2)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: /home/src/projects/project/packages/package2/src/index.ts ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /home/src/projects/project/packages/package2/tsconfig.json
Info seq  [hh:mm:ss:mss] got projects updated in background /home/src/projects/project/packages/package2/src/index.ts
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "projectsUpdatedInBackground",
      "body": {
        "openFiles": [
          "/home/src/projects/project/packages/package2/src/index.ts"
        ]
      }
    }
After running Timeout callback:: count: 0

PolledWatches::
/home/src/projects/project/packages/package1/dist/index.d.ts:
  {"event":{"id":16,"path":"/home/src/projects/project/packages/package1/dist/index.d.ts"}}
/home/src/projects/project/packages/package1/package.json:
  {"event":{"id":10,"path":"/home/src/projects/project/packages/package1/package.json"}}
/home/src/projects/project/packages/package2/package.json:
  {"event":{"id":15,"path":"/home/src/projects/project/packages/package2/package.json"}}
/home/src/projects/project/packages/package2/tsconfig.json:
  {"event":{"id":1,"path":"/home/src/projects/project/packages/package2/tsconfig.json"}}
/home/src/tslibs/TS/Lib/lib.es2016.full.d.ts:
  {"event":{"id":3,"path":"/home/src/tslibs/TS/Lib/lib.es2016.full.d.ts"}}

FsWatchesRecursive::
/home/src/projects/node_modules: *new*
  {"event":{"id":17,"path":"/home/src/projects/node_modules","recursive":true}}
/home/src/projects/node_modules/@types:
  {"event":{"id":14,"path":"/home/src/projects/node_modules/@types","recursive":true,"ignoreUpdate":true}}
/home/src/projects/project/node_modules:
  {"event":{"id":7,"path":"/home/src/projects/project/node_modules","recursive":true}}
/home/src/projects/project/node_modules/@types:
  {"event":{"id":13,"path":"/home/src/projects/project/node_modules/@types","recursive":true,"ignoreUpdate":true}}
/home/src/projects/project/node_modules/package1:
  {"event":{"id":8,"path":"/home/src/projects/project/node_modules/package1","recursive":true,"ignoreUpdate":true}}
/home/src/projects/project/packages/node_modules:
  {"event":{"id":6,"path":"/home/src/projects/project/packages/node_modules","recursive":true}}
/home/src/projects/project/packages/node_modules/@types:
  {"event":{"id":12,"path":"/home/src/projects/project/packages/node_modules/@types","recursive":true,"ignoreUpdate":true}}
/home/src/projects/project/packages/package2:
  {"event":{"id":2,"path":"/home/src/projects/project/packages/package2","recursive":true,"ignoreUpdate":true}}
/home/src/projects/project/packages/package2/node_modules:
  {"event":{"id":5,"path":"/home/src/projects/project/packages/package2/node_modules","recursive":true}}
/home/src/projects/project/packages/package2/node_modules/@types:
  {"event":{"id":11,"path":"/home/src/projects/project/packages/package2/node_modules/@types","recursive":true,"ignoreUpdate":true}}
/home/src/projects/project/packages/package2/src:
  {"event":{"id":4,"path":"/home/src/projects/project/packages/package2/src","recursive":true,"ignoreUpdate":true}}

Timeout callback:: count: 0
14: /home/src/projects/project/packages/package2/tsconfig.jsonFailedLookupInvalidation *deleted*

Projects::
/home/src/projects/project/packages/package2/tsconfig.json (Configured) *changed*
    projectStateVersion: 3
    projectProgramVersion: 3 *changed*
    dirty: false *changed*

Before running Timeout callback:: count: 0

After running Timeout callback:: count: 0

Before running Timeout callback:: count: 0

After running Timeout callback:: count: 0

Before request

Info seq  [hh:mm:ss:mss] request:
    {
      "command": "geterr",
      "arguments": {
        "delay": 0,
        "files": [
          "/home/src/projects/project/packages/package2/src/index.ts"
        ]
      },
      "seq": 6,
      "type": "request"
    }
After request

Timeout callback:: count: 1
15: checkOne *new*

Before running Timeout callback:: count: 1
15: checkOne

Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "syntaxDiag",
      "body": {
        "file": "/home/src/projects/project/packages/package2/src/index.ts",
        "diagnostics": []
      }
    }
After running Timeout callback:: count: 0

Immedidate callback:: count: 1
5: semanticCheck *new*

Before running Immedidate callback:: count: 1
5: semanticCheck

Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "semanticDiag",
      "body": {
        "file": "/home/src/projects/project/packages/package2/src/index.ts",
        "diagnostics": [
          {
            "start": {
              "line": 1,
              "offset": 34
            },
            "end": {
              "line": 1,
              "offset": 44
            },
            "text": "Cannot find module 'package1' or its corresponding type declarations.",
            "code": 2307,
            "category": "error"
          }
        ]
      }
    }
After running Immedidate callback:: count: 1

Immedidate callback:: count: 1
6: suggestionCheck *new*

Before running Immedidate callback:: count: 1
6: suggestionCheck

Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "suggestionDiag",
      "body": {
        "file": "/home/src/projects/project/packages/package2/src/index.ts",
        "diagnostics": [
          {
            "start": {
              "line": 2,
              "offset": 6
            },
            "end": {
              "line": 2,
              "offset": 15
            },
            "text": "'MyFooType' is declared but never used.",
            "code": 6196,
            "category": "suggestion",
            "reportsUnnecessary": true
          },
          {
            "start": {
              "line": 3,
              "offset": 6
            },
            "end": {
              "line": 3,
              "offset": 15
            },
            "text": "'MyBarType' is declared but never used.",
            "code": 6196,
            "category": "suggestion",
            "reportsUnnecessary": true
          }
        ]
      }
    }
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "requestCompleted",
      "body": {
        "request_seq": 6,
        "performanceData": {
          "diagnosticsDuration": [
            {
              "syntaxDiag": *,
              "semanticDiag": *,
              "suggestionDiag": *,
              "file": "/home/src/projects/project/packages/package2/src/index.ts"
            }
          ]
        }
      }
    }
After running Immedidate callback:: count: 0

Build dependencies
Custom watchDirectory:: Triggered Ignored:: {"id":8,"path":"/home/src/projects/project/node_modules/package1","recursive":true,"ignoreUpdate":true}:: /home/src/projects/project/node_modules/package1/dist created
Custom watchDirectory:: Triggered Ignored:: {"id":8,"path":"/home/src/projects/project/node_modules/package1","recursive":true,"ignoreUpdate":true}:: /home/src/projects/project/node_modules/package1/dist updated
Custom watchDirectory:: Triggered Ignored:: {"id":8,"path":"/home/src/projects/project/node_modules/package1","recursive":true,"ignoreUpdate":true}:: /home/src/projects/project/node_modules/package1/dist/index.js created
Custom watchDirectory:: Triggered Ignored:: {"id":8,"path":"/home/src/projects/project/node_modules/package1","recursive":true,"ignoreUpdate":true}:: /home/src/projects/project/node_modules/package1/dist/index.js updated
Custom watchDirectory:: Triggered Ignored:: {"id":8,"path":"/home/src/projects/project/node_modules/package1","recursive":true,"ignoreUpdate":true}:: /home/src/projects/project/node_modules/package1/dist updated
Custom watchFile:: Triggered:: {"id":16,"path":"/home/src/projects/project/packages/package1/dist/index.d.ts"}:: /home/src/projects/project/packages/package1/dist/index.d.ts created
Custom watchDirectory:: Triggered Ignored:: {"id":8,"path":"/home/src/projects/project/node_modules/package1","recursive":true,"ignoreUpdate":true}:: /home/src/projects/project/node_modules/package1/dist/index.d.ts created
Custom watchDirectory:: Triggered Ignored:: {"id":8,"path":"/home/src/projects/project/node_modules/package1","recursive":true,"ignoreUpdate":true}:: /home/src/projects/project/node_modules/package1/dist/index.d.ts updated
Custom watchDirectory:: Triggered Ignored:: {"id":8,"path":"/home/src/projects/project/node_modules/package1","recursive":true,"ignoreUpdate":true}:: /home/src/projects/project/node_modules/package1/dist updated
Custom watchDirectory:: Triggered Ignored:: {"id":8,"path":"/home/src/projects/project/node_modules/package1","recursive":true,"ignoreUpdate":true}:: /home/src/projects/project/node_modules/package1/tsconfig.tsbuildinfo updated
Custom watchDirectory:: Triggered Ignored:: {"id":8,"path":"/home/src/projects/project/node_modules/package1","recursive":true,"ignoreUpdate":true}:: /home/src/projects/project/node_modules/package1/tsconfig.tsbuildinfo.readable.baseline.txt updated
Before request
//// [/home/src/projects/project/packages/package1/tsconfig.tsbuildinfo] file written with same contents Inode:: 125
//// [/home/src/projects/project/packages/package1/tsconfig.tsbuildinfo.readable.baseline.txt] file written with same contents Inode:: 126
//// [/home/src/projects/project/packages/package1/dist/index.js] Inode:: 128
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });


//// [/home/src/projects/project/packages/package1/dist/index.d.ts] Inode:: 129
export type FooType = "foo";
export type BarType = "bar";



Info seq  [hh:mm:ss:mss] request:
    {
      "command": "watchChange",
      "arguments": [
        {
          "id": 8,
          "created": [
            "/home/src/projects/project/node_modules/package1/dist",
            "/home/src/projects/project/node_modules/package1/dist/index.js",
            "/home/src/projects/project/node_modules/package1/dist/index.d.ts"
          ]
        },
        {
          "id": 16,
          "created": [
            "/home/src/projects/project/packages/package1/dist/index.d.ts"
          ]
        }
      ],
      "seq": 7,
      "type": "request"
    }
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Triggered with /home/src/projects/project/node_modules/package1/dist :: WatchInfo: /home/src/projects/project/node_modules/package1 1 undefined Project: /home/src/projects/project/packages/package2/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Scheduled: /home/src/projects/project/packages/package2/tsconfig.jsonFailedLookupInvalidation
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Triggered with /home/src/projects/project/node_modules/package1/dist :: WatchInfo: /home/src/projects/project/node_modules/package1 1 undefined Project: /home/src/projects/project/packages/package2/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Triggered with /home/src/projects/project/node_modules/package1/dist/index.js :: WatchInfo: /home/src/projects/project/node_modules/package1 1 undefined Project: /home/src/projects/project/packages/package2/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Scheduled: /home/src/projects/project/packages/package2/tsconfig.jsonFailedLookupInvalidation, Cancelled earlier one
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Triggered with /home/src/projects/project/node_modules/package1/dist/index.js :: WatchInfo: /home/src/projects/project/node_modules/package1 1 undefined Project: /home/src/projects/project/packages/package2/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Triggered with /home/src/projects/project/node_modules/package1/dist/index.d.ts :: WatchInfo: /home/src/projects/project/node_modules/package1 1 undefined Project: /home/src/projects/project/packages/package2/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Scheduled: /home/src/projects/project/packages/package2/tsconfig.jsonFailedLookupInvalidation, Cancelled earlier one
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Triggered with /home/src/projects/project/node_modules/package1/dist/index.d.ts :: WatchInfo: /home/src/projects/project/node_modules/package1 1 undefined Project: /home/src/projects/project/packages/package2/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] FileWatcher:: Triggered with /home/src/projects/project/packages/package1/dist/index.d.ts 0:: WatchInfo: /home/src/projects/project/packages/package1/dist/index.d.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] Elapsed:: *ms FileWatcher:: Triggered with /home/src/projects/project/packages/package1/dist/index.d.ts 0:: WatchInfo: /home/src/projects/project/packages/package1/dist/index.d.ts 500 undefined WatchType: Closed Script info
After request

Timeout callback:: count: 1
18: /home/src/projects/project/packages/package2/tsconfig.jsonFailedLookupInvalidation *new*

ScriptInfos::
/home/src/projects/project/packages/package1/dist/index.d.ts *changed*
    version: Text-1
    pendingReloadFromDisk: true
    deferredDelete: undefined *changed*
    containingProjects: 0
/home/src/projects/project/packages/package2/src/index.ts (Open)
    version: SVC-1-0
    containingProjects: 1
        /home/src/projects/project/packages/package2/tsconfig.json *default*
/home/src/tslibs/TS/Lib/lib.es2016.full.d.ts
    version: Text-1
    containingProjects: 1
        /home/src/projects/project/packages/package2/tsconfig.json

Before running Timeout callback:: count: 1
18: /home/src/projects/project/packages/package2/tsconfig.jsonFailedLookupInvalidation

Info seq  [hh:mm:ss:mss] Running: /home/src/projects/project/packages/package2/tsconfig.jsonFailedLookupInvalidation
Info seq  [hh:mm:ss:mss] Scheduled: /home/src/projects/project/packages/package2/tsconfig.json
Info seq  [hh:mm:ss:mss] Scheduled: *ensureProjectForOpenFiles*
After running Timeout callback:: count: 2

Timeout callback:: count: 2
19: /home/src/projects/project/packages/package2/tsconfig.json *new*
20: *ensureProjectForOpenFiles* *new*

Projects::
/home/src/projects/project/packages/package2/tsconfig.json (Configured) *changed*
    projectStateVersion: 4 *changed*
    projectProgramVersion: 3
    dirty: true *changed*

Before running Timeout callback:: count: 2
19: /home/src/projects/project/packages/package2/tsconfig.json
20: *ensureProjectForOpenFiles*

Info seq  [hh:mm:ss:mss] Running: /home/src/projects/project/packages/package2/tsconfig.json
Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: /home/src/projects/project/packages/package2/tsconfig.json
Info seq  [hh:mm:ss:mss] ======== Resolving module 'package1' from '/home/src/projects/project/packages/package2/src/index.ts'. ========
Info seq  [hh:mm:ss:mss] Module resolution kind is not specified, using 'Node10'.
Info seq  [hh:mm:ss:mss] Loading module 'package1' from 'node_modules' folder, target file types: TypeScript, Declaration.
Info seq  [hh:mm:ss:mss] Searching all ancestor node_modules directories for preferred extensions: TypeScript, Declaration.
Info seq  [hh:mm:ss:mss] Directory '/home/src/projects/project/packages/package2/src/node_modules' does not exist, skipping all lookups in it.
Info seq  [hh:mm:ss:mss] Directory '/home/src/projects/project/packages/package2/node_modules' does not exist, skipping all lookups in it.
Info seq  [hh:mm:ss:mss] Directory '/home/src/projects/project/packages/node_modules' does not exist, skipping all lookups in it.
Info seq  [hh:mm:ss:mss] Found 'package.json' at '/home/src/projects/project/node_modules/package1/package.json'.
Info seq  [hh:mm:ss:mss] File '/home/src/projects/project/node_modules/package1.ts' does not exist.
Info seq  [hh:mm:ss:mss] File '/home/src/projects/project/node_modules/package1.tsx' does not exist.
Info seq  [hh:mm:ss:mss] File '/home/src/projects/project/node_modules/package1.d.ts' does not exist.
Info seq  [hh:mm:ss:mss] 'package.json' does not have a 'typesVersions' field.
Info seq  [hh:mm:ss:mss] 'package.json' does not have a 'typings' field.
Info seq  [hh:mm:ss:mss] 'package.json' does not have a 'types' field.
Info seq  [hh:mm:ss:mss] 'package.json' has 'main' field 'dist/index.js' that references '/home/src/projects/project/node_modules/package1/dist/index.js'.
Info seq  [hh:mm:ss:mss] File name '/home/src/projects/project/node_modules/package1/dist/index.js' has a '.js' extension - stripping it.
Info seq  [hh:mm:ss:mss] File '/home/src/projects/project/node_modules/package1/dist/index.ts' does not exist.
Info seq  [hh:mm:ss:mss] File '/home/src/projects/project/node_modules/package1/dist/index.tsx' does not exist.
Info seq  [hh:mm:ss:mss] File '/home/src/projects/project/node_modules/package1/dist/index.d.ts' exists - use it as a name resolution result.
Info seq  [hh:mm:ss:mss] 'package.json' does not have a 'peerDependencies' field.
Info seq  [hh:mm:ss:mss] Resolving real path for '/home/src/projects/project/node_modules/package1/dist/index.d.ts', result '/home/src/projects/project/packages/package1/dist/index.d.ts'.
Info seq  [hh:mm:ss:mss] ======== Module name 'package1' was successfully resolved to '/home/src/projects/project/packages/package1/dist/index.d.ts' with Package ID 'package1/dist/index.d.ts@1.0.0'. ========
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Close:: WatchInfo: /home/src/projects/node_modules 1 undefined Project: /home/src/projects/project/packages/package2/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "closeFileWatcher",
      "body": {
        "id": 17
      }
    }
Custom watchDirectory:: Close:: {"id":17,"path":"/home/src/projects/node_modules","recursive":true}
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Close:: WatchInfo: /home/src/projects/node_modules 1 undefined Project: /home/src/projects/project/packages/package2/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: /home/src/projects/project/packages/package2/tsconfig.json projectStateVersion: 4 projectProgramVersion: 3 structureChanged: true structureIsReused:: SafeModules Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Project '/home/src/projects/project/packages/package2/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (3)
	/home/src/tslibs/TS/Lib/lib.es2016.full.d.ts Text-1 "/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };"
	/home/src/projects/project/packages/package1/dist/index.d.ts Text-1 "export type FooType = \"foo\";\nexport type BarType = \"bar\";\n"
	/home/src/projects/project/packages/package2/src/index.ts SVC-1-0 "import { FooType, BarType } from \"package1\"\ntype MyFooType = FooType;\ntype MyBarType = BarType;\n"


	../../../../tslibs/TS/Lib/lib.es2016.full.d.ts
	  Default library for target 'es2016'
	../package1/dist/index.d.ts
	  Imported via "package1" from file 'src/index.ts' with packageId 'package1/dist/index.d.ts@1.0.0'
	src/index.ts
	  Matched by default include pattern '**/*'

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Running: *ensureProjectForOpenFiles*
Info seq  [hh:mm:ss:mss] Before ensureProjectForOpenFiles:
Info seq  [hh:mm:ss:mss] Project '/home/src/projects/project/packages/package2/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (3)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: /home/src/projects/project/packages/package2/src/index.ts ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /home/src/projects/project/packages/package2/tsconfig.json
Info seq  [hh:mm:ss:mss] After ensureProjectForOpenFiles:
Info seq  [hh:mm:ss:mss] Project '/home/src/projects/project/packages/package2/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (3)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: /home/src/projects/project/packages/package2/src/index.ts ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /home/src/projects/project/packages/package2/tsconfig.json
Info seq  [hh:mm:ss:mss] got projects updated in background /home/src/projects/project/packages/package2/src/index.ts
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "projectsUpdatedInBackground",
      "body": {
        "openFiles": [
          "/home/src/projects/project/packages/package2/src/index.ts"
        ]
      }
    }
After running Timeout callback:: count: 0

PolledWatches::
/home/src/projects/project/packages/package1/dist/index.d.ts:
  {"event":{"id":16,"path":"/home/src/projects/project/packages/package1/dist/index.d.ts"}}
/home/src/projects/project/packages/package1/package.json:
  {"event":{"id":10,"path":"/home/src/projects/project/packages/package1/package.json"}}
/home/src/projects/project/packages/package2/package.json:
  {"event":{"id":15,"path":"/home/src/projects/project/packages/package2/package.json"}}
/home/src/projects/project/packages/package2/tsconfig.json:
  {"event":{"id":1,"path":"/home/src/projects/project/packages/package2/tsconfig.json"}}
/home/src/tslibs/TS/Lib/lib.es2016.full.d.ts:
  {"event":{"id":3,"path":"/home/src/tslibs/TS/Lib/lib.es2016.full.d.ts"}}

FsWatchesRecursive::
/home/src/projects/node_modules/@types:
  {"event":{"id":14,"path":"/home/src/projects/node_modules/@types","recursive":true,"ignoreUpdate":true}}
/home/src/projects/project/node_modules:
  {"event":{"id":7,"path":"/home/src/projects/project/node_modules","recursive":true}}
/home/src/projects/project/node_modules/@types:
  {"event":{"id":13,"path":"/home/src/projects/project/node_modules/@types","recursive":true,"ignoreUpdate":true}}
/home/src/projects/project/node_modules/package1:
  {"event":{"id":8,"path":"/home/src/projects/project/node_modules/package1","recursive":true,"ignoreUpdate":true}}
/home/src/projects/project/packages/node_modules:
  {"event":{"id":6,"path":"/home/src/projects/project/packages/node_modules","recursive":true}}
/home/src/projects/project/packages/node_modules/@types:
  {"event":{"id":12,"path":"/home/src/projects/project/packages/node_modules/@types","recursive":true,"ignoreUpdate":true}}
/home/src/projects/project/packages/package2:
  {"event":{"id":2,"path":"/home/src/projects/project/packages/package2","recursive":true,"ignoreUpdate":true}}
/home/src/projects/project/packages/package2/node_modules:
  {"event":{"id":5,"path":"/home/src/projects/project/packages/package2/node_modules","recursive":true}}
/home/src/projects/project/packages/package2/node_modules/@types:
  {"event":{"id":11,"path":"/home/src/projects/project/packages/package2/node_modules/@types","recursive":true,"ignoreUpdate":true}}
/home/src/projects/project/packages/package2/src:
  {"event":{"id":4,"path":"/home/src/projects/project/packages/package2/src","recursive":true,"ignoreUpdate":true}}

FsWatchesRecursive *deleted*::
/home/src/projects/node_modules:
  {"event":{"id":17,"path":"/home/src/projects/node_modules","recursive":true}}

Projects::
/home/src/projects/project/packages/package2/tsconfig.json (Configured) *changed*
    projectStateVersion: 4
    projectProgramVersion: 4 *changed*
    dirty: false *changed*

ScriptInfos::
/home/src/projects/project/packages/package1/dist/index.d.ts *changed*
    version: Text-1
    pendingReloadFromDisk: false *changed*
    containingProjects: 1 *changed*
        /home/src/projects/project/packages/package2/tsconfig.json *new*
/home/src/projects/project/packages/package2/src/index.ts (Open)
    version: SVC-1-0
    containingProjects: 1
        /home/src/projects/project/packages/package2/tsconfig.json *default*
/home/src/tslibs/TS/Lib/lib.es2016.full.d.ts
    version: Text-1
    containingProjects: 1
        /home/src/projects/project/packages/package2/tsconfig.json

Before running Timeout callback:: count: 0

After running Timeout callback:: count: 0

Before request

Info seq  [hh:mm:ss:mss] request:
    {
      "command": "geterr",
      "arguments": {
        "delay": 0,
        "files": [
          "/home/src/projects/project/packages/package2/src/index.ts"
        ]
      },
      "seq": 8,
      "type": "request"
    }
After request

Timeout callback:: count: 1
21: checkOne *new*

Before running Timeout callback:: count: 1
21: checkOne

Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "syntaxDiag",
      "body": {
        "file": "/home/src/projects/project/packages/package2/src/index.ts",
        "diagnostics": []
      }
    }
After running Timeout callback:: count: 0

Immedidate callback:: count: 1
7: semanticCheck *new*

Before running Immedidate callback:: count: 1
7: semanticCheck

Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "semanticDiag",
      "body": {
        "file": "/home/src/projects/project/packages/package2/src/index.ts",
        "diagnostics": []
      }
    }
After running Immedidate callback:: count: 1

Immedidate callback:: count: 1
8: suggestionCheck *new*

Before running Immedidate callback:: count: 1
8: suggestionCheck

Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "suggestionDiag",
      "body": {
        "file": "/home/src/projects/project/packages/package2/src/index.ts",
        "diagnostics": [
          {
            "start": {
              "line": 2,
              "offset": 6
            },
            "end": {
              "line": 2,
              "offset": 15
            },
            "text": "'MyFooType' is declared but never used.",
            "code": 6196,
            "category": "suggestion",
            "reportsUnnecessary": true
          },
          {
            "start": {
              "line": 3,
              "offset": 6
            },
            "end": {
              "line": 3,
              "offset": 15
            },
            "text": "'MyBarType' is declared but never used.",
            "code": 6196,
            "category": "suggestion",
            "reportsUnnecessary": true
          }
        ]
      }
    }
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "requestCompleted",
      "body": {
        "request_seq": 8,
        "performanceData": {
          "diagnosticsDuration": [
            {
              "syntaxDiag": *,
              "semanticDiag": *,
              "suggestionDiag": *,
              "file": "/home/src/projects/project/packages/package2/src/index.ts"
            }
          ]
        }
      }
    }
After running Immedidate callback:: count: 0
