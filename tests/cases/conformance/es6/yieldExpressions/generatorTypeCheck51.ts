//@target: ES6
//@noImplicitAny: true

function* g() {
    function* h() {
        yield 0;
    }
}