//// [functionOverloadAmbiguity1.ts]
function callb(lam: (l: number) => void );
function callb(lam: (n: string) => void );
function callb(a) { }
callb((a) => { a.length; } ); // error, chose first overload

function callb2(lam: (n: string) => void );
function callb2(lam: (l: number) => void );
function callb2(a) { }
callb2((a) => { a.length; } ); // ok, chose first overload


//// [functionOverloadAmbiguity1.js]
function callb(a) { }
callb(function (a) { a.length; }); // error, chose first overload
function callb2(a) { }
callb2(function (a) { a.length; }); // ok, chose first overload
