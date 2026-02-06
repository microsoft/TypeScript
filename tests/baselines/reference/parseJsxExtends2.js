//// [tests/cases/compiler/parseJsxExtends2.ts] ////

//// [index.tsx]
declare const React: any;

export function Foo() {
    // Error: T is not declared.
    return <T extends/>
}


//// [index.js]
export function Foo() {
    // Error: T is not declared.
    return React.createElement(T, { extends: true });
}
