currentDirectory:: / useCaseSensitiveFileNames: false
Info seq  [hh:mm:ss:mss] Provided types map file "/typesMap.json" doesn't exist
//// [/index.ts]
import { command } from "yargs";
command("foo", yargs => {
    yargs.positional();
});

//// [/lib.d.ts]
lib.d.ts-Text

//// [/lib.decorators.d.ts]
lib.decorators.d.ts-Text

//// [/lib.decorators.legacy.d.ts]
lib.decorators.legacy.d.ts-Text

//// [/node_modules/@types/yargs/callback.d.ts]
export declare class Yargs { positional(): Yargs; }

//// [/node_modules/@types/yargs/index.d.ts]
import { Yargs } from "./callback";
export declare function command(command: string, cb: (yargs: Yargs) => void): void;

//// [/node_modules/@types/yargs/package.json]
{
    "name": "@types/yargs",
    "version": "1.0.0",
    "types": "./index.d.ts"
}

//// [/node_modules/yargs/callback.js]
export class Yargs { positional() { } }

//// [/node_modules/yargs/index.js]
// Specifically didnt have ./callback import to ensure that resolving module sepcifier adds the file to project at later stage
export function command(cmd, cb) { cb(Yargs) }

//// [/node_modules/yargs/package.json]
{
    "name": "yargs",
    "version": "1.0.0",
    "main": "index.js"
}


Info seq  [hh:mm:ss:mss] request:
    {
      "seq": 0,
      "type": "request",
      "arguments": {
        "file": "/node_modules/@types/yargs/package.json"
      },
      "command": "open"
    }
Info seq  [hh:mm:ss:mss] Search path: /node_modules/@types/yargs
Info seq  [hh:mm:ss:mss] For info: /node_modules/@types/yargs/package.json :: No config files found.
Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: /dev/null/inferredProject1*
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /node_modules/@types/yargs/package.json 2000 undefined Project: /dev/null/inferredProject1* WatchType: File location affecting resolution
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /node_modules/@types/yargs/index.d.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /node_modules/@types/yargs/callback.d.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /lib.d.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /lib.decorators.d.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /lib.decorators.legacy.d.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /node_modules/@types/yargs/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /node_modules/@types/yargs/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: /dev/null/inferredProject1* Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Project '/dev/null/inferredProject1*' (Inferred)
Info seq  [hh:mm:ss:mss] 	Files (6)
	/lib.d.ts Text-1 lib.d.ts-Text
	/lib.decorators.d.ts Text-1 lib.decorators.d.ts-Text
	/lib.decorators.legacy.d.ts Text-1 lib.decorators.legacy.d.ts-Text
	/node_modules/@types/yargs/package.json SVC-1-0 "{\n    \"name\": \"@types/yargs\",\n    \"version\": \"1.0.0\",\n    \"types\": \"./index.d.ts\"\n}"
	/node_modules/@types/yargs/callback.d.ts Text-1 "export declare class Yargs { positional(): Yargs; }"
	/node_modules/@types/yargs/index.d.ts Text-1 "import { Yargs } from \"./callback\";\nexport declare function command(command: string, cb: (yargs: Yargs) => void): void;"


	../../../lib.d.ts
	  Default library for target 'es5'
	../../../lib.decorators.d.ts
	  Library referenced via 'decorators' from file '../../../lib.d.ts'
	../../../lib.decorators.legacy.d.ts
	  Library referenced via 'decorators.legacy' from file '../../../lib.d.ts'
	package.json
	  Root file specified for compilation
	callback.d.ts
	  Imported via "./callback" from file 'index.d.ts' with packageId '@types/yargs/callback.d.ts@1.0.0'
	index.d.ts
	  Entry point for implicit type library 'yargs' with packageId '@types/yargs/index.d.ts@1.0.0'

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Project '/dev/null/inferredProject1*' (Inferred)
Info seq  [hh:mm:ss:mss] 	Files (6)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: /node_modules/@types/yargs/package.json ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /dev/null/inferredProject1*
After Request
watchedFiles::
/lib.d.ts: *new*
  {"pollingInterval":500}
/lib.decorators.d.ts: *new*
  {"pollingInterval":500}
/lib.decorators.legacy.d.ts: *new*
  {"pollingInterval":500}
/node_modules/@types/yargs/callback.d.ts: *new*
  {"pollingInterval":500}
/node_modules/@types/yargs/index.d.ts: *new*
  {"pollingInterval":500}
/node_modules/@types/yargs/package.json: *new*
  {"pollingInterval":2000}

watchedDirectoriesRecursive::
/node_modules/@types/yargs/node_modules/@types: *new*
  {}

Info seq  [hh:mm:ss:mss] request:
    {
      "seq": 1,
      "type": "request",
      "arguments": {
        "file": "/index.ts"
      },
      "command": "open"
    }
