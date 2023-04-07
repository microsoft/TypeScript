currentDirectory:: / useCaseSensitiveFileNames: false
Info seq  [hh:mm:ss:mss] Provided types map file "/a/lib/typesMap.json" doesn't exist
Before request
//// [/src/projects/node_modules/moduleX/index.d.ts]
export const x = 10;

//// [/src/projects/common/tsconfig.json]
{"compilerOptions":{"composite":true,"traceResolution":true}}

//// [/src/projects/common/moduleA.ts]
export const a = 10;

//// [/src/projects/common/moduleB.ts]
import { x } from "moduleX";
export const b = x;


//// [/src/projects/app/tsconfig.json]
{"compilerOptions":{"composite":true,"traceResolution":true},"references":[{"path":"../common"}]}

//// [/src/projects/app/appA.ts]
import { x } from "moduleX";
export const y = x;


//// [/src/projects/app/appB.ts]
import { x } from "../common/moduleB";
export const y = x;



Info seq  [hh:mm:ss:mss] request:
    {
      "command": "open",
      "arguments": {
        "file": "/src/projects/app/appB.ts"
      },
      "seq": 1,
      "type": "request"
    }
Info seq  [hh:mm:ss:mss] Search path: /src/projects/app
Info seq  [hh:mm:ss:mss] For info: /src/projects/app/appB.ts :: Config file name: /src/projects/app/tsconfig.json
Info seq  [hh:mm:ss:mss] Creating configuration project /src/projects/app/tsconfig.json
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /src/projects/app/tsconfig.json 2000 undefined Project: /src/projects/app/tsconfig.json WatchType: Config file
Info seq  [hh:mm:ss:mss] Config: /src/projects/app/tsconfig.json : {
 "rootNames": [
  "/src/projects/app/appA.ts",
  "/src/projects/app/appB.ts"
 ],
 "options": {
  "composite": true,
  "traceResolution": true,
  "configFilePath": "/src/projects/app/tsconfig.json"
 },
 "projectReferences": [
  {
   "path": "/src/projects/common",
   "originalPath": "../common"
  }
 ]
}
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /src/projects/app 1 undefined Config: /src/projects/app/tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /src/projects/app 1 undefined Config: /src/projects/app/tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /src/projects/app/appA.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: /src/projects/app/tsconfig.json
Info seq  [hh:mm:ss:mss] Config: /src/projects/common/tsconfig.json : {
 "rootNames": [
  "/src/projects/common/moduleA.ts",
  "/src/projects/common/moduleB.ts"
 ],
 "options": {
  "composite": true,
  "traceResolution": true,
  "configFilePath": "/src/projects/common/tsconfig.json"
 }
}
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /src/projects/common/tsconfig.json 2000 undefined Project: /src/projects/app/tsconfig.json WatchType: Config file
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /src/projects/common 1 undefined Config: /src/projects/common/tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /src/projects/common 1 undefined Config: /src/projects/common/tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] ======== Resolving module 'moduleX' from '/src/projects/app/appA.ts'. ========
Info seq  [hh:mm:ss:mss] Module resolution kind is not specified, using 'Node10'.
Info seq  [hh:mm:ss:mss] Loading module 'moduleX' from 'node_modules' folder, target file types: TypeScript, Declaration.
Info seq  [hh:mm:ss:mss] Directory '/src/projects/app/node_modules' does not exist, skipping all lookups in it.
Info seq  [hh:mm:ss:mss] File '/src/projects/node_modules/moduleX/package.json' does not exist.
Info seq  [hh:mm:ss:mss] File '/src/projects/node_modules/moduleX.ts' does not exist.
Info seq  [hh:mm:ss:mss] File '/src/projects/node_modules/moduleX.tsx' does not exist.
Info seq  [hh:mm:ss:mss] File '/src/projects/node_modules/moduleX.d.ts' does not exist.
Info seq  [hh:mm:ss:mss] File '/src/projects/node_modules/moduleX/index.ts' does not exist.
Info seq  [hh:mm:ss:mss] File '/src/projects/node_modules/moduleX/index.tsx' does not exist.
Info seq  [hh:mm:ss:mss] File '/src/projects/node_modules/moduleX/index.d.ts' exists - use it as a name resolution result.
Info seq  [hh:mm:ss:mss] Resolving real path for '/src/projects/node_modules/moduleX/index.d.ts', result '/src/projects/node_modules/moduleX/index.d.ts'.
Info seq  [hh:mm:ss:mss] ======== Module name 'moduleX' was successfully resolved to '/src/projects/node_modules/moduleX/index.d.ts'. ========
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /src/projects/node_modules 1 undefined WatchType: node_modules for closed script infos and package.jsons affecting module specifier cache
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /src/projects/node_modules 1 undefined WatchType: node_modules for closed script infos and package.jsons affecting module specifier cache
Info seq  [hh:mm:ss:mss] ======== Resolving module '../common/moduleB' from '/src/projects/app/appB.ts'. ========
Info seq  [hh:mm:ss:mss] Module resolution kind is not specified, using 'Node10'.
Info seq  [hh:mm:ss:mss] Loading module as file / folder, candidate module location '/src/projects/common/moduleB', target file types: TypeScript, Declaration.
Info seq  [hh:mm:ss:mss] File '/src/projects/common/moduleB.ts' exists - use it as a name resolution result.
Info seq  [hh:mm:ss:mss] ======== Module name '../common/moduleB' was successfully resolved to '/src/projects/common/moduleB.ts'. ========
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /src/projects/common/moduleB.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] ======== Resolving module 'moduleX' from '/src/projects/common/moduleB.ts'. ========
Info seq  [hh:mm:ss:mss] Using compiler options of project reference redirect '/src/projects/common/tsconfig.json'.
Info seq  [hh:mm:ss:mss] Module resolution kind is not specified, using 'Node10'.
Info seq  [hh:mm:ss:mss] Loading module 'moduleX' from 'node_modules' folder, target file types: TypeScript, Declaration.
Info seq  [hh:mm:ss:mss] Directory '/src/projects/common/node_modules' does not exist, skipping all lookups in it.
Info seq  [hh:mm:ss:mss] Resolution for module 'moduleX' was found in cache from location '/src/projects'.
Info seq  [hh:mm:ss:mss] ======== Module name 'moduleX' was successfully resolved to '/src/projects/node_modules/moduleX/index.d.ts'. ========
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /src/projects/app/node_modules 1 undefined Project: /src/projects/app/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /src/projects/app/node_modules 1 undefined Project: /src/projects/app/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /a/lib/lib.d.ts 500 undefined Project: /src/projects/app/tsconfig.json WatchType: Missing file
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /src/projects/app/node_modules/@types 1 undefined Project: /src/projects/app/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /src/projects/app/node_modules/@types 1 undefined Project: /src/projects/app/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: /src/projects/app/tsconfig.json Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Project '/src/projects/app/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (4)
	/src/projects/node_modules/moduleX/index.d.ts Text-1 "export const x = 10;"
	/src/projects/app/appA.ts Text-1 "import { x } from \"moduleX\";\nexport const y = x;\n"
	/src/projects/common/moduleB.ts Text-1 "import { x } from \"moduleX\";\nexport const b = x;\n"
	/src/projects/app/appB.ts SVC-1-0 "import { x } from \"../common/moduleB\";\nexport const y = x;\n"


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
Info seq  [hh:mm:ss:mss] Search path: /src/projects/app
Info seq  [hh:mm:ss:mss] For info: /src/projects/app/tsconfig.json :: No config files found.
Info seq  [hh:mm:ss:mss] Project '/src/projects/app/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (4)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: /src/projects/app/appB.ts ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /src/projects/app/tsconfig.json
Info seq  [hh:mm:ss:mss] response:
    {
      "responseRequired": false
    }
After request

PolledWatches::
/src/projects/app/node_modules: *new*
  {"pollingInterval":500}
/a/lib/lib.d.ts: *new*
  {"pollingInterval":500}
/src/projects/app/node_modules/@types: *new*
  {"pollingInterval":500}

FsWatches::
/src/projects/app/tsconfig.json: *new*
  {}
/src/projects/app/appa.ts: *new*
  {}
/src/projects/common/tsconfig.json: *new*
  {}
/src/projects/common/moduleb.ts: *new*
  {}

FsWatchesRecursive::
/src/projects/app: *new*
  {}
/src/projects/common: *new*
  {}
/src/projects/node_modules: *new*
  {}
