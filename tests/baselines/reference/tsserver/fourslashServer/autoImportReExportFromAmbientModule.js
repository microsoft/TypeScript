Info seq  [hh:mm:ss:mss] currentDirectory:: /home/src/Vscode/Projects/bin useCaseSensitiveFileNames:: false
Info seq  [hh:mm:ss:mss] libs Location:: /home/src/tslibs/TS/Lib
Info seq  [hh:mm:ss:mss] globalTypingsCacheLocation:: /home/src/Library/Caches/typescript
Info seq  [hh:mm:ss:mss] request:
    {
      "seq": 0,
      "type": "request",
      "arguments": {
        "options": {
          "module": "commonjs",
          "target": "es5",
          "newLine": "crlf",
          "skipDefaultLibCheck": true
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
//// [/home/src/workspaces/project/index.ts]
access

//// [/home/src/workspaces/project/node_modules/@types/fs-extra/index.d.ts]
export * from "fs";

//// [/home/src/workspaces/project/node_modules/@types/node/index.d.ts]
declare module "fs" {
  export function accessSync(path: string): void;
}

//// [/home/src/workspaces/project/tsconfig.json]
{
  "compilerOptions": {
    "module": "commonjs",

//// [/tests/cases/fourslash/server/autoImportReExportFromAmbientModule.ts]
  }
}


Info seq  [hh:mm:ss:mss] request:
    {
      "seq": 1,
      "type": "request",
      "arguments": {
        "file": "/home/src/workspaces/project/tsconfig.json"
      },
      "command": "open"
    }
Info seq  [hh:mm:ss:mss] getConfigFileNameForFile:: File: /home/src/workspaces/project/tsconfig.json ProjectRootPath: undefined:: Result: /home/src/workspaces/project/tsconfig.json
Info seq  [hh:mm:ss:mss] Creating ConfiguredProject: /home/src/workspaces/project/tsconfig.json, currentDirectory: /home/src/workspaces/project
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/workspaces/project/tsconfig.json 2000 undefined Project: /home/src/workspaces/project/tsconfig.json WatchType: Config file
Info seq  [hh:mm:ss:mss] Config: /home/src/workspaces/project/tsconfig.json : {
 "rootNames": [
  "/home/src/workspaces/project/index.ts"
 ],
 "options": {
  "module": 1,
  "configFilePath": "/home/src/workspaces/project/tsconfig.json"
 }
}
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "projectLoadingStart",
      "body": {
        "projectName": "/home/src/workspaces/project/tsconfig.json",
        "reason": "Creating possible configured project for /home/src/workspaces/project/tsconfig.json to open"
      }
    }
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /home/src/workspaces/project 1 undefined Config: /home/src/workspaces/project/tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /home/src/workspaces/project 1 undefined Config: /home/src/workspaces/project/tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/workspaces/project/index.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: /home/src/workspaces/project/tsconfig.json
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/tslibs/TS/Lib/lib.d.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/tslibs/TS/Lib/lib.es5.d.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/tslibs/TS/Lib/lib.decorators.d.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/tslibs/TS/Lib/lib.decorators.legacy.d.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/tslibs/TS/Lib/lib.dom.d.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/tslibs/TS/Lib/lib.es2015.d.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/tslibs/TS/Lib/lib.es2015.core.d.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/tslibs/TS/Lib/lib.es2015.collection.d.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/tslibs/TS/Lib/lib.es2015.iterable.d.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/tslibs/TS/Lib/lib.es2015.symbol.d.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/tslibs/TS/Lib/lib.es2015.generator.d.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/tslibs/TS/Lib/lib.es2015.promise.d.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/tslibs/TS/Lib/lib.es2015.proxy.d.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/tslibs/TS/Lib/lib.es2015.reflect.d.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/tslibs/TS/Lib/lib.es2015.symbol.wellknown.d.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/tslibs/TS/Lib/lib.es2018.asynciterable.d.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/tslibs/TS/Lib/lib.webworker.importscripts.d.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/tslibs/TS/Lib/lib.scripthost.d.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: /home/src/workspaces/project/tsconfig.json projectStateVersion: 1 projectProgramVersion: 0 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Project '/home/src/workspaces/project/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (19)
	/home/src/tslibs/TS/Lib/lib.d.ts Text-1 lib.d.ts-Text
	/home/src/tslibs/TS/Lib/lib.es5.d.ts Text-1 lib.es5.d.ts-Text
	/home/src/tslibs/TS/Lib/lib.es2015.d.ts Text-1 lib.es2015.d.ts-Text
	/home/src/tslibs/TS/Lib/lib.dom.d.ts Text-1 lib.dom.d.ts-Text
	/home/src/tslibs/TS/Lib/lib.webworker.importscripts.d.ts Text-1 lib.webworker.importscripts.d.ts-Text
	/home/src/tslibs/TS/Lib/lib.scripthost.d.ts Text-1 lib.scripthost.d.ts-Text
	/home/src/tslibs/TS/Lib/lib.es2015.core.d.ts Text-1 lib.es2015.core.d.ts-Text
	/home/src/tslibs/TS/Lib/lib.es2015.collection.d.ts Text-1 lib.es2015.collection.d.ts-Text
	/home/src/tslibs/TS/Lib/lib.es2015.generator.d.ts Text-1 lib.es2015.generator.d.ts-Text
	/home/src/tslibs/TS/Lib/lib.es2015.iterable.d.ts Text-1 lib.es2015.iterable.d.ts-Text
	/home/src/tslibs/TS/Lib/lib.es2015.promise.d.ts Text-1 lib.es2015.promise.d.ts-Text
	/home/src/tslibs/TS/Lib/lib.es2015.proxy.d.ts Text-1 lib.es2015.proxy.d.ts-Text
	/home/src/tslibs/TS/Lib/lib.es2015.reflect.d.ts Text-1 lib.es2015.reflect.d.ts-Text
	/home/src/tslibs/TS/Lib/lib.es2015.symbol.d.ts Text-1 lib.es2015.symbol.d.ts-Text
	/home/src/tslibs/TS/Lib/lib.es2015.symbol.wellknown.d.ts Text-1 lib.es2015.symbol.wellknown.d.ts-Text
	/home/src/tslibs/TS/Lib/lib.es2018.asynciterable.d.ts Text-1 lib.es2018.asynciterable.d.ts-Text
	/home/src/tslibs/TS/Lib/lib.decorators.d.ts Text-1 lib.decorators.d.ts-Text
	/home/src/tslibs/TS/Lib/lib.decorators.legacy.d.ts Text-1 lib.decorators.legacy.d.ts-Text
	/home/src/workspaces/project/index.ts Text-1 "access"


	../../tslibs/TS/Lib/lib.d.ts
	  Default library for target 'es5'
	../../tslibs/TS/Lib/lib.es5.d.ts
	  Library referenced via 'es5' from file '../../tslibs/TS/Lib/lib.d.ts'
	  Library referenced via 'es5' from file '../../tslibs/TS/Lib/lib.es2015.d.ts'
	../../tslibs/TS/Lib/lib.es2015.d.ts
	  Library referenced via 'es2015' from file '../../tslibs/TS/Lib/lib.dom.d.ts'
	../../tslibs/TS/Lib/lib.dom.d.ts
	  Library referenced via 'dom' from file '../../tslibs/TS/Lib/lib.d.ts'
	../../tslibs/TS/Lib/lib.webworker.importscripts.d.ts
	  Library referenced via 'webworker.importscripts' from file '../../tslibs/TS/Lib/lib.d.ts'
	../../tslibs/TS/Lib/lib.scripthost.d.ts
	  Library referenced via 'scripthost' from file '../../tslibs/TS/Lib/lib.d.ts'
	../../tslibs/TS/Lib/lib.es2015.core.d.ts
	  Library referenced via 'es2015.core' from file '../../tslibs/TS/Lib/lib.es2015.d.ts'
	../../tslibs/TS/Lib/lib.es2015.collection.d.ts
	  Library referenced via 'es2015.collection' from file '../../tslibs/TS/Lib/lib.es2015.d.ts'
	../../tslibs/TS/Lib/lib.es2015.generator.d.ts
	  Library referenced via 'es2015.generator' from file '../../tslibs/TS/Lib/lib.es2015.d.ts'
	../../tslibs/TS/Lib/lib.es2015.iterable.d.ts
	  Library referenced via 'es2015.iterable' from file '../../tslibs/TS/Lib/lib.es2015.d.ts'
	  Library referenced via 'es2015.iterable' from file '../../tslibs/TS/Lib/lib.es2015.generator.d.ts'
	  Library referenced via 'es2015.iterable' from file '../../tslibs/TS/Lib/lib.es2018.asynciterable.d.ts'
	../../tslibs/TS/Lib/lib.es2015.promise.d.ts
	  Library referenced via 'es2015.promise' from file '../../tslibs/TS/Lib/lib.es2015.d.ts'
	../../tslibs/TS/Lib/lib.es2015.proxy.d.ts
	  Library referenced via 'es2015.proxy' from file '../../tslibs/TS/Lib/lib.es2015.d.ts'
	../../tslibs/TS/Lib/lib.es2015.reflect.d.ts
	  Library referenced via 'es2015.reflect' from file '../../tslibs/TS/Lib/lib.es2015.d.ts'
	../../tslibs/TS/Lib/lib.es2015.symbol.d.ts
	  Library referenced via 'es2015.symbol' from file '../../tslibs/TS/Lib/lib.es2015.iterable.d.ts'
	  Library referenced via 'es2015.symbol' from file '../../tslibs/TS/Lib/lib.es2015.d.ts'
	  Library referenced via 'es2015.symbol' from file '../../tslibs/TS/Lib/lib.es2015.symbol.wellknown.d.ts'
	  Library referenced via 'es2015.symbol' from file '../../tslibs/TS/Lib/lib.es2018.asynciterable.d.ts'
	../../tslibs/TS/Lib/lib.es2015.symbol.wellknown.d.ts
	  Library referenced via 'es2015.symbol.wellknown' from file '../../tslibs/TS/Lib/lib.es2015.d.ts'
	../../tslibs/TS/Lib/lib.es2018.asynciterable.d.ts
	  Library referenced via 'es2018.asynciterable' from file '../../tslibs/TS/Lib/lib.dom.d.ts'
	../../tslibs/TS/Lib/lib.decorators.d.ts
	  Library referenced via 'decorators' from file '../../tslibs/TS/Lib/lib.es5.d.ts'
	../../tslibs/TS/Lib/lib.decorators.legacy.d.ts
	  Library referenced via 'decorators.legacy' from file '../../tslibs/TS/Lib/lib.es5.d.ts'
	index.ts
	  Matched by default include pattern '**/*'

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "projectLoadingFinish",
      "body": {
        "projectName": "/home/src/workspaces/project/tsconfig.json"
      }
    }
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "configFileDiag",
      "body": {
        "triggerFile": "/home/src/workspaces/project/tsconfig.json",
        "configFile": "/home/src/workspaces/project/tsconfig.json",
        "diagnostics": [
          {
            "start": {
              "line": 3,
              "offset": 26
            },
            "end": {
              "line": 3,
              "offset": 26
            },
            "text": "'}' expected.",
            "code": 1005,
            "category": "error",
            "relatedInformation": [
              {
                "span": {
                  "start": {
                    "line": 2,
                    "offset": 22
                  },
                  "end": {
                    "line": 2,
                    "offset": 23
                  },
                  "file": "/home/src/workspaces/project/tsconfig.json"
                },
                "message": "The parser expected to find a '}' to match the '{' token here.",
                "category": "error",
                "code": 1007
              }
            ],
            "fileName": "/home/src/workspaces/project/tsconfig.json"
          }
        ]
      }
    }
