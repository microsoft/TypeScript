// @strict: true
// @declaration: true

type Deep<T> = T extends object ? { [K in keyof T]: Deep<T[K]> } : T;
type Json = string | [Json];
declare function direct<T>(value: T): Deep<T>;
declare function indirect<T>(value: T): { value: Deep<[T]> };
export const concrete = direct([""] as [string]);
export const recursive = direct([] as unknown as [Json]);
export const generic = indirect(1);
generic.value[0] = "error";
function wrap<T>(value: T) {
    return indirect(value);
}
export const twice = wrap(true);
twice.value[0] = "error";

type Left = [string, Right?];
type Right = [number, Left?];
export const mutual = direct([] as unknown as Left);
mutual[0] = 0;
mutual[1]![0] = "";
mutual[1]![1]![0] = 0;

type Grow<T> = { [K in keyof T]: Grow<[T]> };
export declare const growing: Grow<[string]>;
export const next = growing[0];
export const again = next[0];

interface Box<T> {
    value: T;
    self: this;
    set(value: T): this;
}
declare const boxed: Box<Deep<Left>>;
export const boxedValue = boxed.value;
export const sameBox = boxed.set(boxed.value).self;
sameBox.value[0] = 0;
sameBox.value[1]![0] = "";

declare const growingBox: Box<Grow<[string]>>;
export const boxedGrowing = growingBox.value;
export const boxedNext = boxedGrowing[0];

export function unbox<T>(box: Box<Deep<[T]>>) {
    return box.value;
}
declare const numericBox: Box<Deep<[number]>>;
export const unboxed = unbox(numericBox);
unboxed[0] = "error";

type ArrayJson = string | ArrayJson[];
declare const arrayBox: Box<Deep<ArrayJson[]>>;
export const arrayValue = arrayBox.value;
arrayValue[0] = 0;
arrayValue.map(value => {
    if (typeof value !== "string") {
        value[0] = 0;
    }
});

type GrowArray<T> = { [K in keyof T]: GrowArray<T[]> };
declare const growingArrayBox: Box<GrowArray<number[]>>;
export const growingArrayValue = growingArrayBox.value;
export const growingArrayNext = growingArrayValue[0];
export const growingArrayAgain = growingArrayNext[0];

type DeepReadonly<T> = T extends object ? { readonly [K in keyof T]: DeepReadonly<T[K]> } : T;
declare const readonlyBox: Box<DeepReadonly<[first: number, ...rest: string[]]>>;
export const readonlyValue = readonlyBox.value;
readonlyValue[0] = 0;

type NamedTuple = [name: string, number];
type NamedArray = NamedTuple[];
declare const namedBox: Box<NamedArray>;
export const namedArray = namedBox.value;
export const namedTuple = namedArray[0];
