Info seq  [hh:mm:ss:mss] currentDirectory:: /home/src/Vscode/Projects/bin useCaseSensitiveFileNames:: false
Info seq  [hh:mm:ss:mss] libs Location:: /home/src/tslibs/TS/Lib
Info seq  [hh:mm:ss:mss] globalTypingsCacheLocation:: /home/src/Library/Caches/typescript
Info seq  [hh:mm:ss:mss] Provided types map file "/home/src/tslibs/TS/Lib/typesMap.json" doesn't exist
Before request
//// [/home/src/projects/configs/first/tsconfig.json]
{
  "extends": "../second/tsconfig.json",
  "include": [
    "${configDir}/src"
  ],
  "compilerOptions": {
    "typeRoots": [
      "root1",
      "${configDir}/root2",
      "root3"
    ],
    "types": []
  }
}

//// [/home/src/projects/configs/second/tsconfig.json]
{
  "files": [
    "${configDir}/main.ts"
  ],
  "compilerOptions": {
    "declarationDir": "${configDir}/decls",
    "paths": {
      "@myscope/*": [
        "${configDir}/types/*"
      ],
      "other/*": [
        "other/*"
      ]
    },
    "baseUrl": "${configDir}"
  },
  "watchOptions": {
    "excludeFiles": [
      "${configDir}/main.ts"
    ]
  }
}

//// [/home/src/projects/myproject/tsconfig.json]
{
  "extends": "../configs/first/tsconfig.json",
  "compilerOptions": {
    "declaration": true,
    "outDir": "outDir",
    "traceResolution": true
  }
}

//// [/home/src/projects/myproject/main.ts]
// some comment
export const y = 10;
import { x } from "@myscope/sometype";


//// [/home/src/projects/myproject/src/secondary.ts]
// some comment
export const z = 10;
import { k } from "other/sometype2";


//// [/home/src/projects/myproject/types/sometype.ts]
export const x = 10;


//// [/home/src/projects/myproject/root2/other/sometype2/index.d.ts]
export const k = 10;


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
      "command": "configure",
      "arguments": {
        "watchOptions": {
          "excludeDirectories": [
            "${configDir}/node_modules"
          ]
        }
      },
      "seq": 1,
      "type": "request"
    }
Info seq  [hh:mm:ss:mss] Host watch options changed to {"excludeDirectories":["/home/src/Vscode/Projects/bin/node_modules"]}, it will be take effect for next watches.
Info seq  [hh:mm:ss:mss] response:
    {
      "seq": 0,
      "type": "response",
      "command": "configure",
      "request_seq": 1,
      "success": true
    }
After request

Before request

Info seq  [hh:mm:ss:mss] request:
    {
      "command": "open",
      "arguments": {
        "file": "/home/src/projects/myproject/src/secondary.ts"
      },
      "seq": 2,
      "type": "request"
    }
