//// [tests/cases/conformance/externalModules/verbatimModuleSyntaxInternalImportEquals.ts] ////

//// [verbatimModuleSyntaxInternalImportEquals.ts]
export {};
import f1 = NonExistent;

namespace Foo {
    export const foo = 1;
    export type T = any;
}

import f2 = Foo.foo;
import f3 = Foo.T;


//// [verbatimModuleSyntaxInternalImportEquals.js]
export {};
var f1 = NonExistent;
var Foo;
(function (Foo) {
    Foo.foo = 1;
})(Foo || (Foo = {}));
var f2 = Foo.foo;
var f3 = Foo.T;
