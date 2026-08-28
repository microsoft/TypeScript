// @strict: true
// @noEmit: true
// @allowUnreachableCode: true, false
// @target: es2015

try {
    for (const x in (function () { throw "1"; })()) {
        console.log("1");
    }
}
catch (e) { }
