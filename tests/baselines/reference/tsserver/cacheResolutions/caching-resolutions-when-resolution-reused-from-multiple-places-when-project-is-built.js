Provided types map file "/a/lib/typesMap.json" doesn't exist
request:{"seq":0,"type":"request","command":"open","arguments":{"file":"/src/project/randomFileForImport.ts"}}
Search path: /src/project
For info: /src/project/randomFileForImport.ts :: Config file name: /src/project/tsconfig.json
Creating configuration project /src/project/tsconfig.json
FileWatcher:: Added:: WatchInfo: /src/project/tsconfig.json 2000 undefined Project: /src/project/tsconfig.json WatchType: Config file
Config: /src/project/tsconfig.json : {
 "rootNames": [
  "/src/project/fileWithImports.ts",
  "/src/project/randomFileForImport.ts",
  "/src/project/a/fileWithImports.ts",
  "/src/project/b/ba/fileWithImports.ts",
  "/src/project/b/randomFileForImport.ts",
  "/src/project/c/ca/fileWithImports.ts",
  "/src/project/c/ca/caa/randomFileForImport.ts",
  "/src/project/c/ca/caa/caaa/fileWithImports.ts",
  "/src/project/c/cb/fileWithImports.ts",
  "/src/project/d/da/daa/daaa/x/y/z/randomFileForImport.ts",
  "/src/project/d/da/daa/daaa/fileWithImports.ts",
  "/src/project/d/da/daa/fileWithImports.ts",
  "/src/project/d/da/fileWithImports.ts",
  "/src/project/e/ea/fileWithImports.ts",
  "/src/project/e/ea/eaa/fileWithImports.ts",
  "/src/project/e/ea/eaa/eaaa/fileWithImports.ts",
  "/src/project/e/ea/eaa/eaaa/x/y/z/randomFileForImport.ts",
  "/src/project/f/fa/faa/x/y/z/randomFileForImport.ts",
  "/src/project/f/fa/faa/faaa/fileWithImports.ts"
 ],
 "options": {
  "composite": true,
  "cacheResolutions": true,
  "traceResolution": true,
  "configFilePath": "/src/project/tsconfig.json"
 }
}
Plugins were requested but not running in environment that supports 'require'. Nothing will be loaded
FileWatcher:: Added:: WatchInfo: /src/project/fileWithImports.ts 500 undefined WatchType: Closed Script info
FileWatcher:: Added:: WatchInfo: /src/project/a/fileWithImports.ts 500 undefined WatchType: Closed Script info
FileWatcher:: Added:: WatchInfo: /src/project/b/ba/fileWithImports.ts 500 undefined WatchType: Closed Script info
FileWatcher:: Added:: WatchInfo: /src/project/b/randomFileForImport.ts 500 undefined WatchType: Closed Script info
FileWatcher:: Added:: WatchInfo: /src/project/c/ca/fileWithImports.ts 500 undefined WatchType: Closed Script info
FileWatcher:: Added:: WatchInfo: /src/project/c/ca/caa/randomFileForImport.ts 500 undefined WatchType: Closed Script info
FileWatcher:: Added:: WatchInfo: /src/project/c/ca/caa/caaa/fileWithImports.ts 500 undefined WatchType: Closed Script info
FileWatcher:: Added:: WatchInfo: /src/project/c/cb/fileWithImports.ts 500 undefined WatchType: Closed Script info
FileWatcher:: Added:: WatchInfo: /src/project/d/da/daa/daaa/x/y/z/randomFileForImport.ts 500 undefined WatchType: Closed Script info
FileWatcher:: Added:: WatchInfo: /src/project/d/da/daa/daaa/fileWithImports.ts 500 undefined WatchType: Closed Script info
FileWatcher:: Added:: WatchInfo: /src/project/d/da/daa/fileWithImports.ts 500 undefined WatchType: Closed Script info
FileWatcher:: Added:: WatchInfo: /src/project/d/da/fileWithImports.ts 500 undefined WatchType: Closed Script info
FileWatcher:: Added:: WatchInfo: /src/project/e/ea/fileWithImports.ts 500 undefined WatchType: Closed Script info
FileWatcher:: Added:: WatchInfo: /src/project/e/ea/eaa/fileWithImports.ts 500 undefined WatchType: Closed Script info
FileWatcher:: Added:: WatchInfo: /src/project/e/ea/eaa/eaaa/fileWithImports.ts 500 undefined WatchType: Closed Script info
FileWatcher:: Added:: WatchInfo: /src/project/e/ea/eaa/eaaa/x/y/z/randomFileForImport.ts 500 undefined WatchType: Closed Script info
FileWatcher:: Added:: WatchInfo: /src/project/f/fa/faa/x/y/z/randomFileForImport.ts 500 undefined WatchType: Closed Script info
FileWatcher:: Added:: WatchInfo: /src/project/f/fa/faa/faaa/fileWithImports.ts 500 undefined WatchType: Closed Script info
Starting updateGraphWorker: Project: /src/project/tsconfig.json
Reusing resolution of module 'pkg0' from '/src/project/fileWithImports.ts' found in cache from location '/src/project', it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
======== Resolving module 'pkg1' from '/src/project/fileWithImports.ts'. ========
Module resolution kind is not specified, using 'NodeJs'.
Loading module 'pkg1' from 'node_modules' folder, target file type 'TypeScript'.
File '/src/project/node_modules/pkg1.ts' does not exist.
File '/src/project/node_modules/pkg1.tsx' does not exist.
File '/src/project/node_modules/pkg1.d.ts' does not exist.
Directory '/src/project/node_modules/@types' does not exist, skipping all lookups in it.
Directory '/src/node_modules' does not exist, skipping all lookups in it.
Directory '/node_modules' does not exist, skipping all lookups in it.
Loading module 'pkg1' from 'node_modules' folder, target file type 'JavaScript'.
File '/src/project/node_modules/pkg1.js' does not exist.
File '/src/project/node_modules/pkg1.jsx' does not exist.
Directory '/src/node_modules' does not exist, skipping all lookups in it.
Directory '/node_modules' does not exist, skipping all lookups in it.
======== Module name 'pkg1' was not resolved. ========
DirectoryWatcher:: Added:: WatchInfo: /src/project/node_modules 1 undefined WatchType: node_modules for closed script infos and package.jsons affecting module specifier cache
Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /src/project/node_modules 1 undefined WatchType: node_modules for closed script infos and package.jsons affecting module specifier cache
Reusing resolution of module 'pkg0' from '/src/project/a/fileWithImports.ts' found in cache from location '/src/project/a', it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
======== Resolving module 'pkg1' from '/src/project/a/fileWithImports.ts'. ========
Module resolution kind is not specified, using 'NodeJs'.
Loading module 'pkg1' from 'node_modules' folder, target file type 'TypeScript'.
Directory '/src/project/a/node_modules' does not exist, skipping all lookups in it.
Resolution for module 'pkg1' was found in cache from location '/src/project'.
======== Module name 'pkg1' was not resolved. ========
Reusing resolution of module 'pkg0' from '/src/project/b/ba/fileWithImports.ts' found in cache from location '/src/project/b/ba', it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
======== Resolving module 'pkg1' from '/src/project/b/ba/fileWithImports.ts'. ========
Module resolution kind is not specified, using 'NodeJs'.
Loading module 'pkg1' from 'node_modules' folder, target file type 'TypeScript'.
Directory '/src/project/b/ba/node_modules' does not exist, skipping all lookups in it.
Directory '/src/project/b/node_modules' does not exist, skipping all lookups in it.
Resolution for module 'pkg1' was found in cache from location '/src/project'.
======== Module name 'pkg1' was not resolved. ========
Reusing resolution of module 'pkg0' from '/src/project/c/ca/fileWithImports.ts' found in cache from location '/src/project/c/ca', it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
======== Resolving module 'pkg1' from '/src/project/c/ca/fileWithImports.ts'. ========
Module resolution kind is not specified, using 'NodeJs'.
Loading module 'pkg1' from 'node_modules' folder, target file type 'TypeScript'.
Directory '/src/project/c/ca/node_modules' does not exist, skipping all lookups in it.
Directory '/src/project/c/node_modules' does not exist, skipping all lookups in it.
Resolution for module 'pkg1' was found in cache from location '/src/project'.
======== Module name 'pkg1' was not resolved. ========
Reusing resolution of module 'pkg0' from '/src/project/c/ca/caa/caaa/fileWithImports.ts' found in cache from location '/src/project/c/ca/caa/caaa', it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
======== Resolving module 'pkg1' from '/src/project/c/ca/caa/caaa/fileWithImports.ts'. ========
Module resolution kind is not specified, using 'NodeJs'.
Loading module 'pkg1' from 'node_modules' folder, target file type 'TypeScript'.
Directory '/src/project/c/ca/caa/caaa/node_modules' does not exist, skipping all lookups in it.
Directory '/src/project/c/ca/caa/node_modules' does not exist, skipping all lookups in it.
Resolution for module 'pkg1' was found in cache from location '/src/project/c/ca'.
======== Module name 'pkg1' was not resolved. ========
Reusing resolution of module 'pkg0' from '/src/project/c/cb/fileWithImports.ts' found in cache from location '/src/project/c/cb', it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
======== Resolving module 'pkg1' from '/src/project/c/cb/fileWithImports.ts'. ========
Module resolution kind is not specified, using 'NodeJs'.
Loading module 'pkg1' from 'node_modules' folder, target file type 'TypeScript'.
Directory '/src/project/c/cb/node_modules' does not exist, skipping all lookups in it.
Resolution for module 'pkg1' was found in cache from location '/src/project/c'.
======== Module name 'pkg1' was not resolved. ========
Reusing resolution of module 'pkg0' from '/src/project/d/da/daa/daaa/fileWithImports.ts' found in cache from location '/src/project/d/da/daa/daaa', it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
======== Resolving module 'pkg1' from '/src/project/d/da/daa/daaa/fileWithImports.ts'. ========
Module resolution kind is not specified, using 'NodeJs'.
Loading module 'pkg1' from 'node_modules' folder, target file type 'TypeScript'.
Directory '/src/project/d/da/daa/daaa/node_modules' does not exist, skipping all lookups in it.
Directory '/src/project/d/da/daa/node_modules' does not exist, skipping all lookups in it.
Directory '/src/project/d/da/node_modules' does not exist, skipping all lookups in it.
Directory '/src/project/d/node_modules' does not exist, skipping all lookups in it.
Resolution for module 'pkg1' was found in cache from location '/src/project'.
======== Module name 'pkg1' was not resolved. ========
Reusing resolution of module 'pkg0' from '/src/project/d/da/daa/fileWithImports.ts' found in cache from location '/src/project/d/da/daa', it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
======== Resolving module 'pkg1' from '/src/project/d/da/daa/fileWithImports.ts'. ========
Module resolution kind is not specified, using 'NodeJs'.
Loading module 'pkg1' from 'node_modules' folder, target file type 'TypeScript'.
Resolution for module 'pkg1' was found in cache from location '/src/project/d/da/daa'.
======== Module name 'pkg1' was not resolved. ========
Reusing resolution of module 'pkg0' from '/src/project/d/da/fileWithImports.ts' found in cache from location '/src/project/d/da', it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
======== Resolving module 'pkg1' from '/src/project/d/da/fileWithImports.ts'. ========
Module resolution kind is not specified, using 'NodeJs'.
Loading module 'pkg1' from 'node_modules' folder, target file type 'TypeScript'.
Resolution for module 'pkg1' was found in cache from location '/src/project/d/da'.
======== Module name 'pkg1' was not resolved. ========
Reusing resolution of module 'pkg0' from '/src/project/e/ea/fileWithImports.ts' found in cache from location '/src/project/e/ea', it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
======== Resolving module 'pkg1' from '/src/project/e/ea/fileWithImports.ts'. ========
Module resolution kind is not specified, using 'NodeJs'.
Loading module 'pkg1' from 'node_modules' folder, target file type 'TypeScript'.
Directory '/src/project/e/ea/node_modules' does not exist, skipping all lookups in it.
Directory '/src/project/e/node_modules' does not exist, skipping all lookups in it.
Resolution for module 'pkg1' was found in cache from location '/src/project'.
======== Module name 'pkg1' was not resolved. ========
Reusing resolution of module 'pkg0' from '/src/project/e/ea/eaa/fileWithImports.ts' found in cache from location '/src/project/e/ea/eaa', it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
======== Resolving module 'pkg1' from '/src/project/e/ea/eaa/fileWithImports.ts'. ========
Module resolution kind is not specified, using 'NodeJs'.
Loading module 'pkg1' from 'node_modules' folder, target file type 'TypeScript'.
Directory '/src/project/e/ea/eaa/node_modules' does not exist, skipping all lookups in it.
Resolution for module 'pkg1' was found in cache from location '/src/project/e/ea'.
======== Module name 'pkg1' was not resolved. ========
Reusing resolution of module 'pkg0' from '/src/project/e/ea/eaa/eaaa/fileWithImports.ts' found in cache from location '/src/project/e/ea/eaa/eaaa', it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
======== Resolving module 'pkg1' from '/src/project/e/ea/eaa/eaaa/fileWithImports.ts'. ========
Module resolution kind is not specified, using 'NodeJs'.
Loading module 'pkg1' from 'node_modules' folder, target file type 'TypeScript'.
Directory '/src/project/e/ea/eaa/eaaa/node_modules' does not exist, skipping all lookups in it.
Resolution for module 'pkg1' was found in cache from location '/src/project/e/ea/eaa'.
======== Module name 'pkg1' was not resolved. ========
Reusing resolution of module 'pkg0' from '/src/project/f/fa/faa/faaa/fileWithImports.ts' found in cache from location '/src/project/f/fa/faa/faaa', it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
======== Resolving module 'pkg1' from '/src/project/f/fa/faa/faaa/fileWithImports.ts'. ========
Module resolution kind is not specified, using 'NodeJs'.
Loading module 'pkg1' from 'node_modules' folder, target file type 'TypeScript'.
Directory '/src/project/f/fa/faa/faaa/node_modules' does not exist, skipping all lookups in it.
Directory '/src/project/f/fa/faa/node_modules' does not exist, skipping all lookups in it.
Directory '/src/project/f/fa/node_modules' does not exist, skipping all lookups in it.
Directory '/src/project/f/node_modules' does not exist, skipping all lookups in it.
Resolution for module 'pkg1' was found in cache from location '/src/project'.
======== Module name 'pkg1' was not resolved. ========
FileWatcher:: Added:: WatchInfo: /a/lib/lib.d.ts 500 undefined WatchType: Closed Script info
DirectoryWatcher:: Added:: WatchInfo: /src/project/node_modules 1 undefined Project: /src/project/tsconfig.json WatchType: Failed Lookup Locations
Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /src/project/node_modules 1 undefined Project: /src/project/tsconfig.json WatchType: Failed Lookup Locations
DirectoryWatcher:: Added:: WatchInfo: /src/project/a 1 undefined Project: /src/project/tsconfig.json WatchType: Failed Lookup Locations
Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /src/project/a 1 undefined Project: /src/project/tsconfig.json WatchType: Failed Lookup Locations
DirectoryWatcher:: Added:: WatchInfo: /src/project/b 1 undefined Project: /src/project/tsconfig.json WatchType: Failed Lookup Locations
Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /src/project/b 1 undefined Project: /src/project/tsconfig.json WatchType: Failed Lookup Locations
DirectoryWatcher:: Added:: WatchInfo: /src/project/c 1 undefined Project: /src/project/tsconfig.json WatchType: Failed Lookup Locations
Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /src/project/c 1 undefined Project: /src/project/tsconfig.json WatchType: Failed Lookup Locations
DirectoryWatcher:: Added:: WatchInfo: /src/project/d 1 undefined Project: /src/project/tsconfig.json WatchType: Failed Lookup Locations
Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /src/project/d 1 undefined Project: /src/project/tsconfig.json WatchType: Failed Lookup Locations
DirectoryWatcher:: Added:: WatchInfo: /src/project/e 1 undefined Project: /src/project/tsconfig.json WatchType: Failed Lookup Locations
Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /src/project/e 1 undefined Project: /src/project/tsconfig.json WatchType: Failed Lookup Locations
DirectoryWatcher:: Added:: WatchInfo: /src/project/f 1 undefined Project: /src/project/tsconfig.json WatchType: Failed Lookup Locations
Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /src/project/f 1 undefined Project: /src/project/tsconfig.json WatchType: Failed Lookup Locations
DirectoryWatcher:: Added:: WatchInfo: /src/project/node_modules/@types 1 undefined Project: /src/project/tsconfig.json WatchType: Type roots
Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /src/project/node_modules/@types 1 undefined Project: /src/project/tsconfig.json WatchType: Type roots
Finishing updateGraphWorker: Project: /src/project/tsconfig.json Version: 1 structureChanged: true structureIsReused:: SafeModuleCache Elapsed:: *ms
Project '/src/project/tsconfig.json' (Configured)
	Files (21)
	/a/lib/lib.d.ts
	/src/project/node_modules/pkg0/index.d.ts
	/src/project/fileWithImports.ts
	/src/project/randomFileForImport.ts
	/src/project/a/fileWithImports.ts
	/src/project/b/ba/fileWithImports.ts
	/src/project/b/randomFileForImport.ts
	/src/project/c/ca/fileWithImports.ts
	/src/project/c/ca/caa/randomFileForImport.ts
	/src/project/c/ca/caa/caaa/fileWithImports.ts
	/src/project/c/cb/fileWithImports.ts
	/src/project/d/da/daa/daaa/x/y/z/randomFileForImport.ts
	/src/project/d/da/daa/daaa/fileWithImports.ts
	/src/project/d/da/daa/fileWithImports.ts
	/src/project/d/da/fileWithImports.ts
	/src/project/e/ea/fileWithImports.ts
	/src/project/e/ea/eaa/fileWithImports.ts
	/src/project/e/ea/eaa/eaaa/fileWithImports.ts
	/src/project/e/ea/eaa/eaaa/x/y/z/randomFileForImport.ts
	/src/project/f/fa/faa/x/y/z/randomFileForImport.ts
	/src/project/f/fa/faa/faaa/fileWithImports.ts


	../../a/lib/lib.d.ts
	  Default library for target 'es3'
	node_modules/pkg0/index.d.ts
	  Imported via "pkg0" from file 'fileWithImports.ts'
	  Imported via "pkg0" from file 'a/fileWithImports.ts'
	  Imported via "pkg0" from file 'b/ba/fileWithImports.ts'
	  Imported via "pkg0" from file 'c/ca/fileWithImports.ts'
	  Imported via "pkg0" from file 'c/ca/caa/caaa/fileWithImports.ts'
	  Imported via "pkg0" from file 'c/cb/fileWithImports.ts'
	  Imported via "pkg0" from file 'd/da/daa/daaa/fileWithImports.ts'
	  Imported via "pkg0" from file 'd/da/daa/fileWithImports.ts'
	  Imported via "pkg0" from file 'd/da/fileWithImports.ts'
	  Imported via "pkg0" from file 'e/ea/fileWithImports.ts'
	  Imported via "pkg0" from file 'e/ea/eaa/fileWithImports.ts'
	  Imported via "pkg0" from file 'e/ea/eaa/eaaa/fileWithImports.ts'
	  Imported via "pkg0" from file 'f/fa/faa/faaa/fileWithImports.ts'
	fileWithImports.ts
	  Part of 'files' list in tsconfig.json
	randomFileForImport.ts
	  Part of 'files' list in tsconfig.json
	a/fileWithImports.ts
	  Part of 'files' list in tsconfig.json
	b/ba/fileWithImports.ts
	  Part of 'files' list in tsconfig.json
	b/randomFileForImport.ts
	  Part of 'files' list in tsconfig.json
	c/ca/fileWithImports.ts
	  Part of 'files' list in tsconfig.json
	c/ca/caa/randomFileForImport.ts
	  Part of 'files' list in tsconfig.json
	c/ca/caa/caaa/fileWithImports.ts
	  Part of 'files' list in tsconfig.json
	c/cb/fileWithImports.ts
	  Part of 'files' list in tsconfig.json
	d/da/daa/daaa/x/y/z/randomFileForImport.ts
	  Part of 'files' list in tsconfig.json
	d/da/daa/daaa/fileWithImports.ts
	  Part of 'files' list in tsconfig.json
	d/da/daa/fileWithImports.ts
	  Part of 'files' list in tsconfig.json
	d/da/fileWithImports.ts
	  Part of 'files' list in tsconfig.json
	e/ea/fileWithImports.ts
	  Part of 'files' list in tsconfig.json
	e/ea/eaa/fileWithImports.ts
	  Part of 'files' list in tsconfig.json
	e/ea/eaa/eaaa/fileWithImports.ts
	  Part of 'files' list in tsconfig.json
	e/ea/eaa/eaaa/x/y/z/randomFileForImport.ts
	  Part of 'files' list in tsconfig.json
	f/fa/faa/x/y/z/randomFileForImport.ts
	  Part of 'files' list in tsconfig.json
	f/fa/faa/faaa/fileWithImports.ts
	  Part of 'files' list in tsconfig.json

