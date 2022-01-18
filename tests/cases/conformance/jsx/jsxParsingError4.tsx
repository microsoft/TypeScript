// @strict: true, false
// @jsx: react
// @filename: a.tsx

declare const React: any
declare namespace JSX {
    interface IntrinsicElements {
        [k: string]: any
    }
}

const a = (
  <public-foo></public-foo>
);

const b = (
  <public></public>
);
