//// [tests/cases/compiler/jsxAttributeInitializerMultipleElementsNoCrash.tsx] ////

//// [jsxAttributeInitializerMultipleElementsNoCrash.tsx]
declare namespace JSX { interface IntrinsicElements { [x: string]: any } }
declare const React: any;

const a = <div attr=<span /><span /> />;


//// [jsxAttributeInitializerMultipleElementsNoCrash.js]
import { jsx as _jsx } from "react/jsx-runtime";
const a = (_jsx("div", { attr: _jsx("span", {}) }), _jsx("span", {})) /  > ;