Info seq  [hh:mm:ss:mss] getConfigFileNameForFile:: File: /home/src/workspaces/project/tsconfig.json ProjectRootPath: undefined:: Result: undefined
Info seq  [hh:mm:ss:mss] Creating InferredProject: /dev/null/inferredProject1*, currentDirectory: /home/src/workspaces/project
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/workspaces/project/jsconfig.json 2000 undefined WatchType: Config file for the inferred project root
Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: /dev/null/inferredProject1*
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: /dev/null/inferredProject1* projectStateVersion: 1 projectProgramVersion: 0 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Project '/dev/null/inferredProject1*' (Inferred)
Info seq  [hh:mm:ss:mss] 	Files (19)
	/home/src/tslibs/TS/Lib/lib.d.ts Text-1 lib.d.ts-Text
	/home/src/tslibs/TS/Lib/lib.es5.d.ts Text-1 lib.es5.d.ts-Text
	/home/src/tslibs/TS/Lib/lib.es2015.d.ts Text-1 lib.es2015.d.ts-Text
	/home/src/tslibs/TS/Lib/lib.dom.d.ts Text-1 lib.dom.d.ts-Text
	/home/src/tslibs/TS/Lib/lib.webworker.importscripts.d.ts Text-1 lib.webworker.importscripts.d.ts-Text
	/home/src/tslibs/TS/Lib/lib.scripthost.d.ts Text-1 lib.scripthost.d.ts-Text
	/home/src/tslibs/TS/Lib/lib.es2015.core.d.ts Text-1 lib.es2015.core.d.ts-Text
	/home/src/tslibs/TS/Lib/lib.es2015.collection.d.ts Text-1 lib.es2015.collection.d.ts-Text
	/home/src/tslibs/TS/Lib/lib.es2015.generator.d.ts Text-1 lib.es2015.generator.d.ts-Text
	/home/src/tslibs/TS/Lib/lib.es2015.iterable.d.ts Text-1 lib.es2015.iterable.d.ts-Text
	/home/src/tslibs/TS/Lib/lib.es2015.promise.d.ts Text-1 lib.es2015.promise.d.ts-Text
	/home/src/tslibs/TS/Lib/lib.es2015.proxy.d.ts Text-1 lib.es2015.proxy.d.ts-Text
	/home/src/tslibs/TS/Lib/lib.es2015.reflect.d.ts Text-1 lib.es2015.reflect.d.ts-Text
	/home/src/tslibs/TS/Lib/lib.es2015.symbol.d.ts Text-1 lib.es2015.symbol.d.ts-Text
	/home/src/tslibs/TS/Lib/lib.es2015.symbol.wellknown.d.ts Text-1 lib.es2015.symbol.wellknown.d.ts-Text
	/home/src/tslibs/TS/Lib/lib.es2018.asynciterable.d.ts Text-1 lib.es2018.asynciterable.d.ts-Text
	/home/src/tslibs/TS/Lib/lib.decorators.d.ts Text-1 lib.decorators.d.ts-Text
	/home/src/tslibs/TS/Lib/lib.decorators.legacy.d.ts Text-1 lib.decorators.legacy.d.ts-Text
	/home/src/workspaces/project/tsconfig.json SVC-1-0 "{\n  \"compilerOptions\": {\n    \"module\": \"commonjs\","


	../../tslibs/TS/Lib/lib.d.ts
	  Default library for target 'es5'
	../../tslibs/TS/Lib/lib.es5.d.ts
	  Library referenced via 'es5' from file '../../tslibs/TS/Lib/lib.d.ts'
	  Library referenced via 'es5' from file '../../tslibs/TS/Lib/lib.es2015.d.ts'
	../../tslibs/TS/Lib/lib.es2015.d.ts
	  Library referenced via 'es2015' from file '../../tslibs/TS/Lib/lib.dom.d.ts'
	../../tslibs/TS/Lib/lib.dom.d.ts
	  Library referenced via 'dom' from file '../../tslibs/TS/Lib/lib.d.ts'
	../../tslibs/TS/Lib/lib.webworker.importscripts.d.ts
	  Library referenced via 'webworker.importscripts' from file '../../tslibs/TS/Lib/lib.d.ts'
	../../tslibs/TS/Lib/lib.scripthost.d.ts
	  Library referenced via 'scripthost' from file '../../tslibs/TS/Lib/lib.d.ts'
	../../tslibs/TS/Lib/lib.es2015.core.d.ts
	  Library referenced via 'es2015.core' from file '../../tslibs/TS/Lib/lib.es2015.d.ts'
	../../tslibs/TS/Lib/lib.es2015.collection.d.ts
	  Library referenced via 'es2015.collection' from file '../../tslibs/TS/Lib/lib.es2015.d.ts'
	../../tslibs/TS/Lib/lib.es2015.generator.d.ts
	  Library referenced via 'es2015.generator' from file '../../tslibs/TS/Lib/lib.es2015.d.ts'
	../../tslibs/TS/Lib/lib.es2015.iterable.d.ts
	  Library referenced via 'es2015.iterable' from file '../../tslibs/TS/Lib/lib.es2015.d.ts'
	  Library referenced via 'es2015.iterable' from file '../../tslibs/TS/Lib/lib.es2015.generator.d.ts'
	  Library referenced via 'es2015.iterable' from file '../../tslibs/TS/Lib/lib.es2018.asynciterable.d.ts'
	../../tslibs/TS/Lib/lib.es2015.promise.d.ts
	  Library referenced via 'es2015.promise' from file '../../tslibs/TS/Lib/lib.es2015.d.ts'
	../../tslibs/TS/Lib/lib.es2015.proxy.d.ts
	  Library referenced via 'es2015.proxy' from file '../../tslibs/TS/Lib/lib.es2015.d.ts'
	../../tslibs/TS/Lib/lib.es2015.reflect.d.ts
	  Library referenced via 'es2015.reflect' from file '../../tslibs/TS/Lib/lib.es2015.d.ts'
	../../tslibs/TS/Lib/lib.es2015.symbol.d.ts
	  Library referenced via 'es2015.symbol' from file '../../tslibs/TS/Lib/lib.es2015.iterable.d.ts'
	  Library referenced via 'es2015.symbol' from file '../../tslibs/TS/Lib/lib.es2015.d.ts'
	  Library referenced via 'es2015.symbol' from file '../../tslibs/TS/Lib/lib.es2015.symbol.wellknown.d.ts'
	  Library referenced via 'es2015.symbol' from file '../../tslibs/TS/Lib/lib.es2018.asynciterable.d.ts'
	../../tslibs/TS/Lib/lib.es2015.symbol.wellknown.d.ts
	  Library referenced via 'es2015.symbol.wellknown' from file '../../tslibs/TS/Lib/lib.es2015.d.ts'
	../../tslibs/TS/Lib/lib.es2018.asynciterable.d.ts
	  Library referenced via 'es2018.asynciterable' from file '../../tslibs/TS/Lib/lib.dom.d.ts'
	../../tslibs/TS/Lib/lib.decorators.d.ts
	  Library referenced via 'decorators' from file '../../tslibs/TS/Lib/lib.es5.d.ts'
	../../tslibs/TS/Lib/lib.decorators.legacy.d.ts
	  Library referenced via 'decorators.legacy' from file '../../tslibs/TS/Lib/lib.es5.d.ts'
	tsconfig.json
	  Root file specified for compilation

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Project '/home/src/workspaces/project/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (19)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Project '/dev/null/inferredProject1*' (Inferred)
Info seq  [hh:mm:ss:mss] 	Files (19)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: /home/src/workspaces/project/tsconfig.json ProjectRootPath: undefined
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
/home/src/tslibs/TS/Lib/lib.d.ts: *new*
  {"pollingInterval":500}
