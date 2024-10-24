Info seq  [hh:mm:ss:mss] currentDirectory:: /home/src/Vscode/Projects/bin useCaseSensitiveFileNames:: false
Info seq  [hh:mm:ss:mss] libs Location:: /home/src/tslibs/TS/Lib
Info seq  [hh:mm:ss:mss] globalTypingsCacheLocation:: /home/src/Library/Caches/typescript
Info seq  [hh:mm:ss:mss] Provided types map file "/home/src/tslibs/TS/Lib/typesMap.json" doesn't exist
//// [/home/src/tslibs/TS/Lib/lib.d.ts]
lib.d.ts-Text

//// [/home/src/tslibs/TS/Lib/lib.decorators.d.ts]
lib.decorators.d.ts-Text

//// [/home/src/tslibs/TS/Lib/lib.decorators.legacy.d.ts]
lib.decorators.legacy.d.ts-Text

//// [/home/src/workspaces/project/folder/a.ts]
const abc = 10;
const def = 20;
export interface testInterface {
    abc: number;
    def: number;
}

//// [/home/src/workspaces/project/folder/b.mts]
import test from "./a.js";

function foo(abc: test.testInterface, def: test.testInterface) {
   console.log(abc);
   console.log(def);
}


//// [/home/src/workspaces/project/folder/folder/c.ts]


//// [/home/src/workspaces/project/folder/tsconfig.json]
{ "compilerOptions": { "module": "nodenext" }, "files": ["folder/c.ts", "a.ts", "b.mts"] }


Info seq  [hh:mm:ss:mss] request:
    {
      "seq": 0,
      "type": "request",
      "arguments": {
        "file": "/home/src/workspaces/project/folder/folder/c.ts"
      },
      "command": "open"
    }
Info seq  [hh:mm:ss:mss] getConfigFileNameForFile:: File: /home/src/workspaces/project/folder/folder/c.ts ProjectRootPath: undefined:: Result: /home/src/workspaces/project/folder/tsconfig.json
Info seq  [hh:mm:ss:mss] Creating ConfiguredProject: /home/src/workspaces/project/folder/tsconfig.json, currentDirectory: /home/src/workspaces/project/folder
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/workspaces/project/folder/tsconfig.json 2000 undefined Project: /home/src/workspaces/project/folder/tsconfig.json WatchType: Config file
Info seq  [hh:mm:ss:mss] Config: /home/src/workspaces/project/folder/tsconfig.json : {
 "rootNames": [
  "/home/src/workspaces/project/folder/folder/c.ts",
  "/home/src/workspaces/project/folder/a.ts",
  "/home/src/workspaces/project/folder/b.mts"
 ],
 "options": {
  "module": 199,
  "configFilePath": "/home/src/workspaces/project/folder/tsconfig.json"
 }
}
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "projectLoadingStart",
      "body": {
        "projectName": "/home/src/workspaces/project/folder/tsconfig.json",
        "reason": "Creating possible configured project for /home/src/workspaces/project/folder/folder/c.ts to open"
      }
    }
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/workspaces/project/folder/a.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/workspaces/project/folder/b.mts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: /home/src/workspaces/project/folder/tsconfig.json
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/workspaces/project/folder/folder/package.json 2000 undefined Project: /home/src/workspaces/project/folder/tsconfig.json WatchType: File location affecting resolution
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/workspaces/project/folder/package.json 2000 undefined Project: /home/src/workspaces/project/folder/tsconfig.json WatchType: File location affecting resolution
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/workspaces/project/package.json 2000 undefined Project: /home/src/workspaces/project/folder/tsconfig.json WatchType: File location affecting resolution
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/workspaces/package.json 2000 undefined Project: /home/src/workspaces/project/folder/tsconfig.json WatchType: File location affecting resolution
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/tslibs/TS/Lib/lib.esnext.full.d.ts 500 undefined Project: /home/src/workspaces/project/folder/tsconfig.json WatchType: Missing file
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /home/src/workspaces/project/folder/node_modules/@types 1 undefined Project: /home/src/workspaces/project/folder/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /home/src/workspaces/project/folder/node_modules/@types 1 undefined Project: /home/src/workspaces/project/folder/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /home/src/workspaces/project/node_modules/@types 1 undefined Project: /home/src/workspaces/project/folder/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /home/src/workspaces/project/node_modules/@types 1 undefined Project: /home/src/workspaces/project/folder/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /home/src/workspaces/node_modules/@types 1 undefined Project: /home/src/workspaces/project/folder/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /home/src/workspaces/node_modules/@types 1 undefined Project: /home/src/workspaces/project/folder/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: /home/src/workspaces/project/folder/tsconfig.json projectStateVersion: 1 projectProgramVersion: 0 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Project '/home/src/workspaces/project/folder/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (3)
	/home/src/workspaces/project/folder/folder/c.ts SVC-1-0 ""
	/home/src/workspaces/project/folder/a.ts Text-1 "const abc = 10;\nconst def = 20;\nexport interface testInterface {\n    abc: number;\n    def: number;\n}"
	/home/src/workspaces/project/folder/b.mts Text-1 "import test from \"./a.js\";\n\nfunction foo(abc: test.testInterface, def: test.testInterface) {\n   console.log(abc);\n   console.log(def);\n}\n"


	folder/c.ts
	  Part of 'files' list in tsconfig.json
	  File is CommonJS module because 'package.json' was not found
	a.ts
	  Part of 'files' list in tsconfig.json
	  Imported via "./a.js" from file 'b.mts'
	  File is CommonJS module because 'package.json' was not found
	b.mts
	  Part of 'files' list in tsconfig.json

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "projectLoadingFinish",
      "body": {
        "projectName": "/home/src/workspaces/project/folder/tsconfig.json"
      }
    }
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "configFileDiag",
      "body": {
        "triggerFile": "/home/src/workspaces/project/folder/folder/c.ts",
        "configFile": "/home/src/workspaces/project/folder/tsconfig.json",
        "diagnostics": [
          {
            "text": "File '/home/src/tslibs/TS/Lib/lib.esnext.full.d.ts' not found.\n  The file is in the program because:\n    Default library for target 'esnext'",
            "code": 6053,
            "category": "error"
          },
          {
            "text": "Cannot find global type 'Array'.",
            "code": 2318,
            "category": "error"
          },
          {
            "text": "Cannot find global type 'Boolean'.",
            "code": 2318,
            "category": "error"
          },
          {
            "text": "Cannot find global type 'Function'.",
            "code": 2318,
            "category": "error"
          },
          {
            "text": "Cannot find global type 'IArguments'.",
            "code": 2318,
            "category": "error"
          },
          {
            "text": "Cannot find global type 'Number'.",
            "code": 2318,
            "category": "error"
          },
          {
            "text": "Cannot find global type 'Object'.",
            "code": 2318,
            "category": "error"
          },
          {
            "text": "Cannot find global type 'RegExp'.",
            "code": 2318,
            "category": "error"
          },
          {
            "text": "Cannot find global type 'String'.",
            "code": 2318,
            "category": "error"
          }
        ]
      }
    }
