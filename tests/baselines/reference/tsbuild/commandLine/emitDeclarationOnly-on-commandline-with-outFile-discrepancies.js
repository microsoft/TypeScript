4:: no-change-run
Clean build tsbuildinfo for both projects will have compilerOptions with composite and emitDeclarationOnly
Incremental build will detect that it doesnt need to rebuild so tsbuild info for projects is from before which has option composite only
TsBuild info text without affectedFilesPendingEmit:: /src/project1/outfile.tsbuildinfo.readable.baseline.txt::
CleanBuild:
{
  "bundle": {
    "commonSourceDirectory": "./src",
    "sourceFiles": [
      "./src/a.ts",
      "./src/b.ts",
      "./src/c.ts",
      "./src/d.ts"
    ],
    "dts": {
      "sections": [
        {
          "pos": 0,
          "end": 232,
          "kind": "text"
        }
      ],
      "hash": "18384476281-declare module \"a\" {\r\n    export const a = 10;\r\n    export const aaa = 10;\r\n}\r\ndeclare module \"b\" {\r\n    export const b = 10;\r\n}\r\ndeclare module \"c\" {\r\n    export const c = 10;\r\n}\r\ndeclare module \"d\" {\r\n    export const d = 10;\r\n}\r\n"
    }
  },
  "program": {
    "fileInfos": {
      "../../lib/lib.d.ts": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
      "./src/a.ts": "-6435489413-export const a = 10;const aLocal = 10;const aa = 10;export const aaa = 10;",
      "./src/b.ts": "-6189287562-export const b = 10;const bLocal = 10;",
      "./src/c.ts": "3248317647-import { a } from \"./a\";export const c = a;",
      "./src/d.ts": "-19615769517-import { b } from \"./b\";export const d = b;"
    },
    "options": {
      "composite": true,
      "emitDeclarationOnly": true,
      "module": 2,
      "outFile": "./outFile.js"
    },
    "outSignature": "18384476281-declare module \"a\" {\r\n    export const a = 10;\r\n    export const aaa = 10;\r\n}\r\ndeclare module \"b\" {\r\n    export const b = 10;\r\n}\r\ndeclare module \"c\" {\r\n    export const c = 10;\r\n}\r\ndeclare module \"d\" {\r\n    export const d = 10;\r\n}\r\n",
    "latestChangedDtsFile": "FakeFileName"
  },
  "version": "FakeTSVersion"
}
IncrementalBuild:
{
  "bundle": {
    "commonSourceDirectory": "./src",
    "sourceFiles": [
      "./src/a.ts",
      "./src/b.ts",
      "./src/c.ts",
      "./src/d.ts"
    ],
    "js": {
      "sections": [
        {
          "pos": 0,
          "end": 801,
          "kind": "text"
        }
      ],
      "hash": "37592873652-define(\"a\", [\"require\", \"exports\"], function (require, exports) {\r\n    \"use strict\";\r\n    exports.__esModule = true;\r\n    exports.aaa = exports.a = void 0;\r\n    exports.a = 10;\r\n    var aLocal = 10;\r\n    var aa = 10;\r\n    exports.aaa = 10;\r\n});\r\ndefine(\"b\", [\"require\", \"exports\"], function (require, exports) {\r\n    \"use strict\";\r\n    exports.__esModule = true;\r\n    exports.b = void 0;\r\n    exports.b = 10;\r\n    var bLocal = 10;\r\n});\r\ndefine(\"c\", [\"require\", \"exports\", \"a\"], function (require, exports, a_1) {\r\n    \"use strict\";\r\n    exports.__esModule = true;\r\n    exports.c = void 0;\r\n    exports.c = a_1.a;\r\n});\r\ndefine(\"d\", [\"require\", \"exports\", \"b\"], function (require, exports, b_1) {\r\n    \"use strict\";\r\n    exports.__esModule = true;\r\n    exports.d = void 0;\r\n    exports.d = b_1.b;\r\n});\r\n"
    },
    "dts": {
      "sections": [
        {
          "pos": 0,
          "end": 232,
          "kind": "text"
        }
      ],
      "hash": "18384476281-declare module \"a\" {\r\n    export const a = 10;\r\n    export const aaa = 10;\r\n}\r\ndeclare module \"b\" {\r\n    export const b = 10;\r\n}\r\ndeclare module \"c\" {\r\n    export const c = 10;\r\n}\r\ndeclare module \"d\" {\r\n    export const d = 10;\r\n}\r\n"
    }
  },
  "program": {
    "fileInfos": {
      "../../lib/lib.d.ts": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
      "./src/a.ts": "-6435489413-export const a = 10;const aLocal = 10;const aa = 10;export const aaa = 10;",
      "./src/b.ts": "-6189287562-export const b = 10;const bLocal = 10;",
      "./src/c.ts": "3248317647-import { a } from \"./a\";export const c = a;",
      "./src/d.ts": "-19615769517-import { b } from \"./b\";export const d = b;"
    },
    "options": {
      "composite": true,
      "module": 2,
      "outFile": "./outFile.js"
    },
    "outSignature": "18384476281-declare module \"a\" {\r\n    export const a = 10;\r\n    export const aaa = 10;\r\n}\r\ndeclare module \"b\" {\r\n    export const b = 10;\r\n}\r\ndeclare module \"c\" {\r\n    export const c = 10;\r\n}\r\ndeclare module \"d\" {\r\n    export const d = 10;\r\n}\r\n",
    "latestChangedDtsFile": "FakeFileName"
  },
  "version": "FakeTSVersion"
}
File: /src/project1/outfile.tsbuildinfo.baseline.txt
CleanBuild:
======================================================================
File:: /src/project1/outFile.d.ts
----------------------------------------------------------------------
text: (0-232)
declare module "a" {
    export const a = 10;
    export const aaa = 10;
}
declare module "b" {
    export const b = 10;
}
declare module "c" {
    export const c = 10;
}
declare module "d" {
    export const d = 10;
}

