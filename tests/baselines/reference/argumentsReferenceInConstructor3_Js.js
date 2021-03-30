//// [a.js]
class A {
	get arguments() {
		return { bar: {} };
	}
}

class B extends A {
	/**
	 * Constructor
	 *
	 * @param {object} [foo={}]
	 */
	constructor(foo = {}) {
		super();

		/**
		 * @type object
		 */
		this.foo = foo;

		/**
		 * @type object
		 */
		this.bar = super.arguments.foo;
	}
}




//// [a.d.ts]
declare class A {
    get arguments(): {
        bar: {};
    };
}
declare class B extends A {
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
