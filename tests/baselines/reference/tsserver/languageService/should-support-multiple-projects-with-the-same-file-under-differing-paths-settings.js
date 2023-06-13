currentDirectory:: / useCaseSensitiveFileNames: true
Info seq  [hh:mm:ss:mss] Provided types map file "/typesMap.json" doesn't exist
Creating project service
//// [/project/shared.ts]
import {foo_a} from "foo";


//// [/project/a/tsconfig.json]
{ "compilerOptions": { "paths": { "foo": ["./foo.d.ts"] } }, "files": ["./index.ts", "./foo.d.ts"] }

//// [/project/a/foo.d.ts]
export const foo_a = 1;


//// [/project/a/index.ts]
import "../shared";

//// [/project/b/tsconfig.json]
{ "compilerOptions": { "paths": { "foo": ["./foo.d.ts"] } }, "files": ["./index.ts", "./foo.d.ts"] }

//// [/project/b/foo.d.ts]
export const foo_b = 1;


//// [/project/b/index.ts]
import "../shared";


Info seq  [hh:mm:ss:mss] Search path: /project/a
Info seq  [hh:mm:ss:mss] For info: /project/a/index.ts :: Config file name: /project/a/tsconfig.json
Info seq  [hh:mm:ss:mss] Creating configuration project /project/a/tsconfig.json
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /project/a/tsconfig.json 2000 undefined Project: /project/a/tsconfig.json WatchType: Config file
Info seq  [hh:mm:ss:mss] Config: /project/a/tsconfig.json : {
 "rootNames": [
  "/project/a/index.ts",
  "/project/a/foo.d.ts"
 ],
 "options": {
  "paths": {
   "foo": [
    "./foo.d.ts"
   ]
  },
  "pathsBasePath": "/project/a",
  "configFilePath": "/project/a/tsconfig.json"
 }
}
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /project/a/foo.d.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: /project/a/tsconfig.json
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /project/shared.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /project/lib.d.ts 500 undefined Project: /project/a/tsconfig.json WatchType: Missing file
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: /project/a/tsconfig.json Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Project '/project/a/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (3)
	/project/a/foo.d.ts Text-1 "export const foo_a = 1;\n"
	/project/shared.ts Text-1 "import {foo_a} from \"foo\";\n"
	/project/a/index.ts SVC-1-0 "import \"../shared\";"


	foo.d.ts
	  Imported via "foo" from file '../shared.ts'
	  Part of 'files' list in tsconfig.json
	../shared.ts
	  Imported via "../shared" from file 'index.ts'
	index.ts
	  Part of 'files' list in tsconfig.json

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Project '/project/a/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (3)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: /project/a/index.ts ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /project/a/tsconfig.json
Info seq  [hh:mm:ss:mss] Search path: /project/b
Info seq  [hh:mm:ss:mss] For info: /project/b/index.ts :: Config file name: /project/b/tsconfig.json
Info seq  [hh:mm:ss:mss] Creating configuration project /project/b/tsconfig.json
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /project/b/tsconfig.json 2000 undefined Project: /project/b/tsconfig.json WatchType: Config file
Info seq  [hh:mm:ss:mss] Config: /project/b/tsconfig.json : {
 "rootNames": [
  "/project/b/index.ts",
  "/project/b/foo.d.ts"
 ],
 "options": {
  "paths": {
   "foo": [
    "./foo.d.ts"
   ]
  },
  "pathsBasePath": "/project/b",
  "configFilePath": "/project/b/tsconfig.json"
 }
}
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /project/b/foo.d.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: /project/b/tsconfig.json
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /project/lib.d.ts 500 undefined Project: /project/b/tsconfig.json WatchType: Missing file
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: /project/b/tsconfig.json Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Project '/project/b/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (3)
	/project/b/foo.d.ts Text-1 "export const foo_b = 1;\n"
	/project/shared.ts Text-1 "import {foo_a} from \"foo\";\n"
	/project/b/index.ts SVC-1-0 "import \"../shared\";"


	foo.d.ts
	  Imported via "foo" from file '../shared.ts'
	  Part of 'files' list in tsconfig.json
	../shared.ts
	  Imported via "../shared" from file 'index.ts'
	index.ts
	  Part of 'files' list in tsconfig.json

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Project '/project/a/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (3)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Project '/project/b/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (3)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: /project/a/index.ts ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /project/a/tsconfig.json
Info seq  [hh:mm:ss:mss] 	FileName: /project/b/index.ts ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /project/b/tsconfig.json
Info seq  [hh:mm:ss:mss] getSemanticDiagnostics:: /project/a/tsconfig.json:: 0
Info seq  [hh:mm:ss:mss] getSemanticDiagnostics:: /project/b/tsconfig.json:: 1
Info seq  [hh:mm:ss:mss] ../shared.ts(1,9): error TS2724: '"foo"' has no exported member named 'foo_a'. Did you mean 'foo_b'?
