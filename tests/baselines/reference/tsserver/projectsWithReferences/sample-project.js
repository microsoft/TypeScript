currentDirectory:: / useCaseSensitiveFileNames: false
Info seq  [hh:mm:ss:mss] Provided types map file "/typesMap.json" doesn't exist
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



Info seq  [hh:mm:ss:mss] Search path: /user/username/projects/sample1/tests
Info seq  [hh:mm:ss:mss] For info: /user/username/projects/sample1/tests/index.ts :: Config file name: /user/username/projects/sample1/tests/tsconfig.json
Info seq  [hh:mm:ss:mss] Creating configuration project /user/username/projects/sample1/tests/tsconfig.json
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /user/username/projects/sample1/tests/tsconfig.json 2000 undefined Project: /user/username/projects/sample1/tests/tsconfig.json WatchType: Config file
Info seq  [hh:mm:ss:mss] Config: /user/username/projects/sample1/tests/tsconfig.json : {
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
Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: /user/username/projects/sample1/tests/tsconfig.json
Info seq  [hh:mm:ss:mss] Config: /user/username/projects/sample1/core/tsconfig.json : {
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
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /user/username/projects/sample1/core/tsconfig.json 2000 undefined Project: /user/username/projects/sample1/tests/tsconfig.json WatchType: Config file
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/sample1/core 1 undefined Config: /user/username/projects/sample1/core/tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/sample1/core 1 undefined Config: /user/username/projects/sample1/core/tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] Config: /user/username/projects/sample1/logic/tsconfig.json : {
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
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /user/username/projects/sample1/logic/tsconfig.json 2000 undefined Project: /user/username/projects/sample1/tests/tsconfig.json WatchType: Config file
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/sample1/logic 1 undefined Config: /user/username/projects/sample1/logic/tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/sample1/logic 1 undefined Config: /user/username/projects/sample1/logic/tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /user/username/projects/sample1/core/index.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /user/username/projects/sample1/logic/index.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /user/username/projects/sample1/core/anotherModule.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /a/lib/lib.d.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/sample1/tests/node_modules/@types 1 undefined Project: /user/username/projects/sample1/tests/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/sample1/tests/node_modules/@types 1 undefined Project: /user/username/projects/sample1/tests/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/sample1/node_modules/@types 1 undefined Project: /user/username/projects/sample1/tests/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/sample1/node_modules/@types 1 undefined Project: /user/username/projects/sample1/tests/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/node_modules/@types 1 undefined Project: /user/username/projects/sample1/tests/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/node_modules/@types 1 undefined Project: /user/username/projects/sample1/tests/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: /user/username/projects/sample1/tests/tsconfig.json Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Project '/user/username/projects/sample1/tests/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (5)
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

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Search path: /user/username/projects/sample1/tests
Info seq  [hh:mm:ss:mss] For info: /user/username/projects/sample1/tests/tsconfig.json :: No config files found.
Info seq  [hh:mm:ss:mss] Project '/user/username/projects/sample1/tests/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (5)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: /user/username/projects/sample1/tests/index.ts ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /user/username/projects/sample1/tests/tsconfig.json
Info seq  [hh:mm:ss:mss] FileWatcher:: Triggered with /user/username/projects/sample1/logic/index.ts 1:: WatchInfo: /user/username/projects/sample1/logic/index.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] Scheduled: /user/username/projects/sample1/tests/tsconfig.json
Info seq  [hh:mm:ss:mss] Scheduled: *ensureProjectForOpenFiles*
Info seq  [hh:mm:ss:mss] Elapsed:: *ms FileWatcher:: Triggered with /user/username/projects/sample1/logic/index.ts 1:: WatchInfo: /user/username/projects/sample1/logic/index.ts 500 undefined WatchType: Closed Script info
Before running Timeout callback:: count: 2
1: /user/username/projects/sample1/tests/tsconfig.json
2: *ensureProjectForOpenFiles*
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
/user/username/projects/node_modules/@types: *new*
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

Info seq  [hh:mm:ss:mss] Running: /user/username/projects/sample1/tests/tsconfig.json
Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: /user/username/projects/sample1/tests/tsconfig.json
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: /user/username/projects/sample1/tests/tsconfig.json Version: 2 structureChanged: false structureIsReused:: Completely Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Project '/user/username/projects/sample1/tests/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (5)
	/a/lib/lib.d.ts Text-1 "/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }"
	/user/username/projects/sample1/core/index.ts Text-1 "export const someString: string = \"HELLO WORLD\";\r\nexport function leftPad(s: string, n: number) { return s + n; }\r\nexport function multiply(a: number, b: number) { return a * b; }\r\n"
	/user/username/projects/sample1/core/anotherModule.ts Text-1 "export const World = \"hello\";\r\n"
	/user/username/projects/sample1/logic/index.ts Text-2 "import * as c from '../core/index';\r\nexport function getSecondsInDay() {\r\n    return c.multiply(10, 15);\r\n}\r\nimport * as mod from '../core/anotherModule';\r\nexport const m = mod;\r\nfunction foo() {}"
	/user/username/projects/sample1/tests/index.ts SVC-1-0 "import * as c from '../core/index';\r\nimport * as logic from '../logic/index';\r\n\r\nc.leftPad(\"\", 10);\r\nlogic.getSecondsInDay();\r\n\r\nimport * as mod from '../core/anotherModule';\r\nexport const m = mod;\r\n"

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Running: *ensureProjectForOpenFiles*
Info seq  [hh:mm:ss:mss] Before ensureProjectForOpenFiles:
Info seq  [hh:mm:ss:mss] Project '/user/username/projects/sample1/tests/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (5)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: /user/username/projects/sample1/tests/index.ts ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /user/username/projects/sample1/tests/tsconfig.json
Info seq  [hh:mm:ss:mss] After ensureProjectForOpenFiles:
Info seq  [hh:mm:ss:mss] Project '/user/username/projects/sample1/tests/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (5)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: /user/username/projects/sample1/tests/index.ts ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /user/username/projects/sample1/tests/tsconfig.json
After running Timeout callback:: count: 0

Info seq  [hh:mm:ss:mss] FileWatcher:: Triggered with /user/username/projects/sample1/logic/index.ts 1:: WatchInfo: /user/username/projects/sample1/logic/index.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] Scheduled: /user/username/projects/sample1/tests/tsconfig.json
Info seq  [hh:mm:ss:mss] Scheduled: *ensureProjectForOpenFiles*
Info seq  [hh:mm:ss:mss] Elapsed:: *ms FileWatcher:: Triggered with /user/username/projects/sample1/logic/index.ts 1:: WatchInfo: /user/username/projects/sample1/logic/index.ts 500 undefined WatchType: Closed Script info
Before running Timeout callback:: count: 2
3: /user/username/projects/sample1/tests/tsconfig.json
4: *ensureProjectForOpenFiles*
//// [/user/username/projects/sample1/logic/index.ts]
import * as c from '../core/index';
export function getSecondsInDay() {
    return c.multiply(10, 15);
}
import * as mod from '../core/anotherModule';
export const m = mod;
function foo() {}export function gfoo() {}


