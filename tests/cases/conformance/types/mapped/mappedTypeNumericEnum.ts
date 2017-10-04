// @strict: true
// with numbers
enum Nums {
    A,
    B
}
enum Nums2 {
    Aleph,
    Bet,
    Gimel
}
type NumBool = { [K in Nums]: boolean }
let nb: NumBool = { '0': true, '1': false }
let wronb: NumBool = { '0': true, '2': false }
let wronb2: NumBool = { '0': true }
nb[Nums.A] = false;
nb[Nums2.Bet] = true;
nb[Nums2.Gimel] = false; // only disallowed with --strict

// with strings
enum Strs {
    A = 'a',
    B = 'b'
}
type StrAny = { [K in Strs]: any }
let sa: StrAny = { a: 1, b: 2 }
sa[Strs.A] = 'a'
sa['nope'] = 'not allowed'

// union of numbers
type Ns = 0 | 1;
type NumNum = { [K in Ns]: number }
let nn: NumNum = { [Nums.A]: 3, [Nums.B]: 4 }
let omnomnom: NumNum = { '0': 12, [Nums.B]: 13, [Nums2.Gimel]: 14 }
nn[0] = 5
nn['1'] = 6

// single number
type N = 0;
type OneNumNum = { [K in N]: number }
let onn: OneNumNum = { [Nums.A]: 7 }
let wronng: OneNumNum = { [Nums.A]: 7, [Nums.B]: 11 }
onn[0] = 8
onn['0'] = 9
onn[1] = 10 // only disallowed with --strict

// just number
type NumberNum = { [K in number]: number }
let numn: NumberNum = { }
numn[0] = 31
numn['1'] = 32
numn['oops'] = 33

// computed enum gets a string indexer
enum Comp {
    A,
    B = 1 << 3
}

type CompNum = { [K in Comp]: number }
let cn: CompNum = { [Comp.A]: 15 }
let cnn: CompNum = { [Comp.A]: 16, '101': 17 }
cn[1001] = 18
cn['maybe?'] = 19

// manual string/number union mixes
type Mix = 0 | 1 | 'a' | 'i' | 'u';
type MixNum = { [K in Mix]: number }
let mn: MixNum = { [0]: 20, '1': 21, a: 22, i: 23, u: 24 }
let mnn: MixNum = { [0]: 29, [1]: 30 }

// conflicts result in the property being thrown out
type MixConflict = 0 | 1 | 1 | 1 | 1 | 1 | 2 | '0' | '1';
type MixConflictNum = { [K in MixConflict]: number }
let mcn: MixConflictNum = { [2]: 25 }
let mcnn: MixConflictNum = { [0]: 26, [1]: 27, [2]: 28 }
