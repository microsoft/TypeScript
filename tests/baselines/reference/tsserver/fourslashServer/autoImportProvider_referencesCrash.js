Info seq  [hh:mm:ss:mss] currentDirectory:: /home/src/Vscode/Projects/bin useCaseSensitiveFileNames:: false
Info seq  [hh:mm:ss:mss] libs Location:: /home/src/tslibs/TS/Lib
Info seq  [hh:mm:ss:mss] globalTypingsCacheLocation:: /home/src/Library/Caches/typescript
Info seq  [hh:mm:ss:mss] request:
    {
      "seq": 0,
      "type": "request",
      "arguments": {
        "options": {
          "lib": [
            "es5"
          ],
          "target": "es2025",
          "newLine": "crlf",
          "skipDefaultLibCheck": true,
          "disableSourceOfProjectReferenceRedirect": true
        }
      },
      "command": "compilerOptionsForInferredProjects"
    }
Info seq  [hh:mm:ss:mss] response:
    {
      "seq": 0,
      "type": "response",
      "command": "compilerOptionsForInferredProjects",
      "request_seq": 0,
      "success": true,
      "body": true
    }
//// [/home/src/workspaces/project/a/index.d.ts]
declare class A {
}
//# sourceMappingURL=index.d.ts.map

//// [/home/src/workspaces/project/a/index.d.ts.map]
{"version":3,"file":"index.d.ts","sourceRoot":"","sources":["index.ts"],"names":[],"mappings":"AAAA,OAAO,OAAO,CAAC;CAAG"}

//// [/home/src/workspaces/project/a/index.ts]
class A {}

//// [/home/src/workspaces/project/a/package.json]
{}

//// [/home/src/workspaces/project/a/tsconfig.json]
{ "compilerOptions": { "lib": ["es5"] } }

//// [/home/src/workspaces/project/b/b.ts]
/// <reference path="../a/index.d.ts" />
new A();

//// [/home/src/workspaces/project/b/tsconfig.json]
{
  "compilerOptions": { "disableSourceOfProjectReferenceRedirect": true, "lib": ["es5"] },
  "references": [{ "path": "../a" }]
}

//// [/home/src/workspaces/project/c/index.ts]
export {};

//// [/home/src/workspaces/project/c/node_modules/a] symlink(/home/src/workspaces/project/a)
//// [/home/src/workspaces/project/c/package.json]
{ "dependencies": { "a": "*" } }

//// [/home/src/workspaces/project/c/tsconfig.json]
{ "compilerOptions": { "lib": ["es5"] }, "references" [{ "path": "../a" }] }


Info seq  [hh:mm:ss:mss] request:
    {
      "seq": 1,
      "type": "request",
      "arguments": {
        "file": "/home/src/workspaces/project/a/package.json"
      },
      "command": "open"
    }
Info seq  [hh:mm:ss:mss] getConfigFileNameForFile:: File: /home/src/workspaces/project/a/package.json ProjectRootPath: undefined:: Result: /home/src/workspaces/project/a/tsconfig.json
Info seq  [hh:mm:ss:mss] Creating ConfiguredProject: /home/src/workspaces/project/a/tsconfig.json, currentDirectory: /home/src/workspaces/project/a
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/workspaces/project/a/tsconfig.json 2000 undefined Project: /home/src/workspaces/project/a/tsconfig.json WatchType: Config file
Info seq  [hh:mm:ss:mss] Config: /home/src/workspaces/project/a/tsconfig.json : {
 "rootNames": [
  "/home/src/workspaces/project/a/index.ts"
 ],
 "options": {
  "lib": [
   "lib.es5.d.ts"
  ],
  "configFilePath": "/home/src/workspaces/project/a/tsconfig.json"
 }
}
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "projectLoadingStart",
      "body": {
        "projectName": "/home/src/workspaces/project/a/tsconfig.json",
        "reason": "Creating possible configured project for /home/src/workspaces/project/a/package.json to open"
      }
    }
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /home/src/workspaces/project/a 1 undefined Config: /home/src/workspaces/project/a/tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /home/src/workspaces/project/a 1 undefined Config: /home/src/workspaces/project/a/tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/workspaces/project/a/index.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: /home/src/workspaces/project/a/tsconfig.json
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/tslibs/TS/Lib/lib.es5.d.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/tslibs/TS/Lib/lib.decorators.d.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/tslibs/TS/Lib/lib.decorators.legacy.d.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: /home/src/workspaces/project/a/tsconfig.json projectStateVersion: 1 projectProgramVersion: 0 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Project '/home/src/workspaces/project/a/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (4)
	/home/src/tslibs/TS/Lib/lib.es5.d.ts Text-1 lib.es5.d.ts-Text
	/home/src/tslibs/TS/Lib/lib.decorators.d.ts Text-1 lib.decorators.d.ts-Text
	/home/src/tslibs/TS/Lib/lib.decorators.legacy.d.ts Text-1 lib.decorators.legacy.d.ts-Text
	/home/src/workspaces/project/a/index.ts Text-1 "class A {}"


	../../../tslibs/TS/Lib/lib.es5.d.ts
	  Library 'lib.es5.d.ts' specified in compilerOptions
	../../../tslibs/TS/Lib/lib.decorators.d.ts
	  Library referenced via 'decorators' from file '../../../tslibs/TS/Lib/lib.es5.d.ts'
	../../../tslibs/TS/Lib/lib.decorators.legacy.d.ts
	  Library referenced via 'decorators.legacy' from file '../../../tslibs/TS/Lib/lib.es5.d.ts'
	index.ts
	  Matched by default include pattern '**/*'

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "projectLoadingFinish",
      "body": {
        "projectName": "/home/src/workspaces/project/a/tsconfig.json"
      }
    }
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "configFileDiag",
      "body": {
        "triggerFile": "/home/src/workspaces/project/a/package.json",
        "configFile": "/home/src/workspaces/project/a/tsconfig.json",
        "diagnostics": []
      }
    }
