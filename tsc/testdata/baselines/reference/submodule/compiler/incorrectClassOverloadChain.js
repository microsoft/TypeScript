//// [tests/cases/compiler/incorrectClassOverloadChain.ts] ////

//// [incorrectClassOverloadChain.ts]
class C {
    foo(): string;
    foo(x): number;
    x = 1;
}

//// [incorrectClassOverloadChain.js]
class C {
    x = 1;
}
