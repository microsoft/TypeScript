//// [tests/cases/compiler/jsxIntrinsicElementsTypeArgumentErrorSkipsTrivia.tsx] ////

//// [jsxIntrinsicElementsTypeArgumentErrorSkipsTrivia.tsx]
/// <reference path="/.lib/react16.d.ts" />
import * as React from "react";

const a = <div<   number> />;

const b = <div<
    number> />;


//// [jsxIntrinsicElementsTypeArgumentErrorSkipsTrivia.js]
/// <reference path="/.lib/react16.d.ts" />
import * as React from "react";
const a = React.createElement("div", null);
const b = React.createElement("div", null);