Info seq  [hh:mm:ss:mss] getConfigFileNameForFile:: File: /home/src/workspaces/project/a/tsconfig.json ProjectRootPath: undefined:: Result: undefined
Info seq  [hh:mm:ss:mss] Creating InferredProject: /dev/null/inferredProject1*, currentDirectory: /home/src/workspaces/project/a
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/workspaces/project/a/jsconfig.json 2000 undefined WatchType: Config file for the inferred project root
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/workspaces/project/tsconfig.json 2000 undefined WatchType: Config file for the inferred project root
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/workspaces/project/jsconfig.json 2000 undefined WatchType: Config file for the inferred project root
Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: /dev/null/inferredProject1*
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: /dev/null/inferredProject1* projectStateVersion: 1 projectProgramVersion: 0 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Project '/dev/null/inferredProject1*' (Inferred)
Info seq  [hh:mm:ss:mss] 	Files (4)
	/home/src/tslibs/TS/Lib/lib.es5.d.ts Text-1 lib.es5.d.ts-Text
	/home/src/tslibs/TS/Lib/lib.decorators.d.ts Text-1 lib.decorators.d.ts-Text
	/home/src/tslibs/TS/Lib/lib.decorators.legacy.d.ts Text-1 lib.decorators.legacy.d.ts-Text
	/home/src/workspaces/project/a/package.json SVC-1-0 "{}"


	../../../tslibs/TS/Lib/lib.es5.d.ts
	  Library 'lib.es5.d.ts' specified in compilerOptions
	../../../tslibs/TS/Lib/lib.decorators.d.ts
	  Library referenced via 'decorators' from file '../../../tslibs/TS/Lib/lib.es5.d.ts'
	../../../tslibs/TS/Lib/lib.decorators.legacy.d.ts
	  Library referenced via 'decorators.legacy' from file '../../../tslibs/TS/Lib/lib.es5.d.ts'
	package.json
	  Root file specified for compilation

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/workspaces/project/a/package.json 250 undefined WatchType: package.json file
Info seq  [hh:mm:ss:mss] Project '/home/src/workspaces/project/a/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (4)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Project '/dev/null/inferredProject1*' (Inferred)
Info seq  [hh:mm:ss:mss] 	Files (4)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: /home/src/workspaces/project/a/package.json ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /dev/null/inferredProject1*
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
/home/src/tslibs/TS/Lib/lib.decorators.d.ts: *new*
  {"pollingInterval":500}
/home/src/tslibs/TS/Lib/lib.decorators.legacy.d.ts: *new*
  {"pollingInterval":500}
/home/src/tslibs/TS/Lib/lib.es5.d.ts: *new*
  {"pollingInterval":500}
/home/src/workspaces/project/a/index.ts: *new*
  {"pollingInterval":500}
/home/src/workspaces/project/a/jsconfig.json: *new*
  {"pollingInterval":2000}
/home/src/workspaces/project/a/package.json: *new*
  {"pollingInterval":250}
/home/src/workspaces/project/a/tsconfig.json: *new*
  {"pollingInterval":2000}
