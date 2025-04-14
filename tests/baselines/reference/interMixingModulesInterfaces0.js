//// [tests/cases/compiler/interMixingModulesInterfaces0.ts] ////

//// [interMixingModulesInterfaces0.ts]
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
var A;
(function (A) {
    var B;
    (function (B) {
        function createB() {
            return null;
        }
        B.createB = createB;
    })(B = A.B || (A.B = {}));
})(A || (A = {}));
var x = A.B.createB();
