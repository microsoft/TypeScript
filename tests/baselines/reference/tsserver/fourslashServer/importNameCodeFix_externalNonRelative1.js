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

//// [/home/src/workspaces/project/packages/pkg-1/node_modules/pkg-2] symlink(/home/src/workspaces/project/packages/pkg-2)
//// [/home/src/workspaces/project/packages/pkg-1/package.json]
{ "dependencies": { "pkg-2": "*" } }

//// [/home/src/workspaces/project/packages/pkg-1/src/index.ts]
Pkg2

//// [/home/src/workspaces/project/packages/pkg-1/tsconfig.json]
{
  "extends": "../../tsconfig.base.json",
  "references": [
    { "path": "../pkg-2" }
  ]
}

//// [/home/src/workspaces/project/packages/pkg-2/package.json]
{ "types": "dist/index.d.ts" }

//// [/home/src/workspaces/project/packages/pkg-2/src/blah/foo/data.ts]
Pkg2

//// [/home/src/workspaces/project/packages/pkg-2/src/index.ts]
import "./utils";

//// [/home/src/workspaces/project/packages/pkg-2/src/utils.ts]
export const Pkg2 = {};

//// [/home/src/workspaces/project/packages/pkg-2/tsconfig.json]
{
  "extends": "../../tsconfig.base.json",
  "compilerOptions": { "outDir": "dist", "rootDir": "src", "composite": true }
}

//// [/home/src/workspaces/project/tsconfig.base.json]
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
        "file": "/home/src/workspaces/project/tsconfig.base.json"
      },
      "command": "open"
    }
Info seq  [hh:mm:ss:mss] getConfigFileNameForFile:: File: /home/src/workspaces/project/tsconfig.base.json ProjectRootPath: undefined:: Result: undefined
Info seq  [hh:mm:ss:mss] Creating InferredProject: /dev/null/inferredProject1*, currentDirectory: /home/src/workspaces/project
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/workspaces/project/tsconfig.json 2000 undefined WatchType: Config file for the inferred project root
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/workspaces/project/jsconfig.json 2000 undefined WatchType: Config file for the inferred project root
Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: /dev/null/inferredProject1*
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/tslibs/TS/Lib/lib.d.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /home/src/workspaces/project/node_modules 1 undefined Project: /dev/null/inferredProject1* WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /home/src/workspaces/project/node_modules 1 undefined Project: /dev/null/inferredProject1* WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /home/src/workspaces/node_modules 1 undefined Project: /dev/null/inferredProject1* WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /home/src/workspaces/node_modules 1 undefined Project: /dev/null/inferredProject1* WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/tslibs/TS/Lib/lib.decorators.d.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/tslibs/TS/Lib/lib.decorators.legacy.d.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /home/src/workspaces/project/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /home/src/workspaces/project/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /home/src/workspaces/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /home/src/workspaces/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: /dev/null/inferredProject1* projectStateVersion: 1 projectProgramVersion: 0 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Project '/dev/null/inferredProject1*' (Inferred)
Info seq  [hh:mm:ss:mss] 	Files (4)
	/home/src/tslibs/TS/Lib/lib.d.ts Text-1 lib.d.ts-Text
	/home/src/tslibs/TS/Lib/lib.decorators.d.ts Text-1 lib.decorators.d.ts-Text
	/home/src/tslibs/TS/Lib/lib.decorators.legacy.d.ts Text-1 lib.decorators.legacy.d.ts-Text
	/home/src/workspaces/project/tsconfig.base.json SVC-1-0 "{\n  \"compilerOptions\": {\n    \"module\": \"commonjs\",\n    \"paths\": {\n      \"pkg-1/*\": [\"./packages/pkg-1/src/*\"],\n      \"pkg-2/*\": [\"./packages/pkg-2/src/*\"]\n    }\n  }\n}"


	../../tslibs/TS/Lib/lib.d.ts
	  Default library for target 'es5'
	../../tslibs/TS/Lib/lib.decorators.d.ts
	  Library referenced via 'decorators' from file '../../tslibs/TS/Lib/lib.d.ts'
	../../tslibs/TS/Lib/lib.decorators.legacy.d.ts
	  Library referenced via 'decorators.legacy' from file '../../tslibs/TS/Lib/lib.d.ts'
	tsconfig.base.json
	  Root file specified for compilation

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Project '/dev/null/inferredProject1*' (Inferred)
Info seq  [hh:mm:ss:mss] 	Files (4)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: /home/src/workspaces/project/tsconfig.base.json ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /dev/null/inferredProject1*
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
/home/src/workspaces/project/jsconfig.json: *new*
  {"pollingInterval":2000}
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
/dev/null/inferredProject1* (Inferred) *new*
    projectStateVersion: 1
    projectProgramVersion: 1
    autoImportProviderHost: false

ScriptInfos::
/home/src/tslibs/TS/Lib/lib.d.ts *new*
    version: Text-1
    containingProjects: 1
        /dev/null/inferredProject1*
/home/src/tslibs/TS/Lib/lib.decorators.d.ts *new*
    version: Text-1
    containingProjects: 1
        /dev/null/inferredProject1*
/home/src/tslibs/TS/Lib/lib.decorators.legacy.d.ts *new*
    version: Text-1
    containingProjects: 1
        /dev/null/inferredProject1*
/home/src/workspaces/project/tsconfig.base.json (Open) *new*
    version: SVC-1-0
    containingProjects: 1
        /dev/null/inferredProject1* *default*

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
        "file": "/home/src/workspaces/project/packages/pkg-1/src/index.ts"
      },
      "command": "open"
    }
