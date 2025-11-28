// @erasableSyntaxOnly: true
// @noEmit: true

// Diffs from the other test:
// - Parameter properties are already banned in .d.ts files

// @filename: index.d.cts
declare function foo(): void;
export = foo;


// @filename: index.d.ts
namespace IllegalBecauseInstantiated {
    export const m = 1;
}

namespace AlsoIllegalBecauseInstantiated {
    class PrivateClass {

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
    constructor(foo: string);
}
namespace NotInstantiated {
    export interface JustAType { }
    export type ATypeInANamespace = {};
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

// @filename: commonjs.d.cts
import foo = require("./other.cjs");
export = foo;


// @filename: other.d.cts
declare function foo(): void;
export = foo;


// @filename: esm.d.mts
declare const foo = 1234;
export default foo;
