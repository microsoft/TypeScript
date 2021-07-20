Provided types map file "/a/lib/typesMap.json" doesn't exist
request:{"jsonrpc":"2.0","method":"initialize","params":{"processId":0},"id":1}
response:{"response":{"capabilities":{"textDocumentSync":2,"hoverProvider":true,"signatureHelpProvider":{"triggerCharacters":["(",",","<"],"retriggerCharacters":[")"]}}},"responseRequired":true}
request:{"jsonrpc":"2.0","method":"initialized","params":{}}
response:{"responseRequired":false}
request:{"jsonrpc":"2.0","method":"textDocument/didOpen","params":{"textDocument":{"languageId":"typescript","text":"function foo(s: string): 5 {\n    return 5;\n}\nfoo()","uri":"file:///a/file.ts","version":0}}}
Search path: /a
For info: /a/file.ts :: No config files found.
Plugins were requested but not running in environment that supports 'require'. Nothing will be loaded
Starting updateGraphWorker: Project: /dev/null/inferredProject1*
FileWatcher:: Added:: WatchInfo: /a/lib/lib.d.ts 500 undefined Project: /dev/null/inferredProject1* WatchType: Missing file
Finishing updateGraphWorker: Project: /dev/null/inferredProject1* Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Project '/dev/null/inferredProject1*' (Inferred)
	Files (1)
	/a/file.ts


	a/file.ts
	  Root file specified for compilation

-----------------------------------------------
Project '/dev/null/inferredProject1*' (Inferred)
	Files (1)

-----------------------------------------------
Open files: 
	FileName: /a/file.ts ProjectRootPath: undefined
		Projects: /dev/null/inferredProject1*
response:{"responseRequired":false}
request:{"jsonrpc":"2.0","method":"textDocument/signatureHelp","params":{"position":{"line":3,"character":4},"textDocument":{"uri":"file:///a/file.ts"},"context":{"triggerKind":1,"isRetrigger":false}},"id":2}
response:{"response":{"signatures":[{"label":"foo(s: string): 5","documentation":{"kind":"markdown","value":""},"parameters":[{"label":[4,13],"documentation":{"kind":"markdown","value":""}}]}],"activeSignature":0,"activeParameter":0},"responseRequired":true}