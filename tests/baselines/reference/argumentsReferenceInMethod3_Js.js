//// [a.js]
class A {
	get arguments() {
		return { bar: {} };
	}
}

class B extends A {
	/**
	 * @param {object} [foo={}]
	 */
	m(foo = {}) {
		/**
		 * @type object
		 */
		this.x = foo;

		/**
		 * @type object
		 */
		this.y = super.arguments.bar;
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
     * @param {object} [foo={}]
     */
    m(foo?: object): void;
    /**
     * @type object
     */
    x: object;
    /**
     * @type object
     */
    y: object;
}
