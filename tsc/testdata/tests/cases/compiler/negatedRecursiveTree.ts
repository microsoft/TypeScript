// @strict: true
// @noEmit: true

type Tree<Label> = Top<Label> | Leaf<Label>;
type SubTree<Label> = Tree<Label> & not Top<Label>;
interface Base<Label> {
    children: SubTree<Label>[];
}
interface Top<Label> extends Base<Label> {
    kind: "top";
}
interface Leaf<Label> extends Base<Label> {
    kind: "leaf";
    label: Label;
}
declare const child: SubTree<string>;
const label: string = child.label;