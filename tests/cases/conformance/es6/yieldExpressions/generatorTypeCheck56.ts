//@target: ES6
function* g() {
    var x = class C {
        *[yield 0]() {
            yield 0;
        }
    };
}