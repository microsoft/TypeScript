class A {
    a: number;
}
class B extends A {
    b: number;
}
enum Compass {
    North, South, East, West
}

var numIndex: { [n: number]: string } = { 3: 'three', 'three': 'three' };
var strIndex: { [n: string]: Compass } = { 'N': Compass.North, 'E': Compass.East };
var bothIndex:
    {
        [n: string]: A;
        [m: number]: B;
    };

function noIndex() { }

var obj = {
    10: 'ten',
    x: 'hello',
    y: 32,
    z: { n: 'world', m: 15, o: () => false },
    'literal property': 100
};
var anyVar: any = {};
var stringOrNumber: string | number;
var someObject: { name: string };

// Assign to a property access
obj.y = 4;

// Property access on value of type 'any'
anyVar.x = anyVar.y = obj.x = anyVar.z;

// Dotted property access of property that exists
var aa = obj.x;

// Dotted property access of property that exists on value's apparent type
var bb = obj.hasOwnProperty;

// Dotted property access of property that doesn't exist on value's apparent type
var cc = obj.qqq; // error

// Bracket notation property access using string literal value on type with property of that literal name
var dd = obj['literal property'];
var dd: number;

// Bracket notation property access using string literal value on type without property of that literal name
var ee = obj['wa wa wa wa wa'];
var ee: any;

// Bracket notation property access using numeric string literal value on type with property of that literal name
var ff = obj['10'];
var ff: string;

// Bracket notation property access using numeric string literal value on type without property of that literal name
var gg = obj['1'];
var gg: any;

// Bracket notation property access using numeric value on type with numeric index signature
var hh = numIndex[3.0];
var hh: string;

// Bracket notation property access using enum value on type with numeric index signature
var ii = numIndex[Compass.South];
var ii: string;

// Bracket notation property access using value of type 'any' on type with numeric index signature
var jj = numIndex[anyVar];
var jj: string;

// Bracket notation property access using string value on type with numeric index signature
var kk = numIndex['what'];
var kk: any;

// Bracket notation property access using value of other type on type with numeric index signature and no string index signature
var ll = numIndex[someObject]; // Error

// Bracket notation property access using string value on type with string index signature and no numeric index signature
var mm = strIndex['N'];
var mm: Compass;
var mm2 = strIndex['zzz'];
var mm2: Compass;

// Bracket notation property access using numeric value on type with string index signature and no numeric index signature
var nn = strIndex[10];
var nn: Compass;

// Bracket notation property access using enum value on type with string index signature and no numeric index signature
var oo = strIndex[Compass.East];
var oo: Compass;

// Bracket notation property access using value of type 'any' on type with string index signature and no numeric index signature
var pp = strIndex[<any>null];
var pp: Compass;

// Bracket notation property access using numeric value on type with no index signatures
var qq = noIndex[123];
var qq: any;

// Bracket notation property access using string value on type with no index signatures
var rr = noIndex['zzzz'];
var rr: any;

// Bracket notation property access using enum value on type with no index signatures
var ss = noIndex[Compass.South];
var ss: any;

// Bracket notation property access using value of type 'any' on type with no index signatures
var tt = noIndex[<any>null];
var tt: any;

// Bracket notation property access using values of other types on type with no index signatures
var uu = noIndex[someObject]; // Error

// Bracket notation property access using numeric value on type with numeric index signature and string index signature
var vv = noIndex[32];
var vv: any;

// Bracket notation property access using enum value on type with numeric index signature and string index signature
var ww = bothIndex[Compass.East];
var ww: B;

// Bracket notation property access using value of type 'any' on type with numeric index signature and string index signature
var xx = bothIndex[<any>null];
var xx: B;

// Bracket notation property access using string value on type with numeric index signature and string index signature
var yy = bothIndex['foo'];
var yy: A;

// Bracket notation property access using numeric string value on type with numeric index signature and string index signature
var zz = bothIndex['1.0'];
var zz: A;

// Bracket notation property access using value of other type on type with numeric index signature and no string index signature and string index signature
var zzzz = bothIndex[someObject]; // Error

var x1 = numIndex[stringOrNumber];
var x1: any;

var x2 = strIndex[stringOrNumber];
var x2: Compass;

var x3 = bothIndex[stringOrNumber];
var x3: A;
