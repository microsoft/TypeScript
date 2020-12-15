//// [tests/cases/compiler/reexportWrittenCorrectlyInDeclaration.ts] ////

//// [ThingA.ts]
// https://github.com/Microsoft/TypeScript/issues/8612
export class ThingA { } 

//// [ThingB.ts]
export class ThingB { }

//// [Things.ts]
export {ThingA} from "./ThingA";
export {ThingB} from "./ThingB";

//// [Test.ts]
import * as things from "./Things";

export class Test {
    public method = (input: things.ThingA)  => { };
}

//// [ThingA.js]
"use strict";
exports.__esModule = true;
exports.ThingA = void 0;
// https://github.com/Microsoft/TypeScript/issues/8612
var ThingA = /** @class */ (function () {
    function ThingA() {
    }
    return ThingA;
}());
exports.ThingA = ThingA;
//// [ThingB.js]
"use strict";
exports.__esModule = true;
exports.ThingB = void 0;
var ThingB = /** @class */ (function () {
    function ThingB() {
    }
    return ThingB;
}());
exports.ThingB = ThingB;
//// [Things.js]
"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
exports.__esModule = true;
exports.ThingB = exports.ThingA = void 0;
var ThingA_1 = require("./ThingA");
__createBinding(exports, ThingA_1, "ThingA");
var ThingB_1 = require("./ThingB");
__createBinding(exports, ThingB_1, "ThingB");
//// [Test.js]
"use strict";
exports.__esModule = true;
exports.Test = void 0;
var Test = /** @class */ (function () {
    function Test() {
        this.method = function (input) { };
    }
    return Test;
}());
exports.Test = Test;


//// [ThingA.d.ts]
export declare class ThingA {
}
//// [ThingB.d.ts]
export declare class ThingB {
}
//// [Things.d.ts]
export { ThingA } from "./ThingA";
export { ThingB } from "./ThingB";
//// [Test.d.ts]
import * as things from "./Things";
export declare class Test {
    method: (input: things.ThingA) => void;
}
