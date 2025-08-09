Info seq  [hh:mm:ss:mss] currentDirectory:: /home/src/Vscode/Projects/bin useCaseSensitiveFileNames:: false
Info seq  [hh:mm:ss:mss] libs Location:: /home/src/tslibs/TS/Lib
Info seq  [hh:mm:ss:mss] globalTypingsCacheLocation:: /home/src/Library/Caches/typescript
Info seq  [hh:mm:ss:mss] Provided types map file "/home/src/tslibs/TS/Lib/typesMap.json" doesn't exist
Before request
//// [/home/src/workspace/projects/project1/utils.d.ts]
export const y = 10;

//// [/home/src/workspace/projects/project1/file.ts]
export const file = 10;

//// [/home/src/workspace/projects/project1/core.d.ts]
export const core = 10;

//// [/home/src/workspace/projects/project1/index.ts]
export const x = "type1";

//// [/home/src/workspace/projects/project1/file2.ts]
/// <reference lib="webworker"/>
/// <reference lib="scripthost"/>
/// <reference lib="es5"/>


//// [/home/src/workspace/projects/project1/tsconfig.json]
{
  "compilerOptions": {
    "composite": true,
    "typeRoots": [
      "./typeroot1"
    ],
    "lib": [
      "es5",
      "dom"
    ],
    "traceResolution": true
  }
}

//// [/home/src/workspace/projects/project1/typeroot1/sometype/index.d.ts]
export type TheNum = "type1";

//// [/home/src/workspace/projects/project2/utils.d.ts]
export const y = 10;

//// [/home/src/workspace/projects/project2/index.ts]
export const y = 10

//// [/home/src/workspace/projects/project2/tsconfig.json]
{
  "compilerOptions": {
    "composite": true,
    "lib": [
      "es5",
      "dom"
    ],
    "traceResolution": true
  }
}

//// [/home/src/workspace/projects/project3/utils.d.ts]
export const y = 10;

//// [/home/src/workspace/projects/project3/index.ts]
export const z = 10

//// [/home/src/workspace/projects/project3/tsconfig.json]
{
  "compilerOptions": {
    "composite": true,
    "lib": [
      "es5",
      "dom"
    ],
    "traceResolution": true
  }
}

//// [/home/src/workspace/projects/project4/utils.d.ts]
export const y = 10;

//// [/home/src/workspace/projects/project4/index.ts]
export const z = 10

//// [/home/src/workspace/projects/project4/tsconfig.json]
{
  "compilerOptions": {
    "composite": true,
    "lib": [
      "esnext",
      "dom",
      "webworker"
    ],
    "traceResolution": true
  }
}

//// [/home/src/tslibs/TS/Lib/lib.dom.d.ts]
interface DOMInterface { }

//// [/home/src/tslibs/TS/Lib/lib.webworker.d.ts]
interface WebWorkerInterface { }

//// [/home/src/tslibs/TS/Lib/lib.scripthost.d.ts]
interface ScriptHostInterface { }

//// [/home/src/workspace/projects/node_modules/@typescript/unlreated/index.d.ts]
export const unrelated = 10;

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
        "file": "/home/src/workspace/projects/project1/index.ts"
      },
      "seq": 1,
      "type": "request"
    }
Info seq  [hh:mm:ss:mss] getConfigFileNameForFile:: File: /home/src/workspace/projects/project1/index.ts ProjectRootPath: undefined:: Result: /home/src/workspace/projects/project1/tsconfig.json
Info seq  [hh:mm:ss:mss] Creating ConfiguredProject: /home/src/workspace/projects/project1/tsconfig.json, currentDirectory: /home/src/workspace/projects/project1
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/workspace/projects/project1/tsconfig.json 2000 undefined Project: /home/src/workspace/projects/project1/tsconfig.json WatchType: Config file
Info seq  [hh:mm:ss:mss] Config: /home/src/workspace/projects/project1/tsconfig.json : {
 "rootNames": [
  "/home/src/workspace/projects/project1/core.d.ts",
  "/home/src/workspace/projects/project1/file.ts",
  "/home/src/workspace/projects/project1/file2.ts",
  "/home/src/workspace/projects/project1/index.ts",
  "/home/src/workspace/projects/project1/utils.d.ts",
  "/home/src/workspace/projects/project1/typeroot1/sometype/index.d.ts"
 ],
 "options": {
  "composite": true,
  "typeRoots": [
   "/home/src/workspace/projects/project1/typeroot1"
  ],
  "lib": [
   "lib.es5.d.ts",
   "lib.dom.d.ts"
  ],
  "traceResolution": true,
  "configFilePath": "/home/src/workspace/projects/project1/tsconfig.json"
 }
}
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "projectLoadingStart",
      "body": {
        "projectName": "/home/src/workspace/projects/project1/tsconfig.json",
        "reason": "Creating possible configured project for /home/src/workspace/projects/project1/index.ts to open"
      }
    }
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /home/src/workspace/projects/project1 1 undefined Config: /home/src/workspace/projects/project1/tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /home/src/workspace/projects/project1 1 undefined Config: /home/src/workspace/projects/project1/tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/workspace/projects/project1/core.d.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/workspace/projects/project1/file.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/workspace/projects/project1/file2.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/workspace/projects/project1/utils.d.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/workspace/projects/project1/typeroot1/sometype/index.d.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: /home/src/workspace/projects/project1/tsconfig.json
Info seq  [hh:mm:ss:mss] ======== Resolving module '@typescript/lib-webworker' from '/home/src/workspace/projects/project1/__lib_node_modules_lookup_lib.webworker.d.ts__.ts'. ========
Info seq  [hh:mm:ss:mss] Explicitly specified module resolution kind: 'Node10'.
Info seq  [hh:mm:ss:mss] Loading module '@typescript/lib-webworker' from 'node_modules' folder, target file types: TypeScript, Declaration.
Info seq  [hh:mm:ss:mss] Searching all ancestor node_modules directories for preferred extensions: TypeScript, Declaration.
Info seq  [hh:mm:ss:mss] Directory '/home/src/workspace/projects/project1/node_modules' does not exist, skipping all lookups in it.
Info seq  [hh:mm:ss:mss] Scoped package detected, looking in 'typescript__lib-webworker'
Info seq  [hh:mm:ss:mss] File '/home/src/workspace/projects/node_modules/@typescript/lib-webworker.ts' does not exist.
Info seq  [hh:mm:ss:mss] File '/home/src/workspace/projects/node_modules/@typescript/lib-webworker.tsx' does not exist.
Info seq  [hh:mm:ss:mss] File '/home/src/workspace/projects/node_modules/@typescript/lib-webworker.d.ts' does not exist.
Info seq  [hh:mm:ss:mss] Directory '/home/src/workspace/projects/node_modules/@types' does not exist, skipping all lookups in it.
Info seq  [hh:mm:ss:mss] Scoped package detected, looking in 'typescript__lib-webworker'
Info seq  [hh:mm:ss:mss] Directory '/home/src/workspace/node_modules' does not exist, skipping all lookups in it.
Info seq  [hh:mm:ss:mss] Scoped package detected, looking in 'typescript__lib-webworker'
Info seq  [hh:mm:ss:mss] Directory '/home/src/node_modules' does not exist, skipping all lookups in it.
Info seq  [hh:mm:ss:mss] Scoped package detected, looking in 'typescript__lib-webworker'
Info seq  [hh:mm:ss:mss] Directory '/home/node_modules' does not exist, skipping all lookups in it.
Info seq  [hh:mm:ss:mss] Scoped package detected, looking in 'typescript__lib-webworker'
Info seq  [hh:mm:ss:mss] Directory '/node_modules' does not exist, skipping all lookups in it.
Info seq  [hh:mm:ss:mss] Scoped package detected, looking in 'typescript__lib-webworker'
Info seq  [hh:mm:ss:mss] Loading module '@typescript/lib-webworker' from 'node_modules' folder, target file types: JavaScript.
Info seq  [hh:mm:ss:mss] Searching all ancestor node_modules directories for fallback extensions: JavaScript.
Info seq  [hh:mm:ss:mss] Directory '/home/src/workspace/projects/project1/node_modules' does not exist, skipping all lookups in it.
Info seq  [hh:mm:ss:mss] File '/home/src/workspace/projects/node_modules/@typescript/lib-webworker.js' does not exist.
Info seq  [hh:mm:ss:mss] File '/home/src/workspace/projects/node_modules/@typescript/lib-webworker.jsx' does not exist.
Info seq  [hh:mm:ss:mss] Directory '/home/src/workspace/node_modules' does not exist, skipping all lookups in it.
Info seq  [hh:mm:ss:mss] Directory '/home/src/node_modules' does not exist, skipping all lookups in it.
Info seq  [hh:mm:ss:mss] Directory '/home/node_modules' does not exist, skipping all lookups in it.
Info seq  [hh:mm:ss:mss] Directory '/node_modules' does not exist, skipping all lookups in it.
Info seq  [hh:mm:ss:mss] ======== Module name '@typescript/lib-webworker' was not resolved. ========
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /home/src/workspace/projects/project1/node_modules 1 undefined Project: /home/src/workspace/projects/project1/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /home/src/workspace/projects/project1/node_modules 1 undefined Project: /home/src/workspace/projects/project1/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /home/src/workspace/projects/node_modules 1 undefined Project: /home/src/workspace/projects/project1/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /home/src/workspace/projects/node_modules 1 undefined Project: /home/src/workspace/projects/project1/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /home/src/workspace/node_modules 1 undefined Project: /home/src/workspace/projects/project1/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /home/src/workspace/node_modules 1 undefined Project: /home/src/workspace/projects/project1/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/tslibs/TS/Lib/lib.webworker.d.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] ======== Resolving module '@typescript/lib-scripthost' from '/home/src/workspace/projects/project1/__lib_node_modules_lookup_lib.scripthost.d.ts__.ts'. ========
Info seq  [hh:mm:ss:mss] Explicitly specified module resolution kind: 'Node10'.
Info seq  [hh:mm:ss:mss] Loading module '@typescript/lib-scripthost' from 'node_modules' folder, target file types: TypeScript, Declaration.
Info seq  [hh:mm:ss:mss] Searching all ancestor node_modules directories for preferred extensions: TypeScript, Declaration.
Info seq  [hh:mm:ss:mss] Directory '/home/src/workspace/projects/project1/node_modules' does not exist, skipping all lookups in it.
Info seq  [hh:mm:ss:mss] Scoped package detected, looking in 'typescript__lib-scripthost'
Info seq  [hh:mm:ss:mss] File '/home/src/workspace/projects/node_modules/@typescript/lib-scripthost.ts' does not exist.
Info seq  [hh:mm:ss:mss] File '/home/src/workspace/projects/node_modules/@typescript/lib-scripthost.tsx' does not exist.
Info seq  [hh:mm:ss:mss] File '/home/src/workspace/projects/node_modules/@typescript/lib-scripthost.d.ts' does not exist.
Info seq  [hh:mm:ss:mss] Directory '/home/src/workspace/projects/node_modules/@types' does not exist, skipping all lookups in it.
Info seq  [hh:mm:ss:mss] Scoped package detected, looking in 'typescript__lib-scripthost'
Info seq  [hh:mm:ss:mss] Directory '/home/src/workspace/node_modules' does not exist, skipping all lookups in it.
Info seq  [hh:mm:ss:mss] Scoped package detected, looking in 'typescript__lib-scripthost'
Info seq  [hh:mm:ss:mss] Directory '/home/src/node_modules' does not exist, skipping all lookups in it.
Info seq  [hh:mm:ss:mss] Scoped package detected, looking in 'typescript__lib-scripthost'
Info seq  [hh:mm:ss:mss] Directory '/home/node_modules' does not exist, skipping all lookups in it.
Info seq  [hh:mm:ss:mss] Scoped package detected, looking in 'typescript__lib-scripthost'
Info seq  [hh:mm:ss:mss] Directory '/node_modules' does not exist, skipping all lookups in it.
Info seq  [hh:mm:ss:mss] Scoped package detected, looking in 'typescript__lib-scripthost'
Info seq  [hh:mm:ss:mss] Loading module '@typescript/lib-scripthost' from 'node_modules' folder, target file types: JavaScript.
Info seq  [hh:mm:ss:mss] Searching all ancestor node_modules directories for fallback extensions: JavaScript.
Info seq  [hh:mm:ss:mss] Directory '/home/src/workspace/projects/project1/node_modules' does not exist, skipping all lookups in it.
Info seq  [hh:mm:ss:mss] File '/home/src/workspace/projects/node_modules/@typescript/lib-scripthost.js' does not exist.
Info seq  [hh:mm:ss:mss] File '/home/src/workspace/projects/node_modules/@typescript/lib-scripthost.jsx' does not exist.
Info seq  [hh:mm:ss:mss] Directory '/home/src/workspace/node_modules' does not exist, skipping all lookups in it.
Info seq  [hh:mm:ss:mss] Directory '/home/src/node_modules' does not exist, skipping all lookups in it.
Info seq  [hh:mm:ss:mss] Directory '/home/node_modules' does not exist, skipping all lookups in it.
Info seq  [hh:mm:ss:mss] Directory '/node_modules' does not exist, skipping all lookups in it.
Info seq  [hh:mm:ss:mss] ======== Module name '@typescript/lib-scripthost' was not resolved. ========
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/tslibs/TS/Lib/lib.scripthost.d.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] ======== Resolving module '@typescript/lib-es5' from '/home/src/workspace/projects/project1/__lib_node_modules_lookup_lib.es5.d.ts__.ts'. ========
Info seq  [hh:mm:ss:mss] Explicitly specified module resolution kind: 'Node10'.
Info seq  [hh:mm:ss:mss] Loading module '@typescript/lib-es5' from 'node_modules' folder, target file types: TypeScript, Declaration.
Info seq  [hh:mm:ss:mss] Searching all ancestor node_modules directories for preferred extensions: TypeScript, Declaration.
Info seq  [hh:mm:ss:mss] Directory '/home/src/workspace/projects/project1/node_modules' does not exist, skipping all lookups in it.
Info seq  [hh:mm:ss:mss] Scoped package detected, looking in 'typescript__lib-es5'
Info seq  [hh:mm:ss:mss] File '/home/src/workspace/projects/node_modules/@typescript/lib-es5.ts' does not exist.
Info seq  [hh:mm:ss:mss] File '/home/src/workspace/projects/node_modules/@typescript/lib-es5.tsx' does not exist.
Info seq  [hh:mm:ss:mss] File '/home/src/workspace/projects/node_modules/@typescript/lib-es5.d.ts' does not exist.
Info seq  [hh:mm:ss:mss] Directory '/home/src/workspace/projects/node_modules/@types' does not exist, skipping all lookups in it.
Info seq  [hh:mm:ss:mss] Scoped package detected, looking in 'typescript__lib-es5'
Info seq  [hh:mm:ss:mss] Directory '/home/src/workspace/node_modules' does not exist, skipping all lookups in it.
Info seq  [hh:mm:ss:mss] Scoped package detected, looking in 'typescript__lib-es5'
Info seq  [hh:mm:ss:mss] Directory '/home/src/node_modules' does not exist, skipping all lookups in it.
Info seq  [hh:mm:ss:mss] Scoped package detected, looking in 'typescript__lib-es5'
Info seq  [hh:mm:ss:mss] Directory '/home/node_modules' does not exist, skipping all lookups in it.
Info seq  [hh:mm:ss:mss] Scoped package detected, looking in 'typescript__lib-es5'
Info seq  [hh:mm:ss:mss] Directory '/node_modules' does not exist, skipping all lookups in it.
Info seq  [hh:mm:ss:mss] Scoped package detected, looking in 'typescript__lib-es5'
Info seq  [hh:mm:ss:mss] Loading module '@typescript/lib-es5' from 'node_modules' folder, target file types: JavaScript.
Info seq  [hh:mm:ss:mss] Searching all ancestor node_modules directories for fallback extensions: JavaScript.
Info seq  [hh:mm:ss:mss] Directory '/home/src/workspace/projects/project1/node_modules' does not exist, skipping all lookups in it.
Info seq  [hh:mm:ss:mss] File '/home/src/workspace/projects/node_modules/@typescript/lib-es5.js' does not exist.
Info seq  [hh:mm:ss:mss] File '/home/src/workspace/projects/node_modules/@typescript/lib-es5.jsx' does not exist.
Info seq  [hh:mm:ss:mss] Directory '/home/src/workspace/node_modules' does not exist, skipping all lookups in it.
Info seq  [hh:mm:ss:mss] Directory '/home/src/node_modules' does not exist, skipping all lookups in it.
Info seq  [hh:mm:ss:mss] Directory '/home/node_modules' does not exist, skipping all lookups in it.
Info seq  [hh:mm:ss:mss] Directory '/node_modules' does not exist, skipping all lookups in it.
Info seq  [hh:mm:ss:mss] ======== Module name '@typescript/lib-es5' was not resolved. ========
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/tslibs/TS/Lib/lib.es5.d.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] ======== Resolving type reference directive 'sometype', containing file '/home/src/workspace/projects/project1/__inferred type names__.ts', root directory '/home/src/workspace/projects/project1/typeroot1'. ========
Info seq  [hh:mm:ss:mss] Resolving with primary search path '/home/src/workspace/projects/project1/typeroot1'.
Info seq  [hh:mm:ss:mss] File '/home/src/workspace/projects/project1/typeroot1/sometype.d.ts' does not exist.
Info seq  [hh:mm:ss:mss] File '/home/src/workspace/projects/project1/typeroot1/sometype/package.json' does not exist.
Info seq  [hh:mm:ss:mss] File '/home/src/workspace/projects/project1/typeroot1/sometype/index.d.ts' exists - use it as a name resolution result.
Info seq  [hh:mm:ss:mss] Resolving real path for '/home/src/workspace/projects/project1/typeroot1/sometype/index.d.ts', result '/home/src/workspace/projects/project1/typeroot1/sometype/index.d.ts'.
Info seq  [hh:mm:ss:mss] ======== Type reference directive 'sometype' was successfully resolved to '/home/src/workspace/projects/project1/typeroot1/sometype/index.d.ts', primary: true. ========
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /home/src/workspace/projects/project1/typeroot1 1 undefined Project: /home/src/workspace/projects/project1/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /home/src/workspace/projects/project1/typeroot1 1 undefined Project: /home/src/workspace/projects/project1/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] ======== Resolving module '@typescript/lib-dom' from '/home/src/workspace/projects/project1/__lib_node_modules_lookup_lib.dom.d.ts__.ts'. ========
Info seq  [hh:mm:ss:mss] Explicitly specified module resolution kind: 'Node10'.
Info seq  [hh:mm:ss:mss] Loading module '@typescript/lib-dom' from 'node_modules' folder, target file types: TypeScript, Declaration.
Info seq  [hh:mm:ss:mss] Searching all ancestor node_modules directories for preferred extensions: TypeScript, Declaration.
Info seq  [hh:mm:ss:mss] Directory '/home/src/workspace/projects/project1/node_modules' does not exist, skipping all lookups in it.
Info seq  [hh:mm:ss:mss] Scoped package detected, looking in 'typescript__lib-dom'
Info seq  [hh:mm:ss:mss] File '/home/src/workspace/projects/node_modules/@typescript/lib-dom.ts' does not exist.
Info seq  [hh:mm:ss:mss] File '/home/src/workspace/projects/node_modules/@typescript/lib-dom.tsx' does not exist.
Info seq  [hh:mm:ss:mss] File '/home/src/workspace/projects/node_modules/@typescript/lib-dom.d.ts' does not exist.
Info seq  [hh:mm:ss:mss] Directory '/home/src/workspace/projects/node_modules/@types' does not exist, skipping all lookups in it.
Info seq  [hh:mm:ss:mss] Scoped package detected, looking in 'typescript__lib-dom'
Info seq  [hh:mm:ss:mss] Directory '/home/src/workspace/node_modules' does not exist, skipping all lookups in it.
Info seq  [hh:mm:ss:mss] Scoped package detected, looking in 'typescript__lib-dom'
Info seq  [hh:mm:ss:mss] Directory '/home/src/node_modules' does not exist, skipping all lookups in it.
Info seq  [hh:mm:ss:mss] Scoped package detected, looking in 'typescript__lib-dom'
Info seq  [hh:mm:ss:mss] Directory '/home/node_modules' does not exist, skipping all lookups in it.
Info seq  [hh:mm:ss:mss] Scoped package detected, looking in 'typescript__lib-dom'
Info seq  [hh:mm:ss:mss] Directory '/node_modules' does not exist, skipping all lookups in it.
Info seq  [hh:mm:ss:mss] Scoped package detected, looking in 'typescript__lib-dom'
Info seq  [hh:mm:ss:mss] Loading module '@typescript/lib-dom' from 'node_modules' folder, target file types: JavaScript.
Info seq  [hh:mm:ss:mss] Searching all ancestor node_modules directories for fallback extensions: JavaScript.
Info seq  [hh:mm:ss:mss] Directory '/home/src/workspace/projects/project1/node_modules' does not exist, skipping all lookups in it.
Info seq  [hh:mm:ss:mss] File '/home/src/workspace/projects/node_modules/@typescript/lib-dom.js' does not exist.
Info seq  [hh:mm:ss:mss] File '/home/src/workspace/projects/node_modules/@typescript/lib-dom.jsx' does not exist.
Info seq  [hh:mm:ss:mss] Directory '/home/src/workspace/node_modules' does not exist, skipping all lookups in it.
Info seq  [hh:mm:ss:mss] Directory '/home/src/node_modules' does not exist, skipping all lookups in it.
Info seq  [hh:mm:ss:mss] Directory '/home/node_modules' does not exist, skipping all lookups in it.
Info seq  [hh:mm:ss:mss] Directory '/node_modules' does not exist, skipping all lookups in it.
Info seq  [hh:mm:ss:mss] ======== Module name '@typescript/lib-dom' was not resolved. ========
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/tslibs/TS/Lib/lib.dom.d.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /home/src/workspace/projects/project1/typeroot1 1 undefined Project: /home/src/workspace/projects/project1/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /home/src/workspace/projects/project1/typeroot1 1 undefined Project: /home/src/workspace/projects/project1/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: /home/src/workspace/projects/project1/tsconfig.json projectStateVersion: 1 projectProgramVersion: 0 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Project '/home/src/workspace/projects/project1/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (10)
	/home/src/tslibs/TS/Lib/lib.es5.d.ts Text-1 "/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };"
	/home/src/tslibs/TS/Lib/lib.dom.d.ts Text-1 "interface DOMInterface { }"
	/home/src/tslibs/TS/Lib/lib.webworker.d.ts Text-1 "interface WebWorkerInterface { }"
	/home/src/tslibs/TS/Lib/lib.scripthost.d.ts Text-1 "interface ScriptHostInterface { }"
	/home/src/workspace/projects/project1/core.d.ts Text-1 "export const core = 10;"
	/home/src/workspace/projects/project1/file.ts Text-1 "export const file = 10;"
	/home/src/workspace/projects/project1/file2.ts Text-1 "/// <reference lib=\"webworker\"/>\n/// <reference lib=\"scripthost\"/>\n/// <reference lib=\"es5\"/>\n"
	/home/src/workspace/projects/project1/index.ts SVC-1-0 "export const x = \"type1\";"
	/home/src/workspace/projects/project1/utils.d.ts Text-1 "export const y = 10;"
	/home/src/workspace/projects/project1/typeroot1/sometype/index.d.ts Text-1 "export type TheNum = \"type1\";"


	../../../tslibs/TS/Lib/lib.es5.d.ts
	  Library referenced via 'es5' from file 'file2.ts'
	  Library 'lib.es5.d.ts' specified in compilerOptions
	../../../tslibs/TS/Lib/lib.dom.d.ts
	  Library 'lib.dom.d.ts' specified in compilerOptions
	../../../tslibs/TS/Lib/lib.webworker.d.ts
	  Library referenced via 'webworker' from file 'file2.ts'
	../../../tslibs/TS/Lib/lib.scripthost.d.ts
	  Library referenced via 'scripthost' from file 'file2.ts'
	core.d.ts
	  Matched by default include pattern '**/*'
	file.ts
	  Matched by default include pattern '**/*'
	file2.ts
	  Matched by default include pattern '**/*'
	index.ts
	  Matched by default include pattern '**/*'
	utils.d.ts
	  Matched by default include pattern '**/*'
	typeroot1/sometype/index.d.ts
	  Matched by default include pattern '**/*'
	  Entry point for implicit type library 'sometype'

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "projectLoadingFinish",
      "body": {
        "projectName": "/home/src/workspace/projects/project1/tsconfig.json"
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
          "projectId": "e111a8c6f5f11827cfd41ed3d2611b65e8d936c6cc35daa7a5593233e2931815",
          "fileStats": {
            "js": 0,
            "jsSize": 0,
            "jsx": 0,
            "jsxSize": 0,
            "ts": 3,
            "tsSize": 142,
            "tsx": 0,
            "tsxSize": 0,
            "dts": 7,
            "dtsSize": 576,
            "deferred": 0,
            "deferredSize": 0
          },
          "compilerOptions": {
            "composite": true,
            "typeRoots": [
              ""
            ],
            "lib": [
              "es5",
              "dom"
            ],
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
        "triggerFile": "/home/src/workspace/projects/project1/index.ts",
        "configFile": "/home/src/workspace/projects/project1/tsconfig.json",
        "diagnostics": []
      }
    }
