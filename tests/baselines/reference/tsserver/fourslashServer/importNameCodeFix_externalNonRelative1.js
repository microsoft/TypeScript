currentDirectory:: / useCaseSensitiveFileNames: false
Info seq  [hh:mm:ss:mss] Provided types map file "/typesMap.json" doesn't exist
//// [/lib.d.ts]
lib.d.ts-Text

//// [/lib.decorators.d.ts]
lib.decorators.d.ts-Text

//// [/lib.decorators.legacy.d.ts]
lib.decorators.legacy.d.ts-Text

//// [/packages/pkg-1/node_modules/pkg-2] symlink(/packages/pkg-2)
//// [/packages/pkg-1/package.json]
{ "dependencies": { "pkg-2": "*" } }

//// [/packages/pkg-1/src/index.ts]
Pkg2

//// [/packages/pkg-1/tsconfig.json]
{
  "extends": "../../tsconfig.base.json",
  "references": [
    { "path": "../pkg-2" }
  ]
}

//// [/packages/pkg-2/package.json]
{ "types": "dist/index.d.ts" }

//// [/packages/pkg-2/src/blah/foo/data.ts]
Pkg2

//// [/packages/pkg-2/src/index.ts]
import "./utils";

//// [/packages/pkg-2/src/utils.ts]
export const Pkg2 = {};

//// [/packages/pkg-2/tsconfig.json]
{
  "extends": "../../tsconfig.base.json",
  "compilerOptions": { "outDir": "dist", "rootDir": "src", "composite": true }
}

//// [/tsconfig.base.json]
{
  "compilerOptions": {
    "module": "commonjs",
    "paths": {
      "pkg-1/*": ["./packages/pkg-1/src/*"],
      "pkg-2/*": ["./packages/pkg-2/src/*"]
    }
  }
}


Info seq  [hh:mm:ss:mss] request:
    {
      "seq": 0,
      "type": "request",
      "arguments": {
        "file": "/tsconfig.base.json"
      },
      "command": "open"
    }
Info seq  [hh:mm:ss:mss] Search path: /
Info seq  [hh:mm:ss:mss] For info: /tsconfig.base.json :: No config files found.
Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: /dev/null/inferredProject1*
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /lib.d.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /lib.decorators.d.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /lib.decorators.legacy.d.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: /dev/null/inferredProject1* Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Project '/dev/null/inferredProject1*' (Inferred)
Info seq  [hh:mm:ss:mss] 	Files (4)
	/lib.d.ts Text-1 lib.d.ts-Text
	/lib.decorators.d.ts Text-1 lib.decorators.d.ts-Text
	/lib.decorators.legacy.d.ts Text-1 lib.decorators.legacy.d.ts-Text
	/tsconfig.base.json SVC-1-0 "{\n  \"compilerOptions\": {\n    \"module\": \"commonjs\",\n    \"paths\": {\n      \"pkg-1/*\": [\"./packages/pkg-1/src/*\"],\n      \"pkg-2/*\": [\"./packages/pkg-2/src/*\"]\n    }\n  }\n}"


	lib.d.ts
	  Default library for target 'es5'
	lib.decorators.d.ts
	  Library referenced via 'decorators' from file 'lib.d.ts'
	lib.decorators.legacy.d.ts
	  Library referenced via 'decorators.legacy' from file 'lib.d.ts'
	tsconfig.base.json
	  Root file specified for compilation

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Project '/dev/null/inferredProject1*' (Inferred)
Info seq  [hh:mm:ss:mss] 	Files (4)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: /tsconfig.base.json ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /dev/null/inferredProject1*
After Request
watchedFiles::
/lib.d.ts: *new*
  {"pollingInterval":500}
/lib.decorators.d.ts: *new*
  {"pollingInterval":500}
/lib.decorators.legacy.d.ts: *new*
  {"pollingInterval":500}

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
          "indentSwitchCase": true,
          "newline": "\n"
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
        "file": "/packages/pkg-1/src/index.ts"
      },
      "command": "open"
    }
