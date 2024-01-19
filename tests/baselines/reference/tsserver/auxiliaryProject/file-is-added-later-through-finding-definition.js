currentDirectory:: / useCaseSensitiveFileNames: false
Info seq  [hh:mm:ss:mss] Provided types map file "/typesMap.json" doesn't exist
Before request
//// [/user/users/projects/myproject/node_modules/@types/yargs/package.json]
{
  "name": "@types/yargs",
  "version": "1.0.0",
  "types": "./index.d.ts"
}

//// [/user/users/projects/myproject/node_modules/@types/yargs/callback.d.ts]
export declare class Yargs { positional(): Yargs; }


//// [/user/users/projects/myproject/node_modules/@types/yargs/index.d.ts]

import { Yargs } from "./callback";
export declare function command(command: string, cb: (yargs: Yargs) => void): void;


//// [/user/users/projects/myproject/node_modules/yargs/package.json]
{
  "name": "yargs",
  "version": "1.0.0",
  "main": "index.js"
}

//// [/user/users/projects/myproject/node_modules/yargs/callback.js]
export class Yargs { positional() { } }


//// [/user/users/projects/myproject/node_modules/yargs/index.js]
// Specifically didnt have ./callback import to ensure that resolving module sepcifier adds the file to project at later stage
export function command(cmd, cb) { cb(Yargs) }


//// [/user/users/projects/myproject/index.ts]
import { command } from "yargs";
command("foo", yargs => {
    yargs.positional();
});


//// [/a/lib/lib.d.ts]
/// <reference no-default-lib="true"/>
interface Boolean {}
interface Function {}
interface CallableFunction {}
interface NewableFunction {}
interface IArguments {}
interface Number { toExponential: any; }
interface Object {}
interface RegExp {}
interface String { charAt: any; }
interface Array<T> { length: number; [n: number]: T; }


Info seq  [hh:mm:ss:mss] request:
    {
      "command": "open",
      "arguments": {
        "file": "/user/users/projects/myproject/index.ts"
      },
      "seq": 1,
      "type": "request"
    }
Info seq  [hh:mm:ss:mss] Search path: /user/users/projects/myproject
Info seq  [hh:mm:ss:mss] For info: /user/users/projects/myproject/index.ts :: No config files found.
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /user/users/projects/myproject/tsconfig.json 2000 undefined WatchType: Config file for the inferred project root
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /user/users/projects/myproject/jsconfig.json 2000 undefined WatchType: Config file for the inferred project root
Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: /dev/null/inferredProject1*
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /user/users/projects/myproject/node_modules 1 undefined WatchType: node_modules for closed script infos and package.jsons affecting module specifier cache
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/users/projects/myproject/node_modules 1 undefined WatchType: node_modules for closed script infos and package.jsons affecting module specifier cache
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /user/users/projects/myproject/node_modules 1 undefined Project: /dev/null/inferredProject1* WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/users/projects/myproject/node_modules 1 undefined Project: /dev/null/inferredProject1* WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /user/users/projects/myproject/node_modules/@types/yargs/package.json 2000 undefined Project: /dev/null/inferredProject1* WatchType: File location affecting resolution
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /a/lib/lib.d.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /user/users/projects/myproject/node_modules/yargs/package.json 2000 undefined Project: /dev/null/inferredProject1* WatchType: File location affecting resolution
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /user/users/projects/myproject/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/users/projects/myproject/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /user/users/projects/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/users/projects/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: /dev/null/inferredProject1* Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Project '/dev/null/inferredProject1*' (Inferred)
Info seq  [hh:mm:ss:mss] 	Files (4)
	/a/lib/lib.d.ts Text-1 "/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }"
	/user/users/projects/myproject/node_modules/@types/yargs/callback.d.ts Text-1 "export declare class Yargs { positional(): Yargs; }\n"
	/user/users/projects/myproject/node_modules/@types/yargs/index.d.ts Text-1 "\nimport { Yargs } from \"./callback\";\nexport declare function command(command: string, cb: (yargs: Yargs) => void): void;\n"
	/user/users/projects/myproject/index.ts SVC-1-0 "import { command } from \"yargs\";\ncommand(\"foo\", yargs => {\n    yargs.positional();\n});\n"


	../../../../a/lib/lib.d.ts
	  Default library for target 'es5'
	node_modules/@types/yargs/callback.d.ts
	  Imported via "./callback" from file 'node_modules/@types/yargs/index.d.ts' with packageId '@types/yargs/callback.d.ts@1.0.0'
	node_modules/@types/yargs/index.d.ts
	  Imported via "yargs" from file 'index.ts' with packageId '@types/yargs/index.d.ts@1.0.0'
	  Entry point for implicit type library 'yargs' with packageId '@types/yargs/index.d.ts@1.0.0'
	index.ts
	  Root file specified for compilation

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Project '/dev/null/inferredProject1*' (Inferred)
Info seq  [hh:mm:ss:mss] 	Files (4)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: /user/users/projects/myproject/index.ts ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /dev/null/inferredProject1*
Info seq  [hh:mm:ss:mss] response:
    {
      "responseRequired": false
    }
After request

PolledWatches::
/user/users/projects/myproject/jsconfig.json: *new*
  {"pollingInterval":2000}
/user/users/projects/myproject/tsconfig.json: *new*
  {"pollingInterval":2000}
