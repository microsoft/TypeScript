Info 0    [00:01:14.000] Provided types map file "/a/lib/typesMap.json" doesn't exist
Info 1    [00:01:15.000] request:
    {
      "command": "open",
      "arguments": {
        "file": "/user/username/projects/sample1/tests/index.ts"
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

//// [/user/username/projects/sample1/core/tsconfig.json]
{"compilerOptions":{"composite":true,"cacheResolutions":true,"traceResolution":true}}

//// [/user/username/projects/sample1/core/index.ts]
export function bar() { return 10; }

//// [/user/username/projects/sample1/core/myClass.ts]
export class myClass { }

//// [/user/username/projects/sample1/core/anotherClass.ts]
export class anotherClass { }

//// [/user/username/projects/sample1/logic/tsconfig.json]
{"compilerOptions":{"composite":true,"cacheResolutions":true,"traceResolution":true},"references":[{"path":"../core"}]}

//// [/user/username/projects/sample1/logic/index.ts]
import { myClass } from "../core/myClass";
import { bar } from "../core";
import { anotherClass } from "../core/anotherClass";
export function returnMyClass() {
    bar();
    return new myClass();
}
export function returnAnotherClass() {
    return new anotherClass();
}


//// [/user/username/projects/sample1/tests/tsconfig.json]
{"compilerOptions":{"composite":true,"cacheResolutions":true,"traceResolution":true},"references":[{"path":"../logic"}]}

//// [/user/username/projects/sample1/tests/index.ts]
import { returnMyClass } from "../logic";
returnMyClass();


//// [/user/username/projects/sample1/core/anotherClass.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.anotherClass = void 0;
var anotherClass = /** @class */ (function () {
    function anotherClass() {
    }
    return anotherClass;
}());
exports.anotherClass = anotherClass;


//// [/user/username/projects/sample1/core/anotherClass.d.ts]
export declare class anotherClass {
}


//// [/user/username/projects/sample1/core/index.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bar = void 0;
function bar() { return 10; }
exports.bar = bar;


//// [/user/username/projects/sample1/core/index.d.ts]
export declare function bar(): number;


//// [/user/username/projects/sample1/core/myClass.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.myClass = void 0;
var myClass = /** @class */ (function () {
    function myClass() {
    }
    return myClass;
}());
exports.myClass = myClass;


//// [/user/username/projects/sample1/core/myClass.d.ts]
export declare class myClass {
}


//// [/user/username/projects/sample1/core/tsconfig.tsbuildinfo]
{"program":{"fileNames":["../../../../../a/lib/lib.d.ts","./anotherclass.ts","./index.ts","./myclass.ts"],"fileInfos":[{"version":"-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }","affectsGlobalScope":true},{"version":"-6664885476-export class anotherClass { }","signature":"-6928009824-export declare class anotherClass {\n}\n"},{"version":"4120767815-export function bar() { return 10; }","signature":"-4193260373-export declare function bar(): number;\n"},{"version":"-11785903855-export class myClass { }","signature":"-7432826827-export declare class myClass {\n}\n"}],"options":{"cacheResolutions":true,"composite":true},"referencedMap":[],"exportedModulesMap":[],"semanticDiagnosticsPerFile":[1,2,3,4],"latestChangedDtsFile":"./myClass.d.ts"},"version":"FakeTSVersion"}

//// [/user/username/projects/sample1/core/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "program": {
    "fileNames": [
      "../../../../../a/lib/lib.d.ts",
      "./anotherclass.ts",
      "./index.ts",
      "./myclass.ts"
    ],
    "fileInfos": {
      "../../../../../a/lib/lib.d.ts": {
        "original": {
          "version": "-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }",
          "affectsGlobalScope": true
        },
        "version": "-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }",
        "signature": "-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }",
        "affectsGlobalScope": true
      },
      "./anotherclass.ts": {
        "original": {
          "version": "-6664885476-export class anotherClass { }",
          "signature": "-6928009824-export declare class anotherClass {\n}\n"
        },
        "version": "-6664885476-export class anotherClass { }",
        "signature": "-6928009824-export declare class anotherClass {\n}\n"
      },
      "./index.ts": {
        "original": {
          "version": "4120767815-export function bar() { return 10; }",
          "signature": "-4193260373-export declare function bar(): number;\n"
        },
        "version": "4120767815-export function bar() { return 10; }",
        "signature": "-4193260373-export declare function bar(): number;\n"
      },
      "./myclass.ts": {
        "original": {
          "version": "-11785903855-export class myClass { }",
          "signature": "-7432826827-export declare class myClass {\n}\n"
        },
        "version": "-11785903855-export class myClass { }",
        "signature": "-7432826827-export declare class myClass {\n}\n"
      }
    },
    "options": {
      "cacheResolutions": true,
      "composite": true
    },
    "referencedMap": {},
    "exportedModulesMap": {},
    "semanticDiagnosticsPerFile": [
      "../../../../../a/lib/lib.d.ts",
      "./anotherclass.ts",
      "./index.ts",
      "./myclass.ts"
    ],
    "latestChangedDtsFile": "./myClass.d.ts"
  },
  "version": "FakeTSVersion",
  "size": 1087
}

