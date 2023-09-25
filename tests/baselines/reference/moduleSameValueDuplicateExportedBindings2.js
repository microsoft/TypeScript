//// [tests/cases/compiler/moduleSameValueDuplicateExportedBindings2.ts] ////

//// [a.ts]
export * from "./b";
export * from "./c";

//// [b.ts]
export {Animals} from "./c";

//// [c.ts]
export enum Animals {
	Cat,
	Dog
};

//// [c.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Animals = void 0;
var Animals;
(function (Animals) {
    Animals[Animals["Cat"] = 0] = "Cat";
    Animals[Animals["Dog"] = 1] = "Dog";
})(Animals || (exports.Animals = Animals = {}));
;
//// [b.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Animals = void 0;
var c_1 = require("./c");
Object.defineProperty(exports, "Animals", { enumerable: true, get: function () { return c_1.Animals; } });
//// [a.js]
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
__exportStar(require("./b"), exports);
__exportStar(require("./c"), exports);
