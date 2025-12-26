// @strict: true
// @noEmit: true

declare function call<A extends readonly unknown[]>(
  arg: (...args: NoInfer<A>) => void,
  ...args: A
): A;

const result1 = call((a: number) => {}, 1, 2);
const result2 = call((a: number, b: number) => {}, 1); // error
const result3 = call((a) => {}, 1, ''); // test contextual parameters
const result4 = call((a, b) => {}, 1, ''); // test contextual parameters
const result5 = call((...args) => {}, 1, ''); // test contextual parameters
const result6 = call((a, ...rest) => {}, 1, ''); // test contextual parameters

declare function fn1<A extends unknown[]>(
  cb: (a: [number, ...NoInfer<A>]) => void,
  args: A,
): A;

declare const singleStr: [string];

const result7 = fn1((arg) => {
  arg.length;
}, singleStr);

declare const tupleUnion: [string] | [number, boolean];

const result8 = fn1((arg) => {
  arg.length;
}, tupleUnion);

declare function fn2(arg: (...args: NoInfer<[string, number]>) => void): void;

fn2((a, ...rest) => {});
