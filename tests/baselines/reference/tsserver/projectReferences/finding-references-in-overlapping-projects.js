Provided types map file "/a/lib/typesMap.json" doesn't exist
request:{"seq":0,"type":"request","command":"open","arguments":{"file":"/user/username/projects/solution/b/index.ts"}}
Search path: /user/username/projects/solution/b
For info: /user/username/projects/solution/b/index.ts :: Config file name: /user/username/projects/solution/b/tsconfig.json
Creating configuration project /user/username/projects/solution/b/tsconfig.json
FileWatcher:: Added:: WatchInfo: /user/username/projects/solution/b/tsconfig.json 2000 undefined Project: /user/username/projects/solution/b/tsconfig.json WatchType: Config file
Config: /user/username/projects/solution/b/tsconfig.json : {
 "rootNames": [
  "/user/username/projects/solution/b/index.ts"
 ],
 "options": {
  "composite": true,
  "configFilePath": "/user/username/projects/solution/b/tsconfig.json"
 },
 "projectReferences": [
  {
   "path": "/user/username/projects/solution/a",
   "originalPath": "../a"
  }
 ]
}
Plugins were requested but not running in environment that supports 'require'. Nothing will be loaded
Starting updateGraphWorker: Project: /user/username/projects/solution/b/tsconfig.json
Config: /user/username/projects/solution/a/tsconfig.json : {
 "rootNames": [
  "/user/username/projects/solution/a/index.ts"
 ],
 "options": {
  "composite": true,
  "module": 0,
  "configFilePath": "/user/username/projects/solution/a/tsconfig.json"
 }
}
FileWatcher:: Added:: WatchInfo: /user/username/projects/solution/a/tsconfig.json 2000 undefined Project: /user/username/projects/solution/b/tsconfig.json WatchType: Config file
FileWatcher:: Added:: WatchInfo: /user/username/projects/solution/a/index.ts 500 undefined WatchType: Closed Script info
DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/solution 0 undefined Project: /user/username/projects/solution/b/tsconfig.json WatchType: Failed Lookup Locations
Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/solution 0 undefined Project: /user/username/projects/solution/b/tsconfig.json WatchType: Failed Lookup Locations
DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/solution/a 1 undefined Project: /user/username/projects/solution/b/tsconfig.json WatchType: Failed Lookup Locations
Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/solution/a 1 undefined Project: /user/username/projects/solution/b/tsconfig.json WatchType: Failed Lookup Locations
FileWatcher:: Added:: WatchInfo: /a/lib/lib.d.ts 500 undefined WatchType: Closed Script info
DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/solution/b/node_modules/@types 1 undefined Project: /user/username/projects/solution/b/tsconfig.json WatchType: Type roots
Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/solution/b/node_modules/@types 1 undefined Project: /user/username/projects/solution/b/tsconfig.json WatchType: Type roots
DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/solution/node_modules/@types 1 undefined Project: /user/username/projects/solution/b/tsconfig.json WatchType: Type roots
Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/solution/node_modules/@types 1 undefined Project: /user/username/projects/solution/b/tsconfig.json WatchType: Type roots
Finishing updateGraphWorker: Project: /user/username/projects/solution/b/tsconfig.json Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Project '/user/username/projects/solution/b/tsconfig.json' (Configured)
	Files (3)
	/a/lib/lib.d.ts
	/user/username/projects/solution/a/index.ts
	/user/username/projects/solution/b/index.ts


	../../../../../a/lib/lib.d.ts
	  Default library for target 'es3'
	../a/index.ts
	  Source from referenced project '../a/tsconfig.json' included because '--module' is specified as 'none'
	  Imported via "../a" from file 'index.ts'
	index.ts
	  Part of 'files' list in tsconfig.json

