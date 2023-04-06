currentDirectory:: / useCaseSensitiveFileNames: false
Creating project service
//// [/a/b/f1.js]
export let x = 5

//// [/lib/duckquack-3.min.js]
whoa do @@ not parse me ok thanks!!!

//// [/typesMap.json]
{
            "typesMap": {
                "jquery": {
                    "match": "jquery(-(\\.?\\d+)+)?(\\.intellisense)?(\\.min)?\\.js$",
                    "types": ["jquery"]
                },
                "quack": {
                    "match": "/duckquack-(\\d+)\\.min\\.js",
                    "types": ["duck-types"]
                }
            },
            "simpleMap": {
                "Bacon": "baconjs",
                "bliss": "blissfuljs",
                "commander": "commander",
                "cordova": "cordova",
                "react": "react",
                "lodash": "lodash"
            }
        }


Info seq  [hh:mm:ss:mss] Excluding files based on rule quack matching file '/lib/duckquack-3.min.js'
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
  "duck-types"
 ],
 "exclude": [],
 "enable": true
}