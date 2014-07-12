//// [interMixingModulesInterfaces4.ts]
module A {

    export module B {
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
    (function (B) {
        function createB() {
            return null;
        }
        B.createB = createB;
    })(A.B || (A.B = {}));
    var B = A.B;
})(A || (A = {}));

var x = A.B.createB();
