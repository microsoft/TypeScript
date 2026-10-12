//// [tests/cases/compiler/exportStarDefault.ts] ////

//// [first.ts]
export default class First { first = 1; }
export const shared = 1;
export const unique = "first";

//// [second.ts]
export default class Second { second = 2; }
export const shared = 2;

//// [single.ts]
export * from "./first";

//// [diamond.ts]
export * from "./first";
export * from "./single";

//// [ambiguous.ts]
export * from "./first";
export * from "./second";

//// [forwarded.ts]
export * from "./ambiguous";

//// [resolved.ts]
export * from "./ambiguous";
export { default, shared } from "./first";

//// [local.ts]
export * from "./first";
export * from "./second";
export default "local";
export const shared = true;

//// [localClass.ts]
export * from "./first";
export default class LocalClass { local = true; }

//// [localFunction.ts]
export * from "./first";
export default function localFunction() { return true; }

//// [cycleA.ts]
export * from "./cycleB";

//// [cycleB.ts]
export * from "./cycleA";
export * from "./first";

//// [namedConflict.ts]
export { shared } from "./ambiguous";

//// [firstDeclaration.d.ts]
export default class FirstDeclaration { first: number; }

//// [secondDeclaration.d.ts]
export default class SecondDeclaration { second: number; }

//// [ambiguousDeclaration.d.ts]
export * from "./firstDeclaration";
export * from "./secondDeclaration";

//// [consumer.ts]
import First from "./single";
import { default as Diamond, shared as diamondShared } from "./diamond";
import Resolved, { shared as resolvedShared } from "./resolved";
import Local, { shared as localShared } from "./local";
import LocalClass from "./localClass";
import localFunction from "./localFunction";
import Cycle from "./cycleA";
import * as single from "./single";
import * as ambiguous from "./ambiguous";
import * as forwarded from "./forwarded";
import * as namedConflict from "./namedConflict";
import Conflict, { default as NamedConflict, shared, unique } from "./ambiguous";
import DeclarationConflict from "./ambiguousDeclaration";
export { default, shared as conflict } from "./forwarded";

new First().first;
new Diamond().first;
new Resolved().first;
new single.default().first;
new single["default"]().first;
new LocalClass().local;
const localResult: boolean = localFunction();
new Cycle().first;
const one: 1 = diamondShared;
const anotherOne: 1 = resolvedShared;
const text: string = Local;
const flag: boolean = localShared;
const nonconflicting: string = unique;

ambiguous.default;
ambiguous["default"];
ambiguous.shared;
ambiguous["shared"];
forwarded.default;
forwarded["shared"];
namedConflict.shared;
// Conflicting accesses have the error type, without cascading errors.
ambiguous.default.nonexistent();
ambiguous["shared"].nonexistent();
Conflict.nonexistent();
NamedConflict.nonexistent();
shared.nonexistent();
DeclarationConflict.nonexistent();


