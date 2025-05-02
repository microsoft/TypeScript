currentDirectory:: /home/src/workspaces/project useCaseSensitiveFileNames:: false
Input::
//// [/home/src/workspaces/project/file1.ts]
export const x = "hello";

//// [/home/src/workspaces/project/file2.ts]
export const y = "world";

//// [/home/src/workspaces/project/random.d.ts]
export const random = "hello";

//// [/home/src/workspaces/project/nonconsecutive.ts]
import { random } from "./random";
export const nonConsecutive = "hello";


//// [/home/src/workspaces/project/random1.d.ts]
export const random = "hello";

//// [/home/src/workspaces/project/asArray1.ts]
import { random } from "./random1";
export const x = "hello";


//// [/home/src/workspaces/project/asArray2.ts]
export const x = "hello";

//// [/home/src/workspaces/project/asArray3.ts]
export const x = "hello";

//// [/home/src/workspaces/project/random2.d.ts]
export const random = "hello";

//// [/home/src/workspaces/project/anotherNonConsecutive.ts]
import { random } from "./random2";
export const nonConsecutive = "hello";


//// [/home/src/workspaces/project/tsconfig.json]
{
  "compilerOptions": {
    "composite": true
  },
  "include": [
    "file*.ts",
    "nonconsecutive*.ts",
    "asArray*.ts",
    "anotherNonConsecutive.ts"
  ]
}

//// [/home/src/tslibs/TS/Lib/lib.d.ts]
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


