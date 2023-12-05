currentDirectory:: / useCaseSensitiveFileNames: true
Info seq  [hh:mm:ss:mss] Provided types map file "/typesMap.json" doesn't exist
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
{"bundle":{"commonSourceDirectory":"./","sourceFiles":["./Source.ts"],"js":{"sections":[{"pos":0,"end":251,"kind":"text"}],"hash":"10774636636-var Hmi;\n(function (Hmi) {\n    var Button = /** @class */ (function () {\n        function Button() {\n        }\n        Button.myStaticFunction = function () {\n        };\n        return Button;\n    }());\n    Hmi.Button = Button;\n})(Hmi || (Hmi = {}));\n"},"dts":{"sections":[{"pos":0,"end":92,"kind":"text"}],"hash":"6176297704-declare namespace Hmi {\n    class Button {\n        static myStaticFunction(): void;\n    }\n}\n"}},"program":{"fileNames":["../../../../../a/lib/lib.d.ts","./Source.ts"],"fileInfos":["-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }","-1678937917-module Hmi {\n    export class Button {\n        public static myStaticFunction() {\n        }\n    }\n}"],"root":[2],"options":{"composite":true,"module":0,"outFile":"./Source.js"},"outSignature":"6176297704-declare namespace Hmi {\n    class Button {\n        static myStaticFunction(): void;\n    }\n}\n","latestChangedDtsFile":"./Source.d.ts"},"version":"FakeTSVersion"}

