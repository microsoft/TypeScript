currentDirectory:: / useCaseSensitiveFileNames: false
Info seq  [hh:mm:ss:mss] Provided types map file "/typesMap.json" doesn't exist
//// [/file1.ts]
import { aa, bb } from "./other";
export const r = 10;
const s = 12;
export const m = 10;
export const t = aa + bb + r + s;
const u = 1;
export const k = r + m;

//// [/lib.d.ts]
lib.d.ts-Text

//// [/lib.decorators.d.ts]
lib.decorators.d.ts-Text

//// [/lib.decorators.legacy.d.ts]
lib.decorators.legacy.d.ts-Text

//// [/other.ts]
export const aa = 1;
export const bb = 2;

//// [/target.ts]
import { r } from "./file1";
const a = r;
const b = 2;
const c = 3;

const d = 4;

//// [/tsconfig.json]
{ "files": ["file1.ts", "target.ts", "other.ts"] }


Info seq  [hh:mm:ss:mss] request:
    {
      "seq": 0,
      "type": "request",
      "arguments": {
        "file": "/target.ts"
      },
      "command": "open"
    }
Info seq  [hh:mm:ss:mss] getConfigFileNameForFile:: File: /target.ts ProjectRootPath: undefined:: Result: /tsconfig.json
Info seq  [hh:mm:ss:mss] Creating configuration project /tsconfig.json
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /tsconfig.json 2000 undefined Project: /tsconfig.json WatchType: Config file
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "projectLoadingStart",
      "body": {
        "projectName": "/tsconfig.json",
        "reason": "Creating possible configured project for /target.ts to open"
      }
    }
Info seq  [hh:mm:ss:mss] Config: /tsconfig.json : {
 "rootNames": [
  "/file1.ts",
  "/target.ts",
  "/other.ts"
 ],
 "options": {
  "configFilePath": "/tsconfig.json"
 }
}
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /file1.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /other.ts 500 undefined WatchType: Closed Script info
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
	/other.ts Text-1 "export const aa = 1;\nexport const bb = 2;"
	/file1.ts Text-1 "import { aa, bb } from \"./other\";\nexport const r = 10;\nconst s = 12;\nexport const m = 10;\nexport const t = aa + bb + r + s;\nconst u = 1;\nexport const k = r + m;"
	/target.ts SVC-1-0 "import { r } from \"./file1\";\nconst a = r;\nconst b = 2;\nconst c = 3;\n\nconst d = 4;"


	lib.d.ts
	  Default library for target 'es5'
	lib.decorators.d.ts
	  Library referenced via 'decorators' from file 'lib.d.ts'
	lib.decorators.legacy.d.ts
	  Library referenced via 'decorators.legacy' from file 'lib.d.ts'
	other.ts
	  Imported via "./other" from file 'file1.ts'
	  Part of 'files' list in tsconfig.json
	file1.ts
	  Part of 'files' list in tsconfig.json
	  Imported via "./file1" from file 'target.ts'
	target.ts
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
        "triggerFile": "/target.ts",
        "configFile": "/tsconfig.json",
        "diagnostics": []
      }
    }
Info seq  [hh:mm:ss:mss] Project '/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (6)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: /target.ts ProjectRootPath: undefined
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
/file1.ts: *new*
  {"pollingInterval":500}
/lib.d.ts: *new*
  {"pollingInterval":500}
/lib.decorators.d.ts: *new*
  {"pollingInterval":500}
/lib.decorators.legacy.d.ts: *new*
  {"pollingInterval":500}
/other.ts: *new*
  {"pollingInterval":500}
/tsconfig.json: *new*
  {"pollingInterval":2000}

Projects::
/tsconfig.json (Configured) *new*
    projectStateVersion: 1
    projectProgramVersion: 1

ScriptInfos::
/file1.ts *new*
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
/other.ts *new*
    version: Text-1
    containingProjects: 1
        /tsconfig.json
/target.ts (Open) *new*
    version: SVC-1-0
    containingProjects: 1
        /tsconfig.json *default*

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
        "file": "/target.ts",
        "pastedText": [
          "export const t = aa + bb + r + s;\nconst u = 1;",
          "export const k = r + m;"
        ],
        "pasteLocations": [
          {
            "start": {
              "line": 3,
              "offset": 1
            },
            "end": {
              "line": 3,
              "offset": 13
            }
          },
          {
            "start": {
              "line": 5,
              "offset": 1
            },
            "end": {
              "line": 5,
              "offset": 1
            }
          }
        ],
        "copiedFrom": {
          "file": "file1.ts",
          "spans": [
            {
              "start": {
                "line": 5,
                "offset": 1
              },
              "end": {
                "line": 6,
                "offset": 13
              }
            },
            {
              "start": {
                "line": 7,
                "offset": 1
              },
              "end": {
                "line": 7,
                "offset": 24
              }
            }
          ]
        }
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
	/other.ts Text-1 "export const aa = 1;\nexport const bb = 2;"
	/file1.ts Text-1 "import { aa, bb } from \"./other\";\nexport const r = 10;\nconst s = 12;\nexport const m = 10;\nexport const t = aa + bb + r + s;\nconst u = 1;\nexport const k = r + m;"
	/target.ts SVC-1-1 "import { r } from \"./file1\";\nconst a = r;\nexport const t = aa + bb + r + s;\nconst u = 1;\nconst c = 3;\nexport const k = r + m;\nconst d = 4;"

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] getExportInfoMap: cache miss or empty; calculating new results
Info seq  [hh:mm:ss:mss] getExportInfoMap: done in * ms
Info seq  [hh:mm:ss:mss] getExportInfoMap: cache hit
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
            "fileName": "/file1.ts",
            "textChanges": [
              {
                "start": {
                  "line": 3,
                  "offset": 1
                },
                "end": {
                  "line": 3,
                  "offset": 1
                },
                "newText": "export "
              }
            ]
          },
          {
            "fileName": "/target.ts",
            "textChanges": [
              {
                "start": {
                  "line": 1,
                  "offset": 10
                },
                "end": {
                  "line": 1,
                  "offset": 10
                },
                "newText": "m, "
              },
              {
                "start": {
                  "line": 1,
                  "offset": 11
                },
                "end": {
                  "line": 1,
                  "offset": 11
                },
                "newText": ", s"
              },
              {
                "start": {
                  "line": 2,
                  "offset": 1
                },
                "end": {
                  "line": 2,
                  "offset": 1
                },
                "newText": "import { aa, bb } from \"./other\";\n"
              },
              {
                "start": {
                  "line": 3,
                  "offset": 1
                },
                "end": {
                  "line": 3,
                  "offset": 13
                },
                "newText": "export const t = aa + bb + r + s;\nconst u = 1;"
              },
              {
                "start": {
                  "line": 5,
                  "offset": 1
                },
                "end": {
                  "line": 5,
                  "offset": 1
                },
                "newText": "export const k = r + m;"
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

ScriptInfos::
/file1.ts
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
/other.ts
    version: Text-1
    containingProjects: 1
        /tsconfig.json
/target.ts (Open) *changed*
    version: SVC-1-2 *changed*
    containingProjects: 1
        /tsconfig.json *default*
