Info seq  [hh:mm:ss:mss] currentDirectory:: /home/src/Vscode/Projects/bin useCaseSensitiveFileNames:: false
Info seq  [hh:mm:ss:mss] libs Location:: /home/src/tslibs/TS/Lib
Info seq  [hh:mm:ss:mss] globalTypingsCacheLocation:: /home/src/Library/Caches/typescript
Info seq  [hh:mm:ss:mss] request:
    {
      "seq": 0,
      "type": "request",
      "arguments": {
        "options": {
          "target": "es2025",
          "newLine": "crlf",
          "lib": [
            "es5"
          ],
          "moduleResolution": "bundler",
          "skipDefaultLibCheck": true
        }
      },
      "command": "compilerOptionsForInferredProjects"
    }
Info seq  [hh:mm:ss:mss] response:
    {
      "seq": 0,
      "type": "response",
      "command": "compilerOptionsForInferredProjects",
      "request_seq": 0,
      "success": true,
      "body": true
    }
//// [/home/src/workspaces/project/index.ts]
import { command } from "yargs";
command("foo", yargs => {
    yargs.positional();
});

//// [/home/src/workspaces/project/node_modules/@types/yargs/callback.d.ts]
export declare class Yargs { positional(): Yargs; }

//// [/home/src/workspaces/project/node_modules/@types/yargs/index.d.ts]
import { Yargs } from "./callback";
export declare function command(command: string, cb: (yargs: Yargs) => void): void;

//// [/home/src/workspaces/project/node_modules/@types/yargs/package.json]
{
    "name": "@types/yargs",
    "version": "1.0.0",
    "types": "./index.d.ts"
}

//// [/home/src/workspaces/project/node_modules/yargs/callback.js]
export class Yargs { positional() { } }

//// [/home/src/workspaces/project/node_modules/yargs/index.js]
import { Yargs } from "./callback";
export function command(cmd, cb) { cb(Yargs) }

//// [/home/src/workspaces/project/node_modules/yargs/package.json]
{
    "name": "yargs",
    "version": "1.0.0",
    "main": "index.js"
}


Info seq  [hh:mm:ss:mss] request:
    {
      "seq": 1,
      "type": "request",
      "arguments": {
        "file": "/home/src/workspaces/project/node_modules/@types/yargs/package.json"
      },
      "command": "open"
    }
Info seq  [hh:mm:ss:mss] getConfigFileNameForFile:: File: /home/src/workspaces/project/node_modules/@types/yargs/package.json ProjectRootPath: undefined:: Result: undefined
Info seq  [hh:mm:ss:mss] Creating InferredProject: /dev/null/inferredProject1*, currentDirectory: /home/src/workspaces/project/node_modules/@types/yargs
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/workspaces/project/node_modules/@types/yargs/tsconfig.json 2000 undefined WatchType: Config file for the inferred project root
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/workspaces/project/node_modules/@types/yargs/jsconfig.json 2000 undefined WatchType: Config file for the inferred project root
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/workspaces/project/node_modules/@types/tsconfig.json 2000 undefined WatchType: Config file for the inferred project root
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/workspaces/project/node_modules/@types/jsconfig.json 2000 undefined WatchType: Config file for the inferred project root
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/workspaces/project/node_modules/tsconfig.json 2000 undefined WatchType: Config file for the inferred project root
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/workspaces/project/node_modules/jsconfig.json 2000 undefined WatchType: Config file for the inferred project root
Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: /dev/null/inferredProject1*
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/tslibs/TS/Lib/lib.es5.d.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/tslibs/TS/Lib/lib.decorators.d.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/tslibs/TS/Lib/lib.decorators.legacy.d.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: /dev/null/inferredProject1* projectStateVersion: 1 projectProgramVersion: 0 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Project '/dev/null/inferredProject1*' (Inferred)
Info seq  [hh:mm:ss:mss] 	Files (4)
	/home/src/tslibs/TS/Lib/lib.es5.d.ts Text-1 lib.es5.d.ts-Text
	/home/src/tslibs/TS/Lib/lib.decorators.d.ts Text-1 lib.decorators.d.ts-Text
	/home/src/tslibs/TS/Lib/lib.decorators.legacy.d.ts Text-1 lib.decorators.legacy.d.ts-Text
	/home/src/workspaces/project/node_modules/@types/yargs/package.json SVC-1-0 "{\n    \"name\": \"@types/yargs\",\n    \"version\": \"1.0.0\",\n    \"types\": \"./index.d.ts\"\n}"


	../../../../../tslibs/TS/Lib/lib.es5.d.ts
	  Library 'lib.es5.d.ts' specified in compilerOptions
	../../../../../tslibs/TS/Lib/lib.decorators.d.ts
	  Library referenced via 'decorators' from file '../../../../../tslibs/TS/Lib/lib.es5.d.ts'
	../../../../../tslibs/TS/Lib/lib.decorators.legacy.d.ts
	  Library referenced via 'decorators.legacy' from file '../../../../../tslibs/TS/Lib/lib.es5.d.ts'
	package.json
	  Root file specified for compilation

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Project '/dev/null/inferredProject1*' (Inferred)
Info seq  [hh:mm:ss:mss] 	Files (4)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: /home/src/workspaces/project/node_modules/@types/yargs/package.json ProjectRootPath: undefined
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
After Request
watchedFiles::
/home/src/tslibs/TS/Lib/lib.decorators.d.ts: *new*
  {"pollingInterval":500}
