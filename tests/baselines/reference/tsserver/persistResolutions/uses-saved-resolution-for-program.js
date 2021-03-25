Provided types map file "/a/lib/typesMap.json" doesn't exist
request:{"seq":0,"type":"request","command":"open","arguments":{"file":"/user/username/projects/myproject/src/main.ts"}}
Search path: /user/username/projects/myproject/src
For info: /user/username/projects/myproject/src/main.ts :: Config file name: /user/username/projects/myproject/tsconfig.json
Creating configuration project /user/username/projects/myproject/tsconfig.json
FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/tsconfig.json 2000 undefined Project: /user/username/projects/myproject/tsconfig.json WatchType: Config file
Config: /user/username/projects/myproject/tsconfig.json : {
 "rootNames": [
  "/user/username/projects/myproject/src/anotherFileReusingResolution.ts",
  "/user/username/projects/myproject/src/filePresent.ts",
  "/user/username/projects/myproject/src/fileWithRef.ts",
  "/user/username/projects/myproject/src/globalAnotherFileWithSameReferenes.ts",
  "/user/username/projects/myproject/src/globalFilePresent.ts",
  "/user/username/projects/myproject/src/globalMain.ts",
  "/user/username/projects/myproject/src/main.ts",
  "/user/username/projects/myproject/src/types.ts"
 ],
 "options": {
  "module": 2,
  "composite": true,
  "persistResolutions": true,
  "traceResolution": true,
  "configFilePath": "/user/username/projects/myproject/tsconfig.json"
 }
}
DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/src 1 undefined Config: /user/username/projects/myproject/tsconfig.json WatchType: Wild card directory
Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/src 1 undefined Config: /user/username/projects/myproject/tsconfig.json WatchType: Wild card directory
Plugins were requested but not running in environment that supports 'require'. Nothing will be loaded
FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/src/anotherFileReusingResolution.ts 500 undefined WatchType: Closed Script info
FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/src/filePresent.ts 500 undefined WatchType: Closed Script info
FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/src/fileWithRef.ts 500 undefined WatchType: Closed Script info
FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/src/globalAnotherFileWithSameReferenes.ts 500 undefined WatchType: Closed Script info
FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/src/globalFilePresent.ts 500 undefined WatchType: Closed Script info
FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/src/globalMain.ts 500 undefined WatchType: Closed Script info
FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/src/types.ts 500 undefined WatchType: Closed Script info
Starting updateGraphWorker: Project: /user/username/projects/myproject/tsconfig.json
FileWatcher:: Added:: WatchInfo: /a/lib/lib.d.ts 500 undefined WatchType: Closed Script info
FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/src/globalFileNotFound.ts 500 undefined Project: /user/username/projects/myproject/tsconfig.json WatchType: Missing file
DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Project: /user/username/projects/myproject/tsconfig.json WatchType: Type roots
Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Project: /user/username/projects/myproject/tsconfig.json WatchType: Type roots
Finishing updateGraphWorker: Project: /user/username/projects/myproject/tsconfig.json Version: 1 structureChanged: true structureIsReused:: Completely Elapsed:: *ms
Project '/user/username/projects/myproject/tsconfig.json' (Configured)
	Files (9)
	/a/lib/lib.d.ts
	/user/username/projects/myproject/src/filePresent.ts
	/user/username/projects/myproject/src/anotherFileReusingResolution.ts
	/user/username/projects/myproject/src/types.ts
	/user/username/projects/myproject/src/fileWithRef.ts
	/user/username/projects/myproject/src/globalFilePresent.ts
	/user/username/projects/myproject/src/globalAnotherFileWithSameReferenes.ts
	/user/username/projects/myproject/src/globalMain.ts
	/user/username/projects/myproject/src/main.ts


	../../../../a/lib/lib.d.ts
	  Default library
	src/filePresent.ts
	  Imported via "./filePresent" from file 'src/anotherFileReusingResolution.ts'
	  Matched by include pattern 'src/**/*.ts' in 'tsconfig.json'
	  Imported via "./filePresent" from file 'src/main.ts'
	  Imported via "./filePresent" from file 'src/main.ts'
	src/anotherFileReusingResolution.ts
	  Matched by include pattern 'src/**/*.ts' in 'tsconfig.json'
	src/types.ts
	  Referenced via './types.ts' from file 'src/fileWithRef.ts'
	  Matched by include pattern 'src/**/*.ts' in 'tsconfig.json'
	src/fileWithRef.ts
	  Matched by include pattern 'src/**/*.ts' in 'tsconfig.json'
	src/globalFilePresent.ts
	  Referenced via './globalFilePresent.ts' from file 'src/globalAnotherFileWithSameReferenes.ts'
	  Matched by include pattern 'src/**/*.ts' in 'tsconfig.json'
	  Referenced via './globalFilePresent.ts' from file 'src/globalMain.ts'
	src/globalAnotherFileWithSameReferenes.ts
	  Matched by include pattern 'src/**/*.ts' in 'tsconfig.json'
	src/globalMain.ts
	  Matched by include pattern 'src/**/*.ts' in 'tsconfig.json'
	src/main.ts
	  Matched by include pattern 'src/**/*.ts' in 'tsconfig.json'

-----------------------------------------------
Search path: /user/username/projects/myproject
For info: /user/username/projects/myproject/tsconfig.json :: No config files found.
Project '/user/username/projects/myproject/tsconfig.json' (Configured)
	Files (9)

-----------------------------------------------
Open files: 
	FileName: /user/username/projects/myproject/src/main.ts ProjectRootPath: undefined
		Projects: /user/username/projects/myproject/tsconfig.json
response:{"responseRequired":false}
request:{"seq":0,"type":"request","command":"open","arguments":{"file":"/user/username/projects/myproject/src/globalMain.ts"}}
FileWatcher:: Close:: WatchInfo: /user/username/projects/myproject/src/globalMain.ts 500 undefined WatchType: Closed Script info
Search path: /user/username/projects/myproject/src
For info: /user/username/projects/myproject/src/globalMain.ts :: Config file name: /user/username/projects/myproject/tsconfig.json
Search path: /user/username/projects/myproject
For info: /user/username/projects/myproject/tsconfig.json :: No config files found.
Project '/user/username/projects/myproject/tsconfig.json' (Configured)
	Files (9)

-----------------------------------------------
Open files: 
	FileName: /user/username/projects/myproject/src/main.ts ProjectRootPath: undefined
		Projects: /user/username/projects/myproject/tsconfig.json
	FileName: /user/username/projects/myproject/src/globalMain.ts ProjectRootPath: undefined
		Projects: /user/username/projects/myproject/tsconfig.json
