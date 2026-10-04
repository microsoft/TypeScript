// @target: esnext
// @jsx: react
// @strict: true
// @noEmit: false
function Test() {
    return React.createElement(Child, null,
        React.createElement(Child, null,
            React.createElement(Child, null)));
}
