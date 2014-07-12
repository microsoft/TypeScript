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