Info seq  [hh:mm:ss:mss] Running: /user/username/projects/sample1/tests/tsconfig.json
Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: /user/username/projects/sample1/tests/tsconfig.json
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: /user/username/projects/sample1/tests/tsconfig.json Version: 3 structureChanged: false structureIsReused:: Completely Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Project '/user/username/projects/sample1/tests/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (5)
	/a/lib/lib.d.ts Text-1 "/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }"
	/user/username/projects/sample1/core/index.ts Text-1 "export const someString: string = \"HELLO WORLD\";\r\nexport function leftPad(s: string, n: number) { return s + n; }\r\nexport function multiply(a: number, b: number) { return a * b; }\r\n"
	/user/username/projects/sample1/core/anotherModule.ts Text-1 "export const World = \"hello\";\r\n"
	/user/username/projects/sample1/logic/index.ts Text-3 "import * as c from '../core/index';\r\nexport function getSecondsInDay() {\r\n    return c.multiply(10, 15);\r\n}\r\nimport * as mod from '../core/anotherModule';\r\nexport const m = mod;\r\nfunction foo() {}export function gfoo() {}"
	/user/username/projects/sample1/tests/index.ts SVC-1-0 "import * as c from '../core/index';\r\nimport * as logic from '../logic/index';\r\n\r\nc.leftPad(\"\", 10);\r\nlogic.getSecondsInDay();\r\n\r\nimport * as mod from '../core/anotherModule';\r\nexport const m = mod;\r\n"

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Running: *ensureProjectForOpenFiles*
Info seq  [hh:mm:ss:mss] Before ensureProjectForOpenFiles:
Info seq  [hh:mm:ss:mss] Project '/user/username/projects/sample1/tests/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (5)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: /user/username/projects/sample1/tests/index.ts ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /user/username/projects/sample1/tests/tsconfig.json
Info seq  [hh:mm:ss:mss] After ensureProjectForOpenFiles:
Info seq  [hh:mm:ss:mss] Project '/user/username/projects/sample1/tests/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (5)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: /user/username/projects/sample1/tests/index.ts ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /user/username/projects/sample1/tests/tsconfig.json
After running Timeout callback:: count: 0