======================================================================
IncrementalBuild:
======================================================================
File:: /src/project1/outFile.js
----------------------------------------------------------------------
text: (0-801)
define("a", ["require", "exports"], function (require, exports) {
    "use strict";
    exports.__esModule = true;
    exports.aaa = exports.a = void 0;
    exports.a = 10;
    var aLocal = 10;
    var aa = 10;
    exports.aaa = 10;
});
define("b", ["require", "exports"], function (require, exports) {
    "use strict";
    exports.__esModule = true;
    exports.b = void 0;
    exports.b = 10;
    var bLocal = 10;
});
define("c", ["require", "exports", "a"], function (require, exports, a_1) {
    "use strict";
    exports.__esModule = true;
    exports.c = void 0;
    exports.c = a_1.a;
});
define("d", ["require", "exports", "b"], function (require, exports, b_1) {
    "use strict";
    exports.__esModule = true;
    exports.d = void 0;
    exports.d = b_1.b;
});

======================================================================
======================================================================
File:: /src/project1/outFile.d.ts
----------------------------------------------------------------------
text: (0-232)
declare module "a" {
    export const a = 10;
    export const aaa = 10;
}
declare module "b" {
    export const b = 10;
}
declare module "c" {
    export const c = 10;
}
declare module "d" {
    export const d = 10;
}

