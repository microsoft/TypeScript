currentDirectory:: /home/src/projects useCaseSensitiveFileNames: false
Info seq  [hh:mm:ss:mss] Provided types map file "/typesMap.json" doesn't exist
Before request
//// [/home/src/projects/project1/utils.d.ts]
export const y = 10;

//// [/home/src/projects/project1/file.ts]
export const file = 10;

//// [/home/src/projects/project1/core.d.ts]
export const core = 10;

//// [/home/src/projects/project1/index.ts]
export const x = "type1";

//// [/home/src/projects/project1/file2.ts]
/// <reference lib="webworker"/>
/// <reference lib="scripthost"/>
/// <reference lib="es5"/>


//// [/home/src/projects/project1/tsconfig.json]
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

//// [/home/src/projects/project1/typeroot1/sometype/index.d.ts]
export type TheNum = "type1";

//// [/home/src/projects/project2/utils.d.ts]
export const y = 10;

//// [/home/src/projects/project2/index.ts]
export const y = 10

//// [/home/src/projects/project2/tsconfig.json]
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

//// [/home/src/projects/project3/utils.d.ts]
export const y = 10;

//// [/home/src/projects/project3/index.ts]
export const z = 10

//// [/home/src/projects/project3/tsconfig.json]
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

//// [/home/src/projects/project4/utils.d.ts]
export const y = 10;

//// [/home/src/projects/project4/index.ts]
export const z = 10

//// [/home/src/projects/project4/tsconfig.json]
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

//// [/home/src/lib/lib.es5.d.ts]
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

//// [/home/src/lib/lib.esnext.d.ts]
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

//// [/home/src/lib/lib.dom.d.ts]
interface DOMInterface { }

//// [/home/src/lib/lib.webworker.d.ts]
interface WebWorkerInterface { }

//// [/home/src/lib/lib.scripthost.d.ts]
interface ScriptHostInterface { }

//// [/home/src/projects/node_modules/@typescript/unlreated/index.d.ts]
export const unrelated = 10;

//// [/home/src/projects/node_modules/@typescript/lib-es5/index.d.ts]
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

//// [/home/src/projects/node_modules/@typescript/lib-esnext/index.d.ts]
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

//// [/home/src/projects/node_modules/@typescript/lib-dom/index.d.ts]
interface DOMInterface { }

//// [/home/src/projects/node_modules/@typescript/lib-webworker/index.d.ts]
interface WebworkerInterface { }

//// [/home/src/projects/node_modules/@typescript/lib-scripthost/index.d.ts]
interface ScriptHostInterface { }


Info seq  [hh:mm:ss:mss] request:
    {
      "command": "open",
      "arguments": {
        "file": "/home/src/projects/project1/index.ts"
      },
      "seq": 1,
      "type": "request"
    }
Info seq  [hh:mm:ss:mss] getConfigFileNameForFile:: File: /home/src/projects/project1/index.ts ProjectRootPath: undefined:: Result: /home/src/projects/project1/tsconfig.json
Info seq  [hh:mm:ss:mss] Creating configuration project /home/src/projects/project1/tsconfig.json
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/projects/project1/tsconfig.json 2000 undefined Project: /home/src/projects/project1/tsconfig.json WatchType: Config file
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "projectLoadingStart",
      "body": {
        "projectName": "/home/src/projects/project1/tsconfig.json",
        "reason": "Creating possible configured project for /home/src/projects/project1/index.ts to open"
      }
    }
Info seq  [hh:mm:ss:mss] Config: /home/src/projects/project1/tsconfig.json : {
 "rootNames": [
  "/home/src/projects/project1/core.d.ts",
  "/home/src/projects/project1/file.ts",
  "/home/src/projects/project1/file2.ts",
  "/home/src/projects/project1/index.ts",
  "/home/src/projects/project1/utils.d.ts",
  "/home/src/projects/project1/typeroot1/sometype/index.d.ts"
 ],
 "options": {
  "composite": true,
  "typeRoots": [
   "/home/src/projects/project1/typeroot1"
  ],
  "lib": [
   "lib.es5.d.ts",
   "lib.dom.d.ts"
  ],
  "traceResolution": true,
  "configFilePath": "/home/src/projects/project1/tsconfig.json"
 }
}
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /home/src/projects/project1 1 undefined Config: /home/src/projects/project1/tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /home/src/projects/project1 1 undefined Config: /home/src/projects/project1/tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/projects/project1/core.d.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/projects/project1/file.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/projects/project1/file2.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/projects/project1/utils.d.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/projects/project1/typeroot1/sometype/index.d.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: /home/src/projects/project1/tsconfig.json
Info seq  [hh:mm:ss:mss] ======== Resolving module '@typescript/lib-webworker' from '/home/src/projects/project1/__lib_node_modules_lookup_lib.webworker.d.ts__.ts'. ========
Info seq  [hh:mm:ss:mss] Explicitly specified module resolution kind: 'Node10'.
Info seq  [hh:mm:ss:mss] Loading module '@typescript/lib-webworker' from 'node_modules' folder, target file types: TypeScript, Declaration.
Info seq  [hh:mm:ss:mss] Searching all ancestor node_modules directories for preferred extensions: TypeScript, Declaration.
Info seq  [hh:mm:ss:mss] Directory '/home/src/projects/project1/node_modules' does not exist, skipping all lookups in it.
Info seq  [hh:mm:ss:mss] Scoped package detected, looking in 'typescript__lib-webworker'
Info seq  [hh:mm:ss:mss] File '/home/src/projects/node_modules/@typescript/lib-webworker/package.json' does not exist.
Info seq  [hh:mm:ss:mss] File '/home/src/projects/node_modules/@typescript/lib-webworker.ts' does not exist.
Info seq  [hh:mm:ss:mss] File '/home/src/projects/node_modules/@typescript/lib-webworker.tsx' does not exist.
Info seq  [hh:mm:ss:mss] File '/home/src/projects/node_modules/@typescript/lib-webworker.d.ts' does not exist.
Info seq  [hh:mm:ss:mss] File '/home/src/projects/node_modules/@typescript/lib-webworker/index.ts' does not exist.
Info seq  [hh:mm:ss:mss] File '/home/src/projects/node_modules/@typescript/lib-webworker/index.tsx' does not exist.
Info seq  [hh:mm:ss:mss] File '/home/src/projects/node_modules/@typescript/lib-webworker/index.d.ts' exists - use it as a name resolution result.
Info seq  [hh:mm:ss:mss] Resolving real path for '/home/src/projects/node_modules/@typescript/lib-webworker/index.d.ts', result '/home/src/projects/node_modules/@typescript/lib-webworker/index.d.ts'.
Info seq  [hh:mm:ss:mss] ======== Module name '@typescript/lib-webworker' was successfully resolved to '/home/src/projects/node_modules/@typescript/lib-webworker/index.d.ts'. ========
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /home/src/projects/project1/node_modules 1 undefined Project: /home/src/projects/project1/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /home/src/projects/project1/node_modules 1 undefined Project: /home/src/projects/project1/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /home/src/projects/node_modules 1 undefined Project: /home/src/projects/project1/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /home/src/projects/node_modules 1 undefined Project: /home/src/projects/project1/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] File '/home/src/projects/node_modules/@typescript/lib-webworker/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/projects/node_modules/@typescript/package.json' does not exist.
Info seq  [hh:mm:ss:mss] File '/home/src/projects/node_modules/package.json' does not exist.
Info seq  [hh:mm:ss:mss] File '/home/src/projects/package.json' does not exist.
Info seq  [hh:mm:ss:mss] File '/home/src/package.json' does not exist.
Info seq  [hh:mm:ss:mss] File '/home/package.json' does not exist.
Info seq  [hh:mm:ss:mss] File '/package.json' does not exist.
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /home/src/projects/node_modules 1 undefined WatchType: node_modules for closed script infos and package.jsons affecting module specifier cache
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /home/src/projects/node_modules 1 undefined WatchType: node_modules for closed script infos and package.jsons affecting module specifier cache
Info seq  [hh:mm:ss:mss] ======== Resolving module '@typescript/lib-scripthost' from '/home/src/projects/project1/__lib_node_modules_lookup_lib.scripthost.d.ts__.ts'. ========
Info seq  [hh:mm:ss:mss] Explicitly specified module resolution kind: 'Node10'.
Info seq  [hh:mm:ss:mss] Loading module '@typescript/lib-scripthost' from 'node_modules' folder, target file types: TypeScript, Declaration.
Info seq  [hh:mm:ss:mss] Searching all ancestor node_modules directories for preferred extensions: TypeScript, Declaration.
Info seq  [hh:mm:ss:mss] Directory '/home/src/projects/project1/node_modules' does not exist, skipping all lookups in it.
Info seq  [hh:mm:ss:mss] Scoped package detected, looking in 'typescript__lib-scripthost'
Info seq  [hh:mm:ss:mss] File '/home/src/projects/node_modules/@typescript/lib-scripthost/package.json' does not exist.
Info seq  [hh:mm:ss:mss] File '/home/src/projects/node_modules/@typescript/lib-scripthost.ts' does not exist.
Info seq  [hh:mm:ss:mss] File '/home/src/projects/node_modules/@typescript/lib-scripthost.tsx' does not exist.
Info seq  [hh:mm:ss:mss] File '/home/src/projects/node_modules/@typescript/lib-scripthost.d.ts' does not exist.
Info seq  [hh:mm:ss:mss] File '/home/src/projects/node_modules/@typescript/lib-scripthost/index.ts' does not exist.
Info seq  [hh:mm:ss:mss] File '/home/src/projects/node_modules/@typescript/lib-scripthost/index.tsx' does not exist.
Info seq  [hh:mm:ss:mss] File '/home/src/projects/node_modules/@typescript/lib-scripthost/index.d.ts' exists - use it as a name resolution result.
Info seq  [hh:mm:ss:mss] Resolving real path for '/home/src/projects/node_modules/@typescript/lib-scripthost/index.d.ts', result '/home/src/projects/node_modules/@typescript/lib-scripthost/index.d.ts'.
Info seq  [hh:mm:ss:mss] ======== Module name '@typescript/lib-scripthost' was successfully resolved to '/home/src/projects/node_modules/@typescript/lib-scripthost/index.d.ts'. ========
Info seq  [hh:mm:ss:mss] File '/home/src/projects/node_modules/@typescript/lib-scripthost/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/projects/node_modules/@typescript/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/projects/node_modules/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/projects/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] ======== Resolving module '@typescript/lib-es5' from '/home/src/projects/project1/__lib_node_modules_lookup_lib.es5.d.ts__.ts'. ========
Info seq  [hh:mm:ss:mss] Explicitly specified module resolution kind: 'Node10'.
Info seq  [hh:mm:ss:mss] Loading module '@typescript/lib-es5' from 'node_modules' folder, target file types: TypeScript, Declaration.
Info seq  [hh:mm:ss:mss] Searching all ancestor node_modules directories for preferred extensions: TypeScript, Declaration.
Info seq  [hh:mm:ss:mss] Directory '/home/src/projects/project1/node_modules' does not exist, skipping all lookups in it.
Info seq  [hh:mm:ss:mss] Scoped package detected, looking in 'typescript__lib-es5'
Info seq  [hh:mm:ss:mss] File '/home/src/projects/node_modules/@typescript/lib-es5/package.json' does not exist.
Info seq  [hh:mm:ss:mss] File '/home/src/projects/node_modules/@typescript/lib-es5.ts' does not exist.
Info seq  [hh:mm:ss:mss] File '/home/src/projects/node_modules/@typescript/lib-es5.tsx' does not exist.
Info seq  [hh:mm:ss:mss] File '/home/src/projects/node_modules/@typescript/lib-es5.d.ts' does not exist.
Info seq  [hh:mm:ss:mss] File '/home/src/projects/node_modules/@typescript/lib-es5/index.ts' does not exist.
Info seq  [hh:mm:ss:mss] File '/home/src/projects/node_modules/@typescript/lib-es5/index.tsx' does not exist.
Info seq  [hh:mm:ss:mss] File '/home/src/projects/node_modules/@typescript/lib-es5/index.d.ts' exists - use it as a name resolution result.
Info seq  [hh:mm:ss:mss] Resolving real path for '/home/src/projects/node_modules/@typescript/lib-es5/index.d.ts', result '/home/src/projects/node_modules/@typescript/lib-es5/index.d.ts'.
Info seq  [hh:mm:ss:mss] ======== Module name '@typescript/lib-es5' was successfully resolved to '/home/src/projects/node_modules/@typescript/lib-es5/index.d.ts'. ========
Info seq  [hh:mm:ss:mss] File '/home/src/projects/node_modules/@typescript/lib-es5/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/projects/node_modules/@typescript/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/projects/node_modules/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/projects/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] ======== Resolving type reference directive 'sometype', containing file '/home/src/projects/project1/__inferred type names__.ts', root directory '/home/src/projects/project1/typeroot1'. ========
Info seq  [hh:mm:ss:mss] Resolving with primary search path '/home/src/projects/project1/typeroot1'.
Info seq  [hh:mm:ss:mss] File '/home/src/projects/project1/typeroot1/sometype.d.ts' does not exist.
Info seq  [hh:mm:ss:mss] File '/home/src/projects/project1/typeroot1/sometype/package.json' does not exist.
Info seq  [hh:mm:ss:mss] File '/home/src/projects/project1/typeroot1/sometype/index.d.ts' exists - use it as a name resolution result.
Info seq  [hh:mm:ss:mss] Resolving real path for '/home/src/projects/project1/typeroot1/sometype/index.d.ts', result '/home/src/projects/project1/typeroot1/sometype/index.d.ts'.
Info seq  [hh:mm:ss:mss] ======== Type reference directive 'sometype' was successfully resolved to '/home/src/projects/project1/typeroot1/sometype/index.d.ts', primary: true. ========
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /home/src/projects/project1/typeroot1 1 undefined Project: /home/src/projects/project1/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /home/src/projects/project1/typeroot1 1 undefined Project: /home/src/projects/project1/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] ======== Resolving module '@typescript/lib-dom' from '/home/src/projects/project1/__lib_node_modules_lookup_lib.dom.d.ts__.ts'. ========
Info seq  [hh:mm:ss:mss] Explicitly specified module resolution kind: 'Node10'.
Info seq  [hh:mm:ss:mss] Loading module '@typescript/lib-dom' from 'node_modules' folder, target file types: TypeScript, Declaration.
Info seq  [hh:mm:ss:mss] Searching all ancestor node_modules directories for preferred extensions: TypeScript, Declaration.
Info seq  [hh:mm:ss:mss] Directory '/home/src/projects/project1/node_modules' does not exist, skipping all lookups in it.
Info seq  [hh:mm:ss:mss] Scoped package detected, looking in 'typescript__lib-dom'
Info seq  [hh:mm:ss:mss] File '/home/src/projects/node_modules/@typescript/lib-dom/package.json' does not exist.
Info seq  [hh:mm:ss:mss] File '/home/src/projects/node_modules/@typescript/lib-dom.ts' does not exist.
Info seq  [hh:mm:ss:mss] File '/home/src/projects/node_modules/@typescript/lib-dom.tsx' does not exist.
Info seq  [hh:mm:ss:mss] File '/home/src/projects/node_modules/@typescript/lib-dom.d.ts' does not exist.
Info seq  [hh:mm:ss:mss] File '/home/src/projects/node_modules/@typescript/lib-dom/index.ts' does not exist.
Info seq  [hh:mm:ss:mss] File '/home/src/projects/node_modules/@typescript/lib-dom/index.tsx' does not exist.
Info seq  [hh:mm:ss:mss] File '/home/src/projects/node_modules/@typescript/lib-dom/index.d.ts' exists - use it as a name resolution result.
Info seq  [hh:mm:ss:mss] Resolving real path for '/home/src/projects/node_modules/@typescript/lib-dom/index.d.ts', result '/home/src/projects/node_modules/@typescript/lib-dom/index.d.ts'.
Info seq  [hh:mm:ss:mss] ======== Module name '@typescript/lib-dom' was successfully resolved to '/home/src/projects/node_modules/@typescript/lib-dom/index.d.ts'. ========
Info seq  [hh:mm:ss:mss] File '/home/src/projects/node_modules/@typescript/lib-dom/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/projects/node_modules/@typescript/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/projects/node_modules/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/projects/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/projects/node_modules/@typescript/lib-webworker/package.json 2000 undefined Project: /home/src/projects/project1/tsconfig.json WatchType: File location affecting resolution
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/projects/node_modules/@typescript/package.json 2000 undefined Project: /home/src/projects/project1/tsconfig.json WatchType: File location affecting resolution
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/projects/node_modules/package.json 2000 undefined Project: /home/src/projects/project1/tsconfig.json WatchType: File location affecting resolution
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/projects/package.json 2000 undefined Project: /home/src/projects/project1/tsconfig.json WatchType: File location affecting resolution
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/projects/node_modules/@typescript/lib-scripthost/package.json 2000 undefined Project: /home/src/projects/project1/tsconfig.json WatchType: File location affecting resolution
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/projects/node_modules/@typescript/lib-es5/package.json 2000 undefined Project: /home/src/projects/project1/tsconfig.json WatchType: File location affecting resolution
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/projects/node_modules/@typescript/lib-dom/package.json 2000 undefined Project: /home/src/projects/project1/tsconfig.json WatchType: File location affecting resolution
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /home/src/projects/project1/typeroot1 1 undefined Project: /home/src/projects/project1/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /home/src/projects/project1/typeroot1 1 undefined Project: /home/src/projects/project1/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: /home/src/projects/project1/tsconfig.json projectStateVersion: 1 projectProgramVersion: 0 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Project '/home/src/projects/project1/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (10)
	/home/src/projects/node_modules/@typescript/lib-webworker/index.d.ts Text-1 "interface WebworkerInterface { }"
	/home/src/projects/node_modules/@typescript/lib-scripthost/index.d.ts Text-1 "interface ScriptHostInterface { }"
	/home/src/projects/node_modules/@typescript/lib-es5/index.d.ts Text-1 "/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };"
	/home/src/projects/node_modules/@typescript/lib-dom/index.d.ts Text-1 "interface DOMInterface { }"
	/home/src/projects/project1/core.d.ts Text-1 "export const core = 10;"
	/home/src/projects/project1/file.ts Text-1 "export const file = 10;"
	/home/src/projects/project1/file2.ts Text-1 "/// <reference lib=\"webworker\"/>\n/// <reference lib=\"scripthost\"/>\n/// <reference lib=\"es5\"/>\n"
	/home/src/projects/project1/index.ts SVC-1-0 "export const x = \"type1\";"
	/home/src/projects/project1/utils.d.ts Text-1 "export const y = 10;"
	/home/src/projects/project1/typeroot1/sometype/index.d.ts Text-1 "export type TheNum = \"type1\";"


	../node_modules/@typescript/lib-webworker/index.d.ts
	  Library referenced via 'webworker' from file 'file2.ts'
	../node_modules/@typescript/lib-scripthost/index.d.ts
	  Library referenced via 'scripthost' from file 'file2.ts'
	../node_modules/@typescript/lib-es5/index.d.ts
	  Library referenced via 'es5' from file 'file2.ts'
	  Library 'lib.es5.d.ts' specified in compilerOptions
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
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "projectLoadingFinish",
      "body": {
        "projectName": "/home/src/projects/project1/tsconfig.json"
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
          "projectId": "a56ae0b7959ff2b0cb325077d485dcad15515353d68a035269eb930e78171949",
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
        "triggerFile": "/home/src/projects/project1/index.ts",
        "configFile": "/home/src/projects/project1/tsconfig.json",
        "diagnostics": []
      }
    }
