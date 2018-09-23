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
var A = A || (A = {});
(function (A) {
    var B = B || (B = {});
    (function (B) {
        function createB() {
            return null;
        }
        B.createB = createB;
    })(B);
})(A);
var x = null;
