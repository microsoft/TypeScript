//// [tests/cases/compiler/duplicatePackage_globalMerge.ts] ////

//// [index.ts]
import * as React from 'react';
export var x = 1
//// [index.ts]
import * as React from 'react';
export var y = 2

//// [package.json]
{ "name": "@types/react", "version": "16.4.6" }
//// [index.d.ts]

//// [package.json]
{ "name": "@types/react", "version": "16.4.6" }
//// [index.d.ts]
declare global { }

//// [bug25410.ts]
import { x } from './index'
import { y } from '../tests/index'


//// [index.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.x = void 0;
exports.x = 1;
//// [index.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.y = void 0;
exports.y = 2;
//// [bug25410.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