Info seq  [hh:mm:ss:mss] Search path: /packages/pkg-1/src
Info seq  [hh:mm:ss:mss] For info: /packages/pkg-1/src/index.ts :: Config file name: /packages/pkg-1/tsconfig.json
Info seq  [hh:mm:ss:mss] Creating configuration project /packages/pkg-1/tsconfig.json
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /packages/pkg-1/tsconfig.json 2000 undefined Project: /packages/pkg-1/tsconfig.json WatchType: Config file
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "projectLoadingStart",
      "body": {
        "projectName": "/packages/pkg-1/tsconfig.json",
        "reason": "Creating possible configured project for /packages/pkg-1/src/index.ts to open"
      }
    }
Info seq  [hh:mm:ss:mss] Config: /packages/pkg-1/tsconfig.json : {
 "rootNames": [
  "/packages/pkg-1/src/index.ts"
 ],
 "options": {
  "module": 1,
  "paths": {
   "pkg-1/*": [
    "./packages/pkg-1/src/*"
   ],
   "pkg-2/*": [
    "./packages/pkg-2/src/*"
   ]
  },
  "pathsBasePath": "/",
  "configFilePath": "/packages/pkg-1/tsconfig.json"
 },
 "projectReferences": [
  {
   "path": "/packages/pkg-2",
   "originalPath": "../pkg-2"
  }
 ]
}
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /tsconfig.base.json 2000 undefined Config: /packages/pkg-1/tsconfig.json WatchType: Extended config file
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /packages/pkg-1 1 undefined Config: /packages/pkg-1/tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /packages/pkg-1 1 undefined Config: /packages/pkg-1/tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: /packages/pkg-1/tsconfig.json
Info seq  [hh:mm:ss:mss] Config: /packages/pkg-2/tsconfig.json : {
 "rootNames": [
  "/packages/pkg-2/src/index.ts",
  "/packages/pkg-2/src/utils.ts",
  "/packages/pkg-2/src/blah/foo/data.ts"
 ],
 "options": {
  "module": 1,
  "paths": {
   "pkg-1/*": [
    "./packages/pkg-1/src/*"
   ],
   "pkg-2/*": [
    "./packages/pkg-2/src/*"
   ]
  },
  "pathsBasePath": "/",
  "outDir": "/packages/pkg-2/dist",
  "rootDir": "/packages/pkg-2/src",
  "composite": true,
  "configFilePath": "/packages/pkg-2/tsconfig.json"
 }
}
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /packages/pkg-2/tsconfig.json 2000 undefined Project: /packages/pkg-1/tsconfig.json WatchType: Config file
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /packages/pkg-2 1 undefined Config: /packages/pkg-2/tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /packages/pkg-2 1 undefined Config: /packages/pkg-2/tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: /packages/pkg-1/tsconfig.json Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Project '/packages/pkg-1/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (4)
	/lib.d.ts Text-1 lib.d.ts-Text
	/lib.decorators.d.ts Text-1 lib.decorators.d.ts-Text
	/lib.decorators.legacy.d.ts Text-1 lib.decorators.legacy.d.ts-Text
	/packages/pkg-1/src/index.ts SVC-1-0 "Pkg2"


	../../lib.d.ts
	  Default library for target 'es5'
	../../lib.decorators.d.ts
	  Library referenced via 'decorators' from file '../../lib.d.ts'
	../../lib.decorators.legacy.d.ts
	  Library referenced via 'decorators.legacy' from file '../../lib.d.ts'
	src/index.ts
	  Matched by default include pattern '**/*'

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /packages/pkg-1/package.json 250 undefined WatchType: package.json file
Info seq  [hh:mm:ss:mss] AutoImportProviderProject: found 1 root files in 1 dependencies in * ms
Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: /dev/null/autoImportProviderProject1*
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /packages/pkg-2/src/index.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /packages/pkg-2/src/utils.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: /dev/null/autoImportProviderProject1* Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Project '/dev/null/autoImportProviderProject1*' (AutoImportProvider)
Info seq  [hh:mm:ss:mss] 	Files (2)
	/packages/pkg-2/src/utils.ts Text-1 "export const Pkg2 = {};"
	/packages/pkg-2/src/index.ts Text-1 "import \"./utils\";"


	../pkg-2/src/utils.ts
	  Imported via "./utils" from file '../pkg-2/src/index.ts'
	../pkg-2/src/index.ts
	  Root file specified for compilation

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "projectLoadingFinish",
      "body": {
        "projectName": "/packages/pkg-1/tsconfig.json"
      }
    }
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "configFileDiag",
      "body": {
        "triggerFile": "/packages/pkg-1/src/index.ts",
        "configFile": "/packages/pkg-1/tsconfig.json",
        "diagnostics": []
      }
    }
