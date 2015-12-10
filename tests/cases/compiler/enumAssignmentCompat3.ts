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