//// [/user/username/projects/myproject/buttonClass/Source.tsbuildinfo.readable.baseline.txt]
{
  "bundle": {
    "commonSourceDirectory": "./",
    "sourceFiles": [
      "./Source.ts"
    ],
    "js": {
      "sections": [
        {
          "pos": 0,
          "end": 251,
          "kind": "text"
        }
      ],
      "hash": "10774636636-var Hmi;\n(function (Hmi) {\n    var Button = /** @class */ (function () {\n        function Button() {\n        }\n        Button.myStaticFunction = function () {\n        };\n        return Button;\n    }());\n    Hmi.Button = Button;\n})(Hmi || (Hmi = {}));\n"
    },
    "dts": {
      "sections": [
        {
          "pos": 0,
          "end": 92,
          "kind": "text"
        }
      ],
      "hash": "6176297704-declare namespace Hmi {\n    class Button {\n        static myStaticFunction(): void;\n    }\n}\n"
    }
  },
  "program": {
    "fileNames": [
      "../../../../../a/lib/lib.d.ts",
      "./Source.ts"
    ],
    "fileInfos": {
      "../../../../../a/lib/lib.d.ts": "-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }",
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
    "latestChangedDtsFile": "./Source.d.ts"
  },
  "version": "FakeTSVersion",
  "size": 1413
}

//// [/user/username/projects/myproject/buttonClass/Source.tsbuildinfo.baseline.txt]
======================================================================
File:: /user/username/projects/myproject/buttonClass/Source.js
----------------------------------------------------------------------
text: (0-251)
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

======================================================================
======================================================================
File:: /user/username/projects/myproject/buttonClass/Source.d.ts
----------------------------------------------------------------------
text: (0-92)
declare namespace Hmi {
    class Button {
        static myStaticFunction(): void;
    }
}

======================================================================

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
{"bundle":{"commonSourceDirectory":"./","sourceFiles":["./Source.ts"],"js":{"sections":[{"pos":0,"end":268,"kind":"text"}],"hash":"7833001416-var Hmi;\n(function (Hmi) {\n    var Sibling = /** @class */ (function () {\n        function Sibling() {\n        }\n        Sibling.prototype.mySiblingFunction = function () {\n        };\n        return Sibling;\n    }());\n    Hmi.Sibling = Sibling;\n})(Hmi || (Hmi = {}));\n"},"dts":{"sections":[{"pos":0,"end":87,"kind":"text"}],"hash":"-2810380820-declare namespace Hmi {\n    class Sibling {\n        mySiblingFunction(): void;\n    }\n}\n"}},"program":{"fileNames":["../../../../../a/lib/lib.d.ts","../buttonClass/Source.d.ts","./Source.ts"],"fileInfos":["-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }","6176297704-declare namespace Hmi {\n    class Button {\n        static myStaticFunction(): void;\n    }\n}\n","-3370344921-module Hmi {\n    export class Sibling {\n        public mySiblingFunction() {\n        }\n    }\n}"],"root":[3],"options":{"composite":true,"module":0,"outFile":"./Source.js"},"outSignature":"-2810380820-declare namespace Hmi {\n    class Sibling {\n        mySiblingFunction(): void;\n    }\n}\n","latestChangedDtsFile":"./Source.d.ts"},"version":"FakeTSVersion"}

//// [/user/username/projects/myproject/SiblingClass/Source.tsbuildinfo.readable.baseline.txt]
{
  "bundle": {
    "commonSourceDirectory": "./",
    "sourceFiles": [
      "./Source.ts"
    ],
    "js": {
      "sections": [
        {
          "pos": 0,
          "end": 268,
          "kind": "text"
        }
      ],
      "hash": "7833001416-var Hmi;\n(function (Hmi) {\n    var Sibling = /** @class */ (function () {\n        function Sibling() {\n        }\n        Sibling.prototype.mySiblingFunction = function () {\n        };\n        return Sibling;\n    }());\n    Hmi.Sibling = Sibling;\n})(Hmi || (Hmi = {}));\n"
    },
    "dts": {
      "sections": [
        {
          "pos": 0,
          "end": 87,
          "kind": "text"
        }
      ],
      "hash": "-2810380820-declare namespace Hmi {\n    class Sibling {\n        mySiblingFunction(): void;\n    }\n}\n"
    }
  },
  "program": {
    "fileNames": [
      "../../../../../a/lib/lib.d.ts",
      "../buttonClass/Source.d.ts",
      "./Source.ts"
    ],
    "fileInfos": {
      "../../../../../a/lib/lib.d.ts": "-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }",
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
    "latestChangedDtsFile": "./Source.d.ts"
  },
  "version": "FakeTSVersion",
  "size": 1556
}

//// [/user/username/projects/myproject/SiblingClass/Source.tsbuildinfo.baseline.txt]
======================================================================
File:: /user/username/projects/myproject/SiblingClass/Source.js
----------------------------------------------------------------------
text: (0-268)
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

======================================================================
======================================================================
File:: /user/username/projects/myproject/SiblingClass/Source.d.ts
----------------------------------------------------------------------
text: (0-87)
declare namespace Hmi {
    class Sibling {
        mySiblingFunction(): void;
    }
}

======================================================================


Info seq  [hh:mm:ss:mss] request:
    {
      "command": "open",
      "arguments": {
        "file": "/user/username/projects/myproject/SiblingClass/Source.ts"
      },
      "seq": 1,
      "type": "request"
    }
Info seq  [hh:mm:ss:mss] Search path: /user/username/projects/myproject/SiblingClass
Info seq  [hh:mm:ss:mss] For info: /user/username/projects/myproject/SiblingClass/Source.ts :: Config file name: /user/username/projects/myproject/SiblingClass/tsconfig.json
Info seq  [hh:mm:ss:mss] Creating configuration project /user/username/projects/myproject/SiblingClass/tsconfig.json
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/SiblingClass/tsconfig.json 2000 undefined Project: /user/username/projects/myproject/SiblingClass/tsconfig.json WatchType: Config file
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
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /a/lib/lib.d.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/SiblingClass/node_modules/@types 1 undefined Project: /user/username/projects/myproject/SiblingClass/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/SiblingClass/node_modules/@types 1 undefined Project: /user/username/projects/myproject/SiblingClass/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Project: /user/username/projects/myproject/SiblingClass/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Project: /user/username/projects/myproject/SiblingClass/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/node_modules/@types 1 undefined Project: /user/username/projects/myproject/SiblingClass/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/node_modules/@types 1 undefined Project: /user/username/projects/myproject/SiblingClass/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: /user/username/projects/myproject/SiblingClass/tsconfig.json Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Project '/user/username/projects/myproject/SiblingClass/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (3)
	/a/lib/lib.d.ts Text-1 "/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }"
	/user/username/projects/myproject/buttonClass/Source.ts Text-1 "module Hmi {\n    export class Button {\n        public static myStaticFunction() {\n        }\n    }\n}"
	/user/username/projects/myproject/SiblingClass/Source.ts SVC-1-0 "module Hmi {\n    export class Sibling {\n        public mySiblingFunction() {\n        }\n    }\n}"


	../../../../../a/lib/lib.d.ts
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
            "dtsSize": 334,
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
Info seq  [hh:mm:ss:mss] Search path: /user/username/projects/myproject/SiblingClass
Info seq  [hh:mm:ss:mss] For info: /user/username/projects/myproject/SiblingClass/tsconfig.json :: No config files found.
Info seq  [hh:mm:ss:mss] Project '/user/username/projects/myproject/SiblingClass/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (3)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: /user/username/projects/myproject/SiblingClass/Source.ts ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /user/username/projects/myproject/SiblingClass/tsconfig.json
Info seq  [hh:mm:ss:mss] response:
    {
      "responseRequired": false
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
/a/lib/lib.d.ts: *new*
  {}
/user/username/projects/myproject/SiblingClass/tsconfig.json: *new*
  {}
/user/username/projects/myproject/buttonClass/Source.ts: *new*
  {}
/user/username/projects/myproject/buttonClass/tsconfig.json: *new*
  {}
/user/username/projects/myproject/tsbase.json: *new*
  {}

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
