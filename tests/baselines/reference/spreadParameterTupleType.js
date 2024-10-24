//// [tests/cases/compiler/spreadParameterTupleType.ts] ////

//// [spreadParameterTupleType.ts]
function f1() {
    type A = [s: string];
    type C = [...A, ...A];

    return function fn(...args: C) { } satisfies any
}

function f2() {
    type A = [a: string];
    type B = [b: string];
    type C = [c: string];
    type D = [...A, ...A, ...B, ...A, ...B, ...B, ...A, ...C];

    return function fn(...args: D) { } satisfies any;
}


//// [spreadParameterTupleType.js]
function f1() {
    return function fn() {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
    };
}
function f2() {
    return function fn() {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
    };
}


//// [spreadParameterTupleType.d.ts]
declare function f1(): (s: string, s_1: string) => void;
declare function f2(): (a: string, a_1: string, b: string, a_2: string, b_1: string, b_2: string, a_3: string, c: string) => void;
