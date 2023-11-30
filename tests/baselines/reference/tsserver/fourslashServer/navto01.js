currentDirectory:: / useCaseSensitiveFileNames: false
Info seq  [hh:mm:ss:mss] Provided types map file "/typesMap.json" doesn't exist
//// [/lib.d.ts]
lib.d.ts-Text

//// [/lib.decorators.d.ts]
lib.decorators.d.ts-Text

//// [/lib.decorators.legacy.d.ts]
lib.decorators.legacy.d.ts-Text

//// [/tests/cases/fourslash/server/navto01.ts]
/// Module
module MyShapes {

    // Class
    export class MyPoint {
        // Instance member
        private MyoriginAttheHorizon = 0.0;

        // Getter
        get MydistanceFromOrigin(): number { return 0; }
    }
}

// Local variables
var myXyz = new Shapes.Point();


Info seq  [hh:mm:ss:mss] request:
    {
      "seq": 0,
      "type": "request",
      "arguments": {
        "file": "/tests/cases/fourslash/server/navto01.ts"
      },
      "command": "open"
    }
Info seq  [hh:mm:ss:mss] Search path: /tests/cases/fourslash/server
Info seq  [hh:mm:ss:mss] For info: /tests/cases/fourslash/server/navto01.ts :: No config files found.
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /tests/cases/fourslash/server/tsconfig.json 2000 undefined WatchType: Config file for the inferred project root
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /tests/cases/fourslash/server/jsconfig.json 2000 undefined WatchType: Config file for the inferred project root
Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: /dev/null/inferredProject1*
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /lib.d.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /tests/cases/fourslash/server/node_modules 1 undefined Project: /dev/null/inferredProject1* WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /tests/cases/fourslash/server/node_modules 1 undefined Project: /dev/null/inferredProject1* WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /tests/cases/fourslash/node_modules 1 undefined Project: /dev/null/inferredProject1* WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /tests/cases/fourslash/node_modules 1 undefined Project: /dev/null/inferredProject1* WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /lib.decorators.d.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /lib.decorators.legacy.d.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /tests/cases/fourslash/server/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /tests/cases/fourslash/server/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /tests/cases/fourslash/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /tests/cases/fourslash/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: /dev/null/inferredProject1* Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Project '/dev/null/inferredProject1*' (Inferred)
Info seq  [hh:mm:ss:mss] 	Files (4)
	/lib.d.ts Text-1 lib.d.ts-Text
	/lib.decorators.d.ts Text-1 lib.decorators.d.ts-Text
	/lib.decorators.legacy.d.ts Text-1 lib.decorators.legacy.d.ts-Text
	/tests/cases/fourslash/server/navto01.ts SVC-1-0 "/// Module\nmodule MyShapes {\n\n    // Class\n    export class MyPoint {\n        // Instance member\n        private MyoriginAttheHorizon = 0.0;\n\n        // Getter\n        get MydistanceFromOrigin(): number { return 0; }\n    }\n}\n\n// Local variables\nvar myXyz = new Shapes.Point();"


	../../../../lib.d.ts
	  Default library for target 'es5'
	../../../../lib.decorators.d.ts
	  Library referenced via 'decorators' from file '../../../../lib.d.ts'
	../../../../lib.decorators.legacy.d.ts
	  Library referenced via 'decorators.legacy' from file '../../../../lib.d.ts'
	navto01.ts
	  Root file specified for compilation

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Project '/dev/null/inferredProject1*' (Inferred)
Info seq  [hh:mm:ss:mss] 	Files (4)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: /tests/cases/fourslash/server/navto01.ts ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /dev/null/inferredProject1*
After Request
watchedFiles::
/lib.d.ts: *new*
  {"pollingInterval":500}
/lib.decorators.d.ts: *new*
  {"pollingInterval":500}
/lib.decorators.legacy.d.ts: *new*
  {"pollingInterval":500}
/tests/cases/fourslash/server/jsconfig.json: *new*
  {"pollingInterval":2000}
/tests/cases/fourslash/server/tsconfig.json: *new*
  {"pollingInterval":2000}

watchedDirectoriesRecursive::
/tests/cases/fourslash/node_modules: *new*
  {}
/tests/cases/fourslash/node_modules/@types: *new*
  {}
/tests/cases/fourslash/server/node_modules: *new*
  {}