Info seq  [hh:mm:ss:mss] getConfigFileNameForFile:: File: /home/src/workspaces/project/packages/pkg-1/src/index.ts ProjectRootPath: undefined:: Result: /home/src/workspaces/project/packages/pkg-1/tsconfig.json
Info seq  [hh:mm:ss:mss] Creating ConfiguredProject: /home/src/workspaces/project/packages/pkg-1/tsconfig.json, currentDirectory: /home/src/workspaces/project/packages/pkg-1
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/workspaces/project/packages/pkg-1/tsconfig.json 2000 undefined Project: /home/src/workspaces/project/packages/pkg-1/tsconfig.json WatchType: Config file
Info seq  [hh:mm:ss:mss] Config: /home/src/workspaces/project/packages/pkg-1/tsconfig.json : {
 "rootNames": [
  "/home/src/workspaces/project/packages/pkg-1/src/index.ts"
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
  "pathsBasePath": "/home/src/workspaces/project",
  "configFilePath": "/home/src/workspaces/project/packages/pkg-1/tsconfig.json"
 },
 "projectReferences": [
  {
   "path": "/home/src/workspaces/project/packages/pkg-2",
   "originalPath": "../pkg-2"
  }
 ]
}
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/workspaces/project/tsconfig.base.json 2000 undefined Config: /home/src/workspaces/project/packages/pkg-1/tsconfig.json WatchType: Extended config file
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "projectLoadingStart",
      "body": {
        "projectName": "/home/src/workspaces/project/packages/pkg-1/tsconfig.json",
        "reason": "Creating possible configured project for /home/src/workspaces/project/packages/pkg-1/src/index.ts to open"
      }
    }
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /home/src/workspaces/project/packages/pkg-1 1 undefined Config: /home/src/workspaces/project/packages/pkg-1/tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /home/src/workspaces/project/packages/pkg-1 1 undefined Config: /home/src/workspaces/project/packages/pkg-1/tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: /home/src/workspaces/project/packages/pkg-1/tsconfig.json
Info seq  [hh:mm:ss:mss] Config: /home/src/workspaces/project/packages/pkg-2/tsconfig.json : {
 "rootNames": [
  "/home/src/workspaces/project/packages/pkg-2/src/index.ts",
  "/home/src/workspaces/project/packages/pkg-2/src/utils.ts",
  "/home/src/workspaces/project/packages/pkg-2/src/blah/foo/data.ts"
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
  "pathsBasePath": "/home/src/workspaces/project",
  "outDir": "/home/src/workspaces/project/packages/pkg-2/dist",
  "rootDir": "/home/src/workspaces/project/packages/pkg-2/src",
  "composite": true,
  "configFilePath": "/home/src/workspaces/project/packages/pkg-2/tsconfig.json"
 }
}
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/workspaces/project/packages/pkg-2/tsconfig.json 2000 undefined Project: /home/src/workspaces/project/packages/pkg-1/tsconfig.json WatchType: Config file
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /home/src/workspaces/project/packages/pkg-2 1 undefined Config: /home/src/workspaces/project/packages/pkg-2/tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /home/src/workspaces/project/packages/pkg-2 1 undefined Config: /home/src/workspaces/project/packages/pkg-2/tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /home/src/workspaces/project/packages/pkg-1/node_modules 1 undefined Project: /home/src/workspaces/project/packages/pkg-1/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /home/src/workspaces/project/packages/pkg-1/node_modules 1 undefined Project: /home/src/workspaces/project/packages/pkg-1/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /home/src/workspaces/project/packages/node_modules 1 undefined Project: /home/src/workspaces/project/packages/pkg-1/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /home/src/workspaces/project/packages/node_modules 1 undefined Project: /home/src/workspaces/project/packages/pkg-1/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /home/src/workspaces/project/node_modules 1 undefined Project: /home/src/workspaces/project/packages/pkg-1/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /home/src/workspaces/project/node_modules 1 undefined Project: /home/src/workspaces/project/packages/pkg-1/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /home/src/workspaces/node_modules 1 undefined Project: /home/src/workspaces/project/packages/pkg-1/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /home/src/workspaces/node_modules 1 undefined Project: /home/src/workspaces/project/packages/pkg-1/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /home/src/workspaces/project/packages/pkg-1/node_modules/@types 1 undefined Project: /home/src/workspaces/project/packages/pkg-1/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /home/src/workspaces/project/packages/pkg-1/node_modules/@types 1 undefined Project: /home/src/workspaces/project/packages/pkg-1/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /home/src/workspaces/project/packages/node_modules/@types 1 undefined Project: /home/src/workspaces/project/packages/pkg-1/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /home/src/workspaces/project/packages/node_modules/@types 1 undefined Project: /home/src/workspaces/project/packages/pkg-1/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /home/src/workspaces/project/node_modules/@types 1 undefined Project: /home/src/workspaces/project/packages/pkg-1/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /home/src/workspaces/project/node_modules/@types 1 undefined Project: /home/src/workspaces/project/packages/pkg-1/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /home/src/workspaces/node_modules/@types 1 undefined Project: /home/src/workspaces/project/packages/pkg-1/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /home/src/workspaces/node_modules/@types 1 undefined Project: /home/src/workspaces/project/packages/pkg-1/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: /home/src/workspaces/project/packages/pkg-1/tsconfig.json projectStateVersion: 1 projectProgramVersion: 0 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Project '/home/src/workspaces/project/packages/pkg-1/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (4)
	/home/src/tslibs/TS/Lib/lib.d.ts Text-1 lib.d.ts-Text
	/home/src/tslibs/TS/Lib/lib.decorators.d.ts Text-1 lib.decorators.d.ts-Text
	/home/src/tslibs/TS/Lib/lib.decorators.legacy.d.ts Text-1 lib.decorators.legacy.d.ts-Text
	/home/src/workspaces/project/packages/pkg-1/src/index.ts SVC-1-0 "Pkg2"


	../../../../tslibs/TS/Lib/lib.d.ts
	  Default library for target 'es5'
	../../../../tslibs/TS/Lib/lib.decorators.d.ts
	  Library referenced via 'decorators' from file '../../../../tslibs/TS/Lib/lib.d.ts'
	../../../../tslibs/TS/Lib/lib.decorators.legacy.d.ts
	  Library referenced via 'decorators.legacy' from file '../../../../tslibs/TS/Lib/lib.d.ts'
	src/index.ts
	  Matched by default include pattern '**/*'

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/workspaces/project/packages/pkg-1/package.json 250 undefined WatchType: package.json file
Info seq  [hh:mm:ss:mss] AutoImportProviderProject: found 1 root files in 1 dependencies 0 referenced projects in * ms
Info seq  [hh:mm:ss:mss] Creating AutoImportProviderProject: /dev/null/autoImportProviderProject1*, currentDirectory: /home/src/workspaces/project/packages/pkg-1
Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: /dev/null/autoImportProviderProject1*
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/workspaces/project/packages/pkg-2/src/index.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/workspaces/project/packages/pkg-2/src/utils.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: /dev/null/autoImportProviderProject1* projectStateVersion: 1 projectProgramVersion: 0 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Project '/dev/null/autoImportProviderProject1*' (AutoImportProvider)
Info seq  [hh:mm:ss:mss] 	Files (2)
	/home/src/workspaces/project/packages/pkg-2/src/utils.ts Text-1 "export const Pkg2 = {};"
	/home/src/workspaces/project/packages/pkg-2/src/index.ts Text-1 "import \"./utils\";"


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
        "projectName": "/home/src/workspaces/project/packages/pkg-1/tsconfig.json"
      }
    }
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "configFileDiag",
      "body": {
        "triggerFile": "/home/src/workspaces/project/packages/pkg-1/src/index.ts",
        "configFile": "/home/src/workspaces/project/packages/pkg-1/tsconfig.json",
        "diagnostics": []
      }
    }
