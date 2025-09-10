//// [tests/cases/compiler/interMixingModulesInterfaces5.ts] ////

//// [interMixingModulesInterfaces5.ts]
namespace A {

    interface B {
        name: string;
        value: number;
    }

    export namespace B {
        export function createB(): number {
            return null;
        }
    }
}

var x: number = A.B.createB();

//// [interMixingModulesInterfaces5.js]
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