Info seq  [hh:mm:ss:mss] FileWatcher:: Triggered with /user/username/projects/sample1/logic/tsconfig.json 1:: WatchInfo: /user/username/projects/sample1/logic/tsconfig.json 2000 undefined Project: /user/username/projects/sample1/tests/tsconfig.json WatchType: Config file
Info seq  [hh:mm:ss:mss] Scheduled: /user/username/projects/sample1/tests/tsconfig.json
Info seq  [hh:mm:ss:mss] Scheduled: *ensureProjectForOpenFiles*
Info seq  [hh:mm:ss:mss] Elapsed:: *ms FileWatcher:: Triggered with /user/username/projects/sample1/logic/tsconfig.json 1:: WatchInfo: /user/username/projects/sample1/logic/tsconfig.json 2000 undefined Project: /user/username/projects/sample1/tests/tsconfig.json WatchType: Config file
Before running Timeout callback:: count: 2
5: /user/username/projects/sample1/tests/tsconfig.json
6: *ensureProjectForOpenFiles*
//// [/user/username/projects/sample1/logic/tsconfig.json]
{"compilerOptions":{"composite":true,"declaration":true,"declarationDir":"decls"},"references":[{"path":"../core"}]}


Info seq  [hh:mm:ss:mss] Running: /user/username/projects/sample1/tests/tsconfig.json
Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: /user/username/projects/sample1/tests/tsconfig.json
Info seq  [hh:mm:ss:mss] Config: /user/username/projects/sample1/logic/tsconfig.json : {
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
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: /user/username/projects/sample1/tests/tsconfig.json Version: 4 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Project '/user/username/projects/sample1/tests/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (5)
	/a/lib/lib.d.ts Text-1 "/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }"
	/user/username/projects/sample1/core/index.ts Text-1 "export const someString: string = \"HELLO WORLD\";\r\nexport function leftPad(s: string, n: number) { return s + n; }\r\nexport function multiply(a: number, b: number) { return a * b; }\r\n"
	/user/username/projects/sample1/core/anotherModule.ts Text-1 "export const World = \"hello\";\r\n"
	/user/username/projects/sample1/logic/index.ts Text-3 "import * as c from '../core/index';\r\nexport function getSecondsInDay() {\r\n    return c.multiply(10, 15);\r\n}\r\nimport * as mod from '../core/anotherModule';\r\nexport const m = mod;\r\nfunction foo() {}export function gfoo() {}"
	/user/username/projects/sample1/tests/index.ts SVC-1-0 "import * as c from '../core/index';\r\nimport * as logic from '../logic/index';\r\n\r\nc.leftPad(\"\", 10);\r\nlogic.getSecondsInDay();\r\n\r\nimport * as mod from '../core/anotherModule';\r\nexport const m = mod;\r\n"

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Running: *ensureProjectForOpenFiles*
Info seq  [hh:mm:ss:mss] Before ensureProjectForOpenFiles:
Info seq  [hh:mm:ss:mss] Project '/user/username/projects/sample1/tests/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (5)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: /user/username/projects/sample1/tests/index.ts ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /user/username/projects/sample1/tests/tsconfig.json
Info seq  [hh:mm:ss:mss] After ensureProjectForOpenFiles:
Info seq  [hh:mm:ss:mss] Project '/user/username/projects/sample1/tests/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (5)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: /user/username/projects/sample1/tests/index.ts ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /user/username/projects/sample1/tests/tsconfig.json
After running Timeout callback:: count: 0
