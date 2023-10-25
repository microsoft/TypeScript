currentDirectory:: c:/ useCaseSensitiveFileNames: false
Info seq  [hh:mm:ss:mss] Provided types map file "/typesMap.json" doesn't exist
Creating project service
//// [C:/a/f1.ts]
let x = 1;

//// [C:/a/tsconfig.json]
{
  "compilerOptions": {
    "outDir": "C:\\a\\b"
  },
  "include": [
    "*.ts"
  ]
}


Info seq  [hh:mm:ss:mss] Search path: C:/a
Info seq  [hh:mm:ss:mss] For info: C:/a/f1.ts :: Config file name: C:/a/tsconfig.json
Info seq  [hh:mm:ss:mss] Creating configuration project C:/a/tsconfig.json
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: C:/a/tsconfig.json 2000 undefined Project: C:/a/tsconfig.json WatchType: Config file
Info seq  [hh:mm:ss:mss] Config: C:/a/tsconfig.json : {
 "rootNames": [
  "C:/a/f1.ts"
 ],
 "options": {
  "outDir": "C:/a/b",
  "configFilePath": "C:/a/tsconfig.json"
 }
}
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: c:/a 0 undefined Config: C:/a/tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: c:/a 0 undefined Config: C:/a/tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: C:/a/tsconfig.json
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: c:/a/lib/lib.d.ts 500 undefined Project: C:/a/tsconfig.json WatchType: Missing file
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: C:/a/node_modules/@types 1 undefined Project: C:/a/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: C:/a/node_modules/@types 1 undefined Project: C:/a/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: C:/a/tsconfig.json Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Project 'C:/a/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (1)
	C:/a/f1.ts SVC-1-0 "let x = 1;"


	f1.ts
	  Matched by include pattern '*.ts' in 'tsconfig.json'

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Project 'C:/a/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (1)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: C:/a/f1.ts ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: C:/a/tsconfig.json