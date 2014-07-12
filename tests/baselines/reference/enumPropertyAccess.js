//// [enumPropertyAccess.js]
var Colors;
(function (Colors) {
    Colors[Colors["Red"] = 0] = "Red";
    Colors[Colors["Green"] = 1] = "Green";
})(Colors || (Colors = {}));

var x = 0 /* Red */;
var p = x.Green;
x.toFixed(); // ok

// Now with generics
function fill(f) {
    f.Green; // error
    f.toFixed(); // ok
}
