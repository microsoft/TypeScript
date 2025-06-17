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
declare namespace bar {
    let arguments: {};
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


//// [DtsFileErrors]


/a.d.ts(2,9): error TS1100: Invalid use of 'arguments' in strict mode.


==== /a.d.ts (1 errors) ====
    declare namespace bar {
        let arguments: {};
            ~~~~~~~~~
!!! error TS1100: Invalid use of 'arguments' in strict mode.
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
    