//// [redeclareParameterInCatchBlock.ts]

try {

} catch(e) {
    const e = null;
}

try {

} catch(e) {
    let e;
}

try {

} catch(e) {
    function test() {
        let e;
    }
}



//// [redeclareParameterInCatchBlock.js]
try {
}
catch (e) {
    const e = null;
}
try {
}
catch (e) {
    let e;
}
try {
}
catch (e) {
    function test() {
        let e;
    }
}
