currentDirectory:: C:/ useCaseSensitiveFileNames: false
Info seq  [hh:mm:ss:mss] Provided types map file "/typesMap.json" doesn't exist
Before request
//// [C:/temp/replay/axios-src/lib/core/AxiosHeaders.js]
export const b = 10;



//// [C:/temp/replay/axios-src/lib/core/dispatchRequest.js]
import { b } from "./AxiosHeaders.js";
import { b2 } from "./settle.js";
import { x } from "follow-redirects";
export const y = 10;


//// [C:/temp/replay/axios-src/lib/core/mergeConfig.js]
import { b } from "./AxiosHeaders.js";
export const y = 10;


//// [C:/temp/replay/axios-src/lib/core/settle.js]
export const b2 = 10;


//// [C:/temp/replay/axios-src/package.json]
{
  "name": "axios",
  "version": "1.4.0",
  "dependencies": {
    "follow-redirects": "^1.15.0"
  }
}

//// [C:/temp/replay/axios-src/node_modules/follow-redirects/package.json]
{
  "name": "follow-redirects",
  "version": "1.15.0"
}

//// [C:/temp/replay/axios-src/node_modules/follow-redirects/index.js]
export const x = 10;


Info seq  [hh:mm:ss:mss] request:
    {
      "command": "open",
      "arguments": {
        "file": "c:/temp/replay/axios-src/lib/core/AxiosHeaders.js"
      },
      "seq": 1,
      "type": "request"
    }
Info seq  [hh:mm:ss:mss] Search path: c:/temp/replay/axios-src/lib/core
Info seq  [hh:mm:ss:mss] For info: c:/temp/replay/axios-src/lib/core/AxiosHeaders.js :: No config files found.
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: c:/temp/replay/axios-src/lib/core/tsconfig.json 2000 undefined WatchType: Config file for the inferred project root
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: c:/temp/replay/axios-src/lib/core/jsconfig.json 2000 undefined WatchType: Config file for the inferred project root
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: c:/temp/replay/axios-src/lib/tsconfig.json 2000 undefined WatchType: Config file for the inferred project root
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: c:/temp/replay/axios-src/lib/jsconfig.json 2000 undefined WatchType: Config file for the inferred project root
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: c:/temp/replay/axios-src/tsconfig.json 2000 undefined WatchType: Config file for the inferred project root
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: c:/temp/replay/axios-src/jsconfig.json 2000 undefined WatchType: Config file for the inferred project root
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: c:/temp/replay/tsconfig.json 2000 undefined WatchType: Config file for the inferred project root
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: c:/temp/replay/jsconfig.json 2000 undefined WatchType: Config file for the inferred project root
Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: /dev/null/inferredProject1*
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: C:/a/lib/lib.d.ts 500 undefined Project: /dev/null/inferredProject1* WatchType: Missing file
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: c:/temp/replay/axios-src/lib/core/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: c:/temp/replay/axios-src/lib/core/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: c:/temp/replay/axios-src/lib/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: c:/temp/replay/axios-src/lib/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: c:/temp/replay/axios-src/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: c:/temp/replay/axios-src/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: c:/temp/replay/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: c:/temp/replay/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: c:/temp/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: c:/temp/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: /dev/null/inferredProject1* Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Project '/dev/null/inferredProject1*' (Inferred)
Info seq  [hh:mm:ss:mss] 	Files (1)
	c:/temp/replay/axios-src/lib/core/AxiosHeaders.js SVC-1-0 "export const b = 10;\n\n"


	AxiosHeaders.js
	  Root file specified for compilation

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: c:/temp/replay/axios-src/package.json 250 undefined WatchType: package.json file
Info seq  [hh:mm:ss:mss] AutoImportProviderProject: found 1 root files in 1 dependencies in * ms
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: c:/temp/replay/axios-src/node_modules 1 undefined WatchType: node_modules for closed script infos and package.jsons affecting module specifier cache
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: c:/temp/replay/axios-src/node_modules 1 undefined WatchType: node_modules for closed script infos and package.jsons affecting module specifier cache
Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: /dev/null/autoImportProviderProject1*
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: /dev/null/autoImportProviderProject1* Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Project '/dev/null/autoImportProviderProject1*' (AutoImportProvider)
Info seq  [hh:mm:ss:mss] 	Files (1)
	c:/temp/replay/axios-src/node_modules/follow-redirects/index.js Text-1 "export const x = 10;"


	../../node_modules/follow-redirects/index.js
	  Root file specified for compilation

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Project '/dev/null/inferredProject1*' (Inferred)
Info seq  [hh:mm:ss:mss] 	Files (1)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Project '/dev/null/autoImportProviderProject1*' (AutoImportProvider)
Info seq  [hh:mm:ss:mss] 	Files (1)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: c:/temp/replay/axios-src/lib/core/AxiosHeaders.js ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /dev/null/inferredProject1*
Info seq  [hh:mm:ss:mss] response:
    {
      "responseRequired": false
    }
