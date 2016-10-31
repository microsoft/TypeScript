//// [internalAliasEnum.ts]
module a {
    export enum weekend {
        Friday,
        Saturday,
        Sunday
    }
}

module c {
    import b = a.weekend;
    export var bVal: b = b.Sunday;
}


//// [internalAliasEnum.js]
var a;
(function (a) {
    var weekend;
    (function (weekend) {
        weekend[weekend["Friday"] = 0] = "Friday";
        weekend[weekend["Saturday"] = 1] = "Saturday";
        weekend[weekend["Sunday"] = 2] = "Sunday";
    })(weekend = a.weekend || (a.weekend = {}));
})(a || (a = {}));
var c;
(function (c) {
    var b = a.weekend;
    c.bVal = b.Sunday;
})(c || (c = {}));


//// [internalAliasEnum.d.ts]
declare module a {
    enum weekend {
        Friday = 0,
        Saturday = 1,
        Sunday = 2,
    }
}
declare module c {
    import b = a.weekend;
    var bVal: b;
}
