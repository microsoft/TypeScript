currentDirectory:: / useCaseSensitiveFileNames: false
Creating project service
//// [/a/b/bliss.js]
let x = 5

//// [/a/b/foo.js]


//// [/a/b/Bacon.js]
let y = 5

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


Info 0    [00:00:15.000] Excluded '/a/b/bliss.js' because it matched bliss from the legacy safelist
Info 1    [00:00:16.000] FileWatcher:: Added:: WatchInfo: /a/b/foo.js 500 undefined WatchType: Closed Script info
Info 2    [00:00:17.000] Starting updateGraphWorker: Project: project
Info 3    [00:00:18.000] FileWatcher:: Added:: WatchInfo: /a/lib/lib.d.ts 500 undefined Project: project WatchType: Missing file
Info 4    [00:00:19.000] Finishing updateGraphWorker: Project: project Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 5    [00:00:20.000] Project 'project' (External)
Info 6    [00:00:21.000] 	Files (1)
	/a/b/foo.js Text-1 ""


	a/b/foo.js
	  Root file specified for compilation

Info 7    [00:00:22.000] -----------------------------------------------