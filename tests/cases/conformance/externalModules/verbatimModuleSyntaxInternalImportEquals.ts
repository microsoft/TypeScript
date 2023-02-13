// @verbatimModuleSyntax: true
// @module: esnext

export {};
import f1 = NonExistent;

namespace Foo {
    export const foo = 1;
    export type T = any;
}

import f2 = Foo.foo;
import f3 = Foo.T;
