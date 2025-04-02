Info seq  [hh:mm:ss:mss] currentDirectory:: /home/src/Vscode/Projects/bin useCaseSensitiveFileNames:: false
Info seq  [hh:mm:ss:mss] libs Location:: /home/src/tslibs/TS/Lib
Info seq  [hh:mm:ss:mss] globalTypingsCacheLocation:: /home/src/Library/Caches/typescript
Info seq  [hh:mm:ss:mss] Provided types map file "/home/src/tslibs/TS/Lib/typesMap.json" doesn't exist
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
{
  "compilerOptions": {
    "module": "amd",
    "typeRoots": [
      "../lib/@types",
      "../lib/@app"
    ],
    "traceResolution": true
  }
}

//// [/home/src/tslibs/TS/Lib/lib.d.ts]
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
interface ReadonlyArray<T> {}
declare const console: { log(msg: any): void; };


Info seq  [hh:mm:ss:mss] request:
    {
      "command": "open",
      "arguments": {
        "file": "/user/username/projects/myproject/test/test.ts"
      },
      "seq": 1,
      "type": "request"
    }
Info seq  [hh:mm:ss:mss] getConfigFileNameForFile:: File: /user/username/projects/myproject/test/test.ts ProjectRootPath: undefined:: Result: /user/username/projects/myproject/test/tsconfig.json
Info seq  [hh:mm:ss:mss] Creating ConfiguredProject: /user/username/projects/myproject/test/tsconfig.json, currentDirectory: /user/username/projects/myproject/test
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
  "traceResolution": true,
  "configFilePath": "/user/username/projects/myproject/test/tsconfig.json"
 }
}
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "projectLoadingStart",
      "body": {
        "projectName": "/user/username/projects/myproject/test/tsconfig.json",
        "reason": "Creating possible configured project for /user/username/projects/myproject/test/test.ts to open"
      }
    }
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/test 1 undefined Config: /user/username/projects/myproject/test/tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/test 1 undefined Config: /user/username/projects/myproject/test/tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: /user/username/projects/myproject/test/tsconfig.json
Info seq  [hh:mm:ss:mss] ======== Resolving type reference directive 'UpperCasePackage', containing file '/user/username/projects/myproject/test/__inferred type names__.ts', root directory '/user/username/projects/myproject/lib/@types,/user/username/projects/myproject/lib/@app'. ========
Info seq  [hh:mm:ss:mss] Resolving with primary search path '/user/username/projects/myproject/lib/@types, /user/username/projects/myproject/lib/@app'.
Info seq  [hh:mm:ss:mss] File '/user/username/projects/myproject/lib/@types/UpperCasePackage.d.ts' does not exist.
Info seq  [hh:mm:ss:mss] File '/user/username/projects/myproject/lib/@types/UpperCasePackage/package.json' does not exist.
Info seq  [hh:mm:ss:mss] File '/user/username/projects/myproject/lib/@types/UpperCasePackage/index.d.ts' exists - use it as a name resolution result.
Info seq  [hh:mm:ss:mss] Resolving real path for '/user/username/projects/myproject/lib/@types/UpperCasePackage/index.d.ts', result '/user/username/projects/myproject/lib/@types/UpperCasePackage/index.d.ts'.
Info seq  [hh:mm:ss:mss] ======== Type reference directive 'UpperCasePackage' was successfully resolved to '/user/username/projects/myproject/lib/@types/UpperCasePackage/index.d.ts', primary: true. ========
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/lib 1 undefined Project: /user/username/projects/myproject/test/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/lib 1 undefined Project: /user/username/projects/myproject/test/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] ======== Resolving type reference directive 'lib', containing file '/user/username/projects/myproject/test/__inferred type names__.ts', root directory '/user/username/projects/myproject/lib/@types,/user/username/projects/myproject/lib/@app'. ========
Info seq  [hh:mm:ss:mss] Resolving with primary search path '/user/username/projects/myproject/lib/@types, /user/username/projects/myproject/lib/@app'.
Info seq  [hh:mm:ss:mss] File '/user/username/projects/myproject/lib/@types/lib.d.ts' does not exist.
Info seq  [hh:mm:ss:mss] File '/user/username/projects/myproject/lib/@app/lib.d.ts' does not exist.
Info seq  [hh:mm:ss:mss] File '/user/username/projects/myproject/lib/@app/lib/package.json' does not exist.
Info seq  [hh:mm:ss:mss] File '/user/username/projects/myproject/lib/@app/lib/index.d.ts' exists - use it as a name resolution result.
Info seq  [hh:mm:ss:mss] Resolving real path for '/user/username/projects/myproject/lib/@app/lib/index.d.ts', result '/user/username/projects/myproject/lib/@app/lib/index.d.ts'.
Info seq  [hh:mm:ss:mss] ======== Type reference directive 'lib' was successfully resolved to '/user/username/projects/myproject/lib/@app/lib/index.d.ts', primary: true. ========
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/lib/@types/UpperCasePackage/index.d.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/lib/@app/lib/index.d.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] ======== Resolving type reference directive 'UpperCasePackage', containing file '/user/username/projects/myproject/lib/@app/lib/index.d.ts', root directory '/user/username/projects/myproject/lib/@types,/user/username/projects/myproject/lib/@app'. ========
Info seq  [hh:mm:ss:mss] Resolving with primary search path '/user/username/projects/myproject/lib/@types, /user/username/projects/myproject/lib/@app'.
Info seq  [hh:mm:ss:mss] File '/user/username/projects/myproject/lib/@types/UpperCasePackage.d.ts' does not exist.
Info seq  [hh:mm:ss:mss] File '/user/username/projects/myproject/lib/@types/UpperCasePackage/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/user/username/projects/myproject/lib/@types/UpperCasePackage/index.d.ts' exists - use it as a name resolution result.
Info seq  [hh:mm:ss:mss] Resolving real path for '/user/username/projects/myproject/lib/@types/UpperCasePackage/index.d.ts', result '/user/username/projects/myproject/lib/@types/UpperCasePackage/index.d.ts'.
Info seq  [hh:mm:ss:mss] ======== Type reference directive 'UpperCasePackage' was successfully resolved to '/user/username/projects/myproject/lib/@types/UpperCasePackage/index.d.ts', primary: true. ========
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/tslibs/TS/Lib/lib.d.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/lib/@types 1 undefined Project: /user/username/projects/myproject/test/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/lib/@types 1 undefined Project: /user/username/projects/myproject/test/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/lib/@app 1 undefined Project: /user/username/projects/myproject/test/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/lib/@app 1 undefined Project: /user/username/projects/myproject/test/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: /user/username/projects/myproject/test/tsconfig.json projectStateVersion: 1 projectProgramVersion: 0 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Project '/user/username/projects/myproject/test/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (4)
	/home/src/tslibs/TS/Lib/lib.d.ts Text-1 "/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };"
	/user/username/projects/myproject/test/test.ts SVC-1-0 "class TestClass1 {\n\n    constructor() {\n        var l = new TestLib();\n\n    }\n\n    public test2() {\n        var x = new BrokenTest('',0,0,null);\n\n    }\n}"
	/user/username/projects/myproject/lib/@types/UpperCasePackage/index.d.ts Text-1 "declare class BrokenTest {\n    constructor(name: string, width: number, height: number, onSelect: Function);\n    Name: string;\n    SelectedFile: string;\n}"
	/user/username/projects/myproject/lib/@app/lib/index.d.ts Text-1 "/// <reference types=\"UpperCasePackage\" />\ndeclare class TestLib {\n    issue: BrokenTest;\n    constructor();\n    test(): void;\n}"


	../../../../../home/src/tslibs/TS/Lib/lib.d.ts
	  Default library for target 'es5'
	test.ts
	  Matched by default include pattern '**/*'
	../lib/@types/UpperCasePackage/index.d.ts
	  Entry point for implicit type library 'UpperCasePackage'
	  Type library referenced via 'UpperCasePackage' from file '../lib/@app/lib/index.d.ts'
	../lib/@app/lib/index.d.ts
	  Entry point for implicit type library 'lib'

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "projectLoadingFinish",
      "body": {
        "projectName": "/user/username/projects/myproject/test/tsconfig.json"
      }
    }
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "telemetry",
      "body": {
        "telemetryEventName": "projectInfo",
        "payload": {
          "projectId": "912f29d323a58e00919cbeb836d6f90023f51c45d77161ec3ff25c6eb85adae1",
          "fileStats": {
            "js": 0,
            "jsSize": 0,
            "jsx": 0,
            "jsxSize": 0,
            "ts": 1,
            "tsSize": 153,
            "tsx": 0,
            "tsxSize": 0,
            "dts": 3,
            "dtsSize": 695,
            "deferred": 0,
            "deferredSize": 0
          },
          "compilerOptions": {
            "module": "amd",
            "typeRoots": [
              "",
              ""
            ],
            "traceResolution": true
          },
          "typeAcquisition": {
            "enable": false,
            "include": false,
            "exclude": false
          },
          "extends": false,
          "files": false,
          "include": false,
          "exclude": false,
          "compileOnSave": false,
          "configFileName": "tsconfig.json",
          "projectType": "configured",
          "languageServiceEnabled": true,
          "version": "FakeVersion"
        }
      }
    }
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "configFileDiag",
      "body": {
        "triggerFile": "/user/username/projects/myproject/test/test.ts",
        "configFile": "/user/username/projects/myproject/test/tsconfig.json",
        "diagnostics": []
      }
    }
