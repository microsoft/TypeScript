currentDirectory:: / useCaseSensitiveFileNames: false
Input::
//// [/lib/lib.d.ts]
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
interface ReadonlyArray<T> {}
declare const console: { log(msg: any): void; };

//// [/src/project/a.ts]
import {A} from "./c"
let a = A.ONE


//// [/src/project/b.d.ts]
declare const enum AWorker {
    ONE = 1
}
export { AWorker as A };


//// [/src/project/c.ts]
import {A} from "./b"
let b = A.ONE
export {A}


//// [/src/project/worker.d.ts]
export const enum AWorker {
    ONE = 1
}




Output::
/lib/tsc -i /src/project/a.ts --tsbuildinfofile /src/project/a.tsbuildinfo
exitCode:: ExitStatus.Success


//// [/src/project/a.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var a = 1 /* A.ONE */;


//// [/src/project/a.tsbuildinfo]
{"program":{"fileNames":["../../lib/lib.d.ts","./b.d.ts","./c.ts","./a.ts"],"fileInfos":[{"version":"3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true,"impliedFormat":1},{"version":"-8804827199-declare const enum AWorker {\n    ONE = 1\n}\nexport { AWorker as A };\n","impliedFormat":1},{"version":"-3548623266-import {A} from \"./b\"\nlet b = A.ONE\nexport {A}\n","impliedFormat":1},{"version":"-5009241479-import {A} from \"./c\"\nlet a = A.ONE\n","impliedFormat":1}],"root":[4],"options":{"tsBuildInfoFile":"./a.tsbuildinfo"},"fileIdsList":[[3],[2]],"referencedMap":[[4,1],[3,2]],"semanticDiagnosticsPerFile":[1,4,2,3]},"version":"FakeTSVersion"}

//// [/src/project/a.tsbuildinfo.readable.baseline.txt]
{
  "program": {
    "fileNames": [
      "../../lib/lib.d.ts",
      "./b.d.ts",
      "./c.ts",
      "./a.ts"
    ],
    "fileNamesList": [
      [
        "./c.ts"
      ],
      [
        "./b.d.ts"
      ]
    ],
    "fileInfos": {
      "../../lib/lib.d.ts": {
        "original": {
          "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
          "affectsGlobalScope": true,
          "impliedFormat": 1
        },
        "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "signature": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "affectsGlobalScope": true,
        "impliedFormat": "commonjs"
      },
      "./b.d.ts": {
        "original": {
          "version": "-8804827199-declare const enum AWorker {\n    ONE = 1\n}\nexport { AWorker as A };\n",
          "impliedFormat": 1
        },
        "version": "-8804827199-declare const enum AWorker {\n    ONE = 1\n}\nexport { AWorker as A };\n",
        "signature": "-8804827199-declare const enum AWorker {\n    ONE = 1\n}\nexport { AWorker as A };\n",
        "impliedFormat": "commonjs"
      },
      "./c.ts": {
        "original": {
          "version": "-3548623266-import {A} from \"./b\"\nlet b = A.ONE\nexport {A}\n",
          "impliedFormat": 1
        },
        "version": "-3548623266-import {A} from \"./b\"\nlet b = A.ONE\nexport {A}\n",
        "signature": "-3548623266-import {A} from \"./b\"\nlet b = A.ONE\nexport {A}\n",
        "impliedFormat": "commonjs"
      },
      "./a.ts": {
        "original": {
          "version": "-5009241479-import {A} from \"./c\"\nlet a = A.ONE\n",
          "impliedFormat": 1
        },
        "version": "-5009241479-import {A} from \"./c\"\nlet a = A.ONE\n",
        "signature": "-5009241479-import {A} from \"./c\"\nlet a = A.ONE\n",
        "impliedFormat": "commonjs"
      }
    },
    "root": [
      [
        4,
        "./a.ts"
      ]
    ],
    "options": {
      "tsBuildInfoFile": "./a.tsbuildinfo"
    },
    "referencedMap": {
      "./a.ts": [
        "./c.ts"
      ],
      "./c.ts": [
        "./b.d.ts"
      ]
    },
    "semanticDiagnosticsPerFile": [
      "../../lib/lib.d.ts",
      "./a.ts",
      "./b.d.ts",
      "./c.ts"
    ]
  },
  "version": "FakeTSVersion",
  "size": 1065
}

