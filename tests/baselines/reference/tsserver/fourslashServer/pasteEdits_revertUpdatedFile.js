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

//// [/home/src/workspaces/project/other.ts]
export const t = 1;

//// [/home/src/workspaces/project/other2.ts]
export const t2 = 1;

//// [/home/src/workspaces/project/target.ts]
import { t } from "./other";
const a = t + 1;
const b = 10;
type T = number;
var x;
var y = x as 

//// [/home/src/workspaces/project/tsconfig.json]
{ "files": ["target.ts", "other.ts", "other2.ts"] }


Info seq  [hh:mm:ss:mss] request:
    {
      "seq": 0,
      "type": "request",
      "arguments": {
        "file": "/home/src/workspaces/project/target.ts"
      },
      "command": "open"
    }
Info seq  [hh:mm:ss:mss] getConfigFileNameForFile:: File: /home/src/workspaces/project/target.ts ProjectRootPath: undefined:: Result: /home/src/workspaces/project/tsconfig.json
Info seq  [hh:mm:ss:mss] Creating ConfiguredProject: /home/src/workspaces/project/tsconfig.json, currentDirectory: /home/src/workspaces/project
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/workspaces/project/tsconfig.json 2000 undefined Project: /home/src/workspaces/project/tsconfig.json WatchType: Config file
Info seq  [hh:mm:ss:mss] Config: /home/src/workspaces/project/tsconfig.json : {
 "rootNames": [
  "/home/src/workspaces/project/target.ts",
  "/home/src/workspaces/project/other.ts",
  "/home/src/workspaces/project/other2.ts"
 ],
 "options": {
  "configFilePath": "/home/src/workspaces/project/tsconfig.json"
 }
}
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "projectLoadingStart",
      "body": {
        "projectName": "/home/src/workspaces/project/tsconfig.json",
        "reason": "Creating possible configured project for /home/src/workspaces/project/target.ts to open"
      }
    }
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/workspaces/project/other.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/workspaces/project/other2.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: /home/src/workspaces/project/tsconfig.json
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/tslibs/TS/Lib/lib.d.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /home/src/workspaces/project/node_modules 1 undefined Project: /home/src/workspaces/project/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /home/src/workspaces/project/node_modules 1 undefined Project: /home/src/workspaces/project/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /home/src/workspaces/node_modules 1 undefined Project: /home/src/workspaces/project/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /home/src/workspaces/node_modules 1 undefined Project: /home/src/workspaces/project/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/tslibs/TS/Lib/lib.decorators.d.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/tslibs/TS/Lib/lib.decorators.legacy.d.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /home/src/workspaces/project/node_modules/@types 1 undefined Project: /home/src/workspaces/project/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /home/src/workspaces/project/node_modules/@types 1 undefined Project: /home/src/workspaces/project/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /home/src/workspaces/node_modules/@types 1 undefined Project: /home/src/workspaces/project/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /home/src/workspaces/node_modules/@types 1 undefined Project: /home/src/workspaces/project/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: /home/src/workspaces/project/tsconfig.json projectStateVersion: 1 projectProgramVersion: 0 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Project '/home/src/workspaces/project/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (6)
	/home/src/tslibs/TS/Lib/lib.d.ts Text-1 lib.d.ts-Text
	/home/src/tslibs/TS/Lib/lib.decorators.d.ts Text-1 lib.decorators.d.ts-Text
	/home/src/tslibs/TS/Lib/lib.decorators.legacy.d.ts Text-1 lib.decorators.legacy.d.ts-Text
	/home/src/workspaces/project/other.ts Text-1 "export const t = 1;"
	/home/src/workspaces/project/target.ts SVC-1-0 "import { t } from \"./other\";\nconst a = t + 1;\nconst b = 10;\ntype T = number;\nvar x;\nvar y = x as "
	/home/src/workspaces/project/other2.ts Text-1 "export const t2 = 1;"


	../../tslibs/TS/Lib/lib.d.ts
	  Default library for target 'es5'
	../../tslibs/TS/Lib/lib.decorators.d.ts
	  Library referenced via 'decorators' from file '../../tslibs/TS/Lib/lib.d.ts'
	../../tslibs/TS/Lib/lib.decorators.legacy.d.ts
	  Library referenced via 'decorators.legacy' from file '../../tslibs/TS/Lib/lib.d.ts'
	other.ts
	  Imported via "./other" from file 'target.ts'
	  Part of 'files' list in tsconfig.json
	target.ts
	  Part of 'files' list in tsconfig.json
	other2.ts
	  Part of 'files' list in tsconfig.json

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "projectLoadingFinish",
      "body": {
        "projectName": "/home/src/workspaces/project/tsconfig.json"
      }
    }
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "configFileDiag",
      "body": {
        "triggerFile": "/home/src/workspaces/project/target.ts",
        "configFile": "/home/src/workspaces/project/tsconfig.json",
        "diagnostics": []
      }
    }
