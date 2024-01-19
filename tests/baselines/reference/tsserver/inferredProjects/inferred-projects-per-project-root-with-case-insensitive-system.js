currentDirectory:: / useCaseSensitiveFileNames: false
Info seq  [hh:mm:ss:mss] Provided types map file "/typesMap.json" doesn't exist
Before request
//// [/a/file1.ts]
let x = 1;

//// [/A/file2.ts]
let y = 2;

//// [/b/file2.ts]
let x = 3;

//// [/c/file3.ts]
let z = 4;


Info seq  [hh:mm:ss:mss] request:
    {
      "command": "compilerOptionsForInferredProjects",
      "arguments": {
        "options": {
          "allowJs": true,
          "target": "ESNext"
        }
      },
      "seq": 1,
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
      "command": "compilerOptionsForInferredProjects",
      "arguments": {
        "options": {
          "allowJs": true,
          "target": "ES2015"
        },
        "projectRootPath": "/a"
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
        "file": "/a/file1.ts",
        "projectRootPath": "/a",
        "fileContent": "let x = 1;",
        "scriptKindName": "JS"
      },
      "seq": 3,
      "type": "request"
    }
Info seq  [hh:mm:ss:mss] Search path: /a
Info seq  [hh:mm:ss:mss] For info: /a/file1.ts :: No config files found.
Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: /dev/null/inferredProject1*
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /a/lib/lib.es6.d.ts 500 undefined Project: /dev/null/inferredProject1* WatchType: Missing file
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: /dev/null/inferredProject1* Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Project '/dev/null/inferredProject1*' (Inferred)
Info seq  [hh:mm:ss:mss] 	Files (1)
	/a/file1.ts SVC-1-0 "let x = 1;"


	file1.ts
	  Root file specified for compilation

Info seq  [hh:mm:ss:mss] -----------------------------------------------
TI:: Creating typing installer

PolledWatches::
/a/lib/lib.es6.d.ts: *new*
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
      "projectName": "/dev/null/inferredProject1*",
      "fileNames": [
        "/a/file1.ts"
      ],
      "compilerOptions": {
        "allowJs": true,
        "target": 2,
        "allowNonTsExtensions": true,
        "noEmitForJsFiles": true,
        "maxNodeModuleJsDepth": 2
      },
      "typeAcquisition": {
        "enable": true,
        "include": [],
        "exclude": []
      },
      "unresolvedImports": [],
      "projectRootPath": "/a",
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
        "/a/bower_components",
        "/a/node_modules"
      ]
    }
TI:: [hh:mm:ss:mss] Sending response:
    {
      "kind": "action::watchTypingLocations",
      "projectName": "/dev/null/inferredProject1*",
      "files": [
        "/a/bower_components",
        "/a/node_modules"
      ]
    }
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /a/bower_components 1 undefined Project: /dev/null/inferredProject1* WatchType: Directory location for typing installer
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /a/bower_components 1 undefined Project: /dev/null/inferredProject1* WatchType: Directory location for typing installer
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /a/node_modules 1 undefined Project: /dev/null/inferredProject1* WatchType: Directory location for typing installer
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /a/node_modules 1 undefined Project: /dev/null/inferredProject1* WatchType: Directory location for typing installer
TI:: [hh:mm:ss:mss] Sending response:
    {
      "projectName": "/dev/null/inferredProject1*",
      "typeAcquisition": {
        "enable": true,
        "include": [],
        "exclude": []
      },
      "compilerOptions": {
        "allowJs": true,
        "target": 2,
        "allowNonTsExtensions": true,
        "noEmitForJsFiles": true,
        "maxNodeModuleJsDepth": 2
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
        "projectName": "/dev/null/inferredProject1*",
        "typeAcquisition": {
          "enable": true,
          "include": [],
          "exclude": []
        },
        "compilerOptions": {
          "allowJs": true,
          "target": 2,
          "allowNonTsExtensions": true,
          "noEmitForJsFiles": true,
          "maxNodeModuleJsDepth": 2
        },
        "typings": [],
        "unresolvedImports": [],
        "kind": "action::set"
      }
    }
TI:: [hh:mm:ss:mss] No new typings were requested as a result of typings discovery
Info seq  [hh:mm:ss:mss] Project '/dev/null/inferredProject1*' (Inferred)
Info seq  [hh:mm:ss:mss] 	Files (1)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: /a/file1.ts ProjectRootPath: /a
Info seq  [hh:mm:ss:mss] 		Projects: /dev/null/inferredProject1*
Info seq  [hh:mm:ss:mss] response:
    {
      "responseRequired": false
    }
After request

PolledWatches::
/a/bower_components: *new*
  {"pollingInterval":500}
/a/lib/lib.es6.d.ts:
  {"pollingInterval":500}
/a/node_modules: *new*
  {"pollingInterval":500}

Before request

Info seq  [hh:mm:ss:mss] request:
    {
      "command": "open",
      "arguments": {
        "file": "/A/file2.ts",
        "projectRootPath": "/a",
        "fileContent": "let y = 2;",
        "scriptKindName": "JS"
      },
      "seq": 4,
      "type": "request"
    }
Info seq  [hh:mm:ss:mss] Search path: /A
Info seq  [hh:mm:ss:mss] For info: /A/file2.ts :: No config files found.
Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: /dev/null/inferredProject1*
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: /dev/null/inferredProject1* Version: 2 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Project '/dev/null/inferredProject1*' (Inferred)
Info seq  [hh:mm:ss:mss] 	Files (2)
	/a/file1.ts SVC-1-0 "let x = 1;"
	/A/file2.ts SVC-1-0 "let y = 2;"


	file1.ts
	  Root file specified for compilation
	file2.ts
	  Root file specified for compilation

Info seq  [hh:mm:ss:mss] -----------------------------------------------
TI:: [hh:mm:ss:mss] Got install request
    {
      "projectName": "/dev/null/inferredProject1*",
      "fileNames": [
        "/a/file1.ts",
        "/A/file2.ts"
      ],
      "compilerOptions": {
        "allowJs": true,
        "target": 2,
        "allowNonTsExtensions": true,
        "noEmitForJsFiles": true,
        "maxNodeModuleJsDepth": 2
      },
      "typeAcquisition": {
        "enable": true,
        "include": [],
        "exclude": []
      },
      "unresolvedImports": [],
      "projectRootPath": "/a",
      "kind": "discover"
    }
TI:: [hh:mm:ss:mss] Explicitly included types: []
TI:: [hh:mm:ss:mss] Inferred typings from unresolved imports: []
TI:: [hh:mm:ss:mss] Finished typings discovery:
    {
      "cachedTypingPaths": [],
      "newTypingNames": [],
      "filesToWatch": [
        "/a/bower_components",
        "/a/node_modules"
      ]
    }
TI:: [hh:mm:ss:mss] Sending response:
    {
      "kind": "action::watchTypingLocations",
      "projectName": "/dev/null/inferredProject1*"
    }
TI:: [hh:mm:ss:mss] Sending response:
    {
      "projectName": "/dev/null/inferredProject1*",
      "typeAcquisition": {
        "enable": true,
        "include": [],
        "exclude": []
      },
      "compilerOptions": {
        "allowJs": true,
        "target": 2,
        "allowNonTsExtensions": true,
        "noEmitForJsFiles": true,
        "maxNodeModuleJsDepth": 2
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
        "projectName": "/dev/null/inferredProject1*",
        "typeAcquisition": {
          "enable": true,
          "include": [],
          "exclude": []
        },
        "compilerOptions": {
          "allowJs": true,
          "target": 2,
          "allowNonTsExtensions": true,
          "noEmitForJsFiles": true,
          "maxNodeModuleJsDepth": 2
        },
        "typings": [],
        "unresolvedImports": [],
        "kind": "action::set"
      }
    }
TI:: [hh:mm:ss:mss] No new typings were requested as a result of typings discovery
Info seq  [hh:mm:ss:mss] Project '/dev/null/inferredProject1*' (Inferred)
Info seq  [hh:mm:ss:mss] 	Files (2)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: /a/file1.ts ProjectRootPath: /a
Info seq  [hh:mm:ss:mss] 		Projects: /dev/null/inferredProject1*
Info seq  [hh:mm:ss:mss] 	FileName: /A/file2.ts ProjectRootPath: /a
Info seq  [hh:mm:ss:mss] 		Projects: /dev/null/inferredProject1*
Info seq  [hh:mm:ss:mss] response:
    {
      "responseRequired": false
    }
After request

Before request

Info seq  [hh:mm:ss:mss] request:
    {
      "command": "open",
      "arguments": {
        "file": "/b/file2.ts",
        "projectRootPath": "/b",
        "fileContent": "let x = 3;",
        "scriptKindName": "JS"
      },
      "seq": 5,
      "type": "request"
    }
Info seq  [hh:mm:ss:mss] Search path: /b
Info seq  [hh:mm:ss:mss] For info: /b/file2.ts :: No config files found.
Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: /dev/null/inferredProject2*
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /a/lib/lib.esnext.full.d.ts 500 undefined Project: /dev/null/inferredProject2* WatchType: Missing file
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: /dev/null/inferredProject2* Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Project '/dev/null/inferredProject2*' (Inferred)
Info seq  [hh:mm:ss:mss] 	Files (1)
	/b/file2.ts SVC-1-0 "let x = 3;"


	file2.ts
	  Root file specified for compilation

Info seq  [hh:mm:ss:mss] -----------------------------------------------
TI:: [hh:mm:ss:mss] Got install request
    {
      "projectName": "/dev/null/inferredProject2*",
      "fileNames": [
        "/b/file2.ts"
      ],
      "compilerOptions": {
        "allowJs": true,
        "target": 99,
        "allowNonTsExtensions": true,
        "noEmitForJsFiles": true,
        "maxNodeModuleJsDepth": 2
      },
      "typeAcquisition": {
        "enable": true,
        "include": [],
        "exclude": []
      },
      "unresolvedImports": [],
      "projectRootPath": "/b",
      "kind": "discover"
    }
TI:: [hh:mm:ss:mss] Explicitly included types: []
TI:: [hh:mm:ss:mss] Inferred typings from unresolved imports: []
TI:: [hh:mm:ss:mss] Finished typings discovery:
    {
      "cachedTypingPaths": [],
      "newTypingNames": [],
      "filesToWatch": [
        "/b/bower_components",
        "/b/node_modules"
      ]
    }
TI:: [hh:mm:ss:mss] Sending response:
    {
      "kind": "action::watchTypingLocations",
      "projectName": "/dev/null/inferredProject2*",
      "files": [
        "/b/bower_components",
        "/b/node_modules"
      ]
    }
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /b/bower_components 1 undefined Project: /dev/null/inferredProject2* WatchType: Directory location for typing installer
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /b/bower_components 1 undefined Project: /dev/null/inferredProject2* WatchType: Directory location for typing installer
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /b/node_modules 1 undefined Project: /dev/null/inferredProject2* WatchType: Directory location for typing installer
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /b/node_modules 1 undefined Project: /dev/null/inferredProject2* WatchType: Directory location for typing installer
TI:: [hh:mm:ss:mss] Sending response:
    {
      "projectName": "/dev/null/inferredProject2*",
      "typeAcquisition": {
        "enable": true,
        "include": [],
        "exclude": []
      },
      "compilerOptions": {
        "allowJs": true,
        "target": 99,
        "allowNonTsExtensions": true,
        "noEmitForJsFiles": true,
        "maxNodeModuleJsDepth": 2
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
        "projectName": "/dev/null/inferredProject2*",
        "typeAcquisition": {
          "enable": true,
          "include": [],
          "exclude": []
        },
        "compilerOptions": {
          "allowJs": true,
          "target": 99,
          "allowNonTsExtensions": true,
          "noEmitForJsFiles": true,
          "maxNodeModuleJsDepth": 2
        },
        "typings": [],
        "unresolvedImports": [],
        "kind": "action::set"
      }
    }
TI:: [hh:mm:ss:mss] No new typings were requested as a result of typings discovery
Info seq  [hh:mm:ss:mss] Project '/dev/null/inferredProject1*' (Inferred)
Info seq  [hh:mm:ss:mss] 	Files (2)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Project '/dev/null/inferredProject2*' (Inferred)
Info seq  [hh:mm:ss:mss] 	Files (1)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: /a/file1.ts ProjectRootPath: /a
Info seq  [hh:mm:ss:mss] 		Projects: /dev/null/inferredProject1*
Info seq  [hh:mm:ss:mss] 	FileName: /A/file2.ts ProjectRootPath: /a
Info seq  [hh:mm:ss:mss] 		Projects: /dev/null/inferredProject1*
Info seq  [hh:mm:ss:mss] 	FileName: /b/file2.ts ProjectRootPath: /b
Info seq  [hh:mm:ss:mss] 		Projects: /dev/null/inferredProject2*
Info seq  [hh:mm:ss:mss] response:
    {
      "responseRequired": false
    }
After request

PolledWatches::
/a/bower_components:
  {"pollingInterval":500}
/a/lib/lib.es6.d.ts:
  {"pollingInterval":500}
