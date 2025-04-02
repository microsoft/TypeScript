//// [tests/cases/compiler/commentsOnJSXExpressionsArePreserved.tsx] ////

//// [commentsOnJSXExpressionsArePreserved.tsx]
// file is intentionally not a module - this tests for a crash in the module/system transforms alongside the `react-jsx` and `react-jsxdev` outputs
namespace JSX {}
class Component {
    render() {
        return <div>
            {/* missing */}
            {null/* preserved */}
            {
                // ??? 1
            }
            { // ??? 2
            }
            {// ??? 3
            }
            {
                // ??? 4
            /* ??? 5 */}
        </div>;
    }
}

//// [commentsOnJSXExpressionsArePreserved.js]
System.register(["react/jsx-dev-runtime"], function (exports_1, context_1) {
    "use strict";
    var jsx_dev_runtime_1, _jsxFileName, Component;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (jsx_dev_runtime_1_1) {
                jsx_dev_runtime_1 = jsx_dev_runtime_1_1;
            }
        ],
        execute: function () {
            _jsxFileName = "commentsOnJSXExpressionsArePreserved.tsx";
            Component = /** @class */ (function () {
                function Component() {
                }
                Component.prototype.render = function () {
                    return _jsxDEV("div", { children: null /* preserved */ }, void 0, false, { fileName: _jsxFileName, lineNumber: 5, columnNumber: 15 }, this);
                };
                return Component;
            }());
        }
    };
});
