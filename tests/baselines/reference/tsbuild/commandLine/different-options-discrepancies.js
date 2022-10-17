0:: with sourceMap
*** Needs explanation
File: /src/project/a.js.map
CleanBuild:
{"version":3,"file":"a.js","sourceRoot":"","sources":["a.ts"],"names":[],"mappings":";;;AAAa,QAAA,CAAC,GAAG,EAAE,CAAC;AAAA,IAAM,MAAM,GAAG,EAAE,CAAC"}
IncrementalBuild:

File: /src/project/a.js
CleanBuild:
"use strict";
exports.__esModule = true;
exports.a = void 0;
exports.a = 10;
var aLocal = 10;
//# sourceMappingURL=a.js.map
IncrementalBuild:
"use strict";
exports.__esModule = true;
exports.a = void 0;
exports.a = 10;
var aLocal = 10;

File: /src/project/b.js.map
CleanBuild:
{"version":3,"file":"b.js","sourceRoot":"","sources":["b.ts"],"names":[],"mappings":";;;AAAa,QAAA,CAAC,GAAG,EAAE,CAAC;AAAA,IAAM,MAAM,GAAG,EAAE,CAAC"}
IncrementalBuild:

File: /src/project/b.js
CleanBuild:
"use strict";
exports.__esModule = true;
exports.b = void 0;
exports.b = 10;
var bLocal = 10;
//# sourceMappingURL=b.js.map
IncrementalBuild:
"use strict";
exports.__esModule = true;
exports.b = void 0;
exports.b = 10;
var bLocal = 10;

File: /src/project/c.js.map
CleanBuild:
{"version":3,"file":"c.js","sourceRoot":"","sources":["c.ts"],"names":[],"mappings":";;;AAAA,yBAAwB;AAAa,QAAA,CAAC,GAAG,KAAC,CAAC"}
IncrementalBuild:

File: /src/project/c.js
CleanBuild:
"use strict";
exports.__esModule = true;
exports.c = void 0;
var a_1 = require("./a");
exports.c = a_1.a;
//# sourceMappingURL=c.js.map
IncrementalBuild:
"use strict";
exports.__esModule = true;
exports.c = void 0;
var a_1 = require("./a");
exports.c = a_1.a;

File: /src/project/d.js.map
CleanBuild:
{"version":3,"file":"d.js","sourceRoot":"","sources":["d.ts"],"names":[],"mappings":";;;AAAA,yBAAwB;AAAa,QAAA,CAAC,GAAG,KAAC,CAAC"}
IncrementalBuild:

File: /src/project/d.js
CleanBuild:
"use strict";
exports.__esModule = true;
exports.d = void 0;
var b_1 = require("./b");
exports.d = b_1.b;
//# sourceMappingURL=d.js.map
IncrementalBuild:
"use strict";
exports.__esModule = true;
exports.d = void 0;
var b_1 = require("./b");
exports.d = b_1.b;

