//// [InfinityLiteralTypes.ts]
interface PositiveInfinityMember {
    member: Infinity
}

interface NegativeInfinityMember {
    member: -Infinity
}

function invertInfinity(x: -Infinity): Infinity;
function invertInfinity(x: Infinity): -Infinity;
function invertInfinity(x: number): number {
    return -x;
}

let a: PositiveInfinityMember;
let b: NegativeInfinityMember;

a = {member: Infinity as Infinity};
b = {member: -(<Infinity>Infinity)}

let c: -Infinity = invertInfinity(a.member);
let d: Infinity = invertInfinity(b.member);

let x = c + d;
declare function stillNumber(x: number): boolean;
stillNumber(c);
stillNumber(d);

//Check that Infinity's declaration is still of type "number", while being "Infinity" when used as a type, so its usage is opt-in
let y = Infinity;
y = 42;
let z = -Infinity;
z = 42;

/*declare function isInfinity(x: number): x is (Infinity | -Infinity) {
    return x !== x;
}

let y: number;
if (isInfinity(y)) {
    let a: (Infinity | -Infinity) = y;
}
else {
    let b: number = y;
}*/

//// [InfinityLiteralTypes.js]
function invertInfinity(x) {
    return -x;
}
var a;
var b;
a = { member: Infinity };
b = { member: -Infinity };
var c = invertInfinity(a.member);
var d = invertInfinity(b.member);
var x = c + d;
stillNumber(c);
stillNumber(d);
//Check that Infinity's declaration is still of type "number", while being "Infinity" when used as a type, so its usage is opt-in
var y = Infinity;
y = 42;
var z = -Infinity;
z = 42;
/*declare function isInfinity(x: number): x is (Infinity | -Infinity) {
    return x !== x;
}

let y: number;
if (isInfinity(y)) {
    let a: (Infinity | -Infinity) = y;
}
else {
    let b: number = y;
}*/ 
