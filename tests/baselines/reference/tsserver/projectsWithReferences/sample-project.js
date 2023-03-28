currentDirectory:: / useCaseSensitiveFileNames: false
Info 0    [00:00:39.000] Provided types map file "/typesMap.json" doesn't exist
Creating project service
//// [/a/lib/lib.d.ts]
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

//// [/user/username/projects/sample1/core/tsconfig.json]
{
    "compilerOptions": {
        "composite": true,
        "declaration": true,
        "declarationMap": true,
        "skipDefaultLibCheck": true
    }
}

//// [/user/username/projects/sample1/core/index.ts]
export const someString: string = "HELLO WORLD";
export function leftPad(s: string, n: number) { return s + n; }
export function multiply(a: number, b: number) { return a * b; }


//// [/user/username/projects/sample1/core/anotherModule.ts]
export const World = "hello";


//// [/user/username/projects/sample1/core/some_decl.d.ts]
declare const dts: any;


//// [/user/username/projects/sample1/logic/tsconfig.json]
{
    "compilerOptions": {
        "composite": true,
        "declaration": true,
        "sourceMap": true,
        "forceConsistentCasingInFileNames": true,
        "skipDefaultLibCheck": true
    },
    "references": [
        { "path": "../core" }
    ]
}


//// [/user/username/projects/sample1/logic/index.ts]
import * as c from '../core/index';
export function getSecondsInDay() {
    return c.multiply(10, 15);
}
import * as mod from '../core/anotherModule';
export const m = mod;


//// [/user/username/projects/sample1/tests/tsconfig.json]
{
    "references": [
        { "path": "../core" },
        { "path": "../logic" }
    ],
    "files": ["index.ts"],
    "compilerOptions": {
        "composite": true,
        "declaration": true,
        "forceConsistentCasingInFileNames": true,
        "skipDefaultLibCheck": true
    }
}

//// [/user/username/projects/sample1/tests/index.ts]
import * as c from '../core/index';
import * as logic from '../logic/index';

c.leftPad("", 10);
logic.getSecondsInDay();

import * as mod from '../core/anotherModule';
export const m = mod;