Info seq  [hh:mm:ss:mss] Project '/home/src/workspaces/project/folder/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (3)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: /home/src/workspaces/project/folder/folder/c.ts ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /home/src/workspaces/project/folder/tsconfig.json
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
/home/src/tslibs/TS/Lib/lib.esnext.full.d.ts: *new*
  {"pollingInterval":500}
/home/src/workspaces/package.json: *new*
  {"pollingInterval":2000}
/home/src/workspaces/project/folder/a.ts: *new*
  {"pollingInterval":500}
/home/src/workspaces/project/folder/b.mts: *new*
  {"pollingInterval":500}
/home/src/workspaces/project/folder/folder/package.json: *new*
  {"pollingInterval":2000}
/home/src/workspaces/project/folder/package.json: *new*
  {"pollingInterval":2000}
/home/src/workspaces/project/folder/tsconfig.json: *new*
  {"pollingInterval":2000}
/home/src/workspaces/project/package.json: *new*
  {"pollingInterval":2000}

watchedDirectoriesRecursive::
/home/src/workspaces/node_modules/@types: *new*
  {}
/home/src/workspaces/project/folder/node_modules/@types: *new*
  {}
/home/src/workspaces/project/node_modules/@types: *new*
  {}

Projects::
/home/src/workspaces/project/folder/tsconfig.json (Configured) *new*
    projectStateVersion: 1
    projectProgramVersion: 1
    autoImportProviderHost: false

ScriptInfos::
/home/src/workspaces/project/folder/a.ts *new*
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/folder/tsconfig.json
/home/src/workspaces/project/folder/b.mts *new*
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/folder/tsconfig.json
/home/src/workspaces/project/folder/folder/c.ts (Open) *new*
    version: SVC-1-0
    containingProjects: 1
        /home/src/workspaces/project/folder/tsconfig.json *default*

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
        "file": "/home/src/workspaces/project/folder/folder/c.ts",
        "pastedText": [
          "function foo(abc: test.abc, def: test.def) {\nconsole.log(abc);\nconsole.log(def);\n}"
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
        ],
        "copiedFrom": {
          "file": "/home/src/workspaces/project/folder/b.mts",
          "spans": [
            {
              "start": {
                "line": 3,
                "offset": 1
              },
              "end": {
                "line": 6,
                "offset": 2
              }
            }
          ]
        }
      },
      "command": "getPasteEdits"
    }
Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: /home/src/workspaces/project/folder/tsconfig.json
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: /home/src/workspaces/project/folder/tsconfig.json projectStateVersion: 2 projectProgramVersion: 1 structureChanged: false structureIsReused:: Completely Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Project '/home/src/workspaces/project/folder/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (3)
	/home/src/workspaces/project/folder/folder/c.ts SVC-1-1 "function foo(abc: test.abc, def: test.def) {\nconsole.log(abc);\nconsole.log(def);\n}"
	/home/src/workspaces/project/folder/a.ts Text-1 "const abc = 10;\nconst def = 20;\nexport interface testInterface {\n    abc: number;\n    def: number;\n}"
	/home/src/workspaces/project/folder/b.mts Text-1 "import test from \"./a.js\";\n\nfunction foo(abc: test.testInterface, def: test.testInterface) {\n   console.log(abc);\n   console.log(def);\n}\n"

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
            "fileName": "/home/src/workspaces/project/folder/folder/c.ts",
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
                "newText": "import test from \"../a\";\n\n"
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
                "newText": "function foo(abc: test.abc, def: test.def) {\nconsole.log(abc);\nconsole.log(def);\n}"
              }
            ]
          }
        ],
        "fixId": "providePostPasteEdits"
      }
    }
After Request
Projects::
/home/src/workspaces/project/folder/tsconfig.json (Configured) *changed*
    projectStateVersion: 3 *changed*
    projectProgramVersion: 1
    dirty: true *changed*
    autoImportProviderHost: false

ScriptInfos::
/home/src/workspaces/project/folder/a.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/folder/tsconfig.json
/home/src/workspaces/project/folder/b.mts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/folder/tsconfig.json
/home/src/workspaces/project/folder/folder/c.ts (Open) *changed*
    version: SVC-1-2 *changed*
    containingProjects: 1
        /home/src/workspaces/project/folder/tsconfig.json *default*