Info seq  [hh:mm:ss:mss] getConfigFileNameForFile:: File: /home/src/workspace/projects/project1/tsconfig.json ProjectRootPath: undefined:: Result: undefined
Info seq  [hh:mm:ss:mss] Project '/home/src/workspace/projects/project1/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (10)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: /home/src/workspace/projects/project1/index.ts ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /home/src/workspace/projects/project1/tsconfig.json
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
//// [/home/src/tslibs/TS/Lib/lib.es5.d.ts] *Lib*


PolledWatches::
/home/src/workspace/node_modules: *new*
  {"pollingInterval":500}
/home/src/workspace/projects/project1/node_modules: *new*
  {"pollingInterval":500}

FsWatches::
/home/src/tslibs/TS/Lib/lib.dom.d.ts: *new*
  {}
/home/src/tslibs/TS/Lib/lib.es5.d.ts: *new*
  {}
/home/src/tslibs/TS/Lib/lib.scripthost.d.ts: *new*
  {}
/home/src/tslibs/TS/Lib/lib.webworker.d.ts: *new*
  {}
/home/src/workspace/projects/project1/core.d.ts: *new*
  {}
/home/src/workspace/projects/project1/file.ts: *new*
  {}
/home/src/workspace/projects/project1/file2.ts: *new*
  {}
/home/src/workspace/projects/project1/tsconfig.json: *new*
  {}
/home/src/workspace/projects/project1/typeroot1/sometype/index.d.ts: *new*
  {}
/home/src/workspace/projects/project1/utils.d.ts: *new*
  {}

FsWatchesRecursive::
/home/src/workspace/projects/node_modules: *new*
  {}
/home/src/workspace/projects/project1: *new*
  {}
/home/src/workspace/projects/project1/typeroot1: *new*
  {}

Projects::
/home/src/workspace/projects/project1/tsconfig.json (Configured) *new*
    projectStateVersion: 1
    projectProgramVersion: 1
    autoImportProviderHost: false

ScriptInfos::
/home/src/tslibs/TS/Lib/lib.dom.d.ts *new*
    version: Text-1
    containingProjects: 1
        /home/src/workspace/projects/project1/tsconfig.json
/home/src/tslibs/TS/Lib/lib.es5.d.ts *new*
    version: Text-1
    containingProjects: 1
        /home/src/workspace/projects/project1/tsconfig.json
/home/src/tslibs/TS/Lib/lib.scripthost.d.ts *new*
    version: Text-1
    containingProjects: 1
        /home/src/workspace/projects/project1/tsconfig.json
/home/src/tslibs/TS/Lib/lib.webworker.d.ts *new*
    version: Text-1
    containingProjects: 1
        /home/src/workspace/projects/project1/tsconfig.json
/home/src/workspace/projects/project1/core.d.ts *new*
    version: Text-1
    containingProjects: 1
        /home/src/workspace/projects/project1/tsconfig.json
/home/src/workspace/projects/project1/file.ts *new*
    version: Text-1
    containingProjects: 1
        /home/src/workspace/projects/project1/tsconfig.json
/home/src/workspace/projects/project1/file2.ts *new*
    version: Text-1
    containingProjects: 1
        /home/src/workspace/projects/project1/tsconfig.json
/home/src/workspace/projects/project1/index.ts (Open) *new*
    version: SVC-1-0
    containingProjects: 1
        /home/src/workspace/projects/project1/tsconfig.json *default*
/home/src/workspace/projects/project1/typeroot1/sometype/index.d.ts *new*
    version: Text-1
    containingProjects: 1
        /home/src/workspace/projects/project1/tsconfig.json
/home/src/workspace/projects/project1/utils.d.ts *new*
    version: Text-1
    containingProjects: 1
        /home/src/workspace/projects/project1/tsconfig.json

write redirect file dom
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Triggered with /home/src/workspace/projects/node_modules/@typescript/lib-dom :: WatchInfo: /home/src/workspace/projects/node_modules 1 undefined Project: /home/src/workspace/projects/project1/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Scheduled: /home/src/workspace/projects/project1/tsconfig.jsonFailedLookupInvalidation
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Triggered with /home/src/workspace/projects/node_modules/@typescript/lib-dom :: WatchInfo: /home/src/workspace/projects/node_modules 1 undefined Project: /home/src/workspace/projects/project1/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Triggered with /home/src/workspace/projects/node_modules/@typescript/lib-dom/index.d.ts :: WatchInfo: /home/src/workspace/projects/node_modules 1 undefined Project: /home/src/workspace/projects/project1/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Scheduled: /home/src/workspace/projects/project1/tsconfig.jsonFailedLookupInvalidation, Cancelled earlier one
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Triggered with /home/src/workspace/projects/node_modules/@typescript/lib-dom/index.d.ts :: WatchInfo: /home/src/workspace/projects/node_modules 1 undefined Project: /home/src/workspace/projects/project1/tsconfig.json WatchType: Failed Lookup Locations
Before running Timeout callback:: count: 1
2: /home/src/workspace/projects/project1/tsconfig.jsonFailedLookupInvalidation
//// [/home/src/workspace/projects/node_modules/@typescript/lib-dom/index.d.ts]
interface DOMInterface { }


Timeout callback:: count: 1
2: /home/src/workspace/projects/project1/tsconfig.jsonFailedLookupInvalidation *new*

Info seq  [hh:mm:ss:mss] Running: /home/src/workspace/projects/project1/tsconfig.jsonFailedLookupInvalidation
Info seq  [hh:mm:ss:mss] Scheduled: /home/src/workspace/projects/project1/tsconfig.json
Info seq  [hh:mm:ss:mss] Scheduled: *ensureProjectForOpenFiles*
After running Timeout callback:: count: 2

Timeout callback:: count: 2
3: /home/src/workspace/projects/project1/tsconfig.json *new*
4: *ensureProjectForOpenFiles* *new*

Projects::
/home/src/workspace/projects/project1/tsconfig.json (Configured) *changed*
    projectStateVersion: 2 *changed*
    projectProgramVersion: 1
    dirty: true *changed*
    autoImportProviderHost: false

Before running Timeout callback:: count: 2
3: /home/src/workspace/projects/project1/tsconfig.json
4: *ensureProjectForOpenFiles*

