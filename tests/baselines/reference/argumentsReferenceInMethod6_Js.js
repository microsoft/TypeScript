//// [a.js]
class A {
	m() {
		/**
		 * @type object
		 */
		this.foo = arguments;
	}
}




//// [a.d.ts]
declare class A {
    m(...args: any[]): void;
    /**
     * @type object
     */
    foo: object;
}