-----------------------------------------------
Search path: /src/project
For info: /src/project/tsconfig.json :: No config files found.
Project '/src/project/tsconfig.json' (Configured)
	Files (21)

-----------------------------------------------
Open files: 
	FileName: /src/project/randomFileForImport.ts ProjectRootPath: undefined
		Projects: /src/project/tsconfig.json
response:{"responseRequired":false}
request:{"seq":0,"type":"request","command":"open","arguments":{"file":"/src/project/b/randomFileForImport.ts"}}
FileWatcher:: Close:: WatchInfo: /src/project/b/randomFileForImport.ts 500 undefined WatchType: Closed Script info
Search path: /src/project/b
For info: /src/project/b/randomFileForImport.ts :: Config file name: /src/project/tsconfig.json
Search path: /src/project
For info: /src/project/tsconfig.json :: No config files found.
Project '/src/project/tsconfig.json' (Configured)
	Files (21)

-----------------------------------------------
Open files: 
	FileName: /src/project/randomFileForImport.ts ProjectRootPath: undefined
		Projects: /src/project/tsconfig.json
	FileName: /src/project/b/randomFileForImport.ts ProjectRootPath: undefined
		Projects: /src/project/tsconfig.json
response:{"responseRequired":false}
request:{"seq":0,"type":"request","command":"open","arguments":{"file":"/src/project/c/ca/caa/randomFileForImport.ts"}}
FileWatcher:: Close:: WatchInfo: /src/project/c/ca/caa/randomFileForImport.ts 500 undefined WatchType: Closed Script info
Search path: /src/project/c/ca/caa
For info: /src/project/c/ca/caa/randomFileForImport.ts :: Config file name: /src/project/tsconfig.json
Search path: /src/project
For info: /src/project/tsconfig.json :: No config files found.
Project '/src/project/tsconfig.json' (Configured)
	Files (21)

-----------------------------------------------
Open files: 
	FileName: /src/project/randomFileForImport.ts ProjectRootPath: undefined
		Projects: /src/project/tsconfig.json
	FileName: /src/project/b/randomFileForImport.ts ProjectRootPath: undefined
		Projects: /src/project/tsconfig.json
	FileName: /src/project/c/ca/caa/randomFileForImport.ts ProjectRootPath: undefined
		Projects: /src/project/tsconfig.json
response:{"responseRequired":false}
request:{"seq":0,"type":"request","command":"open","arguments":{"file":"/src/project/d/da/daa/daaa/x/y/z/randomFileForImport.ts"}}
FileWatcher:: Close:: WatchInfo: /src/project/d/da/daa/daaa/x/y/z/randomFileForImport.ts 500 undefined WatchType: Closed Script info
Search path: /src/project/d/da/daa/daaa/x/y/z
For info: /src/project/d/da/daa/daaa/x/y/z/randomFileForImport.ts :: Config file name: /src/project/tsconfig.json
Search path: /src/project
For info: /src/project/tsconfig.json :: No config files found.
Project '/src/project/tsconfig.json' (Configured)
	Files (21)

-----------------------------------------------
Open files: 
	FileName: /src/project/randomFileForImport.ts ProjectRootPath: undefined
		Projects: /src/project/tsconfig.json
	FileName: /src/project/b/randomFileForImport.ts ProjectRootPath: undefined
		Projects: /src/project/tsconfig.json
	FileName: /src/project/c/ca/caa/randomFileForImport.ts ProjectRootPath: undefined
		Projects: /src/project/tsconfig.json
	FileName: /src/project/d/da/daa/daaa/x/y/z/randomFileForImport.ts ProjectRootPath: undefined
		Projects: /src/project/tsconfig.json
response:{"responseRequired":false}
request:{"seq":0,"type":"request","command":"open","arguments":{"file":"/src/project/e/ea/eaa/eaaa/x/y/z/randomFileForImport.ts"}}
FileWatcher:: Close:: WatchInfo: /src/project/e/ea/eaa/eaaa/x/y/z/randomFileForImport.ts 500 undefined WatchType: Closed Script info
Search path: /src/project/e/ea/eaa/eaaa/x/y/z
For info: /src/project/e/ea/eaa/eaaa/x/y/z/randomFileForImport.ts :: Config file name: /src/project/tsconfig.json
Search path: /src/project
For info: /src/project/tsconfig.json :: No config files found.
Project '/src/project/tsconfig.json' (Configured)
	Files (21)

-----------------------------------------------
Open files: 
	FileName: /src/project/randomFileForImport.ts ProjectRootPath: undefined
		Projects: /src/project/tsconfig.json
	FileName: /src/project/b/randomFileForImport.ts ProjectRootPath: undefined
		Projects: /src/project/tsconfig.json
	FileName: /src/project/c/ca/caa/randomFileForImport.ts ProjectRootPath: undefined
		Projects: /src/project/tsconfig.json
	FileName: /src/project/d/da/daa/daaa/x/y/z/randomFileForImport.ts ProjectRootPath: undefined
		Projects: /src/project/tsconfig.json
	FileName: /src/project/e/ea/eaa/eaaa/x/y/z/randomFileForImport.ts ProjectRootPath: undefined
		Projects: /src/project/tsconfig.json
