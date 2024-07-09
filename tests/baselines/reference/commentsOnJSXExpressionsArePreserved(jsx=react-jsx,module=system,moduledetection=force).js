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
System.register(["react/jsx-runtime"], function (exports_1, context_1) {
    "use strict";
    var jsx_runtime_1, Component;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (jsx_runtime_1_1) {
                jsx_runtime_1 = jsx_runtime_1_1;
            }
        ],
        execute: function () {
            Component = /** @class */ (function () {
                function Component() {
                }
                Component.prototype.render = function () {
                    return _jsx("div", { children: null /* preserved */ });
                };
                return Component;
            }());
        }
    };
});