/home/src/workspaces/project/jsconfig.json: *new*
  {"pollingInterval":2000}
/home/src/workspaces/project/tsconfig.json: *new*
  {"pollingInterval":2000}

watchedDirectoriesRecursive::
/home/src/workspaces/project/a: *new*
  {}

Projects::
/dev/null/inferredProject1* (Inferred) *new*
    projectStateVersion: 1
    projectProgramVersion: 1
    autoImportProviderHost: false
/home/src/workspaces/project/a/tsconfig.json (Configured) *new*
    projectStateVersion: 1
    projectProgramVersion: 1
    noOpenRef: true

ScriptInfos::
/home/src/tslibs/TS/Lib/lib.decorators.d.ts *new*
    version: Text-1
    containingProjects: 2
        /home/src/workspaces/project/a/tsconfig.json
        /dev/null/inferredProject1*
/home/src/tslibs/TS/Lib/lib.decorators.legacy.d.ts *new*
    version: Text-1
    containingProjects: 2
        /home/src/workspaces/project/a/tsconfig.json
        /dev/null/inferredProject1*
/home/src/tslibs/TS/Lib/lib.es5.d.ts *new*
    version: Text-1
    containingProjects: 2
        /home/src/workspaces/project/a/tsconfig.json
        /dev/null/inferredProject1*
/home/src/workspaces/project/a/index.ts *new*
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/a/tsconfig.json
/home/src/workspaces/project/a/package.json (Open) *new*
    version: SVC-1-0
    containingProjects: 1
        /dev/null/inferredProject1* *default*

Info seq  [hh:mm:ss:mss] request:
    {
      "seq": 2,
      "type": "request",
      "arguments": {
        "file": "/home/src/workspaces/project/c/index.ts"
      },
      "command": "open"
    }
Info seq  [hh:mm:ss:mss] getConfigFileNameForFile:: File: /home/src/workspaces/project/c/index.ts ProjectRootPath: undefined:: Result: /home/src/workspaces/project/c/tsconfig.json
Info seq  [hh:mm:ss:mss] Creating ConfiguredProject: /home/src/workspaces/project/c/tsconfig.json, currentDirectory: /home/src/workspaces/project/c
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/workspaces/project/c/tsconfig.json 2000 undefined Project: /home/src/workspaces/project/c/tsconfig.json WatchType: Config file
Info seq  [hh:mm:ss:mss] Config: /home/src/workspaces/project/c/tsconfig.json : {
 "rootNames": [
  "/home/src/workspaces/project/c/index.ts"
 ],
 "options": {
  "lib": [
   "lib.es5.d.ts"
  ],
  "configFilePath": "/home/src/workspaces/project/c/tsconfig.json"
 },
 "projectReferences": [
  {
   "path": "/home/src/workspaces/project/a",
   "originalPath": "../a"
  }
 ]
}
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "projectLoadingStart",
      "body": {
        "projectName": "/home/src/workspaces/project/c/tsconfig.json",
        "reason": "Creating possible configured project for /home/src/workspaces/project/c/index.ts to open"
      }
    }
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /home/src/workspaces/project/c 1 undefined Config: /home/src/workspaces/project/c/tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /home/src/workspaces/project/c 1 undefined Config: /home/src/workspaces/project/c/tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: /home/src/workspaces/project/c/tsconfig.json
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: /home/src/workspaces/project/c/tsconfig.json projectStateVersion: 1 projectProgramVersion: 0 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Project '/home/src/workspaces/project/c/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (4)
	/home/src/tslibs/TS/Lib/lib.es5.d.ts Text-1 lib.es5.d.ts-Text
	/home/src/tslibs/TS/Lib/lib.decorators.d.ts Text-1 lib.decorators.d.ts-Text
	/home/src/tslibs/TS/Lib/lib.decorators.legacy.d.ts Text-1 lib.decorators.legacy.d.ts-Text
	/home/src/workspaces/project/c/index.ts SVC-1-0 "export {};"


	../../../tslibs/TS/Lib/lib.es5.d.ts
	  Library 'lib.es5.d.ts' specified in compilerOptions
	../../../tslibs/TS/Lib/lib.decorators.d.ts
	  Library referenced via 'decorators' from file '../../../tslibs/TS/Lib/lib.es5.d.ts'
	../../../tslibs/TS/Lib/lib.decorators.legacy.d.ts
	  Library referenced via 'decorators.legacy' from file '../../../tslibs/TS/Lib/lib.es5.d.ts'
	index.ts
	  Matched by default include pattern '**/*'

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/workspaces/project/c/package.json 250 undefined WatchType: package.json file
Info seq  [hh:mm:ss:mss] AutoImportProviderProject: found 1 root files in 1 dependencies 0 referenced projects in * ms
Info seq  [hh:mm:ss:mss] Creating AutoImportProviderProject: /dev/null/autoImportProviderProject1*, currentDirectory: /home/src/workspaces/project/c
Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: /dev/null/autoImportProviderProject1*
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: /dev/null/autoImportProviderProject1* projectStateVersion: 1 projectProgramVersion: 0 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Project '/dev/null/autoImportProviderProject1*' (AutoImportProvider)
Info seq  [hh:mm:ss:mss] 	Files (1)
	/home/src/workspaces/project/a/index.ts Text-1 "class A {}"


	../a/index.ts
	  Root file specified for compilation

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "projectLoadingFinish",
      "body": {
        "projectName": "/home/src/workspaces/project/c/tsconfig.json"
      }
    }
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "configFileDiag",
      "body": {
        "triggerFile": "/home/src/workspaces/project/c/index.ts",
        "configFile": "/home/src/workspaces/project/c/tsconfig.json",
        "diagnostics": [
          {
            "start": {
              "line": 1,
              "offset": 56
            },
            "end": {
              "line": 1,
              "offset": 74
            },
            "text": "Referenced project '/home/src/workspaces/project/a' must have setting \"composite\": true.",
            "code": 6306,
            "category": "error",
            "fileName": "/home/src/workspaces/project/c/tsconfig.json"
          },
          {
            "start": {
              "line": 1,
              "offset": 55
            },
            "end": {
              "line": 1,
              "offset": 56
            },
            "text": "':' expected.",
            "code": 1005,
            "category": "error",
            "fileName": "/home/src/workspaces/project/c/tsconfig.json"
          }
        ]
      }
    }
