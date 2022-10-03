// number unless otherwise specified
var n1 = n1++;
var n2: number = n2 + n2;
var n3 /* any */ = n3 + n3;

// string unless otherwise specified
var s1 = s1 + '';
var s2 /* any */ = s2 + s2;
var s3 : string = s3 + s3;
var s4 = '' + s4;

// boolean unless otherwise specified
var b1 = !b1;
var b2 = !!b2;
var b3 = !b3 || b3; // expected boolean here. actually 'any'
var b4 = (!b4) && b4; // expected boolean here. actually 'any'

// (x:string) => any
var f = (x: string) => f(x);