response:{"responseRequired":false}

Project: /user/username/projects/myproject/tsconfig.json
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

{"fileName":"/user/username/projects/myproject/src/filePresent.ts","version":"11598859296-export function something() { return 10; }"}
export function something() { return 10; }

{"fileName":"/user/username/projects/myproject/src/anotherFileReusingResolution.ts","version":"-18180953903-import { something } from \"./filePresent\";\nimport { something2 } from \"./fileNotFound\";"}
import { something } from "./filePresent";
import { something2 } from "./fileNotFound";

{"fileName":"/user/username/projects/myproject/src/types.ts","version":"-12575322908-interface SomeType {}"}
interface SomeType {}

{"fileName":"/user/username/projects/myproject/src/fileWithRef.ts","version":"-6085631553-/// <reference path=\"./types.ts\"/>"}
/// <reference path="./types.ts"/>

{"fileName":"/user/username/projects/myproject/src/globalFilePresent.ts","version":"-5627034801-function globalSomething() { return 10; }"}
function globalSomething() { return 10; }

{"fileName":"/user/username/projects/myproject/src/globalAnotherFileWithSameReferenes.ts","version":"-4448253777-/// <reference path=\"./globalFilePresent.ts\"/>\n/// <reference path=\"./globalFileNotFound.ts\"/>\nfunction globalAnotherFileWithSameReferenes() { }\n"}
/// <reference path="./globalFilePresent.ts"/>
/// <reference path="./globalFileNotFound.ts"/>
function globalAnotherFileWithSameReferenes() { }


{"fileName":"/user/username/projects/myproject/src/globalMain.ts","version":"-12326309214-/// <reference path=\"./globalFilePresent.ts\"/>\n/// <reference path=\"./globalFileNotFound.ts\"/>\nfunction globalMain() { }\n"}
/// <reference path="./globalFilePresent.ts"/>
/// <reference path="./globalFileNotFound.ts"/>
function globalMain() { }


{"fileName":"/user/username/projects/myproject/src/main.ts","version":"-9137062678-import { something } from \"./filePresent\";\nimport { something as something1 } from \"./filePresent\";\nimport { something2 } from \"./fileNotFound\";\n"}
import { something } from "./filePresent";
import { something as something1 } from "./filePresent";
import { something2 } from "./fileNotFound";



Modify global file::
request:{"command":"change","arguments":{"file":"/user/username/projects/myproject/src/globalMain.ts","line":4,"offset":1,"endLine":4,"endOffset":1,"insertString":"globalSomething();\n"},"seq":1,"type":"request"}
response:{"responseRequired":false}
Starting updateGraphWorker: Project: /user/username/projects/myproject/tsconfig.json
Finishing updateGraphWorker: Project: /user/username/projects/myproject/tsconfig.json Version: 2 structureChanged: false structureIsReused:: Completely Elapsed:: *ms
Different program with same set of files

Project: /user/username/projects/myproject/tsconfig.json
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

{"fileName":"/user/username/projects/myproject/src/filePresent.ts","version":"11598859296-export function something() { return 10; }"}
export function something() { return 10; }

{"fileName":"/user/username/projects/myproject/src/anotherFileReusingResolution.ts","version":"-18180953903-import { something } from \"./filePresent\";\nimport { something2 } from \"./fileNotFound\";"}
import { something } from "./filePresent";
import { something2 } from "./fileNotFound";

{"fileName":"/user/username/projects/myproject/src/types.ts","version":"-12575322908-interface SomeType {}"}
interface SomeType {}

{"fileName":"/user/username/projects/myproject/src/fileWithRef.ts","version":"-6085631553-/// <reference path=\"./types.ts\"/>"}
/// <reference path="./types.ts"/>

{"fileName":"/user/username/projects/myproject/src/globalFilePresent.ts","version":"-5627034801-function globalSomething() { return 10; }"}
function globalSomething() { return 10; }

{"fileName":"/user/username/projects/myproject/src/globalAnotherFileWithSameReferenes.ts","version":"-4448253777-/// <reference path=\"./globalFilePresent.ts\"/>\n/// <reference path=\"./globalFileNotFound.ts\"/>\nfunction globalAnotherFileWithSameReferenes() { }\n"}
/// <reference path="./globalFilePresent.ts"/>
/// <reference path="./globalFileNotFound.ts"/>
function globalAnotherFileWithSameReferenes() { }


{"fileName":"/user/username/projects/myproject/src/globalMain.ts","version":"-7553807369-/// <reference path=\"./globalFilePresent.ts\"/>\n/// <reference path=\"./globalFileNotFound.ts\"/>\nfunction globalMain() { }\nglobalSomething();\n"}
/// <reference path="./globalFilePresent.ts"/>
/// <reference path="./globalFileNotFound.ts"/>
function globalMain() { }
globalSomething();


{"fileName":"/user/username/projects/myproject/src/main.ts","version":"-9137062678-import { something } from \"./filePresent\";\nimport { something as something1 } from \"./filePresent\";\nimport { something2 } from \"./fileNotFound\";\n"}
import { something } from "./filePresent";
import { something as something1 } from "./filePresent";
import { something2 } from "./fileNotFound";



