// @declaration: true
// @filename: foo.ts
const foo = { bar: 'hello', bat: 'world', bam: { bork: { bar: 'a', baz: 'b' } } };
const arr: [0, 1, 2, ['a', 'b', 'c', [{def: 'def'}, {sec: 'sec'}]]] = [0, 1, 2, ['a', 'b', 'c', [{def: 'def'}, {sec: 'sec'}]]];
export { foo, arr };
// @filename: index.ts
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
