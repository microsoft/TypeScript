currentDirectory:: / useCaseSensitiveFileNames: false
Info 0    [00:00:33.000] Provided types map file "/a/lib/typesMap.json" doesn't exist
Before request
//// [/packages/app/tsconfig.json]

        {
            "compilerOptions": {
                "module": "commonjs",
                "outDir": "dist",
                "rootDir": "src",
                "baseUrl": "."
            }
            "references": [{ "path": "../dep" }]
        }

//// [/packages/app/src/index.ts]
import "dep/does/not/exist";

//// [/packages/dep/package.json]
{ "name": "dep", "main": "dist/index.js", "types": "dist/index.d.ts" }

//// [/packages/dep/tsconfig.json]

        {
            "compilerOptions": { "outDir": "dist", "rootDir": "src", "module": "commonjs" }
        }

//// [/packages/dep/src/index.ts]

        import "./sub/folder";

//// [/packages/dep/src/sub/folder/index.ts]
export const dep = 0;

//// [/packages/app/node_modules/dep] symlink(/packages/dep)

Info 1    [00:00:34.000] request:
    {
      "command": "open",
      "arguments": {
        "file": "/packages/app/src/index.ts"
      },
      "seq": 1,
      "type": "request"
    }
Info 2    [00:00:35.000] Search path: /packages/app/src
Info 3    [00:00:36.000] For info: /packages/app/src/index.ts :: Config file name: /packages/app/tsconfig.json
Info 4    [00:00:37.000] Creating configuration project /packages/app/tsconfig.json
Info 5    [00:00:38.000] FileWatcher:: Added:: WatchInfo: /packages/app/tsconfig.json 2000 undefined Project: /packages/app/tsconfig.json WatchType: Config file
Info 6    [00:00:39.000] Config: /packages/app/tsconfig.json : {
 "rootNames": [
  "/packages/app/src/index.ts"
 ],
 "options": {
  "module": 1,
  "outDir": "/packages/app/dist",
  "rootDir": "/packages/app/src",
  "baseUrl": "/packages/app",
  "configFilePath": "/packages/app/tsconfig.json"
 },
 "projectReferences": [
  {
   "path": "/packages/dep",
   "originalPath": "../dep"
  }
 ]
}
Info 7    [00:00:40.000] DirectoryWatcher:: Added:: WatchInfo: /packages/app 1 undefined Config: /packages/app/tsconfig.json WatchType: Wild card directory
Info 8    [00:00:41.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /packages/app 1 undefined Config: /packages/app/tsconfig.json WatchType: Wild card directory
Info 9    [00:00:42.000] Starting updateGraphWorker: Project: /packages/app/tsconfig.json
Info 10   [00:00:43.000] Config: /packages/dep/tsconfig.json : {
 "rootNames": [
  "/packages/dep/src/index.ts",
  "/packages/dep/src/sub/folder/index.ts"
 ],
 "options": {
  "outDir": "/packages/dep/dist",
  "rootDir": "/packages/dep/src",
  "module": 1,
  "configFilePath": "/packages/dep/tsconfig.json"
 }
}
Info 11   [00:00:44.000] FileWatcher:: Added:: WatchInfo: /packages/dep/tsconfig.json 2000 undefined Project: /packages/app/tsconfig.json WatchType: Config file
Info 12   [00:00:45.000] DirectoryWatcher:: Added:: WatchInfo: /packages/dep 1 undefined Config: /packages/dep/tsconfig.json WatchType: Wild card directory
Info 13   [00:00:46.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /packages/dep 1 undefined Config: /packages/dep/tsconfig.json WatchType: Wild card directory
Info 14   [00:00:47.000] DirectoryWatcher:: Added:: WatchInfo: /packages/app/dep 1 undefined Project: /packages/app/tsconfig.json WatchType: Failed Lookup Locations
Info 15   [00:00:48.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /packages/app/dep 1 undefined Project: /packages/app/tsconfig.json WatchType: Failed Lookup Locations
Info 16   [00:00:49.000] DirectoryWatcher:: Added:: WatchInfo: /packages/app/src 1 undefined Project: /packages/app/tsconfig.json WatchType: Failed Lookup Locations
Info 17   [00:00:50.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /packages/app/src 1 undefined Project: /packages/app/tsconfig.json WatchType: Failed Lookup Locations
Info 18   [00:00:51.000] DirectoryWatcher:: Added:: WatchInfo: /packages/app/node_modules 1 undefined Project: /packages/app/tsconfig.json WatchType: Failed Lookup Locations
Info 19   [00:00:52.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /packages/app/node_modules 1 undefined Project: /packages/app/tsconfig.json WatchType: Failed Lookup Locations
Info 20   [00:00:53.000] FileWatcher:: Added:: WatchInfo: /a/lib/lib.d.ts 500 undefined Project: /packages/app/tsconfig.json WatchType: Missing file
Info 21   [00:00:54.000] DirectoryWatcher:: Added:: WatchInfo: /packages/app/node_modules/@types 1 undefined Project: /packages/app/tsconfig.json WatchType: Type roots
Info 22   [00:00:55.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /packages/app/node_modules/@types 1 undefined Project: /packages/app/tsconfig.json WatchType: Type roots
Info 23   [00:00:56.000] Finishing updateGraphWorker: Project: /packages/app/tsconfig.json Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 24   [00:00:57.000] Project '/packages/app/tsconfig.json' (Configured)
Info 25   [00:00:58.000] 	Files (1)
	/packages/app/src/index.ts SVC-1-0 "import \"dep/does/not/exist\";"


	src/index.ts
	  Matched by default include pattern '**/*'

Info 26   [00:00:59.000] -----------------------------------------------
Info 27   [00:01:00.000] Project '/packages/app/tsconfig.json' (Configured)
Info 27   [00:01:01.000] 	Files (1)

Info 27   [00:01:02.000] -----------------------------------------------
Info 27   [00:01:03.000] Open files: 
Info 27   [00:01:04.000] 	FileName: /packages/app/src/index.ts ProjectRootPath: undefined
Info 27   [00:01:05.000] 		Projects: /packages/app/tsconfig.json
Info 27   [00:01:06.000] response:
    {
      "responseRequired": false
    }
After request

PolledWatches::
/packages/app/dep: *new*
  {"pollingInterval":500}
/a/lib/lib.d.ts: *new*
  {"pollingInterval":500}
/packages/app/node_modules/@types: *new*
  {"pollingInterval":500}

FsWatches::
/packages/app/tsconfig.json: *new*
  {}
/packages/dep/tsconfig.json: *new*
  {}

FsWatchesRecursive::
/packages/app: *new*
  {}
/packages/dep: *new*
  {}
/packages/app/src: *new*
  {}
/packages/app/node_modules: *new*
  {}
