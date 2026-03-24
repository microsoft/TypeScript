//// [tests/cases/compiler/argumentsReferenceInMethod4_Js.ts] ////

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
    foo: object | undefined;
    /**
     * @type object
     */
    bar: object | undefined;
    /**
     * @type object
     */
    baz: object | undefined;
    /**
     * @type object
     */
    options: object | undefined;
    get arguments(): {
        bar: {};
    };
}
