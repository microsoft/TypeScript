currentDirectory:: / useCaseSensitiveFileNames: false
Info seq  [hh:mm:ss:mss] Provided types map file "/typesMap.json" doesn't exist
Before request
//// [/a/b/app.js]

                    import * as a from "foo/a/a";
                    import * as b from "foo/a/b";
                    import * as c from "foo/a/c";
            import * as x from "fooo";

//// [/a/b/node_modules/fooo/index.d.ts]
export var x: string;


Info seq  [hh:mm:ss:mss] request:
    {
      "command": "open",
      "arguments": {
        "file": "/a/b/app.js"
      },
      "seq": 1,
      "type": "request"
    }
Info seq  [hh:mm:ss:mss] getConfigFileNameForFile:: File: /a/b/app.js ProjectRootPath: undefined:: Result: undefined
Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: /dev/null/inferredProject1*
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /a/b/node_modules 1 undefined WatchType: node_modules for closed script infos and package.jsons affecting module specifier cache
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /a/b/node_modules 1 undefined WatchType: node_modules for closed script infos and package.jsons affecting module specifier cache
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /a/b/node_modules/fooo/package.json 2000 undefined Project: /dev/null/inferredProject1* WatchType: File location affecting resolution
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /a/b/node_modules/package.json 2000 undefined Project: /dev/null/inferredProject1* WatchType: File location affecting resolution
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /a/lib/lib.d.ts 500 undefined Project: /dev/null/inferredProject1* WatchType: Missing file
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: /dev/null/inferredProject1* projectStateVersion: 1 projectProgramVersion: 0 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Project '/dev/null/inferredProject1*' (Inferred)
Info seq  [hh:mm:ss:mss] 	Files (2)
	/a/b/node_modules/fooo/index.d.ts Text-1 "export var x: string;"
	/a/b/app.js SVC-1-0 "\n                    import * as a from \"foo/a/a\";\n                    import * as b from \"foo/a/b\";\n                    import * as c from \"foo/a/c\";\n            import * as x from \"fooo\";"


	node_modules/fooo/index.d.ts
	  Imported via "fooo" from file 'app.js'
	app.js
	  Root file specified for compilation

Info seq  [hh:mm:ss:mss] -----------------------------------------------
TI:: Creating typing installer

PolledWatches::
/a/b/node_modules/fooo/package.json: *new*
  {"pollingInterval":2000}
/a/b/node_modules/package.json: *new*
  {"pollingInterval":2000}
/a/lib/lib.d.ts: *new*
  {"pollingInterval":500}

FsWatchesRecursive::
/a/b/node_modules: *new*
  {}

Projects::
/dev/null/inferredProject1* (Inferred) *new*
    projectStateVersion: 1
    projectProgramVersion: 0

ScriptInfos::
/a/b/app.js (Open) *new*
    version: SVC-1-0
    containingProjects: 1
        /dev/null/inferredProject1* *default*
/a/b/node_modules/fooo/index.d.ts *new*
    version: Text-1
    containingProjects: 1
        /dev/null/inferredProject1*

TI:: [hh:mm:ss:mss] Global cache location '/tmp', safe file path '/safeList.json', types map path /typesMap.json
TI:: [hh:mm:ss:mss] Processing cache location '/tmp'
TI:: [hh:mm:ss:mss] Trying to find '/tmp/package.json'...
TI:: [hh:mm:ss:mss] Finished processing cache location '/tmp'
TI:: [hh:mm:ss:mss] Npm config file: /tmp/package.json
TI:: [hh:mm:ss:mss] Npm config file: '/tmp/package.json' is missing, creating new one...
TI:: [hh:mm:ss:mss] Updating types-registry npm package...
TI:: [hh:mm:ss:mss] npm install --ignore-scripts types-registry@latest
TI:: [hh:mm:ss:mss] Updated types-registry npm package
TI:: typing installer creation complete
//// [/tmp/package.json]
{ "private": true }

