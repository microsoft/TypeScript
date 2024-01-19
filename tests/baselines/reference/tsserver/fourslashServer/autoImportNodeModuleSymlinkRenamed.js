currentDirectory:: / useCaseSensitiveFileNames: false
Info seq  [hh:mm:ss:mss] Provided types map file "/typesMap.json" doesn't exist
//// [/lib.d.ts]
lib.d.ts-Text

//// [/lib.decorators.d.ts]
lib.decorators.d.ts-Text

//// [/lib.decorators.legacy.d.ts]
lib.decorators.legacy.d.ts-Text

//// [/node_modules/@monorepo/utils] symlink(/packages/utils)
//// [/node_modules/utils] symlink(/packages/utils)
//// [/node_modules/web] symlink(/packages/web)
//// [/package.json]
{
    "name": "monorepo",
    "workspaces": ["packages/*"]
}

//// [/packages/utils/package.json]
{
    "name": "utils",
    "version": "1.0.0",
    "exports": "./dist/index.js"
}

//// [/packages/utils/src/index.ts]
export function gainUtility() { return 0; }

//// [/packages/utils/tsconfig.json]
{
    "compilerOptions": {
        "composite": true,
        "module": "nodenext",
        "rootDir": "src",
        "outDir": "dist"
    },
    "include": ["src"]
}

//// [/packages/web/package.json]
{
    "name": "web",
    "version": "1.0.0",
    "dependencies": {
        "@monorepo/utils": "file:../utils"
    }
}

//// [/packages/web/src/index.ts]
gainUtility

//// [/packages/web/tsconfig.json]
{
    "compilerOptions": {
        "composite": true,
        "module": "esnext",
        "moduleResolution": "bundler",
        "rootDir": "src",
        "outDir": "dist",
        "emitDeclarationOnly": true
    },
    "include": ["src"],
    "references": [
        { "path": "../utils" }
    ]
}


Info seq  [hh:mm:ss:mss] request:
    {
      "seq": 0,
      "type": "request",
      "arguments": {
        "file": "/package.json"
      },
      "command": "open"
    }
Info seq  [hh:mm:ss:mss] Search path: /
Info seq  [hh:mm:ss:mss] For info: /package.json :: No config files found.
Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: /dev/null/inferredProject1*
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /lib.d.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /lib.decorators.d.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /lib.decorators.legacy.d.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: /dev/null/inferredProject1* Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Project '/dev/null/inferredProject1*' (Inferred)
Info seq  [hh:mm:ss:mss] 	Files (4)
	/lib.d.ts Text-1 lib.d.ts-Text
	/lib.decorators.d.ts Text-1 lib.decorators.d.ts-Text
	/lib.decorators.legacy.d.ts Text-1 lib.decorators.legacy.d.ts-Text
	/package.json SVC-1-0 "{\n    \"name\": \"monorepo\",\n    \"workspaces\": [\"packages/*\"]\n}"


	lib.d.ts
	  Default library for target 'es5'
	lib.decorators.d.ts
	  Library referenced via 'decorators' from file 'lib.d.ts'
	lib.decorators.legacy.d.ts
	  Library referenced via 'decorators.legacy' from file 'lib.d.ts'
	package.json
	  Root file specified for compilation

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /package.json 250 undefined WatchType: package.json file
Info seq  [hh:mm:ss:mss] Project '/dev/null/inferredProject1*' (Inferred)
Info seq  [hh:mm:ss:mss] 	Files (4)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: /package.json ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /dev/null/inferredProject1*
After Request
watchedFiles::
/lib.d.ts: *new*
  {"pollingInterval":500}
/lib.decorators.d.ts: *new*
  {"pollingInterval":500}
/lib.decorators.legacy.d.ts: *new*
  {"pollingInterval":500}
/package.json: *new*
  {"pollingInterval":250}

Info seq  [hh:mm:ss:mss] request:
    {
      "seq": 1,
      "type": "request",
      "arguments": {
        "file": "/packages/web/src/index.ts"
      },
      "command": "open"
    }
Info seq  [hh:mm:ss:mss] Search path: /packages/web/src
Info seq  [hh:mm:ss:mss] For info: /packages/web/src/index.ts :: Config file name: /packages/web/tsconfig.json
Info seq  [hh:mm:ss:mss] Creating configuration project /packages/web/tsconfig.json
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /packages/web/tsconfig.json 2000 undefined Project: /packages/web/tsconfig.json WatchType: Config file
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "projectLoadingStart",
      "body": {
        "projectName": "/packages/web/tsconfig.json",
        "reason": "Creating possible configured project for /packages/web/src/index.ts to open"
      }
    }
