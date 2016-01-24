//@target: ES6
function* g() {
    let x = {
        [yield 0]() {

        }
    }
}