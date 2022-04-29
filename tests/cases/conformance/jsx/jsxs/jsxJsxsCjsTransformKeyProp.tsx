// @jsx: react-jsx,react-jsxdev
// @strict: true
// @module: commonjs
/// <reference path="/.lib/react16.d.ts" />
const props = { answer: 42 }
const a = <div key="foo" {...props}>text</div>;
const b = <div {...props} key="bar">text</div>;

export {};