/a/lib/lib.esnext.full.d.ts: *new*
  {"pollingInterval":500}
/a/node_modules:
  {"pollingInterval":500}
/b/bower_components: *new*
  {"pollingInterval":500}
/b/node_modules: *new*
  {"pollingInterval":500}

Before request

Info seq  [hh:mm:ss:mss] request:
    {
      "command": "open",
      "arguments": {
        "file": "/c/file3.ts",
        "fileContent": "let z = 4;",
        "scriptKindName": "JS"
      },
      "seq": 6,
      "type": "request"
    }
Info seq  [hh:mm:ss:mss] Search path: /c
Info seq  [hh:mm:ss:mss] For info: /c/file3.ts :: No config files found.
Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: /dev/null/inferredProject3*
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /a/lib/lib.esnext.full.d.ts 500 undefined Project: /dev/null/inferredProject3* WatchType: Missing file
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: /dev/null/inferredProject3* Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Project '/dev/null/inferredProject3*' (Inferred)
Info seq  [hh:mm:ss:mss] 	Files (1)
	/c/file3.ts SVC-1-0 "let z = 4;"


	c/file3.ts
	  Root file specified for compilation

Info seq  [hh:mm:ss:mss] -----------------------------------------------
TI:: [hh:mm:ss:mss] Got install request
    {
      "projectName": "/dev/null/inferredProject3*",
      "fileNames": [
        "/c/file3.ts"
      ],
      "compilerOptions": {
        "allowJs": true,
        "target": 99,
        "allowNonTsExtensions": true,
        "noEmitForJsFiles": true,
        "maxNodeModuleJsDepth": 2
      },
      "typeAcquisition": {
        "enable": true,
        "include": [],
        "exclude": []
      },
      "unresolvedImports": [],
      "projectRootPath": "/",
      "kind": "discover"
    }
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
      "projectName": "/dev/null/inferredProject3*",
      "files": [
        "/bower_components",
        "/node_modules"
      ]
    }
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /bower_components 1 undefined Project: /dev/null/inferredProject3* WatchType: Directory location for typing installer
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /bower_components 1 undefined Project: /dev/null/inferredProject3* WatchType: Directory location for typing installer
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /node_modules 1 undefined Project: /dev/null/inferredProject3* WatchType: Directory location for typing installer
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /node_modules 1 undefined Project: /dev/null/inferredProject3* WatchType: Directory location for typing installer
TI:: [hh:mm:ss:mss] Sending response:
    {
      "projectName": "/dev/null/inferredProject3*",
      "typeAcquisition": {
        "enable": true,
        "include": [],
        "exclude": []
      },
      "compilerOptions": {
        "allowJs": true,
        "target": 99,
        "allowNonTsExtensions": true,
        "noEmitForJsFiles": true,
        "maxNodeModuleJsDepth": 2
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
        "projectName": "/dev/null/inferredProject3*",
        "typeAcquisition": {
          "enable": true,
          "include": [],
          "exclude": []
        },
        "compilerOptions": {
          "allowJs": true,
          "target": 99,
          "allowNonTsExtensions": true,
          "noEmitForJsFiles": true,
          "maxNodeModuleJsDepth": 2
        },
        "typings": [],
        "unresolvedImports": [],
        "kind": "action::set"
      }
    }
TI:: [hh:mm:ss:mss] No new typings were requested as a result of typings discovery
Info seq  [hh:mm:ss:mss] Project '/dev/null/inferredProject3*' (Inferred)
Info seq  [hh:mm:ss:mss] 	Files (1)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Project '/dev/null/inferredProject1*' (Inferred)
Info seq  [hh:mm:ss:mss] 	Files (2)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Project '/dev/null/inferredProject2*' (Inferred)
Info seq  [hh:mm:ss:mss] 	Files (1)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: /a/file1.ts ProjectRootPath: /a
Info seq  [hh:mm:ss:mss] 		Projects: /dev/null/inferredProject1*
Info seq  [hh:mm:ss:mss] 	FileName: /A/file2.ts ProjectRootPath: /a
Info seq  [hh:mm:ss:mss] 		Projects: /dev/null/inferredProject1*
Info seq  [hh:mm:ss:mss] 	FileName: /b/file2.ts ProjectRootPath: /b
Info seq  [hh:mm:ss:mss] 		Projects: /dev/null/inferredProject2*
Info seq  [hh:mm:ss:mss] 	FileName: /c/file3.ts ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /dev/null/inferredProject3*
Info seq  [hh:mm:ss:mss] response:
    {
      "responseRequired": false
    }
After request

PolledWatches::
/a/bower_components:
  {"pollingInterval":500}
/a/lib/lib.es6.d.ts:
  {"pollingInterval":500}
/a/lib/lib.esnext.full.d.ts:
  {"pollingInterval":500}
/a/node_modules:
  {"pollingInterval":500}
/b/bower_components:
  {"pollingInterval":500}
/b/node_modules:
  {"pollingInterval":500}
/bower_components: *new*
  {"pollingInterval":500}
/node_modules: *new*
  {"pollingInterval":500}

Before request

Info seq  [hh:mm:ss:mss] request:
    {
      "command": "close",
      "arguments": {
        "file": "/a/file1.ts"
      },
      "seq": 7,
      "type": "request"
    }
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /a/file1.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] Project '/dev/null/inferredProject3*' (Inferred)
Info seq  [hh:mm:ss:mss] 	Files (1)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Project '/dev/null/inferredProject1*' (Inferred)
Info seq  [hh:mm:ss:mss] 	Files (2)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Project '/dev/null/inferredProject2*' (Inferred)
Info seq  [hh:mm:ss:mss] 	Files (1)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: /A/file2.ts ProjectRootPath: /a
Info seq  [hh:mm:ss:mss] 		Projects: /dev/null/inferredProject1*
Info seq  [hh:mm:ss:mss] 	FileName: /b/file2.ts ProjectRootPath: /b
Info seq  [hh:mm:ss:mss] 		Projects: /dev/null/inferredProject2*
Info seq  [hh:mm:ss:mss] 	FileName: /c/file3.ts ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /dev/null/inferredProject3*
Info seq  [hh:mm:ss:mss] response:
    {
      "responseRequired": false
    }
After request

PolledWatches::
/a/bower_components:
  {"pollingInterval":500}
/a/lib/lib.es6.d.ts:
  {"pollingInterval":500}
/a/lib/lib.esnext.full.d.ts:
  {"pollingInterval":500}
/a/node_modules:
  {"pollingInterval":500}
/b/bower_components:
  {"pollingInterval":500}
/b/node_modules:
  {"pollingInterval":500}
/bower_components:
  {"pollingInterval":500}
/node_modules:
  {"pollingInterval":500}

FsWatches::
/a/file1.ts: *new*
  {}

Before request

Info seq  [hh:mm:ss:mss] request:
    {
      "command": "close",
      "arguments": {
        "file": "/A/file2.ts"
      },
      "seq": 8,
      "type": "request"
    }
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /A/file2.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] Project '/dev/null/inferredProject3*' (Inferred)
Info seq  [hh:mm:ss:mss] 	Files (1)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Project '/dev/null/inferredProject1*' (Inferred)
Info seq  [hh:mm:ss:mss] 	Files (2)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Project '/dev/null/inferredProject2*' (Inferred)
Info seq  [hh:mm:ss:mss] 	Files (1)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: /b/file2.ts ProjectRootPath: /b
Info seq  [hh:mm:ss:mss] 		Projects: /dev/null/inferredProject2*
Info seq  [hh:mm:ss:mss] 	FileName: /c/file3.ts ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /dev/null/inferredProject3*
Info seq  [hh:mm:ss:mss] response:
    {
      "responseRequired": false
    }
After request

PolledWatches::
/a/bower_components:
  {"pollingInterval":500}
/a/lib/lib.es6.d.ts:
  {"pollingInterval":500}
/a/lib/lib.esnext.full.d.ts:
  {"pollingInterval":500}
/a/node_modules:
  {"pollingInterval":500}
/b/bower_components:
  {"pollingInterval":500}
/b/node_modules:
  {"pollingInterval":500}
/bower_components:
  {"pollingInterval":500}
/node_modules:
  {"pollingInterval":500}

FsWatches::
/A/file2.ts: *new*
  {}
/a/file1.ts:
  {}

Before request

Info seq  [hh:mm:ss:mss] request:
    {
      "command": "close",
      "arguments": {
        "file": "/b/file2.ts"
      },
      "seq": 9,
      "type": "request"
    }
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /b/file2.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] Project '/dev/null/inferredProject3*' (Inferred)
Info seq  [hh:mm:ss:mss] 	Files (1)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Project '/dev/null/inferredProject1*' (Inferred)
Info seq  [hh:mm:ss:mss] 	Files (2)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Project '/dev/null/inferredProject2*' (Inferred)
Info seq  [hh:mm:ss:mss] 	Files (1)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: /c/file3.ts ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /dev/null/inferredProject3*
Info seq  [hh:mm:ss:mss] response:
    {
      "responseRequired": false
    }
After request

PolledWatches::
/a/bower_components:
  {"pollingInterval":500}
/a/lib/lib.es6.d.ts:
  {"pollingInterval":500}
/a/lib/lib.esnext.full.d.ts:
  {"pollingInterval":500}
/a/node_modules:
  {"pollingInterval":500}
/b/bower_components:
  {"pollingInterval":500}
/b/node_modules:
  {"pollingInterval":500}
/bower_components:
  {"pollingInterval":500}
/node_modules:
  {"pollingInterval":500}

FsWatches::
/A/file2.ts:
  {}
/a/file1.ts:
  {}
/b/file2.ts: *new*
  {}

Before request

Info seq  [hh:mm:ss:mss] request:
    {
      "command": "close",
      "arguments": {
        "file": "/c/file3.ts"
      },
      "seq": 10,
      "type": "request"
    }
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /c/file3.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] Project '/dev/null/inferredProject3*' (Inferred)
Info seq  [hh:mm:ss:mss] 	Files (1)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Project '/dev/null/inferredProject1*' (Inferred)
Info seq  [hh:mm:ss:mss] 	Files (2)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Project '/dev/null/inferredProject2*' (Inferred)
Info seq  [hh:mm:ss:mss] 	Files (1)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] response:
    {
      "responseRequired": false
    }
After request

PolledWatches::
/a/bower_components:
  {"pollingInterval":500}
/a/lib/lib.es6.d.ts:
  {"pollingInterval":500}
/a/lib/lib.esnext.full.d.ts:
  {"pollingInterval":500}
/a/node_modules:
  {"pollingInterval":500}
/b/bower_components:
  {"pollingInterval":500}
/b/node_modules:
  {"pollingInterval":500}
/bower_components:
  {"pollingInterval":500}
/node_modules:
  {"pollingInterval":500}

FsWatches::
/A/file2.ts:
  {}
/a/file1.ts:
  {}
/b/file2.ts:
  {}
/c/file3.ts: *new*
  {}

Before request

Info seq  [hh:mm:ss:mss] request:
    {
      "command": "open",
      "arguments": {
        "file": "/a/file1.ts",
        "projectRootPath": "/a",
        "fileContent": "let x = 1;",
        "scriptKindName": "JS"
      },
      "seq": 11,
      "type": "request"
    }
Info seq  [hh:mm:ss:mss] FileWatcher:: Close:: WatchInfo: /a/file1.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] Search path: /a
Info seq  [hh:mm:ss:mss] For info: /a/file1.ts :: No config files found.
Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: /dev/null/inferredProject1*
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: /dev/null/inferredProject1* Version: 3 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Project '/dev/null/inferredProject1*' (Inferred)
Info seq  [hh:mm:ss:mss] 	Files (1)
	/a/file1.ts SVC-1-0 "let x = 1;"


	file1.ts
	  Root file specified for compilation

Info seq  [hh:mm:ss:mss] -----------------------------------------------
TI:: [hh:mm:ss:mss] Got install request
    {
      "projectName": "/dev/null/inferredProject1*",
      "fileNames": [
        "/a/file1.ts"
      ],
      "compilerOptions": {
        "allowJs": true,
        "target": 2,
        "allowNonTsExtensions": true,
        "noEmitForJsFiles": true,
        "maxNodeModuleJsDepth": 2
      },
      "typeAcquisition": {
        "enable": true,
        "include": [],
        "exclude": []
      },
      "unresolvedImports": [],
      "projectRootPath": "/a",
      "kind": "discover"
    }
TI:: [hh:mm:ss:mss] Explicitly included types: []
TI:: [hh:mm:ss:mss] Inferred typings from unresolved imports: []
TI:: [hh:mm:ss:mss] Finished typings discovery:
    {
      "cachedTypingPaths": [],
      "newTypingNames": [],
      "filesToWatch": [
        "/a/bower_components",
        "/a/node_modules"
      ]
    }
TI:: [hh:mm:ss:mss] Sending response:
    {
      "kind": "action::watchTypingLocations",
      "projectName": "/dev/null/inferredProject1*"
    }
