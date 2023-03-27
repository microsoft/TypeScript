currentDirectory:: / useCaseSensitiveFileNames: false
Info 0    [00:00:17.000] Provided types map file "/typesMap.json" doesn't exist
Creating project service
//// [/a/b/main.ts]
let x =1;

//// [/a/b/main2.ts]
let y =1;

//// [/a/b/tsconfig.json]
{
                    "compilerOptions": {
                        "target": "es6"
                    },
                    "files": [ "main.ts", "main2.ts" ]
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


Info 1    [00:00:18.000] Search path: /a/b
Info 2    [00:00:19.000] For info: /a/b/main.ts :: Config file name: /a/b/tsconfig.json
Info 3    [00:00:20.000] Creating configuration project /a/b/tsconfig.json
Info 4    [00:00:21.000] FileWatcher:: Added:: WatchInfo: /a/b/tsconfig.json 2000 undefined Project: /a/b/tsconfig.json WatchType: Config file
Info 5    [00:00:22.000] Config: /a/b/tsconfig.json : {
 "rootNames": [
  "/a/b/main.ts",
  "/a/b/main2.ts"
 ],
 "options": {
  "target": 2,
  "configFilePath": "/a/b/tsconfig.json"
 }
}
Info 6    [00:00:23.000] FileWatcher:: Added:: WatchInfo: /a/b/main2.ts 500 undefined WatchType: Closed Script info
Info 7    [00:00:24.000] Starting updateGraphWorker: Project: /a/b/tsconfig.json
Info 8    [00:00:25.000] FileWatcher:: Added:: WatchInfo: /a/lib/lib.es6.d.ts 500 undefined Project: /a/b/tsconfig.json WatchType: Missing file
Info 9    [00:00:26.000] DirectoryWatcher:: Added:: WatchInfo: /a/b/node_modules/@types 1 undefined Project: /a/b/tsconfig.json WatchType: Type roots
Info 10   [00:00:27.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /a/b/node_modules/@types 1 undefined Project: /a/b/tsconfig.json WatchType: Type roots
Info 11   [00:00:28.000] Finishing updateGraphWorker: Project: /a/b/tsconfig.json Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 12   [00:00:29.000] Project '/a/b/tsconfig.json' (Configured)
Info 13   [00:00:30.000] 	Files (2)
	/a/b/main.ts SVC-1-0 "let x =1;"
	/a/b/main2.ts Text-1 "let y =1;"


	main.ts
	  Part of 'files' list in tsconfig.json
	main2.ts
	  Part of 'files' list in tsconfig.json

Info 14   [00:00:31.000] -----------------------------------------------
Info 15   [00:00:32.000] Project '/a/b/tsconfig.json' (Configured)
Info 15   [00:00:33.000] 	Files (2)

Info 15   [00:00:34.000] -----------------------------------------------
Info 15   [00:00:35.000] Open files: 
Info 15   [00:00:36.000] 	FileName: /a/b/main.ts ProjectRootPath: undefined
Info 15   [00:00:37.000] 		Projects: /a/b/tsconfig.json
Configured project: /a/b/tsconfig.json hasOpenRef:: true isClosed: false
Info 15   [00:00:38.000] FileWatcher:: Added:: WatchInfo: /a/b/main.ts 500 undefined WatchType: Closed Script info
Info 16   [00:00:39.000] Project '/a/b/tsconfig.json' (Configured)
Info 16   [00:00:40.000] 	Files (2)

Info 16   [00:00:41.000] -----------------------------------------------
Info 16   [00:00:42.000] Open files: 
Configured project: /a/b/tsconfig.json hasOpenRef:: false isClosed: false
Info 16   [00:00:43.000] FileWatcher:: Close:: WatchInfo: /a/b/main2.ts 500 undefined WatchType: Closed Script info
Info 17   [00:00:44.000] Search path: /a/b
Info 18   [00:00:45.000] For info: /a/b/main2.ts :: Config file name: /a/b/tsconfig.json
Info 19   [00:00:46.000] Project '/a/b/tsconfig.json' (Configured)
Info 19   [00:00:47.000] 	Files (2)

Info 19   [00:00:48.000] -----------------------------------------------
Info 19   [00:00:49.000] Open files: 
Info 19   [00:00:50.000] 	FileName: /a/b/main2.ts ProjectRootPath: undefined
Info 19   [00:00:51.000] 		Projects: /a/b/tsconfig.json
Configured project: /a/b/tsconfig.json hasOpenRef:: true isClosed: false