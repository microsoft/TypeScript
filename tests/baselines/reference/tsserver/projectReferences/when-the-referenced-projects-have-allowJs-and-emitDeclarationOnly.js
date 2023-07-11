currentDirectory:: / useCaseSensitiveFileNames: true
Info seq  [hh:mm:ss:mss] Provided types map file "/a/lib/typesMap.json" doesn't exist
Before request
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

//// [/user/username/projects/myproject/packages/emit-composite/tsconfig.json]
{"compilerOptions":{"composite":true,"allowJs":true,"emitDeclarationOnly":true,"outDir":"lib","rootDir":"src"},"include":["src"]}

//// [/user/username/projects/myproject/packages/emit-composite/package.json]
{"name":"emit-composite","version":"1.0.0","main":"src/index.js","typings":"lib/index.d.ts"}

//// [/user/username/projects/myproject/packages/emit-composite/src/index.js]
const testModule = require('./testModule');
module.exports = {
    ...testModule
}

//// [/user/username/projects/myproject/packages/emit-composite/src/testModule.js]
/**
 * @param {string} arg
 */
 const testCompositeFunction = (arg) => {
}
module.exports = {
    testCompositeFunction
}

//// [/user/username/projects/myproject/packages/consumer/tsconfig.json]
{"include":["src"],"references":[{"path":"../emit-composite"}]}

//// [/user/username/projects/myproject/packages/consumer/src/index.ts]
import { testCompositeFunction } from 'emit-composite';
testCompositeFunction('why hello there');
testCompositeFunction('why hello there', 42);

//// [/user/username/projects/myproject/node_modules/emit-composite] symlink(/user/username/projects/myproject/packages/emit-composite)

Info seq  [hh:mm:ss:mss] request:
    {
      "command": "open",
      "arguments": {
        "file": "/user/username/projects/myproject/packages/consumer/src/index.ts"
      },
      "seq": 1,
      "type": "request"
    }
Info seq  [hh:mm:ss:mss] Search path: /user/username/projects/myproject/packages/consumer/src
Info seq  [hh:mm:ss:mss] For info: /user/username/projects/myproject/packages/consumer/src/index.ts :: Config file name: /user/username/projects/myproject/packages/consumer/tsconfig.json
Info seq  [hh:mm:ss:mss] Creating configuration project /user/username/projects/myproject/packages/consumer/tsconfig.json
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/packages/consumer/tsconfig.json 2000 undefined Project: /user/username/projects/myproject/packages/consumer/tsconfig.json WatchType: Config file
Info seq  [hh:mm:ss:mss] event:
    {
     "seq": 0,
     "type": "event",
     "event": "projectLoadingStart",
     "body": {
      "projectName": "/user/username/projects/myproject/packages/consumer/tsconfig.json",
      "reason": "Creating possible configured project for /user/username/projects/myproject/packages/consumer/src/index.ts to open"
     }
    }