response:{"responseRequired":false}
modify randomFileForImport by adding import
request:{"command":"change","arguments":{"file":"/src/project/randomFileForImport.ts","line":1,"offset":1,"endLine":1,"endOffset":1,"insertString":"import type { ImportInterface0 } from \"pkg0\";\n"},"seq":1,"type":"request"}
response:{"responseRequired":false}
Starting updateGraphWorker: Project: /src/project/tsconfig.json
Reusing resolution of module 'pkg0' from '/src/project/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg1' from '/src/project/fileWithImports.ts' of old program, it was not resolved.
======== Resolving module 'pkg0' from '/src/project/randomFileForImport.ts'. ========
Module resolution kind is not specified, using 'NodeJs'.
Loading module 'pkg0' from 'node_modules' folder, target file type 'TypeScript'.
File '/src/project/node_modules/pkg0/package.json' does not exist.
File '/src/project/node_modules/pkg0.ts' does not exist.
File '/src/project/node_modules/pkg0.tsx' does not exist.
File '/src/project/node_modules/pkg0.d.ts' does not exist.
File '/src/project/node_modules/pkg0/index.ts' does not exist.
File '/src/project/node_modules/pkg0/index.tsx' does not exist.
File '/src/project/node_modules/pkg0/index.d.ts' exist - use it as a name resolution result.
Resolving real path for '/src/project/node_modules/pkg0/index.d.ts', result '/src/project/node_modules/pkg0/index.d.ts'.
======== Module name 'pkg0' was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'. ========
Reusing resolution of module 'pkg0' from '/src/project/a/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg1' from '/src/project/a/fileWithImports.ts' of old program, it was not resolved.
Reusing resolution of module 'pkg0' from '/src/project/b/ba/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg1' from '/src/project/b/ba/fileWithImports.ts' of old program, it was not resolved.
Reusing resolution of module 'pkg0' from '/src/project/c/ca/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg1' from '/src/project/c/ca/fileWithImports.ts' of old program, it was not resolved.
Reusing resolution of module 'pkg0' from '/src/project/c/ca/caa/caaa/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg1' from '/src/project/c/ca/caa/caaa/fileWithImports.ts' of old program, it was not resolved.
Reusing resolution of module 'pkg0' from '/src/project/c/cb/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg1' from '/src/project/c/cb/fileWithImports.ts' of old program, it was not resolved.
Reusing resolution of module 'pkg0' from '/src/project/d/da/daa/daaa/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg1' from '/src/project/d/da/daa/daaa/fileWithImports.ts' of old program, it was not resolved.
Reusing resolution of module 'pkg0' from '/src/project/d/da/daa/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg1' from '/src/project/d/da/daa/fileWithImports.ts' of old program, it was not resolved.
Reusing resolution of module 'pkg0' from '/src/project/d/da/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg1' from '/src/project/d/da/fileWithImports.ts' of old program, it was not resolved.
Reusing resolution of module 'pkg0' from '/src/project/e/ea/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg1' from '/src/project/e/ea/fileWithImports.ts' of old program, it was not resolved.
Reusing resolution of module 'pkg0' from '/src/project/e/ea/eaa/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg1' from '/src/project/e/ea/eaa/fileWithImports.ts' of old program, it was not resolved.
Reusing resolution of module 'pkg0' from '/src/project/e/ea/eaa/eaaa/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg1' from '/src/project/e/ea/eaa/eaaa/fileWithImports.ts' of old program, it was not resolved.
Reusing resolution of module 'pkg0' from '/src/project/f/fa/faa/faaa/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg1' from '/src/project/f/fa/faa/faaa/fileWithImports.ts' of old program, it was not resolved.
Finishing updateGraphWorker: Project: /src/project/tsconfig.json Version: 2 structureChanged: true structureIsReused:: SafeModules Elapsed:: *ms
Different program with same set of files
modify b/randomFileForImport by adding import
request:{"command":"change","arguments":{"file":"/src/project/b/randomFileForImport.ts","line":1,"offset":1,"endLine":1,"endOffset":1,"insertString":"import type { ImportInterface0 } from \"pkg0\";\n"},"seq":2,"type":"request"}
response:{"responseRequired":false}
Starting updateGraphWorker: Project: /src/project/tsconfig.json
Reusing resolution of module 'pkg0' from '/src/project/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg1' from '/src/project/fileWithImports.ts' of old program, it was not resolved.
Reusing resolution of module 'pkg0' from '/src/project/randomFileForImport.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg0' from '/src/project/a/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg1' from '/src/project/a/fileWithImports.ts' of old program, it was not resolved.
Reusing resolution of module 'pkg0' from '/src/project/b/ba/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg1' from '/src/project/b/ba/fileWithImports.ts' of old program, it was not resolved.
======== Resolving module 'pkg0' from '/src/project/b/randomFileForImport.ts'. ========
Module resolution kind is not specified, using 'NodeJs'.
Loading module 'pkg0' from 'node_modules' folder, target file type 'TypeScript'.
Directory '/src/project/b/node_modules' does not exist, skipping all lookups in it.
File '/src/project/node_modules/pkg0/package.json' does not exist according to earlier cached lookups.
File '/src/project/node_modules/pkg0.ts' does not exist.
File '/src/project/node_modules/pkg0.tsx' does not exist.
File '/src/project/node_modules/pkg0.d.ts' does not exist.
File '/src/project/node_modules/pkg0/index.ts' does not exist.
File '/src/project/node_modules/pkg0/index.tsx' does not exist.
File '/src/project/node_modules/pkg0/index.d.ts' exist - use it as a name resolution result.
Resolving real path for '/src/project/node_modules/pkg0/index.d.ts', result '/src/project/node_modules/pkg0/index.d.ts'.
======== Module name 'pkg0' was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'. ========
Reusing resolution of module 'pkg0' from '/src/project/c/ca/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg1' from '/src/project/c/ca/fileWithImports.ts' of old program, it was not resolved.
Reusing resolution of module 'pkg0' from '/src/project/c/ca/caa/caaa/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg1' from '/src/project/c/ca/caa/caaa/fileWithImports.ts' of old program, it was not resolved.
Reusing resolution of module 'pkg0' from '/src/project/c/cb/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg1' from '/src/project/c/cb/fileWithImports.ts' of old program, it was not resolved.
Reusing resolution of module 'pkg0' from '/src/project/d/da/daa/daaa/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg1' from '/src/project/d/da/daa/daaa/fileWithImports.ts' of old program, it was not resolved.
Reusing resolution of module 'pkg0' from '/src/project/d/da/daa/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg1' from '/src/project/d/da/daa/fileWithImports.ts' of old program, it was not resolved.
Reusing resolution of module 'pkg0' from '/src/project/d/da/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg1' from '/src/project/d/da/fileWithImports.ts' of old program, it was not resolved.
Reusing resolution of module 'pkg0' from '/src/project/e/ea/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg1' from '/src/project/e/ea/fileWithImports.ts' of old program, it was not resolved.
Reusing resolution of module 'pkg0' from '/src/project/e/ea/eaa/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg1' from '/src/project/e/ea/eaa/fileWithImports.ts' of old program, it was not resolved.
Reusing resolution of module 'pkg0' from '/src/project/e/ea/eaa/eaaa/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg1' from '/src/project/e/ea/eaa/eaaa/fileWithImports.ts' of old program, it was not resolved.
Reusing resolution of module 'pkg0' from '/src/project/f/fa/faa/faaa/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg1' from '/src/project/f/fa/faa/faaa/fileWithImports.ts' of old program, it was not resolved.
Finishing updateGraphWorker: Project: /src/project/tsconfig.json Version: 3 structureChanged: true structureIsReused:: SafeModules Elapsed:: *ms
Different program with same set of files
modify c/ca/caa/randomFileForImport by adding import
request:{"command":"change","arguments":{"file":"/src/project/c/ca/caa/randomFileForImport.ts","line":1,"offset":1,"endLine":1,"endOffset":1,"insertString":"import type { ImportInterface0 } from \"pkg0\";\n"},"seq":3,"type":"request"}
response:{"responseRequired":false}
Starting updateGraphWorker: Project: /src/project/tsconfig.json
Reusing resolution of module 'pkg0' from '/src/project/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg1' from '/src/project/fileWithImports.ts' of old program, it was not resolved.
Reusing resolution of module 'pkg0' from '/src/project/randomFileForImport.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg0' from '/src/project/a/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg1' from '/src/project/a/fileWithImports.ts' of old program, it was not resolved.
Reusing resolution of module 'pkg0' from '/src/project/b/ba/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg1' from '/src/project/b/ba/fileWithImports.ts' of old program, it was not resolved.
Reusing resolution of module 'pkg0' from '/src/project/b/randomFileForImport.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg0' from '/src/project/c/ca/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg1' from '/src/project/c/ca/fileWithImports.ts' of old program, it was not resolved.
======== Resolving module 'pkg0' from '/src/project/c/ca/caa/randomFileForImport.ts'. ========
Module resolution kind is not specified, using 'NodeJs'.
Loading module 'pkg0' from 'node_modules' folder, target file type 'TypeScript'.
Directory '/src/project/c/ca/caa/node_modules' does not exist, skipping all lookups in it.
Directory '/src/project/c/ca/node_modules' does not exist, skipping all lookups in it.
Directory '/src/project/c/node_modules' does not exist, skipping all lookups in it.
File '/src/project/node_modules/pkg0/package.json' does not exist according to earlier cached lookups.
File '/src/project/node_modules/pkg0.ts' does not exist.
File '/src/project/node_modules/pkg0.tsx' does not exist.
File '/src/project/node_modules/pkg0.d.ts' does not exist.
File '/src/project/node_modules/pkg0/index.ts' does not exist.
File '/src/project/node_modules/pkg0/index.tsx' does not exist.
File '/src/project/node_modules/pkg0/index.d.ts' exist - use it as a name resolution result.
Resolving real path for '/src/project/node_modules/pkg0/index.d.ts', result '/src/project/node_modules/pkg0/index.d.ts'.
======== Module name 'pkg0' was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'. ========
Reusing resolution of module 'pkg0' from '/src/project/c/ca/caa/caaa/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg1' from '/src/project/c/ca/caa/caaa/fileWithImports.ts' of old program, it was not resolved.
Reusing resolution of module 'pkg0' from '/src/project/c/cb/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg1' from '/src/project/c/cb/fileWithImports.ts' of old program, it was not resolved.
Reusing resolution of module 'pkg0' from '/src/project/d/da/daa/daaa/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg1' from '/src/project/d/da/daa/daaa/fileWithImports.ts' of old program, it was not resolved.
Reusing resolution of module 'pkg0' from '/src/project/d/da/daa/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg1' from '/src/project/d/da/daa/fileWithImports.ts' of old program, it was not resolved.
Reusing resolution of module 'pkg0' from '/src/project/d/da/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg1' from '/src/project/d/da/fileWithImports.ts' of old program, it was not resolved.
Reusing resolution of module 'pkg0' from '/src/project/e/ea/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg1' from '/src/project/e/ea/fileWithImports.ts' of old program, it was not resolved.
Reusing resolution of module 'pkg0' from '/src/project/e/ea/eaa/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg1' from '/src/project/e/ea/eaa/fileWithImports.ts' of old program, it was not resolved.
Reusing resolution of module 'pkg0' from '/src/project/e/ea/eaa/eaaa/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg1' from '/src/project/e/ea/eaa/eaaa/fileWithImports.ts' of old program, it was not resolved.
Reusing resolution of module 'pkg0' from '/src/project/f/fa/faa/faaa/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg1' from '/src/project/f/fa/faa/faaa/fileWithImports.ts' of old program, it was not resolved.
Finishing updateGraphWorker: Project: /src/project/tsconfig.json Version: 4 structureChanged: true structureIsReused:: SafeModules Elapsed:: *ms
Different program with same set of files
modify d/da/daa/daaa/x/y/z/randomFileForImport by adding import
request:{"command":"change","arguments":{"file":"/src/project/d/da/daa/daaa/x/y/z/randomFileForImport.ts","line":1,"offset":1,"endLine":1,"endOffset":1,"insertString":"import type { ImportInterface0 } from \"pkg0\";\n"},"seq":4,"type":"request"}
response:{"responseRequired":false}
Starting updateGraphWorker: Project: /src/project/tsconfig.json
Reusing resolution of module 'pkg0' from '/src/project/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg1' from '/src/project/fileWithImports.ts' of old program, it was not resolved.
Reusing resolution of module 'pkg0' from '/src/project/randomFileForImport.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg0' from '/src/project/a/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg1' from '/src/project/a/fileWithImports.ts' of old program, it was not resolved.
Reusing resolution of module 'pkg0' from '/src/project/b/ba/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg1' from '/src/project/b/ba/fileWithImports.ts' of old program, it was not resolved.
Reusing resolution of module 'pkg0' from '/src/project/b/randomFileForImport.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg0' from '/src/project/c/ca/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg1' from '/src/project/c/ca/fileWithImports.ts' of old program, it was not resolved.
Reusing resolution of module 'pkg0' from '/src/project/c/ca/caa/randomFileForImport.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg0' from '/src/project/c/ca/caa/caaa/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg1' from '/src/project/c/ca/caa/caaa/fileWithImports.ts' of old program, it was not resolved.
Reusing resolution of module 'pkg0' from '/src/project/c/cb/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg1' from '/src/project/c/cb/fileWithImports.ts' of old program, it was not resolved.
======== Resolving module 'pkg0' from '/src/project/d/da/daa/daaa/x/y/z/randomFileForImport.ts'. ========
Module resolution kind is not specified, using 'NodeJs'.
Loading module 'pkg0' from 'node_modules' folder, target file type 'TypeScript'.
Directory '/src/project/d/da/daa/daaa/x/y/z/node_modules' does not exist, skipping all lookups in it.
Directory '/src/project/d/da/daa/daaa/x/y/node_modules' does not exist, skipping all lookups in it.
Directory '/src/project/d/da/daa/daaa/x/node_modules' does not exist, skipping all lookups in it.
Directory '/src/project/d/da/daa/daaa/node_modules' does not exist, skipping all lookups in it.
Directory '/src/project/d/da/daa/node_modules' does not exist, skipping all lookups in it.
Directory '/src/project/d/da/node_modules' does not exist, skipping all lookups in it.
Directory '/src/project/d/node_modules' does not exist, skipping all lookups in it.
File '/src/project/node_modules/pkg0/package.json' does not exist according to earlier cached lookups.
File '/src/project/node_modules/pkg0.ts' does not exist.
File '/src/project/node_modules/pkg0.tsx' does not exist.
File '/src/project/node_modules/pkg0.d.ts' does not exist.
File '/src/project/node_modules/pkg0/index.ts' does not exist.
File '/src/project/node_modules/pkg0/index.tsx' does not exist.
File '/src/project/node_modules/pkg0/index.d.ts' exist - use it as a name resolution result.
Resolving real path for '/src/project/node_modules/pkg0/index.d.ts', result '/src/project/node_modules/pkg0/index.d.ts'.
======== Module name 'pkg0' was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'. ========
Reusing resolution of module 'pkg0' from '/src/project/d/da/daa/daaa/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg1' from '/src/project/d/da/daa/daaa/fileWithImports.ts' of old program, it was not resolved.
Reusing resolution of module 'pkg0' from '/src/project/d/da/daa/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg1' from '/src/project/d/da/daa/fileWithImports.ts' of old program, it was not resolved.
Reusing resolution of module 'pkg0' from '/src/project/d/da/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg1' from '/src/project/d/da/fileWithImports.ts' of old program, it was not resolved.
Reusing resolution of module 'pkg0' from '/src/project/e/ea/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg1' from '/src/project/e/ea/fileWithImports.ts' of old program, it was not resolved.
Reusing resolution of module 'pkg0' from '/src/project/e/ea/eaa/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg1' from '/src/project/e/ea/eaa/fileWithImports.ts' of old program, it was not resolved.
Reusing resolution of module 'pkg0' from '/src/project/e/ea/eaa/eaaa/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg1' from '/src/project/e/ea/eaa/eaaa/fileWithImports.ts' of old program, it was not resolved.
Reusing resolution of module 'pkg0' from '/src/project/f/fa/faa/faaa/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg1' from '/src/project/f/fa/faa/faaa/fileWithImports.ts' of old program, it was not resolved.
Finishing updateGraphWorker: Project: /src/project/tsconfig.json Version: 5 structureChanged: true structureIsReused:: SafeModules Elapsed:: *ms
Different program with same set of files
modify e/ea/eaa/eaaa/x/y/z/randomFileForImport by adding import
request:{"command":"change","arguments":{"file":"/src/project/e/ea/eaa/eaaa/x/y/z/randomFileForImport.ts","line":1,"offset":1,"endLine":1,"endOffset":1,"insertString":"import type { ImportInterface0 } from \"pkg0\";\n"},"seq":5,"type":"request"}
response:{"responseRequired":false}
Starting updateGraphWorker: Project: /src/project/tsconfig.json
Reusing resolution of module 'pkg0' from '/src/project/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg1' from '/src/project/fileWithImports.ts' of old program, it was not resolved.
Reusing resolution of module 'pkg0' from '/src/project/randomFileForImport.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg0' from '/src/project/a/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg1' from '/src/project/a/fileWithImports.ts' of old program, it was not resolved.
Reusing resolution of module 'pkg0' from '/src/project/b/ba/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg1' from '/src/project/b/ba/fileWithImports.ts' of old program, it was not resolved.
Reusing resolution of module 'pkg0' from '/src/project/b/randomFileForImport.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg0' from '/src/project/c/ca/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg1' from '/src/project/c/ca/fileWithImports.ts' of old program, it was not resolved.
Reusing resolution of module 'pkg0' from '/src/project/c/ca/caa/randomFileForImport.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg0' from '/src/project/c/ca/caa/caaa/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg1' from '/src/project/c/ca/caa/caaa/fileWithImports.ts' of old program, it was not resolved.
Reusing resolution of module 'pkg0' from '/src/project/c/cb/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg1' from '/src/project/c/cb/fileWithImports.ts' of old program, it was not resolved.
Reusing resolution of module 'pkg0' from '/src/project/d/da/daa/daaa/x/y/z/randomFileForImport.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg0' from '/src/project/d/da/daa/daaa/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg1' from '/src/project/d/da/daa/daaa/fileWithImports.ts' of old program, it was not resolved.
Reusing resolution of module 'pkg0' from '/src/project/d/da/daa/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg1' from '/src/project/d/da/daa/fileWithImports.ts' of old program, it was not resolved.
Reusing resolution of module 'pkg0' from '/src/project/d/da/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg1' from '/src/project/d/da/fileWithImports.ts' of old program, it was not resolved.
Reusing resolution of module 'pkg0' from '/src/project/e/ea/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg1' from '/src/project/e/ea/fileWithImports.ts' of old program, it was not resolved.
Reusing resolution of module 'pkg0' from '/src/project/e/ea/eaa/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg1' from '/src/project/e/ea/eaa/fileWithImports.ts' of old program, it was not resolved.
Reusing resolution of module 'pkg0' from '/src/project/e/ea/eaa/eaaa/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg1' from '/src/project/e/ea/eaa/eaaa/fileWithImports.ts' of old program, it was not resolved.
======== Resolving module 'pkg0' from '/src/project/e/ea/eaa/eaaa/x/y/z/randomFileForImport.ts'. ========
Module resolution kind is not specified, using 'NodeJs'.
Loading module 'pkg0' from 'node_modules' folder, target file type 'TypeScript'.
Directory '/src/project/e/ea/eaa/eaaa/x/y/z/node_modules' does not exist, skipping all lookups in it.
Directory '/src/project/e/ea/eaa/eaaa/x/y/node_modules' does not exist, skipping all lookups in it.
Directory '/src/project/e/ea/eaa/eaaa/x/node_modules' does not exist, skipping all lookups in it.
Directory '/src/project/e/ea/eaa/eaaa/node_modules' does not exist, skipping all lookups in it.
Directory '/src/project/e/ea/eaa/node_modules' does not exist, skipping all lookups in it.
Directory '/src/project/e/ea/node_modules' does not exist, skipping all lookups in it.
Directory '/src/project/e/node_modules' does not exist, skipping all lookups in it.
File '/src/project/node_modules/pkg0/package.json' does not exist according to earlier cached lookups.
File '/src/project/node_modules/pkg0.ts' does not exist.
File '/src/project/node_modules/pkg0.tsx' does not exist.
File '/src/project/node_modules/pkg0.d.ts' does not exist.
File '/src/project/node_modules/pkg0/index.ts' does not exist.
File '/src/project/node_modules/pkg0/index.tsx' does not exist.
File '/src/project/node_modules/pkg0/index.d.ts' exist - use it as a name resolution result.
Resolving real path for '/src/project/node_modules/pkg0/index.d.ts', result '/src/project/node_modules/pkg0/index.d.ts'.
======== Module name 'pkg0' was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'. ========
Reusing resolution of module 'pkg0' from '/src/project/f/fa/faa/faaa/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg1' from '/src/project/f/fa/faa/faaa/fileWithImports.ts' of old program, it was not resolved.
Finishing updateGraphWorker: Project: /src/project/tsconfig.json Version: 6 structureChanged: true structureIsReused:: SafeModules Elapsed:: *ms
Different program with same set of files
modify randomFileForImport by adding unresolved import
request:{"command":"change","arguments":{"file":"/src/project/randomFileForImport.ts","line":1,"offset":1,"endLine":1,"endOffset":1,"insertString":"import type { ImportInterface1 } from \"pkg1\";\n"},"seq":6,"type":"request"}
response:{"responseRequired":false}
Starting updateGraphWorker: Project: /src/project/tsconfig.json
Reusing resolution of module 'pkg0' from '/src/project/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg1' from '/src/project/fileWithImports.ts' of old program, it was not resolved.
======== Resolving module 'pkg1' from '/src/project/randomFileForImport.ts'. ========
Module resolution kind is not specified, using 'NodeJs'.
Loading module 'pkg1' from 'node_modules' folder, target file type 'TypeScript'.
File '/src/project/node_modules/pkg1.ts' does not exist.
File '/src/project/node_modules/pkg1.tsx' does not exist.
File '/src/project/node_modules/pkg1.d.ts' does not exist.
Directory '/src/project/node_modules/@types' does not exist, skipping all lookups in it.
Directory '/src/node_modules' does not exist, skipping all lookups in it.
Directory '/node_modules' does not exist, skipping all lookups in it.
Loading module 'pkg1' from 'node_modules' folder, target file type 'JavaScript'.
File '/src/project/node_modules/pkg1.js' does not exist.
File '/src/project/node_modules/pkg1.jsx' does not exist.
Directory '/src/node_modules' does not exist, skipping all lookups in it.
Directory '/node_modules' does not exist, skipping all lookups in it.
======== Module name 'pkg1' was not resolved. ========
Reusing resolution of module 'pkg0' from '/src/project/randomFileForImport.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg0' from '/src/project/a/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg1' from '/src/project/a/fileWithImports.ts' of old program, it was not resolved.
Reusing resolution of module 'pkg0' from '/src/project/b/ba/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg1' from '/src/project/b/ba/fileWithImports.ts' of old program, it was not resolved.
Reusing resolution of module 'pkg0' from '/src/project/b/randomFileForImport.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg0' from '/src/project/c/ca/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg1' from '/src/project/c/ca/fileWithImports.ts' of old program, it was not resolved.
Reusing resolution of module 'pkg0' from '/src/project/c/ca/caa/randomFileForImport.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg0' from '/src/project/c/ca/caa/caaa/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg1' from '/src/project/c/ca/caa/caaa/fileWithImports.ts' of old program, it was not resolved.
Reusing resolution of module 'pkg0' from '/src/project/c/cb/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg1' from '/src/project/c/cb/fileWithImports.ts' of old program, it was not resolved.
Reusing resolution of module 'pkg0' from '/src/project/d/da/daa/daaa/x/y/z/randomFileForImport.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg0' from '/src/project/d/da/daa/daaa/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg1' from '/src/project/d/da/daa/daaa/fileWithImports.ts' of old program, it was not resolved.
Reusing resolution of module 'pkg0' from '/src/project/d/da/daa/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg1' from '/src/project/d/da/daa/fileWithImports.ts' of old program, it was not resolved.
Reusing resolution of module 'pkg0' from '/src/project/d/da/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg1' from '/src/project/d/da/fileWithImports.ts' of old program, it was not resolved.
Reusing resolution of module 'pkg0' from '/src/project/e/ea/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg1' from '/src/project/e/ea/fileWithImports.ts' of old program, it was not resolved.
Reusing resolution of module 'pkg0' from '/src/project/e/ea/eaa/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg1' from '/src/project/e/ea/eaa/fileWithImports.ts' of old program, it was not resolved.
Reusing resolution of module 'pkg0' from '/src/project/e/ea/eaa/eaaa/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg1' from '/src/project/e/ea/eaa/eaaa/fileWithImports.ts' of old program, it was not resolved.
Reusing resolution of module 'pkg0' from '/src/project/e/ea/eaa/eaaa/x/y/z/randomFileForImport.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg0' from '/src/project/f/fa/faa/faaa/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg1' from '/src/project/f/fa/faa/faaa/fileWithImports.ts' of old program, it was not resolved.
Finishing updateGraphWorker: Project: /src/project/tsconfig.json Version: 7 structureChanged: true structureIsReused:: SafeModules Elapsed:: *ms
Different program with same set of files
modify b/randomFileForImport by adding unresolved import
request:{"command":"change","arguments":{"file":"/src/project/b/randomFileForImport.ts","line":1,"offset":1,"endLine":1,"endOffset":1,"insertString":"import type { ImportInterface1 } from \"pkg1\";\n"},"seq":7,"type":"request"}
response:{"responseRequired":false}
Starting updateGraphWorker: Project: /src/project/tsconfig.json
Reusing resolution of module 'pkg0' from '/src/project/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg1' from '/src/project/fileWithImports.ts' of old program, it was not resolved.
Reusing resolution of module 'pkg0' from '/src/project/randomFileForImport.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg1' from '/src/project/randomFileForImport.ts' of old program, it was not resolved.
Reusing resolution of module 'pkg0' from '/src/project/a/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg1' from '/src/project/a/fileWithImports.ts' of old program, it was not resolved.
Reusing resolution of module 'pkg0' from '/src/project/b/ba/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg1' from '/src/project/b/ba/fileWithImports.ts' of old program, it was not resolved.
======== Resolving module 'pkg1' from '/src/project/b/randomFileForImport.ts'. ========
Module resolution kind is not specified, using 'NodeJs'.
Loading module 'pkg1' from 'node_modules' folder, target file type 'TypeScript'.
Directory '/src/project/b/node_modules' does not exist, skipping all lookups in it.
File '/src/project/node_modules/pkg1.ts' does not exist.
File '/src/project/node_modules/pkg1.tsx' does not exist.
File '/src/project/node_modules/pkg1.d.ts' does not exist.
Directory '/src/project/node_modules/@types' does not exist, skipping all lookups in it.
Directory '/src/node_modules' does not exist, skipping all lookups in it.
Directory '/node_modules' does not exist, skipping all lookups in it.
Loading module 'pkg1' from 'node_modules' folder, target file type 'JavaScript'.
Directory '/src/project/b/node_modules' does not exist, skipping all lookups in it.
File '/src/project/node_modules/pkg1.js' does not exist.
File '/src/project/node_modules/pkg1.jsx' does not exist.
Directory '/src/node_modules' does not exist, skipping all lookups in it.
Directory '/node_modules' does not exist, skipping all lookups in it.
======== Module name 'pkg1' was not resolved. ========
Reusing resolution of module 'pkg0' from '/src/project/b/randomFileForImport.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg0' from '/src/project/c/ca/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg1' from '/src/project/c/ca/fileWithImports.ts' of old program, it was not resolved.
Reusing resolution of module 'pkg0' from '/src/project/c/ca/caa/randomFileForImport.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg0' from '/src/project/c/ca/caa/caaa/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg1' from '/src/project/c/ca/caa/caaa/fileWithImports.ts' of old program, it was not resolved.
Reusing resolution of module 'pkg0' from '/src/project/c/cb/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg1' from '/src/project/c/cb/fileWithImports.ts' of old program, it was not resolved.
Reusing resolution of module 'pkg0' from '/src/project/d/da/daa/daaa/x/y/z/randomFileForImport.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg0' from '/src/project/d/da/daa/daaa/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg1' from '/src/project/d/da/daa/daaa/fileWithImports.ts' of old program, it was not resolved.
Reusing resolution of module 'pkg0' from '/src/project/d/da/daa/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg1' from '/src/project/d/da/daa/fileWithImports.ts' of old program, it was not resolved.
Reusing resolution of module 'pkg0' from '/src/project/d/da/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg1' from '/src/project/d/da/fileWithImports.ts' of old program, it was not resolved.
Reusing resolution of module 'pkg0' from '/src/project/e/ea/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg1' from '/src/project/e/ea/fileWithImports.ts' of old program, it was not resolved.
Reusing resolution of module 'pkg0' from '/src/project/e/ea/eaa/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg1' from '/src/project/e/ea/eaa/fileWithImports.ts' of old program, it was not resolved.
Reusing resolution of module 'pkg0' from '/src/project/e/ea/eaa/eaaa/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg1' from '/src/project/e/ea/eaa/eaaa/fileWithImports.ts' of old program, it was not resolved.
Reusing resolution of module 'pkg0' from '/src/project/e/ea/eaa/eaaa/x/y/z/randomFileForImport.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg0' from '/src/project/f/fa/faa/faaa/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg1' from '/src/project/f/fa/faa/faaa/fileWithImports.ts' of old program, it was not resolved.
Finishing updateGraphWorker: Project: /src/project/tsconfig.json Version: 8 structureChanged: true structureIsReused:: SafeModules Elapsed:: *ms
Different program with same set of files
modify c/ca/caa/randomFileForImport by adding unresolved import
request:{"command":"change","arguments":{"file":"/src/project/c/ca/caa/randomFileForImport.ts","line":1,"offset":1,"endLine":1,"endOffset":1,"insertString":"import type { ImportInterface1 } from \"pkg1\";\n"},"seq":8,"type":"request"}
response:{"responseRequired":false}
Starting updateGraphWorker: Project: /src/project/tsconfig.json
Reusing resolution of module 'pkg0' from '/src/project/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg1' from '/src/project/fileWithImports.ts' of old program, it was not resolved.
Reusing resolution of module 'pkg0' from '/src/project/randomFileForImport.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg1' from '/src/project/randomFileForImport.ts' of old program, it was not resolved.
Reusing resolution of module 'pkg0' from '/src/project/a/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg1' from '/src/project/a/fileWithImports.ts' of old program, it was not resolved.
Reusing resolution of module 'pkg0' from '/src/project/b/ba/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg1' from '/src/project/b/ba/fileWithImports.ts' of old program, it was not resolved.
Reusing resolution of module 'pkg0' from '/src/project/b/randomFileForImport.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg1' from '/src/project/b/randomFileForImport.ts' of old program, it was not resolved.
Reusing resolution of module 'pkg0' from '/src/project/c/ca/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg1' from '/src/project/c/ca/fileWithImports.ts' of old program, it was not resolved.
======== Resolving module 'pkg1' from '/src/project/c/ca/caa/randomFileForImport.ts'. ========
Module resolution kind is not specified, using 'NodeJs'.
Loading module 'pkg1' from 'node_modules' folder, target file type 'TypeScript'.
Directory '/src/project/c/ca/caa/node_modules' does not exist, skipping all lookups in it.
Directory '/src/project/c/ca/node_modules' does not exist, skipping all lookups in it.
Directory '/src/project/c/node_modules' does not exist, skipping all lookups in it.
File '/src/project/node_modules/pkg1.ts' does not exist.
File '/src/project/node_modules/pkg1.tsx' does not exist.
File '/src/project/node_modules/pkg1.d.ts' does not exist.
Directory '/src/project/node_modules/@types' does not exist, skipping all lookups in it.
Directory '/src/node_modules' does not exist, skipping all lookups in it.
Directory '/node_modules' does not exist, skipping all lookups in it.
Loading module 'pkg1' from 'node_modules' folder, target file type 'JavaScript'.
Directory '/src/project/c/ca/caa/node_modules' does not exist, skipping all lookups in it.
Directory '/src/project/c/ca/node_modules' does not exist, skipping all lookups in it.
Directory '/src/project/c/node_modules' does not exist, skipping all lookups in it.
File '/src/project/node_modules/pkg1.js' does not exist.
File '/src/project/node_modules/pkg1.jsx' does not exist.
Directory '/src/node_modules' does not exist, skipping all lookups in it.
Directory '/node_modules' does not exist, skipping all lookups in it.
======== Module name 'pkg1' was not resolved. ========
Reusing resolution of module 'pkg0' from '/src/project/c/ca/caa/randomFileForImport.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg0' from '/src/project/c/ca/caa/caaa/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg1' from '/src/project/c/ca/caa/caaa/fileWithImports.ts' of old program, it was not resolved.
Reusing resolution of module 'pkg0' from '/src/project/c/cb/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg1' from '/src/project/c/cb/fileWithImports.ts' of old program, it was not resolved.
Reusing resolution of module 'pkg0' from '/src/project/d/da/daa/daaa/x/y/z/randomFileForImport.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg0' from '/src/project/d/da/daa/daaa/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg1' from '/src/project/d/da/daa/daaa/fileWithImports.ts' of old program, it was not resolved.
Reusing resolution of module 'pkg0' from '/src/project/d/da/daa/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg1' from '/src/project/d/da/daa/fileWithImports.ts' of old program, it was not resolved.
Reusing resolution of module 'pkg0' from '/src/project/d/da/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg1' from '/src/project/d/da/fileWithImports.ts' of old program, it was not resolved.
Reusing resolution of module 'pkg0' from '/src/project/e/ea/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg1' from '/src/project/e/ea/fileWithImports.ts' of old program, it was not resolved.
Reusing resolution of module 'pkg0' from '/src/project/e/ea/eaa/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg1' from '/src/project/e/ea/eaa/fileWithImports.ts' of old program, it was not resolved.
Reusing resolution of module 'pkg0' from '/src/project/e/ea/eaa/eaaa/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg1' from '/src/project/e/ea/eaa/eaaa/fileWithImports.ts' of old program, it was not resolved.
Reusing resolution of module 'pkg0' from '/src/project/e/ea/eaa/eaaa/x/y/z/randomFileForImport.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg0' from '/src/project/f/fa/faa/faaa/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg1' from '/src/project/f/fa/faa/faaa/fileWithImports.ts' of old program, it was not resolved.
Finishing updateGraphWorker: Project: /src/project/tsconfig.json Version: 9 structureChanged: true structureIsReused:: SafeModules Elapsed:: *ms
Different program with same set of files
modify d/da/daa/daaa/x/y/z/randomFileForImport by adding unresolved import
request:{"command":"change","arguments":{"file":"/src/project/d/da/daa/daaa/x/y/z/randomFileForImport.ts","line":1,"offset":1,"endLine":1,"endOffset":1,"insertString":"import type { ImportInterface1 } from \"pkg1\";\n"},"seq":9,"type":"request"}
response:{"responseRequired":false}
Starting updateGraphWorker: Project: /src/project/tsconfig.json
Reusing resolution of module 'pkg0' from '/src/project/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg1' from '/src/project/fileWithImports.ts' of old program, it was not resolved.
Reusing resolution of module 'pkg0' from '/src/project/randomFileForImport.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg1' from '/src/project/randomFileForImport.ts' of old program, it was not resolved.
Reusing resolution of module 'pkg0' from '/src/project/a/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg1' from '/src/project/a/fileWithImports.ts' of old program, it was not resolved.
Reusing resolution of module 'pkg0' from '/src/project/b/ba/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg1' from '/src/project/b/ba/fileWithImports.ts' of old program, it was not resolved.
Reusing resolution of module 'pkg0' from '/src/project/b/randomFileForImport.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg1' from '/src/project/b/randomFileForImport.ts' of old program, it was not resolved.
Reusing resolution of module 'pkg0' from '/src/project/c/ca/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg1' from '/src/project/c/ca/fileWithImports.ts' of old program, it was not resolved.
Reusing resolution of module 'pkg0' from '/src/project/c/ca/caa/randomFileForImport.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg1' from '/src/project/c/ca/caa/randomFileForImport.ts' of old program, it was not resolved.
Reusing resolution of module 'pkg0' from '/src/project/c/ca/caa/caaa/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg1' from '/src/project/c/ca/caa/caaa/fileWithImports.ts' of old program, it was not resolved.
Reusing resolution of module 'pkg0' from '/src/project/c/cb/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg1' from '/src/project/c/cb/fileWithImports.ts' of old program, it was not resolved.
======== Resolving module 'pkg1' from '/src/project/d/da/daa/daaa/x/y/z/randomFileForImport.ts'. ========
Module resolution kind is not specified, using 'NodeJs'.
Loading module 'pkg1' from 'node_modules' folder, target file type 'TypeScript'.
Directory '/src/project/d/da/daa/daaa/x/y/z/node_modules' does not exist, skipping all lookups in it.
Directory '/src/project/d/da/daa/daaa/x/y/node_modules' does not exist, skipping all lookups in it.
Directory '/src/project/d/da/daa/daaa/x/node_modules' does not exist, skipping all lookups in it.
Directory '/src/project/d/da/daa/daaa/node_modules' does not exist, skipping all lookups in it.
Directory '/src/project/d/da/daa/node_modules' does not exist, skipping all lookups in it.
Directory '/src/project/d/da/node_modules' does not exist, skipping all lookups in it.
Directory '/src/project/d/node_modules' does not exist, skipping all lookups in it.
File '/src/project/node_modules/pkg1.ts' does not exist.
File '/src/project/node_modules/pkg1.tsx' does not exist.
File '/src/project/node_modules/pkg1.d.ts' does not exist.
Directory '/src/project/node_modules/@types' does not exist, skipping all lookups in it.
Directory '/src/node_modules' does not exist, skipping all lookups in it.
Directory '/node_modules' does not exist, skipping all lookups in it.
Loading module 'pkg1' from 'node_modules' folder, target file type 'JavaScript'.
Directory '/src/project/d/da/daa/daaa/x/y/z/node_modules' does not exist, skipping all lookups in it.
Directory '/src/project/d/da/daa/daaa/x/y/node_modules' does not exist, skipping all lookups in it.
Directory '/src/project/d/da/daa/daaa/x/node_modules' does not exist, skipping all lookups in it.
Directory '/src/project/d/da/daa/daaa/node_modules' does not exist, skipping all lookups in it.
Directory '/src/project/d/da/daa/node_modules' does not exist, skipping all lookups in it.
Directory '/src/project/d/da/node_modules' does not exist, skipping all lookups in it.
Directory '/src/project/d/node_modules' does not exist, skipping all lookups in it.
File '/src/project/node_modules/pkg1.js' does not exist.
File '/src/project/node_modules/pkg1.jsx' does not exist.
Directory '/src/node_modules' does not exist, skipping all lookups in it.
Directory '/node_modules' does not exist, skipping all lookups in it.
======== Module name 'pkg1' was not resolved. ========
Reusing resolution of module 'pkg0' from '/src/project/d/da/daa/daaa/x/y/z/randomFileForImport.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg0' from '/src/project/d/da/daa/daaa/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg1' from '/src/project/d/da/daa/daaa/fileWithImports.ts' of old program, it was not resolved.
Reusing resolution of module 'pkg0' from '/src/project/d/da/daa/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg1' from '/src/project/d/da/daa/fileWithImports.ts' of old program, it was not resolved.
Reusing resolution of module 'pkg0' from '/src/project/d/da/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg1' from '/src/project/d/da/fileWithImports.ts' of old program, it was not resolved.
Reusing resolution of module 'pkg0' from '/src/project/e/ea/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg1' from '/src/project/e/ea/fileWithImports.ts' of old program, it was not resolved.
Reusing resolution of module 'pkg0' from '/src/project/e/ea/eaa/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg1' from '/src/project/e/ea/eaa/fileWithImports.ts' of old program, it was not resolved.
Reusing resolution of module 'pkg0' from '/src/project/e/ea/eaa/eaaa/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg1' from '/src/project/e/ea/eaa/eaaa/fileWithImports.ts' of old program, it was not resolved.
Reusing resolution of module 'pkg0' from '/src/project/e/ea/eaa/eaaa/x/y/z/randomFileForImport.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg0' from '/src/project/f/fa/faa/faaa/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg1' from '/src/project/f/fa/faa/faaa/fileWithImports.ts' of old program, it was not resolved.
Finishing updateGraphWorker: Project: /src/project/tsconfig.json Version: 10 structureChanged: true structureIsReused:: SafeModules Elapsed:: *ms
Different program with same set of files
modify e/ea/eaa/eaaa/x/y/z/randomFileForImport by adding unresolved import
request:{"command":"change","arguments":{"file":"/src/project/e/ea/eaa/eaaa/x/y/z/randomFileForImport.ts","line":1,"offset":1,"endLine":1,"endOffset":1,"insertString":"import type { ImportInterface1 } from \"pkg1\";\n"},"seq":10,"type":"request"}
response:{"responseRequired":false}
Starting updateGraphWorker: Project: /src/project/tsconfig.json
Reusing resolution of module 'pkg0' from '/src/project/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg1' from '/src/project/fileWithImports.ts' of old program, it was not resolved.
Reusing resolution of module 'pkg0' from '/src/project/randomFileForImport.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg1' from '/src/project/randomFileForImport.ts' of old program, it was not resolved.
Reusing resolution of module 'pkg0' from '/src/project/a/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg1' from '/src/project/a/fileWithImports.ts' of old program, it was not resolved.
Reusing resolution of module 'pkg0' from '/src/project/b/ba/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg1' from '/src/project/b/ba/fileWithImports.ts' of old program, it was not resolved.
Reusing resolution of module 'pkg0' from '/src/project/b/randomFileForImport.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg1' from '/src/project/b/randomFileForImport.ts' of old program, it was not resolved.
Reusing resolution of module 'pkg0' from '/src/project/c/ca/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg1' from '/src/project/c/ca/fileWithImports.ts' of old program, it was not resolved.
Reusing resolution of module 'pkg0' from '/src/project/c/ca/caa/randomFileForImport.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg1' from '/src/project/c/ca/caa/randomFileForImport.ts' of old program, it was not resolved.
Reusing resolution of module 'pkg0' from '/src/project/c/ca/caa/caaa/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg1' from '/src/project/c/ca/caa/caaa/fileWithImports.ts' of old program, it was not resolved.
Reusing resolution of module 'pkg0' from '/src/project/c/cb/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg1' from '/src/project/c/cb/fileWithImports.ts' of old program, it was not resolved.
Reusing resolution of module 'pkg0' from '/src/project/d/da/daa/daaa/x/y/z/randomFileForImport.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg1' from '/src/project/d/da/daa/daaa/x/y/z/randomFileForImport.ts' of old program, it was not resolved.
Reusing resolution of module 'pkg0' from '/src/project/d/da/daa/daaa/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg1' from '/src/project/d/da/daa/daaa/fileWithImports.ts' of old program, it was not resolved.
Reusing resolution of module 'pkg0' from '/src/project/d/da/daa/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg1' from '/src/project/d/da/daa/fileWithImports.ts' of old program, it was not resolved.
Reusing resolution of module 'pkg0' from '/src/project/d/da/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg1' from '/src/project/d/da/fileWithImports.ts' of old program, it was not resolved.
Reusing resolution of module 'pkg0' from '/src/project/e/ea/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg1' from '/src/project/e/ea/fileWithImports.ts' of old program, it was not resolved.
Reusing resolution of module 'pkg0' from '/src/project/e/ea/eaa/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg1' from '/src/project/e/ea/eaa/fileWithImports.ts' of old program, it was not resolved.
Reusing resolution of module 'pkg0' from '/src/project/e/ea/eaa/eaaa/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg1' from '/src/project/e/ea/eaa/eaaa/fileWithImports.ts' of old program, it was not resolved.
======== Resolving module 'pkg1' from '/src/project/e/ea/eaa/eaaa/x/y/z/randomFileForImport.ts'. ========
Module resolution kind is not specified, using 'NodeJs'.
Loading module 'pkg1' from 'node_modules' folder, target file type 'TypeScript'.
Directory '/src/project/e/ea/eaa/eaaa/x/y/z/node_modules' does not exist, skipping all lookups in it.
Directory '/src/project/e/ea/eaa/eaaa/x/y/node_modules' does not exist, skipping all lookups in it.
Directory '/src/project/e/ea/eaa/eaaa/x/node_modules' does not exist, skipping all lookups in it.
Directory '/src/project/e/ea/eaa/eaaa/node_modules' does not exist, skipping all lookups in it.
Directory '/src/project/e/ea/eaa/node_modules' does not exist, skipping all lookups in it.
Directory '/src/project/e/ea/node_modules' does not exist, skipping all lookups in it.
Directory '/src/project/e/node_modules' does not exist, skipping all lookups in it.
File '/src/project/node_modules/pkg1.ts' does not exist.
File '/src/project/node_modules/pkg1.tsx' does not exist.
File '/src/project/node_modules/pkg1.d.ts' does not exist.
Directory '/src/project/node_modules/@types' does not exist, skipping all lookups in it.
Directory '/src/node_modules' does not exist, skipping all lookups in it.
Directory '/node_modules' does not exist, skipping all lookups in it.
Loading module 'pkg1' from 'node_modules' folder, target file type 'JavaScript'.
Directory '/src/project/e/ea/eaa/eaaa/x/y/z/node_modules' does not exist, skipping all lookups in it.
Directory '/src/project/e/ea/eaa/eaaa/x/y/node_modules' does not exist, skipping all lookups in it.
Directory '/src/project/e/ea/eaa/eaaa/x/node_modules' does not exist, skipping all lookups in it.
Directory '/src/project/e/ea/eaa/eaaa/node_modules' does not exist, skipping all lookups in it.
Directory '/src/project/e/ea/eaa/node_modules' does not exist, skipping all lookups in it.
Directory '/src/project/e/ea/node_modules' does not exist, skipping all lookups in it.
Directory '/src/project/e/node_modules' does not exist, skipping all lookups in it.
File '/src/project/node_modules/pkg1.js' does not exist.
File '/src/project/node_modules/pkg1.jsx' does not exist.
Directory '/src/node_modules' does not exist, skipping all lookups in it.
Directory '/node_modules' does not exist, skipping all lookups in it.
======== Module name 'pkg1' was not resolved. ========
Reusing resolution of module 'pkg0' from '/src/project/e/ea/eaa/eaaa/x/y/z/randomFileForImport.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg0' from '/src/project/f/fa/faa/faaa/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg1' from '/src/project/f/fa/faa/faaa/fileWithImports.ts' of old program, it was not resolved.
Finishing updateGraphWorker: Project: /src/project/tsconfig.json Version: 11 structureChanged: true structureIsReused:: SafeModules Elapsed:: *ms
Different program with same set of files
modify f/fa/faa/x/y/z/randomFileForImport by adding import
request:{"command":"change","arguments":{"file":"/src/project/f/fa/faa/x/y/z/randomFileForImport.ts","line":1,"offset":1,"endLine":1,"endOffset":1,"insertString":"import type { ImportInterface0 } from \"pkg0\";\n"},"seq":11,"type":"request"}
response:{"responseRequired":false}
Starting updateGraphWorker: Project: /src/project/tsconfig.json
Reusing resolution of module 'pkg0' from '/src/project/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg1' from '/src/project/fileWithImports.ts' of old program, it was not resolved.
Reusing resolution of module 'pkg0' from '/src/project/randomFileForImport.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg1' from '/src/project/randomFileForImport.ts' of old program, it was not resolved.
Reusing resolution of module 'pkg0' from '/src/project/a/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg1' from '/src/project/a/fileWithImports.ts' of old program, it was not resolved.
Reusing resolution of module 'pkg0' from '/src/project/b/ba/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg1' from '/src/project/b/ba/fileWithImports.ts' of old program, it was not resolved.
Reusing resolution of module 'pkg0' from '/src/project/b/randomFileForImport.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg1' from '/src/project/b/randomFileForImport.ts' of old program, it was not resolved.
Reusing resolution of module 'pkg0' from '/src/project/c/ca/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg1' from '/src/project/c/ca/fileWithImports.ts' of old program, it was not resolved.
Reusing resolution of module 'pkg0' from '/src/project/c/ca/caa/randomFileForImport.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg1' from '/src/project/c/ca/caa/randomFileForImport.ts' of old program, it was not resolved.
Reusing resolution of module 'pkg0' from '/src/project/c/ca/caa/caaa/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg1' from '/src/project/c/ca/caa/caaa/fileWithImports.ts' of old program, it was not resolved.
Reusing resolution of module 'pkg0' from '/src/project/c/cb/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg1' from '/src/project/c/cb/fileWithImports.ts' of old program, it was not resolved.
Reusing resolution of module 'pkg0' from '/src/project/d/da/daa/daaa/x/y/z/randomFileForImport.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg1' from '/src/project/d/da/daa/daaa/x/y/z/randomFileForImport.ts' of old program, it was not resolved.
Reusing resolution of module 'pkg0' from '/src/project/d/da/daa/daaa/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg1' from '/src/project/d/da/daa/daaa/fileWithImports.ts' of old program, it was not resolved.
Reusing resolution of module 'pkg0' from '/src/project/d/da/daa/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg1' from '/src/project/d/da/daa/fileWithImports.ts' of old program, it was not resolved.
Reusing resolution of module 'pkg0' from '/src/project/d/da/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg1' from '/src/project/d/da/fileWithImports.ts' of old program, it was not resolved.
Reusing resolution of module 'pkg0' from '/src/project/e/ea/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg1' from '/src/project/e/ea/fileWithImports.ts' of old program, it was not resolved.
Reusing resolution of module 'pkg0' from '/src/project/e/ea/eaa/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg1' from '/src/project/e/ea/eaa/fileWithImports.ts' of old program, it was not resolved.
Reusing resolution of module 'pkg0' from '/src/project/e/ea/eaa/eaaa/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg1' from '/src/project/e/ea/eaa/eaaa/fileWithImports.ts' of old program, it was not resolved.
Reusing resolution of module 'pkg0' from '/src/project/e/ea/eaa/eaaa/x/y/z/randomFileForImport.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg1' from '/src/project/e/ea/eaa/eaaa/x/y/z/randomFileForImport.ts' of old program, it was not resolved.
======== Resolving module 'pkg0' from '/src/project/f/fa/faa/x/y/z/randomFileForImport.ts'. ========
Module resolution kind is not specified, using 'NodeJs'.
Loading module 'pkg0' from 'node_modules' folder, target file type 'TypeScript'.
Directory '/src/project/f/fa/faa/x/y/z/node_modules' does not exist, skipping all lookups in it.
Directory '/src/project/f/fa/faa/x/y/node_modules' does not exist, skipping all lookups in it.
Directory '/src/project/f/fa/faa/x/node_modules' does not exist, skipping all lookups in it.
Directory '/src/project/f/fa/faa/node_modules' does not exist, skipping all lookups in it.
Directory '/src/project/f/fa/node_modules' does not exist, skipping all lookups in it.
Directory '/src/project/f/node_modules' does not exist, skipping all lookups in it.
File '/src/project/node_modules/pkg0/package.json' does not exist according to earlier cached lookups.
File '/src/project/node_modules/pkg0.ts' does not exist.
File '/src/project/node_modules/pkg0.tsx' does not exist.
File '/src/project/node_modules/pkg0.d.ts' does not exist.
File '/src/project/node_modules/pkg0/index.ts' does not exist.
File '/src/project/node_modules/pkg0/index.tsx' does not exist.
File '/src/project/node_modules/pkg0/index.d.ts' exist - use it as a name resolution result.
Resolving real path for '/src/project/node_modules/pkg0/index.d.ts', result '/src/project/node_modules/pkg0/index.d.ts'.
======== Module name 'pkg0' was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'. ========
Reusing resolution of module 'pkg0' from '/src/project/f/fa/faa/faaa/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg1' from '/src/project/f/fa/faa/faaa/fileWithImports.ts' of old program, it was not resolved.
Finishing updateGraphWorker: Project: /src/project/tsconfig.json Version: 12 structureChanged: true structureIsReused:: SafeModules Elapsed:: *ms
Different program with same set of files
modify f/fa/faa/x/y/z/randomFileForImport by adding unresolved import
request:{"command":"change","arguments":{"file":"/src/project/f/fa/faa/x/y/z/randomFileForImport.ts","line":1,"offset":1,"endLine":1,"endOffset":1,"insertString":"import type { ImportInterface1 } from \"pkg1\";\n"},"seq":12,"type":"request"}
response:{"responseRequired":false}
Starting updateGraphWorker: Project: /src/project/tsconfig.json
Reusing resolution of module 'pkg0' from '/src/project/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg1' from '/src/project/fileWithImports.ts' of old program, it was not resolved.
Reusing resolution of module 'pkg0' from '/src/project/randomFileForImport.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg1' from '/src/project/randomFileForImport.ts' of old program, it was not resolved.
Reusing resolution of module 'pkg0' from '/src/project/a/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg1' from '/src/project/a/fileWithImports.ts' of old program, it was not resolved.
Reusing resolution of module 'pkg0' from '/src/project/b/ba/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg1' from '/src/project/b/ba/fileWithImports.ts' of old program, it was not resolved.
Reusing resolution of module 'pkg0' from '/src/project/b/randomFileForImport.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg1' from '/src/project/b/randomFileForImport.ts' of old program, it was not resolved.
Reusing resolution of module 'pkg0' from '/src/project/c/ca/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg1' from '/src/project/c/ca/fileWithImports.ts' of old program, it was not resolved.
Reusing resolution of module 'pkg0' from '/src/project/c/ca/caa/randomFileForImport.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg1' from '/src/project/c/ca/caa/randomFileForImport.ts' of old program, it was not resolved.
Reusing resolution of module 'pkg0' from '/src/project/c/ca/caa/caaa/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg1' from '/src/project/c/ca/caa/caaa/fileWithImports.ts' of old program, it was not resolved.
Reusing resolution of module 'pkg0' from '/src/project/c/cb/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg1' from '/src/project/c/cb/fileWithImports.ts' of old program, it was not resolved.
Reusing resolution of module 'pkg0' from '/src/project/d/da/daa/daaa/x/y/z/randomFileForImport.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg1' from '/src/project/d/da/daa/daaa/x/y/z/randomFileForImport.ts' of old program, it was not resolved.
Reusing resolution of module 'pkg0' from '/src/project/d/da/daa/daaa/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg1' from '/src/project/d/da/daa/daaa/fileWithImports.ts' of old program, it was not resolved.
Reusing resolution of module 'pkg0' from '/src/project/d/da/daa/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg1' from '/src/project/d/da/daa/fileWithImports.ts' of old program, it was not resolved.
Reusing resolution of module 'pkg0' from '/src/project/d/da/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg1' from '/src/project/d/da/fileWithImports.ts' of old program, it was not resolved.
Reusing resolution of module 'pkg0' from '/src/project/e/ea/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg1' from '/src/project/e/ea/fileWithImports.ts' of old program, it was not resolved.
Reusing resolution of module 'pkg0' from '/src/project/e/ea/eaa/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg1' from '/src/project/e/ea/eaa/fileWithImports.ts' of old program, it was not resolved.
Reusing resolution of module 'pkg0' from '/src/project/e/ea/eaa/eaaa/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg1' from '/src/project/e/ea/eaa/eaaa/fileWithImports.ts' of old program, it was not resolved.
Reusing resolution of module 'pkg0' from '/src/project/e/ea/eaa/eaaa/x/y/z/randomFileForImport.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg1' from '/src/project/e/ea/eaa/eaaa/x/y/z/randomFileForImport.ts' of old program, it was not resolved.
======== Resolving module 'pkg1' from '/src/project/f/fa/faa/x/y/z/randomFileForImport.ts'. ========
Module resolution kind is not specified, using 'NodeJs'.
Loading module 'pkg1' from 'node_modules' folder, target file type 'TypeScript'.
Directory '/src/project/f/fa/faa/x/y/z/node_modules' does not exist, skipping all lookups in it.
Directory '/src/project/f/fa/faa/x/y/node_modules' does not exist, skipping all lookups in it.
Directory '/src/project/f/fa/faa/x/node_modules' does not exist, skipping all lookups in it.
Directory '/src/project/f/fa/faa/node_modules' does not exist, skipping all lookups in it.
Directory '/src/project/f/fa/node_modules' does not exist, skipping all lookups in it.
Directory '/src/project/f/node_modules' does not exist, skipping all lookups in it.
File '/src/project/node_modules/pkg1.ts' does not exist.
File '/src/project/node_modules/pkg1.tsx' does not exist.
File '/src/project/node_modules/pkg1.d.ts' does not exist.
Directory '/src/project/node_modules/@types' does not exist, skipping all lookups in it.
Directory '/src/node_modules' does not exist, skipping all lookups in it.
Directory '/node_modules' does not exist, skipping all lookups in it.
Loading module 'pkg1' from 'node_modules' folder, target file type 'JavaScript'.
Directory '/src/project/f/fa/faa/x/y/z/node_modules' does not exist, skipping all lookups in it.
Directory '/src/project/f/fa/faa/x/y/node_modules' does not exist, skipping all lookups in it.
Directory '/src/project/f/fa/faa/x/node_modules' does not exist, skipping all lookups in it.
Directory '/src/project/f/fa/faa/node_modules' does not exist, skipping all lookups in it.
Directory '/src/project/f/fa/node_modules' does not exist, skipping all lookups in it.
Directory '/src/project/f/node_modules' does not exist, skipping all lookups in it.
File '/src/project/node_modules/pkg1.js' does not exist.
File '/src/project/node_modules/pkg1.jsx' does not exist.
Directory '/src/node_modules' does not exist, skipping all lookups in it.
Directory '/node_modules' does not exist, skipping all lookups in it.
======== Module name 'pkg1' was not resolved. ========
Reusing resolution of module 'pkg0' from '/src/project/f/fa/faa/x/y/z/randomFileForImport.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg0' from '/src/project/f/fa/faa/faaa/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg1' from '/src/project/f/fa/faa/faaa/fileWithImports.ts' of old program, it was not resolved.
Finishing updateGraphWorker: Project: /src/project/tsconfig.json Version: 13 structureChanged: true structureIsReused:: SafeModules Elapsed:: *ms
Different program with same set of files
add file for unresolved import and random edit
DirectoryWatcher:: Triggered with /src/project/node_modules/pkg1 :: WatchInfo: /src/project/node_modules 1 undefined WatchType: node_modules for closed script infos and package.jsons affecting module specifier cache
Elapsed:: *ms DirectoryWatcher:: Triggered with /src/project/node_modules/pkg1 :: WatchInfo: /src/project/node_modules 1 undefined WatchType: node_modules for closed script infos and package.jsons affecting module specifier cache
DirectoryWatcher:: Triggered with /src/project/node_modules/pkg1 :: WatchInfo: /src/project/node_modules 1 undefined Project: /src/project/tsconfig.json WatchType: Failed Lookup Locations
Scheduled: /src/project/tsconfig.jsonFailedLookupInvalidation
Elapsed:: *ms DirectoryWatcher:: Triggered with /src/project/node_modules/pkg1 :: WatchInfo: /src/project/node_modules 1 undefined Project: /src/project/tsconfig.json WatchType: Failed Lookup Locations
DirectoryWatcher:: Triggered with /src/project/node_modules/pkg1/index.d.ts :: WatchInfo: /src/project/node_modules 1 undefined WatchType: node_modules for closed script infos and package.jsons affecting module specifier cache
Elapsed:: *ms DirectoryWatcher:: Triggered with /src/project/node_modules/pkg1/index.d.ts :: WatchInfo: /src/project/node_modules 1 undefined WatchType: node_modules for closed script infos and package.jsons affecting module specifier cache
DirectoryWatcher:: Triggered with /src/project/node_modules/pkg1/index.d.ts :: WatchInfo: /src/project/node_modules 1 undefined Project: /src/project/tsconfig.json WatchType: Failed Lookup Locations
Scheduled: /src/project/tsconfig.jsonFailedLookupInvalidation, Cancelled earlier one
Elapsed:: *ms DirectoryWatcher:: Triggered with /src/project/node_modules/pkg1/index.d.ts :: WatchInfo: /src/project/node_modules 1 undefined Project: /src/project/tsconfig.json WatchType: Failed Lookup Locations
Running: /src/project/tsconfig.jsonFailedLookupInvalidation
Scheduled: /src/project/tsconfig.json
Scheduled: *ensureProjectForOpenFiles*
Running: /src/project/tsconfig.json
Starting updateGraphWorker: Project: /src/project/tsconfig.json
Reusing resolution of module 'pkg0' from '/src/project/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
======== Resolving module 'pkg1' from '/src/project/fileWithImports.ts'. ========
Module resolution kind is not specified, using 'NodeJs'.
Loading module 'pkg1' from 'node_modules' folder, target file type 'TypeScript'.
File '/src/project/node_modules/pkg1/package.json' does not exist.
File '/src/project/node_modules/pkg1.ts' does not exist.
File '/src/project/node_modules/pkg1.tsx' does not exist.
File '/src/project/node_modules/pkg1.d.ts' does not exist.
File '/src/project/node_modules/pkg1/index.ts' does not exist.
File '/src/project/node_modules/pkg1/index.tsx' does not exist.
File '/src/project/node_modules/pkg1/index.d.ts' exist - use it as a name resolution result.
Resolving real path for '/src/project/node_modules/pkg1/index.d.ts', result '/src/project/node_modules/pkg1/index.d.ts'.
======== Module name 'pkg1' was successfully resolved to '/src/project/node_modules/pkg1/index.d.ts'. ========
======== Resolving module 'pkg1' from '/src/project/randomFileForImport.ts'. ========
Resolution for module 'pkg1' was found in cache from location '/src/project'.
======== Module name 'pkg1' was successfully resolved to '/src/project/node_modules/pkg1/index.d.ts'. ========
Reusing resolution of module 'pkg0' from '/src/project/randomFileForImport.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg0' from '/src/project/a/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
======== Resolving module 'pkg1' from '/src/project/a/fileWithImports.ts'. ========
Module resolution kind is not specified, using 'NodeJs'.
Loading module 'pkg1' from 'node_modules' folder, target file type 'TypeScript'.
Directory '/src/project/a/node_modules' does not exist, skipping all lookups in it.
Resolution for module 'pkg1' was found in cache from location '/src/project'.
======== Module name 'pkg1' was successfully resolved to '/src/project/node_modules/pkg1/index.d.ts'. ========
Reusing resolution of module 'pkg0' from '/src/project/b/ba/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
======== Resolving module 'pkg1' from '/src/project/b/ba/fileWithImports.ts'. ========
Module resolution kind is not specified, using 'NodeJs'.
Loading module 'pkg1' from 'node_modules' folder, target file type 'TypeScript'.
Directory '/src/project/b/ba/node_modules' does not exist, skipping all lookups in it.
Directory '/src/project/b/node_modules' does not exist, skipping all lookups in it.
Resolution for module 'pkg1' was found in cache from location '/src/project'.
======== Module name 'pkg1' was successfully resolved to '/src/project/node_modules/pkg1/index.d.ts'. ========
======== Resolving module 'pkg1' from '/src/project/b/randomFileForImport.ts'. ========
Module resolution kind is not specified, using 'NodeJs'.
Loading module 'pkg1' from 'node_modules' folder, target file type 'TypeScript'.
Resolution for module 'pkg1' was found in cache from location '/src/project/b'.
======== Module name 'pkg1' was successfully resolved to '/src/project/node_modules/pkg1/index.d.ts'. ========
Reusing resolution of module 'pkg0' from '/src/project/b/randomFileForImport.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg0' from '/src/project/c/ca/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
======== Resolving module 'pkg1' from '/src/project/c/ca/fileWithImports.ts'. ========
Module resolution kind is not specified, using 'NodeJs'.
Loading module 'pkg1' from 'node_modules' folder, target file type 'TypeScript'.
Directory '/src/project/c/ca/node_modules' does not exist, skipping all lookups in it.
Directory '/src/project/c/node_modules' does not exist, skipping all lookups in it.
Resolution for module 'pkg1' was found in cache from location '/src/project'.
======== Module name 'pkg1' was successfully resolved to '/src/project/node_modules/pkg1/index.d.ts'. ========
======== Resolving module 'pkg1' from '/src/project/c/ca/caa/randomFileForImport.ts'. ========
Module resolution kind is not specified, using 'NodeJs'.
Loading module 'pkg1' from 'node_modules' folder, target file type 'TypeScript'.
Directory '/src/project/c/ca/caa/node_modules' does not exist, skipping all lookups in it.
Resolution for module 'pkg1' was found in cache from location '/src/project/c/ca'.
======== Module name 'pkg1' was successfully resolved to '/src/project/node_modules/pkg1/index.d.ts'. ========
Reusing resolution of module 'pkg0' from '/src/project/c/ca/caa/randomFileForImport.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg0' from '/src/project/c/ca/caa/caaa/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
======== Resolving module 'pkg1' from '/src/project/c/ca/caa/caaa/fileWithImports.ts'. ========
Module resolution kind is not specified, using 'NodeJs'.
Loading module 'pkg1' from 'node_modules' folder, target file type 'TypeScript'.
Directory '/src/project/c/ca/caa/caaa/node_modules' does not exist, skipping all lookups in it.
Resolution for module 'pkg1' was found in cache from location '/src/project/c/ca/caa'.
======== Module name 'pkg1' was successfully resolved to '/src/project/node_modules/pkg1/index.d.ts'. ========
Reusing resolution of module 'pkg0' from '/src/project/c/cb/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
======== Resolving module 'pkg1' from '/src/project/c/cb/fileWithImports.ts'. ========
Module resolution kind is not specified, using 'NodeJs'.
Loading module 'pkg1' from 'node_modules' folder, target file type 'TypeScript'.
Directory '/src/project/c/cb/node_modules' does not exist, skipping all lookups in it.
Resolution for module 'pkg1' was found in cache from location '/src/project/c'.
======== Module name 'pkg1' was successfully resolved to '/src/project/node_modules/pkg1/index.d.ts'. ========
======== Resolving module 'pkg1' from '/src/project/d/da/daa/daaa/x/y/z/randomFileForImport.ts'. ========
Module resolution kind is not specified, using 'NodeJs'.
Loading module 'pkg1' from 'node_modules' folder, target file type 'TypeScript'.
Directory '/src/project/d/da/daa/daaa/x/y/z/node_modules' does not exist, skipping all lookups in it.
Directory '/src/project/d/da/daa/daaa/x/y/node_modules' does not exist, skipping all lookups in it.
Directory '/src/project/d/da/daa/daaa/x/node_modules' does not exist, skipping all lookups in it.
Directory '/src/project/d/da/daa/daaa/node_modules' does not exist, skipping all lookups in it.
Directory '/src/project/d/da/daa/node_modules' does not exist, skipping all lookups in it.
Directory '/src/project/d/da/node_modules' does not exist, skipping all lookups in it.
Directory '/src/project/d/node_modules' does not exist, skipping all lookups in it.
Resolution for module 'pkg1' was found in cache from location '/src/project'.
======== Module name 'pkg1' was successfully resolved to '/src/project/node_modules/pkg1/index.d.ts'. ========
Reusing resolution of module 'pkg0' from '/src/project/d/da/daa/daaa/x/y/z/randomFileForImport.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg0' from '/src/project/d/da/daa/daaa/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
======== Resolving module 'pkg1' from '/src/project/d/da/daa/daaa/fileWithImports.ts'. ========
Module resolution kind is not specified, using 'NodeJs'.
Loading module 'pkg1' from 'node_modules' folder, target file type 'TypeScript'.
Resolution for module 'pkg1' was found in cache from location '/src/project/d/da/daa/daaa'.
======== Module name 'pkg1' was successfully resolved to '/src/project/node_modules/pkg1/index.d.ts'. ========
Reusing resolution of module 'pkg0' from '/src/project/d/da/daa/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
======== Resolving module 'pkg1' from '/src/project/d/da/daa/fileWithImports.ts'. ========
Module resolution kind is not specified, using 'NodeJs'.
Loading module 'pkg1' from 'node_modules' folder, target file type 'TypeScript'.
Resolution for module 'pkg1' was found in cache from location '/src/project/d/da/daa'.
======== Module name 'pkg1' was successfully resolved to '/src/project/node_modules/pkg1/index.d.ts'. ========
Reusing resolution of module 'pkg0' from '/src/project/d/da/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
======== Resolving module 'pkg1' from '/src/project/d/da/fileWithImports.ts'. ========
Module resolution kind is not specified, using 'NodeJs'.
Loading module 'pkg1' from 'node_modules' folder, target file type 'TypeScript'.
Resolution for module 'pkg1' was found in cache from location '/src/project/d/da'.
======== Module name 'pkg1' was successfully resolved to '/src/project/node_modules/pkg1/index.d.ts'. ========
Reusing resolution of module 'pkg0' from '/src/project/e/ea/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
======== Resolving module 'pkg1' from '/src/project/e/ea/fileWithImports.ts'. ========
Module resolution kind is not specified, using 'NodeJs'.
Loading module 'pkg1' from 'node_modules' folder, target file type 'TypeScript'.
Directory '/src/project/e/ea/node_modules' does not exist, skipping all lookups in it.
Directory '/src/project/e/node_modules' does not exist, skipping all lookups in it.
Resolution for module 'pkg1' was found in cache from location '/src/project'.
======== Module name 'pkg1' was successfully resolved to '/src/project/node_modules/pkg1/index.d.ts'. ========
Reusing resolution of module 'pkg0' from '/src/project/e/ea/eaa/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
======== Resolving module 'pkg1' from '/src/project/e/ea/eaa/fileWithImports.ts'. ========
Module resolution kind is not specified, using 'NodeJs'.
Loading module 'pkg1' from 'node_modules' folder, target file type 'TypeScript'.
Directory '/src/project/e/ea/eaa/node_modules' does not exist, skipping all lookups in it.
Resolution for module 'pkg1' was found in cache from location '/src/project/e/ea'.
======== Module name 'pkg1' was successfully resolved to '/src/project/node_modules/pkg1/index.d.ts'. ========
Reusing resolution of module 'pkg0' from '/src/project/e/ea/eaa/eaaa/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
======== Resolving module 'pkg1' from '/src/project/e/ea/eaa/eaaa/fileWithImports.ts'. ========
Module resolution kind is not specified, using 'NodeJs'.
Loading module 'pkg1' from 'node_modules' folder, target file type 'TypeScript'.
Directory '/src/project/e/ea/eaa/eaaa/node_modules' does not exist, skipping all lookups in it.
Resolution for module 'pkg1' was found in cache from location '/src/project/e/ea/eaa'.
======== Module name 'pkg1' was successfully resolved to '/src/project/node_modules/pkg1/index.d.ts'. ========
======== Resolving module 'pkg1' from '/src/project/e/ea/eaa/eaaa/x/y/z/randomFileForImport.ts'. ========
Module resolution kind is not specified, using 'NodeJs'.
Loading module 'pkg1' from 'node_modules' folder, target file type 'TypeScript'.
Directory '/src/project/e/ea/eaa/eaaa/x/y/z/node_modules' does not exist, skipping all lookups in it.
Directory '/src/project/e/ea/eaa/eaaa/x/y/node_modules' does not exist, skipping all lookups in it.
Directory '/src/project/e/ea/eaa/eaaa/x/node_modules' does not exist, skipping all lookups in it.
Resolution for module 'pkg1' was found in cache from location '/src/project/e/ea/eaa/eaaa'.
======== Module name 'pkg1' was successfully resolved to '/src/project/node_modules/pkg1/index.d.ts'. ========
Reusing resolution of module 'pkg0' from '/src/project/e/ea/eaa/eaaa/x/y/z/randomFileForImport.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
======== Resolving module 'pkg1' from '/src/project/f/fa/faa/x/y/z/randomFileForImport.ts'. ========
Module resolution kind is not specified, using 'NodeJs'.
Loading module 'pkg1' from 'node_modules' folder, target file type 'TypeScript'.
Directory '/src/project/f/fa/faa/x/y/z/node_modules' does not exist, skipping all lookups in it.
Directory '/src/project/f/fa/faa/x/y/node_modules' does not exist, skipping all lookups in it.
Directory '/src/project/f/fa/faa/x/node_modules' does not exist, skipping all lookups in it.
Directory '/src/project/f/fa/faa/node_modules' does not exist, skipping all lookups in it.
Directory '/src/project/f/fa/node_modules' does not exist, skipping all lookups in it.
Directory '/src/project/f/node_modules' does not exist, skipping all lookups in it.
Resolution for module 'pkg1' was found in cache from location '/src/project'.
======== Module name 'pkg1' was successfully resolved to '/src/project/node_modules/pkg1/index.d.ts'. ========
Reusing resolution of module 'pkg0' from '/src/project/f/fa/faa/x/y/z/randomFileForImport.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg0' from '/src/project/f/fa/faa/faaa/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
======== Resolving module 'pkg1' from '/src/project/f/fa/faa/faaa/fileWithImports.ts'. ========
Module resolution kind is not specified, using 'NodeJs'.
Loading module 'pkg1' from 'node_modules' folder, target file type 'TypeScript'.
Directory '/src/project/f/fa/faa/faaa/node_modules' does not exist, skipping all lookups in it.
Resolution for module 'pkg1' was found in cache from location '/src/project/f/fa/faa'.
======== Module name 'pkg1' was successfully resolved to '/src/project/node_modules/pkg1/index.d.ts'. ========
DirectoryWatcher:: Close:: WatchInfo: /src/project/node_modules 1 undefined Project: /src/project/tsconfig.json WatchType: Failed Lookup Locations
Elapsed:: *ms DirectoryWatcher:: Close:: WatchInfo: /src/project/node_modules 1 undefined Project: /src/project/tsconfig.json WatchType: Failed Lookup Locations
DirectoryWatcher:: Close:: WatchInfo: /src/project/a 1 undefined Project: /src/project/tsconfig.json WatchType: Failed Lookup Locations
Elapsed:: *ms DirectoryWatcher:: Close:: WatchInfo: /src/project/a 1 undefined Project: /src/project/tsconfig.json WatchType: Failed Lookup Locations
DirectoryWatcher:: Close:: WatchInfo: /src/project/b 1 undefined Project: /src/project/tsconfig.json WatchType: Failed Lookup Locations
Elapsed:: *ms DirectoryWatcher:: Close:: WatchInfo: /src/project/b 1 undefined Project: /src/project/tsconfig.json WatchType: Failed Lookup Locations
DirectoryWatcher:: Close:: WatchInfo: /src/project/c 1 undefined Project: /src/project/tsconfig.json WatchType: Failed Lookup Locations
Elapsed:: *ms DirectoryWatcher:: Close:: WatchInfo: /src/project/c 1 undefined Project: /src/project/tsconfig.json WatchType: Failed Lookup Locations
DirectoryWatcher:: Close:: WatchInfo: /src/project/d 1 undefined Project: /src/project/tsconfig.json WatchType: Failed Lookup Locations
Elapsed:: *ms DirectoryWatcher:: Close:: WatchInfo: /src/project/d 1 undefined Project: /src/project/tsconfig.json WatchType: Failed Lookup Locations
DirectoryWatcher:: Close:: WatchInfo: /src/project/e 1 undefined Project: /src/project/tsconfig.json WatchType: Failed Lookup Locations
Elapsed:: *ms DirectoryWatcher:: Close:: WatchInfo: /src/project/e 1 undefined Project: /src/project/tsconfig.json WatchType: Failed Lookup Locations
DirectoryWatcher:: Close:: WatchInfo: /src/project/f 1 undefined Project: /src/project/tsconfig.json WatchType: Failed Lookup Locations
Elapsed:: *ms DirectoryWatcher:: Close:: WatchInfo: /src/project/f 1 undefined Project: /src/project/tsconfig.json WatchType: Failed Lookup Locations
Finishing updateGraphWorker: Project: /src/project/tsconfig.json Version: 14 structureChanged: true structureIsReused:: SafeModules Elapsed:: *ms
Project '/src/project/tsconfig.json' (Configured)
	Files (22)
	/a/lib/lib.d.ts
	/src/project/node_modules/pkg0/index.d.ts
	/src/project/node_modules/pkg1/index.d.ts
	/src/project/fileWithImports.ts
	/src/project/randomFileForImport.ts
	/src/project/a/fileWithImports.ts
	/src/project/b/ba/fileWithImports.ts
	/src/project/b/randomFileForImport.ts
	/src/project/c/ca/fileWithImports.ts
	/src/project/c/ca/caa/randomFileForImport.ts
	/src/project/c/ca/caa/caaa/fileWithImports.ts
	/src/project/c/cb/fileWithImports.ts
	/src/project/d/da/daa/daaa/x/y/z/randomFileForImport.ts
	/src/project/d/da/daa/daaa/fileWithImports.ts
	/src/project/d/da/daa/fileWithImports.ts
	/src/project/d/da/fileWithImports.ts
	/src/project/e/ea/fileWithImports.ts
	/src/project/e/ea/eaa/fileWithImports.ts
	/src/project/e/ea/eaa/eaaa/fileWithImports.ts
	/src/project/e/ea/eaa/eaaa/x/y/z/randomFileForImport.ts
	/src/project/f/fa/faa/x/y/z/randomFileForImport.ts
	/src/project/f/fa/faa/faaa/fileWithImports.ts


	../../a/lib/lib.d.ts
	  Default library for target 'es3'
	node_modules/pkg0/index.d.ts
	  Imported via "pkg0" from file 'fileWithImports.ts'
	  Imported via "pkg0" from file 'randomFileForImport.ts'
	  Imported via "pkg0" from file 'a/fileWithImports.ts'
	  Imported via "pkg0" from file 'b/ba/fileWithImports.ts'
	  Imported via "pkg0" from file 'b/randomFileForImport.ts'
	  Imported via "pkg0" from file 'c/ca/fileWithImports.ts'
	  Imported via "pkg0" from file 'c/ca/caa/randomFileForImport.ts'
	  Imported via "pkg0" from file 'c/ca/caa/caaa/fileWithImports.ts'
	  Imported via "pkg0" from file 'c/cb/fileWithImports.ts'
	  Imported via "pkg0" from file 'd/da/daa/daaa/x/y/z/randomFileForImport.ts'
	  Imported via "pkg0" from file 'd/da/daa/daaa/fileWithImports.ts'
	  Imported via "pkg0" from file 'd/da/daa/fileWithImports.ts'
	  Imported via "pkg0" from file 'd/da/fileWithImports.ts'
	  Imported via "pkg0" from file 'e/ea/fileWithImports.ts'
	  Imported via "pkg0" from file 'e/ea/eaa/fileWithImports.ts'
	  Imported via "pkg0" from file 'e/ea/eaa/eaaa/fileWithImports.ts'
	  Imported via "pkg0" from file 'e/ea/eaa/eaaa/x/y/z/randomFileForImport.ts'
	  Imported via "pkg0" from file 'f/fa/faa/x/y/z/randomFileForImport.ts'
	  Imported via "pkg0" from file 'f/fa/faa/faaa/fileWithImports.ts'
	node_modules/pkg1/index.d.ts
	  Imported via "pkg1" from file 'fileWithImports.ts'
	  Imported via "pkg1" from file 'randomFileForImport.ts'
	  Imported via "pkg1" from file 'a/fileWithImports.ts'
	  Imported via "pkg1" from file 'b/ba/fileWithImports.ts'
	  Imported via "pkg1" from file 'b/randomFileForImport.ts'
	  Imported via "pkg1" from file 'c/ca/fileWithImports.ts'
	  Imported via "pkg1" from file 'c/ca/caa/randomFileForImport.ts'
	  Imported via "pkg1" from file 'c/ca/caa/caaa/fileWithImports.ts'
	  Imported via "pkg1" from file 'c/cb/fileWithImports.ts'
	  Imported via "pkg1" from file 'd/da/daa/daaa/x/y/z/randomFileForImport.ts'
	  Imported via "pkg1" from file 'd/da/daa/daaa/fileWithImports.ts'
	  Imported via "pkg1" from file 'd/da/daa/fileWithImports.ts'
	  Imported via "pkg1" from file 'd/da/fileWithImports.ts'
	  Imported via "pkg1" from file 'e/ea/fileWithImports.ts'
	  Imported via "pkg1" from file 'e/ea/eaa/fileWithImports.ts'
	  Imported via "pkg1" from file 'e/ea/eaa/eaaa/fileWithImports.ts'
	  Imported via "pkg1" from file 'e/ea/eaa/eaaa/x/y/z/randomFileForImport.ts'
	  Imported via "pkg1" from file 'f/fa/faa/x/y/z/randomFileForImport.ts'
	  Imported via "pkg1" from file 'f/fa/faa/faaa/fileWithImports.ts'
	fileWithImports.ts
	  Part of 'files' list in tsconfig.json
	randomFileForImport.ts
	  Part of 'files' list in tsconfig.json
	a/fileWithImports.ts
	  Part of 'files' list in tsconfig.json
	b/ba/fileWithImports.ts
	  Part of 'files' list in tsconfig.json
	b/randomFileForImport.ts
	  Part of 'files' list in tsconfig.json
	c/ca/fileWithImports.ts
	  Part of 'files' list in tsconfig.json
	c/ca/caa/randomFileForImport.ts
	  Part of 'files' list in tsconfig.json
	c/ca/caa/caaa/fileWithImports.ts
	  Part of 'files' list in tsconfig.json
	c/cb/fileWithImports.ts
	  Part of 'files' list in tsconfig.json
	d/da/daa/daaa/x/y/z/randomFileForImport.ts
	  Part of 'files' list in tsconfig.json
	d/da/daa/daaa/fileWithImports.ts
	  Part of 'files' list in tsconfig.json
	d/da/daa/fileWithImports.ts
	  Part of 'files' list in tsconfig.json
	d/da/fileWithImports.ts
	  Part of 'files' list in tsconfig.json
	e/ea/fileWithImports.ts
	  Part of 'files' list in tsconfig.json
	e/ea/eaa/fileWithImports.ts
	  Part of 'files' list in tsconfig.json
	e/ea/eaa/eaaa/fileWithImports.ts
	  Part of 'files' list in tsconfig.json
	e/ea/eaa/eaaa/x/y/z/randomFileForImport.ts
	  Part of 'files' list in tsconfig.json
	f/fa/faa/x/y/z/randomFileForImport.ts
	  Part of 'files' list in tsconfig.json
	f/fa/faa/faaa/fileWithImports.ts
	  Part of 'files' list in tsconfig.json