//// [/tmp/node_modules/types-registry/index.json]
{
  "entries": {
    "foo": {
      "latest": "1.3.0",
      "ts2.0": "1.0.0",
      "ts2.1": "1.0.0",
      "ts2.2": "1.2.0",
      "ts2.3": "1.3.0",
      "ts2.4": "1.3.0",
      "ts2.5": "1.3.0",
      "ts2.6": "1.3.0",
      "ts2.7": "1.3.0"
    }
  }
}


TI:: [hh:mm:ss:mss] Got install request
    {
      "projectName": "/dev/null/inferredProject1*",
      "fileNames": [
        "/a/b/app.js"
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
      "unresolvedImports": [
        "foo"
      ],
      "projectRootPath": "/a/b",
      "kind": "discover"
    }
TI:: [hh:mm:ss:mss] Failed to load safelist from types map file '/typesMap.json'
TI:: [hh:mm:ss:mss] Explicitly included types: []
TI:: [hh:mm:ss:mss] Searching for typing names in /a/b/node_modules; all files: []
TI:: [hh:mm:ss:mss]     Found package names: []
TI:: [hh:mm:ss:mss] Inferred typings from unresolved imports: ["foo"]
TI:: [hh:mm:ss:mss] Finished typings discovery:
    {
      "cachedTypingPaths": [],
      "newTypingNames": [
        "foo"
      ],
      "filesToWatch": [
        "/a/b/bower_components",
        "/a/b/node_modules"
      ]
    }
TI:: [hh:mm:ss:mss] Sending response:
    {
      "kind": "action::watchTypingLocations",
      "projectName": "/dev/null/inferredProject1*",
      "files": [
        "/a/b/bower_components",
        "/a/b/node_modules"
      ]
    }
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /a/b/bower_components 1 undefined Project: /dev/null/inferredProject1* WatchType: Directory location for typing installer
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /a/b/bower_components 1 undefined Project: /dev/null/inferredProject1* WatchType: Directory location for typing installer
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /a/b/node_modules 1 undefined Project: /dev/null/inferredProject1* WatchType: Directory location for typing installer
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /a/b/node_modules 1 undefined Project: /dev/null/inferredProject1* WatchType: Directory location for typing installer
TI:: [hh:mm:ss:mss] Installing typings ["foo"]
TI:: [hh:mm:ss:mss] Npm config file: /tmp/package.json
TI:: [hh:mm:ss:mss] Sending response:
    {
      "kind": "event::beginInstallTypes",
      "eventId": 1,
      "typingsInstallerVersion": "FakeVersion",
      "projectName": "/dev/null/inferredProject1*"
    }
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "beginInstallTypes",
      "body": {
        "eventId": 1
      }
    }
TI:: [hh:mm:ss:mss] #1 with cwd: /tmp arguments: [
  "@types/foo@tsFakeMajor.Minor"
]
Info seq  [hh:mm:ss:mss] Project '/dev/null/inferredProject1*' (Inferred)
Info seq  [hh:mm:ss:mss] 	Files (2)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: /a/b/app.js ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /dev/null/inferredProject1*
Info seq  [hh:mm:ss:mss] response:
    {
      "seq": 0,
      "type": "response",
      "command": "open",
      "request_seq": 1,
      "success": true,
      "performanceData": {
        "updateGraphDurationMs": *
      }
    }
After request

PolledWatches::
/a/b/bower_components: *new*
  {"pollingInterval":500}
/a/b/node_modules/fooo/package.json:
  {"pollingInterval":2000}
/a/b/node_modules/package.json:
  {"pollingInterval":2000}
/a/lib/lib.d.ts:
  {"pollingInterval":500}

FsWatchesRecursive::
/a/b/node_modules:
  {}

PendingInstalls callback:: count: 1
1: #1 with arguments:: [
  "@types/foo@tsFakeMajor.Minor"
] *new*

Projects::
/dev/null/inferredProject1* (Inferred) *changed*
    projectStateVersion: 1
    projectProgramVersion: 1 *changed*

