Info 0    [00:01:14.000] Provided types map file "/a/lib/typesMap.json" doesn't exist
Info 1    [00:01:15.000] request:
    {
      "seq": 0,
      "type": "request",
      "command": "open",
      "arguments": {
        "file": "/user/username/projects/container/compositeExec/index.ts"
      }
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

//// [/user/username/projects/container/lib/tsconfig.json]
{
    "compilerOptions": {
        "outFile": "../built/local/lib.js",
        "composite": true,
        "declarationMap": true,
    },
    "references": [],
    "files": [
        "index.ts"
    ]
}


//// [/user/username/projects/container/lib/index.ts]
namespace container {
    export const myConst = 30;
}

//// [/user/username/projects/container/exec/tsconfig.json]
{
    "compilerOptions": {
        "outFile": "../built/local/exec.js",
    },
    "files": [
        "index.ts"
    ],
    "references": [
        { "path": "../lib", "prepend": true }
    ]
}


//// [/user/username/projects/container/exec/index.ts]
namespace container {
    export function getMyConst() {
        return myConst;
    }
}

//// [/user/username/projects/container/compositeExec/tsconfig.json]
{
    "compilerOptions": {
        "outFile": "../built/local/compositeExec.js",
        "composite": true,
        "declarationMap": true,
    },
    "files": [
        "index.ts"
    ],
    "references": [
        { "path": "../lib", "prepend": true }
    ]
}


//// [/user/username/projects/container/compositeExec/index.ts]
namespace container {
    export function getMyConst() {
        return myConst;
    }
}

//// [/user/username/projects/container/tsconfig.json]
{
    "files": [],
    "include": [],
    "references": [
        { "path": "./exec" },
        { "path": "./compositeExec" }
    ]
}

//// [/user/username/projects/temp/temp.ts]
let x = 10

//// [/user/username/projects/container/built/local/lib.js]
var container;
(function (container) {
    container.myConst = 30;
})(container || (container = {}));


//// [/user/username/projects/container/built/local/lib.d.ts.map]
{"version":3,"file":"lib.d.ts","sourceRoot":"","sources":["../../lib/index.ts"],"names":[],"mappings":"AAAA,kBAAU,SAAS,CAAC;IACT,MAAM,OAAO,KAAK,CAAC;CAC7B"}

//// [/user/username/projects/container/built/local/lib.d.ts]
declare namespace container {
    const myConst = 30;
}
//# sourceMappingURL=lib.d.ts.map

//// [/user/username/projects/container/built/local/lib.tsbuildinfo]
{"bundle":{"commonSourceDirectory":"../../lib","sourceFiles":["../../lib/index.ts"],"js":{"sections":[{"pos":0,"end":102,"kind":"text"}],"hash":"-5780640416-var container;\n(function (container) {\n    container.myConst = 30;\n})(container || (container = {}));\n"},"dts":{"sections":[{"pos":0,"end":56,"kind":"text"}],"mapHash":"-12950023432-{\"version\":3,\"file\":\"lib.d.ts\",\"sourceRoot\":\"\",\"sources\":[\"../../lib/index.ts\"],\"names\":[],\"mappings\":\"AAAA,kBAAU,SAAS,CAAC;IACT,MAAM,OAAO,KAAK,CAAC;CAC7B\"}","hash":"-3233313694-declare namespace container {\n    const myConst = 30;\n}\n//# sourceMappingURL=lib.d.ts.map"}},"program":{"fileNames":["../../../../../../a/lib/lib.d.ts","../../lib/index.ts"],"fileInfos":["-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }","-7311945748-namespace container {\r\n    export const myConst = 30;\r\n}"],"options":{"composite":true,"declarationMap":true,"outFile":"./lib.js"},"outSignature":"4250822250-declare namespace container {\n    const myConst = 30;\n}\n","latestChangedDtsFile":"./lib.d.ts"},"version":"FakeTSVersion"}

//// [/user/username/projects/container/built/local/lib.tsbuildinfo.readable.baseline.txt]
{
  "bundle": {
    "commonSourceDirectory": "../../lib",
    "sourceFiles": [
      "../../lib/index.ts"
    ],
    "js": {
      "sections": [
        {
          "pos": 0,
          "end": 102,
          "kind": "text"
        }
      ],
      "hash": "-5780640416-var container;\n(function (container) {\n    container.myConst = 30;\n})(container || (container = {}));\n"
    },
    "dts": {
      "sections": [
        {
          "pos": 0,
          "end": 56,
          "kind": "text"
        }
      ],
      "hash": "-3233313694-declare namespace container {\n    const myConst = 30;\n}\n//# sourceMappingURL=lib.d.ts.map",
      "mapHash": "-12950023432-{\"version\":3,\"file\":\"lib.d.ts\",\"sourceRoot\":\"\",\"sources\":[\"../../lib/index.ts\"],\"names\":[],\"mappings\":\"AAAA,kBAAU,SAAS,CAAC;IACT,MAAM,OAAO,KAAK,CAAC;CAC7B\"}"
    }
  },
  "program": {
    "fileNames": [
      "../../../../../../a/lib/lib.d.ts",
      "../../lib/index.ts"
    ],
    "fileInfos": {
      "../../../../../../a/lib/lib.d.ts": "-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }",
      "../../lib/index.ts": "-7311945748-namespace container {\r\n    export const myConst = 30;\r\n}"
    },
    "options": {
      "composite": true,
      "declarationMap": true,
      "outFile": "./lib.js"
    },
    "outSignature": "4250822250-declare namespace container {\n    const myConst = 30;\n}\n",
    "latestChangedDtsFile": "./lib.d.ts"
  },
  "version": "FakeTSVersion",
  "size": 1391
}

//// [/user/username/projects/container/built/local/lib.tsbuildinfo.baseline.txt]
======================================================================
File:: /user/username/projects/container/built/local/lib.js
----------------------------------------------------------------------
text: (0-102)
var container;
(function (container) {
    container.myConst = 30;
})(container || (container = {}));

======================================================================
======================================================================
File:: /user/username/projects/container/built/local/lib.d.ts
----------------------------------------------------------------------
text: (0-56)
declare namespace container {
    const myConst = 30;
}

======================================================================

//// [/user/username/projects/container/built/local/exec.js]
var container;
(function (container) {
    container.myConst = 30;
})(container || (container = {}));
var container;
(function (container) {
    function getMyConst() {
        return container.myConst;
    }
    container.getMyConst = getMyConst;
})(container || (container = {}));


//// [/user/username/projects/container/built/local/compositeExec.js]
var container;
(function (container) {
    container.myConst = 30;
})(container || (container = {}));
var container;
(function (container) {
    function getMyConst() {
        return container.myConst;
    }
    container.getMyConst = getMyConst;
})(container || (container = {}));


//// [/user/username/projects/container/built/local/compositeExec.d.ts.map]
{"version":3,"file":"compositeExec.d.ts","sourceRoot":"","sources":["../../lib/index.ts","../../compositeExec/index.ts"],"names":[],"mappings":"AAAA,kBAAU,SAAS,CAAC;IACT,MAAM,OAAO,KAAK,CAAC;CAC7B;ACFD,kBAAU,SAAS,CAAC;IAChB,SAAgB,UAAU,WAEzB;CACJ"}

//// [/user/username/projects/container/built/local/compositeExec.d.ts]
declare namespace container {
    const myConst = 30;
}
declare namespace container {
    function getMyConst(): number;
}
//# sourceMappingURL=compositeExec.d.ts.map

//// [/user/username/projects/container/built/local/compositeExec.tsbuildinfo]
{"bundle":{"commonSourceDirectory":"../../compositeExec","sourceFiles":["../../compositeExec/index.ts"],"js":{"sections":[{"pos":0,"end":102,"kind":"prepend","data":"./lib.js","texts":[{"pos":0,"end":102,"kind":"text"}]},{"pos":102,"end":283,"kind":"text"}],"hash":"-2184050024-var container;\n(function (container) {\n    container.myConst = 30;\n})(container || (container = {}));\nvar container;\n(function (container) {\n    function getMyConst() {\n        return container.myConst;\n    }\n    container.getMyConst = getMyConst;\n})(container || (container = {}));\n"},"dts":{"sections":[{"pos":0,"end":56,"kind":"prepend","data":"./lib.d.ts","texts":[{"pos":0,"end":56,"kind":"text"}]},{"pos":56,"end":123,"kind":"text"}],"mapHash":"25748245913-{\"version\":3,\"file\":\"compositeExec.d.ts\",\"sourceRoot\":\"\",\"sources\":[\"../../lib/index.ts\",\"../../compositeExec/index.ts\"],\"names\":[],\"mappings\":\"AAAA,kBAAU,SAAS,CAAC;IACT,MAAM,OAAO,KAAK,CAAC;CAC7B;ACFD,kBAAU,SAAS,CAAC;IAChB,SAAgB,UAAU,WAEzB;CACJ\"}","hash":"862035579-declare namespace container {\n    const myConst = 30;\n}\ndeclare namespace container {\n    function getMyConst(): number;\n}\n//# sourceMappingURL=compositeExec.d.ts.map"}},"program":{"fileNames":["../../../../../../a/lib/lib.d.ts","./lib.d.ts","../../compositeexec/index.ts"],"fileInfos":["-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }","4250822250-declare namespace container {\n    const myConst = 30;\n}\n","-6143734929-namespace container {\r\n    export function getMyConst() {\r\n        return myConst;\r\n    }\r\n}"],"options":{"composite":true,"declarationMap":true,"outFile":"./compositeExec.js"},"outSignature":"5987946274-declare namespace container {\n    const myConst = 30;\n}\ndeclare namespace container {\n    function getMyConst(): number;\n}\n","latestChangedDtsFile":"./compositeExec.d.ts"},"version":"FakeTSVersion"}

//// [/user/username/projects/container/built/local/compositeExec.tsbuildinfo.readable.baseline.txt]
{
  "bundle": {
    "commonSourceDirectory": "../../compositeExec",
    "sourceFiles": [
      "../../compositeExec/index.ts"
    ],
    "js": {
      "sections": [
        {
          "pos": 0,
          "end": 102,
          "kind": "prepend",
          "data": "./lib.js",
          "texts": [
            {
              "pos": 0,
              "end": 102,
              "kind": "text"
            }
          ]
        },
        {
          "pos": 102,
          "end": 283,
          "kind": "text"
        }
      ],
      "hash": "-2184050024-var container;\n(function (container) {\n    container.myConst = 30;\n})(container || (container = {}));\nvar container;\n(function (container) {\n    function getMyConst() {\n        return container.myConst;\n    }\n    container.getMyConst = getMyConst;\n})(container || (container = {}));\n"
    },
    "dts": {
      "sections": [
        {
          "pos": 0,
          "end": 56,
          "kind": "prepend",
          "data": "./lib.d.ts",
          "texts": [
            {
              "pos": 0,
              "end": 56,
              "kind": "text"
            }
          ]
        },
        {
          "pos": 56,
          "end": 123,
          "kind": "text"
        }
      ],
      "hash": "862035579-declare namespace container {\n    const myConst = 30;\n}\ndeclare namespace container {\n    function getMyConst(): number;\n}\n//# sourceMappingURL=compositeExec.d.ts.map",
      "mapHash": "25748245913-{\"version\":3,\"file\":\"compositeExec.d.ts\",\"sourceRoot\":\"\",\"sources\":[\"../../lib/index.ts\",\"../../compositeExec/index.ts\"],\"names\":[],\"mappings\":\"AAAA,kBAAU,SAAS,CAAC;IACT,MAAM,OAAO,KAAK,CAAC;CAC7B;ACFD,kBAAU,SAAS,CAAC;IAChB,SAAgB,UAAU,WAEzB;CACJ\"}"
    }
  },
  "program": {
    "fileNames": [
      "../../../../../../a/lib/lib.d.ts",
      "./lib.d.ts",
      "../../compositeexec/index.ts"
    ],
    "fileInfos": {
      "../../../../../../a/lib/lib.d.ts": "-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }",
      "./lib.d.ts": "4250822250-declare namespace container {\n    const myConst = 30;\n}\n",
      "../../compositeexec/index.ts": "-6143734929-namespace container {\r\n    export function getMyConst() {\r\n        return myConst;\r\n    }\r\n}"
    },
    "options": {
      "composite": true,
      "declarationMap": true,
      "outFile": "./compositeExec.js"
    },
    "outSignature": "5987946274-declare namespace container {\n    const myConst = 30;\n}\ndeclare namespace container {\n    function getMyConst(): number;\n}\n",
    "latestChangedDtsFile": "./compositeExec.d.ts"
  },
  "version": "FakeTSVersion",
  "size": 2196
}

//// [/user/username/projects/container/built/local/compositeExec.tsbuildinfo.baseline.txt]
======================================================================
File:: /user/username/projects/container/built/local/compositeExec.js
----------------------------------------------------------------------
prepend: (0-102):: ./lib.js texts:: 1
>>--------------------------------------------------------------------
text: (0-102)
var container;
(function (container) {
    container.myConst = 30;
})(container || (container = {}));

----------------------------------------------------------------------
text: (102-283)
var container;
(function (container) {
    function getMyConst() {
        return container.myConst;
    }
    container.getMyConst = getMyConst;
})(container || (container = {}));

======================================================================
======================================================================
File:: /user/username/projects/container/built/local/compositeExec.d.ts
----------------------------------------------------------------------
prepend: (0-56):: ./lib.d.ts texts:: 1
>>--------------------------------------------------------------------
text: (0-56)
declare namespace container {
    const myConst = 30;
}

----------------------------------------------------------------------
text: (56-123)
declare namespace container {
    function getMyConst(): number;
}

======================================================================


PolledWatches::

FsWatches::

FsWatchesRecursive::

Info 2    [00:01:16.000] Search path: /user/username/projects/container/compositeExec
Info 3    [00:01:17.000] For info: /user/username/projects/container/compositeExec/index.ts :: Config file name: /user/username/projects/container/compositeExec/tsconfig.json
Info 4    [00:01:18.000] Creating configuration project /user/username/projects/container/compositeExec/tsconfig.json
Info 5    [00:01:19.000] FileWatcher:: Added:: WatchInfo: /user/username/projects/container/compositeExec/tsconfig.json 2000 undefined Project: /user/username/projects/container/compositeExec/tsconfig.json WatchType: Config file
Info 6    [00:01:20.000] Config: /user/username/projects/container/compositeExec/tsconfig.json : {
 "rootNames": [
  "/user/username/projects/container/compositeExec/index.ts"
 ],
 "options": {
  "outFile": "/user/username/projects/container/built/local/compositeExec.js",
  "composite": true,
  "declarationMap": true,
  "configFilePath": "/user/username/projects/container/compositeExec/tsconfig.json"
 },
 "projectReferences": [
  {
   "path": "/user/username/projects/container/lib",
   "originalPath": "../lib",
   "prepend": true
  }
 ]
}
Info 7    [00:01:21.000] Starting updateGraphWorker: Project: /user/username/projects/container/compositeExec/tsconfig.json
Info 8    [00:01:22.000] Config: /user/username/projects/container/lib/tsconfig.json : {
 "rootNames": [
  "/user/username/projects/container/lib/index.ts"
 ],
 "options": {
  "outFile": "/user/username/projects/container/built/local/lib.js",
  "composite": true,
  "declarationMap": true,
  "configFilePath": "/user/username/projects/container/lib/tsconfig.json"
 }
}
Info 9    [00:01:23.000] FileWatcher:: Added:: WatchInfo: /user/username/projects/container/lib/tsconfig.json 2000 undefined Project: /user/username/projects/container/compositeExec/tsconfig.json WatchType: Config file
Info 10   [00:01:24.000] FileWatcher:: Added:: WatchInfo: /user/username/projects/container/lib/index.ts 500 undefined WatchType: Closed Script info
Info 11   [00:01:25.000] FileWatcher:: Added:: WatchInfo: /a/lib/lib.d.ts 500 undefined WatchType: Closed Script info
Info 12   [00:01:26.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/container/compositeExec/node_modules/@types 1 undefined Project: /user/username/projects/container/compositeExec/tsconfig.json WatchType: Type roots
Info 13   [00:01:27.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/container/compositeExec/node_modules/@types 1 undefined Project: /user/username/projects/container/compositeExec/tsconfig.json WatchType: Type roots
Info 14   [00:01:28.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/container/node_modules/@types 1 undefined Project: /user/username/projects/container/compositeExec/tsconfig.json WatchType: Type roots
Info 15   [00:01:29.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/container/node_modules/@types 1 undefined Project: /user/username/projects/container/compositeExec/tsconfig.json WatchType: Type roots
Info 16   [00:01:30.000] Finishing updateGraphWorker: Project: /user/username/projects/container/compositeExec/tsconfig.json Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 17   [00:01:31.000] Project '/user/username/projects/container/compositeExec/tsconfig.json' (Configured)
Info 18   [00:01:32.000] 	Files (3)
	/a/lib/lib.d.ts
	/user/username/projects/container/lib/index.ts
	/user/username/projects/container/compositeExec/index.ts


	../../../../../a/lib/lib.d.ts
	  Default library for target 'es3'
	../lib/index.ts
	  Source from referenced project '../lib/tsconfig.json' included because '--outFile' specified
	index.ts
	  Part of 'files' list in tsconfig.json

Info 19   [00:01:33.000] -----------------------------------------------
Info 20   [00:01:34.000] Search path: /user/username/projects/container/compositeExec
Info 21   [00:01:35.000] For info: /user/username/projects/container/compositeExec/tsconfig.json :: Config file name: /user/username/projects/container/tsconfig.json
Info 22   [00:01:36.000] Creating configuration project /user/username/projects/container/tsconfig.json
Info 23   [00:01:37.000] FileWatcher:: Added:: WatchInfo: /user/username/projects/container/tsconfig.json 2000 undefined Project: /user/username/projects/container/tsconfig.json WatchType: Config file
Info 24   [00:01:38.000] Search path: /user/username/projects/container
Info 25   [00:01:39.000] For info: /user/username/projects/container/tsconfig.json :: No config files found.
Info 26   [00:01:40.000] Project '/user/username/projects/container/compositeExec/tsconfig.json' (Configured)
Info 26   [00:01:41.000] 	Files (3)

Info 26   [00:01:42.000] -----------------------------------------------
Info 26   [00:01:43.000] Project '/user/username/projects/container/tsconfig.json' (Configured)
Info 26   [00:01:44.000] 	Files (0) InitialLoadPending

Info 26   [00:01:45.000] -----------------------------------------------
Info 26   [00:01:46.000] Open files: 
Info 26   [00:01:47.000] 	FileName: /user/username/projects/container/compositeExec/index.ts ProjectRootPath: undefined
Info 26   [00:01:48.000] 		Projects: /user/username/projects/container/compositeExec/tsconfig.json
After request

PolledWatches::
/user/username/projects/container/compositeexec/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/container/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/user/username/projects/container/compositeexec/tsconfig.json:
  {}
/user/username/projects/container/lib/tsconfig.json:
  {}
/user/username/projects/container/lib/index.ts:
  {}
/a/lib/lib.d.ts:
  {}
/user/username/projects/container/tsconfig.json:
  {}

FsWatchesRecursive::

Info 26   [00:01:49.000] response:
    {
      "responseRequired": false
    }
Info 27   [00:01:50.000] request:
    {
      "seq": 0,
      "type": "request",
      "command": "open",
      "arguments": {
        "file": "/user/username/projects/temp/temp.ts"
      }
    }
Before request

PolledWatches::
/user/username/projects/container/compositeexec/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/container/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/user/username/projects/container/compositeexec/tsconfig.json:
  {}
/user/username/projects/container/lib/tsconfig.json:
  {}
/user/username/projects/container/lib/index.ts:
  {}
/a/lib/lib.d.ts:
  {}
/user/username/projects/container/tsconfig.json:
  {}

FsWatchesRecursive::

Info 28   [00:01:51.000] Search path: /user/username/projects/temp
Info 29   [00:01:52.000] For info: /user/username/projects/temp/temp.ts :: No config files found.
Info 30   [00:01:53.000] FileWatcher:: Added:: WatchInfo: /user/username/projects/temp/tsconfig.json 2000 undefined WatchType: Config file for the inferred project root
Info 31   [00:01:54.000] FileWatcher:: Added:: WatchInfo: /user/username/projects/temp/jsconfig.json 2000 undefined WatchType: Config file for the inferred project root
Info 32   [00:01:55.000] Starting updateGraphWorker: Project: /dev/null/inferredProject1*
Info 33   [00:01:56.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/temp/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info 34   [00:01:57.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/temp/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info 35   [00:01:58.000] Finishing updateGraphWorker: Project: /dev/null/inferredProject1* Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 36   [00:01:59.000] Project '/dev/null/inferredProject1*' (Inferred)
Info 37   [00:02:00.000] 	Files (2)
	/a/lib/lib.d.ts
	/user/username/projects/temp/temp.ts


	../../../../a/lib/lib.d.ts
	  Default library for target 'es5'
	temp.ts
	  Root file specified for compilation

Info 38   [00:02:01.000] -----------------------------------------------
Info 39   [00:02:02.000] Project '/user/username/projects/container/compositeExec/tsconfig.json' (Configured)
Info 39   [00:02:03.000] 	Files (3)

Info 39   [00:02:04.000] -----------------------------------------------
Info 39   [00:02:05.000] Project '/user/username/projects/container/tsconfig.json' (Configured)
Info 39   [00:02:06.000] 	Files (0) InitialLoadPending

Info 39   [00:02:07.000] -----------------------------------------------
Info 39   [00:02:08.000] Project '/dev/null/inferredProject1*' (Inferred)
Info 39   [00:02:09.000] 	Files (2)

Info 39   [00:02:10.000] -----------------------------------------------
Info 39   [00:02:11.000] Open files: 
Info 39   [00:02:12.000] 	FileName: /user/username/projects/container/compositeExec/index.ts ProjectRootPath: undefined
Info 39   [00:02:13.000] 		Projects: /user/username/projects/container/compositeExec/tsconfig.json
Info 39   [00:02:14.000] 	FileName: /user/username/projects/temp/temp.ts ProjectRootPath: undefined
Info 39   [00:02:15.000] 		Projects: /dev/null/inferredProject1*
After request

PolledWatches::
/user/username/projects/container/compositeexec/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/container/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/temp/tsconfig.json:
  {"pollingInterval":2000}
/user/username/projects/temp/jsconfig.json:
  {"pollingInterval":2000}
/user/username/projects/temp/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/user/username/projects/container/compositeexec/tsconfig.json:
  {}
/user/username/projects/container/lib/tsconfig.json:
  {}
/user/username/projects/container/lib/index.ts:
  {}
/a/lib/lib.d.ts:
  {}
/user/username/projects/container/tsconfig.json:
  {}

FsWatchesRecursive::

Info 39   [00:02:16.000] response:
    {
      "responseRequired": false
    }
Info 40   [00:02:17.000] request:
    {
      "command": "rename",
      "arguments": {
        "file": "/user/username/projects/container/compositeExec/index.ts",
        "line": 3,
        "offset": 16
      },
      "seq": 1,
      "type": "request"
    }
Before request

PolledWatches::
/user/username/projects/container/compositeexec/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/container/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/temp/tsconfig.json:
  {"pollingInterval":2000}
/user/username/projects/temp/jsconfig.json:
  {"pollingInterval":2000}
/user/username/projects/temp/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/user/username/projects/container/compositeexec/tsconfig.json:
  {}
/user/username/projects/container/lib/tsconfig.json:
  {}
/user/username/projects/container/lib/index.ts:
  {}
/a/lib/lib.d.ts:
  {}
/user/username/projects/container/tsconfig.json:
  {}

FsWatchesRecursive::

Info 41   [00:02:18.000] Search path: /user/username/projects/container/lib
Info 42   [00:02:19.000] For info: /user/username/projects/container/lib/index.ts :: Config file name: /user/username/projects/container/lib/tsconfig.json
Info 43   [00:02:20.000] Creating configuration project /user/username/projects/container/lib/tsconfig.json
Info 44   [00:02:21.000] Starting updateGraphWorker: Project: /user/username/projects/container/lib/tsconfig.json
Info 45   [00:02:22.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/container/lib/node_modules/@types 1 undefined Project: /user/username/projects/container/lib/tsconfig.json WatchType: Type roots
Info 46   [00:02:23.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/container/lib/node_modules/@types 1 undefined Project: /user/username/projects/container/lib/tsconfig.json WatchType: Type roots
Info 47   [00:02:24.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/container/node_modules/@types 1 undefined Project: /user/username/projects/container/lib/tsconfig.json WatchType: Type roots
Info 48   [00:02:25.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/container/node_modules/@types 1 undefined Project: /user/username/projects/container/lib/tsconfig.json WatchType: Type roots
Info 49   [00:02:26.000] Finishing updateGraphWorker: Project: /user/username/projects/container/lib/tsconfig.json Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 50   [00:02:27.000] Project '/user/username/projects/container/lib/tsconfig.json' (Configured)
Info 51   [00:02:28.000] 	Files (2)
	/a/lib/lib.d.ts
	/user/username/projects/container/lib/index.ts


	../../../../../a/lib/lib.d.ts
	  Default library for target 'es3'
	index.ts
	  Part of 'files' list in tsconfig.json

Info 52   [00:02:29.000] -----------------------------------------------
Info 53   [00:02:30.000] Loading configured project /user/username/projects/container/tsconfig.json
Info 54   [00:02:31.000] Config: /user/username/projects/container/tsconfig.json : {
 "rootNames": [],
 "options": {
  "configFilePath": "/user/username/projects/container/tsconfig.json"
 },
 "projectReferences": [
  {
   "path": "/user/username/projects/container/exec",
   "originalPath": "./exec"
  },
  {
   "path": "/user/username/projects/container/compositeExec",
   "originalPath": "./compositeExec"
  }
 ]
}
Info 55   [00:02:32.000] Starting updateGraphWorker: Project: /user/username/projects/container/tsconfig.json
Info 56   [00:02:33.000] Config: /user/username/projects/container/exec/tsconfig.json : {
 "rootNames": [
  "/user/username/projects/container/exec/index.ts"
 ],
 "options": {
  "outFile": "/user/username/projects/container/built/local/exec.js",
  "configFilePath": "/user/username/projects/container/exec/tsconfig.json"
 },
 "projectReferences": [
  {
   "path": "/user/username/projects/container/lib",
   "originalPath": "../lib",
   "prepend": true
  }
 ]
}
Info 57   [00:02:34.000] FileWatcher:: Added:: WatchInfo: /user/username/projects/container/exec/tsconfig.json 2000 undefined Project: /user/username/projects/container/tsconfig.json WatchType: Config file
Info 58   [00:02:35.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/container/node_modules/@types 1 undefined Project: /user/username/projects/container/tsconfig.json WatchType: Type roots
Info 59   [00:02:36.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/container/node_modules/@types 1 undefined Project: /user/username/projects/container/tsconfig.json WatchType: Type roots
Info 60   [00:02:37.000] Finishing updateGraphWorker: Project: /user/username/projects/container/tsconfig.json Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 61   [00:02:38.000] Different program with same set of files
Info 62   [00:02:39.000] Creating configuration project /user/username/projects/container/exec/tsconfig.json
Info 63   [00:02:40.000] FileWatcher:: Added:: WatchInfo: /user/username/projects/container/exec/index.ts 500 undefined WatchType: Closed Script info
Info 64   [00:02:41.000] Starting updateGraphWorker: Project: /user/username/projects/container/exec/tsconfig.json
Info 65   [00:02:42.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/container/exec/node_modules/@types 1 undefined Project: /user/username/projects/container/exec/tsconfig.json WatchType: Type roots
Info 66   [00:02:43.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/container/exec/node_modules/@types 1 undefined Project: /user/username/projects/container/exec/tsconfig.json WatchType: Type roots
Info 67   [00:02:44.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/container/node_modules/@types 1 undefined Project: /user/username/projects/container/exec/tsconfig.json WatchType: Type roots
Info 68   [00:02:45.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/container/node_modules/@types 1 undefined Project: /user/username/projects/container/exec/tsconfig.json WatchType: Type roots
Info 69   [00:02:46.000] Finishing updateGraphWorker: Project: /user/username/projects/container/exec/tsconfig.json Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 70   [00:02:47.000] Project '/user/username/projects/container/exec/tsconfig.json' (Configured)
Info 71   [00:02:48.000] 	Files (3)
	/a/lib/lib.d.ts
	/user/username/projects/container/lib/index.ts
	/user/username/projects/container/exec/index.ts


	../../../../../a/lib/lib.d.ts
	  Default library for target 'es3'
	../lib/index.ts
	  Source from referenced project '../lib/tsconfig.json' included because '--outFile' specified
	index.ts
	  Part of 'files' list in tsconfig.json

Info 72   [00:02:49.000] -----------------------------------------------
Info 73   [00:02:50.000] Search path: /user/username/projects/container/lib
Info 74   [00:02:51.000] For info: /user/username/projects/container/lib/index.ts :: Config file name: /user/username/projects/container/lib/tsconfig.json
After request

PolledWatches::
/user/username/projects/container/compositeexec/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/container/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/temp/tsconfig.json:
  {"pollingInterval":2000}
/user/username/projects/temp/jsconfig.json:
  {"pollingInterval":2000}
/user/username/projects/temp/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/container/lib/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/container/exec/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/user/username/projects/container/compositeexec/tsconfig.json:
  {}
/user/username/projects/container/lib/tsconfig.json:
  {}
/user/username/projects/container/lib/index.ts:
  {}
/a/lib/lib.d.ts:
  {}
/user/username/projects/container/tsconfig.json:
  {}
/user/username/projects/container/exec/tsconfig.json:
  {}
/user/username/projects/container/exec/index.ts:
  {}

FsWatchesRecursive::

Info 75   [00:02:52.000] response:
    {
      "response": {
        "info": {
          "canRename": true,
          "displayName": "myConst",
          "fullDisplayName": "container.myConst",
          "kind": "const",
          "kindModifiers": "export",
          "triggerSpan": {
            "start": {
              "line": 3,
              "offset": 16
            },
            "end": {
              "line": 3,
              "offset": 23
            }
          }
        },
        "locs": [
          {
            "file": "/user/username/projects/container/lib/index.ts",
            "locs": [
              {
                "start": {
                  "line": 2,
                  "offset": 18
                },
                "end": {
                  "line": 2,
                  "offset": 25
                },
                "contextStart": {
                  "line": 2,
                  "offset": 5
                },
                "contextEnd": {
                  "line": 2,
                  "offset": 31
                }
              }
            ]
          },
          {
            "file": "/user/username/projects/container/compositeExec/index.ts",
            "locs": [
              {
                "start": {
                  "line": 3,
                  "offset": 16
                },
                "end": {
                  "line": 3,
                  "offset": 23
                }
              }
            ]
          },
          {
            "file": "/user/username/projects/container/exec/index.ts",
            "locs": [
              {
                "start": {
                  "line": 3,
                  "offset": 16
                },
                "end": {
                  "line": 3,
                  "offset": 23
                }
              }
            ]
          }
        ]
      },
      "responseRequired": true
    }
Info 76   [00:02:53.000] FileWatcher:: Close:: WatchInfo: /user/username/projects/temp/tsconfig.json 2000 undefined WatchType: Config file for the inferred project root
Info 77   [00:02:54.000] FileWatcher:: Close:: WatchInfo: /user/username/projects/temp/jsconfig.json 2000 undefined WatchType: Config file for the inferred project root
Info 78   [00:02:55.000] FileWatcher:: Added:: WatchInfo: /user/username/projects/temp/temp.ts 500 undefined WatchType: Closed Script info
Info 79   [00:02:56.000] Project '/user/username/projects/container/compositeExec/tsconfig.json' (Configured)
Info 79   [00:02:57.000] 	Files (3)

Info 79   [00:02:58.000] -----------------------------------------------
Info 79   [00:02:59.000] Project '/user/username/projects/container/tsconfig.json' (Configured)
Info 79   [00:03:00.000] 	Files (0)

Info 79   [00:03:01.000] -----------------------------------------------
Info 79   [00:03:02.000] Project '/user/username/projects/container/lib/tsconfig.json' (Configured)
Info 79   [00:03:03.000] 	Files (2)

Info 79   [00:03:04.000] -----------------------------------------------
Info 79   [00:03:05.000] Project '/user/username/projects/container/exec/tsconfig.json' (Configured)
Info 79   [00:03:06.000] 	Files (3)

Info 79   [00:03:07.000] -----------------------------------------------
Info 79   [00:03:08.000] Project '/dev/null/inferredProject1*' (Inferred)
Info 79   [00:03:09.000] 	Files (2)

Info 79   [00:03:10.000] -----------------------------------------------
Info 79   [00:03:11.000] Open files: 
Info 79   [00:03:12.000] 	FileName: /user/username/projects/container/compositeExec/index.ts ProjectRootPath: undefined
Info 79   [00:03:13.000] 		Projects: /user/username/projects/container/compositeExec/tsconfig.json
Info 79   [00:03:14.000] request:
    {
      "seq": 0,
      "type": "request",
      "command": "open",
      "arguments": {
        "file": "/user/username/projects/temp/temp.ts"
      }
    }
Before request

PolledWatches::
/user/username/projects/container/compositeexec/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/container/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/temp/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/container/lib/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/container/exec/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/user/username/projects/container/compositeexec/tsconfig.json:
  {}
/user/username/projects/container/lib/tsconfig.json:
  {}
/user/username/projects/container/lib/index.ts:
  {}
/a/lib/lib.d.ts:
  {}
/user/username/projects/container/tsconfig.json:
  {}
/user/username/projects/container/exec/tsconfig.json:
  {}
/user/username/projects/container/exec/index.ts:
  {}
/user/username/projects/temp/temp.ts:
  {}

FsWatchesRecursive::

Info 80   [00:03:15.000] FileWatcher:: Close:: WatchInfo: /user/username/projects/temp/temp.ts 500 undefined WatchType: Closed Script info
Info 81   [00:03:16.000] Search path: /user/username/projects/temp
Info 82   [00:03:17.000] For info: /user/username/projects/temp/temp.ts :: No config files found.
Info 83   [00:03:18.000] FileWatcher:: Added:: WatchInfo: /user/username/projects/temp/tsconfig.json 2000 undefined WatchType: Config file for the inferred project root
Info 84   [00:03:19.000] FileWatcher:: Added:: WatchInfo: /user/username/projects/temp/jsconfig.json 2000 undefined WatchType: Config file for the inferred project root
Info 85   [00:03:20.000] Starting updateGraphWorker: Project: /dev/null/inferredProject1*
Info 86   [00:03:21.000] Finishing updateGraphWorker: Project: /dev/null/inferredProject1* Version: 2 structureChanged: false structureIsReused:: Not Elapsed:: *ms
Info 87   [00:03:22.000] Project '/dev/null/inferredProject1*' (Inferred)
Info 88   [00:03:23.000] 	Files (2)
	/a/lib/lib.d.ts
	/user/username/projects/temp/temp.ts


	../../../../a/lib/lib.d.ts
	  Default library for target 'es5'
	temp.ts
	  Root file specified for compilation

Info 89   [00:03:24.000] -----------------------------------------------
Info 90   [00:03:25.000] Project '/user/username/projects/container/compositeExec/tsconfig.json' (Configured)
Info 90   [00:03:26.000] 	Files (3)

Info 90   [00:03:27.000] -----------------------------------------------
Info 90   [00:03:28.000] Project '/user/username/projects/container/tsconfig.json' (Configured)
Info 90   [00:03:29.000] 	Files (0)

Info 90   [00:03:30.000] -----------------------------------------------
Info 90   [00:03:31.000] Project '/user/username/projects/container/lib/tsconfig.json' (Configured)
Info 90   [00:03:32.000] 	Files (2)

Info 90   [00:03:33.000] -----------------------------------------------
Info 90   [00:03:34.000] Project '/user/username/projects/container/exec/tsconfig.json' (Configured)
Info 90   [00:03:35.000] 	Files (3)

Info 90   [00:03:36.000] -----------------------------------------------
Info 90   [00:03:37.000] Project '/dev/null/inferredProject1*' (Inferred)
Info 90   [00:03:38.000] 	Files (2)

Info 90   [00:03:39.000] -----------------------------------------------
Info 90   [00:03:40.000] Open files: 
Info 90   [00:03:41.000] 	FileName: /user/username/projects/container/compositeExec/index.ts ProjectRootPath: undefined
Info 90   [00:03:42.000] 		Projects: /user/username/projects/container/compositeExec/tsconfig.json
Info 90   [00:03:43.000] 	FileName: /user/username/projects/temp/temp.ts ProjectRootPath: undefined
Info 90   [00:03:44.000] 		Projects: /dev/null/inferredProject1*
After request

PolledWatches::
/user/username/projects/container/compositeexec/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/container/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/temp/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/container/lib/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/container/exec/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/temp/tsconfig.json:
  {"pollingInterval":2000}
/user/username/projects/temp/jsconfig.json:
  {"pollingInterval":2000}

FsWatches::
/user/username/projects/container/compositeexec/tsconfig.json:
  {}
/user/username/projects/container/lib/tsconfig.json:
  {}
/user/username/projects/container/lib/index.ts:
  {}
/a/lib/lib.d.ts:
  {}
/user/username/projects/container/tsconfig.json:
  {}
/user/username/projects/container/exec/tsconfig.json:
  {}
/user/username/projects/container/exec/index.ts:
  {}

FsWatchesRecursive::

Info 90   [00:03:45.000] response:
    {
      "responseRequired": false
    }
Info 91   [00:03:46.000] FileWatcher:: Added:: WatchInfo: /user/username/projects/container/compositeExec/index.ts 500 undefined WatchType: Closed Script info
Info 92   [00:03:47.000] Project '/user/username/projects/container/compositeExec/tsconfig.json' (Configured)
Info 92   [00:03:48.000] 	Files (3)

Info 92   [00:03:49.000] -----------------------------------------------
Info 92   [00:03:50.000] Project '/user/username/projects/container/tsconfig.json' (Configured)
Info 92   [00:03:51.000] 	Files (0)

Info 92   [00:03:52.000] -----------------------------------------------
Info 92   [00:03:53.000] Project '/user/username/projects/container/lib/tsconfig.json' (Configured)
Info 92   [00:03:54.000] 	Files (2)

Info 92   [00:03:55.000] -----------------------------------------------
Info 92   [00:03:56.000] Project '/user/username/projects/container/exec/tsconfig.json' (Configured)
Info 92   [00:03:57.000] 	Files (3)

Info 92   [00:03:58.000] -----------------------------------------------
Info 92   [00:03:59.000] Project '/dev/null/inferredProject1*' (Inferred)
Info 92   [00:04:00.000] 	Files (2)

Info 92   [00:04:01.000] -----------------------------------------------
Info 92   [00:04:02.000] Open files: 
Info 92   [00:04:03.000] 	FileName: /user/username/projects/temp/temp.ts ProjectRootPath: undefined
Info 92   [00:04:04.000] 		Projects: /dev/null/inferredProject1*
Info 92   [00:04:05.000] FileWatcher:: Close:: WatchInfo: /user/username/projects/temp/tsconfig.json 2000 undefined WatchType: Config file for the inferred project root
Info 93   [00:04:06.000] FileWatcher:: Close:: WatchInfo: /user/username/projects/temp/jsconfig.json 2000 undefined WatchType: Config file for the inferred project root
Info 94   [00:04:07.000] FileWatcher:: Added:: WatchInfo: /user/username/projects/temp/temp.ts 500 undefined WatchType: Closed Script info
Info 95   [00:04:08.000] Project '/user/username/projects/container/compositeExec/tsconfig.json' (Configured)
Info 95   [00:04:09.000] 	Files (3)

Info 95   [00:04:10.000] -----------------------------------------------
Info 95   [00:04:11.000] Project '/user/username/projects/container/tsconfig.json' (Configured)
Info 95   [00:04:12.000] 	Files (0)

Info 95   [00:04:13.000] -----------------------------------------------
Info 95   [00:04:14.000] Project '/user/username/projects/container/lib/tsconfig.json' (Configured)
Info 95   [00:04:15.000] 	Files (2)

Info 95   [00:04:16.000] -----------------------------------------------
Info 95   [00:04:17.000] Project '/user/username/projects/container/exec/tsconfig.json' (Configured)
Info 95   [00:04:18.000] 	Files (3)

Info 95   [00:04:19.000] -----------------------------------------------
Info 95   [00:04:20.000] Project '/dev/null/inferredProject1*' (Inferred)
Info 95   [00:04:21.000] 	Files (2)

Info 95   [00:04:22.000] -----------------------------------------------
Info 95   [00:04:23.000] Open files: 
Info 95   [00:04:24.000] request:
    {
      "seq": 0,
      "type": "request",
      "command": "open",
      "arguments": {
        "file": "/user/username/projects/temp/temp.ts"
      }
    }
Before request

PolledWatches::
/user/username/projects/container/compositeexec/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/container/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/temp/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/container/lib/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/container/exec/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/user/username/projects/container/compositeexec/tsconfig.json:
  {}
/user/username/projects/container/lib/tsconfig.json:
  {}
/user/username/projects/container/lib/index.ts:
  {}
/a/lib/lib.d.ts:
  {}
/user/username/projects/container/tsconfig.json:
  {}
/user/username/projects/container/exec/tsconfig.json:
  {}
/user/username/projects/container/exec/index.ts:
  {}
/user/username/projects/container/compositeexec/index.ts:
  {}
/user/username/projects/temp/temp.ts:
  {}

FsWatchesRecursive::

Info 96   [00:04:25.000] FileWatcher:: Close:: WatchInfo: /user/username/projects/temp/temp.ts 500 undefined WatchType: Closed Script info
Info 97   [00:04:26.000] Search path: /user/username/projects/temp
Info 98   [00:04:27.000] For info: /user/username/projects/temp/temp.ts :: No config files found.
Info 99   [00:04:28.000] FileWatcher:: Added:: WatchInfo: /user/username/projects/temp/tsconfig.json 2000 undefined WatchType: Config file for the inferred project root
Info 100  [00:04:29.000] FileWatcher:: Added:: WatchInfo: /user/username/projects/temp/jsconfig.json 2000 undefined WatchType: Config file for the inferred project root
Info 101  [00:04:30.000] Starting updateGraphWorker: Project: /dev/null/inferredProject1*
Info 102  [00:04:31.000] Finishing updateGraphWorker: Project: /dev/null/inferredProject1* Version: 3 structureChanged: false structureIsReused:: Not Elapsed:: *ms
Info 103  [00:04:32.000] Project '/dev/null/inferredProject1*' (Inferred)
Info 104  [00:04:33.000] 	Files (2)
	/a/lib/lib.d.ts
	/user/username/projects/temp/temp.ts


	../../../../a/lib/lib.d.ts
	  Default library for target 'es5'
	temp.ts
	  Root file specified for compilation

Info 105  [00:04:34.000] -----------------------------------------------
Info 106  [00:04:35.000] `remove Project::
Info 107  [00:04:36.000] Project '/user/username/projects/container/compositeExec/tsconfig.json' (Configured)
Info 108  [00:04:37.000] 	Files (3)
	/a/lib/lib.d.ts
	/user/username/projects/container/lib/index.ts
	/user/username/projects/container/compositeExec/index.ts


	../../../../../a/lib/lib.d.ts
	  Default library for target 'es3'
	../lib/index.ts
	  Source from referenced project '../lib/tsconfig.json' included because '--outFile' specified
	index.ts
	  Part of 'files' list in tsconfig.json

Info 109  [00:04:38.000] -----------------------------------------------
Info 110  [00:04:39.000] DirectoryWatcher:: Close:: WatchInfo: /user/username/projects/container/compositeExec/node_modules/@types 1 undefined Project: /user/username/projects/container/compositeExec/tsconfig.json WatchType: Type roots
Info 111  [00:04:40.000] Elapsed:: *ms DirectoryWatcher:: Close:: WatchInfo: /user/username/projects/container/compositeExec/node_modules/@types 1 undefined Project: /user/username/projects/container/compositeExec/tsconfig.json WatchType: Type roots
Info 112  [00:04:41.000] DirectoryWatcher:: Close:: WatchInfo: /user/username/projects/container/node_modules/@types 1 undefined Project: /user/username/projects/container/compositeExec/tsconfig.json WatchType: Type roots
Info 113  [00:04:42.000] Elapsed:: *ms DirectoryWatcher:: Close:: WatchInfo: /user/username/projects/container/node_modules/@types 1 undefined Project: /user/username/projects/container/compositeExec/tsconfig.json WatchType: Type roots
Info 114  [00:04:43.000] `remove Project::
Info 115  [00:04:44.000] Project '/user/username/projects/container/tsconfig.json' (Configured)
Info 116  [00:04:45.000] 	Files (0)



Info 117  [00:04:46.000] -----------------------------------------------
Info 118  [00:04:47.000] FileWatcher:: Close:: WatchInfo: /user/username/projects/container/compositeExec/tsconfig.json 2000 undefined Project: /user/username/projects/container/compositeExec/tsconfig.json WatchType: Config file
Info 119  [00:04:48.000] FileWatcher:: Close:: WatchInfo: /user/username/projects/container/tsconfig.json 2000 undefined Project: /user/username/projects/container/tsconfig.json WatchType: Config file
Info 120  [00:04:49.000] DirectoryWatcher:: Close:: WatchInfo: /user/username/projects/container/node_modules/@types 1 undefined Project: /user/username/projects/container/tsconfig.json WatchType: Type roots
Info 121  [00:04:50.000] Elapsed:: *ms DirectoryWatcher:: Close:: WatchInfo: /user/username/projects/container/node_modules/@types 1 undefined Project: /user/username/projects/container/tsconfig.json WatchType: Type roots
Info 122  [00:04:51.000] `remove Project::
Info 123  [00:04:52.000] Project '/user/username/projects/container/lib/tsconfig.json' (Configured)
Info 124  [00:04:53.000] 	Files (2)
	/a/lib/lib.d.ts
	/user/username/projects/container/lib/index.ts


	../../../../../a/lib/lib.d.ts
	  Default library for target 'es3'
	index.ts
	  Part of 'files' list in tsconfig.json

Info 125  [00:04:54.000] -----------------------------------------------
Info 126  [00:04:55.000] DirectoryWatcher:: Close:: WatchInfo: /user/username/projects/container/lib/node_modules/@types 1 undefined Project: /user/username/projects/container/lib/tsconfig.json WatchType: Type roots
Info 127  [00:04:56.000] Elapsed:: *ms DirectoryWatcher:: Close:: WatchInfo: /user/username/projects/container/lib/node_modules/@types 1 undefined Project: /user/username/projects/container/lib/tsconfig.json WatchType: Type roots
Info 128  [00:04:57.000] DirectoryWatcher:: Close:: WatchInfo: /user/username/projects/container/node_modules/@types 1 undefined Project: /user/username/projects/container/lib/tsconfig.json WatchType: Type roots
Info 129  [00:04:58.000] Elapsed:: *ms DirectoryWatcher:: Close:: WatchInfo: /user/username/projects/container/node_modules/@types 1 undefined Project: /user/username/projects/container/lib/tsconfig.json WatchType: Type roots
Info 130  [00:04:59.000] `remove Project::
Info 131  [00:05:00.000] Project '/user/username/projects/container/exec/tsconfig.json' (Configured)
Info 132  [00:05:01.000] 	Files (3)
	/a/lib/lib.d.ts
	/user/username/projects/container/lib/index.ts
	/user/username/projects/container/exec/index.ts


	../../../../../a/lib/lib.d.ts
	  Default library for target 'es3'
	../lib/index.ts
	  Source from referenced project '../lib/tsconfig.json' included because '--outFile' specified
	index.ts
	  Part of 'files' list in tsconfig.json

Info 133  [00:05:02.000] -----------------------------------------------
Info 134  [00:05:03.000] FileWatcher:: Close:: WatchInfo: /user/username/projects/container/lib/tsconfig.json 2000 undefined Project: /user/username/projects/container/compositeExec/tsconfig.json WatchType: Config file
Info 135  [00:05:04.000] FileWatcher:: Close:: WatchInfo: /user/username/projects/container/exec/tsconfig.json 2000 undefined Project: /user/username/projects/container/tsconfig.json WatchType: Config file
Info 136  [00:05:05.000] DirectoryWatcher:: Close:: WatchInfo: /user/username/projects/container/exec/node_modules/@types 1 undefined Project: /user/username/projects/container/exec/tsconfig.json WatchType: Type roots
Info 137  [00:05:06.000] Elapsed:: *ms DirectoryWatcher:: Close:: WatchInfo: /user/username/projects/container/exec/node_modules/@types 1 undefined Project: /user/username/projects/container/exec/tsconfig.json WatchType: Type roots
Info 138  [00:05:07.000] DirectoryWatcher:: Close:: WatchInfo: /user/username/projects/container/node_modules/@types 1 undefined Project: /user/username/projects/container/exec/tsconfig.json WatchType: Type roots
Info 139  [00:05:08.000] Elapsed:: *ms DirectoryWatcher:: Close:: WatchInfo: /user/username/projects/container/node_modules/@types 1 undefined Project: /user/username/projects/container/exec/tsconfig.json WatchType: Type roots
Info 140  [00:05:09.000] FileWatcher:: Close:: WatchInfo: /user/username/projects/container/compositeExec/index.ts 500 undefined WatchType: Closed Script info
Info 141  [00:05:10.000] FileWatcher:: Close:: WatchInfo: /user/username/projects/container/lib/index.ts 500 undefined WatchType: Closed Script info
Info 142  [00:05:11.000] FileWatcher:: Close:: WatchInfo: /user/username/projects/container/exec/index.ts 500 undefined WatchType: Closed Script info
Info 143  [00:05:12.000] Project '/dev/null/inferredProject1*' (Inferred)
Info 143  [00:05:13.000] 	Files (2)

Info 143  [00:05:14.000] -----------------------------------------------
Info 143  [00:05:15.000] Open files: 
Info 143  [00:05:16.000] 	FileName: /user/username/projects/temp/temp.ts ProjectRootPath: undefined
Info 143  [00:05:17.000] 		Projects: /dev/null/inferredProject1*
After request

PolledWatches::
/user/username/projects/temp/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/temp/tsconfig.json:
  {"pollingInterval":2000}
/user/username/projects/temp/jsconfig.json:
  {"pollingInterval":2000}

FsWatches::
/a/lib/lib.d.ts:
  {}

FsWatchesRecursive::

Info 143  [00:05:18.000] response:
    {
      "responseRequired": false
    }