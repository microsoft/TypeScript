currentDirectory:: / useCaseSensitiveFileNames: false
Info seq  [hh:mm:ss:mss] Provided types map file "/typesMap.json" doesn't exist
Before request
//// [/a/b/app.ts]
function add(x: number, y: string): number {
    return x + y;
}

add(10, 50);

//// [/a/b/app2.ts]
function booleanNoop(b: boolean): void {
    b;
    return;
}

booleanNoop("not a boolean");

//// [/a/b/app3.ts]
function stringId(x: string): string {
    return x;
}

stringId("ok");

stringId(1000);

//// [/a/b/app4.ts]
function numberId(x: number): number {
    return x;
}

numberId(1000);

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
        "file": "/a/b/app.ts"
      },
      "seq": 1,
      "type": "request"
    }
Info seq  [hh:mm:ss:mss] getConfigFileNameForFile:: File: /a/b/app.ts ProjectRootPath: undefined:: Result: undefined
Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: /dev/null/inferredProject1*
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /a/lib/lib.d.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: /dev/null/inferredProject1* projectStateVersion: 1 projectProgramVersion: 0 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Project '/dev/null/inferredProject1*' (Inferred)
Info seq  [hh:mm:ss:mss] 	Files (2)
	/a/lib/lib.d.ts Text-1 "/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }"
	/a/b/app.ts SVC-1-0 "function add(x: number, y: string): number {\n    return x + y;\n}\n\nadd(10, 50);"


	../lib/lib.d.ts
	  Default library for target 'es5'
	app.ts
	  Root file specified for compilation

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Project '/dev/null/inferredProject1*' (Inferred)
Info seq  [hh:mm:ss:mss] 	Files (2)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: /a/b/app.ts ProjectRootPath: undefined
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

FsWatches::
/a/lib/lib.d.ts: *new*
  {}

Projects::
/dev/null/inferredProject1* (Inferred) *new*
    projectStateVersion: 1
    projectProgramVersion: 1

ScriptInfos::
/a/b/app.ts (Open) *new*
    version: SVC-1-0
    containingProjects: 1
        /dev/null/inferredProject1* *default*
/a/lib/lib.d.ts *new*
    version: Text-1
    containingProjects: 1
        /dev/null/inferredProject1*

Before request

Info seq  [hh:mm:ss:mss] request:
    {
      "command": "open",
      "arguments": {
        "file": "/a/b/app2.ts"
      },
      "seq": 2,
      "type": "request"
    }
Info seq  [hh:mm:ss:mss] getConfigFileNameForFile:: File: /a/b/app2.ts ProjectRootPath: undefined:: Result: undefined
Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: /dev/null/inferredProject2*
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: /dev/null/inferredProject2* projectStateVersion: 1 projectProgramVersion: 0 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Project '/dev/null/inferredProject2*' (Inferred)
Info seq  [hh:mm:ss:mss] 	Files (2)
	/a/lib/lib.d.ts Text-1 "/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }"
	/a/b/app2.ts SVC-1-0 "function booleanNoop(b: boolean): void {\n    b;\n    return;\n}\n\nbooleanNoop(\"not a boolean\");"


	../lib/lib.d.ts
	  Default library for target 'es5'
	app2.ts
	  Root file specified for compilation

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Project '/dev/null/inferredProject1*' (Inferred)
Info seq  [hh:mm:ss:mss] 	Files (2)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Project '/dev/null/inferredProject2*' (Inferred)
Info seq  [hh:mm:ss:mss] 	Files (2)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: /a/b/app.ts ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /dev/null/inferredProject1*
Info seq  [hh:mm:ss:mss] 	FileName: /a/b/app2.ts ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /dev/null/inferredProject2*
Info seq  [hh:mm:ss:mss] response:
    {
      "seq": 0,
      "type": "response",
      "command": "open",
      "request_seq": 2,
      "success": true,
      "performanceData": {
        "updateGraphDurationMs": *
      }
    }
After request

Projects::
/dev/null/inferredProject1* (Inferred)
    projectStateVersion: 1
    projectProgramVersion: 1
/dev/null/inferredProject2* (Inferred) *new*
    projectStateVersion: 1
    projectProgramVersion: 1

ScriptInfos::
/a/b/app.ts (Open)
    version: SVC-1-0
    containingProjects: 1
        /dev/null/inferredProject1* *default*
/a/b/app2.ts (Open) *new*
    version: SVC-1-0
    containingProjects: 1
        /dev/null/inferredProject2* *default*
/a/lib/lib.d.ts *changed*
    version: Text-1
    containingProjects: 2 *changed*
        /dev/null/inferredProject1*
        /dev/null/inferredProject2* *new*

