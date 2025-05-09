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

//// [/home/src/workspaces/project/apps/app1/src/app.ts]
utils

//// [/home/src/workspaces/project/apps/app1/src/index.ts]
shared

//// [/home/src/workspaces/project/apps/app1/src/utils.ts]
export const utils = 0;

//// [/home/src/workspaces/project/apps/app1/tsconfig.json]
{
  "compilerOptions": {
    "module": "commonjs",
    "paths": {
      "shared/*": ["../../shared/*"]
    }
  },
  "include": ["src", "../../shared"]
}

//// [/home/src/workspaces/project/shared/constants.ts]
export const shared = 0;

//// [/home/src/workspaces/project/shared/data.ts]
shared


Info seq  [hh:mm:ss:mss] request:
    {
      "seq": 0,
      "type": "request",
      "arguments": {
        "file": "/home/src/workspaces/project/apps/app1/tsconfig.json"
      },
      "command": "open"
    }
Info seq  [hh:mm:ss:mss] getConfigFileNameForFile:: File: /home/src/workspaces/project/apps/app1/tsconfig.json ProjectRootPath: undefined:: Result: /home/src/workspaces/project/apps/app1/tsconfig.json
Info seq  [hh:mm:ss:mss] Creating ConfiguredProject: /home/src/workspaces/project/apps/app1/tsconfig.json, currentDirectory: /home/src/workspaces/project/apps/app1
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/workspaces/project/apps/app1/tsconfig.json 2000 undefined Project: /home/src/workspaces/project/apps/app1/tsconfig.json WatchType: Config file
Info seq  [hh:mm:ss:mss] Config: /home/src/workspaces/project/apps/app1/tsconfig.json : {
 "rootNames": [
  "/home/src/workspaces/project/apps/app1/src/app.ts",
  "/home/src/workspaces/project/apps/app1/src/index.ts",
  "/home/src/workspaces/project/apps/app1/src/utils.ts",
  "/home/src/workspaces/project/shared/constants.ts",
  "/home/src/workspaces/project/shared/data.ts"
 ],
 "options": {
  "module": 1,
  "paths": {
   "shared/*": [
    "../../shared/*"
   ]
  },
  "pathsBasePath": "/home/src/workspaces/project/apps/app1",
  "configFilePath": "/home/src/workspaces/project/apps/app1/tsconfig.json"
 }
}
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "projectLoadingStart",
      "body": {
        "projectName": "/home/src/workspaces/project/apps/app1/tsconfig.json",
        "reason": "Creating possible configured project for /home/src/workspaces/project/apps/app1/tsconfig.json to open"
      }
    }
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /home/src/workspaces/project/apps/app1/src 1 undefined Config: /home/src/workspaces/project/apps/app1/tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /home/src/workspaces/project/apps/app1/src 1 undefined Config: /home/src/workspaces/project/apps/app1/tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /home/src/workspaces/project/shared 1 undefined Config: /home/src/workspaces/project/apps/app1/tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /home/src/workspaces/project/shared 1 undefined Config: /home/src/workspaces/project/apps/app1/tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/workspaces/project/apps/app1/src/app.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/workspaces/project/apps/app1/src/index.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/workspaces/project/apps/app1/src/utils.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/workspaces/project/shared/constants.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/workspaces/project/shared/data.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: /home/src/workspaces/project/apps/app1/tsconfig.json
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/tslibs/TS/Lib/lib.d.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /home/src/workspaces/project/apps/app1/node_modules 1 undefined Project: /home/src/workspaces/project/apps/app1/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /home/src/workspaces/project/apps/app1/node_modules 1 undefined Project: /home/src/workspaces/project/apps/app1/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /home/src/workspaces/project/apps/node_modules 1 undefined Project: /home/src/workspaces/project/apps/app1/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /home/src/workspaces/project/apps/node_modules 1 undefined Project: /home/src/workspaces/project/apps/app1/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /home/src/workspaces/project/node_modules 1 undefined Project: /home/src/workspaces/project/apps/app1/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /home/src/workspaces/project/node_modules 1 undefined Project: /home/src/workspaces/project/apps/app1/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /home/src/workspaces/node_modules 1 undefined Project: /home/src/workspaces/project/apps/app1/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /home/src/workspaces/node_modules 1 undefined Project: /home/src/workspaces/project/apps/app1/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/tslibs/TS/Lib/lib.decorators.d.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/tslibs/TS/Lib/lib.decorators.legacy.d.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /home/src/workspaces/project/apps/app1/node_modules/@types 1 undefined Project: /home/src/workspaces/project/apps/app1/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /home/src/workspaces/project/apps/app1/node_modules/@types 1 undefined Project: /home/src/workspaces/project/apps/app1/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /home/src/workspaces/project/apps/node_modules/@types 1 undefined Project: /home/src/workspaces/project/apps/app1/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /home/src/workspaces/project/apps/node_modules/@types 1 undefined Project: /home/src/workspaces/project/apps/app1/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /home/src/workspaces/project/node_modules/@types 1 undefined Project: /home/src/workspaces/project/apps/app1/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /home/src/workspaces/project/node_modules/@types 1 undefined Project: /home/src/workspaces/project/apps/app1/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /home/src/workspaces/node_modules/@types 1 undefined Project: /home/src/workspaces/project/apps/app1/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /home/src/workspaces/node_modules/@types 1 undefined Project: /home/src/workspaces/project/apps/app1/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: /home/src/workspaces/project/apps/app1/tsconfig.json projectStateVersion: 1 projectProgramVersion: 0 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Project '/home/src/workspaces/project/apps/app1/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (8)
	/home/src/tslibs/TS/Lib/lib.d.ts Text-1 lib.d.ts-Text
	/home/src/tslibs/TS/Lib/lib.decorators.d.ts Text-1 lib.decorators.d.ts-Text
	/home/src/tslibs/TS/Lib/lib.decorators.legacy.d.ts Text-1 lib.decorators.legacy.d.ts-Text
	/home/src/workspaces/project/apps/app1/src/app.ts Text-1 "utils"
	/home/src/workspaces/project/apps/app1/src/index.ts Text-1 "shared"
	/home/src/workspaces/project/apps/app1/src/utils.ts Text-1 "export const utils = 0;"
	/home/src/workspaces/project/shared/constants.ts Text-1 "export const shared = 0;"
	/home/src/workspaces/project/shared/data.ts Text-1 "shared"


	../../../../tslibs/TS/Lib/lib.d.ts
	  Default library for target 'es5'
	../../../../tslibs/TS/Lib/lib.decorators.d.ts
	  Library referenced via 'decorators' from file '../../../../tslibs/TS/Lib/lib.d.ts'
	../../../../tslibs/TS/Lib/lib.decorators.legacy.d.ts
	  Library referenced via 'decorators.legacy' from file '../../../../tslibs/TS/Lib/lib.d.ts'
	src/app.ts
	  Matched by include pattern 'src' in 'tsconfig.json'
	src/index.ts
	  Matched by include pattern 'src' in 'tsconfig.json'
	src/utils.ts
	  Matched by include pattern 'src' in 'tsconfig.json'
	../../shared/constants.ts
	  Matched by include pattern '../../shared' in 'tsconfig.json'
	../../shared/data.ts
	  Matched by include pattern '../../shared' in 'tsconfig.json'

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "projectLoadingFinish",
      "body": {
        "projectName": "/home/src/workspaces/project/apps/app1/tsconfig.json"
      }
    }
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "configFileDiag",
      "body": {
        "triggerFile": "/home/src/workspaces/project/apps/app1/tsconfig.json",
        "configFile": "/home/src/workspaces/project/apps/app1/tsconfig.json",
        "diagnostics": []
      }
    }
