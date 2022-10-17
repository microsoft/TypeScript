2:: emit js files
*** Needs explanation
File: /src/project1/src/a.js
CleanBuild:
"use strict";
exports.__esModule = true;
exports.a = void 0;
exports.a = 10;
var aLocal = 10;
var aa = 10;

IncrementalBuild:

File: /src/project1/src/b.js
CleanBuild:
"use strict";
exports.__esModule = true;
exports.b = void 0;
exports.b = 10;
var bLocal = 10;

IncrementalBuild:

File: /src/project1/src/c.js
CleanBuild:
"use strict";
exports.__esModule = true;
exports.c = void 0;
var a_1 = require("./a");
exports.c = a_1.a;

IncrementalBuild:

File: /src/project1/src/d.js
CleanBuild:
"use strict";
exports.__esModule = true;
exports.d = void 0;
var b_1 = require("./b");
exports.d = b_1.b;

IncrementalBuild:

TsBuild info text without affectedFilesPendingEmit:: /src/project1/src/tsconfig.tsbuildinfo.readable.baseline.txt::
CleanBuild:
{
  "program": {
    "fileInfos": {
      "../../../lib/lib.d.ts": {
        "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "affectsGlobalScope": true
      },
      "./a.ts": {
        "version": "-16597586570-export const a = 10;const aLocal = 10;const aa = 10;"
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
      "emitDeclarationOnly": false
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
      "../../../lib/lib.d.ts",
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
      "../../../lib/lib.d.ts": {
        "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "affectsGlobalScope": true
      },
      "./a.ts": {
        "version": "-16597586570-export const a = 10;const aLocal = 10;const aa = 10;"
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
      "../../../lib/lib.d.ts",
      "./a.ts",
      "./b.ts",
      "./c.ts",
      "./d.ts"
    ],
    "latestChangedDtsFile": "FakeFileName"
  },
  "version": "FakeTSVersion"
}
File: /src/project2/src/e.js
CleanBuild:
"use strict";
exports.__esModule = true;
exports.e = void 0;
exports.e = 10;

IncrementalBuild:

File: /src/project2/src/f.js
CleanBuild:
"use strict";
exports.__esModule = true;
exports.f = void 0;
var a_1 = require("../../project1/src/a");
exports.f = a_1.a;

IncrementalBuild:

File: /src/project2/src/g.js
CleanBuild:
"use strict";
exports.__esModule = true;
exports.g = void 0;
var b_1 = require("../../project1/src/b");
exports.g = b_1.b;

IncrementalBuild:

TsBuild info text without affectedFilesPendingEmit:: /src/project2/src/tsconfig.tsbuildinfo.readable.baseline.txt::
CleanBuild:
{
  "program": {
    "fileInfos": {
      "../../../lib/lib.d.ts": {
        "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "affectsGlobalScope": true
      },
      "./e.ts": {
        "version": "-13789510868-export const e = 10;"
      },
      "../../project1/src/a.d.ts": {
        "version": "-3762229137-export declare const a = 10;\r\n"
      },
      "./f.ts": {
        "version": "-2015135303-import { a } from \"../../project1/src/a\"; export const f = a;"
      },
      "../../project1/src/b.d.ts": {
        "version": "-1807916688-export declare const b = 10;\r\n"
      },
      "./g.ts": {
        "version": "-2047954019-import { b } from \"../../project1/src/b\"; export const g = b;"
      }
    },
    "options": {
      "composite": true,
      "emitDeclarationOnly": false
    },
    "referencedMap": {
      "./f.ts": [
        "../../project1/src/a.d.ts"
      ],
      "./g.ts": [
        "../../project1/src/b.d.ts"
      ]
    },
    "semanticDiagnosticsPerFile": [
      "../../../lib/lib.d.ts",
      "../../project1/src/a.d.ts",
      "../../project1/src/b.d.ts",
      "./e.ts",
      "./f.ts",
      "./g.ts"
    ],
    "latestChangedDtsFile": "FakeFileName"
  },
  "version": "FakeTSVersion"
}
IncrementalBuild:
{
  "program": {
    "fileInfos": {
      "../../../lib/lib.d.ts": {
        "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "affectsGlobalScope": true
      },
      "./e.ts": {
        "version": "-13789510868-export const e = 10;"
      },
      "../../project1/src/a.d.ts": {
        "version": "-3762229137-export declare const a = 10;\r\n"
      },
      "./f.ts": {
        "version": "-2015135303-import { a } from \"../../project1/src/a\"; export const f = a;"
      },
      "../../project1/src/b.d.ts": {
        "version": "-1807916688-export declare const b = 10;\r\n"
      },
      "./g.ts": {
        "version": "-2047954019-import { b } from \"../../project1/src/b\"; export const g = b;"
      }
    },
    "options": {
      "composite": true,
      "emitDeclarationOnly": true
    },
    "referencedMap": {
      "./f.ts": [
        "../../project1/src/a.d.ts"
      ],
      "./g.ts": [
        "../../project1/src/b.d.ts"
      ]
    },
    "semanticDiagnosticsPerFile": [
      "../../../lib/lib.d.ts",
      "../../project1/src/a.d.ts",
      "../../project1/src/b.d.ts",
      "./e.ts",
      "./f.ts",
      "./g.ts"
    ],
    "latestChangedDtsFile": "FakeFileName"
  },
  "version": "FakeTSVersion"
}
3:: no-change-run
Clean build tsbuildinfo for both projects will have compilerOptions with composite and emitDeclarationOnly
Incremental build will detect that it doesnt need to rebuild so tsbuild info for projects is from before which has option composite as true but emitDeclrationOnly as false
*** Supplied discrepancy explanation but didnt file any difference
4:: no change run with js emit
*** Needs explanation
File: /src/project1/src/a.js
CleanBuild:
"use strict";
exports.__esModule = true;
exports.a = void 0;
exports.a = 10;
var aLocal = 10;
var aa = 10;

IncrementalBuild:

File: /src/project1/src/b.js
CleanBuild:
"use strict";
exports.__esModule = true;
exports.b = void 0;
exports.b = 10;
var bLocal = 10;

IncrementalBuild:

File: /src/project1/src/c.js
CleanBuild:
"use strict";
exports.__esModule = true;
exports.c = void 0;
var a_1 = require("./a");
exports.c = a_1.a;

IncrementalBuild:

File: /src/project1/src/d.js
CleanBuild:
"use strict";
exports.__esModule = true;
exports.d = void 0;
var b_1 = require("./b");
exports.d = b_1.b;

IncrementalBuild:

TsBuild info text without affectedFilesPendingEmit:: /src/project1/src/tsconfig.tsbuildinfo.readable.baseline.txt::
CleanBuild:
{
  "program": {
    "fileInfos": {
      "../../../lib/lib.d.ts": {
        "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "affectsGlobalScope": true
      },
      "./a.ts": {
        "version": "-16597586570-export const a = 10;const aLocal = 10;const aa = 10;"
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
      "emitDeclarationOnly": false
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
      "../../../lib/lib.d.ts",
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
      "../../../lib/lib.d.ts": {
        "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "affectsGlobalScope": true
      },
      "./a.ts": {
        "version": "-16597586570-export const a = 10;const aLocal = 10;const aa = 10;"
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
      "../../../lib/lib.d.ts",
      "./a.ts",
      "./b.ts",
      "./c.ts",
      "./d.ts"
    ],
    "latestChangedDtsFile": "FakeFileName"
  },
  "version": "FakeTSVersion"
}
File: /src/project2/src/e.js
CleanBuild:
"use strict";
exports.__esModule = true;
exports.e = void 0;
exports.e = 10;

IncrementalBuild:

File: /src/project2/src/f.js
CleanBuild:
"use strict";
exports.__esModule = true;
exports.f = void 0;
var a_1 = require("../../project1/src/a");
exports.f = a_1.a;

IncrementalBuild:

File: /src/project2/src/g.js
CleanBuild:
"use strict";
exports.__esModule = true;
exports.g = void 0;
var b_1 = require("../../project1/src/b");
exports.g = b_1.b;

IncrementalBuild:

TsBuild info text without affectedFilesPendingEmit:: /src/project2/src/tsconfig.tsbuildinfo.readable.baseline.txt::
CleanBuild:
{
  "program": {
    "fileInfos": {
      "../../../lib/lib.d.ts": {
        "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "affectsGlobalScope": true
      },
      "./e.ts": {
        "version": "-13789510868-export const e = 10;"
      },
      "../../project1/src/a.d.ts": {
        "version": "-3762229137-export declare const a = 10;\r\n"
      },
      "./f.ts": {
        "version": "-2015135303-import { a } from \"../../project1/src/a\"; export const f = a;"
      },
      "../../project1/src/b.d.ts": {
        "version": "-1807916688-export declare const b = 10;\r\n"
      },
      "./g.ts": {
        "version": "-2047954019-import { b } from \"../../project1/src/b\"; export const g = b;"
      }
    },
    "options": {
      "composite": true,
      "emitDeclarationOnly": false
    },
    "referencedMap": {
      "./f.ts": [
        "../../project1/src/a.d.ts"
      ],
      "./g.ts": [
        "../../project1/src/b.d.ts"
      ]
    },
    "semanticDiagnosticsPerFile": [
      "../../../lib/lib.d.ts",
      "../../project1/src/a.d.ts",
      "../../project1/src/b.d.ts",
      "./e.ts",
      "./f.ts",
      "./g.ts"
    ],
    "latestChangedDtsFile": "FakeFileName"
  },
  "version": "FakeTSVersion"
}
IncrementalBuild:
{
  "program": {
    "fileInfos": {
      "../../../lib/lib.d.ts": {
        "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "affectsGlobalScope": true
      },
      "./e.ts": {
        "version": "-13789510868-export const e = 10;"
      },
      "../../project1/src/a.d.ts": {
        "version": "-3762229137-export declare const a = 10;\r\n"
      },
      "./f.ts": {
        "version": "-2015135303-import { a } from \"../../project1/src/a\"; export const f = a;"
      },
      "../../project1/src/b.d.ts": {
        "version": "-1807916688-export declare const b = 10;\r\n"
      },
      "./g.ts": {
        "version": "-2047954019-import { b } from \"../../project1/src/b\"; export const g = b;"
      }
    },
    "options": {
      "composite": true,
      "emitDeclarationOnly": true
    },
    "referencedMap": {
      "./f.ts": [
        "../../project1/src/a.d.ts"
      ],
      "./g.ts": [
        "../../project1/src/b.d.ts"
      ]
    },
    "semanticDiagnosticsPerFile": [
      "../../../lib/lib.d.ts",
      "../../project1/src/a.d.ts",
      "../../project1/src/b.d.ts",
      "./e.ts",
      "./f.ts",
      "./g.ts"
    ],
    "latestChangedDtsFile": "FakeFileName"
  },
  "version": "FakeTSVersion"
}
5:: js emit with change
*** Needs explanation
File: /src/project2/src/e.js
CleanBuild:
"use strict";
exports.__esModule = true;
exports.e = void 0;
exports.e = 10;

IncrementalBuild:

File: /src/project2/src/f.js
CleanBuild:
"use strict";
exports.__esModule = true;
exports.f = void 0;
var a_1 = require("../../project1/src/a");
exports.f = a_1.a;

IncrementalBuild:

File: /src/project2/src/g.js
CleanBuild:
"use strict";
exports.__esModule = true;
exports.g = void 0;
var b_1 = require("../../project1/src/b");
exports.g = b_1.b;

IncrementalBuild:

TsBuild info text without affectedFilesPendingEmit:: /src/project2/src/tsconfig.tsbuildinfo.readable.baseline.txt::
CleanBuild:
{
  "program": {
    "fileInfos": {
      "../../../lib/lib.d.ts": {
        "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "affectsGlobalScope": true
      },
      "./e.ts": {
        "version": "-13789510868-export const e = 10;"
      },
      "../../project1/src/a.d.ts": {
        "version": "-3762229137-export declare const a = 10;\r\n"
      },
      "./f.ts": {
        "version": "-2015135303-import { a } from \"../../project1/src/a\"; export const f = a;"
      },
      "../../project1/src/b.d.ts": {
        "version": "-1807916688-export declare const b = 10;\r\n"
      },
      "./g.ts": {
        "version": "-2047954019-import { b } from \"../../project1/src/b\"; export const g = b;"
      }
    },
    "options": {
      "composite": true,
      "emitDeclarationOnly": false
    },
    "referencedMap": {
      "./f.ts": [
        "../../project1/src/a.d.ts"
      ],
      "./g.ts": [
        "../../project1/src/b.d.ts"
      ]
    },
    "semanticDiagnosticsPerFile": [
      "../../../lib/lib.d.ts",
      "../../project1/src/a.d.ts",
      "../../project1/src/b.d.ts",
      "./e.ts",
      "./f.ts",
      "./g.ts"
    ],
    "latestChangedDtsFile": "FakeFileName"
  },
  "version": "FakeTSVersion"
}
IncrementalBuild:
{
  "program": {
    "fileInfos": {
      "../../../lib/lib.d.ts": {
        "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "affectsGlobalScope": true
      },
      "./e.ts": {
        "version": "-13789510868-export const e = 10;"
      },
      "../../project1/src/a.d.ts": {
        "version": "-3762229137-export declare const a = 10;\r\n"
      },
      "./f.ts": {
        "version": "-2015135303-import { a } from \"../../project1/src/a\"; export const f = a;"
      },
      "../../project1/src/b.d.ts": {
        "version": "-1807916688-export declare const b = 10;\r\n"
      },
      "./g.ts": {
        "version": "-2047954019-import { b } from \"../../project1/src/b\"; export const g = b;"
      }
    },
    "options": {
      "composite": true,
      "emitDeclarationOnly": true
    },
    "referencedMap": {
      "./f.ts": [
        "../../project1/src/a.d.ts"
      ],
      "./g.ts": [
        "../../project1/src/b.d.ts"
      ]
    },
    "semanticDiagnosticsPerFile": [
      "../../../lib/lib.d.ts",
      "../../project1/src/a.d.ts",
      "../../project1/src/b.d.ts",
      "./e.ts",
      "./f.ts",
      "./g.ts"
    ],
    "latestChangedDtsFile": "FakeFileName"
  },
  "version": "FakeTSVersion"
}