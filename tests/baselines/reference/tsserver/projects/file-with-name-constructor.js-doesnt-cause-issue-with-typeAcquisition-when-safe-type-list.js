currentDirectory:: / useCaseSensitiveFileNames: false
Creating project service
//// [/a/b/f1.js]
export let x = 5; import { s } from "s"

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

//// [/a/b/constructor.js]
const x = 10;

//// [/a/b/bliss.js]
export function is() { return true; }

//// [/typesMap.json]
{
            "typesMap": {
                "jquery": {
                    "match": "jquery(-(\\.?\\d+)+)?(\\.intellisense)?(\\.min)?\\.js$",
                    "types": ["jquery"]
                },
                "quack": {
                    "match": "/duckquack-(\\d+)\\.min\\.js",
                    "types": ["duck-types"]
                }
            },
            "simpleMap": {
                "Bacon": "baconjs",
                "bliss": "blissfuljs",
                "commander": "commander",
                "cordova": "cordova",
                "react": "react",
                "lodash": "lodash"
            }
        }


Info 0    [00:00:19.000] Excluded '/a/b/bliss.js' because it matched bliss from the legacy safelist
Info 1    [00:00:20.000] FileWatcher:: Added:: WatchInfo: /a/b/f1.js 500 undefined WatchType: Closed Script info
Info 2    [00:00:21.000] FileWatcher:: Added:: WatchInfo: /a/b/constructor.js 500 undefined WatchType: Closed Script info
Info 3    [00:00:22.000] Starting updateGraphWorker: Project: project
Info 4    [00:00:23.000] FileWatcher:: Added:: WatchInfo: /a/lib/lib.d.ts 500 undefined WatchType: Closed Script info
Info 5    [00:00:24.000] DirectoryWatcher:: Added:: WatchInfo: /a 1 undefined Project: project WatchType: Failed Lookup Locations
Info 6    [00:00:25.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /a 1 undefined Project: project WatchType: Failed Lookup Locations
Info 7    [00:00:26.000] DirectoryWatcher:: Added:: WatchInfo: /node_modules 1 undefined Project: project WatchType: Failed Lookup Locations
Info 8    [00:00:27.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /node_modules 1 undefined Project: project WatchType: Failed Lookup Locations
Info 9    [00:00:28.000] Finishing updateGraphWorker: Project: project Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 10   [00:00:29.000] Project 'project' (External)
Info 11   [00:00:30.000] 	Files (3)
	/a/lib/lib.d.ts Text-1 "/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }"
	/a/b/f1.js Text-1 "export let x = 5; import { s } from \"s\""
	/a/b/constructor.js Text-1 "const x = 10;"


	a/lib/lib.d.ts
	  Default library for target 'es5'
	a/b/f1.js
	  Root file specified for compilation
	a/b/constructor.js
	  Root file specified for compilation

Info 12   [00:00:31.000] -----------------------------------------------
Timeout callback:: count: 0
Immedidate callback:: count: 0

PolledWatches::
/node_modules: *new*
  {"pollingInterval":500}

FsWatches::
/a/b/f1.js: *new*
  {}
/a/b/constructor.js: *new*
  {}
/a/lib/lib.d.ts: *new*
  {}

FsWatchesRecursive::
/a: *new*
  {}