/home/src/tslibs/TS/Lib/lib.decorators.d.ts: *new*
  {"pollingInterval":500}
/home/src/tslibs/TS/Lib/lib.decorators.legacy.d.ts: *new*
  {"pollingInterval":500}
/home/src/tslibs/TS/Lib/lib.dom.d.ts: *new*
  {"pollingInterval":500}
/home/src/tslibs/TS/Lib/lib.es2015.collection.d.ts: *new*
  {"pollingInterval":500}
/home/src/tslibs/TS/Lib/lib.es2015.core.d.ts: *new*
  {"pollingInterval":500}
/home/src/tslibs/TS/Lib/lib.es2015.d.ts: *new*
  {"pollingInterval":500}
/home/src/tslibs/TS/Lib/lib.es2015.generator.d.ts: *new*
  {"pollingInterval":500}
/home/src/tslibs/TS/Lib/lib.es2015.iterable.d.ts: *new*
  {"pollingInterval":500}
/home/src/tslibs/TS/Lib/lib.es2015.promise.d.ts: *new*
  {"pollingInterval":500}
/home/src/tslibs/TS/Lib/lib.es2015.proxy.d.ts: *new*
  {"pollingInterval":500}
/home/src/tslibs/TS/Lib/lib.es2015.reflect.d.ts: *new*
  {"pollingInterval":500}
