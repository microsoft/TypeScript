currentDirectory:: / useCaseSensitiveFileNames: false
Info 0    [00:00:07.000] Provided types map file "/typesMap.json" doesn't exist
Creating project service
//// [/a/file1.js]



Info 1    [00:00:08.000] Search path: /a
Info 2    [00:00:09.000] For info: /a/file1.js :: No config files found.
Info 3    [00:00:10.000] Starting updateGraphWorker: Project: /dev/null/inferredProject1*
Info 4    [00:00:11.000] FileWatcher:: Added:: WatchInfo: /a/lib/lib.d.ts 500 undefined Project: /dev/null/inferredProject1* WatchType: Missing file
Info 5    [00:00:12.000] DirectoryWatcher:: Added:: WatchInfo: /a/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info 6    [00:00:13.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /a/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info 7    [00:00:14.000] Finishing updateGraphWorker: Project: /dev/null/inferredProject1* Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 8    [00:00:15.000] Project '/dev/null/inferredProject1*' (Inferred)
Info 9    [00:00:16.000] 	Files (1)
	/a/file1.js SVC-1-0 ""


	file1.js
	  Root file specified for compilation

Info 10   [00:00:17.000] -----------------------------------------------
Info 11   [00:00:18.000] Project '/dev/null/inferredProject1*' (Inferred)
Info 11   [00:00:19.000] 	Files (1)

Info 11   [00:00:20.000] -----------------------------------------------
Info 11   [00:00:21.000] Open files: 
Info 11   [00:00:22.000] 	FileName: /a/file1.js ProjectRootPath: undefined
Info 11   [00:00:23.000] 		Projects: /dev/null/inferredProject1*
typeAcquisition : setting to undefined
typeAcquisition should be inferred for inferred projects: {
 "enable": true,
 "include": [],
 "exclude": []
}