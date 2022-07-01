Provided types map file "/a/lib/typesMap.json" doesn't exist
request:{"seq":0,"type":"request","command":"open","arguments":{"file":"/src/project/randomFileForImport.ts"}}
Search path: /src/project
For info: /src/project/randomFileForImport.ts :: Config file name: /src/project/tsconfig.json
Creating configuration project /src/project/tsconfig.json
FileWatcher:: Added:: WatchInfo: /src/project/tsconfig.json 2000 undefined Project: /src/project/tsconfig.json WatchType: Config file
Config: /src/project/tsconfig.json : {
 "rootNames": [
  "/src/project/fileWithImports.ts",
  "/src/project/fileWithTypeRefs.ts",
  "/src/project/randomFileForImport.ts",
  "/src/project/randomFileForTypeRef.ts"
 ],
 "options": {
  "module": 2,
  "composite": true,
  "cacheResolutions": true,
  "traceResolution": true,
  "out": "./out.js",
  "configFilePath": "/src/project/tsconfig.json"
 }
}
DirectoryWatcher:: Added:: WatchInfo: /src/project 0 undefined Config: /src/project/tsconfig.json WatchType: Wild card directory
Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /src/project 0 undefined Config: /src/project/tsconfig.json WatchType: Wild card directory
Plugins were requested but not running in environment that supports 'require'. Nothing will be loaded
FileWatcher:: Added:: WatchInfo: /src/project/fileWithImports.ts 500 undefined WatchType: Closed Script info
FileWatcher:: Added:: WatchInfo: /src/project/fileWithTypeRefs.ts 500 undefined WatchType: Closed Script info
FileWatcher:: Added:: WatchInfo: /src/project/randomFileForTypeRef.ts 500 undefined WatchType: Closed Script info
Starting updateGraphWorker: Project: /src/project/tsconfig.json
======== Resolving module 'pkg0' from '/src/project/fileWithImports.ts'. ========
Module resolution kind is not specified, using 'Classic'.
File '/src/project/pkg0.ts' does not exist.
File '/src/project/pkg0.tsx' does not exist.
File '/src/project/pkg0.d.ts' exist - use it as a name resolution result.
======== Module name 'pkg0' was successfully resolved to '/src/project/pkg0.d.ts'. ========
======== Resolving module 'pkg1' from '/src/project/fileWithImports.ts'. ========
Module resolution kind is not specified, using 'Classic'.
File '/src/project/pkg1.ts' does not exist.
File '/src/project/pkg1.tsx' does not exist.
File '/src/project/pkg1.d.ts' does not exist.
File '/src/pkg1.ts' does not exist.
File '/src/pkg1.tsx' does not exist.
File '/src/pkg1.d.ts' does not exist.
File '/pkg1.ts' does not exist.
File '/pkg1.tsx' does not exist.
File '/pkg1.d.ts' does not exist.
File '/src/project/node_modules/@types/pkg1.d.ts' does not exist.
Directory '/src/node_modules' does not exist, skipping all lookups in it.
Directory '/node_modules' does not exist, skipping all lookups in it.
File '/src/project/pkg1.js' does not exist.
File '/src/project/pkg1.jsx' does not exist.
File '/src/pkg1.js' does not exist.
File '/src/pkg1.jsx' does not exist.
File '/pkg1.js' does not exist.
File '/pkg1.jsx' does not exist.
======== Module name 'pkg1' was not resolved. ========
FileWatcher:: Added:: WatchInfo: /src/project/pkg0.d.ts 500 undefined WatchType: Closed Script info
======== Resolving type reference directive 'pkg2', containing file '/src/project/fileWithTypeRefs.ts', root directory '/src/project/node_modules/@types'. ========
Resolving with primary search path '/src/project/node_modules/@types'.
Looking up in 'node_modules' folder, initial location '/src/project'.
File '/src/project/node_modules/pkg2/package.json' does not exist.
File '/src/project/node_modules/pkg2.d.ts' does not exist.
File '/src/project/node_modules/pkg2/index.d.ts' exist - use it as a name resolution result.
Resolving real path for '/src/project/node_modules/pkg2/index.d.ts', result '/src/project/node_modules/pkg2/index.d.ts'.
======== Type reference directive 'pkg2' was successfully resolved to '/src/project/node_modules/pkg2/index.d.ts', primary: false. ========
======== Resolving type reference directive 'pkg3', containing file '/src/project/fileWithTypeRefs.ts', root directory '/src/project/node_modules/@types'. ========
Resolving with primary search path '/src/project/node_modules/@types'.
Looking up in 'node_modules' folder, initial location '/src/project'.
File '/src/project/node_modules/pkg3.d.ts' does not exist.
File '/src/project/node_modules/@types/pkg3.d.ts' does not exist.
Directory '/src/node_modules' does not exist, skipping all lookups in it.
Directory '/node_modules' does not exist, skipping all lookups in it.
======== Type reference directive 'pkg3' was not resolved. ========
DirectoryWatcher:: Added:: WatchInfo: /src/project/node_modules 1 undefined WatchType: node_modules for closed script infos and package.jsons affecting module specifier cache
Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /src/project/node_modules 1 undefined WatchType: node_modules for closed script infos and package.jsons affecting module specifier cache
======== Resolving type reference directive 'pkg4', containing file '/src/project/__inferred type names__.ts', root directory '/src/project/node_modules/@types'. ========
Resolving with primary search path '/src/project/node_modules/@types'.
File '/src/project/node_modules/@types/pkg4/package.json' does not exist.
File '/src/project/node_modules/@types/pkg4/index.d.ts' exist - use it as a name resolution result.
Resolving real path for '/src/project/node_modules/@types/pkg4/index.d.ts', result '/src/project/node_modules/@types/pkg4/index.d.ts'.
======== Type reference directive 'pkg4' was successfully resolved to '/src/project/node_modules/@types/pkg4/index.d.ts', primary: true. ========
FileWatcher:: Added:: WatchInfo: /a/lib/lib.d.ts 500 undefined WatchType: Closed Script info
DirectoryWatcher:: Added:: WatchInfo: /src/project 0 undefined Project: /src/project/tsconfig.json WatchType: Failed Lookup Locations
Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /src/project 0 undefined Project: /src/project/tsconfig.json WatchType: Failed Lookup Locations
DirectoryWatcher:: Added:: WatchInfo: /src/project/node_modules 1 undefined Project: /src/project/tsconfig.json WatchType: Failed Lookup Locations
Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /src/project/node_modules 1 undefined Project: /src/project/tsconfig.json WatchType: Failed Lookup Locations
DirectoryWatcher:: Added:: WatchInfo: /src/project/node_modules/@types 1 undefined Project: /src/project/tsconfig.json WatchType: Type roots
Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /src/project/node_modules/@types 1 undefined Project: /src/project/tsconfig.json WatchType: Type roots
Finishing updateGraphWorker: Project: /src/project/tsconfig.json Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Project '/src/project/tsconfig.json' (Configured)
	Files (8)
	/a/lib/lib.d.ts
	/src/project/pkg0.d.ts
	/src/project/fileWithImports.ts
	/src/project/node_modules/pkg2/index.d.ts
	/src/project/fileWithTypeRefs.ts
	/src/project/randomFileForImport.ts
	/src/project/randomFileForTypeRef.ts
	/src/project/node_modules/@types/pkg4/index.d.ts


	../../a/lib/lib.d.ts
	  Default library for target 'es3'
	pkg0.d.ts
	  Imported via "pkg0" from file 'fileWithImports.ts'
	fileWithImports.ts
	  Matched by include pattern '*.ts' in 'tsconfig.json'
	node_modules/pkg2/index.d.ts
	  Type library referenced via 'pkg2' from file 'fileWithTypeRefs.ts'
	fileWithTypeRefs.ts
	  Matched by include pattern '*.ts' in 'tsconfig.json'
	randomFileForImport.ts
	  Matched by include pattern '*.ts' in 'tsconfig.json'
	randomFileForTypeRef.ts
	  Matched by include pattern '*.ts' in 'tsconfig.json'
	node_modules/@types/pkg4/index.d.ts
	  Entry point for implicit type library 'pkg4'