Add new globalFile and update globalMain file::
DirectoryWatcher:: Triggered with /user/username/projects/myproject/src/globalNewFile.ts :: WatchInfo: /user/username/projects/myproject/src 1 undefined Config: /user/username/projects/myproject/tsconfig.json WatchType: Wild card directory
Scheduled: /user/username/projects/myproject/tsconfig.json
Scheduled: *ensureProjectForOpenFiles*
Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/projects/myproject/src/globalNewFile.ts :: WatchInfo: /user/username/projects/myproject/src 1 undefined Config: /user/username/projects/myproject/tsconfig.json WatchType: Wild card directory
request:{"command":"change","arguments":{"file":"/user/username/projects/myproject/src/globalMain.ts","line":1,"offset":1,"endLine":1,"endOffset":1,"insertString":"/// <reference path=\"./globalNewFile.ts\"/>\n"},"seq":2,"type":"request"}
response:{"responseRequired":false}
request:{"command":"change","arguments":{"file":"/user/username/projects/myproject/src/globalMain.ts","line":6,"offset":1,"endLine":6,"endOffset":1,"insertString":"globalFoo();\n"},"seq":3,"type":"request"}
response:{"responseRequired":false}
Running: /user/username/projects/myproject/tsconfig.json
FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/src/globalNewFile.ts 500 undefined WatchType: Closed Script info
Starting updateGraphWorker: Project: /user/username/projects/myproject/tsconfig.json
Reusing resolution of module './filePresent' from '/user/username/projects/myproject/src/anotherFileReusingResolution.ts' of old program, it was successfully resolved to '/user/username/projects/myproject/src/filePresent.ts'.
Reusing resolution of module './fileNotFound' from '/user/username/projects/myproject/src/anotherFileReusingResolution.ts' of old program, it was not resolved.
Reusing resolution of module './filePresent' from '/user/username/projects/myproject/src/main.ts' of old program, it was successfully resolved to '/user/username/projects/myproject/src/filePresent.ts'.
Reusing resolution of module './filePresent' from '/user/username/projects/myproject/src/main.ts' of old program, it was successfully resolved to '/user/username/projects/myproject/src/filePresent.ts'.
Reusing resolution of module './fileNotFound' from '/user/username/projects/myproject/src/main.ts' of old program, it was not resolved.
Finishing updateGraphWorker: Project: /user/username/projects/myproject/tsconfig.json Version: 3 structureChanged: true structureIsReused:: SafeModules Elapsed:: *ms
Project '/user/username/projects/myproject/tsconfig.json' (Configured)
	Files (10)
	/a/lib/lib.d.ts
	/user/username/projects/myproject/src/filePresent.ts
	/user/username/projects/myproject/src/anotherFileReusingResolution.ts
	/user/username/projects/myproject/src/types.ts
	/user/username/projects/myproject/src/fileWithRef.ts
	/user/username/projects/myproject/src/globalFilePresent.ts
	/user/username/projects/myproject/src/globalAnotherFileWithSameReferenes.ts
	/user/username/projects/myproject/src/globalNewFile.ts
	/user/username/projects/myproject/src/globalMain.ts
	/user/username/projects/myproject/src/main.ts


	../../../../a/lib/lib.d.ts
	  Default library
	src/filePresent.ts
	  Imported via "./filePresent" from file 'src/anotherFileReusingResolution.ts'
	  Matched by include pattern 'src/**/*.ts' in 'tsconfig.json'
	  Imported via "./filePresent" from file 'src/main.ts'
	  Imported via "./filePresent" from file 'src/main.ts'
	src/anotherFileReusingResolution.ts
	  Matched by include pattern 'src/**/*.ts' in 'tsconfig.json'
	src/types.ts
	  Referenced via './types.ts' from file 'src/fileWithRef.ts'
	  Matched by include pattern 'src/**/*.ts' in 'tsconfig.json'
	src/fileWithRef.ts
	  Matched by include pattern 'src/**/*.ts' in 'tsconfig.json'
	src/globalFilePresent.ts
	  Referenced via './globalFilePresent.ts' from file 'src/globalAnotherFileWithSameReferenes.ts'
	  Matched by include pattern 'src/**/*.ts' in 'tsconfig.json'
	  Referenced via './globalFilePresent.ts' from file 'src/globalMain.ts'
	src/globalAnotherFileWithSameReferenes.ts
	  Matched by include pattern 'src/**/*.ts' in 'tsconfig.json'
	src/globalNewFile.ts
	  Referenced via './globalNewFile.ts' from file 'src/globalMain.ts'
	  Matched by include pattern 'src/**/*.ts' in 'tsconfig.json'
	src/globalMain.ts
	  Matched by include pattern 'src/**/*.ts' in 'tsconfig.json'
	src/main.ts
	  Matched by include pattern 'src/**/*.ts' in 'tsconfig.json'

-----------------------------------------------
Running: *ensureProjectForOpenFiles*
Before ensureProjectForOpenFiles:
Project '/user/username/projects/myproject/tsconfig.json' (Configured)
	Files (10)

-----------------------------------------------
Open files: 
	FileName: /user/username/projects/myproject/src/main.ts ProjectRootPath: undefined
		Projects: /user/username/projects/myproject/tsconfig.json
	FileName: /user/username/projects/myproject/src/globalMain.ts ProjectRootPath: undefined
		Projects: /user/username/projects/myproject/tsconfig.json
After ensureProjectForOpenFiles:
Project '/user/username/projects/myproject/tsconfig.json' (Configured)
	Files (10)

-----------------------------------------------
Open files: 
	FileName: /user/username/projects/myproject/src/main.ts ProjectRootPath: undefined
		Projects: /user/username/projects/myproject/tsconfig.json
	FileName: /user/username/projects/myproject/src/globalMain.ts ProjectRootPath: undefined
		Projects: /user/username/projects/myproject/tsconfig.json

Project: /user/username/projects/myproject/tsconfig.json
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

{"fileName":"/user/username/projects/myproject/src/filePresent.ts","version":"11598859296-export function something() { return 10; }"}
export function something() { return 10; }

{"fileName":"/user/username/projects/myproject/src/anotherFileReusingResolution.ts","version":"-18180953903-import { something } from \"./filePresent\";\nimport { something2 } from \"./fileNotFound\";"}
import { something } from "./filePresent";
import { something2 } from "./fileNotFound";

{"fileName":"/user/username/projects/myproject/src/types.ts","version":"-12575322908-interface SomeType {}"}
interface SomeType {}

{"fileName":"/user/username/projects/myproject/src/fileWithRef.ts","version":"-6085631553-/// <reference path=\"./types.ts\"/>"}
/// <reference path="./types.ts"/>

{"fileName":"/user/username/projects/myproject/src/globalFilePresent.ts","version":"-5627034801-function globalSomething() { return 10; }"}
function globalSomething() { return 10; }

{"fileName":"/user/username/projects/myproject/src/globalAnotherFileWithSameReferenes.ts","version":"-4448253777-/// <reference path=\"./globalFilePresent.ts\"/>\n/// <reference path=\"./globalFileNotFound.ts\"/>\nfunction globalAnotherFileWithSameReferenes() { }\n"}
/// <reference path="./globalFilePresent.ts"/>
/// <reference path="./globalFileNotFound.ts"/>
function globalAnotherFileWithSameReferenes() { }


{"fileName":"/user/username/projects/myproject/src/globalNewFile.ts","version":"4916490342-function globalFoo() { return 20; }"}
function globalFoo() { return 20; }

{"fileName":"/user/username/projects/myproject/src/globalMain.ts","version":"-9112452180-/// <reference path=\"./globalNewFile.ts\"/>\n/// <reference path=\"./globalFilePresent.ts\"/>\n/// <reference path=\"./globalFileNotFound.ts\"/>\nfunction globalMain() { }\nglobalSomething();\nglobalFoo();\n"}
/// <reference path="./globalNewFile.ts"/>
/// <reference path="./globalFilePresent.ts"/>
/// <reference path="./globalFileNotFound.ts"/>
function globalMain() { }
globalSomething();
globalFoo();


