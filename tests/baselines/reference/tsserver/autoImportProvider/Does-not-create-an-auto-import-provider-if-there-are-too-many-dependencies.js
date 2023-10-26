currentDirectory:: / useCaseSensitiveFileNames: false
Info seq  [hh:mm:ss:mss] Provided types map file "/a/lib/typesMap.json" doesn't exist
Before request
//// [/node_modules/package0/package.json]
{ "name": "package0" }

//// [/node_modules/package0/index.d.ts]


//// [/node_modules/package1/package.json]
{ "name": "package1" }

//// [/node_modules/package1/index.d.ts]


//// [/node_modules/package2/package.json]
{ "name": "package2" }

//// [/node_modules/package2/index.d.ts]


//// [/node_modules/package3/package.json]
{ "name": "package3" }

//// [/node_modules/package3/index.d.ts]


//// [/node_modules/package4/package.json]
{ "name": "package4" }

//// [/node_modules/package4/index.d.ts]


//// [/node_modules/package5/package.json]
{ "name": "package5" }

//// [/node_modules/package5/index.d.ts]


//// [/node_modules/package6/package.json]
{ "name": "package6" }

//// [/node_modules/package6/index.d.ts]


//// [/node_modules/package7/package.json]
{ "name": "package7" }

//// [/node_modules/package7/index.d.ts]


//// [/node_modules/package8/package.json]
{ "name": "package8" }

//// [/node_modules/package8/index.d.ts]


//// [/node_modules/package9/package.json]
{ "name": "package9" }

//// [/node_modules/package9/index.d.ts]


//// [/node_modules/package10/package.json]
{ "name": "package10" }

//// [/node_modules/package10/index.d.ts]


//// [/index.ts]


//// [/tsconfig.json]
{ "compilerOptions": { "module": "commonjs" } }

//// [/package.json]
{
  "package0": "*",
  "package1": "*",
  "package2": "*",
  "package3": "*",
  "package4": "*",
  "package5": "*",
  "package6": "*",
  "package7": "*",
  "package8": "*",
  "package9": "*",
  "package10": "*"
}


Info seq  [hh:mm:ss:mss] request:
    {
      "command": "open",
      "arguments": {
        "file": "/index.ts"
      },
      "seq": 1,
      "type": "request"
    }
Info seq  [hh:mm:ss:mss] Search path: /
Info seq  [hh:mm:ss:mss] For info: /index.ts :: Config file name: /tsconfig.json
Info seq  [hh:mm:ss:mss] Creating configuration project /tsconfig.json
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /tsconfig.json 2000 undefined Project: /tsconfig.json WatchType: Config file
Info seq  [hh:mm:ss:mss] Config: /tsconfig.json : {
 "rootNames": [
  "/index.ts"
 ],
 "options": {
  "module": 1,
  "configFilePath": "/tsconfig.json"
 }
}
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo:  1 undefined Config: /tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo:  1 undefined Config: /tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: /tsconfig.json
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /a/lib/lib.d.ts 500 undefined Project: /tsconfig.json WatchType: Missing file
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: /tsconfig.json Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Project '/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (1)
	/index.ts SVC-1-0 ""


	index.ts
	  Matched by default include pattern '**/*'

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /package.json 250 undefined WatchType: package.json file
Info seq  [hh:mm:ss:mss] Project '/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (1)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: /index.ts ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /tsconfig.json
Info seq  [hh:mm:ss:mss] response:
    {
      "responseRequired": false
    }
After request

PolledWatches::
/a/lib/lib.d.ts: *new*
  {"pollingInterval":500}

FsWatches::
/package.json: *new*
  {}
/tsconfig.json: *new*
  {}

FsWatchesRecursive::
/: *new*
  {}
