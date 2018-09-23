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
var a = a || (a = {});
(function (a) {
    var weekend = a.weekend || (a.weekend = {});
    (function (weekend) {
        weekend[weekend["Friday"] = 0] = "Friday";
        weekend[weekend["Saturday"] = 1] = "Saturday";
        weekend[weekend["Sunday"] = 2] = "Sunday";
    })(weekend);
})(a);
var c = c || (c = {});
(function (c) {
    var b = a.weekend;
    c.bVal = b.Sunday;
})(c);


//// [internalAliasEnum.d.ts]
declare module a {
    enum weekend {
        Friday = 0,
        Saturday = 1,
        Sunday = 2
    }
}
declare module c {
    import b = a.weekend;
    var bVal: b;
}
