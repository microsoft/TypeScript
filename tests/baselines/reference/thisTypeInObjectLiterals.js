//// [thisTypeInObjectLiterals.ts]
let o = {
    d: "bar",
    m() {
        return this.d.length;
    },
    f: function() {
        return this.d.length;
    }
}

let mutuallyRecursive = {
    a: 100,
    start() {
        return this.passthrough(this.a);
    },
    passthrough(n: number) {
        return this.sub1(n);
    },
    sub1(n: number): number {
        if (n > 0) {
            return this.passthrough(n - 1);
        }
        return n;
    }
}
var i: number = mutuallyRecursive.start();
interface I {
    a: number;
    start(): number;
    passthrough(n: number): number;
    sub1(n: number): number;
}
var impl: I = mutuallyRecursive;


//// [thisTypeInObjectLiterals.js]
var o = {
    d: "bar",
    m: function () {
        return this.d.length;
    },
    f: function () {
        return this.d.length;
    }
};
var mutuallyRecursive = {
    a: 100,
    start: function () {
        return this.passthrough(this.a);
    },
    passthrough: function (n) {
        return this.sub1(n);
    },
    sub1: function (n) {
        if (n > 0) {
            return this.passthrough(n - 1);
        }
        return n;
    }
};
var i = mutuallyRecursive.start();
var impl = mutuallyRecursive;
