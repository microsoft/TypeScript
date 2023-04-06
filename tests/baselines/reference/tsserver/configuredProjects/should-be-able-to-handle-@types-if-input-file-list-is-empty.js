currentDirectory:: /a useCaseSensitiveFileNames: false
Info 0    [00:00:19.000] Provided types map file "/typesMap.json" doesn't exist
Creating project service
//// [/a/app.ts]
let x = 1

//// [/a/tsconfig.json]
{"compiler":{},"files":[]}

//// [/a/node_modules/@types/typings/index.d.ts]
export * from "./lib"

//// [/a/node_modules/@types/typings/lib.d.ts]
export const x: number


Info 1    [00:00:20.000] Search path: /a
Info 2    [00:00:21.000] For info: /a/app.ts :: Config file name: /a/tsconfig.json
Info 3    [00:00:22.000] Creating configuration project /a/tsconfig.json
Info 4    [00:00:23.000] FileWatcher:: Added:: WatchInfo: /a/tsconfig.json 2000 undefined Project: /a/tsconfig.json WatchType: Config file
Info 5    [00:00:24.000] Config: /a/tsconfig.json : {
 "rootNames": [],
 "options": {
  "configFilePath": "/a/tsconfig.json"
 }
}
Info 6    [00:00:25.000] Starting updateGraphWorker: Project: /a/tsconfig.json
Info 7    [00:00:26.000] DirectoryWatcher:: Added:: WatchInfo: /a/node_modules/@types 1 undefined Project: /a/tsconfig.json WatchType: Type roots
Info 8    [00:00:27.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /a/node_modules/@types 1 undefined Project: /a/tsconfig.json WatchType: Type roots
Info 9    [00:00:28.000] Finishing updateGraphWorker: Project: /a/tsconfig.json Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 10   [00:00:29.000] Project '/a/tsconfig.json' (Configured)
Info 11   [00:00:30.000] 	Files (0)

Info 12   [00:00:31.000] -----------------------------------------------
Info 13   [00:00:32.000] Starting updateGraphWorker: Project: /dev/null/inferredProject1*
Info 14   [00:00:33.000] DirectoryWatcher:: Added:: WatchInfo: /a/node_modules 1 undefined WatchType: node_modules for closed script infos and package.jsons affecting module specifier cache
Info 15   [00:00:34.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /a/node_modules 1 undefined WatchType: node_modules for closed script infos and package.jsons affecting module specifier cache
Info 16   [00:00:35.000] DirectoryWatcher:: Added:: WatchInfo: /a/node_modules 1 undefined Project: /dev/null/inferredProject1* WatchType: Failed Lookup Locations
Info 17   [00:00:36.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /a/node_modules 1 undefined Project: /dev/null/inferredProject1* WatchType: Failed Lookup Locations
Info 18   [00:00:37.000] FileWatcher:: Added:: WatchInfo: /a/lib/lib.d.ts 500 undefined Project: /dev/null/inferredProject1* WatchType: Missing file
Info 19   [00:00:38.000] DirectoryWatcher:: Added:: WatchInfo: /a/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info 20   [00:00:39.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /a/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info 21   [00:00:40.000] Finishing updateGraphWorker: Project: /dev/null/inferredProject1* Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 22   [00:00:41.000] Project '/dev/null/inferredProject1*' (Inferred)
Info 23   [00:00:42.000] 	Files (3)
	/a/app.ts SVC-1-0 "let x = 1"
	/a/node_modules/@types/typings/lib.d.ts Text-1 "export const x: number"
	/a/node_modules/@types/typings/index.d.ts Text-1 "export * from \"./lib\""


	app.ts
	  Root file specified for compilation
	node_modules/@types/typings/lib.d.ts
	  Imported via "./lib" from file 'node_modules/@types/typings/index.d.ts'
	node_modules/@types/typings/index.d.ts
	  Entry point for implicit type library 'typings'

Info 24   [00:00:43.000] -----------------------------------------------
Info 25   [00:00:44.000] Project '/a/tsconfig.json' (Configured)
Info 25   [00:00:45.000] 	Files (0)

Info 25   [00:00:46.000] -----------------------------------------------
Info 25   [00:00:47.000] Project '/dev/null/inferredProject1*' (Inferred)
Info 25   [00:00:48.000] 	Files (3)

Info 25   [00:00:49.000] -----------------------------------------------
Info 25   [00:00:50.000] Open files: 
Info 25   [00:00:51.000] 	FileName: /a/app.ts ProjectRootPath: undefined
Info 25   [00:00:52.000] 		Projects: /dev/null/inferredProject1*