Info seq  [hh:mm:ss:mss] getConfigFileNameForFile:: File: /home/src/workspaces/project/apps/app1/tsconfig.json ProjectRootPath: undefined:: Result: undefined
Info seq  [hh:mm:ss:mss] Creating InferredProject: /dev/null/inferredProject1*, currentDirectory: /home/src/workspaces/project/apps/app1
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/workspaces/project/apps/app1/jsconfig.json 2000 undefined WatchType: Config file for the inferred project root
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/workspaces/project/apps/tsconfig.json 2000 undefined WatchType: Config file for the inferred project root
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/workspaces/project/apps/jsconfig.json 2000 undefined WatchType: Config file for the inferred project root
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/workspaces/project/tsconfig.json 2000 undefined WatchType: Config file for the inferred project root
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/workspaces/project/jsconfig.json 2000 undefined WatchType: Config file for the inferred project root
Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: /dev/null/inferredProject1*
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /home/src/workspaces/project/apps/app1/node_modules 1 undefined Project: /dev/null/inferredProject1* WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /home/src/workspaces/project/apps/app1/node_modules 1 undefined Project: /dev/null/inferredProject1* WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /home/src/workspaces/project/apps/node_modules 1 undefined Project: /dev/null/inferredProject1* WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /home/src/workspaces/project/apps/node_modules 1 undefined Project: /dev/null/inferredProject1* WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /home/src/workspaces/project/node_modules 1 undefined Project: /dev/null/inferredProject1* WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /home/src/workspaces/project/node_modules 1 undefined Project: /dev/null/inferredProject1* WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /home/src/workspaces/node_modules 1 undefined Project: /dev/null/inferredProject1* WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /home/src/workspaces/node_modules 1 undefined Project: /dev/null/inferredProject1* WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /home/src/workspaces/project/apps/app1/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /home/src/workspaces/project/apps/app1/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /home/src/workspaces/project/apps/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /home/src/workspaces/project/apps/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
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
	/home/src/workspaces/project/apps/app1/tsconfig.json SVC-1-0 "{\n  \"compilerOptions\": {\n    \"module\": \"commonjs\",\n    \"paths\": {\n      \"shared/*\": [\"../../shared/*\"]\n    }\n  },\n  \"include\": [\"src\", \"../../shared\"]\n}"


	../../../../tslibs/TS/Lib/lib.d.ts
	  Default library for target 'es5'
	../../../../tslibs/TS/Lib/lib.decorators.d.ts
	  Library referenced via 'decorators' from file '../../../../tslibs/TS/Lib/lib.d.ts'
	../../../../tslibs/TS/Lib/lib.decorators.legacy.d.ts
	  Library referenced via 'decorators.legacy' from file '../../../../tslibs/TS/Lib/lib.d.ts'
	tsconfig.json
	  Root file specified for compilation

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Project '/home/src/workspaces/project/apps/app1/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (8)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Project '/dev/null/inferredProject1*' (Inferred)
Info seq  [hh:mm:ss:mss] 	Files (4)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: /home/src/workspaces/project/apps/app1/tsconfig.json ProjectRootPath: undefined
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
/home/src/workspaces/project/apps/app1/jsconfig.json: *new*
  {"pollingInterval":2000}
/home/src/workspaces/project/apps/app1/src/app.ts: *new*
  {"pollingInterval":500}
/home/src/workspaces/project/apps/app1/src/index.ts: *new*
  {"pollingInterval":500}
/home/src/workspaces/project/apps/app1/src/utils.ts: *new*
  {"pollingInterval":500}
/home/src/workspaces/project/apps/app1/tsconfig.json: *new*
  {"pollingInterval":2000}
/home/src/workspaces/project/apps/jsconfig.json: *new*
  {"pollingInterval":2000}
/home/src/workspaces/project/apps/tsconfig.json: *new*
  {"pollingInterval":2000}
/home/src/workspaces/project/jsconfig.json: *new*
  {"pollingInterval":2000}
/home/src/workspaces/project/shared/constants.ts: *new*
  {"pollingInterval":500}
/home/src/workspaces/project/shared/data.ts: *new*
  {"pollingInterval":500}
/home/src/workspaces/project/tsconfig.json: *new*
  {"pollingInterval":2000}

watchedDirectoriesRecursive::
/home/src/workspaces/node_modules: *new*
  {}
  {}
/home/src/workspaces/node_modules/@types: *new*
  {}
  {}
/home/src/workspaces/project/apps/app1/node_modules: *new*
  {}
  {}
/home/src/workspaces/project/apps/app1/node_modules/@types: *new*
  {}
  {}
