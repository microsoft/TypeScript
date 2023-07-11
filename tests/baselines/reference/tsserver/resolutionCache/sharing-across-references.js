currentDirectory:: / useCaseSensitiveFileNames: false
Info seq  [hh:mm:ss:mss] Provided types map file "/a/lib/typesMap.json" doesn't exist
Before request
//// [/users/username/projects/node_modules/moduleX/index.d.ts]
export const x = 10;

//// [/users/username/projects/common/tsconfig.json]
{"compilerOptions":{"composite":true,"traceResolution":true}}

//// [/users/username/projects/common/moduleA.ts]
export const a = 10;

//// [/users/username/projects/common/moduleB.ts]
import { x } from "moduleX";
export const b = x;


//// [/users/username/projects/app/tsconfig.json]
{"compilerOptions":{"composite":true,"traceResolution":true},"references":[{"path":"../common"}]}

//// [/users/username/projects/app/appA.ts]
import { x } from "moduleX";
export const y = x;


//// [/users/username/projects/app/appB.ts]
import { x } from "../common/moduleB";
export const y = x;



Info seq  [hh:mm:ss:mss] request:
    {
      "command": "open",
      "arguments": {
        "file": "/users/username/projects/app/appB.ts"
      },
      "seq": 1,
      "type": "request"
    }
