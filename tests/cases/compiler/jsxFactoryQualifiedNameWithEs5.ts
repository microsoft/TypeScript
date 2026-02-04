// @strict: false
//@module: commonjs
//@target: es5, es2015
//@jsx: react
//@jsxFactory: skate.h
//@noEmit: false

// @filename: index.tsx
import "./jsx";

var skate: any;
const React = { createElement: skate.h };

class Component {
    renderCallback() {
        return <div>test</div>;
    }
};