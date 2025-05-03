Info seq  [hh:mm:ss:mss] currentDirectory:: /home/src/Vscode/Projects/bin useCaseSensitiveFileNames:: false
Info seq  [hh:mm:ss:mss] libs Location:: /home/src/tslibs/TS/Lib
Info seq  [hh:mm:ss:mss] globalTypingsCacheLocation:: /home/src/Library/Caches/typescript
Info seq  [hh:mm:ss:mss] Provided types map file "/home/src/tslibs/TS/Lib/typesMap.json" doesn't exist
Before request
//// [/home/src/workspaces/project/src/tsconfig.json]
{
  "compilerOptions": {
    "target": "es2016",
    "composite": true,
    "module": "node16",
    "outDir": "../out",
    "traceResolution": true
  },
  "files": [
    "main.ts",
    "fileA.ts",
    "fileB.mts",
    "randomFile.ts",
    "a/randomFile.ts",
    "b/ba/randomFile.ts",
    "b/randomFile.ts",
    "c/ca/randomFile.ts",
    "c/ca/caa/randomFile.ts",
    "c/ca/caa/caaa/randomFile.ts",
    "c/cb/randomFile.ts",
    "d/da/daa/daaa/x/y/z/randomFile.ts",
    "d/da/daa/daaa/randomFile.ts",
    "d/da/daa/randomFile.ts",
    "d/da/randomFile.ts",
    "e/ea/randomFile.ts",
    "e/ea/eaa/randomFile.ts",
    "e/ea/eaa/eaaa/randomFile.ts",
    "e/ea/eaa/eaaa/x/y/z/randomFile.ts",
    "f/fa/faa/x/y/z/randomFile.ts",
    "f/fa/faa/faaa/randomFile.ts"
  ]
}

//// [/home/src/workspaces/project/src/main.ts]
export const x = 10;

//// [/home/src/workspaces/project/src/fileA.ts]
import { foo } from "./fileB.mjs";
foo();


//// [/home/src/workspaces/project/src/fileB.mts]
export function foo() {}

//// [/home/src/workspaces/project/src/randomFile.ts]
export const x = 10;

//// [/home/src/workspaces/project/src/a/randomFile.ts]
export const x = 10;

//// [/home/src/workspaces/project/src/b/ba/randomFile.ts]
export const x = 10;

//// [/home/src/workspaces/project/src/b/randomFile.ts]
export const x = 10;

//// [/home/src/workspaces/project/src/c/ca/randomFile.ts]
export const x = 10;

//// [/home/src/workspaces/project/src/c/ca/caa/randomFile.ts]
export const x = 10;

//// [/home/src/workspaces/project/src/c/ca/caa/caaa/randomFile.ts]
export const x = 10;

//// [/home/src/workspaces/project/src/c/cb/randomFile.ts]
export const x = 10;

//// [/home/src/workspaces/project/src/d/da/daa/daaa/x/y/z/randomFile.ts]
export const x = 10;

//// [/home/src/workspaces/project/src/d/da/daa/daaa/randomFile.ts]
export const x = 10;

//// [/home/src/workspaces/project/src/d/da/daa/randomFile.ts]
export const x = 10;

//// [/home/src/workspaces/project/src/d/da/randomFile.ts]
export const x = 10;

//// [/home/src/workspaces/project/src/e/ea/randomFile.ts]
export const x = 10;

//// [/home/src/workspaces/project/src/e/ea/eaa/randomFile.ts]
export const x = 10;

//// [/home/src/workspaces/project/src/e/ea/eaa/eaaa/randomFile.ts]
export const x = 10;

//// [/home/src/workspaces/project/src/e/ea/eaa/eaaa/x/y/z/randomFile.ts]
export const x = 10;

//// [/home/src/workspaces/project/src/f/fa/faa/faaa/randomFile.ts]
export const x = 10;

//// [/home/src/workspaces/project/src/f/fa/faa/x/y/z/randomFile.ts]
export const x = 10;

