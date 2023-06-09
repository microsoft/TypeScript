currentDirectory:: / useCaseSensitiveFileNames: false
Info seq  [hh:mm:ss:mss] Provided types map file "/typesMap.json" doesn't exist
//// [/lib.d.ts]
lib.d.ts-Text

//// [/lib.decorators.d.ts]
lib.decorators.d.ts-Text

//// [/lib.decorators.legacy.d.ts]
lib.decorators.legacy.d.ts-Text

//// [/tests/cases/fourslash/server/fixExtractToInnerFunctionDuplicaton.ts]
function foo(): void { console.log('a'); }


Info seq  [hh:mm:ss:mss] request:
    {"seq":0,"type":"request","arguments":{"file":"/tests/cases/fourslash/server/fixExtractToInnerFunctionDuplicaton.ts"},"command":"open"}
Info seq  [hh:mm:ss:mss] Search path: /tests/cases/fourslash/server
Info seq  [hh:mm:ss:mss] For info: /tests/cases/fourslash/server/fixExtractToInnerFunctionDuplicaton.ts :: No config files found.
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /tests/cases/fourslash/server/tsconfig.json 2000 undefined WatchType: Config file for the inferred project root
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /tests/cases/fourslash/server/jsconfig.json 2000 undefined WatchType: Config file for the inferred project root
Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: /dev/null/inferredProject1*
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /lib.d.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /tests/cases/fourslash/server/node_modules 1 undefined Project: /dev/null/inferredProject1* WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /tests/cases/fourslash/server/node_modules 1 undefined Project: /dev/null/inferredProject1* WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /tests/cases/fourslash/node_modules 1 undefined Project: /dev/null/inferredProject1* WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /tests/cases/fourslash/node_modules 1 undefined Project: /dev/null/inferredProject1* WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /lib.decorators.d.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /lib.decorators.legacy.d.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /tests/cases/fourslash/server/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /tests/cases/fourslash/server/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /tests/cases/fourslash/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /tests/cases/fourslash/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: /dev/null/inferredProject1* Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Project '/dev/null/inferredProject1*' (Inferred)
Info seq  [hh:mm:ss:mss] 	Files (4)
	/lib.d.ts Text-1 lib.d.ts-Text
	/lib.decorators.d.ts Text-1 lib.decorators.d.ts-Text
	/lib.decorators.legacy.d.ts Text-1 lib.decorators.legacy.d.ts-Text
	/tests/cases/fourslash/server/fixExtractToInnerFunctionDuplicaton.ts SVC-1-0 "function foo(): void { console.log('a'); }"


	../../../../lib.d.ts
	  Default library for target 'es5'
	../../../../lib.decorators.d.ts
	  Library referenced via 'decorators' from file '../../../../lib.d.ts'
	../../../../lib.decorators.legacy.d.ts
	  Library referenced via 'decorators.legacy' from file '../../../../lib.d.ts'
	fixExtractToInnerFunctionDuplicaton.ts
	  Root file specified for compilation

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Project '/dev/null/inferredProject1*' (Inferred)
Info seq  [hh:mm:ss:mss] 	Files (4)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: /tests/cases/fourslash/server/fixExtractToInnerFunctionDuplicaton.ts ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /dev/null/inferredProject1*
Info seq  [hh:mm:ss:mss] request:
    {"seq":1,"type":"request","arguments":{"preferences":{}},"command":"configure"}
Info seq  [hh:mm:ss:mss] response:
    {
     "seq": 0,
     "type": "response",
     "command": "configure",
     "request_seq": 1,
     "success": true
    }
Info seq  [hh:mm:ss:mss] request:
    {"seq":2,"type":"request","arguments":{"file":"/tests/cases/fourslash/server/fixExtractToInnerFunctionDuplicaton.ts","startLine":1,"startOffset":24,"endLine":1,"endOffset":41,"triggerReason":"implicit"},"command":"getApplicableRefactors"}
