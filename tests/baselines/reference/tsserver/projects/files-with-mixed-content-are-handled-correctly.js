currentDirectory:: / useCaseSensitiveFileNames: false
Info seq  [hh:mm:ss:mss] Provided types map file "/typesMap.json" doesn't exist
Before request
//// [/a/b/f1.html]
<html><script language="javascript">var x = 1;</></html>


Info seq  [hh:mm:ss:mss] request:
    {
      "command": "openExternalProject",
      "arguments": {
        "projectFileName": "projectFileName",
        "options": {},
        "rootFiles": [
          {
            "fileName": "/a/b/f1.html",
            "scriptKind": "JS",
            "hasMixedContent": true
          }
        ]
      },
      "seq": 1,
      "type": "request"
    }
Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: projectFileName
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /a/lib/lib.d.ts 500 undefined Project: projectFileName WatchType: Missing file
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: projectFileName Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Project 'projectFileName' (External)
Info seq  [hh:mm:ss:mss] 	Files (1)
	/a/b/f1.html Text-1 ""


	a/b/f1.html
	  Root file specified for compilation

Info seq  [hh:mm:ss:mss] -----------------------------------------------
TI:: Creating typing installer

PolledWatches::
/a/lib/lib.d.ts: *new*
  {"pollingInterval":500}

TI:: [hh:mm:ss:mss] Global cache location '/a/data', safe file path '/safeList.json', types map path /typesMap.json
TI:: [hh:mm:ss:mss] Processing cache location '/a/data'
TI:: [hh:mm:ss:mss] Trying to find '/a/data/package.json'...
TI:: [hh:mm:ss:mss] Finished processing cache location '/a/data'
TI:: [hh:mm:ss:mss] Npm config file: /a/data/package.json
TI:: [hh:mm:ss:mss] Npm config file: '/a/data/package.json' is missing, creating new one...
TI:: [hh:mm:ss:mss] Updating types-registry npm package...
TI:: [hh:mm:ss:mss] npm install --ignore-scripts types-registry@latest
TI:: [hh:mm:ss:mss] Updated types-registry npm package
TI:: typing installer creation complete
//// [/a/data/package.json]
{ "private": true }

//// [/a/data/node_modules/types-registry/index.json]
{
  "entries": {}
}


TI:: [hh:mm:ss:mss] Got install request
    {
      "projectName": "projectFileName",
      "fileNames": [
        "/a/b/f1.html"
      ],
      "compilerOptions": {
        "allowNonTsExtensions": true,
        "noEmitForJsFiles": true
      },
      "typeAcquisition": {
        "include": [],
        "exclude": [],
        "enable": true
      },
      "unresolvedImports": [],
      "projectRootPath": "/",
      "kind": "discover"
    }
TI:: [hh:mm:ss:mss] Failed to load safelist from types map file '/typesMap.json'
TI:: [hh:mm:ss:mss] Explicitly included types: []
TI:: [hh:mm:ss:mss] Inferred typings from unresolved imports: []
TI:: [hh:mm:ss:mss] Finished typings discovery:
    {
      "cachedTypingPaths": [],
      "newTypingNames": [],
      "filesToWatch": [
        "/bower_components",
        "/node_modules"
      ]
    }
TI:: [hh:mm:ss:mss] Sending response:
    {
      "kind": "action::watchTypingLocations",
      "projectName": "projectFileName",
      "files": [
        "/bower_components",
        "/node_modules"
      ]
    }
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /bower_components 1 undefined Project: projectFileName WatchType: Directory location for typing installer
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /bower_components 1 undefined Project: projectFileName WatchType: Directory location for typing installer
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /node_modules 1 undefined Project: projectFileName WatchType: Directory location for typing installer
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /node_modules 1 undefined Project: projectFileName WatchType: Directory location for typing installer
TI:: [hh:mm:ss:mss] Sending response:
    {
      "projectName": "projectFileName",
      "typeAcquisition": {
        "include": [],
        "exclude": [],
        "enable": true
      },
      "compilerOptions": {
        "allowNonTsExtensions": true,
        "noEmitForJsFiles": true
      },
      "typings": [],
      "unresolvedImports": [],
      "kind": "action::set"
    }
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "setTypings",
      "body": {
        "projectName": "projectFileName",
        "typeAcquisition": {
          "include": [],
          "exclude": [],
          "enable": true
        },
        "compilerOptions": {
          "allowNonTsExtensions": true,
          "noEmitForJsFiles": true
        },
        "typings": [],
        "unresolvedImports": [],
        "kind": "action::set"
      }
    }