Info seq  [hh:mm:ss:mss] Running: /home/src/workspace/projects/project1/tsconfig.json
Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: /home/src/workspace/projects/project1/tsconfig.json
Info seq  [hh:mm:ss:mss] Reusing resolution of module '@typescript/lib-webworker' from '/home/src/workspace/projects/project1/__lib_node_modules_lookup_lib.webworker.d.ts__.ts' of old program, it was not resolved.
Info seq  [hh:mm:ss:mss] Reusing resolution of module '@typescript/lib-scripthost' from '/home/src/workspace/projects/project1/__lib_node_modules_lookup_lib.scripthost.d.ts__.ts' of old program, it was not resolved.
Info seq  [hh:mm:ss:mss] Reusing resolution of module '@typescript/lib-es5' from '/home/src/workspace/projects/project1/__lib_node_modules_lookup_lib.es5.d.ts__.ts' of old program, it was not resolved.
Info seq  [hh:mm:ss:mss] ======== Resolving module '@typescript/lib-dom' from '/home/src/workspace/projects/project1/__lib_node_modules_lookup_lib.dom.d.ts__.ts'. ========
Info seq  [hh:mm:ss:mss] Explicitly specified module resolution kind: 'Node10'.
Info seq  [hh:mm:ss:mss] Loading module '@typescript/lib-dom' from 'node_modules' folder, target file types: TypeScript, Declaration.
Info seq  [hh:mm:ss:mss] Searching all ancestor node_modules directories for preferred extensions: TypeScript, Declaration.
Info seq  [hh:mm:ss:mss] Directory '/home/src/workspace/projects/project1/node_modules' does not exist, skipping all lookups in it.
Info seq  [hh:mm:ss:mss] Scoped package detected, looking in 'typescript__lib-dom'
Info seq  [hh:mm:ss:mss] File '/home/src/workspace/projects/node_modules/@typescript/lib-dom/package.json' does not exist.
Info seq  [hh:mm:ss:mss] File '/home/src/workspace/projects/node_modules/@typescript/lib-dom.ts' does not exist.
Info seq  [hh:mm:ss:mss] File '/home/src/workspace/projects/node_modules/@typescript/lib-dom.tsx' does not exist.
Info seq  [hh:mm:ss:mss] File '/home/src/workspace/projects/node_modules/@typescript/lib-dom.d.ts' does not exist.
Info seq  [hh:mm:ss:mss] File '/home/src/workspace/projects/node_modules/@typescript/lib-dom/index.ts' does not exist.
Info seq  [hh:mm:ss:mss] File '/home/src/workspace/projects/node_modules/@typescript/lib-dom/index.tsx' does not exist.
Info seq  [hh:mm:ss:mss] File '/home/src/workspace/projects/node_modules/@typescript/lib-dom/index.d.ts' exists - use it as a name resolution result.
Info seq  [hh:mm:ss:mss] Resolving real path for '/home/src/workspace/projects/node_modules/@typescript/lib-dom/index.d.ts', result '/home/src/workspace/projects/node_modules/@typescript/lib-dom/index.d.ts'.
Info seq  [hh:mm:ss:mss] ======== Module name '@typescript/lib-dom' was successfully resolved to '/home/src/workspace/projects/node_modules/@typescript/lib-dom/index.d.ts'. ========
Info seq  [hh:mm:ss:mss] Reusing resolution of type reference directive 'sometype' from '/home/src/workspace/projects/project1/__inferred type names__.ts' of old program, it was successfully resolved to '/home/src/workspace/projects/project1/typeroot1/sometype/index.d.ts'.
Info seq  [hh:mm:ss:mss] File '/home/src/workspace/projects/node_modules/@typescript/lib-dom/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspace/projects/node_modules/@typescript/package.json' does not exist.
Info seq  [hh:mm:ss:mss] File '/home/src/workspace/projects/node_modules/package.json' does not exist.
Info seq  [hh:mm:ss:mss] File '/home/src/workspace/projects/package.json' does not exist.
Info seq  [hh:mm:ss:mss] File '/home/src/workspace/package.json' does not exist.
Info seq  [hh:mm:ss:mss] File '/home/src/package.json' does not exist.
Info seq  [hh:mm:ss:mss] File '/home/package.json' does not exist.
Info seq  [hh:mm:ss:mss] File '/package.json' does not exist.
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /home/src/workspace/projects/node_modules 1 undefined WatchType: node_modules for closed script infos and package.jsons affecting module specifier cache
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /home/src/workspace/projects/node_modules 1 undefined WatchType: node_modules for closed script infos and package.jsons affecting module specifier cache
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/workspace/projects/node_modules/@typescript/lib-dom/package.json 2000 undefined Project: /home/src/workspace/projects/project1/tsconfig.json WatchType: File location affecting resolution
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/workspace/projects/node_modules/@typescript/package.json 2000 undefined Project: /home/src/workspace/projects/project1/tsconfig.json WatchType: File location affecting resolution
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/workspace/projects/node_modules/package.json 2000 undefined Project: /home/src/workspace/projects/project1/tsconfig.json WatchType: File location affecting resolution
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/workspace/projects/package.json 2000 undefined Project: /home/src/workspace/projects/project1/tsconfig.json WatchType: File location affecting resolution
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/workspace/package.json 2000 undefined Project: /home/src/workspace/projects/project1/tsconfig.json WatchType: File location affecting resolution
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: /home/src/workspace/projects/project1/tsconfig.json projectStateVersion: 2 projectProgramVersion: 1 structureChanged: true structureIsReused:: SafeModules Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Project '/home/src/workspace/projects/project1/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (10)
	/home/src/tslibs/TS/Lib/lib.es5.d.ts Text-1 "/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };"
	/home/src/tslibs/TS/Lib/lib.webworker.d.ts Text-1 "interface WebWorkerInterface { }"
	/home/src/tslibs/TS/Lib/lib.scripthost.d.ts Text-1 "interface ScriptHostInterface { }"
	/home/src/workspace/projects/node_modules/@typescript/lib-dom/index.d.ts Text-1 "interface DOMInterface { }"
	/home/src/workspace/projects/project1/core.d.ts Text-1 "export const core = 10;"
	/home/src/workspace/projects/project1/file.ts Text-1 "export const file = 10;"
	/home/src/workspace/projects/project1/file2.ts Text-1 "/// <reference lib=\"webworker\"/>\n/// <reference lib=\"scripthost\"/>\n/// <reference lib=\"es5\"/>\n"
	/home/src/workspace/projects/project1/index.ts SVC-1-0 "export const x = \"type1\";"
	/home/src/workspace/projects/project1/utils.d.ts Text-1 "export const y = 10;"
	/home/src/workspace/projects/project1/typeroot1/sometype/index.d.ts Text-1 "export type TheNum = \"type1\";"


	../../../tslibs/TS/Lib/lib.es5.d.ts
	  Library referenced via 'es5' from file 'file2.ts'
	  Library 'lib.es5.d.ts' specified in compilerOptions
	../../../tslibs/TS/Lib/lib.webworker.d.ts
	  Library referenced via 'webworker' from file 'file2.ts'
	../../../tslibs/TS/Lib/lib.scripthost.d.ts
	  Library referenced via 'scripthost' from file 'file2.ts'
	../node_modules/@typescript/lib-dom/index.d.ts
	  Library 'lib.dom.d.ts' specified in compilerOptions
	core.d.ts
	  Matched by default include pattern '**/*'
	file.ts
	  Matched by default include pattern '**/*'
	file2.ts
	  Matched by default include pattern '**/*'
	index.ts
	  Matched by default include pattern '**/*'
	utils.d.ts
	  Matched by default include pattern '**/*'
	typeroot1/sometype/index.d.ts
	  Matched by default include pattern '**/*'
	  Entry point for implicit type library 'sometype'

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Running: *ensureProjectForOpenFiles*
Info seq  [hh:mm:ss:mss] Before ensureProjectForOpenFiles:
Info seq  [hh:mm:ss:mss] Project '/home/src/workspace/projects/project1/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (10)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: /home/src/workspace/projects/project1/index.ts ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /home/src/workspace/projects/project1/tsconfig.json
Info seq  [hh:mm:ss:mss] After ensureProjectForOpenFiles:
Info seq  [hh:mm:ss:mss] Project '/home/src/workspace/projects/project1/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (10)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: /home/src/workspace/projects/project1/index.ts ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /home/src/workspace/projects/project1/tsconfig.json
Info seq  [hh:mm:ss:mss] got projects updated in background /home/src/workspace/projects/project1/index.ts
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "projectsUpdatedInBackground",
      "body": {
        "openFiles": [
          "/home/src/workspace/projects/project1/index.ts"
        ]
      }
    }
After running Timeout callback:: count: 0

PolledWatches::
/home/src/workspace/node_modules:
  {"pollingInterval":500}
/home/src/workspace/package.json: *new*
  {"pollingInterval":2000}
/home/src/workspace/projects/node_modules/@typescript/lib-dom/package.json: *new*
  {"pollingInterval":2000}
/home/src/workspace/projects/node_modules/@typescript/package.json: *new*
  {"pollingInterval":2000}
/home/src/workspace/projects/node_modules/package.json: *new*
  {"pollingInterval":2000}
/home/src/workspace/projects/package.json: *new*
  {"pollingInterval":2000}
/home/src/workspace/projects/project1/node_modules:
  {"pollingInterval":500}

FsWatches::
/home/src/tslibs/TS/Lib/lib.dom.d.ts:
  {}
/home/src/tslibs/TS/Lib/lib.es5.d.ts:
  {}
/home/src/tslibs/TS/Lib/lib.scripthost.d.ts:
  {}
/home/src/tslibs/TS/Lib/lib.webworker.d.ts:
  {}
/home/src/workspace/projects/project1/core.d.ts:
  {}
/home/src/workspace/projects/project1/file.ts:
  {}
/home/src/workspace/projects/project1/file2.ts:
  {}
/home/src/workspace/projects/project1/tsconfig.json:
  {}
/home/src/workspace/projects/project1/typeroot1/sometype/index.d.ts:
  {}
/home/src/workspace/projects/project1/utils.d.ts:
  {}

FsWatchesRecursive::
/home/src/workspace/projects/node_modules:
  {}
/home/src/workspace/projects/project1:
  {}
/home/src/workspace/projects/project1/typeroot1:
  {}

Projects::
/home/src/workspace/projects/project1/tsconfig.json (Configured) *changed*
    projectStateVersion: 2
    projectProgramVersion: 2 *changed*
    dirty: false *changed*
    autoImportProviderHost: undefined *changed*

ScriptInfos::
/home/src/tslibs/TS/Lib/lib.dom.d.ts *changed*
    version: Text-1
    containingProjects: 0 *changed*
        /home/src/workspace/projects/project1/tsconfig.json *deleted*
/home/src/tslibs/TS/Lib/lib.es5.d.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspace/projects/project1/tsconfig.json
/home/src/tslibs/TS/Lib/lib.scripthost.d.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspace/projects/project1/tsconfig.json
/home/src/tslibs/TS/Lib/lib.webworker.d.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspace/projects/project1/tsconfig.json
/home/src/workspace/projects/node_modules/@typescript/lib-dom/index.d.ts *new*
    version: Text-1
    containingProjects: 1
        /home/src/workspace/projects/project1/tsconfig.json
/home/src/workspace/projects/project1/core.d.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspace/projects/project1/tsconfig.json
/home/src/workspace/projects/project1/file.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspace/projects/project1/tsconfig.json
/home/src/workspace/projects/project1/file2.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspace/projects/project1/tsconfig.json
/home/src/workspace/projects/project1/index.ts (Open)
    version: SVC-1-0
    containingProjects: 1
        /home/src/workspace/projects/project1/tsconfig.json *default*
/home/src/workspace/projects/project1/typeroot1/sometype/index.d.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspace/projects/project1/tsconfig.json
/home/src/workspace/projects/project1/utils.d.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspace/projects/project1/tsconfig.json

edit file
Info seq  [hh:mm:ss:mss] FileWatcher:: Triggered with /home/src/workspace/projects/project1/file.ts 1:: WatchInfo: /home/src/workspace/projects/project1/file.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] Scheduled: /home/src/workspace/projects/project1/tsconfig.json
Info seq  [hh:mm:ss:mss] Scheduled: *ensureProjectForOpenFiles*
Info seq  [hh:mm:ss:mss] Elapsed:: *ms FileWatcher:: Triggered with /home/src/workspace/projects/project1/file.ts 1:: WatchInfo: /home/src/workspace/projects/project1/file.ts 500 undefined WatchType: Closed Script info
Before running Timeout callback:: count: 2
5: /home/src/workspace/projects/project1/tsconfig.json
6: *ensureProjectForOpenFiles*
//// [/home/src/workspace/projects/project1/file.ts]
export const file = 10;export const xyz = 10;


Timeout callback:: count: 2
5: /home/src/workspace/projects/project1/tsconfig.json *new*
6: *ensureProjectForOpenFiles* *new*

Projects::
/home/src/workspace/projects/project1/tsconfig.json (Configured) *changed*
    projectStateVersion: 3 *changed*
    projectProgramVersion: 2
    dirty: true *changed*

ScriptInfos::
/home/src/tslibs/TS/Lib/lib.dom.d.ts
    version: Text-1
    containingProjects: 0
/home/src/tslibs/TS/Lib/lib.es5.d.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspace/projects/project1/tsconfig.json
/home/src/tslibs/TS/Lib/lib.scripthost.d.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspace/projects/project1/tsconfig.json
/home/src/tslibs/TS/Lib/lib.webworker.d.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspace/projects/project1/tsconfig.json
/home/src/workspace/projects/node_modules/@typescript/lib-dom/index.d.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspace/projects/project1/tsconfig.json
/home/src/workspace/projects/project1/core.d.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspace/projects/project1/tsconfig.json
/home/src/workspace/projects/project1/file.ts *changed*
    version: Text-1
    pendingReloadFromDisk: true *changed*
    containingProjects: 1
        /home/src/workspace/projects/project1/tsconfig.json
/home/src/workspace/projects/project1/file2.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspace/projects/project1/tsconfig.json
/home/src/workspace/projects/project1/index.ts (Open)
    version: SVC-1-0
    containingProjects: 1
        /home/src/workspace/projects/project1/tsconfig.json *default*
/home/src/workspace/projects/project1/typeroot1/sometype/index.d.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspace/projects/project1/tsconfig.json
/home/src/workspace/projects/project1/utils.d.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspace/projects/project1/tsconfig.json

Info seq  [hh:mm:ss:mss] Running: /home/src/workspace/projects/project1/tsconfig.json
Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: /home/src/workspace/projects/project1/tsconfig.json
Info seq  [hh:mm:ss:mss] File '/home/src/workspace/projects/node_modules/@typescript/lib-dom/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspace/projects/node_modules/@typescript/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspace/projects/node_modules/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspace/projects/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspace/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] Reusing resolution of module '@typescript/lib-webworker' from '/home/src/workspace/projects/project1/__lib_node_modules_lookup_lib.webworker.d.ts__.ts' of old program, it was not resolved.
Info seq  [hh:mm:ss:mss] Reusing resolution of module '@typescript/lib-scripthost' from '/home/src/workspace/projects/project1/__lib_node_modules_lookup_lib.scripthost.d.ts__.ts' of old program, it was not resolved.
Info seq  [hh:mm:ss:mss] Reusing resolution of module '@typescript/lib-es5' from '/home/src/workspace/projects/project1/__lib_node_modules_lookup_lib.es5.d.ts__.ts' of old program, it was not resolved.
Info seq  [hh:mm:ss:mss] Reusing resolution of module '@typescript/lib-dom' from '/home/src/workspace/projects/project1/__lib_node_modules_lookup_lib.dom.d.ts__.ts' of old program, it was successfully resolved to '/home/src/workspace/projects/node_modules/@typescript/lib-dom/index.d.ts'.
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: /home/src/workspace/projects/project1/tsconfig.json projectStateVersion: 3 projectProgramVersion: 2 structureChanged: false structureIsReused:: Completely Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Project '/home/src/workspace/projects/project1/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (10)
	/home/src/tslibs/TS/Lib/lib.es5.d.ts Text-1 "/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };"
	/home/src/tslibs/TS/Lib/lib.webworker.d.ts Text-1 "interface WebWorkerInterface { }"
	/home/src/tslibs/TS/Lib/lib.scripthost.d.ts Text-1 "interface ScriptHostInterface { }"
	/home/src/workspace/projects/node_modules/@typescript/lib-dom/index.d.ts Text-1 "interface DOMInterface { }"
	/home/src/workspace/projects/project1/core.d.ts Text-1 "export const core = 10;"
	/home/src/workspace/projects/project1/file.ts Text-2 "export const file = 10;export const xyz = 10;"
	/home/src/workspace/projects/project1/file2.ts Text-1 "/// <reference lib=\"webworker\"/>\n/// <reference lib=\"scripthost\"/>\n/// <reference lib=\"es5\"/>\n"
	/home/src/workspace/projects/project1/index.ts SVC-1-0 "export const x = \"type1\";"
	/home/src/workspace/projects/project1/utils.d.ts Text-1 "export const y = 10;"
	/home/src/workspace/projects/project1/typeroot1/sometype/index.d.ts Text-1 "export type TheNum = \"type1\";"

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Running: *ensureProjectForOpenFiles*
Info seq  [hh:mm:ss:mss] Before ensureProjectForOpenFiles:
Info seq  [hh:mm:ss:mss] Project '/home/src/workspace/projects/project1/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (10)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: /home/src/workspace/projects/project1/index.ts ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /home/src/workspace/projects/project1/tsconfig.json
Info seq  [hh:mm:ss:mss] After ensureProjectForOpenFiles:
Info seq  [hh:mm:ss:mss] Project '/home/src/workspace/projects/project1/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (10)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: /home/src/workspace/projects/project1/index.ts ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /home/src/workspace/projects/project1/tsconfig.json
Info seq  [hh:mm:ss:mss] got projects updated in background /home/src/workspace/projects/project1/index.ts
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "projectsUpdatedInBackground",
      "body": {
        "openFiles": [
          "/home/src/workspace/projects/project1/index.ts"
        ]
      }
    }
After running Timeout callback:: count: 0

Projects::
/home/src/workspace/projects/project1/tsconfig.json (Configured) *changed*
    projectStateVersion: 3
    projectProgramVersion: 2
    dirty: false *changed*

ScriptInfos::
/home/src/tslibs/TS/Lib/lib.dom.d.ts
    version: Text-1
    containingProjects: 0
/home/src/tslibs/TS/Lib/lib.es5.d.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspace/projects/project1/tsconfig.json
/home/src/tslibs/TS/Lib/lib.scripthost.d.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspace/projects/project1/tsconfig.json
/home/src/tslibs/TS/Lib/lib.webworker.d.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspace/projects/project1/tsconfig.json
/home/src/workspace/projects/node_modules/@typescript/lib-dom/index.d.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspace/projects/project1/tsconfig.json
/home/src/workspace/projects/project1/core.d.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspace/projects/project1/tsconfig.json
/home/src/workspace/projects/project1/file.ts *changed*
    version: Text-2 *changed*
    pendingReloadFromDisk: false *changed*
    containingProjects: 1
        /home/src/workspace/projects/project1/tsconfig.json
/home/src/workspace/projects/project1/file2.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspace/projects/project1/tsconfig.json
/home/src/workspace/projects/project1/index.ts (Open)
    version: SVC-1-0
    containingProjects: 1
        /home/src/workspace/projects/project1/tsconfig.json *default*
/home/src/workspace/projects/project1/typeroot1/sometype/index.d.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspace/projects/project1/tsconfig.json
/home/src/workspace/projects/project1/utils.d.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspace/projects/project1/tsconfig.json

