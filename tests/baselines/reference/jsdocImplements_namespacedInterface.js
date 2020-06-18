//// [tests/cases/conformance/jsdoc/jsdocImplements_namespacedInterface.ts] ////

//// [defs.d.ts]
declare namespace N {
    interface A {
        mNumber(): number;
    }
    interface AT<T> {
        gen(): T;
    }
}
//// [a.js]
/** @implements N.A */
class B {
    mNumber() {
        return 0;
    }
}
/** @implements {N.AT<string>} */
class BAT {
    gen() {
        return "";
    }
}




//// [a.d.ts]
/** @implements N.A */
declare class B implements N.A {
    mNumber(): number;
}
/** @implements {N.AT<string>} */
declare class BAT implements N.AT<string> {
    gen(): string;
}
