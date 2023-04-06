currentDirectory:: / useCaseSensitiveFileNames: false
Info 0    [00:00:11.000] Provided types map file "/typesMap.json" doesn't exist
Creating project service
//// [/a/b/file1.ts]
let t = 10;

//// [/a/b/tsconfig.json]
{
                    "compilerOptions": {},
                    "include": ["app/*", "test/**/*", "something"]
                }


Info 1    [00:00:12.000] Search path: /a/b
Info 2    [00:00:13.000] For info: /a/b/file1.ts :: Config file name: /a/b/tsconfig.json
Info 3    [00:00:14.000] Creating configuration project /a/b/tsconfig.json
Info 4    [00:00:15.000] FileWatcher:: Added:: WatchInfo: /a/b/tsconfig.json 2000 undefined Project: /a/b/tsconfig.json WatchType: Config file
Info 5    [00:00:16.000] Config: /a/b/tsconfig.json : {
 "rootNames": [],
 "options": {
  "configFilePath": "/a/b/tsconfig.json"
 }
}
Info 6    [00:00:17.000] DirectoryWatcher:: Added:: WatchInfo: /a/b/app 0 undefined Config: /a/b/tsconfig.json WatchType: Wild card directory
Info 7    [00:00:18.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /a/b/app 0 undefined Config: /a/b/tsconfig.json WatchType: Wild card directory
Info 8    [00:00:19.000] DirectoryWatcher:: Added:: WatchInfo: /a/b/test 1 undefined Config: /a/b/tsconfig.json WatchType: Wild card directory
Info 9    [00:00:20.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /a/b/test 1 undefined Config: /a/b/tsconfig.json WatchType: Wild card directory
Info 10   [00:00:21.000] DirectoryWatcher:: Added:: WatchInfo: /a/b/something 1 undefined Config: /a/b/tsconfig.json WatchType: Wild card directory
Info 11   [00:00:22.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /a/b/something 1 undefined Config: /a/b/tsconfig.json WatchType: Wild card directory
Info 12   [00:00:23.000] Starting updateGraphWorker: Project: /a/b/tsconfig.json
Info 13   [00:00:24.000] DirectoryWatcher:: Added:: WatchInfo: /a/b/node_modules/@types 1 undefined Project: /a/b/tsconfig.json WatchType: Type roots
Info 14   [00:00:25.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /a/b/node_modules/@types 1 undefined Project: /a/b/tsconfig.json WatchType: Type roots
Info 15   [00:00:26.000] Finishing updateGraphWorker: Project: /a/b/tsconfig.json Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 16   [00:00:27.000] Project '/a/b/tsconfig.json' (Configured)
Info 17   [00:00:28.000] 	Files (0)

Info 18   [00:00:29.000] -----------------------------------------------
Info 19   [00:00:30.000] Starting updateGraphWorker: Project: /dev/null/inferredProject1*
Info 20   [00:00:31.000] FileWatcher:: Added:: WatchInfo: /a/lib/lib.d.ts 500 undefined Project: /dev/null/inferredProject1* WatchType: Missing file
Info 21   [00:00:32.000] DirectoryWatcher:: Added:: WatchInfo: /a/b/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info 22   [00:00:33.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /a/b/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info 23   [00:00:34.000] Finishing updateGraphWorker: Project: /dev/null/inferredProject1* Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 24   [00:00:35.000] Project '/dev/null/inferredProject1*' (Inferred)
Info 25   [00:00:36.000] 	Files (1)
	/a/b/file1.ts SVC-1-0 "let t = 10;"


	file1.ts
	  Root file specified for compilation

Info 26   [00:00:37.000] -----------------------------------------------
Info 27   [00:00:38.000] Project '/a/b/tsconfig.json' (Configured)
Info 27   [00:00:39.000] 	Files (0)

Info 27   [00:00:40.000] -----------------------------------------------
Info 27   [00:00:41.000] Project '/dev/null/inferredProject1*' (Inferred)
Info 27   [00:00:42.000] 	Files (1)

Info 27   [00:00:43.000] -----------------------------------------------
Info 27   [00:00:44.000] Open files: 
Info 27   [00:00:45.000] 	FileName: /a/b/file1.ts ProjectRootPath: undefined
Info 27   [00:00:46.000] 		Projects: /dev/null/inferredProject1*
Before running Timeout callback:: count: 0

PolledWatches::
/a/b/app: *new*
  {"pollingInterval":500}
/a/b/test: *new*
  {"pollingInterval":500}
/a/b/something: *new*
  {"pollingInterval":500}
/a/b/node_modules/@types: *new*
  {"pollingInterval":500}
/a/lib/lib.d.ts: *new*
  {"pollingInterval":500}

FsWatches::
/a/b/tsconfig.json: *new*
  {}

After running Timeout callback:: count: 0