TI:: [hh:mm:ss:mss] Sending response:
    {
      "projectName": "/dev/null/inferredProject1*",
      "typeAcquisition": {
        "enable": true,
        "include": [],
        "exclude": []
      },
      "compilerOptions": {
        "allowJs": true,
        "target": 2,
        "allowNonTsExtensions": true,
        "noEmitForJsFiles": true,
        "maxNodeModuleJsDepth": 2
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
        "projectName": "/dev/null/inferredProject1*",
        "typeAcquisition": {
          "enable": true,
          "include": [],
          "exclude": []
        },
        "compilerOptions": {
          "allowJs": true,
          "target": 2,
          "allowNonTsExtensions": true,
          "noEmitForJsFiles": true,
          "maxNodeModuleJsDepth": 2
        },
        "typings": [],
        "unresolvedImports": [],
        "kind": "action::set"
      }
    }
TI:: [hh:mm:ss:mss] No new typings were requested as a result of typings discovery
Info seq  [hh:mm:ss:mss] `remove Project::
Info seq  [hh:mm:ss:mss] Project '/dev/null/inferredProject3*' (Inferred)
Info seq  [hh:mm:ss:mss] 	Files (1)
	/c/file3.ts


	c/file3.ts
	  Root file specified for compilation

Info seq  [hh:mm:ss:mss] -----------------------------------------------
TI:: [hh:mm:ss:mss] Closing file watchers for project '/dev/null/inferredProject3*'
TI:: [hh:mm:ss:mss] Sending response:
    {
      "kind": "action::watchTypingLocations",
      "projectName": "/dev/null/inferredProject3*",
      "files": []
    }
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Close:: WatchInfo: /bower_components 1 undefined Project: /dev/null/inferredProject3* WatchType: Directory location for typing installer
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Close:: WatchInfo: /bower_components 1 undefined Project: /dev/null/inferredProject3* WatchType: Directory location for typing installer
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Close:: WatchInfo: /node_modules 1 undefined Project: /dev/null/inferredProject3* WatchType: Directory location for typing installer
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Close:: WatchInfo: /node_modules 1 undefined Project: /dev/null/inferredProject3* WatchType: Directory location for typing installer
TI:: [hh:mm:ss:mss] Closing file watchers for project '/dev/null/inferredProject3*' - done.
Info seq  [hh:mm:ss:mss] FileWatcher:: Close:: WatchInfo: /a/lib/lib.esnext.full.d.ts 500 undefined Project: /dev/null/inferredProject3* WatchType: Missing file
Info seq  [hh:mm:ss:mss] `remove Project::
Info seq  [hh:mm:ss:mss] Project '/dev/null/inferredProject2*' (Inferred)
Info seq  [hh:mm:ss:mss] 	Files (1)
	/b/file2.ts


	file2.ts
	  Root file specified for compilation

Info seq  [hh:mm:ss:mss] -----------------------------------------------
TI:: [hh:mm:ss:mss] Closing file watchers for project '/dev/null/inferredProject2*'
TI:: [hh:mm:ss:mss] Sending response:
    {
      "kind": "action::watchTypingLocations",
      "projectName": "/dev/null/inferredProject2*",
      "files": []
    }
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Close:: WatchInfo: /b/bower_components 1 undefined Project: /dev/null/inferredProject2* WatchType: Directory location for typing installer
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Close:: WatchInfo: /b/bower_components 1 undefined Project: /dev/null/inferredProject2* WatchType: Directory location for typing installer
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Close:: WatchInfo: /b/node_modules 1 undefined Project: /dev/null/inferredProject2* WatchType: Directory location for typing installer
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Close:: WatchInfo: /b/node_modules 1 undefined Project: /dev/null/inferredProject2* WatchType: Directory location for typing installer
TI:: [hh:mm:ss:mss] Closing file watchers for project '/dev/null/inferredProject2*' - done.
Info seq  [hh:mm:ss:mss] FileWatcher:: Close:: WatchInfo: /a/lib/lib.esnext.full.d.ts 500 undefined Project: /dev/null/inferredProject2* WatchType: Missing file
Info seq  [hh:mm:ss:mss] FileWatcher:: Close:: WatchInfo: /A/file2.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] FileWatcher:: Close:: WatchInfo: /b/file2.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] FileWatcher:: Close:: WatchInfo: /c/file3.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] Project '/dev/null/inferredProject1*' (Inferred)
Info seq  [hh:mm:ss:mss] 	Files (1)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: /a/file1.ts ProjectRootPath: /a
Info seq  [hh:mm:ss:mss] 		Projects: /dev/null/inferredProject1*
Info seq  [hh:mm:ss:mss] response:
    {
      "responseRequired": false
    }
After request

PolledWatches::
/a/bower_components:
  {"pollingInterval":500}
/a/lib/lib.es6.d.ts:
  {"pollingInterval":500}
/a/node_modules:
  {"pollingInterval":500}

PolledWatches *deleted*::
/a/lib/lib.esnext.full.d.ts:
  {"pollingInterval":500}
/b/bower_components:
  {"pollingInterval":500}
/b/node_modules:
  {"pollingInterval":500}
/bower_components:
  {"pollingInterval":500}
/node_modules:
  {"pollingInterval":500}

FsWatches *deleted*::
/A/file2.ts:
  {}
/a/file1.ts:
  {}
/b/file2.ts:
  {}
/c/file3.ts:
  {}

Before request

Info seq  [hh:mm:ss:mss] request:
    {
      "command": "open",
      "arguments": {
        "file": "/A/file2.ts",
        "projectRootPath": "/A",
        "fileContent": "let y = 2;",
        "scriptKindName": "JS"
      },
      "seq": 12,
      "type": "request"
    }
Info seq  [hh:mm:ss:mss] Search path: /A
Info seq  [hh:mm:ss:mss] For info: /A/file2.ts :: No config files found.
Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: /dev/null/inferredProject1*
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: /dev/null/inferredProject1* Version: 4 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Project '/dev/null/inferredProject1*' (Inferred)
Info seq  [hh:mm:ss:mss] 	Files (2)
	/a/file1.ts SVC-1-0 "let x = 1;"
	/A/file2.ts SVC-2-0 "let y = 2;"


	file1.ts
	  Root file specified for compilation
	file2.ts
	  Root file specified for compilation

Info seq  [hh:mm:ss:mss] -----------------------------------------------
TI:: [hh:mm:ss:mss] Got install request
    {
      "projectName": "/dev/null/inferredProject1*",
      "fileNames": [
        "/a/file1.ts",
        "/A/file2.ts"
      ],
      "compilerOptions": {
        "allowJs": true,
        "target": 2,
        "allowNonTsExtensions": true,
        "noEmitForJsFiles": true,
        "maxNodeModuleJsDepth": 2
      },
      "typeAcquisition": {
        "enable": true,
        "include": [],
        "exclude": []
      },
      "unresolvedImports": [],
      "projectRootPath": "/a",
      "kind": "discover"
    }
TI:: [hh:mm:ss:mss] Explicitly included types: []
TI:: [hh:mm:ss:mss] Inferred typings from unresolved imports: []
TI:: [hh:mm:ss:mss] Finished typings discovery:
    {
      "cachedTypingPaths": [],
      "newTypingNames": [],
      "filesToWatch": [
        "/a/bower_components",
        "/a/node_modules"
      ]
    }
TI:: [hh:mm:ss:mss] Sending response:
    {
      "kind": "action::watchTypingLocations",
      "projectName": "/dev/null/inferredProject1*"
    }
TI:: [hh:mm:ss:mss] Sending response:
    {
      "projectName": "/dev/null/inferredProject1*",
      "typeAcquisition": {
        "enable": true,
        "include": [],
        "exclude": []
      },
      "compilerOptions": {
        "allowJs": true,
        "target": 2,
        "allowNonTsExtensions": true,
        "noEmitForJsFiles": true,
        "maxNodeModuleJsDepth": 2
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
        "projectName": "/dev/null/inferredProject1*",
        "typeAcquisition": {
          "enable": true,
          "include": [],
          "exclude": []
        },
        "compilerOptions": {
          "allowJs": true,
          "target": 2,
          "allowNonTsExtensions": true,
          "noEmitForJsFiles": true,
          "maxNodeModuleJsDepth": 2
        },
        "typings": [],
        "unresolvedImports": [],
        "kind": "action::set"
      }
    }
TI:: [hh:mm:ss:mss] No new typings were requested as a result of typings discovery
Info seq  [hh:mm:ss:mss] Project '/dev/null/inferredProject1*' (Inferred)
Info seq  [hh:mm:ss:mss] 	Files (2)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: /a/file1.ts ProjectRootPath: /a
Info seq  [hh:mm:ss:mss] 		Projects: /dev/null/inferredProject1*
Info seq  [hh:mm:ss:mss] 	FileName: /A/file2.ts ProjectRootPath: /A
Info seq  [hh:mm:ss:mss] 		Projects: /dev/null/inferredProject1*
Info seq  [hh:mm:ss:mss] response:
    {
      "responseRequired": false
    }
After request

Before request

Info seq  [hh:mm:ss:mss] request:
    {
      "command": "open",
      "arguments": {
        "file": "/b/file2.ts",
        "projectRootPath": "/b",
        "fileContent": "let x = 3;",
        "scriptKindName": "JS"
      },
      "seq": 13,
      "type": "request"
    }
Info seq  [hh:mm:ss:mss] Search path: /b
Info seq  [hh:mm:ss:mss] For info: /b/file2.ts :: No config files found.
Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: /dev/null/inferredProject4*
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /a/lib/lib.esnext.full.d.ts 500 undefined Project: /dev/null/inferredProject4* WatchType: Missing file
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: /dev/null/inferredProject4* Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Project '/dev/null/inferredProject4*' (Inferred)
Info seq  [hh:mm:ss:mss] 	Files (1)
	/b/file2.ts SVC-2-0 "let x = 3;"


	file2.ts
	  Root file specified for compilation

Info seq  [hh:mm:ss:mss] -----------------------------------------------
TI:: [hh:mm:ss:mss] Got install request
    {
      "projectName": "/dev/null/inferredProject4*",
      "fileNames": [
        "/b/file2.ts"
      ],
      "compilerOptions": {
        "allowJs": true,
        "target": 99,
        "allowNonTsExtensions": true,
        "noEmitForJsFiles": true,
        "maxNodeModuleJsDepth": 2
      },
      "typeAcquisition": {
        "enable": true,
        "include": [],
        "exclude": []
      },
      "unresolvedImports": [],
      "projectRootPath": "/b",
      "kind": "discover"
    }
TI:: [hh:mm:ss:mss] Explicitly included types: []
TI:: [hh:mm:ss:mss] Inferred typings from unresolved imports: []
TI:: [hh:mm:ss:mss] Finished typings discovery:
    {
      "cachedTypingPaths": [],
      "newTypingNames": [],
      "filesToWatch": [
        "/b/bower_components",
        "/b/node_modules"
      ]
    }
TI:: [hh:mm:ss:mss] Sending response:
    {
      "kind": "action::watchTypingLocations",
      "projectName": "/dev/null/inferredProject4*",
      "files": [
        "/b/bower_components",
        "/b/node_modules"
      ]
    }
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /b/bower_components 1 undefined Project: /dev/null/inferredProject4* WatchType: Directory location for typing installer
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /b/bower_components 1 undefined Project: /dev/null/inferredProject4* WatchType: Directory location for typing installer
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /b/node_modules 1 undefined Project: /dev/null/inferredProject4* WatchType: Directory location for typing installer
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /b/node_modules 1 undefined Project: /dev/null/inferredProject4* WatchType: Directory location for typing installer
TI:: [hh:mm:ss:mss] Sending response:
    {
      "projectName": "/dev/null/inferredProject4*",
      "typeAcquisition": {
        "enable": true,
        "include": [],
        "exclude": []
      },
      "compilerOptions": {
        "allowJs": true,
        "target": 99,
        "allowNonTsExtensions": true,
        "noEmitForJsFiles": true,
        "maxNodeModuleJsDepth": 2
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
        "projectName": "/dev/null/inferredProject4*",
        "typeAcquisition": {
          "enable": true,
          "include": [],
          "exclude": []
        },
        "compilerOptions": {
          "allowJs": true,
          "target": 99,
          "allowNonTsExtensions": true,
          "noEmitForJsFiles": true,
          "maxNodeModuleJsDepth": 2
        },
        "typings": [],
        "unresolvedImports": [],
        "kind": "action::set"
      }
    }
TI:: [hh:mm:ss:mss] No new typings were requested as a result of typings discovery
Info seq  [hh:mm:ss:mss] Project '/dev/null/inferredProject1*' (Inferred)
Info seq  [hh:mm:ss:mss] 	Files (2)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Project '/dev/null/inferredProject4*' (Inferred)
Info seq  [hh:mm:ss:mss] 	Files (1)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: /a/file1.ts ProjectRootPath: /a
Info seq  [hh:mm:ss:mss] 		Projects: /dev/null/inferredProject1*
Info seq  [hh:mm:ss:mss] 	FileName: /A/file2.ts ProjectRootPath: /A
Info seq  [hh:mm:ss:mss] 		Projects: /dev/null/inferredProject1*
Info seq  [hh:mm:ss:mss] 	FileName: /b/file2.ts ProjectRootPath: /b
Info seq  [hh:mm:ss:mss] 		Projects: /dev/null/inferredProject4*
Info seq  [hh:mm:ss:mss] response:
    {
      "responseRequired": false
    }
