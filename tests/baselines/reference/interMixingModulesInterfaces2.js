//// [tests/cases/compiler/interMixingModulesInterfaces2.ts] ////

//// [interMixingModulesInterfaces2.ts]
module A {

    export interface B {
        name: string;
        value: number;
    }

    module B {
        export function createB(): B {
            return null;
        }
    }
}

var x: A.B = null;

//// [interMixingModulesInterfaces2.js]
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
