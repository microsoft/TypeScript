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
class Foo {
}
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
const cls_1 = require("./cls");
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
const ns = __importStar(require("./cls"));
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
const ns = __importStar(require("./cls"));
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
const ns = __importStar(require("./cls"));
exports.classContainer = ns;
//// [cjs.js]
const ns = require("./cls");
module.exports = { ns };
//// [cjs2.js]
const ns = require("./cls");
export = ns;
module.exports = ns;
//// [cjs3.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ns = require("./cls");
export var ns = ns;
module.exports.ns = ns;
//// [cjs4.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ns = require("./cls");
export var names = ns;
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
export declare class Foo {
}
//// [func.d.ts]
export declare function func(): void;
//// [bar.d.ts]
export * from "./cls";
//// [bar2.d.ts]
export * from "./func";
export * from "./cls";
//// [baz.d.ts]
import { Foo } from "./cls";
export { Foo };
//// [bat.d.ts]
import * as ns from "./cls";
export default ns;
//// [ban.d.ts]
import * as ns from "./cls";
export { ns };
//// [bol.d.ts]
import * as ns from "./cls";
export { ns as classContainer };
//// [cjs.d.ts]
declare const ns: typeof ns;
declare const _default: {
    ns: typeof ns;
};
export = _default;
//// [cjs2.d.ts]
export = ns;
//// [cjs3.d.ts]
export var ns = ns;
export {};
//// [cjs4.d.ts]
export var names = ns;
export {};
//// [includeAll.d.ts]
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


//// [DtsFileErrors]


out/cjs.d.ts(1,15): error TS2502: 'ns' is referenced directly or indirectly in its own type annotation.
out/cjs2.d.ts(1,10): error TS2304: Cannot find name 'ns'.
out/cjs3.d.ts(1,17): error TS1039: Initializers are not allowed in ambient contexts.
out/cjs4.d.ts(1,20): error TS1039: Initializers are not allowed in ambient contexts.
out/cjs4.d.ts(1,20): error TS2304: Cannot find name 'ns'.


==== out/cls.d.ts (0 errors) ====
    export declare class Foo {
    }
    
==== out/func.d.ts (0 errors) ====
    export declare function func(): void;
    
==== out/bar.d.ts (0 errors) ====
    export * from "./cls";
    
==== out/bar2.d.ts (0 errors) ====
    export * from "./func";
    export * from "./cls";
    
==== out/baz.d.ts (0 errors) ====
    import { Foo } from "./cls";
    export { Foo };
    
==== out/bat.d.ts (0 errors) ====
    import * as ns from "./cls";
    export default ns;
    
==== out/ban.d.ts (0 errors) ====
    import * as ns from "./cls";
    export { ns };
    
==== out/bol.d.ts (0 errors) ====
    import * as ns from "./cls";
    export { ns as classContainer };
    
==== out/cjs.d.ts (1 errors) ====
    declare const ns: typeof ns;
                  ~~
!!! error TS2502: 'ns' is referenced directly or indirectly in its own type annotation.
    declare const _default: {
        ns: typeof ns;
    };
    export = _default;
    
==== out/cjs2.d.ts (1 errors) ====
    export = ns;
             ~~
!!! error TS2304: Cannot find name 'ns'.
    
==== out/cjs3.d.ts (1 errors) ====
    export var ns = ns;
                    ~~
!!! error TS1039: Initializers are not allowed in ambient contexts.
    export {};
    
==== out/cjs4.d.ts (2 errors) ====
    export var names = ns;
                       ~~
!!! error TS1039: Initializers are not allowed in ambient contexts.
                       ~~
!!! error TS2304: Cannot find name 'ns'.
    export {};
    
==== out/includeAll.d.ts (0 errors) ====
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
    