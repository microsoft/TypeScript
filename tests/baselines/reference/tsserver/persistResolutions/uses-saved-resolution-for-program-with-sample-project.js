Provided types map file "/a/lib/typesMap.json" doesn't exist
request:{"seq":0,"type":"request","command":"open","arguments":{"file":"/user/username/projects/sample1/tests/index.ts"}}
Search path: /user/username/projects/sample1/tests
For info: /user/username/projects/sample1/tests/index.ts :: Config file name: /user/username/projects/sample1/tests/tsconfig.json
Creating configuration project /user/username/projects/sample1/tests/tsconfig.json
FileWatcher:: Added:: WatchInfo: /user/username/projects/sample1/tests/tsconfig.json 2000 undefined Project: /user/username/projects/sample1/tests/tsconfig.json WatchType: Config file
Config: /user/username/projects/sample1/tests/tsconfig.json : {
 "rootNames": [
  "/user/username/projects/sample1/tests/index.ts"
 ],
 "options": {
  "composite": true,
  "declaration": true,
  "forceConsistentCasingInFileNames": true,
  "skipDefaultLibCheck": true,
  "persistResolutions": true,
  "traceResolution": true,
  "configFilePath": "/user/username/projects/sample1/tests/tsconfig.json"
 },
 "projectReferences": [
  {
   "path": "/user/username/projects/sample1/core",
   "originalPath": "../core"
  },
  {
   "path": "/user/username/projects/sample1/logic",
   "originalPath": "../logic"
  }
 ]
}
Plugins were requested but not running in environment that supports 'require'. Nothing will be loaded
Starting updateGraphWorker: Project: /user/username/projects/sample1/tests/tsconfig.json
Config: /user/username/projects/sample1/core/tsconfig.json : {
 "rootNames": [
  "/user/username/projects/sample1/core/anotherModule.ts",
  "/user/username/projects/sample1/core/index.ts",
  "/user/username/projects/sample1/core/some_decl.d.ts"
 ],
 "options": {
  "composite": true,
  "declaration": true,
  "declarationMap": true,
  "skipDefaultLibCheck": true,
  "persistResolutions": true,
  "traceResolution": true,
  "configFilePath": "/user/username/projects/sample1/core/tsconfig.json"
 }
}
FileWatcher:: Added:: WatchInfo: /user/username/projects/sample1/core/tsconfig.json 2000 undefined Project: /user/username/projects/sample1/tests/tsconfig.json WatchType: Config file
DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/sample1/core 1 undefined Config: /user/username/projects/sample1/core/tsconfig.json WatchType: Wild card directory
Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/sample1/core 1 undefined Config: /user/username/projects/sample1/core/tsconfig.json WatchType: Wild card directory
Config: /user/username/projects/sample1/logic/tsconfig.json : {
 "rootNames": [
  "/user/username/projects/sample1/logic/index.ts"
 ],
 "options": {
  "composite": true,
  "declaration": true,
  "sourceMap": true,
  "forceConsistentCasingInFileNames": true,
  "skipDefaultLibCheck": true,
  "persistResolutions": true,
  "traceResolution": true,
  "configFilePath": "/user/username/projects/sample1/logic/tsconfig.json"
 },
 "projectReferences": [
  {
   "path": "/user/username/projects/sample1/core",
   "originalPath": "../core"
  }
 ]
}
FileWatcher:: Added:: WatchInfo: /user/username/projects/sample1/logic/tsconfig.json 2000 undefined Project: /user/username/projects/sample1/tests/tsconfig.json WatchType: Config file
DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/sample1/logic 1 undefined Config: /user/username/projects/sample1/logic/tsconfig.json WatchType: Wild card directory
Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/sample1/logic 1 undefined Config: /user/username/projects/sample1/logic/tsconfig.json WatchType: Wild card directory
FileWatcher:: Added:: WatchInfo: /a/lib/lib.d.ts 500 undefined WatchType: Closed Script info
FileWatcher:: Added:: WatchInfo: /user/username/projects/sample1/core/index.d.ts 500 undefined WatchType: Closed Script info
Reusing resolution of module '../core/index' from '/user/username/projects/sample1/tests/index.ts' of old program, it was successfully resolved to '/user/username/projects/sample1/core/index.ts'.
Reusing resolution of module '../logic/index' from '/user/username/projects/sample1/tests/index.ts' of old program, it was successfully resolved to '/user/username/projects/sample1/logic/index.ts'.
Reusing resolution of module '../core/anotherModule' from '/user/username/projects/sample1/tests/index.ts' of old program, it was successfully resolved to '/user/username/projects/sample1/core/anotherModule.ts'.
FileWatcher:: Added:: WatchInfo: /user/username/projects/sample1/core/index.ts 500 undefined WatchType: Closed Script info
FileWatcher:: Added:: WatchInfo: /user/username/projects/sample1/logic/index.ts 500 undefined WatchType: Closed Script info
Reusing resolution of module '../core/anotherModule' from '/user/username/projects/sample1/logic/index.ts' of old program, it was successfully resolved to '/user/username/projects/sample1/core/anotherModule.ts'.
======== Resolving module '../core/index' from '/user/username/projects/sample1/logic/index.ts'. ========
Using compiler options of project reference redirect '/user/username/projects/sample1/logic/tsconfig.json'.
Module resolution kind is not specified, using 'NodeJs'.
Loading module as file / folder, candidate module location '/user/username/projects/sample1/core/index', target file type 'TypeScript'.
File '/user/username/projects/sample1/core/index.ts' exist - use it as a name resolution result.
======== Module name '../core/index' was successfully resolved to '/user/username/projects/sample1/core/index.ts'. ========
FileWatcher:: Added:: WatchInfo: /user/username/projects/sample1/core/anotherModule.ts 500 undefined WatchType: Closed Script info
DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/sample1/tests/node_modules/@types 1 undefined Project: /user/username/projects/sample1/tests/tsconfig.json WatchType: Type roots
Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/sample1/tests/node_modules/@types 1 undefined Project: /user/username/projects/sample1/tests/tsconfig.json WatchType: Type roots
DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/sample1/node_modules/@types 1 undefined Project: /user/username/projects/sample1/tests/tsconfig.json WatchType: Type roots
Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/sample1/node_modules/@types 1 undefined Project: /user/username/projects/sample1/tests/tsconfig.json WatchType: Type roots
Finishing updateGraphWorker: Project: /user/username/projects/sample1/tests/tsconfig.json Version: 1 structureChanged: true structureIsReused:: SafeModules Elapsed:: *ms
Project '/user/username/projects/sample1/tests/tsconfig.json' (Configured)
	Files (5)
	/a/lib/lib.d.ts
	/user/username/projects/sample1/core/index.ts
	/user/username/projects/sample1/core/anotherModule.ts
	/user/username/projects/sample1/logic/index.ts
	/user/username/projects/sample1/tests/index.ts


	../../../../../a/lib/lib.d.ts
	  Default library
	../core/index.ts
	  Imported via '../core/index' from file 'index.ts'
	  Imported via '../core/index' from file '../logic/index.ts'
	../core/anotherModule.ts
	  Imported via '../core/anotherModule' from file '../logic/index.ts'
	  Imported via '../core/anotherModule' from file 'index.ts'
	../logic/index.ts
	  Imported via '../logic/index' from file 'index.ts'
	index.ts
	  Part of 'files' list in tsconfig.json

