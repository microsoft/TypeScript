currentDirectory:: / useCaseSensitiveFileNames: false
Info seq  [hh:mm:ss:mss] Provided types map file "/typesMap.json" doesn't exist
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


Info seq  [hh:mm:ss:mss] request:
    {
      "command": "open",
      "arguments": {
        "file": "/file.js"
      },
      "seq": 1,
      "type": "request"
    }
Info seq  [hh:mm:ss:mss] Search path: /
Info seq  [hh:mm:ss:mss] For info: /file.js :: No config files found.
Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: /dev/null/inferredProject1*
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /a/lib/lib.d.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: /dev/null/inferredProject1* Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Project '/dev/null/inferredProject1*' (Inferred)
Info seq  [hh:mm:ss:mss] 	Files (2)
	/a/lib/lib.d.ts Text-1 "/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }"
	/file.js SVC-1-0 "\nclass Foo {\n    bar(a, b) {\n        if (a === b) {\n            return true;\n        }\n        return false;\n    }\n}"


	a/lib/lib.d.ts
	  Default library for target 'es5'
	file.js
	  Root file specified for compilation

Info seq  [hh:mm:ss:mss] -----------------------------------------------
TI:: Creating typing installer

FsWatches::
/a/lib/lib.d.ts: *new*
  {}

TI:: [hh:mm:ss:mss] Global cache location '/a/data', safe file path '/safeList.json', types map path /typesMap.json
TI:: [hh:mm:ss:mss] Processing cache location '/a/data'
TI:: [hh:mm:ss:mss] Trying to find '/a/data/package.json'...
TI:: [hh:mm:ss:mss] Finished processing cache location '/a/data'
TI:: [hh:mm:ss:mss] Npm config file: /a/data/package.json
TI:: [hh:mm:ss:mss] Npm config file: '/a/data/package.json' is missing, creating new one...
TI:: [hh:mm:ss:mss] Updating types-registry npm package...
TI:: [hh:mm:ss:mss] npm install --ignore-scripts types-registry@latest
TI:: [hh:mm:ss:mss] Updated types-registry npm package
TI:: typing installer creation complete
//// [/a/data/package.json]
{ "private": true }

//// [/a/data/node_modules/types-registry/index.json]
{
  "entries": {}
}


TI:: [hh:mm:ss:mss] Got install request
    {
      "projectName": "/dev/null/inferredProject1*",
      "fileNames": [
        "/a/lib/lib.d.ts",
        "/file.js"
      ],
      "compilerOptions": {
        "target": 1,
        "jsx": 1,
        "allowNonTsExtensions": true,
        "allowJs": true,
        "noEmitForJsFiles": true,
        "maxNodeModuleJsDepth": 2
      },
      "typeAcquisition": {
        "enable": true,
        "include": [],
        "exclude": []
      },
      "unresolvedImports": [],
      "projectRootPath": "/",
      "kind": "discover"
    }
TI:: [hh:mm:ss:mss] Failed to load safelist from types map file '/typesMap.json'
TI:: [hh:mm:ss:mss] Explicitly included types: []
TI:: [hh:mm:ss:mss] Inferred typings from unresolved imports: []
TI:: [hh:mm:ss:mss] Finished typings discovery:
    {
      "cachedTypingPaths": [],
      "newTypingNames": [],
      "filesToWatch": [
        "/bower_components",
        "/node_modules"
      ]
    }
TI:: [hh:mm:ss:mss] Sending response:
    {
      "kind": "action::watchTypingLocations",
      "projectName": "/dev/null/inferredProject1*",
      "files": [
        "/bower_components",
        "/node_modules"
      ]
    }
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /bower_components 1 undefined Project: /dev/null/inferredProject1* WatchType: Directory location for typing installer
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /bower_components 1 undefined Project: /dev/null/inferredProject1* WatchType: Directory location for typing installer
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /node_modules 1 undefined Project: /dev/null/inferredProject1* WatchType: Directory location for typing installer
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /node_modules 1 undefined Project: /dev/null/inferredProject1* WatchType: Directory location for typing installer
TI:: [hh:mm:ss:mss] Sending response:
    {
      "projectName": "/dev/null/inferredProject1*",
      "typeAcquisition": {
        "enable": true,
        "include": [],
        "exclude": []
      },
      "compilerOptions": {
        "target": 1,
        "jsx": 1,
        "allowNonTsExtensions": true,
        "allowJs": true,
        "noEmitForJsFiles": true,
        "maxNodeModuleJsDepth": 2
      },
      "typings": [],
      "unresolvedImports": [],
      "kind": "action::set"
    }
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "setTypings",
      "body": {
        "projectName": "/dev/null/inferredProject1*",
        "typeAcquisition": {
          "enable": true,
          "include": [],
          "exclude": []
        },
        "compilerOptions": {
          "target": 1,
          "jsx": 1,
          "allowNonTsExtensions": true,
          "allowJs": true,
          "noEmitForJsFiles": true,
          "maxNodeModuleJsDepth": 2
        },
        "typings": [],
        "unresolvedImports": [],
        "kind": "action::set"
      }
    }
TI:: [hh:mm:ss:mss] No new typings were requested as a result of typings discovery
Info seq  [hh:mm:ss:mss] Project '/dev/null/inferredProject1*' (Inferred)
Info seq  [hh:mm:ss:mss] 	Files (2)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: /file.js ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /dev/null/inferredProject1*
Info seq  [hh:mm:ss:mss] response:
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

Info seq  [hh:mm:ss:mss] request:
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
Info seq  [hh:mm:ss:mss] response:
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
