// @module: system,commonjs
// @jsx: react,react-jsx,react-jsxdev,preserve
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