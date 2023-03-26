currentDirectory:: / useCaseSensitiveFileNames: false
Info 0    [00:00:11.000] Provided types map file "/a/lib/typesMap.json" doesn't exist
Before request
//// [/a/b/file1.js]

                /// <reference path="file2.d.ts" />
                var x = 1;

//// [/a/b/file2.d.ts]

                interface T {
                    name: string;
                };
                interface T {
                    name: number;
                };


Info 1    [00:00:12.000] request:
    {
      "command": "open",
      "arguments": {
        "file": "/a/b/file1.js"
      },
      "seq": 1,
      "type": "request"
    }
Info 2    [00:00:13.000] Search path: /a/b
Info 3    [00:00:14.000] For info: /a/b/file1.js :: No config files found.
Info 4    [00:00:15.000] Starting updateGraphWorker: Project: /dev/null/inferredProject1*
Info 5    [00:00:16.000] FileWatcher:: Added:: WatchInfo: /a/b/file2.d.ts 500 undefined WatchType: Closed Script info
Info 6    [00:00:17.000] FileWatcher:: Added:: WatchInfo: /a/lib/lib.d.ts 500 undefined Project: /dev/null/inferredProject1* WatchType: Missing file
Info 7    [00:00:18.000] DirectoryWatcher:: Added:: WatchInfo: /a/b/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info 8    [00:00:19.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /a/b/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info 9    [00:00:20.000] Finishing updateGraphWorker: Project: /dev/null/inferredProject1* Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 10   [00:00:21.000] Project '/dev/null/inferredProject1*' (Inferred)
Info 11   [00:00:22.000] 	Files (2)
	/a/b/file2.d.ts Text-1 "\n                interface T {\n                    name: string;\n                };\n                interface T {\n                    name: number;\n                };"
	/a/b/file1.js SVC-1-0 "\n                /// <reference path=\"file2.d.ts\" />\n                var x = 1;"


	file2.d.ts
	  Referenced via 'file2.d.ts' from file 'file1.js'
	file1.js
	  Root file specified for compilation

Info 12   [00:00:23.000] -----------------------------------------------
TI:: Creating typing installer

PolledWatches::
/a/lib/lib.d.ts: *new*
  {"pollingInterval":500}
/a/b/node_modules/@types: *new*
  {"pollingInterval":500}

FsWatches::
/a/b/file2.d.ts: *new*
  {}

TI:: [00:00:24.000] Global cache location '/a/data/', safe file path '/safeList.json', types map path /typesMap.json
TI:: [00:00:25.000] Processing cache location '/a/data/'
TI:: [00:00:26.000] Trying to find '/a/data/package.json'...
TI:: [00:00:27.000] Finished processing cache location '/a/data/'
TI:: [00:00:28.000] Npm config file: /a/data/package.json
TI:: [00:00:29.000] Npm config file: '/a/data/package.json' is missing, creating new one...
TI:: [00:00:34.000] Updating types-registry npm package...
TI:: [00:00:35.000] npm install --ignore-scripts types-registry@latest
TI:: [00:00:42.000] TI:: Updated types-registry npm package
TI:: typing installer creation complete
//// [/a/data/package.json]
{ "private": true }

//// [/a/data/node_modules/types-registry/index.json]
{
 "entries": {}
}


TI:: [00:00:43.000] Got install request {"projectName":"/dev/null/inferredProject1*","fileNames":["/a/b/file2.d.ts","/a/b/file1.js"],"compilerOptions":{"target":1,"jsx":1,"allowNonTsExtensions":true,"allowJs":true,"noEmitForJsFiles":true,"maxNodeModuleJsDepth":2},"typeAcquisition":{"enable":true,"include":[],"exclude":[]},"unresolvedImports":[],"projectRootPath":"/a/b","cachePath":"/a/data/","kind":"discover"}
TI:: [00:00:44.000] Request specifies cache path '/a/data/', loading cached information...
TI:: [00:00:45.000] Processing cache location '/a/data/'
TI:: [00:00:46.000] Cache location was already processed...
TI:: [00:00:47.000] Failed to load safelist from types map file '/typesMap.json'
TI:: [00:00:48.000] Explicitly included types: []
TI:: [00:00:49.000] Inferred typings from unresolved imports: []
TI:: [00:00:50.000] Result: {"cachedTypingPaths":[],"newTypingNames":[],"filesToWatch":["/a/b/bower_components","/a/b/node_modules"]}
TI:: [00:00:51.000] Finished typings discovery: {"cachedTypingPaths":[],"newTypingNames":[],"filesToWatch":["/a/b/bower_components","/a/b/node_modules"]}
TI:: [00:00:52.000] DirectoryWatcher:: Added:: WatchInfo: /a/b/bower_components
TI:: [00:00:53.000] DirectoryWatcher:: Added:: WatchInfo: /a/b/bower_components 1 undefined Project: /dev/null/inferredProject1* watcher already invoked: false
TI:: [00:00:54.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /a/b/bower_components 1 undefined Project: /dev/null/inferredProject1* watcher already invoked: false
TI:: [00:00:55.000] DirectoryWatcher:: Added:: WatchInfo: /a/b/node_modules
TI:: [00:00:56.000] DirectoryWatcher:: Added:: WatchInfo: /a/b/node_modules 1 undefined Project: /dev/null/inferredProject1* watcher already invoked: false
TI:: [00:00:57.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /a/b/node_modules 1 undefined Project: /dev/null/inferredProject1* watcher already invoked: false
TI:: [00:00:58.000] Sending response:
    {"projectName":"/dev/null/inferredProject1*","typeAcquisition":{"enable":true,"include":[],"exclude":[]},"compilerOptions":{"target":1,"jsx":1,"allowNonTsExtensions":true,"allowJs":true,"noEmitForJsFiles":true,"maxNodeModuleJsDepth":2},"typings":[],"unresolvedImports":[],"kind":"action::set"}
TI:: [00:00:59.000] No new typings were requested as a result of typings discovery
Info 13   [00:01:00.000] Project '/dev/null/inferredProject1*' (Inferred)
Info 13   [00:01:01.000] 	Files (2)

Info 13   [00:01:02.000] -----------------------------------------------
Info 13   [00:01:03.000] Open files: 
Info 13   [00:01:04.000] 	FileName: /a/b/file1.js ProjectRootPath: undefined
Info 13   [00:01:05.000] 		Projects: /dev/null/inferredProject1*
Info 13   [00:01:06.000] response:
    {
      "responseRequired": false
    }
After request

PolledWatches::
/a/lib/lib.d.ts:
  {"pollingInterval":500}
/a/b/node_modules/@types:
  {"pollingInterval":500}
/a/b/bower_components: *new*
  {"pollingInterval":500}
/a/b/node_modules: *new*
  {"pollingInterval":500}

FsWatches::
/a/b/file2.d.ts:
  {}

Before request

Info 14   [00:01:07.000] request:
    {
      "command": "open",
      "arguments": {
        "file": "/a/b/file2.d.ts"
      },
      "seq": 2,
      "type": "request"
    }
Info 15   [00:01:08.000] FileWatcher:: Close:: WatchInfo: /a/b/file2.d.ts 500 undefined WatchType: Closed Script info
Info 16   [00:01:09.000] Search path: /a/b
Info 17   [00:01:10.000] For info: /a/b/file2.d.ts :: No config files found.
Info 18   [00:01:11.000] Project '/dev/null/inferredProject1*' (Inferred)
Info 18   [00:01:12.000] 	Files (2)

Info 18   [00:01:13.000] -----------------------------------------------
Info 18   [00:01:14.000] Open files: 
Info 18   [00:01:15.000] 	FileName: /a/b/file1.js ProjectRootPath: undefined
Info 18   [00:01:16.000] 		Projects: /dev/null/inferredProject1*
Info 18   [00:01:17.000] 	FileName: /a/b/file2.d.ts ProjectRootPath: undefined
Info 18   [00:01:18.000] 		Projects: /dev/null/inferredProject1*
Info 18   [00:01:19.000] response:
    {
      "responseRequired": false
    }
After request

PolledWatches::
/a/lib/lib.d.ts:
  {"pollingInterval":500}
/a/b/node_modules/@types:
  {"pollingInterval":500}
/a/b/bower_components:
  {"pollingInterval":500}
/a/b/node_modules:
  {"pollingInterval":500}

FsWatches *deleted*::
/a/b/file2.d.ts:
  {}

Before request

Info 19   [00:01:20.000] request:
    {
      "command": "semanticDiagnosticsSync",
      "arguments": {
        "file": "/a/b/file2.d.ts"
      },
      "seq": 3,
      "type": "request"
    }
Info 20   [00:01:21.000] response:
    {
      "response": [],
      "responseRequired": true
    }
After request

Before request

Info 21   [00:01:22.000] request:
    {
      "command": "close",
      "arguments": {
        "file": "/a/b/file1.js"
      },
      "seq": 4,
      "type": "request"
    }
Info 22   [00:01:23.000] DirectoryWatcher:: Close:: WatchInfo: /a/b/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info 23   [00:01:24.000] Elapsed:: *ms DirectoryWatcher:: Close:: WatchInfo: /a/b/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info 24   [00:01:25.000] Starting updateGraphWorker: Project: /dev/null/inferredProject1*
Info 25   [00:01:26.000] DirectoryWatcher:: Added:: WatchInfo: /a/b/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info 26   [00:01:27.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /a/b/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info 27   [00:01:28.000] Finishing updateGraphWorker: Project: /dev/null/inferredProject1* Version: 2 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 28   [00:01:29.000] Project '/dev/null/inferredProject1*' (Inferred)
Info 29   [00:01:30.000] 	Files (1)
	/a/b/file2.d.ts Text-1 "\n                interface T {\n                    name: string;\n                };\n                interface T {\n                    name: number;\n                };"


	file2.d.ts
	  Root file specified for compilation

Info 30   [00:01:31.000] -----------------------------------------------
TI:: [00:01:32.000] Got install request {"projectName":"/dev/null/inferredProject1*","fileNames":["/a/b/file2.d.ts"],"compilerOptions":{"target":1,"jsx":1,"allowNonTsExtensions":true,"allowJs":true,"noEmitForJsFiles":true},"typeAcquisition":{"enable":true,"include":[],"exclude":[]},"unresolvedImports":[],"projectRootPath":"/a/b","cachePath":"/a/data/","kind":"discover"}
TI:: [00:01:33.000] Request specifies cache path '/a/data/', loading cached information...
TI:: [00:01:34.000] Processing cache location '/a/data/'
TI:: [00:01:35.000] Cache location was already processed...
TI:: [00:01:36.000] Explicitly included types: []
TI:: [00:01:37.000] Inferred typings from unresolved imports: []
TI:: [00:01:38.000] Result: {"cachedTypingPaths":[],"newTypingNames":[],"filesToWatch":["/a/b/bower_components","/a/b/node_modules"]}
TI:: [00:01:39.000] Finished typings discovery: {"cachedTypingPaths":[],"newTypingNames":[],"filesToWatch":["/a/b/bower_components","/a/b/node_modules"]}
TI:: [00:01:40.000] Sending response:
    {"projectName":"/dev/null/inferredProject1*","typeAcquisition":{"enable":true,"include":[],"exclude":[]},"compilerOptions":{"target":1,"jsx":1,"allowNonTsExtensions":true,"allowJs":true,"noEmitForJsFiles":true},"typings":[],"unresolvedImports":[],"kind":"action::set"}
TI:: [00:01:41.000] No new typings were requested as a result of typings discovery
Info 31   [00:01:42.000] FileWatcher:: Added:: WatchInfo: /a/b/file1.js 500 undefined WatchType: Closed Script info
Info 32   [00:01:43.000] Project '/dev/null/inferredProject1*' (Inferred)
Info 32   [00:01:44.000] 	Files (1)

Info 32   [00:01:45.000] -----------------------------------------------
Info 32   [00:01:46.000] Open files: 
Info 32   [00:01:47.000] 	FileName: /a/b/file2.d.ts ProjectRootPath: undefined
Info 32   [00:01:48.000] 		Projects: /dev/null/inferredProject1*
Info 32   [00:01:49.000] response:
    {
      "responseRequired": false
    }
After request

PolledWatches::
/a/lib/lib.d.ts:
  {"pollingInterval":500}
/a/b/bower_components:
  {"pollingInterval":500}
/a/b/node_modules:
  {"pollingInterval":500}
/a/b/node_modules/@types:
  {"pollingInterval":500} *new*

PolledWatches *deleted*::
/a/b/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/a/b/file1.js: *new*
  {}

Before request

Info 33   [00:01:50.000] request:
    {
      "command": "semanticDiagnosticsSync",
      "arguments": {
        "file": "/a/b/file2.d.ts"
      },
      "seq": 5,
      "type": "request"
    }
Info 34   [00:01:51.000] response:
    {
      "response": [
        {
          "start": {
            "line": 4,
            "offset": 18
          },
          "end": {
            "line": 4,
            "offset": 19
          },
          "text": "Statements are not allowed in ambient contexts.",
          "code": 1036,
          "category": "error"
        },
        {
          "start": {
            "line": 6,
            "offset": 21
          },
          "end": {
            "line": 6,
            "offset": 25
          },
          "text": "Subsequent property declarations must have the same type.  Property 'name' must be of type 'string', but here has type 'number'.",
          "code": 2717,
          "category": "error",
          "relatedInformation": [
            {
              "span": {
                "start": {
                  "line": 3,
                  "offset": 21
                },
                "end": {
                  "line": 3,
                  "offset": 25
                },
                "file": "/a/b/file2.d.ts"
              },
              "message": "'name' was also declared here.",
              "category": "message",
              "code": 6203
            }
          ]
        }
      ],
      "responseRequired": true
    }
After request

Before request

Info 35   [00:01:52.000] request:
    {
      "command": "open",
      "arguments": {
        "file": "/a/b/file1.js"
      },
      "seq": 6,
      "type": "request"
    }
Info 36   [00:01:53.000] FileWatcher:: Close:: WatchInfo: /a/b/file1.js 500 undefined WatchType: Closed Script info
Info 37   [00:01:54.000] Search path: /a/b
Info 38   [00:01:55.000] For info: /a/b/file1.js :: No config files found.
Info 39   [00:01:56.000] Starting updateGraphWorker: Project: /dev/null/inferredProject2*
Info 40   [00:01:57.000] FileWatcher:: Added:: WatchInfo: /a/lib/lib.d.ts 500 undefined Project: /dev/null/inferredProject2* WatchType: Missing file
Info 41   [00:01:58.000] DirectoryWatcher:: Added:: WatchInfo: /a/b/node_modules/@types 1 undefined Project: /dev/null/inferredProject2* WatchType: Type roots
Info 42   [00:01:59.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /a/b/node_modules/@types 1 undefined Project: /dev/null/inferredProject2* WatchType: Type roots
Info 43   [00:02:00.000] Finishing updateGraphWorker: Project: /dev/null/inferredProject2* Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 44   [00:02:01.000] Project '/dev/null/inferredProject2*' (Inferred)
Info 45   [00:02:02.000] 	Files (2)
	/a/b/file2.d.ts Text-1 "\n                interface T {\n                    name: string;\n                };\n                interface T {\n                    name: number;\n                };"
	/a/b/file1.js SVC-1-0 "\n                /// <reference path=\"file2.d.ts\" />\n                var x = 1;"


	file2.d.ts
	  Referenced via 'file2.d.ts' from file 'file1.js'
	file1.js
	  Root file specified for compilation

Info 46   [00:02:03.000] -----------------------------------------------
TI:: [00:02:04.000] Got install request {"projectName":"/dev/null/inferredProject2*","fileNames":["/a/b/file2.d.ts","/a/b/file1.js"],"compilerOptions":{"target":1,"jsx":1,"allowNonTsExtensions":true,"allowJs":true,"noEmitForJsFiles":true,"maxNodeModuleJsDepth":2},"typeAcquisition":{"enable":true,"include":[],"exclude":[]},"unresolvedImports":[],"projectRootPath":"/a/b","cachePath":"/a/data/","kind":"discover"}
TI:: [00:02:05.000] Request specifies cache path '/a/data/', loading cached information...
TI:: [00:02:06.000] Processing cache location '/a/data/'
TI:: [00:02:07.000] Cache location was already processed...
TI:: [00:02:08.000] Explicitly included types: []
TI:: [00:02:09.000] Inferred typings from unresolved imports: []
TI:: [00:02:10.000] Result: {"cachedTypingPaths":[],"newTypingNames":[],"filesToWatch":["/a/b/bower_components","/a/b/node_modules"]}
TI:: [00:02:11.000] Finished typings discovery: {"cachedTypingPaths":[],"newTypingNames":[],"filesToWatch":["/a/b/bower_components","/a/b/node_modules"]}
TI:: [00:02:12.000] DirectoryWatcher:: Added:: WatchInfo: /a/b/bower_components
TI:: [00:02:13.000] DirectoryWatcher:: Added:: WatchInfo: /a/b/bower_components 1 undefined Project: /dev/null/inferredProject2* watcher already invoked: false
TI:: [00:02:14.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /a/b/bower_components 1 undefined Project: /dev/null/inferredProject2* watcher already invoked: false
TI:: [00:02:15.000] DirectoryWatcher:: Added:: WatchInfo: /a/b/node_modules
TI:: [00:02:16.000] DirectoryWatcher:: Added:: WatchInfo: /a/b/node_modules 1 undefined Project: /dev/null/inferredProject2* watcher already invoked: false
TI:: [00:02:17.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /a/b/node_modules 1 undefined Project: /dev/null/inferredProject2* watcher already invoked: false
TI:: [00:02:18.000] Sending response:
    {"projectName":"/dev/null/inferredProject2*","typeAcquisition":{"enable":true,"include":[],"exclude":[]},"compilerOptions":{"target":1,"jsx":1,"allowNonTsExtensions":true,"allowJs":true,"noEmitForJsFiles":true,"maxNodeModuleJsDepth":2},"typings":[],"unresolvedImports":[],"kind":"action::set"}
TI:: [00:02:19.000] No new typings were requested as a result of typings discovery
Info 47   [00:02:20.000] `remove Project::
Info 48   [00:02:21.000] Project '/dev/null/inferredProject1*' (Inferred)
Info 49   [00:02:22.000] 	Files (1)
	/a/b/file2.d.ts


	file2.d.ts
	  Root file specified for compilation

Info 50   [00:02:23.000] -----------------------------------------------
Info 51   [00:02:24.000] DirectoryWatcher:: Close:: WatchInfo: /a/b/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info 52   [00:02:25.000] Elapsed:: *ms DirectoryWatcher:: Close:: WatchInfo: /a/b/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info 53   [00:02:26.000] FileWatcher:: Close:: WatchInfo: /a/lib/lib.d.ts 500 undefined Project: /dev/null/inferredProject1* WatchType: Missing file
Info 54   [00:02:27.000] Project '/dev/null/inferredProject2*' (Inferred)
Info 54   [00:02:28.000] 	Files (2)

Info 54   [00:02:29.000] -----------------------------------------------
Info 54   [00:02:30.000] Open files: 
Info 54   [00:02:31.000] 	FileName: /a/b/file2.d.ts ProjectRootPath: undefined
Info 54   [00:02:32.000] 		Projects: /dev/null/inferredProject2*
Info 54   [00:02:33.000] 	FileName: /a/b/file1.js ProjectRootPath: undefined
Info 54   [00:02:34.000] 		Projects: /dev/null/inferredProject2*
Info 54   [00:02:35.000] response:
    {
      "responseRequired": false
    }
After request

PolledWatches::
/a/lib/lib.d.ts:
  {"pollingInterval":500}
/a/b/bower_components:
  {"pollingInterval":500}
/a/b/node_modules:
  {"pollingInterval":500}
/a/b/node_modules/@types:
  {"pollingInterval":500}

FsWatches *deleted*::
/a/b/file1.js:
  {}

Before request

Info 55   [00:02:36.000] request:
    {
      "command": "semanticDiagnosticsSync",
      "arguments": {
        "file": "/a/b/file2.d.ts"
      },
      "seq": 7,
      "type": "request"
    }
Info 56   [00:02:37.000] response:
    {
      "response": [],
      "responseRequired": true
    }
After request