Info seq  [hh:mm:ss:mss] Project '/home/src/workspaces/project/a/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (4)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Project '/home/src/workspaces/project/c/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (4)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Project '/dev/null/autoImportProviderProject1*' (AutoImportProvider)
Info seq  [hh:mm:ss:mss] 	Files (1)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Project '/dev/null/inferredProject1*' (Inferred)
Info seq  [hh:mm:ss:mss] 	Files (4)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: /home/src/workspaces/project/a/package.json ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /dev/null/inferredProject1*
Info seq  [hh:mm:ss:mss] 	FileName: /home/src/workspaces/project/c/index.ts ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /home/src/workspaces/project/c/tsconfig.json
Info seq  [hh:mm:ss:mss] response:
    {
      "seq": 0,
      "type": "response",
      "command": "open",
      "request_seq": 2,
      "success": true,
      "performanceData": {
        "updateGraphDurationMs": *,
        "createAutoImportProviderProgramDurationMs": *
      }
    }
After Request
watchedFiles::
/home/src/tslibs/TS/Lib/lib.decorators.d.ts:
  {"pollingInterval":500}
/home/src/tslibs/TS/Lib/lib.decorators.legacy.d.ts:
  {"pollingInterval":500}
/home/src/tslibs/TS/Lib/lib.es5.d.ts:
  {"pollingInterval":500}
/home/src/workspaces/project/a/index.ts:
  {"pollingInterval":500}
/home/src/workspaces/project/a/jsconfig.json:
  {"pollingInterval":2000}
/home/src/workspaces/project/a/package.json:
  {"pollingInterval":250}
/home/src/workspaces/project/a/tsconfig.json:
  {"pollingInterval":2000}
/home/src/workspaces/project/c/package.json: *new*
  {"pollingInterval":250}
/home/src/workspaces/project/c/tsconfig.json: *new*
  {"pollingInterval":2000}
/home/src/workspaces/project/jsconfig.json:
  {"pollingInterval":2000}
/home/src/workspaces/project/tsconfig.json:
  {"pollingInterval":2000}

watchedDirectoriesRecursive::
/home/src/workspaces/project/a:
  {}
/home/src/workspaces/project/c: *new*
  {}

Projects::
/dev/null/autoImportProviderProject1* (AutoImportProvider) *new*
    projectStateVersion: 1
    projectProgramVersion: 1
/dev/null/inferredProject1* (Inferred)
    projectStateVersion: 1
    projectProgramVersion: 1
    autoImportProviderHost: false
/home/src/workspaces/project/a/tsconfig.json (Configured) *changed*
    projectStateVersion: 1
    projectProgramVersion: 1
    noOpenRef: false *changed*
