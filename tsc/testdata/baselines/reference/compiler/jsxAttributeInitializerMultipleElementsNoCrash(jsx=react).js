//// [tests/cases/compiler/jsxAttributeInitializerMultipleElementsNoCrash.tsx] ////

//// [jsxAttributeInitializerMultipleElementsNoCrash.tsx]
declare namespace JSX { interface IntrinsicElements { [x: string]: any } }
declare const React: any;

const a = <div attr=<span /><span /> />;


//// [jsxAttributeInitializerMultipleElementsNoCrash.js]
"use strict";
const a = (React.createElement("div", { attr: React.createElement("span", null) }), React.createElement("span", null)) /  > ;
