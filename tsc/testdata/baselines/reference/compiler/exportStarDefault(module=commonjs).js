//// [tests/cases/compiler/exportStarDefault.ts] ////

//// [default.ts]
export default class Default {}
export const named = 1;

//// [other.ts]
export default class Other {}

//// [reexport.ts]
export * from "./default";

//// [ambiguous.ts]
export * from "./default";
export * from "./other";

//// [resolved.ts]
export * from "./default";
export * from "./other";
export { default } from "./default";

//// [localDefault.ts]
export * from "./default";
export * from "./other";
export default class Local {}

//// [localDefaultExpression.ts]
export * from "./default";
export * from "./other";
export default 1;

//// [defaultType.ts]
export default interface DefaultType {
    value: string;
}

//// [reexportType.ts]
export type * from "./defaultType";

//// [main.ts]
import Default, { named } from "./reexport";
import Resolved from "./resolved";
import Local from "./localDefault";
import valueDefault from "./localDefaultExpression";
import type DefaultType from "./reexportType";

new Default();
new Resolved();
new Local();
valueDefault.toFixed();
const value: DefaultType = { value: "" };
named;


//// [default.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.named = void 0;
class Default {
}
exports.default = Default;
exports.named = 1;
//// [other.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Other {
}
exports.default = Other;
//// [reexport.js]
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
    for (var p in m) if (!Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
__exportStar(require("./default"), exports);
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
    for (var p in m) if (!Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
__exportStar(require("./default"), exports);
__exportStar(require("./other"), exports);
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
    for (var p in m) if (!Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = void 0;
__exportStar(require("./default"), exports);
__exportStar(require("./other"), exports);
var default_1 = require("./default");
Object.defineProperty(exports, "default", { enumerable: true, get: function () { return __importDefault(default_1).default; } });
//// [localDefault.js]
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
    for (var p in m) if (!Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = void 0;
__exportStar(require("./default"), exports);
__exportStar(require("./other"), exports);
class Local {
}
exports.default = Local;
//// [localDefaultExpression.js]
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
    for (var p in m) if (!Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = void 0;
__exportStar(require("./default"), exports);
__exportStar(require("./other"), exports);
exports.default = 1;
//// [defaultType.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//// [reexportType.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//// [main.js]
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
const reexport_1 = __importStar(require("./reexport"));
const resolved_1 = __importDefault(require("./resolved"));
const localDefault_1 = __importDefault(require("./localDefault"));
const localDefaultExpression_1 = __importDefault(require("./localDefaultExpression"));
new reexport_1.default();
new resolved_1.default();
new localDefault_1.default();
localDefaultExpression_1.default.toFixed();
const value = { value: "" };
reexport_1.named;


//// [default.d.ts]
export default class Default {
}
export declare const named = 1;
//// [other.d.ts]
export default class Other {
}
//// [reexport.d.ts]
export * from "./default";
//// [ambiguous.d.ts]
export * from "./default";
export * from "./other";
//// [resolved.d.ts]
export * from "./default";
export * from "./other";
export { default } from "./default";
//// [localDefault.d.ts]
export * from "./default";
export * from "./other";
export default class Local {
}
//// [localDefaultExpression.d.ts]
export * from "./default";
export * from "./other";
declare const _default = 1;
export default _default;
//// [defaultType.d.ts]
export default interface DefaultType {
    value: string;
}
//// [reexportType.d.ts]
export type * from "./defaultType";
//// [main.d.ts]
export {};
