currentDirectory:: / useCaseSensitiveFileNames: false
Info 0    [00:00:19.000] Provided types map file "/a/lib/typesMap.json" doesn't exist
Before request
//// [/node_modules/@angular/forms/forms.d.ts]
export declare class PatternValidator {}

//// [/node_modules/@angular/forms/package.json]
{ "name": "@angular/forms", "typings": "./forms.d.ts" }

//// [/tsconfig.json]
{ "compilerOptions": { "module": "commonjs" } }

//// [/package.json]
{ "dependencies": { "@angular/forms": "*", "@angular/core": "*" } }

//// [/index.ts]



Info 1    [00:00:20.000] request:
    {
      "command": "open",
      "arguments": {
        "file": "/index.ts"
      },
      "seq": 1,
      "type": "request"
    }
Info 2    [00:00:21.000] Search path: /
Info 3    [00:00:22.000] For info: /index.ts :: Config file name: /tsconfig.json
Info 4    [00:00:23.000] Creating configuration project /tsconfig.json
Info 5    [00:00:24.000] FileWatcher:: Added:: WatchInfo: /tsconfig.json 2000 undefined Project: /tsconfig.json WatchType: Config file
Info 6    [00:00:25.000] Config: /tsconfig.json : {
 "rootNames": [
  "/index.ts"
 ],
 "options": {
  "module": 1,
  "configFilePath": "/tsconfig.json"
 }
}
Info 7    [00:00:26.000] DirectoryWatcher:: Added:: WatchInfo:  1 undefined Config: /tsconfig.json WatchType: Wild card directory
Info 8    [00:00:27.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo:  1 undefined Config: /tsconfig.json WatchType: Wild card directory
Info 9    [00:00:28.000] Starting updateGraphWorker: Project: /tsconfig.json
Info 10   [00:00:29.000] FileWatcher:: Added:: WatchInfo: /a/lib/lib.d.ts 500 undefined Project: /tsconfig.json WatchType: Missing file
Info 11   [00:00:30.000] Finishing updateGraphWorker: Project: /tsconfig.json Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 12   [00:00:31.000] Project '/tsconfig.json' (Configured)
Info 13   [00:00:32.000] 	Files (1)
	/index.ts SVC-1-0 ""


	index.ts
	  Matched by default include pattern '**/*'

Info 14   [00:00:33.000] -----------------------------------------------
Info 15   [00:00:34.000] FileWatcher:: Added:: WatchInfo: /package.json 250 undefined WatchType: package.json file
Info 16   [00:00:35.000] AutoImportProviderProject: found 1 root files in 1 dependencies in * ms
Info 17   [00:00:36.000] DirectoryWatcher:: Added:: WatchInfo: /node_modules 1 undefined WatchType: node_modules for closed script infos and package.jsons affecting module specifier cache
Info 18   [00:00:37.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /node_modules 1 undefined WatchType: node_modules for closed script infos and package.jsons affecting module specifier cache
Info 19   [00:00:38.000] Starting updateGraphWorker: Project: /dev/null/autoImportProviderProject1*
Info 20   [00:00:39.000] Finishing updateGraphWorker: Project: /dev/null/autoImportProviderProject1* Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 21   [00:00:40.000] Project '/dev/null/autoImportProviderProject1*' (AutoImportProvider)
Info 22   [00:00:41.000] 	Files (1)
	/node_modules/@angular/forms/forms.d.ts Text-1 "export declare class PatternValidator {}"


	node_modules/@angular/forms/forms.d.ts
	  Root file specified for compilation

Info 23   [00:00:42.000] -----------------------------------------------
Info 24   [00:00:43.000] Project '/tsconfig.json' (Configured)
Info 24   [00:00:44.000] 	Files (1)

Info 24   [00:00:45.000] -----------------------------------------------
Info 24   [00:00:46.000] Project '/dev/null/autoImportProviderProject1*' (AutoImportProvider)
Info 24   [00:00:47.000] 	Files (1)

Info 24   [00:00:48.000] -----------------------------------------------
Info 24   [00:00:49.000] Open files: 
Info 24   [00:00:50.000] 	FileName: /index.ts ProjectRootPath: undefined
Info 24   [00:00:51.000] 		Projects: /tsconfig.json
Info 24   [00:00:52.000] response:
    {
      "responseRequired": false
    }
After request

PolledWatches::
/a/lib/lib.d.ts: *new*
  {"pollingInterval":500}

FsWatches::
/tsconfig.json: *new*
  {}
/package.json: *new*
  {}

FsWatchesRecursive::
/: *new*
  {}
/node_modules: *new*
  {}

Info 25   [00:00:53.000] DirectoryWatcher:: Close:: WatchInfo:  1 undefined Config: /tsconfig.json WatchType: Wild card directory
Info 26   [00:00:54.000] Elapsed:: *ms DirectoryWatcher:: Close:: WatchInfo:  1 undefined Config: /tsconfig.json WatchType: Wild card directory
Info 27   [00:00:55.000] FileWatcher:: Close:: WatchInfo: /tsconfig.json 2000 undefined Project: /tsconfig.json WatchType: Config file
Info 28   [00:00:56.000] FileWatcher:: Close:: WatchInfo: /a/lib/lib.d.ts 500 undefined Project: /tsconfig.json WatchType: Missing file