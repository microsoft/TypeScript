function f1() {
	var a = { x: 1, y: 2 };
	a = {}; // error
    a = { x: 1 }; // error
	a = { x: 1, y: 2, z: 3 };
    a = { x: 1, z: 3 };  // error
}

class Animal { private a; }
class Giraffe extends Animal { private g; }

function f2() {
    var a = new Animal();
    var g = new Giraffe();
    var aa = [ a, a, a ];
    var gg = [ g, g, g ];
    aa = gg;
    gg = aa; // error
    var xa = { f1: 5, f2: aa };
    var xb = { f1: 5, f2: gg };
    xa = xb; // Should be ok
    xb = xa; // Not ok
}

function f4() {
    var _any: any = 0;
    var i = 5;
    i = null; 
    i = undefined;
    var a = { x: 1, y: 1 };
    a = { x: 1, y: null }; 
    a = { x: 1, y: undefined }; 
    a = { x: 1, y: _any }; 
    a = { x: 1, y: _any, z:1 }; 
    a = { x: 1 }; // error
    var mf = function m(n) { return false; };
    var zf = function z(n: number) { return true; };
    mf=zf;
    mf(_any);
    zf(_any);
}


