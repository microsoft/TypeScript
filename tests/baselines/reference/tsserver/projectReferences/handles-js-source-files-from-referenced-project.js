currentDirectory:: / useCaseSensitiveFileNames: false
Info seq  [hh:mm:ss:mss] Provided types map file "/a/lib/typesMap.json" doesn't exist
Before request
//// [/home/src/projects/myproject/packages/a/src/lib.js]
export const magicString = "12";

//// [/home/src/projects/myproject/packages/a/src/util.ts]
export const magicNumber = 12;

//// [/home/src/projects/myproject/packages/a/tsconfig.json]
{
  "compilerOptions": {
    "outDir": "./dist",
    "declarationDir": "./dist/types"
  },
  "extends": "../../tsconfig.base.json",
  "include": [
    "./src"
  ]
}

//// [/home/src/projects/myproject/packages/a/package.json]
{
  "name": "@my-package/a",
  "version": "1.0.0",
  "main": "index.js"
}

//// [/home/src/projects/myproject/packages/b/src/index.ts]
import { magicString } from "@my-package/a/src/lib";
import { magicNumber } from "@my-package/a/src/util";
const a: number = magicNumber;
const b: string = magicString;
console.log({ a });
console.log({ b });


//// [/home/src/projects/myproject/packages/b/tsconfig.json]
{
  "compilerOptions": {
    "outDir": "./dist",
    "declarationDir": "./dist/types"
  },
  "extends": "../../tsconfig.base.json",
  "include": [
    "./src"
  ],
  "references": [
    {
      "path": "../a/tsconfig.json"
    }
  ]
}

//// [/home/src/projects/myproject/tsconfig.base.json]
{
  "compilerOptions": {
    "composite": true,
    "allowJs": true,
    "emitDeclarationOnly": true,
    "traceResolution": true,
    "strict": true
  }
}

//// [/home/src/projects/myproject/node_modules/@my-package/a] symlink(/home/src/projects/myproject/packages/a)
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
interface ReadonlyArray<T> {}
declare const console: { log(msg: any): void; };


Info seq  [hh:mm:ss:mss] request:
    {
      "command": "open",
      "arguments": {
        "file": "/home/src/projects/myproject/packages/b/src/index.ts"
      },
      "seq": 1,
      "type": "request"
    }
Info seq  [hh:mm:ss:mss] Search path: /home/src/projects/myproject/packages/b/src
Info seq  [hh:mm:ss:mss] For info: /home/src/projects/myproject/packages/b/src/index.ts :: Config file name: /home/src/projects/myproject/packages/b/tsconfig.json
Info seq  [hh:mm:ss:mss] Creating configuration project /home/src/projects/myproject/packages/b/tsconfig.json
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/projects/myproject/packages/b/tsconfig.json 2000 undefined Project: /home/src/projects/myproject/packages/b/tsconfig.json WatchType: Config file
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "projectLoadingStart",
      "body": {
        "projectName": "/home/src/projects/myproject/packages/b/tsconfig.json",
        "reason": "Creating possible configured project for /home/src/projects/myproject/packages/b/src/index.ts to open"
      }
    }
