//// [typeofThisWithImplicitThis.ts]
function Test1() {
    let x: typeof this.no = 1
}


//// [typeofThisWithImplicitThis.js]
function Test1() {
    var x = 1;
}
