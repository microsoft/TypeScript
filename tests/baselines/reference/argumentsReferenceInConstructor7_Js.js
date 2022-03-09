//// [a.js]
class A {
	constructor() {
		/**
		 * @type Function
		 */
		this.callee = arguments.callee;
	}
}




//// [a.d.ts]
declare class A {
    constructor(...args: any[]);
    /**
     * @type Function
     */
    callee: Function;
}
