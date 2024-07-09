class A1 {
    public a: string;
    public b: number;
    public c: boolean;
    public d: any;
    public e: Object;
    public fn(a: string): string {
        return null;
    }
}
class B1 {
    public a: string;
    public b: number;
    public c: boolean;
    public d: any;
    public e: Object;
    public fn(b: string): string {
        return null;
    }
}

class Base {
    private a: string;
    private fn(b: string): string {
        return null;
    }
}
class A2 extends Base { }
class B2 extends Base { }

interface A3 { f(a: number): string; }
interface B3 { f(a: number): string; }

interface A4 { new (a: string): A1; }
interface B4 { new (a: string): B1; }

interface A5 { [x: number]: number; }
interface B5 { [x: number]: number; }

interface A6 { [x: string]: string; }
interface B6 { [x: string]: string; }

var a1: A1;
var a2: A2;
var a3: A3;
var a4: A4;
var a5: A5;
var a6: A6;

var b1: B1;
var b2: B2;
var b3: B3;
var b4: B4;
var b5: B5;
var b6: B6;

var base1: Base;
var base2: Base;

// operator <
var r1a1 = a1 < b1;
var r1a2 = base1 < base2;
var r1a3 = a2 < b2;
var r1a4 = a3 < b3;
var r1a5 = a4 < b4;
var r1a6 = a5 < b5;
var r1a7 = a6 < b6;

var r1b1 = b1 < a1;
var r1b2 = base2 < base1;
var r1b3 = b2 < a2;
var r1b4 = b3 < a3;
var r1b5 = b4 < a4;
var r1b6 = b5 < a5;
var r1b7 = b6 < a6;

// operator >
var r2a1 = a1 > b1;
var r2a2 = base1 > base2;
var r2a3 = a2 > b2;
var r2a4 = a3 > b3;
var r2a5 = a4 > b4;
var r2a6 = a5 > b5;
var r2a7 = a6 > b6;

var r2b1 = b1 > a1;
var r2b2 = base2 > base1;
var r2b3 = b2 > a2;
var r2b4 = b3 > a3;
var r2b5 = b4 > a4;
var r2b6 = b5 > a5;
var r2b7 = b6 > a6;

// operator <=
var r3a1 = a1 <= b1;
var r3a2 = base1 <= base2;
var r3a3 = a2 <= b2;
var r3a4 = a3 <= b3;
var r3a5 = a4 <= b4;
var r3a6 = a5 <= b5;
var r3a7 = a6 <= b6;

var r3b1 = b1 <= a1;
var r3b2 = base2 <= base1;
var r3b3 = b2 <= a2;
var r3b4 = b3 <= a3;
var r3b5 = b4 <= a4;
var r3b6 = b5 <= a5;
var r3b7 = b6 <= a6;

// operator >=
var r4a1 = a1 >= b1;
var r4a2 = base1 >= base2;
var r4a3 = a2 >= b2;
var r4a4 = a3 >= b3;
var r4a5 = a4 >= b4;
var r4a6 = a5 >= b5;
var r4a7 = a6 >= b6;

var r4b1 = b1 >= a1;
var r4b2 = base2 >= base1;
var r4b3 = b2 >= a2;
var r4b4 = b3 >= a3;
var r4b5 = b4 >= a4;
var r4b6 = b5 >= a5;
var r4b7 = b6 >= a6;

// operator ==
var r5a1 = a1 == b1;
var r5a2 = base1 == base2;
var r5a3 = a2 == b2;
var r5a4 = a3 == b3;
var r5a5 = a4 == b4;
var r5a6 = a5 == b5;
var r5a7 = a6 == b6;

var r5b1 = b1 == a1;
var r5b2 = base2 == base1;
var r5b3 = b2 == a2;
var r5b4 = b3 == a3;
var r5b5 = b4 == a4;
var r5b6 = b5 == a5;
var r5b7 = b6 == a6;

// operator !=
var r6a1 = a1 != b1;
var r6a2 = base1 != base2;
var r6a3 = a2 != b2;
var r6a4 = a3 != b3;
var r6a5 = a4 != b4;
var r6a6 = a5 != b5;
var r6a7 = a6 != b6;

var r6b1 = b1 != a1;
var r6b2 = base2 != base1;
var r6b3 = b2 != a2;
var r6b4 = b3 != a3;
var r6b5 = b4 != a4;
var r6b6 = b5 != a5;
var r6b7 = b6 != a6;

// operator ===
var r7a1 = a1 === b1;
var r7a2 = base1 === base2;
var r7a3 = a2 === b2;
var r7a4 = a3 === b3;
var r7a5 = a4 === b4;
var r7a6 = a5 === b5;
var r7a7 = a6 === b6;

var r7b1 = b1 === a1;
var r7b2 = base2 === base1;
var r7b3 = b2 === a2;
var r7b4 = b3 === a3;
var r7b5 = b4 === a4;
var r7b6 = b5 === a5;
var r7b7 = b6 === a6;

// operator !==
var r8a1 = a1 !== b1;
var r8a2 = base1 !== base2;
var r8a3 = a2 !== b2;
var r8a4 = a3 !== b3;
var r8a5 = a4 !== b4;
var r8a6 = a5 !== b5;
var r8a7 = a6 !== b6;

var r8b1 = b1 !== a1;
var r8b2 = base2 !== base1;
var r8b3 = b2 !== a2;
var r8b4 = b3 !== a3;
var r8b5 = b4 !== a4;
var r8b6 = b5 !== a5;
var r8b7 = b6 !== a6;