/home/src/tslibs/TS/Lib/lib.es2015.symbol.d.ts: *new*
  {"pollingInterval":500}
/home/src/tslibs/TS/Lib/lib.es2015.symbol.wellknown.d.ts: *new*
  {"pollingInterval":500}
/home/src/tslibs/TS/Lib/lib.es2018.asynciterable.d.ts: *new*
  {"pollingInterval":500}
/home/src/tslibs/TS/Lib/lib.es5.d.ts: *new*
  {"pollingInterval":500}
/home/src/tslibs/TS/Lib/lib.scripthost.d.ts: *new*
  {"pollingInterval":500}
/home/src/tslibs/TS/Lib/lib.webworker.importscripts.d.ts: *new*
  {"pollingInterval":500}
/home/src/workspaces/project/index.ts: *new*
  {"pollingInterval":500}
/home/src/workspaces/project/jsconfig.json: *new*
  {"pollingInterval":2000}
/home/src/workspaces/project/tsconfig.json: *new*
  {"pollingInterval":2000}

watchedDirectoriesRecursive::
/home/src/workspaces/project: *new*
  {}

Projects::
/dev/null/inferredProject1* (Inferred) *new*
    projectStateVersion: 1
    projectProgramVersion: 1
    autoImportProviderHost: false
/home/src/workspaces/project/tsconfig.json (Configured) *new*
    projectStateVersion: 1
    projectProgramVersion: 1
    noOpenRef: true