/tests/cases/fourslash/server/node_modules/@types: *new*
  {}

Info seq  [hh:mm:ss:mss] request:
    {
      "seq": 1,
      "type": "request",
      "arguments": {
        "searchValue": "Shapes",
        "currentFileOnly": false
      },
      "command": "navto"
    }
Info seq  [hh:mm:ss:mss] response:
    {
      "seq": 0,
      "type": "response",
      "command": "navto",
      "request_seq": 1,
      "success": true,
      "body": [
        {
          "name": "MyShapes",
          "kind": "module",
          "kindModifiers": "",
          "isCaseSensitive": true,
          "matchKind": "substring",
          "file": "/tests/cases/fourslash/server/navto01.ts",
          "start": {
            "line": 2,
            "offset": 1
          },
          "end": {
            "line": 12,
            "offset": 2
          }
        }
      ]
    }
Info seq  [hh:mm:ss:mss] request:
    {
      "seq": 2,
      "type": "request",
      "arguments": {
        "searchValue": "Point",
        "currentFileOnly": false
      },
      "command": "navto"
    }
Info seq  [hh:mm:ss:mss] response:
    {
      "seq": 0,
      "type": "response",
      "command": "navto",
      "request_seq": 2,
      "success": true,
      "body": [
        {
          "name": "MyPoint",
          "kind": "class",
          "kindModifiers": "export",
          "isCaseSensitive": true,
          "matchKind": "substring",
          "file": "/tests/cases/fourslash/server/navto01.ts",
          "start": {
            "line": 5,
            "offset": 5
          },
          "end": {
            "line": 11,
            "offset": 6
          },
          "containerName": "MyShapes",
          "containerKind": "module"
        }
      ]
    }
Info seq  [hh:mm:ss:mss] request:
    {
      "seq": 3,
      "type": "request",
      "arguments": {
        "searchValue": "originAttheHorizon",
        "currentFileOnly": false
      },
      "command": "navto"
    }
Info seq  [hh:mm:ss:mss] response:
    {
      "seq": 0,
      "type": "response",
      "command": "navto",
      "request_seq": 3,
      "success": true,
      "body": [
        {
          "name": "MyoriginAttheHorizon",
          "kind": "property",
          "kindModifiers": "private",
          "isCaseSensitive": true,
          "matchKind": "substring",
          "file": "/tests/cases/fourslash/server/navto01.ts",
          "start": {
            "line": 7,
            "offset": 9
          },
          "end": {
            "line": 7,
            "offset": 44
          },
          "containerName": "MyPoint",
          "containerKind": "class"
        }
      ]
    }
Info seq  [hh:mm:ss:mss] request:
    {
      "seq": 4,
      "type": "request",
      "arguments": {
        "searchValue": "distanceFromOrigin",
        "currentFileOnly": false
      },
      "command": "navto"
    }
Info seq  [hh:mm:ss:mss] response:
    {
      "seq": 0,
      "type": "response",
      "command": "navto",
      "request_seq": 4,
      "success": true,
      "body": [
        {
          "name": "MydistanceFromOrigin",
          "kind": "getter",
          "kindModifiers": "",
          "isCaseSensitive": true,
          "matchKind": "substring",
          "file": "/tests/cases/fourslash/server/navto01.ts",
          "start": {
            "line": 10,
            "offset": 9
          },
          "end": {
            "line": 10,
            "offset": 57
          },
          "containerName": "MyPoint",
          "containerKind": "class"
        }
      ]
    }
Info seq  [hh:mm:ss:mss] request:
    {
      "seq": 5,
      "type": "request",
      "arguments": {
        "searchValue": "Xyz",
        "currentFileOnly": false
      },
      "command": "navto"
    }
Info seq  [hh:mm:ss:mss] response:
    {
      "seq": 0,
      "type": "response",
      "command": "navto",
      "request_seq": 5,
      "success": true,
      "body": [
        {
          "name": "myXyz",
          "kind": "var",
          "kindModifiers": "",
          "isCaseSensitive": true,
          "matchKind": "substring",
          "file": "/tests/cases/fourslash/server/navto01.ts",
          "start": {
            "line": 15,
            "offset": 5
          },
          "end": {
            "line": 15,
            "offset": 31
          }
        }
      ]
    }