/home/src/workspaces/project/c/tsconfig.json (Configured) *new*
    projectStateVersion: 1
    projectProgramVersion: 1
    autoImportProviderHost: /dev/null/autoImportProviderProject1*

ScriptInfos::
/home/src/tslibs/TS/Lib/lib.decorators.d.ts *changed*
    version: Text-1
    containingProjects: 3 *changed*
        /home/src/workspaces/project/a/tsconfig.json
        /dev/null/inferredProject1*
        /home/src/workspaces/project/c/tsconfig.json *new*
/home/src/tslibs/TS/Lib/lib.decorators.legacy.d.ts *changed*
    version: Text-1
    containingProjects: 3 *changed*
        /home/src/workspaces/project/a/tsconfig.json
        /dev/null/inferredProject1*
        /home/src/workspaces/project/c/tsconfig.json *new*
/home/src/tslibs/TS/Lib/lib.es5.d.ts *changed*
    version: Text-1
    containingProjects: 3 *changed*
        /home/src/workspaces/project/a/tsconfig.json
        /dev/null/inferredProject1*
        /home/src/workspaces/project/c/tsconfig.json *new*
/home/src/workspaces/project/a/index.ts *changed*
    version: Text-1
    containingProjects: 2 *changed*
        /home/src/workspaces/project/a/tsconfig.json
        /dev/null/autoImportProviderProject1* *new*
/home/src/workspaces/project/a/package.json (Open)
    version: SVC-1-0
    containingProjects: 1
        /dev/null/inferredProject1* *default*
/home/src/workspaces/project/c/index.ts (Open) *new*
    version: SVC-1-0
    containingProjects: 1
        /home/src/workspaces/project/c/tsconfig.json *default*

Info seq  [hh:mm:ss:mss] request:
    {
      "seq": 3,
      "type": "request",
      "arguments": {
        "file": "/home/src/workspaces/project/b/b.ts"
      },
      "command": "open"
    }
Info seq  [hh:mm:ss:mss] getConfigFileNameForFile:: File: /home/src/workspaces/project/b/b.ts ProjectRootPath: undefined:: Result: /home/src/workspaces/project/b/tsconfig.json
Info seq  [hh:mm:ss:mss] Creating ConfiguredProject: /home/src/workspaces/project/b/tsconfig.json, currentDirectory: /home/src/workspaces/project/b
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/workspaces/project/b/tsconfig.json 2000 undefined Project: /home/src/workspaces/project/b/tsconfig.json WatchType: Config file
Info seq  [hh:mm:ss:mss] Config: /home/src/workspaces/project/b/tsconfig.json : {
 "rootNames": [
  "/home/src/workspaces/project/b/b.ts"
 ],
 "options": {
  "disableSourceOfProjectReferenceRedirect": true,
  "lib": [
   "lib.es5.d.ts"
  ],
  "configFilePath": "/home/src/workspaces/project/b/tsconfig.json"
 },
 "projectReferences": [
  {
   "path": "/home/src/workspaces/project/a",
   "originalPath": "../a"
  }
 ]
}
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "projectLoadingStart",
      "body": {
        "projectName": "/home/src/workspaces/project/b/tsconfig.json",
        "reason": "Creating possible configured project for /home/src/workspaces/project/b/b.ts to open"
      }
    }
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /home/src/workspaces/project/b 1 undefined Config: /home/src/workspaces/project/b/tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /home/src/workspaces/project/b 1 undefined Config: /home/src/workspaces/project/b/tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: /home/src/workspaces/project/b/tsconfig.json
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/workspaces/project/a/index.d.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: /home/src/workspaces/project/b/tsconfig.json projectStateVersion: 1 projectProgramVersion: 0 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Project '/home/src/workspaces/project/b/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (5)
	/home/src/tslibs/TS/Lib/lib.es5.d.ts Text-1 lib.es5.d.ts-Text
	/home/src/tslibs/TS/Lib/lib.decorators.d.ts Text-1 lib.decorators.d.ts-Text
	/home/src/tslibs/TS/Lib/lib.decorators.legacy.d.ts Text-1 lib.decorators.legacy.d.ts-Text
	/home/src/workspaces/project/a/index.d.ts Text-1 "declare class A {\n}\n//# sourceMappingURL=index.d.ts.map"
	/home/src/workspaces/project/b/b.ts SVC-1-0 "/// <reference path=\"../a/index.d.ts\" />\nnew A();"


	../../../tslibs/TS/Lib/lib.es5.d.ts
	  Library 'lib.es5.d.ts' specified in compilerOptions
	../../../tslibs/TS/Lib/lib.decorators.d.ts
	  Library referenced via 'decorators' from file '../../../tslibs/TS/Lib/lib.es5.d.ts'
	../../../tslibs/TS/Lib/lib.decorators.legacy.d.ts
	  Library referenced via 'decorators.legacy' from file '../../../tslibs/TS/Lib/lib.es5.d.ts'
	../a/index.d.ts
	  Referenced via '../a/index.d.ts' from file 'b.ts'
	b.ts
	  Matched by default include pattern '**/*'

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "projectLoadingFinish",
      "body": {
        "projectName": "/home/src/workspaces/project/b/tsconfig.json"
      }
    }
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "configFileDiag",
      "body": {
        "triggerFile": "/home/src/workspaces/project/b/b.ts",
        "configFile": "/home/src/workspaces/project/b/tsconfig.json",
        "diagnostics": [
          {
            "start": {
              "line": 3,
              "offset": 18
            },
            "end": {
              "line": 3,
              "offset": 36
            },
            "text": "Referenced project '/home/src/workspaces/project/a' must have setting \"composite\": true.",
            "code": 6306,
            "category": "error",
            "fileName": "/home/src/workspaces/project/b/tsconfig.json"
          }
        ]
      }
    }