After request

PolledWatches::
/a/bower_components:
  {"pollingInterval":500}
/a/lib/lib.es6.d.ts:
  {"pollingInterval":500}
/a/lib/lib.esnext.full.d.ts: *new*
  {"pollingInterval":500}
/a/node_modules:
  {"pollingInterval":500}
/b/bower_components: *new*
  {"pollingInterval":500}
/b/node_modules: *new*
  {"pollingInterval":500}

Before request

Info seq  [hh:mm:ss:mss] request:
    {
      "command": "open",
      "arguments": {
        "file": "/c/file3.ts",
        "fileContent": "let z = 4;",
        "scriptKindName": "JS"
      },
      "seq": 14,
      "type": "request"
    }
Info seq  [hh:mm:ss:mss] Search path: /c
Info seq  [hh:mm:ss:mss] For info: /c/file3.ts :: No config files found.
Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: /dev/null/inferredProject5*
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /a/lib/lib.esnext.full.d.ts 500 undefined Project: /dev/null/inferredProject5* WatchType: Missing file
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: /dev/null/inferredProject5* Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Project '/dev/null/inferredProject5*' (Inferred)
Info seq  [hh:mm:ss:mss] 	Files (1)
	/c/file3.ts SVC-2-0 "let z = 4;"


	c/file3.ts
	  Root file specified for compilation

Info seq  [hh:mm:ss:mss] -----------------------------------------------
TI:: [hh:mm:ss:mss] Got install request
    {
      "projectName": "/dev/null/inferredProject5*",
      "fileNames": [
        "/c/file3.ts"
      ],
      "compilerOptions": {
        "allowJs": true,
        "target": 99,
        "allowNonTsExtensions": true,
        "noEmitForJsFiles": true,
        "maxNodeModuleJsDepth": 2
      },
      "typeAcquisition": {
        "enable": true,
        "include": [],
        "exclude": []
      },
      "unresolvedImports": [],
      "projectRootPath": "/",
      "kind": "discover"
    }
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
      "projectName": "/dev/null/inferredProject5*",
      "files": [
        "/bower_components",
        "/node_modules"
      ]
    }
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /bower_components 1 undefined Project: /dev/null/inferredProject5* WatchType: Directory location for typing installer
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /bower_components 1 undefined Project: /dev/null/inferredProject5* WatchType: Directory location for typing installer
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /node_modules 1 undefined Project: /dev/null/inferredProject5* WatchType: Directory location for typing installer
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /node_modules 1 undefined Project: /dev/null/inferredProject5* WatchType: Directory location for typing installer
TI:: [hh:mm:ss:mss] Sending response:
    {
      "projectName": "/dev/null/inferredProject5*",
      "typeAcquisition": {
        "enable": true,
        "include": [],
        "exclude": []
      },
      "compilerOptions": {
        "allowJs": true,
        "target": 99,
        "allowNonTsExtensions": true,
        "noEmitForJsFiles": true,
        "maxNodeModuleJsDepth": 2
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
        "projectName": "/dev/null/inferredProject5*",
        "typeAcquisition": {
          "enable": true,
          "include": [],
          "exclude": []
        },
        "compilerOptions": {
          "allowJs": true,
          "target": 99,
          "allowNonTsExtensions": true,
          "noEmitForJsFiles": true,
          "maxNodeModuleJsDepth": 2
        },
        "typings": [],
        "unresolvedImports": [],
        "kind": "action::set"
      }
    }
TI:: [hh:mm:ss:mss] No new typings were requested as a result of typings discovery
Info seq  [hh:mm:ss:mss] Project '/dev/null/inferredProject5*' (Inferred)
Info seq  [hh:mm:ss:mss] 	Files (1)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Project '/dev/null/inferredProject1*' (Inferred)
Info seq  [hh:mm:ss:mss] 	Files (2)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Project '/dev/null/inferredProject4*' (Inferred)
Info seq  [hh:mm:ss:mss] 	Files (1)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: /a/file1.ts ProjectRootPath: /a
Info seq  [hh:mm:ss:mss] 		Projects: /dev/null/inferredProject1*
Info seq  [hh:mm:ss:mss] 	FileName: /A/file2.ts ProjectRootPath: /A
Info seq  [hh:mm:ss:mss] 		Projects: /dev/null/inferredProject1*
Info seq  [hh:mm:ss:mss] 	FileName: /b/file2.ts ProjectRootPath: /b
Info seq  [hh:mm:ss:mss] 		Projects: /dev/null/inferredProject4*
Info seq  [hh:mm:ss:mss] 	FileName: /c/file3.ts ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /dev/null/inferredProject5*
Info seq  [hh:mm:ss:mss] response:
    {
      "responseRequired": false
    }
After request

PolledWatches::
/a/bower_components:
  {"pollingInterval":500}
/a/lib/lib.es6.d.ts:
  {"pollingInterval":500}
/a/lib/lib.esnext.full.d.ts:
  {"pollingInterval":500}
/a/node_modules:
  {"pollingInterval":500}
/b/bower_components:
  {"pollingInterval":500}
/b/node_modules:
  {"pollingInterval":500}
/bower_components: *new*
  {"pollingInterval":500}
/node_modules: *new*
  {"pollingInterval":500}

Before request

Info seq  [hh:mm:ss:mss] request:
    {
      "command": "close",
      "arguments": {
        "file": "/a/file1.ts"
      },
      "seq": 15,
      "type": "request"
    }
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /a/file1.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] Project '/dev/null/inferredProject5*' (Inferred)
Info seq  [hh:mm:ss:mss] 	Files (1)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Project '/dev/null/inferredProject1*' (Inferred)
Info seq  [hh:mm:ss:mss] 	Files (2)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Project '/dev/null/inferredProject4*' (Inferred)
Info seq  [hh:mm:ss:mss] 	Files (1)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: /A/file2.ts ProjectRootPath: /A
Info seq  [hh:mm:ss:mss] 		Projects: /dev/null/inferredProject1*
Info seq  [hh:mm:ss:mss] 	FileName: /b/file2.ts ProjectRootPath: /b
Info seq  [hh:mm:ss:mss] 		Projects: /dev/null/inferredProject4*
Info seq  [hh:mm:ss:mss] 	FileName: /c/file3.ts ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /dev/null/inferredProject5*
Info seq  [hh:mm:ss:mss] response:
    {
      "responseRequired": false
    }
After request

PolledWatches::
/a/bower_components:
  {"pollingInterval":500}
/a/lib/lib.es6.d.ts:
  {"pollingInterval":500}
/a/lib/lib.esnext.full.d.ts:
  {"pollingInterval":500}
/a/node_modules:
  {"pollingInterval":500}
/b/bower_components:
  {"pollingInterval":500}
/b/node_modules:
  {"pollingInterval":500}
/bower_components:
  {"pollingInterval":500}
/node_modules:
  {"pollingInterval":500}

FsWatches::
/a/file1.ts: *new*
  {}

Before request

Info seq  [hh:mm:ss:mss] request:
    {
      "command": "close",
      "arguments": {
        "file": "/A/file2.ts"
      },
      "seq": 16,
      "type": "request"
    }
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /A/file2.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] Project '/dev/null/inferredProject5*' (Inferred)
Info seq  [hh:mm:ss:mss] 	Files (1)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Project '/dev/null/inferredProject1*' (Inferred)
Info seq  [hh:mm:ss:mss] 	Files (2)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Project '/dev/null/inferredProject4*' (Inferred)
Info seq  [hh:mm:ss:mss] 	Files (1)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: /b/file2.ts ProjectRootPath: /b
Info seq  [hh:mm:ss:mss] 		Projects: /dev/null/inferredProject4*
Info seq  [hh:mm:ss:mss] 	FileName: /c/file3.ts ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /dev/null/inferredProject5*
Info seq  [hh:mm:ss:mss] response:
    {
      "responseRequired": false
    }
After request

PolledWatches::
/a/bower_components:
  {"pollingInterval":500}
/a/lib/lib.es6.d.ts:
  {"pollingInterval":500}
/a/lib/lib.esnext.full.d.ts:
  {"pollingInterval":500}
/a/node_modules:
  {"pollingInterval":500}
/b/bower_components:
  {"pollingInterval":500}
/b/node_modules:
  {"pollingInterval":500}
/bower_components:
  {"pollingInterval":500}
/node_modules:
  {"pollingInterval":500}

FsWatches::
/A/file2.ts: *new*
  {}
/a/file1.ts:
  {}

Before request

Info seq  [hh:mm:ss:mss] request:
    {
      "command": "close",
      "arguments": {
        "file": "/b/file2.ts"
      },
      "seq": 17,
      "type": "request"
    }
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /b/file2.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] Project '/dev/null/inferredProject5*' (Inferred)
Info seq  [hh:mm:ss:mss] 	Files (1)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Project '/dev/null/inferredProject1*' (Inferred)
Info seq  [hh:mm:ss:mss] 	Files (2)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Project '/dev/null/inferredProject4*' (Inferred)
Info seq  [hh:mm:ss:mss] 	Files (1)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: /c/file3.ts ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /dev/null/inferredProject5*
Info seq  [hh:mm:ss:mss] response:
    {
      "responseRequired": false
    }
After request

PolledWatches::
/a/bower_components:
  {"pollingInterval":500}
/a/lib/lib.es6.d.ts:
  {"pollingInterval":500}
/a/lib/lib.esnext.full.d.ts:
  {"pollingInterval":500}
/a/node_modules:
  {"pollingInterval":500}
/b/bower_components:
  {"pollingInterval":500}
/b/node_modules:
  {"pollingInterval":500}
/bower_components:
  {"pollingInterval":500}
/node_modules:
  {"pollingInterval":500}

FsWatches::
/A/file2.ts:
  {}
/a/file1.ts:
  {}
/b/file2.ts: *new*
  {}

Before request

Info seq  [hh:mm:ss:mss] request:
    {
      "command": "close",
      "arguments": {
        "file": "/c/file3.ts"
      },
      "seq": 18,
      "type": "request"
    }
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /c/file3.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] Project '/dev/null/inferredProject5*' (Inferred)
Info seq  [hh:mm:ss:mss] 	Files (1)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Project '/dev/null/inferredProject1*' (Inferred)
Info seq  [hh:mm:ss:mss] 	Files (2)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Project '/dev/null/inferredProject4*' (Inferred)
Info seq  [hh:mm:ss:mss] 	Files (1)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] response:
    {
      "responseRequired": false
    }
After request

PolledWatches::
/a/bower_components:
  {"pollingInterval":500}
/a/lib/lib.es6.d.ts:
  {"pollingInterval":500}
/a/lib/lib.esnext.full.d.ts:
  {"pollingInterval":500}
/a/node_modules:
  {"pollingInterval":500}
/b/bower_components:
  {"pollingInterval":500}
/b/node_modules:
  {"pollingInterval":500}
/bower_components:
  {"pollingInterval":500}
/node_modules:
  {"pollingInterval":500}

FsWatches::
/A/file2.ts:
  {}
/a/file1.ts:
  {}
/b/file2.ts:
  {}
/c/file3.ts: *new*
  {}

Before request

Info seq  [hh:mm:ss:mss] request:
    {
      "command": "compilerOptionsForInferredProjects",
      "arguments": {
        "options": {
          "allowJs": true,
          "target": "ES2017"
        },
        "projectRootPath": "/A"
      },
      "seq": 19,
      "type": "request"
    }
Info seq  [hh:mm:ss:mss] Scheduled: /dev/null/inferredProject1*
Info seq  [hh:mm:ss:mss] response:
    {
      "response": true,
      "responseRequired": true
    }
After request

Timeout callback:: count: 1
1: /dev/null/inferredProject1* *new*

Before request

Info seq  [hh:mm:ss:mss] request:
    {
      "command": "open",
      "arguments": {
        "file": "/a/file1.ts",
        "projectRootPath": "/a",
        "fileContent": "let x = 1;",
        "scriptKindName": "JS"
      },
      "seq": 20,
      "type": "request"
    }
Info seq  [hh:mm:ss:mss] FileWatcher:: Close:: WatchInfo: /a/file1.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] Search path: /a
Info seq  [hh:mm:ss:mss] For info: /a/file1.ts :: No config files found.
Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: /dev/null/inferredProject1*
Info seq  [hh:mm:ss:mss] FileWatcher:: Close:: WatchInfo: /a/lib/lib.es6.d.ts 500 undefined Project: /dev/null/inferredProject1* WatchType: Missing file
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /a/lib/lib.es2017.full.d.ts 500 undefined Project: /dev/null/inferredProject1* WatchType: Missing file
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: /dev/null/inferredProject1* Version: 5 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Project '/dev/null/inferredProject1*' (Inferred)
Info seq  [hh:mm:ss:mss] 	Files (1)
	/a/file1.ts SVC-1-0 "let x = 1;"


	file1.ts
	  Root file specified for compilation

