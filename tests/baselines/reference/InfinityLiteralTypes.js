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

a = {member: Infinity};
b = {member: -Infinity}

let c: -Infinity = invertInfinity(a.member);
let d: Infinity = invertInfinity(b.member);

let x = c + d;
declare function stillNumber(x: number): boolean;
stillNumber(c);
stillNumber(d);

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
