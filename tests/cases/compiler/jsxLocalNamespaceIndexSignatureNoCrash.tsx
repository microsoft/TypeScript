// @jsx: react
// @jsxFactory: X.jsx
// @filename: index.tsx

export class X {
    static jsx() {
        return document.createElement('p');
    }
}

export namespace X {
    export namespace JSX {
        export type IntrinsicElements = {
            [other: string]: any;
        };
    }
}

function A() {
    return (<p>Hello</p>);
}