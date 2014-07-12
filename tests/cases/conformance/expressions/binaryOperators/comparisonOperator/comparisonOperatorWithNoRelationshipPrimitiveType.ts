enum E { a, b, c }

var a: number;
var b: boolean;
var c: string;
var d: void;
var e: E;

// operator <
var r1a1 = a < b;
var r1a1 = a < c;
var r1a1 = a < d;
var r1a1 = a < e; // no error, expected

var r1b1 = b < a;
var r1b1 = b < c;
var r1b1 = b < d;
var r1b1 = b < e;

var r1c1 = c < a;
var r1c1 = c < b;
var r1c1 = c < d;
var r1c1 = c < e;

var r1d1 = d < a;
var r1d1 = d < b;
var r1d1 = d < c;
var r1d1 = d < e;

var r1e1 = e < a; // no error, expected
var r1e1 = e < b;
var r1e1 = e < c;
var r1e1 = e < d;

// operator >
var r2a1 = a > b;
var r2a1 = a > c;
var r2a1 = a > d;
var r2a1 = a > e; // no error, expected

var r2b1 = b > a;
var r2b1 = b > c;
var r2b1 = b > d;
var r2b1 = b > e;

var r2c1 = c > a;
var r2c1 = c > b;
var r2c1 = c > d;
var r2c1 = c > e;

var r2d1 = d > a;
var r2d1 = d > b;
var r2d1 = d > c;
var r2d1 = d > e;

var r2e1 = e > a; // no error, expected
var r2e1 = e > b;
var r2e1 = e > c;
var r2e1 = e > d;

// operator <=
var r3a1 = a <= b;
var r3a1 = a <= c;
var r3a1 = a <= d;
var r3a1 = a <= e; // no error, expected

var r3b1 = b <= a;
var r3b1 = b <= c;
var r3b1 = b <= d;
var r3b1 = b <= e;

var r3c1 = c <= a;
var r3c1 = c <= b;
var r3c1 = c <= d;
var r3c1 = c <= e;

var r3d1 = d <= a;
var r3d1 = d <= b;
var r3d1 = d <= c;
var r3d1 = d <= e;

var r3e1 = e <= a; // no error, expected
var r3e1 = e <= b;
var r3e1 = e <= c;
var r3e1 = e <= d;

// operator >=
var r4a1 = a >= b;
var r4a1 = a >= c;
var r4a1 = a >= d;
var r4a1 = a >= e; // no error, expected

var r4b1 = b >= a;
var r4b1 = b >= c;
var r4b1 = b >= d;
var r4b1 = b >= e;

var r4c1 = c >= a;
var r4c1 = c >= b;
var r4c1 = c >= d;
var r4c1 = c >= e;

var r4d1 = d >= a;
var r4d1 = d >= b;
var r4d1 = d >= c;
var r4d1 = d >= e;

var r4e1 = e >= a; // no error, expected
var r4e1 = e >= b;
var r4e1 = e >= c;
var r4e1 = e >= d;

// operator ==
var r5a1 = a == b;
var r5a1 = a == c;
var r5a1 = a == d;
var r5a1 = a == e; // no error, expected

var r5b1 = b == a;
var r5b1 = b == c;
var r5b1 = b == d;
var r5b1 = b == e;

var r5c1 = c == a;
var r5c1 = c == b;
var r5c1 = c == d;
var r5c1 = c == e;

var r5d1 = d == a;
var r5d1 = d == b;
var r5d1 = d == c;
var r5d1 = d == e;

var r5e1 = e == a; // no error, expected
var r5e1 = e == b;
var r5e1 = e == c;
var r5e1 = e == d;

// operator !=
var r6a1 = a != b;
var r6a1 = a != c;
var r6a1 = a != d;
var r6a1 = a != e; // no error, expected

var r6b1 = b != a;
var r6b1 = b != c;
var r6b1 = b != d;
var r6b1 = b != e;

var r6c1 = c != a;
var r6c1 = c != b;
var r6c1 = c != d;
var r6c1 = c != e;

var r6d1 = d != a;
var r6d1 = d != b;
var r6d1 = d != c;
var r6d1 = d != e;

var r6e1 = e != a; // no error, expected
var r6e1 = e != b;
var r6e1 = e != c;
var r6e1 = e != d;

// operator ===
var r7a1 = a === b;
var r7a1 = a === c;
var r7a1 = a === d;
var r7a1 = a === e; // no error, expected

var r7b1 = b === a;
var r7b1 = b === c;
var r7b1 = b === d;
var r7b1 = b === e;

var r7c1 = c === a;
var r7c1 = c === b;
var r7c1 = c === d;
var r7c1 = c === e;

var r7d1 = d === a;
var r7d1 = d === b;
var r7d1 = d === c;
var r7d1 = d === e;

var r7e1 = e === a; // no error, expected
var r7e1 = e === b;
var r7e1 = e === c;
var r7e1 = e === d;

// operator !==
var r8a1 = a !== b;
var r8a1 = a !== c;
var r8a1 = a !== d;
var r8a1 = a !== e; // no error, expected

var r8b1 = b !== a;
var r8b1 = b !== c;
var r8b1 = b !== d;
var r8b1 = b !== e;

var r8c1 = c !== a;
var r8c1 = c !== b;
var r8c1 = c !== d;
var r8c1 = c !== e;

var r8d1 = d !== a;
var r8d1 = d !== b;
var r8d1 = d !== c;
var r8d1 = d !== e;

var r8e1 = e !== a; // no error, expected
var r8e1 = e !== b;
var r8e1 = e !== c;
var r8e1 = e !== d;