//// [/user/username/projects/sample1/logic/index.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.returnAnotherClass = exports.returnMyClass = void 0;
var myClass_1 = require("../core/myClass");
var core_1 = require("../core");
var anotherClass_1 = require("../core/anotherClass");
function returnMyClass() {
    (0, core_1.bar)();
    return new myClass_1.myClass();
}
exports.returnMyClass = returnMyClass;
function returnAnotherClass() {
    return new anotherClass_1.anotherClass();
}
exports.returnAnotherClass = returnAnotherClass;


//// [/user/username/projects/sample1/logic/index.d.ts]
import { myClass } from "../core/myClass";
import { anotherClass } from "../core/anotherClass";
export declare function returnMyClass(): myClass;
export declare function returnAnotherClass(): anotherClass;


//// [/user/username/projects/sample1/logic/tsconfig.tsbuildinfo]
{"program":{"fileNames":["../../../../../a/lib/lib.d.ts","../core/myclass.d.ts","../core/index.d.ts","../core/anotherclass.d.ts","./index.ts","./","../core/myClass.ts","../core/index.ts","../core/anotherClass.ts"],"fileInfos":[{"version":"-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }","affectsGlobalScope":true},"-7432826827-export declare class myClass {\n}\n","-4193260373-export declare function bar(): number;\n","-6928009824-export declare class anotherClass {\n}\n",{"version":"-9720705499-import { myClass } from \"../core/myClass\";\nimport { bar } from \"../core\";\nimport { anotherClass } from \"../core/anotherClass\";\nexport function returnMyClass() {\n    bar();\n    return new myClass();\n}\nexport function returnAnotherClass() {\n    return new anotherClass();\n}\n","signature":"-26318514585-import { myClass } from \"../core/myClass\";\nimport { anotherClass } from \"../core/anotherClass\";\nexport declare function returnMyClass(): myClass;\nexport declare function returnAnotherClass(): anotherClass;\n"}],"options":{"cacheResolutions":true,"composite":true},"fileIdsList":[[2,3,4],[2,4]],"referencedMap":[[5,1]],"exportedModulesMap":[[5,2]],"semanticDiagnosticsPerFile":[1,4,3,2,5],"latestChangedDtsFile":"./index.d.ts","cacheResolutions":{"resolutions":[{"resolvedModule":7},{"resolvedModule":8},{"resolvedModule":9}],"names":["../core/myClass","../core","../core/anotherClass"],"resolutionEntries":[[1,1],[2,2],[3,3]],"modules":[[6,[1,2,3]]]}},"version":"FakeTSVersion"}