delete core
Info seq  [hh:mm:ss:mss] FileWatcher:: Triggered with /home/src/workspace/projects/project1/core.d.ts 2:: WatchInfo: /home/src/workspace/projects/project1/core.d.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] Scheduled: /home/src/workspace/projects/project1/tsconfig.json
Info seq  [hh:mm:ss:mss] Scheduled: *ensureProjectForOpenFiles*
Info seq  [hh:mm:ss:mss] Elapsed:: *ms FileWatcher:: Triggered with /home/src/workspace/projects/project1/core.d.ts 2:: WatchInfo: /home/src/workspace/projects/project1/core.d.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Triggered with /home/src/workspace/projects/project1/core.d.ts :: WatchInfo: /home/src/workspace/projects/project1 1 undefined Config: /home/src/workspace/projects/project1/tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] Scheduled: /home/src/workspace/projects/project1/tsconfig.json, Cancelled earlier one
Info seq  [hh:mm:ss:mss] Scheduled: *ensureProjectForOpenFiles*, Cancelled earlier one
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Triggered with /home/src/workspace/projects/project1/core.d.ts :: WatchInfo: /home/src/workspace/projects/project1 1 undefined Config: /home/src/workspace/projects/project1/tsconfig.json WatchType: Wild card directory
Before running Timeout callback:: count: 2
9: /home/src/workspace/projects/project1/tsconfig.json
10: *ensureProjectForOpenFiles*
//// [/home/src/workspace/projects/project1/core.d.ts] deleted

Timeout callback:: count: 2
9: /home/src/workspace/projects/project1/tsconfig.json *new*
10: *ensureProjectForOpenFiles* *new*

Projects::
/home/src/workspace/projects/project1/tsconfig.json (Configured) *changed*
    projectStateVersion: 4 *changed*
    projectProgramVersion: 2
    dirty: true *changed*

ScriptInfos::
/home/src/tslibs/TS/Lib/lib.dom.d.ts
    version: Text-1
    containingProjects: 0
/home/src/tslibs/TS/Lib/lib.es5.d.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspace/projects/project1/tsconfig.json
/home/src/tslibs/TS/Lib/lib.scripthost.d.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspace/projects/project1/tsconfig.json
/home/src/tslibs/TS/Lib/lib.webworker.d.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspace/projects/project1/tsconfig.json
/home/src/workspace/projects/node_modules/@typescript/lib-dom/index.d.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspace/projects/project1/tsconfig.json
/home/src/workspace/projects/project1/core.d.ts *changed*
    version: Text-1
    pendingReloadFromDisk: true *changed*
    deferredDelete: true *changed*
    containingProjects: 0 *changed*
        /home/src/workspace/projects/project1/tsconfig.json *deleted*
/home/src/workspace/projects/project1/file.ts
    version: Text-2
    containingProjects: 1
        /home/src/workspace/projects/project1/tsconfig.json
/home/src/workspace/projects/project1/file2.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspace/projects/project1/tsconfig.json
/home/src/workspace/projects/project1/index.ts (Open)
    version: SVC-1-0
    containingProjects: 1
        /home/src/workspace/projects/project1/tsconfig.json *default*
/home/src/workspace/projects/project1/typeroot1/sometype/index.d.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspace/projects/project1/tsconfig.json
/home/src/workspace/projects/project1/utils.d.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspace/projects/project1/tsconfig.json

Info seq  [hh:mm:ss:mss] Running: /home/src/workspace/projects/project1/tsconfig.json
Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: /home/src/workspace/projects/project1/tsconfig.json
Info seq  [hh:mm:ss:mss] Reusing resolution of module '@typescript/lib-webworker' from '/home/src/workspace/projects/project1/__lib_node_modules_lookup_lib.webworker.d.ts__.ts' of old program, it was not resolved.
Info seq  [hh:mm:ss:mss] Reusing resolution of module '@typescript/lib-scripthost' from '/home/src/workspace/projects/project1/__lib_node_modules_lookup_lib.scripthost.d.ts__.ts' of old program, it was not resolved.
Info seq  [hh:mm:ss:mss] Reusing resolution of module '@typescript/lib-es5' from '/home/src/workspace/projects/project1/__lib_node_modules_lookup_lib.es5.d.ts__.ts' of old program, it was not resolved.
Info seq  [hh:mm:ss:mss] Reusing resolution of type reference directive 'sometype' from '/home/src/workspace/projects/project1/__inferred type names__.ts' of old program, it was successfully resolved to '/home/src/workspace/projects/project1/typeroot1/sometype/index.d.ts'.
Info seq  [hh:mm:ss:mss] Reusing resolution of module '@typescript/lib-dom' from '/home/src/workspace/projects/project1/__lib_node_modules_lookup_lib.dom.d.ts__.ts' of old program, it was successfully resolved to '/home/src/workspace/projects/node_modules/@typescript/lib-dom/index.d.ts'.
Info seq  [hh:mm:ss:mss] File '/home/src/workspace/projects/node_modules/@typescript/lib-dom/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspace/projects/node_modules/@typescript/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspace/projects/node_modules/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspace/projects/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspace/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: /home/src/workspace/projects/project1/tsconfig.json projectStateVersion: 4 projectProgramVersion: 2 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Project '/home/src/workspace/projects/project1/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (9)
	/home/src/tslibs/TS/Lib/lib.es5.d.ts Text-1 "/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };"
	/home/src/tslibs/TS/Lib/lib.webworker.d.ts Text-1 "interface WebWorkerInterface { }"
	/home/src/tslibs/TS/Lib/lib.scripthost.d.ts Text-1 "interface ScriptHostInterface { }"
	/home/src/workspace/projects/node_modules/@typescript/lib-dom/index.d.ts Text-1 "interface DOMInterface { }"
	/home/src/workspace/projects/project1/file.ts Text-2 "export const file = 10;export const xyz = 10;"
	/home/src/workspace/projects/project1/file2.ts Text-1 "/// <reference lib=\"webworker\"/>\n/// <reference lib=\"scripthost\"/>\n/// <reference lib=\"es5\"/>\n"
	/home/src/workspace/projects/project1/index.ts SVC-1-0 "export const x = \"type1\";"
	/home/src/workspace/projects/project1/utils.d.ts Text-1 "export const y = 10;"
	/home/src/workspace/projects/project1/typeroot1/sometype/index.d.ts Text-1 "export type TheNum = \"type1\";"


	../../../tslibs/TS/Lib/lib.es5.d.ts
	  Library referenced via 'es5' from file 'file2.ts'
	  Library 'lib.es5.d.ts' specified in compilerOptions
	../../../tslibs/TS/Lib/lib.webworker.d.ts
	  Library referenced via 'webworker' from file 'file2.ts'
	../../../tslibs/TS/Lib/lib.scripthost.d.ts
	  Library referenced via 'scripthost' from file 'file2.ts'
	../node_modules/@typescript/lib-dom/index.d.ts
	  Library 'lib.dom.d.ts' specified in compilerOptions
	file.ts
	  Matched by default include pattern '**/*'
	file2.ts
	  Matched by default include pattern '**/*'
	index.ts
	  Matched by default include pattern '**/*'
	utils.d.ts
	  Matched by default include pattern '**/*'
	typeroot1/sometype/index.d.ts
	  Matched by default include pattern '**/*'
	  Entry point for implicit type library 'sometype'

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Running: *ensureProjectForOpenFiles*
Info seq  [hh:mm:ss:mss] Before ensureProjectForOpenFiles:
Info seq  [hh:mm:ss:mss] Project '/home/src/workspace/projects/project1/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (9)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: /home/src/workspace/projects/project1/index.ts ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /home/src/workspace/projects/project1/tsconfig.json
Info seq  [hh:mm:ss:mss] After ensureProjectForOpenFiles:
Info seq  [hh:mm:ss:mss] Project '/home/src/workspace/projects/project1/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (9)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: /home/src/workspace/projects/project1/index.ts ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /home/src/workspace/projects/project1/tsconfig.json
Info seq  [hh:mm:ss:mss] got projects updated in background /home/src/workspace/projects/project1/index.ts
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "projectsUpdatedInBackground",
      "body": {
        "openFiles": [
          "/home/src/workspace/projects/project1/index.ts"
        ]
      }
    }
After running Timeout callback:: count: 0

Projects::
/home/src/workspace/projects/project1/tsconfig.json (Configured) *changed*
    projectStateVersion: 4
    projectProgramVersion: 3 *changed*
    dirty: false *changed*

delete redirect file dom
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Triggered with /home/src/workspace/projects/node_modules/@typescript/lib-dom/index.d.ts :: WatchInfo: /home/src/workspace/projects/node_modules 1 undefined Project: /home/src/workspace/projects/project1/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Scheduled: /home/src/workspace/projects/project1/tsconfig.jsonFailedLookupInvalidation
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Triggered with /home/src/workspace/projects/node_modules/@typescript/lib-dom/index.d.ts :: WatchInfo: /home/src/workspace/projects/node_modules 1 undefined Project: /home/src/workspace/projects/project1/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Triggered with /home/src/workspace/projects/node_modules/@typescript/lib-dom/index.d.ts :: WatchInfo: /home/src/workspace/projects/node_modules 1 undefined WatchType: node_modules for closed script infos and package.jsons affecting module specifier cache
Info seq  [hh:mm:ss:mss] Scheduled: /home/src/workspace/projects/project1/tsconfig.json
Info seq  [hh:mm:ss:mss] Scheduled: *ensureProjectForOpenFiles*
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Triggered with /home/src/workspace/projects/node_modules/@typescript/lib-dom/index.d.ts :: WatchInfo: /home/src/workspace/projects/node_modules 1 undefined WatchType: node_modules for closed script infos and package.jsons affecting module specifier cache
Before running Timeout callback:: count: 3
11: /home/src/workspace/projects/project1/tsconfig.jsonFailedLookupInvalidation
12: /home/src/workspace/projects/project1/tsconfig.json
13: *ensureProjectForOpenFiles*
//// [/home/src/workspace/projects/node_modules/@typescript/lib-dom/index.d.ts] deleted

Timeout callback:: count: 3
11: /home/src/workspace/projects/project1/tsconfig.jsonFailedLookupInvalidation *new*
12: /home/src/workspace/projects/project1/tsconfig.json *new*
13: *ensureProjectForOpenFiles* *new*

Projects::
/home/src/workspace/projects/project1/tsconfig.json (Configured) *changed*
    projectStateVersion: 5 *changed*
    projectProgramVersion: 3
    dirty: true *changed*

ScriptInfos::
/home/src/tslibs/TS/Lib/lib.dom.d.ts
    version: Text-1
    containingProjects: 0
/home/src/tslibs/TS/Lib/lib.es5.d.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspace/projects/project1/tsconfig.json
/home/src/tslibs/TS/Lib/lib.scripthost.d.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspace/projects/project1/tsconfig.json
/home/src/tslibs/TS/Lib/lib.webworker.d.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspace/projects/project1/tsconfig.json
/home/src/workspace/projects/node_modules/@typescript/lib-dom/index.d.ts *changed*
    version: Text-1
    pendingReloadFromDisk: true *changed*
    deferredDelete: true *changed*
    containingProjects: 0 *changed*
        /home/src/workspace/projects/project1/tsconfig.json *deleted*
/home/src/workspace/projects/project1/core.d.ts
    version: Text-1
    pendingReloadFromDisk: true
    deferredDelete: true
    containingProjects: 0
/home/src/workspace/projects/project1/file.ts
    version: Text-2
    containingProjects: 1
        /home/src/workspace/projects/project1/tsconfig.json
/home/src/workspace/projects/project1/file2.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspace/projects/project1/tsconfig.json
/home/src/workspace/projects/project1/index.ts (Open)
    version: SVC-1-0
    containingProjects: 1
        /home/src/workspace/projects/project1/tsconfig.json *default*
/home/src/workspace/projects/project1/typeroot1/sometype/index.d.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspace/projects/project1/tsconfig.json
/home/src/workspace/projects/project1/utils.d.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspace/projects/project1/tsconfig.json

Info seq  [hh:mm:ss:mss] Running: /home/src/workspace/projects/project1/tsconfig.jsonFailedLookupInvalidation
Info seq  [hh:mm:ss:mss] Running: /home/src/workspace/projects/project1/tsconfig.json
Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: /home/src/workspace/projects/project1/tsconfig.json
Info seq  [hh:mm:ss:mss] File '/home/src/workspace/projects/node_modules/@typescript/lib-dom/package.json' does not exist.
Info seq  [hh:mm:ss:mss] File '/home/src/workspace/projects/node_modules/@typescript/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspace/projects/node_modules/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspace/projects/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspace/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] Reusing resolution of module '@typescript/lib-webworker' from '/home/src/workspace/projects/project1/__lib_node_modules_lookup_lib.webworker.d.ts__.ts' of old program, it was not resolved.
Info seq  [hh:mm:ss:mss] Reusing resolution of module '@typescript/lib-scripthost' from '/home/src/workspace/projects/project1/__lib_node_modules_lookup_lib.scripthost.d.ts__.ts' of old program, it was not resolved.
Info seq  [hh:mm:ss:mss] Reusing resolution of module '@typescript/lib-es5' from '/home/src/workspace/projects/project1/__lib_node_modules_lookup_lib.es5.d.ts__.ts' of old program, it was not resolved.
Info seq  [hh:mm:ss:mss] Reusing resolution of type reference directive 'sometype' from '/home/src/workspace/projects/project1/__inferred type names__.ts' of old program, it was successfully resolved to '/home/src/workspace/projects/project1/typeroot1/sometype/index.d.ts'.
Info seq  [hh:mm:ss:mss] ======== Resolving module '@typescript/lib-dom' from '/home/src/workspace/projects/project1/__lib_node_modules_lookup_lib.dom.d.ts__.ts'. ========
Info seq  [hh:mm:ss:mss] Explicitly specified module resolution kind: 'Node10'.
Info seq  [hh:mm:ss:mss] Loading module '@typescript/lib-dom' from 'node_modules' folder, target file types: TypeScript, Declaration.
Info seq  [hh:mm:ss:mss] Searching all ancestor node_modules directories for preferred extensions: TypeScript, Declaration.
Info seq  [hh:mm:ss:mss] Directory '/home/src/workspace/projects/project1/node_modules' does not exist, skipping all lookups in it.
Info seq  [hh:mm:ss:mss] Scoped package detected, looking in 'typescript__lib-dom'
Info seq  [hh:mm:ss:mss] File '/home/src/workspace/projects/node_modules/@typescript/lib-dom/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspace/projects/node_modules/@typescript/lib-dom.ts' does not exist.
Info seq  [hh:mm:ss:mss] File '/home/src/workspace/projects/node_modules/@typescript/lib-dom.tsx' does not exist.
Info seq  [hh:mm:ss:mss] File '/home/src/workspace/projects/node_modules/@typescript/lib-dom.d.ts' does not exist.
Info seq  [hh:mm:ss:mss] File '/home/src/workspace/projects/node_modules/@typescript/lib-dom/index.ts' does not exist.
Info seq  [hh:mm:ss:mss] File '/home/src/workspace/projects/node_modules/@typescript/lib-dom/index.tsx' does not exist.
Info seq  [hh:mm:ss:mss] File '/home/src/workspace/projects/node_modules/@typescript/lib-dom/index.d.ts' does not exist.
Info seq  [hh:mm:ss:mss] Directory '/home/src/workspace/projects/node_modules/@types' does not exist, skipping all lookups in it.
Info seq  [hh:mm:ss:mss] Scoped package detected, looking in 'typescript__lib-dom'
Info seq  [hh:mm:ss:mss] Directory '/home/src/workspace/node_modules' does not exist, skipping all lookups in it.
Info seq  [hh:mm:ss:mss] Scoped package detected, looking in 'typescript__lib-dom'
Info seq  [hh:mm:ss:mss] Directory '/home/src/node_modules' does not exist, skipping all lookups in it.
Info seq  [hh:mm:ss:mss] Scoped package detected, looking in 'typescript__lib-dom'
Info seq  [hh:mm:ss:mss] Directory '/home/node_modules' does not exist, skipping all lookups in it.
Info seq  [hh:mm:ss:mss] Scoped package detected, looking in 'typescript__lib-dom'
Info seq  [hh:mm:ss:mss] Directory '/node_modules' does not exist, skipping all lookups in it.
Info seq  [hh:mm:ss:mss] Scoped package detected, looking in 'typescript__lib-dom'
Info seq  [hh:mm:ss:mss] Loading module '@typescript/lib-dom' from 'node_modules' folder, target file types: JavaScript.
Info seq  [hh:mm:ss:mss] Searching all ancestor node_modules directories for fallback extensions: JavaScript.
Info seq  [hh:mm:ss:mss] Directory '/home/src/workspace/projects/project1/node_modules' does not exist, skipping all lookups in it.
Info seq  [hh:mm:ss:mss] File '/home/src/workspace/projects/node_modules/@typescript/lib-dom/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspace/projects/node_modules/@typescript/lib-dom.js' does not exist.
Info seq  [hh:mm:ss:mss] File '/home/src/workspace/projects/node_modules/@typescript/lib-dom.jsx' does not exist.
Info seq  [hh:mm:ss:mss] File '/home/src/workspace/projects/node_modules/@typescript/lib-dom/index.js' does not exist.
Info seq  [hh:mm:ss:mss] File '/home/src/workspace/projects/node_modules/@typescript/lib-dom/index.jsx' does not exist.
Info seq  [hh:mm:ss:mss] Directory '/home/src/workspace/node_modules' does not exist, skipping all lookups in it.
Info seq  [hh:mm:ss:mss] Directory '/home/src/node_modules' does not exist, skipping all lookups in it.
Info seq  [hh:mm:ss:mss] Directory '/home/node_modules' does not exist, skipping all lookups in it.
Info seq  [hh:mm:ss:mss] Directory '/node_modules' does not exist, skipping all lookups in it.
Info seq  [hh:mm:ss:mss] ======== Module name '@typescript/lib-dom' was not resolved. ========
Info seq  [hh:mm:ss:mss] FileWatcher:: Close:: WatchInfo: /home/src/workspace/projects/node_modules/@typescript/lib-dom/package.json 2000 undefined Project: /home/src/workspace/projects/project1/tsconfig.json WatchType: File location affecting resolution
Info seq  [hh:mm:ss:mss] FileWatcher:: Close:: WatchInfo: /home/src/workspace/projects/node_modules/@typescript/package.json 2000 undefined Project: /home/src/workspace/projects/project1/tsconfig.json WatchType: File location affecting resolution
Info seq  [hh:mm:ss:mss] FileWatcher:: Close:: WatchInfo: /home/src/workspace/projects/node_modules/package.json 2000 undefined Project: /home/src/workspace/projects/project1/tsconfig.json WatchType: File location affecting resolution
Info seq  [hh:mm:ss:mss] FileWatcher:: Close:: WatchInfo: /home/src/workspace/projects/package.json 2000 undefined Project: /home/src/workspace/projects/project1/tsconfig.json WatchType: File location affecting resolution
Info seq  [hh:mm:ss:mss] FileWatcher:: Close:: WatchInfo: /home/src/workspace/package.json 2000 undefined Project: /home/src/workspace/projects/project1/tsconfig.json WatchType: File location affecting resolution
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: /home/src/workspace/projects/project1/tsconfig.json projectStateVersion: 5 projectProgramVersion: 3 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Project '/home/src/workspace/projects/project1/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (9)
	/home/src/tslibs/TS/Lib/lib.es5.d.ts Text-1 "/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };"
	/home/src/tslibs/TS/Lib/lib.dom.d.ts Text-1 "interface DOMInterface { }"
	/home/src/tslibs/TS/Lib/lib.webworker.d.ts Text-1 "interface WebWorkerInterface { }"
	/home/src/tslibs/TS/Lib/lib.scripthost.d.ts Text-1 "interface ScriptHostInterface { }"
	/home/src/workspace/projects/project1/file.ts Text-2 "export const file = 10;export const xyz = 10;"
	/home/src/workspace/projects/project1/file2.ts Text-1 "/// <reference lib=\"webworker\"/>\n/// <reference lib=\"scripthost\"/>\n/// <reference lib=\"es5\"/>\n"
	/home/src/workspace/projects/project1/index.ts SVC-1-0 "export const x = \"type1\";"
	/home/src/workspace/projects/project1/utils.d.ts Text-1 "export const y = 10;"
	/home/src/workspace/projects/project1/typeroot1/sometype/index.d.ts Text-1 "export type TheNum = \"type1\";"


	../../../tslibs/TS/Lib/lib.es5.d.ts
	  Library referenced via 'es5' from file 'file2.ts'
	  Library 'lib.es5.d.ts' specified in compilerOptions
	../../../tslibs/TS/Lib/lib.dom.d.ts
	  Library 'lib.dom.d.ts' specified in compilerOptions
	../../../tslibs/TS/Lib/lib.webworker.d.ts
	  Library referenced via 'webworker' from file 'file2.ts'
	../../../tslibs/TS/Lib/lib.scripthost.d.ts
	  Library referenced via 'scripthost' from file 'file2.ts'
	file.ts
	  Matched by default include pattern '**/*'
	file2.ts
	  Matched by default include pattern '**/*'
	index.ts
	  Matched by default include pattern '**/*'
	utils.d.ts
	  Matched by default include pattern '**/*'
	typeroot1/sometype/index.d.ts
	  Matched by default include pattern '**/*'
	  Entry point for implicit type library 'sometype'

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Running: *ensureProjectForOpenFiles*
Info seq  [hh:mm:ss:mss] Before ensureProjectForOpenFiles:
Info seq  [hh:mm:ss:mss] Project '/home/src/workspace/projects/project1/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (9)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: /home/src/workspace/projects/project1/index.ts ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /home/src/workspace/projects/project1/tsconfig.json
Info seq  [hh:mm:ss:mss] After ensureProjectForOpenFiles:
Info seq  [hh:mm:ss:mss] Project '/home/src/workspace/projects/project1/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (9)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: /home/src/workspace/projects/project1/index.ts ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /home/src/workspace/projects/project1/tsconfig.json
Info seq  [hh:mm:ss:mss] got projects updated in background /home/src/workspace/projects/project1/index.ts
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "projectsUpdatedInBackground",
      "body": {
        "openFiles": [
          "/home/src/workspace/projects/project1/index.ts"
        ]
      }
    }