Before request

Info seq  [hh:mm:ss:mss] request:
    {
      "command": "open",
      "arguments": {
        "file": "/a/b/app3.ts"
      },
      "seq": 3,
      "type": "request"
    }
Info seq  [hh:mm:ss:mss] getConfigFileNameForFile:: File: /a/b/app3.ts ProjectRootPath: undefined:: Result: undefined
Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: /dev/null/inferredProject3*
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: /dev/null/inferredProject3* projectStateVersion: 1 projectProgramVersion: 0 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Project '/dev/null/inferredProject3*' (Inferred)
Info seq  [hh:mm:ss:mss] 	Files (2)
	/a/lib/lib.d.ts Text-1 "/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }"
	/a/b/app3.ts SVC-1-0 "function stringId(x: string): string {\n    return x;\n}\n\nstringId(\"ok\");\n\nstringId(1000);"


	../lib/lib.d.ts
	  Default library for target 'es5'
	app3.ts
	  Root file specified for compilation

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Project '/dev/null/inferredProject1*' (Inferred)
Info seq  [hh:mm:ss:mss] 	Files (2)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Project '/dev/null/inferredProject2*' (Inferred)
Info seq  [hh:mm:ss:mss] 	Files (2)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Project '/dev/null/inferredProject3*' (Inferred)
Info seq  [hh:mm:ss:mss] 	Files (2)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: /a/b/app.ts ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /dev/null/inferredProject1*
Info seq  [hh:mm:ss:mss] 	FileName: /a/b/app2.ts ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /dev/null/inferredProject2*
Info seq  [hh:mm:ss:mss] 	FileName: /a/b/app3.ts ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /dev/null/inferredProject3*
Info seq  [hh:mm:ss:mss] response:
    {
      "seq": 0,
      "type": "response",
      "command": "open",
      "request_seq": 3,
      "success": true,
      "performanceData": {
        "updateGraphDurationMs": *
      }
    }
After request

Projects::
/dev/null/inferredProject1* (Inferred)
    projectStateVersion: 1
    projectProgramVersion: 1
/dev/null/inferredProject2* (Inferred)
    projectStateVersion: 1
    projectProgramVersion: 1
/dev/null/inferredProject3* (Inferred) *new*
    projectStateVersion: 1
    projectProgramVersion: 1

ScriptInfos::
/a/b/app.ts (Open)
    version: SVC-1-0
    containingProjects: 1
        /dev/null/inferredProject1* *default*
/a/b/app2.ts (Open)
    version: SVC-1-0
    containingProjects: 1
        /dev/null/inferredProject2* *default*
/a/b/app3.ts (Open) *new*
    version: SVC-1-0
    containingProjects: 1
        /dev/null/inferredProject3* *default*
/a/lib/lib.d.ts *changed*
    version: Text-1
    containingProjects: 3 *changed*
        /dev/null/inferredProject1*
        /dev/null/inferredProject2*
        /dev/null/inferredProject3* *new*

Before request

Info seq  [hh:mm:ss:mss] request:
    {
      "command": "open",
      "arguments": {
        "file": "/a/b/app4.ts"
      },
      "seq": 4,
      "type": "request"
    }
Info seq  [hh:mm:ss:mss] getConfigFileNameForFile:: File: /a/b/app4.ts ProjectRootPath: undefined:: Result: undefined
Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: /dev/null/inferredProject4*
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: /dev/null/inferredProject4* projectStateVersion: 1 projectProgramVersion: 0 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Project '/dev/null/inferredProject4*' (Inferred)
Info seq  [hh:mm:ss:mss] 	Files (2)
	/a/lib/lib.d.ts Text-1 "/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }"
	/a/b/app4.ts SVC-1-0 "function numberId(x: number): number {\n    return x;\n}\n\nnumberId(1000);"


	../lib/lib.d.ts
	  Default library for target 'es5'
	app4.ts
	  Root file specified for compilation

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Project '/dev/null/inferredProject1*' (Inferred)
Info seq  [hh:mm:ss:mss] 	Files (2)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Project '/dev/null/inferredProject2*' (Inferred)
Info seq  [hh:mm:ss:mss] 	Files (2)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Project '/dev/null/inferredProject3*' (Inferred)
Info seq  [hh:mm:ss:mss] 	Files (2)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Project '/dev/null/inferredProject4*' (Inferred)
Info seq  [hh:mm:ss:mss] 	Files (2)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: /a/b/app.ts ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /dev/null/inferredProject1*
Info seq  [hh:mm:ss:mss] 	FileName: /a/b/app2.ts ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /dev/null/inferredProject2*
Info seq  [hh:mm:ss:mss] 	FileName: /a/b/app3.ts ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /dev/null/inferredProject3*
Info seq  [hh:mm:ss:mss] 	FileName: /a/b/app4.ts ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /dev/null/inferredProject4*
Info seq  [hh:mm:ss:mss] response:
    {
      "seq": 0,
      "type": "response",
      "command": "open",
      "request_seq": 4,
      "success": true,
      "performanceData": {
        "updateGraphDurationMs": *
      }
    }
