//// [a.js]
class A {
	/**
	 * @param {object} [foo={}]
	 */
	m(foo = {}) {
		const key = "bar";

		/**
		 * @type object
		 */
		this.foo = foo;

		/**
		 * @type object
		 */
		const arguments = this.arguments;

		/**
		 * @type object
		 */
		this.bar = arguments.bar;

		/**
		 * @type object
		 */
		this.baz = arguments[key];

		/**
		 * @type object
		 */
		this.options = arguments;
	}

	get arguments() {
		return { bar: {} };
	}
}




//// [a.d.ts]
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
    /**
     * @type object
     */
    baz: object;
    /**
     * @type object
     */
    options: object;
    get arguments(): {
        bar: {};
    };
}