After running Timeout callback:: count: 0

PolledWatches::
/home/src/workspace/node_modules:
  {"pollingInterval":500}
/home/src/workspace/projects/project1/node_modules:
  {"pollingInterval":500}

PolledWatches *deleted*::
/home/src/workspace/package.json:
  {"pollingInterval":2000}
/home/src/workspace/projects/node_modules/@typescript/lib-dom/package.json:
  {"pollingInterval":2000}
/home/src/workspace/projects/node_modules/@typescript/package.json:
  {"pollingInterval":2000}
/home/src/workspace/projects/node_modules/package.json:
  {"pollingInterval":2000}
/home/src/workspace/projects/package.json:
  {"pollingInterval":2000}

FsWatches::
/home/src/tslibs/TS/Lib/lib.dom.d.ts:
  {}
/home/src/tslibs/TS/Lib/lib.es5.d.ts:
  {}
/home/src/tslibs/TS/Lib/lib.scripthost.d.ts:
  {}
/home/src/tslibs/TS/Lib/lib.webworker.d.ts:
  {}
/home/src/workspace/projects/project1/core.d.ts:
  {}
/home/src/workspace/projects/project1/file.ts:
  {}
/home/src/workspace/projects/project1/file2.ts:
  {}
/home/src/workspace/projects/project1/tsconfig.json:
  {}
/home/src/workspace/projects/project1/typeroot1/sometype/index.d.ts:
  {}
/home/src/workspace/projects/project1/utils.d.ts:
  {}

FsWatchesRecursive::
/home/src/workspace/projects/node_modules:
  {}
/home/src/workspace/projects/project1:
  {}
/home/src/workspace/projects/project1/typeroot1:
  {}

Projects::
/home/src/workspace/projects/project1/tsconfig.json (Configured) *changed*
    projectStateVersion: 5
    projectProgramVersion: 4 *changed*
    dirty: false *changed*

ScriptInfos::
/home/src/tslibs/TS/Lib/lib.dom.d.ts *changed*
    version: Text-1
    containingProjects: 1 *changed*
        /home/src/workspace/projects/project1/tsconfig.json *new*
/home/src/tslibs/TS/Lib/lib.es5.d.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspace/projects/project1/tsconfig.json
/home/src/tslibs/TS/Lib/lib.scripthost.d.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspace/projects/project1/tsconfig.json
/home/src/tslibs/TS/Lib/lib.webworker.d.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspace/projects/project1/tsconfig.json
/home/src/workspace/projects/node_modules/@typescript/lib-dom/index.d.ts
    version: Text-1
    pendingReloadFromDisk: true
    deferredDelete: true
    containingProjects: 0
/home/src/workspace/projects/project1/core.d.ts
    version: Text-1
    pendingReloadFromDisk: true
    deferredDelete: true
    containingProjects: 0
/home/src/workspace/projects/project1/file.ts
    version: Text-2
    containingProjects: 1
        /home/src/workspace/projects/project1/tsconfig.json
/home/src/workspace/projects/project1/file2.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspace/projects/project1/tsconfig.json
/home/src/workspace/projects/project1/index.ts (Open)
    version: SVC-1-0
    containingProjects: 1
        /home/src/workspace/projects/project1/tsconfig.json *default*
/home/src/workspace/projects/project1/typeroot1/sometype/index.d.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspace/projects/project1/tsconfig.json
/home/src/workspace/projects/project1/utils.d.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspace/projects/project1/tsconfig.json

change program options to update module resolution
Info seq  [hh:mm:ss:mss] FileWatcher:: Triggered with /home/src/workspace/projects/project1/tsconfig.json 1:: WatchInfo: /home/src/workspace/projects/project1/tsconfig.json 2000 undefined Project: /home/src/workspace/projects/project1/tsconfig.json WatchType: Config file
Info seq  [hh:mm:ss:mss] Scheduled: /home/src/workspace/projects/project1/tsconfig.json
Info seq  [hh:mm:ss:mss] getConfigFileNameForFile:: File: /home/src/workspace/projects/project1/index.ts ProjectRootPath: undefined:: Result: /home/src/workspace/projects/project1/tsconfig.json
Info seq  [hh:mm:ss:mss] Scheduled: *ensureProjectForOpenFiles*
Info seq  [hh:mm:ss:mss] Elapsed:: *ms FileWatcher:: Triggered with /home/src/workspace/projects/project1/tsconfig.json 1:: WatchInfo: /home/src/workspace/projects/project1/tsconfig.json 2000 undefined Project: /home/src/workspace/projects/project1/tsconfig.json WatchType: Config file
Before running Timeout callback:: count: 2
14: /home/src/workspace/projects/project1/tsconfig.json
15: *ensureProjectForOpenFiles*
//// [/home/src/workspace/projects/project1/tsconfig.json]
{
  "compilerOptions": {
    "composite": true,
    "typeRoots": [
      "./typeroot1",
      "./typeroot2"
    ],
    "lib": [
      "es5",
      "dom"
    ],
    "traceResolution": true,
    "libReplacement": true
  }
}


Timeout callback:: count: 2
14: /home/src/workspace/projects/project1/tsconfig.json *new*
15: *ensureProjectForOpenFiles* *new*

Projects::
/home/src/workspace/projects/project1/tsconfig.json (Configured) *changed*
    projectStateVersion: 6 *changed*
    projectProgramVersion: 4
    dirty: true *changed*

Info seq  [hh:mm:ss:mss] Running: /home/src/workspace/projects/project1/tsconfig.json
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "projectLoadingStart",
      "body": {
        "projectName": "/home/src/workspace/projects/project1/tsconfig.json",
        "reason": "Change in config file detected"
      }
    }
Info seq  [hh:mm:ss:mss] Config: /home/src/workspace/projects/project1/tsconfig.json : {
 "rootNames": [
  "/home/src/workspace/projects/project1/file.ts",
  "/home/src/workspace/projects/project1/file2.ts",
  "/home/src/workspace/projects/project1/index.ts",
  "/home/src/workspace/projects/project1/utils.d.ts",
  "/home/src/workspace/projects/project1/typeroot1/sometype/index.d.ts"
 ],
 "options": {
  "composite": true,
  "typeRoots": [
   "/home/src/workspace/projects/project1/typeroot1",
   "/home/src/workspace/projects/project1/typeroot2"
  ],
  "lib": [
   "lib.es5.d.ts",
   "lib.dom.d.ts"
  ],
  "traceResolution": true,
  "libReplacement": true,
  "configFilePath": "/home/src/workspace/projects/project1/tsconfig.json"
 }
}
Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: /home/src/workspace/projects/project1/tsconfig.json
Info seq  [hh:mm:ss:mss] Reusing resolution of module '@typescript/lib-webworker' from '/home/src/workspace/projects/project1/__lib_node_modules_lookup_lib.webworker.d.ts__.ts' of old program, it was not resolved.
Info seq  [hh:mm:ss:mss] Reusing resolution of module '@typescript/lib-scripthost' from '/home/src/workspace/projects/project1/__lib_node_modules_lookup_lib.scripthost.d.ts__.ts' of old program, it was not resolved.
Info seq  [hh:mm:ss:mss] Reusing resolution of module '@typescript/lib-es5' from '/home/src/workspace/projects/project1/__lib_node_modules_lookup_lib.es5.d.ts__.ts' of old program, it was not resolved.
Info seq  [hh:mm:ss:mss] ======== Resolving type reference directive 'sometype', containing file '/home/src/workspace/projects/project1/__inferred type names__.ts', root directory '/home/src/workspace/projects/project1/typeroot1,/home/src/workspace/projects/project1/typeroot2'. ========
Info seq  [hh:mm:ss:mss] Resolving with primary search path '/home/src/workspace/projects/project1/typeroot1, /home/src/workspace/projects/project1/typeroot2'.
Info seq  [hh:mm:ss:mss] File '/home/src/workspace/projects/project1/typeroot1/sometype.d.ts' does not exist.
Info seq  [hh:mm:ss:mss] File '/home/src/workspace/projects/project1/typeroot1/sometype/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspace/projects/project1/typeroot1/sometype/index.d.ts' exists - use it as a name resolution result.
Info seq  [hh:mm:ss:mss] Resolving real path for '/home/src/workspace/projects/project1/typeroot1/sometype/index.d.ts', result '/home/src/workspace/projects/project1/typeroot1/sometype/index.d.ts'.
Info seq  [hh:mm:ss:mss] ======== Type reference directive 'sometype' was successfully resolved to '/home/src/workspace/projects/project1/typeroot1/sometype/index.d.ts', primary: true. ========
Info seq  [hh:mm:ss:mss] Reusing resolution of module '@typescript/lib-dom' from '/home/src/workspace/projects/project1/__lib_node_modules_lookup_lib.dom.d.ts__.ts' of old program, it was not resolved.
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /home/src/workspace/projects/project1/typeroot2 1 undefined Project: /home/src/workspace/projects/project1/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /home/src/workspace/projects/project1/typeroot2 1 undefined Project: /home/src/workspace/projects/project1/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: /home/src/workspace/projects/project1/tsconfig.json projectStateVersion: 6 projectProgramVersion: 4 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Project '/home/src/workspace/projects/project1/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (9)
	/home/src/tslibs/TS/Lib/lib.es5.d.ts Text-1 "/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };"
	/home/src/tslibs/TS/Lib/lib.dom.d.ts Text-1 "interface DOMInterface { }"
	/home/src/tslibs/TS/Lib/lib.webworker.d.ts Text-1 "interface WebWorkerInterface { }"
	/home/src/tslibs/TS/Lib/lib.scripthost.d.ts Text-1 "interface ScriptHostInterface { }"
	/home/src/workspace/projects/project1/file.ts Text-2 "export const file = 10;export const xyz = 10;"
	/home/src/workspace/projects/project1/file2.ts Text-1 "/// <reference lib=\"webworker\"/>\n/// <reference lib=\"scripthost\"/>\n/// <reference lib=\"es5\"/>\n"
	/home/src/workspace/projects/project1/index.ts SVC-1-0 "export const x = \"type1\";"
	/home/src/workspace/projects/project1/utils.d.ts Text-1 "export const y = 10;"
	/home/src/workspace/projects/project1/typeroot1/sometype/index.d.ts Text-1 "export type TheNum = \"type1\";"

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "projectLoadingFinish",
      "body": {
        "projectName": "/home/src/workspace/projects/project1/tsconfig.json"
      }
    }
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "configFileDiag",
      "body": {
        "triggerFile": "/home/src/workspace/projects/project1/tsconfig.json",
        "configFile": "/home/src/workspace/projects/project1/tsconfig.json",
        "diagnostics": []
      }
    }
Info seq  [hh:mm:ss:mss] Running: *ensureProjectForOpenFiles*
Info seq  [hh:mm:ss:mss] Before ensureProjectForOpenFiles:
Info seq  [hh:mm:ss:mss] Project '/home/src/workspace/projects/project1/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (9)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: /home/src/workspace/projects/project1/index.ts ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /home/src/workspace/projects/project1/tsconfig.json
Info seq  [hh:mm:ss:mss] getConfigFileNameForFile:: File: /home/src/workspace/projects/project1/tsconfig.json ProjectRootPath: undefined:: Result: undefined
Info seq  [hh:mm:ss:mss] After ensureProjectForOpenFiles:
Info seq  [hh:mm:ss:mss] Project '/home/src/workspace/projects/project1/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (9)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: /home/src/workspace/projects/project1/index.ts ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /home/src/workspace/projects/project1/tsconfig.json
Info seq  [hh:mm:ss:mss] got projects updated in background /home/src/workspace/projects/project1/index.ts
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "projectsUpdatedInBackground",
      "body": {
        "openFiles": [
          "/home/src/workspace/projects/project1/index.ts"
        ]
      }
    }
After running Timeout callback:: count: 0

PolledWatches::
/home/src/workspace/node_modules:
  {"pollingInterval":500}
/home/src/workspace/projects/project1/node_modules:
  {"pollingInterval":500}
/home/src/workspace/projects/project1/typeroot2: *new*
  {"pollingInterval":500}

FsWatches::
/home/src/tslibs/TS/Lib/lib.dom.d.ts:
  {}
/home/src/tslibs/TS/Lib/lib.es5.d.ts:
  {}
/home/src/tslibs/TS/Lib/lib.scripthost.d.ts:
  {}
