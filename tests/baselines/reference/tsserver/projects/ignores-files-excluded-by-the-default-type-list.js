currentDirectory:: / useCaseSensitiveFileNames: false
Info seq  [hh:mm:ss:mss] Provided types map file "/typesMap.json" doesn't exist
Creating project service
//// [/a/b/f1.js]
export let x = 5

//// [/c/moment.min.js]
unspecified

//// [/q/lib/kendo/kendo.all.min.js]
unspecified

//// [/q/lib/kendo/kendo.ui.min.js]
unspecified

//// [/q/lib/kendo-ui/kendo.all.js]
unspecified

//// [/scripts/Office/1/excel-15.debug.js]
unspecified

//// [/scripts/Office/1/powerpoint.js]
unspecified


Info seq  [hh:mm:ss:mss] Excluding files based on rule Kendo matching file '/q/lib/kendo/kendo.all.min.js'
Info seq  [hh:mm:ss:mss] Excluding files based on rule Kendo matching file '/q/lib/kendo-ui/kendo.all.js'
Info seq  [hh:mm:ss:mss] Excluding files based on rule Office Nuget matching file '/scripts/Office/1/excel-15.debug.js'
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /a/b/f1.js 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: project
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /a/lib/lib.d.ts 500 undefined Project: project WatchType: Missing file
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: project Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Project 'project' (External)
Info seq  [hh:mm:ss:mss] 	Files (1)
	/a/b/f1.js Text-1 "export let x = 5"


	a/b/f1.js
	  Root file specified for compilation

Info seq  [hh:mm:ss:mss] -----------------------------------------------
TypeAcquisition:: {
 "include": [
  "kendo-ui",
  "office"
 ],
 "exclude": [],
 "enable": true
}