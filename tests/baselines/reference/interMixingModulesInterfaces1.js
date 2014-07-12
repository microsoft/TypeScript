//// [interMixingModulesInterfaces1.ts]
module A {

    export interface B {
        name: string;
        value: number;
    }

    export module B {
        export function createB(): B {
            return null;
        }
    }
}

var x: A.B = A.B.createB();

//// [interMixingModulesInterfaces1.js]
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