Info seq  [hh:mm:ss:mss] Resolution from : /a/b/app.js for "fooo" goes to: {
  "resolvedFileName": "/a/b/node_modules/fooo/index.d.ts",
  "extension": ".d.ts",
  "isExternalLibraryImport": true,
  "resolvedUsingTsExtension": false
}
Before running PendingInstalls callback:: count: 1
1: #1 with arguments:: [
  "@types/foo@tsFakeMajor.Minor"
]

TI:: Installation #1 with arguments:: [
  "@types/foo@tsFakeMajor.Minor"
] complete with success::true
//// [/tmp/node_modules/foo/index.d.ts]
export function aa(): void;

//// [/tmp/node_modules/foo/a/a.d.ts]
export function a (): void;

//// [/tmp/node_modules/foo/a/b.d.ts]
export function b (): void;

//// [/tmp/node_modules/foo/a/c.d.ts]
export function c (): void;


TI:: [hh:mm:ss:mss] Installed typings ["@types/foo@tsFakeMajor.Minor"]
TI:: [hh:mm:ss:mss] Installed typing files ["/tmp/node_modules/foo/index.d.ts"]
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
      "typings": [
        "/tmp/node_modules/foo/index.d.ts"
      ],
      "unresolvedImports": [
        "foo"
      ],
      "kind": "action::set"
    }
Info seq  [hh:mm:ss:mss] Scheduled: /dev/null/inferredProject1*
Info seq  [hh:mm:ss:mss] Scheduled: *ensureProjectForOpenFiles*
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
        "typings": [
          "/tmp/node_modules/foo/index.d.ts"
        ],
        "unresolvedImports": [
          "foo"
        ],
        "kind": "action::set"
      }
    }
TI:: [hh:mm:ss:mss] Sending response:
    {
      "kind": "event::endInstallTypes",
      "eventId": 1,
      "projectName": "/dev/null/inferredProject1*",
      "packagesToInstall": [
        "@types/foo@tsFakeMajor.Minor"
      ],
      "installSuccess": true,
      "typingsInstallerVersion": "FakeVersion"
    }
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "endInstallTypes",
      "body": {
        "eventId": 1,
        "packages": [
          "@types/foo@tsFakeMajor.Minor"
        ],
        "success": true
      }
    }
After running PendingInstalls callback:: count: 0

Timeout callback:: count: 2
1: /dev/null/inferredProject1* *new*
2: *ensureProjectForOpenFiles* *new*

Projects::
/dev/null/inferredProject1* (Inferred) *changed*
    projectStateVersion: 2 *changed*
    projectProgramVersion: 1
    dirty: true *changed*

Before running Timeout callback:: count: 2
1: /dev/null/inferredProject1*
2: *ensureProjectForOpenFiles*

Info seq  [hh:mm:ss:mss] Running: /dev/null/inferredProject1*
Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: /dev/null/inferredProject1*
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /tmp/node_modules/foo/a/package.json 2000 undefined Project: /dev/null/inferredProject1* WatchType: File location affecting resolution
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /tmp/node_modules/foo/package.json 2000 undefined Project: /dev/null/inferredProject1* WatchType: File location affecting resolution
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: /dev/null/inferredProject1* projectStateVersion: 2 projectProgramVersion: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Project '/dev/null/inferredProject1*' (Inferred)
Info seq  [hh:mm:ss:mss] 	Files (6)
	/tmp/node_modules/foo/a/a.d.ts Text-1 "export function a (): void;"
	/tmp/node_modules/foo/a/b.d.ts Text-1 "export function b (): void;"
	/tmp/node_modules/foo/a/c.d.ts Text-1 "export function c (): void;"
	/a/b/node_modules/fooo/index.d.ts Text-1 "export var x: string;"
	/a/b/app.js SVC-1-0 "\n                    import * as a from \"foo/a/a\";\n                    import * as b from \"foo/a/b\";\n                    import * as c from \"foo/a/c\";\n            import * as x from \"fooo\";"
	/tmp/node_modules/foo/index.d.ts Text-1 "export function aa(): void;"


	../../tmp/node_modules/foo/a/a.d.ts
	  Imported via "foo/a/a" from file 'app.js'
	../../tmp/node_modules/foo/a/b.d.ts
	  Imported via "foo/a/b" from file 'app.js'
	../../tmp/node_modules/foo/a/c.d.ts
	  Imported via "foo/a/c" from file 'app.js'
	node_modules/fooo/index.d.ts
	  Imported via "fooo" from file 'app.js'
	app.js
	  Root file specified for compilation
	../../tmp/node_modules/foo/index.d.ts
	  Root file specified for compilation

