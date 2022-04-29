// members N and M of types S and T have the same name, same accessibility, same optionality, and N is assignable M
// numeric named properties work correctly, no errors expected

class S { 1: string; }
class T { 1.: string; }
var s: S;
var t: T;

interface S2 { 1: string; bar?: string }
interface T2 { 1.0: string; baz?: string }
var s2: S2;
var t2: T2;

var a: { 1.: string; bar?: string }
var b: { 1.0: string; baz?: string }

var a2 = { 1.0: '' };
var b2 = { 1: '' };

s = t;
t = s;
s = s2;
s = a2;

s2 = t2;
t2 = s2;
s2 = t;
s2 = b;
s2 = a2;

a = b;
b = a;
a = s;
a = s2;
a = a2;

a2 = b2;
b2 = a2;
a2 = b;
a2 = t2;
a2 = t;
