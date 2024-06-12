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
export const enum A {
    ONE = 1
}


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
<<<<<<< HEAD
{"program":{"fileNames":["../../lib/lib.d.ts","./b.d.ts","./c.ts","./a.ts"],"fileInfos":[{"version":"3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true,"impliedFormat":1},{"version":"-7434209142-export const enum A {\n    ONE = 1\n}\n","impliedFormat":1},{"version":"-3548623266-import {A} from \"./b\"\nlet b = A.ONE\nexport {A}\n","impliedFormat":1},{"version":"-5009241479-import {A} from \"./c\"\nlet a = A.ONE\n","impliedFormat":1}],"root":[4],"options":{"tsBuildInfoFile":"./a.tsbuildinfo"},"fileIdsList":[[3],[2]],"referencedMap":[[4,1],[3,2]]},"version":"FakeTSVersion"}
=======
{"fileNames":["../../lib/lib.d.ts","./b.d.ts","./c.ts","./a.ts"],"fileIdsList":[[3],[2]],"fileInfos":[{"version":"3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true},"-7434209142-export const enum A {\n    ONE = 1\n}\n","-3548623266-import {A} from \"./b\"\nlet b = A.ONE\nexport {A}\n","-5009241479-import {A} from \"./c\"\nlet a = A.ONE\n"],"root":[4],"options":{"tsBuildInfoFile":"./a.tsbuildinfo"},"referencedMap":[[4,1],[3,2]],"version":"FakeTSVersion"}
>>>>>>> c4daafb597 (Merge 1ab44d1ef58360d56e708c6d9f422205d116c199 into 1948e92e3a102b40800fdc731ddf67f5dc8bda82)

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
<<<<<<< HEAD
        "signature": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "affectsGlobalScope": true,
        "impliedFormat": "commonjs"
      },
      "./b.d.ts": {
        "original": {
          "version": "-7434209142-export const enum A {\n    ONE = 1\n}\n",
          "impliedFormat": 1
        },
        "version": "-7434209142-export const enum A {\n    ONE = 1\n}\n",
        "signature": "-7434209142-export const enum A {\n    ONE = 1\n}\n",
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
=======
        "affectsGlobalScope": true
      },
      "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
      "signature": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
      "affectsGlobalScope": true
    },
    "./b.d.ts": {
      "version": "-7434209142-export const enum A {\n    ONE = 1\n}\n",
      "signature": "-7434209142-export const enum A {\n    ONE = 1\n}\n"
    },
    "./c.ts": {
      "version": "-3548623266-import {A} from \"./b\"\nlet b = A.ONE\nexport {A}\n",
      "signature": "-3548623266-import {A} from \"./b\"\nlet b = A.ONE\nexport {A}\n"
    },
    "./a.ts": {
      "version": "-5009241479-import {A} from \"./c\"\nlet a = A.ONE\n",
      "signature": "-5009241479-import {A} from \"./c\"\nlet a = A.ONE\n"
>>>>>>> c4daafb597 (Merge 1ab44d1ef58360d56e708c6d9f422205d116c199 into 1948e92e3a102b40800fdc731ddf67f5dc8bda82)
    }
  },
  "version": "FakeTSVersion",
<<<<<<< HEAD
  "size": 993
=======
  "size": 873
>>>>>>> c4daafb597 (Merge 1ab44d1ef58360d56e708c6d9f422205d116c199 into 1948e92e3a102b40800fdc731ddf67f5dc8bda82)
}

//// [/src/project/c.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var b = 1 /* A.ONE */;




Change:: change enum value
Input::
//// [/src/project/b.d.ts]
export const enum A {
    ONE = 2
}




Output::
/lib/tsc -i /src/project/a.ts --tsbuildinfofile /src/project/a.tsbuildinfo
exitCode:: ExitStatus.Success


//// [/src/project/a.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var a = 2 /* A.ONE */;


