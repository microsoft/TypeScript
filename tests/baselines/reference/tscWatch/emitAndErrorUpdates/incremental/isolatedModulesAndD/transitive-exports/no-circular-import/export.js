Input::
//// [/user/username/projects/myproject/lib1/tools/tools.interface.ts]
export interface ITest {
    title: string;
}

//// [/user/username/projects/myproject/lib1/tools/public.ts]
export * from "./tools.interface";

//// [/user/username/projects/myproject/app.ts]
import { Data } from "lib2/public";
export class App {
    public constructor() {
        new Data().test();
    }
}

//// [/user/username/projects/myproject/lib2/public.ts]
export * from "./data";

//// [/user/username/projects/myproject/lib1/public.ts]
export * from "./tools/public";

//// [/user/username/projects/myproject/lib2/data.ts]
import { ITest } from "lib1/public";
export class Data {
    public test() {
        const result: ITest = {
            title: "title"
        }
        return result;
    }
}

//// [/user/username/projects/myproject/tsconfig.json]
{"files":["app.ts"],"compilerOptions":{"baseUrl":".","isolatedModules":true,"declaration":true}}

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


/a/lib/tsc.js --w --i
Output::
>> Screen clear
[[90m12:00:37 AM[0m] Starting compilation in watch mode...

[[90m12:01:04 AM[0m] Found 0 errors. Watching for file changes.



Program root files: ["/user/username/projects/myproject/app.ts"]
Program options: {"baseUrl":"/user/username/projects/myproject","isolatedModules":true,"declaration":true,"watch":true,"incremental":true,"configFilePath":"/user/username/projects/myproject/tsconfig.json"}
Program structureReused: Not
Program files::
/a/lib/lib.d.ts
/user/username/projects/myproject/lib1/tools/tools.interface.ts
/user/username/projects/myproject/lib1/tools/public.ts
/user/username/projects/myproject/lib1/public.ts
/user/username/projects/myproject/lib2/data.ts
/user/username/projects/myproject/lib2/public.ts
/user/username/projects/myproject/app.ts

Semantic diagnostics in builder refreshed for::
/a/lib/lib.d.ts
/user/username/projects/myproject/lib1/tools/tools.interface.ts
/user/username/projects/myproject/lib1/tools/public.ts
/user/username/projects/myproject/lib1/public.ts
/user/username/projects/myproject/lib2/data.ts
/user/username/projects/myproject/lib2/public.ts
/user/username/projects/myproject/app.ts

Shape signatures in builder refreshed for::
/a/lib/lib.d.ts (used version)
/user/username/projects/myproject/lib1/tools/tools.interface.ts (used version)
/user/username/projects/myproject/lib1/tools/public.ts (used version)
/user/username/projects/myproject/lib1/public.ts (used version)
/user/username/projects/myproject/lib2/data.ts (used version)
/user/username/projects/myproject/lib2/public.ts (used version)
/user/username/projects/myproject/app.ts (used version)

WatchedFiles::
/user/username/projects/myproject/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/app.ts:
  {"fileName":"/user/username/projects/myproject/app.ts","pollingInterval":250}
/user/username/projects/myproject/lib2/public.ts:
  {"fileName":"/user/username/projects/myproject/lib2/public.ts","pollingInterval":250}
/user/username/projects/myproject/lib2/data.ts:
  {"fileName":"/user/username/projects/myproject/lib2/data.ts","pollingInterval":250}
/user/username/projects/myproject/lib1/public.ts:
  {"fileName":"/user/username/projects/myproject/lib1/public.ts","pollingInterval":250}
/user/username/projects/myproject/lib1/tools/public.ts:
  {"fileName":"/user/username/projects/myproject/lib1/tools/public.ts","pollingInterval":250}
/user/username/projects/myproject/lib1/tools/tools.interface.ts:
  {"fileName":"/user/username/projects/myproject/lib1/tools/tools.interface.ts","pollingInterval":250}
/a/lib/lib.d.ts:
  {"fileName":"/a/lib/lib.d.ts","pollingInterval":250}

FsWatches::

FsWatchesRecursive::
/user/username/projects/myproject/node_modules/@types:
  {"directoryName":"/user/username/projects/myproject/node_modules/@types","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}

exitCode:: ExitStatus.undefined

//// [/user/username/projects/myproject/lib1/tools/tools.interface.js]
"use strict";
exports.__esModule = true;


//// [/user/username/projects/myproject/lib1/tools/tools.interface.d.ts]
export interface ITest {
    title: string;
}


//// [/user/username/projects/myproject/lib1/tools/public.js]
"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
exports.__esModule = true;
__exportStar(require("./tools.interface"), exports);


//// [/user/username/projects/myproject/lib1/tools/public.d.ts]
export * from "./tools.interface";


//// [/user/username/projects/myproject/lib1/public.js]
"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
exports.__esModule = true;
__exportStar(require("./tools/public"), exports);


//// [/user/username/projects/myproject/lib1/public.d.ts]
export * from "./tools/public";


//// [/user/username/projects/myproject/lib2/data.js]
"use strict";
exports.__esModule = true;
exports.Data = void 0;
var Data = /** @class */ (function () {
    function Data() {
    }
    Data.prototype.test = function () {
        var result = {
            title: "title"
        };
        return result;
    };
    return Data;
}());
exports.Data = Data;


//// [/user/username/projects/myproject/lib2/data.d.ts]
import { ITest } from "lib1/public";
export declare class Data {
    test(): ITest;
}


//// [/user/username/projects/myproject/lib2/public.js]
"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
exports.__esModule = true;
__exportStar(require("./data"), exports);


//// [/user/username/projects/myproject/lib2/public.d.ts]
export * from "./data";


//// [/user/username/projects/myproject/app.js]
"use strict";
exports.__esModule = true;
exports.App = void 0;
var public_1 = require("lib2/public");
var App = /** @class */ (function () {
    function App() {
        new public_1.Data().test();
    }
    return App;
}());
exports.App = App;


//// [/user/username/projects/myproject/app.d.ts]
export declare class App {
    constructor();
}


//// [/user/username/projects/myproject/tsconfig.tsbuildinfo]
{"program":{"fileNames":["../../../../a/lib/lib.d.ts","./lib1/tools/tools.interface.ts","./lib1/tools/public.ts","./lib1/public.ts","./lib2/data.ts","./lib2/public.ts","./app.ts"],"fileInfos":[{"version":"-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }","affectsGlobalScope":true},"-4369626085-export interface ITest {\n    title: string;\n}","-13301115055-export * from \"./tools.interface\";","-5078933600-export * from \"./tools/public\";","-30573389178-import { ITest } from \"lib1/public\";\nexport class Data {\n    public test() {\n        const result: ITest = {\n            title: \"title\"\n        }\n        return result;\n    }\n}","-9530042629-export * from \"./data\";","-14937286564-import { Data } from \"lib2/public\";\nexport class App {\n    public constructor() {\n        new Data().test();\n    }\n}"],"options":{"declaration":true},"fileIdsList":[[6],[3],[2],[4],[5]],"referencedMap":[[7,1],[4,2],[3,3],[5,4],[6,5]],"exportedModulesMap":[[7,1],[4,2],[3,3],[5,4],[6,5]],"semanticDiagnosticsPerFile":[1,7,4,3,2,5,6]},"version":"FakeTSVersion"}

//// [/user/username/projects/myproject/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "program": {
    "fileNames": [
      "../../../../a/lib/lib.d.ts",
      "./lib1/tools/tools.interface.ts",
      "./lib1/tools/public.ts",
      "./lib1/public.ts",
      "./lib2/data.ts",
      "./lib2/public.ts",
      "./app.ts"
    ],
    "fileNamesList": [
      [
        "./lib2/public.ts"
      ],
      [
        "./lib1/tools/public.ts"
      ],
      [
        "./lib1/tools/tools.interface.ts"
      ],
      [
        "./lib1/public.ts"
      ],
      [
        "./lib2/data.ts"
      ]
    ],
    "fileInfos": {
      "../../../../a/lib/lib.d.ts": {
        "version": "-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }",
        "signature": "-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }",
        "affectsGlobalScope": true
      },
      "./lib1/tools/tools.interface.ts": {
        "version": "-4369626085-export interface ITest {\n    title: string;\n}",
        "signature": "-4369626085-export interface ITest {\n    title: string;\n}"
      },
      "./lib1/tools/public.ts": {
        "version": "-13301115055-export * from \"./tools.interface\";",
        "signature": "-13301115055-export * from \"./tools.interface\";"
      },
      "./lib1/public.ts": {
        "version": "-5078933600-export * from \"./tools/public\";",
        "signature": "-5078933600-export * from \"./tools/public\";"
      },
      "./lib2/data.ts": {
        "version": "-30573389178-import { ITest } from \"lib1/public\";\nexport class Data {\n    public test() {\n        const result: ITest = {\n            title: \"title\"\n        }\n        return result;\n    }\n}",
        "signature": "-30573389178-import { ITest } from \"lib1/public\";\nexport class Data {\n    public test() {\n        const result: ITest = {\n            title: \"title\"\n        }\n        return result;\n    }\n}"
      },
      "./lib2/public.ts": {
        "version": "-9530042629-export * from \"./data\";",
        "signature": "-9530042629-export * from \"./data\";"
      },
      "./app.ts": {
        "version": "-14937286564-import { Data } from \"lib2/public\";\nexport class App {\n    public constructor() {\n        new Data().test();\n    }\n}",
        "signature": "-14937286564-import { Data } from \"lib2/public\";\nexport class App {\n    public constructor() {\n        new Data().test();\n    }\n}"
      }
    },
    "options": {
      "declaration": true
    },
    "referencedMap": {
      "./app.ts": [
        "./lib2/public.ts"
      ],
      "./lib1/public.ts": [
        "./lib1/tools/public.ts"
      ],
      "./lib1/tools/public.ts": [
        "./lib1/tools/tools.interface.ts"
      ],
      "./lib2/data.ts": [
        "./lib1/public.ts"
      ],
      "./lib2/public.ts": [
        "./lib2/data.ts"
      ]
    },
    "exportedModulesMap": {
      "./app.ts": [
        "./lib2/public.ts"
      ],
      "./lib1/public.ts": [
        "./lib1/tools/public.ts"
      ],
      "./lib1/tools/public.ts": [
        "./lib1/tools/tools.interface.ts"
      ],
      "./lib2/data.ts": [
        "./lib1/public.ts"
      ],
      "./lib2/public.ts": [
        "./lib2/data.ts"
      ]
    },
    "semanticDiagnosticsPerFile": [
      "../../../../a/lib/lib.d.ts",
      "./app.ts",
      "./lib1/public.ts",
      "./lib1/tools/public.ts",
      "./lib1/tools/tools.interface.ts",
      "./lib2/data.ts",
      "./lib2/public.ts"
    ]
  },
  "version": "FakeTSVersion",
  "size": 1378
}


Change:: Rename property title to title2 of interface ITest to initialize signatures

Input::
//// [/user/username/projects/myproject/lib1/tools/tools.interface.ts]
export interface ITest {
    title2: string;
}


Output::
>> Screen clear
[[90m12:01:10 AM[0m] File change detected. Starting incremental compilation...

[96mlib2/data.ts[0m:[93m5[0m:[93m13[0m - [91merror[0m[90m TS2322: [0mType '{ title: string; }' is not assignable to type 'ITest'.
  Object literal may only specify known properties, but 'title' does not exist in type 'ITest'. Did you mean to write 'title2'?

[7m5[0m             title: "title"
[7m [0m [91m            ~~~~~~~~~~~~~~[0m

[[90m12:01:35 AM[0m] Found 1 error. Watching for file changes.



Program root files: ["/user/username/projects/myproject/app.ts"]
Program options: {"baseUrl":"/user/username/projects/myproject","isolatedModules":true,"declaration":true,"watch":true,"incremental":true,"configFilePath":"/user/username/projects/myproject/tsconfig.json"}
Program structureReused: Completely
Program files::
/a/lib/lib.d.ts
/user/username/projects/myproject/lib1/tools/tools.interface.ts
/user/username/projects/myproject/lib1/tools/public.ts
/user/username/projects/myproject/lib1/public.ts
/user/username/projects/myproject/lib2/data.ts
/user/username/projects/myproject/lib2/public.ts
/user/username/projects/myproject/app.ts

Semantic diagnostics in builder refreshed for::
/user/username/projects/myproject/lib1/tools/tools.interface.ts
/user/username/projects/myproject/lib1/tools/public.ts
/user/username/projects/myproject/lib1/public.ts
/user/username/projects/myproject/lib2/data.ts
/user/username/projects/myproject/lib2/public.ts
/user/username/projects/myproject/app.ts

Shape signatures in builder refreshed for::
/user/username/projects/myproject/lib1/tools/tools.interface.ts (computed .d.ts)
/user/username/projects/myproject/lib1/tools/public.ts (used version)
/user/username/projects/myproject/lib1/public.ts (used version)
/user/username/projects/myproject/lib2/data.ts (used version)
/user/username/projects/myproject/lib2/public.ts (used version)
/user/username/projects/myproject/app.ts (used version)

WatchedFiles::
/user/username/projects/myproject/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/app.ts:
  {"fileName":"/user/username/projects/myproject/app.ts","pollingInterval":250}
/user/username/projects/myproject/lib2/public.ts:
  {"fileName":"/user/username/projects/myproject/lib2/public.ts","pollingInterval":250}
/user/username/projects/myproject/lib2/data.ts:
  {"fileName":"/user/username/projects/myproject/lib2/data.ts","pollingInterval":250}
/user/username/projects/myproject/lib1/public.ts:
  {"fileName":"/user/username/projects/myproject/lib1/public.ts","pollingInterval":250}
/user/username/projects/myproject/lib1/tools/public.ts:
  {"fileName":"/user/username/projects/myproject/lib1/tools/public.ts","pollingInterval":250}
/user/username/projects/myproject/lib1/tools/tools.interface.ts:
  {"fileName":"/user/username/projects/myproject/lib1/tools/tools.interface.ts","pollingInterval":250}
/a/lib/lib.d.ts:
  {"fileName":"/a/lib/lib.d.ts","pollingInterval":250}

FsWatches::

FsWatchesRecursive::
/user/username/projects/myproject/node_modules/@types:
  {"directoryName":"/user/username/projects/myproject/node_modules/@types","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}

exitCode:: ExitStatus.undefined

//// [/user/username/projects/myproject/lib1/tools/tools.interface.js] file written with same contents
//// [/user/username/projects/myproject/lib1/tools/tools.interface.d.ts]
export interface ITest {
    title2: string;
}


//// [/user/username/projects/myproject/lib1/tools/public.d.ts] file written with same contents
//// [/user/username/projects/myproject/lib1/public.d.ts] file written with same contents
//// [/user/username/projects/myproject/lib2/data.d.ts] file written with same contents
//// [/user/username/projects/myproject/lib2/public.d.ts] file written with same contents
//// [/user/username/projects/myproject/app.d.ts] file written with same contents
//// [/user/username/projects/myproject/tsconfig.tsbuildinfo]
{"program":{"fileNames":["../../../../a/lib/lib.d.ts","./lib1/tools/tools.interface.ts","./lib1/tools/public.ts","./lib1/public.ts","./lib2/data.ts","./lib2/public.ts","./app.ts"],"fileInfos":[{"version":"-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }","affectsGlobalScope":true},{"version":"-3501597171-export interface ITest {\n    title2: string;\n}","signature":"-3883556937-export interface ITest {\n    title2: string;\n}\n"},"-13301115055-export * from \"./tools.interface\";","-5078933600-export * from \"./tools/public\";","-30573389178-import { ITest } from \"lib1/public\";\nexport class Data {\n    public test() {\n        const result: ITest = {\n            title: \"title\"\n        }\n        return result;\n    }\n}","-9530042629-export * from \"./data\";","-14937286564-import { Data } from \"lib2/public\";\nexport class App {\n    public constructor() {\n        new Data().test();\n    }\n}"],"options":{"declaration":true},"fileIdsList":[[6],[3],[2],[4],[5]],"referencedMap":[[7,1],[4,2],[3,3],[5,4],[6,5]],"exportedModulesMap":[[7,1],[4,2],[3,3],[5,4],[6,5]],"semanticDiagnosticsPerFile":[1,7,4,3,2,[5,[{"file":"./lib2/data.ts","start":121,"length":14,"code":2322,"category":1,"messageText":{"messageText":"Type '{ title: string; }' is not assignable to type 'ITest'.","category":1,"code":2322,"next":[{"messageText":"Object literal may only specify known properties, but 'title' does not exist in type 'ITest'. Did you mean to write 'title2'?","category":1,"code":2561}]}}]],6]},"version":"FakeTSVersion"}

//// [/user/username/projects/myproject/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "program": {
    "fileNames": [
      "../../../../a/lib/lib.d.ts",
      "./lib1/tools/tools.interface.ts",
      "./lib1/tools/public.ts",
      "./lib1/public.ts",
      "./lib2/data.ts",
      "./lib2/public.ts",
      "./app.ts"
    ],
    "fileNamesList": [
      [
        "./lib2/public.ts"
      ],
      [
        "./lib1/tools/public.ts"
      ],
      [
        "./lib1/tools/tools.interface.ts"
      ],
      [
        "./lib1/public.ts"
      ],
      [
        "./lib2/data.ts"
      ]
    ],
    "fileInfos": {
      "../../../../a/lib/lib.d.ts": {
        "version": "-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }",
        "signature": "-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }",
        "affectsGlobalScope": true
      },
      "./lib1/tools/tools.interface.ts": {
        "version": "-3501597171-export interface ITest {\n    title2: string;\n}",
        "signature": "-3883556937-export interface ITest {\n    title2: string;\n}\n"
      },
      "./lib1/tools/public.ts": {
        "version": "-13301115055-export * from \"./tools.interface\";",
        "signature": "-13301115055-export * from \"./tools.interface\";"
      },
      "./lib1/public.ts": {
        "version": "-5078933600-export * from \"./tools/public\";",
        "signature": "-5078933600-export * from \"./tools/public\";"
      },
      "./lib2/data.ts": {
        "version": "-30573389178-import { ITest } from \"lib1/public\";\nexport class Data {\n    public test() {\n        const result: ITest = {\n            title: \"title\"\n        }\n        return result;\n    }\n}",
        "signature": "-30573389178-import { ITest } from \"lib1/public\";\nexport class Data {\n    public test() {\n        const result: ITest = {\n            title: \"title\"\n        }\n        return result;\n    }\n}"
      },
      "./lib2/public.ts": {
        "version": "-9530042629-export * from \"./data\";",
        "signature": "-9530042629-export * from \"./data\";"
      },
      "./app.ts": {
        "version": "-14937286564-import { Data } from \"lib2/public\";\nexport class App {\n    public constructor() {\n        new Data().test();\n    }\n}",
        "signature": "-14937286564-import { Data } from \"lib2/public\";\nexport class App {\n    public constructor() {\n        new Data().test();\n    }\n}"
      }
    },
    "options": {
      "declaration": true
    },
    "referencedMap": {
      "./app.ts": [
        "./lib2/public.ts"
      ],
      "./lib1/public.ts": [
        "./lib1/tools/public.ts"
      ],
      "./lib1/tools/public.ts": [
        "./lib1/tools/tools.interface.ts"
      ],
      "./lib2/data.ts": [
        "./lib1/public.ts"
      ],
      "./lib2/public.ts": [
        "./lib2/data.ts"
      ]
    },
    "exportedModulesMap": {
      "./app.ts": [
        "./lib2/public.ts"
      ],
      "./lib1/public.ts": [
        "./lib1/tools/public.ts"
      ],
      "./lib1/tools/public.ts": [
        "./lib1/tools/tools.interface.ts"
      ],
      "./lib2/data.ts": [
        "./lib1/public.ts"
      ],
      "./lib2/public.ts": [
        "./lib2/data.ts"
      ]
    },
    "semanticDiagnosticsPerFile": [
      "../../../../a/lib/lib.d.ts",
      "./app.ts",
      "./lib1/public.ts",
      "./lib1/tools/public.ts",
      "./lib1/tools/tools.interface.ts",
      [
        "./lib2/data.ts",
        [
          {
            "file": "./lib2/data.ts",
            "start": 121,
            "length": 14,
            "code": 2322,
            "category": 1,
            "messageText": {
              "messageText": "Type '{ title: string; }' is not assignable to type 'ITest'.",
              "category": 1,
              "code": 2322,
              "next": [
                {
                  "messageText": "Object literal may only specify known properties, but 'title' does not exist in type 'ITest'. Did you mean to write 'title2'?",
                  "category": 1,
                  "code": 2561
                }
              ]
            }
          }
        ]
      ],
      "./lib2/public.ts"
    ]
  },
  "version": "FakeTSVersion",
  "size": 1843
}


Change:: Rename property title2 to title of interface ITest to revert back to original text

Input::
//// [/user/username/projects/myproject/lib1/tools/tools.interface.ts]
export interface ITest {
    title: string;
}


Output::
>> Screen clear
[[90m12:01:42 AM[0m] File change detected. Starting incremental compilation...

[[90m12:02:07 AM[0m] Found 0 errors. Watching for file changes.



Program root files: ["/user/username/projects/myproject/app.ts"]
Program options: {"baseUrl":"/user/username/projects/myproject","isolatedModules":true,"declaration":true,"watch":true,"incremental":true,"configFilePath":"/user/username/projects/myproject/tsconfig.json"}
Program structureReused: Completely
Program files::
/a/lib/lib.d.ts
/user/username/projects/myproject/lib1/tools/tools.interface.ts
/user/username/projects/myproject/lib1/tools/public.ts
/user/username/projects/myproject/lib1/public.ts
/user/username/projects/myproject/lib2/data.ts
/user/username/projects/myproject/lib2/public.ts
/user/username/projects/myproject/app.ts

Semantic diagnostics in builder refreshed for::
/user/username/projects/myproject/lib1/tools/tools.interface.ts
/user/username/projects/myproject/lib1/tools/public.ts
/user/username/projects/myproject/lib1/public.ts
/user/username/projects/myproject/lib2/data.ts
/user/username/projects/myproject/lib2/public.ts
/user/username/projects/myproject/app.ts

Shape signatures in builder refreshed for::
/user/username/projects/myproject/lib1/tools/tools.interface.ts (computed .d.ts)
/user/username/projects/myproject/lib1/tools/public.ts (used version)
/user/username/projects/myproject/lib1/public.ts (used version)
/user/username/projects/myproject/lib2/data.ts (used version)
/user/username/projects/myproject/lib2/public.ts (used version)
/user/username/projects/myproject/app.ts (used version)

WatchedFiles::
/user/username/projects/myproject/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/app.ts:
  {"fileName":"/user/username/projects/myproject/app.ts","pollingInterval":250}
/user/username/projects/myproject/lib2/public.ts:
  {"fileName":"/user/username/projects/myproject/lib2/public.ts","pollingInterval":250}
/user/username/projects/myproject/lib2/data.ts:
  {"fileName":"/user/username/projects/myproject/lib2/data.ts","pollingInterval":250}
/user/username/projects/myproject/lib1/public.ts:
  {"fileName":"/user/username/projects/myproject/lib1/public.ts","pollingInterval":250}
/user/username/projects/myproject/lib1/tools/public.ts:
  {"fileName":"/user/username/projects/myproject/lib1/tools/public.ts","pollingInterval":250}
/user/username/projects/myproject/lib1/tools/tools.interface.ts:
  {"fileName":"/user/username/projects/myproject/lib1/tools/tools.interface.ts","pollingInterval":250}
/a/lib/lib.d.ts:
  {"fileName":"/a/lib/lib.d.ts","pollingInterval":250}

FsWatches::

FsWatchesRecursive::
/user/username/projects/myproject/node_modules/@types:
  {"directoryName":"/user/username/projects/myproject/node_modules/@types","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}

exitCode:: ExitStatus.undefined

//// [/user/username/projects/myproject/lib1/tools/tools.interface.js] file written with same contents
//// [/user/username/projects/myproject/lib1/tools/tools.interface.d.ts]
export interface ITest {
    title: string;
}


//// [/user/username/projects/myproject/lib1/tools/public.d.ts] file written with same contents
//// [/user/username/projects/myproject/lib1/public.d.ts] file written with same contents
//// [/user/username/projects/myproject/lib2/data.d.ts] file written with same contents
//// [/user/username/projects/myproject/lib2/public.d.ts] file written with same contents
//// [/user/username/projects/myproject/app.d.ts] file written with same contents
//// [/user/username/projects/myproject/tsconfig.tsbuildinfo]
{"program":{"fileNames":["../../../../a/lib/lib.d.ts","./lib1/tools/tools.interface.ts","./lib1/tools/public.ts","./lib1/public.ts","./lib2/data.ts","./lib2/public.ts","./app.ts"],"fileInfos":[{"version":"-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }","affectsGlobalScope":true},{"version":"-4369626085-export interface ITest {\n    title: string;\n}","signature":"-2463740027-export interface ITest {\n    title: string;\n}\n"},"-13301115055-export * from \"./tools.interface\";","-5078933600-export * from \"./tools/public\";","-30573389178-import { ITest } from \"lib1/public\";\nexport class Data {\n    public test() {\n        const result: ITest = {\n            title: \"title\"\n        }\n        return result;\n    }\n}","-9530042629-export * from \"./data\";","-14937286564-import { Data } from \"lib2/public\";\nexport class App {\n    public constructor() {\n        new Data().test();\n    }\n}"],"options":{"declaration":true},"fileIdsList":[[6],[3],[2],[4],[5]],"referencedMap":[[7,1],[4,2],[3,3],[5,4],[6,5]],"exportedModulesMap":[[7,1],[4,2],[3,3],[5,4],[6,5]],"semanticDiagnosticsPerFile":[1,7,4,3,2,5,6]},"version":"FakeTSVersion"}

//// [/user/username/projects/myproject/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "program": {
    "fileNames": [
      "../../../../a/lib/lib.d.ts",
      "./lib1/tools/tools.interface.ts",
      "./lib1/tools/public.ts",
      "./lib1/public.ts",
      "./lib2/data.ts",
      "./lib2/public.ts",
      "./app.ts"
    ],
    "fileNamesList": [
      [
        "./lib2/public.ts"
      ],
      [
        "./lib1/tools/public.ts"
      ],
      [
        "./lib1/tools/tools.interface.ts"
      ],
      [
        "./lib1/public.ts"
      ],
      [
        "./lib2/data.ts"
      ]
    ],
    "fileInfos": {
      "../../../../a/lib/lib.d.ts": {
        "version": "-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }",
        "signature": "-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }",
        "affectsGlobalScope": true
      },
      "./lib1/tools/tools.interface.ts": {
        "version": "-4369626085-export interface ITest {\n    title: string;\n}",
        "signature": "-2463740027-export interface ITest {\n    title: string;\n}\n"
      },
      "./lib1/tools/public.ts": {
        "version": "-13301115055-export * from \"./tools.interface\";",
        "signature": "-13301115055-export * from \"./tools.interface\";"
      },
      "./lib1/public.ts": {
        "version": "-5078933600-export * from \"./tools/public\";",
        "signature": "-5078933600-export * from \"./tools/public\";"
      },
      "./lib2/data.ts": {
        "version": "-30573389178-import { ITest } from \"lib1/public\";\nexport class Data {\n    public test() {\n        const result: ITest = {\n            title: \"title\"\n        }\n        return result;\n    }\n}",
        "signature": "-30573389178-import { ITest } from \"lib1/public\";\nexport class Data {\n    public test() {\n        const result: ITest = {\n            title: \"title\"\n        }\n        return result;\n    }\n}"
      },
      "./lib2/public.ts": {
        "version": "-9530042629-export * from \"./data\";",
        "signature": "-9530042629-export * from \"./data\";"
      },
      "./app.ts": {
        "version": "-14937286564-import { Data } from \"lib2/public\";\nexport class App {\n    public constructor() {\n        new Data().test();\n    }\n}",
        "signature": "-14937286564-import { Data } from \"lib2/public\";\nexport class App {\n    public constructor() {\n        new Data().test();\n    }\n}"
      }
    },
    "options": {
      "declaration": true
    },
    "referencedMap": {
      "./app.ts": [
        "./lib2/public.ts"
      ],
      "./lib1/public.ts": [
        "./lib1/tools/public.ts"
      ],
      "./lib1/tools/public.ts": [
        "./lib1/tools/tools.interface.ts"
      ],
      "./lib2/data.ts": [
        "./lib1/public.ts"
      ],
      "./lib2/public.ts": [
        "./lib2/data.ts"
      ]
    },
    "exportedModulesMap": {
      "./app.ts": [
        "./lib2/public.ts"
      ],
      "./lib1/public.ts": [
        "./lib1/tools/public.ts"
      ],
      "./lib1/tools/public.ts": [
        "./lib1/tools/tools.interface.ts"
      ],
      "./lib2/data.ts": [
        "./lib1/public.ts"
      ],
      "./lib2/public.ts": [
        "./lib2/data.ts"
      ]
    },
    "semanticDiagnosticsPerFile": [
      "../../../../a/lib/lib.d.ts",
      "./app.ts",
      "./lib1/public.ts",
      "./lib1/tools/public.ts",
      "./lib1/tools/tools.interface.ts",
      "./lib2/data.ts",
      "./lib2/public.ts"
    ]
  },
  "version": "FakeTSVersion",
  "size": 1466
}


Change:: Rename property title to title2 of interface ITest

Input::
//// [/user/username/projects/myproject/lib1/tools/tools.interface.ts]
export interface ITest {
    title2: string;
}


Output::
>> Screen clear
[[90m12:02:14 AM[0m] File change detected. Starting incremental compilation...

[96mlib2/data.ts[0m:[93m5[0m:[93m13[0m - [91merror[0m[90m TS2322: [0mType '{ title: string; }' is not assignable to type 'ITest'.
  Object literal may only specify known properties, but 'title' does not exist in type 'ITest'. Did you mean to write 'title2'?

[7m5[0m             title: "title"
[7m [0m [91m            ~~~~~~~~~~~~~~[0m

[[90m12:02:39 AM[0m] Found 1 error. Watching for file changes.



Program root files: ["/user/username/projects/myproject/app.ts"]
Program options: {"baseUrl":"/user/username/projects/myproject","isolatedModules":true,"declaration":true,"watch":true,"incremental":true,"configFilePath":"/user/username/projects/myproject/tsconfig.json"}
Program structureReused: Completely
Program files::
/a/lib/lib.d.ts
/user/username/projects/myproject/lib1/tools/tools.interface.ts
/user/username/projects/myproject/lib1/tools/public.ts
/user/username/projects/myproject/lib1/public.ts
/user/username/projects/myproject/lib2/data.ts
/user/username/projects/myproject/lib2/public.ts
/user/username/projects/myproject/app.ts

Semantic diagnostics in builder refreshed for::
/user/username/projects/myproject/lib1/tools/tools.interface.ts
/user/username/projects/myproject/lib1/tools/public.ts
/user/username/projects/myproject/lib1/public.ts
/user/username/projects/myproject/lib2/data.ts
/user/username/projects/myproject/lib2/public.ts
/user/username/projects/myproject/app.ts

Shape signatures in builder refreshed for::
/user/username/projects/myproject/lib1/tools/tools.interface.ts (computed .d.ts)
/user/username/projects/myproject/lib1/tools/public.ts (used version)
/user/username/projects/myproject/lib1/public.ts (used version)
/user/username/projects/myproject/lib2/data.ts (used version)
/user/username/projects/myproject/lib2/public.ts (used version)
/user/username/projects/myproject/app.ts (used version)

WatchedFiles::
/user/username/projects/myproject/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/app.ts:
  {"fileName":"/user/username/projects/myproject/app.ts","pollingInterval":250}
/user/username/projects/myproject/lib2/public.ts:
  {"fileName":"/user/username/projects/myproject/lib2/public.ts","pollingInterval":250}
/user/username/projects/myproject/lib2/data.ts:
  {"fileName":"/user/username/projects/myproject/lib2/data.ts","pollingInterval":250}
/user/username/projects/myproject/lib1/public.ts:
  {"fileName":"/user/username/projects/myproject/lib1/public.ts","pollingInterval":250}
/user/username/projects/myproject/lib1/tools/public.ts:
  {"fileName":"/user/username/projects/myproject/lib1/tools/public.ts","pollingInterval":250}
/user/username/projects/myproject/lib1/tools/tools.interface.ts:
  {"fileName":"/user/username/projects/myproject/lib1/tools/tools.interface.ts","pollingInterval":250}
/a/lib/lib.d.ts:
  {"fileName":"/a/lib/lib.d.ts","pollingInterval":250}

FsWatches::

FsWatchesRecursive::
/user/username/projects/myproject/node_modules/@types:
  {"directoryName":"/user/username/projects/myproject/node_modules/@types","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}

exitCode:: ExitStatus.undefined

//// [/user/username/projects/myproject/lib1/tools/tools.interface.js] file written with same contents
//// [/user/username/projects/myproject/lib1/tools/tools.interface.d.ts]
export interface ITest {
    title2: string;
}


//// [/user/username/projects/myproject/lib1/tools/public.d.ts] file written with same contents
//// [/user/username/projects/myproject/lib1/public.d.ts] file written with same contents
//// [/user/username/projects/myproject/lib2/data.d.ts] file written with same contents
//// [/user/username/projects/myproject/lib2/public.d.ts] file written with same contents
//// [/user/username/projects/myproject/app.d.ts] file written with same contents
//// [/user/username/projects/myproject/tsconfig.tsbuildinfo]
{"program":{"fileNames":["../../../../a/lib/lib.d.ts","./lib1/tools/tools.interface.ts","./lib1/tools/public.ts","./lib1/public.ts","./lib2/data.ts","./lib2/public.ts","./app.ts"],"fileInfos":[{"version":"-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }","affectsGlobalScope":true},{"version":"-3501597171-export interface ITest {\n    title2: string;\n}","signature":"-3883556937-export interface ITest {\n    title2: string;\n}\n"},"-13301115055-export * from \"./tools.interface\";","-5078933600-export * from \"./tools/public\";","-30573389178-import { ITest } from \"lib1/public\";\nexport class Data {\n    public test() {\n        const result: ITest = {\n            title: \"title\"\n        }\n        return result;\n    }\n}","-9530042629-export * from \"./data\";","-14937286564-import { Data } from \"lib2/public\";\nexport class App {\n    public constructor() {\n        new Data().test();\n    }\n}"],"options":{"declaration":true},"fileIdsList":[[6],[3],[2],[4],[5]],"referencedMap":[[7,1],[4,2],[3,3],[5,4],[6,5]],"exportedModulesMap":[[7,1],[4,2],[3,3],[5,4],[6,5]],"semanticDiagnosticsPerFile":[1,7,4,3,2,[5,[{"file":"./lib2/data.ts","start":121,"length":14,"code":2322,"category":1,"messageText":{"messageText":"Type '{ title: string; }' is not assignable to type 'ITest'.","category":1,"code":2322,"next":[{"messageText":"Object literal may only specify known properties, but 'title' does not exist in type 'ITest'. Did you mean to write 'title2'?","category":1,"code":2561}]}}]],6]},"version":"FakeTSVersion"}

//// [/user/username/projects/myproject/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "program": {
    "fileNames": [
      "../../../../a/lib/lib.d.ts",
      "./lib1/tools/tools.interface.ts",
      "./lib1/tools/public.ts",
      "./lib1/public.ts",
      "./lib2/data.ts",
      "./lib2/public.ts",
      "./app.ts"
    ],
    "fileNamesList": [
      [
        "./lib2/public.ts"
      ],
      [
        "./lib1/tools/public.ts"
      ],
      [
        "./lib1/tools/tools.interface.ts"
      ],
      [
        "./lib1/public.ts"
      ],
      [
        "./lib2/data.ts"
      ]
    ],
    "fileInfos": {
      "../../../../a/lib/lib.d.ts": {
        "version": "-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }",
        "signature": "-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }",
        "affectsGlobalScope": true
      },
      "./lib1/tools/tools.interface.ts": {
        "version": "-3501597171-export interface ITest {\n    title2: string;\n}",
        "signature": "-3883556937-export interface ITest {\n    title2: string;\n}\n"
      },
      "./lib1/tools/public.ts": {
        "version": "-13301115055-export * from \"./tools.interface\";",
        "signature": "-13301115055-export * from \"./tools.interface\";"
      },
      "./lib1/public.ts": {
        "version": "-5078933600-export * from \"./tools/public\";",
        "signature": "-5078933600-export * from \"./tools/public\";"
      },
      "./lib2/data.ts": {
        "version": "-30573389178-import { ITest } from \"lib1/public\";\nexport class Data {\n    public test() {\n        const result: ITest = {\n            title: \"title\"\n        }\n        return result;\n    }\n}",
        "signature": "-30573389178-import { ITest } from \"lib1/public\";\nexport class Data {\n    public test() {\n        const result: ITest = {\n            title: \"title\"\n        }\n        return result;\n    }\n}"
      },
      "./lib2/public.ts": {
        "version": "-9530042629-export * from \"./data\";",
        "signature": "-9530042629-export * from \"./data\";"
      },
      "./app.ts": {
        "version": "-14937286564-import { Data } from \"lib2/public\";\nexport class App {\n    public constructor() {\n        new Data().test();\n    }\n}",
        "signature": "-14937286564-import { Data } from \"lib2/public\";\nexport class App {\n    public constructor() {\n        new Data().test();\n    }\n}"
      }
    },
    "options": {
      "declaration": true
    },
    "referencedMap": {
      "./app.ts": [
        "./lib2/public.ts"
      ],
      "./lib1/public.ts": [
        "./lib1/tools/public.ts"
      ],
      "./lib1/tools/public.ts": [
        "./lib1/tools/tools.interface.ts"
      ],
      "./lib2/data.ts": [
        "./lib1/public.ts"
      ],
      "./lib2/public.ts": [
        "./lib2/data.ts"
      ]
    },
    "exportedModulesMap": {
      "./app.ts": [
        "./lib2/public.ts"
      ],
      "./lib1/public.ts": [
        "./lib1/tools/public.ts"
      ],
      "./lib1/tools/public.ts": [
        "./lib1/tools/tools.interface.ts"
      ],
      "./lib2/data.ts": [
        "./lib1/public.ts"
      ],
      "./lib2/public.ts": [
        "./lib2/data.ts"
      ]
    },
    "semanticDiagnosticsPerFile": [
      "../../../../a/lib/lib.d.ts",
      "./app.ts",
      "./lib1/public.ts",
      "./lib1/tools/public.ts",
      "./lib1/tools/tools.interface.ts",
      [
        "./lib2/data.ts",
        [
          {
            "file": "./lib2/data.ts",
            "start": 121,
            "length": 14,
            "code": 2322,
            "category": 1,
            "messageText": {
              "messageText": "Type '{ title: string; }' is not assignable to type 'ITest'.",
              "category": 1,
              "code": 2322,
              "next": [
                {
                  "messageText": "Object literal may only specify known properties, but 'title' does not exist in type 'ITest'. Did you mean to write 'title2'?",
                  "category": 1,
                  "code": 2561
                }
              ]
            }
          }
        ]
      ],
      "./lib2/public.ts"
    ]
  },
  "version": "FakeTSVersion",
  "size": 1843
}

