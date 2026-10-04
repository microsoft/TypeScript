// @target: es2015
// @lib: es2015

function f<T extends { "0": (p1: number) => number }>(p: T): T {
    return p;
}

var v = f([x => x]);
