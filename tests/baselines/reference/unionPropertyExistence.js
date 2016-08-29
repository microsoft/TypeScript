//// [unionPropertyExistence.ts]
interface A {
    inAll: string;
    notInB: string;
    notInC: string;
}

interface B {
    inAll: boolean;
    onlyInB: number;
    notInC: string;
}

interface C {
    inAll: number;
    notInB: string;
}

type AB = A | B;
type ABC = C | AB;

var ab: AB;
var abc: ABC;

ab.onlyInB;

ab.notInC; // Ok
abc.notInC;
ab.notInB;
abc.notInB;

abc.inAll; // Ok
abc.inNone;

//// [unionPropertyExistence.js]
var ab;
var abc;
ab.onlyInB;
ab.notInC; // Ok
abc.notInC;
ab.notInB;
abc.notInB;
abc.inAll; // Ok
abc.inNone;
