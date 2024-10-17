//// [tests/cases/conformance/externalModules/typeOnly/importEquals1.ts] ////

//// [a.ts]
export class A {}

//// [b.ts]
import type * as types from './a';
export = types; // Error

//// [c.ts]
import * as types from './a';
export = types;

//// [d.ts]
import types from './b';
new types.A(); // Error

//// [e.ts]
import types = require('./b');
new types.A(); // Error

//// [f.ts]
import * as types from './b';
new types.A(); // Error

//// [g.ts]
import type types from './c'
new types.A(); // Error


//// [a.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.A = void 0;
var A = /** @class */ (function () {
    function A() {
    }
    return A;
}());
exports.A = A;
//// [b.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//// [c.js]
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
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var types = __importStar(require("./a"));
module.exports = types;
//// [d.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
new types.A(); // Error
//// [e.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
new types.A(); // Error
//// [f.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
new types.A(); // Error
//// [g.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
new types.A(); // Error