//// [first.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.unique = exports.shared = void 0;
class First {
    first = 1;
}
exports.default = First;
exports.shared = 1;
exports.unique = "first";
//// [second.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.shared = void 0;
class Second {
    second = 2;
}
exports.default = Second;
exports.shared = 2;
//// [single.js]
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
    for (var p in m) if (p !== "__esModule" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
__exportStar(require("./first"), exports);
//// [diamond.js]
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
    for (var p in m) if (p !== "__esModule" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
__exportStar(require("./first"), exports);
__exportStar(require("./single"), exports);
//// [ambiguous.js]
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
    for (var p in m) if (p !== "__esModule" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
__exportStar(require("./first"), exports);
__exportStar(require("./second"), exports);
//// [forwarded.js]
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
    for (var p in m) if (p !== "__esModule" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
__exportStar(require("./ambiguous"), exports);
//// [resolved.js]
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
    for (var p in m) if (p !== "__esModule" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.shared = exports.default = void 0;
__exportStar(require("./ambiguous"), exports);
var first_1 = require("./first");
Object.defineProperty(exports, "default", { enumerable: true, get: function () { return __importDefault(first_1).default; } });
Object.defineProperty(exports, "shared", { enumerable: true, get: function () { return first_1.shared; } });
//// [local.js]
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
    for (var p in m) if (p !== "__esModule" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = exports.shared = void 0;
__exportStar(require("./first"), exports);
__exportStar(require("./second"), exports);
exports.default = "local";
exports.shared = true;
//// [localClass.js]
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
    for (var p in m) if (p !== "__esModule" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = void 0;
__exportStar(require("./first"), exports);
class LocalClass {
    local = true;
}
exports.default = LocalClass;
//// [localFunction.js]
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
    for (var p in m) if (p !== "__esModule" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = localFunction;
__exportStar(require("./first"), exports);
function localFunction() { return true; }
//// [cycleB.js]
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
    for (var p in m) if (p !== "__esModule" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
__exportStar(require("./cycleA"), exports);
__exportStar(require("./first"), exports);
//// [cycleA.js]
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
    for (var p in m) if (p !== "__esModule" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
__exportStar(require("./cycleB"), exports);
//// [namedConflict.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.shared = void 0;
var ambiguous_1 = require("./ambiguous");
Object.defineProperty(exports, "shared", { enumerable: true, get: function () { return ambiguous_1.shared; } });
//// [consumer.js]
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.conflict = exports.default = void 0;
const single_1 = __importDefault(require("./single"));
const diamond_1 = __importStar(require("./diamond"));
const resolved_1 = __importStar(require("./resolved"));
const local_1 = __importStar(require("./local"));
const localClass_1 = __importDefault(require("./localClass"));
const localFunction_1 = __importDefault(require("./localFunction"));
const cycleA_1 = __importDefault(require("./cycleA"));
const single = __importStar(require("./single"));
const ambiguous = __importStar(require("./ambiguous"));
const forwarded = __importStar(require("./forwarded"));
const namedConflict = __importStar(require("./namedConflict"));
const ambiguous_1 = __importStar(require("./ambiguous"));
const ambiguousDeclaration_1 = __importDefault(require("./ambiguousDeclaration"));
var forwarded_1 = require("./forwarded");
Object.defineProperty(exports, "default", { enumerable: true, get: function () { return __importDefault(forwarded_1).default; } });
Object.defineProperty(exports, "conflict", { enumerable: true, get: function () { return forwarded_1.shared; } });
new single_1.default().first;
new diamond_1.default().first;
new resolved_1.default().first;
new single.default().first;
new single["default"]().first;
new localClass_1.default().local;
const localResult = (0, localFunction_1.default)();
new cycleA_1.default().first;
const one = diamond_1.shared;
const anotherOne = resolved_1.shared;
const text = local_1.default;
const flag = local_1.shared;
const nonconflicting = ambiguous_1.unique;
ambiguous.default;
ambiguous["default"];
ambiguous.shared;
ambiguous["shared"];
forwarded.default;
forwarded["shared"];
namedConflict.shared;
// Conflicting accesses have the error type, without cascading errors.
ambiguous.default.nonexistent();
ambiguous["shared"].nonexistent();
ambiguous_1.default.nonexistent();
ambiguous_1.default.nonexistent();
ambiguous_1.shared.nonexistent();
ambiguousDeclaration_1.default.nonexistent();


//// [first.d.ts]
export default class First {
    first: number;
}
export declare const shared = 1;
export declare const unique = "first";
//// [second.d.ts]
export default class Second {
    second: number;
}
export declare const shared = 2;
//// [single.d.ts]
export * from "./first";
//// [diamond.d.ts]
export * from "./first";
export * from "./single";
//// [ambiguous.d.ts]
export * from "./first";
export * from "./second";
//// [forwarded.d.ts]
export * from "./ambiguous";
//// [resolved.d.ts]
export * from "./ambiguous";
export { default, shared } from "./first";
//// [local.d.ts]
export * from "./first";
export * from "./second";
declare const _default = "local";
export default _default;
export declare const shared = true;
//// [localClass.d.ts]
export * from "./first";
export default class LocalClass {
    local: boolean;
}
//// [localFunction.d.ts]
export * from "./first";
export default function localFunction(): boolean;
//// [cycleB.d.ts]
export * from "./cycleA";
export * from "./first";
//// [cycleA.d.ts]
export * from "./cycleB";
//// [namedConflict.d.ts]
export { shared } from "./ambiguous";
//// [consumer.d.ts]
export { default, shared as conflict } from "./forwarded";