//// [/home/src/workspaces/project/package.json]
{
  "name": "app",
  "version": "1.0.0"
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


Info seq  [hh:mm:ss:mss] request:
    {
      "command": "open",
      "arguments": {
        "file": "/home/src/workspaces/project/src/main.ts"
      },
      "seq": 1,
      "type": "request"
    }
Info seq  [hh:mm:ss:mss] getConfigFileNameForFile:: File: /home/src/workspaces/project/src/main.ts ProjectRootPath: undefined:: Result: /home/src/workspaces/project/src/tsconfig.json
Info seq  [hh:mm:ss:mss] Creating ConfiguredProject: /home/src/workspaces/project/src/tsconfig.json, currentDirectory: /home/src/workspaces/project/src
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/workspaces/project/src/tsconfig.json 2000 undefined Project: /home/src/workspaces/project/src/tsconfig.json WatchType: Config file
Info seq  [hh:mm:ss:mss] Config: /home/src/workspaces/project/src/tsconfig.json : {
 "rootNames": [
  "/home/src/workspaces/project/src/main.ts",
  "/home/src/workspaces/project/src/fileA.ts",
  "/home/src/workspaces/project/src/fileB.mts",
  "/home/src/workspaces/project/src/randomFile.ts",
  "/home/src/workspaces/project/src/a/randomFile.ts",
  "/home/src/workspaces/project/src/b/ba/randomFile.ts",
  "/home/src/workspaces/project/src/b/randomFile.ts",
  "/home/src/workspaces/project/src/c/ca/randomFile.ts",
  "/home/src/workspaces/project/src/c/ca/caa/randomFile.ts",
  "/home/src/workspaces/project/src/c/ca/caa/caaa/randomFile.ts",
  "/home/src/workspaces/project/src/c/cb/randomFile.ts",
  "/home/src/workspaces/project/src/d/da/daa/daaa/x/y/z/randomFile.ts",
  "/home/src/workspaces/project/src/d/da/daa/daaa/randomFile.ts",
  "/home/src/workspaces/project/src/d/da/daa/randomFile.ts",
  "/home/src/workspaces/project/src/d/da/randomFile.ts",
  "/home/src/workspaces/project/src/e/ea/randomFile.ts",
  "/home/src/workspaces/project/src/e/ea/eaa/randomFile.ts",
  "/home/src/workspaces/project/src/e/ea/eaa/eaaa/randomFile.ts",
  "/home/src/workspaces/project/src/e/ea/eaa/eaaa/x/y/z/randomFile.ts",
  "/home/src/workspaces/project/src/f/fa/faa/x/y/z/randomFile.ts",
  "/home/src/workspaces/project/src/f/fa/faa/faaa/randomFile.ts"
 ],
 "options": {
  "target": 3,
  "composite": true,
  "module": 100,
  "outDir": "/home/src/workspaces/project/out",
  "traceResolution": true,
  "configFilePath": "/home/src/workspaces/project/src/tsconfig.json"
 }
}
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "projectLoadingStart",
      "body": {
        "projectName": "/home/src/workspaces/project/src/tsconfig.json",
        "reason": "Creating possible configured project for /home/src/workspaces/project/src/main.ts to open"
      }
    }
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/workspaces/project/src/fileA.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/workspaces/project/src/fileB.mts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/workspaces/project/src/randomFile.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/workspaces/project/src/a/randomFile.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/workspaces/project/src/b/ba/randomFile.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/workspaces/project/src/b/randomFile.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/workspaces/project/src/c/ca/randomFile.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/workspaces/project/src/c/ca/caa/randomFile.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/workspaces/project/src/c/ca/caa/caaa/randomFile.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/workspaces/project/src/c/cb/randomFile.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/workspaces/project/src/d/da/daa/daaa/x/y/z/randomFile.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/workspaces/project/src/d/da/daa/daaa/randomFile.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/workspaces/project/src/d/da/daa/randomFile.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/workspaces/project/src/d/da/randomFile.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/workspaces/project/src/e/ea/randomFile.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/workspaces/project/src/e/ea/eaa/randomFile.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/workspaces/project/src/e/ea/eaa/eaaa/randomFile.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/workspaces/project/src/e/ea/eaa/eaaa/x/y/z/randomFile.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/workspaces/project/src/f/fa/faa/x/y/z/randomFile.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/workspaces/project/src/f/fa/faa/faaa/randomFile.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: /home/src/workspaces/project/src/tsconfig.json
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/package.json' does not exist.
Info seq  [hh:mm:ss:mss] Found 'package.json' at '/home/src/workspaces/project/package.json'.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/package.json' exists according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] ======== Resolving module './fileB.mjs' from '/home/src/workspaces/project/src/fileA.ts'. ========
Info seq  [hh:mm:ss:mss] Module resolution kind is not specified, using 'Node16'.
Info seq  [hh:mm:ss:mss] Resolving in CJS mode with conditions 'require', 'types', 'node'.
Info seq  [hh:mm:ss:mss] Loading module as file / folder, candidate module location '/home/src/workspaces/project/src/fileB.mjs', target file types: TypeScript, JavaScript, Declaration.
Info seq  [hh:mm:ss:mss] File name '/home/src/workspaces/project/src/fileB.mjs' has a '.mjs' extension - stripping it.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/fileB.mts' exists - use it as a name resolution result.
Info seq  [hh:mm:ss:mss] ======== Module name './fileB.mjs' was successfully resolved to '/home/src/workspaces/project/src/fileB.mts'. ========
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/package.json' exists according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/a/package.json' does not exist.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/package.json' exists according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/b/ba/package.json' does not exist.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/b/package.json' does not exist.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/package.json' exists according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/b/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/package.json' exists according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/c/ca/package.json' does not exist.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/c/package.json' does not exist.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/package.json' exists according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/c/ca/caa/package.json' does not exist.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/c/ca/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/c/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/package.json' exists according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/c/ca/caa/caaa/package.json' does not exist.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/c/ca/caa/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/c/ca/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/c/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/package.json' exists according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/c/cb/package.json' does not exist.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/c/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/package.json' exists according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/d/da/daa/daaa/x/y/z/package.json' does not exist.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/d/da/daa/daaa/x/y/package.json' does not exist.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/d/da/daa/daaa/x/package.json' does not exist.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/d/da/daa/daaa/package.json' does not exist.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/d/da/daa/package.json' does not exist.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/d/da/package.json' does not exist.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/d/package.json' does not exist.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/package.json' exists according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/d/da/daa/daaa/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/d/da/daa/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/d/da/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/d/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/package.json' exists according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/d/da/daa/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/d/da/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/d/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/package.json' exists according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/d/da/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/d/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/package.json' exists according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/e/ea/package.json' does not exist.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/e/package.json' does not exist.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/package.json' exists according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/e/ea/eaa/package.json' does not exist.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/e/ea/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/e/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/package.json' exists according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/e/ea/eaa/eaaa/package.json' does not exist.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/e/ea/eaa/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/e/ea/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/e/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/package.json' exists according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/e/ea/eaa/eaaa/x/y/z/package.json' does not exist.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/e/ea/eaa/eaaa/x/y/package.json' does not exist.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/e/ea/eaa/eaaa/x/package.json' does not exist.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/e/ea/eaa/eaaa/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/e/ea/eaa/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/e/ea/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/e/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/package.json' exists according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/f/fa/faa/x/y/z/package.json' does not exist.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/f/fa/faa/x/y/package.json' does not exist.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/f/fa/faa/x/package.json' does not exist.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/f/fa/faa/package.json' does not exist.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/f/fa/package.json' does not exist.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/f/package.json' does not exist.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/package.json' exists according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/f/fa/faa/faaa/package.json' does not exist.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/f/fa/faa/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/f/fa/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/f/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/package.json' exists according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/tslibs/TS/Lib/package.json' does not exist.
Info seq  [hh:mm:ss:mss] File '/home/src/tslibs/TS/package.json' does not exist.
Info seq  [hh:mm:ss:mss] File '/home/src/tslibs/package.json' does not exist.
Info seq  [hh:mm:ss:mss] File '/home/src/package.json' does not exist.
Info seq  [hh:mm:ss:mss] File '/home/package.json' does not exist.
Info seq  [hh:mm:ss:mss] File '/package.json' does not exist.
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/tslibs/TS/Lib/lib.es2016.full.d.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/tslibs/TS/Lib/package.json 2000 undefined Project: /home/src/workspaces/project/src/tsconfig.json WatchType: File location affecting resolution
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/tslibs/TS/package.json 2000 undefined Project: /home/src/workspaces/project/src/tsconfig.json WatchType: File location affecting resolution
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/tslibs/package.json 2000 undefined Project: /home/src/workspaces/project/src/tsconfig.json WatchType: File location affecting resolution
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/workspaces/project/src/package.json 2000 undefined Project: /home/src/workspaces/project/src/tsconfig.json WatchType: File location affecting resolution
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/workspaces/project/package.json 2000 undefined Project: /home/src/workspaces/project/src/tsconfig.json WatchType: File location affecting resolution
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/workspaces/project/src/a/package.json 2000 undefined Project: /home/src/workspaces/project/src/tsconfig.json WatchType: File location affecting resolution
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/workspaces/project/src/b/ba/package.json 2000 undefined Project: /home/src/workspaces/project/src/tsconfig.json WatchType: File location affecting resolution
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/workspaces/project/src/b/package.json 2000 undefined Project: /home/src/workspaces/project/src/tsconfig.json WatchType: File location affecting resolution
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/workspaces/project/src/c/ca/package.json 2000 undefined Project: /home/src/workspaces/project/src/tsconfig.json WatchType: File location affecting resolution
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/workspaces/project/src/c/package.json 2000 undefined Project: /home/src/workspaces/project/src/tsconfig.json WatchType: File location affecting resolution
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/workspaces/project/src/c/ca/caa/package.json 2000 undefined Project: /home/src/workspaces/project/src/tsconfig.json WatchType: File location affecting resolution
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/workspaces/project/src/c/ca/caa/caaa/package.json 2000 undefined Project: /home/src/workspaces/project/src/tsconfig.json WatchType: File location affecting resolution
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/workspaces/project/src/c/cb/package.json 2000 undefined Project: /home/src/workspaces/project/src/tsconfig.json WatchType: File location affecting resolution
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/workspaces/project/src/d/da/daa/daaa/x/y/z/package.json 2000 undefined Project: /home/src/workspaces/project/src/tsconfig.json WatchType: File location affecting resolution
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/workspaces/project/src/d/da/daa/daaa/x/y/package.json 2000 undefined Project: /home/src/workspaces/project/src/tsconfig.json WatchType: File location affecting resolution
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/workspaces/project/src/d/da/daa/daaa/x/package.json 2000 undefined Project: /home/src/workspaces/project/src/tsconfig.json WatchType: File location affecting resolution
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/workspaces/project/src/d/da/daa/daaa/package.json 2000 undefined Project: /home/src/workspaces/project/src/tsconfig.json WatchType: File location affecting resolution
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/workspaces/project/src/d/da/daa/package.json 2000 undefined Project: /home/src/workspaces/project/src/tsconfig.json WatchType: File location affecting resolution
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/workspaces/project/src/d/da/package.json 2000 undefined Project: /home/src/workspaces/project/src/tsconfig.json WatchType: File location affecting resolution
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/workspaces/project/src/d/package.json 2000 undefined Project: /home/src/workspaces/project/src/tsconfig.json WatchType: File location affecting resolution
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/workspaces/project/src/e/ea/package.json 2000 undefined Project: /home/src/workspaces/project/src/tsconfig.json WatchType: File location affecting resolution
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/workspaces/project/src/e/package.json 2000 undefined Project: /home/src/workspaces/project/src/tsconfig.json WatchType: File location affecting resolution
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/workspaces/project/src/e/ea/eaa/package.json 2000 undefined Project: /home/src/workspaces/project/src/tsconfig.json WatchType: File location affecting resolution
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/workspaces/project/src/e/ea/eaa/eaaa/package.json 2000 undefined Project: /home/src/workspaces/project/src/tsconfig.json WatchType: File location affecting resolution
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/workspaces/project/src/e/ea/eaa/eaaa/x/y/z/package.json 2000 undefined Project: /home/src/workspaces/project/src/tsconfig.json WatchType: File location affecting resolution
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/workspaces/project/src/e/ea/eaa/eaaa/x/y/package.json 2000 undefined Project: /home/src/workspaces/project/src/tsconfig.json WatchType: File location affecting resolution
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/workspaces/project/src/e/ea/eaa/eaaa/x/package.json 2000 undefined Project: /home/src/workspaces/project/src/tsconfig.json WatchType: File location affecting resolution
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/workspaces/project/src/f/fa/faa/x/y/z/package.json 2000 undefined Project: /home/src/workspaces/project/src/tsconfig.json WatchType: File location affecting resolution
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/workspaces/project/src/f/fa/faa/x/y/package.json 2000 undefined Project: /home/src/workspaces/project/src/tsconfig.json WatchType: File location affecting resolution
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/workspaces/project/src/f/fa/faa/x/package.json 2000 undefined Project: /home/src/workspaces/project/src/tsconfig.json WatchType: File location affecting resolution
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/workspaces/project/src/f/fa/faa/package.json 2000 undefined Project: /home/src/workspaces/project/src/tsconfig.json WatchType: File location affecting resolution
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/workspaces/project/src/f/fa/package.json 2000 undefined Project: /home/src/workspaces/project/src/tsconfig.json WatchType: File location affecting resolution
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/workspaces/project/src/f/package.json 2000 undefined Project: /home/src/workspaces/project/src/tsconfig.json WatchType: File location affecting resolution
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/workspaces/project/src/f/fa/faa/faaa/package.json 2000 undefined Project: /home/src/workspaces/project/src/tsconfig.json WatchType: File location affecting resolution
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /home/src/workspaces/project/src/node_modules/@types 1 undefined Project: /home/src/workspaces/project/src/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /home/src/workspaces/project/src/node_modules/@types 1 undefined Project: /home/src/workspaces/project/src/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /home/src/workspaces/project/node_modules/@types 1 undefined Project: /home/src/workspaces/project/src/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /home/src/workspaces/project/node_modules/@types 1 undefined Project: /home/src/workspaces/project/src/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /home/src/workspaces/node_modules/@types 1 undefined Project: /home/src/workspaces/project/src/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /home/src/workspaces/node_modules/@types 1 undefined Project: /home/src/workspaces/project/src/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: /home/src/workspaces/project/src/tsconfig.json projectStateVersion: 1 projectProgramVersion: 0 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Project '/home/src/workspaces/project/src/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (22)
	/home/src/tslibs/TS/Lib/lib.es2016.full.d.ts Text-1 "/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };"
	/home/src/workspaces/project/src/main.ts SVC-1-0 "export const x = 10;"
	/home/src/workspaces/project/src/fileB.mts Text-1 "export function foo() {}"
	/home/src/workspaces/project/src/fileA.ts Text-1 "import { foo } from \"./fileB.mjs\";\nfoo();\n"
	/home/src/workspaces/project/src/randomFile.ts Text-1 "export const x = 10;"
	/home/src/workspaces/project/src/a/randomFile.ts Text-1 "export const x = 10;"
	/home/src/workspaces/project/src/b/ba/randomFile.ts Text-1 "export const x = 10;"
	/home/src/workspaces/project/src/b/randomFile.ts Text-1 "export const x = 10;"
	/home/src/workspaces/project/src/c/ca/randomFile.ts Text-1 "export const x = 10;"
	/home/src/workspaces/project/src/c/ca/caa/randomFile.ts Text-1 "export const x = 10;"
	/home/src/workspaces/project/src/c/ca/caa/caaa/randomFile.ts Text-1 "export const x = 10;"
	/home/src/workspaces/project/src/c/cb/randomFile.ts Text-1 "export const x = 10;"
	/home/src/workspaces/project/src/d/da/daa/daaa/x/y/z/randomFile.ts Text-1 "export const x = 10;"
	/home/src/workspaces/project/src/d/da/daa/daaa/randomFile.ts Text-1 "export const x = 10;"
	/home/src/workspaces/project/src/d/da/daa/randomFile.ts Text-1 "export const x = 10;"
	/home/src/workspaces/project/src/d/da/randomFile.ts Text-1 "export const x = 10;"
	/home/src/workspaces/project/src/e/ea/randomFile.ts Text-1 "export const x = 10;"
	/home/src/workspaces/project/src/e/ea/eaa/randomFile.ts Text-1 "export const x = 10;"
	/home/src/workspaces/project/src/e/ea/eaa/eaaa/randomFile.ts Text-1 "export const x = 10;"
	/home/src/workspaces/project/src/e/ea/eaa/eaaa/x/y/z/randomFile.ts Text-1 "export const x = 10;"
	/home/src/workspaces/project/src/f/fa/faa/x/y/z/randomFile.ts Text-1 "export const x = 10;"
	/home/src/workspaces/project/src/f/fa/faa/faaa/randomFile.ts Text-1 "export const x = 10;"


	../../../tslibs/TS/Lib/lib.es2016.full.d.ts
	  Default library for target 'es2016'
	main.ts
	  Part of 'files' list in tsconfig.json
	  File is CommonJS module because '../package.json' does not have field "type"
	fileB.mts
	  Imported via "./fileB.mjs" from file 'fileA.ts'
	  Part of 'files' list in tsconfig.json
	fileA.ts
	  Part of 'files' list in tsconfig.json
	  File is CommonJS module because '../package.json' does not have field "type"
	randomFile.ts
	  Part of 'files' list in tsconfig.json
	  File is CommonJS module because '../package.json' does not have field "type"
	a/randomFile.ts
	  Part of 'files' list in tsconfig.json
	  File is CommonJS module because '../package.json' does not have field "type"
	b/ba/randomFile.ts
	  Part of 'files' list in tsconfig.json
	  File is CommonJS module because '../package.json' does not have field "type"
	b/randomFile.ts
	  Part of 'files' list in tsconfig.json
	  File is CommonJS module because '../package.json' does not have field "type"
	c/ca/randomFile.ts
	  Part of 'files' list in tsconfig.json
	  File is CommonJS module because '../package.json' does not have field "type"
	c/ca/caa/randomFile.ts
	  Part of 'files' list in tsconfig.json
	  File is CommonJS module because '../package.json' does not have field "type"
	c/ca/caa/caaa/randomFile.ts
	  Part of 'files' list in tsconfig.json
	  File is CommonJS module because '../package.json' does not have field "type"
	c/cb/randomFile.ts
	  Part of 'files' list in tsconfig.json
	  File is CommonJS module because '../package.json' does not have field "type"
	d/da/daa/daaa/x/y/z/randomFile.ts
	  Part of 'files' list in tsconfig.json
	  File is CommonJS module because '../package.json' does not have field "type"
	d/da/daa/daaa/randomFile.ts
	  Part of 'files' list in tsconfig.json
	  File is CommonJS module because '../package.json' does not have field "type"
	d/da/daa/randomFile.ts
	  Part of 'files' list in tsconfig.json
	  File is CommonJS module because '../package.json' does not have field "type"
	d/da/randomFile.ts
	  Part of 'files' list in tsconfig.json
	  File is CommonJS module because '../package.json' does not have field "type"
	e/ea/randomFile.ts
	  Part of 'files' list in tsconfig.json
	  File is CommonJS module because '../package.json' does not have field "type"
	e/ea/eaa/randomFile.ts
	  Part of 'files' list in tsconfig.json
	  File is CommonJS module because '../package.json' does not have field "type"
	e/ea/eaa/eaaa/randomFile.ts
	  Part of 'files' list in tsconfig.json
	  File is CommonJS module because '../package.json' does not have field "type"
	e/ea/eaa/eaaa/x/y/z/randomFile.ts
	  Part of 'files' list in tsconfig.json
	  File is CommonJS module because '../package.json' does not have field "type"
	f/fa/faa/x/y/z/randomFile.ts
	  Part of 'files' list in tsconfig.json
	  File is CommonJS module because '../package.json' does not have field "type"
	f/fa/faa/faaa/randomFile.ts
	  Part of 'files' list in tsconfig.json
	  File is CommonJS module because '../package.json' does not have field "type"

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/workspaces/project/package.json 250 undefined WatchType: package.json file
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "projectLoadingFinish",
      "body": {
        "projectName": "/home/src/workspaces/project/src/tsconfig.json"
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
          "projectId": "42f0ff7e30ac4a4bb5c390efeb3e313177d60d7f311d8821010103d6e0655daf",
          "fileStats": {
            "js": 0,
            "jsSize": 0,
            "jsx": 0,
            "jsxSize": 0,
            "ts": 21,
            "tsSize": 446,
            "tsx": 0,
            "tsxSize": 0,
            "dts": 1,
            "dtsSize": 413,
            "deferred": 0,
            "deferredSize": 0
          },
          "compilerOptions": {
            "target": "es2016",
            "composite": true,
            "module": "node16",
            "outDir": "",
            "traceResolution": true
          },
          "typeAcquisition": {
            "enable": false,
            "include": false,
            "exclude": false
          },
          "extends": false,
          "files": true,
          "include": false,
          "exclude": false,
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
        "triggerFile": "/home/src/workspaces/project/src/main.ts",
        "configFile": "/home/src/workspaces/project/src/tsconfig.json",
        "diagnostics": []
      }
    }
Info seq  [hh:mm:ss:mss] getConfigFileNameForFile:: File: /home/src/workspaces/project/src/tsconfig.json ProjectRootPath: undefined:: Result: undefined
Info seq  [hh:mm:ss:mss] Project '/home/src/workspaces/project/src/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (22)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: /home/src/workspaces/project/src/main.ts ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /home/src/workspaces/project/src/tsconfig.json
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
//// [/home/src/tslibs/TS/Lib/lib.es2016.full.d.ts] *Lib*


PolledWatches::
/home/src/tslibs/TS/Lib/package.json: *new*
  {"pollingInterval":2000}
/home/src/tslibs/TS/package.json: *new*
  {"pollingInterval":2000}
/home/src/tslibs/package.json: *new*
  {"pollingInterval":2000}
/home/src/workspaces/node_modules/@types: *new*
  {"pollingInterval":500}
/home/src/workspaces/project/node_modules/@types: *new*
  {"pollingInterval":500}
/home/src/workspaces/project/src/a/package.json: *new*
  {"pollingInterval":2000}
/home/src/workspaces/project/src/b/ba/package.json: *new*
  {"pollingInterval":2000}
/home/src/workspaces/project/src/b/package.json: *new*
  {"pollingInterval":2000}
/home/src/workspaces/project/src/c/ca/caa/caaa/package.json: *new*
  {"pollingInterval":2000}
/home/src/workspaces/project/src/c/ca/caa/package.json: *new*
  {"pollingInterval":2000}
/home/src/workspaces/project/src/c/ca/package.json: *new*
  {"pollingInterval":2000}
/home/src/workspaces/project/src/c/cb/package.json: *new*
  {"pollingInterval":2000}
/home/src/workspaces/project/src/c/package.json: *new*
  {"pollingInterval":2000}
/home/src/workspaces/project/src/d/da/daa/daaa/package.json: *new*
  {"pollingInterval":2000}
/home/src/workspaces/project/src/d/da/daa/daaa/x/package.json: *new*
  {"pollingInterval":2000}
/home/src/workspaces/project/src/d/da/daa/daaa/x/y/package.json: *new*
  {"pollingInterval":2000}
/home/src/workspaces/project/src/d/da/daa/daaa/x/y/z/package.json: *new*
  {"pollingInterval":2000}
/home/src/workspaces/project/src/d/da/daa/package.json: *new*
  {"pollingInterval":2000}
/home/src/workspaces/project/src/d/da/package.json: *new*
  {"pollingInterval":2000}
/home/src/workspaces/project/src/d/package.json: *new*
  {"pollingInterval":2000}
/home/src/workspaces/project/src/e/ea/eaa/eaaa/package.json: *new*
  {"pollingInterval":2000}
/home/src/workspaces/project/src/e/ea/eaa/eaaa/x/package.json: *new*
  {"pollingInterval":2000}
/home/src/workspaces/project/src/e/ea/eaa/eaaa/x/y/package.json: *new*
  {"pollingInterval":2000}
/home/src/workspaces/project/src/e/ea/eaa/eaaa/x/y/z/package.json: *new*
  {"pollingInterval":2000}
/home/src/workspaces/project/src/e/ea/eaa/package.json: *new*
  {"pollingInterval":2000}
/home/src/workspaces/project/src/e/ea/package.json: *new*
  {"pollingInterval":2000}
/home/src/workspaces/project/src/e/package.json: *new*
  {"pollingInterval":2000}
/home/src/workspaces/project/src/f/fa/faa/faaa/package.json: *new*
  {"pollingInterval":2000}
