//// [tests/cases/compiler/reexportWrittenCorrectlyInDeclaration.ts] ////

//// [ThingA.ts]
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ThingA = void 0;
var ThingA = /** @class */ (function () {
    function ThingA() {
    }
    return ThingA;
}());
exports.ThingA = ThingA;
//// [ThingB.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ThingB = void 0;
var ThingB = /** @class */ (function () {
    function ThingB() {
    }
    return ThingB;
}());
exports.ThingB = ThingB;
//// [Things.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ThingB = exports.ThingA = void 0;
var ThingA_1 = require("./ThingA");
Object.defineProperty(exports, "ThingA", { enumerable: true, get: function () { return ThingA_1.ThingA; } });
var ThingB_1 = require("./ThingB");
Object.defineProperty(exports, "ThingB", { enumerable: true, get: function () { return ThingB_1.ThingB; } });
//// [Test.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