//// [/user/username/projects/sample1/logic/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "program": {
    "fileNames": [
      "../../../../../a/lib/lib.d.ts",
      "../core/myclass.d.ts",
      "../core/index.d.ts",
      "../core/anotherclass.d.ts",
      "./index.ts",
      "./",
      "../core/myClass.ts",
      "../core/index.ts",
      "../core/anotherClass.ts"
    ],
    "fileNamesList": [
      [
        "../core/myclass.d.ts",
        "../core/index.d.ts",
        "../core/anotherclass.d.ts"
      ],
      [
        "../core/myclass.d.ts",
        "../core/anotherclass.d.ts"
      ]
    ],
    "fileInfos": {
      "../../../../../a/lib/lib.d.ts": {
        "original": {
          "version": "-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }",
          "affectsGlobalScope": true
        },
        "version": "-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }",
        "signature": "-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }",
        "affectsGlobalScope": true
      },
      "../core/myclass.d.ts": {
        "version": "-7432826827-export declare class myClass {\n}\n",
        "signature": "-7432826827-export declare class myClass {\n}\n"
      },
      "../core/index.d.ts": {
        "version": "-4193260373-export declare function bar(): number;\n",
        "signature": "-4193260373-export declare function bar(): number;\n"
      },
      "../core/anotherclass.d.ts": {
        "version": "-6928009824-export declare class anotherClass {\n}\n",
        "signature": "-6928009824-export declare class anotherClass {\n}\n"
      },
      "./index.ts": {
        "original": {
          "version": "-9720705499-import { myClass } from \"../core/myClass\";\nimport { bar } from \"../core\";\nimport { anotherClass } from \"../core/anotherClass\";\nexport function returnMyClass() {\n    bar();\n    return new myClass();\n}\nexport function returnAnotherClass() {\n    return new anotherClass();\n}\n",
          "signature": "-26318514585-import { myClass } from \"../core/myClass\";\nimport { anotherClass } from \"../core/anotherClass\";\nexport declare function returnMyClass(): myClass;\nexport declare function returnAnotherClass(): anotherClass;\n"
        },
        "version": "-9720705499-import { myClass } from \"../core/myClass\";\nimport { bar } from \"../core\";\nimport { anotherClass } from \"../core/anotherClass\";\nexport function returnMyClass() {\n    bar();\n    return new myClass();\n}\nexport function returnAnotherClass() {\n    return new anotherClass();\n}\n",
        "signature": "-26318514585-import { myClass } from \"../core/myClass\";\nimport { anotherClass } from \"../core/anotherClass\";\nexport declare function returnMyClass(): myClass;\nexport declare function returnAnotherClass(): anotherClass;\n"
      }
    },
    "options": {
      "cacheResolutions": true,
      "composite": true
    },
    "referencedMap": {
      "./index.ts": [
        "../core/myclass.d.ts",
        "../core/index.d.ts",
        "../core/anotherclass.d.ts"
      ]
    },
    "exportedModulesMap": {
      "./index.ts": [
        "../core/myclass.d.ts",
        "../core/anotherclass.d.ts"
      ]
    },
    "semanticDiagnosticsPerFile": [
      "../../../../../a/lib/lib.d.ts",
      "../core/anotherclass.d.ts",
      "../core/index.d.ts",
      "../core/myclass.d.ts",
      "./index.ts"
    ],
    "latestChangedDtsFile": "./index.d.ts",
    "cacheResolutions": {
      "resolutions": [
        {
          "original": {
            "resolvedModule": 7
          },
          "resolutionId": 1,
          "resolvedModule": "../core/myClass.ts"
        },
        {
          "original": {
            "resolvedModule": 8
          },
          "resolutionId": 2,
          "resolvedModule": "../core/index.ts"
        },
        {
          "original": {
            "resolvedModule": 9
          },
          "resolutionId": 3,
          "resolvedModule": "../core/anotherClass.ts"
        }
      ],
      "names": [
        "../core/myClass",
        "../core",
        "../core/anotherClass"
      ],
      "resolutionEntries": [
        {
          "original": [
            1,
            1
          ],
          "resolutionEntryId": 1,
          "name": "../core/myClass",
          "resolution": {
            "resolutionId": 1,
            "resolvedModule": "../core/myClass.ts"
          }
        },
        {
          "original": [
            2,
            2
          ],
          "resolutionEntryId": 2,
          "name": "../core",
          "resolution": {
            "resolutionId": 2,
            "resolvedModule": "../core/index.ts"
          }
        },
        {
          "original": [
            3,
            3
          ],
          "resolutionEntryId": 3,
          "name": "../core/anotherClass",
          "resolution": {
            "resolutionId": 3,
            "resolvedModule": "../core/anotherClass.ts"
          }
        }
      ],
      "modules": [
        {
          "dir": "./",
          "resolutions": [
            {
              "resolutionEntryId": 1,
              "name": "../core/myClass",
              "resolution": {
                "resolutionId": 1,
                "resolvedModule": "../core/myClass.ts"
              }
            },
            {
              "resolutionEntryId": 2,
              "name": "../core",
              "resolution": {
                "resolutionId": 2,
                "resolvedModule": "../core/index.ts"
              }
            },
            {
              "resolutionEntryId": 3,
              "name": "../core/anotherClass",
              "resolution": {
                "resolutionId": 3,
                "resolvedModule": "../core/anotherClass.ts"
              }
            }
          ]
        }
      ]
    }
  },
  "version": "FakeTSVersion",
  "size": 1811
}

