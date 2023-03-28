currentDirectory:: / useCaseSensitiveFileNames: false
Info 0    [00:00:21.000] Provided types map file "/typesMap.json" doesn't exist
Creating project service
//// [/a/b/tsconfig.json]

                {
                    "compilerOptions": {},
                    "include": ["*.ts"]
                }

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

//// [/a/b/f1.ts]
let x = 1

//// [/a/b/f2.ts]
let y = 1

//// [/a/b/c/f3.ts]
let z = 1


Info 1    [00:00:22.000] Search path: /a/b
Info 2    [00:00:23.000] For info: /a/b/f1.ts :: Config file name: /a/b/tsconfig.json
Info 3    [00:00:24.000] Creating configuration project /a/b/tsconfig.json
Info 4    [00:00:25.000] FileWatcher:: Added:: WatchInfo: /a/b/tsconfig.json 2000 undefined Project: /a/b/tsconfig.json WatchType: Config file
Info 5    [00:00:26.000] Config: /a/b/tsconfig.json : {
 "rootNames": [
  "/a/b/f1.ts",
  "/a/b/f2.ts"
 ],
 "options": {
  "configFilePath": "/a/b/tsconfig.json"
 }
}
Info 6    [00:00:27.000] DirectoryWatcher:: Added:: WatchInfo: /a/b 0 undefined Config: /a/b/tsconfig.json WatchType: Wild card directory
Info 7    [00:00:28.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /a/b 0 undefined Config: /a/b/tsconfig.json WatchType: Wild card directory
Info 8    [00:00:29.000] FileWatcher:: Added:: WatchInfo: /a/b/f2.ts 500 undefined WatchType: Closed Script info
Info 9    [00:00:30.000] Starting updateGraphWorker: Project: /a/b/tsconfig.json
Info 10   [00:00:31.000] FileWatcher:: Added:: WatchInfo: /a/lib/lib.d.ts 500 undefined WatchType: Closed Script info
Info 11   [00:00:32.000] DirectoryWatcher:: Added:: WatchInfo: /a/b/node_modules/@types 1 undefined Project: /a/b/tsconfig.json WatchType: Type roots
Info 12   [00:00:33.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /a/b/node_modules/@types 1 undefined Project: /a/b/tsconfig.json WatchType: Type roots
Info 13   [00:00:34.000] Finishing updateGraphWorker: Project: /a/b/tsconfig.json Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 14   [00:00:35.000] Project '/a/b/tsconfig.json' (Configured)
Info 15   [00:00:36.000] 	Files (3)
	/a/lib/lib.d.ts Text-1 "/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }"
	/a/b/f1.ts SVC-1-0 "let x = 1"
	/a/b/f2.ts Text-1 "let y = 1"


	../lib/lib.d.ts
	  Default library for target 'es5'
	f1.ts
	  Matched by include pattern '*.ts' in 'tsconfig.json'
	f2.ts
	  Matched by include pattern '*.ts' in 'tsconfig.json'

Info 16   [00:00:37.000] -----------------------------------------------
Info 17   [00:00:38.000] Project '/a/b/tsconfig.json' (Configured)
Info 17   [00:00:39.000] 	Files (3)

Info 17   [00:00:40.000] -----------------------------------------------
Info 17   [00:00:41.000] Open files: 
Info 17   [00:00:42.000] 	FileName: /a/b/f1.ts ProjectRootPath: undefined
Info 17   [00:00:43.000] 		Projects: /a/b/tsconfig.json