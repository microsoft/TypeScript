//// [tests/cases/compiler/thisAssignmentInNamespaceDeclaration1.ts] ////

//// [a.js]
namespace foo {
    this.bar = 4;
}

//// [b.js]
namespace blah {
    this.prop = 42;
}


//// [a.js]
"use strict";
var foo;
(function (foo) {
    this.bar = 4;
})(foo || (foo = {}));
//// [b.js]
"use strict";
var blah;
(function (blah) {
    this.prop = 42;
})(blah || (blah = {}));
