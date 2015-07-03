const enum E {
    A
}

module E {
    var x = 1;
}

const enum E1 {
    // illegal case
    // forward reference to the element of the same enum
    X = Y, // error
    // forward reference to the element of the same enum
    Y = E1.Z, // error
    Y1 = E1["Z"] // error
}

const enum E2 {
    A
}

var y0 = E2[1]
var name = "A";
var y1 = E2[name]; // error

var x = E2; // error
var y = [E2]; // error
var enumType: typeof E2;
var enumMember: typeof E2.A;

function foo(t: any): void {
}

foo(E2); // error

const enum NaNOrInfinity {
    A = 9007199254740992,
    B = A * A,
    C = B * B,
    D = C * C,
    E = D * D,
    F = E * E, // error: overflow
    G = 1 / 0, // error: overflow
    H = 0 / 0  // error: NaN
}