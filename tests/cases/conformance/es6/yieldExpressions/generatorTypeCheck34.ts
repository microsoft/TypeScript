//@target: ES6
function* g() {
    yield 0;
    function* g2() {
        return "";
    }
}