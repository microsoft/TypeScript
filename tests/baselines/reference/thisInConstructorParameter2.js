//// [thisInConstructorParameter2.js]
var P = (function () {
    function P(z, zz) {
        if (typeof z === "undefined") { z = this; }
        if (typeof zz === "undefined") { zz = this; }
        this.z = z;
        this.x = this;
    }
    P.prototype.foo = function (zz) {
        if (typeof zz === "undefined") { zz = this; }
        zz.x;
    };
    P.bar = function (zz) {
        if (typeof zz === "undefined") { zz = this; }
        zz.y;
    };
    P.y = this;
    return P;
})();
