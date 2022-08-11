Provided types map file "/typesMap.json" doesn't exist
Search path: /user/username/projects/myproject/product/src
For info: /user/username/projects/myproject/product/src/file1.ts :: Config file name: /user/username/projects/myproject/tsconfig.json
Creating configuration project /user/username/projects/myproject/tsconfig.json
FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/tsconfig.json 2000 undefined Project: /user/username/projects/myproject/tsconfig.json WatchType: Config file
Config: /user/username/projects/myproject/tsconfig.json : {
 "rootNames": [
  "/user/username/projects/myproject/product/src/file1.ts",
  "/user/username/projects/myproject/product/src/feature/file2.ts",
  "/user/username/projects/myproject/product/test/file4.ts",
  "/user/username/projects/myproject/product/test/src/file3.ts"
 ],
 "options": {
  "traceResolution": true,
  "configFilePath": "/user/username/projects/myproject/tsconfig.json"
 }
}
DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject 1 undefined Config: /user/username/projects/myproject/tsconfig.json WatchType: Wild card directory
Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject 1 undefined Config: /user/username/projects/myproject/tsconfig.json WatchType: Wild card directory
Plugins were requested but not running in environment that supports 'require'. Nothing will be loaded
FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/product/src/feature/file2.ts 500 undefined WatchType: Closed Script info
FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/product/test/file4.ts 500 undefined WatchType: Closed Script info
FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/product/test/src/file3.ts 500 undefined WatchType: Closed Script info
Starting updateGraphWorker: Project: /user/username/projects/myproject/tsconfig.json
======== Resolving module 'module1' from '/user/username/projects/myproject/product/src/file1.ts'. ========
Module resolution kind is not specified, using 'NodeJs'.
Loading module 'module1' from 'node_modules' folder, target file type 'TypeScript'.
Directory '/user/username/projects/myproject/product/src/node_modules' does not exist, skipping all lookups in it.
File '/user/username/projects/myproject/product/node_modules/module1/package.json' does not exist.
File '/user/username/projects/myproject/product/node_modules/module1.ts' does not exist.
File '/user/username/projects/myproject/product/node_modules/module1.tsx' does not exist.
File '/user/username/projects/myproject/product/node_modules/module1.d.ts' does not exist.
File '/user/username/projects/myproject/product/node_modules/module1/index.ts' exist - use it as a name resolution result.
Resolving real path for '/user/username/projects/myproject/product/node_modules/module1/index.ts', result '/user/username/projects/myproject/product/node_modules/module1/index.ts'.
======== Module name 'module1' was successfully resolved to '/user/username/projects/myproject/product/node_modules/module1/index.ts'. ========
======== Resolving module 'module2' from '/user/username/projects/myproject/product/src/file1.ts'. ========
Module resolution kind is not specified, using 'NodeJs'.
Loading module 'module2' from 'node_modules' folder, target file type 'TypeScript'.
Directory '/user/username/projects/myproject/product/src/node_modules' does not exist, skipping all lookups in it.
File '/user/username/projects/myproject/product/node_modules/module2.ts' does not exist.
File '/user/username/projects/myproject/product/node_modules/module2.tsx' does not exist.
File '/user/username/projects/myproject/product/node_modules/module2.d.ts' does not exist.
Directory '/user/username/projects/myproject/product/node_modules/@types' does not exist, skipping all lookups in it.
File '/user/username/projects/myproject/node_modules/module2/package.json' does not exist.
File '/user/username/projects/myproject/node_modules/module2.ts' does not exist.
File '/user/username/projects/myproject/node_modules/module2.tsx' does not exist.
File '/user/username/projects/myproject/node_modules/module2.d.ts' does not exist.
File '/user/username/projects/myproject/node_modules/module2/index.ts' exist - use it as a name resolution result.
Resolving real path for '/user/username/projects/myproject/node_modules/module2/index.ts', result '/user/username/projects/myproject/node_modules/module2/index.ts'.
======== Module name 'module2' was successfully resolved to '/user/username/projects/myproject/node_modules/module2/index.ts'. ========
DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/product/node_modules 1 undefined WatchType: node_modules for closed script infos and package.jsons affecting module specifier cache
Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/product/node_modules 1 undefined WatchType: node_modules for closed script infos and package.jsons affecting module specifier cache
DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules 1 undefined WatchType: node_modules for closed script infos and package.jsons affecting module specifier cache
Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules 1 undefined WatchType: node_modules for closed script infos and package.jsons affecting module specifier cache
======== Resolving module 'module1' from '/user/username/projects/myproject/product/src/feature/file2.ts'. ========
Module resolution kind is not specified, using 'NodeJs'.
Loading module 'module1' from 'node_modules' folder, target file type 'TypeScript'.
Directory '/user/username/projects/myproject/product/src/feature/node_modules' does not exist, skipping all lookups in it.
Resolution for module 'module1' was found in cache from location '/user/username/projects/myproject/product/src'.
======== Module name 'module1' was successfully resolved to '/user/username/projects/myproject/product/node_modules/module1/index.ts'. ========
======== Resolving module 'module2' from '/user/username/projects/myproject/product/src/feature/file2.ts'. ========
Module resolution kind is not specified, using 'NodeJs'.
Loading module 'module2' from 'node_modules' folder, target file type 'TypeScript'.
Directory '/user/username/projects/myproject/product/src/feature/node_modules' does not exist, skipping all lookups in it.
Resolution for module 'module2' was found in cache from location '/user/username/projects/myproject/product/src'.
======== Module name 'module2' was successfully resolved to '/user/username/projects/myproject/node_modules/module2/index.ts'. ========
======== Resolving module 'module1' from '/user/username/projects/myproject/product/test/file4.ts'. ========
Module resolution kind is not specified, using 'NodeJs'.
Loading module 'module1' from 'node_modules' folder, target file type 'TypeScript'.
Directory '/user/username/projects/myproject/product/test/node_modules' does not exist, skipping all lookups in it.
Resolution for module 'module1' was found in cache from location '/user/username/projects/myproject/product'.
======== Module name 'module1' was successfully resolved to '/user/username/projects/myproject/product/node_modules/module1/index.ts'. ========
======== Resolving module 'module2' from '/user/username/projects/myproject/product/test/file4.ts'. ========
Module resolution kind is not specified, using 'NodeJs'.
Loading module 'module2' from 'node_modules' folder, target file type 'TypeScript'.
Directory '/user/username/projects/myproject/product/test/node_modules' does not exist, skipping all lookups in it.
Resolution for module 'module2' was found in cache from location '/user/username/projects/myproject/product'.
======== Module name 'module2' was successfully resolved to '/user/username/projects/myproject/node_modules/module2/index.ts'. ========
======== Resolving module 'module1' from '/user/username/projects/myproject/product/test/src/file3.ts'. ========
Module resolution kind is not specified, using 'NodeJs'.
Loading module 'module1' from 'node_modules' folder, target file type 'TypeScript'.
Directory '/user/username/projects/myproject/product/test/src/node_modules' does not exist, skipping all lookups in it.
Resolution for module 'module1' was found in cache from location '/user/username/projects/myproject/product/test'.
======== Module name 'module1' was successfully resolved to '/user/username/projects/myproject/product/node_modules/module1/index.ts'. ========
======== Resolving module 'module2' from '/user/username/projects/myproject/product/test/src/file3.ts'. ========
Module resolution kind is not specified, using 'NodeJs'.
Loading module 'module2' from 'node_modules' folder, target file type 'TypeScript'.
Directory '/user/username/projects/myproject/product/test/src/node_modules' does not exist, skipping all lookups in it.
Resolution for module 'module2' was found in cache from location '/user/username/projects/myproject/product/test'.
======== Module name 'module2' was successfully resolved to '/user/username/projects/myproject/node_modules/module2/index.ts'. ========
FileWatcher:: Added:: WatchInfo: /a/lib/lib.d.ts 500 undefined WatchType: Closed Script info
DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/product 1 undefined Project: /user/username/projects/myproject/tsconfig.json WatchType: Failed Lookup Locations
Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/product 1 undefined Project: /user/username/projects/myproject/tsconfig.json WatchType: Failed Lookup Locations
DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules 1 undefined Project: /user/username/projects/myproject/tsconfig.json WatchType: Failed Lookup Locations
Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules 1 undefined Project: /user/username/projects/myproject/tsconfig.json WatchType: Failed Lookup Locations
DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Project: /user/username/projects/myproject/tsconfig.json WatchType: Type roots
Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Project: /user/username/projects/myproject/tsconfig.json WatchType: Type roots
Finishing updateGraphWorker: Project: /user/username/projects/myproject/tsconfig.json Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Project '/user/username/projects/myproject/tsconfig.json' (Configured)
	Files (7)
	/a/lib/lib.d.ts
	/user/username/projects/myproject/product/node_modules/module1/index.ts
	/user/username/projects/myproject/node_modules/module2/index.ts
	/user/username/projects/myproject/product/src/file1.ts
	/user/username/projects/myproject/product/src/feature/file2.ts
	/user/username/projects/myproject/product/test/file4.ts
	/user/username/projects/myproject/product/test/src/file3.ts


	../../../../a/lib/lib.d.ts
	  Default library for target 'es3'
	product/node_modules/module1/index.ts
	  Imported via "module1" from file 'product/src/file1.ts'
	  Imported via "module1" from file 'product/src/feature/file2.ts'
	  Imported via "module1" from file 'product/test/file4.ts'
	  Imported via "module1" from file 'product/test/src/file3.ts'
	node_modules/module2/index.ts
	  Imported via "module2" from file 'product/src/file1.ts'
	  Imported via "module2" from file 'product/src/feature/file2.ts'
	  Imported via "module2" from file 'product/test/file4.ts'
	  Imported via "module2" from file 'product/test/src/file3.ts'
	product/src/file1.ts
	  Matched by default include pattern '**/*'
	product/src/feature/file2.ts
	  Matched by default include pattern '**/*'
	product/test/file4.ts
	  Matched by default include pattern '**/*'
	product/test/src/file3.ts
	  Matched by default include pattern '**/*'

