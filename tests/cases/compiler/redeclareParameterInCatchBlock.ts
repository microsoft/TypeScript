// @target: es6

try {

} catch(e) {
    const e = null;
}

try {

} catch(e) {
    let e;
}

try {

} catch ([a, b]) {
    const [c, b] = [0, 1];
}

try {

} catch ({ a: x, b: x }) {

}

try {

} catch(e) {
    function test() {
        let e;
    }
}
