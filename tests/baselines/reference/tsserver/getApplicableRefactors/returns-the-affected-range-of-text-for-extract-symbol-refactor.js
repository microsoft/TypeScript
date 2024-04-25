currentDirectory:: / useCaseSensitiveFileNames: false
Info seq  [hh:mm:ss:mss] Provided types map file "/typesMap.json" doesn't exist
Before request
//// [/a.ts]
class Foo {
    someMethod(m: number) {
        var x = m;
        x = x * 3;
        var y = 30;
        var j = 10;
        var z = y + j;
        console.log(z);
        var q = 10;
        return q;
    }
}


Info seq  [hh:mm:ss:mss] request:
    {
      "command": "open",
      "arguments": {
        "file": "/a.ts"
      },
      "seq": 1,
      "type": "request"
    }
Info seq  [hh:mm:ss:mss] getConfigFileNameForFile:: File: /a.ts ProjectRootPath: undefined:: Result: undefined
Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: /dev/null/inferredProject1*
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /a/lib/lib.d.ts 500 undefined Project: /dev/null/inferredProject1* WatchType: Missing file
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: /dev/null/inferredProject1* projectStateVersion: 1 projectProgramVersion: 0 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Project '/dev/null/inferredProject1*' (Inferred)
Info seq  [hh:mm:ss:mss] 	Files (1)
	/a.ts SVC-1-0 "class Foo {\n    someMethod(m: number) {\n        var x = m;\n        x = x * 3;\n        var y = 30;\n        var j = 10;\n        var z = y + j;\n        console.log(z);\n        var q = 10;\n        return q;\n    }\n}"


	a.ts
	  Root file specified for compilation

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Project '/dev/null/inferredProject1*' (Inferred)
Info seq  [hh:mm:ss:mss] 	Files (1)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: /a.ts ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /dev/null/inferredProject1*
Info seq  [hh:mm:ss:mss] response:
    {
      "responseRequired": false
    }
After request

PolledWatches::
/a/lib/lib.d.ts: *new*
  {"pollingInterval":500}

Projects::
/dev/null/inferredProject1* (Inferred) *new*
    projectStateVersion: 1
    projectProgramVersion: 1

ScriptInfos::
/a.ts (Open) *new*
    version: SVC-1-0
    containingProjects: 1
        /dev/null/inferredProject1* *default*

Before request

Info seq  [hh:mm:ss:mss] request:
    {
      "command": "getApplicableRefactors",
      "arguments": {
        "file": "/a.ts",
        "startLine": 3,
        "startOffset": 9,
        "endLine": 5,
        "endOffset": 20
      },
      "seq": 2,
      "type": "request"
    }
Info seq  [hh:mm:ss:mss] response:
    {
      "response": [
        {
          "name": "Extract Symbol",
          "description": "Extract function",
          "actions": [
            {
              "description": "Extract to inner function in method 'someMethod'",
              "name": "function_scope_0",
              "kind": "refactor.extract.function",
              "range": {
                "start": {
                  "line": 3,
                  "offset": 9
                },
                "end": {
                  "line": 5,
                  "offset": 20
                }
              }
            },
            {
              "description": "Extract to method in class 'Foo'",
              "name": "function_scope_1",
              "kind": "refactor.extract.function",
              "range": {
                "start": {
                  "line": 3,
                  "offset": 9
                },
                "end": {
                  "line": 5,
                  "offset": 20
                }
              }
            },
            {
              "description": "Extract to function in global scope",
              "name": "function_scope_2",
              "kind": "refactor.extract.function",
              "range": {
                "start": {
                  "line": 3,
                  "offset": 9
                },
                "end": {
                  "line": 5,
                  "offset": 20
                }
              }
            }
          ]
        }
      ],
      "responseRequired": true
    }
After request
