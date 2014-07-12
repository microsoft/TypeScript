//// [genericRestArgs.js]
function makeArrayG() {
    var items = [];
    for (var _i = 0; _i < (arguments.length - 0); _i++) {
        items[_i] = arguments[_i + 0];
    }
    return items;
}
var a1Ga = makeArrayG(1, "");
var a1Gb = makeArrayG(1, "");
var a1Gc = makeArrayG(1, "");
var a1Gd = makeArrayG(1, "");

function makeArrayGOpt(item1, item2, item3) {
    return [item1, item2, item3];
}
var a2Ga = makeArrayGOpt(1, "");
var a2Gb = makeArrayG(1, "");
var a2Gc = makeArrayG(1, ""); // error
