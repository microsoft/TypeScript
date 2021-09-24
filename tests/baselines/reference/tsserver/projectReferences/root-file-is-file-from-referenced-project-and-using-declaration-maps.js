Provided types map file "/a/lib/typesMap.json" doesn't exist
request:{"seq":0,"type":"request","command":"open","arguments":{"file":"/user/username/projects/project/src/common/input/keyboard.ts"}}
Search path: /user/username/projects/project/src/common/input
For info: /user/username/projects/project/src/common/input/keyboard.ts :: Config file name: /user/username/projects/project/src/common/tsconfig.json
Creating configuration project /user/username/projects/project/src/common/tsconfig.json
FileWatcher:: Added:: WatchInfo: /user/username/projects/project/src/common/tsconfig.json 2000 undefined Project: /user/username/projects/project/src/common/tsconfig.json WatchType: Config file
Config: /user/username/projects/project/src/common/tsconfig.json : {
 "rootNames": [
  "/user/username/projects/project/src/common/input/keyboard.test.ts",
  "/user/username/projects/project/src/common/input/keyboard.ts"
 ],
 "options": {
  "composite": true,
  "declarationMap": true,
  "outDir": "/user/username/projects/project/out",
  "baseUrl": "/user/username/projects/project/src",
  "disableSourceOfProjectReferenceRedirect": true,
  "configFilePath": "/user/username/projects/project/src/common/tsconfig.json"
 }
}
DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/project/src/common 1 undefined Config: /user/username/projects/project/src/common/tsconfig.json WatchType: Wild card directory
Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/project/src/common 1 undefined Config: /user/username/projects/project/src/common/tsconfig.json WatchType: Wild card directory
Plugins were requested but not running in environment that supports 'require'. Nothing will be loaded
FileWatcher:: Added:: WatchInfo: /user/username/projects/project/src/common/input/keyboard.test.ts 500 undefined WatchType: Closed Script info
Starting updateGraphWorker: Project: /user/username/projects/project/src/common/tsconfig.json
FileWatcher:: Added:: WatchInfo: /a/lib/lib.d.ts 500 undefined WatchType: Closed Script info
DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/project/src/common/node_modules/@types 1 undefined Project: /user/username/projects/project/src/common/tsconfig.json WatchType: Type roots
Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/project/src/common/node_modules/@types 1 undefined Project: /user/username/projects/project/src/common/tsconfig.json WatchType: Type roots
DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/project/src/node_modules/@types 1 undefined Project: /user/username/projects/project/src/common/tsconfig.json WatchType: Type roots
Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/project/src/node_modules/@types 1 undefined Project: /user/username/projects/project/src/common/tsconfig.json WatchType: Type roots
DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/project/node_modules/@types 1 undefined Project: /user/username/projects/project/src/common/tsconfig.json WatchType: Type roots
Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/project/node_modules/@types 1 undefined Project: /user/username/projects/project/src/common/tsconfig.json WatchType: Type roots
Finishing updateGraphWorker: Project: /user/username/projects/project/src/common/tsconfig.json Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Project '/user/username/projects/project/src/common/tsconfig.json' (Configured)
	Files (3)
	/a/lib/lib.d.ts
	/user/username/projects/project/src/common/input/keyboard.ts
	/user/username/projects/project/src/common/input/keyboard.test.ts


	../../../../../../a/lib/lib.d.ts
	  Default library for target 'es3'
	input/keyboard.ts
	  Imported via 'common/input/keyboard' from file 'input/keyboard.test.ts'
	  Matched by include pattern './**/*' in 'tsconfig.json'
	input/keyboard.test.ts
	  Matched by include pattern './**/*' in 'tsconfig.json'

-----------------------------------------------
Search path: /user/username/projects/project/src/common
For info: /user/username/projects/project/src/common/tsconfig.json :: Config file name: /user/username/projects/project/src/tsconfig.json
Creating configuration project /user/username/projects/project/src/tsconfig.json
FileWatcher:: Added:: WatchInfo: /user/username/projects/project/src/tsconfig.json 2000 undefined Project: /user/username/projects/project/src/tsconfig.json WatchType: Config file
Search path: /user/username/projects/project/src
For info: /user/username/projects/project/src/tsconfig.json :: No config files found.
Project '/user/username/projects/project/src/common/tsconfig.json' (Configured)
	Files (3)

-----------------------------------------------
Project '/user/username/projects/project/src/tsconfig.json' (Configured)
	Files (0) InitialLoadPending

-----------------------------------------------
Open files: 
	FileName: /user/username/projects/project/src/common/input/keyboard.ts ProjectRootPath: undefined
		Projects: /user/username/projects/project/src/common/tsconfig.json
