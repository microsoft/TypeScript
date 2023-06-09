currentDirectory:: / useCaseSensitiveFileNames: false
Info seq  [hh:mm:ss:mss] Provided types map file "/typesMap.json" doesn't exist
//// [/index.ts]
IndirectDependency

//// [/lib.d.ts]
lib.d.ts-Text

//// [/lib.decorators.d.ts]
lib.decorators.d.ts-Text

//// [/lib.decorators.legacy.d.ts]
lib.decorators.legacy.d.ts-Text

//// [/node_modules/direct-dependency/index.d.ts]
import "indirect-dependency";
export declare class DirectDependency {}

//// [/node_modules/direct-dependency/package.json]
{ "name": "direct-dependency", "dependencies": { "indirect-dependency": "*" } }

//// [/node_modules/indirect-dependency/index.d.ts]
export declare class IndirectDependency

//// [/node_modules/indirect-dependency/package.json]
{ "name": "indirect-dependency" }

//// [/package.json]
{ "dependencies": { "direct-dependency": "*" } }

//// [/tsconfig.json]
{}


Info seq  [hh:mm:ss:mss] request:
    {"seq":0,"type":"request","arguments":{"file":"/node_modules/direct-dependency/package.json"},"command":"open"}
Info seq  [hh:mm:ss:mss] Search path: /node_modules/direct-dependency
Info seq  [hh:mm:ss:mss] For info: /node_modules/direct-dependency/package.json :: No config files found.
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
	/node_modules/direct-dependency/package.json SVC-1-0 "{ \"name\": \"direct-dependency\", \"dependencies\": { \"indirect-dependency\": \"*\" } }"


	../../lib.d.ts
	  Default library for target 'es5'
	../../lib.decorators.d.ts
	  Library referenced via 'decorators' from file '../../lib.d.ts'
	../../lib.decorators.legacy.d.ts
	  Library referenced via 'decorators.legacy' from file '../../lib.d.ts'
	package.json
	  Root file specified for compilation

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Project '/dev/null/inferredProject1*' (Inferred)
Info seq  [hh:mm:ss:mss] 	Files (4)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: /node_modules/direct-dependency/package.json ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /dev/null/inferredProject1*
Info seq  [hh:mm:ss:mss] request:
    {"seq":1,"type":"request","arguments":{"file":"/index.ts"},"command":"open"}
Info seq  [hh:mm:ss:mss] Search path: /
Info seq  [hh:mm:ss:mss] For info: /index.ts :: Config file name: /tsconfig.json
Info seq  [hh:mm:ss:mss] Creating configuration project /tsconfig.json
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /tsconfig.json 2000 undefined Project: /tsconfig.json WatchType: Config file
Info seq  [hh:mm:ss:mss] event:
    {
     "seq": 0,
     "type": "event",
     "event": "projectLoadingStart",
     "body": {
      "projectName": "/tsconfig.json",
      "reason": "Creating possible configured project for /index.ts to open"
     }
    }
Info seq  [hh:mm:ss:mss] Config: /tsconfig.json : {
 "rootNames": [
  "/index.ts",
  "/lib.d.ts",
  "/lib.decorators.d.ts",
  "/lib.decorators.legacy.d.ts"
 ],
 "options": {
  "configFilePath": "/tsconfig.json"
 }
}
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo:  1 undefined Config: /tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo:  1 undefined Config: /tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: /tsconfig.json
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: /tsconfig.json Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Project '/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (4)
	/lib.decorators.d.ts Text-1 lib.decorators.d.ts-Text
	/lib.decorators.legacy.d.ts Text-1 lib.decorators.legacy.d.ts-Text
	/index.ts SVC-1-0 "IndirectDependency"
	/lib.d.ts Text-1 lib.d.ts-Text


	lib.decorators.d.ts
	  Library referenced via 'decorators' from file 'lib.d.ts'
	  Matched by default include pattern '**/*'
	lib.decorators.legacy.d.ts
	  Library referenced via 'decorators.legacy' from file 'lib.d.ts'
	  Matched by default include pattern '**/*'
	index.ts
	  Matched by default include pattern '**/*'
	lib.d.ts
	  Matched by default include pattern '**/*'

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /package.json 250 undefined WatchType: package.json file
Info seq  [hh:mm:ss:mss] AutoImportProviderProject: found 1 root files in 1 dependencies in * ms
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /node_modules/direct-dependency/index.d.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: /dev/null/autoImportProviderProject1*
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /node_modules/indirect-dependency/index.d.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: /dev/null/autoImportProviderProject1* Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Project '/dev/null/autoImportProviderProject1*' (AutoImportProvider)
Info seq  [hh:mm:ss:mss] 	Files (2)
	/node_modules/indirect-dependency/index.d.ts Text-1 "export declare class IndirectDependency"
	/node_modules/direct-dependency/index.d.ts Text-1 "import \"indirect-dependency\";\nexport declare class DirectDependency {}"


	node_modules/indirect-dependency/index.d.ts
	  Imported via "indirect-dependency" from file 'node_modules/direct-dependency/index.d.ts'
	node_modules/direct-dependency/index.d.ts
	  Root file specified for compilation

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
      "triggerFile": "/index.ts",
      "configFile": "/tsconfig.json",
      "diagnostics": []
     }
    }
