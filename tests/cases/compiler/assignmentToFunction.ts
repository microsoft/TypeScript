function fn() { }
fn = () => 3;

module foo {
    function xyz() {
        function bar() {
        }
        bar = null;
    }
}