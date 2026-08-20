//// [tests/cases/compiler/argumentsReferenceInMethod5_Js.ts] ////

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
declare const bar: {
    arguments: {};
};
declare class A {
    /**
     * @type object
     */
    foo: object;
    /**
     * @type object
     */
    bar: object;
    /**
     * @param {object} [foo={}]
     */
    m(foo?: object): void;
}