Info seq  [hh:mm:ss:mss] -----------------------------------------------
TI:: [hh:mm:ss:mss] Got install request
    {
      "projectName": "/dev/null/inferredProject1*",
      "fileNames": [
        "/a/file1.ts"
      ],
      "compilerOptions": {
        "allowJs": true,
        "target": 4,
        "allowNonTsExtensions": true,
        "maxNodeModuleJsDepth": 2,
        "noEmitForJsFiles": true
      },
      "typeAcquisition": {
        "enable": true,
        "include": [],
        "exclude": []
      },
      "unresolvedImports": [],
      "projectRootPath": "/a",
      "kind": "discover"
    }
TI:: [hh:mm:ss:mss] Explicitly included types: []
TI:: [hh:mm:ss:mss] Inferred typings from unresolved imports: []
TI:: [hh:mm:ss:mss] Finished typings discovery:
    {
      "cachedTypingPaths": [],
      "newTypingNames": [],
      "filesToWatch": [
        "/a/bower_components",
        "/a/node_modules"
      ]
    }
TI:: [hh:mm:ss:mss] Sending response:
    {
      "kind": "action::watchTypingLocations",
      "projectName": "/dev/null/inferredProject1*"
    }
TI:: [hh:mm:ss:mss] Sending response:
    {
      "projectName": "/dev/null/inferredProject1*",
      "typeAcquisition": {
        "enable": true,
        "include": [],
        "exclude": []
      },
      "compilerOptions": {
        "allowJs": true,
        "target": 4,
        "allowNonTsExtensions": true,
        "maxNodeModuleJsDepth": 2,
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
        "projectName": "/dev/null/inferredProject1*",
        "typeAcquisition": {
          "enable": true,
          "include": [],
          "exclude": []
        },
        "compilerOptions": {
          "allowJs": true,
          "target": 4,
          "allowNonTsExtensions": true,
          "maxNodeModuleJsDepth": 2,
          "noEmitForJsFiles": true
        },
        "typings": [],
        "unresolvedImports": [],
        "kind": "action::set"
      }
    }
TI:: [hh:mm:ss:mss] No new typings were requested as a result of typings discovery
Info seq  [hh:mm:ss:mss] `remove Project::
Info seq  [hh:mm:ss:mss] Project '/dev/null/inferredProject5*' (Inferred)
Info seq  [hh:mm:ss:mss] 	Files (1)
	/c/file3.ts


	c/file3.ts
	  Root file specified for compilation

Info seq  [hh:mm:ss:mss] -----------------------------------------------
TI:: [hh:mm:ss:mss] Closing file watchers for project '/dev/null/inferredProject5*'
TI:: [hh:mm:ss:mss] Sending response:
    {
      "kind": "action::watchTypingLocations",
      "projectName": "/dev/null/inferredProject5*",
      "files": []
    }
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Close:: WatchInfo: /bower_components 1 undefined Project: /dev/null/inferredProject5* WatchType: Directory location for typing installer
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Close:: WatchInfo: /bower_components 1 undefined Project: /dev/null/inferredProject5* WatchType: Directory location for typing installer
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Close:: WatchInfo: /node_modules 1 undefined Project: /dev/null/inferredProject5* WatchType: Directory location for typing installer
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Close:: WatchInfo: /node_modules 1 undefined Project: /dev/null/inferredProject5* WatchType: Directory location for typing installer
TI:: [hh:mm:ss:mss] Closing file watchers for project '/dev/null/inferredProject5*' - done.
Info seq  [hh:mm:ss:mss] FileWatcher:: Close:: WatchInfo: /a/lib/lib.esnext.full.d.ts 500 undefined Project: /dev/null/inferredProject5* WatchType: Missing file
Info seq  [hh:mm:ss:mss] `remove Project::
Info seq  [hh:mm:ss:mss] Project '/dev/null/inferredProject4*' (Inferred)
Info seq  [hh:mm:ss:mss] 	Files (1)
	/b/file2.ts


	file2.ts
	  Root file specified for compilation

Info seq  [hh:mm:ss:mss] -----------------------------------------------
TI:: [hh:mm:ss:mss] Closing file watchers for project '/dev/null/inferredProject4*'
TI:: [hh:mm:ss:mss] Sending response:
    {
      "kind": "action::watchTypingLocations",
      "projectName": "/dev/null/inferredProject4*",
      "files": []
    }
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Close:: WatchInfo: /b/bower_components 1 undefined Project: /dev/null/inferredProject4* WatchType: Directory location for typing installer
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Close:: WatchInfo: /b/bower_components 1 undefined Project: /dev/null/inferredProject4* WatchType: Directory location for typing installer
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Close:: WatchInfo: /b/node_modules 1 undefined Project: /dev/null/inferredProject4* WatchType: Directory location for typing installer
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Close:: WatchInfo: /b/node_modules 1 undefined Project: /dev/null/inferredProject4* WatchType: Directory location for typing installer
TI:: [hh:mm:ss:mss] Closing file watchers for project '/dev/null/inferredProject4*' - done.
Info seq  [hh:mm:ss:mss] FileWatcher:: Close:: WatchInfo: /a/lib/lib.esnext.full.d.ts 500 undefined Project: /dev/null/inferredProject4* WatchType: Missing file
Info seq  [hh:mm:ss:mss] FileWatcher:: Close:: WatchInfo: /A/file2.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] FileWatcher:: Close:: WatchInfo: /b/file2.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] FileWatcher:: Close:: WatchInfo: /c/file3.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] Project '/dev/null/inferredProject1*' (Inferred)
Info seq  [hh:mm:ss:mss] 	Files (1)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: /a/file1.ts ProjectRootPath: /a
Info seq  [hh:mm:ss:mss] 		Projects: /dev/null/inferredProject1*
Info seq  [hh:mm:ss:mss] response:
    {
      "responseRequired": false
    }
After request

PolledWatches::
/a/bower_components:
  {"pollingInterval":500}
/a/lib/lib.es2017.full.d.ts: *new*
  {"pollingInterval":500}
/a/node_modules:
  {"pollingInterval":500}

PolledWatches *deleted*::
/a/lib/lib.es6.d.ts:
  {"pollingInterval":500}
/a/lib/lib.esnext.full.d.ts:
  {"pollingInterval":500}
/b/bower_components:
  {"pollingInterval":500}
/b/node_modules:
  {"pollingInterval":500}
/bower_components:
  {"pollingInterval":500}
/node_modules:
  {"pollingInterval":500}

FsWatches *deleted*::
/A/file2.ts:
  {}
/a/file1.ts:
  {}
/b/file2.ts:
  {}
/c/file3.ts:
  {}

Before request

Info seq  [hh:mm:ss:mss] request:
    {
      "command": "open",
      "arguments": {
        "file": "/A/file2.ts",
        "projectRootPath": "/a",
        "fileContent": "let y = 2;",
        "scriptKindName": "JS"
      },
      "seq": 21,
      "type": "request"
    }
Info seq  [hh:mm:ss:mss] Search path: /A
Info seq  [hh:mm:ss:mss] For info: /A/file2.ts :: No config files found.
Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: /dev/null/inferredProject1*
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: /dev/null/inferredProject1* Version: 6 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Project '/dev/null/inferredProject1*' (Inferred)
Info seq  [hh:mm:ss:mss] 	Files (2)
	/a/file1.ts SVC-1-0 "let x = 1;"
	/A/file2.ts SVC-3-0 "let y = 2;"


	file1.ts
	  Root file specified for compilation
	file2.ts
	  Root file specified for compilation

Info seq  [hh:mm:ss:mss] -----------------------------------------------
TI:: [hh:mm:ss:mss] Got install request
    {
      "projectName": "/dev/null/inferredProject1*",
      "fileNames": [
        "/a/file1.ts",
        "/A/file2.ts"
      ],
      "compilerOptions": {
        "allowJs": true,
        "target": 4,
        "allowNonTsExtensions": true,
        "maxNodeModuleJsDepth": 2,
        "noEmitForJsFiles": true
      },
      "typeAcquisition": {
        "enable": true,
        "include": [],
        "exclude": []
      },
      "unresolvedImports": [],
      "projectRootPath": "/a",
      "kind": "discover"
    }
TI:: [hh:mm:ss:mss] Explicitly included types: []
TI:: [hh:mm:ss:mss] Inferred typings from unresolved imports: []
TI:: [hh:mm:ss:mss] Finished typings discovery:
    {
      "cachedTypingPaths": [],
      "newTypingNames": [],
      "filesToWatch": [
        "/a/bower_components",
        "/a/node_modules"
      ]
    }
TI:: [hh:mm:ss:mss] Sending response:
    {
      "kind": "action::watchTypingLocations",
      "projectName": "/dev/null/inferredProject1*"
    }
TI:: [hh:mm:ss:mss] Sending response:
    {
      "projectName": "/dev/null/inferredProject1*",
      "typeAcquisition": {
        "enable": true,
        "include": [],
        "exclude": []
      },
      "compilerOptions": {
        "allowJs": true,
        "target": 4,
        "allowNonTsExtensions": true,
        "maxNodeModuleJsDepth": 2,
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
        "projectName": "/dev/null/inferredProject1*",
        "typeAcquisition": {
          "enable": true,
          "include": [],
          "exclude": []
        },
        "compilerOptions": {
          "allowJs": true,
          "target": 4,
          "allowNonTsExtensions": true,
          "maxNodeModuleJsDepth": 2,
          "noEmitForJsFiles": true
        },
        "typings": [],
        "unresolvedImports": [],
        "kind": "action::set"
      }
    }
TI:: [hh:mm:ss:mss] No new typings were requested as a result of typings discovery
Info seq  [hh:mm:ss:mss] Project '/dev/null/inferredProject1*' (Inferred)
Info seq  [hh:mm:ss:mss] 	Files (2)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: /a/file1.ts ProjectRootPath: /a
Info seq  [hh:mm:ss:mss] 		Projects: /dev/null/inferredProject1*
Info seq  [hh:mm:ss:mss] 	FileName: /A/file2.ts ProjectRootPath: /a
Info seq  [hh:mm:ss:mss] 		Projects: /dev/null/inferredProject1*
Info seq  [hh:mm:ss:mss] response:
    {
      "responseRequired": false
    }
After request

Before request

Info seq  [hh:mm:ss:mss] request:
    {
      "command": "open",
      "arguments": {
        "file": "/b/file2.ts",
        "projectRootPath": "/b",
        "fileContent": "let x = 3;",
        "scriptKindName": "JS"
      },
      "seq": 22,
      "type": "request"
    }
Info seq  [hh:mm:ss:mss] Search path: /b
Info seq  [hh:mm:ss:mss] For info: /b/file2.ts :: No config files found.
Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: /dev/null/inferredProject6*
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /a/lib/lib.esnext.full.d.ts 500 undefined Project: /dev/null/inferredProject6* WatchType: Missing file
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: /dev/null/inferredProject6* Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Project '/dev/null/inferredProject6*' (Inferred)
Info seq  [hh:mm:ss:mss] 	Files (1)
	/b/file2.ts SVC-3-0 "let x = 3;"


	file2.ts
	  Root file specified for compilation

Info seq  [hh:mm:ss:mss] -----------------------------------------------
TI:: [hh:mm:ss:mss] Got install request
    {
      "projectName": "/dev/null/inferredProject6*",
      "fileNames": [
        "/b/file2.ts"
      ],
      "compilerOptions": {
        "allowJs": true,
        "target": 99,
        "allowNonTsExtensions": true,
        "noEmitForJsFiles": true,
        "maxNodeModuleJsDepth": 2
      },
      "typeAcquisition": {
        "enable": true,
        "include": [],
        "exclude": []
      },
      "unresolvedImports": [],
      "projectRootPath": "/b",
      "kind": "discover"
    }
TI:: [hh:mm:ss:mss] Explicitly included types: []
TI:: [hh:mm:ss:mss] Inferred typings from unresolved imports: []
TI:: [hh:mm:ss:mss] Finished typings discovery:
    {
      "cachedTypingPaths": [],
      "newTypingNames": [],
      "filesToWatch": [
        "/b/bower_components",
        "/b/node_modules"
      ]
    }
TI:: [hh:mm:ss:mss] Sending response:
    {
      "kind": "action::watchTypingLocations",
      "projectName": "/dev/null/inferredProject6*",
      "files": [
        "/b/bower_components",
        "/b/node_modules"
      ]
    }
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /b/bower_components 1 undefined Project: /dev/null/inferredProject6* WatchType: Directory location for typing installer
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /b/bower_components 1 undefined Project: /dev/null/inferredProject6* WatchType: Directory location for typing installer
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /b/node_modules 1 undefined Project: /dev/null/inferredProject6* WatchType: Directory location for typing installer
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /b/node_modules 1 undefined Project: /dev/null/inferredProject6* WatchType: Directory location for typing installer
TI:: [hh:mm:ss:mss] Sending response:
    {
      "projectName": "/dev/null/inferredProject6*",
      "typeAcquisition": {
        "enable": true,
        "include": [],
        "exclude": []
      },
      "compilerOptions": {
        "allowJs": true,
        "target": 99,
        "allowNonTsExtensions": true,
        "noEmitForJsFiles": true,
        "maxNodeModuleJsDepth": 2
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
        "projectName": "/dev/null/inferredProject6*",
        "typeAcquisition": {
          "enable": true,
          "include": [],
          "exclude": []
        },
        "compilerOptions": {
          "allowJs": true,
          "target": 99,
          "allowNonTsExtensions": true,
          "noEmitForJsFiles": true,
          "maxNodeModuleJsDepth": 2
        },
        "typings": [],
        "unresolvedImports": [],
        "kind": "action::set"
      }
    }
