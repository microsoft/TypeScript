currentDirectory:: / useCaseSensitiveFileNames: false
Info seq  [hh:mm:ss:mss] Provided types map file "/a/lib/typesMap.json" doesn't exist
Before request
//// [/user/username/projects/myproject/lib/@types/UpperCasePackage/index.d.ts]
declare class BrokenTest {
    constructor(name: string, width: number, height: number, onSelect: Function);
    Name: string;
    SelectedFile: string;
}

//// [/user/username/projects/myproject/lib/@app/lib/index.d.ts]
/// <reference types="UpperCasePackage" />
declare class TestLib {
    issue: BrokenTest;
    constructor();
    test(): void;
}

//// [/user/username/projects/myproject/test/test.ts]
class TestClass1 {

    constructor() {
        var l = new TestLib();

    }

    public test2() {
        var x = new BrokenTest('',0,0,null);

    }
}

//// [/user/username/projects/myproject/test/tsconfig.json]
{"compilerOptions":{"module":"amd","typeRoots":["../lib/@types","../lib/@app"]}}

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


Info seq  [hh:mm:ss:mss] request:
    {
      "command": "open",
      "arguments": {
        "file": "/user/username/projects/myproject/test/test.ts"
      },
      "seq": 1,
      "type": "request"
    }
Info seq  [hh:mm:ss:mss] Search path: /user/username/projects/myproject/test
Info seq  [hh:mm:ss:mss] For info: /user/username/projects/myproject/test/test.ts :: Config file name: /user/username/projects/myproject/test/tsconfig.json
Info seq  [hh:mm:ss:mss] Creating configuration project /user/username/projects/myproject/test/tsconfig.json
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/test/tsconfig.json 2000 undefined Project: /user/username/projects/myproject/test/tsconfig.json WatchType: Config file
Info seq  [hh:mm:ss:mss] Config: /user/username/projects/myproject/test/tsconfig.json : {
 "rootNames": [
  "/user/username/projects/myproject/test/test.ts"
 ],
 "options": {
  "module": 2,
  "typeRoots": [
   "/user/username/projects/myproject/lib/@types",
   "/user/username/projects/myproject/lib/@app"
  ],
  "configFilePath": "/user/username/projects/myproject/test/tsconfig.json"
 }
}
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/test 1 undefined Config: /user/username/projects/myproject/test/tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/test 1 undefined Config: /user/username/projects/myproject/test/tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: /user/username/projects/myproject/test/tsconfig.json
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/lib 1 undefined Project: /user/username/projects/myproject/test/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/lib 1 undefined Project: /user/username/projects/myproject/test/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/lib/@types/UpperCasePackage/index.d.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/lib/@app/lib/index.d.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /a/lib/lib.d.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/lib/@types 1 undefined Project: /user/username/projects/myproject/test/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/lib/@types 1 undefined Project: /user/username/projects/myproject/test/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/lib/@app 1 undefined Project: /user/username/projects/myproject/test/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/lib/@app 1 undefined Project: /user/username/projects/myproject/test/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: /user/username/projects/myproject/test/tsconfig.json Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Project '/user/username/projects/myproject/test/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (4)
	/a/lib/lib.d.ts Text-1 "/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }"
	/user/username/projects/myproject/test/test.ts SVC-1-0 "class TestClass1 {\n\n    constructor() {\n        var l = new TestLib();\n\n    }\n\n    public test2() {\n        var x = new BrokenTest('',0,0,null);\n\n    }\n}"
	/user/username/projects/myproject/lib/@types/UpperCasePackage/index.d.ts Text-1 "declare class BrokenTest {\n    constructor(name: string, width: number, height: number, onSelect: Function);\n    Name: string;\n    SelectedFile: string;\n}"
	/user/username/projects/myproject/lib/@app/lib/index.d.ts Text-1 "/// <reference types=\"UpperCasePackage\" />\ndeclare class TestLib {\n    issue: BrokenTest;\n    constructor();\n    test(): void;\n}"


	../../../../../a/lib/lib.d.ts
	  Default library for target 'es5'
	test.ts
	  Matched by default include pattern '**/*'
	../lib/@types/UpperCasePackage/index.d.ts
	  Entry point for implicit type library 'UpperCasePackage'
	  Type library referenced via 'UpperCasePackage' from file '../lib/@app/lib/index.d.ts'
	../lib/@app/lib/index.d.ts
	  Entry point for implicit type library 'lib'

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Project '/user/username/projects/myproject/test/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (4)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: /user/username/projects/myproject/test/test.ts ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /user/username/projects/myproject/test/tsconfig.json
Info seq  [hh:mm:ss:mss] response:
    {
      "responseRequired": false
    }
