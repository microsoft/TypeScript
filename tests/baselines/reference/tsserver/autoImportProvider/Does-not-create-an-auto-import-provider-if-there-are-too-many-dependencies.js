currentDirectory:: / useCaseSensitiveFileNames: false
Info 0    [00:01:17.000] Provided types map file "/a/lib/typesMap.json" doesn't exist
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
{"package0":"*","package1":"*","package2":"*","package3":"*","package4":"*","package5":"*","package6":"*","package7":"*","package8":"*","package9":"*","package10":"*"}


Info 1    [00:01:18.000] request:
    {
      "command": "open",
      "arguments": {
        "file": "/index.ts"
      },
      "seq": 1,
      "type": "request"
    }
Info 2    [00:01:19.000] Search path: /
Info 3    [00:01:20.000] For info: /index.ts :: Config file name: /tsconfig.json
Info 4    [00:01:21.000] Creating configuration project /tsconfig.json
Info 5    [00:01:22.000] FileWatcher:: Added:: WatchInfo: /tsconfig.json 2000 undefined Project: /tsconfig.json WatchType: Config file
Info 6    [00:01:23.000] Config: /tsconfig.json : {
 "rootNames": [
  "/index.ts"
 ],
 "options": {
  "module": 1,
  "configFilePath": "/tsconfig.json"
 }
}
Info 7    [00:01:24.000] DirectoryWatcher:: Added:: WatchInfo:  1 undefined Config: /tsconfig.json WatchType: Wild card directory
Info 8    [00:01:25.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo:  1 undefined Config: /tsconfig.json WatchType: Wild card directory
Info 9    [00:01:26.000] Starting updateGraphWorker: Project: /tsconfig.json
Info 10   [00:01:27.000] FileWatcher:: Added:: WatchInfo: /a/lib/lib.d.ts 500 undefined Project: /tsconfig.json WatchType: Missing file
Info 11   [00:01:28.000] Finishing updateGraphWorker: Project: /tsconfig.json Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 12   [00:01:29.000] Project '/tsconfig.json' (Configured)
Info 13   [00:01:30.000] 	Files (1)
	/index.ts SVC-1-0 ""


	index.ts
	  Matched by default include pattern '**/*'

Info 14   [00:01:31.000] -----------------------------------------------
Info 15   [00:01:32.000] FileWatcher:: Added:: WatchInfo: /package.json 250 undefined WatchType: package.json file
Info 16   [00:01:33.000] Project '/tsconfig.json' (Configured)
Info 16   [00:01:34.000] 	Files (1)

Info 16   [00:01:35.000] -----------------------------------------------
Info 16   [00:01:36.000] Open files: 
Info 16   [00:01:37.000] 	FileName: /index.ts ProjectRootPath: undefined
Info 16   [00:01:38.000] 		Projects: /tsconfig.json
Info 16   [00:01:39.000] response:
    {
      "responseRequired": false
    }
After request

PolledWatches::
/a/lib/lib.d.ts: *new*
  {"pollingInterval":500}

FsWatches::
/tsconfig.json: *new*
  {}
/package.json: *new*
  {}

FsWatchesRecursive::
/: *new*
  {}