//// [/src/project/c.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var b = 1 /* A.ONE */;




Change:: change enum value
Input::
//// [/src/project/b.d.ts]
declare const enum AWorker {
    ONE = 2
}
export { AWorker as A };




Output::
/lib/tsc -i /src/project/a.ts --tsbuildinfofile /src/project/a.tsbuildinfo
exitCode:: ExitStatus.Success


//// [/src/project/a.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var a = 2 /* A.ONE */;


//// [/src/project/a.tsbuildinfo]
{"program":{"fileNames":["../../lib/lib.d.ts","./b.d.ts","./c.ts","./a.ts"],"fileInfos":[{"version":"3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true,"impliedFormat":1},{"version":"-13802607806-declare const enum AWorker {\n    ONE = 2\n}\nexport { AWorker as A };\n","impliedFormat":1},{"version":"-3548623266-import {A} from \"./b\"\nlet b = A.ONE\nexport {A}\n","signature":"3259150197-import { A } from \"./b\";\nexport { A };\n","impliedFormat":1},{"version":"-5009241479-import {A} from \"./c\"\nlet a = A.ONE\n","signature":"-3531856636-export {};\n","impliedFormat":1}],"root":[4],"options":{"tsBuildInfoFile":"./a.tsbuildinfo"},"fileIdsList":[[3],[2]],"referencedMap":[[4,1],[3,2]],"semanticDiagnosticsPerFile":[1,4,2,3]},"version":"FakeTSVersion"}

//// [/src/project/a.tsbuildinfo.readable.baseline.txt]
{
  "program": {
    "fileNames": [
      "../../lib/lib.d.ts",
      "./b.d.ts",
      "./c.ts",
      "./a.ts"
    ],
    "fileNamesList": [
      [
        "./c.ts"
      ],
      [
        "./b.d.ts"
      ]
    ],
    "fileInfos": {
      "../../lib/lib.d.ts": {
        "original": {
          "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
          "affectsGlobalScope": true,
          "impliedFormat": 1
        },
        "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "signature": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "affectsGlobalScope": true,
        "impliedFormat": "commonjs"
      },
      "./b.d.ts": {
        "original": {
          "version": "-13802607806-declare const enum AWorker {\n    ONE = 2\n}\nexport { AWorker as A };\n",
          "impliedFormat": 1
        },
        "version": "-13802607806-declare const enum AWorker {\n    ONE = 2\n}\nexport { AWorker as A };\n",
        "signature": "-13802607806-declare const enum AWorker {\n    ONE = 2\n}\nexport { AWorker as A };\n",
        "impliedFormat": "commonjs"
      },
      "./c.ts": {
        "original": {
          "version": "-3548623266-import {A} from \"./b\"\nlet b = A.ONE\nexport {A}\n",
          "signature": "3259150197-import { A } from \"./b\";\nexport { A };\n",
          "impliedFormat": 1
        },
        "version": "-3548623266-import {A} from \"./b\"\nlet b = A.ONE\nexport {A}\n",
        "signature": "3259150197-import { A } from \"./b\";\nexport { A };\n",
        "impliedFormat": "commonjs"
      },
      "./a.ts": {
        "original": {
          "version": "-5009241479-import {A} from \"./c\"\nlet a = A.ONE\n",
          "signature": "-3531856636-export {};\n",
          "impliedFormat": 1
        },
        "version": "-5009241479-import {A} from \"./c\"\nlet a = A.ONE\n",
        "signature": "-3531856636-export {};\n",
        "impliedFormat": "commonjs"
      }
    },
    "root": [
      [
        4,
        "./a.ts"
      ]
    ],
    "options": {
      "tsBuildInfoFile": "./a.tsbuildinfo"
    },
    "referencedMap": {
      "./a.ts": [
        "./c.ts"
      ],
      "./c.ts": [
        "./b.d.ts"
      ]
    },
    "semanticDiagnosticsPerFile": [
      "../../lib/lib.d.ts",
      "./a.ts",
      "./b.d.ts",
      "./c.ts"
    ]
  },
  "version": "FakeTSVersion",
  "size": 1174
}