-----------------------------------------------
Search path: /user/username/projects/solution/b
For info: /user/username/projects/solution/b/tsconfig.json :: Config file name: /user/username/projects/solution/tsconfig.json
Creating configuration project /user/username/projects/solution/tsconfig.json
FileWatcher:: Added:: WatchInfo: /user/username/projects/solution/tsconfig.json 2000 undefined Project: /user/username/projects/solution/tsconfig.json WatchType: Config file
Search path: /user/username/projects/solution
For info: /user/username/projects/solution/tsconfig.json :: No config files found.
Project '/user/username/projects/solution/b/tsconfig.json' (Configured)
	Files (3)

-----------------------------------------------
Project '/user/username/projects/solution/tsconfig.json' (Configured)
	Files (0) InitialLoadPending

-----------------------------------------------
Open files: 
	FileName: /user/username/projects/solution/b/index.ts ProjectRootPath: undefined
		Projects: /user/username/projects/solution/b/tsconfig.json
response:{"responseRequired":false}
request:{"command":"references","arguments":{"file":"/user/username/projects/solution/b/index.ts","line":4,"offset":43},"seq":1,"type":"request"}
Finding references to /user/username/projects/solution/b/index.ts position 86 in project /user/username/projects/solution/b/tsconfig.json
Search path: /user/username/projects/solution/a
For info: /user/username/projects/solution/a/index.ts :: Config file name: /user/username/projects/solution/a/tsconfig.json
Creating configuration project /user/username/projects/solution/a/tsconfig.json
Plugins were requested but not running in environment that supports 'require'. Nothing will be loaded
Starting updateGraphWorker: Project: /user/username/projects/solution/a/tsconfig.json
DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/solution/a/node_modules/@types 1 undefined Project: /user/username/projects/solution/a/tsconfig.json WatchType: Type roots
Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/solution/a/node_modules/@types 1 undefined Project: /user/username/projects/solution/a/tsconfig.json WatchType: Type roots
DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/solution/node_modules/@types 1 undefined Project: /user/username/projects/solution/a/tsconfig.json WatchType: Type roots
Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/solution/node_modules/@types 1 undefined Project: /user/username/projects/solution/a/tsconfig.json WatchType: Type roots
Finishing updateGraphWorker: Project: /user/username/projects/solution/a/tsconfig.json Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Project '/user/username/projects/solution/a/tsconfig.json' (Configured)
	Files (2)
	/a/lib/lib.d.ts
	/user/username/projects/solution/a/index.ts


	../../../../../a/lib/lib.d.ts
	  Default library for target 'es3'
	index.ts
	  Part of 'files' list in tsconfig.json