response:{"responseRequired":false}
request:{"seq":0,"type":"request","command":"open","arguments":{"file":"/user/username/projects/project/src/terminal.ts"}}
Search path: /user/username/projects/project/src
For info: /user/username/projects/project/src/terminal.ts :: Config file name: /user/username/projects/project/src/tsconfig.json
Loading configured project /user/username/projects/project/src/tsconfig.json
Config: /user/username/projects/project/src/tsconfig.json : {
 "rootNames": [
  "/user/username/projects/project/src/terminal.ts",
  "/user/username/projects/project/src/common/input/keyboard.test.ts",
  "/user/username/projects/project/src/common/input/keyboard.ts"
 ],
 "options": {
  "composite": true,
  "declarationMap": true,
  "outDir": "/user/username/projects/project/out",
  "baseUrl": "/user/username/projects/project/src",
  "paths": {
   "common/*": [
    "./common/*"
   ]
  },
  "tsBuildInfoFile": "/user/username/projects/project/out/src.tsconfig.tsbuildinfo",
  "disableSourceOfProjectReferenceRedirect": true,
  "pathsBasePath": "/user/username/projects/project/src",
  "configFilePath": "/user/username/projects/project/src/tsconfig.json"
 },
 "projectReferences": [
  {
   "path": "/user/username/projects/project/src/common",
   "originalPath": "./common"
  }
 ]
}
DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/project/src 1 undefined Config: /user/username/projects/project/src/tsconfig.json WatchType: Wild card directory
Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/project/src 1 undefined Config: /user/username/projects/project/src/tsconfig.json WatchType: Wild card directory
Plugins were requested but not running in environment that supports 'require'. Nothing will be loaded
Starting updateGraphWorker: Project: /user/username/projects/project/src/tsconfig.json
FileWatcher:: Added:: WatchInfo: /user/username/projects/project/out/input/keyboard.d.ts 500 undefined WatchType: Closed Script info
DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/project/src/node_modules/@types 1 undefined Project: /user/username/projects/project/src/tsconfig.json WatchType: Type roots
Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/project/src/node_modules/@types 1 undefined Project: /user/username/projects/project/src/tsconfig.json WatchType: Type roots
DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/project/node_modules/@types 1 undefined Project: /user/username/projects/project/src/tsconfig.json WatchType: Type roots
Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/project/node_modules/@types 1 undefined Project: /user/username/projects/project/src/tsconfig.json WatchType: Type roots
Finishing updateGraphWorker: Project: /user/username/projects/project/src/tsconfig.json Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Project '/user/username/projects/project/src/tsconfig.json' (Configured)
	Files (4)
	/a/lib/lib.d.ts
	/user/username/projects/project/out/input/keyboard.d.ts
	/user/username/projects/project/src/terminal.ts
	/user/username/projects/project/src/common/input/keyboard.test.ts


	../../../../../a/lib/lib.d.ts
	  Default library for target 'es3'
	../out/input/keyboard.d.ts
	  Imported via 'common/input/keyboard' from file 'terminal.ts'
	  Imported via 'common/input/keyboard' from file 'common/input/keyboard.test.ts'
	  Matched by include pattern './**/*' in 'tsconfig.json'
	  File is output of project reference source 'common/input/keyboard.ts'
	terminal.ts
	  Matched by include pattern './**/*' in 'tsconfig.json'
	common/input/keyboard.test.ts
	  Matched by include pattern './**/*' in 'tsconfig.json'

-----------------------------------------------
Search path: /user/username/projects/project/src
For info: /user/username/projects/project/src/tsconfig.json :: No config files found.
Project '/user/username/projects/project/src/common/tsconfig.json' (Configured)
	Files (3)

-----------------------------------------------
Project '/user/username/projects/project/src/tsconfig.json' (Configured)
	Files (4)

-----------------------------------------------
Open files: 
	FileName: /user/username/projects/project/src/common/input/keyboard.ts ProjectRootPath: undefined
		Projects: /user/username/projects/project/src/common/tsconfig.json,/user/username/projects/project/src/tsconfig.json
	FileName: /user/username/projects/project/src/terminal.ts ProjectRootPath: undefined
		Projects: /user/username/projects/project/src/tsconfig.json
response:{"responseRequired":false}
request:{"command":"references","arguments":{"file":"/user/username/projects/project/src/common/input/keyboard.ts","line":2,"offset":17},"seq":1,"type":"request"}
FileWatcher:: Added:: WatchInfo: /user/username/projects/project/out/input/keyboard.d.ts.map 500 undefined WatchType: Closed Script info
Search path: /user/username/projects/project/src/common/input
For info: /user/username/projects/project/src/common/input/keyboard.ts :: Config file name: /user/username/projects/project/src/common/tsconfig.json
Search path: /user/username/projects/project/src/common/input
For info: /user/username/projects/project/src/common/input/keyboard.ts :: Config file name: /user/username/projects/project/src/common/tsconfig.json
response:{"response":{"refs":[{"file":"/user/username/projects/project/src/common/input/keyboard.ts","start":{"line":2,"offset":17},"end":{"line":2,"offset":38},"contextStart":{"line":2,"offset":1},"contextEnd":{"line":2,"offset":44},"lineText":"export function evaluateKeyboardEvent() { }","isWriteAccess":true,"isDefinition":true},{"file":"/user/username/projects/project/src/common/input/keyboard.test.ts","start":{"line":1,"offset":10},"end":{"line":1,"offset":31},"contextStart":{"line":1,"offset":1},"contextEnd":{"line":1,"offset":63},"lineText":"import { evaluateKeyboardEvent } from 'common/input/keyboard';","isWriteAccess":true,"isDefinition":false},{"file":"/user/username/projects/project/src/common/input/keyboard.test.ts","start":{"line":3,"offset":12},"end":{"line":3,"offset":33},"lineText":"    return evaluateKeyboardEvent();","isWriteAccess":false,"isDefinition":false},{"file":"/user/username/projects/project/src/terminal.ts","start":{"line":1,"offset":10},"end":{"line":1,"offset":31},"contextStart":{"line":1,"offset":1},"contextEnd":{"line":1,"offset":63},"lineText":"import { evaluateKeyboardEvent } from 'common/input/keyboard';","isWriteAccess":true,"isDefinition":false},{"file":"/user/username/projects/project/src/terminal.ts","start":{"line":3,"offset":12},"end":{"line":3,"offset":33},"lineText":"    return evaluateKeyboardEvent();","isWriteAccess":false,"isDefinition":false}],"symbolName":"evaluateKeyboardEvent","symbolStartOffset":17,"symbolDisplayString":"function evaluateKeyboardEvent(): void"},"responseRequired":true}