//// [part1.js]
(function (A) {
    (function (Utils) {
        function mirror(p) {
            return { x: p.y, y: p.x };
        }
        Utils.mirror = mirror;
    })(A.Utils || (A.Utils = {}));
    var Utils = A.Utils;

    A.Origin = { x: 0, y: 0 };
})(exports.A || (exports.A = {}));
var A = exports.A;
//// [part2.js]
(function (A) {
    // collision with 'Origin' var in other part of merged module
    A.Origin = { x: 0, y: 0 };

    (function (Utils) {
        var Plane = (function () {
            function Plane(tl, br) {
                this.tl = tl;
                this.br = br;
            }
            return Plane;
        })();
        Utils.Plane = Plane;
    })(A.Utils || (A.Utils = {}));
    var Utils = A.Utils;
})(exports.A || (exports.A = {}));
var A = exports.A;
