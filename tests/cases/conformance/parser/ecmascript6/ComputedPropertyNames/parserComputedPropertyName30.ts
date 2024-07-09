//@target: ES6
enum E {
    // no ASI, comma expected
    [e] = id++
    [e2] = 1
}