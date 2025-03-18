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
Object.defineProperty(exports, "__esModule", { value: true });
exports.arr = exports.foo = void 0;
const foo = { bar: 'hello', bat: 'world', bam: { bork: { bar: 'a', baz: 'b' } } };
exports.foo = foo;
const arr = [0, 1, 2, ['a', 'b', 'c', [{ def: 'def' }, { sec: 'sec' }]]];
exports.arr = arr;
//// [index.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.foo2 = exports.sec = exports.bee = exports.one = exports.ibaz = exports.baz = exports.arr = exports.foo = void 0;
const foo_1 = require("./foo");
Object.defineProperty(exports, "foo", { enumerable: true, get: function () { return foo_1.foo; } });
Object.defineProperty(exports, "arr", { enumerable: true, get: function () { return foo_1.arr; } });
const { bar: baz, bat, bam: { bork: { bar: ibar, baz: ibaz } } } = foo_1.foo;
const [, one, , [, bee, , [, { sec }]]] = foo_1.arr;
const getFoo = () => ({
    foo: 'foo'
});
const { foo: foo2 } = getFoo();
