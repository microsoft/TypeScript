//// [methodSignaturesWithOverloads2.ts]
// Object type literals permit overloads with optionality but they must match

var c: {
    func4?(x: number): number;
    func4?(s: string): string;
    func5?: {
        (x: number): number;
        (s: string): string;
    };
};

// no errors
c.func4 = c.func5;
c.func5 = c.func4;


var c2: {
    func4?<T>(x: T): number;
    func4? <T>(s: T): string;
    func5?: {
        <T>(x: T): number;
        <T>(s: T): string;
    };
};

// no errors
c2.func4 = c2.func5;
c2.func5 = c2.func4;

//// [methodSignaturesWithOverloads2.js]
// Object type literals permit overloads with optionality but they must match
var c;
// no errors
c.func4 = c.func5;
c.func5 = c.func4;
var c2;
// no errors
c2.func4 = c2.func5;
c2.func5 = c2.func4;
