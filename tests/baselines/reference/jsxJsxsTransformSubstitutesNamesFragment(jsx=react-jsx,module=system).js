//// [jsxJsxsTransformSubstitutesNamesFragment.tsx]
/// <reference path="/.lib/react16.d.ts" />
const a = <>
  <p></p>
  text
  <div></div>
</>

export {};

//// [jsxJsxsTransformSubstitutesNamesFragment.js]
System.register(["react/jsx-runtime"], function (exports_1, context_1) {
    "use strict";
    var jsx_runtime_1, a;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (jsx_runtime_1_1) {
                jsx_runtime_1 = jsx_runtime_1_1;
            }
        ],
        execute: function () {
            /// <reference path="react16.d.ts" />
            a = jsx_runtime_1.jsxs(jsx_runtime_1.Fragment, { children: [jsx_runtime_1.jsx("p", {}, void 0), "text", jsx_runtime_1.jsx("div", {}, void 0)] }, void 0);
        }
    };
});
