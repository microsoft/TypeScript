declare global {
    interface Function {
        now(): string;
    }
}

Function.prototype.now = function () {
    return "now"
}

class X {
    static now() {
        return {}
    }

    why() {

    }
}

class Y {

}

console.log(X.now()) // works as expected
console.log(Y.now()) // works as expected

export const x: X | number = Math.random() > 0.5 ? new X() : 1

if (x instanceof X) {
    x.why() // should compile
}