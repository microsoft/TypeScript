//@target: ES6
function* g() {
    let x = {
        get [yield 0]() {
            return 0;
        }
    }
}