-----------------------------------------------
Search path: /src/project
For info: /src/project/tsconfig.json :: No config files found.
Project '/src/project/tsconfig.json' (Configured)
	Files (8)

-----------------------------------------------
Open files: 
	FileName: /src/project/randomFileForImport.ts ProjectRootPath: undefined
		Projects: /src/project/tsconfig.json
response:{"responseRequired":false}
request:{"seq":0,"type":"request","command":"open","arguments":{"file":"/src/project/randomFileForTypeRef.ts"}}
FileWatcher:: Close:: WatchInfo: /src/project/randomFileForTypeRef.ts 500 undefined WatchType: Closed Script info
Search path: /src/project
For info: /src/project/randomFileForTypeRef.ts :: Config file name: /src/project/tsconfig.json
Search path: /src/project
For info: /src/project/tsconfig.json :: No config files found.
Project '/src/project/tsconfig.json' (Configured)
	Files (8)

-----------------------------------------------
Open files: 
	FileName: /src/project/randomFileForImport.ts ProjectRootPath: undefined
		Projects: /src/project/tsconfig.json
	FileName: /src/project/randomFileForTypeRef.ts ProjectRootPath: undefined
		Projects: /src/project/tsconfig.json
response:{"responseRequired":false}
modify randomFileForImport by adding import
request:{"command":"change","arguments":{"file":"/src/project/randomFileForImport.ts","line":1,"offset":1,"endLine":1,"endOffset":1,"insertString":"import type { ImportInterface0 } from \"pkg0\";\n"},"seq":1,"type":"request"}
response:{"responseRequired":false}
Starting updateGraphWorker: Project: /src/project/tsconfig.json
Reusing resolution of module 'pkg0' from '/src/project/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/pkg0.d.ts'.
Reusing resolution of module 'pkg1' from '/src/project/fileWithImports.ts' of old program, it was not resolved.
Reusing resolution of type reference directive 'pkg2' from '/src/project/fileWithTypeRefs.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg2/index.d.ts'.
Reusing resolution of type reference directive 'pkg3' from '/src/project/fileWithTypeRefs.ts' of old program, it was not resolved.
======== Resolving module 'pkg0' from '/src/project/randomFileForImport.ts'. ========
Module resolution kind is not specified, using 'Classic'.
File '/src/project/pkg0.ts' does not exist.
File '/src/project/pkg0.tsx' does not exist.
File '/src/project/pkg0.d.ts' exist - use it as a name resolution result.
======== Module name 'pkg0' was successfully resolved to '/src/project/pkg0.d.ts'. ========
Reusing resolution of type reference directive 'pkg4' from '/src/project/__inferred type names__.ts' of old program, it was successfully resolved to '/src/project/node_modules/@types/pkg4/index.d.ts'.
Finishing updateGraphWorker: Project: /src/project/tsconfig.json Version: 2 structureChanged: true structureIsReused:: SafeModules Elapsed:: *ms
Different program with same set of files
modify randomFileForTypeRef by adding typeRef
request:{"command":"change","arguments":{"file":"/src/project/randomFileForTypeRef.ts","line":1,"offset":1,"endLine":1,"endOffset":1,"insertString":"/// <reference types=\"pkg2\"/>\n"},"seq":2,"type":"request"}
response:{"responseRequired":false}
Starting updateGraphWorker: Project: /src/project/tsconfig.json
Reusing resolution of module 'pkg0' from '/src/project/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/pkg0.d.ts'.
Reusing resolution of module 'pkg1' from '/src/project/fileWithImports.ts' of old program, it was not resolved.
Reusing resolution of type reference directive 'pkg2' from '/src/project/fileWithTypeRefs.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg2/index.d.ts'.
Reusing resolution of type reference directive 'pkg3' from '/src/project/fileWithTypeRefs.ts' of old program, it was not resolved.
Reusing resolution of module 'pkg0' from '/src/project/randomFileForImport.ts' of old program, it was successfully resolved to '/src/project/pkg0.d.ts'.
======== Resolving type reference directive 'pkg2', containing file '/src/project/randomFileForTypeRef.ts', root directory '/src/project/node_modules/@types'. ========
Resolving with primary search path '/src/project/node_modules/@types'.
Looking up in 'node_modules' folder, initial location '/src/project'.
File '/src/project/node_modules/pkg2/package.json' does not exist according to earlier cached lookups.
File '/src/project/node_modules/pkg2.d.ts' does not exist.
File '/src/project/node_modules/pkg2/index.d.ts' exist - use it as a name resolution result.
Resolving real path for '/src/project/node_modules/pkg2/index.d.ts', result '/src/project/node_modules/pkg2/index.d.ts'.
======== Type reference directive 'pkg2' was successfully resolved to '/src/project/node_modules/pkg2/index.d.ts', primary: false. ========
Reusing resolution of type reference directive 'pkg4' from '/src/project/__inferred type names__.ts' of old program, it was successfully resolved to '/src/project/node_modules/@types/pkg4/index.d.ts'.
Finishing updateGraphWorker: Project: /src/project/tsconfig.json Version: 3 structureChanged: true structureIsReused:: SafeModules Elapsed:: *ms
Different program with same set of files
write file not resolved by import
DirectoryWatcher:: Triggered with /src/project/pkg1.d.ts :: WatchInfo: /src/project 0 undefined Config: /src/project/tsconfig.json WatchType: Wild card directory
Project: /src/project/tsconfig.json Detected excluded file: /src/project/pkg1.d.ts
Elapsed:: *ms DirectoryWatcher:: Triggered with /src/project/pkg1.d.ts :: WatchInfo: /src/project 0 undefined Config: /src/project/tsconfig.json WatchType: Wild card directory
DirectoryWatcher:: Triggered with /src/project/pkg1.d.ts :: WatchInfo: /src/project 0 undefined Project: /src/project/tsconfig.json WatchType: Failed Lookup Locations
Scheduled: /src/project/tsconfig.jsonFailedLookupInvalidation
Elapsed:: *ms DirectoryWatcher:: Triggered with /src/project/pkg1.d.ts :: WatchInfo: /src/project 0 undefined Project: /src/project/tsconfig.json WatchType: Failed Lookup Locations
Running: /src/project/tsconfig.jsonFailedLookupInvalidation
Scheduled: /src/project/tsconfig.json
Scheduled: *ensureProjectForOpenFiles*
Running: /src/project/tsconfig.json
Starting updateGraphWorker: Project: /src/project/tsconfig.json
Reusing resolution of module 'pkg0' from '/src/project/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/pkg0.d.ts'.
======== Resolving module 'pkg1' from '/src/project/fileWithImports.ts'. ========
Module resolution kind is not specified, using 'Classic'.
File '/src/project/pkg1.ts' does not exist.
File '/src/project/pkg1.tsx' does not exist.
File '/src/project/pkg1.d.ts' exist - use it as a name resolution result.
======== Module name 'pkg1' was successfully resolved to '/src/project/pkg1.d.ts'. ========
FileWatcher:: Added:: WatchInfo: /src/project/pkg1.d.ts 500 undefined WatchType: Closed Script info
Reusing resolution of type reference directive 'pkg2' from '/src/project/fileWithTypeRefs.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg2/index.d.ts'.
Reusing resolution of type reference directive 'pkg3' from '/src/project/fileWithTypeRefs.ts' of old program, it was not resolved.
Reusing resolution of module 'pkg0' from '/src/project/randomFileForImport.ts' of old program, it was successfully resolved to '/src/project/pkg0.d.ts'.
Reusing resolution of type reference directive 'pkg2' from '/src/project/randomFileForTypeRef.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg2/index.d.ts'.
Reusing resolution of type reference directive 'pkg4' from '/src/project/__inferred type names__.ts' of old program, it was successfully resolved to '/src/project/node_modules/@types/pkg4/index.d.ts'.
Finishing updateGraphWorker: Project: /src/project/tsconfig.json Version: 4 structureChanged: true structureIsReused:: SafeModules Elapsed:: *ms
Project '/src/project/tsconfig.json' (Configured)
	Files (9)
	/a/lib/lib.d.ts
	/src/project/pkg0.d.ts
	/src/project/pkg1.d.ts
	/src/project/fileWithImports.ts
	/src/project/node_modules/pkg2/index.d.ts
	/src/project/fileWithTypeRefs.ts
	/src/project/randomFileForImport.ts
	/src/project/randomFileForTypeRef.ts
	/src/project/node_modules/@types/pkg4/index.d.ts


	../../a/lib/lib.d.ts
	  Default library for target 'es3'
	pkg0.d.ts
	  Imported via "pkg0" from file 'fileWithImports.ts'
	  Imported via "pkg0" from file 'randomFileForImport.ts'
	pkg1.d.ts
	  Imported via "pkg1" from file 'fileWithImports.ts'
	fileWithImports.ts
	  Matched by include pattern '*.ts' in 'tsconfig.json'
	node_modules/pkg2/index.d.ts
	  Type library referenced via 'pkg2' from file 'fileWithTypeRefs.ts'
	fileWithTypeRefs.ts
	  Matched by include pattern '*.ts' in 'tsconfig.json'
	randomFileForImport.ts
	  Matched by include pattern '*.ts' in 'tsconfig.json'
	randomFileForTypeRef.ts
	  Matched by include pattern '*.ts' in 'tsconfig.json'
	node_modules/@types/pkg4/index.d.ts
	  Entry point for implicit type library 'pkg4'