Info seq  [hh:mm:ss:mss] Project '/user/username/projects/myproject/test/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (4)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: /user/username/projects/myproject/test/test.ts ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /user/username/projects/myproject/test/tsconfig.json
Info seq  [hh:mm:ss:mss] response:
    {
      "seq": 0,
      "type": "response",
      "command": "open",
      "request_seq": 1,
      "success": true,
      "performanceData": {
        "updateGraphDurationMs": *
      }
    }
After request

FsWatches::
/home/src/tslibs/TS/Lib/lib.d.ts: *new*
  {}
/user/username/projects/myproject/lib/@app/lib/index.d.ts: *new*
  {}
/user/username/projects/myproject/lib/@types/UpperCasePackage/index.d.ts: *new*
  {}
/user/username/projects/myproject/test/tsconfig.json: *new*
  {}

FsWatchesRecursive::
/user/username/projects/myproject/lib: *new*
  {}
/user/username/projects/myproject/lib/@app: *new*
  {}
/user/username/projects/myproject/lib/@types: *new*
  {}
/user/username/projects/myproject/test: *new*
  {}

Projects::
/user/username/projects/myproject/test/tsconfig.json (Configured) *new*
    projectStateVersion: 1
    projectProgramVersion: 1
    autoImportProviderHost: false

