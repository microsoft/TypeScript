//// [NaNLiteralTypes.ts]
interface NaNMember {
    member: NaN
}

let x: NaNMember;
x = {member: NaN as NaN}

declare function stillNumber(x: number): boolean;
stillNumber(x.member);

//Check that NaN's declaration is still of type "number", while being "NaN" when used as a type, so its usage is opt-in
let y = NaN;
y = 42;

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
//Check that NaN's declaration is still of type "number", while being "NaN" when used as a type, so its usage is opt-in
var y = NaN;
y = 42;
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
