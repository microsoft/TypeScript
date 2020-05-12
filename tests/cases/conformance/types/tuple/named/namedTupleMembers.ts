// @declaration: true

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