Info seq  [hh:mm:ss:mss] Project '/home/src/workspaces/project/packages/pkg-1/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (4)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Project '/dev/null/autoImportProviderProject1*' (AutoImportProvider)
Info seq  [hh:mm:ss:mss] 	Files (2)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Project '/dev/null/inferredProject1*' (Inferred)
Info seq  [hh:mm:ss:mss] 	Files (4)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: /home/src/workspaces/project/tsconfig.base.json ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /dev/null/inferredProject1*
Info seq  [hh:mm:ss:mss] 	FileName: /home/src/workspaces/project/packages/pkg-1/src/index.ts ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /home/src/workspaces/project/packages/pkg-1/tsconfig.json
Info seq  [hh:mm:ss:mss] response:
    {
      "seq": 0,
      "type": "response",
      "command": "open",
      "request_seq": 2,
      "success": true,
      "performanceData": {
        "updateGraphDurationMs": *,
        "createAutoImportProviderProgramDurationMs": *
      }
    }
After Request
watchedFiles::
/home/src/tslibs/TS/Lib/lib.d.ts:
  {"pollingInterval":500}
/home/src/tslibs/TS/Lib/lib.decorators.d.ts:
  {"pollingInterval":500}
/home/src/tslibs/TS/Lib/lib.decorators.legacy.d.ts:
  {"pollingInterval":500}
/home/src/workspaces/project/jsconfig.json:
  {"pollingInterval":2000}
/home/src/workspaces/project/packages/pkg-1/package.json: *new*
  {"pollingInterval":250}
/home/src/workspaces/project/packages/pkg-1/tsconfig.json: *new*
  {"pollingInterval":2000}
/home/src/workspaces/project/packages/pkg-2/src/index.ts: *new*
  {"pollingInterval":500}
/home/src/workspaces/project/packages/pkg-2/src/utils.ts: *new*
  {"pollingInterval":500}
/home/src/workspaces/project/packages/pkg-2/tsconfig.json: *new*
  {"pollingInterval":2000}
/home/src/workspaces/project/tsconfig.base.json: *new*
  {"pollingInterval":2000}
/home/src/workspaces/project/tsconfig.json:
  {"pollingInterval":2000}

watchedDirectoriesRecursive::
/home/src/workspaces/node_modules:
  {}
  {} *new*
/home/src/workspaces/node_modules/@types:
  {}
  {} *new*
/home/src/workspaces/project/node_modules:
  {}
  {} *new*
/home/src/workspaces/project/node_modules/@types:
  {}
  {} *new*
/home/src/workspaces/project/packages/node_modules: *new*
  {}
/home/src/workspaces/project/packages/node_modules/@types: *new*
  {}
/home/src/workspaces/project/packages/pkg-1: *new*
  {}
/home/src/workspaces/project/packages/pkg-1/node_modules: *new*
  {}
/home/src/workspaces/project/packages/pkg-1/node_modules/@types: *new*
  {}
/home/src/workspaces/project/packages/pkg-2: *new*
  {}

Projects::
/dev/null/autoImportProviderProject1* (AutoImportProvider) *new*
    projectStateVersion: 1
    projectProgramVersion: 1
