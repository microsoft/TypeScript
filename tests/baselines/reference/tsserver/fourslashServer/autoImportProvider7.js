currentDirectory:: / useCaseSensitiveFileNames: false
Info seq  [hh:mm:ss:mss] Provided types map file "/typesMap.json" doesn't exist
//// [/lib.d.ts]
lib.d.ts-Text

//// [/lib.decorators.d.ts]
lib.decorators.d.ts-Text

//// [/lib.decorators.legacy.d.ts]
lib.decorators.legacy.d.ts-Text

//// [/node_modules/mylib] symlink(/packages/mylib)
//// [/package.json]
{ "dependencies": { "mylib": "file:packages/mylib" } }

//// [/packages/mylib/index.ts]
export * from "./mySubDir";

//// [/packages/mylib/mySubDir/index.ts]
export * from "./myClass";
export * from "./myClass2";

//// [/packages/mylib/mySubDir/myClass.ts]
export class MyClass {}

//// [/packages/mylib/mySubDir/myClass2.ts]
export class MyClass2 {}

//// [/packages/mylib/package.json]
{ "name": "mylib", "version": "1.0.0", "main": "index.js", "types": "index" }

//// [/src/index.ts]

const a = new MyClass();
const b = new MyClass2();

//// [/tsconfig.json]
{ "compilerOptions": { "module": "commonjs" } }


Info seq  [hh:mm:ss:mss] request:
    {"seq":0,"type":"request","arguments":{"file":"/tsconfig.json"},"command":"open"}
Info seq  [hh:mm:ss:mss] Search path: /
Info seq  [hh:mm:ss:mss] For info: /tsconfig.json :: Config file name: /tsconfig.json
Info seq  [hh:mm:ss:mss] Creating configuration project /tsconfig.json
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /tsconfig.json 2000 undefined Project: /tsconfig.json WatchType: Config file
Info seq  [hh:mm:ss:mss] event:
    {
     "seq": 0,
     "type": "event",
     "event": "projectLoadingStart",
     "body": {
      "projectName": "/tsconfig.json",
      "reason": "Creating possible configured project for /tsconfig.json to open"
     }
    }