//// [/src/project/a.tsbuildinfo]
<<<<<<< HEAD
{"program":{"fileNames":["../../lib/lib.d.ts","./b.d.ts","./c.ts","./a.ts"],"fileInfos":[{"version":"3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true,"impliedFormat":1},{"version":"-7434173205-export const enum A {\n    ONE = 2\n}\n","impliedFormat":1},{"version":"-3548623266-import {A} from \"./b\"\nlet b = A.ONE\nexport {A}\n","signature":"3259150197-import { A } from \"./b\";\nexport { A };\n","impliedFormat":1},{"version":"-5009241479-import {A} from \"./c\"\nlet a = A.ONE\n","signature":"-3531856636-export {};\n","impliedFormat":1}],"root":[4],"options":{"tsBuildInfoFile":"./a.tsbuildinfo"},"fileIdsList":[[3],[2]],"referencedMap":[[4,1],[3,2]]},"version":"FakeTSVersion"}
=======
{"fileNames":["../../lib/lib.d.ts","./b.d.ts","./c.ts","./a.ts"],"fileIdsList":[[3],[2]],"fileInfos":[{"version":"3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true},"-7434173205-export const enum A {\n    ONE = 2\n}\n",{"version":"-3548623266-import {A} from \"./b\"\nlet b = A.ONE\nexport {A}\n","signature":"3259150197-import { A } from \"./b\";\nexport { A };\n"},{"version":"-5009241479-import {A} from \"./c\"\nlet a = A.ONE\n","signature":"-3531856636-export {};\n"}],"root":[4],"options":{"tsBuildInfoFile":"./a.tsbuildinfo"},"referencedMap":[[4,1],[3,2]],"version":"FakeTSVersion"}
>>>>>>> c4daafb597 (Merge 1ab44d1ef58360d56e708c6d9f422205d116c199 into 1948e92e3a102b40800fdc731ddf67f5dc8bda82)

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
<<<<<<< HEAD
        "signature": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "affectsGlobalScope": true,
        "impliedFormat": "commonjs"
      },
      "./b.d.ts": {
        "original": {
          "version": "-7434173205-export const enum A {\n    ONE = 2\n}\n",
          "impliedFormat": 1
        },
        "version": "-7434173205-export const enum A {\n    ONE = 2\n}\n",
        "signature": "-7434173205-export const enum A {\n    ONE = 2\n}\n",
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
=======
        "affectsGlobalScope": true
      },
      "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
      "signature": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
      "affectsGlobalScope": true
    },
    "./b.d.ts": {
      "version": "-7434173205-export const enum A {\n    ONE = 2\n}\n",
      "signature": "-7434173205-export const enum A {\n    ONE = 2\n}\n"
    },
    "./c.ts": {
      "original": {
        "version": "-3548623266-import {A} from \"./b\"\nlet b = A.ONE\nexport {A}\n",
        "signature": "3259150197-import { A } from \"./b\";\nexport { A };\n"
      },
      "version": "-3548623266-import {A} from \"./b\"\nlet b = A.ONE\nexport {A}\n",
      "signature": "3259150197-import { A } from \"./b\";\nexport { A };\n"
    },
    "./a.ts": {
      "original": {
        "version": "-5009241479-import {A} from \"./c\"\nlet a = A.ONE\n",
        "signature": "-3531856636-export {};\n"
      },
      "version": "-5009241479-import {A} from \"./c\"\nlet a = A.ONE\n",
      "signature": "-3531856636-export {};\n"
>>>>>>> c4daafb597 (Merge 1ab44d1ef58360d56e708c6d9f422205d116c199 into 1948e92e3a102b40800fdc731ddf67f5dc8bda82)
    }
  },
  "version": "FakeTSVersion",
<<<<<<< HEAD
  "size": 1101
=======
  "size": 1005
>>>>>>> c4daafb597 (Merge 1ab44d1ef58360d56e708c6d9f422205d116c199 into 1948e92e3a102b40800fdc731ddf67f5dc8bda82)
}

//// [/src/project/c.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var b = 2 /* A.ONE */;




Change:: change enum value again
Input::
//// [/src/project/b.d.ts]
export const enum A {
    ONE = 3
}




Output::
/lib/tsc -i /src/project/a.ts --tsbuildinfofile /src/project/a.tsbuildinfo
exitCode:: ExitStatus.Success


//// [/src/project/a.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var a = 3 /* A.ONE */;


