Provided types map file "/typesMap.json" doesn't exist
TestServerHost::
//// [/user/username/projects/a/b/app.js]

                import * as commander from "commander";

//// [/user/username/projects/node_modules/commander/index.js]
module.exports = 0


Opening file /user/username/projects/a/b/app.js
Search path: /user/username/projects/a/b
For info: /user/username/projects/a/b/app.js :: No config files found.
Plugins were requested but not running in environment that supports 'require'. Nothing will be loaded
FileWatcher:: Added:: WatchInfo: /user/username/projects/a/b/tsconfig.json 2000 undefined WatchType: Config file for the inferred project root
FileWatcher:: Added:: WatchInfo: /user/username/projects/a/b/jsconfig.json 2000 undefined WatchType: Config file for the inferred project root
FileWatcher:: Added:: WatchInfo: /user/username/projects/a/tsconfig.json 2000 undefined WatchType: Config file for the inferred project root
FileWatcher:: Added:: WatchInfo: /user/username/projects/a/jsconfig.json 2000 undefined WatchType: Config file for the inferred project root
Starting updateGraphWorker: Project: /dev/null/inferredProject1*
======== Resolving module 'commander' from '/user/username/projects/a/b/app.js'. ========
Module resolution kind is not specified, using 'NodeJs'.
Loading module 'commander' from 'node_modules' folder, target file type 'TypeScript'.
Directory '/user/username/projects/a/b/node_modules' does not exist, skipping all lookups in it.
Directory '/user/username/projects/a/node_modules' does not exist, skipping all lookups in it.
File '/user/username/projects/node_modules/commander/package.json' does not exist.
File '/user/username/projects/node_modules/commander.ts' does not exist.
File '/user/username/projects/node_modules/commander.tsx' does not exist.
File '/user/username/projects/node_modules/commander.d.ts' does not exist.
File '/user/username/projects/node_modules/commander/index.ts' does not exist.
File '/user/username/projects/node_modules/commander/index.tsx' does not exist.
File '/user/username/projects/node_modules/commander/index.d.ts' does not exist.
Directory '/user/username/projects/node_modules/@types' does not exist, skipping all lookups in it.
Directory '/user/username/node_modules' does not exist, skipping all lookups in it.
Directory '/user/node_modules' does not exist, skipping all lookups in it.
Directory '/node_modules' does not exist, skipping all lookups in it.
Loading module 'commander' from 'node_modules' folder, target file type 'JavaScript'.
Directory '/user/username/projects/a/b/node_modules' does not exist, skipping all lookups in it.
Directory '/user/username/projects/a/node_modules' does not exist, skipping all lookups in it.
File '/user/username/projects/node_modules/commander/package.json' does not exist according to earlier cached lookups.
File '/user/username/projects/node_modules/commander.js' does not exist.
File '/user/username/projects/node_modules/commander.jsx' does not exist.
File '/user/username/projects/node_modules/commander/index.js' exist - use it as a name resolution result.
Resolving real path for '/user/username/projects/node_modules/commander/index.js', result '/user/username/projects/node_modules/commander/index.js'.
======== Module name 'commander' was successfully resolved to '/user/username/projects/node_modules/commander/index.js'. ========
Auto discovery for typings is enabled in project '/dev/null/inferredProject1*'. Running extra resolution pass for module 'commander' using cache location '/user/username/projects/a/cache'.
Directory '/user/username/projects/a/cache/node_modules' does not exist, skipping all lookups in it.
DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/node_modules 1 undefined WatchType: node_modules for closed script infos and package.jsons affecting module specifier cache
Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/node_modules 1 undefined WatchType: node_modules for closed script infos and package.jsons affecting module specifier cache
DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/a/b/node_modules 1 undefined Project: /dev/null/inferredProject1* WatchType: Failed Lookup Locations
Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/a/b/node_modules 1 undefined Project: /dev/null/inferredProject1* WatchType: Failed Lookup Locations
DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/a/node_modules 1 undefined Project: /dev/null/inferredProject1* WatchType: Failed Lookup Locations
Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/a/node_modules 1 undefined Project: /dev/null/inferredProject1* WatchType: Failed Lookup Locations
DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/a/b/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/a/b/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/a/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/a/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
FileWatcher:: Added:: WatchInfo: /a/lib/lib.d.ts 500 undefined Project: /dev/null/inferredProject1* WatchType: Missing file
Finishing updateGraphWorker: Project: /dev/null/inferredProject1* Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Project '/dev/null/inferredProject1*' (Inferred)
	Files (2)
	/user/username/projects/node_modules/commander/index.js
	/user/username/projects/a/b/app.js


	../../node_modules/commander/index.js
	  Imported via "commander" from file 'app.js'
	app.js
	  Root file specified for compilation

-----------------------------------------------
Project '/dev/null/inferredProject1*' (Inferred)
	Files (2)

-----------------------------------------------
Open files: 
	FileName: /user/username/projects/a/b/app.js ProjectRootPath: undefined
		Projects: /dev/null/inferredProject1*
Installing typing
Scheduled: /dev/null/inferredProject1*
Scheduled: *ensureProjectForOpenFiles*
TestServerHost::
//// [/user/username/projects/a/cache/package.json]
{ "private": true }

