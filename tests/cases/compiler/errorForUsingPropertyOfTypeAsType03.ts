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