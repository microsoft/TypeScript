//// [tests/cases/compiler/interMixingModulesInterfaces4.ts] ////

//// [interMixingModulesInterfaces4.ts]
namespace A {

    export namespace B {
        export function createB(): number {
            return null;
        }
    }

    interface B {
        name: string;
        value: number;
    }
}

var x : number = A.B.createB();

//// [interMixingModulesInterfaces4.js]
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
