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
var A = A || (A = {});
(function (A) {
    var B = A.B || (A.B = {});
    (function (B) {
        function createB() {
            return null;
        }
        B.createB = createB;
    })(B);
})(A);
var x = A.B.createB();