Info seq  [hh:mm:ss:mss] Project '/home/src/workspaces/project/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (6)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: /home/src/workspaces/project/target.ts ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /home/src/workspaces/project/tsconfig.json
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
/home/src/tslibs/TS/Lib/lib.d.ts: *new*
  {"pollingInterval":500}
/home/src/tslibs/TS/Lib/lib.decorators.d.ts: *new*
  {"pollingInterval":500}
/home/src/tslibs/TS/Lib/lib.decorators.legacy.d.ts: *new*
  {"pollingInterval":500}
/home/src/workspaces/project/other.ts: *new*
  {"pollingInterval":500}
/home/src/workspaces/project/other2.ts: *new*
  {"pollingInterval":500}
/home/src/workspaces/project/tsconfig.json: *new*
  {"pollingInterval":2000}

watchedDirectoriesRecursive::
/home/src/workspaces/node_modules: *new*
  {}
/home/src/workspaces/node_modules/@types: *new*
  {}
/home/src/workspaces/project/node_modules: *new*
  {}
/home/src/workspaces/project/node_modules/@types: *new*
  {}

Projects::
/home/src/workspaces/project/tsconfig.json (Configured) *new*
    projectStateVersion: 1
    projectProgramVersion: 1
    autoImportProviderHost: false

ScriptInfos::
/home/src/tslibs/TS/Lib/lib.d.ts *new*
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/tslibs/TS/Lib/lib.decorators.d.ts *new*
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/tslibs/TS/Lib/lib.decorators.legacy.d.ts *new*
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/other.ts *new*
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/other2.ts *new*
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/target.ts (Open) *new*
    version: SVC-1-0
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json *default*

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
        "file": "/home/src/workspaces/project/target.ts",
        "pastedText": [
          "const m = t2 + 1;"
        ],
        "pasteLocations": [
          {
            "start": {
              "line": 3,
              "offset": 1
            },
            "end": {
              "line": 3,
              "offset": 14
            }
          }
        ]
      },
      "command": "getPasteEdits"
    }
Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: /home/src/workspaces/project/tsconfig.json
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: /home/src/workspaces/project/tsconfig.json projectStateVersion: 2 projectProgramVersion: 1 structureChanged: false structureIsReused:: Completely Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Project '/home/src/workspaces/project/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (6)
	/home/src/tslibs/TS/Lib/lib.d.ts Text-1 lib.d.ts-Text
	/home/src/tslibs/TS/Lib/lib.decorators.d.ts Text-1 lib.decorators.d.ts-Text
	/home/src/tslibs/TS/Lib/lib.decorators.legacy.d.ts Text-1 lib.decorators.legacy.d.ts-Text
	/home/src/workspaces/project/other.ts Text-1 "export const t = 1;"
	/home/src/workspaces/project/target.ts SVC-1-1 "import { t } from \"./other\";\nconst a = t + 1;\nconst m = t2 + 1;\ntype T = number;\nvar x;\nvar y = x as "
	/home/src/workspaces/project/other2.ts Text-1 "export const t2 = 1;"

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
            "fileName": "/home/src/workspaces/project/target.ts",
            "textChanges": [
              {
                "start": {
                  "line": 2,
                  "offset": 1
                },
                "end": {
                  "line": 2,
                  "offset": 1
                },
                "newText": "import { t2 } from \"./other2\";\n"
              },
              {
                "start": {
                  "line": 3,
                  "offset": 1
                },
                "end": {
                  "line": 3,
                  "offset": 14
                },
                "newText": "const m = t2 + 1;"
              }
            ]
          }
        ],
        "fixId": "providePostPasteEdits"
      }
    }
