Info 0    [16:00:33.000] Provided types map file "/a/lib/typesMap.json" doesn't exist
Info 1    [16:00:34.000] request:{"seq":0,"type":"request","command":"open","arguments":{"file":"/user/username/projects/myproject/src/client/app.js","projectRootPath":"/user/username/projects/myproject"}}
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

//// [/user/username/projects/myproject/src/client/app.js]


//// [/user/username/projects/myproject/src/server/utilities.js]
function getHostName() { return "hello"; } export { getHostName };

//// [/user/username/projects/myproject/test/backend/index.js]
import { getHostName } from '../../src/server/utilities';export default getHostName;


PolledWatches::

FsWatches::

FsWatchesRecursive::

Info 2    [16:00:35.000] Search path: /user/username/projects/myproject/src/client
Info 3    [16:00:36.000] For info: /user/username/projects/myproject/src/client/app.js :: No config files found.
Info 4    [16:00:37.000] Plugins were requested but not running in environment that supports 'require'. Nothing will be loaded
Info 5    [16:00:38.000] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/src/client/tsconfig.json 2000 undefined WatchType: Config file for the inferred project root
Info 6    [16:00:39.000] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/src/client/jsconfig.json 2000 undefined WatchType: Config file for the inferred project root
Info 7    [16:00:40.000] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/src/tsconfig.json 2000 undefined WatchType: Config file for the inferred project root
Info 8    [16:00:41.000] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/src/jsconfig.json 2000 undefined WatchType: Config file for the inferred project root
Info 9    [16:00:42.000] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/tsconfig.json 2000 undefined WatchType: Config file for the inferred project root
Info 10   [16:00:43.000] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/jsconfig.json 2000 undefined WatchType: Config file for the inferred project root
Info 11   [16:00:44.000] Starting updateGraphWorker: Project: /dev/null/inferredProject1*
Info 12   [16:00:45.000] FileWatcher:: Added:: WatchInfo: /a/lib/lib.d.ts 500 undefined WatchType: Closed Script info
Info 13   [16:00:46.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info 14   [16:00:47.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info 15   [16:00:48.000] Finishing updateGraphWorker: Project: /dev/null/inferredProject1* Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 16   [16:00:49.000] Project '/dev/null/inferredProject1*' (Inferred)
Info 17   [16:00:50.000] 	Files (2)
	/a/lib/lib.d.ts
	/user/username/projects/myproject/src/client/app.js


	../../../../a/lib/lib.d.ts
	  Default library for target 'es5'
	src/client/app.js
	  Root file specified for compilation

Info 18   [16:00:51.000] -----------------------------------------------
Info 19   [16:00:52.000] Project '/dev/null/inferredProject1*' (Inferred)
Info 19   [16:00:53.000] 	Files (2)

Info 19   [16:00:54.000] -----------------------------------------------
Info 19   [16:00:55.000] Open files: 
Info 19   [16:00:56.000] 	FileName: /user/username/projects/myproject/src/client/app.js ProjectRootPath: /user/username/projects/myproject
Info 19   [16:00:57.000] 		Projects: /dev/null/inferredProject1*

PolledWatches::
/user/username/projects/myproject/src/client/tsconfig.json:
  {"pollingInterval":2000}
/user/username/projects/myproject/src/client/jsconfig.json:
  {"pollingInterval":2000}
/user/username/projects/myproject/src/tsconfig.json:
  {"pollingInterval":2000}
/user/username/projects/myproject/src/jsconfig.json:
  {"pollingInterval":2000}
/user/username/projects/myproject/tsconfig.json:
  {"pollingInterval":2000}
/user/username/projects/myproject/jsconfig.json:
  {"pollingInterval":2000}
/user/username/projects/myproject/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/myproject/bower_components:
  {"pollingInterval":500}
/user/username/projects/myproject/node_modules:
  {"pollingInterval":500}

FsWatches::
/a/lib/lib.d.ts:
  {}

FsWatchesRecursive::
/user/username/projects/myproject/src:
  {}

Info 19   [16:00:58.000] response:{"responseRequired":false}
Info 20   [16:00:59.000] request:{"seq":0,"type":"request","command":"open","arguments":{"file":"/user/username/projects/myproject/test/backend/index.js","projectRootPath":"/user/username/projects/myproject"}}

PolledWatches::
/user/username/projects/myproject/src/client/tsconfig.json:
  {"pollingInterval":2000}
/user/username/projects/myproject/src/client/jsconfig.json:
  {"pollingInterval":2000}
/user/username/projects/myproject/src/tsconfig.json:
  {"pollingInterval":2000}
/user/username/projects/myproject/src/jsconfig.json:
  {"pollingInterval":2000}
/user/username/projects/myproject/tsconfig.json:
  {"pollingInterval":2000}
/user/username/projects/myproject/jsconfig.json:
  {"pollingInterval":2000}
/user/username/projects/myproject/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/myproject/bower_components:
  {"pollingInterval":500}
/user/username/projects/myproject/node_modules:
  {"pollingInterval":500}

FsWatches::
/a/lib/lib.d.ts:
  {}

FsWatchesRecursive::
/user/username/projects/myproject/src:
  {}

Info 21   [16:01:00.000] Search path: /user/username/projects/myproject/test/backend
Info 22   [16:01:01.000] For info: /user/username/projects/myproject/test/backend/index.js :: No config files found.
Info 23   [16:01:02.000] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/test/backend/tsconfig.json 2000 undefined WatchType: Config file for the inferred project root
Info 24   [16:01:03.000] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/test/backend/jsconfig.json 2000 undefined WatchType: Config file for the inferred project root
Info 25   [16:01:04.000] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/test/tsconfig.json 2000 undefined WatchType: Config file for the inferred project root
Info 26   [16:01:05.000] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/test/jsconfig.json 2000 undefined WatchType: Config file for the inferred project root
Info 27   [16:01:06.000] Starting updateGraphWorker: Project: /dev/null/inferredProject1*
Info 28   [16:01:07.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/src 1 undefined Project: /dev/null/inferredProject1* WatchType: Failed Lookup Locations
Info 29   [16:01:08.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/src 1 undefined Project: /dev/null/inferredProject1* WatchType: Failed Lookup Locations
Info 30   [16:01:09.000] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/src/server/utilities.js 500 undefined WatchType: Closed Script info
Info 31   [16:01:10.000] Finishing updateGraphWorker: Project: /dev/null/inferredProject1* Version: 2 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 32   [16:01:11.000] Project '/dev/null/inferredProject1*' (Inferred)
Info 33   [16:01:12.000] 	Files (4)
	/a/lib/lib.d.ts
	/user/username/projects/myproject/src/client/app.js
	/user/username/projects/myproject/src/server/utilities.js
	/user/username/projects/myproject/test/backend/index.js


	../../../../a/lib/lib.d.ts
	  Default library for target 'es5'
	src/client/app.js
	  Root file specified for compilation
	src/server/utilities.js
	  Imported via '../../src/server/utilities' from file 'test/backend/index.js'
	test/backend/index.js
	  Root file specified for compilation

Info 34   [16:01:13.000] -----------------------------------------------
Info 35   [16:01:14.000] Project '/dev/null/inferredProject1*' (Inferred)
Info 35   [16:01:15.000] 	Files (4)

Info 35   [16:01:16.000] -----------------------------------------------
Info 35   [16:01:17.000] Open files: 
Info 35   [16:01:18.000] 	FileName: /user/username/projects/myproject/src/client/app.js ProjectRootPath: /user/username/projects/myproject
Info 35   [16:01:19.000] 		Projects: /dev/null/inferredProject1*
Info 35   [16:01:20.000] 	FileName: /user/username/projects/myproject/test/backend/index.js ProjectRootPath: /user/username/projects/myproject
Info 35   [16:01:21.000] 		Projects: /dev/null/inferredProject1*

PolledWatches::
/user/username/projects/myproject/src/client/tsconfig.json:
  {"pollingInterval":2000}
/user/username/projects/myproject/src/client/jsconfig.json:
  {"pollingInterval":2000}
/user/username/projects/myproject/src/tsconfig.json:
  {"pollingInterval":2000}
/user/username/projects/myproject/src/jsconfig.json:
  {"pollingInterval":2000}
/user/username/projects/myproject/tsconfig.json:
  {"pollingInterval":2000}
/user/username/projects/myproject/jsconfig.json:
  {"pollingInterval":2000}
/user/username/projects/myproject/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/myproject/bower_components:
  {"pollingInterval":500}
/user/username/projects/myproject/node_modules:
  {"pollingInterval":500}
/user/username/projects/myproject/test/backend/tsconfig.json:
  {"pollingInterval":2000}
/user/username/projects/myproject/test/backend/jsconfig.json:
  {"pollingInterval":2000}
/user/username/projects/myproject/test/tsconfig.json:
  {"pollingInterval":2000}
/user/username/projects/myproject/test/jsconfig.json:
  {"pollingInterval":2000}

FsWatches::
/a/lib/lib.d.ts:
  {}
/user/username/projects/myproject/src/server/utilities.js:
  {}

FsWatchesRecursive::
/user/username/projects/myproject/src:
  {}
/user/username/projects/myproject/test:
  {}

Info 35   [16:01:22.000] response:{"responseRequired":false}
Info 36   [16:01:23.000] request:{"command":"geterr","arguments":{"delay":0,"files":["/user/username/projects/myproject/test/backend/index.js","/user/username/projects/myproject/src/client/app.js"]},"seq":1,"type":"request"}

PolledWatches::
/user/username/projects/myproject/src/client/tsconfig.json:
  {"pollingInterval":2000}
/user/username/projects/myproject/src/client/jsconfig.json:
  {"pollingInterval":2000}
/user/username/projects/myproject/src/tsconfig.json:
  {"pollingInterval":2000}
/user/username/projects/myproject/src/jsconfig.json:
  {"pollingInterval":2000}
/user/username/projects/myproject/tsconfig.json:
  {"pollingInterval":2000}
/user/username/projects/myproject/jsconfig.json:
  {"pollingInterval":2000}
/user/username/projects/myproject/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/myproject/bower_components:
  {"pollingInterval":500}
/user/username/projects/myproject/node_modules:
  {"pollingInterval":500}
/user/username/projects/myproject/test/backend/tsconfig.json:
  {"pollingInterval":2000}
/user/username/projects/myproject/test/backend/jsconfig.json:
  {"pollingInterval":2000}
/user/username/projects/myproject/test/tsconfig.json:
  {"pollingInterval":2000}
/user/username/projects/myproject/test/jsconfig.json:
  {"pollingInterval":2000}

FsWatches::
/a/lib/lib.d.ts:
  {}
/user/username/projects/myproject/src/server/utilities.js:
  {}

FsWatchesRecursive::
/user/username/projects/myproject/src:
  {}
/user/username/projects/myproject/test:
  {}


PolledWatches::
/user/username/projects/myproject/src/client/tsconfig.json:
  {"pollingInterval":2000}
/user/username/projects/myproject/src/client/jsconfig.json:
  {"pollingInterval":2000}
/user/username/projects/myproject/src/tsconfig.json:
  {"pollingInterval":2000}
/user/username/projects/myproject/src/jsconfig.json:
  {"pollingInterval":2000}
/user/username/projects/myproject/tsconfig.json:
  {"pollingInterval":2000}
/user/username/projects/myproject/jsconfig.json:
  {"pollingInterval":2000}
/user/username/projects/myproject/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/myproject/bower_components:
  {"pollingInterval":500}
/user/username/projects/myproject/node_modules:
  {"pollingInterval":500}
/user/username/projects/myproject/test/backend/tsconfig.json:
  {"pollingInterval":2000}
/user/username/projects/myproject/test/backend/jsconfig.json:
  {"pollingInterval":2000}
/user/username/projects/myproject/test/tsconfig.json:
  {"pollingInterval":2000}
/user/username/projects/myproject/test/jsconfig.json:
  {"pollingInterval":2000}

FsWatches::
/a/lib/lib.d.ts:
  {}
/user/username/projects/myproject/src/server/utilities.js:
  {}

FsWatchesRecursive::
/user/username/projects/myproject/src:
  {}
/user/username/projects/myproject/test:
  {}

Info 37   [16:01:24.000] response:{"responseRequired":false}
Info 38   [16:01:25.000] event:
    {"seq":0,"type":"event","event":"syntaxDiag","body":{"file":"/user/username/projects/myproject/test/backend/index.js","diagnostics":[]}}
Info 39   [16:01:26.000] event:
    {"seq":0,"type":"event","event":"semanticDiag","body":{"file":"/user/username/projects/myproject/test/backend/index.js","diagnostics":[]}}
Info 40   [16:01:27.000] event:
    {"seq":0,"type":"event","event":"suggestionDiag","body":{"file":"/user/username/projects/myproject/test/backend/index.js","diagnostics":[]}}
Info 41   [16:01:28.000] event:
    {"seq":0,"type":"event","event":"syntaxDiag","body":{"file":"/user/username/projects/myproject/src/client/app.js","diagnostics":[]}}
Info 42   [16:01:29.000] event:
    {"seq":0,"type":"event","event":"semanticDiag","body":{"file":"/user/username/projects/myproject/src/client/app.js","diagnostics":[]}}
Info 43   [16:01:30.000] event:
    {"seq":0,"type":"event","event":"suggestionDiag","body":{"file":"/user/username/projects/myproject/src/client/app.js","diagnostics":[]}}
Info 44   [16:01:31.000] event:
    {"seq":0,"type":"event","event":"requestCompleted","body":{"request_seq":1}}
Info 45   [16:01:32.000] request:{"seq":0,"type":"request","command":"close","arguments":{"file":"/user/username/projects/myproject/test/backend/index.js"}}

PolledWatches::
/user/username/projects/myproject/src/client/tsconfig.json:
  {"pollingInterval":2000}
/user/username/projects/myproject/src/client/jsconfig.json:
  {"pollingInterval":2000}
/user/username/projects/myproject/src/tsconfig.json:
  {"pollingInterval":2000}
/user/username/projects/myproject/src/jsconfig.json:
  {"pollingInterval":2000}
/user/username/projects/myproject/tsconfig.json:
  {"pollingInterval":2000}
/user/username/projects/myproject/jsconfig.json:
  {"pollingInterval":2000}
/user/username/projects/myproject/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/myproject/bower_components:
  {"pollingInterval":500}
/user/username/projects/myproject/node_modules:
  {"pollingInterval":500}
/user/username/projects/myproject/test/backend/tsconfig.json:
  {"pollingInterval":2000}
/user/username/projects/myproject/test/backend/jsconfig.json:
  {"pollingInterval":2000}
/user/username/projects/myproject/test/tsconfig.json:
  {"pollingInterval":2000}
/user/username/projects/myproject/test/jsconfig.json:
  {"pollingInterval":2000}

FsWatches::
/a/lib/lib.d.ts:
  {}
/user/username/projects/myproject/src/server/utilities.js:
  {}

FsWatchesRecursive::
/user/username/projects/myproject/src:
  {}
/user/username/projects/myproject/test:
  {}

Info 46   [16:01:33.000] FileWatcher:: Close:: WatchInfo: /user/username/projects/myproject/test/backend/tsconfig.json 2000 undefined WatchType: Config file for the inferred project root
Info 47   [16:01:34.000] FileWatcher:: Close:: WatchInfo: /user/username/projects/myproject/test/backend/jsconfig.json 2000 undefined WatchType: Config file for the inferred project root
Info 48   [16:01:35.000] FileWatcher:: Close:: WatchInfo: /user/username/projects/myproject/test/tsconfig.json 2000 undefined WatchType: Config file for the inferred project root
Info 49   [16:01:36.000] FileWatcher:: Close:: WatchInfo: /user/username/projects/myproject/test/jsconfig.json 2000 undefined WatchType: Config file for the inferred project root
Info 50   [16:01:37.000] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/test/backend/index.js 500 undefined WatchType: Closed Script info
Info 51   [16:01:38.000] Project '/dev/null/inferredProject1*' (Inferred)
Info 51   [16:01:39.000] 	Files (4)

Info 51   [16:01:40.000] -----------------------------------------------
Info 51   [16:01:41.000] Open files: 
Info 51   [16:01:42.000] 	FileName: /user/username/projects/myproject/src/client/app.js ProjectRootPath: /user/username/projects/myproject
Info 51   [16:01:43.000] 		Projects: /dev/null/inferredProject1*

PolledWatches::
/user/username/projects/myproject/src/client/tsconfig.json:
  {"pollingInterval":2000}
/user/username/projects/myproject/src/client/jsconfig.json:
  {"pollingInterval":2000}
/user/username/projects/myproject/src/tsconfig.json:
  {"pollingInterval":2000}
/user/username/projects/myproject/src/jsconfig.json:
  {"pollingInterval":2000}
/user/username/projects/myproject/tsconfig.json:
  {"pollingInterval":2000}
/user/username/projects/myproject/jsconfig.json:
  {"pollingInterval":2000}
/user/username/projects/myproject/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/myproject/bower_components:
  {"pollingInterval":500}
/user/username/projects/myproject/node_modules:
  {"pollingInterval":500}

FsWatches::
/a/lib/lib.d.ts:
  {}
/user/username/projects/myproject/src/server/utilities.js:
  {}
/user/username/projects/myproject/test/backend/index.js:
  {}

FsWatchesRecursive::
/user/username/projects/myproject/src:
  {}
/user/username/projects/myproject/test:
  {}

Info 51   [16:01:44.000] response:{"responseRequired":false}
Info 52   [16:01:45.000] request:{"seq":0,"type":"request","command":"open","arguments":{"file":"/user/username/projects/myproject/src/server/utilities.js","projectRootPath":"/user/username/projects/myproject"}}

PolledWatches::
/user/username/projects/myproject/src/client/tsconfig.json:
  {"pollingInterval":2000}
/user/username/projects/myproject/src/client/jsconfig.json:
  {"pollingInterval":2000}
/user/username/projects/myproject/src/tsconfig.json:
  {"pollingInterval":2000}
/user/username/projects/myproject/src/jsconfig.json:
  {"pollingInterval":2000}
/user/username/projects/myproject/tsconfig.json:
  {"pollingInterval":2000}
/user/username/projects/myproject/jsconfig.json:
  {"pollingInterval":2000}
/user/username/projects/myproject/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/myproject/bower_components:
  {"pollingInterval":500}
/user/username/projects/myproject/node_modules:
  {"pollingInterval":500}

FsWatches::
/a/lib/lib.d.ts:
  {}
/user/username/projects/myproject/src/server/utilities.js:
  {}
/user/username/projects/myproject/test/backend/index.js:
  {}

FsWatchesRecursive::
/user/username/projects/myproject/src:
  {}
/user/username/projects/myproject/test:
  {}

Info 53   [16:01:46.000] FileWatcher:: Close:: WatchInfo: /user/username/projects/myproject/src/server/utilities.js 500 undefined WatchType: Closed Script info
Info 54   [16:01:47.000] Search path: /user/username/projects/myproject/src/server
Info 55   [16:01:48.000] For info: /user/username/projects/myproject/src/server/utilities.js :: No config files found.
Info 56   [16:01:49.000] Starting updateGraphWorker: Project: /dev/null/inferredProject1*
Info 57   [16:01:50.000] DirectoryWatcher:: Close:: WatchInfo: /user/username/projects/myproject/src 1 undefined Project: /dev/null/inferredProject1* WatchType: Failed Lookup Locations
Info 58   [16:01:51.000] Elapsed:: *ms DirectoryWatcher:: Close:: WatchInfo: /user/username/projects/myproject/src 1 undefined Project: /dev/null/inferredProject1* WatchType: Failed Lookup Locations
Info 59   [16:01:52.000] Finishing updateGraphWorker: Project: /dev/null/inferredProject1* Version: 3 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 60   [16:01:53.000] Project '/dev/null/inferredProject1*' (Inferred)
Info 61   [16:01:54.000] 	Files (2)
	/a/lib/lib.d.ts
	/user/username/projects/myproject/src/client/app.js


	../../../../a/lib/lib.d.ts
	  Default library for target 'es5'
	src/client/app.js
	  Root file specified for compilation

Info 62   [16:01:55.000] -----------------------------------------------
Info 63   [16:01:56.000] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/src/server/tsconfig.json 2000 undefined WatchType: Config file for the inferred project root
Info 64   [16:01:57.000] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/src/server/jsconfig.json 2000 undefined WatchType: Config file for the inferred project root
Info 65   [16:01:58.000] Starting updateGraphWorker: Project: /dev/null/inferredProject1*
Info 66   [16:01:59.000] Finishing updateGraphWorker: Project: /dev/null/inferredProject1* Version: 4 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 67   [16:02:00.000] Project '/dev/null/inferredProject1*' (Inferred)
Info 68   [16:02:01.000] 	Files (3)
	/a/lib/lib.d.ts
	/user/username/projects/myproject/src/client/app.js
	/user/username/projects/myproject/src/server/utilities.js


	../../../../a/lib/lib.d.ts
	  Default library for target 'es5'
	src/client/app.js
	  Root file specified for compilation
	src/server/utilities.js
	  Root file specified for compilation

Info 69   [16:02:02.000] -----------------------------------------------
Info 70   [16:02:03.000] FileWatcher:: Close:: WatchInfo: /user/username/projects/myproject/test/backend/index.js 500 undefined WatchType: Closed Script info
Info 71   [16:02:04.000] Project '/dev/null/inferredProject1*' (Inferred)
Info 71   [16:02:05.000] 	Files (3)

Info 71   [16:02:06.000] -----------------------------------------------
Info 71   [16:02:07.000] Open files: 
Info 71   [16:02:08.000] 	FileName: /user/username/projects/myproject/src/client/app.js ProjectRootPath: /user/username/projects/myproject
Info 71   [16:02:09.000] 		Projects: /dev/null/inferredProject1*
Info 71   [16:02:10.000] 	FileName: /user/username/projects/myproject/src/server/utilities.js ProjectRootPath: /user/username/projects/myproject
Info 71   [16:02:11.000] 		Projects: /dev/null/inferredProject1*

PolledWatches::
/user/username/projects/myproject/src/client/tsconfig.json:
  {"pollingInterval":2000}
/user/username/projects/myproject/src/client/jsconfig.json:
  {"pollingInterval":2000}
/user/username/projects/myproject/src/tsconfig.json:
  {"pollingInterval":2000}
/user/username/projects/myproject/src/jsconfig.json:
  {"pollingInterval":2000}
/user/username/projects/myproject/tsconfig.json:
  {"pollingInterval":2000}
/user/username/projects/myproject/jsconfig.json:
  {"pollingInterval":2000}
/user/username/projects/myproject/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/myproject/bower_components:
  {"pollingInterval":500}
/user/username/projects/myproject/node_modules:
  {"pollingInterval":500}
/user/username/projects/myproject/src/server/tsconfig.json:
  {"pollingInterval":2000}
/user/username/projects/myproject/src/server/jsconfig.json:
  {"pollingInterval":2000}

FsWatches::
/a/lib/lib.d.ts:
  {}

FsWatchesRecursive::
/user/username/projects/myproject/src:
  {}

Info 71   [16:02:12.000] response:{"responseRequired":false}
Info 72   [16:02:13.000] request:{"command":"geterr","arguments":{"delay":0,"files":["/user/username/projects/myproject/src/server/utilities.js","/user/username/projects/myproject/src/client/app.js"]},"seq":2,"type":"request"}

PolledWatches::
/user/username/projects/myproject/src/client/tsconfig.json:
  {"pollingInterval":2000}
/user/username/projects/myproject/src/client/jsconfig.json:
  {"pollingInterval":2000}
/user/username/projects/myproject/src/tsconfig.json:
  {"pollingInterval":2000}
/user/username/projects/myproject/src/jsconfig.json:
  {"pollingInterval":2000}
/user/username/projects/myproject/tsconfig.json:
  {"pollingInterval":2000}
/user/username/projects/myproject/jsconfig.json:
  {"pollingInterval":2000}
/user/username/projects/myproject/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/myproject/bower_components:
  {"pollingInterval":500}
/user/username/projects/myproject/node_modules:
  {"pollingInterval":500}
/user/username/projects/myproject/src/server/tsconfig.json:
  {"pollingInterval":2000}
/user/username/projects/myproject/src/server/jsconfig.json:
  {"pollingInterval":2000}

FsWatches::
/a/lib/lib.d.ts:
  {}

FsWatchesRecursive::
/user/username/projects/myproject/src:
  {}


PolledWatches::
/user/username/projects/myproject/src/client/tsconfig.json:
  {"pollingInterval":2000}
/user/username/projects/myproject/src/client/jsconfig.json:
  {"pollingInterval":2000}
/user/username/projects/myproject/src/tsconfig.json:
  {"pollingInterval":2000}
/user/username/projects/myproject/src/jsconfig.json:
  {"pollingInterval":2000}
/user/username/projects/myproject/tsconfig.json:
  {"pollingInterval":2000}
/user/username/projects/myproject/jsconfig.json:
  {"pollingInterval":2000}
/user/username/projects/myproject/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/myproject/bower_components:
  {"pollingInterval":500}
/user/username/projects/myproject/node_modules:
  {"pollingInterval":500}
/user/username/projects/myproject/src/server/tsconfig.json:
  {"pollingInterval":2000}
/user/username/projects/myproject/src/server/jsconfig.json:
  {"pollingInterval":2000}

FsWatches::
/a/lib/lib.d.ts:
  {}

FsWatchesRecursive::
/user/username/projects/myproject/src:
  {}

Info 73   [16:02:14.000] response:{"responseRequired":false}
Info 74   [16:02:15.000] event:
    {"seq":0,"type":"event","event":"syntaxDiag","body":{"file":"/user/username/projects/myproject/src/server/utilities.js","diagnostics":[]}}
Info 75   [16:02:16.000] event:
    {"seq":0,"type":"event","event":"semanticDiag","body":{"file":"/user/username/projects/myproject/src/server/utilities.js","diagnostics":[]}}
Info 76   [16:02:17.000] event:
    {"seq":0,"type":"event","event":"suggestionDiag","body":{"file":"/user/username/projects/myproject/src/server/utilities.js","diagnostics":[]}}
Info 77   [16:02:18.000] event:
    {"seq":0,"type":"event","event":"syntaxDiag","body":{"file":"/user/username/projects/myproject/src/client/app.js","diagnostics":[]}}
Info 78   [16:02:19.000] event:
    {"seq":0,"type":"event","event":"semanticDiag","body":{"file":"/user/username/projects/myproject/src/client/app.js","diagnostics":[]}}
Info 79   [16:02:20.000] event:
    {"seq":0,"type":"event","event":"suggestionDiag","body":{"file":"/user/username/projects/myproject/src/client/app.js","diagnostics":[]}}
Info 80   [16:02:21.000] event:
    {"seq":0,"type":"event","event":"requestCompleted","body":{"request_seq":2}}