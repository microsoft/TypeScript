Info seq  [hh:mm:ss:mss] currentDirectory:: /home/src/Vscode/Projects/bin useCaseSensitiveFileNames:: true
Info seq  [hh:mm:ss:mss] libs Location:: /home/src/tslibs/TS/Lib
Info seq  [hh:mm:ss:mss] globalTypingsCacheLocation:: /home/src/Library/Caches/typescript
Info seq  [hh:mm:ss:mss] Provided types map file "/home/src/tslibs/TS/Lib/typesMap.json" doesn't exist
Before request
//// [/user/username/projects/myproject/tsbase.json]
{
  "compileOnSave": true,
  "compilerOptions": {
    "module": "none",
    "composite": true
  }
}

//// [/user/username/projects/myproject/buttonClass/tsconfig.json]
{
  "extends": "../tsbase.json",
  "compilerOptions": {
    "outFile": "Source.js"
  },
  "files": [
    "Source.ts"
  ]
}

//// [/user/username/projects/myproject/buttonClass/Source.ts]
module Hmi {
    export class Button {
        public static myStaticFunction() {
        }
    }
}

//// [/user/username/projects/myproject/SiblingClass/tsconfig.json]
{
  "extends": "../tsbase.json",
  "references": [
    {
      "path": "../buttonClass/"
    }
  ],
  "compilerOptions": {
    "outFile": "Source.js"
  },
  "files": [
    "Source.ts"
  ]
}

//// [/user/username/projects/myproject/SiblingClass/Source.ts]
module Hmi {
    export class Sibling {
        public mySiblingFunction() {
        }
    }
}

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

//// [/user/username/projects/myproject/buttonClass/Source.js]
var Hmi;
(function (Hmi) {
    var Button = /** @class */ (function () {
        function Button() {
        }
        Button.myStaticFunction = function () {
        };
        return Button;
    }());
    Hmi.Button = Button;
})(Hmi || (Hmi = {}));


//// [/user/username/projects/myproject/buttonClass/Source.d.ts]
declare namespace Hmi {
    class Button {
        static myStaticFunction(): void;
    }
}


//// [/user/username/projects/myproject/buttonClass/Source.tsbuildinfo]
{"fileNames":["../../../../../home/src/tslibs/TS/Lib/lib.d.ts","./Source.ts"],"fileInfos":["3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","-1678937917-module Hmi {\n    export class Button {\n        public static myStaticFunction() {\n        }\n    }\n}"],"root":[2],"options":{"composite":true,"module":0,"outFile":"./Source.js"},"outSignature":"6176297704-declare namespace Hmi {\n    class Button {\n        static myStaticFunction(): void;\n    }\n}\n","latestChangedDtsFile":"./Source.d.ts","version":"FakeTSVersion"}

//// [/user/username/projects/myproject/buttonClass/Source.tsbuildinfo.readable.baseline.txt]
{
  "fileNames": [
    "../../../../../home/src/tslibs/TS/Lib/lib.d.ts",
    "./Source.ts"
  ],
  "fileInfos": {
    "../../../../../home/src/tslibs/TS/Lib/lib.d.ts": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
    "./Source.ts": "-1678937917-module Hmi {\n    export class Button {\n        public static myStaticFunction() {\n        }\n    }\n}"
  },
  "root": [
    [
      2,
      "./Source.ts"
    ]
  ],
  "options": {
    "composite": true,
    "module": 0,
    "outFile": "./Source.js"
  },
  "outSignature": "6176297704-declare namespace Hmi {\n    class Button {\n        static myStaticFunction(): void;\n    }\n}\n",
  "latestChangedDtsFile": "./Source.d.ts",
  "version": "FakeTSVersion",
  "size": 918
}

//// [/user/username/projects/myproject/SiblingClass/Source.js]
var Hmi;
(function (Hmi) {
    var Sibling = /** @class */ (function () {
        function Sibling() {
        }
        Sibling.prototype.mySiblingFunction = function () {
        };
        return Sibling;
    }());
    Hmi.Sibling = Sibling;
})(Hmi || (Hmi = {}));


//// [/user/username/projects/myproject/SiblingClass/Source.d.ts]
declare namespace Hmi {
    class Sibling {
        mySiblingFunction(): void;
    }
}


//// [/user/username/projects/myproject/SiblingClass/Source.tsbuildinfo]
{"fileNames":["../../../../../home/src/tslibs/TS/Lib/lib.d.ts","../buttonClass/Source.d.ts","./Source.ts"],"fileInfos":["3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","6176297704-declare namespace Hmi {\n    class Button {\n        static myStaticFunction(): void;\n    }\n}\n","-3370344921-module Hmi {\n    export class Sibling {\n        public mySiblingFunction() {\n        }\n    }\n}"],"root":[3],"options":{"composite":true,"module":0,"outFile":"./Source.js"},"outSignature":"-2810380820-declare namespace Hmi {\n    class Sibling {\n        mySiblingFunction(): void;\n    }\n}\n","latestChangedDtsFile":"./Source.d.ts","version":"FakeTSVersion"}