TsBuild info text without affectedFilesPendingEmit:: /src/project/tsconfig.tsbuildinfo.readable.baseline.txt::
CleanBuild:
{
  "program": {
    "fileInfos": {
      "../../lib/lib.d.ts": {
        "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "affectsGlobalScope": true
      },
      "./a.ts": {
        "version": "-18487752940-export const a = 10;const aLocal = 10;"
      },
      "./b.ts": {
        "version": "-6189287562-export const b = 10;const bLocal = 10;"
      },
      "./c.ts": {
        "version": "3248317647-import { a } from \"./a\";export const c = a;"
      },
      "./d.ts": {
        "version": "-19615769517-import { b } from \"./b\";export const d = b;"
      }
    },
    "options": {
      "composite": true,
      "sourceMap": true
    },
    "referencedMap": {
      "./c.ts": [
        "./a.ts"
      ],
      "./d.ts": [
        "./b.ts"
      ]
    },
    "semanticDiagnosticsPerFile": [
      "../../lib/lib.d.ts",
      "./a.ts",
      "./b.ts",
      "./c.ts",
      "./d.ts"
    ],
    "latestChangedDtsFile": "FakeFileName"
  },
  "version": "FakeTSVersion"
}
IncrementalBuild:
{
  "program": {
    "fileInfos": {
      "../../lib/lib.d.ts": {
        "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "affectsGlobalScope": true
      },
      "./a.ts": {
        "version": "-18487752940-export const a = 10;const aLocal = 10;"
      },
      "./b.ts": {
        "version": "-6189287562-export const b = 10;const bLocal = 10;"
      },
      "./c.ts": {
        "version": "3248317647-import { a } from \"./a\";export const c = a;"
      },
      "./d.ts": {
        "version": "-19615769517-import { b } from \"./b\";export const d = b;"
      }
    },
    "options": {
      "composite": true
    },
    "referencedMap": {
      "./c.ts": [
        "./a.ts"
      ],
      "./d.ts": [
        "./b.ts"
      ]
    },
    "semanticDiagnosticsPerFile": [
      "../../lib/lib.d.ts",
      "./a.ts",
      "./b.ts",
      "./c.ts",
      "./d.ts"
    ],
    "latestChangedDtsFile": "FakeFileName"
  },
  "version": "FakeTSVersion"
}
2:: with declaration should not emit anything
Clean build tsbuildinfo will have compilerOptions with composite and declaration
Incremental build will detect that it doesnt need to rebuild so tsbuild info is from before which has option composite only
TsBuild info text without affectedFilesPendingEmit:: /src/project/tsconfig.tsbuildinfo.readable.baseline.txt::
CleanBuild:
{
  "program": {
    "fileInfos": {
      "../../lib/lib.d.ts": {
        "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "affectsGlobalScope": true
      },
      "./a.ts": {
        "version": "-18487752940-export const a = 10;const aLocal = 10;"
      },
      "./b.ts": {
        "version": "-6189287562-export const b = 10;const bLocal = 10;"
      },
      "./c.ts": {
        "version": "3248317647-import { a } from \"./a\";export const c = a;"
      },
      "./d.ts": {
        "version": "-19615769517-import { b } from \"./b\";export const d = b;"
      }
    },
    "options": {
      "composite": true,
      "declaration": true
    },
    "referencedMap": {
      "./c.ts": [
        "./a.ts"
      ],
      "./d.ts": [
        "./b.ts"
      ]
    },
    "semanticDiagnosticsPerFile": [
      "../../lib/lib.d.ts",
      "./a.ts",
      "./b.ts",
      "./c.ts",
      "./d.ts"
    ],
    "latestChangedDtsFile": "FakeFileName"
  },
  "version": "FakeTSVersion"
}
IncrementalBuild:
{
  "program": {
    "fileInfos": {
      "../../lib/lib.d.ts": {
        "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "affectsGlobalScope": true
      },
      "./a.ts": {
        "version": "-18487752940-export const a = 10;const aLocal = 10;"
      },
      "./b.ts": {
        "version": "-6189287562-export const b = 10;const bLocal = 10;"
      },
      "./c.ts": {
        "version": "3248317647-import { a } from \"./a\";export const c = a;"
      },
      "./d.ts": {
        "version": "-19615769517-import { b } from \"./b\";export const d = b;"
      }
    },
    "options": {
      "composite": true
    },
    "referencedMap": {
      "./c.ts": [
        "./a.ts"
      ],
      "./d.ts": [
        "./b.ts"
      ]
    },
    "semanticDiagnosticsPerFile": [
      "../../lib/lib.d.ts",
      "./a.ts",
      "./b.ts",
      "./c.ts",
      "./d.ts"
    ],
    "latestChangedDtsFile": "FakeFileName"
  },
  "version": "FakeTSVersion"
}
4:: with declaration and declarationMap
*** Needs explanation
File: /src/project/a.d.ts.map
CleanBuild:
{"version":3,"file":"a.d.ts","sourceRoot":"","sources":["a.ts"],"names":[],"mappings":"AAAA,eAAO,MAAM,CAAC,KAAK,CAAC"}
IncrementalBuild:

File: /src/project/a.d.ts
CleanBuild:
export declare const a = 10;
//# sourceMappingURL=a.d.ts.map
IncrementalBuild:
export declare const a = 10;

File: /src/project/b.d.ts.map
CleanBuild:
{"version":3,"file":"b.d.ts","sourceRoot":"","sources":["b.ts"],"names":[],"mappings":"AAAA,eAAO,MAAM,CAAC,KAAK,CAAC"}
IncrementalBuild:

File: /src/project/b.d.ts
CleanBuild:
export declare const b = 10;
//# sourceMappingURL=b.d.ts.map
IncrementalBuild:
export declare const b = 10;

