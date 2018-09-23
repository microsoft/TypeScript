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
