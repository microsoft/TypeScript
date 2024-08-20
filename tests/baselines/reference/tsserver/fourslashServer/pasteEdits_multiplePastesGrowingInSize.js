currentDirectory:: / useCaseSensitiveFileNames: false
Info seq  [hh:mm:ss:mss] Provided types map file "/typesMap.json" doesn't exist
//// [/a.ts]
function foo() {
   const p = 1;
}
function too() {
   function k(t: string) {
       console.log(t);
   }
}
class bar {
    constructor() {
        function a() {
            console.log("hello");
        }
        a();
    }
    c() {
        console.log("hello again");
        function k() {
            const happy = banana + avocados;
        }
    }
}

//// [/b.ts]
export const juices = 1;
export const sauce = 2;

//// [/c.ts]
export const figs = 3;
export const tomato = 4;

//// [/lib.d.ts]
lib.d.ts-Text

//// [/lib.decorators.d.ts]
lib.decorators.d.ts-Text

//// [/lib.decorators.legacy.d.ts]
lib.decorators.legacy.d.ts-Text

//// [/tsconfig.json]
{ "files": ["a.ts", "b.ts", "c.ts"] }


Info seq  [hh:mm:ss:mss] request:
    {
      "seq": 0,
      "type": "request",
      "arguments": {
        "file": "/a.ts"
      },
      "command": "open"
    }
Info seq  [hh:mm:ss:mss] getConfigFileNameForFile:: File: /a.ts ProjectRootPath: undefined:: Result: /tsconfig.json
Info seq  [hh:mm:ss:mss] Creating configuration project /tsconfig.json
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /tsconfig.json 2000 undefined Project: /tsconfig.json WatchType: Config file
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "projectLoadingStart",
      "body": {
        "projectName": "/tsconfig.json",
        "reason": "Creating possible configured project for /a.ts to open"
      }
    }
Info seq  [hh:mm:ss:mss] Config: /tsconfig.json : {
 "rootNames": [
  "/a.ts",
  "/b.ts",
  "/c.ts"
 ],
 "options": {
  "configFilePath": "/tsconfig.json"
 }
}
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /b.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /c.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: /tsconfig.json
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /lib.d.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /lib.decorators.d.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /lib.decorators.legacy.d.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: /tsconfig.json projectStateVersion: 1 projectProgramVersion: 0 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Project '/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (6)
	/lib.d.ts Text-1 lib.d.ts-Text
	/lib.decorators.d.ts Text-1 lib.decorators.d.ts-Text
	/lib.decorators.legacy.d.ts Text-1 lib.decorators.legacy.d.ts-Text
	/a.ts SVC-1-0 "function foo() {\n   const p = 1;\n}\nfunction too() {\n   function k(t: string) {\n       console.log(t);\n   }\n}\nclass bar {\n    constructor() {\n        function a() {\n            console.log(\"hello\");\n        }\n        a();\n    }\n    c() {\n        console.log(\"hello again\");\n        function k() {\n            const happy = banana + avocados;\n        }\n    }\n}"
	/b.ts Text-1 "export const juices = 1;\nexport const sauce = 2;"
	/c.ts Text-1 "export const figs = 3;\nexport const tomato = 4;"


	lib.d.ts
	  Default library for target 'es5'
	lib.decorators.d.ts
	  Library referenced via 'decorators' from file 'lib.d.ts'
	lib.decorators.legacy.d.ts
	  Library referenced via 'decorators.legacy' from file 'lib.d.ts'
	a.ts
	  Part of 'files' list in tsconfig.json
	b.ts
	  Part of 'files' list in tsconfig.json
	c.ts
	  Part of 'files' list in tsconfig.json

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "projectLoadingFinish",
      "body": {
        "projectName": "/tsconfig.json"
      }
    }
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "configFileDiag",
      "body": {
        "triggerFile": "/a.ts",
        "configFile": "/tsconfig.json",
        "diagnostics": []
      }
    }