Info seq  [hh:mm:ss:mss] Config: /tsconfig.json : {
 "rootNames": [
  "/lib.d.ts",
  "/lib.decorators.d.ts",
  "/lib.decorators.legacy.d.ts",
  "/packages/mylib/index.ts",
  "/packages/mylib/mySubDir/index.ts",
  "/packages/mylib/mySubDir/myClass.ts",
  "/packages/mylib/mySubDir/myClass2.ts",
  "/src/index.ts"
 ],
 "options": {
  "module": 1,
  "configFilePath": "/tsconfig.json"
 }
}
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo:  1 undefined Config: /tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo:  1 undefined Config: /tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /lib.d.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /lib.decorators.d.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /lib.decorators.legacy.d.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /packages/mylib/index.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /packages/mylib/mySubDir/index.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /packages/mylib/mySubDir/myClass.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /packages/mylib/mySubDir/myClass2.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /src/index.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: /tsconfig.json
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /packages/mylib/mySubDir 1 undefined Project: /tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /packages/mylib/mySubDir 1 undefined Project: /tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: /tsconfig.json Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Project '/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (8)
	/lib.decorators.d.ts Text-1 lib.decorators.d.ts-Text
	/lib.decorators.legacy.d.ts Text-1 lib.decorators.legacy.d.ts-Text
	/lib.d.ts Text-1 lib.d.ts-Text
	/packages/mylib/mySubDir/myClass.ts Text-1 "export class MyClass {}"
	/packages/mylib/mySubDir/myClass2.ts Text-1 "export class MyClass2 {}"
	/packages/mylib/mySubDir/index.ts Text-1 "export * from \"./myClass\";\nexport * from \"./myClass2\";"
	/packages/mylib/index.ts Text-1 "export * from \"./mySubDir\";"
	/src/index.ts Text-1 "\nconst a = new MyClass();\nconst b = new MyClass2();"


	lib.decorators.d.ts
	  Library referenced via 'decorators' from file 'lib.d.ts'
	  Matched by default include pattern '**/*'
	lib.decorators.legacy.d.ts
	  Library referenced via 'decorators.legacy' from file 'lib.d.ts'
	  Matched by default include pattern '**/*'
	lib.d.ts
	  Matched by default include pattern '**/*'
	packages/mylib/mySubDir/myClass.ts
	  Imported via "./myClass" from file 'packages/mylib/mySubDir/index.ts'
	  Matched by default include pattern '**/*'
	packages/mylib/mySubDir/myClass2.ts
	  Imported via "./myClass2" from file 'packages/mylib/mySubDir/index.ts'
	  Matched by default include pattern '**/*'
	packages/mylib/mySubDir/index.ts
	  Imported via "./mySubDir" from file 'packages/mylib/index.ts'
	  Matched by default include pattern '**/*'
	packages/mylib/index.ts
	  Matched by default include pattern '**/*'
	src/index.ts
	  Matched by default include pattern '**/*'

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
      "triggerFile": "/tsconfig.json",
      "configFile": "/tsconfig.json",
      "diagnostics": []
     }
    }
Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: /dev/null/inferredProject1*
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: /dev/null/inferredProject1* Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Project '/dev/null/inferredProject1*' (Inferred)
Info seq  [hh:mm:ss:mss] 	Files (4)
	/lib.d.ts Text-1 lib.d.ts-Text
	/lib.decorators.d.ts Text-1 lib.decorators.d.ts-Text
	/lib.decorators.legacy.d.ts Text-1 lib.decorators.legacy.d.ts-Text
	/tsconfig.json SVC-1-0 "{ \"compilerOptions\": { \"module\": \"commonjs\" } }"


	lib.d.ts
	  Default library for target 'es5'
	lib.decorators.d.ts
	  Library referenced via 'decorators' from file 'lib.d.ts'
	lib.decorators.legacy.d.ts
	  Library referenced via 'decorators.legacy' from file 'lib.d.ts'
	tsconfig.json
	  Root file specified for compilation

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /package.json 250 undefined WatchType: package.json file
Info seq  [hh:mm:ss:mss] AutoImportProviderProject: found 1 root files in 1 dependencies in * ms
Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: /dev/null/autoImportProviderProject1*
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /packages/mylib/mySubDir 1 undefined Project: /dev/null/autoImportProviderProject1* WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /packages/mylib/mySubDir 1 undefined Project: /dev/null/autoImportProviderProject1* WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: /dev/null/autoImportProviderProject1* Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Project '/dev/null/autoImportProviderProject1*' (AutoImportProvider)
Info seq  [hh:mm:ss:mss] 	Files (4)
	/packages/mylib/mySubDir/myClass.ts Text-1 "export class MyClass {}"
	/packages/mylib/mySubDir/myClass2.ts Text-1 "export class MyClass2 {}"
	/packages/mylib/mySubDir/index.ts Text-1 "export * from \"./myClass\";\nexport * from \"./myClass2\";"
	/packages/mylib/index.ts Text-1 "export * from \"./mySubDir\";"


	packages/mylib/mySubDir/myClass.ts
	  Imported via "./myClass" from file 'packages/mylib/mySubDir/index.ts'
	packages/mylib/mySubDir/myClass2.ts
	  Imported via "./myClass2" from file 'packages/mylib/mySubDir/index.ts'
	packages/mylib/mySubDir/index.ts
	  Imported via "./mySubDir" from file 'packages/mylib/index.ts'
	packages/mylib/index.ts
	  Root file specified for compilation

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Project '/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (8)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Project '/dev/null/inferredProject1*' (Inferred)
Info seq  [hh:mm:ss:mss] 	Files (4)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Project '/dev/null/autoImportProviderProject1*' (AutoImportProvider)
Info seq  [hh:mm:ss:mss] 	Files (4)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: /tsconfig.json ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /dev/null/inferredProject1*
Info seq  [hh:mm:ss:mss] request:
    {"seq":1,"type":"request","arguments":{"file":"/src/index.ts"},"command":"open"}
