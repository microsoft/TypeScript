Info 0    [00:00:13.000] Provided types map file "/typesMap.json" doesn't exist
Creating project service
//// [/a/b/app.js]
// @ts-check

const net = require("net");
const stream = require("stream");

//// [/a/lib/lib.d.ts]
/// <reference no-default-lib="true"/>
interface Boolean {}
interface Function {}
interface CallableFunction {}
interface NewableFunction {}
interface IArguments {}
interface Number { toExponential: any; }
interface Object {}
interface RegExp {}
interface String { charAt: any; }
interface Array<T> { length: number; [n: number]: T; }


Info 1    [00:00:14.000] Search path: /a/b
Info 2    [00:00:15.000] For info: /a/b/app.js :: No config files found.
Info 3    [00:00:16.000] Starting updateGraphWorker: Project: /dev/null/inferredProject1*
Info 4    [00:00:17.000] FileWatcher:: Added:: WatchInfo: /a/lib/lib.d.ts 500 undefined WatchType: Closed Script info
Info 5    [00:00:18.000] DirectoryWatcher:: Added:: WatchInfo: /a/b/node_modules 1 undefined Project: /dev/null/inferredProject1* WatchType: Failed Lookup Locations
Info 6    [00:00:19.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /a/b/node_modules 1 undefined Project: /dev/null/inferredProject1* WatchType: Failed Lookup Locations
Info 7    [00:00:20.000] DirectoryWatcher:: Added:: WatchInfo: /a/b/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info 8    [00:00:21.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /a/b/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info 9    [00:00:22.000] Finishing updateGraphWorker: Project: /dev/null/inferredProject1* Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 10   [00:00:23.000] Project '/dev/null/inferredProject1*' (Inferred)
Info 11   [00:00:24.000] 	Files (2)
	/a/lib/lib.d.ts Text-1 "/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }"
	/a/b/app.js SVC-1-0 "// @ts-check\n\nconst net = require(\"net\");\nconst stream = require(\"stream\");"


	../lib/lib.d.ts
	  Default library for target 'es5'
	app.js
	  Root file specified for compilation

Info 12   [00:00:25.000] -----------------------------------------------
TI:: Creating typing installer

PolledWatches::
/a/b/node_modules: *new*
  {"pollingInterval":500}
/a/b/node_modules/@types: *new*
  {"pollingInterval":500}

FsWatches::
/a/lib/lib.d.ts: *new*
  {}

TI:: [00:00:26.000] Global cache location '/tmp', safe file path '/safeList.json', types map path /typesMap.json
TI:: [00:00:27.000] Processing cache location '/tmp'
TI:: [00:00:28.000] Trying to find '/tmp/package.json'...
TI:: [00:00:29.000] Finished processing cache location '/tmp'
TI:: [00:00:30.000] Npm config file: /tmp/package.json
TI:: [00:00:31.000] Npm config file: '/tmp/package.json' is missing, creating new one...
TI:: [00:00:36.000] Updating types-registry npm package...
TI:: [00:00:37.000] npm install --ignore-scripts types-registry@latest
TI:: [00:00:44.000] TI:: Updated types-registry npm package
TI:: typing installer creation complete
//// [/tmp/package.json]
{ "private": true }

//// [/tmp/node_modules/types-registry/index.json]
{
 "entries": {
  "node": {
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


TI:: [00:00:45.000] Got install request {"projectName":"/dev/null/inferredProject1*","fileNames":["/a/lib/lib.d.ts","/a/b/app.js"],"compilerOptions":{"target":1,"jsx":1,"allowNonTsExtensions":true,"allowJs":true,"noEmitForJsFiles":true,"maxNodeModuleJsDepth":2},"typeAcquisition":{"enable":true,"include":[],"exclude":[]},"unresolvedImports":["net","stream"],"projectRootPath":"/a/b","cachePath":"/tmp","kind":"discover"}
TI:: [00:00:46.000] Request specifies cache path '/tmp', loading cached information...
TI:: [00:00:47.000] Processing cache location '/tmp'
TI:: [00:00:48.000] Cache location was already processed...
TI:: [00:00:49.000] Failed to load safelist from types map file '/typesMap.json'
TI:: [00:00:50.000] Explicitly included types: []
TI:: [00:00:51.000] Inferred typings from unresolved imports: ["node"]
TI:: [00:00:52.000] Result: {"cachedTypingPaths":[],"newTypingNames":["node"],"filesToWatch":["/a/b/bower_components","/a/b/node_modules"]}
TI:: [00:00:53.000] Finished typings discovery: {"cachedTypingPaths":[],"newTypingNames":["node"],"filesToWatch":["/a/b/bower_components","/a/b/node_modules"]}
TI:: [00:00:54.000] DirectoryWatcher:: Added:: WatchInfo: /a/b/bower_components
TI:: [00:00:55.000] DirectoryWatcher:: Added:: WatchInfo: /a/b/bower_components 1 undefined Project: /dev/null/inferredProject1* watcher already invoked: false
TI:: [00:00:56.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /a/b/bower_components 1 undefined Project: /dev/null/inferredProject1* watcher already invoked: false
TI:: [00:00:57.000] DirectoryWatcher:: Added:: WatchInfo: /a/b/node_modules
TI:: [00:00:58.000] DirectoryWatcher:: Added:: WatchInfo: /a/b/node_modules 1 undefined Project: /dev/null/inferredProject1* watcher already invoked: false
TI:: [00:00:59.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /a/b/node_modules 1 undefined Project: /dev/null/inferredProject1* watcher already invoked: false
TI:: [00:01:00.000] Installing typings ["node"]
TI:: [00:01:01.000] Npm config file: /tmp/package.json
TI:: [00:01:02.000] Sending response:
    {"kind":"event::beginInstallTypes","eventId":1,"typingsInstallerVersion":"FakeVersion","projectName":"/dev/null/inferredProject1*"}
TI:: [00:01:03.000] #1 with arguments'["@types/node@tsFakeMajor.Minor"]'.
Info 13   [00:01:04.000] Project '/dev/null/inferredProject1*' (Inferred)
Info 13   [00:01:05.000] 	Files (2)

Info 13   [00:01:06.000] -----------------------------------------------
Info 13   [00:01:07.000] Open files: 
Info 13   [00:01:08.000] 	FileName: /a/b/app.js ProjectRootPath: undefined
Info 13   [00:01:09.000] 		Projects: /dev/null/inferredProject1*
TI:: [00:01:10.000] #1 with arguments'["@types/node@tsFakeMajor.Minor"]':: true
TI:: Before installWorker

PolledWatches::
/a/b/node_modules:
  {"pollingInterval":500}
/a/b/node_modules/@types:
  {"pollingInterval":500}
/a/b/bower_components: *new*
  {"pollingInterval":500}

FsWatches::
/a/lib/lib.d.ts:
  {}

TI:: After installWorker
//// [/tmp/node_modules/node/index.d.ts]

declare module "net" {
    export type n = number;
}
declare module "stream" {
    export type s = string;
}


TI:: [00:01:15.000] Installed typings ["@types/node@tsFakeMajor.Minor"]
TI:: [00:01:16.000] Installed typing files ["/tmp/node_modules/node/index.d.ts"]
TI:: [00:01:17.000] Sending response:
    {"projectName":"/dev/null/inferredProject1*","typeAcquisition":{"enable":true,"include":[],"exclude":[]},"compilerOptions":{"target":1,"jsx":1,"allowNonTsExtensions":true,"allowJs":true,"noEmitForJsFiles":true,"maxNodeModuleJsDepth":2},"typings":["/tmp/node_modules/node/index.d.ts"],"unresolvedImports":["net","stream"],"kind":"action::set"}
Info 13   [00:01:18.000] Scheduled: /dev/null/inferredProject1*
Info 14   [00:01:19.000] Scheduled: *ensureProjectForOpenFiles*
TI:: [00:01:20.000] Sending response:
    {"kind":"event::endInstallTypes","eventId":1,"projectName":"/dev/null/inferredProject1*","packagesToInstall":["@types/node@tsFakeMajor.Minor"],"installSuccess":true,"typingsInstallerVersion":"FakeVersion"}
Before checking timeout queue length (2) and running

Info 15   [00:01:21.000] Running: /dev/null/inferredProject1*
Info 16   [00:01:22.000] Starting updateGraphWorker: Project: /dev/null/inferredProject1*
Info 17   [00:01:23.000] DirectoryWatcher:: Close:: WatchInfo: /a/b/node_modules 1 undefined Project: /dev/null/inferredProject1* WatchType: Failed Lookup Locations
Info 18   [00:01:24.000] Elapsed:: *ms DirectoryWatcher:: Close:: WatchInfo: /a/b/node_modules 1 undefined Project: /dev/null/inferredProject1* WatchType: Failed Lookup Locations
Info 19   [00:01:25.000] Finishing updateGraphWorker: Project: /dev/null/inferredProject1* Version: 2 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 20   [00:01:26.000] Project '/dev/null/inferredProject1*' (Inferred)
Info 21   [00:01:27.000] 	Files (3)
	/a/lib/lib.d.ts Text-1 "/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }"
	/tmp/node_modules/node/index.d.ts Text-1 "\ndeclare module \"net\" {\n    export type n = number;\n}\ndeclare module \"stream\" {\n    export type s = string;\n}"
	/a/b/app.js SVC-1-0 "// @ts-check\n\nconst net = require(\"net\");\nconst stream = require(\"stream\");"


	../lib/lib.d.ts
	  Default library for target 'es5'
	../../tmp/node_modules/node/index.d.ts
	  Imported via "net" from file 'app.js'
	  Imported via "stream" from file 'app.js'
	  Root file specified for compilation
	app.js
	  Root file specified for compilation

Info 22   [00:01:28.000] -----------------------------------------------
TI:: [00:01:29.000] Got install request {"projectName":"/dev/null/inferredProject1*","fileNames":["/a/lib/lib.d.ts","/tmp/node_modules/node/index.d.ts","/a/b/app.js"],"compilerOptions":{"target":1,"jsx":1,"allowNonTsExtensions":true,"allowJs":true,"noEmitForJsFiles":true,"maxNodeModuleJsDepth":2},"typeAcquisition":{"enable":true,"include":[],"exclude":[]},"unresolvedImports":[],"projectRootPath":"/a/b","cachePath":"/tmp","kind":"discover"}
TI:: [00:01:30.000] Request specifies cache path '/tmp', loading cached information...
TI:: [00:01:31.000] Processing cache location '/tmp'
TI:: [00:01:32.000] Cache location was already processed...
TI:: [00:01:33.000] Explicitly included types: []
TI:: [00:01:34.000] Inferred typings from unresolved imports: []
TI:: [00:01:35.000] Result: {"cachedTypingPaths":[],"newTypingNames":[],"filesToWatch":["/a/b/bower_components","/a/b/node_modules"]}
TI:: [00:01:36.000] Finished typings discovery: {"cachedTypingPaths":[],"newTypingNames":[],"filesToWatch":["/a/b/bower_components","/a/b/node_modules"]}
TI:: [00:01:37.000] Sending response:
    {"projectName":"/dev/null/inferredProject1*","typeAcquisition":{"enable":true,"include":[],"exclude":[]},"compilerOptions":{"target":1,"jsx":1,"allowNonTsExtensions":true,"allowJs":true,"noEmitForJsFiles":true,"maxNodeModuleJsDepth":2},"typings":[],"unresolvedImports":[],"kind":"action::set"}
Info 23   [00:01:38.000] Scheduled: /dev/null/inferredProject1*
Info 24   [00:01:39.000] Scheduled: *ensureProjectForOpenFiles*, Cancelled earlier one
TI:: [00:01:40.000] No new typings were requested as a result of typings discovery
After checking timeout queue length (2) and running

Before checking timeout queue length (2) and running

Info 25   [00:01:41.000] Running: /dev/null/inferredProject1*
Info 26   [00:01:42.000] Starting updateGraphWorker: Project: /dev/null/inferredProject1*
Info 27   [00:01:43.000] DirectoryWatcher:: Added:: WatchInfo: /a/b/node_modules 1 undefined Project: /dev/null/inferredProject1* WatchType: Failed Lookup Locations
Info 28   [00:01:44.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /a/b/node_modules 1 undefined Project: /dev/null/inferredProject1* WatchType: Failed Lookup Locations
Info 29   [00:01:45.000] Finishing updateGraphWorker: Project: /dev/null/inferredProject1* Version: 3 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 30   [00:01:46.000] Project '/dev/null/inferredProject1*' (Inferred)
Info 31   [00:01:47.000] 	Files (3)
	/a/lib/lib.d.ts Text-1 "/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }"
	/tmp/node_modules/node/index.d.ts Text-1 "\ndeclare module \"net\" {\n    export type n = number;\n}\ndeclare module \"stream\" {\n    export type s = string;\n}"
	/a/b/app.js SVC-1-1 "// @ts-check\n\nconst net = require(\"net\");\nconst stream = require(\"s tream\");"


	../lib/lib.d.ts
	  Default library for target 'es5'
	../../tmp/node_modules/node/index.d.ts
	  Imported via "net" from file 'app.js'
	app.js
	  Root file specified for compilation

Info 32   [00:01:48.000] -----------------------------------------------
TI:: [00:01:49.000] Got install request {"projectName":"/dev/null/inferredProject1*","fileNames":["/a/lib/lib.d.ts","/a/b/app.js"],"compilerOptions":{"target":1,"jsx":1,"allowNonTsExtensions":true,"allowJs":true,"noEmitForJsFiles":true,"maxNodeModuleJsDepth":2},"typeAcquisition":{"enable":true,"include":[],"exclude":[]},"unresolvedImports":["s tream"],"projectRootPath":"/a/b","cachePath":"/tmp","kind":"discover"}
TI:: [00:01:50.000] Request specifies cache path '/tmp', loading cached information...
TI:: [00:01:51.000] Processing cache location '/tmp'
TI:: [00:01:52.000] Cache location was already processed...
TI:: [00:01:53.000] Explicitly included types: []
TI:: [00:01:54.000] Inferred typings from unresolved imports: ["s tream"]
TI:: [00:01:55.000] Result: {"cachedTypingPaths":[],"newTypingNames":["s tream"],"filesToWatch":["/a/b/bower_components","/a/b/node_modules"]}
TI:: [00:01:56.000] Finished typings discovery: {"cachedTypingPaths":[],"newTypingNames":["s tream"],"filesToWatch":["/a/b/bower_components","/a/b/node_modules"]}
TI:: [00:01:57.000] Installing typings ["s tream"]
TI:: [00:01:58.000] 's tream':: Package name 's tream' contains non URI safe characters
TI:: [00:01:59.000] All typings are known to be missing or invalid - no need to install more typings
TI:: [00:02:00.000] Sending response:
    {"projectName":"/dev/null/inferredProject1*","typeAcquisition":{"enable":true,"include":[],"exclude":[]},"compilerOptions":{"target":1,"jsx":1,"allowNonTsExtensions":true,"allowJs":true,"noEmitForJsFiles":true,"maxNodeModuleJsDepth":2},"typings":[],"unresolvedImports":["s tream"],"kind":"action::set"}
Info 33   [00:02:01.000] Running: *ensureProjectForOpenFiles*
Info 34   [00:02:02.000] Before ensureProjectForOpenFiles:
Info 35   [00:02:03.000] Project '/dev/null/inferredProject1*' (Inferred)
Info 35   [00:02:04.000] 	Files (3)

Info 35   [00:02:05.000] -----------------------------------------------
Info 35   [00:02:06.000] Open files: 
Info 35   [00:02:07.000] 	FileName: /a/b/app.js ProjectRootPath: undefined
Info 35   [00:02:08.000] 		Projects: /dev/null/inferredProject1*
Info 35   [00:02:09.000] After ensureProjectForOpenFiles:
Info 36   [00:02:10.000] Project '/dev/null/inferredProject1*' (Inferred)
Info 36   [00:02:11.000] 	Files (3)

Info 36   [00:02:12.000] -----------------------------------------------
Info 36   [00:02:13.000] Open files: 
Info 36   [00:02:14.000] 	FileName: /a/b/app.js ProjectRootPath: undefined
Info 36   [00:02:15.000] 		Projects: /dev/null/inferredProject1*
After checking timeout queue length (2) and running

Checking timeout queue length: 0

Info 36   [00:02:16.000] Starting updateGraphWorker: Project: /dev/null/inferredProject1*
Info 37   [00:02:17.000] Finishing updateGraphWorker: Project: /dev/null/inferredProject1* Version: 4 structureChanged: true structureIsReused:: SafeModules Elapsed:: *ms
Info 38   [00:02:18.000] Project '/dev/null/inferredProject1*' (Inferred)
Info 39   [00:02:19.000] 	Files (3)
	/a/lib/lib.d.ts Text-1 "/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }"
	/tmp/node_modules/node/index.d.ts Text-1 "\ndeclare module \"net\" {\n    export type n = number;\n}\ndeclare module \"stream\" {\n    export type s = string;\n}"
	/a/b/app.js SVC-1-2 "// @ts-check\n\nconst bar = require(\"bar\");const net = require(\"net\");\nconst stream = require(\"s tream\");"

Info 40   [00:02:20.000] -----------------------------------------------
TI:: [00:02:21.000] Got install request {"projectName":"/dev/null/inferredProject1*","fileNames":["/a/lib/lib.d.ts","/a/b/app.js"],"compilerOptions":{"target":1,"jsx":1,"allowNonTsExtensions":true,"allowJs":true,"noEmitForJsFiles":true,"maxNodeModuleJsDepth":2},"typeAcquisition":{"enable":true,"include":[],"exclude":[]},"unresolvedImports":["bar","s tream"],"projectRootPath":"/a/b","cachePath":"/tmp","kind":"discover"}
TI:: [00:02:22.000] Request specifies cache path '/tmp', loading cached information...
TI:: [00:02:23.000] Processing cache location '/tmp'
TI:: [00:02:24.000] Cache location was already processed...
TI:: [00:02:25.000] Explicitly included types: []
TI:: [00:02:26.000] Inferred typings from unresolved imports: ["bar","s tream"]
TI:: [00:02:27.000] Result: {"cachedTypingPaths":[],"newTypingNames":["bar","s tream"],"filesToWatch":["/a/b/bower_components","/a/b/node_modules"]}
TI:: [00:02:28.000] Finished typings discovery: {"cachedTypingPaths":[],"newTypingNames":["bar","s tream"],"filesToWatch":["/a/b/bower_components","/a/b/node_modules"]}
TI:: [00:02:29.000] Installing typings ["bar","s tream"]
TI:: [00:02:30.000] 'bar':: Entry for package 'bar' does not exist in local types registry - skipping...
TI:: [00:02:31.000] 's tream':: 's tream' is in missingTypingsSet - skipping...
TI:: [00:02:32.000] All typings are known to be missing or invalid - no need to install more typings
TI:: [00:02:33.000] Sending response:
    {"projectName":"/dev/null/inferredProject1*","typeAcquisition":{"enable":true,"include":[],"exclude":[]},"compilerOptions":{"target":1,"jsx":1,"allowNonTsExtensions":true,"allowJs":true,"noEmitForJsFiles":true,"maxNodeModuleJsDepth":2},"typings":[],"unresolvedImports":["bar","s tream"],"kind":"action::set"}
Checking timeout queue length: 0