Info seq  [hh:mm:ss:mss] getConfigFileNameForFile:: File: /home/src/projects/myproject/src/secondary.ts ProjectRootPath: undefined:: Result: /home/src/projects/myproject/tsconfig.json
Info seq  [hh:mm:ss:mss] Creating ConfiguredProject: /home/src/projects/myproject/tsconfig.json, currentDirectory: /home/src/projects/myproject
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/projects/myproject/tsconfig.json 2000 {"excludeDirectories":["/home/src/projects/myproject/node_modules"]} Project: /home/src/projects/myproject/tsconfig.json WatchType: Config file
Info seq  [hh:mm:ss:mss] Config: /home/src/projects/myproject/tsconfig.json : {
 "rootNames": [
  "/home/src/projects/myproject/main.ts",
  "/home/src/projects/myproject/src/secondary.ts"
 ],
 "options": {
  "declarationDir": "/home/src/projects/myproject/decls",
  "paths": {
   "@myscope/*": [
    "/home/src/projects/myproject/types/*"
   ],
   "other/*": [
    "other/*"
   ]
  },
  "baseUrl": "/home/src/projects/myproject",
  "pathsBasePath": "/home/src/projects/configs/second",
  "typeRoots": [
   "/home/src/projects/configs/first/root1",
   "/home/src/projects/myproject/root2",
   "/home/src/projects/configs/first/root3"
  ],
  "types": [],
  "declaration": true,
  "outDir": "/home/src/projects/myproject/outDir",
  "traceResolution": true,
  "configFilePath": "/home/src/projects/myproject/tsconfig.json"
 },
 "watchOptions": {
  "excludeFiles": [
   "/home/src/projects/myproject/main.ts"
  ]
 }
}
Info seq  [hh:mm:ss:mss] FileWatcher:: Close:: WatchInfo: /home/src/projects/myproject/tsconfig.json 2000 {"excludeDirectories":["/home/src/projects/myproject/node_modules"]} Project: /home/src/projects/myproject/tsconfig.json WatchType: Config file
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/projects/myproject/tsconfig.json 2000 {"excludeDirectories":["/home/src/projects/myproject/node_modules"],"excludeFiles":["/home/src/projects/myproject/main.ts"]} Project: /home/src/projects/myproject/tsconfig.json WatchType: Config file
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/projects/configs/first/tsconfig.json 2000 {"excludeDirectories":["/home/src/Vscode/Projects/bin/node_modules"]} Config: /home/src/projects/myproject/tsconfig.json WatchType: Extended config file
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/projects/configs/second/tsconfig.json 2000 {"excludeDirectories":["/home/src/Vscode/Projects/bin/node_modules"]} Config: /home/src/projects/myproject/tsconfig.json WatchType: Extended config file
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "projectLoadingStart",
      "body": {
        "projectName": "/home/src/projects/myproject/tsconfig.json",
        "reason": "Creating possible configured project for /home/src/projects/myproject/src/secondary.ts to open"
      }
    }
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /home/src/projects/myproject/src 1 {"excludeDirectories":["/home/src/projects/myproject/node_modules"],"excludeFiles":["/home/src/projects/myproject/main.ts"]} Config: /home/src/projects/myproject/tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /home/src/projects/myproject/src 1 {"excludeDirectories":["/home/src/projects/myproject/node_modules"],"excludeFiles":["/home/src/projects/myproject/main.ts"]} Config: /home/src/projects/myproject/tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/projects/myproject/main.ts 500 {"excludeDirectories":["/home/src/Vscode/Projects/bin/node_modules"]} WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: /home/src/projects/myproject/tsconfig.json
Info seq  [hh:mm:ss:mss] ======== Resolving module '@myscope/sometype' from '/home/src/projects/myproject/main.ts'. ========
Info seq  [hh:mm:ss:mss] Module resolution kind is not specified, using 'Node10'.
Info seq  [hh:mm:ss:mss] 'baseUrl' option is set to '/home/src/projects/myproject', using this value to resolve non-relative module name '@myscope/sometype'.
Info seq  [hh:mm:ss:mss] 'paths' option is specified, looking for a pattern to match module name '@myscope/sometype'.
Info seq  [hh:mm:ss:mss] Module name '@myscope/sometype', matched pattern '@myscope/*'.
Info seq  [hh:mm:ss:mss] Trying substitution '/home/src/projects/myproject/types/*', candidate module location: '/home/src/projects/myproject/types/sometype'.
Info seq  [hh:mm:ss:mss] Loading module as file / folder, candidate module location '/home/src/projects/myproject/types/sometype', target file types: TypeScript, Declaration.
Info seq  [hh:mm:ss:mss] File '/home/src/projects/myproject/types/sometype.ts' exists - use it as a name resolution result.
Info seq  [hh:mm:ss:mss] ======== Module name '@myscope/sometype' was successfully resolved to '/home/src/projects/myproject/types/sometype.ts'. ========
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/projects/myproject/types/sometype.ts 500 {"excludeDirectories":["/home/src/Vscode/Projects/bin/node_modules"]} WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] ======== Resolving module 'other/sometype2' from '/home/src/projects/myproject/src/secondary.ts'. ========
Info seq  [hh:mm:ss:mss] Module resolution kind is not specified, using 'Node10'.
Info seq  [hh:mm:ss:mss] 'baseUrl' option is set to '/home/src/projects/myproject', using this value to resolve non-relative module name 'other/sometype2'.
Info seq  [hh:mm:ss:mss] 'paths' option is specified, looking for a pattern to match module name 'other/sometype2'.
Info seq  [hh:mm:ss:mss] Module name 'other/sometype2', matched pattern 'other/*'.
Info seq  [hh:mm:ss:mss] Trying substitution 'other/*', candidate module location: 'other/sometype2'.
Info seq  [hh:mm:ss:mss] Loading module as file / folder, candidate module location '/home/src/projects/myproject/other/sometype2', target file types: TypeScript, Declaration.
Info seq  [hh:mm:ss:mss] Loading module 'other/sometype2' from 'node_modules' folder, target file types: TypeScript, Declaration.
Info seq  [hh:mm:ss:mss] Searching all ancestor node_modules directories for preferred extensions: TypeScript, Declaration.
Info seq  [hh:mm:ss:mss] Directory '/home/src/projects/myproject/src/node_modules' does not exist, skipping all lookups in it.
Info seq  [hh:mm:ss:mss] Directory '/home/src/projects/myproject/node_modules' does not exist, skipping all lookups in it.
Info seq  [hh:mm:ss:mss] Directory '/home/src/projects/node_modules' does not exist, skipping all lookups in it.
Info seq  [hh:mm:ss:mss] Directory '/home/src/node_modules' does not exist, skipping all lookups in it.
Info seq  [hh:mm:ss:mss] Directory '/home/node_modules' does not exist, skipping all lookups in it.
Info seq  [hh:mm:ss:mss] Directory '/node_modules' does not exist, skipping all lookups in it.
Info seq  [hh:mm:ss:mss] Directory '/home/src/projects/configs/first/root1' does not exist, skipping all lookups in it.
Info seq  [hh:mm:ss:mss] File '/home/src/projects/myproject/root2/other/sometype2.d.ts' does not exist.
Info seq  [hh:mm:ss:mss] File '/home/src/projects/myproject/root2/other/sometype2/package.json' does not exist.
Info seq  [hh:mm:ss:mss] File '/home/src/projects/myproject/root2/other/sometype2/index.d.ts' exists - use it as a name resolution result.
Info seq  [hh:mm:ss:mss] Resolving real path for '/home/src/projects/myproject/root2/other/sometype2/index.d.ts', result '/home/src/projects/myproject/root2/other/sometype2/index.d.ts'.
Info seq  [hh:mm:ss:mss] ======== Module name 'other/sometype2' was successfully resolved to '/home/src/projects/myproject/root2/other/sometype2/index.d.ts'. ========
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/projects/myproject/root2/other/sometype2/index.d.ts 500 {"excludeDirectories":["/home/src/Vscode/Projects/bin/node_modules"]} WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/tslibs/TS/Lib/lib.d.ts 500 {"excludeDirectories":["/home/src/Vscode/Projects/bin/node_modules"]} WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /home/src/projects/myproject/other 1 {"excludeDirectories":["/home/src/projects/myproject/node_modules"],"excludeFiles":["/home/src/projects/myproject/main.ts"]} Project: /home/src/projects/myproject/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /home/src/projects/myproject/other 1 {"excludeDirectories":["/home/src/projects/myproject/node_modules"],"excludeFiles":["/home/src/projects/myproject/main.ts"]} Project: /home/src/projects/myproject/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /home/src/projects/myproject/src 1 {"excludeDirectories":["/home/src/projects/myproject/node_modules"],"excludeFiles":["/home/src/projects/myproject/main.ts"]} Project: /home/src/projects/myproject/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /home/src/projects/myproject/src 1 {"excludeDirectories":["/home/src/projects/myproject/node_modules"],"excludeFiles":["/home/src/projects/myproject/main.ts"]} Project: /home/src/projects/myproject/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] ExcludeWatcher:: Added:: WatchInfo: /home/src/projects/myproject/node_modules 1 {"excludeDirectories":["/home/src/projects/myproject/node_modules"],"excludeFiles":["/home/src/projects/myproject/main.ts"]} Project: /home/src/projects/myproject/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /home/src/projects/node_modules 1 {"excludeDirectories":["/home/src/projects/myproject/node_modules"],"excludeFiles":["/home/src/projects/myproject/main.ts"]} Project: /home/src/projects/myproject/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /home/src/projects/node_modules 1 {"excludeDirectories":["/home/src/projects/myproject/node_modules"],"excludeFiles":["/home/src/projects/myproject/main.ts"]} Project: /home/src/projects/myproject/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /home/src/projects/configs 1 {"excludeDirectories":["/home/src/projects/myproject/node_modules"],"excludeFiles":["/home/src/projects/myproject/main.ts"]} Project: /home/src/projects/myproject/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /home/src/projects/configs 1 {"excludeDirectories":["/home/src/projects/myproject/node_modules"],"excludeFiles":["/home/src/projects/myproject/main.ts"]} Project: /home/src/projects/myproject/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /home/src/projects/myproject/root2 1 {"excludeDirectories":["/home/src/projects/myproject/node_modules"],"excludeFiles":["/home/src/projects/myproject/main.ts"]} Project: /home/src/projects/myproject/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /home/src/projects/myproject/root2 1 {"excludeDirectories":["/home/src/projects/myproject/node_modules"],"excludeFiles":["/home/src/projects/myproject/main.ts"]} Project: /home/src/projects/myproject/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: /home/src/projects/myproject/tsconfig.json projectStateVersion: 1 projectProgramVersion: 0 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Project '/home/src/projects/myproject/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (5)
	/home/src/tslibs/TS/Lib/lib.d.ts Text-1 "/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };"
	/home/src/projects/myproject/types/sometype.ts Text-1 "export const x = 10;\n"
	/home/src/projects/myproject/main.ts Text-1 "// some comment\nexport const y = 10;\nimport { x } from \"@myscope/sometype\";\n"
	/home/src/projects/myproject/root2/other/sometype2/index.d.ts Text-1 "export const k = 10;\n"
	/home/src/projects/myproject/src/secondary.ts SVC-1-0 "// some comment\nexport const z = 10;\nimport { k } from \"other/sometype2\";\n"


	../../tslibs/TS/Lib/lib.d.ts
	  Default library for target 'es5'
	types/sometype.ts
	  Imported via "@myscope/sometype" from file 'main.ts'
	main.ts
	  Part of 'files' list in tsconfig.json
	root2/other/sometype2/index.d.ts
	  Imported via "other/sometype2" from file 'src/secondary.ts'
	src/secondary.ts
	  Matched by include pattern '${configDir}/src' in 'tsconfig.json'

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "projectLoadingFinish",
      "body": {
        "projectName": "/home/src/projects/myproject/tsconfig.json"
      }
    }
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "telemetry",
      "body": {
        "telemetryEventName": "projectInfo",
        "payload": {
          "projectId": "c082244e14d80420126a10c084f20f9b41809e79e7f5a330fc4d923f1197daa1",
          "fileStats": {
            "js": 0,
            "jsSize": 0,
            "jsx": 0,
            "jsxSize": 0,
            "ts": 3,
            "tsSize": 171,
            "tsx": 0,
            "tsxSize": 0,
            "dts": 2,
            "dtsSize": 434,
            "deferred": 0,
            "deferredSize": 0
          },
          "compilerOptions": {
            "declarationDir": "",
            "paths": "",
            "baseUrl": "",
            "typeRoots": [
              "",
              "",
              ""
            ],
            "types": [],
            "declaration": true,
            "outDir": "",
            "traceResolution": true
          },
          "typeAcquisition": {
            "enable": false,
            "include": false,
            "exclude": false
          },
          "extends": true,
          "files": true,
          "include": true,
          "exclude": false,
          "compileOnSave": false,
          "configFileName": "tsconfig.json",
          "projectType": "configured",
          "languageServiceEnabled": true,
          "version": "FakeVersion"
        }
      }
    }
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "configFileDiag",
      "body": {
        "triggerFile": "/home/src/projects/myproject/src/secondary.ts",
        "configFile": "/home/src/projects/myproject/tsconfig.json",
        "diagnostics": []
      }
    }
