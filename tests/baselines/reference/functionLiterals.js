//// [tests/cases/conformance/types/objectTypeLiteral/methodSignatures/functionLiterals.ts] ////

//// [functionLiterals.ts]
// PropName<TypeParamList>(ParamList):ReturnType is equivalent to PropName: { <TypeParamList>(ParamList): ReturnType }

var b: {
    func1(x: number): number;         // Method signature
    func2: (x: number) => number;     // Function type literal
    func3: { (x: number): number };   // Object type literal
}

// no errors
b.func1 = b.func2;
b.func1 = b.func3;
b.func2 = b.func1;
b.func2 = b.func3;
b.func3 = b.func1;
b.func3 = b.func2;

var c: {
    func4(x: number): number;
    func4(s: string): string;
    func5: {
        (x: number): number;
        (s: string): string;
    };
};

// no errors
c.func4 = c.func5;
c.func5 = c.func4;

// generic versions
var b2: {
    func1<T>(x: T): number;         // Method signature
    func2: <T>(x: T) => number;     // Function type literal
    func3: { <T>(x: T): number };   // Object type literal
}

// no errors
b2.func1 = b2.func2;
b2.func1 = b2.func3;
b2.func2 = b2.func1;
b2.func2 = b2.func3;
b2.func3 = b2.func1;
b2.func3 = b2.func2;

var c2: {
    func4<T>(x: T): number;
    func4<T>(s: T): string;
    func5: {
        <T>(x: T): number;
        <T>(s: T): string;
    };
};

// no errors
c2.func4 = c2.func5;
c2.func5 = c2.func4;


//// [functionLiterals.js]
// PropName<TypeParamList>(ParamList):ReturnType is equivalent to PropName: { <TypeParamList>(ParamList): ReturnType }
var b;
// no errors
b.func1 = b.func2;
b.func1 = b.func3;
b.func2 = b.func1;
b.func2 = b.func3;
b.func3 = b.func1;
b.func3 = b.func2;
var c;
// no errors
c.func4 = c.func5;
c.func5 = c.func4;
// generic versions
var b2;
// no errors
b2.func1 = b2.func2;
b2.func1 = b2.func3;
b2.func2 = b2.func1;
b2.func2 = b2.func3;
b2.func3 = b2.func1;
b2.func3 = b2.func2;
var c2;
// no errors
c2.func4 = c2.func5;
c2.func5 = c2.func4;
