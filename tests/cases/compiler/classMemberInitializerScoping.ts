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
 
