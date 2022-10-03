// @target: es6

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