Info 0    [00:00:53.000] Provided types map file "/a/lib/typesMap.json" doesn't exist
Info 1    [00:00:54.000] request:
    {
      "command": "open",
      "arguments": {
        "file": "/user/username/projects/myproject/SiblingClass/Source.ts"
      },
      "seq": 1,
      "type": "request"
    }
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
{"compileOnSave":true,"compilerOptions":{"module":"none","composite":true}}

//// [/user/username/projects/myproject/buttonClass/tsconfig.json]
{"extends":"../tsbase.json","compilerOptions":{"outFile":"Source.js"},"files":["Source.ts"]}

//// [/user/username/projects/myproject/buttonClass/Source.ts]
module Hmi {
    export class Button {
        public static myStaticFunction() {
        }
    }
}

//// [/user/username/projects/myproject/SiblingClass/tsconfig.json]
{"extends":"../tsbase.json","references":[{"path":"../buttonClass/"}],"compilerOptions":{"outFile":"Source.js"},"files":["Source.ts"]}

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
declare module Hmi {
    class Button {
        static myStaticFunction(): void;
    }
}


//// [/user/username/projects/myproject/buttonClass/Source.tsbuildinfo]
{"bundle":{"commonSourceDirectory":"./","sourceFiles":["./Source.ts"],"js":{"sections":[{"pos":0,"end":262,"kind":"text"}],"hash":"2173158315-var Hmi;\r\n(function (Hmi) {\r\n    var Button = /** @class */ (function () {\r\n        function Button() {\r\n        }\r\n        Button.myStaticFunction = function () {\r\n        };\r\n        return Button;\r\n    }());\r\n    Hmi.Button = Button;\r\n})(Hmi || (Hmi = {}));\r\n"},"dts":{"sections":[{"pos":0,"end":94,"kind":"text"}],"hash":"-26833949406-declare module Hmi {\r\n    class Button {\r\n        static myStaticFunction(): void;\r\n    }\r\n}\r\n"}},"program":{"fileNames":["../../../../../a/lib/lib.d.ts","./Source.ts"],"fileInfos":["-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }","-1678937917-module Hmi {\n    export class Button {\n        public static myStaticFunction() {\n        }\n    }\n}"],"options":{"composite":true,"module":0,"outFile":"./Source.js"},"outSignature":"-26833949406-declare module Hmi {\r\n    class Button {\r\n        static myStaticFunction(): void;\r\n    }\r\n}\r\n","latestChangedDtsFile":"./Source.d.ts"},"version":"FakeTSVersion"}

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
          "end": 262,
          "kind": "text"
        }
      ],
      "hash": "2173158315-var Hmi;\r\n(function (Hmi) {\r\n    var Button = /** @class */ (function () {\r\n        function Button() {\r\n        }\r\n        Button.myStaticFunction = function () {\r\n        };\r\n        return Button;\r\n    }());\r\n    Hmi.Button = Button;\r\n})(Hmi || (Hmi = {}));\r\n"
    },
    "dts": {
      "sections": [
        {
          "pos": 0,
          "end": 94,
          "kind": "text"
        }
      ],
      "hash": "-26833949406-declare module Hmi {\r\n    class Button {\r\n        static myStaticFunction(): void;\r\n    }\r\n}\r\n"
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
    "options": {
      "composite": true,
      "module": 0,
      "outFile": "./Source.js"
    },
    "outSignature": "-26833949406-declare module Hmi {\r\n    class Button {\r\n        static myStaticFunction(): void;\r\n    }\r\n}\r\n",
    "latestChangedDtsFile": "./Source.d.ts"
  },
  "version": "FakeTSVersion",
  "size": 1441
}

