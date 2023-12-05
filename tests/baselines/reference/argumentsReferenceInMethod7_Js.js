//// [tests/cases/compiler/argumentsReferenceInMethod7_Js.ts] ////

//// [a.js]
class A {
	m() {
		/**
		 * @type Function
		 */
		this.callee = arguments.callee;
	}
}




//// [a.d.ts]
declare class A {
    m(...args: any[]): void;
    /**
     * @type Function
     */
    callee: Function;
}
