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
var _jsxFileName = "commentsOnJSXExpressionsArePreserved.tsx";
var Component = /** @class */ (function () {
    function Component() {
    }
    Component.prototype.render = function () {
        return _jsxDEV("div", { children: null /* preserved */ }, void 0, false, { fileName: _jsxFileName, lineNumber: 5, columnNumber: 16 }, this);
    };
    return Component;
}());