Info seq  [hh:mm:ss:mss] Project '/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (6)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: /a.ts ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /tsconfig.json
Info seq  [hh:mm:ss:mss] response:
    {
      "seq": 0,
      "type": "response",
      "command": "open",
      "request_seq": 0,
      "success": true,
      "performanceData": {
        "updateGraphDurationMs": *
      }
    }
After Request
watchedFiles::
/b.ts: *new*
  {"pollingInterval":500}
/c.ts: *new*
  {"pollingInterval":500}
/lib.d.ts: *new*
  {"pollingInterval":500}
/lib.decorators.d.ts: *new*
  {"pollingInterval":500}
/lib.decorators.legacy.d.ts: *new*
  {"pollingInterval":500}
/tsconfig.json: *new*
  {"pollingInterval":2000}

Projects::
/tsconfig.json (Configured) *new*
    projectStateVersion: 1
    projectProgramVersion: 1
    autoImportProviderHost: false

ScriptInfos::
/a.ts (Open) *new*
    version: SVC-1-0
    containingProjects: 1
        /tsconfig.json *default*
/b.ts *new*
    version: Text-1
    containingProjects: 1
        /tsconfig.json
/c.ts *new*
    version: Text-1
    containingProjects: 1
        /tsconfig.json
/lib.d.ts *new*
    version: Text-1
    containingProjects: 1
        /tsconfig.json
/lib.decorators.d.ts *new*
    version: Text-1
    containingProjects: 1
        /tsconfig.json
/lib.decorators.legacy.d.ts *new*
    version: Text-1
    containingProjects: 1
        /tsconfig.json

Info seq  [hh:mm:ss:mss] request:
    {
      "seq": 1,
      "type": "request",
      "arguments": {
        "formatOptions": {
          "indentSize": 4,
          "tabSize": 4,
          "newLineCharacter": "\n",
          "convertTabsToSpaces": true,
          "indentStyle": 2,
          "insertSpaceAfterConstructor": false,
          "insertSpaceAfterCommaDelimiter": true,
          "insertSpaceAfterSemicolonInForStatements": true,
          "insertSpaceBeforeAndAfterBinaryOperators": true,
          "insertSpaceAfterKeywordsInControlFlowStatements": true,
          "insertSpaceAfterFunctionKeywordForAnonymousFunctions": false,
          "insertSpaceAfterOpeningAndBeforeClosingNonemptyParenthesis": false,
          "insertSpaceAfterOpeningAndBeforeClosingNonemptyBrackets": false,
          "insertSpaceAfterOpeningAndBeforeClosingNonemptyBraces": true,
          "insertSpaceAfterOpeningAndBeforeClosingTemplateStringBraces": false,
          "insertSpaceAfterOpeningAndBeforeClosingJsxExpressionBraces": false,
          "insertSpaceBeforeFunctionParenthesis": false,
          "placeOpenBraceOnNewLineForFunctions": false,
          "placeOpenBraceOnNewLineForControlBlocks": false,
          "semicolons": "ignore",
          "trimTrailingWhitespace": true,
          "indentSwitchCase": true
        }
      },
      "command": "configure"
    }
Info seq  [hh:mm:ss:mss] Format host information updated
Info seq  [hh:mm:ss:mss] response:
    {
      "seq": 0,
      "type": "response",
      "command": "configure",
      "request_seq": 1,
      "success": true
    }