-----------------------------------------------
Search path: /user/username/projects/solution/a
For info: /user/username/projects/solution/a/index.ts :: Config file name: /user/username/projects/solution/a/tsconfig.json
Finding references to /user/username/projects/solution/a/index.ts position 34 in project /user/username/projects/solution/a/tsconfig.json
Loading configured project /user/username/projects/solution/tsconfig.json
Config: /user/username/projects/solution/tsconfig.json : {
 "rootNames": [],
 "options": {
  "configFilePath": "/user/username/projects/solution/tsconfig.json"
 },
 "projectReferences": [
  {
   "path": "/user/username/projects/solution/a",
   "originalPath": "./a"
  },
  {
   "path": "/user/username/projects/solution/b",
   "originalPath": "./b"
  },
  {
   "path": "/user/username/projects/solution/c",
   "originalPath": "./c"
  },
  {
   "path": "/user/username/projects/solution/d",
   "originalPath": "./d"
  }
 ]
}
Plugins were requested but not running in environment that supports 'require'. Nothing will be loaded
Starting updateGraphWorker: Project: /user/username/projects/solution/tsconfig.json
Config: /user/username/projects/solution/c/tsconfig.json : {
 "rootNames": [
  "/user/username/projects/solution/c/index.ts"
 ],
 "options": {
  "composite": true,
  "configFilePath": "/user/username/projects/solution/c/tsconfig.json"
 },
 "projectReferences": [
  {
   "path": "/user/username/projects/solution/b",
   "originalPath": "../b"
  }
 ]
}
FileWatcher:: Added:: WatchInfo: /user/username/projects/solution/c/tsconfig.json 2000 undefined Project: /user/username/projects/solution/tsconfig.json WatchType: Config file
Config: /user/username/projects/solution/d/tsconfig.json : {
 "rootNames": [
  "/user/username/projects/solution/d/index.ts"
 ],
 "options": {
  "composite": true,
  "configFilePath": "/user/username/projects/solution/d/tsconfig.json"
 },
 "projectReferences": [
  {
   "path": "/user/username/projects/solution/c",
   "originalPath": "../c"
  }
 ]
}
FileWatcher:: Added:: WatchInfo: /user/username/projects/solution/d/tsconfig.json 2000 undefined Project: /user/username/projects/solution/tsconfig.json WatchType: Config file
DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/solution/node_modules/@types 1 undefined Project: /user/username/projects/solution/tsconfig.json WatchType: Type roots
Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/solution/node_modules/@types 1 undefined Project: /user/username/projects/solution/tsconfig.json WatchType: Type roots
Finishing updateGraphWorker: Project: /user/username/projects/solution/tsconfig.json Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Different program with same set of files
Creating configuration project /user/username/projects/solution/c/tsconfig.json
Plugins were requested but not running in environment that supports 'require'. Nothing will be loaded
FileWatcher:: Added:: WatchInfo: /user/username/projects/solution/c/index.ts 500 undefined WatchType: Closed Script info
Starting updateGraphWorker: Project: /user/username/projects/solution/c/tsconfig.json
DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/solution 0 undefined Project: /user/username/projects/solution/c/tsconfig.json WatchType: Failed Lookup Locations
Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/solution 0 undefined Project: /user/username/projects/solution/c/tsconfig.json WatchType: Failed Lookup Locations
DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/solution/a 1 undefined Project: /user/username/projects/solution/c/tsconfig.json WatchType: Failed Lookup Locations
Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/solution/a 1 undefined Project: /user/username/projects/solution/c/tsconfig.json WatchType: Failed Lookup Locations
DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/solution/b 1 undefined Project: /user/username/projects/solution/c/tsconfig.json WatchType: Failed Lookup Locations
Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/solution/b 1 undefined Project: /user/username/projects/solution/c/tsconfig.json WatchType: Failed Lookup Locations
DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/solution/c/node_modules/@types 1 undefined Project: /user/username/projects/solution/c/tsconfig.json WatchType: Type roots
Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/solution/c/node_modules/@types 1 undefined Project: /user/username/projects/solution/c/tsconfig.json WatchType: Type roots
DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/solution/node_modules/@types 1 undefined Project: /user/username/projects/solution/c/tsconfig.json WatchType: Type roots
Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/solution/node_modules/@types 1 undefined Project: /user/username/projects/solution/c/tsconfig.json WatchType: Type roots
Finishing updateGraphWorker: Project: /user/username/projects/solution/c/tsconfig.json Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Project '/user/username/projects/solution/c/tsconfig.json' (Configured)
	Files (4)
	/a/lib/lib.d.ts
	/user/username/projects/solution/a/index.ts
	/user/username/projects/solution/b/index.ts
	/user/username/projects/solution/c/index.ts


	../../../../../a/lib/lib.d.ts
	  Default library for target 'es3'
	../a/index.ts
	  Imported via "../a" from file 'index.ts'
	  Imported via "../a" from file '../b/index.ts'
	../b/index.ts
	  Imported via "../b" from file 'index.ts'
	index.ts
	  Part of 'files' list in tsconfig.json