{"fileName":"/user/username/projects/myproject/src/main.ts","version":"-9137062678-import { something } from \"./filePresent\";\nimport { something as something1 } from \"./filePresent\";\nimport { something2 } from \"./fileNotFound\";\n"}
import { something } from "./filePresent";
import { something as something1 } from "./filePresent";
import { something2 } from "./fileNotFound";



Write file that could not be resolved by referenced path::
FileWatcher:: Triggered with /user/username/projects/myproject/src/globalFileNotFound.ts 0:: WatchInfo: /user/username/projects/myproject/src/globalFileNotFound.ts 500 undefined Project: /user/username/projects/myproject/tsconfig.json WatchType: Missing file
FileWatcher:: Close:: WatchInfo: /user/username/projects/myproject/src/globalFileNotFound.ts 500 undefined Project: /user/username/projects/myproject/tsconfig.json WatchType: Missing file
Scheduled: /user/username/projects/myproject/tsconfig.json
Scheduled: *ensureProjectForOpenFiles*
Elapsed:: *ms FileWatcher:: Triggered with /user/username/projects/myproject/src/globalFileNotFound.ts 0:: WatchInfo: /user/username/projects/myproject/src/globalFileNotFound.ts 500 undefined Project: /user/username/projects/myproject/tsconfig.json WatchType: Missing file
DirectoryWatcher:: Triggered with /user/username/projects/myproject/src/globalFileNotFound.ts :: WatchInfo: /user/username/projects/myproject/src 1 undefined Config: /user/username/projects/myproject/tsconfig.json WatchType: Wild card directory
Scheduled: /user/username/projects/myproject/tsconfig.json, Cancelled earlier one
Scheduled: *ensureProjectForOpenFiles*, Cancelled earlier one
Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/projects/myproject/src/globalFileNotFound.ts :: WatchInfo: /user/username/projects/myproject/src 1 undefined Config: /user/username/projects/myproject/tsconfig.json WatchType: Wild card directory
Running: /user/username/projects/myproject/tsconfig.json
FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/src/globalFileNotFound.ts 500 undefined WatchType: Closed Script info
Starting updateGraphWorker: Project: /user/username/projects/myproject/tsconfig.json
Reusing resolution of module './filePresent' from '/user/username/projects/myproject/src/anotherFileReusingResolution.ts' of old program, it was successfully resolved to '/user/username/projects/myproject/src/filePresent.ts'.
Reusing resolution of module './fileNotFound' from '/user/username/projects/myproject/src/anotherFileReusingResolution.ts' of old program, it was not resolved.
Reusing resolution of module './filePresent' from '/user/username/projects/myproject/src/main.ts' of old program, it was successfully resolved to '/user/username/projects/myproject/src/filePresent.ts'.
Reusing resolution of module './filePresent' from '/user/username/projects/myproject/src/main.ts' of old program, it was successfully resolved to '/user/username/projects/myproject/src/filePresent.ts'.
Reusing resolution of module './fileNotFound' from '/user/username/projects/myproject/src/main.ts' of old program, it was not resolved.
Finishing updateGraphWorker: Project: /user/username/projects/myproject/tsconfig.json Version: 4 structureChanged: true structureIsReused:: SafeModules Elapsed:: *ms
Project '/user/username/projects/myproject/tsconfig.json' (Configured)
	Files (11)
	/a/lib/lib.d.ts
	/user/username/projects/myproject/src/filePresent.ts
	/user/username/projects/myproject/src/anotherFileReusingResolution.ts
	/user/username/projects/myproject/src/types.ts
	/user/username/projects/myproject/src/fileWithRef.ts
	/user/username/projects/myproject/src/globalFilePresent.ts
	/user/username/projects/myproject/src/globalFileNotFound.ts
	/user/username/projects/myproject/src/globalAnotherFileWithSameReferenes.ts
	/user/username/projects/myproject/src/globalNewFile.ts
	/user/username/projects/myproject/src/globalMain.ts
	/user/username/projects/myproject/src/main.ts


	../../../../a/lib/lib.d.ts
	  Default library
	src/filePresent.ts
	  Imported via "./filePresent" from file 'src/anotherFileReusingResolution.ts'
	  Matched by include pattern 'src/**/*.ts' in 'tsconfig.json'
	  Imported via "./filePresent" from file 'src/main.ts'
	  Imported via "./filePresent" from file 'src/main.ts'
	src/anotherFileReusingResolution.ts
	  Matched by include pattern 'src/**/*.ts' in 'tsconfig.json'
	src/types.ts
	  Referenced via './types.ts' from file 'src/fileWithRef.ts'
	  Matched by include pattern 'src/**/*.ts' in 'tsconfig.json'
	src/fileWithRef.ts
	  Matched by include pattern 'src/**/*.ts' in 'tsconfig.json'
	src/globalFilePresent.ts
	  Referenced via './globalFilePresent.ts' from file 'src/globalAnotherFileWithSameReferenes.ts'
	  Matched by include pattern 'src/**/*.ts' in 'tsconfig.json'
	  Referenced via './globalFilePresent.ts' from file 'src/globalMain.ts'
	src/globalFileNotFound.ts
	  Referenced via './globalFileNotFound.ts' from file 'src/globalAnotherFileWithSameReferenes.ts'
	  Referenced via './globalFileNotFound.ts' from file 'src/globalMain.ts'
	  Matched by include pattern 'src/**/*.ts' in 'tsconfig.json'
	src/globalAnotherFileWithSameReferenes.ts
	  Matched by include pattern 'src/**/*.ts' in 'tsconfig.json'
	src/globalNewFile.ts
	  Referenced via './globalNewFile.ts' from file 'src/globalMain.ts'
	  Matched by include pattern 'src/**/*.ts' in 'tsconfig.json'
	src/globalMain.ts
	  Matched by include pattern 'src/**/*.ts' in 'tsconfig.json'
	src/main.ts
	  Matched by include pattern 'src/**/*.ts' in 'tsconfig.json'

-----------------------------------------------
Running: *ensureProjectForOpenFiles*
Before ensureProjectForOpenFiles:
Project '/user/username/projects/myproject/tsconfig.json' (Configured)
	Files (11)

-----------------------------------------------
Open files: 
	FileName: /user/username/projects/myproject/src/main.ts ProjectRootPath: undefined
		Projects: /user/username/projects/myproject/tsconfig.json
	FileName: /user/username/projects/myproject/src/globalMain.ts ProjectRootPath: undefined
		Projects: /user/username/projects/myproject/tsconfig.json
