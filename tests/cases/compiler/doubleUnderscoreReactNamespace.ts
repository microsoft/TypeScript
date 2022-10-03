// @jsx: react
// @jsxFactory: __make
// @module: commonjs
// @filename: index.tsx

declare global {
    function __make (params: object): any;
}

declare var __foot: any;

const thing = <__foot />;

export {}
