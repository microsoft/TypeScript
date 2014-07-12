// @noimplicitany: true
interface A {
    foo;
}
interface B { }

function callb(lam: (l: A) => void);
function callb(lam: (n: B) => void);
function callb(a) { }
callb((a) => { a.foo; }); // error, chose first overload