/dev/null/inferredProject1* (Inferred)
    projectStateVersion: 1
    projectProgramVersion: 1
    autoImportProviderHost: false
/home/src/workspaces/project/packages/pkg-1/tsconfig.json (Configured) *new*
    projectStateVersion: 1
    projectProgramVersion: 1
    autoImportProviderHost: /dev/null/autoImportProviderProject1*

ScriptInfos::
/home/src/tslibs/TS/Lib/lib.d.ts *changed*
    version: Text-1
    containingProjects: 2 *changed*
        /dev/null/inferredProject1*
        /home/src/workspaces/project/packages/pkg-1/tsconfig.json *new*
/home/src/tslibs/TS/Lib/lib.decorators.d.ts *changed*
    version: Text-1
    containingProjects: 2 *changed*
        /dev/null/inferredProject1*
        /home/src/workspaces/project/packages/pkg-1/tsconfig.json *new*
/home/src/tslibs/TS/Lib/lib.decorators.legacy.d.ts *changed*
    version: Text-1
    containingProjects: 2 *changed*
        /dev/null/inferredProject1*
        /home/src/workspaces/project/packages/pkg-1/tsconfig.json *new*
/home/src/workspaces/project/packages/pkg-1/src/index.ts (Open) *new*
    version: SVC-1-0
    containingProjects: 1
        /home/src/workspaces/project/packages/pkg-1/tsconfig.json *default*
/home/src/workspaces/project/packages/pkg-2/src/index.ts *new*
    version: Text-1
    containingProjects: 1
        /dev/null/autoImportProviderProject1*
/home/src/workspaces/project/packages/pkg-2/src/utils.ts *new*
    version: Text-1
    containingProjects: 1
        /dev/null/autoImportProviderProject1*
/home/src/workspaces/project/tsconfig.base.json (Open)
    version: SVC-1-0
    containingProjects: 1
        /dev/null/inferredProject1* *default*

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
        "file": "/home/src/workspaces/project/packages/pkg-1/src/index.ts",
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
        "file": "/home/src/workspaces/project/packages/pkg-1/src/index.ts",
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
        "file": "/home/src/workspaces/project/packages/pkg-1/src/index.ts",
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
        "file": "/home/src/workspaces/project/packages/pkg-1/src/index.ts",
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
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /home/src/workspaces/project/packages/pkg-1/node_modules 1 undefined WatchType: node_modules for closed script infos and package.jsons affecting module specifier cache
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /home/src/workspaces/project/packages/pkg-1/node_modules 1 undefined WatchType: node_modules for closed script infos and package.jsons affecting module specifier cache
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
              "fileName": "/home/src/workspaces/project/packages/pkg-1/src/index.ts",
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
/home/src/tslibs/TS/Lib/lib.d.ts:
  {"pollingInterval":500}
/home/src/tslibs/TS/Lib/lib.decorators.d.ts:
  {"pollingInterval":500}
/home/src/tslibs/TS/Lib/lib.decorators.legacy.d.ts:
  {"pollingInterval":500}
/home/src/workspaces/project/jsconfig.json:
  {"pollingInterval":2000}
/home/src/workspaces/project/packages/pkg-1/package.json:
  {"pollingInterval":250}
/home/src/workspaces/project/packages/pkg-1/tsconfig.json:
  {"pollingInterval":2000}
/home/src/workspaces/project/packages/pkg-2/src/index.ts:
  {"pollingInterval":500}
/home/src/workspaces/project/packages/pkg-2/src/utils.ts:
  {"pollingInterval":500}
/home/src/workspaces/project/packages/pkg-2/tsconfig.json:
  {"pollingInterval":2000}
/home/src/workspaces/project/tsconfig.base.json:
  {"pollingInterval":2000}
/home/src/workspaces/project/tsconfig.json:
  {"pollingInterval":2000}

watchedDirectoriesRecursive::
/home/src/workspaces/node_modules:
  {}
  {}
/home/src/workspaces/node_modules/@types:
  {}
  {}
/home/src/workspaces/project/node_modules:
  {}
  {}
/home/src/workspaces/project/node_modules/@types:
  {}
  {}
/home/src/workspaces/project/packages/node_modules:
  {}
/home/src/workspaces/project/packages/node_modules/@types:
  {}
/home/src/workspaces/project/packages/pkg-1:
  {}
/home/src/workspaces/project/packages/pkg-1/node_modules:
  {}
  {} *new*
/home/src/workspaces/project/packages/pkg-1/node_modules/@types:
  {}
/home/src/workspaces/project/packages/pkg-2:
  {}

Info seq  [hh:mm:ss:mss] request:
    {
      "seq": 9,
      "type": "request",
      "arguments": {
        "file": "/home/src/workspaces/project/packages/pkg-1/src/index.ts",
        "line": 1,
        "offset": 1,
        "endLine": 1,
        "endOffset": 1,
        "insertString": "import { Pkg2 } from \"pkg-2/utils\";\n\n"
      },
      "command": "change"
    }
Info seq  [hh:mm:ss:mss] response:
    {
      "seq": 0,
      "type": "response",
      "command": "change",
      "request_seq": 9,
      "success": true
    }
After Request
Projects::
/dev/null/autoImportProviderProject1* (AutoImportProvider)
    projectStateVersion: 1
    projectProgramVersion: 1
/dev/null/inferredProject1* (Inferred)
    projectStateVersion: 1
    projectProgramVersion: 1
    autoImportProviderHost: false
