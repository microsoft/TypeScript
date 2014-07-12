//// [overloadAssignmentCompat.js]
// ok - overload signatures are assignment compatible with their implementation
var Accessor = (function () {
    function Accessor() {
    }
    return Accessor;
})();

function attr(nameOrMap, value) {
    if (nameOrMap && typeof nameOrMap === "object") {
        // handle map case
        return new Accessor;
    } else {
        // handle string case
        return "s";
    }
}


function attr2(nameOrMap, value) {
    if (nameOrMap && typeof nameOrMap === "object") {
        // handle map case
        return "t";
    } else {
        // handle string case
        return "s";
    }
}

function foo() {
    return "a";
}
;