ScriptInfos::
/home/src/tslibs/TS/Lib/lib.d.ts *new*
    version: Text-1
    containingProjects: 1
        /user/username/projects/myproject/test/tsconfig.json
/user/username/projects/myproject/lib/@app/lib/index.d.ts *new*
    version: Text-1
    containingProjects: 1
        /user/username/projects/myproject/test/tsconfig.json
/user/username/projects/myproject/lib/@types/UpperCasePackage/index.d.ts *new*
    version: Text-1
    containingProjects: 1
        /user/username/projects/myproject/test/tsconfig.json
/user/username/projects/myproject/test/test.ts (Open) *new*
    version: SVC-1-0
    containingProjects: 1
        /user/username/projects/myproject/test/tsconfig.json *default*

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


Timeout callback:: count: 2
1: /user/username/projects/myproject/test/tsconfig.json *new*
2: *ensureProjectForOpenFiles* *new*

Projects::
/user/username/projects/myproject/test/tsconfig.json (Configured) *changed*
    projectStateVersion: 2 *changed*
    projectProgramVersion: 1
    dirty: true *changed*
    autoImportProviderHost: false

ScriptInfos::
/home/src/tslibs/TS/Lib/lib.d.ts
    version: Text-1
    containingProjects: 1
        /user/username/projects/myproject/test/tsconfig.json
/user/username/projects/myproject/lib/@app/lib/index.d.ts *changed*
    version: Text-1
    pendingReloadFromDisk: true *changed*
    containingProjects: 1
        /user/username/projects/myproject/test/tsconfig.json
/user/username/projects/myproject/lib/@types/UpperCasePackage/index.d.ts
    version: Text-1
    containingProjects: 1
        /user/username/projects/myproject/test/tsconfig.json
/user/username/projects/myproject/test/test.ts (Open)
    version: SVC-1-0
    containingProjects: 1
        /user/username/projects/myproject/test/tsconfig.json *default*

Info seq  [hh:mm:ss:mss] Running: /user/username/projects/myproject/test/tsconfig.json
Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: /user/username/projects/myproject/test/tsconfig.json
Info seq  [hh:mm:ss:mss] Reusing resolution of type reference directive 'UpperCasePackage' from '/user/username/projects/myproject/lib/@app/lib/index.d.ts' of old program, it was successfully resolved to '/user/username/projects/myproject/lib/@types/UpperCasePackage/index.d.ts'.
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: /user/username/projects/myproject/test/tsconfig.json projectStateVersion: 2 projectProgramVersion: 1 structureChanged: false structureIsReused:: Completely Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Project '/user/username/projects/myproject/test/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (4)
	/home/src/tslibs/TS/Lib/lib.d.ts Text-1 "/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };"
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
Info seq  [hh:mm:ss:mss] got projects updated in background /user/username/projects/myproject/test/test.ts
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "projectsUpdatedInBackground",
      "body": {
        "openFiles": [
          "/user/username/projects/myproject/test/test.ts"
        ]
      }
    }
After running Timeout callback:: count: 0

Projects::
/user/username/projects/myproject/test/tsconfig.json (Configured) *changed*
    projectStateVersion: 2
    projectProgramVersion: 1
    dirty: false *changed*
    autoImportProviderHost: false

ScriptInfos::
/home/src/tslibs/TS/Lib/lib.d.ts
    version: Text-1
    containingProjects: 1
        /user/username/projects/myproject/test/tsconfig.json
/user/username/projects/myproject/lib/@app/lib/index.d.ts *changed*
    version: Text-2 *changed*
    pendingReloadFromDisk: false *changed*
    containingProjects: 1
        /user/username/projects/myproject/test/tsconfig.json
/user/username/projects/myproject/lib/@types/UpperCasePackage/index.d.ts
    version: Text-1
    containingProjects: 1
        /user/username/projects/myproject/test/tsconfig.json
/user/username/projects/myproject/test/test.ts (Open)
    version: SVC-1-0
    containingProjects: 1
        /user/username/projects/myproject/test/tsconfig.json *default*
