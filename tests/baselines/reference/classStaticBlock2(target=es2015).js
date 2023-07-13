//// [tests/cases/conformance/classes/classStaticBlock/classStaticBlock2.ts] ////

//// [classStaticBlock2.ts]
const a = 1;
const b = 2;

class C {
    static {
        const a = 11;

        a;
        b;
    }

    static {
        const a = 11;

        a;
        b;
    }
}


//// [classStaticBlock2.js]
const a = 1;
const b = 2;
class C {
}
(() => {
    const a = 11;
    a;
    b;
})();
(() => {
    const a = 11;
    a;
    b;
})();
