Provided types map file "/a/lib/typesMap.json" doesn't exist
request:{"jsonrpc":"2.0","method":"initialize","params":{"processId":0},"id":1}
response:{"response":{"capabilities":{"textDocumentSync":2,"hoverProvider":true,"signatureHelpProvider":{"triggerCharacters":["(",",","<"],"retriggerCharacters":[")"]}}},"responseRequired":true}
request:{"jsonrpc":"2.0","method":"initialized","params":{}}
response:{"responseRequired":false}
request:{"jsonrpc":"2.0","method":"textDocument/didOpen","params":{"textDocument":{"languageId":"javascript","text":"const foo = 5;","uri":"file:///a/file.js","version":0}}}
Search path: /a
For info: /a/file.js :: No config files found.
Plugins were requested but not running in environment that supports 'require'. Nothing will be loaded
Starting updateGraphWorker: Project: /dev/null/inferredProject1*
FileWatcher:: Added:: WatchInfo: /a/lib/lib.d.ts 500 undefined Project: /dev/null/inferredProject1* WatchType: Missing file
Finishing updateGraphWorker: Project: /dev/null/inferredProject1* Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Project '/dev/null/inferredProject1*' (Inferred)
	Files (1)
	/a/file.js


	a/file.js
	  Root file specified for compilation

-----------------------------------------------
Project '/dev/null/inferredProject1*' (Inferred)
	Files (1)

-----------------------------------------------
Open files: 
	FileName: /a/file.js ProjectRootPath: undefined
		Projects: /dev/null/inferredProject1*
response:{"responseRequired":false}
request:{"jsonrpc":"2.0","method":"textDocument/hover","params":{"position":{"line":0,"character":7},"textDocument":{"uri":"file:///a/file.js"}},"id":2}
response:{"response":{"contents":[{"language":"typescript","value":"const foo: 5"},""],"range":{"start":{"line":0,"character":6},"end":{"line":0,"character":9}}},"responseRequired":true}