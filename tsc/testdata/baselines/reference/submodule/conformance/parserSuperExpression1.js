//// [tests/cases/conformance/parser/ecmascript5/SuperExpressions/parserSuperExpression1.ts] ////

//// [parserSuperExpression1.ts]
class C {
    private foo() {
        super.foo();
    }
}

namespace M1.M2 {
    class C {
        private foo() {
            super.foo();
        }
    }
}

//// [parserSuperExpression1.js]
"use strict";
class C {
    foo() {
        super.foo();
    }
}
var M1;
(function (M1) {
    let M2;
    (function (M2) {
        class C {
            foo() {
                super.foo();
            }
        }
    })(M2 = M1.M2 || (M1.M2 = {}));
})(M1 || (M1 = {}));