/home/src/tslibs/TS/Lib/lib.decorators.legacy.d.ts: *new*
  {"pollingInterval":500}
/home/src/tslibs/TS/Lib/lib.es5.d.ts: *new*
  {"pollingInterval":500}
/home/src/workspaces/project/node_modules/@types/jsconfig.json: *new*
  {"pollingInterval":2000}
/home/src/workspaces/project/node_modules/@types/tsconfig.json: *new*
  {"pollingInterval":2000}
/home/src/workspaces/project/node_modules/@types/yargs/jsconfig.json: *new*
  {"pollingInterval":2000}
/home/src/workspaces/project/node_modules/@types/yargs/tsconfig.json: *new*
  {"pollingInterval":2000}
/home/src/workspaces/project/node_modules/jsconfig.json: *new*
  {"pollingInterval":2000}
/home/src/workspaces/project/node_modules/tsconfig.json: *new*
  {"pollingInterval":2000}

Projects::
/dev/null/inferredProject1* (Inferred) *new*
    projectStateVersion: 1
    projectProgramVersion: 1

ScriptInfos::
/home/src/tslibs/TS/Lib/lib.decorators.d.ts *new*
    version: Text-1
    containingProjects: 1
        /dev/null/inferredProject1*
/home/src/tslibs/TS/Lib/lib.decorators.legacy.d.ts *new*
    version: Text-1
    containingProjects: 1
        /dev/null/inferredProject1*
/home/src/tslibs/TS/Lib/lib.es5.d.ts *new*
    version: Text-1
    containingProjects: 1
        /dev/null/inferredProject1*
/home/src/workspaces/project/node_modules/@types/yargs/package.json (Open) *new*
    version: SVC-1-0
    containingProjects: 1
        /dev/null/inferredProject1* *default*

Info seq  [hh:mm:ss:mss] request:
    {
      "seq": 2,
      "type": "request",
      "arguments": {
        "file": "/home/src/workspaces/project/index.ts"
      },
      "command": "open"
    }
