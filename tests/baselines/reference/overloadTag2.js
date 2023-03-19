//// [overloadTag2.js]
export class Foo {
    #a = true ? 1 : "1"
    #b

    /**
     * Should not have an implicit any error, because constructor's return type is always implicit
     * @constructor
     * @overload
     * @param {string} a
     * @param {number} b
     */
    /**
     * @constructor
     * @overload
     * @param {number} a
     */
    /**
     * @constructor
     * @overload
     * @param {string} a
     *//**
     * @constructor
     * @param {number | string} a
     */
    constructor(a, b) {
        this.#a = a
        this.#b = b
    }
}
var a = new Foo()
var b = new Foo('str')
var c = new Foo(2)
var d = new Foo('str', 2)


//// [overloadTag2.js]
export class Foo {
    #a = true ? 1 : "1";
    #b;
    /**
     * Should not have an implicit any error, because constructor's return type is always implicit
     * @constructor
     * @overload
     * @param {string} a
     * @param {number} b
     */
    /**
     * @constructor
     * @overload
     * @param {number} a
     */
    /**
     * @constructor
     * @overload
     * @param {string} a
     */ /**
    * @constructor
    * @param {number | string} a
    */
    constructor(a, b) {
        this.#a = a;
        this.#b = b;
    }
}
var a = new Foo();
var b = new Foo('str');
var c = new Foo(2);
var d = new Foo('str', 2);


//// [overloadTag2.d.ts]
export class Foo {
    constructor(a: string, b: number);
    constructor(a: number);
    constructor(a: string);
    #private;
}
