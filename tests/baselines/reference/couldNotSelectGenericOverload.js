//// [couldNotSelectGenericOverload.js]
function makeArray(items) {
    return items;
}
var b = [1, ""];
var b1G = makeArray(1, "");
var b2G = makeArray(b);

function makeArray2(items) {
    return items;
}
var b3G = makeArray2(1, "");
