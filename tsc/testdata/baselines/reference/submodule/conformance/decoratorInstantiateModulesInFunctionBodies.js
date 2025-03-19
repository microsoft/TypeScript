//// [tests/cases/conformance/decorators/class/decoratorInstantiateModulesInFunctionBodies.ts] ////

//// [a.ts]
// from #3108
export var test = 'abc';

//// [b.ts]
import { test } from './a';

function filter(handler: any) {
    return function (target: any, propertyKey: string) {
        // ...
    };
}

class Wat {
    @filter(() => test == 'abc')
    static whatever() {
        // ...
    }
}

//// [a.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.test = void 0;
// from #3108
exports.test = 'abc';
//// [b.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const a_1 = require("./a");
function filter(handler) {
    return function (target, propertyKey) {
        // ...
    };
}
class Wat {
    @filter(() => a_1.test == 'abc')
    static whatever() {
        // ...
    }
}
