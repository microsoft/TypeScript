Provided types map file "/typesMap.json" doesn't exist
Search path: /a/b
For info: /a/b/app.js :: No config files found.
Plugins were requested but not running in environment that supports 'require'. Nothing will be loaded
Starting updateGraphWorker: Project: /dev/null/inferredProject1*
======== Resolving module 'lib' from '/a/b/app.js'. ========
Module resolution kind is not specified, using 'NodeJs'.
Loading module 'lib' from 'node_modules' folder, target file type 'TypeScript'.
Directory '/a/b/node_modules' does not exist, skipping all lookups in it.
Directory '/a/node_modules' does not exist, skipping all lookups in it.
Directory '/node_modules' does not exist, skipping all lookups in it.
Loading module 'lib' from 'node_modules' folder, target file type 'JavaScript'.
Directory '/a/b/node_modules' does not exist, skipping all lookups in it.
Directory '/a/node_modules' does not exist, skipping all lookups in it.
Directory '/node_modules' does not exist, skipping all lookups in it.
======== Module name 'lib' was not resolved. ========
Auto discovery for typings is enabled in project '/dev/null/inferredProject1*'. Running extra resolution pass for module 'lib' using cache location '/a/cache'.
File '/a/cache/node_modules/lib.d.ts' does not exist.
File '/a/cache/node_modules/@types/lib/package.json' does not exist.
File '/a/cache/node_modules/@types/lib.d.ts' does not exist.
File '/a/cache/node_modules/@types/lib/index.d.ts' exist - use it as a name resolution result.
DirectoryWatcher:: Added:: WatchInfo: /a/b/node_modules 1 undefined Project: /dev/null/inferredProject1* WatchType: Failed Lookup Locations
Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /a/b/node_modules 1 undefined Project: /dev/null/inferredProject1* WatchType: Failed Lookup Locations
FileWatcher:: Added:: WatchInfo: /a/lib/lib.d.ts 500 undefined Project: /dev/null/inferredProject1* WatchType: Missing file
DirectoryWatcher:: Added:: WatchInfo: /a/b/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /a/b/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Finishing updateGraphWorker: Project: /dev/null/inferredProject1* Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Project '/dev/null/inferredProject1*' (Inferred)
	Files (2)
	/a/cache/node_modules/@types/lib/index.d.ts
	/a/b/app.js


	../cache/node_modules/@types/lib/index.d.ts
	  Imported via "lib" from file 'app.js'
	app.js
	  Root file specified for compilation

-----------------------------------------------
Project '/dev/null/inferredProject1*' (Inferred)
	Files (2)

-----------------------------------------------
Open files: 
	FileName: /a/b/app.js ProjectRootPath: undefined
		Projects: /dev/null/inferredProject1*