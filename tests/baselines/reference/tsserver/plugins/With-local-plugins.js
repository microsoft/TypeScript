currentDirectory:: / useCaseSensitiveFileNames: false
Info 0    [00:00:13.000] Provided types map file "/a/lib/typesMap.json" doesn't exist
Before request
//// [/a.ts]
class c { prop = "hello"; foo() { return this.prop; } }

//// [/tsconfig.json]
{"compilerOptions":{"plugins":[{"name":"@myscoped/plugin"},{"name":"unscopedPlugin"},{"name":"../myPlugin"},{"name":"myPlugin/../malicious"},{"transform":"some-transform"}]}}

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


Info 1    [00:00:14.000] request:
    {
      "command": "open",
      "arguments": {
        "file": "/a.ts"
      },
      "seq": 1,
      "type": "request"
    }
Info 2    [00:00:15.000] Search path: /
Info 3    [00:00:16.000] For info: /a.ts :: Config file name: /tsconfig.json
Info 4    [00:00:17.000] Creating configuration project /tsconfig.json
Info 5    [00:00:18.000] FileWatcher:: Added:: WatchInfo: /tsconfig.json 2000 undefined Project: /tsconfig.json WatchType: Config file
Info 6    [00:00:19.000] Config: /tsconfig.json : {
 "rootNames": [
  "/a.ts",
  "/a/lib/lib.d.ts"
 ],
 "options": {
  "plugins": [
   {
    "name": "@myscoped/plugin"
   },
   {
    "name": "unscopedPlugin"
   },
   {
    "name": "../myPlugin"
   },
   {
    "name": "myPlugin/../malicious"
   },
   {
    "transform": "some-transform"
   }
  ],
  "configFilePath": "/tsconfig.json"
 }
}
Info 7    [00:00:20.000] DirectoryWatcher:: Added:: WatchInfo:  1 undefined Config: /tsconfig.json WatchType: Wild card directory
Info 8    [00:00:21.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo:  1 undefined Config: /tsconfig.json WatchType: Wild card directory
Info 9    [00:00:22.000] Enabling plugin @myscoped/plugin from candidate paths: /a/lib/tsc.js/../../..
Info 10   [00:00:23.000] Loading @myscoped/plugin from /a/lib/tsc.js/../../.. (resolved to /a/lib/tsc.js/../../../node_modules)
Loading plugin: @myscoped/plugin
Info 11   [00:00:24.000] Plugin validation succeeded
Info 12   [00:00:25.000] Enabling plugin unscopedPlugin from candidate paths: /a/lib/tsc.js/../../..
Info 13   [00:00:26.000] Loading unscopedPlugin from /a/lib/tsc.js/../../.. (resolved to /a/lib/tsc.js/../../../node_modules)
Loading plugin: unscopedPlugin
Info 14   [00:00:27.000] Plugin activation failed: Error: Protocol handler already exists for command "testProtocolCommand"
Info 15   [00:00:28.000] Enabling plugin ../myPlugin from candidate paths: /a/lib/tsc.js/../../..
Info 16   [00:00:29.000] Skipped loading plugin ../myPlugin because only package name is allowed plugin name
Info 17   [00:00:30.000] Enabling plugin myPlugin/../malicious from candidate paths: /a/lib/tsc.js/../../..
Info 18   [00:00:31.000] Skipped loading plugin myPlugin/../malicious because only package name is allowed plugin name
Info 19   [00:00:32.000] Enabling plugin undefined from candidate paths: /a/lib/tsc.js/../../..
Info 20   [00:00:33.000] Skipped loading plugin {"transform":"some-transform"} because only package name is allowed plugin name
Info 21   [00:00:34.000] FileWatcher:: Added:: WatchInfo: /a/lib/lib.d.ts 500 undefined WatchType: Closed Script info
Info 22   [00:00:35.000] Starting updateGraphWorker: Project: /tsconfig.json
Info 23   [00:00:36.000] Finishing updateGraphWorker: Project: /tsconfig.json Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 24   [00:00:37.000] Project '/tsconfig.json' (Configured)
Info 25   [00:00:38.000] 	Files (2)
	/a.ts SVC-1-0 "class c { prop = \"hello\"; foo() { return this.prop; } }"
	/a/lib/lib.d.ts Text-1 "/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }"


	a.ts
	  Matched by default include pattern '**/*'
	a/lib/lib.d.ts
	  Matched by default include pattern '**/*'

Info 26   [00:00:39.000] -----------------------------------------------
Info 27   [00:00:40.000] Project '/tsconfig.json' (Configured)
Info 27   [00:00:41.000] 	Files (2)

Info 27   [00:00:42.000] -----------------------------------------------
Info 27   [00:00:43.000] Open files: 
Info 27   [00:00:44.000] 	FileName: /a.ts ProjectRootPath: undefined
Info 27   [00:00:45.000] 		Projects: /tsconfig.json
Info 27   [00:00:46.000] response:
    {
      "responseRequired": false
    }
After request

FsWatches::
/tsconfig.json: *new*
  {}
/a/lib/lib.d.ts: *new*
  {}

FsWatchesRecursive::
/: *new*
  {}
