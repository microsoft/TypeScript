// @target: es2015
// @strict: true
// @jsx: react-jsx
// @jsxImportSource: /react
// @module: preserve
// @noEmit: true
// @skipLibCheck: true

// @filename: /test.tsx
/// <reference path="/.lib/react18/react18.d.ts" />
/// <reference path="/.lib/react18/global.d.ts" />

export function Component() {
    const components = {
        div: "div",
        dov: "dov",
    } as const;

    return (
        <>
            <div></div>
            <dov></dov>
            <dav></dav>
            <components.div></components.div>
            <components.dov></components.dov>
            <components.dav></components.dav>
        </>
    );
}

// @filename: /react/jsx-runtime.d.ts
export {};