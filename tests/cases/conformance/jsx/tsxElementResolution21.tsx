// @strict: true
// @jsx: preserve
// @noEmit: true
function createElement(name: string) {
    return name;
}
namespace createElement.JSX {
    export type Element = string;
    export type ElementType = string;
    export type IntrinsicElements = { div: {} };
}

const d = <div/> // JSX namespace is not correctly defined here
