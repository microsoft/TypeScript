//// [tests/cases/compiler/importUsedInExtendsList1.ts] ////

//// [importUsedInExtendsList1_require.ts]
export class Super { foo: string; }

//// [importUsedInExtendsList1_1.ts]
///<reference path='importUsedInExtendsList1_require.ts'/>
import foo = require('./importUsedInExtendsList1_require');
class Sub extends foo.Super { }
var s: Sub;
var r: string = s.foo;


//// [importUsedInExtendsList1_require.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Super = void 0;
class Super {
    foo;
}
exports.Super = Super;
//// [importUsedInExtendsList1_1.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
///<reference path='importUsedInExtendsList1_require.ts'/>
const foo = require("./importUsedInExtendsList1_require");
class Sub extends foo.Super {
}
var s;
var r = s.foo;
