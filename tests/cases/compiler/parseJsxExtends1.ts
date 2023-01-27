// @jsx: react
// @filename: index.tsx

declare const React: any;

export function Foo() {
    // No error; "const" is lowercase and therefore intrinsic.
    return <const T extends/>
}
