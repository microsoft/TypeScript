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
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var jsx_dev_runtime_1 = require("react/jsx-dev-runtime");
var _jsxFileName = "commentsOnJSXExpressionsArePreserved.tsx";
var Component = /** @class */ (function () {
    function Component() {
    }
    Component.prototype.render = function () {
        return (0, jsx_dev_runtime_1.jsxDEV)("div", { children: null /* preserved */ }, void 0, false, { fileName: _jsxFileName, lineNumber: 5, columnNumber: 15 }, this);
    };
    return Component;
}());