/home/src/workspaces/project/src/f/fa/faa/package.json: *new*
  {"pollingInterval":2000}
/home/src/workspaces/project/src/f/fa/faa/x/package.json: *new*
  {"pollingInterval":2000}
/home/src/workspaces/project/src/f/fa/faa/x/y/package.json: *new*
  {"pollingInterval":2000}
/home/src/workspaces/project/src/f/fa/faa/x/y/z/package.json: *new*
  {"pollingInterval":2000}
/home/src/workspaces/project/src/f/fa/package.json: *new*
  {"pollingInterval":2000}
/home/src/workspaces/project/src/f/package.json: *new*
  {"pollingInterval":2000}
/home/src/workspaces/project/src/node_modules/@types: *new*
  {"pollingInterval":500}
/home/src/workspaces/project/src/package.json: *new*
  {"pollingInterval":2000}

FsWatches::
/home/src/tslibs/TS/Lib/lib.es2016.full.d.ts: *new*
  {}
/home/src/workspaces/project/package.json: *new*
  {}
/home/src/workspaces/project/src/a/randomFile.ts: *new*
  {}
/home/src/workspaces/project/src/b/ba/randomFile.ts: *new*
  {}
/home/src/workspaces/project/src/b/randomFile.ts: *new*
  {}
/home/src/workspaces/project/src/c/ca/caa/caaa/randomFile.ts: *new*
  {}
/home/src/workspaces/project/src/c/ca/caa/randomFile.ts: *new*
  {}
/home/src/workspaces/project/src/c/ca/randomFile.ts: *new*
  {}
/home/src/workspaces/project/src/c/cb/randomFile.ts: *new*
  {}
/home/src/workspaces/project/src/d/da/daa/daaa/randomFile.ts: *new*
  {}
/home/src/workspaces/project/src/d/da/daa/daaa/x/y/z/randomFile.ts: *new*
  {}
/home/src/workspaces/project/src/d/da/daa/randomFile.ts: *new*
  {}
/home/src/workspaces/project/src/d/da/randomFile.ts: *new*
  {}
/home/src/workspaces/project/src/e/ea/eaa/eaaa/randomFile.ts: *new*
  {}
/home/src/workspaces/project/src/e/ea/eaa/eaaa/x/y/z/randomFile.ts: *new*
  {}
/home/src/workspaces/project/src/e/ea/eaa/randomFile.ts: *new*
  {}
/home/src/workspaces/project/src/e/ea/randomFile.ts: *new*
  {}
/home/src/workspaces/project/src/f/fa/faa/faaa/randomFile.ts: *new*
  {}
/home/src/workspaces/project/src/f/fa/faa/x/y/z/randomFile.ts: *new*
  {}
/home/src/workspaces/project/src/fileA.ts: *new*
  {}
/home/src/workspaces/project/src/fileB.mts: *new*
  {}
/home/src/workspaces/project/src/randomFile.ts: *new*
  {}
/home/src/workspaces/project/src/tsconfig.json: *new*
  {}

Projects::
/home/src/workspaces/project/src/tsconfig.json (Configured) *new*
    projectStateVersion: 1
    projectProgramVersion: 1
    autoImportProviderHost: false

ScriptInfos::
/home/src/tslibs/TS/Lib/lib.es2016.full.d.ts *new*
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/src/tsconfig.json
/home/src/workspaces/project/src/a/randomFile.ts *new*
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/src/tsconfig.json
/home/src/workspaces/project/src/b/ba/randomFile.ts *new*
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/src/tsconfig.json
/home/src/workspaces/project/src/b/randomFile.ts *new*
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/src/tsconfig.json
/home/src/workspaces/project/src/c/ca/caa/caaa/randomFile.ts *new*
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/src/tsconfig.json
/home/src/workspaces/project/src/c/ca/caa/randomFile.ts *new*
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/src/tsconfig.json
/home/src/workspaces/project/src/c/ca/randomFile.ts *new*
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/src/tsconfig.json
/home/src/workspaces/project/src/c/cb/randomFile.ts *new*
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/src/tsconfig.json
/home/src/workspaces/project/src/d/da/daa/daaa/randomFile.ts *new*
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/src/tsconfig.json
/home/src/workspaces/project/src/d/da/daa/daaa/x/y/z/randomFile.ts *new*
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/src/tsconfig.json
/home/src/workspaces/project/src/d/da/daa/randomFile.ts *new*
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/src/tsconfig.json
/home/src/workspaces/project/src/d/da/randomFile.ts *new*
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/src/tsconfig.json
/home/src/workspaces/project/src/e/ea/eaa/eaaa/randomFile.ts *new*
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/src/tsconfig.json
/home/src/workspaces/project/src/e/ea/eaa/eaaa/x/y/z/randomFile.ts *new*
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/src/tsconfig.json
/home/src/workspaces/project/src/e/ea/eaa/randomFile.ts *new*
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/src/tsconfig.json
/home/src/workspaces/project/src/e/ea/randomFile.ts *new*
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/src/tsconfig.json
/home/src/workspaces/project/src/f/fa/faa/faaa/randomFile.ts *new*
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/src/tsconfig.json
/home/src/workspaces/project/src/f/fa/faa/x/y/z/randomFile.ts *new*
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/src/tsconfig.json
/home/src/workspaces/project/src/fileA.ts *new*
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/src/tsconfig.json
/home/src/workspaces/project/src/fileB.mts *new*
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/src/tsconfig.json
/home/src/workspaces/project/src/main.ts (Open) *new*
    version: SVC-1-0
    containingProjects: 1
        /home/src/workspaces/project/src/tsconfig.json *default*
/home/src/workspaces/project/src/randomFile.ts *new*
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/src/tsconfig.json

random edit
Info seq  [hh:mm:ss:mss] FileWatcher:: Triggered with /home/src/workspaces/project/src/randomFile.ts 1:: WatchInfo: /home/src/workspaces/project/src/randomFile.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] Scheduled: /home/src/workspaces/project/src/tsconfig.json
Info seq  [hh:mm:ss:mss] Scheduled: *ensureProjectForOpenFiles*
Info seq  [hh:mm:ss:mss] Elapsed:: *ms FileWatcher:: Triggered with /home/src/workspaces/project/src/randomFile.ts 1:: WatchInfo: /home/src/workspaces/project/src/randomFile.ts 500 undefined WatchType: Closed Script info
Before running Timeout callback:: count: 2
1: /home/src/workspaces/project/src/tsconfig.json
2: *ensureProjectForOpenFiles*
//// [/home/src/workspaces/project/src/randomFile.ts]
export const x = 10;export const y = 10;


Timeout callback:: count: 2
1: /home/src/workspaces/project/src/tsconfig.json *new*
2: *ensureProjectForOpenFiles* *new*

Projects::
/home/src/workspaces/project/src/tsconfig.json (Configured) *changed*
    projectStateVersion: 2 *changed*
    projectProgramVersion: 1
    dirty: true *changed*
    autoImportProviderHost: false

ScriptInfos::
/home/src/tslibs/TS/Lib/lib.es2016.full.d.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/src/tsconfig.json
/home/src/workspaces/project/src/a/randomFile.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/src/tsconfig.json
/home/src/workspaces/project/src/b/ba/randomFile.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/src/tsconfig.json
/home/src/workspaces/project/src/b/randomFile.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/src/tsconfig.json
/home/src/workspaces/project/src/c/ca/caa/caaa/randomFile.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/src/tsconfig.json
/home/src/workspaces/project/src/c/ca/caa/randomFile.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/src/tsconfig.json
/home/src/workspaces/project/src/c/ca/randomFile.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/src/tsconfig.json
/home/src/workspaces/project/src/c/cb/randomFile.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/src/tsconfig.json
/home/src/workspaces/project/src/d/da/daa/daaa/randomFile.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/src/tsconfig.json
/home/src/workspaces/project/src/d/da/daa/daaa/x/y/z/randomFile.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/src/tsconfig.json
/home/src/workspaces/project/src/d/da/daa/randomFile.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/src/tsconfig.json
/home/src/workspaces/project/src/d/da/randomFile.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/src/tsconfig.json
/home/src/workspaces/project/src/e/ea/eaa/eaaa/randomFile.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/src/tsconfig.json
/home/src/workspaces/project/src/e/ea/eaa/eaaa/x/y/z/randomFile.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/src/tsconfig.json
/home/src/workspaces/project/src/e/ea/eaa/randomFile.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/src/tsconfig.json
/home/src/workspaces/project/src/e/ea/randomFile.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/src/tsconfig.json
/home/src/workspaces/project/src/f/fa/faa/faaa/randomFile.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/src/tsconfig.json
/home/src/workspaces/project/src/f/fa/faa/x/y/z/randomFile.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/src/tsconfig.json
/home/src/workspaces/project/src/fileA.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/src/tsconfig.json
/home/src/workspaces/project/src/fileB.mts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/src/tsconfig.json
/home/src/workspaces/project/src/main.ts (Open)
    version: SVC-1-0
    containingProjects: 1
        /home/src/workspaces/project/src/tsconfig.json *default*
/home/src/workspaces/project/src/randomFile.ts *changed*
    version: Text-1
    pendingReloadFromDisk: true *changed*
    containingProjects: 1
        /home/src/workspaces/project/src/tsconfig.json

Info seq  [hh:mm:ss:mss] Running: /home/src/workspaces/project/src/tsconfig.json
Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: /home/src/workspaces/project/src/tsconfig.json
Info seq  [hh:mm:ss:mss] File '/home/src/tslibs/TS/Lib/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/tslibs/TS/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/tslibs/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/package.json' exists according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/package.json' exists according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/package.json' exists according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/a/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/package.json' exists according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/b/ba/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/b/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/package.json' exists according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/b/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/package.json' exists according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/c/ca/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/c/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/package.json' exists according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/c/ca/caa/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/c/ca/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/c/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/package.json' exists according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/c/ca/caa/caaa/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/c/ca/caa/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/c/ca/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/c/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/package.json' exists according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/c/cb/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/c/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/package.json' exists according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/d/da/daa/daaa/x/y/z/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/d/da/daa/daaa/x/y/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/d/da/daa/daaa/x/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/d/da/daa/daaa/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/d/da/daa/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/d/da/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/d/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/package.json' exists according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/d/da/daa/daaa/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/d/da/daa/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/d/da/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/d/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/package.json' exists according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/d/da/daa/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/d/da/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/d/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/package.json' exists according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/d/da/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/d/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/package.json' exists according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/e/ea/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/e/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/package.json' exists according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/e/ea/eaa/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/e/ea/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/e/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/package.json' exists according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/e/ea/eaa/eaaa/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/e/ea/eaa/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/e/ea/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/e/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/package.json' exists according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/e/ea/eaa/eaaa/x/y/z/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/e/ea/eaa/eaaa/x/y/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/e/ea/eaa/eaaa/x/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/e/ea/eaa/eaaa/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/e/ea/eaa/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/e/ea/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/e/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/package.json' exists according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/f/fa/faa/x/y/z/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/f/fa/faa/x/y/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/f/fa/faa/x/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/f/fa/faa/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/f/fa/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/f/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/package.json' exists according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/f/fa/faa/faaa/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/f/fa/faa/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/f/fa/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/f/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/package.json' exists according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: /home/src/workspaces/project/src/tsconfig.json projectStateVersion: 2 projectProgramVersion: 1 structureChanged: false structureIsReused:: Completely Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Project '/home/src/workspaces/project/src/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (22)
	/home/src/tslibs/TS/Lib/lib.es2016.full.d.ts Text-1 "/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };"
	/home/src/workspaces/project/src/main.ts SVC-1-0 "export const x = 10;"
	/home/src/workspaces/project/src/fileB.mts Text-1 "export function foo() {}"
	/home/src/workspaces/project/src/fileA.ts Text-1 "import { foo } from \"./fileB.mjs\";\nfoo();\n"
	/home/src/workspaces/project/src/randomFile.ts Text-2 "export const x = 10;export const y = 10;"
	/home/src/workspaces/project/src/a/randomFile.ts Text-1 "export const x = 10;"
	/home/src/workspaces/project/src/b/ba/randomFile.ts Text-1 "export const x = 10;"
	/home/src/workspaces/project/src/b/randomFile.ts Text-1 "export const x = 10;"
	/home/src/workspaces/project/src/c/ca/randomFile.ts Text-1 "export const x = 10;"
	/home/src/workspaces/project/src/c/ca/caa/randomFile.ts Text-1 "export const x = 10;"
	/home/src/workspaces/project/src/c/ca/caa/caaa/randomFile.ts Text-1 "export const x = 10;"
	/home/src/workspaces/project/src/c/cb/randomFile.ts Text-1 "export const x = 10;"
	/home/src/workspaces/project/src/d/da/daa/daaa/x/y/z/randomFile.ts Text-1 "export const x = 10;"
	/home/src/workspaces/project/src/d/da/daa/daaa/randomFile.ts Text-1 "export const x = 10;"
	/home/src/workspaces/project/src/d/da/daa/randomFile.ts Text-1 "export const x = 10;"
	/home/src/workspaces/project/src/d/da/randomFile.ts Text-1 "export const x = 10;"
	/home/src/workspaces/project/src/e/ea/randomFile.ts Text-1 "export const x = 10;"
	/home/src/workspaces/project/src/e/ea/eaa/randomFile.ts Text-1 "export const x = 10;"
	/home/src/workspaces/project/src/e/ea/eaa/eaaa/randomFile.ts Text-1 "export const x = 10;"
	/home/src/workspaces/project/src/e/ea/eaa/eaaa/x/y/z/randomFile.ts Text-1 "export const x = 10;"
	/home/src/workspaces/project/src/f/fa/faa/x/y/z/randomFile.ts Text-1 "export const x = 10;"
	/home/src/workspaces/project/src/f/fa/faa/faaa/randomFile.ts Text-1 "export const x = 10;"

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Running: *ensureProjectForOpenFiles*
Info seq  [hh:mm:ss:mss] Before ensureProjectForOpenFiles:
Info seq  [hh:mm:ss:mss] Project '/home/src/workspaces/project/src/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (22)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: /home/src/workspaces/project/src/main.ts ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /home/src/workspaces/project/src/tsconfig.json
Info seq  [hh:mm:ss:mss] After ensureProjectForOpenFiles:
Info seq  [hh:mm:ss:mss] Project '/home/src/workspaces/project/src/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (22)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: /home/src/workspaces/project/src/main.ts ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /home/src/workspaces/project/src/tsconfig.json
Info seq  [hh:mm:ss:mss] got projects updated in background /home/src/workspaces/project/src/main.ts
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "projectsUpdatedInBackground",
      "body": {
        "openFiles": [
          "/home/src/workspaces/project/src/main.ts"
        ]
      }
    }
