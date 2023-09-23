/// <reference path='fourslash.ts' />

// @allowSyntheticDefaultImports: true
// @moduleResolution: node
// @noUnusedLocals: true
// @target: es2018
// @jsx: react-jsxdev

// @filename: test.tsx
////import React from 'react';
////export default () => <div></div>

// @filename: node_modules/react/package.json
////{
////    "name": "react",
////    "types": "index.d.ts",
////}

// @filename: node_modules/react/index.d.ts
////export = React;
////declare namespace JSX {
////    interface IntrinsicElements { [x: string]: any; }
////}
////declare namespace React {}

// @filename: node_modules/react/jsx-runtime.d.ts
////import './';

// @filename: node_modules/react/jsx-dev-runtime.d.ts
////import './';

goTo.file("test.tsx");
verify.organizeImports(`export default () => <div></div>`);
