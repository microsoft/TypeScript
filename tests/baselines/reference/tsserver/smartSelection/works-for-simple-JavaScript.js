Info 0    [00:00:11.000] Provided types map file "/a/lib/typesMap.json" doesn't exist
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


Info 1    [00:00:12.000] request:
    {
      "command": "open",
      "arguments": {
        "file": "/file.js"
      },
      "seq": 1,
      "type": "request"
    }
Info 2    [00:00:13.000] Search path: /
Info 3    [00:00:14.000] For info: /file.js :: No config files found.
Info 4    [00:00:15.000] Starting updateGraphWorker: Project: /dev/null/inferredProject1*
Info 5    [00:00:16.000] FileWatcher:: Added:: WatchInfo: /a/lib/lib.d.ts 500 undefined WatchType: Closed Script info
Info 6    [00:00:17.000] Finishing updateGraphWorker: Project: /dev/null/inferredProject1* Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 7    [00:00:18.000] Project '/dev/null/inferredProject1*' (Inferred)
Info 8    [00:00:19.000] 	Files (2)
	/a/lib/lib.d.ts Text-1 "/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }"
	/file.js SVC-1-0 "\nclass Foo {\n    bar(a, b) {\n        if (a === b) {\n            return true;\n        }\n        return false;\n    }\n}"


	a/lib/lib.d.ts
	  Default library for target 'es5'
	file.js
	  Root file specified for compilation

Info 9    [00:00:20.000] -----------------------------------------------
TI:: Creating typing installer

FsWatches::
/a/lib/lib.d.ts: *new*
  {}

TI:: [00:00:21.000] Global cache location '/a/data/', safe file path '/safeList.json', types map path /typesMap.json
TI:: [00:00:22.000] Processing cache location '/a/data/'
TI:: [00:00:23.000] Trying to find '/a/data/package.json'...
TI:: [00:00:24.000] Finished processing cache location '/a/data/'
TI:: [00:00:25.000] Npm config file: /a/data/package.json
TI:: [00:00:26.000] Npm config file: '/a/data/package.json' is missing, creating new one...
TI:: [00:00:31.000] Updating types-registry npm package...
TI:: [00:00:32.000] npm install --ignore-scripts types-registry@latest
TI:: [00:00:39.000] TI:: Updated types-registry npm package
TI:: typing installer creation complete
//// [/a/data/package.json]
{ "private": true }

//// [/a/data/node_modules/types-registry/index.json]
{
 "entries": {}
}


TI:: [00:00:40.000] Got install request {"projectName":"/dev/null/inferredProject1*","fileNames":["/a/lib/lib.d.ts","/file.js"],"compilerOptions":{"target":1,"jsx":1,"allowNonTsExtensions":true,"allowJs":true,"noEmitForJsFiles":true,"maxNodeModuleJsDepth":2},"typeAcquisition":{"enable":true,"include":[],"exclude":[]},"unresolvedImports":[],"projectRootPath":"/","cachePath":"/a/data/","kind":"discover"}
TI:: [00:00:41.000] Request specifies cache path '/a/data/', loading cached information...
TI:: [00:00:42.000] Processing cache location '/a/data/'
TI:: [00:00:43.000] Cache location was already processed...
TI:: [00:00:44.000] Failed to load safelist from types map file '/typesMap.json'
TI:: [00:00:45.000] Explicitly included types: []
TI:: [00:00:46.000] Inferred typings from unresolved imports: []
TI:: [00:00:47.000] Result: {"cachedTypingPaths":[],"newTypingNames":[],"filesToWatch":["/bower_components","/node_modules"]}
TI:: [00:00:48.000] Finished typings discovery: {"cachedTypingPaths":[],"newTypingNames":[],"filesToWatch":["/bower_components","/node_modules"]}
TI:: [00:00:49.000] DirectoryWatcher:: Added:: WatchInfo: /bower_components
TI:: [00:00:50.000] DirectoryWatcher:: Added:: WatchInfo: /bower_components 1 undefined Project: /dev/null/inferredProject1* watcher already invoked: false
TI:: [00:00:51.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /bower_components 1 undefined Project: /dev/null/inferredProject1* watcher already invoked: false
TI:: [00:00:52.000] DirectoryWatcher:: Added:: WatchInfo: /node_modules
TI:: [00:00:53.000] DirectoryWatcher:: Added:: WatchInfo: /node_modules 1 undefined Project: /dev/null/inferredProject1* watcher already invoked: false
TI:: [00:00:54.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /node_modules 1 undefined Project: /dev/null/inferredProject1* watcher already invoked: false
TI:: [00:00:55.000] Sending response:
    {"projectName":"/dev/null/inferredProject1*","typeAcquisition":{"enable":true,"include":[],"exclude":[]},"compilerOptions":{"target":1,"jsx":1,"allowNonTsExtensions":true,"allowJs":true,"noEmitForJsFiles":true,"maxNodeModuleJsDepth":2},"typings":[],"unresolvedImports":[],"kind":"action::set"}
TI:: [00:00:56.000] No new typings were requested as a result of typings discovery
Info 10   [00:00:57.000] Project '/dev/null/inferredProject1*' (Inferred)
Info 10   [00:00:58.000] 	Files (2)

Info 10   [00:00:59.000] -----------------------------------------------
Info 10   [00:01:00.000] Open files: 
Info 10   [00:01:01.000] 	FileName: /file.js ProjectRootPath: undefined
Info 10   [00:01:02.000] 		Projects: /dev/null/inferredProject1*
Info 10   [00:01:03.000] response:
    {
      "responseRequired": false
    }
After request

PolledWatches::
/bower_components: *new*
  {"pollingInterval":500}
/node_modules: *new*
  {"pollingInterval":500}

FsWatches::
/a/lib/lib.d.ts:
  {}

Before request

Info 11   [00:01:04.000] request:
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
Info 12   [00:01:05.000] response:
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
After request