//// [/user/username/projects/myproject/SiblingClass/Source.tsbuildinfo.readable.baseline.txt]
{
  "fileNames": [
    "../../../../../home/src/tslibs/TS/Lib/lib.d.ts",
    "../buttonClass/Source.d.ts",
    "./Source.ts"
  ],
  "fileInfos": {
    "../../../../../home/src/tslibs/TS/Lib/lib.d.ts": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
    "../buttonClass/Source.d.ts": "6176297704-declare namespace Hmi {\n    class Button {\n        static myStaticFunction(): void;\n    }\n}\n",
    "./Source.ts": "-3370344921-module Hmi {\n    export class Sibling {\n        public mySiblingFunction() {\n        }\n    }\n}"
  },
  "root": [
    [
      3,
      "./Source.ts"
    ]
  ],
  "options": {
    "composite": true,
    "module": 0,
    "outFile": "./Source.js"
  },
  "outSignature": "-2810380820-declare namespace Hmi {\n    class Sibling {\n        mySiblingFunction(): void;\n    }\n}\n",
  "latestChangedDtsFile": "./Source.d.ts",
  "version": "FakeTSVersion",
  "size": 1049
}


Info seq  [hh:mm:ss:mss] request:
    {
      "command": "open",
      "arguments": {
        "file": "/user/username/projects/myproject/SiblingClass/Source.ts"
      },
      "seq": 1,
      "type": "request"
    }
Info seq  [hh:mm:ss:mss] getConfigFileNameForFile:: File: /user/username/projects/myproject/SiblingClass/Source.ts ProjectRootPath: undefined:: Result: /user/username/projects/myproject/SiblingClass/tsconfig.json
Info seq  [hh:mm:ss:mss] Creating ConfiguredProject: /user/username/projects/myproject/SiblingClass/tsconfig.json, currentDirectory: /user/username/projects/myproject/SiblingClass
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/SiblingClass/tsconfig.json 2000 undefined Project: /user/username/projects/myproject/SiblingClass/tsconfig.json WatchType: Config file
Info seq  [hh:mm:ss:mss] Config: /user/username/projects/myproject/SiblingClass/tsconfig.json : {
 "rootNames": [
  "/user/username/projects/myproject/SiblingClass/Source.ts"
 ],
 "options": {
  "module": 0,
  "composite": true,
  "outFile": "/user/username/projects/myproject/SiblingClass/Source.js",
  "configFilePath": "/user/username/projects/myproject/SiblingClass/tsconfig.json"
 },
 "projectReferences": [
  {
   "path": "/user/username/projects/myproject/buttonClass",
   "originalPath": "../buttonClass/"
  }
 ]
}
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/tsbase.json 2000 undefined Config: /user/username/projects/myproject/SiblingClass/tsconfig.json WatchType: Extended config file
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "projectLoadingStart",
      "body": {
        "projectName": "/user/username/projects/myproject/SiblingClass/tsconfig.json",
        "reason": "Creating possible configured project for /user/username/projects/myproject/SiblingClass/Source.ts to open"
      }
    }
Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: /user/username/projects/myproject/SiblingClass/tsconfig.json
Info seq  [hh:mm:ss:mss] Config: /user/username/projects/myproject/buttonClass/tsconfig.json : {
 "rootNames": [
  "/user/username/projects/myproject/buttonClass/Source.ts"
 ],
 "options": {
  "module": 0,
  "composite": true,
  "outFile": "/user/username/projects/myproject/buttonClass/Source.js",
  "configFilePath": "/user/username/projects/myproject/buttonClass/tsconfig.json"
 }
}
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/buttonClass/tsconfig.json 2000 undefined Project: /user/username/projects/myproject/SiblingClass/tsconfig.json WatchType: Config file
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/buttonClass/Source.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/tslibs/TS/Lib/lib.d.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/SiblingClass/node_modules/@types 1 undefined Project: /user/username/projects/myproject/SiblingClass/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/SiblingClass/node_modules/@types 1 undefined Project: /user/username/projects/myproject/SiblingClass/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Project: /user/username/projects/myproject/SiblingClass/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Project: /user/username/projects/myproject/SiblingClass/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/node_modules/@types 1 undefined Project: /user/username/projects/myproject/SiblingClass/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/node_modules/@types 1 undefined Project: /user/username/projects/myproject/SiblingClass/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: /user/username/projects/myproject/SiblingClass/tsconfig.json projectStateVersion: 1 projectProgramVersion: 0 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Project '/user/username/projects/myproject/SiblingClass/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (3)
	/home/src/tslibs/TS/Lib/lib.d.ts Text-1 "/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };"
	/user/username/projects/myproject/buttonClass/Source.ts Text-1 "module Hmi {\n    export class Button {\n        public static myStaticFunction() {\n        }\n    }\n}"
	/user/username/projects/myproject/SiblingClass/Source.ts SVC-1-0 "module Hmi {\n    export class Sibling {\n        public mySiblingFunction() {\n        }\n    }\n}"


	../../../../../home/src/tslibs/TS/Lib/lib.d.ts
	  Default library for target 'es5'
	../buttonClass/Source.ts
	  Source from referenced project '../buttonClass/tsconfig.json' included because '--outFile' specified
	Source.ts
	  Part of 'files' list in tsconfig.json

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "projectLoadingFinish",
      "body": {
        "projectName": "/user/username/projects/myproject/SiblingClass/tsconfig.json"
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
          "projectId": "964f77134f5c661768d9eab30f0fe1277faae85861039c72ac52a3419d8e463a",
          "fileStats": {
            "js": 0,
            "jsSize": 0,
            "jsx": 0,
            "jsxSize": 0,
            "ts": 2,
            "tsSize": 193,
            "tsx": 0,
            "tsxSize": 0,
            "dts": 1,
            "dtsSize": 413,
            "deferred": 0,
            "deferredSize": 0
          },
          "compilerOptions": {
            "module": "none",
            "composite": true,
            "outFile": ""
          },
          "typeAcquisition": {
            "enable": false,
            "include": false,
            "exclude": false
          },
          "extends": true,
          "files": true,
          "include": false,
          "exclude": false,
          "compileOnSave": true,
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
        "triggerFile": "/user/username/projects/myproject/SiblingClass/Source.ts",
        "configFile": "/user/username/projects/myproject/SiblingClass/tsconfig.json",
        "diagnostics": []
      }
    }
