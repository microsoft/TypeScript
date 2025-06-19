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
     * @param {object} [foo={}]
     */
    m(foo?: object): void;
}
