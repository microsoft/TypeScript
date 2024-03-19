//// [tests/cases/conformance/types/tuple/named/namedTupleMembers.ts] ////

//// [namedTupleMembers.ts]
export type Segment = [length: number, count: number];

export type SegmentAnnotated = [
    /** 
     * Size of message buffer segment handles
     */
    length: number,
    /**
     * Number of segments handled at once
     */
    count: number
];

declare var a: Segment;
declare var b: SegmentAnnotated;
declare var c: [number, number];
declare var d: [a: number, b: number];

a = b;
a = c;
a = d;

b = a;
b = c;
b = d;

c = a;
c = b;
c = d;

d = a;
d = b;
d = c;

export type WithOptAndRest = [first: number, second?: number, ...rest: string[]];

export type Func<T extends any[]> = (...x: T) => void;

export const func = null as any as Func<SegmentAnnotated>;

export function useState<T>(initial: T): [value: T, setter: (T) => void] {
    return null as any;
}


export type Iter = Func<[step: number, iterations: number]>;

export function readSegment([length, count]: [number, number]) {}

// documenting binding pattern behavior (currently does _not_ generate tuple names)
export const val = null as any as Parameters<typeof readSegment>[0];

export type RecursiveTupleA = [initial: string, next: RecursiveTupleA];

export type RecursiveTupleB = [first: string, ptr: RecursiveTupleB];

declare var q: RecursiveTupleA;
declare var r: RecursiveTupleB;

q = r;
r = q;

export type RecusiveRest = [first: string, ...rest: RecusiveRest[]];
export type RecusiveRest2 = [string, ...RecusiveRest2[]];

declare var x: RecusiveRest;
declare var y: RecusiveRest2;

x = y;
y = x;

declare function f<T extends any[]>(...x: T): T;
declare function g(elem: object, index: number): object;
declare function getArgsForInjection<T extends (...args: any[]) => any>(x: T): Parameters<T>;

export const argumentsOfGAsFirstArgument = f(getArgsForInjection(g)); // one tuple with captures arguments as first member
export const argumentsOfG = f(...getArgsForInjection(g)); // captured arguments list re-spread


//// [namedTupleMembers.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.argumentsOfG = exports.argumentsOfGAsFirstArgument = exports.val = exports.func = void 0;
exports.useState = useState;
exports.readSegment = readSegment;
a = b;
a = c;
a = d;
b = a;
b = c;
b = d;
c = a;
c = b;
c = d;
d = a;
d = b;
d = c;
exports.func = null;
function useState(initial) {
    return null;
}
function readSegment(_a) {
    var length = _a[0], count = _a[1];
}
// documenting binding pattern behavior (currently does _not_ generate tuple names)
exports.val = null;
q = r;
r = q;
x = y;
y = x;
exports.argumentsOfGAsFirstArgument = f(getArgsForInjection(g)); // one tuple with captures arguments as first member
exports.argumentsOfG = f.apply(void 0, getArgsForInjection(g)); // captured arguments list re-spread


//// [namedTupleMembers.d.ts]
export type Segment = [length: number, count: number];
export type SegmentAnnotated = [
    /**
     * Size of message buffer segment handles
     */
    length: number,
    /**
     * Number of segments handled at once
     */
    count: number
];
export type WithOptAndRest = [first: number, second?: number, ...rest: string[]];
export type Func<T extends any[]> = (...x: T) => void;
export declare const func: Func<SegmentAnnotated>;
export declare function useState<T>(initial: T): [value: T, setter: (T: any) => void];
export type Iter = Func<[step: number, iterations: number]>;
export declare function readSegment([length, count]: [number, number]): void;
export declare const val: Parameters<typeof readSegment>[0];
export type RecursiveTupleA = [initial: string, next: RecursiveTupleA];
export type RecursiveTupleB = [first: string, ptr: RecursiveTupleB];
export type RecusiveRest = [first: string, ...rest: RecusiveRest[]];
export type RecusiveRest2 = [string, ...RecusiveRest2[]];
export declare const argumentsOfGAsFirstArgument: [[elem: object, index: number]];
export declare const argumentsOfG: [elem: object, index: number];
