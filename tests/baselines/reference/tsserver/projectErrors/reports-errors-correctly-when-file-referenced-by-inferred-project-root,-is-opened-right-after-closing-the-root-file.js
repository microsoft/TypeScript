Info 0    [00:00:33.000] Provided types map file "/a/lib/typesMap.json" doesn't exist
Info 1    [00:00:34.000] request:
    {
      "seq": 0,
      "type": "request",
      "command": "open",
      "arguments": {
        "file": "/user/username/projects/myproject/src/client/app.js",
        "projectRootPath": "/user/username/projects/myproject"
      }
    }
Before request
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

Info 2    [00:00:35.000] Search path: /user/username/projects/myproject/src/client
Info 3    [00:00:36.000] For info: /user/username/projects/myproject/src/client/app.js :: No config files found.
Info 4    [00:00:37.000] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/src/client/tsconfig.json 2000 undefined WatchType: Config file for the inferred project root
Info 5    [00:00:38.000] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/src/client/jsconfig.json 2000 undefined WatchType: Config file for the inferred project root
Info 6    [00:00:39.000] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/src/tsconfig.json 2000 undefined WatchType: Config file for the inferred project root
Info 7    [00:00:40.000] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/src/jsconfig.json 2000 undefined WatchType: Config file for the inferred project root
Info 8    [00:00:41.000] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/tsconfig.json 2000 undefined WatchType: Config file for the inferred project root
Info 9    [00:00:42.000] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/jsconfig.json 2000 undefined WatchType: Config file for the inferred project root
Info 10   [00:00:43.000] Starting updateGraphWorker: Project: /dev/null/inferredProject1*
Info 11   [00:00:44.000] FileWatcher:: Added:: WatchInfo: /a/lib/lib.d.ts 500 undefined WatchType: Closed Script info
Info 12   [00:00:45.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info 13   [00:00:46.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info 14   [00:00:47.000] Finishing updateGraphWorker: Project: /dev/null/inferredProject1* Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 15   [00:00:48.000] Project '/dev/null/inferredProject1*' (Inferred)
Info 16   [00:00:49.000] 	Files (2)
	/a/lib/lib.d.ts
	/user/username/projects/myproject/src/client/app.js


	../../../../a/lib/lib.d.ts
	  Default library for target 'es5'
	src/client/app.js
	  Root file specified for compilation

Info 17   [00:00:50.000] -----------------------------------------------
Info 18   [00:00:51.000] Project '/dev/null/inferredProject1*' (Inferred)
Info 18   [00:00:52.000] 	Files (2)

Info 18   [00:00:53.000] -----------------------------------------------
Info 18   [00:00:54.000] Open files: 
Info 18   [00:00:55.000] 	FileName: /user/username/projects/myproject/src/client/app.js ProjectRootPath: /user/username/projects/myproject
Info 18   [00:00:56.000] 		Projects: /dev/null/inferredProject1*
After request

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

Info 18   [00:00:57.000] response:
    {
      "responseRequired": false
    }
Info 19   [00:00:58.000] request:
    {
      "seq": 0,
      "type": "request",
      "command": "open",
      "arguments": {
        "file": "/user/username/projects/myproject/test/backend/index.js",
        "projectRootPath": "/user/username/projects/myproject"
      }
    }
Before request

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

Info 20   [00:00:59.000] Search path: /user/username/projects/myproject/test/backend
Info 21   [00:01:00.000] For info: /user/username/projects/myproject/test/backend/index.js :: No config files found.
Info 22   [00:01:01.000] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/test/backend/tsconfig.json 2000 undefined WatchType: Config file for the inferred project root
Info 23   [00:01:02.000] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/test/backend/jsconfig.json 2000 undefined WatchType: Config file for the inferred project root
Info 24   [00:01:03.000] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/test/tsconfig.json 2000 undefined WatchType: Config file for the inferred project root
Info 25   [00:01:04.000] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/test/jsconfig.json 2000 undefined WatchType: Config file for the inferred project root
Info 26   [00:01:05.000] Starting updateGraphWorker: Project: /dev/null/inferredProject1*
Info 27   [00:01:06.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/src 1 undefined Project: /dev/null/inferredProject1* WatchType: Failed Lookup Locations
Info 28   [00:01:07.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/src 1 undefined Project: /dev/null/inferredProject1* WatchType: Failed Lookup Locations
Info 29   [00:01:08.000] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/src/server/utilities.js 500 undefined WatchType: Closed Script info
Info 30   [00:01:09.000] Finishing updateGraphWorker: Project: /dev/null/inferredProject1* Version: 2 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 31   [00:01:10.000] Project '/dev/null/inferredProject1*' (Inferred)
Info 32   [00:01:11.000] 	Files (4)
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

Info 33   [00:01:12.000] -----------------------------------------------
Info 34   [00:01:13.000] Project '/dev/null/inferredProject1*' (Inferred)
Info 34   [00:01:14.000] 	Files (4)

Info 34   [00:01:15.000] -----------------------------------------------
Info 34   [00:01:16.000] Open files: 
Info 34   [00:01:17.000] 	FileName: /user/username/projects/myproject/src/client/app.js ProjectRootPath: /user/username/projects/myproject
Info 34   [00:01:18.000] 		Projects: /dev/null/inferredProject1*
Info 34   [00:01:19.000] 	FileName: /user/username/projects/myproject/test/backend/index.js ProjectRootPath: /user/username/projects/myproject
Info 34   [00:01:20.000] 		Projects: /dev/null/inferredProject1*
After request

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

Info 34   [00:01:21.000] response:
    {
      "responseRequired": false
    }
Info 35   [00:01:22.000] request:
    {
      "command": "geterr",
      "arguments": {
        "delay": 0,
        "files": [
          "/user/username/projects/myproject/test/backend/index.js",
          "/user/username/projects/myproject/src/client/app.js"
        ]
      },
      "seq": 1,
      "type": "request"
    }
Before request

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

After request

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

Info 36   [00:01:23.000] response:
    {
      "responseRequired": false
    }
Before checking timeout queue length (1) and running

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

Info 37   [00:01:24.000] event:
    {"seq":0,"type":"event","event":"syntaxDiag","body":{"file":"/user/username/projects/myproject/test/backend/index.js","diagnostics":[]}}
After checking timeout queue length (1) and running

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

Before running immediate callbacks and checking length (1)

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

Info 38   [00:01:25.000] event:
    {"seq":0,"type":"event","event":"semanticDiag","body":{"file":"/user/username/projects/myproject/test/backend/index.js","diagnostics":[]}}
Before running immediate callbacks and checking length (1)

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

Before running immediate callbacks and checking length (1)

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

Info 39   [00:01:26.000] event:
    {"seq":0,"type":"event","event":"suggestionDiag","body":{"file":"/user/username/projects/myproject/test/backend/index.js","diagnostics":[]}}
Before running immediate callbacks and checking length (1)

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

Before checking timeout queue length (1) and running

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

Info 40   [00:01:27.000] event:
    {"seq":0,"type":"event","event":"syntaxDiag","body":{"file":"/user/username/projects/myproject/src/client/app.js","diagnostics":[]}}
After checking timeout queue length (1) and running

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

Before running immediate callbacks and checking length (1)

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

Info 41   [00:01:28.000] event:
    {"seq":0,"type":"event","event":"semanticDiag","body":{"file":"/user/username/projects/myproject/src/client/app.js","diagnostics":[]}}
Before running immediate callbacks and checking length (1)

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

Before running immediate callbacks and checking length (1)

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

Info 42   [00:01:29.000] event:
    {"seq":0,"type":"event","event":"suggestionDiag","body":{"file":"/user/username/projects/myproject/src/client/app.js","diagnostics":[]}}
Info 43   [00:01:30.000] event:
    {"seq":0,"type":"event","event":"requestCompleted","body":{"request_seq":1}}
Before running immediate callbacks and checking length (1)

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

Info 44   [00:01:31.000] request:
    {
      "seq": 0,
      "type": "request",
      "command": "close",
      "arguments": {
        "file": "/user/username/projects/myproject/test/backend/index.js"
      }
    }
Before request

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

Info 45   [00:01:32.000] FileWatcher:: Close:: WatchInfo: /user/username/projects/myproject/test/backend/tsconfig.json 2000 undefined WatchType: Config file for the inferred project root
Info 46   [00:01:33.000] FileWatcher:: Close:: WatchInfo: /user/username/projects/myproject/test/backend/jsconfig.json 2000 undefined WatchType: Config file for the inferred project root
Info 47   [00:01:34.000] FileWatcher:: Close:: WatchInfo: /user/username/projects/myproject/test/tsconfig.json 2000 undefined WatchType: Config file for the inferred project root
Info 48   [00:01:35.000] FileWatcher:: Close:: WatchInfo: /user/username/projects/myproject/test/jsconfig.json 2000 undefined WatchType: Config file for the inferred project root
Info 49   [00:01:36.000] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/test/backend/index.js 500 undefined WatchType: Closed Script info
Info 50   [00:01:37.000] Project '/dev/null/inferredProject1*' (Inferred)
Info 50   [00:01:38.000] 	Files (4)

Info 50   [00:01:39.000] -----------------------------------------------
Info 50   [00:01:40.000] Open files: 
Info 50   [00:01:41.000] 	FileName: /user/username/projects/myproject/src/client/app.js ProjectRootPath: /user/username/projects/myproject
Info 50   [00:01:42.000] 		Projects: /dev/null/inferredProject1*
After request

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

Info 50   [00:01:43.000] response:
    {
      "responseRequired": false
    }
Info 51   [00:01:44.000] request:
    {
      "seq": 0,
      "type": "request",
      "command": "open",
      "arguments": {
        "file": "/user/username/projects/myproject/src/server/utilities.js",
        "projectRootPath": "/user/username/projects/myproject"
      }
    }
Before request

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

Info 52   [00:01:45.000] FileWatcher:: Close:: WatchInfo: /user/username/projects/myproject/src/server/utilities.js 500 undefined WatchType: Closed Script info
Info 53   [00:01:46.000] Search path: /user/username/projects/myproject/src/server
Info 54   [00:01:47.000] For info: /user/username/projects/myproject/src/server/utilities.js :: No config files found.
Info 55   [00:01:48.000] Starting updateGraphWorker: Project: /dev/null/inferredProject1*
Info 56   [00:01:49.000] DirectoryWatcher:: Close:: WatchInfo: /user/username/projects/myproject/src 1 undefined Project: /dev/null/inferredProject1* WatchType: Failed Lookup Locations
Info 57   [00:01:50.000] Elapsed:: *ms DirectoryWatcher:: Close:: WatchInfo: /user/username/projects/myproject/src 1 undefined Project: /dev/null/inferredProject1* WatchType: Failed Lookup Locations
Info 58   [00:01:51.000] Finishing updateGraphWorker: Project: /dev/null/inferredProject1* Version: 3 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 59   [00:01:52.000] Project '/dev/null/inferredProject1*' (Inferred)
Info 60   [00:01:53.000] 	Files (2)
	/a/lib/lib.d.ts
	/user/username/projects/myproject/src/client/app.js


	../../../../a/lib/lib.d.ts
	  Default library for target 'es5'
	src/client/app.js
	  Root file specified for compilation

Info 61   [00:01:54.000] -----------------------------------------------
Info 62   [00:01:55.000] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/src/server/tsconfig.json 2000 undefined WatchType: Config file for the inferred project root
Info 63   [00:01:56.000] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/src/server/jsconfig.json 2000 undefined WatchType: Config file for the inferred project root
Info 64   [00:01:57.000] Starting updateGraphWorker: Project: /dev/null/inferredProject1*
Info 65   [00:01:58.000] Finishing updateGraphWorker: Project: /dev/null/inferredProject1* Version: 4 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 66   [00:01:59.000] Project '/dev/null/inferredProject1*' (Inferred)
Info 67   [00:02:00.000] 	Files (3)
	/a/lib/lib.d.ts
	/user/username/projects/myproject/src/client/app.js
	/user/username/projects/myproject/src/server/utilities.js


	../../../../a/lib/lib.d.ts
	  Default library for target 'es5'
	src/client/app.js
	  Root file specified for compilation
	src/server/utilities.js
	  Root file specified for compilation

Info 68   [00:02:01.000] -----------------------------------------------
Info 69   [00:02:02.000] FileWatcher:: Close:: WatchInfo: /user/username/projects/myproject/test/backend/index.js 500 undefined WatchType: Closed Script info
Info 70   [00:02:03.000] Project '/dev/null/inferredProject1*' (Inferred)
Info 70   [00:02:04.000] 	Files (3)

Info 70   [00:02:05.000] -----------------------------------------------
Info 70   [00:02:06.000] Open files: 
Info 70   [00:02:07.000] 	FileName: /user/username/projects/myproject/src/client/app.js ProjectRootPath: /user/username/projects/myproject
Info 70   [00:02:08.000] 		Projects: /dev/null/inferredProject1*
Info 70   [00:02:09.000] 	FileName: /user/username/projects/myproject/src/server/utilities.js ProjectRootPath: /user/username/projects/myproject
Info 70   [00:02:10.000] 		Projects: /dev/null/inferredProject1*
After request

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

Info 70   [00:02:11.000] response:
    {
      "responseRequired": false
    }
Info 71   [00:02:12.000] request:
    {
      "command": "geterr",
      "arguments": {
        "delay": 0,
        "files": [
          "/user/username/projects/myproject/src/server/utilities.js",
          "/user/username/projects/myproject/src/client/app.js"
        ]
      },
      "seq": 2,
      "type": "request"
    }
Before request

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

After request

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

Info 72   [00:02:13.000] response:
    {
      "responseRequired": false
    }
Before checking timeout queue length (1) and running

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

Info 73   [00:02:14.000] event:
    {"seq":0,"type":"event","event":"syntaxDiag","body":{"file":"/user/username/projects/myproject/src/server/utilities.js","diagnostics":[]}}
After checking timeout queue length (1) and running

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

Before running immediate callbacks and checking length (1)

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

Info 74   [00:02:15.000] event:
    {"seq":0,"type":"event","event":"semanticDiag","body":{"file":"/user/username/projects/myproject/src/server/utilities.js","diagnostics":[]}}
Before running immediate callbacks and checking length (1)

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

Before running immediate callbacks and checking length (1)

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

Info 75   [00:02:16.000] event:
    {"seq":0,"type":"event","event":"suggestionDiag","body":{"file":"/user/username/projects/myproject/src/server/utilities.js","diagnostics":[]}}
Before running immediate callbacks and checking length (1)

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

Before checking timeout queue length (1) and running

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

Info 76   [00:02:17.000] event:
    {"seq":0,"type":"event","event":"syntaxDiag","body":{"file":"/user/username/projects/myproject/src/client/app.js","diagnostics":[]}}
After checking timeout queue length (1) and running

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

Before running immediate callbacks and checking length (1)

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

Info 77   [00:02:18.000] event:
    {"seq":0,"type":"event","event":"semanticDiag","body":{"file":"/user/username/projects/myproject/src/client/app.js","diagnostics":[]}}
Before running immediate callbacks and checking length (1)

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

Before running immediate callbacks and checking length (1)

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

Info 78   [00:02:19.000] event:
    {"seq":0,"type":"event","event":"suggestionDiag","body":{"file":"/user/username/projects/myproject/src/client/app.js","diagnostics":[]}}
Info 79   [00:02:20.000] event:
    {"seq":0,"type":"event","event":"requestCompleted","body":{"request_seq":2}}
Before running immediate callbacks and checking length (1)

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