//// [/user/username/projects/sample1/tests/index.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var logic_1 = require("../logic");
(0, logic_1.returnMyClass)();


//// [/user/username/projects/sample1/tests/index.d.ts]
export {};


//// [/user/username/projects/sample1/tests/tsconfig.tsbuildinfo]
{"program":{"fileNames":["../../../../../a/lib/lib.d.ts","../core/myclass.d.ts","../core/anotherclass.d.ts","../logic/index.d.ts","./index.ts","../logic","../core/myClass.ts","../core/anotherClass.ts","./","../logic/index.ts"],"fileInfos":[{"version":"-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }","affectsGlobalScope":true},"-7432826827-export declare class myClass {\n}\n","-6928009824-export declare class anotherClass {\n}\n","-26318514585-import { myClass } from \"../core/myClass\";\nimport { anotherClass } from \"../core/anotherClass\";\nexport declare function returnMyClass(): myClass;\nexport declare function returnAnotherClass(): anotherClass;\n",{"version":"-1418876836-import { returnMyClass } from \"../logic\";\nreturnMyClass();\n","signature":"-3531856636-export {};\n"}],"options":{"cacheResolutions":true,"composite":true},"fileIdsList":[[2,3],[4]],"referencedMap":[[4,1],[5,2]],"exportedModulesMap":[[4,1]],"semanticDiagnosticsPerFile":[1,3,2,4,5],"latestChangedDtsFile":"./index.d.ts","cacheResolutions":{"resolutions":[{"resolvedModule":7},{"resolvedModule":8},{"resolvedModule":10}],"names":["../core/myClass","../core/anotherClass","../logic"],"resolutionEntries":[[1,1],[2,2],[3,3]],"modules":[[6,[1,2]],[9,[3]]]}},"version":"FakeTSVersion"}

