currentDirectory:: c:/ useCaseSensitiveFileNames: false
Info 0    [00:00:09.000] Provided types map file "/typesMap.json" doesn't exist
Creating project service
//// [C:/a/f1.ts]
let x = 1;

//// [C:/a/tsconfig.json]
{"compilerOptions":{"outDir":"C:\\a\\b"},"include":["*.ts"]}


Info 1    [00:00:10.000] Search path: C:/a
Info 2    [00:00:11.000] For info: C:/a/f1.ts :: Config file name: C:/a/tsconfig.json
Info 3    [00:00:12.000] Creating configuration project C:/a/tsconfig.json
Info 4    [00:00:13.000] FileWatcher:: Added:: WatchInfo: C:/a/tsconfig.json 2000 undefined Project: C:/a/tsconfig.json WatchType: Config file
Info 5    [00:00:14.000] Config: C:/a/tsconfig.json : {
 "rootNames": [
  "C:/a/f1.ts"
 ],
 "options": {
  "outDir": "C:/a/b",
  "configFilePath": "C:/a/tsconfig.json"
 }
}
Info 6    [00:00:15.000] DirectoryWatcher:: Added:: WatchInfo: c:/a 0 undefined Config: C:/a/tsconfig.json WatchType: Wild card directory
Info 7    [00:00:16.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: c:/a 0 undefined Config: C:/a/tsconfig.json WatchType: Wild card directory
Info 8    [00:00:17.000] Starting updateGraphWorker: Project: C:/a/tsconfig.json
Info 9    [00:00:18.000] FileWatcher:: Added:: WatchInfo: c:/a/lib/lib.d.ts 500 undefined Project: C:/a/tsconfig.json WatchType: Missing file
Info 10   [00:00:19.000] DirectoryWatcher:: Added:: WatchInfo: C:/a/node_modules/@types 1 undefined Project: C:/a/tsconfig.json WatchType: Type roots
Info 11   [00:00:20.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: C:/a/node_modules/@types 1 undefined Project: C:/a/tsconfig.json WatchType: Type roots
Info 12   [00:00:21.000] Finishing updateGraphWorker: Project: C:/a/tsconfig.json Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 13   [00:00:22.000] Project 'C:/a/tsconfig.json' (Configured)
Info 14   [00:00:23.000] 	Files (1)
	C:/a/f1.ts SVC-1-0 "let x = 1;"


	f1.ts
	  Matched by include pattern '*.ts' in 'tsconfig.json'

Info 15   [00:00:24.000] -----------------------------------------------
Info 16   [00:00:25.000] Project 'C:/a/tsconfig.json' (Configured)
Info 16   [00:00:26.000] 	Files (1)

Info 16   [00:00:27.000] -----------------------------------------------
Info 16   [00:00:28.000] Open files: 
Info 16   [00:00:29.000] 	FileName: C:/a/f1.ts ProjectRootPath: undefined
Info 16   [00:00:30.000] 		Projects: C:/a/tsconfig.json