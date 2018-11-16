// @allowJs: true
// @checkJs: true
// @outDir: ./out
// @filename: tile1.ts
interface Lifecycle<Attrs, State> {
	oninit?(vnode: Vnode<Attrs, State>): number;
	[_: number]: any;
}

interface Vnode<Attrs, State extends Lifecycle<Attrs, State> = Lifecycle<Attrs, State>> {
	tag: Component<Attrs, State>;
}

interface Component<Attrs, State> {
	view(this: State, vnode: Vnode<Attrs, State>): number;
}

interface ClassComponent<A> extends Lifecycle<A, ClassComponent<A>> {
	oninit?(vnode: Vnode<A, this>): number;
	view(vnode: Vnode<A, this>): number;
}

interface MyAttrs { id: number }
class C implements ClassComponent<MyAttrs> {
	view(v: Vnode<MyAttrs>) { return 0; }
}

const test8: ClassComponent<any> = new C();
// @filename: file1.js
/** @type {ClassComponent<any>} */
const test9 = new C();
