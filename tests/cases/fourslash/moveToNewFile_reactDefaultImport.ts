/// <reference path='fourslash.ts' />

// @jsx: react
// @module: esnext
// @target: es2020
// @moduleResolution: bundler

// @Filename: /node_modules/react/index.d.ts
//// export = React;
//// export as namespace React;
//// declare namespace React {
////     class Component<P, S> {}
//// }

// @Filename: /src/main.tsx
//// import React from "react";
//// 
//// [|class MyComponent extends React.Component {
////     render() {
////         return <div />;
////     }
//// }|]


// this test only crashes with bundler and non-preserve
verify.moveToNewFile({
    newFileContents: {
        "/src/main.tsx":
`
`,
        "/src/MyComponent.tsx":
`import React from "react";

class MyComponent extends React.Component {
    render() {
        return <div />;
    }
}
`
    }
});