-----------------------------------------------
Running: *ensureProjectForOpenFiles*
Before ensureProjectForOpenFiles:
Project '/src/project/tsconfig.json' (Configured)
	Files (9)

-----------------------------------------------
Open files: 
	FileName: /src/project/randomFileForImport.ts ProjectRootPath: undefined
		Projects: /src/project/tsconfig.json
	FileName: /src/project/randomFileForTypeRef.ts ProjectRootPath: undefined
		Projects: /src/project/tsconfig.json
After ensureProjectForOpenFiles:
Project '/src/project/tsconfig.json' (Configured)
	Files (9)

-----------------------------------------------
Open files: 
	FileName: /src/project/randomFileForImport.ts ProjectRootPath: undefined
		Projects: /src/project/tsconfig.json
	FileName: /src/project/randomFileForTypeRef.ts ProjectRootPath: undefined
		Projects: /src/project/tsconfig.json
write file not resolved by typeRef
DirectoryWatcher:: Triggered with /src/project/node_modules/pkg3 :: WatchInfo: /src/project/node_modules 1 undefined WatchType: node_modules for closed script infos and package.jsons affecting module specifier cache
Elapsed:: *ms DirectoryWatcher:: Triggered with /src/project/node_modules/pkg3 :: WatchInfo: /src/project/node_modules 1 undefined WatchType: node_modules for closed script infos and package.jsons affecting module specifier cache
DirectoryWatcher:: Triggered with /src/project/node_modules/pkg3 :: WatchInfo: /src/project/node_modules 1 undefined Project: /src/project/tsconfig.json WatchType: Failed Lookup Locations
Scheduled: /src/project/tsconfig.jsonFailedLookupInvalidation
Elapsed:: *ms DirectoryWatcher:: Triggered with /src/project/node_modules/pkg3 :: WatchInfo: /src/project/node_modules 1 undefined Project: /src/project/tsconfig.json WatchType: Failed Lookup Locations
DirectoryWatcher:: Triggered with /src/project/node_modules/pkg3/index.d.ts :: WatchInfo: /src/project/node_modules 1 undefined WatchType: node_modules for closed script infos and package.jsons affecting module specifier cache
Elapsed:: *ms DirectoryWatcher:: Triggered with /src/project/node_modules/pkg3/index.d.ts :: WatchInfo: /src/project/node_modules 1 undefined WatchType: node_modules for closed script infos and package.jsons affecting module specifier cache
DirectoryWatcher:: Triggered with /src/project/node_modules/pkg3/index.d.ts :: WatchInfo: /src/project/node_modules 1 undefined Project: /src/project/tsconfig.json WatchType: Failed Lookup Locations
Scheduled: /src/project/tsconfig.jsonFailedLookupInvalidation, Cancelled earlier one
Elapsed:: *ms DirectoryWatcher:: Triggered with /src/project/node_modules/pkg3/index.d.ts :: WatchInfo: /src/project/node_modules 1 undefined Project: /src/project/tsconfig.json WatchType: Failed Lookup Locations
Running: /src/project/tsconfig.jsonFailedLookupInvalidation
Scheduled: /src/project/tsconfig.json
Scheduled: *ensureProjectForOpenFiles*
Running: /src/project/tsconfig.json
Starting updateGraphWorker: Project: /src/project/tsconfig.json
Reusing resolution of module 'pkg0' from '/src/project/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/pkg0.d.ts'.
Reusing resolution of module 'pkg1' from '/src/project/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/pkg1.d.ts'.
Reusing resolution of type reference directive 'pkg2' from '/src/project/fileWithTypeRefs.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg2/index.d.ts'.
======== Resolving type reference directive 'pkg3', containing file '/src/project/fileWithTypeRefs.ts', root directory '/src/project/node_modules/@types'. ========
Resolving with primary search path '/src/project/node_modules/@types'.
Looking up in 'node_modules' folder, initial location '/src/project'.
File '/src/project/node_modules/pkg3/package.json' does not exist.
File '/src/project/node_modules/pkg3.d.ts' does not exist.
File '/src/project/node_modules/pkg3/index.d.ts' exist - use it as a name resolution result.
Resolving real path for '/src/project/node_modules/pkg3/index.d.ts', result '/src/project/node_modules/pkg3/index.d.ts'.
======== Type reference directive 'pkg3' was successfully resolved to '/src/project/node_modules/pkg3/index.d.ts', primary: false. ========
Reusing resolution of module 'pkg0' from '/src/project/randomFileForImport.ts' of old program, it was successfully resolved to '/src/project/pkg0.d.ts'.
Reusing resolution of type reference directive 'pkg2' from '/src/project/randomFileForTypeRef.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg2/index.d.ts'.
Reusing resolution of type reference directive 'pkg4' from '/src/project/__inferred type names__.ts' of old program, it was successfully resolved to '/src/project/node_modules/@types/pkg4/index.d.ts'.
Finishing updateGraphWorker: Project: /src/project/tsconfig.json Version: 5 structureChanged: true structureIsReused:: SafeModules Elapsed:: *ms
Project '/src/project/tsconfig.json' (Configured)
	Files (10)
	/a/lib/lib.d.ts
	/src/project/pkg0.d.ts
	/src/project/pkg1.d.ts
	/src/project/fileWithImports.ts
	/src/project/node_modules/pkg2/index.d.ts
	/src/project/node_modules/pkg3/index.d.ts
	/src/project/fileWithTypeRefs.ts
	/src/project/randomFileForImport.ts
	/src/project/randomFileForTypeRef.ts
	/src/project/node_modules/@types/pkg4/index.d.ts


	../../a/lib/lib.d.ts
	  Default library for target 'es3'
	pkg0.d.ts
	  Imported via "pkg0" from file 'fileWithImports.ts'
	  Imported via "pkg0" from file 'randomFileForImport.ts'
	pkg1.d.ts
	  Imported via "pkg1" from file 'fileWithImports.ts'
	fileWithImports.ts
	  Matched by include pattern '*.ts' in 'tsconfig.json'
	node_modules/pkg2/index.d.ts
	  Type library referenced via 'pkg2' from file 'fileWithTypeRefs.ts'
	node_modules/pkg3/index.d.ts
	  Type library referenced via 'pkg3' from file 'fileWithTypeRefs.ts'
	fileWithTypeRefs.ts
	  Matched by include pattern '*.ts' in 'tsconfig.json'
	randomFileForImport.ts
	  Matched by include pattern '*.ts' in 'tsconfig.json'
	randomFileForTypeRef.ts
	  Matched by include pattern '*.ts' in 'tsconfig.json'
	node_modules/@types/pkg4/index.d.ts
	  Entry point for implicit type library 'pkg4'