/home/src/tslibs/TS/Lib/lib.webworker.d.ts:
  {}
/home/src/workspace/projects/project1/core.d.ts:
  {}
/home/src/workspace/projects/project1/file.ts:
  {}
/home/src/workspace/projects/project1/file2.ts:
  {}
/home/src/workspace/projects/project1/tsconfig.json:
  {}
/home/src/workspace/projects/project1/typeroot1/sometype/index.d.ts:
  {}
/home/src/workspace/projects/project1/utils.d.ts:
  {}

FsWatchesRecursive::
/home/src/workspace/projects/node_modules:
  {}
/home/src/workspace/projects/project1:
  {}
/home/src/workspace/projects/project1/typeroot1:
  {}

Projects::
/home/src/workspace/projects/project1/tsconfig.json (Configured) *changed*
    projectStateVersion: 6
    projectProgramVersion: 5 *changed*
    dirty: false *changed*

Before running Timeout callback:: count: 0

After running Timeout callback:: count: 0

change program options to update module resolution and also update lib file
Info seq  [hh:mm:ss:mss] FileWatcher:: Triggered with /home/src/workspace/projects/project1/tsconfig.json 1:: WatchInfo: /home/src/workspace/projects/project1/tsconfig.json 2000 undefined Project: /home/src/workspace/projects/project1/tsconfig.json WatchType: Config file
Info seq  [hh:mm:ss:mss] Scheduled: /home/src/workspace/projects/project1/tsconfig.json
Info seq  [hh:mm:ss:mss] getConfigFileNameForFile:: File: /home/src/workspace/projects/project1/index.ts ProjectRootPath: undefined:: Result: /home/src/workspace/projects/project1/tsconfig.json
Info seq  [hh:mm:ss:mss] Scheduled: *ensureProjectForOpenFiles*
Info seq  [hh:mm:ss:mss] Elapsed:: *ms FileWatcher:: Triggered with /home/src/workspace/projects/project1/tsconfig.json 1:: WatchInfo: /home/src/workspace/projects/project1/tsconfig.json 2000 undefined Project: /home/src/workspace/projects/project1/tsconfig.json WatchType: Config file
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Triggered with /home/src/workspace/projects/node_modules/@typescript/lib-dom/index.d.ts :: WatchInfo: /home/src/workspace/projects/node_modules 1 undefined Project: /home/src/workspace/projects/project1/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Scheduled: /home/src/workspace/projects/project1/tsconfig.jsonFailedLookupInvalidation
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Triggered with /home/src/workspace/projects/node_modules/@typescript/lib-dom/index.d.ts :: WatchInfo: /home/src/workspace/projects/node_modules 1 undefined Project: /home/src/workspace/projects/project1/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Triggered with /home/src/workspace/projects/node_modules/@typescript/lib-dom/index.d.ts :: WatchInfo: /home/src/workspace/projects/node_modules 1 undefined WatchType: node_modules for closed script infos and package.jsons affecting module specifier cache
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Triggered with /home/src/workspace/projects/node_modules/@typescript/lib-dom/index.d.ts :: WatchInfo: /home/src/workspace/projects/node_modules 1 undefined WatchType: node_modules for closed script infos and package.jsons affecting module specifier cache
Before running Timeout callback:: count: 3
16: /home/src/workspace/projects/project1/tsconfig.json
17: *ensureProjectForOpenFiles*
18: /home/src/workspace/projects/project1/tsconfig.jsonFailedLookupInvalidation
//// [/home/src/workspace/projects/project1/tsconfig.json]
{
  "compilerOptions": {
    "composite": true,
    "typeRoots": [
      "./typeroot1"
    ],
    "lib": [
      "es5",
      "dom"
    ],
    "traceResolution": true,
    "libReplacement": true
  }
}

//// [/home/src/workspace/projects/node_modules/@typescript/lib-dom/index.d.ts]
interface DOMInterface { }


Timeout callback:: count: 3
16: /home/src/workspace/projects/project1/tsconfig.json *new*
17: *ensureProjectForOpenFiles* *new*
18: /home/src/workspace/projects/project1/tsconfig.jsonFailedLookupInvalidation *new*

Projects::
/home/src/workspace/projects/project1/tsconfig.json (Configured) *changed*
    projectStateVersion: 7 *changed*
    projectProgramVersion: 5
    dirty: true *changed*

ScriptInfos::
/home/src/tslibs/TS/Lib/lib.dom.d.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspace/projects/project1/tsconfig.json
/home/src/tslibs/TS/Lib/lib.es5.d.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspace/projects/project1/tsconfig.json
/home/src/tslibs/TS/Lib/lib.scripthost.d.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspace/projects/project1/tsconfig.json
/home/src/tslibs/TS/Lib/lib.webworker.d.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspace/projects/project1/tsconfig.json
/home/src/workspace/projects/node_modules/@typescript/lib-dom/index.d.ts *changed*
    version: Text-1
    pendingReloadFromDisk: true
    deferredDelete: undefined *changed*
    containingProjects: 0
/home/src/workspace/projects/project1/core.d.ts
    version: Text-1
    pendingReloadFromDisk: true
    deferredDelete: true
    containingProjects: 0
/home/src/workspace/projects/project1/file.ts
    version: Text-2
    containingProjects: 1
        /home/src/workspace/projects/project1/tsconfig.json
/home/src/workspace/projects/project1/file2.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspace/projects/project1/tsconfig.json
/home/src/workspace/projects/project1/index.ts (Open)
    version: SVC-1-0
    containingProjects: 1
        /home/src/workspace/projects/project1/tsconfig.json *default*
/home/src/workspace/projects/project1/typeroot1/sometype/index.d.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspace/projects/project1/tsconfig.json
/home/src/workspace/projects/project1/utils.d.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspace/projects/project1/tsconfig.json

Info seq  [hh:mm:ss:mss] Running: /home/src/workspace/projects/project1/tsconfig.json
Info seq  [hh:mm:ss:mss] Scheduled: *ensureProjectForOpenFiles*, Cancelled earlier one
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "projectLoadingStart",
      "body": {
        "projectName": "/home/src/workspace/projects/project1/tsconfig.json",
        "reason": "Change in config file detected"
      }
    }
Info seq  [hh:mm:ss:mss] Config: /home/src/workspace/projects/project1/tsconfig.json : {
 "rootNames": [
  "/home/src/workspace/projects/project1/file.ts",
  "/home/src/workspace/projects/project1/file2.ts",
  "/home/src/workspace/projects/project1/index.ts",
  "/home/src/workspace/projects/project1/utils.d.ts",
  "/home/src/workspace/projects/project1/typeroot1/sometype/index.d.ts"
 ],
 "options": {
  "composite": true,
  "typeRoots": [
   "/home/src/workspace/projects/project1/typeroot1"
  ],
  "lib": [
   "lib.es5.d.ts",
   "lib.dom.d.ts"
  ],
  "traceResolution": true,
  "libReplacement": true,
  "configFilePath": "/home/src/workspace/projects/project1/tsconfig.json"
 }
}
Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: /home/src/workspace/projects/project1/tsconfig.json
Info seq  [hh:mm:ss:mss] Reusing resolution of module '@typescript/lib-webworker' from '/home/src/workspace/projects/project1/__lib_node_modules_lookup_lib.webworker.d.ts__.ts' of old program, it was not resolved.
Info seq  [hh:mm:ss:mss] Reusing resolution of module '@typescript/lib-scripthost' from '/home/src/workspace/projects/project1/__lib_node_modules_lookup_lib.scripthost.d.ts__.ts' of old program, it was not resolved.
Info seq  [hh:mm:ss:mss] Reusing resolution of module '@typescript/lib-es5' from '/home/src/workspace/projects/project1/__lib_node_modules_lookup_lib.es5.d.ts__.ts' of old program, it was not resolved.
Info seq  [hh:mm:ss:mss] ======== Resolving type reference directive 'sometype', containing file '/home/src/workspace/projects/project1/__inferred type names__.ts', root directory '/home/src/workspace/projects/project1/typeroot1'. ========
Info seq  [hh:mm:ss:mss] Resolving with primary search path '/home/src/workspace/projects/project1/typeroot1'.
Info seq  [hh:mm:ss:mss] File '/home/src/workspace/projects/project1/typeroot1/sometype.d.ts' does not exist.
Info seq  [hh:mm:ss:mss] File '/home/src/workspace/projects/project1/typeroot1/sometype/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspace/projects/project1/typeroot1/sometype/index.d.ts' exists - use it as a name resolution result.
Info seq  [hh:mm:ss:mss] Resolving real path for '/home/src/workspace/projects/project1/typeroot1/sometype/index.d.ts', result '/home/src/workspace/projects/project1/typeroot1/sometype/index.d.ts'.
Info seq  [hh:mm:ss:mss] ======== Type reference directive 'sometype' was successfully resolved to '/home/src/workspace/projects/project1/typeroot1/sometype/index.d.ts', primary: true. ========
Info seq  [hh:mm:ss:mss] ======== Resolving module '@typescript/lib-dom' from '/home/src/workspace/projects/project1/__lib_node_modules_lookup_lib.dom.d.ts__.ts'. ========
Info seq  [hh:mm:ss:mss] Explicitly specified module resolution kind: 'Node10'.
Info seq  [hh:mm:ss:mss] Loading module '@typescript/lib-dom' from 'node_modules' folder, target file types: TypeScript, Declaration.
Info seq  [hh:mm:ss:mss] Searching all ancestor node_modules directories for preferred extensions: TypeScript, Declaration.
Info seq  [hh:mm:ss:mss] Directory '/home/src/workspace/projects/project1/node_modules' does not exist, skipping all lookups in it.
Info seq  [hh:mm:ss:mss] Scoped package detected, looking in 'typescript__lib-dom'
Info seq  [hh:mm:ss:mss] File '/home/src/workspace/projects/node_modules/@typescript/lib-dom/package.json' does not exist.
Info seq  [hh:mm:ss:mss] File '/home/src/workspace/projects/node_modules/@typescript/lib-dom.ts' does not exist.
Info seq  [hh:mm:ss:mss] File '/home/src/workspace/projects/node_modules/@typescript/lib-dom.tsx' does not exist.
Info seq  [hh:mm:ss:mss] File '/home/src/workspace/projects/node_modules/@typescript/lib-dom.d.ts' does not exist.
Info seq  [hh:mm:ss:mss] File '/home/src/workspace/projects/node_modules/@typescript/lib-dom/index.ts' does not exist.
Info seq  [hh:mm:ss:mss] File '/home/src/workspace/projects/node_modules/@typescript/lib-dom/index.tsx' does not exist.
Info seq  [hh:mm:ss:mss] File '/home/src/workspace/projects/node_modules/@typescript/lib-dom/index.d.ts' exists - use it as a name resolution result.
Info seq  [hh:mm:ss:mss] Resolving real path for '/home/src/workspace/projects/node_modules/@typescript/lib-dom/index.d.ts', result '/home/src/workspace/projects/node_modules/@typescript/lib-dom/index.d.ts'.
Info seq  [hh:mm:ss:mss] ======== Module name '@typescript/lib-dom' was successfully resolved to '/home/src/workspace/projects/node_modules/@typescript/lib-dom/index.d.ts'. ========
Info seq  [hh:mm:ss:mss] File '/home/src/workspace/projects/node_modules/@typescript/lib-dom/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspace/projects/node_modules/@typescript/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspace/projects/node_modules/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspace/projects/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspace/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/workspace/projects/node_modules/@typescript/lib-dom/package.json 2000 undefined Project: /home/src/workspace/projects/project1/tsconfig.json WatchType: File location affecting resolution
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/workspace/projects/node_modules/@typescript/package.json 2000 undefined Project: /home/src/workspace/projects/project1/tsconfig.json WatchType: File location affecting resolution
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/workspace/projects/node_modules/package.json 2000 undefined Project: /home/src/workspace/projects/project1/tsconfig.json WatchType: File location affecting resolution
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/workspace/projects/package.json 2000 undefined Project: /home/src/workspace/projects/project1/tsconfig.json WatchType: File location affecting resolution
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/workspace/package.json 2000 undefined Project: /home/src/workspace/projects/project1/tsconfig.json WatchType: File location affecting resolution
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Close:: WatchInfo: /home/src/workspace/projects/project1/typeroot2 1 undefined Project: /home/src/workspace/projects/project1/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Close:: WatchInfo: /home/src/workspace/projects/project1/typeroot2 1 undefined Project: /home/src/workspace/projects/project1/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: /home/src/workspace/projects/project1/tsconfig.json projectStateVersion: 7 projectProgramVersion: 5 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Project '/home/src/workspace/projects/project1/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (9)
	/home/src/tslibs/TS/Lib/lib.es5.d.ts Text-1 "/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };"
	/home/src/tslibs/TS/Lib/lib.webworker.d.ts Text-1 "interface WebWorkerInterface { }"
	/home/src/tslibs/TS/Lib/lib.scripthost.d.ts Text-1 "interface ScriptHostInterface { }"
	/home/src/workspace/projects/node_modules/@typescript/lib-dom/index.d.ts Text-1 "interface DOMInterface { }"
	/home/src/workspace/projects/project1/file.ts Text-2 "export const file = 10;export const xyz = 10;"
	/home/src/workspace/projects/project1/file2.ts Text-1 "/// <reference lib=\"webworker\"/>\n/// <reference lib=\"scripthost\"/>\n/// <reference lib=\"es5\"/>\n"
	/home/src/workspace/projects/project1/index.ts SVC-1-0 "export const x = \"type1\";"
	/home/src/workspace/projects/project1/utils.d.ts Text-1 "export const y = 10;"
	/home/src/workspace/projects/project1/typeroot1/sometype/index.d.ts Text-1 "export type TheNum = \"type1\";"


	../../../tslibs/TS/Lib/lib.es5.d.ts
	  Library referenced via 'es5' from file 'file2.ts'
	  Library 'lib.es5.d.ts' specified in compilerOptions
	../../../tslibs/TS/Lib/lib.webworker.d.ts
	  Library referenced via 'webworker' from file 'file2.ts'
	../../../tslibs/TS/Lib/lib.scripthost.d.ts
	  Library referenced via 'scripthost' from file 'file2.ts'
	../node_modules/@typescript/lib-dom/index.d.ts
	  Library 'lib.dom.d.ts' specified in compilerOptions
	file.ts
	  Matched by default include pattern '**/*'
	file2.ts
	  Matched by default include pattern '**/*'
	index.ts
	  Matched by default include pattern '**/*'
	utils.d.ts
	  Matched by default include pattern '**/*'
	typeroot1/sometype/index.d.ts
	  Matched by default include pattern '**/*'
	  Entry point for implicit type library 'sometype'

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "projectLoadingFinish",
      "body": {
        "projectName": "/home/src/workspace/projects/project1/tsconfig.json"
      }
    }
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "configFileDiag",
      "body": {
        "triggerFile": "/home/src/workspace/projects/project1/tsconfig.json",
        "configFile": "/home/src/workspace/projects/project1/tsconfig.json",
        "diagnostics": []
      }
    }
After running Timeout callback:: count: 1

PolledWatches::
/home/src/workspace/node_modules:
  {"pollingInterval":500}
/home/src/workspace/package.json: *new*
  {"pollingInterval":2000}
/home/src/workspace/projects/node_modules/@typescript/lib-dom/package.json: *new*
  {"pollingInterval":2000}
/home/src/workspace/projects/node_modules/@typescript/package.json: *new*
  {"pollingInterval":2000}
/home/src/workspace/projects/node_modules/package.json: *new*
  {"pollingInterval":2000}
/home/src/workspace/projects/package.json: *new*
  {"pollingInterval":2000}
/home/src/workspace/projects/project1/node_modules:
  {"pollingInterval":500}

PolledWatches *deleted*::
/home/src/workspace/projects/project1/typeroot2:
  {"pollingInterval":500}

FsWatches::
/home/src/tslibs/TS/Lib/lib.dom.d.ts:
  {}
/home/src/tslibs/TS/Lib/lib.es5.d.ts:
  {}
/home/src/tslibs/TS/Lib/lib.scripthost.d.ts:
  {}
/home/src/tslibs/TS/Lib/lib.webworker.d.ts:
  {}
/home/src/workspace/projects/project1/core.d.ts:
  {}
/home/src/workspace/projects/project1/file.ts:
  {}
/home/src/workspace/projects/project1/file2.ts:
  {}
/home/src/workspace/projects/project1/tsconfig.json:
  {}
/home/src/workspace/projects/project1/typeroot1/sometype/index.d.ts:
  {}
/home/src/workspace/projects/project1/utils.d.ts:
  {}

FsWatchesRecursive::
/home/src/workspace/projects/node_modules:
  {}
/home/src/workspace/projects/project1:
  {}
/home/src/workspace/projects/project1/typeroot1:
  {}

Timeout callback:: count: 1
17: *ensureProjectForOpenFiles* *deleted*
18: /home/src/workspace/projects/project1/tsconfig.jsonFailedLookupInvalidation *deleted*
19: *ensureProjectForOpenFiles* *new*

Projects::
/home/src/workspace/projects/project1/tsconfig.json (Configured) *changed*
    projectStateVersion: 7
    projectProgramVersion: 6 *changed*
    dirty: false *changed*

