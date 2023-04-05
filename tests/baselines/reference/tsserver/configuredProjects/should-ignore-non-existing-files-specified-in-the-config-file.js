currentDirectory:: / useCaseSensitiveFileNames: false
Info 0    [00:00:13.000] Provided types map file "/typesMap.json" doesn't exist
Creating project service
//// [/a/b/commonFile1.ts]
let x = 1

//// [/a/b/commonFile2.ts]
let y = 1

//// [/a/b/tsconfig.json]
{
                    "compilerOptions": {},
                    "files": [
                        "commonFile1.ts",
                        "commonFile3.ts"
                    ]
                }


Info 1    [00:00:14.000] Search path: /a/b
Info 2    [00:00:15.000] For info: /a/b/commonFile1.ts :: Config file name: /a/b/tsconfig.json
Info 3    [00:00:16.000] Creating configuration project /a/b/tsconfig.json
Info 4    [00:00:17.000] FileWatcher:: Added:: WatchInfo: /a/b/tsconfig.json 2000 undefined Project: /a/b/tsconfig.json WatchType: Config file
Info 5    [00:00:18.000] Config: /a/b/tsconfig.json : {
 "rootNames": [
  "/a/b/commonFile1.ts",
  "/a/b/commonFile3.ts"
 ],
 "options": {
  "configFilePath": "/a/b/tsconfig.json"
 }
}
Info 6    [00:00:19.000] Starting updateGraphWorker: Project: /a/b/tsconfig.json
Info 7    [00:00:20.000] FileWatcher:: Added:: WatchInfo: /a/b/commonfile3.ts 500 undefined Project: /a/b/tsconfig.json WatchType: Missing file
Info 8    [00:00:21.000] FileWatcher:: Added:: WatchInfo: /a/lib/lib.d.ts 500 undefined Project: /a/b/tsconfig.json WatchType: Missing file
Info 9    [00:00:22.000] DirectoryWatcher:: Added:: WatchInfo: /a/b/node_modules/@types 1 undefined Project: /a/b/tsconfig.json WatchType: Type roots
Info 10   [00:00:23.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /a/b/node_modules/@types 1 undefined Project: /a/b/tsconfig.json WatchType: Type roots
Info 11   [00:00:24.000] Finishing updateGraphWorker: Project: /a/b/tsconfig.json Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 12   [00:00:25.000] Project '/a/b/tsconfig.json' (Configured)
Info 13   [00:00:26.000] 	Files (1)
	/a/b/commonFile1.ts SVC-1-0 "let x = 1"


	commonFile1.ts
	  Part of 'files' list in tsconfig.json

Info 14   [00:00:27.000] -----------------------------------------------
Info 15   [00:00:28.000] Project '/a/b/tsconfig.json' (Configured)
Info 15   [00:00:29.000] 	Files (1)

Info 15   [00:00:30.000] -----------------------------------------------
Info 15   [00:00:31.000] Open files: 
Info 15   [00:00:32.000] 	FileName: /a/b/commonFile1.ts ProjectRootPath: undefined
Info 15   [00:00:33.000] 		Projects: /a/b/tsconfig.json
Info 15   [00:00:34.000] Search path: /a/b
Info 16   [00:00:35.000] For info: /a/b/commonFile2.ts :: Config file name: /a/b/tsconfig.json
Info 17   [00:00:36.000] Starting updateGraphWorker: Project: /dev/null/inferredProject1*
Info 18   [00:00:37.000] FileWatcher:: Added:: WatchInfo: /a/lib/lib.d.ts 500 undefined Project: /dev/null/inferredProject1* WatchType: Missing file
Info 19   [00:00:38.000] DirectoryWatcher:: Added:: WatchInfo: /a/b/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info 20   [00:00:39.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /a/b/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info 21   [00:00:40.000] Finishing updateGraphWorker: Project: /dev/null/inferredProject1* Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 22   [00:00:41.000] Project '/dev/null/inferredProject1*' (Inferred)
Info 23   [00:00:42.000] 	Files (1)
	/a/b/commonFile2.ts SVC-1-0 "let y = 1"


	commonFile2.ts
	  Root file specified for compilation

Info 24   [00:00:43.000] -----------------------------------------------
Info 25   [00:00:44.000] Project '/a/b/tsconfig.json' (Configured)
Info 25   [00:00:45.000] 	Files (1)

Info 25   [00:00:46.000] -----------------------------------------------
Info 25   [00:00:47.000] Project '/dev/null/inferredProject1*' (Inferred)
Info 25   [00:00:48.000] 	Files (1)

Info 25   [00:00:49.000] -----------------------------------------------
Info 25   [00:00:50.000] Open files: 
Info 25   [00:00:51.000] 	FileName: /a/b/commonFile1.ts ProjectRootPath: undefined
Info 25   [00:00:52.000] 		Projects: /a/b/tsconfig.json
Info 25   [00:00:53.000] 	FileName: /a/b/commonFile2.ts ProjectRootPath: undefined
Info 25   [00:00:54.000] 		Projects: /dev/null/inferredProject1*