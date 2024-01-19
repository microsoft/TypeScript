// @jsx: react
// @target: es2015,esnext
// @filename: /a.tsx

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