After running Timeout callback:: count: 0

Projects::
/home/src/workspaces/project/src/tsconfig.json (Configured) *changed*
    projectStateVersion: 2
    projectProgramVersion: 1
    dirty: false *changed*
    autoImportProviderHost: false

ScriptInfos::
/home/src/tslibs/TS/Lib/lib.es2016.full.d.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/src/tsconfig.json
/home/src/workspaces/project/src/a/randomFile.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/src/tsconfig.json
/home/src/workspaces/project/src/b/ba/randomFile.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/src/tsconfig.json
/home/src/workspaces/project/src/b/randomFile.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/src/tsconfig.json
/home/src/workspaces/project/src/c/ca/caa/caaa/randomFile.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/src/tsconfig.json
/home/src/workspaces/project/src/c/ca/caa/randomFile.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/src/tsconfig.json
/home/src/workspaces/project/src/c/ca/randomFile.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/src/tsconfig.json
/home/src/workspaces/project/src/c/cb/randomFile.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/src/tsconfig.json
/home/src/workspaces/project/src/d/da/daa/daaa/randomFile.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/src/tsconfig.json
/home/src/workspaces/project/src/d/da/daa/daaa/x/y/z/randomFile.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/src/tsconfig.json
/home/src/workspaces/project/src/d/da/daa/randomFile.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/src/tsconfig.json
/home/src/workspaces/project/src/d/da/randomFile.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/src/tsconfig.json
/home/src/workspaces/project/src/e/ea/eaa/eaaa/randomFile.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/src/tsconfig.json
/home/src/workspaces/project/src/e/ea/eaa/eaaa/x/y/z/randomFile.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/src/tsconfig.json
/home/src/workspaces/project/src/e/ea/eaa/randomFile.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/src/tsconfig.json
/home/src/workspaces/project/src/e/ea/randomFile.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/src/tsconfig.json
/home/src/workspaces/project/src/f/fa/faa/faaa/randomFile.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/src/tsconfig.json
/home/src/workspaces/project/src/f/fa/faa/x/y/z/randomFile.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/src/tsconfig.json
/home/src/workspaces/project/src/fileA.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/src/tsconfig.json
/home/src/workspaces/project/src/fileB.mts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/src/tsconfig.json
/home/src/workspaces/project/src/main.ts (Open)
    version: SVC-1-0
    containingProjects: 1
        /home/src/workspaces/project/src/tsconfig.json *default*
/home/src/workspaces/project/src/randomFile.ts *changed*
    version: Text-2 *changed*
    pendingReloadFromDisk: false *changed*
    containingProjects: 1
        /home/src/workspaces/project/src/tsconfig.json

Before running Timeout callback:: count: 0

After running Timeout callback:: count: 0

Modify package json file to add type module
Info seq  [hh:mm:ss:mss] FileWatcher:: Triggered with /home/src/workspaces/project/package.json 1:: WatchInfo: /home/src/workspaces/project/package.json 2000 undefined Project: /home/src/workspaces/project/src/tsconfig.json WatchType: File location affecting resolution
Info seq  [hh:mm:ss:mss] Scheduled: /home/src/workspaces/project/src/tsconfig.jsonFailedLookupInvalidation
Info seq  [hh:mm:ss:mss] Elapsed:: *ms FileWatcher:: Triggered with /home/src/workspaces/project/package.json 1:: WatchInfo: /home/src/workspaces/project/package.json 2000 undefined Project: /home/src/workspaces/project/src/tsconfig.json WatchType: File location affecting resolution
Info seq  [hh:mm:ss:mss] FileWatcher:: Triggered with /home/src/workspaces/project/package.json 1:: WatchInfo: /home/src/workspaces/project/package.json 250 undefined WatchType: package.json file
Info seq  [hh:mm:ss:mss] Elapsed:: *ms FileWatcher:: Triggered with /home/src/workspaces/project/package.json 1:: WatchInfo: /home/src/workspaces/project/package.json 250 undefined WatchType: package.json file
Before running Timeout callback:: count: 1
3: /home/src/workspaces/project/src/tsconfig.jsonFailedLookupInvalidation
//// [/home/src/workspaces/project/package.json]
{
  "name": "app",
  "version": "1.0.0",
  "type": "module"
}


Timeout callback:: count: 1
3: /home/src/workspaces/project/src/tsconfig.jsonFailedLookupInvalidation *new*

Projects::
/home/src/workspaces/project/src/tsconfig.json (Configured) *changed*
    projectStateVersion: 2
    projectProgramVersion: 1
    autoImportProviderHost: undefined *changed*

Info seq  [hh:mm:ss:mss] Running: /home/src/workspaces/project/src/tsconfig.jsonFailedLookupInvalidation
Info seq  [hh:mm:ss:mss] Scheduled: /home/src/workspaces/project/src/tsconfig.json
Info seq  [hh:mm:ss:mss] Scheduled: *ensureProjectForOpenFiles*
After running Timeout callback:: count: 2

Timeout callback:: count: 2
4: /home/src/workspaces/project/src/tsconfig.json *new*
5: *ensureProjectForOpenFiles* *new*

Projects::
/home/src/workspaces/project/src/tsconfig.json (Configured) *changed*
    projectStateVersion: 3 *changed*
    projectProgramVersion: 1
    dirty: true *changed*

Before running Timeout callback:: count: 2
4: /home/src/workspaces/project/src/tsconfig.json
5: *ensureProjectForOpenFiles*

Info seq  [hh:mm:ss:mss] Running: /home/src/workspaces/project/src/tsconfig.json
Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: /home/src/workspaces/project/src/tsconfig.json
Info seq  [hh:mm:ss:mss] File '/home/src/tslibs/TS/Lib/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/tslibs/TS/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/tslibs/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] Found 'package.json' at '/home/src/workspaces/project/package.json'.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/package.json' exists according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/package.json' exists according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/a/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/package.json' exists according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/b/ba/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/b/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/package.json' exists according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/b/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/package.json' exists according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/c/ca/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/c/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/package.json' exists according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/c/ca/caa/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/c/ca/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/c/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/package.json' exists according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/c/ca/caa/caaa/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/c/ca/caa/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/c/ca/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/c/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/package.json' exists according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/c/cb/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/c/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/package.json' exists according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/d/da/daa/daaa/x/y/z/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/d/da/daa/daaa/x/y/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/d/da/daa/daaa/x/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/d/da/daa/daaa/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/d/da/daa/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/d/da/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/d/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/package.json' exists according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/d/da/daa/daaa/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/d/da/daa/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/d/da/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/d/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/package.json' exists according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/d/da/daa/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/d/da/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/d/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/package.json' exists according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/d/da/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/d/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/package.json' exists according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/e/ea/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/e/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/package.json' exists according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/e/ea/eaa/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/e/ea/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/e/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/package.json' exists according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/e/ea/eaa/eaaa/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/e/ea/eaa/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/e/ea/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/e/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/package.json' exists according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/e/ea/eaa/eaaa/x/y/z/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/e/ea/eaa/eaaa/x/y/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/e/ea/eaa/eaaa/x/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/e/ea/eaa/eaaa/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/e/ea/eaa/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/e/ea/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/e/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/package.json' exists according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/f/fa/faa/x/y/z/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/f/fa/faa/x/y/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/f/fa/faa/x/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/f/fa/faa/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/f/fa/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/f/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/package.json' exists according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/f/fa/faa/faaa/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/f/fa/faa/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/f/fa/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/f/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/package.json' exists according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/package.json' exists according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/package.json' exists according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] ======== Resolving module './fileB.mjs' from '/home/src/workspaces/project/src/fileA.ts'. ========
Info seq  [hh:mm:ss:mss] Module resolution kind is not specified, using 'Node16'.
Info seq  [hh:mm:ss:mss] Resolving in ESM mode with conditions 'import', 'types', 'node'.
Info seq  [hh:mm:ss:mss] Loading module as file / folder, candidate module location '/home/src/workspaces/project/src/fileB.mjs', target file types: TypeScript, JavaScript, Declaration.
Info seq  [hh:mm:ss:mss] File name '/home/src/workspaces/project/src/fileB.mjs' has a '.mjs' extension - stripping it.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/fileB.mts' exists - use it as a name resolution result.
Info seq  [hh:mm:ss:mss] ======== Module name './fileB.mjs' was successfully resolved to '/home/src/workspaces/project/src/fileB.mts'. ========
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/package.json' exists according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/a/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/package.json' exists according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/b/ba/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/b/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/package.json' exists according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/b/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/package.json' exists according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/c/ca/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/c/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/package.json' exists according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/c/ca/caa/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/c/ca/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/c/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/package.json' exists according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/c/ca/caa/caaa/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/c/ca/caa/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/c/ca/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/c/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/package.json' exists according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/c/cb/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/c/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/package.json' exists according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/d/da/daa/daaa/x/y/z/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/d/da/daa/daaa/x/y/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/d/da/daa/daaa/x/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/d/da/daa/daaa/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/d/da/daa/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/d/da/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/d/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/package.json' exists according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/d/da/daa/daaa/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/d/da/daa/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/d/da/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/d/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/package.json' exists according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/d/da/daa/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/d/da/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/d/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/package.json' exists according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/d/da/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/d/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/package.json' exists according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/e/ea/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/e/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/package.json' exists according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/e/ea/eaa/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/e/ea/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/e/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/package.json' exists according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/e/ea/eaa/eaaa/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/e/ea/eaa/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/e/ea/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/e/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/package.json' exists according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/e/ea/eaa/eaaa/x/y/z/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/e/ea/eaa/eaaa/x/y/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/e/ea/eaa/eaaa/x/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/e/ea/eaa/eaaa/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/e/ea/eaa/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/e/ea/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/e/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/package.json' exists according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/f/fa/faa/x/y/z/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/f/fa/faa/x/y/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/f/fa/faa/x/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/f/fa/faa/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/f/fa/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/f/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/package.json' exists according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/f/fa/faa/faaa/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/f/fa/faa/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/f/fa/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/f/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/package.json' exists according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/tslibs/TS/Lib/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/tslibs/TS/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/tslibs/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: /home/src/workspaces/project/src/tsconfig.json projectStateVersion: 3 projectProgramVersion: 1 structureChanged: true structureIsReused:: SafeModules Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Project '/home/src/workspaces/project/src/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (22)
	/home/src/tslibs/TS/Lib/lib.es2016.full.d.ts Text-1 "/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };"
	/home/src/workspaces/project/src/main.ts SVC-1-0 "export const x = 10;"
	/home/src/workspaces/project/src/fileB.mts Text-1 "export function foo() {}"
	/home/src/workspaces/project/src/fileA.ts Text-1 "import { foo } from \"./fileB.mjs\";\nfoo();\n"
	/home/src/workspaces/project/src/randomFile.ts Text-2 "export const x = 10;export const y = 10;"
	/home/src/workspaces/project/src/a/randomFile.ts Text-1 "export const x = 10;"
	/home/src/workspaces/project/src/b/ba/randomFile.ts Text-1 "export const x = 10;"
	/home/src/workspaces/project/src/b/randomFile.ts Text-1 "export const x = 10;"
	/home/src/workspaces/project/src/c/ca/randomFile.ts Text-1 "export const x = 10;"
	/home/src/workspaces/project/src/c/ca/caa/randomFile.ts Text-1 "export const x = 10;"
	/home/src/workspaces/project/src/c/ca/caa/caaa/randomFile.ts Text-1 "export const x = 10;"
	/home/src/workspaces/project/src/c/cb/randomFile.ts Text-1 "export const x = 10;"
	/home/src/workspaces/project/src/d/da/daa/daaa/x/y/z/randomFile.ts Text-1 "export const x = 10;"
	/home/src/workspaces/project/src/d/da/daa/daaa/randomFile.ts Text-1 "export const x = 10;"
	/home/src/workspaces/project/src/d/da/daa/randomFile.ts Text-1 "export const x = 10;"
	/home/src/workspaces/project/src/d/da/randomFile.ts Text-1 "export const x = 10;"
	/home/src/workspaces/project/src/e/ea/randomFile.ts Text-1 "export const x = 10;"
	/home/src/workspaces/project/src/e/ea/eaa/randomFile.ts Text-1 "export const x = 10;"
	/home/src/workspaces/project/src/e/ea/eaa/eaaa/randomFile.ts Text-1 "export const x = 10;"
	/home/src/workspaces/project/src/e/ea/eaa/eaaa/x/y/z/randomFile.ts Text-1 "export const x = 10;"
	/home/src/workspaces/project/src/f/fa/faa/x/y/z/randomFile.ts Text-1 "export const x = 10;"
	/home/src/workspaces/project/src/f/fa/faa/faaa/randomFile.ts Text-1 "export const x = 10;"

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Running: *ensureProjectForOpenFiles*
Info seq  [hh:mm:ss:mss] Before ensureProjectForOpenFiles:
Info seq  [hh:mm:ss:mss] Project '/home/src/workspaces/project/src/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (22)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: /home/src/workspaces/project/src/main.ts ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /home/src/workspaces/project/src/tsconfig.json
Info seq  [hh:mm:ss:mss] After ensureProjectForOpenFiles:
Info seq  [hh:mm:ss:mss] Project '/home/src/workspaces/project/src/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (22)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: /home/src/workspaces/project/src/main.ts ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /home/src/workspaces/project/src/tsconfig.json
Info seq  [hh:mm:ss:mss] got projects updated in background /home/src/workspaces/project/src/main.ts
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "projectsUpdatedInBackground",
      "body": {
        "openFiles": [
          "/home/src/workspaces/project/src/main.ts"
        ]
      }
    }
After running Timeout callback:: count: 0

Projects::
/home/src/workspaces/project/src/tsconfig.json (Configured) *changed*
    projectStateVersion: 3
    projectProgramVersion: 2 *changed*
    dirty: false *changed*

