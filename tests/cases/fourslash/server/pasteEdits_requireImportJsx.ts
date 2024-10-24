/// <reference path="../fourslash.ts" />

// @Filename: /home/src/workspaces/project/folder/c.jsx
//// [||]

// @Filename: /home/src/workspaces/project/b.jsx
//// import React = require("./react");
////
//// [|class MyComponent extends React.Component {
////     render() {
////         return <div />;
////     }
//// }|]

// @Filename: /home/src/workspaces/project/react.d.ts
////export = React;
////export as namespace React;
////declare namespace React {
////    class Component {}
////}

// @Filename: /home/src/workspaces/project/tsconfig.json
////{ "files": ["folder/c.jsx", "react.d.ts", "b.jsx"] }

const range = test.ranges();
verify.pasteEdits({
    args: {
        pastedText: 
[`class MyComponent extends React.Component {
    render() {
        return <div />;
    }
}`],
        pasteLocations: [range[0]],
        copiedFrom: { file: "/home/src/workspaces/project/b.jsx", range: [range[1]] },
    },
    newFileContents: {
        "/home/src/workspaces/project/folder/c.jsx":
`const React = require("../react");

class MyComponent extends React.Component {
    render() {
        return <div />;
    }
}`
    }
});