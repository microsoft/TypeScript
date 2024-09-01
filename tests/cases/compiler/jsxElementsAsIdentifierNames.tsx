// @strict: true
// @jsx: react
// @filename: a.tsx

declare const React: any;
declare module JSX {
    interface IntrinsicElements {
        ["package"]: any;
    }
    interface Element<P, T> { props: P; type: T; }
}

function A() {
    return <package />
}

function B() {
    return <package></package>
}
