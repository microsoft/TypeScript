Info seq  [hh:mm:ss:mss] currentDirectory:: /home/src/Vscode/Projects/bin useCaseSensitiveFileNames:: false
Info seq  [hh:mm:ss:mss] libs Location:: /home/src/tslibs/TS/Lib
Info seq  [hh:mm:ss:mss] globalTypingsCacheLocation:: /home/src/Library/Caches/typescript
Info seq  [hh:mm:ss:mss] Provided types map file "/home/src/tslibs/TS/Lib/typesMap.json" doesn't exist
//// [/home/src/tslibs/TS/Lib/lib.d.ts]
lib.d.ts-Text

//// [/home/src/tslibs/TS/Lib/lib.decorators.d.ts]
lib.decorators.d.ts-Text

//// [/home/src/tslibs/TS/Lib/lib.decorators.legacy.d.ts]
lib.decorators.legacy.d.ts-Text

//// [/tests/cases/fourslash/server/BaseClass/Source.d.ts]
declare class Control {
    constructor();
    /** this is a super var */
    myVar: boolean | 'yeah';
}
//# sourceMappingURL=Source.d.ts.map

//// [/tests/cases/fourslash/server/BaseClass/Source.d.ts.map]
{"version":3,"file":"Source.d.ts","sourceRoot":"","sources":["Source.ts"],"names":[],"mappings":"AAAA,cAAM,OAAO;;IAIT,0BAA0B;IACnB,KAAK,EAAE,OAAO,GAAG,MAAM,CAAQ;CACzC"}

//// [/tests/cases/fourslash/server/BaseClass/Source.ts]
class Control{
    constructor(){
        return;
    }
    /** this is a super var */
    public myVar: boolean | 'yeah' = true;
}

//// [/tests/cases/fourslash/server/buttonClass/Source.ts]
// I cannot F12 navigate to Control
//                   vvvvvvv
class Button extends Control {
    public myFunction() {
        // I cannot F12 navigate to myVar
        //              vvvvv
        if (typeof this.myVar === 'boolean') {
            this.myVar;
        } else {
            this.myVar.toLocaleUpperCase();
        }
    }
}

//// [/tests/cases/fourslash/server/buttonClass/tsconfig.json]
{
    "extends": "../tsbase.json",
    "compilerOptions": {
      "outFile": "Source.js"
    },
    "files": [
      "Source.ts"
    ],
    "include": [
      "../BaseClass/Source.d.ts"
    ]
  }

//// [/tests/cases/fourslash/server/tsbase.json]
{
    "$schema": "http://json.schemastore.org/tsconfig",
    "compileOnSave": true,
    "compilerOptions": {
      "sourceMap": true,
      "declaration": true,
      "declarationMap": true
    }
  }


Info seq  [hh:mm:ss:mss] request:
    {
      "seq": 0,
      "type": "request",
      "arguments": {
        "file": "/tests/cases/fourslash/server/BaseClass/Source.d.ts"
      },
      "command": "open"
    }