After request

Projects::
/dev/null/inferredProject1* (Inferred)
    projectStateVersion: 1
    projectProgramVersion: 1
/dev/null/inferredProject2* (Inferred)
    projectStateVersion: 1
    projectProgramVersion: 1
/dev/null/inferredProject3* (Inferred)
    projectStateVersion: 1
    projectProgramVersion: 1
/dev/null/inferredProject4* (Inferred) *new*
    projectStateVersion: 1
    projectProgramVersion: 1

ScriptInfos::
/a/b/app.ts (Open)
    version: SVC-1-0
    containingProjects: 1
        /dev/null/inferredProject1* *default*
/a/b/app2.ts (Open)
    version: SVC-1-0
    containingProjects: 1
        /dev/null/inferredProject2* *default*
/a/b/app3.ts (Open)
    version: SVC-1-0
    containingProjects: 1
        /dev/null/inferredProject3* *default*
/a/b/app4.ts (Open) *new*
    version: SVC-1-0
    containingProjects: 1
        /dev/null/inferredProject4* *default*
/a/lib/lib.d.ts *changed*
    version: Text-1
    containingProjects: 4 *changed*
        /dev/null/inferredProject1*
        /dev/null/inferredProject2*
        /dev/null/inferredProject3*
        /dev/null/inferredProject4* *new*

Before request

Info seq  [hh:mm:ss:mss] request:
    {
      "command": "geterr",
      "arguments": {
        "delay": 0,
        "files": [
          {
            "file": "/a/b/app.ts",
            "ranges": [
              {
                "startLine": 5,
                "startOffset": 1,
                "endLine": 5,
                "endOffset": 13
              }
            ]
          },
          "/a/b/app2.ts",
          {
            "file": "/a/b/app3.ts",
            "ranges": [
              {
                "startLine": 5,
                "startOffset": 1,
                "endLine": 5,
                "endOffset": 16
              }
            ]
          },
          "/a/b/app4.ts"
        ]
      },
      "seq": 5,
      "type": "request"
    }
After request

Timeout callback:: count: 1
1: checkOne *new*

Before running Timeout callback:: count: 1
1: checkOne

Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "syntaxDiag",
      "body": {
        "file": "/a/b/app.ts",
        "diagnostics": []
      }
    }
After running Timeout callback:: count: 0

Immedidate callback:: count: 1
1: regionSemanticCheck *new*

Before running Immedidate callback:: count: 1
1: regionSemanticCheck

Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "regionSemanticDiag",
      "body": {
        "file": "/a/b/app.ts",
        "diagnostics": [
          {
            "start": {
              "line": 5,
              "offset": 9
            },
            "end": {
              "line": 5,
              "offset": 11
            },
            "text": "Argument of type 'number' is not assignable to parameter of type 'string'.",
            "code": 2345,
            "category": "error"
          }
        ],
        "spans": [
          {
            "start": {
              "line": 3,
              "offset": 2
            },
            "end": {
              "line": 5,
              "offset": 13
            }
          }
        ]
      }
    }
After running Immedidate callback:: count: 1

Immedidate callback:: count: 1
2: semanticCheck *new*

Before running Immedidate callback:: count: 1
2: semanticCheck

Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "semanticDiag",
      "body": {
        "file": "/a/b/app.ts",
        "diagnostics": [
          {
            "start": {
              "line": 2,
              "offset": 5
            },
            "end": {
              "line": 2,
              "offset": 11
            },
            "text": "Type 'string' is not assignable to type 'number'.",
            "code": 2322,
            "category": "error"
          },
          {
            "start": {
              "line": 5,
              "offset": 9
            },
            "end": {
              "line": 5,
              "offset": 11
            },
            "text": "Argument of type 'number' is not assignable to parameter of type 'string'.",
            "code": 2345,
            "category": "error"
          }
        ]
      }
    }
After running Immedidate callback:: count: 1

Immedidate callback:: count: 1
3: suggestionCheck *new*

Before running Immedidate callback:: count: 1
3: suggestionCheck

Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "suggestionDiag",
      "body": {
        "file": "/a/b/app.ts",
        "diagnostics": []
      }
    }