Info seq  [hh:mm:ss:mss] Config: /home/src/projects/myproject/packages/b/tsconfig.json : {
 "rootNames": [
  "/home/src/projects/myproject/packages/b/src/index.ts"
 ],
 "options": {
  "composite": true,
  "allowJs": true,
  "emitDeclarationOnly": true,
  "traceResolution": true,
  "strict": true,
  "outDir": "/home/src/projects/myproject/packages/b/dist",
  "declarationDir": "/home/src/projects/myproject/packages/b/dist/types",
  "configFilePath": "/home/src/projects/myproject/packages/b/tsconfig.json"
 },
 "projectReferences": [
  {
   "path": "/home/src/projects/myproject/packages/a/tsconfig.json",
   "originalPath": "../a/tsconfig.json"
  }
 ]
}
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/projects/myproject/tsconfig.base.json 2000 undefined Config: /home/src/projects/myproject/packages/b/tsconfig.json WatchType: Extended config file
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /home/src/projects/myproject/packages/b/src 1 undefined Config: /home/src/projects/myproject/packages/b/tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /home/src/projects/myproject/packages/b/src 1 undefined Config: /home/src/projects/myproject/packages/b/tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: /home/src/projects/myproject/packages/b/tsconfig.json
Info seq  [hh:mm:ss:mss] Config: /home/src/projects/myproject/packages/a/tsconfig.json : {
 "rootNames": [
  "/home/src/projects/myproject/packages/a/src/lib.js",
  "/home/src/projects/myproject/packages/a/src/util.ts"
 ],
 "options": {
  "composite": true,
  "allowJs": true,
  "emitDeclarationOnly": true,
  "traceResolution": true,
  "strict": true,
  "outDir": "/home/src/projects/myproject/packages/a/dist",
  "declarationDir": "/home/src/projects/myproject/packages/a/dist/types",
  "configFilePath": "/home/src/projects/myproject/packages/a/tsconfig.json"
 }
}
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/projects/myproject/packages/a/tsconfig.json 2000 undefined Project: /home/src/projects/myproject/packages/b/tsconfig.json WatchType: Config file
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /home/src/projects/myproject/packages/a/src 1 undefined Config: /home/src/projects/myproject/packages/a/tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /home/src/projects/myproject/packages/a/src 1 undefined Config: /home/src/projects/myproject/packages/a/tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] ======== Resolving module '@my-package/a/src/lib' from '/home/src/projects/myproject/packages/b/src/index.ts'. ========
Info seq  [hh:mm:ss:mss] Module resolution kind is not specified, using 'Node10'.
Info seq  [hh:mm:ss:mss] Loading module '@my-package/a/src/lib' from 'node_modules' folder, target file types: TypeScript, Declaration.
Info seq  [hh:mm:ss:mss] Searching all ancestor node_modules directories for preferred extensions: TypeScript, Declaration.
Info seq  [hh:mm:ss:mss] Directory '/home/src/projects/myproject/packages/b/src/node_modules' does not exist, skipping all lookups in it.
Info seq  [hh:mm:ss:mss] Scoped package detected, looking in 'my-package__a/src/lib'
Info seq  [hh:mm:ss:mss] Directory '/home/src/projects/myproject/packages/b/node_modules' does not exist, skipping all lookups in it.
Info seq  [hh:mm:ss:mss] Scoped package detected, looking in 'my-package__a/src/lib'
Info seq  [hh:mm:ss:mss] Directory '/home/src/projects/myproject/packages/node_modules' does not exist, skipping all lookups in it.
Info seq  [hh:mm:ss:mss] Scoped package detected, looking in 'my-package__a/src/lib'
Info seq  [hh:mm:ss:mss] Found 'package.json' at '/home/src/projects/myproject/node_modules/@my-package/a/package.json'.
Info seq  [hh:mm:ss:mss] 'package.json' does not have a 'typesVersions' field.
Info seq  [hh:mm:ss:mss] File '/home/src/projects/myproject/node_modules/@my-package/a/src/lib.ts' does not exist.
Info seq  [hh:mm:ss:mss] File '/home/src/projects/myproject/node_modules/@my-package/a/src/lib.tsx' does not exist.
Info seq  [hh:mm:ss:mss] File '/home/src/projects/myproject/node_modules/@my-package/a/src/lib.d.ts' does not exist.
Info seq  [hh:mm:ss:mss] 'package.json' does not have a 'typings' field.
Info seq  [hh:mm:ss:mss] 'package.json' does not have a 'types' field.
Info seq  [hh:mm:ss:mss] 'package.json' has 'main' field 'index.js' that references '/home/src/projects/myproject/node_modules/@my-package/a/src/lib/index.js'.
Info seq  [hh:mm:ss:mss] Loading module as file / folder, candidate module location '/home/src/projects/myproject/node_modules/@my-package/a/src/lib/index.js', target file types: TypeScript, Declaration.
Info seq  [hh:mm:ss:mss] File name '/home/src/projects/myproject/node_modules/@my-package/a/src/lib/index.js' has a '.js' extension - stripping it.
Info seq  [hh:mm:ss:mss] Directory '/home/src/projects/myproject/node_modules/@types' does not exist, skipping all lookups in it.
Info seq  [hh:mm:ss:mss] Scoped package detected, looking in 'my-package__a/src/lib'
Info seq  [hh:mm:ss:mss] Directory '/home/src/projects/node_modules' does not exist, skipping all lookups in it.
Info seq  [hh:mm:ss:mss] Scoped package detected, looking in 'my-package__a/src/lib'
Info seq  [hh:mm:ss:mss] Directory '/home/src/node_modules' does not exist, skipping all lookups in it.
Info seq  [hh:mm:ss:mss] Scoped package detected, looking in 'my-package__a/src/lib'
Info seq  [hh:mm:ss:mss] Directory '/home/node_modules' does not exist, skipping all lookups in it.
Info seq  [hh:mm:ss:mss] Scoped package detected, looking in 'my-package__a/src/lib'
Info seq  [hh:mm:ss:mss] Directory '/node_modules' does not exist, skipping all lookups in it.
Info seq  [hh:mm:ss:mss] Scoped package detected, looking in 'my-package__a/src/lib'
Info seq  [hh:mm:ss:mss] Loading module '@my-package/a/src/lib' from 'node_modules' folder, target file types: JavaScript.
Info seq  [hh:mm:ss:mss] Searching all ancestor node_modules directories for fallback extensions: JavaScript.
Info seq  [hh:mm:ss:mss] Directory '/home/src/projects/myproject/packages/b/src/node_modules' does not exist, skipping all lookups in it.
Info seq  [hh:mm:ss:mss] Directory '/home/src/projects/myproject/packages/b/node_modules' does not exist, skipping all lookups in it.
Info seq  [hh:mm:ss:mss] Directory '/home/src/projects/myproject/packages/node_modules' does not exist, skipping all lookups in it.
Info seq  [hh:mm:ss:mss] File '/home/src/projects/myproject/node_modules/@my-package/a/package.json' exists according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/projects/myproject/node_modules/@my-package/a/src/lib.js' exists - use it as a name resolution result.
Info seq  [hh:mm:ss:mss] Resolving real path for '/home/src/projects/myproject/node_modules/@my-package/a/src/lib.js', result '/home/src/projects/myproject/packages/a/src/lib.js'.
Info seq  [hh:mm:ss:mss] ======== Module name '@my-package/a/src/lib' was successfully resolved to '/home/src/projects/myproject/packages/a/src/lib.js' with Package ID '@my-package/a/src/lib.js@1.0.0'. ========
Info seq  [hh:mm:ss:mss] ======== Resolving module '@my-package/a/src/util' from '/home/src/projects/myproject/packages/b/src/index.ts'. ========
Info seq  [hh:mm:ss:mss] Module resolution kind is not specified, using 'Node10'.
Info seq  [hh:mm:ss:mss] Loading module '@my-package/a/src/util' from 'node_modules' folder, target file types: TypeScript, Declaration.
Info seq  [hh:mm:ss:mss] Searching all ancestor node_modules directories for preferred extensions: TypeScript, Declaration.
Info seq  [hh:mm:ss:mss] Directory '/home/src/projects/myproject/packages/b/src/node_modules' does not exist, skipping all lookups in it.
Info seq  [hh:mm:ss:mss] Scoped package detected, looking in 'my-package__a/src/util'
Info seq  [hh:mm:ss:mss] Directory '/home/src/projects/myproject/packages/b/node_modules' does not exist, skipping all lookups in it.
Info seq  [hh:mm:ss:mss] Scoped package detected, looking in 'my-package__a/src/util'
Info seq  [hh:mm:ss:mss] Directory '/home/src/projects/myproject/packages/node_modules' does not exist, skipping all lookups in it.
Info seq  [hh:mm:ss:mss] Scoped package detected, looking in 'my-package__a/src/util'
Info seq  [hh:mm:ss:mss] File '/home/src/projects/myproject/node_modules/@my-package/a/package.json' exists according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/projects/myproject/node_modules/@my-package/a/src/util.ts' exists - use it as a name resolution result.
Info seq  [hh:mm:ss:mss] Resolving real path for '/home/src/projects/myproject/node_modules/@my-package/a/src/util.ts', result '/home/src/projects/myproject/packages/a/src/util.ts'.
Info seq  [hh:mm:ss:mss] ======== Module name '@my-package/a/src/util' was successfully resolved to '/home/src/projects/myproject/packages/a/src/util.ts' with Package ID '@my-package/a/src/util.ts@1.0.0'. ========
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/projects/myproject/packages/a/src/util.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /a/lib/lib.d.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /home/src/projects/myproject/packages/b/src 1 undefined Project: /home/src/projects/myproject/packages/b/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /home/src/projects/myproject/packages/b/src 1 undefined Project: /home/src/projects/myproject/packages/b/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /home/src/projects/myproject/packages/b/node_modules 1 undefined Project: /home/src/projects/myproject/packages/b/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /home/src/projects/myproject/packages/b/node_modules 1 undefined Project: /home/src/projects/myproject/packages/b/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /home/src/projects/myproject/packages/node_modules 1 undefined Project: /home/src/projects/myproject/packages/b/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /home/src/projects/myproject/packages/node_modules 1 undefined Project: /home/src/projects/myproject/packages/b/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /home/src/projects/myproject/node_modules 1 undefined Project: /home/src/projects/myproject/packages/b/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /home/src/projects/myproject/node_modules 1 undefined Project: /home/src/projects/myproject/packages/b/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /home/src/projects/node_modules 1 undefined Project: /home/src/projects/myproject/packages/b/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /home/src/projects/node_modules 1 undefined Project: /home/src/projects/myproject/packages/b/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/projects/myproject/packages/a/package.json 2000 undefined Project: /home/src/projects/myproject/packages/b/tsconfig.json WatchType: File location affecting resolution
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /home/src/projects/myproject/packages/b/node_modules/@types 1 undefined Project: /home/src/projects/myproject/packages/b/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /home/src/projects/myproject/packages/b/node_modules/@types 1 undefined Project: /home/src/projects/myproject/packages/b/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /home/src/projects/myproject/packages/node_modules/@types 1 undefined Project: /home/src/projects/myproject/packages/b/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /home/src/projects/myproject/packages/node_modules/@types 1 undefined Project: /home/src/projects/myproject/packages/b/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /home/src/projects/myproject/node_modules/@types 1 undefined Project: /home/src/projects/myproject/packages/b/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /home/src/projects/myproject/node_modules/@types 1 undefined Project: /home/src/projects/myproject/packages/b/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /home/src/projects/node_modules/@types 1 undefined Project: /home/src/projects/myproject/packages/b/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /home/src/projects/node_modules/@types 1 undefined Project: /home/src/projects/myproject/packages/b/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: /home/src/projects/myproject/packages/b/tsconfig.json Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Project '/home/src/projects/myproject/packages/b/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (3)
	/a/lib/lib.d.ts Text-1 "/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };"
	/home/src/projects/myproject/packages/a/src/util.ts Text-1 "export const magicNumber = 12;"
	/home/src/projects/myproject/packages/b/src/index.ts SVC-1-0 "import { magicString } from \"@my-package/a/src/lib\";\nimport { magicNumber } from \"@my-package/a/src/util\";\nconst a: number = magicNumber;\nconst b: string = magicString;\nconsole.log({ a });\nconsole.log({ b });\n"


	../../../../../../a/lib/lib.d.ts
	  Default library for target 'es5'
	../a/src/util.ts
	  Imported via "@my-package/a/src/util" from file 'src/index.ts' with packageId '@my-package/a/src/util.ts@1.0.0'
	src/index.ts
	  Matched by include pattern './src' in 'tsconfig.json'

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "projectLoadingFinish",
      "body": {
        "projectName": "/home/src/projects/myproject/packages/b/tsconfig.json"
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
          "projectId": "19de839b42336600c9ca4cf032699347534b5f43e7b3767eb2c8cf4e2a04e53f",
          "fileStats": {
            "js": 0,
            "jsSize": 0,
            "jsx": 0,
            "jsxSize": 0,
            "ts": 2,
            "tsSize": 239,
            "tsx": 0,
            "tsxSize": 0,
            "dts": 1,
            "dtsSize": 413,
            "deferred": 0,
            "deferredSize": 0
          },
          "compilerOptions": {
            "composite": true,
            "allowJs": true,
            "emitDeclarationOnly": true,
            "traceResolution": true,
            "strict": true,
            "outDir": "",
            "declarationDir": ""
          },
          "typeAcquisition": {
            "enable": false,
            "include": false,
            "exclude": false
          },
          "extends": true,
          "files": false,
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
        "triggerFile": "/home/src/projects/myproject/packages/b/src/index.ts",
        "configFile": "/home/src/projects/myproject/packages/b/tsconfig.json",
        "diagnostics": []
      }
    }