File: /src/project/c.d.ts.map
CleanBuild:
{"version":3,"file":"c.d.ts","sourceRoot":"","sources":["c.ts"],"names":[],"mappings":"AAAwB,eAAO,MAAM,CAAC,KAAI,CAAC"}
IncrementalBuild:

File: /src/project/c.d.ts
CleanBuild:
export declare const c = 10;
//# sourceMappingURL=c.d.ts.map
IncrementalBuild:
export declare const c = 10;

File: /src/project/d.d.ts.map
CleanBuild:
{"version":3,"file":"d.d.ts","sourceRoot":"","sources":["d.ts"],"names":[],"mappings":"AAAwB,eAAO,MAAM,CAAC,KAAI,CAAC"}
IncrementalBuild:

File: /src/project/d.d.ts
CleanBuild:
export declare const d = 10;
//# sourceMappingURL=d.d.ts.map
IncrementalBuild:
export declare const d = 10;

TsBuild info text without affectedFilesPendingEmit:: /src/project/tsconfig.tsbuildinfo.readable.baseline.txt::
CleanBuild:
{
  "program": {
    "fileInfos": {
      "../../lib/lib.d.ts": {
        "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "affectsGlobalScope": true
      },
      "./a.ts": {
        "version": "-18487752940-export const a = 10;const aLocal = 10;"
      },
      "./b.ts": {
        "version": "-6189287562-export const b = 10;const bLocal = 10;"
      },
      "./c.ts": {
        "version": "3248317647-import { a } from \"./a\";export const c = a;"
      },
      "./d.ts": {
        "version": "-19615769517-import { b } from \"./b\";export const d = b;"
      }
    },
    "options": {
      "composite": true,
      "declaration": true,
      "declarationMap": true
    },
    "referencedMap": {
      "./c.ts": [
        "./a.ts"
      ],
      "./d.ts": [
        "./b.ts"
      ]
    },
    "semanticDiagnosticsPerFile": [
      "../../lib/lib.d.ts",
      "./a.ts",
      "./b.ts",
      "./c.ts",
      "./d.ts"
    ],
    "latestChangedDtsFile": "FakeFileName"
  },
  "version": "FakeTSVersion"
}
IncrementalBuild:
{
  "program": {
    "fileInfos": {
      "../../lib/lib.d.ts": {
        "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "affectsGlobalScope": true
      },
      "./a.ts": {
        "version": "-18487752940-export const a = 10;const aLocal = 10;"
      },
      "./b.ts": {
        "version": "-6189287562-export const b = 10;const bLocal = 10;"
      },
      "./c.ts": {
        "version": "3248317647-import { a } from \"./a\";export const c = a;"
      },
      "./d.ts": {
        "version": "-19615769517-import { b } from \"./b\";export const d = b;"
      }
    },
    "options": {
      "composite": true
    },
    "referencedMap": {
      "./c.ts": [
        "./a.ts"
      ],
      "./d.ts": [
        "./b.ts"
      ]
    },
    "semanticDiagnosticsPerFile": [
      "../../lib/lib.d.ts",
      "./a.ts",
      "./b.ts",
      "./c.ts",
      "./d.ts"
    ],
    "latestChangedDtsFile": "FakeFileName"
  },
  "version": "FakeTSVersion"
}
6:: with emitDeclarationOnly should not emit anything
Clean build tsbuildinfo will have compilerOptions with composite and emitDeclarationOnly
Incremental build will detect that it doesnt need to rebuild so tsbuild info is from before which has option composite only
TsBuild info text without affectedFilesPendingEmit:: /src/project/tsconfig.tsbuildinfo.readable.baseline.txt::
CleanBuild:
{
  "program": {
    "fileInfos": {
      "../../lib/lib.d.ts": {
        "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "affectsGlobalScope": true
      },
      "./a.ts": {
        "version": "-18487752940-export const a = 10;const aLocal = 10;"
      },
      "./b.ts": {
        "version": "-6189287562-export const b = 10;const bLocal = 10;"
      },
      "./c.ts": {
        "version": "3248317647-import { a } from \"./a\";export const c = a;"
      },
      "./d.ts": {
        "version": "-19615769517-import { b } from \"./b\";export const d = b;"
      }
    },
    "options": {
      "composite": true,
      "emitDeclarationOnly": true
    },
    "referencedMap": {
      "./c.ts": [
        "./a.ts"
      ],
      "./d.ts": [
        "./b.ts"
      ]
    },
    "semanticDiagnosticsPerFile": [
      "../../lib/lib.d.ts",
      "./a.ts",
      "./b.ts",
      "./c.ts",
      "./d.ts"
    ],
    "latestChangedDtsFile": "FakeFileName"
  },
  "version": "FakeTSVersion"
}
IncrementalBuild:
{
  "program": {
    "fileInfos": {
      "../../lib/lib.d.ts": {
        "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "affectsGlobalScope": true
      },
      "./a.ts": {
        "version": "-18487752940-export const a = 10;const aLocal = 10;"
      },
      "./b.ts": {
        "version": "-6189287562-export const b = 10;const bLocal = 10;"
      },
      "./c.ts": {
        "version": "3248317647-import { a } from \"./a\";export const c = a;"
      },
      "./d.ts": {
        "version": "-19615769517-import { b } from \"./b\";export const d = b;"
      }
    },
    "options": {
      "composite": true
    },
    "referencedMap": {
      "./c.ts": [
        "./a.ts"
      ],
      "./d.ts": [
        "./b.ts"
      ]
    },
    "semanticDiagnosticsPerFile": [
      "../../lib/lib.d.ts",
      "./a.ts",
      "./b.ts",
      "./c.ts",
      "./d.ts"
    ],
    "latestChangedDtsFile": "FakeFileName"
  },
  "version": "FakeTSVersion"
}
9:: with declaration should not emit anything
Clean build tsbuildinfo will have compilerOptions with composite and declaration
Incremental build will detect that it doesnt need to rebuild so tsbuild info is from before which has option composite only
TsBuild info text without affectedFilesPendingEmit:: /src/project/tsconfig.tsbuildinfo.readable.baseline.txt::
CleanBuild:
{
  "program": {
    "fileInfos": {
      "../../lib/lib.d.ts": {
        "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "affectsGlobalScope": true
      },
      "./a.ts": {
        "version": "-17390360476-export const a = 10;const aLocal = 100;"
      },
      "./b.ts": {
        "version": "-6189287562-export const b = 10;const bLocal = 10;"
      },
      "./c.ts": {
        "version": "3248317647-import { a } from \"./a\";export const c = a;"
      },
      "./d.ts": {
        "version": "-19615769517-import { b } from \"./b\";export const d = b;"
      }
    },
    "options": {
      "composite": true,
      "declaration": true
    },
    "referencedMap": {
      "./c.ts": [
        "./a.ts"
      ],
      "./d.ts": [
        "./b.ts"
      ]
    },
    "semanticDiagnosticsPerFile": [
      "../../lib/lib.d.ts",
      "./a.ts",
      "./b.ts",
      "./c.ts",
      "./d.ts"
    ],
    "latestChangedDtsFile": "FakeFileName"
  },
  "version": "FakeTSVersion"
}
IncrementalBuild:
{
  "program": {
    "fileInfos": {
      "../../lib/lib.d.ts": {
        "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "affectsGlobalScope": true
      },
      "./a.ts": {
        "version": "-17390360476-export const a = 10;const aLocal = 100;"
      },
      "./b.ts": {
        "version": "-6189287562-export const b = 10;const bLocal = 10;"
      },
      "./c.ts": {
        "version": "3248317647-import { a } from \"./a\";export const c = a;"
      },
      "./d.ts": {
        "version": "-19615769517-import { b } from \"./b\";export const d = b;"
      }
    },
    "options": {
      "composite": true
    },
    "referencedMap": {
      "./c.ts": [
        "./a.ts"
      ],
      "./d.ts": [
        "./b.ts"
      ]
    },
    "semanticDiagnosticsPerFile": [
      "../../lib/lib.d.ts",
      "./a.ts",
      "./b.ts",
      "./c.ts",
      "./d.ts"
    ],
    "latestChangedDtsFile": "FakeFileName"
  },
  "version": "FakeTSVersion"
}
10:: with inlineSourceMap
*** Needs explanation
File: /src/project/a.js
CleanBuild:
"use strict";
exports.__esModule = true;
exports.a = void 0;
exports.a = 10;
var aLocal = 100;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImEudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQWEsUUFBQSxDQUFDLEdBQUcsRUFBRSxDQUFDO0FBQUEsSUFBTSxNQUFNLEdBQUcsR0FBRyxDQUFDIn0=
IncrementalBuild:
"use strict";
exports.__esModule = true;
exports.a = void 0;
exports.a = 10;
var aLocal = 100;

