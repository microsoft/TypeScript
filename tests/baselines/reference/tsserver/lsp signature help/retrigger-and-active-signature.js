Provided types map file "/a/lib/typesMap.json" doesn't exist
request:{"jsonrpc":"2.0","method":"initialize","params":{"processId":0},"id":1}
response:{"response":{"capabilities":{"textDocumentSync":2,"hoverProvider":true,"signatureHelpProvider":{"triggerCharacters":["(",",","<"],"retriggerCharacters":[")"]}}},"responseRequired":true}
request:{"jsonrpc":"2.0","method":"initialized","params":{}}
response:{"responseRequired":false}
request:{"jsonrpc":"2.0","method":"textDocument/didOpen","params":{"textDocument":{"languageId":"typescript","text":"declare function foo(a: number, b: 'abc'): void;\ndeclare function foo(a: number, c: 'xyz'): void;\n\nfoo()","uri":"file:///a/file.ts","version":0}}}
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
response:{"response":{"signatures":[{"label":"foo(a: number, b: \"abc\"): void","documentation":{"kind":"markdown","value":""},"parameters":[{"label":[4,13],"documentation":{"kind":"markdown","value":""}},{"label":[15,23],"documentation":{"kind":"markdown","value":""}}]},{"label":"foo(a: number, c: \"xyz\"): void","documentation":{"kind":"markdown","value":""},"parameters":[{"label":[4,13],"documentation":{"kind":"markdown","value":""}},{"label":[15,23],"documentation":{"kind":"markdown","value":""}}]}],"activeSignature":0,"activeParameter":0},"responseRequired":true}
request:{"jsonrpc":"2.0","method":"textDocument/didChange","params":{"textDocument":{"uri":"file:///a/file.ts","version":1},"contentChanges":[{"range":{"start":{"line":3,"character":4},"end":{"line":3,"character":4}},"text":"1"}]}}
response:{"responseRequired":false}
request:{"jsonrpc":"2.0","method":"textDocument/signatureHelp","params":{"position":{"line":3,"character":5},"textDocument":{"uri":"file:///a/file.ts"},"context":{"triggerKind":3,"isRetrigger":true,"activeSignatureHelp":{"signatures":[{"label":"foo(a: number, b: \"abc\"): void","documentation":{"kind":"markdown","value":""},"parameters":[{"label":[4,13],"documentation":{"kind":"markdown","value":""}},{"label":[15,23],"documentation":{"kind":"markdown","value":""}}]},{"label":"foo(a: number, c: \"xyz\"): void","documentation":{"kind":"markdown","value":""},"parameters":[{"label":[4,13],"documentation":{"kind":"markdown","value":""}},{"label":[15,23],"documentation":{"kind":"markdown","value":""}}]}],"activeSignature":0,"activeParameter":0}}},"id":3}
Starting updateGraphWorker: Project: /dev/null/inferredProject1*
Finishing updateGraphWorker: Project: /dev/null/inferredProject1* Version: 2 structureChanged: false structureIsReused:: Completely Elapsed:: *ms
Different program with same set of files
response:{"response":{"signatures":[{"label":"foo(a: number, b: \"abc\"): void","documentation":{"kind":"markdown","value":""},"parameters":[{"label":[4,13],"documentation":{"kind":"markdown","value":""}},{"label":[15,23],"documentation":{"kind":"markdown","value":""}}]},{"label":"foo(a: number, c: \"xyz\"): void","documentation":{"kind":"markdown","value":""},"parameters":[{"label":[4,13],"documentation":{"kind":"markdown","value":""}},{"label":[15,23],"documentation":{"kind":"markdown","value":""}}]}],"activeSignature":0,"activeParameter":0},"responseRequired":true}
request:{"jsonrpc":"2.0","method":"textDocument/didChange","params":{"textDocument":{"uri":"file:///a/file.ts","version":2},"contentChanges":[{"range":{"start":{"line":3,"character":5},"end":{"line":3,"character":5}},"text":","}]}}
response:{"responseRequired":false}
request:{"jsonrpc":"2.0","method":"textDocument/signatureHelp","params":{"position":{"line":3,"character":6},"textDocument":{"uri":"file:///a/file.ts"},"context":{"triggerKind":2,"isRetrigger":true,"activeSignatureHelp":{"signatures":[{"label":"foo(a: number, b: \"abc\"): void","documentation":{"kind":"markdown","value":""},"parameters":[{"label":[4,13],"documentation":{"kind":"markdown","value":""}},{"label":[15,23],"documentation":{"kind":"markdown","value":""}}]},{"label":"foo(a: number, c: \"xyz\"): void","documentation":{"kind":"markdown","value":""},"parameters":[{"label":[4,13],"documentation":{"kind":"markdown","value":""}},{"label":[15,23],"documentation":{"kind":"markdown","value":""}}]}],"activeSignature":1,"activeParameter":0}}},"id":4}
Starting updateGraphWorker: Project: /dev/null/inferredProject1*
Finishing updateGraphWorker: Project: /dev/null/inferredProject1* Version: 3 structureChanged: false structureIsReused:: Completely Elapsed:: *ms
Different program with same set of files
response:{"response":{"signatures":[{"label":"foo(a: number, b: \"abc\"): void","documentation":{"kind":"markdown","value":""},"parameters":[{"label":[4,13],"documentation":{"kind":"markdown","value":""}},{"label":[15,23],"documentation":{"kind":"markdown","value":""}}]},{"label":"foo(a: number, c: \"xyz\"): void","documentation":{"kind":"markdown","value":""},"parameters":[{"label":[4,13],"documentation":{"kind":"markdown","value":""}},{"label":[15,23],"documentation":{"kind":"markdown","value":""}}]}],"activeSignature":1,"activeParameter":1},"responseRequired":true}