// @strict: true
// @noEmit: true

// https://github.com/microsoft/typescript-go/issues/1968

type IndentationTree<L> = TopNode<L> | VirtualNode<L> | LineNode<L> | BlankNode<L>;
type IndentationSubTree<L> = Exclude<IndentationTree<L>, TopNode<L>>;

interface NodeBase<L> {
	subs: IndentationSubTree<L>[];
}

interface VirtualNode<L> extends NodeBase<L> {
	type: 'virtual';
}

interface TopNode<L> extends NodeBase<L> {
	type: 'top';
}

interface LineNode<L> extends NodeBase<L> {
	type: 'line';
}

interface BlankNode<L> extends NodeBase<L> {
	type: 'blank';
}
