Info seq  [hh:mm:ss:mss] currentDirectory:: /home/src/Vscode/Projects/bin useCaseSensitiveFileNames:: false
Info seq  [hh:mm:ss:mss] libs Location:: /home/src/tslibs/TS/Lib
Info seq  [hh:mm:ss:mss] globalTypingsCacheLocation:: /home/src/Library/Caches/typescript
Info seq  [hh:mm:ss:mss] Provided types map file "/home/src/tslibs/TS/Lib/typesMap.json" doesn't exist
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


//// [/home/src/tslibs/TS/Lib/lib.d.ts]
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
interface ReadonlyArray<T> {}
declare const console: { log(msg: any): void; };


Info seq  [hh:mm:ss:mss] request:
    {
      "command": "open",
      "arguments": {
        "file": "/user/users/projects/myproject/index.ts"
      },
      "seq": 1,
      "type": "request"
    }
Info seq  [hh:mm:ss:mss] getConfigFileNameForFile:: File: /user/users/projects/myproject/index.ts ProjectRootPath: undefined:: Result: undefined
Info seq  [hh:mm:ss:mss] Creating InferredProject: /dev/null/inferredProject1*, currentDirectory: /user/users/projects/myproject
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /user/users/projects/myproject/tsconfig.json 2000 undefined WatchType: Config file for the inferred project root
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /user/users/projects/myproject/jsconfig.json 2000 undefined WatchType: Config file for the inferred project root
Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: /dev/null/inferredProject1*
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /user/users/projects/myproject/node_modules 1 undefined WatchType: node_modules for closed script infos and package.jsons affecting module specifier cache
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/users/projects/myproject/node_modules 1 undefined WatchType: node_modules for closed script infos and package.jsons affecting module specifier cache
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /user/users/projects/myproject/node_modules 1 undefined Project: /dev/null/inferredProject1* WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/users/projects/myproject/node_modules 1 undefined Project: /dev/null/inferredProject1* WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /user/users/projects/myproject/node_modules/@types/yargs/package.json 2000 undefined Project: /dev/null/inferredProject1* WatchType: File location affecting resolution
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/tslibs/TS/Lib/lib.d.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /user/users/projects/myproject/node_modules/yargs/package.json 2000 undefined Project: /dev/null/inferredProject1* WatchType: File location affecting resolution
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /user/users/projects/myproject/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/users/projects/myproject/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /user/users/projects/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/users/projects/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: /dev/null/inferredProject1* projectStateVersion: 1 projectProgramVersion: 0 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Project '/dev/null/inferredProject1*' (Inferred)
Info seq  [hh:mm:ss:mss] 	Files (4)
	/home/src/tslibs/TS/Lib/lib.d.ts Text-1 "/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };"
	/user/users/projects/myproject/node_modules/@types/yargs/callback.d.ts Text-1 "export declare class Yargs { positional(): Yargs; }\n"
	/user/users/projects/myproject/node_modules/@types/yargs/index.d.ts Text-1 "\nimport { Yargs } from \"./callback\";\nexport declare function command(command: string, cb: (yargs: Yargs) => void): void;\n"
	/user/users/projects/myproject/index.ts SVC-1-0 "import { command } from \"yargs\";\ncommand(\"foo\", yargs => {\n    yargs.positional();\n});\n"


	../../../../home/src/tslibs/TS/Lib/lib.d.ts
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
      "seq": 0,
      "type": "response",
      "command": "open",
      "request_seq": 1,
      "success": true,
      "performanceData": {
        "updateGraphDurationMs": *
      }
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
/home/src/tslibs/TS/Lib/lib.d.ts: *new*
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

Projects::
/dev/null/inferredProject1* (Inferred) *new*
    projectStateVersion: 1
    projectProgramVersion: 1
    autoImportProviderHost: false

ScriptInfos::
/home/src/tslibs/TS/Lib/lib.d.ts *new*
    version: Text-1
    containingProjects: 1
        /dev/null/inferredProject1*
/user/users/projects/myproject/index.ts (Open) *new*
    version: SVC-1-0
    containingProjects: 1
        /dev/null/inferredProject1* *default*
/user/users/projects/myproject/node_modules/@types/yargs/callback.d.ts *new*
    version: Text-1
    containingProjects: 1
        /dev/null/inferredProject1*
