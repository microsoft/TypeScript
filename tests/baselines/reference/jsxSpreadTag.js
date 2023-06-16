//// [tests/cases/compiler/jsxSpreadTag.ts] ////

//// [a.tsx]
declare const React: any;

const t1 = <div {...<span />} />;
const t2 = <div {...<span className="foo" />} />;


//// [a.js]
const t1 = React.createElement("div", Object.assign({}, React.createElement("span", null)));
const t2 = React.createElement("div", Object.assign({}, React.createElement("span", { className: "foo" })));