Info seq  [hh:mm:ss:mss] FileWatcher:: Close:: WatchInfo: /src/index.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] Search path: /src
Info seq  [hh:mm:ss:mss] For info: /src/index.ts :: Config file name: /tsconfig.json
Info seq  [hh:mm:ss:mss] Project '/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (8)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Project '/dev/null/inferredProject1*' (Inferred)
Info seq  [hh:mm:ss:mss] 	Files (4)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Project '/dev/null/autoImportProviderProject1*' (AutoImportProvider)
Info seq  [hh:mm:ss:mss] 	Files (4)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: /tsconfig.json ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /dev/null/inferredProject1*
Info seq  [hh:mm:ss:mss] 	FileName: /src/index.ts ProjectRootPath: undefined
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
    {"seq":3,"type":"request","arguments":{"preferences":{"includeCompletionsForModuleExports":true,"includeInsertTextCompletions":true,"allowIncompleteCompletions":true}},"command":"configure"}
Info seq  [hh:mm:ss:mss] response:
    {
     "seq": 0,
     "type": "response",
     "command": "configure",
     "request_seq": 3,
     "success": true
    }
Info seq  [hh:mm:ss:mss] request:
    {"seq":4,"type":"request","arguments":{"file":"/src/index.ts","line":2,"offset":22},"command":"completionInfo"}
