//// [tests/cases/conformance/expressions/typeGuards/typeGuardIntersectionTypes.ts] ////

//// [typeGuardIntersectionTypes.ts]
interface X {
    x: string;
}

interface Y {
    y: string;
}

interface Z {
    z: string;
}

declare function isX(obj: any): obj is X;
declare function isY(obj: any): obj is Y;
declare function isZ(obj: any): obj is Z;

function f1(obj: Object) {
    if (isX(obj) || isY(obj) || isZ(obj)) {
        obj;
    }
    if (isX(obj) && isY(obj) && isZ(obj)) {
        obj;
    }
}

// Repro from #8911

// two interfaces
interface A {
  a: string;
}

interface B {
  b: string;
}

// a type guard for B
function isB(toTest: any): toTest is B {
  return toTest && toTest.b;
}

// a function that turns an A into an A & B
function union(a: A): A & B | null {
  if (isB(a)) {
    return a;
  } else {
    return null;
  }
}

// Repro from #9016

declare function log(s: string): void;

// Supported beast features
interface Beast     { wings?: boolean; legs?: number }
interface Legged    { legs: number; }
interface Winged    { wings: boolean; }

// Beast feature detection via user-defined type guards
function hasLegs(x: Beast): x is Legged { return x && typeof x.legs === 'number'; }
function hasWings(x: Beast): x is Winged { return x && !!x.wings; }

// Function to identify a given beast by detecting its features
function identifyBeast(beast: Beast) {

    // All beasts with legs
    if (hasLegs(beast)) {

        // All winged beasts with legs
        if (hasWings(beast)) {
            if (beast.legs === 4) {
                log(`pegasus - 4 legs, wings`);
            }
            else if (beast.legs === 2) {
                log(`bird - 2 legs, wings`);
            }
            else {
                log(`unknown - ${beast.legs} legs, wings`);
            }
        }

        // All non-winged beasts with legs
        else {
            log(`manbearpig - ${beast.legs} legs, no wings`);
        }
    }

    // All beasts without legs    
    else {
        if (hasWings(beast)) {
            log(`quetzalcoatl - no legs, wings`)
        }
        else {
            log(`snake - no legs, no wings`)
        }
    }
}

function beastFoo(beast: Object) {
    if (hasWings(beast) && hasLegs(beast)) {
        beast;  // Winged & Legged
    }
    else {
        beast;
    }

    if (hasLegs(beast) && hasWings(beast)) {
        beast;  // Legged & Winged
    }
}

// https://github.com/microsoft/TypeScript/issues/58518

interface A_58518 {
  label?: string;
  a?: string;
}

interface B_58518 {
  label?: string;
  b: boolean;
}

function isB_58518(thing: object): thing is B_58518 {
  return "b" in thing;
}

function test_58518(thing: A_58518) {
  thing.a;
  if (isB_58518(thing)) {
    thing.a;
  }
}


//// [typeGuardIntersectionTypes.js]
function f1(obj) {
    if (isX(obj) || isY(obj) || isZ(obj)) {
        obj;
    }
    if (isX(obj) && isY(obj) && isZ(obj)) {
        obj;
    }
}
// a type guard for B
function isB(toTest) {
    return toTest && toTest.b;
}
// a function that turns an A into an A & B
function union(a) {
    if (isB(a)) {
        return a;
    }
    else {
        return null;
    }
}
// Beast feature detection via user-defined type guards
function hasLegs(x) { return x && typeof x.legs === 'number'; }
function hasWings(x) { return x && !!x.wings; }
// Function to identify a given beast by detecting its features
function identifyBeast(beast) {
    // All beasts with legs
    if (hasLegs(beast)) {
        // All winged beasts with legs
        if (hasWings(beast)) {
            if (beast.legs === 4) {
                log("pegasus - 4 legs, wings");
            }
            else if (beast.legs === 2) {
                log("bird - 2 legs, wings");
            }
            else {
                log("unknown - ".concat(beast.legs, " legs, wings"));
            }
        }
        // All non-winged beasts with legs
        else {
            log("manbearpig - ".concat(beast.legs, " legs, no wings"));
        }
    }
    // All beasts without legs    
    else {
        if (hasWings(beast)) {
            log("quetzalcoatl - no legs, wings");
        }
        else {
            log("snake - no legs, no wings");
        }
    }
}
function beastFoo(beast) {
    if (hasWings(beast) && hasLegs(beast)) {
        beast; // Winged & Legged
    }
    else {
        beast;
    }
    if (hasLegs(beast) && hasWings(beast)) {
        beast; // Legged & Winged
    }
}
function isB_58518(thing) {
    return "b" in thing;
}
function test_58518(thing) {
    thing.a;
    if (isB_58518(thing)) {
        thing.a;
    }
}
