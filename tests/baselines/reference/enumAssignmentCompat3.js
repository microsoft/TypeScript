//// [enumAssignmentCompat3.ts]
namespace First {
    export enum E {
        a, b, c,
    }
}
namespace Abc {
    export enum E {
        a, b, c,
    }
    export enum Nope {
        a, b, c,
    }
}
namespace Abcd {
    export enum E {
        a, b, c, d,
    }
}
namespace Ab {
    export enum E {
        a, b,
    }
}
namespace Cd {
    export enum E {
        c, d,
    }
}
namespace Const {
    export const enum E {
        a, b, c,
    }
}
namespace Decl {
    export declare enum E {
        a, b, c = 3,
    }
}

var abc: First.E;
var secondAbc: Abc.E;
var secondAbcd: Abcd.E;
var secondAb: Ab.E;
var secondCd: Cd.E;
var nope: Abc.Nope;
var k: Const.E;
var decl: Decl.E;
abc = secondAbc; // ok
abc = secondAbcd; // missing 'd'
abc = secondAb; // ok
abc = secondCd; // missing 'd'
abc = nope; // nope!
abc = decl; // ok
secondAbc = abc; // ok
secondAbcd = abc; // ok
secondAb = abc; // missing 'c'
secondCd = abc; // missing 'a' and 'b'
nope = abc; // nope!
decl = abc; // ok

k = k; // const is only assignable to itself
abc = k; // error
k = abc;


//// [enumAssignmentCompat3.js]
var First;
(function (First) {
    (function (E) {
        E[E["a"] = 0] = "a";
        E[E["b"] = 1] = "b";
        E[E["c"] = 2] = "c";
    })(First.E || (First.E = {}));
    var E = First.E;
})(First || (First = {}));
var Abc;
(function (Abc) {
    (function (E) {
        E[E["a"] = 0] = "a";
        E[E["b"] = 1] = "b";
        E[E["c"] = 2] = "c";
    })(Abc.E || (Abc.E = {}));
    var E = Abc.E;
    (function (Nope) {
        Nope[Nope["a"] = 0] = "a";
        Nope[Nope["b"] = 1] = "b";
        Nope[Nope["c"] = 2] = "c";
    })(Abc.Nope || (Abc.Nope = {}));
    var Nope = Abc.Nope;
})(Abc || (Abc = {}));
var Abcd;
(function (Abcd) {
    (function (E) {
        E[E["a"] = 0] = "a";
        E[E["b"] = 1] = "b";
        E[E["c"] = 2] = "c";
        E[E["d"] = 3] = "d";
    })(Abcd.E || (Abcd.E = {}));
    var E = Abcd.E;
})(Abcd || (Abcd = {}));
var Ab;
(function (Ab) {
    (function (E) {
        E[E["a"] = 0] = "a";
        E[E["b"] = 1] = "b";
    })(Ab.E || (Ab.E = {}));
    var E = Ab.E;
})(Ab || (Ab = {}));
var Cd;
(function (Cd) {
    (function (E) {
        E[E["c"] = 0] = "c";
        E[E["d"] = 1] = "d";
    })(Cd.E || (Cd.E = {}));
    var E = Cd.E;
})(Cd || (Cd = {}));
var Decl;
(function (Decl) {
})(Decl || (Decl = {}));
var abc;
var secondAbc;
var secondAbcd;
var secondAb;
var secondCd;
var nope;
var k;
var decl;
abc = secondAbc; // ok
abc = secondAbcd; // missing 'd'
abc = secondAb; // ok
abc = secondCd; // missing 'd'
abc = nope; // nope!
abc = decl; // ok
secondAbc = abc; // ok
secondAbcd = abc; // ok
secondAb = abc; // missing 'c'
secondCd = abc; // missing 'a' and 'b'
nope = abc; // nope!
decl = abc; // ok
k = k; // const is only assignable to itself
abc = k; // error
k = abc;
