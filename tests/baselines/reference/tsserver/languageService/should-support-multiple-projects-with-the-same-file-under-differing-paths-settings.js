currentDirectory:: / useCaseSensitiveFileNames: true
Info 0    [00:00:23.000] Provided types map file "/typesMap.json" doesn't exist
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


Info 1    [00:00:24.000] Search path: /project/a
Info 2    [00:00:25.000] For info: /project/a/index.ts :: Config file name: /project/a/tsconfig.json
Info 3    [00:00:26.000] Creating configuration project /project/a/tsconfig.json
Info 4    [00:00:27.000] FileWatcher:: Added:: WatchInfo: /project/a/tsconfig.json 2000 undefined Project: /project/a/tsconfig.json WatchType: Config file
Info 5    [00:00:28.000] Config: /project/a/tsconfig.json : {
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
Info 6    [00:00:29.000] FileWatcher:: Added:: WatchInfo: /project/a/foo.d.ts 500 undefined WatchType: Closed Script info
Info 7    [00:00:30.000] Starting updateGraphWorker: Project: /project/a/tsconfig.json
Info 8    [00:00:31.000] FileWatcher:: Added:: WatchInfo: /project/shared.ts 500 undefined WatchType: Closed Script info
Info 9    [00:00:32.000] FileWatcher:: Added:: WatchInfo: /project/lib.d.ts 500 undefined Project: /project/a/tsconfig.json WatchType: Missing file
Info 10   [00:00:33.000] DirectoryWatcher:: Added:: WatchInfo: /project/a/node_modules/@types 1 undefined Project: /project/a/tsconfig.json WatchType: Type roots
Info 11   [00:00:34.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /project/a/node_modules/@types 1 undefined Project: /project/a/tsconfig.json WatchType: Type roots
Info 12   [00:00:35.000] Finishing updateGraphWorker: Project: /project/a/tsconfig.json Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 13   [00:00:36.000] Project '/project/a/tsconfig.json' (Configured)
Info 14   [00:00:37.000] 	Files (3)
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

Info 15   [00:00:38.000] -----------------------------------------------
Info 16   [00:00:39.000] Project '/project/a/tsconfig.json' (Configured)
Info 16   [00:00:40.000] 	Files (3)

Info 16   [00:00:41.000] -----------------------------------------------
Info 16   [00:00:42.000] Open files: 
Info 16   [00:00:43.000] 	FileName: /project/a/index.ts ProjectRootPath: undefined
Info 16   [00:00:44.000] 		Projects: /project/a/tsconfig.json
Info 16   [00:00:45.000] Search path: /project/b
Info 17   [00:00:46.000] For info: /project/b/index.ts :: Config file name: /project/b/tsconfig.json
Info 18   [00:00:47.000] Creating configuration project /project/b/tsconfig.json
Info 19   [00:00:48.000] FileWatcher:: Added:: WatchInfo: /project/b/tsconfig.json 2000 undefined Project: /project/b/tsconfig.json WatchType: Config file
Info 20   [00:00:49.000] Config: /project/b/tsconfig.json : {
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
Info 21   [00:00:50.000] FileWatcher:: Added:: WatchInfo: /project/b/foo.d.ts 500 undefined WatchType: Closed Script info
Info 22   [00:00:51.000] Starting updateGraphWorker: Project: /project/b/tsconfig.json
Info 23   [00:00:52.000] FileWatcher:: Added:: WatchInfo: /project/lib.d.ts 500 undefined Project: /project/b/tsconfig.json WatchType: Missing file
Info 24   [00:00:53.000] DirectoryWatcher:: Added:: WatchInfo: /project/b/node_modules/@types 1 undefined Project: /project/b/tsconfig.json WatchType: Type roots
Info 25   [00:00:54.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /project/b/node_modules/@types 1 undefined Project: /project/b/tsconfig.json WatchType: Type roots
Info 26   [00:00:55.000] Finishing updateGraphWorker: Project: /project/b/tsconfig.json Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 27   [00:00:56.000] Project '/project/b/tsconfig.json' (Configured)
Info 28   [00:00:57.000] 	Files (3)
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

Info 29   [00:00:58.000] -----------------------------------------------
Info 30   [00:00:59.000] Project '/project/a/tsconfig.json' (Configured)
Info 30   [00:01:00.000] 	Files (3)

Info 30   [00:01:01.000] -----------------------------------------------
Info 30   [00:01:02.000] Project '/project/b/tsconfig.json' (Configured)
Info 30   [00:01:03.000] 	Files (3)

Info 30   [00:01:04.000] -----------------------------------------------
Info 30   [00:01:05.000] Open files: 
Info 30   [00:01:06.000] 	FileName: /project/a/index.ts ProjectRootPath: undefined
Info 30   [00:01:07.000] 		Projects: /project/a/tsconfig.json
Info 30   [00:01:08.000] 	FileName: /project/b/index.ts ProjectRootPath: undefined
Info 30   [00:01:09.000] 		Projects: /project/b/tsconfig.json
Info 30   [00:01:10.000] getSemanticDiagnostics:: /project/a/tsconfig.json:: 0
Info 31   [00:01:11.000] getSemanticDiagnostics:: /project/b/tsconfig.json:: 1
Info 32   [00:01:12.000] ../shared.ts(1,9): error TS2724: '"foo"' has no exported member named 'foo_a'. Did you mean 'foo_b'?