ScriptInfos::
/home/src/tslibs/TS/Lib/lib.dom.d.ts *changed*
    version: Text-1
    containingProjects: 0 *changed*
        /home/src/workspace/projects/project1/tsconfig.json *deleted*
/home/src/tslibs/TS/Lib/lib.es5.d.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspace/projects/project1/tsconfig.json
/home/src/tslibs/TS/Lib/lib.scripthost.d.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspace/projects/project1/tsconfig.json
/home/src/tslibs/TS/Lib/lib.webworker.d.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspace/projects/project1/tsconfig.json
/home/src/workspace/projects/node_modules/@typescript/lib-dom/index.d.ts *changed*
    version: Text-1
    pendingReloadFromDisk: false *changed*
    containingProjects: 1 *changed*
        /home/src/workspace/projects/project1/tsconfig.json *new*
/home/src/workspace/projects/project1/core.d.ts
    version: Text-1
    pendingReloadFromDisk: true
    deferredDelete: true
    containingProjects: 0
/home/src/workspace/projects/project1/file.ts
    version: Text-2
    containingProjects: 1
        /home/src/workspace/projects/project1/tsconfig.json
/home/src/workspace/projects/project1/file2.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspace/projects/project1/tsconfig.json
/home/src/workspace/projects/project1/index.ts (Open)
    version: SVC-1-0
    containingProjects: 1
        /home/src/workspace/projects/project1/tsconfig.json *default*
/home/src/workspace/projects/project1/typeroot1/sometype/index.d.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspace/projects/project1/tsconfig.json
/home/src/workspace/projects/project1/utils.d.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspace/projects/project1/tsconfig.json

Before running Timeout callback:: count: 1
19: *ensureProjectForOpenFiles*

Info seq  [hh:mm:ss:mss] Running: *ensureProjectForOpenFiles*
Info seq  [hh:mm:ss:mss] Before ensureProjectForOpenFiles:
Info seq  [hh:mm:ss:mss] Project '/home/src/workspace/projects/project1/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (9)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: /home/src/workspace/projects/project1/index.ts ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /home/src/workspace/projects/project1/tsconfig.json
Info seq  [hh:mm:ss:mss] getConfigFileNameForFile:: File: /home/src/workspace/projects/project1/tsconfig.json ProjectRootPath: undefined:: Result: undefined
Info seq  [hh:mm:ss:mss] After ensureProjectForOpenFiles:
Info seq  [hh:mm:ss:mss] Project '/home/src/workspace/projects/project1/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (9)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: /home/src/workspace/projects/project1/index.ts ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /home/src/workspace/projects/project1/tsconfig.json
Info seq  [hh:mm:ss:mss] got projects updated in background /home/src/workspace/projects/project1/index.ts
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "projectsUpdatedInBackground",
      "body": {
        "openFiles": [
          "/home/src/workspace/projects/project1/index.ts"
        ]
      }
    }
After running Timeout callback:: count: 0

write redirect file webworker
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Triggered with /home/src/workspace/projects/node_modules/@typescript/lib-webworker :: WatchInfo: /home/src/workspace/projects/node_modules 1 undefined Project: /home/src/workspace/projects/project1/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Scheduled: /home/src/workspace/projects/project1/tsconfig.jsonFailedLookupInvalidation
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Triggered with /home/src/workspace/projects/node_modules/@typescript/lib-webworker :: WatchInfo: /home/src/workspace/projects/node_modules 1 undefined Project: /home/src/workspace/projects/project1/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Triggered with /home/src/workspace/projects/node_modules/@typescript/lib-webworker :: WatchInfo: /home/src/workspace/projects/node_modules 1 undefined WatchType: node_modules for closed script infos and package.jsons affecting module specifier cache
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Triggered with /home/src/workspace/projects/node_modules/@typescript/lib-webworker :: WatchInfo: /home/src/workspace/projects/node_modules 1 undefined WatchType: node_modules for closed script infos and package.jsons affecting module specifier cache
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Triggered with /home/src/workspace/projects/node_modules/@typescript/lib-webworker/index.d.ts :: WatchInfo: /home/src/workspace/projects/node_modules 1 undefined Project: /home/src/workspace/projects/project1/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Scheduled: /home/src/workspace/projects/project1/tsconfig.jsonFailedLookupInvalidation, Cancelled earlier one
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Triggered with /home/src/workspace/projects/node_modules/@typescript/lib-webworker/index.d.ts :: WatchInfo: /home/src/workspace/projects/node_modules 1 undefined Project: /home/src/workspace/projects/project1/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Triggered with /home/src/workspace/projects/node_modules/@typescript/lib-webworker/index.d.ts :: WatchInfo: /home/src/workspace/projects/node_modules 1 undefined WatchType: node_modules for closed script infos and package.jsons affecting module specifier cache
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Triggered with /home/src/workspace/projects/node_modules/@typescript/lib-webworker/index.d.ts :: WatchInfo: /home/src/workspace/projects/node_modules 1 undefined WatchType: node_modules for closed script infos and package.jsons affecting module specifier cache
Before running Timeout callback:: count: 1
21: /home/src/workspace/projects/project1/tsconfig.jsonFailedLookupInvalidation
//// [/home/src/workspace/projects/node_modules/@typescript/lib-webworker/index.d.ts]
interface WebWorkerInterface { }


Timeout callback:: count: 1
21: /home/src/workspace/projects/project1/tsconfig.jsonFailedLookupInvalidation *new*

Info seq  [hh:mm:ss:mss] Running: /home/src/workspace/projects/project1/tsconfig.jsonFailedLookupInvalidation
Info seq  [hh:mm:ss:mss] Scheduled: /home/src/workspace/projects/project1/tsconfig.json
Info seq  [hh:mm:ss:mss] Scheduled: *ensureProjectForOpenFiles*
After running Timeout callback:: count: 2

Timeout callback:: count: 2
22: /home/src/workspace/projects/project1/tsconfig.json *new*
23: *ensureProjectForOpenFiles* *new*

Projects::
/home/src/workspace/projects/project1/tsconfig.json (Configured) *changed*
    projectStateVersion: 8 *changed*
    projectProgramVersion: 6
    dirty: true *changed*

Before running Timeout callback:: count: 2
22: /home/src/workspace/projects/project1/tsconfig.json
23: *ensureProjectForOpenFiles*

Info seq  [hh:mm:ss:mss] Running: /home/src/workspace/projects/project1/tsconfig.json
Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: /home/src/workspace/projects/project1/tsconfig.json
Info seq  [hh:mm:ss:mss] File '/home/src/workspace/projects/node_modules/@typescript/lib-dom/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspace/projects/node_modules/@typescript/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspace/projects/node_modules/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspace/projects/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspace/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] ======== Resolving module '@typescript/lib-webworker' from '/home/src/workspace/projects/project1/__lib_node_modules_lookup_lib.webworker.d.ts__.ts'. ========
Info seq  [hh:mm:ss:mss] Explicitly specified module resolution kind: 'Node10'.
Info seq  [hh:mm:ss:mss] Loading module '@typescript/lib-webworker' from 'node_modules' folder, target file types: TypeScript, Declaration.
Info seq  [hh:mm:ss:mss] Searching all ancestor node_modules directories for preferred extensions: TypeScript, Declaration.
Info seq  [hh:mm:ss:mss] Directory '/home/src/workspace/projects/project1/node_modules' does not exist, skipping all lookups in it.
Info seq  [hh:mm:ss:mss] Scoped package detected, looking in 'typescript__lib-webworker'
Info seq  [hh:mm:ss:mss] File '/home/src/workspace/projects/node_modules/@typescript/lib-webworker/package.json' does not exist.
Info seq  [hh:mm:ss:mss] File '/home/src/workspace/projects/node_modules/@typescript/lib-webworker.ts' does not exist.
Info seq  [hh:mm:ss:mss] File '/home/src/workspace/projects/node_modules/@typescript/lib-webworker.tsx' does not exist.
Info seq  [hh:mm:ss:mss] File '/home/src/workspace/projects/node_modules/@typescript/lib-webworker.d.ts' does not exist.
Info seq  [hh:mm:ss:mss] File '/home/src/workspace/projects/node_modules/@typescript/lib-webworker/index.ts' does not exist.
Info seq  [hh:mm:ss:mss] File '/home/src/workspace/projects/node_modules/@typescript/lib-webworker/index.tsx' does not exist.
Info seq  [hh:mm:ss:mss] File '/home/src/workspace/projects/node_modules/@typescript/lib-webworker/index.d.ts' exists - use it as a name resolution result.
Info seq  [hh:mm:ss:mss] Resolving real path for '/home/src/workspace/projects/node_modules/@typescript/lib-webworker/index.d.ts', result '/home/src/workspace/projects/node_modules/@typescript/lib-webworker/index.d.ts'.
Info seq  [hh:mm:ss:mss] ======== Module name '@typescript/lib-webworker' was successfully resolved to '/home/src/workspace/projects/node_modules/@typescript/lib-webworker/index.d.ts'. ========
Info seq  [hh:mm:ss:mss] File '/home/src/workspace/projects/node_modules/@typescript/lib-webworker/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspace/projects/node_modules/@typescript/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspace/projects/node_modules/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspace/projects/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspace/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] Reusing resolution of module '@typescript/lib-scripthost' from '/home/src/workspace/projects/project1/__lib_node_modules_lookup_lib.scripthost.d.ts__.ts' of old program, it was not resolved.
Info seq  [hh:mm:ss:mss] Reusing resolution of module '@typescript/lib-es5' from '/home/src/workspace/projects/project1/__lib_node_modules_lookup_lib.es5.d.ts__.ts' of old program, it was not resolved.
Info seq  [hh:mm:ss:mss] Reusing resolution of type reference directive 'sometype' from '/home/src/workspace/projects/project1/__inferred type names__.ts' of old program, it was successfully resolved to '/home/src/workspace/projects/project1/typeroot1/sometype/index.d.ts'.
Info seq  [hh:mm:ss:mss] Reusing resolution of module '@typescript/lib-dom' from '/home/src/workspace/projects/project1/__lib_node_modules_lookup_lib.dom.d.ts__.ts' of old program, it was successfully resolved to '/home/src/workspace/projects/node_modules/@typescript/lib-dom/index.d.ts'.
Info seq  [hh:mm:ss:mss] File '/home/src/workspace/projects/node_modules/@typescript/lib-dom/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspace/projects/node_modules/@typescript/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspace/projects/node_modules/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspace/projects/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspace/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/workspace/projects/node_modules/@typescript/lib-webworker/package.json 2000 undefined Project: /home/src/workspace/projects/project1/tsconfig.json WatchType: File location affecting resolution
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: /home/src/workspace/projects/project1/tsconfig.json projectStateVersion: 8 projectProgramVersion: 6 structureChanged: true structureIsReused:: SafeModules Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Project '/home/src/workspace/projects/project1/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (9)
	/home/src/tslibs/TS/Lib/lib.es5.d.ts Text-1 "/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };"
	/home/src/tslibs/TS/Lib/lib.scripthost.d.ts Text-1 "interface ScriptHostInterface { }"
	/home/src/workspace/projects/node_modules/@typescript/lib-webworker/index.d.ts Text-1 "interface WebWorkerInterface { }"
	/home/src/workspace/projects/node_modules/@typescript/lib-dom/index.d.ts Text-1 "interface DOMInterface { }"
	/home/src/workspace/projects/project1/file.ts Text-2 "export const file = 10;export const xyz = 10;"
	/home/src/workspace/projects/project1/file2.ts Text-1 "/// <reference lib=\"webworker\"/>\n/// <reference lib=\"scripthost\"/>\n/// <reference lib=\"es5\"/>\n"
	/home/src/workspace/projects/project1/index.ts SVC-1-0 "export const x = \"type1\";"
	/home/src/workspace/projects/project1/utils.d.ts Text-1 "export const y = 10;"
	/home/src/workspace/projects/project1/typeroot1/sometype/index.d.ts Text-1 "export type TheNum = \"type1\";"


	../../../tslibs/TS/Lib/lib.es5.d.ts
	  Library referenced via 'es5' from file 'file2.ts'
	  Library 'lib.es5.d.ts' specified in compilerOptions
	../../../tslibs/TS/Lib/lib.scripthost.d.ts
	  Library referenced via 'scripthost' from file 'file2.ts'
	../node_modules/@typescript/lib-webworker/index.d.ts
	  Library referenced via 'webworker' from file 'file2.ts'
	../node_modules/@typescript/lib-dom/index.d.ts
	  Library 'lib.dom.d.ts' specified in compilerOptions
	file.ts
	  Matched by default include pattern '**/*'
	file2.ts
	  Matched by default include pattern '**/*'
	index.ts
	  Matched by default include pattern '**/*'
	utils.d.ts
	  Matched by default include pattern '**/*'
	typeroot1/sometype/index.d.ts
	  Matched by default include pattern '**/*'
	  Entry point for implicit type library 'sometype'

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Running: *ensureProjectForOpenFiles*
Info seq  [hh:mm:ss:mss] Before ensureProjectForOpenFiles:
Info seq  [hh:mm:ss:mss] Project '/home/src/workspace/projects/project1/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (9)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: /home/src/workspace/projects/project1/index.ts ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /home/src/workspace/projects/project1/tsconfig.json
Info seq  [hh:mm:ss:mss] After ensureProjectForOpenFiles:
Info seq  [hh:mm:ss:mss] Project '/home/src/workspace/projects/project1/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (9)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: /home/src/workspace/projects/project1/index.ts ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /home/src/workspace/projects/project1/tsconfig.json
Info seq  [hh:mm:ss:mss] got projects updated in background /home/src/workspace/projects/project1/index.ts
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "projectsUpdatedInBackground",
      "body": {
        "openFiles": [
          "/home/src/workspace/projects/project1/index.ts"
        ]
      }
    }
After running Timeout callback:: count: 0

PolledWatches::
/home/src/workspace/node_modules:
  {"pollingInterval":500}
/home/src/workspace/package.json:
  {"pollingInterval":2000}
/home/src/workspace/projects/node_modules/@typescript/lib-dom/package.json:
  {"pollingInterval":2000}
/home/src/workspace/projects/node_modules/@typescript/lib-webworker/package.json: *new*
  {"pollingInterval":2000}
/home/src/workspace/projects/node_modules/@typescript/package.json:
  {"pollingInterval":2000}
/home/src/workspace/projects/node_modules/package.json:
  {"pollingInterval":2000}
/home/src/workspace/projects/package.json:
  {"pollingInterval":2000}
/home/src/workspace/projects/project1/node_modules:
  {"pollingInterval":500}

FsWatches::
/home/src/tslibs/TS/Lib/lib.dom.d.ts:
  {}
/home/src/tslibs/TS/Lib/lib.es5.d.ts:
  {}
/home/src/tslibs/TS/Lib/lib.scripthost.d.ts:
  {}
/home/src/tslibs/TS/Lib/lib.webworker.d.ts:
  {}
/home/src/workspace/projects/project1/core.d.ts:
  {}
/home/src/workspace/projects/project1/file.ts:
  {}
/home/src/workspace/projects/project1/file2.ts:
  {}
/home/src/workspace/projects/project1/tsconfig.json:
  {}
/home/src/workspace/projects/project1/typeroot1/sometype/index.d.ts:
  {}
/home/src/workspace/projects/project1/utils.d.ts:
  {}

FsWatchesRecursive::
/home/src/workspace/projects/node_modules:
  {}
/home/src/workspace/projects/project1:
  {}
/home/src/workspace/projects/project1/typeroot1:
  {}

Projects::
/home/src/workspace/projects/project1/tsconfig.json (Configured) *changed*
    projectStateVersion: 8
    projectProgramVersion: 7 *changed*
    dirty: false *changed*

ScriptInfos::
/home/src/tslibs/TS/Lib/lib.dom.d.ts
    version: Text-1
    containingProjects: 0
/home/src/tslibs/TS/Lib/lib.es5.d.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspace/projects/project1/tsconfig.json
/home/src/tslibs/TS/Lib/lib.scripthost.d.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspace/projects/project1/tsconfig.json
/home/src/tslibs/TS/Lib/lib.webworker.d.ts *changed*
    version: Text-1
    containingProjects: 0 *changed*
        /home/src/workspace/projects/project1/tsconfig.json *deleted*
/home/src/workspace/projects/node_modules/@typescript/lib-dom/index.d.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspace/projects/project1/tsconfig.json
/home/src/workspace/projects/node_modules/@typescript/lib-webworker/index.d.ts *new*
    version: Text-1
    containingProjects: 1
        /home/src/workspace/projects/project1/tsconfig.json
/home/src/workspace/projects/project1/core.d.ts
    version: Text-1
    pendingReloadFromDisk: true
    deferredDelete: true
    containingProjects: 0
/home/src/workspace/projects/project1/file.ts
    version: Text-2
    containingProjects: 1
        /home/src/workspace/projects/project1/tsconfig.json
/home/src/workspace/projects/project1/file2.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspace/projects/project1/tsconfig.json
/home/src/workspace/projects/project1/index.ts (Open)
    version: SVC-1-0
    containingProjects: 1
        /home/src/workspace/projects/project1/tsconfig.json *default*
/home/src/workspace/projects/project1/typeroot1/sometype/index.d.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspace/projects/project1/tsconfig.json
/home/src/workspace/projects/project1/utils.d.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspace/projects/project1/tsconfig.json

