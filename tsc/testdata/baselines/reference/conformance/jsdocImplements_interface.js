//// [tests/cases/conformance/jsdoc/jsdocImplements_interface.ts] ////

//// [defs.d.ts]
interface A {
    mNumber(): number;
}
//// [a.js]
/** @implements A */
class B {
    mNumber() {
        return 0;
    }
}
/** @implements {A} */
class B2 {
    mNumber() {
        return "";
    }
}
/** @implements A */
class B3 {
}




//// [a.d.ts]
/** @implements A */
declare class B implements A {
    mNumber(): number;
}
/** @implements {A} */
declare class B2 implements A {
    mNumber(): string;
}
/** @implements A */
declare class B3 implements A {
}
