currentDirectory:: / useCaseSensitiveFileNames: false
Info 0    [00:00:13.000] Provided types map file "/typesMap.json" doesn't exist
Creating project service
//// [/a/b/main.ts]
import { objA } from './obj-a';

//// [/a/b/obj-a.ts]
export const objA = Object.assign({foo: "bar"}, {bar: "baz"});

//// [/a/b/tsconfig.json]
{
                    "compilerOptions": {
                        "target": "es6"
                    },
                    "files": [ "main.ts" ]
                }


Info 1    [00:00:14.000] Search path: /a/b
Info 2    [00:00:15.000] For info: /a/b/main.ts :: Config file name: /a/b/tsconfig.json
Info 3    [00:00:16.000] Creating configuration project /a/b/tsconfig.json
Info 4    [00:00:17.000] FileWatcher:: Added:: WatchInfo: /a/b/tsconfig.json 2000 undefined Project: /a/b/tsconfig.json WatchType: Config file
Info 5    [00:00:18.000] Config: /a/b/tsconfig.json : {
 "rootNames": [
  "/a/b/main.ts"
 ],
 "options": {
  "target": 2,
  "configFilePath": "/a/b/tsconfig.json"
 }
}
Info 6    [00:00:19.000] Starting updateGraphWorker: Project: /a/b/tsconfig.json
Info 7    [00:00:20.000] FileWatcher:: Added:: WatchInfo: /a/b/obj-a.ts 500 undefined WatchType: Closed Script info
Info 8    [00:00:21.000] FileWatcher:: Added:: WatchInfo: /a/lib/lib.es6.d.ts 500 undefined Project: /a/b/tsconfig.json WatchType: Missing file
Info 9    [00:00:22.000] DirectoryWatcher:: Added:: WatchInfo: /a/b/node_modules/@types 1 undefined Project: /a/b/tsconfig.json WatchType: Type roots
Info 10   [00:00:23.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /a/b/node_modules/@types 1 undefined Project: /a/b/tsconfig.json WatchType: Type roots
Info 11   [00:00:24.000] Finishing updateGraphWorker: Project: /a/b/tsconfig.json Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 12   [00:00:25.000] Project '/a/b/tsconfig.json' (Configured)
Info 13   [00:00:26.000] 	Files (2)
	/a/b/obj-a.ts Text-1 "export const objA = Object.assign({foo: \"bar\"}, {bar: \"baz\"});"
	/a/b/main.ts SVC-1-0 "import { objA } from './obj-a';"


	obj-a.ts
	  Imported via './obj-a' from file 'main.ts'
	main.ts
	  Part of 'files' list in tsconfig.json

Info 14   [00:00:27.000] -----------------------------------------------
Info 15   [00:00:28.000] Project '/a/b/tsconfig.json' (Configured)
Info 15   [00:00:29.000] 	Files (2)

Info 15   [00:00:30.000] -----------------------------------------------
Info 15   [00:00:31.000] Open files: 
Info 15   [00:00:32.000] 	FileName: /a/b/main.ts ProjectRootPath: undefined
Info 15   [00:00:33.000] 		Projects: /a/b/tsconfig.json
Info 15   [00:00:34.000] FileWatcher:: Added:: WatchInfo: /a/b/main.ts 500 undefined WatchType: Closed Script info
Info 16   [00:00:35.000] Project '/a/b/tsconfig.json' (Configured)
Info 16   [00:00:36.000] 	Files (2)

Info 16   [00:00:37.000] -----------------------------------------------
Info 16   [00:00:38.000] Open files: 
Info 16   [00:00:39.000] FileWatcher:: Close:: WatchInfo: /a/b/obj-a.ts 500 undefined WatchType: Closed Script info
Info 17   [00:00:40.000] Search path: /a/b
Info 18   [00:00:41.000] For info: /a/b/obj-a.ts :: Config file name: /a/b/tsconfig.json
Info 19   [00:00:42.000] Project '/a/b/tsconfig.json' (Configured)
Info 19   [00:00:43.000] 	Files (2)

Info 19   [00:00:44.000] -----------------------------------------------
Info 19   [00:00:45.000] Open files: 
Info 19   [00:00:46.000] 	FileName: /a/b/obj-a.ts ProjectRootPath: undefined
Info 19   [00:00:47.000] 		Projects: /a/b/tsconfig.json