//// [/src/project/c.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var b = 2 /* A.ONE */;




Change:: change enum value again
Input::
//// [/src/project/b.d.ts]
declare const enum AWorker {
    ONE = 3
}
export { AWorker as A };




Output::
/lib/tsc -i /src/project/a.ts --tsbuildinfofile /src/project/a.tsbuildinfo
exitCode:: ExitStatus.Success


//// [/src/project/a.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var a = 3 /* A.ONE */;


//// [/src/project/a.tsbuildinfo]
{"program":{"fileNames":["../../lib/lib.d.ts","./b.d.ts","./c.ts","./a.ts"],"fileInfos":[{"version":"3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true,"impliedFormat":1},{"version":"-10210453821-declare const enum AWorker {\n    ONE = 3\n}\nexport { AWorker as A };\n","impliedFormat":1},{"version":"-3548623266-import {A} from \"./b\"\nlet b = A.ONE\nexport {A}\n","signature":"3259150197-import { A } from \"./b\";\nexport { A };\n","impliedFormat":1},{"version":"-5009241479-import {A} from \"./c\"\nlet a = A.ONE\n","impliedFormat":1}],"root":[4],"options":{"tsBuildInfoFile":"./a.tsbuildinfo"},"fileIdsList":[[3],[2]],"referencedMap":[[4,1],[3,2]],"semanticDiagnosticsPerFile":[1,4,2,3]},"version":"FakeTSVersion"}

//// [/src/project/a.tsbuildinfo.readable.baseline.txt]
{
  "program": {
    "fileNames": [
      "../../lib/lib.d.ts",
      "./b.d.ts",
      "./c.ts",
      "./a.ts"
    ],
    "fileNamesList": [
      [
        "./c.ts"
      ],
      [
        "./b.d.ts"
      ]
    ],
    "fileInfos": {
      "../../lib/lib.d.ts": {
        "original": {
          "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
          "affectsGlobalScope": true,
          "impliedFormat": 1
        },
        "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "signature": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "affectsGlobalScope": true,
        "impliedFormat": "commonjs"
      },
      "./b.d.ts": {
        "original": {
          "version": "-10210453821-declare const enum AWorker {\n    ONE = 3\n}\nexport { AWorker as A };\n",
          "impliedFormat": 1
        },
        "version": "-10210453821-declare const enum AWorker {\n    ONE = 3\n}\nexport { AWorker as A };\n",
        "signature": "-10210453821-declare const enum AWorker {\n    ONE = 3\n}\nexport { AWorker as A };\n",
        "impliedFormat": "commonjs"
      },
      "./c.ts": {
        "original": {
          "version": "-3548623266-import {A} from \"./b\"\nlet b = A.ONE\nexport {A}\n",
          "signature": "3259150197-import { A } from \"./b\";\nexport { A };\n",
          "impliedFormat": 1
        },
        "version": "-3548623266-import {A} from \"./b\"\nlet b = A.ONE\nexport {A}\n",
        "signature": "3259150197-import { A } from \"./b\";\nexport { A };\n",
        "impliedFormat": "commonjs"
      },
      "./a.ts": {
        "original": {
          "version": "-5009241479-import {A} from \"./c\"\nlet a = A.ONE\n",
          "impliedFormat": 1
        },
        "version": "-5009241479-import {A} from \"./c\"\nlet a = A.ONE\n",
        "signature": "-5009241479-import {A} from \"./c\"\nlet a = A.ONE\n",
        "impliedFormat": "commonjs"
      }
    },
    "root": [
      [
        4,
        "./a.ts"
      ]
    ],
    "options": {
      "tsBuildInfoFile": "./a.tsbuildinfo"
    },
    "referencedMap": {
      "./a.ts": [
        "./c.ts"
      ],
      "./c.ts": [
        "./b.d.ts"
      ]
    },
    "semanticDiagnosticsPerFile": [
      "../../lib/lib.d.ts",
      "./a.ts",
      "./b.d.ts",
      "./c.ts"
    ]
  },
  "version": "FakeTSVersion",
  "size": 1135
}

//// [/src/project/c.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var b = 3 /* A.ONE */;