Info seq  [hh:mm:ss:mss] request:
    {
      "seq": 2,
      "type": "request",
      "arguments": {
        "file": "/a.ts",
        "pastedText": [
          "const t = figs;",
          "apples : number",
          "             console.log(sauce + tomato); ",
          "//function k(i:string) {\n         const cherry = 3 + juices + cucumber;\n//      }"
        ],
        "pasteLocations": [
          {
            "start": {
              "line": 2,
              "offset": 4
            },
            "end": {
              "line": 2,
              "offset": 16
            }
          },
          {
            "start": {
              "line": 5,
              "offset": 15
            },
            "end": {
              "line": 5,
              "offset": 24
            }
          },
          {
            "start": {
              "line": 12,
              "offset": 1
            },
            "end": {
              "line": 12,
              "offset": 34
            }
          },
          {
            "start": {
              "line": 18,
              "offset": 9
            },
            "end": {
              "line": 20,
              "offset": 10
            }
          }
        ]
      },
      "command": "getPasteEdits"
    }
Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: /tsconfig.json
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: /tsconfig.json projectStateVersion: 2 projectProgramVersion: 1 structureChanged: false structureIsReused:: Completely Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Project '/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (6)
	/lib.d.ts Text-1 lib.d.ts-Text
	/lib.decorators.d.ts Text-1 lib.decorators.d.ts-Text
	/lib.decorators.legacy.d.ts Text-1 lib.decorators.legacy.d.ts-Text
	/a.ts SVC-1-1 "function foo() {\n   const t = figs;\n}\nfunction too() {\n   function k(apples : number) {\n       console.log(t);\n   }\n}\nclass bar {\n    constructor() {\n        function a() {\n             console.log(sauce + tomato); \n        }\n        a();\n    }\n    c() {\n        console.log(\"hello again\");\n        //function k(i:string) {\n         const cherry = 3 + juices + cucumber;\n//      }\n    }\n}"
	/b.ts Text-1 "export const juices = 1;\nexport const sauce = 2;"
	/c.ts Text-1 "export const figs = 3;\nexport const tomato = 4;"

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] response:
    {
      "seq": 0,
      "type": "response",
      "command": "getPasteEdits",
      "request_seq": 2,
      "success": true,
      "performanceData": {
        "updateGraphDurationMs": *
      },
      "body": {
        "edits": [
          {
            "fileName": "/a.ts",
            "textChanges": [
              {
                "start": {
                  "line": 1,
                  "offset": 1
                },
                "end": {
                  "line": 1,
                  "offset": 1
                },
                "newText": "import { sauce, juices } from \"./b\";\nimport { figs, tomato } from \"./c\";\n\n"
              },
              {
                "start": {
                  "line": 2,
                  "offset": 4
                },
                "end": {
                  "line": 2,
                  "offset": 16
                },
                "newText": "const t = figs;"
              },
              {
                "start": {
                  "line": 5,
                  "offset": 15
                },
                "end": {
                  "line": 5,
                  "offset": 24
                },
                "newText": "apples : number"
              },
              {
                "start": {
                  "line": 12,
                  "offset": 1
                },
                "end": {
                  "line": 12,
                  "offset": 34
                },
                "newText": "             console.log(sauce + tomato); "
              },
              {
                "start": {
                  "line": 18,
                  "offset": 9
                },
                "end": {
                  "line": 20,
                  "offset": 10
                },
                "newText": "//function k(i:string) {\n         const cherry = 3 + juices + cucumber;\n//      }"
              }
            ]
          }
        ],
        "fixId": "providePostPasteEdits"
      }
    }
After Request
Projects::
/tsconfig.json (Configured) *changed*
    projectStateVersion: 3 *changed*
    projectProgramVersion: 1
    dirty: true *changed*
    autoImportProviderHost: false

ScriptInfos::
/a.ts (Open) *changed*
    version: SVC-1-2 *changed*
    containingProjects: 1
        /tsconfig.json *default*
/b.ts
    version: Text-1
    containingProjects: 1
        /tsconfig.json
/c.ts
    version: Text-1
    containingProjects: 1
        /tsconfig.json
/lib.d.ts
    version: Text-1
    containingProjects: 1
        /tsconfig.json
/lib.decorators.d.ts
    version: Text-1
    containingProjects: 1
        /tsconfig.json
/lib.decorators.legacy.d.ts
    version: Text-1
    containingProjects: 1
        /tsconfig.json
