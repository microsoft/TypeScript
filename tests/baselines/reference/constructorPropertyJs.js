//// [tests/cases/compiler/constructorPropertyJs.ts] ////

//// [a.js]
class C {
    /**
     * @param {any} a
     */
    foo(a) {
        this.constructor = a;
    }
}




//// [a.d.ts]
declare class C {
    /**
     * @param {any} a
     */
    foo(a: any): void;
}
