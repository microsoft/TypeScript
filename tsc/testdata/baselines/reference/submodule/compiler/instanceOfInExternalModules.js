//// [tests/cases/compiler/instanceOfInExternalModules.ts] ////

//// [instanceOfInExternalModules_require.ts]
export class Foo { foo: string; }

//// [instanceOfInExternalModules_1.ts]
///<reference path='instanceOfInExternalModules_require.ts'/>
import Bar = require("instanceOfInExternalModules_require");
function IsFoo(value: any): boolean {
    return value instanceof Bar.Foo;
}


//// [instanceOfInExternalModules_require.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Foo = void 0;
class Foo {
    foo;
}
exports.Foo = Foo;
//// [instanceOfInExternalModules_1.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Bar = require("instanceOfInExternalModules_require");
function IsFoo(value) {
    return value instanceof Bar.Foo;
}
