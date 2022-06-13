Provided types map file "/typesMap.json" doesn't exist
Search path: /user/username/projects/myproject/product/src
For info: /user/username/projects/myproject/product/src/file1.ts :: No config files found.
Plugins were requested but not running in environment that supports 'require'. Nothing will be loaded
FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/product/src/tsconfig.json 2000 undefined WatchType: Config file for the inferred project root
FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/product/src/jsconfig.json 2000 undefined WatchType: Config file for the inferred project root
FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/product/tsconfig.json 2000 undefined WatchType: Config file for the inferred project root
FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/product/jsconfig.json 2000 undefined WatchType: Config file for the inferred project root
FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/tsconfig.json 2000 undefined WatchType: Config file for the inferred project root
FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/jsconfig.json 2000 undefined WatchType: Config file for the inferred project root
Starting updateGraphWorker: Project: /dev/null/inferredProject1*
======== Resolving module './feature/file2' from '/user/username/projects/myproject/product/src/file1.ts'. ========
Module resolution kind is not specified, using 'NodeJs'.
Loading module as file / folder, candidate module location '/user/username/projects/myproject/product/src/feature/file2', target file type 'TypeScript'.
File '/user/username/projects/myproject/product/src/feature/file2.ts' exist - use it as a name resolution result.
======== Module name './feature/file2' was successfully resolved to '/user/username/projects/myproject/product/src/feature/file2.ts'. ========
======== Resolving module '../test/file4' from '/user/username/projects/myproject/product/src/file1.ts'. ========
Module resolution kind is not specified, using 'NodeJs'.
Loading module as file / folder, candidate module location '/user/username/projects/myproject/product/test/file4', target file type 'TypeScript'.
File '/user/username/projects/myproject/product/test/file4.ts' exist - use it as a name resolution result.
======== Module name '../test/file4' was successfully resolved to '/user/username/projects/myproject/product/test/file4.ts'. ========
======== Resolving module '../test/src/file3' from '/user/username/projects/myproject/product/src/file1.ts'. ========
Module resolution kind is not specified, using 'NodeJs'.
Loading module as file / folder, candidate module location '/user/username/projects/myproject/product/test/src/file3', target file type 'TypeScript'.
File '/user/username/projects/myproject/product/test/src/file3.ts' exist - use it as a name resolution result.
======== Module name '../test/src/file3' was successfully resolved to '/user/username/projects/myproject/product/test/src/file3.ts'. ========
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
FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/product/src/feature/file2.ts 500 undefined WatchType: Closed Script info
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
DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/product/node_modules 1 undefined WatchType: node_modules for closed script infos and package.jsons affecting module specifier cache
Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/product/node_modules 1 undefined WatchType: node_modules for closed script infos and package.jsons affecting module specifier cache
DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules 1 undefined WatchType: node_modules for closed script infos and package.jsons affecting module specifier cache
Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules 1 undefined WatchType: node_modules for closed script infos and package.jsons affecting module specifier cache
FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/product/test/file4.ts 500 undefined WatchType: Closed Script info
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
FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/product/test/src/file3.ts 500 undefined WatchType: Closed Script info
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
DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/product/src/node_modules 1 undefined Project: /dev/null/inferredProject1* WatchType: Failed Lookup Locations
Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/product/src/node_modules 1 undefined Project: /dev/null/inferredProject1* WatchType: Failed Lookup Locations
DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/product/node_modules 1 undefined Project: /dev/null/inferredProject1* WatchType: Failed Lookup Locations
Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/product/node_modules 1 undefined Project: /dev/null/inferredProject1* WatchType: Failed Lookup Locations
DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/product/src/feature 1 undefined Project: /dev/null/inferredProject1* WatchType: Failed Lookup Locations
Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/product/src/feature 1 undefined Project: /dev/null/inferredProject1* WatchType: Failed Lookup Locations
DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/product/test/node_modules 1 undefined Project: /dev/null/inferredProject1* WatchType: Failed Lookup Locations
Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/product/test/node_modules 1 undefined Project: /dev/null/inferredProject1* WatchType: Failed Lookup Locations
DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/product/test/src/node_modules 1 undefined Project: /dev/null/inferredProject1* WatchType: Failed Lookup Locations
Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/product/test/src/node_modules 1 undefined Project: /dev/null/inferredProject1* WatchType: Failed Lookup Locations
DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules 1 undefined Project: /dev/null/inferredProject1* WatchType: Failed Lookup Locations
Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules 1 undefined Project: /dev/null/inferredProject1* WatchType: Failed Lookup Locations
DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/product/src/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/product/src/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/product/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/product/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Finishing updateGraphWorker: Project: /dev/null/inferredProject1* Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Project '/dev/null/inferredProject1*' (Inferred)
	Files (7)
	/a/lib/lib.d.ts
	/user/username/projects/myproject/product/node_modules/module1/index.ts
	/user/username/projects/myproject/node_modules/module2/index.ts
	/user/username/projects/myproject/product/src/feature/file2.ts
	/user/username/projects/myproject/product/test/file4.ts
	/user/username/projects/myproject/product/test/src/file3.ts
	/user/username/projects/myproject/product/src/file1.ts


	../../../../../../a/lib/lib.d.ts
	  Default library for target 'es3'
	../node_modules/module1/index.ts
	  Imported via "module1" from file 'feature/file2.ts'
	  Imported via "module1" from file '../test/file4.ts'
	  Imported via "module1" from file '../test/src/file3.ts'
	  Imported via "module1" from file 'file1.ts'
	../../node_modules/module2/index.ts
	  Imported via "module2" from file 'feature/file2.ts'
	  Imported via "module2" from file '../test/file4.ts'
	  Imported via "module2" from file '../test/src/file3.ts'
	  Imported via "module2" from file 'file1.ts'
	feature/file2.ts
	  Imported via "./feature/file2" from file 'file1.ts'
	../test/file4.ts
	  Imported via "../test/file4" from file 'file1.ts'
	../test/src/file3.ts
	  Imported via "../test/src/file3" from file 'file1.ts'
	file1.ts
	  Root file specified for compilation