//// [/user/username/projects/sample1/tests/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "program": {
    "fileNames": [
      "../../../../../a/lib/lib.d.ts",
      "../core/myclass.d.ts",
      "../core/anotherclass.d.ts",
      "../logic/index.d.ts",
      "./index.ts",
      "../logic",
      "../core/myClass.ts",
      "../core/anotherClass.ts",
      "./",
      "../logic/index.ts"
    ],
    "fileNamesList": [
      [
        "../core/myclass.d.ts",
        "../core/anotherclass.d.ts"
      ],
      [
        "../logic/index.d.ts"
      ]
    ],
    "fileInfos": {
      "../../../../../a/lib/lib.d.ts": {
        "original": {
          "version": "-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }",
          "affectsGlobalScope": true
        },
        "version": "-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }",
        "signature": "-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }",
        "affectsGlobalScope": true
      },
      "../core/myclass.d.ts": {
        "version": "-7432826827-export declare class myClass {\n}\n",
        "signature": "-7432826827-export declare class myClass {\n}\n"
      },
      "../core/anotherclass.d.ts": {
        "version": "-6928009824-export declare class anotherClass {\n}\n",
        "signature": "-6928009824-export declare class anotherClass {\n}\n"
      },
      "../logic/index.d.ts": {
        "version": "-26318514585-import { myClass } from \"../core/myClass\";\nimport { anotherClass } from \"../core/anotherClass\";\nexport declare function returnMyClass(): myClass;\nexport declare function returnAnotherClass(): anotherClass;\n",
        "signature": "-26318514585-import { myClass } from \"../core/myClass\";\nimport { anotherClass } from \"../core/anotherClass\";\nexport declare function returnMyClass(): myClass;\nexport declare function returnAnotherClass(): anotherClass;\n"
      },
      "./index.ts": {
        "original": {
          "version": "-1418876836-import { returnMyClass } from \"../logic\";\nreturnMyClass();\n",
          "signature": "-3531856636-export {};\n"
        },
        "version": "-1418876836-import { returnMyClass } from \"../logic\";\nreturnMyClass();\n",
        "signature": "-3531856636-export {};\n"
      }
    },
    "options": {
      "cacheResolutions": true,
      "composite": true
    },
    "referencedMap": {
      "../logic/index.d.ts": [
        "../core/myclass.d.ts",
        "../core/anotherclass.d.ts"
      ],
      "./index.ts": [
        "../logic/index.d.ts"
      ]
    },
    "exportedModulesMap": {
      "../logic/index.d.ts": [
        "../core/myclass.d.ts",
        "../core/anotherclass.d.ts"
      ]
    },
    "semanticDiagnosticsPerFile": [
      "../../../../../a/lib/lib.d.ts",
      "../core/anotherclass.d.ts",
      "../core/myclass.d.ts",
      "../logic/index.d.ts",
      "./index.ts"
    ],
    "latestChangedDtsFile": "./index.d.ts",
    "cacheResolutions": {
      "resolutions": [
        {
          "original": {
            "resolvedModule": 7
          },
          "resolutionId": 1,
          "resolvedModule": "../core/myClass.ts"
        },
        {
          "original": {
            "resolvedModule": 8
          },
          "resolutionId": 2,
          "resolvedModule": "../core/anotherClass.ts"
        },
        {
          "original": {
            "resolvedModule": 10
          },
          "resolutionId": 3,
          "resolvedModule": "../logic/index.ts"
        }
      ],
      "names": [
        "../core/myClass",
        "../core/anotherClass",
        "../logic"
      ],
      "resolutionEntries": [
        {
          "original": [
            1,
            1
          ],
          "resolutionEntryId": 1,
          "name": "../core/myClass",
          "resolution": {
            "resolutionId": 1,
            "resolvedModule": "../core/myClass.ts"
          }
        },
        {
          "original": [
            2,
            2
          ],
          "resolutionEntryId": 2,
          "name": "../core/anotherClass",
          "resolution": {
            "resolutionId": 2,
            "resolvedModule": "../core/anotherClass.ts"
          }
        },
        {
          "original": [
            3,
            3
          ],
          "resolutionEntryId": 3,
          "name": "../logic",
          "resolution": {
            "resolutionId": 3,
            "resolvedModule": "../logic/index.ts"
          }
        }
      ],
      "modules": [
        {
          "dir": "../logic",
          "resolutions": [
            {
              "resolutionEntryId": 1,
              "name": "../core/myClass",
              "resolution": {
                "resolutionId": 1,
                "resolvedModule": "../core/myClass.ts"
              }
            },
            {
              "resolutionEntryId": 2,
              "name": "../core/anotherClass",
              "resolution": {
                "resolutionId": 2,
                "resolvedModule": "../core/anotherClass.ts"
              }
            }
          ]
        },
        {
          "dir": "./",
          "resolutions": [
            {
              "resolutionEntryId": 3,
              "name": "../logic",
              "resolution": {
                "resolutionId": 3,
                "resolvedModule": "../logic/index.ts"
              }
            }
          ]
        }
      ]
    }
  },
  "version": "FakeTSVersion",
  "size": 1581
}


PolledWatches::

FsWatches::

FsWatchesRecursive::

