//// [tests/cases/compiler/systemModuleWithSuperClass.ts] ////

//// [foo.ts]
export class Foo {
    a: string;
}

//// [bar.ts]
import {Foo} from './foo';
export class Bar extends Foo {
    b: string;
}

//// [foo.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Foo = void 0;
class Foo {
    a;
}
exports.Foo = Foo;
//// [bar.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Bar = void 0;
const foo_1 = require("./foo");
class Bar extends foo_1.Foo {
    b;
}
exports.Bar = Bar;