Info seq  [hh:mm:ss:mss] getConfigFileNameForFile:: File: /home/src/projects/project1/tsconfig.json ProjectRootPath: undefined:: Result: undefined
Info seq  [hh:mm:ss:mss] Project '/home/src/projects/project1/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (10)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: /home/src/projects/project1/index.ts ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /home/src/projects/project1/tsconfig.json
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
/home/src/projects/node_modules/@typescript/lib-dom/package.json: *new*
  {"pollingInterval":2000}
/home/src/projects/node_modules/@typescript/lib-es5/package.json: *new*
  {"pollingInterval":2000}
/home/src/projects/node_modules/@typescript/lib-scripthost/package.json: *new*
  {"pollingInterval":2000}
/home/src/projects/node_modules/@typescript/lib-webworker/package.json: *new*
  {"pollingInterval":2000}
/home/src/projects/node_modules/@typescript/package.json: *new*
  {"pollingInterval":2000}
/home/src/projects/node_modules/package.json: *new*
  {"pollingInterval":2000}
/home/src/projects/package.json: *new*
  {"pollingInterval":2000}
/home/src/projects/project1/node_modules: *new*
  {"pollingInterval":500}

FsWatches::
/home/src/projects/project1/core.d.ts: *new*
  {}
/home/src/projects/project1/file.ts: *new*
  {}
/home/src/projects/project1/file2.ts: *new*
  {}
/home/src/projects/project1/tsconfig.json: *new*
  {}
/home/src/projects/project1/typeroot1/sometype/index.d.ts: *new*
  {}
/home/src/projects/project1/utils.d.ts: *new*
  {}

FsWatchesRecursive::
/home/src/projects/node_modules: *new*
  {}
/home/src/projects/project1: *new*
  {}
/home/src/projects/project1/typeroot1: *new*
  {}

Projects::
/home/src/projects/project1/tsconfig.json (Configured) *new*
    projectStateVersion: 1
    projectProgramVersion: 1

ScriptInfos::
/home/src/projects/node_modules/@typescript/lib-dom/index.d.ts *new*
    version: Text-1
    containingProjects: 1
        /home/src/projects/project1/tsconfig.json
/home/src/projects/node_modules/@typescript/lib-es5/index.d.ts *new*
    version: Text-1
    containingProjects: 1
        /home/src/projects/project1/tsconfig.json
/home/src/projects/node_modules/@typescript/lib-scripthost/index.d.ts *new*
    version: Text-1
    containingProjects: 1
        /home/src/projects/project1/tsconfig.json
/home/src/projects/node_modules/@typescript/lib-webworker/index.d.ts *new*
    version: Text-1
    containingProjects: 1
        /home/src/projects/project1/tsconfig.json
/home/src/projects/project1/core.d.ts *new*
    version: Text-1
    containingProjects: 1
        /home/src/projects/project1/tsconfig.json
/home/src/projects/project1/file.ts *new*
    version: Text-1
    containingProjects: 1
        /home/src/projects/project1/tsconfig.json
/home/src/projects/project1/file2.ts *new*
    version: Text-1
    containingProjects: 1
        /home/src/projects/project1/tsconfig.json
/home/src/projects/project1/index.ts (Open) *new*
    version: SVC-1-0
    containingProjects: 1
        /home/src/projects/project1/tsconfig.json *default*
/home/src/projects/project1/typeroot1/sometype/index.d.ts *new*
    version: Text-1
    containingProjects: 1
        /home/src/projects/project1/tsconfig.json
/home/src/projects/project1/utils.d.ts *new*
    version: Text-1
    containingProjects: 1
        /home/src/projects/project1/tsconfig.json

Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Triggered with /home/src/projects/node_modules/@typescript/lib-dom/index.d.ts :: WatchInfo: /home/src/projects/node_modules 1 undefined Project: /home/src/projects/project1/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Scheduled: /home/src/projects/project1/tsconfig.jsonFailedLookupInvalidation
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Triggered with /home/src/projects/node_modules/@typescript/lib-dom/index.d.ts :: WatchInfo: /home/src/projects/node_modules 1 undefined Project: /home/src/projects/project1/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Triggered with /home/src/projects/node_modules/@typescript/lib-dom/index.d.ts :: WatchInfo: /home/src/projects/node_modules 1 undefined WatchType: node_modules for closed script infos and package.jsons affecting module specifier cache
Info seq  [hh:mm:ss:mss] Scheduled: /home/src/projects/project1/tsconfig.json
Info seq  [hh:mm:ss:mss] Scheduled: *ensureProjectForOpenFiles*
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Triggered with /home/src/projects/node_modules/@typescript/lib-dom/index.d.ts :: WatchInfo: /home/src/projects/node_modules 1 undefined WatchType: node_modules for closed script infos and package.jsons affecting module specifier cache
Before running Timeout callback:: count: 3
1: /home/src/projects/project1/tsconfig.jsonFailedLookupInvalidation
2: /home/src/projects/project1/tsconfig.json
3: *ensureProjectForOpenFiles*
//// [/home/src/projects/node_modules/@typescript/lib-dom/index.d.ts] deleted

Timeout callback:: count: 3
1: /home/src/projects/project1/tsconfig.jsonFailedLookupInvalidation *new*
2: /home/src/projects/project1/tsconfig.json *new*
3: *ensureProjectForOpenFiles* *new*

Projects::
/home/src/projects/project1/tsconfig.json (Configured) *changed*
    projectStateVersion: 2 *changed*
    projectProgramVersion: 1
    dirty: true *changed*

ScriptInfos::
/home/src/projects/node_modules/@typescript/lib-dom/index.d.ts *changed*
    version: Text-1
    pendingReloadFromDisk: true *changed*
    deferredDelete: true *changed*
    containingProjects: 0 *changed*
        /home/src/projects/project1/tsconfig.json *deleted*
/home/src/projects/node_modules/@typescript/lib-es5/index.d.ts
    version: Text-1
    containingProjects: 1
        /home/src/projects/project1/tsconfig.json
/home/src/projects/node_modules/@typescript/lib-scripthost/index.d.ts
    version: Text-1
    containingProjects: 1
        /home/src/projects/project1/tsconfig.json
/home/src/projects/node_modules/@typescript/lib-webworker/index.d.ts
    version: Text-1
    containingProjects: 1
        /home/src/projects/project1/tsconfig.json
/home/src/projects/project1/core.d.ts
    version: Text-1
    containingProjects: 1
        /home/src/projects/project1/tsconfig.json
/home/src/projects/project1/file.ts
    version: Text-1
    containingProjects: 1
        /home/src/projects/project1/tsconfig.json
/home/src/projects/project1/file2.ts
    version: Text-1
    containingProjects: 1
        /home/src/projects/project1/tsconfig.json
/home/src/projects/project1/index.ts (Open)
    version: SVC-1-0
    containingProjects: 1
        /home/src/projects/project1/tsconfig.json *default*
/home/src/projects/project1/typeroot1/sometype/index.d.ts
    version: Text-1
    containingProjects: 1
        /home/src/projects/project1/tsconfig.json
/home/src/projects/project1/utils.d.ts
    version: Text-1
    containingProjects: 1
        /home/src/projects/project1/tsconfig.json

Info seq  [hh:mm:ss:mss] Running: /home/src/projects/project1/tsconfig.jsonFailedLookupInvalidation
Info seq  [hh:mm:ss:mss] Running: /home/src/projects/project1/tsconfig.json
Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: /home/src/projects/project1/tsconfig.json
Info seq  [hh:mm:ss:mss] File '/home/src/projects/node_modules/@typescript/lib-webworker/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/projects/node_modules/@typescript/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/projects/node_modules/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/projects/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/projects/node_modules/@typescript/lib-scripthost/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/projects/node_modules/@typescript/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/projects/node_modules/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/projects/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/projects/node_modules/@typescript/lib-es5/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/projects/node_modules/@typescript/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/projects/node_modules/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/projects/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/projects/node_modules/@typescript/lib-dom/package.json' does not exist.
Info seq  [hh:mm:ss:mss] File '/home/src/projects/node_modules/@typescript/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/projects/node_modules/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/projects/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] Reusing resolution of module '@typescript/lib-webworker' from '/home/src/projects/project1/__lib_node_modules_lookup_lib.webworker.d.ts__.ts' of old program, it was successfully resolved to '/home/src/projects/node_modules/@typescript/lib-webworker/index.d.ts'.
Info seq  [hh:mm:ss:mss] File '/home/src/projects/node_modules/@typescript/lib-webworker/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/projects/node_modules/@typescript/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/projects/node_modules/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/projects/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] Reusing resolution of module '@typescript/lib-scripthost' from '/home/src/projects/project1/__lib_node_modules_lookup_lib.scripthost.d.ts__.ts' of old program, it was successfully resolved to '/home/src/projects/node_modules/@typescript/lib-scripthost/index.d.ts'.
Info seq  [hh:mm:ss:mss] File '/home/src/projects/node_modules/@typescript/lib-scripthost/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/projects/node_modules/@typescript/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/projects/node_modules/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/projects/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] Reusing resolution of module '@typescript/lib-es5' from '/home/src/projects/project1/__lib_node_modules_lookup_lib.es5.d.ts__.ts' of old program, it was successfully resolved to '/home/src/projects/node_modules/@typescript/lib-es5/index.d.ts'.
Info seq  [hh:mm:ss:mss] File '/home/src/projects/node_modules/@typescript/lib-es5/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/projects/node_modules/@typescript/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/projects/node_modules/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/projects/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] Reusing resolution of type reference directive 'sometype' from '/home/src/projects/project1/__inferred type names__.ts' of old program, it was successfully resolved to '/home/src/projects/project1/typeroot1/sometype/index.d.ts'.
Info seq  [hh:mm:ss:mss] ======== Resolving module '@typescript/lib-dom' from '/home/src/projects/project1/__lib_node_modules_lookup_lib.dom.d.ts__.ts'. ========
Info seq  [hh:mm:ss:mss] Explicitly specified module resolution kind: 'Node10'.
Info seq  [hh:mm:ss:mss] Loading module '@typescript/lib-dom' from 'node_modules' folder, target file types: TypeScript, Declaration.
Info seq  [hh:mm:ss:mss] Searching all ancestor node_modules directories for preferred extensions: TypeScript, Declaration.
Info seq  [hh:mm:ss:mss] Directory '/home/src/projects/project1/node_modules' does not exist, skipping all lookups in it.
Info seq  [hh:mm:ss:mss] Scoped package detected, looking in 'typescript__lib-dom'
Info seq  [hh:mm:ss:mss] File '/home/src/projects/node_modules/@typescript/lib-dom/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/projects/node_modules/@typescript/lib-dom.ts' does not exist.
Info seq  [hh:mm:ss:mss] File '/home/src/projects/node_modules/@typescript/lib-dom.tsx' does not exist.
Info seq  [hh:mm:ss:mss] File '/home/src/projects/node_modules/@typescript/lib-dom.d.ts' does not exist.
Info seq  [hh:mm:ss:mss] File '/home/src/projects/node_modules/@typescript/lib-dom/index.ts' does not exist.
Info seq  [hh:mm:ss:mss] File '/home/src/projects/node_modules/@typescript/lib-dom/index.tsx' does not exist.
Info seq  [hh:mm:ss:mss] File '/home/src/projects/node_modules/@typescript/lib-dom/index.d.ts' does not exist.
Info seq  [hh:mm:ss:mss] Directory '/home/src/projects/node_modules/@types' does not exist, skipping all lookups in it.
Info seq  [hh:mm:ss:mss] Scoped package detected, looking in 'typescript__lib-dom'
Info seq  [hh:mm:ss:mss] Directory '/home/src/node_modules' does not exist, skipping all lookups in it.
Info seq  [hh:mm:ss:mss] Scoped package detected, looking in 'typescript__lib-dom'
Info seq  [hh:mm:ss:mss] Directory '/home/node_modules' does not exist, skipping all lookups in it.
Info seq  [hh:mm:ss:mss] Scoped package detected, looking in 'typescript__lib-dom'
Info seq  [hh:mm:ss:mss] Directory '/node_modules' does not exist, skipping all lookups in it.
Info seq  [hh:mm:ss:mss] Scoped package detected, looking in 'typescript__lib-dom'
Info seq  [hh:mm:ss:mss] Loading module '@typescript/lib-dom' from 'node_modules' folder, target file types: JavaScript.
Info seq  [hh:mm:ss:mss] Searching all ancestor node_modules directories for fallback extensions: JavaScript.
Info seq  [hh:mm:ss:mss] Directory '/home/src/projects/project1/node_modules' does not exist, skipping all lookups in it.
Info seq  [hh:mm:ss:mss] File '/home/src/projects/node_modules/@typescript/lib-dom/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/projects/node_modules/@typescript/lib-dom.js' does not exist.
Info seq  [hh:mm:ss:mss] File '/home/src/projects/node_modules/@typescript/lib-dom.jsx' does not exist.
Info seq  [hh:mm:ss:mss] File '/home/src/projects/node_modules/@typescript/lib-dom/index.js' does not exist.
Info seq  [hh:mm:ss:mss] File '/home/src/projects/node_modules/@typescript/lib-dom/index.jsx' does not exist.
Info seq  [hh:mm:ss:mss] Directory '/home/src/node_modules' does not exist, skipping all lookups in it.
Info seq  [hh:mm:ss:mss] Directory '/home/node_modules' does not exist, skipping all lookups in it.
Info seq  [hh:mm:ss:mss] Directory '/node_modules' does not exist, skipping all lookups in it.
Info seq  [hh:mm:ss:mss] ======== Module name '@typescript/lib-dom' was not resolved. ========
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/lib/lib.dom.d.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] FileWatcher:: Close:: WatchInfo: /home/src/projects/node_modules/@typescript/lib-dom/package.json 2000 undefined Project: /home/src/projects/project1/tsconfig.json WatchType: File location affecting resolution
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: /home/src/projects/project1/tsconfig.json projectStateVersion: 2 projectProgramVersion: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Project '/home/src/projects/project1/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (10)
	/home/src/lib/lib.dom.d.ts Text-1 "interface DOMInterface { }"
	/home/src/projects/node_modules/@typescript/lib-webworker/index.d.ts Text-1 "interface WebworkerInterface { }"
	/home/src/projects/node_modules/@typescript/lib-scripthost/index.d.ts Text-1 "interface ScriptHostInterface { }"
	/home/src/projects/node_modules/@typescript/lib-es5/index.d.ts Text-1 "/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };"
	/home/src/projects/project1/core.d.ts Text-1 "export const core = 10;"
	/home/src/projects/project1/file.ts Text-1 "export const file = 10;"
	/home/src/projects/project1/file2.ts Text-1 "/// <reference lib=\"webworker\"/>\n/// <reference lib=\"scripthost\"/>\n/// <reference lib=\"es5\"/>\n"
	/home/src/projects/project1/index.ts SVC-1-0 "export const x = \"type1\";"
	/home/src/projects/project1/utils.d.ts Text-1 "export const y = 10;"
	/home/src/projects/project1/typeroot1/sometype/index.d.ts Text-1 "export type TheNum = \"type1\";"


	../../lib/lib.dom.d.ts
	  Library 'lib.dom.d.ts' specified in compilerOptions
	../node_modules/@typescript/lib-webworker/index.d.ts
	  Library referenced via 'webworker' from file 'file2.ts'
	../node_modules/@typescript/lib-scripthost/index.d.ts
	  Library referenced via 'scripthost' from file 'file2.ts'
	../node_modules/@typescript/lib-es5/index.d.ts
	  Library referenced via 'es5' from file 'file2.ts'
	  Library 'lib.es5.d.ts' specified in compilerOptions
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
Info seq  [hh:mm:ss:mss] Project '/home/src/projects/project1/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (10)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: /home/src/projects/project1/index.ts ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /home/src/projects/project1/tsconfig.json
Info seq  [hh:mm:ss:mss] After ensureProjectForOpenFiles:
Info seq  [hh:mm:ss:mss] Project '/home/src/projects/project1/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (10)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: /home/src/projects/project1/index.ts ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /home/src/projects/project1/tsconfig.json
Info seq  [hh:mm:ss:mss] got projects updated in background /home/src/projects/project1/index.ts
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "projectsUpdatedInBackground",
      "body": {
        "openFiles": [
          "/home/src/projects/project1/index.ts"
        ]
      }
    }
