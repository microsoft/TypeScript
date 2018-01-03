//// [computedPropertyUnionLiftsToUnionType.ts]
declare var ab: 'a' | 'b';
declare var cd: 'c' | 'd';
// More cases:
//   add spreads
//   other literal types: number, boolean, enum (string and number)
//   multiple unions
//   union, spread (with union inside), union
//   methods and other stuff that would get mangled by spread (since I use spread internally)
const x: { a: string } | { b: string } = { [ab]: 'hi' }
const y: { a: string, c: string } | { a: string, d: string } | { b: string, c: string } | { b: string, d: string } =
    { [ab]: 'hi', [cd]: 'there' }

//   in destructuring???!!
/*
declare let o: { [t]: string }
declare let u: { a: string } | { b: string }
const { [t]: doo } = o
const { [t]: duo } = u
var t: 'a' | 'b' = doo
var t: 'a' | 'b' = duo
*/




//// [computedPropertyUnionLiftsToUnionType.js]
// More cases:
//   add spreads
//   other literal types: number, boolean, enum (string and number)
//   multiple unions
//   union, spread (with union inside), union
//   methods and other stuff that would get mangled by spread (since I use spread internally)
var x = (_a = {}, _a[ab] = 'hi', _a);
var y = (_b = {}, _b[ab] = 'hi', _b[cd] = 'there', _b);
var _a, _b;
//   in destructuring???!!
/*
declare let o: { [t]: string }
declare let u: { a: string } | { b: string }
const { [t]: doo } = o
const { [t]: duo } = u
var t: 'a' | 'b' = doo
var t: 'a' | 'b' = duo
*/
