// @jsx: react
// @strict: true
// @skipLibCheck: true
// @target: ES2017
// @module: ESNext
// @esModuleInterop: true

// @filename: a.tsx
/// <reference path="/.lib/react18/react18.d.ts" />
/// <reference path="/.lib/react18/global.d.ts" />

const test = () => "asd";

const jsxWithJsxFragment = <>{test}</>;
const jsxWithReactFragment = <React.Fragment>{test}</React.Fragment>;
