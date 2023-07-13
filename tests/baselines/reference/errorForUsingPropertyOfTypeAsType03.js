//// [tests/cases/compiler/errorForUsingPropertyOfTypeAsType03.ts] ////

//// [errorForUsingPropertyOfTypeAsType03.ts]
namespace Test1 {
    enum Color {
        Red,
        Green,
        Blue
    }

    type C1 = Color;
    type C2 = typeof Color;

    let a1: Color.Red.toString;
    let a2: Color.Red["toString"];
    let a3: Color["Red"]["toString"];

    //let b1: (typeof Color).Red.toString;
    //let b2: (typeof Color).Red["toString"];
    let b3: (typeof Color)["Red"]["toString"];

    let c1: C1.Red.toString;
    let c2: C1.Red["toString"];
    let c3: C1["Red"]["toString"];

    let d1: C2.Red.toString;
    let d2: C2.Red["toString"];
    let d3: C2["Red"]["toString"];
}

//// [errorForUsingPropertyOfTypeAsType03.js]
var Test1;
(function (Test1) {
    var Color;
    (function (Color) {
        Color[Color["Red"] = 0] = "Red";
        Color[Color["Green"] = 1] = "Green";
        Color[Color["Blue"] = 2] = "Blue";
    })(Color || (Color = {}));
    var a1;
    var a2;
    var a3;
    //let b1: (typeof Color).Red.toString;
    //let b2: (typeof Color).Red["toString"];
    var b3;
    var c1;
    var c2;
    var c3;
    var d1;
    var d2;
    var d3;
})(Test1 || (Test1 = {}));
