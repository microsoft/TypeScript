//// [tests/cases/compiler/classMemberInitializerScoping.ts] ////

//// [classMemberInitializerScoping.ts]
var aaa = 1;
class CCC {
    y: number = aaa;
    static staticY: number = aaa; // This shouldnt be error
    constructor(aaa) {
        this.y = ''; // was: error, cannot assign string to number
    }
}

// above is equivalent to this:
var aaaa = 1;
class CCCC {
    y: any;
    constructor(aaaa) {
        this.y = aaaa;
        this.y = '';
    }
}
 


//// [classMemberInitializerScoping.js]
var aaa = 1;
class CCC {
    constructor(aaa) {
        this.y = aaa;
        this.y = ''; // was: error, cannot assign string to number
    }
}
CCC.staticY = aaa; // This shouldnt be error
// above is equivalent to this:
var aaaa = 1;
class CCCC {
    constructor(aaaa) {
        this.y = aaaa;
        this.y = '';
    }
}
