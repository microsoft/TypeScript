// @jsx: react
// @target: es2015
// @filename: /a.tsx

declare const React: any;

const t1 = <div {...<span />} />;
const t2 = <div {...<span className="foo" />} />;
