Provided types map file "/typesMap.json" doesn't exist
Host watch options changed to {"excludeDirectories":["node_modules"]}, it will be take effect for next watches.
Plugins were requested but not running in environment that supports 'require'. Nothing will be loaded
FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/src/main.ts 500 {"excludeDirectories":["node_modules"]} WatchType: Closed Script info
ExcludeWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules 1 {"excludeDirectories":["node_modules"]} WatchType: node_modules for closed script infos and package.jsons affecting module specifier cache
Starting updateGraphWorker: Project: /user/username/projects/myproject/project.csproj
ExcludeWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules 1 {"excludeDirectories":["/user/username/projects/myproject/node_modules"]} Project: /user/username/projects/myproject/project.csproj WatchType: Failed Lookup Locations
FileWatcher:: Added:: WatchInfo: /a/lib/lib.d.ts 500 {"excludeDirectories":["node_modules"]} WatchType: Closed Script info
DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/src 1 {"excludeDirectories":["/user/username/projects/myproject/node_modules"]} Project: /user/username/projects/myproject/project.csproj WatchType: Failed Lookup Locations
Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/src 1 {"excludeDirectories":["/user/username/projects/myproject/node_modules"]} Project: /user/username/projects/myproject/project.csproj WatchType: Failed Lookup Locations
ExcludeWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 {"excludeDirectories":["/user/username/projects/myproject/node_modules"]} Project: /user/username/projects/myproject/project.csproj WatchType: Type roots
Finishing updateGraphWorker: Project: /user/username/projects/myproject/project.csproj Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Project '/user/username/projects/myproject/project.csproj' (External)
	Files (4)
	/a/lib/lib.d.ts
	/user/username/projects/myproject/node_modules/bar/foo.d.ts
	/user/username/projects/myproject/node_modules/bar/index.d.ts
	/user/username/projects/myproject/src/main.ts


	../../../../a/lib/lib.d.ts
	  Default library for target 'es3'
	node_modules/bar/foo.d.ts
	  Imported via "./foo" from file 'node_modules/bar/index.d.ts'
	  Imported via "./foo" from file 'node_modules/bar/index.d.ts'
	  Root file specified for compilation
	node_modules/bar/index.d.ts
	  Imported via "bar" from file 'src/main.ts'
	  Root file specified for compilation
	src/main.ts
	  Root file specified for compilation

-----------------------------------------------
FileWatcher:: Close:: WatchInfo: /user/username/projects/myproject/src/main.ts 500 {"excludeDirectories":["node_modules"]} WatchType: Closed Script info
Project '/user/username/projects/myproject/project.csproj' (External)
	Files (4)

-----------------------------------------------
Open files: 
	FileName: /user/username/projects/myproject/src/main.ts ProjectRootPath: undefined
		Projects: /user/username/projects/myproject/project.csproj
PolledWatches::

FsWatches::
/a/lib/lib.d.ts:
  {}

FsWatchesRecursive::
/user/username/projects/myproject/src:
  {}
