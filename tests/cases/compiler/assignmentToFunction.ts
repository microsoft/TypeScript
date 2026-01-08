function fn() { }
fn = () => 3;

namespace foo {
    function xyz() {
        function bar() {
        }
        bar = null;
    }
}