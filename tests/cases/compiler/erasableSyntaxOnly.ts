// @erasableSyntaxOnly: true

// @filename: index.ts
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

// @filename: commonjs.cts
import foo = require("./other.cjs");
export = foo;


// @filename: other.d.cts
declare function foo(): void;
export = foo;


// @filename: esm.mts
const foo = 1234;
export default foo;
