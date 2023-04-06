currentDirectory:: / useCaseSensitiveFileNames: false
Info 0    [00:00:17.000] Provided types map file "/a/lib/typesMap.json" doesn't exist
Before request
//// [/a/file1.ts]
let x = 1;

//// [/a/file2.ts]
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
        "projectRootPath": "/b"
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
Info 9    [00:00:26.000] FileWatcher:: Added:: WatchInfo: /a/lib/lib.esnext.full.d.ts 500 undefined Project: /dev/null/inferredProject1* WatchType: Missing file
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
/a/lib/lib.esnext.full.d.ts: *new*
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


TI:: [00:00:52.000] Got install request {"projectName":"/dev/null/inferredProject1*","fileNames":["/a/file1.ts"],"compilerOptions":{"allowJs":true,"target":99,"allowNonTsExtensions":true,"noEmitForJsFiles":true,"maxNodeModuleJsDepth":2},"typeAcquisition":{"enable":true,"include":[],"exclude":[]},"unresolvedImports":[],"projectRootPath":"/a","cachePath":"/a/data/","kind":"discover"}
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
    {"projectName":"/dev/null/inferredProject1*","typeAcquisition":{"enable":true,"include":[],"exclude":[]},"compilerOptions":{"allowJs":true,"target":99,"allowNonTsExtensions":true,"noEmitForJsFiles":true,"maxNodeModuleJsDepth":2},"typings":[],"unresolvedImports":[],"kind":"action::set"}
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
/a/lib/lib.esnext.full.d.ts:
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
        "file": "/a/file2.ts",
        "projectRootPath": "/a",
        "fileContent": "let y = 2;",
        "scriptKindName": "JS"
      },
      "seq": 4,
      "type": "request"
    }
Info 18   [00:01:17.000] Search path: /a
Info 19   [00:01:18.000] For info: /a/file2.ts :: No config files found.
Info 20   [00:01:19.000] Starting updateGraphWorker: Project: /dev/null/inferredProject1*
Info 21   [00:01:20.000] Finishing updateGraphWorker: Project: /dev/null/inferredProject1* Version: 2 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 22   [00:01:21.000] Project '/dev/null/inferredProject1*' (Inferred)
Info 23   [00:01:22.000] 	Files (2)
	/a/file1.ts SVC-1-0 "let x = 1;"
	/a/file2.ts SVC-1-0 "let y = 2;"


	file1.ts
	  Root file specified for compilation
	file2.ts
	  Root file specified for compilation

Info 24   [00:01:23.000] -----------------------------------------------
TI:: [00:01:24.000] Got install request {"projectName":"/dev/null/inferredProject1*","fileNames":["/a/file1.ts","/a/file2.ts"],"compilerOptions":{"allowJs":true,"target":99,"allowNonTsExtensions":true,"noEmitForJsFiles":true,"maxNodeModuleJsDepth":2},"typeAcquisition":{"enable":true,"include":[],"exclude":[]},"unresolvedImports":[],"projectRootPath":"/a","cachePath":"/a/data/","kind":"discover"}
TI:: [00:01:25.000] Request specifies cache path '/a/data/', loading cached information...
TI:: [00:01:26.000] Processing cache location '/a/data/'
TI:: [00:01:27.000] Cache location was already processed...
TI:: [00:01:28.000] Explicitly included types: []
TI:: [00:01:29.000] Inferred typings from unresolved imports: []
TI:: [00:01:30.000] Result: {"cachedTypingPaths":[],"newTypingNames":[],"filesToWatch":["/a/bower_components","/a/node_modules"]}
TI:: [00:01:31.000] Finished typings discovery: {"cachedTypingPaths":[],"newTypingNames":[],"filesToWatch":["/a/bower_components","/a/node_modules"]}
TI:: [00:01:32.000] Sending response:
    {"projectName":"/dev/null/inferredProject1*","typeAcquisition":{"enable":true,"include":[],"exclude":[]},"compilerOptions":{"allowJs":true,"target":99,"allowNonTsExtensions":true,"noEmitForJsFiles":true,"maxNodeModuleJsDepth":2},"typings":[],"unresolvedImports":[],"kind":"action::set"}
