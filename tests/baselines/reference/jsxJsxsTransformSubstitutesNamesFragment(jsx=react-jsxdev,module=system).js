//// [jsxJsxsTransformSubstitutesNamesFragment.tsx]
/// <reference path="/.lib/react16.d.ts" />
const a = <>
  <p></p>
  text
  <div></div>
</>

export {};

//// [jsxJsxsTransformSubstitutesNamesFragment.js]
System.register(["react/jsx-dev-runtime"], function (exports_1, context_1) {
    "use strict";
    var jsx_dev_runtime_1, _jsxFileName, a;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (jsx_dev_runtime_1_1) {
                jsx_dev_runtime_1 = jsx_dev_runtime_1_1;
            }
        ],
        execute: function () {
            _jsxFileName = "tests/cases/conformance/jsx/jsxs/jsxJsxsTransformSubstitutesNamesFragment.tsx";
            /// <reference path="react16.d.ts" />
            a = jsx_dev_runtime_1.jsxDEV(jsx_dev_runtime_1.Fragment, { children: [jsx_dev_runtime_1.jsxDEV("p", {}, void 0, false, { fileName: _jsxFileName, lineNumber: 3, columnNumber: 3 }, this), "text", jsx_dev_runtime_1.jsxDEV("div", {}, void 0, false, { fileName: _jsxFileName, lineNumber: 5, columnNumber: 3 }, this)] }, void 0, true, { fileName: _jsxFileName, lineNumber: 2, columnNumber: 10 }, this);
        }
    };
});
