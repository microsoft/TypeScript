/// <reference path='fourslash.ts'/>

// @isolatedDeclarations: true
// @declaration: true
// @moduleResolution: node
// @target: es2018
// @jsx: react-jsx

// @filename: node_modules/react/package.json
////{
////    "name": "react",
////    "types": "index.d.ts",
////}

// @filename: node_modules/react/index.d.ts
////export = React;
////declare namespace JSX {
////    interface Element extends GlobalJSXElement { }
////    interface IntrinsicElements extends GlobalJSXIntrinsicElements { }
////}
////declare namespace React { }
////declare global {
////    namespace JSX {
////        interface Element { }
////        interface IntrinsicElements { [x: string]: any; }
////    }
////}
////interface GlobalJSXElement extends JSX.Element {}
////interface GlobalJSXIntrinsicElements extends JSX.IntrinsicElements {}

// @filename: node_modules/react/jsx-runtime.d.ts
////import './';

// @filename: node_modules/react/jsx-dev-runtime.d.ts
////import './';

// @filename: /a.tsx
////export const x = <div aria-label="label text" />;

goTo.file("/a.tsx");
verify.codeFix({
    description: `Add satisfies and an inline type assertion with 'JSX.Element'`,
    index: 1,
    newFileContent: 'export const x = (<div aria-label="label text" />) satisfies JSX.Element as JSX.Element;',
});