Info seq  [hh:mm:ss:mss] getCompletionData: Get current token: *
Info seq  [hh:mm:ss:mss] getCompletionData: Is inside comment: *
Info seq  [hh:mm:ss:mss] getCompletionData: Get previous token: *
Info seq  [hh:mm:ss:mss] getCompletionsAtPosition: isCompletionListBlocker: *
Info seq  [hh:mm:ss:mss] getExportInfoMap: cache miss or empty; calculating new results
Info seq  [hh:mm:ss:mss] getExportInfoMap: done in * ms
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /node_modules 1 undefined WatchType: node_modules for closed script infos and package.jsons affecting module specifier cache
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /node_modules 1 undefined WatchType: node_modules for closed script infos and package.jsons affecting module specifier cache
Info seq  [hh:mm:ss:mss] collectAutoImports: resolved 4 module specifiers, plus 0 ambient and 2 from cache
Info seq  [hh:mm:ss:mss] collectAutoImports: response is complete
Info seq  [hh:mm:ss:mss] collectAutoImports: *
Info seq  [hh:mm:ss:mss] getCompletionData: Semantic work: *
Info seq  [hh:mm:ss:mss] getCompletionsAtPosition: getCompletionEntriesFromSymbols: *
Info seq  [hh:mm:ss:mss] response:
    {
     "seq": 0,
     "type": "response",
     "command": "completionInfo",
     "request_seq": 4,
     "success": true,
     "body": {
      "flags": 9,
      "isGlobalCompletion": false,
      "isMemberCompletion": false,
      "isNewIdentifierLocation": false,
      "optionalReplacementSpan": {
       "start": {
        "line": 2,
        "offset": 15
       },
       "end": {
        "line": 2,
        "offset": 22
       }
      },
      "entries": [
       {
        "name": "b",
        "kind": "const",
        "kindModifiers": "",
        "sortText": "11"
       },
       {
        "name": "abstract",
        "kind": "keyword",
        "kindModifiers": "",
        "sortText": "15"
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
        "name": "as",
        "kind": "keyword",
        "kindModifiers": "",
        "sortText": "15"
       },
       {
        "name": "asserts",
        "kind": "keyword",
        "kindModifiers": "",
        "sortText": "15"
       },
       {
        "name": "async",
        "kind": "keyword",
        "kindModifiers": "",
        "sortText": "15"
       },
       {
        "name": "await",
        "kind": "keyword",
        "kindModifiers": "",
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
        "name": "break",
        "kind": "keyword",
        "kindModifiers": "",
        "sortText": "15"
       },
       {
        "name": "case",
        "kind": "keyword",
        "kindModifiers": "",
        "sortText": "15"
       },
       {
        "name": "catch",
        "kind": "keyword",
        "kindModifiers": "",
        "sortText": "15"
       },
       {
        "name": "class",
        "kind": "keyword",
        "kindModifiers": "",
        "sortText": "15"
       },
       {
        "name": "const",
        "kind": "keyword",
        "kindModifiers": "",
        "sortText": "15"
       },
       {
        "name": "continue",
        "kind": "keyword",
        "kindModifiers": "",
        "sortText": "15"
       },
       {
        "name": "DataView",
        "kind": "var",
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
        "name": "debugger",
        "kind": "keyword",
        "kindModifiers": "",
        "sortText": "15"
       },
       {
        "name": "declare",
        "kind": "keyword",
        "kindModifiers": "",
        "sortText": "15"
       },
       {
        "name": "decodeURI",
        "kind": "function",
        "kindModifiers": "declare",
        "sortText": "15"
       },
       {
        "name": "decodeURIComponent",
        "kind": "function",
        "kindModifiers": "declare",
        "sortText": "15"
       },
       {
        "name": "default",
        "kind": "keyword",
        "kindModifiers": "",
        "sortText": "15"
       },
       {
        "name": "delete",
        "kind": "keyword",
        "kindModifiers": "",
        "sortText": "15"
       },
       {
        "name": "do",
        "kind": "keyword",
        "kindModifiers": "",
        "sortText": "15"
       },
       {
        "name": "else",
        "kind": "keyword",
        "kindModifiers": "",
        "sortText": "15"
       },
       {
        "name": "encodeURI",
        "kind": "function",
        "kindModifiers": "declare",
        "sortText": "15"
       },
       {
        "name": "encodeURIComponent",
        "kind": "function",
        "kindModifiers": "declare",
        "sortText": "15"
       },
       {
        "name": "enum",
        "kind": "keyword",
        "kindModifiers": "",
        "sortText": "15"
       },
       {
        "name": "Error",
        "kind": "var",
        "kindModifiers": "declare",
        "sortText": "15"
       },
       {
        "name": "eval",
        "kind": "function",
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
        "name": "export",
        "kind": "keyword",
        "kindModifiers": "",
        "sortText": "15"
       },
       {
        "name": "extends",
        "kind": "keyword",
        "kindModifiers": "",
        "sortText": "15"
       },
       {
        "name": "false",
        "kind": "keyword",
        "kindModifiers": "",
        "sortText": "15"
       },
       {
        "name": "finally",
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
        "name": "Float64Array",
        "kind": "var",
        "kindModifiers": "declare",
        "sortText": "15"
       },
       {
        "name": "for",
        "kind": "keyword",
        "kindModifiers": "",
        "sortText": "15"
       },
       {
        "name": "function",
        "kind": "keyword",
        "kindModifiers": "",
        "sortText": "15"
       },
       {
        "name": "Function",
        "kind": "var",
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
        "name": "if",
        "kind": "keyword",
        "kindModifiers": "",
        "sortText": "15"
       },
       {
        "name": "implements",
        "kind": "keyword",
        "kindModifiers": "",
        "sortText": "15"
       },
       {
        "name": "import",
        "kind": "keyword",
        "kindModifiers": "",
        "sortText": "15"
       },
       {
        "name": "in",
        "kind": "keyword",
        "kindModifiers": "",
        "sortText": "15"
       },
       {
        "name": "infer",
        "kind": "keyword",
        "kindModifiers": "",
        "sortText": "15"
       },
       {
        "name": "Infinity",
        "kind": "var",
        "kindModifiers": "declare",
        "sortText": "15"
       },
       {
        "name": "instanceof",
        "kind": "keyword",
        "kindModifiers": "",
        "sortText": "15"
       },
       {
        "name": "Int16Array",
        "kind": "var",
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
        "name": "Int8Array",
        "kind": "var",
        "kindModifiers": "declare",
        "sortText": "15"
       },
       {
        "name": "interface",
        "kind": "keyword",
        "kindModifiers": "",
        "sortText": "15"
       },
       {
        "name": "Intl",
        "kind": "module",
        "kindModifiers": "declare",
        "sortText": "15"
       },
       {
        "name": "isFinite",
        "kind": "function",
        "kindModifiers": "declare",
        "sortText": "15"
       },
       {
        "name": "isNaN",
        "kind": "function",
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
        "name": "let",
        "kind": "keyword",
        "kindModifiers": "",
        "sortText": "15"
       },
       {
        "name": "Math",
        "kind": "var",
        "kindModifiers": "declare",
        "sortText": "15"
       },
       {
        "name": "module",
        "kind": "keyword",
        "kindModifiers": "",
        "sortText": "15"
       },
       {
        "name": "namespace",
        "kind": "keyword",
        "kindModifiers": "",
        "sortText": "15"
       },
       {
        "name": "NaN",
        "kind": "var",
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
        "name": "new",
        "kind": "keyword",
        "kindModifiers": "",
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
        "name": "package",
        "kind": "keyword",
        "kindModifiers": "",
        "sortText": "15"
       },
       {
        "name": "parseFloat",
        "kind": "function",
        "kindModifiers": "declare",
        "sortText": "15"
       },
       {
        "name": "parseInt",
        "kind": "function",
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
        "name": "readonly",
        "kind": "keyword",
        "kindModifiers": "",
        "sortText": "15"
       },
       {
        "name": "ReferenceError",
        "kind": "var",
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
        "name": "return",
        "kind": "keyword",
        "kindModifiers": "",
        "sortText": "15"
       },
       {
        "name": "satisfies",
        "kind": "keyword",
        "kindModifiers": "",
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
        "name": "super",
        "kind": "keyword",
        "kindModifiers": "",
        "sortText": "15"
       },
       {
        "name": "switch",
        "kind": "keyword",
        "kindModifiers": "",
        "sortText": "15"
       },
       {
        "name": "symbol",
        "kind": "keyword",
        "kindModifiers": "",
        "sortText": "15"
       },
       {
        "name": "SyntaxError",
        "kind": "var",
        "kindModifiers": "declare",
        "sortText": "15"
       },
       {
        "name": "this",
        "kind": "keyword",
        "kindModifiers": "",
        "sortText": "15"
       },
       {
        "name": "throw",
        "kind": "keyword",
        "kindModifiers": "",
        "sortText": "15"
       },
       {
        "name": "true",
        "kind": "keyword",
        "kindModifiers": "",
        "sortText": "15"
       },
       {
        "name": "try",
        "kind": "keyword",
        "kindModifiers": "",
        "sortText": "15"
       },
       {
        "name": "type",
        "kind": "keyword",
        "kindModifiers": "",
        "sortText": "15"
       },
       {
        "name": "TypeError",
        "kind": "var",
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
        "name": "Uint16Array",
        "kind": "var",
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
        "name": "Uint8Array",
        "kind": "var",
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
        "name": "undefined",
        "kind": "var",
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
        "name": "URIError",
        "kind": "var",
        "kindModifiers": "declare",
        "sortText": "15"
       },
       {
        "name": "var",
        "kind": "keyword",
        "kindModifiers": "",
        "sortText": "15"
       },
       {
        "name": "void",
        "kind": "keyword",
        "kindModifiers": "",
        "sortText": "15"
       },
       {
        "name": "while",
        "kind": "keyword",
        "kindModifiers": "",
        "sortText": "15"
       },
       {
        "name": "with",
        "kind": "keyword",
        "kindModifiers": "",
        "sortText": "15"
       },
       {
        "name": "yield",
        "kind": "keyword",
        "kindModifiers": "",
        "sortText": "15"
       },
       {
        "name": "MyClass",
        "kind": "class",
        "kindModifiers": "export",
        "sortText": "16",
        "hasAction": true,
        "source": "mylib",
        "sourceDisplay": [
         {
          "text": "mylib",
          "kind": "text"
         }
        ],
        "data": {
         "exportName": "MyClass",
         "exportMapKey": "MyClass|*|",
         "moduleSpecifier": "mylib",
         "fileName": "/packages/mylib/index.ts"
        }
       },
       {
        "name": "MyClass2",
        "kind": "class",
        "kindModifiers": "export",
        "sortText": "16",
        "hasAction": true,
        "source": "mylib",
        "sourceDisplay": [
         {
          "text": "mylib",
          "kind": "text"
         }
        ],
        "data": {
         "exportName": "MyClass2",
         "exportMapKey": "MyClass2|*|",
         "moduleSpecifier": "mylib",
         "fileName": "/packages/mylib/index.ts"
        }
       },
       {
        "name": "escape",
        "kind": "function",
        "kindModifiers": "deprecated,declare",
        "sortText": "z15"
       },
       {
        "name": "unescape",
        "kind": "function",
        "kindModifiers": "deprecated,declare",
        "sortText": "z15"
       }
      ]
     }
    }
