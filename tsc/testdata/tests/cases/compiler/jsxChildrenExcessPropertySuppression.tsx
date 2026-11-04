// @target: es2022
// @jsx: preserve
// @strict: true
declare namespace JSX {
    interface Element {}
    interface ElementChildrenAttribute { children: {}; }
}
declare function Item(props: { depth: number }): JSX.Element;
// @ts-ignore
<Item
    depth={0}
    href=""
>text</Item>;
