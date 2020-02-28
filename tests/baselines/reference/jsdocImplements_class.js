//// [a.js]
class A {
    /** @return {number} */
    method() { throw new Error(); }
}
/** @implements {A} */
class B  {
    method() { return 0 }
}

/** @implements A */
class B2  {
    /** @return {string} */
    method() { return "" }
}

/** @implements {A} */
class B3  {
}




//// [a.d.ts]
declare class A {
    /** @return {number} */
    method(): number;
}
/** @implements {A} */
declare class B implements A {
    method(): number;
}
/** @implements A */
declare class B2 implements A {
    /** @return {string} */
    method(): string;
}
/** @implements {A} */
declare class B3 implements A {
}