-----------------------------------------------
Creating configuration project /user/username/projects/solution/d/tsconfig.json
Plugins were requested but not running in environment that supports 'require'. Nothing will be loaded
FileWatcher:: Added:: WatchInfo: /user/username/projects/solution/d/index.ts 500 undefined WatchType: Closed Script info
Starting updateGraphWorker: Project: /user/username/projects/solution/d/tsconfig.json
DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/solution 0 undefined Project: /user/username/projects/solution/d/tsconfig.json WatchType: Failed Lookup Locations
Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/solution 0 undefined Project: /user/username/projects/solution/d/tsconfig.json WatchType: Failed Lookup Locations
DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/solution/a 1 undefined Project: /user/username/projects/solution/d/tsconfig.json WatchType: Failed Lookup Locations
Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/solution/a 1 undefined Project: /user/username/projects/solution/d/tsconfig.json WatchType: Failed Lookup Locations
DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/solution/c 1 undefined Project: /user/username/projects/solution/d/tsconfig.json WatchType: Failed Lookup Locations
Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/solution/c 1 undefined Project: /user/username/projects/solution/d/tsconfig.json WatchType: Failed Lookup Locations
DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/solution/b 1 undefined Project: /user/username/projects/solution/d/tsconfig.json WatchType: Failed Lookup Locations
Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/solution/b 1 undefined Project: /user/username/projects/solution/d/tsconfig.json WatchType: Failed Lookup Locations
DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/solution/d/node_modules/@types 1 undefined Project: /user/username/projects/solution/d/tsconfig.json WatchType: Type roots
Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/solution/d/node_modules/@types 1 undefined Project: /user/username/projects/solution/d/tsconfig.json WatchType: Type roots
DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/solution/node_modules/@types 1 undefined Project: /user/username/projects/solution/d/tsconfig.json WatchType: Type roots
Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/solution/node_modules/@types 1 undefined Project: /user/username/projects/solution/d/tsconfig.json WatchType: Type roots
Finishing updateGraphWorker: Project: /user/username/projects/solution/d/tsconfig.json Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Project '/user/username/projects/solution/d/tsconfig.json' (Configured)
	Files (5)
	/a/lib/lib.d.ts
	/user/username/projects/solution/a/index.ts
	/user/username/projects/solution/b/index.ts
	/user/username/projects/solution/c/index.ts
	/user/username/projects/solution/d/index.ts


	../../../../../a/lib/lib.d.ts
	  Default library for target 'es3'
	../a/index.ts
	  Imported via "../a" from file 'index.ts'
	  Imported via "../a" from file '../c/index.ts'
	  Imported via "../a" from file '../b/index.ts'
	../b/index.ts
	  Imported via "../b" from file '../c/index.ts'
	../c/index.ts
	  Imported via "../c" from file 'index.ts'
	index.ts
	  Part of 'files' list in tsconfig.json

