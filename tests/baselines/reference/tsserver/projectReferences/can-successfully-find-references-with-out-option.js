Info 0    [00:01:10.000] Provided types map file "/a/lib/typesMap.json" doesn't exist
Info 1    [00:01:11.000] request:
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
{"bundle":{"commonSourceDirectory":"../../lib","sourceFiles":["../../lib/index.ts"],"js":{"sections":[{"pos":0,"end":102,"kind":"text"}],"hash":"-5780640416-var container;\n(function (container) {\n    container.myConst = 30;\n})(container || (container = {}));\n"},"dts":{"sections":[{"pos":0,"end":56,"kind":"text"}],"mapHash":"-12950023432-{\"version\":3,\"file\":\"lib.d.ts\",\"sourceRoot\":\"\",\"sources\":[\"../../lib/index.ts\"],\"names\":[],\"mappings\":\"AAAA,kBAAU,SAAS,CAAC;IACT,MAAM,OAAO,KAAK,CAAC;CAC7B\"}","hash":"-3233313694-declare namespace container {\n    const myConst = 30;\n}\n//# sourceMappingURL=lib.d.ts.map"}},"program":{"fileNames":["../../lib/index.ts"],"fileInfos":["-7311945748-namespace container {\r\n    export const myConst = 30;\r\n}"],"options":{"composite":true,"outFile":"./lib.js"},"outSignature":"4250822250-declare namespace container {\n    const myConst = 30;\n}\n","latestChangedDtsFile":"./lib.d.ts"},"version":"FakeTSVersion"}

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
      "../../lib/index.ts"
    ],
    "fileInfos": {
      "../../lib/index.ts": "-7311945748-namespace container {\r\n    export const myConst = 30;\r\n}"
    },
    "options": {
      "composite": true,
      "outFile": "./lib.js"
    },
    "outSignature": "4250822250-declare namespace container {\n    const myConst = 30;\n}\n",
    "latestChangedDtsFile": "./lib.d.ts"
  },
  "version": "FakeTSVersion",
  "size": 973
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
{"bundle":{"commonSourceDirectory":"../../compositeExec","sourceFiles":["../../compositeExec/index.ts"],"js":{"sections":[{"pos":0,"end":102,"kind":"prepend","data":"./lib.js","texts":[{"pos":0,"end":102,"kind":"text"}]},{"pos":102,"end":283,"kind":"text"}],"hash":"-2184050024-var container;\n(function (container) {\n    container.myConst = 30;\n})(container || (container = {}));\nvar container;\n(function (container) {\n    function getMyConst() {\n        return container.myConst;\n    }\n    container.getMyConst = getMyConst;\n})(container || (container = {}));\n"},"dts":{"sections":[{"pos":0,"end":56,"kind":"prepend","data":"./lib.d.ts","texts":[{"pos":0,"end":56,"kind":"text"}]},{"pos":56,"end":123,"kind":"text"}],"mapHash":"25748245913-{\"version\":3,\"file\":\"compositeExec.d.ts\",\"sourceRoot\":\"\",\"sources\":[\"../../lib/index.ts\",\"../../compositeExec/index.ts\"],\"names\":[],\"mappings\":\"AAAA,kBAAU,SAAS,CAAC;IACT,MAAM,OAAO,KAAK,CAAC;CAC7B;ACFD,kBAAU,SAAS,CAAC;IAChB,SAAgB,UAAU,WAEzB;CACJ\"}","hash":"862035579-declare namespace container {\n    const myConst = 30;\n}\ndeclare namespace container {\n    function getMyConst(): number;\n}\n//# sourceMappingURL=compositeExec.d.ts.map"}},"program":{"fileNames":["../../compositeexec/index.ts"],"fileInfos":["-6143734929-namespace container {\r\n    export function getMyConst() {\r\n        return myConst;\r\n    }\r\n}"],"options":{"composite":true,"outFile":"./compositeExec.js"},"outSignature":"5987946274-declare namespace container {\n    const myConst = 30;\n}\ndeclare namespace container {\n    function getMyConst(): number;\n}\n","latestChangedDtsFile":"./compositeExec.d.ts"},"version":"FakeTSVersion"}

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
      "../../compositeexec/index.ts"
    ],
    "fileInfos": {
      "../../compositeexec/index.ts": "-6143734929-namespace container {\r\n    export function getMyConst() {\r\n        return myConst;\r\n    }\r\n}"
    },
    "options": {
      "composite": true,
      "outFile": "./compositeExec.js"
    },
    "outSignature": "5987946274-declare namespace container {\n    const myConst = 30;\n}\ndeclare namespace container {\n    function getMyConst(): number;\n}\n",
    "latestChangedDtsFile": "./compositeExec.d.ts"
  },
  "version": "FakeTSVersion",
  "size": 1692
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

