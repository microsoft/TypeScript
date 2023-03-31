currentDirectory:: / useCaseSensitiveFileNames: false
Info 0    [00:00:37.000] Provided types map file "/a/lib/typesMap.json" doesn't exist
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


Info 1    [00:00:38.000] request:
    {
      "command": "open",
      "arguments": {
        "file": "/user/username/projects/myproject/test/test.ts"
      },
      "seq": 1,
      "type": "request"
    }
Info 2    [00:00:39.000] Search path: /user/username/projects/myproject/test
Info 3    [00:00:40.000] For info: /user/username/projects/myproject/test/test.ts :: Config file name: /user/username/projects/myproject/test/tsconfig.json
Info 4    [00:00:41.000] Creating configuration project /user/username/projects/myproject/test/tsconfig.json
Info 5    [00:00:42.000] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/test/tsconfig.json 2000 undefined Project: /user/username/projects/myproject/test/tsconfig.json WatchType: Config file
Info 6    [00:00:43.000] Config: /user/username/projects/myproject/test/tsconfig.json : {
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
Info 7    [00:00:44.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/test 1 undefined Config: /user/username/projects/myproject/test/tsconfig.json WatchType: Wild card directory
Info 8    [00:00:45.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/test 1 undefined Config: /user/username/projects/myproject/test/tsconfig.json WatchType: Wild card directory
Info 9    [00:00:46.000] Starting updateGraphWorker: Project: /user/username/projects/myproject/test/tsconfig.json
Info 10   [00:00:47.000] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/lib/@types/UpperCasePackage/index.d.ts 500 undefined WatchType: Closed Script info
Info 11   [00:00:48.000] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/lib/@app/lib/index.d.ts 500 undefined WatchType: Closed Script info
Info 12   [00:00:49.000] FileWatcher:: Added:: WatchInfo: /a/lib/lib.d.ts 500 undefined WatchType: Closed Script info
Info 13   [00:00:50.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/lib 1 undefined Project: /user/username/projects/myproject/test/tsconfig.json WatchType: Failed Lookup Locations
Info 14   [00:00:51.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/lib 1 undefined Project: /user/username/projects/myproject/test/tsconfig.json WatchType: Failed Lookup Locations
Info 15   [00:00:52.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/lib/@types 1 undefined Project: /user/username/projects/myproject/test/tsconfig.json WatchType: Type roots
Info 16   [00:00:53.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/lib/@types 1 undefined Project: /user/username/projects/myproject/test/tsconfig.json WatchType: Type roots
Info 17   [00:00:54.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/lib/@app 1 undefined Project: /user/username/projects/myproject/test/tsconfig.json WatchType: Type roots
Info 18   [00:00:55.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/lib/@app 1 undefined Project: /user/username/projects/myproject/test/tsconfig.json WatchType: Type roots
Info 19   [00:00:56.000] Finishing updateGraphWorker: Project: /user/username/projects/myproject/test/tsconfig.json Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 20   [00:00:57.000] Project '/user/username/projects/myproject/test/tsconfig.json' (Configured)
Info 21   [00:00:58.000] 	Files (4)
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

Info 22   [00:00:59.000] -----------------------------------------------
Info 23   [00:01:00.000] Project '/user/username/projects/myproject/test/tsconfig.json' (Configured)
Info 23   [00:01:01.000] 	Files (4)

Info 23   [00:01:02.000] -----------------------------------------------
Info 23   [00:01:03.000] Open files: 
Info 23   [00:01:04.000] 	FileName: /user/username/projects/myproject/test/test.ts ProjectRootPath: undefined
Info 23   [00:01:05.000] 		Projects: /user/username/projects/myproject/test/tsconfig.json
Info 23   [00:01:06.000] response:
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

Info 24   [00:01:10.000] FileWatcher:: Triggered with /user/username/projects/myproject/lib/@app/lib/index.d.ts 1:: WatchInfo: /user/username/projects/myproject/lib/@app/lib/index.d.ts 500 undefined WatchType: Closed Script info
Info 25   [00:01:11.000] Scheduled: /user/username/projects/myproject/test/tsconfig.json
Info 26   [00:01:12.000] Scheduled: *ensureProjectForOpenFiles*
Info 27   [00:01:13.000] Elapsed:: *ms FileWatcher:: Triggered with /user/username/projects/myproject/lib/@app/lib/index.d.ts 1:: WatchInfo: /user/username/projects/myproject/lib/@app/lib/index.d.ts 500 undefined WatchType: Closed Script info
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


Info 28   [00:01:14.000] Running: /user/username/projects/myproject/test/tsconfig.json
Info 29   [00:01:15.000] Starting updateGraphWorker: Project: /user/username/projects/myproject/test/tsconfig.json
Info 30   [00:01:16.000] Finishing updateGraphWorker: Project: /user/username/projects/myproject/test/tsconfig.json Version: 2 structureChanged: false structureIsReused:: Completely Elapsed:: *ms
Info 31   [00:01:17.000] Project '/user/username/projects/myproject/test/tsconfig.json' (Configured)
Info 32   [00:01:18.000] 	Files (4)
	/a/lib/lib.d.ts Text-1 "/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }"
	/user/username/projects/myproject/test/test.ts SVC-1-0 "class TestClass1 {\n\n    constructor() {\n        var l = new TestLib();\n\n    }\n\n    public test2() {\n        var x = new BrokenTest('',0,0,null);\n\n    }\n}"
	/user/username/projects/myproject/lib/@types/UpperCasePackage/index.d.ts Text-1 "declare class BrokenTest {\n    constructor(name: string, width: number, height: number, onSelect: Function);\n    Name: string;\n    SelectedFile: string;\n}"
	/user/username/projects/myproject/lib/@app/lib/index.d.ts Text-2 "/// <reference types=\"UpperCasePackage\" />\ndeclare class TestLib {\n    issue: BrokenTest;\n    constructor();\n    test2(): void;\n}"

Info 33   [00:01:19.000] -----------------------------------------------
Info 34   [00:01:20.000] Running: *ensureProjectForOpenFiles*
Info 35   [00:01:21.000] Before ensureProjectForOpenFiles:
Info 36   [00:01:22.000] Project '/user/username/projects/myproject/test/tsconfig.json' (Configured)
Info 36   [00:01:23.000] 	Files (4)

Info 36   [00:01:24.000] -----------------------------------------------
Info 36   [00:01:25.000] Open files: 
Info 36   [00:01:26.000] 	FileName: /user/username/projects/myproject/test/test.ts ProjectRootPath: undefined
Info 36   [00:01:27.000] 		Projects: /user/username/projects/myproject/test/tsconfig.json
Info 36   [00:01:28.000] After ensureProjectForOpenFiles:
Info 37   [00:01:29.000] Project '/user/username/projects/myproject/test/tsconfig.json' (Configured)
Info 37   [00:01:30.000] 	Files (4)

Info 37   [00:01:31.000] -----------------------------------------------
Info 37   [00:01:32.000] Open files: 
Info 37   [00:01:33.000] 	FileName: /user/username/projects/myproject/test/test.ts ProjectRootPath: undefined
Info 37   [00:01:34.000] 		Projects: /user/username/projects/myproject/test/tsconfig.json
After running Timeout callback:: count: 0
