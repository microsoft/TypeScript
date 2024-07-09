//// [tests/cases/compiler/argumentsReferenceInMethod2_Js.ts] ////

//// [a.js]
class A {
	/**
	 * @param {object} [foo={}]
	 */
	m(foo = {}) {
		/**
		 * @type object
		 */
		this["arguments"] = foo;
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
    arguments: object;
}