-----------------------------------------------
Running: *ensureProjectForOpenFiles*
Before ensureProjectForOpenFiles:
Project '/src/project/tsconfig.json' (Configured)
	Files (10)

-----------------------------------------------
Open files: 
	FileName: /src/project/randomFileForImport.ts ProjectRootPath: undefined
		Projects: /src/project/tsconfig.json
	FileName: /src/project/randomFileForTypeRef.ts ProjectRootPath: undefined
		Projects: /src/project/tsconfig.json
After ensureProjectForOpenFiles:
Project '/src/project/tsconfig.json' (Configured)
	Files (10)

-----------------------------------------------
Open files: 
	FileName: /src/project/randomFileForImport.ts ProjectRootPath: undefined
		Projects: /src/project/tsconfig.json
	FileName: /src/project/randomFileForTypeRef.ts ProjectRootPath: undefined
		Projects: /src/project/tsconfig.json
delete file with imports
FileWatcher:: Triggered with /src/project/fileWithImports.ts 2:: WatchInfo: /src/project/fileWithImports.ts 500 undefined WatchType: Closed Script info
FileWatcher:: Close:: WatchInfo: /src/project/fileWithImports.ts 500 undefined WatchType: Closed Script info
Scheduled: /src/project/tsconfig.json
Scheduled: *ensureProjectForOpenFiles*
Elapsed:: *ms FileWatcher:: Triggered with /src/project/fileWithImports.ts 2:: WatchInfo: /src/project/fileWithImports.ts 500 undefined WatchType: Closed Script info
DirectoryWatcher:: Triggered with /src/project/fileWithImports.ts :: WatchInfo: /src/project 0 undefined Config: /src/project/tsconfig.json WatchType: Wild card directory
Scheduled: /src/project/tsconfig.json, Cancelled earlier one
Scheduled: *ensureProjectForOpenFiles*, Cancelled earlier one
Elapsed:: *ms DirectoryWatcher:: Triggered with /src/project/fileWithImports.ts :: WatchInfo: /src/project 0 undefined Config: /src/project/tsconfig.json WatchType: Wild card directory
DirectoryWatcher:: Triggered with /src/project/fileWithImports.ts :: WatchInfo: /src/project 0 undefined Project: /src/project/tsconfig.json WatchType: Failed Lookup Locations
Scheduled: /src/project/tsconfig.jsonFailedLookupInvalidation
Elapsed:: *ms DirectoryWatcher:: Triggered with /src/project/fileWithImports.ts :: WatchInfo: /src/project 0 undefined Project: /src/project/tsconfig.json WatchType: Failed Lookup Locations
Running: /src/project/tsconfig.json
Starting updateGraphWorker: Project: /src/project/tsconfig.json
Reusing resolution of type reference directive 'pkg2' from '/src/project/fileWithTypeRefs.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg2/index.d.ts'.
Reusing resolution of type reference directive 'pkg3' from '/src/project/fileWithTypeRefs.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg3/index.d.ts'.
Reusing resolution of module 'pkg0' from '/src/project/randomFileForImport.ts' of old program, it was successfully resolved to '/src/project/pkg0.d.ts'.
Reusing resolution of type reference directive 'pkg2' from '/src/project/randomFileForTypeRef.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg2/index.d.ts'.
Reusing resolution of type reference directive 'pkg4' from '/src/project/__inferred type names__.ts' of old program, it was successfully resolved to '/src/project/node_modules/@types/pkg4/index.d.ts'.
Finishing updateGraphWorker: Project: /src/project/tsconfig.json Version: 6 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Project '/src/project/tsconfig.json' (Configured)
	Files (8)
	/a/lib/lib.d.ts
	/src/project/node_modules/pkg2/index.d.ts
	/src/project/node_modules/pkg3/index.d.ts
	/src/project/fileWithTypeRefs.ts
	/src/project/pkg0.d.ts
	/src/project/randomFileForImport.ts
	/src/project/randomFileForTypeRef.ts
	/src/project/node_modules/@types/pkg4/index.d.ts


	../../a/lib/lib.d.ts
	  Default library for target 'es3'
	node_modules/pkg2/index.d.ts
	  Type library referenced via 'pkg2' from file 'fileWithTypeRefs.ts'
	node_modules/pkg3/index.d.ts
	  Type library referenced via 'pkg3' from file 'fileWithTypeRefs.ts'
	fileWithTypeRefs.ts
	  Matched by include pattern '*.ts' in 'tsconfig.json'
	pkg0.d.ts
	  Imported via "pkg0" from file 'randomFileForImport.ts'
	randomFileForImport.ts
	  Matched by include pattern '*.ts' in 'tsconfig.json'
	randomFileForTypeRef.ts
	  Matched by include pattern '*.ts' in 'tsconfig.json'
	node_modules/@types/pkg4/index.d.ts
	  Entry point for implicit type library 'pkg4'

