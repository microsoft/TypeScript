// @strict: true

interface F { (): string }

function test(x: number & { _foo: string }) {
    if (typeof x === 'object') {
        x; 
    }
}

function f1(x: F & { foo: number }) {
    if (typeof x !== "object") {
        x;
    }
}