Info seq  [hh:mm:ss:mss] Project '/packages/pkg-1/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (4)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Project '/dev/null/autoImportProviderProject1*' (AutoImportProvider)
Info seq  [hh:mm:ss:mss] 	Files (2)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Project '/dev/null/inferredProject1*' (Inferred)
Info seq  [hh:mm:ss:mss] 	Files (4)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: /tsconfig.base.json ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /dev/null/inferredProject1*
Info seq  [hh:mm:ss:mss] 	FileName: /packages/pkg-1/src/index.ts ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /packages/pkg-1/tsconfig.json
After Request
watchedFiles::
/lib.d.ts:
  {"pollingInterval":500}
/lib.decorators.d.ts:
  {"pollingInterval":500}
/lib.decorators.legacy.d.ts:
  {"pollingInterval":500}
/packages/pkg-1/package.json: *new*
  {"pollingInterval":250}
/packages/pkg-1/tsconfig.json: *new*
  {"pollingInterval":2000}
/packages/pkg-2/src/index.ts: *new*
  {"pollingInterval":500}
/packages/pkg-2/src/utils.ts: *new*
  {"pollingInterval":500}
/packages/pkg-2/tsconfig.json: *new*
  {"pollingInterval":2000}
/tsconfig.base.json: *new*
  {"pollingInterval":2000}

watchedDirectoriesRecursive::
/packages/pkg-1: *new*
  {}
/packages/pkg-2: *new*
  {}

Info seq  [hh:mm:ss:mss] request:
    {
      "seq": 3,
      "type": "request",
      "arguments": {
        "preferences": {
          "importModuleSpecifierPreference": "project-relative"
        }
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
        "preferences": {
          "importModuleSpecifierPreference": "project-relative"
        }
      },
      "command": "configure"
    }
Info seq  [hh:mm:ss:mss] response:
    {
      "seq": 0,
      "type": "response",
      "command": "configure",
      "request_seq": 4,
      "success": true
    }
Info seq  [hh:mm:ss:mss] request:
    {
      "seq": 5,
      "type": "request",
      "arguments": {
        "file": "/packages/pkg-1/src/index.ts",
        "includeLinePosition": true
      },
      "command": "syntacticDiagnosticsSync"
    }
Info seq  [hh:mm:ss:mss] response:
    {
      "seq": 0,
      "type": "response",
      "command": "syntacticDiagnosticsSync",
      "request_seq": 5,
      "success": true,
      "body": []
    }
Info seq  [hh:mm:ss:mss] request:
    {
      "seq": 6,
      "type": "request",
      "arguments": {
        "file": "/packages/pkg-1/src/index.ts",
        "includeLinePosition": true
      },
      "command": "semanticDiagnosticsSync"
    }
Info seq  [hh:mm:ss:mss] response:
    {
      "seq": 0,
      "type": "response",
      "command": "semanticDiagnosticsSync",
      "request_seq": 6,
      "success": true,
      "body": [
        {
          "message": "Cannot find name 'Pkg2'.",
          "start": 0,
          "length": 4,
          "category": "error",
          "code": 2304,
          "startLocation": {
            "line": 1,
            "offset": 1
          },
          "endLocation": {
            "line": 1,
            "offset": 5
          }
        }
      ]
    }
