//// [tests/cases/compiler/destructuredDeclarationEmit.ts] ////

//// [foo.ts]
const foo = { bar: 'hello', bat: 'world', bam: { bork: { bar: 'a', baz: 'b' } } };
const arr: [0, 1, 2, ['a', 'b', 'c', [{def: 'def'}, {sec: 'sec'}]]] = [0, 1, 2, ['a', 'b', 'c', [{def: 'def'}, {sec: 'sec'}]]];
export { foo, arr };
//// [index.ts]
import { foo, arr } from './foo';
export { foo, arr };

const { bar: baz, bat, bam: { bork: { bar: ibar, baz: ibaz } } } = foo;
export { baz, ibaz };

const [ , one, , [, bee, , [, {sec} ]]] = arr;
export { one, bee, sec };

const getFoo = () => ({
    foo: 'foo'
});

const { foo: foo2 } = getFoo();
export { foo2 };


//// [foo.js]
"use strict";
exports.__esModule = true;
exports.arr = exports.foo = void 0;
var foo = { bar: 'hello', bat: 'world', bam: { bork: { bar: 'a', baz: 'b' } } };
exports.foo = foo;
var arr = [0, 1, 2, ['a', 'b', 'c', [{ def: 'def' }, { sec: 'sec' }]]];
exports.arr = arr;
//// [index.js]
"use strict";
exports.__esModule = true;
exports.foo2 = exports.sec = exports.bee = exports.one = exports.ibaz = exports.baz = exports.arr = exports.foo = void 0;
var foo_1 = require("./foo");
exports.foo = foo_1.foo;
exports.arr = foo_1.arr;
var baz = foo_1.foo.bar, bat = foo_1.foo.bat, _a = foo_1.foo.bam.bork, ibar = _a.bar, ibaz = _a.baz;
exports.baz = baz;
exports.ibaz = ibaz;
var one = foo_1.arr[1], _b = foo_1.arr[3], bee = _b[1], _c = _b[3], sec = _c[1].sec;
exports.one = one;
exports.bee = bee;
exports.sec = sec;
var getFoo = function () { return ({
    foo: 'foo'
}); };
var foo2 = getFoo().foo;
exports.foo2 = foo2;


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
declare const arr: [0, 1, 2, ['a', 'b', 'c', [{
    def: 'def';
}, {
    sec: 'sec';
}]]];
export { foo, arr };
//// [index.d.ts]
import { foo, arr } from './foo';
export { foo, arr };
declare const baz: string, ibaz: string;
export { baz, ibaz };
declare const one: 1, bee: "b", sec: "sec";
export { one, bee, sec };
declare const foo2: string;
export { foo2 };
