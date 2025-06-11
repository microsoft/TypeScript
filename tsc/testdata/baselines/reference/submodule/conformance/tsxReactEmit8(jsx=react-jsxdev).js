//// [tests/cases/conformance/jsx/tsxReactEmit8.tsx] ////

//// [tsxReactEmit8.tsx]
/// <reference path="/.lib/react16.d.ts" />

<div>1</div>;
<div key={"key-attr"}>2</div>;


//// [tsxReactEmit8.js]
import { jsxDEV as _jsxDEV } from "react/jsx-dev-runtime";
/// <reference path="react16.d.ts" />
_jsxDEV("div", { children: "1" });
_jsxDEV("div", { children: "2" }, "key-attr");