Info seq  [hh:mm:ss:mss] getConfigFileNameForFile:: File: /tests/cases/fourslash/server/BaseClass/Source.d.ts ProjectRootPath: undefined:: Result: undefined
Info seq  [hh:mm:ss:mss] Creating InferredProject: /dev/null/inferredProject1*, currentDirectory: /tests/cases/fourslash/server/BaseClass
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /tests/cases/fourslash/server/BaseClass/tsconfig.json 2000 undefined WatchType: Config file for the inferred project root
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /tests/cases/fourslash/server/BaseClass/jsconfig.json 2000 undefined WatchType: Config file for the inferred project root
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /tests/cases/fourslash/server/tsconfig.json 2000 undefined WatchType: Config file for the inferred project root
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /tests/cases/fourslash/server/jsconfig.json 2000 undefined WatchType: Config file for the inferred project root
Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: /dev/null/inferredProject1*
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/tslibs/TS/Lib/lib.d.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /tests/cases/fourslash/server/BaseClass/node_modules 1 undefined Project: /dev/null/inferredProject1* WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /tests/cases/fourslash/server/BaseClass/node_modules 1 undefined Project: /dev/null/inferredProject1* WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /tests/cases/fourslash/server/node_modules 1 undefined Project: /dev/null/inferredProject1* WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /tests/cases/fourslash/server/node_modules 1 undefined Project: /dev/null/inferredProject1* WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /tests/cases/fourslash/node_modules 1 undefined Project: /dev/null/inferredProject1* WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /tests/cases/fourslash/node_modules 1 undefined Project: /dev/null/inferredProject1* WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/tslibs/TS/Lib/lib.decorators.d.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/tslibs/TS/Lib/lib.decorators.legacy.d.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /tests/cases/fourslash/server/BaseClass/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /tests/cases/fourslash/server/BaseClass/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /tests/cases/fourslash/server/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /tests/cases/fourslash/server/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /tests/cases/fourslash/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /tests/cases/fourslash/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: /dev/null/inferredProject1* projectStateVersion: 1 projectProgramVersion: 0 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Project '/dev/null/inferredProject1*' (Inferred)
Info seq  [hh:mm:ss:mss] 	Files (4)
	/home/src/tslibs/TS/Lib/lib.d.ts Text-1 lib.d.ts-Text
	/home/src/tslibs/TS/Lib/lib.decorators.d.ts Text-1 lib.decorators.d.ts-Text
	/home/src/tslibs/TS/Lib/lib.decorators.legacy.d.ts Text-1 lib.decorators.legacy.d.ts-Text
	/tests/cases/fourslash/server/BaseClass/Source.d.ts SVC-1-0 "declare class Control {\n    constructor();\n    /** this is a super var */\n    myVar: boolean | 'yeah';\n}\n//# sourceMappingURL=Source.d.ts.map"


	../../../../../home/src/tslibs/TS/Lib/lib.d.ts
	  Default library for target 'es5'
	../../../../../home/src/tslibs/TS/Lib/lib.decorators.d.ts
	  Library referenced via 'decorators' from file '../../../../../home/src/tslibs/TS/Lib/lib.d.ts'
	../../../../../home/src/tslibs/TS/Lib/lib.decorators.legacy.d.ts
	  Library referenced via 'decorators.legacy' from file '../../../../../home/src/tslibs/TS/Lib/lib.d.ts'
	Source.d.ts
	  Root file specified for compilation

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Project '/dev/null/inferredProject1*' (Inferred)
Info seq  [hh:mm:ss:mss] 	Files (4)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: /tests/cases/fourslash/server/BaseClass/Source.d.ts ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /dev/null/inferredProject1*
Info seq  [hh:mm:ss:mss] response:
    {
      "seq": 0,
      "type": "response",
      "command": "open",
      "request_seq": 0,
      "success": true,
      "performanceData": {
        "updateGraphDurationMs": *
      }
    }
After Request
watchedFiles::
/home/src/tslibs/TS/Lib/lib.d.ts: *new*
  {"pollingInterval":500}
/home/src/tslibs/TS/Lib/lib.decorators.d.ts: *new*
  {"pollingInterval":500}
/home/src/tslibs/TS/Lib/lib.decorators.legacy.d.ts: *new*
  {"pollingInterval":500}
/tests/cases/fourslash/server/BaseClass/jsconfig.json: *new*
  {"pollingInterval":2000}
/tests/cases/fourslash/server/BaseClass/tsconfig.json: *new*
  {"pollingInterval":2000}
/tests/cases/fourslash/server/jsconfig.json: *new*
  {"pollingInterval":2000}
/tests/cases/fourslash/server/tsconfig.json: *new*
  {"pollingInterval":2000}

watchedDirectoriesRecursive::
/tests/cases/fourslash/node_modules: *new*
  {}
/tests/cases/fourslash/node_modules/@types: *new*
  {}
/tests/cases/fourslash/server/BaseClass/node_modules: *new*
  {}
/tests/cases/fourslash/server/BaseClass/node_modules/@types: *new*
  {}
