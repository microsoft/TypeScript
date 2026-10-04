// @strict: true
// @noEmit: true
// @allowUnreachableCode: true, false

try {
    for (
        (function () { throw "1"; })();
        (function* () { throw "2"; })();
        (function* () { throw "3"; })()
    ) {
        console.log("1");
    }
}
catch (e) { }
 as  ;
