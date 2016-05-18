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

const zero: 0 = 0;
let one: 1 = 1;
const two: 2 = 2;
const three: 3 = 3;
const four: 4 = 4;
const ten: 10 = 10;
const twenty: 20 = 20;
one = one * one;
one = one ** zero;
one = one / one;
one = one % twenty;
one = one + zero;
one = one - zero;
one = one & one;
one = one ^ zero;
one = one | one;
one = (((two ** two) - four) + (ten * two)) % three / two;

/*type True = 1;
type False = 0;

function isTrue(x: True | False): x is True {
    return !!x;
}

let x: True | False;

if (isTrue(x)) {
    let y: True = x;
}
else {
    let z: False = x;
}
*/