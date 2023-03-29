currentDirectory:: / useCaseSensitiveFileNames: false
Info 0    [00:00:15.000] Provided types map file "/typesMap.json" doesn't exist
Creating project service
//// [/a/b/app.js]

                    import * as a from "foo/a/a";
                    import * as b from "foo/a/b";
                    import * as c from "foo/a/c";
            import * as x from "fooo";

//// [/a/b/node_modules/fooo/index.d.ts]
export var x: string;


Info 1    [00:00:16.000] Search path: /a/b
Info 2    [00:00:17.000] For info: /a/b/app.js :: No config files found.
Info 3    [00:00:18.000] Starting updateGraphWorker: Project: /dev/null/inferredProject1*
Info 4    [00:00:19.000] DirectoryWatcher:: Added:: WatchInfo: /a/b/node_modules 1 undefined WatchType: node_modules for closed script infos and package.jsons affecting module specifier cache
Info 5    [00:00:20.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /a/b/node_modules 1 undefined WatchType: node_modules for closed script infos and package.jsons affecting module specifier cache
Info 6    [00:00:21.000] DirectoryWatcher:: Added:: WatchInfo: /a/b/node_modules 1 undefined Project: /dev/null/inferredProject1* WatchType: Failed Lookup Locations
Info 7    [00:00:22.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /a/b/node_modules 1 undefined Project: /dev/null/inferredProject1* WatchType: Failed Lookup Locations
Info 8    [00:00:23.000] FileWatcher:: Added:: WatchInfo: /a/lib/lib.d.ts 500 undefined Project: /dev/null/inferredProject1* WatchType: Missing file
Info 9    [00:00:24.000] DirectoryWatcher:: Added:: WatchInfo: /a/b/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info 10   [00:00:25.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /a/b/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info 11   [00:00:26.000] Finishing updateGraphWorker: Project: /dev/null/inferredProject1* Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 12   [00:00:27.000] Project '/dev/null/inferredProject1*' (Inferred)
Info 13   [00:00:28.000] 	Files (2)
	/a/b/node_modules/fooo/index.d.ts Text-1 "export var x: string;"
	/a/b/app.js SVC-1-0 "\n                    import * as a from \"foo/a/a\";\n                    import * as b from \"foo/a/b\";\n                    import * as c from \"foo/a/c\";\n            import * as x from \"fooo\";"


	node_modules/fooo/index.d.ts
	  Imported via "fooo" from file 'app.js'
	app.js
	  Root file specified for compilation

Info 14   [00:00:29.000] -----------------------------------------------
TI:: Creating typing installer

PolledWatches::
/a/lib/lib.d.ts: *new*
  {"pollingInterval":500}
/a/b/node_modules/@types: *new*
  {"pollingInterval":500}

FsWatchesRecursive::
/a/b/node_modules: *new*
  {}

TI:: [00:00:30.000] Global cache location '/tmp', safe file path '/safeList.json', types map path /typesMap.json
TI:: [00:00:31.000] Processing cache location '/tmp'
TI:: [00:00:32.000] Trying to find '/tmp/package.json'...
TI:: [00:00:33.000] Finished processing cache location '/tmp'
TI:: [00:00:34.000] Npm config file: /tmp/package.json
TI:: [00:00:35.000] Npm config file: '/tmp/package.json' is missing, creating new one...
TI:: [00:00:40.000] Updating types-registry npm package...
TI:: [00:00:41.000] npm install --ignore-scripts types-registry@latest
TI:: [00:00:48.000] TI:: Updated types-registry npm package
TI:: typing installer creation complete
//// [/tmp/package.json]
{ "private": true }

//// [/tmp/node_modules/types-registry/index.json]
{
 "entries": {
  "foo": {
   "latest": "1.3.0",
   "ts2.0": "1.0.0",
   "ts2.1": "1.0.0",
   "ts2.2": "1.2.0",
   "ts2.3": "1.3.0",
   "ts2.4": "1.3.0",
   "ts2.5": "1.3.0",
   "ts2.6": "1.3.0",
   "ts2.7": "1.3.0"
  }
 }
}


TI:: [00:00:49.000] Got install request {"projectName":"/dev/null/inferredProject1*","fileNames":["/a/b/app.js"],"compilerOptions":{"target":1,"jsx":1,"allowNonTsExtensions":true,"allowJs":true,"noEmitForJsFiles":true,"maxNodeModuleJsDepth":2},"typeAcquisition":{"enable":true,"include":[],"exclude":[]},"unresolvedImports":["foo"],"projectRootPath":"/a/b","cachePath":"/tmp","kind":"discover"}
TI:: [00:00:50.000] Request specifies cache path '/tmp', loading cached information...
TI:: [00:00:51.000] Processing cache location '/tmp'
TI:: [00:00:52.000] Cache location was already processed...
TI:: [00:00:53.000] Failed to load safelist from types map file '/typesMap.json'
TI:: [00:00:54.000] Explicitly included types: []
TI:: [00:00:55.000] Searching for typing names in /a/b/node_modules; all files: []
TI:: [00:00:56.000]     Found package names: []
TI:: [00:00:57.000] Inferred typings from unresolved imports: ["foo"]
TI:: [00:00:58.000] Result: {"cachedTypingPaths":[],"newTypingNames":["foo"],"filesToWatch":["/a/b/bower_components","/a/b/node_modules"]}
TI:: [00:00:59.000] Finished typings discovery: {"cachedTypingPaths":[],"newTypingNames":["foo"],"filesToWatch":["/a/b/bower_components","/a/b/node_modules"]}
TI:: [00:01:00.000] DirectoryWatcher:: Added:: WatchInfo: /a/b/bower_components
TI:: [00:01:01.000] DirectoryWatcher:: Added:: WatchInfo: /a/b/bower_components 1 undefined Project: /dev/null/inferredProject1* watcher already invoked: false
TI:: [00:01:02.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /a/b/bower_components 1 undefined Project: /dev/null/inferredProject1* watcher already invoked: false
TI:: [00:01:03.000] DirectoryWatcher:: Added:: WatchInfo: /a/b/node_modules
TI:: [00:01:04.000] DirectoryWatcher:: Added:: WatchInfo: /a/b/node_modules 1 undefined Project: /dev/null/inferredProject1* watcher already invoked: false
TI:: [00:01:05.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /a/b/node_modules 1 undefined Project: /dev/null/inferredProject1* watcher already invoked: false
TI:: [00:01:06.000] Installing typings ["foo"]
TI:: [00:01:07.000] Npm config file: /tmp/package.json
TI:: [00:01:08.000] Sending response:
    {"kind":"event::beginInstallTypes","eventId":1,"typingsInstallerVersion":"FakeVersion","projectName":"/dev/null/inferredProject1*"}
TI:: [00:01:09.000] #1 with arguments'["@types/foo@tsFakeMajor.Minor"]'.
Info 15   [00:01:10.000] Project '/dev/null/inferredProject1*' (Inferred)
Info 15   [00:01:11.000] 	Files (2)

Info 15   [00:01:12.000] -----------------------------------------------
Info 15   [00:01:13.000] Open files: 
Info 15   [00:01:14.000] 	FileName: /a/b/app.js ProjectRootPath: undefined
Info 15   [00:01:15.000] 		Projects: /dev/null/inferredProject1*
TI:: [00:01:16.000] #1 with arguments'["@types/foo@tsFakeMajor.Minor"]':: true
TI:: Before installWorker

PolledWatches::
/a/lib/lib.d.ts:
  {"pollingInterval":500}
/a/b/node_modules/@types:
  {"pollingInterval":500}
/a/b/bower_components: *new*
  {"pollingInterval":500}

FsWatchesRecursive::
/a/b/node_modules:
  {}

TI:: After installWorker
//// [/tmp/node_modules/foo/index.d.ts]
export function aa(): void;

//// [/tmp/node_modules/foo/a/a.d.ts]
export function a (): void;

//// [/tmp/node_modules/foo/a/b.d.ts]
export function b (): void;

//// [/tmp/node_modules/foo/a/c.d.ts]
export function c (): void;


TI:: [00:01:29.000] Installed typings ["@types/foo@tsFakeMajor.Minor"]
TI:: [00:01:30.000] Installed typing files ["/tmp/node_modules/foo/index.d.ts"]
TI:: [00:01:31.000] Sending response:
    {"projectName":"/dev/null/inferredProject1*","typeAcquisition":{"enable":true,"include":[],"exclude":[]},"compilerOptions":{"target":1,"jsx":1,"allowNonTsExtensions":true,"allowJs":true,"noEmitForJsFiles":true,"maxNodeModuleJsDepth":2},"typings":["/tmp/node_modules/foo/index.d.ts"],"unresolvedImports":["foo"],"kind":"action::set"}
Info 15   [00:01:32.000] Scheduled: /dev/null/inferredProject1*
Info 16   [00:01:33.000] Scheduled: *ensureProjectForOpenFiles*
TI:: [00:01:34.000] Sending response:
    {"kind":"event::endInstallTypes","eventId":1,"projectName":"/dev/null/inferredProject1*","packagesToInstall":["@types/foo@tsFakeMajor.Minor"],"installSuccess":true,"typingsInstallerVersion":"FakeVersion"}
Before running Timeout callback:: count: 2
1: /dev/null/inferredProject1*
2: *ensureProjectForOpenFiles*

Info 17   [00:01:35.000] Running: /dev/null/inferredProject1*
Info 18   [00:01:36.000] Starting updateGraphWorker: Project: /dev/null/inferredProject1*
Info 19   [00:01:37.000] Finishing updateGraphWorker: Project: /dev/null/inferredProject1* Version: 2 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 20   [00:01:38.000] Project '/dev/null/inferredProject1*' (Inferred)
Info 21   [00:01:39.000] 	Files (6)
	/tmp/node_modules/foo/a/a.d.ts Text-1 "export function a (): void;"
	/tmp/node_modules/foo/a/b.d.ts Text-1 "export function b (): void;"
	/tmp/node_modules/foo/a/c.d.ts Text-1 "export function c (): void;"
	/a/b/node_modules/fooo/index.d.ts Text-1 "export var x: string;"
	/a/b/app.js SVC-1-0 "\n                    import * as a from \"foo/a/a\";\n                    import * as b from \"foo/a/b\";\n                    import * as c from \"foo/a/c\";\n            import * as x from \"fooo\";"
	/tmp/node_modules/foo/index.d.ts Text-1 "export function aa(): void;"


	../../tmp/node_modules/foo/a/a.d.ts
	  Imported via "foo/a/a" from file 'app.js'
	../../tmp/node_modules/foo/a/b.d.ts
	  Imported via "foo/a/b" from file 'app.js'
	../../tmp/node_modules/foo/a/c.d.ts
	  Imported via "foo/a/c" from file 'app.js'
	node_modules/fooo/index.d.ts
	  Imported via "fooo" from file 'app.js'
	app.js
	  Root file specified for compilation
	../../tmp/node_modules/foo/index.d.ts
	  Root file specified for compilation

Info 22   [00:01:40.000] -----------------------------------------------
TI:: [00:01:41.000] Got install request {"projectName":"/dev/null/inferredProject1*","fileNames":["/a/b/app.js","/tmp/node_modules/foo/index.d.ts"],"compilerOptions":{"target":1,"jsx":1,"allowNonTsExtensions":true,"allowJs":true,"noEmitForJsFiles":true,"maxNodeModuleJsDepth":2},"typeAcquisition":{"enable":true,"include":[],"exclude":[]},"unresolvedImports":[],"projectRootPath":"/a/b","cachePath":"/tmp","kind":"discover"}
TI:: [00:01:42.000] Request specifies cache path '/tmp', loading cached information...
TI:: [00:01:43.000] Processing cache location '/tmp'
TI:: [00:01:44.000] Cache location was already processed...
TI:: [00:01:45.000] Explicitly included types: []
TI:: [00:01:46.000] Searching for typing names in /a/b/node_modules; all files: []
TI:: [00:01:47.000]     Found package names: []
TI:: [00:01:48.000] Inferred typings from unresolved imports: []
TI:: [00:01:49.000] Result: {"cachedTypingPaths":[],"newTypingNames":[],"filesToWatch":["/a/b/bower_components","/a/b/node_modules"]}
TI:: [00:01:50.000] Finished typings discovery: {"cachedTypingPaths":[],"newTypingNames":[],"filesToWatch":["/a/b/bower_components","/a/b/node_modules"]}
TI:: [00:01:51.000] Sending response:
    {"projectName":"/dev/null/inferredProject1*","typeAcquisition":{"enable":true,"include":[],"exclude":[]},"compilerOptions":{"target":1,"jsx":1,"allowNonTsExtensions":true,"allowJs":true,"noEmitForJsFiles":true,"maxNodeModuleJsDepth":2},"typings":[],"unresolvedImports":[],"kind":"action::set"}
Info 23   [00:01:52.000] Scheduled: /dev/null/inferredProject1*
Info 24   [00:01:53.000] Scheduled: *ensureProjectForOpenFiles*, Cancelled earlier one
TI:: [00:01:54.000] No new typings were requested as a result of typings discovery
After running Timeout callback:: count: 2
3: /dev/null/inferredProject1*
4: *ensureProjectForOpenFiles*

Info 25   [00:01:55.000] Starting updateGraphWorker: Project: /dev/null/inferredProject1*
Info 26   [00:01:56.000] Finishing updateGraphWorker: Project: /dev/null/inferredProject1* Version: 3 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 27   [00:01:57.000] Project '/dev/null/inferredProject1*' (Inferred)
Info 28   [00:01:58.000] 	Files (5)
	/tmp/node_modules/foo/a/a.d.ts Text-1 "export function a (): void;"
	/tmp/node_modules/foo/a/b.d.ts Text-1 "export function b (): void;"
	/tmp/node_modules/foo/a/c.d.ts Text-1 "export function c (): void;"
	/a/b/node_modules/fooo/index.d.ts Text-1 "export var x: string;"
	/a/b/app.js SVC-1-0 "\n                    import * as a from \"foo/a/a\";\n                    import * as b from \"foo/a/b\";\n                    import * as c from \"foo/a/c\";\n            import * as x from \"fooo\";"


	../../tmp/node_modules/foo/a/a.d.ts
	  Imported via "foo/a/a" from file 'app.js'
	../../tmp/node_modules/foo/a/b.d.ts
	  Imported via "foo/a/b" from file 'app.js'
	../../tmp/node_modules/foo/a/c.d.ts
	  Imported via "foo/a/c" from file 'app.js'
	node_modules/fooo/index.d.ts
	  Imported via "fooo" from file 'app.js'
	app.js
	  Root file specified for compilation

Info 29   [00:01:59.000] -----------------------------------------------
TI:: [00:02:00.000] Got install request {"projectName":"/dev/null/inferredProject1*","fileNames":["/a/b/app.js"],"compilerOptions":{"target":1,"jsx":1,"allowNonTsExtensions":true,"allowJs":true,"noEmitForJsFiles":true,"maxNodeModuleJsDepth":2},"typeAcquisition":{"enable":true,"include":[],"exclude":[]},"unresolvedImports":[],"projectRootPath":"/a/b","cachePath":"/tmp","kind":"discover"}
TI:: [00:02:01.000] Request specifies cache path '/tmp', loading cached information...
TI:: [00:02:02.000] Processing cache location '/tmp'
TI:: [00:02:03.000] Cache location was already processed...
TI:: [00:02:04.000] Explicitly included types: []
TI:: [00:02:05.000] Searching for typing names in /a/b/node_modules; all files: []
TI:: [00:02:06.000]     Found package names: []
TI:: [00:02:07.000] Inferred typings from unresolved imports: []
TI:: [00:02:08.000] Result: {"cachedTypingPaths":[],"newTypingNames":[],"filesToWatch":["/a/b/bower_components","/a/b/node_modules"]}
TI:: [00:02:09.000] Finished typings discovery: {"cachedTypingPaths":[],"newTypingNames":[],"filesToWatch":["/a/b/bower_components","/a/b/node_modules"]}
TI:: [00:02:10.000] Sending response:
    {"projectName":"/dev/null/inferredProject1*","typeAcquisition":{"enable":true,"include":[],"exclude":[]},"compilerOptions":{"target":1,"jsx":1,"allowNonTsExtensions":true,"allowJs":true,"noEmitForJsFiles":true,"maxNodeModuleJsDepth":2},"typings":[],"unresolvedImports":[],"kind":"action::set"}
TI:: [00:02:11.000] No new typings were requested as a result of typings discovery
Before running Timeout callback:: count: 2
3: /dev/null/inferredProject1*
4: *ensureProjectForOpenFiles*

Info 30   [00:02:12.000] Running: /dev/null/inferredProject1*
Info 31   [00:02:13.000] Starting updateGraphWorker: Project: /dev/null/inferredProject1*
Info 32   [00:02:14.000] Finishing updateGraphWorker: Project: /dev/null/inferredProject1* Version: 4 structureChanged: true structureIsReused:: SafeModules Elapsed:: *ms
Info 33   [00:02:15.000] Project '/dev/null/inferredProject1*' (Inferred)
Info 34   [00:02:16.000] 	Files (5)
	/tmp/node_modules/foo/a/a.d.ts Text-1 "export function a (): void;"
	/tmp/node_modules/foo/a/b.d.ts Text-1 "export function b (): void;"
	/tmp/node_modules/foo/a/c.d.ts Text-1 "export function c (): void;"
	/a/b/node_modules/fooo/index.d.ts Text-1 "export var x: string;"
	/a/b/app.js SVC-1-1 "import * as bar from \"bar\";\n                    import * as a from \"foo/a/a\";\n                    import * as b from \"foo/a/b\";\n                    import * as c from \"foo/a/c\";\n            import * as x from \"fooo\";"

Info 35   [00:02:17.000] -----------------------------------------------
TI:: [00:02:18.000] Got install request {"projectName":"/dev/null/inferredProject1*","fileNames":["/a/b/app.js"],"compilerOptions":{"target":1,"jsx":1,"allowNonTsExtensions":true,"allowJs":true,"noEmitForJsFiles":true,"maxNodeModuleJsDepth":2},"typeAcquisition":{"enable":true,"include":[],"exclude":[]},"unresolvedImports":["bar"],"projectRootPath":"/a/b","cachePath":"/tmp","kind":"discover"}
TI:: [00:02:19.000] Request specifies cache path '/tmp', loading cached information...
TI:: [00:02:20.000] Processing cache location '/tmp'
TI:: [00:02:21.000] Cache location was already processed...
TI:: [00:02:22.000] Explicitly included types: []
TI:: [00:02:23.000] Searching for typing names in /a/b/node_modules; all files: []
TI:: [00:02:24.000]     Found package names: []
TI:: [00:02:25.000] Inferred typings from unresolved imports: ["bar"]
TI:: [00:02:26.000] Result: {"cachedTypingPaths":[],"newTypingNames":["bar"],"filesToWatch":["/a/b/bower_components","/a/b/node_modules"]}
TI:: [00:02:27.000] Finished typings discovery: {"cachedTypingPaths":[],"newTypingNames":["bar"],"filesToWatch":["/a/b/bower_components","/a/b/node_modules"]}
TI:: [00:02:28.000] Installing typings ["bar"]
TI:: [00:02:29.000] 'bar':: Entry for package 'bar' does not exist in local types registry - skipping...
TI:: [00:02:30.000] All typings are known to be missing or invalid - no need to install more typings
TI:: [00:02:31.000] Sending response:
    {"projectName":"/dev/null/inferredProject1*","typeAcquisition":{"enable":true,"include":[],"exclude":[]},"compilerOptions":{"target":1,"jsx":1,"allowNonTsExtensions":true,"allowJs":true,"noEmitForJsFiles":true,"maxNodeModuleJsDepth":2},"typings":[],"unresolvedImports":["bar"],"kind":"action::set"}
Info 36   [00:02:32.000] Running: *ensureProjectForOpenFiles*
Info 37   [00:02:33.000] Before ensureProjectForOpenFiles:
Info 38   [00:02:34.000] Project '/dev/null/inferredProject1*' (Inferred)
Info 38   [00:02:35.000] 	Files (5)

Info 38   [00:02:36.000] -----------------------------------------------
Info 38   [00:02:37.000] Open files: 
Info 38   [00:02:38.000] 	FileName: /a/b/app.js ProjectRootPath: undefined
Info 38   [00:02:39.000] 		Projects: /dev/null/inferredProject1*
Info 38   [00:02:40.000] After ensureProjectForOpenFiles:
Info 39   [00:02:41.000] Project '/dev/null/inferredProject1*' (Inferred)
Info 39   [00:02:42.000] 	Files (5)

Info 39   [00:02:43.000] -----------------------------------------------
Info 39   [00:02:44.000] Open files: 
Info 39   [00:02:45.000] 	FileName: /a/b/app.js ProjectRootPath: undefined
Info 39   [00:02:46.000] 		Projects: /dev/null/inferredProject1*
After running Timeout callback:: count: 0

Timeout callback:: count: 0
Immedidate callback:: count: 0
