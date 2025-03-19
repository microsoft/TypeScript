//// [tests/cases/compiler/expressionWithJSDocTypeArguments.ts] ////

//// [expressionWithJSDocTypeArguments.ts]
// Repro from #51802

function foo<T>(x: T): T { return x }

class Bar<T> { constructor(public x: T) { } }

// Errors expected on all of the following

const WhatFoo = foo<?>;
const HuhFoo = foo<string?>;
const NopeFoo = foo<?string>;
const ComeOnFoo = foo<?string?>;

type TWhatFoo = typeof foo<?>;
type THuhFoo = typeof foo<string?>;
type TNopeFoo = typeof foo<?string>;
type TComeOnFoo = typeof foo<?string?>;

const WhatBar = Bar<?>;
const HuhBar = Bar<string?>;
const NopeBar = Bar<?string>;
const ComeOnBar = Bar<?string?>;

type TWhatBar = typeof Bar<?>;
type THuhBar = typeof Bar<string?>;
type TNopeBar = typeof Bar<?string>;
type TComeOnBar = typeof Bar<?string?>;


//// [expressionWithJSDocTypeArguments.js]
// Repro from #51802
function foo(x) { return x; }
class Bar {
    x;
    constructor(x) {
        this.x = x;
    }
}
// Errors expected on all of the following
const WhatFoo = foo;
const HuhFoo = foo < string ?  >  : ;
const NopeFoo = foo;
const ComeOnFoo = foo <  ? string ?  >  :  : ;
 > ;
 > ;
const WhatBar = Bar;
const HuhBar = Bar < string ?  >  : ;
const NopeBar = Bar;
const ComeOnBar = Bar <  ? string ?  >  :  : ;
 > ;
 > ;