After ensureProjectForOpenFiles:
Project '/user/username/projects/myproject/tsconfig.json' (Configured)
	Files (11)

-----------------------------------------------
Open files: 
	FileName: /user/username/projects/myproject/src/main.ts ProjectRootPath: undefined
		Projects: /user/username/projects/myproject/tsconfig.json
	FileName: /user/username/projects/myproject/src/globalMain.ts ProjectRootPath: undefined
		Projects: /user/username/projects/myproject/tsconfig.json

Project: /user/username/projects/myproject/tsconfig.json
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

{"fileName":"/user/username/projects/myproject/src/filePresent.ts","version":"11598859296-export function something() { return 10; }"}
export function something() { return 10; }

{"fileName":"/user/username/projects/myproject/src/anotherFileReusingResolution.ts","version":"-18180953903-import { something } from \"./filePresent\";\nimport { something2 } from \"./fileNotFound\";"}
import { something } from "./filePresent";
import { something2 } from "./fileNotFound";

{"fileName":"/user/username/projects/myproject/src/types.ts","version":"-12575322908-interface SomeType {}"}
interface SomeType {}

{"fileName":"/user/username/projects/myproject/src/fileWithRef.ts","version":"-6085631553-/// <reference path=\"./types.ts\"/>"}
/// <reference path="./types.ts"/>

{"fileName":"/user/username/projects/myproject/src/globalFilePresent.ts","version":"-5627034801-function globalSomething() { return 10; }"}
function globalSomething() { return 10; }

{"fileName":"/user/username/projects/myproject/src/globalFileNotFound.ts","version":"-6310824062-function globalSomething2() { return 20; }"}
function globalSomething2() { return 20; }

{"fileName":"/user/username/projects/myproject/src/globalAnotherFileWithSameReferenes.ts","version":"-4448253777-/// <reference path=\"./globalFilePresent.ts\"/>\n/// <reference path=\"./globalFileNotFound.ts\"/>\nfunction globalAnotherFileWithSameReferenes() { }\n"}
/// <reference path="./globalFilePresent.ts"/>
/// <reference path="./globalFileNotFound.ts"/>
function globalAnotherFileWithSameReferenes() { }


{"fileName":"/user/username/projects/myproject/src/globalNewFile.ts","version":"4916490342-function globalFoo() { return 20; }"}
function globalFoo() { return 20; }

{"fileName":"/user/username/projects/myproject/src/globalMain.ts","version":"-9112452180-/// <reference path=\"./globalNewFile.ts\"/>\n/// <reference path=\"./globalFilePresent.ts\"/>\n/// <reference path=\"./globalFileNotFound.ts\"/>\nfunction globalMain() { }\nglobalSomething();\nglobalFoo();\n"}
/// <reference path="./globalNewFile.ts"/>
/// <reference path="./globalFilePresent.ts"/>
/// <reference path="./globalFileNotFound.ts"/>
function globalMain() { }
globalSomething();
globalFoo();


{"fileName":"/user/username/projects/myproject/src/main.ts","version":"-9137062678-import { something } from \"./filePresent\";\nimport { something as something1 } from \"./filePresent\";\nimport { something2 } from \"./fileNotFound\";\n"}
import { something } from "./filePresent";
import { something as something1 } from "./filePresent";
import { something2 } from "./fileNotFound";



Modify main file::
request:{"command":"change","arguments":{"file":"/user/username/projects/myproject/src/main.ts","line":4,"offset":1,"endLine":4,"endOffset":1,"insertString":"something();\n"},"seq":4,"type":"request"}
response:{"responseRequired":false}
Starting updateGraphWorker: Project: /user/username/projects/myproject/tsconfig.json
Reusing resolution of module './filePresent' from '/user/username/projects/myproject/src/main.ts' of old program, it was successfully resolved to '/user/username/projects/myproject/src/filePresent.ts'.
Reusing resolution of module './filePresent' from '/user/username/projects/myproject/src/main.ts' of old program, it was successfully resolved to '/user/username/projects/myproject/src/filePresent.ts'.
Reusing resolution of module './fileNotFound' from '/user/username/projects/myproject/src/main.ts' of old program, it was not resolved.
Finishing updateGraphWorker: Project: /user/username/projects/myproject/tsconfig.json Version: 5 structureChanged: false structureIsReused:: Completely Elapsed:: *ms
Different program with same set of files

Project: /user/username/projects/myproject/tsconfig.json
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

{"fileName":"/user/username/projects/myproject/src/filePresent.ts","version":"11598859296-export function something() { return 10; }"}
export function something() { return 10; }

{"fileName":"/user/username/projects/myproject/src/anotherFileReusingResolution.ts","version":"-18180953903-import { something } from \"./filePresent\";\nimport { something2 } from \"./fileNotFound\";"}
import { something } from "./filePresent";
import { something2 } from "./fileNotFound";

{"fileName":"/user/username/projects/myproject/src/types.ts","version":"-12575322908-interface SomeType {}"}
interface SomeType {}

{"fileName":"/user/username/projects/myproject/src/fileWithRef.ts","version":"-6085631553-/// <reference path=\"./types.ts\"/>"}
/// <reference path="./types.ts"/>

{"fileName":"/user/username/projects/myproject/src/globalFilePresent.ts","version":"-5627034801-function globalSomething() { return 10; }"}
function globalSomething() { return 10; }

{"fileName":"/user/username/projects/myproject/src/globalFileNotFound.ts","version":"-6310824062-function globalSomething2() { return 20; }"}
function globalSomething2() { return 20; }

{"fileName":"/user/username/projects/myproject/src/globalAnotherFileWithSameReferenes.ts","version":"-4448253777-/// <reference path=\"./globalFilePresent.ts\"/>\n/// <reference path=\"./globalFileNotFound.ts\"/>\nfunction globalAnotherFileWithSameReferenes() { }\n"}
/// <reference path="./globalFilePresent.ts"/>
/// <reference path="./globalFileNotFound.ts"/>
function globalAnotherFileWithSameReferenes() { }


{"fileName":"/user/username/projects/myproject/src/globalNewFile.ts","version":"4916490342-function globalFoo() { return 20; }"}
function globalFoo() { return 20; }

