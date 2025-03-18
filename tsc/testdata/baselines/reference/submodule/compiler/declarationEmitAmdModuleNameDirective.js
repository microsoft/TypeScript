//// [tests/cases/compiler/declarationEmitAmdModuleNameDirective.ts] ////

//// [foo.ts]
/// <amd-module name="name_of_foo"/>
export const foo = 1;
//// [bar.ts]
/// <amd-dependency name="name_of_foo" path="./foo" />
import {foo} from './foo';
void foo;

//// [foo.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.foo = void 0;
exports.foo = 1;
//// [bar.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const foo_1 = require("./foo");
void foo_1.foo;
