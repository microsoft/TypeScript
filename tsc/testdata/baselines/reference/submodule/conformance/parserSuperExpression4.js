//// [tests/cases/conformance/parser/ecmascript5/SuperExpressions/parserSuperExpression4.ts] ////

//// [parserSuperExpression4.ts]
class C {
    private foo() {
        super.foo = 1
    }
}

namespace M1.M2 {
    class C {
        private foo() {
            super.foo = 1
        }
    }
}

//// [parserSuperExpression4.js]
"use strict";
class C {
    foo() {
        super.foo = 1;
    }
}
var M1;
(function (M1) {
    let M2;
    (function (M2) {
        class C {
            foo() {
                super.foo = 1;
            }
        }
    })(M2 = M1.M2 || (M1.M2 = {}));
})(M1 || (M1 = {}));
