// @target: esnext
// @module: esnext

declare const x: string;
namespace N {
    class A { [await x]() {} }
    export class B {
        [await x]() {}
        static [await x]() {}
    }
}
export class C {
    [await x]() {}
    static [await x]() {}
}

{
    class D { [await x]() {} }
}

function f() {
    class E {
        [await x]() {}
        static [await x]() {}
    }
}

async function af() {
    class F {
        [await x]() {}
        static [await x]() {}
    }
}

function* gf() {
    class G { [await x]() {} }
}

async function* agf() {
    class H { [await x]() {} }
}

function switchSync() {
    switch (0) {
        case 0:
            class I { [await x]() {} }
    }
}

async function switchAsync() {
    switch (0) {
        case 0:
            class J { [await x]() {} }
    }
}

export {};