-----------------------------------------------
Search path: /user/username/projects/sample1/tests
For info: /user/username/projects/sample1/tests/tsconfig.json :: No config files found.
Project '/user/username/projects/sample1/tests/tsconfig.json' (Configured)
	Files (5)

-----------------------------------------------
Open files: 
	FileName: /user/username/projects/sample1/tests/index.ts ProjectRootPath: undefined
		Projects: /user/username/projects/sample1/tests/tsconfig.json
response:{"responseRequired":false}

Project: /user/username/projects/sample1/tests/tsconfig.json
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

{"fileName":"/user/username/projects/sample1/core/index.ts","version":"-18749805970-export const someString: string = \"HELLO WORLD\";\r\nexport function leftPad(s: string, n: number) { return s + n; }\r\nexport function multiply(a: number, b: number) { return a * b; }\r\n"}
export const someString: string = "HELLO WORLD";
export function leftPad(s: string, n: number) { return s + n; }
export function multiply(a: number, b: number) { return a * b; }


{"fileName":"/user/username/projects/sample1/core/anotherModule.ts","version":"-2676574883-export const World = \"hello\";\r\n"}
export const World = "hello";


{"fileName":"/user/username/projects/sample1/logic/index.ts","version":"-5786964698-import * as c from '../core/index';\r\nexport function getSecondsInDay() {\r\n    return c.multiply(10, 15);\r\n}\r\nimport * as mod from '../core/anotherModule';\r\nexport const m = mod;\r\n"}
import * as c from '../core/index';
export function getSecondsInDay() {
    return c.multiply(10, 15);
}
import * as mod from '../core/anotherModule';
export const m = mod;


{"fileName":"/user/username/projects/sample1/tests/index.ts","version":"12336236525-import * as c from '../core/index';\r\nimport * as logic from '../logic/index';\r\n\r\nc.leftPad(\"\", 10);\r\nlogic.getSecondsInDay();\r\n\r\nimport * as mod from '../core/anotherModule';\r\nexport const m = mod;\r\n"}
import * as c from '../core/index';
import * as logic from '../logic/index';

c.leftPad("", 10);
logic.getSecondsInDay();

import * as mod from '../core/anotherModule';
export const m = mod;