/home/src/workspaces/project/packages/pkg-1/tsconfig.json (Configured) *changed*
    projectStateVersion: 2 *changed*
    projectProgramVersion: 1
    dirty: true *changed*
    autoImportProviderHost: /dev/null/autoImportProviderProject1*

ScriptInfos::
/home/src/tslibs/TS/Lib/lib.d.ts
    version: Text-1
    containingProjects: 2
        /dev/null/inferredProject1*
        /home/src/workspaces/project/packages/pkg-1/tsconfig.json
/home/src/tslibs/TS/Lib/lib.decorators.d.ts
    version: Text-1
    containingProjects: 2
        /dev/null/inferredProject1*
        /home/src/workspaces/project/packages/pkg-1/tsconfig.json
/home/src/tslibs/TS/Lib/lib.decorators.legacy.d.ts
    version: Text-1
    containingProjects: 2
        /dev/null/inferredProject1*
        /home/src/workspaces/project/packages/pkg-1/tsconfig.json
/home/src/workspaces/project/packages/pkg-1/src/index.ts (Open) *changed*
    version: SVC-1-1 *changed*
    containingProjects: 1
        /home/src/workspaces/project/packages/pkg-1/tsconfig.json *default*
/home/src/workspaces/project/packages/pkg-2/src/index.ts
    version: Text-1
    containingProjects: 1
        /dev/null/autoImportProviderProject1*
/home/src/workspaces/project/packages/pkg-2/src/utils.ts
    version: Text-1
    containingProjects: 1
        /dev/null/autoImportProviderProject1*
/home/src/workspaces/project/tsconfig.base.json (Open)
    version: SVC-1-0
    containingProjects: 1
        /dev/null/inferredProject1* *default*

Info seq  [hh:mm:ss:mss] request:
    {
      "seq": 10,
      "type": "request",
      "arguments": {
        "file": "/home/src/workspaces/project/packages/pkg-1/src/index.ts",
        "line": 1,
        "offset": 1,
        "endLine": 3,
        "endOffset": 1,
        "insertString": ""
      },
      "command": "change"
    }
Info seq  [hh:mm:ss:mss] response:
    {
      "seq": 0,
      "type": "response",
      "command": "change",
      "request_seq": 10,
      "success": true
    }
After Request
ScriptInfos::
/home/src/tslibs/TS/Lib/lib.d.ts
    version: Text-1
    containingProjects: 2
        /dev/null/inferredProject1*
        /home/src/workspaces/project/packages/pkg-1/tsconfig.json
/home/src/tslibs/TS/Lib/lib.decorators.d.ts
    version: Text-1
    containingProjects: 2
        /dev/null/inferredProject1*
        /home/src/workspaces/project/packages/pkg-1/tsconfig.json
/home/src/tslibs/TS/Lib/lib.decorators.legacy.d.ts
    version: Text-1
    containingProjects: 2
        /dev/null/inferredProject1*
        /home/src/workspaces/project/packages/pkg-1/tsconfig.json
/home/src/workspaces/project/packages/pkg-1/src/index.ts (Open) *changed*
    version: SVC-1-2 *changed*
    containingProjects: 1
        /home/src/workspaces/project/packages/pkg-1/tsconfig.json *default*
/home/src/workspaces/project/packages/pkg-2/src/index.ts
    version: Text-1
    containingProjects: 1
        /dev/null/autoImportProviderProject1*
/home/src/workspaces/project/packages/pkg-2/src/utils.ts
    version: Text-1
    containingProjects: 1
        /dev/null/autoImportProviderProject1*
/home/src/workspaces/project/tsconfig.base.json (Open)
    version: SVC-1-0
    containingProjects: 1
        /dev/null/inferredProject1* *default*

Info seq  [hh:mm:ss:mss] request:
    {
      "seq": 11,
      "type": "request",
      "arguments": {
        "file": "/home/src/workspaces/project/packages/pkg-2/src/blah/foo/data.ts"
      },
      "command": "open"
    }