Info seq  [hh:mm:ss:mss] request:
    {"seq":5,"type":"request","arguments":{"preferences":{"includeCompletionsForModuleExports":true,"includeCompletionsWithInsertText":true,"allowIncompleteCompletions":true}},"command":"configure"}
Info seq  [hh:mm:ss:mss] response:
    {
     "seq": 0,
     "type": "response",
     "command": "configure",
     "request_seq": 5,
     "success": true
    }
Info seq  [hh:mm:ss:mss] request:
    {"seq":6,"type":"request","arguments":{"file":"/src/index.ts","line":2,"offset":22,"entryNames":[{"name":"MyClass","source":"mylib","data":{"exportName":"MyClass","fileName":"/packages/mylib/index.ts"}}]},"command":"completionEntryDetails-full"}
Info seq  [hh:mm:ss:mss] getExportInfoMap: cache hit
Info seq  [hh:mm:ss:mss] response:
    {
     "seq": 0,
     "type": "response",
     "command": "completionEntryDetails-full",
     "request_seq": 6,
     "success": true,
     "body": [
      {
       "name": "MyClass",
       "kindModifiers": "export",
       "kind": "constructor",
       "displayParts": [
        {
         "text": "constructor",
         "kind": "keyword"
        },
        {
         "text": " ",
         "kind": "space"
        },
        {
         "text": "MyClass",
         "kind": "className"
        },
        {
         "text": "(",
         "kind": "punctuation"
        },
        {
         "text": ")",
         "kind": "punctuation"
        },
        {
         "text": ":",
         "kind": "punctuation"
        },
        {
         "text": " ",
         "kind": "space"
        },
        {
         "text": "MyClass",
         "kind": "className"
        }
       ],
       "documentation": [],
       "tags": [],
       "codeActions": [
        {
         "description": "Add import from \"mylib\"",
         "changes": [
          {
           "fileName": "/src/index.ts",
           "textChanges": [
            {
             "span": {
              "start": 0,
              "length": 0
             },
             "newText": "import { MyClass } from \"mylib\";\n"
            }
           ]
          }
         ]
        }
       ],
       "source": [
        {
         "text": "mylib",
         "kind": "text"
        }
       ],
       "sourceDisplay": [
        {
         "text": "mylib",
         "kind": "text"
        }
       ]
      }
     ]
    }
Info seq  [hh:mm:ss:mss] request:
    {"seq":7,"type":"request","arguments":{"file":"/src/index.ts","line":1,"offset":1,"endLine":1,"endOffset":1,"insertString":"import { MyClass } from \"mylib\";\n"},"command":"change"}