-----------------------------------------------
Running: *ensureProjectForOpenFiles*
Before ensureProjectForOpenFiles:
Project '/src/project/tsconfig.json' (Configured)
	Files (22)

-----------------------------------------------
Open files: 
	FileName: /src/project/randomFileForImport.ts ProjectRootPath: undefined
		Projects: /src/project/tsconfig.json
	FileName: /src/project/b/randomFileForImport.ts ProjectRootPath: undefined
		Projects: /src/project/tsconfig.json
	FileName: /src/project/c/ca/caa/randomFileForImport.ts ProjectRootPath: undefined
		Projects: /src/project/tsconfig.json
	FileName: /src/project/d/da/daa/daaa/x/y/z/randomFileForImport.ts ProjectRootPath: undefined
		Projects: /src/project/tsconfig.json
	FileName: /src/project/e/ea/eaa/eaaa/x/y/z/randomFileForImport.ts ProjectRootPath: undefined
		Projects: /src/project/tsconfig.json
After ensureProjectForOpenFiles:
Project '/src/project/tsconfig.json' (Configured)
	Files (22)

-----------------------------------------------
Open files: 
	FileName: /src/project/randomFileForImport.ts ProjectRootPath: undefined
		Projects: /src/project/tsconfig.json
	FileName: /src/project/b/randomFileForImport.ts ProjectRootPath: undefined
		Projects: /src/project/tsconfig.json
	FileName: /src/project/c/ca/caa/randomFileForImport.ts ProjectRootPath: undefined
		Projects: /src/project/tsconfig.json
	FileName: /src/project/d/da/daa/daaa/x/y/z/randomFileForImport.ts ProjectRootPath: undefined
		Projects: /src/project/tsconfig.json
	FileName: /src/project/e/ea/eaa/eaaa/x/y/z/randomFileForImport.ts ProjectRootPath: undefined
		Projects: /src/project/tsconfig.json