Info seq  [hh:mm:ss:mss] response:
    {
     "seq": 0,
     "type": "response",
     "command": "getApplicableRefactors",
     "request_seq": 2,
     "success": true,
     "body": [
      {
       "name": "Extract Symbol",
       "description": "Extract function",
       "actions": [
        {
         "description": "Extract to inner function in function 'foo'",
         "name": "function_scope_0",
         "kind": "refactor.extract.function"
        },
        {
         "description": "Extract to function in global scope",
         "name": "function_scope_1",
         "kind": "refactor.extract.function"
        }
       ]
      },
      {
       "name": "Extract Symbol",
       "description": "Extract constant",
       "actions": [
        {
         "description": "Extract to constant in enclosing scope",
         "name": "constant_scope_0",
         "kind": "refactor.extract.constant"
        },
        {
         "description": "Extract to constant in global scope",
         "name": "constant_scope_1",
         "kind": "refactor.extract.constant"
        }
       ]
      }
     ]
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
    {"seq":4,"type":"request","arguments":{"preferences":{}},"command":"configure"}
Info seq  [hh:mm:ss:mss] response:
    {
     "seq": 0,
     "type": "response",
     "command": "configure",
     "request_seq": 4,
     "success": true
    }
Info seq  [hh:mm:ss:mss] request:
    {"seq":5,"type":"request","arguments":{"file":"/tests/cases/fourslash/server/fixExtractToInnerFunctionDuplicaton.ts","startLine":1,"startOffset":24,"endLine":1,"endOffset":41,"triggerReason":"implicit"},"command":"getApplicableRefactors"}
Info seq  [hh:mm:ss:mss] response:
    {
     "seq": 0,
     "type": "response",
     "command": "getApplicableRefactors",
     "request_seq": 5,
     "success": true,
     "body": [
      {
       "name": "Extract Symbol",
       "description": "Extract function",
       "actions": [
        {
         "description": "Extract to inner function in function 'foo'",
         "name": "function_scope_0",
         "kind": "refactor.extract.function"
        },
        {
         "description": "Extract to function in global scope",
         "name": "function_scope_1",
         "kind": "refactor.extract.function"
        }
       ]
      },
      {
       "name": "Extract Symbol",
       "description": "Extract constant",
       "actions": [
        {
         "description": "Extract to constant in enclosing scope",
         "name": "constant_scope_0",
         "kind": "refactor.extract.constant"
        },
        {
         "description": "Extract to constant in global scope",
         "name": "constant_scope_1",
         "kind": "refactor.extract.constant"
        }
       ]
      }
     ]
    }
Info seq  [hh:mm:ss:mss] request:
    {"seq":6,"type":"request","arguments":{"preferences":{}},"command":"configure"}
Info seq  [hh:mm:ss:mss] response:
    {
     "seq": 0,
     "type": "response",
     "command": "configure",
     "request_seq": 6,
     "success": true
    }
Info seq  [hh:mm:ss:mss] request:
    {"seq":7,"type":"request","arguments":{"preferences":{}},"command":"configure"}
Info seq  [hh:mm:ss:mss] response:
    {
     "seq": 0,
     "type": "response",
     "command": "configure",
     "request_seq": 7,
     "success": true
    }
Info seq  [hh:mm:ss:mss] request:
    {"seq":8,"type":"request","arguments":{"file":"/tests/cases/fourslash/server/fixExtractToInnerFunctionDuplicaton.ts","startLine":1,"startOffset":24,"endLine":1,"endOffset":41,"triggerReason":"implicit"},"command":"getApplicableRefactors"}
Info seq  [hh:mm:ss:mss] response:
    {
     "seq": 0,
     "type": "response",
     "command": "getApplicableRefactors",
     "request_seq": 8,
     "success": true,
     "body": [
      {
       "name": "Extract Symbol",
       "description": "Extract function",
       "actions": [
        {
         "description": "Extract to inner function in function 'foo'",
         "name": "function_scope_0",
         "kind": "refactor.extract.function"
        },
        {
         "description": "Extract to function in global scope",
         "name": "function_scope_1",
         "kind": "refactor.extract.function"
        }
       ]
      },
      {
       "name": "Extract Symbol",
       "description": "Extract constant",
       "actions": [
        {
         "description": "Extract to constant in enclosing scope",
         "name": "constant_scope_0",
         "kind": "refactor.extract.constant"
        },
        {
         "description": "Extract to constant in global scope",
         "name": "constant_scope_1",
         "kind": "refactor.extract.constant"
        }
       ]
      }
     ]
    }
Info seq  [hh:mm:ss:mss] request:
    {"seq":9,"type":"request","arguments":{"preferences":{}},"command":"configure"}
Info seq  [hh:mm:ss:mss] response:
    {
     "seq": 0,
     "type": "response",
     "command": "configure",
     "request_seq": 9,
     "success": true
    }
Info seq  [hh:mm:ss:mss] request:
    {"seq":10,"type":"request","arguments":{"preferences":{}},"command":"configure"}
Info seq  [hh:mm:ss:mss] response:
    {
     "seq": 0,
     "type": "response",
     "command": "configure",
     "request_seq": 10,
     "success": true
    }
Info seq  [hh:mm:ss:mss] request:
    {"seq":11,"type":"request","arguments":{"file":"/tests/cases/fourslash/server/fixExtractToInnerFunctionDuplicaton.ts","startLine":1,"startOffset":24,"endLine":1,"endOffset":41,"triggerReason":"implicit"},"command":"getApplicableRefactors"}
Info seq  [hh:mm:ss:mss] response:
    {
     "seq": 0,
     "type": "response",
     "command": "getApplicableRefactors",
     "request_seq": 11,
     "success": true,
     "body": [
      {
       "name": "Extract Symbol",
       "description": "Extract function",
       "actions": [
        {
         "description": "Extract to inner function in function 'foo'",
         "name": "function_scope_0",
         "kind": "refactor.extract.function"
        },
        {
         "description": "Extract to function in global scope",
         "name": "function_scope_1",
         "kind": "refactor.extract.function"
        }
       ]
      },
      {
       "name": "Extract Symbol",
       "description": "Extract constant",
       "actions": [
        {
         "description": "Extract to constant in enclosing scope",
         "name": "constant_scope_0",
         "kind": "refactor.extract.constant"
        },
        {
         "description": "Extract to constant in global scope",
         "name": "constant_scope_1",
         "kind": "refactor.extract.constant"
        }
       ]
      }
     ]
    }
Info seq  [hh:mm:ss:mss] request:
    {"seq":12,"type":"request","arguments":{"preferences":{}},"command":"configure"}
Info seq  [hh:mm:ss:mss] response:
    {
     "seq": 0,
     "type": "response",
     "command": "configure",
     "request_seq": 12,
     "success": true
    }
Info seq  [hh:mm:ss:mss] request:
    {"seq":13,"type":"request","arguments":{"preferences":{}},"command":"configure"}
Info seq  [hh:mm:ss:mss] response:
    {
     "seq": 0,
     "type": "response",
     "command": "configure",
     "request_seq": 13,
     "success": true
    }
Info seq  [hh:mm:ss:mss] request:
    {"seq":14,"type":"request","arguments":{"file":"/tests/cases/fourslash/server/fixExtractToInnerFunctionDuplicaton.ts","startLine":1,"startOffset":24,"endLine":1,"endOffset":41,"triggerReason":"implicit"},"command":"getApplicableRefactors"}
Info seq  [hh:mm:ss:mss] response:
    {
     "seq": 0,
     "type": "response",
     "command": "getApplicableRefactors",
     "request_seq": 14,
     "success": true,
     "body": [
      {
       "name": "Extract Symbol",
       "description": "Extract function",
       "actions": [
        {
         "description": "Extract to inner function in function 'foo'",
         "name": "function_scope_0",
         "kind": "refactor.extract.function"
        },
        {
         "description": "Extract to function in global scope",
         "name": "function_scope_1",
         "kind": "refactor.extract.function"
        }
       ]
      },
      {
       "name": "Extract Symbol",
       "description": "Extract constant",
       "actions": [
        {
         "description": "Extract to constant in enclosing scope",
         "name": "constant_scope_0",
         "kind": "refactor.extract.constant"
        },
        {
         "description": "Extract to constant in global scope",
         "name": "constant_scope_1",
         "kind": "refactor.extract.constant"
        }
       ]
      }
     ]
    }
Info seq  [hh:mm:ss:mss] request:
    {"seq":15,"type":"request","arguments":{"preferences":{}},"command":"configure"}
Info seq  [hh:mm:ss:mss] response:
    {
     "seq": 0,
     "type": "response",
     "command": "configure",
     "request_seq": 15,
     "success": true
    }
Info seq  [hh:mm:ss:mss] request:
    {"seq":16,"type":"request","arguments":{"preferences":{}},"command":"configure"}
Info seq  [hh:mm:ss:mss] response:
    {
     "seq": 0,
     "type": "response",
     "command": "configure",
     "request_seq": 16,
     "success": true
    }
Info seq  [hh:mm:ss:mss] request:
    {"seq":17,"type":"request","arguments":{"file":"/tests/cases/fourslash/server/fixExtractToInnerFunctionDuplicaton.ts","startLine":1,"startOffset":24,"endLine":1,"endOffset":41,"triggerReason":"implicit"},"command":"getApplicableRefactors"}
Info seq  [hh:mm:ss:mss] response:
    {
     "seq": 0,
     "type": "response",
     "command": "getApplicableRefactors",
     "request_seq": 17,
     "success": true,
     "body": [
      {
       "name": "Extract Symbol",
       "description": "Extract function",
       "actions": [
        {
         "description": "Extract to inner function in function 'foo'",
         "name": "function_scope_0",
         "kind": "refactor.extract.function"
        },
        {
         "description": "Extract to function in global scope",
         "name": "function_scope_1",
         "kind": "refactor.extract.function"
        }
       ]
      },
      {
       "name": "Extract Symbol",
       "description": "Extract constant",
       "actions": [
        {
         "description": "Extract to constant in enclosing scope",
         "name": "constant_scope_0",
         "kind": "refactor.extract.constant"
        },
        {
         "description": "Extract to constant in global scope",
         "name": "constant_scope_1",
         "kind": "refactor.extract.constant"
        }
       ]
      }
     ]
    }
Info seq  [hh:mm:ss:mss] request:
    {"seq":18,"type":"request","arguments":{"preferences":{}},"command":"configure"}
Info seq  [hh:mm:ss:mss] response:
    {
     "seq": 0,
     "type": "response",
     "command": "configure",
     "request_seq": 18,
     "success": true
    }