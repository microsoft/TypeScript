//@noimplicitany: true
//@declaration: true
// generates function fn1(): number;
function fn1() {
    var x: number;
    return x;
}
// generates function fn2(): any;
function fn2(): any {
    var x: any;
    return x;
}
// generates function fn3();
function fn3() {
    var x: any;
    return x;
}
