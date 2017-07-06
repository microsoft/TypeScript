// @jsx: react
// @jsxFactory: __make
// @module: commonjs
// @filename: index.tsx

declare global {
    namespace JSX {
        interface IntrinsicElements {
            __foot: any;
        }
    }
    function __make (params: object): any;
}


const thing = <__foot></__foot>;

export {}