//// [tests/cases/compiler/interMixingModulesInterfaces3.ts] ////

//// [interMixingModulesInterfaces3.ts]
module A {

    module B {
        export function createB(): B {
            return null;
        }
    }

    export interface B {
        name: string;
        value: number;
    }
}

var x: A.B = null;

//// [interMixingModulesInterfaces3.js]
var A;
(function (A) {
    var B;
    (function (B) {
        function createB() {
            return null;
        }
        B.createB = createB;
    })(B || (B = {}));
})(A || (A = {}));
var x = null;
