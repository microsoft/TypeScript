//// [divergentAccessorsTypes2.ts]
class Test1<T> {
    get foo(): T { return null as any }
    set foo(s: T | undefined ) {
    }
}

const s = new Test1<string>();
s.foo = undefined;
s.foo = "hello";
s.foo = 42;


//// [divergentAccessorsTypes2.js]
"use strict";
class Test1 {
    get foo() { return null; }
    set foo(s) {
    }
}
const s = new Test1();
s.foo = undefined;
s.foo = "hello";
s.foo = 42;