After running Timeout callback:: count: 0

PolledWatches::
/home/src/projects/node_modules/@typescript/lib-es5/package.json:
  {"pollingInterval":2000}
/home/src/projects/node_modules/@typescript/lib-scripthost/package.json:
  {"pollingInterval":2000}
/home/src/projects/node_modules/@typescript/lib-webworker/package.json:
  {"pollingInterval":2000}
/home/src/projects/node_modules/@typescript/package.json:
  {"pollingInterval":2000}
/home/src/projects/node_modules/package.json:
  {"pollingInterval":2000}
/home/src/projects/package.json:
  {"pollingInterval":2000}
/home/src/projects/project1/node_modules:
  {"pollingInterval":500}

PolledWatches *deleted*::
/home/src/projects/node_modules/@typescript/lib-dom/package.json:
  {"pollingInterval":2000}

FsWatches::
/home/src/lib/lib.dom.d.ts: *new*
  {}
/home/src/projects/project1/core.d.ts:
  {}
/home/src/projects/project1/file.ts:
  {}
/home/src/projects/project1/file2.ts:
  {}
/home/src/projects/project1/tsconfig.json:
  {}
/home/src/projects/project1/typeroot1/sometype/index.d.ts:
  {}
/home/src/projects/project1/utils.d.ts:
  {}

FsWatchesRecursive::
/home/src/projects/node_modules:
  {}
/home/src/projects/project1:
  {}
/home/src/projects/project1/typeroot1:
  {}

Projects::
/home/src/projects/project1/tsconfig.json (Configured) *changed*
    projectStateVersion: 2
    projectProgramVersion: 2 *changed*
    dirty: false *changed*

ScriptInfos::
/home/src/lib/lib.dom.d.ts *new*
    version: Text-1
    containingProjects: 1
        /home/src/projects/project1/tsconfig.json
/home/src/projects/node_modules/@typescript/lib-dom/index.d.ts
    version: Text-1
    pendingReloadFromDisk: true
    deferredDelete: true
    containingProjects: 0
/home/src/projects/node_modules/@typescript/lib-es5/index.d.ts
    version: Text-1
    containingProjects: 1
        /home/src/projects/project1/tsconfig.json
/home/src/projects/node_modules/@typescript/lib-scripthost/index.d.ts
    version: Text-1
    containingProjects: 1
        /home/src/projects/project1/tsconfig.json
/home/src/projects/node_modules/@typescript/lib-webworker/index.d.ts
    version: Text-1
    containingProjects: 1
        /home/src/projects/project1/tsconfig.json
/home/src/projects/project1/core.d.ts
    version: Text-1
    containingProjects: 1
        /home/src/projects/project1/tsconfig.json
/home/src/projects/project1/file.ts
    version: Text-1
    containingProjects: 1
        /home/src/projects/project1/tsconfig.json
/home/src/projects/project1/file2.ts
    version: Text-1
    containingProjects: 1
        /home/src/projects/project1/tsconfig.json
/home/src/projects/project1/index.ts (Open)
    version: SVC-1-0
    containingProjects: 1
        /home/src/projects/project1/tsconfig.json *default*
/home/src/projects/project1/typeroot1/sometype/index.d.ts
    version: Text-1
    containingProjects: 1
        /home/src/projects/project1/tsconfig.json
/home/src/projects/project1/utils.d.ts
    version: Text-1
    containingProjects: 1
        /home/src/projects/project1/tsconfig.json

Info seq  [hh:mm:ss:mss] FileWatcher:: Triggered with /home/src/projects/project1/file.ts 1:: WatchInfo: /home/src/projects/project1/file.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] Scheduled: /home/src/projects/project1/tsconfig.json
Info seq  [hh:mm:ss:mss] Scheduled: *ensureProjectForOpenFiles*
Info seq  [hh:mm:ss:mss] Elapsed:: *ms FileWatcher:: Triggered with /home/src/projects/project1/file.ts 1:: WatchInfo: /home/src/projects/project1/file.ts 500 undefined WatchType: Closed Script info
Before running Timeout callback:: count: 2
4: /home/src/projects/project1/tsconfig.json
5: *ensureProjectForOpenFiles*
//// [/home/src/projects/project1/file.ts]
export const file = 10;export const xyz = 10;


Timeout callback:: count: 2
4: /home/src/projects/project1/tsconfig.json *new*
5: *ensureProjectForOpenFiles* *new*

Projects::
/home/src/projects/project1/tsconfig.json (Configured) *changed*
    projectStateVersion: 3 *changed*
    projectProgramVersion: 2
    dirty: true *changed*

ScriptInfos::
/home/src/lib/lib.dom.d.ts
    version: Text-1
    containingProjects: 1
        /home/src/projects/project1/tsconfig.json
/home/src/projects/node_modules/@typescript/lib-dom/index.d.ts
    version: Text-1
    pendingReloadFromDisk: true
    deferredDelete: true
    containingProjects: 0
/home/src/projects/node_modules/@typescript/lib-es5/index.d.ts
    version: Text-1
    containingProjects: 1
        /home/src/projects/project1/tsconfig.json
/home/src/projects/node_modules/@typescript/lib-scripthost/index.d.ts
    version: Text-1
    containingProjects: 1
        /home/src/projects/project1/tsconfig.json
/home/src/projects/node_modules/@typescript/lib-webworker/index.d.ts
    version: Text-1
    containingProjects: 1
        /home/src/projects/project1/tsconfig.json
/home/src/projects/project1/core.d.ts
    version: Text-1
    containingProjects: 1
        /home/src/projects/project1/tsconfig.json
/home/src/projects/project1/file.ts *changed*
    version: Text-1
    pendingReloadFromDisk: true *changed*
    containingProjects: 1
        /home/src/projects/project1/tsconfig.json
/home/src/projects/project1/file2.ts
    version: Text-1
    containingProjects: 1
        /home/src/projects/project1/tsconfig.json
/home/src/projects/project1/index.ts (Open)
    version: SVC-1-0
    containingProjects: 1
        /home/src/projects/project1/tsconfig.json *default*
/home/src/projects/project1/typeroot1/sometype/index.d.ts
    version: Text-1
    containingProjects: 1
        /home/src/projects/project1/tsconfig.json
/home/src/projects/project1/utils.d.ts
    version: Text-1
    containingProjects: 1
        /home/src/projects/project1/tsconfig.json

Info seq  [hh:mm:ss:mss] Running: /home/src/projects/project1/tsconfig.json
Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: /home/src/projects/project1/tsconfig.json
Info seq  [hh:mm:ss:mss] File '/home/src/projects/node_modules/@typescript/lib-webworker/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/projects/node_modules/@typescript/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/projects/node_modules/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/projects/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/projects/node_modules/@typescript/lib-scripthost/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/projects/node_modules/@typescript/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/projects/node_modules/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/projects/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/projects/node_modules/@typescript/lib-es5/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/projects/node_modules/@typescript/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/projects/node_modules/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/projects/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] Reusing resolution of module '@typescript/lib-webworker' from '/home/src/projects/project1/__lib_node_modules_lookup_lib.webworker.d.ts__.ts' of old program, it was successfully resolved to '/home/src/projects/node_modules/@typescript/lib-webworker/index.d.ts'.
Info seq  [hh:mm:ss:mss] Reusing resolution of module '@typescript/lib-scripthost' from '/home/src/projects/project1/__lib_node_modules_lookup_lib.scripthost.d.ts__.ts' of old program, it was successfully resolved to '/home/src/projects/node_modules/@typescript/lib-scripthost/index.d.ts'.
Info seq  [hh:mm:ss:mss] Reusing resolution of module '@typescript/lib-es5' from '/home/src/projects/project1/__lib_node_modules_lookup_lib.es5.d.ts__.ts' of old program, it was successfully resolved to '/home/src/projects/node_modules/@typescript/lib-es5/index.d.ts'.
Info seq  [hh:mm:ss:mss] Reusing resolution of module '@typescript/lib-dom' from '/home/src/projects/project1/__lib_node_modules_lookup_lib.dom.d.ts__.ts' of old program, it was not resolved.
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: /home/src/projects/project1/tsconfig.json projectStateVersion: 3 projectProgramVersion: 2 structureChanged: false structureIsReused:: Completely Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Project '/home/src/projects/project1/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (10)
	/home/src/lib/lib.dom.d.ts Text-1 "interface DOMInterface { }"
	/home/src/projects/node_modules/@typescript/lib-webworker/index.d.ts Text-1 "interface WebworkerInterface { }"
	/home/src/projects/node_modules/@typescript/lib-scripthost/index.d.ts Text-1 "interface ScriptHostInterface { }"
	/home/src/projects/node_modules/@typescript/lib-es5/index.d.ts Text-1 "/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };"
	/home/src/projects/project1/core.d.ts Text-1 "export const core = 10;"
	/home/src/projects/project1/file.ts Text-2 "export const file = 10;export const xyz = 10;"
	/home/src/projects/project1/file2.ts Text-1 "/// <reference lib=\"webworker\"/>\n/// <reference lib=\"scripthost\"/>\n/// <reference lib=\"es5\"/>\n"
	/home/src/projects/project1/index.ts SVC-1-0 "export const x = \"type1\";"
	/home/src/projects/project1/utils.d.ts Text-1 "export const y = 10;"
	/home/src/projects/project1/typeroot1/sometype/index.d.ts Text-1 "export type TheNum = \"type1\";"

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Running: *ensureProjectForOpenFiles*
Info seq  [hh:mm:ss:mss] Before ensureProjectForOpenFiles:
Info seq  [hh:mm:ss:mss] Project '/home/src/projects/project1/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (10)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: /home/src/projects/project1/index.ts ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /home/src/projects/project1/tsconfig.json
Info seq  [hh:mm:ss:mss] After ensureProjectForOpenFiles:
Info seq  [hh:mm:ss:mss] Project '/home/src/projects/project1/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (10)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: /home/src/projects/project1/index.ts ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /home/src/projects/project1/tsconfig.json
Info seq  [hh:mm:ss:mss] got projects updated in background /home/src/projects/project1/index.ts
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "projectsUpdatedInBackground",
      "body": {
        "openFiles": [
          "/home/src/projects/project1/index.ts"
        ]
      }
    }
After running Timeout callback:: count: 0

Projects::
/home/src/projects/project1/tsconfig.json (Configured) *changed*
    projectStateVersion: 3
    projectProgramVersion: 2
    dirty: false *changed*

ScriptInfos::
/home/src/lib/lib.dom.d.ts
    version: Text-1
    containingProjects: 1
        /home/src/projects/project1/tsconfig.json
/home/src/projects/node_modules/@typescript/lib-dom/index.d.ts
    version: Text-1
    pendingReloadFromDisk: true
    deferredDelete: true
    containingProjects: 0
/home/src/projects/node_modules/@typescript/lib-es5/index.d.ts
    version: Text-1
    containingProjects: 1
        /home/src/projects/project1/tsconfig.json
/home/src/projects/node_modules/@typescript/lib-scripthost/index.d.ts
    version: Text-1
    containingProjects: 1
        /home/src/projects/project1/tsconfig.json
/home/src/projects/node_modules/@typescript/lib-webworker/index.d.ts
    version: Text-1
    containingProjects: 1
        /home/src/projects/project1/tsconfig.json
/home/src/projects/project1/core.d.ts
    version: Text-1
    containingProjects: 1
        /home/src/projects/project1/tsconfig.json
/home/src/projects/project1/file.ts *changed*
    version: Text-2 *changed*
    pendingReloadFromDisk: false *changed*
    containingProjects: 1
        /home/src/projects/project1/tsconfig.json
/home/src/projects/project1/file2.ts
    version: Text-1
    containingProjects: 1
        /home/src/projects/project1/tsconfig.json
/home/src/projects/project1/index.ts (Open)
    version: SVC-1-0
    containingProjects: 1
        /home/src/projects/project1/tsconfig.json *default*
/home/src/projects/project1/typeroot1/sometype/index.d.ts
    version: Text-1
    containingProjects: 1
        /home/src/projects/project1/tsconfig.json
/home/src/projects/project1/utils.d.ts
    version: Text-1
    containingProjects: 1
        /home/src/projects/project1/tsconfig.json

Info seq  [hh:mm:ss:mss] FileWatcher:: Triggered with /home/src/projects/project1/core.d.ts 2:: WatchInfo: /home/src/projects/project1/core.d.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] Scheduled: /home/src/projects/project1/tsconfig.json
Info seq  [hh:mm:ss:mss] Scheduled: *ensureProjectForOpenFiles*
Info seq  [hh:mm:ss:mss] Elapsed:: *ms FileWatcher:: Triggered with /home/src/projects/project1/core.d.ts 2:: WatchInfo: /home/src/projects/project1/core.d.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Triggered with /home/src/projects/project1/core.d.ts :: WatchInfo: /home/src/projects/project1 1 undefined Config: /home/src/projects/project1/tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] Scheduled: /home/src/projects/project1/tsconfig.json, Cancelled earlier one
Info seq  [hh:mm:ss:mss] Scheduled: *ensureProjectForOpenFiles*, Cancelled earlier one
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Triggered with /home/src/projects/project1/core.d.ts :: WatchInfo: /home/src/projects/project1 1 undefined Config: /home/src/projects/project1/tsconfig.json WatchType: Wild card directory
Before running Timeout callback:: count: 2
8: /home/src/projects/project1/tsconfig.json
9: *ensureProjectForOpenFiles*
//// [/home/src/projects/project1/core.d.ts] deleted

