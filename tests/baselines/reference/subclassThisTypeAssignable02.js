//// [tests/cases/compiler/subclassThisTypeAssignable02.ts] ////

//// [tile1.ts]
interface Lifecycle<Attrs, State extends Lifecycle<Attrs, State>> {
	oninit?(vnode: Vnode<Attrs, State>): number;
	[_: number]: any;
}

interface Vnode<Attrs, State extends Lifecycle<Attrs, State>> {
	tag: Component<Attrs, State>;
}

interface Component<Attrs, State extends Lifecycle<Attrs, State>> {
	view(this: State, vnode: Vnode<Attrs, State>): number;
}

interface ClassComponent<A> extends Lifecycle<A, ClassComponent<A>> {
	oninit?(vnode: Vnode<A, this>): number;
	view(vnode: Vnode<A, this>): number;
}

interface MyAttrs { id: number }
class C implements ClassComponent<MyAttrs> {
	view(v: Vnode<MyAttrs, C>) { return 0; }

	// Must declare a compatible-ish index signature or else
	// we won't correctly implement ClassComponent.
	[_: number]: unknown;
}

const test8: ClassComponent<any> = new C();
//// [file1.js]
/** @type {ClassComponent<any>} */
const test9 = new C();


//// [tile1.js]
"use strict";
var C = /** @class */ (function () {
    function C() {
    }
    C.prototype.view = function (v) { return 0; };
    return C;
}());
var test8 = new C();
//// [file1.js]
"use strict";
/** @type {ClassComponent<any>} */
var test9 = new C();