/user/users/projects/node_modules/@types: *new*
  {"pollingInterval":500}

FsWatches::
/a/lib/lib.d.ts: *new*
  {}
/user/users/projects/myproject/node_modules/@types/yargs/package.json: *new*
  {}
/user/users/projects/myproject/node_modules/yargs/package.json: *new*
  {}

FsWatchesRecursive::
/user/users/projects/myproject/node_modules: *new*
  {}
/user/users/projects/myproject/node_modules/@types: *new*
  {}

Before request

Info seq  [hh:mm:ss:mss] request:
    {
      "command": "findSourceDefinition",
      "arguments": {
        "file": "/user/users/projects/myproject/index.ts",
        "line": 3,
        "offset": 11
      },
      "seq": 2,
      "type": "request"
    }
Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: /dev/null/auxiliaryProject1*
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /user/users/projects/myproject/node_modules 1 undefined Project: /dev/null/auxiliaryProject1* WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/users/projects/myproject/node_modules 1 undefined Project: /dev/null/auxiliaryProject1* WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /user/users/projects/node_modules 1 undefined Project: /dev/null/auxiliaryProject1* WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/users/projects/node_modules 1 undefined Project: /dev/null/auxiliaryProject1* WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /user/users/projects/myproject/node_modules/yargs/package.json 2000 undefined Project: /dev/null/auxiliaryProject1* WatchType: File location affecting resolution
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: /dev/null/auxiliaryProject1* Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Project '/dev/null/auxiliaryProject1*' (Auxiliary)
Info seq  [hh:mm:ss:mss] 	Files (2)
	/user/users/projects/myproject/node_modules/yargs/index.js Text-1 "// Specifically didnt have ./callback import to ensure that resolving module sepcifier adds the file to project at later stage\nexport function command(cmd, cb) { cb(Yargs) }\n"
	/user/users/projects/myproject/index.ts SVC-1-0 "import { command } from \"yargs\";\ncommand(\"foo\", yargs => {\n    yargs.positional();\n});\n"


	node_modules/yargs/index.js
	  Imported via "yargs" from file 'index.ts' with packageId 'yargs/index.js@1.0.0'
	index.ts
	  Root file specified for compilation

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: /dev/null/auxiliaryProject1*
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: /dev/null/auxiliaryProject1* Version: 2 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Project '/dev/null/auxiliaryProject1*' (Auxiliary)
Info seq  [hh:mm:ss:mss] 	Files (3)
	/user/users/projects/myproject/node_modules/yargs/index.js Text-1 "// Specifically didnt have ./callback import to ensure that resolving module sepcifier adds the file to project at later stage\nexport function command(cmd, cb) { cb(Yargs) }\n"
	/user/users/projects/myproject/index.ts SVC-1-0 "import { command } from \"yargs\";\ncommand(\"foo\", yargs => {\n    yargs.positional();\n});\n"
	/user/users/projects/myproject/node_modules/yargs/callback.js Text-1 "export class Yargs { positional() { } }\n"


	node_modules/yargs/index.js
	  Imported via "yargs" from file 'index.ts' with packageId 'yargs/index.js@1.0.0'
	index.ts
	  Root file specified for compilation
	node_modules/yargs/callback.js
	  Root file specified for compilation

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] response:
    {
      "response": [
        {
          "file": "/user/users/projects/myproject/node_modules/yargs/callback.js",
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
      ],
      "responseRequired": true
    }
After request

PolledWatches::
/user/users/projects/myproject/jsconfig.json:
  {"pollingInterval":2000}
/user/users/projects/myproject/tsconfig.json:
  {"pollingInterval":2000}
/user/users/projects/node_modules: *new*
  {"pollingInterval":500}
/user/users/projects/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/a/lib/lib.d.ts:
  {}
/user/users/projects/myproject/node_modules/@types/yargs/package.json:
  {}
/user/users/projects/myproject/node_modules/yargs/package.json:
  {}

FsWatchesRecursive::
/user/users/projects/myproject/node_modules:
  {}
/user/users/projects/myproject/node_modules/@types:
  {}

Before request

Info seq  [hh:mm:ss:mss] request:
    {
      "command": "findSourceDefinition",
      "arguments": {
        "file": "/user/users/projects/myproject/index.ts",
        "line": 3,
        "offset": 11
      },
      "seq": 3,
      "type": "request"
    }
Info seq  [hh:mm:ss:mss] response:
    {
      "response": [
        {
          "file": "/user/users/projects/myproject/node_modules/yargs/callback.js",
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
      ],
      "responseRequired": true
    }
After request

Before request

Info seq  [hh:mm:ss:mss] request:
    {
      "command": "findSourceDefinition",
      "arguments": {
        "file": "/user/users/projects/myproject/index.ts",
        "line": 2,
        "offset": 1
      },
      "seq": 4,
      "type": "request"
    }
Info seq  [hh:mm:ss:mss] response:
    {
      "response": [
        {
          "file": "/user/users/projects/myproject/node_modules/yargs/index.js",
          "start": {
            "line": 2,
            "offset": 17
          },
          "end": {
            "line": 2,
            "offset": 24
          },
          "contextStart": {
            "line": 2,
            "offset": 1
          },
          "contextEnd": {
            "line": 2,
            "offset": 47
          }
        }
      ],
      "responseRequired": true
    }
After request
