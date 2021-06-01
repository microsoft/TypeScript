Provided types map file "/a/lib/typesMap.json" doesn't exist
request:{"seq":0,"type":"request","command":"open","arguments":{"file":"/user/username/projects/myproject/tests/index.ts"}}
Search path: /user/username/projects/myproject/tests
For info: /user/username/projects/myproject/tests/index.ts :: Config file name: /user/username/projects/myproject/tests/tsconfig.json
Creating configuration project /user/username/projects/myproject/tests/tsconfig.json
FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/tests/tsconfig.json 2000 undefined Project: /user/username/projects/myproject/tests/tsconfig.json WatchType: Config file
Config: /user/username/projects/myproject/tests/tsconfig.json : {
 "rootNames": [
  "/user/username/projects/myproject/tests/index.ts"
 ],
 "options": {
  "composite": true,
  "persistResolutions": true,
  "traceResolution": true,
  "configFilePath": "/user/username/projects/myproject/tests/tsconfig.json"
 },
 "projectReferences": [
  {
   "path": "/user/username/projects/myproject/logic",
   "originalPath": "../logic"
  }
 ]
}
DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/tests 1 undefined Config: /user/username/projects/myproject/tests/tsconfig.json WatchType: Wild card directory
Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/tests 1 undefined Config: /user/username/projects/myproject/tests/tsconfig.json WatchType: Wild card directory
Plugins were requested but not running in environment that supports 'require'. Nothing will be loaded
Starting updateGraphWorker: Project: /user/username/projects/myproject/tests/tsconfig.json
Config: /user/username/projects/myproject/logic/tsconfig.json : {
 "rootNames": [
  "/user/username/projects/myproject/logic/index.ts"
 ],
 "options": {
  "composite": true,
  "persistResolutions": true,
  "traceResolution": true,
  "configFilePath": "/user/username/projects/myproject/logic/tsconfig.json"
 },
 "projectReferences": [
  {
   "path": "/user/username/projects/myproject/core",
   "originalPath": "../core"
  }
 ]
}
FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/logic/tsconfig.json 2000 undefined Project: /user/username/projects/myproject/tests/tsconfig.json WatchType: Config file
DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/logic 1 undefined Config: /user/username/projects/myproject/logic/tsconfig.json WatchType: Wild card directory
Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/logic 1 undefined Config: /user/username/projects/myproject/logic/tsconfig.json WatchType: Wild card directory
Config: /user/username/projects/myproject/core/tsconfig.json : {
 "rootNames": [
  "/user/username/projects/myproject/core/anotherClass.ts",
  "/user/username/projects/myproject/core/index.ts",
  "/user/username/projects/myproject/core/myClass.ts"
 ],
 "options": {
  "composite": true,
  "persistResolutions": true,
  "traceResolution": true,
  "configFilePath": "/user/username/projects/myproject/core/tsconfig.json"
 }
}
FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/core/tsconfig.json 2000 undefined Project: /user/username/projects/myproject/tests/tsconfig.json WatchType: Config file
DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/core 1 undefined Config: /user/username/projects/myproject/core/tsconfig.json WatchType: Wild card directory
Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/core 1 undefined Config: /user/username/projects/myproject/core/tsconfig.json WatchType: Wild card directory
FileWatcher:: Added:: WatchInfo: /a/lib/lib.d.ts 500 undefined WatchType: Closed Script info
FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/core/myClass.d.ts 500 undefined WatchType: Closed Script info
FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/core/anotherClass.d.ts 500 undefined WatchType: Closed Script info
FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/logic/index.d.ts 500 undefined WatchType: Closed Script info
DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/tests/node_modules/@types 1 undefined Project: /user/username/projects/myproject/tests/tsconfig.json WatchType: Type roots
Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/tests/node_modules/@types 1 undefined Project: /user/username/projects/myproject/tests/tsconfig.json WatchType: Type roots
DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Project: /user/username/projects/myproject/tests/tsconfig.json WatchType: Type roots
Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Project: /user/username/projects/myproject/tests/tsconfig.json WatchType: Type roots
Finishing updateGraphWorker: Project: /user/username/projects/myproject/tests/tsconfig.json Version: 1 structureChanged: true structureIsReused:: Completely Elapsed:: *ms
Project '/user/username/projects/myproject/tests/tsconfig.json' (Configured)
	Files (5)
	/a/lib/lib.d.ts
	/user/username/projects/myproject/core/myClass.d.ts
	/user/username/projects/myproject/core/anotherClass.d.ts
	/user/username/projects/myproject/logic/index.d.ts
	/user/username/projects/myproject/tests/index.ts


	../../../../../a/lib/lib.d.ts
	  Default library
	../core/myClass.d.ts
	  Imported via "../core/myClass" from file '../logic/index.d.ts'
	  File is output of project reference source '../core/myClass.ts'
	../core/anotherClass.d.ts
	  Imported via "../core/anotherClass" from file '../logic/index.d.ts'
	  File is output of project reference source '../core/anotherClass.ts'
	../logic/index.d.ts
	  Imported via "../logic" from file 'index.ts'
	  File is output of project reference source '../logic/index.ts'
	index.ts
	  Matched by include pattern '**/*' in 'tsconfig.json'

-----------------------------------------------
Search path: /user/username/projects/myproject/tests
For info: /user/username/projects/myproject/tests/tsconfig.json :: No config files found.
Project '/user/username/projects/myproject/tests/tsconfig.json' (Configured)
	Files (5)

-----------------------------------------------
Open files: 
	FileName: /user/username/projects/myproject/tests/index.ts ProjectRootPath: undefined
		Projects: /user/username/projects/myproject/tests/tsconfig.json
response:{"responseRequired":false}

Project: /user/username/projects/myproject/tests/tsconfig.json
{"fileName":"/a/lib/lib.d.ts","version":"-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }"}
/// <reference no-default-lib="true"/>
interface Boolean {}
interface Function {}
interface CallableFunction {}
interface NewableFunction {}
interface IArguments {}
interface Number { toExponential: any; }
interface Object {}
interface RegExp {}
interface String { charAt: any; }
interface Array<T> { length: number; [n: number]: T; }

{"fileName":"/user/username/projects/myproject/core/myClass.d.ts","version":"-7432826827-export declare class myClass {\n}\n"}
export declare class myClass {
}


{"fileName":"/user/username/projects/myproject/core/anotherClass.d.ts","version":"-6928009824-export declare class anotherClass {\n}\n"}
export declare class anotherClass {
}


{"fileName":"/user/username/projects/myproject/logic/index.d.ts","version":"-26318514585-import { myClass } from \"../core/myClass\";\nimport { anotherClass } from \"../core/anotherClass\";\nexport declare function returnMyClass(): myClass;\nexport declare function returnAnotherClass(): anotherClass;\n"}
import { myClass } from "../core/myClass";
import { anotherClass } from "../core/anotherClass";
export declare function returnMyClass(): myClass;
export declare function returnAnotherClass(): anotherClass;


{"fileName":"/user/username/projects/myproject/tests/index.ts","version":"-2125404654-import { returnMyClass } from \"../logic\";\nreturnMyClass();"}
import { returnMyClass } from "../logic";
returnMyClass();

