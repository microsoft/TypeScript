interface NumericMember {
    member: 255;
}

interface HexMember {
    member: 0xFF;
}

interface OctalMember {
    member: 0o377;
}

interface NumberMember {
    member: number;
}

var a: NumericMember;
var b: HexMember;
var c: OctalMember;
var d: NumberMember;

a = b = c = {member: 2.55e2};

d = a;
d = b;
d = c;

interface NegativeNumericMember {
    member: -255;
}

interface NegativeHexMember {
    member: -0xFF;
}

interface NegativeOctalMember {
    member: -0o377;
}

var na: NegativeNumericMember;
var nb: NegativeHexMember;
var nc: NegativeOctalMember;

na = nb = nc = {member: -2.55e2};

d = na;
d = nb;
d = nc;

// All asignments should fail after this point
na = a;

a = na;

nb = b;

b = nb;

nc = c;

c = nc;

/*type True = 1;
type False = 0;

function isTrue(x: True | False): x is True {
    return !!x;
}

let x: True | False;

if (isTrue(x)) {
    let y: False = x;
}
else {
    let z: True = x;
}
*/