//// [a.js]
const bar = {
	arguments: {}
}

class A {
	/**
	 * @param {object} [foo={}]
	 */
	m(foo = {}) {
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
     * @param {object} [foo={}]
     */
    m(foo?: object): void;
    /**
     * @type object
     */
    foo: object;
    /**
     * @type object
     */
    bar: object;
}