Info 2    [00:01:16.000] Search path: /user/username/projects/sample1/tests
Info 3    [00:01:17.000] For info: /user/username/projects/sample1/tests/index.ts :: Config file name: /user/username/projects/sample1/tests/tsconfig.json
Info 4    [00:01:18.000] Creating configuration project /user/username/projects/sample1/tests/tsconfig.json
Info 5    [00:01:19.000] FileWatcher:: Added:: WatchInfo: /user/username/projects/sample1/tests/tsconfig.json 2000 undefined Project: /user/username/projects/sample1/tests/tsconfig.json WatchType: Config file
Info 6    [00:01:20.000] Config: /user/username/projects/sample1/tests/tsconfig.json : {
 "rootNames": [
  "/user/username/projects/sample1/tests/index.ts"
 ],
 "options": {
  "composite": true,
  "cacheResolutions": true,
  "traceResolution": true,
  "configFilePath": "/user/username/projects/sample1/tests/tsconfig.json"
 },
 "projectReferences": [
  {
   "path": "/user/username/projects/sample1/logic",
   "originalPath": "../logic"
  }
 ]
}
Info 7    [00:01:21.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/sample1/tests 1 undefined Config: /user/username/projects/sample1/tests/tsconfig.json WatchType: Wild card directory
Info 8    [00:01:22.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/sample1/tests 1 undefined Config: /user/username/projects/sample1/tests/tsconfig.json WatchType: Wild card directory
Info 9    [00:01:23.000] Starting updateGraphWorker: Project: /user/username/projects/sample1/tests/tsconfig.json
Info 10   [00:01:24.000] Config: /user/username/projects/sample1/logic/tsconfig.json : {
 "rootNames": [
  "/user/username/projects/sample1/logic/index.ts"
 ],
 "options": {
  "composite": true,
  "cacheResolutions": true,
  "traceResolution": true,
  "configFilePath": "/user/username/projects/sample1/logic/tsconfig.json"
 },
 "projectReferences": [
  {
   "path": "/user/username/projects/sample1/core",
   "originalPath": "../core"
  }
 ]
}
Info 11   [00:01:25.000] FileWatcher:: Added:: WatchInfo: /user/username/projects/sample1/logic/tsconfig.json 2000 undefined Project: /user/username/projects/sample1/tests/tsconfig.json WatchType: Config file
Info 12   [00:01:26.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/sample1/logic 1 undefined Config: /user/username/projects/sample1/logic/tsconfig.json WatchType: Wild card directory
Info 13   [00:01:27.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/sample1/logic 1 undefined Config: /user/username/projects/sample1/logic/tsconfig.json WatchType: Wild card directory
Info 14   [00:01:28.000] Config: /user/username/projects/sample1/core/tsconfig.json : {
 "rootNames": [
  "/user/username/projects/sample1/core/anotherClass.ts",
  "/user/username/projects/sample1/core/index.ts",
  "/user/username/projects/sample1/core/myClass.ts"
 ],
 "options": {
  "composite": true,
  "cacheResolutions": true,
  "traceResolution": true,
  "configFilePath": "/user/username/projects/sample1/core/tsconfig.json"
 }
}
Info 15   [00:01:29.000] FileWatcher:: Added:: WatchInfo: /user/username/projects/sample1/core/tsconfig.json 2000 undefined Project: /user/username/projects/sample1/tests/tsconfig.json WatchType: Config file
Info 16   [00:01:30.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/sample1/core 1 undefined Config: /user/username/projects/sample1/core/tsconfig.json WatchType: Wild card directory
Info 17   [00:01:31.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/sample1/core 1 undefined Config: /user/username/projects/sample1/core/tsconfig.json WatchType: Wild card directory
Info 18   [00:01:32.000] Reusing resolution of module '../logic' from '/user/username/projects/sample1/tests/index.ts' found in cache from location '/user/username/projects/sample1/tests', it was successfully resolved to '/user/username/projects/sample1/logic/index.ts'.
Info 19   [00:01:33.000] FileWatcher:: Added:: WatchInfo: /user/username/projects/sample1/logic/index.ts 500 undefined WatchType: Closed Script info
Info 20   [00:01:34.000] Reusing resolution of module '../core/myClass' from '/user/username/projects/sample1/logic/index.ts' found in cache from location '/user/username/projects/sample1/logic', it was successfully resolved to '/user/username/projects/sample1/core/myClass.ts'.
Info 21   [00:01:35.000] Reusing resolution of module '../core/anotherClass' from '/user/username/projects/sample1/logic/index.ts' found in cache from location '/user/username/projects/sample1/logic', it was successfully resolved to '/user/username/projects/sample1/core/anotherClass.ts'.
Info 22   [00:01:36.000] ======== Resolving module '../core' from '/user/username/projects/sample1/logic/index.ts'. ========
Info 23   [00:01:37.000] Using compiler options of project reference redirect '/user/username/projects/sample1/logic/tsconfig.json'.
Info 24   [00:01:38.000] Module resolution kind is not specified, using 'NodeJs'.
Info 25   [00:01:39.000] Loading module as file / folder, candidate module location '/user/username/projects/sample1/core', target file types: TypeScript, Declaration.
Info 26   [00:01:40.000] File '/user/username/projects/sample1/core.ts' does not exist.
Info 27   [00:01:41.000] File '/user/username/projects/sample1/core.tsx' does not exist.
Info 28   [00:01:42.000] File '/user/username/projects/sample1/core.d.ts' does not exist.
Info 29   [00:01:43.000] File '/user/username/projects/sample1/core/package.json' does not exist.
Info 30   [00:01:44.000] File '/user/username/projects/sample1/core/index.ts' exist - use it as a name resolution result.
Info 31   [00:01:45.000] ======== Module name '../core' was successfully resolved to '/user/username/projects/sample1/core/index.ts'. ========
Info 32   [00:01:46.000] FileWatcher:: Added:: WatchInfo: /user/username/projects/sample1/core/myClass.ts 500 undefined WatchType: Closed Script info
Info 33   [00:01:47.000] FileWatcher:: Added:: WatchInfo: /user/username/projects/sample1/core/index.ts 500 undefined WatchType: Closed Script info
Info 34   [00:01:48.000] FileWatcher:: Added:: WatchInfo: /user/username/projects/sample1/core/anotherClass.ts 500 undefined WatchType: Closed Script info
Info 35   [00:01:49.000] FileWatcher:: Added:: WatchInfo: /a/lib/lib.d.ts 500 undefined WatchType: Closed Script info
Info 36   [00:01:50.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/sample1/tests/node_modules/@types 1 undefined Project: /user/username/projects/sample1/tests/tsconfig.json WatchType: Type roots
Info 37   [00:01:51.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/sample1/tests/node_modules/@types 1 undefined Project: /user/username/projects/sample1/tests/tsconfig.json WatchType: Type roots
Info 38   [00:01:52.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/sample1/node_modules/@types 1 undefined Project: /user/username/projects/sample1/tests/tsconfig.json WatchType: Type roots
Info 39   [00:01:53.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/sample1/node_modules/@types 1 undefined Project: /user/username/projects/sample1/tests/tsconfig.json WatchType: Type roots
Info 40   [00:01:54.000] Finishing updateGraphWorker: Project: /user/username/projects/sample1/tests/tsconfig.json Version: 1 structureChanged: true structureIsReused:: SafeModuleCache Elapsed:: *ms
Info 41   [00:01:55.000] Project '/user/username/projects/sample1/tests/tsconfig.json' (Configured)
Info 42   [00:01:56.000] 	Files (6)
	/a/lib/lib.d.ts
	/user/username/projects/sample1/core/myClass.ts
	/user/username/projects/sample1/core/index.ts
	/user/username/projects/sample1/core/anotherClass.ts
	/user/username/projects/sample1/logic/index.ts
	/user/username/projects/sample1/tests/index.ts


	../../../../../a/lib/lib.d.ts
	  Default library for target 'es5'
	../core/myClass.ts
	  Imported via "../core/myClass" from file '../logic/index.ts'
	../core/index.ts
	  Imported via "../core" from file '../logic/index.ts'
	../core/anotherClass.ts
	  Imported via "../core/anotherClass" from file '../logic/index.ts'
	../logic/index.ts
	  Imported via "../logic" from file 'index.ts'
	index.ts
	  Matched by default include pattern '**/*'

Info 43   [00:01:57.000] -----------------------------------------------
Info 44   [00:01:58.000] Search path: /user/username/projects/sample1/tests
Info 45   [00:01:59.000] For info: /user/username/projects/sample1/tests/tsconfig.json :: No config files found.
Info 46   [00:02:00.000] Project '/user/username/projects/sample1/tests/tsconfig.json' (Configured)
Info 46   [00:02:01.000] 	Files (6)

Info 46   [00:02:02.000] -----------------------------------------------
Info 46   [00:02:03.000] Open files: 
Info 46   [00:02:04.000] 	FileName: /user/username/projects/sample1/tests/index.ts ProjectRootPath: undefined
Info 46   [00:02:05.000] 		Projects: /user/username/projects/sample1/tests/tsconfig.json
After request

PolledWatches::
/user/username/projects/sample1/tests/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/sample1/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/user/username/projects/sample1/tests/tsconfig.json:
  {}
/user/username/projects/sample1/logic/tsconfig.json:
  {}
/user/username/projects/sample1/core/tsconfig.json:
  {}
/user/username/projects/sample1/logic/index.ts:
  {}
/user/username/projects/sample1/core/myclass.ts:
  {}
/user/username/projects/sample1/core/index.ts:
  {}
/user/username/projects/sample1/core/anotherclass.ts:
  {}
/a/lib/lib.d.ts:
  {}

FsWatchesRecursive::
/user/username/projects/sample1/tests:
  {}
/user/username/projects/sample1/logic:
  {}
/user/username/projects/sample1/core:
  {}

Info 46   [00:02:06.000] response:
    {
      "responseRequired": false
    }