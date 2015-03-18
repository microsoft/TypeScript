// @declaration: true
class C { }
class D extends C { }
var {s = '10', c} = { s: 'bar', c: true };
var [s1 = '10', c1] = ['hello', 'word'];
var {s2 = { prop1: new C(), prop2: new C() }, c2} = { s2: { prop1: new D(), prop2: new D() }, c2: false };
var [[s3 = [], c3]] = [[[10,20], "blah"]];