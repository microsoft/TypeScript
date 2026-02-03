//// [tests/cases/conformance/jsx/jsxParsingErrorImmediateSpreadInAttributeValue.tsx] ////

//// [a.tsx]
declare const React: any
declare namespace JSX {
    interface IntrinsicElements {
        [k: string]: any
    }
}

const X: any
const a: any

<X a={...a} />


//// [a.js]
var X;
var a;
React.createElement(X, { a: , a: true });
