currentDirectory:: / useCaseSensitiveFileNames: false
Info seq  [hh:mm:ss:mss] Provided types map file "/typesMap.json" doesn't exist
//// [/a.ts]
export const abc = 10;

//// [/b.ts]
import { abc } from "./a";
console.log(abc);

//// [/c.ts]


//// [/lib.d.ts]
lib.d.ts-Text

//// [/lib.decorators.d.ts]
lib.decorators.d.ts-Text

//// [/lib.decorators.legacy.d.ts]
lib.decorators.legacy.d.ts-Text

//// [/tsconfig.json]
{ "files": ["c.ts", "a.ts", "b.ts"] }


Info seq  [hh:mm:ss:mss] request:
    {
      "seq": 0,
      "type": "request",
      "arguments": {
        "file": "/c.ts"
      },
      "command": "open"
    }
Info seq  [hh:mm:ss:mss] getConfigFileNameForFile:: File: /c.ts ProjectRootPath: undefined:: Result: /tsconfig.json
Info seq  [hh:mm:ss:mss] Creating configuration project /tsconfig.json
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /tsconfig.json 2000 undefined Project: /tsconfig.json WatchType: Config file
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "projectLoadingStart",
      "body": {
        "projectName": "/tsconfig.json",
        "reason": "Creating possible configured project for /c.ts to open"
      }
    }
Info seq  [hh:mm:ss:mss] Config: /tsconfig.json : {
 "rootNames": [
  "/c.ts",
  "/a.ts",
  "/b.ts"
 ],
 "options": {
  "configFilePath": "/tsconfig.json"
 }
}
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /a.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /b.ts 500 undefined WatchType: Closed Script info
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
	/c.ts SVC-1-0 ""
	/a.ts Text-1 "export const abc = 10;"
	/b.ts Text-1 "import { abc } from \"./a\";\nconsole.log(abc);"


	lib.d.ts
	  Default library for target 'es5'
	lib.decorators.d.ts
	  Library referenced via 'decorators' from file 'lib.d.ts'
	lib.decorators.legacy.d.ts
	  Library referenced via 'decorators.legacy' from file 'lib.d.ts'
	c.ts
	  Part of 'files' list in tsconfig.json
	a.ts
	  Part of 'files' list in tsconfig.json
	  Imported via "./a" from file 'b.ts'
	b.ts
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
        "triggerFile": "/c.ts",
        "configFile": "/tsconfig.json",
        "diagnostics": []
      }
    }
Info seq  [hh:mm:ss:mss] Project '/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (6)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: /c.ts ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /tsconfig.json
After Request
watchedFiles::
/a.ts: *new*
  {"pollingInterval":500}
/b.ts: *new*
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

ScriptInfos::
/a.ts *new*
    version: Text-1
    containingProjects: 1
        /tsconfig.json
/b.ts *new*
    version: Text-1
    containingProjects: 1
        /tsconfig.json
/c.ts (Open) *new*
    version: SVC-1-0
    containingProjects: 1
        /tsconfig.json *default*
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
        "file": "/c.ts",
        "pastedText": [
          "console.log(abc);"
        ],
        "pasteLocations": [
          {
            "start": {
              "line": 1,
              "offset": 1
            },
            "end": {
              "line": 1,
              "offset": 1
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
	/c.ts SVC-1-1 "console.log(abc);"
	/a.ts Text-1 "export const abc = 10;"
	/b.ts Text-1 "import { abc } from \"./a\";\nconsole.log(abc);"

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
            "fileName": "/c.ts",
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
                "newText": "import { abc } from \"./a\";\n\n"
              },
              {
                "start": {
                  "line": 1,
                  "offset": 1
                },
                "end": {
                  "line": 1,
                  "offset": 1
                },
                "newText": "console.log(abc);"
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
/a.ts
    version: Text-1
    containingProjects: 1
        /tsconfig.json
/b.ts
    version: Text-1
    containingProjects: 1
        /tsconfig.json
/c.ts (Open) *changed*
    version: SVC-1-2 *changed*
    containingProjects: 1
        /tsconfig.json *default*
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
