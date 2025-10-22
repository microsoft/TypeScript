//// [tests/cases/compiler/jsxNestedIndentation.tsx] ////

//// [jsxNestedIndentation.tsx]
declare var React: any;
declare function Child(props: { children?: any }): any;
function Test() {
    return <Child>
        <Child>
            <Child></Child>
        </Child>
    </Child>
}


//// [jsxNestedIndentation.js]
function Test() {
    return React.createElement(Child, null,
        React.createElement(Child, null,
            React.createElement(Child, null)));
}
