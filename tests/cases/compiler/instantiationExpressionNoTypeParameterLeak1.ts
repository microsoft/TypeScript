// @strict: true
// @noEmit: true

// https://github.com/microsoft/TypeScript/issues/61041

export const test1 = <X,>(g: <A>(x: X) => X) => g<string>;
export const output1 = test1<number>((y: number) => 1);
output1(1);

export function test2<X>(g: <A>(x: X) => X) {
  return g<string>;
}
export const output2 = test2<number>((y: number) => 1);
output2(1);

export const test3 = <X,>(g: <A>() => (x: X) => X) => g<string>();
export const output3 = test3<number>(() => (y: number) => 1);
output3(1);

export function test4<X>(g: <A>() => (x: X) => X) {
  return g<string>();
}
export const output4 = test4<number>(() => (y: number) => 1);
output4(1);

export declare function test5<X>(g: <A>(x: X) => X): typeof g<string>;
export const output5 = test5<number>((y: number) => 1);
output5(1);

export const test6 = <X,>(g: <A>(x: X) => X) => g<X>;
export const output6 = test6<number>((y: number) => 1);
output6(1);
