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
export { baz, ibaz };
export { one, bee, sec };
export { foo2 };


//// [DtsFileErrors]


index.d.ts(3,10): error TS2304: Cannot find name 'baz'.
index.d.ts(3,15): error TS2304: Cannot find name 'ibaz'.
index.d.ts(4,10): error TS2304: Cannot find name 'one'.
index.d.ts(4,15): error TS2304: Cannot find name 'bee'.
index.d.ts(4,20): error TS2304: Cannot find name 'sec'.
index.d.ts(5,10): error TS2552: Cannot find name 'foo2'. Did you mean 'foo'?


==== foo.d.ts (0 errors) ====
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
    
==== index.d.ts (6 errors) ====
    import { foo, arr } from './foo';
    export { foo, arr };
    export { baz, ibaz };
             ~~~
!!! error TS2304: Cannot find name 'baz'.
                  ~~~~
!!! error TS2304: Cannot find name 'ibaz'.
    export { one, bee, sec };
             ~~~
!!! error TS2304: Cannot find name 'one'.
                  ~~~
!!! error TS2304: Cannot find name 'bee'.
                       ~~~
!!! error TS2304: Cannot find name 'sec'.
    export { foo2 };
             ~~~~
!!! error TS2552: Cannot find name 'foo2'. Did you mean 'foo'?
    