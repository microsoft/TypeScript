// @jsx: react
// @filename: a.tsx

declare const React: any
declare namespace JSX {
    interface IntrinsicElements {
        [k: string]: any
    }
}

const X: any
const a: any

<X a={...a} />