{"fileName":"/user/username/projects/myproject/src/globalMain.ts","version":"-9112452180-/// <reference path=\"./globalNewFile.ts\"/>\n/// <reference path=\"./globalFilePresent.ts\"/>\n/// <reference path=\"./globalFileNotFound.ts\"/>\nfunction globalMain() { }\nglobalSomething();\nglobalFoo();\n"}
/// <reference path="./globalNewFile.ts"/>
/// <reference path="./globalFilePresent.ts"/>
/// <reference path="./globalFileNotFound.ts"/>
function globalMain() { }
globalSomething();
globalFoo();


{"fileName":"/user/username/projects/myproject/src/main.ts","version":"-15360103634-import { something } from \"./filePresent\";\nimport { something as something1 } from \"./filePresent\";\nimport { something2 } from \"./fileNotFound\";\nsomething();\n"}
import { something } from "./filePresent";
import { something as something1 } from "./filePresent";
import { something2 } from "./fileNotFound";
something();



Add new module and update main file::
DirectoryWatcher:: Triggered with /user/username/projects/myproject/src/newFile.ts :: WatchInfo: /user/username/projects/myproject/src 1 undefined Config: /user/username/projects/myproject/tsconfig.json WatchType: Wild card directory
Scheduled: /user/username/projects/myproject/tsconfig.json
Scheduled: *ensureProjectForOpenFiles*
Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/projects/myproject/src/newFile.ts :: WatchInfo: /user/username/projects/myproject/src 1 undefined Config: /user/username/projects/myproject/tsconfig.json WatchType: Wild card directory
request:{"command":"change","arguments":{"file":"/user/username/projects/myproject/src/main.ts","line":1,"offset":1,"endLine":1,"endOffset":1,"insertString":"import { foo } from \"./newFile\";\n"},"seq":5,"type":"request"}
response:{"responseRequired":false}
Running: /user/username/projects/myproject/tsconfig.json
FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/src/newFile.ts 500 undefined WatchType: Closed Script info
Starting updateGraphWorker: Project: /user/username/projects/myproject/tsconfig.json
Reusing resolution of module './filePresent' from '/user/username/projects/myproject/src/anotherFileReusingResolution.ts' of old program, it was successfully resolved to '/user/username/projects/myproject/src/filePresent.ts'.
Reusing resolution of module './fileNotFound' from '/user/username/projects/myproject/src/anotherFileReusingResolution.ts' of old program, it was not resolved.
Reusing resolution of module './filePresent' from '/user/username/projects/myproject/src/main.ts' of old program, it was successfully resolved to '/user/username/projects/myproject/src/filePresent.ts'.
Reusing resolution of module './filePresent' from '/user/username/projects/myproject/src/main.ts' of old program, it was successfully resolved to '/user/username/projects/myproject/src/filePresent.ts'.
Reusing resolution of module './fileNotFound' from '/user/username/projects/myproject/src/main.ts' of old program, it was not resolved.
======== Resolving module './newFile' from '/user/username/projects/myproject/src/main.ts'. ========
Module resolution kind is not specified, using 'Classic'.
File '/user/username/projects/myproject/src/newFile.ts' exist - use it as a name resolution result.
======== Module name './newFile' was successfully resolved to '/user/username/projects/myproject/src/newFile.ts'. ========
Finishing updateGraphWorker: Project: /user/username/projects/myproject/tsconfig.json Version: 6 structureChanged: true structureIsReused:: SafeModules Elapsed:: *ms
Project '/user/username/projects/myproject/tsconfig.json' (Configured)
	Files (12)
	/a/lib/lib.d.ts
	/user/username/projects/myproject/src/filePresent.ts
	/user/username/projects/myproject/src/anotherFileReusingResolution.ts
	/user/username/projects/myproject/src/types.ts
	/user/username/projects/myproject/src/fileWithRef.ts
	/user/username/projects/myproject/src/globalFilePresent.ts
	/user/username/projects/myproject/src/globalFileNotFound.ts
	/user/username/projects/myproject/src/globalAnotherFileWithSameReferenes.ts
	/user/username/projects/myproject/src/globalNewFile.ts
	/user/username/projects/myproject/src/globalMain.ts
	/user/username/projects/myproject/src/newFile.ts
	/user/username/projects/myproject/src/main.ts


	../../../../a/lib/lib.d.ts
	  Default library
	src/filePresent.ts
	  Imported via "./filePresent" from file 'src/anotherFileReusingResolution.ts'
	  Matched by include pattern 'src/**/*.ts' in 'tsconfig.json'
	  Imported via "./filePresent" from file 'src/main.ts'
	  Imported via "./filePresent" from file 'src/main.ts'
	src/anotherFileReusingResolution.ts
	  Matched by include pattern 'src/**/*.ts' in 'tsconfig.json'
	src/types.ts
	  Referenced via './types.ts' from file 'src/fileWithRef.ts'
	  Matched by include pattern 'src/**/*.ts' in 'tsconfig.json'
	src/fileWithRef.ts
	  Matched by include pattern 'src/**/*.ts' in 'tsconfig.json'
	src/globalFilePresent.ts
	  Referenced via './globalFilePresent.ts' from file 'src/globalAnotherFileWithSameReferenes.ts'
	  Matched by include pattern 'src/**/*.ts' in 'tsconfig.json'
	  Referenced via './globalFilePresent.ts' from file 'src/globalMain.ts'
	src/globalFileNotFound.ts
	  Referenced via './globalFileNotFound.ts' from file 'src/globalAnotherFileWithSameReferenes.ts'
	  Referenced via './globalFileNotFound.ts' from file 'src/globalMain.ts'
	  Matched by include pattern 'src/**/*.ts' in 'tsconfig.json'
	src/globalAnotherFileWithSameReferenes.ts
	  Matched by include pattern 'src/**/*.ts' in 'tsconfig.json'
	src/globalNewFile.ts
	  Referenced via './globalNewFile.ts' from file 'src/globalMain.ts'
	  Matched by include pattern 'src/**/*.ts' in 'tsconfig.json'
	src/globalMain.ts
	  Matched by include pattern 'src/**/*.ts' in 'tsconfig.json'
	src/newFile.ts
	  Imported via "./newFile" from file 'src/main.ts'
	  Matched by include pattern 'src/**/*.ts' in 'tsconfig.json'
	src/main.ts
	  Matched by include pattern 'src/**/*.ts' in 'tsconfig.json'

-----------------------------------------------
Running: *ensureProjectForOpenFiles*
Before ensureProjectForOpenFiles:
Project '/user/username/projects/myproject/tsconfig.json' (Configured)
	Files (12)

-----------------------------------------------
Open files: 
	FileName: /user/username/projects/myproject/src/main.ts ProjectRootPath: undefined
		Projects: /user/username/projects/myproject/tsconfig.json
	FileName: /user/username/projects/myproject/src/globalMain.ts ProjectRootPath: undefined
		Projects: /user/username/projects/myproject/tsconfig.json