After request

PolledWatches::
C:/a/lib/lib.d.ts: *new*
  {"pollingInterval":500}
c:/temp/node_modules/@types: *new*
  {"pollingInterval":500}
c:/temp/replay/axios-src/jsconfig.json: *new*
  {"pollingInterval":2000}
c:/temp/replay/axios-src/lib/core/jsconfig.json: *new*
  {"pollingInterval":2000}
c:/temp/replay/axios-src/lib/core/node_modules/@types: *new*
  {"pollingInterval":500}
c:/temp/replay/axios-src/lib/core/tsconfig.json: *new*
  {"pollingInterval":2000}
c:/temp/replay/axios-src/lib/jsconfig.json: *new*
  {"pollingInterval":2000}
c:/temp/replay/axios-src/lib/node_modules/@types: *new*
  {"pollingInterval":500}
c:/temp/replay/axios-src/lib/tsconfig.json: *new*
  {"pollingInterval":2000}
c:/temp/replay/axios-src/node_modules/@types: *new*
  {"pollingInterval":500}
c:/temp/replay/axios-src/tsconfig.json: *new*
  {"pollingInterval":2000}
c:/temp/replay/jsconfig.json: *new*
  {"pollingInterval":2000}
c:/temp/replay/node_modules/@types: *new*
  {"pollingInterval":500}
c:/temp/replay/tsconfig.json: *new*
  {"pollingInterval":2000}

FsWatches::
c:/temp/replay/axios-src/package.json: *new*
  {}

FsWatchesRecursive::
c:/temp/replay/axios-src/node_modules: *new*
  {}

Before request

Info seq  [hh:mm:ss:mss] request:
    {
      "command": "updateOpen",
      "arguments": {
        "changedFiles": [
          {
            "fileName": "c:/temp/replay/axios-src/lib/core/AxiosHeaders.js",
            "textChanges": [
              {
                "newText": "//comment",
                "start": {
                  "line": 2,
                  "offset": 1
                },
                "end": {
                  "line": 2,
                  "offset": 1
                }
              }
            ]
          }
        ]
      },
      "seq": 2,
      "type": "request"
    }
Info seq  [hh:mm:ss:mss] response:
    {
      "response": true,
      "responseRequired": true
    }
After request

Before request

Info seq  [hh:mm:ss:mss] request:
    {
      "command": "open",
      "arguments": {
        "file": "c:/temp/replay/axios-src/lib/core/dispatchRequest.js"
      },
      "seq": 3,
      "type": "request"
    }