Info seq  [hh:mm:ss:mss] Project '/home/src/projects/myproject/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (5)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: /home/src/projects/myproject/src/secondary.ts ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /home/src/projects/myproject/tsconfig.json
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
After request

PolledWatches::
/home/src/projects/myproject/other: *new*
  {"pollingInterval":500}
/home/src/projects/node_modules: *new*
  {"pollingInterval":500}

FsWatches::
/home/src/projects/configs/first/tsconfig.json: *new*
  {}
/home/src/projects/configs/second/tsconfig.json: *new*
  {}
/home/src/projects/myproject/main.ts: *new*
  {}
/home/src/projects/myproject/root2/other/sometype2/index.d.ts: *new*
  {}
/home/src/projects/myproject/tsconfig.json: *new*
  {}
/home/src/projects/myproject/types/sometype.ts: *new*
  {}
/home/src/tslibs/TS/Lib/lib.d.ts: *new*
  {}

FsWatchesRecursive::
/home/src/projects/configs: *new*
  {}
/home/src/projects/myproject/root2: *new*
  {}
/home/src/projects/myproject/src: *new*
  {}

Projects::
/home/src/projects/myproject/tsconfig.json (Configured) *new*
    projectStateVersion: 1
    projectProgramVersion: 1
    autoImportProviderHost: false

