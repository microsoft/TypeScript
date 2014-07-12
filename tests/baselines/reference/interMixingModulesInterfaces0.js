//// [interMixingModulesInterfaces0.ts]
// bug 742098: intermixing modules and interfaces causes errors at call site and order matters

module A {

    export module B {
        export function createB(): B {
            return null;
        }
    }

    export interface B {
        name: string;
        value: number;
    }
}

var x: A.B = A.B.createB();

//// [interMixingModulesInterfaces0.js]
// bug 742098: intermixing modules and interfaces causes errors at call site and order matters
var A;
(function (A) {
    (function (B) {
        function createB() {
            return null;
        }
        B.createB = createB;
    })(A.B || (A.B = {}));
    var B = A.B;
})(A || (A = {}));

var x = A.B.createB();
