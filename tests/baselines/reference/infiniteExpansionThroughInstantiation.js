//// [infiniteExpansionThroughInstantiation.js]
// instantiating a derived type can cause an infinitely expanding type reference to be generated


var list;
var ownerList;
list = ownerList;

function other(x) {
    var list;
    var ownerList;
    list = ownerList;
}