TI:: [00:01:33.000] No new typings were requested as a result of typings discovery
Info 25   [00:01:34.000] Project '/dev/null/inferredProject1*' (Inferred)
Info 25   [00:01:35.000] 	Files (2)

Info 25   [00:01:36.000] -----------------------------------------------
Info 25   [00:01:37.000] Open files: 
Info 25   [00:01:38.000] 	FileName: /a/file1.ts ProjectRootPath: /a
Info 25   [00:01:39.000] 		Projects: /dev/null/inferredProject1*
Info 25   [00:01:40.000] 	FileName: /a/file2.ts ProjectRootPath: /a
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
Info 30   [00:01:47.000] FileWatcher:: Added:: WatchInfo: /a/lib/lib.es6.d.ts 500 undefined Project: /dev/null/inferredProject2* WatchType: Missing file
Info 31   [00:01:48.000] DirectoryWatcher:: Added:: WatchInfo: /b/node_modules/@types 1 undefined Project: /dev/null/inferredProject2* WatchType: Type roots
Info 32   [00:01:49.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /b/node_modules/@types 1 undefined Project: /dev/null/inferredProject2* WatchType: Type roots
Info 33   [00:01:50.000] Finishing updateGraphWorker: Project: /dev/null/inferredProject2* Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 34   [00:01:51.000] Project '/dev/null/inferredProject2*' (Inferred)
Info 35   [00:01:52.000] 	Files (1)
	/b/file2.ts SVC-1-0 "let x = 3;"


	file2.ts
	  Root file specified for compilation

Info 36   [00:01:53.000] -----------------------------------------------
TI:: [00:01:54.000] Got install request {"projectName":"/dev/null/inferredProject2*","fileNames":["/b/file2.ts"],"compilerOptions":{"allowJs":true,"target":2,"allowNonTsExtensions":true,"noEmitForJsFiles":true,"maxNodeModuleJsDepth":2},"typeAcquisition":{"enable":true,"include":[],"exclude":[]},"unresolvedImports":[],"projectRootPath":"/b","cachePath":"/a/data/","kind":"discover"}
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
    {"projectName":"/dev/null/inferredProject2*","typeAcquisition":{"enable":true,"include":[],"exclude":[]},"compilerOptions":{"allowJs":true,"target":2,"allowNonTsExtensions":true,"noEmitForJsFiles":true,"maxNodeModuleJsDepth":2},"typings":[],"unresolvedImports":[],"kind":"action::set"}
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
Info 37   [00:02:19.000] 	FileName: /a/file2.ts ProjectRootPath: /a
Info 37   [00:02:20.000] 		Projects: /dev/null/inferredProject1*
Info 37   [00:02:21.000] 	FileName: /b/file2.ts ProjectRootPath: /b
Info 37   [00:02:22.000] 		Projects: /dev/null/inferredProject2*
Info 37   [00:02:23.000] response:
    {
      "responseRequired": false
    }
After request

PolledWatches::
/a/lib/lib.esnext.full.d.ts:
  {"pollingInterval":500}
/a/node_modules/@types:
  {"pollingInterval":500}
/a/bower_components:
  {"pollingInterval":500}
/a/node_modules:
  {"pollingInterval":500}
/a/lib/lib.es6.d.ts: *new*
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
Info 47   [00:03:01.000] 	FileName: /a/file2.ts ProjectRootPath: /a
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
/a/lib/lib.esnext.full.d.ts:
  {"pollingInterval":500}
/a/node_modules/@types:
  {"pollingInterval":500}
/a/bower_components:
  {"pollingInterval":500}
/a/node_modules:
  {"pollingInterval":500}
/a/lib/lib.es6.d.ts:
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
