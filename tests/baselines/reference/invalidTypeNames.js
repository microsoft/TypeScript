//// [invalidTypeNames.ts]
// Refer to calling code - a real illegal name is subbed in here
class illegal_name_here {
}


//// [invalidTypeNames.js]
var illegal_name_here = (function () {
    function illegal_name_here() {
    }
    return illegal_name_here;
})();