ScriptInfos::
/home/src/tslibs/TS/Lib/lib.d.ts *new*
    version: Text-1
    containingProjects: 2
        /home/src/workspaces/project/tsconfig.json
        /dev/null/inferredProject1*
/home/src/tslibs/TS/Lib/lib.decorators.d.ts *new*
    version: Text-1
    containingProjects: 2
        /home/src/workspaces/project/tsconfig.json
        /dev/null/inferredProject1*
/home/src/tslibs/TS/Lib/lib.decorators.legacy.d.ts *new*
    version: Text-1
    containingProjects: 2
        /home/src/workspaces/project/tsconfig.json
        /dev/null/inferredProject1*
/home/src/tslibs/TS/Lib/lib.dom.d.ts *new*
    version: Text-1
    containingProjects: 2
        /home/src/workspaces/project/tsconfig.json
        /dev/null/inferredProject1*
/home/src/tslibs/TS/Lib/lib.es2015.collection.d.ts *new*
    version: Text-1
    containingProjects: 2
        /home/src/workspaces/project/tsconfig.json
        /dev/null/inferredProject1*
/home/src/tslibs/TS/Lib/lib.es2015.core.d.ts *new*
    version: Text-1
    containingProjects: 2
        /home/src/workspaces/project/tsconfig.json
        /dev/null/inferredProject1*