//// [/src/project/a.tsbuildinfo]
<<<<<<< HEAD
{"program":{"fileNames":["../../lib/lib.d.ts","./b.d.ts","./c.ts","./a.ts"],"fileInfos":[{"version":"3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true,"impliedFormat":1},{"version":"-7434137268-export const enum A {\n    ONE = 3\n}\n","impliedFormat":1},{"version":"-3548623266-import {A} from \"./b\"\nlet b = A.ONE\nexport {A}\n","signature":"3259150197-import { A } from \"./b\";\nexport { A };\n","impliedFormat":1},{"version":"-5009241479-import {A} from \"./c\"\nlet a = A.ONE\n","impliedFormat":1}],"root":[4],"options":{"tsBuildInfoFile":"./a.tsbuildinfo"},"fileIdsList":[[3],[2]],"referencedMap":[[4,1],[3,2]]},"version":"FakeTSVersion"}
=======
{"fileNames":["../../lib/lib.d.ts","./b.d.ts","./c.ts","./a.ts"],"fileIdsList":[[3],[2]],"fileInfos":[{"version":"3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true},"-7434137268-export const enum A {\n    ONE = 3\n}\n",{"version":"-3548623266-import {A} from \"./b\"\nlet b = A.ONE\nexport {A}\n","signature":"3259150197-import { A } from \"./b\";\nexport { A };\n"},"-5009241479-import {A} from \"./c\"\nlet a = A.ONE\n"],"root":[4],"options":{"tsBuildInfoFile":"./a.tsbuildinfo"},"referencedMap":[[4,1],[3,2]],"version":"FakeTSVersion"}
>>>>>>> c4daafb597 (Merge 1ab44d1ef58360d56e708c6d9f422205d116c199 into 1948e92e3a102b40800fdc731ddf67f5dc8bda82)

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
<<<<<<< HEAD
        "signature": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "affectsGlobalScope": true,
        "impliedFormat": "commonjs"
      },
      "./b.d.ts": {
        "original": {
          "version": "-7434137268-export const enum A {\n    ONE = 3\n}\n",
          "impliedFormat": 1
        },
        "version": "-7434137268-export const enum A {\n    ONE = 3\n}\n",
        "signature": "-7434137268-export const enum A {\n    ONE = 3\n}\n",
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
=======
        "affectsGlobalScope": true
      },
      "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
      "signature": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
      "affectsGlobalScope": true
    },
    "./b.d.ts": {
      "version": "-7434137268-export const enum A {\n    ONE = 3\n}\n",
      "signature": "-7434137268-export const enum A {\n    ONE = 3\n}\n"
    },
    "./c.ts": {
      "original": {
        "version": "-3548623266-import {A} from \"./b\"\nlet b = A.ONE\nexport {A}\n",
        "signature": "3259150197-import { A } from \"./b\";\nexport { A };\n"
      },
      "version": "-3548623266-import {A} from \"./b\"\nlet b = A.ONE\nexport {A}\n",
      "signature": "3259150197-import { A } from \"./b\";\nexport { A };\n"
    },
    "./a.ts": {
      "version": "-5009241479-import {A} from \"./c\"\nlet a = A.ONE\n",
      "signature": "-5009241479-import {A} from \"./c\"\nlet a = A.ONE\n"
>>>>>>> c4daafb597 (Merge 1ab44d1ef58360d56e708c6d9f422205d116c199 into 1948e92e3a102b40800fdc731ddf67f5dc8bda82)
    }
  },
  "version": "FakeTSVersion",
<<<<<<< HEAD
  "size": 1062
=======
  "size": 954
>>>>>>> c4daafb597 (Merge 1ab44d1ef58360d56e708c6d9f422205d116c199 into 1948e92e3a102b40800fdc731ddf67f5dc8bda82)
}

//// [/src/project/c.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var b = 3 /* A.ONE */;




Change:: something else changes in b.d.ts
Input::
//// [/src/project/b.d.ts]
export const enum A {
    ONE = 3
}
export const randomThing = 10;



Output::
/lib/tsc -i /src/project/a.ts --tsbuildinfofile /src/project/a.tsbuildinfo
exitCode:: ExitStatus.Success