Info seq  [hh:mm:ss:mss] getConfigFileNameForFile:: File: /user/username/projects/myproject/SiblingClass/tsconfig.json ProjectRootPath: undefined:: Result: undefined
Info seq  [hh:mm:ss:mss] Project '/user/username/projects/myproject/SiblingClass/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (3)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: /user/username/projects/myproject/SiblingClass/Source.ts ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /user/username/projects/myproject/SiblingClass/tsconfig.json
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
/user/username/projects/myproject/SiblingClass/node_modules/@types: *new*
  {"pollingInterval":500}
/user/username/projects/myproject/node_modules/@types: *new*
  {"pollingInterval":500}
/user/username/projects/node_modules/@types: *new*
  {"pollingInterval":500}

FsWatches::
/home/src/tslibs/TS/Lib/lib.d.ts: *new*
  {}
/user/username/projects/myproject/SiblingClass/tsconfig.json: *new*
  {}
/user/username/projects/myproject/buttonClass/Source.ts: *new*
  {}
/user/username/projects/myproject/buttonClass/tsconfig.json: *new*
  {}
/user/username/projects/myproject/tsbase.json: *new*
  {}

Projects::
/user/username/projects/myproject/SiblingClass/tsconfig.json (Configured) *new*
    projectStateVersion: 1
    projectProgramVersion: 1
    autoImportProviderHost: false

ScriptInfos::
/home/src/tslibs/TS/Lib/lib.d.ts *new*
    version: Text-1
    containingProjects: 1
        /user/username/projects/myproject/SiblingClass/tsconfig.json
/user/username/projects/myproject/SiblingClass/Source.ts (Open) *new*
    version: SVC-1-0
    containingProjects: 1
        /user/username/projects/myproject/SiblingClass/tsconfig.json *default*
/user/username/projects/myproject/buttonClass/Source.ts *new*
    version: Text-1
    containingProjects: 1
        /user/username/projects/myproject/SiblingClass/tsconfig.json

Before request

Info seq  [hh:mm:ss:mss] request:
    {
      "command": "compileOnSaveEmitFile",
      "arguments": {
        "file": "/user/username/projects/myproject/SiblingClass/Source.ts",
        "projectFileName": "/user/username/projects/myproject/SiblingClass/tsconfig.json"
      },
      "seq": 2,
      "type": "request"
    }
Info seq  [hh:mm:ss:mss] response:
    {
      "response": true,
      "responseRequired": true
    }
After request
//// [/user/username/projects/myproject/SiblingClass/Source.js] file written with same contents
//// [/user/username/projects/myproject/SiblingClass/Source.d.ts] file written with same contents