Info seq  [hh:mm:ss:mss] getConfigFileNameForFile:: File: /home/src/workspaces/project/index.ts ProjectRootPath: undefined:: Result: undefined
Info seq  [hh:mm:ss:mss] Creating InferredProject: /dev/null/inferredProject2*, currentDirectory: /home/src/workspaces/project
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/workspaces/project/tsconfig.json 2000 undefined WatchType: Config file for the inferred project root
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/workspaces/project/jsconfig.json 2000 undefined WatchType: Config file for the inferred project root
Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: /dev/null/inferredProject2*
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/workspaces/project/node_modules/@types/yargs/index.d.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /home/src/workspaces/project/node_modules 1 undefined Project: /dev/null/inferredProject2* WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /home/src/workspaces/project/node_modules 1 undefined Project: /dev/null/inferredProject2* WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/workspaces/project/node_modules/@types/yargs/package.json 2000 undefined Project: /dev/null/inferredProject2* WatchType: File location affecting resolution
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/workspaces/project/node_modules/@types/yargs/callback.d.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /home/src/workspaces 0 undefined Project: /dev/null/inferredProject2* WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /home/src/workspaces 0 undefined Project: /dev/null/inferredProject2* WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /home/src/workspaces/project 0 undefined Project: /dev/null/inferredProject2* WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /home/src/workspaces/project 0 undefined Project: /dev/null/inferredProject2* WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/workspaces/project/node_modules/yargs/package.json 2000 undefined Project: /dev/null/inferredProject2* WatchType: File location affecting resolution
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: /dev/null/inferredProject2* projectStateVersion: 1 projectProgramVersion: 0 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Project '/dev/null/inferredProject2*' (Inferred)
Info seq  [hh:mm:ss:mss] 	Files (6)
	/home/src/tslibs/TS/Lib/lib.es5.d.ts Text-1 lib.es5.d.ts-Text
	/home/src/tslibs/TS/Lib/lib.decorators.d.ts Text-1 lib.decorators.d.ts-Text
	/home/src/tslibs/TS/Lib/lib.decorators.legacy.d.ts Text-1 lib.decorators.legacy.d.ts-Text
	/home/src/workspaces/project/node_modules/@types/yargs/callback.d.ts Text-1 "export declare class Yargs { positional(): Yargs; }"
	/home/src/workspaces/project/node_modules/@types/yargs/index.d.ts Text-1 "import { Yargs } from \"./callback\";\nexport declare function command(command: string, cb: (yargs: Yargs) => void): void;"
	/home/src/workspaces/project/index.ts SVC-1-0 "import { command } from \"yargs\";\ncommand(\"foo\", yargs => {\n    yargs.positional();\n});"


	../../tslibs/TS/Lib/lib.es5.d.ts
	  Library 'lib.es5.d.ts' specified in compilerOptions
	../../tslibs/TS/Lib/lib.decorators.d.ts
	  Library referenced via 'decorators' from file '../../tslibs/TS/Lib/lib.es5.d.ts'
	../../tslibs/TS/Lib/lib.decorators.legacy.d.ts
	  Library referenced via 'decorators.legacy' from file '../../tslibs/TS/Lib/lib.es5.d.ts'
	node_modules/@types/yargs/callback.d.ts
	  Imported via "./callback" from file 'node_modules/@types/yargs/index.d.ts' with packageId '@types/yargs/callback.d.ts@1.0.0'
	node_modules/@types/yargs/index.d.ts
	  Imported via "yargs" from file 'index.ts' with packageId '@types/yargs/index.d.ts@1.0.0'
	index.ts
	  Root file specified for compilation

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Project '/dev/null/inferredProject1*' (Inferred)
Info seq  [hh:mm:ss:mss] 	Files (4)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Project '/dev/null/inferredProject2*' (Inferred)
Info seq  [hh:mm:ss:mss] 	Files (6)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: /home/src/workspaces/project/node_modules/@types/yargs/package.json ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /dev/null/inferredProject1*
Info seq  [hh:mm:ss:mss] 	FileName: /home/src/workspaces/project/index.ts ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /dev/null/inferredProject2*
Info seq  [hh:mm:ss:mss] response:
    {
      "seq": 0,
      "type": "response",
      "command": "open",
      "request_seq": 2,
      "success": true,
      "performanceData": {
        "updateGraphDurationMs": *
      }
    }
After Request
watchedFiles::
/home/src/tslibs/TS/Lib/lib.decorators.d.ts:
  {"pollingInterval":500}
/home/src/tslibs/TS/Lib/lib.decorators.legacy.d.ts:
  {"pollingInterval":500}
/home/src/tslibs/TS/Lib/lib.es5.d.ts:
  {"pollingInterval":500}
/home/src/workspaces/project/jsconfig.json: *new*
  {"pollingInterval":2000}
/home/src/workspaces/project/node_modules/@types/jsconfig.json:
  {"pollingInterval":2000}
/home/src/workspaces/project/node_modules/@types/tsconfig.json:
  {"pollingInterval":2000}
/home/src/workspaces/project/node_modules/@types/yargs/callback.d.ts: *new*
  {"pollingInterval":500}
/home/src/workspaces/project/node_modules/@types/yargs/index.d.ts: *new*
  {"pollingInterval":500}
/home/src/workspaces/project/node_modules/@types/yargs/jsconfig.json:
  {"pollingInterval":2000}
/home/src/workspaces/project/node_modules/@types/yargs/package.json: *new*
  {"pollingInterval":2000}
/home/src/workspaces/project/node_modules/@types/yargs/tsconfig.json:
  {"pollingInterval":2000}
/home/src/workspaces/project/node_modules/jsconfig.json:
  {"pollingInterval":2000}
/home/src/workspaces/project/node_modules/tsconfig.json:
  {"pollingInterval":2000}
/home/src/workspaces/project/node_modules/yargs/package.json: *new*
  {"pollingInterval":2000}
/home/src/workspaces/project/tsconfig.json: *new*
  {"pollingInterval":2000}

watchedDirectories::
/home/src/workspaces: *new*
  {}
/home/src/workspaces/project: *new*
  {}

watchedDirectoriesRecursive::
/home/src/workspaces/project/node_modules: *new*
  {}

