Info 0    [00:00:11.000] Provided types map file "/a/lib/typesMap.json" doesn't exist
Info 1    [00:00:12.000] request:
    {
      "command": "open",
      "arguments": {
        "file": "/file.js"
      },
      "seq": 1,
      "type": "request"
    }
Before request
//// [/file.js]

class Foo {
    bar(a, b) {
        if (a === b) {
            return true;
        }
        return false;
    }
}

//// [/a/lib/lib.d.ts]
/// <reference no-default-lib="true"/>
interface Boolean {}
interface Function {}
interface CallableFunction {}
interface NewableFunction {}
interface IArguments {}
interface Number { toExponential: any; }
interface Object {}
interface RegExp {}
interface String { charAt: any; }
interface Array<T> { length: number; [n: number]: T; }


PolledWatches::

FsWatches::

FsWatchesRecursive::

Info 2    [00:00:13.000] Search path: /
Info 3    [00:00:14.000] For info: /file.js :: No config files found.
Info 4    [00:00:15.000] Starting updateGraphWorker: Project: /dev/null/inferredProject1*
Info 5    [00:00:16.000] FileWatcher:: Added:: WatchInfo: /a/lib/lib.d.ts 500 undefined WatchType: Closed Script info
Info 6    [00:00:17.000] Finishing updateGraphWorker: Project: /dev/null/inferredProject1* Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 7    [00:00:18.000] Project '/dev/null/inferredProject1*' (Inferred)
Info 8    [00:00:19.000] 	Files (2)
	/a/lib/lib.d.ts
	/file.js


	a/lib/lib.d.ts
	  Default library for target 'es5'
	file.js
	  Root file specified for compilation

Info 9    [00:00:20.000] -----------------------------------------------
Info 10   [00:00:21.000] Project '/dev/null/inferredProject1*' (Inferred)
Info 10   [00:00:22.000] 	Files (2)

Info 10   [00:00:23.000] -----------------------------------------------
Info 10   [00:00:24.000] Open files: 
Info 10   [00:00:25.000] 	FileName: /file.js ProjectRootPath: undefined
Info 10   [00:00:26.000] 		Projects: /dev/null/inferredProject1*
After request

PolledWatches::
/bower_components:
  {"pollingInterval":500}
/node_modules:
  {"pollingInterval":500}

FsWatches::
/a/lib/lib.d.ts:
  {}

FsWatchesRecursive::

Info 10   [00:00:27.000] response:
    {
      "responseRequired": false
    }
Info 11   [00:00:28.000] request:
    {
      "command": "selectionRange",
      "arguments": {
        "file": "/file.js",
        "locations": [
          {
            "line": 4,
            "offset": 13
          }
        ]
      },
      "seq": 2,
      "type": "request"
    }
Before request

PolledWatches::
/bower_components:
  {"pollingInterval":500}
/node_modules:
  {"pollingInterval":500}

FsWatches::
/a/lib/lib.d.ts:
  {}

FsWatchesRecursive::

After request

PolledWatches::
/bower_components:
  {"pollingInterval":500}
/node_modules:
  {"pollingInterval":500}

FsWatches::
/a/lib/lib.d.ts:
  {}

FsWatchesRecursive::

Info 12   [00:00:29.000] response:
    {
      "response": [
        {
          "textSpan": {
            "start": {
              "line": 4,
              "offset": 13
            },
            "end": {
              "line": 4,
              "offset": 14
            }
          },
          "parent": {
            "textSpan": {
              "start": {
                "line": 4,
                "offset": 13
              },
              "end": {
                "line": 4,
                "offset": 20
              }
            },
            "parent": {
              "textSpan": {
                "start": {
                  "line": 4,
                  "offset": 9
                },
                "end": {
                  "line": 6,
                  "offset": 10
                }
              },
              "parent": {
                "textSpan": {
                  "start": {
                    "line": 3,
                    "offset": 16
                  },
                  "end": {
                    "line": 8,
                    "offset": 5
                  }
                },
                "parent": {
                  "textSpan": {
                    "start": {
                      "line": 3,
                      "offset": 15
                    },
                    "end": {
                      "line": 8,
                      "offset": 6
                    }
                  },
                  "parent": {
                    "textSpan": {
                      "start": {
                        "line": 3,
                        "offset": 5
                      },
                      "end": {
                        "line": 8,
                        "offset": 6
                      }
                    },
                    "parent": {
                      "textSpan": {
                        "start": {
                          "line": 2,
                          "offset": 12
                        },
                        "end": {
                          "line": 9,
                          "offset": 1
                        }
                      },
                      "parent": {
                        "textSpan": {
                          "start": {
                            "line": 2,
                            "offset": 1
                          },
                          "end": {
                            "line": 9,
                            "offset": 2
                          }
                        },
                        "parent": {
                          "textSpan": {
                            "start": {
                              "line": 1,
                              "offset": 1
                            },
                            "end": {
                              "line": 9,
                              "offset": 2
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      ],
      "responseRequired": true
    }