After Request
Projects::
/home/src/workspaces/project/tsconfig.json (Configured) *changed*
    projectStateVersion: 3 *changed*
    projectProgramVersion: 1
    dirty: true *changed*
    autoImportProviderHost: false

ScriptInfos::
/home/src/tslibs/TS/Lib/lib.d.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/tslibs/TS/Lib/lib.decorators.d.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/tslibs/TS/Lib/lib.decorators.legacy.d.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/other.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/other2.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json
/home/src/workspaces/project/target.ts (Open) *changed*
    version: SVC-1-2 *changed*
    containingProjects: 1
        /home/src/workspaces/project/tsconfig.json *default*

Info seq  [hh:mm:ss:mss] request:
    {
      "seq": 3,
      "type": "request",
      "arguments": {
        "preferences": {}
      },
      "command": "configure"
    }
Info seq  [hh:mm:ss:mss] response:
    {
      "seq": 0,
      "type": "response",
      "command": "configure",
      "request_seq": 3,
      "success": true
    }
Info seq  [hh:mm:ss:mss] request:
    {
      "seq": 4,
      "type": "request",
      "arguments": {
        "file": "/home/src/workspaces/project/target.ts",
        "line": 6,
        "offset": 14
      },
      "command": "completionInfo"
    }
Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: /home/src/workspaces/project/tsconfig.json
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: /home/src/workspaces/project/tsconfig.json projectStateVersion: 3 projectProgramVersion: 1 structureChanged: false structureIsReused:: Completely Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Project '/home/src/workspaces/project/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (6)
	/home/src/tslibs/TS/Lib/lib.d.ts Text-1 lib.d.ts-Text
	/home/src/tslibs/TS/Lib/lib.decorators.d.ts Text-1 lib.decorators.d.ts-Text
	/home/src/tslibs/TS/Lib/lib.decorators.legacy.d.ts Text-1 lib.decorators.legacy.d.ts-Text
	/home/src/workspaces/project/other.ts Text-1 "export const t = 1;"
	/home/src/workspaces/project/target.ts SVC-1-2 "import { t } from \"./other\";\nconst a = t + 1;\nconst b = 10;\ntype T = number;\nvar x;\nvar y = x as "
	/home/src/workspaces/project/other2.ts Text-1 "export const t2 = 1;"

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] getCompletionData: Get current token: *
Info seq  [hh:mm:ss:mss] getCompletionData: Is inside comment: *
Info seq  [hh:mm:ss:mss] getCompletionData: Get previous token: *
Info seq  [hh:mm:ss:mss] getCompletionsAtPosition: isCompletionListBlocker: *
Info seq  [hh:mm:ss:mss] getCompletionData: Semantic work: *
Info seq  [hh:mm:ss:mss] getCompletionsAtPosition: getCompletionEntriesFromSymbols: *
Info seq  [hh:mm:ss:mss] response:
    {
      "seq": 0,
      "type": "response",
      "command": "completionInfo",
      "request_seq": 4,
      "success": true,
      "performanceData": {
        "updateGraphDurationMs": *
      },
      "body": {
        "flags": 0,
        "isGlobalCompletion": true,
        "isMemberCompletion": false,
        "isNewIdentifierLocation": false,
        "entries": [
          {
            "name": "T",
            "kind": "type",
            "kindModifiers": "",
            "sortText": "11"
          },
          {
            "name": "any",
            "kind": "keyword",
            "kindModifiers": "",
            "sortText": "15"
          },
          {
            "name": "Array",
            "kind": "var",
            "kindModifiers": "declare",
            "sortText": "15"
          },
          {
            "name": "ArrayBuffer",
            "kind": "var",
            "kindModifiers": "declare",
            "sortText": "15"
          },
          {
            "name": "ArrayBufferConstructor",
            "kind": "interface",
            "kindModifiers": "declare",
            "sortText": "15"
          },
          {
            "name": "ArrayBufferLike",
            "kind": "type",
            "kindModifiers": "declare",
            "sortText": "15"
          },
          {
            "name": "ArrayBufferTypes",
            "kind": "interface",
            "kindModifiers": "declare",
            "sortText": "15"
          },
          {
            "name": "ArrayBufferView",
            "kind": "interface",
            "kindModifiers": "declare",
            "sortText": "15"
          },
          {
            "name": "ArrayConstructor",
            "kind": "interface",
            "kindModifiers": "declare",
            "sortText": "15"
          },
          {
            "name": "ArrayLike",
            "kind": "interface",
            "kindModifiers": "declare",
            "sortText": "15"
          },
          {
            "name": "asserts",
            "kind": "keyword",
            "kindModifiers": "",
            "sortText": "15"
          },
          {
            "name": "Awaited",
            "kind": "type",
            "kindModifiers": "declare",
            "sortText": "15"
          },
          {
            "name": "bigint",
            "kind": "keyword",
            "kindModifiers": "",
            "sortText": "15"
          },
          {
            "name": "boolean",
            "kind": "keyword",
            "kindModifiers": "",
            "sortText": "15"
          },
          {
            "name": "Boolean",
            "kind": "var",
            "kindModifiers": "declare",
            "sortText": "15"
          },
          {
            "name": "BooleanConstructor",
            "kind": "interface",
            "kindModifiers": "declare",
            "sortText": "15"
          },
          {
            "name": "CallableFunction",
            "kind": "interface",
            "kindModifiers": "declare",
            "sortText": "15"
          },
          {
            "name": "Capitalize",
            "kind": "type",
            "kindModifiers": "declare",
            "sortText": "15"
          },
          {
            "name": "ClassAccessorDecoratorContext",
            "kind": "interface",
            "kindModifiers": "declare",
            "sortText": "15"
          },
          {
            "name": "ClassAccessorDecoratorResult",
            "kind": "interface",
            "kindModifiers": "declare",
            "sortText": "15"
          },
          {
            "name": "ClassAccessorDecoratorTarget",
            "kind": "interface",
            "kindModifiers": "declare",
            "sortText": "15"
          },
          {
            "name": "ClassDecorator",
            "kind": "type",
            "kindModifiers": "declare",
            "sortText": "15"
          },
          {
            "name": "ClassDecoratorContext",
            "kind": "interface",
            "kindModifiers": "declare",
            "sortText": "15"
          },
          {
            "name": "ClassFieldDecoratorContext",
            "kind": "interface",
            "kindModifiers": "declare",
            "sortText": "15"
          },
          {
            "name": "ClassGetterDecoratorContext",
            "kind": "interface",
            "kindModifiers": "declare",
            "sortText": "15"
          },
          {
            "name": "ClassMemberDecoratorContext",
            "kind": "type",
            "kindModifiers": "declare",
            "sortText": "15"
          },
          {
            "name": "ClassMethodDecoratorContext",
            "kind": "interface",
            "kindModifiers": "declare",
            "sortText": "15"
          },
          {
            "name": "ClassSetterDecoratorContext",
            "kind": "interface",
            "kindModifiers": "declare",
            "sortText": "15"
          },
          {
            "name": "ConcatArray",
            "kind": "interface",
            "kindModifiers": "declare",
            "sortText": "15"
          },
          {
            "name": "const",
            "kind": "keyword",
            "kindModifiers": "",
            "sortText": "15"
          },
          {
            "name": "ConstructorParameters",
            "kind": "type",
            "kindModifiers": "declare",
            "sortText": "15"
          },
          {
            "name": "DataView",
            "kind": "var",
            "kindModifiers": "declare",
            "sortText": "15"
          },
          {
            "name": "DataViewConstructor",
            "kind": "interface",
            "kindModifiers": "declare",
            "sortText": "15"
          },
          {
            "name": "Date",
            "kind": "var",
            "kindModifiers": "declare",
            "sortText": "15"
          },
          {
            "name": "DateConstructor",
            "kind": "interface",
            "kindModifiers": "declare",
            "sortText": "15"
          },
          {
            "name": "DecoratorContext",
            "kind": "type",
            "kindModifiers": "declare",
            "sortText": "15"
          },
          {
            "name": "DecoratorMetadata",
            "kind": "type",
            "kindModifiers": "declare",
            "sortText": "15"
          },
          {
            "name": "DecoratorMetadataObject",
            "kind": "type",
            "kindModifiers": "declare",
            "sortText": "15"
          },
          {
            "name": "Error",
            "kind": "var",
            "kindModifiers": "declare",
            "sortText": "15"
          },
          {
            "name": "ErrorConstructor",
            "kind": "interface",
            "kindModifiers": "declare",
            "sortText": "15"
          },
          {
            "name": "EvalError",
            "kind": "var",
            "kindModifiers": "declare",
            "sortText": "15"
          },
          {
            "name": "EvalErrorConstructor",
            "kind": "interface",
            "kindModifiers": "declare",
            "sortText": "15"
          },
          {
            "name": "Exclude",
            "kind": "type",
            "kindModifiers": "declare",
            "sortText": "15"
          },
          {
            "name": "Extract",
            "kind": "type",
            "kindModifiers": "declare",
            "sortText": "15"
          },
          {
            "name": "false",
            "kind": "keyword",
            "kindModifiers": "",
            "sortText": "15"
          },
          {
            "name": "Float32Array",
            "kind": "var",
            "kindModifiers": "declare",
            "sortText": "15"
          },
          {
            "name": "Float32ArrayConstructor",
            "kind": "interface",
            "kindModifiers": "declare",
            "sortText": "15"
          },
          {
            "name": "Float64Array",
            "kind": "var",
            "kindModifiers": "declare",
            "sortText": "15"
          },
          {
            "name": "Float64ArrayConstructor",
            "kind": "interface",
            "kindModifiers": "declare",
            "sortText": "15"
          },
          {
            "name": "Function",
            "kind": "var",
            "kindModifiers": "declare",
            "sortText": "15"
          },
          {
            "name": "FunctionConstructor",
            "kind": "interface",
            "kindModifiers": "declare",
            "sortText": "15"
          },
          {
            "name": "globalThis",
            "kind": "module",
            "kindModifiers": "",
            "sortText": "15"
          },
          {
            "name": "IArguments",
            "kind": "interface",
            "kindModifiers": "declare",
            "sortText": "15"
          },
          {
            "name": "ImportAttributes",
            "kind": "interface",
            "kindModifiers": "declare",
            "sortText": "15"
          },
          {
            "name": "ImportCallOptions",
            "kind": "interface",
            "kindModifiers": "declare",
            "sortText": "15"
          },
          {
            "name": "ImportMeta",
            "kind": "interface",
            "kindModifiers": "declare",
            "sortText": "15"
          },
          {
            "name": "infer",
            "kind": "keyword",
            "kindModifiers": "",
            "sortText": "15"
          },
          {
            "name": "InstanceType",
            "kind": "type",
            "kindModifiers": "declare",
            "sortText": "15"
          },
          {
            "name": "Int8Array",
            "kind": "var",
            "kindModifiers": "declare",
            "sortText": "15"
          },
          {
            "name": "Int8ArrayConstructor",
            "kind": "interface",
            "kindModifiers": "declare",
            "sortText": "15"
          },
          {
            "name": "Int16Array",
            "kind": "var",
            "kindModifiers": "declare",
            "sortText": "15"
          },
          {
            "name": "Int16ArrayConstructor",
            "kind": "interface",
            "kindModifiers": "declare",
            "sortText": "15"
          },
          {
            "name": "Int32Array",
            "kind": "var",
            "kindModifiers": "declare",
            "sortText": "15"
          },
          {
            "name": "Int32ArrayConstructor",
            "kind": "interface",
            "kindModifiers": "declare",
            "sortText": "15"
          },
          {
            "name": "Intl",
            "kind": "module",
            "kindModifiers": "declare",
            "sortText": "15"
          },
          {
            "name": "JSON",
            "kind": "var",
            "kindModifiers": "declare",
            "sortText": "15"
          },
          {
            "name": "keyof",
            "kind": "keyword",
            "kindModifiers": "",
            "sortText": "15"
          },
          {
            "name": "Lowercase",
            "kind": "type",
            "kindModifiers": "declare",
            "sortText": "15"
          },
          {
            "name": "Math",
            "kind": "var",
            "kindModifiers": "declare",
            "sortText": "15"
          },
          {
            "name": "MethodDecorator",
            "kind": "type",
            "kindModifiers": "declare",
            "sortText": "15"
          },
          {
            "name": "never",
            "kind": "keyword",
            "kindModifiers": "",
            "sortText": "15"
          },
          {
            "name": "NewableFunction",
            "kind": "interface",
            "kindModifiers": "declare",
            "sortText": "15"
          },
          {
            "name": "NoInfer",
            "kind": "type",
            "kindModifiers": "declare",
            "sortText": "15"
          },
          {
            "name": "NonNullable",
            "kind": "type",
            "kindModifiers": "declare",
            "sortText": "15"
          },
          {
            "name": "null",
            "kind": "keyword",
            "kindModifiers": "",
            "sortText": "15"
          },
          {
            "name": "number",
            "kind": "keyword",
            "kindModifiers": "",
            "sortText": "15"
          },
          {
            "name": "Number",
            "kind": "var",
            "kindModifiers": "declare",
            "sortText": "15"
          },
          {
            "name": "NumberConstructor",
            "kind": "interface",
            "kindModifiers": "declare",
            "sortText": "15"
          },
          {
            "name": "object",
            "kind": "keyword",
            "kindModifiers": "",
            "sortText": "15"
          },
          {
            "name": "Object",
            "kind": "var",
            "kindModifiers": "declare",
            "sortText": "15"
          },
          {
            "name": "ObjectConstructor",
            "kind": "interface",
            "kindModifiers": "declare",
            "sortText": "15"
          },
          {
            "name": "Omit",
            "kind": "type",
            "kindModifiers": "declare",
            "sortText": "15"
          },
          {
            "name": "OmitThisParameter",
            "kind": "type",
            "kindModifiers": "declare",
            "sortText": "15"
          },
          {
            "name": "ParameterDecorator",
            "kind": "type",
            "kindModifiers": "declare",
            "sortText": "15"
          },
          {
            "name": "Parameters",
            "kind": "type",
            "kindModifiers": "declare",
            "sortText": "15"
          },
          {
            "name": "Partial",
            "kind": "type",
            "kindModifiers": "declare",
            "sortText": "15"
          },
          {
            "name": "Pick",
            "kind": "type",
            "kindModifiers": "declare",
            "sortText": "15"
          },
          {
            "name": "Promise",
            "kind": "interface",
            "kindModifiers": "declare",
            "sortText": "15"
          },
          {
            "name": "PromiseConstructorLike",
            "kind": "type",
            "kindModifiers": "declare",
            "sortText": "15"
          },
          {
            "name": "PromiseLike",
            "kind": "interface",
            "kindModifiers": "declare",
            "sortText": "15"
          },
          {
            "name": "PropertyDecorator",
            "kind": "type",
            "kindModifiers": "declare",
            "sortText": "15"
          },
          {
            "name": "PropertyDescriptor",
            "kind": "interface",
            "kindModifiers": "declare",
            "sortText": "15"
          },
          {
            "name": "PropertyDescriptorMap",
            "kind": "interface",
            "kindModifiers": "declare",
            "sortText": "15"
          },
          {
            "name": "PropertyKey",
            "kind": "type",
            "kindModifiers": "declare",
            "sortText": "15"
          },
          {
            "name": "RangeError",
            "kind": "var",
            "kindModifiers": "declare",
            "sortText": "15"
          },
          {
            "name": "RangeErrorConstructor",
            "kind": "interface",
            "kindModifiers": "declare",
            "sortText": "15"
          },
          {
            "name": "readonly",
            "kind": "keyword",
            "kindModifiers": "",
            "sortText": "15"
          },
          {
            "name": "Readonly",
            "kind": "type",
            "kindModifiers": "declare",
            "sortText": "15"
          },
          {
            "name": "ReadonlyArray",
            "kind": "interface",
            "kindModifiers": "declare",
            "sortText": "15"
          },
          {
            "name": "Record",
            "kind": "type",
            "kindModifiers": "declare",
            "sortText": "15"
          },
          {
            "name": "ReferenceError",
            "kind": "var",
            "kindModifiers": "declare",
            "sortText": "15"
          },
          {
            "name": "ReferenceErrorConstructor",
            "kind": "interface",
            "kindModifiers": "declare",
            "sortText": "15"
          },
          {
            "name": "RegExp",
            "kind": "var",
            "kindModifiers": "declare",
            "sortText": "15"
          },
          {
            "name": "RegExpConstructor",
            "kind": "interface",
            "kindModifiers": "declare",
            "sortText": "15"
          },
          {
            "name": "RegExpExecArray",
            "kind": "interface",
            "kindModifiers": "declare",
            "sortText": "15"
          },
          {
            "name": "RegExpMatchArray",
            "kind": "interface",
            "kindModifiers": "declare",
            "sortText": "15"
          },
          {
            "name": "Required",
            "kind": "type",
            "kindModifiers": "declare",
            "sortText": "15"
          },
          {
            "name": "ReturnType",
            "kind": "type",
            "kindModifiers": "declare",
            "sortText": "15"
          },
          {
            "name": "string",
            "kind": "keyword",
            "kindModifiers": "",
            "sortText": "15"
          },
          {
            "name": "String",
            "kind": "var",
            "kindModifiers": "declare",
            "sortText": "15"
          },
          {
            "name": "StringConstructor",
            "kind": "interface",
            "kindModifiers": "declare",
            "sortText": "15"
          },
          {
            "name": "symbol",
            "kind": "keyword",
            "kindModifiers": "",
            "sortText": "15"
          },
          {
            "name": "Symbol",
            "kind": "interface",
            "kindModifiers": "declare",
            "sortText": "15"
          },
          {
            "name": "SyntaxError",
            "kind": "var",
            "kindModifiers": "declare",
            "sortText": "15"
          },
          {
            "name": "SyntaxErrorConstructor",
            "kind": "interface",
            "kindModifiers": "declare",
            "sortText": "15"
          },
          {
            "name": "TemplateStringsArray",
            "kind": "interface",
            "kindModifiers": "declare",
            "sortText": "15"
          },
          {
            "name": "ThisParameterType",
            "kind": "type",
            "kindModifiers": "declare",
            "sortText": "15"
          },
          {
            "name": "ThisType",
            "kind": "interface",
            "kindModifiers": "declare",
            "sortText": "15"
          },
          {
            "name": "true",
            "kind": "keyword",
            "kindModifiers": "",
            "sortText": "15"
          },
          {
            "name": "TypedPropertyDescriptor",
            "kind": "interface",
            "kindModifiers": "declare",
            "sortText": "15"
          },
          {
            "name": "TypeError",
            "kind": "var",
            "kindModifiers": "declare",
            "sortText": "15"
          },
          {
            "name": "TypeErrorConstructor",
            "kind": "interface",
            "kindModifiers": "declare",
            "sortText": "15"
          },
          {
            "name": "typeof",
            "kind": "keyword",
            "kindModifiers": "",
            "sortText": "15"
          },
          {
            "name": "Uint8Array",
            "kind": "var",
            "kindModifiers": "declare",
            "sortText": "15"
          },
          {
            "name": "Uint8ArrayConstructor",
            "kind": "interface",
            "kindModifiers": "declare",
            "sortText": "15"
          },
          {
            "name": "Uint8ClampedArray",
            "kind": "var",
            "kindModifiers": "declare",
            "sortText": "15"
          },
          {
            "name": "Uint8ClampedArrayConstructor",
            "kind": "interface",
            "kindModifiers": "declare",
            "sortText": "15"
          },
          {
            "name": "Uint16Array",
            "kind": "var",
            "kindModifiers": "declare",
            "sortText": "15"
          },
          {
            "name": "Uint16ArrayConstructor",
            "kind": "interface",
            "kindModifiers": "declare",
            "sortText": "15"
          },
          {
            "name": "Uint32Array",
            "kind": "var",
            "kindModifiers": "declare",
            "sortText": "15"
          },
          {
            "name": "Uint32ArrayConstructor",
            "kind": "interface",
            "kindModifiers": "declare",
            "sortText": "15"
          },
          {
            "name": "Uncapitalize",
            "kind": "type",
            "kindModifiers": "declare",
            "sortText": "15"
          },
          {
            "name": "undefined",
            "kind": "keyword",
            "kindModifiers": "",
            "sortText": "15"
          },
          {
            "name": "unique",
            "kind": "keyword",
            "kindModifiers": "",
            "sortText": "15"
          },
          {
            "name": "unknown",
            "kind": "keyword",
            "kindModifiers": "",
            "sortText": "15"
          },
          {
            "name": "Uppercase",
            "kind": "type",
            "kindModifiers": "declare",
            "sortText": "15"
          },
          {
            "name": "URIError",
            "kind": "var",
            "kindModifiers": "declare",
            "sortText": "15"
          },
          {
            "name": "URIErrorConstructor",
            "kind": "interface",
            "kindModifiers": "declare",
            "sortText": "15"
          },
          {
            "name": "void",
            "kind": "keyword",
            "kindModifiers": "",
            "sortText": "15"
          },
          {
            "name": "WeakKey",
            "kind": "type",
            "kindModifiers": "declare",
            "sortText": "15"
          },
          {
            "name": "WeakKeyTypes",
            "kind": "interface",
            "kindModifiers": "declare",
            "sortText": "15"
          },
          {
            "name": "ImportAssertions",
            "kind": "interface",
            "kindModifiers": "deprecated,declare",
            "sortText": "z15"
          }
        ],
        "defaultCommitCharacters": [
          ".",
          ",",
          ";"
        ]
      }
    }
After Request
Projects::
/home/src/workspaces/project/tsconfig.json (Configured) *changed*
    projectStateVersion: 3
    projectProgramVersion: 1
    dirty: false *changed*
    autoImportProviderHost: false