Modify package.json file to remove type module
Info seq  [hh:mm:ss:mss] FileWatcher:: Triggered with /home/src/workspaces/project/package.json 1:: WatchInfo: /home/src/workspaces/project/package.json 2000 undefined Project: /home/src/workspaces/project/src/tsconfig.json WatchType: File location affecting resolution
Info seq  [hh:mm:ss:mss] Scheduled: /home/src/workspaces/project/src/tsconfig.jsonFailedLookupInvalidation
Info seq  [hh:mm:ss:mss] Elapsed:: *ms FileWatcher:: Triggered with /home/src/workspaces/project/package.json 1:: WatchInfo: /home/src/workspaces/project/package.json 2000 undefined Project: /home/src/workspaces/project/src/tsconfig.json WatchType: File location affecting resolution
Info seq  [hh:mm:ss:mss] FileWatcher:: Triggered with /home/src/workspaces/project/package.json 1:: WatchInfo: /home/src/workspaces/project/package.json 250 undefined WatchType: package.json file
Info seq  [hh:mm:ss:mss] Elapsed:: *ms FileWatcher:: Triggered with /home/src/workspaces/project/package.json 1:: WatchInfo: /home/src/workspaces/project/package.json 250 undefined WatchType: package.json file
Before running Timeout callback:: count: 1
6: /home/src/workspaces/project/src/tsconfig.jsonFailedLookupInvalidation
//// [/home/src/workspaces/project/package.json]
{
  "name": "app",
  "version": "1.0.0"
}


Timeout callback:: count: 1
6: /home/src/workspaces/project/src/tsconfig.jsonFailedLookupInvalidation *new*

Info seq  [hh:mm:ss:mss] Running: /home/src/workspaces/project/src/tsconfig.jsonFailedLookupInvalidation
Info seq  [hh:mm:ss:mss] Scheduled: /home/src/workspaces/project/src/tsconfig.json
Info seq  [hh:mm:ss:mss] Scheduled: *ensureProjectForOpenFiles*
After running Timeout callback:: count: 2

Timeout callback:: count: 2
7: /home/src/workspaces/project/src/tsconfig.json *new*
8: *ensureProjectForOpenFiles* *new*

Projects::
/home/src/workspaces/project/src/tsconfig.json (Configured) *changed*
    projectStateVersion: 4 *changed*
    projectProgramVersion: 2
    dirty: true *changed*

Before running Timeout callback:: count: 2
7: /home/src/workspaces/project/src/tsconfig.json
8: *ensureProjectForOpenFiles*

Info seq  [hh:mm:ss:mss] Running: /home/src/workspaces/project/src/tsconfig.json
Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: /home/src/workspaces/project/src/tsconfig.json
Info seq  [hh:mm:ss:mss] File '/home/src/tslibs/TS/Lib/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/tslibs/TS/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/tslibs/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] Found 'package.json' at '/home/src/workspaces/project/package.json'.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/package.json' exists according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/package.json' exists according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/a/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/package.json' exists according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/b/ba/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/b/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/package.json' exists according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/b/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/package.json' exists according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/c/ca/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/c/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/package.json' exists according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/c/ca/caa/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/c/ca/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/c/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/package.json' exists according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/c/ca/caa/caaa/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/c/ca/caa/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/c/ca/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/c/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/package.json' exists according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/c/cb/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/c/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/package.json' exists according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/d/da/daa/daaa/x/y/z/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/d/da/daa/daaa/x/y/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/d/da/daa/daaa/x/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/d/da/daa/daaa/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/d/da/daa/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/d/da/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/d/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/package.json' exists according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/d/da/daa/daaa/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/d/da/daa/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/d/da/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/d/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/package.json' exists according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/d/da/daa/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/d/da/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/d/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/package.json' exists according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/d/da/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/d/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/package.json' exists according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/e/ea/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/e/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/package.json' exists according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/e/ea/eaa/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/e/ea/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/e/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/package.json' exists according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/e/ea/eaa/eaaa/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/e/ea/eaa/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/e/ea/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/e/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/package.json' exists according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/e/ea/eaa/eaaa/x/y/z/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/e/ea/eaa/eaaa/x/y/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/e/ea/eaa/eaaa/x/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/e/ea/eaa/eaaa/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/e/ea/eaa/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/e/ea/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/e/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/package.json' exists according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/f/fa/faa/x/y/z/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/f/fa/faa/x/y/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/f/fa/faa/x/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/f/fa/faa/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/f/fa/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/f/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/package.json' exists according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/f/fa/faa/faaa/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/f/fa/faa/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/f/fa/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/f/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/package.json' exists according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/package.json' exists according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/package.json' exists according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] ======== Resolving module './fileB.mjs' from '/home/src/workspaces/project/src/fileA.ts'. ========
Info seq  [hh:mm:ss:mss] Module resolution kind is not specified, using 'Node16'.
Info seq  [hh:mm:ss:mss] Resolving in CJS mode with conditions 'require', 'types', 'node'.
Info seq  [hh:mm:ss:mss] Loading module as file / folder, candidate module location '/home/src/workspaces/project/src/fileB.mjs', target file types: TypeScript, JavaScript, Declaration.
Info seq  [hh:mm:ss:mss] File name '/home/src/workspaces/project/src/fileB.mjs' has a '.mjs' extension - stripping it.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/fileB.mts' exists - use it as a name resolution result.
Info seq  [hh:mm:ss:mss] ======== Module name './fileB.mjs' was successfully resolved to '/home/src/workspaces/project/src/fileB.mts'. ========
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/package.json' exists according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/a/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/package.json' exists according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/b/ba/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/b/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/package.json' exists according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/b/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/package.json' exists according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/c/ca/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/c/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/package.json' exists according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/c/ca/caa/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/c/ca/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/c/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/package.json' exists according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/c/ca/caa/caaa/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/c/ca/caa/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/c/ca/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/c/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/package.json' exists according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/c/cb/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/c/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/package.json' exists according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/d/da/daa/daaa/x/y/z/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/d/da/daa/daaa/x/y/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/d/da/daa/daaa/x/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/d/da/daa/daaa/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/d/da/daa/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/d/da/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/d/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/package.json' exists according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/d/da/daa/daaa/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/d/da/daa/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/d/da/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/d/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/package.json' exists according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/d/da/daa/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/d/da/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/d/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/package.json' exists according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/d/da/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/d/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/package.json' exists according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/e/ea/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/e/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/package.json' exists according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/e/ea/eaa/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/e/ea/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/e/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/package.json' exists according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/e/ea/eaa/eaaa/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/e/ea/eaa/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/e/ea/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/e/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/package.json' exists according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/e/ea/eaa/eaaa/x/y/z/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/e/ea/eaa/eaaa/x/y/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/e/ea/eaa/eaaa/x/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/e/ea/eaa/eaaa/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/e/ea/eaa/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/e/ea/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/e/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/package.json' exists according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/f/fa/faa/x/y/z/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/f/fa/faa/x/y/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/f/fa/faa/x/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/f/fa/faa/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/f/fa/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/f/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/package.json' exists according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/f/fa/faa/faaa/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/f/fa/faa/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/f/fa/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/f/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/package.json' exists according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/tslibs/TS/Lib/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/tslibs/TS/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/tslibs/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: /home/src/workspaces/project/src/tsconfig.json projectStateVersion: 4 projectProgramVersion: 2 structureChanged: true structureIsReused:: SafeModules Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Project '/home/src/workspaces/project/src/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (22)
	/home/src/tslibs/TS/Lib/lib.es2016.full.d.ts Text-1 "/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };"
	/home/src/workspaces/project/src/main.ts SVC-1-0 "export const x = 10;"
	/home/src/workspaces/project/src/fileB.mts Text-1 "export function foo() {}"
	/home/src/workspaces/project/src/fileA.ts Text-1 "import { foo } from \"./fileB.mjs\";\nfoo();\n"
	/home/src/workspaces/project/src/randomFile.ts Text-2 "export const x = 10;export const y = 10;"
	/home/src/workspaces/project/src/a/randomFile.ts Text-1 "export const x = 10;"
	/home/src/workspaces/project/src/b/ba/randomFile.ts Text-1 "export const x = 10;"
	/home/src/workspaces/project/src/b/randomFile.ts Text-1 "export const x = 10;"
	/home/src/workspaces/project/src/c/ca/randomFile.ts Text-1 "export const x = 10;"
	/home/src/workspaces/project/src/c/ca/caa/randomFile.ts Text-1 "export const x = 10;"
	/home/src/workspaces/project/src/c/ca/caa/caaa/randomFile.ts Text-1 "export const x = 10;"
	/home/src/workspaces/project/src/c/cb/randomFile.ts Text-1 "export const x = 10;"
	/home/src/workspaces/project/src/d/da/daa/daaa/x/y/z/randomFile.ts Text-1 "export const x = 10;"
	/home/src/workspaces/project/src/d/da/daa/daaa/randomFile.ts Text-1 "export const x = 10;"
	/home/src/workspaces/project/src/d/da/daa/randomFile.ts Text-1 "export const x = 10;"
	/home/src/workspaces/project/src/d/da/randomFile.ts Text-1 "export const x = 10;"
	/home/src/workspaces/project/src/e/ea/randomFile.ts Text-1 "export const x = 10;"
	/home/src/workspaces/project/src/e/ea/eaa/randomFile.ts Text-1 "export const x = 10;"
	/home/src/workspaces/project/src/e/ea/eaa/eaaa/randomFile.ts Text-1 "export const x = 10;"
	/home/src/workspaces/project/src/e/ea/eaa/eaaa/x/y/z/randomFile.ts Text-1 "export const x = 10;"
	/home/src/workspaces/project/src/f/fa/faa/x/y/z/randomFile.ts Text-1 "export const x = 10;"
	/home/src/workspaces/project/src/f/fa/faa/faaa/randomFile.ts Text-1 "export const x = 10;"

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Running: *ensureProjectForOpenFiles*
Info seq  [hh:mm:ss:mss] Before ensureProjectForOpenFiles:
Info seq  [hh:mm:ss:mss] Project '/home/src/workspaces/project/src/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (22)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: /home/src/workspaces/project/src/main.ts ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /home/src/workspaces/project/src/tsconfig.json
Info seq  [hh:mm:ss:mss] After ensureProjectForOpenFiles:
Info seq  [hh:mm:ss:mss] Project '/home/src/workspaces/project/src/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (22)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: /home/src/workspaces/project/src/main.ts ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /home/src/workspaces/project/src/tsconfig.json
Info seq  [hh:mm:ss:mss] got projects updated in background /home/src/workspaces/project/src/main.ts
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "projectsUpdatedInBackground",
      "body": {
        "openFiles": [
          "/home/src/workspaces/project/src/main.ts"
        ]
      }
    }
After running Timeout callback:: count: 0

Projects::
/home/src/workspaces/project/src/tsconfig.json (Configured) *changed*
    projectStateVersion: 4
    projectProgramVersion: 3 *changed*
    dirty: false *changed*

Delete package.json
Info seq  [hh:mm:ss:mss] FileWatcher:: Triggered with /home/src/workspaces/project/package.json 2:: WatchInfo: /home/src/workspaces/project/package.json 2000 undefined Project: /home/src/workspaces/project/src/tsconfig.json WatchType: File location affecting resolution
Info seq  [hh:mm:ss:mss] Scheduled: /home/src/workspaces/project/src/tsconfig.jsonFailedLookupInvalidation
Info seq  [hh:mm:ss:mss] Elapsed:: *ms FileWatcher:: Triggered with /home/src/workspaces/project/package.json 2:: WatchInfo: /home/src/workspaces/project/package.json 2000 undefined Project: /home/src/workspaces/project/src/tsconfig.json WatchType: File location affecting resolution
Info seq  [hh:mm:ss:mss] FileWatcher:: Triggered with /home/src/workspaces/project/package.json 2:: WatchInfo: /home/src/workspaces/project/package.json 250 undefined WatchType: package.json file
Info seq  [hh:mm:ss:mss] FileWatcher:: Close:: WatchInfo: /home/src/workspaces/project/package.json 250 undefined WatchType: package.json file
Info seq  [hh:mm:ss:mss] Elapsed:: *ms FileWatcher:: Triggered with /home/src/workspaces/project/package.json 2:: WatchInfo: /home/src/workspaces/project/package.json 250 undefined WatchType: package.json file
Before running Timeout callback:: count: 1
9: /home/src/workspaces/project/src/tsconfig.jsonFailedLookupInvalidation
//// [/home/src/workspaces/project/package.json] deleted

Timeout callback:: count: 1
9: /home/src/workspaces/project/src/tsconfig.jsonFailedLookupInvalidation *new*

Info seq  [hh:mm:ss:mss] Running: /home/src/workspaces/project/src/tsconfig.jsonFailedLookupInvalidation
Info seq  [hh:mm:ss:mss] Scheduled: /home/src/workspaces/project/src/tsconfig.json
Info seq  [hh:mm:ss:mss] Scheduled: *ensureProjectForOpenFiles*
After running Timeout callback:: count: 2

Timeout callback:: count: 2
10: /home/src/workspaces/project/src/tsconfig.json *new*
11: *ensureProjectForOpenFiles* *new*

Projects::
/home/src/workspaces/project/src/tsconfig.json (Configured) *changed*
    projectStateVersion: 5 *changed*
    projectProgramVersion: 3
    dirty: true *changed*

Before running Timeout callback:: count: 2
10: /home/src/workspaces/project/src/tsconfig.json
11: *ensureProjectForOpenFiles*

