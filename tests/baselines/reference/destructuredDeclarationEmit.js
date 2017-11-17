//// [tests/cases/compiler/destructuredDeclarationEmit.ts] ////

//// [foo.ts]
const foo = { bar: 'hello', bat: 'world', bam: { bork: { bar: 'a', baz: 'b' } } };
export { foo };
//// [index.ts]
import { foo } from './foo';
export { foo };

const { bar: baz, bat, bam: { bork: { bar: ibar, baz: ibaz } } } = foo;
export { baz, ibaz };

//// [foo.js]
"use strict";
exports.__esModule = true;
var foo = { bar: 'hello', bat: 'world', bam: { bork: { bar: 'a', baz: 'b' } } };
exports.foo = foo;
//// [index.js]
"use strict";
exports.__esModule = true;
var foo_1 = require("./foo");
exports.foo = foo_1.foo;
var baz = foo_1.foo.bar, bat = foo_1.foo.bat, _a = foo_1.foo.bam.bork, ibar = _a.bar, ibaz = _a.baz;
exports.baz = baz;
exports.ibaz = ibaz;


//// [foo.d.ts]
declare const foo: {
    bar: string;
    bat: string;
    bam: {
        bork: {
            bar: string;
            baz: string;
        };
    };
};
export { foo };
//// [index.d.ts]
import { foo } from './foo';
export { foo };
declare const baz: string, ibaz: string;
export { baz, ibaz };