Info seq  [hh:mm:ss:mss] Search path: /home/src/projects/myproject/packages/b
Info seq  [hh:mm:ss:mss] For info: /home/src/projects/myproject/packages/b/tsconfig.json :: No config files found.
Info seq  [hh:mm:ss:mss] Project '/home/src/projects/myproject/packages/b/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (3)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: /home/src/projects/myproject/packages/b/src/index.ts ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /home/src/projects/myproject/packages/b/tsconfig.json
Info seq  [hh:mm:ss:mss] response:
    {
      "responseRequired": false
    }
After request

PolledWatches::
/home/src/projects/myproject/node_modules/@types: *new*
  {"pollingInterval":500}
/home/src/projects/myproject/packages/b/node_modules: *new*
  {"pollingInterval":500}
/home/src/projects/myproject/packages/b/node_modules/@types: *new*
  {"pollingInterval":500}
/home/src/projects/myproject/packages/node_modules: *new*
  {"pollingInterval":500}
/home/src/projects/myproject/packages/node_modules/@types: *new*
  {"pollingInterval":500}
/home/src/projects/node_modules: *new*
  {"pollingInterval":500}
/home/src/projects/node_modules/@types: *new*
  {"pollingInterval":500}

FsWatches::
/a/lib/lib.d.ts: *new*
  {}