/tests/cases/fourslash/server/node_modules: *new*
  {}
/tests/cases/fourslash/server/node_modules/@types: *new*
  {}

Projects::
/dev/null/inferredProject1* (Inferred) *new*
    projectStateVersion: 1
    projectProgramVersion: 1
    autoImportProviderHost: false

ScriptInfos::
/home/src/tslibs/TS/Lib/lib.d.ts *new*
    version: Text-1
    containingProjects: 1
        /dev/null/inferredProject1*
/home/src/tslibs/TS/Lib/lib.decorators.d.ts *new*
    version: Text-1
    containingProjects: 1
        /dev/null/inferredProject1*
/home/src/tslibs/TS/Lib/lib.decorators.legacy.d.ts *new*
    version: Text-1
    containingProjects: 1
        /dev/null/inferredProject1*
/tests/cases/fourslash/server/BaseClass/Source.d.ts (Open) *new*
    version: SVC-1-0
    containingProjects: 1
        /dev/null/inferredProject1* *default*

Info seq  [hh:mm:ss:mss] request:
    {
      "seq": 1,
      "type": "request",
      "arguments": {
        "file": "/tests/cases/fourslash/server/buttonClass/Source.ts"
      },
      "command": "open"
    }
Info seq  [hh:mm:ss:mss] getConfigFileNameForFile:: File: /tests/cases/fourslash/server/buttonClass/Source.ts ProjectRootPath: undefined:: Result: /tests/cases/fourslash/server/buttonClass/tsconfig.json
Info seq  [hh:mm:ss:mss] Creating ConfiguredProject: /tests/cases/fourslash/server/buttonClass/tsconfig.json, currentDirectory: /tests/cases/fourslash/server/buttonClass
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /tests/cases/fourslash/server/buttonClass/tsconfig.json 2000 undefined Project: /tests/cases/fourslash/server/buttonClass/tsconfig.json WatchType: Config file
Info seq  [hh:mm:ss:mss] Config: /tests/cases/fourslash/server/buttonClass/tsconfig.json : {
 "rootNames": [
  "/tests/cases/fourslash/server/buttonClass/Source.ts",
  "/tests/cases/fourslash/server/BaseClass/Source.d.ts"
 ],
 "options": {
  "sourceMap": true,
  "declaration": true,
  "declarationMap": true,
  "outFile": "/tests/cases/fourslash/server/buttonClass/Source.js",
  "configFilePath": "/tests/cases/fourslash/server/buttonClass/tsconfig.json"
 }
}
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /tests/cases/fourslash/server/tsbase.json 2000 undefined Config: /tests/cases/fourslash/server/buttonClass/tsconfig.json WatchType: Extended config file
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "projectLoadingStart",
      "body": {
        "projectName": "/tests/cases/fourslash/server/buttonClass/tsconfig.json",
        "reason": "Creating possible configured project for /tests/cases/fourslash/server/buttonClass/Source.ts to open"
      }
    }