Info seq  [hh:mm:ss:mss] getConfigFileNameForFile:: File: /home/src/workspaces/project/packages/pkg-2/src/blah/foo/data.ts ProjectRootPath: undefined:: Result: /home/src/workspaces/project/packages/pkg-2/tsconfig.json
Info seq  [hh:mm:ss:mss] Creating ConfiguredProject: /home/src/workspaces/project/packages/pkg-2/tsconfig.json, currentDirectory: /home/src/workspaces/project/packages/pkg-2
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "projectLoadingStart",
      "body": {
        "projectName": "/home/src/workspaces/project/packages/pkg-2/tsconfig.json",
        "reason": "Creating possible configured project for /home/src/workspaces/project/packages/pkg-2/src/blah/foo/data.ts to open"
      }
    }
Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: /home/src/workspaces/project/packages/pkg-2/tsconfig.json
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /home/src/workspaces/project/packages/pkg-2/node_modules 1 undefined Project: /home/src/workspaces/project/packages/pkg-2/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /home/src/workspaces/project/packages/pkg-2/node_modules 1 undefined Project: /home/src/workspaces/project/packages/pkg-2/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /home/src/workspaces/project/packages/node_modules 1 undefined Project: /home/src/workspaces/project/packages/pkg-2/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /home/src/workspaces/project/packages/node_modules 1 undefined Project: /home/src/workspaces/project/packages/pkg-2/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /home/src/workspaces/project/node_modules 1 undefined Project: /home/src/workspaces/project/packages/pkg-2/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /home/src/workspaces/project/node_modules 1 undefined Project: /home/src/workspaces/project/packages/pkg-2/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /home/src/workspaces/node_modules 1 undefined Project: /home/src/workspaces/project/packages/pkg-2/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /home/src/workspaces/node_modules 1 undefined Project: /home/src/workspaces/project/packages/pkg-2/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /home/src/workspaces/project/packages/pkg-2/node_modules/@types 1 undefined Project: /home/src/workspaces/project/packages/pkg-2/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /home/src/workspaces/project/packages/pkg-2/node_modules/@types 1 undefined Project: /home/src/workspaces/project/packages/pkg-2/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /home/src/workspaces/project/packages/node_modules/@types 1 undefined Project: /home/src/workspaces/project/packages/pkg-2/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /home/src/workspaces/project/packages/node_modules/@types 1 undefined Project: /home/src/workspaces/project/packages/pkg-2/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /home/src/workspaces/project/node_modules/@types 1 undefined Project: /home/src/workspaces/project/packages/pkg-2/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /home/src/workspaces/project/node_modules/@types 1 undefined Project: /home/src/workspaces/project/packages/pkg-2/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /home/src/workspaces/node_modules/@types 1 undefined Project: /home/src/workspaces/project/packages/pkg-2/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /home/src/workspaces/node_modules/@types 1 undefined Project: /home/src/workspaces/project/packages/pkg-2/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: /home/src/workspaces/project/packages/pkg-2/tsconfig.json projectStateVersion: 1 projectProgramVersion: 0 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Project '/home/src/workspaces/project/packages/pkg-2/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (6)
	/home/src/tslibs/TS/Lib/lib.d.ts Text-1 lib.d.ts-Text
	/home/src/tslibs/TS/Lib/lib.decorators.d.ts Text-1 lib.decorators.d.ts-Text
	/home/src/tslibs/TS/Lib/lib.decorators.legacy.d.ts Text-1 lib.decorators.legacy.d.ts-Text
	/home/src/workspaces/project/packages/pkg-2/src/utils.ts Text-1 "export const Pkg2 = {};"
	/home/src/workspaces/project/packages/pkg-2/src/index.ts Text-1 "import \"./utils\";"
	/home/src/workspaces/project/packages/pkg-2/src/blah/foo/data.ts SVC-1-0 "Pkg2"


	../../../../tslibs/TS/Lib/lib.d.ts
	  Default library for target 'es5'
	../../../../tslibs/TS/Lib/lib.decorators.d.ts
	  Library referenced via 'decorators' from file '../../../../tslibs/TS/Lib/lib.d.ts'
	../../../../tslibs/TS/Lib/lib.decorators.legacy.d.ts
	  Library referenced via 'decorators.legacy' from file '../../../../tslibs/TS/Lib/lib.d.ts'
	src/utils.ts
	  Imported via "./utils" from file 'src/index.ts'
	  Matched by default include pattern '**/*'
	src/index.ts
	  Matched by default include pattern '**/*'
	src/blah/foo/data.ts
	  Matched by default include pattern '**/*'

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/workspaces/project/packages/pkg-2/package.json 250 undefined WatchType: package.json file
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "projectLoadingFinish",
      "body": {
        "projectName": "/home/src/workspaces/project/packages/pkg-2/tsconfig.json"
      }
    }
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "configFileDiag",
      "body": {
        "triggerFile": "/home/src/workspaces/project/packages/pkg-2/src/blah/foo/data.ts",
        "configFile": "/home/src/workspaces/project/packages/pkg-2/tsconfig.json",
        "diagnostics": []
      }
    }
Info seq  [hh:mm:ss:mss] getConfigFileNameForFile:: File: /home/src/workspaces/project/packages/pkg-2/tsconfig.json ProjectRootPath: undefined:: Result: undefined
Info seq  [hh:mm:ss:mss] Project '/home/src/workspaces/project/packages/pkg-1/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (4)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Project '/dev/null/autoImportProviderProject1*' (AutoImportProvider)
Info seq  [hh:mm:ss:mss] 	Files (2)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Project '/home/src/workspaces/project/packages/pkg-2/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (6)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Project '/dev/null/inferredProject1*' (Inferred)
Info seq  [hh:mm:ss:mss] 	Files (4)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: /home/src/workspaces/project/tsconfig.base.json ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /dev/null/inferredProject1*
Info seq  [hh:mm:ss:mss] 	FileName: /home/src/workspaces/project/packages/pkg-1/src/index.ts ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /home/src/workspaces/project/packages/pkg-1/tsconfig.json
Info seq  [hh:mm:ss:mss] 	FileName: /home/src/workspaces/project/packages/pkg-2/src/blah/foo/data.ts ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /home/src/workspaces/project/packages/pkg-2/tsconfig.json
Info seq  [hh:mm:ss:mss] response:
    {
      "seq": 0,
      "type": "response",
      "command": "open",
      "request_seq": 11,
      "success": true,
      "performanceData": {
        "updateGraphDurationMs": *
      }
    }
After Request
watchedFiles::
/home/src/tslibs/TS/Lib/lib.d.ts:
  {"pollingInterval":500}
/home/src/tslibs/TS/Lib/lib.decorators.d.ts:
  {"pollingInterval":500}
/home/src/tslibs/TS/Lib/lib.decorators.legacy.d.ts:
  {"pollingInterval":500}
/home/src/workspaces/project/jsconfig.json:
  {"pollingInterval":2000}
/home/src/workspaces/project/packages/pkg-1/package.json:
  {"pollingInterval":250}