Info seq  [hh:mm:ss:mss] Search path: /users/username/projects/app
Info seq  [hh:mm:ss:mss] For info: /users/username/projects/app/appB.ts :: Config file name: /users/username/projects/app/tsconfig.json
Info seq  [hh:mm:ss:mss] Creating configuration project /users/username/projects/app/tsconfig.json
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /users/username/projects/app/tsconfig.json 2000 undefined Project: /users/username/projects/app/tsconfig.json WatchType: Config file
Info seq  [hh:mm:ss:mss] Config: /users/username/projects/app/tsconfig.json : {
 "rootNames": [
  "/users/username/projects/app/appA.ts",
  "/users/username/projects/app/appB.ts"
 ],
 "options": {
  "composite": true,
  "traceResolution": true,
  "configFilePath": "/users/username/projects/app/tsconfig.json"
 },
 "projectReferences": [
  {
   "path": "/users/username/projects/common",
   "originalPath": "../common"
  }
 ]
}
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /users/username/projects/app 1 undefined Config: /users/username/projects/app/tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /users/username/projects/app 1 undefined Config: /users/username/projects/app/tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /users/username/projects/app/appA.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: /users/username/projects/app/tsconfig.json
Info seq  [hh:mm:ss:mss] Config: /users/username/projects/common/tsconfig.json : {
 "rootNames": [
  "/users/username/projects/common/moduleA.ts",
  "/users/username/projects/common/moduleB.ts"
 ],
 "options": {
  "composite": true,
  "traceResolution": true,
  "configFilePath": "/users/username/projects/common/tsconfig.json"
 }
}
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /users/username/projects/common/tsconfig.json 2000 undefined Project: /users/username/projects/app/tsconfig.json WatchType: Config file
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /users/username/projects/common 1 undefined Config: /users/username/projects/common/tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /users/username/projects/common 1 undefined Config: /users/username/projects/common/tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] ======== Resolving module 'moduleX' from '/users/username/projects/app/appA.ts'. ========
Info seq  [hh:mm:ss:mss] Module resolution kind is not specified, using 'Node10'.
Info seq  [hh:mm:ss:mss] Loading module 'moduleX' from 'node_modules' folder, target file types: TypeScript, Declaration.
Info seq  [hh:mm:ss:mss] Searching all ancestor node_modules directories for preferred extensions: TypeScript, Declaration.
Info seq  [hh:mm:ss:mss] Directory '/users/username/projects/app/node_modules' does not exist, skipping all lookups in it.
Info seq  [hh:mm:ss:mss] File '/users/username/projects/node_modules/moduleX/package.json' does not exist.
Info seq  [hh:mm:ss:mss] File '/users/username/projects/node_modules/moduleX.ts' does not exist.
Info seq  [hh:mm:ss:mss] File '/users/username/projects/node_modules/moduleX.tsx' does not exist.
Info seq  [hh:mm:ss:mss] File '/users/username/projects/node_modules/moduleX.d.ts' does not exist.
Info seq  [hh:mm:ss:mss] File '/users/username/projects/node_modules/moduleX/index.ts' does not exist.
Info seq  [hh:mm:ss:mss] File '/users/username/projects/node_modules/moduleX/index.tsx' does not exist.
Info seq  [hh:mm:ss:mss] File '/users/username/projects/node_modules/moduleX/index.d.ts' exists - use it as a name resolution result.
Info seq  [hh:mm:ss:mss] Resolving real path for '/users/username/projects/node_modules/moduleX/index.d.ts', result '/users/username/projects/node_modules/moduleX/index.d.ts'.
Info seq  [hh:mm:ss:mss] ======== Module name 'moduleX' was successfully resolved to '/users/username/projects/node_modules/moduleX/index.d.ts'. ========
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /users/username/projects/app/node_modules 1 undefined Project: /users/username/projects/app/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /users/username/projects/app/node_modules 1 undefined Project: /users/username/projects/app/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /users/username/projects/node_modules 1 undefined Project: /users/username/projects/app/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /users/username/projects/node_modules 1 undefined Project: /users/username/projects/app/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /users/username/projects/node_modules 1 undefined WatchType: node_modules for closed script infos and package.jsons affecting module specifier cache
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /users/username/projects/node_modules 1 undefined WatchType: node_modules for closed script infos and package.jsons affecting module specifier cache
Info seq  [hh:mm:ss:mss] ======== Resolving module '../common/moduleB' from '/users/username/projects/app/appB.ts'. ========
Info seq  [hh:mm:ss:mss] Module resolution kind is not specified, using 'Node10'.
Info seq  [hh:mm:ss:mss] Loading module as file / folder, candidate module location '/users/username/projects/common/moduleB', target file types: TypeScript, Declaration.
Info seq  [hh:mm:ss:mss] File '/users/username/projects/common/moduleB.ts' exists - use it as a name resolution result.
Info seq  [hh:mm:ss:mss] ======== Module name '../common/moduleB' was successfully resolved to '/users/username/projects/common/moduleB.ts'. ========
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /users/username/projects/common/moduleB.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] ======== Resolving module 'moduleX' from '/users/username/projects/common/moduleB.ts'. ========
Info seq  [hh:mm:ss:mss] Using compiler options of project reference redirect '/users/username/projects/common/tsconfig.json'.
Info seq  [hh:mm:ss:mss] Module resolution kind is not specified, using 'Node10'.
Info seq  [hh:mm:ss:mss] Loading module 'moduleX' from 'node_modules' folder, target file types: TypeScript, Declaration.
Info seq  [hh:mm:ss:mss] Searching all ancestor node_modules directories for preferred extensions: TypeScript, Declaration.
Info seq  [hh:mm:ss:mss] Directory '/users/username/projects/common/node_modules' does not exist, skipping all lookups in it.
Info seq  [hh:mm:ss:mss] Resolution for module 'moduleX' was found in cache from location '/users/username/projects'.
Info seq  [hh:mm:ss:mss] ======== Module name 'moduleX' was successfully resolved to '/users/username/projects/node_modules/moduleX/index.d.ts'. ========
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /users/username/projects/common/node_modules 1 undefined Project: /users/username/projects/app/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /users/username/projects/common/node_modules 1 undefined Project: /users/username/projects/app/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /a/lib/lib.d.ts 500 undefined Project: /users/username/projects/app/tsconfig.json WatchType: Missing file
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /users/username/projects/app/node_modules/@types 1 undefined Project: /users/username/projects/app/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /users/username/projects/app/node_modules/@types 1 undefined Project: /users/username/projects/app/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /users/username/projects/node_modules/@types 1 undefined Project: /users/username/projects/app/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /users/username/projects/node_modules/@types 1 undefined Project: /users/username/projects/app/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: /users/username/projects/app/tsconfig.json Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Project '/users/username/projects/app/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (4)
	/users/username/projects/node_modules/moduleX/index.d.ts Text-1 "export const x = 10;"
	/users/username/projects/app/appA.ts Text-1 "import { x } from \"moduleX\";\nexport const y = x;\n"
	/users/username/projects/common/moduleB.ts Text-1 "import { x } from \"moduleX\";\nexport const b = x;\n"
	/users/username/projects/app/appB.ts SVC-1-0 "import { x } from \"../common/moduleB\";\nexport const y = x;\n"


	../node_modules/moduleX/index.d.ts
	  Imported via "moduleX" from file 'appA.ts'
	  Imported via "moduleX" from file '../common/moduleB.ts'
	appA.ts
	  Matched by default include pattern '**/*'
	../common/moduleB.ts
	  Imported via "../common/moduleB" from file 'appB.ts'
	appB.ts
	  Matched by default include pattern '**/*'

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Search path: /users/username/projects/app
Info seq  [hh:mm:ss:mss] For info: /users/username/projects/app/tsconfig.json :: No config files found.
Info seq  [hh:mm:ss:mss] Project '/users/username/projects/app/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (4)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: /users/username/projects/app/appB.ts ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /users/username/projects/app/tsconfig.json
Info seq  [hh:mm:ss:mss] response:
    {
      "responseRequired": false
    }
After request

PolledWatches::
/a/lib/lib.d.ts: *new*
  {"pollingInterval":500}
/users/username/projects/app/node_modules: *new*
  {"pollingInterval":500}
/users/username/projects/app/node_modules/@types: *new*
  {"pollingInterval":500}
/users/username/projects/common/node_modules: *new*
  {"pollingInterval":500}
/users/username/projects/node_modules/@types: *new*
  {"pollingInterval":500}

FsWatches::
/users/username/projects/app/appa.ts: *new*
  {}
/users/username/projects/app/tsconfig.json: *new*
  {}
/users/username/projects/common/moduleb.ts: *new*
  {}
/users/username/projects/common/tsconfig.json: *new*
  {}

FsWatchesRecursive::
/users/username/projects/app: *new*
  {}
/users/username/projects/common: *new*
  {}
/users/username/projects/node_modules: *new*
  {}