File: /src/project/b.js
CleanBuild:
"use strict";
exports.__esModule = true;
exports.b = void 0;
exports.b = 10;
var bLocal = 10;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQWEsUUFBQSxDQUFDLEdBQUcsRUFBRSxDQUFDO0FBQUEsSUFBTSxNQUFNLEdBQUcsRUFBRSxDQUFDIn0=
IncrementalBuild:
"use strict";
exports.__esModule = true;
exports.b = void 0;
exports.b = 10;
var bLocal = 10;

File: /src/project/c.js
CleanBuild:
"use strict";
exports.__esModule = true;
exports.c = void 0;
var a_1 = require("./a");
exports.c = a_1.a;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEseUJBQXdCO0FBQWEsUUFBQSxDQUFDLEdBQUcsS0FBQyxDQUFDIn0=
IncrementalBuild:
"use strict";
exports.__esModule = true;
exports.c = void 0;
var a_1 = require("./a");
exports.c = a_1.a;

File: /src/project/d.js
CleanBuild:
"use strict";
exports.__esModule = true;
exports.d = void 0;
var b_1 = require("./b");
exports.d = b_1.b;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEseUJBQXdCO0FBQWEsUUFBQSxDQUFDLEdBQUcsS0FBQyxDQUFDIn0=
IncrementalBuild:
"use strict";
exports.__esModule = true;
exports.d = void 0;
var b_1 = require("./b");
exports.d = b_1.b;