/home/src/projects/myproject/packages/a/package.json: *new*
  {}
/home/src/projects/myproject/packages/a/src/util.ts: *new*
  {}
/home/src/projects/myproject/packages/a/tsconfig.json: *new*
  {}
/home/src/projects/myproject/packages/b/tsconfig.json: *new*
  {}
/home/src/projects/myproject/tsconfig.base.json: *new*
  {}

FsWatchesRecursive::
/home/src/projects/myproject/node_modules: *new*
  {}
/home/src/projects/myproject/packages/a/src: *new*
  {}
/home/src/projects/myproject/packages/b/src: *new*
  {}

Before request

Info seq  [hh:mm:ss:mss] request:
    {
      "command": "geterr",
      "arguments": {
        "delay": 0,
        "files": [
          "/home/src/projects/myproject/packages/b/src/index.ts"
        ]
      },
      "seq": 2,
      "type": "request"
    }
Info seq  [hh:mm:ss:mss] response:
    {
      "responseRequired": false
    }
After request

Before running Timeout callback:: count: 1
1: checkOne

Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "syntaxDiag",
      "body": {
        "file": "/home/src/projects/myproject/packages/b/src/index.ts",
        "diagnostics": []
      }
    }
After running Timeout callback:: count: 0

Before running Immedidate callback:: count: 1
1: semanticCheck

Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "semanticDiag",
      "body": {
        "file": "/home/src/projects/myproject/packages/b/src/index.ts",
        "diagnostics": [
          {
            "start": {
              "line": 1,
              "offset": 29
            },
            "end": {
              "line": 1,
              "offset": 52
            },
            "text": "Could not find a declaration file for module '@my-package/a/src/lib'. '/home/src/projects/myproject/packages/a/src/lib.js' implicitly has an 'any' type.\n  Try `npm i --save-dev @types/my-package__a` if it exists or add a new declaration (.d.ts) file containing `declare module '@my-package/a/src/lib';`",
            "code": 7016,
            "category": "error"
          }
        ]
      }
    }
After running Immedidate callback:: count: 1
2: suggestionCheck

Before running Immedidate callback:: count: 1
2: suggestionCheck

Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "suggestionDiag",
      "body": {
        "file": "/home/src/projects/myproject/packages/b/src/index.ts",
        "diagnostics": [
          {
            "start": {
              "line": 1,
              "offset": 29
            },
            "end": {
              "line": 1,
              "offset": 52
            },
            "text": "Could not find a declaration file for module '@my-package/a/src/lib'. '/home/src/projects/myproject/packages/a/src/lib.js' implicitly has an 'any' type.\n  Try `npm i --save-dev @types/my-package__a` if it exists or add a new declaration (.d.ts) file containing `declare module '@my-package/a/src/lib';`",
            "code": 7016,
            "category": "suggestion"
          }
        ]
      }
    }
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "requestCompleted",
      "body": {
        "request_seq": 2
      }
    }
After running Immedidate callback:: count: 0
