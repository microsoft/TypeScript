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

//// [/src/project/class1.ts]
const a: MagicNumber = 1;
console.log(a);

//// [/src/project/constants.ts]
export default 1;

//// [/src/project/reexport.ts]
export { default as ConstantNumber } from "./constants"

//// [/src/project/tsconfig.json]
{"compilerOptions":{"composite":true}}

//// [/src/project/types.d.ts]
type MagicNumber = typeof import('./reexport').ConstantNumber



Output::
/lib/tsc -p src/project
exitCode:: ExitStatus.Success


//// [/src/project/class1.d.ts]
declare const a = 1;


//// [/src/project/class1.js]
var a = 1;
console.log(a);


//// [/src/project/constants.d.ts]
declare const _default: 1;
export default _default;


//// [/src/project/constants.js]
"use strict";
exports.__esModule = true;
exports["default"] = 1;


//// [/src/project/reexport.d.ts]
export { default as ConstantNumber } from "./constants";


//// [/src/project/reexport.js]
"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
exports.__esModule = true;
exports.ConstantNumber = void 0;
var constants_1 = require("./constants");
__createBinding(exports, constants_1, "default", "ConstantNumber");


//// [/src/project/tsconfig.tsbuildinfo]
{"program":{"fileNames":["../../lib/lib.d.ts","./class1.ts","./constants.ts","./reexport.ts","./types.d.ts"],"fileInfos":[{"version":"3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true},{"version":"4085502068-const a: MagicNumber = 1;\nconsole.log(a);","signature":"-4973073251-declare const a = 1;\r\n","affectsGlobalScope":true},{"version":"-2659799048-export default 1;","signature":"-5298367302-declare const _default: 1;\r\nexport default _default;\r\n"},{"version":"-1476032387-export { default as ConstantNumber } from \"./constants\"","signature":"-1329721329-export { default as ConstantNumber } from \"./constants\";\r\n"},{"version":"2093085814-type MagicNumber = typeof import('./reexport').ConstantNumber","affectsGlobalScope":true}],"options":{"composite":true},"fileIdsList":[[3],[4]],"referencedMap":[[4,1],[5,2]],"exportedModulesMap":[[4,1],[5,2]],"semanticDiagnosticsPerFile":[1,2,3,4,5]},"version":"FakeTSVersion"}

//// [/src/project/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "program": {
    "fileNames": [
      "../../lib/lib.d.ts",
      "./class1.ts",
      "./constants.ts",
      "./reexport.ts",
      "./types.d.ts"
    ],
    "fileNamesList": [
      [
        "./constants.ts"
      ],
      [
        "./reexport.ts"
      ]
    ],
    "fileInfos": {
      "../../lib/lib.d.ts": {
        "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "signature": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "affectsGlobalScope": true
      },
      "./class1.ts": {
        "version": "4085502068-const a: MagicNumber = 1;\nconsole.log(a);",
        "signature": "-4973073251-declare const a = 1;\r\n",
        "affectsGlobalScope": true
      },
      "./constants.ts": {
        "version": "-2659799048-export default 1;",
        "signature": "-5298367302-declare const _default: 1;\r\nexport default _default;\r\n"
      },
      "./reexport.ts": {
        "version": "-1476032387-export { default as ConstantNumber } from \"./constants\"",
        "signature": "-1329721329-export { default as ConstantNumber } from \"./constants\";\r\n"
      },
      "./types.d.ts": {
        "version": "2093085814-type MagicNumber = typeof import('./reexport').ConstantNumber",
        "signature": "2093085814-type MagicNumber = typeof import('./reexport').ConstantNumber",
        "affectsGlobalScope": true
      }
    },
    "options": {
      "composite": true
    },
    "referencedMap": {
      "./reexport.ts": [
        "./constants.ts"
      ],
      "./types.d.ts": [
        "./reexport.ts"
      ]
    },
    "exportedModulesMap": {
      "./reexport.ts": [
        "./constants.ts"
      ],
      "./types.d.ts": [
        "./reexport.ts"
      ]
    },
    "semanticDiagnosticsPerFile": [
      "../../lib/lib.d.ts",
      "./class1.ts",
      "./constants.ts",
      "./reexport.ts",
      "./types.d.ts"
    ]
  },
  "version": "FakeTSVersion",
  "size": 1348
}



