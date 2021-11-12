// @outdir: out/
// @target: esnext
// @allowJS: true
// @filename: plainJSReservedWord.js
export default 12
export default 13
const await = 1
const yield = 2
async function f() {
    const await = 3
}
function* g() {
    const yield = 4
}
class C {
    #constructor = 5
    deleted() {
        function container(f) {
            delete f
        }
        var g = 6
        delete g
        delete container
    }
    evalArguments() {
        const eval = 7
        const arguments = 8
    }
}
const eval = 9
const arguments = 10