Timeout callback:: count: 2
8: /home/src/projects/project1/tsconfig.json *new*
9: *ensureProjectForOpenFiles* *new*

Projects::
/home/src/projects/project1/tsconfig.json (Configured) *changed*
    projectStateVersion: 4 *changed*
    projectProgramVersion: 2
    dirty: true *changed*

ScriptInfos::
/home/src/lib/lib.dom.d.ts
    version: Text-1
    containingProjects: 1
        /home/src/projects/project1/tsconfig.json
/home/src/projects/node_modules/@typescript/lib-dom/index.d.ts
    version: Text-1
    pendingReloadFromDisk: true
    deferredDelete: true
    containingProjects: 0
/home/src/projects/node_modules/@typescript/lib-es5/index.d.ts
    version: Text-1
    containingProjects: 1
        /home/src/projects/project1/tsconfig.json
/home/src/projects/node_modules/@typescript/lib-scripthost/index.d.ts
    version: Text-1
    containingProjects: 1
        /home/src/projects/project1/tsconfig.json
/home/src/projects/node_modules/@typescript/lib-webworker/index.d.ts
    version: Text-1
    containingProjects: 1
        /home/src/projects/project1/tsconfig.json
/home/src/projects/project1/core.d.ts *changed*
    version: Text-1
    pendingReloadFromDisk: true *changed*
    deferredDelete: true *changed*
    containingProjects: 0 *changed*
        /home/src/projects/project1/tsconfig.json *deleted*
/home/src/projects/project1/file.ts
    version: Text-2
    containingProjects: 1
        /home/src/projects/project1/tsconfig.json
/home/src/projects/project1/file2.ts
    version: Text-1
    containingProjects: 1
        /home/src/projects/project1/tsconfig.json
/home/src/projects/project1/index.ts (Open)
    version: SVC-1-0
    containingProjects: 1
        /home/src/projects/project1/tsconfig.json *default*
/home/src/projects/project1/typeroot1/sometype/index.d.ts
    version: Text-1
    containingProjects: 1
        /home/src/projects/project1/tsconfig.json
/home/src/projects/project1/utils.d.ts
    version: Text-1
    containingProjects: 1
        /home/src/projects/project1/tsconfig.json

Info seq  [hh:mm:ss:mss] Running: /home/src/projects/project1/tsconfig.json
Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: /home/src/projects/project1/tsconfig.json
Info seq  [hh:mm:ss:mss] Reusing resolution of module '@typescript/lib-webworker' from '/home/src/projects/project1/__lib_node_modules_lookup_lib.webworker.d.ts__.ts' of old program, it was successfully resolved to '/home/src/projects/node_modules/@typescript/lib-webworker/index.d.ts'.
Info seq  [hh:mm:ss:mss] File '/home/src/projects/node_modules/@typescript/lib-webworker/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/projects/node_modules/@typescript/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/projects/node_modules/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/projects/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] Reusing resolution of module '@typescript/lib-scripthost' from '/home/src/projects/project1/__lib_node_modules_lookup_lib.scripthost.d.ts__.ts' of old program, it was successfully resolved to '/home/src/projects/node_modules/@typescript/lib-scripthost/index.d.ts'.
Info seq  [hh:mm:ss:mss] File '/home/src/projects/node_modules/@typescript/lib-scripthost/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/projects/node_modules/@typescript/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/projects/node_modules/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/projects/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] Reusing resolution of module '@typescript/lib-es5' from '/home/src/projects/project1/__lib_node_modules_lookup_lib.es5.d.ts__.ts' of old program, it was successfully resolved to '/home/src/projects/node_modules/@typescript/lib-es5/index.d.ts'.
Info seq  [hh:mm:ss:mss] File '/home/src/projects/node_modules/@typescript/lib-es5/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/projects/node_modules/@typescript/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/projects/node_modules/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/projects/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] Reusing resolution of type reference directive 'sometype' from '/home/src/projects/project1/__inferred type names__.ts' of old program, it was successfully resolved to '/home/src/projects/project1/typeroot1/sometype/index.d.ts'.
Info seq  [hh:mm:ss:mss] Reusing resolution of module '@typescript/lib-dom' from '/home/src/projects/project1/__lib_node_modules_lookup_lib.dom.d.ts__.ts' of old program, it was not resolved.
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: /home/src/projects/project1/tsconfig.json projectStateVersion: 4 projectProgramVersion: 2 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Project '/home/src/projects/project1/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (9)
	/home/src/lib/lib.dom.d.ts Text-1 "interface DOMInterface { }"
	/home/src/projects/node_modules/@typescript/lib-webworker/index.d.ts Text-1 "interface WebworkerInterface { }"
	/home/src/projects/node_modules/@typescript/lib-scripthost/index.d.ts Text-1 "interface ScriptHostInterface { }"
	/home/src/projects/node_modules/@typescript/lib-es5/index.d.ts Text-1 "/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };"
	/home/src/projects/project1/file.ts Text-2 "export const file = 10;export const xyz = 10;"
	/home/src/projects/project1/file2.ts Text-1 "/// <reference lib=\"webworker\"/>\n/// <reference lib=\"scripthost\"/>\n/// <reference lib=\"es5\"/>\n"
	/home/src/projects/project1/index.ts SVC-1-0 "export const x = \"type1\";"
	/home/src/projects/project1/utils.d.ts Text-1 "export const y = 10;"
	/home/src/projects/project1/typeroot1/sometype/index.d.ts Text-1 "export type TheNum = \"type1\";"


	../../lib/lib.dom.d.ts
	  Library 'lib.dom.d.ts' specified in compilerOptions
	../node_modules/@typescript/lib-webworker/index.d.ts
	  Library referenced via 'webworker' from file 'file2.ts'
	../node_modules/@typescript/lib-scripthost/index.d.ts
	  Library referenced via 'scripthost' from file 'file2.ts'
	../node_modules/@typescript/lib-es5/index.d.ts
	  Library referenced via 'es5' from file 'file2.ts'
	  Library 'lib.es5.d.ts' specified in compilerOptions
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
Info seq  [hh:mm:ss:mss] Project '/home/src/projects/project1/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (9)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: /home/src/projects/project1/index.ts ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /home/src/projects/project1/tsconfig.json
Info seq  [hh:mm:ss:mss] After ensureProjectForOpenFiles:
Info seq  [hh:mm:ss:mss] Project '/home/src/projects/project1/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (9)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: /home/src/projects/project1/index.ts ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /home/src/projects/project1/tsconfig.json
Info seq  [hh:mm:ss:mss] got projects updated in background /home/src/projects/project1/index.ts
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "projectsUpdatedInBackground",
      "body": {
        "openFiles": [
          "/home/src/projects/project1/index.ts"
        ]
      }
    }
After running Timeout callback:: count: 0

Projects::
/home/src/projects/project1/tsconfig.json (Configured) *changed*
    projectStateVersion: 4
    projectProgramVersion: 3 *changed*
    dirty: false *changed*

Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Triggered with /home/src/projects/node_modules/@typescript/lib-dom/index.d.ts :: WatchInfo: /home/src/projects/node_modules 1 undefined Project: /home/src/projects/project1/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Scheduled: /home/src/projects/project1/tsconfig.jsonFailedLookupInvalidation
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Triggered with /home/src/projects/node_modules/@typescript/lib-dom/index.d.ts :: WatchInfo: /home/src/projects/node_modules 1 undefined Project: /home/src/projects/project1/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Triggered with /home/src/projects/node_modules/@typescript/lib-dom/index.d.ts :: WatchInfo: /home/src/projects/node_modules 1 undefined WatchType: node_modules for closed script infos and package.jsons affecting module specifier cache
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Triggered with /home/src/projects/node_modules/@typescript/lib-dom/index.d.ts :: WatchInfo: /home/src/projects/node_modules 1 undefined WatchType: node_modules for closed script infos and package.jsons affecting module specifier cache
Before running Timeout callback:: count: 1
10: /home/src/projects/project1/tsconfig.jsonFailedLookupInvalidation
//// [/home/src/projects/node_modules/@typescript/lib-dom/index.d.ts]
interface DOMInterface { }


Timeout callback:: count: 1
10: /home/src/projects/project1/tsconfig.jsonFailedLookupInvalidation *new*

ScriptInfos::
/home/src/lib/lib.dom.d.ts
    version: Text-1
    containingProjects: 1
        /home/src/projects/project1/tsconfig.json
/home/src/projects/node_modules/@typescript/lib-dom/index.d.ts *changed*
    version: Text-1
    pendingReloadFromDisk: true
    deferredDelete: undefined *changed*
    containingProjects: 0
/home/src/projects/node_modules/@typescript/lib-es5/index.d.ts
    version: Text-1
    containingProjects: 1
        /home/src/projects/project1/tsconfig.json
/home/src/projects/node_modules/@typescript/lib-scripthost/index.d.ts
    version: Text-1
    containingProjects: 1
        /home/src/projects/project1/tsconfig.json
/home/src/projects/node_modules/@typescript/lib-webworker/index.d.ts
    version: Text-1
    containingProjects: 1
        /home/src/projects/project1/tsconfig.json
/home/src/projects/project1/core.d.ts
    version: Text-1
    pendingReloadFromDisk: true
    deferredDelete: true
    containingProjects: 0
/home/src/projects/project1/file.ts
    version: Text-2
    containingProjects: 1
        /home/src/projects/project1/tsconfig.json
/home/src/projects/project1/file2.ts
    version: Text-1
    containingProjects: 1
        /home/src/projects/project1/tsconfig.json
/home/src/projects/project1/index.ts (Open)
    version: SVC-1-0
    containingProjects: 1
        /home/src/projects/project1/tsconfig.json *default*
/home/src/projects/project1/typeroot1/sometype/index.d.ts
    version: Text-1
    containingProjects: 1
        /home/src/projects/project1/tsconfig.json
/home/src/projects/project1/utils.d.ts
    version: Text-1
    containingProjects: 1
        /home/src/projects/project1/tsconfig.json

Info seq  [hh:mm:ss:mss] Running: /home/src/projects/project1/tsconfig.jsonFailedLookupInvalidation
Info seq  [hh:mm:ss:mss] Scheduled: /home/src/projects/project1/tsconfig.json
Info seq  [hh:mm:ss:mss] Scheduled: *ensureProjectForOpenFiles*
After running Timeout callback:: count: 2

Timeout callback:: count: 2
11: /home/src/projects/project1/tsconfig.json *new*
12: *ensureProjectForOpenFiles* *new*

Projects::
/home/src/projects/project1/tsconfig.json (Configured) *changed*
    projectStateVersion: 5 *changed*
    projectProgramVersion: 3
    dirty: true *changed*

Before running Timeout callback:: count: 2
11: /home/src/projects/project1/tsconfig.json
12: *ensureProjectForOpenFiles*

Info seq  [hh:mm:ss:mss] Running: /home/src/projects/project1/tsconfig.json
Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: /home/src/projects/project1/tsconfig.json
Info seq  [hh:mm:ss:mss] File '/home/src/projects/node_modules/@typescript/lib-webworker/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/projects/node_modules/@typescript/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/projects/node_modules/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/projects/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/projects/node_modules/@typescript/lib-scripthost/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/projects/node_modules/@typescript/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/projects/node_modules/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/projects/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/projects/node_modules/@typescript/lib-es5/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/projects/node_modules/@typescript/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/projects/node_modules/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/projects/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] Reusing resolution of module '@typescript/lib-webworker' from '/home/src/projects/project1/__lib_node_modules_lookup_lib.webworker.d.ts__.ts' of old program, it was successfully resolved to '/home/src/projects/node_modules/@typescript/lib-webworker/index.d.ts'.
Info seq  [hh:mm:ss:mss] Reusing resolution of module '@typescript/lib-scripthost' from '/home/src/projects/project1/__lib_node_modules_lookup_lib.scripthost.d.ts__.ts' of old program, it was successfully resolved to '/home/src/projects/node_modules/@typescript/lib-scripthost/index.d.ts'.
Info seq  [hh:mm:ss:mss] Reusing resolution of module '@typescript/lib-es5' from '/home/src/projects/project1/__lib_node_modules_lookup_lib.es5.d.ts__.ts' of old program, it was successfully resolved to '/home/src/projects/node_modules/@typescript/lib-es5/index.d.ts'.
Info seq  [hh:mm:ss:mss] ======== Resolving module '@typescript/lib-dom' from '/home/src/projects/project1/__lib_node_modules_lookup_lib.dom.d.ts__.ts'. ========
Info seq  [hh:mm:ss:mss] Explicitly specified module resolution kind: 'Node10'.
Info seq  [hh:mm:ss:mss] Loading module '@typescript/lib-dom' from 'node_modules' folder, target file types: TypeScript, Declaration.
Info seq  [hh:mm:ss:mss] Searching all ancestor node_modules directories for preferred extensions: TypeScript, Declaration.
Info seq  [hh:mm:ss:mss] Directory '/home/src/projects/project1/node_modules' does not exist, skipping all lookups in it.
Info seq  [hh:mm:ss:mss] Scoped package detected, looking in 'typescript__lib-dom'
Info seq  [hh:mm:ss:mss] File '/home/src/projects/node_modules/@typescript/lib-dom/package.json' does not exist.
Info seq  [hh:mm:ss:mss] File '/home/src/projects/node_modules/@typescript/lib-dom.ts' does not exist.
Info seq  [hh:mm:ss:mss] File '/home/src/projects/node_modules/@typescript/lib-dom.tsx' does not exist.
Info seq  [hh:mm:ss:mss] File '/home/src/projects/node_modules/@typescript/lib-dom.d.ts' does not exist.
Info seq  [hh:mm:ss:mss] File '/home/src/projects/node_modules/@typescript/lib-dom/index.ts' does not exist.
Info seq  [hh:mm:ss:mss] File '/home/src/projects/node_modules/@typescript/lib-dom/index.tsx' does not exist.
Info seq  [hh:mm:ss:mss] File '/home/src/projects/node_modules/@typescript/lib-dom/index.d.ts' exists - use it as a name resolution result.
Info seq  [hh:mm:ss:mss] Resolving real path for '/home/src/projects/node_modules/@typescript/lib-dom/index.d.ts', result '/home/src/projects/node_modules/@typescript/lib-dom/index.d.ts'.
Info seq  [hh:mm:ss:mss] ======== Module name '@typescript/lib-dom' was successfully resolved to '/home/src/projects/node_modules/@typescript/lib-dom/index.d.ts'. ========
Info seq  [hh:mm:ss:mss] File '/home/src/projects/node_modules/@typescript/lib-webworker/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/projects/node_modules/@typescript/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/projects/node_modules/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/projects/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/projects/node_modules/@typescript/lib-scripthost/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/projects/node_modules/@typescript/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/projects/node_modules/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/projects/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/projects/node_modules/@typescript/lib-es5/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/projects/node_modules/@typescript/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/projects/node_modules/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/projects/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] Reusing resolution of type reference directive 'sometype' from '/home/src/projects/project1/__inferred type names__.ts' of old program, it was successfully resolved to '/home/src/projects/project1/typeroot1/sometype/index.d.ts'.
Info seq  [hh:mm:ss:mss] File '/home/src/projects/node_modules/@typescript/lib-dom/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/projects/node_modules/@typescript/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/projects/node_modules/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/projects/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/projects/node_modules/@typescript/lib-dom/package.json 2000 undefined Project: /home/src/projects/project1/tsconfig.json WatchType: File location affecting resolution
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: /home/src/projects/project1/tsconfig.json projectStateVersion: 5 projectProgramVersion: 3 structureChanged: true structureIsReused:: SafeModules Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Project '/home/src/projects/project1/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (9)
	/home/src/projects/node_modules/@typescript/lib-webworker/index.d.ts Text-1 "interface WebworkerInterface { }"
	/home/src/projects/node_modules/@typescript/lib-scripthost/index.d.ts Text-1 "interface ScriptHostInterface { }"
	/home/src/projects/node_modules/@typescript/lib-es5/index.d.ts Text-1 "/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };"
	/home/src/projects/node_modules/@typescript/lib-dom/index.d.ts Text-1 "interface DOMInterface { }"
	/home/src/projects/project1/file.ts Text-2 "export const file = 10;export const xyz = 10;"
	/home/src/projects/project1/file2.ts Text-1 "/// <reference lib=\"webworker\"/>\n/// <reference lib=\"scripthost\"/>\n/// <reference lib=\"es5\"/>\n"
	/home/src/projects/project1/index.ts SVC-1-0 "export const x = \"type1\";"
	/home/src/projects/project1/utils.d.ts Text-1 "export const y = 10;"
	/home/src/projects/project1/typeroot1/sometype/index.d.ts Text-1 "export type TheNum = \"type1\";"


	../node_modules/@typescript/lib-webworker/index.d.ts
	  Library referenced via 'webworker' from file 'file2.ts'
	../node_modules/@typescript/lib-scripthost/index.d.ts
	  Library referenced via 'scripthost' from file 'file2.ts'
	../node_modules/@typescript/lib-es5/index.d.ts
	  Library referenced via 'es5' from file 'file2.ts'
	  Library 'lib.es5.d.ts' specified in compilerOptions
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
Info seq  [hh:mm:ss:mss] Project '/home/src/projects/project1/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (9)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: /home/src/projects/project1/index.ts ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /home/src/projects/project1/tsconfig.json
Info seq  [hh:mm:ss:mss] After ensureProjectForOpenFiles:
Info seq  [hh:mm:ss:mss] Project '/home/src/projects/project1/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (9)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: /home/src/projects/project1/index.ts ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /home/src/projects/project1/tsconfig.json
Info seq  [hh:mm:ss:mss] got projects updated in background /home/src/projects/project1/index.ts
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "projectsUpdatedInBackground",
      "body": {
        "openFiles": [
          "/home/src/projects/project1/index.ts"
        ]
      }
    }