Info seq  [hh:mm:ss:mss] Running: /home/src/workspaces/project/src/tsconfig.json
Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: /home/src/workspaces/project/src/tsconfig.json
Info seq  [hh:mm:ss:mss] File '/home/src/tslibs/TS/Lib/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/tslibs/TS/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/tslibs/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/package.json' does not exist.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/package.json' does not exist.
Info seq  [hh:mm:ss:mss] File '/home/src/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/a/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/b/ba/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/b/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/b/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/c/ca/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/c/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/c/ca/caa/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/c/ca/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/c/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/c/ca/caa/caaa/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/c/ca/caa/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/c/ca/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/c/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/c/cb/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/c/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/d/da/daa/daaa/x/y/z/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/d/da/daa/daaa/x/y/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/d/da/daa/daaa/x/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/d/da/daa/daaa/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/d/da/daa/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/d/da/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/d/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/d/da/daa/daaa/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/d/da/daa/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/d/da/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/d/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/d/da/daa/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/d/da/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/d/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/d/da/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/d/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/e/ea/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/e/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/e/ea/eaa/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/e/ea/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/e/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/e/ea/eaa/eaaa/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/e/ea/eaa/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/e/ea/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/e/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/e/ea/eaa/eaaa/x/y/z/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/e/ea/eaa/eaaa/x/y/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/e/ea/eaa/eaaa/x/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/e/ea/eaa/eaaa/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/e/ea/eaa/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/e/ea/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/e/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/f/fa/faa/x/y/z/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/f/fa/faa/x/y/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/f/fa/faa/x/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/f/fa/faa/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/f/fa/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/f/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/f/fa/faa/faaa/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/f/fa/faa/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/f/fa/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/f/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] Reusing resolution of module './fileB.mjs' from '/home/src/workspaces/project/src/fileA.ts' of old program, it was successfully resolved to '/home/src/workspaces/project/src/fileB.mts'.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/a/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/b/ba/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/b/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/b/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/c/ca/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/c/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/c/ca/caa/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/c/ca/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/c/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/c/ca/caa/caaa/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/c/ca/caa/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/c/ca/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/c/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/c/cb/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/c/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/d/da/daa/daaa/x/y/z/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/d/da/daa/daaa/x/y/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/d/da/daa/daaa/x/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/d/da/daa/daaa/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/d/da/daa/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/d/da/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/d/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/d/da/daa/daaa/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/d/da/daa/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/d/da/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/d/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/d/da/daa/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/d/da/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/d/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/d/da/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/d/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/e/ea/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/e/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/e/ea/eaa/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/e/ea/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/e/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/e/ea/eaa/eaaa/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/e/ea/eaa/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/e/ea/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/e/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/e/ea/eaa/eaaa/x/y/z/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/e/ea/eaa/eaaa/x/y/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/e/ea/eaa/eaaa/x/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/e/ea/eaa/eaaa/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/e/ea/eaa/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/e/ea/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/e/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/f/fa/faa/x/y/z/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/f/fa/faa/x/y/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/f/fa/faa/x/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/f/fa/faa/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/f/fa/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/f/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/f/fa/faa/faaa/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/f/fa/faa/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/f/fa/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/f/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/tslibs/TS/Lib/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/tslibs/TS/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/tslibs/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/workspaces/package.json 2000 undefined Project: /home/src/workspaces/project/src/tsconfig.json WatchType: File location affecting resolution
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: /home/src/workspaces/project/src/tsconfig.json projectStateVersion: 5 projectProgramVersion: 3 structureChanged: true structureIsReused:: SafeModules Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Project '/home/src/workspaces/project/src/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (22)
	/home/src/tslibs/TS/Lib/lib.es2016.full.d.ts Text-1 "/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };"
	/home/src/workspaces/project/src/main.ts SVC-1-0 "export const x = 10;"
	/home/src/workspaces/project/src/fileB.mts Text-1 "export function foo() {}"
	/home/src/workspaces/project/src/fileA.ts Text-1 "import { foo } from \"./fileB.mjs\";\nfoo();\n"
	/home/src/workspaces/project/src/randomFile.ts Text-2 "export const x = 10;export const y = 10;"
	/home/src/workspaces/project/src/a/randomFile.ts Text-1 "export const x = 10;"
	/home/src/workspaces/project/src/b/ba/randomFile.ts Text-1 "export const x = 10;"
	/home/src/workspaces/project/src/b/randomFile.ts Text-1 "export const x = 10;"
	/home/src/workspaces/project/src/c/ca/randomFile.ts Text-1 "export const x = 10;"
	/home/src/workspaces/project/src/c/ca/caa/randomFile.ts Text-1 "export const x = 10;"
	/home/src/workspaces/project/src/c/ca/caa/caaa/randomFile.ts Text-1 "export const x = 10;"
	/home/src/workspaces/project/src/c/cb/randomFile.ts Text-1 "export const x = 10;"
	/home/src/workspaces/project/src/d/da/daa/daaa/x/y/z/randomFile.ts Text-1 "export const x = 10;"
	/home/src/workspaces/project/src/d/da/daa/daaa/randomFile.ts Text-1 "export const x = 10;"
	/home/src/workspaces/project/src/d/da/daa/randomFile.ts Text-1 "export const x = 10;"
	/home/src/workspaces/project/src/d/da/randomFile.ts Text-1 "export const x = 10;"
	/home/src/workspaces/project/src/e/ea/randomFile.ts Text-1 "export const x = 10;"
	/home/src/workspaces/project/src/e/ea/eaa/randomFile.ts Text-1 "export const x = 10;"
	/home/src/workspaces/project/src/e/ea/eaa/eaaa/randomFile.ts Text-1 "export const x = 10;"
	/home/src/workspaces/project/src/e/ea/eaa/eaaa/x/y/z/randomFile.ts Text-1 "export const x = 10;"
	/home/src/workspaces/project/src/f/fa/faa/x/y/z/randomFile.ts Text-1 "export const x = 10;"
	/home/src/workspaces/project/src/f/fa/faa/faaa/randomFile.ts Text-1 "export const x = 10;"

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Running: *ensureProjectForOpenFiles*
Info seq  [hh:mm:ss:mss] Before ensureProjectForOpenFiles:
Info seq  [hh:mm:ss:mss] Project '/home/src/workspaces/project/src/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (22)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: /home/src/workspaces/project/src/main.ts ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /home/src/workspaces/project/src/tsconfig.json
Info seq  [hh:mm:ss:mss] After ensureProjectForOpenFiles:
Info seq  [hh:mm:ss:mss] Project '/home/src/workspaces/project/src/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (22)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: /home/src/workspaces/project/src/main.ts ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /home/src/workspaces/project/src/tsconfig.json
Info seq  [hh:mm:ss:mss] got projects updated in background /home/src/workspaces/project/src/main.ts
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "projectsUpdatedInBackground",
      "body": {
        "openFiles": [
          "/home/src/workspaces/project/src/main.ts"
        ]
      }
    }
After running Timeout callback:: count: 0

PolledWatches::
/home/src/tslibs/TS/Lib/package.json:
  {"pollingInterval":2000}
/home/src/tslibs/TS/package.json:
  {"pollingInterval":2000}
/home/src/tslibs/package.json:
  {"pollingInterval":2000}
/home/src/workspaces/node_modules/@types:
  {"pollingInterval":500}
/home/src/workspaces/package.json: *new*
  {"pollingInterval":2000}
/home/src/workspaces/project/node_modules/@types:
  {"pollingInterval":500}
/home/src/workspaces/project/src/a/package.json:
  {"pollingInterval":2000}
/home/src/workspaces/project/src/b/ba/package.json:
  {"pollingInterval":2000}
/home/src/workspaces/project/src/b/package.json:
  {"pollingInterval":2000}
/home/src/workspaces/project/src/c/ca/caa/caaa/package.json:
  {"pollingInterval":2000}
/home/src/workspaces/project/src/c/ca/caa/package.json:
  {"pollingInterval":2000}
/home/src/workspaces/project/src/c/ca/package.json:
  {"pollingInterval":2000}
/home/src/workspaces/project/src/c/cb/package.json:
  {"pollingInterval":2000}
/home/src/workspaces/project/src/c/package.json:
  {"pollingInterval":2000}
/home/src/workspaces/project/src/d/da/daa/daaa/package.json:
  {"pollingInterval":2000}
/home/src/workspaces/project/src/d/da/daa/daaa/x/package.json:
  {"pollingInterval":2000}
/home/src/workspaces/project/src/d/da/daa/daaa/x/y/package.json:
  {"pollingInterval":2000}
/home/src/workspaces/project/src/d/da/daa/daaa/x/y/z/package.json:
  {"pollingInterval":2000}
/home/src/workspaces/project/src/d/da/daa/package.json:
  {"pollingInterval":2000}
/home/src/workspaces/project/src/d/da/package.json:
  {"pollingInterval":2000}
/home/src/workspaces/project/src/d/package.json:
  {"pollingInterval":2000}
/home/src/workspaces/project/src/e/ea/eaa/eaaa/package.json:
  {"pollingInterval":2000}
/home/src/workspaces/project/src/e/ea/eaa/eaaa/x/package.json:
  {"pollingInterval":2000}
/home/src/workspaces/project/src/e/ea/eaa/eaaa/x/y/package.json:
  {"pollingInterval":2000}
/home/src/workspaces/project/src/e/ea/eaa/eaaa/x/y/z/package.json:
  {"pollingInterval":2000}
/home/src/workspaces/project/src/e/ea/eaa/package.json:
  {"pollingInterval":2000}
/home/src/workspaces/project/src/e/ea/package.json:
  {"pollingInterval":2000}
/home/src/workspaces/project/src/e/package.json:
  {"pollingInterval":2000}
/home/src/workspaces/project/src/f/fa/faa/faaa/package.json:
  {"pollingInterval":2000}
/home/src/workspaces/project/src/f/fa/faa/package.json:
  {"pollingInterval":2000}
/home/src/workspaces/project/src/f/fa/faa/x/package.json:
  {"pollingInterval":2000}
/home/src/workspaces/project/src/f/fa/faa/x/y/package.json:
  {"pollingInterval":2000}
/home/src/workspaces/project/src/f/fa/faa/x/y/z/package.json:
  {"pollingInterval":2000}
/home/src/workspaces/project/src/f/fa/package.json:
  {"pollingInterval":2000}
/home/src/workspaces/project/src/f/package.json:
  {"pollingInterval":2000}
/home/src/workspaces/project/src/node_modules/@types:
  {"pollingInterval":500}
/home/src/workspaces/project/src/package.json:
  {"pollingInterval":2000}

FsWatches::
/home/src/tslibs/TS/Lib/lib.es2016.full.d.ts:
  {}
/home/src/workspaces/project/package.json:
  {}
/home/src/workspaces/project/src/a/randomFile.ts:
  {}
/home/src/workspaces/project/src/b/ba/randomFile.ts:
  {}
/home/src/workspaces/project/src/b/randomFile.ts:
  {}
/home/src/workspaces/project/src/c/ca/caa/caaa/randomFile.ts:
  {}
/home/src/workspaces/project/src/c/ca/caa/randomFile.ts:
  {}
/home/src/workspaces/project/src/c/ca/randomFile.ts:
  {}
/home/src/workspaces/project/src/c/cb/randomFile.ts:
  {}
/home/src/workspaces/project/src/d/da/daa/daaa/randomFile.ts:
  {}
/home/src/workspaces/project/src/d/da/daa/daaa/x/y/z/randomFile.ts:
  {}
/home/src/workspaces/project/src/d/da/daa/randomFile.ts:
  {}
/home/src/workspaces/project/src/d/da/randomFile.ts:
  {}
/home/src/workspaces/project/src/e/ea/eaa/eaaa/randomFile.ts:
  {}
/home/src/workspaces/project/src/e/ea/eaa/eaaa/x/y/z/randomFile.ts:
  {}
/home/src/workspaces/project/src/e/ea/eaa/randomFile.ts:
  {}
/home/src/workspaces/project/src/e/ea/randomFile.ts:
  {}
/home/src/workspaces/project/src/f/fa/faa/faaa/randomFile.ts:
  {}
/home/src/workspaces/project/src/f/fa/faa/x/y/z/randomFile.ts:
  {}
/home/src/workspaces/project/src/fileA.ts:
  {}
/home/src/workspaces/project/src/fileB.mts:
  {}
/home/src/workspaces/project/src/randomFile.ts:
  {}
/home/src/workspaces/project/src/tsconfig.json:
  {}

Projects::
/home/src/workspaces/project/src/tsconfig.json (Configured) *changed*
    projectStateVersion: 5
    projectProgramVersion: 4 *changed*
    dirty: false *changed*

Add package json file with type module
Info seq  [hh:mm:ss:mss] FileWatcher:: Triggered with /home/src/workspaces/project/package.json 0:: WatchInfo: /home/src/workspaces/project/package.json 2000 undefined Project: /home/src/workspaces/project/src/tsconfig.json WatchType: File location affecting resolution
Info seq  [hh:mm:ss:mss] Scheduled: /home/src/workspaces/project/src/tsconfig.jsonFailedLookupInvalidation
Info seq  [hh:mm:ss:mss] Elapsed:: *ms FileWatcher:: Triggered with /home/src/workspaces/project/package.json 0:: WatchInfo: /home/src/workspaces/project/package.json 2000 undefined Project: /home/src/workspaces/project/src/tsconfig.json WatchType: File location affecting resolution
Before running Timeout callback:: count: 1
12: /home/src/workspaces/project/src/tsconfig.jsonFailedLookupInvalidation
//// [/home/src/workspaces/project/package.json]
{
  "name": "app",
  "version": "1.0.0",
  "type": "module"
}


Timeout callback:: count: 1
12: /home/src/workspaces/project/src/tsconfig.jsonFailedLookupInvalidation *new*

Info seq  [hh:mm:ss:mss] Running: /home/src/workspaces/project/src/tsconfig.jsonFailedLookupInvalidation
Info seq  [hh:mm:ss:mss] Scheduled: /home/src/workspaces/project/src/tsconfig.json
Info seq  [hh:mm:ss:mss] Scheduled: *ensureProjectForOpenFiles*
After running Timeout callback:: count: 2

Timeout callback:: count: 2
13: /home/src/workspaces/project/src/tsconfig.json *new*
14: *ensureProjectForOpenFiles* *new*

Projects::
/home/src/workspaces/project/src/tsconfig.json (Configured) *changed*
    projectStateVersion: 6 *changed*
    projectProgramVersion: 4
    dirty: true *changed*

Before running Timeout callback:: count: 2
13: /home/src/workspaces/project/src/tsconfig.json
14: *ensureProjectForOpenFiles*