//// [/src/project/a.js] file written with same contents
//// [/src/project/a.tsbuildinfo]
<<<<<<< HEAD
{"program":{"fileNames":["../../lib/lib.d.ts","./b.d.ts","./c.ts","./a.ts"],"fileInfos":[{"version":"3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true,"impliedFormat":1},{"version":"-1392741047-export const enum A {\n    ONE = 3\n}\nexport const randomThing = 10;","impliedFormat":1},{"version":"-3548623266-import {A} from \"./b\"\nlet b = A.ONE\nexport {A}\n","signature":"3259150197-import { A } from \"./b\";\nexport { A };\n","impliedFormat":1},{"version":"-5009241479-import {A} from \"./c\"\nlet a = A.ONE\n","impliedFormat":1}],"root":[4],"options":{"tsBuildInfoFile":"./a.tsbuildinfo"},"fileIdsList":[[3],[2]],"referencedMap":[[4,1],[3,2]]},"version":"FakeTSVersion"}
=======
{"fileNames":["../../lib/lib.d.ts","./b.d.ts","./c.ts","./a.ts"],"fileIdsList":[[3],[2]],"fileInfos":[{"version":"3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true},"-1392741047-export const enum A {\n    ONE = 3\n}\nexport const randomThing = 10;",{"version":"-3548623266-import {A} from \"./b\"\nlet b = A.ONE\nexport {A}\n","signature":"3259150197-import { A } from \"./b\";\nexport { A };\n"},"-5009241479-import {A} from \"./c\"\nlet a = A.ONE\n"],"root":[4],"options":{"tsBuildInfoFile":"./a.tsbuildinfo"},"referencedMap":[[4,1],[3,2]],"version":"FakeTSVersion"}
>>>>>>> c4daafb597 (Merge 1ab44d1ef58360d56e708c6d9f422205d116c199 into 1948e92e3a102b40800fdc731ddf67f5dc8bda82)

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
<<<<<<< HEAD
        "signature": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "affectsGlobalScope": true,
        "impliedFormat": "commonjs"
      },
      "./b.d.ts": {
        "original": {
          "version": "-1392741047-export const enum A {\n    ONE = 3\n}\nexport const randomThing = 10;",
          "impliedFormat": 1
        },
        "version": "-1392741047-export const enum A {\n    ONE = 3\n}\nexport const randomThing = 10;",
        "signature": "-1392741047-export const enum A {\n    ONE = 3\n}\nexport const randomThing = 10;",
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
=======
        "affectsGlobalScope": true
      },
      "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
      "signature": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
      "affectsGlobalScope": true
    },
    "./b.d.ts": {
      "version": "-1392741047-export const enum A {\n    ONE = 3\n}\nexport const randomThing = 10;",
      "signature": "-1392741047-export const enum A {\n    ONE = 3\n}\nexport const randomThing = 10;"
    },
    "./c.ts": {
      "original": {
        "version": "-3548623266-import {A} from \"./b\"\nlet b = A.ONE\nexport {A}\n",
        "signature": "3259150197-import { A } from \"./b\";\nexport { A };\n"
      },
      "version": "-3548623266-import {A} from \"./b\"\nlet b = A.ONE\nexport {A}\n",
      "signature": "3259150197-import { A } from \"./b\";\nexport { A };\n"
    },
    "./a.ts": {
      "version": "-5009241479-import {A} from \"./c\"\nlet a = A.ONE\n",
      "signature": "-5009241479-import {A} from \"./c\"\nlet a = A.ONE\n"
>>>>>>> c4daafb597 (Merge 1ab44d1ef58360d56e708c6d9f422205d116c199 into 1948e92e3a102b40800fdc731ddf67f5dc8bda82)
    }
  },
  "version": "FakeTSVersion",
<<<<<<< HEAD
  "size": 1092
=======
  "size": 984
>>>>>>> c4daafb597 (Merge 1ab44d1ef58360d56e708c6d9f422205d116c199 into 1948e92e3a102b40800fdc731ddf67f5dc8bda82)
}

//// [/src/project/c.js] file written with same contents


Change:: something else changes in b.d.ts again
Input::
//// [/src/project/b.d.ts]
export const enum A {
    ONE = 3
}
export const randomThing = 10;export const randomThing2 = 10;



Output::
/lib/tsc -i /src/project/a.ts --tsbuildinfofile /src/project/a.tsbuildinfo
exitCode:: ExitStatus.Success


