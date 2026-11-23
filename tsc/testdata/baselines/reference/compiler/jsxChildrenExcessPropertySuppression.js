//// [tests/cases/compiler/jsxChildrenExcessPropertySuppression.tsx] ////

//// [jsxChildrenExcessPropertySuppression.tsx]
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


//// [jsxChildrenExcessPropertySuppression.jsx]
"use strict";
// @ts-ignore
<Item depth={0} href="">text</Item>;