TsBuild info text without affectedFilesPendingEmit:: /src/project/tsconfig.tsbuildinfo.readable.baseline.txt::
CleanBuild:
{
  "program": {
    "fileInfos": {
      "../../lib/lib.d.ts": {
        "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "affectsGlobalScope": true
      },
      "./a.ts": {
        "version": "-17390360476-export const a = 10;const aLocal = 100;"
      },
      "./b.ts": {
        "version": "-6189287562-export const b = 10;const bLocal = 10;"
      },
      "./c.ts": {
        "version": "3248317647-import { a } from \"./a\";export const c = a;"
      },
      "./d.ts": {
        "version": "-19615769517-import { b } from \"./b\";export const d = b;"
      }
    },
    "options": {
      "composite": true,
      "inlineSourceMap": true
    },
    "referencedMap": {
      "./c.ts": [
        "./a.ts"
      ],
      "./d.ts": [
        "./b.ts"
      ]
    },
    "semanticDiagnosticsPerFile": [
      "../../lib/lib.d.ts",
      "./a.ts",
      "./b.ts",
      "./c.ts",
      "./d.ts"
    ],
    "latestChangedDtsFile": "FakeFileName"
  },
  "version": "FakeTSVersion"
}
IncrementalBuild:
{
  "program": {
    "fileInfos": {
      "../../lib/lib.d.ts": {
        "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "affectsGlobalScope": true
      },
      "./a.ts": {
        "version": "-17390360476-export const a = 10;const aLocal = 100;"
      },
      "./b.ts": {
        "version": "-6189287562-export const b = 10;const bLocal = 10;"
      },
      "./c.ts": {
        "version": "3248317647-import { a } from \"./a\";export const c = a;"
      },
      "./d.ts": {
        "version": "-19615769517-import { b } from \"./b\";export const d = b;"
      }
    },
    "options": {
      "composite": true
    },
    "referencedMap": {
      "./c.ts": [
        "./a.ts"
      ],
      "./d.ts": [
        "./b.ts"
      ]
    },
    "semanticDiagnosticsPerFile": [
      "../../lib/lib.d.ts",
      "./a.ts",
      "./b.ts",
      "./c.ts",
      "./d.ts"
    ],
    "latestChangedDtsFile": "FakeFileName"
  },
  "version": "FakeTSVersion"
}
11:: with sourceMap
*** Needs explanation
File: /src/project/a.js.map
CleanBuild:
{"version":3,"file":"a.js","sourceRoot":"","sources":["a.ts"],"names":[],"mappings":";;;AAAa,QAAA,CAAC,GAAG,EAAE,CAAC;AAAA,IAAM,MAAM,GAAG,GAAG,CAAC"}
IncrementalBuild:

File: /src/project/a.js
CleanBuild:
"use strict";
exports.__esModule = true;
exports.a = void 0;
exports.a = 10;
var aLocal = 100;
//# sourceMappingURL=a.js.map
IncrementalBuild:
"use strict";
exports.__esModule = true;
exports.a = void 0;
exports.a = 10;
var aLocal = 100;

