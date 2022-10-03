//// [unusedFunctionsinNamespaces5.ts]
namespace Validation {
    var function1 = function() {
    }

    export function function2() {

    }

    function function3() {
        function1();
    }

    function function4() {

    }
}

//// [unusedFunctionsinNamespaces5.js]
var Validation;
(function (Validation) {
    var function1 = function () {
    };
    function function2() {
    }
    Validation.function2 = function2;
    function function3() {
        function1();
    }
    function function4() {
    }
})(Validation || (Validation = {}));
