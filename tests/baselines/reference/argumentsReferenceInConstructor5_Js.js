//// [a.js]
const bar = {
	arguments: {}
}

class A {
	/**
	 * Constructor
	 *
	 * @param {object} [foo={}]
	 */
	constructor(foo = {}) {
		/**
		 * @type object
		 */
		this.foo = foo;

		/**
		 * @type object
		 */
		this.bar = bar.arguments;
	}
}




//// [a.d.ts]
declare namespace bar {
    const arguments: {};
}
declare class A {
    /**
     * Constructor
     *
     * @param {object} [foo={}]
     */
    constructor(foo?: object);
    /**
     * @type object
     */
    foo: object;
    /**
     * @type object
     */
    bar: object;
}