Info 1    [00:00:40.000] Search path: /user/username/projects/sample1/tests
Info 2    [00:00:41.000] For info: /user/username/projects/sample1/tests/index.ts :: Config file name: /user/username/projects/sample1/tests/tsconfig.json
Info 3    [00:00:42.000] Creating configuration project /user/username/projects/sample1/tests/tsconfig.json
Info 4    [00:00:43.000] FileWatcher:: Added:: WatchInfo: /user/username/projects/sample1/tests/tsconfig.json 2000 undefined Project: /user/username/projects/sample1/tests/tsconfig.json WatchType: Config file
Info 5    [00:00:44.000] Config: /user/username/projects/sample1/tests/tsconfig.json : {
 "rootNames": [
  "/user/username/projects/sample1/tests/index.ts"
 ],
 "options": {
  "composite": true,
  "declaration": true,
  "forceConsistentCasingInFileNames": true,
  "skipDefaultLibCheck": true,
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
Info 6    [00:00:45.000] Starting updateGraphWorker: Project: /user/username/projects/sample1/tests/tsconfig.json
Info 7    [00:00:46.000] Config: /user/username/projects/sample1/core/tsconfig.json : {
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
  "configFilePath": "/user/username/projects/sample1/core/tsconfig.json"
 }
}
Info 8    [00:00:47.000] FileWatcher:: Added:: WatchInfo: /user/username/projects/sample1/core/tsconfig.json 2000 undefined Project: /user/username/projects/sample1/tests/tsconfig.json WatchType: Config file
Info 9    [00:00:48.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/sample1/core 1 undefined Config: /user/username/projects/sample1/core/tsconfig.json WatchType: Wild card directory
Info 10   [00:00:49.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/sample1/core 1 undefined Config: /user/username/projects/sample1/core/tsconfig.json WatchType: Wild card directory
Info 11   [00:00:50.000] Config: /user/username/projects/sample1/logic/tsconfig.json : {
 "rootNames": [
  "/user/username/projects/sample1/logic/index.ts"
 ],
 "options": {
  "composite": true,
  "declaration": true,
  "sourceMap": true,
  "forceConsistentCasingInFileNames": true,
  "skipDefaultLibCheck": true,
  "configFilePath": "/user/username/projects/sample1/logic/tsconfig.json"
 },
 "projectReferences": [
  {
   "path": "/user/username/projects/sample1/core",
   "originalPath": "../core"
  }
 ]
}
Info 12   [00:00:51.000] FileWatcher:: Added:: WatchInfo: /user/username/projects/sample1/logic/tsconfig.json 2000 undefined Project: /user/username/projects/sample1/tests/tsconfig.json WatchType: Config file
Info 13   [00:00:52.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/sample1/logic 1 undefined Config: /user/username/projects/sample1/logic/tsconfig.json WatchType: Wild card directory
Info 14   [00:00:53.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/sample1/logic 1 undefined Config: /user/username/projects/sample1/logic/tsconfig.json WatchType: Wild card directory
Info 15   [00:00:54.000] FileWatcher:: Added:: WatchInfo: /user/username/projects/sample1/core/index.ts 500 undefined WatchType: Closed Script info
Info 16   [00:00:55.000] FileWatcher:: Added:: WatchInfo: /user/username/projects/sample1/logic/index.ts 500 undefined WatchType: Closed Script info
Info 17   [00:00:56.000] FileWatcher:: Added:: WatchInfo: /user/username/projects/sample1/core/anotherModule.ts 500 undefined WatchType: Closed Script info
Info 18   [00:00:57.000] FileWatcher:: Added:: WatchInfo: /a/lib/lib.d.ts 500 undefined WatchType: Closed Script info
Info 19   [00:00:58.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/sample1/tests/node_modules/@types 1 undefined Project: /user/username/projects/sample1/tests/tsconfig.json WatchType: Type roots
Info 20   [00:00:59.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/sample1/tests/node_modules/@types 1 undefined Project: /user/username/projects/sample1/tests/tsconfig.json WatchType: Type roots
Info 21   [00:01:00.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/sample1/node_modules/@types 1 undefined Project: /user/username/projects/sample1/tests/tsconfig.json WatchType: Type roots
Info 22   [00:01:01.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/sample1/node_modules/@types 1 undefined Project: /user/username/projects/sample1/tests/tsconfig.json WatchType: Type roots
Info 23   [00:01:02.000] Finishing updateGraphWorker: Project: /user/username/projects/sample1/tests/tsconfig.json Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 24   [00:01:03.000] Project '/user/username/projects/sample1/tests/tsconfig.json' (Configured)
Info 25   [00:01:04.000] 	Files (5)
	/a/lib/lib.d.ts Text-1 "/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }"
	/user/username/projects/sample1/core/index.ts Text-1 "export const someString: string = \"HELLO WORLD\";\r\nexport function leftPad(s: string, n: number) { return s + n; }\r\nexport function multiply(a: number, b: number) { return a * b; }\r\n"
	/user/username/projects/sample1/core/anotherModule.ts Text-1 "export const World = \"hello\";\r\n"
	/user/username/projects/sample1/logic/index.ts Text-1 "import * as c from '../core/index';\r\nexport function getSecondsInDay() {\r\n    return c.multiply(10, 15);\r\n}\r\nimport * as mod from '../core/anotherModule';\r\nexport const m = mod;\r\n"
	/user/username/projects/sample1/tests/index.ts SVC-1-0 "import * as c from '../core/index';\r\nimport * as logic from '../logic/index';\r\n\r\nc.leftPad(\"\", 10);\r\nlogic.getSecondsInDay();\r\n\r\nimport * as mod from '../core/anotherModule';\r\nexport const m = mod;\r\n"


	../../../../../a/lib/lib.d.ts
	  Default library for target 'es5'
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

Info 26   [00:01:05.000] -----------------------------------------------
Info 27   [00:01:06.000] Search path: /user/username/projects/sample1/tests
Info 28   [00:01:07.000] For info: /user/username/projects/sample1/tests/tsconfig.json :: No config files found.
Info 29   [00:01:08.000] Project '/user/username/projects/sample1/tests/tsconfig.json' (Configured)
Info 29   [00:01:09.000] 	Files (5)

Info 29   [00:01:10.000] -----------------------------------------------
Info 29   [00:01:11.000] Open files: 
Info 29   [00:01:12.000] 	FileName: /user/username/projects/sample1/tests/index.ts ProjectRootPath: undefined
Info 29   [00:01:13.000] 		Projects: /user/username/projects/sample1/tests/tsconfig.json
Info 29   [00:01:16.000] FileWatcher:: Triggered with /user/username/projects/sample1/logic/index.ts 1:: WatchInfo: /user/username/projects/sample1/logic/index.ts 500 undefined WatchType: Closed Script info
Info 30   [00:01:17.000] Scheduled: /user/username/projects/sample1/tests/tsconfig.json
Info 31   [00:01:18.000] Scheduled: *ensureProjectForOpenFiles*
Info 32   [00:01:19.000] Elapsed:: *ms FileWatcher:: Triggered with /user/username/projects/sample1/logic/index.ts 1:: WatchInfo: /user/username/projects/sample1/logic/index.ts 500 undefined WatchType: Closed Script info
Before checking timeout queue length (2) and running
//// [/user/username/projects/sample1/logic/index.ts]
import * as c from '../core/index';
export function getSecondsInDay() {
    return c.multiply(10, 15);
}
import * as mod from '../core/anotherModule';
export const m = mod;
function foo() {}


PolledWatches::
/user/username/projects/sample1/tests/node_modules/@types: *new*
  {"pollingInterval":500}
/user/username/projects/sample1/node_modules/@types: *new*
  {"pollingInterval":500}

FsWatches::
/user/username/projects/sample1/tests/tsconfig.json: *new*
  {}
/user/username/projects/sample1/core/tsconfig.json: *new*
  {}
/user/username/projects/sample1/logic/tsconfig.json: *new*
  {}
/user/username/projects/sample1/core/index.ts: *new*
  {}
/user/username/projects/sample1/logic/index.ts: *new*
  {}
/user/username/projects/sample1/core/anothermodule.ts: *new*
  {}
/a/lib/lib.d.ts: *new*
  {}

FsWatchesRecursive::
/user/username/projects/sample1/core: *new*
  {}
/user/username/projects/sample1/logic: *new*
  {}

Info 33   [00:01:20.000] Running: /user/username/projects/sample1/tests/tsconfig.json
Info 34   [00:01:21.000] Starting updateGraphWorker: Project: /user/username/projects/sample1/tests/tsconfig.json
Info 35   [00:01:22.000] Finishing updateGraphWorker: Project: /user/username/projects/sample1/tests/tsconfig.json Version: 2 structureChanged: false structureIsReused:: Completely Elapsed:: *ms
Info 36   [00:01:23.000] Project '/user/username/projects/sample1/tests/tsconfig.json' (Configured)
Info 37   [00:01:24.000] 	Files (5)
	/a/lib/lib.d.ts Text-1 "/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }"
	/user/username/projects/sample1/core/index.ts Text-1 "export const someString: string = \"HELLO WORLD\";\r\nexport function leftPad(s: string, n: number) { return s + n; }\r\nexport function multiply(a: number, b: number) { return a * b; }\r\n"
	/user/username/projects/sample1/core/anotherModule.ts Text-1 "export const World = \"hello\";\r\n"
	/user/username/projects/sample1/logic/index.ts Text-2 "import * as c from '../core/index';\r\nexport function getSecondsInDay() {\r\n    return c.multiply(10, 15);\r\n}\r\nimport * as mod from '../core/anotherModule';\r\nexport const m = mod;\r\nfunction foo() {}"
	/user/username/projects/sample1/tests/index.ts SVC-1-0 "import * as c from '../core/index';\r\nimport * as logic from '../logic/index';\r\n\r\nc.leftPad(\"\", 10);\r\nlogic.getSecondsInDay();\r\n\r\nimport * as mod from '../core/anotherModule';\r\nexport const m = mod;\r\n"

Info 38   [00:01:25.000] -----------------------------------------------
Info 39   [00:01:26.000] Running: *ensureProjectForOpenFiles*
Info 40   [00:01:27.000] Before ensureProjectForOpenFiles:
Info 41   [00:01:28.000] Project '/user/username/projects/sample1/tests/tsconfig.json' (Configured)
Info 41   [00:01:29.000] 	Files (5)

Info 41   [00:01:30.000] -----------------------------------------------
Info 41   [00:01:31.000] Open files: 
Info 41   [00:01:32.000] 	FileName: /user/username/projects/sample1/tests/index.ts ProjectRootPath: undefined
Info 41   [00:01:33.000] 		Projects: /user/username/projects/sample1/tests/tsconfig.json
Info 41   [00:01:34.000] After ensureProjectForOpenFiles:
Info 42   [00:01:35.000] Project '/user/username/projects/sample1/tests/tsconfig.json' (Configured)
Info 42   [00:01:36.000] 	Files (5)

Info 42   [00:01:37.000] -----------------------------------------------
Info 42   [00:01:38.000] Open files: 
Info 42   [00:01:39.000] 	FileName: /user/username/projects/sample1/tests/index.ts ProjectRootPath: undefined
Info 42   [00:01:40.000] 		Projects: /user/username/projects/sample1/tests/tsconfig.json
After checking timeout queue length (2) and running

Info 42   [00:01:43.000] FileWatcher:: Triggered with /user/username/projects/sample1/logic/index.ts 1:: WatchInfo: /user/username/projects/sample1/logic/index.ts 500 undefined WatchType: Closed Script info
Info 43   [00:01:44.000] Scheduled: /user/username/projects/sample1/tests/tsconfig.json
Info 44   [00:01:45.000] Scheduled: *ensureProjectForOpenFiles*
Info 45   [00:01:46.000] Elapsed:: *ms FileWatcher:: Triggered with /user/username/projects/sample1/logic/index.ts 1:: WatchInfo: /user/username/projects/sample1/logic/index.ts 500 undefined WatchType: Closed Script info
Before checking timeout queue length (2) and running
//// [/user/username/projects/sample1/logic/index.ts]
import * as c from '../core/index';
export function getSecondsInDay() {
    return c.multiply(10, 15);
}
import * as mod from '../core/anotherModule';
export const m = mod;
function foo() {}export function gfoo() {}


Info 46   [00:01:47.000] Running: /user/username/projects/sample1/tests/tsconfig.json
Info 47   [00:01:48.000] Starting updateGraphWorker: Project: /user/username/projects/sample1/tests/tsconfig.json
Info 48   [00:01:49.000] Finishing updateGraphWorker: Project: /user/username/projects/sample1/tests/tsconfig.json Version: 3 structureChanged: false structureIsReused:: Completely Elapsed:: *ms
Info 49   [00:01:50.000] Project '/user/username/projects/sample1/tests/tsconfig.json' (Configured)
Info 50   [00:01:51.000] 	Files (5)
	/a/lib/lib.d.ts Text-1 "/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }"
	/user/username/projects/sample1/core/index.ts Text-1 "export const someString: string = \"HELLO WORLD\";\r\nexport function leftPad(s: string, n: number) { return s + n; }\r\nexport function multiply(a: number, b: number) { return a * b; }\r\n"
	/user/username/projects/sample1/core/anotherModule.ts Text-1 "export const World = \"hello\";\r\n"
	/user/username/projects/sample1/logic/index.ts Text-3 "import * as c from '../core/index';\r\nexport function getSecondsInDay() {\r\n    return c.multiply(10, 15);\r\n}\r\nimport * as mod from '../core/anotherModule';\r\nexport const m = mod;\r\nfunction foo() {}export function gfoo() {}"
	/user/username/projects/sample1/tests/index.ts SVC-1-0 "import * as c from '../core/index';\r\nimport * as logic from '../logic/index';\r\n\r\nc.leftPad(\"\", 10);\r\nlogic.getSecondsInDay();\r\n\r\nimport * as mod from '../core/anotherModule';\r\nexport const m = mod;\r\n"

Info 51   [00:01:52.000] -----------------------------------------------
Info 52   [00:01:53.000] Running: *ensureProjectForOpenFiles*
Info 53   [00:01:54.000] Before ensureProjectForOpenFiles:
Info 54   [00:01:55.000] Project '/user/username/projects/sample1/tests/tsconfig.json' (Configured)
Info 54   [00:01:56.000] 	Files (5)

Info 54   [00:01:57.000] -----------------------------------------------
Info 54   [00:01:58.000] Open files: 
Info 54   [00:01:59.000] 	FileName: /user/username/projects/sample1/tests/index.ts ProjectRootPath: undefined
Info 54   [00:02:00.000] 		Projects: /user/username/projects/sample1/tests/tsconfig.json
Info 54   [00:02:01.000] After ensureProjectForOpenFiles:
Info 55   [00:02:02.000] Project '/user/username/projects/sample1/tests/tsconfig.json' (Configured)
Info 55   [00:02:03.000] 	Files (5)

Info 55   [00:02:04.000] -----------------------------------------------
Info 55   [00:02:05.000] Open files: 
Info 55   [00:02:06.000] 	FileName: /user/username/projects/sample1/tests/index.ts ProjectRootPath: undefined
Info 55   [00:02:07.000] 		Projects: /user/username/projects/sample1/tests/tsconfig.json
After checking timeout queue length (2) and running

Info 55   [00:02:11.000] FileWatcher:: Triggered with /user/username/projects/sample1/logic/tsconfig.json 1:: WatchInfo: /user/username/projects/sample1/logic/tsconfig.json 2000 undefined Project: /user/username/projects/sample1/tests/tsconfig.json WatchType: Config file
Info 56   [00:02:12.000] Scheduled: /user/username/projects/sample1/tests/tsconfig.json
Info 57   [00:02:13.000] Scheduled: *ensureProjectForOpenFiles*
Info 58   [00:02:14.000] Elapsed:: *ms FileWatcher:: Triggered with /user/username/projects/sample1/logic/tsconfig.json 1:: WatchInfo: /user/username/projects/sample1/logic/tsconfig.json 2000 undefined Project: /user/username/projects/sample1/tests/tsconfig.json WatchType: Config file
Before checking timeout queue length (2) and running
//// [/user/username/projects/sample1/logic/tsconfig.json]
{"compilerOptions":{"composite":true,"declaration":true,"declarationDir":"decls"},"references":[{"path":"../core"}]}


Info 59   [00:02:15.000] Running: /user/username/projects/sample1/tests/tsconfig.json
Info 60   [00:02:16.000] Starting updateGraphWorker: Project: /user/username/projects/sample1/tests/tsconfig.json
Info 61   [00:02:17.000] Config: /user/username/projects/sample1/logic/tsconfig.json : {
 "rootNames": [
  "/user/username/projects/sample1/logic/index.ts"
 ],
 "options": {
  "composite": true,
  "declaration": true,
  "declarationDir": "/user/username/projects/sample1/logic/decls",
  "configFilePath": "/user/username/projects/sample1/logic/tsconfig.json"
 },
 "projectReferences": [
  {
   "path": "/user/username/projects/sample1/core",
   "originalPath": "../core"
  }
 ]
}
Info 62   [00:02:18.000] Finishing updateGraphWorker: Project: /user/username/projects/sample1/tests/tsconfig.json Version: 4 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 63   [00:02:19.000] Project '/user/username/projects/sample1/tests/tsconfig.json' (Configured)
Info 64   [00:02:20.000] 	Files (5)
	/a/lib/lib.d.ts Text-1 "/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }"
	/user/username/projects/sample1/core/index.ts Text-1 "export const someString: string = \"HELLO WORLD\";\r\nexport function leftPad(s: string, n: number) { return s + n; }\r\nexport function multiply(a: number, b: number) { return a * b; }\r\n"
	/user/username/projects/sample1/core/anotherModule.ts Text-1 "export const World = \"hello\";\r\n"
	/user/username/projects/sample1/logic/index.ts Text-3 "import * as c from '../core/index';\r\nexport function getSecondsInDay() {\r\n    return c.multiply(10, 15);\r\n}\r\nimport * as mod from '../core/anotherModule';\r\nexport const m = mod;\r\nfunction foo() {}export function gfoo() {}"
	/user/username/projects/sample1/tests/index.ts SVC-1-0 "import * as c from '../core/index';\r\nimport * as logic from '../logic/index';\r\n\r\nc.leftPad(\"\", 10);\r\nlogic.getSecondsInDay();\r\n\r\nimport * as mod from '../core/anotherModule';\r\nexport const m = mod;\r\n"

Info 65   [00:02:21.000] -----------------------------------------------
Info 66   [00:02:22.000] Running: *ensureProjectForOpenFiles*
Info 67   [00:02:23.000] Before ensureProjectForOpenFiles:
Info 68   [00:02:24.000] Project '/user/username/projects/sample1/tests/tsconfig.json' (Configured)
Info 68   [00:02:25.000] 	Files (5)

Info 68   [00:02:26.000] -----------------------------------------------
Info 68   [00:02:27.000] Open files: 
Info 68   [00:02:28.000] 	FileName: /user/username/projects/sample1/tests/index.ts ProjectRootPath: undefined
Info 68   [00:02:29.000] 		Projects: /user/username/projects/sample1/tests/tsconfig.json
Info 68   [00:02:30.000] After ensureProjectForOpenFiles:
Info 69   [00:02:31.000] Project '/user/username/projects/sample1/tests/tsconfig.json' (Configured)
Info 69   [00:02:32.000] 	Files (5)

Info 69   [00:02:33.000] -----------------------------------------------
Info 69   [00:02:34.000] Open files: 
Info 69   [00:02:35.000] 	FileName: /user/username/projects/sample1/tests/index.ts ProjectRootPath: undefined
Info 69   [00:02:36.000] 		Projects: /user/username/projects/sample1/tests/tsconfig.json
After checking timeout queue length (2) and running
