currentDirectory:: / useCaseSensitiveFileNames: false
Info 0    [00:00:15.000] Provided types map file "/typesMap.json" doesn't exist
Creating project service
//// [/users/username/projects/project/a.ts]
export const a = 10;

//// [/users/username/projects/project/tsconfig.json]
{}


Info 1    [00:00:16.000] Search path: /users/username/projects/project
Info 2    [00:00:17.000] For info: /users/username/projects/project/a.ts :: Config file name: /users/username/projects/project/tsconfig.json
Info 3    [00:00:18.000] Creating configuration project /users/username/projects/project/tsconfig.json
Info 4    [00:00:19.000] FileWatcher:: Added:: WatchInfo: /users/username/projects/project/tsconfig.json 2000 undefined Project: /users/username/projects/project/tsconfig.json WatchType: Config file
Info 5    [00:00:20.000] Config: /users/username/projects/project/tsconfig.json : {
 "rootNames": [
  "/users/username/projects/project/a.ts"
 ],
 "options": {
  "configFilePath": "/users/username/projects/project/tsconfig.json"
 }
}
Info 6    [00:00:21.000] DirectoryWatcher:: Added:: WatchInfo: /users/username/projects/project 1 undefined Config: /users/username/projects/project/tsconfig.json WatchType: Wild card directory
Info 7    [00:00:22.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /users/username/projects/project 1 undefined Config: /users/username/projects/project/tsconfig.json WatchType: Wild card directory
Info 8    [00:00:23.000] Starting updateGraphWorker: Project: /users/username/projects/project/tsconfig.json
Info 9    [00:00:24.000] FileWatcher:: Added:: WatchInfo: /a/lib/lib.d.ts 500 undefined Project: /users/username/projects/project/tsconfig.json WatchType: Missing file
Info 10   [00:00:25.000] DirectoryWatcher:: Added:: WatchInfo: /users/username/projects/project/node_modules/@types 1 undefined Project: /users/username/projects/project/tsconfig.json WatchType: Type roots
Info 11   [00:00:26.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /users/username/projects/project/node_modules/@types 1 undefined Project: /users/username/projects/project/tsconfig.json WatchType: Type roots
Info 12   [00:00:27.000] Finishing updateGraphWorker: Project: /users/username/projects/project/tsconfig.json Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 13   [00:00:28.000] Project '/users/username/projects/project/tsconfig.json' (Configured)
Info 14   [00:00:29.000] 	Files (1)
	/users/username/projects/project/a.ts SVC-1-0 "export const a = 10;"


	a.ts
	  Matched by default include pattern '**/*'

Info 15   [00:00:30.000] -----------------------------------------------
Info 16   [00:00:31.000] Project '/users/username/projects/project/tsconfig.json' (Configured)
Info 16   [00:00:32.000] 	Files (1)

Info 16   [00:00:33.000] -----------------------------------------------
Info 16   [00:00:34.000] Open files: 
Info 16   [00:00:35.000] 	FileName: /users/username/projects/project/a.ts ProjectRootPath: undefined
Info 16   [00:00:36.000] 		Projects: /users/username/projects/project/tsconfig.json
Info 16   [00:00:38.000] DirectoryWatcher:: Triggered with /users/username/projects/project/a.ts :: WatchInfo: /users/username/projects/project 1 undefined Config: /users/username/projects/project/tsconfig.json WatchType: Wild card directory
Info 17   [00:00:39.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /users/username/projects/project/a.ts :: WatchInfo: /users/username/projects/project 1 undefined Config: /users/username/projects/project/tsconfig.json WatchType: Wild card directory
Info 18   [00:00:42.000] DirectoryWatcher:: Triggered with /users/username/projects/project/a.ts :: WatchInfo: /users/username/projects/project 1 undefined Config: /users/username/projects/project/tsconfig.json WatchType: Wild card directory
Info 19   [00:00:43.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /users/username/projects/project/a.ts :: WatchInfo: /users/username/projects/project 1 undefined Config: /users/username/projects/project/tsconfig.json WatchType: Wild card directory
Timeout callback:: count: 0
Immedidate callback:: count: 0
//// [/users/username/projects/project/a.ts] file changed its modified time

PolledWatches::
/a/lib/lib.d.ts: *new*
  {"pollingInterval":500}
/users/username/projects/project/node_modules/@types: *new*
  {"pollingInterval":500}

FsWatches::
/users/username/projects/project/tsconfig.json: *new*
  {}

FsWatchesRecursive::
/users/username/projects/project: *new*
  {}