-----------------------------------------------
Project '/user/username/projects/myproject/tsconfig.json' (Configured)
	Files (7)

-----------------------------------------------
Open files: 
	FileName: /user/username/projects/myproject/product/src/file1.ts ProjectRootPath: undefined
		Projects: /user/username/projects/myproject/tsconfig.json
FileWatcher:: Triggered with /user/username/projects/myproject/product/src/feature/file2.ts 1:: WatchInfo: /user/username/projects/myproject/product/src/feature/file2.ts 500 undefined WatchType: Closed Script info
Scheduled: /user/username/projects/myproject/tsconfig.json
Scheduled: *ensureProjectForOpenFiles*
Elapsed:: *ms FileWatcher:: Triggered with /user/username/projects/myproject/product/src/feature/file2.ts 1:: WatchInfo: /user/username/projects/myproject/product/src/feature/file2.ts 500 undefined WatchType: Closed Script info
FileWatcher:: Triggered with /user/username/projects/myproject/product/test/src/file3.ts 1:: WatchInfo: /user/username/projects/myproject/product/test/src/file3.ts 500 undefined WatchType: Closed Script info
Scheduled: /user/username/projects/myproject/tsconfig.json, Cancelled earlier one
Scheduled: *ensureProjectForOpenFiles*, Cancelled earlier one
Elapsed:: *ms FileWatcher:: Triggered with /user/username/projects/myproject/product/test/src/file3.ts 1:: WatchInfo: /user/username/projects/myproject/product/test/src/file3.ts 500 undefined WatchType: Closed Script info
FileWatcher:: Triggered with /user/username/projects/myproject/product/test/file4.ts 1:: WatchInfo: /user/username/projects/myproject/product/test/file4.ts 500 undefined WatchType: Closed Script info
Scheduled: /user/username/projects/myproject/tsconfig.json, Cancelled earlier one
Scheduled: *ensureProjectForOpenFiles*, Cancelled earlier one
Elapsed:: *ms FileWatcher:: Triggered with /user/username/projects/myproject/product/test/file4.ts 1:: WatchInfo: /user/username/projects/myproject/product/test/file4.ts 500 undefined WatchType: Closed Script info
Running: /user/username/projects/myproject/tsconfig.json
Starting updateGraphWorker: Project: /user/username/projects/myproject/tsconfig.json
Reusing resolution of module 'module1' from '/user/username/projects/myproject/product/src/file1.ts' of old program, it was successfully resolved to '/user/username/projects/myproject/product/node_modules/module1/index.ts'.
Reusing resolution of module 'module2' from '/user/username/projects/myproject/product/src/file1.ts' of old program, it was successfully resolved to '/user/username/projects/myproject/node_modules/module2/index.ts'.
Reusing resolution of module 'module1' from '/user/username/projects/myproject/product/src/feature/file2.ts' of old program, it was successfully resolved to '/user/username/projects/myproject/product/node_modules/module1/index.ts'.
Reusing resolution of module 'module2' from '/user/username/projects/myproject/product/src/feature/file2.ts' of old program, it was successfully resolved to '/user/username/projects/myproject/node_modules/module2/index.ts'.
Reusing resolution of module 'module1' from '/user/username/projects/myproject/product/test/file4.ts' of old program, it was successfully resolved to '/user/username/projects/myproject/product/node_modules/module1/index.ts'.
Reusing resolution of module 'module2' from '/user/username/projects/myproject/product/test/file4.ts' of old program, it was successfully resolved to '/user/username/projects/myproject/node_modules/module2/index.ts'.
Reusing resolution of module 'module1' from '/user/username/projects/myproject/product/test/src/file3.ts' of old program, it was successfully resolved to '/user/username/projects/myproject/product/node_modules/module1/index.ts'.
Reusing resolution of module 'module2' from '/user/username/projects/myproject/product/test/src/file3.ts' of old program, it was successfully resolved to '/user/username/projects/myproject/node_modules/module2/index.ts'.
Finishing updateGraphWorker: Project: /user/username/projects/myproject/tsconfig.json Version: 2 structureChanged: true structureIsReused:: SafeModules Elapsed:: *ms
Different program with same set of files
Running: *ensureProjectForOpenFiles*
Before ensureProjectForOpenFiles:
Project '/user/username/projects/myproject/tsconfig.json' (Configured)
	Files (7)

-----------------------------------------------
Open files: 
	FileName: /user/username/projects/myproject/product/src/file1.ts ProjectRootPath: undefined
		Projects: /user/username/projects/myproject/tsconfig.json
After ensureProjectForOpenFiles:
Project '/user/username/projects/myproject/tsconfig.json' (Configured)
	Files (7)

-----------------------------------------------
Open files: 
	FileName: /user/username/projects/myproject/product/src/file1.ts ProjectRootPath: undefined
		Projects: /user/username/projects/myproject/tsconfig.json