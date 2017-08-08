//// [ExportClassWhichExtendsInterfaceWithInaccessibleType.ts]
module A {

    interface Point {
        x: number;
        y: number;

        fromOrigin(p: Point): number;
    }

    export class Point2d implements Point {
        constructor(public x: number, public y: number) { }

        fromOrigin(p: Point) {
            return 1;
        }
    }
}



//// [ExportClassWhichExtendsInterfaceWithInaccessibleType.js]
var __names = (this && this.__names) || (function() {
    var name = Object.defineProperty ? (function(proto, name) {
        Object.defineProperty(proto[name], 'name', { 
            value: name, configurable: true
        });
    }) : (function(proto, name) {
        proto[name].name = name;
    });
    return function (proto, keys) {
        for (var i = keys.length - 1; i >= 0; i--) {
            name(proto, keys[i])
        }
    };
})();
var A;
(function (A) {
    var Point2d = (function () {
        function Point2d(x, y) {
            this.x = x;
            this.y = y;
        }
        Point2d.prototype.fromOrigin = function (p) {
            return 1;
        };
        __names(Point2d.prototype, ["fromOrigin"]);
        return Point2d;
    }());
    A.Point2d = Point2d;
})(A || (A = {}));