Info seq  [hh:mm:ss:mss] Config: /packages/web/tsconfig.json : {
 "rootNames": [
  "/packages/web/src/index.ts"
 ],
 "options": {
  "composite": true,
  "module": 99,
  "moduleResolution": 100,
  "rootDir": "/packages/web/src",
  "outDir": "/packages/web/dist",
  "emitDeclarationOnly": true,
  "configFilePath": "/packages/web/tsconfig.json"
 },
 "projectReferences": [
  {
   "path": "/packages/utils",
   "originalPath": "../utils"
  }
 ]
}
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /packages/web/src 1 undefined Config: /packages/web/tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /packages/web/src 1 undefined Config: /packages/web/tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: /packages/web/tsconfig.json
Info seq  [hh:mm:ss:mss] Config: /packages/utils/tsconfig.json : {
 "rootNames": [
  "/packages/utils/src/index.ts"
 ],
 "options": {
  "composite": true,
  "module": 199,
  "rootDir": "/packages/utils/src",
  "outDir": "/packages/utils/dist",
  "configFilePath": "/packages/utils/tsconfig.json"
 }
}
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /packages/utils/tsconfig.json 2000 undefined Project: /packages/web/tsconfig.json WatchType: Config file
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /packages/utils/src 1 undefined Config: /packages/utils/tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /packages/utils/src 1 undefined Config: /packages/utils/tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: /packages/web/tsconfig.json Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Project '/packages/web/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (4)
	/lib.d.ts Text-1 lib.d.ts-Text
	/lib.decorators.d.ts Text-1 lib.decorators.d.ts-Text
	/lib.decorators.legacy.d.ts Text-1 lib.decorators.legacy.d.ts-Text
	/packages/web/src/index.ts SVC-1-0 "gainUtility"


	../../lib.d.ts
	  Default library for target 'es5'
	../../lib.decorators.d.ts
	  Library referenced via 'decorators' from file '../../lib.d.ts'
	../../lib.decorators.legacy.d.ts
	  Library referenced via 'decorators.legacy' from file '../../lib.d.ts'
	src/index.ts
	  Matched by include pattern 'src' in 'tsconfig.json'

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /packages/web/package.json 250 undefined WatchType: package.json file
Info seq  [hh:mm:ss:mss] AutoImportProviderProject: found 1 root files in 1 dependencies in * ms
Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: /dev/null/autoImportProviderProject1*
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /packages/utils/src/index.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: /dev/null/autoImportProviderProject1* Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Project '/dev/null/autoImportProviderProject1*' (AutoImportProvider)
Info seq  [hh:mm:ss:mss] 	Files (1)
	/packages/utils/src/index.ts Text-1 "export function gainUtility() { return 0; }"


	../utils/src/index.ts
	  Root file specified for compilation

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "projectLoadingFinish",
      "body": {
        "projectName": "/packages/web/tsconfig.json"
      }
    }
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "configFileDiag",
      "body": {
        "triggerFile": "/packages/web/src/index.ts",
        "configFile": "/packages/web/tsconfig.json",
        "diagnostics": []
      }
    }
Info seq  [hh:mm:ss:mss] Search path: /packages/web
Info seq  [hh:mm:ss:mss] For info: /packages/web/tsconfig.json :: No config files found.
Info seq  [hh:mm:ss:mss] Project '/packages/web/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (4)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Project '/dev/null/autoImportProviderProject1*' (AutoImportProvider)
Info seq  [hh:mm:ss:mss] 	Files (1)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Project '/dev/null/inferredProject1*' (Inferred)
Info seq  [hh:mm:ss:mss] 	Files (4)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: /package.json ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /dev/null/inferredProject1*
Info seq  [hh:mm:ss:mss] 	FileName: /packages/web/src/index.ts ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /packages/web/tsconfig.json
After Request
watchedFiles::
/lib.d.ts:
  {"pollingInterval":500}
/lib.decorators.d.ts:
  {"pollingInterval":500}
/lib.decorators.legacy.d.ts:
  {"pollingInterval":500}
/package.json:
  {"pollingInterval":250}
/packages/utils/src/index.ts: *new*
  {"pollingInterval":500}
/packages/utils/tsconfig.json: *new*
  {"pollingInterval":2000}
/packages/web/package.json: *new*
  {"pollingInterval":250}