//// [/user/username/projects/a/cache/node_modules/@types/commander/index.d.ts]



Expecting timeouts from installing typings
Running: /dev/null/inferredProject1*
Starting updateGraphWorker: Project: /dev/null/inferredProject1*
======== Resolving module 'commander' from '/user/username/projects/a/b/app.js'. ========
Module resolution kind is not specified, using 'NodeJs'.
Loading module 'commander' from 'node_modules' folder, target file type 'TypeScript'.
Directory '/user/username/projects/a/b/node_modules' does not exist, skipping all lookups in it.
Directory '/user/username/projects/a/node_modules' does not exist, skipping all lookups in it.
File '/user/username/projects/node_modules/commander/package.json' does not exist according to earlier cached lookups.
File '/user/username/projects/node_modules/commander.ts' does not exist.
File '/user/username/projects/node_modules/commander.tsx' does not exist.
File '/user/username/projects/node_modules/commander.d.ts' does not exist.
File '/user/username/projects/node_modules/commander/index.ts' does not exist.
File '/user/username/projects/node_modules/commander/index.tsx' does not exist.
File '/user/username/projects/node_modules/commander/index.d.ts' does not exist.
Directory '/user/username/projects/node_modules/@types' does not exist, skipping all lookups in it.
Directory '/user/username/node_modules' does not exist, skipping all lookups in it.
Directory '/user/node_modules' does not exist, skipping all lookups in it.
Directory '/node_modules' does not exist, skipping all lookups in it.
Loading module 'commander' from 'node_modules' folder, target file type 'JavaScript'.
Directory '/user/username/projects/a/b/node_modules' does not exist, skipping all lookups in it.
Directory '/user/username/projects/a/node_modules' does not exist, skipping all lookups in it.
File '/user/username/projects/node_modules/commander/package.json' does not exist according to earlier cached lookups.
File '/user/username/projects/node_modules/commander.js' does not exist.
File '/user/username/projects/node_modules/commander.jsx' does not exist.
File '/user/username/projects/node_modules/commander/index.js' exist - use it as a name resolution result.
Resolving real path for '/user/username/projects/node_modules/commander/index.js', result '/user/username/projects/node_modules/commander/index.js'.
======== Module name 'commander' was successfully resolved to '/user/username/projects/node_modules/commander/index.js'. ========
Auto discovery for typings is enabled in project '/dev/null/inferredProject1*'. Running extra resolution pass for module 'commander' using cache location '/user/username/projects/a/cache'.
File '/user/username/projects/a/cache/node_modules/commander.d.ts' does not exist.
File '/user/username/projects/a/cache/node_modules/@types/commander/package.json' does not exist.
File '/user/username/projects/a/cache/node_modules/@types/commander.d.ts' does not exist.
File '/user/username/projects/a/cache/node_modules/@types/commander/index.d.ts' exist - use it as a name resolution result.
DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/a/cache/node_modules 1 undefined Project: /dev/null/inferredProject1* WatchType: Failed Lookup Locations
Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/a/cache/node_modules 1 undefined Project: /dev/null/inferredProject1* WatchType: Failed Lookup Locations
Finishing updateGraphWorker: Project: /dev/null/inferredProject1* Version: 2 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Project '/dev/null/inferredProject1*' (Inferred)
	Files (2)
	/user/username/projects/a/cache/node_modules/@types/commander/index.d.ts
	/user/username/projects/a/b/app.js


	../cache/node_modules/@types/commander/index.d.ts
	  Imported via "commander" from file 'app.js'
	  Root file specified for compilation
	app.js
	  Root file specified for compilation

-----------------------------------------------
Scheduled: /dev/null/inferredProject1*
Scheduled: *ensureProjectForOpenFiles*, Cancelled earlier one
Expecting timeouts from setting typings = emptyArray after the project resolves from typing installer cache
Running: /dev/null/inferredProject1*
Starting updateGraphWorker: Project: /dev/null/inferredProject1*
Reusing resolution of module 'commander' from '/user/username/projects/a/b/app.js' of old program, it was successfully resolved to '/user/username/projects/a/cache/node_modules/@types/commander/index.d.ts'.
Finishing updateGraphWorker: Project: /dev/null/inferredProject1* Version: 3 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Project '/dev/null/inferredProject1*' (Inferred)
	Files (2)
	/user/username/projects/a/cache/node_modules/@types/commander/index.d.ts
	/user/username/projects/a/b/app.js


	../cache/node_modules/@types/commander/index.d.ts
	  Imported via "commander" from file 'app.js'
	app.js
	  Root file specified for compilation

-----------------------------------------------
Running: *ensureProjectForOpenFiles*
Before ensureProjectForOpenFiles:
Project '/dev/null/inferredProject1*' (Inferred)
	Files (2)

-----------------------------------------------
Open files: 
	FileName: /user/username/projects/a/b/app.js ProjectRootPath: undefined
		Projects: /dev/null/inferredProject1*
After ensureProjectForOpenFiles:
Project '/dev/null/inferredProject1*' (Inferred)
	Files (2)

-----------------------------------------------
Open files: 
	FileName: /user/username/projects/a/b/app.js ProjectRootPath: undefined
		Projects: /dev/null/inferredProject1*