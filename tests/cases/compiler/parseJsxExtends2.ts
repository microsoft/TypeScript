// @jsx: react
// @filename: index.tsx

declare const React: any;

export function Foo() {
    // Error: T is not declared.
    return <T extends/>
}