/home/src/workspaces/project/apps/app1/src: *new*
  {}
/home/src/workspaces/project/apps/node_modules: *new*
  {}
  {}
/home/src/workspaces/project/apps/node_modules/@types: *new*
  {}
  {}
/home/src/workspaces/project/node_modules: *new*
  {}
  {}
/home/src/workspaces/project/node_modules/@types: *new*
  {}
  {}
/home/src/workspaces/project/shared: *new*
  {}

Projects::
/dev/null/inferredProject1* (Inferred) *new*
    projectStateVersion: 1
    projectProgramVersion: 1
    autoImportProviderHost: false
/home/src/workspaces/project/apps/app1/tsconfig.json (Configured) *new*
    projectStateVersion: 1
    projectProgramVersion: 1
    noOpenRef: true

ScriptInfos::
/home/src/tslibs/TS/Lib/lib.d.ts *new*
    version: Text-1
    containingProjects: 2
        /home/src/workspaces/project/apps/app1/tsconfig.json
        /dev/null/inferredProject1*
/home/src/tslibs/TS/Lib/lib.decorators.d.ts *new*
    version: Text-1
    containingProjects: 2
        /home/src/workspaces/project/apps/app1/tsconfig.json
        /dev/null/inferredProject1*
/home/src/tslibs/TS/Lib/lib.decorators.legacy.d.ts *new*
    version: Text-1
    containingProjects: 2
        /home/src/workspaces/project/apps/app1/tsconfig.json
        /dev/null/inferredProject1*
/home/src/workspaces/project/apps/app1/src/app.ts *new*
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/apps/app1/tsconfig.json
/home/src/workspaces/project/apps/app1/src/index.ts *new*
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/apps/app1/tsconfig.json
/home/src/workspaces/project/apps/app1/src/utils.ts *new*
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/apps/app1/tsconfig.json
/home/src/workspaces/project/apps/app1/tsconfig.json (Open) *new*
    version: SVC-1-0
    containingProjects: 1
        /dev/null/inferredProject1* *default*
/home/src/workspaces/project/shared/constants.ts *new*
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/apps/app1/tsconfig.json
/home/src/workspaces/project/shared/data.ts *new*
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/apps/app1/tsconfig.json

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
        "file": "/home/src/workspaces/project/apps/app1/src/index.ts"
      },
      "command": "open"
    }
Info seq  [hh:mm:ss:mss] FileWatcher:: Close:: WatchInfo: /home/src/workspaces/project/apps/app1/src/index.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] getConfigFileNameForFile:: File: /home/src/workspaces/project/apps/app1/src/index.ts ProjectRootPath: undefined:: Result: /home/src/workspaces/project/apps/app1/tsconfig.json
Info seq  [hh:mm:ss:mss] Project '/home/src/workspaces/project/apps/app1/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (8)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Project '/dev/null/inferredProject1*' (Inferred)
Info seq  [hh:mm:ss:mss] 	Files (4)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: /home/src/workspaces/project/apps/app1/tsconfig.json ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /dev/null/inferredProject1*
Info seq  [hh:mm:ss:mss] 	FileName: /home/src/workspaces/project/apps/app1/src/index.ts ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /home/src/workspaces/project/apps/app1/tsconfig.json
Info seq  [hh:mm:ss:mss] response:
    {
      "seq": 0,
      "type": "response",
      "command": "open",
      "request_seq": 2,
      "success": true
    }
After Request
watchedFiles::
/home/src/tslibs/TS/Lib/lib.d.ts:
  {"pollingInterval":500}
/home/src/tslibs/TS/Lib/lib.decorators.d.ts:
  {"pollingInterval":500}
/home/src/tslibs/TS/Lib/lib.decorators.legacy.d.ts:
  {"pollingInterval":500}
/home/src/workspaces/project/apps/app1/jsconfig.json:
  {"pollingInterval":2000}
/home/src/workspaces/project/apps/app1/src/app.ts:
  {"pollingInterval":500}
/home/src/workspaces/project/apps/app1/src/utils.ts:
  {"pollingInterval":500}
/home/src/workspaces/project/apps/app1/tsconfig.json:
  {"pollingInterval":2000}
/home/src/workspaces/project/apps/jsconfig.json:
  {"pollingInterval":2000}
/home/src/workspaces/project/apps/tsconfig.json:
  {"pollingInterval":2000}
/home/src/workspaces/project/jsconfig.json:
  {"pollingInterval":2000}
/home/src/workspaces/project/shared/constants.ts:
  {"pollingInterval":500}
/home/src/workspaces/project/shared/data.ts:
  {"pollingInterval":500}
/home/src/workspaces/project/tsconfig.json:
  {"pollingInterval":2000}

watchedFiles *deleted*::
/home/src/workspaces/project/apps/app1/src/index.ts:
  {"pollingInterval":500}

watchedDirectoriesRecursive::
/home/src/workspaces/node_modules:
  {}
  {}
/home/src/workspaces/node_modules/@types:
  {}
  {}
/home/src/workspaces/project/apps/app1/node_modules:
  {}
  {}
/home/src/workspaces/project/apps/app1/node_modules/@types:
  {}
  {}
/home/src/workspaces/project/apps/app1/src:
  {}
/home/src/workspaces/project/apps/node_modules:
  {}
  {}
/home/src/workspaces/project/apps/node_modules/@types:
  {}
  {}
/home/src/workspaces/project/node_modules:
  {}
  {}
/home/src/workspaces/project/node_modules/@types:
  {}
  {}
/home/src/workspaces/project/shared:
  {}

Projects::
/dev/null/inferredProject1* (Inferred)
    projectStateVersion: 1
    projectProgramVersion: 1
    autoImportProviderHost: false
/home/src/workspaces/project/apps/app1/tsconfig.json (Configured) *changed*
    projectStateVersion: 1
    projectProgramVersion: 1
    noOpenRef: false *changed*

ScriptInfos::
/home/src/tslibs/TS/Lib/lib.d.ts
    version: Text-1
    containingProjects: 2
        /home/src/workspaces/project/apps/app1/tsconfig.json
        /dev/null/inferredProject1*
