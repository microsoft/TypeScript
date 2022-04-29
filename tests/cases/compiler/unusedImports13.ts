//@noUnusedLocals:true
//@module: commonjs
//@jsx: preserve

// @filename: foo.tsx
import React = require("react");

export const FooComponent = <div></div>

// @filename: node_modules/@types/react/index.d.ts
export = React;
export as namespace React;

declare namespace React {
    function createClass<P, S>(spec);
}
declare global {
    namespace JSX {
    }
}