Projects::
/dev/null/inferredProject1* (Inferred)
    projectStateVersion: 1
    projectProgramVersion: 1
/dev/null/inferredProject2* (Inferred) *new*
    projectStateVersion: 1
    projectProgramVersion: 1
    autoImportProviderHost: false

ScriptInfos::
/home/src/tslibs/TS/Lib/lib.decorators.d.ts *changed*
    version: Text-1
    containingProjects: 2 *changed*
        /dev/null/inferredProject1*
        /dev/null/inferredProject2* *new*
/home/src/tslibs/TS/Lib/lib.decorators.legacy.d.ts *changed*
    version: Text-1
    containingProjects: 2 *changed*
        /dev/null/inferredProject1*
        /dev/null/inferredProject2* *new*
/home/src/tslibs/TS/Lib/lib.es5.d.ts *changed*
    version: Text-1
    containingProjects: 2 *changed*
        /dev/null/inferredProject1*
        /dev/null/inferredProject2* *new*
/home/src/workspaces/project/index.ts (Open) *new*
    version: SVC-1-0
    containingProjects: 1
        /dev/null/inferredProject2* *default*
/home/src/workspaces/project/node_modules/@types/yargs/callback.d.ts *new*
    version: Text-1
    containingProjects: 1
        /dev/null/inferredProject2*
/home/src/workspaces/project/node_modules/@types/yargs/index.d.ts *new*
    version: Text-1
    containingProjects: 1
        /dev/null/inferredProject2*
/home/src/workspaces/project/node_modules/@types/yargs/package.json (Open)
    version: SVC-1-0
    containingProjects: 1
        /dev/null/inferredProject1* *default*

Info seq  [hh:mm:ss:mss] request:
    {
      "seq": 3,
      "type": "request",
      "arguments": {
        "file": "/home/src/workspaces/project/index.ts",
        "line": 3,
        "offset": 11
      },
      "command": "findSourceDefinition"
    }
