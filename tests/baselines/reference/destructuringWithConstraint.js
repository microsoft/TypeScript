//// [destructuringWithConstraint.ts]
// Repro from #22823

interface Props {
    foo?: boolean;
}

function foo<P extends Props>(props: Readonly<P>) {
    let { foo = false } = props;
    if (foo === true) { }
}


//// [destructuringWithConstraint.js]
"use strict";
// Repro from #22823
function foo(props) {
    var _a = props.foo, foo = _a === void 0 ? false : _a;
    if (foo === true) { }
}
