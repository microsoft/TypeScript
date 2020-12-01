//// [commentsOnJSXExpressionsArePreserved.tsx]
// file is interntionally not a module - this tests for a crash in the module/system transforms alongside the `react-jsx` and `react-jsxdev` outputs
namespace JSX {
    interface IntrsinsicElements { [index: string]: any }
    type JSXElement = any;
}
class Component {
    render() {
        return <div>
            {/* missing */}
            {null/* preserved */}
        </div>;
    }
}

//// [commentsOnJSXExpressionsArePreserved.js]
var _jsxFileName = "tests/cases/compiler/commentsOnJSXExpressionsArePreserved.tsx";
var Component = /** @class */ (function () {
    function Component() {
    }
    Component.prototype.render = function () {
        return _jsxDEV("div", { children: null /* preserved */ }, void 0, false, { fileName: _jsxFileName, lineNumber: 8, columnNumber: 15 }, this);
    };
    return Component;
}());
