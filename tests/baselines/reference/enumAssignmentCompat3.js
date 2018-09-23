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
namespace Merged {
    export enum E {
        a, b, 
    }
    export enum E {
        c = 3, d,
    }
}

namespace Merged2 {
    export enum E {
        a, b, c
    }
    export module E {
        export let d = 5;
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
var merged: Merged.E;
var merged2: Merged2.E;
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

// const is only assignable to itself
k = k;
abc = k; // error
k = abc;

// merged enums compare all their members
abc = merged; // missing 'd'
merged = abc; // ok
abc = merged2; // ok
merged2 = abc; // ok

//// [enumAssignmentCompat3.js]
var First = First || (First = {});
(function (First) {
    var E = First.E || (First.E = {});
    (function (E) {
        E[E["a"] = 0] = "a";
        E[E["b"] = 1] = "b";
        E[E["c"] = 2] = "c";
    })(E);
})(First);
var Abc = Abc || (Abc = {});
(function (Abc) {
    var E = Abc.E || (Abc.E = {});
    (function (E) {
        E[E["a"] = 0] = "a";
        E[E["b"] = 1] = "b";
        E[E["c"] = 2] = "c";
    })(E);
    var Nope = Abc.Nope || (Abc.Nope = {});
    (function (Nope) {
        Nope[Nope["a"] = 0] = "a";
        Nope[Nope["b"] = 1] = "b";
        Nope[Nope["c"] = 2] = "c";
    })(Nope);
})(Abc);
var Abcd = Abcd || (Abcd = {});
(function (Abcd) {
    var E = Abcd.E || (Abcd.E = {});
    (function (E) {
        E[E["a"] = 0] = "a";
        E[E["b"] = 1] = "b";
        E[E["c"] = 2] = "c";
        E[E["d"] = 3] = "d";
    })(E);
})(Abcd);
var Ab = Ab || (Ab = {});
(function (Ab) {
    var E = Ab.E || (Ab.E = {});
    (function (E) {
        E[E["a"] = 0] = "a";
        E[E["b"] = 1] = "b";
    })(E);
})(Ab);
var Cd = Cd || (Cd = {});
(function (Cd) {
    var E = Cd.E || (Cd.E = {});
    (function (E) {
        E[E["c"] = 0] = "c";
        E[E["d"] = 1] = "d";
    })(E);
})(Cd);
var Decl = Decl || (Decl = {});
(function (Decl) {
})(Decl);
var Merged = Merged || (Merged = {});
(function (Merged) {
    var E = Merged.E || (Merged.E = {});
    (function (E) {
        E[E["a"] = 0] = "a";
        E[E["b"] = 1] = "b";
    })(E);
    (function (E) {
        E[E["c"] = 3] = "c";
        E[E["d"] = 4] = "d";
    })(E);
})(Merged);
var Merged2 = Merged2 || (Merged2 = {});
(function (Merged2) {
    var E = Merged2.E || (Merged2.E = {});
    (function (E) {
        E[E["a"] = 0] = "a";
        E[E["b"] = 1] = "b";
        E[E["c"] = 2] = "c";
    })(E);
    (function (E) {
        E.d = 5;
    })(E);
})(Merged2);
var abc;
var secondAbc;
var secondAbcd;
var secondAb;
var secondCd;
var nope;
var k;
var decl;
var merged;
var merged2;
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
// const is only assignable to itself
k = k;
abc = k; // error
k = abc;
// merged enums compare all their members
abc = merged; // missing 'd'
merged = abc; // ok
abc = merged2; // ok
merged2 = abc; // ok
