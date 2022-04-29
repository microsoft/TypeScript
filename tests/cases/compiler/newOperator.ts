interface ifc { }
// Attempting to 'new' an interface yields poor error
var i = new ifc();

// Parens are optional
var x = new Date;
var y = new Date();

// Target is not a class or var, good error
var t1 = new 53();
var t2 = new ''();
new string;

// Use in LHS of expression?
(new Date()).toString();

// Various spacing
var t3 = new string[]( );
var t4 =
new
string
[
    ]
    (
        );

// Unresolved symbol
var f = new q();

// not legal
var t5 = new new Date;

// Can be an expression
new String;

// Error on union
declare const union: { a: string } | { b: string }
new union;

// Error on union with one constructor
declare const ctorUnion: { a: string } | (new (a: string) => void)
new ctorUnion("");

// Error on union with incompatible constructors
declare const ctorUnion2: (new <T extends number>(a: T) => void) | (new <T>(a: string) => void)
new ctorUnion2("");

module M {
    export class T {
        x: number;
    }
}

class S {
    public get xs(): M.T[] {
        return new M.T[];
    }
}