delete redirect file webworker
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Triggered with /home/src/workspace/projects/node_modules/@typescript/lib-webworker/index.d.ts :: WatchInfo: /home/src/workspace/projects/node_modules 1 undefined Project: /home/src/workspace/projects/project1/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Scheduled: /home/src/workspace/projects/project1/tsconfig.jsonFailedLookupInvalidation
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Triggered with /home/src/workspace/projects/node_modules/@typescript/lib-webworker/index.d.ts :: WatchInfo: /home/src/workspace/projects/node_modules 1 undefined Project: /home/src/workspace/projects/project1/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Triggered with /home/src/workspace/projects/node_modules/@typescript/lib-webworker/index.d.ts :: WatchInfo: /home/src/workspace/projects/node_modules 1 undefined WatchType: node_modules for closed script infos and package.jsons affecting module specifier cache
Info seq  [hh:mm:ss:mss] Scheduled: /home/src/workspace/projects/project1/tsconfig.json
Info seq  [hh:mm:ss:mss] Scheduled: *ensureProjectForOpenFiles*
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Triggered with /home/src/workspace/projects/node_modules/@typescript/lib-webworker/index.d.ts :: WatchInfo: /home/src/workspace/projects/node_modules 1 undefined WatchType: node_modules for closed script infos and package.jsons affecting module specifier cache
Before running Timeout callback:: count: 3
24: /home/src/workspace/projects/project1/tsconfig.jsonFailedLookupInvalidation
25: /home/src/workspace/projects/project1/tsconfig.json
26: *ensureProjectForOpenFiles*
//// [/home/src/workspace/projects/node_modules/@typescript/lib-webworker/index.d.ts] deleted

Timeout callback:: count: 3
24: /home/src/workspace/projects/project1/tsconfig.jsonFailedLookupInvalidation *new*
25: /home/src/workspace/projects/project1/tsconfig.json *new*
26: *ensureProjectForOpenFiles* *new*

Projects::
/home/src/workspace/projects/project1/tsconfig.json (Configured) *changed*
    projectStateVersion: 9 *changed*
    projectProgramVersion: 7
    dirty: true *changed*

ScriptInfos::
/home/src/tslibs/TS/Lib/lib.dom.d.ts
    version: Text-1
    containingProjects: 0
/home/src/tslibs/TS/Lib/lib.es5.d.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspace/projects/project1/tsconfig.json
/home/src/tslibs/TS/Lib/lib.scripthost.d.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspace/projects/project1/tsconfig.json
/home/src/tslibs/TS/Lib/lib.webworker.d.ts
    version: Text-1
    containingProjects: 0
/home/src/workspace/projects/node_modules/@typescript/lib-dom/index.d.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspace/projects/project1/tsconfig.json
/home/src/workspace/projects/node_modules/@typescript/lib-webworker/index.d.ts *changed*
    version: Text-1
    pendingReloadFromDisk: true *changed*
    deferredDelete: true *changed*
    containingProjects: 0 *changed*
        /home/src/workspace/projects/project1/tsconfig.json *deleted*
/home/src/workspace/projects/project1/core.d.ts
    version: Text-1
    pendingReloadFromDisk: true
    deferredDelete: true
    containingProjects: 0
/home/src/workspace/projects/project1/file.ts
    version: Text-2
    containingProjects: 1
        /home/src/workspace/projects/project1/tsconfig.json
/home/src/workspace/projects/project1/file2.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspace/projects/project1/tsconfig.json
/home/src/workspace/projects/project1/index.ts (Open)
    version: SVC-1-0
    containingProjects: 1
        /home/src/workspace/projects/project1/tsconfig.json *default*
/home/src/workspace/projects/project1/typeroot1/sometype/index.d.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspace/projects/project1/tsconfig.json
/home/src/workspace/projects/project1/utils.d.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspace/projects/project1/tsconfig.json

Info seq  [hh:mm:ss:mss] Running: /home/src/workspace/projects/project1/tsconfig.jsonFailedLookupInvalidation
Info seq  [hh:mm:ss:mss] Running: /home/src/workspace/projects/project1/tsconfig.json
Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: /home/src/workspace/projects/project1/tsconfig.json
Info seq  [hh:mm:ss:mss] File '/home/src/workspace/projects/node_modules/@typescript/lib-webworker/package.json' does not exist.
Info seq  [hh:mm:ss:mss] File '/home/src/workspace/projects/node_modules/@typescript/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspace/projects/node_modules/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspace/projects/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspace/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] ======== Resolving module '@typescript/lib-webworker' from '/home/src/workspace/projects/project1/__lib_node_modules_lookup_lib.webworker.d.ts__.ts'. ========
Info seq  [hh:mm:ss:mss] Explicitly specified module resolution kind: 'Node10'.
Info seq  [hh:mm:ss:mss] Loading module '@typescript/lib-webworker' from 'node_modules' folder, target file types: TypeScript, Declaration.
Info seq  [hh:mm:ss:mss] Searching all ancestor node_modules directories for preferred extensions: TypeScript, Declaration.
Info seq  [hh:mm:ss:mss] Directory '/home/src/workspace/projects/project1/node_modules' does not exist, skipping all lookups in it.
Info seq  [hh:mm:ss:mss] Scoped package detected, looking in 'typescript__lib-webworker'
Info seq  [hh:mm:ss:mss] File '/home/src/workspace/projects/node_modules/@typescript/lib-webworker/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspace/projects/node_modules/@typescript/lib-webworker.ts' does not exist.
Info seq  [hh:mm:ss:mss] File '/home/src/workspace/projects/node_modules/@typescript/lib-webworker.tsx' does not exist.
Info seq  [hh:mm:ss:mss] File '/home/src/workspace/projects/node_modules/@typescript/lib-webworker.d.ts' does not exist.
Info seq  [hh:mm:ss:mss] File '/home/src/workspace/projects/node_modules/@typescript/lib-webworker/index.ts' does not exist.
Info seq  [hh:mm:ss:mss] File '/home/src/workspace/projects/node_modules/@typescript/lib-webworker/index.tsx' does not exist.
Info seq  [hh:mm:ss:mss] File '/home/src/workspace/projects/node_modules/@typescript/lib-webworker/index.d.ts' does not exist.
Info seq  [hh:mm:ss:mss] Directory '/home/src/workspace/projects/node_modules/@types' does not exist, skipping all lookups in it.
Info seq  [hh:mm:ss:mss] Scoped package detected, looking in 'typescript__lib-webworker'
Info seq  [hh:mm:ss:mss] Directory '/home/src/workspace/node_modules' does not exist, skipping all lookups in it.
Info seq  [hh:mm:ss:mss] Scoped package detected, looking in 'typescript__lib-webworker'
Info seq  [hh:mm:ss:mss] Directory '/home/src/node_modules' does not exist, skipping all lookups in it.
Info seq  [hh:mm:ss:mss] Scoped package detected, looking in 'typescript__lib-webworker'
Info seq  [hh:mm:ss:mss] Directory '/home/node_modules' does not exist, skipping all lookups in it.
Info seq  [hh:mm:ss:mss] Scoped package detected, looking in 'typescript__lib-webworker'
Info seq  [hh:mm:ss:mss] Directory '/node_modules' does not exist, skipping all lookups in it.
Info seq  [hh:mm:ss:mss] Scoped package detected, looking in 'typescript__lib-webworker'
Info seq  [hh:mm:ss:mss] Loading module '@typescript/lib-webworker' from 'node_modules' folder, target file types: JavaScript.
Info seq  [hh:mm:ss:mss] Searching all ancestor node_modules directories for fallback extensions: JavaScript.
Info seq  [hh:mm:ss:mss] Directory '/home/src/workspace/projects/project1/node_modules' does not exist, skipping all lookups in it.
Info seq  [hh:mm:ss:mss] File '/home/src/workspace/projects/node_modules/@typescript/lib-webworker/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspace/projects/node_modules/@typescript/lib-webworker.js' does not exist.
Info seq  [hh:mm:ss:mss] File '/home/src/workspace/projects/node_modules/@typescript/lib-webworker.jsx' does not exist.
Info seq  [hh:mm:ss:mss] File '/home/src/workspace/projects/node_modules/@typescript/lib-webworker/index.js' does not exist.
Info seq  [hh:mm:ss:mss] File '/home/src/workspace/projects/node_modules/@typescript/lib-webworker/index.jsx' does not exist.
Info seq  [hh:mm:ss:mss] Directory '/home/src/workspace/node_modules' does not exist, skipping all lookups in it.
Info seq  [hh:mm:ss:mss] Directory '/home/src/node_modules' does not exist, skipping all lookups in it.
Info seq  [hh:mm:ss:mss] Directory '/home/node_modules' does not exist, skipping all lookups in it.
Info seq  [hh:mm:ss:mss] Directory '/node_modules' does not exist, skipping all lookups in it.
Info seq  [hh:mm:ss:mss] ======== Module name '@typescript/lib-webworker' was not resolved. ========
Info seq  [hh:mm:ss:mss] Reusing resolution of module '@typescript/lib-scripthost' from '/home/src/workspace/projects/project1/__lib_node_modules_lookup_lib.scripthost.d.ts__.ts' of old program, it was not resolved.
Info seq  [hh:mm:ss:mss] Reusing resolution of module '@typescript/lib-es5' from '/home/src/workspace/projects/project1/__lib_node_modules_lookup_lib.es5.d.ts__.ts' of old program, it was not resolved.
Info seq  [hh:mm:ss:mss] Reusing resolution of type reference directive 'sometype' from '/home/src/workspace/projects/project1/__inferred type names__.ts' of old program, it was successfully resolved to '/home/src/workspace/projects/project1/typeroot1/sometype/index.d.ts'.
Info seq  [hh:mm:ss:mss] Reusing resolution of module '@typescript/lib-dom' from '/home/src/workspace/projects/project1/__lib_node_modules_lookup_lib.dom.d.ts__.ts' of old program, it was successfully resolved to '/home/src/workspace/projects/node_modules/@typescript/lib-dom/index.d.ts'.
Info seq  [hh:mm:ss:mss] File '/home/src/workspace/projects/node_modules/@typescript/lib-dom/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspace/projects/node_modules/@typescript/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspace/projects/node_modules/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspace/projects/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/workspace/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] FileWatcher:: Close:: WatchInfo: /home/src/workspace/projects/node_modules/@typescript/lib-webworker/package.json 2000 undefined Project: /home/src/workspace/projects/project1/tsconfig.json WatchType: File location affecting resolution
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: /home/src/workspace/projects/project1/tsconfig.json projectStateVersion: 9 projectProgramVersion: 7 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Project '/home/src/workspace/projects/project1/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (9)
	/home/src/tslibs/TS/Lib/lib.es5.d.ts Text-1 "/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };"
	/home/src/tslibs/TS/Lib/lib.webworker.d.ts Text-1 "interface WebWorkerInterface { }"
	/home/src/tslibs/TS/Lib/lib.scripthost.d.ts Text-1 "interface ScriptHostInterface { }"
	/home/src/workspace/projects/node_modules/@typescript/lib-dom/index.d.ts Text-1 "interface DOMInterface { }"
	/home/src/workspace/projects/project1/file.ts Text-2 "export const file = 10;export const xyz = 10;"
	/home/src/workspace/projects/project1/file2.ts Text-1 "/// <reference lib=\"webworker\"/>\n/// <reference lib=\"scripthost\"/>\n/// <reference lib=\"es5\"/>\n"
	/home/src/workspace/projects/project1/index.ts SVC-1-0 "export const x = \"type1\";"
	/home/src/workspace/projects/project1/utils.d.ts Text-1 "export const y = 10;"
	/home/src/workspace/projects/project1/typeroot1/sometype/index.d.ts Text-1 "export type TheNum = \"type1\";"


	../../../tslibs/TS/Lib/lib.es5.d.ts
	  Library referenced via 'es5' from file 'file2.ts'
	  Library 'lib.es5.d.ts' specified in compilerOptions
	../../../tslibs/TS/Lib/lib.webworker.d.ts
	  Library referenced via 'webworker' from file 'file2.ts'
	../../../tslibs/TS/Lib/lib.scripthost.d.ts
	  Library referenced via 'scripthost' from file 'file2.ts'
	../node_modules/@typescript/lib-dom/index.d.ts
	  Library 'lib.dom.d.ts' specified in compilerOptions
	file.ts
	  Matched by default include pattern '**/*'
	file2.ts
	  Matched by default include pattern '**/*'
	index.ts
	  Matched by default include pattern '**/*'
	utils.d.ts
	  Matched by default include pattern '**/*'
	typeroot1/sometype/index.d.ts
	  Matched by default include pattern '**/*'
	  Entry point for implicit type library 'sometype'

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Running: *ensureProjectForOpenFiles*
Info seq  [hh:mm:ss:mss] Before ensureProjectForOpenFiles:
Info seq  [hh:mm:ss:mss] Project '/home/src/workspace/projects/project1/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (9)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: /home/src/workspace/projects/project1/index.ts ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /home/src/workspace/projects/project1/tsconfig.json
Info seq  [hh:mm:ss:mss] After ensureProjectForOpenFiles:
Info seq  [hh:mm:ss:mss] Project '/home/src/workspace/projects/project1/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (9)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: /home/src/workspace/projects/project1/index.ts ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /home/src/workspace/projects/project1/tsconfig.json
Info seq  [hh:mm:ss:mss] got projects updated in background /home/src/workspace/projects/project1/index.ts
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "projectsUpdatedInBackground",
      "body": {
        "openFiles": [
          "/home/src/workspace/projects/project1/index.ts"
        ]
      }
    }
After running Timeout callback:: count: 0

PolledWatches::
/home/src/workspace/node_modules:
  {"pollingInterval":500}
/home/src/workspace/package.json:
  {"pollingInterval":2000}
/home/src/workspace/projects/node_modules/@typescript/lib-dom/package.json:
  {"pollingInterval":2000}
/home/src/workspace/projects/node_modules/@typescript/package.json:
  {"pollingInterval":2000}
/home/src/workspace/projects/node_modules/package.json:
  {"pollingInterval":2000}
/home/src/workspace/projects/package.json:
  {"pollingInterval":2000}
/home/src/workspace/projects/project1/node_modules:
  {"pollingInterval":500}

PolledWatches *deleted*::
/home/src/workspace/projects/node_modules/@typescript/lib-webworker/package.json:
  {"pollingInterval":2000}

FsWatches::
/home/src/tslibs/TS/Lib/lib.dom.d.ts:
  {}
/home/src/tslibs/TS/Lib/lib.es5.d.ts:
  {}
/home/src/tslibs/TS/Lib/lib.scripthost.d.ts:
  {}
/home/src/tslibs/TS/Lib/lib.webworker.d.ts:
  {}
/home/src/workspace/projects/project1/core.d.ts:
  {}
/home/src/workspace/projects/project1/file.ts:
  {}
/home/src/workspace/projects/project1/file2.ts:
  {}
/home/src/workspace/projects/project1/tsconfig.json:
  {}
/home/src/workspace/projects/project1/typeroot1/sometype/index.d.ts:
  {}
/home/src/workspace/projects/project1/utils.d.ts:
  {}

FsWatchesRecursive::
/home/src/workspace/projects/node_modules:
  {}
/home/src/workspace/projects/project1:
  {}
/home/src/workspace/projects/project1/typeroot1:
  {}

Projects::
/home/src/workspace/projects/project1/tsconfig.json (Configured) *changed*
    projectStateVersion: 9
    projectProgramVersion: 8 *changed*
    dirty: false *changed*

ScriptInfos::
/home/src/tslibs/TS/Lib/lib.dom.d.ts
    version: Text-1
    containingProjects: 0
/home/src/tslibs/TS/Lib/lib.es5.d.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspace/projects/project1/tsconfig.json
/home/src/tslibs/TS/Lib/lib.scripthost.d.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspace/projects/project1/tsconfig.json
/home/src/tslibs/TS/Lib/lib.webworker.d.ts *changed*
    version: Text-1
    containingProjects: 1 *changed*
        /home/src/workspace/projects/project1/tsconfig.json *new*
/home/src/workspace/projects/node_modules/@typescript/lib-dom/index.d.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspace/projects/project1/tsconfig.json
/home/src/workspace/projects/node_modules/@typescript/lib-webworker/index.d.ts
    version: Text-1
    pendingReloadFromDisk: true
    deferredDelete: true
    containingProjects: 0
/home/src/workspace/projects/project1/core.d.ts
    version: Text-1
    pendingReloadFromDisk: true
    deferredDelete: true
    containingProjects: 0
/home/src/workspace/projects/project1/file.ts
    version: Text-2
    containingProjects: 1
        /home/src/workspace/projects/project1/tsconfig.json
/home/src/workspace/projects/project1/file2.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspace/projects/project1/tsconfig.json
/home/src/workspace/projects/project1/index.ts (Open)
    version: SVC-1-0
    containingProjects: 1
        /home/src/workspace/projects/project1/tsconfig.json *default*
/home/src/workspace/projects/project1/typeroot1/sometype/index.d.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspace/projects/project1/tsconfig.json
/home/src/workspace/projects/project1/utils.d.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspace/projects/project1/tsconfig.json