Info seq  [hh:mm:ss:mss] Project '/home/src/workspaces/project/a/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (4)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Project '/home/src/workspaces/project/c/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (4)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Project '/dev/null/autoImportProviderProject1*' (AutoImportProvider)
Info seq  [hh:mm:ss:mss] 	Files (1)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Project '/home/src/workspaces/project/b/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (5)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Project '/dev/null/inferredProject1*' (Inferred)
Info seq  [hh:mm:ss:mss] 	Files (4)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: /home/src/workspaces/project/a/package.json ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /dev/null/inferredProject1*
Info seq  [hh:mm:ss:mss] 	FileName: /home/src/workspaces/project/c/index.ts ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /home/src/workspaces/project/c/tsconfig.json
Info seq  [hh:mm:ss:mss] 	FileName: /home/src/workspaces/project/b/b.ts ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /home/src/workspaces/project/b/tsconfig.json
Info seq  [hh:mm:ss:mss] response:
    {
      "seq": 0,
      "type": "response",
      "command": "open",
      "request_seq": 3,
      "success": true,
      "performanceData": {
        "updateGraphDurationMs": *
      }
    }
After Request
watchedFiles::
/home/src/tslibs/TS/Lib/lib.decorators.d.ts:
  {"pollingInterval":500}
/home/src/tslibs/TS/Lib/lib.decorators.legacy.d.ts:
  {"pollingInterval":500}
/home/src/tslibs/TS/Lib/lib.es5.d.ts:
  {"pollingInterval":500}
/home/src/workspaces/project/a/index.d.ts: *new*
  {"pollingInterval":500}
/home/src/workspaces/project/a/index.ts:
  {"pollingInterval":500}
/home/src/workspaces/project/a/jsconfig.json:
  {"pollingInterval":2000}
/home/src/workspaces/project/a/package.json:
  {"pollingInterval":250}
/home/src/workspaces/project/a/tsconfig.json:
  {"pollingInterval":2000}
/home/src/workspaces/project/b/tsconfig.json: *new*
  {"pollingInterval":2000}
/home/src/workspaces/project/c/package.json:
  {"pollingInterval":250}
/home/src/workspaces/project/c/tsconfig.json:
  {"pollingInterval":2000}
/home/src/workspaces/project/jsconfig.json:
  {"pollingInterval":2000}
/home/src/workspaces/project/tsconfig.json:
  {"pollingInterval":2000}

watchedDirectoriesRecursive::
/home/src/workspaces/project/a:
  {}
/home/src/workspaces/project/b: *new*
  {}
/home/src/workspaces/project/c:
  {}

Projects::
/dev/null/autoImportProviderProject1* (AutoImportProvider)
    projectStateVersion: 1
    projectProgramVersion: 1
/dev/null/inferredProject1* (Inferred)
    projectStateVersion: 1
    projectProgramVersion: 1
    autoImportProviderHost: false
/home/src/workspaces/project/a/tsconfig.json (Configured)
    projectStateVersion: 1
    projectProgramVersion: 1
/home/src/workspaces/project/b/tsconfig.json (Configured) *new*
    projectStateVersion: 1
    projectProgramVersion: 1
    autoImportProviderHost: false