Info seq  [hh:mm:ss:mss] Config: /user/username/projects/myproject/packages/consumer/tsconfig.json : {
 "rootNames": [
  "/user/username/projects/myproject/packages/consumer/src/index.ts"
 ],
 "options": {
  "configFilePath": "/user/username/projects/myproject/packages/consumer/tsconfig.json"
 },
 "projectReferences": [
  {
   "path": "/user/username/projects/myproject/packages/emit-composite",
   "originalPath": "../emit-composite"
  }
 ]
}
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/packages/consumer/src 1 undefined Config: /user/username/projects/myproject/packages/consumer/tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/packages/consumer/src 1 undefined Config: /user/username/projects/myproject/packages/consumer/tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: /user/username/projects/myproject/packages/consumer/tsconfig.json
Info seq  [hh:mm:ss:mss] Config: /user/username/projects/myproject/packages/emit-composite/tsconfig.json : {
 "rootNames": [
  "/user/username/projects/myproject/packages/emit-composite/src/index.js",
  "/user/username/projects/myproject/packages/emit-composite/src/testModule.js"
 ],
 "options": {
  "composite": true,
  "allowJs": true,
  "emitDeclarationOnly": true,
  "outDir": "/user/username/projects/myproject/packages/emit-composite/lib",
  "rootDir": "/user/username/projects/myproject/packages/emit-composite/src",
  "configFilePath": "/user/username/projects/myproject/packages/emit-composite/tsconfig.json"
 }
}
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/packages/emit-composite/tsconfig.json 2000 undefined Project: /user/username/projects/myproject/packages/consumer/tsconfig.json WatchType: Config file
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/packages/emit-composite/src 1 undefined Config: /user/username/projects/myproject/packages/emit-composite/tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/packages/emit-composite/src 1 undefined Config: /user/username/projects/myproject/packages/emit-composite/tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/packages/consumer/src 1 undefined Project: /user/username/projects/myproject/packages/consumer/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/packages/consumer/src 1 undefined Project: /user/username/projects/myproject/packages/consumer/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/packages/consumer/node_modules 1 undefined Project: /user/username/projects/myproject/packages/consumer/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/packages/consumer/node_modules 1 undefined Project: /user/username/projects/myproject/packages/consumer/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/packages/node_modules 1 undefined Project: /user/username/projects/myproject/packages/consumer/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/packages/node_modules 1 undefined Project: /user/username/projects/myproject/packages/consumer/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules 1 undefined Project: /user/username/projects/myproject/packages/consumer/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules 1 undefined Project: /user/username/projects/myproject/packages/consumer/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/packages/emit-composite/package.json 2000 undefined Project: /user/username/projects/myproject/packages/consumer/tsconfig.json WatchType: File location affecting resolution
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/packages/emit-composite/src/index.js 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/packages/emit-composite 1 undefined Project: /user/username/projects/myproject/packages/consumer/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/packages/emit-composite 1 undefined Project: /user/username/projects/myproject/packages/consumer/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/packages/emit-composite/src/testModule.js 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /a/lib/lib.d.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/packages/consumer/node_modules/@types 1 undefined Project: /user/username/projects/myproject/packages/consumer/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/packages/consumer/node_modules/@types 1 undefined Project: /user/username/projects/myproject/packages/consumer/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/packages/node_modules/@types 1 undefined Project: /user/username/projects/myproject/packages/consumer/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/packages/node_modules/@types 1 undefined Project: /user/username/projects/myproject/packages/consumer/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Project: /user/username/projects/myproject/packages/consumer/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Project: /user/username/projects/myproject/packages/consumer/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/node_modules/@types 1 undefined Project: /user/username/projects/myproject/packages/consumer/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/node_modules/@types 1 undefined Project: /user/username/projects/myproject/packages/consumer/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: /user/username/projects/myproject/packages/consumer/tsconfig.json Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Project '/user/username/projects/myproject/packages/consumer/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (4)
	/a/lib/lib.d.ts Text-1 "/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }"
	/user/username/projects/myproject/packages/emit-composite/src/testModule.js Text-1 "/**\n * @param {string} arg\n */\n const testCompositeFunction = (arg) => {\n}\nmodule.exports = {\n    testCompositeFunction\n}"
	/user/username/projects/myproject/packages/emit-composite/src/index.js Text-1 "const testModule = require('./testModule');\nmodule.exports = {\n    ...testModule\n}"
	/user/username/projects/myproject/packages/consumer/src/index.ts SVC-1-0 "import { testCompositeFunction } from 'emit-composite';\ntestCompositeFunction('why hello there');\ntestCompositeFunction('why hello there', 42);"


	../../../../../../a/lib/lib.d.ts
	  Default library for target 'es5'
	../emit-composite/src/testModule.js
	  Imported via './testModule' from file '../emit-composite/src/index.js'
	../emit-composite/src/index.js
	  Imported via 'emit-composite' from file 'src/index.ts' with packageId 'emit-composite/lib/index.d.ts@1.0.0'
	src/index.ts
	  Matched by include pattern 'src' in 'tsconfig.json'

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] event:
    {
     "seq": 0,
     "type": "event",
     "event": "projectLoadingFinish",
     "body": {
      "projectName": "/user/username/projects/myproject/packages/consumer/tsconfig.json"
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
       "projectId": "f6f890b868ee990140855d3b392e7be25cc511c224e307bfaf73c9f27a024a79",
       "fileStats": {
        "js": 2,
        "jsSize": 203,
        "jsx": 0,
        "jsxSize": 0,
        "ts": 1,
        "tsSize": 143,
        "tsx": 0,
        "tsxSize": 0,
        "dts": 1,
        "dtsSize": 334,
        "deferred": 0,
        "deferredSize": 0
       },
       "compilerOptions": {},
       "typeAcquisition": {
        "enable": false,
        "include": false,
        "exclude": false
       },
       "extends": false,
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
      "triggerFile": "/user/username/projects/myproject/packages/consumer/src/index.ts",
      "configFile": "/user/username/projects/myproject/packages/consumer/tsconfig.json",
      "diagnostics": []
     }
    }
Info seq  [hh:mm:ss:mss] Project '/user/username/projects/myproject/packages/consumer/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (4)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: /user/username/projects/myproject/packages/consumer/src/index.ts ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /user/username/projects/myproject/packages/consumer/tsconfig.json
Info seq  [hh:mm:ss:mss] response:
    {
      "responseRequired": false
    }
After request

PolledWatches::
/user/username/projects/myproject/node_modules/@types: *new*
  {"pollingInterval":500}
/user/username/projects/myproject/packages/consumer/node_modules: *new*
  {"pollingInterval":500}
/user/username/projects/myproject/packages/consumer/node_modules/@types: *new*
  {"pollingInterval":500}
/user/username/projects/myproject/packages/node_modules: *new*
  {"pollingInterval":500}
/user/username/projects/myproject/packages/node_modules/@types: *new*
  {"pollingInterval":500}
/user/username/projects/node_modules/@types: *new*
  {"pollingInterval":500}

FsWatches::
/a/lib/lib.d.ts: *new*
  {}
/user/username/projects/myproject/packages/consumer/tsconfig.json: *new*
  {}
/user/username/projects/myproject/packages/emit-composite/package.json: *new*
  {}
/user/username/projects/myproject/packages/emit-composite/src/index.js: *new*
  {}
/user/username/projects/myproject/packages/emit-composite/src/testModule.js: *new*
  {}
/user/username/projects/myproject/packages/emit-composite/tsconfig.json: *new*
  {}

FsWatchesRecursive::
/user/username/projects/myproject/node_modules: *new*
  {}
/user/username/projects/myproject/packages/consumer/src: *new*
  {}
/user/username/projects/myproject/packages/emit-composite: *new*
  {}
/user/username/projects/myproject/packages/emit-composite/src: *new*
  {}

Before request

Info seq  [hh:mm:ss:mss] request:
    {
      "command": "geterr",
      "arguments": {
        "delay": 0,
        "files": [
          "/user/username/projects/myproject/packages/consumer/src/index.ts"
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
      "file": "/user/username/projects/myproject/packages/consumer/src/index.ts",
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
      "file": "/user/username/projects/myproject/packages/consumer/src/index.ts",
      "diagnostics": [
       {
        "start": {
         "line": 3,
         "offset": 42
        },
        "end": {
         "line": 3,
         "offset": 44
        },
        "text": "Expected 1 arguments, but got 2.",
        "code": 2554,
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
      "file": "/user/username/projects/myproject/packages/consumer/src/index.ts",
      "diagnostics": []
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