======================================================================
TsBuild info text without affectedFilesPendingEmit:: /src/project2/outfile.tsbuildinfo.readable.baseline.txt::
CleanBuild:
{
  "bundle": {
    "commonSourceDirectory": "./src",
    "sourceFiles": [
      "./src/e.ts",
      "./src/f.ts",
      "./src/g.ts"
    ],
    "dts": {
      "sections": [
        {
          "pos": 0,
          "end": 153,
          "kind": "text"
        }
      ],
      "hash": "-13732890156-declare module \"e\" {\r\n    export const e = 10;\r\n}\r\ndeclare module \"f\" {\r\n    export const f = 10;\r\n}\r\ndeclare module \"g\" {\r\n    export const g = 10;\r\n}\r\n"
    }
  },
  "program": {
    "fileInfos": {
      "../../lib/lib.d.ts": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
      "../project1/outfile.d.ts": "18384476281-declare module \"a\" {\r\n    export const a = 10;\r\n    export const aaa = 10;\r\n}\r\ndeclare module \"b\" {\r\n    export const b = 10;\r\n}\r\ndeclare module \"c\" {\r\n    export const c = 10;\r\n}\r\ndeclare module \"d\" {\r\n    export const d = 10;\r\n}\r\n",
      "./src/e.ts": "-13789510868-export const e = 10;",
      "./src/f.ts": "-4849089835-import { a } from \"a\"; export const f = a;",
      "./src/g.ts": "-18341999015-import { b } from \"b\"; export const g = b;"
    },
    "options": {
      "composite": true,
      "emitDeclarationOnly": true,
      "module": 2,
      "outFile": "./outFile.js"
    },
    "outSignature": "-13732890156-declare module \"e\" {\r\n    export const e = 10;\r\n}\r\ndeclare module \"f\" {\r\n    export const f = 10;\r\n}\r\ndeclare module \"g\" {\r\n    export const g = 10;\r\n}\r\n",
    "latestChangedDtsFile": "FakeFileName"
  },
  "version": "FakeTSVersion"
}
IncrementalBuild:
{
  "bundle": {
    "commonSourceDirectory": "./src",
    "sourceFiles": [
      "./src/e.ts",
      "./src/f.ts",
      "./src/g.ts"
    ],
    "js": {
      "sections": [
        {
          "pos": 0,
          "end": 533,
          "kind": "text"
        }
      ],
      "hash": "-7709210320-define(\"e\", [\"require\", \"exports\"], function (require, exports) {\r\n    \"use strict\";\r\n    exports.__esModule = true;\r\n    exports.e = void 0;\r\n    exports.e = 10;\r\n});\r\ndefine(\"f\", [\"require\", \"exports\", \"a\"], function (require, exports, a_1) {\r\n    \"use strict\";\r\n    exports.__esModule = true;\r\n    exports.f = void 0;\r\n    exports.f = a_1.a;\r\n});\r\ndefine(\"g\", [\"require\", \"exports\", \"b\"], function (require, exports, b_1) {\r\n    \"use strict\";\r\n    exports.__esModule = true;\r\n    exports.g = void 0;\r\n    exports.g = b_1.b;\r\n});\r\n"
    },
    "dts": {
      "sections": [
        {
          "pos": 0,
          "end": 153,
          "kind": "text"
        }
      ],
      "hash": "-13732890156-declare module \"e\" {\r\n    export const e = 10;\r\n}\r\ndeclare module \"f\" {\r\n    export const f = 10;\r\n}\r\ndeclare module \"g\" {\r\n    export const g = 10;\r\n}\r\n"
    }
  },
  "program": {
    "fileInfos": {
      "../../lib/lib.d.ts": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
      "../project1/outfile.d.ts": "18384476281-declare module \"a\" {\r\n    export const a = 10;\r\n    export const aaa = 10;\r\n}\r\ndeclare module \"b\" {\r\n    export const b = 10;\r\n}\r\ndeclare module \"c\" {\r\n    export const c = 10;\r\n}\r\ndeclare module \"d\" {\r\n    export const d = 10;\r\n}\r\n",
      "./src/e.ts": "-13789510868-export const e = 10;",
      "./src/f.ts": "-4849089835-import { a } from \"a\"; export const f = a;",
      "./src/g.ts": "-18341999015-import { b } from \"b\"; export const g = b;"
    },
    "options": {
      "composite": true,
      "module": 2,
      "outFile": "./outFile.js"
    },
    "outSignature": "-13732890156-declare module \"e\" {\r\n    export const e = 10;\r\n}\r\ndeclare module \"f\" {\r\n    export const f = 10;\r\n}\r\ndeclare module \"g\" {\r\n    export const g = 10;\r\n}\r\n",
    "latestChangedDtsFile": "FakeFileName"
  },
  "version": "FakeTSVersion"
}
File: /src/project2/outfile.tsbuildinfo.baseline.txt
CleanBuild:
======================================================================
File:: /src/project2/outFile.d.ts
----------------------------------------------------------------------
text: (0-153)
declare module "e" {
    export const e = 10;
}
declare module "f" {
    export const f = 10;
}
declare module "g" {
    export const g = 10;
}