/home/src/workspaces/project/packages/pkg-1/tsconfig.json:
  {"pollingInterval":2000}
/home/src/workspaces/project/packages/pkg-2/package.json: *new*
  {"pollingInterval":250}
/home/src/workspaces/project/packages/pkg-2/src/index.ts:
  {"pollingInterval":500}
/home/src/workspaces/project/packages/pkg-2/src/utils.ts:
  {"pollingInterval":500}
/home/src/workspaces/project/packages/pkg-2/tsconfig.json:
  {"pollingInterval":2000}
/home/src/workspaces/project/tsconfig.base.json:
  {"pollingInterval":2000}
/home/src/workspaces/project/tsconfig.json:
  {"pollingInterval":2000}

watchedDirectoriesRecursive::
/home/src/workspaces/node_modules:
  {}
  {}
  {} *new*
/home/src/workspaces/node_modules/@types:
  {}
  {}
  {} *new*
/home/src/workspaces/project/node_modules:
  {}
  {}
  {} *new*
/home/src/workspaces/project/node_modules/@types:
  {}
  {}
  {} *new*
/home/src/workspaces/project/packages/node_modules:
  {}
  {} *new*
/home/src/workspaces/project/packages/node_modules/@types:
  {}
  {} *new*
/home/src/workspaces/project/packages/pkg-1:
  {}
/home/src/workspaces/project/packages/pkg-1/node_modules:
  {}
  {}
/home/src/workspaces/project/packages/pkg-1/node_modules/@types:
  {}
/home/src/workspaces/project/packages/pkg-2:
  {}
/home/src/workspaces/project/packages/pkg-2/node_modules: *new*
  {}
/home/src/workspaces/project/packages/pkg-2/node_modules/@types: *new*
  {}

Projects::
/dev/null/autoImportProviderProject1* (AutoImportProvider)
    projectStateVersion: 1
    projectProgramVersion: 1
/dev/null/inferredProject1* (Inferred)
    projectStateVersion: 1
    projectProgramVersion: 1
    autoImportProviderHost: false
/home/src/workspaces/project/packages/pkg-1/tsconfig.json (Configured)
    projectStateVersion: 2
    projectProgramVersion: 1
    dirty: true
    autoImportProviderHost: /dev/null/autoImportProviderProject1*
/home/src/workspaces/project/packages/pkg-2/tsconfig.json (Configured) *new*
    projectStateVersion: 1
    projectProgramVersion: 1
    autoImportProviderHost: false

ScriptInfos::
/home/src/tslibs/TS/Lib/lib.d.ts *changed*
    version: Text-1
    containingProjects: 3 *changed*
        /dev/null/inferredProject1*
        /home/src/workspaces/project/packages/pkg-1/tsconfig.json
        /home/src/workspaces/project/packages/pkg-2/tsconfig.json *new*
/home/src/tslibs/TS/Lib/lib.decorators.d.ts *changed*
    version: Text-1
    containingProjects: 3 *changed*
        /dev/null/inferredProject1*
        /home/src/workspaces/project/packages/pkg-1/tsconfig.json
        /home/src/workspaces/project/packages/pkg-2/tsconfig.json *new*
/home/src/tslibs/TS/Lib/lib.decorators.legacy.d.ts *changed*
    version: Text-1
    containingProjects: 3 *changed*
        /dev/null/inferredProject1*
        /home/src/workspaces/project/packages/pkg-1/tsconfig.json
        /home/src/workspaces/project/packages/pkg-2/tsconfig.json *new*
/home/src/workspaces/project/packages/pkg-1/src/index.ts (Open)
    version: SVC-1-2
    containingProjects: 1
        /home/src/workspaces/project/packages/pkg-1/tsconfig.json *default*
/home/src/workspaces/project/packages/pkg-2/src/blah/foo/data.ts (Open) *new*
    version: SVC-1-0
    containingProjects: 1
        /home/src/workspaces/project/packages/pkg-2/tsconfig.json *default*
/home/src/workspaces/project/packages/pkg-2/src/index.ts *changed*
    version: Text-1
    containingProjects: 2 *changed*
        /dev/null/autoImportProviderProject1*
        /home/src/workspaces/project/packages/pkg-2/tsconfig.json *new*
/home/src/workspaces/project/packages/pkg-2/src/utils.ts *changed*
    version: Text-1
    containingProjects: 2 *changed*
        /dev/null/autoImportProviderProject1*
        /home/src/workspaces/project/packages/pkg-2/tsconfig.json *new*
/home/src/workspaces/project/tsconfig.base.json (Open)
    version: SVC-1-0
    containingProjects: 1
        /dev/null/inferredProject1* *default*

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
        "file": "/home/src/workspaces/project/packages/pkg-2/src/blah/foo/data.ts",
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
        "file": "/home/src/workspaces/project/packages/pkg-2/src/blah/foo/data.ts",
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
        "file": "/home/src/workspaces/project/packages/pkg-2/src/blah/foo/data.ts",
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
        "file": "/home/src/workspaces/project/packages/pkg-2/src/blah/foo/data.ts",
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
              "fileName": "/home/src/workspaces/project/packages/pkg-2/src/blah/foo/data.ts",
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
        "file": "/home/src/workspaces/project/packages/pkg-2/src/blah/foo/data.ts",
        "line": 1,
        "offset": 1,
        "endLine": 1,
        "endOffset": 1,
        "insertString": "import { Pkg2 } from \"../../utils\";\n\n"
      },
      "command": "change"
    }
