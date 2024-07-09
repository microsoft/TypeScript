// EveryType used in a nested scope of a different EveryType with the same name, type of the identifier is the one defined in the inner scope

var s: string;
module M1 {
    export var s: number;
    var n = s;
    var n: number;
}

module M2 {
    var s: number;
    var n = s;
    var n: number;
}

function fn() {
    var s: boolean;
    var n = s;
    var n: boolean;
}

class C {
    s: Date;
    n = this.s;
    x() {
        var p = this.n;
        var p: Date;
    }
}

module M3 {
    var s: any;
    module M4 {
        var n = s;
        var n: any;
    }
}