Info 2    [00:01:12.000] Search path: /user/username/projects/container/compositeExec
Info 3    [00:01:13.000] For info: /user/username/projects/container/compositeExec/index.ts :: Config file name: /user/username/projects/container/compositeExec/tsconfig.json
Info 4    [00:01:14.000] Creating configuration project /user/username/projects/container/compositeExec/tsconfig.json
Info 5    [00:01:15.000] FileWatcher:: Added:: WatchInfo: /user/username/projects/container/compositeExec/tsconfig.json 2000 undefined Project: /user/username/projects/container/compositeExec/tsconfig.json WatchType: Config file
Info 6    [00:01:16.000] Config: /user/username/projects/container/compositeExec/tsconfig.json : {
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
Info 7    [00:01:17.000] Plugins were requested but not running in environment that supports 'require'. Nothing will be loaded
Info 8    [00:01:18.000] Starting updateGraphWorker: Project: /user/username/projects/container/compositeExec/tsconfig.json
Info 9    [00:01:19.000] Config: /user/username/projects/container/lib/tsconfig.json : {
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
Info 10   [00:01:20.000] FileWatcher:: Added:: WatchInfo: /user/username/projects/container/lib/tsconfig.json 2000 undefined Project: /user/username/projects/container/compositeExec/tsconfig.json WatchType: Config file
Info 11   [00:01:21.000] FileWatcher:: Added:: WatchInfo: /user/username/projects/container/lib/index.ts 500 undefined WatchType: Closed Script info
Info 12   [00:01:22.000] FileWatcher:: Added:: WatchInfo: /a/lib/lib.d.ts 500 undefined WatchType: Closed Script info
Info 13   [00:01:23.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/container/compositeExec/node_modules/@types 1 undefined Project: /user/username/projects/container/compositeExec/tsconfig.json WatchType: Type roots
Info 14   [00:01:24.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/container/compositeExec/node_modules/@types 1 undefined Project: /user/username/projects/container/compositeExec/tsconfig.json WatchType: Type roots
Info 15   [00:01:25.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/container/node_modules/@types 1 undefined Project: /user/username/projects/container/compositeExec/tsconfig.json WatchType: Type roots
Info 16   [00:01:26.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/container/node_modules/@types 1 undefined Project: /user/username/projects/container/compositeExec/tsconfig.json WatchType: Type roots
Info 17   [00:01:27.000] Finishing updateGraphWorker: Project: /user/username/projects/container/compositeExec/tsconfig.json Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 18   [00:01:28.000] Project '/user/username/projects/container/compositeExec/tsconfig.json' (Configured)
Info 19   [00:01:29.000] 	Files (3)
	/a/lib/lib.d.ts
	/user/username/projects/container/lib/index.ts
	/user/username/projects/container/compositeExec/index.ts


	../../../../../a/lib/lib.d.ts
	  Default library for target 'es3'
	../lib/index.ts
	  Source from referenced project '../lib/tsconfig.json' included because '--outFile' specified
	index.ts
	  Part of 'files' list in tsconfig.json

Info 20   [00:01:30.000] -----------------------------------------------
Info 21   [00:01:31.000] Search path: /user/username/projects/container/compositeExec
Info 22   [00:01:32.000] For info: /user/username/projects/container/compositeExec/tsconfig.json :: Config file name: /user/username/projects/container/tsconfig.json
Info 23   [00:01:33.000] Creating configuration project /user/username/projects/container/tsconfig.json
Info 24   [00:01:34.000] FileWatcher:: Added:: WatchInfo: /user/username/projects/container/tsconfig.json 2000 undefined Project: /user/username/projects/container/tsconfig.json WatchType: Config file
Info 25   [00:01:35.000] Search path: /user/username/projects/container
Info 26   [00:01:36.000] For info: /user/username/projects/container/tsconfig.json :: No config files found.
Info 27   [00:01:37.000] Project '/user/username/projects/container/compositeExec/tsconfig.json' (Configured)
Info 27   [00:01:38.000] 	Files (3)

Info 27   [00:01:39.000] -----------------------------------------------
Info 27   [00:01:40.000] Project '/user/username/projects/container/tsconfig.json' (Configured)
Info 27   [00:01:41.000] 	Files (0) InitialLoadPending

Info 27   [00:01:42.000] -----------------------------------------------
Info 27   [00:01:43.000] Open files: 
Info 27   [00:01:44.000] 	FileName: /user/username/projects/container/compositeExec/index.ts ProjectRootPath: undefined
Info 27   [00:01:45.000] 		Projects: /user/username/projects/container/compositeExec/tsconfig.json
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

Info 27   [00:01:46.000] response:
    {
      "responseRequired": false
    }
Info 28   [00:01:47.000] request:
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

Info 29   [00:01:48.000] Search path: /user/username/projects/container/lib
Info 30   [00:01:49.000] For info: /user/username/projects/container/lib/index.ts :: Config file name: /user/username/projects/container/lib/tsconfig.json
Info 31   [00:01:50.000] Creating configuration project /user/username/projects/container/lib/tsconfig.json
Info 32   [00:01:51.000] Plugins were requested but not running in environment that supports 'require'. Nothing will be loaded
Info 33   [00:01:52.000] Starting updateGraphWorker: Project: /user/username/projects/container/lib/tsconfig.json
Info 34   [00:01:53.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/container/lib/node_modules/@types 1 undefined Project: /user/username/projects/container/lib/tsconfig.json WatchType: Type roots
Info 35   [00:01:54.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/container/lib/node_modules/@types 1 undefined Project: /user/username/projects/container/lib/tsconfig.json WatchType: Type roots
Info 36   [00:01:55.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/container/node_modules/@types 1 undefined Project: /user/username/projects/container/lib/tsconfig.json WatchType: Type roots
Info 37   [00:01:56.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/container/node_modules/@types 1 undefined Project: /user/username/projects/container/lib/tsconfig.json WatchType: Type roots
Info 38   [00:01:57.000] Finishing updateGraphWorker: Project: /user/username/projects/container/lib/tsconfig.json Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 39   [00:01:58.000] Project '/user/username/projects/container/lib/tsconfig.json' (Configured)
Info 40   [00:01:59.000] 	Files (2)
	/a/lib/lib.d.ts
	/user/username/projects/container/lib/index.ts


	../../../../../a/lib/lib.d.ts
	  Default library for target 'es3'
	index.ts
	  Part of 'files' list in tsconfig.json

Info 41   [00:02:00.000] -----------------------------------------------
Info 42   [00:02:01.000] Loading configured project /user/username/projects/container/tsconfig.json
Info 43   [00:02:02.000] Config: /user/username/projects/container/tsconfig.json : {
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
Info 44   [00:02:03.000] Plugins were requested but not running in environment that supports 'require'. Nothing will be loaded
Info 45   [00:02:04.000] Starting updateGraphWorker: Project: /user/username/projects/container/tsconfig.json
Info 46   [00:02:05.000] Config: /user/username/projects/container/exec/tsconfig.json : {
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
Info 47   [00:02:06.000] FileWatcher:: Added:: WatchInfo: /user/username/projects/container/exec/tsconfig.json 2000 undefined Project: /user/username/projects/container/tsconfig.json WatchType: Config file
Info 48   [00:02:07.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/container/node_modules/@types 1 undefined Project: /user/username/projects/container/tsconfig.json WatchType: Type roots
Info 49   [00:02:08.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/container/node_modules/@types 1 undefined Project: /user/username/projects/container/tsconfig.json WatchType: Type roots
Info 50   [00:02:09.000] Finishing updateGraphWorker: Project: /user/username/projects/container/tsconfig.json Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 51   [00:02:10.000] Different program with same set of files
Info 52   [00:02:11.000] Creating configuration project /user/username/projects/container/exec/tsconfig.json
Info 53   [00:02:12.000] Plugins were requested but not running in environment that supports 'require'. Nothing will be loaded
Info 54   [00:02:13.000] FileWatcher:: Added:: WatchInfo: /user/username/projects/container/exec/index.ts 500 undefined WatchType: Closed Script info
Info 55   [00:02:14.000] Starting updateGraphWorker: Project: /user/username/projects/container/exec/tsconfig.json
Info 56   [00:02:15.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/container/exec/node_modules/@types 1 undefined Project: /user/username/projects/container/exec/tsconfig.json WatchType: Type roots
Info 57   [00:02:16.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/container/exec/node_modules/@types 1 undefined Project: /user/username/projects/container/exec/tsconfig.json WatchType: Type roots
Info 58   [00:02:17.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/container/node_modules/@types 1 undefined Project: /user/username/projects/container/exec/tsconfig.json WatchType: Type roots
Info 59   [00:02:18.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/container/node_modules/@types 1 undefined Project: /user/username/projects/container/exec/tsconfig.json WatchType: Type roots
Info 60   [00:02:19.000] Finishing updateGraphWorker: Project: /user/username/projects/container/exec/tsconfig.json Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 61   [00:02:20.000] Project '/user/username/projects/container/exec/tsconfig.json' (Configured)
Info 62   [00:02:21.000] 	Files (3)
	/a/lib/lib.d.ts
	/user/username/projects/container/lib/index.ts
	/user/username/projects/container/exec/index.ts


	../../../../../a/lib/lib.d.ts
	  Default library for target 'es3'
	../lib/index.ts
	  Source from referenced project '../lib/tsconfig.json' included because '--outFile' specified
	index.ts
	  Part of 'files' list in tsconfig.json

Info 63   [00:02:22.000] -----------------------------------------------
Info 64   [00:02:23.000] Search path: /user/username/projects/container/lib
Info 65   [00:02:24.000] For info: /user/username/projects/container/lib/index.ts :: Config file name: /user/username/projects/container/lib/tsconfig.json
After request

PolledWatches::
/user/username/projects/container/compositeexec/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/container/node_modules/@types:
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

Info 66   [00:02:25.000] response:
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