Info seq  [hh:mm:ss:mss] Running: /home/src/workspaces/project/src/tsconfig.json
Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: /home/src/workspaces/project/src/tsconfig.json
Info seq  [hh:mm:ss:mss] File '/home/src/tslibs/TS/Lib/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/tslibs/TS/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/tslibs/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] Found 'package.json' at '/home/src/workspaces/project/package.json'.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/package.json' exists according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/package.json' exists according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/a/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/package.json' exists according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/b/ba/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/b/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/package.json' exists according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/b/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/package.json' exists according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/c/ca/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/c/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/package.json' exists according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/c/ca/caa/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/c/ca/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/c/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/package.json' exists according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/c/ca/caa/caaa/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/c/ca/caa/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/c/ca/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/c/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/package.json' exists according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/c/cb/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/c/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/package.json' exists according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/d/da/daa/daaa/x/y/z/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/d/da/daa/daaa/x/y/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/d/da/daa/daaa/x/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/d/da/daa/daaa/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/d/da/daa/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/d/da/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/d/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/package.json' exists according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/d/da/daa/daaa/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/d/da/daa/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/d/da/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/d/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/package.json' exists according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/d/da/daa/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/d/da/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/d/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/package.json' exists according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/d/da/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/d/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/package.json' exists according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/e/ea/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/e/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/package.json' exists according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/e/ea/eaa/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/e/ea/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/e/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/package.json' exists according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/e/ea/eaa/eaaa/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/e/ea/eaa/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/e/ea/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/e/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/package.json' exists according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/e/ea/eaa/eaaa/x/y/z/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/e/ea/eaa/eaaa/x/y/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/e/ea/eaa/eaaa/x/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/e/ea/eaa/eaaa/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/e/ea/eaa/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/e/ea/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/e/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/package.json' exists according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/f/fa/faa/x/y/z/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/f/fa/faa/x/y/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/f/fa/faa/x/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/f/fa/faa/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/f/fa/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/f/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/package.json' exists according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/f/fa/faa/faaa/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/f/fa/faa/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/f/fa/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/f/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/package.json' exists according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/package.json' exists according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/package.json' exists according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] ======== Resolving module './fileB.mjs' from '/home/src/workspaces/project/src/fileA.ts'. ========
Info seq  [hh:mm:ss:mss] Module resolution kind is not specified, using 'Node16'.
Info seq  [hh:mm:ss:mss] Resolving in ESM mode with conditions 'import', 'types', 'node'.
Info seq  [hh:mm:ss:mss] Loading module as file / folder, candidate module location '/home/src/workspaces/project/src/fileB.mjs', target file types: TypeScript, JavaScript, Declaration.
Info seq  [hh:mm:ss:mss] File name '/home/src/workspaces/project/src/fileB.mjs' has a '.mjs' extension - stripping it.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/fileB.mts' exists - use it as a name resolution result.
Info seq  [hh:mm:ss:mss] ======== Module name './fileB.mjs' was successfully resolved to '/home/src/workspaces/project/src/fileB.mts'. ========
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/package.json' exists according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/a/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/package.json' exists according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/b/ba/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/b/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/package.json' exists according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/b/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/package.json' exists according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/c/ca/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/c/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/package.json' exists according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/c/ca/caa/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/c/ca/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/c/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/package.json' exists according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/c/ca/caa/caaa/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/c/ca/caa/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/c/ca/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/c/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/package.json' exists according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/c/cb/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/c/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/package.json' exists according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/d/da/daa/daaa/x/y/z/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/d/da/daa/daaa/x/y/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/d/da/daa/daaa/x/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/d/da/daa/daaa/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/d/da/daa/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/d/da/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/d/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/package.json' exists according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/d/da/daa/daaa/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/d/da/daa/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/d/da/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/d/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/package.json' exists according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/d/da/daa/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/d/da/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/d/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/package.json' exists according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/d/da/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/d/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/package.json' exists according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/e/ea/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/e/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/package.json' exists according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/e/ea/eaa/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/e/ea/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/e/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/package.json' exists according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/e/ea/eaa/eaaa/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/e/ea/eaa/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/e/ea/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/e/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/package.json' exists according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/e/ea/eaa/eaaa/x/y/z/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/e/ea/eaa/eaaa/x/y/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/e/ea/eaa/eaaa/x/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/e/ea/eaa/eaaa/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/e/ea/eaa/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/e/ea/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/e/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/package.json' exists according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/f/fa/faa/x/y/z/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/f/fa/faa/x/y/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/f/fa/faa/x/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/f/fa/faa/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/f/fa/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/f/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/package.json' exists according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/f/fa/faa/faaa/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/f/fa/faa/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/f/fa/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/f/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/package.json' exists according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/tslibs/TS/Lib/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/tslibs/TS/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/tslibs/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] FileWatcher:: Close:: WatchInfo: /home/src/workspaces/package.json 2000 undefined Project: /home/src/workspaces/project/src/tsconfig.json WatchType: File location affecting resolution
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: /home/src/workspaces/project/src/tsconfig.json projectStateVersion: 6 projectProgramVersion: 4 structureChanged: true structureIsReused:: SafeModules Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Project '/home/src/workspaces/project/src/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (22)
	/home/src/tslibs/TS/Lib/lib.es2016.full.d.ts Text-1 "/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };"
	/home/src/workspaces/project/src/main.ts SVC-1-0 "export const x = 10;"
	/home/src/workspaces/project/src/fileB.mts Text-1 "export function foo() {}"
	/home/src/workspaces/project/src/fileA.ts Text-1 "import { foo } from \"./fileB.mjs\";\nfoo();\n"
	/home/src/workspaces/project/src/randomFile.ts Text-2 "export const x = 10;export const y = 10;"
	/home/src/workspaces/project/src/a/randomFile.ts Text-1 "export const x = 10;"
	/home/src/workspaces/project/src/b/ba/randomFile.ts Text-1 "export const x = 10;"
	/home/src/workspaces/project/src/b/randomFile.ts Text-1 "export const x = 10;"
	/home/src/workspaces/project/src/c/ca/randomFile.ts Text-1 "export const x = 10;"
	/home/src/workspaces/project/src/c/ca/caa/randomFile.ts Text-1 "export const x = 10;"
	/home/src/workspaces/project/src/c/ca/caa/caaa/randomFile.ts Text-1 "export const x = 10;"
	/home/src/workspaces/project/src/c/cb/randomFile.ts Text-1 "export const x = 10;"
	/home/src/workspaces/project/src/d/da/daa/daaa/x/y/z/randomFile.ts Text-1 "export const x = 10;"
	/home/src/workspaces/project/src/d/da/daa/daaa/randomFile.ts Text-1 "export const x = 10;"
	/home/src/workspaces/project/src/d/da/daa/randomFile.ts Text-1 "export const x = 10;"
	/home/src/workspaces/project/src/d/da/randomFile.ts Text-1 "export const x = 10;"
	/home/src/workspaces/project/src/e/ea/randomFile.ts Text-1 "export const x = 10;"
	/home/src/workspaces/project/src/e/ea/eaa/randomFile.ts Text-1 "export const x = 10;"
	/home/src/workspaces/project/src/e/ea/eaa/eaaa/randomFile.ts Text-1 "export const x = 10;"
	/home/src/workspaces/project/src/e/ea/eaa/eaaa/x/y/z/randomFile.ts Text-1 "export const x = 10;"
	/home/src/workspaces/project/src/f/fa/faa/x/y/z/randomFile.ts Text-1 "export const x = 10;"
	/home/src/workspaces/project/src/f/fa/faa/faaa/randomFile.ts Text-1 "export const x = 10;"

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Running: *ensureProjectForOpenFiles*
Info seq  [hh:mm:ss:mss] Before ensureProjectForOpenFiles:
Info seq  [hh:mm:ss:mss] Project '/home/src/workspaces/project/src/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (22)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: /home/src/workspaces/project/src/main.ts ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /home/src/workspaces/project/src/tsconfig.json
Info seq  [hh:mm:ss:mss] After ensureProjectForOpenFiles:
Info seq  [hh:mm:ss:mss] Project '/home/src/workspaces/project/src/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (22)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: /home/src/workspaces/project/src/main.ts ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /home/src/workspaces/project/src/tsconfig.json
Info seq  [hh:mm:ss:mss] got projects updated in background /home/src/workspaces/project/src/main.ts
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "projectsUpdatedInBackground",
      "body": {
        "openFiles": [
          "/home/src/workspaces/project/src/main.ts"
        ]
      }
    }
After running Timeout callback:: count: 0

PolledWatches::
/home/src/tslibs/TS/Lib/package.json:
  {"pollingInterval":2000}
/home/src/tslibs/TS/package.json:
  {"pollingInterval":2000}
/home/src/tslibs/package.json:
  {"pollingInterval":2000}
/home/src/workspaces/node_modules/@types:
  {"pollingInterval":500}
/home/src/workspaces/project/node_modules/@types:
  {"pollingInterval":500}
/home/src/workspaces/project/src/a/package.json:
  {"pollingInterval":2000}
/home/src/workspaces/project/src/b/ba/package.json:
  {"pollingInterval":2000}
/home/src/workspaces/project/src/b/package.json:
  {"pollingInterval":2000}
/home/src/workspaces/project/src/c/ca/caa/caaa/package.json:
  {"pollingInterval":2000}
/home/src/workspaces/project/src/c/ca/caa/package.json:
  {"pollingInterval":2000}
/home/src/workspaces/project/src/c/ca/package.json:
  {"pollingInterval":2000}
/home/src/workspaces/project/src/c/cb/package.json:
  {"pollingInterval":2000}
/home/src/workspaces/project/src/c/package.json:
  {"pollingInterval":2000}
/home/src/workspaces/project/src/d/da/daa/daaa/package.json:
  {"pollingInterval":2000}
/home/src/workspaces/project/src/d/da/daa/daaa/x/package.json:
  {"pollingInterval":2000}
/home/src/workspaces/project/src/d/da/daa/daaa/x/y/package.json:
  {"pollingInterval":2000}
/home/src/workspaces/project/src/d/da/daa/daaa/x/y/z/package.json:
  {"pollingInterval":2000}
/home/src/workspaces/project/src/d/da/daa/package.json:
  {"pollingInterval":2000}
/home/src/workspaces/project/src/d/da/package.json:
  {"pollingInterval":2000}
/home/src/workspaces/project/src/d/package.json:
  {"pollingInterval":2000}
/home/src/workspaces/project/src/e/ea/eaa/eaaa/package.json:
  {"pollingInterval":2000}
/home/src/workspaces/project/src/e/ea/eaa/eaaa/x/package.json:
  {"pollingInterval":2000}
/home/src/workspaces/project/src/e/ea/eaa/eaaa/x/y/package.json:
  {"pollingInterval":2000}
/home/src/workspaces/project/src/e/ea/eaa/eaaa/x/y/z/package.json:
  {"pollingInterval":2000}
/home/src/workspaces/project/src/e/ea/eaa/package.json:
  {"pollingInterval":2000}
/home/src/workspaces/project/src/e/ea/package.json:
  {"pollingInterval":2000}
/home/src/workspaces/project/src/e/package.json:
  {"pollingInterval":2000}
/home/src/workspaces/project/src/f/fa/faa/faaa/package.json:
  {"pollingInterval":2000}
/home/src/workspaces/project/src/f/fa/faa/package.json:
  {"pollingInterval":2000}
/home/src/workspaces/project/src/f/fa/faa/x/package.json:
  {"pollingInterval":2000}
/home/src/workspaces/project/src/f/fa/faa/x/y/package.json:
  {"pollingInterval":2000}
/home/src/workspaces/project/src/f/fa/faa/x/y/z/package.json:
  {"pollingInterval":2000}
/home/src/workspaces/project/src/f/fa/package.json:
  {"pollingInterval":2000}
/home/src/workspaces/project/src/f/package.json:
  {"pollingInterval":2000}
/home/src/workspaces/project/src/node_modules/@types:
  {"pollingInterval":500}
/home/src/workspaces/project/src/package.json:
  {"pollingInterval":2000}

PolledWatches *deleted*::
/home/src/workspaces/package.json:
  {"pollingInterval":2000}

FsWatches::
/home/src/tslibs/TS/Lib/lib.es2016.full.d.ts:
  {}
/home/src/workspaces/project/package.json:
  {}
/home/src/workspaces/project/src/a/randomFile.ts:
  {}
/home/src/workspaces/project/src/b/ba/randomFile.ts:
  {}
/home/src/workspaces/project/src/b/randomFile.ts:
  {}
/home/src/workspaces/project/src/c/ca/caa/caaa/randomFile.ts:
  {}
/home/src/workspaces/project/src/c/ca/caa/randomFile.ts:
  {}
/home/src/workspaces/project/src/c/ca/randomFile.ts:
  {}
/home/src/workspaces/project/src/c/cb/randomFile.ts:
  {}
/home/src/workspaces/project/src/d/da/daa/daaa/randomFile.ts:
  {}
/home/src/workspaces/project/src/d/da/daa/daaa/x/y/z/randomFile.ts:
  {}
/home/src/workspaces/project/src/d/da/daa/randomFile.ts:
  {}
/home/src/workspaces/project/src/d/da/randomFile.ts:
  {}
/home/src/workspaces/project/src/e/ea/eaa/eaaa/randomFile.ts:
  {}
/home/src/workspaces/project/src/e/ea/eaa/eaaa/x/y/z/randomFile.ts:
  {}
/home/src/workspaces/project/src/e/ea/eaa/randomFile.ts:
  {}
/home/src/workspaces/project/src/e/ea/randomFile.ts:
  {}
/home/src/workspaces/project/src/f/fa/faa/faaa/randomFile.ts:
  {}
/home/src/workspaces/project/src/f/fa/faa/x/y/z/randomFile.ts:
  {}
/home/src/workspaces/project/src/fileA.ts:
  {}
/home/src/workspaces/project/src/fileB.mts:
  {}
/home/src/workspaces/project/src/randomFile.ts:
  {}
/home/src/workspaces/project/src/tsconfig.json:
  {}

Projects::
/home/src/workspaces/project/src/tsconfig.json (Configured) *changed*
    projectStateVersion: 6
    projectProgramVersion: 5 *changed*
    dirty: false *changed*

Delete package.json
Info seq  [hh:mm:ss:mss] FileWatcher:: Triggered with /home/src/workspaces/project/package.json 2:: WatchInfo: /home/src/workspaces/project/package.json 2000 undefined Project: /home/src/workspaces/project/src/tsconfig.json WatchType: File location affecting resolution
Info seq  [hh:mm:ss:mss] Scheduled: /home/src/workspaces/project/src/tsconfig.jsonFailedLookupInvalidation
Info seq  [hh:mm:ss:mss] Elapsed:: *ms FileWatcher:: Triggered with /home/src/workspaces/project/package.json 2:: WatchInfo: /home/src/workspaces/project/package.json 2000 undefined Project: /home/src/workspaces/project/src/tsconfig.json WatchType: File location affecting resolution
Before running Timeout callback:: count: 1
15: /home/src/workspaces/project/src/tsconfig.jsonFailedLookupInvalidation
//// [/home/src/workspaces/project/package.json] deleted