-----------------------------------------------
Project '/dev/null/inferredProject1*' (Inferred)
	Files (7)

-----------------------------------------------
Open files: 
	FileName: /user/username/projects/myproject/product/src/file1.ts ProjectRootPath: undefined
		Projects: /dev/null/inferredProject1*
FileWatcher:: Triggered with /user/username/projects/myproject/product/src/feature/file2.ts 1:: WatchInfo: /user/username/projects/myproject/product/src/feature/file2.ts 500 undefined WatchType: Closed Script info
Scheduled: /dev/null/inferredProject1*
Scheduled: *ensureProjectForOpenFiles*
Elapsed:: *ms FileWatcher:: Triggered with /user/username/projects/myproject/product/src/feature/file2.ts 1:: WatchInfo: /user/username/projects/myproject/product/src/feature/file2.ts 500 undefined WatchType: Closed Script info
FileWatcher:: Triggered with /user/username/projects/myproject/product/test/src/file3.ts 1:: WatchInfo: /user/username/projects/myproject/product/test/src/file3.ts 500 undefined WatchType: Closed Script info
Scheduled: /dev/null/inferredProject1*, Cancelled earlier one
Scheduled: *ensureProjectForOpenFiles*, Cancelled earlier one
Elapsed:: *ms FileWatcher:: Triggered with /user/username/projects/myproject/product/test/src/file3.ts 1:: WatchInfo: /user/username/projects/myproject/product/test/src/file3.ts 500 undefined WatchType: Closed Script info
FileWatcher:: Triggered with /user/username/projects/myproject/product/test/file4.ts 1:: WatchInfo: /user/username/projects/myproject/product/test/file4.ts 500 undefined WatchType: Closed Script info
Scheduled: /dev/null/inferredProject1*, Cancelled earlier one
Scheduled: *ensureProjectForOpenFiles*, Cancelled earlier one
Elapsed:: *ms FileWatcher:: Triggered with /user/username/projects/myproject/product/test/file4.ts 1:: WatchInfo: /user/username/projects/myproject/product/test/file4.ts 500 undefined WatchType: Closed Script info
Running: /dev/null/inferredProject1*
Starting updateGraphWorker: Project: /dev/null/inferredProject1*
Reusing resolution of module './feature/file2' from '/user/username/projects/myproject/product/src/file1.ts' of old program, it was successfully resolved to '/user/username/projects/myproject/product/src/feature/file2.ts'.
Reusing resolution of module '../test/file4' from '/user/username/projects/myproject/product/src/file1.ts' of old program, it was successfully resolved to '/user/username/projects/myproject/product/test/file4.ts'.
Reusing resolution of module '../test/src/file3' from '/user/username/projects/myproject/product/src/file1.ts' of old program, it was successfully resolved to '/user/username/projects/myproject/product/test/src/file3.ts'.
Reusing resolution of module 'module1' from '/user/username/projects/myproject/product/src/file1.ts' of old program, it was successfully resolved to '/user/username/projects/myproject/product/node_modules/module1/index.ts'.
Reusing resolution of module 'module2' from '/user/username/projects/myproject/product/src/file1.ts' of old program, it was successfully resolved to '/user/username/projects/myproject/node_modules/module2/index.ts'.
Reusing resolution of module 'module1' from '/user/username/projects/myproject/product/src/feature/file2.ts' of old program, it was successfully resolved to '/user/username/projects/myproject/product/node_modules/module1/index.ts'.
Reusing resolution of module 'module2' from '/user/username/projects/myproject/product/src/feature/file2.ts' of old program, it was successfully resolved to '/user/username/projects/myproject/node_modules/module2/index.ts'.
Reusing resolution of module 'module1' from '/user/username/projects/myproject/product/test/file4.ts' of old program, it was successfully resolved to '/user/username/projects/myproject/product/node_modules/module1/index.ts'.
Reusing resolution of module 'module2' from '/user/username/projects/myproject/product/test/file4.ts' of old program, it was successfully resolved to '/user/username/projects/myproject/node_modules/module2/index.ts'.
Reusing resolution of module 'module1' from '/user/username/projects/myproject/product/test/src/file3.ts' of old program, it was successfully resolved to '/user/username/projects/myproject/product/node_modules/module1/index.ts'.
Reusing resolution of module 'module2' from '/user/username/projects/myproject/product/test/src/file3.ts' of old program, it was successfully resolved to '/user/username/projects/myproject/node_modules/module2/index.ts'.
Finishing updateGraphWorker: Project: /dev/null/inferredProject1* Version: 2 structureChanged: true structureIsReused:: SafeModules Elapsed:: *ms
Different program with same set of files
Running: *ensureProjectForOpenFiles*
Before ensureProjectForOpenFiles:
Project '/dev/null/inferredProject1*' (Inferred)
	Files (7)

-----------------------------------------------
Open files: 
	FileName: /user/username/projects/myproject/product/src/file1.ts ProjectRootPath: undefined
		Projects: /dev/null/inferredProject1*
After ensureProjectForOpenFiles:
Project '/dev/null/inferredProject1*' (Inferred)
	Files (7)

-----------------------------------------------
Open files: 
	FileName: /user/username/projects/myproject/product/src/file1.ts ProjectRootPath: undefined
		Projects: /dev/null/inferredProject1*