/home/src/workspaces/project/c/tsconfig.json (Configured)
    projectStateVersion: 1
    projectProgramVersion: 1
    autoImportProviderHost: /dev/null/autoImportProviderProject1*

ScriptInfos::
/home/src/tslibs/TS/Lib/lib.decorators.d.ts *changed*
    version: Text-1
    containingProjects: 4 *changed*
        /home/src/workspaces/project/a/tsconfig.json
        /dev/null/inferredProject1*
        /home/src/workspaces/project/c/tsconfig.json
        /home/src/workspaces/project/b/tsconfig.json *new*
/home/src/tslibs/TS/Lib/lib.decorators.legacy.d.ts *changed*
    version: Text-1
    containingProjects: 4 *changed*
        /home/src/workspaces/project/a/tsconfig.json
        /dev/null/inferredProject1*
        /home/src/workspaces/project/c/tsconfig.json
        /home/src/workspaces/project/b/tsconfig.json *new*
/home/src/tslibs/TS/Lib/lib.es5.d.ts *changed*
    version: Text-1
    containingProjects: 4 *changed*
        /home/src/workspaces/project/a/tsconfig.json
        /dev/null/inferredProject1*
        /home/src/workspaces/project/c/tsconfig.json
        /home/src/workspaces/project/b/tsconfig.json *new*
/home/src/workspaces/project/a/index.d.ts *new*
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/b/tsconfig.json
/home/src/workspaces/project/a/index.ts
    version: Text-1
    containingProjects: 2
        /home/src/workspaces/project/a/tsconfig.json
        /dev/null/autoImportProviderProject1*
/home/src/workspaces/project/a/package.json (Open)
    version: SVC-1-0
    containingProjects: 1
        /dev/null/inferredProject1* *default*
/home/src/workspaces/project/b/b.ts (Open) *new*
    version: SVC-1-0
    containingProjects: 1
        /home/src/workspaces/project/b/tsconfig.json *default*
/home/src/workspaces/project/c/index.ts (Open)
    version: SVC-1-0
    containingProjects: 1
        /home/src/workspaces/project/c/tsconfig.json *default*

Info seq  [hh:mm:ss:mss] request:
    {
      "seq": 4,
      "type": "request",
      "arguments": {
        "file": "/home/src/workspaces/project/b/b.ts",
        "line": 2,
        "offset": 6
      },
      "command": "references-full"
    }
Info seq  [hh:mm:ss:mss] Finding references to /home/src/workspaces/project/b/b.ts position 46 in project /home/src/workspaces/project/b/tsconfig.json
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/workspaces/project/a/index.d.ts.map 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] getConfigFileNameForFile:: File: /home/src/workspaces/project/a/index.ts ProjectRootPath: undefined:: Result: /home/src/workspaces/project/a/tsconfig.json
Info seq  [hh:mm:ss:mss] getConfigFileNameForFile:: File: /home/src/workspaces/project/a/index.ts ProjectRootPath: undefined:: Result: /home/src/workspaces/project/a/tsconfig.json
Info seq  [hh:mm:ss:mss] Finding references to /home/src/workspaces/project/a/index.ts position 10 in project /home/src/workspaces/project/a/tsconfig.json
Info seq  [hh:mm:ss:mss] response:
    {
      "seq": 0,
      "type": "response",
      "command": "references-full",
      "request_seq": 4,
      "success": true,
      "body": [
        {
          "definition": {
            "containerKind": "",
            "containerName": "",
            "fileName": "/home/src/workspaces/project/a/index.ts",
            "kind": "class",
            "name": "class A",
            "textSpan": {
              "start": 10,
              "length": 1
            },
            "displayParts": [
              {
                "text": "class",
                "kind": "keyword"
              },
              {
                "text": " ",
                "kind": "space"
              },
              {
                "text": "A",
                "kind": "className"
              }
            ],
            "contextSpan": {
              "start": 0,
              "length": 10
            }
          },
          "references": [
            {
              "textSpan": {
                "start": 45,
                "length": 1
              },
              "fileName": "/home/src/workspaces/project/b/b.ts",
              "isWriteAccess": false
            }
          ]
        }
      ]
    }
After Request
watchedFiles::
/home/src/tslibs/TS/Lib/lib.decorators.d.ts:
  {"pollingInterval":500}
/home/src/tslibs/TS/Lib/lib.decorators.legacy.d.ts:
  {"pollingInterval":500}
/home/src/tslibs/TS/Lib/lib.es5.d.ts:
  {"pollingInterval":500}
/home/src/workspaces/project/a/index.d.ts:
  {"pollingInterval":500}