Timeout callback:: count: 1
15: /home/src/workspaces/project/src/tsconfig.jsonFailedLookupInvalidation *new*

Info seq  [hh:mm:ss:mss] Running: /home/src/workspaces/project/src/tsconfig.jsonFailedLookupInvalidation
Info seq  [hh:mm:ss:mss] Scheduled: /home/src/workspaces/project/src/tsconfig.json
Info seq  [hh:mm:ss:mss] Scheduled: *ensureProjectForOpenFiles*
After running Timeout callback:: count: 2

Timeout callback:: count: 2
16: /home/src/workspaces/project/src/tsconfig.json *new*
17: *ensureProjectForOpenFiles* *new*

Projects::
/home/src/workspaces/project/src/tsconfig.json (Configured) *changed*
    projectStateVersion: 7 *changed*
    projectProgramVersion: 5
    dirty: true *changed*

Before running Timeout callback:: count: 2
16: /home/src/workspaces/project/src/tsconfig.json
17: *ensureProjectForOpenFiles*

Info seq  [hh:mm:ss:mss] Running: /home/src/workspaces/project/src/tsconfig.json
Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: /home/src/workspaces/project/src/tsconfig.json
Info seq  [hh:mm:ss:mss] File '/home/src/tslibs/TS/Lib/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/tslibs/TS/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/tslibs/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/package.json' does not exist.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/package.json' does not exist.
Info seq  [hh:mm:ss:mss] File '/home/src/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/a/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/b/ba/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/b/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/b/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/c/ca/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/c/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/c/ca/caa/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/c/ca/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/c/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/c/ca/caa/caaa/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/c/ca/caa/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/c/ca/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/c/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/c/cb/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/c/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/d/da/daa/daaa/x/y/z/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/d/da/daa/daaa/x/y/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/d/da/daa/daaa/x/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/d/da/daa/daaa/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/d/da/daa/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/d/da/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/d/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/d/da/daa/daaa/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/d/da/daa/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/d/da/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/d/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/d/da/daa/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/d/da/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/d/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/d/da/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/d/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/e/ea/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/e/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/e/ea/eaa/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/e/ea/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/e/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/e/ea/eaa/eaaa/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/e/ea/eaa/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/e/ea/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/e/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/e/ea/eaa/eaaa/x/y/z/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/e/ea/eaa/eaaa/x/y/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/e/ea/eaa/eaaa/x/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/e/ea/eaa/eaaa/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/e/ea/eaa/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/e/ea/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/e/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/f/fa/faa/x/y/z/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/f/fa/faa/x/y/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/f/fa/faa/x/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/f/fa/faa/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/f/fa/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/f/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/f/fa/faa/faaa/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/f/fa/faa/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/f/fa/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/f/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] ======== Resolving module './fileB.mjs' from '/home/src/workspaces/project/src/fileA.ts'. ========
Info seq  [hh:mm:ss:mss] Module resolution kind is not specified, using 'Node16'.
Info seq  [hh:mm:ss:mss] Resolving in CJS mode with conditions 'require', 'types', 'node'.
Info seq  [hh:mm:ss:mss] Loading module as file / folder, candidate module location '/home/src/workspaces/project/src/fileB.mjs', target file types: TypeScript, JavaScript, Declaration.
Info seq  [hh:mm:ss:mss] File name '/home/src/workspaces/project/src/fileB.mjs' has a '.mjs' extension - stripping it.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/fileB.mts' exists - use it as a name resolution result.
Info seq  [hh:mm:ss:mss] ======== Module name './fileB.mjs' was successfully resolved to '/home/src/workspaces/project/src/fileB.mts'. ========
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/a/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/b/ba/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/b/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/b/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/c/ca/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/c/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/c/ca/caa/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/c/ca/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/c/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/c/ca/caa/caaa/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/c/ca/caa/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/c/ca/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/c/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/c/cb/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/c/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/d/da/daa/daaa/x/y/z/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/d/da/daa/daaa/x/y/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/d/da/daa/daaa/x/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/d/da/daa/daaa/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/d/da/daa/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/d/da/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/d/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/d/da/daa/daaa/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/d/da/daa/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/d/da/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/d/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/d/da/daa/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/d/da/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/d/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/d/da/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/d/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/e/ea/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/e/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/e/ea/eaa/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/e/ea/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/e/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/e/ea/eaa/eaaa/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/e/ea/eaa/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/e/ea/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/e/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/e/ea/eaa/eaaa/x/y/z/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/e/ea/eaa/eaaa/x/y/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/e/ea/eaa/eaaa/x/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/e/ea/eaa/eaaa/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/e/ea/eaa/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/e/ea/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/e/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/f/fa/faa/x/y/z/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/f/fa/faa/x/y/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/f/fa/faa/x/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/f/fa/faa/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/f/fa/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/f/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/f/fa/faa/faaa/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/f/fa/faa/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/f/fa/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/f/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/src/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/project/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspaces/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/tslibs/TS/Lib/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/tslibs/TS/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/tslibs/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/workspaces/package.json 2000 undefined Project: /home/src/workspaces/project/src/tsconfig.json WatchType: File location affecting resolution
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: /home/src/workspaces/project/src/tsconfig.json projectStateVersion: 7 projectProgramVersion: 5 structureChanged: true structureIsReused:: SafeModules Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Project '/home/src/workspaces/project/src/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (22)
	/home/src/tslibs/TS/Lib/lib.es2016.full.d.ts Text-1 "/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };"
	/home/src/workspaces/project/src/main.ts SVC-1-0 "export const x = 10;"
	/home/src/workspaces/project/src/fileB.mts Text-1 "export function foo() {}"
	/home/src/workspaces/project/src/fileA.ts Text-1 "import { foo } from \"./fileB.mjs\";\nfoo();\n"
	/home/src/workspaces/project/src/randomFile.ts Text-2 "export const x = 10;export const y = 10;"
	/home/src/workspaces/project/src/a/randomFile.ts Text-1 "export const x = 10;"
	/home/src/workspaces/project/src/b/ba/randomFile.ts Text-1 "export const x = 10;"
	/home/src/workspaces/project/src/b/randomFile.ts Text-1 "export const x = 10;"
	/home/src/workspaces/project/src/c/ca/randomFile.ts Text-1 "export const x = 10;"
	/home/src/workspaces/project/src/c/ca/caa/randomFile.ts Text-1 "export const x = 10;"
	/home/src/workspaces/project/src/c/ca/caa/caaa/randomFile.ts Text-1 "export const x = 10;"
	/home/src/workspaces/project/src/c/cb/randomFile.ts Text-1 "export const x = 10;"
	/home/src/workspaces/project/src/d/da/daa/daaa/x/y/z/randomFile.ts Text-1 "export const x = 10;"
	/home/src/workspaces/project/src/d/da/daa/daaa/randomFile.ts Text-1 "export const x = 10;"
	/home/src/workspaces/project/src/d/da/daa/randomFile.ts Text-1 "export const x = 10;"
	/home/src/workspaces/project/src/d/da/randomFile.ts Text-1 "export const x = 10;"
	/home/src/workspaces/project/src/e/ea/randomFile.ts Text-1 "export const x = 10;"
	/home/src/workspaces/project/src/e/ea/eaa/randomFile.ts Text-1 "export const x = 10;"
	/home/src/workspaces/project/src/e/ea/eaa/eaaa/randomFile.ts Text-1 "export const x = 10;"
	/home/src/workspaces/project/src/e/ea/eaa/eaaa/x/y/z/randomFile.ts Text-1 "export const x = 10;"
	/home/src/workspaces/project/src/f/fa/faa/x/y/z/randomFile.ts Text-1 "export const x = 10;"
	/home/src/workspaces/project/src/f/fa/faa/faaa/randomFile.ts Text-1 "export const x = 10;"

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Running: *ensureProjectForOpenFiles*
Info seq  [hh:mm:ss:mss] Before ensureProjectForOpenFiles:
Info seq  [hh:mm:ss:mss] Project '/home/src/workspaces/project/src/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (22)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: /home/src/workspaces/project/src/main.ts ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /home/src/workspaces/project/src/tsconfig.json
Info seq  [hh:mm:ss:mss] After ensureProjectForOpenFiles:
Info seq  [hh:mm:ss:mss] Project '/home/src/workspaces/project/src/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (22)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: /home/src/workspaces/project/src/main.ts ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /home/src/workspaces/project/src/tsconfig.json
Info seq  [hh:mm:ss:mss] got projects updated in background /home/src/workspaces/project/src/main.ts
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "projectsUpdatedInBackground",
      "body": {
        "openFiles": [
          "/home/src/workspaces/project/src/main.ts"
        ]
      }
    }
After running Timeout callback:: count: 0

PolledWatches::
/home/src/tslibs/TS/Lib/package.json:
  {"pollingInterval":2000}
/home/src/tslibs/TS/package.json:
  {"pollingInterval":2000}
/home/src/tslibs/package.json:
  {"pollingInterval":2000}
/home/src/workspaces/node_modules/@types:
  {"pollingInterval":500}
/home/src/workspaces/package.json: *new*
  {"pollingInterval":2000}
/home/src/workspaces/project/node_modules/@types:
  {"pollingInterval":500}
/home/src/workspaces/project/src/a/package.json:
  {"pollingInterval":2000}
/home/src/workspaces/project/src/b/ba/package.json:
  {"pollingInterval":2000}
/home/src/workspaces/project/src/b/package.json:
  {"pollingInterval":2000}
/home/src/workspaces/project/src/c/ca/caa/caaa/package.json:
  {"pollingInterval":2000}
/home/src/workspaces/project/src/c/ca/caa/package.json:
  {"pollingInterval":2000}
/home/src/workspaces/project/src/c/ca/package.json:
  {"pollingInterval":2000}
/home/src/workspaces/project/src/c/cb/package.json:
  {"pollingInterval":2000}
/home/src/workspaces/project/src/c/package.json:
  {"pollingInterval":2000}
/home/src/workspaces/project/src/d/da/daa/daaa/package.json:
  {"pollingInterval":2000}
/home/src/workspaces/project/src/d/da/daa/daaa/x/package.json:
  {"pollingInterval":2000}
/home/src/workspaces/project/src/d/da/daa/daaa/x/y/package.json:
  {"pollingInterval":2000}
/home/src/workspaces/project/src/d/da/daa/daaa/x/y/z/package.json:
  {"pollingInterval":2000}
/home/src/workspaces/project/src/d/da/daa/package.json:
  {"pollingInterval":2000}
/home/src/workspaces/project/src/d/da/package.json:
  {"pollingInterval":2000}
/home/src/workspaces/project/src/d/package.json:
  {"pollingInterval":2000}
/home/src/workspaces/project/src/e/ea/eaa/eaaa/package.json:
  {"pollingInterval":2000}
/home/src/workspaces/project/src/e/ea/eaa/eaaa/x/package.json:
  {"pollingInterval":2000}
/home/src/workspaces/project/src/e/ea/eaa/eaaa/x/y/package.json:
  {"pollingInterval":2000}
/home/src/workspaces/project/src/e/ea/eaa/eaaa/x/y/z/package.json:
  {"pollingInterval":2000}
/home/src/workspaces/project/src/e/ea/eaa/package.json:
  {"pollingInterval":2000}
/home/src/workspaces/project/src/e/ea/package.json:
  {"pollingInterval":2000}
/home/src/workspaces/project/src/e/package.json:
  {"pollingInterval":2000}
/home/src/workspaces/project/src/f/fa/faa/faaa/package.json:
  {"pollingInterval":2000}
/home/src/workspaces/project/src/f/fa/faa/package.json:
  {"pollingInterval":2000}
/home/src/workspaces/project/src/f/fa/faa/x/package.json:
  {"pollingInterval":2000}
/home/src/workspaces/project/src/f/fa/faa/x/y/package.json:
  {"pollingInterval":2000}
/home/src/workspaces/project/src/f/fa/faa/x/y/z/package.json:
  {"pollingInterval":2000}
/home/src/workspaces/project/src/f/fa/package.json:
  {"pollingInterval":2000}
/home/src/workspaces/project/src/f/package.json:
  {"pollingInterval":2000}
/home/src/workspaces/project/src/node_modules/@types:
  {"pollingInterval":500}
/home/src/workspaces/project/src/package.json:
  {"pollingInterval":2000}

FsWatches::
/home/src/tslibs/TS/Lib/lib.es2016.full.d.ts:
  {}
/home/src/workspaces/project/package.json:
  {}
/home/src/workspaces/project/src/a/randomFile.ts:
  {}
/home/src/workspaces/project/src/b/ba/randomFile.ts:
  {}
/home/src/workspaces/project/src/b/randomFile.ts:
  {}
/home/src/workspaces/project/src/c/ca/caa/caaa/randomFile.ts:
  {}
/home/src/workspaces/project/src/c/ca/caa/randomFile.ts:
  {}
/home/src/workspaces/project/src/c/ca/randomFile.ts:
  {}
/home/src/workspaces/project/src/c/cb/randomFile.ts:
  {}
/home/src/workspaces/project/src/d/da/daa/daaa/randomFile.ts:
  {}
/home/src/workspaces/project/src/d/da/daa/daaa/x/y/z/randomFile.ts:
  {}
/home/src/workspaces/project/src/d/da/daa/randomFile.ts:
  {}
/home/src/workspaces/project/src/d/da/randomFile.ts:
  {}
/home/src/workspaces/project/src/e/ea/eaa/eaaa/randomFile.ts:
  {}
/home/src/workspaces/project/src/e/ea/eaa/eaaa/x/y/z/randomFile.ts:
  {}
/home/src/workspaces/project/src/e/ea/eaa/randomFile.ts:
  {}
/home/src/workspaces/project/src/e/ea/randomFile.ts:
  {}
/home/src/workspaces/project/src/f/fa/faa/faaa/randomFile.ts:
  {}
/home/src/workspaces/project/src/f/fa/faa/x/y/z/randomFile.ts:
  {}
/home/src/workspaces/project/src/fileA.ts:
  {}
/home/src/workspaces/project/src/fileB.mts:
  {}
/home/src/workspaces/project/src/randomFile.ts:
  {}
/home/src/workspaces/project/src/tsconfig.json:
  {}

Projects::
/home/src/workspaces/project/src/tsconfig.json (Configured) *changed*
    projectStateVersion: 7
    projectProgramVersion: 6 *changed*
    dirty: false *changed*