After running Timeout callback:: count: 0

PolledWatches::
/home/src/projects/node_modules/@typescript/lib-dom/package.json: *new*
  {"pollingInterval":2000}
/home/src/projects/node_modules/@typescript/lib-es5/package.json:
  {"pollingInterval":2000}
/home/src/projects/node_modules/@typescript/lib-scripthost/package.json:
  {"pollingInterval":2000}
/home/src/projects/node_modules/@typescript/lib-webworker/package.json:
  {"pollingInterval":2000}
/home/src/projects/node_modules/@typescript/package.json:
  {"pollingInterval":2000}
/home/src/projects/node_modules/package.json:
  {"pollingInterval":2000}
/home/src/projects/package.json:
  {"pollingInterval":2000}
/home/src/projects/project1/node_modules:
  {"pollingInterval":500}

FsWatches::
/home/src/lib/lib.dom.d.ts:
  {}
/home/src/projects/project1/core.d.ts:
  {}
/home/src/projects/project1/file.ts:
  {}
/home/src/projects/project1/file2.ts:
  {}
/home/src/projects/project1/tsconfig.json:
  {}
/home/src/projects/project1/typeroot1/sometype/index.d.ts:
  {}
/home/src/projects/project1/utils.d.ts:
  {}

FsWatchesRecursive::
/home/src/projects/node_modules:
  {}
/home/src/projects/project1:
  {}
/home/src/projects/project1/typeroot1:
  {}

Projects::
/home/src/projects/project1/tsconfig.json (Configured) *changed*
    projectStateVersion: 5
    projectProgramVersion: 4 *changed*
    dirty: false *changed*

ScriptInfos::
/home/src/lib/lib.dom.d.ts *changed*
    version: Text-1
    containingProjects: 0 *changed*
        /home/src/projects/project1/tsconfig.json *deleted*
/home/src/projects/node_modules/@typescript/lib-dom/index.d.ts *changed*
    version: Text-1
    pendingReloadFromDisk: false *changed*
    containingProjects: 1 *changed*
        /home/src/projects/project1/tsconfig.json *new*
/home/src/projects/node_modules/@typescript/lib-es5/index.d.ts
    version: Text-1
    containingProjects: 1
        /home/src/projects/project1/tsconfig.json
/home/src/projects/node_modules/@typescript/lib-scripthost/index.d.ts
    version: Text-1
    containingProjects: 1
        /home/src/projects/project1/tsconfig.json
/home/src/projects/node_modules/@typescript/lib-webworker/index.d.ts
    version: Text-1
    containingProjects: 1
        /home/src/projects/project1/tsconfig.json
/home/src/projects/project1/core.d.ts
    version: Text-1
    pendingReloadFromDisk: true
    deferredDelete: true
    containingProjects: 0
/home/src/projects/project1/file.ts
    version: Text-2
    containingProjects: 1
        /home/src/projects/project1/tsconfig.json
/home/src/projects/project1/file2.ts
    version: Text-1
    containingProjects: 1
        /home/src/projects/project1/tsconfig.json
/home/src/projects/project1/index.ts (Open)
    version: SVC-1-0
    containingProjects: 1
        /home/src/projects/project1/tsconfig.json *default*
/home/src/projects/project1/typeroot1/sometype/index.d.ts
    version: Text-1
    containingProjects: 1
        /home/src/projects/project1/tsconfig.json
/home/src/projects/project1/utils.d.ts
    version: Text-1
    containingProjects: 1
        /home/src/projects/project1/tsconfig.json

Info seq  [hh:mm:ss:mss] FileWatcher:: Triggered with /home/src/projects/project1/tsconfig.json 1:: WatchInfo: /home/src/projects/project1/tsconfig.json 2000 undefined Project: /home/src/projects/project1/tsconfig.json WatchType: Config file
Info seq  [hh:mm:ss:mss] Scheduled: /home/src/projects/project1/tsconfig.json
Info seq  [hh:mm:ss:mss] getConfigFileNameForFile:: File: /home/src/projects/project1/index.ts ProjectRootPath: undefined:: Result: /home/src/projects/project1/tsconfig.json
Info seq  [hh:mm:ss:mss] Scheduled: *ensureProjectForOpenFiles*
Info seq  [hh:mm:ss:mss] Elapsed:: *ms FileWatcher:: Triggered with /home/src/projects/project1/tsconfig.json 1:: WatchInfo: /home/src/projects/project1/tsconfig.json 2000 undefined Project: /home/src/projects/project1/tsconfig.json WatchType: Config file
Before running Timeout callback:: count: 2
13: /home/src/projects/project1/tsconfig.json
14: *ensureProjectForOpenFiles*
//// [/home/src/projects/project1/tsconfig.json]
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
    "traceResolution": true
  }
}


Timeout callback:: count: 2
13: /home/src/projects/project1/tsconfig.json *new*
14: *ensureProjectForOpenFiles* *new*

Projects::
/home/src/projects/project1/tsconfig.json (Configured) *changed*
    projectStateVersion: 6 *changed*
    projectProgramVersion: 4
    dirty: true *changed*

Info seq  [hh:mm:ss:mss] Running: /home/src/projects/project1/tsconfig.json
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "projectLoadingStart",
      "body": {
        "projectName": "/home/src/projects/project1/tsconfig.json",
        "reason": "Change in config file detected"
      }
    }
Info seq  [hh:mm:ss:mss] Config: /home/src/projects/project1/tsconfig.json : {
 "rootNames": [
  "/home/src/projects/project1/file.ts",
  "/home/src/projects/project1/file2.ts",
  "/home/src/projects/project1/index.ts",
  "/home/src/projects/project1/utils.d.ts",
  "/home/src/projects/project1/typeroot1/sometype/index.d.ts"
 ],
 "options": {
  "composite": true,
  "typeRoots": [
   "/home/src/projects/project1/typeroot1",
   "/home/src/projects/project1/typeroot2"
  ],
  "lib": [
   "lib.es5.d.ts",
   "lib.dom.d.ts"
  ],
  "traceResolution": true,
  "configFilePath": "/home/src/projects/project1/tsconfig.json"
 }
}
Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: /home/src/projects/project1/tsconfig.json
Info seq  [hh:mm:ss:mss] Reusing resolution of module '@typescript/lib-webworker' from '/home/src/projects/project1/__lib_node_modules_lookup_lib.webworker.d.ts__.ts' of old program, it was successfully resolved to '/home/src/projects/node_modules/@typescript/lib-webworker/index.d.ts'.
Info seq  [hh:mm:ss:mss] File '/home/src/projects/node_modules/@typescript/lib-webworker/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/projects/node_modules/@typescript/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/projects/node_modules/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/projects/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] Reusing resolution of module '@typescript/lib-scripthost' from '/home/src/projects/project1/__lib_node_modules_lookup_lib.scripthost.d.ts__.ts' of old program, it was successfully resolved to '/home/src/projects/node_modules/@typescript/lib-scripthost/index.d.ts'.
Info seq  [hh:mm:ss:mss] File '/home/src/projects/node_modules/@typescript/lib-scripthost/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/projects/node_modules/@typescript/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/projects/node_modules/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/projects/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] Reusing resolution of module '@typescript/lib-es5' from '/home/src/projects/project1/__lib_node_modules_lookup_lib.es5.d.ts__.ts' of old program, it was successfully resolved to '/home/src/projects/node_modules/@typescript/lib-es5/index.d.ts'.
Info seq  [hh:mm:ss:mss] File '/home/src/projects/node_modules/@typescript/lib-es5/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/projects/node_modules/@typescript/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/projects/node_modules/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/projects/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] ======== Resolving type reference directive 'sometype', containing file '/home/src/projects/project1/__inferred type names__.ts', root directory '/home/src/projects/project1/typeroot1,/home/src/projects/project1/typeroot2'. ========
Info seq  [hh:mm:ss:mss] Resolving with primary search path '/home/src/projects/project1/typeroot1, /home/src/projects/project1/typeroot2'.
Info seq  [hh:mm:ss:mss] File '/home/src/projects/project1/typeroot1/sometype.d.ts' does not exist.
Info seq  [hh:mm:ss:mss] File '/home/src/projects/project1/typeroot1/sometype/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/projects/project1/typeroot1/sometype/index.d.ts' exists - use it as a name resolution result.
Info seq  [hh:mm:ss:mss] Resolving real path for '/home/src/projects/project1/typeroot1/sometype/index.d.ts', result '/home/src/projects/project1/typeroot1/sometype/index.d.ts'.
Info seq  [hh:mm:ss:mss] ======== Type reference directive 'sometype' was successfully resolved to '/home/src/projects/project1/typeroot1/sometype/index.d.ts', primary: true. ========
Info seq  [hh:mm:ss:mss] Reusing resolution of module '@typescript/lib-dom' from '/home/src/projects/project1/__lib_node_modules_lookup_lib.dom.d.ts__.ts' of old program, it was successfully resolved to '/home/src/projects/node_modules/@typescript/lib-dom/index.d.ts'.
Info seq  [hh:mm:ss:mss] File '/home/src/projects/node_modules/@typescript/lib-dom/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/projects/node_modules/@typescript/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/projects/node_modules/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/projects/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /home/src/projects/project1/typeroot2 1 undefined Project: /home/src/projects/project1/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /home/src/projects/project1/typeroot2 1 undefined Project: /home/src/projects/project1/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: /home/src/projects/project1/tsconfig.json projectStateVersion: 6 projectProgramVersion: 4 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Project '/home/src/projects/project1/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (9)
	/home/src/projects/node_modules/@typescript/lib-webworker/index.d.ts Text-1 "interface WebworkerInterface { }"
	/home/src/projects/node_modules/@typescript/lib-scripthost/index.d.ts Text-1 "interface ScriptHostInterface { }"
	/home/src/projects/node_modules/@typescript/lib-es5/index.d.ts Text-1 "/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };"
	/home/src/projects/node_modules/@typescript/lib-dom/index.d.ts Text-1 "interface DOMInterface { }"
	/home/src/projects/project1/file.ts Text-2 "export const file = 10;export const xyz = 10;"
	/home/src/projects/project1/file2.ts Text-1 "/// <reference lib=\"webworker\"/>\n/// <reference lib=\"scripthost\"/>\n/// <reference lib=\"es5\"/>\n"
	/home/src/projects/project1/index.ts SVC-1-0 "export const x = \"type1\";"
	/home/src/projects/project1/utils.d.ts Text-1 "export const y = 10;"
	/home/src/projects/project1/typeroot1/sometype/index.d.ts Text-1 "export type TheNum = \"type1\";"

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "projectLoadingFinish",
      "body": {
        "projectName": "/home/src/projects/project1/tsconfig.json"
      }
    }
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "configFileDiag",
      "body": {
        "triggerFile": "/home/src/projects/project1/tsconfig.json",
        "configFile": "/home/src/projects/project1/tsconfig.json",
        "diagnostics": []
      }
    }
Info seq  [hh:mm:ss:mss] Running: *ensureProjectForOpenFiles*
Info seq  [hh:mm:ss:mss] Before ensureProjectForOpenFiles:
Info seq  [hh:mm:ss:mss] Project '/home/src/projects/project1/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (9)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: /home/src/projects/project1/index.ts ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /home/src/projects/project1/tsconfig.json
Info seq  [hh:mm:ss:mss] getConfigFileNameForFile:: File: /home/src/projects/project1/tsconfig.json ProjectRootPath: undefined:: Result: undefined
Info seq  [hh:mm:ss:mss] After ensureProjectForOpenFiles:
Info seq  [hh:mm:ss:mss] Project '/home/src/projects/project1/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (9)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: /home/src/projects/project1/index.ts ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /home/src/projects/project1/tsconfig.json
Info seq  [hh:mm:ss:mss] got projects updated in background /home/src/projects/project1/index.ts
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "projectsUpdatedInBackground",
      "body": {
        "openFiles": [
          "/home/src/projects/project1/index.ts"
        ]
      }
    }
After running Timeout callback:: count: 0

PolledWatches::
/home/src/projects/node_modules/@typescript/lib-dom/package.json:
  {"pollingInterval":2000}
/home/src/projects/node_modules/@typescript/lib-es5/package.json:
  {"pollingInterval":2000}
/home/src/projects/node_modules/@typescript/lib-scripthost/package.json:
  {"pollingInterval":2000}
/home/src/projects/node_modules/@typescript/lib-webworker/package.json:
  {"pollingInterval":2000}
/home/src/projects/node_modules/@typescript/package.json:
  {"pollingInterval":2000}
/home/src/projects/node_modules/package.json:
  {"pollingInterval":2000}
/home/src/projects/package.json:
  {"pollingInterval":2000}
/home/src/projects/project1/node_modules:
  {"pollingInterval":500}
/home/src/projects/project1/typeroot2: *new*
  {"pollingInterval":500}

FsWatches::
/home/src/lib/lib.dom.d.ts:
  {}
/home/src/projects/project1/core.d.ts:
  {}
/home/src/projects/project1/file.ts:
  {}
/home/src/projects/project1/file2.ts:
  {}
/home/src/projects/project1/tsconfig.json:
  {}
/home/src/projects/project1/typeroot1/sometype/index.d.ts:
  {}
/home/src/projects/project1/utils.d.ts:
  {}

FsWatchesRecursive::
/home/src/projects/node_modules:
  {}
/home/src/projects/project1:
  {}
/home/src/projects/project1/typeroot1:
  {}

Projects::
/home/src/projects/project1/tsconfig.json (Configured) *changed*
    projectStateVersion: 6
    projectProgramVersion: 5 *changed*
    dirty: false *changed*