/home/src/tslibs/TS/Lib/lib.decorators.d.ts
    version: Text-1
    containingProjects: 2
        /home/src/workspaces/project/apps/app1/tsconfig.json
        /dev/null/inferredProject1*
/home/src/tslibs/TS/Lib/lib.decorators.legacy.d.ts
    version: Text-1
    containingProjects: 2
        /home/src/workspaces/project/apps/app1/tsconfig.json
        /dev/null/inferredProject1*
/home/src/workspaces/project/apps/app1/src/app.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/apps/app1/tsconfig.json
/home/src/workspaces/project/apps/app1/src/index.ts (Open) *changed*
    open: true *changed*
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/apps/app1/tsconfig.json *default*
/home/src/workspaces/project/apps/app1/src/utils.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/apps/app1/tsconfig.json
/home/src/workspaces/project/apps/app1/tsconfig.json (Open)
    version: SVC-1-0
    containingProjects: 1
        /dev/null/inferredProject1* *default*
/home/src/workspaces/project/shared/constants.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/apps/app1/tsconfig.json
/home/src/workspaces/project/shared/data.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/apps/app1/tsconfig.json

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
        "file": "/home/src/workspaces/project/apps/app1/src/index.ts",
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
        "file": "/home/src/workspaces/project/apps/app1/src/index.ts",
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
          "message": "Cannot find name 'shared'.",
          "start": 0,
          "length": 6,
          "category": "error",
          "code": 2304,
          "startLocation": {
            "line": 1,
            "offset": 1
          },
          "endLocation": {
            "line": 1,
            "offset": 7
          }
        }
      ]
    }
Info seq  [hh:mm:ss:mss] request:
    {
      "seq": 7,
      "type": "request",
      "arguments": {
        "file": "/home/src/workspaces/project/apps/app1/src/index.ts",
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
        "file": "/home/src/workspaces/project/apps/app1/src/index.ts",
        "startLine": 1,
        "startOffset": 1,
        "endLine": 1,
        "endOffset": 7,
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
      "request_seq": 8,
      "success": true,
      "body": [
        {
          "fixName": "import",
          "description": "Add import from \"shared/constants\"",
          "changes": [
            {
              "fileName": "/home/src/workspaces/project/apps/app1/src/index.ts",
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
                  "newText": "import { shared } from \"shared/constants\";\n\n"
                }
              ]
            }
          ]
        }
      ]
    }
After Request
Projects::
/dev/null/inferredProject1* (Inferred)
    projectStateVersion: 1
    projectProgramVersion: 1
    autoImportProviderHost: false
/home/src/workspaces/project/apps/app1/tsconfig.json (Configured) *changed*
    projectStateVersion: 1
    projectProgramVersion: 1
    autoImportProviderHost: false *changed*