After running Immedidate callback:: count: 0

Timeout callback:: count: 1
2: checkOne *new*

Before running Timeout callback:: count: 1
2: checkOne

Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "syntaxDiag",
      "body": {
        "file": "/a/b/app2.ts",
        "diagnostics": []
      }
    }
After running Timeout callback:: count: 0

Immedidate callback:: count: 1
4: semanticCheck *new*

Before running Immedidate callback:: count: 1
4: semanticCheck

Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "semanticDiag",
      "body": {
        "file": "/a/b/app2.ts",
        "diagnostics": [
          {
            "start": {
              "line": 6,
              "offset": 13
            },
            "end": {
              "line": 6,
              "offset": 28
            },
            "text": "Argument of type 'string' is not assignable to parameter of type 'boolean'.",
            "code": 2345,
            "category": "error"
          }
        ]
      }
    }
After running Immedidate callback:: count: 1

Immedidate callback:: count: 1
5: suggestionCheck *new*

Before running Immedidate callback:: count: 1
5: suggestionCheck

Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "suggestionDiag",
      "body": {
        "file": "/a/b/app2.ts",
        "diagnostics": []
      }
    }
After running Immedidate callback:: count: 0

Timeout callback:: count: 1
3: checkOne *new*

Before running Timeout callback:: count: 1
3: checkOne

Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "syntaxDiag",
      "body": {
        "file": "/a/b/app3.ts",
        "diagnostics": []
      }
    }
After running Timeout callback:: count: 0

Immedidate callback:: count: 1
6: regionSemanticCheck *new*

Before running Immedidate callback:: count: 1
6: regionSemanticCheck

Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "regionSemanticDiag",
      "body": {
        "file": "/a/b/app3.ts",
        "diagnostics": [],
        "spans": [
          {
            "start": {
              "line": 3,
              "offset": 2
            },
            "end": {
              "line": 5,
              "offset": 16
            }
          }
        ]
      }
    }
After running Immedidate callback:: count: 1

Immedidate callback:: count: 1
7: semanticCheck *new*

Before running Immedidate callback:: count: 1
7: semanticCheck

Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "semanticDiag",
      "body": {
        "file": "/a/b/app3.ts",
        "diagnostics": [
          {
            "start": {
              "line": 7,
              "offset": 10
            },
            "end": {
              "line": 7,
              "offset": 14
            },
            "text": "Argument of type 'number' is not assignable to parameter of type 'string'.",
            "code": 2345,
            "category": "error"
          }
        ]
      }
    }
After running Immedidate callback:: count: 1

Immedidate callback:: count: 1
8: suggestionCheck *new*

Before running Immedidate callback:: count: 1
8: suggestionCheck

Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "suggestionDiag",
      "body": {
        "file": "/a/b/app3.ts",
        "diagnostics": []
      }
    }
After running Immedidate callback:: count: 0

Timeout callback:: count: 1
4: checkOne *new*

Before running Timeout callback:: count: 1
4: checkOne

Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "syntaxDiag",
      "body": {
        "file": "/a/b/app4.ts",
        "diagnostics": []
      }
    }
After running Timeout callback:: count: 0

Immedidate callback:: count: 1
9: semanticCheck *new*

Before running Immedidate callback:: count: 1
9: semanticCheck

Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "semanticDiag",
      "body": {
        "file": "/a/b/app4.ts",
        "diagnostics": []
      }
    }
After running Immedidate callback:: count: 1

Immedidate callback:: count: 1
10: suggestionCheck *new*

Before running Immedidate callback:: count: 1
10: suggestionCheck

Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "suggestionDiag",
      "body": {
        "file": "/a/b/app4.ts",
        "diagnostics": []
      }
    }
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "requestCompleted",
      "body": {
        "request_seq": 5,
        "performanceData": {
          "diagnosticsDuration": [
            {
              "syntaxDiag": *,
              "regionSemanticDiag": *,
              "semanticDiag": *,
              "suggestionDiag": *,
              "file": "/a/b/app.ts"
            },
            {
              "syntaxDiag": *,
              "semanticDiag": *,
              "suggestionDiag": *,
              "file": "/a/b/app2.ts"
            },
            {
              "syntaxDiag": *,
              "regionSemanticDiag": *,
              "semanticDiag": *,
              "suggestionDiag": *,
              "file": "/a/b/app3.ts"
            },
            {
              "syntaxDiag": *,
              "semanticDiag": *,
              "suggestionDiag": *,
              "file": "/a/b/app4.ts"
            }
          ]
        }
      }
    }
After running Immedidate callback:: count: 0