TI:: [hh:mm:ss:mss] No new typings were requested as a result of typings discovery
Info seq  [hh:mm:ss:mss] Project '/dev/null/inferredProject1*' (Inferred)
Info seq  [hh:mm:ss:mss] 	Files (2)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Project '/dev/null/inferredProject6*' (Inferred)
Info seq  [hh:mm:ss:mss] 	Files (1)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: /a/file1.ts ProjectRootPath: /a
Info seq  [hh:mm:ss:mss] 		Projects: /dev/null/inferredProject1*
Info seq  [hh:mm:ss:mss] 	FileName: /A/file2.ts ProjectRootPath: /a
Info seq  [hh:mm:ss:mss] 		Projects: /dev/null/inferredProject1*
Info seq  [hh:mm:ss:mss] 	FileName: /b/file2.ts ProjectRootPath: /b
Info seq  [hh:mm:ss:mss] 		Projects: /dev/null/inferredProject6*
Info seq  [hh:mm:ss:mss] response:
    {
      "responseRequired": false
    }
After request

PolledWatches::
/a/bower_components:
  {"pollingInterval":500}
/a/lib/lib.es2017.full.d.ts:
  {"pollingInterval":500}
/a/lib/lib.esnext.full.d.ts: *new*
  {"pollingInterval":500}
/a/node_modules:
  {"pollingInterval":500}
/b/bower_components: *new*
  {"pollingInterval":500}
/b/node_modules: *new*
  {"pollingInterval":500}

Before request

Info seq  [hh:mm:ss:mss] request:
    {
      "command": "open",
      "arguments": {
        "file": "/c/file3.ts",
        "fileContent": "let z = 4;",
        "scriptKindName": "JS"
      },
      "seq": 23,
      "type": "request"
    }
Info seq  [hh:mm:ss:mss] Search path: /c
Info seq  [hh:mm:ss:mss] For info: /c/file3.ts :: No config files found.
Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: /dev/null/inferredProject7*
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /a/lib/lib.esnext.full.d.ts 500 undefined Project: /dev/null/inferredProject7* WatchType: Missing file
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: /dev/null/inferredProject7* Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Project '/dev/null/inferredProject7*' (Inferred)
Info seq  [hh:mm:ss:mss] 	Files (1)
	/c/file3.ts SVC-3-0 "let z = 4;"


	c/file3.ts
	  Root file specified for compilation

Info seq  [hh:mm:ss:mss] -----------------------------------------------
TI:: [hh:mm:ss:mss] Got install request
    {
      "projectName": "/dev/null/inferredProject7*",
      "fileNames": [
        "/c/file3.ts"
      ],
      "compilerOptions": {
        "allowJs": true,
        "target": 99,
        "allowNonTsExtensions": true,
        "noEmitForJsFiles": true,
        "maxNodeModuleJsDepth": 2
      },
      "typeAcquisition": {
        "enable": true,
        "include": [],
        "exclude": []
      },
      "unresolvedImports": [],
      "projectRootPath": "/",
      "kind": "discover"
    }
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
      "projectName": "/dev/null/inferredProject7*",
      "files": [
        "/bower_components",
        "/node_modules"
      ]
    }
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /bower_components 1 undefined Project: /dev/null/inferredProject7* WatchType: Directory location for typing installer
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /bower_components 1 undefined Project: /dev/null/inferredProject7* WatchType: Directory location for typing installer
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /node_modules 1 undefined Project: /dev/null/inferredProject7* WatchType: Directory location for typing installer
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /node_modules 1 undefined Project: /dev/null/inferredProject7* WatchType: Directory location for typing installer
TI:: [hh:mm:ss:mss] Sending response:
    {
      "projectName": "/dev/null/inferredProject7*",
      "typeAcquisition": {
        "enable": true,
        "include": [],
        "exclude": []
      },
      "compilerOptions": {
        "allowJs": true,
        "target": 99,
        "allowNonTsExtensions": true,
        "noEmitForJsFiles": true,
        "maxNodeModuleJsDepth": 2
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
        "projectName": "/dev/null/inferredProject7*",
        "typeAcquisition": {
          "enable": true,
          "include": [],
          "exclude": []
        },
        "compilerOptions": {
          "allowJs": true,
          "target": 99,
          "allowNonTsExtensions": true,
          "noEmitForJsFiles": true,
          "maxNodeModuleJsDepth": 2
        },
        "typings": [],
        "unresolvedImports": [],
        "kind": "action::set"
      }
    }
TI:: [hh:mm:ss:mss] No new typings were requested as a result of typings discovery
Info seq  [hh:mm:ss:mss] Project '/dev/null/inferredProject7*' (Inferred)
Info seq  [hh:mm:ss:mss] 	Files (1)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Project '/dev/null/inferredProject1*' (Inferred)
Info seq  [hh:mm:ss:mss] 	Files (2)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Project '/dev/null/inferredProject6*' (Inferred)
Info seq  [hh:mm:ss:mss] 	Files (1)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: /a/file1.ts ProjectRootPath: /a
Info seq  [hh:mm:ss:mss] 		Projects: /dev/null/inferredProject1*
Info seq  [hh:mm:ss:mss] 	FileName: /A/file2.ts ProjectRootPath: /a
Info seq  [hh:mm:ss:mss] 		Projects: /dev/null/inferredProject1*
Info seq  [hh:mm:ss:mss] 	FileName: /b/file2.ts ProjectRootPath: /b
Info seq  [hh:mm:ss:mss] 		Projects: /dev/null/inferredProject6*
Info seq  [hh:mm:ss:mss] 	FileName: /c/file3.ts ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /dev/null/inferredProject7*
Info seq  [hh:mm:ss:mss] response:
    {
      "responseRequired": false
    }
After request

PolledWatches::
/a/bower_components:
  {"pollingInterval":500}
/a/lib/lib.es2017.full.d.ts:
  {"pollingInterval":500}
/a/lib/lib.esnext.full.d.ts:
  {"pollingInterval":500}
/a/node_modules:
  {"pollingInterval":500}
/b/bower_components:
  {"pollingInterval":500}
/b/node_modules:
  {"pollingInterval":500}
/bower_components: *new*
  {"pollingInterval":500}
/node_modules: *new*
  {"pollingInterval":500}

Before request

Info seq  [hh:mm:ss:mss] request:
    {
      "command": "close",
      "arguments": {
        "file": "/a/file1.ts"
      },
      "seq": 24,
      "type": "request"
    }
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /a/file1.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] Project '/dev/null/inferredProject7*' (Inferred)
Info seq  [hh:mm:ss:mss] 	Files (1)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Project '/dev/null/inferredProject1*' (Inferred)
Info seq  [hh:mm:ss:mss] 	Files (2)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Project '/dev/null/inferredProject6*' (Inferred)
Info seq  [hh:mm:ss:mss] 	Files (1)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: /A/file2.ts ProjectRootPath: /a
Info seq  [hh:mm:ss:mss] 		Projects: /dev/null/inferredProject1*
Info seq  [hh:mm:ss:mss] 	FileName: /b/file2.ts ProjectRootPath: /b
Info seq  [hh:mm:ss:mss] 		Projects: /dev/null/inferredProject6*
Info seq  [hh:mm:ss:mss] 	FileName: /c/file3.ts ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /dev/null/inferredProject7*
Info seq  [hh:mm:ss:mss] response:
    {
      "responseRequired": false
    }
After request

PolledWatches::
/a/bower_components:
  {"pollingInterval":500}
/a/lib/lib.es2017.full.d.ts:
  {"pollingInterval":500}
/a/lib/lib.esnext.full.d.ts:
  {"pollingInterval":500}
/a/node_modules:
  {"pollingInterval":500}
/b/bower_components:
  {"pollingInterval":500}
/b/node_modules:
  {"pollingInterval":500}
/bower_components:
  {"pollingInterval":500}
/node_modules:
  {"pollingInterval":500}

FsWatches::
/a/file1.ts: *new*
  {}

Before request

Info seq  [hh:mm:ss:mss] request:
    {
      "command": "close",
      "arguments": {
        "file": "/A/file2.ts"
      },
      "seq": 25,
      "type": "request"
    }
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /A/file2.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] Project '/dev/null/inferredProject7*' (Inferred)
Info seq  [hh:mm:ss:mss] 	Files (1)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Project '/dev/null/inferredProject1*' (Inferred)
Info seq  [hh:mm:ss:mss] 	Files (2)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Project '/dev/null/inferredProject6*' (Inferred)
Info seq  [hh:mm:ss:mss] 	Files (1)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: /b/file2.ts ProjectRootPath: /b
Info seq  [hh:mm:ss:mss] 		Projects: /dev/null/inferredProject6*
Info seq  [hh:mm:ss:mss] 	FileName: /c/file3.ts ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /dev/null/inferredProject7*
Info seq  [hh:mm:ss:mss] response:
    {
      "responseRequired": false
    }
After request

PolledWatches::
/a/bower_components:
  {"pollingInterval":500}
/a/lib/lib.es2017.full.d.ts:
  {"pollingInterval":500}
/a/lib/lib.esnext.full.d.ts:
  {"pollingInterval":500}
/a/node_modules:
  {"pollingInterval":500}
/b/bower_components:
  {"pollingInterval":500}
/b/node_modules:
  {"pollingInterval":500}
/bower_components:
  {"pollingInterval":500}
/node_modules:
  {"pollingInterval":500}

FsWatches::
/A/file2.ts: *new*
  {}
/a/file1.ts:
  {}

Before request

Info seq  [hh:mm:ss:mss] request:
    {
      "command": "close",
      "arguments": {
        "file": "/b/file2.ts"
      },
      "seq": 26,
      "type": "request"
    }
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /b/file2.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] Project '/dev/null/inferredProject7*' (Inferred)
Info seq  [hh:mm:ss:mss] 	Files (1)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Project '/dev/null/inferredProject1*' (Inferred)
Info seq  [hh:mm:ss:mss] 	Files (2)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Project '/dev/null/inferredProject6*' (Inferred)
Info seq  [hh:mm:ss:mss] 	Files (1)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: /c/file3.ts ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /dev/null/inferredProject7*
Info seq  [hh:mm:ss:mss] response:
    {
      "responseRequired": false
    }
After request

PolledWatches::
/a/bower_components:
  {"pollingInterval":500}
/a/lib/lib.es2017.full.d.ts:
  {"pollingInterval":500}
/a/lib/lib.esnext.full.d.ts:
  {"pollingInterval":500}
/a/node_modules:
  {"pollingInterval":500}
/b/bower_components:
  {"pollingInterval":500}
/b/node_modules:
  {"pollingInterval":500}
/bower_components:
  {"pollingInterval":500}
/node_modules:
  {"pollingInterval":500}

FsWatches::
/A/file2.ts:
  {}
/a/file1.ts:
  {}
/b/file2.ts: *new*
  {}

Before request

Info seq  [hh:mm:ss:mss] request:
    {
      "command": "close",
      "arguments": {
        "file": "/c/file3.ts"
      },
      "seq": 27,
      "type": "request"
    }
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /c/file3.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] Project '/dev/null/inferredProject7*' (Inferred)
Info seq  [hh:mm:ss:mss] 	Files (1)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Project '/dev/null/inferredProject1*' (Inferred)
Info seq  [hh:mm:ss:mss] 	Files (2)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Project '/dev/null/inferredProject6*' (Inferred)
Info seq  [hh:mm:ss:mss] 	Files (1)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] response:
    {
      "responseRequired": false
    }
After request

PolledWatches::
/a/bower_components:
  {"pollingInterval":500}
/a/lib/lib.es2017.full.d.ts:
  {"pollingInterval":500}
/a/lib/lib.esnext.full.d.ts:
  {"pollingInterval":500}
/a/node_modules:
  {"pollingInterval":500}
/b/bower_components:
  {"pollingInterval":500}
/b/node_modules:
  {"pollingInterval":500}
/bower_components:
  {"pollingInterval":500}
/node_modules:
  {"pollingInterval":500}

FsWatches::
/A/file2.ts:
  {}
/a/file1.ts:
  {}
/b/file2.ts:
  {}
/c/file3.ts: *new*
  {}

Before request

Info seq  [hh:mm:ss:mss] request:
    {
      "command": "open",
      "arguments": {
        "file": "/a/file1.ts",
        "projectRootPath": "/a",
        "fileContent": "let x = 1;",
        "scriptKindName": "JS"
      },
      "seq": 28,
      "type": "request"
    }
