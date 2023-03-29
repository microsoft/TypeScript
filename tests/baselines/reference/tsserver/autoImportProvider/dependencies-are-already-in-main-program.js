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
import '@angular/forms';


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
Info 10   [00:00:29.000] DirectoryWatcher:: Added:: WatchInfo: /node_modules 1 undefined WatchType: node_modules for closed script infos and package.jsons affecting module specifier cache
Info 11   [00:00:30.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /node_modules 1 undefined WatchType: node_modules for closed script infos and package.jsons affecting module specifier cache
Info 12   [00:00:31.000] DirectoryWatcher:: Added:: WatchInfo: /node_modules 1 undefined Project: /tsconfig.json WatchType: Failed Lookup Locations
Info 13   [00:00:32.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /node_modules 1 undefined Project: /tsconfig.json WatchType: Failed Lookup Locations
Info 14   [00:00:33.000] FileWatcher:: Added:: WatchInfo: /node_modules/@angular/forms/package.json 2000 undefined Project: /tsconfig.json WatchType: File location affecting resolution
Info 15   [00:00:34.000] FileWatcher:: Added:: WatchInfo: /a/lib/lib.d.ts 500 undefined Project: /tsconfig.json WatchType: Missing file
Info 16   [00:00:35.000] Finishing updateGraphWorker: Project: /tsconfig.json Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 17   [00:00:36.000] Project '/tsconfig.json' (Configured)
Info 18   [00:00:37.000] 	Files (2)
	/node_modules/@angular/forms/forms.d.ts Text-1 "export declare class PatternValidator {}"
	/index.ts SVC-1-0 "import '@angular/forms';"


	node_modules/@angular/forms/forms.d.ts
	  Imported via '@angular/forms' from file 'index.ts'
	index.ts
	  Matched by default include pattern '**/*'

Info 19   [00:00:38.000] -----------------------------------------------
Info 20   [00:00:39.000] FileWatcher:: Added:: WatchInfo: /package.json 250 undefined WatchType: package.json file
Info 21   [00:00:40.000] Project '/tsconfig.json' (Configured)
Info 21   [00:00:41.000] 	Files (2)

Info 21   [00:00:42.000] -----------------------------------------------
Info 21   [00:00:43.000] Open files: 
Info 21   [00:00:44.000] 	FileName: /index.ts ProjectRootPath: undefined
Info 21   [00:00:45.000] 		Projects: /tsconfig.json
Info 21   [00:00:46.000] response:
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
/node_modules/@angular/forms/package.json: *new*
  {}
/package.json: *new*
  {}

FsWatchesRecursive::
/: *new*
  {}
/node_modules: *new*
  {}
