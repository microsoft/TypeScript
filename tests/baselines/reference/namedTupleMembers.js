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

export type WithOptAndRest = [first: number, second?: number, ...rest: string[]];

export type Func<T extends any[]> = (...x: T) => void;

export const c = null as any as Func<SegmentAnnotated>;

export function useState<T>(initial: T): [value: T, setter: (T) => void] {
    return null as any;
}


export type Iter = Func<[step: number, iterations: number]>;

export function readSegment([length, count]: [number, number]) {}

//// [namedTupleMembers.js]
"use strict";
exports.__esModule = true;
exports.readSegment = exports.useState = exports.c = void 0;
exports.c = null;
function useState(initial) {
    return null;
}
exports.useState = useState;
function readSegment(_a) {
    var length = _a[0], count = _a[1];
}
exports.readSegment = readSegment;


//// [namedTupleMembers.d.ts]
export declare type Segment = [length: number, count: number];
export declare type SegmentAnnotated = [
    /**
     * Size of message buffer segment handles
     */
    length: number,
    /**
     * Number of segments handled at once
     */
    count: number
];
export declare type WithOptAndRest = [first: number, second?: number, ...rest: string[]];
export declare type Func<T extends any[]> = (...x: T) => void;
export declare const c: Func<SegmentAnnotated>;
export declare function useState<T>(initial: T): [value: T, setter: (T: any) => void];
export declare type Iter = Func<[step: number, iterations: number]>;
export declare function readSegment([length, count]: [number, number]): void;