Info seq  [hh:mm:ss:mss] Creating AuxiliaryProject: /dev/null/auxiliaryProject1*, currentDirectory: /home/src/workspaces/project
Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: /dev/null/auxiliaryProject1*
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/workspaces/project/node_modules/yargs/index.js 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /home/src/workspaces/project/node_modules 1 undefined Project: /dev/null/auxiliaryProject1* WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /home/src/workspaces/project/node_modules 1 undefined Project: /dev/null/auxiliaryProject1* WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/workspaces/project/node_modules/yargs/package.json 2000 undefined Project: /dev/null/auxiliaryProject1* WatchType: File location affecting resolution
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/workspaces/project/node_modules/yargs/callback.js 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /home/src/workspaces 0 undefined Project: /dev/null/auxiliaryProject1* WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /home/src/workspaces 0 undefined Project: /dev/null/auxiliaryProject1* WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /home/src/workspaces/node_modules 1 undefined Project: /dev/null/auxiliaryProject1* WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /home/src/workspaces/node_modules 1 undefined Project: /dev/null/auxiliaryProject1* WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /home/src/workspaces/project 0 undefined Project: /dev/null/auxiliaryProject1* WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /home/src/workspaces/project 0 undefined Project: /dev/null/auxiliaryProject1* WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: /dev/null/auxiliaryProject1* projectStateVersion: 1 projectProgramVersion: 0 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Project '/dev/null/auxiliaryProject1*' (Auxiliary)
Info seq  [hh:mm:ss:mss] 	Files (3)
	/home/src/workspaces/project/node_modules/yargs/callback.js Text-1 "export class Yargs { positional() { } }"
	/home/src/workspaces/project/node_modules/yargs/index.js Text-1 "import { Yargs } from \"./callback\";\nexport function command(cmd, cb) { cb(Yargs) }"
	/home/src/workspaces/project/index.ts SVC-1-0 "import { command } from \"yargs\";\ncommand(\"foo\", yargs => {\n    yargs.positional();\n});"


	node_modules/yargs/callback.js
	  Imported via "./callback" from file 'node_modules/yargs/index.js' with packageId 'yargs/callback.js@1.0.0'
	node_modules/yargs/index.js
	  Imported via "yargs" from file 'index.ts' with packageId 'yargs/index.js@1.0.0'
	index.ts
	  Root file specified for compilation

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] response:
    {
      "seq": 0,
      "type": "response",
      "command": "findSourceDefinition",
      "request_seq": 3,
      "success": true,
      "performanceData": {
        "updateGraphDurationMs": *
      },
      "body": [
        {
          "file": "/home/src/workspaces/project/node_modules/yargs/callback.js",
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
/home/src/tslibs/TS/Lib/lib.decorators.d.ts:
  {"pollingInterval":500}
/home/src/tslibs/TS/Lib/lib.decorators.legacy.d.ts:
  {"pollingInterval":500}
/home/src/tslibs/TS/Lib/lib.es5.d.ts:
  {"pollingInterval":500}
/home/src/workspaces/project/jsconfig.json:
  {"pollingInterval":2000}
/home/src/workspaces/project/node_modules/@types/jsconfig.json:
  {"pollingInterval":2000}
/home/src/workspaces/project/node_modules/@types/tsconfig.json:
  {"pollingInterval":2000}
/home/src/workspaces/project/node_modules/@types/yargs/callback.d.ts:
  {"pollingInterval":500}
/home/src/workspaces/project/node_modules/@types/yargs/index.d.ts:
  {"pollingInterval":500}
/home/src/workspaces/project/node_modules/@types/yargs/jsconfig.json:
  {"pollingInterval":2000}
/home/src/workspaces/project/node_modules/@types/yargs/package.json:
  {"pollingInterval":2000}
/home/src/workspaces/project/node_modules/@types/yargs/tsconfig.json:
  {"pollingInterval":2000}
/home/src/workspaces/project/node_modules/jsconfig.json:
  {"pollingInterval":2000}
/home/src/workspaces/project/node_modules/tsconfig.json:
  {"pollingInterval":2000}
/home/src/workspaces/project/node_modules/yargs/callback.js: *new*
  {"pollingInterval":500}
/home/src/workspaces/project/node_modules/yargs/index.js: *new*
  {"pollingInterval":500}
/home/src/workspaces/project/node_modules/yargs/package.json:
  {"pollingInterval":2000}
  {"pollingInterval":2000} *new*
/home/src/workspaces/project/tsconfig.json:
  {"pollingInterval":2000}

watchedDirectories::
/home/src/workspaces:
  {}
  {} *new*
/home/src/workspaces/project:
  {}
  {} *new*

watchedDirectoriesRecursive::
/home/src/workspaces/node_modules: *new*
  {}
/home/src/workspaces/project/node_modules:
  {}
  {} *new*

Projects::
/dev/null/auxiliaryProject1* (Auxiliary) *new*
    projectStateVersion: 1
    projectProgramVersion: 1
/dev/null/inferredProject1* (Inferred)
    projectStateVersion: 1
    projectProgramVersion: 1
/dev/null/inferredProject2* (Inferred) *changed*
    projectStateVersion: 1
    projectProgramVersion: 1
    documentPositionMappers: 1 *changed*
        /home/src/workspaces/project/node_modules/@types/yargs/callback.d.ts: identitySourceMapConsumer *new*
    autoImportProviderHost: false
    noDtsResolutionProject: /dev/null/auxiliaryProject1* *changed*

ScriptInfos::
/home/src/tslibs/TS/Lib/lib.decorators.d.ts
    version: Text-1
    containingProjects: 2
        /dev/null/inferredProject1*
        /dev/null/inferredProject2*
/home/src/tslibs/TS/Lib/lib.decorators.legacy.d.ts
    version: Text-1
    containingProjects: 2
        /dev/null/inferredProject1*
        /dev/null/inferredProject2*
/home/src/tslibs/TS/Lib/lib.es5.d.ts
    version: Text-1
    containingProjects: 2
        /dev/null/inferredProject1*
        /dev/null/inferredProject2*
/home/src/workspaces/project/index.ts (Open) *changed*
    version: SVC-1-0
    containingProjects: 2 *changed*
        /dev/null/inferredProject2* *default*
        /dev/null/auxiliaryProject1* *new*
/home/src/workspaces/project/node_modules/@types/yargs/callback.d.ts *changed*
    version: Text-1
    sourceMapFilePath: false *changed*
    containingProjects: 1
        /dev/null/inferredProject2*
/home/src/workspaces/project/node_modules/@types/yargs/index.d.ts
    version: Text-1
    containingProjects: 1
        /dev/null/inferredProject2*
/home/src/workspaces/project/node_modules/@types/yargs/package.json (Open)
    version: SVC-1-0
    containingProjects: 1
        /dev/null/inferredProject1* *default*
/home/src/workspaces/project/node_modules/yargs/callback.js *new*
    version: Text-1
    containingProjects: 1
        /dev/null/auxiliaryProject1*
/home/src/workspaces/project/node_modules/yargs/index.js *new*
    version: Text-1
    containingProjects: 1
        /dev/null/auxiliaryProject1*
