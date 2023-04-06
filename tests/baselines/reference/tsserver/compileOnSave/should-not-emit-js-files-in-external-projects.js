currentDirectory:: / useCaseSensitiveFileNames: false
Info 0    [00:00:17.000] Provided types map file "/a/lib/typesMap.json" doesn't exist
Before request
//// [/a/b/file1.ts]
consonle.log('file1');

//// [/a/b/file2.js]
console.log'file2');

//// [/a/b/file3.js]
console.log('file3');

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


Info 1    [00:00:18.000] request:
    {
      "command": "openExternalProject",
      "arguments": {
        "rootFiles": [
          {
            "fileName": "/a/b/file1.ts"
          },
          {
            "fileName": "/a/b/file2.js"
          }
        ],
        "options": {
          "allowJs": true,
          "outFile": "dist.js",
          "compileOnSave": true
        },
        "projectFileName": "/a/b/externalproject"
      },
      "seq": 1,
      "type": "request"
    }
Info 2    [00:00:19.000] FileWatcher:: Added:: WatchInfo: /a/b/file1.ts 500 undefined WatchType: Closed Script info
Info 3    [00:00:20.000] FileWatcher:: Added:: WatchInfo: /a/b/file2.js 500 undefined WatchType: Closed Script info
Info 4    [00:00:21.000] Starting updateGraphWorker: Project: /a/b/externalproject
Info 5    [00:00:22.000] FileWatcher:: Added:: WatchInfo: /a/lib/lib.d.ts 500 undefined WatchType: Closed Script info
Info 6    [00:00:23.000] DirectoryWatcher:: Added:: WatchInfo: /a/b/node_modules/@types 1 undefined Project: /a/b/externalproject WatchType: Type roots
Info 7    [00:00:24.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /a/b/node_modules/@types 1 undefined Project: /a/b/externalproject WatchType: Type roots
Info 8    [00:00:25.000] Finishing updateGraphWorker: Project: /a/b/externalproject Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 9    [00:00:26.000] Project '/a/b/externalproject' (External)
Info 10   [00:00:27.000] 	Files (3)
	/a/lib/lib.d.ts Text-1 "/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }"
	/a/b/file1.ts Text-1 "consonle.log('file1');"
	/a/b/file2.js Text-1 "console.log'file2');"


	../lib/lib.d.ts
	  Default library for target 'es5'
	file1.ts
	  Root file specified for compilation
	file2.js
	  Root file specified for compilation

Info 11   [00:00:28.000] -----------------------------------------------
Info 12   [00:00:29.000] response:
    {
      "response": true,
      "responseRequired": true
    }
After request

PolledWatches::
/a/b/node_modules/@types: *new*
  {"pollingInterval":500}

FsWatches::
/a/b/file1.ts: *new*
  {}
/a/b/file2.js: *new*
  {}
/a/lib/lib.d.ts: *new*
  {}

Before request

Info 13   [00:00:30.000] request:
    {
      "command": "compileOnSaveEmitFile",
      "arguments": {
        "file": "/a/b/file1.ts"
      },
      "seq": 2,
      "type": "request"
    }
Info 14   [00:00:33.000] response:
    {
      "response": true,
      "responseRequired": true
    }
After request
//// [/a/b/dist.js]
consonle.log('file1');


