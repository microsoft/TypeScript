declare var ab: 'a' | 'b';
declare var cd: 'c' | 'd';
// More cases:
//   add spreads
//   other literal types: number, boolean, enum (string and number)
//   multiple unions
//   union, spread (with union inside), union
//   methods and other stuff that would get mangled by spread (since I use spread internally)
const x: { a: string } | { b: string } = { [ab]: 'hi' }
const y: { a: string, m: number, c: string }
    | { a: string, m: number, d: string }
    | { b: string, m: number, c: string }
    | { b: string, m: number, d: string } = { [ab]: 'hi', m: 1, [cd]: 'there' }

//   in destructuring???!!
/*
declare let o: { [t]: string }
declare let u: { a: string } | { b: string }
const { [t]: doo } = o
const { [t]: duo } = u
var t: 'a' | 'b' = doo
var t: 'a' | 'b' = duo
*/