Info seq  [hh:mm:ss:mss] Project '/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (4)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Project '/dev/null/autoImportProviderProject1*' (AutoImportProvider)
Info seq  [hh:mm:ss:mss] 	Files (2)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Project '/dev/null/inferredProject1*' (Inferred)
Info seq  [hh:mm:ss:mss] 	Files (4)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: /node_modules/direct-dependency/package.json ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /dev/null/inferredProject1*
Info seq  [hh:mm:ss:mss] 	FileName: /index.ts ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /tsconfig.json
Info seq  [hh:mm:ss:mss] request:
    {"seq":2,"type":"request","arguments":{"formatOptions":{"indentSize":4,"tabSize":4,"newLineCharacter":"\n","convertTabsToSpaces":true,"indentStyle":2,"insertSpaceAfterConstructor":false,"insertSpaceAfterCommaDelimiter":true,"insertSpaceAfterSemicolonInForStatements":true,"insertSpaceBeforeAndAfterBinaryOperators":true,"insertSpaceAfterKeywordsInControlFlowStatements":true,"insertSpaceAfterFunctionKeywordForAnonymousFunctions":false,"insertSpaceAfterOpeningAndBeforeClosingNonemptyParenthesis":false,"insertSpaceAfterOpeningAndBeforeClosingNonemptyBrackets":false,"insertSpaceAfterOpeningAndBeforeClosingNonemptyBraces":true,"insertSpaceAfterOpeningAndBeforeClosingTemplateStringBraces":false,"insertSpaceAfterOpeningAndBeforeClosingJsxExpressionBraces":false,"insertSpaceBeforeFunctionParenthesis":false,"placeOpenBraceOnNewLineForFunctions":false,"placeOpenBraceOnNewLineForControlBlocks":false,"semicolons":"ignore","trimTrailingWhitespace":true,"indentSwitchCase":true}},"command":"configure"}
Info seq  [hh:mm:ss:mss] Format host information updated
Info seq  [hh:mm:ss:mss] response:
    {
     "seq": 0,
     "type": "response",
     "command": "configure",
     "request_seq": 2,
     "success": true
    }
Info seq  [hh:mm:ss:mss] request:
    {"seq":3,"type":"request","arguments":{"preferences":{}},"command":"configure"}
Info seq  [hh:mm:ss:mss] response:
    {
     "seq": 0,
     "type": "response",
     "command": "configure",
     "request_seq": 3,
     "success": true
    }
Info seq  [hh:mm:ss:mss] request:
    {"seq":4,"type":"request","arguments":{"file":"/index.ts","includeLinePosition":true},"command":"syntacticDiagnosticsSync"}
Info seq  [hh:mm:ss:mss] response:
    {
     "seq": 0,
     "type": "response",
     "command": "syntacticDiagnosticsSync",
     "request_seq": 4,
     "success": true,
     "body": []
    }
Info seq  [hh:mm:ss:mss] request:
    {"seq":5,"type":"request","arguments":{"file":"/index.ts","includeLinePosition":true},"command":"semanticDiagnosticsSync"}
Info seq  [hh:mm:ss:mss] response:
    {
     "seq": 0,
     "type": "response",
     "command": "semanticDiagnosticsSync",
     "request_seq": 5,
     "success": true,
     "body": [
      {
       "message": "Cannot find name 'IndirectDependency'.",
       "start": 0,
       "length": 18,
       "category": "error",
       "code": 2304,
       "startLocation": {
        "line": 1,
        "offset": 1
       },
       "endLocation": {
        "line": 1,
        "offset": 19
       }
      }
     ]
    }
Info seq  [hh:mm:ss:mss] request:
    {"seq":6,"type":"request","arguments":{"file":"/index.ts","includeLinePosition":true},"command":"suggestionDiagnosticsSync"}
Info seq  [hh:mm:ss:mss] response:
    {
     "seq": 0,
     "type": "response",
     "command": "suggestionDiagnosticsSync",
     "request_seq": 6,
     "success": true,
     "body": []
    }
Info seq  [hh:mm:ss:mss] request:
    {"seq":7,"type":"request","arguments":{"file":"/index.ts","startLine":1,"startOffset":1,"endLine":1,"endOffset":19,"errorCodes":[2304]},"command":"getCodeFixes"}
Info seq  [hh:mm:ss:mss] forEachExternalModuleToImportFrom autoImportProvider: *
Info seq  [hh:mm:ss:mss] response:
    {
     "seq": 0,
     "type": "response",
     "command": "getCodeFixes",
     "request_seq": 7,
     "success": true,
     "body": []
    }