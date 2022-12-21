//// [a.js]
class A {
	constructor() {
		/**
		 * @type object
		 */
		this.foo = arguments;
	}
}




//// [a.d.ts]
declare class A {
    constructor(...args: any[]);
    /**
     * @type object
     */
    foo: object;
}
