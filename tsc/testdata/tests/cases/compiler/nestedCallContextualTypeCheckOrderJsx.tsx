// @strict: true
// @noEmit: true
// @jsx: preserve
// @checkOrder: default, typesfirst

// A generic call in a JSX attribute is resolved after the element, whichever
// is queried first.

declare namespace JSX {
    interface Element {}
    interface IntrinsicElements {}
}
declare function Outer<T>(props: { cb: (x: T) => void; v: T }): JSX.Element;
declare function wrap<U>(f: U): U;

const a = <Outer cb={wrap((x) => x.toFixed())} v={1} />;
const b = <Outer {...{ cb: wrap((x) => x.toFixed()) }} v={1} />;
