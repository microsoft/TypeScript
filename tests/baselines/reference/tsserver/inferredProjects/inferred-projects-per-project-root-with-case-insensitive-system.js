currentDirectory:: / useCaseSensitiveFileNames: false
Info 0    [00:00:17.000] Provided types map file "/a/lib/typesMap.json" doesn't exist
Before request
//// [/a/file1.ts]
let x = 1;

//// [/A/file2.ts]
let y = 2;

//// [/b/file2.ts]
let x = 3;

//// [/c/file3.ts]
let z = 4;


Info 1    [00:00:18.000] request:
    {
      "command": "compilerOptionsForInferredProjects",
      "arguments": {
        "options": {
          "allowJs": true,
          "target": 99
        }
      },
      "seq": 1,
      "type": "request"
    }
Info 2    [00:00:19.000] response:
    {
      "response": true,
      "responseRequired": true
    }
After request

Before request

Info 3    [00:00:20.000] request:
    {
      "command": "compilerOptionsForInferredProjects",
      "arguments": {
        "options": {
          "allowJs": true,
          "target": 2
        },
        "projectRootPath": "/a"
      },
      "seq": 2,
      "type": "request"
    }
Info 4    [00:00:21.000] response:
    {
      "response": true,
      "responseRequired": true
    }
After request

Before request