Info seq  [hh:mm:ss:mss] request:
    {
      "seq": 9,
      "type": "request",
      "arguments": {
        "file": "/home/src/workspaces/project/apps/app1/src/index.ts",
        "line": 1,
        "offset": 1,
        "endLine": 1,
        "endOffset": 1,
        "insertString": "import { shared } from \"shared/constants\";\n\n"
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
/dev/null/inferredProject1* (Inferred)
    projectStateVersion: 1
    projectProgramVersion: 1
    autoImportProviderHost: false
/home/src/workspaces/project/apps/app1/tsconfig.json (Configured) *changed*
    projectStateVersion: 2 *changed*
    projectProgramVersion: 1
    dirty: true *changed*
    autoImportProviderHost: false

ScriptInfos::
/home/src/tslibs/TS/Lib/lib.d.ts
    version: Text-1
    containingProjects: 2
        /home/src/workspaces/project/apps/app1/tsconfig.json
        /dev/null/inferredProject1*
/home/src/tslibs/TS/Lib/lib.decorators.d.ts
    version: Text-1
    containingProjects: 2
        /home/src/workspaces/project/apps/app1/tsconfig.json
        /dev/null/inferredProject1*
/home/src/tslibs/TS/Lib/lib.decorators.legacy.d.ts
    version: Text-1
    containingProjects: 2
        /home/src/workspaces/project/apps/app1/tsconfig.json
        /dev/null/inferredProject1*
/home/src/workspaces/project/apps/app1/src/app.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/apps/app1/tsconfig.json
/home/src/workspaces/project/apps/app1/src/index.ts (Open) *changed*
    version: SVC-2-1 *changed*
    containingProjects: 1
        /home/src/workspaces/project/apps/app1/tsconfig.json *default*
/home/src/workspaces/project/apps/app1/src/utils.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/apps/app1/tsconfig.json
/home/src/workspaces/project/apps/app1/tsconfig.json (Open)
    version: SVC-1-0
    containingProjects: 1
        /dev/null/inferredProject1* *default*
/home/src/workspaces/project/shared/constants.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/apps/app1/tsconfig.json
/home/src/workspaces/project/shared/data.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/apps/app1/tsconfig.json

Info seq  [hh:mm:ss:mss] request:
    {
      "seq": 10,
      "type": "request",
      "arguments": {
        "file": "/home/src/workspaces/project/apps/app1/src/index.ts",
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
        /home/src/workspaces/project/apps/app1/tsconfig.json
        /dev/null/inferredProject1*
/home/src/tslibs/TS/Lib/lib.decorators.d.ts
    version: Text-1
    containingProjects: 2
        /home/src/workspaces/project/apps/app1/tsconfig.json
        /dev/null/inferredProject1*
/home/src/tslibs/TS/Lib/lib.decorators.legacy.d.ts
    version: Text-1
    containingProjects: 2
        /home/src/workspaces/project/apps/app1/tsconfig.json
        /dev/null/inferredProject1*
/home/src/workspaces/project/apps/app1/src/app.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/apps/app1/tsconfig.json
/home/src/workspaces/project/apps/app1/src/index.ts (Open) *changed*
    version: SVC-2-2 *changed*
    containingProjects: 1
        /home/src/workspaces/project/apps/app1/tsconfig.json *default*
/home/src/workspaces/project/apps/app1/src/utils.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/apps/app1/tsconfig.json
/home/src/workspaces/project/apps/app1/tsconfig.json (Open)
    version: SVC-1-0
    containingProjects: 1
        /dev/null/inferredProject1* *default*
/home/src/workspaces/project/shared/constants.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/apps/app1/tsconfig.json
/home/src/workspaces/project/shared/data.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/apps/app1/tsconfig.json

Info seq  [hh:mm:ss:mss] request:
    {
      "seq": 11,
      "type": "request",
      "arguments": {
        "file": "/home/src/workspaces/project/apps/app1/src/app.ts"
      },
      "command": "open"
    }
Info seq  [hh:mm:ss:mss] FileWatcher:: Close:: WatchInfo: /home/src/workspaces/project/apps/app1/src/app.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] getConfigFileNameForFile:: File: /home/src/workspaces/project/apps/app1/src/app.ts ProjectRootPath: undefined:: Result: /home/src/workspaces/project/apps/app1/tsconfig.json
Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: /home/src/workspaces/project/apps/app1/tsconfig.json
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: /home/src/workspaces/project/apps/app1/tsconfig.json projectStateVersion: 2 projectProgramVersion: 1 structureChanged: false structureIsReused:: Completely Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Project '/home/src/workspaces/project/apps/app1/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (8)
	/home/src/tslibs/TS/Lib/lib.d.ts Text-1 lib.d.ts-Text
	/home/src/tslibs/TS/Lib/lib.decorators.d.ts Text-1 lib.decorators.d.ts-Text
	/home/src/tslibs/TS/Lib/lib.decorators.legacy.d.ts Text-1 lib.decorators.legacy.d.ts-Text
	/home/src/workspaces/project/apps/app1/src/app.ts Text-1 "utils"
	/home/src/workspaces/project/apps/app1/src/index.ts SVC-2-2 "shared"
	/home/src/workspaces/project/apps/app1/src/utils.ts Text-1 "export const utils = 0;"
	/home/src/workspaces/project/shared/constants.ts Text-1 "export const shared = 0;"
	/home/src/workspaces/project/shared/data.ts Text-1 "shared"

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Project '/home/src/workspaces/project/apps/app1/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (8)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Project '/dev/null/inferredProject1*' (Inferred)
Info seq  [hh:mm:ss:mss] 	Files (4)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: /home/src/workspaces/project/apps/app1/tsconfig.json ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /dev/null/inferredProject1*
Info seq  [hh:mm:ss:mss] 	FileName: /home/src/workspaces/project/apps/app1/src/index.ts ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /home/src/workspaces/project/apps/app1/tsconfig.json
Info seq  [hh:mm:ss:mss] 	FileName: /home/src/workspaces/project/apps/app1/src/app.ts ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /home/src/workspaces/project/apps/app1/tsconfig.json
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
/home/src/workspaces/project/apps/app1/jsconfig.json:
  {"pollingInterval":2000}
/home/src/workspaces/project/apps/app1/src/utils.ts:
  {"pollingInterval":500}
/home/src/workspaces/project/apps/app1/tsconfig.json:
  {"pollingInterval":2000}
/home/src/workspaces/project/apps/jsconfig.json:
  {"pollingInterval":2000}
/home/src/workspaces/project/apps/tsconfig.json:
  {"pollingInterval":2000}
/home/src/workspaces/project/jsconfig.json:
  {"pollingInterval":2000}
/home/src/workspaces/project/shared/constants.ts:
  {"pollingInterval":500}
/home/src/workspaces/project/shared/data.ts:
  {"pollingInterval":500}
/home/src/workspaces/project/tsconfig.json:
  {"pollingInterval":2000}

watchedFiles *deleted*::
/home/src/workspaces/project/apps/app1/src/app.ts:
  {"pollingInterval":500}

watchedDirectoriesRecursive::
/home/src/workspaces/node_modules:
  {}
  {}
/home/src/workspaces/node_modules/@types:
  {}
  {}
/home/src/workspaces/project/apps/app1/node_modules:
  {}
  {}
/home/src/workspaces/project/apps/app1/node_modules/@types:
  {}
  {}
/home/src/workspaces/project/apps/app1/src:
  {}
/home/src/workspaces/project/apps/node_modules:
  {}
  {}
/home/src/workspaces/project/apps/node_modules/@types:
  {}
  {}
/home/src/workspaces/project/node_modules:
  {}
  {}
/home/src/workspaces/project/node_modules/@types:
  {}
  {}
/home/src/workspaces/project/shared:
  {}

Projects::
/dev/null/inferredProject1* (Inferred)
    projectStateVersion: 1
    projectProgramVersion: 1
    autoImportProviderHost: false
/home/src/workspaces/project/apps/app1/tsconfig.json (Configured) *changed*
    projectStateVersion: 2
    projectProgramVersion: 1
    dirty: false *changed*
    autoImportProviderHost: false

ScriptInfos::
/home/src/tslibs/TS/Lib/lib.d.ts
    version: Text-1
    containingProjects: 2
        /home/src/workspaces/project/apps/app1/tsconfig.json
        /dev/null/inferredProject1*
/home/src/tslibs/TS/Lib/lib.decorators.d.ts
    version: Text-1
    containingProjects: 2
        /home/src/workspaces/project/apps/app1/tsconfig.json
        /dev/null/inferredProject1*
/home/src/tslibs/TS/Lib/lib.decorators.legacy.d.ts
    version: Text-1
    containingProjects: 2
        /home/src/workspaces/project/apps/app1/tsconfig.json
        /dev/null/inferredProject1*
/home/src/workspaces/project/apps/app1/src/app.ts (Open) *changed*
    open: true *changed*
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/apps/app1/tsconfig.json *default*
/home/src/workspaces/project/apps/app1/src/index.ts (Open)
    version: SVC-2-2
    containingProjects: 1
        /home/src/workspaces/project/apps/app1/tsconfig.json *default*
/home/src/workspaces/project/apps/app1/src/utils.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/apps/app1/tsconfig.json
/home/src/workspaces/project/apps/app1/tsconfig.json (Open)
    version: SVC-1-0
    containingProjects: 1
        /dev/null/inferredProject1* *default*
/home/src/workspaces/project/shared/constants.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/apps/app1/tsconfig.json
/home/src/workspaces/project/shared/data.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/apps/app1/tsconfig.json

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
        "file": "/home/src/workspaces/project/apps/app1/src/app.ts",
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
        "file": "/home/src/workspaces/project/apps/app1/src/app.ts",
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
          "message": "Cannot find name 'utils'.",
          "start": 0,
          "length": 5,
          "category": "error",
          "code": 2304,
          "startLocation": {
            "line": 1,
            "offset": 1
          },
          "endLocation": {
            "line": 1,
            "offset": 6
          }
        }
      ]
    }