File: /src/project/b.js.map
CleanBuild:
{"version":3,"file":"b.js","sourceRoot":"","sources":["b.ts"],"names":[],"mappings":";;;AAAa,QAAA,CAAC,GAAG,EAAE,CAAC;AAAA,IAAM,MAAM,GAAG,EAAE,CAAC"}
IncrementalBuild:

File: /src/project/b.js
CleanBuild:
"use strict";
exports.__esModule = true;
exports.b = void 0;
exports.b = 10;
var bLocal = 10;
//# sourceMappingURL=b.js.map
IncrementalBuild:
"use strict";
exports.__esModule = true;
exports.b = void 0;
exports.b = 10;
var bLocal = 10;

File: /src/project/c.js.map
CleanBuild:
{"version":3,"file":"c.js","sourceRoot":"","sources":["c.ts"],"names":[],"mappings":";;;AAAA,yBAAwB;AAAa,QAAA,CAAC,GAAG,KAAC,CAAC"}
IncrementalBuild:

File: /src/project/c.js
CleanBuild:
"use strict";
exports.__esModule = true;
exports.c = void 0;
var a_1 = require("./a");
exports.c = a_1.a;
//# sourceMappingURL=c.js.map
IncrementalBuild:
"use strict";
exports.__esModule = true;
exports.c = void 0;
var a_1 = require("./a");
exports.c = a_1.a;

File: /src/project/d.js.map
CleanBuild:
{"version":3,"file":"d.js","sourceRoot":"","sources":["d.ts"],"names":[],"mappings":";;;AAAA,yBAAwB;AAAa,QAAA,CAAC,GAAG,KAAC,CAAC"}
IncrementalBuild:

File: /src/project/d.js
CleanBuild:
"use strict";
exports.__esModule = true;
exports.d = void 0;
var b_1 = require("./b");
exports.d = b_1.b;
//# sourceMappingURL=d.js.map
IncrementalBuild:
"use strict";
exports.__esModule = true;
exports.d = void 0;
var b_1 = require("./b");
exports.d = b_1.b;

TsBuild info text without affectedFilesPendingEmit:: /src/project/tsconfig.tsbuildinfo.readable.baseline.txt::
CleanBuild:
{
  "program": {
    "fileInfos": {
      "../../lib/lib.d.ts": {
        "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "affectsGlobalScope": true
      },
      "./a.ts": {
        "version": "-17390360476-export const a = 10;const aLocal = 100;"
      },
      "./b.ts": {
        "version": "-6189287562-export const b = 10;const bLocal = 10;"
      },
      "./c.ts": {
        "version": "3248317647-import { a } from \"./a\";export const c = a;"
      },
      "./d.ts": {
        "version": "-19615769517-import { b } from \"./b\";export const d = b;"
      }
    },
    "options": {
      "composite": true,
      "sourceMap": true
    },
    "referencedMap": {
      "./c.ts": [
        "./a.ts"
      ],
      "./d.ts": [
        "./b.ts"
      ]
    },
    "semanticDiagnosticsPerFile": [
      "../../lib/lib.d.ts",
      "./a.ts",
      "./b.ts",
      "./c.ts",
      "./d.ts"
    ],
    "latestChangedDtsFile": "FakeFileName"
  },
  "version": "FakeTSVersion"
}
IncrementalBuild:
{
  "program": {
    "fileInfos": {
      "../../lib/lib.d.ts": {
        "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "affectsGlobalScope": true
      },
      "./a.ts": {
        "version": "-17390360476-export const a = 10;const aLocal = 100;"
      },
      "./b.ts": {
        "version": "-6189287562-export const b = 10;const bLocal = 10;"
      },
      "./c.ts": {
        "version": "3248317647-import { a } from \"./a\";export const c = a;"
      },
      "./d.ts": {
        "version": "-19615769517-import { b } from \"./b\";export const d = b;"
      }
    },
    "options": {
      "composite": true
    },
    "referencedMap": {
      "./c.ts": [
        "./a.ts"
      ],
      "./d.ts": [
        "./b.ts"
      ]
    },
    "semanticDiagnosticsPerFile": [
      "../../lib/lib.d.ts",
      "./a.ts",
      "./b.ts",
      "./c.ts",
      "./d.ts"
    ],
    "latestChangedDtsFile": "FakeFileName"
  },
  "version": "FakeTSVersion"
}