Info seq  [hh:mm:ss:mss] FileWatcher:: Close:: WatchInfo: /tests/cases/fourslash/server/BaseClass/tsconfig.json 2000 undefined WatchType: Config file for the inferred project root
Info seq  [hh:mm:ss:mss] FileWatcher:: Close:: WatchInfo: /tests/cases/fourslash/server/BaseClass/jsconfig.json 2000 undefined WatchType: Config file for the inferred project root
Info seq  [hh:mm:ss:mss] FileWatcher:: Close:: WatchInfo: /tests/cases/fourslash/server/tsconfig.json 2000 undefined WatchType: Config file for the inferred project root
Info seq  [hh:mm:ss:mss] FileWatcher:: Close:: WatchInfo: /tests/cases/fourslash/server/jsconfig.json 2000 undefined WatchType: Config file for the inferred project root
Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: /tests/cases/fourslash/server/buttonClass/tsconfig.json
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /tests/cases/fourslash/server/buttonClass/node_modules 1 undefined Project: /tests/cases/fourslash/server/buttonClass/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /tests/cases/fourslash/server/buttonClass/node_modules 1 undefined Project: /tests/cases/fourslash/server/buttonClass/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /tests/cases/fourslash/server/node_modules 1 undefined Project: /tests/cases/fourslash/server/buttonClass/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /tests/cases/fourslash/server/node_modules 1 undefined Project: /tests/cases/fourslash/server/buttonClass/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /tests/cases/fourslash/node_modules 1 undefined Project: /tests/cases/fourslash/server/buttonClass/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /tests/cases/fourslash/node_modules 1 undefined Project: /tests/cases/fourslash/server/buttonClass/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /tests/cases/fourslash/server/buttonClass/node_modules/@types 1 undefined Project: /tests/cases/fourslash/server/buttonClass/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /tests/cases/fourslash/server/buttonClass/node_modules/@types 1 undefined Project: /tests/cases/fourslash/server/buttonClass/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /tests/cases/fourslash/server/node_modules/@types 1 undefined Project: /tests/cases/fourslash/server/buttonClass/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /tests/cases/fourslash/server/node_modules/@types 1 undefined Project: /tests/cases/fourslash/server/buttonClass/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /tests/cases/fourslash/node_modules/@types 1 undefined Project: /tests/cases/fourslash/server/buttonClass/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /tests/cases/fourslash/node_modules/@types 1 undefined Project: /tests/cases/fourslash/server/buttonClass/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: /tests/cases/fourslash/server/buttonClass/tsconfig.json projectStateVersion: 1 projectProgramVersion: 0 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Project '/tests/cases/fourslash/server/buttonClass/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (5)
	/home/src/tslibs/TS/Lib/lib.d.ts Text-1 lib.d.ts-Text
	/home/src/tslibs/TS/Lib/lib.decorators.d.ts Text-1 lib.decorators.d.ts-Text
	/home/src/tslibs/TS/Lib/lib.decorators.legacy.d.ts Text-1 lib.decorators.legacy.d.ts-Text
	/tests/cases/fourslash/server/buttonClass/Source.ts SVC-1-0 "// I cannot F12 navigate to Control\n//                   vvvvvvv\nclass Button extends Control {\n    public myFunction() {\n        // I cannot F12 navigate to myVar\n        //              vvvvv\n        if (typeof this.myVar === 'boolean') {\n            this.myVar;\n        } else {\n            this.myVar.toLocaleUpperCase();\n        }\n    }\n}"
	/tests/cases/fourslash/server/BaseClass/Source.d.ts SVC-1-0 "declare class Control {\n    constructor();\n    /** this is a super var */\n    myVar: boolean | 'yeah';\n}\n//# sourceMappingURL=Source.d.ts.map"


	../../../../../home/src/tslibs/TS/Lib/lib.d.ts
	  Default library for target 'es5'
	../../../../../home/src/tslibs/TS/Lib/lib.decorators.d.ts
	  Library referenced via 'decorators' from file '../../../../../home/src/tslibs/TS/Lib/lib.d.ts'
	../../../../../home/src/tslibs/TS/Lib/lib.decorators.legacy.d.ts
	  Library referenced via 'decorators.legacy' from file '../../../../../home/src/tslibs/TS/Lib/lib.d.ts'
	Source.ts
	  Part of 'files' list in tsconfig.json
	../BaseClass/Source.d.ts
	  Matched by include pattern '../BaseClass/Source.d.ts' in 'tsconfig.json'

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "projectLoadingFinish",
      "body": {
        "projectName": "/tests/cases/fourslash/server/buttonClass/tsconfig.json"
      }
    }
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "configFileDiag",
      "body": {
        "triggerFile": "/tests/cases/fourslash/server/buttonClass/Source.ts",
        "configFile": "/tests/cases/fourslash/server/buttonClass/tsconfig.json",
        "diagnostics": []
      }
    }
