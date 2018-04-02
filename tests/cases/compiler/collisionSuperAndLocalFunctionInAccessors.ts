// @target: es5
function _super() { // No error
}
class Foo {
    get prop1(): number {
        function _super() { // No error
        }
        return 10;
    }
    set prop1(val: number) {
        function _super() { // No error
        }
    }
}
class b extends Foo {
    get prop2(): number {
        function _super() { // Should be error
        }
        return 10;
    }
    set prop2(val: number) {
        function _super() { // Should be error
        }
    }
}
class c extends Foo {
    get prop2(): number {
        var x = () => {
            function _super() { // Should be error
            }
        }
        return 10;
    }
    set prop2(val: number) {
        var x = () => {
            function _super() { // Should be error
            }
        }
    }
}