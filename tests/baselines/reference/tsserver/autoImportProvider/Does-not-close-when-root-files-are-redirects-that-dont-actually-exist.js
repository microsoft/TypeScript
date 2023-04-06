currentDirectory:: / useCaseSensitiveFileNames: false
Info 0    [00:00:23.000] Provided types map file "/a/lib/typesMap.json" doesn't exist
Before request
//// [/packages/a/package.json]
{ "dependencies": { "b": "*" } }

//// [/packages/a/tsconfig.json]
{ "compilerOptions": { "composite": true }, "references": [{ "path": "./node_modules/b" }] }

//// [/packages/a/index.ts]


//// [/packages/a/node_modules/b/package.json]
{ "types": "dist/index.d.ts" }

//// [/packages/a/node_modules/b/tsconfig.json]
{ "compilerOptions": { "composite": true, "outDir": "dist" } }

//// [/packages/a/node_modules/b/index.ts]
export class B {}


Info 1    [00:00:24.000] request:
    {
      "command": "open",
      "arguments": {
        "file": "/packages/a/index.ts"
      },
      "seq": 1,
      "type": "request"
    }
Info 2    [00:00:25.000] Search path: /packages/a
Info 3    [00:00:26.000] For info: /packages/a/index.ts :: Config file name: /packages/a/tsconfig.json
Info 4    [00:00:27.000] Creating configuration project /packages/a/tsconfig.json
Info 5    [00:00:28.000] FileWatcher:: Added:: WatchInfo: /packages/a/tsconfig.json 2000 undefined Project: /packages/a/tsconfig.json WatchType: Config file
Info 6    [00:00:29.000] Config: /packages/a/tsconfig.json : {
 "rootNames": [
  "/packages/a/index.ts"
 ],
 "options": {
  "composite": true,
  "configFilePath": "/packages/a/tsconfig.json"
 },
 "projectReferences": [
  {
   "path": "/packages/a/node_modules/b",
   "originalPath": "./node_modules/b"
  }
 ]
}
Info 7    [00:00:30.000] DirectoryWatcher:: Added:: WatchInfo: /packages/a 1 undefined Config: /packages/a/tsconfig.json WatchType: Wild card directory
Info 8    [00:00:31.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /packages/a 1 undefined Config: /packages/a/tsconfig.json WatchType: Wild card directory
Info 9    [00:00:32.000] Starting updateGraphWorker: Project: /packages/a/tsconfig.json
Info 10   [00:00:33.000] Config: /packages/a/node_modules/b/tsconfig.json : {
 "rootNames": [
  "/packages/a/node_modules/b/index.ts"
 ],
 "options": {
  "composite": true,
  "outDir": "/packages/a/node_modules/b/dist",
  "configFilePath": "/packages/a/node_modules/b/tsconfig.json"
 }
}
Info 11   [00:00:34.000] FileWatcher:: Added:: WatchInfo: /packages/a/node_modules/b/tsconfig.json 2000 undefined Project: /packages/a/tsconfig.json WatchType: Config file
Info 12   [00:00:35.000] DirectoryWatcher:: Added:: WatchInfo: /packages/a/node_modules/b 1 undefined Config: /packages/a/node_modules/b/tsconfig.json WatchType: Wild card directory
Info 13   [00:00:36.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /packages/a/node_modules/b 1 undefined Config: /packages/a/node_modules/b/tsconfig.json WatchType: Wild card directory
Info 14   [00:00:37.000] FileWatcher:: Added:: WatchInfo: /a/lib/lib.d.ts 500 undefined Project: /packages/a/tsconfig.json WatchType: Missing file
Info 15   [00:00:38.000] DirectoryWatcher:: Added:: WatchInfo: /packages/a/node_modules/@types 1 undefined Project: /packages/a/tsconfig.json WatchType: Type roots
Info 16   [00:00:39.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /packages/a/node_modules/@types 1 undefined Project: /packages/a/tsconfig.json WatchType: Type roots
Info 17   [00:00:40.000] Finishing updateGraphWorker: Project: /packages/a/tsconfig.json Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 18   [00:00:41.000] Project '/packages/a/tsconfig.json' (Configured)
Info 19   [00:00:42.000] 	Files (1)
	/packages/a/index.ts SVC-1-0 ""


	index.ts
	  Matched by default include pattern '**/*'

Info 20   [00:00:43.000] -----------------------------------------------
Info 21   [00:00:44.000] FileWatcher:: Added:: WatchInfo: /packages/a/package.json 250 undefined WatchType: package.json file
Info 22   [00:00:45.000] AutoImportProviderProject: found 1 root files in 1 dependencies in * ms
Info 23   [00:00:46.000] Starting updateGraphWorker: Project: /dev/null/autoImportProviderProject1*
Info 24   [00:00:47.000] DirectoryWatcher:: Added:: WatchInfo: /packages/a/node_modules 1 undefined WatchType: node_modules for closed script infos and package.jsons affecting module specifier cache
Info 25   [00:00:48.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /packages/a/node_modules 1 undefined WatchType: node_modules for closed script infos and package.jsons affecting module specifier cache
Info 26   [00:00:49.000] Finishing updateGraphWorker: Project: /dev/null/autoImportProviderProject1* Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 27   [00:00:50.000] Project '/dev/null/autoImportProviderProject1*' (AutoImportProvider)
Info 28   [00:00:51.000] 	Files (1)
	/packages/a/node_modules/b/index.ts Text-1 "export class B {}"


	node_modules/b/index.ts
	  Root file specified for compilation

Info 29   [00:00:52.000] -----------------------------------------------
Info 30   [00:00:53.000] Search path: /packages/a
Info 31   [00:00:54.000] For info: /packages/a/tsconfig.json :: No config files found.
Info 32   [00:00:55.000] Project '/packages/a/tsconfig.json' (Configured)
Info 32   [00:00:56.000] 	Files (1)

Info 32   [00:00:57.000] -----------------------------------------------
Info 32   [00:00:58.000] Project '/dev/null/autoImportProviderProject1*' (AutoImportProvider)
Info 32   [00:00:59.000] 	Files (1)

Info 32   [00:01:00.000] -----------------------------------------------
Info 32   [00:01:01.000] Open files: 
Info 32   [00:01:02.000] 	FileName: /packages/a/index.ts ProjectRootPath: undefined
Info 32   [00:01:03.000] 		Projects: /packages/a/tsconfig.json
Info 32   [00:01:04.000] response:
    {
      "responseRequired": false
    }
After request

PolledWatches::
/a/lib/lib.d.ts: *new*
  {"pollingInterval":500}
/packages/a/node_modules/@types: *new*
  {"pollingInterval":500}

FsWatches::
/packages/a/tsconfig.json: *new*
  {}
/packages/a/node_modules/b/tsconfig.json: *new*
  {}
/packages/a/package.json: *new*
  {}

FsWatchesRecursive::
/packages/a: *new*
  {}
/packages/a/node_modules/b: *new*
  {}
/packages/a/node_modules: *new*
  {}
