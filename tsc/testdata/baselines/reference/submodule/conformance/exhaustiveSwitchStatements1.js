//// [tests/cases/conformance/controlFlow/exhaustiveSwitchStatements1.ts] ////

//// [exhaustiveSwitchStatements1.ts]
function f1(x: 1 | 2): string {
    if (!!true) {
        switch (x) {
            case 1: return 'a';
            case 2: return 'b';
        }
        x;  // Unreachable
    }
    else {
        throw 0;
    }
}

function f2(x: 1 | 2) {
    let z: number;
    switch (x) {
        case 1: z = 10; break;
        case 2: z = 20; break;
    }
    z;  // Definitely assigned
}

function f3(x: 1 | 2) {
    switch (x) {
        case 1: return 10;
        case 2: return 20;
        // Default considered reachable to allow defensive coding
        default: throw new Error("Bad input");
    }
}

// Repro from #11572

enum E { A, B }

function f(e: E): number {
    switch (e) {
        case E.A: return 0
        case E.B: return 1
    }
}

function g(e: E): number {
    if (!true)
        return -1
    else
        switch (e) {
            case E.A: return 0
            case E.B: return 1
        }
}

// Repro from #12668

interface Square { kind: "square"; size: number; }

interface Rectangle { kind: "rectangle"; width: number; height: number; }

interface Circle { kind: "circle"; radius: number; }

interface Triangle { kind: "triangle"; side: number; }

type Shape = Square | Rectangle | Circle | Triangle;

function area(s: Shape): number {
    let area;
    switch (s.kind) {
        case "square": area = s.size * s.size; break;
        case "rectangle": area = s.width * s.height; break;
        case "circle": area = Math.PI * s.radius * s.radius; break;
        case "triangle": area = Math.sqrt(3) / 4 * s.side * s.side; break;
    }
    return area;
}

function areaWrapped(s: Shape): number {
    let area;
    area = (() => {
        switch (s.kind) {
            case "square": return s.size * s.size;
            case "rectangle": return s.width * s.height;
            case "circle": return Math.PI * s.radius * s.radius;
            case "triangle": return Math.sqrt(3) / 4 * s.side * s.side;
        }
    })();
    return area;
}

// Repro from #13241

enum MyEnum {
	A,
	B
}

function thisGivesError(e: MyEnum): string {
	let s: string;
	switch (e) {
		case MyEnum.A: s = "it was A"; break;
		case MyEnum.B: s = "it was B"; break;
	}
	return s;
}

function good1(e: MyEnum): string {
	let s: string;
	switch (e) {
		case MyEnum.A: s = "it was A"; break;
		case MyEnum.B: s = "it was B"; break;
		default: s = "it was something else"; break;
	}
	return s;
}

function good2(e: MyEnum): string {
	switch (e) {
		case MyEnum.A: return "it was A";
		case MyEnum.B: return "it was B";
	}
}

// Repro from #18362

enum Level {
  One,
  Two,
}

const doSomethingWithLevel = (level: Level) => {
  let next: Level;
  switch (level) {
    case Level.One:
      next = Level.Two;
      break;
    case Level.Two:
      next = Level.One;
      break;
  }
  return next;
};

// Repro from #20409

interface Square2 {
    kind: "square";
    size: number;
}

interface Circle2 {
    kind: "circle";
    radius: number;
}

type Shape2 = Square2 | Circle2;

function withDefault(s1: Shape2, s2: Shape2): string {
    switch (s1.kind) {
        case "square":
            return "1";
        case "circle":
            switch (s2.kind) {
                case "square":
                    return "2";
                case "circle":
                    return "3";
                default:
                    return "never";
            }
    }
}

function withoutDefault(s1: Shape2, s2: Shape2): string {
    switch (s1.kind) {
        case "square":
            return "1";
        case "circle":
            switch (s2.kind) {
                case "square":
                    return "2";
                case "circle":
                    return "3";
            }
    }
}

// Repro from #20823

function test4(value: 1 | 2) {
    let x: string;
    switch (value) {
        case 1: x = "one"; break;
        case 2: x = "two"; break;
    }
    return x;
}

// Repro from #34661

enum Animal { DOG, CAT }

declare const zoo: { animal: Animal } | undefined;

function expression(): Animal {
    switch (zoo?.animal ?? Animal.DOG) {
        case Animal.DOG: return Animal.DOG
        case Animal.CAT: return Animal.CAT
    }
}

// Repro from #34840

function foo() {
    const foo: number | undefined = 0;
    while (true) {
        const stats = foo;
        switch (stats) {
            case 1: break;
            case 2: break;
        }
    }
}

// Repro from #35070