Info seq  [hh:mm:ss:mss] request:
    {
      "seq": 7,
      "type": "request",
      "arguments": {
        "file": "/packages/pkg-1/src/index.ts",
        "includeLinePosition": true
      },
      "command": "suggestionDiagnosticsSync"
    }
Info seq  [hh:mm:ss:mss] response:
    {
      "seq": 0,
      "type": "response",
      "command": "suggestionDiagnosticsSync",
      "request_seq": 7,
      "success": true,
      "body": []
    }
Info seq  [hh:mm:ss:mss] request:
    {
      "seq": 8,
      "type": "request",
      "arguments": {
        "file": "/packages/pkg-1/src/index.ts",
        "startLine": 1,
        "startOffset": 1,
        "endLine": 1,
        "endOffset": 5,
        "errorCodes": [
          2304
        ]
      },
      "command": "getCodeFixes"
    }
Info seq  [hh:mm:ss:mss] forEachExternalModuleToImportFrom autoImportProvider: *
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /packages/pkg-1/node_modules 1 undefined WatchType: node_modules for closed script infos and package.jsons affecting module specifier cache
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /packages/pkg-1/node_modules 1 undefined WatchType: node_modules for closed script infos and package.jsons affecting module specifier cache
Info seq  [hh:mm:ss:mss] response:
    {
      "seq": 0,
      "type": "response",
      "command": "getCodeFixes",
      "request_seq": 8,
      "success": true,
      "body": [
        {
          "fixName": "import",
          "description": "Add import from \"pkg-2/utils\"",
          "changes": [
            {
              "fileName": "/packages/pkg-1/src/index.ts",
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
                  "newText": "import { Pkg2 } from \"pkg-2/utils\";\n\n"
                }
              ]
            }
          ]
        }
      ]
    }
After Request
watchedFiles::
/lib.d.ts:
  {"pollingInterval":500}
/lib.decorators.d.ts:
  {"pollingInterval":500}
/lib.decorators.legacy.d.ts:
  {"pollingInterval":500}
/packages/pkg-1/package.json:
  {"pollingInterval":250}
/packages/pkg-1/tsconfig.json:
  {"pollingInterval":2000}
/packages/pkg-2/src/index.ts:
  {"pollingInterval":500}
/packages/pkg-2/src/utils.ts:
  {"pollingInterval":500}
/packages/pkg-2/tsconfig.json:
  {"pollingInterval":2000}
/tsconfig.base.json:
  {"pollingInterval":2000}

watchedDirectoriesRecursive::
/packages/pkg-1:
  {}
/packages/pkg-1/node_modules: *new*
  {}
/packages/pkg-2:
  {}

Info seq  [hh:mm:ss:mss] request:
    {
      "seq": 9,
      "type": "request",
      "arguments": {
        "file": "/packages/pkg-1/src/index.ts",
        "line": 1,
        "offset": 1,
        "endLine": 1,
        "endOffset": 1,
        "insertString": "import { Pkg2 } from \"pkg-2/utils\";\n\n"
      },
      "command": "change"
    }
Info seq  [hh:mm:ss:mss] request:
    {
      "seq": 10,
      "type": "request",
      "arguments": {
        "file": "/packages/pkg-1/src/index.ts",
        "line": 1,
        "offset": 1,
        "endLine": 3,
        "endOffset": 1,
        "insertString": ""
      },
      "command": "change"
    }
Info seq  [hh:mm:ss:mss] request:
    {
      "seq": 11,
      "type": "request",
      "arguments": {
        "file": "/packages/pkg-2/src/blah/foo/data.ts"
      },
      "command": "open"
    }
