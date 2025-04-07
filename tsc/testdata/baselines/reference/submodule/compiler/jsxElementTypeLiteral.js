//// [tests/cases/compiler/jsxElementTypeLiteral.tsx] ////

//// [jsxElementTypeLiteral.tsx]
/// <reference path="/.lib/react16.d.ts" />
import * as React from "react";

declare global {
  namespace JSX {
    // This should only use keys of JSX.IntrinsicElements.
    // Diverging here to illustrate different error messages.
    type ElementType = "div";
  }
}

// should be fine - `ElementType` accepts `div`
let a = <div />;

// should be an error - `ElementType` does not accept `span`
let b = <span />;

// Should be an error.
// `ruhroh` is in neither `IntrinsicElements` nor `ElementType`
let c = <ruhroh />;


//// [jsxElementTypeLiteral.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/// <reference path="react16.d.ts" />
const React = require("react");
// should be fine - `ElementType` accepts `div`
let a = <div />;
// should be an error - `ElementType` does not accept `span`
let b = <span />;
// Should be an error.
// `ruhroh` is in neither `IntrinsicElements` nor `ElementType`
let c = <ruhroh />;