type O = {
    a: number,
    b: number
};
type K = keyof O | 'c';
function ff(o: O, k: K) {
    switch(k) {
        case 'c':
            k = 'a';
    }
    k === 'c';  // Error
    return o[k];
}

// Repro from #35431
type A = { kind: "abc" } | { kind: "def" };

function f35431(a: A) {
  switch (a.kind) {
    case "abc":
    case "def": return;
    default:
      a!.kind; // Error expected
  }
}

//// [exhaustiveSwitchStatements1.js]
function f1(x) {
    if (!!true) {
        switch (x) {
            case 1: return 'a';
            case 2: return 'b';
        }
        x;
    }
    else {
        throw 0;
    }
}
function f2(x) {
    let z;
    switch (x) {
        case 1:
            z = 10;
            break;
        case 2:
            z = 20;
            break;
    }
    z;
}
function f3(x) {
    switch (x) {
        case 1: return 10;
        case 2: return 20;
        default: throw new Error("Bad input");
    }
}
var E;
(function (E) {
    E[E["A"] = 0] = "A";
    E[E["B"] = 1] = "B";
})(E || (E = {}));
function f(e) {
    switch (e) {
        case E.A: return 0;
        case E.B: return 1;
    }
}
function g(e) {
    if (!true)
        return -1;
    else
        switch (e) {
            case E.A: return 0;
            case E.B: return 1;
        }
}
function area(s) {
    let area;
    switch (s.kind) {
        case "square":
            area = s.size * s.size;
            break;
        case "rectangle":
            area = s.width * s.height;
            break;
        case "circle":
            area = Math.PI * s.radius * s.radius;
            break;
        case "triangle":
            area = Math.sqrt(3) / 4 * s.side * s.side;
            break;
    }
    return area;
}
function areaWrapped(s) {
    let area;
    area = (() => {
        switch (s.kind) {
            case "square": return s.size * s.size;
            case "rectangle": return s.width * s.height;
            case "circle": return Math.PI * s.radius * s.radius;
            case "triangle": return Math.sqrt(3) / 4 * s.side * s.side;
        }
    })();
    return area;
}
var MyEnum;
(function (MyEnum) {
    MyEnum[MyEnum["A"] = 0] = "A";
    MyEnum[MyEnum["B"] = 1] = "B";
})(MyEnum || (MyEnum = {}));
function thisGivesError(e) {
    let s;
    switch (e) {
        case MyEnum.A:
            s = "it was A";
            break;
        case MyEnum.B:
            s = "it was B";
            break;
    }
    return s;
}
function good1(e) {
    let s;
    switch (e) {
        case MyEnum.A:
            s = "it was A";
            break;
        case MyEnum.B:
            s = "it was B";
            break;
        default:
            s = "it was something else";
            break;
    }
    return s;
}
function good2(e) {
    switch (e) {
        case MyEnum.A: return "it was A";
        case MyEnum.B: return "it was B";
    }
}
var Level;
(function (Level) {
    Level[Level["One"] = 0] = "One";
    Level[Level["Two"] = 1] = "Two";
})(Level || (Level = {}));
const doSomethingWithLevel = (level) => {
    let next;
    switch (level) {
        case Level.One:
            next = Level.Two;
            break;
        case Level.Two:
            next = Level.One;
            break;
    }
    return next;
};
function withDefault(s1, s2) {
    switch (s1.kind) {
        case "square":
            return "1";
        case "circle":
            switch (s2.kind) {
                case "square":
                    return "2";
                case "circle":
                    return "3";
                default:
                    return "never";
            }
    }
}
function withoutDefault(s1, s2) {
    switch (s1.kind) {
        case "square":
            return "1";
        case "circle":
            switch (s2.kind) {
                case "square":
                    return "2";
                case "circle":
                    return "3";
            }
    }
}
function test4(value) {
    let x;
    switch (value) {
        case 1:
            x = "one";
            break;
        case 2:
            x = "two";
            break;
    }
    return x;
}
var Animal;
(function (Animal) {
    Animal[Animal["DOG"] = 0] = "DOG";
    Animal[Animal["CAT"] = 1] = "CAT";
})(Animal || (Animal = {}));
function expression() {
    switch (zoo?.animal ?? Animal.DOG) {
        case Animal.DOG: return Animal.DOG;
        case Animal.CAT: return Animal.CAT;
    }
}
function foo() {
    const foo = 0;
    while (true) {
        const stats = foo;
        switch (stats) {
            case 1: break;
            case 2: break;
        }
    }
}
function ff(o, k) {
    switch (k) {
        case 'c':
            k = 'a';
    }
    k === 'c';
    return o[k];
}
function f35431(a) {
    switch (a.kind) {
        case "abc":
        case "def": return;
        default:
            a.kind;
    }
}