//// [/src/project/a.js] file written with same contents
//// [/src/project/a.tsbuildinfo]
<<<<<<< HEAD
{"program":{"fileNames":["../../lib/lib.d.ts","./b.d.ts","./c.ts","./a.ts"],"fileInfos":[{"version":"3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true,"impliedFormat":1},{"version":"-11013141160-export const enum A {\n    ONE = 3\n}\nexport const randomThing = 10;export const randomThing2 = 10;","impliedFormat":1},{"version":"-3548623266-import {A} from \"./b\"\nlet b = A.ONE\nexport {A}\n","signature":"3259150197-import { A } from \"./b\";\nexport { A };\n","impliedFormat":1},{"version":"-5009241479-import {A} from \"./c\"\nlet a = A.ONE\n","impliedFormat":1}],"root":[4],"options":{"tsBuildInfoFile":"./a.tsbuildinfo"},"fileIdsList":[[3],[2]],"referencedMap":[[4,1],[3,2]]},"version":"FakeTSVersion"}
=======
{"fileNames":["../../lib/lib.d.ts","./b.d.ts","./c.ts","./a.ts"],"fileIdsList":[[3],[2]],"fileInfos":[{"version":"3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true},"-11013141160-export const enum A {\n    ONE = 3\n}\nexport const randomThing = 10;export const randomThing2 = 10;",{"version":"-3548623266-import {A} from \"./b\"\nlet b = A.ONE\nexport {A}\n","signature":"3259150197-import { A } from \"./b\";\nexport { A };\n"},"-5009241479-import {A} from \"./c\"\nlet a = A.ONE\n"],"root":[4],"options":{"tsBuildInfoFile":"./a.tsbuildinfo"},"referencedMap":[[4,1],[3,2]],"version":"FakeTSVersion"}
>>>>>>> c4daafb597 (Merge 1ab44d1ef58360d56e708c6d9f422205d116c199 into 1948e92e3a102b40800fdc731ddf67f5dc8bda82)

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
<<<<<<< HEAD
        "signature": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "affectsGlobalScope": true,
        "impliedFormat": "commonjs"
      },
      "./b.d.ts": {
        "original": {
          "version": "-11013141160-export const enum A {\n    ONE = 3\n}\nexport const randomThing = 10;export const randomThing2 = 10;",
          "impliedFormat": 1
        },
        "version": "-11013141160-export const enum A {\n    ONE = 3\n}\nexport const randomThing = 10;export const randomThing2 = 10;",
        "signature": "-11013141160-export const enum A {\n    ONE = 3\n}\nexport const randomThing = 10;export const randomThing2 = 10;",
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
=======
        "affectsGlobalScope": true
      },
      "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
      "signature": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
      "affectsGlobalScope": true
    },
    "./b.d.ts": {
      "version": "-11013141160-export const enum A {\n    ONE = 3\n}\nexport const randomThing = 10;export const randomThing2 = 10;",
      "signature": "-11013141160-export const enum A {\n    ONE = 3\n}\nexport const randomThing = 10;export const randomThing2 = 10;"
    },
    "./c.ts": {
      "original": {
        "version": "-3548623266-import {A} from \"./b\"\nlet b = A.ONE\nexport {A}\n",
        "signature": "3259150197-import { A } from \"./b\";\nexport { A };\n"
      },
      "version": "-3548623266-import {A} from \"./b\"\nlet b = A.ONE\nexport {A}\n",
      "signature": "3259150197-import { A } from \"./b\";\nexport { A };\n"
    },
    "./a.ts": {
      "version": "-5009241479-import {A} from \"./c\"\nlet a = A.ONE\n",
      "signature": "-5009241479-import {A} from \"./c\"\nlet a = A.ONE\n"
>>>>>>> c4daafb597 (Merge 1ab44d1ef58360d56e708c6d9f422205d116c199 into 1948e92e3a102b40800fdc731ddf67f5dc8bda82)
    }
  },
  "version": "FakeTSVersion",
<<<<<<< HEAD
  "size": 1124
=======
  "size": 1016
>>>>>>> c4daafb597 (Merge 1ab44d1ef58360d56e708c6d9f422205d116c199 into 1948e92e3a102b40800fdc731ddf67f5dc8bda82)
}

//// [/src/project/c.js] file written with same contents
