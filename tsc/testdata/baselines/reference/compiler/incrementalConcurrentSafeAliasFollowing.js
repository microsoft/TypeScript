//// [tests/cases/compiler/incrementalConcurrentSafeAliasFollowing.ts] ////

//// [a.tsbuildinfo]
{
  "version": "TEST",
  "root": [ [ 8, 9 ] ],
  "fileNames": [
    "lib.d.ts",
    "lib.es5.d.ts",
    "lib.dom.d.ts",
    "lib.webworker.importscripts.d.ts",
    "lib.scripthost.d.ts",
    "lib.decorators.d.ts",
    "lib.decorators.legacy.d.ts",
    "./.src/file2.ts",
    "./.src/file1.ts"
  ],
  "fileInfos": [
    "8aa2344ef67b04dfd9aa23b0f29ffb31",
    {
      "version": "71cf8049ea8d435bcdf47408dac2525c",
      "affectsGlobalScope": true,
      "impliedNodeFormat": 1
    },
    {
      "version": "9cf691967d2e0b0210f5864fdf1ad87a",
      "affectsGlobalScope": true,
      "impliedNodeFormat": 1
    },
    {
      "version": "eb49c11101339d745cfc83e213607152",
      "affectsGlobalScope": true,
      "impliedNodeFormat": 1
    },
    {
      "version": "a4fa81fccf6300a830a36517b5beb51f",
      "affectsGlobalScope": true,
      "impliedNodeFormat": 1
    },
    {
      "version": "45c91c5f844a9ee1df11d1b71c484b0e",
      "affectsGlobalScope": true,
      "impliedNodeFormat": 1
    },
    {
      "version": "39e009135c77d60baa790854b51d2195",
      "affectsGlobalScope": true,
      "impliedNodeFormat": 1
    },
    "ed441e10e1833cd4635f7c61645b7ee7",
    "553372ff8498789eb6e91ea68f08e47a"
  ],
  "fileIdsList": [ [ 8 ] ],
  "options": {
    "newLine": 1,
    "noErrorTruncation": true,
    "skipDefaultLibCheck": true,
    "tsBuildInfoFile": "./a.tsbuildinfo"
  },
  "referencedMap": [ [ 9, 1 ] ]
}
//// [file1.ts]
// need an out of date but present buildinfo, chained export aliases,
// and enough files that the same checker is used for multiple files
// to trigger the race from typescript-go/#1470
import {b} from "./file2.js"

export type {b as c}
//// [file2.ts]
const a = 1

export type {a as b}
//// [file0.ts]
import {c} from "./file1.js"

export type {c as d}
//// [file3.ts]
import {b} from "./file2.js"

export type {b as e}
//// [file4.ts]
import {b} from "./file2.js"

export type {b as f}
//// [file5.ts]
import {b} from "./file2.js"

export type {b as g}
//// [file6.ts]
import {b} from "./file2.js"

export type {b as h}
//// [file7.ts]
import {b} from "./file2.js"

export type {b as i}
//// [file8.ts]
import {b} from "./file2.js"

export type {b as j}
//// [file9.ts]
import {b} from "./file2.js"

export type {b as k}
//// [file10.ts]
import {b} from "./file2.js"

export type {b as l}
//// [file11.ts]
import {b} from "./file2.js"

export type {b as m}
//// [file12.ts]
import {b} from "./file2.js"

export type {b as n}
//// [file13.ts]
import {b} from "./file2.js"

export type {b as o}
//// [file14.ts]
import {b} from "./file2.js"

export type {b as p}
//// [file15.ts]
import {b} from "./file2.js"

export type {b as q}
//// [barrel.ts]
export * from "./file0.js"
export * from "./file1.js"
export * from "./file2.js"
export * from "./file3.js"
export * from "./file4.js"
export * from "./file5.js"
export * from "./file6.js"
export * from "./file7.js"
export * from "./file8.js"
export * from "./file9.js"
export * from "./file10.js"
export * from "./file11.js"
export * from "./file12.js"
export * from "./file13.js"
export * from "./file14.js"
export * from "./file15.js"

//// [file2.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const a = 1;
//// [file1.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//// [file0.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//// [file3.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//// [file4.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//// [file5.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//// [file6.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//// [file7.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//// [file8.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//// [file9.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//// [file10.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//// [file11.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//// [file12.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//// [file13.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//// [file14.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//// [file15.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//// [barrel.js]
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
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
__exportStar(require("./file0.js"), exports);
__exportStar(require("./file1.js"), exports);
__exportStar(require("./file2.js"), exports);
__exportStar(require("./file3.js"), exports);
__exportStar(require("./file4.js"), exports);
__exportStar(require("./file5.js"), exports);
__exportStar(require("./file6.js"), exports);
__exportStar(require("./file7.js"), exports);
__exportStar(require("./file8.js"), exports);
__exportStar(require("./file9.js"), exports);
__exportStar(require("./file10.js"), exports);
__exportStar(require("./file11.js"), exports);
__exportStar(require("./file12.js"), exports);
__exportStar(require("./file13.js"), exports);
__exportStar(require("./file14.js"), exports);
__exportStar(require("./file15.js"), exports);


//// [file2.d.ts]
declare const a = 1;
export type { a as b };
//// [file1.d.ts]
import { b } from "./file2.js";
export type { b as c };
//// [file0.d.ts]
import { c } from "./file1.js";
export type { c as d };
//// [file3.d.ts]
import { b } from "./file2.js";
export type { b as e };
//// [file4.d.ts]
import { b } from "./file2.js";
export type { b as f };
//// [file5.d.ts]
import { b } from "./file2.js";
export type { b as g };
//// [file6.d.ts]
import { b } from "./file2.js";
export type { b as h };
//// [file7.d.ts]
import { b } from "./file2.js";
export type { b as i };
//// [file8.d.ts]
import { b } from "./file2.js";
export type { b as j };
//// [file9.d.ts]
import { b } from "./file2.js";
export type { b as k };
//// [file10.d.ts]
import { b } from "./file2.js";
export type { b as l };
//// [file11.d.ts]
import { b } from "./file2.js";
export type { b as m };
//// [file12.d.ts]
import { b } from "./file2.js";
export type { b as n };
//// [file13.d.ts]
import { b } from "./file2.js";
export type { b as o };
//// [file14.d.ts]
import { b } from "./file2.js";
export type { b as p };
//// [file15.d.ts]
import { b } from "./file2.js";
export type { b as q };
//// [barrel.d.ts]
export * from "./file0.js";
export * from "./file1.js";
export * from "./file2.js";
export * from "./file3.js";
export * from "./file4.js";
export * from "./file5.js";
export * from "./file6.js";
export * from "./file7.js";
export * from "./file8.js";
export * from "./file9.js";
export * from "./file10.js";
export * from "./file11.js";
export * from "./file12.js";
export * from "./file13.js";
export * from "./file14.js";
export * from "./file15.js";
