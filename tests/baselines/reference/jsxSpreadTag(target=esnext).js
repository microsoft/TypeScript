//// [tests/cases/compiler/jsxSpreadTag.ts] ////

//// [a.tsx]
declare const React: any;

const t1 = <div {...<span />} />;
const t2 = <div {...<span className="foo" />} />;
const t3 = <Comp
    right={<div>x</div>}
    {...{ wrong: <div>x</div>}}
/>;
const t4 = <Comp
    right={<div>x</div>}
    {...{ wrong() { return <div>x</div>; }}}
/>;
const t5 = <Comp
    right={<div>x</div>}
    {...{ get wrong() { return <div>x</div>; }}}
/>;
const t6 = <Comp
    right={<div>x</div>}
    {...{ set wrong(s) { let a = <div>x</div>; }}}
/>;


//// [a.js]
const t1 = React.createElement("div", { ...React.createElement("span", null) });
const t2 = React.createElement("div", { ...React.createElement("span", { className: "foo" }) });
const t3 = React.createElement(Comp, { right: React.createElement("div", null, "x"), wrong: React.createElement("div", null, "x") });
const t4 = React.createElement(Comp, { right: React.createElement("div", null, "x"), wrong() { return React.createElement("div", null, "x"); } });
const t5 = React.createElement(Comp, { right: React.createElement("div", null, "x"), get wrong() { return React.createElement("div", null, "x"); } });
const t6 = React.createElement(Comp, { right: React.createElement("div", null, "x"), set wrong(s) { let a = React.createElement("div", null, "x"); } });