Info seq  [hh:mm:ss:mss] FileWatcher:: Triggered with /home/src/projects/project1/tsconfig.json 1:: WatchInfo: /home/src/projects/project1/tsconfig.json 2000 undefined Project: /home/src/projects/project1/tsconfig.json WatchType: Config file
Info seq  [hh:mm:ss:mss] Scheduled: /home/src/projects/project1/tsconfig.json
Info seq  [hh:mm:ss:mss] getConfigFileNameForFile:: File: /home/src/projects/project1/index.ts ProjectRootPath: undefined:: Result: /home/src/projects/project1/tsconfig.json
Info seq  [hh:mm:ss:mss] Scheduled: *ensureProjectForOpenFiles*
Info seq  [hh:mm:ss:mss] Elapsed:: *ms FileWatcher:: Triggered with /home/src/projects/project1/tsconfig.json 1:: WatchInfo: /home/src/projects/project1/tsconfig.json 2000 undefined Project: /home/src/projects/project1/tsconfig.json WatchType: Config file
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Triggered with /home/src/projects/node_modules/@typescript/lib-dom/index.d.ts :: WatchInfo: /home/src/projects/node_modules 1 undefined Project: /home/src/projects/project1/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Scheduled: /home/src/projects/project1/tsconfig.jsonFailedLookupInvalidation
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Triggered with /home/src/projects/node_modules/@typescript/lib-dom/index.d.ts :: WatchInfo: /home/src/projects/node_modules 1 undefined Project: /home/src/projects/project1/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Triggered with /home/src/projects/node_modules/@typescript/lib-dom/index.d.ts :: WatchInfo: /home/src/projects/node_modules 1 undefined WatchType: node_modules for closed script infos and package.jsons affecting module specifier cache
Info seq  [hh:mm:ss:mss] Scheduled: /home/src/projects/project1/tsconfig.json, Cancelled earlier one
Info seq  [hh:mm:ss:mss] Scheduled: *ensureProjectForOpenFiles*, Cancelled earlier one
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Triggered with /home/src/projects/node_modules/@typescript/lib-dom/index.d.ts :: WatchInfo: /home/src/projects/node_modules 1 undefined WatchType: node_modules for closed script infos and package.jsons affecting module specifier cache
Before running Timeout callback:: count: 3
17: /home/src/projects/project1/tsconfig.jsonFailedLookupInvalidation
18: /home/src/projects/project1/tsconfig.json
19: *ensureProjectForOpenFiles*
//// [/home/src/projects/project1/tsconfig.json]
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

//// [/home/src/projects/node_modules/@typescript/lib-dom/index.d.ts] deleted

Timeout callback:: count: 3
17: /home/src/projects/project1/tsconfig.jsonFailedLookupInvalidation *new*
18: /home/src/projects/project1/tsconfig.json *new*
19: *ensureProjectForOpenFiles* *new*

Projects::
/home/src/projects/project1/tsconfig.json (Configured) *changed*
    projectStateVersion: 7 *changed*
    projectProgramVersion: 5
    dirty: true *changed*

ScriptInfos::
/home/src/lib/lib.dom.d.ts
    version: Text-1
    containingProjects: 0
/home/src/projects/node_modules/@typescript/lib-dom/index.d.ts *changed*
    version: Text-1
    pendingReloadFromDisk: true *changed*
    deferredDelete: true *changed*
    containingProjects: 0 *changed*
        /home/src/projects/project1/tsconfig.json *deleted*
/home/src/projects/node_modules/@typescript/lib-es5/index.d.ts
    version: Text-1
    containingProjects: 1
        /home/src/projects/project1/tsconfig.json
/home/src/projects/node_modules/@typescript/lib-scripthost/index.d.ts
    version: Text-1
    containingProjects: 1
        /home/src/projects/project1/tsconfig.json
/home/src/projects/node_modules/@typescript/lib-webworker/index.d.ts
    version: Text-1
    containingProjects: 1
        /home/src/projects/project1/tsconfig.json
/home/src/projects/project1/core.d.ts
    version: Text-1
    pendingReloadFromDisk: true
    deferredDelete: true
    containingProjects: 0
/home/src/projects/project1/file.ts
    version: Text-2
    containingProjects: 1
        /home/src/projects/project1/tsconfig.json
/home/src/projects/project1/file2.ts
    version: Text-1
    containingProjects: 1
        /home/src/projects/project1/tsconfig.json
/home/src/projects/project1/index.ts (Open)
    version: SVC-1-0
    containingProjects: 1
        /home/src/projects/project1/tsconfig.json *default*
/home/src/projects/project1/typeroot1/sometype/index.d.ts
    version: Text-1
    containingProjects: 1
        /home/src/projects/project1/tsconfig.json
/home/src/projects/project1/utils.d.ts
    version: Text-1
    containingProjects: 1
        /home/src/projects/project1/tsconfig.json

Info seq  [hh:mm:ss:mss] Running: /home/src/projects/project1/tsconfig.jsonFailedLookupInvalidation
Info seq  [hh:mm:ss:mss] Running: /home/src/projects/project1/tsconfig.json
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "projectLoadingStart",
      "body": {
        "projectName": "/home/src/projects/project1/tsconfig.json",
        "reason": "Change in config file detected"
      }
    }
Info seq  [hh:mm:ss:mss] Config: /home/src/projects/project1/tsconfig.json : {
 "rootNames": [
  "/home/src/projects/project1/file.ts",
  "/home/src/projects/project1/file2.ts",
  "/home/src/projects/project1/index.ts",
  "/home/src/projects/project1/utils.d.ts",
  "/home/src/projects/project1/typeroot1/sometype/index.d.ts"
 ],
 "options": {
  "composite": true,
  "typeRoots": [
   "/home/src/projects/project1/typeroot1"
  ],
  "lib": [
   "lib.es5.d.ts",
   "lib.dom.d.ts"
  ],
  "traceResolution": true,
  "configFilePath": "/home/src/projects/project1/tsconfig.json"
 }
}
Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: /home/src/projects/project1/tsconfig.json
Info seq  [hh:mm:ss:mss] Reusing resolution of module '@typescript/lib-webworker' from '/home/src/projects/project1/__lib_node_modules_lookup_lib.webworker.d.ts__.ts' of old program, it was successfully resolved to '/home/src/projects/node_modules/@typescript/lib-webworker/index.d.ts'.
Info seq  [hh:mm:ss:mss] File '/home/src/projects/node_modules/@typescript/lib-webworker/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/projects/node_modules/@typescript/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/projects/node_modules/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/projects/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] Reusing resolution of module '@typescript/lib-scripthost' from '/home/src/projects/project1/__lib_node_modules_lookup_lib.scripthost.d.ts__.ts' of old program, it was successfully resolved to '/home/src/projects/node_modules/@typescript/lib-scripthost/index.d.ts'.
Info seq  [hh:mm:ss:mss] File '/home/src/projects/node_modules/@typescript/lib-scripthost/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/projects/node_modules/@typescript/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/projects/node_modules/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/projects/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] Reusing resolution of module '@typescript/lib-es5' from '/home/src/projects/project1/__lib_node_modules_lookup_lib.es5.d.ts__.ts' of old program, it was successfully resolved to '/home/src/projects/node_modules/@typescript/lib-es5/index.d.ts'.
Info seq  [hh:mm:ss:mss] File '/home/src/projects/node_modules/@typescript/lib-es5/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/projects/node_modules/@typescript/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/projects/node_modules/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/projects/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] ======== Resolving type reference directive 'sometype', containing file '/home/src/projects/project1/__inferred type names__.ts', root directory '/home/src/projects/project1/typeroot1'. ========
Info seq  [hh:mm:ss:mss] Resolving with primary search path '/home/src/projects/project1/typeroot1'.
Info seq  [hh:mm:ss:mss] File '/home/src/projects/project1/typeroot1/sometype.d.ts' does not exist.
Info seq  [hh:mm:ss:mss] File '/home/src/projects/project1/typeroot1/sometype/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/projects/project1/typeroot1/sometype/index.d.ts' exists - use it as a name resolution result.
Info seq  [hh:mm:ss:mss] Resolving real path for '/home/src/projects/project1/typeroot1/sometype/index.d.ts', result '/home/src/projects/project1/typeroot1/sometype/index.d.ts'.
Info seq  [hh:mm:ss:mss] ======== Type reference directive 'sometype' was successfully resolved to '/home/src/projects/project1/typeroot1/sometype/index.d.ts', primary: true. ========
Info seq  [hh:mm:ss:mss] ======== Resolving module '@typescript/lib-dom' from '/home/src/projects/project1/__lib_node_modules_lookup_lib.dom.d.ts__.ts'. ========
Info seq  [hh:mm:ss:mss] Explicitly specified module resolution kind: 'Node10'.
Info seq  [hh:mm:ss:mss] Loading module '@typescript/lib-dom' from 'node_modules' folder, target file types: TypeScript, Declaration.
Info seq  [hh:mm:ss:mss] Searching all ancestor node_modules directories for preferred extensions: TypeScript, Declaration.
Info seq  [hh:mm:ss:mss] Directory '/home/src/projects/project1/node_modules' does not exist, skipping all lookups in it.
Info seq  [hh:mm:ss:mss] Scoped package detected, looking in 'typescript__lib-dom'
Info seq  [hh:mm:ss:mss] File '/home/src/projects/node_modules/@typescript/lib-dom/package.json' does not exist.
Info seq  [hh:mm:ss:mss] File '/home/src/projects/node_modules/@typescript/lib-dom.ts' does not exist.
Info seq  [hh:mm:ss:mss] File '/home/src/projects/node_modules/@typescript/lib-dom.tsx' does not exist.
Info seq  [hh:mm:ss:mss] File '/home/src/projects/node_modules/@typescript/lib-dom.d.ts' does not exist.
Info seq  [hh:mm:ss:mss] File '/home/src/projects/node_modules/@typescript/lib-dom/index.ts' does not exist.
Info seq  [hh:mm:ss:mss] File '/home/src/projects/node_modules/@typescript/lib-dom/index.tsx' does not exist.
Info seq  [hh:mm:ss:mss] File '/home/src/projects/node_modules/@typescript/lib-dom/index.d.ts' does not exist.
Info seq  [hh:mm:ss:mss] Directory '/home/src/projects/node_modules/@types' does not exist, skipping all lookups in it.
Info seq  [hh:mm:ss:mss] Scoped package detected, looking in 'typescript__lib-dom'
Info seq  [hh:mm:ss:mss] Directory '/home/src/node_modules' does not exist, skipping all lookups in it.
Info seq  [hh:mm:ss:mss] Scoped package detected, looking in 'typescript__lib-dom'
Info seq  [hh:mm:ss:mss] Directory '/home/node_modules' does not exist, skipping all lookups in it.
Info seq  [hh:mm:ss:mss] Scoped package detected, looking in 'typescript__lib-dom'
Info seq  [hh:mm:ss:mss] Directory '/node_modules' does not exist, skipping all lookups in it.
Info seq  [hh:mm:ss:mss] Scoped package detected, looking in 'typescript__lib-dom'
Info seq  [hh:mm:ss:mss] Loading module '@typescript/lib-dom' from 'node_modules' folder, target file types: JavaScript.
Info seq  [hh:mm:ss:mss] Searching all ancestor node_modules directories for fallback extensions: JavaScript.
Info seq  [hh:mm:ss:mss] Directory '/home/src/projects/project1/node_modules' does not exist, skipping all lookups in it.
Info seq  [hh:mm:ss:mss] File '/home/src/projects/node_modules/@typescript/lib-dom/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/projects/node_modules/@typescript/lib-dom.js' does not exist.
Info seq  [hh:mm:ss:mss] File '/home/src/projects/node_modules/@typescript/lib-dom.jsx' does not exist.
Info seq  [hh:mm:ss:mss] File '/home/src/projects/node_modules/@typescript/lib-dom/index.js' does not exist.
Info seq  [hh:mm:ss:mss] File '/home/src/projects/node_modules/@typescript/lib-dom/index.jsx' does not exist.
Info seq  [hh:mm:ss:mss] Directory '/home/src/node_modules' does not exist, skipping all lookups in it.
Info seq  [hh:mm:ss:mss] Directory '/home/node_modules' does not exist, skipping all lookups in it.
Info seq  [hh:mm:ss:mss] Directory '/node_modules' does not exist, skipping all lookups in it.
Info seq  [hh:mm:ss:mss] ======== Module name '@typescript/lib-dom' was not resolved. ========
Info seq  [hh:mm:ss:mss] FileWatcher:: Close:: WatchInfo: /home/src/projects/node_modules/@typescript/lib-dom/package.json 2000 undefined Project: /home/src/projects/project1/tsconfig.json WatchType: File location affecting resolution
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Close:: WatchInfo: /home/src/projects/project1/typeroot2 1 undefined Project: /home/src/projects/project1/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Close:: WatchInfo: /home/src/projects/project1/typeroot2 1 undefined Project: /home/src/projects/project1/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: /home/src/projects/project1/tsconfig.json projectStateVersion: 7 projectProgramVersion: 5 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Project '/home/src/projects/project1/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (9)
	/home/src/lib/lib.dom.d.ts Text-1 "interface DOMInterface { }"
	/home/src/projects/node_modules/@typescript/lib-webworker/index.d.ts Text-1 "interface WebworkerInterface { }"
	/home/src/projects/node_modules/@typescript/lib-scripthost/index.d.ts Text-1 "interface ScriptHostInterface { }"
	/home/src/projects/node_modules/@typescript/lib-es5/index.d.ts Text-1 "/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };"
	/home/src/projects/project1/file.ts Text-2 "export const file = 10;export const xyz = 10;"
	/home/src/projects/project1/file2.ts Text-1 "/// <reference lib=\"webworker\"/>\n/// <reference lib=\"scripthost\"/>\n/// <reference lib=\"es5\"/>\n"
	/home/src/projects/project1/index.ts SVC-1-0 "export const x = \"type1\";"
	/home/src/projects/project1/utils.d.ts Text-1 "export const y = 10;"
	/home/src/projects/project1/typeroot1/sometype/index.d.ts Text-1 "export type TheNum = \"type1\";"


	../../lib/lib.dom.d.ts
	  Library 'lib.dom.d.ts' specified in compilerOptions
	../node_modules/@typescript/lib-webworker/index.d.ts
	  Library referenced via 'webworker' from file 'file2.ts'
	../node_modules/@typescript/lib-scripthost/index.d.ts
	  Library referenced via 'scripthost' from file 'file2.ts'
	../node_modules/@typescript/lib-es5/index.d.ts
	  Library referenced via 'es5' from file 'file2.ts'
	  Library 'lib.es5.d.ts' specified in compilerOptions
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
        "projectName": "/home/src/projects/project1/tsconfig.json"
      }
    }
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "configFileDiag",
      "body": {
        "triggerFile": "/home/src/projects/project1/tsconfig.json",
        "configFile": "/home/src/projects/project1/tsconfig.json",
        "diagnostics": []
      }
    }
Info seq  [hh:mm:ss:mss] Running: *ensureProjectForOpenFiles*
Info seq  [hh:mm:ss:mss] Before ensureProjectForOpenFiles:
Info seq  [hh:mm:ss:mss] Project '/home/src/projects/project1/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (9)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: /home/src/projects/project1/index.ts ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /home/src/projects/project1/tsconfig.json
Info seq  [hh:mm:ss:mss] getConfigFileNameForFile:: File: /home/src/projects/project1/tsconfig.json ProjectRootPath: undefined:: Result: undefined
Info seq  [hh:mm:ss:mss] After ensureProjectForOpenFiles:
Info seq  [hh:mm:ss:mss] Project '/home/src/projects/project1/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (9)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: /home/src/projects/project1/index.ts ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /home/src/projects/project1/tsconfig.json
Info seq  [hh:mm:ss:mss] got projects updated in background /home/src/projects/project1/index.ts
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "projectsUpdatedInBackground",
      "body": {
        "openFiles": [
          "/home/src/projects/project1/index.ts"
        ]
      }
    }
After running Timeout callback:: count: 0

PolledWatches::
/home/src/projects/node_modules/@typescript/lib-es5/package.json:
  {"pollingInterval":2000}
/home/src/projects/node_modules/@typescript/lib-scripthost/package.json:
  {"pollingInterval":2000}
/home/src/projects/node_modules/@typescript/lib-webworker/package.json:
  {"pollingInterval":2000}
/home/src/projects/node_modules/@typescript/package.json:
  {"pollingInterval":2000}
/home/src/projects/node_modules/package.json:
  {"pollingInterval":2000}
/home/src/projects/package.json:
  {"pollingInterval":2000}
/home/src/projects/project1/node_modules:
  {"pollingInterval":500}

PolledWatches *deleted*::
/home/src/projects/node_modules/@typescript/lib-dom/package.json:
  {"pollingInterval":2000}
/home/src/projects/project1/typeroot2:
  {"pollingInterval":500}

FsWatches::
/home/src/lib/lib.dom.d.ts:
  {}
/home/src/projects/project1/core.d.ts:
  {}