/home/src/tslibs/TS/Lib/tsc.js --b -v
Output::
[[90mHH:MM:SS AM[0m] Projects in this build: 
    * tsconfig.json

[[90mHH:MM:SS AM[0m] Project 'tsconfig.json' is out of date because output file 'tsconfig.tsbuildinfo' does not exist

[[90mHH:MM:SS AM[0m] Building project '/home/src/workspaces/project/tsconfig.json'...



//// [/home/src/workspaces/project/file1.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.x = void 0;
exports.x = "hello";


//// [/home/src/workspaces/project/file1.d.ts]
export declare const x = "hello";


//// [/home/src/workspaces/project/file2.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.y = void 0;
exports.y = "world";


//// [/home/src/workspaces/project/file2.d.ts]
export declare const y = "world";


//// [/home/src/workspaces/project/nonconsecutive.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.nonConsecutive = void 0;
exports.nonConsecutive = "hello";


//// [/home/src/workspaces/project/nonconsecutive.d.ts]
export declare const nonConsecutive = "hello";


//// [/home/src/workspaces/project/asArray1.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.x = void 0;
exports.x = "hello";


//// [/home/src/workspaces/project/asArray1.d.ts]
export declare const x = "hello";


//// [/home/src/workspaces/project/asArray2.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.x = void 0;
exports.x = "hello";


//// [/home/src/workspaces/project/asArray2.d.ts]
export declare const x = "hello";


//// [/home/src/workspaces/project/asArray3.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.x = void 0;
exports.x = "hello";


//// [/home/src/workspaces/project/asArray3.d.ts]
export declare const x = "hello";


//// [/home/src/workspaces/project/anotherNonConsecutive.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.nonConsecutive = void 0;
exports.nonConsecutive = "hello";


//// [/home/src/workspaces/project/anotherNonConsecutive.d.ts]
export declare const nonConsecutive = "hello";


//// [/home/src/workspaces/project/tsconfig.tsbuildinfo]
{"fileNames":["../../tslibs/ts/lib/lib.d.ts","./file1.ts","./file2.ts","./random.d.ts","./nonconsecutive.ts","./random1.d.ts","./asarray1.ts","./asarray2.ts","./asarray3.ts","./random2.d.ts","./anothernonconsecutive.ts"],"fileIdsList":[[10],[6],[4]],"fileInfos":[{"version":"3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true},{"version":"-10637577098-export const x = \"hello\";","signature":"-6425002032-export declare const x = \"hello\";\n"},{"version":"-11520681045-export const y = \"world\";","signature":"-5502661211-export declare const y = \"world\";\n"},"-10812219521-export const random = \"hello\";",{"version":"-4807644630-import { random } from \"./random\";\nexport const nonConsecutive = \"hello\";\n","signature":"-7909998901-export declare const nonConsecutive = \"hello\";\n"},"-10812219521-export const random = \"hello\";",{"version":"-21033449408-import { random } from \"./random1\";\nexport const x = \"hello\";\n","signature":"-6425002032-export declare const x = \"hello\";\n"},{"version":"-10637577098-export const x = \"hello\";","signature":"-6425002032-export declare const x = \"hello\";\n"},{"version":"-10637577098-export const x = \"hello\";","signature":"-6425002032-export declare const x = \"hello\";\n"},"-10812219521-export const random = \"hello\";",{"version":"-23429155204-import { random } from \"./random2\";\nexport const nonConsecutive = \"hello\";\n","signature":"-7909998901-export declare const nonConsecutive = \"hello\";\n"}],"root":[2,3,5,[7,9],11],"options":{"composite":true},"referencedMap":[[11,1],[7,2],[5,3]],"latestChangedDtsFile":"./anotherNonConsecutive.d.ts","version":"FakeTSVersion"}

//// [/home/src/workspaces/project/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "fileNames": [
    "../../tslibs/ts/lib/lib.d.ts",
    "./file1.ts",
    "./file2.ts",
    "./random.d.ts",
    "./nonconsecutive.ts",
    "./random1.d.ts",
    "./asarray1.ts",
    "./asarray2.ts",
    "./asarray3.ts",
    "./random2.d.ts",
    "./anothernonconsecutive.ts"
  ],
  "fileIdsList": [
    [
      "./random2.d.ts"
    ],
    [
      "./random1.d.ts"
    ],
    [
      "./random.d.ts"
    ]
  ],
  "fileInfos": {
    "../../tslibs/ts/lib/lib.d.ts": {
      "original": {
        "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "affectsGlobalScope": true
      },
      "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
      "signature": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
      "affectsGlobalScope": true
    },
    "./file1.ts": {
      "original": {
        "version": "-10637577098-export const x = \"hello\";",
        "signature": "-6425002032-export declare const x = \"hello\";\n"
      },
      "version": "-10637577098-export const x = \"hello\";",
      "signature": "-6425002032-export declare const x = \"hello\";\n"
    },
    "./file2.ts": {
      "original": {
        "version": "-11520681045-export const y = \"world\";",
        "signature": "-5502661211-export declare const y = \"world\";\n"
      },
      "version": "-11520681045-export const y = \"world\";",
      "signature": "-5502661211-export declare const y = \"world\";\n"
    },
    "./random.d.ts": {
      "version": "-10812219521-export const random = \"hello\";",
      "signature": "-10812219521-export const random = \"hello\";"
    },
    "./nonconsecutive.ts": {
      "original": {
        "version": "-4807644630-import { random } from \"./random\";\nexport const nonConsecutive = \"hello\";\n",
        "signature": "-7909998901-export declare const nonConsecutive = \"hello\";\n"
      },
      "version": "-4807644630-import { random } from \"./random\";\nexport const nonConsecutive = \"hello\";\n",
      "signature": "-7909998901-export declare const nonConsecutive = \"hello\";\n"
    },
    "./random1.d.ts": {
      "version": "-10812219521-export const random = \"hello\";",
      "signature": "-10812219521-export const random = \"hello\";"
    },
    "./asarray1.ts": {
      "original": {
        "version": "-21033449408-import { random } from \"./random1\";\nexport const x = \"hello\";\n",
        "signature": "-6425002032-export declare const x = \"hello\";\n"
      },
      "version": "-21033449408-import { random } from \"./random1\";\nexport const x = \"hello\";\n",
      "signature": "-6425002032-export declare const x = \"hello\";\n"
    },
    "./asarray2.ts": {
      "original": {
        "version": "-10637577098-export const x = \"hello\";",
        "signature": "-6425002032-export declare const x = \"hello\";\n"
      },
      "version": "-10637577098-export const x = \"hello\";",
      "signature": "-6425002032-export declare const x = \"hello\";\n"
    },
    "./asarray3.ts": {
      "original": {
        "version": "-10637577098-export const x = \"hello\";",
        "signature": "-6425002032-export declare const x = \"hello\";\n"
      },
      "version": "-10637577098-export const x = \"hello\";",
      "signature": "-6425002032-export declare const x = \"hello\";\n"
    },
    "./random2.d.ts": {
      "version": "-10812219521-export const random = \"hello\";",
      "signature": "-10812219521-export const random = \"hello\";"
    },
    "./anothernonconsecutive.ts": {
      "original": {
        "version": "-23429155204-import { random } from \"./random2\";\nexport const nonConsecutive = \"hello\";\n",
        "signature": "-7909998901-export declare const nonConsecutive = \"hello\";\n"
      },
      "version": "-23429155204-import { random } from \"./random2\";\nexport const nonConsecutive = \"hello\";\n",
      "signature": "-7909998901-export declare const nonConsecutive = \"hello\";\n"
    }
  },
  "root": [
    [
      2,
      "./file1.ts"
    ],
    [
      3,
      "./file2.ts"
    ],
    [
      5,
      "./nonconsecutive.ts"
    ],
    [
      [
        7,
        9
      ],
      [
        "./asarray1.ts",
        "./asarray2.ts",
        "./asarray3.ts"
      ]
    ],
    [
      11,
      "./anothernonconsecutive.ts"
    ]
  ],
  "options": {
    "composite": true
  },
  "referencedMap": {
    "./anothernonconsecutive.ts": [
      "./random2.d.ts"
    ],
    "./asarray1.ts": [
      "./random1.d.ts"
    ],
    "./nonconsecutive.ts": [
      "./random.d.ts"
    ]
  },
  "latestChangedDtsFile": "./anotherNonConsecutive.d.ts",
  "version": "FakeTSVersion",
  "size": 2063
}


exitCode:: ExitStatus.Success

Change:: delete file1

Input::
//// [/home/src/workspaces/project/file1.ts] deleted
//// [/home/src/workspaces/project/file1.js] deleted
//// [/home/src/workspaces/project/file1.d.ts] deleted

/home/src/tslibs/TS/Lib/tsc.js --b -v
Output::
[[90mHH:MM:SS AM[0m] Projects in this build: 
    * tsconfig.json

[[90mHH:MM:SS AM[0m] Project 'tsconfig.json' is out of date because buildinfo file 'tsconfig.tsbuildinfo' indicates that file 'file1.ts' was root file of compilation but not any more.

[[90mHH:MM:SS AM[0m] Building project '/home/src/workspaces/project/tsconfig.json'...



//// [/home/src/workspaces/project/tsconfig.tsbuildinfo]
{"fileNames":["../../tslibs/ts/lib/lib.d.ts","./file2.ts","./random.d.ts","./nonconsecutive.ts","./random1.d.ts","./asarray1.ts","./asarray2.ts","./asarray3.ts","./random2.d.ts","./anothernonconsecutive.ts"],"fileIdsList":[[9],[5],[3]],"fileInfos":[{"version":"3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true},{"version":"-11520681045-export const y = \"world\";","signature":"-5502661211-export declare const y = \"world\";\n"},"-10812219521-export const random = \"hello\";",{"version":"-4807644630-import { random } from \"./random\";\nexport const nonConsecutive = \"hello\";\n","signature":"-7909998901-export declare const nonConsecutive = \"hello\";\n"},"-10812219521-export const random = \"hello\";",{"version":"-21033449408-import { random } from \"./random1\";\nexport const x = \"hello\";\n","signature":"-6425002032-export declare const x = \"hello\";\n"},{"version":"-10637577098-export const x = \"hello\";","signature":"-6425002032-export declare const x = \"hello\";\n"},{"version":"-10637577098-export const x = \"hello\";","signature":"-6425002032-export declare const x = \"hello\";\n"},"-10812219521-export const random = \"hello\";",{"version":"-23429155204-import { random } from \"./random2\";\nexport const nonConsecutive = \"hello\";\n","signature":"-7909998901-export declare const nonConsecutive = \"hello\";\n"}],"root":[2,4,[6,8],10],"options":{"composite":true},"referencedMap":[[10,1],[6,2],[4,3]],"latestChangedDtsFile":"./anotherNonConsecutive.d.ts","version":"FakeTSVersion"}

//// [/home/src/workspaces/project/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "fileNames": [
    "../../tslibs/ts/lib/lib.d.ts",
    "./file2.ts",
    "./random.d.ts",
    "./nonconsecutive.ts",
    "./random1.d.ts",
    "./asarray1.ts",
    "./asarray2.ts",
    "./asarray3.ts",
    "./random2.d.ts",
    "./anothernonconsecutive.ts"
  ],
  "fileIdsList": [
    [
      "./random2.d.ts"
    ],
    [
      "./random1.d.ts"
    ],
    [
      "./random.d.ts"
    ]
  ],
  "fileInfos": {
    "../../tslibs/ts/lib/lib.d.ts": {
      "original": {
        "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "affectsGlobalScope": true
      },
      "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
      "signature": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
      "affectsGlobalScope": true
    },
    "./file2.ts": {
      "original": {
        "version": "-11520681045-export const y = \"world\";",
        "signature": "-5502661211-export declare const y = \"world\";\n"
      },
      "version": "-11520681045-export const y = \"world\";",
      "signature": "-5502661211-export declare const y = \"world\";\n"
    },
    "./random.d.ts": {
      "version": "-10812219521-export const random = \"hello\";",
      "signature": "-10812219521-export const random = \"hello\";"
    },
    "./nonconsecutive.ts": {
      "original": {
        "version": "-4807644630-import { random } from \"./random\";\nexport const nonConsecutive = \"hello\";\n",
        "signature": "-7909998901-export declare const nonConsecutive = \"hello\";\n"
      },
      "version": "-4807644630-import { random } from \"./random\";\nexport const nonConsecutive = \"hello\";\n",
      "signature": "-7909998901-export declare const nonConsecutive = \"hello\";\n"
    },
    "./random1.d.ts": {
      "version": "-10812219521-export const random = \"hello\";",
      "signature": "-10812219521-export const random = \"hello\";"
    },
    "./asarray1.ts": {
      "original": {
        "version": "-21033449408-import { random } from \"./random1\";\nexport const x = \"hello\";\n",
        "signature": "-6425002032-export declare const x = \"hello\";\n"
      },
      "version": "-21033449408-import { random } from \"./random1\";\nexport const x = \"hello\";\n",
      "signature": "-6425002032-export declare const x = \"hello\";\n"
    },
    "./asarray2.ts": {
      "original": {
        "version": "-10637577098-export const x = \"hello\";",
        "signature": "-6425002032-export declare const x = \"hello\";\n"
      },
      "version": "-10637577098-export const x = \"hello\";",
      "signature": "-6425002032-export declare const x = \"hello\";\n"
    },
    "./asarray3.ts": {
      "original": {
        "version": "-10637577098-export const x = \"hello\";",
        "signature": "-6425002032-export declare const x = \"hello\";\n"
      },
      "version": "-10637577098-export const x = \"hello\";",
      "signature": "-6425002032-export declare const x = \"hello\";\n"
    },
    "./random2.d.ts": {
      "version": "-10812219521-export const random = \"hello\";",
      "signature": "-10812219521-export const random = \"hello\";"
    },
    "./anothernonconsecutive.ts": {
      "original": {
        "version": "-23429155204-import { random } from \"./random2\";\nexport const nonConsecutive = \"hello\";\n",
        "signature": "-7909998901-export declare const nonConsecutive = \"hello\";\n"
      },
      "version": "-23429155204-import { random } from \"./random2\";\nexport const nonConsecutive = \"hello\";\n",
      "signature": "-7909998901-export declare const nonConsecutive = \"hello\";\n"
    }
  },
  "root": [
    [
      2,
      "./file2.ts"
    ],
    [
      4,
      "./nonconsecutive.ts"
    ],
    [
      [
        6,
        8
      ],
      [
        "./asarray1.ts",
        "./asarray2.ts",
        "./asarray3.ts"
      ]
    ],
    [
      10,
      "./anothernonconsecutive.ts"
    ]
  ],
  "options": {
    "composite": true
  },
  "referencedMap": {
    "./anothernonconsecutive.ts": [
      "./random2.d.ts"
    ],
    "./asarray1.ts": [
      "./random1.d.ts"
    ],
    "./nonconsecutive.ts": [
      "./random.d.ts"
    ]
  },
  "latestChangedDtsFile": "./anotherNonConsecutive.d.ts",
  "version": "FakeTSVersion",
  "size": 1928
}


exitCode:: ExitStatus.Success