/home/src/workspaces/project/a/index.d.ts.map: *new*
  {"pollingInterval":500}
/home/src/workspaces/project/a/index.ts:
  {"pollingInterval":500}
/home/src/workspaces/project/a/jsconfig.json:
  {"pollingInterval":2000}
/home/src/workspaces/project/a/package.json:
  {"pollingInterval":250}
/home/src/workspaces/project/a/tsconfig.json:
  {"pollingInterval":2000}
/home/src/workspaces/project/b/tsconfig.json:
  {"pollingInterval":2000}
/home/src/workspaces/project/c/package.json:
  {"pollingInterval":250}
/home/src/workspaces/project/c/tsconfig.json:
  {"pollingInterval":2000}
/home/src/workspaces/project/jsconfig.json:
  {"pollingInterval":2000}
/home/src/workspaces/project/tsconfig.json:
  {"pollingInterval":2000}

watchedDirectoriesRecursive::
/home/src/workspaces/project/a:
  {}
/home/src/workspaces/project/b:
  {}
/home/src/workspaces/project/c:
  {}

Projects::
/dev/null/autoImportProviderProject1* (AutoImportProvider)
    projectStateVersion: 1
    projectProgramVersion: 1
/dev/null/inferredProject1* (Inferred)
    projectStateVersion: 1
    projectProgramVersion: 1
    autoImportProviderHost: false
/home/src/workspaces/project/a/tsconfig.json (Configured)
    projectStateVersion: 1
    projectProgramVersion: 1
/home/src/workspaces/project/b/tsconfig.json (Configured) *changed*
    projectStateVersion: 1
    projectProgramVersion: 1
    documentPositionMappers: 1 *changed*
        /home/src/workspaces/project/a/index.d.ts: DocumentPositionMapper1 *new*
    autoImportProviderHost: false
    originalConfiguredProjects: 1 *changed*
        /home/src/workspaces/project/a/tsconfig.json *new*
/home/src/workspaces/project/c/tsconfig.json (Configured)
    projectStateVersion: 1
    projectProgramVersion: 1
    autoImportProviderHost: /dev/null/autoImportProviderProject1*

ScriptInfos::
/home/src/tslibs/TS/Lib/lib.decorators.d.ts
    version: Text-1
    containingProjects: 4
        /home/src/workspaces/project/a/tsconfig.json
        /dev/null/inferredProject1*
        /home/src/workspaces/project/c/tsconfig.json
        /home/src/workspaces/project/b/tsconfig.json
/home/src/tslibs/TS/Lib/lib.decorators.legacy.d.ts
    version: Text-1
    containingProjects: 4
        /home/src/workspaces/project/a/tsconfig.json
        /dev/null/inferredProject1*
        /home/src/workspaces/project/c/tsconfig.json
        /home/src/workspaces/project/b/tsconfig.json
/home/src/tslibs/TS/Lib/lib.es5.d.ts
    version: Text-1
    containingProjects: 4
        /home/src/workspaces/project/a/tsconfig.json
        /dev/null/inferredProject1*
        /home/src/workspaces/project/c/tsconfig.json
        /home/src/workspaces/project/b/tsconfig.json
/home/src/workspaces/project/a/index.d.ts *changed*
    version: Text-1
    sourceMapFilePath: /home/src/workspaces/project/a/index.d.ts.map *changed*
    containingProjects: 1
        /home/src/workspaces/project/b/tsconfig.json
/home/src/workspaces/project/a/index.d.ts.map *new*
    version: Text-1
    declarationInfoPath: /home/src/workspaces/project/a/index.d.ts
    sourceInfos: 1
        /home/src/workspaces/project/a/index.ts
    documentPositionMapper: DocumentPositionMapper1
    containingProjects: 0
/home/src/workspaces/project/a/index.ts
    version: Text-1
    containingProjects: 2
        /home/src/workspaces/project/a/tsconfig.json
        /dev/null/autoImportProviderProject1*
/home/src/workspaces/project/a/package.json (Open)
    version: SVC-1-0
    containingProjects: 1
        /dev/null/inferredProject1* *default*
/home/src/workspaces/project/b/b.ts (Open)
    version: SVC-1-0
    containingProjects: 1
        /home/src/workspaces/project/b/tsconfig.json *default*
/home/src/workspaces/project/c/index.ts (Open)
    version: SVC-1-0
    containingProjects: 1
        /home/src/workspaces/project/c/tsconfig.json *default*

DocumentPositionMappers::
DocumentPositionMapper1 *new*
