// @strict: true
// @noEmit: true

type Mappy<T extends unknown[]> = { [K in keyof T as K]: T[K] };
type NotArray = Mappy<number[]>;

declare function doArrayStuff(x: unknown[]): void;
declare const x: NotArray;
doArrayStuff(x);