Info seq  [hh:mm:ss:mss] FileWatcher:: Close:: WatchInfo: /a/file1.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] Search path: /a
Info seq  [hh:mm:ss:mss] For info: /a/file1.ts :: No config files found.
Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: /dev/null/inferredProject1*
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: /dev/null/inferredProject1* Version: 7 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Project '/dev/null/inferredProject1*' (Inferred)
Info seq  [hh:mm:ss:mss] 	Files (1)
	/a/file1.ts SVC-1-0 "let x = 1;"


	file1.ts
	  Root file specified for compilation

Info seq  [hh:mm:ss:mss] -----------------------------------------------
TI:: [hh:mm:ss:mss] Got install request
    {
      "projectName": "/dev/null/inferredProject1*",
      "fileNames": [
        "/a/file1.ts"
      ],
      "compilerOptions": {
        "allowJs": true,
        "target": 4,
        "allowNonTsExtensions": true,
        "maxNodeModuleJsDepth": 2,
        "noEmitForJsFiles": true
      },
      "typeAcquisition": {
        "enable": true,
        "include": [],
        "exclude": []
      },
      "unresolvedImports": [],
      "projectRootPath": "/a",
      "kind": "discover"
    }
TI:: [hh:mm:ss:mss] Explicitly included types: []
TI:: [hh:mm:ss:mss] Inferred typings from unresolved imports: []
TI:: [hh:mm:ss:mss] Finished typings discovery:
    {
      "cachedTypingPaths": [],
      "newTypingNames": [],
      "filesToWatch": [
        "/a/bower_components",
        "/a/node_modules"
      ]
    }
TI:: [hh:mm:ss:mss] Sending response:
    {
      "kind": "action::watchTypingLocations",
      "projectName": "/dev/null/inferredProject1*"
    }
TI:: [hh:mm:ss:mss] Sending response:
    {
      "projectName": "/dev/null/inferredProject1*",
      "typeAcquisition": {
        "enable": true,
        "include": [],
        "exclude": []
      },
      "compilerOptions": {
        "allowJs": true,
        "target": 4,
        "allowNonTsExtensions": true,
        "maxNodeModuleJsDepth": 2,
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
        "projectName": "/dev/null/inferredProject1*",
        "typeAcquisition": {
          "enable": true,
          "include": [],
          "exclude": []
        },
        "compilerOptions": {
          "allowJs": true,
          "target": 4,
          "allowNonTsExtensions": true,
          "maxNodeModuleJsDepth": 2,
          "noEmitForJsFiles": true
        },
        "typings": [],
        "unresolvedImports": [],
        "kind": "action::set"
      }
    }
TI:: [hh:mm:ss:mss] No new typings were requested as a result of typings discovery
Info seq  [hh:mm:ss:mss] `remove Project::
Info seq  [hh:mm:ss:mss] Project '/dev/null/inferredProject7*' (Inferred)
Info seq  [hh:mm:ss:mss] 	Files (1)
	/c/file3.ts


	c/file3.ts
	  Root file specified for compilation

Info seq  [hh:mm:ss:mss] -----------------------------------------------
TI:: [hh:mm:ss:mss] Closing file watchers for project '/dev/null/inferredProject7*'
TI:: [hh:mm:ss:mss] Sending response:
    {
      "kind": "action::watchTypingLocations",
      "projectName": "/dev/null/inferredProject7*",
      "files": []
    }
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Close:: WatchInfo: /bower_components 1 undefined Project: /dev/null/inferredProject7* WatchType: Directory location for typing installer
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Close:: WatchInfo: /bower_components 1 undefined Project: /dev/null/inferredProject7* WatchType: Directory location for typing installer
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Close:: WatchInfo: /node_modules 1 undefined Project: /dev/null/inferredProject7* WatchType: Directory location for typing installer
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Close:: WatchInfo: /node_modules 1 undefined Project: /dev/null/inferredProject7* WatchType: Directory location for typing installer
TI:: [hh:mm:ss:mss] Closing file watchers for project '/dev/null/inferredProject7*' - done.
Info seq  [hh:mm:ss:mss] FileWatcher:: Close:: WatchInfo: /a/lib/lib.esnext.full.d.ts 500 undefined Project: /dev/null/inferredProject7* WatchType: Missing file
Info seq  [hh:mm:ss:mss] `remove Project::
Info seq  [hh:mm:ss:mss] Project '/dev/null/inferredProject6*' (Inferred)
Info seq  [hh:mm:ss:mss] 	Files (1)
	/b/file2.ts


	file2.ts
	  Root file specified for compilation

Info seq  [hh:mm:ss:mss] -----------------------------------------------
TI:: [hh:mm:ss:mss] Closing file watchers for project '/dev/null/inferredProject6*'
TI:: [hh:mm:ss:mss] Sending response:
    {
      "kind": "action::watchTypingLocations",
      "projectName": "/dev/null/inferredProject6*",
      "files": []
    }
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Close:: WatchInfo: /b/bower_components 1 undefined Project: /dev/null/inferredProject6* WatchType: Directory location for typing installer
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Close:: WatchInfo: /b/bower_components 1 undefined Project: /dev/null/inferredProject6* WatchType: Directory location for typing installer
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Close:: WatchInfo: /b/node_modules 1 undefined Project: /dev/null/inferredProject6* WatchType: Directory location for typing installer
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Close:: WatchInfo: /b/node_modules 1 undefined Project: /dev/null/inferredProject6* WatchType: Directory location for typing installer
TI:: [hh:mm:ss:mss] Closing file watchers for project '/dev/null/inferredProject6*' - done.
Info seq  [hh:mm:ss:mss] FileWatcher:: Close:: WatchInfo: /a/lib/lib.esnext.full.d.ts 500 undefined Project: /dev/null/inferredProject6* WatchType: Missing file
Info seq  [hh:mm:ss:mss] FileWatcher:: Close:: WatchInfo: /A/file2.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] FileWatcher:: Close:: WatchInfo: /b/file2.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] FileWatcher:: Close:: WatchInfo: /c/file3.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] Project '/dev/null/inferredProject1*' (Inferred)
Info seq  [hh:mm:ss:mss] 	Files (1)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: /a/file1.ts ProjectRootPath: /a
Info seq  [hh:mm:ss:mss] 		Projects: /dev/null/inferredProject1*
Info seq  [hh:mm:ss:mss] response:
    {
      "responseRequired": false
    }
After request

PolledWatches::
/a/bower_components:
  {"pollingInterval":500}
/a/lib/lib.es2017.full.d.ts:
  {"pollingInterval":500}
/a/node_modules:
  {"pollingInterval":500}

PolledWatches *deleted*::
/a/lib/lib.esnext.full.d.ts:
  {"pollingInterval":500}
/b/bower_components:
  {"pollingInterval":500}
/b/node_modules:
  {"pollingInterval":500}
/bower_components:
  {"pollingInterval":500}
/node_modules:
  {"pollingInterval":500}

FsWatches *deleted*::
/A/file2.ts:
  {}
/a/file1.ts:
  {}
/b/file2.ts:
  {}
/c/file3.ts:
  {}

Before request

Info seq  [hh:mm:ss:mss] request:
    {
      "command": "open",
      "arguments": {
        "file": "/A/file2.ts",
        "projectRootPath": "/A",
        "fileContent": "let y = 2;",
        "scriptKindName": "JS"
      },
      "seq": 29,
      "type": "request"
    }
Info seq  [hh:mm:ss:mss] Search path: /A
Info seq  [hh:mm:ss:mss] For info: /A/file2.ts :: No config files found.
Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: /dev/null/inferredProject1*
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: /dev/null/inferredProject1* Version: 8 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Project '/dev/null/inferredProject1*' (Inferred)
Info seq  [hh:mm:ss:mss] 	Files (2)
	/a/file1.ts SVC-1-0 "let x = 1;"
	/A/file2.ts SVC-4-0 "let y = 2;"


	file1.ts
	  Root file specified for compilation
	file2.ts
	  Root file specified for compilation

Info seq  [hh:mm:ss:mss] -----------------------------------------------
TI:: [hh:mm:ss:mss] Got install request
    {
      "projectName": "/dev/null/inferredProject1*",
      "fileNames": [
        "/a/file1.ts",
        "/A/file2.ts"
      ],
      "compilerOptions": {
        "allowJs": true,
        "target": 4,
        "allowNonTsExtensions": true,
        "maxNodeModuleJsDepth": 2,
        "noEmitForJsFiles": true
      },
      "typeAcquisition": {
        "enable": true,
        "include": [],
        "exclude": []
      },
      "unresolvedImports": [],
      "projectRootPath": "/a",
      "kind": "discover"
    }
TI:: [hh:mm:ss:mss] Explicitly included types: []
TI:: [hh:mm:ss:mss] Inferred typings from unresolved imports: []
TI:: [hh:mm:ss:mss] Finished typings discovery:
    {
      "cachedTypingPaths": [],
      "newTypingNames": [],
      "filesToWatch": [
        "/a/bower_components",
        "/a/node_modules"
      ]
    }
TI:: [hh:mm:ss:mss] Sending response:
    {
      "kind": "action::watchTypingLocations",
      "projectName": "/dev/null/inferredProject1*"
    }
TI:: [hh:mm:ss:mss] Sending response:
    {
      "projectName": "/dev/null/inferredProject1*",
      "typeAcquisition": {
        "enable": true,
        "include": [],
        "exclude": []
      },
      "compilerOptions": {
        "allowJs": true,
        "target": 4,
        "allowNonTsExtensions": true,
        "maxNodeModuleJsDepth": 2,
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
        "projectName": "/dev/null/inferredProject1*",
        "typeAcquisition": {
          "enable": true,
          "include": [],
          "exclude": []
        },
        "compilerOptions": {
          "allowJs": true,
          "target": 4,
          "allowNonTsExtensions": true,
          "maxNodeModuleJsDepth": 2,
          "noEmitForJsFiles": true
        },
        "typings": [],
        "unresolvedImports": [],
        "kind": "action::set"
      }
    }
TI:: [hh:mm:ss:mss] No new typings were requested as a result of typings discovery
Info seq  [hh:mm:ss:mss] Project '/dev/null/inferredProject1*' (Inferred)
Info seq  [hh:mm:ss:mss] 	Files (2)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: /a/file1.ts ProjectRootPath: /a
Info seq  [hh:mm:ss:mss] 		Projects: /dev/null/inferredProject1*
Info seq  [hh:mm:ss:mss] 	FileName: /A/file2.ts ProjectRootPath: /A
Info seq  [hh:mm:ss:mss] 		Projects: /dev/null/inferredProject1*
Info seq  [hh:mm:ss:mss] response:
    {
      "responseRequired": false
    }
After request

Before request

Info seq  [hh:mm:ss:mss] request:
    {
      "command": "open",
      "arguments": {
        "file": "/b/file2.ts",
        "projectRootPath": "/b",
        "fileContent": "let x = 3;",
        "scriptKindName": "JS"
      },
      "seq": 30,
      "type": "request"
    }
Info seq  [hh:mm:ss:mss] Search path: /b
Info seq  [hh:mm:ss:mss] For info: /b/file2.ts :: No config files found.
Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: /dev/null/inferredProject8*
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /a/lib/lib.esnext.full.d.ts 500 undefined Project: /dev/null/inferredProject8* WatchType: Missing file
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: /dev/null/inferredProject8* Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Project '/dev/null/inferredProject8*' (Inferred)
Info seq  [hh:mm:ss:mss] 	Files (1)
	/b/file2.ts SVC-4-0 "let x = 3;"


	file2.ts
	  Root file specified for compilation

Info seq  [hh:mm:ss:mss] -----------------------------------------------
TI:: [hh:mm:ss:mss] Got install request
    {
      "projectName": "/dev/null/inferredProject8*",
      "fileNames": [
        "/b/file2.ts"
      ],
      "compilerOptions": {
        "allowJs": true,
        "target": 99,
        "allowNonTsExtensions": true,
        "noEmitForJsFiles": true,
        "maxNodeModuleJsDepth": 2
      },
      "typeAcquisition": {
        "enable": true,
        "include": [],
        "exclude": []
      },
      "unresolvedImports": [],
      "projectRootPath": "/b",
      "kind": "discover"
    }
TI:: [hh:mm:ss:mss] Explicitly included types: []
TI:: [hh:mm:ss:mss] Inferred typings from unresolved imports: []
TI:: [hh:mm:ss:mss] Finished typings discovery:
    {
      "cachedTypingPaths": [],
      "newTypingNames": [],
      "filesToWatch": [
        "/b/bower_components",
        "/b/node_modules"
      ]
    }
