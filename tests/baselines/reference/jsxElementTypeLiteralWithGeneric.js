//// [tests/cases/compiler/jsxElementTypeLiteralWithGeneric.tsx] ////

//// [jsxElementTypeLiteralWithGeneric.tsx]
/// <reference path="/.lib/react16.d.ts" />
import * as React from "react";

declare global {
  namespace JSX {
    type ElementType<P = any> =
      | {
        [K in keyof JSX.IntrinsicElements]: P extends JSX.IntrinsicElements[K]
        ? K
        : never;
      }[keyof JSX.IntrinsicElements]
      | React.ComponentType<P>;
  }
}

// should be fine - `ElementType` accepts `div`
let a = <div />;

// Should be an error.
// `ruhroh` is in neither `IntrinsicElements` nor `ElementType`
let c = <ruhroh />;


//// [jsxElementTypeLiteralWithGeneric.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/// <reference path="react16.d.ts" />
var React = require("react");
// should be fine - `ElementType` accepts `div`
var a = React.createElement("div", null);
// Should be an error.
// `ruhroh` is in neither `IntrinsicElements` nor `ElementType`
var c = React.createElement("ruhroh", null);
