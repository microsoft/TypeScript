/// <reference path="fourslash.ts" />

// @module: commonjs
// @jsx: react-jsx

// @Filename: /component.tsx
//// export default function (props: any) {}

// @Filename: /index.tsx
//// export function Index() {
////     return <Component/**/ />;
//// }

goTo.marker("");
verify.importFixAtPosition([`import Component from "./component";

export function Index() {
    return <Component />;
}`]);