Info 5    [00:00:22.000] request:
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
Info 6    [00:00:23.000] Search path: /a
Info 7    [00:00:24.000] For info: /a/file1.ts :: No config files found.
Info 8    [00:00:25.000] Starting updateGraphWorker: Project: /dev/null/inferredProject1*
Info 9    [00:00:26.000] FileWatcher:: Added:: WatchInfo: /a/lib/lib.es6.d.ts 500 undefined Project: /dev/null/inferredProject1* WatchType: Missing file
Info 10   [00:00:27.000] DirectoryWatcher:: Added:: WatchInfo: /a/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info 11   [00:00:28.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /a/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info 12   [00:00:29.000] Finishing updateGraphWorker: Project: /dev/null/inferredProject1* Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 13   [00:00:30.000] Project '/dev/null/inferredProject1*' (Inferred)
Info 14   [00:00:31.000] 	Files (1)
	/a/file1.ts SVC-1-0 "let x = 1;"


	file1.ts
	  Root file specified for compilation

Info 15   [00:00:32.000] -----------------------------------------------
TI:: Creating typing installer

PolledWatches::
/a/lib/lib.es6.d.ts: *new*
  {"pollingInterval":500}
/a/node_modules/@types: *new*
  {"pollingInterval":500}

TI:: [00:00:33.000] Global cache location '/a/data/', safe file path '/safeList.json', types map path /typesMap.json
TI:: [00:00:34.000] Processing cache location '/a/data/'
TI:: [00:00:35.000] Trying to find '/a/data/package.json'...
TI:: [00:00:36.000] Finished processing cache location '/a/data/'
TI:: [00:00:37.000] Npm config file: /a/data/package.json
TI:: [00:00:38.000] Npm config file: '/a/data/package.json' is missing, creating new one...
TI:: [00:00:43.000] Updating types-registry npm package...
TI:: [00:00:44.000] npm install --ignore-scripts types-registry@latest
TI:: [00:00:51.000] TI:: Updated types-registry npm package
TI:: typing installer creation complete
//// [/a/data/package.json]
{ "private": true }

//// [/a/data/node_modules/types-registry/index.json]
{
 "entries": {}
}


TI:: [00:00:52.000] Got install request {"projectName":"/dev/null/inferredProject1*","fileNames":["/a/file1.ts"],"compilerOptions":{"allowJs":true,"target":2,"allowNonTsExtensions":true,"noEmitForJsFiles":true,"maxNodeModuleJsDepth":2},"typeAcquisition":{"enable":true,"include":[],"exclude":[]},"unresolvedImports":[],"projectRootPath":"/a","cachePath":"/a/data/","kind":"discover"}
TI:: [00:00:53.000] Request specifies cache path '/a/data/', loading cached information...
TI:: [00:00:54.000] Processing cache location '/a/data/'
TI:: [00:00:55.000] Cache location was already processed...
TI:: [00:00:56.000] Failed to load safelist from types map file '/typesMap.json'
TI:: [00:00:57.000] Explicitly included types: []
TI:: [00:00:58.000] Inferred typings from unresolved imports: []
TI:: [00:00:59.000] Result: {"cachedTypingPaths":[],"newTypingNames":[],"filesToWatch":["/a/bower_components","/a/node_modules"]}
TI:: [00:01:00.000] Finished typings discovery: {"cachedTypingPaths":[],"newTypingNames":[],"filesToWatch":["/a/bower_components","/a/node_modules"]}
TI:: [00:01:01.000] DirectoryWatcher:: Added:: WatchInfo: /a/bower_components
TI:: [00:01:02.000] DirectoryWatcher:: Added:: WatchInfo: /a/bower_components 1 undefined Project: /dev/null/inferredProject1* watcher already invoked: false
TI:: [00:01:03.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /a/bower_components 1 undefined Project: /dev/null/inferredProject1* watcher already invoked: false
TI:: [00:01:04.000] DirectoryWatcher:: Added:: WatchInfo: /a/node_modules
TI:: [00:01:05.000] DirectoryWatcher:: Added:: WatchInfo: /a/node_modules 1 undefined Project: /dev/null/inferredProject1* watcher already invoked: false
TI:: [00:01:06.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /a/node_modules 1 undefined Project: /dev/null/inferredProject1* watcher already invoked: false
TI:: [00:01:07.000] Sending response:
    {"projectName":"/dev/null/inferredProject1*","typeAcquisition":{"enable":true,"include":[],"exclude":[]},"compilerOptions":{"allowJs":true,"target":2,"allowNonTsExtensions":true,"noEmitForJsFiles":true,"maxNodeModuleJsDepth":2},"typings":[],"unresolvedImports":[],"kind":"action::set"}
TI:: [00:01:08.000] No new typings were requested as a result of typings discovery
Info 16   [00:01:09.000] Project '/dev/null/inferredProject1*' (Inferred)
Info 16   [00:01:10.000] 	Files (1)

Info 16   [00:01:11.000] -----------------------------------------------
Info 16   [00:01:12.000] Open files: 
Info 16   [00:01:13.000] 	FileName: /a/file1.ts ProjectRootPath: /a
Info 16   [00:01:14.000] 		Projects: /dev/null/inferredProject1*
Info 16   [00:01:15.000] response:
    {
      "responseRequired": false
    }
After request

PolledWatches::
/a/lib/lib.es6.d.ts:
  {"pollingInterval":500}
/a/node_modules/@types:
  {"pollingInterval":500}
/a/bower_components: *new*
  {"pollingInterval":500}
/a/node_modules: *new*
  {"pollingInterval":500}

Before request

Info 17   [00:01:16.000] request:
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
Info 18   [00:01:17.000] Search path: /A
Info 19   [00:01:18.000] For info: /A/file2.ts :: No config files found.
Info 20   [00:01:19.000] Starting updateGraphWorker: Project: /dev/null/inferredProject1*
Info 21   [00:01:20.000] Finishing updateGraphWorker: Project: /dev/null/inferredProject1* Version: 2 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 22   [00:01:21.000] Project '/dev/null/inferredProject1*' (Inferred)
Info 23   [00:01:22.000] 	Files (2)
	/a/file1.ts SVC-1-0 "let x = 1;"
	/A/file2.ts SVC-1-0 "let y = 2;"


	file1.ts
	  Root file specified for compilation
	file2.ts
	  Root file specified for compilation

Info 24   [00:01:23.000] -----------------------------------------------
TI:: [00:01:24.000] Got install request {"projectName":"/dev/null/inferredProject1*","fileNames":["/a/file1.ts","/A/file2.ts"],"compilerOptions":{"allowJs":true,"target":2,"allowNonTsExtensions":true,"noEmitForJsFiles":true,"maxNodeModuleJsDepth":2},"typeAcquisition":{"enable":true,"include":[],"exclude":[]},"unresolvedImports":[],"projectRootPath":"/a","cachePath":"/a/data/","kind":"discover"}
TI:: [00:01:25.000] Request specifies cache path '/a/data/', loading cached information...
TI:: [00:01:26.000] Processing cache location '/a/data/'
TI:: [00:01:27.000] Cache location was already processed...
TI:: [00:01:28.000] Explicitly included types: []
TI:: [00:01:29.000] Inferred typings from unresolved imports: []
TI:: [00:01:30.000] Result: {"cachedTypingPaths":[],"newTypingNames":[],"filesToWatch":["/a/bower_components","/a/node_modules"]}
TI:: [00:01:31.000] Finished typings discovery: {"cachedTypingPaths":[],"newTypingNames":[],"filesToWatch":["/a/bower_components","/a/node_modules"]}
TI:: [00:01:32.000] Sending response:
    {"projectName":"/dev/null/inferredProject1*","typeAcquisition":{"enable":true,"include":[],"exclude":[]},"compilerOptions":{"allowJs":true,"target":2,"allowNonTsExtensions":true,"noEmitForJsFiles":true,"maxNodeModuleJsDepth":2},"typings":[],"unresolvedImports":[],"kind":"action::set"}
TI:: [00:01:33.000] No new typings were requested as a result of typings discovery
Info 25   [00:01:34.000] Project '/dev/null/inferredProject1*' (Inferred)
Info 25   [00:01:35.000] 	Files (2)

Info 25   [00:01:36.000] -----------------------------------------------
Info 25   [00:01:37.000] Open files: 
Info 25   [00:01:38.000] 	FileName: /a/file1.ts ProjectRootPath: /a
Info 25   [00:01:39.000] 		Projects: /dev/null/inferredProject1*
Info 25   [00:01:40.000] 	FileName: /A/file2.ts ProjectRootPath: /a
Info 25   [00:01:41.000] 		Projects: /dev/null/inferredProject1*
Info 25   [00:01:42.000] response:
    {
      "responseRequired": false
    }
After request

Before request

Info 26   [00:01:43.000] request:
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
Info 27   [00:01:44.000] Search path: /b
Info 28   [00:01:45.000] For info: /b/file2.ts :: No config files found.
Info 29   [00:01:46.000] Starting updateGraphWorker: Project: /dev/null/inferredProject2*
Info 30   [00:01:47.000] FileWatcher:: Added:: WatchInfo: /a/lib/lib.esnext.full.d.ts 500 undefined Project: /dev/null/inferredProject2* WatchType: Missing file
Info 31   [00:01:48.000] DirectoryWatcher:: Added:: WatchInfo: /b/node_modules/@types 1 undefined Project: /dev/null/inferredProject2* WatchType: Type roots
Info 32   [00:01:49.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /b/node_modules/@types 1 undefined Project: /dev/null/inferredProject2* WatchType: Type roots
Info 33   [00:01:50.000] Finishing updateGraphWorker: Project: /dev/null/inferredProject2* Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 34   [00:01:51.000] Project '/dev/null/inferredProject2*' (Inferred)
Info 35   [00:01:52.000] 	Files (1)
	/b/file2.ts SVC-1-0 "let x = 3;"


	file2.ts
	  Root file specified for compilation

Info 36   [00:01:53.000] -----------------------------------------------
TI:: [00:01:54.000] Got install request {"projectName":"/dev/null/inferredProject2*","fileNames":["/b/file2.ts"],"compilerOptions":{"allowJs":true,"target":99,"allowNonTsExtensions":true,"noEmitForJsFiles":true,"maxNodeModuleJsDepth":2},"typeAcquisition":{"enable":true,"include":[],"exclude":[]},"unresolvedImports":[],"projectRootPath":"/b","cachePath":"/a/data/","kind":"discover"}
TI:: [00:01:55.000] Request specifies cache path '/a/data/', loading cached information...
TI:: [00:01:56.000] Processing cache location '/a/data/'
TI:: [00:01:57.000] Cache location was already processed...
TI:: [00:01:58.000] Explicitly included types: []
TI:: [00:01:59.000] Inferred typings from unresolved imports: []
TI:: [00:02:00.000] Result: {"cachedTypingPaths":[],"newTypingNames":[],"filesToWatch":["/b/bower_components","/b/node_modules"]}
TI:: [00:02:01.000] Finished typings discovery: {"cachedTypingPaths":[],"newTypingNames":[],"filesToWatch":["/b/bower_components","/b/node_modules"]}
TI:: [00:02:02.000] DirectoryWatcher:: Added:: WatchInfo: /b/bower_components
TI:: [00:02:03.000] DirectoryWatcher:: Added:: WatchInfo: /b/bower_components 1 undefined Project: /dev/null/inferredProject2* watcher already invoked: false
TI:: [00:02:04.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /b/bower_components 1 undefined Project: /dev/null/inferredProject2* watcher already invoked: false
TI:: [00:02:05.000] DirectoryWatcher:: Added:: WatchInfo: /b/node_modules
TI:: [00:02:06.000] DirectoryWatcher:: Added:: WatchInfo: /b/node_modules 1 undefined Project: /dev/null/inferredProject2* watcher already invoked: false
TI:: [00:02:07.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /b/node_modules 1 undefined Project: /dev/null/inferredProject2* watcher already invoked: false
TI:: [00:02:08.000] Sending response:
    {"projectName":"/dev/null/inferredProject2*","typeAcquisition":{"enable":true,"include":[],"exclude":[]},"compilerOptions":{"allowJs":true,"target":99,"allowNonTsExtensions":true,"noEmitForJsFiles":true,"maxNodeModuleJsDepth":2},"typings":[],"unresolvedImports":[],"kind":"action::set"}
TI:: [00:02:09.000] No new typings were requested as a result of typings discovery
Info 37   [00:02:10.000] Project '/dev/null/inferredProject1*' (Inferred)
Info 37   [00:02:11.000] 	Files (2)

Info 37   [00:02:12.000] -----------------------------------------------
Info 37   [00:02:13.000] Project '/dev/null/inferredProject2*' (Inferred)
Info 37   [00:02:14.000] 	Files (1)

Info 37   [00:02:15.000] -----------------------------------------------
Info 37   [00:02:16.000] Open files: 
Info 37   [00:02:17.000] 	FileName: /a/file1.ts ProjectRootPath: /a
Info 37   [00:02:18.000] 		Projects: /dev/null/inferredProject1*
Info 37   [00:02:19.000] 	FileName: /A/file2.ts ProjectRootPath: /a
Info 37   [00:02:20.000] 		Projects: /dev/null/inferredProject1*
Info 37   [00:02:21.000] 	FileName: /b/file2.ts ProjectRootPath: /b
Info 37   [00:02:22.000] 		Projects: /dev/null/inferredProject2*
Info 37   [00:02:23.000] response:
    {
      "responseRequired": false
    }
After request

PolledWatches::
/a/lib/lib.es6.d.ts:
  {"pollingInterval":500}
/a/node_modules/@types:
  {"pollingInterval":500}
/a/bower_components:
  {"pollingInterval":500}
/a/node_modules:
  {"pollingInterval":500}
/a/lib/lib.esnext.full.d.ts: *new*
  {"pollingInterval":500}
/b/node_modules/@types: *new*
  {"pollingInterval":500}
/b/bower_components: *new*
  {"pollingInterval":500}
/b/node_modules: *new*
  {"pollingInterval":500}

Before request

Info 38   [00:02:24.000] request:
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
Info 39   [00:02:25.000] Search path: /c
Info 40   [00:02:26.000] For info: /c/file3.ts :: No config files found.
Info 41   [00:02:27.000] Starting updateGraphWorker: Project: /dev/null/inferredProject3*
Info 42   [00:02:28.000] FileWatcher:: Added:: WatchInfo: /a/lib/lib.esnext.full.d.ts 500 undefined Project: /dev/null/inferredProject3* WatchType: Missing file
Info 43   [00:02:29.000] Finishing updateGraphWorker: Project: /dev/null/inferredProject3* Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 44   [00:02:30.000] Project '/dev/null/inferredProject3*' (Inferred)
Info 45   [00:02:31.000] 	Files (1)
	/c/file3.ts SVC-1-0 "let z = 4;"


	c/file3.ts
	  Root file specified for compilation

Info 46   [00:02:32.000] -----------------------------------------------
TI:: [00:02:33.000] Got install request {"projectName":"/dev/null/inferredProject3*","fileNames":["/c/file3.ts"],"compilerOptions":{"allowJs":true,"target":99,"allowNonTsExtensions":true,"noEmitForJsFiles":true,"maxNodeModuleJsDepth":2},"typeAcquisition":{"enable":true,"include":[],"exclude":[]},"unresolvedImports":[],"projectRootPath":"/","cachePath":"/a/data/","kind":"discover"}
TI:: [00:02:34.000] Request specifies cache path '/a/data/', loading cached information...
TI:: [00:02:35.000] Processing cache location '/a/data/'
TI:: [00:02:36.000] Cache location was already processed...
TI:: [00:02:37.000] Explicitly included types: []
TI:: [00:02:38.000] Inferred typings from unresolved imports: []
TI:: [00:02:39.000] Result: {"cachedTypingPaths":[],"newTypingNames":[],"filesToWatch":["/bower_components","/node_modules"]}
TI:: [00:02:40.000] Finished typings discovery: {"cachedTypingPaths":[],"newTypingNames":[],"filesToWatch":["/bower_components","/node_modules"]}
TI:: [00:02:41.000] DirectoryWatcher:: Added:: WatchInfo: /bower_components
TI:: [00:02:42.000] DirectoryWatcher:: Added:: WatchInfo: /bower_components 1 undefined Project: /dev/null/inferredProject3* watcher already invoked: false
TI:: [00:02:43.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /bower_components 1 undefined Project: /dev/null/inferredProject3* watcher already invoked: false
TI:: [00:02:44.000] DirectoryWatcher:: Added:: WatchInfo: /node_modules
TI:: [00:02:45.000] DirectoryWatcher:: Added:: WatchInfo: /node_modules 1 undefined Project: /dev/null/inferredProject3* watcher already invoked: false
TI:: [00:02:46.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /node_modules 1 undefined Project: /dev/null/inferredProject3* watcher already invoked: false
TI:: [00:02:47.000] Sending response:
    {"projectName":"/dev/null/inferredProject3*","typeAcquisition":{"enable":true,"include":[],"exclude":[]},"compilerOptions":{"allowJs":true,"target":99,"allowNonTsExtensions":true,"noEmitForJsFiles":true,"maxNodeModuleJsDepth":2},"typings":[],"unresolvedImports":[],"kind":"action::set"}
TI:: [00:02:48.000] No new typings were requested as a result of typings discovery
Info 47   [00:02:49.000] Project '/dev/null/inferredProject3*' (Inferred)
Info 47   [00:02:50.000] 	Files (1)

Info 47   [00:02:51.000] -----------------------------------------------
Info 47   [00:02:52.000] Project '/dev/null/inferredProject1*' (Inferred)
Info 47   [00:02:53.000] 	Files (2)

Info 47   [00:02:54.000] -----------------------------------------------
Info 47   [00:02:55.000] Project '/dev/null/inferredProject2*' (Inferred)
Info 47   [00:02:56.000] 	Files (1)

Info 47   [00:02:57.000] -----------------------------------------------
Info 47   [00:02:58.000] Open files: 
Info 47   [00:02:59.000] 	FileName: /a/file1.ts ProjectRootPath: /a
Info 47   [00:03:00.000] 		Projects: /dev/null/inferredProject1*
Info 47   [00:03:01.000] 	FileName: /A/file2.ts ProjectRootPath: /a
Info 47   [00:03:02.000] 		Projects: /dev/null/inferredProject1*
Info 47   [00:03:03.000] 	FileName: /b/file2.ts ProjectRootPath: /b
Info 47   [00:03:04.000] 		Projects: /dev/null/inferredProject2*
Info 47   [00:03:05.000] 	FileName: /c/file3.ts ProjectRootPath: undefined
Info 47   [00:03:06.000] 		Projects: /dev/null/inferredProject3*
Info 47   [00:03:07.000] response:
    {
      "responseRequired": false
    }
After request

PolledWatches::
/a/lib/lib.es6.d.ts:
  {"pollingInterval":500}
/a/node_modules/@types:
  {"pollingInterval":500}
/a/bower_components:
  {"pollingInterval":500}
/a/node_modules:
  {"pollingInterval":500}
/a/lib/lib.esnext.full.d.ts:
  {"pollingInterval":500}
/b/node_modules/@types:
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

Info 48   [00:03:08.000] request:
    {
      "command": "close",
      "arguments": {
        "file": "/a/file1.ts"
      },
      "seq": 7,
      "type": "request"
    }
Info 49   [00:03:09.000] FileWatcher:: Added:: WatchInfo: /a/file1.ts 500 undefined WatchType: Closed Script info
Info 50   [00:03:10.000] Project '/dev/null/inferredProject3*' (Inferred)
Info 50   [00:03:11.000] 	Files (1)

Info 50   [00:03:12.000] -----------------------------------------------
Info 50   [00:03:13.000] Project '/dev/null/inferredProject1*' (Inferred)
Info 50   [00:03:14.000] 	Files (2)

Info 50   [00:03:15.000] -----------------------------------------------
Info 50   [00:03:16.000] Project '/dev/null/inferredProject2*' (Inferred)
Info 50   [00:03:17.000] 	Files (1)

Info 50   [00:03:18.000] -----------------------------------------------
Info 50   [00:03:19.000] Open files: 
Info 50   [00:03:20.000] 	FileName: /A/file2.ts ProjectRootPath: /a
Info 50   [00:03:21.000] 		Projects: /dev/null/inferredProject1*
Info 50   [00:03:22.000] 	FileName: /b/file2.ts ProjectRootPath: /b
Info 50   [00:03:23.000] 		Projects: /dev/null/inferredProject2*
Info 50   [00:03:24.000] 	FileName: /c/file3.ts ProjectRootPath: undefined
Info 50   [00:03:25.000] 		Projects: /dev/null/inferredProject3*
Info 50   [00:03:26.000] response:
    {
      "responseRequired": false
    }
After request

PolledWatches::
/a/lib/lib.es6.d.ts:
  {"pollingInterval":500}
/a/node_modules/@types:
  {"pollingInterval":500}
/a/bower_components:
  {"pollingInterval":500}
/a/node_modules:
  {"pollingInterval":500}
/a/lib/lib.esnext.full.d.ts:
  {"pollingInterval":500}
/b/node_modules/@types:
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

Info 51   [00:03:27.000] request:
    {
      "command": "close",
      "arguments": {
        "file": "/A/file2.ts"
      },
      "seq": 8,
      "type": "request"
    }
Info 52   [00:03:28.000] DirectoryWatcher:: Close:: WatchInfo: /a/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info 53   [00:03:29.000] Elapsed:: *ms DirectoryWatcher:: Close:: WatchInfo: /a/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info 54   [00:03:30.000] FileWatcher:: Added:: WatchInfo: /A/file2.ts 500 undefined WatchType: Closed Script info
Info 55   [00:03:31.000] Project '/dev/null/inferredProject3*' (Inferred)
Info 55   [00:03:32.000] 	Files (1)

Info 55   [00:03:33.000] -----------------------------------------------
Info 55   [00:03:34.000] Project '/dev/null/inferredProject1*' (Inferred)
Info 55   [00:03:35.000] 	Files (2)

Info 55   [00:03:36.000] -----------------------------------------------
Info 55   [00:03:37.000] Project '/dev/null/inferredProject2*' (Inferred)
Info 55   [00:03:38.000] 	Files (1)

Info 55   [00:03:39.000] -----------------------------------------------
Info 55   [00:03:40.000] Open files: 
Info 55   [00:03:41.000] 	FileName: /b/file2.ts ProjectRootPath: /b
Info 55   [00:03:42.000] 		Projects: /dev/null/inferredProject2*
Info 55   [00:03:43.000] 	FileName: /c/file3.ts ProjectRootPath: undefined
Info 55   [00:03:44.000] 		Projects: /dev/null/inferredProject3*
Info 55   [00:03:45.000] response:
    {
      "responseRequired": false
    }
After request

PolledWatches::
/a/lib/lib.es6.d.ts:
  {"pollingInterval":500}
/a/bower_components:
  {"pollingInterval":500}
/a/node_modules:
  {"pollingInterval":500}
/a/lib/lib.esnext.full.d.ts:
  {"pollingInterval":500}
/b/node_modules/@types:
  {"pollingInterval":500}
/b/bower_components:
  {"pollingInterval":500}
/b/node_modules:
  {"pollingInterval":500}
/bower_components:
  {"pollingInterval":500}
/node_modules:
  {"pollingInterval":500}

PolledWatches *deleted*::
/a/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/a/file1.ts:
  {}
/a/file2.ts: *new*
  {}

Before request

Info 56   [00:03:46.000] request:
    {
      "command": "close",
      "arguments": {
        "file": "/b/file2.ts"
      },
      "seq": 9,
      "type": "request"
    }
Info 57   [00:03:47.000] DirectoryWatcher:: Close:: WatchInfo: /b/node_modules/@types 1 undefined Project: /dev/null/inferredProject2* WatchType: Type roots
Info 58   [00:03:48.000] Elapsed:: *ms DirectoryWatcher:: Close:: WatchInfo: /b/node_modules/@types 1 undefined Project: /dev/null/inferredProject2* WatchType: Type roots
Info 59   [00:03:49.000] FileWatcher:: Added:: WatchInfo: /b/file2.ts 500 undefined WatchType: Closed Script info
Info 60   [00:03:50.000] Project '/dev/null/inferredProject3*' (Inferred)
Info 60   [00:03:51.000] 	Files (1)

Info 60   [00:03:52.000] -----------------------------------------------
Info 60   [00:03:53.000] Project '/dev/null/inferredProject1*' (Inferred)
Info 60   [00:03:54.000] 	Files (2)

Info 60   [00:03:55.000] -----------------------------------------------
Info 60   [00:03:56.000] Project '/dev/null/inferredProject2*' (Inferred)
Info 60   [00:03:57.000] 	Files (1)

Info 60   [00:03:58.000] -----------------------------------------------
Info 60   [00:03:59.000] Open files: 
Info 60   [00:04:00.000] 	FileName: /c/file3.ts ProjectRootPath: undefined
Info 60   [00:04:01.000] 		Projects: /dev/null/inferredProject3*
Info 60   [00:04:02.000] response:
    {
      "responseRequired": false
    }
After request

PolledWatches::
/a/lib/lib.es6.d.ts:
  {"pollingInterval":500}
/a/bower_components:
  {"pollingInterval":500}
/a/node_modules:
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

PolledWatches *deleted*::
/b/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/a/file1.ts:
  {}
/a/file2.ts:
  {}
/b/file2.ts: *new*
  {}

Before request

Info 61   [00:04:03.000] request:
    {
      "command": "close",
      "arguments": {
        "file": "/c/file3.ts"
      },
      "seq": 10,
      "type": "request"
    }
Info 62   [00:04:04.000] FileWatcher:: Added:: WatchInfo: /c/file3.ts 500 undefined WatchType: Closed Script info
Info 63   [00:04:05.000] Project '/dev/null/inferredProject3*' (Inferred)
Info 63   [00:04:06.000] 	Files (1)

Info 63   [00:04:07.000] -----------------------------------------------
Info 63   [00:04:08.000] Project '/dev/null/inferredProject1*' (Inferred)
Info 63   [00:04:09.000] 	Files (2)

Info 63   [00:04:10.000] -----------------------------------------------
Info 63   [00:04:11.000] Project '/dev/null/inferredProject2*' (Inferred)
Info 63   [00:04:12.000] 	Files (1)

Info 63   [00:04:13.000] -----------------------------------------------
Info 63   [00:04:14.000] Open files: 
Info 63   [00:04:15.000] response:
    {
      "responseRequired": false
    }
After request

PolledWatches::
/a/lib/lib.es6.d.ts:
  {"pollingInterval":500}
/a/bower_components:
  {"pollingInterval":500}
/a/node_modules:
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

FsWatches::
/a/file1.ts:
  {}
/a/file2.ts:
  {}
/b/file2.ts:
  {}
/c/file3.ts: *new*
  {}

Before request

Info 64   [00:04:16.000] request:
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
Info 65   [00:04:17.000] FileWatcher:: Close:: WatchInfo: /a/file1.ts 500 undefined WatchType: Closed Script info
Info 66   [00:04:18.000] Search path: /a
Info 67   [00:04:19.000] For info: /a/file1.ts :: No config files found.
Info 68   [00:04:20.000] Starting updateGraphWorker: Project: /dev/null/inferredProject1*
Info 69   [00:04:21.000] DirectoryWatcher:: Added:: WatchInfo: /a/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info 70   [00:04:22.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /a/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info 71   [00:04:23.000] Finishing updateGraphWorker: Project: /dev/null/inferredProject1* Version: 3 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 72   [00:04:24.000] Project '/dev/null/inferredProject1*' (Inferred)
Info 73   [00:04:25.000] 	Files (1)
	/a/file1.ts SVC-1-0 "let x = 1;"


	file1.ts
	  Root file specified for compilation

Info 74   [00:04:26.000] -----------------------------------------------
TI:: [00:04:27.000] Got install request {"projectName":"/dev/null/inferredProject1*","fileNames":["/a/file1.ts"],"compilerOptions":{"allowJs":true,"target":2,"allowNonTsExtensions":true,"noEmitForJsFiles":true,"maxNodeModuleJsDepth":2},"typeAcquisition":{"enable":true,"include":[],"exclude":[]},"unresolvedImports":[],"projectRootPath":"/a","cachePath":"/a/data/","kind":"discover"}
TI:: [00:04:28.000] Request specifies cache path '/a/data/', loading cached information...
TI:: [00:04:29.000] Processing cache location '/a/data/'
TI:: [00:04:30.000] Cache location was already processed...
TI:: [00:04:31.000] Explicitly included types: []
TI:: [00:04:32.000] Inferred typings from unresolved imports: []
TI:: [00:04:33.000] Result: {"cachedTypingPaths":[],"newTypingNames":[],"filesToWatch":["/a/bower_components","/a/node_modules"]}
TI:: [00:04:34.000] Finished typings discovery: {"cachedTypingPaths":[],"newTypingNames":[],"filesToWatch":["/a/bower_components","/a/node_modules"]}
TI:: [00:04:35.000] Sending response:
    {"projectName":"/dev/null/inferredProject1*","typeAcquisition":{"enable":true,"include":[],"exclude":[]},"compilerOptions":{"allowJs":true,"target":2,"allowNonTsExtensions":true,"noEmitForJsFiles":true,"maxNodeModuleJsDepth":2},"typings":[],"unresolvedImports":[],"kind":"action::set"}
TI:: [00:04:36.000] No new typings were requested as a result of typings discovery
Info 75   [00:04:37.000] `remove Project::
Info 76   [00:04:38.000] Project '/dev/null/inferredProject3*' (Inferred)
Info 77   [00:04:39.000] 	Files (1)
	/c/file3.ts


	c/file3.ts
	  Root file specified for compilation

Info 78   [00:04:40.000] -----------------------------------------------
Info 79   [00:04:41.000] FileWatcher:: Close:: WatchInfo: /a/lib/lib.esnext.full.d.ts 500 undefined Project: /dev/null/inferredProject3* WatchType: Missing file
Info 80   [00:04:42.000] `remove Project::
Info 81   [00:04:43.000] Project '/dev/null/inferredProject2*' (Inferred)
Info 82   [00:04:44.000] 	Files (1)
	/b/file2.ts


	file2.ts
	  Root file specified for compilation

Info 83   [00:04:45.000] -----------------------------------------------
Info 84   [00:04:46.000] FileWatcher:: Close:: WatchInfo: /a/lib/lib.esnext.full.d.ts 500 undefined Project: /dev/null/inferredProject2* WatchType: Missing file
Info 85   [00:04:47.000] FileWatcher:: Close:: WatchInfo: /A/file2.ts 500 undefined WatchType: Closed Script info
Info 86   [00:04:48.000] FileWatcher:: Close:: WatchInfo: /b/file2.ts 500 undefined WatchType: Closed Script info
Info 87   [00:04:49.000] FileWatcher:: Close:: WatchInfo: /c/file3.ts 500 undefined WatchType: Closed Script info
Info 88   [00:04:50.000] Project '/dev/null/inferredProject1*' (Inferred)
Info 88   [00:04:51.000] 	Files (1)

Info 88   [00:04:52.000] -----------------------------------------------
Info 88   [00:04:53.000] Open files: 
Info 88   [00:04:54.000] 	FileName: /a/file1.ts ProjectRootPath: /a
Info 88   [00:04:55.000] 		Projects: /dev/null/inferredProject1*
Info 88   [00:04:56.000] response:
    {
      "responseRequired": false
    }
After request

PolledWatches::
/a/lib/lib.es6.d.ts:
  {"pollingInterval":500}
/a/bower_components:
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
/a/node_modules/@types: *new*
  {"pollingInterval":500}

PolledWatches *deleted*::
/a/lib/lib.esnext.full.d.ts:
  {"pollingInterval":500}

FsWatches *deleted*::
/a/file1.ts:
  {}
/a/file2.ts:
  {}
/b/file2.ts:
  {}
/c/file3.ts:
  {}

Before request

Info 89   [00:04:57.000] request:
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
Info 90   [00:04:58.000] Search path: /A
Info 91   [00:04:59.000] For info: /A/file2.ts :: No config files found.
Info 92   [00:05:00.000] Starting updateGraphWorker: Project: /dev/null/inferredProject1*
Info 93   [00:05:01.000] Finishing updateGraphWorker: Project: /dev/null/inferredProject1* Version: 4 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 94   [00:05:02.000] Project '/dev/null/inferredProject1*' (Inferred)
Info 95   [00:05:03.000] 	Files (2)
	/a/file1.ts SVC-1-0 "let x = 1;"
	/A/file2.ts SVC-2-0 "let y = 2;"


	file1.ts
	  Root file specified for compilation
	file2.ts
	  Root file specified for compilation

Info 96   [00:05:04.000] -----------------------------------------------
TI:: [00:05:05.000] Got install request {"projectName":"/dev/null/inferredProject1*","fileNames":["/a/file1.ts","/A/file2.ts"],"compilerOptions":{"allowJs":true,"target":2,"allowNonTsExtensions":true,"noEmitForJsFiles":true,"maxNodeModuleJsDepth":2},"typeAcquisition":{"enable":true,"include":[],"exclude":[]},"unresolvedImports":[],"projectRootPath":"/a","cachePath":"/a/data/","kind":"discover"}
TI:: [00:05:06.000] Request specifies cache path '/a/data/', loading cached information...
TI:: [00:05:07.000] Processing cache location '/a/data/'
TI:: [00:05:08.000] Cache location was already processed...
TI:: [00:05:09.000] Explicitly included types: []
TI:: [00:05:10.000] Inferred typings from unresolved imports: []
TI:: [00:05:11.000] Result: {"cachedTypingPaths":[],"newTypingNames":[],"filesToWatch":["/a/bower_components","/a/node_modules"]}
TI:: [00:05:12.000] Finished typings discovery: {"cachedTypingPaths":[],"newTypingNames":[],"filesToWatch":["/a/bower_components","/a/node_modules"]}
TI:: [00:05:13.000] Sending response:
    {"projectName":"/dev/null/inferredProject1*","typeAcquisition":{"enable":true,"include":[],"exclude":[]},"compilerOptions":{"allowJs":true,"target":2,"allowNonTsExtensions":true,"noEmitForJsFiles":true,"maxNodeModuleJsDepth":2},"typings":[],"unresolvedImports":[],"kind":"action::set"}
TI:: [00:05:14.000] No new typings were requested as a result of typings discovery
Info 97   [00:05:15.000] Project '/dev/null/inferredProject1*' (Inferred)
Info 97   [00:05:16.000] 	Files (2)

Info 97   [00:05:17.000] -----------------------------------------------
Info 97   [00:05:18.000] Open files: 
Info 97   [00:05:19.000] 	FileName: /a/file1.ts ProjectRootPath: /a
Info 97   [00:05:20.000] 		Projects: /dev/null/inferredProject1*
Info 97   [00:05:21.000] 	FileName: /A/file2.ts ProjectRootPath: /A
Info 97   [00:05:22.000] 		Projects: /dev/null/inferredProject1*
Info 97   [00:05:23.000] response:
    {
      "responseRequired": false
    }
After request

Before request

Info 98   [00:05:24.000] request:
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
Info 99   [00:05:25.000] Search path: /b
Info 100  [00:05:26.000] For info: /b/file2.ts :: No config files found.
Info 101  [00:05:27.000] Starting updateGraphWorker: Project: /dev/null/inferredProject4*
Info 102  [00:05:28.000] FileWatcher:: Added:: WatchInfo: /a/lib/lib.esnext.full.d.ts 500 undefined Project: /dev/null/inferredProject4* WatchType: Missing file
Info 103  [00:05:29.000] DirectoryWatcher:: Added:: WatchInfo: /b/node_modules/@types 1 undefined Project: /dev/null/inferredProject4* WatchType: Type roots
Info 104  [00:05:30.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /b/node_modules/@types 1 undefined Project: /dev/null/inferredProject4* WatchType: Type roots
Info 105  [00:05:31.000] Finishing updateGraphWorker: Project: /dev/null/inferredProject4* Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 106  [00:05:32.000] Project '/dev/null/inferredProject4*' (Inferred)
Info 107  [00:05:33.000] 	Files (1)
	/b/file2.ts SVC-2-0 "let x = 3;"


	file2.ts
	  Root file specified for compilation

Info 108  [00:05:34.000] -----------------------------------------------
TI:: [00:05:35.000] Got install request {"projectName":"/dev/null/inferredProject4*","fileNames":["/b/file2.ts"],"compilerOptions":{"allowJs":true,"target":99,"allowNonTsExtensions":true,"noEmitForJsFiles":true,"maxNodeModuleJsDepth":2},"typeAcquisition":{"enable":true,"include":[],"exclude":[]},"unresolvedImports":[],"projectRootPath":"/b","cachePath":"/a/data/","kind":"discover"}
TI:: [00:05:36.000] Request specifies cache path '/a/data/', loading cached information...
TI:: [00:05:37.000] Processing cache location '/a/data/'
TI:: [00:05:38.000] Cache location was already processed...
TI:: [00:05:39.000] Explicitly included types: []
TI:: [00:05:40.000] Inferred typings from unresolved imports: []
TI:: [00:05:41.000] Result: {"cachedTypingPaths":[],"newTypingNames":[],"filesToWatch":["/b/bower_components","/b/node_modules"]}
TI:: [00:05:42.000] Finished typings discovery: {"cachedTypingPaths":[],"newTypingNames":[],"filesToWatch":["/b/bower_components","/b/node_modules"]}
TI:: [00:05:43.000] DirectoryWatcher:: Added:: WatchInfo: /b/bower_components
TI:: [00:05:44.000] DirectoryWatcher:: Added:: WatchInfo: /b/bower_components 1 undefined Project: /dev/null/inferredProject4* watcher already invoked: false
TI:: [00:05:45.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /b/bower_components 1 undefined Project: /dev/null/inferredProject4* watcher already invoked: false
TI:: [00:05:46.000] DirectoryWatcher:: Added:: WatchInfo: /b/node_modules
TI:: [00:05:47.000] DirectoryWatcher:: Added:: WatchInfo: /b/node_modules 1 undefined Project: /dev/null/inferredProject4* watcher already invoked: false
TI:: [00:05:48.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /b/node_modules 1 undefined Project: /dev/null/inferredProject4* watcher already invoked: false
TI:: [00:05:49.000] Sending response:
    {"projectName":"/dev/null/inferredProject4*","typeAcquisition":{"enable":true,"include":[],"exclude":[]},"compilerOptions":{"allowJs":true,"target":99,"allowNonTsExtensions":true,"noEmitForJsFiles":true,"maxNodeModuleJsDepth":2},"typings":[],"unresolvedImports":[],"kind":"action::set"}
TI:: [00:05:50.000] No new typings were requested as a result of typings discovery
Info 109  [00:05:51.000] Project '/dev/null/inferredProject1*' (Inferred)
Info 109  [00:05:52.000] 	Files (2)

Info 109  [00:05:53.000] -----------------------------------------------
Info 109  [00:05:54.000] Project '/dev/null/inferredProject4*' (Inferred)
Info 109  [00:05:55.000] 	Files (1)

Info 109  [00:05:56.000] -----------------------------------------------
Info 109  [00:05:57.000] Open files: 
Info 109  [00:05:58.000] 	FileName: /a/file1.ts ProjectRootPath: /a
Info 109  [00:05:59.000] 		Projects: /dev/null/inferredProject1*
Info 109  [00:06:00.000] 	FileName: /A/file2.ts ProjectRootPath: /A
Info 109  [00:06:01.000] 		Projects: /dev/null/inferredProject1*
Info 109  [00:06:02.000] 	FileName: /b/file2.ts ProjectRootPath: /b
Info 109  [00:06:03.000] 		Projects: /dev/null/inferredProject4*
Info 109  [00:06:04.000] response:
    {
      "responseRequired": false
    }
After request

PolledWatches::
/a/lib/lib.es6.d.ts:
  {"pollingInterval":500}
/a/bower_components:
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
/a/node_modules/@types:
  {"pollingInterval":500}
/a/lib/lib.esnext.full.d.ts: *new*
  {"pollingInterval":500}
/b/node_modules/@types: *new*
  {"pollingInterval":500}

Before request

Info 110  [00:06:05.000] request:
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
Info 111  [00:06:06.000] Search path: /c
Info 112  [00:06:07.000] For info: /c/file3.ts :: No config files found.
Info 113  [00:06:08.000] Starting updateGraphWorker: Project: /dev/null/inferredProject5*
Info 114  [00:06:09.000] FileWatcher:: Added:: WatchInfo: /a/lib/lib.esnext.full.d.ts 500 undefined Project: /dev/null/inferredProject5* WatchType: Missing file
Info 115  [00:06:10.000] Finishing updateGraphWorker: Project: /dev/null/inferredProject5* Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 116  [00:06:11.000] Project '/dev/null/inferredProject5*' (Inferred)
Info 117  [00:06:12.000] 	Files (1)
	/c/file3.ts SVC-2-0 "let z = 4;"


	c/file3.ts
	  Root file specified for compilation

Info 118  [00:06:13.000] -----------------------------------------------
TI:: [00:06:14.000] Got install request {"projectName":"/dev/null/inferredProject5*","fileNames":["/c/file3.ts"],"compilerOptions":{"allowJs":true,"target":99,"allowNonTsExtensions":true,"noEmitForJsFiles":true,"maxNodeModuleJsDepth":2},"typeAcquisition":{"enable":true,"include":[],"exclude":[]},"unresolvedImports":[],"projectRootPath":"/","cachePath":"/a/data/","kind":"discover"}
TI:: [00:06:15.000] Request specifies cache path '/a/data/', loading cached information...
TI:: [00:06:16.000] Processing cache location '/a/data/'
TI:: [00:06:17.000] Cache location was already processed...
TI:: [00:06:18.000] Explicitly included types: []
TI:: [00:06:19.000] Inferred typings from unresolved imports: []
TI:: [00:06:20.000] Result: {"cachedTypingPaths":[],"newTypingNames":[],"filesToWatch":["/bower_components","/node_modules"]}
TI:: [00:06:21.000] Finished typings discovery: {"cachedTypingPaths":[],"newTypingNames":[],"filesToWatch":["/bower_components","/node_modules"]}
TI:: [00:06:22.000] DirectoryWatcher:: Added:: WatchInfo: /bower_components
TI:: [00:06:23.000] DirectoryWatcher:: Added:: WatchInfo: /bower_components 1 undefined Project: /dev/null/inferredProject5* watcher already invoked: false
TI:: [00:06:24.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /bower_components 1 undefined Project: /dev/null/inferredProject5* watcher already invoked: false
TI:: [00:06:25.000] DirectoryWatcher:: Added:: WatchInfo: /node_modules
TI:: [00:06:26.000] DirectoryWatcher:: Added:: WatchInfo: /node_modules 1 undefined Project: /dev/null/inferredProject5* watcher already invoked: false
TI:: [00:06:27.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /node_modules 1 undefined Project: /dev/null/inferredProject5* watcher already invoked: false
TI:: [00:06:28.000] Sending response:
    {"projectName":"/dev/null/inferredProject5*","typeAcquisition":{"enable":true,"include":[],"exclude":[]},"compilerOptions":{"allowJs":true,"target":99,"allowNonTsExtensions":true,"noEmitForJsFiles":true,"maxNodeModuleJsDepth":2},"typings":[],"unresolvedImports":[],"kind":"action::set"}
TI:: [00:06:29.000] No new typings were requested as a result of typings discovery
Info 119  [00:06:30.000] Project '/dev/null/inferredProject5*' (Inferred)
Info 119  [00:06:31.000] 	Files (1)

Info 119  [00:06:32.000] -----------------------------------------------
Info 119  [00:06:33.000] Project '/dev/null/inferredProject1*' (Inferred)
Info 119  [00:06:34.000] 	Files (2)

Info 119  [00:06:35.000] -----------------------------------------------
Info 119  [00:06:36.000] Project '/dev/null/inferredProject4*' (Inferred)
Info 119  [00:06:37.000] 	Files (1)

Info 119  [00:06:38.000] -----------------------------------------------
Info 119  [00:06:39.000] Open files: 
Info 119  [00:06:40.000] 	FileName: /a/file1.ts ProjectRootPath: /a
Info 119  [00:06:41.000] 		Projects: /dev/null/inferredProject1*
Info 119  [00:06:42.000] 	FileName: /A/file2.ts ProjectRootPath: /A
Info 119  [00:06:43.000] 		Projects: /dev/null/inferredProject1*
Info 119  [00:06:44.000] 	FileName: /b/file2.ts ProjectRootPath: /b
Info 119  [00:06:45.000] 		Projects: /dev/null/inferredProject4*
Info 119  [00:06:46.000] 	FileName: /c/file3.ts ProjectRootPath: undefined
Info 119  [00:06:47.000] 		Projects: /dev/null/inferredProject5*
Info 119  [00:06:48.000] response:
    {
      "responseRequired": false
    }
After request

Before request

Info 120  [00:06:49.000] request:
    {
      "command": "close",
      "arguments": {
        "file": "/a/file1.ts"
      },
      "seq": 15,
      "type": "request"
    }
Info 121  [00:06:50.000] FileWatcher:: Added:: WatchInfo: /a/file1.ts 500 undefined WatchType: Closed Script info
Info 122  [00:06:51.000] Project '/dev/null/inferredProject5*' (Inferred)
Info 122  [00:06:52.000] 	Files (1)

Info 122  [00:06:53.000] -----------------------------------------------
Info 122  [00:06:54.000] Project '/dev/null/inferredProject1*' (Inferred)
Info 122  [00:06:55.000] 	Files (2)

Info 122  [00:06:56.000] -----------------------------------------------
Info 122  [00:06:57.000] Project '/dev/null/inferredProject4*' (Inferred)
Info 122  [00:06:58.000] 	Files (1)

Info 122  [00:06:59.000] -----------------------------------------------
Info 122  [00:07:00.000] Open files: 
Info 122  [00:07:01.000] 	FileName: /A/file2.ts ProjectRootPath: /A
Info 122  [00:07:02.000] 		Projects: /dev/null/inferredProject1*
Info 122  [00:07:03.000] 	FileName: /b/file2.ts ProjectRootPath: /b
Info 122  [00:07:04.000] 		Projects: /dev/null/inferredProject4*
Info 122  [00:07:05.000] 	FileName: /c/file3.ts ProjectRootPath: undefined
Info 122  [00:07:06.000] 		Projects: /dev/null/inferredProject5*
Info 122  [00:07:07.000] response:
    {
      "responseRequired": false
    }
After request

PolledWatches::
/a/lib/lib.es6.d.ts:
  {"pollingInterval":500}
/a/bower_components:
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
/a/node_modules/@types:
  {"pollingInterval":500}
/a/lib/lib.esnext.full.d.ts:
  {"pollingInterval":500}
/b/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/a/file1.ts: *new*
  {}

Before request

Info 123  [00:07:08.000] request:
    {
      "command": "close",
      "arguments": {
        "file": "/A/file2.ts"
      },
      "seq": 16,
      "type": "request"
    }
Info 124  [00:07:09.000] DirectoryWatcher:: Close:: WatchInfo: /a/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info 125  [00:07:10.000] Elapsed:: *ms DirectoryWatcher:: Close:: WatchInfo: /a/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info 126  [00:07:11.000] FileWatcher:: Added:: WatchInfo: /A/file2.ts 500 undefined WatchType: Closed Script info
Info 127  [00:07:12.000] Project '/dev/null/inferredProject5*' (Inferred)
Info 127  [00:07:13.000] 	Files (1)

Info 127  [00:07:14.000] -----------------------------------------------
Info 127  [00:07:15.000] Project '/dev/null/inferredProject1*' (Inferred)
Info 127  [00:07:16.000] 	Files (2)

Info 127  [00:07:17.000] -----------------------------------------------
Info 127  [00:07:18.000] Project '/dev/null/inferredProject4*' (Inferred)
Info 127  [00:07:19.000] 	Files (1)

Info 127  [00:07:20.000] -----------------------------------------------
Info 127  [00:07:21.000] Open files: 
Info 127  [00:07:22.000] 	FileName: /b/file2.ts ProjectRootPath: /b
Info 127  [00:07:23.000] 		Projects: /dev/null/inferredProject4*
Info 127  [00:07:24.000] 	FileName: /c/file3.ts ProjectRootPath: undefined
Info 127  [00:07:25.000] 		Projects: /dev/null/inferredProject5*
Info 127  [00:07:26.000] response:
    {
      "responseRequired": false
    }
After request

PolledWatches::
/a/lib/lib.es6.d.ts:
  {"pollingInterval":500}
/a/bower_components:
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
/a/lib/lib.esnext.full.d.ts:
  {"pollingInterval":500}
/b/node_modules/@types:
  {"pollingInterval":500}

PolledWatches *deleted*::
/a/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/a/file1.ts:
  {}
/a/file2.ts: *new*
  {}

Before request

Info 128  [00:07:27.000] request:
    {
      "command": "close",
      "arguments": {
        "file": "/b/file2.ts"
      },
      "seq": 17,
      "type": "request"
    }
Info 129  [00:07:28.000] DirectoryWatcher:: Close:: WatchInfo: /b/node_modules/@types 1 undefined Project: /dev/null/inferredProject4* WatchType: Type roots
Info 130  [00:07:29.000] Elapsed:: *ms DirectoryWatcher:: Close:: WatchInfo: /b/node_modules/@types 1 undefined Project: /dev/null/inferredProject4* WatchType: Type roots
Info 131  [00:07:30.000] FileWatcher:: Added:: WatchInfo: /b/file2.ts 500 undefined WatchType: Closed Script info
Info 132  [00:07:31.000] Project '/dev/null/inferredProject5*' (Inferred)
Info 132  [00:07:32.000] 	Files (1)

Info 132  [00:07:33.000] -----------------------------------------------
Info 132  [00:07:34.000] Project '/dev/null/inferredProject1*' (Inferred)
Info 132  [00:07:35.000] 	Files (2)

Info 132  [00:07:36.000] -----------------------------------------------
Info 132  [00:07:37.000] Project '/dev/null/inferredProject4*' (Inferred)
Info 132  [00:07:38.000] 	Files (1)

Info 132  [00:07:39.000] -----------------------------------------------
Info 132  [00:07:40.000] Open files: 
Info 132  [00:07:41.000] 	FileName: /c/file3.ts ProjectRootPath: undefined
Info 132  [00:07:42.000] 		Projects: /dev/null/inferredProject5*
Info 132  [00:07:43.000] response:
    {
      "responseRequired": false
    }
After request

PolledWatches::
/a/lib/lib.es6.d.ts:
  {"pollingInterval":500}
/a/bower_components:
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
/a/lib/lib.esnext.full.d.ts:
  {"pollingInterval":500}

PolledWatches *deleted*::
/b/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/a/file1.ts:
  {}
/a/file2.ts:
  {}
/b/file2.ts: *new*
  {}

Before request

Info 133  [00:07:44.000] request:
    {
      "command": "close",
      "arguments": {
        "file": "/c/file3.ts"
      },
      "seq": 18,
      "type": "request"
    }
Info 134  [00:07:45.000] FileWatcher:: Added:: WatchInfo: /c/file3.ts 500 undefined WatchType: Closed Script info
Info 135  [00:07:46.000] Project '/dev/null/inferredProject5*' (Inferred)
Info 135  [00:07:47.000] 	Files (1)

Info 135  [00:07:48.000] -----------------------------------------------
Info 135  [00:07:49.000] Project '/dev/null/inferredProject1*' (Inferred)
Info 135  [00:07:50.000] 	Files (2)

Info 135  [00:07:51.000] -----------------------------------------------
Info 135  [00:07:52.000] Project '/dev/null/inferredProject4*' (Inferred)
Info 135  [00:07:53.000] 	Files (1)

Info 135  [00:07:54.000] -----------------------------------------------
Info 135  [00:07:55.000] Open files: 
Info 135  [00:07:56.000] response:
    {
      "responseRequired": false
    }
After request

PolledWatches::
/a/lib/lib.es6.d.ts:
  {"pollingInterval":500}
/a/bower_components:
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
/a/lib/lib.esnext.full.d.ts:
  {"pollingInterval":500}

FsWatches::
/a/file1.ts:
  {}
/a/file2.ts:
  {}
/b/file2.ts:
  {}
/c/file3.ts: *new*
  {}

Before request

Info 136  [00:07:57.000] request:
    {
      "command": "compilerOptionsForInferredProjects",
      "arguments": {
        "options": {
          "allowJs": true,
          "target": 4
        },
        "projectRootPath": "/A"
      },
      "seq": 19,
      "type": "request"
    }
Info 137  [00:07:58.000] Scheduled: /dev/null/inferredProject1*
Info 138  [00:07:59.000] response:
    {
      "response": true,
      "responseRequired": true
    }
After request

Before request

Info 139  [00:08:00.000] request:
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
Info 140  [00:08:01.000] FileWatcher:: Close:: WatchInfo: /a/file1.ts 500 undefined WatchType: Closed Script info
Info 141  [00:08:02.000] Search path: /a
Info 142  [00:08:03.000] For info: /a/file1.ts :: No config files found.
Info 143  [00:08:04.000] Starting updateGraphWorker: Project: /dev/null/inferredProject1*
Info 144  [00:08:05.000] FileWatcher:: Close:: WatchInfo: /a/lib/lib.es6.d.ts 500 undefined Project: /dev/null/inferredProject1* WatchType: Missing file
Info 145  [00:08:06.000] FileWatcher:: Added:: WatchInfo: /a/lib/lib.es2017.full.d.ts 500 undefined Project: /dev/null/inferredProject1* WatchType: Missing file
Info 146  [00:08:07.000] DirectoryWatcher:: Added:: WatchInfo: /a/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info 147  [00:08:08.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /a/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info 148  [00:08:09.000] Finishing updateGraphWorker: Project: /dev/null/inferredProject1* Version: 5 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 149  [00:08:10.000] Project '/dev/null/inferredProject1*' (Inferred)
Info 150  [00:08:11.000] 	Files (1)
	/a/file1.ts SVC-1-0 "let x = 1;"


	file1.ts
	  Root file specified for compilation

Info 151  [00:08:12.000] -----------------------------------------------
TI:: [00:08:13.000] Got install request {"projectName":"/dev/null/inferredProject1*","fileNames":["/a/file1.ts"],"compilerOptions":{"allowJs":true,"target":4,"allowNonTsExtensions":true,"maxNodeModuleJsDepth":2,"noEmitForJsFiles":true},"typeAcquisition":{"enable":true,"include":[],"exclude":[]},"unresolvedImports":[],"projectRootPath":"/a","cachePath":"/a/data/","kind":"discover"}
TI:: [00:08:14.000] Request specifies cache path '/a/data/', loading cached information...
TI:: [00:08:15.000] Processing cache location '/a/data/'
TI:: [00:08:16.000] Cache location was already processed...
TI:: [00:08:17.000] Explicitly included types: []
TI:: [00:08:18.000] Inferred typings from unresolved imports: []
TI:: [00:08:19.000] Result: {"cachedTypingPaths":[],"newTypingNames":[],"filesToWatch":["/a/bower_components","/a/node_modules"]}
TI:: [00:08:20.000] Finished typings discovery: {"cachedTypingPaths":[],"newTypingNames":[],"filesToWatch":["/a/bower_components","/a/node_modules"]}
TI:: [00:08:21.000] Sending response:
    {"projectName":"/dev/null/inferredProject1*","typeAcquisition":{"enable":true,"include":[],"exclude":[]},"compilerOptions":{"allowJs":true,"target":4,"allowNonTsExtensions":true,"maxNodeModuleJsDepth":2,"noEmitForJsFiles":true},"typings":[],"unresolvedImports":[],"kind":"action::set"}
TI:: [00:08:22.000] No new typings were requested as a result of typings discovery
Info 152  [00:08:23.000] `remove Project::
Info 153  [00:08:24.000] Project '/dev/null/inferredProject5*' (Inferred)
Info 154  [00:08:25.000] 	Files (1)
	/c/file3.ts


	c/file3.ts
	  Root file specified for compilation

Info 155  [00:08:26.000] -----------------------------------------------
Info 156  [00:08:27.000] FileWatcher:: Close:: WatchInfo: /a/lib/lib.esnext.full.d.ts 500 undefined Project: /dev/null/inferredProject5* WatchType: Missing file
Info 157  [00:08:28.000] `remove Project::
Info 158  [00:08:29.000] Project '/dev/null/inferredProject4*' (Inferred)
Info 159  [00:08:30.000] 	Files (1)
	/b/file2.ts


	file2.ts
	  Root file specified for compilation

Info 160  [00:08:31.000] -----------------------------------------------
Info 161  [00:08:32.000] FileWatcher:: Close:: WatchInfo: /a/lib/lib.esnext.full.d.ts 500 undefined Project: /dev/null/inferredProject4* WatchType: Missing file
Info 162  [00:08:33.000] FileWatcher:: Close:: WatchInfo: /A/file2.ts 500 undefined WatchType: Closed Script info
Info 163  [00:08:34.000] FileWatcher:: Close:: WatchInfo: /b/file2.ts 500 undefined WatchType: Closed Script info
Info 164  [00:08:35.000] FileWatcher:: Close:: WatchInfo: /c/file3.ts 500 undefined WatchType: Closed Script info
Info 165  [00:08:36.000] Project '/dev/null/inferredProject1*' (Inferred)
Info 165  [00:08:37.000] 	Files (1)

Info 165  [00:08:38.000] -----------------------------------------------
Info 165  [00:08:39.000] Open files: 
Info 165  [00:08:40.000] 	FileName: /a/file1.ts ProjectRootPath: /a
Info 165  [00:08:41.000] 		Projects: /dev/null/inferredProject1*
Info 165  [00:08:42.000] response:
    {
      "responseRequired": false
    }
After request

PolledWatches::
/a/bower_components:
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
/a/lib/lib.es2017.full.d.ts: *new*
  {"pollingInterval":500}
/a/node_modules/@types: *new*
  {"pollingInterval":500}

PolledWatches *deleted*::
/a/lib/lib.es6.d.ts:
  {"pollingInterval":500}
/a/lib/lib.esnext.full.d.ts:
  {"pollingInterval":500}

FsWatches *deleted*::
/a/file1.ts:
  {}
/a/file2.ts:
  {}
/b/file2.ts:
  {}
/c/file3.ts:
  {}

Before request

Info 166  [00:08:43.000] request:
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
Info 167  [00:08:44.000] Search path: /A
Info 168  [00:08:45.000] For info: /A/file2.ts :: No config files found.
Info 169  [00:08:46.000] Starting updateGraphWorker: Project: /dev/null/inferredProject1*
Info 170  [00:08:47.000] Finishing updateGraphWorker: Project: /dev/null/inferredProject1* Version: 6 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 171  [00:08:48.000] Project '/dev/null/inferredProject1*' (Inferred)
Info 172  [00:08:49.000] 	Files (2)
	/a/file1.ts SVC-1-0 "let x = 1;"
	/A/file2.ts SVC-3-0 "let y = 2;"


	file1.ts
	  Root file specified for compilation
	file2.ts
	  Root file specified for compilation

Info 173  [00:08:50.000] -----------------------------------------------
TI:: [00:08:51.000] Got install request {"projectName":"/dev/null/inferredProject1*","fileNames":["/a/file1.ts","/A/file2.ts"],"compilerOptions":{"allowJs":true,"target":4,"allowNonTsExtensions":true,"maxNodeModuleJsDepth":2,"noEmitForJsFiles":true},"typeAcquisition":{"enable":true,"include":[],"exclude":[]},"unresolvedImports":[],"projectRootPath":"/a","cachePath":"/a/data/","kind":"discover"}
TI:: [00:08:52.000] Request specifies cache path '/a/data/', loading cached information...
TI:: [00:08:53.000] Processing cache location '/a/data/'
TI:: [00:08:54.000] Cache location was already processed...
TI:: [00:08:55.000] Explicitly included types: []
TI:: [00:08:56.000] Inferred typings from unresolved imports: []
TI:: [00:08:57.000] Result: {"cachedTypingPaths":[],"newTypingNames":[],"filesToWatch":["/a/bower_components","/a/node_modules"]}
TI:: [00:08:58.000] Finished typings discovery: {"cachedTypingPaths":[],"newTypingNames":[],"filesToWatch":["/a/bower_components","/a/node_modules"]}
TI:: [00:08:59.000] Sending response:
    {"projectName":"/dev/null/inferredProject1*","typeAcquisition":{"enable":true,"include":[],"exclude":[]},"compilerOptions":{"allowJs":true,"target":4,"allowNonTsExtensions":true,"maxNodeModuleJsDepth":2,"noEmitForJsFiles":true},"typings":[],"unresolvedImports":[],"kind":"action::set"}
TI:: [00:09:00.000] No new typings were requested as a result of typings discovery
Info 174  [00:09:01.000] Project '/dev/null/inferredProject1*' (Inferred)
Info 174  [00:09:02.000] 	Files (2)

Info 174  [00:09:03.000] -----------------------------------------------
Info 174  [00:09:04.000] Open files: 
Info 174  [00:09:05.000] 	FileName: /a/file1.ts ProjectRootPath: /a
Info 174  [00:09:06.000] 		Projects: /dev/null/inferredProject1*
Info 174  [00:09:07.000] 	FileName: /A/file2.ts ProjectRootPath: /a
Info 174  [00:09:08.000] 		Projects: /dev/null/inferredProject1*
Info 174  [00:09:09.000] response:
    {
      "responseRequired": false
    }
After request

Before request

Info 175  [00:09:10.000] request:
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
Info 176  [00:09:11.000] Search path: /b
Info 177  [00:09:12.000] For info: /b/file2.ts :: No config files found.
Info 178  [00:09:13.000] Starting updateGraphWorker: Project: /dev/null/inferredProject6*
Info 179  [00:09:14.000] FileWatcher:: Added:: WatchInfo: /a/lib/lib.esnext.full.d.ts 500 undefined Project: /dev/null/inferredProject6* WatchType: Missing file
Info 180  [00:09:15.000] DirectoryWatcher:: Added:: WatchInfo: /b/node_modules/@types 1 undefined Project: /dev/null/inferredProject6* WatchType: Type roots
Info 181  [00:09:16.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /b/node_modules/@types 1 undefined Project: /dev/null/inferredProject6* WatchType: Type roots
Info 182  [00:09:17.000] Finishing updateGraphWorker: Project: /dev/null/inferredProject6* Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 183  [00:09:18.000] Project '/dev/null/inferredProject6*' (Inferred)
Info 184  [00:09:19.000] 	Files (1)
	/b/file2.ts SVC-3-0 "let x = 3;"


	file2.ts
	  Root file specified for compilation

Info 185  [00:09:20.000] -----------------------------------------------
TI:: [00:09:21.000] Got install request {"projectName":"/dev/null/inferredProject6*","fileNames":["/b/file2.ts"],"compilerOptions":{"allowJs":true,"target":99,"allowNonTsExtensions":true,"noEmitForJsFiles":true,"maxNodeModuleJsDepth":2},"typeAcquisition":{"enable":true,"include":[],"exclude":[]},"unresolvedImports":[],"projectRootPath":"/b","cachePath":"/a/data/","kind":"discover"}
TI:: [00:09:22.000] Request specifies cache path '/a/data/', loading cached information...
TI:: [00:09:23.000] Processing cache location '/a/data/'
TI:: [00:09:24.000] Cache location was already processed...
TI:: [00:09:25.000] Explicitly included types: []
TI:: [00:09:26.000] Inferred typings from unresolved imports: []
TI:: [00:09:27.000] Result: {"cachedTypingPaths":[],"newTypingNames":[],"filesToWatch":["/b/bower_components","/b/node_modules"]}
TI:: [00:09:28.000] Finished typings discovery: {"cachedTypingPaths":[],"newTypingNames":[],"filesToWatch":["/b/bower_components","/b/node_modules"]}
TI:: [00:09:29.000] DirectoryWatcher:: Added:: WatchInfo: /b/bower_components
TI:: [00:09:30.000] DirectoryWatcher:: Added:: WatchInfo: /b/bower_components 1 undefined Project: /dev/null/inferredProject6* watcher already invoked: false
TI:: [00:09:31.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /b/bower_components 1 undefined Project: /dev/null/inferredProject6* watcher already invoked: false
TI:: [00:09:32.000] DirectoryWatcher:: Added:: WatchInfo: /b/node_modules
TI:: [00:09:33.000] DirectoryWatcher:: Added:: WatchInfo: /b/node_modules 1 undefined Project: /dev/null/inferredProject6* watcher already invoked: false
TI:: [00:09:34.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /b/node_modules 1 undefined Project: /dev/null/inferredProject6* watcher already invoked: false
TI:: [00:09:35.000] Sending response:
    {"projectName":"/dev/null/inferredProject6*","typeAcquisition":{"enable":true,"include":[],"exclude":[]},"compilerOptions":{"allowJs":true,"target":99,"allowNonTsExtensions":true,"noEmitForJsFiles":true,"maxNodeModuleJsDepth":2},"typings":[],"unresolvedImports":[],"kind":"action::set"}
TI:: [00:09:36.000] No new typings were requested as a result of typings discovery
Info 186  [00:09:37.000] Project '/dev/null/inferredProject1*' (Inferred)
Info 186  [00:09:38.000] 	Files (2)

Info 186  [00:09:39.000] -----------------------------------------------
Info 186  [00:09:40.000] Project '/dev/null/inferredProject6*' (Inferred)
Info 186  [00:09:41.000] 	Files (1)

Info 186  [00:09:42.000] -----------------------------------------------
Info 186  [00:09:43.000] Open files: 
Info 186  [00:09:44.000] 	FileName: /a/file1.ts ProjectRootPath: /a
Info 186  [00:09:45.000] 		Projects: /dev/null/inferredProject1*
Info 186  [00:09:46.000] 	FileName: /A/file2.ts ProjectRootPath: /a
Info 186  [00:09:47.000] 		Projects: /dev/null/inferredProject1*
Info 186  [00:09:48.000] 	FileName: /b/file2.ts ProjectRootPath: /b
Info 186  [00:09:49.000] 		Projects: /dev/null/inferredProject6*
Info 186  [00:09:50.000] response:
    {
      "responseRequired": false
    }
After request

PolledWatches::
/a/bower_components:
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
/a/lib/lib.es2017.full.d.ts:
  {"pollingInterval":500}
/a/node_modules/@types:
  {"pollingInterval":500}
/a/lib/lib.esnext.full.d.ts: *new*
  {"pollingInterval":500}
/b/node_modules/@types: *new*
  {"pollingInterval":500}

Before request

Info 187  [00:09:51.000] request:
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
Info 188  [00:09:52.000] Search path: /c
Info 189  [00:09:53.000] For info: /c/file3.ts :: No config files found.
Info 190  [00:09:54.000] Starting updateGraphWorker: Project: /dev/null/inferredProject7*
Info 191  [00:09:55.000] FileWatcher:: Added:: WatchInfo: /a/lib/lib.esnext.full.d.ts 500 undefined Project: /dev/null/inferredProject7* WatchType: Missing file
Info 192  [00:09:56.000] Finishing updateGraphWorker: Project: /dev/null/inferredProject7* Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 193  [00:09:57.000] Project '/dev/null/inferredProject7*' (Inferred)
Info 194  [00:09:58.000] 	Files (1)
	/c/file3.ts SVC-3-0 "let z = 4;"


	c/file3.ts
	  Root file specified for compilation

Info 195  [00:09:59.000] -----------------------------------------------
TI:: [00:10:00.000] Got install request {"projectName":"/dev/null/inferredProject7*","fileNames":["/c/file3.ts"],"compilerOptions":{"allowJs":true,"target":99,"allowNonTsExtensions":true,"noEmitForJsFiles":true,"maxNodeModuleJsDepth":2},"typeAcquisition":{"enable":true,"include":[],"exclude":[]},"unresolvedImports":[],"projectRootPath":"/","cachePath":"/a/data/","kind":"discover"}
TI:: [00:10:01.000] Request specifies cache path '/a/data/', loading cached information...
TI:: [00:10:02.000] Processing cache location '/a/data/'
TI:: [00:10:03.000] Cache location was already processed...
TI:: [00:10:04.000] Explicitly included types: []
TI:: [00:10:05.000] Inferred typings from unresolved imports: []
TI:: [00:10:06.000] Result: {"cachedTypingPaths":[],"newTypingNames":[],"filesToWatch":["/bower_components","/node_modules"]}
TI:: [00:10:07.000] Finished typings discovery: {"cachedTypingPaths":[],"newTypingNames":[],"filesToWatch":["/bower_components","/node_modules"]}
TI:: [00:10:08.000] DirectoryWatcher:: Added:: WatchInfo: /bower_components
TI:: [00:10:09.000] DirectoryWatcher:: Added:: WatchInfo: /bower_components 1 undefined Project: /dev/null/inferredProject7* watcher already invoked: false
TI:: [00:10:10.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /bower_components 1 undefined Project: /dev/null/inferredProject7* watcher already invoked: false
TI:: [00:10:11.000] DirectoryWatcher:: Added:: WatchInfo: /node_modules
TI:: [00:10:12.000] DirectoryWatcher:: Added:: WatchInfo: /node_modules 1 undefined Project: /dev/null/inferredProject7* watcher already invoked: false
TI:: [00:10:13.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /node_modules 1 undefined Project: /dev/null/inferredProject7* watcher already invoked: false
TI:: [00:10:14.000] Sending response:
    {"projectName":"/dev/null/inferredProject7*","typeAcquisition":{"enable":true,"include":[],"exclude":[]},"compilerOptions":{"allowJs":true,"target":99,"allowNonTsExtensions":true,"noEmitForJsFiles":true,"maxNodeModuleJsDepth":2},"typings":[],"unresolvedImports":[],"kind":"action::set"}
TI:: [00:10:15.000] No new typings were requested as a result of typings discovery
Info 196  [00:10:16.000] Project '/dev/null/inferredProject7*' (Inferred)
Info 196  [00:10:17.000] 	Files (1)

Info 196  [00:10:18.000] -----------------------------------------------
Info 196  [00:10:19.000] Project '/dev/null/inferredProject1*' (Inferred)
Info 196  [00:10:20.000] 	Files (2)

Info 196  [00:10:21.000] -----------------------------------------------
Info 196  [00:10:22.000] Project '/dev/null/inferredProject6*' (Inferred)
Info 196  [00:10:23.000] 	Files (1)

Info 196  [00:10:24.000] -----------------------------------------------
Info 196  [00:10:25.000] Open files: 
Info 196  [00:10:26.000] 	FileName: /a/file1.ts ProjectRootPath: /a
Info 196  [00:10:27.000] 		Projects: /dev/null/inferredProject1*
Info 196  [00:10:28.000] 	FileName: /A/file2.ts ProjectRootPath: /a
Info 196  [00:10:29.000] 		Projects: /dev/null/inferredProject1*
Info 196  [00:10:30.000] 	FileName: /b/file2.ts ProjectRootPath: /b
Info 196  [00:10:31.000] 		Projects: /dev/null/inferredProject6*
Info 196  [00:10:32.000] 	FileName: /c/file3.ts ProjectRootPath: undefined
Info 196  [00:10:33.000] 		Projects: /dev/null/inferredProject7*
Info 196  [00:10:34.000] response:
    {
      "responseRequired": false
    }
After request

Before request

Info 197  [00:10:35.000] request:
    {
      "command": "close",
      "arguments": {
        "file": "/a/file1.ts"
      },
      "seq": 24,
      "type": "request"
    }
Info 198  [00:10:36.000] FileWatcher:: Added:: WatchInfo: /a/file1.ts 500 undefined WatchType: Closed Script info
Info 199  [00:10:37.000] Project '/dev/null/inferredProject7*' (Inferred)
Info 199  [00:10:38.000] 	Files (1)

Info 199  [00:10:39.000] -----------------------------------------------
Info 199  [00:10:40.000] Project '/dev/null/inferredProject1*' (Inferred)
Info 199  [00:10:41.000] 	Files (2)

Info 199  [00:10:42.000] -----------------------------------------------
Info 199  [00:10:43.000] Project '/dev/null/inferredProject6*' (Inferred)
Info 199  [00:10:44.000] 	Files (1)

Info 199  [00:10:45.000] -----------------------------------------------
Info 199  [00:10:46.000] Open files: 
Info 199  [00:10:47.000] 	FileName: /A/file2.ts ProjectRootPath: /a
Info 199  [00:10:48.000] 		Projects: /dev/null/inferredProject1*
Info 199  [00:10:49.000] 	FileName: /b/file2.ts ProjectRootPath: /b
Info 199  [00:10:50.000] 		Projects: /dev/null/inferredProject6*
Info 199  [00:10:51.000] 	FileName: /c/file3.ts ProjectRootPath: undefined
Info 199  [00:10:52.000] 		Projects: /dev/null/inferredProject7*
Info 199  [00:10:53.000] response:
    {
      "responseRequired": false
    }
After request

PolledWatches::
/a/bower_components:
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
/a/lib/lib.es2017.full.d.ts:
  {"pollingInterval":500}
/a/node_modules/@types:
  {"pollingInterval":500}
/a/lib/lib.esnext.full.d.ts:
  {"pollingInterval":500}
/b/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/a/file1.ts: *new*
  {}

Before request

Info 200  [00:10:54.000] request:
    {
      "command": "close",
      "arguments": {
        "file": "/A/file2.ts"
      },
      "seq": 25,
      "type": "request"
    }
Info 201  [00:10:55.000] DirectoryWatcher:: Close:: WatchInfo: /a/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info 202  [00:10:56.000] Elapsed:: *ms DirectoryWatcher:: Close:: WatchInfo: /a/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info 203  [00:10:57.000] FileWatcher:: Added:: WatchInfo: /A/file2.ts 500 undefined WatchType: Closed Script info
Info 204  [00:10:58.000] Project '/dev/null/inferredProject7*' (Inferred)
Info 204  [00:10:59.000] 	Files (1)

Info 204  [00:11:00.000] -----------------------------------------------
Info 204  [00:11:01.000] Project '/dev/null/inferredProject1*' (Inferred)
Info 204  [00:11:02.000] 	Files (2)

Info 204  [00:11:03.000] -----------------------------------------------
Info 204  [00:11:04.000] Project '/dev/null/inferredProject6*' (Inferred)
Info 204  [00:11:05.000] 	Files (1)

Info 204  [00:11:06.000] -----------------------------------------------
Info 204  [00:11:07.000] Open files: 
Info 204  [00:11:08.000] 	FileName: /b/file2.ts ProjectRootPath: /b
Info 204  [00:11:09.000] 		Projects: /dev/null/inferredProject6*
Info 204  [00:11:10.000] 	FileName: /c/file3.ts ProjectRootPath: undefined
Info 204  [00:11:11.000] 		Projects: /dev/null/inferredProject7*
Info 204  [00:11:12.000] response:
    {
      "responseRequired": false
    }
After request

PolledWatches::
/a/bower_components:
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
/a/lib/lib.es2017.full.d.ts:
  {"pollingInterval":500}
/a/lib/lib.esnext.full.d.ts:
  {"pollingInterval":500}
/b/node_modules/@types:
  {"pollingInterval":500}

PolledWatches *deleted*::
/a/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/a/file1.ts:
  {}
/a/file2.ts: *new*
  {}

Before request

Info 205  [00:11:13.000] request:
    {
      "command": "close",
      "arguments": {
        "file": "/b/file2.ts"
      },
      "seq": 26,
      "type": "request"
    }
Info 206  [00:11:14.000] DirectoryWatcher:: Close:: WatchInfo: /b/node_modules/@types 1 undefined Project: /dev/null/inferredProject6* WatchType: Type roots
Info 207  [00:11:15.000] Elapsed:: *ms DirectoryWatcher:: Close:: WatchInfo: /b/node_modules/@types 1 undefined Project: /dev/null/inferredProject6* WatchType: Type roots
Info 208  [00:11:16.000] FileWatcher:: Added:: WatchInfo: /b/file2.ts 500 undefined WatchType: Closed Script info
Info 209  [00:11:17.000] Project '/dev/null/inferredProject7*' (Inferred)
Info 209  [00:11:18.000] 	Files (1)

Info 209  [00:11:19.000] -----------------------------------------------
Info 209  [00:11:20.000] Project '/dev/null/inferredProject1*' (Inferred)
Info 209  [00:11:21.000] 	Files (2)

Info 209  [00:11:22.000] -----------------------------------------------
Info 209  [00:11:23.000] Project '/dev/null/inferredProject6*' (Inferred)
Info 209  [00:11:24.000] 	Files (1)

Info 209  [00:11:25.000] -----------------------------------------------
Info 209  [00:11:26.000] Open files: 
Info 209  [00:11:27.000] 	FileName: /c/file3.ts ProjectRootPath: undefined
Info 209  [00:11:28.000] 		Projects: /dev/null/inferredProject7*
Info 209  [00:11:29.000] response:
    {
      "responseRequired": false
    }
After request

PolledWatches::
/a/bower_components:
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
/a/lib/lib.es2017.full.d.ts:
  {"pollingInterval":500}
/a/lib/lib.esnext.full.d.ts:
  {"pollingInterval":500}

PolledWatches *deleted*::
/b/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/a/file1.ts:
  {}
/a/file2.ts:
  {}
/b/file2.ts: *new*
  {}

Before request

Info 210  [00:11:30.000] request:
    {
      "command": "close",
      "arguments": {
        "file": "/c/file3.ts"
      },
      "seq": 27,
      "type": "request"
    }
Info 211  [00:11:31.000] FileWatcher:: Added:: WatchInfo: /c/file3.ts 500 undefined WatchType: Closed Script info
Info 212  [00:11:32.000] Project '/dev/null/inferredProject7*' (Inferred)
Info 212  [00:11:33.000] 	Files (1)

Info 212  [00:11:34.000] -----------------------------------------------
Info 212  [00:11:35.000] Project '/dev/null/inferredProject1*' (Inferred)
Info 212  [00:11:36.000] 	Files (2)

Info 212  [00:11:37.000] -----------------------------------------------
Info 212  [00:11:38.000] Project '/dev/null/inferredProject6*' (Inferred)
Info 212  [00:11:39.000] 	Files (1)

Info 212  [00:11:40.000] -----------------------------------------------
Info 212  [00:11:41.000] Open files: 
Info 212  [00:11:42.000] response:
    {
      "responseRequired": false
    }
After request

PolledWatches::
/a/bower_components:
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
/a/lib/lib.es2017.full.d.ts:
  {"pollingInterval":500}
/a/lib/lib.esnext.full.d.ts:
  {"pollingInterval":500}

FsWatches::
/a/file1.ts:
  {}
/a/file2.ts:
  {}
/b/file2.ts:
  {}
/c/file3.ts: *new*
  {}

Before request

Info 213  [00:11:43.000] request:
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
Info 214  [00:11:44.000] FileWatcher:: Close:: WatchInfo: /a/file1.ts 500 undefined WatchType: Closed Script info
Info 215  [00:11:45.000] Search path: /a
Info 216  [00:11:46.000] For info: /a/file1.ts :: No config files found.
Info 217  [00:11:47.000] Starting updateGraphWorker: Project: /dev/null/inferredProject1*
Info 218  [00:11:48.000] DirectoryWatcher:: Added:: WatchInfo: /a/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info 219  [00:11:49.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /a/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info 220  [00:11:50.000] Finishing updateGraphWorker: Project: /dev/null/inferredProject1* Version: 7 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 221  [00:11:51.000] Project '/dev/null/inferredProject1*' (Inferred)
Info 222  [00:11:52.000] 	Files (1)
	/a/file1.ts SVC-1-0 "let x = 1;"


	file1.ts
	  Root file specified for compilation

Info 223  [00:11:53.000] -----------------------------------------------
TI:: [00:11:54.000] Got install request {"projectName":"/dev/null/inferredProject1*","fileNames":["/a/file1.ts"],"compilerOptions":{"allowJs":true,"target":4,"allowNonTsExtensions":true,"maxNodeModuleJsDepth":2,"noEmitForJsFiles":true},"typeAcquisition":{"enable":true,"include":[],"exclude":[]},"unresolvedImports":[],"projectRootPath":"/a","cachePath":"/a/data/","kind":"discover"}
TI:: [00:11:55.000] Request specifies cache path '/a/data/', loading cached information...
TI:: [00:11:56.000] Processing cache location '/a/data/'
TI:: [00:11:57.000] Cache location was already processed...
TI:: [00:11:58.000] Explicitly included types: []
TI:: [00:11:59.000] Inferred typings from unresolved imports: []
TI:: [00:12:00.000] Result: {"cachedTypingPaths":[],"newTypingNames":[],"filesToWatch":["/a/bower_components","/a/node_modules"]}
TI:: [00:12:01.000] Finished typings discovery: {"cachedTypingPaths":[],"newTypingNames":[],"filesToWatch":["/a/bower_components","/a/node_modules"]}
TI:: [00:12:02.000] Sending response:
    {"projectName":"/dev/null/inferredProject1*","typeAcquisition":{"enable":true,"include":[],"exclude":[]},"compilerOptions":{"allowJs":true,"target":4,"allowNonTsExtensions":true,"maxNodeModuleJsDepth":2,"noEmitForJsFiles":true},"typings":[],"unresolvedImports":[],"kind":"action::set"}
TI:: [00:12:03.000] No new typings were requested as a result of typings discovery
Info 224  [00:12:04.000] `remove Project::
Info 225  [00:12:05.000] Project '/dev/null/inferredProject7*' (Inferred)
Info 226  [00:12:06.000] 	Files (1)
	/c/file3.ts


	c/file3.ts
	  Root file specified for compilation

Info 227  [00:12:07.000] -----------------------------------------------
Info 228  [00:12:08.000] FileWatcher:: Close:: WatchInfo: /a/lib/lib.esnext.full.d.ts 500 undefined Project: /dev/null/inferredProject7* WatchType: Missing file
Info 229  [00:12:09.000] `remove Project::
Info 230  [00:12:10.000] Project '/dev/null/inferredProject6*' (Inferred)
Info 231  [00:12:11.000] 	Files (1)
	/b/file2.ts


	file2.ts
	  Root file specified for compilation

Info 232  [00:12:12.000] -----------------------------------------------
Info 233  [00:12:13.000] FileWatcher:: Close:: WatchInfo: /a/lib/lib.esnext.full.d.ts 500 undefined Project: /dev/null/inferredProject6* WatchType: Missing file
Info 234  [00:12:14.000] FileWatcher:: Close:: WatchInfo: /A/file2.ts 500 undefined WatchType: Closed Script info
Info 235  [00:12:15.000] FileWatcher:: Close:: WatchInfo: /b/file2.ts 500 undefined WatchType: Closed Script info
Info 236  [00:12:16.000] FileWatcher:: Close:: WatchInfo: /c/file3.ts 500 undefined WatchType: Closed Script info
Info 237  [00:12:17.000] Project '/dev/null/inferredProject1*' (Inferred)
Info 237  [00:12:18.000] 	Files (1)

Info 237  [00:12:19.000] -----------------------------------------------
Info 237  [00:12:20.000] Open files: 
Info 237  [00:12:21.000] 	FileName: /a/file1.ts ProjectRootPath: /a
Info 237  [00:12:22.000] 		Projects: /dev/null/inferredProject1*
Info 237  [00:12:23.000] response:
    {
      "responseRequired": false
    }
After request

PolledWatches::
/a/bower_components:
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
/a/lib/lib.es2017.full.d.ts:
  {"pollingInterval":500}
/a/node_modules/@types: *new*
  {"pollingInterval":500}

PolledWatches *deleted*::
/a/lib/lib.esnext.full.d.ts:
  {"pollingInterval":500}

FsWatches *deleted*::
/a/file1.ts:
  {}
/a/file2.ts:
  {}
/b/file2.ts:
  {}
/c/file3.ts:
  {}

Before request

Info 238  [00:12:24.000] request:
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
Info 239  [00:12:25.000] Search path: /A
Info 240  [00:12:26.000] For info: /A/file2.ts :: No config files found.
Info 241  [00:12:27.000] Starting updateGraphWorker: Project: /dev/null/inferredProject1*
Info 242  [00:12:28.000] Finishing updateGraphWorker: Project: /dev/null/inferredProject1* Version: 8 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 243  [00:12:29.000] Project '/dev/null/inferredProject1*' (Inferred)
Info 244  [00:12:30.000] 	Files (2)
	/a/file1.ts SVC-1-0 "let x = 1;"
	/A/file2.ts SVC-4-0 "let y = 2;"


	file1.ts
	  Root file specified for compilation
	file2.ts
	  Root file specified for compilation

Info 245  [00:12:31.000] -----------------------------------------------
TI:: [00:12:32.000] Got install request {"projectName":"/dev/null/inferredProject1*","fileNames":["/a/file1.ts","/A/file2.ts"],"compilerOptions":{"allowJs":true,"target":4,"allowNonTsExtensions":true,"maxNodeModuleJsDepth":2,"noEmitForJsFiles":true},"typeAcquisition":{"enable":true,"include":[],"exclude":[]},"unresolvedImports":[],"projectRootPath":"/a","cachePath":"/a/data/","kind":"discover"}
TI:: [00:12:33.000] Request specifies cache path '/a/data/', loading cached information...
TI:: [00:12:34.000] Processing cache location '/a/data/'
TI:: [00:12:35.000] Cache location was already processed...
TI:: [00:12:36.000] Explicitly included types: []
TI:: [00:12:37.000] Inferred typings from unresolved imports: []
TI:: [00:12:38.000] Result: {"cachedTypingPaths":[],"newTypingNames":[],"filesToWatch":["/a/bower_components","/a/node_modules"]}
TI:: [00:12:39.000] Finished typings discovery: {"cachedTypingPaths":[],"newTypingNames":[],"filesToWatch":["/a/bower_components","/a/node_modules"]}
TI:: [00:12:40.000] Sending response:
    {"projectName":"/dev/null/inferredProject1*","typeAcquisition":{"enable":true,"include":[],"exclude":[]},"compilerOptions":{"allowJs":true,"target":4,"allowNonTsExtensions":true,"maxNodeModuleJsDepth":2,"noEmitForJsFiles":true},"typings":[],"unresolvedImports":[],"kind":"action::set"}
TI:: [00:12:41.000] No new typings were requested as a result of typings discovery
Info 246  [00:12:42.000] Project '/dev/null/inferredProject1*' (Inferred)
Info 246  [00:12:43.000] 	Files (2)

Info 246  [00:12:44.000] -----------------------------------------------
Info 246  [00:12:45.000] Open files: 
Info 246  [00:12:46.000] 	FileName: /a/file1.ts ProjectRootPath: /a
Info 246  [00:12:47.000] 		Projects: /dev/null/inferredProject1*
Info 246  [00:12:48.000] 	FileName: /A/file2.ts ProjectRootPath: /A
Info 246  [00:12:49.000] 		Projects: /dev/null/inferredProject1*
Info 246  [00:12:50.000] response:
    {
      "responseRequired": false
    }
After request

Before request

Info 247  [00:12:51.000] request:
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
Info 248  [00:12:52.000] Search path: /b
Info 249  [00:12:53.000] For info: /b/file2.ts :: No config files found.
Info 250  [00:12:54.000] Starting updateGraphWorker: Project: /dev/null/inferredProject8*
Info 251  [00:12:55.000] FileWatcher:: Added:: WatchInfo: /a/lib/lib.esnext.full.d.ts 500 undefined Project: /dev/null/inferredProject8* WatchType: Missing file
Info 252  [00:12:56.000] DirectoryWatcher:: Added:: WatchInfo: /b/node_modules/@types 1 undefined Project: /dev/null/inferredProject8* WatchType: Type roots
Info 253  [00:12:57.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /b/node_modules/@types 1 undefined Project: /dev/null/inferredProject8* WatchType: Type roots
Info 254  [00:12:58.000] Finishing updateGraphWorker: Project: /dev/null/inferredProject8* Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 255  [00:12:59.000] Project '/dev/null/inferredProject8*' (Inferred)
Info 256  [00:13:00.000] 	Files (1)
	/b/file2.ts SVC-4-0 "let x = 3;"


	file2.ts
	  Root file specified for compilation

Info 257  [00:13:01.000] -----------------------------------------------
TI:: [00:13:02.000] Got install request {"projectName":"/dev/null/inferredProject8*","fileNames":["/b/file2.ts"],"compilerOptions":{"allowJs":true,"target":99,"allowNonTsExtensions":true,"noEmitForJsFiles":true,"maxNodeModuleJsDepth":2},"typeAcquisition":{"enable":true,"include":[],"exclude":[]},"unresolvedImports":[],"projectRootPath":"/b","cachePath":"/a/data/","kind":"discover"}
TI:: [00:13:03.000] Request specifies cache path '/a/data/', loading cached information...
TI:: [00:13:04.000] Processing cache location '/a/data/'
TI:: [00:13:05.000] Cache location was already processed...
TI:: [00:13:06.000] Explicitly included types: []
TI:: [00:13:07.000] Inferred typings from unresolved imports: []
TI:: [00:13:08.000] Result: {"cachedTypingPaths":[],"newTypingNames":[],"filesToWatch":["/b/bower_components","/b/node_modules"]}
TI:: [00:13:09.000] Finished typings discovery: {"cachedTypingPaths":[],"newTypingNames":[],"filesToWatch":["/b/bower_components","/b/node_modules"]}
TI:: [00:13:10.000] DirectoryWatcher:: Added:: WatchInfo: /b/bower_components
TI:: [00:13:11.000] DirectoryWatcher:: Added:: WatchInfo: /b/bower_components 1 undefined Project: /dev/null/inferredProject8* watcher already invoked: false
TI:: [00:13:12.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /b/bower_components 1 undefined Project: /dev/null/inferredProject8* watcher already invoked: false
TI:: [00:13:13.000] DirectoryWatcher:: Added:: WatchInfo: /b/node_modules
TI:: [00:13:14.000] DirectoryWatcher:: Added:: WatchInfo: /b/node_modules 1 undefined Project: /dev/null/inferredProject8* watcher already invoked: false
TI:: [00:13:15.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /b/node_modules 1 undefined Project: /dev/null/inferredProject8* watcher already invoked: false
TI:: [00:13:16.000] Sending response:
    {"projectName":"/dev/null/inferredProject8*","typeAcquisition":{"enable":true,"include":[],"exclude":[]},"compilerOptions":{"allowJs":true,"target":99,"allowNonTsExtensions":true,"noEmitForJsFiles":true,"maxNodeModuleJsDepth":2},"typings":[],"unresolvedImports":[],"kind":"action::set"}
TI:: [00:13:17.000] No new typings were requested as a result of typings discovery
Info 258  [00:13:18.000] Project '/dev/null/inferredProject1*' (Inferred)
Info 258  [00:13:19.000] 	Files (2)

Info 258  [00:13:20.000] -----------------------------------------------
Info 258  [00:13:21.000] Project '/dev/null/inferredProject8*' (Inferred)
Info 258  [00:13:22.000] 	Files (1)

Info 258  [00:13:23.000] -----------------------------------------------
Info 258  [00:13:24.000] Open files: 
Info 258  [00:13:25.000] 	FileName: /a/file1.ts ProjectRootPath: /a
Info 258  [00:13:26.000] 		Projects: /dev/null/inferredProject1*
Info 258  [00:13:27.000] 	FileName: /A/file2.ts ProjectRootPath: /A
Info 258  [00:13:28.000] 		Projects: /dev/null/inferredProject1*
Info 258  [00:13:29.000] 	FileName: /b/file2.ts ProjectRootPath: /b
Info 258  [00:13:30.000] 		Projects: /dev/null/inferredProject8*
Info 258  [00:13:31.000] response:
    {
      "responseRequired": false
    }
After request

PolledWatches::
/a/bower_components:
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
/a/lib/lib.es2017.full.d.ts:
  {"pollingInterval":500}
/a/node_modules/@types:
  {"pollingInterval":500}
/a/lib/lib.esnext.full.d.ts: *new*
  {"pollingInterval":500}
/b/node_modules/@types: *new*
  {"pollingInterval":500}

Before request

Info 259  [00:13:32.000] request:
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
Info 260  [00:13:33.000] Search path: /c
Info 261  [00:13:34.000] For info: /c/file3.ts :: No config files found.
Info 262  [00:13:35.000] Starting updateGraphWorker: Project: /dev/null/inferredProject9*
Info 263  [00:13:36.000] FileWatcher:: Added:: WatchInfo: /a/lib/lib.esnext.full.d.ts 500 undefined Project: /dev/null/inferredProject9* WatchType: Missing file
Info 264  [00:13:37.000] Finishing updateGraphWorker: Project: /dev/null/inferredProject9* Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 265  [00:13:38.000] Project '/dev/null/inferredProject9*' (Inferred)
Info 266  [00:13:39.000] 	Files (1)
	/c/file3.ts SVC-4-0 "let z = 4;"


	c/file3.ts
	  Root file specified for compilation

Info 267  [00:13:40.000] -----------------------------------------------
TI:: [00:13:41.000] Got install request {"projectName":"/dev/null/inferredProject9*","fileNames":["/c/file3.ts"],"compilerOptions":{"allowJs":true,"target":99,"allowNonTsExtensions":true,"noEmitForJsFiles":true,"maxNodeModuleJsDepth":2},"typeAcquisition":{"enable":true,"include":[],"exclude":[]},"unresolvedImports":[],"projectRootPath":"/","cachePath":"/a/data/","kind":"discover"}
TI:: [00:13:42.000] Request specifies cache path '/a/data/', loading cached information...
TI:: [00:13:43.000] Processing cache location '/a/data/'
TI:: [00:13:44.000] Cache location was already processed...
TI:: [00:13:45.000] Explicitly included types: []
TI:: [00:13:46.000] Inferred typings from unresolved imports: []
TI:: [00:13:47.000] Result: {"cachedTypingPaths":[],"newTypingNames":[],"filesToWatch":["/bower_components","/node_modules"]}
TI:: [00:13:48.000] Finished typings discovery: {"cachedTypingPaths":[],"newTypingNames":[],"filesToWatch":["/bower_components","/node_modules"]}
TI:: [00:13:49.000] DirectoryWatcher:: Added:: WatchInfo: /bower_components
TI:: [00:13:50.000] DirectoryWatcher:: Added:: WatchInfo: /bower_components 1 undefined Project: /dev/null/inferredProject9* watcher already invoked: false
TI:: [00:13:51.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /bower_components 1 undefined Project: /dev/null/inferredProject9* watcher already invoked: false
TI:: [00:13:52.000] DirectoryWatcher:: Added:: WatchInfo: /node_modules
TI:: [00:13:53.000] DirectoryWatcher:: Added:: WatchInfo: /node_modules 1 undefined Project: /dev/null/inferredProject9* watcher already invoked: false
TI:: [00:13:54.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /node_modules 1 undefined Project: /dev/null/inferredProject9* watcher already invoked: false
TI:: [00:13:55.000] Sending response:
    {"projectName":"/dev/null/inferredProject9*","typeAcquisition":{"enable":true,"include":[],"exclude":[]},"compilerOptions":{"allowJs":true,"target":99,"allowNonTsExtensions":true,"noEmitForJsFiles":true,"maxNodeModuleJsDepth":2},"typings":[],"unresolvedImports":[],"kind":"action::set"}
TI:: [00:13:56.000] No new typings were requested as a result of typings discovery
Info 268  [00:13:57.000] Project '/dev/null/inferredProject9*' (Inferred)
Info 268  [00:13:58.000] 	Files (1)

Info 268  [00:13:59.000] -----------------------------------------------
Info 268  [00:14:00.000] Project '/dev/null/inferredProject1*' (Inferred)
Info 268  [00:14:01.000] 	Files (2)

Info 268  [00:14:02.000] -----------------------------------------------
Info 268  [00:14:03.000] Project '/dev/null/inferredProject8*' (Inferred)
Info 268  [00:14:04.000] 	Files (1)

Info 268  [00:14:05.000] -----------------------------------------------
Info 268  [00:14:06.000] Open files: 
Info 268  [00:14:07.000] 	FileName: /a/file1.ts ProjectRootPath: /a
Info 268  [00:14:08.000] 		Projects: /dev/null/inferredProject1*
Info 268  [00:14:09.000] 	FileName: /A/file2.ts ProjectRootPath: /A
Info 268  [00:14:10.000] 		Projects: /dev/null/inferredProject1*
Info 268  [00:14:11.000] 	FileName: /b/file2.ts ProjectRootPath: /b
Info 268  [00:14:12.000] 		Projects: /dev/null/inferredProject8*
Info 268  [00:14:13.000] 	FileName: /c/file3.ts ProjectRootPath: undefined
Info 268  [00:14:14.000] 		Projects: /dev/null/inferredProject9*
Info 268  [00:14:15.000] response:
    {
      "responseRequired": false
    }
After request

Before request

Info 269  [00:14:16.000] request:
    {
      "command": "close",
      "arguments": {
        "file": "/a/file1.ts"
      },
      "seq": 32,
      "type": "request"
    }
Info 270  [00:14:17.000] FileWatcher:: Added:: WatchInfo: /a/file1.ts 500 undefined WatchType: Closed Script info
Info 271  [00:14:18.000] Project '/dev/null/inferredProject9*' (Inferred)
Info 271  [00:14:19.000] 	Files (1)

Info 271  [00:14:20.000] -----------------------------------------------
Info 271  [00:14:21.000] Project '/dev/null/inferredProject1*' (Inferred)
Info 271  [00:14:22.000] 	Files (2)

Info 271  [00:14:23.000] -----------------------------------------------
Info 271  [00:14:24.000] Project '/dev/null/inferredProject8*' (Inferred)
Info 271  [00:14:25.000] 	Files (1)

Info 271  [00:14:26.000] -----------------------------------------------
Info 271  [00:14:27.000] Open files: 
Info 271  [00:14:28.000] 	FileName: /A/file2.ts ProjectRootPath: /A
Info 271  [00:14:29.000] 		Projects: /dev/null/inferredProject1*
Info 271  [00:14:30.000] 	FileName: /b/file2.ts ProjectRootPath: /b
Info 271  [00:14:31.000] 		Projects: /dev/null/inferredProject8*
Info 271  [00:14:32.000] 	FileName: /c/file3.ts ProjectRootPath: undefined
Info 271  [00:14:33.000] 		Projects: /dev/null/inferredProject9*
Info 271  [00:14:34.000] response:
    {
      "responseRequired": false
    }
After request

PolledWatches::
/a/bower_components:
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
/a/lib/lib.es2017.full.d.ts:
  {"pollingInterval":500}
/a/node_modules/@types:
  {"pollingInterval":500}
/a/lib/lib.esnext.full.d.ts:
  {"pollingInterval":500}
/b/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/a/file1.ts: *new*
  {}

Before request

Info 272  [00:14:35.000] request:
    {
      "command": "close",
      "arguments": {
        "file": "/A/file2.ts"
      },
      "seq": 33,
      "type": "request"
    }
Info 273  [00:14:36.000] DirectoryWatcher:: Close:: WatchInfo: /a/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info 274  [00:14:37.000] Elapsed:: *ms DirectoryWatcher:: Close:: WatchInfo: /a/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info 275  [00:14:38.000] FileWatcher:: Added:: WatchInfo: /A/file2.ts 500 undefined WatchType: Closed Script info
Info 276  [00:14:39.000] Project '/dev/null/inferredProject9*' (Inferred)
Info 276  [00:14:40.000] 	Files (1)

Info 276  [00:14:41.000] -----------------------------------------------
Info 276  [00:14:42.000] Project '/dev/null/inferredProject1*' (Inferred)
Info 276  [00:14:43.000] 	Files (2)

Info 276  [00:14:44.000] -----------------------------------------------
Info 276  [00:14:45.000] Project '/dev/null/inferredProject8*' (Inferred)
Info 276  [00:14:46.000] 	Files (1)

Info 276  [00:14:47.000] -----------------------------------------------
Info 276  [00:14:48.000] Open files: 
Info 276  [00:14:49.000] 	FileName: /b/file2.ts ProjectRootPath: /b
Info 276  [00:14:50.000] 		Projects: /dev/null/inferredProject8*
Info 276  [00:14:51.000] 	FileName: /c/file3.ts ProjectRootPath: undefined
Info 276  [00:14:52.000] 		Projects: /dev/null/inferredProject9*
Info 276  [00:14:53.000] response:
    {
      "responseRequired": false
    }
After request

PolledWatches::
/a/bower_components:
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
/a/lib/lib.es2017.full.d.ts:
  {"pollingInterval":500}
/a/lib/lib.esnext.full.d.ts:
  {"pollingInterval":500}
/b/node_modules/@types:
  {"pollingInterval":500}

PolledWatches *deleted*::
/a/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/a/file1.ts:
  {}
/a/file2.ts: *new*
  {}

Before request

Info 277  [00:14:54.000] request:
    {
      "command": "close",
      "arguments": {
        "file": "/b/file2.ts"
      },
      "seq": 34,
      "type": "request"
    }
Info 278  [00:14:55.000] DirectoryWatcher:: Close:: WatchInfo: /b/node_modules/@types 1 undefined Project: /dev/null/inferredProject8* WatchType: Type roots
Info 279  [00:14:56.000] Elapsed:: *ms DirectoryWatcher:: Close:: WatchInfo: /b/node_modules/@types 1 undefined Project: /dev/null/inferredProject8* WatchType: Type roots
Info 280  [00:14:57.000] FileWatcher:: Added:: WatchInfo: /b/file2.ts 500 undefined WatchType: Closed Script info
Info 281  [00:14:58.000] Project '/dev/null/inferredProject9*' (Inferred)
Info 281  [00:14:59.000] 	Files (1)

Info 281  [00:15:00.000] -----------------------------------------------
Info 281  [00:15:01.000] Project '/dev/null/inferredProject1*' (Inferred)
Info 281  [00:15:02.000] 	Files (2)

Info 281  [00:15:03.000] -----------------------------------------------
Info 281  [00:15:04.000] Project '/dev/null/inferredProject8*' (Inferred)
Info 281  [00:15:05.000] 	Files (1)

Info 281  [00:15:06.000] -----------------------------------------------
Info 281  [00:15:07.000] Open files: 
Info 281  [00:15:08.000] 	FileName: /c/file3.ts ProjectRootPath: undefined
Info 281  [00:15:09.000] 		Projects: /dev/null/inferredProject9*
Info 281  [00:15:10.000] response:
    {
      "responseRequired": false
    }
After request

PolledWatches::
/a/bower_components:
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
/a/lib/lib.es2017.full.d.ts:
  {"pollingInterval":500}
/a/lib/lib.esnext.full.d.ts:
  {"pollingInterval":500}

PolledWatches *deleted*::
/b/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/a/file1.ts:
  {}
/a/file2.ts:
  {}
/b/file2.ts: *new*
  {}

Before request

Info 282  [00:15:11.000] request:
    {
      "command": "close",
      "arguments": {
        "file": "/c/file3.ts"
      },
      "seq": 35,
      "type": "request"
    }
Info 283  [00:15:12.000] FileWatcher:: Added:: WatchInfo: /c/file3.ts 500 undefined WatchType: Closed Script info
Info 284  [00:15:13.000] Project '/dev/null/inferredProject9*' (Inferred)
Info 284  [00:15:14.000] 	Files (1)

Info 284  [00:15:15.000] -----------------------------------------------
Info 284  [00:15:16.000] Project '/dev/null/inferredProject1*' (Inferred)
Info 284  [00:15:17.000] 	Files (2)

Info 284  [00:15:18.000] -----------------------------------------------
Info 284  [00:15:19.000] Project '/dev/null/inferredProject8*' (Inferred)
Info 284  [00:15:20.000] 	Files (1)

Info 284  [00:15:21.000] -----------------------------------------------
Info 284  [00:15:22.000] Open files: 
Info 284  [00:15:23.000] response:
    {
      "responseRequired": false
    }
After request

PolledWatches::
/a/bower_components:
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
/a/lib/lib.es2017.full.d.ts:
  {"pollingInterval":500}
/a/lib/lib.esnext.full.d.ts:
  {"pollingInterval":500}

FsWatches::
/a/file1.ts:
  {}
/a/file2.ts:
  {}
/b/file2.ts:
  {}
/c/file3.ts: *new*
  {}