//// [/user/username/projects/myproject/buttonClass/Source.tsbuildinfo.baseline.txt]
======================================================================
File:: /user/username/projects/myproject/buttonClass/Source.js
----------------------------------------------------------------------
text: (0-262)
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
text: (0-94)
declare module Hmi {
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
declare module Hmi {
    class Sibling {
        mySiblingFunction(): void;
    }
}


//// [/user/username/projects/myproject/SiblingClass/Source.tsbuildinfo]
{"bundle":{"commonSourceDirectory":"./","sourceFiles":["./Source.ts"],"js":{"sections":[{"pos":0,"end":279,"kind":"text"}],"hash":"-11096475433-var Hmi;\r\n(function (Hmi) {\r\n    var Sibling = /** @class */ (function () {\r\n        function Sibling() {\r\n        }\r\n        Sibling.prototype.mySiblingFunction = function () {\r\n        };\r\n        return Sibling;\r\n    }());\r\n    Hmi.Sibling = Sibling;\r\n})(Hmi || (Hmi = {}));\r\n"},"dts":{"sections":[{"pos":0,"end":89,"kind":"text"}],"hash":"-5774053978-declare module Hmi {\r\n    class Sibling {\r\n        mySiblingFunction(): void;\r\n    }\r\n}\r\n"}},"program":{"fileNames":["../../../../../a/lib/lib.d.ts","../buttonClass/Source.d.ts","./Source.ts"],"fileInfos":["-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }","-26833949406-declare module Hmi {\r\n    class Button {\r\n        static myStaticFunction(): void;\r\n    }\r\n}\r\n","-3370344921-module Hmi {\n    export class Sibling {\n        public mySiblingFunction() {\n        }\n    }\n}"],"options":{"composite":true,"module":0,"outFile":"./Source.js"},"outSignature":"-5774053978-declare module Hmi {\r\n    class Sibling {\r\n        mySiblingFunction(): void;\r\n    }\r\n}\r\n","latestChangedDtsFile":"./Source.d.ts"},"version":"FakeTSVersion"}

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
          "end": 279,
          "kind": "text"
        }
      ],
      "hash": "-11096475433-var Hmi;\r\n(function (Hmi) {\r\n    var Sibling = /** @class */ (function () {\r\n        function Sibling() {\r\n        }\r\n        Sibling.prototype.mySiblingFunction = function () {\r\n        };\r\n        return Sibling;\r\n    }());\r\n    Hmi.Sibling = Sibling;\r\n})(Hmi || (Hmi = {}));\r\n"
    },
    "dts": {
      "sections": [
        {
          "pos": 0,
          "end": 89,
          "kind": "text"
        }
      ],
      "hash": "-5774053978-declare module Hmi {\r\n    class Sibling {\r\n        mySiblingFunction(): void;\r\n    }\r\n}\r\n"
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
      "../buttonClass/Source.d.ts": "-26833949406-declare module Hmi {\r\n    class Button {\r\n        static myStaticFunction(): void;\r\n    }\r\n}\r\n",
      "./Source.ts": "-3370344921-module Hmi {\n    export class Sibling {\n        public mySiblingFunction() {\n        }\n    }\n}"
    },
    "options": {
      "composite": true,
      "module": 0,
      "outFile": "./Source.js"
    },
    "outSignature": "-5774053978-declare module Hmi {\r\n    class Sibling {\r\n        mySiblingFunction(): void;\r\n    }\r\n}\r\n",
    "latestChangedDtsFile": "./Source.d.ts"
  },
  "version": "FakeTSVersion",
  "size": 1592
}

//// [/user/username/projects/myproject/SiblingClass/Source.tsbuildinfo.baseline.txt]
======================================================================
File:: /user/username/projects/myproject/SiblingClass/Source.js
----------------------------------------------------------------------
text: (0-279)
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
text: (0-89)
declare module Hmi {
    class Sibling {
        mySiblingFunction(): void;
    }
}

======================================================================


PolledWatches::

FsWatches::

FsWatchesRecursive::