Change:: Modify imports used in global file
Input::
//// [/src/project/constants.ts]
export default 2;



Output::
/lib/tsc -p src/project
exitCode:: ExitStatus.Success


//// [/src/project/constants.d.ts]
declare const _default: 2;
export default _default;


//// [/src/project/constants.js]
"use strict";
exports.__esModule = true;
exports["default"] = 2;


//// [/src/project/reexport.d.ts] file written with same contents
//// [/src/project/reexport.js] file written with same contents
//// [/src/project/tsconfig.tsbuildinfo]
{"program":{"fileNames":["../../lib/lib.d.ts","./class1.ts","./constants.ts","./reexport.ts","./types.d.ts"],"fileInfos":[{"version":"3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true},{"version":"4085502068-const a: MagicNumber = 1;\nconsole.log(a);","signature":"-4973073251-declare const a = 1;\r\n","affectsGlobalScope":true},{"version":"-2659799015-export default 2;","signature":"1573564507-declare const _default: 2;\r\nexport default _default;\r\n"},{"version":"-1476032387-export { default as ConstantNumber } from \"./constants\"","signature":"-1329721329-export { default as ConstantNumber } from \"./constants\";\r\n"},{"version":"2093085814-type MagicNumber = typeof import('./reexport').ConstantNumber","affectsGlobalScope":true}],"options":{"composite":true},"fileIdsList":[[3],[4]],"referencedMap":[[4,1],[5,2]],"exportedModulesMap":[[4,1],[5,2]],"semanticDiagnosticsPerFile":[1,2,3,4,5]},"version":"FakeTSVersion"}

//// [/src/project/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "program": {
    "fileNames": [
      "../../lib/lib.d.ts",
      "./class1.ts",
      "./constants.ts",
      "./reexport.ts",
      "./types.d.ts"
    ],
    "fileNamesList": [
      [
        "./constants.ts"
      ],
      [
        "./reexport.ts"
      ]
    ],
    "fileInfos": {
      "../../lib/lib.d.ts": {
        "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "signature": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "affectsGlobalScope": true
      },
      "./class1.ts": {
        "version": "4085502068-const a: MagicNumber = 1;\nconsole.log(a);",
        "signature": "-4973073251-declare const a = 1;\r\n",
        "affectsGlobalScope": true
      },
      "./constants.ts": {
        "version": "-2659799015-export default 2;",
        "signature": "1573564507-declare const _default: 2;\r\nexport default _default;\r\n"
      },
      "./reexport.ts": {
        "version": "-1476032387-export { default as ConstantNumber } from \"./constants\"",
        "signature": "-1329721329-export { default as ConstantNumber } from \"./constants\";\r\n"
      },
      "./types.d.ts": {
        "version": "2093085814-type MagicNumber = typeof import('./reexport').ConstantNumber",
        "signature": "2093085814-type MagicNumber = typeof import('./reexport').ConstantNumber",
        "affectsGlobalScope": true
      }
    },
    "options": {
      "composite": true
    },
    "referencedMap": {
      "./reexport.ts": [
        "./constants.ts"
      ],
      "./types.d.ts": [
        "./reexport.ts"
      ]
    },
    "exportedModulesMap": {
      "./reexport.ts": [
        "./constants.ts"
      ],
      "./types.d.ts": [
        "./reexport.ts"
      ]
    },
    "semanticDiagnosticsPerFile": [
      "../../lib/lib.d.ts",
      "./class1.ts",
      "./constants.ts",
      "./reexport.ts",
      "./types.d.ts"
    ]
  },
  "version": "FakeTSVersion",
  "size": 1347
}