Info seq  [hh:mm:ss:mss] Search path: c:/temp/replay/axios-src/lib/core
Info seq  [hh:mm:ss:mss] For info: c:/temp/replay/axios-src/lib/core/dispatchRequest.js :: No config files found.
Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: /dev/null/inferredProject2*
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: c:/temp/replay/axios-src/lib/core/AxiosHeaders.js 1 undefined Project: /dev/null/inferredProject2* WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: c:/temp/replay/axios-src/lib/core/AxiosHeaders.js 1 undefined Project: /dev/null/inferredProject2* WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: c:/temp/replay/axios-src/lib/core 0 undefined Project: /dev/null/inferredProject2* WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: c:/temp/replay/axios-src/lib/core 0 undefined Project: /dev/null/inferredProject2* WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: c:/temp/replay/axios-src/lib/core/settle.js 1 undefined Project: /dev/null/inferredProject2* WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: c:/temp/replay/axios-src/lib/core/settle.js 1 undefined Project: /dev/null/inferredProject2* WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: c:/temp/replay/axios-src/lib/core/settle.js 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: c:/temp/replay/axios-src/lib/core/node_modules 1 undefined Project: /dev/null/inferredProject2* WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: c:/temp/replay/axios-src/lib/core/node_modules 1 undefined Project: /dev/null/inferredProject2* WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: c:/temp/replay/axios-src/lib/node_modules 1 undefined Project: /dev/null/inferredProject2* WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: c:/temp/replay/axios-src/lib/node_modules 1 undefined Project: /dev/null/inferredProject2* WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: c:/temp/replay/axios-src/node_modules 1 undefined Project: /dev/null/inferredProject2* WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: c:/temp/replay/axios-src/node_modules 1 undefined Project: /dev/null/inferredProject2* WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: c:/temp/replay/node_modules 1 undefined Project: /dev/null/inferredProject2* WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: c:/temp/replay/node_modules 1 undefined Project: /dev/null/inferredProject2* WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: c:/temp/node_modules 1 undefined Project: /dev/null/inferredProject2* WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: c:/temp/node_modules 1 undefined Project: /dev/null/inferredProject2* WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: C:/temp/replay/axios-src/node_modules/follow-redirects/package.json 2000 undefined Project: /dev/null/inferredProject2* WatchType: File location affecting resolution
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: C:/a/lib/lib.d.ts 500 undefined Project: /dev/null/inferredProject2* WatchType: Missing file
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: c:/temp/replay/axios-src/lib/core/node_modules/@types 1 undefined Project: /dev/null/inferredProject2* WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: c:/temp/replay/axios-src/lib/core/node_modules/@types 1 undefined Project: /dev/null/inferredProject2* WatchType: Type roots
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: c:/temp/replay/axios-src/lib/node_modules/@types 1 undefined Project: /dev/null/inferredProject2* WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: c:/temp/replay/axios-src/lib/node_modules/@types 1 undefined Project: /dev/null/inferredProject2* WatchType: Type roots
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: c:/temp/replay/axios-src/node_modules/@types 1 undefined Project: /dev/null/inferredProject2* WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: c:/temp/replay/axios-src/node_modules/@types 1 undefined Project: /dev/null/inferredProject2* WatchType: Type roots
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: c:/temp/replay/node_modules/@types 1 undefined Project: /dev/null/inferredProject2* WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: c:/temp/replay/node_modules/@types 1 undefined Project: /dev/null/inferredProject2* WatchType: Type roots
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: c:/temp/node_modules/@types 1 undefined Project: /dev/null/inferredProject2* WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: c:/temp/node_modules/@types 1 undefined Project: /dev/null/inferredProject2* WatchType: Type roots
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: /dev/null/inferredProject2* Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Project '/dev/null/inferredProject2*' (Inferred)
Info seq  [hh:mm:ss:mss] 	Files (4)
	c:/temp/replay/axios-src/lib/core/AxiosHeaders.js SVC-1-1 "export const b = 10;\n//comment\n"
	c:/temp/replay/axios-src/lib/core/settle.js Text-1 "export const b2 = 10;\n"
	c:/temp/replay/axios-src/node_modules/follow-redirects/index.js Text-1 "export const x = 10;"
	c:/temp/replay/axios-src/lib/core/dispatchRequest.js SVC-1-0 "import { b } from \"./AxiosHeaders.js\";\nimport { b2 } from \"./settle.js\";\nimport { x } from \"follow-redirects\";\nexport const y = 10;\n"


	AxiosHeaders.js
	  Imported via "./AxiosHeaders.js" from file 'dispatchRequest.js'
	settle.js
	  Imported via "./settle.js" from file 'dispatchRequest.js'
	../../node_modules/follow-redirects/index.js
	  Imported via "follow-redirects" from file 'dispatchRequest.js' with packageId 'follow-redirects/index.js@1.15.0'
	dispatchRequest.js
	  Root file specified for compilation

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] `remove Project::
Info seq  [hh:mm:ss:mss] Project '/dev/null/inferredProject1*' (Inferred)
Info seq  [hh:mm:ss:mss] 	Files (1)
	c:/temp/replay/axios-src/lib/core/AxiosHeaders.js


	AxiosHeaders.js
	  Root file specified for compilation

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Project '/dev/null/autoImportProviderProject1*' (AutoImportProvider)
Info seq  [hh:mm:ss:mss] 	Files (1)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Close:: WatchInfo: c:/temp/replay/axios-src/lib/core/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Close:: WatchInfo: c:/temp/replay/axios-src/lib/core/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Close:: WatchInfo: c:/temp/replay/axios-src/lib/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Close:: WatchInfo: c:/temp/replay/axios-src/lib/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Close:: WatchInfo: c:/temp/replay/axios-src/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Close:: WatchInfo: c:/temp/replay/axios-src/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Close:: WatchInfo: c:/temp/replay/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Close:: WatchInfo: c:/temp/replay/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Close:: WatchInfo: c:/temp/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Close:: WatchInfo: c:/temp/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info seq  [hh:mm:ss:mss] FileWatcher:: Close:: WatchInfo: C:/a/lib/lib.d.ts 500 undefined Project: /dev/null/inferredProject1* WatchType: Missing file
Info seq  [hh:mm:ss:mss] Project '/dev/null/inferredProject2*' (Inferred)
Info seq  [hh:mm:ss:mss] 	Files (4)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: c:/temp/replay/axios-src/lib/core/AxiosHeaders.js ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /dev/null/inferredProject2*
Info seq  [hh:mm:ss:mss] 	FileName: c:/temp/replay/axios-src/lib/core/dispatchRequest.js ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /dev/null/inferredProject2*
Info seq  [hh:mm:ss:mss] response:
    {
      "responseRequired": false
    }
After request

PolledWatches::
C:/a/lib/lib.d.ts:
  {"pollingInterval":500}
c:/temp/node_modules: *new*
  {"pollingInterval":500}
c:/temp/node_modules/@types:
  {"pollingInterval":500}
c:/temp/replay/axios-src/jsconfig.json:
  {"pollingInterval":2000}
c:/temp/replay/axios-src/lib/core/AxiosHeaders.js: *new*
  {"pollingInterval":500}
c:/temp/replay/axios-src/lib/core/jsconfig.json:
  {"pollingInterval":2000}
c:/temp/replay/axios-src/lib/core/node_modules: *new*
  {"pollingInterval":500}
c:/temp/replay/axios-src/lib/core/node_modules/@types:
  {"pollingInterval":500}
c:/temp/replay/axios-src/lib/core/settle.js: *new*
  {"pollingInterval":500}
c:/temp/replay/axios-src/lib/core/tsconfig.json:
  {"pollingInterval":2000}
c:/temp/replay/axios-src/lib/jsconfig.json:
  {"pollingInterval":2000}
c:/temp/replay/axios-src/lib/node_modules: *new*
  {"pollingInterval":500}
c:/temp/replay/axios-src/lib/node_modules/@types:
  {"pollingInterval":500}
c:/temp/replay/axios-src/lib/tsconfig.json:
  {"pollingInterval":2000}
c:/temp/replay/axios-src/node_modules/@types:
  {"pollingInterval":500}
c:/temp/replay/axios-src/tsconfig.json:
  {"pollingInterval":2000}
c:/temp/replay/jsconfig.json:
  {"pollingInterval":2000}
c:/temp/replay/node_modules: *new*
  {"pollingInterval":500}
c:/temp/replay/node_modules/@types:
  {"pollingInterval":500}
c:/temp/replay/tsconfig.json:
  {"pollingInterval":2000}

FsWatches::
C:/temp/replay/axios-src/node_modules/follow-redirects/package.json: *new*
  {}
c:/temp/replay/axios-src/lib/core: *new*
  {}
c:/temp/replay/axios-src/lib/core/settle.js: *new*
  {}
c:/temp/replay/axios-src/package.json:
  {}

FsWatchesRecursive::
c:/temp/replay/axios-src/node_modules:
  {}

Before request

Info seq  [hh:mm:ss:mss] request:
    {
      "command": "open",
      "arguments": {
        "file": "c:/temp/replay/axios-src/lib/core/mergeConfig.js"
      },
      "seq": 4,
      "type": "request"
    }
Info seq  [hh:mm:ss:mss] Search path: c:/temp/replay/axios-src/lib/core
Info seq  [hh:mm:ss:mss] For info: c:/temp/replay/axios-src/lib/core/mergeConfig.js :: No config files found.
Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: /dev/null/inferredProject3*
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: c:/temp/replay/axios-src/lib/core/AxiosHeaders.js 1 undefined Project: /dev/null/inferredProject3* WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: c:/temp/replay/axios-src/lib/core/AxiosHeaders.js 1 undefined Project: /dev/null/inferredProject3* WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: c:/temp/replay/axios-src/lib/core 0 undefined Project: /dev/null/inferredProject3* WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: c:/temp/replay/axios-src/lib/core 0 undefined Project: /dev/null/inferredProject3* WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: C:/a/lib/lib.d.ts 500 undefined Project: /dev/null/inferredProject3* WatchType: Missing file
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: c:/temp/replay/axios-src/lib/core/node_modules/@types 1 undefined Project: /dev/null/inferredProject3* WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: c:/temp/replay/axios-src/lib/core/node_modules/@types 1 undefined Project: /dev/null/inferredProject3* WatchType: Type roots
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: c:/temp/replay/axios-src/lib/node_modules/@types 1 undefined Project: /dev/null/inferredProject3* WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: c:/temp/replay/axios-src/lib/node_modules/@types 1 undefined Project: /dev/null/inferredProject3* WatchType: Type roots
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: c:/temp/replay/axios-src/node_modules/@types 1 undefined Project: /dev/null/inferredProject3* WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: c:/temp/replay/axios-src/node_modules/@types 1 undefined Project: /dev/null/inferredProject3* WatchType: Type roots
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: c:/temp/replay/node_modules/@types 1 undefined Project: /dev/null/inferredProject3* WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: c:/temp/replay/node_modules/@types 1 undefined Project: /dev/null/inferredProject3* WatchType: Type roots
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: c:/temp/node_modules/@types 1 undefined Project: /dev/null/inferredProject3* WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: c:/temp/node_modules/@types 1 undefined Project: /dev/null/inferredProject3* WatchType: Type roots
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: /dev/null/inferredProject3* Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Project '/dev/null/inferredProject3*' (Inferred)
Info seq  [hh:mm:ss:mss] 	Files (2)
	c:/temp/replay/axios-src/lib/core/AxiosHeaders.js SVC-1-1 "export const b = 10;\n//comment\n"
	c:/temp/replay/axios-src/lib/core/mergeConfig.js SVC-1-0 "import { b } from \"./AxiosHeaders.js\";\nexport const y = 10;\n"


	AxiosHeaders.js
	  Imported via "./AxiosHeaders.js" from file 'mergeConfig.js'
	mergeConfig.js
	  Root file specified for compilation

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] AutoImportProviderProject: found 1 root files in 1 dependencies in * ms
Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: /dev/null/autoImportProviderProject2*
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: /dev/null/autoImportProviderProject2* Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Project '/dev/null/autoImportProviderProject2*' (AutoImportProvider)
Info seq  [hh:mm:ss:mss] 	Files (1)
	c:/temp/replay/axios-src/node_modules/follow-redirects/index.js Text-1 "export const x = 10;"


	../../node_modules/follow-redirects/index.js
	  Root file specified for compilation

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Project '/dev/null/inferredProject2*' (Inferred)
Info seq  [hh:mm:ss:mss] 	Files (4)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Project '/dev/null/inferredProject3*' (Inferred)
Info seq  [hh:mm:ss:mss] 	Files (2)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Project '/dev/null/autoImportProviderProject2*' (AutoImportProvider)
Info seq  [hh:mm:ss:mss] 	Files (1)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: c:/temp/replay/axios-src/lib/core/AxiosHeaders.js ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /dev/null/inferredProject2*,/dev/null/inferredProject3*
Info seq  [hh:mm:ss:mss] 	FileName: c:/temp/replay/axios-src/lib/core/dispatchRequest.js ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /dev/null/inferredProject2*
Info seq  [hh:mm:ss:mss] 	FileName: c:/temp/replay/axios-src/lib/core/mergeConfig.js ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /dev/null/inferredProject3*
Info seq  [hh:mm:ss:mss] response:
    {
      "responseRequired": false
    }
After request

Before request

Info seq  [hh:mm:ss:mss] request:
    {
      "command": "close",
      "arguments": {
        "file": "c:/temp/replay/axios-src/lib/core/AxiosHeaders.js"
      },
      "seq": 5,
      "type": "request"
    }
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: c:/temp/replay/axios-src/lib/core/AxiosHeaders.js 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] Project '/dev/null/inferredProject2*' (Inferred)
Info seq  [hh:mm:ss:mss] 	Files (4)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Project '/dev/null/inferredProject3*' (Inferred)
Info seq  [hh:mm:ss:mss] 	Files (2)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Project '/dev/null/autoImportProviderProject2*' (AutoImportProvider)
Info seq  [hh:mm:ss:mss] 	Files (1)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: c:/temp/replay/axios-src/lib/core/dispatchRequest.js ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /dev/null/inferredProject2*
Info seq  [hh:mm:ss:mss] 	FileName: c:/temp/replay/axios-src/lib/core/mergeConfig.js ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /dev/null/inferredProject3*
Info seq  [hh:mm:ss:mss] response:
    {
      "responseRequired": false
    }
After request

PolledWatches::
C:/a/lib/lib.d.ts:
  {"pollingInterval":500}
c:/temp/node_modules:
  {"pollingInterval":500}
c:/temp/node_modules/@types:
  {"pollingInterval":500}
c:/temp/replay/axios-src/jsconfig.json:
  {"pollingInterval":2000}
c:/temp/replay/axios-src/lib/core/AxiosHeaders.js:
  {"pollingInterval":500}
c:/temp/replay/axios-src/lib/core/jsconfig.json:
  {"pollingInterval":2000}
c:/temp/replay/axios-src/lib/core/node_modules:
  {"pollingInterval":500}
c:/temp/replay/axios-src/lib/core/node_modules/@types:
  {"pollingInterval":500}
c:/temp/replay/axios-src/lib/core/settle.js:
  {"pollingInterval":500}
c:/temp/replay/axios-src/lib/core/tsconfig.json:
  {"pollingInterval":2000}
c:/temp/replay/axios-src/lib/jsconfig.json:
  {"pollingInterval":2000}
c:/temp/replay/axios-src/lib/node_modules:
  {"pollingInterval":500}
c:/temp/replay/axios-src/lib/node_modules/@types:
  {"pollingInterval":500}
c:/temp/replay/axios-src/lib/tsconfig.json:
  {"pollingInterval":2000}
c:/temp/replay/axios-src/node_modules/@types:
  {"pollingInterval":500}
c:/temp/replay/axios-src/tsconfig.json:
  {"pollingInterval":2000}
c:/temp/replay/jsconfig.json:
  {"pollingInterval":2000}
c:/temp/replay/node_modules:
  {"pollingInterval":500}
c:/temp/replay/node_modules/@types:
  {"pollingInterval":500}
c:/temp/replay/tsconfig.json:
  {"pollingInterval":2000}

FsWatches::
C:/temp/replay/axios-src/node_modules/follow-redirects/package.json:
  {}
c:/temp/replay/axios-src/lib/core:
  {}
c:/temp/replay/axios-src/lib/core/AxiosHeaders.js: *new*
  {}
c:/temp/replay/axios-src/lib/core/settle.js:
  {}
c:/temp/replay/axios-src/package.json:
  {}

FsWatchesRecursive::
c:/temp/replay/axios-src/node_modules:
  {}

Before request

Info seq  [hh:mm:ss:mss] request:
    {
      "command": "open",
      "arguments": {
        "file": "c:/temp/replay/axios-src/lib/core/settle.js"
      },
      "seq": 6,
      "type": "request"
    }
Info seq  [hh:mm:ss:mss] FileWatcher:: Close:: WatchInfo: c:/temp/replay/axios-src/lib/core/settle.js 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] Search path: c:/temp/replay/axios-src/lib/core
Info seq  [hh:mm:ss:mss] For info: c:/temp/replay/axios-src/lib/core/settle.js :: No config files found.
Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: /dev/null/inferredProject2*
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: /dev/null/inferredProject2* Version: 2 structureChanged: false structureIsReused:: Completely Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Project '/dev/null/inferredProject2*' (Inferred)
Info seq  [hh:mm:ss:mss] 	Files (4)
	c:/temp/replay/axios-src/lib/core/AxiosHeaders.js Text-2 "export const b = 10;\n\n"
	c:/temp/replay/axios-src/lib/core/settle.js Text-1 "export const b2 = 10;\n"
	c:/temp/replay/axios-src/node_modules/follow-redirects/index.js Text-1 "export const x = 10;"
	c:/temp/replay/axios-src/lib/core/dispatchRequest.js SVC-1-0 "import { b } from \"./AxiosHeaders.js\";\nimport { b2 } from \"./settle.js\";\nimport { x } from \"follow-redirects\";\nexport const y = 10;\n"

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Project '/dev/null/inferredProject2*' (Inferred)
Info seq  [hh:mm:ss:mss] 	Files (4)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Project '/dev/null/inferredProject3*' (Inferred)
Info seq  [hh:mm:ss:mss] 	Files (2)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Project '/dev/null/autoImportProviderProject2*' (AutoImportProvider)
Info seq  [hh:mm:ss:mss] 	Files (1)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: c:/temp/replay/axios-src/lib/core/dispatchRequest.js ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /dev/null/inferredProject2*
Info seq  [hh:mm:ss:mss] 	FileName: c:/temp/replay/axios-src/lib/core/mergeConfig.js ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /dev/null/inferredProject3*
Info seq  [hh:mm:ss:mss] 	FileName: c:/temp/replay/axios-src/lib/core/settle.js ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /dev/null/inferredProject2*
Info seq  [hh:mm:ss:mss] response:
    {
      "responseRequired": false
    }
After request

PolledWatches::
C:/a/lib/lib.d.ts:
  {"pollingInterval":500}
c:/temp/node_modules:
  {"pollingInterval":500}
c:/temp/node_modules/@types:
  {"pollingInterval":500}
c:/temp/replay/axios-src/jsconfig.json:
  {"pollingInterval":2000}
c:/temp/replay/axios-src/lib/core/AxiosHeaders.js:
  {"pollingInterval":500}
c:/temp/replay/axios-src/lib/core/jsconfig.json:
  {"pollingInterval":2000}
c:/temp/replay/axios-src/lib/core/node_modules:
  {"pollingInterval":500}
c:/temp/replay/axios-src/lib/core/node_modules/@types:
  {"pollingInterval":500}
c:/temp/replay/axios-src/lib/core/settle.js:
  {"pollingInterval":500}
c:/temp/replay/axios-src/lib/core/tsconfig.json:
  {"pollingInterval":2000}
c:/temp/replay/axios-src/lib/jsconfig.json:
  {"pollingInterval":2000}
c:/temp/replay/axios-src/lib/node_modules:
  {"pollingInterval":500}
c:/temp/replay/axios-src/lib/node_modules/@types:
  {"pollingInterval":500}
c:/temp/replay/axios-src/lib/tsconfig.json:
  {"pollingInterval":2000}
c:/temp/replay/axios-src/node_modules/@types:
  {"pollingInterval":500}
c:/temp/replay/axios-src/tsconfig.json:
  {"pollingInterval":2000}
c:/temp/replay/jsconfig.json:
  {"pollingInterval":2000}
c:/temp/replay/node_modules:
  {"pollingInterval":500}
c:/temp/replay/node_modules/@types:
  {"pollingInterval":500}
c:/temp/replay/tsconfig.json:
  {"pollingInterval":2000}

FsWatches::
C:/temp/replay/axios-src/node_modules/follow-redirects/package.json:
  {}
c:/temp/replay/axios-src/lib/core:
  {}
c:/temp/replay/axios-src/lib/core/AxiosHeaders.js:
  {}
c:/temp/replay/axios-src/package.json:
  {}

FsWatches *deleted*::
c:/temp/replay/axios-src/lib/core/settle.js:
  {}

FsWatchesRecursive::
c:/temp/replay/axios-src/node_modules:
  {}
