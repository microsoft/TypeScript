//// [tests/cases/compiler/recursiveMappedTupleInstantiationSharing.ts] ////

//// [recursiveMappedTupleInstantiationSharing.ts]
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


//// [recursiveMappedTupleInstantiationSharing.js]
export const concrete = direct([""]);
export const recursive = direct([]);
export const generic = indirect(1);
generic.value[0] = "error";
function wrap(value) {
    return indirect(value);
}
export const twice = wrap(true);
twice.value[0] = "error";
export const mutual = direct([]);
mutual[0] = 0;
mutual[1][0] = "";
mutual[1][1][0] = 0;
export const next = growing[0];
export const again = next[0];
export const boxedValue = boxed.value;
export const sameBox = boxed.set(boxed.value).self;
sameBox.value[0] = 0;
sameBox.value[1][0] = "";
export const boxedGrowing = growingBox.value;
export const boxedNext = boxedGrowing[0];
export function unbox(box) {
    return box.value;
}
export const unboxed = unbox(numericBox);
unboxed[0] = "error";
export const arrayValue = arrayBox.value;
arrayValue[0] = 0;
arrayValue.map(value => {
    if (typeof value !== "string") {
        value[0] = 0;
    }
});
export const growingArrayValue = growingArrayBox.value;
export const growingArrayNext = growingArrayValue[0];
export const growingArrayAgain = growingArrayNext[0];
export const readonlyValue = readonlyBox.value;
readonlyValue[0] = 0;
export const namedArray = namedBox.value;
export const namedTuple = namedArray[0];


//// [recursiveMappedTupleInstantiationSharing.d.ts]
type Deep<T> = T extends object ? {
    [K in keyof T]: Deep<T[K]>;
} : T;
type Json = string | [Json];
export declare const concrete: Deep<[string]>;
export declare const recursive: Deep<[Json]>;
export declare const generic: {
    value: Deep<[number]>;
};
export declare const twice: {
    value: Deep<[boolean]>;
};
type Left = [string, Right?];
type Right = [number, Left?];
export declare const mutual: Deep<Left>;
type Grow<T> = {
    [K in keyof T]: Grow<[T]>;
};
export declare const growing: Grow<[string]>;
export declare const next: [Grow<[[[string]]]>];
export declare const again: [Grow<[[[[string]]]]>];
interface Box<T> {
    value: T;
    self: this;
    set(value: T): this;
}
export declare const boxedValue: [string, (Deep<Right> | undefined)?];
export declare const sameBox: Box<Deep<Left>>;
export declare const boxedGrowing: [Grow<[[string]]>];
export declare const boxedNext: [Grow<[[[string]]]>];
export declare function unbox<T>(box: Box<Deep<[T]>>): [Deep<T>];
export declare const unboxed: [number];
type ArrayJson = string | ArrayJson[];
export declare const arrayValue: (string | Deep<ArrayJson[]>)[];
type GrowArray<T> = {
    [K in keyof T]: GrowArray<T[]>;
};
export declare const growingArrayValue: GrowArray<number[][]>[];
export declare const growingArrayNext: GrowArray<number[][][]>[];
export declare const growingArrayAgain: GrowArray<number[][][][]>[];
export declare const readonlyValue: readonly [first: number, ...rest: string[]];
type NamedTuple = [name: string, number];
type NamedArray = NamedTuple[];
export declare const namedArray: NamedArray;
export declare const namedTuple: NamedTuple;
export {};
