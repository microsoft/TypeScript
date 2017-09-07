// @widenTypes: false

const c = [1, 'a'];
const d = { a: 1, b: 'c' };

interface SomeInterface { a: boolean }
declare function foo<T extends any[]>(arg: T): { hi: T };
declare function boo<T extends number[]>(arg: T): { hi: T };
declare function bar(arg: SomeInterface): void
declare function baz(arg: [number, 2, 3 | number]): void
declare function bag(arg: number[]): void

// As variable assignees
const a: number[] = [1, 2, 3];
const b: SomeInterface = {a: true};
const e = [1, 2, 3];

// Same, but as arguments
foo([1, 2, 3]);
bar({a: true});
baz([1, 2, 3]);
bag([1, 2, 3]);
bag(e);
boo([1, 2, 3]);
boo(e);
