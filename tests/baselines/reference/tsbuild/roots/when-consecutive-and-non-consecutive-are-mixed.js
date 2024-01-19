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

//// [/src/anotherNonConsecutive.ts]
import { random } from "./random2";
export const nonConsecutive = "hello";


//// [/src/asArray1.ts]
import { random } from "./random1";
export const x = "hello";


//// [/src/asArray2.ts]
export const x = "hello";

//// [/src/asArray3.ts]
export const x = "hello";

//// [/src/file1.ts]
export const x = "hello";

//// [/src/file2.ts]
export const y = "world";

//// [/src/nonconsecutive.ts]
import { random } from "./random";
export const nonConsecutive = "hello";


//// [/src/random.d.ts]
export const random = "hello";

//// [/src/random1.d.ts]
export const random = "hello";

//// [/src/random2.d.ts]
export const random = "hello";

//// [/src/tsconfig.json]
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



Output::
/lib/tsc --b /src/tsconfig.json -v
[[90m12:00:17 AM[0m] Projects in this build: 
    * src/tsconfig.json

[[90m12:00:18 AM[0m] Project 'src/tsconfig.json' is out of date because output file 'src/tsconfig.tsbuildinfo' does not exist

[[90m12:00:19 AM[0m] Building project '/src/tsconfig.json'...

exitCode:: ExitStatus.Success


//// [/src/anotherNonConsecutive.d.ts]
export declare const nonConsecutive = "hello";


//// [/src/anotherNonConsecutive.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.nonConsecutive = void 0;
exports.nonConsecutive = "hello";


//// [/src/asArray1.d.ts]
export declare const x = "hello";


//// [/src/asArray1.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.x = void 0;
exports.x = "hello";


//// [/src/asArray2.d.ts]
export declare const x = "hello";


//// [/src/asArray2.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.x = void 0;
exports.x = "hello";


//// [/src/asArray3.d.ts]
export declare const x = "hello";


//// [/src/asArray3.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.x = void 0;
exports.x = "hello";


//// [/src/file1.d.ts]
export declare const x = "hello";


//// [/src/file1.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.x = void 0;
exports.x = "hello";


//// [/src/file2.d.ts]
export declare const y = "world";


//// [/src/file2.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.y = void 0;
exports.y = "world";


//// [/src/nonconsecutive.d.ts]
export declare const nonConsecutive = "hello";


//// [/src/nonconsecutive.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.nonConsecutive = void 0;
exports.nonConsecutive = "hello";


//// [/src/tsconfig.tsbuildinfo]
{"program":{"fileNames":["../lib/lib.d.ts","./file1.ts","./file2.ts","./random.d.ts","./nonconsecutive.ts","./random1.d.ts","./asarray1.ts","./asarray2.ts","./asarray3.ts","./random2.d.ts","./anothernonconsecutive.ts"],"fileInfos":[{"version":"3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true},{"version":"-10637577098-export const x = \"hello\";","signature":"-6425002032-export declare const x = \"hello\";\n"},{"version":"-11520681045-export const y = \"world\";","signature":"-5502661211-export declare const y = \"world\";\n"},"-10812219521-export const random = \"hello\";",{"version":"-4807644630-import { random } from \"./random\";\nexport const nonConsecutive = \"hello\";\n","signature":"-7909998901-export declare const nonConsecutive = \"hello\";\n"},"-10812219521-export const random = \"hello\";",{"version":"-21033449408-import { random } from \"./random1\";\nexport const x = \"hello\";\n","signature":"-6425002032-export declare const x = \"hello\";\n"},{"version":"-10637577098-export const x = \"hello\";","signature":"-6425002032-export declare const x = \"hello\";\n"},{"version":"-10637577098-export const x = \"hello\";","signature":"-6425002032-export declare const x = \"hello\";\n"},"-10812219521-export const random = \"hello\";",{"version":"-23429155204-import { random } from \"./random2\";\nexport const nonConsecutive = \"hello\";\n","signature":"-7909998901-export declare const nonConsecutive = \"hello\";\n"}],"root":[2,3,5,[7,9],11],"options":{"composite":true},"fileIdsList":[[10],[6],[4]],"referencedMap":[[11,1],[7,2],[5,3]],"exportedModulesMap":[],"semanticDiagnosticsPerFile":[1,11,7,8,9,2,3,5,4,6,10],"latestChangedDtsFile":"./anotherNonConsecutive.d.ts"},"version":"FakeTSVersion"}

//// [/src/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "program": {
    "fileNames": [
      "../lib/lib.d.ts",
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
    "fileNamesList": [
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
      "../lib/lib.d.ts": {
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
    "exportedModulesMap": {},
    "semanticDiagnosticsPerFile": [
      "../lib/lib.d.ts",
      "./anothernonconsecutive.ts",
      "./asarray1.ts",
      "./asarray2.ts",
      "./asarray3.ts",
      "./file1.ts",
      "./file2.ts",
      "./nonconsecutive.ts",
      "./random.d.ts",
      "./random1.d.ts",
      "./random2.d.ts"
    ],
    "latestChangedDtsFile": "./anotherNonConsecutive.d.ts"
  },
  "version": "FakeTSVersion",
  "size": 2141
}



Change:: delete file1
Input::
//// [/src/file1.d.ts] unlink
//// [/src/file1.js] unlink
//// [/src/file1.ts] unlink


Output::
/lib/tsc --b /src/tsconfig.json -v
[[90m12:00:40 AM[0m] Projects in this build: 
    * src/tsconfig.json

[[90m12:00:41 AM[0m] Project 'src/tsconfig.json' is out of date because buildinfo file 'src/tsconfig.tsbuildinfo' indicates that file 'src/file1.ts' was root file of compilation but not any more.

[[90m12:00:42 AM[0m] Building project '/src/tsconfig.json'...

exitCode:: ExitStatus.Success


//// [/src/tsconfig.tsbuildinfo]
{"program":{"fileNames":["../lib/lib.d.ts","./file2.ts","./random.d.ts","./nonconsecutive.ts","./random1.d.ts","./asarray1.ts","./asarray2.ts","./asarray3.ts","./random2.d.ts","./anothernonconsecutive.ts"],"fileInfos":[{"version":"3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true},{"version":"-11520681045-export const y = \"world\";","signature":"-5502661211-export declare const y = \"world\";\n"},"-10812219521-export const random = \"hello\";",{"version":"-4807644630-import { random } from \"./random\";\nexport const nonConsecutive = \"hello\";\n","signature":"-7909998901-export declare const nonConsecutive = \"hello\";\n"},"-10812219521-export const random = \"hello\";",{"version":"-21033449408-import { random } from \"./random1\";\nexport const x = \"hello\";\n","signature":"-6425002032-export declare const x = \"hello\";\n"},{"version":"-10637577098-export const x = \"hello\";","signature":"-6425002032-export declare const x = \"hello\";\n"},{"version":"-10637577098-export const x = \"hello\";","signature":"-6425002032-export declare const x = \"hello\";\n"},"-10812219521-export const random = \"hello\";",{"version":"-23429155204-import { random } from \"./random2\";\nexport const nonConsecutive = \"hello\";\n","signature":"-7909998901-export declare const nonConsecutive = \"hello\";\n"}],"root":[2,4,[6,8],10],"options":{"composite":true},"fileIdsList":[[9],[5],[3]],"referencedMap":[[10,1],[6,2],[4,3]],"exportedModulesMap":[],"semanticDiagnosticsPerFile":[1,10,6,7,8,2,4,3,5,9],"latestChangedDtsFile":"./anotherNonConsecutive.d.ts"},"version":"FakeTSVersion"}

//// [/src/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "program": {
    "fileNames": [
      "../lib/lib.d.ts",
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
    "fileNamesList": [
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
      "../lib/lib.d.ts": {
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
    "exportedModulesMap": {},
    "semanticDiagnosticsPerFile": [
      "../lib/lib.d.ts",
      "./anothernonconsecutive.ts",
      "./asarray1.ts",
      "./asarray2.ts",
      "./asarray3.ts",
      "./file2.ts",
      "./nonconsecutive.ts",
      "./random.d.ts",
      "./random1.d.ts",
      "./random2.d.ts"
    ],
    "latestChangedDtsFile": "./anotherNonConsecutive.d.ts"
  },
  "version": "FakeTSVersion",
  "size": 2003
}