-----------------------------------------------
Running: *ensureProjectForOpenFiles*
Before ensureProjectForOpenFiles:
Project '/src/project/tsconfig.json' (Configured)
	Files (8)

-----------------------------------------------
Open files: 
	FileName: /src/project/randomFileForImport.ts ProjectRootPath: undefined
		Projects: /src/project/tsconfig.json
	FileName: /src/project/randomFileForTypeRef.ts ProjectRootPath: undefined
		Projects: /src/project/tsconfig.json
After ensureProjectForOpenFiles:
Project '/src/project/tsconfig.json' (Configured)
	Files (8)

-----------------------------------------------
Open files: 
	FileName: /src/project/randomFileForImport.ts ProjectRootPath: undefined
		Projects: /src/project/tsconfig.json
	FileName: /src/project/randomFileForTypeRef.ts ProjectRootPath: undefined
		Projects: /src/project/tsconfig.json
delete file with typeRefs
FileWatcher:: Triggered with /src/project/fileWithTypeRefs.ts 2:: WatchInfo: /src/project/fileWithTypeRefs.ts 500 undefined WatchType: Closed Script info
FileWatcher:: Close:: WatchInfo: /src/project/fileWithTypeRefs.ts 500 undefined WatchType: Closed Script info
Scheduled: /src/project/tsconfig.json
Scheduled: *ensureProjectForOpenFiles*
Elapsed:: *ms FileWatcher:: Triggered with /src/project/fileWithTypeRefs.ts 2:: WatchInfo: /src/project/fileWithTypeRefs.ts 500 undefined WatchType: Closed Script info
DirectoryWatcher:: Triggered with /src/project/fileWithTypeRefs.ts :: WatchInfo: /src/project 0 undefined Config: /src/project/tsconfig.json WatchType: Wild card directory
Scheduled: /src/project/tsconfig.json, Cancelled earlier one
Scheduled: *ensureProjectForOpenFiles*, Cancelled earlier one
Elapsed:: *ms DirectoryWatcher:: Triggered with /src/project/fileWithTypeRefs.ts :: WatchInfo: /src/project 0 undefined Config: /src/project/tsconfig.json WatchType: Wild card directory
DirectoryWatcher:: Triggered with /src/project/fileWithTypeRefs.ts :: WatchInfo: /src/project 0 undefined Project: /src/project/tsconfig.json WatchType: Failed Lookup Locations
Scheduled: /src/project/tsconfig.jsonFailedLookupInvalidation
Elapsed:: *ms DirectoryWatcher:: Triggered with /src/project/fileWithTypeRefs.ts :: WatchInfo: /src/project 0 undefined Project: /src/project/tsconfig.json WatchType: Failed Lookup Locations
Running: /src/project/tsconfig.json
Starting updateGraphWorker: Project: /src/project/tsconfig.json
Reusing resolution of module 'pkg0' from '/src/project/randomFileForImport.ts' of old program, it was successfully resolved to '/src/project/pkg0.d.ts'.
Reusing resolution of type reference directive 'pkg2' from '/src/project/randomFileForTypeRef.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg2/index.d.ts'.
Reusing resolution of type reference directive 'pkg4' from '/src/project/__inferred type names__.ts' of old program, it was successfully resolved to '/src/project/node_modules/@types/pkg4/index.d.ts'.
Finishing updateGraphWorker: Project: /src/project/tsconfig.json Version: 7 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Project '/src/project/tsconfig.json' (Configured)
	Files (6)
	/a/lib/lib.d.ts
	/src/project/pkg0.d.ts
	/src/project/randomFileForImport.ts
	/src/project/node_modules/pkg2/index.d.ts
	/src/project/randomFileForTypeRef.ts
	/src/project/node_modules/@types/pkg4/index.d.ts


	../../a/lib/lib.d.ts
	  Default library for target 'es3'
	pkg0.d.ts
	  Imported via "pkg0" from file 'randomFileForImport.ts'
	randomFileForImport.ts
	  Matched by include pattern '*.ts' in 'tsconfig.json'
	node_modules/pkg2/index.d.ts
	  Type library referenced via 'pkg2' from file 'randomFileForTypeRef.ts'
	randomFileForTypeRef.ts
	  Matched by include pattern '*.ts' in 'tsconfig.json'
	node_modules/@types/pkg4/index.d.ts
	  Entry point for implicit type library 'pkg4'