After ensureProjectForOpenFiles:
Project '/user/username/projects/myproject/tsconfig.json' (Configured)
	Files (12)

-----------------------------------------------
Open files: 
	FileName: /user/username/projects/myproject/src/main.ts ProjectRootPath: undefined
		Projects: /user/username/projects/myproject/tsconfig.json
	FileName: /user/username/projects/myproject/src/globalMain.ts ProjectRootPath: undefined
		Projects: /user/username/projects/myproject/tsconfig.json

Project: /user/username/projects/myproject/tsconfig.json
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

{"fileName":"/user/username/projects/myproject/src/filePresent.ts","version":"11598859296-export function something() { return 10; }"}
export function something() { return 10; }

{"fileName":"/user/username/projects/myproject/src/anotherFileReusingResolution.ts","version":"-18180953903-import { something } from \"./filePresent\";\nimport { something2 } from \"./fileNotFound\";"}
import { something } from "./filePresent";
import { something2 } from "./fileNotFound";

{"fileName":"/user/username/projects/myproject/src/types.ts","version":"-12575322908-interface SomeType {}"}
interface SomeType {}

{"fileName":"/user/username/projects/myproject/src/fileWithRef.ts","version":"-6085631553-/// <reference path=\"./types.ts\"/>"}
/// <reference path="./types.ts"/>

{"fileName":"/user/username/projects/myproject/src/globalFilePresent.ts","version":"-5627034801-function globalSomething() { return 10; }"}
function globalSomething() { return 10; }

{"fileName":"/user/username/projects/myproject/src/globalFileNotFound.ts","version":"-6310824062-function globalSomething2() { return 20; }"}
function globalSomething2() { return 20; }

{"fileName":"/user/username/projects/myproject/src/globalAnotherFileWithSameReferenes.ts","version":"-4448253777-/// <reference path=\"./globalFilePresent.ts\"/>\n/// <reference path=\"./globalFileNotFound.ts\"/>\nfunction globalAnotherFileWithSameReferenes() { }\n"}
/// <reference path="./globalFilePresent.ts"/>
/// <reference path="./globalFileNotFound.ts"/>
function globalAnotherFileWithSameReferenes() { }


{"fileName":"/user/username/projects/myproject/src/globalNewFile.ts","version":"4916490342-function globalFoo() { return 20; }"}
function globalFoo() { return 20; }

{"fileName":"/user/username/projects/myproject/src/globalMain.ts","version":"-9112452180-/// <reference path=\"./globalNewFile.ts\"/>\n/// <reference path=\"./globalFilePresent.ts\"/>\n/// <reference path=\"./globalFileNotFound.ts\"/>\nfunction globalMain() { }\nglobalSomething();\nglobalFoo();\n"}
/// <reference path="./globalNewFile.ts"/>
/// <reference path="./globalFilePresent.ts"/>
/// <reference path="./globalFileNotFound.ts"/>
function globalMain() { }
globalSomething();
globalFoo();


{"fileName":"/user/username/projects/myproject/src/newFile.ts","version":"4428918903-export function foo() { return 20; }"}
export function foo() { return 20; }

{"fileName":"/user/username/projects/myproject/src/main.ts","version":"-94210647-import { foo } from \"./newFile\";\nimport { something } from \"./filePresent\";\nimport { something as something1 } from \"./filePresent\";\nimport { something2 } from \"./fileNotFound\";\nsomething();\n"}
import { foo } from "./newFile";
import { something } from "./filePresent";
import { something as something1 } from "./filePresent";
import { something2 } from "./fileNotFound";
something();



Write file that could not be resolved
DirectoryWatcher:: Triggered with /user/username/projects/myproject/src/fileNotFound.ts :: WatchInfo: /user/username/projects/myproject/src 1 undefined Config: /user/username/projects/myproject/tsconfig.json WatchType: Wild card directory
Scheduled: /user/username/projects/myproject/tsconfig.json
Scheduled: *ensureProjectForOpenFiles*
Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/projects/myproject/src/fileNotFound.ts :: WatchInfo: /user/username/projects/myproject/src 1 undefined Config: /user/username/projects/myproject/tsconfig.json WatchType: Wild card directory
Running: /user/username/projects/myproject/tsconfig.json
FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/src/fileNotFound.ts 500 undefined WatchType: Closed Script info
Starting updateGraphWorker: Project: /user/username/projects/myproject/tsconfig.json
Reusing resolution of module './filePresent' from '/user/username/projects/myproject/src/anotherFileReusingResolution.ts' of old program, it was successfully resolved to '/user/username/projects/myproject/src/filePresent.ts'.
Reusing resolution of module './fileNotFound' from '/user/username/projects/myproject/src/anotherFileReusingResolution.ts' of old program, it was not resolved.
Reusing resolution of module './newFile' from '/user/username/projects/myproject/src/main.ts' of old program, it was successfully resolved to '/user/username/projects/myproject/src/newFile.ts'.
Reusing resolution of module './filePresent' from '/user/username/projects/myproject/src/main.ts' of old program, it was successfully resolved to '/user/username/projects/myproject/src/filePresent.ts'.
Reusing resolution of module './filePresent' from '/user/username/projects/myproject/src/main.ts' of old program, it was successfully resolved to '/user/username/projects/myproject/src/filePresent.ts'.
Reusing resolution of module './fileNotFound' from '/user/username/projects/myproject/src/main.ts' of old program, it was not resolved.
Finishing updateGraphWorker: Project: /user/username/projects/myproject/tsconfig.json Version: 7 structureChanged: true structureIsReused:: SafeModules Elapsed:: *ms
Project '/user/username/projects/myproject/tsconfig.json' (Configured)
	Files (13)
	/a/lib/lib.d.ts
	/user/username/projects/myproject/src/filePresent.ts
	/user/username/projects/myproject/src/anotherFileReusingResolution.ts
	/user/username/projects/myproject/src/types.ts
	/user/username/projects/myproject/src/fileWithRef.ts
	/user/username/projects/myproject/src/globalFilePresent.ts
	/user/username/projects/myproject/src/globalFileNotFound.ts
	/user/username/projects/myproject/src/globalAnotherFileWithSameReferenes.ts
	/user/username/projects/myproject/src/globalNewFile.ts
	/user/username/projects/myproject/src/globalMain.ts
	/user/username/projects/myproject/src/newFile.ts
	/user/username/projects/myproject/src/main.ts
	/user/username/projects/myproject/src/fileNotFound.ts


	../../../../a/lib/lib.d.ts
	  Default library
	src/filePresent.ts
	  Imported via "./filePresent" from file 'src/anotherFileReusingResolution.ts'
	  Matched by include pattern 'src/**/*.ts' in 'tsconfig.json'
	  Imported via "./filePresent" from file 'src/main.ts'
	  Imported via "./filePresent" from file 'src/main.ts'
	src/anotherFileReusingResolution.ts
	  Matched by include pattern 'src/**/*.ts' in 'tsconfig.json'
	src/types.ts
	  Referenced via './types.ts' from file 'src/fileWithRef.ts'
	  Matched by include pattern 'src/**/*.ts' in 'tsconfig.json'
	src/fileWithRef.ts
	  Matched by include pattern 'src/**/*.ts' in 'tsconfig.json'
	src/globalFilePresent.ts
	  Referenced via './globalFilePresent.ts' from file 'src/globalAnotherFileWithSameReferenes.ts'
	  Matched by include pattern 'src/**/*.ts' in 'tsconfig.json'
	  Referenced via './globalFilePresent.ts' from file 'src/globalMain.ts'
	src/globalFileNotFound.ts
	  Referenced via './globalFileNotFound.ts' from file 'src/globalAnotherFileWithSameReferenes.ts'
	  Referenced via './globalFileNotFound.ts' from file 'src/globalMain.ts'
	  Matched by include pattern 'src/**/*.ts' in 'tsconfig.json'
	src/globalAnotherFileWithSameReferenes.ts
	  Matched by include pattern 'src/**/*.ts' in 'tsconfig.json'
	src/globalNewFile.ts
	  Referenced via './globalNewFile.ts' from file 'src/globalMain.ts'
	  Matched by include pattern 'src/**/*.ts' in 'tsconfig.json'
	src/globalMain.ts
	  Matched by include pattern 'src/**/*.ts' in 'tsconfig.json'
	src/newFile.ts
	  Imported via "./newFile" from file 'src/main.ts'
	  Matched by include pattern 'src/**/*.ts' in 'tsconfig.json'
	src/main.ts
	  Matched by include pattern 'src/**/*.ts' in 'tsconfig.json'
	src/fileNotFound.ts
	  Matched by include pattern 'src/**/*.ts' in 'tsconfig.json'