/home/src/projects/project1/file.ts:
  {}
/home/src/projects/project1/file2.ts:
  {}
/home/src/projects/project1/tsconfig.json:
  {}
/home/src/projects/project1/typeroot1/sometype/index.d.ts:
  {}
/home/src/projects/project1/utils.d.ts:
  {}

FsWatchesRecursive::
/home/src/projects/node_modules:
  {}
/home/src/projects/project1:
  {}
/home/src/projects/project1/typeroot1:
  {}

Projects::
/home/src/projects/project1/tsconfig.json (Configured) *changed*
    projectStateVersion: 7
    projectProgramVersion: 6 *changed*
    dirty: false *changed*

ScriptInfos::
/home/src/lib/lib.dom.d.ts *changed*
    version: Text-1
    containingProjects: 1 *changed*
        /home/src/projects/project1/tsconfig.json *new*
/home/src/projects/node_modules/@typescript/lib-dom/index.d.ts
    version: Text-1
    pendingReloadFromDisk: true
    deferredDelete: true
    containingProjects: 0
/home/src/projects/node_modules/@typescript/lib-es5/index.d.ts
    version: Text-1
    containingProjects: 1
        /home/src/projects/project1/tsconfig.json
/home/src/projects/node_modules/@typescript/lib-scripthost/index.d.ts
    version: Text-1
    containingProjects: 1
        /home/src/projects/project1/tsconfig.json
/home/src/projects/node_modules/@typescript/lib-webworker/index.d.ts
    version: Text-1
    containingProjects: 1
        /home/src/projects/project1/tsconfig.json
/home/src/projects/project1/core.d.ts
    version: Text-1
    pendingReloadFromDisk: true
    deferredDelete: true
    containingProjects: 0
/home/src/projects/project1/file.ts
    version: Text-2
    containingProjects: 1
        /home/src/projects/project1/tsconfig.json
/home/src/projects/project1/file2.ts
    version: Text-1
    containingProjects: 1
        /home/src/projects/project1/tsconfig.json
/home/src/projects/project1/index.ts (Open)
    version: SVC-1-0
    containingProjects: 1
        /home/src/projects/project1/tsconfig.json *default*
/home/src/projects/project1/typeroot1/sometype/index.d.ts
    version: Text-1
    containingProjects: 1
        /home/src/projects/project1/tsconfig.json
/home/src/projects/project1/utils.d.ts
    version: Text-1
    containingProjects: 1
        /home/src/projects/project1/tsconfig.json

Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Triggered with /home/src/projects/node_modules/@typescript/lib-webworker/index.d.ts :: WatchInfo: /home/src/projects/node_modules 1 undefined Project: /home/src/projects/project1/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Scheduled: /home/src/projects/project1/tsconfig.jsonFailedLookupInvalidation
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Triggered with /home/src/projects/node_modules/@typescript/lib-webworker/index.d.ts :: WatchInfo: /home/src/projects/node_modules 1 undefined Project: /home/src/projects/project1/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Triggered with /home/src/projects/node_modules/@typescript/lib-webworker/index.d.ts :: WatchInfo: /home/src/projects/node_modules 1 undefined WatchType: node_modules for closed script infos and package.jsons affecting module specifier cache
Info seq  [hh:mm:ss:mss] Scheduled: /home/src/projects/project1/tsconfig.json
Info seq  [hh:mm:ss:mss] Scheduled: *ensureProjectForOpenFiles*
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Triggered with /home/src/projects/node_modules/@typescript/lib-webworker/index.d.ts :: WatchInfo: /home/src/projects/node_modules 1 undefined WatchType: node_modules for closed script infos and package.jsons affecting module specifier cache
Before running Timeout callback:: count: 3
20: /home/src/projects/project1/tsconfig.jsonFailedLookupInvalidation
21: /home/src/projects/project1/tsconfig.json
22: *ensureProjectForOpenFiles*
//// [/home/src/projects/node_modules/@typescript/lib-webworker/index.d.ts] deleted

Timeout callback:: count: 3
20: /home/src/projects/project1/tsconfig.jsonFailedLookupInvalidation *new*
21: /home/src/projects/project1/tsconfig.json *new*
22: *ensureProjectForOpenFiles* *new*

Projects::
/home/src/projects/project1/tsconfig.json (Configured) *changed*
    projectStateVersion: 8 *changed*
    projectProgramVersion: 6
    dirty: true *changed*

ScriptInfos::
/home/src/lib/lib.dom.d.ts
    version: Text-1
    containingProjects: 1
        /home/src/projects/project1/tsconfig.json
/home/src/projects/node_modules/@typescript/lib-dom/index.d.ts
    version: Text-1
    pendingReloadFromDisk: true
    deferredDelete: true
    containingProjects: 0
/home/src/projects/node_modules/@typescript/lib-es5/index.d.ts
    version: Text-1
    containingProjects: 1
        /home/src/projects/project1/tsconfig.json
/home/src/projects/node_modules/@typescript/lib-scripthost/index.d.ts
    version: Text-1
    containingProjects: 1
        /home/src/projects/project1/tsconfig.json
/home/src/projects/node_modules/@typescript/lib-webworker/index.d.ts *changed*
    version: Text-1
    pendingReloadFromDisk: true *changed*
    deferredDelete: true *changed*
    containingProjects: 0 *changed*
        /home/src/projects/project1/tsconfig.json *deleted*
/home/src/projects/project1/core.d.ts
    version: Text-1
    pendingReloadFromDisk: true
    deferredDelete: true
    containingProjects: 0
/home/src/projects/project1/file.ts
    version: Text-2
    containingProjects: 1
        /home/src/projects/project1/tsconfig.json
/home/src/projects/project1/file2.ts
    version: Text-1
    containingProjects: 1
        /home/src/projects/project1/tsconfig.json
/home/src/projects/project1/index.ts (Open)
    version: SVC-1-0
    containingProjects: 1
        /home/src/projects/project1/tsconfig.json *default*
/home/src/projects/project1/typeroot1/sometype/index.d.ts
    version: Text-1
    containingProjects: 1
        /home/src/projects/project1/tsconfig.json
/home/src/projects/project1/utils.d.ts
    version: Text-1
    containingProjects: 1
        /home/src/projects/project1/tsconfig.json

Info seq  [hh:mm:ss:mss] Running: /home/src/projects/project1/tsconfig.jsonFailedLookupInvalidation
Info seq  [hh:mm:ss:mss] Running: /home/src/projects/project1/tsconfig.json
Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: /home/src/projects/project1/tsconfig.json
Info seq  [hh:mm:ss:mss] File '/home/src/projects/node_modules/@typescript/lib-webworker/package.json' does not exist.
Info seq  [hh:mm:ss:mss] File '/home/src/projects/node_modules/@typescript/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/projects/node_modules/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/projects/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] ======== Resolving module '@typescript/lib-webworker' from '/home/src/projects/project1/__lib_node_modules_lookup_lib.webworker.d.ts__.ts'. ========
Info seq  [hh:mm:ss:mss] Explicitly specified module resolution kind: 'Node10'.
Info seq  [hh:mm:ss:mss] Loading module '@typescript/lib-webworker' from 'node_modules' folder, target file types: TypeScript, Declaration.
Info seq  [hh:mm:ss:mss] Searching all ancestor node_modules directories for preferred extensions: TypeScript, Declaration.
Info seq  [hh:mm:ss:mss] Directory '/home/src/projects/project1/node_modules' does not exist, skipping all lookups in it.
Info seq  [hh:mm:ss:mss] Scoped package detected, looking in 'typescript__lib-webworker'
Info seq  [hh:mm:ss:mss] File '/home/src/projects/node_modules/@typescript/lib-webworker/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/projects/node_modules/@typescript/lib-webworker.ts' does not exist.
Info seq  [hh:mm:ss:mss] File '/home/src/projects/node_modules/@typescript/lib-webworker.tsx' does not exist.
Info seq  [hh:mm:ss:mss] File '/home/src/projects/node_modules/@typescript/lib-webworker.d.ts' does not exist.
Info seq  [hh:mm:ss:mss] File '/home/src/projects/node_modules/@typescript/lib-webworker/index.ts' does not exist.
Info seq  [hh:mm:ss:mss] File '/home/src/projects/node_modules/@typescript/lib-webworker/index.tsx' does not exist.
Info seq  [hh:mm:ss:mss] File '/home/src/projects/node_modules/@typescript/lib-webworker/index.d.ts' does not exist.
Info seq  [hh:mm:ss:mss] Directory '/home/src/projects/node_modules/@types' does not exist, skipping all lookups in it.
Info seq  [hh:mm:ss:mss] Scoped package detected, looking in 'typescript__lib-webworker'
Info seq  [hh:mm:ss:mss] Directory '/home/src/node_modules' does not exist, skipping all lookups in it.
Info seq  [hh:mm:ss:mss] Scoped package detected, looking in 'typescript__lib-webworker'
Info seq  [hh:mm:ss:mss] Directory '/home/node_modules' does not exist, skipping all lookups in it.
Info seq  [hh:mm:ss:mss] Scoped package detected, looking in 'typescript__lib-webworker'
Info seq  [hh:mm:ss:mss] Directory '/node_modules' does not exist, skipping all lookups in it.
Info seq  [hh:mm:ss:mss] Scoped package detected, looking in 'typescript__lib-webworker'
Info seq  [hh:mm:ss:mss] Loading module '@typescript/lib-webworker' from 'node_modules' folder, target file types: JavaScript.
Info seq  [hh:mm:ss:mss] Searching all ancestor node_modules directories for fallback extensions: JavaScript.
Info seq  [hh:mm:ss:mss] Directory '/home/src/projects/project1/node_modules' does not exist, skipping all lookups in it.
Info seq  [hh:mm:ss:mss] File '/home/src/projects/node_modules/@typescript/lib-webworker/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/projects/node_modules/@typescript/lib-webworker.js' does not exist.
Info seq  [hh:mm:ss:mss] File '/home/src/projects/node_modules/@typescript/lib-webworker.jsx' does not exist.
Info seq  [hh:mm:ss:mss] File '/home/src/projects/node_modules/@typescript/lib-webworker/index.js' does not exist.
Info seq  [hh:mm:ss:mss] File '/home/src/projects/node_modules/@typescript/lib-webworker/index.jsx' does not exist.
Info seq  [hh:mm:ss:mss] Directory '/home/src/node_modules' does not exist, skipping all lookups in it.
Info seq  [hh:mm:ss:mss] Directory '/home/node_modules' does not exist, skipping all lookups in it.
Info seq  [hh:mm:ss:mss] Directory '/node_modules' does not exist, skipping all lookups in it.
Info seq  [hh:mm:ss:mss] ======== Module name '@typescript/lib-webworker' was not resolved. ========
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/lib/lib.webworker.d.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] Reusing resolution of module '@typescript/lib-scripthost' from '/home/src/projects/project1/__lib_node_modules_lookup_lib.scripthost.d.ts__.ts' of old program, it was successfully resolved to '/home/src/projects/node_modules/@typescript/lib-scripthost/index.d.ts'.
Info seq  [hh:mm:ss:mss] File '/home/src/projects/node_modules/@typescript/lib-scripthost/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/projects/node_modules/@typescript/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/projects/node_modules/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/projects/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] Reusing resolution of module '@typescript/lib-es5' from '/home/src/projects/project1/__lib_node_modules_lookup_lib.es5.d.ts__.ts' of old program, it was successfully resolved to '/home/src/projects/node_modules/@typescript/lib-es5/index.d.ts'.
Info seq  [hh:mm:ss:mss] File '/home/src/projects/node_modules/@typescript/lib-es5/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/projects/node_modules/@typescript/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/projects/node_modules/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/projects/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] Reusing resolution of type reference directive 'sometype' from '/home/src/projects/project1/__inferred type names__.ts' of old program, it was successfully resolved to '/home/src/projects/project1/typeroot1/sometype/index.d.ts'.
Info seq  [hh:mm:ss:mss] Reusing resolution of module '@typescript/lib-dom' from '/home/src/projects/project1/__lib_node_modules_lookup_lib.dom.d.ts__.ts' of old program, it was not resolved.
Info seq  [hh:mm:ss:mss] FileWatcher:: Close:: WatchInfo: /home/src/projects/node_modules/@typescript/lib-webworker/package.json 2000 undefined Project: /home/src/projects/project1/tsconfig.json WatchType: File location affecting resolution
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: /home/src/projects/project1/tsconfig.json projectStateVersion: 8 projectProgramVersion: 6 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Project '/home/src/projects/project1/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (9)
	/home/src/lib/lib.dom.d.ts Text-1 "interface DOMInterface { }"
	/home/src/lib/lib.webworker.d.ts Text-1 "interface WebWorkerInterface { }"
	/home/src/projects/node_modules/@typescript/lib-scripthost/index.d.ts Text-1 "interface ScriptHostInterface { }"
	/home/src/projects/node_modules/@typescript/lib-es5/index.d.ts Text-1 "/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };"
	/home/src/projects/project1/file.ts Text-2 "export const file = 10;export const xyz = 10;"
	/home/src/projects/project1/file2.ts Text-1 "/// <reference lib=\"webworker\"/>\n/// <reference lib=\"scripthost\"/>\n/// <reference lib=\"es5\"/>\n"
	/home/src/projects/project1/index.ts SVC-1-0 "export const x = \"type1\";"
	/home/src/projects/project1/utils.d.ts Text-1 "export const y = 10;"
	/home/src/projects/project1/typeroot1/sometype/index.d.ts Text-1 "export type TheNum = \"type1\";"


	../../lib/lib.dom.d.ts
	  Library 'lib.dom.d.ts' specified in compilerOptions
	../../lib/lib.webworker.d.ts
	  Library referenced via 'webworker' from file 'file2.ts'
	../node_modules/@typescript/lib-scripthost/index.d.ts
	  Library referenced via 'scripthost' from file 'file2.ts'
	../node_modules/@typescript/lib-es5/index.d.ts
	  Library referenced via 'es5' from file 'file2.ts'
	  Library 'lib.es5.d.ts' specified in compilerOptions
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
Info seq  [hh:mm:ss:mss] Project '/home/src/projects/project1/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (9)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: /home/src/projects/project1/index.ts ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /home/src/projects/project1/tsconfig.json
Info seq  [hh:mm:ss:mss] After ensureProjectForOpenFiles:
Info seq  [hh:mm:ss:mss] Project '/home/src/projects/project1/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (9)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: /home/src/projects/project1/index.ts ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /home/src/projects/project1/tsconfig.json
Info seq  [hh:mm:ss:mss] got projects updated in background /home/src/projects/project1/index.ts
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "projectsUpdatedInBackground",
      "body": {
        "openFiles": [
          "/home/src/projects/project1/index.ts"
        ]
      }
    }
After running Timeout callback:: count: 0

PolledWatches::
/home/src/projects/node_modules/@typescript/lib-es5/package.json:
  {"pollingInterval":2000}
/home/src/projects/node_modules/@typescript/lib-scripthost/package.json:
  {"pollingInterval":2000}
/home/src/projects/node_modules/@typescript/package.json:
  {"pollingInterval":2000}
/home/src/projects/node_modules/package.json:
  {"pollingInterval":2000}
/home/src/projects/package.json:
  {"pollingInterval":2000}
/home/src/projects/project1/node_modules:
  {"pollingInterval":500}

PolledWatches *deleted*::
/home/src/projects/node_modules/@typescript/lib-webworker/package.json:
  {"pollingInterval":2000}

FsWatches::
/home/src/lib/lib.dom.d.ts:
  {}
/home/src/lib/lib.webworker.d.ts: *new*
  {}
/home/src/projects/project1/core.d.ts:
  {}
/home/src/projects/project1/file.ts:
  {}
/home/src/projects/project1/file2.ts:
  {}
/home/src/projects/project1/tsconfig.json:
  {}
/home/src/projects/project1/typeroot1/sometype/index.d.ts:
  {}
/home/src/projects/project1/utils.d.ts:
  {}

FsWatchesRecursive::
/home/src/projects/node_modules:
  {}
/home/src/projects/project1:
  {}
/home/src/projects/project1/typeroot1:
  {}

Projects::
/home/src/projects/project1/tsconfig.json (Configured) *changed*
    projectStateVersion: 8
    projectProgramVersion: 7 *changed*
    dirty: false *changed*