Info seq  [hh:mm:ss:mss] Search path: /packages/pkg-2/src/blah/foo
Info seq  [hh:mm:ss:mss] For info: /packages/pkg-2/src/blah/foo/data.ts :: Config file name: /packages/pkg-2/tsconfig.json
Info seq  [hh:mm:ss:mss] Creating configuration project /packages/pkg-2/tsconfig.json
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "projectLoadingStart",
      "body": {
        "projectName": "/packages/pkg-2/tsconfig.json",
        "reason": "Creating possible configured project for /packages/pkg-2/src/blah/foo/data.ts to open"
      }
    }
Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: /packages/pkg-2/tsconfig.json
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: /packages/pkg-2/tsconfig.json Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Project '/packages/pkg-2/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (6)
	/lib.d.ts Text-1 lib.d.ts-Text
	/lib.decorators.d.ts Text-1 lib.decorators.d.ts-Text
	/lib.decorators.legacy.d.ts Text-1 lib.decorators.legacy.d.ts-Text
	/packages/pkg-2/src/utils.ts Text-1 "export const Pkg2 = {};"
	/packages/pkg-2/src/index.ts Text-1 "import \"./utils\";"
	/packages/pkg-2/src/blah/foo/data.ts SVC-1-0 "Pkg2"


	../../lib.d.ts
	  Default library for target 'es5'
	../../lib.decorators.d.ts
	  Library referenced via 'decorators' from file '../../lib.d.ts'
	../../lib.decorators.legacy.d.ts
	  Library referenced via 'decorators.legacy' from file '../../lib.d.ts'
	src/utils.ts
	  Imported via "./utils" from file 'src/index.ts'
	  Matched by default include pattern '**/*'
	src/index.ts
	  Matched by default include pattern '**/*'
	src/blah/foo/data.ts
	  Matched by default include pattern '**/*'

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /packages/pkg-2/package.json 250 undefined WatchType: package.json file
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "projectLoadingFinish",
      "body": {
        "projectName": "/packages/pkg-2/tsconfig.json"
      }
    }
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "configFileDiag",
      "body": {
        "triggerFile": "/packages/pkg-2/src/blah/foo/data.ts",
        "configFile": "/packages/pkg-2/tsconfig.json",
        "diagnostics": []
      }
    }
Info seq  [hh:mm:ss:mss] Search path: /packages/pkg-2
Info seq  [hh:mm:ss:mss] For info: /packages/pkg-2/tsconfig.json :: No config files found.
Info seq  [hh:mm:ss:mss] Project '/packages/pkg-1/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (4)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Project '/dev/null/autoImportProviderProject1*' (AutoImportProvider)
Info seq  [hh:mm:ss:mss] 	Files (2)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Project '/packages/pkg-2/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (6)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Project '/dev/null/inferredProject1*' (Inferred)
Info seq  [hh:mm:ss:mss] 	Files (4)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: /tsconfig.base.json ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /dev/null/inferredProject1*
Info seq  [hh:mm:ss:mss] 	FileName: /packages/pkg-1/src/index.ts ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /packages/pkg-1/tsconfig.json
Info seq  [hh:mm:ss:mss] 	FileName: /packages/pkg-2/src/blah/foo/data.ts ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /packages/pkg-2/tsconfig.json
After Request
watchedFiles::
/lib.d.ts:
  {"pollingInterval":500}
/lib.decorators.d.ts:
  {"pollingInterval":500}
/lib.decorators.legacy.d.ts:
  {"pollingInterval":500}
/packages/pkg-1/package.json:
  {"pollingInterval":250}
/packages/pkg-1/tsconfig.json:
  {"pollingInterval":2000}
/packages/pkg-2/package.json: *new*
  {"pollingInterval":250}
/packages/pkg-2/src/index.ts:
  {"pollingInterval":500}
/packages/pkg-2/src/utils.ts:
  {"pollingInterval":500}
/packages/pkg-2/tsconfig.json:
  {"pollingInterval":2000}
/tsconfig.base.json:
  {"pollingInterval":2000}

watchedDirectoriesRecursive::
/packages/pkg-1:
  {}
/packages/pkg-1/node_modules:
  {}
/packages/pkg-2:
  {}

Info seq  [hh:mm:ss:mss] request:
    {
      "seq": 12,
      "type": "request",
      "arguments": {
        "preferences": {
          "importModuleSpecifierPreference": "project-relative"
        }
      },
      "command": "configure"
    }
