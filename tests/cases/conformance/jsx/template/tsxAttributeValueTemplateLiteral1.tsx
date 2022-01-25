//@filename: file.tsx
//@jsx: preserve, react
//@target: esnext, es5
// @noLib: true
// @skipLibCheck: true
// @libFiles: react.d.ts,lib.d.ts

import React = require('react');

interface Prop {
    foo: string,
}

function Comp(p: Prop) {
    return <div>{p.foo}</div>;
}

const a = 42;

<Comp foo=`foo` />;
<Comp foo=`foo${a}` />;
<Comp foo=`foo${a}foo` />;
