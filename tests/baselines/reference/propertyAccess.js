//// [propertyAccess.js]
var Compass;
(function (Compass) {
    Compass[Compass["North"] = 0] = "North";
    Compass[Compass["South"] = 1] = "South";
    Compass[Compass["East"] = 2] = "East";
    Compass[Compass["West"] = 3] = "West";
})(Compass || (Compass = {}));

var numIndex = { 3: 'three', 'three': 'three' };
var strIndex = { 'N': 0 /* North */, 'E': 2 /* East */ };
var bothIndex;

function noIndex() {
}

var obj = {
    10: 'ten',
    x: 'hello',
    y: 32,
    z: { n: 'world', m: 15, o: function () {
            return false;
        } },
    'literal property': 100
};
var anyVar = {};

// Assign to a property access
obj.y = 4;

// Property access on value of type 'any'
anyVar.x = anyVar.y = obj.x = anyVar.z;

// Dotted property access of property that exists
var aa = obj.x;

// Dotted property access of property that exists on value's apparent type
var bb = obj.hasOwnProperty;

// Dotted property access of property that doesn't exist on value's apparent type
var cc = obj.qqq;

// Bracket notation property access using string literal value on type with property of that literal name
var dd = obj['literal property'];
var dd;

// Bracket notation property access using string literal value on type without property of that literal name
var ee = obj['wa wa wa wa wa'];
var ee;

// Bracket notation property access using numeric string literal value on type with property of that literal name
var ff = obj['10'];
var ff;

// Bracket notation property access using numeric string literal value on type without property of that literal name
var gg = obj['1'];
var gg;

// Bracket notation property access using numeric value on type with numeric index signature
var hh = numIndex[3.0];
var hh;

// Bracket notation property access using enum value on type with numeric index signature
var ii = numIndex[1 /* South */];
var ii;

// Bracket notation property access using value of type 'any' on type with numeric index signature
var jj = numIndex[anyVar];
var jj;

// Bracket notation property access using string value on type with numeric index signature
var kk = numIndex['what'];
var kk;

// Bracket notation property access using value of other type on type with numeric index signature and no string index signature
var ll = numIndex[window];

// Bracket notation property access using string value on type with string index signature and no numeric index signature
var mm = strIndex['N'];
var mm;
var mm2 = strIndex['zzz'];
var mm2;

// Bracket notation property access using numeric value on type with string index signature and no numeric index signature
var nn = strIndex[10];
var nn;

// Bracket notation property access using enum value on type with string index signature and no numeric index signature
var oo = strIndex[2 /* East */];
var oo;

// Bracket notation property access using value of type 'any' on type with string index signature and no numeric index signature
var pp = strIndex[null];
var pp;

// Bracket notation property access using numeric value on type with no index signatures
var qq = noIndex[123];
var qq;

// Bracket notation property access using string value on type with no index signatures
var rr = noIndex['zzzz'];
var rr;

// Bracket notation property access using enum value on type with no index signatures
var ss = noIndex[1 /* South */];
var ss;

// Bracket notation property access using value of type 'any' on type with no index signatures
var tt = noIndex[null];
var tt;

// Bracket notation property access using values of other types on type with no index signatures
var uu = noIndex[window];

// Bracket notation property access using numeric value on type with numeric index signature and string index signature
var vv = noIndex[32];
var vv;

// Bracket notation property access using enum value on type with numeric index signature and string index signature
var ww = bothIndex[2 /* East */];
var ww;

// Bracket notation property access using value of type 'any' on type with numeric index signature and string index signature
var xx = bothIndex[null];
var xx;

// Bracket notation property access using string value on type with numeric index signature and string index signature
var yy = bothIndex['foo'];
var yy;

// Bracket notation property access using numeric string value on type with numeric index signature and string index signature
var zz = bothIndex['1.0'];
var zz;

// Bracket notation property access using value of other type on type with numeric index signature and no string index signature and string index signature
var zzzz = bothIndex[window]; // Error
