currentDirectory:: / useCaseSensitiveFileNames: false
Info 0    [00:00:09.000] Provided types map file "/a/lib/typesMap.json" doesn't exist
Before request
//// [/a/b/app.ts]
let x;


Info 1    [00:00:10.000] request:
    {
      "command": "open",
      "arguments": {
        "file": "/a/b/app.ts"
      },
      "seq": 1,
      "type": "request"
    }
Info 2    [00:00:11.000] Search path: /a/b
Info 3    [00:00:12.000] For info: /a/b/app.ts :: No config files found.
Info 4    [00:00:13.000] Starting updateGraphWorker: Project: /dev/null/inferredProject1*
Info 5    [00:00:14.000] FileWatcher:: Added:: WatchInfo: /a/lib/lib.d.ts 500 undefined Project: /dev/null/inferredProject1* WatchType: Missing file
Info 6    [00:00:15.000] DirectoryWatcher:: Added:: WatchInfo: /a/b/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info 7    [00:00:16.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /a/b/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info 8    [00:00:17.000] Finishing updateGraphWorker: Project: /dev/null/inferredProject1* Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 9    [00:00:18.000] Project '/dev/null/inferredProject1*' (Inferred)
Info 10   [00:00:19.000] 	Files (1)
	/a/b/app.ts SVC-1-0 "let x;"


	app.ts
	  Root file specified for compilation

Info 11   [00:00:20.000] -----------------------------------------------
Info 12   [00:00:21.000] Project '/dev/null/inferredProject1*' (Inferred)
Info 12   [00:00:22.000] 	Files (1)

Info 12   [00:00:23.000] -----------------------------------------------
Info 12   [00:00:24.000] Open files: 
Info 12   [00:00:25.000] 	FileName: /a/b/app.ts ProjectRootPath: undefined
Info 12   [00:00:26.000] 		Projects: /dev/null/inferredProject1*
Info 12   [00:00:27.000] response:
    {
      "responseRequired": false
    }
After request

PolledWatches::
/a/lib/lib.d.ts: *new*
  {"pollingInterval":500}
/a/b/node_modules/@types: *new*
  {"pollingInterval":500}

Before request

Info 13   [00:00:28.000] request:
    {
      "command": "configure",
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
          "placeOpenBraceOnNewLineForControlBlocks": true,
          "semicolons": "ignore",
          "trimTrailingWhitespace": true
        }
      },
      "seq": 2,
      "type": "request"
    }
Info 14   [00:00:29.000] Format host information updated
Info 15   [00:00:30.000] response:
    {"seq":0,"type":"response","command":"configure","request_seq":2,"success":true,"performanceData":{"updateGraphDurationMs":*}}
Info 16   [00:00:31.000] response:
    {
      "responseRequired": false
    }
After request

FormatCodeOptions should be global:: /a/b/app.ts:: {
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
 "placeOpenBraceOnNewLineForControlBlocks": true,
 "semicolons": "ignore",
 "trimTrailingWhitespace": true
}
Before request

Info 17   [00:00:32.000] request:
    {
      "command": "configure",
      "arguments": {
        "formatOptions": {
          "indentSize": 4,
          "tabSize": 4,
          "newLineCharacter": "\n",
          "convertTabsToSpaces": true,
          "indentStyle": 2,
          "insertSpaceAfterConstructor": false,
          "insertSpaceAfterCommaDelimiter": false,
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
          "trimTrailingWhitespace": true
        },
        "file": "/a/b/app.ts"
      },
      "seq": 3,
      "type": "request"
    }
Info 18   [00:00:33.000] Host configuration update for file /a/b/app.ts
Info 19   [00:00:34.000] response:
    {"seq":0,"type":"response","command":"configure","request_seq":3,"success":true,"performanceData":{"updateGraphDurationMs":*}}
Info 20   [00:00:35.000] response:
    {
      "responseRequired": false
    }
After request

FormatCodeOptions should be per file:: /a/b/app.ts:: {
 "indentSize": 4,
 "tabSize": 4,
 "newLineCharacter": "\n",
 "convertTabsToSpaces": true,
 "indentStyle": 2,
 "insertSpaceAfterConstructor": false,
 "insertSpaceAfterCommaDelimiter": false,
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
 "trimTrailingWhitespace": true
}
Before request

Info 21   [00:00:36.000] request:
    {
      "command": "configure",
      "arguments": {
        "formatOptions": {
          "indentSize": 4,
          "tabSize": 4,
          "newLineCharacter": "\n",
          "convertTabsToSpaces": true,
          "indentStyle": 2,
          "insertSpaceAfterConstructor": false,
          "insertSpaceAfterCommaDelimiter": true,
          "insertSpaceAfterSemicolonInForStatements": false,
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
          "trimTrailingWhitespace": true
        }
      },
      "seq": 4,
      "type": "request"
    }
Info 22   [00:00:37.000] Format host information updated
Info 23   [00:00:38.000] response:
    {"seq":0,"type":"response","command":"configure","request_seq":4,"success":true,"performanceData":{"updateGraphDurationMs":*}}
Info 24   [00:00:39.000] response:
    {
      "responseRequired": false
    }
After request

FormatCodeOptions should be per file:: /a/b/app.ts:: {
 "indentSize": 4,
 "tabSize": 4,
 "newLineCharacter": "\n",
 "convertTabsToSpaces": true,
 "indentStyle": 2,
 "insertSpaceAfterConstructor": false,
 "insertSpaceAfterCommaDelimiter": false,
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
 "trimTrailingWhitespace": true
}