Info seq  [hh:mm:ss:mss] request:
    {
      "seq": 16,
      "type": "request",
      "arguments": {
        "file": "/home/src/workspaces/project/apps/app1/src/app.ts",
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
        "file": "/home/src/workspaces/project/apps/app1/src/app.ts",
        "startLine": 1,
        "startOffset": 1,
        "endLine": 1,
        "endOffset": 6,
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
          "description": "Add import from \"./utils\"",
          "changes": [
            {
              "fileName": "/home/src/workspaces/project/apps/app1/src/app.ts",
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
                  "newText": "import { utils } from \"./utils\";\n\n"
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
        "file": "/home/src/workspaces/project/apps/app1/src/app.ts",
        "line": 1,
        "offset": 1,
        "endLine": 1,
        "endOffset": 1,
        "insertString": "import { utils } from \"./utils\";\n\n"
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
/dev/null/inferredProject1* (Inferred)
    projectStateVersion: 1
    projectProgramVersion: 1
    autoImportProviderHost: false
/home/src/workspaces/project/apps/app1/tsconfig.json (Configured) *changed*
    projectStateVersion: 3 *changed*
    projectProgramVersion: 1
    dirty: true *changed*
    autoImportProviderHost: false

ScriptInfos::
/home/src/tslibs/TS/Lib/lib.d.ts
    version: Text-1
    containingProjects: 2
        /home/src/workspaces/project/apps/app1/tsconfig.json
        /dev/null/inferredProject1*
/home/src/tslibs/TS/Lib/lib.decorators.d.ts
    version: Text-1
    containingProjects: 2
        /home/src/workspaces/project/apps/app1/tsconfig.json
        /dev/null/inferredProject1*
/home/src/tslibs/TS/Lib/lib.decorators.legacy.d.ts
    version: Text-1
    containingProjects: 2
        /home/src/workspaces/project/apps/app1/tsconfig.json
        /dev/null/inferredProject1*
/home/src/workspaces/project/apps/app1/src/app.ts (Open) *changed*
    version: SVC-2-1 *changed*
    containingProjects: 1
        /home/src/workspaces/project/apps/app1/tsconfig.json *default*
/home/src/workspaces/project/apps/app1/src/index.ts (Open)
    version: SVC-2-2
    containingProjects: 1
        /home/src/workspaces/project/apps/app1/tsconfig.json *default*
/home/src/workspaces/project/apps/app1/src/utils.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/apps/app1/tsconfig.json
/home/src/workspaces/project/apps/app1/tsconfig.json (Open)
    version: SVC-1-0
    containingProjects: 1
        /dev/null/inferredProject1* *default*
/home/src/workspaces/project/shared/constants.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/apps/app1/tsconfig.json
/home/src/workspaces/project/shared/data.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/apps/app1/tsconfig.json

Info seq  [hh:mm:ss:mss] request:
    {
      "seq": 19,
      "type": "request",
      "arguments": {
        "file": "/home/src/workspaces/project/apps/app1/src/app.ts",
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
    containingProjects: 2
        /home/src/workspaces/project/apps/app1/tsconfig.json
        /dev/null/inferredProject1*
/home/src/tslibs/TS/Lib/lib.decorators.d.ts
    version: Text-1
    containingProjects: 2
        /home/src/workspaces/project/apps/app1/tsconfig.json
        /dev/null/inferredProject1*
/home/src/tslibs/TS/Lib/lib.decorators.legacy.d.ts
    version: Text-1
    containingProjects: 2
        /home/src/workspaces/project/apps/app1/tsconfig.json
        /dev/null/inferredProject1*
/home/src/workspaces/project/apps/app1/src/app.ts (Open) *changed*
    version: SVC-2-2 *changed*
    containingProjects: 1
        /home/src/workspaces/project/apps/app1/tsconfig.json *default*
/home/src/workspaces/project/apps/app1/src/index.ts (Open)
    version: SVC-2-2
    containingProjects: 1
        /home/src/workspaces/project/apps/app1/tsconfig.json *default*
/home/src/workspaces/project/apps/app1/src/utils.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/apps/app1/tsconfig.json
/home/src/workspaces/project/apps/app1/tsconfig.json (Open)
    version: SVC-1-0
    containingProjects: 1
        /dev/null/inferredProject1* *default*
/home/src/workspaces/project/shared/constants.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/apps/app1/tsconfig.json
/home/src/workspaces/project/shared/data.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/apps/app1/tsconfig.json

Info seq  [hh:mm:ss:mss] request:
    {
      "seq": 20,
      "type": "request",
      "arguments": {
        "file": "/home/src/workspaces/project/shared/data.ts"
      },
      "command": "open"
    }
Info seq  [hh:mm:ss:mss] FileWatcher:: Close:: WatchInfo: /home/src/workspaces/project/shared/data.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] getConfigFileNameForFile:: File: /home/src/workspaces/project/shared/data.ts ProjectRootPath: undefined:: Result: undefined
Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: /home/src/workspaces/project/apps/app1/tsconfig.json
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: /home/src/workspaces/project/apps/app1/tsconfig.json projectStateVersion: 3 projectProgramVersion: 1 structureChanged: false structureIsReused:: Completely Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Project '/home/src/workspaces/project/apps/app1/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (8)
	/home/src/tslibs/TS/Lib/lib.d.ts Text-1 lib.d.ts-Text
	/home/src/tslibs/TS/Lib/lib.decorators.d.ts Text-1 lib.decorators.d.ts-Text
	/home/src/tslibs/TS/Lib/lib.decorators.legacy.d.ts Text-1 lib.decorators.legacy.d.ts-Text
	/home/src/workspaces/project/apps/app1/src/app.ts SVC-2-2 "utils"
	/home/src/workspaces/project/apps/app1/src/index.ts SVC-2-2 "shared"
	/home/src/workspaces/project/apps/app1/src/utils.ts Text-1 "export const utils = 0;"
	/home/src/workspaces/project/shared/constants.ts Text-1 "export const shared = 0;"
	/home/src/workspaces/project/shared/data.ts Text-1 "shared"

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Project '/home/src/workspaces/project/apps/app1/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (8)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Project '/dev/null/inferredProject1*' (Inferred)
Info seq  [hh:mm:ss:mss] 	Files (4)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: /home/src/workspaces/project/apps/app1/tsconfig.json ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /dev/null/inferredProject1*
Info seq  [hh:mm:ss:mss] 	FileName: /home/src/workspaces/project/apps/app1/src/index.ts ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /home/src/workspaces/project/apps/app1/tsconfig.json
Info seq  [hh:mm:ss:mss] 	FileName: /home/src/workspaces/project/apps/app1/src/app.ts ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /home/src/workspaces/project/apps/app1/tsconfig.json
Info seq  [hh:mm:ss:mss] 	FileName: /home/src/workspaces/project/shared/data.ts ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /home/src/workspaces/project/apps/app1/tsconfig.json
Info seq  [hh:mm:ss:mss] response:
    {
      "seq": 0,
      "type": "response",
      "command": "open",
      "request_seq": 20,
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
/home/src/workspaces/project/apps/app1/jsconfig.json:
  {"pollingInterval":2000}
/home/src/workspaces/project/apps/app1/src/utils.ts:
  {"pollingInterval":500}
/home/src/workspaces/project/apps/app1/tsconfig.json:
  {"pollingInterval":2000}
/home/src/workspaces/project/apps/jsconfig.json:
  {"pollingInterval":2000}
/home/src/workspaces/project/apps/tsconfig.json:
  {"pollingInterval":2000}
/home/src/workspaces/project/jsconfig.json:
  {"pollingInterval":2000}
/home/src/workspaces/project/shared/constants.ts:
  {"pollingInterval":500}
/home/src/workspaces/project/tsconfig.json:
  {"pollingInterval":2000}

watchedFiles *deleted*::
/home/src/workspaces/project/shared/data.ts:
  {"pollingInterval":500}

watchedDirectoriesRecursive::
/home/src/workspaces/node_modules:
  {}
  {}
/home/src/workspaces/node_modules/@types:
  {}
  {}
/home/src/workspaces/project/apps/app1/node_modules:
  {}
  {}
/home/src/workspaces/project/apps/app1/node_modules/@types:
  {}
  {}
/home/src/workspaces/project/apps/app1/src:
  {}
/home/src/workspaces/project/apps/node_modules:
  {}
  {}
/home/src/workspaces/project/apps/node_modules/@types:
  {}
  {}
/home/src/workspaces/project/node_modules:
  {}
  {}
/home/src/workspaces/project/node_modules/@types:
  {}
  {}
/home/src/workspaces/project/shared:
  {}

Projects::
/dev/null/inferredProject1* (Inferred)
    projectStateVersion: 1
    projectProgramVersion: 1
    autoImportProviderHost: false
/home/src/workspaces/project/apps/app1/tsconfig.json (Configured) *changed*
    projectStateVersion: 3
    projectProgramVersion: 1
    dirty: false *changed*
    autoImportProviderHost: false

ScriptInfos::
/home/src/tslibs/TS/Lib/lib.d.ts
    version: Text-1
    containingProjects: 2
        /home/src/workspaces/project/apps/app1/tsconfig.json
        /dev/null/inferredProject1*
/home/src/tslibs/TS/Lib/lib.decorators.d.ts
    version: Text-1
    containingProjects: 2
        /home/src/workspaces/project/apps/app1/tsconfig.json
        /dev/null/inferredProject1*
/home/src/tslibs/TS/Lib/lib.decorators.legacy.d.ts
    version: Text-1
    containingProjects: 2
        /home/src/workspaces/project/apps/app1/tsconfig.json
        /dev/null/inferredProject1*
/home/src/workspaces/project/apps/app1/src/app.ts (Open)
    version: SVC-2-2
    containingProjects: 1
        /home/src/workspaces/project/apps/app1/tsconfig.json *default*
/home/src/workspaces/project/apps/app1/src/index.ts (Open)
    version: SVC-2-2
    containingProjects: 1
        /home/src/workspaces/project/apps/app1/tsconfig.json *default*
/home/src/workspaces/project/apps/app1/src/utils.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/apps/app1/tsconfig.json
/home/src/workspaces/project/apps/app1/tsconfig.json (Open)
    version: SVC-1-0
    containingProjects: 1
        /dev/null/inferredProject1* *default*
/home/src/workspaces/project/shared/constants.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/apps/app1/tsconfig.json
/home/src/workspaces/project/shared/data.ts (Open) *changed*
    open: true *changed*
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/apps/app1/tsconfig.json *default*

Info seq  [hh:mm:ss:mss] request:
    {
      "seq": 21,
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
      "request_seq": 21,
      "success": true
    }
Info seq  [hh:mm:ss:mss] request:
    {
      "seq": 22,
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
      "request_seq": 22,
      "success": true
    }
Info seq  [hh:mm:ss:mss] request:
    {
      "seq": 23,
      "type": "request",
      "arguments": {
        "file": "/home/src/workspaces/project/shared/data.ts",
        "includeLinePosition": true
      },
      "command": "syntacticDiagnosticsSync"
    }
Info seq  [hh:mm:ss:mss] response:
    {
      "seq": 0,
      "type": "response",
      "command": "syntacticDiagnosticsSync",
      "request_seq": 23,
      "success": true,
      "body": []
    }
Info seq  [hh:mm:ss:mss] request:
    {
      "seq": 24,
      "type": "request",
      "arguments": {
        "file": "/home/src/workspaces/project/shared/data.ts",
        "includeLinePosition": true
      },
      "command": "semanticDiagnosticsSync"
    }
Info seq  [hh:mm:ss:mss] response:
    {
      "seq": 0,
      "type": "response",
      "command": "semanticDiagnosticsSync",
      "request_seq": 24,
      "success": true,
      "body": [
        {
          "message": "Cannot find name 'shared'.",
          "start": 0,
          "length": 6,
          "category": "error",
          "code": 2304,
          "startLocation": {
            "line": 1,
            "offset": 1
          },
          "endLocation": {
            "line": 1,
            "offset": 7
          }
        }
      ]
    }
Info seq  [hh:mm:ss:mss] request:
    {
      "seq": 25,
      "type": "request",
      "arguments": {
        "file": "/home/src/workspaces/project/shared/data.ts",
        "includeLinePosition": true
      },
      "command": "suggestionDiagnosticsSync"
    }
Info seq  [hh:mm:ss:mss] response:
    {
      "seq": 0,
      "type": "response",
      "command": "suggestionDiagnosticsSync",
      "request_seq": 25,
      "success": true,
      "body": []
    }
Info seq  [hh:mm:ss:mss] request:
    {
      "seq": 26,
      "type": "request",
      "arguments": {
        "file": "/home/src/workspaces/project/shared/data.ts",
        "startLine": 1,
        "startOffset": 1,
        "endLine": 1,
        "endOffset": 7,
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
      "request_seq": 26,
      "success": true,
      "body": [
        {
          "fixName": "import",
          "description": "Add import from \"./constants\"",
          "changes": [
            {
              "fileName": "/home/src/workspaces/project/shared/data.ts",
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
                  "newText": "import { shared } from \"./constants\";\n\n"
                }
              ]
            }
          ]
        }
      ]
    }
Info seq  [hh:mm:ss:mss] request:
    {
      "seq": 27,
      "type": "request",
      "arguments": {
        "file": "/home/src/workspaces/project/shared/data.ts",
        "line": 1,
        "offset": 1,
        "endLine": 1,
        "endOffset": 1,
        "insertString": "import { shared } from \"./constants\";\n\n"
      },
      "command": "change"
    }
Info seq  [hh:mm:ss:mss] response:
    {
      "seq": 0,
      "type": "response",
      "command": "change",
      "request_seq": 27,
      "success": true
    }
After Request
Projects::
/dev/null/inferredProject1* (Inferred)
    projectStateVersion: 1
    projectProgramVersion: 1
    autoImportProviderHost: false
/home/src/workspaces/project/apps/app1/tsconfig.json (Configured) *changed*
    projectStateVersion: 4 *changed*
    projectProgramVersion: 1
    dirty: true *changed*
    autoImportProviderHost: false

ScriptInfos::
/home/src/tslibs/TS/Lib/lib.d.ts
    version: Text-1
    containingProjects: 2
        /home/src/workspaces/project/apps/app1/tsconfig.json
        /dev/null/inferredProject1*
/home/src/tslibs/TS/Lib/lib.decorators.d.ts
    version: Text-1
    containingProjects: 2
        /home/src/workspaces/project/apps/app1/tsconfig.json
        /dev/null/inferredProject1*
/home/src/tslibs/TS/Lib/lib.decorators.legacy.d.ts
    version: Text-1
    containingProjects: 2
        /home/src/workspaces/project/apps/app1/tsconfig.json
        /dev/null/inferredProject1*
/home/src/workspaces/project/apps/app1/src/app.ts (Open)
    version: SVC-2-2
    containingProjects: 1
        /home/src/workspaces/project/apps/app1/tsconfig.json *default*
/home/src/workspaces/project/apps/app1/src/index.ts (Open)
    version: SVC-2-2
    containingProjects: 1
        /home/src/workspaces/project/apps/app1/tsconfig.json *default*
/home/src/workspaces/project/apps/app1/src/utils.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/apps/app1/tsconfig.json
/home/src/workspaces/project/apps/app1/tsconfig.json (Open)
    version: SVC-1-0
    containingProjects: 1
        /dev/null/inferredProject1* *default*
/home/src/workspaces/project/shared/constants.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/apps/app1/tsconfig.json
/home/src/workspaces/project/shared/data.ts (Open) *changed*
    version: SVC-2-1 *changed*
    containingProjects: 1
        /home/src/workspaces/project/apps/app1/tsconfig.json *default*

Info seq  [hh:mm:ss:mss] request:
    {
      "seq": 28,
      "type": "request",
      "arguments": {
        "file": "/home/src/workspaces/project/shared/data.ts",
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
      "request_seq": 28,
      "success": true
    }
After Request
ScriptInfos::
/home/src/tslibs/TS/Lib/lib.d.ts
    version: Text-1
    containingProjects: 2
        /home/src/workspaces/project/apps/app1/tsconfig.json
        /dev/null/inferredProject1*
/home/src/tslibs/TS/Lib/lib.decorators.d.ts
    version: Text-1
    containingProjects: 2
        /home/src/workspaces/project/apps/app1/tsconfig.json
        /dev/null/inferredProject1*
/home/src/tslibs/TS/Lib/lib.decorators.legacy.d.ts
    version: Text-1
    containingProjects: 2
        /home/src/workspaces/project/apps/app1/tsconfig.json
        /dev/null/inferredProject1*
/home/src/workspaces/project/apps/app1/src/app.ts (Open)
    version: SVC-2-2
    containingProjects: 1
        /home/src/workspaces/project/apps/app1/tsconfig.json *default*
/home/src/workspaces/project/apps/app1/src/index.ts (Open)
    version: SVC-2-2
    containingProjects: 1
        /home/src/workspaces/project/apps/app1/tsconfig.json *default*
/home/src/workspaces/project/apps/app1/src/utils.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/apps/app1/tsconfig.json
/home/src/workspaces/project/apps/app1/tsconfig.json (Open)
    version: SVC-1-0
    containingProjects: 1
        /dev/null/inferredProject1* *default*
/home/src/workspaces/project/shared/constants.ts
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/apps/app1/tsconfig.json
/home/src/workspaces/project/shared/data.ts (Open) *changed*
    version: SVC-2-2 *changed*
    containingProjects: 1
        /home/src/workspaces/project/apps/app1/tsconfig.json *default*