ScriptInfos::
/home/src/projects/myproject/main.ts *new*
    version: Text-1
    containingProjects: 1
        /home/src/projects/myproject/tsconfig.json
/home/src/projects/myproject/root2/other/sometype2/index.d.ts *new*
    version: Text-1
    containingProjects: 1
        /home/src/projects/myproject/tsconfig.json
/home/src/projects/myproject/src/secondary.ts (Open) *new*
    version: SVC-1-0
    containingProjects: 1
        /home/src/projects/myproject/tsconfig.json *default*
/home/src/projects/myproject/types/sometype.ts *new*
    version: Text-1
    containingProjects: 1
        /home/src/projects/myproject/tsconfig.json
/home/src/tslibs/TS/Lib/lib.d.ts *new*
    version: Text-1
    containingProjects: 1
        /home/src/projects/myproject/tsconfig.json

edit extended config file
Info seq  [hh:mm:ss:mss] FileWatcher:: Triggered with /home/src/projects/configs/first/tsconfig.json 1:: WatchInfo: /home/src/projects/configs/first/tsconfig.json 2000 {"excludeDirectories":["/home/src/Vscode/Projects/bin/node_modules"]} Config: /home/src/projects/myproject/tsconfig.json WatchType: Extended config file
Info seq  [hh:mm:ss:mss] Scheduled: /home/src/projects/myproject/tsconfig.json
Info seq  [hh:mm:ss:mss] Scheduled: *ensureProjectForOpenFiles*
Info seq  [hh:mm:ss:mss] Elapsed:: *ms FileWatcher:: Triggered with /home/src/projects/configs/first/tsconfig.json 1:: WatchInfo: /home/src/projects/configs/first/tsconfig.json 2000 {"excludeDirectories":["/home/src/Vscode/Projects/bin/node_modules"]} Config: /home/src/projects/myproject/tsconfig.json WatchType: Extended config file
Before running Timeout callback:: count: 2
1: /home/src/projects/myproject/tsconfig.json
2: *ensureProjectForOpenFiles*
//// [/home/src/projects/configs/first/tsconfig.json]
{
  "extends": "../second/tsconfig.json",
  "include": [
    "${configDir}/src"
  ],
  "compilerOptions": {
    "typeRoots": [
      "${configDir}/root2"
    ],
    "types": []
  }
}