/user/users/projects/myproject/node_modules/@types/yargs/index.d.ts *new*
    version: Text-1
    containingProjects: 1
        /dev/null/inferredProject1*

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
Info seq  [hh:mm:ss:mss] Creating AuxiliaryProject: /dev/null/auxiliaryProject1*, currentDirectory: /user/users/projects/myproject
Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: /dev/null/auxiliaryProject1*
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /user/users/projects/myproject/node_modules 1 undefined Project: /dev/null/auxiliaryProject1* WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/users/projects/myproject/node_modules 1 undefined Project: /dev/null/auxiliaryProject1* WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /user/users/projects/node_modules 1 undefined Project: /dev/null/auxiliaryProject1* WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/users/projects/node_modules 1 undefined Project: /dev/null/auxiliaryProject1* WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /user/users/projects/myproject/node_modules/yargs/package.json 2000 undefined Project: /dev/null/auxiliaryProject1* WatchType: File location affecting resolution
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: /dev/null/auxiliaryProject1* projectStateVersion: 1 projectProgramVersion: 0 structureChanged: true structureIsReused:: Not Elapsed:: *ms
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
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: /dev/null/auxiliaryProject1* projectStateVersion: 2 projectProgramVersion: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
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
      "responseRequired": true,
      "performanceData": {
        "updateGraphDurationMs": *
      }
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
/home/src/tslibs/TS/Lib/lib.d.ts:
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

Projects::
/dev/null/auxiliaryProject1* (Auxiliary) *new*
    projectStateVersion: 2
    projectProgramVersion: 2
/dev/null/inferredProject1* (Inferred) *changed*
    projectStateVersion: 1
    projectProgramVersion: 1
    documentPositionMappers: 1 *changed*
        /user/users/projects/myproject/node_modules/@types/yargs/callback.d.ts: identitySourceMapConsumer *new*
    autoImportProviderHost: false
    noDtsResolutionProject: /dev/null/auxiliaryProject1* *changed*

ScriptInfos::
/home/src/tslibs/TS/Lib/lib.d.ts
    version: Text-1
    containingProjects: 1
        /dev/null/inferredProject1*
/user/users/projects/myproject/index.ts (Open) *changed*
    version: SVC-1-0
    containingProjects: 2 *changed*
        /dev/null/inferredProject1* *default*
        /dev/null/auxiliaryProject1* *new*
/user/users/projects/myproject/node_modules/@types/yargs/callback.d.ts *changed*
    version: Text-1
    sourceMapFilePath: false *changed*
    containingProjects: 1
        /dev/null/inferredProject1*
/user/users/projects/myproject/node_modules/@types/yargs/index.d.ts
    version: Text-1
    containingProjects: 1
        /dev/null/inferredProject1*
/user/users/projects/myproject/node_modules/yargs/callback.js *new*
    version: Text-1
    containingProjects: 1
        /dev/null/auxiliaryProject1*
/user/users/projects/myproject/node_modules/yargs/index.js *new*
    version: Text-1
    containingProjects: 1
        /dev/null/auxiliaryProject1*

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

Projects::
/dev/null/auxiliaryProject1* (Auxiliary)
    projectStateVersion: 2
    projectProgramVersion: 2
/dev/null/inferredProject1* (Inferred) *changed*
    projectStateVersion: 1
    projectProgramVersion: 1
    documentPositionMappers: 2 *changed*
        /user/users/projects/myproject/node_modules/@types/yargs/callback.d.ts: identitySourceMapConsumer
        /user/users/projects/myproject/node_modules/@types/yargs/index.d.ts: identitySourceMapConsumer *new*
    autoImportProviderHost: false
    noDtsResolutionProject: /dev/null/auxiliaryProject1*

ScriptInfos::
/home/src/tslibs/TS/Lib/lib.d.ts
    version: Text-1
    containingProjects: 1
        /dev/null/inferredProject1*
/user/users/projects/myproject/index.ts (Open)
    version: SVC-1-0
    containingProjects: 2
        /dev/null/inferredProject1* *default*
        /dev/null/auxiliaryProject1*
/user/users/projects/myproject/node_modules/@types/yargs/callback.d.ts
    version: Text-1
    sourceMapFilePath: false
    containingProjects: 1
        /dev/null/inferredProject1*
/user/users/projects/myproject/node_modules/@types/yargs/index.d.ts *changed*
    version: Text-1
    sourceMapFilePath: false *changed*
    containingProjects: 1
        /dev/null/inferredProject1*
/user/users/projects/myproject/node_modules/yargs/callback.js
    version: Text-1
    containingProjects: 1
        /dev/null/auxiliaryProject1*
/user/users/projects/myproject/node_modules/yargs/index.js
    version: Text-1
    containingProjects: 1
        /dev/null/auxiliaryProject1*