-----------------------------------------------
Running: *ensureProjectForOpenFiles*
Before ensureProjectForOpenFiles:
Project '/src/project/tsconfig.json' (Configured)
	Files (6)

-----------------------------------------------
Open files: 
	FileName: /src/project/randomFileForImport.ts ProjectRootPath: undefined
		Projects: /src/project/tsconfig.json
	FileName: /src/project/randomFileForTypeRef.ts ProjectRootPath: undefined
		Projects: /src/project/tsconfig.json
After ensureProjectForOpenFiles:
Project '/src/project/tsconfig.json' (Configured)
	Files (6)

-----------------------------------------------
Open files: 
	FileName: /src/project/randomFileForImport.ts ProjectRootPath: undefined
		Projects: /src/project/tsconfig.json
	FileName: /src/project/randomFileForTypeRef.ts ProjectRootPath: undefined
		Projects: /src/project/tsconfig.json
delete resolved import file
FileWatcher:: Triggered with /src/project/pkg0.d.ts 2:: WatchInfo: /src/project/pkg0.d.ts 500 undefined WatchType: Closed Script info
FileWatcher:: Close:: WatchInfo: /src/project/pkg0.d.ts 500 undefined WatchType: Closed Script info
Scheduled: /src/project/tsconfig.json
Scheduled: *ensureProjectForOpenFiles*
Elapsed:: *ms FileWatcher:: Triggered with /src/project/pkg0.d.ts 2:: WatchInfo: /src/project/pkg0.d.ts 500 undefined WatchType: Closed Script info
DirectoryWatcher:: Triggered with /src/project/pkg0.d.ts :: WatchInfo: /src/project 0 undefined Config: /src/project/tsconfig.json WatchType: Wild card directory
Project: /src/project/tsconfig.json Detected excluded file: /src/project/pkg0.d.ts
Elapsed:: *ms DirectoryWatcher:: Triggered with /src/project/pkg0.d.ts :: WatchInfo: /src/project 0 undefined Config: /src/project/tsconfig.json WatchType: Wild card directory
DirectoryWatcher:: Triggered with /src/project/pkg0.d.ts :: WatchInfo: /src/project 0 undefined Project: /src/project/tsconfig.json WatchType: Failed Lookup Locations
Scheduled: /src/project/tsconfig.jsonFailedLookupInvalidation
Elapsed:: *ms DirectoryWatcher:: Triggered with /src/project/pkg0.d.ts :: WatchInfo: /src/project 0 undefined Project: /src/project/tsconfig.json WatchType: Failed Lookup Locations
Running: /src/project/tsconfig.json
Starting updateGraphWorker: Project: /src/project/tsconfig.json
======== Resolving module 'pkg0' from '/src/project/randomFileForImport.ts'. ========
Module resolution kind is not specified, using 'Classic'.
File '/src/project/pkg0.ts' does not exist.
File '/src/project/pkg0.tsx' does not exist.
File '/src/project/pkg0.d.ts' does not exist.
File '/src/pkg0.ts' does not exist.
File '/src/pkg0.tsx' does not exist.
File '/src/pkg0.d.ts' does not exist.
File '/pkg0.ts' does not exist.
File '/pkg0.tsx' does not exist.
File '/pkg0.d.ts' does not exist.
File '/src/project/node_modules/@types/pkg0.d.ts' does not exist.
Directory '/src/node_modules' does not exist, skipping all lookups in it.
Directory '/node_modules' does not exist, skipping all lookups in it.
File '/src/project/pkg0.js' does not exist.
File '/src/project/pkg0.jsx' does not exist.
File '/src/pkg0.js' does not exist.
File '/src/pkg0.jsx' does not exist.
File '/pkg0.js' does not exist.
File '/pkg0.jsx' does not exist.
======== Module name 'pkg0' was not resolved. ========
Reusing resolution of type reference directive 'pkg2' from '/src/project/randomFileForTypeRef.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg2/index.d.ts'.
Reusing resolution of type reference directive 'pkg4' from '/src/project/__inferred type names__.ts' of old program, it was successfully resolved to '/src/project/node_modules/@types/pkg4/index.d.ts'.
Finishing updateGraphWorker: Project: /src/project/tsconfig.json Version: 8 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Project '/src/project/tsconfig.json' (Configured)
	Files (5)
	/a/lib/lib.d.ts
	/src/project/randomFileForImport.ts
	/src/project/node_modules/pkg2/index.d.ts
	/src/project/randomFileForTypeRef.ts
	/src/project/node_modules/@types/pkg4/index.d.ts


	../../a/lib/lib.d.ts
	  Default library for target 'es3'
	randomFileForImport.ts
	  Matched by include pattern '*.ts' in 'tsconfig.json'
	node_modules/pkg2/index.d.ts
	  Type library referenced via 'pkg2' from file 'randomFileForTypeRef.ts'
	randomFileForTypeRef.ts
	  Matched by include pattern '*.ts' in 'tsconfig.json'
	node_modules/@types/pkg4/index.d.ts
	  Entry point for implicit type library 'pkg4'