Timeout callback:: count: 2
1: /home/src/projects/myproject/tsconfig.json *new*
2: *ensureProjectForOpenFiles* *new*

Projects::
/home/src/projects/myproject/tsconfig.json (Configured) *changed*
    projectStateVersion: 2 *changed*
    projectProgramVersion: 1
    dirty: true *changed*
    autoImportProviderHost: undefined *changed*

Info seq  [hh:mm:ss:mss] Running: /home/src/projects/myproject/tsconfig.json
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "projectLoadingStart",
      "body": {
        "projectName": "/home/src/projects/myproject/tsconfig.json",
        "reason": "Change in extended config file /home/src/projects/configs/first/tsconfig.json detected"
      }
    }
Info seq  [hh:mm:ss:mss] Config: /home/src/projects/myproject/tsconfig.json : {
 "rootNames": [
  "/home/src/projects/myproject/main.ts",
  "/home/src/projects/myproject/src/secondary.ts"
 ],
 "options": {
  "declarationDir": "/home/src/projects/myproject/decls",
  "paths": {
   "@myscope/*": [
    "/home/src/projects/myproject/types/*"
   ],
   "other/*": [
    "other/*"
   ]
  },
  "baseUrl": "/home/src/projects/myproject",
  "pathsBasePath": "/home/src/projects/configs/second",
  "typeRoots": [
   "/home/src/projects/myproject/root2"
  ],
  "types": [],
  "declaration": true,
  "outDir": "/home/src/projects/myproject/outDir",
  "traceResolution": true,
  "configFilePath": "/home/src/projects/myproject/tsconfig.json"
 },
 "watchOptions": {
  "excludeFiles": [
   "/home/src/projects/myproject/main.ts"
  ]
 }
}
Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: /home/src/projects/myproject/tsconfig.json
Info seq  [hh:mm:ss:mss] ======== Resolving module '@myscope/sometype' from '/home/src/projects/myproject/main.ts'. ========
Info seq  [hh:mm:ss:mss] Module resolution kind is not specified, using 'Node10'.
Info seq  [hh:mm:ss:mss] 'baseUrl' option is set to '/home/src/projects/myproject', using this value to resolve non-relative module name '@myscope/sometype'.
Info seq  [hh:mm:ss:mss] 'paths' option is specified, looking for a pattern to match module name '@myscope/sometype'.
Info seq  [hh:mm:ss:mss] Module name '@myscope/sometype', matched pattern '@myscope/*'.
Info seq  [hh:mm:ss:mss] Trying substitution '/home/src/projects/myproject/types/*', candidate module location: '/home/src/projects/myproject/types/sometype'.
Info seq  [hh:mm:ss:mss] Loading module as file / folder, candidate module location '/home/src/projects/myproject/types/sometype', target file types: TypeScript, Declaration.
Info seq  [hh:mm:ss:mss] File '/home/src/projects/myproject/types/sometype.ts' exists - use it as a name resolution result.
Info seq  [hh:mm:ss:mss] ======== Module name '@myscope/sometype' was successfully resolved to '/home/src/projects/myproject/types/sometype.ts'. ========
Info seq  [hh:mm:ss:mss] ======== Resolving module 'other/sometype2' from '/home/src/projects/myproject/src/secondary.ts'. ========
Info seq  [hh:mm:ss:mss] Module resolution kind is not specified, using 'Node10'.
Info seq  [hh:mm:ss:mss] 'baseUrl' option is set to '/home/src/projects/myproject', using this value to resolve non-relative module name 'other/sometype2'.
Info seq  [hh:mm:ss:mss] 'paths' option is specified, looking for a pattern to match module name 'other/sometype2'.
Info seq  [hh:mm:ss:mss] Module name 'other/sometype2', matched pattern 'other/*'.
Info seq  [hh:mm:ss:mss] Trying substitution 'other/*', candidate module location: 'other/sometype2'.
Info seq  [hh:mm:ss:mss] Loading module as file / folder, candidate module location '/home/src/projects/myproject/other/sometype2', target file types: TypeScript, Declaration.
Info seq  [hh:mm:ss:mss] Loading module 'other/sometype2' from 'node_modules' folder, target file types: TypeScript, Declaration.
Info seq  [hh:mm:ss:mss] Searching all ancestor node_modules directories for preferred extensions: TypeScript, Declaration.
Info seq  [hh:mm:ss:mss] Directory '/home/src/projects/myproject/src/node_modules' does not exist, skipping all lookups in it.
Info seq  [hh:mm:ss:mss] Directory '/home/src/projects/myproject/node_modules' does not exist, skipping all lookups in it.
Info seq  [hh:mm:ss:mss] Directory '/home/src/projects/node_modules' does not exist, skipping all lookups in it.
Info seq  [hh:mm:ss:mss] Directory '/home/src/node_modules' does not exist, skipping all lookups in it.
Info seq  [hh:mm:ss:mss] Directory '/home/node_modules' does not exist, skipping all lookups in it.
Info seq  [hh:mm:ss:mss] Directory '/node_modules' does not exist, skipping all lookups in it.
Info seq  [hh:mm:ss:mss] File '/home/src/projects/myproject/root2/other/sometype2.d.ts' does not exist.
Info seq  [hh:mm:ss:mss] File '/home/src/projects/myproject/root2/other/sometype2/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/projects/myproject/root2/other/sometype2/index.d.ts' exists - use it as a name resolution result.
Info seq  [hh:mm:ss:mss] Resolving real path for '/home/src/projects/myproject/root2/other/sometype2/index.d.ts', result '/home/src/projects/myproject/root2/other/sometype2/index.d.ts'.
Info seq  [hh:mm:ss:mss] ======== Module name 'other/sometype2' was successfully resolved to '/home/src/projects/myproject/root2/other/sometype2/index.d.ts'. ========
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Close:: WatchInfo: /home/src/projects/configs 1 {"excludeDirectories":["/home/src/projects/myproject/node_modules"],"excludeFiles":["/home/src/projects/myproject/main.ts"]} Project: /home/src/projects/myproject/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Close:: WatchInfo: /home/src/projects/configs 1 {"excludeDirectories":["/home/src/projects/myproject/node_modules"],"excludeFiles":["/home/src/projects/myproject/main.ts"]} Project: /home/src/projects/myproject/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: /home/src/projects/myproject/tsconfig.json projectStateVersion: 2 projectProgramVersion: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Project '/home/src/projects/myproject/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (5)
	/home/src/tslibs/TS/Lib/lib.d.ts Text-1 "/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };"
	/home/src/projects/myproject/types/sometype.ts Text-1 "export const x = 10;\n"
	/home/src/projects/myproject/main.ts Text-1 "// some comment\nexport const y = 10;\nimport { x } from \"@myscope/sometype\";\n"
	/home/src/projects/myproject/root2/other/sometype2/index.d.ts Text-1 "export const k = 10;\n"
	/home/src/projects/myproject/src/secondary.ts SVC-1-0 "// some comment\nexport const z = 10;\nimport { k } from \"other/sometype2\";\n"

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "projectLoadingFinish",
      "body": {
        "projectName": "/home/src/projects/myproject/tsconfig.json"
      }
    }
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "configFileDiag",
      "body": {
        "triggerFile": "/home/src/projects/myproject/tsconfig.json",
        "configFile": "/home/src/projects/myproject/tsconfig.json",
        "diagnostics": []
      }
    }