/home/src/tslibs/TS/Lib/lib.es2015.d.ts *new*
    version: Text-1
    containingProjects: 2
        /home/src/workspaces/project/tsconfig.json
        /dev/null/inferredProject1*
/home/src/tslibs/TS/Lib/lib.es2015.generator.d.ts *new*
    version: Text-1
    containingProjects: 2
        /home/src/workspaces/project/tsconfig.json
        /dev/null/inferredProject1*
/home/src/tslibs/TS/Lib/lib.es2015.iterable.d.ts *new*
    version: Text-1
    containingProjects: 2
        /home/src/workspaces/project/tsconfig.json
        /dev/null/inferredProject1*
/home/src/tslibs/TS/Lib/lib.es2015.promise.d.ts *new*
    version: Text-1
    containingProjects: 2
        /home/src/workspaces/project/tsconfig.json
        /dev/null/inferredProject1*
/home/src/tslibs/TS/Lib/lib.es2015.proxy.d.ts *new*
    version: Text-1
    containingProjects: 2
        /home/src/workspaces/project/tsconfig.json
        /dev/null/inferredProject1*
/home/src/tslibs/TS/Lib/lib.es2015.reflect.d.ts *new*
    version: Text-1
    containingProjects: 2
        /home/src/workspaces/project/tsconfig.json
        /dev/null/inferredProject1*
/home/src/tslibs/TS/Lib/lib.es2015.symbol.d.ts *new*
    version: Text-1
    containingProjects: 2
        /home/src/workspaces/project/tsconfig.json
        /dev/null/inferredProject1*
/home/src/tslibs/TS/Lib/lib.es2015.symbol.wellknown.d.ts *new*
    version: Text-1
    containingProjects: 2
        /home/src/workspaces/project/tsconfig.json
        /dev/null/inferredProject1*
/home/src/tslibs/TS/Lib/lib.es2018.asynciterable.d.ts *new*
    version: Text-1
    containingProjects: 2
        /home/src/workspaces/project/tsconfig.json
        /dev/null/inferredProject1*
/home/src/tslibs/TS/Lib/lib.es5.d.ts *new*
    version: Text-1
    containingProjects: 2
        /home/src/workspaces/project/tsconfig.json
        /dev/null/inferredProject1*
/home/src/tslibs/TS/Lib/lib.scripthost.d.ts *new*
    version: Text-1
    containingProjects: 2
        /home/src/workspaces/project/tsconfig.json
        /dev/null/inferredProject1*
/home/src/tslibs/TS/Lib/lib.webworker.importscripts.d.ts *new*
    version: Text-1
    containingProjects: 2
        /home/src/workspaces/project/tsconfig.json
        /dev/null/inferredProject1*
/home/src/workspaces/project/index.ts *new*
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/tsconfig.json (Open) *new*
    version: SVC-1-0
    containingProjects: 1
        /dev/null/inferredProject1* *default*
