// @jsx: react
// @strict: true
// @target: ES2017
// @module: ESNext
// @esModuleInterop: true
// @skipLibCheck: true

// @filename: index.tsx
/// <reference path="/.lib/react18/react18.d.ts" />
/// <reference path="/.lib/react18/global.d.ts" />

const test = () => "asd";

// these two should error in the same way 
const jsxWithJsxFragment = <>{test}</>;
const jsxWithReactFragment = <React.Fragment>{test}</React.Fragment>;

const jsxNestedFragment = <><>{test}</></>;