======================================================================
IncrementalBuild:
======================================================================
File:: /src/project2/outFile.js
----------------------------------------------------------------------
text: (0-533)
define("e", ["require", "exports"], function (require, exports) {
    "use strict";
    exports.__esModule = true;
    exports.e = void 0;
    exports.e = 10;
});
define("f", ["require", "exports", "a"], function (require, exports, a_1) {
    "use strict";
    exports.__esModule = true;
    exports.f = void 0;
    exports.f = a_1.a;
});
define("g", ["require", "exports", "b"], function (require, exports, b_1) {
    "use strict";
    exports.__esModule = true;
    exports.g = void 0;
    exports.g = b_1.b;
});

======================================================================
======================================================================
File:: /src/project2/outFile.d.ts
----------------------------------------------------------------------
text: (0-153)
declare module "e" {
    export const e = 10;
}
declare module "f" {
    export const f = 10;
}
declare module "g" {
    export const g = 10;
}

======================================================================
6:: local change
Clean build tsbuildinfo for project2 will have compilerOptions with composite and emitDeclarationOnly
Incremental build will detect that it doesnt need to rebuild project2 so tsbuildinfo for it is from before which has option composite only
TsBuild info text without affectedFilesPendingEmit:: /src/project2/outfile.tsbuildinfo.readable.baseline.txt::
CleanBuild:
{
  "bundle": {
    "commonSourceDirectory": "./src",
    "sourceFiles": [
      "./src/e.ts",
      "./src/f.ts",
      "./src/g.ts"
    ],
    "dts": {
      "sections": [
        {
          "pos": 0,
          "end": 153,
          "kind": "text"
        }
      ],
      "hash": "-13732890156-declare module \"e\" {\r\n    export const e = 10;\r\n}\r\ndeclare module \"f\" {\r\n    export const f = 10;\r\n}\r\ndeclare module \"g\" {\r\n    export const g = 10;\r\n}\r\n"
    }
  },
  "program": {
    "fileInfos": {
      "../../lib/lib.d.ts": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
      "../project1/outfile.d.ts": "18384476281-declare module \"a\" {\r\n    export const a = 10;\r\n    export const aaa = 10;\r\n}\r\ndeclare module \"b\" {\r\n    export const b = 10;\r\n}\r\ndeclare module \"c\" {\r\n    export const c = 10;\r\n}\r\ndeclare module \"d\" {\r\n    export const d = 10;\r\n}\r\n",
      "./src/e.ts": "-13789510868-export const e = 10;",
      "./src/f.ts": "-4849089835-import { a } from \"a\"; export const f = a;",
      "./src/g.ts": "-18341999015-import { b } from \"b\"; export const g = b;"
    },
    "options": {
      "composite": true,
      "emitDeclarationOnly": true,
      "module": 2,
      "outFile": "./outFile.js"
    },
    "outSignature": "-13732890156-declare module \"e\" {\r\n    export const e = 10;\r\n}\r\ndeclare module \"f\" {\r\n    export const f = 10;\r\n}\r\ndeclare module \"g\" {\r\n    export const g = 10;\r\n}\r\n",
    "latestChangedDtsFile": "FakeFileName"
  },
  "version": "FakeTSVersion"
}
IncrementalBuild:
{
  "bundle": {
    "commonSourceDirectory": "./src",
    "sourceFiles": [
      "./src/e.ts",
      "./src/f.ts",
      "./src/g.ts"
    ],
    "js": {
      "sections": [
        {
          "pos": 0,
          "end": 533,
          "kind": "text"
        }
      ],
      "hash": "-7709210320-define(\"e\", [\"require\", \"exports\"], function (require, exports) {\r\n    \"use strict\";\r\n    exports.__esModule = true;\r\n    exports.e = void 0;\r\n    exports.e = 10;\r\n});\r\ndefine(\"f\", [\"require\", \"exports\", \"a\"], function (require, exports, a_1) {\r\n    \"use strict\";\r\n    exports.__esModule = true;\r\n    exports.f = void 0;\r\n    exports.f = a_1.a;\r\n});\r\ndefine(\"g\", [\"require\", \"exports\", \"b\"], function (require, exports, b_1) {\r\n    \"use strict\";\r\n    exports.__esModule = true;\r\n    exports.g = void 0;\r\n    exports.g = b_1.b;\r\n});\r\n"
    },
    "dts": {
      "sections": [
        {
          "pos": 0,
          "end": 153,
          "kind": "text"
        }
      ],
      "hash": "-13732890156-declare module \"e\" {\r\n    export const e = 10;\r\n}\r\ndeclare module \"f\" {\r\n    export const f = 10;\r\n}\r\ndeclare module \"g\" {\r\n    export const g = 10;\r\n}\r\n"
    }
  },
  "program": {
    "fileInfos": {
      "../../lib/lib.d.ts": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
      "../project1/outfile.d.ts": "18384476281-declare module \"a\" {\r\n    export const a = 10;\r\n    export const aaa = 10;\r\n}\r\ndeclare module \"b\" {\r\n    export const b = 10;\r\n}\r\ndeclare module \"c\" {\r\n    export const c = 10;\r\n}\r\ndeclare module \"d\" {\r\n    export const d = 10;\r\n}\r\n",
      "./src/e.ts": "-13789510868-export const e = 10;",
      "./src/f.ts": "-4849089835-import { a } from \"a\"; export const f = a;",
      "./src/g.ts": "-18341999015-import { b } from \"b\"; export const g = b;"
    },
    "options": {
      "composite": true,
      "module": 2,
      "outFile": "./outFile.js"
    },
    "outSignature": "-13732890156-declare module \"e\" {\r\n    export const e = 10;\r\n}\r\ndeclare module \"f\" {\r\n    export const f = 10;\r\n}\r\ndeclare module \"g\" {\r\n    export const g = 10;\r\n}\r\n",
    "latestChangedDtsFile": "FakeFileName"
  },
  "version": "FakeTSVersion"
}
File: /src/project2/outfile.tsbuildinfo.baseline.txt
CleanBuild:
======================================================================
File:: /src/project2/outFile.d.ts
----------------------------------------------------------------------
text: (0-153)
declare module "e" {
    export const e = 10;
}
declare module "f" {
    export const f = 10;
}
declare module "g" {
    export const g = 10;
}

======================================================================
IncrementalBuild:
======================================================================
File:: /src/project2/outFile.js
----------------------------------------------------------------------
text: (0-533)
define("e", ["require", "exports"], function (require, exports) {
    "use strict";
    exports.__esModule = true;
    exports.e = void 0;
    exports.e = 10;
});
define("f", ["require", "exports", "a"], function (require, exports, a_1) {
    "use strict";
    exports.__esModule = true;
    exports.f = void 0;
    exports.f = a_1.a;
});
define("g", ["require", "exports", "b"], function (require, exports, b_1) {
    "use strict";
    exports.__esModule = true;
    exports.g = void 0;
    exports.g = b_1.b;
});

======================================================================
======================================================================
File:: /src/project2/outFile.d.ts
----------------------------------------------------------------------
text: (0-153)
declare module "e" {
    export const e = 10;
}
declare module "f" {
    export const f = 10;
}
declare module "g" {
    export const g = 10;
}

======================================================================