-----------------------------------------------
Running: *ensureProjectForOpenFiles*
Before ensureProjectForOpenFiles:
Project '/src/project/tsconfig.json' (Configured)
	Files (5)

-----------------------------------------------
Open files: 
	FileName: /src/project/randomFileForImport.ts ProjectRootPath: undefined
		Projects: /src/project/tsconfig.json
	FileName: /src/project/randomFileForTypeRef.ts ProjectRootPath: undefined
		Projects: /src/project/tsconfig.json
After ensureProjectForOpenFiles:
Project '/src/project/tsconfig.json' (Configured)
	Files (5)

-----------------------------------------------
Open files: 
	FileName: /src/project/randomFileForImport.ts ProjectRootPath: undefined
		Projects: /src/project/tsconfig.json
	FileName: /src/project/randomFileForTypeRef.ts ProjectRootPath: undefined
		Projects: /src/project/tsconfig.json
delete resolved typeRef file
DirectoryWatcher:: Triggered with /src/project/node_modules/pkg2/index.d.ts :: WatchInfo: /src/project/node_modules 1 undefined WatchType: node_modules for closed script infos and package.jsons affecting module specifier cache
Scheduled: /src/project/tsconfig.json
Scheduled: *ensureProjectForOpenFiles*
Elapsed:: *ms DirectoryWatcher:: Triggered with /src/project/node_modules/pkg2/index.d.ts :: WatchInfo: /src/project/node_modules 1 undefined WatchType: node_modules for closed script infos and package.jsons affecting module specifier cache
DirectoryWatcher:: Triggered with /src/project/node_modules/pkg2/index.d.ts :: WatchInfo: /src/project/node_modules 1 undefined Project: /src/project/tsconfig.json WatchType: Failed Lookup Locations
Scheduled: /src/project/tsconfig.jsonFailedLookupInvalidation
Elapsed:: *ms DirectoryWatcher:: Triggered with /src/project/node_modules/pkg2/index.d.ts :: WatchInfo: /src/project/node_modules 1 undefined Project: /src/project/tsconfig.json WatchType: Failed Lookup Locations
Running: /src/project/tsconfig.json
Starting updateGraphWorker: Project: /src/project/tsconfig.json
Reusing resolution of module 'pkg0' from '/src/project/randomFileForImport.ts' of old program, it was not resolved.
======== Resolving type reference directive 'pkg2', containing file '/src/project/randomFileForTypeRef.ts', root directory '/src/project/node_modules/@types'. ========
Resolving with primary search path '/src/project/node_modules/@types'.
Looking up in 'node_modules' folder, initial location '/src/project'.
File '/src/project/node_modules/pkg2/package.json' does not exist.
File '/src/project/node_modules/pkg2.d.ts' does not exist.
File '/src/project/node_modules/pkg2/index.d.ts' does not exist.
File '/src/project/node_modules/@types/pkg2.d.ts' does not exist.
Directory '/src/node_modules' does not exist, skipping all lookups in it.
Directory '/node_modules' does not exist, skipping all lookups in it.
======== Type reference directive 'pkg2' was not resolved. ========
Reusing resolution of type reference directive 'pkg4' from '/src/project/__inferred type names__.ts' of old program, it was successfully resolved to '/src/project/node_modules/@types/pkg4/index.d.ts'.
Finishing updateGraphWorker: Project: /src/project/tsconfig.json Version: 9 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Project '/src/project/tsconfig.json' (Configured)
	Files (4)
	/a/lib/lib.d.ts
	/src/project/randomFileForImport.ts
	/src/project/randomFileForTypeRef.ts
	/src/project/node_modules/@types/pkg4/index.d.ts


	../../a/lib/lib.d.ts
	  Default library for target 'es3'
	randomFileForImport.ts
	  Matched by include pattern '*.ts' in 'tsconfig.json'
	randomFileForTypeRef.ts
	  Matched by include pattern '*.ts' in 'tsconfig.json'
	node_modules/@types/pkg4/index.d.ts
	  Entry point for implicit type library 'pkg4'

-----------------------------------------------
Running: *ensureProjectForOpenFiles*
Before ensureProjectForOpenFiles:
Project '/src/project/tsconfig.json' (Configured)
	Files (4)

-----------------------------------------------
Open files: 
	FileName: /src/project/randomFileForImport.ts ProjectRootPath: undefined
		Projects: /src/project/tsconfig.json
	FileName: /src/project/randomFileForTypeRef.ts ProjectRootPath: undefined
		Projects: /src/project/tsconfig.json
After ensureProjectForOpenFiles:
Project '/src/project/tsconfig.json' (Configured)
	Files (4)

-----------------------------------------------
Open files: 
	FileName: /src/project/randomFileForImport.ts ProjectRootPath: undefined
		Projects: /src/project/tsconfig.json
	FileName: /src/project/randomFileForTypeRef.ts ProjectRootPath: undefined
		Projects: /src/project/tsconfig.json