Info seq  [hh:mm:ss:mss] response:
    {
      "seq": 0,
      "type": "response",
      "command": "configure",
      "request_seq": 12,
      "success": true
    }
Info seq  [hh:mm:ss:mss] request:
    {
      "seq": 13,
      "type": "request",
      "arguments": {
        "preferences": {
          "importModuleSpecifierPreference": "project-relative"
        }
      },
      "command": "configure"
    }
Info seq  [hh:mm:ss:mss] response:
    {
      "seq": 0,
      "type": "response",
      "command": "configure",
      "request_seq": 13,
      "success": true
    }
Info seq  [hh:mm:ss:mss] request:
    {
      "seq": 14,
      "type": "request",
      "arguments": {
        "file": "/packages/pkg-2/src/blah/foo/data.ts",
        "includeLinePosition": true
      },
      "command": "syntacticDiagnosticsSync"
    }
Info seq  [hh:mm:ss:mss] response:
    {
      "seq": 0,
      "type": "response",
      "command": "syntacticDiagnosticsSync",
      "request_seq": 14,
      "success": true,
      "body": []
    }
Info seq  [hh:mm:ss:mss] request:
    {
      "seq": 15,
      "type": "request",
      "arguments": {
        "file": "/packages/pkg-2/src/blah/foo/data.ts",
        "includeLinePosition": true
      },
      "command": "semanticDiagnosticsSync"
    }
Info seq  [hh:mm:ss:mss] response:
    {
      "seq": 0,
      "type": "response",
      "command": "semanticDiagnosticsSync",
      "request_seq": 15,
      "success": true,
      "body": [
        {
          "message": "Cannot find name 'Pkg2'.",
          "start": 0,
          "length": 4,
          "category": "error",
          "code": 2304,
          "startLocation": {
            "line": 1,
            "offset": 1
          },
          "endLocation": {
            "line": 1,
            "offset": 5
          }
        }
      ]
    }
Info seq  [hh:mm:ss:mss] request:
    {
      "seq": 16,
      "type": "request",
      "arguments": {
        "file": "/packages/pkg-2/src/blah/foo/data.ts",
        "includeLinePosition": true
      },
      "command": "suggestionDiagnosticsSync"
    }
Info seq  [hh:mm:ss:mss] response:
    {
      "seq": 0,
      "type": "response",
      "command": "suggestionDiagnosticsSync",
      "request_seq": 16,
      "success": true,
      "body": []
    }
Info seq  [hh:mm:ss:mss] request:
    {
      "seq": 17,
      "type": "request",
      "arguments": {
        "file": "/packages/pkg-2/src/blah/foo/data.ts",
        "startLine": 1,
        "startOffset": 1,
        "endLine": 1,
        "endOffset": 5,
        "errorCodes": [
          2304
        ]
      },
      "command": "getCodeFixes"
    }
Info seq  [hh:mm:ss:mss] response:
    {
      "seq": 0,
      "type": "response",
      "command": "getCodeFixes",
      "request_seq": 17,
      "success": true,
      "body": [
        {
          "fixName": "import",
          "description": "Add import from \"../../utils\"",
          "changes": [
            {
              "fileName": "/packages/pkg-2/src/blah/foo/data.ts",
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
                  "newText": "import { Pkg2 } from \"../../utils\";\n\n"
                }
              ]
            }
          ]
        }
      ]
    }
Info seq  [hh:mm:ss:mss] request:
    {
      "seq": 18,
      "type": "request",
      "arguments": {
        "file": "/packages/pkg-2/src/blah/foo/data.ts",
        "line": 1,
        "offset": 1,
        "endLine": 1,
        "endOffset": 1,
        "insertString": "import { Pkg2 } from \"../../utils\";\n\n"
      },
      "command": "change"
    }
Info seq  [hh:mm:ss:mss] request:
    {
      "seq": 19,
      "type": "request",
      "arguments": {
        "file": "/packages/pkg-2/src/blah/foo/data.ts",
        "line": 1,
        "offset": 1,
        "endLine": 3,
        "endOffset": 1,
        "insertString": ""
      },
      "command": "change"
    }