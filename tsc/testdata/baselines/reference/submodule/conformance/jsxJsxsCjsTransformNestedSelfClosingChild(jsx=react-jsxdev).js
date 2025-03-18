//// [tests/cases/conformance/jsx/jsxs/jsxJsxsCjsTransformNestedSelfClosingChild.tsx] ////

//// [jsxJsxsCjsTransformNestedSelfClosingChild.tsx]
/// <reference path="/.lib/react16.d.ts" />
import type * as React from 'react';

console.log(
  <div>
    <div />
  </div>
)

console.log(
  <div>
    <div />
    <div />
  </div>
)

console.log(
  <div>
    {[1, 2].map(i => <div key={i}>{i}</div>)}
  </div>
)

//// [jsxJsxsCjsTransformNestedSelfClosingChild.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
console.log(<div>
    <div />
  </div>);
console.log(<div>
    <div />
    <div />
  </div>);
console.log(<div>
    {[1, 2].map(i => <div key={i}>{i}</div>)}
  </div>);
