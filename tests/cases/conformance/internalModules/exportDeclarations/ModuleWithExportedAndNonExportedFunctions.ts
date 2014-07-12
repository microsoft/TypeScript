module A {

    export function fn(s: string) {
        return true;
    }

    export function fng<T, U>(s: T): U {
        return null;
    }

    function fn2(s: string) {
        return false;
    }

    function fng2<T, U>(s: T): U {
        return null;
    }
}

// these should not be errors since the functions are exported
var fn: (s: string) => boolean;
var fn = A.fn;

var fng: <T, U>(s: T) => U;
var fng = A.fng; // bug 838015

// these should be errors since the functions are not exported
var fn2 = A.fn2;
var fng2 = A.fng2;