Info seq  [hh:mm:ss:mss] response:
    {
      "seq": 0,
      "type": "response",
      "command": "change",
      "request_seq": 18,
      "success": true
    }
After Request
Projects::
/dev/null/autoImportProviderProject1* (AutoImportProvider)
    projectStateVersion: 1
    projectProgramVersion: 1
/dev/null/inferredProject1* (Inferred)
    projectStateVersion: 1
    projectProgramVersion: 1
    autoImportProviderHost: false
/home/src/workspaces/project/packages/pkg-1/tsconfig.json (Configured)
    projectStateVersion: 2
    projectProgramVersion: 1
    dirty: true
    autoImportProviderHost: /dev/null/autoImportProviderProject1*
/home/src/workspaces/project/packages/pkg-2/tsconfig.json (Configured) *changed*
    projectStateVersion: 2 *changed*
    projectProgramVersion: 1
    dirty: true *changed*
    autoImportProviderHost: false

ScriptInfos::
/home/src/tslibs/TS/Lib/lib.d.ts
    version: Text-1
    containingProjects: 3
        /dev/null/inferredProject1*
        /home/src/workspaces/project/packages/pkg-1/tsconfig.json
        /home/src/workspaces/project/packages/pkg-2/tsconfig.json
/home/src/tslibs/TS/Lib/lib.decorators.d.ts
    version: Text-1
    containingProjects: 3
        /dev/null/inferredProject1*
        /home/src/workspaces/project/packages/pkg-1/tsconfig.json
        /home/src/workspaces/project/packages/pkg-2/tsconfig.json
/home/src/tslibs/TS/Lib/lib.decorators.legacy.d.ts
    version: Text-1
    containingProjects: 3
        /dev/null/inferredProject1*
        /home/src/workspaces/project/packages/pkg-1/tsconfig.json
        /home/src/workspaces/project/packages/pkg-2/tsconfig.json
/home/src/workspaces/project/packages/pkg-1/src/index.ts (Open)
    version: SVC-1-2
    containingProjects: 1
        /home/src/workspaces/project/packages/pkg-1/tsconfig.json *default*
/home/src/workspaces/project/packages/pkg-2/src/blah/foo/data.ts (Open) *changed*
    version: SVC-1-1 *changed*
    containingProjects: 1
        /home/src/workspaces/project/packages/pkg-2/tsconfig.json *default*
/home/src/workspaces/project/packages/pkg-2/src/index.ts
    version: Text-1
    containingProjects: 2
        /dev/null/autoImportProviderProject1*
        /home/src/workspaces/project/packages/pkg-2/tsconfig.json
/home/src/workspaces/project/packages/pkg-2/src/utils.ts
    version: Text-1
    containingProjects: 2
        /dev/null/autoImportProviderProject1*
        /home/src/workspaces/project/packages/pkg-2/tsconfig.json
/home/src/workspaces/project/tsconfig.base.json (Open)
    version: SVC-1-0
    containingProjects: 1
        /dev/null/inferredProject1* *default*

Info seq  [hh:mm:ss:mss] request:
    {
      "seq": 19,
      "type": "request",
      "arguments": {
        "file": "/home/src/workspaces/project/packages/pkg-2/src/blah/foo/data.ts",
        "line": 1,
        "offset": 1,
        "endLine": 3,
        "endOffset": 1,
        "insertString": ""
      },
      "command": "change"
    }
Info seq  [hh:mm:ss:mss] response:
    {
      "seq": 0,
      "type": "response",
      "command": "change",
      "request_seq": 19,
      "success": true
    }
After Request
ScriptInfos::
/home/src/tslibs/TS/Lib/lib.d.ts
    version: Text-1
    containingProjects: 3
        /dev/null/inferredProject1*
        /home/src/workspaces/project/packages/pkg-1/tsconfig.json
        /home/src/workspaces/project/packages/pkg-2/tsconfig.json
/home/src/tslibs/TS/Lib/lib.decorators.d.ts
    version: Text-1
    containingProjects: 3
        /dev/null/inferredProject1*
        /home/src/workspaces/project/packages/pkg-1/tsconfig.json
        /home/src/workspaces/project/packages/pkg-2/tsconfig.json
/home/src/tslibs/TS/Lib/lib.decorators.legacy.d.ts
    version: Text-1
    containingProjects: 3
        /dev/null/inferredProject1*
        /home/src/workspaces/project/packages/pkg-1/tsconfig.json
        /home/src/workspaces/project/packages/pkg-2/tsconfig.json
/home/src/workspaces/project/packages/pkg-1/src/index.ts (Open)
    version: SVC-1-2
    containingProjects: 1
        /home/src/workspaces/project/packages/pkg-1/tsconfig.json *default*
/home/src/workspaces/project/packages/pkg-2/src/blah/foo/data.ts (Open) *changed*
    version: SVC-1-2 *changed*
    containingProjects: 1
        /home/src/workspaces/project/packages/pkg-2/tsconfig.json *default*
/home/src/workspaces/project/packages/pkg-2/src/index.ts
    version: Text-1
    containingProjects: 2
        /dev/null/autoImportProviderProject1*
        /home/src/workspaces/project/packages/pkg-2/tsconfig.json
/home/src/workspaces/project/packages/pkg-2/src/utils.ts
    version: Text-1
    containingProjects: 2
        /dev/null/autoImportProviderProject1*
        /home/src/workspaces/project/packages/pkg-2/tsconfig.json
/home/src/workspaces/project/tsconfig.base.json (Open)
    version: SVC-1-0
    containingProjects: 1
        /dev/null/inferredProject1* *default*