Info seq  [hh:mm:ss:mss] -----------------------------------------------
TI:: [hh:mm:ss:mss] Got install request
    {
      "projectName": "/dev/null/inferredProject1*",
      "fileNames": [
        "/a/b/app.js",
        "/tmp/node_modules/foo/index.d.ts"
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
      "projectRootPath": "/a/b",
      "kind": "discover"
    }
TI:: [hh:mm:ss:mss] Explicitly included types: []
TI:: [hh:mm:ss:mss] Searching for typing names in /a/b/node_modules; all files: []
TI:: [hh:mm:ss:mss]     Found package names: []
TI:: [hh:mm:ss:mss] Inferred typings from unresolved imports: []
TI:: [hh:mm:ss:mss] Finished typings discovery:
    {
      "cachedTypingPaths": [],
      "newTypingNames": [],
      "filesToWatch": [
        "/a/b/bower_components",
        "/a/b/node_modules"
      ]
    }
TI:: [hh:mm:ss:mss] Sending response:
    {
      "kind": "action::watchTypingLocations",
      "projectName": "/dev/null/inferredProject1*"
    }
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
Info seq  [hh:mm:ss:mss] Scheduled: /dev/null/inferredProject1*
Info seq  [hh:mm:ss:mss] Scheduled: *ensureProjectForOpenFiles*, Cancelled earlier one
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
After running Timeout callback:: count: 2

PolledWatches::
/a/b/bower_components:
  {"pollingInterval":500}
/a/b/node_modules/fooo/package.json:
  {"pollingInterval":2000}
/a/b/node_modules/package.json:
  {"pollingInterval":2000}
/a/lib/lib.d.ts:
  {"pollingInterval":500}
/tmp/node_modules/foo/a/package.json: *new*
  {"pollingInterval":2000}
/tmp/node_modules/foo/package.json: *new*
  {"pollingInterval":2000}

FsWatchesRecursive::
/a/b/node_modules:
  {}

Timeout callback:: count: 2
2: *ensureProjectForOpenFiles* *deleted*
3: /dev/null/inferredProject1* *new*
4: *ensureProjectForOpenFiles* *new*

Projects::
/dev/null/inferredProject1* (Inferred) *changed*
    projectStateVersion: 3 *changed*
    projectProgramVersion: 2 *changed*
    dirty: true

ScriptInfos::
/a/b/app.js (Open)
    version: SVC-1-0
    containingProjects: 1
        /dev/null/inferredProject1* *default*
/a/b/node_modules/fooo/index.d.ts
    version: Text-1
    containingProjects: 1
        /dev/null/inferredProject1*
/tmp/node_modules/foo/a/a.d.ts *new*
    version: Text-1
    containingProjects: 1
        /dev/null/inferredProject1*
/tmp/node_modules/foo/a/b.d.ts *new*
    version: Text-1
    containingProjects: 1
        /dev/null/inferredProject1*
/tmp/node_modules/foo/a/c.d.ts *new*
    version: Text-1
    containingProjects: 1
        /dev/null/inferredProject1*
/tmp/node_modules/foo/index.d.ts *new*
    version: Text-1
    containingProjects: 0

Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: /dev/null/inferredProject1*
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: /dev/null/inferredProject1* projectStateVersion: 3 projectProgramVersion: 2 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Project '/dev/null/inferredProject1*' (Inferred)
Info seq  [hh:mm:ss:mss] 	Files (5)
	/tmp/node_modules/foo/a/a.d.ts Text-1 "export function a (): void;"
	/tmp/node_modules/foo/a/b.d.ts Text-1 "export function b (): void;"
	/tmp/node_modules/foo/a/c.d.ts Text-1 "export function c (): void;"
	/a/b/node_modules/fooo/index.d.ts Text-1 "export var x: string;"
	/a/b/app.js SVC-1-0 "\n                    import * as a from \"foo/a/a\";\n                    import * as b from \"foo/a/b\";\n                    import * as c from \"foo/a/c\";\n            import * as x from \"fooo\";"


	../../tmp/node_modules/foo/a/a.d.ts
	  Imported via "foo/a/a" from file 'app.js'
	../../tmp/node_modules/foo/a/b.d.ts
	  Imported via "foo/a/b" from file 'app.js'
	../../tmp/node_modules/foo/a/c.d.ts
	  Imported via "foo/a/c" from file 'app.js'
	node_modules/fooo/index.d.ts
	  Imported via "fooo" from file 'app.js'
	app.js
	  Root file specified for compilation

Info seq  [hh:mm:ss:mss] -----------------------------------------------
TI:: [hh:mm:ss:mss] Got install request
    {
      "projectName": "/dev/null/inferredProject1*",
      "fileNames": [
        "/a/b/app.js"
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
      "projectRootPath": "/a/b",
      "kind": "discover"
    }
TI:: [hh:mm:ss:mss] Explicitly included types: []
TI:: [hh:mm:ss:mss] Searching for typing names in /a/b/node_modules; all files: []
TI:: [hh:mm:ss:mss]     Found package names: []
TI:: [hh:mm:ss:mss] Inferred typings from unresolved imports: []
TI:: [hh:mm:ss:mss] Finished typings discovery:
    {
      "cachedTypingPaths": [],
      "newTypingNames": [],
      "filesToWatch": [
        "/a/b/bower_components",
        "/a/b/node_modules"
      ]
    }
TI:: [hh:mm:ss:mss] Sending response:
    {
      "kind": "action::watchTypingLocations",
      "projectName": "/dev/null/inferredProject1*"
    }
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
Info seq  [hh:mm:ss:mss] Resolution from : /a/b/app.js for "fooo" goes to: {
  "resolvedFileName": "/a/b/node_modules/fooo/index.d.ts",
  "extension": ".d.ts",
  "isExternalLibraryImport": true,
  "resolvedUsingTsExtension": false
}
Before request

Projects::
/dev/null/inferredProject1* (Inferred) *changed*
    projectStateVersion: 3
    projectProgramVersion: 3 *changed*
    dirty: false *changed*

Info seq  [hh:mm:ss:mss] request:
    {
      "command": "applyChangedToOpenFiles",
      "arguments": {
        "changedFiles": [
          {
            "fileName": "/a/b/app.js",
            "changes": [
              {
                "span": {
                  "start": 0,
                  "length": 0
                },
                "newText": "import * as bar from \"bar\";"
              }
            ]
          }
        ]
      },
      "seq": 2,
      "type": "request"
    }
Info seq  [hh:mm:ss:mss] response:
    {
      "response": true,
      "responseRequired": true
    }
After request

Projects::
/dev/null/inferredProject1* (Inferred) *changed*
    projectStateVersion: 4 *changed*
    projectProgramVersion: 3
    dirty: true *changed*

ScriptInfos::
/a/b/app.js (Open) *changed*
    version: SVC-1-1 *changed*
    containingProjects: 1
        /dev/null/inferredProject1* *default*
/a/b/node_modules/fooo/index.d.ts
    version: Text-1
    containingProjects: 1
        /dev/null/inferredProject1*
/tmp/node_modules/foo/a/a.d.ts
    version: Text-1
    containingProjects: 1
        /dev/null/inferredProject1*
/tmp/node_modules/foo/a/b.d.ts
    version: Text-1
    containingProjects: 1
        /dev/null/inferredProject1*
/tmp/node_modules/foo/a/c.d.ts
    version: Text-1
    containingProjects: 1
        /dev/null/inferredProject1*
/tmp/node_modules/foo/index.d.ts
    version: Text-1
    containingProjects: 0

Before running Timeout callback:: count: 2
3: /dev/null/inferredProject1*
4: *ensureProjectForOpenFiles*

Info seq  [hh:mm:ss:mss] Running: /dev/null/inferredProject1*
Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: /dev/null/inferredProject1*
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: /dev/null/inferredProject1* projectStateVersion: 4 projectProgramVersion: 3 structureChanged: true structureIsReused:: SafeModules Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Project '/dev/null/inferredProject1*' (Inferred)
Info seq  [hh:mm:ss:mss] 	Files (5)
	/tmp/node_modules/foo/a/a.d.ts Text-1 "export function a (): void;"
	/tmp/node_modules/foo/a/b.d.ts Text-1 "export function b (): void;"
	/tmp/node_modules/foo/a/c.d.ts Text-1 "export function c (): void;"
	/a/b/node_modules/fooo/index.d.ts Text-1 "export var x: string;"
	/a/b/app.js SVC-1-1 "import * as bar from \"bar\";\n                    import * as a from \"foo/a/a\";\n                    import * as b from \"foo/a/b\";\n                    import * as c from \"foo/a/c\";\n            import * as x from \"fooo\";"

Info seq  [hh:mm:ss:mss] -----------------------------------------------
TI:: [hh:mm:ss:mss] Got install request
    {
      "projectName": "/dev/null/inferredProject1*",
      "fileNames": [
        "/a/b/app.js"
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
      "unresolvedImports": [
        "bar"
      ],
      "projectRootPath": "/a/b",
      "kind": "discover"
    }
TI:: [hh:mm:ss:mss] Explicitly included types: []
TI:: [hh:mm:ss:mss] Searching for typing names in /a/b/node_modules; all files: []
TI:: [hh:mm:ss:mss]     Found package names: []
TI:: [hh:mm:ss:mss] Inferred typings from unresolved imports: ["bar"]
TI:: [hh:mm:ss:mss] Finished typings discovery:
    {
      "cachedTypingPaths": [],
      "newTypingNames": [
        "bar"
      ],
      "filesToWatch": [
        "/a/b/bower_components",
        "/a/b/node_modules"
      ]
    }
TI:: [hh:mm:ss:mss] Sending response:
    {
      "kind": "action::watchTypingLocations",
      "projectName": "/dev/null/inferredProject1*"
    }
TI:: [hh:mm:ss:mss] Installing typings ["bar"]
TI:: [hh:mm:ss:mss] 'bar':: Entry for package 'bar' does not exist in local types registry - skipping...
TI:: [hh:mm:ss:mss] All typings are known to be missing or invalid - no need to install more typings
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
      "unresolvedImports": [
        "bar"
      ],
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
        "unresolvedImports": [
          "bar"
        ],
        "kind": "action::set"
      }
    }
Info seq  [hh:mm:ss:mss] Running: *ensureProjectForOpenFiles*
Info seq  [hh:mm:ss:mss] Before ensureProjectForOpenFiles:
Info seq  [hh:mm:ss:mss] Project '/dev/null/inferredProject1*' (Inferred)
Info seq  [hh:mm:ss:mss] 	Files (5)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: /a/b/app.js ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /dev/null/inferredProject1*
Info seq  [hh:mm:ss:mss] After ensureProjectForOpenFiles:
Info seq  [hh:mm:ss:mss] Project '/dev/null/inferredProject1*' (Inferred)
Info seq  [hh:mm:ss:mss] 	Files (5)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: /a/b/app.js ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /dev/null/inferredProject1*
Info seq  [hh:mm:ss:mss] got projects updated in background /a/b/app.js
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "projectsUpdatedInBackground",
      "body": {
        "openFiles": [
          "/a/b/app.js"
        ]
      }
    }
After running Timeout callback:: count: 0

Projects::
/dev/null/inferredProject1* (Inferred) *changed*
    projectStateVersion: 4
    projectProgramVersion: 4 *changed*
    dirty: false *changed*
