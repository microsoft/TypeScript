// @strict: true
// @jsx: preserve
namespace JSX {
    export interface Element {}
    export interface ElementAttributesProperty { props: {}; }
    export interface ElementChildrenAttribute { children: {}; }
    export interface IntrinsicAttributes {}
    export interface IntrinsicElements { [key: string]: Element }
}
const Elem = <T,U=never>(p: { prop: T, children: (t: T) => T }) => <div></div>;
Elem({prop: {a: "x"}, children: i => ({a: "z"})});
const q = <Elem prop={{a: "x"}} children={i => ({a: "z"})} />
const qq = <Elem prop={{a: "x"}}>{i => ({a: "z"})}</Elem>

interface LitProps<T> { prop: T, children: (x: this) => T }
const ElemLit = <T extends string>(p: LitProps<T>) => <div></div>;
ElemLit({prop: "x", children: () => "x"});
const j = <ElemLit prop="x" children={() => "x"} />
const jj = <ElemLit prop="x">{() => "x"}</ElemLit>

// Should error
const arg = <ElemLit prop="x" children={p => "y"} />
const argchild = <ElemLit prop="x">{p => "y"}</ElemLit>
const mismatched = <ElemLit prop="x">{() => 12}</ElemLit>