Change:: something else changes in b.d.ts
Input::
//// [/src/project/b.d.ts]
declare const enum AWorker {
    ONE = 3
}
export { AWorker as A };
export const randomThing = 10;



Output::
/lib/tsc -i /src/project/a.ts --tsbuildinfofile /src/project/a.tsbuildinfo
exitCode:: ExitStatus.Success


//// [/src/project/a.js] file written with same contents
//// [/src/project/a.tsbuildinfo]
{"program":{"fileNames":["../../lib/lib.d.ts","./b.d.ts","./c.ts","./a.ts"],"fileInfos":[{"version":"3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true,"impliedFormat":1},{"version":"-11645711104-declare const enum AWorker {\n    ONE = 3\n}\nexport { AWorker as A };\nexport const randomThing = 10;","impliedFormat":1},{"version":"-3548623266-import {A} from \"./b\"\nlet b = A.ONE\nexport {A}\n","signature":"3259150197-import { A } from \"./b\";\nexport { A };\n","impliedFormat":1},{"version":"-5009241479-import {A} from \"./c\"\nlet a = A.ONE\n","impliedFormat":1}],"root":[4],"options":{"tsBuildInfoFile":"./a.tsbuildinfo"},"fileIdsList":[[3],[2]],"referencedMap":[[4,1],[3,2]],"semanticDiagnosticsPerFile":[1,4,2,3]},"version":"FakeTSVersion"}

//// [/src/project/a.tsbuildinfo.readable.baseline.txt]
{
  "program": {
    "fileNames": [
      "../../lib/lib.d.ts",
      "./b.d.ts",
      "./c.ts",
      "./a.ts"
    ],
    "fileNamesList": [
      [
        "./c.ts"
      ],
      [
        "./b.d.ts"
      ]
    ],
    "fileInfos": {
      "../../lib/lib.d.ts": {
        "original": {
          "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
          "affectsGlobalScope": true,
          "impliedFormat": 1
        },
        "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "signature": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "affectsGlobalScope": true,
        "impliedFormat": "commonjs"
      },
      "./b.d.ts": {
        "original": {
          "version": "-11645711104-declare const enum AWorker {\n    ONE = 3\n}\nexport { AWorker as A };\nexport const randomThing = 10;",
          "impliedFormat": 1
        },
        "version": "-11645711104-declare const enum AWorker {\n    ONE = 3\n}\nexport { AWorker as A };\nexport const randomThing = 10;",
        "signature": "-11645711104-declare const enum AWorker {\n    ONE = 3\n}\nexport { AWorker as A };\nexport const randomThing = 10;",
        "impliedFormat": "commonjs"
      },
      "./c.ts": {
        "original": {
          "version": "-3548623266-import {A} from \"./b\"\nlet b = A.ONE\nexport {A}\n",
          "signature": "3259150197-import { A } from \"./b\";\nexport { A };\n",
          "impliedFormat": 1
        },
        "version": "-3548623266-import {A} from \"./b\"\nlet b = A.ONE\nexport {A}\n",
        "signature": "3259150197-import { A } from \"./b\";\nexport { A };\n",
        "impliedFormat": "commonjs"
      },
      "./a.ts": {
        "original": {
          "version": "-5009241479-import {A} from \"./c\"\nlet a = A.ONE\n",
          "impliedFormat": 1
        },
        "version": "-5009241479-import {A} from \"./c\"\nlet a = A.ONE\n",
        "signature": "-5009241479-import {A} from \"./c\"\nlet a = A.ONE\n",
        "impliedFormat": "commonjs"
      }
    },
    "root": [
      [
        4,
        "./a.ts"
      ]
    ],
    "options": {
      "tsBuildInfoFile": "./a.tsbuildinfo"
    },
    "referencedMap": {
      "./a.ts": [
        "./c.ts"
      ],
      "./c.ts": [
        "./b.d.ts"
      ]
    },
    "semanticDiagnosticsPerFile": [
      "../../lib/lib.d.ts",
      "./a.ts",
      "./b.d.ts",
      "./c.ts"
    ]
  },
  "version": "FakeTSVersion",
  "size": 1165
}

//// [/src/project/c.js] file written with same contents


