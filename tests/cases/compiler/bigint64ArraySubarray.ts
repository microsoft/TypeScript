// @target: es2020

function bigInt64ArraySubarray() {
    var arr = new BigInt64Array(10);
    arr.subarray();
    arr.subarray(0);
    arr.subarray(0, 10);
}