ScriptInfos::
/home/src/lib/lib.dom.d.ts
    version: Text-1
    containingProjects: 1
        /home/src/projects/project1/tsconfig.json
/home/src/lib/lib.webworker.d.ts *new*
    version: Text-1
    containingProjects: 1
        /home/src/projects/project1/tsconfig.json
/home/src/projects/node_modules/@typescript/lib-dom/index.d.ts
    version: Text-1
    pendingReloadFromDisk: true
    deferredDelete: true
    containingProjects: 0
/home/src/projects/node_modules/@typescript/lib-es5/index.d.ts
    version: Text-1
    containingProjects: 1
        /home/src/projects/project1/tsconfig.json
/home/src/projects/node_modules/@typescript/lib-scripthost/index.d.ts
    version: Text-1
    containingProjects: 1
        /home/src/projects/project1/tsconfig.json
/home/src/projects/node_modules/@typescript/lib-webworker/index.d.ts
    version: Text-1
    pendingReloadFromDisk: true
    deferredDelete: true
    containingProjects: 0
/home/src/projects/project1/core.d.ts
    version: Text-1
    pendingReloadFromDisk: true
    deferredDelete: true
    containingProjects: 0
/home/src/projects/project1/file.ts
    version: Text-2
    containingProjects: 1
        /home/src/projects/project1/tsconfig.json
/home/src/projects/project1/file2.ts
    version: Text-1
    containingProjects: 1
        /home/src/projects/project1/tsconfig.json
/home/src/projects/project1/index.ts (Open)
    version: SVC-1-0
    containingProjects: 1
        /home/src/projects/project1/tsconfig.json *default*
/home/src/projects/project1/typeroot1/sometype/index.d.ts
    version: Text-1
    containingProjects: 1
        /home/src/projects/project1/tsconfig.json
/home/src/projects/project1/utils.d.ts
    version: Text-1
    containingProjects: 1
        /home/src/projects/project1/tsconfig.json

Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Triggered with /home/src/projects/node_modules/@typescript/lib-webworker/index.d.ts :: WatchInfo: /home/src/projects/node_modules 1 undefined Project: /home/src/projects/project1/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Scheduled: /home/src/projects/project1/tsconfig.jsonFailedLookupInvalidation
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Triggered with /home/src/projects/node_modules/@typescript/lib-webworker/index.d.ts :: WatchInfo: /home/src/projects/node_modules 1 undefined Project: /home/src/projects/project1/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Triggered with /home/src/projects/node_modules/@typescript/lib-webworker/index.d.ts :: WatchInfo: /home/src/projects/node_modules 1 undefined WatchType: node_modules for closed script infos and package.jsons affecting module specifier cache
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Triggered with /home/src/projects/node_modules/@typescript/lib-webworker/index.d.ts :: WatchInfo: /home/src/projects/node_modules 1 undefined WatchType: node_modules for closed script infos and package.jsons affecting module specifier cache
Before running Timeout callback:: count: 1
23: /home/src/projects/project1/tsconfig.jsonFailedLookupInvalidation
//// [/home/src/projects/node_modules/@typescript/lib-webworker/index.d.ts]
interface WebWorkerInterface { }


Timeout callback:: count: 1
23: /home/src/projects/project1/tsconfig.jsonFailedLookupInvalidation *new*

ScriptInfos::
/home/src/lib/lib.dom.d.ts
    version: Text-1
    containingProjects: 1
        /home/src/projects/project1/tsconfig.json
/home/src/lib/lib.webworker.d.ts
    version: Text-1
    containingProjects: 1
        /home/src/projects/project1/tsconfig.json
/home/src/projects/node_modules/@typescript/lib-dom/index.d.ts
    version: Text-1
    pendingReloadFromDisk: true
    deferredDelete: true
    containingProjects: 0
/home/src/projects/node_modules/@typescript/lib-es5/index.d.ts
    version: Text-1
    containingProjects: 1
        /home/src/projects/project1/tsconfig.json
/home/src/projects/node_modules/@typescript/lib-scripthost/index.d.ts
    version: Text-1
    containingProjects: 1
        /home/src/projects/project1/tsconfig.json
/home/src/projects/node_modules/@typescript/lib-webworker/index.d.ts *changed*
    version: Text-1
    pendingReloadFromDisk: true
    deferredDelete: undefined *changed*
    containingProjects: 0
/home/src/projects/project1/core.d.ts
    version: Text-1
    pendingReloadFromDisk: true
    deferredDelete: true
    containingProjects: 0
/home/src/projects/project1/file.ts
    version: Text-2
    containingProjects: 1
        /home/src/projects/project1/tsconfig.json
/home/src/projects/project1/file2.ts
    version: Text-1
    containingProjects: 1
        /home/src/projects/project1/tsconfig.json
/home/src/projects/project1/index.ts (Open)
    version: SVC-1-0
    containingProjects: 1
        /home/src/projects/project1/tsconfig.json *default*
/home/src/projects/project1/typeroot1/sometype/index.d.ts
    version: Text-1
    containingProjects: 1
        /home/src/projects/project1/tsconfig.json
/home/src/projects/project1/utils.d.ts
    version: Text-1
    containingProjects: 1
        /home/src/projects/project1/tsconfig.json

Info seq  [hh:mm:ss:mss] Running: /home/src/projects/project1/tsconfig.jsonFailedLookupInvalidation
Info seq  [hh:mm:ss:mss] Scheduled: /home/src/projects/project1/tsconfig.json
Info seq  [hh:mm:ss:mss] Scheduled: *ensureProjectForOpenFiles*
After running Timeout callback:: count: 2

Timeout callback:: count: 2
24: /home/src/projects/project1/tsconfig.json *new*
25: *ensureProjectForOpenFiles* *new*

Projects::
/home/src/projects/project1/tsconfig.json (Configured) *changed*
    projectStateVersion: 9 *changed*
    projectProgramVersion: 7
    dirty: true *changed*

Before running Timeout callback:: count: 2
24: /home/src/projects/project1/tsconfig.json
25: *ensureProjectForOpenFiles*

Info seq  [hh:mm:ss:mss] Running: /home/src/projects/project1/tsconfig.json
Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: /home/src/projects/project1/tsconfig.json
Info seq  [hh:mm:ss:mss] File '/home/src/projects/node_modules/@typescript/lib-scripthost/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/projects/node_modules/@typescript/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/projects/node_modules/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/projects/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/projects/node_modules/@typescript/lib-es5/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/projects/node_modules/@typescript/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/projects/node_modules/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/projects/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] ======== Resolving module '@typescript/lib-webworker' from '/home/src/projects/project1/__lib_node_modules_lookup_lib.webworker.d.ts__.ts'. ========
Info seq  [hh:mm:ss:mss] Explicitly specified module resolution kind: 'Node10'.
Info seq  [hh:mm:ss:mss] Loading module '@typescript/lib-webworker' from 'node_modules' folder, target file types: TypeScript, Declaration.
Info seq  [hh:mm:ss:mss] Searching all ancestor node_modules directories for preferred extensions: TypeScript, Declaration.
Info seq  [hh:mm:ss:mss] Directory '/home/src/projects/project1/node_modules' does not exist, skipping all lookups in it.
Info seq  [hh:mm:ss:mss] Scoped package detected, looking in 'typescript__lib-webworker'
Info seq  [hh:mm:ss:mss] File '/home/src/projects/node_modules/@typescript/lib-webworker/package.json' does not exist.
Info seq  [hh:mm:ss:mss] File '/home/src/projects/node_modules/@typescript/lib-webworker.ts' does not exist.
Info seq  [hh:mm:ss:mss] File '/home/src/projects/node_modules/@typescript/lib-webworker.tsx' does not exist.
Info seq  [hh:mm:ss:mss] File '/home/src/projects/node_modules/@typescript/lib-webworker.d.ts' does not exist.
Info seq  [hh:mm:ss:mss] File '/home/src/projects/node_modules/@typescript/lib-webworker/index.ts' does not exist.
Info seq  [hh:mm:ss:mss] File '/home/src/projects/node_modules/@typescript/lib-webworker/index.tsx' does not exist.
Info seq  [hh:mm:ss:mss] File '/home/src/projects/node_modules/@typescript/lib-webworker/index.d.ts' exists - use it as a name resolution result.
Info seq  [hh:mm:ss:mss] Resolving real path for '/home/src/projects/node_modules/@typescript/lib-webworker/index.d.ts', result '/home/src/projects/node_modules/@typescript/lib-webworker/index.d.ts'.
Info seq  [hh:mm:ss:mss] ======== Module name '@typescript/lib-webworker' was successfully resolved to '/home/src/projects/node_modules/@typescript/lib-webworker/index.d.ts'. ========
Info seq  [hh:mm:ss:mss] File '/home/src/projects/node_modules/@typescript/lib-webworker/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/projects/node_modules/@typescript/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/projects/node_modules/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/projects/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] Reusing resolution of module '@typescript/lib-scripthost' from '/home/src/projects/project1/__lib_node_modules_lookup_lib.scripthost.d.ts__.ts' of old program, it was successfully resolved to '/home/src/projects/node_modules/@typescript/lib-scripthost/index.d.ts'.
Info seq  [hh:mm:ss:mss] File '/home/src/projects/node_modules/@typescript/lib-scripthost/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/projects/node_modules/@typescript/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/projects/node_modules/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/projects/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] Reusing resolution of module '@typescript/lib-es5' from '/home/src/projects/project1/__lib_node_modules_lookup_lib.es5.d.ts__.ts' of old program, it was successfully resolved to '/home/src/projects/node_modules/@typescript/lib-es5/index.d.ts'.
Info seq  [hh:mm:ss:mss] File '/home/src/projects/node_modules/@typescript/lib-es5/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/projects/node_modules/@typescript/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/projects/node_modules/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/projects/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] Reusing resolution of type reference directive 'sometype' from '/home/src/projects/project1/__inferred type names__.ts' of old program, it was successfully resolved to '/home/src/projects/project1/typeroot1/sometype/index.d.ts'.
Info seq  [hh:mm:ss:mss] Reusing resolution of module '@typescript/lib-dom' from '/home/src/projects/project1/__lib_node_modules_lookup_lib.dom.d.ts__.ts' of old program, it was not resolved.
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/projects/node_modules/@typescript/lib-webworker/package.json 2000 undefined Project: /home/src/projects/project1/tsconfig.json WatchType: File location affecting resolution
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: /home/src/projects/project1/tsconfig.json projectStateVersion: 9 projectProgramVersion: 7 structureChanged: true structureIsReused:: SafeModules Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Project '/home/src/projects/project1/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (9)
	/home/src/lib/lib.dom.d.ts Text-1 "interface DOMInterface { }"
	/home/src/projects/node_modules/@typescript/lib-webworker/index.d.ts Text-2 "interface WebWorkerInterface { }"
	/home/src/projects/node_modules/@typescript/lib-scripthost/index.d.ts Text-1 "interface ScriptHostInterface { }"
	/home/src/projects/node_modules/@typescript/lib-es5/index.d.ts Text-1 "/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };"
	/home/src/projects/project1/file.ts Text-2 "export const file = 10;export const xyz = 10;"
	/home/src/projects/project1/file2.ts Text-1 "/// <reference lib=\"webworker\"/>\n/// <reference lib=\"scripthost\"/>\n/// <reference lib=\"es5\"/>\n"
	/home/src/projects/project1/index.ts SVC-1-0 "export const x = \"type1\";"
	/home/src/projects/project1/utils.d.ts Text-1 "export const y = 10;"
	/home/src/projects/project1/typeroot1/sometype/index.d.ts Text-1 "export type TheNum = \"type1\";"


	../../lib/lib.dom.d.ts
	  Library 'lib.dom.d.ts' specified in compilerOptions
	../node_modules/@typescript/lib-webworker/index.d.ts
	  Library referenced via 'webworker' from file 'file2.ts'
	../node_modules/@typescript/lib-scripthost/index.d.ts
	  Library referenced via 'scripthost' from file 'file2.ts'
	../node_modules/@typescript/lib-es5/index.d.ts
	  Library referenced via 'es5' from file 'file2.ts'
	  Library 'lib.es5.d.ts' specified in compilerOptions
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
Info seq  [hh:mm:ss:mss] Project '/home/src/projects/project1/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (9)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: /home/src/projects/project1/index.ts ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /home/src/projects/project1/tsconfig.json
Info seq  [hh:mm:ss:mss] After ensureProjectForOpenFiles:
Info seq  [hh:mm:ss:mss] Project '/home/src/projects/project1/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (9)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: /home/src/projects/project1/index.ts ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /home/src/projects/project1/tsconfig.json
Info seq  [hh:mm:ss:mss] got projects updated in background /home/src/projects/project1/index.ts
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "projectsUpdatedInBackground",
      "body": {
        "openFiles": [
          "/home/src/projects/project1/index.ts"
        ]
      }
    }
After running Timeout callback:: count: 0

PolledWatches::
/home/src/projects/node_modules/@typescript/lib-es5/package.json:
  {"pollingInterval":2000}
/home/src/projects/node_modules/@typescript/lib-scripthost/package.json:
  {"pollingInterval":2000}
/home/src/projects/node_modules/@typescript/lib-webworker/package.json: *new*
  {"pollingInterval":2000}
/home/src/projects/node_modules/@typescript/package.json:
  {"pollingInterval":2000}
/home/src/projects/node_modules/package.json:
  {"pollingInterval":2000}
/home/src/projects/package.json:
  {"pollingInterval":2000}
/home/src/projects/project1/node_modules:
  {"pollingInterval":500}

FsWatches::
/home/src/lib/lib.dom.d.ts:
  {}
/home/src/lib/lib.webworker.d.ts:
  {}
/home/src/projects/project1/core.d.ts:
  {}
/home/src/projects/project1/file.ts:
  {}
/home/src/projects/project1/file2.ts:
  {}
/home/src/projects/project1/tsconfig.json:
  {}
/home/src/projects/project1/typeroot1/sometype/index.d.ts:
  {}
/home/src/projects/project1/utils.d.ts:
  {}

FsWatchesRecursive::
/home/src/projects/node_modules:
  {}
/home/src/projects/project1:
  {}
/home/src/projects/project1/typeroot1:
  {}

Projects::
/home/src/projects/project1/tsconfig.json (Configured) *changed*
    projectStateVersion: 9
    projectProgramVersion: 8 *changed*
    dirty: false *changed*

ScriptInfos::
/home/src/lib/lib.dom.d.ts
    version: Text-1
    containingProjects: 1
        /home/src/projects/project1/tsconfig.json
/home/src/lib/lib.webworker.d.ts *changed*
    version: Text-1
    containingProjects: 0 *changed*
        /home/src/projects/project1/tsconfig.json *deleted*
/home/src/projects/node_modules/@typescript/lib-dom/index.d.ts
    version: Text-1
    pendingReloadFromDisk: true
    deferredDelete: true
    containingProjects: 0
/home/src/projects/node_modules/@typescript/lib-es5/index.d.ts
    version: Text-1
    containingProjects: 1
        /home/src/projects/project1/tsconfig.json
/home/src/projects/node_modules/@typescript/lib-scripthost/index.d.ts
    version: Text-1
    containingProjects: 1
        /home/src/projects/project1/tsconfig.json
/home/src/projects/node_modules/@typescript/lib-webworker/index.d.ts *changed*
    version: Text-2 *changed*
    pendingReloadFromDisk: false *changed*
    containingProjects: 1 *changed*
        /home/src/projects/project1/tsconfig.json *new*
/home/src/projects/project1/core.d.ts
    version: Text-1
    pendingReloadFromDisk: true
    deferredDelete: true
    containingProjects: 0
/home/src/projects/project1/file.ts
    version: Text-2
    containingProjects: 1
        /home/src/projects/project1/tsconfig.json
/home/src/projects/project1/file2.ts
    version: Text-1
    containingProjects: 1
        /home/src/projects/project1/tsconfig.json
/home/src/projects/project1/index.ts (Open)
    version: SVC-1-0
    containingProjects: 1
        /home/src/projects/project1/tsconfig.json *default*
/home/src/projects/project1/typeroot1/sometype/index.d.ts
    version: Text-1
    containingProjects: 1
        /home/src/projects/project1/tsconfig.json
/home/src/projects/project1/utils.d.ts
    version: Text-1
    containingProjects: 1
        /home/src/projects/project1/tsconfig.json
