//// [negativeNumericLiteralTypes.ts]
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

na = {member: 42};

nb = {member: 42};

nc = {member: 42};

a = {member: 42};

b = {member: 42};

c = {member: 42};

na = {member: -42};

nb = {member: -42};

nc = {member: -42};

a = {member: -42};

b = {member: -42};

c = {member: -42};

const zero: 0 = 0;
const one: 1 = 1;
let two: 2 = 2;
const three: 3 = 3;
const four: 4 = 4;
const ten: 10 = 10;
const twenty: 20 = 20;
two = one * one;
two = one ** zero;
two = one / one;
two = one % twenty;
two = one + zero;
two = one - zero;
two = one & one;
two = one ^ zero;
two = one | one;
two = (((two ** two) - four) + (ten * two)) % three / two;


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

//// [negativeNumericLiteralTypes.js]
var a;
var b;
var c;
var d;
a = b = c = { member: 2.55e2 };
d = a;
d = b;
d = c;
var na;
var nb;
var nc;
na = nb = nc = { member: -2.55e2 };
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
na = { member: 42 };
nb = { member: 42 };
nc = { member: 42 };
a = { member: 42 };
b = { member: 42 };
c = { member: 42 };
na = { member: -42 };
nb = { member: -42 };
nc = { member: -42 };
a = { member: -42 };
b = { member: -42 };
c = { member: -42 };
var zero = 0;
var one = 1;
var two = 2;
var three = 3;
var four = 4;
var ten = 10;
var twenty = 20;
two = one * one;
two = Math.pow(one, zero);
two = one / one;
two = one % twenty;
two = one + zero;
two = one - zero;
two = one & one;
two = one ^ zero;
two = one | one;
two = (((Math.pow(two, two)) - four) + (ten * two)) % three / two;
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
