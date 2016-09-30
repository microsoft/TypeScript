//// [forwardRefInEnum.ts]
enum E1 {
    // illegal case
    // forward reference to the element of the same enum
    X = Y, 
    X1 = E1["Y"], 
    // forward reference to the element of the same enum
    Y = E1.Z,
    Y1 = E1["Z"]
}

enum E1 {
    Z = 4    
}


//// [forwardRefInEnum.js]
var E1;
(function (E1) {
    // illegal case
    // forward reference to the element of the same enum
    E1[E1["X"] = E1.Y] = "X";
    E1[E1["X1"] = E1["Y"]] = "X1";
    // forward reference to the element of the same enum
    E1[E1["Y"] = E1.Z] = "Y";
    E1[E1["Y1"] = E1["Z"]] = "Y1";
})(E1 || (E1 = {}));
(function (E1) {
    E1[E1["Z"] = 4] = "Z";
})(E1 || (E1 = {}));
