//// [tests/cases/compiler/erasableSyntaxOnly.ts] ////

//// [index.ts]
class MyClassErr {
    // No parameter properties
    constructor(public foo: string) { }
}

namespace IllegalBecauseInstantiated {
    export const m = 1;
}

namespace AlsoIllegalBecauseInstantiated {
    class PrivateClass {

    }
}

namespace IllegalBecauseNestedInstantiated {
    namespace Nested {
        export const m = 1;
    }
}

enum NotLegalEnum {
    B = 1
}

import NoGoodAlias = NotLegalEnum.B;

const enum NotLegalConstEnum {
    C = 2
}

// No errors after this point
class MyClassOk {
    // Not a parameter property, ok
    constructor(foo: string) { }
}

// Note for implementors: This should not be an error
// as this entire namespace block is fully erased
namespace NotInstantiated {
    export interface JustAType { }
    export type ATypeInANamespace = {};
    namespace Nested {
        export type ATypeInANamespace = {};
    }
}
declare namespace AmbientIsNotInstantiated {
    export const stillOk = 12;
}

declare enum LegalEnum {
    A = 1
}

declare namespace AmbientStuff {
    namespace Nested {
        export const stillOk = 12;
    }
    enum EnumInAmbientContext {
        B = 1
    }

    import FineAlias = EnumInAmbientContext.B;
}

// Not erasable
(()=><any>{})();
(()=>< any >{})();
(()=> < any > {})();

// Erasable
(()=><any>({}))();
(()=>(<any>{}))();
<any>{};


// return and yield ASI
function *gen() {
    yield <any>
        1;
    return <any>
        1;
}

// at the start of an ExpressionStatement if followed by an object literal; though I'm not sure why one would use it there
<unknown>{foo() {}}.foo();

// at the start of an ExpressionStatement if followed by function keyword
<unknown>function() {}();
<unknown>function() {};

// at the start of an ExpressionStatement if followed by an anonymous class expression
// note that this exact syntax currently emits invalid JS (no parenthesis added like for function above)
<unknown>class {}

//// [commonjs.cts]
import foo = require("./other.cjs");
export = foo;


//// [other.d.cts]
declare function foo(): void;
export = foo;


//// [esm.mts]
const foo = 1234;
export default foo;


//// [index.js]
class MyClassErr {
    foo;
    // No parameter properties
    constructor(foo) {
        this.foo = foo;
    }
}
var IllegalBecauseInstantiated;
(function (IllegalBecauseInstantiated) {
    IllegalBecauseInstantiated.m = 1;
})(IllegalBecauseInstantiated || (IllegalBecauseInstantiated = {}));
var AlsoIllegalBecauseInstantiated;
(function (AlsoIllegalBecauseInstantiated) {
    class PrivateClass {
    }
})(AlsoIllegalBecauseInstantiated || (AlsoIllegalBecauseInstantiated = {}));
var IllegalBecauseNestedInstantiated;
(function (IllegalBecauseNestedInstantiated) {
    let Nested;
    (function (Nested) {
        Nested.m = 1;
    })(Nested || (Nested = {}));
})(IllegalBecauseNestedInstantiated || (IllegalBecauseNestedInstantiated = {}));
var NotLegalEnum;
(function (NotLegalEnum) {
    NotLegalEnum[NotLegalEnum["B"] = 1] = "B";
})(NotLegalEnum || (NotLegalEnum = {}));
// No errors after this point
class MyClassOk {
    // Not a parameter property, ok
    constructor(foo) { }
}
// Not erasable
(() => (({})))();
(() => (({})))();
(() => (({})))();
// Erasable
(() => ({}))();
(() => (({})))();
(({}));
// return and yield ASI
function* gen() {
    yield 1;
    return 1;
}
// at the start of an ExpressionStatement if followed by an object literal; though I'm not sure why one would use it there
(({ foo() { } }.foo()));
// at the start of an ExpressionStatement if followed by function keyword
((function () { }()));
((function () { }));
// at the start of an ExpressionStatement if followed by an anonymous class expression
// note that this exact syntax currently emits invalid JS (no parenthesis added like for function above)
((class {
}));
//// [commonjs.cjs]
"use strict";
const foo = require("./other.cjs");
module.exports = foo;
//// [esm.mjs]
const foo = 1234;
export default foo;