/packages/web/tsconfig.json: *new*
  {"pollingInterval":2000}

watchedDirectoriesRecursive::
/packages/utils/src: *new*
  {}
/packages/web/src: *new*
  {}

Info seq  [hh:mm:ss:mss] request:
    {
      "seq": 2,
      "type": "request",
      "arguments": {
        "preferences": {
          "includeCompletionsForModuleExports": true,
          "includeCompletionsWithInsertText": true
        }
      },
      "command": "configure"
    }
Info seq  [hh:mm:ss:mss] response:
    {
      "seq": 0,
      "type": "response",
      "command": "configure",
      "request_seq": 2,
      "success": true
    }
Info seq  [hh:mm:ss:mss] request:
    {
      "seq": 3,
      "type": "request",
      "arguments": {
        "file": "/packages/web/src/index.ts",
        "includeLinePosition": true
      },
      "command": "syntacticDiagnosticsSync"
    }
Info seq  [hh:mm:ss:mss] response:
    {
      "seq": 0,
      "type": "response",
      "command": "syntacticDiagnosticsSync",
      "request_seq": 3,
      "success": true,
      "body": []
    }
Info seq  [hh:mm:ss:mss] request:
    {
      "seq": 4,
      "type": "request",
      "arguments": {
        "file": "/packages/web/src/index.ts",
        "includeLinePosition": true
      },
      "command": "semanticDiagnosticsSync"
    }
Info seq  [hh:mm:ss:mss] response:
    {
      "seq": 0,
      "type": "response",
      "command": "semanticDiagnosticsSync",
      "request_seq": 4,
      "success": true,
      "body": [
        {
          "message": "Cannot find name 'gainUtility'.",
          "start": 0,
          "length": 11,
          "category": "error",
          "code": 2304,
          "startLocation": {
            "line": 1,
            "offset": 1
          },
          "endLocation": {
            "line": 1,
            "offset": 12
          }
        }
      ]
    }
Info seq  [hh:mm:ss:mss] request:
    {
      "seq": 5,
      "type": "request",
      "arguments": {
        "file": "/packages/web/src/index.ts",
        "includeLinePosition": true
      },
      "command": "suggestionDiagnosticsSync"
    }
Info seq  [hh:mm:ss:mss] response:
    {
      "seq": 0,
      "type": "response",
      "command": "suggestionDiagnosticsSync",
      "request_seq": 5,
      "success": true,
      "body": []
    }
Info seq  [hh:mm:ss:mss] request:
    {
      "seq": 6,
      "type": "request",
      "arguments": {
        "file": "/packages/web/src/index.ts",
        "startLine": 1,
        "startOffset": 1,
        "endLine": 1,
        "endOffset": 12,
        "errorCodes": [
          2304
        ]
      },
      "command": "getCodeFixes"
    }
Info seq  [hh:mm:ss:mss] forEachExternalModuleToImportFrom autoImportProvider: *
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /node_modules 1 undefined WatchType: node_modules for closed script infos and package.jsons affecting module specifier cache
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /node_modules 1 undefined WatchType: node_modules for closed script infos and package.jsons affecting module specifier cache
Info seq  [hh:mm:ss:mss] response:
    {
      "seq": 0,
      "type": "response",
      "command": "getCodeFixes",
      "request_seq": 6,
      "success": true,
      "body": [
        {
          "fixName": "import",
          "description": "Add import from \"@monorepo/utils\"",
          "changes": [
            {
              "fileName": "/packages/web/src/index.ts",
              "textChanges": [
                {
                  "start": {
                    "line": 1,
                    "offset": 1
                  },
                  "end": {
                    "line": 1,
                    "offset": 1
                  },
                  "newText": "import { gainUtility } from \"@monorepo/utils\";\r\n\r\n"
                }
              ]
            }
          ]
        }
      ]
    }
After Request
watchedFiles::
/lib.d.ts:
  {"pollingInterval":500}
/lib.decorators.d.ts:
  {"pollingInterval":500}
/lib.decorators.legacy.d.ts:
  {"pollingInterval":500}
/package.json:
  {"pollingInterval":250}
/packages/utils/src/index.ts:
  {"pollingInterval":500}
/packages/utils/tsconfig.json:
  {"pollingInterval":2000}
/packages/web/package.json:
  {"pollingInterval":250}
/packages/web/tsconfig.json:
  {"pollingInterval":2000}

watchedDirectoriesRecursive::
/node_modules: *new*
  {}
/packages/utils/src:
  {}
/packages/web/src:
  {}
