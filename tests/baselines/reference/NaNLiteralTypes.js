//// [NaNLiteralTypes.ts]
interface NaNMember {
    member: NaN
}

let x: NaNMember;
x = {member: NaN}

declare function stillNumber(x: number): boolean;
stillNumber(x.member);

/*function isNaN(x: number): x is NaN {
    return x !== x;
}

let y: number;
if (isNaN(y)) {
    let a: NaN = y;
}
else {
    let b: number = y;
}
*/

//// [NaNLiteralTypes.js]
var x;
x = { member: NaN };
stillNumber(x.member);
/*function isNaN(x: number): x is NaN {
    return x !== x;
}

let y: number;
if (isNaN(y)) {
    let a: NaN = y;
}
else {
    let b: number = y;
}
*/ 
