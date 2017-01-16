//@noUnusedLocals:true
//@module: commonjs
//@reactNamespace: Element
//@jsx: react

// @filename: foo.tsx
import Element = require("react");

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