Change:: something else changes in b.d.ts again
Input::
//// [/src/project/b.d.ts]
declare const enum AWorker {
    ONE = 3
}
export { AWorker as A };
export const randomThing = 10;export const randomThing2 = 10;



Output::
/lib/tsc -i /src/project/a.ts --tsbuildinfofile /src/project/a.tsbuildinfo
exitCode:: ExitStatus.Success


//// [/src/project/a.js] file written with same contents
//// [/src/project/a.tsbuildinfo]
{"program":{"fileNames":["../../lib/lib.d.ts","./b.d.ts","./c.ts","./a.ts"],"fileInfos":[{"version":"3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true,"impliedFormat":1},{"version":"-19677125073-declare const enum AWorker {\n    ONE = 3\n}\nexport { AWorker as A };\nexport const randomThing = 10;export const randomThing2 = 10;","impliedFormat":1},{"version":"-3548623266-import {A} from \"./b\"\nlet b = A.ONE\nexport {A}\n","signature":"3259150197-import { A } from \"./b\";\nexport { A };\n","impliedFormat":1},{"version":"-5009241479-import {A} from \"./c\"\nlet a = A.ONE\n","impliedFormat":1}],"root":[4],"options":{"tsBuildInfoFile":"./a.tsbuildinfo"},"fileIdsList":[[3],[2]],"referencedMap":[[4,1],[3,2]],"semanticDiagnosticsPerFile":[1,4,2,3]},"version":"FakeTSVersion"}

//// [/src/project/a.tsbuildinfo.readable.baseline.txt]
{
  "program": {
    "fileNames": [
      "../../lib/lib.d.ts",
      "./b.d.ts",
      "./c.ts",
      "./a.ts"
    ],
    "fileNamesList": [
      [
        "./c.ts"
      ],
      [
        "./b.d.ts"
      ]
    ],
    "fileInfos": {
      "../../lib/lib.d.ts": {
        "original": {
          "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
          "affectsGlobalScope": true,
          "impliedFormat": 1
        },
        "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "signature": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "affectsGlobalScope": true,
        "impliedFormat": "commonjs"
      },
      "./b.d.ts": {
        "original": {
          "version": "-19677125073-declare const enum AWorker {\n    ONE = 3\n}\nexport { AWorker as A };\nexport const randomThing = 10;export const randomThing2 = 10;",
          "impliedFormat": 1
        },
        "version": "-19677125073-declare const enum AWorker {\n    ONE = 3\n}\nexport { AWorker as A };\nexport const randomThing = 10;export const randomThing2 = 10;",
        "signature": "-19677125073-declare const enum AWorker {\n    ONE = 3\n}\nexport { AWorker as A };\nexport const randomThing = 10;export const randomThing2 = 10;",
        "impliedFormat": "commonjs"
      },
      "./c.ts": {
        "original": {
          "version": "-3548623266-import {A} from \"./b\"\nlet b = A.ONE\nexport {A}\n",
          "signature": "3259150197-import { A } from \"./b\";\nexport { A };\n",
          "impliedFormat": 1
        },
        "version": "-3548623266-import {A} from \"./b\"\nlet b = A.ONE\nexport {A}\n",
        "signature": "3259150197-import { A } from \"./b\";\nexport { A };\n",
        "impliedFormat": "commonjs"
      },
      "./a.ts": {
        "original": {
          "version": "-5009241479-import {A} from \"./c\"\nlet a = A.ONE\n",
          "impliedFormat": 1
        },
        "version": "-5009241479-import {A} from \"./c\"\nlet a = A.ONE\n",
        "signature": "-5009241479-import {A} from \"./c\"\nlet a = A.ONE\n",
        "impliedFormat": "commonjs"
      }
    },
    "root": [
      [
        4,
        "./a.ts"
      ]
    ],
    "options": {
      "tsBuildInfoFile": "./a.tsbuildinfo"
    },
    "referencedMap": {
      "./a.ts": [
        "./c.ts"
      ],
      "./c.ts": [
        "./b.d.ts"
      ]
    },
    "semanticDiagnosticsPerFile": [
      "../../lib/lib.d.ts",
      "./a.ts",
      "./b.d.ts",
      "./c.ts"
    ]
  },
  "version": "FakeTSVersion",
  "size": 1196
}

//// [/src/project/c.js] file written with same contents