TI:: [hh:mm:ss:mss] No new typings were requested as a result of typings discovery
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "telemetry",
      "body": {
        "telemetryEventName": "projectInfo",
        "payload": {
          "projectId": "e9b7d777992ca2f51aa5b01e4867c39b93a47e8754336e4b5bf390d75e2af673",
          "fileStats": {
            "js": 1,
            "jsSize": 0,
            "jsx": 0,
            "jsxSize": 0,
            "ts": 0,
            "tsSize": 0,
            "tsx": 0,
            "tsxSize": 0,
            "dts": 0,
            "dtsSize": 0,
            "deferred": 0,
            "deferredSize": 0
          },
          "compilerOptions": {},
          "typeAcquisition": {
            "enable": true,
            "include": false,
            "exclude": false
          },
          "compileOnSave": true,
          "configFileName": "other",
          "projectType": "external",
          "languageServiceEnabled": true,
          "version": "FakeVersion"
        }
      }
    }
Info seq  [hh:mm:ss:mss] response:
    {
      "response": true,
      "responseRequired": true
    }
After request

PolledWatches::
/a/lib/lib.d.ts:
  {"pollingInterval":500}
/bower_components: *new*
  {"pollingInterval":500}
/node_modules: *new*
  {"pollingInterval":500}

Info seq  [hh:mm:ss:mss] Text of/a/b/f1.html: 
Before request

Info seq  [hh:mm:ss:mss] request:
    {
      "command": "open",
      "arguments": {
        "file": "/a/b/f1.html",
        "fileContent": "var x = 1;"
      },
      "seq": 2,
      "type": "request"
    }
Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: projectFileName
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: projectFileName Version: 2 structureChanged: false structureIsReused:: Completely Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Project 'projectFileName' (External)
Info seq  [hh:mm:ss:mss] 	Files (1)
	/a/b/f1.html SVC-2-0 "var x = 1;"

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Project 'projectFileName' (External)
Info seq  [hh:mm:ss:mss] 	Files (1)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: /a/b/f1.html ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: projectFileName
Info seq  [hh:mm:ss:mss] response:
    {
      "responseRequired": false
    }
After request

Before request

Info seq  [hh:mm:ss:mss] request:
    {
      "command": "quickinfo",
      "arguments": {
        "file": "/a/b/f1.html",
        "line": 1,
        "offset": 5
      },
      "seq": 3,
      "type": "request"
    }
Info seq  [hh:mm:ss:mss] response:
    {
      "response": {
        "kind": "var",
        "kindModifiers": "",
        "start": {
          "line": 1,
          "offset": 5
        },
        "end": {
          "line": 1,
          "offset": 6
        },
        "displayString": "var x: number",
        "documentation": "",
        "tags": []
      },
      "responseRequired": true
    }
After request

Before request

Info seq  [hh:mm:ss:mss] request:
    {
      "command": "close",
      "arguments": {
        "file": "/a/b/f1.html"
      },
      "seq": 4,
      "type": "request"
    }
Info seq  [hh:mm:ss:mss] Project 'projectFileName' (External)
Info seq  [hh:mm:ss:mss] 	Files (1)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] response:
    {
      "responseRequired": false
    }
After request

Info seq  [hh:mm:ss:mss] Text of/a/b/f1.html: 