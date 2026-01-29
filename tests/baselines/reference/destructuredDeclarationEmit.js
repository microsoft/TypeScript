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
const foo = { bar: 'hello', bat: 'world', bam: { bork: { bar: 'a', baz: 'b' } } };
const arr = [0, 1, 2, ['a', 'b', 'c', [{ def: 'def' }, { sec: 'sec' }]]];
export { foo, arr };
//// [index.js]
import { foo, arr } from './foo';
export { foo, arr };
const { bar: baz, bat, bam: { bork: { bar: ibar, baz: ibaz } } } = foo;
export { baz, ibaz };
const [, one, , [, bee, , [, { sec }]]] = arr;
export { one, bee, sec };
const getFoo = () => ({
    foo: 'foo'
});
const { foo: foo2 } = getFoo();
export { foo2 };


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