Info seq  [hh:mm:ss:mss] Search path: /
Info seq  [hh:mm:ss:mss] For info: /index.ts :: No config files found.
Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: /dev/null/inferredProject2*
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /node_modules/@types/yargs/package.json 2000 undefined Project: /dev/null/inferredProject2* WatchType: File location affecting resolution
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: /dev/null/inferredProject2* Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Project '/dev/null/inferredProject2*' (Inferred)
Info seq  [hh:mm:ss:mss] 	Files (6)
	/lib.d.ts Text-1 lib.d.ts-Text
	/lib.decorators.d.ts Text-1 lib.decorators.d.ts-Text
	/lib.decorators.legacy.d.ts Text-1 lib.decorators.legacy.d.ts-Text
	/node_modules/@types/yargs/callback.d.ts Text-1 "export declare class Yargs { positional(): Yargs; }"
	/node_modules/@types/yargs/index.d.ts Text-1 "import { Yargs } from \"./callback\";\nexport declare function command(command: string, cb: (yargs: Yargs) => void): void;"
	/index.ts SVC-1-0 "import { command } from \"yargs\";\ncommand(\"foo\", yargs => {\n    yargs.positional();\n});"


	lib.d.ts
	  Default library for target 'es5'
	lib.decorators.d.ts
	  Library referenced via 'decorators' from file 'lib.d.ts'
	lib.decorators.legacy.d.ts
	  Library referenced via 'decorators.legacy' from file 'lib.d.ts'
	node_modules/@types/yargs/callback.d.ts
	  Imported via "./callback" from file 'node_modules/@types/yargs/index.d.ts' with packageId '@types/yargs/callback.d.ts@1.0.0'
	node_modules/@types/yargs/index.d.ts
	  Imported via "yargs" from file 'index.ts' with packageId '@types/yargs/index.d.ts@1.0.0'
	  Entry point for implicit type library 'yargs' with packageId '@types/yargs/index.d.ts@1.0.0'
	index.ts
	  Root file specified for compilation

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Project '/dev/null/inferredProject1*' (Inferred)
Info seq  [hh:mm:ss:mss] 	Files (6)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Project '/dev/null/inferredProject2*' (Inferred)
Info seq  [hh:mm:ss:mss] 	Files (6)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: /node_modules/@types/yargs/package.json ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /dev/null/inferredProject1*
Info seq  [hh:mm:ss:mss] 	FileName: /index.ts ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /dev/null/inferredProject2*
After Request
watchedFiles::
/lib.d.ts:
  {"pollingInterval":500}
/lib.decorators.d.ts:
  {"pollingInterval":500}
/lib.decorators.legacy.d.ts:
  {"pollingInterval":500}
/node_modules/@types/yargs/callback.d.ts:
  {"pollingInterval":500}
/node_modules/@types/yargs/index.d.ts:
  {"pollingInterval":500}
/node_modules/@types/yargs/package.json:
  {"pollingInterval":2000}
  {"pollingInterval":2000} *new*

watchedDirectoriesRecursive::
/node_modules/@types/yargs/node_modules/@types:
  {}

Info seq  [hh:mm:ss:mss] request:
    {
      "seq": 2,
      "type": "request",
      "arguments": {
        "file": "/index.ts",
        "line": 3,
        "offset": 11
      },
      "command": "findSourceDefinition"
    }
Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: /dev/null/auxiliaryProject1*
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /node_modules/yargs/index.js 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: /dev/null/auxiliaryProject1* Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Project '/dev/null/auxiliaryProject1*' (Auxiliary)
Info seq  [hh:mm:ss:mss] 	Files (2)
	/node_modules/yargs/index.js Text-1 "// Specifically didnt have ./callback import to ensure that resolving module sepcifier adds the file to project at later stage\nexport function command(cmd, cb) { cb(Yargs) }"
	/index.ts SVC-1-0 "import { command } from \"yargs\";\ncommand(\"foo\", yargs => {\n    yargs.positional();\n});"


	node_modules/yargs/index.js
	  Imported via "yargs" from file 'index.ts' with packageId 'yargs/index.js@1.0.0'
	index.ts
	  Root file specified for compilation

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /node_modules/yargs/callback.js 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: /dev/null/auxiliaryProject1*
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: /dev/null/auxiliaryProject1* Version: 2 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Project '/dev/null/auxiliaryProject1*' (Auxiliary)
Info seq  [hh:mm:ss:mss] 	Files (3)
	/node_modules/yargs/index.js Text-1 "// Specifically didnt have ./callback import to ensure that resolving module sepcifier adds the file to project at later stage\nexport function command(cmd, cb) { cb(Yargs) }"
	/index.ts SVC-1-0 "import { command } from \"yargs\";\ncommand(\"foo\", yargs => {\n    yargs.positional();\n});"
	/node_modules/yargs/callback.js Text-1 "export class Yargs { positional() { } }"


	node_modules/yargs/index.js
	  Imported via "yargs" from file 'index.ts' with packageId 'yargs/index.js@1.0.0'
	index.ts
	  Root file specified for compilation
	node_modules/yargs/callback.js
	  Root file specified for compilation

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] response:
    {
      "seq": 0,
      "type": "response",
      "command": "findSourceDefinition",
      "request_seq": 2,
      "success": true,
      "performanceData": {
        "updateGraphDurationMs": *
      },
      "body": [
        {
          "file": "/node_modules/yargs/callback.js",
          "start": {
            "line": 1,
            "offset": 22
          },
          "end": {
            "line": 1,
            "offset": 32
          },
          "contextStart": {
            "line": 1,
            "offset": 22
          },
          "contextEnd": {
            "line": 1,
            "offset": 38
          },
          "unverified": true
        }
      ]
    }
After Request
watchedFiles::
/lib.d.ts:
  {"pollingInterval":500}
/lib.decorators.d.ts:
  {"pollingInterval":500}
/lib.decorators.legacy.d.ts:
  {"pollingInterval":500}
/node_modules/@types/yargs/callback.d.ts:
  {"pollingInterval":500}
/node_modules/@types/yargs/index.d.ts:
  {"pollingInterval":500}
/node_modules/@types/yargs/package.json:
  {"pollingInterval":2000}
  {"pollingInterval":2000}
/node_modules/yargs/callback.js: *new*
  {"pollingInterval":500}
/node_modules/yargs/index.js: *new*
  {"pollingInterval":500}

watchedDirectoriesRecursive::
/node_modules/@types/yargs/node_modules/@types:
  {}
