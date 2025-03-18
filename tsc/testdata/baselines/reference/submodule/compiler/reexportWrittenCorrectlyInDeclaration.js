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
class ThingA {
}
exports.ThingA = ThingA;
//// [ThingB.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ThingB = void 0;
class ThingB {
}
exports.ThingB = ThingB;
//// [Things.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ThingB = exports.ThingA = void 0;
const ThingA_1 = require("./ThingA");
Object.defineProperty(exports, "ThingA", { enumerable: true, get: function () { return ThingA_1.ThingA; } });
const ThingB_1 = require("./ThingB");
Object.defineProperty(exports, "ThingB", { enumerable: true, get: function () { return ThingB_1.ThingB; } });
//// [Test.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Test = void 0;
class Test {
    method = (input) => { };
}
exports.Test = Test;