After request

FsWatches::
/user/username/projects/myproject/test/tsconfig.json: *new*
  {}
/user/username/projects/myproject/lib/@types/uppercasepackage/index.d.ts: *new*
  {}
/user/username/projects/myproject/lib/@app/lib/index.d.ts: *new*
  {}
/a/lib/lib.d.ts: *new*
  {}

FsWatchesRecursive::
/user/username/projects/myproject/test: *new*
  {}
/user/username/projects/myproject/lib: *new*
  {}
/user/username/projects/myproject/lib/@types: *new*
  {}
/user/username/projects/myproject/lib/@app: *new*
  {}

Info seq  [hh:mm:ss:mss] FileWatcher:: Triggered with /user/username/projects/myproject/lib/@app/lib/index.d.ts 1:: WatchInfo: /user/username/projects/myproject/lib/@app/lib/index.d.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] Scheduled: /user/username/projects/myproject/test/tsconfig.json
Info seq  [hh:mm:ss:mss] Scheduled: *ensureProjectForOpenFiles*
Info seq  [hh:mm:ss:mss] Elapsed:: *ms FileWatcher:: Triggered with /user/username/projects/myproject/lib/@app/lib/index.d.ts 1:: WatchInfo: /user/username/projects/myproject/lib/@app/lib/index.d.ts 500 undefined WatchType: Closed Script info
Before running Timeout callback:: count: 2
1: /user/username/projects/myproject/test/tsconfig.json
2: *ensureProjectForOpenFiles*
//// [/user/username/projects/myproject/lib/@app/lib/index.d.ts]
/// <reference types="UpperCasePackage" />
declare class TestLib {
    issue: BrokenTest;
    constructor();
    test2(): void;
}


Info seq  [hh:mm:ss:mss] Running: /user/username/projects/myproject/test/tsconfig.json
Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: /user/username/projects/myproject/test/tsconfig.json
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: /user/username/projects/myproject/test/tsconfig.json Version: 2 structureChanged: false structureIsReused:: Completely Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Project '/user/username/projects/myproject/test/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (4)
	/a/lib/lib.d.ts Text-1 "/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }"
	/user/username/projects/myproject/test/test.ts SVC-1-0 "class TestClass1 {\n\n    constructor() {\n        var l = new TestLib();\n\n    }\n\n    public test2() {\n        var x = new BrokenTest('',0,0,null);\n\n    }\n}"
	/user/username/projects/myproject/lib/@types/UpperCasePackage/index.d.ts Text-1 "declare class BrokenTest {\n    constructor(name: string, width: number, height: number, onSelect: Function);\n    Name: string;\n    SelectedFile: string;\n}"
	/user/username/projects/myproject/lib/@app/lib/index.d.ts Text-2 "/// <reference types=\"UpperCasePackage\" />\ndeclare class TestLib {\n    issue: BrokenTest;\n    constructor();\n    test2(): void;\n}"

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Running: *ensureProjectForOpenFiles*
Info seq  [hh:mm:ss:mss] Before ensureProjectForOpenFiles:
Info seq  [hh:mm:ss:mss] Project '/user/username/projects/myproject/test/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (4)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: /user/username/projects/myproject/test/test.ts ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /user/username/projects/myproject/test/tsconfig.json
Info seq  [hh:mm:ss:mss] After ensureProjectForOpenFiles:
Info seq  [hh:mm:ss:mss] Project '/user/username/projects/myproject/test/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (4)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: /user/username/projects/myproject/test/test.ts ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /user/username/projects/myproject/test/tsconfig.json
After running Timeout callback:: count: 0