Info seq  [hh:mm:ss:mss] Running: *ensureProjectForOpenFiles*
Info seq  [hh:mm:ss:mss] Before ensureProjectForOpenFiles:
Info seq  [hh:mm:ss:mss] Project '/home/src/projects/myproject/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (5)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: /home/src/projects/myproject/src/secondary.ts ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /home/src/projects/myproject/tsconfig.json
Info seq  [hh:mm:ss:mss] After ensureProjectForOpenFiles:
Info seq  [hh:mm:ss:mss] Project '/home/src/projects/myproject/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (5)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: /home/src/projects/myproject/src/secondary.ts ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /home/src/projects/myproject/tsconfig.json
Info seq  [hh:mm:ss:mss] got projects updated in background /home/src/projects/myproject/src/secondary.ts
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "projectsUpdatedInBackground",
      "body": {
        "openFiles": [
          "/home/src/projects/myproject/src/secondary.ts"
        ]
      }
    }
After running Timeout callback:: count: 0

PolledWatches::
/home/src/projects/myproject/other:
  {"pollingInterval":500}
/home/src/projects/node_modules:
  {"pollingInterval":500}

FsWatches::
/home/src/projects/configs/first/tsconfig.json:
  {}
/home/src/projects/configs/second/tsconfig.json:
  {}
/home/src/projects/myproject/main.ts:
  {}
/home/src/projects/myproject/root2/other/sometype2/index.d.ts:
  {}
/home/src/projects/myproject/tsconfig.json:
  {}
/home/src/projects/myproject/types/sometype.ts:
  {}
/home/src/tslibs/TS/Lib/lib.d.ts:
  {}

FsWatchesRecursive::
/home/src/projects/myproject/root2:
  {}
/home/src/projects/myproject/src:
  {}

FsWatchesRecursive *deleted*::
/home/src/projects/configs:
  {}

Projects::
/home/src/projects/myproject/tsconfig.json (Configured) *changed*
    projectStateVersion: 2
    projectProgramVersion: 2 *changed*
    dirty: false *changed*
