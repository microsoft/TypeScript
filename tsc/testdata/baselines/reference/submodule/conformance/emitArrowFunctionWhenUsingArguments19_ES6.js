//// [tests/cases/conformance/es6/arrowFunction/emitArrowFunctionWhenUsingArguments19_ES6.ts] ////

//// [emitArrowFunctionWhenUsingArguments19_ES6.ts]
function f() {
    function g() {
        var _arguments = 10;                // No capture in 'g', so no conflict.
        function h() {
            var capture = () => arguments;  // Should trigger an '_arguments' capture into function 'h'
            foo(_arguments);                // Error as this does not resolve to the user defined '_arguments'
        }
    }

    function foo(x: any) {
        return 100;
    }
}

//// [emitArrowFunctionWhenUsingArguments19_ES6.js]
function f() {
    function g() {
        var _arguments = 10; // No capture in 'g', so no conflict.
        function h() {
            var capture = () => arguments; // Should trigger an '_arguments' capture into function 'h'
            foo(_arguments); // Error as this does not resolve to the user defined '_arguments'
        }
    }
    function foo(x) {
        return 100;
    }
}