-----------------------------------------------
Running: *ensureProjectForOpenFiles*
Before ensureProjectForOpenFiles:
Project '/user/username/projects/myproject/tsconfig.json' (Configured)
	Files (13)

-----------------------------------------------
Open files: 
	FileName: /user/username/projects/myproject/src/main.ts ProjectRootPath: undefined
		Projects: /user/username/projects/myproject/tsconfig.json
	FileName: /user/username/projects/myproject/src/globalMain.ts ProjectRootPath: undefined
		Projects: /user/username/projects/myproject/tsconfig.json
After ensureProjectForOpenFiles:
Project '/user/username/projects/myproject/tsconfig.json' (Configured)
	Files (13)

-----------------------------------------------
Open files: 
	FileName: /user/username/projects/myproject/src/main.ts ProjectRootPath: undefined
		Projects: /user/username/projects/myproject/tsconfig.json
	FileName: /user/username/projects/myproject/src/globalMain.ts ProjectRootPath: undefined
		Projects: /user/username/projects/myproject/tsconfig.json

Project: /user/username/projects/myproject/tsconfig.json
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

{"fileName":"/user/username/projects/myproject/src/filePresent.ts","version":"11598859296-export function something() { return 10; }"}
export function something() { return 10; }

{"fileName":"/user/username/projects/myproject/src/anotherFileReusingResolution.ts","version":"-18180953903-import { something } from \"./filePresent\";\nimport { something2 } from \"./fileNotFound\";"}
import { something } from "./filePresent";
import { something2 } from "./fileNotFound";

{"fileName":"/user/username/projects/myproject/src/types.ts","version":"-12575322908-interface SomeType {}"}
interface SomeType {}

{"fileName":"/user/username/projects/myproject/src/fileWithRef.ts","version":"-6085631553-/// <reference path=\"./types.ts\"/>"}
/// <reference path="./types.ts"/>

{"fileName":"/user/username/projects/myproject/src/globalFilePresent.ts","version":"-5627034801-function globalSomething() { return 10; }"}
function globalSomething() { return 10; }

{"fileName":"/user/username/projects/myproject/src/globalFileNotFound.ts","version":"-6310824062-function globalSomething2() { return 20; }"}
function globalSomething2() { return 20; }

{"fileName":"/user/username/projects/myproject/src/globalAnotherFileWithSameReferenes.ts","version":"-4448253777-/// <reference path=\"./globalFilePresent.ts\"/>\n/// <reference path=\"./globalFileNotFound.ts\"/>\nfunction globalAnotherFileWithSameReferenes() { }\n"}
/// <reference path="./globalFilePresent.ts"/>
/// <reference path="./globalFileNotFound.ts"/>
function globalAnotherFileWithSameReferenes() { }


{"fileName":"/user/username/projects/myproject/src/globalNewFile.ts","version":"4916490342-function globalFoo() { return 20; }"}
function globalFoo() { return 20; }

{"fileName":"/user/username/projects/myproject/src/globalMain.ts","version":"-9112452180-/// <reference path=\"./globalNewFile.ts\"/>\n/// <reference path=\"./globalFilePresent.ts\"/>\n/// <reference path=\"./globalFileNotFound.ts\"/>\nfunction globalMain() { }\nglobalSomething();\nglobalFoo();\n"}
/// <reference path="./globalNewFile.ts"/>
/// <reference path="./globalFilePresent.ts"/>
/// <reference path="./globalFileNotFound.ts"/>
function globalMain() { }
globalSomething();
globalFoo();


{"fileName":"/user/username/projects/myproject/src/newFile.ts","version":"4428918903-export function foo() { return 20; }"}
export function foo() { return 20; }

{"fileName":"/user/username/projects/myproject/src/main.ts","version":"-94210647-import { foo } from \"./newFile\";\nimport { something } from \"./filePresent\";\nimport { something as something1 } from \"./filePresent\";\nimport { something2 } from \"./fileNotFound\";\nsomething();\n"}
import { foo } from "./newFile";
import { something } from "./filePresent";
import { something as something1 } from "./filePresent";
import { something2 } from "./fileNotFound";
something();


{"fileName":"/user/username/projects/myproject/src/fileNotFound.ts","version":"-497034637-export function something2() { return 20; }"}
export function something2() { return 20; }

