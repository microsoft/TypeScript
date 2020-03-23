declare function foo<T>(f: () => PromiseLike<T>, x: T): void;
declare const nullOrNumber: number | null;
foo(async () => nullOrNumber, null);

type UnwrapAwaited<T> = T extends awaited infer Inner ? Inner : T;
type Result1 = UnwrapAwaited<awaited Promise<number>>; // number
type Result2 = UnwrapAwaited<awaited Promise<number> | number>; // number
function f<T>() {
    type Result1 = UnwrapAwaited<T>; // UnwrapAwaited<T>
    type Result2 = UnwrapAwaited<awaited T>; // UnwrapAwaited<awaited T>
    return null as any as [Result1, Result2];
}
const x = f<number>(); // number
const y = f<Promise<number>>(); // number ?
const z = f<Promise<number> | number>(); // number ?