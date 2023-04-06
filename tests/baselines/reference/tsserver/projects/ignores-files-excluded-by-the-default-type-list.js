currentDirectory:: / useCaseSensitiveFileNames: false
Info 0    [00:00:37.000] Provided types map file "/typesMap.json" doesn't exist
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


Info 1    [00:00:38.000] Excluding files based on rule Kendo matching file '/q/lib/kendo/kendo.all.min.js'
Info 2    [00:00:39.000] Excluding files based on rule Kendo matching file '/q/lib/kendo-ui/kendo.all.js'
Info 3    [00:00:40.000] Excluding files based on rule Office Nuget matching file '/scripts/Office/1/excel-15.debug.js'
Info 4    [00:00:41.000] FileWatcher:: Added:: WatchInfo: /a/b/f1.js 500 undefined WatchType: Closed Script info
Info 5    [00:00:42.000] Starting updateGraphWorker: Project: project
Info 6    [00:00:43.000] FileWatcher:: Added:: WatchInfo: /a/lib/lib.d.ts 500 undefined Project: project WatchType: Missing file
Info 7    [00:00:44.000] Finishing updateGraphWorker: Project: project Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 8    [00:00:45.000] Project 'project' (External)
Info 9    [00:00:46.000] 	Files (1)
	/a/b/f1.js Text-1 "export let x = 5"


	a/b/f1.js
	  Root file specified for compilation

Info 10   [00:00:47.000] -----------------------------------------------
TypeAcquisition:: {
 "include": [
  "kendo-ui",
  "office"
 ],
 "exclude": [],
 "enable": true
}