Provided types map file "/a/lib/typesMap.json" doesn't exist
request:{"command":"configure","arguments":{"watchOptions":{"fallbackPolling":"PriorityInterval"}},"seq":1,"type":"request"}
Host watch options changed to {"fallbackPolling":1}, it will be take effect for next watches.
response:
    {"seq":0,"type":"response","command":"configure","request_seq":1,"success":true}
response:{"responseRequired":false}
request:{"seq":0,"type":"request","command":"open","arguments":{"file":"/a/b/commonFile1.ts","projectRootPath":"/a/b"}}
Search path: /a/b
For info: /a/b/commonFile1.ts :: Config file name: /a/b/tsconfig.json
Creating configuration project /a/b/tsconfig.json
FileWatcher:: Added:: WatchInfo: /a/b/tsconfig.json 2000 {"fallbackPolling":1} Project: /a/b/tsconfig.json WatchType: Config file
Config: /a/b/tsconfig.json : {
 "rootNames": [
  "/a/b/commonFile1.ts",
  "/a/b/commonFile2.ts"
 ],
 "options": {
  "configFilePath": "/a/b/tsconfig.json"
 },
 "watchOptions": {
  "fallbackPolling": 1
 }
}
DirectoryWatcher:: Added:: WatchInfo: /a/b 1 {"fallbackPolling":1} Config: /a/b/tsconfig.json WatchType: Wild card directory
Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /a/b 1 {"fallbackPolling":1} Config: /a/b/tsconfig.json WatchType: Wild card directory
Plugins were requested but not running in environment that supports 'require'. Nothing will be loaded
FileWatcher:: Added:: WatchInfo: /a/b/commonFile2.ts 500 {"fallbackPolling":1} WatchType: Closed Script info
Starting updateGraphWorker: Project: /a/b/tsconfig.json
FileWatcher:: Added:: WatchInfo: /a/lib/lib.d.ts 500 {"fallbackPolling":1} WatchType: Closed Script info
DirectoryWatcher:: Added:: WatchInfo: /a/b/node_modules/@types 1 {"fallbackPolling":1} Project: /a/b/tsconfig.json WatchType: Type roots
Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /a/b/node_modules/@types 1 {"fallbackPolling":1} Project: /a/b/tsconfig.json WatchType: Type roots
Finishing updateGraphWorker: Project: /a/b/tsconfig.json Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Project '/a/b/tsconfig.json' (Configured)
	Files (3)
	/a/lib/lib.d.ts
	/a/b/commonFile1.ts
	/a/b/commonFile2.ts


	../lib/lib.d.ts
	  Default library for target 'es3'
	commonFile1.ts
	  Matched by default include pattern '**/*'
	commonFile2.ts
	  Matched by default include pattern '**/*'

-----------------------------------------------
Project '/a/b/tsconfig.json' (Configured)
	Files (3)

-----------------------------------------------
Open files: 
	FileName: /a/b/commonFile1.ts ProjectRootPath: /a/b
		Projects: /a/b/tsconfig.json
response:{"responseRequired":false}
PolledWatches::
/a/b/tsconfig.json:
  {"pollingInterval":2000}
/a/b:
  {"pollingInterval":500}
/a/b/commonfile2.ts:
  {"pollingInterval":500}
/a/lib/lib.d.ts:
  {"pollingInterval":500}
/a/b/node_modules/@types:
  {"pollingInterval":500}

FsWatches::

FsWatchesRecursive::
