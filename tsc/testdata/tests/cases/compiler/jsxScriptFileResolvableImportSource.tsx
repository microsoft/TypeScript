// @jsx: react-jsx
// @jsxImportSource: solid-js
// @module: commonjs
// @moduleDetection: legacy

// @filename: node_modules/solid-js/jsx-runtime.d.ts
export namespace JSX {
    interface IntrinsicElements {
        div: {};
    }
}
export function jsx(type: any, props: any, key?: any): any;
export const Fragment: unique symbol;

// @filename: index.tsx
const x = <div />;