Info seq  [hh:mm:ss:mss] `remove Project::
Info seq  [hh:mm:ss:mss] Project '/dev/null/inferredProject1*' (Inferred)
Info seq  [hh:mm:ss:mss] 	Files (4)
	/home/src/tslibs/TS/Lib/lib.d.ts
	/home/src/tslibs/TS/Lib/lib.decorators.d.ts
	/home/src/tslibs/TS/Lib/lib.decorators.legacy.d.ts
	/tests/cases/fourslash/server/BaseClass/Source.d.ts


	../../../../../home/src/tslibs/TS/Lib/lib.d.ts
	  Default library for target 'es5'
	../../../../../home/src/tslibs/TS/Lib/lib.decorators.d.ts
	  Library referenced via 'decorators' from file '../../../../../home/src/tslibs/TS/Lib/lib.d.ts'
	../../../../../home/src/tslibs/TS/Lib/lib.decorators.legacy.d.ts
	  Library referenced via 'decorators.legacy' from file '../../../../../home/src/tslibs/TS/Lib/lib.d.ts'
	Source.d.ts
	  Root file specified for compilation

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Close:: WatchInfo: /tests/cases/fourslash/server/BaseClass/node_modules 1 undefined Project: /dev/null/inferredProject1* WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Close:: WatchInfo: /tests/cases/fourslash/server/BaseClass/node_modules 1 undefined Project: /dev/null/inferredProject1* WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Close:: WatchInfo: /tests/cases/fourslash/server/node_modules 1 undefined Project: /dev/null/inferredProject1* WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Close:: WatchInfo: /tests/cases/fourslash/server/node_modules 1 undefined Project: /dev/null/inferredProject1* WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Close:: WatchInfo: /tests/cases/fourslash/node_modules 1 undefined Project: /dev/null/inferredProject1* WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Close:: WatchInfo: /tests/cases/fourslash/node_modules 1 undefined Project: /dev/null/inferredProject1* WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Close:: WatchInfo: /tests/cases/fourslash/server/BaseClass/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Close:: WatchInfo: /tests/cases/fourslash/server/BaseClass/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Close:: WatchInfo: /tests/cases/fourslash/server/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Close:: WatchInfo: /tests/cases/fourslash/server/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Close:: WatchInfo: /tests/cases/fourslash/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Close:: WatchInfo: /tests/cases/fourslash/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info seq  [hh:mm:ss:mss] Project '/tests/cases/fourslash/server/buttonClass/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (5)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: /tests/cases/fourslash/server/BaseClass/Source.d.ts ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /tests/cases/fourslash/server/buttonClass/tsconfig.json
Info seq  [hh:mm:ss:mss] 	FileName: /tests/cases/fourslash/server/buttonClass/Source.ts ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /tests/cases/fourslash/server/buttonClass/tsconfig.json
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
After Request
watchedFiles::
/home/src/tslibs/TS/Lib/lib.d.ts:
  {"pollingInterval":500}
/home/src/tslibs/TS/Lib/lib.decorators.d.ts:
  {"pollingInterval":500}
/home/src/tslibs/TS/Lib/lib.decorators.legacy.d.ts:
  {"pollingInterval":500}
/tests/cases/fourslash/server/buttonClass/tsconfig.json: *new*
  {"pollingInterval":2000}
/tests/cases/fourslash/server/tsbase.json: *new*
  {"pollingInterval":2000}

watchedFiles *deleted*::
/tests/cases/fourslash/server/BaseClass/jsconfig.json:
  {"pollingInterval":2000}
/tests/cases/fourslash/server/BaseClass/tsconfig.json:
  {"pollingInterval":2000}
/tests/cases/fourslash/server/jsconfig.json:
  {"pollingInterval":2000}
/tests/cases/fourslash/server/tsconfig.json:
  {"pollingInterval":2000}

watchedDirectoriesRecursive::
/tests/cases/fourslash/node_modules:
  {} *new*
/tests/cases/fourslash/node_modules/@types:
  {} *new*
/tests/cases/fourslash/server/buttonClass/node_modules: *new*
  {}
/tests/cases/fourslash/server/buttonClass/node_modules/@types: *new*
  {}
/tests/cases/fourslash/server/node_modules:
  {} *new*
/tests/cases/fourslash/server/node_modules/@types:
  {} *new*

watchedDirectoriesRecursive *deleted*::
/tests/cases/fourslash/node_modules:
  {}
/tests/cases/fourslash/node_modules/@types:
  {}
/tests/cases/fourslash/server/BaseClass/node_modules:
  {}
/tests/cases/fourslash/server/BaseClass/node_modules/@types:
  {}
/tests/cases/fourslash/server/node_modules:
  {}
/tests/cases/fourslash/server/node_modules/@types:
  {}

Projects::
/dev/null/inferredProject1* (Inferred) *deleted*
    projectStateVersion: 2 *changed*
    projectProgramVersion: 1
    dirty: true *changed*
    isClosed: true *changed*
    isOrphan: true *changed*
    autoImportProviderHost: undefined *changed*
/tests/cases/fourslash/server/buttonClass/tsconfig.json (Configured) *new*
    projectStateVersion: 1
    projectProgramVersion: 1
    autoImportProviderHost: false

ScriptInfos::
/home/src/tslibs/TS/Lib/lib.d.ts *changed*
    version: Text-1
    containingProjects: 1 *changed*
        /tests/cases/fourslash/server/buttonClass/tsconfig.json *new*
        /dev/null/inferredProject1* *deleted*
/home/src/tslibs/TS/Lib/lib.decorators.d.ts *changed*
    version: Text-1
    containingProjects: 1 *changed*
        /tests/cases/fourslash/server/buttonClass/tsconfig.json *new*
        /dev/null/inferredProject1* *deleted*
/home/src/tslibs/TS/Lib/lib.decorators.legacy.d.ts *changed*
    version: Text-1
    containingProjects: 1 *changed*
        /tests/cases/fourslash/server/buttonClass/tsconfig.json *new*
        /dev/null/inferredProject1* *deleted*
/tests/cases/fourslash/server/BaseClass/Source.d.ts (Open) *changed*
    version: SVC-1-0
    containingProjects: 1 *changed*
        /tests/cases/fourslash/server/buttonClass/tsconfig.json *default* *new*
        /dev/null/inferredProject1* *deleted*
/tests/cases/fourslash/server/buttonClass/Source.ts (Open) *new*
    version: SVC-1-0
    containingProjects: 1
        /tests/cases/fourslash/server/buttonClass/tsconfig.json *default*

Info seq  [hh:mm:ss:mss] request:
    {
      "seq": 2,
      "type": "request",
      "arguments": {
        "file": "/tests/cases/fourslash/server/buttonClass/Source.ts",
        "line": 3,
        "offset": 22
      },
      "command": "definitionAndBoundSpan"
    }
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /tests/cases/fourslash/server/BaseClass/Source.d.ts.map 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /tests/cases/fourslash/server/BaseClass/Source.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] response:
    {
      "seq": 0,
      "type": "response",
      "command": "definitionAndBoundSpan",
      "request_seq": 2,
      "success": true,
      "body": {
        "definitions": [
          {
            "file": "/tests/cases/fourslash/server/BaseClass/Source.ts",
            "start": {
              "line": 1,
              "offset": 7
            },
            "end": {
              "line": 1,
              "offset": 14
            },
            "contextStart": {
              "line": 1,
              "offset": 1
            },
            "contextEnd": {
              "line": 7,
              "offset": 2
            }
          }
        ],
        "textSpan": {
          "start": {
            "line": 3,
            "offset": 22
          },
          "end": {
            "line": 3,
            "offset": 29
          }
        }
      }
    }
After Request
watchedFiles::
/home/src/tslibs/TS/Lib/lib.d.ts:
  {"pollingInterval":500}
/home/src/tslibs/TS/Lib/lib.decorators.d.ts:
  {"pollingInterval":500}
/home/src/tslibs/TS/Lib/lib.decorators.legacy.d.ts:
  {"pollingInterval":500}
/tests/cases/fourslash/server/BaseClass/Source.d.ts.map: *new*
  {"pollingInterval":500}
/tests/cases/fourslash/server/BaseClass/Source.ts: *new*
  {"pollingInterval":500}
/tests/cases/fourslash/server/buttonClass/tsconfig.json:
  {"pollingInterval":2000}
/tests/cases/fourslash/server/tsbase.json:
  {"pollingInterval":2000}

watchedDirectoriesRecursive::
/tests/cases/fourslash/node_modules:
  {}
/tests/cases/fourslash/node_modules/@types:
  {}
/tests/cases/fourslash/server/buttonClass/node_modules:
  {}
/tests/cases/fourslash/server/buttonClass/node_modules/@types:
  {}
/tests/cases/fourslash/server/node_modules:
  {}
/tests/cases/fourslash/server/node_modules/@types:
  {}

Projects::
/tests/cases/fourslash/server/buttonClass/tsconfig.json (Configured) *changed*
    projectStateVersion: 1
    projectProgramVersion: 1
    documentPositionMappers: 1 *changed*
        /tests/cases/fourslash/server/baseclass/source.d.ts: DocumentPositionMapper1 *new*
    autoImportProviderHost: false

ScriptInfos::
/home/src/tslibs/TS/Lib/lib.d.ts
    version: Text-1
    containingProjects: 1
        /tests/cases/fourslash/server/buttonClass/tsconfig.json
/home/src/tslibs/TS/Lib/lib.decorators.d.ts
    version: Text-1
    containingProjects: 1
        /tests/cases/fourslash/server/buttonClass/tsconfig.json
/home/src/tslibs/TS/Lib/lib.decorators.legacy.d.ts
    version: Text-1
    containingProjects: 1
        /tests/cases/fourslash/server/buttonClass/tsconfig.json
/tests/cases/fourslash/server/BaseClass/Source.d.ts (Open) *changed*
    version: SVC-1-0
    sourceMapFilePath: /tests/cases/fourslash/server/baseclass/source.d.ts.map *changed*
    containingProjects: 1
        /tests/cases/fourslash/server/buttonClass/tsconfig.json *default*
/tests/cases/fourslash/server/BaseClass/Source.d.ts.map *new*
    version: Text-1
    declarationInfoPath: /tests/cases/fourslash/server/baseclass/source.d.ts
    sourceInfos: 1
        /tests/cases/fourslash/server/baseclass/source.ts
    documentPositionMapper: DocumentPositionMapper1
    containingProjects: 0
/tests/cases/fourslash/server/BaseClass/Source.ts *new*
    version: Text-1
    containingProjects: 0
/tests/cases/fourslash/server/buttonClass/Source.ts (Open)
    version: SVC-1-0
    containingProjects: 1
        /tests/cases/fourslash/server/buttonClass/tsconfig.json *default*

DocumentPositionMappers::
DocumentPositionMapper1 *new*

Info seq  [hh:mm:ss:mss] request:
    {
      "seq": 3,
      "type": "request",
      "arguments": {
        "file": "/tests/cases/fourslash/server/buttonClass/Source.ts",
        "line": 7,
        "offset": 25
      },
      "command": "definitionAndBoundSpan"
    }
Info seq  [hh:mm:ss:mss] response:
    {
      "seq": 0,
      "type": "response",
      "command": "definitionAndBoundSpan",
      "request_seq": 3,
      "success": true,
      "body": {
        "definitions": [
          {
            "file": "/tests/cases/fourslash/server/BaseClass/Source.ts",
            "start": {
              "line": 6,
              "offset": 12
            },
            "end": {
              "line": 6,
              "offset": 17
            },
            "contextStart": {
              "line": 6,
              "offset": 12
            },
            "contextEnd": {
              "line": 6,
              "offset": 43
            }
          }
        ],
        "textSpan": {
          "start": {
            "line": 7,
            "offset": 25
          },
          "end": {
            "line": 7,
            "offset": 30
          }
        }
      }
    }