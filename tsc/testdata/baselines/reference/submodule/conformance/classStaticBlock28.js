//// [tests/cases/conformance/classes/classStaticBlock/classStaticBlock28.ts] ////

//// [classStaticBlock28.ts]
let foo: number;

class C {
    static {
        foo = 1
    }
}

console.log(foo)

//// [classStaticBlock28.js]
let foo;
class C {
    static {
        foo = 1;
    }
}
console.log(foo);
