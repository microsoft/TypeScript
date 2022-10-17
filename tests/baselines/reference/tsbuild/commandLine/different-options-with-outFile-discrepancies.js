0:: with sourceMap
*** Needs explanation
File: /src/outfile.js.map
CleanBuild:
{"version":3,"file":"outFile.js","sourceRoot":"","sources":["project/a.ts","project/b.ts","project/c.ts","project/d.ts"],"names":[],"mappings":";;;;IAAa,QAAA,CAAC,GAAG,EAAE,CAAC;IAAA,IAAM,MAAM,GAAG,EAAE,CAAC;;;;;;ICAzB,QAAA,CAAC,GAAG,EAAE,CAAC;IAAA,IAAM,MAAM,GAAG,EAAE,CAAC;;;;;;ICAD,QAAA,CAAC,GAAG,KAAC,CAAC;;;;;;ICAN,QAAA,CAAC,GAAG,KAAC,CAAC"}
IncrementalBuild:

File: /src/outfile.js
CleanBuild:
define("a", ["require", "exports"], function (require, exports) {
    "use strict";
    exports.__esModule = true;
    exports.a = void 0;
    exports.a = 10;
    var aLocal = 10;
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
//# sourceMappingURL=outFile.js.map
IncrementalBuild:
define("a", ["require", "exports"], function (require, exports) {
    "use strict";
    exports.__esModule = true;
    exports.a = void 0;
    exports.a = 10;
    var aLocal = 10;
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

TsBuild info text without affectedFilesPendingEmit:: /src/outfile.tsbuildinfo.readable.baseline.txt::
CleanBuild:
{
  "bundle": {
    "commonSourceDirectory": "./project",
    "sourceFiles": [
      "./project/a.ts",
      "./project/b.ts",
      "./project/c.ts",
      "./project/d.ts"
    ],
    "js": {
      "sections": [
        {
          "pos": 0,
          "end": 746,
          "kind": "text"
        }
      ],
      "hash": "-1376850883-define(\"a\", [\"require\", \"exports\"], function (require, exports) {\r\n    \"use strict\";\r\n    exports.__esModule = true;\r\n    exports.a = void 0;\r\n    exports.a = 10;\r\n    var aLocal = 10;\r\n});\r\ndefine(\"b\", [\"require\", \"exports\"], function (require, exports) {\r\n    \"use strict\";\r\n    exports.__esModule = true;\r\n    exports.b = void 0;\r\n    exports.b = 10;\r\n    var bLocal = 10;\r\n});\r\ndefine(\"c\", [\"require\", \"exports\", \"a\"], function (require, exports, a_1) {\r\n    \"use strict\";\r\n    exports.__esModule = true;\r\n    exports.c = void 0;\r\n    exports.c = a_1.a;\r\n});\r\ndefine(\"d\", [\"require\", \"exports\", \"b\"], function (require, exports, b_1) {\r\n    \"use strict\";\r\n    exports.__esModule = true;\r\n    exports.d = void 0;\r\n    exports.d = b_1.b;\r\n});\r\n//# sourceMappingURL=outFile.js.map",
      "mapHash": "-9121204548-{\"version\":3,\"file\":\"outFile.js\",\"sourceRoot\":\"\",\"sources\":[\"project/a.ts\",\"project/b.ts\",\"project/c.ts\",\"project/d.ts\"],\"names\":[],\"mappings\":\";;;;IAAa,QAAA,CAAC,GAAG,EAAE,CAAC;IAAA,IAAM,MAAM,GAAG,EAAE,CAAC;;;;;;ICAzB,QAAA,CAAC,GAAG,EAAE,CAAC;IAAA,IAAM,MAAM,GAAG,EAAE,CAAC;;;;;;ICAD,QAAA,CAAC,GAAG,KAAC,CAAC;;;;;;ICAN,QAAA,CAAC,GAAG,KAAC,CAAC\"}"
    },
    "dts": {
      "sections": [
        {
          "pos": 0,
          "end": 204,
          "kind": "text"
        }
      ],
      "hash": "-10569306755-declare module \"a\" {\r\n    export const a = 10;\r\n}\r\ndeclare module \"b\" {\r\n    export const b = 10;\r\n}\r\ndeclare module \"c\" {\r\n    export const c = 10;\r\n}\r\ndeclare module \"d\" {\r\n    export const d = 10;\r\n}\r\n"
    }
  },
  "program": {
    "fileInfos": {
      "./project/a.ts": "-18487752940-export const a = 10;const aLocal = 10;",
      "./project/b.ts": "-6189287562-export const b = 10;const bLocal = 10;",
      "./project/c.ts": "3248317647-import { a } from \"./a\";export const c = a;",
      "./project/d.ts": "-19615769517-import { b } from \"./b\";export const d = b;"
    },
    "options": {
      "composite": true,
      "outFile": "./outFile.js"
    },
    "outSignature": "-10569306755-declare module \"a\" {\r\n    export const a = 10;\r\n}\r\ndeclare module \"b\" {\r\n    export const b = 10;\r\n}\r\ndeclare module \"c\" {\r\n    export const c = 10;\r\n}\r\ndeclare module \"d\" {\r\n    export const d = 10;\r\n}\r\n",
    "latestChangedDtsFile": "FakeFileName"
  },
  "version": "FakeTSVersion"
}
IncrementalBuild:
{
  "bundle": {
    "commonSourceDirectory": "./project",
    "sourceFiles": [
      "./project/a.ts",
      "./project/b.ts",
      "./project/c.ts",
      "./project/d.ts"
    ],
    "js": {
      "sections": [
        {
          "pos": 0,
          "end": 746,
          "kind": "text"
        }
      ],
      "hash": "73318240-define(\"a\", [\"require\", \"exports\"], function (require, exports) {\r\n    \"use strict\";\r\n    exports.__esModule = true;\r\n    exports.a = void 0;\r\n    exports.a = 10;\r\n    var aLocal = 10;\r\n});\r\ndefine(\"b\", [\"require\", \"exports\"], function (require, exports) {\r\n    \"use strict\";\r\n    exports.__esModule = true;\r\n    exports.b = void 0;\r\n    exports.b = 10;\r\n    var bLocal = 10;\r\n});\r\ndefine(\"c\", [\"require\", \"exports\", \"a\"], function (require, exports, a_1) {\r\n    \"use strict\";\r\n    exports.__esModule = true;\r\n    exports.c = void 0;\r\n    exports.c = a_1.a;\r\n});\r\ndefine(\"d\", [\"require\", \"exports\", \"b\"], function (require, exports, b_1) {\r\n    \"use strict\";\r\n    exports.__esModule = true;\r\n    exports.d = void 0;\r\n    exports.d = b_1.b;\r\n});\r\n"
    },
    "dts": {
      "sections": [
        {
          "pos": 0,
          "end": 204,
          "kind": "text"
        }
      ],
      "hash": "-10569306755-declare module \"a\" {\r\n    export const a = 10;\r\n}\r\ndeclare module \"b\" {\r\n    export const b = 10;\r\n}\r\ndeclare module \"c\" {\r\n    export const c = 10;\r\n}\r\ndeclare module \"d\" {\r\n    export const d = 10;\r\n}\r\n"
    }
  },
  "program": {
    "fileInfos": {
      "./project/a.ts": "-18487752940-export const a = 10;const aLocal = 10;",
      "./project/b.ts": "-6189287562-export const b = 10;const bLocal = 10;",
      "./project/c.ts": "3248317647-import { a } from \"./a\";export const c = a;",
      "./project/d.ts": "-19615769517-import { b } from \"./b\";export const d = b;"
    },
    "options": {
      "composite": true,
      "outFile": "./outFile.js"
    },
    "outSignature": "-10569306755-declare module \"a\" {\r\n    export const a = 10;\r\n}\r\ndeclare module \"b\" {\r\n    export const b = 10;\r\n}\r\ndeclare module \"c\" {\r\n    export const c = 10;\r\n}\r\ndeclare module \"d\" {\r\n    export const d = 10;\r\n}\r\n",
    "latestChangedDtsFile": "FakeFileName"
  },
  "version": "FakeTSVersion"
}
2:: with declaration should not emit anything
Clean build tsbuildinfo will have compilerOptions with composite and declaration
Incremental build will detect that it doesnt need to rebuild so tsbuild info is from before which has option composite only
*** Supplied discrepancy explanation but didnt file any difference
4:: with declaration and declarationMap
*** Needs explanation
File: /src/outfile.d.ts.map
CleanBuild:
{"version":3,"file":"outFile.d.ts","sourceRoot":"","sources":["project/a.ts","project/b.ts","project/c.ts","project/d.ts"],"names":[],"mappings":";IAAA,MAAM,CAAC,MAAM,CAAC,KAAK,CAAC;;;ICApB,MAAM,CAAC,MAAM,CAAC,KAAK,CAAC;;;ICAI,MAAM,CAAC,MAAM,CAAC,KAAI,CAAC;;;ICAnB,MAAM,CAAC,MAAM,CAAC,KAAI,CAAC"}
IncrementalBuild:

File: /src/outfile.d.ts
CleanBuild:
declare module "a" {
    export const a = 10;
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
//# sourceMappingURL=outFile.d.ts.map
IncrementalBuild:
declare module "a" {
    export const a = 10;
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

TsBuild info text without affectedFilesPendingEmit:: /src/outfile.tsbuildinfo.readable.baseline.txt::
CleanBuild:
{
  "bundle": {
    "commonSourceDirectory": "./project",
    "sourceFiles": [
      "./project/a.ts",
      "./project/b.ts",
      "./project/c.ts",
      "./project/d.ts"
    ],
    "js": {
      "sections": [
        {
          "pos": 0,
          "end": 746,
          "kind": "text"
        }
      ],
      "hash": "73318240-define(\"a\", [\"require\", \"exports\"], function (require, exports) {\r\n    \"use strict\";\r\n    exports.__esModule = true;\r\n    exports.a = void 0;\r\n    exports.a = 10;\r\n    var aLocal = 10;\r\n});\r\ndefine(\"b\", [\"require\", \"exports\"], function (require, exports) {\r\n    \"use strict\";\r\n    exports.__esModule = true;\r\n    exports.b = void 0;\r\n    exports.b = 10;\r\n    var bLocal = 10;\r\n});\r\ndefine(\"c\", [\"require\", \"exports\", \"a\"], function (require, exports, a_1) {\r\n    \"use strict\";\r\n    exports.__esModule = true;\r\n    exports.c = void 0;\r\n    exports.c = a_1.a;\r\n});\r\ndefine(\"d\", [\"require\", \"exports\", \"b\"], function (require, exports, b_1) {\r\n    \"use strict\";\r\n    exports.__esModule = true;\r\n    exports.d = void 0;\r\n    exports.d = b_1.b;\r\n});\r\n"
    },
    "dts": {
      "sections": [
        {
          "pos": 0,
          "end": 204,
          "kind": "text"
        }
      ],
      "hash": "-9598548394-declare module \"a\" {\r\n    export const a = 10;\r\n}\r\ndeclare module \"b\" {\r\n    export const b = 10;\r\n}\r\ndeclare module \"c\" {\r\n    export const c = 10;\r\n}\r\ndeclare module \"d\" {\r\n    export const d = 10;\r\n}\r\n//# sourceMappingURL=outFile.d.ts.map",
      "mapHash": "-4599397025-{\"version\":3,\"file\":\"outFile.d.ts\",\"sourceRoot\":\"\",\"sources\":[\"project/a.ts\",\"project/b.ts\",\"project/c.ts\",\"project/d.ts\"],\"names\":[],\"mappings\":\";IAAA,MAAM,CAAC,MAAM,CAAC,KAAK,CAAC;;;ICApB,MAAM,CAAC,MAAM,CAAC,KAAK,CAAC;;;ICAI,MAAM,CAAC,MAAM,CAAC,KAAI,CAAC;;;ICAnB,MAAM,CAAC,MAAM,CAAC,KAAI,CAAC\"}"
    }
  },
  "program": {
    "fileInfos": {
      "./project/a.ts": "-18487752940-export const a = 10;const aLocal = 10;",
      "./project/b.ts": "-6189287562-export const b = 10;const bLocal = 10;",
      "./project/c.ts": "3248317647-import { a } from \"./a\";export const c = a;",
      "./project/d.ts": "-19615769517-import { b } from \"./b\";export const d = b;"
    },
    "options": {
      "composite": true,
      "outFile": "./outFile.js"
    },
    "outSignature": "-10569306755-declare module \"a\" {\r\n    export const a = 10;\r\n}\r\ndeclare module \"b\" {\r\n    export const b = 10;\r\n}\r\ndeclare module \"c\" {\r\n    export const c = 10;\r\n}\r\ndeclare module \"d\" {\r\n    export const d = 10;\r\n}\r\n",
    "latestChangedDtsFile": "FakeFileName"
  },
  "version": "FakeTSVersion"
}
IncrementalBuild:
{
  "bundle": {
    "commonSourceDirectory": "./project",
    "sourceFiles": [
      "./project/a.ts",
      "./project/b.ts",
      "./project/c.ts",
      "./project/d.ts"
    ],
    "js": {
      "sections": [
        {
          "pos": 0,
          "end": 746,
          "kind": "text"
        }
      ],
      "hash": "73318240-define(\"a\", [\"require\", \"exports\"], function (require, exports) {\r\n    \"use strict\";\r\n    exports.__esModule = true;\r\n    exports.a = void 0;\r\n    exports.a = 10;\r\n    var aLocal = 10;\r\n});\r\ndefine(\"b\", [\"require\", \"exports\"], function (require, exports) {\r\n    \"use strict\";\r\n    exports.__esModule = true;\r\n    exports.b = void 0;\r\n    exports.b = 10;\r\n    var bLocal = 10;\r\n});\r\ndefine(\"c\", [\"require\", \"exports\", \"a\"], function (require, exports, a_1) {\r\n    \"use strict\";\r\n    exports.__esModule = true;\r\n    exports.c = void 0;\r\n    exports.c = a_1.a;\r\n});\r\ndefine(\"d\", [\"require\", \"exports\", \"b\"], function (require, exports, b_1) {\r\n    \"use strict\";\r\n    exports.__esModule = true;\r\n    exports.d = void 0;\r\n    exports.d = b_1.b;\r\n});\r\n"
    },
    "dts": {
      "sections": [
        {
          "pos": 0,
          "end": 204,
          "kind": "text"
        }
      ],
      "hash": "-10569306755-declare module \"a\" {\r\n    export const a = 10;\r\n}\r\ndeclare module \"b\" {\r\n    export const b = 10;\r\n}\r\ndeclare module \"c\" {\r\n    export const c = 10;\r\n}\r\ndeclare module \"d\" {\r\n    export const d = 10;\r\n}\r\n"
    }
  },
  "program": {
    "fileInfos": {
      "./project/a.ts": "-18487752940-export const a = 10;const aLocal = 10;",
      "./project/b.ts": "-6189287562-export const b = 10;const bLocal = 10;",
      "./project/c.ts": "3248317647-import { a } from \"./a\";export const c = a;",
      "./project/d.ts": "-19615769517-import { b } from \"./b\";export const d = b;"
    },
    "options": {
      "composite": true,
      "outFile": "./outFile.js"
    },
    "outSignature": "-10569306755-declare module \"a\" {\r\n    export const a = 10;\r\n}\r\ndeclare module \"b\" {\r\n    export const b = 10;\r\n}\r\ndeclare module \"c\" {\r\n    export const c = 10;\r\n}\r\ndeclare module \"d\" {\r\n    export const d = 10;\r\n}\r\n",
    "latestChangedDtsFile": "FakeFileName"
  },
  "version": "FakeTSVersion"
}
6:: with emitDeclarationOnly should not emit anything
Clean build tsbuildinfo will have compilerOptions with composite and emitDeclarationOnly
Incremental build will detect that it doesnt need to rebuild so tsbuild info is from before which has option composite only
Clean build info does not have js section because its fresh build
Incremental build info has js section from old build
TsBuild info text without affectedFilesPendingEmit:: /src/outfile.tsbuildinfo.readable.baseline.txt::
CleanBuild:
{
  "bundle": {
    "commonSourceDirectory": "./project",
    "sourceFiles": [
      "./project/a.ts",
      "./project/b.ts",
      "./project/c.ts",
      "./project/d.ts"
    ],
    "dts": {
      "sections": [
        {
          "pos": 0,
          "end": 204,
          "kind": "text"
        }
      ],
      "hash": "-10569306755-declare module \"a\" {\r\n    export const a = 10;\r\n}\r\ndeclare module \"b\" {\r\n    export const b = 10;\r\n}\r\ndeclare module \"c\" {\r\n    export const c = 10;\r\n}\r\ndeclare module \"d\" {\r\n    export const d = 10;\r\n}\r\n"
    }
  },
  "program": {
    "fileInfos": {
      "./project/a.ts": "-18487752940-export const a = 10;const aLocal = 10;",
      "./project/b.ts": "-6189287562-export const b = 10;const bLocal = 10;",
      "./project/c.ts": "3248317647-import { a } from \"./a\";export const c = a;",
      "./project/d.ts": "-19615769517-import { b } from \"./b\";export const d = b;"
    },
    "options": {
      "composite": true,
      "outFile": "./outFile.js"
    },
    "outSignature": "-10569306755-declare module \"a\" {\r\n    export const a = 10;\r\n}\r\ndeclare module \"b\" {\r\n    export const b = 10;\r\n}\r\ndeclare module \"c\" {\r\n    export const c = 10;\r\n}\r\ndeclare module \"d\" {\r\n    export const d = 10;\r\n}\r\n",
    "latestChangedDtsFile": "FakeFileName"
  },
  "version": "FakeTSVersion"
}
IncrementalBuild:
{
  "bundle": {
    "commonSourceDirectory": "./project",
    "sourceFiles": [
      "./project/a.ts",
      "./project/b.ts",
      "./project/c.ts",
      "./project/d.ts"
    ],
    "js": {
      "sections": [
        {
          "pos": 0,
          "end": 746,
          "kind": "text"
        }
      ],
      "hash": "73318240-define(\"a\", [\"require\", \"exports\"], function (require, exports) {\r\n    \"use strict\";\r\n    exports.__esModule = true;\r\n    exports.a = void 0;\r\n    exports.a = 10;\r\n    var aLocal = 10;\r\n});\r\ndefine(\"b\", [\"require\", \"exports\"], function (require, exports) {\r\n    \"use strict\";\r\n    exports.__esModule = true;\r\n    exports.b = void 0;\r\n    exports.b = 10;\r\n    var bLocal = 10;\r\n});\r\ndefine(\"c\", [\"require\", \"exports\", \"a\"], function (require, exports, a_1) {\r\n    \"use strict\";\r\n    exports.__esModule = true;\r\n    exports.c = void 0;\r\n    exports.c = a_1.a;\r\n});\r\ndefine(\"d\", [\"require\", \"exports\", \"b\"], function (require, exports, b_1) {\r\n    \"use strict\";\r\n    exports.__esModule = true;\r\n    exports.d = void 0;\r\n    exports.d = b_1.b;\r\n});\r\n"
    },
    "dts": {
      "sections": [
        {
          "pos": 0,
          "end": 204,
          "kind": "text"
        }
      ],
      "hash": "-10569306755-declare module \"a\" {\r\n    export const a = 10;\r\n}\r\ndeclare module \"b\" {\r\n    export const b = 10;\r\n}\r\ndeclare module \"c\" {\r\n    export const c = 10;\r\n}\r\ndeclare module \"d\" {\r\n    export const d = 10;\r\n}\r\n"
    }
  },
  "program": {
    "fileInfos": {
      "./project/a.ts": "-18487752940-export const a = 10;const aLocal = 10;",
      "./project/b.ts": "-6189287562-export const b = 10;const bLocal = 10;",
      "./project/c.ts": "3248317647-import { a } from \"./a\";export const c = a;",
      "./project/d.ts": "-19615769517-import { b } from \"./b\";export const d = b;"
    },
    "options": {
      "composite": true,
      "outFile": "./outFile.js"
    },
    "outSignature": "-10569306755-declare module \"a\" {\r\n    export const a = 10;\r\n}\r\ndeclare module \"b\" {\r\n    export const b = 10;\r\n}\r\ndeclare module \"c\" {\r\n    export const c = 10;\r\n}\r\ndeclare module \"d\" {\r\n    export const d = 10;\r\n}\r\n",
    "latestChangedDtsFile": "FakeFileName"
  },
  "version": "FakeTSVersion"
}
File: /src/outfile.tsbuildinfo.baseline.txt
CleanBuild:
======================================================================
File:: /src/outFile.d.ts
----------------------------------------------------------------------
text: (0-204)
declare module "a" {
    export const a = 10;
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
File:: /src/outFile.js
----------------------------------------------------------------------
text: (0-746)
define("a", ["require", "exports"], function (require, exports) {
    "use strict";
    exports.__esModule = true;
    exports.a = void 0;
    exports.a = 10;
    var aLocal = 10;
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
File:: /src/outFile.d.ts
----------------------------------------------------------------------
text: (0-204)
declare module "a" {
    export const a = 10;
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
9:: with declaration should not emit anything
Clean build tsbuildinfo will have compilerOptions with composite and declaration
Incremental build will detect that it doesnt need to rebuild so tsbuild info is from before which has option composite only
*** Supplied discrepancy explanation but didnt file any difference
10:: with inlineSourceMap
*** Needs explanation
File: /src/outfile.js
CleanBuild:
define("a", ["require", "exports"], function (require, exports) {
    "use strict";
    exports.__esModule = true;
    exports.a = void 0;
    exports.a = 10;
    var aLocal = 100;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3V0RmlsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInByb2plY3QvYS50cyIsInByb2plY3QvYi50cyIsInByb2plY3QvYy50cyIsInByb2plY3QvZC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0lBQWEsUUFBQSxDQUFDLEdBQUcsRUFBRSxDQUFDO0lBQUEsSUFBTSxNQUFNLEdBQUcsR0FBRyxDQUFDOzs7Ozs7SUNBMUIsUUFBQSxDQUFDLEdBQUcsRUFBRSxDQUFDO0lBQUEsSUFBTSxNQUFNLEdBQUcsRUFBRSxDQUFDOzs7Ozs7SUNBRCxRQUFBLENBQUMsR0FBRyxLQUFDLENBQUM7Ozs7OztJQ0FOLFFBQUEsQ0FBQyxHQUFHLEtBQUMsQ0FBQyJ9
IncrementalBuild:
define("a", ["require", "exports"], function (require, exports) {
    "use strict";
    exports.__esModule = true;
    exports.a = void 0;
    exports.a = 10;
    var aLocal = 100;
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

TsBuild info text without affectedFilesPendingEmit:: /src/outfile.tsbuildinfo.readable.baseline.txt::
CleanBuild:
{
  "bundle": {
    "commonSourceDirectory": "./project",
    "sourceFiles": [
      "./project/a.ts",
      "./project/b.ts",
      "./project/c.ts",
      "./project/d.ts"
    ],
    "js": {
      "sections": [
        {
          "pos": 0,
          "end": 747,
          "kind": "text"
        }
      ],
      "hash": "8055194958-define(\"a\", [\"require\", \"exports\"], function (require, exports) {\r\n    \"use strict\";\r\n    exports.__esModule = true;\r\n    exports.a = void 0;\r\n    exports.a = 10;\r\n    var aLocal = 100;\r\n});\r\ndefine(\"b\", [\"require\", \"exports\"], function (require, exports) {\r\n    \"use strict\";\r\n    exports.__esModule = true;\r\n    exports.b = void 0;\r\n    exports.b = 10;\r\n    var bLocal = 10;\r\n});\r\ndefine(\"c\", [\"require\", \"exports\", \"a\"], function (require, exports, a_1) {\r\n    \"use strict\";\r\n    exports.__esModule = true;\r\n    exports.c = void 0;\r\n    exports.c = a_1.a;\r\n});\r\ndefine(\"d\", [\"require\", \"exports\", \"b\"], function (require, exports, b_1) {\r\n    \"use strict\";\r\n    exports.__esModule = true;\r\n    exports.d = void 0;\r\n    exports.d = b_1.b;\r\n});\r\n//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3V0RmlsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInByb2plY3QvYS50cyIsInByb2plY3QvYi50cyIsInByb2plY3QvYy50cyIsInByb2plY3QvZC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0lBQWEsUUFBQSxDQUFDLEdBQUcsRUFBRSxDQUFDO0lBQUEsSUFBTSxNQUFNLEdBQUcsR0FBRyxDQUFDOzs7Ozs7SUNBMUIsUUFBQSxDQUFDLEdBQUcsRUFBRSxDQUFDO0lBQUEsSUFBTSxNQUFNLEdBQUcsRUFBRSxDQUFDOzs7Ozs7SUNBRCxRQUFBLENBQUMsR0FBRyxLQUFDLENBQUM7Ozs7OztJQ0FOLFFBQUEsQ0FBQyxHQUFHLEtBQUMsQ0FBQyJ9"
    },
    "dts": {
      "sections": [
        {
          "pos": 0,
          "end": 204,
          "kind": "text"
        }
      ],
      "hash": "-10569306755-declare module \"a\" {\r\n    export const a = 10;\r\n}\r\ndeclare module \"b\" {\r\n    export const b = 10;\r\n}\r\ndeclare module \"c\" {\r\n    export const c = 10;\r\n}\r\ndeclare module \"d\" {\r\n    export const d = 10;\r\n}\r\n"
    }
  },
  "program": {
    "fileInfos": {
      "./project/a.ts": "-17390360476-export const a = 10;const aLocal = 100;",
      "./project/b.ts": "-6189287562-export const b = 10;const bLocal = 10;",
      "./project/c.ts": "3248317647-import { a } from \"./a\";export const c = a;",
      "./project/d.ts": "-19615769517-import { b } from \"./b\";export const d = b;"
    },
    "options": {
      "composite": true,
      "outFile": "./outFile.js"
    },
    "outSignature": "-10569306755-declare module \"a\" {\r\n    export const a = 10;\r\n}\r\ndeclare module \"b\" {\r\n    export const b = 10;\r\n}\r\ndeclare module \"c\" {\r\n    export const c = 10;\r\n}\r\ndeclare module \"d\" {\r\n    export const d = 10;\r\n}\r\n",
    "latestChangedDtsFile": "FakeFileName"
  },
  "version": "FakeTSVersion"
}
IncrementalBuild:
{
  "bundle": {
    "commonSourceDirectory": "./project",
    "sourceFiles": [
      "./project/a.ts",
      "./project/b.ts",
      "./project/c.ts",
      "./project/d.ts"
    ],
    "js": {
      "sections": [
        {
          "pos": 0,
          "end": 747,
          "kind": "text"
        }
      ],
      "hash": "15496582544-define(\"a\", [\"require\", \"exports\"], function (require, exports) {\r\n    \"use strict\";\r\n    exports.__esModule = true;\r\n    exports.a = void 0;\r\n    exports.a = 10;\r\n    var aLocal = 100;\r\n});\r\ndefine(\"b\", [\"require\", \"exports\"], function (require, exports) {\r\n    \"use strict\";\r\n    exports.__esModule = true;\r\n    exports.b = void 0;\r\n    exports.b = 10;\r\n    var bLocal = 10;\r\n});\r\ndefine(\"c\", [\"require\", \"exports\", \"a\"], function (require, exports, a_1) {\r\n    \"use strict\";\r\n    exports.__esModule = true;\r\n    exports.c = void 0;\r\n    exports.c = a_1.a;\r\n});\r\ndefine(\"d\", [\"require\", \"exports\", \"b\"], function (require, exports, b_1) {\r\n    \"use strict\";\r\n    exports.__esModule = true;\r\n    exports.d = void 0;\r\n    exports.d = b_1.b;\r\n});\r\n"
    },
    "dts": {
      "sections": [
        {
          "pos": 0,
          "end": 204,
          "kind": "text"
        }
      ],
      "hash": "-10569306755-declare module \"a\" {\r\n    export const a = 10;\r\n}\r\ndeclare module \"b\" {\r\n    export const b = 10;\r\n}\r\ndeclare module \"c\" {\r\n    export const c = 10;\r\n}\r\ndeclare module \"d\" {\r\n    export const d = 10;\r\n}\r\n"
    }
  },
  "program": {
    "fileInfos": {
      "./project/a.ts": "-17390360476-export const a = 10;const aLocal = 100;",
      "./project/b.ts": "-6189287562-export const b = 10;const bLocal = 10;",
      "./project/c.ts": "3248317647-import { a } from \"./a\";export const c = a;",
      "./project/d.ts": "-19615769517-import { b } from \"./b\";export const d = b;"
    },
    "options": {
      "composite": true,
      "outFile": "./outFile.js"
    },
    "outSignature": "-10569306755-declare module \"a\" {\r\n    export const a = 10;\r\n}\r\ndeclare module \"b\" {\r\n    export const b = 10;\r\n}\r\ndeclare module \"c\" {\r\n    export const c = 10;\r\n}\r\ndeclare module \"d\" {\r\n    export const d = 10;\r\n}\r\n",
    "latestChangedDtsFile": "FakeFileName"
  },
  "version": "FakeTSVersion"
}
11:: with sourceMap
*** Needs explanation
File: /src/outfile.js.map
CleanBuild:
{"version":3,"file":"outFile.js","sourceRoot":"","sources":["project/a.ts","project/b.ts","project/c.ts","project/d.ts"],"names":[],"mappings":";;;;IAAa,QAAA,CAAC,GAAG,EAAE,CAAC;IAAA,IAAM,MAAM,GAAG,GAAG,CAAC;;;;;;ICA1B,QAAA,CAAC,GAAG,EAAE,CAAC;IAAA,IAAM,MAAM,GAAG,EAAE,CAAC;;;;;;ICAD,QAAA,CAAC,GAAG,KAAC,CAAC;;;;;;ICAN,QAAA,CAAC,GAAG,KAAC,CAAC"}
IncrementalBuild:

File: /src/outfile.js
CleanBuild:
define("a", ["require", "exports"], function (require, exports) {
    "use strict";
    exports.__esModule = true;
    exports.a = void 0;
    exports.a = 10;
    var aLocal = 100;
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
//# sourceMappingURL=outFile.js.map
IncrementalBuild:
define("a", ["require", "exports"], function (require, exports) {
    "use strict";
    exports.__esModule = true;
    exports.a = void 0;
    exports.a = 10;
    var aLocal = 100;
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

TsBuild info text without affectedFilesPendingEmit:: /src/outfile.tsbuildinfo.readable.baseline.txt::
CleanBuild:
{
  "bundle": {
    "commonSourceDirectory": "./project",
    "sourceFiles": [
      "./project/a.ts",
      "./project/b.ts",
      "./project/c.ts",
      "./project/d.ts"
    ],
    "js": {
      "sections": [
        {
          "pos": 0,
          "end": 747,
          "kind": "text"
        }
      ],
      "hash": "13909529709-define(\"a\", [\"require\", \"exports\"], function (require, exports) {\r\n    \"use strict\";\r\n    exports.__esModule = true;\r\n    exports.a = void 0;\r\n    exports.a = 10;\r\n    var aLocal = 100;\r\n});\r\ndefine(\"b\", [\"require\", \"exports\"], function (require, exports) {\r\n    \"use strict\";\r\n    exports.__esModule = true;\r\n    exports.b = void 0;\r\n    exports.b = 10;\r\n    var bLocal = 10;\r\n});\r\ndefine(\"c\", [\"require\", \"exports\", \"a\"], function (require, exports, a_1) {\r\n    \"use strict\";\r\n    exports.__esModule = true;\r\n    exports.c = void 0;\r\n    exports.c = a_1.a;\r\n});\r\ndefine(\"d\", [\"require\", \"exports\", \"b\"], function (require, exports, b_1) {\r\n    \"use strict\";\r\n    exports.__esModule = true;\r\n    exports.d = void 0;\r\n    exports.d = b_1.b;\r\n});\r\n//# sourceMappingURL=outFile.js.map",
      "mapHash": "-5541118281-{\"version\":3,\"file\":\"outFile.js\",\"sourceRoot\":\"\",\"sources\":[\"project/a.ts\",\"project/b.ts\",\"project/c.ts\",\"project/d.ts\"],\"names\":[],\"mappings\":\";;;;IAAa,QAAA,CAAC,GAAG,EAAE,CAAC;IAAA,IAAM,MAAM,GAAG,GAAG,CAAC;;;;;;ICA1B,QAAA,CAAC,GAAG,EAAE,CAAC;IAAA,IAAM,MAAM,GAAG,EAAE,CAAC;;;;;;ICAD,QAAA,CAAC,GAAG,KAAC,CAAC;;;;;;ICAN,QAAA,CAAC,GAAG,KAAC,CAAC\"}"
    },
    "dts": {
      "sections": [
        {
          "pos": 0,
          "end": 204,
          "kind": "text"
        }
      ],
      "hash": "-10569306755-declare module \"a\" {\r\n    export const a = 10;\r\n}\r\ndeclare module \"b\" {\r\n    export const b = 10;\r\n}\r\ndeclare module \"c\" {\r\n    export const c = 10;\r\n}\r\ndeclare module \"d\" {\r\n    export const d = 10;\r\n}\r\n"
    }
  },
  "program": {
    "fileInfos": {
      "./project/a.ts": "-17390360476-export const a = 10;const aLocal = 100;",
      "./project/b.ts": "-6189287562-export const b = 10;const bLocal = 10;",
      "./project/c.ts": "3248317647-import { a } from \"./a\";export const c = a;",
      "./project/d.ts": "-19615769517-import { b } from \"./b\";export const d = b;"
    },
    "options": {
      "composite": true,
      "outFile": "./outFile.js"
    },
    "outSignature": "-10569306755-declare module \"a\" {\r\n    export const a = 10;\r\n}\r\ndeclare module \"b\" {\r\n    export const b = 10;\r\n}\r\ndeclare module \"c\" {\r\n    export const c = 10;\r\n}\r\ndeclare module \"d\" {\r\n    export const d = 10;\r\n}\r\n",
    "latestChangedDtsFile": "FakeFileName"
  },
  "version": "FakeTSVersion"
}
IncrementalBuild:
{
  "bundle": {
    "commonSourceDirectory": "./project",
    "sourceFiles": [
      "./project/a.ts",
      "./project/b.ts",
      "./project/c.ts",
      "./project/d.ts"
    ],
    "js": {
      "sections": [
        {
          "pos": 0,
          "end": 747,
          "kind": "text"
        }
      ],
      "hash": "15496582544-define(\"a\", [\"require\", \"exports\"], function (require, exports) {\r\n    \"use strict\";\r\n    exports.__esModule = true;\r\n    exports.a = void 0;\r\n    exports.a = 10;\r\n    var aLocal = 100;\r\n});\r\ndefine(\"b\", [\"require\", \"exports\"], function (require, exports) {\r\n    \"use strict\";\r\n    exports.__esModule = true;\r\n    exports.b = void 0;\r\n    exports.b = 10;\r\n    var bLocal = 10;\r\n});\r\ndefine(\"c\", [\"require\", \"exports\", \"a\"], function (require, exports, a_1) {\r\n    \"use strict\";\r\n    exports.__esModule = true;\r\n    exports.c = void 0;\r\n    exports.c = a_1.a;\r\n});\r\ndefine(\"d\", [\"require\", \"exports\", \"b\"], function (require, exports, b_1) {\r\n    \"use strict\";\r\n    exports.__esModule = true;\r\n    exports.d = void 0;\r\n    exports.d = b_1.b;\r\n});\r\n"
    },
    "dts": {
      "sections": [
        {
          "pos": 0,
          "end": 204,
          "kind": "text"
        }
      ],
      "hash": "-10569306755-declare module \"a\" {\r\n    export const a = 10;\r\n}\r\ndeclare module \"b\" {\r\n    export const b = 10;\r\n}\r\ndeclare module \"c\" {\r\n    export const c = 10;\r\n}\r\ndeclare module \"d\" {\r\n    export const d = 10;\r\n}\r\n"
    }
  },
  "program": {
    "fileInfos": {
      "./project/a.ts": "-17390360476-export const a = 10;const aLocal = 100;",
      "./project/b.ts": "-6189287562-export const b = 10;const bLocal = 10;",
      "./project/c.ts": "3248317647-import { a } from \"./a\";export const c = a;",
      "./project/d.ts": "-19615769517-import { b } from \"./b\";export const d = b;"
    },
    "options": {
      "composite": true,
      "outFile": "./outFile.js"
    },
    "outSignature": "-10569306755-declare module \"a\" {\r\n    export const a = 10;\r\n}\r\ndeclare module \"b\" {\r\n    export const b = 10;\r\n}\r\ndeclare module \"c\" {\r\n    export const c = 10;\r\n}\r\ndeclare module \"d\" {\r\n    export const d = 10;\r\n}\r\n",
    "latestChangedDtsFile": "FakeFileName"
  },
  "version": "FakeTSVersion"
}