Info 2    [00:00:55.000] Search path: /user/username/projects/myproject/SiblingClass
Info 3    [00:00:56.000] For info: /user/username/projects/myproject/SiblingClass/Source.ts :: Config file name: /user/username/projects/myproject/SiblingClass/tsconfig.json
Info 4    [00:00:57.000] Creating configuration project /user/username/projects/myproject/SiblingClass/tsconfig.json
Info 5    [00:00:58.000] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/SiblingClass/tsconfig.json 2000 undefined Project: /user/username/projects/myproject/SiblingClass/tsconfig.json WatchType: Config file
Info 6    [00:00:59.000] Config: /user/username/projects/myproject/SiblingClass/tsconfig.json : {
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
Info 7    [00:01:00.000] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/tsbase.json 2000 undefined Config: /user/username/projects/myproject/SiblingClass/tsconfig.json WatchType: Extended config file
Info 8    [00:01:01.000] Starting updateGraphWorker: Project: /user/username/projects/myproject/SiblingClass/tsconfig.json
Info 9    [00:01:02.000] Config: /user/username/projects/myproject/buttonClass/tsconfig.json : {
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
Info 10   [00:01:03.000] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/buttonClass/tsconfig.json 2000 undefined Project: /user/username/projects/myproject/SiblingClass/tsconfig.json WatchType: Config file
Info 11   [00:01:04.000] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/buttonClass/Source.ts 500 undefined WatchType: Closed Script info
Info 12   [00:01:05.000] FileWatcher:: Added:: WatchInfo: /a/lib/lib.d.ts 500 undefined WatchType: Closed Script info
Info 13   [00:01:06.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/SiblingClass/node_modules/@types 1 undefined Project: /user/username/projects/myproject/SiblingClass/tsconfig.json WatchType: Type roots
Info 14   [00:01:07.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/SiblingClass/node_modules/@types 1 undefined Project: /user/username/projects/myproject/SiblingClass/tsconfig.json WatchType: Type roots
Info 15   [00:01:08.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Project: /user/username/projects/myproject/SiblingClass/tsconfig.json WatchType: Type roots
Info 16   [00:01:09.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Project: /user/username/projects/myproject/SiblingClass/tsconfig.json WatchType: Type roots
Info 17   [00:01:10.000] Finishing updateGraphWorker: Project: /user/username/projects/myproject/SiblingClass/tsconfig.json Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 18   [00:01:11.000] Project '/user/username/projects/myproject/SiblingClass/tsconfig.json' (Configured)
Info 19   [00:01:12.000] 	Files (3)
	/a/lib/lib.d.ts
	/user/username/projects/myproject/buttonClass/Source.ts
	/user/username/projects/myproject/SiblingClass/Source.ts


	../../../../../a/lib/lib.d.ts
	  Default library for target 'es5'
	../buttonClass/Source.ts
	  Source from referenced project '../buttonClass/tsconfig.json' included because '--outFile' specified
	Source.ts
	  Part of 'files' list in tsconfig.json

Info 20   [00:01:13.000] -----------------------------------------------
Info 21   [00:01:14.000] Search path: /user/username/projects/myproject/SiblingClass
Info 22   [00:01:15.000] For info: /user/username/projects/myproject/SiblingClass/tsconfig.json :: No config files found.
Info 23   [00:01:16.000] Project '/user/username/projects/myproject/SiblingClass/tsconfig.json' (Configured)
Info 23   [00:01:17.000] 	Files (3)

Info 23   [00:01:18.000] -----------------------------------------------
Info 23   [00:01:19.000] Open files: 
Info 23   [00:01:20.000] 	FileName: /user/username/projects/myproject/SiblingClass/Source.ts ProjectRootPath: undefined
Info 23   [00:01:21.000] 		Projects: /user/username/projects/myproject/SiblingClass/tsconfig.json
After request

PolledWatches::
/user/username/projects/myproject/SiblingClass/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/myproject/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/user/username/projects/myproject/SiblingClass/tsconfig.json:
  {}
/user/username/projects/myproject/tsbase.json:
  {}
/user/username/projects/myproject/buttonClass/tsconfig.json:
  {}
/user/username/projects/myproject/buttonClass/Source.ts:
  {}
/a/lib/lib.d.ts:
  {}

FsWatchesRecursive::

Info 23   [00:01:22.000] response:
    {
      "responseRequired": false
    }
Info 24   [00:01:23.000] request:
    {
      "command": "compileOnSaveEmitFile",
      "arguments": {
        "file": "/user/username/projects/myproject/SiblingClass/Source.ts",
        "projectFileName": "/user/username/projects/myproject/SiblingClass/tsconfig.json"
      },
      "seq": 2,
      "type": "request"
    }
Before request

PolledWatches::
/user/username/projects/myproject/SiblingClass/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/myproject/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/user/username/projects/myproject/SiblingClass/tsconfig.json:
  {}
/user/username/projects/myproject/tsbase.json:
  {}
/user/username/projects/myproject/buttonClass/tsconfig.json:
  {}
/user/username/projects/myproject/buttonClass/Source.ts:
  {}
/a/lib/lib.d.ts:
  {}

FsWatchesRecursive::

After request
//// [/user/username/projects/myproject/SiblingClass/Source.js] file written with same contents
//// [/user/username/projects/myproject/SiblingClass/Source.d.ts] file written with same contents

PolledWatches::
/user/username/projects/myproject/SiblingClass/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/myproject/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/user/username/projects/myproject/SiblingClass/tsconfig.json:
  {}
/user/username/projects/myproject/tsbase.json:
  {}
/user/username/projects/myproject/buttonClass/tsconfig.json:
  {}
/user/username/projects/myproject/buttonClass/Source.ts:
  {}
/a/lib/lib.d.ts:
  {}

FsWatchesRecursive::

Info 25   [00:01:30.000] response:
    {
      "response": true,
      "responseRequired": true
    }