// EveryType used in a nested scope of a different EveryType with the same name, type of the identifier is the one defined in the inner scope

var s: string;
namespace M1 {
    export var s: number = 0;
    var n = s;
    var n: number;
}

namespace M2 {
    var s: number = 0;
    var n = s;
    var n: number;
}

function fn() {
    var s: boolean = false;
    var n = s;
    var n: boolean;
}

class C {
    s!: Date;
    n = this.s;
    x() {
        var p = this.n;
        var p: Date;
    }
}

namespace M3 {
    var s: any;
    namespace M4 {
        var n = s;
        var n: any;
    }
}
