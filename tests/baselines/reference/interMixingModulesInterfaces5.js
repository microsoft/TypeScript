//// [interMixingModulesInterfaces5.ts]
module A {

    interface B {
        name: string;
        value: number;
    }

    export module B {
        export function createB(): number {
            return null;
        }
    }
}

var x: number = A.B.createB();

//// [interMixingModulesInterfaces5.js]
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