-----------------------------------------------
Finding references to /user/username/projects/solution/a/index.ts position 34 in project /user/username/projects/solution/c/tsconfig.json
Search path: /user/username/projects/solution/a
For info: /user/username/projects/solution/a/index.ts :: Config file name: /user/username/projects/solution/a/tsconfig.json
Search path: /user/username/projects/solution/a
For info: /user/username/projects/solution/a/index.ts :: Config file name: /user/username/projects/solution/a/tsconfig.json
Search path: /user/username/projects/solution/b
For info: /user/username/projects/solution/b/index.ts :: Config file name: /user/username/projects/solution/b/tsconfig.json
Search path: /user/username/projects/solution/b
For info: /user/username/projects/solution/b/index.ts :: Config file name: /user/username/projects/solution/b/tsconfig.json
Search path: /user/username/projects/solution/b
For info: /user/username/projects/solution/b/index.ts :: Config file name: /user/username/projects/solution/b/tsconfig.json
Finding references to /user/username/projects/solution/a/index.ts position 34 in project /user/username/projects/solution/d/tsconfig.json
Search path: /user/username/projects/solution/a
For info: /user/username/projects/solution/a/index.ts :: Config file name: /user/username/projects/solution/a/tsconfig.json
Search path: /user/username/projects/solution/a
For info: /user/username/projects/solution/a/index.ts :: Config file name: /user/username/projects/solution/a/tsconfig.json
Search path: /user/username/projects/solution/b
For info: /user/username/projects/solution/b/index.ts :: Config file name: /user/username/projects/solution/b/tsconfig.json
Search path: /user/username/projects/solution/b
For info: /user/username/projects/solution/b/index.ts :: Config file name: /user/username/projects/solution/b/tsconfig.json
Search path: /user/username/projects/solution/b
For info: /user/username/projects/solution/b/index.ts :: Config file name: /user/username/projects/solution/b/tsconfig.json
Search path: /user/username/projects/solution/c
For info: /user/username/projects/solution/c/index.ts :: Config file name: /user/username/projects/solution/c/tsconfig.json
Search path: /user/username/projects/solution/c
For info: /user/username/projects/solution/c/index.ts :: Config file name: /user/username/projects/solution/c/tsconfig.json
Search path: /user/username/projects/solution/c
For info: /user/username/projects/solution/c/index.ts :: Config file name: /user/username/projects/solution/c/tsconfig.json
response:{"response":{"refs":[{"file":"/user/username/projects/solution/b/index.ts","start":{"line":2,"offset":26},"end":{"line":2,"offset":27},"contextStart":{"line":2,"offset":17},"contextEnd":{"line":2,"offset":42},"lineText":"                import { I } from \"../a\";","isWriteAccess":true},{"file":"/user/username/projects/solution/b/index.ts","start":{"line":4,"offset":43},"end":{"line":4,"offset":44},"lineText":"                export class B implements I {","isWriteAccess":false},{"file":"/user/username/projects/solution/a/index.ts","start":{"line":2,"offset":34},"end":{"line":2,"offset":35},"contextStart":{"line":2,"offset":17},"contextEnd":{"line":4,"offset":18},"lineText":"                export interface I {","isWriteAccess":true},{"file":"/user/username/projects/solution/c/index.ts","start":{"line":2,"offset":26},"end":{"line":2,"offset":27},"contextStart":{"line":2,"offset":17},"contextEnd":{"line":2,"offset":42},"lineText":"                import { I } from \"../a\";","isWriteAccess":true},{"file":"/user/username/projects/solution/c/index.ts","start":{"line":5,"offset":33},"end":{"line":5,"offset":34},"lineText":"                export const C: I = new B();","isWriteAccess":false},{"file":"/user/username/projects/solution/d/index.ts","start":{"line":2,"offset":26},"end":{"line":2,"offset":27},"contextStart":{"line":2,"offset":17},"contextEnd":{"line":2,"offset":42},"lineText":"                import { I } from \"../a\";","isWriteAccess":true},{"file":"/user/username/projects/solution/d/index.ts","start":{"line":5,"offset":33},"end":{"line":5,"offset":34},"lineText":"                export const D: I = C;","isWriteAccess":false}],"symbolName":"I","symbolStartOffset":43,"symbolDisplayString":"(alias) interface I\nimport I"},"responseRequired":true}
request:{"command":"references","arguments":{"file":"/user/username/projects/solution/b/index.ts","line":4,"offset":43},"seq":2,"type":"request"}
Finding references to /user/username/projects/solution/b/index.ts position 86 in project /user/username/projects/solution/b/tsconfig.json
Search path: /user/username/projects/solution/a
For info: /user/username/projects/solution/a/index.ts :: Config file name: /user/username/projects/solution/a/tsconfig.json
Search path: /user/username/projects/solution/a
For info: /user/username/projects/solution/a/index.ts :: Config file name: /user/username/projects/solution/a/tsconfig.json
Finding references to /user/username/projects/solution/b/index.ts position 86 in project /user/username/projects/solution/c/tsconfig.json
Search path: /user/username/projects/solution/b
For info: /user/username/projects/solution/b/index.ts :: Config file name: /user/username/projects/solution/b/tsconfig.json
Search path: /user/username/projects/solution/b
For info: /user/username/projects/solution/b/index.ts :: Config file name: /user/username/projects/solution/b/tsconfig.json
Search path: /user/username/projects/solution/b
For info: /user/username/projects/solution/b/index.ts :: Config file name: /user/username/projects/solution/b/tsconfig.json
Search path: /user/username/projects/solution/a
For info: /user/username/projects/solution/a/index.ts :: Config file name: /user/username/projects/solution/a/tsconfig.json
Search path: /user/username/projects/solution/a
For info: /user/username/projects/solution/a/index.ts :: Config file name: /user/username/projects/solution/a/tsconfig.json
Finding references to /user/username/projects/solution/b/index.ts position 86 in project /user/username/projects/solution/d/tsconfig.json
Search path: /user/username/projects/solution/b
For info: /user/username/projects/solution/b/index.ts :: Config file name: /user/username/projects/solution/b/tsconfig.json
Search path: /user/username/projects/solution/b
For info: /user/username/projects/solution/b/index.ts :: Config file name: /user/username/projects/solution/b/tsconfig.json
Search path: /user/username/projects/solution/b
For info: /user/username/projects/solution/b/index.ts :: Config file name: /user/username/projects/solution/b/tsconfig.json
Search path: /user/username/projects/solution/a
For info: /user/username/projects/solution/a/index.ts :: Config file name: /user/username/projects/solution/a/tsconfig.json
Search path: /user/username/projects/solution/a
For info: /user/username/projects/solution/a/index.ts :: Config file name: /user/username/projects/solution/a/tsconfig.json
Search path: /user/username/projects/solution/c
For info: /user/username/projects/solution/c/index.ts :: Config file name: /user/username/projects/solution/c/tsconfig.json
Search path: /user/username/projects/solution/c
For info: /user/username/projects/solution/c/index.ts :: Config file name: /user/username/projects/solution/c/tsconfig.json
Search path: /user/username/projects/solution/c
For info: /user/username/projects/solution/c/index.ts :: Config file name: /user/username/projects/solution/c/tsconfig.json
Finding references to /user/username/projects/solution/a/index.ts position 34 in project /user/username/projects/solution/a/tsconfig.json
response:{"response":{"refs":[{"file":"/user/username/projects/solution/b/index.ts","start":{"line":2,"offset":26},"end":{"line":2,"offset":27},"contextStart":{"line":2,"offset":17},"contextEnd":{"line":2,"offset":42},"lineText":"                import { I } from \"../a\";","isWriteAccess":true},{"file":"/user/username/projects/solution/b/index.ts","start":{"line":4,"offset":43},"end":{"line":4,"offset":44},"lineText":"                export class B implements I {","isWriteAccess":false},{"file":"/user/username/projects/solution/a/index.ts","start":{"line":2,"offset":34},"end":{"line":2,"offset":35},"contextStart":{"line":2,"offset":17},"contextEnd":{"line":4,"offset":18},"lineText":"                export interface I {","isWriteAccess":true},{"file":"/user/username/projects/solution/c/index.ts","start":{"line":2,"offset":26},"end":{"line":2,"offset":27},"contextStart":{"line":2,"offset":17},"contextEnd":{"line":2,"offset":42},"lineText":"                import { I } from \"../a\";","isWriteAccess":true},{"file":"/user/username/projects/solution/c/index.ts","start":{"line":5,"offset":33},"end":{"line":5,"offset":34},"lineText":"                export const C: I = new B();","isWriteAccess":false},{"file":"/user/username/projects/solution/d/index.ts","start":{"line":2,"offset":26},"end":{"line":2,"offset":27},"contextStart":{"line":2,"offset":17},"contextEnd":{"line":2,"offset":42},"lineText":"                import { I } from \"../a\";","isWriteAccess":true},{"file":"/user/username/projects/solution/d/index.ts","start":{"line":5,"offset":33},"end":{"line":5,"offset":34},"lineText":"                export const D: I = C;","isWriteAccess":false}],"symbolName":"I","symbolStartOffset":43,"symbolDisplayString":"(alias) interface I\nimport I"},"responseRequired":true}