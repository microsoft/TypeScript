Info 0    [00:00:17.000] Provided types map file "/typesMap.json" doesn't exist
Creating project service
//// [/a/app.js]
let x = 1;

//// [/a/largefile.js]


//// [/a/extremlylarge.d.ts]


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

//// [/a/jsconfig.json]
{}


Info 1    [00:00:18.000] Search path: /a
Info 2    [00:00:19.000] For info: /a/app.js :: Config file name: /a/jsconfig.json
Info 3    [00:00:20.000] Creating configuration project /a/jsconfig.json
Info 4    [00:00:21.000] FileWatcher:: Added:: WatchInfo: /a/jsconfig.json 2000 undefined Project: /a/jsconfig.json WatchType: Config file
Info 5    [00:00:22.000] Config: /a/jsconfig.json : {
 "rootNames": [
  "/a/app.js",
  "/a/extremlylarge.d.ts",
  "/a/largefile.js",
  "/a/lib/lib.d.ts"
 ],
 "options": {
  "allowJs": true,
  "maxNodeModuleJsDepth": 2,
  "allowSyntheticDefaultImports": true,
  "skipLibCheck": true,
  "noEmit": true,
  "configFilePath": "/a/jsconfig.json"
 }
}
Info 6    [00:00:23.000] Non TS file size exceeded limit (20971531). Largest files: /a/largefile.js:20971521, /a/app.js:10
Info 7    [00:00:24.000] FileWatcher:: Added:: WatchInfo: /a/extremlylarge.d.ts 500 undefined WatchType: Closed Script info
Info 8    [00:00:25.000] FileWatcher:: Added:: WatchInfo: /a/largefile.js 500 undefined WatchType: Closed Script info
Info 9    [00:00:26.000] FileWatcher:: Added:: WatchInfo: /a/lib/lib.d.ts 500 undefined WatchType: Closed Script info
Info 10   [00:00:27.000] Starting updateGraphWorker: Project: /a/jsconfig.json
Info 11   [00:00:28.000] Finishing updateGraphWorker: Project: /a/jsconfig.json Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 12   [00:00:29.000] Project '/a/jsconfig.json' (Configured)
Info 13   [00:00:30.000] 	Files (2)
	/a/lib/lib.d.ts Text-1 "/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }"
	/a/app.js SVC-1-0 "let x = 1;"


	lib/lib.d.ts
	  Default library for target 'es5'
	app.js
	  Matched by default include pattern '**/*'

Info 14   [00:00:31.000] -----------------------------------------------
Info 15   [00:00:32.000] Project '/a/jsconfig.json' (Configured)
Info 15   [00:00:33.000] 	Files (2)

Info 15   [00:00:34.000] -----------------------------------------------
Info 15   [00:00:35.000] Open files: 
Info 15   [00:00:36.000] 	FileName: /a/app.js ProjectRootPath: undefined
Info 15   [00:00:37.000] 		Projects: /a/jsconfig.json
Info 15   [00:00:38.000] languageServiceEnabled: false
Info 16   [00:00:39.000] lastFileExceededProgramSize: /a/largefile.js