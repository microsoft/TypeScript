//// [tests/cases/compiler/invalidTypeNames.ts] ////

//// [invalidTypeNames.ts]
// Refer to calling code - a real illegal name is subbed in here
class illegal_name_here {
}


//// [invalidTypeNames.js]
// Refer to calling code - a real illegal name is subbed in here
var illegal_name_here = /** @class */ (function () {
    function illegal_name_here() {
    }
    return illegal_name_here;
}());
