currentDirectory:: / useCaseSensitiveFileNames: false
Info seq  [hh:mm:ss:mss] Provided types map file "/typesMap.json" doesn't exist
Creating project service
//// [/c/d/f0.ts]
import {x} from "f1"

//// [/c/f1.ts]
foo()


Info seq  [hh:mm:ss:mss] Search path: /c/d
Info seq  [hh:mm:ss:mss] For info: /c/d/f0.ts :: No config files found.
Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: /dev/null/inferredProject1*
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /c/f1.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: /dev/null/inferredProject1* Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Project '/dev/null/inferredProject1*' (Inferred)
Info seq  [hh:mm:ss:mss] 	Files (2)
	/c/f1.ts Text-1 "foo()"
	/c/d/f0.ts SVC-1-0 "import {x} from \"f1\""


	../f1.ts
	  Imported via "f1" from file 'f0.ts'
	f0.ts
	  Root file specified for compilation

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Project '/dev/null/inferredProject1*' (Inferred)
Info seq  [hh:mm:ss:mss] 	Files (2)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: /c/d/f0.ts ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /dev/null/inferredProject1*
Info seq  [hh:mm:ss:mss] getSemanticDiagnostics:: /c/f1.ts:: 1
Info seq  [hh:mm:ss:mss] ../f1.ts(1,1): error TS2304: Cannot find name 'foo'.

Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: /dev/null/inferredProject1*
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: /dev/null/inferredProject1* Version: 2 structureChanged: false structureIsReused:: Completely Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Project '/dev/null/inferredProject1*' (Inferred)
Info seq  [hh:mm:ss:mss] 	Files (2)
	/c/f1.ts Text-1 "foo()"
	/c/d/f0.ts SVC-1-1 "import {x} from \"f1\";\n                 var x: string = 1;"

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] getSemanticDiagnostics:: /c/f1.ts:: 1
Info seq  [hh:mm:ss:mss] ../f1.ts(1,1): error TS2304: Cannot find name 'foo'.

Info seq  [hh:mm:ss:mss] fileExists::

Info seq  [hh:mm:ss:mss] directoryExists::

Info seq  [hh:mm:ss:mss] getDirectories::

Info seq  [hh:mm:ss:mss] readFile::

Info seq  [hh:mm:ss:mss] readDirectory::

Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: /dev/null/inferredProject1*
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: /dev/null/inferredProject1* Version: 3 structureChanged: true structureIsReused:: SafeModules Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Project '/dev/null/inferredProject1*' (Inferred)
Info seq  [hh:mm:ss:mss] 	Files (1)
	/c/d/f0.ts SVC-1-2 "import {x} from \"f2\""


	f0.ts
	  Root file specified for compilation

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Could not find source file: '/c/f1.ts'.
Info seq  [hh:mm:ss:mss] fileExists::
/c/d/f2.d.ts: 1
/c/d/f2.js: 1
/c/d/f2.jsx: 1
/c/d/f2.ts: 1
/c/d/f2.tsx: 1
/c/f2.d.ts: 1
/c/f2.js: 1
/c/f2.jsx: 1
/c/f2.ts: 1
/c/f2.tsx: 1
/f2.d.ts: 1
/f2.js: 1
/f2.jsx: 1
/f2.ts: 1
/f2.tsx: 1
Info seq  [hh:mm:ss:mss] directoryExists::
/: 2
/c: 2
/c/d: 2
/c/d/node_modules: 1
/c/d/node_modules/@types: 1
/c/node_modules: 1
/c/node_modules/@types: 1
/node_modules: 1
/node_modules/@types: 1
Info seq  [hh:mm:ss:mss] getDirectories::

Info seq  [hh:mm:ss:mss] readFile::

Info seq  [hh:mm:ss:mss] readDirectory::

Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: /dev/null/inferredProject1*
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: /dev/null/inferredProject1* Version: 4 structureChanged: true structureIsReused:: SafeModules Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Project '/dev/null/inferredProject1*' (Inferred)
Info seq  [hh:mm:ss:mss] 	Files (2)
	/c/f1.ts Text-1 "foo()"
	/c/d/f0.ts SVC-1-3 "import {x} from \"f1\""


	../f1.ts
	  Imported via "f1" from file 'f0.ts'
	f0.ts
	  Root file specified for compilation

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] getSemanticDiagnostics:: /c/f1.ts:: 1
Info seq  [hh:mm:ss:mss] ../f1.ts(1,1): error TS2304: Cannot find name 'foo'.

Info seq  [hh:mm:ss:mss] fileExists::
/c/d/f1.d.ts: 1
/c/d/f1.ts: 1
/c/d/f1.tsx: 1
/c/f1.ts: 1
Info seq  [hh:mm:ss:mss] directoryExists::
/c: 1
/c/d: 1
/c/d/node_modules/@types: 1
/c/node_modules/@types: 1
/node_modules/@types: 1
Info seq  [hh:mm:ss:mss] getDirectories::

Info seq  [hh:mm:ss:mss] readFile::

Info seq  [hh:mm:ss:mss] readDirectory::

Info seq  [hh:mm:ss:mss] Scheduled: /dev/null/inferredProject1*
Info seq  [hh:mm:ss:mss] Scheduled: *ensureProjectForOpenFiles*
Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: /dev/null/inferredProject1*
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: /dev/null/inferredProject1* Version: 5 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Project '/dev/null/inferredProject1*' (Inferred)
Info seq  [hh:mm:ss:mss] 	Files (2)
	/c/f1.ts Text-1 "foo()"
	/c/d/f0.ts SVC-1-3 "import {x} from \"f1\""

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] getSemanticDiagnostics:: /c/f1.ts:: 1
Info seq  [hh:mm:ss:mss] ../f1.ts(1,1): error TS2304: Cannot find name 'foo'.

Info seq  [hh:mm:ss:mss] fileExists::
/c/d/f1.d.ts: 1
/c/d/f1.ts: 1
/c/d/f1.tsx: 1
/c/f1.ts: 1
Info seq  [hh:mm:ss:mss] directoryExists::
/c: 1
/c/d: 1
/c/d/node_modules/@types: 1
/c/node_modules/@types: 1
/node_modules/@types: 1
Info seq  [hh:mm:ss:mss] getDirectories::

Info seq  [hh:mm:ss:mss] readFile::

Info seq  [hh:mm:ss:mss] readDirectory::
