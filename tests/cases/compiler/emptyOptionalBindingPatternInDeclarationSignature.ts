// @strict: true
// @noEmit: true

// #50791

declare function fn1({}?: { x: string }): void;
declare function fn2({ x }?: { x: string }): void;
declare function fn3([]?: [ x: string ]): void;
declare function fn4([ x ]?: [ x: string ]): void;

declare class C1 {
    method({}?: { x: string }): void
    static method2({}?: { x: string }): void

    static field: ({}?: { x: string }) => void
    static field2: ({}?: { x: string }) => void
}

interface I1 {
    method({}?: { x: string }): void
    method2: ({}?: { x: string }) => void
}

type T1 = ({}?: { x: string }) => void

type T2 = {
    method({}?: { x: string }): void
    method2: ({}?: { x: string }) => void
}

declare const val1: ({}?: { x: string }) => void

declare const val2: {
    method({}?: { x: string }): void
    method2: ({}?: { x: string }) => void
}
