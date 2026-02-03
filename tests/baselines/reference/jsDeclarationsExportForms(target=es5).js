//// [tests/cases/conformance/jsdoc/declarations/jsDeclarationsExportForms.ts] ////

//// [cls.js]
export class Foo {}

//// [func.js]
export function func() {}

//// [bar.js]
export * from "./cls";

//// [bar2.js]
export * from "./func";
export * from "./cls";

//// [baz.js]
import {Foo} from "./cls";
export {Foo};

//// [bat.js]
import * as ns from "./cls";
export default ns;

//// [ban.js]
import * as ns from "./cls";
export {ns};

//// [bol.js]
import * as ns from "./cls";
export { ns as classContainer };

//// [cjs.js]
const ns = require("./cls");
module.exports = { ns };

//// [cjs2.js]
const ns = require("./cls");
module.exports = ns;

//// [cjs3.js]
const ns = require("./cls");
module.exports.ns = ns;

//// [cjs4.js]
const ns = require("./cls");
module.exports.names = ns;

//// [includeAll.js]
import "./cjs4";
import "./cjs3";
import "./cjs2";
import "./cjs";
import "./bol";
import "./ban";
import "./bat";
import "./baz";
import "./bar";
import "./bar2";


//// [cls.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Foo = void 0;
var Foo = /** @class */ (function () {
    function Foo() {
    }
    return Foo;
}());
exports.Foo = Foo;
//// [func.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.func = func;
function func() { }
//// [bar.js]
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
__exportStar(require("./cls"), exports);
//// [bar2.js]
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
__exportStar(require("./func"), exports);
__exportStar(require("./cls"), exports);
//// [baz.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Foo = void 0;
var cls_1 = require("./cls");
Object.defineProperty(exports, "Foo", { enumerable: true, get: function () { return cls_1.Foo; } });
//// [bat.js]
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
Object.defineProperty(exports, "__esModule", { value: true });
var ns = __importStar(require("./cls"));
exports.default = ns;
//// [ban.js]
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ns = void 0;
var ns = __importStar(require("./cls"));
exports.ns = ns;
//// [bol.js]
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.classContainer = void 0;
var ns = __importStar(require("./cls"));
exports.classContainer = ns;
//// [cjs.js]
var ns = require("./cls");
module.exports = { ns: ns };
//// [cjs2.js]
var ns = require("./cls");
module.exports = ns;
//// [cjs3.js]
var ns = require("./cls");
module.exports.ns = ns;
//// [cjs4.js]
var ns = require("./cls");
module.exports.names = ns;
//// [includeAll.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("./cjs4");
require("./cjs3");
require("./cjs2");
require("./cjs");
require("./bol");
require("./ban");
require("./bat");
require("./baz");
require("./bar");
require("./bar2");


//// [cls.d.ts]
export class Foo {
}
//// [func.d.ts]
export function func(): void;
//// [bar.d.ts]
export * from "./cls";
//// [bar2.d.ts]
export * from "./func";
export * from "./cls";
//// [baz.d.ts]
export { Foo };
import { Foo } from "./cls";
//// [bat.d.ts]
export default ns;
import * as ns from "./cls";
//// [ban.d.ts]
export { ns };
import * as ns from "./cls";
//// [bol.d.ts]
export { ns as classContainer };
import * as ns from "./cls";
//// [cjs.d.ts]
export { ns };
import ns = require("./cls");
//// [cjs2.d.ts]
export = ns;
import ns = require("./cls");
//// [cjs3.d.ts]
export { ns };
import ns = require("./cls");
//// [cjs4.d.ts]
export { ns as names };
import ns = require("./cls");
//// [includeAll.d.ts]
export {};