TI:: [hh:mm:ss:mss] Sending response:
    {
      "kind": "action::watchTypingLocations",
      "projectName": "/dev/null/inferredProject8*",
      "files": [
        "/b/bower_components",
        "/b/node_modules"
      ]
    }
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /b/bower_components 1 undefined Project: /dev/null/inferredProject8* WatchType: Directory location for typing installer
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /b/bower_components 1 undefined Project: /dev/null/inferredProject8* WatchType: Directory location for typing installer
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /b/node_modules 1 undefined Project: /dev/null/inferredProject8* WatchType: Directory location for typing installer
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /b/node_modules 1 undefined Project: /dev/null/inferredProject8* WatchType: Directory location for typing installer
TI:: [hh:mm:ss:mss] Sending response:
    {
      "projectName": "/dev/null/inferredProject8*",
      "typeAcquisition": {
        "enable": true,
        "include": [],
        "exclude": []
      },
      "compilerOptions": {
        "allowJs": true,
        "target": 99,
        "allowNonTsExtensions": true,
        "noEmitForJsFiles": true,
        "maxNodeModuleJsDepth": 2
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
        "projectName": "/dev/null/inferredProject8*",
        "typeAcquisition": {
          "enable": true,
          "include": [],
          "exclude": []
        },
        "compilerOptions": {
          "allowJs": true,
          "target": 99,
          "allowNonTsExtensions": true,
          "noEmitForJsFiles": true,
          "maxNodeModuleJsDepth": 2
        },
        "typings": [],
        "unresolvedImports": [],
        "kind": "action::set"
      }
    }
TI:: [hh:mm:ss:mss] No new typings were requested as a result of typings discovery
Info seq  [hh:mm:ss:mss] Project '/dev/null/inferredProject1*' (Inferred)
Info seq  [hh:mm:ss:mss] 	Files (2)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Project '/dev/null/inferredProject8*' (Inferred)
Info seq  [hh:mm:ss:mss] 	Files (1)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: /a/file1.ts ProjectRootPath: /a
Info seq  [hh:mm:ss:mss] 		Projects: /dev/null/inferredProject1*
Info seq  [hh:mm:ss:mss] 	FileName: /A/file2.ts ProjectRootPath: /A
Info seq  [hh:mm:ss:mss] 		Projects: /dev/null/inferredProject1*
Info seq  [hh:mm:ss:mss] 	FileName: /b/file2.ts ProjectRootPath: /b
Info seq  [hh:mm:ss:mss] 		Projects: /dev/null/inferredProject8*
Info seq  [hh:mm:ss:mss] response:
    {
      "responseRequired": false
    }
After request

PolledWatches::
/a/bower_components:
  {"pollingInterval":500}
/a/lib/lib.es2017.full.d.ts:
  {"pollingInterval":500}
/a/lib/lib.esnext.full.d.ts: *new*
  {"pollingInterval":500}
/a/node_modules:
  {"pollingInterval":500}
/b/bower_components: *new*
  {"pollingInterval":500}
/b/node_modules: *new*
  {"pollingInterval":500}

Before request

Info seq  [hh:mm:ss:mss] request:
    {
      "command": "open",
      "arguments": {
        "file": "/c/file3.ts",
        "fileContent": "let z = 4;",
        "scriptKindName": "JS"
      },
      "seq": 31,
      "type": "request"
    }
Info seq  [hh:mm:ss:mss] Search path: /c
Info seq  [hh:mm:ss:mss] For info: /c/file3.ts :: No config files found.
Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: /dev/null/inferredProject9*
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /a/lib/lib.esnext.full.d.ts 500 undefined Project: /dev/null/inferredProject9* WatchType: Missing file
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: /dev/null/inferredProject9* Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Project '/dev/null/inferredProject9*' (Inferred)
Info seq  [hh:mm:ss:mss] 	Files (1)
	/c/file3.ts SVC-4-0 "let z = 4;"


	c/file3.ts
	  Root file specified for compilation

Info seq  [hh:mm:ss:mss] -----------------------------------------------
TI:: [hh:mm:ss:mss] Got install request
    {
      "projectName": "/dev/null/inferredProject9*",
      "fileNames": [
        "/c/file3.ts"
      ],
      "compilerOptions": {
        "allowJs": true,
        "target": 99,
        "allowNonTsExtensions": true,
        "noEmitForJsFiles": true,
        "maxNodeModuleJsDepth": 2
      },
      "typeAcquisition": {
        "enable": true,
        "include": [],
        "exclude": []
      },
      "unresolvedImports": [],
      "projectRootPath": "/",
      "kind": "discover"
    }
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
      "projectName": "/dev/null/inferredProject9*",
      "files": [
        "/bower_components",
        "/node_modules"
      ]
    }
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /bower_components 1 undefined Project: /dev/null/inferredProject9* WatchType: Directory location for typing installer
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /bower_components 1 undefined Project: /dev/null/inferredProject9* WatchType: Directory location for typing installer
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /node_modules 1 undefined Project: /dev/null/inferredProject9* WatchType: Directory location for typing installer
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /node_modules 1 undefined Project: /dev/null/inferredProject9* WatchType: Directory location for typing installer
TI:: [hh:mm:ss:mss] Sending response:
    {
      "projectName": "/dev/null/inferredProject9*",
      "typeAcquisition": {
        "enable": true,
        "include": [],
        "exclude": []
      },
      "compilerOptions": {
        "allowJs": true,
        "target": 99,
        "allowNonTsExtensions": true,
        "noEmitForJsFiles": true,
        "maxNodeModuleJsDepth": 2
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
        "projectName": "/dev/null/inferredProject9*",
        "typeAcquisition": {
          "enable": true,
          "include": [],
          "exclude": []
        },
        "compilerOptions": {
          "allowJs": true,
          "target": 99,
          "allowNonTsExtensions": true,
          "noEmitForJsFiles": true,
          "maxNodeModuleJsDepth": 2
        },
        "typings": [],
        "unresolvedImports": [],
        "kind": "action::set"
      }
    }
TI:: [hh:mm:ss:mss] No new typings were requested as a result of typings discovery
Info seq  [hh:mm:ss:mss] Project '/dev/null/inferredProject9*' (Inferred)
Info seq  [hh:mm:ss:mss] 	Files (1)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Project '/dev/null/inferredProject1*' (Inferred)
Info seq  [hh:mm:ss:mss] 	Files (2)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Project '/dev/null/inferredProject8*' (Inferred)
Info seq  [hh:mm:ss:mss] 	Files (1)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: /a/file1.ts ProjectRootPath: /a
Info seq  [hh:mm:ss:mss] 		Projects: /dev/null/inferredProject1*
Info seq  [hh:mm:ss:mss] 	FileName: /A/file2.ts ProjectRootPath: /A
Info seq  [hh:mm:ss:mss] 		Projects: /dev/null/inferredProject1*
Info seq  [hh:mm:ss:mss] 	FileName: /b/file2.ts ProjectRootPath: /b
Info seq  [hh:mm:ss:mss] 		Projects: /dev/null/inferredProject8*
Info seq  [hh:mm:ss:mss] 	FileName: /c/file3.ts ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /dev/null/inferredProject9*
Info seq  [hh:mm:ss:mss] response:
    {
      "responseRequired": false
    }
After request

PolledWatches::
/a/bower_components:
  {"pollingInterval":500}
/a/lib/lib.es2017.full.d.ts:
  {"pollingInterval":500}
/a/lib/lib.esnext.full.d.ts:
  {"pollingInterval":500}
/a/node_modules:
  {"pollingInterval":500}
/b/bower_components:
  {"pollingInterval":500}
/b/node_modules:
  {"pollingInterval":500}
/bower_components: *new*
  {"pollingInterval":500}
/node_modules: *new*
  {"pollingInterval":500}

Before request

Info seq  [hh:mm:ss:mss] request:
    {
      "command": "close",
      "arguments": {
        "file": "/a/file1.ts"
      },
      "seq": 32,
      "type": "request"
    }
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /a/file1.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] Project '/dev/null/inferredProject9*' (Inferred)
Info seq  [hh:mm:ss:mss] 	Files (1)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Project '/dev/null/inferredProject1*' (Inferred)
Info seq  [hh:mm:ss:mss] 	Files (2)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Project '/dev/null/inferredProject8*' (Inferred)
Info seq  [hh:mm:ss:mss] 	Files (1)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: /A/file2.ts ProjectRootPath: /A
Info seq  [hh:mm:ss:mss] 		Projects: /dev/null/inferredProject1*
Info seq  [hh:mm:ss:mss] 	FileName: /b/file2.ts ProjectRootPath: /b
Info seq  [hh:mm:ss:mss] 		Projects: /dev/null/inferredProject8*
Info seq  [hh:mm:ss:mss] 	FileName: /c/file3.ts ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /dev/null/inferredProject9*
Info seq  [hh:mm:ss:mss] response:
    {
      "responseRequired": false
    }
After request

PolledWatches::
/a/bower_components:
  {"pollingInterval":500}
/a/lib/lib.es2017.full.d.ts:
  {"pollingInterval":500}
/a/lib/lib.esnext.full.d.ts:
  {"pollingInterval":500}
/a/node_modules:
  {"pollingInterval":500}
/b/bower_components:
  {"pollingInterval":500}
/b/node_modules:
  {"pollingInterval":500}
/bower_components:
  {"pollingInterval":500}
/node_modules:
  {"pollingInterval":500}

FsWatches::
/a/file1.ts: *new*
  {}

Before request

Info seq  [hh:mm:ss:mss] request:
    {
      "command": "close",
      "arguments": {
        "file": "/A/file2.ts"
      },
      "seq": 33,
      "type": "request"
    }
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /A/file2.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] Project '/dev/null/inferredProject9*' (Inferred)
Info seq  [hh:mm:ss:mss] 	Files (1)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Project '/dev/null/inferredProject1*' (Inferred)
Info seq  [hh:mm:ss:mss] 	Files (2)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Project '/dev/null/inferredProject8*' (Inferred)
Info seq  [hh:mm:ss:mss] 	Files (1)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: /b/file2.ts ProjectRootPath: /b
Info seq  [hh:mm:ss:mss] 		Projects: /dev/null/inferredProject8*
Info seq  [hh:mm:ss:mss] 	FileName: /c/file3.ts ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /dev/null/inferredProject9*
Info seq  [hh:mm:ss:mss] response:
    {
      "responseRequired": false
    }
After request

PolledWatches::
/a/bower_components:
  {"pollingInterval":500}
/a/lib/lib.es2017.full.d.ts:
  {"pollingInterval":500}
/a/lib/lib.esnext.full.d.ts:
  {"pollingInterval":500}
/a/node_modules:
  {"pollingInterval":500}
/b/bower_components:
  {"pollingInterval":500}
/b/node_modules:
  {"pollingInterval":500}
/bower_components:
  {"pollingInterval":500}
/node_modules:
  {"pollingInterval":500}

FsWatches::
/A/file2.ts: *new*
  {}
/a/file1.ts:
  {}

Before request

Info seq  [hh:mm:ss:mss] request:
    {
      "command": "close",
      "arguments": {
        "file": "/b/file2.ts"
      },
      "seq": 34,
      "type": "request"
    }
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /b/file2.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] Project '/dev/null/inferredProject9*' (Inferred)
Info seq  [hh:mm:ss:mss] 	Files (1)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Project '/dev/null/inferredProject1*' (Inferred)
Info seq  [hh:mm:ss:mss] 	Files (2)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Project '/dev/null/inferredProject8*' (Inferred)
Info seq  [hh:mm:ss:mss] 	Files (1)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: /c/file3.ts ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /dev/null/inferredProject9*
Info seq  [hh:mm:ss:mss] response:
    {
      "responseRequired": false
    }
After request

PolledWatches::
/a/bower_components:
  {"pollingInterval":500}
/a/lib/lib.es2017.full.d.ts:
  {"pollingInterval":500}
/a/lib/lib.esnext.full.d.ts:
  {"pollingInterval":500}
/a/node_modules:
  {"pollingInterval":500}
/b/bower_components:
  {"pollingInterval":500}
/b/node_modules:
  {"pollingInterval":500}
/bower_components:
  {"pollingInterval":500}
/node_modules:
  {"pollingInterval":500}

FsWatches::
/A/file2.ts:
  {}
/a/file1.ts:
  {}
/b/file2.ts: *new*
  {}

Before request

Info seq  [hh:mm:ss:mss] request:
    {
      "command": "close",
      "arguments": {
        "file": "/c/file3.ts"
      },
      "seq": 35,
      "type": "request"
    }
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /c/file3.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] Project '/dev/null/inferredProject9*' (Inferred)
Info seq  [hh:mm:ss:mss] 	Files (1)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Project '/dev/null/inferredProject1*' (Inferred)
Info seq  [hh:mm:ss:mss] 	Files (2)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Project '/dev/null/inferredProject8*' (Inferred)
Info seq  [hh:mm:ss:mss] 	Files (1)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] response:
    {
      "responseRequired": false
    }
After request

PolledWatches::
/a/bower_components:
  {"pollingInterval":500}
/a/lib/lib.es2017.full.d.ts:
  {"pollingInterval":500}
/a/lib/lib.esnext.full.d.ts:
  {"pollingInterval":500}
/a/node_modules:
  {"pollingInterval":500}
/b/bower_components:
  {"pollingInterval":500}
/b/node_modules:
  {"pollingInterval":500}
/bower_components:
  {"pollingInterval":500}
/node_modules:
  {"pollingInterval":500}

FsWatches::
/A/file2.ts:
  {}
/a/file1.ts:
  {}
/b/file2.ts:
  {}
/c/file3.ts: *new*
  {}
