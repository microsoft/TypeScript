//// [tests/cases/compiler/interMixingModulesInterfaces1.ts] ////

//// [interMixingModulesInterfaces1.ts]
namespace A {

    export interface B {
        name: string;
        value: number;
    }

    export namespace B {
        export function createB(): B {
            return null;
        }
    }
}

var x: A.B = A.B.createB();

//// [interMixingModulesInterfaces1.js]
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
