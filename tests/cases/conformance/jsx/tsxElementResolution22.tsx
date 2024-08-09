// @strict: true
// @jsx: preserve
// @noEmit: true
function createElement(name: string) {
    return name;
}
namespace createElement.JSX {
    type Element = string;
    type ElementType = string;
    type IntrinsicElements = { div: {} };
}

const d = <div/> // JSX namespace is not correctly defined here
